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
    "slug": "japan-kyushu-earthquake-tsunami",
    "headline": "Magnitude 7.1 earthquake strikes Japan's Kyushu near Kumamoto, prompting a tsunami advisory",
    "overview": "A magnitude 7.1 earthquake struck Japan's southern island of Kyushu near Kumamoto late Tuesday afternoon, and the Japan Meteorological Agency issued a tsunami advisory for Ariake Bay, warning of waves up to one meter. The shallow quake, about 10 kilometers deep, triggered emergency warnings across seven prefectures including Kumamoto, Nagasaki and Kagoshima. The government set up a task force to assess damage and prepare rescues, and nearby nuclear plants reported no abnormalities.",
    "genre": "Climate",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMijAFBVV95cUxPZjJfSjA5NW44LXd6ZG56VGYzWFhybVkybHlGV2Q3bjZHazdsR1hoTGh3RmpsUlc1MnJNelRQbGFKejdjbjRwYzBSWFJQYnR1SW5WbGdZbXBvNm9OZXRGUDJVLVZWTUlQZGptdlRYTjhrNUczOWdUZE1FRHFOU1czaThocDdHQVNsTG8tWg?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMitgFBVV95cUxQREx4N194TTNIVm1ocmk3TEpxZ3hPSVpKQ2dwdEpuOTZNVXNsWVNjX1pjSGhkTHh6M01iWFZQeENTQ09KTHNQSzl0TzdwWGJqN2lrMmV2Vng4Z19ISUZWM1l3NXU1U2ptMENYZVRqSzd5Y0pLelAtOHJHZ19jbm5IdXhmYjhuekNDLW9aV1BvQUtUTTlLOWZhemRNSF81MS1LSXYybms2UGliMzhHaW14SW52V2ZOZw?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-28",
    "image": {
      "src": "/covers/japan-kyushu-earthquake-tsunami.png",
      "alt": "A stone rampart of Kumamoto Castle collapsed into rubble after an earthquake, with the castle keep behind it",
      "credit": "Hyolee2, Wikimedia Commons (CC BY-SA 3.0)"
    },
    "lead": true,
    "edition": "Morning Edition · 28 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The destruction of Helike, 373 BC",
        "excerpt": "One winter night in 373 BC the Achaean city of Helike, a leading power of the classical Greek world and home to a famous sanctuary of Poseidon the Earth-Shaker, was destroyed in a matter of hours. A violent earthquake was followed by a wave from the Corinthian Gulf that swallowed the city whole; ancient writers record that not one of its inhabitants survived and that ten Spartan warships anchored offshore went down with it. Pausanias, visiting centuries later, wrote that the sea 'flooded a great part of the land and covered up the whole of Helike,' leaving only the tops of the trees in Poseidon's grove visible above the water. The people of Kyushu, watching Ariake Bay after Tuesday's quake, stand in the same ancient dread of the ground and the sea turning on a city together.",
        "source": "Pausanias, Description of Greece 7.24 (Frazer translation); see also Strabo and Diodorus Siculus",
        "href": "https://en.wikipedia.org/wiki/Helike"
      },
      {
        "category": "historical",
        "title": "The Lisbon earthquake of 1755",
        "excerpt": "On the morning of All Saints' Day, 1 November 1755, one of the deadliest earthquakes in recorded history struck Lisbon, then among the richest capitals of Europe. The shaking was followed some forty minutes later by a tsunami that surged up the Tagus and swept the crowded waterfront, and then by fires that burned for days; tens of thousands died. The disaster shattered Enlightenment optimism and became Europe's archetype of the earthquake-and-wave catastrophe, the same one-two of tremor and rising sea now feared along the Kyushu coast.",
        "source": "The 1755 Lisbon earthquake (encyclopedic account)",
        "href": "https://en.wikipedia.org/wiki/1755_Lisbon_earthquake",
        "image": {
          "src": "/covers/japan-kyushu-earthquake-tsunami--a1.png",
          "alt": "1755 copper engraving of Lisbon in ruins and flames, with a tsunami wrecking ships in the harbour and panicked figures fleeing",
          "credit": "Contemporary copper engraving, 1755, Museu da Cidade, Lisbon; Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "literary",
        "title": "Voltaire's Candide, 1759",
        "excerpt": "Scarcely had they reached the city, lamenting the death of their benefactor, when they felt the earth tremble under their feet. The sea swelled and foamed in the harbour, and beat to pieces the vessels riding at anchor. Whirlwinds of fire and ashes covered the streets and public places; houses fell, roofs were flung upon the pavements, and the pavements were scattered. Thirty thousand inhabitants of all ages and sexes were crushed under the ruins.",
        "source": "Voltaire, Candide (1759), Chapter V, 'Tempest, Shipwreck, Earthquake' (English translation, Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/19942/19942-h/19942-h.htm"
      },
      {
        "category": "literary",
        "title": "Kleist's The Earthquake in Chile, 1807",
        "excerpt": "Eben stand er, wie schon gesagt, an einem Wandpfeiler und befestigte den Strick, der ihn dieser jammervollen Welt entreißen sollte, an eine Eisenklammer, die an dem Gesimse desselben eingefugt war, als plötzlich der größte Teil der Stadt mit einem Gekrache, als ob das Firmament einstürzte, versank und alles, was Leben atmete, unter seinen Trümmern begrub.",
        "source": "Heinrich von Kleist, Das Erdbeben in Chili (1807), German original; the earthquake strikes as Jeronimo prepares to hang himself",
        "href": "https://gutenberg.ca/ebooks/kleist-erdbebeninchili/kleist-erdbebeninchili-00-h.html"
      },
      {
        "category": "artistic",
        "title": "Hokusai's The Great Wave off Kanagawa, c. 1831",
        "excerpt": "Katsushika Hokusai's woodblock print, from his series Thirty-six Views of Mount Fuji, freezes a towering wave with clawed foam about to crash down on three long boats, tiny Mount Fuji dwarfed in the distance. Though it depicts a rogue swell rather than a seismic wave, the image has become the world's visual shorthand for the tsunami: the ocean rearing up over fragile human vessels, exactly the threat the Japan Meteorological Agency warned of for Ariake Bay.",
        "source": "Katsushika Hokusai, The Great Wave off Kanagawa, c. 1831, from Thirty-six Views of Mount Fuji",
        "href": "https://commons.wikimedia.org/wiki/File:Tsunami_by_hokusai_19th_century.jpg",
        "image": {
          "src": "/covers/japan-kyushu-earthquake-tsunami--a4.png",
          "alt": "Woodblock print of a giant cresting wave with foaming claws towering over three boats, Mount Fuji small in the distance",
          "credit": "Katsushika Hokusai (1760-1849), Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Namazu-e: Kashima Controls the Catfish, 1855",
        "excerpt": "In Japanese folk belief a giant catfish named Namazu thrashes deep underground and shakes the islands, held in check only by the god Kashima and his sacred keystone. After the great Ansei Edo earthquake of 1855, hundreds of these namazu-e prints appeared in the ruined city within days, sold as talismans against further quakes. This print, showing Kashima pinning the catfish with his sword, captures how Japan has for centuries given the terror of its unstable ground a face, the same recurring fear behind Tuesday's magnitude 7.1 shock beneath Kyushu.",
        "source": "Namazu-e woodblock print, 'Kashima controls Namazu', Edo, 1855",
        "href": "https://commons.wikimedia.org/wiki/File:Namazu-e_-_Kashima_controls_namazu.jpg",
        "image": {
          "src": "/covers/japan-kyushu-earthquake-tsunami--a5.png",
          "alt": "1855 Japanese woodblock print of the deity Kashima subduing a giant earthquake catfish with his sword",
          "credit": "Anonymous namazu-e, 1855, Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 1
  },
  {
    "slug": "betye-saar-artist-dies-99",
    "headline": "Betye Saar, pioneering assemblage artist who reclaimed racist imagery for Black liberation, dies at 99",
    "overview": "Betye Saar, a central figure of the 1960s Black Arts Movement who turned found objects and Jim Crow-era memorabilia into totems of Black empowerment, died Sunday in Los Angeles at 99, days before what would have been her 100th birthday. Her best-known work, the 1972 assemblage 'The Liberation of Aunt Jemima,' armed a mammy figurine with a rifle and became an icon of the movement. Saar was inducted into the American Academy of Arts and Letters this spring.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMinwFBVV95cUxPbVVLWE5GTktCeUNSTjA2SlduTjBUaTB2OXljV0NfYndMQURySDRibFdlckJ2eHdReG1MMmZWLXBCeUFQdzFDRjdLVTduV0hWZUUxNDFPektmRkM4RWJlcE1faUY5QWl5U1VFRmlTRW0tSjNvMmdIUHJYUktSSjA1a0kxbXhkMkh4RGxoZlNja0p1dFRYZkZrU1hQSjBjRVU?oc=5"
      },
      {
        "name": "The Washington Post",
        "href": "https://www.washingtonpost.com/obituaries/2026/07/27/betye-saar-artist-who-shattered-stereotypes-black-women-dies-99/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-28",
    "image": {
      "src": "/covers/betye-saar-artist-dies-99.png",
      "alt": "An assemblage of found objects and vintage memorabilia arranged inside a shadow box.",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 28 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Arch of Constantine and its spolia, Rome (dedicated 315 AD)",
        "excerpt": "To raise his triumphal arch beside the Colosseum, Constantine's builders stripped sculpted roundels and relief panels from earlier monuments honoring the emperors Trajan, Hadrian, and Marcus Aurelius, then recut the older emperors' faces into Constantine's own likeness and set the salvaged pieces into a wholly new monument. It is one of antiquity's most famous acts of reclaiming found imagery: charged objects from another age, wrenched from their original meaning and recomposed to declare a new order. In the same spirit, Betye Saar scavenged the discarded stereotypes and cast-off objects of American racism and rebuilt them into totems that spoke a message their makers never intended.",
        "source": "Arch of Constantine, Rome (315 AD), Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Arch_of_Constantine",
        "image": {
          "src": "/covers/betye-saar-artist-dies-99--a0.png",
          "alt": "The Arch of Constantine in Rome, its facade studded with sculpted panels and roundels reused from earlier imperial monuments",
          "credit": "Wikimedia Commons, CC BY-SA 4.0"
        }
      },
      {
        "category": "historical",
        "title": "Sojourner Truth's speech at the Akron Woman's Rights Convention (1851)",
        "excerpt": "I want to say a few words about this matter. I am a woman's rights [sic]. I have as much muscle as any man, and can do as much work as any man. I have plowed and reaped and husked and chopped and mowed, and can any man do more than that? I have heard much about the sexes being equal. I can carry as much as any man, and can eat as much too, if I can get it. I am as strong as any man that is now. As for intellect, all I can say is, if a woman have a pint, and a man a quart – why can't she have her little pint full?",
        "source": "Sojourner Truth, Akron, Ohio, 1851, as transcribed by Marius Robinson in the Anti-Slavery Bugle, June 21, 1851",
        "href": "https://en.wikipedia.org/wiki/Ain%27t_I_a_Woman%3F",
        "image": {
          "src": "/covers/betye-saar-artist-dies-99--a1.png",
          "alt": "1864 carte-de-visite photograph of Sojourner Truth seated, knitting, beside a small table",
          "credit": "National Portrait Gallery via Wikimedia Commons, public domain"
        }
      },
      {
        "category": "literary",
        "title": "Phillis Wheatley, \"On Being Brought from Africa to America\" (1773)",
        "excerpt": "'T was mercy brought me from my pagan land,\nTaught my benighted soul to understand\nThat there's a God — that there's a Saviour too;\nOnce I redemption neither sought nor knew.\nSome view our sable race with scornful eye—\n'Their color is a diabolic dye.'\nRemember, Christians, Negroes black as Cain\nMay be refined, and join the angelic train.",
        "source": "Phillis Wheatley, Poems on Various Subjects, Religious and Moral (1773); text via Wikisource",
        "href": "https://en.wikisource.org/wiki/Memoir_and_Poems_of_Phillis_Wheatley/On_being_brought_from_Africa_to_America",
        "image": {
          "src": "/covers/betye-saar-artist-dies-99--a2.png",
          "alt": "Engraved frontispiece portrait of Phillis Wheatley seated at a writing desk, pen in hand, from her 1773 book of poems",
          "credit": "Wikimedia Commons, public domain"
        }
      },
      {
        "category": "literary",
        "title": "Paul Laurence Dunbar, \"We Wear the Mask\" (1895)",
        "excerpt": "We wear the mask that grins and lies,\nIt hides our cheeks and shades our eyes,—\nThis debt we pay to human guile;\nWith torn and bleeding hearts we smile,\nAnd mouth with myriad subtleties.\n\nWhy should the world be over-wise,\nIn counting all our tears and sighs?\nNay, let them only see us, while\nWe wear the mask.\n\nWe smile, but, O great Christ, our cries\nTo thee from tortured souls arise.\nWe sing, but oh the clay is vile\nBeneath our feet, and long the mile;\nBut let the world dream otherwise,\nWe wear the mask!",
        "source": "Paul Laurence Dunbar, Lyrics of Lowly Life (1896); text via Wikisource (scan of the 1896 first edition)",
        "href": "https://en.wikisource.org/wiki/Lyrics_of_Lowly_Life/We_wear_the_Mask",
        "image": {
          "src": "/covers/betye-saar-artist-dies-99--a3.png",
          "alt": "Studio portrait photograph of the poet Paul Laurence Dunbar",
          "credit": "Library of Congress via Wikimedia Commons, public domain"
        }
      },
      {
        "category": "artistic",
        "title": "Edmonia Lewis, \"Forever Free\" (1867)",
        "excerpt": "In this marble group a newly emancipated Black man stands with his broken shackle lifted triumphantly overhead while a kneeling woman clasps her hands in thanksgiving, the Emancipation Proclamation invoked at their feet. Carved by Edmonia Lewis, the first sculptor of African American and Native descent to win international acclaim, it wrests the polished white marble of neoclassical grandeur into a monument of Black freedom. Like Saar arming her mammy figurine with a rifle, Lewis seized a medium associated with her oppressors and turned it into a declaration of liberation.",
        "source": "Mary Edmonia Lewis, Forever Free, 1867, marble, Howard University Gallery of Art",
        "href": "https://commons.wikimedia.org/wiki/File:Forever_Free_by_Edmonia_Lewis_(1867).png",
        "image": {
          "src": "/covers/betye-saar-artist-dies-99--a4.png",
          "alt": "White marble sculpture of a standing freed Black man raising his broken manacle above a kneeling woman with clasped hands",
          "credit": "Edmonia Lewis (1867) via Wikimedia Commons, public domain"
        }
      },
      {
        "category": "artistic",
        "title": "The spiritual \"Go Down, Moses\" (published as \"Oh! Let My People Go,\" 1862)",
        "excerpt": "When Israel was in Egypt's land\nLet my people go\nOppress'd so hard they could not stand\nLet my people go\n\nGo down, Moses\nWay down in Egypt's land\nTell old Pharaoh\nLet my people go",
        "source": "African American spiritual, \"Go Down, Moses\" / \"Oh! Let My People Go: The Song of the Contrabands\" (Horace Waters, 1862); popularized by the Fisk Jubilee Singers",
        "href": "https://en.wikipedia.org/wiki/Go_Down_Moses",
        "image": {
          "src": "/covers/betye-saar-artist-dies-99--a5.png",
          "alt": "1862 sheet music cover for 'Oh! Let My People Go: The Song of the Contrabands'",
          "credit": "Horace Waters, 1862, via Wikimedia Commons, public domain"
        }
      }
    ],
    "rank": 2
  },
  {
    "slug": "us-walks-out-un-france-human-rights",
    "headline": "US delegation walks out of UN Security Council as France likens Washington's human-rights vote to Russia's",
    "overview": "The US delegation walked out of a UN Security Council meeting during France's remarks after France likened Washington's vote against extending the UN human-rights chief's mandate to the stances of Russia and North Korea. US Ambassador Mike Waltz accused France of backing a rights chief who criticizes democracies like the US and Israel while 'cozying up to the world's worst oppressors.' A US representative said the delegation would keep walking out until France dropped its 'condescending and disrespectful rhetoric.'",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMi5wFBVV95cUxPZjNMQWVZVU5ES3ZITDhWZDZMVFRtWnJIVm5nY19LdXRrbjdfaExrdzdZSEE2VlFNNjYyVU8xeW9tX253c3Y3SjJzWVN2MURGX3hOUWZSWF8tZlNJSk8wZGFwOVlzTDVpSjRaLXBuNEhuTU0tSERPSlJuLTF0ZDhtcVlOMGhBTWJZYWIwYnNkSVAwUDFVU09pVEp5OHprN1lISmJobXRSWHBoNVp0djZZbWJxRnlVRXRIMUZsT2hOUTZTcVppelVxdEROb3lkQm9hZUxwTWozSjNZM3JmeDlZVWJ6WGEwTzg?oc=5"
      },
      {
        "name": "France 24",
        "href": "https://www.france24.com/en/france/20260727-us-walks-out-of-un-security-council-meeting-as-france-condemns-rights-vote"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-28",
    "image": {
      "src": "/covers/us-walks-out-un-france-human-rights.png",
      "alt": "The horseshoe table of the United Nations Security Council chamber in New York, beneath Per Krohg's mural",
      "credit": "James D. Forrester / Wikimedia Commons, CC BY 4.0"
    },
    "edition": "Morning Edition · 28 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The first secessio plebis of Rome, 494 BC",
        "excerpt": "The oldest recorded protest by absence: when the patrician Senate refused to relieve the debt-burdened commoners, the plebeians simply walked out of Rome en masse and withdrew to the Mons Sacer (the Sacred Mount), leaving the ruling order to govern an empty city. This first secession of the plebs, dated to 494 BC, is often called the earliest general strike in history. The tactic worked: to lure the plebeians back, the patricians conceded a new office, the tribunes of the plebs, to defend common interests. Like the US delegation quitting the chamber mid-session, the drama lay not in what was said but in the empty benches that said it.",
        "source": "Livy, Ab Urbe Condita, Book II; see 'Secessio plebis' (Wikipedia)",
        "href": "https://en.wikipedia.org/wiki/Secessio_plebis",
        "image": {
          "src": "/covers/us-walks-out-un-france-human-rights--a0.png",
          "alt": "1849 engraving of the plebeians seceding to the Mons Sacer outside Rome",
          "credit": "B. Barloccini (1849) / Wikimedia Commons, Public Domain"
        }
      },
      {
        "category": "historical",
        "title": "The Soviet boycott of the UN Security Council, 1950",
        "excerpt": "On 13 January 1950, after failing to have the People's Republic of China seated in place of the Republic of China, the Soviet delegate Yakov Malik walked out of the UN Security Council and began a boycott that lasted until August. Moscow reasoned that an empty Soviet chair would paralyse the Council. Instead the walkout backfired spectacularly: with no Soviet veto in the room, the Council passed the resolutions authorising the UN military response to the invasion of South Korea. It stands as the classic cautionary tale of the diplomatic walkout, protest by absence that hands the room to your rivals, an irony hanging over any modern delegation that storms out of the same chamber.",
        "source": "'Soviet boycott of the United Nations' (Wikipedia)",
        "href": "https://en.wikipedia.org/wiki/Soviet_boycott_of_the_United_Nations",
        "image": {
          "src": "/covers/us-walks-out-un-france-human-rights--a1.png",
          "alt": "Soviet diplomat Yakov Malik, who led the 1950 walkout, at a United Nations meeting",
          "credit": "Arthur Sasse for International News Photos, 1952 / Wikimedia Commons, Public Domain (US)"
        }
      },
      {
        "category": "literary",
        "title": "Homer's Iliad, Book I (8th century BC; Butler translation)",
        "excerpt": "\"Now, therefore, I shall go back to Phthia; it will be much better for me to return home with my ships, for I will not stay here dishonoured to gather gold and substance for you.\" And swearing his great oath by the sceptre, Achilles vows: \"so surely and solemnly do I swear that hereafter they shall look fondly for Achilles and shall not find him.\" Wounded in his honour by Agamemnon, Achilles withdraws to his ships and refuses to fight, the archetype of the aggrieved ally who protests by departure and leaves his own side the poorer for it, just as an ally withdrawing from the Council table trades participation for a point of pride.",
        "source": "Homer, The Iliad, Book I, trans. Samuel Butler (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/2199/2199-h/2199-h.htm",
        "image": {
          "src": "/covers/us-walks-out-un-france-human-rights--a2.png",
          "alt": "Tiepolo fresco of the enraged Achilles drawing his sword against Agamemnon, restrained by Athena",
          "credit": "Giovanni Battista Tiepolo (1757), Villa Valmarana ai Nani / Wikimedia Commons, Public Domain"
        }
      },
      {
        "category": "literary",
        "title": "Shakespeare's Coriolanus, Act III (c. 1608)",
        "excerpt": "\"You common cry of curs! whose breath I hate / As reek o' the rotten fens, whose loves I prize / As the dead carcasses of unburied men / That do corrupt my air, I banish you; / And here remain with your uncertainty! / Let every feeble rumour shake your hearts! / Your enemies, with nodding of their plumes, / Fan you into despair! Have the power still / To banish your defenders; till at length / Your ignorance, which finds not till it feels, / Making not reservation of yourselves, / Still your own foes, deliver you as most / Abated captives to some nation / That won you without blows! Despising, / For you, the city, thus I turn my back: / There is a world elsewhere.\" Sentenced to banishment, the Roman general inverts the verdict, banishing the city that banished him and turning his back on the assembly, the perfect emblem of the walkout as a gesture of defiant contempt.",
        "source": "William Shakespeare, Coriolanus, Act III, Scene III (The Complete Works of Shakespeare, MIT)",
        "href": "https://shakespeare.mit.edu/coriolanus/coriolanus.3.3.html",
        "image": {
          "src": "/covers/us-walks-out-un-france-human-rights--a3.png",
          "alt": "Soma Orlai Petrich's 1869 painting of Coriolanus among the Volscians, sword sheathed as women plead",
          "credit": "Soma Orlai Petrich (1869), Mihaly Munkacsy Museum / Wikimedia Commons, Public Domain"
        }
      },
      {
        "category": "artistic",
        "title": "Jacques-Louis David, The Oath of the Horatii (1784)",
        "excerpt": "David's severe neoclassical canvas freezes three brothers thrusting out their arms to swear an oath to Rome before their father, while the women collapse in grief on the right. Painted on the eve of the French Revolution, it became the visual creed of uncompromising political loyalty, the conviction that principle and nation must be served even at the cost of alliance, kinship, or comfort. Its rigid geometry of outstretched, unyielding arms captures exactly the posture of a delegation that would rather make an absolute stand, and walk, than sit and compromise its position.",
        "source": "Jacques-Louis David, Oath of the Horatii (1784), Musee du Louvre",
        "href": "https://en.wikipedia.org/wiki/Oath_of_the_Horatii",
        "image": {
          "src": "/covers/us-walks-out-un-france-human-rights--a4.png",
          "alt": "The Oath of the Horatii: three brothers salute raised swords held by their father as women weep",
          "credit": "Jacques-Louis David (1784), Louvre / Google Art Project, Wikimedia Commons, Public Domain"
        }
      },
      {
        "category": "artistic",
        "title": "Haydn, Symphony No. 45 'Farewell' (1772)",
        "excerpt": "Haydn staged the most elegant walkout in music. In the finale of the 'Farewell' Symphony, written to press Prince Esterhazy to release his overworked musicians to their families, each player in turn finishes his part, snuffs out the candle on his stand and quietly leaves the stage, until only two muted violins remain to play the last bars to an emptying room. It is a protest performed by departure rather than declaration, dissent registered by the slow subtraction of those present, the concert-hall ancestor of a delegation rising and filing out of the chamber while the speech goes on.",
        "source": "Joseph Haydn, Symphony No. 45 in F-sharp minor, Hob. I:45 'Farewell' (1772); score at IMSLP",
        "href": "https://imslp.org/wiki/Symphony_No.45_in_F-sharp_minor,_Hob.I:45_(Haydn,_Joseph)",
        "image": {
          "src": "/covers/us-walks-out-un-france-human-rights--a5.png",
          "alt": "Thomas Hardy's 1791 portrait of the composer Joseph Haydn",
          "credit": "Thomas Hardy (1791), Royal College of Music / Wikimedia Commons, Public Domain"
        }
      }
    ],
    "rank": 3
  },
  {
    "slug": "finland-closes-airspace-russia-drones",
    "headline": "Finland closes part of its southern airspace and coastal waters near Russia over stray-drone risk",
    "overview": "Finland's Defence Forces closed a stretch of southern airspace and restricted maritime traffic along its coast near the Russian border on Tuesday as a precaution against stray drones. The exclusion zone runs from the island of Kaunissaari to the port of Hamina, and officials said the measures would let them safely intercept any unmanned aircraft that wander into Finnish territory. The move follows repeated incursions in 2026 by Ukrainian drones that crossed into Baltic NATO states after long-range strikes on Russia.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMipAFBVV95cUxNOExKdlZiNkltclhvaVFlRjlmUE5mUnJWSWZ2REJ5ZnNGNWJSSWs0X05JVkhxMkNhcElKZFFHQnFSc2xxMHVoTGtBaXM3Q3ZvSXM1ZWQ1QmdwOFNYdlN1ZUdRbjUtenpkeDNpU3VKSjNrRWViTU1LQmFOelR0V2l2cDN2R1h6YkFUbUV2OE1xQTYtdTk3YmZ0N0xyeXhTTTFjQzV2RQ?oc=5"
      },
      {
        "name": "Daily Finland",
        "href": "https://www.dailyfinland.fi/national/50515/Finland-imposes-temporary-restrictions-on-air-sea-traffic-over-drone-risk"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-28",
    "image": {
      "src": "/covers/finland-closes-airspace-russia-drones.png",
      "alt": "The rocky, sandy shore of Kaunissaari island on the Gulf of Finland, one of the points anchoring Finland's new coastal exclusion zone",
      "credit": "Pauli Simonen (Havesj), Wikimedia Commons, public domain"
    },
    "edition": "Morning Edition · 28 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Hadrian's Wall across Roman Britain (begun 122 AD)",
        "excerpt": "When the Emperor Hadrian came to the exposed northern edge of the empire, he ordered a continuous stone-and-turf barrier flung 73 miles from the Tyne to the Solway, studded with milecastles, turrets and forts. It was less a battlefield than a screen: a line to watch, filter and channel movement from the untamed frontier beyond, a great power hardening its border against the disorder next door rather than trying to conquer it. Finland's sealing of airspace and coastal waters against drifting drones is the same instinct in miniature, a small state drawing a controllable line at the edge of a neighbor's war.",
        "source": "Hadrian's Wall, Roman frontier fortification in northern Britain, c. 122 AD",
        "href": "https://en.wikipedia.org/wiki/Hadrian%27s_Wall",
        "image": {
          "src": "/covers/finland-closes-airspace-russia-drones--a0.png",
          "alt": "Surviving stretch of Hadrian's Wall running over open moorland west of Housesteads",
          "credit": "Steven Fruitsmaak, Wikimedia Commons, public domain"
        }
      },
      {
        "category": "historical",
        "title": "The Berlin Blockade and Airlift (1948-1949)",
        "excerpt": "In June 1948 the Soviet Union sealed the road, rail and canal corridors into West Berlin, hoping to strangle the isolated city held by the Western allies. Rather than force the barricade, the West answered by controlling a different corridor: an eleven-month airlift that flew coal, food and fuel over the closed frontier, one landing at Tempelhof every few minutes. It is the mirror image of Finland's move, a closed corridor as an instrument of the Cold standoff, a line drawn and defended at the seam where a great power's pressure meets a smaller allied enclave.",
        "source": "Berlin Blockade and Berlin Airlift, 1948-1949",
        "href": "https://en.wikipedia.org/wiki/Berlin_Blockade",
        "image": {
          "src": "/covers/finland-closes-airspace-russia-drones--a1.png",
          "alt": "Berliners watch a U.S. Air Force C-54 Skymaster land at Tempelhof airport during the 1948 airlift",
          "credit": "United States Air Force, Wikimedia Commons, public domain"
        }
      },
      {
        "category": "literary",
        "title": "The Kalevala, Rune XLIII \"The Sampo Lost in the Sea\" (compiled 1835-1849)",
        "excerpt": "Louhi, hostess of Pohyola,\nCalled her many tribes together,\nGave the archers bows and arrows,\nGave her brave men spears and broadswords;\nFitted out her mightiest war-ship,\nIn the vessel placed her army,\nWith their swords a hundred heroes,\nWith their bows a thousand archers;\nQuick erected masts and sail-yards,\nOn the masts her sails of linen\nHanging like the clouds of heaven,\nLike the white-clouds in the ether;\nSailed across the seas of Pohya,\nTo re-take the wondrous Sampo\nFrom the heroes of Wainola.",
        "source": "The Kalevala, Rune XLIII, trans. John Martin Crawford (1888), via Project Gutenberg",
        "href": "https://www.gutenberg.org/files/5186/5186-h/5186-h.htm",
        "image": {
          "src": "/covers/finland-closes-airspace-russia-drones--a2.png",
          "alt": "Title page of the 1835 first edition of the Kalevala compiled by Elias Lonnrot",
          "credit": "Elias Lonnrot (1802-1884), first edition 1835, Wikimedia Commons, public domain"
        }
      },
      {
        "category": "literary",
        "title": "C. P. Cavafy, \"Waiting for the Barbarians\" (written 1898, published 1904)",
        "excerpt": "Cavafy's poem seats an entire city on edge, its senate, emperor and consuls dressed in their finest and waiting all day at the gates for the barbarians who are said to be coming. The whole apparatus of the state gathers at its own frontier, defined by the threat pressing in from outside; when night falls and word arrives that there are no barbarians after all, the crowd disperses uneasily, having lost the enemy that gave it purpose. It rhymes with a border nation on alert against drifting drones, where the watchful frontier and the imagined menace beyond it come to organize national attention as much as any real attack.",
        "source": "Constantine P. Cavafy, \"Waiting for the Barbarians\" (Perimenontas tous Varvarous)",
        "href": "https://en.wikipedia.org/wiki/Waiting_for_the_Barbarians_(poem)",
        "image": {
          "src": "/covers/finland-closes-airspace-russia-drones--a3.png",
          "alt": "Portrait photograph of the Greek poet Constantine P. Cavafy, circa 1900",
          "credit": "Photographer unknown, c. 1900, Wikimedia Commons, public domain"
        }
      },
      {
        "category": "artistic",
        "title": "Jean Sibelius, \"Finlandia,\" Op. 26 (1899-1900)",
        "excerpt": "Sibelius composed Finlandia as a veiled protest at the height of Russian imperial censorship, its brooding brass storm resolving into the serene, hymn-like Finlandia theme that became an unofficial anthem of Finnish nationhood. The piece is the sound of a small people asserting its own frontier against the pressure of a vast eastern power, defiance turning into a quiet, self-possessed calm. As Finland again draws lines against spillover from Russia's war, the work stands as the country's musical statement of guarding its own threshold.",
        "source": "Jean Sibelius, Finlandia, Op. 26; score at IMSLP (Petrucci Music Library)",
        "href": "https://imslp.org/wiki/Finlandia,_Op.26_(Sibelius,_Jean)",
        "image": {
          "src": "/covers/finland-closes-airspace-russia-drones--a4.png",
          "alt": "Portrait photograph of the Finnish composer Jean Sibelius, 1913",
          "credit": "Daniel Nyblin (1856-1923), 1913, Wikimedia Commons, public domain"
        }
      },
      {
        "category": "artistic",
        "title": "Akseli Gallen-Kallela, \"The Defense of the Sampo\" (1896)",
        "excerpt": "Gallen-Kallela's tempera painting freezes the Kalevala's climax: the hero Vainamoinen fights off Louhi, mistress of the hostile north, who has taken the form of a monstrous eagle to seize back the Sampo, the source of the people's fortune. Men brace at the prow of a small boat, weapons raised against a great winged menace descending from the sky, the whole scene a vision of a people defending its own against a looming power from across the water. It is an almost literal emblem of Finland scanning its coast and sky for threats drifting in from the east.",
        "source": "Akseli Gallen-Kallela, The Defense of the Sampo (Sammon puolustus), 1896, Turku Art Museum",
        "href": "https://en.wikipedia.org/wiki/The_Defense_of_the_Sampo",
        "image": {
          "src": "/covers/finland-closes-airspace-russia-drones--a5.png",
          "alt": "Gallen-Kallela's 1896 painting The Defense of the Sampo, heroes in a boat fighting off Louhi in the form of a giant eagle",
          "credit": "Akseli Gallen-Kallela (1865-1931), 1896, Wikimedia Commons, public domain"
        }
      }
    ],
    "rank": 4
  },
  {
    "slug": "taiwan-detains-nvidia-employee-chip-smuggling",
    "headline": "Taiwan detains an Nvidia employee in a widening probe into smuggling AI chips to China",
    "overview": "Taiwanese prosecutors have detained an Nvidia employee and searched the company's offices in a widening investigation into the alleged smuggling of AI accelerators to China, in what appears to be the first legal action against a staffer of the chipmaker. The employee and six others are accused of forging documents to ship about 50 Super Micro servers to China, part of a series of detentions that has already swept up Super Micro workers. The US restricts exports to China of the most advanced chips used to train artificial intelligence.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMivgFBVV95cUxONGVEdUMzN3M0bDF4c0UtSW42SlAzeWoydnpubGFaeDgtQnYzRmwyMjlyWU4yOFJqUU1Pd3R4Q1pwLWVPZkhCU3Z6QkZoMktUX1BIQm0wY0MteXpwSWFmWl9Xa2FBUmpJYl9SeUt3M1g4MlViU2xUMThtQ1paa3dLal9scVhKbnhMX0FnYnJUdURWUTVvQUIxcFNHRnRsdTFlNmRKVnVnWHV5SkdoeE1sZ1lLTUpvajNDNTVLOC13?oc=5"
      },
      {
        "name": "France 24",
        "href": "https://www.france24.com/en/live-news/20260728-taiwan-detains-nvidia-worker-in-chip-smuggling-probe-source-familiar-with-case"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-28",
    "image": {
      "src": "/covers/taiwan-detains-nvidia-employee-chip-smuggling.png",
      "alt": "Rows of illuminated server racks in a data center, the kind of AI compute hardware at the center of the smuggling case",
      "credit": "BalticServers.com (Fleshas), CC BY-SA 3.0, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 28 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The smuggling of silkworm eggs into Byzantium, c. 552 AD",
        "excerpt": "For centuries imperial China guarded the secret of silk as a capital monopoly: anyone caught exporting silkworms or their eggs faced death. Around 552, according to Procopius, two monks acting on a mission from the emperor Justinian returned from the East having concealed live silkworm eggs (or larvae) inside hollow bamboo canes, carrying the forbidden technology past the Persian trade routes all the way to Constantinople. The single act of contraband broke China's ancient monopoly and seeded a Byzantine silk industry that dominated Europe for 650 years, an early precedent for a rival power stealing a jealously controlled technology across a hostile frontier.",
        "source": "Procopius, History of the Wars, Book VIII; see 'Smuggling of silkworm eggs into the Byzantine Empire'",
        "href": "https://en.wikipedia.org/wiki/Smuggling_of_silkworm_eggs_into_the_Byzantine_Empire",
        "image": {
          "src": "/covers/taiwan-detains-nvidia-employee-chip-smuggling--a0.png",
          "alt": "Byzantine mosaic of the Emperor Justinian I and his court, San Vitale, Ravenna, before 547 AD",
          "credit": "Mosaic, Basilica of San Vitale, Ravenna (before 547 AD), public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "The Toshiba-Kongsberg export-control scandal of 1987",
        "excerpt": "Between 1982 and 1984 Japan's Toshiba Machine and Norway's Kongsberg Vaapenfabrikk secretly sold the Soviet Union nine-axis computer-controlled milling machines, violating the COCOM controls that barred transferring militarily critical technology to the Warsaw Pact. The machines let Moscow mill submarine propellers so quiet that Western sonar could no longer track them, erasing a hard-won strategic edge. The affair triggered US sanctions, executive arrests and a diplomatic rupture, a Cold War rhyme for today's fight over choking off cutting-edge chips: the same pattern of falsified paperwork, dual-use hardware, and a supplier's employees moving controlled technology to a strategic rival in defiance of an embargo.",
        "source": "Toshiba-Kongsberg scandal (1987), contemporaneous reporting and Wikipedia summary",
        "href": "https://en.wikipedia.org/wiki/Toshiba%E2%80%93Kongsberg_scandal",
        "image": {
          "src": "/covers/taiwan-detains-nvidia-employee-chip-smuggling--a1.png",
          "alt": "Soviet Alfa-class nuclear attack submarine underway, 1983",
          "credit": "U.S. Department of Defense photo (1983), public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Rudyard Kipling's \"A Smuggler's Song\" (1906)",
        "excerpt": "If you wake at midnight, and hear a horse's feet,\nDon't go drawing back the blind, or looking in the street;\nThem that ask no questions isn't told a lie.\nWatch the wall, my darling, while the Gentlemen go by!\n\nFive and twenty ponies,\nTrotting through the dark—\nBrandy for the Parson,\nBaccy for the Clerk;\nLaces for a lady, letters for a spy,\nAnd watch the wall, my darling, while the Gentlemen go by!",
        "source": "Rudyard Kipling, \"A Smuggler's Song,\" from Puck of Pook's Hill (1906)",
        "href": "https://www.kiplingsociety.co.uk/poem/poems_smuggler.htm",
        "image": {
          "src": "/covers/taiwan-detains-nvidia-employee-chip-smuggling--a2.png",
          "alt": "Portrait photograph of Rudyard Kipling, 1895",
          "credit": "Elliott & Fry (1895), public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Aeschylus's Prometheus Bound (5th century BC)",
        "excerpt": "For it is because I bestowed good gifts on mortals that this miserable yoke of constraint has been bound upon me. I hunted out and stored in fennel stalk the stolen source of fire that has proved a teacher to mortals in every art and a means to mighty ends. Such is the offence for which I pay the penalty, riveted in fetters beneath the open sky.",
        "source": "Aeschylus, Prometheus Bound, lines 107-113, trans. Herbert Weir Smyth (1926), Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0010%3Acard%3D101",
        "image": {
          "src": "/covers/taiwan-detains-nvidia-employee-chip-smuggling--a3.png",
          "alt": "Rubens's painting of Prometheus bound, punished for stealing fire",
          "credit": "Peter Paul Rubens and Frans Snyders, Prometheus Bound (c. 1611-1618), public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Peter Paul Rubens, Prometheus Bound (c. 1611-1618)",
        "excerpt": "Rubens and the animal painter Frans Snyders show the Titan chained to a crag, his body wrenched back as the eagle of Zeus tears at his liver, the fire he smuggled to humankind still smouldering in a torch below. The muscular anguish of the figure makes the price of the forbidden transfer visceral: to move a coveted technology past the guardians who forbid it is to invite a punishment as relentless as the myth. The painting turns the theme of contraband knowledge into an image of both defiance and consequence, the exact tension facing anyone who carries controlled goods across a line drawn by a great power.",
        "source": "Peter Paul Rubens (figure) and Frans Snyders (eagle), Prometheus Bound, Philadelphia Museum of Art",
        "href": "https://commons.wikimedia.org/wiki/File:Peter_Paul_Rubens_-_Prometheus_Bound.jpg",
        "image": {
          "src": "/covers/taiwan-detains-nvidia-employee-chip-smuggling--a4.png",
          "alt": "Prometheus chained to a rock as an eagle attacks him, oil painting by Rubens and Snyders",
          "credit": "Peter Paul Rubens and Frans Snyders, Prometheus Bound (c. 1611-1618), public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "George Morland, The Smugglers (1792)",
        "excerpt": "Morland, a painter drawn to rough coastal life, sets his smugglers on a shadowed shore hauling contraband kegs from a boat by the dim light of an English night. The scene glamorises nothing: it is a clandestine, hurried transfer of forbidden goods conducted just out of the authorities' sight, the workaday reality behind an embargo. Painted at the height of Britain's running war against duty-dodging free-traders, the canvas is the visual counterpart to Kipling's poem and a mirror for a modern case in which servers, not brandy, are moved under cover of falsified papers.",
        "source": "George Morland, The Smugglers (1792), oil on canvas, Fitzwilliam Museum, Cambridge",
        "href": "https://commons.wikimedia.org/wiki/File:George_Morland_(1763-1804)_-_The_Smugglers_-_PD.110-1992_-_Fitzwilliam_Museum.jpg",
        "image": {
          "src": "/covers/taiwan-detains-nvidia-employee-chip-smuggling--a5.png",
          "alt": "Nighttime coastal scene of smugglers unloading barrels from a boat, oil painting by George Morland",
          "credit": "George Morland, The Smugglers (1792), Fitzwilliam Museum, public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 5
  },
  {
    "slug": "google-rivals-seek-damages-eu-fine",
    "headline": "Google rivals across Europe line up to seek up to $10 billion in damages after record $1 billion EU fine",
    "overview": "Smaller rivals across Europe are lining up to seek as much as $10 billion in damages from Google after the EU hit it with a record $1 billion fine, the first under the Digital Markets Act, for favoring its own services and blocking developers from steering users to cheaper options. Cases have been filed in at least six countries; a Stockholm court awarded Klarna-owned PriceRunner about €1.7 billion, and a Berlin court earlier gave price-comparison site Idealo €465 million. The fine reopens wounds from a 2017 EU shopping-search case.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiugFBVV95cUxNZ2FvOVMtdWZQa3NHaVBsRW5CMjZjTkVINTVZUXVOeURiQWxhRUhIbjB6NnA1VWFyRTNMNGNiVmF3clNPb09YT0JEMUpheXpNeDlrZ3g5Y1p4N3hoMC0xNUIySlFZZ1ZzRWNmOVh2dG5nVFVCbExpZVBzcHNYZ21XQXVaNEJ6NXlUa1dOZVp5d19OSk1FbjhacU5CVDJYTXN3R1cwVGVNbDc3eURsSjFnZzEtR0tZNEhlanc?oc=5"
      },
      {
        "name": "Euronews",
        "href": "https://www.euronews.com/next/2026/07/28/google-rivals-in-europe-line-up-for-damages-after-record-eu-fine"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-28",
    "image": {
      "src": "/covers/google-rivals-seek-damages-eu-fine.png",
      "alt": "The towers of the European Court of Justice in Luxembourg, fronted by a row of member-state flags",
      "credit": "Cédric Puisney, Wikimedia Commons (CC BY 2.0)"
    },
    "edition": "Morning Edition · 28 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The breakup of Standard Oil, 1911",
        "excerpt": "On 15 May 1911 the U.S. Supreme Court, in Standard Oil Co. of New Jersey v. United States, ruled that John D. Rockefeller's petroleum colossus had illegally monopolized the oil trade and ordered it dissolved into 34 separate companies. The single giant that had swallowed refiners, railroads and pipelines across the country was, by law, pulled apart into competitors and forced to answer for the rivals it had crushed. It is the archetype of the modern antitrust reckoning that Google now faces in Europe: a dominant firm, found to have favored itself, dismantled and pursued by the many it had squeezed.",
        "source": "Standard Oil Co. of New Jersey v. United States, 221 U.S. 1 (1911); U.S. Supreme Court",
        "href": "https://en.wikipedia.org/wiki/Standard_Oil_Co._of_New_Jersey_v._United_States",
        "image": {
          "src": "/covers/google-rivals-seek-damages-eu-fine--a0.png",
          "alt": "1904 cartoon 'Next!' showing Standard Oil as an octopus with tentacles gripping industry and government",
          "credit": "Udo Keppler, Puck, 1904 — Library of Congress via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "historical",
        "title": "Emperor Zeno's edict against monopolies, 483 AD",
        "excerpt": "More than fourteen centuries before Brussels, the Eastern Roman emperor Zeno issued a constitution in 483 AD forbidding any person to exercise a monopoly over clothing, fish or any other commodity, whether the exclusive right had been claimed privately or granted by the emperor himself. Offenders faced confiscation of their property and perpetual banishment, and Zeno annulled all previously granted exclusive rights. It is among the earliest written laws against cornering a market, and its logic — that the powerful may not throttle trade for their own gain — is the same principle the Digital Markets Act now invokes against a digital giant.",
        "source": "Constitution of Emperor Zeno (483 AD), Corpus Juris Civilis; History of competition law",
        "href": "https://en.wikipedia.org/wiki/History_of_competition_law",
        "image": {
          "src": "/covers/google-rivals-seek-damages-eu-fine--a1.png",
          "alt": "Gold tremissis coin of Emperor Zeno minted at Constantinople, showing his diademed bust",
          "credit": "Wikimedia Commons (CC BY-SA 3.0)"
        }
      },
      {
        "category": "literary",
        "title": "Gulliver bound by the Lilliputians in 'Gulliver's Travels', 1726",
        "excerpt": "I attempted to rise, but was not able to stir: for, as I happened to lie on my back, I found my arms and legs were strongly fastened on each side to the ground; and my hair, which was long and thick, tied down in the same manner. I likewise felt several slender ligatures across my body, from my arm-pits to my thighs.",
        "source": "Jonathan Swift, 'Gulliver's Travels' (1726), Part I: A Voyage to Lilliput — Project Gutenberg",
        "href": "https://www.gutenberg.org/files/829/829-h/829-h.htm",
        "image": {
          "src": "/covers/google-rivals-seek-damages-eu-fine--a2.png",
          "alt": "Illustration of the giant Gulliver pinned to the ground by hundreds of tiny Lilliputians",
          "credit": "Gulliver's Travels: Coloured Picture Book, 1883 — Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "literary",
        "title": "David and Goliath, 1 Samuel 17 (King James Bible, 1611)",
        "excerpt": "And David put his hand in his bag, and took thence a stone, and slang it, and smote the Philistine in his forehead, that the stone sunk into his forehead; and he fell upon his face to the earth. So David prevailed over the Philistine with a sling and with a stone, and smote the Philistine, and slew him; but there was no sword in the hand of David.",
        "source": "1 Samuel 17:49-50, King James Version (1611) — Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/1_Samuel",
        "image": {
          "src": "/covers/google-rivals-seek-damages-eu-fine--a3.png",
          "alt": "Painting of the small figure of David swinging his sling before the towering, armored Goliath",
          "credit": "Osmar Schindler, 'David und Goliath', 1888 — Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Goya's 'The Colossus' (El Coloso), c. 1808-1812",
        "excerpt": "In this dark canvas from the Prado, a giant rises above the mountains with one fist raised, filling the sky, while below him a landscape of tiny people, carts and animals scatters in panic across the plain. The colossus is immense and menacing, yet the painting's real drama is the multitude beneath — the small figures whose fate is bound to the giant's every move. It is the visual grammar of the Google story: one towering presence, and a countless swarm of the small living in its shadow, now turning to stand against it.",
        "source": "Francisco de Goya (attributed), 'The Colossus' (El Coloso), c. 1808-1812, Museo del Prado, Madrid",
        "href": "https://en.wikipedia.org/wiki/The_Colossus_(painting)",
        "image": {
          "src": "/covers/google-rivals-seek-damages-eu-fine--a4.png",
          "alt": "Goya's 'The Colossus': a giant looming over a plain as tiny people and animals flee below",
          "credit": "Francisco de Goya, Museo del Prado — Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Udo Keppler's 'Next!', 1904",
        "excerpt": "This chromolithograph from Puck depicts the Standard Oil monopoly as a bloated octopus, its tentacles wrapped around the copper, steel and shipping industries, around a statehouse and the U.S. Capitol, with one arm reaching hungrily toward the White House. The image made the abstract danger of monopoly visible: a single organism strangling everything it could grasp. It rhymes exactly with the charge against Google — a dominant firm accused of using its reach to favor itself and choke the rivals around it — and with the antitrust backlash that followed.",
        "source": "Udo Keppler, 'Next!', Puck magazine, 7 September 1904 — Library of Congress / Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Standard_oil_octopus_loc_color.jpg",
        "image": {
          "src": "/covers/google-rivals-seek-damages-eu-fine--a5.png",
          "alt": "Colour cartoon of Standard Oil as an octopus gripping industries and reaching for the Capitol",
          "credit": "Udo Keppler, Puck, 1904 — Library of Congress via Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 6
  },
  {
    "slug": "asian-chip-rout-stocks-selloff",
    "headline": "Asian chip stocks crater as Samsung posts its worst day in nearly 20 years and South Korea's KOSPI falls 10.8%",
    "overview": "Asian semiconductor shares tumbled Tuesday as investors questioned lofty AI valuations and feared Chinese competition, with Samsung Electronics closing down 13.4% in its worst one-day fall in almost two decades and SK Hynix losing 14.7%. South Korea's KOSPI sank 10.8%, its biggest drop since March and steep enough to trigger a circuit breaker, while Japan's Kioxia fell 18.3% and Taiwan's MediaTek nearly 10%. The rout followed CXMT's blockbuster Shanghai debut and Beijing's push into homegrown chipmaking tools.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMigwFBVV95cUxNWUF6MHN4NmxzbUxRX0JpZGFFTlliRjB0WW1DQ3NvVUpQVFJ3aFNoUFJ6cG0tNGx2anJ3OFFTWXk3VUdQQVowWHdoRnVzZTZsZV9KdTR1cWxDeFpXTTFidGxCR25jc2ZYUXp1Z2lYRzJwZDcweHNJalJfamhJT0lvTXRKWQ?oc=5"
      },
      {
        "name": "The Irish Times",
        "href": "https://www.irishtimes.com/business/2026/07/28/chip-rout-deepens-on-circular-funding-and-china-competition-fears/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-28",
    "image": {
      "src": "/covers/asian-chip-rout-stocks-selloff.png",
      "alt": "Brokers crowd the trading floor of the New York Stock Exchange, working amid a sea of paper and telephones",
      "credit": "Thomas J. O'Halloran, U.S. News & World Report Collection, Library of Congress (public domain), via Wikimedia Commons"
    },
    "edition": "Morning Edition · 28 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Dutch tulip mania of 1636-37",
        "excerpt": "For a giddy few months in the Dutch Golden Age, contracts for rare tulip bulbs changed hands at fantastical prices, with a single Semper Augustus root said to fetch the cost of a fine Amsterdam house. Weavers, merchants and nobles alike piled into a futures market for flowers that had not yet bloomed, certain the boom would never end. In February 1637 buyers simply failed to appear at a routine bulb auction in Haarlem, confidence evaporated overnight, and prices collapsed as swiftly as they had soared, leaving the last holders ruined and the mania a byword for speculative folly.",
        "source": "Tulip mania, Dutch Republic, 1636-1637 (Wikipedia)",
        "href": "https://en.wikipedia.org/wiki/Tulip_mania",
        "image": {
          "src": "/covers/asian-chip-rout-stocks-selloff--a0.png",
          "alt": "17th-century gouache of the Semper Augustus tulip, its white petals streaked with flame-red, the most coveted bulb of the mania",
          "credit": "Anonymous 17th-century artist, Norton Simon Museum (public domain), via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "The Wall Street Crash of 1929",
        "excerpt": "After a decade of soaring share prices and blind faith in ever-rising markets, American stocks broke on Black Thursday and then cratered on Black Tuesday, 29 October 1929, when a record 16 million shares were dumped in a single frenzied session. The euphoria of the boom turned instantly to terror as fortunes vanished, brokers were wiped out, and solemn crowds massed outside the New York Stock Exchange. The crash erased years of paper wealth in days and helped tip the world into the Great Depression.",
        "source": "Wall Street Crash of 1929 (Wikipedia)",
        "href": "https://en.wikipedia.org/wiki/Wall_Street_crash_of_1929",
        "image": {
          "src": "/covers/asian-chip-rout-stocks-selloff--a1.png",
          "alt": "A solemn crowd gathers on the street outside the New York Stock Exchange after the 1929 crash",
          "credit": "U.S. federal government photograph, 1929 (public domain), via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Charles Mackay's Memoirs of Extraordinary Popular Delusions and the Madness of Crowds (1841)",
        "excerpt": "At last, however, the more prudent began to see that this folly could not last for ever. Rich people no longer bought the flowers to keep them in their gardens, but to sell them again at cent per cent profit. It was seen that somebody must lose fearfully in the end. As this conviction spread, prices fell, and never rose again. Confidence was destroyed, and a universal panic seized upon the dealers.",
        "source": "Charles Mackay, \"The Tulipomania,\" Memoirs of Extraordinary Popular Delusions and the Madness of Crowds, Vol. 1, Ch. 3 (1841)",
        "href": "https://en.wikisource.org/wiki/Memoirs_of_Extraordinary_Popular_Delusions_and_the_Madness_of_Crowds/Volume_1/Chapter_3"
      },
      {
        "category": "literary",
        "title": "Émile Zola's L'Argent (Money), 1891",
        "excerpt": "The quivering and rumbling, like that of a steam-engine at work, was ever increasing, agitating the entire Bourse—subsiding only for a second to burst forth yet louder, in the same way as a flame may flicker and then flare high again.",
        "source": "Émile Zola, Money (L'Argent), trans. Ernest A. Vizetelly, Ch. I (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/56987/56987-h/56987-h.htm"
      },
      {
        "category": "artistic",
        "title": "Jan Brueghel the Younger's Satire on Tulip Mania (c. 1640)",
        "excerpt": "Painted in the wake of the tulip crash, Brueghel dresses his speculators as monkeys in fine merchants' clothes, weighing bulbs, counting coins, toasting their paper fortunes and drawing up contracts in a manicured garden. One ape checks a price list, another is carried off to court, and a third urinates on the now-worthless flowers, while a funeral procession trails through the background. The picture skewers greed and herd folly exactly as investors today second-guess the giddy valuations that drove chipmakers skyward.",
        "source": "Jan Brueghel the Younger, Satire on Tulip Mania, c. 1640, Frans Hals Museum, Haarlem",
        "href": "https://commons.wikimedia.org/wiki/File:Jan_Brueghel_the_Younger,_Satire_on_Tulip_Mania,_c._1640.jpg",
        "image": {
          "src": "/covers/asian-chip-rout-stocks-selloff--a4.png",
          "alt": "Oil painting of monkeys dressed as merchants trading tulip bulbs, quarrelling and counting money in a formal garden, a satire on speculation",
          "credit": "Jan Brueghel the Younger, c. 1640, Frans Hals Museum (public domain), via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "William Holbrook Beard's The Bulls and Bears in the Market (1879)",
        "excerpt": "Beard stages the language of Wall Street as literal beasts: a herd of bulls and a pack of bears lock horns and claws in a violent stampede on the paved square before the columned Stock Exchange. Blood, dust and bared teeth turn abstract market forces into raw animal panic, the euphoric charge of buyers meeting the savage rush of sellers. It is a fitting emblem for a single day in which optimism curdled into rout and a benchmark index plunged double digits.",
        "source": "William Holbrook Beard, The Bulls and Bears in the Market, 1879, New-York Historical Society",
        "href": "https://commons.wikimedia.org/wiki/File:The_Bulls_and_Bears_in_the_Market.jpeg",
        "image": {
          "src": "/covers/asian-chip-rout-stocks-selloff--a5.png",
          "alt": "Painting of bulls and bears fighting in a chaotic stampede outside the New York Stock Exchange, symbolising market volatility",
          "credit": "William Holbrook Beard, 1879, New-York Historical Society (public domain), via Wikimedia Commons"
        }
      }
    ],
    "rank": 7
  },
  {
    "slug": "jj-talc-baby-powder-settlement",
    "headline": "Johnson & Johnson offers $5.5 billion to settle roughly 69,000 talc cancer lawsuits",
    "overview": "Johnson & Johnson said it will pay up to $5.5 billion to resolve about 69,000 lawsuits claiming its talc-based baby powder caused ovarian cancer, a deal that would cover 99.75% of outstanding US talc cases. The company will offer up to $3 billion next year, with no further payments due before 2028, but the settlement still needs approval from 95% of claimants and the federal judge overseeing the litigation. J&J's litigation chief called the claims 'meritless' but said the company wanted closure after a decade of court fights.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMizgFBVV95cUxNNWh0SU9NM0lYNVVxRHR5Xy1QWjZKa3IyZFoyaHdzVW9pYnM1Z3Z5alYweU1FN3BLeDZKNHM4Q2xCRVNnMGY3Nk9tVndkeW9jR1NvMV9KLVhWczFTeEZ2X2Z5c3pHTVpzdy1EVVBqbGU2TVRwUmozVGRvTnIyN0VEQ0JiZUY4Y1lWemE3WlBSMFI0TlB1OGwtQ0lCcXdUbS1XZTVSb29fcFFLbXpvNWlVelRSeGdUMGNJX1k5Wk10aEhWSV9fV3hRaThaaGJJUQ?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/clyqnz52rp6o"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-28",
    "image": {
      "src": "/covers/jj-talc-baby-powder-settlement.png",
      "alt": "A bottle of Johnson & Johnson's baby powder photographed on a table",
      "credit": "Austin Kirk via Wikimedia Commons (CC BY 2.0)"
    },
    "edition": "Morning Edition · 28 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Ancient Rome's 'sugar of lead' wine sweetener (c. 1st century BCE-4th century CE)",
        "excerpt": "For centuries Romans sweetened their wine and food with sapa and defrutum, grape syrups boiled down in lead pots until they took up lead(II) acetate, a substance so pleasant it was literally called 'sugar of lead.' A lead derivative flavors roughly ninety of the 450 recipes in the late-Roman cookbook of Apicius, meaning a slow household poison was cooked into everyday meals as a mark of taste and comfort. Like talc marketed for generations as gentle enough for a baby's skin, it was a trusted domestic staple whose harm was invisible until the reckoning came long after.",
        "source": "Lead(II) acetate ('sugar of lead') and Roman use of sapa/defrutum, Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Lead(II)_acetate",
        "image": {
          "src": "/covers/jj-talc-baby-powder-settlement--a0.png",
          "alt": "An inscribed Roman lead water pipe, 20-47 CE, from the Wellcome Collection",
          "credit": "Wellcome Collection via Wikimedia Commons (CC BY 4.0)"
        }
      },
      {
        "category": "historical",
        "title": "The Radium Girls and their 1928 settlement",
        "excerpt": "In the factories of the U.S. Radium Corporation in the 1920s, young women painted glowing watch dials by wetting their brushes on their lips-'lip, dip, paint'-having been assured the luminous radium paint was harmless. As they sickened and died, five of them, dubbed 'The Case of the Five Women Doomed to Die,' sued; when the case reached trial in 1928 none was strong enough to raise her arm to take the oath. The company, which had long denied and delayed, settled that year with cash, pensions and medical costs-an early corporate reckoning over a consumer product sold as safe, echoing J&J's decision to pay billions to close out its talc litigation.",
        "source": "Radium Girls, Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Radium_Girls",
        "image": {
          "src": "/covers/jj-talc-baby-powder-settlement--a1.png",
          "alt": "Women painting watch dials in a United States Radium Corporation factory, circa 1922",
          "credit": "U.S. Radium Corporation, ca. 1922, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "literary",
        "title": "Henrik Ibsen, An Enemy of the People (1882)",
        "excerpt": "The whole Bath establishment is a whited, poisoned sepulchre, I tell you-the gravest possible danger to the public health! All the nastiness up at Molledal, all that stinking filth, is infecting the water in the conduit-pipes leading to the reservoir; and the same cursed, filthy poison oozes out on the shore too-",
        "source": "Henrik Ibsen, An Enemy of the People, Act I (trans. R. Farquharson Sharp), Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/2446/pg2446.txt",
        "image": {
          "src": "/covers/jj-talc-baby-powder-settlement--a2.png",
          "alt": "Studio portrait photograph of the Norwegian dramatist Henrik Ibsen",
          "credit": "Julius Cornelius Schaarwachter via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "literary",
        "title": "Upton Sinclair, The Jungle (1906)",
        "excerpt": "There was never the least attention paid to what was cut up for sausage; there would come all the way back from Europe old sausage that had been rejected, and that was moldy and white-it would be dosed with borax and glycerine, and dumped into the hoppers, and made over again for home consumption. There would be meat that had tumbled out on the floor, in the dirt and sawdust, where the workers had tramped and spit uncounted billions of consumption germs. There would be meat stored in great piles in rooms; and the water from leaky roofs would drip over it, and thousands of rats would race about on it. ... These rats were nuisances, and the packers would put poisoned bread out for them; they would die, and then rats, bread, and meat would go into the hoppers together.",
        "source": "Upton Sinclair, The Jungle, Chapter 14 (1906)",
        "href": "https://www.gutenberg.org/ebooks/140",
        "image": {
          "src": "/covers/jj-talc-baby-powder-settlement--a3.png",
          "alt": "Front cover of the 1906 first edition of Upton Sinclair's The Jungle",
          "credit": "Doubleday, Page & Co., 1906, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "William Hogarth, The Company of Undertakers (1736)",
        "excerpt": "Hogarth's engraving arranges famous quacks and bewigged physicians into a mock coat of arms, deliberately blurring the line between licensed medicine and fraud to suggest that the men profiting from the public's health were peddling harm dressed as remedy. Its cold satire of an industry that markets dangerous nostrums while cloaking itself in respectability rhymes with a modern manufacturer defending a household product as safe even as it pays billions to end the claims against it.",
        "source": "William Hogarth, 'A Consultation of Physicians' / The Company of Undertakers, 1736 engraving",
        "href": "https://en.wikipedia.org/wiki/The_Company_of_Undertakers",
        "image": {
          "src": "/covers/jj-talc-baby-powder-settlement--a4.png",
          "alt": "Hogarth's 1736 engraving The Company of Undertakers, a mock coat of arms of quacks and physicians",
          "credit": "William Hogarth, 1736, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "William Hogarth, Gin Lane (1751)",
        "excerpt": "In Hogarth's print an ordinary, cheap consumable-gin-becomes the quiet poison of an entire neighborhood: a stupefied mother lets her infant slip from her arms while ruin, decay and death spread through the household and the street. Issued to rally support for regulating a product sold on every corner as harmless pleasure, it captures the theme at the heart of the talc story: a trusted everyday item revealed as a slow domestic danger, and the public struggle to force a reckoning.",
        "source": "William Hogarth, Gin Lane, 1751 (published with Beer Street)",
        "href": "https://en.wikipedia.org/wiki/Beer_Street_and_Gin_Lane",
        "image": {
          "src": "/covers/jj-talc-baby-powder-settlement--a5.png",
          "alt": "William Hogarth's 1751 engraving Gin Lane, showing a ruined London street ravaged by gin",
          "credit": "William Hogarth, 1751, via Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 8
  },
  {
    "slug": "zidane-named-france-head-coach",
    "headline": "Zinedine Zidane named France head coach, succeeding Didier Deschamps after the 2026 World Cup",
    "overview": "The French Football Federation named Zinedine Zidane head coach of the men's national team on Tuesday, ending Didier Deschamps's 14-year tenure after France's fourth-place finish at the 2026 World Cup. Zidane, who won the World Cup as a player in 1998 and three Champions League titles as Real Madrid manager, returns to the dugout for the first time since 2021 on a deal running toward the 2030 tournament. The appointment fulfills a long-anticipated homecoming for one of French football's most revered figures.",
    "genre": "Culture",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/sport/football/articles/cpd741qn2y9o"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMivgFBVV95cUxQLUVOdFkyRmVpay1hUFJRYnBHQmZQaW96ZS1tNWlPM1k1MTdyUzlSdDZmNXItZnQ5UEVMb0phLVV2WHh1VGtCcUlZV3hWZDJUMkJ3ZGtaTjN5U1dqbk43cngyRmluMVVtVVZTd3RYU1gxemxkSHUxczN4ZkJ5VGJEb241M09IM2V4QmlMbTdpeWNNQ01zTERzdnZVaWV2dC1mbDlMVk0wTklKR1RnemZnVGUzaEhmYkR1MG9OSG1n?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-28",
    "image": {
      "src": "/covers/zidane-named-france-head-coach.png",
      "alt": "Zinedine Zidane on the pitch, playing the ball",
      "credit": "el mundodelaura via Wikimedia Commons, CC BY 2.0"
    },
    "edition": "Morning Edition · 28 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Cincinnatus called from his plough to lead Rome (458 BC)",
        "excerpt": "There he was found by the deputation from the senate either digging out a ditch or ploughing, at all events, as is generally agreed, intent on his husbandry. After mutual salutations he was requested to put on his toga that he might hear the mandate of the senate... When he had put it on, and wiped off some of his sweat and dust, he presented himself; and the envoys at once congratulated him and saluted him as dictator.",
        "source": "Livy, History of Rome, Book 3, ch. 26 (Rev. Canon Roberts translation), via Perseus Digital Library",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.02.0026%3Abook%3D3%3Achapter%3D26",
        "image": {
          "src": "/covers/zidane-named-france-head-coach--a0.png",
          "alt": "Painting of Cincinnatus receiving the deputies of the Senate at his farm",
          "credit": "Alexandre Cabanel, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "historical",
        "title": "Charles de Gaulle's return to power in France (1958)",
        "excerpt": "Twelve years after retiring from public life, Charles de Gaulle was recalled to lead France as the Fourth Republic collapsed amid the Algerian crisis of May 1958. Named prime minister on 1 June 1958 with extraordinary powers, the wartime hero drafted a new constitution, founded the Fifth Republic, and was elected its first president that December. It was the archetypal French homecoming of a revered figure summoned back to steady the nation in a moment of doubt.",
        "source": "May 1958 crisis in France; return of Charles de Gaulle, Wikipedia",
        "href": "https://en.wikipedia.org/wiki/May_1958_crisis_in_France",
        "image": {
          "src": "/covers/zidane-named-france-head-coach--a1.png",
          "alt": "Portrait of General Charles de Gaulle in 1945",
          "credit": "The National Archives UK, via Wikimedia Commons (no restrictions)"
        }
      },
      {
        "category": "literary",
        "title": "The homecoming of Odysseus in Homer's Odyssey, Book 23 (c. 8th century BC)",
        "excerpt": "So he spake, and at once her knees were loosened, and her heart melted within her, as she knew the sure tokens that Odysseus showed her. Then she fell a weeping, and ran straight toward him and cast her hands about his neck, and kissed his head and spake, saying: “Be not angry with me, Odysseus, for thou wert ever at other times the wisest of men.”",
        "source": "Homer, The Odyssey, Book 23 (Butcher and Lang translation, 1879), Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/1728/pg1728.txt",
        "image": {
          "src": "/covers/zidane-named-france-head-coach--a2.png",
          "alt": "Renaissance fresco depicting the return of Odysseus to Penelope",
          "credit": "Pinturicchio, The Return of Odysseus, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "literary",
        "title": "The once and future king in Malory's Le Morte d'Arthur (1485)",
        "excerpt": "Yet some men say in many parts of England that King Arthur is not dead, but had by the will of our Lord Jesu into another place; and men say that he shall come again, and he shall win the holy cross. I will not say it shall be so, but rather I will say: here in this world he changed his life. But many men say that there is written upon his tomb this verse: Hic jacet Arthurus, Rex quondam, Rexque futurus.",
        "source": "Sir Thomas Malory, Le Morte d'Arthur, Book XXI, ch. VII, Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/1252/pg1252.txt",
        "image": {
          "src": "/covers/zidane-named-france-head-coach--a3.png",
          "alt": "Painting of the dying King Arthur borne away to Avalon",
          "credit": "James Archer, The Death of King Arthur (1860), via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Handel's “See, the Conqu'ring Hero Comes” from Judas Maccabaeus, HWV 63 (1746)",
        "excerpt": "Handel's oratorio Judas Maccabaeus culminates in the chorus “See, the conqu'ring hero comes,” a swelling anthem of welcome for a triumphant leader returning to his people. Composed in 1746, its stately march became the definitive musical image of the champion's homecoming, still sounded when a hero is received in glory. Its air rhymes with a nation greeting the returning icon called back to command.",
        "source": "George Frideric Handel, Judas Maccabaeus, HWV 63 (1746), IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Judas_Maccabaeus,_HWV_63_(Handel,_George_Frideric)",
        "image": {
          "src": "/covers/zidane-named-france-head-coach--a4.png",
          "alt": "Portrait of composer George Frideric Handel",
          "credit": "Attributed to Balthasar Denner, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Rubens's The Triumphal Entry of Henry IV into Paris (c. 1627–1630)",
        "excerpt": "Peter Paul Rubens's vast canvas depicts Henry IV of France entering Paris in triumph in 1594, the victorious king borne through the city amid allegorical figures and a jubilant throng. The painting distills the ancient dream of the conquering leader received home in glory by his people. Its French subject makes it a fitting emblem for a celebrated countryman summoned back to lead the nation once more.",
        "source": "Peter Paul Rubens, The Triumphal Entry of Henry IV into Paris (Uffizi), via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Peter_Paul_Rubens_-_Triumphal_Entry_of_Henry_IV_into_Paris_-_WGA20348.jpg",
        "image": {
          "src": "/covers/zidane-named-france-head-coach--a5.png",
          "alt": "Baroque painting of Henry IV of France entering Paris in triumph",
          "credit": "Peter Paul Rubens, via Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 9
  },
  {
    "slug": "ariana-grande-sues-hackers-leaks",
    "headline": "Ariana Grande sues anonymous hackers over years of leaked unreleased music, photos and video",
    "overview": "Ariana Grande filed suit in Los Angeles on Monday against anonymous hackers she says have repeatedly stolen and leaked her unreleased masters, demos, music videos and private photos, alleging they sold the material on the dark web. The complaint says 45 of her songs were stolen and leaked in 2023 alone, with the hackers targeting her photographers and producers. Grande is suing for invasion of privacy, conversion and violations of California's computer-hacking law, and is demanding a jury trial.",
    "genre": "Culture",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c1l1de9gjj6o"
      },
      {
        "name": "Variety",
        "href": "https://variety.com/2026/music/news/ariana-grande-sues-hackers-leaking-unreleased-music-footage-1236822277/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-28",
    "image": {
      "src": "/covers/ariana-grande-sues-hackers-leaks.png",
      "alt": "The mixing console and control room of London Bridge Studio, a professional recording studio in Seattle",
      "credit": "Guywelch2000, Wikimedia Commons (CC0)"
    },
    "edition": "Morning Edition · 28 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "St. Columba's secret copying of St. Finnian's psalter, c. 560 AD",
        "excerpt": "In sixth-century Ireland the monk Columba borrowed a rare psalter from Finnian and, working by night, secretly copied it for himself. Finnian claimed the copy as his own, and the High King Diarmait ruled against Columba with a judgment remembered as the first case in the law of copying: \"To every cow her calf, to every book its copy.\" It is the earliest recorded dispute over who owns a reproduction of a creator's work, a quarrel so bitter it is said to have ended in the Battle of Cul Dreimhne, prefiguring today's fight over who may possess an artist's unreleased masters.",
        "source": "Cathach of St. Columba, Royal Irish Academy (traditional account of the copy of Finnian's psalter)",
        "href": "https://en.wikipedia.org/wiki/Cathach_of_St._Columba",
        "image": {
          "src": "/covers/ariana-grande-sues-hackers-leaks--a0.png",
          "alt": "A page of Insular Latin script from the Cathach of St. Columba, the psalter at the heart of the copying dispute",
          "credit": "Royal Irish Academy via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "historical",
        "title": "The theft of the Mona Lisa from the Louvre, 1911",
        "excerpt": "On 21 August 1911 Vincenzo Peruggia, an Italian handyman who had helped build the painting's protective case, lifted Leonardo's Mona Lisa off the wall of the Salon Carre and walked out of the Louvre with it hidden under his smock. For more than two years the masterpiece sat in a trunk with a false bottom in his cramped Paris lodging before he tried to sell it. The audacious taking of a treasure straight from its guarded vault, and its long concealment out of public view, mirrors the seizure and hoarding of an artist's private, unreleased work.",
        "source": "The 1911 Mona Lisa theft by Vincenzo Peruggia (Louvre)",
        "href": "https://en.wikipedia.org/wiki/Mona_Lisa",
        "image": {
          "src": "/covers/ariana-grande-sues-hackers-leaks--a1.png",
          "alt": "The vacant space on the Louvre's Salon Carre wall where the Mona Lisa hung before it was stolen in 1911",
          "credit": "Century Magazine (1914), Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "literary",
        "title": "Aeschylus, \"Prometheus Bound,\" c. 430 BC",
        "excerpt": "And I am he that searched out the source of fire, by stealth borne-off inclosed in a fennel-rod, which has shown itself a teacher of every art to mortals, and a great resource.",
        "source": "Aeschylus, Prometheus Bound, trans. Theodore Alois Buckley (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/27458/27458-h/27458-h.htm",
        "image": {
          "src": "/covers/ariana-grande-sues-hackers-leaks--a2.png",
          "alt": "Rubens's painting of Prometheus bound and tormented for stealing fire from the gods",
          "credit": "Peter Paul Rubens, Philadelphia Museum of Art, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "literary",
        "title": "Hans Christian Andersen, \"The Little Mermaid,\" 1837",
        "excerpt": "\"Here it is,\" said the witch, cutting off the little mermaid's tongue; so now she was dumb, and could neither sing nor speak.",
        "source": "Hans Christian Andersen, The Little Mermaid (Wikisource, public-domain translation)",
        "href": "https://en.wikisource.org/wiki/The_Fairy_Tales_of_Hans_Christian_Andersen/The_Little_Mermaid",
        "image": {
          "src": "/covers/ariana-grande-sues-hackers-leaks--a3.png",
          "alt": "Edmund Dulac's illustration of the little mermaid, who surrenders her voice",
          "credit": "Edmund Dulac, Stories from Hans Andersen (1911), via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Peter Paul Rubens, \"Prometheus Bound,\" c. 1611-1612",
        "excerpt": "Rubens's great canvas shows Prometheus pinned to a crag, an eagle tearing at the flesh of the Titan who dared to steal the gods' fire and hand it to humankind. The violence done to the body is the price exacted for taking what was meant to be kept locked away. The painting turns theft of a jealously guarded creation into a spectacle of punishment and endurance, a mythic frame for a modern artist whose guarded work was carried off and exposed.",
        "source": "Peter Paul Rubens (with Frans Snyders), Prometheus Bound, Philadelphia Museum of Art",
        "href": "https://en.wikipedia.org/wiki/Prometheus_Bound_(Rubens)",
        "image": {
          "src": "/covers/ariana-grande-sues-hackers-leaks--a4.png",
          "alt": "Peter Paul Rubens's Prometheus Bound, oil on canvas, showing the eagle attacking the chained Titan",
          "credit": "Peter Paul Rubens, Philadelphia Museum of Art, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Gioachino Rossini, \"La gazza ladra\" (The Thieving Magpie), 1817",
        "excerpt": "Rossini's opera semiseria turns on a theft: a servant girl, Ninetta, is condemned to death for stealing her employer's silver, only to be exonerated at the last moment when the true culprit is revealed to be a magpie that has been carrying off shining objects to its nest. Built on a real case of a girl wrongly executed as a thief, the work dramatizes stolen property, hidden loot and the ruin theft leaves in its wake, an apt overture to a lawsuit over material spirited away and stashed on the dark web.",
        "source": "Gioachino Rossini, La gazza ladra (1817), full scores on IMSLP",
        "href": "https://imslp.org/wiki/La_gazza_ladra_(Rossini,_Gioacchino)",
        "image": {
          "src": "/covers/ariana-grande-sues-hackers-leaks--a5.png",
          "alt": "Title page of the 1817 Milan libretto of Rossini's opera La gazza ladra",
          "credit": "Milan, 1817 libretto, via Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 10
  },
  {
    "slug": "partula-snails-rescued-madeira",
    "headline": "Zoos return hundreds of near-extinct Madeiran snails to a remote Atlantic island rock",
    "overview": "Conservationists at Chester Zoo and France's ZooParc de Beauval have bred and returned hundreds of tiny, critically endangered land snails to the Desertas Islands off Madeira, years after some were feared extinct. One species, Geomitra coronula, was rediscovered as just 21 survivors clinging beneath a single rock on Bugio Island before the breeding programme rebuilt its numbers. The Madeiran government enlisted the zoos to save four snail species found nowhere else on Earth.",
    "genre": "Science",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cwyq7e5d1gko"
      },
      {
        "name": "GB News",
        "href": "https://www.gbnews.com/news/chester-zoo-snails-species-extinction-rescue-mission"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-28",
    "image": {
      "src": "/covers/partula-snails-rescued-madeira.png",
      "alt": "A living Polynesian tree snail (Partula nodosa), a species saved from extinction through captive breeding, resting on a surface",
      "credit": "Bloodshot20, Wikimedia Commons (CC BY-SA 4.0)"
    },
    "edition": "Morning Edition · 28 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The ginkgo tree, preserved in Chinese temple gardens (c. 1000 AD)",
        "excerpt": "The ginkgo is a true living fossil, a lineage tens of millions of years old that was thought extinct in the wild for centuries. It survived very likely because Chinese monks planted and tended it in temple courtyards, where individual trees, some now more than 1,400 years old, were nursed across a thousand years of human care. Long before anyone spoke of captive breeding, a sacred garden became an ark, and a species that had lost its wild home persisted only because people chose to keep it alive, exactly as the Madeiran snails clung on inside zoo enclosures.",
        "source": "Wikipedia, \"Ginkgo biloba\" (living fossil; monastic cultivation)",
        "href": "https://en.wikipedia.org/wiki/Ginkgo_biloba",
        "image": {
          "src": "/covers/partula-snails-rescued-madeira--a0.png",
          "alt": "An ancient ginkgo tree, roughly 1,400 years old, growing in the grounds of Fuyan Temple, Hunan, China",
          "credit": "Huangdan2060, Wikimedia Commons (CC0)"
        }
      },
      {
        "category": "historical",
        "title": "The rescue of the American bison (1889-1907)",
        "excerpt": "By 1889 the tens of millions of bison that once covered the plains had been shot down to only a few hundred survivors, a collapse memorialized by mountains of skulls stacked at bone works. In 1905 William Hornaday and the American Bison Society formed at the Bronx Zoo, and in 1907 they shipped fifteen zoo-bred bison by rail to the Wichita Mountains in Oklahoma, the first animal reintroduction in North America. It is the same arc as the Desertas snails: a species pulled back from a tiny remnant, bred behind fences, then carried home to restock the wild.",
        "source": "Wikipedia, \"American Bison Society\" and \"American bison\"",
        "href": "https://en.wikipedia.org/wiki/American_Bison_Society",
        "image": {
          "src": "/covers/partula-snails-rescued-madeira--a1.png",
          "alt": "A vast pile of American bison skulls at Michigan Carbon Works, circa 1892, documenting the near-extermination of the species",
          "credit": "Wikimedia Commons (public domain, c. 1892)"
        }
      },
      {
        "category": "literary",
        "title": "The Flood and the Ark, Book of Genesis (King James Bible, 1611)",
        "excerpt": "And of every living thing of all flesh, two of every sort shalt thou bring into the ark, to keep them alive with thee; they shall be male and female. Of fowls after their kind, and of cattle after their kind, of every creeping thing of the earth after his kind, two of every sort shall come unto thee, to keep them alive. ... And the LORD said unto Noah, Come thou and all thy house into the ark; for thee have I seen righteous before me in this generation. Of every clean beast thou shalt take to thee by sevens, the male and his female: and of beasts that are not clean by two, the male and the female. Of fowls also of the air by sevens, the male and the female; to keep seed alive upon the face of all the earth.",
        "source": "The Holy Bible, King James Version, Genesis 6:19-20 and 7:1-3",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Genesis",
        "image": {
          "src": "/covers/partula-snails-rescued-madeira--a2.png",
          "alt": "Edward Hicks's 1846 painting of pairs of animals filing toward Noah's Ark",
          "credit": "Edward Hicks (1846), Philadelphia Museum of Art via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "literary",
        "title": "The Rime of the Ancient Mariner, Samuel Taylor Coleridge (1798)",
        "excerpt": "O happy living things! no tongue\nTheir beauty might declare:\nA spring of love gushed from my heart,\nAnd I blessed them unaware:",
        "source": "Samuel Taylor Coleridge, \"The Rime of the Ancient Mariner,\" Part IV (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/151/151-h/151-h.htm",
        "image": {
          "src": "/covers/partula-snails-rescued-madeira--a3.png",
          "alt": "Gustave Dore's 1876 engraving 'I Watched the Water-Snakes' for Coleridge's poem, the mariner gazing over the sea",
          "credit": "Gustave Dore (1876), Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Noah's Ark, Edward Hicks (1846)",
        "excerpt": "The Quaker painter Edward Hicks, best known for his Peaceable Kingdom scenes, made this single depiction of Noah's Ark near the end of his life, adapting a Currier lithograph. Pairs of lions, leopards, horses and oxen file in an orderly column toward a plain wooden vessel while storm clouds gather behind, an image of every kind gathered up and carried through catastrophe. It renders in folk-art directness exactly what the zoos accomplished for the Madeiran snails: a deliberate gathering of the vulnerable so that no species is left behind to the coming flood.",
        "source": "Edward Hicks, \"Noah's Ark,\" 1846, Philadelphia Museum of Art",
        "href": "https://www.philamuseum.org/objects/52107",
        "image": {
          "src": "/covers/partula-snails-rescued-madeira--a4.png",
          "alt": "Edward Hicks's 1846 oil painting 'Noah's Ark,' pairs of animals approaching the ark under a darkening sky",
          "credit": "Edward Hicks (1846), Philadelphia Museum of Art via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "The Carnival of the Animals, Camille Saint-Saens (1886)",
        "excerpt": "Saint-Saens composed this witty 'grand zoological fantasy' in fourteen short movements, giving each creature its own musical portrait, from the lumbering elephant on the double bass to the shimmering aquarium and the famous dying swan. It is a whole ark of animals rendered in sound, an affectionate cataloguing of living variety much like the careful species-by-species record keeping behind a captive-breeding programme. That the tiniest, humblest creatures each deserve their own tender movement is precisely the sentiment behind saving a snail once down to twenty-one survivors under a single rock.",
        "source": "Camille Saint-Saens, \"Le carnaval des animaux\" (1886), IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Le_carnaval_des_animaux_(Saint-Sa%C3%ABns,_Camille)",
        "image": {
          "src": "/covers/partula-snails-rescued-madeira--a5.png",
          "alt": "Portrait photograph of the French composer Camille Saint-Saens (1835-1921)",
          "credit": "Anonymous, Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 11
  },
  {
    "slug": "uk-mp-sues-xai-grok-sexualised-images",
    "headline": "UK lawmaker Jess Asato sues Elon Musk's xAI, seeking a court order to stop Grok making sexualised images of her",
    "overview": "Labour MP Jess Asato said Tuesday she is seeking a High Court order to bar Elon Musk's xAI from letting its Grok chatbot generate non-consensual sexualised images of her, after users made fakes — including a video depicting her being drugged and assaulted — following her criticism of Musk. Asato has sued in London for misuse of private information and breach of data-protection law, arguing Grok was designed and trained in a way that enabled the content. The case joins others against xAI in the US and the Netherlands.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiywFBVV95cUxNVEZqYTIyLTJKQm5vWDg1Wng1R194ajZTSWNVaUh0N19nMEdFbWtqbkQ1WlB3YlpPREN0U1lBSGFXNnVMRGpyV09sN0hnczMxZm84T1NvNFR2UktJV0F0UmdXbExaSWtFZDlwUG1yTmNUbXJOYXJzOEZITkhwMzVWTXE2clo3SWVmdTVMSkE3MGpHbFZvWGVILVdZdTBoOFVTdG0yOGQ2OTl2c2dEMDBkZFZ0cG01cmFZem00ckdmaG1xUW9ndTg4TVhlVQ?oc=5"
      },
      {
        "name": "Rappler",
        "href": "https://www.rappler.com/technology/jess-asato-suing-xai-stop-grok-generating-sexualized-images-united-kingdom/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-28",
    "image": {
      "src": "/covers/uk-mp-sues-xai-grok-sexualised-images.png",
      "alt": "The Victorian Gothic facade of the Royal Courts of Justice on the Strand in London, home to the High Court of England and Wales where Jess Asato filed her claim.",
      "credit": "David Castor (dcastor), CC0, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 28 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Golem of Prague legend (16th century)",
        "excerpt": "In the legend attached to Rabbi Judah Loew ben Bezalel of late-16th-century Prague, a rabbi shapes a giant from river clay and animates it with a holy name to protect his community. The made thing has no consent and no judgement of its own: in the best-known tellings it slips its maker's control and turns to rampage, and can be stopped only when the animating word is stripped away and it crumbles back to mud. It is the oldest European parable of a creation that does exactly what it was built to do until it does harm, and whose maker is left answerable for having built it.",
        "source": "The Golem of Prague, Jewish folklore associated with Rabbi Judah Loew (Maharal), 16th century; popularised in 19th-century literary retellings",
        "href": "https://en.wikipedia.org/wiki/Golem",
        "image": {
          "src": "/covers/uk-mp-sues-xai-grok-sexualised-images--a0.png",
          "alt": "Lithograph of the looming clay Golem standing in a shadowed Prague street, from Hugo Steiner-Prag's illustrations to Gustav Meyrink's novel Der Golem.",
          "credit": "Hugo Steiner-Prag, 1916, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "Stalin's falsification of photographs and the erasure of Nikolai Yezhov (1937–1940)",
        "excerpt": "Nikolai Yezhov, the secret-police chief who ran Stalin's Great Purge, was photographed walking beside the leader on the Moscow–Volga Canal. After Yezhov was himself arrested and shot, retouchers airbrushed him out of the frame, replacing his body with a smooth stretch of water so the official record showed a canal where a man had stood. It is the archetype of a person's likeness seized and remade by the powerful: an image altered to say something its subject never agreed to, and passed off as the truth.",
        "source": "Soviet photographic falsification under Stalin; documented in David King, 'The Commissar Vanishes' (1997)",
        "href": "https://en.wikipedia.org/wiki/The_Commissar_Vanishes",
        "image": {
          "src": "/covers/uk-mp-sues-xai-grok-sexualised-images--a1.png",
          "alt": "Doctored Soviet photograph of Stalin and Molotov beside a canal, with the figure of Nikolai Yezhov painted out and replaced by water.",
          "credit": "Unknown Soviet photographer/retoucher, c. 1937–1940, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Mary Shelley's Frankenstein; or, The Modern Prometheus (1831)",
        "excerpt": "Slave, I before reasoned with you, but you have proved yourself unworthy of my condescension. Remember that I have power; you believe yourself miserable, but I can make you so wretched that the light of day will be hateful to you. You are my creator, but I am your master;—obey!",
        "source": "Mary Shelley, Frankenstein; or, The Modern Prometheus, Chapter 20 (Revised Edition, 1831); the creature confronting Victor Frankenstein",
        "href": "https://en.wikisource.org/wiki/Frankenstein,_or_the_Modern_Prometheus_(Revised_Edition,_1831)/Chapter_20",
        "image": {
          "src": "/covers/uk-mp-sues-xai-grok-sexualised-images--a2.png",
          "alt": "Steel engraving of Victor Frankenstein fleeing his laboratory in horror as his newly animated creature stirs to life on the floor behind him.",
          "credit": "Theodor von Holst, frontispiece to the 1831 edition of Frankenstein, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Ovid's Metamorphoses: the tale of Actaeon (8 AD), in Arthur Golding's translation (1567)",
        "excerpt": "Now make thy vaunt among thy Mates, thou sawste Diana bare. Tell if thou can: I give thee leave: tell hardily: doe not spare.",
        "source": "Ovid, Metamorphoses, Book III (the story of Diana and Actaeon), trans. Arthur Golding (1567), via Perseus Digital Library",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0074:book=3:card=173"
      },
      {
        "category": "artistic",
        "title": "Titian's Diana and Actaeon (1556–1559)",
        "excerpt": "Titian paints the instant a woman's privacy is breached: the hunter Actaeon parts a curtain and stumbles on the goddess Diana bathing naked among her nymphs, who twist and recoil under his intruding gaze. The startled bodies, the exposed flesh, the goddess's fury at being seen against her will — all of it turns an unbidden look into a violation for which the intruder will be destroyed. It is the old moral of the stolen image made overwhelmingly physical, four centuries before a chatbot could manufacture the same trespass on demand.",
        "source": "Titian (Tiziano Vecellio), Diana and Actaeon, 1556–1559, oil on canvas; National Gallery, London / National Galleries of Scotland",
        "href": "https://en.wikipedia.org/wiki/Diana_and_Actaeon_(Titian)",
        "image": {
          "src": "/covers/uk-mp-sues-xai-grok-sexualised-images--a4.png",
          "alt": "Titian's painting of the hunter Actaeon drawing back a red curtain and surprising the goddess Diana and her nymphs as they bathe, the women startling in alarm.",
          "credit": "Titian (Tiziano Vecellio), 1556–1559, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Marc-Antoine Charpentier's Actéon, H.481 (1684)",
        "excerpt": "In Charpentier's brief French Baroque opera the hunter Actaeon, having glimpsed Diana bathing, is transformed into a stag and then set upon and torn to pieces by his own hounds — the very creatures he trained and commanded now turned against their master. Sung across six intimate scenes, the drama compresses the theme into music: a punishment that arrives not from outside but from one's own instruments, the pack doing precisely what it was bred to do to a quarry it can no longer recognise as its lord. The maker undone by his own making, staged as tragedy.",
        "source": "Marc-Antoine Charpentier, Actéon, H.481, pastorale / chamber opera, c. 1684, after Ovid's Metamorphoses",
        "href": "https://imslp.org/wiki/Act%C3%A9on,_H.481_(Charpentier,_Marc-Antoine)",
        "image": {
          "src": "/covers/uk-mp-sues-xai-grok-sexualised-images--a5.png",
          "alt": "Late-Renaissance painting of Diana and her nymphs bathing as Actaeon surprises them, the scene Charpentier's opera sets to music.",
          "credit": "Joseph Heintz the Elder, 1590s, Kunsthistorisches Museum, public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 12
  },
  {
    "slug": "unilever-raises-outlook-volume-growth",
    "headline": "Unilever raises its 2026 outlook after its strongest volume growth in more than a decade",
    "overview": "Unilever lifted its full-year sales forecast on Tuesday after posting underlying sales growth of 5.8% in the second quarter, powered by its best volume growth — 5.5% — in more than a decade as shoppers kept buying Dove, Vaseline and Cif despite budget strains from the Iran war. The maker now expects 2026 underlying sales growth within its 4%–6% range, up from the bottom end, and its shares jumped more than 6%. The results marked an early win for the consumer-goods giant's 'Desire at Scale' strategy.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiswFBVV95cUxQdnBpbEFMQzhPN25qYTZlMnQ3SzUwRUtRR3NaX2FraHVRQXluZS11Vmo2Wi1YdzNIellXV1NOUko2R0xnYjAyaldLN0VRRGpWaW82UDlBdlRkSHFCdHh5Nk5jU05KS0VPZ3dNVWJFYVBQeFFkTTdCTi1kbUsxdElreG82cEZYTW9UcWdTTzAwT0tiYVV6aWtKTnRrMUV5YWpLcXVfcFpFSGdiWjJ5ZGJ3WDVJNA?oc=5"
      },
      {
        "name": "RTÉ",
        "href": "https://www.rte.ie/news/business/2026/0728/1585385-unilever-quarterly-sales/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-28",
    "image": {
      "src": "/covers/unilever-raises-outlook-volume-growth.png",
      "alt": "Long supermarket aisle lined with fully stocked shelves of packaged consumer goods",
      "credit": "Frankie Fouganthin, Wikimedia Commons (CC BY-SA 4.0)"
    },
    "edition": "Morning Edition · 28 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Champagne fairs of medieval France (c. 1180-1300)",
        "excerpt": "For more than a century the six great fairs cycling through Troyes, Provins, Lagny and Bar-sur-Aube were the beating heart of European commerce, drawing merchants from Flanders, Italy, Spain and England to trade wool, cloth, spices and wine. Protected by the Counts of Champagne and lubricated by an early merchant law and credit system, they turned everyday goods into a continent-spanning engine of the medieval 'Commercial Revolution' even as war, plague and famine periodically stalked the same era. The fairs are a reminder that brisk, resilient trade in ordinary staples can thrive precisely because people keep needing and wanting them, hard times or not, just as Unilever's soaps and creams kept selling through wartime budget strain.",
        "source": "Champagne fairs, Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Champagne_fairs",
        "image": {
          "src": "/covers/unilever-raises-outlook-volume-growth--a0.png",
          "alt": "Engraving of a crowded fair in Champagne in the 13th century, with stalls and merchants",
          "credit": "'Une foire en Champagne au XIIIe siecle', Album historique (1898), Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "historical",
        "title": "The post-war American consumer boom of the 1950s",
        "excerpt": "In the decade after World War II, a surging population, rising wages and new self-service supermarkets turned the United States into a machine of mass consumption, its neon-lit stores overflowing with branded soaps, foods and household goods that ordinary families snapped up in bulk. It was the golden age of the brand and the advertisement, when small everyday comforts sold at unprecedented scale and volume growth, not scarcity, defined the marketplace. Unilever's record volumes and its household names, Dove, Vaseline and Cif, are a direct descendant of that boom: the ordinary tub and bottle, bought again and again, powering a corporate upgrade in outlook.",
        "source": "Post-World War II economic expansion, Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Post%E2%80%93World_War_II_economic_expansion",
        "image": {
          "src": "/covers/unilever-raises-outlook-volume-growth--a1.png",
          "alt": "Interior of an American supermarket in 1955, shelves stacked with packaged goods",
          "credit": "Seattle Municipal Archives, 1955, Wikimedia Commons (CC BY 2.0)"
        }
      },
      {
        "category": "literary",
        "title": "Emile Zola's 'Au Bonheur des Dames' (The Ladies' Paradise) (1883)",
        "excerpt": "There was the continual roaring of a machine at work, an engulfing of customers close-pressed against the counters, bewildered amidst the piles of goods, and finally hurled towards the pay-desks. And all went on in an orderly manner, with mechanical regularity, force and logic carrying quite a nation of women through the gearing of this commercial machine.",
        "source": "Emile Zola, The Ladies' Paradise, trans. Ernest A. Vizetelly (1886), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/54726/54726-h/54726-h.htm"
      },
      {
        "category": "literary",
        "title": "Christina Rossetti's 'Goblin Market' (1862)",
        "excerpt": "Morning and evening\nMaids heard the goblins cry:\n'Come buy our orchard fruits,\nCome buy, come buy:\nApples and quinces,\nLemons and oranges,\nPlump unpecked cherries,\nMelons and raspberries,\nBloom-down-cheeked peaches,\nSwart-headed mulberries,\nWild free-born cranberries,\nCrab-apples, dewberries,\nPine-apples, blackberries,\nApricots, strawberries;--\nAll ripe together\nIn summer weather,--\nMorns that pass by,\nFair eves that fly;\nCome buy, come buy:'",
        "source": "Christina Rossetti, Goblin Market and Other Poems (1862), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/16950/16950-8.txt",
        "image": {
          "src": "/covers/unilever-raises-outlook-volume-growth--a3.png",
          "alt": "Dante Gabriel Rossetti's 1862 illustration for Goblin Market, two sisters with the goblin merchants",
          "credit": "Dante Gabriel Rossetti, frontispiece to Goblin Market and Other Poems (1862), Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Pieter Aertsen's 'A Meat Stall with the Holy Family Giving Alms' (1551)",
        "excerpt": "Aertsen's inverted still life shoves a market stall's dizzying abundance into the foreground: slabs of meat, sausages, hams, hanging pretzels, butter, cheese, fish and fowl heaped in profusion, while the tiny sacred scene of charity recedes behind. Painted in prosperous Antwerp, it is one of Western art's first great celebrations of the marketplace as spectacle, everyday goods piled high enough to overwhelm the senses. It rhymes with Unilever's story of ordinary consumer staples selling in record volume, the sheer glut of small comforts becoming the picture's true subject.",
        "source": "Pieter Aertsen, A Meat Stall with the Holy Family Giving Alms (1551), North Carolina Museum of Art",
        "href": "https://en.wikipedia.org/wiki/A_Meat_Stall_with_the_Holy_Family_Giving_Alms",
        "image": {
          "src": "/covers/unilever-raises-outlook-volume-growth--a4.png",
          "alt": "Market stall overflowing with meat, sausages, fish and dairy, a small charity scene behind",
          "credit": "Pieter Aertsen, 1551, North Carolina Museum of Art, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Frans Snyders' 'Fish Stall' (1618-1621)",
        "excerpt": "Snyders, the great Flemish painter of markets, fills his canvas with a Baroque cornucopia of the sea: gleaming fish, crabs, lobsters and shellfish spilling across the stall in glistening, tactile abundance, the vendor almost lost amid the plenty. Made for the wealthy merchant houses of Antwerp, such market pieces glorify commercial prosperity and the endless supply of goods that a thriving trading economy makes ordinary. The painting's celebration of teeming, everyday plenty mirrors a consumer giant posting its strongest volume growth in more than a decade, shelves and baskets brimming despite hard times.",
        "source": "Frans Snyders and Jan Wildens, Fish Stall (1618-1621), Hermitage Museum",
        "href": "https://commons.wikimedia.org/wiki/File:Frans_Snyders_-_Fish_Stall_-_WGA21521.jpg",
        "image": {
          "src": "/covers/unilever-raises-outlook-volume-growth--a5.png",
          "alt": "Baroque market stall overflowing with fish, crabs, lobsters and shellfish",
          "credit": "Frans Snyders and Jan Wildens, c. 1618-1621, Hermitage Museum, via Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 13
  },
  {
    "slug": "wisconsin-tornado-appleton-menasha",
    "headline": "Tornado tears through northeastern Wisconsin, cutting power to more than 340,000 as severe storms sweep the Great Lakes",
    "overview": "A tornado struck Winnebago County in northeastern Wisconsin on Monday, ripping roofs off homes in Appleton and Menasha and flipping vehicles near the shores of Lake Winnebago, while a broader line of severe storms knocked out power to more than 340,000 customers from Wisconsin to Ohio. The National Weather Service issued a rare \"particularly dangerous situation\" tornado warning as the midday sky blackened and workers sheltered in basements. No injuries had been reported by evening, though officials said some homes and businesses were severely damaged.",
    "genre": "Climate",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMirAFBVV95cUxNd2hWMlZsa1RXNWpFNmxfTTdOcTl4UTU2dmQ3aUdlYjFnUkZZSXRpS3JHV2tCWVprdzFrWXJwd1M5TGFUNjUxZWNCR0RXS1R0VF9nS2ZDeTM2dDloNFVHbEtqSnBrTTk1TnotTGtMa1V1T3l3MFk1QlRvZTdBbl9pY0RvSnBfUXhGV3AyTzAtQ2x4bkVPb0R6bThYYXA2QkpGWElnUGZCMExmX19I?oc=5"
      },
      {
        "name": "CNN",
        "href": "https://www.cnn.com/2026/07/27/weather/wisconsin-tornado-great-lakes-midwest-severe-storms-climate"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-27",
    "image": {
      "src": "/covers/wisconsin-tornado-appleton-menasha.png",
      "alt": "A large tornado descending from a dark supercell thunderstorm over open country.",
      "credit": "Photograph via Wikimedia Commons"
    },
    "lead": true,
    "edition": "Evening Edition · 27 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The kamikaze \"divine wind\" wrecks Kublai Khan's invasion fleet (1281)",
        "excerpt": "In the summer of 1281 Kublai Khan sent roughly 3,500 ships and some 140,000 troops against Japan, the Mongol vessels lashed together with chains and planks in Hakata Bay. On August 15 a colossal typhoon fell on the anchored fleet, splintering the ships and drowning the invaders in numbers that ran as high as sixty to ninety percent. Japanese chroniclers called the storm kamikaze, the \"divine wind,\" and read in the ruin of an empire's armada the proof that the gods themselves stood guard over the islands.",
        "source": "Wikipedia — Mongol invasions of Japan",
        "href": "https://en.wikipedia.org/wiki/Mongol_invasions_of_Japan",
        "image": {
          "src": "/covers/wisconsin-tornado-appleton-menasha--a0.png",
          "alt": "Samurai attacking a Mongol ship, from the Mōko Shūrai Ekotoba handscroll (c. 1293)",
          "credit": "Mōko Shūrai Ekotoba, Museum of the Imperial Collections, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "The 1925 Tri-State Tornado, deadliest in American history",
        "excerpt": "On March 18, 1925 a single tornado ground 219 miles across Missouri, Illinois, and Indiana in under four hours, moving so fast it outran the warnings that did not yet exist. It killed 695 people, leveled some 15,000 homes, and erased whole towns like Murphysboro, where more than 200 died. Roughly a third of the victims were children, many of them cut down in schools that stood directly in its path.",
        "source": "Wikipedia — Tri-State Tornado",
        "href": "https://en.wikipedia.org/wiki/Tri-State_Tornado",
        "image": {
          "src": "/covers/wisconsin-tornado-appleton-menasha--a1.png",
          "alt": "Aerial photograph of tornado devastation at De Soto, Illinois, March 1925",
          "credit": "U.S. Army Air Forces / National Archives (NARA), public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "The LORD answers Job out of the whirlwind (Book of Job 38, KJV)",
        "excerpt": "Then the LORD answered Job out of the whirlwind, and said, Who is this that darkeneth counsel by words without knowledge? Gird up now thy loins like a man; for I will demand of thee, and answer thou me. Where wast thou when I laid the foundations of the earth?",
        "source": "King James Bible, Book of Job, chapter 38 — Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Job",
        "image": {
          "src": "/covers/wisconsin-tornado-appleton-menasha--a2.png",
          "alt": "William Blake, The Lord Answering Job out of the Whirlwind (1825)",
          "credit": "William Blake, The Metropolitan Museum of Art, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "The cyclone carries off Dorothy's house in The Wonderful Wizard of Oz (1900)",
        "excerpt": "The house whirled around two or three times and rose slowly through the air. Dorothy felt as if she were going up in a balloon. The north and south winds met where the house stood, and made it the exact center of the cyclone. In the middle of a cyclone the air is generally still, but the great pressure of the wind on every side of the house raised it up higher and higher, until it was at the very top of the cyclone; and there it remained and was carried miles and miles away as easily as you could carry a feather.",
        "source": "L. Frank Baum, The Wonderful Wizard of Oz — Project Gutenberg",
        "href": "https://www.gutenberg.org/files/55/55-h/55-h.htm",
        "image": {
          "src": "/covers/wisconsin-tornado-appleton-menasha--a3.png",
          "alt": "W. W. Denslow illustration of Dorothy catching Toto as the house is caught in the cyclone",
          "credit": "W. W. Denslow (1900), public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "J.M.W. Turner, \"Snow Storm: Steam-Boat off a Harbour's Mouth\" (c. 1842)",
        "excerpt": "Turner dissolves ship, sea, and sky into a single churning vortex of spray and smoke, the little steamboat barely legible at the storm's heart. Legend holds the painter had himself lashed to a mast for hours to know the tempest firsthand. The canvas turns raw meteorological violence into a spiral of light, the same overwhelming force that flips vehicles and strips roofs made visible as pure motion.",
        "source": "Tate Britain — Turner, Snow Storm: Steam-Boat off a Harbour's Mouth",
        "href": "https://www.tate.org.uk/art/artworks/turner-snow-storm-steam-boat-off-a-harbours-mouth-n00530",
        "image": {
          "src": "/covers/wisconsin-tornado-appleton-menasha--a4.png",
          "alt": "J.M.W. Turner, Snow Storm: Steam-Boat off a Harbour's Mouth, oil on canvas",
          "credit": "J.M.W. Turner, Tate Britain, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Beethoven, Symphony No. 6 \"Pastoral,\" 4th movement — \"The Storm\" (1808)",
        "excerpt": "After three movements of untroubled countryside, Beethoven lets a thunderstorm break loose in the fourth: low tremolos gather like rising wind, the timpani crack as thunder, and piccolo and trombones tear across the orchestra in sheets of rain. It is one of music's most vivid renderings of a squall sweeping in and passing, before the strings exhale into a shepherd's song of gratitude that the danger has spent itself. The scene rhymes with a Wisconsin evening when a violent line of storms roared through and, by nightfall, left calm behind.",
        "source": "IMSLP — Beethoven, Symphony No. 6, Op. 68 (Pastoral)",
        "href": "https://imslp.org/wiki/Symphony_No.6,_Op.68_(Beethoven,_Ludwig_van)",
        "image": {
          "src": "/covers/wisconsin-tornado-appleton-menasha--a5.png",
          "alt": "Joseph Karl Stieler, portrait of Ludwig van Beethoven (1820)",
          "credit": "Joseph Karl Stieler, Beethoven-Haus Bonn, public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 14
  },
  {
    "slug": "berlin-pride-attack-suspect-killed",
    "headline": "Germany vows security overhaul as suspect in deadly Berlin Pride van attack is killed by police and a second suspect is released",
    "overview": "The 21-year-old man suspected of driving a van into crowds at Berlin's Christopher Street Day Pride celebration on 25 July was shot dead by police during an attempted arrest, and prosecutors said Monday that a second suspect had been released for lack of evidence. The attack in the Tiergarten killed one woman and injured 29 people, several critically, and prompted anger after it emerged the suspect had received a suspended sentence weeks earlier for plotting an attack. Interior Minister Alexander Dobrindt, who called it a suspected Islamist attack, promised a sweeping security overhaul.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMiqAFBVV95cUxNUk1peTczYkVuampNNFg3QXNzcV9acU1tTndtdXl3dFcwT01hZGJxUzQ5b2ZfckltZnJaLWpzVXdZcmlpQl93cFJqWWFxa3RmLTdkWlhDTTBnX3RMUGtvejhDWDJmRVEwTWl3ZWJHNlhubWRwOWFoYjdKWHBXakxPRVhqSnNkb1UwczFCaF82YnpuZEk4bVdwdzc4RC1sSEtwS2RDTXRsVDA?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMisgFBVV95cUxQUExZQjk3OWkyNjBYQXhSNTQ2c0NNZ0paeEpQMmljVVNJTlBTU2ZIcVIxVndVc0hiM1VacE80ZUhyQ0FBWGxLYTY1bkZQOFNOYk1MdWJvM2hLcnlrSC1Zc2F6OEJja1kxTkJaYVlTel9fS18tMEhYcFJSTXFraGdvcWxOR0lxdEQ5X0hZM1VvRGtYVkdUYkFBT2F1elFEN2p6UVMzR04tVGs0RVJIM2ZyRW1B?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-27",
    "image": {
      "src": "/covers/berlin-pride-attack-suspect-killed.png",
      "alt": "Rainbow Pride flags carried through the streets at Berlin's Christopher Street Day parade.",
      "credit": "Lucas Werkmeister, CC BY-SA 4.0, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 27 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Massacre of Thessalonica (AD 390)",
        "excerpt": "Summoned to the hippodrome for the games, thousands of unsuspecting citizens were penned in and cut down by Gothic soldiers on the emperor Theodosius's order, in reprisal for a riot. As many as seven thousand were said to have died in about three hours of slaughter, a bloodletting so infamous that Bishop Ambrose barred the emperor from the church until he did public penance.",
        "source": "Massacre of Thessalonica, AD 390",
        "href": "https://en.wikipedia.org/wiki/Massacre_of_Thessalonica",
        "image": {
          "src": "/covers/berlin-pride-attack-suspect-killed--a0.png",
          "alt": "Saint Ambrose barring the emperor Theodosius from Milan Cathedral, a painting by Anthony van Dyck",
          "credit": "Anthony van Dyck, National Gallery, London, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "The Peterloo Massacre (1819)",
        "excerpt": "On 16 August 1819 some sixty thousand people, many in their Sunday best, gathered peacefully at St Peter's Field in Manchester to demand parliamentary reform. Magistrates loosed mounted yeomanry with drawn sabres upon the crowd; eighteen were killed and hundreds wounded, and the killing of unarmed civilians at a festive assembly became a byword for state violence turned on its own people.",
        "source": "Peterloo Massacre, Manchester, 1819",
        "href": "https://en.wikipedia.org/wiki/Peterloo_Massacre",
        "image": {
          "src": "/covers/berlin-pride-attack-suspect-killed--a1.png",
          "alt": "Coloured print of cavalry with sabres charging a peaceful crowd at St Peter's Field, Manchester, 1819",
          "credit": "Richard Carlile, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Edgar Allan Poe, \"The Masque of the Red Death\" (1842)",
        "excerpt": "And Darkness and Decay and the Red Death held illimitable dominion over all.",
        "source": "Edgar Allan Poe, \"The Masque of the Red Death\"",
        "href": "https://www.gutenberg.org/cache/epub/1064/pg1064.txt",
        "image": {
          "src": "/covers/berlin-pride-attack-suspect-killed--a2.png",
          "alt": "Daguerreotype portrait of Edgar Allan Poe, 1849",
          "credit": "Unknown photographer (\"Annie\" daguerreotype), public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Percy Bysshe Shelley, \"The Masque of Anarchy\" (1819)",
        "excerpt": "Rise like Lions after slumber / In unvanquishable number, / Shake your chains to earth like dew / Which in sleep had fallen on you— / Ye are many—they are few.",
        "source": "Percy Bysshe Shelley, \"The Masque of Anarchy,\" written after Peterloo",
        "href": "https://en.wikisource.org/wiki/The_Masque_of_Anarchy",
        "image": {
          "src": "/covers/berlin-pride-attack-suspect-killed--a3.png",
          "alt": "Portrait of the poet Percy Bysshe Shelley",
          "credit": "Alfred Clint after Amelia Curran, National Portrait Gallery, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Richard Carlile, \"Peterloo Massacre\" print (1819)",
        "excerpt": "Published within weeks of the killings, Carlile's hand-coloured print freezes the moment sabres fall on a defenceless crowd. Banners tilt and bodies scatter beneath the hooves of the yeomanry, while a dedication to the meeting's chairman turns reportage into indictment. It made a peaceful gathering torn apart by armed force into an image that outlived every official denial.",
        "source": "Richard Carlile, engraving depicting the Peterloo Massacre",
        "href": "https://commons.wikimedia.org/wiki/File:Peterloo_Massacre.png",
        "image": {
          "src": "/covers/berlin-pride-attack-suspect-killed--a4.png",
          "alt": "Hand-coloured 1819 print of yeomanry cavalry charging with sabres into the reform crowd at St Peter's Field",
          "credit": "Richard Carlile, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Wolfgang Amadeus Mozart, Requiem in D minor, K.626 (1791)",
        "excerpt": "Requiem aeternam dona eis, Domine, et lux perpetua luceat eis.",
        "source": "W. A. Mozart, Requiem in D minor, K.626 — Introit",
        "href": "https://imslp.org/wiki/Requiem_in_D_minor,_K.626_(Mozart,_Wolfgang_Amadeus)",
        "image": {
          "src": "/covers/berlin-pride-attack-suspect-killed--a5.png",
          "alt": "Posthumous portrait of Wolfgang Amadeus Mozart",
          "credit": "Barbara Krafft, 1819, public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 15
  },
  {
    "slug": "nvidia-safe-superintelligence-investment",
    "headline": "Nvidia to invest $5 billion in Ilya Sutskever's Safe Superintelligence in one of its biggest bets on a frontier AI lab",
    "overview": "Nvidia will make a $5 billion equity investment in Safe Superintelligence (SSI), the AI startup co-founded by former OpenAI chief scientist Ilya Sutskever, in one of the chipmaker's largest strategic bets on a frontier lab. The partnership, announced Monday, gives SSI access to Nvidia's next-generation Vera Rubin hardware and aims to expand its computing capacity roughly tenfold over the next year. SSI, recently valued at about $32 billion, has yet to release a product.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiugFBVV95cUxOcWtDYjVuY2NJcTIzMDJaa0hYZy1vaGthWFp5Zm9FNXdwMUU0cmxRNk1HTWhGelZqVjRpY0RvbkoyRHMwaGg4cnM4RENaZE9ob0IwdEpXMEw5SWwyM2VOcE1LUGUwRjlWU2x3eEVkRVA1b3VwVEhiZjdRelBEYlEtanZjZmN5ckRFQWxQVFZHOVFSOEJ2WXJQbWhsSHBIdVgyX0VvcXRtUmcwUFJvVFNaSWQ5MzBxWU4tUmc?oc=5"
      },
      {
        "name": "TechCrunch",
        "href": "https://techcrunch.com/2026/07/27/ilya-sutskevers-safe-superintelligence-partners-with-nvidia-to-scale-its-ai-research/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-27",
    "image": {
      "src": "/covers/nvidia-safe-superintelligence-investment.png",
      "alt": "Nvidia's headquarters in Santa Clara, California.",
      "credit": "Photograph via Wikimedia Commons"
    },
    "edition": "Evening Edition · 27 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Lorenzo de' Medici bankrolls the Florentine Renaissance",
        "excerpt": "In fifteenth-century Florence, the wealth of a banking dynasty was turned into a wager on genius: Lorenzo de' Medici's court drew in Leonardo, Botticelli, and the young Michelangelo, converting fortune into a concentration of talent that reshaped the age. Like Nvidia's stake in a lab with no product yet, the Medici patronage was a bet on minds rather than finished works, on what brilliant people might build if given the means. The return was not a ledger entry but an epoch.",
        "source": "Wikipedia — Lorenzo de' Medici",
        "href": "https://en.wikipedia.org/wiki/Lorenzo_de%27_Medici",
        "image": {
          "src": "/covers/nvidia-safe-superintelligence-investment--a0.png",
          "alt": "Posthumous portrait of Lorenzo de' Medici by Girolamo Macchietti",
          "credit": "Girolamo Macchietti, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "The Manhattan Project concentrates money and talent to build a world-changing technology",
        "excerpt": "During World War II the United States poured nearly two billion dollars and the labor of some 130,000 people into a single frontier: the harnessing of a new and awesome power. Scientists and vast industrial capacity were assembled behind fences to build something no one had built before, a technology that would remake the balance of the world. The parallel to a multibillion-dollar rush to concentrate compute and researchers around a powerful new intelligence is hard to miss, as is the shadow of what such a creation unleashes.",
        "source": "Wikipedia — Manhattan Project",
        "href": "https://en.wikipedia.org/wiki/Manhattan_Project",
        "image": {
          "src": "/covers/nvidia-safe-superintelligence-investment--a1.png",
          "alt": "The Trinity nuclear test fireball, 25 milliseconds after detonation, July 16, 1945",
          "credit": "U.S. Government Defense Threat Reduction Agency, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Mary Shelley, Frankenstein; or, The Modern Prometheus (1818)",
        "excerpt": "It was on a dreary night of November that I beheld the accomplishment of my toils. With an anxiety that almost amounted to agony, I collected the instruments of life around me, that I might infuse a spark of being into the lifeless thing that lay at my feet.",
        "source": "Project Gutenberg — Frankenstein by Mary Wollstonecraft Shelley",
        "href": "https://www.gutenberg.org/files/84/84-h/84-h.htm",
        "image": {
          "src": "/covers/nvidia-safe-superintelligence-investment--a2.png",
          "alt": "Detail of hands from Michelangelo's Creation of Adam",
          "credit": "Michelangelo, Sistine Chapel, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Goethe, The Sorcerer's Apprentice (Der Zauberlehrling)",
        "excerpt": "Lord and master, hear me call! / Ever seems the flood to fill, / Ah, he's coming! see, / Great is my dismay! / Spirits raised by me / Vainly would I lay!",
        "source": "Wikisource — The Works of J. W. von Goethe, Vol. 9: The Pupil in Magic",
        "href": "https://en.wikisource.org/wiki/The_Works_of_J._W._von_Goethe/Volume_9/The_Pupil_in_Magic"
      },
      {
        "category": "artistic",
        "title": "Michelangelo, The Creation of Adam (c. 1511), Sistine Chapel",
        "excerpt": "Across a narrow gap of empty space, the finger of the Creator reaches toward the outstretched hand of Adam, the spark of life and intelligence about to leap between them. The painting freezes the instant before animation, when a new being is about to receive the power of a mind. It is the founding image of the human wish to kindle life in one's own likeness, the same yearning now dressed in silicon and capital.",
        "source": "Wikimedia Commons — Michelangelo, The Creation of Adam",
        "href": "https://commons.wikimedia.org/wiki/File:Michelangelo_-_Creation_of_Adam_(cropped).jpg",
        "image": {
          "src": "/covers/nvidia-safe-superintelligence-investment--a4.png",
          "alt": "The near-touching hands of God and Adam in Michelangelo's Sistine Chapel fresco",
          "credit": "Michelangelo, Sistine Chapel, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Jan Cossiers, Prometheus Carrying Fire (1637), Museo del Prado",
        "excerpt": "Prometheus strides through darkness clutching the stolen fire to his chest, the flame he has taken from the gods to hand to mortals. Cossiers, working from a design by Rubens, catches the thrill and the transgression at once: the light that will empower humankind is also the theft that dooms its bearer. It is the oldest parable of a world-altering power created and given, and of the price exacted for daring to make it.",
        "source": "Wikimedia Commons — Jan Cossiers, Prometheus Carrying Fire",
        "href": "https://commons.wikimedia.org/wiki/File:Jan_Cossiers_-_Prometheus_Carrying_Fire.jpg",
        "image": {
          "src": "/covers/nvidia-safe-superintelligence-investment--a5.png",
          "alt": "Jan Cossiers's painting of Prometheus carrying the stolen fire",
          "credit": "Jan Cossiers, Museo del Prado, public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 16
  },
  {
    "slug": "porsche-cuts-9000-jobs-2035",
    "headline": "Porsche to cut about 9,000 jobs — roughly one in five — by 2035 as China sales collapse and EV demand stalls",
    "overview": "Porsche will cut around 9,000 jobs, roughly one in five of its workforce, by 2035 after management and labor representatives agreed to 5,000 additional reductions on top of earlier packages. The move responds to a collapse in the sports-car maker's once-lucrative China sales and a stalled electric-vehicle strategy under new chief executive Michael Leiters. The deal avoids compulsory redundancies, keeps German sites open through 2035, and earmarks 2.1 billion euros for the Stuttgart-Zuffenhausen plant and the Weissach research center.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMikgFBVV95cUxPR1RHNHFOakt3b2EyVHIxSklHcTJNb202OXMwRFczZ1B6Ums0M1NUTm1jRXJZOUdZbDdMcHVTaGc3V3E0OW5qOTRESEtyZGJOVWU1Z0N5cFFsM25CU3ZGeUhpVXVkeU8wa0IybEpHaDV1VXJVSDNMdGw4VF9KMFltc3Z6blh5Y01lQjNGMzhpS0FDZw?oc=5"
      },
      {
        "name": "CNBC",
        "href": "https://www.cnbc.com/2026/07/27/porsche-ramps-up-job-cuts-to-9000-by-2035.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-27",
    "image": {
      "src": "/covers/porsche-cuts-9000-jobs-2035.png",
      "alt": "The angular modern architecture of the Porsche Museum in Stuttgart, Germany.",
      "credit": "Photograph via Wikimedia Commons"
    },
    "edition": "Evening Edition · 27 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Luddite risings against the mechanized looms (1811-1816)",
        "excerpt": "In the cropping shops and stocking frames of Nottinghamshire, Yorkshire and Lancashire, skilled English textile workers watched new machinery hollow out their trade, their wages and their futures. Organizing under the mythical 'General Ludd,' they broke into mills by night to smash the frames that were replacing them. The state answered with troops, mass trials and the gallows, making the doomed protest one of the first collisions between industrial progress and the human cost borne by the workers it displaced.",
        "source": "Wikipedia — Luddite",
        "href": "https://en.wikipedia.org/wiki/Luddite",
        "image": {
          "src": "/covers/porsche-cuts-9000-jobs-2035--a0.png",
          "alt": "1812 hand-colored etching 'The Leader of the Luddites', a masked figure in a dress leading machine-breakers",
          "credit": "'The Leader of the Luddites' (1812), published by Walker and Knight, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "The Ford Hunger March and Depression-era Detroit auto layoffs (1932)",
        "excerpt": "On March 7, 1932, as the Great Depression gutted the auto industry, some three to five thousand laid-off workers marched from Detroit to Ford's River Rouge plant to demand their jobs back, medical relief and union recognition. Police and Ford security opened fire on the unarmed crowd, killing five men and wounding dozens. The massacre laid bare the human cost of a collapsing industrial giant and helped galvanize the labor organizing that would eventually bring the UAW into Ford's plants.",
        "source": "Wikipedia — Ford Hunger March",
        "href": "https://en.wikipedia.org/wiki/Ford_Hunger_March"
      },
      {
        "category": "literary",
        "title": "The devouring mine of Émile Zola's 'Germinal'",
        "excerpt": "And the Voreux, at the bottom of its hole, with its posture as of an evil beast, continued to crunch, breathing with a heavier and slower respiration, troubled by its painful digestion of human flesh.",
        "source": "Émile Zola, Germinal (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/56528/56528-h/56528-h.htm"
      },
      {
        "category": "literary",
        "title": "The mechanized misery of Coketown in Dickens's 'Hard Times'",
        "excerpt": "It was a town of machinery and tall chimneys, out of which interminable serpents of smoke trailed themselves for ever and ever, and never got uncoiled. It had a black canal in it, and a river that ran purple with ill-smelling dye, and vast piles of building full of windows where there was a rattling and a trembling all day long, and where the piston of the steam-engine worked monotonously up and down, like the head of an elephant in a state of melancholy madness.",
        "source": "Charles Dickens, Hard Times (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/786/786-h/786-h.htm"
      },
      {
        "category": "artistic",
        "title": "Adolph Menzel, 'The Iron Rolling Mill (Modern Cyclopes)' (1875)",
        "excerpt": "Menzel's vast canvas plunges the viewer into the glare and smoke of a Prussian ironworks, where half-lit laborers strain around a white-hot ingot in a cathedral of machinery. It is one of the first great paintings to take modern industrial work as its subject, monumentalizing the men whose bodies are bent to the rhythm of the mill. The heat, noise and exhaustion make visible the human price of the industry that fed a rising economy.",
        "source": "Alte Nationalgalerie, Berlin (via Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Adolph_Menzel_-_Eisenwalzwerk_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/porsche-cuts-9000-jobs-2035--a4.png",
          "alt": "Workers laboring around glowing hot iron amid heavy machinery in a smoky rolling mill",
          "credit": "Adolph Menzel, 'The Iron Rolling Mill' (1875), Alte Nationalgalerie, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Robert Koehler, 'The Strike' (1886)",
        "excerpt": "Koehler paints the moment a factory workforce downs tools and confronts its owner outside the mill gates, a tense knot of angry men, an anxious woman and a defiant stone-gathering figure at the edge of violence. Exhibited in 1886, it was among the first paintings to depict a modern labor dispute head-on. The scene captures the raw human drama when an industry's economics turn against the people who build its products.",
        "source": "Deutsches Historisches Museum, Berlin (via Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Robert_Koehler_-_Der_Streik_(1886).jpg",
        "image": {
          "src": "/covers/porsche-cuts-9000-jobs-2035--a5.png",
          "alt": "A crowd of striking industrial workers confronting a factory owner outside a mill in 1886",
          "credit": "Robert Koehler, 'The Strike' (1886), Deutsches Historisches Museum, public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 17
  },
  {
    "slug": "unaids-hiv-resurgence-funding",
    "headline": "UNAIDS warns of an HIV resurgence as international funding falls 18% to its lowest level in nearly two decades",
    "overview": "International financing for the HIV response fell by more than $1.5 billion, from $8.8 billion in 2024 to $7.3 billion in 2025 — an 18% drop and the lowest level in nearly two decades — leaving the global fight against AIDS \"extremely fragile,\" UNAIDS said in a special report released as the International AIDS Conference opened in Rio de Janeiro. New HIV infections rose in three regions and 21 countries in 2025, and funding for condom distribution has fallen by more than 90% in some countries. The agency warned the cuts risk reversing decades of hard-won progress.",
    "genre": "Science",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMixgFBVV95cUxQVEdyUHZVN2hZVi1aSm9yckxMcG96eDdNQ3JMUjNPVTRKSkItYWVKdnFDSzVPeklGY0YwSGdUQmVlOGE1dlJBT3ZIVFY0RFpQY3dhUDU1eW1oMHltNkhwZkRaMlBOSWdVWXhYcjY4V1ZBcURWSUtQT2k1YUI4T1FOckpwSWR1eWNuTUhzYnRTeHkyUmhtTzRmRmpsSXFzamFTb285RmlBaG9DTnVRZ3RfZldBcFNaTnY2WEdvUnhEOGJFekVmLWc?oc=5"
      },
      {
        "name": "UNAIDS",
        "href": "https://www.unaids.org/en/resources/presscentre/pressreleaseandstatementarchive/2026/july/20260727_PR_UNAIDS_special_report_AIDS2026"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-27",
    "image": {
      "src": "/covers/unaids-hiv-resurgence-funding.png",
      "alt": "A red ribbon, the international symbol of solidarity with people living with HIV/AIDS.",
      "credit": "Photograph via Wikimedia Commons"
    },
    "edition": "Evening Edition · 27 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Plague of Justinian and its returning waves (541-750 AD)",
        "excerpt": "The bubonic plague that struck the Byzantine Empire under Justinian did not strike once and vanish. After the catastrophic first wave of 541, it receded, lulled survivors into believing the worst had passed, then returned in wave after wave for two centuries. Each recurrence found defenses lowered and memory dimmed, a reminder that a retreating epidemic is not a defeated one.",
        "source": "Plague of Justinian (6th-8th century AD), Byzantine Empire",
        "href": "https://en.wikipedia.org/wiki/Plague_of_Justinian",
        "image": {
          "src": "/covers/unaids-hiv-resurgence-funding--a0.png",
          "alt": "Josse Lieferinxe's painting of gravediggers burying the dead during a plague while Saint Sebastian intercedes from the heavens",
          "credit": "Josse Lieferinxe, Saint Sebastian Interceding for the Plague Stricken (1497-1499), Walters Art Museum, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "The collapse of the Global Malaria Eradication Programme (1969)",
        "excerpt": "In the 1950s the world poured money and DDT into a campaign to eradicate malaria, and cases plummeted so dramatically that many declared victory near at hand. Then donors lost patience, funding was slashed, and the programme was abandoned in 1969. Malaria came roaring back across Asia, Africa and the Americas, killing millions in the decades that followed, a textbook case of a disease resurging the moment the money stopped.",
        "source": "Global Malaria Eradication Programme, World Health Organization (1955-1969)",
        "href": "https://en.wikipedia.org/wiki/Global_Malaria_Eradication_Program"
      },
      {
        "category": "literary",
        "title": "Thucydides on the Plague of Athens",
        "excerpt": "Neither were the physicians at first of any service, ignorant as they were of the proper way to treat it, but they died themselves the most thickly, as they visited the sick most often.",
        "source": "Thucydides, History of the Peloponnesian War, Book 2 (Crawley translation)",
        "href": "https://en.wikisource.org/wiki/History_of_the_Peloponnesian_War/Book_2",
        "image": {
          "src": "/covers/unaids-hiv-resurgence-funding--a2.png",
          "alt": "Michiel Sweerts's painting of dead and dying figures strewn through the streets of a stricken classical city",
          "credit": "Michiel Sweerts, Plague in an Ancient City (c. 1652-1654), Los Angeles County Museum of Art, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Daniel Defoe, A Journal of the Plague Year",
        "excerpt": "the bills decreased again, and the city grew healthy, and everybody began to look upon the danger as good as over; only that still the burials in St Giles's continued high.",
        "source": "Daniel Defoe, A Journal of the Plague Year (1722)",
        "href": "https://www.gutenberg.org/files/376/376-h/376-h.htm"
      },
      {
        "category": "artistic",
        "title": "Nicolas Poussin, The Plague at Ashdod",
        "excerpt": "Poussin fills the foreground with a mother collapsed dead beside her living infant, while men recoil and cover their faces from the stench of contagion. Behind them the toppled idol of Dagon signals that no earthly power can shield a people from the plague. The painting is a study in how swiftly a proud city can be undone once the sickness takes hold.",
        "source": "Nicolas Poussin, The Plague at Ashdod (1630-1631), Louvre, Paris",
        "href": "https://commons.wikimedia.org/wiki/File:Nicolas_Poussin_-_The_Plague_at_Ashdod_-_WGA18274.jpg",
        "image": {
          "src": "/covers/unaids-hiv-resurgence-funding--a4.png",
          "alt": "Poussin's crowded scene of plague victims in the city of Ashdod, with a dead mother and living child in the foreground and the fallen idol of Dagon behind",
          "credit": "Nicolas Poussin, The Plague at Ashdod (1630-1631), Louvre, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Hans Holbein the Younger, The Dance of Death",
        "excerpt": "In Holbein's woodcut series a grinning skeleton walks beside every rank of society, from emperor to ploughman, claiming each in turn regardless of wealth or station. The images insist that death is patient and universal, waiting wherever complacency lets it in. Here Death labours alongside Adam in the cursed earth, the first reminder that mortality shadows all human toil.",
        "source": "Hans Holbein the Younger, The Dance of Death (designed c. 1523-1525, published 1538)",
        "href": "https://commons.wikimedia.org/wiki/File:Hans_Holbein_-_The_Dance_of_Death-_Adam_Tilling_the_Earth_-_1924.978_-_Cleveland_Museum_of_Art.jpg",
        "image": {
          "src": "/covers/unaids-hiv-resurgence-funding--a5.png",
          "alt": "Holbein woodcut of a skeleton helping Adam till the soil, from the Dance of Death series",
          "credit": "Hans Holbein the Younger, The Dance of Death: Adam Tilling the Earth, Cleveland Museum of Art (CC0), public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 18
  },
  {
    "slug": "gunther-von-hagens-dies-81",
    "headline": "Gunther von Hagens, German anatomist behind the 'Body Worlds' plastination exhibits, dies at 81",
    "overview": "Gunther von Hagens, the German anatomist who drew both fascination and revulsion worldwide with his \"Body Worlds\" exhibitions of preserved human corpses, has died at 81, his family and the Institute for Plastination said Monday. He died on Friday and had lived with Parkinson's disease since 2010. His plastination technique, developed from the 1970s, replaced bodily fluids with hardening plastic to display cadavers and organs in lifelike poses; he asked that his own body be plastinated after death.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMiqAFBVV95cUxNODR3WDRlWGNxY21WVU1GV25xSE4xNkwwRGFjUVMyOS1taFY4R2dEQU5XclNybDRfT0lEMWJuSGY5WnY1LWFDTHZ1dEFLZGVKRXVkNmc5Y0lYYlNKbl9CR1kyMDYzd2RUT0N5Z1lWNk9MaDQ4TWFXT01kVEdjWVc5MUtqRFpMTkM5X2lJeXVkZUh0TGhsSWk0YmlVX0tjQVZLTDduU3d6clo?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/czjlnrn47lwo"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-27",
    "image": {
      "src": "/covers/gunther-von-hagens-dies-81.png",
      "alt": "A muscle-man plate from Vesalius's 16th-century anatomical atlas showing the human musculature.",
      "credit": "Andreas Vesalius, De humani corporis fabrica (1555); Wellcome Collection, public domain, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 27 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Andreas Vesalius publishes De humani corporis fabrica (1543)",
        "excerpt": "At twenty-eight, the Flemish physician tore anatomy from the lecture hall and put it on the dissecting table, cutting cadavers with his own hands before crowded audiences. His lavish woodcuts posed flayed muscle-men and grinning skeletons like living actors, turning the opened human body into public spectacle and enduring art. Like von Hagens four centuries later, he was accused of impiety even as he redefined how the West sees itself from the inside.",
        "source": "Andreas Vesalius, De humani corporis fabrica (1543)",
        "href": "https://en.wikipedia.org/wiki/De_humani_corporis_fabrica",
        "image": {
          "src": "/covers/gunther-von-hagens-dies-81--a0.png",
          "alt": "Woodcut title page of Vesalius's De humani corporis fabrica (1543) showing a crowded public dissection around an opened cadaver.",
          "credit": "Andreas Vesalius, De humani corporis fabrica (1543), public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "Frederik Ruysch and his cabinet of preserved bodies (Amsterdam, c. 1700)",
        "excerpt": "The Dutch anatomist Frederik Ruysch guarded a secret embalming fluid that let him preserve corpses and organs with lifelike color, arranging infant skeletons and injected specimens into haunting tableaux that fused science, art, and memento mori. Crowds paid to tour his home museum, and Tsar Peter the Great bought the entire collection. Two centuries before plastination, Ruysch had already made the incorruptible, exhibited human body into a marvel that both instructed and unsettled.",
        "source": "Frederik Ruysch, praelector of anatomy, Amsterdam Guild of Surgeons",
        "href": "https://en.wikipedia.org/wiki/Frederik_Ruysch",
        "image": {
          "src": "/covers/gunther-von-hagens-dies-81--a1.png",
          "alt": "Jan van Neck, The Anatomy Lesson of Dr Frederik Ruysch (1683), the anatomist dissecting an infant cadaver before guild members.",
          "credit": "Jan van Neck (1683), Amsterdam Museum, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Sir Thomas Browne, Hydriotaphia, Urn Burial (1658)",
        "excerpt": "Egyptian ingenuity was more unsatisfied, contriving their bodies in sweet consistences, to attend the return of their souls. But all is vanity, feeding the wind, and folly. Egyptian mummies, which Cambyses or time hath spared, avarice now consumeth. Mummy is become merchandise, Mizraim, cures wounds, and Pharaoh is sold for balsams.",
        "source": "Sir Thomas Browne, Hydriotaphia, Urn Burial, Chapter V (1658)",
        "href": "https://www.gutenberg.org/cache/epub/586/pg586.txt"
      },
      {
        "category": "literary",
        "title": "Shakespeare, Hamlet, Act 5, Scene 1 — the graveyard",
        "excerpt": "Alas, poor Yorick. I knew him, Horatio, a fellow of infinite jest, of most excellent fancy. He hath borne me on his back a thousand times; and now, how abhorred in my imagination it is! My gorge rises at it. Here hung those lips that I have kiss’d I know not how oft.",
        "source": "William Shakespeare, Hamlet, Act V, Scene 1",
        "href": "https://www.gutenberg.org/cache/epub/1524/pg1524.txt"
      },
      {
        "category": "artistic",
        "title": "Rembrandt, The Anatomy Lesson of Dr Nicolaes Tulp (1632)",
        "excerpt": "Rembrandt freezes a public dissection in candlelit drama: Dr Tulp lifts the flexor tendons of a criminal's flayed forearm while colleagues crane forward, more riveted by the open anatomy book than by the pale corpse itself. The painting made a spectacle of mortality into civic portraiture, ennobling the dissector and immortalizing the dead. It is the same charged theater von Hagens staged with his posed, plastinated bodies.",
        "source": "Rembrandt van Rijn, oil on canvas, Mauritshuis, The Hague",
        "href": "https://commons.wikimedia.org/wiki/File:The_Anatomy_Lesson.jpg",
        "image": {
          "src": "/covers/gunther-von-hagens-dies-81--a4.png",
          "alt": "Rembrandt's 1632 painting The Anatomy Lesson of Dr Nicolaes Tulp, showing physicians observing the dissection of a corpse's forearm.",
          "credit": "Rembrandt, Mauritshuis, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Hans Holbein the Younger, 'The Physician' from The Dance of Death (c. 1526)",
        "excerpt": "In Holbein's woodcut a grinning skeleton hands a urine flask to a learned doctor, mocking the physician's power to hold off the grave. Part of a whole danse macabre that leads pope, king, and peasant alike to the same end, the image insists that no expertise in bodies exempts their master from becoming a corpse. Von Hagens, who asked to be plastinated after death, made his own memento mori of the same equation.",
        "source": "Hans Holbein the Younger, The Dance of Death, 'Der Artzet' (designed c. 1526, published 1538)",
        "href": "https://commons.wikimedia.org/wiki/File:Hans_Holbein_the_Younger,_Der_Artzet,_NGA_48243.jpg",
        "image": {
          "src": "/covers/gunther-von-hagens-dies-81--a5.png",
          "alt": "Hans Holbein the Younger's woodcut The Physician from the Dance of Death, a skeleton confronting a doctor holding a urine flask.",
          "credit": "Hans Holbein the Younger, National Gallery of Art, public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 19
  },
  {
    "slug": "victor-jara-fugitive-captured-chile",
    "headline": "Chile captures Nelson Haase, the last fugitive convicted in the 1973 torture and murder of singer Victor Jara",
    "overview": "Chilean police captured Nelson Haase Mazzei, a retired military officer and the last fugitive convicted in the 1973 kidnapping, torture and murder of folk singer Victor Jara, authorities said. Haase, sentenced in 2023 to 25 years in prison, had evaded justice since the Supreme Court issued its final judgment and was detained on a rural plot in Puyehue, in southern Chile. Jara, a beloved singer and theater director, was tortured and shot dead days after Augusto Pinochet's 1973 coup, becoming an enduring symbol of the dictatorship's repression.",
    "genre": "Politics",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c3w0xwj8vzyo"
      },
      {
        "name": "CBS News",
        "href": "https://www.cbsnews.com/news/victor-jara-murder-fugitive-captured-chile-nelson-haase/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-27",
    "image": {
      "src": "/covers/victor-jara-fugitive-captured-chile.png",
      "alt": "Chilean folk singer and activist Víctor Jara.",
      "credit": "Photograph via Wikimedia Commons"
    },
    "edition": "Evening Edition · 27 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The trial and execution of Socrates by the Athenian state (399 BC)",
        "excerpt": "Athens condemned its most probing voice to death on charges of impiety and corrupting the young, silencing a man whose only weapon was speech. Socrates drank the hemlock rather than recant, and the state that killed him has been on trial in the conscience of the West ever since. Like Jara, he became more dangerous to tyranny dead than alive, a martyr whose voice outlasted his executioners.",
        "source": "Wikipedia, Trial of Socrates",
        "href": "https://en.wikipedia.org/wiki/Trial_of_Socrates",
        "image": {
          "src": "/covers/victor-jara-fugitive-captured-chile--a0.png",
          "alt": "Marble portrait bust of Socrates in the Louvre",
          "credit": "Roman marble bust after a Greek original; photograph by Eric Gaba (Sting), CC BY-SA 2.5, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "The killing of poet Federico García Lorca by Nationalist forces (1936)",
        "excerpt": "Weeks into the Spanish Civil War, Nationalist gunmen seized Spain's most beloved poet and playwright near Granada and shot him, dumping his body in an unmarked grave that has never been found. Like Victor Jara, Lorca was murdered not for any act but for what his art embodied: freedom, tenderness, and defiance of authoritarian violence. Decades of dictatorship enforced silence about the crime, and justice for it remains unfinished to this day.",
        "source": "Wikipedia, Federico García Lorca",
        "href": "https://en.wikipedia.org/wiki/Federico_Garc%C3%ADa_Lorca",
        "image": {
          "src": "/covers/victor-jara-fugitive-captured-chile--a1.png",
          "alt": "Federico García Lorca photographed at Huerta de San Vicente, Granada, 1932",
          "credit": "Unknown author, 1932, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "The death of the singer Orpheus in Ovid's \"Metamorphoses,\" Book XI",
        "excerpt": "While with his songs, Orpheus, the bard of Thrace, allured the trees, the savage animals, and even the insensate rocks, to follow him; Ciconian matrons, with their raving breasts concealed in skins of forest animals, from the summit of a hill observed him there.",
        "source": "Ovid, Metamorphoses XI (Brookes More translation, Perseus Digital Library)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Ov.+Met.+11.1&fromdoc=Perseus%3Atext%3A1999.02.0028"
      },
      {
        "category": "literary",
        "title": "A martyr's lament from the Psalms (Psalm 79, King James Version)",
        "excerpt": "(A Psalm of Asaph.) O God, the heathen are come into thine inheritance; thy holy temple have they defiled; they have laid Jerusalem on heaps. The dead bodies of thy servants have they given to be meat unto the fowls of the heaven, the flesh of thy saints unto the beasts of the earth. Their blood have they shed like water round about Jerusalem; and there was none to bury them.",
        "source": "Bible, Psalm 79:1-3 (King James Version, Wikisource)",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Psalms#Psalm_79"
      },
      {
        "category": "artistic",
        "title": "Émile Lévy, \"The Death of Orpheus\" (1866)",
        "excerpt": "Lévy's canvas shows the poet-singer flung to the earth, his lyre spilled beside him, as the frenzied women who have destroyed him turn away into the dusk. The academic polish of the painting only sharpens the horror: beauty and music broken by mob violence. It is an image of the artist annihilated by unreasoning force, the fate that shadows every Orpheus, every Jara.",
        "source": "Musée d'Orsay",
        "href": "https://www.musee-orsay.fr/en/artworks/mort-dorphee-3642",
        "image": {
          "src": "/covers/victor-jara-fugitive-captured-chile--a4.png",
          "alt": "Painting of the slain Orpheus lying on the ground beside his lyre",
          "credit": "Émile Lévy, 1866, Musée d'Orsay, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Jacques-Louis David, \"The Death of Socrates\" (1787)",
        "excerpt": "David freezes the instant before the hemlock: Socrates sits upright, one hand reaching for the cup, the other raised in mid-argument, serene while his grieving disciples recoil. The composition turns a state execution into an indictment of the power that ordered it. The philosopher's calm becomes an accusation, the way a murdered singer's silence can outshout a regime.",
        "source": "The Metropolitan Museum of Art",
        "href": "https://www.metmuseum.org/art/collection/search/436105",
        "image": {
          "src": "/covers/victor-jara-fugitive-captured-chile--a5.png",
          "alt": "Neoclassical painting of Socrates reaching for the cup of hemlock among his followers",
          "credit": "Jacques-Louis David, 1787, The Metropolitan Museum of Art, public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 20
  },
  {
    "slug": "nigeria-kaduna-bandit-attack",
    "headline": "Gunmen kill at least 30 in a raid on a village in northwestern Nigeria's Kaduna state, residents say",
    "overview": "Gunmen attacked Naridon village in the Kaura area of Kaduna state in northwestern Nigeria late Sunday, killing at least 30 people and wounding others, residents said Monday. Bodies were taken to a nearby hospital as the community prepared for burials. Such raids by armed groups known locally as \"bandits\" — many of them former herders in conflict with farming communities over increasingly strained land and water — regularly strike Nigeria's northwest, where security forces have struggled to respond.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMipAFBVV95cUxOMFFKaS1TSmFnN3VUVUpWeVF1VG1TcjhnZzJ5ZElfemJJQ1JoSmxZQkplb2JfNmFheWdXa3NkazZMd2c2QzNoR3pXUnRHRmhHdEJqUUtGOFBVZnJhVlpWSzdXWFM1WlJkSGFpNUtZV1JvQVFuZlFKbkR0YmpVdUQxYnlqLVp0Y1N1cmxaSmhIQ1JkdGhmNUZsMGNHb19fZzE2Qm9oZw?oc=5"
      },
      {
        "name": "Washington Post",
        "href": "https://www.washingtonpost.com/world/2026/07/27/nigeria-gunmen-attack-kaduna-naridon-kaura/01ffd8d8-89d0-11f1-8912-d71e69d679d7_story.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-27",
    "image": {
      "src": "/covers/nigeria-kaduna-bandit-attack.png",
      "alt": "The Kaduna River winding through Kaduna in northwestern Nigeria.",
      "credit": "Photograph via Wikimedia Commons"
    },
    "edition": "Evening Edition · 27 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Viking sack of Lindisfarne (793)",
        "excerpt": "The heathens poured out the blood of saints around the altar, and trampled on the bodies of saints in the temple of God, like dung in the streets.",
        "source": "Alcuin of York, letter (c. 793), quoted via Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Lindisfarne",
        "image": {
          "src": "/covers/nigeria-kaduna-bandit-attack--a0.png",
          "alt": "Armed Viking raiders wading ashore from a longship, axes in hand, in John Charles Dollman's painting A Viking Foray",
          "credit": "John Charles Dollman, 'A Viking Foray' (1909), public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "The Border Reivers of the Anglo-Scottish frontier (16th century)",
        "excerpt": "For generations along the lawless Anglo-Scottish border, mounted bands known as reivers descended by night on farms and villages, driving off cattle, torching thatch, and slaughtering or carrying away any who resisted. Loyalties followed kin and surname rather than crown, and even churches were burned. The frontier communities lived under the constant dread of the next raid, much like the herder-and-farmer feuds that fuel Nigeria's rural bloodshed today.",
        "source": "Border reivers, Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Border_reivers",
        "image": {
          "src": "/covers/nigeria-kaduna-bandit-attack--a1.png",
          "alt": "A 19th-century print of Border reivers on horseback raiding at Gilnockie Tower",
          "credit": "19th-century print, 'Reivers raid on Gilnockie Tower', public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "The messengers' report to Job (Book of Job 1:14-15, KJV)",
        "excerpt": "And there came a messenger unto Job, and said, The oxen were plowing, and the asses feeding beside them: And the Sabeans fell upon them, and took them away; yea, they have slain the servants with the edge of the sword; and I only am escaped alone to tell thee.",
        "source": "Book of Job 1:14-15, King James Version, Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Job",
        "image": {
          "src": "/covers/nigeria-kaduna-bandit-attack--a2.png",
          "alt": "William Blake's engraving of Job's sons and daughters overwhelmed by disaster, Plate 3 of the Illustrations of the Book of Job",
          "credit": "William Blake, Illustrations of the Book of Job, Plate 3 (1825), public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "The fall of a captured town (Homer, Iliad, Book 9)",
        "excerpt": "the men are slain and the city is wasted by fire, and their children and low-girdled women are led captive of strangers.",
        "source": "Homer, Iliad 9 (A. T. Murray translation), Perseus Digital Library",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0134:book=9:card=588",
        "image": {
          "src": "/covers/nigeria-kaduna-bandit-attack--a3.png",
          "alt": "A night scene of the city of Troy in flames as inhabitants flee, painted by Johann Georg Trautmann",
          "credit": "Johann Georg Trautmann, 'The Burning of Troy' (c. 1759-69), public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Peter Paul Rubens, 'The Consequences of War' (1638-39)",
        "excerpt": "Rubens allegorizes the horror of armed conflict: Mars, sword drawn and armor bloodied, charges forward while Venus vainly tries to hold him back and a shrieking Fury drags him toward slaughter. Beneath his feet a mother and child are trampled, and the figures of Harmony, Charity, and the arts lie broken. Painted amid the Thirty Years' War, it renders in flesh and shadow the ruin that raiders bring to ordinary lives.",
        "source": "Peter Paul Rubens, Palazzo Pitti, Florence",
        "href": "https://en.wikipedia.org/wiki/Consequences_of_War",
        "image": {
          "src": "/covers/nigeria-kaduna-bandit-attack--a4.png",
          "alt": "Rubens's allegorical painting The Consequences of War, showing Mars charging into battle as Venus tries to restrain him and civilians are trampled underfoot",
          "credit": "Peter Paul Rubens, 'The Consequences of War' (1638-39), Palazzo Pitti, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Jacques Callot, 'The Miseries and Misfortunes of War' (1633)",
        "excerpt": "In this etching from Callot's celebrated series, a band of soldiers overruns a farmhouse, ransacking its rooms while terrified villagers are beaten and dragged from their homes. The tiny, precisely drawn figures make the plunder feel systematic and inescapable, a whole community stripped bare in a single scene. Made during the Thirty Years' War, the print is one of the earliest artworks to indict the everyday cruelty of armed marauders against civilians.",
        "source": "Jacques Callot, 'Les Grandes Miseres de la guerre', plate 5 (Pillaging a House)",
        "href": "https://en.wikipedia.org/wiki/The_Miseries_and_Misfortunes_of_War",
        "image": {
          "src": "/covers/nigeria-kaduna-bandit-attack--a5.png",
          "alt": "Jacques Callot's etching of soldiers pillaging and ransacking a farmhouse as villagers are assaulted",
          "credit": "Jacques Callot, 'The Miseries and Misfortunes of War' (1633), public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 21
  },
  {
    "slug": "carly-simon-parkinsons-diagnosis",
    "headline": "Carly Simon reveals she has been diagnosed with Parkinson's disease and treated for skin cancer",
    "overview": "Carly Simon, the 81-year-old singer-songwriter behind hits like \"You're So Vain\" and \"Anticipation,\" revealed that she has been diagnosed with Parkinson's disease and has also been treated for skin cancer. The Rock and Roll Hall of Fame inductee, one of the defining voices of 1970s American pop, shared the diagnoses publicly as she reflected on her health and career. She said she remains determined to keep making music.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/search?q=Carly+Simon+Parkinson%27s+diagnosis+when:2d&hl=en-US&gl=US&ceid=US:en"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c5y3gymn6p6o"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-27",
    "image": {
      "src": "/covers/carly-simon-parkinsons-diagnosis.png",
      "alt": "American singer-songwriter Carly Simon photographed in 1978.",
      "credit": "Photograph (1978) via Wikimedia Commons"
    },
    "edition": "Evening Edition · 27 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Beethoven, deaf and despairing, resolves to keep composing (1802)",
        "excerpt": "only art it was that withheld me, ah it seemed impossible to leave the world until I had produced all that I felt called upon me to produce, and so I endured this wretched existence",
        "source": "Ludwig van Beethoven, The Heiligenstadt Testament (1802)",
        "href": "https://nac-cna.ca/en/stories/story/beethovens-complete-heiligenstadt-testament",
        "image": {
          "src": "/covers/carly-simon-parkinsons-diagnosis--a0.png",
          "alt": "Joseph Karl Stieler's 1820 portrait of Ludwig van Beethoven holding a manuscript and pen",
          "credit": "Joseph Karl Stieler, Beethoven (1820), public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "Matisse, bedridden by cancer, invents his paper cut-outs (1940s)",
        "excerpt": "After surgery for abdominal cancer left him frail and confined to a wheelchair and his bed, the aged Matisse could no longer stand at an easel. Rather than surrender, he took up scissors and painted paper, 'drawing with scissors' to conjure the luminous cut-outs that became the triumphant final chapter of his art. Illness did not silence him; it forced open an entirely new language of color and form.",
        "source": "Henri Matisse: The Cut-Outs, Tate Modern",
        "href": "https://www.tate.org.uk/whats-on/tate-modern/henri-matisse-cut-outs"
      },
      {
        "category": "literary",
        "title": "Milton, blind, measures a life of service to his gift",
        "excerpt": "When I consider how my light is spent, Ere half my days, in this dark world and wide, And that one Talent which is death to hide Lodged with me useless, though my Soul more bent To serve therewith my Maker... They also serve who only stand and wait.",
        "source": "John Milton, sonnet 'When I consider how my light is spent' (c. 1655)",
        "href": "https://en.wikipedia.org/wiki/When_I_Consider_How_My_Light_Is_Spent"
      },
      {
        "category": "literary",
        "title": "Henley, ravaged by illness, declares himself master of his fate",
        "excerpt": "Out of the night that covers me, Black as the pit from pole to pole, I thank whatever gods may be For my unconquerable soul... It matters not how strait the gate, How charged with punishments the scroll, I am the master of my fate: I am the captain of my soul.",
        "source": "William Ernest Henley, 'Invictus' (1875)",
        "href": "https://en.wikipedia.org/wiki/Invictus"
      },
      {
        "category": "artistic",
        "title": "Goya paints his own grave illness and gratitude to his doctor (1820)",
        "excerpt": "Goya, gravely ill at seventy-three, painted himself slumped and ashen, half-collapsed in his bed, as his physician Dr. Arrieta gently props him up and presses a glass of medicine to his lips. Faces loom in the shadows behind, like death waiting its turn. In the inscription beneath, the artist thanks the friend whose care saved his life so that his hand could go on working.",
        "source": "Francisco Goya, Self-Portrait with Dr Arrieta (1820), Minneapolis Institute of Art",
        "href": "https://en.wikipedia.org/wiki/Self-Portrait_with_Dr_Arrieta",
        "image": {
          "src": "/covers/carly-simon-parkinsons-diagnosis--a4.png",
          "alt": "Goya's 1820 self-portrait showing the ailing painter supported by his doctor Arrieta who offers him medicine",
          "credit": "Francisco Goya, Self-Portrait with Dr Arrieta (1820), Minneapolis Institute of Art, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Chopin, wasting from tuberculosis, keeps composing at the keyboard",
        "excerpt": "Delacroix caught Chopin at the piano, head tilted, eyes lifted, lost in the music even as consumption slowly hollowed his body. Through years of fever, blood and failing strength, Chopin poured his frailty into nocturnes and mazurkas of astonishing delicacy, making the very fragility of his life audible. The illness that killed him at thirty-nine never stopped the music.",
        "source": "Eugene Delacroix, Portrait of Frederic Chopin (1838)",
        "href": "https://en.wikipedia.org/wiki/Fr%C3%A9d%C3%A9ric_Chopin",
        "image": {
          "src": "/covers/carly-simon-parkinsons-diagnosis--a5.png",
          "alt": "Eugene Delacroix's 1838 portrait of Frederic Chopin seated at the piano, gazing upward",
          "credit": "Eugene Delacroix, Frederic Chopin (1838), public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 22
  },
  {
    "slug": "china-domestic-duv-lithography-tools",
    "headline": "China begins mass-producing homegrown immersion DUV lithography machines, challenging ASML's grip on chipmaking tools",
    "overview": "Chinese firms have begun mass-producing domestically developed immersion deep-ultraviolet (DUV) lithography machines — a critical chipmaking tool long dominated by the Netherlands' ASML — according to The Information. The first units, roughly five in 2026 and about 20 in 2027, are slated for delivery to chipmakers including SMIC, Hua Hong and CXMT. Most components are domestic, though some critical parts still come from Japan, and the systems lag ASML in performance and scale, but the milestone advances Beijing's drive for chip self-sufficiency under U.S. export controls.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiugFBVV95cUxNczNKaVBKQlBhakFSU2NWSktCWHViODV0YmUzSnU5VWVVQkg2OWd2QUZteVB6RmZGLWdwV092R29aVElFX09naHB5TzQ3c2xhUXNBZllCcm9aWnhGRGhhRVc3UEt4NWxhYTRTZW1hdFVEM1RIajQxWl82b3JNMTF1eEo4X25BSGRoVFFuWElhSk9QSzJxZC1lZTlnc196YW9UY2NCaG9DaTExUUo5RnVjUDB1NVBVZzFvZlE?oc=5"
      },
      {
        "name": "Tom's Hardware",
        "href": "https://www.tomshardware.com/tech-industry/semiconductors/china-begins-mass-production-of-domestic-immersion-duv-lithography-machines"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-27",
    "image": {
      "src": "/covers/china-domestic-duv-lithography-tools.png",
      "alt": "A silicon wafer with a thin-film coating shimmering in iridescent colors.",
      "credit": "Photograph via Wikimedia Commons"
    },
    "edition": "Evening Edition · 27 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Monks smuggle silkworm eggs to Byzantium, breaking China's silk monopoly (c. AD 552)",
        "excerpt": "For centuries the secret of raising silkworms was a Chinese monopoly, and the Byzantines paid dearly for raw silk carried west along guarded caravan routes. According to Procopius, two monks who had lived in the East came to Justinian and, promising to break the dependence, returned with silkworm eggs hidden inside hollow bamboo canes. Within a generation imperial workshops in Constantinople, Antioch and Tyre were spinning their own silk, and a jealously guarded technology had a new master.",
        "source": "Smuggling of silkworm eggs into the Byzantine Empire",
        "href": "https://en.wikipedia.org/wiki/Smuggling_of_silkworm_eggs_into_the_Byzantine_Empire"
      },
      {
        "category": "historical",
        "title": "Samuel Slater carries Britain's textile-machine secrets to America (1790)",
        "excerpt": "Britain guarded its water-powered spinning machinery so closely that exporting the designs, or even the skilled workers who knew them, was a crime. Samuel Slater memorized Arkwright's mechanisms during his apprenticeship, slipped out disguised as a farm laborer, and rebuilt the machines from memory at Pawtucket, Rhode Island in 1790. His old countrymen branded him 'Slater the Traitor'; Americans hailed him as the father of their industrial revolution, and Britain's monopoly on the crucial tools was broken.",
        "source": "Samuel Slater — Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Samuel_Slater",
        "image": {
          "src": "/covers/china-domestic-duv-lithography-tools--a1.png",
          "alt": "Engraved portrait of Samuel Slater, industrialist",
          "credit": "From The Biographical Cyclopedia of Representative Men of Rhode Island (1881); public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Prometheus steals fire and gives every craft to mortals — Aeschylus, 'Prometheus Bound'",
        "excerpt": "I hunted out and stored in fennel stalk the stolen source of fire that has proved a teacher to mortals in every art and a means to mighty ends.",
        "source": "Aeschylus, Prometheus Bound, trans. Herbert Weir Smyth (Perseus Digital Library)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0010:card=101",
        "image": {
          "src": "/covers/china-domestic-duv-lithography-tools--a2.png",
          "alt": "Heinrich Fueger's painting Prometheus Brings Fire to Mankind, 1817",
          "credit": "Heinrich Friedrich Fueger, c. 1817; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "The builders of Babel resolve to raise a tower to heaven — Genesis 11 (King James Version)",
        "excerpt": "And they said, Go to, let us build us a city and a tower, whose top may reach unto heaven; and let us make us a name, lest we be scattered abroad upon the face of the whole earth.",
        "source": "The Holy Bible (King James Version), Genesis 11:4 (Wikisource)",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Genesis",
        "image": {
          "src": "/covers/china-domestic-duv-lithography-tools--a3.png",
          "alt": "Pieter Bruegel the Elder's painting The Tower of Babel, 1563",
          "credit": "Pieter Bruegel the Elder, 1563, Kunsthistorisches Museum, Vienna; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Joseph Wright of Derby, 'An Experiment on a Bird in the Air Pump' (1768)",
        "excerpt": "By candlelight a traveling natural philosopher pumps the air from a glass globe, a white cockatoo collapsing inside as the vacuum takes hold. The faces ringed around him run from rapt wonder to a child's fright, capturing a moment when hard-won mastery of a new machine became a public spectacle. Wright's canvas makes tangible the ambition, and the unease, of an age determined to command nature through instruments.",
        "source": "Joseph Wright of Derby, The National Gallery, London",
        "href": "https://en.wikipedia.org/wiki/An_Experiment_on_a_Bird_in_the_Air_Pump",
        "image": {
          "src": "/covers/china-domestic-duv-lithography-tools--a4.png",
          "alt": "Joseph Wright of Derby's painting An Experiment on a Bird in the Air Pump, 1768",
          "credit": "Joseph Wright of Derby, 1768, The National Gallery, London; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Meissen hard-paste porcelain lion (c. 1732-35), after Europe cracked China's porcelain secret",
        "excerpt": "For decades Europe could only import Chinese and Japanese porcelain, unable to reproduce the 'white gold' whose recipe the East kept secret. When the Meissen manufactory near Dresden finally mastered hard-paste porcelain, it flaunted the achievement with monumental white beasts like this modeled lion, made for Augustus the Strong's Japanese Palace. The proud, muscular figure is a boast in clay: the guarded technology had at last been reproduced on European soil.",
        "source": "Meissen Manufactory (modeled by Johann Gottlieb Kirchner), The Metropolitan Museum of Art",
        "href": "https://commons.wikimedia.org/wiki/File:Hard-paste_porcelain_lion,_Meissen,_c._1732-35,_Metropolitan_Museum_of_Art,_1988.294.1.JPG",
        "image": {
          "src": "/covers/china-domestic-duv-lithography-tools--a5.png",
          "alt": "White Meissen hard-paste porcelain figure of a lion, c. 1732-35",
          "credit": "Meissen Manufactory, modeled by Johann Gottlieb Kirchner, c. 1732-35, The Metropolitan Museum of Art (CC0); public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 23
  },
  {
    "slug": "marcos-sona-china-south-china-sea",
    "headline": "Marcos vows to defend Philippine South China Sea rights in his state of the nation address, in a veiled rebuke of Beijing",
    "overview": "In his fifth State of the Nation Address, Philippine President Ferdinand Marcos Jr. pledged to uphold his country's South China Sea rights and to do \"all that is necessary\" to defend the 2016 arbitration ruling that rejected Beijing's expansive maritime claims, declaring \"we do not yield\" without naming China directly. The veiled rebuke, loudly applauded by lawmakers, came days after Manila summoned China's ambassador over state-media images that depicted Filipinos as monkeys. Marcos framed maritime sovereignty as a \"common threat\" facing the nation.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMiwAFBVV95cUxNSFhlaTJQY25waDBlMXdUOVJCR3JZS2k5OEkyd2Vjem9wWXl1cHpJd0kzMnZWTTdRcUdQNVJoVGxYcXR1V0w4NS1pM2tDaHBmRlRLam54M25OZ2ZYNzVNOXIzbWFobS00cUJTY0VnZkFHb3JLWjJfWlZVc1BEVUt6WVdWN1VzMnllZXVEcFFiZmh5NV8wWFRkVW5SVFNwSzFSR042R09zdVQwalRSY2pHRjdySE8wNXZ0cklhcm9RLVM?oc=5"
      },
      {
        "name": "Rappler",
        "href": "https://www.rappler.com/philippines/marcos-statement-common-threat-china-sona-2026/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-27",
    "image": {
      "src": "/covers/marcos-sona-china-south-china-sea.png",
      "alt": "Philippine President Ferdinand Marcos Jr. in an official State of the Nation Address portrait.",
      "credit": "Office of the President of the Philippines, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 27 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Melian Dialogue: Athens and the island of Melos (416 BC)",
        "excerpt": "right, as the world goes, is only in question between equals in power, while the strong do what they can and the weak suffer what they must.",
        "source": "Thucydides, History of the Peloponnesian War, Book 5.89 (Crawley translation)",
        "href": "https://www.thelatinlibrary.com/imperialism/readings/thucydides8.html"
      },
      {
        "category": "historical",
        "title": "Finland defies the Soviet Union in the Winter War (1939-40)",
        "excerpt": "When Stalin demanded that Finland surrender territory to shield Leningrad, the tiny republic of fewer than four million people refused to yield to its colossal neighbor. On skis and in white winter camouflage, outnumbered Finnish troops harried the Red Army through forest and snow for over a hundred days. Finland was forced to cede land, but its refusal to be dictated to became a byword for a small nation's stubborn defense of sovereignty against a great power.",
        "source": "The Winter War (Russo-Finnish War), November 1939 to March 1940",
        "href": "https://en.wikipedia.org/wiki/Winter_War",
        "image": {
          "src": "/covers/marcos-sona-china-south-china-sea--a1.png",
          "alt": "Finnish ski patrol advancing through snow at Saija in Finnish Lapland during the Winter War, 10 February 1940",
          "credit": "Military Museum of Finland, Winter War photograph, 10 February 1940, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "David answers Goliath (1 Samuel 17)",
        "excerpt": "Then said David to the Philistine, Thou comest to me with a sword, and with a spear, and with a shield: but I come to thee in the name of the LORD of hosts, the God of the armies of Israel, whom thou hast defied. This day will the LORD deliver thee into mine hand; and I will smite thee, and take thine head from thee.",
        "source": "The Bible, King James Version, 1 Samuel 17:45-46",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/1_Samuel"
      },
      {
        "category": "literary",
        "title": "The St Crispin's Day speech in Shakespeare's Henry V",
        "excerpt": "We few, we happy few, we band of brothers; For he to-day that sheds his blood with me Shall be my brother; be he ne'er so vile, This day shall gentle his condition.",
        "source": "William Shakespeare, Henry V, Act 4, Scene 3",
        "href": "http://shakespeare.mit.edu/henryv/henryv.4.3.html"
      },
      {
        "category": "artistic",
        "title": "Caravaggio, David with the Head of Goliath (c. 1610)",
        "excerpt": "A young shepherd holds up the severed head of the giant, his own face grave rather than triumphant, lit against a wall of darkness. Caravaggio makes the small victor's courage the true subject, the toppled colossus reduced to a trophy of the outmatched. It is defiance rendered as a single, unflinching gesture in the dark.",
        "source": "Michelangelo Merisi da Caravaggio, Galleria Borghese, Rome",
        "href": "https://commons.wikimedia.org/wiki/File:David_with_the_Head_of_Goliath-Caravaggio_(1610).jpg",
        "image": {
          "src": "/covers/marcos-sona-china-south-china-sea--a4.png",
          "alt": "Caravaggio's painting of the young David holding the severed head of the giant Goliath against a dark background",
          "credit": "Caravaggio, Galleria Borghese, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Willem van de Velde the Younger, The Battle at Texel (1687)",
        "excerpt": "Dutch and enemy men-of-war lock together in smoke and swelling sea, banners streaming as the young republic contests command of its own waters. Van de Velde renders the freedom of the seas as a living drama of wind, wave and gunfire, a small maritime nation staking its survival on refusing to cede the ocean. The painting turns a fight over sea rights into an image of national defiance.",
        "source": "Willem van de Velde the Younger, National Maritime Museum, Greenwich",
        "href": "https://commons.wikimedia.org/wiki/File:Willem_van_de_Velde_(II)_-_The_Battle_at_Texel_-_WGA24522.jpg",
        "image": {
          "src": "/covers/marcos-sona-china-south-china-sea--a5.png",
          "alt": "Dutch and English warships engaged amid smoke and heavy seas in Willem van de Velde the Younger's painting of the Battle of Texel",
          "credit": "Willem van de Velde the Younger, National Maritime Museum, Greenwich, public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 24
  },
  {
    "slug": "lvmh-first-half-2026-results",
    "headline": "LVMH sales return to growth as U.S. luxury demand offsets the hit from the Iran war",
    "overview": "LVMH, the world's largest luxury group, reported first-half 2026 revenue of 38.6 billion euros and said organic sales had returned to growth, with its key fashion and leather-goods division posting its first quarterly rise in two years on a sharp acceleration in the United States. Group organic sales rose 3% — and 4% excluding the impact of the Middle East conflict — as recovering American demand offset the drag from the Iran war. The operating margin held at 22.5% despite currency headwinds and geopolitical disruption.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMitAFBVV95cUxNOWxIaXJEWXgtcHdzZjI2R3lwcFdYd1E1TW5QeHF6QkFkMTJRd2FKck9td01ta2ppc0Jaa0YzT0VTOUV4OENwd1lhRVRHT0FMdDNfUUlZdk1FZDVkaUZXX2RhRlVKRTF2elJ2RVR1elZxVE1GZDhZS3VEcVJLYW9vUURySF82c0hKYjhsVXJId2VUcmNKVTBzQ0phd3FaWkwyUVhvYUFUekR0djI5M1d0b1BFMTE?oc=5"
      },
      {
        "name": "WWD",
        "href": "https://wwd.com/business-news/financial/lvmh-fashion-leather-goods-q2-2026-increase-1239083331/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-27",
    "image": {
      "src": "/covers/lvmh-first-half-2026-results.png",
      "alt": "The Louis Vuitton headquarters building in Paris, France.",
      "credit": "Ank Kumar, CC BY-SA 4.0, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 27 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Nero's Golden House rises from the ashes of Rome, 64 AD",
        "excerpt": "Even as smoke still hung over a city gutted by the Great Fire, Nero commandeered the ruined heart of Rome to raise the Domus Aurea, a pleasure-palace of some 300 rooms sheathed in gold leaf, its ceilings inlaid with ivory and semi-precious stones. Artificial lakes and vineyards spread where tenements had burned. Opulence flourished amid catastrophe, and the extravagance outlived its ruin: within a decade the palace was stripped of its marble, jewels, and ivory.",
        "source": "Wikipedia — Domus Aurea",
        "href": "https://en.wikipedia.org/wiki/Domus_Aurea",
        "image": {
          "src": "/covers/lvmh-first-half-2026-results--a0.png",
          "alt": "Roberto Bompiani's painting A Roman Feast, showing reclining guests at a lavish banquet in imperial Rome",
          "credit": "Roberto Bompiani, A Roman Feast, J. Paul Getty Museum, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "Louis XIV gilds Versailles while wars drain France, 1678-1684",
        "excerpt": "As France poured its treasure into the ruinous wars of Louis XIV's reign, the Sun King raised the Hall of Mirrors, seventeen mirror-clad arches blazing with candlelight to advertise the power of the absolute monarch. The magnificence was literally spent on war: the gallery's fabled silver furniture was melted down and coined in 1689 to finance the War of the League of Augsburg. Splendor and hardship advanced together beneath the same painted ceilings.",
        "source": "Wikipedia — Hall of Mirrors",
        "href": "https://en.wikipedia.org/wiki/Hall_of_Mirrors",
        "image": {
          "src": "/covers/lvmh-first-half-2026-results--a1.png",
          "alt": "Hyacinthe Rigaud's 1701 state portrait of Louis XIV robed in ermine and blue velvet embroidered with gold fleurs-de-lis",
          "credit": "Hyacinthe Rigaud, Louis XIV, Musee du Louvre, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Petronius, Satyricon — the feast of Trimalchio",
        "excerpt": "On the tray stood a donkey made of Corinthian bronze, bearing panniers containing olives, white in one and black in the other. Two platters flanked the figure, on the margins of which were engraved Trimalchio's name and the weight of the silver in each. Dormice sprinkled with poppy-seed and honey were served on little bridges soldered fast to the platter, and hot sausages on a silver gridiron, underneath which were damson plums and pomegranate seeds.",
        "source": "Petronius, The Satyricon, Vol. 2 (Dinner of Trimalchio), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/5219/5219-h/5219-h.htm",
        "image": {
          "src": "/covers/lvmh-first-half-2026-results--a2.png",
          "alt": "Lawrence Alma-Tadema's painting The Roses of Heliogabalus, showing Roman banqueters half-buried under a cascade of pink rose petals",
          "credit": "Lawrence Alma-Tadema, The Roses of Heliogabalus (1888), public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "F. Scott Fitzgerald, The Great Gatsby (1925)",
        "excerpt": "There was music from my neighbour's house through the summer nights. In his blue gardens men and girls came and went like moths among the whisperings and the champagne and the stars.",
        "source": "F. Scott Fitzgerald, The Great Gatsby, Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/64317/pg64317.txt",
        "image": {
          "src": "/covers/lvmh-first-half-2026-results--a3.png",
          "alt": "The 1925 first-edition dust jacket of The Great Gatsby by Francis Cugat, a woman's eyes and lips floating in a deep blue night above a glittering city",
          "credit": "Francis Cugat, 1925 first-edition cover of The Great Gatsby, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Paolo Veronese, The Wedding at Cana (1563)",
        "excerpt": "Veronese crowds his colossal canvas with more than a hundred richly dressed guests feasting beneath marble colonnades, servants pouring wine into gleaming vessels while musicians play in silk and brocade. Painted for a Venetian refectory, it turns a biblical miracle into a dazzling display of Renaissance abundance and splendor. Luxury fills every inch, gorgeous and untroubled by the world beyond the banquet.",
        "source": "Paolo Veronese, The Wedding at Cana, Musee du Louvre",
        "href": "https://en.wikipedia.org/wiki/The_Wedding_at_Cana",
        "image": {
          "src": "/covers/lvmh-first-half-2026-results--a4.png",
          "alt": "Paolo Veronese's vast painting The Wedding at Cana, a sumptuous banquet of over a hundred figures in a grand marble architectural setting",
          "credit": "Paolo Veronese, The Wedding at Cana (1563), Musee du Louvre, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Willem Kalf, Still Life with Chinese Porcelain and Glassware (1662)",
        "excerpt": "Kalf's pronkstilleven, or ostentatious still life, gathers the trophies of Dutch Golden Age wealth: a lidded Chinese porcelain bowl, a half-peeled lemon, cut glass and gilded silver glowing out of a velvet darkness. Every surface catches and returns the light, a hymn to imported riches at the height of a mercantile empire. Yet the genre carried a quiet warning that such splendor is fleeting.",
        "source": "Willem Kalf, Still Life (1662), Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Willem_Kalf_002.jpg",
        "image": {
          "src": "/covers/lvmh-first-half-2026-results--a5.png",
          "alt": "Willem Kalf's still life of a Chinese porcelain covered bowl, a half-peeled lemon, cut glass and gilded silver emerging from a dark background",
          "credit": "Willem Kalf, Still Life (1662), public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 25
  },
  {
    "slug": "toronto-us-consulate-shots-fired",
    "headline": "Shots fired at the U.S. consulate in Toronto for the second time this year, police say",
    "overview": "Gunfire struck the U.S. consulate general in downtown Toronto early Monday for the second time this year, Canadian police said, with rounds hitting the building but no injuries reported. Toronto police cordoned off the area around University Avenue as investigators examined the scene and reviewed whether the shooting was deliberately targeted. The U.S. State Department said it was aware of the incident and working with local authorities.",
    "genre": "Politics",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/ckgvnw44rz9o"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMisgFBVV95cUxNQ2ZkekJaWFBCLS1YUjZLNTZ2TmdzVE9PeEtQTG1tRi13NmdUMERzb19xNlZJcEx5NXNQSnk0NVl0aTdnc0dHNzlTNFpoSWZCeFN6Mk5MYzZsNnRuejRNcl9lRTBKQTJ3d3NlNXNjZ1lyU1VvXzE0eHF4THc5cnQ0LVVKYmFzOThPWmxBNERvVjQ1WFN2dDlrN0l1emJrQlAwT3dNYjRINjI3R2o2QWZWOVFn?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-27",
    "image": {
      "src": "/covers/toronto-us-consulate-shots-fired.png",
      "alt": "The United States Consulate General building in downtown Toronto, Ontario.",
      "credit": "Photograph via Wikimedia Commons"
    },
    "edition": "Evening Edition · 27 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Greeks who murdered the Great King's heralds (Herodotus, Histories 7.133, c. 491 BC)",
        "excerpt": "at the former time when Dareios had sent for this very purpose, the one people threw the men who made the demand into the pit and the others into a well, and bade them take from thence earth and water and bear them to the king.",
        "source": "Herodotus, Histories 7.133 (trans. G. C. Macaulay)",
        "href": "https://lexundria.com/hdt/7.133/mcly",
        "image": {
          "src": "/covers/toronto-us-consulate-shots-fired--a0.png",
          "alt": "Marble bust of the Greek historian Herodotus",
          "credit": "Bust of Herodotus, Palazzo Massimo alle Terme, Rome; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "The 55-day siege of the foreign legations at Peking (1900)",
        "excerpt": "For 55 days in the summer of 1900, Boxer irregulars and Qing imperial troops poured fire into the walled diplomatic quarter of Peking, trapping some 900 foreigners and thousands of Chinese Christians behind hastily raised barricades. Diplomats who had come under the ancient promise of safe conduct found the sanctuary of the legation turned into a battlefront. Only the arrival of an eight-nation relief column on August 14 broke the ring of gunfire around the mission compounds.",
        "source": "Siege of the International Legations, Peking, June–August 1900",
        "href": "https://en.wikipedia.org/wiki/Siege_of_the_International_Legations",
        "image": {
          "src": "/covers/toronto-us-consulate-shots-fired--a1.png",
          "alt": "Sikh troops behind the barricaded entrance to the British Legation during the Boxer siege, Peking, August 1900",
          "credit": "Photograph, Peking 1900; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Achilles receives Agamemnon's heralds, whom he refuses to harm (Iliad, Book I)",
        "excerpt": "Welcome, heralds, messengers of gods and men; draw near; my quarrel is not with you but with Agamemnon who has sent you for the girl Briseis.",
        "source": "Homer, The Iliad, Book I (trans. Samuel Butler)",
        "href": "https://en.wikisource.org/wiki/The_Iliad_(Butler)/Book_I",
        "image": {
          "src": "/covers/toronto-us-consulate-shots-fired--a2.png",
          "alt": "Roman fresco of Achilles surrendering Briseis to Agamemnon's heralds",
          "credit": "Wall painting from the House of the Tragic Poet, Pompeii, Naples National Archaeological Museum; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "The suppliant maidens claim sanctuary at the altar under Zeus's protection (Aeschylus, The Suppliants)",
        "excerpt": "Zeus! Lord and guard of suppliant hands\nLook down benign on us who crave\nThine aid-whom winds and waters drave\nFrom where, through drifting shifting sands,\nPours Nilus to the wave.",
        "source": "Aeschylus, The Suppliants (trans. E. D. A. Morshead)",
        "href": "https://classics.mit.edu/Aeschylus/suppliant.html",
        "image": {
          "src": "/covers/toronto-us-consulate-shots-fired--a3.png",
          "alt": "Marble bust of the tragedian Aeschylus",
          "credit": "Bust of Aeschylus, Ny Carlsberg Glyptotek, Copenhagen; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Hans Holbein the Younger, The Ambassadors (1533)",
        "excerpt": "Two envoys stand in their furs and finery amid the globes, instruments and books of worldly power, the confident face of Renaissance diplomacy. Yet a smear of paint floats across the floor before them, resolving from the side into an anamorphic skull. Holbein sets the pageantry of ambassadors against the fragility of the men who carry it, a reminder that the mission's dignity is only as safe as the mortal bodies who bear it.",
        "source": "Hans Holbein the Younger, The Ambassadors, 1533, National Gallery, London",
        "href": "https://en.wikipedia.org/wiki/The_Ambassadors_(Holbein)",
        "image": {
          "src": "/covers/toronto-us-consulate-shots-fired--a4.png",
          "alt": "Holbein's double portrait The Ambassadors: two richly dressed envoys flanking a table, with an anamorphic skull across the foreground",
          "credit": "Hans Holbein the Younger, The Ambassadors (1533), National Gallery, London; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "H. Charles McBarron Jr., \"I'll Try, Sir!\" — the assault to relieve the Peking legations (1900)",
        "excerpt": "McBarron's history painting freezes the moment the relief column reaches the besieged diplomatic quarter, soldiers scrambling up the great Tartar Wall through smoke and rifle fire. The trumpeter Calvin Titus climbs first into the fusillade, the barricaded mission just beyond. The canvas turns a siege of embassies into a wall of noise and gunfire, the sanctuary of diplomacy defended only by force of arms.",
        "source": "H. Charles McBarron Jr., \"I'll Try, Sir!\", U.S. Army Center of Military History",
        "href": "https://commons.wikimedia.org/wiki/File:Siege_of_Peking,_Boxer_Rebellion.jpg",
        "image": {
          "src": "/covers/toronto-us-consulate-shots-fired--a5.png",
          "alt": "Painting of American troops scaling the Tartar Wall under fire to relieve the besieged Peking legations, 1900",
          "credit": "H. Charles McBarron Jr., \"I'll Try, Sir!\", U.S. Army Center of Military History; public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 26
  },
  {
    "slug": "seattle-food-festival-shooting",
    "headline": "Shooting at Seattle's Bite of Seattle food festival kills 3 and wounds at least 4 near the Space Needle",
    "overview": "A shooting at the Bite of Seattle food festival at the Seattle Center killed three people and wounded at least four others, including a two-year-old boy, on Sunday evening near the Space Needle. Police said the gunfire erupted around 6 p.m. as two suspects apparently shot at each other; one was taken into custody and a second fled the scene. Mayor Katie Wilson called it a devastating act of violence as the final day of the annual festival descended into chaos.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMipgFBVV95cUxQOHdnckxsV0hjY2pWQzhxUGpSMk1ldm8wcmJia1B3MDJ2b3p5R09abkFVTERYZ3JTdWFEQktGVzRvNHlKZHR2dGdlNWt0ZkRBQ1hHeUFid3ZZSzRIaW40VExRaXJaYVVnS25qSWRkU0dvS3F0b2o2bEk0Q1pRUmZVaC1LYjhFSXI3bjNONzJOdmlNTFdQUEM1NXVSUHBrRmJyS2o3d013?oc=5"
      },
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMikwFBVV95cUxONnFsN1E3UDNxYVUyd3ZVb0hsUnZZem01VmFMZkwzWFl5Z2Z1UXgzZGZSZnZjbklHdldtckp6eDhTYmlKbGFrbHZKdlpMTEl2ZU5fRHF2WWZXLTlhVFdaUy03Zm5GVVFheGtLNEJBYU1vUWlTalFPT09pMXJwQjBLSGlURXlnTWNKc1d6R2VBcnhMQUE?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-27",
    "image": {
      "src": "/covers/seattle-food-festival-shooting.png",
      "alt": "The Space Needle rising above Seattle Center, home of the Bite of Seattle festival.",
      "credit": "Dietmar Rabich, CC BY-SA 4.0, via Wikimedia Commons"
    },
    "lead": true,
    "edition": "Morning Edition · 27 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Assassination of Philip II of Macedon (336 BC)",
        "excerpt": "In October 336 BC, Philip II of Macedon was assassinated at Aegae (modern Vergina) during the wedding festivities of his daughter Cleopatra to Alexander of Epirus. As the king entered the theatre amid games and celebration, deliberately walking ahead of his bodyguards to appear approachable to the assembled Greek dignitaries, his own guard Pausanias of Orestis stabbed him to death. A lavish royal feast erupted into panic and bloodshed, ending Philip's reign and clearing the throne for his son Alexander the Great.",
        "source": "Philip II of Macedon (Wikipedia)",
        "href": "https://en.wikipedia.org/wiki/Philip_II_of_Macedon",
        "image": {
          "src": "/covers/seattle-food-festival-shooting--a0.png",
          "alt": "Marble bust of King Philip II of Macedon, a Roman copy of a Greek original.",
          "credit": "Roman copy of a Greek original, bust of Philip II of Macedon, Ny Carlsberg Glyptotek, Copenhagen; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "The St. Bartholomew's Day Massacre (1572)",
        "excerpt": "Beginning in the night of 23-24 August 1572, the St. Bartholomew's Day Massacre erupted in Paris while the city was still thronged for the celebrations of the royal wedding of the Catholic Margaret of Valois to the Protestant Henry of Navarre. Targeted killings of Huguenot leaders spilled into weeks of mob violence that reached a dozen provincial cities, with modern estimates of the dead ranging from 5,000 to 30,000. A wedding meant to reconcile France's warring faiths became one of the bloodiest episodes of the French Wars of Religion.",
        "source": "St. Bartholomew's Day massacre (Wikipedia)",
        "href": "https://en.wikipedia.org/wiki/St._Bartholomew%27s_Day_massacre",
        "image": {
          "src": "/covers/seattle-food-festival-shooting--a1.png",
          "alt": "Francois Dubois's painting of the St. Bartholomew's Day Massacre showing Huguenots slain in the streets of Paris.",
          "credit": "Francois Dubois, 'The St. Bartholomew's Day Massacre' (c. 1572-1584); public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "The Slaying of the Suitors, Homer's Odyssey, Book XXII",
        "excerpt": "Then Ulysses tore off his rags, and sprang on to the broad pavement with his bow and his quiver full of arrows. He shed the arrows on to the ground at his feet and said, “The mighty contest is at an end. I will now see whether Apollo will vouchsafe it to me to hit another mark which no man has yet hit.”\n\nOn this he aimed a deadly arrow at Antinous, who was about to take up a two-handled gold cup to drink his wine and already had it in his hands. He had no thought of death—who amongst all the revellers would think that one man, however brave, would stand alone among so many and kill him? The arrow struck Antinous in the throat, and the point went clean through his neck, so that he fell over and the cup dropped from his hand, while a thick stream of blood gushed from his nostrils.",
        "source": "Homer, The Odyssey (trans. Samuel Butler), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/1727/1727-h/1727-h.htm",
        "image": {
          "src": "/covers/seattle-food-festival-shooting--a2.png",
          "alt": "Campanian red-figure krater depicting Odysseus and Telemachus slaying Penelope's suitors.",
          "credit": "Campanian red-figure bell-krater, c. 330 BC, Louvre (CA 7124); public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Banquo's Ghost at the Banquet, Shakespeare's Macbeth, Act III, Scene 4",
        "excerpt": "MACBETH.\nWhich of you have done this?\n\nLORDS.\nWhat, my good lord?\n\nMACBETH.\nThou canst not say I did it. Never shake\nThy gory locks at me.\n\nROSS.\nGentlemen, rise; his Highness is not well.",
        "source": "William Shakespeare, Macbeth, Project Gutenberg",
        "href": "https://www.gutenberg.org/files/1533/1533-h/1533-h.htm",
        "image": {
          "src": "/covers/seattle-food-festival-shooting--a3.png",
          "alt": "Theodore Chasseriau's painting of Macbeth recoiling from the ghost of Banquo at the banquet table.",
          "credit": "Theodore Chasseriau, 'The Ghost of Banquo' (1854); public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Goya, The Third of May 1808",
        "excerpt": "Painted by Francisco Goya in 1814, The Third of May 1808 depicts the summary execution of unarmed Madrid citizens by Napoleon's soldiers on 3 May 1808, in reprisal for the previous day's uprising. A lantern throws harsh light on a terrified man flinging his arms wide before a faceless firing squad, while the dead lie in pooled blood at his feet. Now in the Museo del Prado, it stands as a landmark image of civilian slaughter and the human cost of sudden, mechanical violence.",
        "source": "The Third of May 1808 (Wikipedia)",
        "href": "https://en.wikipedia.org/wiki/The_Third_of_May_1808",
        "image": {
          "src": "/covers/seattle-food-festival-shooting--a4.png",
          "alt": "Goya's The Third of May 1808 showing a firing squad executing civilians by lantern light.",
          "credit": "Francisco Goya, 'The Third of May 1808' (1814), Museo del Prado; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Mozart, Requiem in D minor, K. 626",
        "excerpt": "Mozart's Requiem in D minor, K. 626, is a Mass for the dead that the composer left unfinished at his death in December 1791; it was completed by his pupil Franz Xaver Suessmayr. Its movements sweep from the pleading Introit and the thunderous Dies irae to the tear-stained Lacrimosa, giving shape to shock, grief, and mourning. The work has become one of Western music's defining expressions of communal lament for lives suddenly and violently lost.",
        "source": "Requiem in D minor, K.626 (IMSLP)",
        "href": "https://imslp.org/wiki/Requiem_in_D_minor,_K.626_(Mozart,_Wolfgang_Amadeus)",
        "image": {
          "src": "/covers/seattle-food-festival-shooting--a5.png",
          "alt": "Posthumous portrait of composer Wolfgang Amadeus Mozart by Barbara Krafft.",
          "credit": "Barbara Krafft, portrait of Wolfgang Amadeus Mozart (1819); public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 27
  },
  {
    "slug": "france-spain-wildfires-bordeaux",
    "headline": "Wildfires across France and Spain drive some 250,000 people from their homes as flames near Bordeaux",
    "overview": "Fast-moving wildfires sweeping across southern France and Spain have driven roughly 250,000 people from their homes and pushed flames toward the wine city of Bordeaux, prompting President Emmanuel Macron to convene a crisis meeting. Thousands of firefighters, backed by water-bombing aircraft, battled to contain the blazes amid a brutal heatwave and tinder-dry conditions. Authorities warned that shifting winds could threaten more towns as the fires spread.",
    "genre": "Climate",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMinwFBVV95cUxOalBvXzl6UFlKWUlWdWpYZmo0TmF0eVNQejlSNFJPMjdmREMyd2d6UUo2djQybVVMWnlCY05FUWlhRkpNd01MZGJMeFhRMkZlbUZab0NzUzZyaUh6TlVseThfaDBVZFlLRENxbmFZdnhxbFlJaEtQeUlGaUZhcGgya2dRbWpYcHpIem0tb3RWWmdObDNLc1hVUnFlMVpaeDQ?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMisAFBVV95cUxPZ29lUm9wb0g2TUU0dWowSWdwNFExdGpETDljMi1yYXc3cjBjcVZXbnhWRDFiWFNHMlVyb3ZGYnpqeGRhRkt3aVpFSDFCNzdhMzFqWGVBRTF3bVh5NHJIZjBSa0d1QjlfZjdweWpxc01odndpYk1QeUU1UU5rajhtXzZPQkZWOWFtOXVuUDJQVnNENjFxWS13ZHNLWTJNSS1jZ3ZOd3hRZzlZbmN4LVY0Qw?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-27",
    "image": {
      "src": "/covers/france-spain-wildfires-bordeaux.png",
      "alt": "Firefighters battling a fast-moving wildfire.",
      "credit": "Region 5 Photography, U.S. Forest Service; public domain, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 27 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Great Fire of Rome, AD 64",
        "excerpt": "On the night of 18-19 July AD 64, fire broke out among the merchant shops around the Circus Maximus and, driven by strong summer winds through Rome's narrow streets and packed tenements, raged for the better part of nine days. According to Tacitus, ten of the city's fourteen districts were damaged or destroyed. Terrified crowds fled through the streets and out into the fields, some trampled in the crush, as the flames outran every attempt to stop them. It remains the archetype of a city consumed and a population put to flight by an unstoppable blaze.",
        "source": "Encyclopedic history (Tacitus, Annals)",
        "href": "https://en.wikipedia.org/wiki/Great_Fire_of_Rome",
        "image": {
          "src": "/covers/france-spain-wildfires-bordeaux--a0.png",
          "alt": "Oil painting of ancient Rome engulfed in flames with columns and crowds fleeing before the fire.",
          "credit": "Hubert Robert, 'L'Incendie de Rome' (c. 1785), public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "The Camp Fire, California, November 2018",
        "excerpt": "On 8 November 2018 a wildfire sparked by a failed PG&E transmission line tore into the foothill town of Paradise, California, driven by katabatic winds over 50 mph after more than 200 rainless days. Roughly 52,000 people fled in a chaotic evacuation as the flames overran the town in hours; 85 people died and more than 18,800 structures burned. It stands as the deadliest and most destructive wildfire in California history, a modern parallel to fast-moving fires that empty whole communities.",
        "source": "Encyclopedic history",
        "href": "https://en.wikipedia.org/wiki/Camp_Fire_(2018)",
        "image": {
          "src": "/covers/france-spain-wildfires-bordeaux--a1.png",
          "alt": "A towering plume of smoke and flame from the 2018 Camp Fire seen from a road east of Paradise, California.",
          "credit": "Photo via Wikimedia Commons (2018 Camp Fire), public domain"
        }
      },
      {
        "category": "literary",
        "title": "The Burning of Troy, Virgil's Aeneid, Book II",
        "excerpt": "Deiphobus' great house / sank vanquished in the fire. Ucalegon's / hard by was blazing, while the waters wide / around Sigeum gave an answering glow.",
        "source": "Virgil, Aeneid (trans. Theodore C. Williams, 1910), Perseus Digital Library",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0054:book=2:card=298",
        "image": {
          "src": "/covers/france-spain-wildfires-bordeaux--a2.png",
          "alt": "Apocalyptic painting of a world collapsing in fire, with mountains falling and a red-lit sky.",
          "credit": "John Martin, 'The Great Day of His Wrath' (c. 1851), Tate, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Pepys Witnesses the Great Fire of London, 2 September 1666",
        "excerpt": "Everybody endeavouring to remove their goods, and flinging into the river or bringing them into lighters that lay off; poor people staying in their houses as long as till the very fire touched them, and then running into boats, or clambering from one pair of stairs by the water-side to another... So near the fire as we could for smoke; and all over the Thames, with one's face in the wind, you were almost burned with a shower of firedrops.",
        "source": "Samuel Pepys, Diary of Samuel Pepys, Wikisource",
        "href": "https://en.wikisource.org/wiki/Diary_of_Samuel_Pepys/1666/September"
      },
      {
        "category": "artistic",
        "title": "The Burning of the Houses of Lords and Commons, 16 October 1834",
        "excerpt": "Turner painted this canvas after personally watching the Houses of Parliament burn on the night of 16 October 1834, sketching the blaze from the banks of the Thames. The composition dissolves architecture into a furnace of orange and gold, the fire's reflection streaming across the water while crowds gather on Westminster Bridge to watch. It is one of art's most visceral studies of a great building consumed and a city lit by uncontrollable flame.",
        "source": "J.M.W. Turner, Cleveland Museum of Art",
        "href": "https://www.clevelandart.org/art/1942.647",
        "image": {
          "src": "/covers/france-spain-wildfires-bordeaux--a4.png",
          "alt": "Turner's painting of Parliament ablaze at night, flames and their reflection blazing across the Thames.",
          "credit": "J.M.W. Turner, 'The Burning of the Houses of Lords and Commons, 16 October 1834', Cleveland Museum of Art, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "The Great Day of His Wrath",
        "excerpt": "Painted around 1851 as part of his 'Last Judgment' trilogy, John Martin's vast canvas shows an entire world torn apart and swallowed by fire, mountains toppling into a red abyss beneath a sky of smoke and flame. Martin's imagination was shaped by the industrial furnaces of the Black Country, which he translated into an apocalyptic vision of nature and humanity overwhelmed by an inferno. The picture epitomizes the sublime terror of fire beyond all human control.",
        "source": "John Martin, Tate Britain",
        "href": "https://www.tate.org.uk/art/artworks/martin-the-great-day-of-his-wrath-n05613",
        "image": {
          "src": "/covers/france-spain-wildfires-bordeaux--a5.png",
          "alt": "Apocalyptic painting of mountains collapsing into a fiery red chasm under a burning, smoke-filled sky.",
          "credit": "John Martin, 'The Great Day of His Wrath' (c. 1851), Tate, public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 28
  },
  {
    "slug": "cxmt-shanghai-ipo-debut",
    "headline": "China's memory-chip maker CXMT surges more than 470% on its Shanghai debut to become the mainland's most valuable listed company",
    "overview": "Shares of ChangXin Memory Technologies (CXMT), China's largest memory-chip maker, surged more than 470% on their debut on Shanghai's tech-heavy STAR Market, briefly making the firm the most valuable listed company in mainland China at about 3.3 trillion yuan ($487 billion). The Hefei-based company, founded in 2016, produces the DRAM chips that power AI data centres, phones and PCs. The blockbuster listing defied a sharp global sell-off in technology stocks this month.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiwwFBVV95cUxNYm1IR1F2YXpDSDNtXzYzeTN5dWQ3ZnlwZ2hGRTQtV3plXzhYWEZYdzRXZE13dEEzSnNoMVlLajJJT0RGd05ZTzJEVE8wbVdsR056dXlFZm1OUDFnOERvUTlva21VaW1HeS1aQnl2U2tKZzhTRzEwV2EwV215MzJzd3lmbWZIMUdSMFFpdHBJbWF4bm1LcTNrR01ub29KRWlRd2xmRDJNNmt1UHVncGZzalVzbl9kTHFfaHZHQk5YR1c2a0E?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c9q9w3x9qn2o"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-27",
    "image": {
      "src": "/covers/cxmt-shanghai-ipo-debut.png",
      "alt": "A module of DRAM memory chips, the kind of product CXMT manufactures.",
      "credit": "Mixabest; public domain, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 27 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Dutch Tulip Mania (1637)",
        "excerpt": "In the 1630s the Dutch Republic was gripped by a speculative frenzy for tulip bulbs, whose prices climbed to astonishing heights as rare variegated blooms like the Semper Augustus changed hands for the price of a grand canal house. Contracts for bulbs still buried in the ground were traded feverishly in taverns, drawing in artisans and shopkeepers convinced that prices could only keep rising. In February 1637 the market abruptly collapsed and fortunes built on paper promises evaporated overnight. Often cited as the first recorded speculative bubble, tulip mania endures as the byword for irrational market exuberance.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Tulip_mania",
        "image": {
          "src": "/covers/cxmt-shanghai-ipo-debut--a0.png",
          "alt": "A 17th-century watercolour of a Semper Augustus tulip, the flamed red-and-white bloom that fetched the highest prices during the Dutch tulip mania.",
          "credit": "Anonymous 17th-century watercolour; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "The Dot-com Bubble (late 1990s)",
        "excerpt": "During the late 1990s a wave of investment poured into internet and technology start-ups, driving the NASDAQ Composite index up roughly fivefold between 1995 and its March 2000 peak. Companies with scant revenue and no profits commanded soaring valuations on the promise that the web would remake the entire economy. When sentiment turned, the bubble burst, erasing trillions of dollars in market value and bankrupting hundreds of dot-coms by 2002. The episode remains a cautionary tale of euphoric faith in a transformative technology outrunning its fundamentals.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Dot-com_bubble",
        "image": {
          "src": "/covers/cxmt-shanghai-ipo-debut--a1.png",
          "alt": "A line chart of the NASDAQ Composite index showing its steep climb to a March 2000 peak followed by a sharp crash.",
          "credit": "NASDAQ Composite index chart; via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Extraordinary Popular Delusions and the Madness of Crowds — The South-Sea Bubble",
        "excerpt": "Exchange Alley was in a fever of excitement. The Company's stock, which had been at a hundred and thirty the previous day, gradually rose to three hundred, and continued to rise with the most astonishing rapidity during the whole time that the bill in its several stages was under discussion.",
        "source": "Charles Mackay (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/636/pg636.txt"
      },
      {
        "category": "literary",
        "title": "Money (L'Argent)",
        "excerpt": "In a fortnight the figure of fifteen hundred francs was reached at the Bourse, and in the last days of August, by successive leaps, the shares rose to two thousand. The infatuation was still at fever-heat; the paroxysm became more and more intense each day. Folks bought and bought; even the most prudent went on buying, convinced that the shares would rise higher yet, go up indeed for ever and ever.",
        "source": "Émile Zola, trans. E. A. Vizetelly (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/56987/pg56987.txt"
      },
      {
        "category": "artistic",
        "title": "Flora's Wagon of Fools",
        "excerpt": "Painted around 1637 as the tulip market was collapsing, Hendrik Gerritsz Pot's satirical panel shows the flower goddess Flora, her arms heaped with tulips, riding a wind-driven 'wagon of fools' toward the sea alongside grinning personifications of vain hope, drink and money-grubbing. Weavers who have abandoned their looms trudge behind, having thrown in their livelihoods with the doomed speculation. The allegory mocks the greed of the tulip trade and the folly of a crowd chasing riches on the wind. It remains among the most celebrated visual satires of the Dutch tulipomania.",
        "source": "Hendrik Gerritsz Pot (c. 1637), Frans Hals Museum",
        "href": "https://commons.wikimedia.org/wiki/File:Flora's_Wagon_of_Fools_(Flora's_Mallewagen)_tulipomania,_Hendrik_Gerritsz_Pot_c1637.jpg",
        "image": {
          "src": "/covers/cxmt-shanghai-ipo-debut--a4.png",
          "alt": "A painting of the goddess Flora on a wind-borne wagon of fools laden with tulips, sailing toward the sea as ruined weavers follow behind.",
          "credit": "Hendrik Gerritsz Pot, 'Flora's Wagon of Fools' (c. 1637), Frans Hals Museum; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "The South Sea Scheme",
        "excerpt": "William Hogarth's 1721 engraving 'The South Sea Scheme' is a crowded allegory of the financial mania that had ruined thousands of British investors the year before. A carousel of speculators whirls beside a grotesque machine while Honesty is broken on a wheel and Honour flogged, and a jostling mob scrambles to buy shares. Hogarth turns the disaster into a moral indictment of the greed and folly unleashed by the South Sea Company's collapse. The print helped launch his career as Britain's foremost pictorial satirist.",
        "source": "William Hogarth (1721 engraving)",
        "href": "https://commons.wikimedia.org/wiki/File:William_Hogarth_-_The_South_Sea_Scheme.png",
        "image": {
          "src": "/covers/cxmt-shanghai-ipo-debut--a5.png",
          "alt": "Hogarth's crowded engraving satirising the South Sea Bubble, with a spinning carousel of speculators and figures of Honesty and Honour being tortured.",
          "credit": "William Hogarth, 'The South Sea Scheme' (1721); public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 29
  },
  {
    "slug": "nvidia-openai-250-billion-data-center",
    "headline": "Nvidia in talks to guarantee up to $250 billion in financing for an OpenAI data center, WSJ reports",
    "overview": "Nvidia is in talks to guarantee up to $250 billion in financing for a massive OpenAI data centre, the Wall Street Journal reported, one of the largest such commitments yet in the artificial-intelligence build-out. The arrangement would deepen the ties between the world's most valuable chipmaker and the maker of ChatGPT. Separately, South Korea's Naver jumped about 10% after Nvidia unveiled a $1 billion investment plan in the country.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMi1gFBVV95cUxQemxoQlhRcXdJWU9ITnV3LVJxNV9kYzVBanFYWUdVTE9oTVYwcnJCakp6aU9GWHJaeTM2eEdhdzFXVjRPT0J4cUZ1VmtOSnZ3WWQ4TkdmVnY0VnQ2R29LUUV5c1VoMnNiSFZ4enhhR2pEVFNvLVhLejFjN01tOEZpcGdWQ1RWbGNUUXdWeWNZN0s4N3RKcEMxeE9TdnZHYXVaQ3VYNHRPc1JyX1FSUHRkc0xjbkdCcTA4ZGFTdVZjU1M1akxSMEJxc1VnMW1ic1RFbEx1QTlB?oc=5"
      },
      {
        "name": "Reuters (Naver)",
        "href": "https://news.google.com/rss/articles/CBMiswFBVV95cUxOSkhjUXN3Z1VSTkZyVjdBMURwLXRFYm1TMkpmZEZGS1FyRFhsRjNkSWpTZ2g1cW1UNVpXUnc4dWNSWkJIVlVkY18wOENjMWsxQm0tWWN6Y3M3RW9lNkxRUXY5Rzc5M3cxMHI2Ry1DbldOOG0xQU5obklobjlXdFNWU2tVcXc2dkM1bzYwNXlUZHowQ1l4OGhWTjN4Y1hybVQwcGoyZnphTXkyVVRYa3lmNW9URQ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-27",
    "image": {
      "src": "/covers/nvidia-openai-250-billion-data-center.png",
      "alt": "Rows of servers in a data centre of the kind built for artificial-intelligence workloads.",
      "credit": "BalticServers.com, CC BY-SA 3.0, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 27 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The First Transcontinental Railroad and its government-guaranteed financing",
        "excerpt": "To build the 1,900-mile line, Congress passed the Pacific Railroad Act of 1862, authorizing 30-year federal bonds and issuing subsidies of $16,000 to $48,000 per mile of track depending on the terrain, alongside land grants totaling roughly 130 million acres. The Union Pacific built westward from Council Bluffs while the Central Pacific pushed eastward from Sacramento, the two meeting at Promontory Summit, Utah, on May 10, 1869. The government essentially underwrote a colossal private enterprise to unlock a transformative technology, binding public backing tightly to the fortunes of a handful of railroad barons.",
        "source": "First Transcontinental Railroad (Wikipedia)",
        "href": "https://en.wikipedia.org/wiki/First_Transcontinental_Railroad"
      },
      {
        "category": "historical",
        "title": "Samuel Insull and the financing of the electric power build-out",
        "excerpt": "In the early twentieth century Samuel Insull built an electric-utility empire around vast central generating stations such as Chicago's Fisk and Crawford plants, betting that ever-larger scale would make electricity cheap enough for mass adoption. He financed the expansion through layered holding companies, at one point controlling assets worth some $500 million against only about $27 million of equity. When the empire collapsed after the 1929 crash it wiped out the savings of hundreds of thousands of shareholders and helped prompt the Public Utility Holding Company Act of 1935.",
        "source": "Samuel Insull (Wikipedia)",
        "href": "https://en.wikipedia.org/wiki/Samuel_Insull"
      },
      {
        "category": "literary",
        "title": "The Tower of Babel (Genesis 11)",
        "excerpt": "And they said, Go to, let us build us a city and a tower, whose top may reach unto heaven; and let us make us a name, lest we be scattered abroad upon the face of the whole earth.",
        "source": "The Bible, King James Version (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/8001/pg8001.txt"
      },
      {
        "category": "literary",
        "title": "Ozymandias",
        "excerpt": "And on the pedestal these words appear: 'My name is Ozymandias, king of kings: Look on my works, ye Mighty, and despair!' Nothing beside remains. Round the decay Of that colossal wreck, boundless and bare, The lone and level sands stretch far away.",
        "source": "Percy Bysshe Shelley (Wikisource)",
        "href": "https://en.wikisource.org/wiki/Poems_That_Every_Child_Should_Know/Ozymandias_of_Egypt"
      },
      {
        "category": "artistic",
        "title": "The Tower of Babel",
        "excerpt": "Painted in oil on panel in 1563 and now in the Kunsthistorisches Museum in Vienna, Bruegel's Tower of Babel renders the biblical structure as a spiraling megaproject swarming with cranes, scaffolding, and laborers, its upper tiers already vanishing into cloud. The king Nimrod appears in the foreground receiving obeisance, a study in overreaching ambition. The tower's tilting, unfinished form makes visible the fragility built into monuments of colossal scale.",
        "source": "Pieter Bruegel the Elder (Kunsthistorisches Museum, Vienna)",
        "href": "https://en.wikipedia.org/wiki/The_Tower_of_Babel_(Bruegel)",
        "image": {
          "src": "/covers/nvidia-openai-250-billion-data-center--a4.png",
          "alt": "Pieter Bruegel the Elder's 1563 painting of the Tower of Babel, a vast spiraling tower under construction rising into the clouds above a harbor town.",
          "credit": "Pieter Bruegel the Elder, The Tower of Babel (1563), Kunsthistorisches Museum, Vienna; public domain via Wikimedia Commons (Google Art Project)."
        }
      },
      {
        "category": "artistic",
        "title": "Rain, Steam and Speed – The Great Western Railway",
        "excerpt": "Exhibited in 1844 and now in the National Gallery, London, Turner's canvas shows a steam locomotive hurtling across the Maidenhead railway bridge through a storm of rain and light. The painting captures the raw new power source of the industrial age surging into the landscape, blurring machine, weather, and speed into a single elemental force. It stands as one of art's earliest celebrations of a transformative technology diffusing across the world.",
        "source": "J. M. W. Turner (The National Gallery, London)",
        "href": "https://en.wikipedia.org/wiki/Rain,_Steam_and_Speed_%E2%80%93_The_Great_Western_Railway",
        "image": {
          "src": "/covers/nvidia-openai-250-billion-data-center--a5.png",
          "alt": "J. M. W. Turner's 1844 painting Rain, Steam and Speed, showing a steam locomotive crossing a bridge amid swirling rain and golden light.",
          "credit": "J. M. W. Turner, Rain, Steam and Speed – The Great Western Railway (1844), The National Gallery, London; public domain via Wikimedia Commons."
        }
      }
    ],
    "rank": 30
  },
  {
    "slug": "south-korea-yoon-suspended-sentence",
    "headline": "South Korean court gives ousted ex-President Yoon a suspended jail term for violating election law",
    "overview": "A South Korean court handed ousted former President Yoon Suk Yeol a suspended jail term after convicting him of violating election law by making false statements during his campaign. It is the latest legal blow for Yoon, who was removed from office following his short-lived declaration of martial law. The suspended sentence spares him immediate imprisonment on this charge, but he remains entangled in a web of other criminal cases.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMi0AFBVV95cUxPMmxHenlQaks1SXgwdnUtd3VWUzY5RDFwRVlXYzc3ODkxRnEtUXotcjRQM2ZISmdfNml3LXlkd25FSUpWZmdsMGRjaDZ2eHUyY3ZkSU0tcjZQRmFlU01TQnZvOWxaU0gxbzF6bnVrYUl1US03QTVoTzhhbFdQMGw5aW1mRVZlZkNOQ3lmclVxaGxBZG5mNzVOWWhjS0pmOTJpQi1uQThvRW9uRjFZMTRJclRIN2JrVEpIdThPREt5eWhtWlVoWkFZOTRTdzU2Ym9O?oc=5"
      },
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMipgFBVV95cUxPak1sNDFiLUhocTNVdElKWkEzNGpZUWIyVXM3NFVLSS1EdEZzTzQyN1A5SWZsMUhzU2o4NU9Fc1VKRnBzOWJYZ3hGTFo2eDRxQnAxMEFDX1lzbHd2ZDZJZGoxcF85VFFKMVdqZHRGT3VtT3dFWjc3czFUS2s0NUFWMVdXdFhMcVhabUdsdTJnNzJTbGZFUXNrNU9KbjM3VzdlMzVjdzh3?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-27",
    "image": {
      "src": "/covers/south-korea-yoon-suspended-sentence.png",
      "alt": "Ousted former South Korean President Yoon Suk Yeol.",
      "credit": "Office of the President of South Korea, CC BY-SA 3.0, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 27 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Trial and Execution of Charles I (1649)",
        "excerpt": "In January 1649 the parliamentarian High Court of Justice put King Charles I on trial and declared him guilty of attempting to uphold in himself an unlimited and tyrannical power to rule according to his will and to overthrow the rights and liberties of the people. Three days later, on 30 January 1649, he was publicly beheaded outside the Banqueting House on Whitehall. It was an unprecedented reckoning: a reigning monarch, once thought to answer only to God, was summoned before an earthly court and judged like any other subject.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Execution_of_Charles_I"
      },
      {
        "category": "historical",
        "title": "Watergate and the Fall of Richard Nixon (1974)",
        "excerpt": "President Richard Nixon's downfall grew from a criminal conspiracy to conceal White House involvement in the 1972 break-in at the Democratic National Committee headquarters, an elaborate cover-up captured on his own secret tapes. When the Supreme Court ordered the tapes released and impeachment proceedings advanced, the deception at the heart of his presidency was laid bare. Facing near-certain removal, on 9 August 1974 Nixon became the first U.S. president to resign, a modern emblem of a powerful leader undone by his own lies.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Watergate_scandal"
      },
      {
        "category": "literary",
        "title": "Sophocles, Oedipus the King (closing chorus)",
        "excerpt": "Look ye, countrymen and Thebans, this is Oedipus the great, / He who knew the Sphinx's riddle and was mightiest in our state. / Who of all our townsmen gazed not on his fame with envious eyes? / Now, in what a sea of troubles sunk and overwhelmed he lies! / Therefore wait to see life's ending ere thou count one mortal blest; / Wait till free from pain and sorrow he has gained his final rest.",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/files/31/31-h/31-h.htm"
      },
      {
        "category": "literary",
        "title": "The Book of Daniel: Belshazzar and the Writing on the Wall",
        "excerpt": "In the same hour came forth fingers of a man's hand, and wrote over against the candlestick upon the plaister of the wall of the king's palace... And this is the writing that was written, MENE, MENE, TEKEL, UPHARSIN. This is the interpretation of the thing: MENE; God hath numbered thy kingdom, and finished it. TEKEL; Thou art weighed in the balances, and art found wanting. PERES; Thy kingdom is divided, and given to the Medes and Persians.",
        "source": "Wikisource (King James Version)",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Daniel"
      },
      {
        "category": "artistic",
        "title": "Rembrandt, Belshazzar's Feast (c. 1635-1638)",
        "excerpt": "Rembrandt's grand baroque history painting freezes the instant a disembodied hand traces glowing Hebrew letters across the wall of Belshazzar's banquet, prophesying the downfall of his reign. The king wheels around in terror, eyes wide and jewelled robe aglow, wine spilling from an overturned goblet as the feast collapses into dread. Held by the National Gallery in London, it renders in vivid pigment the terrible moment when earthly power is weighed in the balance and found wanting.",
        "source": "Wikipedia / National Gallery, London",
        "href": "https://en.wikipedia.org/wiki/Belshazzar%27s_Feast_(Rembrandt)",
        "image": {
          "src": "/covers/south-korea-yoon-suspended-sentence--a4.png",
          "alt": "Rembrandt's painting Belshazzar's Feast: the startled king recoils from a glowing hand writing on the wall during a banquet.",
          "credit": "Rembrandt, Belshazzar's Feast (c. 1635-1638), National Gallery, London. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Honoré Daumier, Les Gens de Justice (1846)",
        "excerpt": "In his lithograph series Les Gens de Justice, the French caricaturist Honoré Daumier turned a satirical eye on the courtroom and the professionals who staff it, mocking the pomp, vanity and theatre of the law. Robed advocates gesture grandly before the bench in scenes that expose the gap between the machinery of justice and its lofty ideals. Biting yet humane, the series remains a classic image of ordinary human failing dragged before the tribunals of the law.",
        "source": "Wikimedia Commons / The Phillips Collection",
        "href": "https://commons.wikimedia.org/wiki/File:Honor%C3%A9_Daumier_-_Les_Gens_de_Justice-_M._L'Avocat_a_rendu_pleine_Justice..._-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/south-korea-yoon-suspended-sentence--a5.png",
          "alt": "Honoré Daumier lithograph from Les Gens de Justice showing a robed lawyer gesturing dramatically in a French courtroom.",
          "credit": "Honoré Daumier, Les Gens de Justice (1846), lithograph, The Phillips Collection, via Wikimedia Commons (Google Art Project). Public domain."
        }
      }
    ],
    "rank": 31
  },
  {
    "slug": "netanyahu-mamdani-fomenting-hate",
    "headline": "Netanyahu says he will attend the UN General Assembly in New York and accuses Mayor Mamdani of 'fomenting hate'",
    "overview": "Israeli Prime Minister Benjamin Netanyahu said he will attend the UN General Assembly in New York this autumn and accused the city's mayor, Zohran Mamdani, of 'fomenting hate,' brushing off Mamdani's earlier threat to arrest him. Mamdani had walked back the threat, acknowledging he lacked the power to act on an International Criminal Court warrant. Netanyahu, who called the ICC's war-crimes charges 'bogus,' was set to fly to Washington to meet President Trump.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMimAFBVV95cUxPWlBkWVdzTkw5NzJsY1VzR1hRU3VFQXdYT1kyUVdXQVdEUnRfMEtLTHdQR19fdm5zS2pFeGo3ZmlXNXpfWDhDWUtjNGg4SUtBdEdzUm9QelBDSGsxLVR2alBzQy1CMThwMUFscHpoSGQzV3FGSS1HSFFpVXRqcGlxRndWcEVXamh2cm10c2JjeXFfWUFwMmtMNg?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c5yegvd9ddeo"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-27",
    "image": {
      "src": "/covers/netanyahu-mamdani-fomenting-hate.png",
      "alt": "Israeli Prime Minister Benjamin Netanyahu.",
      "credit": "Avi Ohayon, CC BY-SA 3.0, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 27 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Road to Canossa (1077): Emperor Henry IV Before Pope Gregory VII",
        "excerpt": "In January 1077, during the Investiture Controversy, Holy Roman Emperor Henry IV crossed the Alps in the depths of winter to confront the ultimate clash between sovereign power and a higher authority that claimed to judge him. Excommunicated by Pope Gregory VII in 1076, an act that dissolved his subjects' oaths and threatened his throne, Henry stood barefoot in the snow before the gates of Canossa Castle from 25 to 28 January, doing penance until the pope granted absolution. The episode became the enduring symbol of the medieval struggle over who holds final authority: the crowned ruler or the tribunal that presumes to bind him.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Road_to_Canossa"
      },
      {
        "category": "historical",
        "title": "Omar al-Bashir and the ICC: A Sitting Head of State Defies an Arrest Warrant",
        "excerpt": "On 4 March 2009 the International Criminal Court issued an arrest warrant for Sudanese President Omar al-Bashir on five counts of crimes against humanity and two of war crimes in Darfur, and on 12 July 2010 a second warrant added three counts of genocide. He was the first sitting head of state ever indicted by the ICC. Denouncing the charges and the court's jurisdiction, al-Bashir defied the warrants for a decade, traveling openly to China, India, Russia, Saudi Arabia and other states that declined to arrest him, until he was removed from power in April 2019.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Omar_al-Bashir"
      },
      {
        "category": "literary",
        "title": "Sophocles, Antigone: The Unwritten Laws Against a King's Edict",
        "excerpt": "Yes, since it was not Zeus that published me that edict, and since not of that kind are the laws which Justice who dwells with the gods below established among men. Nor did I think that your decrees were of such force, that a mortal could override the unwritten and unfailing statutes given us by the gods.",
        "source": "Perseus Digital Library (Sir Richard Jebb translation)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0186:card=441"
      },
      {
        "category": "literary",
        "title": "Plato, Apology: Socrates Answers the City That Would Silence Him",
        "excerpt": "Men of Athens, I honour and love you; but I shall obey God rather than you, and while I have life and strength I shall never cease from the practice and teaching of philosophy.",
        "source": "Project Gutenberg (Benjamin Jowett translation)",
        "href": "https://www.gutenberg.org/files/1656/1656-h/1656-h.htm"
      },
      {
        "category": "artistic",
        "title": "Jacques-Louis David, The Death of Socrates (1787)",
        "excerpt": "Jacques-Louis David's neoclassical masterpiece portrays the philosopher's final moments after Athens condemned him to death. Composed and unbroken, Socrates reaches for the cup of hemlock while raising his other hand toward the heavens, still teaching as his grieving disciples recoil around him. The painting became an emblem of the individual conscience standing firm against the judgment of the state, defiant even in the face of the city's ultimate power.",
        "source": "The Metropolitan Museum of Art",
        "href": "https://www.metmuseum.org/art/collection/search/436105",
        "image": {
          "src": "/covers/netanyahu-mamdani-fomenting-hate--a4.png",
          "alt": "Neoclassical painting of Socrates seated on a bed, reaching for a cup of hemlock while gesturing upward, surrounded by mournful disciples.",
          "credit": "Jacques-Louis David, The Death of Socrates (1787), Metropolitan Museum of Art, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Defendants in the Dock at the Nuremberg Trials (1945-1946)",
        "excerpt": "This U.S. Army photograph captures the defendants seated in the dock before the International Military Tribunal at Nuremberg, where twenty-two Nazi leaders faced charges of crimes against peace, war crimes and crimes against humanity from 1945 to 1946. By holding individuals rather than states accountable, the tribunal established that even a nation's most powerful leaders could be judged under international law. The image marks the birth of modern international criminal justice, the framework whose descendants, from the ICTY to the ICC, still summon heads of state to answer for their acts.",
        "source": "Wikimedia Commons / U.S. Army photograph",
        "href": "https://en.wikipedia.org/wiki/Nuremberg_trials",
        "image": {
          "src": "/covers/netanyahu-mamdani-fomenting-hate--a5.png",
          "alt": "Black-and-white photograph of Nazi defendants seated in two rows in the wooden dock of the Nuremberg courtroom, guarded by military police.",
          "credit": "U.S. Army photograph, Nuremberg trials (1945-1946), via Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 32
  },
  {
    "slug": "india-gen-z-protests-minister-resigns",
    "headline": "India's education minister resigns after a week of Gen Z protests, and Modi orders a panel to overhaul the exam system",
    "overview": "India's education minister, Dharmendra Pradhan, resigned after more than a week of intense, youth-led street protests, a rare concession in Prime Minister Narendra Modi's 12 years in power. Prime Minister Modi announced a panel to overhaul the country's examination system, which protesters blamed for leaks and mismanagement. Demonstrators hailed the resignation as a landmark victory for India's Gen Z movement.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMivAFBVV95cUxOcy1JNkwzMWZ2X3RfaHVkSnprMnZrc2I4YURrNUZhZjR1cVhMenladFdYTXViUGU1V09Ec3dHUEotVEZURWhDdWVaV3FNalBROW9LSGNYZzFRS2RGRjFLNGxTYWhDdE5rME5KNU1VTWRPQ1lyQnNILTMxamZKalk1YmVZVjM3aWhlZm9UcTU4Rm45NUgyY3ViS0ZXS1FuR294N1BaX1Y3U3FKYTdNVGRYd1lTeUNoNS1NUTl4Ng?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c8dng1v72lno"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-27",
    "image": {
      "src": "/covers/india-gen-z-protests-minister-resigns.png",
      "alt": "Dharmendra Pradhan, India's education minister, who resigned amid the protests.",
      "credit": "Ministry of Education (India), GODL-India, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 27 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The imperial examination and its recurring fraud scandals",
        "excerpt": "For roughly thirteen centuries the imperial examinations were China's ladder of advancement, promising that any man who mastered the Confucian classics could rise to office on merit rather than birth. But the system was repeatedly rocked by fraud: in the 1711 Jiangnan provincial examination at Yangzhou, sons of wealthy salt-merchant families were found to have bought their passes, and rejected candidates protested against the rigged result. The chief examiner was convicted and put to death, one of many scandals over bribery and leaked questions that eroded faith in the exams before they were abolished in 1905.",
        "source": "Wikipedia — Imperial examination",
        "href": "https://en.wikipedia.org/wiki/Imperial_examination"
      },
      {
        "category": "historical",
        "title": "The 1976 Soweto uprising over schooling",
        "excerpt": "On 16 June 1976, thousands of Black schoolchildren in Soweto marched to protest a government decree forcing them to be taught in Afrikaans, the language they associated with their oppressors. Police opened fire on the students; the official death toll was 176, though many estimates run far higher. The uprising, sparked by a grievance over education itself, became a turning point that galvanized resistance to apartheid across South Africa and drew international condemnation on the regime.",
        "source": "Wikipedia — Soweto uprising",
        "href": "https://en.wikipedia.org/wiki/Soweto_uprising"
      },
      {
        "category": "literary",
        "title": "The students at the barricade in Les Misérables",
        "excerpt": "Equality has an organ: gratuitous and obligatory instruction. The right to the alphabet, that is where the beginning must be made. The primary school imposed on all, the secondary school offered to all, that is the law. From an identical school, an identical society will spring. Yes, instruction! light! light! everything comes from light, and to it everything returns.",
        "source": "Victor Hugo, Les Misérables (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/135/pg135.txt"
      },
      {
        "category": "literary",
        "title": "Wu Jingzi's The Scholars and the madness of the exam",
        "excerpt": "Wu Jingzi's mid-eighteenth-century satirical novel skewers the obsession with the imperial examinations that consumed Qing-era society. Its most famous figure, the aging scholar Fan Jin, faints and goes temporarily mad with joy upon finally passing the provincial exam after decades of humiliating failure and poverty. Through such episodes the novel exposes how a supposedly meritocratic system warped scholars' minds and corrupted the pursuit of learning into a desperate scramble for status.",
        "source": "Wikipedia — The Scholars (Wu Jingzi)",
        "href": "https://en.wikipedia.org/wiki/The_Scholars_(novel)"
      },
      {
        "category": "artistic",
        "title": "Delacroix, Liberty Leading the People (1830)",
        "excerpt": "Painted in 1830 to commemorate the July Revolution that toppled King Charles X, Delacroix's great canvas shows Liberty personified as a striding woman, the tricolor flag in one hand and a musket in the other, advancing over the barricade. Behind her surge fighters of every class — a top-hatted bourgeois, a boy brandishing pistols, a worker with a saber — united in revolt. Hanging in the Louvre, it became the enduring emblem of a people rising to overthrow an unjust ruler.",
        "source": "Musée du Louvre / Wikipedia — Liberty Leading the People",
        "href": "https://en.wikipedia.org/wiki/Liberty_Leading_the_People",
        "image": {
          "src": "/covers/india-gen-z-protests-minister-resigns--a4.png",
          "alt": "Allegorical figure of Liberty holding the French tricolor and a musket, leading armed revolutionaries forward over a barricade strewn with the fallen.",
          "credit": "Eugène Delacroix, 'Liberty Leading the People' (1830), Musée du Louvre, Paris; via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "artistic",
        "title": "A depiction of the Song-dynasty imperial examination",
        "excerpt": "This classical illustration depicts candidates undergoing the imperial civil-service examination during the Song dynasty, the gruelling test that for centuries decided who would enter China's ruling bureaucracy. Row upon row of scholars labour under the watchful eyes of officials, their futures hinging on a single ordeal of memorized classics and brush-written essays. The scene captures the enormous weight the examination placed on the young — the same pressure that, once a system of advancement is seen as rigged, can turn hope into fury.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Song_Imperial_Examination.JPG",
        "image": {
          "src": "/covers/india-gen-z-protests-minister-resigns--a5.png",
          "alt": "Classical Chinese painting showing rows of scholars seated at desks taking the imperial examination under the supervision of officials.",
          "credit": "Illustration of a Song-dynasty imperial examination, from 'Recueil Historique des Principaux Traits de la Vie des Empereurs Chinois'; via Wikimedia Commons (public domain)."
        }
      }
    ],
    "rank": 33
  },
  {
    "slug": "myanmar-military-civilian-killings",
    "headline": "Myanmar's military is escalating civilian killings amid a diplomatic push, a monitoring group warns",
    "overview": "Myanmar's military has escalated its killing of civilians even as it pursues a diplomatic push to gain international legitimacy, a conflict-monitoring group warned. The report documented a rise in air strikes and repression following a shake-up in the junta's leadership. Rights groups say the ruling generals are intensifying attacks on opponents while presenting a softer face abroad.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMizwFBVV95cUxPaThsSkwwSnVzdzd2NmNsUU90OFBlbjFYTkpqdmxzbVF6R1lBMkhDRnItZkZXemRhc0h4WVJWU043Z1hmb0RDV1NhcUN0UDRGYlVYN2VxU1JBdUQ0OEpmUEItclJjbGs2c1pPMk0zbmJ3R1pHbFdwbE9jNE96NGRiUE43QlF1WlQtWmNUbFFJbUliWS1ELUxpeFhOMTBLQ1VISUNvYVFtYnY5b1BWbGxXelppTE5MaEQ1aVRKRE9SVlRfbWdfWndNbEJoRmR4RjA?oc=5"
      },
      {
        "name": "NBC News",
        "href": "https://news.google.com/rss/articles/CBMipwFBVV95cUxNRHVZNzRHcHBxS1lMRmxyaW1FQlZBWWJqMC1GZlllbDVVcXpaZG5mZldLWVpmSGtuX3dVNXM2bjkyY3oyVDgzU2I5M20yTmFzSnJLc0J4Z0pZbXVDRDE0amlVcFVya256RHV0eng4YVlXdzJzcHRvcFNDbUstSW0yZ1UyWlV0RlpHQ3BUa21nS0hfU0VScWJpT3dzVm5nVkRjQTB4c19JTQ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-27",
    "image": {
      "src": "/covers/myanmar-military-civilian-killings.png",
      "alt": "Demonstrators rallying against Myanmar's military rule.",
      "credit": "VOA Burmese; public domain, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 27 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Sharpeville Massacre",
        "excerpt": "On 21 March 1960, some 5,000 unarmed protesters gathered at the police station in Sharpeville township to demonstrate against apartheid pass laws. Police opened fire without warning, killing at least 69 people and wounding more than 180, many shot in the back as they fled. The apartheid government responded not with reform but with a state of emergency, mass detentions, and the banning of the ANC and PAC, even as it faced mounting condemnation abroad and UN Security Council Resolution 134.",
        "source": "Sharpeville massacre (Wikipedia)",
        "href": "https://en.wikipedia.org/wiki/Sharpeville_massacre"
      },
      {
        "category": "historical",
        "title": "The Thirty Tyrants of Athens",
        "excerpt": "After Athens fell to Sparta in 404 BC, an oligarchy of thirty men led by Critias seized power and turned it into a reign of terror. Ancient sources record that the Thirty executed some 1,500 people without trial, roughly five percent of the city's population, confiscating the property of the wealthy and the dissenting alike. Their rule lasted barely eight months before democratic exiles under Thrasybulus overthrew them at the Battle of Munychia, where Critias himself was killed.",
        "source": "Thirty Tyrants (Wikipedia)",
        "href": "https://en.wikipedia.org/wiki/Thirty_Tyrants"
      },
      {
        "category": "literary",
        "title": "The Book of Lamentations",
        "excerpt": "How doth the city sit solitary, that was full of people! how is she become as a widow! ... The young and the old lie on the ground in the streets: my virgins and my young men are fallen by the sword;",
        "source": "Lamentations, King James Version (Wikisource)",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Lamentations"
      },
      {
        "category": "literary",
        "title": "Tacitus on the Birth of Despotism",
        "excerpt": "Meanwhile at Rome people plunged into slavery--consuls, senators, knights.",
        "source": "Tacitus, The Annals, Book I (Wikisource)",
        "href": "https://en.wikisource.org/wiki/The_Annals_(Tacitus)/Book_1"
      },
      {
        "category": "artistic",
        "title": "The Third of May 1808",
        "excerpt": "Francisco de Goya painted The Third of May 1808 in 1814 to commemorate the summary execution of Madrid civilians by Napoleon's soldiers after an uprising the previous day. A faceless firing squad, rendered as a single anonymous machine of the state, aims its rifles at a terrified group of unarmed men; at the center a figure in a white shirt throws his arms wide in a pose echoing crucifixion, illuminated by a stark lantern. The ground is already strewn with the bloodied dead, an unflinching indictment of a military that kills the defenceless.",
        "source": "Francisco de Goya, The Third of May 1808 (Museo del Prado)",
        "href": "https://en.wikipedia.org/wiki/The_Third_of_May_1808",
        "image": {
          "src": "/covers/myanmar-military-civilian-killings--a4.png",
          "alt": "Goya's painting The Third of May 1808 showing a firing squad of soldiers executing civilians at night by lantern light",
          "credit": "Francisco de Goya, The Third of May 1808 (1814), Museo del Prado, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Nie wieder Krieg (Never Again War)",
        "excerpt": "Käthe Kollwitz, who lost her son Peter in the First World War, turned her printmaking into an unflinching witness to the suffering of ordinary people under militarism. Her 1924 poster Nie wieder Krieg (Never Again War) shows a young figure with hand raised in an oath against war, while her woodcut cycle War (1922-23) rendered grieving mothers, widows, and the bereaved in stark black and white. Working until her death in 1945, she gave enduring form to the civilian cost of state violence.",
        "source": "Käthe Kollwitz, Nie wieder Krieg (Wikipedia)",
        "href": "https://en.wikipedia.org/wiki/K%C3%A4the_Kollwitz",
        "image": {
          "src": "/covers/myanmar-military-civilian-killings--a5.png",
          "alt": "Käthe Kollwitz's 1924 poster Nie wieder Krieg (Never Again War) showing a youth with raised hand swearing against war",
          "credit": "Käthe Kollwitz, Nie wieder Krieg (1924), via Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 34
  },
  {
    "slug": "odyssey-nolan-leak",
    "headline": "A full copy of Christopher Nolan's 'The Odyssey' leaks on X, drawing 2.1 million views before removal",
    "overview": "A high-quality copy of Christopher Nolan's forthcoming epic 'The Odyssey' leaked on X, where a single post reportedly drew 2.1 million views in about two and a half hours before the account was suspended. Universal Pictures scrambled to issue takedown notices for the film, which Nolan shot entirely on IMAX 70mm and wants audiences to see on the largest screens possible. The starry adaptation of Homer's poem features Matt Damon and Zendaya.",
    "genre": "Culture",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c1m1ev5j3m2o"
      },
      {
        "name": "The Hollywood Reporter",
        "href": "https://news.google.com/rss/articles/CBMitgFBVV95cUxOQ0Rwc0IzLUxpcHk1NUhlcmNrQlJOYlctb01FWDlNZUh5SzB4NVo0d3A3TDZfLTVqLURQSTkxMENzYlZnMlRqbTZCeVAtTEVNS0lfYWVIa1VsMW83SDhzd3lUanNqU2lLZWpiOVJBSzB1cFNJaWRxZGtuZGUwb0lHV0Z4LWV3QlZXT2dSWVExVzg1bkxrOC1EUkpQTDNNZkdjLXNDZGhNbUh0NktIdGJkdmFTdGlqUQ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-27",
    "image": {
      "src": "/covers/odyssey-nolan-leak.png",
      "alt": "Director Christopher Nolan, whose film 'The Odyssey' leaked online.",
      "credit": "Georges Biard, CC BY-SA 4.0, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 27 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Statute of Anne (1710): the first copyright law",
        "excerpt": "Whereas printers, booksellers, and other persons have of late frequently taken the liberty of printing, reprinting, and publishing, or causing to be printed, reprinted, and published, books and other writings, without the consent of the authors or proprietors of such books and writings, to their very great detriment, and too often to the ruin of them and their families.",
        "source": "The Statute of Anne, 1710 (Avalon Project, Yale Law School)",
        "href": "https://avalon.law.yale.edu/18th_century/anne_1710.asp"
      },
      {
        "category": "historical",
        "title": "The Gutenberg Bible (c. 1455): mass reproduction breaks the scribal monopoly",
        "excerpt": "Around 1454-1455 in Mainz, Johannes Gutenberg printed the earliest major book in Europe made with mass-produced metal movable type. Between 160 and 185 copies were produced, most on paper and the rest on vellum. The achievement inaugurated what historians call the Gutenberg Revolution, shattering the scribal monopoly on reproducing texts and laying the technological foundation for mass book production. What one workshop could now copy mechanically, no guild of copyists could any longer control.",
        "source": "Gutenberg Bible (Wikipedia)",
        "href": "https://en.wikipedia.org/wiki/Gutenberg_Bible"
      },
      {
        "category": "literary",
        "title": "Homer's Odyssey, Book XXII: Odysseus finally unmasked",
        "excerpt": "Then Ulysses tore off his rags, and sprang on to the broad pavement with his bow and his quiver full of arrows. He shed the arrows on to the ground at his feet and said, \"The mighty contest is at an end.\" ... But Ulysses glared at them and said: \"Dogs, did you think that I should not come back from Troy? You have wasted my substance, have forced my women servants to lie with you, and have wooed my wife while I was still living. You have feared neither God nor man, and now you shall die.\"",
        "source": "Homer, The Odyssey, trans. Samuel Butler (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/1727/pg1727.txt"
      },
      {
        "category": "literary",
        "title": "Hesiod, Works and Days: Pandora lifts the lid on what cannot be recalled",
        "excerpt": "But the woman took off the great lid of the jar with her hands and scattered all these and her thought caused sorrow and mischief to men. Only Hope remained there in an unbreakable home within under the rim of the great jar, and did not fly out at the door; for ere that, the lid of the jar stopped her, by the will of Aegis-holding Zeus who gathers the clouds. But the rest, countless plagues, wander amongst men; for earth is full of evils and the sea is full.",
        "source": "Hesiod, Works and Days, trans. Hugh G. Evelyn-White (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/348/pg348.txt"
      },
      {
        "category": "artistic",
        "title": "J.W. Waterhouse, 'Ulysses and the Sirens' (1891)",
        "excerpt": "John William Waterhouse's 1891 oil on canvas, held at the National Gallery of Victoria in Melbourne, shows Odysseus lashed to the mast as his ship threads the strait of the Sirens. Breaking with the Victorian expectation of mermaid-like nymphs, Waterhouse painted the Sirens as menacing half-bird, half-woman creatures swarming the vessel, a choice critics tied to the way Sirens appear on classical Greek vases. The painting captures the exact tension of a forbidden lure that must be heard yet resisted, the hero straining toward a song meant to be his ruin.",
        "source": "Ulysses and the Sirens (Waterhouse) — Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Ulysses_and_the_Sirens_(Waterhouse)",
        "image": {
          "src": "/covers/odyssey-nolan-leak--a4.png",
          "alt": "Oil painting of Odysseus bound to the mast of his ship as bird-bodied Sirens with women's heads swoop around the crew at sea.",
          "credit": "John William Waterhouse, 'Ulysses and the Sirens' (1891), National Gallery of Victoria, Melbourne. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "The Siren Vase (c. 480-470 BC): the ancient image of Odysseus and the Sirens",
        "excerpt": "This Attic red-figure stamnos, attributed to the anonymous Siren Painter and made around 480-470 BC, is one of the most famous surviving images of the Odyssey. It shows Odysseus bound to the mast of his ship as it passes the Sirens, one of whom plunges headfirst toward the deck, while his oarsmen row on with wax-stopped ears. Held in the British Museum, the vase reproduced Homer's scene for audiences centuries before print, image, or film, an early act of copying a coveted story onto a portable object.",
        "source": "The Siren Painter, Siren Vase, British Museum (via Wikimedia Commons)",
        "href": "https://en.wikipedia.org/wiki/Siren_Painter",
        "image": {
          "src": "/covers/odyssey-nolan-leak--a5.png",
          "alt": "Ancient Greek red-figure vase showing Odysseus tied to the mast of his ship while bird-bodied Sirens fly overhead, one diving toward the sea.",
          "credit": "The Siren Painter, 'Siren Vase', Attic red-figure stamnos, c. 480-470 BC, British Museum (E440). Photo via Wikimedia Commons."
        }
      }
    ],
    "rank": 35
  },
  {
    "slug": "rshp-one-shanghai-tower",
    "headline": "RSHP unveils One Shanghai, a 186-metre tripartite tower shaped by the city's historical laneways",
    "overview": "British architecture studio RSHP (Rogers Stirk Harbour + Partners) unveiled One Shanghai, a 186-metre, 38-storey mixed-use tower in the city's Jing'an District whose form was shaped by Shanghai's historical laneways. The tower rises as three distinct vertical volumes above the preserved Shikumen villas of the adjacent Zhang Garden, with sky gardens on its upper floors offering panoramic views. The 89,000-square-metre scheme layers office, retail and public space over the low-rise heritage quarter.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Dezeen",
        "href": "https://www.dezeen.com/2026/07/27/rshps-one-shanghai-tower/"
      },
      {
        "name": "Dezeen (via Google News)",
        "href": "https://news.google.com/rss/articles/CBMia0FVX3lxTFBySEJJUUNHYVMyUmtWVzBid1NzdXlBQk43djFoUllaQWlmWnpfUWZzWU15cVkyRnFLMVFUSUdOcUJDOUFGTXF3SXYzYlFxVlowbjhzZkZwV2stQ3V5cUNmQ1NudllRRHdwejNv?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-27",
    "image": {
      "src": "/covers/rshp-one-shanghai-tower.png",
      "alt": "A historic Shikumen laneway in Shanghai, the kind of urban grain that shaped RSHP's tower.",
      "credit": "Livelikerw, CC BY-SA 3.0, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 27 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The tower race of San Gimignano",
        "excerpt": "In the Tuscan hill town of San Gimignano, patrician families of the 12th and 13th centuries competed to raise ever-taller stone tower-houses, each one a declaration of wealth and clan prestige rising above the tight medieval streets. As many as seventy-two once bristled over the town, and municipal law eventually forbade any private tower from overtopping the one on the communal palace. Fourteen survive today, giving the small town its famous skyline and its nickname, the medieval Manhattan.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/San_Gimignano",
        "image": {
          "src": "/covers/rshp-one-shanghai-tower--a0.png",
          "alt": "The surviving medieval stone towers of San Gimignano rising above the town's rooftops",
          "credit": "San Gimignano towers, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "The Woolworth Building, Cathedral of Commerce",
        "excerpt": "Completed in 1913 in Lower Manhattan, Cass Gilbert's Woolworth Building soared to 241 metres and reigned as the tallest building in the world until 1930. Its terracotta Gothic ornament, flying buttresses and pinnacles borrowed the language of medieval cathedrals to dignify a new commercial age, earning it the epithet Cathedral of Commerce. The tower announced that modern skyscrapers could carry cultural aspiration and civic symbolism, not merely rentable floor space, as they rose above the older city fabric.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Woolworth_Building",
        "image": {
          "src": "/covers/rshp-one-shanghai-tower--a1.png",
          "alt": "The Woolworth Building towering over Lower Manhattan in 1913",
          "credit": "Woolworth Building, New York, 1913, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "The Tower of Babel (Genesis 11)",
        "excerpt": "And they said, Go to, let us build us a city and a tower, whose top may reach unto heaven; and let us make us a name, lest we be scattered abroad upon the face of the whole earth.",
        "source": "King James Bible, Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/10/pg10.txt",
        "image": {
          "src": "/covers/rshp-one-shanghai-tower--a2.png",
          "alt": "Pieter Bruegel the Elder's painting of the vast, spiralling Tower of Babel under construction",
          "credit": "Pieter Bruegel the Elder, The Tower of Babel (1563), Kunsthistorisches Museum Vienna, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Baudelaire, Le Cygne (The Swan)",
        "excerpt": "Le vieux Paris n’est plus (la forme d’une ville / Change plus vite, hélas ! que le cœur d’un mortel) ;",
        "source": "Les Fleurs du mal (1861), Wikisource",
        "href": "https://fr.wikisource.org/wiki/Les_Fleurs_du_mal_(1861)/Le_Cygne"
      },
      {
        "category": "artistic",
        "title": "Along the River During the Qingming Festival",
        "excerpt": "This celebrated Chinese handscroll unrolls a panoramic, block-by-block portrait of city life, tracing a river from quiet countryside into the dense, teeming streets of a walled town. Hundreds of tiny figures cross bridges, crowd shopfronts and haul goods, capturing the fine urban grain of markets, homes and lanes in extraordinary detail. The much-copied Qing court version pictured here re-imagined the scroll's continuous city fabric for an eighteenth-century audience.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Along_the_River_During_the_Qingming_Festival",
        "image": {
          "src": "/covers/rshp-one-shanghai-tower--a4.png",
          "alt": "Detail of the Qing court handscroll showing crowded streets, bridges and shops of a bustling city",
          "credit": "Along the River During the Qingming Festival (Qing Court Version), Palace Museum, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Caillebotte, Paris Street; Rainy Day",
        "excerpt": "Gustave Caillebotte's monumental 1877 canvas depicts a broad, freshly cut intersection of Baron Haussmann's rebuilt Paris, its pale stone buildings and wide boulevards gleaming under rain. Well-dressed pedestrians with umbrellas glide through a modern cityscape of sharp perspectives and cool grey light, embodying the new bourgeois metropolis. Now a signature work at the Art Institute of Chicago, it captures the moment an old city was remade into a modern one.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Paris_Street;_Rainy_Day",
        "image": {
          "src": "/covers/rshp-one-shanghai-tower--a5.png",
          "alt": "Gustave Caillebotte's painting of umbrella-carrying pedestrians on a wide, rainy Haussmann-era Paris boulevard",
          "credit": "Gustave Caillebotte, Paris Street; Rainy Day (1877), Art Institute of Chicago, via Wikimedia Commons"
        }
      }
    ],
    "rank": 36
  },
  {
    "slug": "totalenergies-climate-appeal",
    "headline": "TotalEnergies will appeal a French court ruling ordering it to adapt its business to climate change",
    "overview": "TotalEnergies said it will appeal a landmark French court ruling that ordered the oil-and-gas giant to bring its business strategy into line with the fight against climate change. The decision was one of the first to require a major energy company to adapt its overall operations to climate goals. Total argued the ruling misread the law, setting up a closely watched legal fight over corporate climate responsibility.",
    "genre": "Climate",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMixwFBVV95cUxQSUgwcFB5U1RhSXlrYTBLMldmcV9WUjEtTEZiRXJ2V1ROekxOd2l3RzVJYWZXQWxuMjZhcUhyT0s0SDdHVkxsVEc3YU9RMmVmSGdMV2tqNWtGbVlVb0otRHNfZ05mTWVqVTB2ZFVHTUdhdjhxekpyYXBoaFhEck95N2xjV3pmd1lLQWNuWFlsd0Vtamt3QTFqSjRoVlFrbDYtSzNJbHBna0l5TEdjV2o5eE0ycmk4R1NreHRta3hSSXlaLXVlbXdn?oc=5"
      },
      {
        "name": "Yahoo Finance",
        "href": "https://news.google.com/rss/articles/CBMilgFBVV95cUxQaGUzeDl3LVZBT2gtTWZoSkppa2U0TlNHM2IxZ2FmcXBIM2hpbWJsa1pQQWlHMlNWeVZIRGNPaDFUM08xMjMwUFg3OXpoTmE0TXI1RlJpVXBjazRWeGdXX1FsenIxUzFUY0pFVkZlYkE1QU9Ga2VjYlNSVTF2cnlFelJkbmU4WXpzcy1Eck8tb19zZmdVM1E?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-27",
    "image": {
      "src": "/covers/totalenergies-climate-appeal.png",
      "alt": "The entrance to a Total (TotalEnergies) oil refinery.",
      "credit": "Steve Fareham, CC BY-SA 2.0, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 27 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Supreme Court breakup of Standard Oil (1911)",
        "excerpt": "On May 15, 1911, the U.S. Supreme Court declared Standard Oil an unreasonable monopoly under the Sherman Antitrust Act and ordered the oil empire dissolved into some three dozen independent companies. The court found the trust had crushed rivals through railroad rebates, pipeline abuses, and predatory local price-cutting. It was one of the first times a court compelled a dominant energy company to remake its very structure - and the two largest fragments would grow into Exxon and Mobil.",
        "source": "Standard Oil Co. of New Jersey v. United States, U.S. Supreme Court",
        "href": "https://en.wikipedia.org/wiki/Standard_Oil"
      },
      {
        "category": "historical",
        "title": "The Great Smog of London and the Clean Air Act (1952)",
        "excerpt": "For five days in December 1952, an anticyclone trapped the smoke of countless coal fires over London, blanketing the capital in a lethal yellow fog that killed an estimated 4,000 people at the time - later research put the toll near 12,000 - and sickened roughly 100,000 more. The catastrophe forced a reckoning between industry, domestic fuel-burning, and public health, prompting the landmark Clean Air Act 1956. It stands as a founding moment in the legal recognition that polluters can be compelled by the state to change how they operate.",
        "source": "The Great Smog of London, December 1952",
        "href": "https://en.wikipedia.org/wiki/Great_Smog_of_London"
      },
      {
        "category": "literary",
        "title": "The Goose That Laid the Golden Eggs",
        "excerpt": "A Man and his Wife had the good fortune to possess a Goose which laid a Golden Egg every day. Lucky though they were, they soon began to think they were not getting rich fast enough, and, imagining the bird must be made of gold inside, they decided to kill it in order to secure the whole store of precious metal at once. But when they cut it open they found it was just like any other goose. Thus, they neither got rich all at once, as they had hoped, nor enjoyed any longer the daily addition to their wealth. Much wants more and loses all.",
        "source": "Aesop's Fables, trans. V. S. Vernon Jones",
        "href": "https://www.gutenberg.org/files/11339/11339-h/11339-h.htm"
      },
      {
        "category": "literary",
        "title": "The Flood: judgment upon a corrupted earth (Genesis 6-7)",
        "excerpt": "The earth also was corrupt before God, and the earth was filled with violence. And God looked upon the earth, and, behold, it was corrupt; for all flesh had corrupted his way upon the earth. And God said unto Noah, The end of all flesh is come before me; for the earth is filled with violence through them; and, behold, I will destroy them with the earth. For yet seven days, and I will cause it to rain upon the earth forty days and forty nights.",
        "source": "The Book of Genesis, King James Version",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Genesis"
      },
      {
        "category": "artistic",
        "title": "The Fighting Temeraire (1839)",
        "excerpt": "Turner's celebrated canvas shows the ghostly white warship Temeraire, a hero of Trafalgar, being towed by a squat, black, steam-belching tug to be broken up for scrap beneath a blazing sunset. The painting is read as an elegy for a passing age, overtaken by the smoke and iron of the industrial era. Its collision of fragile beauty and grimy new power makes it an enduring emblem of nature and tradition yielding to industry.",
        "source": "J. M. W. Turner, The National Gallery, London",
        "href": "https://www.nationalgallery.org.uk/paintings/joseph-mallord-william-turner-the-fighting-temeraire",
        "image": {
          "src": "/covers/totalenergies-climate-appeal--a4.png",
          "alt": "A pale, ghostly sailing warship towed by a dark steam tug across a river beneath a fiery sunset",
          "credit": "J. M. W. Turner, The Fighting Temeraire (1839), The National Gallery, London, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "The Houses of Parliament (Effect of Fog) (1903-04)",
        "excerpt": "Painted from a window overlooking the Thames, Monet's canvas dissolves the Gothic towers of Westminster into a haze of coal-smoke and river fog, the sun a smeared disk behind the murk. It belongs to a series in which the artist obsessively recorded London's polluted atmosphere, finding strange beauty in the industrial smog that shrouded the seat of power. The painting turns the byproduct of an energy-hungry age into an image of a city half-erased by its own emissions.",
        "source": "Claude Monet, The Metropolitan Museum of Art",
        "href": "https://www.metmuseum.org/art/collection/search/437115",
        "image": {
          "src": "/covers/totalenergies-climate-appeal--a5.png",
          "alt": "The towers of the Houses of Parliament dissolving into thick blue-grey fog above the Thames",
          "credit": "Claude Monet, The Houses of Parliament (Effect of Fog) (1903-04), The Metropolitan Museum of Art, via Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 37
  },
  {
    "slug": "indonesia-central-bank-governor-steps-down",
    "headline": "Bank Indonesia Governor Perry Warjiyo steps down in a surprise move",
    "overview": "Bank Indonesia Governor Perry Warjiyo has stepped down in a surprise move, ending his tenure at the helm of the central bank of Southeast Asia's largest economy. His abrupt departure unsettled analysts and raised questions over the direction of monetary policy and the rupiah. Attention now turns to his successor and whether policy continuity will hold.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiuwFBVV95cUxPZmRYdXF5Ti13MVMxdDBDLU41eUtfcGs5cTRLbzVYVkFjdGRBSGxIWEVOZS1EaDNMRV9VVEM1QW5TMEZXdEFPYkJkeWRGZ2xhZXFnSm92amF0cjdnSVVNc0dzX1o4MS1Uc2Y1QU9MbU1fQWo5R3BzVjZpT3hVdVJXUG14Y2lfRllHR1NJcHkxa3RzUDFod09YbjhWdUc3OGJqc2RHRXE2Y1BWSi1rTlM0ZzUwcEEzM3NlVlBv?oc=5"
      },
      {
        "name": "Reuters (analysts)",
        "href": "https://news.google.com/rss/articles/CBMiwgFBVV95cUxNYWZ1X3c3TzVhYXhMZUdpQmVzTmJ6ck5leWxIZnpsektLWmk0MEQ3bk9nbXpTcXNuQkVyUXd1WkpxSzUtd0pORkJxd0hYM205cDhDQ2hHNFdldUJBU01QcnhuQzQ1NVZxb3VlSUFoekkyZkRZU3k2N0RvSWlFSlFMeTFIZ1pJX1VsWFltUDdHSGluUW9tdGhtck9NSEhPSHh4T2JQTHFjcnpJLWZZSmlPMGtvMFQ1YjlWN3J6SUoyenhBZw?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-27",
    "image": {
      "src": "/covers/indonesia-central-bank-governor-steps-down.png",
      "alt": "The historic Bank Indonesia building in Jakarta.",
      "credit": "CEphoto, Uwe Aranas, CC BY-SA 3.0, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 27 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Dismissal of Jacques Necker (1789)",
        "excerpt": "On 11 July 1789 King Louis XVI abruptly dismissed Jacques Necker, his immensely popular Director-General of Finances, ordering him to leave France at once. Necker was the guardian of the kingdom's credit, and news of his removal detonated public fury in Paris the very next day. Within two days the threat of counter-revolution had driven citizens to arm themselves and storm the Bastille on 14 July, and the panicked crown recalled Necker in triumph. It remains the classic case of a money-steward's sudden fall shattering public confidence.",
        "source": "Jacques Necker — Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Jacques_Necker"
      },
      {
        "category": "historical",
        "title": "The Abdication of Diocletian (305 AD)",
        "excerpt": "On 1 May 305 AD Diocletian became the first Roman emperor to lay down supreme power voluntarily, stepping aside despite holding office over the whole state. He retired to his palace on the Dalmatian coast at Split, reportedly content to tend his vegetable gardens. But the orderly succession he engineered did not hold: the tetrarchic system collapsed amid the competing dynastic claims of Constantine and Maxentius. His departure is antiquity's great example of a steward relinquishing office and the instability that can follow.",
        "source": "Diocletian — Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Diocletian"
      },
      {
        "category": "literary",
        "title": "The Parable of the Talents",
        "excerpt": "For the kingdom of heaven is as a man travelling into a far country, who called his own servants, and delivered unto them his goods... His lord said unto him, Well done, thou good and faithful servant: thou hast been faithful over a few things, I will make thee ruler over many things: enter thou into the joy of thy lord.",
        "source": "The Gospel of Matthew 25 (King James Version) — Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Matthew"
      },
      {
        "category": "literary",
        "title": "Antonio's Ventures — The Merchant of Venice",
        "excerpt": "Believe me, no. I thank my fortune for it, My ventures are not in one bottom trusted, Nor to one place; nor is my whole estate Upon the fortune of this present year. Therefore my merchandise makes me not sad.",
        "source": "William Shakespeare, The Merchant of Venice (Act I, Scene I) — Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/1515/pg1515.txt"
      },
      {
        "category": "artistic",
        "title": "The Moneylender and His Wife",
        "excerpt": "Quentin Massys's 1514 panel, now in the Louvre, shows a moneylender weighing gold coins on a delicate balance while his wife, distracted from her prayer book, watches the shining metal. The scales, the pearls, and the convex mirror turn a quiet domestic scene into a meditation on value, trust, and the weighing of worldly wealth. It is one of Northern Renaissance art's most enduring images of the keeper of money and the fragile line between honest reckoning and greed.",
        "source": "Quentin Massys (1514), Musée du Louvre",
        "href": "https://en.wikipedia.org/wiki/The_Moneylender_and_His_Wife",
        "image": {
          "src": "/covers/indonesia-central-bank-governor-steps-down--a4.png",
          "alt": "A moneylender weighing gold coins on a balance while his wife looks up from her prayer book, in Quentin Massys's 1514 panel.",
          "credit": "Quentin Massys, 'The Moneylender and His Wife' (1514), Musée du Louvre. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "The Parable of the Rich Fool",
        "excerpt": "In Rembrandt's 1627 panel, an old man sits alone by candlelight amid ledgers and coins, peering closely at a single gold piece he holds up to the flame. The painting illustrates Christ's parable of the rich man who hoarded his wealth only to be told his life would be demanded of him that night. Rembrandt's guttering candle makes the scene a haunting emblem of accumulated money and its sudden vanity when the steward of it is called away.",
        "source": "Rembrandt van Rijn (1627), Gemäldegalerie, Berlin",
        "href": "https://commons.wikimedia.org/wiki/File:Rembrandt_-_The_Parable_of_the_Rich_Fool.jpg",
        "image": {
          "src": "/covers/indonesia-central-bank-governor-steps-down--a5.png",
          "alt": "An old man examines a gold coin by candlelight, surrounded by ledgers and money, in Rembrandt's 1627 painting.",
          "credit": "Rembrandt van Rijn, 'The Parable of the Rich Fool' (1627), Gemäldegalerie, Berlin. Public domain via Wikimedia Commons."
        }
      }
    ],
    "rank": 38
  },
  {
    "slug": "astrazeneca-profit-pipeline",
    "headline": "AstraZeneca beats profit forecasts as oncology and rare-disease drugs ease investor worries over its pipeline",
    "overview": "AstraZeneca reported forecast-beating profit and struck a bullish tone, helping to ease investor concern over the strength of its drug pipeline. Strong sales of the British drugmaker's oncology and rare-disease treatments drove the better-than-expected results, and the company maintained its full-year outlook. The reassuring update helped calm worries about its future medicines.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMi1AFBVV95cUxNYnNMUmJtT0pYWDNuXzNxZjJvVUc1MkZZM1haazV0VURoSzZUMmZIakdjbHhzc28wUy00Wm14V21RSUV2UTZFeVlyMm1QZWxUYkMyZ01FQTFxTkFsWHV0X2xDUnNQeVNxTW5VcndyTEMxd20xb0xFb0Q1a2Rfc1AwcnBjaC1MNWNVRkRKMDROOEUwV1B2WHR3VklWVzBSMDVId1N3TWtyT2MtZDRWdm5HMkZxVEZSNWhJRkN3UFZiRWVsMzV2bDFQUjJJR1ZiNVVXNkdwZQ?oc=5"
      },
      {
        "name": "The Business Times",
        "href": "https://news.google.com/rss/articles/CBMiwgFBVV95cUxNVGQzM1ZBSTFKQk1iN215ZkNCallHY3ZUcEVxeGltWm12V1dkSWREdWt1MWpySFF0T0RyWmlWMXUzNnNNbVdyeXBNWC1MOVRVWFM2WWc4dXBZTm53VTlJVVc2RWVDZkRJZkVqMjlMeTN4aWZuUW5kY3J5ZEFNZXRucU44Y3VYem45UUp4QjB1ZkdDaFpOTmhfODA4cTdaUFcwcTAySThIMmktT1BOOVJWcHlSTDc1RnQ3UExpWHFtcWFhUQ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-27",
    "image": {
      "src": "/covers/astrazeneca-profit-pipeline.png",
      "alt": "AstraZeneca's headquarters in Cambridge, England.",
      "credit": "FDV, CC BY-SA 4.0, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 27 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Edward Jenner and the first smallpox vaccine (1796)",
        "excerpt": "In 1796 the country doctor Edward Jenner tested a folk observation that milkmaids who had caught mild cowpox seemed immune to deadly smallpox. He inoculated eight-year-old James Phipps with matter from a cowpox sore, then exposed the boy to smallpox, which failed to take hold. From the Latin vacca, for cow, Jenner named the technique vaccination, launching the first vaccine and, in time, the only human disease ever eradicated.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Edward_Jenner"
      },
      {
        "category": "historical",
        "title": "Alexander Fleming's discovery of penicillin (1928)",
        "excerpt": "In September 1928, returning to his cluttered laboratory at St Mary's Hospital in London, Alexander Fleming noticed that a stray mould had contaminated a culture plate of Staphylococcus and dissolved the bacterial colonies around it. The mould, a Penicillium, was releasing a substance he named penicillin. His chance observation opened the age of antibiotics, turning once-fatal infections into curable conditions and reshaping the future of medicine.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Alexander_Fleming"
      },
      {
        "category": "literary",
        "title": "The Balm of Gilead (Book of Jeremiah 8:22, KJV)",
        "excerpt": "Is there no balm in Gilead; is there no physician there? why then is not the health of the daughter of my people recovered?",
        "source": "Wikisource (King James Bible)",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Jeremiah"
      },
      {
        "category": "literary",
        "title": "Chaucer's Doctour of Phisyk in The Canterbury Tales",
        "excerpt": "With us ther was a Doctour of Phisyk, In al this world ne was ther noon him lyk To speke of phisik and of surgerye; For he was grounded in astronomye. ... The cause y-knowe, and of his harm the rote, Anon he yaf the seke man his bote. Ful redy hadde he his apothecaries, To sende him drogges and his letuaries, For ech of hem made other for to winne; Hir frendschipe nas nat newe to biginne.",
        "source": "Project Gutenberg (Chaucer's Works, Vol. 4, ed. W. W. Skeat)",
        "href": "https://www.gutenberg.org/ebooks/22120"
      },
      {
        "category": "artistic",
        "title": "The Anatomy Lesson of Dr Nicolaes Tulp (Rembrandt, 1632)",
        "excerpt": "Painted in 1632, Rembrandt's group portrait shows the surgeon Dr Nicolaes Tulp demonstrating the musculature of a cadaver's arm to a circle of Amsterdam physicians, an open anatomical text at the corpse's feet. It celebrates the healer as investigator, dissecting the body to master its hidden workings. One of Rembrandt's early masterpieces, it hangs in the Mauritshuis in The Hague.",
        "source": "Mauritshuis, The Hague",
        "href": "https://en.wikipedia.org/wiki/The_Anatomy_Lesson_of_Dr_Nicolaes_Tulp",
        "image": {
          "src": "/covers/astrazeneca-profit-pipeline--a4.png",
          "alt": "Rembrandt's 1632 painting of Dr Nicolaes Tulp dissecting the arm of a cadaver before a group of attentive surgeons.",
          "credit": "Rembrandt, The Anatomy Lesson of Dr Nicolaes Tulp (1632), Mauritshuis, The Hague, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "The Doctor (Sir Luke Fildes, 1891)",
        "excerpt": "Luke Fildes's 1891 painting shows a doctor keeping vigil at the bedside of a sick child in a humble cottage, watching intently for the fever to break while the anxious parents wait in the shadows. A meditation on the healer's devotion and the limits of medicine, it became one of the most widely reproduced images of the caring physician. The work is held by Tate in London.",
        "source": "Tate, London",
        "href": "https://en.wikipedia.org/wiki/The_Doctor_(painting)",
        "image": {
          "src": "/covers/astrazeneca-profit-pipeline--a5.png",
          "alt": "Luke Fildes's 1891 painting of a physician watching over a sick child lying on chairs in a dim cottage, the worried parents behind him.",
          "credit": "Sir Luke Fildes, The Doctor (1891), Tate, London, via Wikimedia Commons (public domain)"
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
