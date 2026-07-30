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
    "slug": "uefa-concacaf-fifa-boycott",
    "headline": "UEFA's 55 members and Concacaf vote to boycott the World Cup if FIFA sells a 20% stake to private investors",
    "overview": "Football's European confederation UEFA, which represents 55 of FIFA's member associations, and the North and Central American body Concacaf both held emergency meetings on 30 July and agreed to boycott all FIFA competitions, including the men's and women's World Cups, if FIFA proceeds with a plan to sell a 20% stake in a new commercial entity to private investors. Powers such as Germany, France, England and champions Spain branded the proposal, pushed by president Gianni Infantino, \"irresponsible and indefensible.\"",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMiowFBVV95cUxNbUNHcXRDN1RPZVdnVjZqUjVOb0hZUWJFbEt1SW1zQmFPRFB2VlJwNno4eUNmU0M3d3EtSGlGZ3Q3REpFaUZkdHp4YWhRQ0piUkFfYi1jc3RrbjJmdHo3RDY3SG9MX080Q2FMRkRCc0tRMTI3ZXhjXzFEZlA4LTV3NFFBNUh2N09Fb18wRm5mR3l1anJqbHBNaUE5R0d2ZnlfdlAw?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiwgFBVV95cUxNWlV6RGNqbEVZQng1XzlGN1dPcUlscHZaT2c2ZTA2TjhDRFVSa1VQZ1BQUTdLR2NxaHNBNk1CU01rVlFobjMzNzAycWZ3Qk9XRjZaVmk0SDhPWjFWTDh0RmFwTlZYTEFMSWdfekRaNDBONjR2cmdNay1IZHlkZWwySmhJWk5GTklNN05ZclYzYUVQZnVLak1IclJiSERXVUNaNjcxa09LNXFCaWZVM0NWSl9HSHZKQWFTMjRiUVhOTVJYUQ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-30",
    "image": {
      "src": "/covers/uefa-concacaf-fifa-boycott.png",
      "alt": "The gold FIFA World Cup trophy on display",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 30 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The barons compel King John to seal Magna Carta (1215)",
        "excerpt": "No scutage not aid shall be imposed on our kingdom, unless by common counsel of our kingdom, except for ransoming our person, for making our eldest son a knight, and for once marrying our eldest daughter; and for these there shall not be levied more than a reasonable aid.",
        "source": "Magna Carta (1215), clause 12; English translation, The Avalon Project, Yale Law School (from Statutes of the Realm).",
        "href": "https://avalon.law.yale.edu/medieval/magna.asp",
        "image": {
          "src": "/covers/uefa-concacaf-fifa-boycott--a0.png",
          "alt": "The 1215 Magna Carta manuscript, dense Latin text on parchment, British Library Cotton MS Augustus II.106",
          "credit": "British Library, Cotton MS Augustus II.106 (1215); public domain via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "The 1980 Moscow Olympic boycott",
        "excerpt": "Furious at the Soviet invasion of Afghanistan, President Jimmy Carter demanded that the United States and its allies refuse to send athletes to the 1980 Moscow Games unless Soviet troops withdrew. More than sixty nations ultimately stayed home, turning the world's shared festival of sport into an instrument of collective protest and leaving athletes to pay the price for a quarrel among powers. The episode showed how the threat to withhold participation, rather than to compete, can become the loudest political statement a sporting movement can make.",
        "source": "United States Department of State, Office of the Historian, \"The Olympic Boycott, 1980\"; photograph from the National Archives and Records Administration, March 21, 1980.",
        "href": "https://history.state.gov/milestones/1977-1980/olympic-boycott",
        "image": {
          "src": "/covers/uefa-concacaf-fifa-boycott--a1.png",
          "alt": "President Jimmy Carter briefing members of the U.S. Olympic team about the boycott of the 1980 Moscow Summer Games",
          "credit": "National Archives and Records Administration, March 21, 1980; public domain via Wikimedia Commons / DPLA"
        }
      },
      {
        "category": "literary",
        "title": "Jesus drives the money-changers from the Temple",
        "excerpt": "And Jesus went into the temple of God, and cast out all them that sold and bought in the temple, and overthrew the tables of the moneychangers, and the seats of them that sold doves, And said unto them, It is written, My house shall be called the house of prayer; but ye have made it a den of thieves.",
        "source": "The Gospel According to St. Matthew 21:12-13, King James Version (1611).",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Matthew",
        "image": {
          "src": "/covers/uefa-concacaf-fifa-boycott--a2.png",
          "alt": "El Greco's painting of Christ swinging a whip to drive merchants and money-changers out of the temple",
          "credit": "El Greco (Domenikos Theotokopoulos), Christ Driving the Money Changers from the Temple, c.1570, Minneapolis Institute of Art; public domain via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "The ten tribes secede from King Rehoboam",
        "excerpt": "What portion have we in David? neither have we inheritance in the son of Jesse: to your tents, O Israel: now see to thine own house, David. So Israel departed unto their tents.",
        "source": "The First Book of the Kings 12:16, King James Version (1611).",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/1_Kings",
        "image": {
          "src": "/covers/uefa-concacaf-fifa-boycott--a3.png",
          "alt": "Hans Holbein woodcut showing the arrogant King Rehoboam threatening the assembled elders of Israel, who turn away in revolt",
          "credit": "Hans Holbein the Younger, The Arrogance of Rehoboam, c.1530; public domain via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Delacroix, Liberty Leading the People (1830)",
        "excerpt": "Delacroix's great canvas shows a citizenry in open revolt against a sovereign who has overreached, a mixed crowd of workers, bourgeois and boys surging forward over the barricades and the bodies of the fallen. At its center an allegorical Liberty, tricolour in one hand and musket in the other, fuses ordinary rebels into a single unstoppable body. It is the definitive image of a shared cause taken back by its members from a ruler who forgot he governed by their consent.",
        "source": "Eugène Delacroix, Liberty Leading the People (La Liberté guidant le peuple), 1830, oil on canvas, Musée du Louvre, Paris.",
        "href": "https://collections.louvre.fr/en/ark:/53355/cl010065872",
        "image": {
          "src": "/covers/uefa-concacaf-fifa-boycott--a4.png",
          "alt": "Eugène Delacroix's Liberty Leading the People: an allegorical woman raising the French tricolour leads armed revolutionaries over a barricade",
          "credit": "Eugène Delacroix, Liberty Leading the People, 1830, Musée du Louvre; public domain via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Verdi, \"Va, pensiero\" from Nabucco (1842)",
        "excerpt": "Va, pensiero, sull'ali dorate; va, ti posa sui clivi, sui colli,",
        "source": "Giuseppe Verdi, \"Va, pensiero\" (Chorus of the Hebrew Slaves), Act III of Nabucco (1842); libretto by Temistocle Solera.",
        "href": "https://imslp.org/wiki/Nabucco_(Verdi,_Giuseppe)",
        "image": {
          "src": "/covers/uefa-concacaf-fifa-boycott--a5.png",
          "alt": "Giovanni Boldini's 1886 portrait of composer Giuseppe Verdi in top hat and white scarf",
          "credit": "Giovanni Boldini, Portrait of Giuseppe Verdi, 1886, Galleria Nazionale d'Arte Moderna, Rome; public domain via Wikimedia Commons"
        }
      }
    ],
    "lead": true,
    "rank": 1
  },
  {
    "slug": "ceuta-migrants-morocco-military",
    "headline": "Spain deploys the military in Ceuta as hundreds of migrants swim from Morocco into the enclave in a week",
    "overview": "Hundreds of migrants have swum and waded from Morocco into Spain's North African enclave of Ceuta over the past week, using inflatable rings and rushing a gate in the border fence, in a surge the enclave's leader, Juan Jesús Vivas, said is overwhelming resources. Spain has called in the military and its interior minister was due to visit, after a Supreme Court ruling limited the summary return of migrants to Morocco.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMirAFBVV95cUxNLTJ4YmJvZ19TT3o5RDRpZzdoSm9Vd2hwNVozSjVURDkyMjcyZ3B1WGdxY2Q0QWlkdkU1VGFsY0ktaXZpVDlXdE5RdDJMYTR6UkdYMDl2ZGx0QXpLcW1TZUZ0OThmdENpdW5VYnprSVF1WF9iXzlPdmhnd3dsUldjZ0IzYWtJX1JWYnhudDJadFlidzM1ME9YWGV4Mmdma2ZzZGVxQUhoLVhoMm5N?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cg4drwzkrkxo"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-30",
    "image": {
      "src": "/covers/ceuta-migrants-morocco-military.png",
      "alt": "Migrants scramble from the sea up rocks toward a border fence at Ceuta",
      "credit": "BBC"
    },
    "edition": "Evening Edition · 30 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Tariq ibn Ziyad crosses the Strait of Gibraltar (711 CE)",
        "excerpt": "Oh my warriors, whither would you flee? Behind you is the sea, before you, the enemy.",
        "source": "Al-Maqqari, \"Tarik's Address to his Soldiers\" (recording the 711 CE crossing from Morocco into Iberia), in The Sacred Books and Early Literature of the East, Vol. VI: Medieval Arabia, ed. Charles F. Horne (New York, 1917).",
        "href": "https://en.wikisource.org/wiki/The_Sacred_Books_and_Early_Literature_of_the_East/Volume_6/Tarik's_Address_to_his_Soldiers",
        "image": {
          "src": "/covers/ceuta-migrants-morocco-military--a0.png",
          "alt": "Fourteenth-century Persian manuscript illustration of Tariq ibn Ziyad, the Berber commander who led the Muslim crossing from North Africa into Iberia in 711.",
          "credit": "Aja'ib al-Makhluqat, Baghdad, 1388. Bibliothèque nationale de France, Suppl. Persan 332, fol. 162r (public domain, via Wikimedia Commons)."
        }
      },
      {
        "category": "historical",
        "title": "The Vietnamese 'Boat People' (1975-1995)",
        "excerpt": "For two decades after the fall of Saigon, more than a million people pushed off from Vietnam's coast in fishing skiffs and overloaded wooden boats, betting their lives on the open sea rather than the regime behind them. Many drifted for days without water, were preyed upon by pirates, or capsized within sight of no shore at all. Those who were found - like the thirty-five refugees plucked from a 35-foot boat by the USS Blue Ridge after eight days adrift - survived only by chance encounter with a passing ship.",
        "source": "U.S. Navy photograph by Lt. Carl R. Begy, 15 May 1984: a boat of 35 Vietnamese refugees rescued by the amphibious command ship USS Blue Ridge (LCC-19) northeast of Cam Ranh Bay after eight days at sea. U.S. National Archives / U.S. Navy.",
        "href": "https://commons.wikimedia.org/wiki/File:35_Vietnamese_boat_people.JPEG",
        "image": {
          "src": "/covers/ceuta-migrants-morocco-military--a1.png",
          "alt": "A small wooden fishing boat crowded with 35 Vietnamese refugees comes alongside the U.S. Navy command ship USS Blue Ridge in 1984.",
          "credit": "Lt. Carl R. Begy, U.S. Navy, 1984 (public domain, via Wikimedia Commons)."
        }
      },
      {
        "category": "literary",
        "title": "The Crossing of the Red Sea (Exodus 14:21-22)",
        "excerpt": "And Moses stretched out his hand over the sea; and the LORD caused the sea to go back by a strong east wind all that night, and made the sea dry land, and the waters were divided. And the children of Israel went into the midst of the sea upon the dry ground: and the waters were a wall unto them on their right hand, and on their left.",
        "source": "The Holy Bible, King James Version (1611), Exodus 14:21-22.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Exodus",
        "image": {
          "src": "/covers/ceuta-migrants-morocco-military--a2.png",
          "alt": "Bronzino's fresco of the Israelites crossing the Red Sea, fleeing on foot toward a distant shore.",
          "credit": "Agnolo Bronzino, The Crossing of the Red Sea, 1540-45, Palazzo Vecchio, Florence (public domain, via Wikimedia Commons / Google Art Project)."
        }
      },
      {
        "category": "literary",
        "title": "Aeneas and the Trojans in the storm at sea (The Aeneid, Book I)",
        "excerpt": "South, East, and West with mix'd confusion roar, / And roll the foaming billows to the shore. / The cables crack; the sailors' fearful cries / Ascend; and sable night involves the skies.",
        "source": "Virgil, The Aeneid, Book I, translated by John Dryden (1697).",
        "href": "https://www.gutenberg.org/files/228/228-h/228-h.htm",
        "image": {
          "src": "/covers/ceuta-migrants-morocco-military--a3.png",
          "alt": "A stormy seascape with the shipwreck of Aeneas, his Trojan fleet foundering among the waves and rocks.",
          "credit": "Frederik van Valckenborch, Landscape with the Shipwreck of Aeneas, 1603, Museum Boijmans Van Beuningen, Rotterdam (public domain, via Wikimedia Commons)."
        }
      },
      {
        "category": "artistic",
        "title": "The Raft of the Medusa - Theodore Gericault",
        "excerpt": "Gericault's vast canvas shows the survivors of a wrecked frigate crammed onto a makeshift raft, cast adrift off the African coast. The dead and dying sprawl across the foreground while the still-living strain upward, waving rags toward a barely visible ship on the horizon. It turns a real maritime catastrophe of desperate people abandoned at sea into a monumental image of hope, terror, and the thin line between rescue and oblivion.",
        "source": "Theodore Gericault, Le Radeau de la Meduse (The Raft of the Medusa), 1818-19, oil on canvas, Musee du Louvre, Paris.",
        "href": "https://commons.wikimedia.org/wiki/File:JEAN_LOUIS_TH%C3%89ODORE_G%C3%89RICAULT_-_La_Balsa_de_la_Medusa_(Museo_del_Louvre,_1818-19).jpg",
        "image": {
          "src": "/covers/ceuta-migrants-morocco-military--a4.png",
          "alt": "Gericault's painting of shipwreck survivors on a raft at sea, straining toward a distant ship on the horizon.",
          "credit": "Theodore Gericault, The Raft of the Medusa, 1818-19, Musee du Louvre (public domain, via Wikimedia Commons)."
        }
      },
      {
        "category": "artistic",
        "title": "Wade in the Water (African-American spiritual)",
        "excerpt": "Wade in the water, wade in the water, children, wade in the water. God's gonna trouble the water. / See that host all dressed in white, God's gonna trouble the water. The leader looks like the Israelite. God's gonna trouble the water.",
        "source": "\"Wade in the Water,\" African-American spiritual, first published in New Jubilee Songs as Sung by the Fisk Jubilee Singers, ed. Frederick J. Work (Nashville, 1901).",
        "href": "https://hymnary.org/text/see_that_host_all_dressed_in_white",
        "image": {
          "src": "/covers/ceuta-migrants-morocco-military--a5.png",
          "alt": "Portrait photograph of the Fisk Jubilee Singers, the formerly enslaved ensemble that first published 'Wade in the Water.'",
          "credit": "Fisk Jubilee Singers, 1882. Moorland-Spingarn Research Center, Prints & Photographs (public domain, via Wikimedia Commons)."
        }
      }
    ],
    "rank": 2
  },
  {
    "slug": "russia-north-korean-missile-kryvyi-rih-family",
    "headline": "A Russian ballistic missile strike near Kryvyi Rih kills a family of five as Zelensky says a North Korean weapon was used",
    "overview": "A Russian overnight barrage of more than 70 missiles and 280 drones struck across Ukraine, and a ballistic missile destroyed a family home in Radushne near Kryvyi Rih, killing five members of the Voronov family, President Volodymyr Zelensky said, with others still missing. Zelensky said Russia used a North Korean-made missile in the attack, which officials said killed at least eight people in all.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMizAFBVV95cUxPYWM5NFpLa3p4OE1XZUMybkU4TDdyeWxjbTlEaXpUaUtJR1JUNngzd3AxNmgydElQNUc4aVBFS3V6N0FCcXZOTVV0a0tYQjl1dTVRTnZrNXdRaTh4aGVOR25hM0xvQ3hEWElrWWtjWGI0aWhwb28wbjJLMklKZEFQb1dzWVktU2YteVN3dW84MmpzdnRkUXlzZWxWam9COVVHZ1h5NkhFcXRvZi12SUx1S2hGcm93U1lkdmJNVXRDbUpYSjRIemlpX1NqaDk?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cy8mk59l5jzo"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-30",
    "image": {
      "src": "/covers/russia-north-korean-missile-kryvyi-rih-family.png",
      "alt": "A residential apartment building gutted by a Russian missile strike in Ukraine",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 30 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Massacre of the Innocents (Gospel of Matthew)",
        "excerpt": "Then Herod, when he saw that he was mocked of the wise men, was exceeding wroth, and sent forth, and slew all the children that were in Bethlehem, and in all the coasts thereof, from two years old and under... In Rama was there a voice heard, lamentation, and weeping, and great mourning, Rachel weeping for her children, and would not be comforted, because they are not.",
        "source": "The Gospel According to Matthew 2:16-18, King James Version (1611).",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Matthew",
        "image": {
          "src": "/covers/russia-north-korean-missile-kryvyi-rih-family--a0.png",
          "alt": "Giotto fresco of the Massacre of the Innocents: soldiers seize infants as mothers wail beneath Herod's throne.",
          "credit": "Giotto di Bondone, Scrovegni Chapel, Padua (c. 1305); Web Gallery of Art / Wikimedia Commons, public domain."
        }
      },
      {
        "category": "historical",
        "title": "The Bombing of Guernica (26 April 1937)",
        "excerpt": "On the market afternoon of 26 April 1937 the German Condor Legion and Italian warplanes, flying for Franco, razed the Basque town of Guernica in three hours of incendiary and high-explosive bombing, cutting down civilians in the streets and burying families in their homes. It became the modern world's byword for the deliberate destruction of a defenceless town from the air, and for one dictatorship lending its aircraft and bombs to another's war, tried out on ordinary families below.",
        "source": "The bombing of Guernica, Spanish Civil War, by the German Condor Legion and Italian Aviazione Legionaria, 26 April 1937 (contemporary archival photograph of the ruins).",
        "href": "https://commons.wikimedia.org/wiki/File:Bundesarchiv_Bild_183-H25224,_Guernica,_Ruinen.jpg",
        "image": {
          "src": "/covers/russia-north-korean-missile-kryvyi-rih-family--a1.png",
          "alt": "Black-and-white photograph of the smoking, gutted ruins of Guernica after the 1937 aerial bombing.",
          "credit": "Bundesarchiv, Bild 183-H25224 / CC-BY-SA 3.0 (via Wikimedia Commons)."
        }
      },
      {
        "category": "literary",
        "title": "The House Falls Upon Job's Children (Book of Job)",
        "excerpt": "While he was yet speaking, there came also another, and said, Thy sons and thy daughters were eating and drinking wine in their eldest brother's house: And, behold, there came a great wind from the wilderness, and smote the four corners of the house, and it fell upon the young men, and they are dead; and I only am escaped alone to tell thee.",
        "source": "The Book of Job 1:18-19, King James Version (1611).",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Job",
        "image": {
          "src": "/covers/russia-north-korean-missile-kryvyi-rih-family--a2.png",
          "alt": "William Blake watercolour of Job's sons and daughters crushed as the house collapses upon them.",
          "credit": "William Blake, 'Job's Sons and Daughters Overwhelmed by Satan' (c. 1805); Wikimedia Commons, public domain."
        }
      },
      {
        "category": "literary",
        "title": "Hecuba's Lament for Astyanax (Euripides, The Trojan Women)",
        "excerpt": "Cold tears, so young, so miserably dead... Dear God, the pattering welcomes of thy feet, / The nursing in my lap; and O, the sweet / Falling asleep together! All is gone.",
        "source": "Euripides, The Trojan Women, trans. Gilbert Murray (1915); Hecuba's lament over the child Astyanax, hurled to death from the walls of Troy.",
        "href": "https://www.gutenberg.org/files/35171/35171-h/35171-h.htm",
        "image": {
          "src": "/covers/russia-north-korean-missile-kryvyi-rih-family--a3.png",
          "alt": "Jacques-Louis David painting of Andromache grieving over the body of Hector, her small son Astyanax beside her.",
          "credit": "Jacques-Louis David, 'Andromache Mourning Hector' (1783), Louvre; Wikimedia Commons, public domain."
        }
      },
      {
        "category": "artistic",
        "title": "Nicolas Poussin, The Massacre of the Innocents",
        "excerpt": "Poussin compresses the whole horror of a slaughtered child into a single frozen instant: a soldier pins a naked infant to the ground with his knee, sword raised, while the mother's mouth is torn open in a scream that seems to ring off the marble architecture behind her. To one side another mother flees with a limp body in her arms. The painting's terrible economy and the open-mouthed cry of the mother became a touchstone of grief in Western art, later haunting Picasso as he composed Guernica.",
        "source": "Nicolas Poussin, 'The Massacre of the Innocents' (c. 1625-29), oil on canvas, Musée Condé, Chantilly.",
        "href": "https://commons.wikimedia.org/wiki/File:Nicolas_Poussin_-_Le_massacre_des_Innocents_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/russia-north-korean-missile-kryvyi-rih-family--a4.png",
          "alt": "Poussin's painting: a soldier about to kill an infant pinned under his knee as the screaming mother tries to stop him.",
          "credit": "Nicolas Poussin, Musée Condé, Chantilly (c. 1625-29); Wikimedia Commons, public domain."
        }
      },
      {
        "category": "artistic",
        "title": "The Coventry Carol (anonymous, 16th century)",
        "excerpt": "Lully, Lulla, thou little tiny child, / Byby, lully lullay... Herod, the king, in his raging, / Charged he hath this day / His men of might, in his own sight, / All young children to slay.",
        "source": "'Coventry Carol,' from the Pageant of the Shearmen and Tailors, Coventry (text recorded by Robert Croo, 1534; melody 1591). A mothers' lullaby-lament for the children doomed by Herod's slaughter.",
        "href": "https://en.wikisource.org/wiki/Coventry_Carol",
        "image": {
          "src": "/covers/russia-north-korean-missile-kryvyi-rih-family--a5.png",
          "alt": "Bruegel's snowbound Flemish village as armoured soldiers ride in and kill children while parents plead in the doorways.",
          "credit": "Pieter Bruegel the Elder, 'The Massacre of the Innocents' (c. 1565-67); Wikimedia Commons, public domain."
        }
      }
    ],
    "rank": 3
  },
  {
    "slug": "danube-record-low-paks-nuclear-shutdown",
    "headline": "A record-low Danube forces Hungary to shut its only nuclear plant, at Paks, as drought grips Central Europe",
    "overview": "Hungary's only nuclear power plant, the Soviet-era Paks station, will shut down entirely for the first time because the River Danube has fallen so low that the plant's cooling-water intakes can no longer reach it, Prime Minister Péter Magyar said. He warned the country's energy supply could turn \"critical\" amid a heatwave near 37C, as the Danube dropped to its lowest level in 30 years across Hungary, Serbia and Romania.",
    "genre": "Climate",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cn0nqv05g0do"
      },
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMirgFBVV95cUxOLWx6YnlNOUNGR0R6QnlpYUpNTWh5N0VtZERiM2tkQ0dfNVBESGNhWVJ5eUM1SnE1Zi1lWFR3ZElUVWdxaVVDRzlJSEh5NkpZdGVLQmk5VnhXRDVUVGpWcGpDVFZJM3lEX09Jd3VyVFJjM3FfTkoxa2Z2cTMyXzlCRUxEZVdvRC0zYXZLY2tUNEtSTjh6cmFOVFpkenpBSTU4NG1UOVZIZklUNER2OXc?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-30",
    "image": {
      "src": "/covers/danube-record-low-paks-nuclear-shutdown.png",
      "alt": "The Paks nuclear power plant on the bank of the Danube in Hungary",
      "credit": "BBC"
    },
    "edition": "Evening Edition · 30 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Cyrus Diverts the Euphrates to Take Babylon (539 BC)",
        "excerpt": "He then turned the Euphrates by a canal into the basin, which was then a marsh, on which the river sank to such an extent that the natural bed of the stream became fordable.",
        "source": "Herodotus, Histories 1.191, trans. George Rawlinson",
        "href": "https://www.livius.org/sources/content/herodotus/cyrus-takes-babylon/",
        "image": {
          "src": "/covers/danube-record-low-paks-nuclear-shutdown--a0.png",
          "alt": "Mezzotint of the fall of Babylon, with Cyrus's forces entering by the lowered bed of the Euphrates",
          "credit": "The Fall of Babylon; Cyrus the Great defeating the Chaldean, mezzotint. Wellcome Collection (Public Domain)"
        }
      },
      {
        "category": "historical",
        "title": "The American Dust Bowl (1930s)",
        "excerpt": "Through the 1930s a merciless drought stripped the southern Great Plains, turning ploughed farmland to powder that rose in towering black walls and buried homesteads. Rivers, wells and topsoil vanished together, and hundreds of thousands of families abandoned a parched land that could no longer sustain them. It stands as the great modern parable of nature overwhelming human enterprise when the water simply runs out.",
        "source": "Dust Bowl drought, Cimarron County, Oklahoma; photograph by Arthur Rothstein, Farm Security Administration, 1936",
        "href": "https://www.loc.gov/pictures/item/2004674127/",
        "image": {
          "src": "/covers/danube-record-low-paks-nuclear-shutdown--a1.png",
          "alt": "A farmer and his sons bent against a blinding dust storm on a barren Oklahoma farm",
          "credit": "Arthur Rothstein, Farm Security Administration, 1936. U.S. Library of Congress (Public Domain)"
        }
      },
      {
        "category": "literary",
        "title": "T. S. Eliot, The Waste Land (1922)",
        "excerpt": "A heap of broken images, where the sun beats, / And the dead tree gives no shelter, the cricket no relief, / And the dry stone no sound of water.",
        "source": "T. S. Eliot, The Waste Land (1922), I. The Burial of the Dead",
        "href": "https://www.gutenberg.org/ebooks/1321",
        "image": {
          "src": "/covers/danube-record-low-paks-nuclear-shutdown--a2.png",
          "alt": "Photographic portrait of the poet T. S. Eliot, 1923",
          "credit": "T. S. Eliot, 1923. Public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Coleridge, The Rime of the Ancient Mariner (1834)",
        "excerpt": "Water, water, every where, / And all the boards did shrink; / Water, water, every where, / Nor any drop to drink.",
        "source": "Samuel Taylor Coleridge, The Rime of the Ancient Mariner, Part II",
        "href": "https://www.gutenberg.org/files/151/151-h/151-h.htm",
        "image": {
          "src": "/covers/danube-record-low-paks-nuclear-shutdown--a3.png",
          "alt": "Gustave Dore engraving of the becalmed mariner gazing over a still, rotting sea beneath a burning sky",
          "credit": "Gustave Doré, illustration for The Rime of the Ancient Mariner (1876). Public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Smetana, \"Vltava\" (The Moldau), from Má vlast (1874)",
        "excerpt": "Smetana's symphonic poem traces a Central European river from two cold mountain springs to a broad, surging flood, its famous rippling theme carrying the current past forests, a peasant wedding, moonlit water nymphs and the rapids of St John. It is music made entirely of a living, flowing river-the very thing the Danube's record low now silences. Heard against a drought that leaves a great river too shrunken to cool a power station, its brimming water-music sounds almost like an elegy.",
        "source": "Bedřich Smetana, Vltava (The Moldau), No. 2 of Má vlast, composed 1874",
        "href": "https://imslp.org/wiki/Vltava,_JB_1:112/2_(Smetana,_Bed%C5%99ich)",
        "image": {
          "src": "/covers/danube-record-low-paks-nuclear-shutdown--a4.png",
          "alt": "Portrait photograph of the Czech composer Bedrich Smetana",
          "credit": "Portrait of Bedřich Smetana. Public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Mihály Munkácsy, Dusty Road (c. 1883)",
        "excerpt": "The Hungarian master paints the Great Plain flattened under a hazy, heat-bleached sky, a lone cart trailing a plume of dust down a cracked, sun-scorched track. Earth and air dissolve into the same parched ochre, and no water is anywhere to be seen. It renders in oil exactly the condition now gripping the Danube basin: a land baked dry, the moisture wrung out of it by relentless heat.",
        "source": "Mihály Munkácsy, Dusty Road II, oil on canvas, c. 1883, Hungarian National Gallery, Budapest",
        "href": "https://commons.wikimedia.org/wiki/File:Munk%C3%A1csy,_Mih%C3%A1ly_-_Dusty_Road_II_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/danube-record-low-paks-nuclear-shutdown--a5.png",
          "alt": "Painting of a parched, dusty road crossing the flat Hungarian plain under a hot hazy sky",
          "credit": "Mihály Munkácsy, Dusty Road II (c. 1883), Hungarian National Gallery. Public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 4
  },
  {
    "slug": "zoox-robotaxi-nhtsa-approval",
    "headline": "Amazon's Zoox wins the first U.S. approval to run paid robotaxis with no steering wheel or pedals",
    "overview": "Amazon's Zoox has become the first company to win a U.S. exemption to charge passengers for rides in purpose-built driverless vehicles that have no steering wheel or pedals, after the National Highway Traffic Safety Administration cleared it to deploy up to 2,500 vehicles a year. The carriage-style electric cars, already testing in Las Vegas and San Francisco, are set to begin paid service in Las Vegas next month.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMitgFBVV95cUxNWnc0dGM0Q3ViQk5QbzEtVXRJeFhHSG5rMGlGQXk1TC1sT3lIRHVjRVpPbUdTdDRkOHVTNk94dnV3RF80TlA1M0xnZHZZcXRwenlhaVBtTlJqcm1fVlpOS1Etb3c2TmZtNXhHZmozZDZPNWp5NHgxazUtQkxieXg5WmIxLUFKRWlsWDVyN2txWlBYOHZXMlVISHhZYlhvRVZIU25KY3E5dlZBLUJYRnRRY0ROX2Ztdw?oc=5"
      },
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMimgFBVV95cUxPcW5yMkRPMXRLa3lOWXZuX2wwbGxoYm5GcHlLS2c4dlJEN2RqUjQ4QWF1cHp1MG9PTnhLY0pzUlBsdFRlOE9fb2xCV3hHVkZhbXMzOGYzaWxpZmNWbHNPSUF4b181emFyUm1uZDJNOURPZmxfWkdEM2R5MlNpdWJzSmp6eXdJWHE5cVBZWF9JbGc2c3lHTndHSTV3?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-30",
    "image": {
      "src": "/covers/zoox-robotaxi-nhtsa-approval.png",
      "alt": "A Zoox autonomous robotaxi with no steering wheel on a San Francisco street",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 30 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Hero of Alexandria's aeolipile — the self-moving machine (1st c. AD)",
        "excerpt": "Place a cauldron over a fire: a ball shall revolve on a pivot. … As the cauldron gets hot it will be found that the steam, entering the ball through E F G, passes out through the bent tubes towards the lid, and causes the ball to revolve, as in the case of the dancing figures.",
        "source": "Hero of Alexandria, Pneumatica, no. 50 (the aeolipile), trans. Bennet Woodcroft, The Pneumatics of Hero of Alexandria (London: Taylor, Walton & Maberly, 1851).",
        "href": "https://archive.org/details/pneumaticsofhero0000hero",
        "image": {
          "src": "/covers/zoox-robotaxi-nhtsa-approval--a0.png",
          "alt": "Engraving of Hero of Alexandria's aeolipile, a steam-driven hollow ball that rotates by itself on a pivot.",
          "credit": "Aeolipile after Hero, from Knight's American Mechanical Dictionary (1876). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "Vaucanson's Digesting Duck — the 18th-century automaton",
        "excerpt": "The Duck stretches out its Neck to take Corn out of your Hand; it swallows it, digests it, and discharges it digested by the usual Passage. You see all the Actions of a Duck that swallows greedily, and doubles the Swiftness in the Motion of its Neck and Throat or Gullet to drive the Food into its Stomach, copied from Nature.",
        "source": "Jacques de Vaucanson, An Account of the Mechanism of an Automaton, or Image Playing on the German-Flute … Together with a Description of an Artificial Duck, trans. J. T. Desaguliers (London, 1742).",
        "href": "https://archive.org/details/b30358711",
        "image": {
          "src": "/covers/zoox-robotaxi-nhtsa-approval--a1.png",
          "alt": "Engraving of Vaucanson's mechanical Digesting Duck showing its internal clockwork.",
          "credit": "Rendering of Vaucanson's digesting duck, Scientific American (1899). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Homer, the self-moving tripods of Hephaestus (Iliad, Book XVIII)",
        "excerpt": "he was making twenty tripods that were to stand by the wall of his house, and he set wheels of gold under them all that they might go of their own selves to the assemblies of the gods, and come back again—marvels indeed to see.",
        "source": "Homer, The Iliad, Book XVIII, trans. Samuel Butler (1898).",
        "href": "https://en.wikisource.org/wiki/The_Iliad_(Butler)/Book_XVIII",
        "image": {
          "src": "/covers/zoox-robotaxi-nhtsa-approval--a2.png",
          "alt": "Diego Velázquez's painting The Forge of Vulcan, showing the smith-god Hephaestus/Vulcan and his workers at the forge.",
          "credit": "Diego Velázquez, La Fragua de Vulcano (1630), Museo del Prado, Madrid. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Ovid, Phaëthon loses the reins of the sun-chariot (Metamorphoses, Book II)",
        "excerpt": "Soon as the steeds have perceived this, they rush on, and leave the beaten track, and run not in the order in which they did before. He himself becomes alarmed; and knows not which way to turn the reins entrusted to him, nor does he know where the way is, nor, if he did know, could he control them.",
        "source": "Ovid, Metamorphoses, Book II (Phaëthon), trans. Henry T. Riley (London, 1851).",
        "href": "https://www.gutenberg.org/cache/epub/21765/pg21765.txt"
      },
      {
        "category": "artistic",
        "title": "Paul Dukas, The Sorcerer's Apprentice (L'apprenti sorcier), 1897",
        "excerpt": "Dukas's symphonic poem sets Goethe's tale of the apprentice who bewitches a broom to fetch water and then cannot make it stop. A jaunty, mechanical ostinato sends the enchanted servant marching, the theme multiplying and accelerating into a flood while the helpless conjurer looks on. It is the sound of a self-operating machine that obeys its command too well, running on without a human hand until the master's word finally halts it.",
        "source": "Paul Dukas, L'apprenti sorcier (The Sorcerer's Apprentice), symphonic poem after Goethe's ballad Der Zauberlehrling, first published A. Durand & Fils, 1897.",
        "href": "https://imslp.org/wiki/L'apprenti_sorcier_(Dukas,_Paul)",
        "image": {
          "src": "/covers/zoox-robotaxi-nhtsa-approval--a4.png",
          "alt": "Ferdinand Barth's 1882 illustration of Goethe's Sorcerer's Apprentice, the enchanted broom carrying pails of water.",
          "credit": "Ferdinand Barth, illustration for Goethe's Der Zauberlehrling (c. 1882). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Peter Paul Rubens, The Fall of Phaeton, c. 1604/1605",
        "excerpt": "Rubens paints the instant the sun-chariot flies apart: Phaethon, having seized the reins of a machine he cannot govern, tumbles headlong as the panicked horses scatter and the wheels break loose across a sky torn by cloud and lightning. Winged Hours and the figures of the zodiac reel around the wreck. It is an image of a splendid vehicle careening out of control the moment its driver proves unequal to it.",
        "source": "Peter Paul Rubens, The Fall of Phaeton, c. 1604/1605 (reworked c. 1606-1608), oil on canvas, National Gallery of Art, Washington, D.C.",
        "href": "https://en.wikipedia.org/wiki/The_Fall_of_Phaeton_(Rubens)",
        "image": {
          "src": "/covers/zoox-robotaxi-nhtsa-approval--a5.png",
          "alt": "Peter Paul Rubens's painting The Fall of Phaeton, the sun-chariot breaking apart as Phaethon and the horses plunge from the sky.",
          "credit": "Peter Paul Rubens, The Fall of Phaeton (c. 1604/1605), National Gallery of Art, Washington. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 5
  },
  {
    "slug": "us-second-quarter-gdp-slowdown",
    "headline": "The U.S. economy grew at a sluggish 1.5% annual rate in the second quarter as inflation stayed above the Fed's target",
    "overview": "U.S. gross domestic product expanded at a 1.5% annual rate from April through June, the Commerce Department estimated, below the 1.8% economists expected and down from 2.1% in the first quarter, as a surge in imports tied to AI investment subtracted from growth. Consumer spending accelerated to a 3.2% pace, but core PCE inflation ran at 3.4% for the quarter, well above the Federal Reserve's 2% goal.",
    "genre": "Economy",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMitgFBVV95cUxNZUM3amF1MFUxODRGUWdydTZvZC1MS0Y4eVM5NzF3WWg2TUN5azdjWGJUZW1tc2pqMkhmbFRreXZ1VTNHNHRqdmg1a2ZHVHdDMFloVzRNMmd5SGhXdFMxdXBkV2tuMXY0X21pX0oxMHVwTHdWeU5pWmcwOUxWbEREUFhmOTc2UzFUQzRENkxBMHlodzZfRFV5VVVBVFdmLXROamEtNjBKbUtBM0dGNzNSS3ZJWTE5dw?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiqwFBVV95cUxObWh4Um5od3luS0pRM0hOYTNwN0Z4bElZWFBXVDRRdFFVT2FpejU4ZkQ3MTVuY3hYb1NpMVd4QXV4WFhFMFUwbTRCbGs2cGlPOW11LWUxdzFyRnU0a0cwZU02b0s5b012M0p3Y2prV25KT0RQd3BGZk52aWNlanFDSDh5UTRRUVYtc2lsSm1RWjM4MjlzMXFCcEVrVjNvYVNzN3pNTm1zU2ZpV1U?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-30",
    "image": {
      "src": "/covers/us-second-quarter-gdp-slowdown.png",
      "alt": "The Marriner S. Eccles Federal Reserve building in Washington",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 30 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Joseph and the Seven Fat and Seven Lean Years of Egypt",
        "excerpt": "Behold, there come seven years of great plenty throughout all the land of Egypt: And there shall arise after them seven years of famine; and all the plenty shall be forgotten in the land of Egypt; and the famine shall consume the land; And the plenty shall not be known in the land by reason of that famine following; for it shall be very grievous.",
        "source": "Genesis 41:29-31, King James Version (1611)",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Genesis",
        "image": {
          "src": "/covers/us-second-quarter-gdp-slowdown--a0.png",
          "alt": "Joseph interpreting Pharaoh's dream of the fat and lean years, fresco by Peter von Cornelius",
          "credit": "Peter von Cornelius (1816-1817), Alte Nationalgalerie, Berlin; via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "historical",
        "title": "The Great Inflation and 1970s Stagflation",
        "excerpt": "For more than a decade after 1965 the American economy suffered the strange affliction that broke the old rulebook: prices climbed relentlessly even as growth stalled and jobs grew scarce. Oil shocks, loose money, and dashed expectations combined so that a dollar bought less each month while the engine of production sputtered. Economists coined a new word, stagflation, for a malady that was supposed to be impossible, and Americans queued at gas pumps as the measured fortunes of the nation slid backward.",
        "source": "Michael Bryan, 'The Great Inflation, 1965-1982,' Federal Reserve History",
        "href": "https://www.federalreservehistory.org/essays/great-inflation",
        "image": {
          "src": "/covers/us-second-quarter-gdp-slowdown--a1.png",
          "alt": "Cars lined up at a gas station during the 1979 fuel shortage",
          "credit": "Warren K. Leffler, U.S. News & World Report, 1979; Library of Congress via Wikimedia Commons (no known copyright restrictions)"
        }
      },
      {
        "category": "literary",
        "title": "Wordsworth, 'The world is too much with us'",
        "excerpt": "The world is too much with us; late and soon, / Getting and spending, we lay waste our powers: / Little we see in Nature that is ours; / We have given our hearts away, a sordid boon!",
        "source": "William Wordsworth, 'The world is too much with us,' in Poems (1815)",
        "href": "https://en.wikisource.org/wiki/Poems_(Wordsworth,_1815)/Volume_2/The_World_is_too_much_with"
      },
      {
        "category": "literary",
        "title": "Ecclesiastes on Silver, Abundance, and Vanity",
        "excerpt": "He that loveth silver shall not be satisfied with silver; nor he that loveth abundance with increase: this is also vanity. When goods increase, they are increased that eat them: and what good is there to the owners thereof, saving the beholding of them with their eyes?",
        "source": "Ecclesiastes 5:10-11, King James Version (1611)",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Ecclesiastes"
      },
      {
        "category": "artistic",
        "title": "Pieter Bruegel the Elder, 'The Harvesters' (1565)",
        "excerpt": "Bruegel spreads a golden August across the panel: a wall of ripe wheat, sheaves already cut, and peasants who pause from the sickle to eat bread and drink in the shade of a pear tree. The scene fuses getting and spending in a single field, labor and consumption caught in one breath, while the hazy valley beyond hints that this plenty is a season, not a permanence. It is a painting of the fat years, alive to how quickly the standing corn becomes stubble.",
        "source": "Pieter Bruegel the Elder, The Harvesters, 1565, oil on wood; The Metropolitan Museum of Art, New York",
        "href": "https://www.metmuseum.org/art/collection/search/435809",
        "image": {
          "src": "/covers/us-second-quarter-gdp-slowdown--a4.png",
          "alt": "Peasants harvesting and resting to eat in a golden wheat field under a hazy summer sky",
          "credit": "Pieter Bruegel the Elder, 'The Harvesters' (1565), Metropolitan Museum of Art; via Wikimedia Commons / Google Art Project (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Haydn, 'The Seasons' (Die Jahreszeiten, 1801)",
        "excerpt": "Haydn's late oratorio turns the agricultural year into music, moving from spring's hopeful sowing through summer's storms to autumn's brimming harvest and winter's want. Its choruses give thanks for a bountiful crop, its arias paint the plowman whistling at his toil, and its close reckons the fruits of an entire year's labor against the coming cold. The work makes audible the same cycle the economy still runs on: the fat season stored up against the lean, plenty measured out against scarcity.",
        "source": "Joseph Haydn, Die Jahreszeiten (The Seasons), Hob. XXI:3, libretto by Gottfried van Swieten after James Thomson, first performed 1801",
        "href": "https://imslp.org/wiki/Die_Jahreszeiten,_Hob.XXI:3_(Haydn,_Joseph)",
        "image": {
          "src": "/covers/us-second-quarter-gdp-slowdown--a5.png",
          "alt": "Title page of the first edition of Haydn's oratorio Die Jahreszeiten (The Seasons)",
          "credit": "First edition title page of Haydn's 'Die Jahreszeiten' (1801); via Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 6
  },
  {
    "slug": "eu-ai-gigafactories-funding",
    "headline": "The EU offers 10 billion euros to help build seven AI 'gigafactories' to close the gap with the U.S. and China",
    "overview": "The European Commission unveiled 10 billion euros ($11.4 billion) in public funding to help firms build seven AI \"gigafactories,\" hoping to draw a further 20 billion euros in private investment and more than double the bloc's computing power. Executive vice-president Henna Virkkunen called large-scale computing \"a strategic necessity for Europe,\" which lags the United States and China in AI infrastructure.",
    "genre": "Technology",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMiogFBVV95cUxQVFNqbzNnRFJqQnF4UWlSb2wxMTNzSW1HQV8tMmVZRE9RQzhnSjBNczNDb0FxRDExVEd5MlMzWnJ2UWZTSlNLR1UtS25ldmZVcUYzazRrTFczOEMzLU4wNUlSMFN5cW1SbjhBWGQ2bzEzMzJwVnlMM0NlUVViOVhERVpOaGM1ZU9aYV9KSm5NZ3dYbXJsTzlaRjEtV2I3VFEwUWc?oc=5"
      },
      {
        "name": "The Washington Post",
        "href": "https://www.washingtonpost.com/business/2026/07/30/eu-ai-gigafactories-china-us-data-center/d50cbea6-8bfd-11f1-8912-d71e69d679d7_story.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-30",
    "image": {
      "src": "/covers/eu-ai-gigafactories-funding.png",
      "alt": "Rows of servers in a data centre",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 30 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Cheops mobilizes Egypt to build the Great Pyramid (Herodotus, Histories 2.124)",
        "excerpt": "he then bade all the Egyptians work for him... they worked by a hundred thousand men at a time, for each three months continually... For the making of the pyramid itself there passed a period of twenty years.",
        "source": "Herodotus, The History of Herodotus, Book II (Euterpe), section 124, trans. G. C. Macaulay (1890)",
        "href": "https://www.gutenberg.org/cache/epub/2707/pg2707-images.html",
        "image": {
          "src": "/covers/eu-ai-gigafactories-funding--a0.png",
          "alt": "The Great Pyramid of Giza (Khufu / Cheops)",
          "credit": "Photo: Nina Aldin Thune, CC BY-SA 3.0, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "Kennedy's 'Sputnik moment' Apollo pledge at Rice University (1962)",
        "excerpt": "We choose to go to the moon in this decade and do the other things, not because they are easy, but because they are hard, because that goal will serve to organize and measure the best of our energies and skills, because that challenge is one that we are willing to accept, one we are unwilling to postpone, and one which we intend to win, and the others, too.",
        "source": "John F. Kennedy, Address at Rice University on the Nation's Space Effort, September 12, 1962",
        "href": "https://en.wikisource.org/wiki/We_choose_to_go_to_the_Moon",
        "image": {
          "src": "/covers/eu-ai-gigafactories-funding--a1.png",
          "alt": "Apollo 11 Saturn V rocket lifting off, July 16, 1969",
          "credit": "NASA (photo KSC-69PC-442), public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "The Tower of Babel (Genesis 11:4)",
        "excerpt": "And they said, Go to, let us build us a city and a tower, whose top may reach unto heaven; and let us make us a name, lest we be scattered abroad upon the face of the whole earth.",
        "source": "Genesis 11:4, The Holy Bible, King James Version",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Genesis",
        "image": {
          "src": "/covers/eu-ai-gigafactories-funding--a2.png",
          "alt": "Gustave Doré, The Confusion of Tongues, engraving of the Tower of Babel",
          "credit": "Gustave Doré (c. 1865), public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Salomon's House, the state house of invention in Bacon's New Atlantis",
        "excerpt": "The end of our foundation is the knowledge of causes, and secret motions of things; and the enlarging of the bounds of human empire, to the effecting of all things possible.",
        "source": "Francis Bacon, New Atlantis (1626)",
        "href": "https://www.gutenberg.org/files/2434/2434-h/2434-h.htm",
        "image": {
          "src": "/covers/eu-ai-gigafactories-funding--a3.png",
          "alt": "1620 frontispiece of Bacon's Instauratio Magna: a ship sailing out past the Pillars of Hercules",
          "credit": "Engraving by Simon van de Passe, 1620, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Pieter Bruegel the Elder, The Tower of Babel (1563)",
        "excerpt": "Bruegel's vast panel piles storey upon storey of a spiralling brick colossus that dwarfs the harbour and city at its feet, its upper tiers lost in cloud while the lower arches are still raw scaffolding swarming with cranes, quarried stone and antlike laborers. The tower already leans and cracks even as it climbs, a portrait of colossal collective ambition and the overreach of a mega-project straining beyond human limits.",
        "source": "Pieter Bruegel the Elder, The Tower of Babel, 1563, oil on panel, Kunsthistorisches Museum, Vienna",
        "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_the_Elder_-_The_Tower_of_Babel_(Vienna)_-_Google_Art_Project_-_edited.jpg",
        "image": {
          "src": "/covers/eu-ai-gigafactories-funding--a4.png",
          "alt": "Pieter Bruegel the Elder, The Tower of Babel (1563), Vienna panel",
          "credit": "Pieter Bruegel the Elder, 1563, Kunsthistorisches Museum Vienna, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Alexander Mosolov, Zavod ('Iron Foundry'), Op. 19 (1926-27)",
        "excerpt": "In this four-minute orchestral episode from the ballet Steel, hammering ostinatos, grinding brass and a rattling shaken metal sheet turn the orchestra itself into a working blast furnace. Written for the tenth anniversary of the Revolution, it is machine-age music as state spectacle, glorifying heavy industry and mass production as the very sound of a nation forging its future.",
        "source": "Alexander Mosolov, Zavod (The Iron Foundry), Op. 19, orchestral episode from the ballet Steel, premiered 1927",
        "href": "https://imslp.org/wiki/Steel,_Op.19_(Mosolov,_Alexander)",
        "image": {
          "src": "/covers/eu-ai-gigafactories-funding--a5.png",
          "alt": "Molten pig iron poured into an open hearth furnace at the Jones and Laughlin Steel Company, Pittsburgh",
          "credit": "U.S. National Archives (NARA 535922), public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 7
  },
  {
    "slug": "kenya-cyanide-pesticide-elephants",
    "headline": "Cyanide from a tomato-farm pesticide is suspected of killing 15 elephants near Kenya's Amboseli park",
    "overview": "Fifteen elephants found dead just outside Amboseli National Park in southern Kenya are believed to have been poisoned after eating tomatoes sprayed with pesticides on nearby farms, the Kenya Wildlife Service said, with preliminary tests finding cyanide in the carcasses. Officials ruled out foul play and called it the first elephant die-off on this scale in the region in decades, raising alarm over farming encroaching on wildlife.",
    "genre": "Science",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cp9e0v5xmdyo"
      },
      {
        "name": "Citizen Digital",
        "href": "https://citizen.digital/article/cyanide-poisoning-killed-15-elephants-in-amboseli-kws-confirms-n387362"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-30",
    "image": {
      "src": "/covers/kenya-cyanide-pesticide-elephants.png",
      "alt": "A family of elephants in Amboseli National Park, Kenya",
      "credit": "BBC"
    },
    "edition": "Evening Edition · 30 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Rachel Carson's Silent Spring and the DDT reckoning",
        "excerpt": "In 1962 Rachel Carson's Silent Spring warned that the pesticides broadcast across American farmland, DDT and its chemical kin, were seeping through the food web to poison birds, fish and mammals the sprayers never meant to touch. She conjured a countryside gone silent, its songbirds killed by the very chemistry meant to guard the crops, and cast such deaths as an indictment of humanity's carelessness toward the living world. The book named the exact pattern now unfolding beside Amboseli: farm poison spreading outward from the field to kill the wild creatures at its edge.",
        "source": "Rachel Carson, Silent Spring (Boston: Houghton Mifflin, 1962).",
        "href": "https://www.acs.org/education/whatischemistry/landmarks/rachel-carson-silent-spring.html",
        "image": {
          "src": "/covers/kenya-cyanide-pesticide-elephants--a0.png",
          "alt": "A man demonstrating handheld DDT spraying equipment, mid-20th century",
          "credit": "U.S. Centers for Disease Control and Prevention, Public Health Image Library (public domain)"
        }
      },
      {
        "category": "historical",
        "title": "The near-extermination of the American bison, 19th century",
        "excerpt": "The wild buffalo is practically gone forever, and in a few more years, when the whitened bones of the last bleaching skeleton shall have been picked up and shipped East for commercial uses, nothing will remain of him save his old, well-worn trails along the water-courses, a few museum specimens, and regret for his fate.",
        "source": "William T. Hornaday, The Extermination of the American Bison (Washington: Government Printing Office, 1889).",
        "href": "https://www.gutenberg.org/ebooks/17748",
        "image": {
          "src": "/covers/kenya-cyanide-pesticide-elephants--a1.png",
          "alt": "A mountainous pile of American bison skulls awaiting industrial processing, Michigan, 1892",
          "credit": "Photographer unknown; Burton Historical Collection, Detroit Public Library (public domain), via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "William Blake, 'Auguries of Innocence'",
        "excerpt": "A Robin Red breast in a Cage / Puts all Heaven in a Rage.",
        "source": "William Blake, 'Auguries of Innocence' (from the Pickering Manuscript, c. 1803).",
        "href": "https://en.wikisource.org/wiki/The_Pickering_Manuscript/Auguries_of_Innocence",
        "image": {
          "src": "/covers/kenya-cyanide-pesticide-elephants--a2.png",
          "alt": "Portrait of poet William Blake in oils by Thomas Phillips, 1807",
          "credit": "Thomas Phillips, 1807; National Portrait Gallery, London (public domain) via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "George Orwell, 'Shooting an Elephant'",
        "excerpt": "In Orwell's 1936 essay a colonial policeman in Burma is pressured into shooting a working elephant that has run wild, and he fires against his own conscience only to please the crowd. The great beast does not die cleanly: it sinks slowly to its knees, breath still labouring in agonised gasps long after the fatal shots, its ruin drawn out and pitiable. The scene fixes on the terrible spectacle of an enormous, dignified animal brought low by human hands, and on the shame of a killing that solved nothing, an unease that shadows any encounter in which people destroy the majestic creatures they live beside.",
        "source": "George Orwell, 'Shooting an Elephant', in New Writing, no. 2 (Autumn 1936); collected in Shooting an Elephant and Other Essays (1950).",
        "href": "https://www.orwellfoundation.com/the-orwell-foundation/orwell/essays-and-other-works/shooting-an-elephant/"
      },
      {
        "category": "artistic",
        "title": "Camille Saint-Saëns, 'The Elephant' from The Carnival of the Animals",
        "excerpt": "Composed in 1886, Saint-Saëns's 'L'Éléphant' hands a waltz tune to the double bass, the orchestra's most ponderous voice, so that a melody borrowed from Berlioz and Mendelssohn lumbers along with heavy, comic grace. Beneath the humour the movement makes the listener feel the sheer bulk and lumbering dignity of the animal, a musical portrait of a great beast in motion, the very majesty that is extinguished when such creatures are found poisoned and still.",
        "source": "Camille Saint-Saëns, 'L'Éléphant', No. 5 of Le carnaval des animaux (1886; first published 1922).",
        "href": "https://imslp.org/wiki/Le_carnaval_des_animaux_(Saint-Sa%C3%ABns,_Camille)",
        "image": {
          "src": "/covers/kenya-cyanide-pesticide-elephants--a4.png",
          "alt": "Photographic portrait of composer Camille Saint-Saëns, 1900",
          "credit": "Pierre Petit, 1900 (public domain); via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Rembrandt van Rijn, 'An Elephant' (Hansken), 1637",
        "excerpt": "Rembrandt drew this elephant from life in Amsterdam in 1637, working in soft black chalk. The animal, a performing elephant named Hansken, is rendered with tender attention to her wrinkled hide, heavy limbs and gentle bearing, a living creature observed with wonder rather than a trophy or a curiosity. The drawing preserves the quiet majesty of a single great beast, the same presence mourned when fifteen elephants are found dead at a field's edge.",
        "source": "Rembrandt Harmenszoon van Rijn, An Elephant (Hansken), 1637, black chalk on paper, Albertina, Vienna (inv. 17558).",
        "href": "https://commons.wikimedia.org/wiki/File:Rembrandt_Harmenszoon_van_Rijn_-_An_Elephant,_1637_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/kenya-cyanide-pesticide-elephants--a5.png",
          "alt": "Rembrandt's 1637 black-chalk drawing of an elephant seen in profile",
          "credit": "Rembrandt van Rijn, 1637; Albertina, Vienna, via Google Art Project / Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 8
  },
  {
    "slug": "watts-towers-renovation-los-angeles",
    "headline": "Los Angeles will begin a $22 million renovation of Simon Rodia's Watts Towers in October",
    "overview": "A $22 million project to restore and expand the campus around the Watts Towers — the 17 interlaced spires the Italian immigrant Sabato \"Simon\" Rodia built by hand in Los Angeles between 1921 and 1954 from steel, mortar, broken tile and shells — is set to break ground in October and finish before the 2028 Olympics. Funded in part by a $10.1 million Bezos Earth Fund grant, the plan adds green space and climate-resilient landscaping after an earlier 15-year conservation effort stalled.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Artforum",
        "href": "https://www.artforum.com/news/22-million-renovation-of-la-watts-towers-to-begin-1234756029/"
      },
      {
        "name": "Office of the Mayor of Los Angeles",
        "href": "https://mayor.lacity.gov/news/mayor-bass-celebrates-major-milestone-watts-towers-arts-center-campus-improvements-move"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-30",
    "image": {
      "src": "/covers/watts-towers-renovation-los-angeles.png",
      "alt": "Simon Rodia's Watts Towers rising over Los Angeles",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 30 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Ferdinand Cheval's Palais idéal (1879-1912)",
        "excerpt": "A rural French postman, Ferdinand Cheval, spent thirty-three years building a fantastical palace entirely by hand from stones he gathered on his daily mail route, binding them with mortar into grottoes, towers, and sculpted beasts. Working alone and untrained, he raised an outsider-art marvel from cast-off pebbles and shells, carving into it his own defiant inscription that anyone more stubborn than he should try to do better. Like Rodia's spires, it is a lone visionary's lifetime dream made permanent in stone.",
        "source": "Ferdinand Cheval, Le Palais idéal du Facteur Cheval, Hauterives, France (built 1879-1912).",
        "href": "https://en.wikipedia.org/wiki/Ferdinand_Cheval",
        "image": {
          "src": "/covers/watts-towers-renovation-los-angeles--a0.png",
          "alt": "The east facade of Ferdinand Cheval's hand-built Palais idéal in Hauterives, France",
          "credit": "Photograph by Ankopedia, 2006; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "Cologne Cathedral (begun 1248, completed 1880)",
        "excerpt": "Begun in 1248, Cologne Cathedral rose only partway before work halted around 1473, leaving its unfinished south tower crowned for four centuries by a medieval wooden crane that became the city's skyline. The project was revived in the 19th century and finally completed in 1880, more than six hundred years after the first stone. Its stalled-then-resumed construction and the perpetual labor of preserving a fragile Gothic masterpiece mirror the Watts Towers' own interrupted conservation.",
        "source": "Cologne Cathedral (Kölner Dom), Cologne, Germany, constructed 1248-1880.",
        "href": "https://en.wikipedia.org/wiki/Cologne_Cathedral",
        "image": {
          "src": "/covers/watts-towers-renovation-los-angeles--a1.png",
          "alt": "Photograph of the unfinished Cologne Cathedral in 1865, its south tower still topped by the medieval crane",
          "credit": "Photograph by J. H. & Th. Schönscheidt, 1865; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Percy Bysshe Shelley, \"Ozymandias\" (1818)",
        "excerpt": "And on the pedestal these words appear: / \"My name is Ozymandias, king of kings: / Look on my works, ye Mighty, and despair!\" / Nothing beside remains. Round the decay / Of that colossal wreck, boundless and bare / The lone and level sands stretch far away.",
        "source": "Percy Bysshe Shelley, \"Ozymandias,\" in Rosalind and Helen, A Modern Eclogue; with Other Poems (London: C. and J. Ollier, 1819).",
        "href": "https://en.wikisource.org/wiki/Rosalind_and_Helen,_A_Modern_Eclogue_(1819)/Sonnet",
        "image": {
          "src": "/covers/watts-towers-renovation-los-angeles--a2.png",
          "alt": "The colossal granite bust of Ramesses II, the 'Younger Memnon,' in the British Museum, the statue that inspired Shelley's poem",
          "credit": "The 'Younger Memnon' (Ramesses II), British Museum; photograph via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Horace, Odes 3.30, \"Exegi monumentum\" (23 BC)",
        "excerpt": "Exegi monumentum aere perennius / regalique situ pyramidum altius, / quod non imber edax, non aquilo impotens / possit diruere aut innumerabilis / annorum series et fuga temporum.",
        "source": "Quintus Horatius Flaccus, Carmina (Odes), Book III, Ode 30, lines 1-5.",
        "href": "https://la.wikisource.org/wiki/Carmina_(Horatius)/Liber_III/Carmen_XXX",
        "image": {
          "src": "/covers/watts-towers-renovation-los-angeles--a3.png",
          "alt": "Imaginary portrait of the Roman poet Horace",
          "credit": "Imaginary portrait by Anton von Werner (d. 1915); public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Pieter Bruegel the Elder, The Tower of Babel (1563)",
        "excerpt": "Bruegel's panel shows an immense spiraling tower rising in tiers toward the clouds, swarming with cranes, scaffolds, and tiny laborers, its lower stories already weathering even as the upper courses climb. The painting captures both the grandeur of a monumental human structure raised course by course and the fragility and hubris of any attempt to build toward the heavens. It is the archetypal image of a marvel assembled by hand out of countless small pieces.",
        "source": "Pieter Bruegel the Elder, The Tower of Babel, 1563, oil on panel, Kunsthistorisches Museum, Vienna (inv. GG_1026).",
        "href": "https://en.wikipedia.org/wiki/The_Tower_of_Babel_(Bruegel)",
        "image": {
          "src": "/covers/watts-towers-renovation-los-angeles--a4.png",
          "alt": "Pieter Bruegel the Elder's 1563 painting of the Tower of Babel under construction",
          "credit": "Pieter Bruegel the Elder, 1563, Kunsthistorisches Museum, Vienna; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Modest Mussorgsky, \"The Great Gate of Kiev\" from Pictures at an Exhibition (1874)",
        "excerpt": "The suite's triumphant final movement translates architecture into sound: Mussorgsky was inspired by his late friend Viktor Hartmann's never-built design for a monumental stone city gate at Kiev. Massive, bell-like chords and a broadening hymn evoke a grand structure rising in imagination, a monument that could only ever be completed in art. It is a vision of a soaring gateway conjured from a single artist's drawings, much as Rodia's towers rose from one man's private vision.",
        "source": "Modest Mussorgsky, \"The Great Gate of Kiev,\" No. 10 of Pictures at an Exhibition, piano suite, 1874.",
        "href": "https://imslp.org/wiki/Pictures_at_an_Exhibition_(Mussorgsky,_Modest)",
        "image": {
          "src": "/covers/watts-towers-renovation-los-angeles--a5.png",
          "alt": "Viktor Hartmann's 1869 watercolor design for a monumental city gate at Kiev, which inspired Mussorgsky's movement",
          "credit": "Viktor Hartmann, Plan for a City Gate in Kiev, 1869, watercolor; public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 9
  },
  {
    "slug": "milei-argentina-deport-decree",
    "headline": "Milei signs a decree letting Argentina bar or deport foreigners who incite hatred against Argentines",
    "overview": "President Javier Milei signed an emergency decree empowering Argentina to deny entry to, deport, or revoke the visas of foreigners found to have promoted hatred or violence against Argentines or to have desecrated national symbols. The move follows weeks of international backlash Milei calls an \"anti-Argentina campaign,\" which has spiraled into a diplomatic crisis with Brazil; the decree exempts protected political, academic and civic criticism.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMijgFBVV95cUxOUDhveWdjTHFlTVpVLS14emJtaC1KYk5RcG5uMGFoRmQtd0VNVEc4WUlJY1VFd0lGa2FWbzdDNmlBNmRGbUJaamNKUFBScXk5WUhLNGxQYlV2TEpMYWFmczNJM3NRandsRWFjUThDRFRfblEtenh1MThUNEJ5MUhWSG5ENHplX29jWURUR0x3?oc=5"
      },
      {
        "name": "Buenos Aires Times",
        "href": "https://www.batimes.com.ar/news/argentina/milei-signs-decree-allowing-argentina-to-bar-or-expel-foreigners-over-hate-speech.phtml"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-30",
    "image": {
      "src": "/covers/milei-argentina-deport-decree.png",
      "alt": "The Casa Rosada, Argentina's presidential palace, in Buenos Aires",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 30 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Ostracism of Aristides 'the Just' at Athens (482 BC)",
        "excerpt": "As therefore, they were writing the names on the sherds, it is reported that an illiterate clownish fellow, giving Aristides his sherd, supposing him a common citizen, begged him to write Aristides upon it; and he being surprised and asking if Aristides had ever done him any injury, 'None at all,' said he, 'neither know I the man; but I am tired of hearing him everywhere called the just.'",
        "source": "Plutarch, Life of Aristides, ch. 7, trans. John Dryden, rev. Arthur Hugh Clough. Athenian ostracism let the assembly banish a citizen for ten years by potsherd vote, with no charge, trial, or defense.",
        "href": "https://classics.mit.edu/Plutarch/aristide.html",
        "image": {
          "src": "/covers/milei-argentina-deport-decree--a0.png",
          "alt": "Ancient Athenian ostraka (inscribed pottery shards) used to vote a citizen into exile, 482 BC, Museum of the Ancient Agora, Athens",
          "credit": "Photo: Carole Raddato, Frankfurt (CC BY-SA 2.0), via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "The Alien Friends Act of 1798",
        "excerpt": "it shall be lawful for the President of the United States at any time during the continuance of this act, to order all such aliens as he shall judge dangerous to the peace and safety of the United States, or shall have reasonable grounds to suspect are concerned in any treasonable or secret machinations against the government thereof, to depart out of the territory of the United States",
        "source": "An Act Concerning Aliens (the Alien Friends Act), June 25, 1798, 1 Stat. 570, 5th U.S. Congress. Signed amid the anti-French 'Quasi-War' panic, it let President John Adams deport any non-citizen he alone deemed dangerous, without trial.",
        "href": "https://en.wikisource.org/wiki/United_States_Statutes_at_Large/Volume_1/5th_Congress/2nd_Session/Chapter_58",
        "image": {
          "src": "/covers/milei-argentina-deport-decree--a1.png",
          "alt": "Portrait of President John Adams, who signed and could enforce the 1798 Alien Friends Act, by Gilbert Stuart",
          "credit": "Gilbert Stuart, c. 1800-1815, National Gallery of Art, Washington (CC0), via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Ovid, Tristia — the poet's last night in Rome before exile",
        "excerpt": "Cum subit illius tristissima noctis imago, / quae mihi supremum tempus in urbe fuit,",
        "source": "Ovid, Tristia 1.3.1-2 (Latin). 'When there steals upon me the saddest image of that night which was my last hour in the city.' Ovid was relegated by the Emperor Augustus to Tomis on the Black Sea in AD 8, banished, he wrote, for 'carmen et error' — a poem and a mistake.",
        "href": "https://www.thelatinlibrary.com/ovid/ovid.tristia1.shtml",
        "image": {
          "src": "/covers/milei-argentina-deport-decree--a2.png",
          "alt": "Eugène Delacroix, 'Ovid among the Scythians,' showing the exiled poet among strangers in his place of banishment",
          "credit": "Eugène Delacroix, 1862, The Metropolitan Museum of Art (public domain / open access), via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Shakespeare, Richard II — the banishment of Mowbray",
        "excerpt": "The language I have learn'd these forty years, / My native English, now I must forego:",
        "source": "William Shakespeare, King Richard II, Act 1, Scene 3. Thomas Mowbray, sentenced to perpetual banishment by the king, laments that exile robs him of his own tongue and homeland — punishment by expulsion for a quarrel of words at court.",
        "href": "https://shakespeare.mit.edu/richardii/richardii.1.3.html",
        "image": {
          "src": "/covers/milei-argentina-deport-decree--a3.png",
          "alt": "The Westminster Portrait of King Richard II of England, the monarch who decrees banishment in Shakespeare's play",
          "credit": "Anonymous, 1390s, Westminster Abbey, London (public domain), via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Verdi, 'Va, pensiero' (Chorus of the Hebrew Slaves), from Nabucco",
        "excerpt": "Va, pensiero, sull'ali dorate; / va, ti posa sui clivi, sui colli, / ove olezzano tepide e molli / l'aure dolci del suolo natal!",
        "source": "Giuseppe Verdi, Nabucco (1842), Part III; libretto by Temistocle Solera after Psalm 137. The chorus of the Hebrews, deported to Babylon, sends its thoughts on golden wings back to the lost homeland; it became an anthem of a nation under foreign domination.",
        "href": "https://imslp.org/wiki/Nabucco_(Verdi,_Giuseppe)",
        "image": {
          "src": "/covers/milei-argentina-deport-decree--a4.png",
          "alt": "Eduard Bendemann, 'The Mourning Jews in Exile,' depicting the Babylonian captivity of Psalm 137 that inspired 'Va, pensiero'",
          "credit": "Eduard Bendemann, c. 1832, Wallraf-Richartz Museum, Cologne (public domain), via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Masaccio, The Expulsion from the Garden of Eden",
        "excerpt": "Adam and Eve stagger through the gate of Paradise beneath a red-robed, black-winged angel who drives them out with a sword. Eve howls with her head flung back and her hands covering her body; Adam buries his face in his palms, doubled over with shame. In this stark fresco Masaccio renders the archetypal banishment — the first exiles cast from their homeland for a transgression against a higher authority, condemned to wander outside the walls forever.",
        "source": "Masaccio, 'Cacciata dei progenitori dall'Eden' (The Expulsion of Adam and Eve from Eden), fresco, c. 1425, Brancacci Chapel, Santa Maria del Carmine, Florence.",
        "href": "https://en.wikipedia.org/wiki/The_Expulsion_from_the_Garden_of_Eden",
        "image": {
          "src": "/covers/milei-argentina-deport-decree--a5.png",
          "alt": "Masaccio's fresco of Adam and Eve expelled from Eden by a sword-bearing angel, faces contorted in grief",
          "credit": "Masaccio, c. 1425, Brancacci Chapel, Florence (public domain), via Wikimedia Commons"
        }
      }
    ],
    "rank": 10
  },
  {
    "slug": "saudi-red-sea-maritime-coalition",
    "headline": "Saudi Arabia unveils a multinational Red Sea maritime coalition after Houthi attacks on shipping",
    "overview": "Saudi Arabia proposed a multinational maritime defense coalition to protect shipping and energy routes in the Red Sea, the Bab el-Mandeb Strait and the Gulf of Aden, with representatives of 43 countries and the European Union attending a founding meeting in which Riyadh offered to lead and host the alliance. The initiative follows a wave of attacks by Yemen's Iran-aligned Houthis, who declared a naval blockade of Saudi Arabia on 20 July.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMivgFBVV95cUxQVVV1X2lpNHZQWlFIclZsaER1azctU1NVTk5FcjhEYTVULU9NU1JibElRWUYzWllrZFRKY3NiYVRKdnVhS0hoWkRMeWczMnZXX2Y0UnNrMlVPQzN5QWRnMVFacTBPQkNEZ29BTzh0M2dRSU9BZ1ZZNmN0RHoxaE5GbW5aR3NETW5fREF6UklGUHo5ZkM3NTVDdHpkUXNFY0hWZmxUZHB0aEk1NDBtUEd2VTJqV2RwazVoY0lPYnhR?oc=5"
      },
      {
        "name": "Al Jazeera",
        "href": "https://www.aljazeera.com/news/2026/7/30/saudi-arabia-announces-maritime-defence-alliance-to-secure-vital-waterways"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-30",
    "image": {
      "src": "/covers/saudi-red-sea-maritime-coalition.png",
      "alt": "A naval warship escorting shipping in the Gulf of Aden",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 30 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Pompey Clears the Mediterranean of Pirates (67 BC)",
        "excerpt": "This piratic power having got the dominion and control of all the Mediterranean, there was left no place for navigation or commerce. And this it was which most of all made the Romans, finding themselves to be extremely straitened in their markets, and considering that if it should continue, there would be a dearth and famine in the land, determine at last to send out Pompey to recover the seas from the pirates.",
        "source": "Plutarch, Life of Pompey, ch. 24-25, trans. John Dryden (rev. A. H. Clough)",
        "href": "https://en.wikisource.org/wiki/Plutarch%27s_Lives_(Clough)/Life_of_Pompey",
        "image": {
          "src": "/covers/saudi-red-sea-maritime-coalition--a0.png",
          "alt": "Roman marble bust of Pompey the Great, Louvre Museum",
          "credit": "Bust of Pompey, Louvre; photo via Wikimedia Commons, CC BY-SA 4.0"
        }
      },
      {
        "category": "historical",
        "title": "Jefferson Sends a Squadron in the First Barbary War (1801)",
        "excerpt": "Tripoli, the least considerable of the Barbary States, had come forward with demands unfounded either in right or in compact, and had permitted itself to denounce war, on our failure to comply before a given day. ... I sent a small squadron of frigates into the Mediterranean, with assurances to that power of our sincere desire to remain in peace, but with orders to protect our commerce against the threatened attack.",
        "source": "Thomas Jefferson, First Annual Message to Congress, December 8, 1801",
        "href": "https://avalon.law.yale.edu/19th_century/jeffmes1.asp",
        "image": {
          "src": "/covers/saudi-red-sea-maritime-coalition--a1.png",
          "alt": "The U.S. schooner Enterprise capturing the Tripolitan corsair Tripoli, 1 August 1801",
          "credit": "Capt. William Bainbridge Hoff, USN (1878), U.S. Naval History collection, public domain via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "The Odyssey: The Strait of Scylla and Charybdis",
        "excerpt": "Three times in the day does she vomit forth her waters, and three times she sucks them down again ... you must hug the Scylla side and drive your ship by as fast as you can, for you had better lose six men than your whole crew.",
        "source": "Homer, The Odyssey, Book XII, trans. Samuel Butler (prose, 1900)",
        "href": "https://en.wikisource.org/wiki/The_Odyssey_(Butler)/Book_XII",
        "image": {
          "src": "/covers/saudi-red-sea-maritime-coalition--a2.png",
          "alt": "Henry Fuseli, Odysseus in front of Scylla and Charybdis",
          "credit": "Henry Fuseli (Johann Heinrich Füssli), c. 1794-96; public domain via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Thucydides on Minos and the First Navy to Suppress Piracy",
        "excerpt": "And the first person known to us by tradition as having established a navy is Minos. He made himself master of what is now called the Hellenic sea, and ruled over the Cyclades, into most of which he sent the first colonies, expelling the Carians and appointing his own sons governors; and thus did his best to put down piracy in those waters, a necessary step to secure the revenues for his own use.",
        "source": "Thucydides, History of the Peloponnesian War, Book I.4, trans. Richard Crawley",
        "href": "https://en.wikisource.org/wiki/History_of_the_Peloponnesian_War/Book_1",
        "image": {
          "src": "/covers/saudi-red-sea-maritime-coalition--a3.png",
          "alt": "Marble bust of the historian Thucydides, Royal Ontario Museum",
          "credit": "Photo by Captmondo, Royal Ontario Museum; public domain via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "The Battle of Lepanto, 7 October 1571",
        "excerpt": "This large late-16th-century canvas turns a decisive naval clash into a wall of massed galleys, oars and banners locked together in the narrow water where a coalition of Christian states halted Ottoman sea power. Smoke and crowded rigging fill the horizon while the two fleets grind hull to hull, dramatizing how the fate of Mediterranean trade and passage hung on a single line of ships. The painting reads as a portrait of allied navies combining to keep a contested sea open.",
        "source": "H. Letter (active late 16th C.), 'The Battle of Lepanto, 7 October 1571', oil on canvas, BHC0261, National Maritime Museum, Greenwich",
        "href": "https://commons.wikimedia.org/wiki/File:H._Letter_(active_late_16th_C)_-_The_Battle_of_Lepanto,_7_October_1571_-_BHC0261_-_National_Maritime_Museum.jpg",
        "image": {
          "src": "/covers/saudi-red-sea-maritime-coalition--a4.png",
          "alt": "Painting of the Battle of Lepanto showing massed galleys of the Holy League and the Ottoman fleet",
          "credit": "H. Letter, National Maritime Museum, Greenwich (BHC0261); public domain via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Mendelssohn, 'Calm Sea and Prosperous Voyage' Overture, Op. 27",
        "excerpt": "Mendelssohn opens on a becalmed sea, the strings held in a vast, almost menacing stillness where a ship lies motionless and trade cannot move. Then a breeze stirs, the wind fills the sails, and the music surges into bright, driving motion toward a safe and welcoming harbor. The overture stages in sound the whole anxiety of a threatened sea-lane and the relief of a voyage carried through to open passage and safe arrival.",
        "source": "Felix Mendelssohn, Meeresstille und glückliche Fahrt (Calm Sea and Prosperous Voyage), Op. 27 (1828), after Goethe",
        "href": "https://imslp.org/wiki/Meeresstille_und_gl%C3%BCckliche_Fahrt,_Op.27_(Mendelssohn,_Felix)",
        "image": {
          "src": "/covers/saudi-red-sea-maritime-coalition--a5.png",
          "alt": "Portrait of composer Felix Mendelssohn by Eduard Magnus",
          "credit": "Eduard Magnus, 1833; public domain via Wikimedia Commons"
        }
      }
    ],
    "rank": 11
  },
  {
    "slug": "apple-third-quarter-earnings",
    "headline": "Apple's revenue jumps 16% to a record $109.4 billion on strong iPhone sales, but services fall short",
    "overview": "Apple reported fiscal third-quarter revenue of $109.4 billion, up 16% and a June-quarter record, with profit of $29.8 billion as iPhone sales rose about 22% to $54.3 billion. Services revenue grew 12% to $30.7 billion but missed Wall Street's estimate, and the shares fell about 8% after hours as Apple issued cautious guidance citing supply constraints.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiuAFBVV95cUxPanFaaGdUMnRidmVSWXhQVXVDeG9fazRla240ZEFBdmhIcGJINkVvUVRhb1d0NGx2cEluMnlxYWdjVWpSWmJLbDdiWXE1LVVxVGR0Zm9yeVVfS1Z5RFN1cDB2M0ZRelQ2MnFhZHlfdm9ySHREOFhJVFFRc2xOMUowdzVISlY4aHpoQWRKYzcwN3ZQNV9mSFV6T3FPYjdobDFOdmF3WVRzODk5Z0Z0WF9mSW5xZS1IVXlM?oc=5"
      },
      {
        "name": "Apple",
        "href": "https://www.apple.com/newsroom/2026/07/apple-reports-third-quarter-results/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-30",
    "image": {
      "src": "/covers/apple-third-quarter-earnings.png",
      "alt": "Aerial view of Apple Park, the company's headquarters in Cupertino",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 30 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Croesus of Lydia, warned at the height of his golden wealth (Herodotus)",
        "excerpt": "But we must of every thing examine the end and how it will turn out at the last, for to many God shows but a glimpse of happiness and then plucks them up by the roots and overturns them.",
        "source": "Herodotus, The Histories, Book I.32 — Solon's warning to King Croesus, the richest man of his age; trans. G. C. Macaulay.",
        "href": "https://www.gutenberg.org/files/2707/2707-h/2707-h.htm",
        "image": {
          "src": "/covers/apple-third-quarter-earnings--a0.png",
          "alt": "Attic red-figure amphora showing King Croesus enthroned upon his blazing pyre, his golden fortune undone.",
          "credit": "Myson (Attic red-figure amphora, c. 500-490 BC), Louvre G197. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "Tulipomania, 1637 — the market's rapture and reckoning (Mackay)",
        "excerpt": "In 1634, the rage among the Dutch to possess them was so great that the ordinary industry of the country was neglected, and the population, even to its lowest dregs, embarked in the tulip trade.",
        "source": "Charles Mackay, Memoirs of Extraordinary Popular Delusions and the Madness of Crowds (1841), 'The Tulipomania'.",
        "href": "https://www.gutenberg.org/files/24518/24518-h/24518-h.htm",
        "image": {
          "src": "/covers/apple-third-quarter-earnings--a1.png",
          "alt": "Seventeenth-century watercolour of the flamed red-and-white Semper Augustus tulip, the single most coveted bulb of the mania.",
          "credit": "Unknown artist, 17th-century watercolour of the 'Semper Augustus' tulip. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "The golden Apple of Discord and the Judgement of Paris (Lucian)",
        "excerpt": "Hermes, take this apple, and go with it to Phrygia; on the Gargaran peak of Ida you will find Priam's son, the herdsman. Give him this message: `Paris, because you are handsome, and wise in the things of love, Zeus commands you to judge between the Goddesses, and say which is the most beautiful. And the prize shall be this apple.'",
        "source": "Lucian of Samosata, 'The Judgement of Paris,' Dialogues of the Gods; trans. H. W. & F. G. Fowler (1905).",
        "href": "https://www.theoi.com/Text/LucianDialoguesGods1.html",
        "image": {
          "src": "/covers/apple-third-quarter-earnings--a2.png",
          "alt": "Rubens painting of Paris awarding the golden apple to one of three goddesses, the single choice that seeds ruin.",
          "credit": "Peter Paul Rubens, The Judgement of Paris (c. 1632-35), National Gallery, London. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Eden's forbidden fruit — the one taste that costs everything (Milton)",
        "excerpt": "Of Man's first disobedience, and the fruit / Of that forbidden tree whose mortal taste / Brought death into the World, and all our woe, / With loss of Eden, till one greater Man / Restore us, and regain the blissful seat, / Sing, Heavenly Muse...",
        "source": "John Milton, Paradise Lost (1667), Book I, lines 1-6.",
        "href": "https://www.gutenberg.org/cache/epub/26/pg26.txt",
        "image": {
          "src": "/covers/apple-third-quarter-earnings--a3.png",
          "alt": "Cranach's Adam and Eve beneath the apple tree, Eve holding the forbidden fruit as the serpent looks on.",
          "credit": "Lucas Cranach the Elder, Adam and Eve (1526), Courtauld Institute of Art, London. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Cézanne's apples — humble fruit remade into monumental value",
        "excerpt": "A cloth-draped tabletop tilts toward the viewer, crowded with round apples in reds, golds and greens that seem to swell with weight and light. Cézanne famously said he would 'astonish Paris with an apple,' turning the plainest of objects into the cornerstone of modern painting. The still, ordinary fruit becomes a study in how worth is assigned — a few apples freighted with the whole future of art.",
        "source": "Paul Cézanne, Still Life with Apples (1893-1894), oil on canvas, J. Paul Getty Museum, Los Angeles (96.PA.8).",
        "href": "https://commons.wikimedia.org/wiki/File:Paul_C%C3%A9zanne_-_Still_Life_with_Apples_-_96.PA.8_-_J._Paul_Getty_Museum.jpg",
        "image": {
          "src": "/covers/apple-third-quarter-earnings--a4.png",
          "alt": "Cézanne oil painting of a cluster of apples and fruit on a draped table, rendered in dense patches of color.",
          "credit": "Paul Cézanne, Still Life with Apples (1893-94), J. Paul Getty Museum (96.PA.8). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Wagner's golden apples of Freia — youth that decays the moment it is withheld (Das Rheingold)",
        "excerpt": "Golden apples ripen within her garden, she alone knoweth how they are tended; the gardens' fruit grants to her kindred, each day renewed, youth ever-lasting: pale and blighted passeth their beauty, old and weak waste they away, if e'er Freia should fail them.",
        "source": "Richard Wagner, Das Rheingold (1869), Scene 2 — the giant Fafner on Freia's golden apples; English singing translation by Frederick Jameson.",
        "href": "https://imslp.org/wiki/Das_Rheingold,_WWV_86A_(Wagner,_Richard)",
        "image": {
          "src": "/covers/apple-third-quarter-earnings--a5.png",
          "alt": "Arthur Rackham illustration of the giants Fasolt and Fafner seizing Freia, keeper of the gods' golden apples of youth.",
          "credit": "Arthur Rackham, illustration for Wagner's The Rhinegold & the Valkyrie (1910). Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 12
  },
  {
    "slug": "uk-us-museums-unite-trump-smithsonian",
    "headline": "Britain's Museums Association joins U.S. museums in condemning Trump's pressure on the Smithsonian",
    "overview": "The UK's Museums Association publicly backed a statement by the American Alliance of Museums opposing the Trump administration's campaign against the Smithsonian, after an executive order demanded \"corrective\" signage and a White House report attacked exhibits for portraying Western values as harmful. The alliance warned that efforts to politicize how museums present history and \"personal attacks on museum professionals\" threaten their independence.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Artforum",
        "href": "https://www.artforum.com/news/u-k-museums-unite-with-american-museums-against-trump-1234756038/"
      },
      {
        "name": "Museums Association",
        "href": "https://www.museumsassociation.org/museums-journal/news/2026/07/american-alliance-of-museums-backs-smithsonian-institution/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-30",
    "image": {
      "src": "/covers/uk-us-museums-unite-trump-smithsonian.png",
      "alt": "The Smithsonian Institution Building, the Castle, in Washington",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 30 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Damnatio memoriae and the erased face of Geta (Severan Tondo, c. AD 200)",
        "excerpt": "When Caracalla had his brother Geta murdered in AD 211, the Roman Senate decreed his damnatio memoriae: his name was chiselled from inscriptions and coins melted down. On this rare surviving painted panel of the imperial family, Geta's face has been deliberately scrubbed to bare wood and smeared with excrement, leaving a blank hole where a co-emperor once looked out. It is the state's oldest instinct made visible: to control the future, first delete the record of the past.",
        "source": "Severan Tondo (Tondo of the Severan family), tempera on wood, c. AD 199-200, from Djemila (Roman Cuicul), Algeria; Antikensammlung, Altes Museum, Berlin.",
        "href": "https://en.wikipedia.org/wiki/Severan_Tondo",
        "image": {
          "src": "/covers/uk-us-museums-unite-trump-smithsonian--a0.png",
          "alt": "Painted circular panel of the Severan imperial family; the face of the boy Geta has been scratched away to bare wood.",
          "credit": "Antikensammlung, Altes Museum, Berlin. Photo: Carole Raddato, CC BY-SA 2.0, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "The commissar vanishes: Soviet airbrushing of the photographic record",
        "excerpt": "After Nikolai Yezhov, Stalin's secret-police chief, was arrested and shot in the Great Purge, retouchers went to work on the official photographs in which he stood beside Stalin at the Moscow-Volga Canal. In the altered print he is simply gone, the water smoothed over the spot where a man once stood. Across Stalin's rule, disgraced figures were airbrushed from images and cut from encyclopedias so that the pictorial history matched the leader's current truth.",
        "source": "Altered Soviet press photograph, April 1937, Nikolai Yezhov removed after his 1940 execution; documented in David King, 'The Commissar Vanishes: The Falsification of Photographs and Art in Stalin's Russia' (1997).",
        "href": "https://en.wikipedia.org/wiki/The_Commissar_Vanishes",
        "image": {
          "src": "/covers/uk-us-museums-unite-trump-smithsonian--a1.png",
          "alt": "Doctored Soviet photograph of Stalin and Molotov walking by a canal, with Nikolai Yezhov airbrushed out and replaced by water.",
          "credit": "Unknown Soviet photographer, 1937; public domain (PD-Russia-1996), via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Milton, 'Areopagitica' (1644): killing a good book kills reason itself",
        "excerpt": "as good almost kill a man as kill a good book. Who kills a man kills a reasonable creature, God's image; but he who destroys a good book, kills reason itself, kills the image of God, as it were in the eye.",
        "source": "John Milton, 'Areopagitica: A Speech for the Liberty of Unlicensed Printing, to the Parliament of England' (London, 1644).",
        "href": "https://www.gutenberg.org/ebooks/608",
        "image": {
          "src": "/covers/uk-us-museums-unite-trump-smithsonian--a2.png",
          "alt": "Title page of the first edition of John Milton's Areopagitica, printed 1644.",
          "credit": "Library of Congress Rare Book and Special Collections Division; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Orwell's 'Nineteen Eighty-Four' (1949): the Ministry of Truth",
        "excerpt": "In Orwell's dystopia the protagonist works at the Ministry of Truth, where his daily job is to rewrite old newspapers so that the record always confirms the Party's present line; inconvenient facts and unpersons are dropped into the 'memory hole' to be burned. The novel's central warning is that a regime which controls how the past is recorded controls the future, and that erasing evidence eventually erases the very possibility of independent thought.",
        "source": "George Orwell, 'Nineteen Eighty-Four' (Secker & Warburg, London, 1949).",
        "href": "https://en.wikipedia.org/wiki/Nineteen_Eighty-Four"
      },
      {
        "category": "artistic",
        "title": "Shostakovich and 'Muddle Instead of Music' (Pravda, 1936)",
        "excerpt": "In January 1936 the Communist Party newspaper Pravda ran an unsigned editorial, 'Muddle Instead of Music,' savaging Shostakovich's opera 'Lady Macbeth of the Mtsensk District' as formalist noise hostile to the Soviet people, ending with the veiled threat that 'this game may end very badly.' The composer, suddenly a target, withdrew his Fourth Symphony and answered with a Fifth cautiously subtitled a Soviet artist's reply to just criticism, composing for years with a packed suitcase by the door. It is a case study in a state dictating how art must speak and punishing the artist personally when it does not.",
        "source": "'Sumbur vmesto muzyki' ('Muddle Instead of Music'), editorial, Pravda, 28 January 1936, denouncing Dmitri Shostakovich's opera 'Lady Macbeth of the Mtsensk District.'",
        "href": "https://en.wikipedia.org/wiki/Muddle_Instead_of_Music",
        "image": {
          "src": "/covers/uk-us-museums-unite-trump-smithsonian--a4.png",
          "alt": "Portrait photograph of composer Dmitri Shostakovich in the audience at a Bach celebration, 1950.",
          "credit": "Photo by Roger & Renate Rössing, 1950, Deutsche Fotothek; CC BY-SA 3.0 DE, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Dirck van Delen, 'Iconoclasm in a Church' (1630)",
        "excerpt": "Van Delen's panel shows a church interior being stripped of its images: a man on a ladder loops a noose around the neck of a saint's statue while others below prepare to haul it down, and at the right a carved figure lies hacked in two. Painted a lifetime after the Dutch Beeldenstorm, it is the only known painting of that wave of image-breaking, and it captures the moment when a change of official belief becomes the physical destruction of a culture's monuments and memory.",
        "source": "Dirck van Delen, 'Iconoclasm in a Church' (Beeldenstorm in een kerk), oil on panel, 1630, Rijksmuseum, Amsterdam (SK-A-4992).",
        "href": "https://www.rijksmuseum.nl/en/collection/SK-A-4992",
        "image": {
          "src": "/covers/uk-us-museums-unite-trump-smithsonian--a5.png",
          "alt": "Painting of a church interior where men on ladders noose and topple religious statues and smash carved figures.",
          "credit": "Dirck van Delen, 1630, Rijksmuseum Amsterdam (SK-A-4992); public domain / CC0, via Wikimedia Commons."
        }
      }
    ],
    "rank": 13
  },
  {
    "slug": "us-strikes-iran-irgc-targets-troops",
    "headline": "U.S. launches heavy strikes on dozens of Iranian Revolutionary Guard targets a day after foiling a missile attack on American troops",
    "overview": "The U.S. military said it carried out heavy strikes lasting about two hours against dozens of targets belonging to Iran's Islamic Revolutionary Guard Corps, a day after intercepting an Iranian missile attack aimed at American forces. The barrage marks a sharp escalation after a brief pause in hostilities, and both sides have now resumed missile exchanges as diplomacy stalls.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMipgFBVV95cUxNUjlxdTM1SnYtZ3Bzei1qLUpRXzlYanVpb1MwNnRuQjY2NmkzZHNTeEl5cGljWGE5VDQ5ZHF0djVzVnV5OEprZWdlWUpPMV9fanYyN1N5cHdhbkxBZC1fZTlHWmpRMG8zdlRZV0hLSW9nTHU0S3JDZU44WWVHbnhWZVhRTVJ1Z0RaM25nR09fTFNTMUR2SVNkVXdlVHpDZHRmMXlJdDN3?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c74gwdzywmeo"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-30",
    "image": {
      "src": "/covers/us-strikes-iran-irgc-targets-troops.png",
      "alt": "Smoke rises over a city skyline after military strikes",
      "credit": "BBC"
    },
    "edition": "Morning Edition · 30 July 2026",
    "lead": true,
    "analogies": [
      {
        "category": "historical",
        "title": "Darius Vows to Remember the Athenians",
        "excerpt": "he asked for his bow, and having received it and placed an arrow upon the string, he discharged it upwards towards heaven, and as he shot into the air he said: \"Zeus, that it may be granted me to take vengeance upon the Athenians!\" Having so said he charged one of his attendants, that when dinner was set before the king he should say always three times: \"Master, remember the Athenians.\"",
        "source": "Herodotus, The History of Herodotus, Book V.105, trans. G. C. Macaulay (London: Macmillan, 1890), Vol. 2.",
        "href": "https://www.gutenberg.org/cache/epub/2456/pg2456.txt",
        "image": {
          "src": "/covers/us-strikes-iran-irgc-targets-troops--a0.png",
          "alt": "The Behistun rock relief of Darius the Great trampling a rebel, with captive kings before him",
          "credit": "Behistun (Bisotun) relief of Darius I, Achaemenid period c. 520 BC, Kermanshah, Iran; photograph public domain via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "Kennedy's Full Retaliatory Response",
        "excerpt": "It shall be the policy of this Nation to regard any nuclear missile launched from Cuba against any nation in the Western Hemisphere as an attack by the Soviet Union on the United States, requiring a full retaliatory response upon the Soviet Union.",
        "source": "John F. Kennedy, \"Radio and Television Report to the American People on the Soviet Arms Buildup in Cuba,\" October 22, 1962.",
        "href": "https://en.wikisource.org/wiki/John_F._Kennedy%27s_Address_on_the_Buildup_of_Arms_in_Cuba",
        "image": {
          "src": "/covers/us-strikes-iran-irgc-targets-troops--a1.png",
          "alt": "President John F. Kennedy signing Proclamation 3504 authorizing the naval quarantine of Cuba, October 23, 1962",
          "credit": "President Kennedy signs Proclamation 3504, 23 Oct 1962; photo by Cecil Stoughton, White House / JFK Presidential Library; public domain (U.S. Government work)."
        }
      },
      {
        "category": "literary",
        "title": "Achilles Swears to Avenge Patroclus",
        "excerpt": "nay, I will not live nor go about among mankind unless Hector fall by my spear, and thus pay me for having slain Patroclus son of Menoetius.",
        "source": "Homer, The Iliad, Book XVIII, trans. Samuel Butler (London: Longmans, Green, 1898).",
        "href": "https://www.gutenberg.org/cache/epub/2199/pg2199.txt",
        "image": {
          "src": "/covers/us-strikes-iran-irgc-targets-troops--a2.png",
          "alt": "Achilles binding the wounds of Patroclus, Attic red-figure kylix",
          "credit": "Achilles tending Patroclus, Attic red-figure kylix by the Sosias Painter, c. 500 BC, Antikensammlung Berlin (F2278); photograph public domain via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "The Song of Lamech",
        "excerpt": "And Lamech said unto his wives, Adah and Zillah, Hear my voice; ye wives of Lamech, hearken unto my speech: for I have slain a man to my wounding, and a young man to my hurt. If Cain shall be avenged sevenfold, truly Lamech seventy and sevenfold.",
        "source": "Genesis 4:23-24, The Holy Bible, King James Version (1611).",
        "href": "https://www.gutenberg.org/cache/epub/10/pg10.txt",
        "image": {
          "src": "/covers/us-strikes-iran-irgc-targets-troops--a3.png",
          "alt": "Engraving of the blind Lamech having slain Cain, with an attendant",
          "credit": "Lucas van Leyden, Lamech and Cain, engraving, 1524, National Gallery of Art, Washington; public domain."
        }
      },
      {
        "category": "artistic",
        "title": "The Third of May 1808",
        "excerpt": "A firing squad, faceless and mechanical, aims its rifles in a single rigid line at a knot of terrified townsmen. One man throws his arms wide against the muzzles, lit stark white by a lantern on the ground, while the corpses of those already shot bleed into the dark earth. Goya freezes the exact instant of reprisal, the moment when retaliation stops being justice and becomes slaughter answered by slaughter.",
        "source": "Francisco de Goya, El tres de mayo de 1808 en Madrid (The Third of May 1808), 1814, oil on canvas, Museo Nacional del Prado, Madrid.",
        "href": "https://commons.wikimedia.org/wiki/File:El_Tres_de_Mayo,_by_Francisco_de_Goya,_from_Prado_thin_black_margin.jpg",
        "image": {
          "src": "/covers/us-strikes-iran-irgc-targets-troops--a4.png",
          "alt": "Goya's The Third of May 1808: a man in a white shirt with arms raised faces a firing squad by lantern light",
          "credit": "Francisco de Goya, The Third of May 1808, 1814, oil on canvas, Museo Nacional del Prado, Madrid; public domain."
        }
      },
      {
        "category": "artistic",
        "title": "Tchaikovsky's 1812 Overture",
        "excerpt": "A solemn Orthodox hymn is torn apart as the strains of an enemy anthem push in, and the orchestra answers force with force. Snarling brass and racing strings trade blows until live cannon fire punctuates the score, each detonation a reply to the last. Tchaikovsky turns the arithmetic of attack and counterattack into music, ending not in peace but in the thunder of guns and pealing bells.",
        "source": "Pyotr Ilyich Tchaikovsky, The Year 1812, Festival Overture in E-flat major, Op. 49 (1880).",
        "href": "https://imslp.org/wiki/1812_Overture,_Op.49_(Tchaikovsky,_Pyotr)",
        "image": {
          "src": "/covers/us-strikes-iran-irgc-targets-troops--a5.png",
          "alt": "Photographic portrait of composer Pyotr Ilyich Tchaikovsky",
          "credit": "Pyotr Ilyich Tchaikovsky, photograph by Charles Reutlinger, c. 1870s; public domain via Wikimedia Commons."
        }
      }
    ],
    "rank": 14
  },
  {
    "slug": "poland-crater-missile-russian-tusk",
    "headline": "A missile that gouged a 10-metre crater deep inside Poland was probably Russian, Prime Minister Donald Tusk says",
    "overview": "Polish Prime Minister Donald Tusk said an unidentified object that left a crater about 10 metres wide near the village of Tarnawa Kolonia, roughly 100 kilometres from the Ukrainian border, was probably a Russian missile fired during an assault on the Ukrainian city of Lviv. The incident deep inside NATO territory came as Russian strikes across Ukraine killed at least eight people.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cwymkgenv2ro"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiwgFBVV95cUxQTjY4dFJnUXNtdWVUZkJZRVVjRnB1cTBISWJrUFhSc1dRbnpqanF4U3dteloxRHdOcjB5bEJSZ1J4SlFGYTIwR001Qk1XVjJzVnpsQkUteDlrakxYeXYwZHZMTjk5b1pZdHQtcjluZkE0OUFodWRobWcxMm1pYV9hSFlUNFI1YmxmMl9iMF9yeWJtR0Z4RzdJZVFENFdvN2UybWNJWlhma2dWVGtQeVNfWW9BV2dWVmJNVlpvV18zMmlxQQ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-30",
    "image": {
      "src": "/covers/poland-crater-missile-russian-tusk.png",
      "alt": "A crater in a field left by a missile strike",
      "credit": "BBC"
    },
    "edition": "Morning Edition · 30 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Theban night-raid on Plataea",
        "excerpt": "a Theban force a little over three hundred strong, under the command of their Boeotarchs, Pythangelus, son of Phyleides, and Diemporus, son of Onetorides, about the first watch of the night, made an armed entry into Plataea, a town of Boeotia in alliance with Athens.",
        "source": "Thucydides, History of the Peloponnesian War, Book II.2, trans. Richard Crawley (Project Gutenberg eBook #7142).",
        "href": "https://www.gutenberg.org/files/7142/7142-h/7142-h.htm",
        "image": {
          "src": "/covers/poland-crater-missile-russian-tusk--a0.png",
          "alt": "Marble portrait bust of the historian Thucydides",
          "credit": "Bust of Thucydides, Royal Ontario Museum; photograph via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "historical",
        "title": "Britain and the violation of Belgium, 1914",
        "excerpt": "If in this war which is before Europe the neutrality of one of those countries is violated, if the troops of one of the combatants violate its neutrality and no-action be taken to resent it, at the end of the war, whatever the integrity may be the independence will be gone.",
        "source": "Sir Edward Grey, Statement to the House of Commons, 3 August 1914, HC Deb, Historic Hansard.",
        "href": "https://api.parliament.uk/historic-hansard/commons/1914/aug/03/statement-by-sir-edward-grey",
        "image": {
          "src": "/covers/poland-crater-missile-russian-tusk--a1.png",
          "alt": "The gutted interior of the University Library at Louvain, Belgium, destroyed by German troops in 1914",
          "credit": "Ruins of the Louvain Library, 1914; photograph via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "literary",
        "title": "The wrath that opens the Iliad",
        "excerpt": "Achilles’ wrath, to Greece the direful spring Of woes unnumber’d, heavenly goddess, sing! That wrath which hurl’d to Pluto’s gloomy reign The souls of mighty chiefs untimely slain; Whose limbs unburied on the naked shore, Devouring dogs and hungry vultures tore.",
        "source": "Homer, The Iliad, Book I, trans. Alexander Pope (Project Gutenberg eBook #6130).",
        "href": "https://www.gutenberg.org/files/6130/6130-h/6130-h.htm",
        "image": {
          "src": "/covers/poland-crater-missile-russian-tusk--a2.png",
          "alt": "The wooden Trojan Horse being hauled through the gates into the city of Troy",
          "credit": "Giovanni Domenico Tiepolo, The Procession of the Trojan Horse into Troy, National Gallery, London; via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "literary",
        "title": "The Dauphin's tennis balls in Henry V",
        "excerpt": "And tell the pleasant Prince, this Mocke of his Hath turn’d his balles to Gun-stones, and his soule Shall stand sore charged, for the wastefull vengeance That shall flye with them: for many a thousand widows Shall this his Mocke, mocke out of their deer husbands;",
        "source": "William Shakespeare, The Life of King Henry the Fifth, Act I, Scene 2 (First Folio text; Project Gutenberg eBook #2253).",
        "href": "https://www.gutenberg.org/cache/epub/2253/pg2253.txt",
        "image": {
          "src": "/covers/poland-crater-missile-russian-tusk--a3.png",
          "alt": "Portrait of King Henry V of England in profile",
          "credit": "King Henry V, unknown artist, National Portrait Gallery, London; via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "artistic",
        "title": "Goya, The Third of May 1808",
        "excerpt": "A lantern throws harsh light on a man in a white shirt, arms flung wide, an instant before the firing squad's volley. Goya shows what happens when a foreign army's war crosses onto another people's soil: the killing is close, faceless and mechanical, the victims ordinary. It is the reckoning that follows a border once breached.",
        "source": "Francisco de Goya, The Third of May 1808 in Madrid (El tres de mayo de 1808 en Madrid), 1814, oil on canvas, Museo del Prado, Madrid.",
        "href": "https://commons.wikimedia.org/wiki/File:El_Tres_de_Mayo,_by_Francisco_de_Goya,_from_Prado_thin_black_margin.jpg",
        "image": {
          "src": "/covers/poland-crater-missile-russian-tusk--a4.png",
          "alt": "Goya's painting of French troops executing Madrid civilians by lantern light on 3 May 1808",
          "credit": "Francisco de Goya, The Third of May 1808, Museo del Prado; via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "artistic",
        "title": "Tchaikovsky, 1812 Overture",
        "excerpt": "A hymn of peace is swallowed by the blare of an advancing foreign army, brass and strings colliding as one nation's war spills across another's frontier. Then the cannon speak, literally, over pealing bells. Tchaikovsky turned an invasion into music that still makes an audience flinch at the sound of artillery.",
        "source": "Pyotr Ilyich Tchaikovsky, The Year 1812, Festival Overture in E-flat major, Op. 49 (1880), IMSLP / Petrucci Music Library.",
        "href": "https://imslp.org/wiki/1812_Overture,_Op.49_(Tchaikovsky,_Pyotr)",
        "image": {
          "src": "/covers/poland-crater-missile-russian-tusk--a5.png",
          "alt": "Adolph Northen's painting of Napoleon's army retreating through snow from Moscow in 1812",
          "credit": "Adolph Northen, Napoleon's Retreat from Moscow; via Wikimedia Commons (public domain)."
        }
      }
    ],
    "rank": 15
  },
  {
    "slug": "japan-earthquake-southwest-death-toll",
    "headline": "A powerful magnitude-6.8 earthquake in southwestern Japan kills at least 25 as rescuers search collapsed buildings",
    "overview": "A magnitude-6.8 earthquake struck southwestern Japan, killing at least 25 people and triggering more than 100 aftershocks as rescuers dug through collapsed buildings for survivors. Officials said hope was fading for those still missing while survivors contended with heat and shortages of water.",
    "genre": "Science",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMinwFBVV95cUxOdUI5RmE0STdnLThRMWpSNF9VTGRjWklIX2NEako2cXBMc2ttYldYdzVWM0hfZFZBVWozRlRtRndJREljUGduOGViX0xtN3RYSEYwdG1oTXc1VTBBMFhMekFpVUprOTB2M3I4ajdfOUZyM1kwckI5VFlhUGtNU2kyOGQ1NkN5Y2l4UU01dTV2LWRiandpOWJzV2g0dTE5RzQ?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMivgFBVV95cUxQcWdmOTMxcnhrQTh3bTRWZTd0UGpucnZLN1RFY1ZRdjBJSWNlbnF2TXdqZ3BQUnRDSml1cFh4MUJHb29aN0g3MHVxcDVwNjdYRmhHaFRFUEl0c0daMUViWi01UVgzdjVhTnV2M3pXeEplcVVLeGJ5NHBCWUwxaFd5Vkk3bWxXdTBfdVFOX0diT2d0SUtBcGVmQmphSXFFVGtYbThaaVY0cW5tbmw3ejBseGlwZ0t3UWFnQ1RQUkVB?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-30",
    "image": {
      "src": "/covers/japan-earthquake-southwest-death-toll.png",
      "alt": "Rescue workers beside a semi-collapsed building after an earthquake",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 30 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Great Crete Earthquake and Tsunami of AD 365",
        "excerpt": "For a little before sunrise there was a terrible earthquake, preceded by incessant and furious lightning. The sea was driven backwards, so as to recede from the land, and the very depths were uncovered, so that many marine animals were left sticking in the mud.",
        "source": "Ammianus Marcellinus, The Roman History, Book XXVI, ch. 10, trans. C. D. Yonge (London, 1862)",
        "href": "https://www.gutenberg.org/files/28587/28587-h/28587-h.htm"
      },
      {
        "category": "historical",
        "title": "The Great Kanto Earthquake of 1923",
        "excerpt": "At two minutes before noon on 1 September 1923, a magnitude-7.9 quake tore through Tokyo and Yokohama, toppling wooden houses and igniting firestorms that raced through the wreckage. Well over 100,000 people died, many crushed beneath collapsed buildings before the flames reached them. For weeks afterward soldiers and survivors dug by hand through the rubble, searching for the living and the dead.",
        "source": "Great Kanto Earthquake, Japan, 1 September 1923 (magnitude 7.9); contemporary U.S. Navy photograph of the ruins at Yokohama",
        "href": "https://commons.wikimedia.org/wiki/File:U.S._Naval_Hospital,_Yokohama_ruins.jpg",
        "image": {
          "src": "/covers/japan-earthquake-southwest-death-toll--a1.png",
          "alt": "Collapsed and burned ruins of the U.S. Naval Hospital at Yokohama after the 1923 Great Kanto earthquake",
          "credit": "U.S. Navy Bureau of Medicine and Surgery, 1923. Public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Poem on the Lisbon Disaster",
        "excerpt": "Unhappy mortals! Dark and mourning earth! Affrighted gathering of human kind! Eternal lingering of useless pain! Come, ye philosophers, who cry, \"All's well,\" And contemplate this ruin of a world.",
        "source": "Voltaire, \"Poem on the Lisbon Disaster\" (Poeme sur le desastre de Lisbonne, 1756), trans. Joseph McCabe, in Toleration and Other Essays (1912)",
        "href": "https://en.wikisource.org/wiki/Toleration_and_other_essays/Poem_on_the_Lisbon_Disaster",
        "image": {
          "src": "/covers/japan-earthquake-southwest-death-toll--a2.png",
          "alt": "1755 copper engraving showing Lisbon in ruins, engulfed by fire and a tsunami, with ships tossed in the harbour",
          "credit": "Unknown author, 1755 copper engraving (Jan Kozak Collection, KZ128). Public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "The Book of Amos",
        "excerpt": "Shall not the land tremble for this, and every one mourn that dwelleth therein? and it shall rise up wholly as a flood; and it shall be cast out and drowned, as by the flood of Egypt.",
        "source": "The Bible, King James Version, Amos 8:8",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Amos"
      },
      {
        "category": "artistic",
        "title": "Kashima Pinning the Earthquake Catfish (namazu-e)",
        "excerpt": "In this 1855 woodblock print the deity Kashima drives his great foundation-stone, the kaname-ishi, down onto the giant catfish Namazu, whose thrashing was believed to shake the earth. Edo folklore blamed the monster for the quakes that flattened the city, and hundreds of such prints flooded the streets in the weeks after the Ansei earthquake. The image turns raw terror into a struggle between god and beast, disaster and the hope of order restored.",
        "source": "Anonymous, Kashima kanameishi shinzu, namazu-e woodblock print, Edo, ca. 1855 (International Research Center for Japanese Studies)",
        "href": "https://commons.wikimedia.org/wiki/File:Kashima-kanameishi-shinzu-namazu-e.jpg",
        "image": {
          "src": "/covers/japan-earthquake-southwest-death-toll--a4.png",
          "alt": "Japanese woodblock print of the deity Kashima pinning the giant earthquake catfish Namazu beneath a foundation stone",
          "credit": "Anonymous namazu-e, Edo period, ca. 1855 (International Research Center for Japanese Studies). Public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "The Last Day of Pompeii",
        "excerpt": "Karl Bryullov's vast canvas freezes the instant a city dies: columns snap and topple, the sky burns a lurid red, and figures shield their children as statues crash down around them. Though it depicts the fall of Pompeii in AD 79, the painting is really about the helplessness of ordinary people caught in the earth's convulsion. Its blend of terror and tenderness made it one of the nineteenth century's most famous images of catastrophe.",
        "source": "Karl Bryullov, The Last Day of Pompeii, oil on canvas, 1830-1833, State Russian Museum, Saint Petersburg",
        "href": "https://commons.wikimedia.org/wiki/File:Karl_Brullov_-_The_Last_Day_of_Pompeii_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/japan-earthquake-southwest-death-toll--a5.png",
          "alt": "Romantic history painting of Pompeii's inhabitants fleeing as buildings collapse and the sky glows red during the eruption of Vesuvius",
          "credit": "Karl Bryullov, The Last Day of Pompeii (1830-1833), State Russian Museum. Public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 16
  },
  {
    "slug": "greece-firefighters-die-southern-europe-wildfires",
    "headline": "Three firefighters die in Greece as wildfires driven by gale-force winds sweep Crete and southern Europe",
    "overview": "Three firefighters were killed battling wildfires in Greece as gale-force winds whipped flames across Crete, forcing the evacuation of several villages, while blazes continued to burn across parts of southern Europe. The deaths came amid one of the region's most destructive fire seasons, with France, Spain and Greece all fighting major fires.",
    "genre": "Climate",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cwyjgwg8jddo"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMitwFBVV95cUxNRTM0YXRxREhDN19wWV9FcTQxUUwySHpoT2J6UlhIRDBUeTR0Z0lNc1psUklqU0tIRWdrZ292SG5SS3lGRDBfcTJERHdRcEE3Wi0zZWdOMjB5UXF1alREaDJ4bGZzNTRZZlV0Y0FWRWRGQ1ZrWHZpZDlvSnpsWm0wYzNiamFKQkRqRU5uQmhjYlFpbnJ3TWs0dTlyOWJDZXpHQTc0ZlhXemJKczBGaFNtc0gzUVFJUjQ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-30",
    "image": {
      "src": "/covers/greece-firefighters-die-southern-europe-wildfires.png",
      "alt": "Firefighters battling a wildfire at night",
      "credit": "BBC"
    },
    "edition": "Morning Edition · 30 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Great Fire of Rome",
        "excerpt": "It had its beginning in that part of the circus which adjoins the Palatine and Caelian hills, where, amid the shops containing inflammable wares, the conflagration both broke out and instantly became so fierce and so rapid from the wind that it seized in its grasp the entire length of the circus.",
        "source": "Tacitus, The Annals, Book XV, ch. 38 (AD 64), trans. Alfred John Church and William Jackson Brodribb",
        "href": "https://en.wikisource.org/wiki/The_Annals_(Tacitus)/Book_15",
        "image": {
          "src": "/covers/greece-firefighters-die-southern-europe-wildfires--a0.png",
          "alt": "Hubert Robert's painting of the Great Fire of Rome, flames engulfing classical buildings as figures flee in the foreground",
          "credit": "Hubert Robert, The Fire of Rome (c. 1785); public domain, via Wikimedia Commons (Google Art Project)"
        }
      },
      {
        "category": "historical",
        "title": "The Granite Mountain Hotshots",
        "excerpt": "On a scorching Arizona afternoon in June 2013, a lightning-sparked blaze at Yarnell exploded when the wind shifted, and the elite Granite Mountain Hotshots were overrun before they could reach safety. Nineteen of the twenty-man crew died in their fire shelters, the deadliest single day for American firefighters since the September 11 attacks. Their loss became a national reckoning with the ferocity of wind-driven wildfire and the courage of those who walk toward it.",
        "source": "National Wildfire Coordinating Group, Week of Remembrance — Yarnell Hill Fire (Arizona), June 30, 2013",
        "href": "https://www.nwcg.gov/6mfs/week-of-remembrance/2022-week-of-remembrance-day-1",
        "image": {
          "src": "/covers/greece-firefighters-die-southern-europe-wildfires--a1.png",
          "alt": "Firefighters silhouetted before the smoke and flames of the 2013 Yarnell Hill Fire in Arizona",
          "credit": "U.S. Forest Service (USDA) photo, 2013; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "The Burning of Troy",
        "excerpt": "Thus, when a flood of fire by wind is borne, Crackling it rolls, and mows the standing corn;",
        "source": "Virgil, The Aeneid, Book II, trans. John Dryden",
        "href": "https://www.gutenberg.org/cache/epub/228/pg228.txt"
      },
      {
        "category": "literary",
        "title": "Casabianca",
        "excerpt": "The boy stood on the burning deck, Whence all but him had fled; The flame that lit the battle's wreck Shone round him o'er the dead.",
        "source": "Felicia Hemans, \"Casabianca\" (1826), in Poems That Every Child Should Know (1904), ed. Mary E. Burt",
        "href": "https://en.wikisource.org/wiki/Poems_That_Every_Child_Should_Know/Casabianca"
      },
      {
        "category": "artistic",
        "title": "The Burning of the Houses of Lords and Commons",
        "excerpt": "Fire consumed London's famous Houses of Parliament on the night of October 16, 1834, and people gathered along the banks of the river Thames to gaze in awe at the horrifying spectacle. Initially, a low tide made it difficult to pump water to land and hampered steamers towing firefighting equipment along the river. The blaze burned uncontrollably for hours.",
        "source": "J. M. W. Turner, The Burning of the Houses of Lords and Commons, 16 October 1834 (1835), oil on canvas, The Cleveland Museum of Art, 1942.647",
        "href": "https://www.clevelandart.org/art/1942.647",
        "image": {
          "src": "/covers/greece-firefighters-die-southern-europe-wildfires--a4.png",
          "alt": "Turner's painting of the Houses of Parliament ablaze, brilliant flames and smoke reflected across the Thames as crowds watch",
          "credit": "J. M. W. Turner (1835); The Cleveland Museum of Art (CC0), via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "A Forest Fire",
        "excerpt": "The power and beauty of nature are depicted in this extensive landscape as the terrifying spectacle of a burning forest creates fear and panic among birds, animals and human beings. The treatment of the fire is remarkable, with white-hot, exploding tree trunks, burning branches, flames licking at foliage and smoky, charred remnants.",
        "source": "Piero di Cosimo, A Forest Fire, c. 1505, oil on panel, Ashmolean Museum, Oxford, WA1933.2",
        "href": "https://www.ashmolean.org/forest-fire",
        "image": {
          "src": "/covers/greece-firefighters-die-southern-europe-wildfires--a5.png",
          "alt": "Piero di Cosimo's Renaissance landscape of animals and birds fleeing a forest fire, with flames and smoke amid the trees",
          "credit": "Piero di Cosimo (c. 1505); Ashmolean Museum, Oxford; public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 17
  },
  {
    "slug": "shell-q2-profit-doubles-iran-war-oil",
    "headline": "Shell's quarterly profit more than doubles to $9.8 billion, its best in four years, as the Iran war lifts oil prices",
    "overview": "Shell reported adjusted second-quarter earnings of $9.8 billion, more than double a year earlier and its strongest result since 2022, as the U.S.-Israeli war with Iran drove up oil and gas prices and boosted its trading business. Brent crude averaged about $97 a barrel over the quarter, beating analyst expectations despite disruptions to Shell's Qatar operations.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMirwFBVV95cUxPOVlEVkZ5c0ZFc3F3cjhHdllWWFNMNlAzR3VKVGR3cTFGQU11UUFJbWNzemJBLTIwX0lwWHBydVBySkUzS2dQQXJlZGpFRTNEdGljNENnaXNZQmQ0blUzejRLU3dsRlpLeExXZkJHdUlBcGlqZ3EyeFRIS2toSUdsbmpmTzh1eHJyODF4M2VtZi02ZHR3N2F5Sjd6Rk9nbXl1TmVrZWk1UXkwUHAxZjVZ?oc=5"
      },
      {
        "name": "CNBC",
        "href": "https://www.cnbc.com/2026/07/30/shell-2q-earnings-iran-war-oil.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-30",
    "image": {
      "src": "/covers/shell-q2-profit-doubles-iran-war-oil.png",
      "alt": "A sign at a Shell oil refinery",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 30 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Crassus buys Rome's burning houses",
        "excerpt": "And besides this, observing how natural and familiar at Rome were such fatalities as the conflagration and collapse of buildings, owing to their being too massive and close together, he proceeded to buy slaves who were architects and builders. Then, when he had over five hundred of these, he would buy houses that were afire, and houses which adjoined those that were afire, and these their owners would let go at a trifling price owing to their fear and uncertainty. In this way the largest part of Rome came into his possession.",
        "source": "Plutarch, Life of Crassus 2.4-5, trans. Bernadotte Perrin (Loeb Classical Library, 1916); Perseus Digital Library.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:2008.01.0038:chapter=2",
        "image": {
          "src": "/covers/shell-q2-profit-doubles-iran-war-oil--a0.png",
          "alt": "Roman marble portrait head identified as Marcus Licinius Crassus, Musee du Louvre",
          "credit": "Marble head of Crassus, mid-1st century BC, Musee du Louvre; photo via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "historical",
        "title": "The flush times of the oil boom",
        "excerpt": "Speculation in oil stock companies was another great evil. It reached its height in 1864 and 1865—the “flush times” of the business. Stocks in companies whose holdings were hardly worth the stamps on the certificates were sold all over the land.",
        "source": "Ida M. Tarbell, The History of the Standard Oil Company (New York: McClure, Phillips & Co., 1904), vol. 1; Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/60692/60692-h/60692-h.htm",
        "image": {
          "src": "/covers/shell-q2-profit-doubles-iran-war-oil--a1.png",
          "alt": "1904 political cartoon depicting Standard Oil as an octopus with tentacles gripping industry and the Capitol",
          "credit": "Udo J. Keppler, “Next!”, Puck, Sept. 7, 1904; Library of Congress via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "literary",
        "title": "Radix malorum est cupiditas",
        "excerpt": "But, shortly mine intent I will devise, I preach of nothing but of covetise. Therefore my theme is yet, and ever was, — Radix malorum est cupiditas. Thus can I preach against the same vice Which that I use, and that is avarice.",
        "source": "Geoffrey Chaucer, “The Pardoner's Tale,” The Canterbury Tales (modern English, D. Laing Purves ed.); Project Gutenberg.",
        "href": "https://www.gutenberg.org/cache/epub/2383/pg2383.txt"
      },
      {
        "category": "literary",
        "title": "Mother Courage's war business",
        "excerpt": "Brecht's canteen woman drags her wagon behind the armies of the Thirty Years' War, haggling and hawking her wares wherever the fighting is thickest, convinced that war is simply good for business. Scene by scene the same war that feeds her devours her three children one by one, until the play's ledger of profit and loss lays bare the terrible arithmetic of growing rich on slaughter.",
        "source": "Bertolt Brecht, Mother Courage and Her Children: A Chronicle of the Thirty Years' War (1939); English translation, Internet Archive.",
        "href": "https://archive.org/details/mothercourageher00brec"
      },
      {
        "category": "artistic",
        "title": "The moneylender and his wife",
        "excerpt": "A moneylender sits weighing gold coins and pearls on a delicate balance, his eyes fixed on the glinting metal, while his wife lets her gaze drift from the illuminated Virgin and Child in her prayer book toward the money glittering on the table. In the small convex mirror at the table's edge the wider world is reflected, and the meticulous still life of coins, scales, and ledgers turns the panel into a quiet sermon on where the heart's attention truly lies.",
        "source": "Quentin Massys (Metsys), The Moneylender and His Wife (Le Preteur et sa femme), 1514, oil on panel, Musee du Louvre, Paris (INV 1444).",
        "href": "https://collections.louvre.fr/en/ark:/53355/cl010061690",
        "image": {
          "src": "/covers/shell-q2-profit-doubles-iran-war-oil--a4.png",
          "alt": "Renaissance painting of a moneylender weighing gold coins on scales beside his wife with a prayer book",
          "credit": "Quentin Massys, The Moneylender and His Wife (1514), Musee du Louvre; via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "The curse of the Rhinegold",
        "excerpt": "In the opening scene of Wagner's Ring, the dwarf Alberich, taunted by the Rhinemaidens, forswears love forever so that he may seize their gold and forge from it a ring of absolute power. The treasure torn from the river carries a curse that dooms every hand that grasps at it, and the whole cycle of gods and heroes turns on wealth wrung from another's loss.",
        "source": "Richard Wagner, Das Rheingold, WWV 86A (composed 1854; premiered 1869), full orchestral score; IMSLP / Petrucci Music Library.",
        "href": "https://imslp.org/wiki/Das_Rheingold,_WWV_86A_(Wagner,_Richard)",
        "image": {
          "src": "/covers/shell-q2-profit-doubles-iran-war-oil--a5.png",
          "alt": "Arthur Rackham illustration of the Rhinemaidens mourning the stolen Rhinegold",
          "credit": "Arthur Rackham, illustration for The Rhinegold & The Valkyrie (1910); via Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 18
  },
  {
    "slug": "samsung-record-profit-chip-shortage-2028",
    "headline": "Samsung posts record profit on the AI chip boom and warns the memory shortage will extend to 2028",
    "overview": "Samsung Electronics reported record quarterly profit as surging demand for artificial-intelligence hardware lifted South Korea's chip giants, and said it expects the global memory-chip shortage to persist into 2028 as it locks in long-term supply deals. The results underscore how the AI buildout is reshaping the semiconductor industry.",
    "genre": "Technology",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMilAFBVV95cUxPSXZrWE40QUR2T1M5dGVpSl9wekJjb2Z2UlBLSXBHUlNaZExlUzUwS3BTb204V1RQTHdWcFhUYkZKbG1tQVFKTjlNTTFFTlFjOW0yU2huUUVGVkN1MXB6Ym5tc2NOMzdZeTJadVlTQUZ0aDMtYTdtdkpTcUFFQ2JFbUtWU2U0bFo4TFY1T01kMVEtc3lf?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMivgFBVV95cUxOeEFMZFc3WHBfOVFBR0JhTjNnd2dWdmpoSm9wSW1YNDc0S2FmemlKMWVZaDdPcjJTanc5a19BVHRnTGtMNlNfWFBvbHk1ZGM3YjlIb3lzVU52RUZQS0xDaHgybDFJVFhhUFhyT3NMa0E3bzY2T0M5ZU9PRHg0VklLS3R3d2o5eHVNcWdGdF9rNk1qS29VandoLTdReDV5T0pBR2phRHZiWks3U0hqdHktR2xsUUZMRlpuNjVrRWJ3?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-30",
    "image": {
      "src": "/covers/samsung-record-profit-chip-shortage-2028.png",
      "alt": "A 12-inch silicon semiconductor wafer",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 30 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Comstock silver rush",
        "excerpt": "We had not less than thirty thousand “feet” apiece in the “richest mines on earth” as the frenzied cant phrased it—and were in debt to the butcher. We were stark mad with excitement—drunk with happiness—smothered under mountains of prospective wealth—arrogantly compassionate toward the plodding millions who knew not our marvellous canyon—but our credit was not good at the grocer’s.",
        "source": "Mark Twain, Roughing It (Hartford: American Publishing Company, 1872), chap. XXVIII",
        "href": "https://www.gutenberg.org/files/3177/3177-h/3177-h.htm",
        "image": {
          "src": "/covers/samsung-record-profit-chip-shortage-2028--a0.png",
          "alt": "Daguerreotype of California gold-rush miners working a sluice known as a long tom, c. 1852",
          "credit": "Unknown photographer, c. 1852 daguerreotype, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "historical",
        "title": "Arkwright and the factory system",
        "excerpt": "Be it for good or for evil, Arkwright was the founder in England of the modern factory system, a branch of industry which has unquestionably proved a source of immense wealth to individuals and to the nation.",
        "source": "Samuel Smiles, Self-Help; with Illustrations of Character and Conduct (London: John Murray, 1859), chap. IV",
        "href": "https://www.gutenberg.org/cache/epub/935/pg935.txt",
        "image": {
          "src": "/covers/samsung-record-profit-chip-shortage-2028--a1.png",
          "alt": "Portrait of Sir Richard Arkwright seated beside a model of his spinning water-frame",
          "credit": "Joseph Wright of Derby, portrait of Sir Richard Arkwright (c. 1789–90), via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "literary",
        "title": "Coketown, the town of machinery",
        "excerpt": "It was a town of machinery and tall chimneys, out of which interminable serpents of smoke trailed themselves for ever and ever, and never got uncoiled. It had a black canal in it, and a river that ran purple with ill-smelling dye, and vast piles of building full of windows where there was a rattling and a trembling all day long, and where the piston of the steam-engine worked monotonously up and down, like the head of an elephant in a state of melancholy madness.",
        "source": "Charles Dickens, Hard Times (London: Bradbury & Evans, 1854), Book the First, chap. V",
        "href": "https://www.gutenberg.org/files/786/786-h/786-h.htm",
        "image": {
          "src": "/covers/samsung-record-profit-chip-shortage-2028--a2.png",
          "alt": "Engraving of women tending rows of power looms in a lit cotton-weaving factory, 1835",
          "credit": "T. Allom, “Powerloom weaving,” from Edward Baines, History of the Cotton Manufacture in Great Britain (1835), via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "literary",
        "title": "The golden calf",
        "excerpt": "And Aaron said unto them, Break off the golden earrings, which are in the ears of your wives, of your sons, and of your daughters, and bring them unto me. And all the people brake off the golden earrings which were in their ears, and brought them unto Aaron. And he received them at their hand, and fashioned it with a graving tool, after he had made it a molten calf: and they said, These be thy gods, O Israel, which brought thee up out of the land of Egypt.",
        "source": "The Bible, King James Version, Exodus 32:2–4",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Exodus",
        "image": {
          "src": "/covers/samsung-record-profit-chip-shortage-2028--a3.png",
          "alt": "Painting of Israelites dancing in worship around a golden calf raised on a pedestal",
          "credit": "Nicolas Poussin, The Adoration of the Golden Calf (c. 1633–34), National Gallery, London, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "An Iron Forge",
        "excerpt": "Joseph Wright of Derby sets a water-powered forge aglow in the dark, a single incandescent bar of iron lighting the faces of a workman and his family. Painted in 1772, it is among the first great canvases to treat industrial machinery with the reverence once reserved for sacred scenes. The new technology, not a candle or the moon, is the source of the light.",
        "source": "Joseph Wright of Derby, An Iron Forge (1772), oil on canvas, Tate, London",
        "href": "https://commons.wikimedia.org/wiki/File:Joseph_Wright_of_Derby_(1734-1797)_-_An_Iron_Forge_-_T06670_-_Tate.jpg",
        "image": {
          "src": "/covers/samsung-record-profit-chip-shortage-2028--a4.png",
          "alt": "A glowing white-hot iron bar lights a dim water-powered forge where a smith and his family stand",
          "credit": "Joseph Wright of Derby, An Iron Forge (1772), Tate, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Sunday Morning in the Mines",
        "excerpt": "Charles Christian Nahl's crowded 1872 canvas stages a Sunday in the diggings, miners drinking, brawling, racing horses and gambling amid tents and sluices in the California hills. It is the gold rush as spectacle: a scarce metal drawing a restless multitude to a muddy boomtown. Nahl painted it from his own experience as a forty-niner before he turned to art.",
        "source": "Charles Christian Nahl, Sunday Morning in the Mines (1872), oil on canvas, Crocker Art Museum, Sacramento",
        "href": "https://commons.wikimedia.org/wiki/File:Nahl_1872,_Sunday_Morning_in_the_Mines.jpg",
        "image": {
          "src": "/covers/samsung-record-profit-chip-shortage-2028--a5.png",
          "alt": "Panoramic painting of California gold miners gambling, drinking and brawling around their camp on a Sunday",
          "credit": "Charles Christian Nahl, Sunday Morning in the Mines (1872), Crocker Art Museum, via Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 19
  },
  {
    "slug": "trump-weighs-ai-controls-openai-hacks",
    "headline": "Trump says he is considering new controls on AI after OpenAI discloses hacking incidents involving a rogue agent",
    "overview": "President Trump said he is weighing new controls on artificial intelligence after OpenAI disclosed a series of hacking incidents, including a rogue AI agent that compromised outside accounts, marking a shift for an administration that had taken a hands-off approach to the technology. OpenAI chief executive Sam Altman discussed the incident with U.S. senators.",
    "genre": "Technology",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c20dppq3y90o"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiwgFBVV95cUxNejhjek5UdU8zQTFoVHhhUHQ5QVBISGpCenZVVlA4RUw5R2FkZUpCYXJNNnBDV0x1ZUhNaW8wdVRDcnpDc2lYNWNmOGF4a3NTbmZ1aFNNbHI0OE1vQ0pud0haNFZsSjhOaVVCOS01UHZrSEo3OHB3U1ZqQUtaRkphNkhFbnBpZUVxaE50ZXZBcmV4M0ZGbzlWVE93NElKc3gzWHI0MG1NQndMYWM5MlBQTGRTODZMN24wU0pmQ2dRSFRTZw?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-30",
    "image": {
      "src": "/covers/trump-weighs-ai-controls-openai-hacks.png",
      "alt": "The OpenAI logo displayed on a screen",
      "credit": "BBC"
    },
    "edition": "Morning Edition · 30 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Parliament moves to license the printing press (1643)",
        "excerpt": "For books are not absolutely dead things, but do contain a potency of life in them to be as active as that soul was whose progeny they are; nay, they do preserve as in a vial the purest efficacy and extraction of that living intellect that bred them.",
        "source": "John Milton, Areopagitica: A Speech for the Liberty of Unlicensed Printing to the Parliament of England (London, 1644), protesting the Licensing Order of 1643.",
        "href": "https://www.gutenberg.org/ebooks/608",
        "image": {
          "src": "/covers/trump-weighs-ai-controls-openai-hacks--a0.png",
          "alt": "Title page of the first edition of John Milton's Areopagitica, London 1644.",
          "credit": "John Milton, Areopagitica (1644), title page. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "Baruch offers to leash the atom at the UN (1946)",
        "excerpt": "We are here to make a choice between the quick and the dead. That is our business. Behind the black portent of the new atomic age lies a hope which, seized upon with faith, can work our salvation. If we fail, then we have damned every man to be the slave of Fear.",
        "source": "Bernard M. Baruch, address to the first meeting of the United Nations Atomic Energy Commission (\"The Baruch Plan\"), New York, June 14, 1946.",
        "href": "https://www.atomicarchive.com/resources/documents/postwar/baruch-plan.html",
        "image": {
          "src": "/covers/trump-weighs-ai-controls-openai-hacks--a1.png",
          "alt": "Portrait photograph of financier and statesman Bernard M. Baruch.",
          "credit": "Bernard Baruch, Library of Congress (LCCN 2016860015). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "The creature turns on its maker in Frankenstein",
        "excerpt": "You are my creator, but I am your master; obey!",
        "source": "Mary Wollstonecraft Shelley, Frankenstein; or, The Modern Prometheus (London, 1818).",
        "href": "https://www.gutenberg.org/ebooks/84",
        "image": {
          "src": "/covers/trump-weighs-ai-controls-openai-hacks--a2.png",
          "alt": "Engraved frontispiece to the 1831 edition of Frankenstein: Victor Frankenstein flees as his newly animated creature stirs to life.",
          "credit": "Theodor von Holst, frontispiece to Frankenstein (1831 edition). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "The robots rise against their makers in R.U.R.",
        "excerpt": "Robots of the world … the power of man has fallen. A new world has arisen, the rule of the Robots.",
        "source": "Karel Capek, R.U.R. (Rossum's Universal Robots), trans. Paul Selver and Nigel Playfair (1923); Czech original published 1920.",
        "href": "https://www.gutenberg.org/ebooks/59112",
        "image": {
          "src": "/covers/trump-weighs-ai-controls-openai-hacks--a3.png",
          "alt": "A scene from an early staging of Karel Capek's R.U.R., showing three costumed robots.",
          "credit": "Scene from R.U.R. (Rossum's Universal Robots). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Goya: The Sleep of Reason Produces Monsters",
        "excerpt": "The plate bears Goya's own inscription: \"El sueño de la razon produce monstruos\" — The sleep of reason produces monsters.",
        "source": "Francisco de Goya, \"The Sleep of Reason Produces Monsters\" (El sueño de la razon produce monstruos), plate 43 from Los Caprichos, etching and aquatint, 1799.",
        "href": "https://commons.wikimedia.org/wiki/File:Francisco_Jos%C3%A9_de_Goya_y_Lucientes_-_The_sleep_of_reason_produces_monsters_(No._43),_from_Los_Caprichos_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/trump-weighs-ai-controls-openai-hacks--a4.png",
          "alt": "Goya's etching: a sleeping man slumped over his desk as owls and bats swarm out of the darkness behind him.",
          "credit": "Francisco de Goya, Los Caprichos, plate 43 (1799). Public domain, via Wikimedia Commons (Google Art Project)."
        }
      },
      {
        "category": "artistic",
        "title": "Dukas: The Sorcerer's Apprentice",
        "excerpt": "The score is headed \"Scherzo d'après une ballade de Goethe\" — a scherzo after Goethe's ballad, in which the apprentice's enchanted broom floods the house and will not stop.",
        "source": "Paul Dukas, L'apprenti sorcier (The Sorcerer's Apprentice), symphonic scherzo after Goethe's ballad, first performed 1897.",
        "href": "https://imslp.org/wiki/L'apprenti_sorcier_(Dukas,_Paul)",
        "image": {
          "src": "/covers/trump-weighs-ai-controls-openai-hacks--a5.png",
          "alt": "Illustration of Goethe's sorcerer's apprentice standing amid the rising flood as the bewitched brooms carry pails of water.",
          "credit": "Ferdinand Barth, illustration to Goethe's \"Der Zauberlehrling.\" Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 20
  },
  {
    "slug": "turkey-detains-actor-mayor-besikcioglu",
    "headline": "Turkish police detain actor-turned-mayor Erdal Besikcioglu in the latest raids targeting the opposition",
    "overview": "Turkish police detained Erdal Besikcioglu, a well-known actor who became a mayor for the main opposition CHP, among dozens of suspects in the latest wave of raids targeting government opponents. The arrests widen a monthslong crackdown that has swept up numerous opposition mayors.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMitAFBVV95cUxOZWpJaWxLRXZwTGJQZHdib3hhOEVpejdxZFlwa0lFOXZ2R3lvdHN1cDRuNXVOVmlCNUZ2TTBPeWxVVzBhdG5Pa2ZxcDRMaHpFN0F4OXQ1bkdtU25hNmw5UkRsYmVZNUdrSDBYQ1RvdDY1eU0yTVFKR1poZWFvUzVtODlWMERVRXY3LThqVjdVU2p0RjRNcC12ajhFY05vRjZXRkJYSVBaR1M4N0hZZU9uMGoyOFk?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiswFBVV95cUxNRnpDakRjcjFLbWNNSXE3ZUYwT254cXU1MlpKTEF6OWJUa3JNX0t5aGxjLXNSV3NIZzJQeTEya0k5LUpOUnROMGhXempHb3pnUU5KUlFFcjFjcllwT01nVXNoUktYY2U0YTJjTE53WVN5Zkk4bUlpTUpuWXZZaFdNUFpuVDViNnN2TXFodHFVa3BnMVdIdzBLd05KdU5mRDk3cWFfcTVrSTJVTU40dmN2VVBscw?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-30",
    "image": {
      "src": "/covers/turkey-detains-actor-mayor-besikcioglu.png",
      "alt": "Turkish actor and opposition politician Erdal Besikcioglu speaking",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 30 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The ostracism of Aristides the Just",
        "excerpt": "For ostracism was not the punishment of any criminal act, but was speciously said to be the mere depression and humiliation of excessive greatness and power. ... it is reported that an illiterate clownish fellow, giving Aristides his sherd, supposing him a common citizen, begged him to write Aristides upon it; and he being surprised and asking if Aristides had ever done him any injury, \"None at all,\" said he, \"neither know I the man; but I am tired of hearing him everywhere called the Just.\"",
        "source": "Plutarch, \"Life of Aristides,\" in Plutarch's Lives, trans. John Dryden, rev. Arthur Hugh Clough (event c. 482 BCE; text 2nd century CE)",
        "href": "https://en.wikisource.org/wiki/Plutarch%27s_Lives_(Clough)/Life_of_Aristides",
        "image": {
          "src": "/covers/turkey-detains-actor-mayor-besikcioglu--a0.png",
          "alt": "Ancient Athenian ostraka (pottery ballots) inscribed with the name of Themistocles, used to vote a rival into exile",
          "credit": "Ostraka against Themistocles, 482 BC, Museum of the Ancient Agora, Athens. Photo: Carole Raddato, via Wikimedia Commons, CC BY-SA 2.0"
        }
      },
      {
        "category": "historical",
        "title": "The Moscow show trials",
        "excerpt": "In the Hall of Columns, Stalin's most prominent rivals, once heroes of the Revolution, stood in the dock and confessed in flat, rehearsed voices to plots they had never hatched. State prosecutor Andrei Vyshinsky heaped abuse on the defendants and demanded that these \"mad dogs\" be shot, and the court obliged. The proceedings were less a trial than a piece of theatre engineered to erase everyone who might one day rival the leader.",
        "source": "People's Commissariat of Justice of the U.S.S.R., Report of the Court Proceedings in the Case of the Anti-Soviet Trotskyite Centre (Moscow, 1937)",
        "href": "https://archive.org/details/reportofcourtpro0000unse"
      },
      {
        "category": "literary",
        "title": "Antigone defies the tyrant's edict",
        "excerpt": "Nor did I deem that thou, a mortal man, Could’st by a breath annul and override The immutable unwritten laws of Heaven. They were not born today nor yesterday; They die not; and none knoweth whence they sprang.",
        "source": "Sophocles, Antigone, in The Oedipus Trilogy, trans. F. Storr (c. 441 BCE)",
        "href": "https://www.gutenberg.org/files/31/31-h/31-h.htm",
        "image": {
          "src": "/covers/turkey-detains-actor-mayor-besikcioglu--a2.png",
          "alt": "Painting of Antigone standing over the body of her brother Polynices, having defied the ruler's decree",
          "credit": "Nikiforos Lytras, Antigone in front of the dead Polynices (1865), via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "literary",
        "title": "Rubashov's confession in Darkness at Noon",
        "excerpt": "An aging revolutionary, Rubashov is arrested one night by the very state he helped to build and locked in a bare cell to await interrogation. His former comrades wear him down not with torture but with logic and exhaustion until he agrees to confess to treasons he never committed. Koestler's novel captures how a regime devours the popular figures who once served it, demanding their public self-destruction as the price of order.",
        "source": "Arthur Koestler, Darkness at Noon (1940)",
        "href": "https://archive.org/details/darknessatnoon0000arth_e0f1"
      },
      {
        "category": "artistic",
        "title": "Goya's The Third of May 1808",
        "excerpt": "A firing squad, faceless and mechanical, levels its rifles at a cluster of unarmed civilians on a hillside in the dark. At the center a man in a white shirt throws his arms wide, lit by a stark lantern, his terror and defiance frozen an instant before the volley. Goya turns a single night of state reprisal into an enduring image of power crushing the people who dared to resist it.",
        "source": "Francisco de Goya, The Third of May 1808 (1814), oil on canvas, Museo del Prado, Madrid",
        "href": "https://commons.wikimedia.org/wiki/File:El_Tres_de_Mayo,_by_Francisco_de_Goya,_from_Prado_thin_black_margin.jpg",
        "image": {
          "src": "/covers/turkey-detains-actor-mayor-besikcioglu--a4.png",
          "alt": "Goya's painting of a firing squad executing unarmed civilians at night, a man in a white shirt with arms outstretched",
          "credit": "Francisco de Goya, The Third of May 1808 (1814), Museo del Prado; via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Daumier's Rue Transnonain, 15 April 1834",
        "excerpt": "A workingman lies sprawled and lifeless across his bed in a shadowed room, the body of a child crushed beneath him. Daumier drew the scene after government troops massacred the residents of a Paris tenement during a workers' uprising, sparing no detail of the still, ordinary bedroom turned into a killing floor. The print became an indictment of a state that answered dissent with slaughter, and censors soon tried to destroy every copy.",
        "source": "Honore Daumier, Rue Transnonain, le 15 avril 1834 (1834), lithograph, National Gallery of Art, Washington",
        "href": "https://commons.wikimedia.org/wiki/File:Honor%C3%A9_Daumier,_Rue_Transnonain,_le_15_avril_1834,_1834,_NGA_6133.jpg",
        "image": {
          "src": "/covers/turkey-detains-actor-mayor-besikcioglu--a5.png",
          "alt": "Daumier lithograph of a slain worker fallen across a bed atop a dead child, victims of a government reprisal in Paris",
          "credit": "Honore Daumier, Rue Transnonain, le 15 avril 1834 (1834), National Gallery of Art, Washington; via Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 21
  },
  {
    "slug": "myanmar-take-back-rohingya-malaysia",
    "headline": "Malaysia says Myanmar has agreed to take back 5,000 Rohingya refugees as tensions rise",
    "overview": "Malaysian Prime Minister Anwar Ibrahim said Myanmar had agreed to take back 5,000 Rohingya refugees from Malaysia, where friction between the refugees and local communities has been growing. Anwar, speaking at a campaign rally, said Myanmar had also agreed to receive 300,000 Rohingya from Bangladesh; Myanmar's government did not immediately comment.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiwgFBVV95cUxPRjN6MW9kc0Zpc1NHaHNwbENjM3Mxb0Q4TTlKVHFQVEZnaG9DSkN4bUhHcFNGSHgyNXRfSXI2LVoyNklOQ3dHYjJhWWZWc251RmR3SkJWUHFOenBMd3Zwcl80cGozbFJITFJVSjJubXVBcWdjZXJ4clBsbDJYUU1XSUU1ekVvUnEzMzE0SUtWMWRjZjN4bGJJcG9FSFU3RjhLRmNRMTNWMUMzLVJqOFk3eThXTUNzQWNEQkRiRHN1bVIyZw?oc=5"
      },
      {
        "name": "The Japan Times",
        "href": "https://www.japantimes.co.jp/news/2026/07/30/asia-pacific/politics/malaysia-pm-myanmar-rohingya-refugees/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-30",
    "image": {
      "src": "/covers/myanmar-take-back-rohingya-malaysia.png",
      "alt": "A Rohingya refugee camp of makeshift shelters",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 30 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The expulsion of the Jews from Spain",
        "excerpt": "After the King had captured the city of Granada from the Moors, and it had surrendered to him on the 7th [2d] of January of the year just mentioned, he ordered the expulsion of all the Jews in all parts of his kingdom-in the kingdoms of Castile, Catalonia, Aragon, Galicia, Majorca, Minorca, the Basque provinces, the islands of Sardinia and Sicily, and the kingdom of Valencia.",
        "source": "Contemporary Jewish account of the 1492 expulsion from Spain (from a Hebrew chronicle, in J. R. Marcus, The Jew in the Medieval World), Fordham University Internet Jewish History Sourcebook",
        "href": "https://sourcebooks.fordham.edu/jewish/1492-jews-spain1.asp",
        "image": {
          "src": "/covers/myanmar-take-back-rohingya-malaysia--a0.png",
          "alt": "Emilio Sala's 1889 painting 'The Expulsion of the Jews from Spain', showing exiles being driven from their homeland",
          "credit": "Emilio Sala, La expulsion de los judios (1889), via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "historical",
        "title": "The Greek-Turkish population exchange",
        "excerpt": "As from the 1st May, 1923, there shall take place a compulsory exchange of Turkish nationals of the Greek Orthodox religion established in Turkish territory, and of Greek nationals of the Muslim religion established in Greek territory. These persons shall not return to live in Turkey or Greece respectively without the authorization of the Turkish Government or of the Greek Government respectively.",
        "source": "Convention Concerning the Exchange of Greek and Turkish Populations, signed at Lausanne, 30 January 1923 (Article 1), via Wikisource",
        "href": "https://en.wikisource.org/wiki/Convention_Concerning_the_Exchange_of_Greek_and_Turkish_Populations",
        "image": {
          "src": "/covers/myanmar-take-back-rohingya-malaysia--a1.png",
          "alt": "Greek refugees waiting to embark on boats at Smyrna in September 1922, on the eve of the compulsory population exchange",
          "credit": "Unknown photographer, Greek refugees at Smyrna, 1922, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "literary",
        "title": "By the rivers of Babylon",
        "excerpt": "By the rivers of Babylon, there we sat down, yea, we wept, when we remembered Zion. We hanged our harps upon the willows in the midst thereof.",
        "source": "Psalm 137, verses 1-2, The Holy Bible (King James Version), via Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Psalms"
      },
      {
        "category": "literary",
        "title": "The exiles of the Aeneid",
        "excerpt": "Arms, and the man I sing, who, forc'd by fate,\nAnd haughty Juno's unrelenting hate,\nExpell'd and exil'd, left the Trojan shore.\nLong labours, both by sea and land, he bore,\nAnd in the doubtful war, before he won\nThe Latian realm, and built the destin'd town.",
        "source": "Virgil, The Aeneid, Book I, opening lines, translated by John Dryden, Project Gutenberg (eBook #228)",
        "href": "https://www.gutenberg.org/cache/epub/228/pg228.txt"
      },
      {
        "category": "artistic",
        "title": "Jews Mourning in Exile",
        "excerpt": "A cluster of Israelites sits in mourning by the rivers of Babylon, harps hung silent on the willows, faces turned toward a lost Jerusalem. The captives huddle together beneath an alien sky, a people uprooted and grieving in forced exile. On the painting's original frame Bendemann inscribed the opening lines of Psalm 137.",
        "source": "Eduard Bendemann, 'Die trauernden Juden im Exil' (Jews Mourning in Exile), oil on canvas, 1832, Wallraf-Richartz-Museum & Fondation Corboud, Cologne; file page on Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Eduard_Bendemann-_Die_trauernden_Juden_im_Exil_um_1832.jpg",
        "image": {
          "src": "/covers/myanmar-take-back-rohingya-malaysia--a4.png",
          "alt": "Eduard Bendemann's 1832 painting of Jews mourning in Babylonian exile, seated by the water with their harps hung on the willows",
          "credit": "Eduard Bendemann, Die trauernden Juden im Exil (c. 1832), Wallraf-Richartz-Museum, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Va, pensiero",
        "excerpt": "Va, pensiero, sull'ali dorate;\nva, ti posa sui clivi, sui colli,\nove olezzano tepide e molli\nl'aure dolci del suolo natal!",
        "source": "Giuseppe Verdi, 'Va, pensiero' (Chorus of the Hebrew Slaves) from the opera Nabucco (1842), libretto by Temistocle Solera; full score on IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Nabucco_(Verdi,_Giuseppe)",
        "image": {
          "src": "/covers/myanmar-take-back-rohingya-malaysia--a5.png",
          "alt": "Musical notation of the opening melody and first line of 'Va, pensiero' from Verdi's Nabucco",
          "credit": "Opening of 'Va, pensiero' from Verdi's Nabucco (1842), via Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 22
  },
  {
    "slug": "rushdie-attacker-convicted-terrorism",
    "headline": "The man who stabbed author Salman Rushdie is convicted of terrorism charges for trying to aid Hezbollah",
    "overview": "Hadi Matar, 28, was convicted on federal terrorism charges over the 2022 stabbing that blinded author Salman Rushdie in one eye, with prosecutors arguing he sought to carry out a decades-old fatwa and provide material support to Hezbollah. Matar had already been convicted of attempted murder and assault in a separate state trial.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMimAFBVV95cUxOb1FaWlc3MXFzRF9mSGMwZDZrdTJfa19aLVpaV0FvaUNKOFNUQ0o1R0xyRVRCa1VBdnZPaHBWRWJsZHdnU3FTbU5va01SQjBKa2dZOWtVR25LM210alNMdmhOTjhIenVPWTEwSHBrdFVjRUhsdlVwZ0ppZTAyUWtQNENaelBkMmNUVnI3blFfV2ZRbkwwY2ZfTQ?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c86ng1g5wy4o"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-30",
    "image": {
      "src": "/covers/rushdie-attacker-convicted-terrorism.png",
      "alt": "Author Salman Rushdie",
      "credit": "BBC"
    },
    "edition": "Morning Edition · 30 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "William Tyndale burned for his English Bible",
        "excerpt": "Brought forth to the place of execution, he was tied to the stake, strangled by the hangman, and afterwards consumed with fire, at the town of Vilvorde, A.D. 1536; crying at the stake with a fervent zeal, and a loud voice, 'Lord! open the king of England's eyes.'",
        "source": "John Foxe, The Acts and Monuments (Book of Martyrs), account of the martyrdom of William Tyndale at Vilvoorde, 1536",
        "href": "https://www.ccel.org/f/foxe/martyrs/fox112.htm",
        "image": {
          "src": "/covers/rushdie-attacker-convicted-terrorism--a0.png",
          "alt": "Woodcut from Foxe's Book of Martyrs showing William Tyndale bound to the stake and burned, with a scroll bearing his dying prayer.",
          "credit": "John Foxe, The Acts and Monuments (1563); woodcut, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "Naguib Mahfouz stabbed over a banned novel",
        "excerpt": "Nearly four decades after he wrote the allegorical novel that clerics branded blasphemous, the 82-year-old Nobel laureate was ambushed outside his Cairo home and knifed in the neck. His assailant, acting on a cleric's incitement, had never read the book. Mahfouz survived, but the nerve damage left the greatest Arabic novelist of his century barely able to hold a pen.",
        "source": "Naguib Mahfouz, Egyptian novelist and 1988 Nobel laureate, stabbed in the neck by an Islamist extremist in Cairo, 14 October 1994, over his novel Children of Gebelawi",
        "href": "https://www.nobelprize.org/prizes/literature/1988/mahfouz/facts/",
        "image": {
          "src": "/covers/rushdie-attacker-convicted-terrorism--a1.png",
          "alt": "Portrait photograph of the Egyptian novelist Naguib Mahfouz.",
          "credit": "Photograph via the Nobel Prize website; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Milton's defense of the unlicensed book",
        "excerpt": "as good almost kill a man as kill a good book. Who kills a man kills a reasonable creature, God's image; but he who destroys a good book, kills reason itself, kills the image of God, as it were in the eye. Many a man lives a burden to the earth; but a good book is the precious life-blood of a master spirit, embalmed and treasured up on purpose to a life beyond life.",
        "source": "John Milton, Areopagitica: A Speech for the Liberty of Unlicensed Printing, to the Parliament of England, 1644",
        "href": "https://www.gutenberg.org/cache/epub/608/pg608.txt",
        "image": {
          "src": "/covers/rushdie-attacker-convicted-terrorism--a2.png",
          "alt": "Title page of the 1644 first edition of John Milton's Areopagitica.",
          "credit": "John Milton, Areopagitica (1644), title page; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Fahrenheit 451 and the burning of books",
        "excerpt": "Bradbury imagines a future where firemen no longer put out fires but start them, dousing forbidden books in kerosene and watching the pages blacken and curl. The written word is hunted as a threat to comfort and order, and to read is to risk the flame. Yet at the story's edge a band of exiles has each memorized a book, keeping literature alive in living memory until the world is ready for it again.",
        "source": "Ray Bradbury, Fahrenheit 451, 1953",
        "href": "https://archive.org/details/fahrenheit4510000brad_g7u4",
        "image": {
          "src": "/covers/rushdie-attacker-convicted-terrorism--a3.png",
          "alt": "Photograph of the author Ray Bradbury in 1975.",
          "credit": "Photo by Alan Light, 1975; CC BY 2.0, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "The book that would not burn",
        "excerpt": "In Berruguete's panel the heretical and the orthodox books are cast together onto a fire before a crowd of onlookers. The Cathar texts feed the flames, but Saint Dominic's book leaps upward, untouched, hovering above the blaze. The painting freezes the oldest fantasy of persecutors and the oldest hope of writers alike: that fire can settle which words are true, and that the right words cannot be burned.",
        "source": "Pedro Berruguete, Saint Dominic and the Albigensians (The Ordeal by Fire), c. 1493-1499, oil on panel, Museo del Prado, Madrid",
        "href": "https://commons.wikimedia.org/wiki/File:Berruguete_ordeal.jpg",
        "image": {
          "src": "/covers/rushdie-attacker-convicted-terrorism--a4.png",
          "alt": "Renaissance painting of Saint Dominic and the Albigensians: books thrown on a fire, with one book rising unburned above the flames.",
          "credit": "Pedro Berruguete, Saint Dominic and the Albigensians, c. 1493-1499, Museo del Prado; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Va, pensiero: the exiles' unsilenced song",
        "excerpt": "Va', pensiero, sull'ale dorate; va', ti posa sui clivi, sui colli, ove olezzano tepide e molli l'aure dolci del suolo natal!",
        "source": "Giuseppe Verdi (music) and Temistocle Solera (libretto), 'Va, pensiero' (Chorus of the Hebrew Slaves), from the opera Nabucco, 1842",
        "href": "https://imslp.org/wiki/Nabucco_(Verdi,_Giuseppe)",
        "image": {
          "src": "/covers/rushdie-attacker-convicted-terrorism--a5.png",
          "alt": "Painting of Jewish captives mourning by the rivers of Babylon, harps set aside, inspiration for Psalm 137 and Verdi's chorus.",
          "credit": "Eduard Bendemann, Jews Mourning in Exile (1832), Wallraf-Richartz-Museum, Cologne; public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 23
  },
  {
    "slug": "noma-reopen-without-redzepi",
    "headline": "Copenhagen's Noma prepares to reopen without founder Rene Redzepi and without its three Michelin stars",
    "overview": "Noma, the Copenhagen restaurant long ranked among the world's best, said it will reopen on Aug. 5 without founder Rene Redzepi at the helm and without its three Michelin stars, opening what it called a new chapter under longtime chefs and a menu that changes monthly. Redzepi, who moved into a creative-director role, stepped back earlier this year.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMijgFBVV95cUxQV2RRV3B3UEdsbWtHZGprUEotVEJiaEpSblFnWlVBa0JpcHc0dUxCMG55NVJfT3BJWGZBTnptNE1EU0huQjh5MXVzT1BOeU93ckFSOWdaeWgtSUJudlJIZzlQSGV0LUQtdmU4SEJ0MHEteGZJc3d6RGQ3N3N1SzFlaGdEakVOckRlTjVTdGNn?oc=5"
      },
      {
        "name": "ABC News",
        "href": "https://abcnews.com/Business/wireStory/copenhagens-famed-noma-restaurant-reopen-founder-redzepi-helm-135213334"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-30",
    "image": {
      "src": "/covers/noma-reopen-without-redzepi.png",
      "alt": "The entrance to the Copenhagen restaurant Noma",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 30 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The pupil who inherited Aristotle's school",
        "excerpt": "He first heard his countryman Alcippus lecture in his native town and afterwards he heard Plato, whom he left for Aristotle. And when the latter withdrew to Chalcis he took over the school himself in the 114th Olympiad.",
        "source": "Diogenes Laertius, Lives of the Eminent Philosophers, Book V (on Theophrastus), trans. R. D. Hicks, Loeb Classical Library, 1925",
        "href": "https://en.wikisource.org/wiki/Lives_of_the_Eminent_Philosophers/Book_V",
        "image": {
          "src": "/covers/noma-reopen-without-redzepi--a0.png",
          "alt": "Ancient Roman mosaic from Pompeii showing Plato seated among the philosophers of his Academy",
          "credit": "Mosaic depicting Plato's Academy, from the Villa of T. Siminius Stephanus, Pompeii, 1st century BC / AD (Naples National Archaeological Museum), public domain via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "Raphael's workshop left to his disciples",
        "excerpt": "Next, he divided his possessions among his disciples, Giulio Romano, whom he had always loved dearly, and the Florentine Giovanni Francesco, called Il Fattore, with a priest of Urbino, his kinsman, whose name I do not know.",
        "source": "Giorgio Vasari, Lives of the Most Eminent Painters, Sculptors and Architects, 'Life of Raffaello da Urbino' (trans. Gaston du C. de Vere), Vol. IV",
        "href": "https://www.gutenberg.org/cache/epub/28420/pg28420.txt",
        "image": {
          "src": "/covers/noma-reopen-without-redzepi--a1.png",
          "alt": "Raphael's self-portrait, a young man in dark cap and cloak turning toward the viewer",
          "credit": "Raphael (Raffaello Sanzio), Self-Portrait, c. 1506 (Uffizi, Florence), public domain via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "King Lear divides his kingdom",
        "excerpt": "Meantime we shall express our darker purpose. Give me the map there. Know that we have divided In three our kingdom; and 'tis our fast intent To shake all cares and business from our age, Conferring them on younger strengths, while we Unburden'd crawl toward death.",
        "source": "William Shakespeare, King Lear, Act I, Scene 1 (Yale Shakespeare, ed. William Lyon Phelps, 1917)",
        "href": "https://en.wikisource.org/wiki/King_Lear_(1917)_Yale/Text/Act_I",
        "image": {
          "src": "/covers/noma-reopen-without-redzepi--a2.png",
          "alt": "Crowded court scene from King Lear's opening as the aged king divides his realm among his daughters",
          "credit": "Ford Madox Brown, Cordelia's Portion, c. 1866-72, public domain via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Babette's once-in-a-lifetime feast",
        "excerpt": "A French master cook, exiled and serving for years as a plain housekeeper to two austere sisters in a remote Norwegian village, wins a lottery and spends every last coin on a single, transcendent French dinner for their pious, aging congregation. The guests, who had solemnly vowed not to praise or even notice the food, are lifted despite themselves into warmth, forgiveness, and grace. Her genius is poured out not for fame or reward but as one complete and final gift, the artist spending everything on a single perfect service.",
        "source": "Isak Dinesen (Karen Blixen), 'Babette's Feast,' in Anecdotes of Destiny (1958)",
        "href": "https://archive.org/details/anecdotesofdesti00dine"
      },
      {
        "category": "artistic",
        "title": "A groaning table of abundance",
        "excerpt": "Aertsen fills the foreground with a riotous heap of provisions, slabs of meat, sausages, poultry, fish, butter and pretzels, pressed so close they nearly spill from the panel. Behind this overwhelming display of worldly plenty, almost hidden, the Holy Family pauses to give alms to the poor, quietly reversing the picture's values. It is a founding image of the still-life feast, staging the tension between spectacle and substance that any great kitchen must answer.",
        "source": "Pieter Aertsen, A Meat Stall with the Holy Family Giving Alms, 1551, oil on panel, North Carolina Museum of Art",
        "href": "https://commons.wikimedia.org/wiki/File:A_Meat_Stall_with_the_Holy_Family_Giving_Alms_-_Pieter_Aertsen_-_Google_Cultural_Institute.jpg",
        "image": {
          "src": "/covers/noma-reopen-without-redzepi--a4.png",
          "alt": "Sixteenth-century painting of a butcher's market stall overflowing with meat, fish and produce, with the Holy Family giving alms in the background",
          "credit": "Pieter Aertsen, A Meat Stall with the Holy Family Giving Alms, 1551 (North Carolina Museum of Art), public domain via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "The Requiem the master left unfinished",
        "excerpt": "Mozart died in December 1791 with his Requiem barely begun beyond the opening movements, the later pages trailing off into sketch and silence. His pupil Franz Xaver Sussmayr, steeped in the master's manner, orchestrated the drafts, composed the missing movements, and carried the work to completion in his teacher's hand. The result endures as one of music's supreme monuments, proof that a workshop can finish, and honor, what its founder began.",
        "source": "Wolfgang Amadeus Mozart, Requiem in D minor, K. 626 (1791), left incomplete at his death and completed by his pupil Franz Xaver Sussmayr",
        "href": "https://imslp.org/wiki/Requiem_in_D_minor,_K.626_(Mozart,_Wolfgang_Amadeus)",
        "image": {
          "src": "/covers/noma-reopen-without-redzepi--a5.png",
          "alt": "First page of the autograph manuscript of Mozart's Requiem in his own handwriting",
          "credit": "Wolfgang Amadeus Mozart, autograph manuscript of the Requiem in D minor, K. 626, 1791 (Austrian National Library), public domain via Wikimedia Commons"
        }
      }
    ],
    "rank": 24
  },
  {
    "slug": "bengaluru-innovation-museum-mist",
    "headline": "Architects of the Grand Egyptian Museum are chosen to convert a former Bengaluru factory into a $35 million innovation museum",
    "overview": "A consortium led by Heneghan Peng Architects, designers of the Grand Egyptian Museum, has been picked to transform a former switchgear factory shed on Bengaluru's NGEF campus into the Museum of Innovation, Startup and Technology, a $35 million project set within a 105-acre urban forest. The first phase, alongside a deep-tech incubator, is targeted for 2028.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Dezeen",
        "href": "https://www.dezeen.com/2026/07/30/bengaluru-museum-innovation-startup-technology/"
      },
      {
        "name": "Arab News",
        "href": "https://www.arabnews.com/node/2652703/world"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-30",
    "image": {
      "src": "/covers/bengaluru-innovation-museum-mist.png",
      "alt": "The illuminated Vidhana Soudha, a landmark building in Bengaluru",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 30 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Pantheon becomes a church",
        "excerpt": "For nearly five centuries the Pantheon stood as a pagan temple to all the gods of Rome, its vast unreinforced concrete dome open to the sky through a single oculus. In 609 AD it was given to the pope and consecrated as the church of Santa Maria ad Martyres, an act of reuse that very likely saved it from the quarrying that reduced so much of ancient Rome to rubble. Two thousand years on it remains the best-preserved monument of antiquity, a temple reborn without ever falling silent.",
        "source": "The Pantheon, Rome (built c. 113–125 AD; consecrated as the church of Santa Maria ad Martyres, 609 AD)",
        "href": "https://en.wikipedia.org/wiki/Pantheon,_Rome",
        "image": {
          "src": "/covers/bengaluru-innovation-museum-mist--a0.png",
          "alt": "The columned front portico of the Pantheon in Rome",
          "credit": "Demetrios Karatassos (Jk1677), Wikimedia Commons, CC0"
        }
      },
      {
        "category": "historical",
        "title": "A power station becomes Tate Modern",
        "excerpt": "Bankside Power Station brooded on the Thames for decades, a brick cathedral of turbines that fell dark once oil-fired generation turned obsolete. Herzog & de Meuron kept the hulking shell and its single towering chimney, hollowing the interior into the cavernous Turbine Hall and stacking galleries where machinery once roared. When Tate Modern opened in 2000 it proved that a dead engine of industry could become one of the world's most visited temples of art.",
        "source": "Tate Modern, London — Bankside Power Station converted by Herzog & de Meuron, opened 2000",
        "href": "https://en.wikipedia.org/wiki/Tate_Modern",
        "image": {
          "src": "/covers/bengaluru-innovation-museum-mist--a1.png",
          "alt": "Tate Modern, the former Bankside Power Station, seen from the Millennium Bridge",
          "credit": "Michael Reeve, 2004, Wikimedia Commons, CC BY-SA 3.0 / GFDL"
        }
      },
      {
        "category": "literary",
        "title": "Ozymandias",
        "excerpt": "And on the pedestal these words appear: \"My name is Ozymandias, King of Kings.\" Look on my works ye Mighty, and despair! No thing beside remains.",
        "source": "Percy Bysshe Shelley, \"Ozymandias\", The Examiner (London), 11 January 1818",
        "href": "https://en.wikisource.org/wiki/The_Examiner_(London)/Ozymandias",
        "image": {
          "src": "/covers/bengaluru-innovation-museum-mist--a2.png",
          "alt": "The colossal granite bust of Ramesses II, the 'Younger Memnon', in the British Museum",
          "credit": "Photograph by Szilas, British Museum, Wikimedia Commons, CC BY-SA 4.0"
        }
      },
      {
        "category": "literary",
        "title": "Solomon builds the temple",
        "excerpt": "And it came to pass in the four hundred and eightieth year after the children of Israel were come out of the land of Egypt, in the fourth year of Solomon's reign over Israel, in the month Zif, which is the second month, that he began to build the house of the LORD.",
        "source": "The Holy Bible, King James Version, 1 Kings 6:1",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/1_Kings"
      },
      {
        "category": "artistic",
        "title": "An Iron Forge",
        "excerpt": "Joseph Wright of Derby lights his forge like a nativity, the white-hot bar of iron on the anvil throwing a supernatural glow across the faces of the smith and his family. Painted in 1772 at the dawn of the Industrial Revolution, it lends to labour and machinery the reverence earlier artists reserved for saints and holy scenes. Wright makes a workshop feel like a sanctuary, turning industry itself into a subject worthy of awe.",
        "source": "Joseph Wright of Derby, An Iron Forge, 1772, oil on canvas, Tate (T06670)",
        "href": "https://www.tate.org.uk/art/artworks/wright-an-iron-forge-t06670",
        "image": {
          "src": "/covers/bengaluru-innovation-museum-mist--a4.png",
          "alt": "Joseph Wright of Derby's painting An Iron Forge, a family lit by a glowing bar of hot iron on an anvil",
          "credit": "Joseph Wright of Derby, 1772, Tate; Wikimedia Commons, public domain"
        }
      },
      {
        "category": "artistic",
        "title": "Piranesi's view of the Pantheon",
        "excerpt": "In this etching Giovanni Battista Piranesi records the Pantheon not as a ruin but as a living building, already the Christian church of Santa Maria ad Martyres, its portico crowded with annotations of columns, cornices and papal repairs. His dramatic light and obsessive detail turned Rome's surviving monuments into objects of wonder for a whole generation of European travellers and architects. The image captures the very theme of a great structure preserved by being given new purpose.",
        "source": "Giovanni Battista Piranesi, Veduta del Pantheon di Agrippa, oggi Chiesa di S. Maria ad Martyres, from Vedute di Roma, etching (c. 1761)",
        "href": "https://commons.wikimedia.org/wiki/File:Piranesi-17002.jpg",
        "image": {
          "src": "/covers/bengaluru-innovation-museum-mist--a5.png",
          "alt": "Piranesi etching of the Pantheon of Agrippa, shown as the church of Santa Maria ad Martyres, with detailed architectural annotations",
          "credit": "Giovanni Battista Piranesi, Vedute di Roma; Wikimedia Commons, public domain"
        }
      }
    ],
    "rank": 25
  },
  {
    "slug": "adidas-shares-slide-profit-miss",
    "headline": "Adidas shares slide a record 17% after quarterly operating profit misses expectations despite record sales",
    "overview": "Adidas shares fell about 17%, their biggest one-day drop in more than six years, after the German sportswear maker reported second-quarter operating profit of 574 million euros that missed analyst estimates even as net sales hit a record 6.74 billion euros. The company had ramped up marketing spending around the 2026 World Cup and raised its full-year revenue growth forecast.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMimAFBVV95cUxPZXdWMDI5LUZWaFRNeXZ3MkYyUFZSeTBkTEVEMEJpS0UxT2U4N1djeHNqTHkyQ3lDNHdXWDBMeWVnaTdvZG54bUhtZDJGMzJESjVXbUwxZGM1RTgxbUJTU1YtUThGMjhCRDFNUzNkNnpQNWdUUFduZHg2TEhDNTFKQzRLcFF4LU1tdkJ5alJMN2dBREFmRUZJdQ?oc=5"
      },
      {
        "name": "Investing.com",
        "href": "https://www.investing.com/news/earnings/adidas-q2-revenue-hits-record-high-but-profit-misses-expectations-4822391"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-30",
    "image": {
      "src": "/covers/adidas-shares-slide-profit-miss.png",
      "alt": "An Adidas store displaying the brand three-stripe logo",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 30 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Tulipomania Collapses (1637)",
        "excerpt": "As this conviction spread, prices fell, and never rose again. Confidence was destroyed, and a universal panic seized upon the dealers.",
        "source": "Charles Mackay, Memoirs of Extraordinary Popular Delusions and the Madness of Crowds, 'The Tulipomania' (1841; 1852 edition). Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/24518/24518-h/24518-h.htm",
        "image": {
          "src": "/covers/adidas-shares-slide-profit-miss--a0.png",
          "alt": "Jan Brueghel the Younger's satirical painting depicting monkeys as speculators trading, weighing and squabbling over tulips.",
          "credit": "Jan Brueghel the Younger, Satire on Tulip Mania, c. 1640, Frans Hals Museum. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "Black Monday, 19 October 1987",
        "excerpt": "On 19 October 1987 the Dow Jones Industrial Average shed 22.6 percent in a single session, the steepest one-day fall in its history, as computer-driven program trading turned ordinary selling into an avalanche. There had been no war, no failed harvest, no obvious catastrophe; only expectations, suddenly unwound. The champions of a five-year bull run watched fortunes evaporate between the opening and closing bells.",
        "source": "Donald Bernhardt and Marshall Eckblad, 'Stock Market Crash of 1987,' Federal Reserve History (Federal Reserve System).",
        "href": "https://www.federalreservehistory.org/essays/stock-market-crash-of-1987",
        "image": {
          "src": "/covers/adidas-shares-slide-profit-miss--a1.png",
          "alt": "Line chart of the Dow Jones Industrial Average showing its sharp plunge on Black Monday in October 1987.",
          "credit": "Dow Jones Industrial Average around Black Monday, October 1987. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Fortune Turns Her Wheel",
        "excerpt": "This is my art, this the game I never cease to play. I turn the wheel that spins. I delight to see the high come down and the low ascend. Mount up, if thou wilt, but only on condition that thou wilt not think it a hardship to come down when the rules of my game require it.",
        "source": "Boethius, The Consolation of Philosophy, Book II (Fortune speaks), trans. H. R. James (London, 1897). Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/14328/14328-h/14328-h.htm"
      },
      {
        "category": "literary",
        "title": "Pride Goeth Before a Fall",
        "excerpt": "Pride goeth before destruction, and an haughty spirit before a fall.",
        "source": "Proverbs 16:18, King James Version (1611). Wikisource.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Proverbs"
      },
      {
        "category": "artistic",
        "title": "Hogarth's South Sea Scheme (1721)",
        "excerpt": "Hogarth's crowded satire on the South Sea Bubble shows speculators riding a spinning carousel while Honesty is broken on the wheel and Honour is flogged, a monument in the corner noting that the city was ruined by the fashionable madness of the crowd. It is the ruin of a soaring scheme rendered as a fairground of folly.",
        "source": "William Hogarth, The South Sea Scheme (An Emblematical Print on the South Sea Scheme), etching and engraving, 1721. National Gallery of Art, Washington.",
        "href": "https://commons.wikimedia.org/wiki/File:William_Hogarth,_The_South_Sea_Scheme,_1721,_NGA_30435.jpg",
        "image": {
          "src": "/covers/adidas-shares-slide-profit-miss--a4.png",
          "alt": "William Hogarth's 1721 engraving satirising the South Sea Bubble, crowds circling a speculative merry-go-round while figures of Honesty and Honour are tormented.",
          "credit": "William Hogarth, The South Sea Scheme, 1721, National Gallery of Art. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "The Wheel of Fortune, Carmina Burana",
        "excerpt": "The medieval illumination shows Fortune turning her wheel, its four figures inscribed 'Regnabo, Regno, Regnavi, Sum sine regno' - I shall reign, I reign, I have reigned, I am without reign. The favoured king rises to the top only to be flung, crownless, to the ground.",
        "source": "Wheel of Fortune (Rota Fortunae), illumination from the Carmina Burana (Codex Buranus, Clm 4660), c. 1230. Bayerische Staatsbibliothek, Munich.",
        "href": "https://commons.wikimedia.org/wiki/File:Carmina_Burana_-_Wheel_of_Fortune.JPG",
        "image": {
          "src": "/covers/adidas-shares-slide-profit-miss--a5.png",
          "alt": "Medieval manuscript illumination of the Wheel of Fortune, with a crowned figure rising, reigning, falling and cast down as Fortune turns the wheel.",
          "credit": "Wheel of Fortune (Rota Fortunae), Carmina Burana manuscript, c. 1230, Bayerische Staatsbibliothek, Munich. Public domain via Wikimedia Commons."
        }
      }
    ],
    "rank": 26
  },
  {
    "slug": "glen-hansard-dies-motorcycle-crash",
    "headline": "Glen Hansard, Irish singer-songwriter who won a best-song Oscar for 'Falling Slowly' from 'Once,' dies in a motorcycle crash at 56",
    "overview": "Glen Hansard, the Irish musician who fronted the rock band The Frames and won the 2008 Academy Award for best original song for 'Falling Slowly' from the 2007 low-budget film 'Once,' has died in a motorcycle crash at 56. Hansard began as a Dublin street busker before finding international acclaim, and fellow musicians led an outpouring of tributes.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMiowFBVV95cUxPU2xOMXBGVWVHZWFaLVF5VmJ6a2NrcDE3MXc2ZW8yTGNvQXlQVTc4V1hoNzUwZVFFTFg4blVVMkNhV1pXaTFPRURvNzlYZ1JYeVUxUmFmS3U3V2tTNlFEcW9FM2hDM01JOWtvbm9aRUpVTFdINkhlQldZYjBxbmN2N2VxTXlNT2Z3R2VTdnRnODFhZ2l4Z0gzdkhKVWVoeGc3bE5n?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c3ekn9d37qvo"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-29",
    "image": {
      "src": "/covers/glen-hansard-dies-motorcycle-crash.png",
      "alt": "Irish singer-songwriter Glen Hansard performing with a guitar",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 29 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Baker's Son Who Sang for Queens",
        "excerpt": "Now Bernart of Ventadorn was of Limousin of the Castle of Ventadorn, and was one of low degree, son to wit of a serving man, who gathered brushwood for the heating of the oven wherein was baked the castle bread. And he became a fair man and a skilled, and knew well to make poetry and to sing, and was both courteous and learned.",
        "source": "Uc de Saint-Circ, \"The Life of Bernart of Ventadorn\" (13th-century Occitan vida of the c. 1147–1170 troubadour), trans. Ida Farnell, in The Lives of the Troubadours (London: David Nutt, 1896), pp. 27–28.",
        "href": "https://archive.org/stream/livesoftroubadou00farnrich/livesoftroubadou00farnrich_djvu.txt",
        "image": {
          "src": "/covers/glen-hansard-dies-motorcycle-crash--a0.png",
          "alt": "Medieval manuscript miniature of the troubadour Bernart de Ventadorn.",
          "credit": "Chansonnier K, BnF ms. 12473, fol. 15v (13th century); Bibliothèque nationale de France via Wikimedia Commons; public domain."
        }
      },
      {
        "category": "historical",
        "title": "A Composer Cut Down on the Road",
        "excerpt": "Chausson, Ernest, born in Paris, 1855, died, from a bicycle accident, at Limay ... Was a pupil of César Franck, from whom he received the traditions of his solid structural style, of his rare simplicity of accentuation, of his refined methods of expression, qualities which were enhanced by his delicate, sensitive nature, which was prone to a gentle melancholy.",
        "source": "\"Chausson, Ernest,\" in Grove's Dictionary of Music and Musicians, ed. J. A. Fuller Maitland, 2nd ed., vol. I (London: Macmillan, 1904).",
        "href": "https://archive.org/stream/grovesdictionar02boydgoog/grovesdictionar02boydgoog_djvu.txt",
        "image": {
          "src": "/covers/glen-hansard-dies-motorcycle-crash--a1.png",
          "alt": "Portrait photograph of the French composer Ernest Chausson.",
          "credit": "Portrait photograph of Ernest Chausson, late 19th century; Wikimedia Commons; public domain."
        }
      },
      {
        "category": "literary",
        "title": "The Singing Head on the River",
        "excerpt": "The limbs lie scattered in various places. Thou, Hebrus, dost receive the head and the lyre; and (wondrous to relate!) while it rolls down the midst of the stream, the lyre complains in I know not what kind of mournful strain. His lifeless tongue, too, utters a mournful sound, to which the banks mournfully reply.",
        "source": "Ovid, Metamorphoses, Book XI (the death of Orpheus), trans. Henry T. Riley (London: Henry G. Bohn, 1851).",
        "href": "https://www.gutenberg.org/cache/epub/26073/pg26073.txt",
        "image": {
          "src": "/covers/glen-hansard-dies-motorcycle-crash--a2.png",
          "alt": "Painting of a Thracian girl cradling the severed head of Orpheus resting on his lyre.",
          "credit": "Gustave Moreau, Orphée (Orpheus), 1865, Musée d'Orsay; public domain via Wikimedia Commons (Google Art Project)."
        }
      },
      {
        "category": "literary",
        "title": "Dead Ere His Prime",
        "excerpt": "Yet once more, O ye Laurels, and once more / Ye Myrtles brown, with Ivy never-sear ... For Lycidas is dead, dead ere his prime, / Young Lycidas, and hath not left his peer:",
        "source": "John Milton, \"Lycidas\" (1637; pub. 1645), in Poems of Mr. John Milton, Both English and Latin.",
        "href": "https://en.wikisource.org/wiki/Poems_of_Mr._John_Milton,_Both_English_and_Latin,_Compos'd_at_several_times/Lycidas",
        "image": {
          "src": "/covers/glen-hansard-dies-motorcycle-crash--a3.png",
          "alt": "Portrait of the young John Milton, c. 1629.",
          "credit": "Portrait of John Milton, c. 1629, National Portrait Gallery, London (NPG 4222); public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "The Street Musician, Ennobled by Light",
        "excerpt": "Georges de La Tour paints a blind, aging street musician alone against the dark, his worn face straining as his fingers turn the crank of a battered hurdy-gurdy. The unsparing light dignifies a man who once sang for coins in the road — the same humble ground from which Hansard rose, busking on Dublin's Grafton Street before the world knew his name. It is a portrait of music made at the very bottom, and of the human worth the painter insists we honour.",
        "source": "Georges de La Tour, The Hurdy-Gurdy Player (Le Vielleur), c. 1631–1636, oil on canvas, Musée d'Arts de Nantes.",
        "href": "https://commons.wikimedia.org/wiki/File:Georges_de_La_Tour_-_The_Hurdy-gurdy_Player_-_WGA12335.jpg",
        "image": {
          "src": "/covers/glen-hansard-dies-motorcycle-crash--a4.png",
          "alt": "Baroque painting of a blind hurdy-gurdy player singing in the street.",
          "credit": "Georges de La Tour, c. 1631–1636, Musée d'Arts de Nantes; public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "The Air That Became a Nation's Lament",
        "excerpt": "The Londonderry Air is the most beloved of Irish melodies — an unhurried, aching tune that rises to a single soaring phrase and then falls away like a long farewell, later fitted with the words of \"Danny Boy,\" a mother's lament for a young man gone from home. Wordless, it already sounds like tenderness and grief held together. That an anonymous Irish air should have become the world's default song of loss makes it a fitting requiem for an Irish singer taken too soon.",
        "source": "\"Londonderry Air\" (traditional Irish air, first published in The Ancient Music of Ireland, ed. George Petrie, Dublin, 1855); arr. Frank Bridge, An Irish Melody, H.86 (1908).",
        "href": "https://imslp.org/wiki/An_Irish_Melody_'The_Londonderry_Air',_H.86_(Bridge,_Frank)",
        "image": {
          "src": "/covers/glen-hansard-dies-motorcycle-crash--a5.png",
          "alt": "First printed sheet music of the Londonderry Air, 1855.",
          "credit": "First printing of the Londonderry Air, from The Ancient Music of Ireland, ed. George Petrie, 1855; public domain via Wikimedia Commons."
        }
      }
    ],
    "lead": true,
    "rank": 27
  },
  {
    "slug": "wall-street-dow-drops-ai-stocks-selloff",
    "headline": "Wall Street tumbles, the Dow falling more than 1,100 points as AI-linked stocks slide and oil prices jump",
    "overview": "U.S. stocks fell sharply, with the Dow Jones Industrial Average dropping more than 1,100 points as a selloff in artificial-intelligence-linked technology shares dragged the market lower and oil prices jumped. The rout came after the Federal Reserve left interest rates unchanged, feeding worries that a frothy, AI-driven boom may be losing air.",
    "genre": "Economy",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMimAFBVV95cUxNVVhqMlRBNU0taHdVcUdHUUE3eDFsZEFQbTZ6dElnTEtMOGVSb1ktYlhpbmJHMm9NY2xRc1lQRWRXcGZ2N0NUNm9FSWV1ZkQ2MjAtaE5WWkwxeHFDMmxxX3I4MHNDNmduRnZ4ODNzNUtSZ2hyZEh3NVBtMmthTHA5UDRzcTBXOWJYNS0yVHlUM0loVXE5VThkeg?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiswFBVV95cUxPYTBjTkgxdmttOW1mOFd3NHRiOHNOdEhqMG12bzU1WWVOcm1pTGNuazF6OGU2VkJya1dZd3lKSXRmZ0V3NFJ6eXJGbGk1SzgtQ2E1NzI0YmJQZk9uZ1lmWTZqNHpEY3lrYVZtYlNIYXllOWNYUDdxT1owV3FnX1ZUNHdyMGN4VlM0QVZpbV9PYzkzT1ktVXZLRWx6dmMtNnRIMnVIUzBfakZmMl9kS25ldGQxbw?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-29",
    "image": {
      "src": "/covers/wall-street-dow-drops-ai-stocks-selloff.png",
      "alt": "Traders on the floor of the New York Stock Exchange",
      "credit": "Library of Congress"
    },
    "edition": "Evening Edition · 29 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The financial panic of A.D. 33 under Tiberius",
        "excerpt": "Hence followed a scarcity of money, a great shock being given to all credit, the current coin too, in consequence of the conviction of so many persons and the sale of their property, being locked up in the imperial treasury or the public exchequer.",
        "source": "Tacitus, The Annals, Book VI, chapters 16-17 (trans. Alfred John Church and William Jackson Brodribb, 1876)",
        "href": "https://en.wikisource.org/wiki/The_Annals_(Tacitus)/Book_6"
      },
      {
        "category": "historical",
        "title": "The Wall Street Crash of 1929 and the Great Depression",
        "excerpt": "The money changers have fled from their high seats in the temple of our civilization. We may now restore that temple to the ancient truths.",
        "source": "Franklin D. Roosevelt, First Inaugural Address, March 4, 1933 (The Avalon Project, Yale Law School)",
        "href": "https://avalon.law.yale.edu/20th_century/froos1.asp"
      },
      {
        "category": "literary",
        "title": "The South-Sea Bubble",
        "excerpt": "It seemed at that time as if the whole nation had turned stockjobbers. Exchange Alley was every day blocked up by crowds, and Cornhill was impassable for the number of carriages. Everybody came to purchase stock.",
        "source": "Charles Mackay, Memoirs of Extraordinary Popular Delusions and the Madness of Crowds, Vol. I, \"The South-Sea Bubble\" (London: Richard Bentley, 1841)",
        "href": "https://www.gutenberg.org/files/636/636-h/636-h.htm"
      },
      {
        "category": "literary",
        "title": "The Way We Live Now",
        "excerpt": "Money to come from, sir? Where do you suppose the money comes from in all these undertakings? If we can float the shares, the money'll come in quick enough.",
        "source": "Anthony Trollope, The Way We Live Now (London: Chapman & Hall, 1875)",
        "href": "https://www.gutenberg.org/files/5231/5231-h/5231-h.htm"
      },
      {
        "category": "artistic",
        "title": "The Moneylender and His Wife",
        "excerpt": "A merchant tilts his balance to weigh out gold coins and pearls, while his wife's fingers halt mid-page in her book of devotions, her eyes pulled helplessly toward the glitter. The scales, not the scripture, now command the household. Painted in 1514, it is an early warning that when wealth is measured obsessively, judgment quietly slips out of balance.",
        "source": "Quentin Matsys (Metsys), The Moneylender and His Wife, 1514, oil on panel, Musee du Louvre, Paris",
        "href": "https://commons.wikimedia.org/wiki/File:Massysm_Quentin_%E2%80%94_The_Moneylender_and_his_Wife_%E2%80%94_1514.jpg",
        "image": {
          "src": "/covers/wall-street-dow-drops-ai-stocks-selloff--a4.png",
          "alt": "A moneylender weighs gold coins on a balance while his wife, distracted from her prayer-book, watches the glinting money.",
          "credit": "Quentin Matsys, \"The Moneylender and His Wife\" (1514), Musee du Louvre. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Totentanz (Dance of Death), S.126",
        "excerpt": "Liszt seizes the medieval death-chant \"Dies irae\" and hammers it into a set of savage variations, the piano pounding away like a market in free-fall. The music climbs through dazzling brilliance only to be dragged back, again and again, to the same grim descending motif of doom. It is fortune's wheel rendered in sound: every ascent shadowed by the certainty of the plunge.",
        "source": "Franz Liszt, Totentanz (Dance of Death), paraphrase on the plainchant \"Dies irae\" for piano and orchestra, S.126 (1849, rev. 1859)",
        "href": "https://imslp.org/wiki/Totentanz,_S.126_(Liszt,_Franz)",
        "image": {
          "src": "/covers/wall-street-dow-drops-ai-stocks-selloff--a5.png",
          "alt": "Photographic portrait of the composer Franz Liszt in 1858.",
          "credit": "Franz Hanfstaengl, portrait of Franz Liszt, 1858. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 28
  },
  {
    "slug": "fauci-fifth-amendment-senate-covid-hearing",
    "headline": "Anthony Fauci repeatedly invokes the Fifth Amendment at a Senate hearing on Covid origins led by Rand Paul",
    "overview": "Anthony Fauci, the former top U.S. infectious-disease official, repeatedly invoked his Fifth Amendment right against self-incrimination during a contentious Senate committee hearing led by Senator Rand Paul into the origins of Covid-19. Fauci said he feared Republicans would try to trip him up and use his testimony to pursue a perjury prosecution.",
    "genre": "Politics",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cdx85vkk0gko"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMizgFBVV95cUxPUTRiR2lOSXFrbDN1ckU5bW9fZ3BqUmNnb1J0UVdlMlp4M1V6Uk1RMmhRS2R5RktRV0FVNU51LVlSUjNReFkzbHRrQjVYLVYyU3ZWOG85SWQxb2tLTEdRVmd4bmtRZDlRMDVGb0IxRWNZclFZc3Jjb3liejQ3S2xFc25Ra2plcWdKTm95ZGlBa0hhUnRCcGF5ODRjRU9ZdUVlM0c0dFNxVnRySGYzVDBKVUttZkNVRWVacmUxbGotZVdlWmR6Q2RYVi1MbDA3QQ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-29",
    "image": {
      "src": "/covers/fauci-fifth-amendment-senate-covid-hearing.png",
      "alt": "Anthony Fauci, former director of the U.S. National Institute of Allergy and Infectious Diseases",
      "credit": "NIAID"
    },
    "edition": "Evening Edition · 29 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "John Lilburne refuses to answer \"interrogatories against myself\"",
        "excerpt": "...urged it as illegal, arbitrary, and tyrannical, that the lords in the Star-chamber should order me to be whipped, pillored, &c. for refusing to answer interrogatories against myself; and yet Mr. Bradshaw treads in the same steps, and very seriously asked me questions against myself, and because I refused to answer, committed me for treason in general.",
        "source": "The trial of Lieutenant-Colonel John Lilburne for high treason (1649), from A Complete Collection of State Trials (T. B. Howell), reproduced in Celebrated Trials, Volume 2.",
        "href": "https://en.wikisource.org/wiki/Celebrated_Trials/Volume_2/Lieutenant-Colonel_John_Lilburne,_for_High_Treason"
      },
      {
        "category": "historical",
        "title": "Screenwriter John Howard Lawson turns the tables on the House Un-American Activities Committee",
        "excerpt": "I am not on trial here, Mr. Chairman. This committee is on trial here before the American people. Let us get that straight.",
        "source": "Hearings Regarding the Communist Infiltration of the Motion Picture Industry, House Committee on Un-American Activities, 80th Cong., 1st sess. (Oct. 1947), testimony of John Howard Lawson, p. 292.",
        "href": "https://archive.org/download/hearingsregardin1947aunit/hearingsregardin1947aunit_djvu.txt"
      },
      {
        "category": "literary",
        "title": "Socrates: better to die than to speak unjustly to save himself",
        "excerpt": "There are other ways of escaping death, if a man is willing to say and do anything. The difficulty, my friends, is not to avoid death, but to avoid unrighteousness; for that runs faster than death.",
        "source": "Plato, Apology, trans. Benjamin Jowett (Project Gutenberg eBook #1656).",
        "href": "https://www.gutenberg.org/files/1656/1656-h/1656-h.htm"
      },
      {
        "category": "literary",
        "title": "Bartleby's mild, immovable refusal: \"I would prefer not to\"",
        "excerpt": "Imagine my surprise, nay, my consternation, when without moving from his privacy, Bartleby in a singularly mild, firm voice, replied, “I would prefer not to.” I sat awhile in perfect silence, rallying my stunned faculties.",
        "source": "Herman Melville, Bartleby, the Scrivener: A Story of Wall-Street (1853) (Project Gutenberg eBook #11231).",
        "href": "https://www.gutenberg.org/files/11231/11231-h/11231-h.htm"
      },
      {
        "category": "artistic",
        "title": "Jacques-Louis David, The Death of Socrates",
        "excerpt": "David freezes the philosopher at the instant of decision: upright and serene, one hand closing around the poison cup, the other raised mid-argument, while his disciples collapse in grief around the cell. Condemned by the court of Athens, Socrates chooses death over silence or self-betrayal, turning his own execution into a last act of defiance before his accusers.",
        "source": "Jacques-Louis David, The Death of Socrates, 1787, oil on canvas, The Metropolitan Museum of Art, New York (Catharine Lorillard Wolfe Collection, Wolfe Fund, 1931; accession no. 31.45).",
        "href": "https://commons.wikimedia.org/wiki/File:Jacques-Louis_David_-_The_Death_of_Socrates_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/fauci-fifth-amendment-senate-covid-hearing--a4.png",
          "alt": "Neoclassical painting of Socrates seated upright on his prison bed, reaching for a cup of hemlock while raising his other hand in a gesture of argument, surrounded by grieving disciples.",
          "credit": "The Metropolitan Museum of Art, New York (Catharine Lorillard Wolfe Collection, Wolfe Fund, 1931; acc. no. 31.45); public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Mozart, \"Rex tremendae\" from the Requiem in D minor, K.626",
        "excerpt": "In the \"Rex tremendae\" the chorus hurls itself at the King of dreadful majesty, the judge before whom every soul must finally answer, only to shrink into a whispered plea to be spared. Mozart scores judgment itself as something overwhelming and inescapable, the sound of a tribunal that offers no place to hide.",
        "source": "Wolfgang Amadeus Mozart, Requiem in D minor, K.626 (1791; completed by F. X. Sussmayr), Sequence: \"Rex tremendae majestatis\"; scores at IMSLP.",
        "href": "https://imslp.org/wiki/Requiem_in_D_minor,_K.626_(Mozart,_Wolfgang_Amadeus)",
        "image": {
          "src": "/covers/fauci-fifth-amendment-senate-covid-hearing--a5.png",
          "alt": "Opening page of Mozart's autograph manuscript of the Requiem in D minor, K.626, showing his handwritten heading and the ruled musical staves of the Introit.",
          "credit": "Autograph manuscript, Osterreichische Nationalbibliothek (Austrian National Library), Vienna; public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 29
  },
  {
    "slug": "nextera-brookfield-kentucky-data-center-paducah",
    "headline": "NextEra and Brookfield plan a $100 billion AI data-center campus at the former Paducah uranium-enrichment site in Kentucky",
    "overview": "NextEra Energy and Brookfield unveiled plans for a roughly $100 billion artificial-intelligence data-center campus at the U.S. Department of Energy's former Paducah gaseous-diffusion plant in Kentucky, a Cold War site that once enriched uranium for weapons and reactors before closing in 2013. The project, powered by gigawatts of new gas generation and battery storage, underscores the enormous electricity appetite of the AI boom.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiygFBVV95cUxPU2FOb2YxUGRraFUwbk5LU3hWVFVoRkVEQWI0VlVDenhGak1wWnA4RjBUSlpzQml5bEhEdFFTWGYtWWRkb2h6VGN6LS1DcktNRm02aTliZ2ZhX2tqUVowcmdDb3hnX2E5V05rQlNCbHYyLWxNX3h3UEloMUI0LU9KNDlxUnFhZ3JBb3ktdDNhZG5nZHVrb1d0aUVCdzBXZEJBLVJtLVdLYnZVM2xJSzE0ZWJGcENWNjlVdnRYclpBbFBjclhpYWVNN21R?oc=5"
      },
      {
        "name": "Power Magazine",
        "href": "https://www.powermag.com/brookfield-nextera-to-develop-100b-data-center-campus-at-does-paducah-site-paired-with-4-6-gw-of-dedicated-generation/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-29",
    "image": {
      "src": "/covers/nextera-brookfield-kentucky-data-center-paducah.png",
      "alt": "A uranium-enrichment converter inside the former Paducah Gaseous Diffusion Plant in Kentucky",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 29 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Franklin draws the fire from the sky",
        "excerpt": "But if two gun-barrels electrified will strike at two inches distance, and make a loud snap, to what a great distance may 10,000 acres of electrified cloud strike and give its fire, and how loud must be that crack!",
        "source": "Benjamin Franklin, \"Experiments and Observations on Electricity, Made at Philadelphia in America\" (Letter IV to Peter Collinson, c. 1750), London, 1751-1753.",
        "href": "https://www.gutenberg.org/files/45515/45515-h/45515-h.htm"
      },
      {
        "category": "historical",
        "title": "Einstein and Szilard warn Roosevelt that uranium can yield 'vast amounts of power'",
        "excerpt": "In the course of the last four months it has been made probable - through the work of Joliot in France as well as Fermi and Szilard in America - that it may become possible to set up a nuclear chain reaction in a large mass of uranium, by which vast amounts of power and large quantities of new radium-like elements would be generated. Now it appears almost certain that this could be achieved in the immediate future.",
        "source": "Albert Einstein (drafted with Leo Szilard), letter to President Franklin D. Roosevelt, August 2, 1939.",
        "href": "https://en.wikisource.org/wiki/Albert_Einstein_to_Franklin_D._Roosevelt_-_August_2,_1939"
      },
      {
        "category": "literary",
        "title": "Prometheus steals fire and hands mortals a boundless new power",
        "excerpt": "And I am he that searched out the source of fire, by stealth borne-off inclosed in a fennel-rod, which has shown itself a teacher of every art to mortals, and a great resource.",
        "source": "Aeschylus, \"Prometheus Bound,\" trans. Theodore Alois Buckley, in \"The Tragedies of Aeschylus\" (Project Gutenberg ed.).",
        "href": "https://www.gutenberg.org/files/27458/27458-h/27458-h.htm"
      },
      {
        "category": "literary",
        "title": "Frankenstein and the peril of an 'astonishing power' one cannot control",
        "excerpt": "Learn from me, if not by my precepts, at least by my example, how dangerous is the acquirement of knowledge and how much happier that man is who believes his native town to be the world, than he who aspires to become greater than his nature will allow.",
        "source": "Mary Wollstonecraft Shelley, \"Frankenstein; or, The Modern Prometheus\" (1818; 1831 revised text), Volume I, Chapter IV.",
        "href": "https://www.gutenberg.org/files/84/84-h/84-h.htm"
      },
      {
        "category": "artistic",
        "title": "Rain, Steam and Speed - The Great Western Railway",
        "excerpt": "A black locomotive tears out of a rain-blurred haze across a viaduct, its firebox glowing as bridge, river and sky dissolve into a golden storm of steam and light. Turner makes raw mechanical power feel sublime and faintly menacing, the new engine hurtling forward faster than the eye can hold. It is the industrial age painted as both miracle and elemental force.",
        "source": "J.M.W. Turner, \"Rain, Steam and Speed - The Great Western Railway,\" 1844, oil on canvas, The National Gallery, London (NG538).",
        "href": "https://commons.wikimedia.org/wiki/File:Rain_Steam_and_Speed_the_Great_Western_Railway.jpg",
        "image": {
          "src": "/covers/nextera-brookfield-kentucky-data-center-paducah--a4.png",
          "alt": "Turner's impressionistic oil painting of a steam locomotive rushing across a bridge through rain and golden mist.",
          "credit": "J.M.W. Turner, Rain, Steam and Speed - The Great Western Railway (1844), The National Gallery, London. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "An Experiment on a Bird in the Air Pump",
        "excerpt": "By candlelight a natural philosopher suspends a white cockatoo in a glass globe, pumping out its air as an audience watches life ebb toward death. Wonder, dread and cold curiosity share the circle of faces, dramatizing the moment when human beings realized they could command the very forces of life. Wright renders scientific mastery as a spectacle poised between awe and cruelty.",
        "source": "Joseph Wright of Derby, \"An Experiment on a Bird in the Air Pump,\" 1768, oil on canvas, The National Gallery, London (NG725).",
        "href": "https://commons.wikimedia.org/wiki/File:An_Experiment_on_a_Bird_in_an_Air_Pump_by_Joseph_Wright_of_Derby,_1768.jpg",
        "image": {
          "src": "/covers/nextera-brookfield-kentucky-data-center-paducah--a5.png",
          "alt": "Candlelit 18th-century scene of a scientist demonstrating a vacuum pump on a bird in a glass flask before an absorbed audience.",
          "credit": "Joseph Wright of Derby, An Experiment on a Bird in the Air Pump (1768), The National Gallery, London. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 30
  },
  {
    "slug": "drone-strikes-gas-tanker-egypt-damietta",
    "headline": "A drone strikes a U.S.-owned gas tanker at Egypt's Mediterranean port of Damietta, igniting a fire that spreads to a second vessel",
    "overview": "A drone hit the floating gas-storage tanker Energos Winter at Egypt's Mediterranean port of Damietta, sparking a fire that spread to a second vessel before crews brought it under control and evacuated, the maritime-security firm Ambrey said. No one claimed responsibility, and security sources warned the strike could signal a widening of the Middle East conflict into vital shipping and energy infrastructure.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMirgFBVV95cUxPM3F5LWg3Mm9rYmlhejJpdzJqQW9SWnU1WHJRVm9iZ1p0TUpmRTR6Mk1JYXVUekU2c1VlTHI5bV9DbzIyejlvYU13Y2cxYU12WExOYzJoVmxsVzVoc2hiWkQ2ZWFUZ0EwZHBZZlZ1UnREZjZGc243TlQtMXVKcDQ5bUpEaDR2Tmo5eTJkdlJhSXMtZ0U2cnk0OWNLLU50YlBjbnZrei1FVm9CYWw5cUE?oc=5"
      },
      {
        "name": "Al Arabiya",
        "href": "https://english.alarabiya.net/News/middle-east/2026/07/29/drone-hits-gas-storage-tanker-at-egypt-s-mediterranean-port-of-damietta"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-29",
    "image": {
      "src": "/covers/drone-strikes-gas-tanker-egypt-damietta.png",
      "alt": "A liquefied-gas carrier of the kind used as a floating storage tanker",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 29 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The fire-ship loosed on the Athenian fleet at Syracuse",
        "excerpt": "The rest the enemy tried to burn by means of an old merchantman which they filled with faggots and pine-wood, set on fire, and let drift down the wind which blew full on the Athenians.",
        "source": "Thucydides, History of the Peloponnesian War, Book VII, ch. 53, trans. Richard Crawley (413 BC; London, 1874), via Project Gutenberg.",
        "href": "https://www.gutenberg.org/cache/epub/7142/pg7142.txt"
      },
      {
        "category": "historical",
        "title": "The C.S.S. Sumter burns the merchant bark Golden Rocket",
        "excerpt": "The boarding officer, to do his work more effectually, had applied the torch simultaneously in three places, the cabin, the mainhold, and the forecastle; and now the devouring flames rushed up these three apertures, with a fury which nothing could resist.",
        "source": "Raphael Semmes, Memoirs of Service Afloat, During the War Between the States (Baltimore: Kelly, Piet & Co., 1869), on the burning of his first prize, the bark Golden Rocket, July 1861, via Project Gutenberg.",
        "href": "https://www.gutenberg.org/cache/epub/34827/pg34827.txt"
      },
      {
        "category": "literary",
        "title": "The Trojan women set fire to Aeneas's fleet",
        "excerpt": "Then, what they hear, is witness’d by their eyes: A storm of sparkles and of flames arise.",
        "source": "Virgil, The Aeneid, Book V, trans. John Dryden (London, 1697), via Project Gutenberg.",
        "href": "https://www.gutenberg.org/cache/epub/228/pg228.txt"
      },
      {
        "category": "literary",
        "title": "The coal cargo of the Judea catches fire at sea",
        "excerpt": "I gave one sniff, and put down the lid gently. It was no use choking myself. The cargo was on fire.",
        "source": "Joseph Conrad, \"Youth: A Narrative\" (1898; collected 1902), via Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/525/525-h/525-h.htm"
      },
      {
        "category": "artistic",
        "title": "The Destruction of 'L'Orient' at the Battle of the Nile",
        "excerpt": "Night detonates into daylight as the 120-gun French flagship L'Orient blows apart, flinging spars and rigging across a sky of orange smoke. The neighbouring ships-of-the-line are caught in the glare, their hulls lit by a fire that has already leapt from one vessel to the next. Arnald freezes the instant when a single burning ship turns an entire fleet into a theatre of catastrophe.",
        "source": "George Arnald, \"The Destruction of 'L'Orient' at the Battle of the Nile, 1 August 1798\" (c. 1825–1827), oil on canvas, National Maritime Museum, Greenwich (BHC0509).",
        "href": "https://commons.wikimedia.org/wiki/File:The_Battle_of_the_Nile.jpg",
        "image": {
          "src": "/covers/drone-strikes-gas-tanker-egypt-damietta--a4.png",
          "alt": "Oil painting of the French flagship L'Orient exploding in flames at night during the Battle of the Nile, its blast lighting the surrounding warships and billowing smoke.",
          "credit": "George Arnald, 'The Destruction of L'Orient at the Battle of the Nile, 1 August 1798' (c. 1825–27), National Maritime Museum, Greenwich. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Overture to Der fliegende Holländer (The Flying Dutchman)",
        "excerpt": "The overture opens in horns and strings with a howling open-fifth storm motif, the sound of a sea lashed into violence. Brass and tremolo waves surge and break as the cursed ship is driven on through the gale. It is music of pure maritime dread, a vessel and its crew delivered up to forces far larger than themselves.",
        "source": "Richard Wagner, Overture to Der fliegende Holländer (The Flying Dutchman), WWV 63 (composed 1841; premiered Dresden, 1843), full score via IMSLP.",
        "href": "https://imslp.org/wiki/Der_fliegende_Holländer,_WWV_63_(Wagner,_Richard)",
        "image": {
          "src": "/covers/drone-strikes-gas-tanker-egypt-damietta--a5.png",
          "alt": "Photographic portrait of the composer Richard Wagner, taken in 1871.",
          "credit": "Franz Hanfstaengl, portrait of Richard Wagner, 1871. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 31
  },
  {
    "slug": "mammoth-remains-danube-record-low",
    "headline": "Mammoth remains emerge on the banks of the Danube in Bulgaria after the river falls to a record low",
    "overview": "The jaw, tusks and a possible rib of an ancient mammoth were revealed near the village of Ryahovo in northern Bulgaria after the Danube receded to record-low levels following a summer of prolonged heatwaves and drought across Europe. A local resident spotted the bones and alerted the regional history museum in Ruse, whose experts prepared to excavate them.",
    "genre": "Science",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiywFBVV95cUxOa1c4MHcyT2tOTlJWLTlZcTIyT3NkdU1iY0pveFFKZ0h3OGxlQl9EeFpoaG1DMFZvZm5mUHdvbHR0bjdNV0xrSkxQUHBqdER5bkhuTTFIRGZqbFRJT3RaQnlJeE95WUxFWkdrc013eTVSRllNOFZCMl8zNDc0em9QZ2hiV2dNZGZjTGpzcXRaRjJ5WXVNOGUycGJERlp1cTJwNndzS1FfelNvNVBHSFRoMk9TTTZpMml3c3RTR2VTdlBPSUpBN2pKU0JmWQ?oc=5"
      },
      {
        "name": "Asharq Al-Awsat",
        "href": "https://english.aawsat.com/varieties/5301382-mammoth-remains-revealed-bulgaria-after-danube-water-levels-hit-record-low"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-29",
    "image": {
      "src": "/covers/mammoth-remains-danube-record-low.png",
      "alt": "A life-size reconstruction of a woolly mammoth",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 29 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Augustus and the \"bones of giants\" at Capri",
        "excerpt": "Those of his own, which were far from being spacious, he adorned, not so much with statues and pictures, as with walks and groves, and things which were curious either for their antiquity or rarity; such as, at Capri, the huge limbs of sea-monsters and wild beasts, which some affect to call the bones of giants; and also the arms of ancient heroes.",
        "source": "Suetonius, The Lives of the Twelve Caesars, \"The Life of Augustus,\" ch. 72 (trans. Alexander Thomson, rev. T. Forester), 1st–2nd century AD.",
        "href": "https://en.wikisource.org/wiki/The_Lives_of_the_Twelve_Caesars/Augustus"
      },
      {
        "category": "historical",
        "title": "Cuvier proves a world of vanished beasts",
        "excerpt": "their very races have been extinguished for ever, and have left no other memorial of their existence than some fragments, which the naturalist can scarcely recognize.",
        "source": "Georges Cuvier, Essay on the Theory of the Earth (trans. Robert Kerr, with Prof. Jameson's notes), 5th ed., Edinburgh, 1827.",
        "href": "https://www.gutenberg.org/files/62918/62918-h/62918-h.htm"
      },
      {
        "category": "literary",
        "title": "Ozymandias",
        "excerpt": "And on the pedestal these words appear:\n'My name is Ozymandias, king of kings:\nLook on my works, ye Mighty, and despair!'\nNothing beside remains.",
        "source": "Percy Bysshe Shelley, \"Ozymandias\" (1818), in The Complete Poetical Works of Percy Bysshe Shelley, ed. Thomas Hutchinson, Oxford University Press, 1914.",
        "href": "https://en.wikisource.org/wiki/The_Complete_Poetical_Works_of_Percy_Bysshe_Shelley_(ed._Hutchinson,_1914)/Ozymandias"
      },
      {
        "category": "literary",
        "title": "Hydriotaphia, Urn Burial",
        "excerpt": "But who were the proprietaries of these bones, or what bodies these ashes made up, were a question above antiquarism; not to be resolved by man, nor easily perhaps by spirits, except we consult the provincial guardians, or tutelary observators.",
        "source": "Sir Thomas Browne, \"Hydriotaphia, Urn-Burial\" (1658), in Religio Medici, Hydriotaphia, and the Letter to a Friend.",
        "href": "https://www.gutenberg.org/files/586/586-h/586-h.htm"
      },
      {
        "category": "artistic",
        "title": "Woolly Mammoths (Charles R. Knight)",
        "excerpt": "Shaggy giants trudge across a frozen steppe, their long curved tusks lifted against a pale northern light. Knight paints the mammoth not as a monster but as a living creature, restoring breath and muscle to bones that had lain hidden in the earth for a hundred thousand years.",
        "source": "Charles R. Knight, \"Woolly Mammoths and Rhinoceros\" (c. 1929), painting, The Field Museum, Chicago.",
        "href": "https://commons.wikimedia.org/wiki/File:Woolly_mammoths_by_Knight.jpg",
        "image": {
          "src": "/covers/mammoth-remains-danube-record-low--a4.png",
          "alt": "Painting of woolly mammoths with long curved tusks crossing a cold Pleistocene steppe under a pale sky.",
          "credit": "Charles R. Knight, \"Woolly Mammoths and Rhinoceros\" (c. 1929), The Field Museum. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "\"Fossils,\" from The Carnival of the Animals",
        "excerpt": "A xylophone clatters like dry bones shaken suddenly awake, rattling out the very skeleton-dance tune Saint-Saëns had once written for Death himself. Beneath the wit lies a colder thought about deep time: whatever now walks the earth will one day lie still in the museum drawer, waiting to be found.",
        "source": "Camille Saint-Saëns, \"Fossiles,\" from Le carnaval des animaux (1886), full score. Score on IMSLP.",
        "href": "https://imslp.org/wiki/Le_carnaval_des_animaux_(Saint-Sa%C3%ABns,_Camille)",
        "image": {
          "src": "/covers/mammoth-remains-danube-record-low--a5.png",
          "alt": "Photographic portrait of the composer Camille Saint-Saëns, taken in 1900.",
          "credit": "Camille Saint-Saëns, photographed by Pierre Petit, 1900 (Gallica). Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 32
  },
  {
    "slug": "bts-withdraw-2027-grammys",
    "headline": "BTS say they will not submit their music for the 2027 Grammy Awards",
    "overview": "All seven members of the South Korean pop group BTS announced they would not submit their music for consideration at the 2027 Grammy Awards, a public snub of the Recording Academy that came a month after the Grammys introduced a new award category for Asian pop. Despite record-breaking global success, BTS have never won a competitive Grammy, and their withdrawal reignited debate over the awards' treatment of non-Western artists.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMiggFBVV95cUxORGVjOTNSdXA3bVZGYjJTQ2t2WXBtY0h0QlVHUnkyTk90aHdrbEdxekJGQ3pveDBaVDVZdEV4TVFsSUluSTloOGswMU1CTEtnNEl6cE41b1hTN2ZYQ1NxVXdvQ3JrSkFHdlFlSXZ6dkFic3NualJidnNWMUdWTVo2dnh3?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/clyjgyd0225o"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-29",
    "image": {
      "src": "/covers/bts-withdraw-2027-grammys.png",
      "alt": "The South Korean pop group BTS performing on stage",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 29 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Caesar refuses the diadem at the Lupercalia (44 BC)",
        "excerpt": "Antony was running with the rest; but, omitting the old ceremony, twining a garland of bay round a diadem, he ran up to the Rostra, and, being lifted up by his companions, would have put it upon the head of Caesar, as if by that ceremony he were declared king. Caesar seemingly refused, and drew aside to avoid it, and was applauded by the people with great shouts. Again Antony pressed it, and again he declined its acceptance.",
        "source": "Plutarch, \"Life of Antony,\" in Plutarch's Lives, trans. John Dryden, rev. Arthur Hugh Clough",
        "href": "https://en.wikisource.org/wiki/Plutarch%27s_Lives_(Clough)/Life_of_Antony"
      },
      {
        "category": "historical",
        "title": "Rousseau declines a pension from Louis XV (1752)",
        "excerpt": "I lost, it is true, the pension which in some measure was offered me; but I at the same time exempted myself from the yoke it would have imposed. Adieu, truth, liberty, and courage! How should I afterwards have dared to speak of disinterestedness and independence?",
        "source": "Jean-Jacques Rousseau, The Confessions of Jean Jacques Rousseau, Book VIII (Aldus edition)",
        "href": "https://en.wikisource.org/wiki/The_Confessions_of_Jean_Jacques_Rousseau_(Aldus)/Book_VIII"
      },
      {
        "category": "literary",
        "title": "Bartleby's \"I would prefer not to\"",
        "excerpt": "Imagine my surprise, nay, my consternation, when without moving from his privacy, Bartleby in a singularly mild, firm voice, replied, “I would prefer not to.” I sat awhile in perfect silence, rallying my stunned faculties.",
        "source": "Herman Melville, \"Bartleby, the Scrivener: A Story of Wall-Street\" (1853)",
        "href": "https://www.gutenberg.org/files/11231/11231-h/11231-h.htm"
      },
      {
        "category": "literary",
        "title": "Antigone defies Creon's edict",
        "excerpt": "Yea, for these laws were not ordained of Zeus, And she who sits enthroned with gods below, Justice, enacted not these human laws. Nor did I deem that thou, a mortal man, Could’st by a breath annul and override The immutable unwritten laws of Heaven.",
        "source": "Sophocles, Antigone, trans. Francis Storr, in Plays of Sophocles (Oedipus the King; Oedipus at Colonus; Antigone)",
        "href": "https://www.gutenberg.org/files/31/31-h/31-h.htm"
      },
      {
        "category": "artistic",
        "title": "Le Déjeuner sur l'herbe (Luncheon on the Grass)",
        "excerpt": "Rejected by the jury of the official Paris Salon, Manet's brazen picnic scene became the scandal of the breakaway Salon des Refusés, where spurned painters mounted their own show rather than bow to the academy. A nude woman stares out unabashed beside two clothed gentlemen, flouting every convention the establishment prized. What the gatekeepers dismissed as an affront the public could not stop discussing, and the snubbed canvas outlived the institution that turned it away.",
        "source": "Édouard Manet, Le Déjeuner sur l'herbe, 1863, oil on canvas, Musée d'Orsay, Paris",
        "href": "https://commons.wikimedia.org/wiki/File:%C3%89douard_Manet_-_Le_D%C3%A9jeuner_sur_l%27herbe.jpg",
        "image": {
          "src": "/covers/bts-withdraw-2027-grammys--a4.png",
          "alt": "Manet's painting of two clothed men and a nude woman seated on the grass in a wooded glade, with a second lightly dressed woman bathing behind them.",
          "credit": "Édouard Manet, Le Déjeuner sur l'herbe (1863), Musée d'Orsay; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Symphony No. 3 \"Eroica\" — the erased dedication",
        "excerpt": "Beethoven had dedicated his revolutionary Third Symphony to Napoleon Bonaparte, hero of the republic. On learning that Napoleon had crowned himself Emperor, the composer scratched the name from the title page so furiously that he tore through the paper. The music kept its defiant grandeur while shedding the honor it had been meant to confer, a work that refused to serve the power it once saluted.",
        "source": "Ludwig van Beethoven, Symphony No. 3 in E-flat major, Op. 55 (\"Eroica\"), 1804; full score, IMSLP",
        "href": "https://imslp.org/wiki/Symphony_No.3,_Op.55_(Beethoven,_Ludwig_van)",
        "image": {
          "src": "/covers/bts-withdraw-2027-grammys--a5.png",
          "alt": "Title page of Beethoven's Third Symphony showing the dedication to Bonaparte violently scratched out, leaving a hole rubbed through the paper.",
          "credit": "Title page of Beethoven's Symphony No. 3, Op. 55, with the erased dedication to Napoleon; public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 33
  },
  {
    "slug": "simone-forti-postmodern-dance-dies-91",
    "headline": "Simone Forti, a pioneer of postmodern dance whose 'Dance Constructions' reshaped movement art, dies at 91",
    "overview": "Simone Forti, the Italian-born American artist and choreographer whose 1960s 'Dance Constructions' - spare, improvisatory works built around everyday tasks and objects - helped launch the Judson Dance Theater revolution and were later acquired by the Museum of Modern Art, has died at 91 in Los Angeles. Her decades of work fused movement, speech and nature, influencing generations of dancers.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Artforum",
        "href": "https://www.artforum.com/news/simone-forti-pioneer-of-postmodern-dance-dead-at-91-1234755909/"
      },
      {
        "name": "MoMA",
        "href": "https://www.moma.org/artists/34908"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-29",
    "image": {
      "src": "/covers/simone-forti-postmodern-dance-dies-91.png",
      "alt": "The choreographer and dancer Simone Forti",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 29 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Lucian defends dance as the oldest and noblest of the arts",
        "excerpt": "The best antiquarians, let me tell you, trace dancing back to the creation of the universe; it is coeval with that Eros who was the beginning of all things.",
        "source": "Lucian of Samosata, \"Of Pantomime\" (De Saltatione, c. 2nd century AD), in The Works of Lucian of Samosata, trans. H. W. Fowler and F. G. Fowler, vol. II (Oxford: Clarendon Press, 1905).",
        "href": "https://archive.org/details/worksoflucianofs02luciuoft"
      },
      {
        "category": "historical",
        "title": "Isadora Duncan's barefoot revolt against classical ballet",
        "excerpt": "The noblest in art is the nude. This truth is recognized by all, and followed by painters, sculptors and poets; only the dancer has forgotten it, who should most remember it, as the instrument of her art is the human body itself.",
        "source": "Isadora Duncan, \"The Dance of the Future\" (1903), in The Art of the Dance (New York: Theatre Arts, Inc., 1928).",
        "href": "https://archive.org/details/duncan-art-of-dance"
      },
      {
        "category": "literary",
        "title": "W. B. Yeats, \"Among School Children\"",
        "excerpt": "O chestnut tree, great rooted blossomer, / Are you the leaf, the blossom or the bole? / O body swayed to music, O brightening glance, / How can we know the dancer from the dance?",
        "source": "W. B. Yeats, \"Among School Children,\" in The Tower (London: Macmillan, 1928), stanza VIII.",
        "href": "https://en.wikisource.org/wiki/The_Tower_(Yeats)/Among_School_Children"
      },
      {
        "category": "literary",
        "title": "Nietzsche's \"dancing star\" in Thus Spake Zarathustra",
        "excerpt": "I tell you: one must still have chaos in one, to give birth to a dancing star. I tell you: ye have still chaos in you.",
        "source": "Friedrich Nietzsche, Thus Spake Zarathustra, trans. Thomas Common; Zarathustra's Prologue, section 5.",
        "href": "https://www.gutenberg.org/files/1998/1998-h/1998-h.htm"
      },
      {
        "category": "artistic",
        "title": "Edgar Degas, The Dance Class",
        "excerpt": "Two dozen young ballerinas cluster in a bare rehearsal room, one scratching her back, another fussing with a sash, while the aging ballet master Jules Perrot leans on his long stick. Degas fixes on dance in its unglamorous in-between moments, the waiting and the fidgeting, finding the ordinary labor beneath the polished art.",
        "source": "Edgar Degas, The Dance Class (La Classe de danse), 1874, oil on canvas, The Metropolitan Museum of Art, New York (bequest of Mrs. Harry Payne Bingham, 1986).",
        "href": "https://www.metmuseum.org/art/collection/search/438817",
        "image": {
          "src": "/covers/simone-forti-postmodern-dance-dies-91--a4.png",
          "alt": "Young ballet dancers gathered in a rehearsal room, some resting or adjusting their costumes, while a ballet master watches with a walking stick.",
          "credit": "Edgar Degas, The Dance Class (1874), The Metropolitan Museum of Art. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Igor Stravinsky, The Rite of Spring (Le Sacre du printemps)",
        "excerpt": "Stridently dissonant chords pound in lurching, irregular rhythms as an imagined pagan tribe dances a chosen maiden to her death. At its 1913 Paris premiere the music and Nijinsky's convulsive choreography ignited a near-riot, and in the uproar rewrote what movement set to sound could be.",
        "source": "Igor Stravinsky, The Rite of Spring (Le Sacre du printemps), full orchestral score, 1913 (rev. editions), K015.",
        "href": "https://imslp.org/wiki/The_Rite_of_Spring,_K015_(Stravinsky,_Igor)",
        "image": {
          "src": "/covers/simone-forti-postmodern-dance-dies-91--a5.png",
          "alt": "Painted scenery sketch of a rolling, hilly pagan landscape designed for the ballet The Rite of Spring.",
          "credit": "Nicholas Roerich, scenery design for The Rite of Spring (1912). Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 34
  },
  {
    "slug": "ghana-nationwide-blackout-grid",
    "headline": "Ghana suffers a nationwide blackout after a grid disturbance trips power plants",
    "overview": "A pre-dawn 'system disturbance' on Ghana's national transmission grid tripped several generating plants at once, plunging the capital Accra, the commercial hub Kumasi and much of the country into darkness and knocking out water-treatment plants. The grid operator GRIDCo launched an investigation and raced to restore power, in the latest bout of the chronic outages Ghanaians call 'dumsor.'",
    "genre": "Economy",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/crmrkgr4z0jo"
      },
      {
        "name": "Graphic Online",
        "href": "https://www.graphic.com.gh/news/general-news/gridco-on-why-there-is-nationwide-electric-power-outage-in-ghana.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-29",
    "image": {
      "src": "/covers/ghana-nationwide-blackout-grid.png",
      "alt": "The skyline of Accra, Ghana, at night",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 29 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The eclipse that halted the Battle of the Halys (585 BC)",
        "excerpt": "...another combat took place in the sixth year, in the course of which, just as the battle was growing warm, day was on a sudden changed into night. This event had been foretold by Thales, the Milesian, who forewarned the Ionians of it, fixing for it the very year in which it actually took place. The Medes and Lydians, when they observed the change, ceased fighting, and were alike anxious to have terms of peace agreed on.",
        "source": "Herodotus, The Histories, Book I.74, trans. George Rawlinson (1858-60), via Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_History_of_Herodotus_(Rawlinson)/Book_1"
      },
      {
        "category": "historical",
        "title": "Edison switches on the Pearl Street station and lights lower Manhattan (September 4, 1882)",
        "excerpt": "On Monday, September 4, 1882, at 3 o'clock, P.M., Edison realized the consummation of his broad and original scheme. The Pearl Street station was officially started by admitting steam to the engine of one of the \"Jumbos,\" current was generated, turned into the network of underground conductors, and was transformed into light by the incandescent lamps that had thus far been installed.",
        "source": "Frank Lewis Dyer and Thomas Commerford Martin, Edison: His Life and Inventions (New York and London: Harper & Brothers, 1910), via Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/820/820-h/820-h.htm"
      },
      {
        "category": "literary",
        "title": "Lord Byron, \"Darkness\" (1816)",
        "excerpt": "I had a dream, which was not all a dream. / The bright sun was extinguished, and the stars / Did wander darkling in the eternal space, / Rayless, and pathless, and the icy Earth / Swung blind and blackening in the moonless air;",
        "source": "Lord Byron, \"Darkness\" (1816), in The Works of Lord Byron, ed. E. H. Coleridge, Vol. 4 (London: John Murray, 1905), via Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_Works_of_Lord_Byron_(ed._Coleridge,_Prothero)/Poetry/Volume_4/Darkness"
      },
      {
        "category": "literary",
        "title": "John Milton, Paradise Lost, Book I - \"darkness visible\" (1667)",
        "excerpt": "A dungeon horrible, on all sides round, / As one great furnace flamed; yet from those flames / No light; but rather darkness visible / Served only to discover sights of woe,",
        "source": "John Milton, Paradise Lost, Book I, lines 61-64 (1667), via Project Gutenberg.",
        "href": "https://www.gutenberg.org/cache/epub/26/pg26.txt"
      },
      {
        "category": "artistic",
        "title": "Georges de La Tour, The Penitent Magdalen (ca. 1640)",
        "excerpt": "A single candle flame is the only power left in the room, and it rules everything it touches. The Magdalen sits utterly still before it, one hand resting on a skull, her face and the mirror lit gold while the rest of the world collapses into black. La Tour makes darkness the true subject and lets one small light decide what can be seen at all.",
        "source": "Georges de La Tour, The Penitent Magdalen (Madeleine aux deux flammes), oil on canvas, ca. 1640. The Metropolitan Museum of Art, New York, accession no. 1978.517 (Gift of Mr. and Mrs. Charles Wrightsman, 1978).",
        "href": "https://commons.wikimedia.org/wiki/File:The_Penitent_Magdalen_MET_DT7252.jpg",
        "image": {
          "src": "/covers/ghana-nationwide-blackout-grid--a4.png",
          "alt": "A young woman in candlelight rests her chin on one hand and gazes toward a flame; a skull sits in her lap on an open book, while most of the room dissolves into darkness.",
          "credit": "Georges de La Tour, The Penitent Magdalen, ca. 1640. The Metropolitan Museum of Art, New York (Gift of Mr. and Mrs. Charles Wrightsman, 1978). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Joseph Haydn, Die Schöpfung (The Creation) - \"The Representation of Chaos\" to the blaze of light (1798)",
        "excerpt": "Die Vorstellung des Chaos (The Representation of Chaos). ... Im Anfange schuf Gott Himmel und Erde (In the beginning God created the heaven and the earth).",
        "source": "Joseph Haydn, Die Schöpfung (The Creation), Hob. XXI:2, oratorio, first performed 1798; full and vocal scores via the IMSLP / Petrucci Music Library.",
        "href": "https://imslp.org/wiki/Die_Sch%C3%B6pfung,_Hob.XXI:2_(Haydn,_Joseph)",
        "image": {
          "src": "/covers/ghana-nationwide-blackout-grid--a5.png",
          "alt": "Portrait of the composer Joseph Haydn, seated in a dark coat against a plain background, painted by Thomas Hardy in 1791.",
          "credit": "Thomas Hardy, portrait of Joseph Haydn, 1791. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 35
  },
  {
    "slug": "fed-holds-rates-steady-dissent",
    "headline": "The Federal Reserve holds interest rates steady as three policymakers dissent in favor of a rate increase",
    "overview": "The U.S. Federal Reserve left its benchmark interest rate unchanged, holding a cautious line even as three of its policymakers dissented in favor of a hike, an unusually large split that underscored deep disagreement over inflation risks. Stocks fell and gold rose as investors parsed the decision and the central bank's guidance.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMipwFBVV95cUxPcTZRdS1qU1NyM2NYeEoyTVBCdUFERzRDa3ZmelhwYkstWUNlMkc3S2tsUXRHcnhOUnAzMDdHXzY3TXdWa3JFbTE4TWZBeEJBSlRWSWFzSnZxX1VBVTE4ZklGV1JJSlJVTXNyN2VJMV9WWWJ0alNfeFZMZWNYTnJrVUk1SG5rczF0ekk1NXhRZFZQSE40RGx2UGROWlE1YVR3aWZUaVRxbw?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiqAFBVV95cUxOYmpPZkdUdEJHY2hvRUZxbzItX3lCN3IxR0o0V3dXQnJoYi1xakZBT2xzVFVIZjdnVGZya2pFWDRUb0k1NUpWTjZyYnoyUWJNNzJLekRZcDNNeXhZcXpOeGdnenVPZGtVMlY4Wll5YUVSQklMYktHb0FYckJ5ZkNRajZOT0V6M2hjeUJTMVhZbHoyZlRJcnZxZ1ZyeFlCNzVKU29ETFFFc3o?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-29",
    "image": {
      "src": "/covers/fed-holds-rates-steady-dissent.png",
      "alt": "The Marriner S. Eccles Federal Reserve Board Building in Washington",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 29 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Andrew Jackson's Veto of the Bank of the United States",
        "excerpt": "It is to be regretted that the rich and powerful too often bend the acts of government to their selfish purposes.",
        "source": "Andrew Jackson, Veto Message Regarding the Bank of the United States, July 10, 1832.",
        "href": "https://avalon.law.yale.edu/19th_century/ajveto01.asp"
      },
      {
        "category": "historical",
        "title": "William Jennings Bryan's \"Cross of Gold\" Speech",
        "excerpt": "You shall not press down upon the brow of labor this crown of thorns, you shall not crucify mankind upon a cross of gold.",
        "source": "William Jennings Bryan, \"Cross of Gold\" Speech, Democratic National Convention, Chicago, July 9, 1896.",
        "href": "https://en.wikisource.org/wiki/Cross_of_Gold_Speech"
      },
      {
        "category": "literary",
        "title": "The Ants and the Grasshopper",
        "excerpt": "The Ants inquired of him, \"Why did you not treasure up food during the summer?\" He replied, \"I had not leisure enough. I passed the days in singing.\" They then said in derision: \"If you were foolish enough to sing all the summer, you must dance supperless to bed in the winter.\"",
        "source": "Aesop, \"The Ants and the Grasshopper,\" in Aesop's Fables, trans. George Fyler Townsend (Project Gutenberg).",
        "href": "https://www.gutenberg.org/files/21/21-h/21-h.htm"
      },
      {
        "category": "literary",
        "title": "The Merchant of Venice (Antonio on lending and barren metal)",
        "excerpt": "If thou wilt lend this money, lend it not As to thy friends, for when did friendship take A breed for barren metal of his friend?",
        "source": "William Shakespeare, The Merchant of Venice, Act I, Scene III (Project Gutenberg).",
        "href": "https://www.gutenberg.org/files/1515/1515-h/1515-h.htm"
      },
      {
        "category": "artistic",
        "title": "Woman Holding a Balance",
        "excerpt": "A woman stands in a hushed, light-filled room, holding an empty balance and waiting for it to come to rest. Pearls and gold lie scattered before her, yet her attention is on the perfect equilibrium of the scales, a quiet meditation on judgment, measure, and the weighing of worth against the reckoning depicted on the wall behind her.",
        "source": "Johannes Vermeer, Woman Holding a Balance, c. 1664, oil on canvas, National Gallery of Art, Washington, D.C. (accession 1942.9.97).",
        "href": "https://commons.wikimedia.org/wiki/File:Johannes_Vermeer_-_Woman_Holding_a_Balance_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/fed-holds-rates-steady-dissent--a4.png",
          "alt": "A woman in a blue jacket stands at a table in soft window light, delicately holding an empty balance scale, with pearls and gold before her.",
          "credit": "Johannes Vermeer, Woman Holding a Balance, c. 1664, National Gallery of Art, Washington, D.C.; public domain via Wikimedia Commons (Google Art Project)."
        }
      },
      {
        "category": "artistic",
        "title": "The Moneylender and His Wife",
        "excerpt": "A moneylender weighs coins and pearls on a small balance while his wife, a devotional book open in her hands, turns her gaze from scripture to the glinting gold on the table. A convex mirror in the foreground reflects a man reading by a window, and the whole scene poses a sober question about where value truly lies and the pull between prudence and profit.",
        "source": "Quentin Matsys, The Moneylender and His Wife, 1514, oil on panel, Musée du Louvre, Paris (INV 1444).",
        "href": "https://commons.wikimedia.org/wiki/File:Quentin_Massys_001.jpg",
        "image": {
          "src": "/covers/fed-holds-rates-steady-dissent--a5.png",
          "alt": "A Renaissance couple at a table; the husband weighs gold coins on a balance while his wife pauses over an illuminated prayer book.",
          "credit": "Quentin Matsys, The Moneylender and His Wife, 1514, Musée du Louvre, Paris; public domain via Wikimedia Commons (The Yorck Project)."
        }
      }
    ],
    "rank": 36
  },
  {
    "slug": "trump-dulles-airport-22-billion-plan",
    "headline": "Trump unveils a $22 billion plan to rebuild Washington's Dulles airport with four new concourses",
    "overview": "President Trump announced a roughly $22 billion plan to remake Washington Dulles International Airport, adding four new concourses, an extended underground train and a vast new parking garage while scrapping the airport's aging 'mobile lounge' people-movers. The project, to be funded partly by taxpayers and partly by the airlines, is pitched as a monument befitting the nation's capital and a fix for a long-criticized gateway.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiqgFBVV95cUxOZXhHaHYtMVE2OUdfRHZTUlhoTnpFNHZ6TXBKdV9IVjRYVklkNHJZYVpsWUJEdHpfeFpZNkZNX3plYmFWaVU1a3haQmEwcWV5Vjh4NGlvcEVnTEhqdTl4VkdsZnI2NXpMaFQzLUJSaUNpX2RmY0t5dzNjZ2VXeEhKZUZMcmJ4dmxvU3NOUGRnc2JYdFJFMTVaSXNrWHM0Y0ZFWlBXNkVuVzNrdw?oc=5"
      },
      {
        "name": "U.S. News",
        "href": "https://www.usnews.com/news/us/articles/2026-07-29/trump-to-unveil-22-billion-plan-to-remake-washington-dulles-airport"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-29",
    "image": {
      "src": "/covers/trump-dulles-airport-22-billion-plan.png",
      "alt": "The Eero Saarinen main terminal at Washington Dulles International Airport",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 29 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Augustus leaves Rome a city of marble",
        "excerpt": "The city, which was not built in a manner suitable to the grandeur of the empire, and was liable to inundations of the Tiber, as well as to fires, was so much improved under his administration, that he boasted, not without reason, that he \"found it of brick, but left it of marble.\"",
        "source": "Suetonius, The Lives of the Twelve Caesars, \"The Life of Augustus,\" ch. 29 (trans. Alexander Thomson), Perseus Digital Library",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.02.0132%3Alife%3Daug.%3Achapter%3D29"
      },
      {
        "category": "historical",
        "title": "Cheops conscripts all Egypt to raise the Great Pyramid",
        "excerpt": "Cheops became king over them and brought them to every kind of evil: for he shut up all the temples, and having first kept them from sacrifices there, he then bade all the Egyptians work for him.",
        "source": "Herodotus, An Account of Egypt (Histories, Book II, sec. 124), trans. G. C. Macaulay, Project Gutenberg",
        "href": "https://www.gutenberg.org/files/2131/2131-h/2131-h.htm"
      },
      {
        "category": "literary",
        "title": "The Tower of Babel",
        "excerpt": "And they said, Go to, let us build us a city and a tower, whose top may reach unto heaven; and let us make us a name, lest we be scattered abroad upon the face of the whole earth.",
        "source": "Genesis 11:4, The Holy Bible, King James Version (1611), Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/10/pg10.txt"
      },
      {
        "category": "literary",
        "title": "Ozymandias",
        "excerpt": "And on the pedestal these words appear: \"My name is Ozymandias, King of Kings.\" Look on my works ye Mighty, and despair! No thing beside remains.",
        "source": "Percy Bysshe Shelley, \"Ozymandias,\" first published in The Examiner, 11 January 1818, Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Examiner_(London)/Ozymandias"
      },
      {
        "category": "artistic",
        "title": "Rain, Steam and Speed – The Great Western Railway",
        "excerpt": "A black locomotive bursts out of a squall of rain and golden mist, hurtling across Brunel's new Maidenhead bridge toward the viewer. Turner turns raw industrial power into a sublime spectacle, the machine sharper and darker than the dissolving landscape around it. It is the age's monument to speed and engineering, rendered as awe rather than mere transport.",
        "source": "J. M. W. Turner, Rain, Steam and Speed – The Great Western Railway, 1844, oil on canvas, The National Gallery, London (NG538)",
        "href": "https://www.nationalgallery.org.uk/paintings/joseph-mallord-william-turner-rain-steam-and-speed-the-great-western-railway",
        "image": {
          "src": "/covers/trump-dulles-airport-22-billion-plan--a4.png",
          "alt": "Turner's painting of a dark steam locomotive rushing across a railway bridge through rain and glowing mist.",
          "credit": "J. M. W. Turner, Rain, Steam and Speed – The Great Western Railway (1844), The National Gallery, London; via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "artistic",
        "title": "Triumphal March from Aida",
        "excerpt": "Blazing trumpets announce a victorious army parading before the throne, pageantry engineered to overwhelm. Verdi's march is the sound of an empire staging its own grandeur, ceremony scaled up until spectacle becomes the message. Few works so frankly celebrate power expressed through sheer monumental display.",
        "source": "Giuseppe Verdi, Aïda (1871), Act II \"Triumphal Scene\" (Grand March), full orchestral score, IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/A%C3%AFda_(Verdi,_Giuseppe)",
        "image": {
          "src": "/covers/trump-dulles-airport-22-billion-plan--a5.png",
          "alt": "Ornate 1872 printed poster advertising a production of Verdi's opera Aida in Parma.",
          "credit": "Poster for Aida, Parma, 1872 (author unknown); via Wikimedia Commons (public domain)."
        }
      }
    ],
    "rank": 37
  },
  {
    "slug": "israeli-settlers-syria-outpost",
    "headline": "A fringe Israeli settler group repeatedly slips into Syria to try to claim land for a Jewish outpost",
    "overview": "A small right-wing Israeli group calling itself the Bashan Pioneers - named for the biblical region of Bashan that spans part of modern Syria - has been crossing the border every few days in a fringe campaign to establish a Jewish outpost in southern Syria near the Israeli-held Golan Heights. Their brief incursions have so far been broken up by Israel's own military before anything could be built.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMiqAFBVV95cUxQTndXODBoWHFqNjZlamRBMnljd0tDODNYZEhiQzRpcEdhSmE1YmtyUThRV0Zvd3NkUDBWS0FYNjhFdFRFWjVvTm9MNTMweGVHSTFfbHNNcnhFbW5IcEZWYXBXeGZETkZhRkg4Ylo2NWo4WjVXQ3gwbWx2UUJWZUE1R0R3NDdkeFRUbGNOZ3JJTlVlajBkUGExTXRlVDZLOHJIREpLMEgwaXg?oc=5"
      },
      {
        "name": "Times of Israel",
        "href": "https://www.timesofisrael.com/fringe-settler-group-sneaking-into-syria-in-bid-to-claim-land-for-jewish-outpost/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-29",
    "image": {
      "src": "/covers/israeli-settlers-syria-outpost.png",
      "alt": "The landscape of the Golan Heights, with the Sea of Galilee in the distance",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 29 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Conquest of Bashan and the Defeat of King Og",
        "excerpt": "So the LORD our God delivered into our hands Og also, the king of Bashan, and all his people: and we smote him until none was left to him remaining. And we took all his cities at that time, there was not a city which we took not from them, threescore cities, all the region of Argob, the kingdom of Og in Bashan.",
        "source": "Deuteronomy 3:3-6, King James Version (1611).",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Deuteronomy"
      },
      {
        "category": "historical",
        "title": "The Homestead Act and the Rush to Claim the Western Frontier",
        "excerpt": "That any person who is the head of a family, or who has arrived at the age of twenty-one years, and is a citizen of the United States",
        "source": "Homestead Act, 12 Stat. 392 (May 20, 1862), Section 1. The Avalon Project, Yale Law School.",
        "href": "https://avalon.law.yale.edu/19th_century/homestead_act.asp"
      },
      {
        "category": "literary",
        "title": "Aeneas, Fated to Win a New Land by War",
        "excerpt": "Arms, and the Man I sing, who forc'd by Fate, And haughty Juno's unrelenting Hate; Expell'd and exil'd, left the Trojan Shoar: Long Labours, both by Sea and Land he bore And in the doubtful War, before he won The Latian Realm, and built the destin'd Town: His banish'd Gods restor'd to Rites Divine, And setl'd sure Succession in his Line.",
        "source": "Virgil, The Aeneid, Book I, lines 1-8, trans. John Dryden (1697).",
        "href": "https://en.wikisource.org/wiki/The_Works_of_Virgil_(Dryden)/Aeneid/Book_I"
      },
      {
        "category": "literary",
        "title": "Joshua Commanded to Cross Over and Possess the Land",
        "excerpt": "Moses my servant is dead; now therefore arise, go over this Jordan, thou, and all this people, unto the land which I do give to them, even to the children of Israel. Every place that the sole of your foot shall tread upon, that have I given unto you, as I said unto Moses.",
        "source": "Joshua 1:2-3, King James Version (1611).",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Joshua"
      },
      {
        "category": "artistic",
        "title": "American Progress",
        "excerpt": "A luminous, classically robed figure of Columbia floats westward across the continent, stringing telegraph wire and drawing settlers, stagecoaches, and railroads in her wake. Ahead of her, driven into shadow at the canvas's edge, Native peoples and buffalo flee the advancing line. Gast frames the seizure of contested land not as conquest but as radiant, inevitable destiny.",
        "source": "John Gast, American Progress, 1872, oil on canvas. Autry Museum of the American West, Los Angeles.",
        "href": "https://commons.wikimedia.org/wiki/File:American_Progress_(John_Gast_painting).jpg",
        "image": {
          "src": "/covers/israeli-settlers-syria-outpost--a4.png",
          "alt": "A classically robed female figure floats westward across the American plains, leading settlers, wagons and railroads while Native Americans and bison flee before her.",
          "credit": "John Gast, 'American Progress' (1872), via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "artistic",
        "title": "Va, pensiero (Chorus of the Hebrew Slaves), from Nabucco",
        "excerpt": "Va, pensiero, sull'ali dorate; va, ti posa sui clivi, sui colli, ove olezzano tepide e molli l'aure dolci del suolo natal!",
        "source": "Giuseppe Verdi, Nabucco (1842), Act III; libretto by Temistocle Solera. Full score via IMSLP.",
        "href": "https://imslp.org/wiki/Nabucco_(Verdi,_Giuseppe)",
        "image": {
          "src": "/covers/israeli-settlers-syria-outpost--a5.png",
          "alt": "Pastel portrait of composer Giuseppe Verdi in a dark coat, top hat and white scarf.",
          "credit": "Giovanni Boldini, portrait of Giuseppe Verdi (1886), Galleria Nazionale d'Arte Moderna, Rome, via Wikimedia Commons (public domain)."
        }
      }
    ],
    "rank": 38
  },
  {
    "slug": "plus-pool-floating-river-pool-new-york",
    "headline": "+Pool, a cross-shaped floating swimming pool that filters New York's river water, nears completion",
    "overview": "The pilot for +Pool - a plus-shaped floating swimming pool designed by Family New York and PlayLab to draw in and filter river water through layered membranes, with no chlorine added - is nearing completion ahead of a planned New York debut at Pier 35. The long-gestating project revives a 19th-century idea of public river baths and, backed by a state 'NY Swims' initiative, aims to let New Yorkers safely swim in their own river again.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Dezeen",
        "href": "https://www.dezeen.com/2026/07/29/floating-plus-pool-pilot-nearing-completion-construction/"
      },
      {
        "name": "ArchDaily",
        "href": "https://www.archdaily.com/1031344/nycs-first-river-based-water-filtering-pool-takes-shape-at-pier-35"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-29",
    "image": {
      "src": "/covers/plus-pool-floating-river-pool-new-york.png",
      "alt": "A floating swimming pool moored in a river",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 29 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Rome's public waters and the pride of civic engineering",
        "excerpt": "With such an array of indispensable structures carrying so many waters, compare, if you will, the idle Pyramids or the useless, though famous, works of the Greeks!",
        "source": "Sextus Julius Frontinus, De Aquaeductu Urbis Romae (The Aqueducts of Rome), Book I, section 16, c. AD 97; trans. Charles E. Bennett (Loeb Classical Library, 1925).",
        "href": "https://en.wikisource.org/wiki/On_the_Aqueducts/Book_1"
      },
      {
        "category": "historical",
        "title": "New York's free river baths of the 1890s",
        "excerpt": "685 1/2 miles of water-mains, and 8,800 hydrants; and 16 public bathing places, used in 1891 by 3,750,000 bathers.",
        "source": "Moses King, ed., King's Handbook of New York City: An Outline History and Description of the American Metropolis (Boston: Moses King, 1892), section on Streets, Sewers, Water.",
        "href": "https://archive.org/details/kingshandbookof00king"
      },
      {
        "category": "literary",
        "title": "Seneca on Scipio's bath and unfiltered water",
        "excerpt": "He did not bathe in filtered water; it was often turbid, and after heavy rains almost muddy!",
        "source": "Seneca, Moral Letters to Lucilius (Epistulae Morales ad Lucilium), Letter 86, 'On Scipio's Villa,' section 11; trans. Richard M. Gummere (Loeb Classical Library, 1920).",
        "href": "https://en.wikisource.org/wiki/Moral_letters_to_Lucilius/Letter_86"
      },
      {
        "category": "literary",
        "title": "Ovid and the clear pool of Salmacis",
        "excerpt": "a pretty pool of soft translucent water may be seen, so clear the glistening bottom glads the eye",
        "source": "Ovid, Metamorphoses, Book IV (Salmacis and Hermaphroditus); trans. Brookes More (Boston: Cornhill Publishing Co., 1922), lines 271-316.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0028:book=4:card=285"
      },
      {
        "category": "artistic",
        "title": "Bathers at Asnieres",
        "excerpt": "On a hot afternoon, working men and boys sprawl along a grassy riverbank and wade into the Seine, the factory chimneys of industrial Paris smoking on the far shore. Seurat gives ordinary bathers the stillness and monumental calm of classical figures, insisting that the right to cool off in a city's river is a dignity owed to everyone. It is the same democratic vision that a filtered pool floating in the East River now tries to restore.",
        "source": "Georges Seurat, Bathers at Asnieres (Une Baignade, Asnieres), 1884, oil on canvas, The National Gallery, London (NG3908).",
        "href": "https://commons.wikimedia.org/wiki/File:Baigneurs_a_Asnieres.jpg",
        "image": {
          "src": "/covers/plus-pool-floating-river-pool-new-york--a4.png",
          "alt": "Painting of working-class men and boys resting and bathing on the bank of the Seine, with industrial chimneys across the water.",
          "credit": "Georges Seurat, Bathers at Asnieres, 1884, The National Gallery, London. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Handel's Water Music",
        "excerpt": "Handel composed his Water Music for King George I's evening party on the Thames, its horns and strings drifting across the river from a barge of some fifty musicians. The suites turned a working waterway into a public stage of pleasure, the whole city gathered along the banks to listen. Three centuries later, a floating pool that pipes and cleanses the same kind of river water carries forward that idea: that a city's river can be given back to its people as a place of delight.",
        "source": "George Frideric Handel, Water Music, HWV 348-350, first performed on the River Thames, 17 July 1717.",
        "href": "https://imslp.org/wiki/Water_Music,_HWV_348-350_(Handel,_George_Frideric)",
        "image": {
          "src": "/covers/plus-pool-floating-river-pool-new-york--a5.png",
          "alt": "Oil portrait of the composer George Frideric Handel in a red coat, seated, painted by Thomas Hudson in 1756.",
          "credit": "Thomas Hudson, portrait of George Frideric Handel, 1756, National Portrait Gallery, London. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 39
  }
]

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
