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
// the Afternoon Edition of 7 July 2026 (ranks 1-13) leads with its hero story,
// followed by the Morning Edition of 7 July 2026 and the Evening Edition of 6 July 2026.
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
    "slug": "damascus-explosions-macron-visit",
    "headline": "Two bombs wound 18 in Damascus as Macron visits, the first Western leader in post-Assad Syria",
    "overview": "Two improvised bombs—one in a parked car, one in a rubbish bin—exploded near the Four Seasons hotel in Damascus on July 7, 2026, while French President Emmanuel Macron visited post-Assad Syria, wounding 18 people including four police officers, Syrian officials said. Macron, the first major Western leader to travel to Syria since Bashar al-Assad's fall, was unharmed and pressed on to meet President Ahmed al-Sharaa; the Élysée said his visit continued as planned. The blasts followed a café bombing days earlier that authorities blamed on remnants of the former regime.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMioAFBVV95cUxQaGs3bERCUG5QQkh4RmFEUDVnelFCTFEtdF9uUmNqbUJTLUJCTVBpbmhNN2dXTHBZZXQyVjQwNXd6Z0pUY0ZqU1RKQXlnSzJ5NlNKVjR1cl9rc0RIT3BRQ2UyR3VEbk5HWmtsdjljT3QxRENmZGtKX0N1QTVIWHBCZ2xqTWxQQWR5ZXIwTnRsNVJEOTAzWkVUN0NNSEJmN2hw?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMirAFBVV95cUxOLWRETjVnbTljM3FIcDF1U0tESGJmVnVQSTBqemxJOUhKMUgtalFLcFVTOE9WSXB0SmJJSjZnSnhSOTBWajhqV0trX3dNSnlHdnVZNEh1ZVpFTnhlZXdSWWhGUTgyNHJ2Tm1pd05zQ1JOeFlFYXFkQlB6N2h0WkV0N0x2cEtjLVdTeXBHVEttY2o1aEZlRmFsaHlsUkNsUlZXMVFRM2g2X2FvOC02?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-07",
    "image": {
      "src": "/covers/damascus-explosions-macron-visit.png",
      "alt": "A thin column of grey smoke rising above the pale stone rooftops and minarets of an old Middle Eastern city, an official black state car on an empty boulevard below",
      "credit": "AI-generated"
    },
    "lead": true,
    "edition": "Afternoon Edition · 7 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Harmodius and Aristogeiton slay Hipparchus during the Panathenaic festival (Thucydides)",
        "excerpt": "they rushed, as they were, within the gates, and meeting with Hipparchus by the Leocorium recklessly fell upon him at once, infuriated, Aristogiton by love, and Harmodius by insult, and smote him and slew him.",
        "source": "Thucydides, History of the Peloponnesian War, Book VI (trans. Richard Crawley), Wikisource",
        "href": "https://en.wikisource.org/wiki/History_of_the_Peloponnesian_War/Book_6"
      },
      {
        "category": "historical",
        "title": "Napoleon escapes the 'infernal machine' bomb on his way to the opera, 24 December 1800 (Bourrienne's Memoirs)",
        "excerpt": "the First Consul, on his way to the opera, had narrowly escaped being assassinated in the Rue St. Nicaise by the explosion of a barrel of gunpowder, the concussion of which had shattered the windows of his carriage.",
        "source": "Louis Antoine Fauvelet de Bourrienne, Memoirs of Napoleon Bonaparte — Volume 05, Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/3555/pg3555-images.html"
      },
      {
        "category": "literary",
        "title": "Agamemnon struck down on his homecoming (Aeschylus, Agamemnon)",
        "excerpt": "Alas! I am struck deep with a mortal blow!",
        "source": "Aeschylus, Agamemnon, line 1343 (trans. Herbert Weir Smyth), Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0004:card=1343"
      },
      {
        "category": "literary",
        "title": "Macbeth on murdering Duncan, his guest and king (Shakespeare, Macbeth, Act I, Scene 7)",
        "excerpt": "He's here in double trust: First, as I am his kinsman and his subject, Strong both against the deed; then, as his host, Who should against his murderer shut the door, Not bear the knife myself.",
        "source": "William Shakespeare, Macbeth, Act I, Scene 7, Project Gutenberg",
        "href": "https://www.gutenberg.org/files/1533/1533-h/1533-h.htm"
      },
      {
        "category": "artistic",
        "title": "The Death of Julius Caesar (Vincenzo Camuccini, c. 1804–1806)",
        "excerpt": "Camuccini's vast neoclassical canvas freezes the instant of political murder: Caesar recoils in his red robe as a knot of senators, daggers flashing, presses in beneath the cold columns of the Senate. Completed around 1804–1806, it stages an act of treachery at the very heart of power as marble-hard theatre, the ruler undone amid the men who had surrounded him.",
        "source": "Vincenzo Camuccini, 'The Death of Julius Caesar', Galleria Nazionale d'Arte Moderna, Rome — Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Vincenzo_Camuccini_-_La_morte_di_Cesare.jpg",
        "image": {
          "src": "/covers/damascus-explosions-macron-visit--art.png",
          "alt": "Neoclassical painting of the assassination of Julius Caesar, senators wielding daggers closing around him in the Roman Senate",
          "credit": "Vincenzo Camuccini, The Death of Julius Caesar (c. 1804–1806), Galleria Nazionale d'Arte Moderna, Rome — public domain via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Un ballo in maschera (Giuseppe Verdi, 1859)",
        "excerpt": "Verdi's opera dramatizes a ruler struck down amid festivity: the governor Riccardo is stabbed at a glittering masked ball, betrayed by a trusted friend even as music and dancing whirl around him. Based on the real assassination of Sweden's King Gustav III, its climax fuses celebration and bloodshed, an intimate act of treachery turning a night of revelry into regicide.",
        "source": "Giuseppe Verdi, Un ballo in maschera (1859), full score (Milan: Ricordi), IMSLP",
        "href": "https://imslp.org/wiki/Un_ballo_in_maschera_(Verdi,_Giuseppe)"
      }
    ],
    "rank": 1
  },
  {
    "slug": "zelensky-nato-air-defence-appeal",
    "headline": "Zelensky to press NATO for air defences at Ankara summit after Russian strikes kill dozens in Kyiv",
    "overview": "President Volodymyr Zelensky said on July 7, 2026, that he will use this week's NATO summit in Ankara to press allies for more air-defence systems and interceptor missiles, after two Russian barrages on Kyiv in under a week killed more than 50 civilians. In the latest assault Russia fired 68 missiles and 351 drones, damaging residential blocks at more than 10 sites across the capital, Zelensky said. He also plans to meet U.S. President Donald Trump to argue that the attacks show Russian weakness, not strength.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "BBC News",
        "href": "https://www.bbc.co.uk/news/articles/c9d227e5zj6o"
      },
      {
        "name": "TIME",
        "href": "https://time.com/article/2026/07/06/ukraine-russia-attack-zelensky-nato-summit-request-trump-putin/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-07",
    "image": {
      "src": "/covers/zelensky-nato-air-defence-appeal.png",
      "alt": "The scarred facade of a tall apartment block at dawn, rows of blown-out windows and a plume of grey smoke rising into a pale sky",
      "credit": "AI-generated"
    },
    "edition": "Afternoon Edition · 7 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Corcyraeans beg Athens for an alliance (433 BCE)",
        "excerpt": "Men of Athens, it is but justice that such as come to implore the aid of their neighbours (as now do we), and cannot pretend by any great benefit or league some precedent merit, should, before they go any farther, make it appear, principally, that what they seek conferreth profit",
        "source": "Thucydides, History of the Peloponnesian War 1.32 (trans. Hobbes), Perseus Digital Library",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0247:book=1:chapter=32"
      },
      {
        "category": "historical",
        "title": "Besieged Saguntum sends envoys to Rome for help (219 BCE)",
        "excerpt": "the Saguntines sent a deputation to Rome to beg for help in a war which was inevitably approaching.",
        "source": "Livy, History of Rome 21.6 (trans. Roberts), Perseus Digital Library",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0144:book=21:chapter=6"
      },
      {
        "category": "literary",
        "title": "The beleaguered city on the Shield of Achilles",
        "excerpt": "But around the other city lay in leaguer two hosts of warriors gleaming in armour.",
        "source": "Homer, Iliad 18.509 ff. (trans. A. T. Murray), Perseus Digital Library",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0134:book=18:card=509"
      },
      {
        "category": "literary",
        "title": "Byron: an overwhelming host descends on the capital",
        "excerpt": "The Assyrian came down like the wolf on the fold, / And his cohorts were gleaming in purple and gold;",
        "source": "Lord Byron, 'The Destruction of Sennacherib' (Hebrew Melodies, 1815), Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Works_of_Lord_Byron_(ed._Coleridge,_Prothero)/Poetry/Volume_3/Hebrew_Melodies/The_Destruction_of_Sennacherib"
      },
      {
        "category": "artistic",
        "title": "Goya: civilians slaughtered by military force",
        "excerpt": "Goya's night scene freezes the instant before a firing squad of faceless soldiers cuts down unarmed civilians; a white-shirted man throws his arms wide in a cruciform plea as a single lantern glares on the heaped dead. It is the archetypal image of ordinary people killed by an occupying army, a captured city's inhabitants dying in the dark.",
        "source": "Francisco de Goya, 'The Third of May 1808' (1814), Museo del Prado; via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:El_tres_de_mayo_de_1808_en_Madrid.jpg",
        "image": {
          "src": "/covers/zelensky-nato-air-defence-appeal--art.png",
          "alt": "Goya's painting The Third of May 1808: a firing squad of soldiers executes unarmed civilians at night, one man in a white shirt flinging his arms wide.",
          "credit": "Francisco de Goya, The Third of May 1808 (1814), Museo del Prado. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Tchaikovsky's 1812 Overture: a capital bombarded and delivered",
        "excerpt": "Tchaikovsky stages the 1812 invasion as sound: a hymn for an imperiled Russia, the intruding strains of 'La Marseillaise' swelling as the enemy nears the capital, and finally the thunder of cannon and pealing bells as Moscow's defenders drive the invader back. It is a whole nation's ordeal of bombardment and deliverance rendered in orchestral fire.",
        "source": "Pyotr Ilyich Tchaikovsky, 1812 Overture (Festival Overture), Op. 49 (1880), IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/1812_Overture,_Op.49_(Tchaikovsky,_Pyotr)"
      }
    ],
    "rank": 2
  },
  {
    "slug": "indonesia-india-brahmos-deal",
    "headline": "Indonesia signs a BrahMos supersonic-missile deal with India during Modi's Jakarta visit",
    "overview": "Indonesia and India signed a contract for the BrahMos supersonic cruise missile on July 7, 2026, announced in Jakarta during Prime Minister Narendra Modi's visit, making Indonesia the third foreign buyer of the system after the Philippines and Vietnam. India will also supply Astra air-to-air missiles under the accompanying defence agreements. Neither side disclosed the contract's value, the number of missiles or the delivery timeline.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiugFBVV95cUxPVXhWajhVazNKZjZrWnc0dTVQcmw5NzlCV2xqOVNwdS14dGpZWE9yRzVJWHllNDJraUZCQWNWVzhaRWhEa3JOYlRxMTdQZVZ4MzhsQk44NlBiOF9xaVREZTdPVGFmUmJyYkgyQXl1Y08zQnEydnpFcXlwQkk5SGxKNEJfMEkwODI1Q1k5ZmpmM1ZxakhyQ1FKSWI4bXZ2NEtOZUNCTFhqNlNTUjZlSDhxLUxjVzRramdtM3c?oc=5"
      },
      {
        "name": "Naval News",
        "href": "https://www.navalnews.com/naval-news/2026/07/indonesia-signs-brahmos-missile-deal-with-india/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-07",
    "image": {
      "src": "/covers/indonesia-india-brahmos-deal.png",
      "alt": "A single sleek supersonic cruise missile mounted on a green military transporter-launcher on an open coastal plain at golden hour",
      "credit": "AI-generated"
    },
    "edition": "Afternoon Edition · 7 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Jonathan gives David his sword and bow, sealing their covenant (1 Samuel 18)",
        "excerpt": "Then Jonathan and David made a covenant, because he loved him as his own soul. And Jonathan stripped himself of the robe that was upon him, and gave it to David, and his garments, even to his sword, and to his bow, and to his girdle.",
        "source": "Bible (King James Version), 1 Samuel 18:3–4, Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/1_Samuel"
      },
      {
        "category": "historical",
        "title": "The Treaty of Alliance between the United States and France (1778)",
        "excerpt": "The essential and direct End of the present defensive alliance is to maintain effectually the liberty, Sovereignty, and independance absolute and unlimited of the said united States, as well in Matters of Gouvernement as of commerce.",
        "source": "Treaty of Alliance with France (1778), Article 2, U.S. National Archives",
        "href": "https://www.archives.gov/milestone-documents/treaty-of-alliance-with-france"
      },
      {
        "category": "literary",
        "title": "Glaucus and Diomedes exchange armour in guest-friendship (Iliad, Book VI)",
        "excerpt": "When they had thus spoken, the twain leapt down from their chariots and clasped each other's hands and pledged their faith. ... And then from Glaucus did Zeus, son of Cronos, take away his wit, seeing he made exchange of armour with Diomedes, son of Tydeus, giving golden for bronze, the worth of an hundred oxen for the worth of nine.",
        "source": "Homer, The Iliad (A. T. Murray trans.), Book VI, Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Iliad_(Murray)/Book_VI"
      },
      {
        "category": "literary",
        "title": "Venus delivers the god-forged arms to Aeneas (Aeneid, Book VIII)",
        "excerpt": "She said: And having first her Son embrac'd; / The radiant Arms beneath an Oak she plac'd. / Proud of the Gift, he rowl'd his greedy sight / Around the Work, and gaz'd with vast delight, / He lifts, he turns, he poizes, and admires / The Crested Helm, that vomits radiant Fires:",
        "source": "Virgil, The Works of Virgil (Dryden trans.), Aeneid, Book VIII, Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Works_of_Virgil_(Dryden)/Aeneid/Book_VIII"
      },
      {
        "category": "artistic",
        "title": "Diego Velázquez, The Forge of Vulcan (La Fragua de Vulcano), 1630",
        "excerpt": "At the smithy of Vulcan the hammers fall still and the armour glows: the workshop of fire and steel where the weapons of gods and heroes are forged, an image of friendship and war shaped in molten metal.",
        "source": "Diego Velázquez, La Fragua de Vulcano (1630), Museo del Prado, via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Vel%C3%A1zquez_-_La_Fragua_de_Vulcano_(Museo_del_Prado,_1630).jpg",
        "image": {
          "src": "/covers/indonesia-india-brahmos-deal--art.png",
          "alt": "Apollo standing amid Vulcan and his workmen at the forge, armour and weapons being wrought in fire",
          "credit": "Diego Velázquez (1599–1660), Museo del Prado, Madrid; public domain via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Handel, 'Arm, arm ye brave!' from the oratorio Judas Maccabaeus (HWV 63)",
        "excerpt": "Arm, arm ye brave!",
        "source": "George Frideric Handel, Judas Maccabaeus, HWV 63, Part I, No.9 Aria, IMSLP",
        "href": "https://imslp.org/wiki/Judas_Maccabaeus,_HWV_63_(Handel,_George_Frideric)"
      }
    ],
    "rank": 3
  },
  {
    "slug": "trump-f35-jets-turkey",
    "headline": "Trump signals he will back selling F-35 stealth jets to Turkey during his Ankara visit",
    "overview": "President Donald Trump is expected to throw his support behind selling F-35 stealth fighter jets to Turkey during a NATO summit visit to Ankara, in his biggest gesture yet to President Recep Tayyip Erdogan, sources said on July 7, 2026. Turkey was expelled from the F-35 program in 2020 after buying Russian S-400 air-defence systems, and CAATSA sanctions plus a congressional ban still stand. Israeli Prime Minister Benjamin Netanyahu opposes the sale, warning it could upset the regional balance.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiyAFBVV95cUxQemNEWDl5ZDlwZkE2b3FaTmdrOWQ2QnZ2QnREZlQyOER3cFJ4aEQyNTA5dk93Y25hQnFQeXpaLUptR012ZXpZNFR6bmd2dUdFMUhaN3ZKa01FRFNGS2YxUkIzSV9OSVpuUUtEWnRLUHkzaDJjdlJvY3VzLTRrX01SYjZNRTF0U3c4T19lRllBN2FQRC16SDdlWFN5b003NHVDUmU3cXVhOWc3XzMya291d1J6Nklfc2NNUmE1alVMYkNSMXJka29Ibg?oc=5"
      },
      {
        "name": "Haaretz",
        "href": "https://www.haaretz.com/israel-news/israel-security/2026-07-07/ty-article/report-trump-to-allow-turkey-to-purchase-u-s-f-35-planes-defying-netanyahu/0000019f-3b2b-d07c-af9f-fb7f5b260000"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-07",
    "image": {
      "src": "/covers/trump-f35-jets-turkey.png",
      "alt": "A single sleek grey stealth fighter jet parked on an empty runway at dusk under a dramatic cloudy sky, low golden light on its angular fuselage",
      "credit": "AI-generated"
    },
    "edition": "Afternoon Edition · 7 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Cyrus the Younger's royal gift of a gold scimitar to Syennesis of Cilicia (c. 401 BCE)",
        "excerpt": "Cyrus presented him with the customary royal gifts—to wit, a horse with a gold bit, a necklace of gold, a gold bracelet, and a gold scimitar, a Persian dress, and lastly, the exemption of his territory from further pillage, with the privilege of taking back the slaves that had been seized, wherever they might chance to come upon them.",
        "source": "Xenophon, Anabasis, Book I (trans. H. G. Dakyns), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/1170/1170-h/1170-h.htm"
      },
      {
        "category": "historical",
        "title": "The Treaty of Alliance between France and the United States (1778)",
        "excerpt": "The essential and direct End of the present defensive alliance is to maintain effectually the liberty, Sovereignty, and independance absolute and unlimited of the said united States, as well in Matters of Gouvernement as of commerce.",
        "source": "Treaty of Alliance Between the United States and France, 1778; The Avalon Project, Yale Law School",
        "href": "https://avalon.law.yale.edu/18th_century/fr1788-2.asp"
      },
      {
        "category": "literary",
        "title": "Hephaestus forges new armour for Achilles at the plea of Thetis (Iliad, Book 18)",
        "excerpt": "Be of good cheer, neither let these things distress thy heart. Would that I might so surely avail to hide him afar from dolorous death, when dread fate cometh upon him, as verily goodly armour shall be his, such that in aftertime many a one among the multitude of men shall marvel, whosoever shall behold it.",
        "source": "Homer, Iliad 18.463-467 (trans. A. T. Murray), Perseus Digital Library, Tufts University",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0134%3Abook%3D18"
      },
      {
        "category": "literary",
        "title": "Arthur receives Excalibur from the Lady of the Lake (Le Morte d'Arthur, Book I)",
        "excerpt": "in the midst of the lake Arthur was ware of an arm clothed in white samite, that held a fair sword in that hand. Lo! said Merlin, yonder is that sword that I spake of.",
        "source": "Sir Thomas Malory, Le Morte d'Arthur, Vol. I, Book I, Ch. XXV, Wikisource",
        "href": "https://en.wikisource.org/wiki/Le_Morte_d'Arthur/Volume_I/Book_I/Chapter_XXV"
      },
      {
        "category": "artistic",
        "title": "Anthony van Dyck, Thetis Receiving Armour for Achilles from Hephaestus (c. 1630-1632)",
        "excerpt": "Van Dyck stages the divine transaction as a dazzling exchange of favour: the sea-goddess Thetis reaches for the gleaming shield and helmet that the fire-god has forged for her son, the smoky forge behind them yielding to the cold brilliance of the new-made arms. The coveted weapon, handed from a greater power to secure a mortal's fortunes in war, becomes the very emblem of patronage and obligation. The canvas hangs in the Bildergalerie of Sanssouci, Potsdam.",
        "source": "Wikimedia Commons (Bildergalerie Sanssouci, Potsdam); public domain",
        "href": "https://commons.wikimedia.org/wiki/File:Dyck,_Anthony_van_-_Thetis_receiving_armour_for_Achilles_from_Hephaestus_-_Bildergalerie_Sanssouci.jpeg",
        "image": {
          "src": "/covers/trump-f35-jets-turkey--art.png",
          "alt": "Thetis reaching to receive the newly forged shield and armour of Achilles from Hephaestus in his forge",
          "credit": "Anthony van Dyck (1599-1641), Thetis Receiving Armour for Achilles from Hephaestus, c. 1630-1632, Bildergalerie Sanssouci, Potsdam; public domain via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Richard Wagner, Siegfried, Act I Forging Song 'Nothung! Nothung! Neidliches Schwert!' (1876)",
        "excerpt": "In the climax of the first act of Wagner's Siegfried, the young hero reforges the shattered blade Nothung, hammering the shards of the fabled sword back into a weapon of destiny as the orchestra blazes with the anvil's ringing rhythm. The scene turns the making of a great weapon into a rite of power and inheritance, a blade coveted because it alone can slay the dragon and unlock a kingdom. The full score is freely available in the public domain.",
        "source": "Richard Wagner, Siegfried, WWV 86C (full score, Mainz: Schott, 1876), IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Siegfried,_WWV_86C_(Wagner,_Richard)"
      }
    ],
    "rank": 4
  },
  {
    "slug": "meta-states-1-4-trillion-youth-trial",
    "headline": "Meta says U.S. states are seeking $1.4 trillion in penalties in an August youth-safety trial",
    "overview": "Meta said in a court filing on July 7, 2026, that four U.S. states—California, Colorado, Kentucky and New Jersey—are seeking $1.4 trillion in penalties at an August trial in Oakland over claims it designed Facebook and Instagram to addict young users and hid the harms. Meta called the figure unsupported, saying \"a sanction of that size has no analog in the history of consumer protection enforcement.\" Twenty-nine states have sued the company in federal court, with a further 14 pursuing separate state-law claims.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiwgFBVV95cUxQZ1lScjFMNFhZdU5wUmpZZzJ3QmppVTg5RWVUOG02OU8wVmhCUW1WTDNvWTZJTlZfYkRqb3dsQUNjMUZJMWxQZXhHNkg2cHBLOUtWZlJUQTZaZnFSZjZlMUVVN3ZtNlRBVHJIT3RLSk5ub3pBRlVOQXZ4Q3I5SFNYTjc4amZ0Z1Zvc1FybXE5WUtpdmFPZVhCU0xqNlZ1dnVDOV95dnZhOVZTV2tMU0k4aUNRSmk2UThwSVpLNjUwclZRZw?oc=5"
      },
      {
        "name": "The Jakarta Post",
        "href": "https://www.thejakartapost.com/business/2026/07/07/meta-says-us-states-seeking-14-trillion-in-penalties-in-youth-safety-trial"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-07",
    "image": {
      "src": "/covers/meta-states-1-4-trillion-youth-trial.png",
      "alt": "A young person's face softly lit from below by the pale glow of a smartphone held in the dark, the room deep in shadow",
      "credit": "AI-generated"
    },
    "edition": "Afternoon Edition · 7 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Trial of Socrates: \"Corrupter of the Youth\" (399 BCE)",
        "excerpt": "Socrates is a doer of evil, who corrupts the youth; and who does not believe in the gods of the state, but has other new divinities of his own.",
        "source": "Plato, Apology (trans. Benjamin Jowett), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/1656/1656-h/1656-h.htm"
      },
      {
        "category": "historical",
        "title": "Lin Zexu's Letter to Queen Victoria on the Opium Trade (1839)",
        "excerpt": "There is, however, a class of treacherous barbarians who manufacture opium, smuggle it in for sale, and deceive our foolish people, in order to injure their bodies and derive profit therefrom.",
        "source": "Lin Zexu, Letter to Queen Victoria (1839), from Gems of Chinese Literature, Wikisource",
        "href": "https://en.wikisource.org/wiki/Gems_of_Chinese_Literature/Lin_Ts%C3%AA-hs%C3%BC-Letter_to_Queen_Victoria"
      },
      {
        "category": "literary",
        "title": "Christina Rossetti, \"Goblin Market\" (1862)",
        "excerpt": "Come buy our orchard fruits, / Come buy, come buy ... Yet my mouth waters still; / To-morrow night I will / Buy more.",
        "source": "Christina Rossetti, \"Goblin Market,\" Goblin Market and Other Poems (1862), Wikisource",
        "href": "https://en.wikisource.org/wiki/Goblin_Market_and_Other_Poems_(1862)/Goblin_Market"
      },
      {
        "category": "literary",
        "title": "Goethe, Faust: The Devil's Bargain",
        "excerpt": "When thus I hail the Moment flying: 'Ah, still delay—thou art so fair!' Then bind me in thy bonds undying, Then will I perish, then and there!",
        "source": "Johann Wolfgang von Goethe, Faust, Part I (trans. Bayard Taylor), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/14591/14591-h/14591-h.htm"
      },
      {
        "category": "artistic",
        "title": "William Hogarth, Gin Lane (1751)",
        "excerpt": "Gin, cursed Fiend, with Fury fraught, Makes human Race a Prey. It enters by a deadly Draught And steals our Life away.",
        "source": "William Hogarth, Gin Lane (1751), engraving, Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:William_Hogarth_-_Gin_Lane.jpg",
        "image": {
          "src": "/covers/meta-states-1-4-trillion-youth-trial--art.png",
          "alt": "Hogarth's engraving Gin Lane: a squalid London street where gin-ruined Londoners collapse and starve while a drunken, oblivious mother lets her infant slip from her arms to its death.",
          "credit": "William Hogarth, Gin Lane (1751), Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Franz Schubert, Erlkönig, D.328 (1815)",
        "excerpt": "Schubert's setting of Goethe's ballad rides on a galloping piano ostinato as a father clutches his feverish son through the night. The Erlking's voice slips in, sweet and coaxing, promising games, fine clothes, and his daughters' care to lure the boy away; the child cries that the phantom is seizing him, and by the final bars he lies dead in his father's arms.",
        "source": "Franz Schubert, Erlkönig, D.328 (1815), public-domain scores at IMSLP",
        "href": "https://imslp.org/wiki/Erlk%C3%B6nig,_D.328_(Schubert,_Franz)"
      }
    ],
    "rank": 5
  },
  {
    "slug": "australia-teen-social-media-age-checks-fail",
    "headline": "Australia's world-first teen social-media ban falters as platforms skip age checks, study finds",
    "overview": "A study by a team that advised Australia's rollout found the country's world-first ban on under-16s using social media is failing at the first hurdle, testers reported on July 7, 2026: they opened 50 accounts declaring their age as 16 and were never asked for proof. Since December the law has required platforms including Instagram, Snapchat and YouTube to bar under-16s, yet most teens can still get in. Australia has doubled the maximum fine and warned of court action against non-compliant tech giants.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMivgFBVV95cUxQMVVFOHA5aEVaNXgtQnRpNklUdDhKSnFjOGZNaWdrdU8xUERLV3llR1I5UjdVaUs4ZFAtMXFKV1p6WWVYRDFOd3cxdDQxdUhLVHdMS3lQbEZHb0oyWDZTcy1UdHNZdUFEeVZvR1ViRHd6alFGTXV4cTFwaXBMUkItUzgyZ19Ib1F3Y3Yya0J1VUlWWUlxVmdxX0oybG0ybkRxMHR5OWdHT1lWdUZkaGxZYmFuUGdZRmJMSno0TnB3?oc=5"
      },
      {
        "name": "RNZ",
        "href": "https://www.rnz.co.nz/news/world/684189/australia-s-teen-social-media-ban-fails-to-clear-first-hurdle-in-age-checks-study"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-07",
    "image": {
      "src": "/covers/australia-teen-social-media-age-checks-fail.png",
      "alt": "A single smartphone glowing with soft pale light in a pair of young hands, a low unlatched garden gate standing open in the soft-focus background",
      "credit": "AI-generated"
    },
    "edition": "Afternoon Edition · 7 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "American Prohibition: the Volstead Act (1919)",
        "excerpt": "To prohibit intoxicating beverages, and to regulate the manufacture, production, use, and sale of high-proof spirits",
        "source": "National Prohibition Act (Volstead Act), 1919 — U.S. National Archives, DocsTeach",
        "href": "https://docsteach.org/documents/document/volstead-act"
      },
      {
        "category": "historical",
        "title": "Rome and the flouted Oppian sumptuary law (Livy, 195 BC)",
        "excerpt": "luxury, left undisturbed, would have been more endurable then than it will be now, when it has been, like a wild beast, first rendered angry by its very fetters and then let loose.",
        "source": "Livy, History of Rome, Book 34.4 (Cato's speech on repealing the Lex Oppia), trans. Evan T. Sage — Perseus Digital Library, Tufts",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0164:book=34:chapter=4"
      },
      {
        "category": "literary",
        "title": "The forbidden fruit in the Garden of Eden",
        "excerpt": "And when the woman saw that the tree was good for food, and that it was pleasant to the eyes, and a tree to be desired to make one wise, she took of the fruit thereof, and did eat, and gave also unto her husband with her; and he did eat.",
        "source": "Genesis 3:6, King James Bible — Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Genesis"
      },
      {
        "category": "literary",
        "title": "Sin, the gatekeeper who cannot shut Hell's gate (Milton, Paradise Lost, Book II)",
        "excerpt": "She op'nd, but to shut / Excel'd her power; the Gates wide op'n stood",
        "source": "John Milton, Paradise Lost (1667), Book II (ll. 883–884) — Wikisource",
        "href": "https://en.wikisource.org/wiki/Paradise_Lost_(1667)/Book_II"
      },
      {
        "category": "artistic",
        "title": "The Trojan Horse dragged through the gates of Troy (G. D. Tiepolo, c. 1760)",
        "excerpt": "The Procession of the Trojan Horse in Troy",
        "source": "Giovanni Domenico Tiepolo, The Procession of the Trojan Horse in Troy, c. 1760 (National Gallery, London) — Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Giovanni_Domenico_Tiepolo_-_The_Procession_of_the_Trojan_Horse_in_Troy_-_WGA22382.jpg",
        "image": {
          "src": "/covers/australia-teen-social-media-age-checks-fail--art.png",
          "alt": "Crowds of Trojans jubilantly hauling the great wooden horse through the breached gate into their city, unaware of the soldiers hidden within",
          "credit": "Giovanni Domenico Tiepolo, The Procession of the Trojan Horse in Troy, c. 1760, National Gallery, London. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Thomas Cole, Expulsion from the Garden of Eden (1828)",
        "excerpt": "Outside the gate to Paradise, Adam and Eve are cast into an abyss marked by blasted trees, desolate rocks, and an ominous wolf.",
        "source": "Thomas Cole, Expulsion from the Garden of Eden, 1828 (Museum of Fine Arts, Boston) — Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Cole_Thomas_Expulsion_from_the_Garden_of_Eden_1828.jpg"
      }
    ],
    "rank": 6
  },
  {
    "slug": "spacex-nasdaq-100-inclusion",
    "headline": "SpaceX joins the Nasdaq-100 after the largest IPO ever, forcing billions in index-fund buying",
    "overview": "SpaceX officially joined the Nasdaq-100 on July 7, 2026, weeks after a record roughly $75 billion initial public offering, entering through a fast-track rule for large new listings. Index funds tracking the benchmark must buy an estimated $22 billion to $27 billion of the stock. Shares spiked to about $225 after the June 12 debut before falling roughly 28% from that high, and analysts cautioned that index inclusion has often marked a peak, as it did for Palantir and Strategy.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMinAFBVV95cUxPdFlULTBOYXhrMW91ckpQYTN4ampKcmtYWW9xTnA0YmN1ZlFDSVRQY3FmSXJoMFR5RVlaOWd3eVhzOTRTMk5rUW9OLURzSXZTalh1OGxmemtOUW0tTC0yWTJpbVVsVDRMSmRIVTU4N21rWjJCY1BpQVNYLVhNc2tleTVwN3J3dHNpRE00cFltUFVXUERXM0QxajM0d20?oc=5"
      },
      {
        "name": "CNBC",
        "href": "https://www.cnbc.com/2026/06/26/spacex-added-to-nasdaq-100.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-07",
    "image": {
      "src": "/covers/spacex-nasdaq-100-inclusion.png",
      "alt": "A single luminous line rising and arcing steeply toward its peak across a dark abstract field of soft green and gold light, like a soaring market chart",
      "credit": "AI-generated"
    },
    "edition": "Afternoon Edition · 7 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Roman credit crisis of AD 33 (Tacitus, Annals VI)",
        "excerpt": "The facilities for selling were followed by a fall of prices, and the deeper a man was in debt, the more reluctantly did he part with his property, and many were utterly ruined.",
        "source": "Tacitus, The Annals, Book 6 (chs. 16–17)",
        "href": "https://en.wikisource.org/wiki/The_Annals_(Tacitus)/Book_6"
      },
      {
        "category": "historical",
        "title": "The Tulipomania (Charles Mackay)",
        "excerpt": "Nobles, citizens, farmers, mechanics, sea-men, footmen, maid-servants, even chimney-sweeps and old clothes-women, dabbled in tulips.",
        "source": "Charles Mackay, Memoirs of Extraordinary Popular Delusions and the Madness of Crowds, Vol. 1, Ch. 3 “The Tulipomania”",
        "href": "https://en.wikisource.org/wiki/Memoirs_of_Extraordinary_Popular_Delusions_and_the_Madness_of_Crowds/Volume_1/Chapter_3"
      },
      {
        "category": "literary",
        "title": "Daedalus and Icarus (Ovid, Metamorphoses VIII)",
        "excerpt": "The wax was melted; he shook his naked arms, and, wanting his oar-like wings, he caught no more air.",
        "source": "Ovid, Metamorphoses, Book 8 (Riley prose translation)",
        "href": "https://www.gutenberg.org/files/26073/26073-h/26073-h.htm"
      },
      {
        "category": "literary",
        "title": "Fortune and her wheel (Boethius, Consolation of Philosophy)",
        "excerpt": "I turn the wheel that spins. I delight to see the high come down and the low ascend.",
        "source": "Boethius, The Consolation of Philosophy, Book II (H. R. James translation)",
        "href": "https://www.gutenberg.org/files/14328/14328-h/14328-h.htm"
      },
      {
        "category": "artistic",
        "title": "The South Sea Scheme (William Hogarth, 1721)",
        "excerpt": "On a whirling wooden merry-go-round speculators of every rank spin for the promise of riches, while Honesty is broken on the wheel and Honour is flogged nearby. Hogarth's satirical engraving turns the crowd's manic rush into South Sea stock into a carnival of greed and credulity, published in the very wreckage of the bubble's collapse.",
        "source": "William Hogarth, “The South Sea Scheme” (1721), Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:William_Hogarth_-_The_South_Sea_Scheme.png",
        "image": {
          "src": "/covers/spacex-nasdaq-100-inclusion--art.png",
          "alt": "Hogarth engraving of a crowd whirling on a speculative merry-go-round amid allegories of ruined honesty and honour during the South Sea Bubble",
          "credit": "William Hogarth, The South Sea Scheme (1721), engraving. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "The Fall of Phaeton (Peter Paul Rubens)",
        "excerpt": "Having seized the reins of the sun-god's chariot and driven it too near the earth, Phaeton is hurled headlong as Jupiter's thunderbolts split the sky and the terrified horses scatter into darkness. Rubens seizes the instant of the plunge, the archetype of the mortal who climbed too high toward the heavens and fell.",
        "source": "Peter Paul Rubens, “The Fall of Phaeton” (c. 1604–1608), National Gallery of Art, via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Peter_Paul_Rubens_-_The_Fall_of_Phaeton_(National_Gallery_of_Art).jpg"
      }
    ],
    "rank": 7
  },
  {
    "slug": "proxima-fusion-google-rwe-funding",
    "headline": "German fusion start-up Proxima raises €411 million from Google and RWE to build a stellarator",
    "overview": "Magnetic-fusion company Proxima Fusion raised €411 million (about $469 million) on July 7, 2026, with strategic investment from Google and the utility RWE, valuing the German start-up near €2.4 billion and making it Europe's best-funded fusion firm. The money will fund Alpha, a net-energy stellarator demonstrator near Munich, on the path to a first commercial plant planned for a decommissioned nuclear site in Bavaria. It marks Google's first European fusion investment.",
    "genre": "Science",
    "sources": [
      {
        "name": "CNBC",
        "href": "https://www.cnbc.com/2026/07/07/google-proxima-fusion-funding.html"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMipgFBVV95cUxPN1FsQTdBbkwwMzkxNmpmT3NpaDBOS0MyMUl3WkRpOEJuOFBuTV9HOVFWa2JldGRONTFUX3pvbjAzQWl5ekdnSXU2X3Z6VzNaSjd2SDNrOHZvQ1JVWGw4cnZBNWhoeHNrS296dHNncno2MkFLRVVfNnJBY256aUhBcmNGWGxfdUlheUZKYkFmd3BZbDdqVENreFc3bVg1ZzBIMVVJMWh3?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-07",
    "image": {
      "src": "/covers/proxima-fusion-google-rwe-funding.png",
      "alt": "A radiant twisting ring of blue-white plasma light glowing inside a dark futuristic circular chamber of coiled metal, like a small caged star",
      "credit": "AI-generated"
    },
    "edition": "Afternoon Edition · 7 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Paracelsus and the alchemical dream of transmutation",
        "excerpt": "Alchemy is nothing else but the set purpose, intention, and subtle endeavour to transmute the kinds of the metals from one to another.",
        "source": "Paracelsus, The Hermetic and Alchemical Writings of Paracelsus, Vol. I (trans. A. E. Waite), 'Coelum Philosophorum'",
        "href": "https://archive.org/stream/hermeticandalch00paragoog/hermeticandalch00paragoog_djvu.txt"
      },
      {
        "category": "historical",
        "title": "Frederick Soddy glimpses the boundless energy locked in the atom",
        "excerpt": "By its conclusion that there is imprisoned in ordinary common matter vast stores of energy, which ignorance alone at the present time prevents us from using for the purposes of life, radioactivity has raised an issue which it is safe to say will mark an epoch in the progress of thought.",
        "source": "Frederick Soddy, The Interpretation of Radium (1909), p. 5",
        "href": "https://archive.org/stream/interpretationof00sodd/interpretationof00sodd_djvu.txt"
      },
      {
        "category": "literary",
        "title": "Prometheus steals the source of fire for mortals",
        "excerpt": "And I am he that searched out the source of fire, by stealth borne-off inclosed in a fennel-rod, which has shown itself a teacher of every art to mortals, and a great resource.",
        "source": "Aeschylus, Prometheus Bound (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/27458/27458-h/27458-h.htm"
      },
      {
        "category": "literary",
        "title": "Tennyson's knights vow the great quest for the Holy Grail",
        "excerpt": "Streamed through my cell a cold and silver beam, / And down the long beam stole the Holy Grail, / Rose-red with beatings in it, as if alive",
        "source": "Alfred, Lord Tennyson, 'The Holy Grail', Idylls of the King",
        "href": "https://en.wikisource.org/wiki/Idylls_of_the_King/The_Holy_Grail"
      },
      {
        "category": "artistic",
        "title": "Joseph Wright of Derby, The Alchymist Discovers Phosphorus",
        "excerpt": "The Alchymist, In Search of the Philosopher's Stone, Discovers Phosphorus, and prays for the successful Conclusion of his operation, as was the custom of the Ancient Chymical Astrologers.",
        "source": "Joseph Wright of Derby (1771), Derby Museum and Art Gallery, via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Joseph_Wright_of_Derby_The_Alchemist.jpg",
        "image": {
          "src": "/covers/proxima-fusion-google-rwe-funding--art.png",
          "alt": "Oil painting of an alchemist kneeling in a dark vaulted chamber before a glass vessel erupting with the luminous glow of newly discovered phosphorus.",
          "credit": "Joseph Wright of Derby (1734-1797), 'The Alchymist, in Search of the Philosopher's Stone', 1771, Derby Museum and Art Gallery. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Scriabin, Prometheus: The Poem of Fire, Op. 60",
        "excerpt": "Scriabin's 1910-11 tone poem casts the fire-bringer Prometheus as a symbol of creative will, building its cosmic ascent on the shimmering 'mystic chord.' The score famously calls for a 'clavier a lumieres' (keyboard of light) to flood the hall with colored light, fusing sound and radiance into a single act of illumination.",
        "source": "Alexander Scriabin, Prometheus: The Poem of Fire, Op. 60 (first published 1911), via IMSLP",
        "href": "https://imslp.org/wiki/Prometheus,_Le_Po%C3%A8me_du_Feu,_Op.60_(Scriabin,_Aleksandr)"
      }
    ],
    "rank": 8
  },
  {
    "slug": "china-hubei-tornado-deaths",
    "headline": "Tornadoes kill at least 15 in central China's Hubei, injuring hundreds as winds tear off roofs",
    "overview": "Tornadoes and gale-force winds swept the cities of Huangshi, Huanggang, Ezhou and Xianning in central China's Hubei province late on July 6, 2026, and by July 7 the death toll from storms across the country had risen to at least 15, with hundreds injured and tens of thousands evacuated. The winds overturned cars, collapsed houses and tore roofs from buildings; one man was reportedly sucked from his 12th-floor apartment. Thousands of homes in Hubei were damaged.",
    "genre": "Climate",
    "sources": [
      {
        "name": "South China Morning Post",
        "href": "https://www.scmp.com/news/china/politics/article/3359671/8-dead-1-missing-china-tornado-days-after-warning-extreme-weather-ahead"
      },
      {
        "name": "Phys.org (AFP)",
        "href": "https://phys.org/news/2026-07-death-toll-china-storms-hundreds.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-07",
    "image": {
      "src": "/covers/china-hubei-tornado-deaths.png",
      "alt": "A vast dark funnel cloud of a tornado twisting down from a churning slate-grey storm sky over a distant low town, debris swirling at its base",
      "credit": "AI-generated"
    },
    "edition": "Afternoon Edition · 7 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The storm that wrecked Xerxes' fleet at Cape Sepias (480 BC)",
        "excerpt": "the sea began to boil, and there brake upon them a great storm and a strong east wind, that wind which the people of that country call the Hellespontian",
        "source": "Herodotus, The Histories, Book 7.188 (Rawlinson translation)",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Herodotus/7D*.html"
      },
      {
        "category": "historical",
        "title": "Defoe's eyewitness report of the Great Storm of 1703",
        "excerpt": "the Bricks, Tiles, and Stones, from the Tops of the Houses, flew with such force, and so thick in the Streets, that no one thought fit to venture out",
        "source": "Daniel Defoe, The Storm (1704)",
        "href": "https://www.gutenberg.org/files/42234/42234-h/42234-h.htm"
      },
      {
        "category": "literary",
        "title": "The LORD answers Job out of the whirlwind",
        "excerpt": "Then the LORD answered Job out of the whirlwind, and said, Who is this that darkeneth counsel by words without knowledge?",
        "source": "The Book of Job 38:1-2 (King James Bible)",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Job"
      },
      {
        "category": "literary",
        "title": "The cyclone carries Dorothy's house into the sky",
        "excerpt": "The house whirled around two or three times and rose slowly through the air. ... there it remained and was carried miles and miles away as easily as you could carry a feather.",
        "source": "L. Frank Baum, The Wonderful Wizard of Oz (1900), ch. 1",
        "href": "https://www.gutenberg.org/files/55/55-h/55-h.htm"
      },
      {
        "category": "artistic",
        "title": "Doré: The infernal whirlwind of Canto V",
        "excerpt": "The infernal hurricane that never rests / Hurtles the spirits onwards in its rapine.",
        "source": "Gustave Doré, illustration to Dante's Inferno, Canto V (1857), Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Gustave_Dor%C3%A9_-_Dante_Alighieri_-_Inferno_-_Plate_14_(Canto_V_-_The_hurricane_of_souls).jpg",
        "image": {
          "src": "/covers/china-hubei-tornado-deaths--art.png",
          "alt": "Engraving of naked souls swept helplessly through a dark sky by an infernal whirlwind above stormy seas",
          "credit": "Gustave Doré (1832-1883), Inferno Canto V, 1857. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Beethoven storms the orchestra in the 'Pastoral' Symphony",
        "excerpt": "Allegro (Thunderstorm, Tempest)",
        "source": "Ludwig van Beethoven, Symphony No. 6 'Pastoral', Op. 68, fourth movement (Gewitter, Sturm), IMSLP",
        "href": "https://imslp.org/wiki/Symphony_No.6,_Op.68_(Beethoven,_Ludwig_van)"
      }
    ],
    "rank": 9
  },
  {
    "slug": "south-korea-fake-news-law",
    "headline": "South Korea's law punishing 'fake news' takes effect as journalists warn of a chilling effect",
    "overview": "South Korea began enforcing a law on July 7, 2026, that allows courts to award up to five times proven losses against news outlets and large social-media channels that spread false or manipulated information to cause harm or make a profit. Journalists' associations and civil-liberties groups say the vaguely worded law could chill critical reporting and push outlets toward self-censorship. Officials counter that private platforms, not the government, will judge disputed content, and that public-interest reporting is exempt.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMioAFBVV95cUxQd3dUT2ZYR3gyMUlyMUZLNEVQSlRIOVFvRU02OWhEUklYTzFrVTVqTUh4d2I1aXlCaldoS2JQUnZ5VW1aNjI3QTBWVjYtUVVvYWVqM25xY3RjWnRuVzBpLXV4T1dkN01lMVF6c20yYVJmNnh2MDEwNmdlbHB1Q2F3Mm5Qdjk5M0hxUTFuZXVyeHFoVDA3OWJJbDlYRFBEUG1B?oc=5"
      },
      {
        "name": "U.S. News & World Report",
        "href": "https://www.usnews.com/news/business/articles/2026-07-07/south-korean-law-targeting-fake-news-takes-effect-as-journalists-groups-raise-concerns"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-07",
    "image": {
      "src": "/covers/south-korea-fake-news-law.png",
      "alt": "An old cast-iron printing press standing dark and silent in a deserted newspaper press hall at night, a single blank sheet left in the carriage",
      "credit": "AI-generated"
    },
    "edition": "Afternoon Edition · 7 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Tacitus on the trial and burning of Cremutius Cordus's histories (Annals, Book IV, c. AD 116)",
        "excerpt": "His books, so the Senators decreed, were to be burnt by the aediles; but some copies were left which were concealed and afterwards published... the persecution of genius fosters its influence; foreign tyrants, and all who have imitated their oppression, have merely procured infamy for themselves and glory for their victims.",
        "source": "Tacitus, The Annals, Book IV (Church & Brodribb translation), on the prosecution of the historian Cremutius Cordus under Tiberius, via Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Annals_(Tacitus)/Book_4"
      },
      {
        "category": "historical",
        "title": "John Milton, Areopagitica: a speech against the licensing of the press (1644)",
        "excerpt": "as good almost kill a man as kill a good book. Who kills a man kills a reasonable creature, God's image; but he who destroys a good book, kills reason itself, kills the image of God, as it were in the eye.",
        "source": "John Milton, Areopagitica (1644), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/608/608-h/608-h.htm"
      },
      {
        "category": "literary",
        "title": "Henrik Ibsen, An Enemy of the People, Act IV (1882)",
        "excerpt": "The majority never has right on its side. Never, I say! That is one of these social lies against which an independent, intelligent man must wage war.",
        "source": "Henrik Ibsen, An Enemy of the People, Act IV (Eleanor Marx-Aveling translation), via Wikisource",
        "href": "https://en.wikisource.org/wiki/An_Enemy_of_the_People_(Ibsen)/Act_IV"
      },
      {
        "category": "literary",
        "title": "Heinrich Heine, Almansor. Eine Tragödie (1821)",
        "excerpt": "Das war ein Vorspiel nur, dort wo man Bücher / Verbrennt, verbrennt man auch am Ende Menschen.",
        "source": "Heinrich Heine, Almansor. Eine Tragödie (1821), spoken by Hassan, via Wikisource",
        "href": "https://de.wikisource.org/wiki/Almansor_(Heine)"
      },
      {
        "category": "artistic",
        "title": "Honoré Daumier, Ne vous y frottez pas!! (Freedom of the Press), 1834",
        "excerpt": "A burly printer, sleeves rolled up and fists clenched, plants himself defiantly before the powers of the state, guarding the press at his back while a toppled king lies behind him; the caption warns the regime, \"Ne vous y frottez pas!!\" — \"Don't meddle with it!\"",
        "source": "Honoré Daumier, lithograph for L'Association mensuelle, 1834; National Gallery of Art (Rosenwald Collection), public domain, via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Honor%C3%A9_Daumier,_Ne_vous_y_frottez_pas!!,_1834,_NGA_6131.jpg",
        "image": {
          "src": "/covers/south-korea-fake-news-law--art.png",
          "alt": "Daumier lithograph of a defiant printer standing his ground against King Louis-Philippe in defense of freedom of the press",
          "credit": "Honoré Daumier, 'Ne vous y frottez pas!!', 1834. National Gallery of Art (Rosenwald Collection), public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Ludwig van Beethoven, Fidelio, Op. 72 — Prisoners' Chorus, \"O welche Lust\"",
        "excerpt": "O welche Lust, in freier Luft",
        "source": "Ludwig van Beethoven, Fidelio, Op. 72, Prisoners' Chorus (Act I, No. 10), public-domain score via IMSLP",
        "href": "https://imslp.org/wiki/Fidelio,_Op.72_(Beethoven,_Ludwig_van)"
      }
    ],
    "rank": 10
  },
  {
    "slug": "ram-temple-board-overhaul-donation-theft",
    "headline": "India's Ayodhya Ram temple overhauls its board after devotees' donations are allegedly stolen",
    "overview": "The trust running India's grand Ram temple in Ayodhya overhauled its leadership on July 7, 2026, after a Special Investigation Team found that offerings had allegedly been stolen or swapped for fakes and roughly 7 to 7.5 crore rupees misappropriated, with CCTV cameras reportedly removed. General secretary Champat Rai resigned and was replaced on an interim basis, arrests were made, and the trust imposed strict new protocols for counting donations. The trust promised greater transparency after the scandal.",
    "genre": "Culture",
    "sources": [
      {
        "name": "BBC News",
        "href": "https://www.bbc.co.uk/news/articles/c872ngz405xo"
      },
      {
        "name": "Organiser",
        "href": "https://organiser.org/2026/07/07/368683/bharat/ayodhya-ram-mandir-donation-row-trust-accepts-resignations-promises-greater-transparency-sit-submits-interim-report/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-07",
    "image": {
      "src": "/covers/ram-temple-board-overhaul-donation-theft.png",
      "alt": "The dim ornate stone sanctum of an Indian temple at dawn, a single large empty brass offering bowl on the polished floor lit by a shaft of golden light",
      "credit": "AI-generated"
    },
    "edition": "Afternoon Edition · 7 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Cicero prosecutes Verres for plundering Sicily's temples (70 BC)",
        "excerpt": "he has left nothing in any one's house, nothing even in the towns, nothing in public places, not even in the temples, nothing in the possession of any Sicilian, nothing in the possession of any Roman citizen",
        "source": "Cicero, Against Verres, Second Pleading, Book 4 (trans. C. D. Yonge), Wikisource",
        "href": "https://en.wikisource.org/wiki/Against_Verres/Second_pleading/Book_4"
      },
      {
        "category": "historical",
        "title": "Luther's Ninety-Five Theses assail the sale of pardons for money (1517)",
        "excerpt": "They preach man who say that so soon as the penny jingles into the money-box, the soul flies out [of purgatory]. ... The treasures of the indulgences are nets with which they now fish for the riches of men.",
        "source": "Martin Luther, Disputation on the Power and Efficacy of Indulgences (Ninety-Five Theses), Wikisource",
        "href": "https://en.wikisource.org/wiki/Disputation_of_Doctor_Martin_Luther_on_the_Power_and_Efficacy_of_Indulgences"
      },
      {
        "category": "literary",
        "title": "Chaucer's Pardoner boasts of fleecing the faithful while preaching against greed",
        "excerpt": "I preach of nothing but covetousness. Therefore my theme ever was and yet is, Radix malorum est cupiditas. Thus I can preach against that same sin which I practise, and that is avarice.",
        "source": "Geoffrey Chaucer, The Canterbury Tales, 'The Prologue of the Pardoner's Tale', Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Canterbury_Tales_of_Geoffrey_Chaucer/Pardoner%E2%80%99s_Tale/Prologue"
      },
      {
        "category": "literary",
        "title": "Dante damns the simoniacs who sold sacred things for silver and gold (Inferno XIX)",
        "excerpt": "O Simon Magus, O forlorn disciples, / Ye who the things of God, which ought to be / The brides of holiness, rapaciously / For silver and for gold do prostitute,",
        "source": "Dante Alighieri, The Divine Comedy: Inferno, Canto XIX (trans. H. W. Longfellow), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/1001/1001-h/1001-h.htm"
      },
      {
        "category": "artistic",
        "title": "El Greco, The Purification of the Temple — Christ scourging the money-changers",
        "excerpt": "El Greco paints the very moment Christ, whip raised, drives the traders and money-changers from the Temple; the guilty recoil in a knot of twisting bodies on the left while the faithful gather calmly on the right, a swirling composition of cleansing and judgment set beneath cold classical arches.",
        "source": "El Greco, The Purification of the Temple (c. 1600), National Gallery, London; Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:El_Greco_-_The_Purification_of_the_Temple_-_WGA10542.jpg",
        "image": {
          "src": "/covers/ram-temple-board-overhaul-donation-theft--art.png",
          "alt": "El Greco's painting of Christ raising a whip to drive money-changers and traders from the Temple",
          "credit": "El Greco, The Purification of the Temple (c. 1600), National Gallery, London. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Rembrandt, Judas Returning the Thirty Pieces of Silver — blood money flung back in the temple",
        "excerpt": "Rembrandt shows an anguished Judas on his knees, having hurled the thirty silver coins across the temple floor, begging in vain for the priests to take back the price of betrayal; the elders turn away and the scattered money glints as a sign of a sacred trust profaned for gain.",
        "source": "Rembrandt van Rijn, Judas Returning the Thirty Pieces of Silver (1629), Mulgrave Castle; Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Judas_Returning_the_Thirty_Silver_Pieces_-_Rembrandt.jpg"
      }
    ],
    "rank": 11
  },
  {
    "slug": "bugatti-mistral-blanc-eternel",
    "headline": "Bugatti and Berlin's KPM porcelain house create a one-off white W16 Mistral painted with cobalt lines",
    "overview": "Bugatti unveiled a one-of-one W16 Mistral roadster called 'Blanc Éternel,' made with the Berlin porcelain manufactory KPM and covered by Dezeen on July 7, 2026. Its pure-white body is hand-painted with fine cobalt-blue lines tracing the car's digital surface geometry, inspired by a white porcelain vase the Italian designer Enzo Mari created for KPM, and it carries porcelain inlays inside. The car caps a 15-year partnership between the carmaker and the 260-year-old porcelain house.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Dezeen",
        "href": "https://www.dezeen.com/2026/07/07/bugatti-porcelain-clad-sports-car-enzo-mari-vase/"
      },
      {
        "name": "Robb Report",
        "href": "https://robbreport.com/motors/cars/bugatti-mistral-blanc-eternel-hypercar-debut-1238411885/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-07",
    "image": {
      "src": "/covers/bugatti-mistral-blanc-eternel.png",
      "alt": "A pristine pure-white sculptural roadster hypercar in a dark studio, its flowing body traced all over with fine hand-painted cobalt-blue lines, softly spotlit",
      "credit": "AI-generated"
    },
    "edition": "Afternoon Edition · 7 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Jar with dragon, China, Ming dynasty, early 15th century (Jingdezhen ware), The Metropolitan Museum of Art",
        "excerpt": "A towering early-15th-century Jingdezhen jar painted in deep cobalt blue beneath a clear glaze, its body coiled with a striding, five-clawed dragon among scrolling waves. It is the imperial Chinese blue-and-white porcelain whose fusion of painterly line and flawless white body set the standard the whole world would chase for centuries.",
        "source": "The Metropolitan Museum of Art",
        "href": "https://www.metmuseum.org/art/collection/search/39666"
      },
      {
        "category": "historical",
        "title": "Pair of vases, Sèvres Manufactory, France, 1789, The Metropolitan Museum of Art",
        "excerpt": "A pair of hard-paste vases from the Sevres royal manufactory, dated 1789, their jewel-bright porcelain grounds framed in chased and gilded bronze mounts. They mark the summit of French court craft, where the hard-won secret of true porcelain was wedded to the most exacting ornament.",
        "source": "The Metropolitan Museum of Art",
        "href": "https://www.metmuseum.org/art/collection/search/236178"
      },
      {
        "category": "literary",
        "title": "John Keats, \"Ode on a Grecian Urn\" (1820)",
        "excerpt": "Beauty is truth, truth beauty,—that is all / Ye know on earth, and all ye need to know.",
        "source": "Keats, Poems Published in 1820 (Wikisource)",
        "href": "https://en.wikisource.org/wiki/Keats;_poems_published_in_1820/Ode_on_a_Grecian_Urn"
      },
      {
        "category": "literary",
        "title": "Henry Wadsworth Longfellow, \"Kéramos\" (1878)",
        "excerpt": "Turn, turn, my wheel! This earthen jar / A touch can make, a touch can mar; / And shall it to the Potter say, / What makest thou. Thou hast no hand?",
        "source": "The Complete Poetical Works of Henry Wadsworth Longfellow (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/1365/pg1365.txt"
      },
      {
        "category": "artistic",
        "title": "Willem Kalf, Still Life with a Chinese Porcelain Jar (1669), Indianapolis Museum of Art at Newfields",
        "excerpt": "Kalf sets a Chinese blue-and-white porcelain jar at the heart of a dark still life, its glaze catching the light beside a half-peeled lemon, Venetian glass and chased silver. Imported Eastern luxury and exquisite local craft are composed into a single hushed, glowing arrangement.",
        "source": "Indianapolis Museum of Art at Newfields",
        "href": "https://collections.discovernewfields.org/art/artwork/57562",
        "image": {
          "src": "/covers/bugatti-mistral-blanc-eternel--art.png",
          "alt": "Willem Kalf's 1669 still life featuring a Chinese blue-and-white porcelain jar amid silver, Venetian glass and fruit.",
          "credit": "Willem Kalf, Still Life with a Chinese Porcelain Jar (1669), Indianapolis Museum of Art at Newfields. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Gilbert & Sullivan, \"The Mikado\" (1885), opening Chorus of Nobles",
        "excerpt": "If you want to know who we are, / We are gentlemen of Japan: / On many a vase and jar— / On many a screen and fan, / We figure in lively paint:",
        "source": "The Complete Plays of Gilbert and Sullivan (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/808/pg808.txt"
      }
    ],
    "rank": 12
  },
  {
    "slug": "casul-chair-childrens-play-set",
    "headline": "A plywood children's chair that unfolds into a toy castle wins a UK graduate design prize",
    "overview": "Irish designer James Murphy's 'Casul' chair—a compact plywood seat resembling a miniature throne—unfolds in two moves into an abstract castle for imaginative play, as featured by Dezeen on July 7, 2026. Its support panels double as shelves for toys, one version is finished in chalkboard paint and another hides foam swords and shields. Cut from a single 15-millimetre plywood sheet that yields up to three chairs, it won Habitat's Future Design Award at London's New Designers graduate showcase.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Dezeen",
        "href": "https://www.dezeen.com/2026/07/07/casul-chair-james-murphy/"
      },
      {
        "name": "Google News",
        "href": "https://news.google.com/rss/search?q=Casul%20chair%20James%20Murphy%20New%20Designers&hl=en-US&gl=US&ceid=US:en"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-07",
    "image": {
      "src": "/covers/casul-chair-childrens-play-set.png",
      "alt": "A single small pale birch-plywood child's chair partly unfolded into an abstract toy castle with cut-out battlements on a plain warm-grey studio floor",
      "credit": "AI-generated"
    },
    "edition": "Afternoon Edition · 7 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Plato on children learning their future crafts through play (Laws, Book I, c. 350 BC)",
        "excerpt": "he who is to be a good builder, should play at building children's houses; he who is to be a good husbandman, at tilling the ground; and those who have the care of their education should provide them when young with mimic tools.",
        "source": "Plato, Laws, Book I (Benjamin Jowett translation), Wikisource",
        "href": "https://en.wikisource.org/wiki/Laws_(Jowett)/Book_I"
      },
      {
        "category": "historical",
        "title": "Friedrich Froebel exalts play in his kindergarten philosophy (The Education of Man, 1826)",
        "excerpt": "Play is the highest phase of child-development—of human development at this period; for it is self-active representation of the inner—representation of the inner from inner necessity and impulse... Play is the purest, most spiritual activity of man at this stage... It holds the sources of all that is good.",
        "source": "Friedrich Froebel, The Education of Man (trans. W. N. Hailmann), §30 'Play', Internet Archive",
        "href": "https://archive.org/stream/educationofman00fruoft/educationofman00fruoft_djvu.txt"
      },
      {
        "category": "literary",
        "title": "A child builds castles and palaces from wooden blocks in Stevenson's 'Block City'",
        "excerpt": "What are you able to build with your blocks? Castles and palaces, temples and docks. ... Let the sofa be mountains, the carpet be sea, There I'll establish a city for me: A kirk and a mill and a palace beside, And a harbour as well where my vessels may ride.",
        "source": "Robert Louis Stevenson, 'Block City', A Child's Garden of Verses (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/25609/25609-h/25609-h.htm"
      },
      {
        "category": "literary",
        "title": "A bedridden child rules a toy kingdom in Stevenson's 'The Land of Counterpane'",
        "excerpt": "When I was sick and lay a-bed, I had two pillows at my head, And all my toys beside me lay To keep me happy all the day. ... Or brought my trees and houses out, And planted cities all about. I was the giant great and still That sits upon the pillow-hill",
        "source": "Robert Louis Stevenson, 'The Land of Counterpane', A Child's Garden of Verses (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/25609/25609-h/25609-h.htm"
      },
      {
        "category": "artistic",
        "title": "Pieter Bruegel the Elder's 'Children's Games' (1560): a whole town given over to play",
        "excerpt": "Some eighty knots of children swarm across a town square, each group absorbed in a different game—rolling hoops, riding hobby-horses, staging weddings and processions—turning barrels, fences and the very buildings into the props of an all-consuming world of make-believe.",
        "source": "Pieter Bruegel the Elder, Children's Games (1560), Kunsthistorisches Museum, via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_the_Elder_-_Children%E2%80%99s_Games_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/casul-chair-childrens-play-set--art.png",
          "alt": "Pieter Bruegel the Elder's 1560 painting Children's Games, a crowded town square filled with dozens of children absorbed in different games.",
          "credit": "Pieter Bruegel the Elder, Children's Games (1560), Kunsthistorisches Museum, Vienna. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Schumann's 'Kinderszenen' turns a child's play into music, including the Knight of the Hobby-Horse",
        "excerpt": "Schumann's thirteen miniatures view childhood through an adult's tender memory; in 'Ritter vom Steckenpferd' (Knight of the Hobby-Horse) a lurching, off-beat rhythm sets a child galloping on a broomstick steed, while 'Träumerei' drifts into pure daydream—the whole cycle a nursery world where a stick becomes a warhorse and a room becomes a kingdom.",
        "source": "Robert Schumann, Kinderszenen (Scenes from Childhood), Op. 15 (1838), No. 9 'Ritter vom Steckenpferd', IMSLP",
        "href": "https://imslp.org/wiki/Kinderszenen,_Op.15_(Schumann,_Robert)"
      }
    ],
    "rank": 13
  },
  {
    "slug": "iran-hormuz-tanker-strike",
    "headline": "Iran fires missiles at commercial ships in the Strait of Hormuz, setting a tanker ablaze",
    "overview": "Iran fired missiles at commercial ships in the Strait of Hormuz on July 7, 2026, setting at least one tanker ablaze, according to reports, as the country mourned its late supreme leader. The attacks on the world's most important oil chokepoint sent shippers scrambling and raised fears of a wider confrontation. Vessels linked to several nations began moving out of the strait.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiugFBVV95cUxPUVFSZk5WeEJaVV96QWl0TDFIZDJUNWFlNTVkNERLdkxfYlVuY2paaS1KbkFHaDB6dkpEeVQ0ZXlLLW1RTXlBTmN2XzBPaklObVJ1VzdpWkFVTDhIYWFNbWlRdDVWZDJkZF9BY0FlNmJHaDBPbmY5ZTVDMEw3M0ozbjN5N2ljem83ZVBQZ3BhUEc4VTZBYmNZVnBiTVFoWUJUdml0dEdOUVYtMG02VEJKQUhMaUZSSnJuWmc?oc=5"
      },
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMiigFBVV95cUxOT2tfRFIyMHM3Y3R0UHRSQ0xwNEdNX2pjVUV5QkFGZk4yLUpVeU9RN0RHLXpUYU5UMzVIZkNwOWV4Q2dKTnJYZVl6UzZadkxHYUVYNmUzYWxoUEo1S2pPRUkxWmFsMHhadUYyams3ME5TOTlVSHhuTmgtRVA4NGo1NlJIOF9ZOUU2dGc?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-07",
    "image": {
      "src": "/covers/iran-hormuz-tanker-strike.png",
      "alt": "An oil tanker burning at sea in the Strait of Hormuz, thick black smoke rising from its deck against a hazy sky",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 7 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Xerxes scourges the Hellespont",
        "excerpt": "Thou bitter water, thy lord lays on thee this punishment because thou hast wronged him without a cause, having suffered no evil at his hands. Verily King Xerxes will cross thee, whether thou wilt or no.",
        "source": "Herodotus, The Histories, Book VII, ch. 35 (Xerxes orders the strait to be whipped and fettered), trans. George Rawlinson, Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_History_of_Herodotus_(Rawlinson)/Book_7"
      },
      {
        "category": "historical",
        "title": "The Naval Battle of Salamis",
        "excerpt": "The great destruction took place when the ships which had been first engaged began to fly; for they who were stationed in the rear, anxious to display their valour before the eyes of the king, made every effort to force their way to the front, and thus became entangled with such of their own vessels as were retreating.",
        "source": "Herodotus, The Histories, Book VIII, ch. 89 (the fleets crushed together in the strait of Salamis), trans. George Rawlinson, Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_History_of_Herodotus_(Rawlinson)/Book_8"
      },
      {
        "category": "literary",
        "title": "Odyssey, Book XII: Scylla and Charybdis",
        "excerpt": "Then we entered the Straits in great fear of mind, for on the one hand was Scylla, and on the other dread Charybdis kept sucking up the salt water.",
        "source": "Homer, The Odyssey, Book XII (passing the deadly narrows between Scylla and Charybdis), trans. Samuel Butler, Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_Odyssey_(Butler)/Book_XII"
      },
      {
        "category": "literary",
        "title": "Aeneid, Book V: The Burning of the Ships",
        "excerpt": "The Flame, unstop'd at first, more Fury gains; / And Vulcan rides at large with loosen'd Reins: / Triumphant to the painted Sterns he soars, / And seizes in his way, the Banks, and crackling Oars.",
        "source": "Virgil, The Aeneid, Book V (the Trojan women set the fleet ablaze), trans. John Dryden, in The Works of Virgil, Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_Works_of_Virgil_(Dryden)/Aeneid/Book_V"
      },
      {
        "category": "artistic",
        "title": "Der fliegende Holländer (The Flying Dutchman), Overture",
        "excerpt": "Wagner's overture erupts with a howling gale: shrieking strings and stabbing horns conjure a doomed vessel driven before the storm, its spectral crew condemned to wander the waters. The music heaves between the fury of the open sea and a yearning for deliverance, a portrait of a ship marked out for catastrophe and dread.",
        "source": "Richard Wagner, Der fliegende Holländer, WWV 63 (1841), Overture; full scores at the International Music Score Library Project (IMSLP).",
        "href": "https://imslp.org/wiki/Der_fliegende_Holländer,_WWV_63_(Wagner,_Richard)"
      },
      {
        "category": "artistic",
        "title": "Die Seeschlacht bei Salamis (The Naval Battle at Salamis)",
        "excerpt": "Kaulbach crams the narrow channel with clashing galleys, their ranks so packed that friend fouls friend as oars splinter and hulls grind together. Warriors tumble into the churning foam amid smoke and wreckage, while a watching king presides from afar over the ruin of his fleet—the chokepoint itself turned executioner.",
        "source": "Wilhelm von Kaulbach, Die Seeschlacht bei Salamis, 1868, Maximilianeum, Munich; via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Kaulbach,_Wilhelm_von_-_Die_Seeschlacht_bei_Salamis_-_1868.JPG",
        "image": {
          "src": "/covers/iran-hormuz-tanker-strike--art.png",
          "alt": "A vast panoramic sea battle in a narrow strait: crowded Greek and Persian galleys colliding, shattered oars, warriors falling into churning water, wreckage and smoke rising under a turbulent sky.",
          "credit": "Wilhelm von Kaulbach, Die Seeschlacht bei Salamis, 1868, Maximilianeum, Munich. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 14
  },
  {
    "slug": "belgium-usa-world-cup-exit",
    "headline": "Belgium beat the United States 4-1 to reach the World Cup quarterfinals",
    "overview": "Belgium beat the United States 4-1 on July 7, 2026, to reach the World Cup quarterfinals, ending a co-host nation's run. Belgium punished a series of American defensive lapses, and the result came amid a controversy over striker Folarin Balogun's suspension. The loss dashed hopes of a deep home tournament run for the US.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMingFBVV95cUxNU2YxakZTeHVQdkZEblU3blNYLWdLMDV4RGZIQ0pITFdxWl80UUVXOWlRYk0zUlhqOF9UaHl4d0ZBZzJ1T1B3VFdFLWdMMGpZb1otWW45dlJraE9HZ2U0UEFEWnlmRmpxeW05ZnByckpQaGRrdEdJb2EwVmhzQzVDTGFQdUVobV9mZGZWLWlqV3p0RVAxOEtBVGFvRmNvdw?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMixgFBVV95cUxNRERhdU5ZVmJQUjhoLWxsX3lGaUQ0dFBrY2RvSF9iaTRfZGgtV2FBeDFMVlhCVVpkSWRJQ09TSWozM21jRUY3M0lkNXJsUUh5elVrU3Fpem5nR0Y5ZE5ZeVM4NzE4NnpvamFpb0MzU0g1eUdUSzlWbW43VzB5bHhWT0dCTW44ZktoWTRhUFMtNXB1Vk9QZGtHeVpPYjhwMzVueVRHODRYYm00NVdfYkcwTW1mWXdKNUs1M1pMbUFGQW9ranlBblE?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-07",
    "image": {
      "src": "/covers/belgium-usa-world-cup-exit.png",
      "alt": "A packed World Cup stadium at night as players in red celebrate a goal on the floodlit pitch",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 7 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Olympic Games and the Persians' astonishment (Herodotus, Histories 8.26)",
        "excerpt": "Hearing the men say that the prize was not money but a wreath of olive, he could not forbear from exclaiming before them all: \"Good heavens! Mardonius, what manner of men are these against whom thou hast brought us to fight? - men who contend with one another, not for money, but for honour!\"",
        "source": "Herodotus, The Histories, Book VIII (Urania), section 26, trans. George Rawlinson, via Wikisource.",
        "href": "https://en.wikisource.org/wiki/History_of_Herodotus/Book_8"
      },
      {
        "category": "historical",
        "title": "Milo of Croton beaten at his seventh Olympiad (Pausanias, Description of Greece 6.14.5)",
        "excerpt": "Milo won six victories for wrestling at Olympia, one of them among the boys; at Pytho he won six among the men and one among the boys. He came to Olympia to wrestle for the seventh time, but did not succeed in mastering Timasitheus, a fellow-citizen who was also a young man, and who refused, moreover, to come to close quarters with him.",
        "source": "Pausanias, Description of Greece, Book VI (Elis II), 14.5, trans. W. H. S. Jones (Loeb Classical Library), via Wikisource.",
        "href": "https://en.wikisource.org/wiki/Description_of_Greece_(Jones)/Book_6"
      },
      {
        "category": "literary",
        "title": "The wreck of Eumelus in the chariot race (Homer, Iliad XXIII)",
        "excerpt": "and the goddess brake the yoke of his steeds, and to his cost the mares swerved to this side and that of the course, and the pole was swung to the earth; and Eumelus himself was hurled from out the car beside the wheel, and from his elbows and his mouth and nose the skin was stripped, and his forehead above his brows was bruised; and both his eyes were filled with tears and the flow of his voice was checked.",
        "source": "Homer, Iliad, Book XXIII (the chariot race at Patroclus' funeral games), lines 388ff., trans. A. T. Murray (1924), Perseus Digital Library.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0134:book=23:card=388"
      },
      {
        "category": "literary",
        "title": "Nisus slips at the head of the footrace (Virgil, Aeneid V)",
        "excerpt": "When eager Nisus, hapless in his haste, Slipp'd first, and, slipping, fell upon the plain, Soak'd with the blood of oxen newly slain.",
        "source": "Virgil, Aeneid, Book V (the footrace at Anchises' funeral games), trans. John Dryden (1697), Perseus Digital Library.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0052:book=5:card=315"
      },
      {
        "category": "artistic",
        "title": "See, the Conqu'ring Hero Comes (Handel, Judas Maccabaeus, HWV 63)",
        "excerpt": "Handel's chorus enters with a bright, marching simplicity, a hymn of homecoming raised for a victor returning in triumph. Voices and instruments swell together into the measured, inevitable tread of a champion paraded before an adoring crowd. It became the archetypal sound of sporting victory, the very music a winning side marches to while the beaten look on.",
        "source": "George Frideric Handel, Judas Maccabaeus, HWV 63 (1746), Act III chorus 'See, the Conqu'ring Hero Comes'; public-domain scores via IMSLP (Petrucci Music Library).",
        "href": "https://imslp.org/wiki/Judas_Maccabaeus,_HWV_63_(Handel,_George_Frideric)"
      },
      {
        "category": "artistic",
        "title": "The Chariot Race (Alexander von Wagner, c. 1882)",
        "excerpt": "Wagner freezes the decisive instant of a Roman chariot race: a four-horse team surges at full gallop toward the line while the driver strains forward over the rail, reins taut. Behind them the packed circus erupts, a blur of spectators rising to their feet as a rival team falters at the frame's edge. Dust, speed, and the roar of a home crowd are gathered into a single held breath poised between triumph and ruin.",
        "source": "Alexander von Wagner (Sándor Wagner), The Chariot Race, c. 1882, oil on canvas, Manchester Art Gallery (acc. 1898.12); object page and image via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Alexander_von_Wagner_(1838-1919)_-_The_Chariot_Race_-_1898.12_-_Manchester_Art_Gallery.jpg",
        "image": {
          "src": "/covers/belgium-usa-world-cup-exit--art.png",
          "alt": "A four-horse chariot thundering toward the finish line in a packed ancient Roman circus, the charioteer leaning forward over straining horses as tiered stands of spectators rise behind.",
          "credit": "Alexander von Wagner, The Chariot Race, c. 1882, Manchester Art Gallery. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 15
  },
  {
    "slug": "canada-thyssenkrupp-submarines",
    "headline": "Canada picks Germany's ThyssenKrupp to build its new submarine fleet as it lifts NATO spending",
    "overview": "Canada selected Germany's ThyssenKrupp Marine Systems on July 6, 2026, to build a new fleet of submarines, part of a push to raise military spending toward NATO targets. The deal ranks among the largest defence procurements in Canadian history. It deepens defence ties between Ottawa and Berlin.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMipwFBVV95cUxOejR3alQ3bnlGdU4zS1NpR2phbU80U1R1dEc2b1FlRkNRWHhXbjlHaTNwSE5CX2RuOVpIclFaTENFVEQzZEpwRkU5amZTVnJEdFRjYVRQekw1c0h0Q0FPMG1QNFlmUHgwYjBHUHFXeXFiY2JaMHZ3NTJ4Yk52Q3RWZUdIeFN3YmNZU19UUlF1RjNxdUJtNnFHQjVVZVRJLUh6YXAyY0pGQQ?oc=5"
      },
      {
        "name": "Google News",
        "href": "https://news.google.com/rss/search?q=Canada%20ThyssenKrupp%20submarine%20fleet%20NATO&hl=en-US&gl=US&ceid=US:en"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-07",
    "image": {
      "src": "/covers/canada-thyssenkrupp-submarines.png",
      "alt": "A grey military submarine cutting through open sea, its conning tower streaked with spray under an overcast sky",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 7 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Herodotus on Themistocles and the building of the Athenian fleet (Histories 7.144)",
        "excerpt": "The Athenians, having a large sum of money in their treasury, the produce of the mines at Laureium, were about to share it among the full-grown citizens, who would have received ten drachmas apiece, when Themistocles persuaded them to forbear the distribution, and build with the money two hundred ships, to help them in their war against the Eginetans. It was the breaking out of the Eginetan war which was at this time the saving of Greece; for hereby were the Athenians forced to become a maritime power.",
        "source": "Herodotus, The History of Herodotus, Book VII (Polymnia), §144, trans. George Rawlinson; Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_History_of_Herodotus_(Rawlinson)/Book_7"
      },
      {
        "category": "historical",
        "title": "Thucydides on sea power as the engine of dominion (Peloponnesian War 1.15)",
        "excerpt": "The navies, then, of the Hellenes during the period we have traversed were what I have described. All their insignificance did not prevent their being an element of the greatest power to those who cultivated them, alike in revenue and in dominion. They were the means by which the islands were reached and reduced, those of the smallest area falling the easiest prey.",
        "source": "Thucydides, History of the Peloponnesian War, Book I.15, trans. Richard Crawley; Wikisource.",
        "href": "https://en.wikisource.org/wiki/History_of_the_Peloponnesian_War/Book_1"
      },
      {
        "category": "literary",
        "title": "Jules Verne, Twenty Thousand Leagues Under the Sea — Captain Nemo on the sea and the Nautilus",
        "excerpt": "The sea does not belong to despots. Upon its surface men can still exercise unjust laws, fight, tear one another to pieces, and be carried away with terrestrial horrors. But at thirty feet below its level, their reign ceases, their influence is quenched, and their power disappears.",
        "source": "Jules Verne, Twenty Thousand Leagues Under the Sea, Chapter 10 ('The Man of the Seas'), trans. Mercier Lewis, in Works of Jules Verne; Wikisource.",
        "href": "https://en.wikisource.org/wiki/Works_of_Jules_Verne/Twenty_Thousand_Leagues_Under_the_Sea/Chapter_10"
      },
      {
        "category": "literary",
        "title": "Arthur Conan Doyle, 'The Adventure of the Bruce-Partington Plans' — the stolen submarine secret",
        "excerpt": "Its importance can hardly be exaggerated. It has been the most jealously guarded of all Government secrets. You may take it from me that naval warfare becomes impossible within the radius of a Bruce-Partington's operation.",
        "source": "Arthur Conan Doyle, 'The Adventure of the Bruce-Partington Plans' (in His Last Bow, 1917); Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_Adventure_of_the_Bruce-Partington_Plans"
      },
      {
        "category": "artistic",
        "title": "Claude Debussy, La mer (three symphonic sketches for orchestra)",
        "excerpt": "Shimmering strings and restless brass swell and recede like the tide itself across three symphonic seascapes, conjuring the ocean's vast and indifferent power. Dawn light glinting on open water gives way to the churning play of the waves and, at last, a thunderous dialogue of wind and sea. It is the sound of the immense, concealing element beneath which modern warships now hide and hunt.",
        "source": "Claude Debussy, La mer, trois esquisses symphoniques pour orchestre, CD 111 / L 109 (1903-1905); full score via IMSLP (Petrucci Music Library).",
        "href": "https://imslp.org/wiki/La_mer,_CD_111_(Debussy,_Claude)"
      },
      {
        "category": "artistic",
        "title": "J. M. W. Turner, The Fighting Temeraire (1839)",
        "excerpt": "The pale, ghostly hull of a once-mighty warship, stripped of her guns and glory, is towed by a squat, fire-belching steam tug across a glassy harbour at dusk. A molten sky of gold and crimson blazes behind her, mourning the passing of the age of sail before the arrival of steam and iron. Turner turns a decommissioned man-of-war into an elegy for naval power surrendered to a new machine age.",
        "source": "J. M. W. Turner, The Fighting Temeraire tugged to her last berth to be broken up, 1839, oil on canvas, National Gallery, London; via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:The_Fighting_Temeraire,_JMW_Turner,_National_Gallery.jpg",
        "image": {
          "src": "/covers/canada-thyssenkrupp-submarines--art.png",
          "alt": "A pale, ghostly three-masted warship under bare rigging is towed by a small dark steam tug with a tall smokestack across calm water, beneath a vivid sunset of gold and crimson reflected on the sea.",
          "credit": "J. M. W. Turner, The Fighting Temeraire, 1839, National Gallery, London. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 16
  },
  {
    "slug": "sp500-ai-stocks-record",
    "headline": "The S&P 500 climbs to within 1% of its record as AI stocks rebound",
    "overview": "A rebound in artificial-intelligence stocks lifted the S&P 500 on July 6, 2026, to within about 1% of its record high. Chipmakers and other technology shares led the gains after a stretch of volatility. Investors wagered that spending on AI infrastructure would keep driving corporate earnings.",
    "genre": "Economy",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMimwFBVV95cUxOczBidnY4T01SeU5Pa2JlX3ZROElnVHlJczVpZlVDT242TnozV0NDUWM0TzdSSkpmeHpuWkxLTlBPQU5JRDU4dlNvTnotRFNuNUdJMUQwaklSbEk0SURKeEVpVVlFdk9lVmpMV010ZmVFbXp2eWE0ZHJPUXFEV3hWWnpDRi1FYUl2Ukcwb05MUUtyYVpDYzJrdzctMA?oc=5"
      },
      {
        "name": "Google News",
        "href": "https://news.google.com/rss/search?q=S%26P%20500%20AI%20stocks%20record%20rebound&hl=en-US&gl=US&ceid=US:en"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-07",
    "image": {
      "src": "/covers/sp500-ai-stocks-record.png",
      "alt": "A stock-market display wall of glowing green numbers and rising line charts in a trading floor",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 7 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The South-Sea Bubble (1720)",
        "excerpt": "Such was the frantic eagerness of people of every class to speculate in these funds, that in the course of a few hours no less than a million and a half was subscribed at that rate. In the mean time, innumerable joint-stock companies started up every where. They soon received the name of Bubbles, the most appropriate that imagination could devise.",
        "source": "Charles Mackay, Memoirs of Extraordinary Popular Delusions and the Madness of Crowds, Volume 1, Chapter 2, 'The South-Sea Bubble' (1852 ed.), via Wikisource.",
        "href": "https://en.wikisource.org/wiki/Memoirs_of_Extraordinary_Popular_Delusions_and_the_Madness_of_Crowds/Volume_1/Chapter_2"
      },
      {
        "category": "historical",
        "title": "The Tulipomania (Holland, 1630s)",
        "excerpt": "Nobles, citizens, farmers, mechanics, sea-men, footmen, maid-servants, even chimney-sweeps and old clothes-women, dabbled in tulips. People of all grades converted their property into cash, and invested it in flowers.",
        "source": "Charles Mackay, Memoirs of Extraordinary Popular Delusions and the Madness of Crowds, Volume 1, Chapter 3, 'The Tulipomania' (1852 ed.), via Wikisource.",
        "href": "https://en.wikisource.org/wiki/Memoirs_of_Extraordinary_Popular_Delusions_and_the_Madness_of_Crowds/Volume_1/Chapter_3"
      },
      {
        "category": "literary",
        "title": "Boethius, The Consolation of Philosophy — Fortune and her Wheel",
        "excerpt": "This is my art, this the game I never cease to play. I turn the wheel that spins. I delight to see the high come down and the low ascend. Mount up, if thou wilt, but only on condition that thou wilt not think it a hardship to come down when the rules of my game require it.",
        "source": "Boethius, The Consolation of Philosophy, Book II, Prose II (Fortune's speech), translated by H. R. James (1897), via Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_Consolation_of_Philosophy_(James)/Man%27s_Covetousness"
      },
      {
        "category": "literary",
        "title": "Ovid, Metamorphoses — Midas and the Golden Touch",
        "excerpt": "but when he touched the gift of Ceres with his right hand, instantly the gift of Ceres stiffened to gold; or if he tried to bite with hungry teeth a tender bit of meat, the dainty, as his teeth but touched it, shone at once with yellow shreds and flakes of gold.",
        "source": "Ovid, Metamorphoses, Book XI (Midas), translated by Brookes More (Cornhill, 1922), Perseus Digital Library, Tufts University.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0028:book%3D11:card%3D85"
      },
      {
        "category": "artistic",
        "title": "Jan Brueghel the Younger, Satire on Tulip Mania",
        "excerpt": "Monkeys in the fine dress of Dutch gentlemen busy themselves with the tulip trade: one weighs bulbs on a scale, another counts coins and brandishes a moneybag, others feast and toast their paper fortunes. At the right a ruined speculator is dragged before a magistrate while, in the background, a mourner weeps over the collapse and a monkey urinates on the once-priceless blooms. The whole gilded folly is skewered as the beastly madness of a crowd chasing riches.",
        "source": "Jan Brueghel the Younger, Satire on Tulip Mania, c. 1640, oil on panel, Frans Hals Museum, Haarlem; object/file page on Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Jan_Brueghel_the_Younger,_Satire_on_Tulip_Mania,_c._1640.jpg",
        "image": {
          "src": "/covers/sp500-ai-stocks-record--art.png",
          "alt": "A satirical painting of monkeys dressed as wealthy seventeenth-century Dutchmen trading tulips in a formal garden — weighing bulbs, counting coins, feasting, brawling, and one hauled before a judge — mocking the speculators of the tulip craze.",
          "credit": "Jan Brueghel the Younger, Satire on Tulip Mania, c. 1640, Frans Hals Museum. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Richard Wagner, Das Rheingold (Prelude and the Rhinegold)",
        "excerpt": "Wagner's opera opens in the green depths of the Rhine, where three maidens guard a hoard of gold that shimmers into life on a slowly rising wave of sound. The dwarf Alberich, mocked and rejected, renounces love itself to snatch the gold and forge from it a ring of limitless power. The glittering leitmotif of the treasure and the churning orchestra turn the lust for riches into a curse that drags gods and mortals alike into ruin.",
        "source": "Richard Wagner, Das Rheingold, WWV 86A (1854), first opera of Der Ring des Nibelungen; full orchestral score, IMSLP / Petrucci Music Library.",
        "href": "https://imslp.org/wiki/Das_Rheingold,_WWV_86A_(Wagner,_Richard)"
      }
    ],
    "rank": 17
  },
  {
    "slug": "venezuela-earthquake-toll-3535",
    "headline": "Death toll from Venezuela's earthquakes rises to 3,535 with thousands still displaced",
    "overview": "The death toll from a series of powerful earthquakes in Venezuela rose to 3,535 on July 6, 2026, officials said, with thousands of people still displaced. Rescuers kept searching collapsed buildings days after the quakes struck. Survivors, including a girl trapped for more than a day, were pulled from the rubble.",
    "genre": "Science",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMitwFBVV95cUxNdGotOWZfUS1GR2Y1V210Qy1tcWdoZ3V1T2pnaENFbE93dHVLS3dyWm9zZllCT3p5TGtld2RtbTQ2RU1xWG5VUWxrV2xsUXJqMzFmaE4tTnp1dzNnalVseGV1Q0pOYzZpdzJTbk96U0V5UW54dlBPLTRJNXpyOU9XZjhnSFAwa0dCYzNWRm5lR3o4ODZpUy0yN0FhMWlqNE9FQUZFV0VMYm5PZU9XMzhiVWgtNlBRZkU?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/videos/cjrggj051pvo"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-07",
    "image": {
      "src": "/covers/venezuela-earthquake-toll-3535.png",
      "alt": "Rescue workers searching a mound of collapsed concrete and twisted rebar after an earthquake, dust hanging in the air",
      "credit": "BBC"
    },
    "edition": "Morning Edition · 7 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Pliny the Younger, Letters VI.16 — the eruption of Vesuvius (AD 79)",
        "excerpt": "It rose from one of the hills, which the observers did not know at the time to be Vesuvius, like a stone-pine with a lofty trunk and a cluster of branches at the top",
        "source": "Pliny the Younger, Letters, Book VI, Letter 16, to Cornelius Tacitus; trans. Alfred John Church & William Jackson Brodribb (1872), in 'Pliny's Letters', Chapter 2; Wikisource.",
        "href": "https://en.wikisource.org/wiki/Pliny%27s_Letters/Chapter_2"
      },
      {
        "category": "historical",
        "title": "Pliny the Younger, Letters VI.20 — the darkness over Misenum",
        "excerpt": "We had scarcely sat down when night was upon us,—not such as we have when there is no moon, or when the sky is cloudy, but such as there is in some closed room when the lights are extinguished.",
        "source": "Pliny the Younger, Letters, Book VI, Letter 20, to Cornelius Tacitus; trans. Alfred John Church & William Jackson Brodribb (1872), in 'Pliny's Letters', Chapter 2; Wikisource.",
        "href": "https://en.wikisource.org/wiki/Pliny%27s_Letters/Chapter_2"
      },
      {
        "category": "literary",
        "title": "Voltaire, 'The Lisbon Earthquake' (Poème sur le désastre de Lisbonne)",
        "excerpt": "Limbs crushed which under ponderous marble lie; Wretches unnumbered in the pangs of death,",
        "source": "Voltaire, 'The Lisbon Earthquake', trans. William F. Fleming, in The Works of Voltaire, Vol. 36; Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_Works_of_Voltaire/Volume_36/The_Lisbon_Earthquake"
      },
      {
        "category": "literary",
        "title": "Voltaire, Candide, Chapter 5 — the Lisbon earthquake",
        "excerpt": "Large sheets of flames and cinders covered the streets and public places; the houses tottered, and were tumbled topsy-turvy, even to their foundations, which were themselves destroyed, and thirty thousand inhabitants of both sexes, young and old, were buried beneath the ruins.",
        "source": "Voltaire, Candide, Chapter 5 ('A Tempest, a Shipwreck, an Earthquake, and What Else Befell Doctor Pangloss'), trans. Tobias Smollett; Wikisource.",
        "href": "https://en.wikisource.org/wiki/Candide/Chapter_5"
      },
      {
        "category": "artistic",
        "title": "Wolfgang Amadeus Mozart, Requiem in D minor, K. 626 — 'Dies irae'",
        "excerpt": "The 'Dies irae' bursts in without warning, hammering strings and thundering timpani driving a chorus that seems to make the ground itself heave. Mozart sets the medieval 'day of wrath' as sheer terror—voices tumbling over one another as a world collapses and the dead are called to judgement. It remains Western music's definitive sound of catastrophe descending on the living.",
        "source": "W. A. Mozart, Requiem in D minor, K. 626 (1791, completed by Franz Xaver Süssmayr), 'Dies irae' movement; scores and recordings at IMSLP (Petrucci Music Library).",
        "href": "https://imslp.org/wiki/Requiem_in_D_minor,_K.626_(Mozart,_Wolfgang_Amadeus)"
      },
      {
        "category": "artistic",
        "title": "Karl Bryullov, The Last Day of Pompeii (1830-1833)",
        "excerpt": "A blood-red sky splits with lightning as Vesuvius rains fire on Pompeii and its marble temples and statues topple onto the crowds beneath. Terrified families flee through the rubble—mothers shielding children, sons carrying an aged father, a fallen woman lying beside her infant—their faces lit by the glare of the eruption. Bryullov turns the burial of an ancient city into a vast, operatic tableau of human catastrophe and the sudden fragility of the built world.",
        "source": "Karl Bryullov, The Last Day of Pompeii, oil on canvas, 1830-1833, State Russian Museum, St. Petersburg; object file at Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Karl_Briullov,_The_Last_Day_of_Pompeii_(1827%E2%80%931833).jpg",
        "image": {
          "src": "/covers/venezuela-earthquake-toll-3535--art.png",
          "alt": "A panoramic crowd of Pompeii's citizens fleeing across a square as statues and columns topple around them, beneath a dark sky torn by lightning and the red glow of an erupting volcano.",
          "credit": "Karl Bryullov, The Last Day of Pompeii, 1830-1833, State Russian Museum, St. Petersburg. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 18
  },
  {
    "slug": "vertex-crinetics-acquisition",
    "headline": "Vertex Pharmaceuticals agrees to buy Crinetics for $10 billion in a rare-disease push",
    "overview": "Vertex Pharmaceuticals agreed on July 6, 2026, to buy Crinetics Pharmaceuticals for about $10 billion, expanding into treatments for rare endocrine diseases. The deal ranks among the year's largest in the drug industry. It gives Vertex access to Crinetics' pipeline of hormone-disorder therapies.",
    "genre": "Science",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMilwFBVV95cUxOX3N1NDFzcDNMSmVSODY1SEJGRm51Sl96QmtwWV9zMHA3RUZTRVlDenhJaG01alZQSU5KZUNWV2NFMFp6c0U5Xy1aZFZ2UXVmNWFGNk1HR1NMcGpJWHVpQjVtQWV2Z0FqMldWWHFwMlA2cHh1eDBtT19sem9BZ1ljblQta09WbWdBcjFzX3JVY2h2WlFsQ1VZ?oc=5"
      },
      {
        "name": "Google News",
        "href": "https://news.google.com/rss/search?q=Vertex%20Crinetics%2010%20billion%20acquisition&hl=en-US&gl=US&ceid=US:en"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-07",
    "image": {
      "src": "/covers/vertex-crinetics-acquisition.png",
      "alt": "Rows of small glass medicine vials on a laboratory bench under clean white light",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 7 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Hippocratic Oath",
        "excerpt": "I will follow that system of regimen which, according to my ability and judgment, I consider for the benefit of my patients, and abstain from whatever is deleterious and mischievous.",
        "source": "Hippocrates, 'The Oath,' in The Genuine Works of Hippocrates, trans. Francis Adams; Perseus Digital Library, Tufts University.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0248"
      },
      {
        "category": "historical",
        "title": "The Plague of Athens",
        "excerpt": "Neither were the physicians at first of any service, ignorant as they were of the proper way to treat it, but they died themselves the most thickly, as they visited the sick most often; nor did any human art succeed any better.",
        "source": "Thucydides, History of the Peloponnesian War, Book II, ch. 47, trans. Richard Crawley; Wikisource.",
        "href": "https://en.wikisource.org/wiki/History_of_the_Peloponnesian_War/Book_2"
      },
      {
        "category": "literary",
        "title": "The Doctor of Physic (General Prologue, The Canterbury Tales)",
        "excerpt": "A Doctor of Physic was with us; in all this world there was none like him for surgery and physic, for he was well grounded in astrology.",
        "source": "Geoffrey Chaucer, The Canterbury Tales of Geoffrey Chaucer, 'Prologue' (prose rendering); Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_Canterbury_Tales_of_Geoffrey_Chaucer/Prologue"
      },
      {
        "category": "literary",
        "title": "The Wound-Dresser",
        "excerpt": "I dress a wound in the side, deep, deep, But a day or two more, for see the frame all wasted and sinking, And the yellow-blue countenance see.",
        "source": "Walt Whitman, 'The Wound-Dresser,' Drum-Taps, in Leaves of Grass (1882); Wikisource.",
        "href": "https://en.wikisource.org/wiki/Leaves_of_Grass_(1882)/Drum-Taps/The_Wound-Dresser"
      },
      {
        "category": "artistic",
        "title": "Heiliger Dankgesang (String Quartet No. 15 in A minor, Op. 132)",
        "excerpt": "Written in 1825 as Beethoven recovered from a near-fatal illness, this vast slow movement is his 'Holy Song of Thanksgiving of a Convalescent to the Deity.' In the pale, archaic Lydian mode the four strings intone a hymn-like prayer, broken by brighter passages the composer marks as 'feeling new strength,' the music seeming to lift a sick body back toward life. It stands among art's most intimate testaments to healing and to gratitude for a cure.",
        "source": "Ludwig van Beethoven, String Quartet No. 15 in A minor, Op. 132 (1825), third movement, 'Heiliger Dankgesang eines Genesenen an die Gottheit, in der lydischen Tonart'; IMSLP / Petrucci Music Library (score).",
        "href": "https://imslp.org/wiki/String_Quartet_No.15,_Op.132_(Beethoven,_Ludwig_van)"
      },
      {
        "category": "artistic",
        "title": "The Doctor",
        "excerpt": "A physician sits in rapt vigil at the bedside of a gravely ill child, chin resting on his hand as the first grey light of dawn steals through a cottage window. Behind him the anguished parents wait in shadow, the whole composition concentrated on the doctor's patient, unwavering watch over one small suffering body. Fildes distils the ideal of devoted, attentive care into a single quiet and monumental image of the healer's art.",
        "source": "Sir Luke Fildes, The Doctor, oil on canvas, 1891, Tate Britain (N01522); via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:The_Doctor_Luke_Fildes_crop.jpg",
        "image": {
          "src": "/covers/vertex-crinetics-acquisition--art.png",
          "alt": "A Victorian doctor leans forward intently at the bedside of a sick child lying across two chairs in a dim cottage, dawn light at the window, the anxious parents waiting behind in shadow.",
          "credit": "Sir Luke Fildes, The Doctor, 1891, Tate Britain. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 19
  },
  {
    "slug": "macron-syria-visit",
    "headline": "Macron visits Syria, the first EU head of state to travel there since Assad's fall",
    "overview": "French President Emmanuel Macron visited Syria on July 6, 2026, becoming the first European Union head of state to travel there since the fall of Bashar al-Assad. The trip signalled Europe's cautious re-engagement with Syria's new leadership. Macron discussed reconstruction and the country's political transition.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMizAFBVV95cUxQQk9jblFRY3RqU2RNMlB1dGQ4V3lsZkFxYmNDNWNYNWNPdWFMUVNlUFowTXIxMzQ4b2lOU3dtMGFZYnVra0Jnano2MjdBR0xjbk9VazZENEx4S25oMF92T2F5bkR4WFJwZE5XcWNmTmp6OVVmOGdYekMxQlJnVWhwWjk3c0hZS0tLaFJJZUNqNFRheXo4aEpJYmh6WHo5ektuZXN5NWs0V3pTb3R6UVJkNEw2Q0lIOUhQaE83U1pid20ydUxFMU9Vd0hPbGs?oc=5"
      },
      {
        "name": "Google News",
        "href": "https://news.google.com/rss/search?q=Macron%20Syria%20visit%20first%20EU%20leader%20Assad&hl=en-US&gl=US&ceid=US:en"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-07",
    "image": {
      "src": "/covers/macron-syria-visit.png",
      "alt": "The sunlit marble courtyard of the Umayyad Mosque in Damascus, its tiled arcades and worshippers crossing the polished stone under a clear sky",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 7 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Herodotus on the fall of Sardis and the capture of King Croesus",
        "excerpt": "The Persians gained Sardis and took Croesus prisoner. Croesus had ruled fourteen years and been besieged fourteen days. Fulfilling the oracle, he had destroyed his own great empire. The Persians took him and brought him to Cyrus, who erected a pyre and mounted Croesus atop it, bound in chains, with twice seven sons of the Lydians beside him.",
        "source": "Herodotus, The Histories, Book 1, chapter 86, trans. A. D. Godley, Perseus Digital Library, Tufts University.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0126:book=1:chapter=86"
      },
      {
        "category": "historical",
        "title": "Marius among the ruins of Carthage",
        "excerpt": "Then, when asked by him what he had to say, and what answer he would make to the governor, he answered with a deep groan: 'Tell him, then, that thou hast seen Caius Marius a fugitive, seated amid the ruins of Carthage.' And it was not inaptly that he compared the fate of that city with his own reversal of fortune.",
        "source": "Plutarch, Life of Caius Marius, chapter 40, trans. Bernadotte Perrin (Loeb), Perseus Digital Library, Tufts University.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:2008.01.0049:chapter=40"
      },
      {
        "category": "literary",
        "title": "Ozymandias",
        "excerpt": "'My name is Ozymandias, king of kings: Look on my works, ye Mighty, and despair!' Nothing beside remains. Round the decay Of that colossal wreck, boundless and bare The lone and level sands stretch far away.",
        "source": "Percy Bysshe Shelley, 'Ozymandias', in The Complete Poetical Works of Percy Bysshe Shelley, ed. Thomas Hutchinson (1914), via Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_Complete_Poetical_Works_of_Percy_Bysshe_Shelley_(ed._Hutchinson,_1914)/Ozymandias"
      },
      {
        "category": "literary",
        "title": "The Ruins, or Meditation on the Revolutions of Empires (Invocation)",
        "excerpt": "Solitary ruins, sacred tombs, ye mouldering and silent walls, all hail! To you I address my invocation. [...] A while ago the whole world bowed the neck in silence before the tyrants that oppressed it; and yet in that hopeless moment you already proclaimed the truths that tyrants hold in abhorrence: mixing the dust of the proudest kings with that of the meanest slaves, you called upon us to contemplate this example of Equality.",
        "source": "C.-F. Volney, The Ruins, or Meditation on the Revolutions of Empires and the Law of Nature, 'Invocation' (London translation), Project Gutenberg eBook #1397.",
        "href": "https://www.gutenberg.org/files/1397/1397-0.txt"
      },
      {
        "category": "artistic",
        "title": "Die Ruinen von Athen (The Ruins of Athens), Op. 113",
        "excerpt": "Beethoven's overture and choruses accompany Kotzebue's tale of the goddess Minerva waking after two thousand years to find her beloved Athens fallen into ruin under foreign rule. Solemn, dirge-like passages give way to triumphant marches as the drama turns from mourning the wreck of a great city toward its hoped-for restoration. The music sets grief for a fallen civilization beside the promise of renewal and rebuilding.",
        "source": "Ludwig van Beethoven, Die Ruinen von Athen (The Ruins of Athens), Op. 113 (1811), incidental music to a festival play by August von Kotzebue; scores via IMSLP / Petrucci Music Library.",
        "href": "https://imslp.org/wiki/Die_Ruinen_von_Athen,_Op.113_(Beethoven,_Ludwig_van)"
      },
      {
        "category": "artistic",
        "title": "Imaginary View of the Grande Galerie of the Louvre in Ruins",
        "excerpt": "Robert paints the Louvre's grand gallery as a shattered ruin, its vaulted roof torn open to the sky and broken columns and rubble strewn across the floor where masterpieces once hung. A lone artist sketches amid the wreckage while other tiny figures pick through the fragments, dwarfed by the colossal decay. The scene imagines a proud monument of civilization reduced to picturesque ruin, a meditation on the impermanence of even the greatest human works.",
        "source": "Hubert Robert, Imaginary View of the Grande Galerie of the Louvre in Ruins, 1796, oil on canvas, Musée du Louvre, Paris. Via Wikimedia Commons (Web Gallery of Art).",
        "href": "https://commons.wikimedia.org/wiki/File:Hubert_Robert_-_Imaginary_View_of_the_Grande_Galerie_in_the_Louvre_in_Ruins_-_WGA19589.jpg",
        "image": {
          "src": "/covers/macron-syria-visit--art.png",
          "alt": "A vast barrel-vaulted gallery in ruins, its roof broken open to a pale sky, with fallen columns, scattered statues and rubble on the floor and small figures moving among the wreckage.",
          "credit": "Hubert Robert, Imaginary View of the Grande Galerie of the Louvre in Ruins, 1796, Musée du Louvre. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 20
  },
  {
    "slug": "syria-torture-chief-austria-conviction",
    "headline": "Austrian court convicts a former Syrian intelligence chief of torture and sexual abuse",
    "overview": "An Austrian court on July 6, 2026, found a former Syrian intelligence chief guilty of torture and sexual abuse committed under the Assad government. It was among the first such convictions of a senior Syrian official in Europe under universal jurisdiction. Prosecutors called the ruling a milestone for accountability.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cy8ddd1m3mpo"
      },
      {
        "name": "Google News",
        "href": "https://news.google.com/rss/search?q=Syrian%20intelligence%20chief%20torture%20Austria%20court%20guilty&hl=en-US&gl=US&ceid=US:en"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-07",
    "image": {
      "src": "/covers/syria-torture-chief-austria-conviction.png",
      "alt": "An empty wood-panelled courtroom with a raised judge's bench and rows of seats under formal lighting",
      "credit": "BBC"
    },
    "edition": "Morning Edition · 7 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Cicero, Against Verres — the punishment of Gavius (Second Pleading, Book 5.170)",
        "excerpt": "It is a crime to bind a Roman citizen; to scourge him is a wickedness; to put him to death is almost parricide. What shall I say of crucifying him? So guilty an action cannot by any possibility be adequately expressed by any name bad enough for it.",
        "source": "Marcus Tullius Cicero, The Orations of Marcus Tullius Cicero, 'Against Verres,' Second Pleading, Book 5, section 170, translated by C. D. Yonge (London: George Bell & Sons, 1903), Perseus Digital Library, Tufts University.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0018:text=Ver.:actio=2:book=5:section=170"
      },
      {
        "category": "historical",
        "title": "Edmund Burke, Speech in the Impeachment of Warren Hastings — the peroration",
        "excerpt": "I impeach him in the name of the people of India, whose laws, rights, and liberties he has subverted, whose properties he has destroyed, whose country he has laid waste and desolate. I impeach him in the name and by virtue of those eternal laws of justice which he has violated. I impeach him in the name of human nature itself, which he has cruelly outraged, injured, and oppressed, in both sexes.",
        "source": "Edmund Burke, 'Speeches in the Impeachment of Warren Hastings, Esquire,' in The Works of the Right Honourable Edmund Burke, Vol. X (of 12), Project Gutenberg.",
        "href": "https://www.gutenberg.org/cache/epub/18192/pg18192.txt"
      },
      {
        "category": "literary",
        "title": "Aeschylus, Eumenides — Athena founds the court of justice",
        "excerpt": "Hear now my ordinance, people of Attica, as you judge the first trial for bloodshed. In the future, even as now, this court of judges will always exist for the people of Aegeus.",
        "source": "Aeschylus, Eumenides, lines 681-684, translated by Herbert Weir Smyth (Cambridge, Mass.: Harvard University Press, 1926), Perseus Digital Library, Tufts University.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0006:card=681"
      },
      {
        "category": "literary",
        "title": "Dante Alighieri, Inferno, Canto XII — the tyrants in the river of boiling blood",
        "excerpt": "Tyrants are these, Who dealt in bloodshed and in pillaging. Here they lament their pitiless mischiefs; here Is Alexander, and fierce Dionysius Who upon Sicily brought dolorous years.",
        "source": "Dante Alighieri, Inferno, Canto XII, lines 104-108, translated by Henry Wadsworth Longfellow (1867), in Divine Comedy (Longfellow 1867), Volume 1, Wikisource.",
        "href": "https://en.wikisource.org/wiki/Divine_Comedy_(Longfellow_1867)/Volume_1/Canto_12"
      },
      {
        "category": "artistic",
        "title": "Giuseppe Verdi, Messa da Requiem — 'Dies irae'",
        "excerpt": "Verdi's setting of the 'Dies irae' erupts as a musical Last Judgement: hammered orchestral chords and thundering bass drum drive a chorus crying out in terror at the day of wrath. The music stages divine reckoning as sheer overwhelming force, the trembling of the guilty before an inescapable tribunal. It is the sound of accountability arriving after long delay, the powerful at last summoned to answer.",
        "source": "Giuseppe Verdi, Messa da Requiem (1874), 'Dies irae' sequence, full score, IMSLP / Petrucci Music Library.",
        "href": "https://imslp.org/wiki/Requiem_(Verdi,_Giuseppe)"
      },
      {
        "category": "artistic",
        "title": "Gerard David, The Judgement of Cambyses (panel 2: The Flaying of the Corrupt Judge Sisamnes)",
        "excerpt": "Gerard David's panel shows the corrupt royal judge Sisamnes stretched naked across a table while executioners methodically flay the skin from his living body, their knives working with grim, clinical calm. Richly dressed officials look on without pity in a sunlit Flemish square, and in the background his flayed skin is draped over the judgement seat now occupied by his son. Commissioned for a town hall, it turns the punishment of a powerful servant of the state into a public warning that no office places cruelty beyond the reach of justice.",
        "source": "Gerard David, The Judgement of Cambyses (right panel: The Flaying of Sisamnes), 1498, oil on panel, Groeningemuseum, Bruges. Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Gerard_David_-_The_Judgment_of_Cambyses,_panel_2_-_The_shedding_of_the_corrupt_judge_Sisamnes.jpg",
        "image": {
          "src": "/covers/syria-torture-chief-austria-conviction--art.png",
          "alt": "A Renaissance painting in which executioners flay the skin from a naked man bound to a table, watched by richly dressed officials in a sunlit square; in the upper right his flayed skin drapes a judge's throne.",
          "credit": "Gerard David, The Judgement of Cambyses, 1498, Groeningemuseum, Bruges. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 21
  },
  {
    "slug": "texas-app-store-age-verification-scotus",
    "headline": "US Supreme Court declines to block a Texas law requiring app-store age verification",
    "overview": "The US Supreme Court on July 6, 2026, declined to block a Texas law requiring app stores to verify users' ages, letting the measure take effect. The law compels companies such as Apple and Google to confirm ages and obtain parental consent for minors. Tech industry groups had challenged it on free-speech grounds.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiqgFBVV95cUxOZ2dtRENnd3ktTkR0ZDh2bHZGR3JkempEaU1MVHdzQmMwOXBRZDhwazUzWGk1bXFmRjA0TVpnOVJweWxCVF9PdFlpaGNtMS1WQm5kY0hkdUVfZEVRazdqTUh2Nm9zeWZlNWN0SlBVeFVNcGs4ck15ZUxqeWN1cDc2dTUyeHFTcWdGeno1X1JkbjI4YmtXQTRxeE1Ec3BaY0ZsUVgtTXB6T0lzQQ?oc=5"
      },
      {
        "name": "Google News",
        "href": "https://news.google.com/rss/search?q=Supreme%20Court%20Texas%20app%20store%20age%20verification&hl=en-US&gl=US&ceid=US:en"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-07",
    "image": {
      "src": "/covers/texas-app-store-age-verification-scotus.png",
      "alt": "The marble west facade and columns of the United States Supreme Court building lit warmly against a dusk sky",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 7 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Milton's Areopagitica (1644) — against licensing who may read",
        "excerpt": "As good almost kill a man as kill a good book. Who kills a man kills a reasonable creature, God's image; but he who destroys a good book, kills reason itself, kills the image of God, as it were, in the eye.",
        "source": "John Milton, Areopagitica: A Speech for the Liberty of Unlicensed Printing (1644), addressed to the Parliament of England against its pre-publication licensing order; in The World's Famous Orations, Vol. III, ed. W. J. Bryan (1906), hosted at Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_World%27s_Famous_Orations/Volume_3/Plea_for_the_Liberty_of_Unlicensed_Printing"
      },
      {
        "category": "historical",
        "title": "The book-burning of Cremutius Cordus (Tacitus, Annals IV)",
        "excerpt": "His books, so the Senators decreed, were to be burnt by the aediles; but some copies were left which were concealed and afterwards published.",
        "source": "Tacitus, The Annals, Book IV (ch. 35), on the trial under Tiberius of the historian Cremutius Cordus and the Senate's order to burn his writings; trans. Alfred John Church and William Jackson Brodribb, hosted at Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_Annals_(Tacitus)/Book_4"
      },
      {
        "category": "literary",
        "title": "Plato, Republic, Book II — a censorship of the tales the young may hear",
        "excerpt": "Then the first thing will be to establish a censorship of the writers of fiction, and let the censors receive any tale of fiction which is good, and reject the bad; and we will desire mothers and nurses to tell their children the authorized ones only.",
        "source": "Plato, The Republic, Book II, on the education of the guardians and the state's control over the stories told to children; trans. Benjamin Jowett, hosted at Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_Republic_of_Plato/Book_2"
      },
      {
        "category": "literary",
        "title": "Dante, Inferno, Canto III — the inscription over the Gate of Hell",
        "excerpt": "Through me the way is to the city dolent; / Through me the way is to eternal dole; / Through me the way among the people lost. / Justice incited my sublime Creator; / Created me divine Omnipotence, / The highest Wisdom and the primal Love. / Before me there were no created things, / Only eterne, and I eternal last. / All hope abandon, ye who enter in!",
        "source": "Dante Alighieri, The Divine Comedy, Inferno, Canto III (lines 1-9), the words carved over the threshold that admits or bars every soul; trans. Henry Wadsworth Longfellow (1867), hosted at Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_Divine_Comedy/Inferno/Canto_III"
      },
      {
        "category": "artistic",
        "title": "Gluck, Orfeo ed Euridice (1762) — Orpheus at the guarded gates of Hades",
        "excerpt": "At the opening of Act II Orpheus reaches the threshold of the underworld, where a chorus of Furies and the guardian hound hurl back their thunderous refusals to bar his passage. Gluck scores their menace in stabbing, dissonant chords and snarling orchestral figures, the very sound of a boundary defended against the one who would cross it. Only when his pleading song at last softens the guardians do the gates relent and grant him entry to the realm beyond.",
        "source": "Christoph Willibald Gluck, Orfeo ed Euridice, Wq. 30 (Vienna, 1762), Act II scene 1, the Furies guarding the entrance to the Underworld; full score hosted at IMSLP.",
        "href": "https://imslp.org/wiki/Orfeo_ed_Euridice_(Gluck,_Christoph_Willibald)"
      },
      {
        "category": "artistic",
        "title": "William Blake, Cerberus (illustration to Dante's Inferno, c. 1824-27)",
        "excerpt": "Blake's three-headed hound rears up in the foreground, a bloated, snarling sentinel set to guard the third circle of Hell, its heads turned outward as if to challenge any who approach. Beneath its clawed feet the gluttons lie sprawled and helpless in the cold mire, unable to pass the beast at the threshold. Rendered in luminous, translucent watercolour, the monster becomes the pure image of the guardian who decides who may enter and who is turned back.",
        "source": "William Blake, Cerberus, from the Illustrations to Dante's Divine Comedy (1824-1827), pen, ink and watercolour over pencil; National Gallery of Victoria, Melbourne (Felton Bequest, 1920); object/file page at Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Cerberus-Blake.jpeg",
        "image": {
          "src": "/covers/texas-app-store-age-verification-scotus--art.png",
          "alt": "A monstrous three-headed dog with bared teeth and glaring eyes crouches over pale naked human figures lying in dark mud, its muscular body filling the foreground in glowing watercolour.",
          "credit": "William Blake, Cerberus, c. 1824-1827, National Gallery of Victoria. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 22
  },
  {
    "slug": "anthropic-mythos-government-code-audit",
    "headline": "US cyber agency is using Anthropic's Mythos AI to audit federal government code, sources say",
    "overview": "A US cybersecurity agency is using Anthropic's Mythos artificial-intelligence system to audit federal government code for security flaws, sources told Reuters on July 6, 2026. The effort ranks among the most significant government deployments of AI for cybersecurity to date. Officials see automated code review as a way to find vulnerabilities faster than human teams.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiugFBVV95cUxNcVIxWEljZjRkR21jakVuQVZZblN5T1RTVENtMTNpRDU0d0ZLWWk1RkpKVkpjVUNGbkY0ckVwTmpvaXBwSnV3ZWdjNGNzU29sVnpJeUJzQUU3dkhKa2pPWW44ck5kNEpsbjZfZ1JlSTdkdFhKS05CdzhCZEZKWDAwTkpDWE01U3JZQU9TeExfYkpGQ3hHdU1nMnFJaFhyRWM3N3FBUFBPUW5LVHlQS0xMcFZJUHRqZWktNEE?oc=5"
      },
      {
        "name": "Google News",
        "href": "https://news.google.com/rss/search?q=US%20cyber%20agency%20Anthropic%20Mythos%20government%20code%20audit&hl=en-US&gl=US&ceid=US:en"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-07",
    "image": {
      "src": "/covers/anthropic-mythos-government-code-audit.png",
      "alt": "Lines of glowing code on a dark monitor reflected in a server room, blue indicator lights receding into the dark",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 7 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Jeremy Bentham's Panopticon, or The Inspection-House (1787)",
        "excerpt": "The essence of it consists, then, in the centrality of the inspector's situation, combined with the well known and most effectual contrivances for seeing without being seen.",
        "source": "Jeremy Bentham, Panopticon or the Inspection-House, Letter V (1787/1791), transcribed at Wikisource.",
        "href": "https://en.wikisource.org/wiki/Panopticon_or_the_Inspection-House"
      },
      {
        "category": "historical",
        "title": "Cato the Elder as Roman Censor",
        "excerpt": "This office towered, as it were, above every other civic honour, and was, in a way, the culmination of a political career. The variety of its powers was great, including that of examining into the lives and manners of the citizens.",
        "source": "Plutarch, Life of Marcus Cato, chapter 16, trans. Bernadotte Perrin (Loeb), Perseus Digital Library, Tufts University.",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:2008.01.0013:chapter=16"
      },
      {
        "category": "literary",
        "title": "The Watchman's Prologue in Aeschylus's Agamemnon",
        "excerpt": "Release from this weary task of mine has been my plea to the gods throughout this long year's watch, in which, lying upon the palace roof of the Atreidae, upon my bent arm, like a dog, I have learned to know well the gathering of the night's stars...",
        "source": "Aeschylus, Agamemnon, opening lines (Watchman's speech), trans. Herbert Weir Smyth, Perseus Digital Library, Tufts University.",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0004:card=1"
      },
      {
        "category": "literary",
        "title": "Argus Panoptes, the Hundred-Eyed Watchman, in Ovid's Metamorphoses",
        "excerpt": "Juno regardful of Jove's cunning art, lest he might change her to her human form, gave the unhappy heifer to the charge of Argus, Aristorides, whose head was circled with a hundred glowing eyes; of which but two did slumber in their turn whilst all the others kept on watch and guard.",
        "source": "Ovid, Metamorphoses, Book 1, trans. Brookes More, Perseus Digital Library, Tufts University.",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0028:book=1"
      },
      {
        "category": "artistic",
        "title": "J. S. Bach, Wachet auf, ruft uns die Stimme, BWV 140 (Sleepers Awake)",
        "excerpt": "Bach's cantata opens with the great chorale of the watchmen crying out from the high tower into the darkness, summoning the sleeping city to wakefulness. Over a striding, dotted orchestral tread the sopranos intone the alarm as inner voices weave beneath, the very sound of vigilance keeping its post through the night. It is music of sentinels calling attention to what others cannot yet see coming.",
        "source": "Johann Sebastian Bach, Wachet auf, ruft uns die Stimme, BWV 140 (Leipzig, 1731), scores at the International Music Score Library Project (IMSLP).",
        "href": "https://imslp.org/wiki/Wachet_auf,_ruft_uns_die_Stimme,_BWV_140_(Bach,_Johann_Sebastian)"
      },
      {
        "category": "artistic",
        "title": "Diego Velázquez, Mercury and Argus (c. 1659)",
        "excerpt": "Velázquez shows the hundred-eyed watchman Argus slumped at last into sleep, his vigilance finally defeated, while Mercury creeps in low along the ground to slay him and free the captive heifer Io. The long, dark canvas is nearly all shadow and muscle, the guard's heavy body sinking into torpor as the intruder inches unseen toward him. It is the instant the tireless sentinel is undone by the one lapse he could not guard against.",
        "source": "Diego Velázquez, Mercury and Argus (Fábula de Mercurio y Argos), oil on canvas, c. 1659, Museo del Prado, Madrid; file page on Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:F%C3%A1bula_de_Mercurio_y_Argos,_by_Diego_Vel%C3%A1zquez.jpg",
        "image": {
          "src": "/covers/anthropic-mythos-government-code-audit--art.png",
          "alt": "A long, dark horizontal painting of the hundred-eyed watchman Argus asleep on the ground, his muscular body slumped forward, while the god Mercury in a broad hat creeps toward him low along the earth, a reclining cow behind them in shadow.",
          "credit": "Diego Velázquez, Mercury and Argus, c. 1659, Museo del Prado. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 23
  },
  {
    "slug": "toyota-texas-truck-plant",
    "headline": "Toyota to build a $3.6 billion plant in Texas, shifting some truck production from Mexico",
    "overview": "Toyota said on July 6, 2026, that it would build a $3.6 billion plant in Texas and shift some pickup-truck production from Mexico to the United States. The move comes amid pressure over tariffs and North American trade. The plant is expected to create thousands of jobs.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMi0gFBVV95cUxNUTFmR3FWMExLS1M4SGp2dXR0SEFiZmhYeWZ4VkVrQ2ZhdzU2YUswQkJnWnQtdERPRUZqZF9lMDFoanA5ODV5QThDd2t6emptWldBc1BBa0lEYVVJdEduZTUxQ0lXb1hDUFRjVWpOcDRlM3dYeXJLX0NfSFRHUzZxUEcxd05PMDQ4dVNJNlFkMzVnbERheVN4aDBfbnpjTXN2ZmF1SVNsaU91R08zNWwtaUpER3R1clgyUHZqYTNfcml4SVdJX1RuSmdUX2hjaTV5RFE?oc=5"
      },
      {
        "name": "Google News",
        "href": "https://news.google.com/rss/search?q=Toyota%203.6%20billion%20Texas%20plant%20truck%20Mexico&hl=en-US&gl=US&ceid=US:en"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-07",
    "image": {
      "src": "/covers/toyota-texas-truck-plant.png",
      "alt": "A white Toyota Tundra full-size pickup truck with a black grille and chunky off-road tyres on display under bright showroom lights",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 7 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Adam Smith on the pin factory and the division of labour",
        "excerpt": "the important business of making a pin is, in this manner, divided into about eighteen distinct operations, which, in some manufactories, are all performed by distinct hands, though in others the same man will sometimes perform two or three of them.",
        "source": "Adam Smith, An Inquiry into the Nature and Causes of the Wealth of Nations (1776), Book I, Chapter I ('Of the Division of Labour'), via Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_Wealth_of_Nations/Book_I/Chapter_1"
      },
      {
        "category": "historical",
        "title": "Alexander Hamilton, Report on Manufactures",
        "excerpt": "The expediency of encouraging manufactures in the United States, which was not long since deemed very questionable, appears at this time to be pretty generally admitted.",
        "source": "Alexander Hamilton, Report on the Subject of Manufactures (Report on Manufactures), submitted to the U.S. House of Representatives, 5 December 1791, via Wikisource.",
        "href": "https://en.wikisource.org/wiki/Report_on_Manufactures"
      },
      {
        "category": "literary",
        "title": "Hephaestus forges the Shield of Achilles (Iliad, Book XVIII)",
        "excerpt": "And the bellows, twenty in all, blew upon the melting-vats, sending forth a ready blast of every force, now to further him as he laboured hard, and again in whatsoever way Hephaestus might wish and his work go on.",
        "source": "Homer, Iliad, Book XVIII (ll. 468 ff.), trans. A. T. Murray (1924), via Perseus Digital Library, Tufts University.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0134:book=18:card=468"
      },
      {
        "category": "literary",
        "title": "Coketown, the factory town in Dickens's Hard Times",
        "excerpt": "It was a town of machinery and tall chimneys, out of which interminable serpents of smoke trailed themselves for ever and ever, and never got uncoiled. It had a black canal in it, and a river that ran purple with ill-smelling dye, and vast piles of building full of windows where there was a rattling and a trembling all day long, and where the piston of the steam-engine worked monotonously up and down, like the head of an elephant in a state of melancholy madness.",
        "source": "Charles Dickens, Hard Times (1854), Book the First ('Sowing'), Chapter V ('The Key-note'), via Wikisource.",
        "href": "https://en.wikisource.org/wiki/Hard_Times/First_Book/Chapter_V"
      },
      {
        "category": "artistic",
        "title": "Verdi, 'Anvil Chorus' (Coro di zingari) from Il trovatore",
        "excerpt": "Verdi turns the labour of the forge into music: the chorus of gypsies swings its hammers in insistent rhythm while real anvils ring out on the downbeat, hard metallic strokes cutting across the surging melody. The clang of iron on iron becomes the pulse of the whole number, a workshop transformed into exuberant song. It is the sound of collective toil made triumphant and communal.",
        "source": "Giuseppe Verdi, Il trovatore (1853), Act II, No. 7, 'Vedi! le fosche notturne spoglie' (Coro di zingari / Anvil Chorus), libretto by Salvadore Cammarano; full score (G. Ricordi) via IMSLP / Petrucci Music Library.",
        "href": "https://imslp.org/wiki/Il_trovatore_(Verdi,_Giuseppe)"
      },
      {
        "category": "artistic",
        "title": "Adolph von Menzel, The Iron Rolling Mill (Das Eisenwalzwerk)",
        "excerpt": "Menzel plunges the viewer into the smoky cavern of a modern iron works, where bare-armed men strain in a semicircle around a bar of white-hot metal glaring at the mill's heart. Sparks, steam and grime fill the vast hall as gears, rollers and furnaces crowd the labourers on every side. The painting makes the new industrial factory feel like a monumental, almost mythic forge of the machine age.",
        "source": "Adolph von Menzel, Das Eisenwalzwerk (The Iron Rolling Mill / 'Modern Cyclopes'), 1875, oil on canvas, Alte Nationalgalerie, Berlin; Google Art Project image via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Adolph_Menzel_-_Eisenwalzwerk_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/toyota-texas-truck-plant--art.png",
          "alt": "A vast, smoke-filled iron foundry interior where bare-armed labourers strain in a ring around a glowing white-hot ingot at the rolling mill, amid sparks, steam, gears and furnaces in a murky industrial hall.",
          "credit": "Adolph von Menzel, Das Eisenwalzwerk (The Iron Rolling Mill), 1875, Alte Nationalgalerie, Berlin. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 24
  },
  {
    "slug": "typhoon-maysak-china-dam-flood",
    "headline": "Floods from Typhoon Maysak burst a dam wall in China",
    "overview": "Floods triggered by Typhoon Maysak burst a dam wall in China on July 7, 2026, sending water surging into surrounding areas. The storm brought torrential rain and forced evacuations. Authorities scrambled to shore up damaged flood defences.",
    "genre": "Climate",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/videos/c1eyyevn5j7o"
      },
      {
        "name": "Google News",
        "href": "https://news.google.com/rss/search?q=Typhoon%20Maysak%20China%20dam%20flood&hl=en-US&gl=US&ceid=US:en"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-07",
    "image": {
      "src": "/covers/typhoon-maysak-china-dam-flood.png",
      "alt": "Muddy floodwater surging through a breached dam and pouring across farmland under a grey storm sky",
      "credit": "BBC"
    },
    "edition": "Morning Edition · 7 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Yü the Great tames the Great Flood (the Shû King / Book of Documents)",
        "excerpt": "The inundating waters seemed to assail the heavens, and in their vast extent embraced the hills and overtopped the great mounds, so that the people were bewildered and overwhelmed.",
        "source": "The Yî and Kî, in The Shû King (Book of Documents), Part II, trans. James Legge, Sacred Books of the East, Vol. III (1879), hosted at Wikisource.",
        "href": "https://en.wikisource.org/wiki/Sacred_Books_of_the_East/Volume_3/The_Shu/Part_2/Yi_and_Ki"
      },
      {
        "category": "historical",
        "title": "The breaking of the South Fork Dam, the Johnstown Flood (1889)",
        "excerpt": "When the dam of Conemaugh lake broke the water seemed to leap, scarcely touching the ground. It bounded down the valley, crashing and roaring, carrying everything before it. For a mile its front seemed like a solid wall twenty feet high.",
        "source": "Willis Fletcher Johnson, History of the Johnstown Flood (Edgewood Publishing Co., 1889), eyewitness account of Mr. Crouse on the breaking of the South Fork Dam, hosted at Project Gutenberg (ebook 41271).",
        "href": "https://www.gutenberg.org/files/41271/41271-h/41271-h.htm"
      },
      {
        "category": "literary",
        "title": "Ovid, Metamorphoses, Book I: the Flood of Deucalion",
        "excerpt": "And now one vast expanse, the land and sea were mingled in the waste of endless waves—a sea without a shore.",
        "source": "Ovid, Metamorphoses, Book I (the flood of Deucalion), lines 253-347, trans. Brookes More, Perseus Digital Library, Tufts University.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0028:book%3D1:card%3D253"
      },
      {
        "category": "literary",
        "title": "The Flood of Noah, Genesis 7 (King James Version)",
        "excerpt": "And the waters prevailed exceedingly upon the earth; and all the high hills, that were under the whole heaven, were covered. Fifteen cubits upward did the waters prevail; and the mountains were covered.",
        "source": "The Holy Bible, King James Version, Genesis 7:19-20 (the Flood of Noah), hosted at Wikisource.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Genesis"
      },
      {
        "category": "artistic",
        "title": "Beethoven, Symphony No. 6 'Pastoral', Op. 68 — IV. 'Gewitter, Sturm' (Thunderstorm)",
        "excerpt": "The fourth movement of Beethoven's Pastoral Symphony stages a cloudburst in sound: distant thunder rumbles in the low strings before the whole orchestra breaks into a downpour of tremolos, shrieking piccolo lightning, and hammering timpani. The storm swells to a terrifying climax, as if the sky itself had burst its banks, then slowly subsides into calm. It is one of music's most vivid renderings of water and weather unleashed and overwhelming the human world.",
        "source": "Ludwig van Beethoven, Symphony No. 6 in F major, Op. 68 ('Pastoral'), fourth movement, 'Gewitter, Sturm'; full score, IMSLP / Petrucci Music Library.",
        "href": "https://imslp.org/wiki/Symphony_No.6,_Op.68_(Beethoven,_Ludwig_van)"
      },
      {
        "category": "artistic",
        "title": "Nicolas Poussin, Winter (The Deluge)",
        "excerpt": "Poussin's final Season canvas plunges the viewer into a leaden, storm-black world where the last light drains from a drowning earth. Tiny figures cling to rocks, an overturned boat, and a floating plank as the waters climb around them, a bolt of lightning splitting the murk while a serpent glides across the flood. It is the Deluge rendered as cold, sublime terror, humanity reduced to a few doomed silhouettes swallowed by water.",
        "source": "Nicolas Poussin, L'Hiver (Le Déluge) / Winter (The Deluge), 1660-1664, oil on canvas, Musée du Louvre, Paris; via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:L'Hiver_ou_le_D%C3%A9luge_par_Nicolas_Poussin.jpg",
        "image": {
          "src": "/covers/typhoon-maysak-china-dam-flood--art.png",
          "alt": "A dark, storm-lit landscape almost wholly submerged by floodwater; small human figures cling to rocks, a plank, and a foundering boat as lightning splits a black sky and a snake slides across the water.",
          "credit": "Nicolas Poussin, Winter (The Deluge), 1660-1664, Musée du Louvre. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 25
  },
  {
    "slug": "veks-van-hillik-surreal-murals",
    "headline": "Veks Van Hillik suspends fish and insects in large-scale surreal murals",
    "overview": "The French painter Veks Van Hillik has created a series of large-scale murals that suspend fish, insects, and everyday objects in dreamlike, gravity-defying scenes, the arts magazine Colossal reported on July 6, 2026. Blending Renaissance technique with surrealism, the works turn public walls into uncanny tableaux. The murals extend a body of work known for meticulous, otherworldly detail.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Colossal",
        "href": "https://www.thisiscolossal.com/2026/07/veks-van-hillik-paintings-murals-animals-fish/"
      },
      {
        "name": "Google News",
        "href": "https://news.google.com/rss/search?q=Veks%20Van%20Hillik%20murals%20surreal&hl=en-US&gl=US&ceid=US:en"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-07",
    "image": {
      "src": "/covers/veks-van-hillik-surreal-murals.png",
      "alt": "A large mural on a building wall showing a fish and insects floating in mid-air against a dreamlike painted sky",
      "credit": "Colossal"
    },
    "edition": "Morning Edition · 7 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Leonardo da Vinci paints a monster on a fig-wood buckler",
        "excerpt": "For this purpose, then, Leonardo carried to a room of his own into which no one entered save himself alone, lizards great and small, crickets, serpents, butterflies, grasshoppers, bats, and other strange kinds of suchlike animals, out of the number of which, variously put together, he formed a great ugly creature, most horrible and terrifying, which emitted a poisonous breath and turned the air to flame;",
        "source": "Giorgio Vasari, Lives of the Most Eminent Painters, Sculptors & Architects, 'Life of Leonardo da Vinci,' trans. Gaston du C. de Vere, Vol. IV, Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/28420/28420-h/28420-h.htm"
      },
      {
        "category": "historical",
        "title": "The contest of Zeuxis and Parrhasius",
        "excerpt": "This last, it is recorded, entered into a competition with Zeuxis, who produced a picture of grapes so successfully represented that birds flew up to the stage-buildings; whereupon Parrhasius himself produced such a realistic picture of a curtain that Zeuxis, proud of the verdict of the birds, requested that the curtain should now be drawn and the picture displayed; and when he realized his mistake, with a modesty that did him honour he yielded up the prize, saying that whereas he had deceived birds Parrhasius had deceived him, an artist.",
        "source": "Pliny the Elder, Natural History, Book XXXV, trans. Rackham, Jones & Eichholz, via Wikisource.",
        "href": "https://en.wikisource.org/wiki/Natural_History_(Rackham,_Jones,_%26_Eichholz)/Book_35"
      },
      {
        "category": "literary",
        "title": "Ovid, Metamorphoses, Book I (invocation)",
        "excerpt": "My soul is wrought to sing of forms transformed to bodies new and strange! Immortal Gods inspire my heart, for ye have changed yourselves and all things you have changed!",
        "source": "Ovid, Metamorphoses, Book 1, lines 1-4, trans. Brookes More, Perseus Digital Library, Tufts University.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0028:book=1:card=1"
      },
      {
        "category": "literary",
        "title": "Samuel Taylor Coleridge, 'Kubla Khan; or, A Vision in a Dream'",
        "excerpt": "In Xanadu did Kubla Khan / A stately pleasure-dome decree: / Where Alph, the sacred river, ran / Through caverns measureless to man / Down to a sunless sea.",
        "source": "Samuel Taylor Coleridge, 'Kubla Khan,' in The Hundred Best Poems (Lyrical) in the English Language, Second Series, via Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_Hundred_Best_Poems_(lyrical)_in_the_English_language_-_second_series/Kubla_Khan"
      },
      {
        "category": "artistic",
        "title": "Camille Saint-Saëns, 'Aquarium' from The Carnival of the Animals",
        "excerpt": "Shimmering runs on flutes, glass harmonica and strings ripple like light through water, suspending the listener in a slow, weightless drift. Rising figures hang in the air as though schools of luminous fish were floating past the glass. The effect is hushed and uncanny, a dream of creatures held motionless in a gleaming, otherworldly tank.",
        "source": "Camille Saint-Saëns, Le carnaval des animaux, No. 7 'Aquarium' (1886), IMSLP / Petrucci Music Library.",
        "href": "https://imslp.org/wiki/Le_carnaval_des_animaux_(Saint-Sa%C3%ABns,_Camille)"
      },
      {
        "category": "artistic",
        "title": "Hieronymus Bosch, The Garden of Earthly Delights",
        "excerpt": "Across three panels Bosch crowds a hallucinatory paradise where nude figures ride oversized birds, giant fish glide through open air, and translucent bubbles and fruit-pods cradle tiny human forms. Hybrid beasts and impossible creatures sprout from ponds and shells, each rendered with obsessive, jewel-like precision. The whole teeming world floats free of ordinary scale and gravity, a waking dream that turns nature into marvel and menace.",
        "source": "Hieronymus Bosch, The Garden of Earthly Delights, oil on oak panel, c. 1490-1500, Museo del Prado, Madrid; via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:The_Garden_of_Earthly_Delights_by_Hieronymus_Bosch.jpg",
        "image": {
          "src": "/covers/veks-van-hillik-surreal-murals--art.png",
          "alt": "A three-panel Renaissance triptych densely packed with tiny nude figures, oversized birds and fish, translucent spheres, and fantastical hybrid creatures set in a lurid green-and-pink dreamscape.",
          "credit": "Hieronymus Bosch, The Garden of Earthly Delights, c. 1490-1500, Museo del Prado. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 26
  },
  {
    "slug": "iran-khamenei-funeral-tehran",
    "headline": "Vast crowds fill Tehran for the state funeral of Iran's late Supreme Leader Ayatollah Ali Khamenei",
    "overview": "Enormous crowds packed the streets of Tehran on July 6, 2026, for the state funeral procession of Ayatollah Ali Khamenei, Iran's supreme leader for more than three decades, who has died. State media declared days of official mourning as senior clerics and foreign delegations gathered, while the question of succession remained unresolved and no new supreme leader appeared in public. Some mourners chanted for vengeance against the United States and its president.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMitgFBVV95cUxPRlo0bjVlblZDZXpkNk16SnJBalNCaTlzcjB3U3JfbWQzRnJFamVsVkJTazBONFBJVU5kVnNKc05YQ0JvT3VMWU82OGZ1VmFNMGdla2dxclhDTXdhUTY5WHpOVFBjMUdCR2VDa25aRlo1TUVfX0w3TUFLSnVzdkcwUmRFOXlxcTVCbHF4MTFTMTFZS1RRR1ZKTEk5c180cS1VYXlDalc2TDlYbHhQdDN2R1pIUVk0dw?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cdejj44kl70o"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-06",
    "image": {
      "src": "/covers/iran-khamenei-funeral-tehran.png",
      "alt": "Dense crowds of mourners dressed in black fill a Tehran street during a funeral procession",
      "credit": "BBC"
    },
    "edition": "Evening Edition · 6 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Funeral of Julius Caesar",
        "excerpt": "Notice of his funeral having been solemnly proclaimed, a pile was erected in the Campus Martius, near the tomb of his daughter Julia; and before the Rostra was placed a gilded tabernacle, on the model of the temple of Venus Genitrix... It being considered that the whole day would not suffice for carrying the funeral oblations in solemn procession before the corpse, directions were given for every one, without regard to order, to carry them from the city into the Campus Martius, by what way they pleased. In this public mourning there joined a multitude of foreigners, expressing their sorrow according to the fashion of their respective countries; but especially the Jews, who for several nights together frequented the spot where the body was burnt.",
        "source": "Suetonius, The Lives of the Twelve Caesars: Divus Julius (Julius Caesar), chapter 84, trans. Alexander Thomson, rev. T. Forester; Perseus Digital Library, Tufts University",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0132:life%3Djul.:chapter%3D84"
      },
      {
        "category": "historical",
        "title": "The Funeral of the Emperor Augustus",
        "excerpt": "The procession was to be conducted through 'the gate of triumph,' on the motion of Gallus Asinius; the titles of the laws passed, the names of the nations conquered by Augustus were to be borne in front... The Senators unanimously exclaimed that the body ought to be borne on their shoulders to the funeral pile. On the day of the funeral soldiers stood round as a guard, amid much ridicule from those who had either themselves witnessed or who had heard from their parents of the famous day when slavery was still something fresh.",
        "source": "Tacitus, The Annals, Book I, chapters 8-9, trans. Alfred John Church and William Jackson Brodribb; Perseus Digital Library, Tufts University",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0078:book%3D1:chapter%3D8"
      },
      {
        "category": "literary",
        "title": "Mark Antony's Funeral Oration in Shakespeare's Julius Caesar (Act III, Scene II)",
        "excerpt": "Friends, Romans, countrymen, lend me your ears; I come to bury Caesar, not to praise him. The evil that men do lives after them; The good is oft interred with their bones; So let it be with Caesar. The noble Brutus Hath told you Caesar was ambitious.",
        "source": "William Shakespeare, The Tragedy of Julius Caesar, Act III, Scene II (Antony's oration over Caesar's body); Project Gutenberg",
        "href": "https://www.gutenberg.org/files/1522/1522-h/1522-h.htm"
      },
      {
        "category": "literary",
        "title": "Shelley's Adonais: An Elegy on the Death of John Keats",
        "excerpt": "I weep for Adonais—he is dead! O, weep for Adonais! though our tears Thaw not the frost which binds so dear a head! And thou, sad Hour, selected from all years To mourn our loss, rouse thy obscure compeers, And teach them thine own sorrow, say: 'With me Died Adonais; till the Future dares Forget the Past, his fate and fame shall be An echo and a light unto eternity!'",
        "source": "Percy Bysshe Shelley, Adonais: An Elegy on the Death of John Keats (1821), stanza 1; Wikisource",
        "href": "https://en.wikisource.org/wiki/Adonais"
      },
      {
        "category": "artistic",
        "title": "Ilya Repin, Religious Procession in Kursk Province",
        "excerpt": "Repin's vast canvas floods the frame with a heaving multitude winding across a dusty hillside behind sacred banners and a gilded icon, the whole society pressed into a single surging column of the devout, the grieving, and the curious. Peasants, clergy, mounted officials, and the poor jostle under a harsh summer light, and the sheer density of bodies conveys the overwhelming force of a crowd moved by collective religious fervor. It reads as a portrait of a nation on the march, an image of mass public feeling that mirrors streets filled to bursting with mourners.",
        "source": "Ilya Repin, Religious Procession in Kursk Province (Крестный ход в Курской губернии), 1880-1883, oil on canvas, State Tretyakov Gallery, Moscow; via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Ilya_Repin_-_%D0%9A%D1%80%D0%B5%D1%81%D1%82%D0%BD%D1%8B%D0%B9_%D1%85%D0%BE%D0%B4_%D0%B2_%D0%9A%D1%83%D1%80%D1%81%D0%BA%D0%BE%D0%B9_%D0%B3%D1%83%D0%B1%D0%B5%D1%80%D0%BD%D0%B8%D0%B8_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/iran-khamenei-funeral-tehran--art.png",
          "alt": "A huge crowd of people winds across a sunlit, dusty hillside in a religious procession, carrying banners and a gilded icon; peasants, clergy, and mounted officials press together in a dense column under a hazy sky.",
          "credit": "Ilya Repin, Religious Procession in Kursk Province, 1880-1883, State Tretyakov Gallery, Moscow. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Chopin, Marche funèbre (Funeral March), Piano Sonata No. 2 in B-flat minor, Op. 35",
        "excerpt": "The third movement of Chopin's Second Piano Sonata unfolds as the most famous funeral march ever written, its slow, tolling bass and heavy dotted tread evoking a solemn cortege advancing step by step. A tender, consoling middle section offers a moment of luminous grief before the pitiless, dirge-like tread returns to close the procession. It has become the universal music of state mourning, sounding wherever a nation walks its leader to the grave.",
        "source": "Frédéric Chopin, Piano Sonata No. 2 in B-flat minor, Op. 35 ('Funeral March'), third movement, Marche funèbre: Lento (composed 1837-1839); IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Piano_Sonata_No.2,_Op.35_(Chopin,_Fr%C3%A9d%C3%A9ric)"
      }
    ],
    "rank": 27
  },
  {
    "slug": "microsoft-4800-ai-layoffs",
    "headline": "Microsoft cuts 4,800 jobs, joining a wave of AI-driven technology layoffs",
    "overview": "Microsoft said on July 6, 2026, that it would cut about 4,800 jobs, becoming the latest technology company to trim its workforce as the industry pours spending into artificial intelligence. The reductions add to a broader wave of AI-era layoffs across the sector. Microsoft framed the cuts as part of a shift of resources toward its AI products and infrastructure.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMivAFBVV95cUxQWjdJSlpLcUl6ZjVHNk80NEd0VFVkWjJzUTJPYUNBUjFjUjQySmFFblBYRFFKemFZR3FER2FuUlVUR2UzMXV5bnJ4VDY1R2Rpb3FpX2xlelMyMzJUd0tySzJmRTlDeUl1ZU82a3JsYjUtNVUtLXVic09jdktfZWpzSjgwOW5uakQxYXdFRlk3NDd1ZEI5WktfT0pZdmNyVjlyNkVqR3VGVWF4Ums5TExLRUxUT3FPTnVZXzNETw?oc=5"
      },
      {
        "name": "Google News",
        "href": "https://news.google.com/rss/search?q=Microsoft%204800%20job%20cuts%20AI%20layoffs&hl=en-US&gl=US&ceid=US:en"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-06",
    "image": {
      "src": "/covers/microsoft-4800-ai-layoffs.png",
      "alt": "Rows of empty desks and darkened workstations in a deserted open-plan office at dusk",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 6 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Lord Byron's maiden speech against the Frame Work Bill (1812)",
        "excerpt": "By the adoption of one species of Frame in particular, one man performed the work of many, and the superfluous labourers were thrown out of employment.",
        "source": "George Gordon, Lord Byron, speech in the House of Lords, 27 February 1812 (Hansard)",
        "href": "https://api.parliament.uk/historic-hansard/lords/1812/feb/27/frame-work-bill"
      },
      {
        "category": "historical",
        "title": "Karl Marx on machinery and modern industry, Capital (1867)",
        "excerpt": "The machine, which is the starting point of the industrial revolution, supersedes the workman, who handles a single tool, by a mechanism operating with a number of similar tools.",
        "source": "Karl Marx, Das Kapital, Vol. I, Chapter 15 'Machinery and Modern Industry' (Moore & Aveling translation, 1906)",
        "href": "https://en.wikisource.org/wiki/Das_Kapital_(Moore,_1906)/Chapter_15"
      },
      {
        "category": "literary",
        "title": "Karel Capek, R.U.R. (Rossum's Universal Robots) (1920)",
        "excerpt": "One Robot can replace two and a half workmen. The human machine, Miss Glory, was terribly imperfect. It had to be removed sooner or later.",
        "source": "Karel Capek, R.U.R., Act I (translated by Paul Selver and Nigel Playfair)",
        "href": "https://www.gutenberg.org/ebooks/59112"
      },
      {
        "category": "literary",
        "title": "Charles Dickens, Hard Times (1854): Coketown",
        "excerpt": "the piston of the steam-engine worked monotonously up and down, like the head of an elephant in a state of melancholy madness.",
        "source": "Charles Dickens, Hard Times, Book the First, Chapter V 'The Key-note'",
        "href": "https://www.gutenberg.org/files/786/786-h/786-h.htm"
      },
      {
        "category": "artistic",
        "title": "Hubert von Herkomer, 'On Strike' (1891)",
        "excerpt": "A monumental, life-size study of industrial hardship: a labouring man stands in a tenement doorway, arms folded and jaw set, refusing the work stoppage's cost as his wife slumps against him with an infant and a frightened child clings at their side. Painted almost entirely in sombre browns, its single note of colour is the baby's red shawl. Herkomer turns the human price of industrial conflict into a stark, dignified icon of workers left without wages.",
        "source": "Hubert von Herkomer, oil on canvas, Royal Academy of Arts, London (Diploma Work, 1891)",
        "href": "https://commons.wikimedia.org/wiki/File:Hubert_von_Herkomer_1891~_-_On_strike.jpg",
        "image": {
          "src": "/covers/microsoft-4800-ai-layoffs--art.png",
          "alt": "A stern out-of-work labourer stands in a doorway with folded arms while his wife, holding a baby in a red shawl, leans against him and a young child clings to her skirts.",
          "credit": "Hubert von Herkomer, On Strike, 1891, Royal Academy of Arts, London. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Arthur Honegger, 'Pacific 231' (Mouvement symphonique No. 1) (1923)",
        "excerpt": "Honegger's orchestral portrait of a steam locomotive is the sound of the machine age itself: from a heavy, straining stillness the music gathers weight, wheels turning faster until the whole ensemble roars along at full speed, then brakes to a halt. It celebrates and dramatises raw mechanical power, capturing both the exhilaration and the sheer, indifferent force of the machine that so unsettled its human contemporaries.",
        "source": "Arthur Honegger, Pacific 231 (Mouvement symphonique No. 1), H. 53, full score",
        "href": "https://imslp.org/wiki/Pacific_231,_H.53_(Honegger,_Arthur)"
      }
    ],
    "rank": 28
  },
  {
    "slug": "ukraine-drones-russia-refinery-strike",
    "headline": "Ukrainian drones strike Russia's largest oil refinery in one of the deepest strikes of the war",
    "overview": "Ukrainian long-range drones struck Russia's largest oil refinery and an oil terminal at Vysotsk on July 6, 2026, in one of the deepest strikes inside Russian territory since the war began. The attacks set fuel installations ablaze far behind the front line. They form part of a sustained campaign targeting the refineries and terminals that supply Russia's war effort.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMivgFBVV95cUxPUFBhRkxacmxmTXloVDZNTThZcE5DbGg1R0xsd1dscnB0bHlWVHo5c0tiZzluaHhpT2l3WVl1UnI2alFkNktseUtFdXFSS28xMDRHbmM1X3dFa3VIRGFHVlk1MjFKc2dOdEhaRU5HUTBuRUMySjd0bmtTN2JRaWFpSTUwVEttakkwU3hIamsxUTg0c1dTRWVZbEZhMWJ0SFkzdi1tSHpZTVYyblN0ckd6MjJ3VEtLY1pJR3RpT3h3?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMivgFBVV95cUxNdG5TUDRzaWo4ZXJ3TWpGV0Q2WjczRlRIdjBlZDl1bGljdzctTEQyendRNE5FRTVOVU5hQ2lydmtGOXoxWWFMWVVmd0VVbzRZdW1hcjBRNnZjWlVVN0EyRHpFazhfSmFRazczXzNEM1NXMHI5UEdyMW1QejktamVUc0dYZmRmdm1hcWhVZEpDaUpQcTlXT2NnNFFtN3ljN1ZxdkhCRmpnVVRuenpRbFBoYXdhYzRoY2NnMllQSFFB?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-06",
    "image": {
      "src": "/covers/ukraine-drones-russia-refinery-strike.png",
      "alt": "A large oil refinery at night with a tall flare stack and storage tanks burning bright orange against a black sky",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 6 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Greek fire on the walls of Dyrrachium",
        "excerpt": "The readily combustible rosin is collected from the pine and other similar evergreen trees and mixed with sulphur. Then it is introduced into reed-pipes and blown by the man using it with a strong continuous breath and at the other end fire is applied to it and it bursts into flame and falls like a streak of lightning on the faces of the men opposite.",
        "source": "Anna Komnene, The Alexiad, Book XIII (trans. Elizabeth A. S. Dawes, 1928), Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Alexiad/Book_XIII"
      },
      {
        "category": "historical",
        "title": "The burning of Atlanta on the March to the Sea",
        "excerpt": "Behind us lay Atlanta, smouldering and in ruins, the black smoke rising high in air, and hanging like a pall over the ruined city.",
        "source": "William T. Sherman, Memoirs of General W. T. Sherman (1875), Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/4361/pg4361.txt"
      },
      {
        "category": "literary",
        "title": "The burning of Troy (Virgil's Aeneid, Book II)",
        "excerpt": "The palace of Deiphobus ascends / In smoky flames, and catches on his friends. / Ucalegon burns next: the seas are bright / With splendour not their own, and shine with Trojan light.",
        "source": "Virgil, The Aeneid, Book II (trans. John Dryden), Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/228/pg228.txt"
      },
      {
        "category": "literary",
        "title": "Fire against the Greek ships (Homer's Iliad, Book XV)",
        "excerpt": "Haste, bring the flames! that toil of ten long years / Is finished; and the day desired appears! / This happy day with acclamations greet, / Bright with destruction of yon hostile fleet.",
        "source": "Homer, The Iliad, Book XV (trans. Alexander Pope), Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/6130/pg6130.txt"
      },
      {
        "category": "artistic",
        "title": "J. M. W. Turner, The Burning of the Houses of Lords and Commons, 16 October 1834",
        "excerpt": "Turner turns a disaster into a spectacle of pure light: a wall of orange-white flame erupts from the Palace of Westminster and pours its glare across the Thames, dissolving stone into fire. The crowds on the bridge are mere smudges beneath a sky torn open by heat, the far shore burning brighter than any daylight. Reach and ruin become sublime, the enemy of the buildings being the fire itself, unstoppable and radiant.",
        "source": "J. M. W. Turner, 1834-35, oil on canvas, Cleveland Museum of Art (accession 1942.647), via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Joseph_Mallord_William_Turner_-_The_Burning_of_the_Houses_of_Lords_and_Commons,_16_October_1834_-_1942.647_-_Cleveland_Museum_of_Art.jpg",
        "image": {
          "src": "/covers/ukraine-drones-russia-refinery-strike--art.png",
          "alt": "A night scene of a great fire consuming the Houses of Parliament, brilliant orange and yellow flames and smoke billowing into a dark sky, their glare reflected across the River Thames with crowds of onlookers massed on the bridge in silhouette.",
          "credit": "Joseph Mallord William Turner, The Burning of the Houses of Lords and Commons, 16 October 1834 (1834-35), oil on canvas, 92 x 123 cm, Cleveland Museum of Art, accession 1942.647. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Pyotr Ilyich Tchaikovsky, The Year 1812, festival overture, Op. 49",
        "excerpt": "Tchaikovsky's overture stages an invasion of Russia in sound: the French anthem advances in blazing brass until it is answered, and finally overwhelmed, by Russian hymn, tolling bells, and the roar of live cannon fire. The music is built on the idea of a homeland struck deep and then striking back, its climax a controlled explosion of artillery over a triumphant chorale. Few concert works so literally weaponize fire and detonation as instruments of the orchestra.",
        "source": "Pyotr Ilyich Tchaikovsky, The Year 1812, festival overture, Op. 49 (1880), IMSLP",
        "href": "https://imslp.org/wiki/1812_Overture,_Op.49_(Tchaikovsky,_Pyotr)"
      }
    ],
    "rank": 29
  },
  {
    "slug": "hamas-dissolves-gaza-government",
    "headline": "Hamas dissolves its Gaza government and moves to hand power to a UN-backed committee",
    "overview": "Hamas announced on July 6, 2026, that it was dissolving its government in Gaza and preparing to transfer power to a UN-backed committee. The move came as the group pressed for progress on a stalled peace plan for the territory. It marked a significant step away from the direct administrative control Hamas had held over Gaza.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMivgFBVV95cUxOTFo2LTlqNk9aYUFPVWY4LWtLZFVranB4RHp3SEJNaXd2VzNjWUtWUUs0TkktQnVET2N6YndZMDBzY2MwYXQ0NnVmU0lmUC1Ga3dRcWZXSXZQaVBxdWRFM3VtNUktWEZiMFA4RUNERmJoRHFOUFRoZ1hDUjlBdnhBNnJIZUdWdlRLYVRoSkcxRkdmZnV4dDc2Ykt5cmI4R3JhNmRrMlhoeTRiYUkzVGhtemRsbXNXcjFDVlV3bS1n?oc=5"
      },
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMiqAFBVV95cUxNQW81TnNaY1YwT3NlaUtUODNiS1hzU3pTbTdGNUlhWl9DQ0M3NHllS2R2bDRCZGpRWllYS3loRDZ6RklsbHRiYS1EbFBXRnBxUVpsNlhaVDJzX1FON2VPU0NVTHd6bXhfQXpsaWZXdmx6a00xLURKNUR3QUpUcDVhay1FUnJ3ZFVnUGxoRzkxWmVHSm5aSS0zN25EUXZ6RjhJT1ZjRjlJQlY?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-06",
    "image": {
      "src": "/covers/hamas-dissolves-gaza-government.png",
      "alt": "An empty government council chamber with rows of vacant seats and a bare rostrum in cold morning light",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 6 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Cincinnatus lays down the dictatorship (458 BC), as told by Livy",
        "excerpt": "Quinctius resigned on the sixteenth day the dictatorship which had been conferred upon him for six months.",
        "source": "Livy, The History of Rome, Book 3, chapter 29 (trans. Rev. Canon Roberts, Everyman's Library, 1912), Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0026:book=3:chapter=29"
      },
      {
        "category": "historical",
        "title": "Sulla abdicates the Roman dictatorship (79 BC), as told by Appian",
        "excerpt": "This act seems wonderful to me--that Sulla should have been the first, and till then the only one, to abdicate such vast power without compulsion, not to sons (like Ptolemy in Egypt, or Ariobarzanes in Cappadocia, or Seleucus in Syria), but to the very people over whom he had tyrannized.",
        "source": "Appian, The Civil Wars, Book 1, chapter 12 (trans. Horace White, Macmillan, 1899), Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0232:book=1:chapter=12"
      },
      {
        "category": "literary",
        "title": "King Richard II unmakes himself, Act IV, Scene i",
        "excerpt": "Now mark me how I will undo myself: I give this heavy weight from off my head, And this unwieldy sceptre from my hand, The pride of kingly sway from out my heart; With mine own tears I wash away my balm, With mine own hands I give away my crown, With mine own tongue deny my sacred state,",
        "source": "William Shakespeare, King Richard II, Act IV, Scene i (Project Gutenberg eBook)",
        "href": "https://www.gutenberg.org/cache/epub/1512/pg1512.txt"
      },
      {
        "category": "literary",
        "title": "Prospero renounces his power in The Tempest, Act V, Scene i",
        "excerpt": "But this rough magic I here abjure; and, when I have required Some heavenly music,--which even now I do,--To work mine end upon their senses, that This airy charm is for, I'll break my staff, Bury it certain fathoms in the earth, And deeper than did ever plummet sound I'll drown my book.",
        "source": "William Shakespeare, The Tempest, Act V, Scene i (Project Gutenberg eBook)",
        "href": "https://www.gutenberg.org/cache/epub/23042/pg23042.txt"
      },
      {
        "category": "artistic",
        "title": "John Trumbull, General George Washington Resigning His Commission (1824)",
        "excerpt": "The victorious commander stands alone at the center of the hall, spotlit in dark uniform, extending a document to the seated Congress rather than seizing the moment for himself. Having won the war, Washington gives back the sword and the authority that came with it, choosing to become a private citizen again. Trumbull frames the voluntary surrender of power as the true climax of the Revolution.",
        "source": "John Trumbull, General George Washington Resigning His Commission (1824), oil on canvas, United States Capitol Rotunda, Washington, D.C.; File page on Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:General_George_Washington_Resigning_his_Commission.jpg",
        "image": {
          "src": "/covers/hamas-dissolves-gaza-government--art.png",
          "alt": "Painting of George Washington in military uniform standing before the seated members of the Continental Congress, handing over a document as he resigns his commission.",
          "credit": "John Trumbull (1756-1843), General George Washington Resigning His Commission, completed 1824, oil on canvas, 365.76 x 548.64 cm, United States Capitol Rotunda. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Edward Elgar, 'Nimrod' from the Enigma Variations, Op. 36 (1899)",
        "excerpt": "A slow, swelling Adagio that begins as a hush and rises to a broad, valedictory climax before subsiding again. The music has become a byword for solemn leave-taking and remembrance, played at funerals and moments of national mourning. Its measured surrender of tension into stillness mirrors the grave act of a power laying down what it has held.",
        "source": "Edward Elgar, Variations on an Original Theme 'Enigma', Op. 36 (Variation IX, 'Nimrod'), full score, London: Novello & Co., 1899; IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Variations_on_an_Original_Theme_'Enigma',_Op.36_(Elgar,_Edward)"
      }
    ],
    "rank": 30
  },
  {
    "slug": "sri-lanka-prison-riots-deaths",
    "headline": "Riots at a Sri Lankan prison kill at least 26 and injure more than 100",
    "overview": "Riots erupted inside a Sri Lankan prison on July 6, 2026, leaving at least 26 people dead and more than 100 injured as clashes escalated between inmates and guards. Most of those killed were prisoners, authorities said. It was one of the deadliest incidents at a Sri Lankan detention facility in years.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cvg77klne3yo"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMivAFBVV95cUxQT09OSHBGN210dlVmdDA4d2M1clY4S19YamEyeE1xWTNRMU5zSnNMY1RUYWh5ZjhHRV9IakprRmhvZVZwSGUtYjg4eEVlelJkdF9PYVZxMnhWai1pZExzMU5Cb2tGMHNmN0lGWmVOZHlqWS15N0s5TlJkY3Fjal9USi1nc2M1UjdaRUozZ1NWMDktWEVSSmxGcTRaWFNQOTR2WEpSR0JzS0lnZ0k1ajJVa3NGSmxEQU9DNEJWUw?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-06",
    "image": {
      "src": "/covers/sri-lanka-prison-riots-deaths.png",
      "alt": "A high perimeter wall topped with razor wire around a prison compound under a grey sky",
      "credit": "BBC"
    },
    "edition": "Evening Edition · 6 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Fall of the Bastille (1789), from Thomas Carlyle's The French Revolution: A History",
        "excerpt": "Sinks the drawbridge,—Usher Maillard bolting it when down; rushes-in the living deluge: the Bastille is fallen! Victoire! La Bastille est prise!",
        "source": "Thomas Carlyle, The French Revolution: A History (1837), Book 1.5, ch. VI–VII, via Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/1301/pg1301.txt"
      },
      {
        "category": "historical",
        "title": "The Revolt of Spartacus, from Plutarch's Life of Crassus (ch. 8)",
        "excerpt": "A certain Lentulus Batiatus had a school of gladiators at Capua, most of whom were Gauls and Thracians. Through no misconduct of theirs, but owing to the injustice of their owner, they were kept in close confinement and reserved for gladiatorial combats.",
        "source": "Plutarch, Life of Crassus 8, trans. Bernadotte Perrin (Loeb, 1916), Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:2008.01.0038:chapter%3D8"
      },
      {
        "category": "literary",
        "title": "The Prisoner of Chillon, by Lord Byron",
        "excerpt": "And in each pillar there is a ring,\n  And in each ring there is a chain;\nThat iron is a cankering thing,\n  For in these limbs its teeth remain,\nWith marks that will not wear away,\nTill I have done with this new day,",
        "source": "George Gordon, Lord Byron, The Prisoner of Chillon (1816), in The Works of Lord Byron, Vol. 4, Project Gutenberg",
        "href": "https://www.gutenberg.org/files/20158/20158-h/20158-h.htm"
      },
      {
        "category": "literary",
        "title": "The Ballad of Reading Gaol, by Oscar Wilde",
        "excerpt": "Dear Christ! the very prison walls\n  Suddenly seemed to reel,\nAnd the sky above my head became\n  Like a casque of scorching steel;\nAnd, though I was a soul in pain,\n  My pain I could not feel.",
        "source": "Oscar Wilde, The Ballad of Reading Gaol (1897), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/301/301-h/301-h.htm"
      },
      {
        "category": "artistic",
        "title": "The Round Tower (plate III), from Le Carceri d'Invenzione (Imaginary Prisons), by Giovanni Battista Piranesi",
        "excerpt": "Piranesi's etched dungeons are vast, windowless vaults where staircases climb toward nothing and chains, ropes, and instruments of torture hang from monumental stone arches. Tiny human figures are dwarfed by the crushing architecture, made to feel forever confined within walls that have no exit. The Round Tower distills the nightmare of captivity into pure, echoing space.",
        "source": "Giovanni Battista Piranesi, Le Carceri d'Invenzione, plate III, 'The Round Tower', second edition, 1761 (etching), Princeton University Art Museum, via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Giovanni_Battista_Piranesi_-_Le_Carceri_d'Invenzione_-_Second_Edition_-_1761_-_03_-_The_Round_Tower.jpg",
        "image": {
          "src": "/covers/sri-lanka-prison-riots-deaths--art.png",
          "alt": "An etching of a vast, shadowy imaginary prison interior with a great round tower, soaring stone arches, and staircases, with small figures dwarfed by the architecture.",
          "credit": "Giovanni Battista Piranesi (1720–1778), Le Carceri d'Invenzione, plate III, 'The Round Tower', second edition, 1761. Etching, 54.8 × 41.5 cm. Princeton University Art Museum. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Prisoners' Chorus ('O welche Lust'), from Beethoven's opera Fidelio, Op. 72",
        "excerpt": "O welche Lust, in freier Luft den Atem leicht zu heben! Nur hier, nur hier ist Leben, der Kerker eine Gruft.",
        "source": "Ludwig van Beethoven, Fidelio, Op. 72 (1805/1814), Act I Prisoners' Chorus; full score at the International Music Score Library Project (IMSLP)",
        "href": "https://imslp.org/wiki/Fidelio,_Op.72_(Beethoven,_Ludwig_van)"
      }
    ],
    "rank": 31
  },
  {
    "slug": "super-typhoon-bavi-guam-landfall",
    "headline": "Super Typhoon Bavi makes landfall near Guam, battering US Pacific territories with catastrophic winds",
    "overview": "Super Typhoon Bavi made landfall near Guam on July 6, 2026, lashing US Pacific territories with catastrophic winds and forcing residents to shelter. Forecasters warned of destructive gusts, heavy rain and dangerous storm surge across the islands. The powerful storm swept through the western Pacific as one of the season's strongest.",
    "genre": "Climate",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cr7xpgx50jxo"
      },
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMiogFBVV95cUxOd2pTUzEwcjJ3Q3p3ci1Ec2VvYnVDb2JXd0hFZzQ4VGtLLWdfNmtHSVBRZUhrX3hGNkgwSVp6QXlqb1Bjc3hhMTU2MUQ1SUI3ZVdQOWFYRWtfS3l5ZjZhMFpJcGpBaVNTUXltajUya0dIVWYyUXliWnFzdTFab0VpMlNZZFJjOU9kVXBSRUhSaGpIN1dPNy1oaGZ6UnJUS0xpcmc?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-06",
    "image": {
      "src": "/covers/super-typhoon-bavi-guam-landfall.png",
      "alt": "Palm trees bent almost double as storm winds and rain lash a coastline under a dark sky",
      "credit": "BBC"
    },
    "edition": "Evening Edition · 6 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Marco Polo on the storm that wrecked Kublai Khan's invasion fleet against Japan",
        "excerpt": "And it came to pass that there arose a north wind which blew with great fury, and caused great damage along the coasts of that Island, for its harbours were few. It blew so hard that the Great Kaan's fleet could not stand against it.",
        "source": "Marco Polo, The Travels of Marco Polo (Yule-Cordier translation), Vol. 2, Book Third, Ch. II-III (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/12410/12410-h/12410-h.htm"
      },
      {
        "category": "historical",
        "title": "Daniel Defoe's eyewitness account of the Great Storm of 1703",
        "excerpt": "And yet in this general Apprehension, no body durst quit their tottering Habitations; for whatever the Danger was within doors, 'twas worse without; the Bricks, Tiles, and Stones, from the Tops of the Houses, flew with such force, and so thick in the Streets, that no one thought fit to venture out, tho' their Houses were near demolish'd within.",
        "source": "Daniel Defoe, The Storm: Or, a Collection of the most Remarkable Casualties and Disasters which happen'd in the Late Dreadful Tempest (1704) (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/42234/42234-h/42234-h.htm"
      },
      {
        "category": "literary",
        "title": "The tempest that founders the ship in Shakespeare's The Tempest, Act I, Scene 1",
        "excerpt": "Blow, till thou burst thy wind, if room enough! ... All lost! to prayers, to prayers! all lost!",
        "source": "William Shakespeare, The Tempest, Act I, Scene 1 (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/23042/23042-h/23042-h.htm"
      },
      {
        "category": "literary",
        "title": "Poseidon raises the storm that shatters Odysseus's raft in Homer's Odyssey, Book V",
        "excerpt": "Thereon he gathered his clouds together, grasped his trident, stirred it round in the sea, and roused the rage of every wind that blows till earth, sea, and sky were hidden in cloud, and night sprang forth out of the heavens. Winds from East, South, North, and West fell upon him all at the same time, and a tremendous sea got up, so that Ulysses' heart began to fail him.",
        "source": "Homer, The Odyssey, Book V (Samuel Butler translation) (Wikisource)",
        "href": "https://en.wikisource.org/wiki/The_Odyssey_(Butler)/Book_V"
      },
      {
        "category": "artistic",
        "title": "The Ninth Wave by Ivan Aivazovsky (1850)",
        "excerpt": "Aivazovsky's vast seascape shows a handful of shipwrecked survivors clinging to a splintered mast as a mountainous wave rears against a sunrise-lit sky. The 'ninth wave' of sailors' lore, the most destructive of a series, embodies nature's overwhelming power and the fragile hope of survival amid the fury of wind and sea.",
        "source": "Ivan Konstantinovich Aivazovsky, The Ninth Wave, 1850, oil on canvas, State Russian Museum, Saint Petersburg (Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Aivazovsky,_Ivan_-_The_Ninth_Wave.jpg",
        "image": {
          "src": "/covers/super-typhoon-bavi-guam-landfall--art.png",
          "alt": "A group of shipwrecked survivors cling to a broken mast on a stormy sea as an enormous wave towers over them beneath a glowing sunrise sky.",
          "credit": "Ivan Konstantinovich Aivazovsky (1817-1900), The Ninth Wave, 1850, oil on canvas, State Russian Museum, Saint Petersburg. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "The 'Thunderstorm' (Gewitter, Sturm) from Beethoven's Symphony No. 6 'Pastoral', Op. 68",
        "excerpt": "In the fourth movement of his Pastoral Symphony, Beethoven unleashes a full orchestral tempest: distant thunder in the low strings swells into shrieking piccolo, cracking timpani, and driving rain across the whole ensemble. The storm rages at overwhelming force before subsiding into calm, a musical image of nature's fury spending itself upon the land.",
        "source": "Ludwig van Beethoven, Symphony No. 6 in F major, Op. 68 'Pastoral', 4th movement (Allegro, 'Gewitter, Sturm') (IMSLP / Petrucci Music Library)",
        "href": "https://imslp.org/wiki/Symphony_No.6,_Op.68_(Beethoven,_Ludwig_van)"
      }
    ],
    "rank": 32
  },
  {
    "slug": "terawulf-anthropic-data-center-lease",
    "headline": "TeraWulf signs a $19 billion deal to lease AI data-center capacity to Anthropic",
    "overview": "Data-center operator TeraWulf agreed on July 6, 2026, to a roughly $19 billion, multi-year deal to lease computing capacity to the AI company Anthropic. The agreement, one of the largest of its kind, sent TeraWulf's shares sharply higher. It underscored the vast physical infrastructure being built to power artificial intelligence.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMirAFBVV95cUxOVDl4N3FZenJYeGFlSUY2QkVFMlV3eHNxTWlHdzVJTlFoN0FMejNyVjZXMHZ2ek1Tai1rMHF5LU9ZdFgtVHd3ZnU4N2FFY3hlazNnUUxGTE9tRnNxSnhIVmlVYjJUZ2w1N2gxcVhtcVozamxkX2JqYTJvVzliNGtOejlURDZXZTBBQTRoa05PZzB5MmNHX25UTV9KNF9KYVRKbFFTSjRhUlBUcm5u?oc=5"
      },
      {
        "name": "Google News",
        "href": "https://news.google.com/rss/search?q=TeraWulf%20Anthropic%20data%20center%20lease&hl=en-US&gl=US&ceid=US:en"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-06",
    "image": {
      "src": "/covers/terawulf-anthropic-data-center-lease.png",
      "alt": "Long rows of glowing server cabinets receding into shadow inside a vast dark data hall",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 6 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Tower of Babel (Genesis 11:4-9), King James Bible",
        "excerpt": "And they said, Go to, let us build us a city and a tower, whose top may reach unto heaven; and let us make us a name, lest we be scattered abroad upon the face of the whole earth. And the LORD said, Behold, the people is one, and they have all one language; and this they begin to do: and now nothing will be restrained from them, which they have imagined to do.",
        "source": "The Holy Bible, King James Version (1611), Genesis 11 — Project Gutenberg (eBook #10)",
        "href": "https://www.gutenberg.org/files/10/10-h/10-h.htm"
      },
      {
        "category": "historical",
        "title": "Henry Adams, \"The Dynamo and the Virgin\" (The Education of Henry Adams, 1900/1918)",
        "excerpt": "To him, the dynamo itself was but an ingenious channel for conveying somewhere the heat latent in a few tons of poor coal hidden in a dirty engine-house carefully kept out of sight; but to Adams the dynamo became a symbol of infinity. As he grew accustomed to the great gallery of machines, he began to feel the forty-foot dynamos as a moral force, much as the early Christians felt the Cross.",
        "source": "Henry Adams, The Education of Henry Adams, ch. XXV \"The Dynamo and the Virgin\" — Project Gutenberg (eBook #2044)",
        "href": "https://www.gutenberg.org/files/2044/2044-h/2044-h.htm"
      },
      {
        "category": "literary",
        "title": "Mary Shelley, Frankenstein; or, The Modern Prometheus (1818), ch. 5",
        "excerpt": "It was on a dreary night of November that I beheld the accomplishment of my toils. With an anxiety that almost amounted to agony, I collected the instruments of life around me, that I might infuse a spark of being into the lifeless thing that lay at my feet. I saw the dull yellow eye of the creature open; it breathed hard, and a convulsive motion agitated its limbs.",
        "source": "Mary Wollstonecraft Shelley, Frankenstein; or, The Modern Prometheus — Project Gutenberg (eBook #84)",
        "href": "https://www.gutenberg.org/files/84/84-h/84-h.htm"
      },
      {
        "category": "literary",
        "title": "Johann Wolfgang von Goethe, \"The Pupil in Magic\" (Der Zauberlehrling / The Sorcerer's Apprentice, 1797), trans. Edgar Alfred Bowring",
        "excerpt": "And now come, thou well-worn broom, / And thy wretched form bestir; / Thou hast ever served as groom, / So fulfil my pleasure, sir! ... Spirits raised by me / Vainly would I lay!",
        "source": "The Works of J. W. von Goethe, Volume 9, \"The Pupil in Magic,\" translated by Edgar Alfred Bowring — Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Works_of_J._W._von_Goethe/Volume_9/The_Pupil_in_Magic"
      },
      {
        "category": "artistic",
        "title": "Pieter Bruegel the Elder, The Tower of Babel (1563)",
        "excerpt": "Bruegel's vast unfinished tower spirals up into the clouds, its ochre tiers swarming with cranes, scaffolds, and tiny toiling figures, a whole city bent to a single colossal work. The lower stories already crack and lean even as construction races skyward, an image of overreaching ambition raised against the heavens.",
        "source": "Kunsthistorisches Museum, Vienna (inv. GG 1026); reproduction via Wikimedia Commons (Google Art Project)",
        "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_the_Elder_-_The_Tower_of_Babel_(Vienna)_-_Google_Art_Project_-_edited.jpg",
        "image": {
          "src": "/covers/terawulf-anthropic-data-center-lease--art.png",
          "alt": "A massive multi-tiered stone tower spiraling into the clouds, still under construction, with cranes and workers, beside a harbor town.",
          "credit": "Pieter Bruegel the Elder, The Tower of Babel (1563), oil on panel, Kunsthistorisches Museum, Vienna (inv. GG 1026). Image: Google Art Project, via Wikimedia Commons; public domain."
        }
      },
      {
        "category": "artistic",
        "title": "Paul Dukas, L'apprenti sorcier (The Sorcerer's Apprentice), 1897",
        "excerpt": "Dukas's symphonic scherzo after Goethe's ballad conjures the apprentice's stolen magic in sound: a hushed, muttered incantation, then the bassoon's lurching theme as the enchanted broom hauls bucket after bucket. The orchestra swells into an unstoppable flood of surging strings and hammering brass, a vivid parable of a powerful force summoned and then beyond its maker's command.",
        "source": "Paul Dukas, L'apprenti sorcier, \"Scherzo d'après une ballade de Goethe\" (1897) — full scores and parts at IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/L%27apprenti_sorcier_(Dukas,_Paul)"
      }
    ],
    "rank": 33
  },
  {
    "slug": "broadcom-apple-chip-deal-2031",
    "headline": "Broadcom and Apple extend their chip supply agreement through 2031",
    "overview": "Broadcom and Apple said on July 6, 2026, that they had extended their semiconductor supply agreement through 2031. The multi-year deal binds the two companies together over the wireless and custom chips at the heart of Apple's devices. It gives both sides long-term certainty in a tightly contested supply chain.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMinwFBVV95cUxNRDdILXhtQlA4NDBFbEd3NnhQS2c2ZjNQZnFqUEVncDVWc3FWaXNJTEFoV1BualZlbW53MjlrMDdxb01TVXFjZTMwVHZpREtXemwwX21DNGlmdDd5NlJVeU83QmIxMVBXSXFtS0N3Q3YyRGdBd2RsenpzSWtUR25DZVJqbXRXVkNrcjZWcE93QmRkOERWN09ESzZtNW8xN0E?oc=5"
      },
      {
        "name": "Google News",
        "href": "https://news.google.com/rss/search?q=Broadcom%20Apple%20chip%20supply%20deal%202031&hl=en-US&gl=US&ceid=US:en"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-06",
    "image": {
      "src": "/covers/broadcom-apple-chip-deal-2031.png",
      "alt": "A mirror-bright silicon wafer held under cool clean-room light, its surface catching a grid of microscopic circuitry",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 6 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Peace of Nicias sworn between Athens and Sparta (Thucydides, History of the Peloponnesian War, Book V)",
        "excerpt": "The Athenians and Lacedaemonians and their allies made a treaty, and swore to it, city by city, as follows... The treaty shall be binding for fifty years upon the Athenians and the allies of the Athenians, and upon the Lacedaemonians and the allies of the Lacedaemonians.",
        "source": "Thucydides, History of the Peloponnesian War, Book V, ch. 18 (Crawley translation, Wikisource)",
        "href": "https://en.wikisource.org/wiki/History_of_the_Peloponnesian_War/Book_5"
      },
      {
        "category": "historical",
        "title": "The fetial oath binding Rome and Alba Longa by treaty (Livy, Ab Urbe Condita, Book I)",
        "excerpt": "Hear, O Jupiter, hear! thou Pater Patratus of the people of Alba! Hear ye, too, people of Alba! As these conditions have been publicly rehearsed from first to last, from these tablets, in perfect good faith, and inasmuch as they have here and now been most clearly understood, so these conditions the People of Rome will not be the first to go back from. If they shall, in their national council, with false and malicious intent be the first to go back, then do thou, Jupiter, on that day, so smite the People of Rome, even as I here and now shall smite this swine, and smite them so much the more heavily, as thou art greater in power and might.",
        "source": "Livy, Ab Urbe Condita, Book I, ch. 24 (Rev. Canon Roberts translation, Perseus Digital Library)",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0026:book=1:chapter=24"
      },
      {
        "category": "literary",
        "title": "Shylock's sealed bond in Shakespeare's The Merchant of Venice",
        "excerpt": "Go with me to a notary, seal me there / Your single bond; and in a merry sport, / If you repay me not on such a day, / In such a place, such sum or sums as are / Express'd in the condition, let the forfeit / Be nominated for an equal pound / Of your fair flesh, to be cut off and taken / In what part of your body pleaseth me.",
        "source": "William Shakespeare, The Merchant of Venice, Act I, Scene III (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/1515/1515-h/1515-h.htm"
      },
      {
        "category": "literary",
        "title": "The everlasting covenant sworn between God and Abraham (Genesis 17, King James Version)",
        "excerpt": "And I will establish my covenant between me and thee and thy seed after thee in their generations for an everlasting covenant, to be a God unto thee, and to thy seed after thee.",
        "source": "The Bible, King James Version, Genesis 17:7 (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/8001/pg8001.txt"
      },
      {
        "category": "artistic",
        "title": "Gerard ter Borch, The Ratification of the Treaty of Münster (1648)",
        "excerpt": "Two former enemies stand crowded shoulder to shoulder in a paneled hall, hands raised over the sealed documents as the oath is sworn. The moment ter Borch records is not a battle but a binding: independence and mutual recognition fixed in ink and covenant, the whole fragile peace resting on the terms both sides have agreed to keep.",
        "source": "Gerard ter Borch, The Ratification of the Treaty of Münster, 1648, oil on copper, Rijksmuseum, Amsterdam (SK-A-405); file via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:The_Ratification_of_the_Treaty_of_Munster,_Gerard_Ter_Borch_(1648).jpg",
        "image": {
          "src": "/covers/broadcom-apple-chip-deal-2031--art.png",
          "alt": "A gathering of dignitaries in a paneled hall raising their hands to swear an oath over documents on a table.",
          "credit": "Gerard ter Borch, The Ratification of the Treaty of Münster (1648), Rijksmuseum, Amsterdam (SK-A-405). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "George Frideric Handel, Music for the Royal Fireworks, HWV 351 (1749)",
        "excerpt": "Handel composed this suite of stately, triumphant movements to crown the public celebrations of the peace that ended a long war between rival powers. Trumpets, horns, and drums sound the ceremonial pomp of two crowns bound by treaty, music written expressly to mark a hard-won accord sealed and made to last.",
        "source": "George Frideric Handel, Music for the Royal Fireworks, HWV 351 (1749), composed for the celebration of the Treaty of Aix-la-Chapelle; IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Music_for_the_Royal_Fireworks,_HWV_351_(Handel,_George_Frideric)"
      }
    ],
    "rank": 34
  },
  {
    "slug": "lockheed-ultra-maritime-acquisition",
    "headline": "Lockheed Martin agrees to buy Ultra Maritime for $3.45 billion",
    "overview": "Lockheed Martin agreed on July 6, 2026, to buy Ultra Maritime, a maker of anti-submarine and undersea-warfare systems, for $3.45 billion. The acquisition folds a specialist in naval sonar and sensors into the defence giant. It comes as governments increase spending on undersea security and maritime defence.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMirgFBVV95cUxPa3BFbXdYUXlLN0RGTVUyb0l6ZXRhbG5qYWp3MDhnNmhxcUdMMm1GUmU5YmVwM1ZFbC1mOHBtNS1MSXFSal9lWTNMbVN1dzNfQ3FYbmE3Vl9QVnRaLU9yeU1lYVRDei1iMHNWbDRhWWRpLWtqVVlCTm91RWc3WGNoNG1KNDhMLVIyUkQ5X0ZRY0VjcDQ5b0k2ZnFQYXppQU9rYWxnam40eGVZLVZZUXc?oc=5"
      },
      {
        "name": "Google News",
        "href": "https://news.google.com/rss/search?q=Lockheed%20Martin%20Ultra%20Maritime%20acquisition&hl=en-US&gl=US&ceid=US:en"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-06",
    "image": {
      "src": "/covers/lockheed-ultra-maritime-acquisition.png",
      "alt": "The dark hull of a submarine cutting through grey open sea beneath an overcast sky",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 6 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Athenians to the Melians (the Melian Dialogue), 416 BC",
        "excerpt": "For ourselves, we shall not trouble you with specious pretences... since you know as well as we do that right, as the world goes, is only in question between equals in power, while the strong do what they can and the weak suffer what they must.",
        "source": "Thucydides, History of the Peloponnesian War, Book V (the Melian Dialogue), trans. Richard Crawley",
        "href": "https://standardebooks.org/ebooks/thucydides/history-of-the-peloponnesian-war/richard-crawley/text/chapter-17"
      },
      {
        "category": "historical",
        "title": "Augustus records the swallowing of a kingdom",
        "excerpt": "Egypt I added to the empire of the Roman people.",
        "source": "Augustus, Res Gestae Divi Augusti 27, trans. Frederick W. Shipley (Loeb Classical Library, 1924), hosted at LacusCurtius",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Augustus/Res_Gestae/5*.html"
      },
      {
        "category": "literary",
        "title": "Hobbes and the birth of the Leviathan",
        "excerpt": "This is the Generation of that great Leviathan, or rather (to speake more reverently) of that Mortall God, to which wee owe under the Immortall God, our peace and defence.",
        "source": "Thomas Hobbes, Leviathan (1651), Part II, Chapter XVII — Wikisource",
        "href": "https://en.wikisource.org/wiki/Leviathan_(1651)/Chapter_17"
      },
      {
        "category": "literary",
        "title": "The fishermen of Pericles on how the great devour the small",
        "excerpt": "Why, as men do a-land; the great ones eat up the little ones: I can compare our rich misers to nothing so fitly as to a whale; a' plays and tumbles, driving the poor fry before him, and at last devours them all at a mouthful.",
        "source": "William Shakespeare, Pericles, Prince of Tyre, Act II, Scene 1 — The Complete Works of William Shakespeare (MIT)",
        "href": "http://shakespeare.mit.edu/pericles/pericles.2.1.html"
      },
      {
        "category": "artistic",
        "title": "Pieter Bruegel the Elder, Big Fish Eat Little Fish (1556)",
        "excerpt": "A colossal beached fish is slit open to spill out a cascade of smaller fish, each of which has in turn swallowed one smaller still, an endless chain of predation. A knife scoring the giant's belly is stamped with the orb-and-cross of worldly power, while in a skiff a father points his son to the grim moral. Bruegel turns a Flemish proverb into a panorama of consolidation, where the great devour the small without limit or mercy.",
        "source": "Pieter Bruegel the Elder, 'Big Fish Eat Little Fish', 1556, pen and ink drawing, Albertina, Vienna — via Google Art Project on Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_the_Elder_-_Big_Fish_Eat_Little_Fish,_1556_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/lockheed-ultra-maritime-acquisition--art.png",
          "alt": "A giant fish cut open on a shore, disgorging many smaller fish that have themselves swallowed still-smaller fish, watched by figures in a boat.",
          "credit": "Pieter Bruegel the Elder (1526/1530–1569), 'Big Fish Eat Little Fish', 1556, pen and brush with grey and black ink on paper, Albertina, Vienna (inv. 7875). Digitised via the Google Art Project. Public domain (faithful reproduction of a two-dimensional public-domain work); image hosted on Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Saint-Saëns, 'Aquarium' from The Carnival of the Animals (1886)",
        "excerpt": "Shimmering runs across two pianos and the glassy shiver of the glass harmonica conjure a silent, sunless world where larger creatures glide above the small. Saint-Saëns' brief 'Aquarium' hangs suspended in the deep, beautiful and faintly sinister, the music of an undersea realm into which leviathans vanish and reappear. It is a fitting overture to a business built on hunting what moves, unseen, beneath the waves.",
        "source": "Camille Saint-Saëns, Le carnaval des animaux (1886), No. 7 'Aquarium' — IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Le_carnaval_des_animaux_(Saint-Sa%C3%ABns,_Camille)"
      }
    ],
    "rank": 35
  },
  {
    "slug": "china-official-death-sentence-graft",
    "headline": "Chinese court hands a former official a rare death sentence in a $324 million corruption case",
    "overview": "A Chinese court on July 6, 2026, handed a former local official a rare death sentence for corruption involving about $324 million in bribes. Capital sentences for graft are unusual even within China's sweeping anti-corruption campaign. The severity of the penalty underscored the scale of the case.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMixgFBVV95cUxPd2swVnZIQzd6Ui1FNnNCZHpuM0daVDFJU29Xc19tNTd4aEJNYkhiei1tQTBjNUpwc2hxdkNlVzF6bUt1b2hEY0JfaUNEU2o5Tjh3aERnODhMMml1THo2TnVBcHIwcHhTcUF4eW52eHlIOWhvTzV0TGoxSlBuRU5pTFZsRjZ0YlBZZTVlYlZTMDNkWV9Yc1hFTkdWTlNKcDBFMXlrRTNUU0cxcXhUZ2Nzdi1HVHYzcUFnNFUxUTZ3bnMtNmVuVUE?oc=5"
      },
      {
        "name": "Google News",
        "href": "https://news.google.com/rss/search?q=China%20official%20death%20sentence%20corruption%20324%20million%20bribes&hl=en-US&gl=US&ceid=US:en"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-06",
    "image": {
      "src": "/covers/china-official-death-sentence-graft.png",
      "alt": "An empty courtroom at dusk with a single wooden judge's bench and a set of brass scales in cold light",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 6 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Cicero, In Verrem (Against Verres), First Pleading (70 BC), trans. C. D. Yonge",
        "excerpt": "he has stolen so much that it may easily be plenty for many; that nothing is so holy that it cannot be corrupted, or so strongly fortified that it cannot be stormed by money.",
        "source": "Marcus Tullius Cicero, prosecution of Gaius Verres, the rapacious former governor of Sicily, for extortion; C. D. Yonge translation, via Wikisource (public domain).",
        "href": "https://en.wikisource.org/wiki/Against_Verres/First_pleading"
      },
      {
        "category": "historical",
        "title": "Pliny the Younger, Letters, Book 2, Letter 11 (to Tacitus), trans. J. B. Firth (1900)",
        "excerpt": "he was accused of having received bribes to condemn and even put to death innocent persons.",
        "source": "Pliny the Younger describing the Senate's trial and conviction of Marius Priscus, the corrupt proconsul of Africa, for taking bribes; J. B. Firth translation, via Attalus (public domain).",
        "href": "https://www.attalus.org/pliny/ep2.html"
      },
      {
        "category": "literary",
        "title": "Dante Alighieri, Inferno, Canto XXI (the Barrators), trans. Henry Wadsworth Longfellow",
        "excerpt": "All there are barrators, except Bonturo; / No into Yes for money there is changed.",
        "source": "In the fifth pouch of the Eighth Circle, corrupt public officials (barrators) who sold justice for money are plunged into boiling pitch and torn by demons; Longfellow translation, via Wikisource (public domain).",
        "href": "https://en.wikisource.org/wiki/The_Divine_Comedy/Inferno/Canto_XXI"
      },
      {
        "category": "literary",
        "title": "William Shakespeare, Measure for Measure, Act V, Scene 1",
        "excerpt": "An Angelo for Claudio, death for death! / Haste still pays haste, and leisure answers leisure; / Like doth quit like, and MEASURE still FOR MEASURE.",
        "source": "The Duke passes stern sentence on Angelo, the trusted deputy who abused his office; via the MIT Complete Works of Shakespeare (public domain).",
        "href": "http://shakespeare.mit.edu/measure/measure.5.1.html"
      },
      {
        "category": "artistic",
        "title": "Gerard David, The Judgment of Cambyses (panel 2: The Flaying of the Corrupt Judge Sisamnes), 1498",
        "excerpt": "Commissioned by the magistrates of Bruges for their council chamber, David's diptych stages the Persian king Cambyses' verdict on Sisamnes, a judge who took a bribe. In the second panel the condemned magistrate is stretched on a table and flayed alive, his skin peeled away by expressionless executioners as officials look on. It was hung where the city's own judges sat, a chilling warning that venal office ends in ruin.",
        "source": "Oil on panel, Groeningemuseum, Bruges. Based on the account of Sisamnes in Herodotus, Histories V.25. Public domain, via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Gerard_David_-_The_Judgment_of_Cambyses,_panel_2_-_The_shedding_of_the_corrupt_judge_Sisamnes.jpg",
        "image": {
          "src": "/covers/china-official-death-sentence-graft--art.png",
          "alt": "A corrupt judge is stretched on a table and flayed alive by executioners while robed officials look on, in a detailed Renaissance painting.",
          "credit": "Gerard David (c. 1450/1460-1523), The Judgment of Cambyses, panel 2: The Flaying of the Corrupt Judge Sisamnes, 1498, oil on panel, Groeningemuseum, Bruges. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Giuseppe Verdi, Messa da Requiem (1874), \"Dies irae\" (Sequence)",
        "excerpt": "Dies irae, dies illa, / Solvet saeclum in favilla, / Teste David cum Sibylla.",
        "source": "Verdi's thunderous setting of the medieval \"Dies irae\" sequence, the Day of Wrath on which every hidden deed is judged; public-domain Latin sequence text. Full scores of the public-domain work at IMSLP.",
        "href": "https://imslp.org/wiki/Requiem_(Verdi,_Giuseppe)"
      }
    ],
    "rank": 36
  },
  {
    "slug": "carlo-ratti-hospital-green-ring",
    "headline": "Carlo Ratti and Park Associati to wrap a Brescia children's hospital in a one-kilometre 'green ring'",
    "overview": "Architects Carlo Ratti Associati and Park Associati unveiled a design on July 6, 2026, to surround a children's hospital in Brescia, Italy, with a one-kilometre 'green ring' of continuous gardens and planting. The looping band of greenery would wrap the medical campus, bringing nature to patients, staff and visitors. The proposal is part of the hospital's wider redevelopment.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Dezeen",
        "href": "https://www.dezeen.com/2026/07/06/spedali-civili-hospital-carlo-ratti/"
      },
      {
        "name": "Google News",
        "href": "https://news.google.com/rss/search?q=Carlo%20Ratti%20Brescia%20children%20hospital%20green%20ring&hl=en-US&gl=US&ceid=US:en"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-06",
    "image": {
      "src": "/covers/carlo-ratti-hospital-green-ring.png",
      "alt": "A rendering of a modern hospital campus encircled by a continuous raised ring of gardens and trees",
      "credit": "Dezeen"
    },
    "edition": "Evening Edition · 6 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Hanging Gardens of Babylon, in Diodorus Siculus, Library of History, Book II.10",
        "excerpt": "since the approach to the garden sloped like a hillside and the several parts of the structure rose from one another tier on tier, the appearance of the whole resembled that of a theatre. When the ascending terraces had been built, there had been constructed beneath them galleries which carried the entire weight of the planted garden and rose little by little one above the other along the approach; and the uppermost gallery, which was fifty cubits high, bore the highest surface of the park, which was made level with the circuit wall of the battlements of the city.",
        "source": "Diodorus Siculus, Library of History, Book II, ch. 10 (Loeb Classical Library trans. C. H. Oldfather), LacusCurtius, University of Chicago",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Diodorus_Siculus/2A*.html"
      },
      {
        "category": "historical",
        "title": "The sacred grove of the healing god Asclepius at Epidaurus, in Pausanias, Description of Greece II.27",
        "excerpt": "The sacred grove of Asclepius is surrounded on all sides by boundary marks. No death or birth takes place within the enclosure... All the offerings, whether the offerer be one of the Epidaurians themselves or a stranger, are entirely consumed within the bounds.",
        "source": "Pausanias, Description of Greece, Book II (Corinth), 27.1 (Loeb Classical Library trans. W. H. S. Jones), Theoi Classical Texts Library",
        "href": "https://www.theoi.com/Text/Pausanias2B.html"
      },
      {
        "category": "literary",
        "title": "The enclosed garden (hortus conclusus) of the Song of Solomon 4:12-15",
        "excerpt": "A garden inclosed is my sister, my spouse; a spring shut up, a fountain sealed. Thy plants are an orchard of pomegranates, with pleasant fruits; camphire, with spikenard, Spikenard and saffron; calamus and cinnamon, with all trees of frankincense; myrrh and aloes, with all the chief spices: A fountain of gardens, a well of living waters, and streams from Lebanon.",
        "source": "Song of Solomon 4:12-15, Bible (King James Version), Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Song_of_Solomon"
      },
      {
        "category": "literary",
        "title": "The walled garden of Mirth in the Romance of the Rose (Guillaume de Lorris), trans. F. S. Ellis",
        "excerpt": "The wall was high, and built of hard / Rough stone, close shut, and strongly barred, / Enclosing round a garden vast, / Wherein no swain had ever passed;",
        "source": "Guillaume de Lorris and Jean de Meun, The Romance of the Rose, Englished by F. S. Ellis (1900), Chapter 2, Wikisource",
        "href": "https://en.wikisource.org/wiki/Romance_of_the_Rose_(Ellis)/Chapter_2"
      },
      {
        "category": "artistic",
        "title": "Paradiesgartlein (The Little Garden of Paradise), Upper Rhenish Master, c. 1410-1420",
        "excerpt": "An Upper Rhenish master paints the Virgin and saints seated within a low crenellated wall, a walled hortus conclusus dense with lilies, irises, roses and songbirds. The enclosure turns a small square of tended nature into a sanctuary of peace and healing, greenery radiating calm around the figures at its heart. It is one of the most beloved medieval images of the enclosed garden as a place of refuge and grace.",
        "source": "Upper Rhenish Master, Paradiesgartlein (Little Garden of Paradise), c. 1410-1420, tempera on oak, Stadel Museum, Frankfurt am Main. Reproduction from The Yorck Project via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Meister_des_Frankfurter_Paradiesg%C3%A4rtleins_001.jpg",
        "image": {
          "src": "/covers/carlo-ratti-hospital-green-ring--art.png",
          "alt": "Medieval painting of the Virgin Mary and saints seated within a low walled garden filled with flowering plants and birds.",
          "credit": "Upper Rhenish Master, Paradiesgartlein (Little Garden of Paradise), c. 1410-1420, Stadel Museum, Frankfurt am Main. Image from The Yorck Project (2002) '10.000 Meisterwerke der Malerei', via Wikimedia Commons. The work of art and its faithful photographic reproduction are in the public domain."
        }
      },
      {
        "category": "artistic",
        "title": "Symphony No. 6 in F major, Op. 68 ('Pastoral'), by Ludwig van Beethoven",
        "excerpt": "Beethoven's 'Pastoral' Symphony sets nature itself to music, its opening movement inscribed as the awakening of cheerful feelings on arrival in the countryside. Across its movements a brook murmurs, birds call, villagers dance and a storm passes into serene, grateful calm. It is the great musical portrait of the restorative, healing power of the green world.",
        "source": "Ludwig van Beethoven, Symphony No. 6 in F major, Op. 68 ('Pastoral'), 1808, full score, IMSLP / Petrucci Music Library (public domain)",
        "href": "https://imslp.org/wiki/Symphony_No.6,_Op.68_(Beethoven,_Ludwig_van)"
      }
    ],
    "rank": 37
  },
  {
    "slug": "susan-maddux-folded-canvas-sculptures",
    "headline": "Susan Maddux folds vividly painted canvas into garment-like sculptures",
    "overview": "Artist Susan Maddux folds and pleats vividly painted canvas into three-dimensional, garment-like sculptures that hover between painting, textile and clothing, in work featured by Colossal on July 6, 2026. Her draped, sculptural pieces turn the flat picture plane into billowing folds of colour. The results read at once as paintings and as garments caught mid-motion.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Colossal",
        "href": "https://www.thisiscolossal.com/2026/07/susan-maddux-paintings-sculpture-textiles/"
      },
      {
        "name": "Google News",
        "href": "https://news.google.com/rss/search?q=Susan%20Maddux%20folded%20canvas%20sculpture%20painting&hl=en-US&gl=US&ceid=US:en"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-06",
    "image": {
      "src": "/covers/susan-maddux-folded-canvas-sculptures.png",
      "alt": "A vividly coloured folded-canvas sculpture that resembles a draped garment",
      "credit": "Colossal"
    },
    "edition": "Evening Edition · 6 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Pliny the Elder, Natural History, Book XXXVI — the draped and the naked Venus of Praxiteles",
        "excerpt": "The artist made two statues of the goddess, and offered them both for sale: one of them was represented with drapery, and for this reason was preferred by the people of Cos, who had the choice; the second was offered them at the same price, but, on the grounds of propriety and modesty, they thought fit to choose the other.",
        "source": "Pliny the Elder, The Natural History (trans. Bostock & Riley, 1855), Book XXXVI, ch. 4 — Perseus Digital Library, Tufts University",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0137:book=36:chapter=4"
      },
      {
        "category": "historical",
        "title": "Giorgio Vasari, Lives of the Most Eminent Painters — Leonardo da Vinci draping cloth over clay",
        "excerpt": "He studied much in drawing after nature, and sometimes in making models of figures in clay, over which he would lay soft pieces of cloth dipped in clay, and then set himself patiently to draw them on a certain kind of very fine Rheims cloth, or prepared linen: and he executed them in black and white with the point of his brush, so that it was a marvel.",
        "source": "Giorgio Vasari, Lives of the Most Eminent Painters, Sculptors & Architects (trans. Gaston du C. de Vere), Vol. IV, Life of Leonardo da Vinci — Project Gutenberg",
        "href": "https://www.gutenberg.org/files/28420/28420-h/28420-h.htm"
      },
      {
        "category": "literary",
        "title": "Ovid, Metamorphoses, Book VI — the weaving contest of Arachne and Pallas",
        "excerpt": "Both hasten on, and girding up their garments to their breasts, they move their skilful arms, their eagerness beguiling their fatigue. There both the purple is being woven, which is subjected to the Tyrian brazen vessel, and fine shades of minute difference; just as the rainbow, with its mighty arch, is wont to tint a long tract of the sky by means of the rays reflected by the shower.",
        "source": "Ovid, Metamorphoses (trans. Henry T. Riley, 1851), Book VI — Project Gutenberg",
        "href": "https://www.gutenberg.org/files/21765/21765-h/21765-h.htm"
      },
      {
        "category": "literary",
        "title": "Homer, The Odyssey, Book II — Penelope's ever-unravelled web",
        "excerpt": "Whereon we could see her working on her great web all day long, but at night she would unpick the stitches again by torchlight. She fooled us in this way for three years and we never found her out.",
        "source": "Homer, The Odyssey (trans. Samuel Butler, 1900), Book II — Project Gutenberg",
        "href": "https://www.gutenberg.org/files/1727/1727-h/1727-h.htm"
      },
      {
        "category": "artistic",
        "title": "Winged Victory of Samothrace (Nike of Samothrace), c. 190 BC, Musée du Louvre",
        "excerpt": "Carved around 190 BC, the marble Nike alights on the prow of a stone warship, wings still beating. The sculptor cut the wind-blown chiton so that the wet cloth seems both to cling and to stream, folds pooling at the legs and rippling back into open air. Stone is coaxed into pure motion — it is the garment, not a face, that carries all the drama.",
        "source": "Hellenistic marble sculpture, Musée du Louvre, Paris — image via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Louvre_-_Winged_Victory_of_Samothrace.jpg",
        "image": {
          "src": "/covers/susan-maddux-folded-canvas-sculptures--art.png",
          "alt": "Marble Hellenistic statue of a winged woman, her thin drapery pressed and streaming against her body as if wind-blown, standing on the prow of a stone ship.",
          "credit": "Winged Victory of Samothrace (Nike), c. 190 BC, Musée du Louvre. Photograph by Amaury Laporte, CC BY 2.0, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Claude Debussy, 'Voiles', from Préludes, Livre 1 (1910)",
        "excerpt": "Debussy titled his second prelude 'Voiles' — at once 'sails' and 'veils' — and the music drifts on a whole-tone haze, unmoored from any key. Soft chords billow and slacken like fabric caught in a slow current, translucent and weightless. The piece hangs in the air the way cloth hangs in light, all surface and shimmer.",
        "source": "Claude Debussy, Préludes, Livre 1, CD 125, No. 2 'Voiles' (Paris: Durand et Cie., 1910), public domain — IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Pr%C3%A9ludes,_Livre_1,_CD_125_(Debussy,_Claude)"
      }
    ],
    "rank": 38
  },
  {
    "slug": "trump-wall-street-opening-bell",
    "headline": "Trump rings the New York Stock Exchange opening bell, tying his presidency to record stock gains",
    "overview": "President Trump rang the opening bell at the New York Stock Exchange on July 6, 2026, publicly tying his presidency to record stock-market gains. Standing on the exchange's balcony as Wall Street traded near all-time highs, he cast the market's rise as a verdict on his economic agenda. Critics warned of the risk of hitching a presidency so closely to the fortunes of the market.",
    "genre": "Economy",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMipwFBVV95cUxNaVhPRnhUaWtyQ09MSm1aT0RVOVVIVVJwUEJmZUtCYmh3eWd0NGp0UTd3YzJRT2hqRjVhZzZOTjZuTW1YeVZXZXJLdjYyc2w4MktZdkxFMW5LTU8yUllkX29iNUlWampyZHRuMmhZNUkycV9GYnJQUXJ5VjdHTlVHaWtfdkltMnQ2QnN0NFZqMy0yM1BtZjhrcXNQSUtNcmE2NzB6dkZLcw?oc=5"
      },
      {
        "name": "Google News",
        "href": "https://news.google.com/rss/search?q=Trump%20New%20York%20Stock%20Exchange%20opening%20bell&hl=en-US&gl=US&ceid=US:en"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-06",
    "image": {
      "src": "/covers/trump-wall-street-opening-bell.png",
      "alt": "The grand columned facade of a stock exchange building at dawn, flags furled, wide empty steps in front",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 6 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The South Sea Bubble (1720), from Mackay's Extraordinary Popular Delusions",
        "excerpt": "It seemed at that time as if the whole nation had turned stockjobbers. Exchange Alley was every day blocked up by crowds, and Cornhill was impassable for the number of carriages. Every body came to purchase stock.",
        "source": "Charles Mackay, Memoirs of Extraordinary Popular Delusions and the Madness of Crowds, Vol. I (1841), chapter 'The South Sea Bubble'",
        "href": "https://www.gutenberg.org/cache/epub/24518/pg24518.txt"
      },
      {
        "category": "historical",
        "title": "The Tulipomania (1634-37), from Mackay's Extraordinary Popular Delusions",
        "excerpt": "In 1634, the rage among the Dutch to possess them was so great that the ordinary industry of the country was neglected, and the population, even to its lowest dregs, embarked in the tulip trade. As the mania increased, prices augmented, until, in the year 1635, many persons were known to invest a fortune of 100,000 florins in the purchase of forty roots.",
        "source": "Charles Mackay, Memoirs of Extraordinary Popular Delusions and the Madness of Crowds, Vol. I (1841), chapter 'The Tulipomania'",
        "href": "https://www.gutenberg.org/cache/epub/24518/pg24518.txt"
      },
      {
        "category": "literary",
        "title": "Fortune and her turning wheel, from Boethius's Consolation of Philosophy",
        "excerpt": "This is my art, this the game I never cease to play. I turn the wheel that spins. I delight to see the high come down and the low ascend. Mount up, if thou wilt, but only on condition that thou wilt not think it a hardship to come down when the rules of my game require it.",
        "source": "Boethius, The Consolation of Philosophy, Book II (trans. H. R. James, 1897)",
        "href": "https://www.gutenberg.org/cache/epub/14328/pg14328.txt"
      },
      {
        "category": "literary",
        "title": "Mammon, worshipper of gold, from Milton's Paradise Lost, Book I",
        "excerpt": "Mammon, the least erected Spirit that fell\nFrom Heaven; for even in Heaven his looks and thoughts\nWere always downward bent, admiring more\nThe riches of heaven's pavement, trodden gold,\nThan aught divine or holy else enjoyed\nIn vision beatific.",
        "source": "John Milton, Paradise Lost, Book I (1667)",
        "href": "https://www.gutenberg.org/cache/epub/26/pg26.txt"
      },
      {
        "category": "artistic",
        "title": "William Hogarth, 'The South Sea Scheme' (1721)",
        "excerpt": "Hogarth's earliest satirical print sets the crash as a grim carnival: giddy Londoners of every rank crowd a whirling merry-go-round of speculation while Honesty is broken on the wheel and Honour is flogged. Fortune's dismembered body is hacked apart above the throng, and a fat devil slices her flesh to fling to the mob below. It is a portrait of a nation that has staked everything on a rising market and made a religion of paper wealth.",
        "source": "William Hogarth (1697-1764), 'The South Sea Scheme' (Emblematical Print on the South Sea Scheme), 1721 engraving",
        "href": "https://commons.wikimedia.org/wiki/File:William_Hogarth_-_The_South_Sea_Scheme.png",
        "image": {
          "src": "/covers/trump-wall-street-opening-bell--art.png",
          "alt": "An 18th-century engraving of a crowded city scene with people riding a large merry-go-round, a broken figure on a wheel, and a devil cutting up a body above the throng.",
          "credit": "William Hogarth (1697-1764), 'The South Sea Scheme' (Emblematical Print on the South Sea Scheme), 1721. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Richard Wagner, 'Das Rheingold' (1854)",
        "excerpt": "In the opening drama of Wagner's Ring, the dwarf Alberich renounces love itself to seize the Rhinegold and forge from it a ring of limitless power. The whole cycle turns on that bargain: gold hoarded becomes a curse that destroys everyone who grasps for it, from gods to giants. It is myth as a parable of mammon, the fortune won by staking all that is human on the worship of glittering wealth.",
        "source": "Richard Wagner, Das Rheingold, WWV 86A (composed 1854), first part of Der Ring des Nibelungen",
        "href": "https://imslp.org/wiki/Das_Rheingold,_WWV_86A_(Wagner,_Richard)"
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
