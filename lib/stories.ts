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
const stories: Story[] = [
    {
      "slug": "hormuz-reopening-talks-oil-drop",
      "headline": "Rubio and Bessent say a deal to reopen the Strait of Hormuz is close, and Brent crude falls almost 5% to a three-week low",
      "overview": "US Secretary of State Marco Rubio and Treasury Secretary Scott Bessent each said talks with Iran had progressed far enough that shipments through the strait could resume as soon as this week. Brent crude fell by almost 5% to under $80 a barrel and West Texas Intermediate dropped to $76, both their lowest since 13 July. Reuters reported that Iran is demanding control of inbound traffic through the waterway and oversight of what passes out.",
      "genre": "Conflict",
      "sources": [
        {
          "name": "BBC",
          "href": "https://www.bbc.co.uk/news/articles/cpw9v0gnzxwo"
        },
        {
          "name": "AP",
          "href": "https://news.google.com/rss/articles/CBMiogFBVV95cUxPWVM4RFNkcmVJOXdtbENVNzYxYm9hc3JTVmE2V1JzVzBHd2FKRFdVQmRwc21IbHM4YmVvQUNMamFSQWNiYTRjQ0lKWDJERzg5QzlnMDJIaDYtNXg1aWMwVGF0YjhLRE1XcVZuZjdKR01nZVV4czcyeXNYLThQWVdRLTdERXJhZGp0aVU1UHFYSmg1Mk9lXzlOLXRHZ2dsc2hGckE?oc=5"
        }
      ],
      "href": "#",
      "publishedAt": "2026-08-04",
      "image": {
        "src": "/covers/hormuz-reopening-talks-oil-drop.png",
        "alt": "Tankers riding at anchor in hazy light in the Strait of Hormuz off Bandar Abbas in southern Iran.",
        "credit": "BBC"
      },
      "lead": true,
      "rank": 1,
      "edition": "Evening Edition · 4 August 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Athens fortifies Chrysopolis on the Bosporus in 410 BC and levies a ten per cent toll on every ship sailing out of the Black Sea",
          "excerpt": "From there they proceeded to Chrysopolis, in Calchedonia, and fortified it, established a custom house in the city, and proceeded to collect the tithe-duty from vessels sailing out of the Pontus; they also left there as a garrison thirty ships and two of the generals, Theramenes and Eumachus, to have charge of the fort, to attend to the outgoing ships, and to harm the enemy in any other way they could. The other generals returned to the Hellespont.",
          "source": "Xenophon, Hellenica 1.1.22, in Xenophon in Seven Volumes, vols. 1-2, trans. Carleton L. Brownson (Cambridge, MA: Harvard University Press; London: William Heinemann, 1918-21); Perseus Digital Library, Tufts University. The editor's note glosses the tithe-duty as ‘a tax of ten per cent. on all goods passing out through the Bosporus.’",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0206%3Abook%3D1%3Achapter%3D1%3Asection%3D22",
          "image": {
            "src": "/covers/hormuz-reopening-talks-oil-drop--a0.png",
            "alt": "Nineteenth-century view down the Bosphorus from the heights above Scutari (Üsküdar), the site of ancient Chrysopolis, with shipping in the strait below",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "historical",
          "title": "The great powers sign the Convention of Constantinople on 29 October 1888, binding themselves to keep the Suez Canal open to every flag and never to blockade it",
          "excerpt": "The Suez Maritime Canal shall always be free and open, in time of war as in time of peace, to every vessel of commerce or of war, without distinction of flag. Consequently, the High Contracting Parties agree not in any way to interfere with the free use of the Canal, in time of war as in time of peace. The Canal shall never be subjected to the exercise of the right of blockade.",
          "source": "Convention between Great Britain, Germany, Austria-Hungary, Spain, France, Italy, the Netherlands, Russia and Turkey, respecting the Free Navigation of the Suez Maritime Canal, signed at Constantinople 29 October 1888, ratifications deposited 22 December 1888, Article I; transcribed text at Wikisource.",
          "href": "https://en.wikisource.org/wiki/Constantinople_Convention_of_the_Suez_Canal",
          "image": {
            "src": "/covers/hormuz-reopening-talks-oil-drop--a1.png",
            "alt": "Édouard Riou's 1869 depiction of the inauguration of the Suez Canal on 17 November 1869, a procession of ships entering the newly opened waterway",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "literary",
          "title": "Circe names the toll for passing the strait - six men, one for each of Scylla's heads - in Book 12 of Homer's Odyssey",
          "excerpt": "By her no sailors yet may boast that they have fled unscathed in their ship, for with each head she carries off a man, snatching him from the dark-prowed ship. But the other cliff, thou wilt note, Odysseus, is lower—they are close to each other; thou couldst even shoot an arrow across—and on it is a great fig tree with rich foliage, but beneath this divine Charybdis sucks down the black water. Thrice a day she belches it forth, and thrice she sucks it down terribly. Mayest thou not be there when she sucks it down, for no one could save thee from ruin, no, not the Earth-shaker. Nay, draw very close to Scylla's cliff, and drive thy ship past quickly; for it is better far to mourn six comrades in thy ship than all together.",
          "source": "Homer, Odyssey 12.98-110, trans. A. T. Murray, Homer: The Odyssey with an English Translation in Two Volumes (Cambridge, MA: Harvard University Press; London: William Heinemann, 1919); Perseus Digital Library, Tufts University.",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0136%3Abook%3D12%3Acard%3D85",
          "image": {
            "src": "/covers/hormuz-reopening-talks-oil-drop--a2.png",
            "alt": "Scylla, the six-headed monster of the strait, on a Boeotian red-figure bell-krater of 450-425 BC, Louvre CA 1341",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "literary",
          "title": "Melville's Pequod runs for the Straits of Sunda, where those who hold the gateway waive the ceremony of lowered topsails but never their claim to ‘more solid tribute’, in Moby-Dick (1851)",
          "excerpt": "The shores of the Straits of Sunda are unsupplied with those domineering fortresses which guard the entrances to the Mediterranean, the Baltic, and the Propontis. Unlike the Danes, these Orientals do not demand the obsequious homage of lowered top-sails from the endless procession of ships before the wind, which for centuries past, by night and by day, have passed between the islands of Sumatra and Java, freighted with the costliest cargoes of the east. But while they freely waive a ceremonial like this, they do by no means renounce their claim to more solid tribute. Time out of mind the piratical proas of the Malays, lurking among the low shaded coves and islets of Sumatra, have sallied out upon the vessels sailing through the straits, fiercely demanding tribute at the point of their spears.",
          "source": "Herman Melville, Moby-Dick; or, The Whale (New York: Harper & Brothers, 1851), chapter 87, ‘The Grand Armada’; Project Gutenberg ebook no. 2701.",
          "href": "https://www.gutenberg.org/files/2701/2701-h/2701-h.htm#link2HCH0087",
          "image": {
            "src": "/covers/hormuz-reopening-talks-oil-drop--a3.png",
            "alt": "Title page of the first London edition of Herman Melville's The Whale (Moby-Dick), 1851",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "Robert Dodd paints the morning a fleet refused to pay the toll: ‘Nelson Forcing the Passage of the Sound, 30 March 1801’",
          "excerpt": "Dodd's canvas shows the narrowest water in northern Europe on the morning it stopped being negotiable. A British line of battle crowds through the two-mile gap between Denmark and Sweden under full sail, hugging the far shore to stay out of range, while the guns of Kronborg Castle throw smoke across the Danish side of the channel. For four centuries every merchantman in that channel had struck her topsails and paid the Sound Dues to the Danish crown for the right to enter the Baltic; Dodd gives the chokepoint its portrait at the moment force replaced the tariff. The dues themselves outlived the battle by another fifty-six years, and were finally bought out for cash rather than shot.",
          "source": "Robert Dodd (1748-1815), Nelson Forcing the Passage of the Sound, 30 March 1801, prior to the Battle of Copenhagen, oil on canvas, 1801-1815; National Maritime Museum, Greenwich, accession no. BHC0522 (Royal Museums Greenwich).",
          "href": "https://www.rmg.co.uk/collections/objects/rmgc-object-12014",
          "image": {
            "src": "/covers/hormuz-reopening-talks-oil-drop--a4.png",
            "alt": "Robert Dodd's oil painting of the British fleet under sail forcing the passage of the Sound past Kronborg Castle, 30 March 1801",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "Mendelssohn's concert overture ‘Meeresstille und glückliche Fahrt’, Op. 27 (1828, revised 1834), turns a dead calm into a reopened trade route",
          "excerpt": "The overture opens with the sea shut. Mendelssohn spaces his string chords so slowly and so widely that the music seems to stop breathing altogether: a becalmed hull going nowhere, and a cargo going nowhere with it. Then a flute lets the wind back in, the tempo doubles, and the full orchestra runs before it in a long open-water crescendo. It ends in trumpet fanfares as the ship makes harbour - the sound of a sea lane coming back to life, written for the moment the waiting stops.",
          "source": "Felix Mendelssohn Bartholdy, Meeresstille und glückliche Fahrt (Calm Sea and Prosperous Voyage), concert overture, Op. 27, MWV P 5, after the paired poems of Goethe; composed 1828, revised 1834, full score published Leipzig: Breitkopf & Härtel, 1835. Scores, parts and manuscript facsimile at the International Music Score Library Project (IMSLP / Petrucci Music Library).",
          "href": "https://imslp.org/wiki/Meeresstille_und_gl%C3%BCckliche_Fahrt,_Op.27_(Mendelssohn,_Felix)",
          "image": {
            "src": "/covers/hormuz-reopening-talks-oil-drop--a5.png",
            "alt": "Wilhelm Hensel's 1847 portrait drawing of the composer Felix Mendelssohn Bartholdy",
            "credit": "Wikimedia Commons"
          }
        }
      ]
    },
    {
      "slug": "gaza-mass-funeral-112-recovered",
      "headline": "Gaza City holds a mass funeral for 112 people from two families whose remains were pulled from the rubble more than two years after an Israeli strike",
      "overview": "Large crowds turned out in Gaza City for the burial of 112 people, most of them women and children, killed in an Israeli strike on a residential block late in 2023, early in the war. The remains, belonging to members of two extended families, were recovered over a two-week operation. Footage showed them laid out in rows, each covered with a Palestinian flag and some with a photograph of the dead, before relatives carried them away.",
      "genre": "Conflict",
      "sources": [
        {
          "name": "BBC",
          "href": "https://www.bbc.co.uk/news/articles/cn0n99npjejo"
        },
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMiswFBVV95cUxOVzdKSkNaWjdlN2xsLTdua0JNdGNsWVI1OVdUZ2gyQk5oQ3YwcW1GNnhmbVQ5MnNjSnRKMmlTaGFHck1Bb01rbUNsOEFDTExqZHJwUTJHYzA4YzVmSUs5NjB1Mi1JNE94RFlrVmJOSzJLZjhPbDM2cm51a0dvUmlhazZhT1QzUFF6XzRVcEhIZ1JrV2EySE5PV2JkaVVhRTYyNXZObm9FcVpRSG96YUN4Ym5PNA?oc=5"
        }
      ],
      "href": "#",
      "publishedAt": "2026-08-04",
      "image": {
        "src": "/covers/gaza-mass-funeral-112-recovered.png",
        "alt": "A boy crouching beside rows of stretchers draped in Palestinian flags at the mass funeral in Gaza City.",
        "credit": "BBC"
      },
      "rank": 2,
      "edition": "Evening Edition · 4 August 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Athens holds its first state funeral of the Peloponnesian War in the winter of 431 BC, carrying the gathered bones of the dead through the city with an empty bier for those never found",
          "excerpt": "The same winter the Athenians, according to their ancient custom, solemnized a public funeral of the first slain in this war in this manner. Having set up a tent, they put into it the bones of the dead three days before the funeral; and everyone bringeth whatsoever he thinks good to his own. When the day comes of carrying them to their burial, certain cypress coffins are carried along in carts, for every tribe one, in which are the bones of the men of every tribe by themselves. There is likewise borne an empty hearse covered over for such as appear not nor were found amongst the rest when they were taken up. The funeral is accompanied by any that will, whether citizen or stranger; and the women of their kindred are also by at the burial lamenting and mourning.",
          "source": "Thucydides, History of the Peloponnesian War, Book 2, chapter 34, translated by Thomas Hobbes, in The English Works of Thomas Hobbes of Malmesbury (London: Bohn, 1843); Perseus Digital Library, Tufts University.",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0247%3Abook%3D2%3Achapter%3D34",
          "image": {
            "src": "/covers/gaza-mass-funeral-112-recovered--a0.png",
            "alt": "Frieze from the Dipylon funerary amphora (Athens, c. 760-750 BC) showing the prothesis: the dead laid out on a bier under a shroud, flanked by rows of mourners with hands raised to their heads",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "historical",
          "title": "Johnstown, Pennsylvania buries its dead by the thousand in June 1889 after a flood levelled the city, with bodies still being picked out of the wreckage every day",
          "excerpt": "All day long the corpses were being hurried below ground. The unidentified bodies were grouped on a high hill west of the doomed city, where one epitaph must do for all, and that the word \"unknown.\" Almost every stroke of the pick in some portions of the city resulted in the discovery of another victim, and, although the funerals of the morning relieved the morgues of their crush, before night they were as full of the dead as ever.",
          "source": "Willis Fletcher Johnson, History of the Johnstown Flood (Philadelphia: Edgewood Publishing Co., 1889), Chapter XXVI, \"Breaking up the Ruins and Burying the Dead\"; Project Gutenberg ebook no. 41271.",
          "href": "https://www.gutenberg.org/cache/epub/41271/pg41271-images.html",
          "image": {
            "src": "/covers/gaza-mass-funeral-112-recovered--a1.png",
            "alt": "Photograph of the mountain of wreckage above the Pennsylvania Railroad bridge at Johnstown after the flood of 31 May 1889, from which bodies were recovered for months",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "literary",
          "title": "The whole city of Troy goes out to meet Hector's body and mourns him for days before he can be buried, in Book 24 of Homer's Iliad",
          "excerpt": "So spake she, nor was any man left there within the city, neither any woman, for upon all had come grief that might not be borne; and hard by the gates they met Priam, as he bare home the dead. First Hector's dear wife and queenly mother flung themselves upon the light-running waggon, and clasping his head the while, wailed and tore their hair; and the folk thronged about and wept. And now the whole day long until set of sun had they made lament for Hector with shedding of tears there without the gates, had not the old man spoken amid the folk from out the car: \"Make me way for the mules to pass through; thereafter shall ye take your fill of wailing, when I have brought him to the house.\"",
          "source": "Homer, Iliad, Book 24, lines 707-718, translated by A. T. Murray, Loeb Classical Library, 2 vols. (Cambridge, MA: Harvard University Press; London: William Heinemann, 1924); Perseus Digital Library, Tufts University.",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0134%3Abook%3D24%3Acard%3D718",
          "image": {
            "src": "/covers/gaza-mass-funeral-112-recovered--a2.png",
            "alt": "Jacques-Louis David, Andromache Mourning Hector (1783): Andromache and her small son beside Hector's body laid out on a bier",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "literary",
          "title": "The Book of Lamentations mourns a destroyed Jerusalem whose children lie unburied in the streets, written after the sack of the city in 586 BC",
          "excerpt": "Behold, O LORD, and consider to whom thou hast done this. Shall the women eat their fruit, and children of a span long? shall the priest and the prophet be slain in the sanctuary of the LORD? The young and the old lie on the ground in the streets: my virgins and my young men are fallen by the sword; thou hast slain them in the day of thine anger; thou hast killed, and not pitied. Thou hast called as in a solemn day my terrors round about, so that in the day of the LORD's anger none escaped nor remained: those that I have swaddled and brought up hath mine enemy consumed.",
          "source": "The Lamentations of Jeremiah 2:20-22, King James Version (1611); Wikisource, Bible (King James)/Lamentations.",
          "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Lamentations",
          "image": {
            "src": "/covers/gaza-mass-funeral-112-recovered--a3.png",
            "alt": "Rembrandt van Rijn, Jeremiah Lamenting the Destruction of Jerusalem (1630), Rijksmuseum, Amsterdam: the prophet slumped in mourning as the city burns behind him",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "Goya's etching 'Bury them and keep quiet' (Enterrar y callar), plate 18 of The Disasters of War, drawn from the Peninsular War around 1810",
          "excerpt": "A man and a woman stand at the edge of a heap of corpses strewn across bare ground, the woman pressing a cloth to her face against the stench, the man turning his head away. The bodies at their feet are stripped and tangled, arms flung out, faces upturned. Goya's caption is an instruction and an accusation at once: bury them, and say nothing. The plate belongs to a series he made privately during the Peninsular War and which was not published until 1863, thirty-five years after his death.",
          "source": "Francisco de Goya y Lucientes, Plate 18 from \"The Disasters of War\" (Los Desastres de la Guerra): 'Bury them and keep quiet' (Enterrar y callar), 1810, published 1863; etching, burnished lavis, drypoint and burin; The Metropolitan Museum of Art, New York, accession no. 22.60.25(18).",
          "href": "https://www.metmuseum.org/art/collection/search/380718",
          "image": {
            "src": "/covers/gaza-mass-funeral-112-recovered--a4.png",
            "alt": "Goya, 'Enterrar y callar' (Bury them and keep quiet), plate 18 of Los Desastres de la Guerra: two figures recoiling above a heap of unburied corpses",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "Gabriel Faure's Requiem, Op. 48, composed between 1877 and 1893, whose closing 'In Paradisum' is music written for the moment the body is carried out of the church to the grave",
          "excerpt": "Faure wrote his Requiem in the years around the deaths of his father and mother, and said he wrote it for no reason at all, simply for the pleasure of it. He cut the Day of Wrath almost entirely and gave the centre of the work to the Pie Jesu, sung by a single treble voice, so that the mass turns away from judgement and toward rest. The last movement, In Paradisum, is not part of the mass at all but of the burial rite: it is sung as the coffin leaves the church, over a shimmer of harp and organ, while the choir asks that angels lead the dead into the city.",
          "source": "Gabriel Faure, Requiem, Op. 48 (1877, 1887-93), seven movements: Introit et Kyrie, Offertoire, Sanctus, Pie Jesu, Agnus Dei, Libera me, In Paradisum; scores and parts at the International Music Score Library Project (IMSLP/Petrucci Music Library).",
          "href": "https://imslp.org/wiki/Requiem,_Op.48_(Faur%C3%A9,_Gabriel)",
          "image": {
            "src": "/covers/gaza-mass-funeral-112-recovered--a5.png",
            "alt": "John Singer Sargent's 1889 portrait of the composer Gabriel Faure",
            "credit": "Wikimedia Commons"
          }
        }
      ]
    },
    {
      "slug": "kherson-drone-vegetable-seller-war-crime",
      "headline": "Ukraine calls a Russian drone attack on a Kherson vegetable seller a war crime after video shows the drone chasing him down the street",
      "overview": "Video released by Ukrainian officials shows a drone hovering over a street vendor in the Kherson region, following him as he runs around a white van, then swooping down and exploding on impact. The man survived with multiple shrapnel wounds, concussion and trauma, a doctor said. Ukrainian officials describe a pattern of what they call 'human safari' drone attacks on civilians in the region.",
      "genre": "Conflict",
      "sources": [
        {
          "name": "BBC",
          "href": "https://www.bbc.co.uk/news/articles/cn4n03xg981o"
        },
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMixgFBVV95cUxOd0dKYnNEVVFrdlNXS1JkMXNlcVlYekZlTTFXZ21IVU5wLUpvRTRoZFVNUUtvcUZOWHlZZG84Z0huU3ltdlVrVFpMZ3dMV1dSano3bmlRM3Bnam5Qa0Vmd2ZsOGpxQWstTkNBV19DLXo1OWVsMDlzOUtwT3pYNm8wdW41VUhOOXBqQV90TjBsUDdnRVlJVEhGNnB3MExacFdES19PdGYyQkp3dmNhcGxnQy1LUFFJZ0U5YnB4UHFuV2RIQmtrQXc?oc=5"
        }
      ],
      "href": "#",
      "publishedAt": "2026-08-04",
      "image": {
        "src": "/covers/kherson-drone-vegetable-seller-war-crime.png",
        "alt": "A man in black running past a white van and a green parasol as a drone bears down on him, and the same scene an instant later as the drone detonates.",
        "credit": "BBC"
      },
      "rank": 3,
      "edition": "Evening Edition · 4 August 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Seneca describes the midday killings in the Roman arena, where unarmed men were butchered in the open for the entertainment of spectators, around AD 64",
          "excerpt": "What is the need of defensive armour, or of skill? All these mean delaying death. In the morning they throw men to the lions and the bears; at noon, they throw them to the spectators. The spectators demand that the slayer shall face the man who is to slay him in his turn; and they always reserve the latest conqueror for another butchering. The outcome of every fight is death, and the means are fire and sword.",
          "source": "Seneca, Epistulae Morales ad Lucilium, Letter 7 (\"On Crowds\"), sections 3-5, translated by Richard Mott Gummere, Loeb Classical Library, Ad Lucilium Epistulae Morales, vol. 1 (London: Heinemann; New York: Putnam, 1917); transcribed at Wikisource.",
          "href": "https://en.wikisource.org/wiki/Moral_letters_to_Lucilius/Letter_7",
          "image": {
            "src": "/covers/kherson-drone-vegetable-seller-war-crime--a0.png",
            "alt": "Jean-Leon Gerome, 'Pollice Verso' (1872): a victorious gladiator stands over a fallen man on the sand of the arena while the tiered crowd turns its thumbs down.",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "historical",
          "title": "Emperor Haile Selassie tells the League of Nations on 30 June 1936 how Italian aircraft sprayed poison gas repeatedly over Ethiopian civilians in the open",
          "excerpt": "Special sprayers were installed on board aircraft so that they could vaporize, over vast areas of territory, a fine, death-dealing rain. Groups of nine, fifteen, eighteen aircraft followed one another so that the fog issuing from them formed a continuous sheet. It was thus that, as from the end of January, 1936, soldiers, women, children, cattle, rivers, lakes and pastures were drenched continually with this deadly rain. In order to kill off systematically all living creatures, in order to more surely to poison waters and pastures, the Italian command made its aircraft pass over and over again. That was its chief method of warfare.",
          "source": "Haile Selassie I, \"Appeal to The League of Nations,\" address to the Assembly of the League of Nations, Geneva, 30 June 1936, opening section and section \"Ravage and Terror\"; Haile Selassie I Press translation, transcribed at Wikisource.",
          "href": "https://en.wikisource.org/wiki/Appeal_to_The_League_of_Nations",
          "image": {
            "src": "/covers/kherson-drone-vegetable-seller-war-crime--a1.png",
            "alt": "Photograph of Emperor Haile Selassie I standing at the rostrum of the League of Nations Assembly in Geneva in June 1936, delivering his appeal.",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "literary",
          "title": "Homer's Iliad, Book 22: Achilles hunts the fleeing Hector beneath the walls of Troy like a falcon stooping on a dove",
          "excerpt": "But trembling gat hold of Hector when he was ware of him, neither dared he any more abide where he was, but left the gates behind him, and fled in fear; and the son of Peleus rushed after him, trusting in his fleetness of foot. As a falcon in the mountains, swiftest of winged things, swoopeth lightly after a trembling dove: she fleeth before him, and he hard at hand darteth ever at her with shrill cries, and his heart biddeth him seize her; even so Achilles in his fury sped straight on, and Hector fled beneath the wall of the Trojans, and plied his limbs swiftly.",
          "source": "Homer, Iliad 22.136-144, translated by A. T. Murray, Loeb Classical Library, The Iliad with an English Translation in two volumes (Cambridge, MA: Harvard University Press; London: Heinemann, 1924); Perseus Digital Library, Tufts University.",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0134%3Abook%3D22%3Acard%3D131",
          "image": {
            "src": "/covers/kherson-drone-vegetable-seller-war-crime--a2.png",
            "alt": "Franz von Matsch, 'The Triumph of Achilles' (1892), fresco at the Achilleion, Corfu: Achilles drags the body of Hector behind his chariot before the walls of Troy.",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "literary",
          "title": "Richard Connell's 1924 story \"The Most Dangerous Game,\" in which General Zaroff explains why he has taken to hunting human beings for sport",
          "excerpt": "“I wanted the ideal animal to hunt,” explained the general. “So I said, ‘What are the attributes of an ideal quarry?’ And the answer was, of course, ‘It must have courage, cunning, and, above all, it must be able to reason.’” “But no animal can reason,” objected Rainsford. “My dear fellow,” said the general, “there is one that can.” “But you can’t mean——” gasped Rainsford.",
          "source": "Richard Connell, \"The Most Dangerous Game,\" first published in Collier's, 19 January 1924; reprinted in O. Henry Memorial Award Prize Stories of 1924, edited by Blanche Colton Williams (Garden City, NY: Doubleday, Page & Co., 1925); transcribed at Wikisource.",
          "href": "https://en.wikisource.org/wiki/O._Henry_Memorial_Award_Prize_Stories_of_1924/The_Most_Dangerous_Game"
        },
        {
          "category": "artistic",
          "title": "Goya's etching \"Yo lo vi\" (I saw it), Plate 44 of The Disasters of War, about 1810",
          "excerpt": "Goya's plate shows villagers streaming across bare open ground away from something the viewer never sees: a woman drags a child by the wrist, another child crawls on all fours, a friar clutches his bundle and runs. In the foreground one man twists back and points behind him with an outstretched arm, the gesture of a witness identifying what is coming. The title Goya scratched beneath the image, \"Yo lo vi\" - I saw it - makes the print an act of testimony rather than a composition, the nineteenth-century equivalent of releasing the footage.",
          "source": "Francisco de Goya y Lucientes, Plate 44 from Los Desastres de la Guerra (The Disasters of War): \"Yo lo vi\" (I saw it), etching, drypoint and burin, c. 1810, published posthumously 1863; The Metropolitan Museum of Art, New York, accession no. 51.530.2(44), Gift of Mrs. Grafton H. Pyne, 1951.",
          "href": "https://www.metmuseum.org/art/collection/search/381372",
          "image": {
            "src": "/covers/kherson-drone-vegetable-seller-war-crime--a4.png",
            "alt": "Goya's etching 'Yo lo vi' (Plate 44 of The Disasters of War): civilians flee in panic across open ground, one man pointing back at the unseen danger behind them.",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "Schubert's song Erlkonig, D.328 (1815), in which a pursuing figure overtakes a fleeing child",
          "excerpt": "Schubert sets Goethe's ballad over a piano part of hammered triplet octaves that never lets up, the sound of a horse ridden flat out and of a heart that cannot slow down. Above it a single singer must play all four voices at once: the narrator, the frightened child whose cries climb higher by a step with each appearance, the father who insists there is nothing there, and the Erlking, who addresses the child in soft, sweetly harmonised phrases while closing in. When the galloping finally stops the music drops to bare recitative for the last line, and the pursuit is revealed to have ended in a death that the father, carrying the boy, only discovers on arrival.",
          "source": "Franz Schubert, Erlkonig, D.328 (Op.1), Lied for voice and piano on the ballad by Johann Wolfgang von Goethe, composed 1815, first published Vienna: Cappi & Diabelli, 1821; scores and manuscript facsimiles at the International Music Score Library Project (Petrucci Music Library).",
          "href": "https://imslp.org/wiki/Erlk%C3%B6nig,_D.328_(Schubert,_Franz)",
          "image": {
            "src": "/covers/kherson-drone-vegetable-seller-war-crime--a5.png",
            "alt": "Painting of the Erlking: a robed spectral figure looms over a galloping white horse carrying a father and child through a dark wood, with wraith-like daughters reaching from the trees.",
            "credit": "Wikimedia Commons"
          }
        }
      ]
    },
    {
      "slug": "spacex-first-public-quarter-loss",
      "headline": "SpaceX reports a $541 million quarterly loss in its first results as a public company as revenue jumps more than 90% to $7.8 billion",
      "overview": "The loss of 9 cents a share for the three months through June was less than half what analysts had expected. Revenue rose more than 90% from a year earlier, carried by the Starlink satellite business, which ended March with 10.3 million subscribers, up from 8.9 million at the end of 2025. Options traders had positioned for a swing of roughly $225 billion in the company's value around the report.",
      "genre": "Economy",
      "sources": [
        {
          "name": "AP",
          "href": "https://news.google.com/rss/articles/CBMimAFBVV95cUxPWExWNGc3WlZRU0Frc0ZwX1Zyb01Hd3NPOFowX1M3UEtGWmpmSzNSX3VHMEpIVy1PNkVXZWRZUU9oQ3V3Qk03MFdSZ2JQV05mZVd1OW9hOHdkcVlCeEZiVFBBSmhYa1I4MUJETllZdS1aV3hFMXQxekdEV0VjcUpaYzYwM2tvRkgwdXMzdlFzV05BY01iNWZmQg?oc=5"
        },
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMiywFBVV95cUxNRkFZQkJoRmRlajg5SzYxaU5EQVZ3U2RYbUtyZHRfcndUVmpYb3lwWm5DNmtVMFY3bFZoLVEyaVJ0b0dmRWYxZ05vSXhRaWFLVXVlVG9MSmV2Qjg4OEFTNU4xLU5ST2NOMDh5b3NOM1J4cGgzQmFIRjBEOUNlZXhaQ1JoV0VPeS1ZWW9XX1ZSUnZJQ19kNHN6cnYwWHFoN25saEltTjZNQWhlclNieEJCQ1VWUGtDRC1xcjNEUmxjMG9KYVJLaGNHU2RJaw?oc=5"
        }
      ],
      "href": "#",
      "publishedAt": "2026-08-04",
      "image": {
        "src": "/covers/spacex-first-public-quarter-loss.png",
        "alt": "A Falcon 9 rocket climbing on a column of flame at night, carrying a batch of Starlink satellites to orbit.",
        "credit": "U.S. Space Force via Wikimedia Commons"
      },
      "rank": 4,
      "edition": "Evening Edition · 4 August 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "In 215 BC three Roman syndicates bid to supply the armies in Spain, demanding that the State insure their cargoes against storm and capture.",
          "excerpt": "On the appointed day three syndicates appeared, consisting each of nineteen members, prepared to tender for the contracts. They insisted on two conditions - one was that they should be exempt from military service whilst they were employed on this public business, and the other that the cargoes they shipped should be insured by the government against storm or capture. Both demands were conceded, and the administration of the State was carried on with private money.",
          "source": "Livy, Ab Urbe Condita (From the Founding of the City), Book 23, chapter 49, translated by the Rev. Canon Roberts (London: J. M. Dent & Sons, 1905); hosted by Wikisource.",
          "href": "https://en.wikisource.org/wiki/From_the_Founding_of_the_City/Book_23",
          "image": {
            "src": "/covers/spacex-first-public-quarter-loss--a0.png",
            "alt": "Illuminated opening page of a medieval manuscript of Livy's Ab urbe condita in Pierre Bersuire's French translation, made for Charles V of France (Paris, Bibliothèque Sainte-Geneviève, Ms. 777, fol. 7r).",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "historical",
          "title": "Columbus's letter of 15 February 1493, addressed to the crown official who helped finance the voyage, was the first public accounting of what the venture would return.",
          "excerpt": "And in conclusion, to speak only of what has been done in this voyage, which has been so hastily performed, their Highnesses may see that I shall give them as much gold as they may need, with very little aid which their Highnesses will give me; spices and cotton at once, as much as their Highnesses will order to be shipped, and as much as they shall order to be shipped of mastic,--which till now has never been found except in Greece, in the island of Xio, and the Seignory sells it for what it likes; and aloe-wood as much as they shall order to be shipped; and slaves as many as they shall order to be shipped,--and these shall be from idolaters.",
          "source": "Christopher Columbus, \"Letter from Columbus to Luis de Santangel,\" dated on the caravel 15 February 1493, in Julius E. Olson and Edward Gaylord Bourne, eds., The Northmen, Columbus and Cabot, 985-1503, Original Narratives of Early American History (New York: Charles Scribner's Sons, 1906), pp. 263-272; hosted by Project Gutenberg (eBook No. 18571).",
          "href": "https://www.gutenberg.org/files/18571/18571-h/18571-h.htm",
          "image": {
            "src": "/covers/spacex-first-public-quarter-loss--a1.png",
            "alt": "Woodcut from the Basel 1493 printing of Columbus's letter, showing his ships approaching the newly claimed islands.",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "literary",
          "title": "The Merchant of Venice opens with traders imagining a cargo worth a fortune one moment and nothing the next.",
          "excerpt": "My wind cooling my broth\nWould blow me to an ague when I thought\nWhat harm a wind too great might do at sea.\nI should not see the sandy hour-glass run\nBut I should think of shallows and of flats,\nAnd see my wealthy Andrew dock’d in sand,\nVailing her high top lower than her ribs\nTo kiss her burial. Should I go to church\nAnd see the holy edifice of stone\nAnd not bethink me straight of dangerous rocks,\nWhich, touching but my gentle vessel’s side,\nWould scatter all her spices on the stream,\nEnrobe the roaring waters with my silks,\nAnd, in a word, but even now worth this,\nAnd now worth nothing?",
          "source": "William Shakespeare, The Merchant of Venice, Act I, scene i (Salarino's speech); Project Gutenberg eBook No. 1515.",
          "href": "https://www.gutenberg.org/files/1515/1515-h/1515-h.htm",
          "image": {
            "src": "/covers/spacex-first-public-quarter-loss--a2.png",
            "alt": "Title page of the 1600 first quarto of Shakespeare's The Merchant of Venice, printed in London for Thomas Heyes.",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "literary",
          "title": "Anthony Trollope's The Way We Live Now (1875) shows a railway company whose real product is not the railway but its shares.",
          "excerpt": "There was not one of them then present who had not after some fashion been given to understand that his fortune was to be made, not by the construction of the railway, but by the floating of the railway shares. They had all whispered to each other their convictions on this head. Even Montague did not beguile himself into an idea that he was really a director in a company to be employed in the making and working of a railway. People out of doors were to be advertised into buying shares, and they who were so to say indoors were to have the privilege of manufacturing the shares thus to be sold. That was to be their work, and they all knew it.",
          "source": "Anthony Trollope, The Way We Live Now (London: Chapman and Hall, 1875), chapter X, \"Mr. Fisker's Success\"; Project Gutenberg eBook No. 5231.",
          "href": "https://www.gutenberg.org/files/5231/5231-h/5231-h.htm",
          "image": {
            "src": "/covers/spacex-first-public-quarter-loss--a3.png",
            "alt": "Title page of the 1875 Chapman and Hall first edition of Anthony Trollope's The Way We Live Now.",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "William Hogarth's engraving The South Sea Scheme (1721) turns a company's reckoning into a public spectacle.",
          "excerpt": "Hogarth crowds a whole city into one square: a merry-go-round of speculators spins beside a monument recording the ruin of the town, while Fortune is butchered on a balcony and Honesty is broken on a wheel. Clergymen gamble in a corner, a mob of men and women queue at a raffle for husbands, and everywhere the paper claims change hands faster than anyone can count them. It is the first great picture of a crowd assembled to watch a valuation collapse, and it was printed while the South Sea Company's books were still being audited.",
          "source": "William Hogarth, The South Sea Scheme, 1721 (this impression 1722), etching and engraving, seventh state of seven, sheet 26.1 x 32.8 cm; The Metropolitan Museum of Art, New York, Harris Brisbane Dick Fund, 1932, accession no. 32.35(252).",
          "href": "https://www.metmuseum.org/art/collection/search/396205",
          "image": {
            "src": "/covers/spacex-first-public-quarter-loss--a4.png",
            "alt": "William Hogarth's satirical print The South Sea Scheme, showing speculators riding a merry-go-round while Fortune is butchered above the crowd.",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "Job Berckheyde's painting of the Amsterdam Bourse (c. 1675-1680) shows hundreds of merchants pricing a trading company's shares in a single courtyard.",
          "excerpt": "Berckheyde paints the exchange built between 1608 and 1611 at the noon hour, when the gates opened and the whole commercial weight of the city funnelled into one arcaded courtyard. Beneath the municipal arms with their three saltires, hundreds of merchants bargain in knots of two and three, while vendors outside hawk oranges, newspapers and paintings to the traffic. This is the room in which the world's first freely traded corporate shares - those of the Dutch East India Company - were valued daily by a crowd, a market judging a distant fleet it could not see.",
          "source": "Job Adriaensz. Berckheyde, The Stock Exchange in Amsterdam, ca. 1675-1680, oil on canvas, 62.2 x 52.8 cm; Stadel Museum, Frankfurt am Main, inv. no. 536.",
          "href": "https://sammlung.staedelmuseum.de/en/work/the-stock-exchange-in-amsterdam",
          "image": {
            "src": "/covers/spacex-first-public-quarter-loss--a5.png",
            "alt": "Job Berckheyde's painting of the courtyard of the Amsterdam Stock Exchange, crowded with merchants trading beneath the arcades.",
            "credit": "Wikimedia Commons"
          }
        }
      ]
    },
    {
      "slug": "brazil-ambassador-visa-revoked",
      "headline": "The United States revokes the visa of Brazil's ambassador, Maria Luiza Ribeiro Viotti, in a widening dispute with Lula's government",
      "overview": "The State Department called the move reciprocal, after Brazil denied visas last month to two American diplomats and stalled on approving President Trump's nominee for ambassador in Brasilia. Viotti is not being expelled, and officials said she could resume her duties if Brazil accepts Danny Perez, the former Florida House speaker, as US ambassador. The step had been delayed several times to give President Lula room to back down, which he did not.",
      "genre": "Politics",
      "sources": [
        {
          "name": "AP",
          "href": "https://news.google.com/rss/articles/CBMinwFBVV95cUxPbzhJanFZY3p0cWNVZlFLUXEwbEViRktZY1U3MXJfTXBRMWo2MmVtR1RvQ2I1MzMySEM4OE1oYkRLemJqM0FPaWxwMS12NjVBSzdOTTN0bUtGR2JFZklYQVVtQ1dXN0ttdDdpanFWUDVLanBJX0liVHBuR2xscTI0NndFVWgyQWFjTU9OT3FNRFFSQl9nOGMtWWFJaG1Pc3M?oc=5"
        },
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMiwwFBVV95cUxQeGswUzd6Zlg2REIyREhCUnEyNHJSNUdJelJudElYdkVlZ2FnRnBDdDIyTU81clNyM0RmcHpTTHFILVY0ZmItWXA1ZkVkcGFub1ktdFdLdlVSR0pIOXZ0MHB6YkxRdW5tb3NlY3JQd0RheUJ2Tm1JcE1yU2JtRFFESUNuaUhudkl5MGNaNGxFbTBwbC1OMTcyZW9IWjBzSzQxODhMZndxTVl6eTNSODB6dXkzT0xDX01OeDRNdzl3MkV3MkU?oc=5"
        }
      ],
      "href": "#",
      "publishedAt": "2026-08-04",
      "image": {
        "src": "/covers/brazil-ambassador-visa-revoked.png",
        "alt": "The modernist facade of the Embassy of Brazil on Massachusetts Avenue in Washington, DC.",
        "credit": "Wikimedia Commons"
      },
      "rank": 5,
      "edition": "Evening Edition · 4 August 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Athens and Sparta murdered the heralds Darius sent to demand earth and water, about 491 BC, and Herodotus reads the sacrilege as a debt still owed a generation later.",
          "excerpt": "To Athens and Sparta Xerxes sent no heralds to demand earth, and this he did for the following reason. When Darius had previously sent men with this same purpose, those who made the request were cast at the one city into the Pit and at the other into a well, and bidden to obtain their earth and water for the king from these locations. What calamity befell the Athenians for dealing in this way with the heralds I cannot say, save that their land and their city were laid waste. I think, however, that there was another reason for this, and not the aforesaid.",
          "source": "Herodotus, The Histories, Book 7, chapter 133, with an English translation by A. D. Godley (Cambridge, MA: Harvard University Press, 1920); Perseus Digital Library, Tufts University.",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0126%3Abook%3D7%3Achapter%3D133",
          "image": {
            "src": "/covers/brazil-ambassador-visa-revoked--a0.png",
            "alt": "Marble portrait bust of the Greek historian Herodotus, whose Histories records the killing of Darius's heralds at Athens and Sparta.",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "historical",
          "title": "On 30 October 1888 the United States declared the British minister in Washington, Lord Sackville, no longer acceptable and issued him a passport to leave; Britain left the legation without a minister in reply.",
          "excerpt": "By direction of the President, I have to-day informed Lord Sackville, the British minister at this capital, that for causes heretofore made known through you to Her Majesty’s Government, pursuant to my dispatch of the 25th instant, his continuance in his present official position in the United States is no longer acceptable to this Government, and would consequently be detrimental to the relations between the two countries. It becomes, therefore, necessary that another channel of intercourse between the two Governments should be opened. A passport, to facilitate his withdrawal, has been issued to Lord Sackville. You will inform Her Majesty’s Government of this determination.",
          "source": "No. 7, Mr. Bayard to Mr. Phelps, telegram, Department of State, Washington, October 30, 1888, in Papers Relating to the Foreign Relations of the United States, Transmitted to Congress, With the Annual Message of the President, December 3, 1888, Part II, Document 430; Office of the Historian, U.S. Department of State.",
          "href": "https://history.state.gov/historicaldocuments/frus1888p2/d430",
          "image": {
            "src": "/covers/brazil-ambassador-visa-revoked--a1.png",
            "alt": "Standing portrait photograph of Lionel Sackville-West, 2nd Baron Sackville, the British minister to Washington dismissed in 1888.",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "literary",
          "title": "In 2 Samuel 10 the Ammonite king Hanun, told that David's envoys are really spies, shaves off half their beards and cuts away their garments, and the humiliation of the messengers becomes a war.",
          "excerpt": "And the princes of the children of Ammon said unto Hanun their lord, Thinkest thou that David doth honour thy father, that he hath sent comforters unto thee? hath not David rather sent his servants unto thee, to search the city, and to spy it out, and to overthrow it? Wherefore Hanun took David's servants, and shaved off the one half of their beards, and cut off their garments in the middle, even to their buttocks, and sent them away. When they told it unto David, he sent to meet them, because the men were greatly ashamed: and the king said, Tarry at Jericho until your beards be grown, and then return.",
          "source": "The Holy Bible, King James Version (1611), 2 Samuel 10:3-5; Wikisource, Bible (King James)/2 Samuel.",
          "href": "https://en.wikisource.org/wiki/Bible_(King_James)/2_Samuel",
          "image": {
            "src": "/covers/brazil-ambassador-visa-revoked--a2.png",
            "alt": "Engraved book illustration of 1711, 'Davids knechten bij Hanun', showing David's envoys shamed at the Ammonite court; Rijksmuseum, Amsterdam, RP-P-1904-2803.",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "literary",
          "title": "In Shakespeare's Antony and Cleopatra, Antony has Caesar's envoy Thidias whipped and sends him back with an invitation to whip one of Antony's own men in return.",
          "excerpt": "Get thee back to Caesar; Tell him thy entertainment. Look thou say He makes me angry with him; for he seems Proud and disdainful, harping on what I am, Not what he knew I was. He makes me angry, And at this time most easy ’tis to do’t, When my good stars that were my former guides Have empty left their orbs and shot their fires Into th’ abysm of hell. If he mislike My speech and what is done, tell him he has Hipparchus, my enfranched bondman, whom He may at pleasure whip, or hang, or torture, As he shall like, to quit me. Urge it thou. Hence with thy stripes, be gone.",
          "source": "William Shakespeare, Antony and Cleopatra, Act III, Scene 13 (Antony to Thidias, after the whipping); Project Gutenberg eBook #1534, prepared by the PG Shakespeare Team.",
          "href": "https://www.gutenberg.org/files/1534/1534-h/1534-h.htm"
        },
        {
          "category": "artistic",
          "title": "Hans Holbein the Younger's double portrait of two French envoys in London, painted in 1533 as Europe split apart, hides a death's head at the ambassadors' feet.",
          "excerpt": "Two young Frenchmen on mission in London stand at either side of a shelved table loaded with the instruments of worldly competence: globes, sundials, a Lutheran hymn book, an arithmetic book wedged open at the page on division. Jean de Dinteville, Francis I's ambassador, is a study in fur and confidence; his friend Georges de Selve, a bishop, is grave beside him. But the lute has a broken string, one flute is missing from its case, and a long grey smear across the floor resolves, when seen from the side, into a human skull. Holbein painted the picture in the year Henry VIII married Anne Boleyn and England broke with Rome, and the embassy in it is already standing over its own ruin.",
          "source": "Hans Holbein the Younger, Jean de Dinteville and Georges de Selve ('The Ambassadors'), 1533, oil on wood (Baltic/Polish oak), 207 x 209.5 cm, inventory number NG1314; The National Gallery, London.",
          "href": "https://www.nationalgallery.org.uk/paintings/hans-holbein-the-younger-the-ambassadors",
          "image": {
            "src": "/covers/brazil-ambassador-visa-revoked--a4.png",
            "alt": "Hans Holbein the Younger, 'The Ambassadors' (1533), National Gallery, London: two envoys flanking a table of instruments, with an anamorphic skull across the foreground.",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "Verdi's opera Attila, premiered in Venice in 1846, opens with the Roman envoy Ezio bargaining privately with the enemy he was sent to face.",
          "excerpt": "Verdi's dramma lirico, on a libretto by Temistocle Solera, turns an embassy into the hinge of a war. The Roman general Ezio arrives in Attila's camp as the emperor's envoy and, in the great baritone-bass confrontation of the Prologue, offers to divide the world with the invader if Italy is left to him. Attila answers with contempt, the mission collapses, and the envoy goes back to his own court under suspicion from both sides. Italian audiences of 1846 heard the scene as a coded quarrel about who was selling their country, and the opera's proposals across the negotiating table are all backed by the armies waiting outside the tent.",
          "source": "Giuseppe Verdi, Attila, dramma lirico in a prologue and three acts, libretto by Temistocle Solera after Zacharias Werner's Attila, Konig der Hunnen (1809); first performed at the Teatro La Fenice, Venice, 17 March 1846; full scores, vocal scores and libretto at IMSLP / Petrucci Music Library.",
          "href": "https://imslp.org/wiki/Attila_(Verdi,_Giuseppe)",
          "image": {
            "src": "/covers/brazil-ambassador-visa-revoked--a5.png",
            "alt": "Wood engraving from the Illustrated London News, 15 April 1848, showing a scene from Verdi's Attila at Her Majesty's Theatre, London.",
            "credit": "Wikimedia Commons"
          }
        }
      ]
    },
    {
      "slug": "cameroon-biya-military-reshuffle",
      "headline": "Cameroon's Paul Biya, 93 and unseen in public for nearly two months, reshuffles the military high command from abroad",
      "overview": "The world's oldest serving head of state has been out of the country for close to 60 days while his officials deny rumours about his health. The reshuffle of the armed forces' senior ranks was announced while he remained absent, deepening unease in Yaounde over the succession. Biya was last seen publicly in Cameroon during Pope Leo XIV's visit in April.",
      "genre": "Politics",
      "sources": [
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMirgFBVV95cUxPTVZLM2owUTRzXzRSajVsd1VFQWMwU1RHa0VpWHVBLTk4OFBfRHdDSzN0NEpjZVBMM0prOU1NVFkwa3hDQ0tiaXJ4QjBaWmRNWDRtXzFnR2tVbkFwbDNhMlRzWVlRdGE3N2tZWXg3UE03Qm1qVGVnSnFheHMtYVZYeUQ4ZWFqb01NZXZyNHJRdzNKbjBaWTFhaEduelROd0o4a3RZdEVrZ0RlMGY2Mnc?oc=5"
        },
        {
          "name": "BBC",
          "href": "https://www.bbc.co.uk/news/articles/ckg9kd27lkpo"
        }
      ],
      "href": "#",
      "publishedAt": "2026-08-04",
      "image": {
        "src": "/covers/cameroon-biya-military-reshuffle.png",
        "alt": "President Paul Biya surrounded by Cameroonian officials and his wife Chantal Biya at one of his last public appearances in Cameroon, in April 2026.",
        "credit": "BBC"
      },
      "rank": 6,
      "edition": "Evening Edition · 4 August 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "In AD 26 the emperor Tiberius left Rome for the island of Capri and ruled for eleven years by letter, while Sejanus controlled every approach to him.",
          "excerpt": "That he might not impair his influence by closing his doors on the throngs of his many visitors or strengthen the hands of accusers by admitting them, he made it his aim to induce Tiberius to live in some charming spot at a distance from Rome. In this he foresaw several advantages. Access to the emperor would be under his own control, and letters, for the most part being conveyed by soldiers, would pass through his hands. Cæsar too, who was already in the decline of life, would soon, when enervated by retirement, more readily transfer to him the functions of empire; envy towards himself would be lessened when there was an end to his crowded levées and the reality of power would be increased by the removal of its empty show.",
          "source": "Tacitus, The Annals, Book IV, chapter 41, in Complete Works of Tacitus, trans. Alfred John Church and William Jackson Brodribb, ed. Sara Bryant (New York: Random House, 1942); Perseus Digital Library, Tufts University.",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.02.0078%3Abook%3D4%3Achapter%3D41",
          "image": {
            "src": "/covers/cameroon-biya-military-reshuffle--a0.png",
            "alt": "Roman marble portrait bust of the emperor Tiberius, Ny Carlsberg Glyptotek, Copenhagen",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "historical",
          "title": "The Regency Crisis of November 1788 to February 1789, when George III was kept in seclusion at Kew and his household was forbidden to utter the word 'regency'.",
          "excerpt": "I saw she had a secret hope she might come and sit with me now and then in this confinement. It would have been my greatest possible solace in this dreary abode: but I hastened to acquaint her of the absolute seclusion, and even to beg she would not send her servant to the house - for I found it was much desired to keep off all who might carry away any intelligence.\n\nShe is ever most reasonable, and never thenceforward hinted upon the subject. But she wrote continually long letters, and filled with news and anecdotes of much interest, relating to anything she could gather of \"out-house proceedings,\" which now became very important--the length of the malady threatening a regency!--a Word which I have not yet been able to articulate.",
          "source": "Frances Burney (Madame d'Arblay), Diary and Letters of Madame d'Arblay, Vol. 2 (1787-1792), entry of Sunday, 30 November 1788, section 'A Regency Hinted At'; with notes by W. C. Ward and Lord Macaulay's essay (London: Vizetelly & Co., 1891); Project Gutenberg eBook #6042.",
          "href": "https://www.gutenberg.org/ebooks/6042",
          "image": {
            "src": "/covers/cameroon-biya-military-reshuffle--a1.png",
            "alt": "Allan Ramsay's state portrait of King George III in coronation robes, c. 1765",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "literary",
          "title": "Homer's Odyssey, in which Telemachus describes a kingdom whose ruler has been made simply invisible, leaving no body, no tomb and no news.",
          "excerpt": "Stranger, since indeed thou dost ask and question me of this, our house once bade fair to be rich and honorable, so long as that man was still among his people. But now the gods have willed otherwise in their evil devising, seeing that they have caused him to pass from sight as they have no other man. For I should not so grieve for his death, if he had been slain among his comrades in the land of the Trojans, or had died in the arms of his friends, when he had wound up the skein of war. Then would the whole host of the Achaeans have made him a tomb, and for his son, too, he would have won great glory in days to come. But as it is, the spirits of the storm have swept him away and left no tidings: he is gone out of sight, out of hearing, and for me he has left anguish and weeping.",
          "source": "Homer, Odyssey, Book I, lines 230-243, trans. A. T. Murray, Loeb Classical Library (Cambridge, MA: Harvard University Press; London: William Heinemann, 1919); Perseus Digital Library, Tufts University.",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0136%3Abook%3D1%3Acard%3D230",
          "image": {
            "src": "/covers/cameroon-biya-military-reshuffle--a2.png",
            "alt": "John William Waterhouse, Penelope and the Suitors (1912), Penelope at her loom while the suitors crowd the window of the absent king's house",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "literary",
          "title": "Shakespeare's Measure for Measure (c. 1604), in which Vienna is governed by a deputy in the Duke's name while rumour invents his whereabouts.",
          "excerpt": "LUCIO.\nSome say he is with the Emperor of Russia; other some, he is in Rome. But where is he, think you?\n\nDUKE.\nI know not where, but wheresoever, I wish him well.\n\nLUCIO.\nIt was a mad fantastical trick of him to steal from the state and usurp the beggary he was never born to. Lord Angelo dukes it well in his absence. He puts transgression to't.",
          "source": "William Shakespeare, Measure for Measure, Act III, Scene ii (Lucio in conversation with the disguised Duke Vincentio); Project Gutenberg eBook #1530, prepared by the Project Gutenberg Shakespeare Team.",
          "href": "https://www.gutenberg.org/ebooks/1530",
          "image": {
            "src": "/covers/cameroon-biya-military-reshuffle--a3.png",
            "alt": "Title page of the 1623 First Folio of Shakespeare's comedies, histories and tragedies, the earliest printed source of Measure for Measure",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "Juan Carreño de Miranda's portrait of Charles II of Spain, painted about 1685, of a monarch whose succession all Europe was planning and no courtier could mention.",
          "excerpt": "Carreño shows the last Spanish Habsburg in unrelieved black against a dull red curtain, the collar of the Golden Fleece the only brightness on him. The long fair hair falls past a pale, narrow face with its heavy jaw and half-open mouth; one gloved hand steadies him on a gilt console table while the other holds a folded paper, as if the business of the monarchy had shrunk to a single document. Painted in the years when the chanceries of Europe were already drafting treaties to partition his empire, it is the portrait of a reign that everyone knew was ending and no one at court was permitted to say so.",
          "source": "Juan Carreño de Miranda (1614 Avilés – 1685 Madrid), König Karl II. von Spanien (1661–1700), oil on canvas, c. 1685, 145 × 105 cm (cut down), Kunsthistorisches Museum, Vienna, Gemäldegalerie, inv. GG 1714.",
          "href": "https://www.khm.at/en/artworks/koenig-karl-ii-von-spanien-1661-1700-451",
          "image": {
            "src": "/covers/cameroon-biya-military-reshuffle--a4.png",
            "alt": "Juan Carreño de Miranda, portrait of King Charles II of Spain in black court dress with the collar of the Golden Fleece, c. 1685, Kunsthistorisches Museum Vienna",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "Wagner's Parsifal (Bayreuth, 1882), whose aged king Titurel is never seen: his voice comes from a vault beneath the hall and still commands the rite.",
          "excerpt": "And when the hymns were ended, and the knights\nHad taken their set places at the board,\nThen there was silence. And from far away,\nAs if from some deep cavern of a tomb,\nBehind the couch where King Amfortas lay\nThe muffled voice of agèd Titurel\nSpake with long silences between the words:\n\"My son Amfortas, art thou at thy post?...\nWilt thou unveil the Grail and bid me live?...\nOr must I die, denied the saving vision?\"",
          "source": "Richard Wagner, Parsifal, Act I (the voice of Titurel from the vault), in Parsifal: A Mystical Drama by Richard Wagner, Retold in the Spirit of the Bayreuth Interpretation by Oliver Huckel (New York: Thomas Y. Crowell & Co., 1903); Project Gutenberg eBook #11633.",
          "href": "https://www.gutenberg.org/ebooks/11633",
          "image": {
            "src": "/covers/cameroon-biya-military-reshuffle--a5.png",
            "alt": "Paul von Joukowsky's 1882 stage design for the Grail Temple in the first Bayreuth production of Wagner's Parsifal",
            "credit": "Wikimedia Commons"
          }
        }
      ]
    },
    {
      "slug": "india-cockroach-party-refuses-election",
      "headline": "India's Gen Z 'Cockroach' movement says it will not contest elections after its protests forced out the education minister",
      "overview": "The Cockroach Janta Party grew out of street protests over repeated entrance-exam paper leaks and a shortage of jobs, among the largest youth demonstrations India has seen in years, and helped force Dharmendra Pradhan's resignation as education minister last month. Its organisers say they will stay outside electoral politics rather than become a conventional party. Prime Minister Narendra Modi has announced fast-track courts for those accused in the leaks and appointed the technology billionaire Nandan Nilekani to lead an examination-reform effort.",
      "genre": "Politics",
      "sources": [
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMiugFBVV95cUxPYU1EQVYxbjZoUmVtcWRKUVlibW5qNUZ5bG9wc0ZkRzZYajQxdHQ0QkU3U0UxQjUwVW1RaW1uVE90WXY3X2tlMll0VXlwYmFiQVd3ZDJkcVJaT0syQ2RiOXlTOVZNeWJXR1d2N0NoeEdBbzRPSzlleFVURTlnV3lwZU5ETHZjM3RQUkcwLTdfdUt5ZFIzNldzR2hDS0pDY1VmbUJfZUgwanFscjNyVHBvTEFnSnc1N3pwR3c?oc=5"
        },
        {
          "name": "AP",
          "href": "https://news.google.com/rss/articles/CBMiogFBVV95cUxQTHZqY1FmWndwQXBEMkNMaHIxbGV5c1Y0VU5Vb0pzQl9vdW1Vcy0wRDllQ3o0UWU2UjA3XzJGZ3g3ck55YXpwWU1Gdng5SFFETGV1QlZTM3JQNGx1RzQ4T2VpaElMeGFHeGdhYnpBajdaVGRYTTZYeFIxMUt0ampxTm81WnZVR1NwU2lHb3hIeUVyV043NzNWRGhxVUpxZXc0a3c?oc=5"
        }
      ],
      "href": "#",
      "publishedAt": "2026-08-04",
      "image": {
        "src": "/covers/india-cockroach-party-refuses-election.png",
        "alt": "A young man with the words Gen-Z painted on his face at a Cockroach Janta Party protest at Jantar Mantar in New Delhi.",
        "credit": "BBC"
      },
      "rank": 7,
      "edition": "Evening Edition · 4 August 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "In January 532 the Nika insurrection in Constantinople forced the Emperor Justinian to dismiss two hated ministers, and the regime survived anyway",
          "excerpt": "Now as long as the people were waging this war with each other in behalf of the names of the colours, no attention was paid to the offences of these men against the constitution; but when the factions came to a mutual understanding, as has been said, and so began the sedition, then openly throughout the whole city they began to abuse the two and went about seeking them to kill. Accordingly the emperor, wishing to win the people to his side, instantly dismissed both these men from office. And Phocas, a patrician, he appointed praetorian prefect, a man of the greatest discretion and fitted by nature to be a guardian of justice; Basilides he commanded to fill the office of quaestor, a man known among the patricians for his agreeable qualities and a notable besides. However, the insurrection continued no less violently under them.",
          "source": "Procopius, History of the Wars, Book I, chapter xxiv (the Nika insurrection at Constantinople, January 532), with an English translation by H. B. Dewing, Loeb Classical Library (London: William Heinemann; Cambridge, Mass.: Harvard University Press; first printed 1914), Project Gutenberg ebook no. 16764.",
          "href": "https://www.gutenberg.org/files/16764/16764-h/16764-h.htm",
          "image": {
            "src": "/covers/india-cockroach-party-refuses-election--a0.png",
            "alt": "Mosaic portrait of the Emperor Justinian I with his retinue, Basilica of San Vitale, Ravenna, consecrated 547",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "historical",
          "title": "In 1919 the May Fourth student movement in China brought down three ministers, and the strikes stopped the moment their resignations were confirmed",
          "excerpt": "The specific demands of the leaders of the Chinese national movement at the time were the dismissal of Tsao Ju-lin, Lu Cheng-yu, and Chang Chung-hsiang, the three officials who were directly instrumental in making the recent disadvantageous agreements with Japan. When the acceptance of the resignations of these men had been verified through telegrams from the British, French, and American Legations to their Consulates at Shanghai, the active movement there came to an end and the strike was called off both at Shanghai and elsewhere. The boycott of Japanese goods, however, continues.",
          "source": "Paul S. Reinsch, American Minister in China, to the Acting Secretary of State, despatch no. 2837, Peking, 24 June 1919, in Papers Relating to the Foreign Relations of the United States, 1919, vol. I, document 710; U.S. Department of State, Office of the Historian.",
          "href": "https://history.state.gov/historicaldocuments/frus1919v01/d710",
          "image": {
            "src": "/covers/india-cockroach-party-refuses-election--a1.png",
            "alt": "Students of Peking demonstrating against the Treaty of Versailles, 4 May 1919",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "literary",
          "title": "Aristophanes' comedy The Wasps (422 BC) gives the chorus of old Athenian jurors the body of a stinging insect, which they wear as a badge of pride",
          "excerpt": "Should any among you spectators look upon me with wonder, because of this wasp waist, or not know the meaning of this sting, I will soon dispel his ignorance. We, who wear this appendage, are the true Attic men, who alone are noble and native to the soil, the bravest of all people. We are the ones who, weapon in hand, did so much for the country, when the barbarian shed torrents of fire and smoke over our city in his relentless desire to seize our nests by force.",
          "source": "Aristophanes, Wasps, lines 1071–1080 (parabasis of the chorus of jurors), in The Complete Greek Drama, vol. 2, translated by Eugene O'Neill, Jr. (New York: Random House, 1938); Perseus Digital Library, Tufts University.",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0044%3Acard%3D1071",
          "image": {
            "src": "/covers/india-cockroach-party-refuses-election--a2.png",
            "alt": "Roman marble herm portrait of Aristophanes, 1st century AD, Uffizi Gallery, Florence",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "literary",
          "title": "Pu Songling's tale 'Smelling Essays', written in seventeenth-century China, ends with a blind priest telling a failed candidate that the examiners have no noses",
          "excerpt": "The Yü-hang scholar was much abashed at this, and went away; but in a few days the list came out and his name was among the successful ones, while Wang’s was not. He at once hurried off to tell the old priest, who, when he heard the news, sighed and said, “I may be blind with my eyes but I am not so with my nose, which I fear is the case with the examiners. Besides,” added he, “I was talking to you about composition: I said nothing about destiny.”",
          "source": "P‘u Sung-ling (Pu Songling), ‘Smelling Essays’ (司文郎), story XCII in Strange Stories from a Chinese Studio, translated and annotated by Herbert A. Giles, 2 vols. (London: Thos. de la Rue & Co., 1880), vol. II, p. 139; Project Gutenberg ebook no. 43629.",
          "href": "https://www.gutenberg.org/files/43629/43629-h/43629-h.htm#chapter-92",
          "image": {
            "src": "/covers/india-cockroach-party-refuses-election--a3.png",
            "alt": "Photograph of the corridors of examination cells at a Chinese provincial examination hall, 1894",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "Honoré Daumier's lithograph 'Le ventre législatif' (1834) drew the ministerial benches of the French Chamber as tiers of bloated, dozing men",
          "excerpt": "Daumier ranges the deputies of Louis-Philippe's Chamber on curved tiers of benches like specimens in a case, each one individually recognisable and collectively interchangeable: paunches spilling over waistcoats, hands folded on stomachs, chins sunk into collars, several of them frankly asleep. The lighting is that of a courtroom or a dissecting theatre, and the caption calls it the aspect of the ministerial benches of the 'improstituted' chamber of 1834. It is an image made by a man who was jailed for insulting the king, and it argues, without a word of text, that the room itself is the problem — that entering it would not clean it.",
          "source": "Honoré Daumier, The Legislative Belly (Le ventre législatif: Aspect des bancs ministériels de la chambre improstituée de 1834), lithograph, 1834, published as plate 18 of L'Association mensuelle pour la liberté de la presse, supplement to La Caricature; The Cleveland Museum of Art, Charles W. Harkness Endowment Fund, accession no. 1923.206.",
          "href": "https://www.clevelandart.org/art/1923.206",
          "image": {
            "src": "/covers/india-cockroach-party-refuses-election--a4.png",
            "alt": "Honoré Daumier, 'Le ventre législatif' (The Legislative Belly), lithograph, 1834, showing the ministerial benches of the French Chamber of Deputies",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "Brahms's Academic Festival Overture, Op. 80 (1880), stitched the songs of Germany's outlawed student fraternities into a piece of university ceremony",
          "excerpt": "Brahms wrote the overture to thank the University of Breslau for an honorary doctorate, and paid it in the currency of student rowdiness: four beer-hall songs, orchestrated with trumpets and cymbals. The first to appear, at bar 64, is 'Wir hatten gebauet ein stattliches Haus', the anthem of the Burschenschaften — the nationalist student societies that were banned across the German states after the Carlsbad Decrees of 1819, so that a generation sang it as a lament for a house pulled down. By the closing bars the rebellion has become 'Gaudeamus igitur' in full academic dress, which is exactly the fate a movement forfeits nothing by refusing.",
          "source": "Johannes Brahms, Akademische Festouvertüre (Academic Festival Overture), Op. 80, composed 1880; first published Berlin: N. Simrock, 1881, plate 8187; full score and parts, International Music Score Library Project (IMSLP / Petrucci Music Library).",
          "href": "https://imslp.org/wiki/Academic_Festival_Overture,_Op.80_(Brahms,_Johannes)",
          "image": {
            "src": "/covers/india-cockroach-party-refuses-election--a5.png",
            "alt": "Title page of the first edition of Brahms's Akademische Festouvertüre, Op. 80, published by N. Simrock, Berlin, 1881",
            "credit": "Wikimedia Commons"
          }
        }
      ]
    },
    {
      "slug": "appeals-court-epa-climate-grants",
      "headline": "A divided full DC appeals court rules that the EPA likely broke the law in cancelling $20 billion in climate grants",
      "overview": "Six of the ten judges on the US Court of Appeals for the District of Columbia Circuit, sitting en banc, agreed with a lower-court judge that the Environmental Protection Agency likely violated the law when it terminated grants under the $20 billion Greenhouse Gas Reduction Fund and tried to claw the money back over a policy disagreement. EPA Administrator Lee Zeldin had accused Climate United Fund and other nonprofits chosen to run the 'green bank' of mismanagement and potential fraud. District Judge Tanya Chutkan found the government produced no evidence of fraud when it was asked for some.",
      "genre": "Climate",
      "sources": [
        {
          "name": "AP",
          "href": "https://news.google.com/rss/articles/CBMilgFBVV95cUxNMm5rN2k1VkFhLUdQaWhKSklHdElzMU9XZmhlT1M5eVBkVG1HSXB6WUc4V3hHOEQwTWFKTjlPSVA2YTRrcFEzWlFSc1BRVTJRdUVEMEozbXJTYkM1MVRYbUNYSU8zWkI2bnhPbTNQZUJXN2ZtSFduYzBMWmg2UVNuV1ZRVDA3bF9CUWp5YkNlQnIwMm8tVHc?oc=5"
        },
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMitgFBVV95cUxOTXVZM0xxUG92N2JHRnBleUJLOU5fcHBZeWo2Tk5Bb2NXXy1sVXBGaDh2cDZGNlJFWTBDTVkySzNiUUcyM3VFc0l2QnByRDFHNjgzbkRDaVBVTi1nR1kxQUh3RERaZjhKWmdFdFdRSkRmd2tiMm4tcnE5SnR3b1ZYVTZTWXN0NVpzUmFic2NvOGZBMmx3d1d4TUFZVmZpMzJrRnM5MkljaTdUckN3eG04NlNmNW9LUQ?oc=5"
        }
      ],
      "href": "#",
      "publishedAt": "2026-08-04",
      "image": {
        "src": "/covers/appeals-court-epa-climate-grants.png",
        "alt": "The E. Barrett Prettyman United States Courthouse in Washington, DC, home of the District of Columbia Circuit.",
        "credit": "Wikimedia Commons"
      },
      "rank": 8,
      "edition": "Evening Edition · 4 August 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "King John is forced at Runnymede in June 1215 to promise the immediate return of every estate, castle, liberty and right he had seized without a lawful judgment.",
          "excerpt": "52. If any one shall have been disseized by us, or removed, without a legal sentence of his peers, from his lands, castles, liberties or lawful right, we shall straightway restore them to him. And if a dispute shall arise concerning this matter it shall be settled according to the judgment of the twenty five barons who are mentioned below as sureties for the peace. But with regard to all those things of which any one was, by king Henry our father or king Richard our brother, disseized or dispossessed without legal judgment of his peers, which we have in our hand or which others hold, and for which we ought to give a guarantee: we shall have respite until the common term for crusaders.",
          "source": "Magna Carta (15 June 1215), clause 52, translated by Ernest F. Henderson in Select Historical Documents of the Middle Ages, Book I (London: George Bell and Sons, 1892); hosted by Wikisource.",
          "href": "https://en.wikisource.org/wiki/Select_Historical_Documents_of_the_Middle_Ages/Book_I/Magna_Carta",
          "image": {
            "src": "/covers/appeals-court-epa-climate-grants--a0.png",
            "alt": "One of the four surviving 1215 exemplifications of Magna Carta, British Library Cotton MS Augustus II.106, a densely written single sheet of parchment.",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "historical",
          "title": "On 18 February 1975 the US Supreme Court holds in Train v. City of New York that the EPA Administrator had no power to hold back billions in water-pollution money Congress had directed him to hand out.",
          "excerpt": "The District Court granted the respondents' motion for summary judgment, and the Court of Appeals affirmed, holding that \"the Act requires the Administrator to allot the full sums authorized to be appropriated in § 207.\" Held: The 1972 Amendments do not permit the Administrator to allot to the States under § 205 (a) less than the entire amounts authorized to be appropriated by § 207.",
          "source": "Train, Administrator, Environmental Protection Agency v. City of New York et al., 420 U.S. 35 (1975), syllabus at 35-36; opinion of the Court delivered by Justice Byron R. White, argued 12 November 1974, decided 18 February 1975. United States Reports, vol. 420, pp. 35-49, digitised by the Library of Congress.",
          "href": "https://tile.loc.gov/storage-services/service/ll/usrep/usrep420/usrep420035/usrep420035.pdf",
          "image": {
            "src": "/covers/appeals-court-epa-climate-grants--a1.png",
            "alt": "Official 1976 portrait photograph of Justice Byron R. White, who wrote the Supreme Court's opinion in Train v. City of New York.",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "literary",
          "title": "In Shakespeare's Richard II, the Duke of York warns the king that confiscating Bolingbroke's inheritance and calling in his letters patent will destroy the king's own title.",
          "excerpt": "Take Hereford’s rights away, and take from Time His charters and his customary rights; Let not tomorrow then ensue today; Be not thyself; for how art thou a king But by fair sequence and succession? Now, afore God—God forbid I say true!— If you do wrongfully seize Hereford’s rights, Call in the letters patents that he hath By his attorneys-general to sue His livery, and deny his offered homage, You pluck a thousand dangers on your head, You lose a thousand well-disposed hearts, And prick my tender patience to those thoughts Which honour and allegiance cannot think. KING RICHARD. Think what you will, we seize into our hands His plate, his goods, his money, and his lands.",
          "source": "William Shakespeare, King Richard the Second, Act II, Scene 1 (York's rebuke to the King, and the King's reply); Project Gutenberg eBook No. 1512.",
          "href": "https://www.gutenberg.org/files/1512/1512-h/1512-h.htm",
          "image": {
            "src": "/covers/appeals-court-epa-climate-grants--a2.png",
            "alt": "The Westminster Abbey coronation portrait of King Richard II, painted in the 1390s, showing the young king enthroned with orb and sceptre.",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "literary",
          "title": "In the Book of Kings, Ahab takes possession of Naboth's vineyard after Naboth is condemned on paid false witness, and the prophet Elijah meets him in the seized ground.",
          "excerpt": "And it came to pass, when Jezebel heard that Naboth was stoned, and was dead, that Jezebel said to Ahab, Arise, take possession of the vineyard of Naboth the Jezreelite, which he refused to give thee for money: for Naboth is not alive, but dead. And it came to pass, when Ahab heard that Naboth was dead, that Ahab rose up to go down to the vineyard of Naboth the Jezreelite, to take possession of it. And the word of the LORD came to Elijah the Tishbite, saying, Arise, go down to meet Ahab king of Israel, which is in Samaria: behold, he is in the vineyard of Naboth, whither he is gone down to possess it. And thou shalt speak unto him, saying, Thus saith the LORD, Hast thou killed, and also taken possession?",
          "source": "1 Kings 21:15-19, The Holy Bible, King James Version (1611); Wikisource, Bible (King James)/1 Kings.",
          "href": "https://en.wikisource.org/wiki/Bible_(King_James)/1_Kings",
          "image": {
            "src": "/covers/appeals-court-epa-climate-grants--a3.png",
            "alt": "Sir Frank Dicksee's painting of Jezebel and Ahab confronted by the prophet Elijah in Naboth's vineyard.",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "Rembrandt's Belshazzar's Feast (about 1636-8) paints the moment a ruler feasting off confiscated treasure is told he has been weighed and found wanting.",
          "excerpt": "Rembrandt catches the instant a ruler learns his warrant has run out. Belshazzar is serving his banquet in the gold vessels his father stripped from the Temple in Jerusalem, and a disembodied hand has just written the verdict on the wall behind him in glowing Hebrew characters: he has been weighed in the balance and found wanting. The king lurches away from the table in his gold cloak, wine flying from the tipped goblets, trapped between the treasure he holds and the judgment being read out over it, and within hours he is dead.",
          "source": "Rembrandt van Rijn, Belshazzar's Feast, about 1636-8, oil on canvas, inventory NG6350; The National Gallery, London (subject taken from Daniel 5:1-5, 25-8).",
          "href": "https://www.nationalgallery.org.uk/paintings/rembrandt-belshazzar-s-feast",
          "image": {
            "src": "/covers/appeals-court-epa-climate-grants--a4.png",
            "alt": "Rembrandt's Belshazzar's Feast: the turbaned king recoils from a glowing Hebrew inscription written on the wall by a disembodied hand as wine spills from a golden goblet.",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "Jacques-Louis David's unfinished Tennis Court Oath records the day in June 1789 when an assembly claimed the right to decide what the state could raise and spend.",
          "excerpt": "David's canvas, four metres by six and a half, freezes the moment a body of representatives decided that it, and not the crown, would settle how France was governed and paid for. Shut out of their hall by the king's officers, hundreds of deputies crowd an indoor tennis court with arms flung toward Bailly on the table, swearing not to separate until they had given the nation a constitution, while wind bursts through the high windows and drives the curtains inward over the throng. Only a few heads were ever worked up in oil; the rest survive as bare outline on raw canvas, so the picture is itself a promise left unfinished.",
          "source": "Jacques-Louis David, Le Serment du Jeu de Paume (The Tennis Court Oath of 20 June 1789), begun 1791 and left unfinished, black and white chalk, charcoal and oil on canvas, 4 x 6.6 m, inventory INV 26182; Musee du Louvre, Departement des Arts graphiques, on long-term loan to the Musee des chateaux de Versailles et de Trianon.",
          "href": "https://collections.louvre.fr/en/ark:/53355/cl020211926",
          "image": {
            "src": "/covers/appeals-court-epa-climate-grants--a5.png",
            "alt": "Jacques-Louis David's unfinished Tennis Court Oath: deputies of the National Assembly stretch their arms toward Bailly standing on a table, drawn in outline on bare canvas.",
            "credit": "Wikimedia Commons"
          }
        }
      ]
    },
    {
      "slug": "phoenix-species-project-200-million",
      "headline": "The Bezos Earth Fund and Re:wild commit $200 million to pull 100 critically endangered species back from extinction in 30 countries",
      "overview": "The Phoenix Species Project splits the money evenly between the Bezos Earth Fund and Re:wild, the conservation group co-founded by the actor Leonardo DiCaprio and the biologist Wes Sechrest, with further support from Age of Union and the Todd Graves Family Foundation. The 100 species span mammals, amphibians, reptiles, birds, fish, invertebrates and plants, and each is promised five years of sustained funding rather than short grant cycles. The organisers call it the largest single philanthropic effort aimed at recovering critically endangered species.",
      "genre": "Climate",
      "sources": [
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMiyAFBVV95cUxQeExjeGZMeWlJdk5sR0owNFNuN3BBNkdqODhpcEdjbUgyQ29PdU9Xd2NuX2puc1JVdDdSYTBPS295bjA1dG1sOUE1QU1GLUNXcE5ZSDBCa3JhZ2pQa2FmenhSTkdEV2pITWtNWmhmb2lkdUJ4SGpmMzJxc3psUGFXYk5wVmdlcFRIS09ENzJSbG9tRVBRMmdReGF1ZnY1eUJ3OXd0bDJ0Zi1za18xYmx4SVF6d3NaU0w5OUs5WEJtdk5qMndrcEpSag?oc=5"
        },
        {
          "name": "AP",
          "href": "https://news.google.com/rss/articles/CBMitgFBVV95cUxNSGNFQXhfakZNRGtMV0FONW5kZlQwNENpbFlWbGozeUlWVkdBT2g4c1VwZWNVR2pXa25zOTFRQlV2WlJRcGVTLTV0OE1USElMLTdrbEZYUXNXRnp3QkJNZTUzU0RRaWNUc0pDMHVLTF9xZGtQODg4b2loLWpNeUdQTEhBMkRDUVdwa01LX2dfRmtMOC1vRDJtby1zM1cxT2VyNXlkRHM3TFo0X2RrYWJOQTdDNk1Bdw?oc=5"
        }
      ],
      "href": "#",
      "publishedAt": "2026-08-04",
      "image": {
        "src": "/covers/phoenix-species-project-200-million.png",
        "alt": "A vaquita, the world's most endangered marine mammal, surfacing in the northern Gulf of California.",
        "credit": "Paula Olson, NOAA via Wikimedia Commons"
      },
      "rank": 9,
      "edition": "Evening Edition · 4 August 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Pliny the Elder reports that the last stalk of silphium, the plant whose sap once sold for its weight in silver, was found in Cyrenaica and sent as a curiosity to the Emperor Nero (Natural History, published c. AD 77)",
          "excerpt": "Next to these, laserpitium claims our notice, a very remarkable plant, known to the Greeks by the name of \"silphion,\" and originally a native of the province of Cyrenaica. The juice of this plant is called \"laser,\" and it is greatly in vogue for medicinal as well as other purposes, being sold at the same rate as silver. For these many years past, however, it has not been found in Cyrenaica, as the farmers of the revenue who hold the lands there on lease, have a notion that it is more profitable to depasture flocks of sheep upon them. Within the memory of the present generation, a single stalk is all that has ever been found there, and that was sent as a curiosity to the Emperor Nero.",
          "source": "Pliny the Elder, Natural History, Book XIX, chapter 15 (\"Laserpitium, Laser, and Maspetum\"), trans. John Bostock and H. T. Riley (London: Taylor and Francis, 1855); Perseus Digital Library, Tufts University.",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.02.0137%3Abook%3D19%3Achapter%3D15",
          "image": {
            "src": "/covers/phoenix-species-project-200-million--a0.png",
            "alt": "Silver tetradrachm of Kyrene, c. 435-330 BC, showing the silphium plant on the obverse and the head of Zeus Ammon on the reverse; Berlin Münzkabinett",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "historical",
          "title": "William T. Hornaday's 1889 Smithsonian report on the extermination of the American bison, which called for the surviving animals to be bought, gathered and bred in a new National Zoological Park funded with $200,000",
          "excerpt": "The Fiftieth Congress, at its last session, responded to the call made upon it, and voted $200,000 for the establishment of a National Zoological Park in the District of Columbia on a grand scale. One of the leading purposes it is destined to serve is the preservation and breeding in comfortable, and so far as space is concerned, luxurious captivity of a number of fine specimens of every species of American quadruped now threatened with extermination.",
          "source": "William T. Hornaday, The Extermination of the American Bison, with a Sketch of Its Discovery and Life History (Washington: Smithsonian Institution, Report of the National Museum, 1889), Part II, section VII, \"Preservation of the Species from Absolute Extinction\"; Project Gutenberg eBook no. 17748.",
          "href": "https://www.gutenberg.org/files/17748/17748-h/17748-h.htm",
          "image": {
            "src": "/covers/phoenix-species-project-200-million--a1.png",
            "alt": "Photograph taken in 1892 of a man standing on a mountain of American bison skulls awaiting grinding for fertiliser at the Michigan Carbon Works, Rougeville, Michigan",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "literary",
          "title": "The instruction to Noah in the Book of Genesis to bring two of every living creature into the ark and to lay up food enough to keep them alive through the flood",
          "excerpt": "And of every living creature of all flesh, thou shalt bring two of a sort into the ark, that they may live with thee: of the male sex, and the female. Of fowls according to their kind, and of beasts in their kind, and of every thing that creepeth on the earth according to its kind: two of every sort shall go in with thee, that they may live. Thou shalt take unto thee of all food that may be eaten, and thou shalt lay it up with thee: and it shall be food for thee and them.",
          "source": "Genesis 6:19-21, The Holy Bible, Douay-Rheims translation (Challoner revision); Wikisource.",
          "href": "https://en.wikisource.org/wiki/Bible_(Douay-Rheims)/Genesis",
          "image": {
            "src": "/covers/phoenix-species-project-200-million--a2.png",
            "alt": "Edward Hicks, Noah's Ark, 1846, oil on canvas, showing pairs of animals filing toward the ark; Philadelphia Museum of Art",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "literary",
          "title": "Ovid's account of the phoenix, the single bird that renews itself by dying in a nest of cinnamon and myrrh, from Book XV of the Metamorphoses (c. AD 8)",
          "excerpt": "Now these I named derive their origin from other living forms. There is one bird which reproduces and renews itself: the Assyrians gave this bird his name—the Phoenix. He does not live either on grain or herbs, but only on small drops of frankincense and juices of amomum. When this bird completes a full five centuries of life straightway with talons and with shining beak he builds a nest among palm branches, where they join to form the palm tree's waving top. As soon as he has strewn in this new nest the cassia bark and ears of sweet spikenard, and some bruised cinnamon with yellow myrrh, he lies down on it and refuses life among those dreamful odors.—And they say that from the body of the dying bird is reproduced a little Phoenix which is destined to live just as many years.",
          "source": "Ovid, Metamorphoses, Book XV, lines 391-407 (the speech of Pythagoras), trans. Brookes More (Boston: Cornhill Publishing Co., 1922); Perseus Digital Library, Tufts University.",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.02.0028%3Abook%3D15%3Acard%3D391",
          "image": {
            "src": "/covers/phoenix-species-project-200-million--a3.png",
            "alt": "Illuminated miniature of the phoenix rising in flames beneath the sun, from the Aberdeen Bestiary, c. 1200, Aberdeen University Library MS 24",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "Jan Brueghel the Elder's painting The Entry of the Animals into Noah's Ark (1613), an inventory in oil of every creature then known to Europe",
          "excerpt": "Brueghel crowds a single small panel with the whole of creation on the move: macaws and parrots perched in a dead tree, lions and leopards stretched out on the grass, ostriches, camels, porcupines, swans and guinea pigs pressing toward the small ark on the horizon. Painted in Antwerp at the height of the age of exploration, it is a picture of biological plenty assembled by a wealthy court painter for wealthy collectors, with the flood already implied in the darkening sky. Several of the birds and beasts he set down from life in the archducal menagerie were species Europe had known for barely a generation.",
          "source": "Jan Brueghel the Elder (Flemish, 1568-1625), The Entry of the Animals into Noah's Ark, 1613, oil on panel, 54.6 × 83.8 cm, J. Paul Getty Museum, Los Angeles, accession no. 92.PB.82.",
          "href": "https://www.getty.edu/art/collection/object/103RJT",
          "image": {
            "src": "/covers/phoenix-species-project-200-million--a4.png",
            "alt": "Jan Brueghel the Elder, The Entry of the Animals into Noah's Ark, 1613, oil on panel; birds, big cats, horses and livestock gathered in a wooded landscape as Noah leads them toward the ark",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "Joseph Haydn's oratorio Die Schöpfung (The Creation), Hob. XXI:2, first performed in Vienna in 1798-99, which sets the making of every living kind to music",
          "excerpt": "Haydn's Part II is a musical bestiary: the orchestra roars for the lion, bounds for the tiger and stag, drags its lowest notes along the ground for the worm, and lifts into birdsong for the eagle, the lark and the cooing doves, before the chorus blesses everything that lives and bids it be fruitful and multiply. The oratorio was itself a work of patronage, commissioned and underwritten by a syndicate of Viennese noblemen, and Haydn conducted charity performances of it for the rest of his life. At the last of them, in March 1808, the frail composer was carried into the hall in an armchair to hear his catalogue of creatures sung back to him.",
          "source": "Joseph Haydn, Die Schöpfung (The Creation), Hob. XXI:2, libretto by Gottfried van Swieten after Genesis, Milton and the Psalms; full score and parts, IMSLP / Petrucci Music Library.",
          "href": "https://imslp.org/wiki/Die_Sch%C3%B6pfung,_Hob.XXI:2_(Haydn,_Joseph)",
          "image": {
            "src": "/covers/phoenix-species-project-200-million--a5.png",
            "alt": "Balthasar Wigand's gouache of the performance of Haydn's The Creation in the hall of the University of Vienna on 27 March 1808, with the aged Haydn seated in the foreground",
            "credit": "Wikimedia Commons"
          }
        }
      ]
    },
    {
      "slug": "fuego-volcano-eruption-evacuations",
      "headline": "Guatemala raises its second-highest alert and evacuates 659 people from eight villages as the Fuego volcano erupts",
      "overview": "Lava fountains 200 to 300 metres high formed over the crater and ash plumes rose about six kilometres into the air after the eruption began on Monday morning and intensified through the day. National Route 14, which passes close to the volcano some 35km from Guatemala City, was closed and the Education Ministry suspended classes in nearby towns. Officials expected about ten more communities to be evacuated.",
      "genre": "Science",
      "sources": [
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMiwgFBVV95cUxPa1JSZThSQXJtM2VFb3RwSGp4dTY2ampYVVBlUk1LR3hGMTRiRHQtYjhRS1BHVnZ6TU12M1A5SVBTUkZfSm1feW1ROXpIUXdKR0kwUFNQNlN1UlpXTTB4cTM1QmN2V2dlUnp2dUw5N1RsbzdIdFV1MS1kR01IVWdHQVFLXzhtdFAyY3BxOWh2NVJVblVuV2F4aUY3Q2trYldNTjQxYnE1MjhQbFVWc0NJMHAtd1o1N1N3dERkcnhwWU96dw?oc=5"
        },
        {
          "name": "AP",
          "href": "https://news.google.com/rss/articles/CBMipgFBVV95cUxPbF9mMWV4WFZuV1plYmgtZU1SZUtuY2xCaExLZWVYbTZjcFpLMDhLUExRaVNBbWlKSFBZajZPRTFLU3VFaUYwcmZUdTFGQkRpaEptMkFfbnZuSGY5bHJ5QnI2aWNGbTROWlMxcEV1Sm5oMjZoREJwcEctSW56OFFvVkJQcjM2a28zYk4wdHVIbF9teUloRG9xdzVuX3ZsVnQxYlBFVFNn?oc=5"
        }
      ],
      "href": "#",
      "publishedAt": "2026-08-04",
      "image": {
        "src": "/covers/fuego-volcano-eruption-evacuations.png",
        "alt": "The Volcan de Fuego in Guatemala erupting at night, incandescent rock streaming down its flanks beneath a glowing ash plume.",
        "credit": "Kieran Wood, University of Bristol via Wikimedia Commons"
      },
      "rank": 10,
      "edition": "Evening Edition · 4 August 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Pliny the Younger describes abandoning Misenum on foot and turning off the high road as ash fell and the sky went black during the eruption of Vesuvius in AD 79",
          "excerpt": "The ashes now began to fall upon us, though in no great quantity. I looked back; a dense dark mist seemed to be following us, spreading itself over the country like a cloud. \"Let us turn out of the high-road,\" I said, \"while we can still see, for fear that, should we fall in the road, we should be pressed to death in the dark, by the crowds that are following us.\" We had scarcely sat down when night came upon us, not such as we have when the sky is cloudy, or when there is no moon, but that of a room when it is shut up, and all the lights put out.",
          "source": "Pliny the Younger, Letters, Book VI, Letter 20, to Cornelius Tacitus (numbered LXVI in this edition), translated by William Melmoth and revised by F. C. T. Bosanquet; Letters of Pliny, Project Gutenberg eBook 2811.",
          "href": "https://www.gutenberg.org/files/2811/2811-h/2811-h.htm",
          "image": {
            "src": "/covers/fuego-volcano-eruption-evacuations--a0.png",
            "alt": "Pierre-Henri de Valenciennes, The Eruption of Vesuvius on 24 August AD 79 (1813), oil on canvas, Musee des Augustins, Toulouse: a red fire fountain above the cone, black ash clouds over the bay and figures sheltering among ruins in the foreground.",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "historical",
          "title": "The Rajah of Sang'ir's eyewitness report of the eruption of Mount Tambora on Sumbawa, 10 April 1815, which destroyed all but one of the villages on the mountain",
          "excerpt": "About 7 p. m. on the 10th of April, three distinct columns of flame burst forth near the top of the Tomboro mountain (all of them apparently within the verge of the crater), and after ascending separately to a very great height, their tops united in the air in a troubled confused manner. In a short time, the whole mountain next Sang'ir appeared like a body of liquid fire, extending itself in every direction. The fire and columns of flame continued to rage with unabated fury, until the darkness caused by the quantity of falling matter obscured it at about 8 p. m. Stones, at this time, fell very thick at Sang'ir; some of them as large as two fists, but generally not larger than walnuts. Between 9 and 10 p. m. ashes began to fall,",
          "source": "Lieutenant Owen Phillips, report dated at Bima, Sumbawa (1815), transmitting the account of the Rajah of Sang'ir; printed in Sir Thomas Stamford Raffles, The History of Java, 2nd edition (London: John Murray, 1830), vol. I, note 26 on the eruption of the Tomboro mountain; Project Gutenberg eBook 49843.",
          "href": "https://www.gutenberg.org/cache/epub/49843/pg49843-images.html",
          "image": {
            "src": "/covers/fuego-volcano-eruption-evacuations--a1.png",
            "alt": "Astronaut photograph of the six-kilometre-wide summit caldera of Mount Tambora, Sumbawa, Indonesia, left behind when the mountain's peak was blown away in the eruption of April 1815 (NASA Earth Observatory).",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "literary",
          "title": "Virgil's Aeneid describes Aeneas and his crew anchored beneath a thundering Mount Etna that throws up pitchy cloud, hot embers and massy rocks",
          "excerpt": "The port capacious, and secure from wind,\nIs to the foot of thund'ring Aetna join'd.\nBy turns a pitchy cloud she rolls on high;\nBy turns hot embers from her entrails fly,\nAnd flakes of mounting flames, that lick the sky.\nOft from her bowels massy rocks are thrown,\nAnd, shiver'd by the force, come piecemeal down.\nOft liquid lakes of burning sulphur flow,\nFed from the fiery springs that boil below.",
          "source": "Virgil, Aeneid, Book III, lines 570-582 (Latin), in the verse translation of John Dryden (1697); Perseus Digital Library, Tufts University.",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.02.0052%3Abook%3D3%3Acard%3D570",
          "image": {
            "src": "/covers/fuego-volcano-eruption-evacuations--a2.png",
            "alt": "Thomas Cole, Mount Etna from Taormina (1843), oil on canvas: the snow-capped volcano trailing a thin plume of smoke above the ruins of the Greek theatre and the Sicilian coastal plain.",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "literary",
          "title": "Edward Bulwer-Lytton's The Last Days of Pompeii (1834) imagines the townspeople wading through knee-deep ash along streets blocked by fallen rock",
          "excerpt": "The ashes in many places were already knee-deep; and the boiling showers which came from the steaming breath of the volcano forced their way into the houses, bearing with them a strong and suffocating vapor. In some places, immense fragments of rock, hurled upon the house roofs, bore down along the streets masses of confused ruin, which yet more and more, with every hour, obstructed the way; and, as the day advanced, the motion of the earth was more sensibly felt—the footing seemed to slide and creep—nor could chariot or litter be kept steady, even on the most level ground.",
          "source": "Edward Bulwer-Lytton, The Last Days of Pompeii (1834), Book the Fifth, Chapter VII, \"The Progress of the Destruction\"; Project Gutenberg eBook 1565.",
          "href": "https://www.gutenberg.org/files/1565/1565-h/1565-h.htm",
          "image": {
            "src": "/covers/fuego-volcano-eruption-evacuations--a3.png",
            "alt": "Karl Bryullov, The Last Day of Pompeii (1830-1833), oil on canvas, State Russian Museum, Saint Petersburg: crowds fleeing under a black ash cloud lit by lightning as statues topple from a temple roof. The painting was seen by Bulwer-Lytton in Milan and inspired his novel.",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "Frederic Edwin Church paints Cotopaxi (1855), the Andean volcano smoking quietly above a hacienda and the valley that lives beneath it",
          "excerpt": "Church painted the great Ecuadorian cone from a hacienda on the plain below, where he had waited a whole day for the clouds to lift. The mountain is at rest: only a single thin thread of smoke leaks from the summit into a clear morning sky, while cattle, a stream and a whitewashed farmstead occupy the warm foreground. The picture is a portrait of the ordinary life that goes on directly under a volcano, with the reminder of what the mountain is written in one small plume of vapour.",
          "source": "Frederic Edwin Church, Cotopaxi, 1855, oil on canvas, 28 x 42 in. (71.1 x 106.8 cm), Smithsonian American Art Museum, gift of Mrs. Frank R. McCoy, accession no. 1965.12.",
          "href": "https://americanart.si.edu/artwork/cotopaxi-4807",
          "image": {
            "src": "/covers/fuego-volcano-eruption-evacuations--a4.png",
            "alt": "Frederic Edwin Church, Cotopaxi (1855), oil on canvas, Smithsonian American Art Museum: the snow-covered volcano releasing a single plume of smoke above a broad green valley with a hacienda and travellers in the right foreground.",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "The closing stage direction of Auber's opera La Muette de Portici (Paris, 29 February 1828) brings Vesuvius to life on stage, erupting over a prostrate crowd",
          "excerpt": "En ce moment le Vésuve commence à jeter des tourbillons de flamme et de fumée, et Fenella parvenue au haut de la terrasse, comtemple cet effrayant spectacle. Elle s’arrête, et détache son écharpe la jette du côté d’Alphonse, lève les yeux au ciel et se précipite dans l’abîme. (Alphonse et Elvire poussent un cri d’effroi. Mais au même instant, le Vésuve rugit avec plus de fureur ; du cratère du volcan la lave enflammé se précipite. Le peuple épouvanté se prosterne.)",
          "source": "Eugène Scribe and Germain Delavigne, libretto of La Muette de Portici, opéra en cinq actes, music by Daniel-François-Esprit Auber, first performed at the Académie royale de musique, Paris, 29 February 1828; Act V, scene 7, final stage direction. French Wikisource (full score, E. Troupenas, Paris, 1828, at IMSLP).",
          "href": "https://fr.wikisource.org/wiki/La_Muette_de_Portici",
          "image": {
            "src": "/covers/fuego-volcano-eruption-evacuations--a5.png",
            "alt": "Nineteenth-century engraving of the volcanic eruption scene that ends Auber's La Muette de Portici, showing Vesuvius smoking behind the stage architecture as the crowd scatters, reproduced in Germain Bapst, Essai sur l'histoire du théâtre (1893).",
            "credit": "Wikimedia Commons"
          }
        }
      ]
    },
    {
      "slug": "congo-ebola-1707-deaths-ituri",
      "headline": "Ebola has killed 1,707 people in eastern Congo in the fastest-growing outbreak of the disease, with 3,802 cases and no first patient identified",
      "overview": "Ituri province accounts for almost 90% of cases, according to the latest government update. Jean Kaseya, director-general of the Africa CDC, said nearly 80% of new cases are surfacing through community spread rather than contact tracing. The response is hampered by a funding gap, attacks on health centres, the continuing conflict in the east and mistrust among local communities.",
      "genre": "Science",
      "sources": [
        {
          "name": "AP",
          "href": "https://news.google.com/rss/articles/CBMigwFBVV95cUxOS2NlUWpWemNHaS1rTkN1MWh0Z2tIR01xbVFZeEk0ZUhhWVg3NTIyWktxY1FzSWR4QWFMR2JvdWJLX2wxUnVOblMwSEtPeUpOcF9xZWp6S0I2aTczOGJTcEpmWjVLVlRZWVVNTkZydi1HSU1tZDZFQndMNEF4S1VVNl9mOA?oc=5"
        },
        {
          "name": "STAT",
          "href": "https://www.statnews.com/2026/08/04/ebola-1700-deaths-eastern-congo-fastest-growing-outbreak/"
        }
      ],
      "href": "#",
      "publishedAt": "2026-08-04",
      "image": {
        "src": "/covers/congo-ebola-1707-deaths-ituri.png",
        "alt": "An Ebola treatment unit, its wards laid out under tarpaulins behind orange plastic fencing.",
        "credit": "CDC Global via Wikimedia Commons"
      },
      "rank": 11,
      "edition": "Evening Edition · 4 August 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "The plague that struck Athens in 430 BC, in the second year of the Peloponnesian War, killed the doctors who treated it and could never be traced to its origin",
          "excerpt": "Not many days after their arrival in Attica the plague first began to show itself among the Athenians. It was said that it had broken out in many places previously in the neighbourhood of Lemnos and elsewhere; but a pestilence of such extent and mortality was nowhere remembered. Neither were the physicians at first of any service, ignorant as they were of the proper way to treat it, but they died themselves the most thickly, as they visited the sick most often; nor did any human art succeed any better. Supplications in the temples, divinations, and so forth were found equally futile, till the overwhelming nature of the disaster at last put a stop to them altogether.",
          "source": "Thucydides, History of the Peloponnesian War, Book 2, chapter 47, translated by Richard Crawley (London, 1874); text hosted by Wikisource.",
          "href": "https://en.wikisource.org/wiki/History_of_the_Peloponnesian_War/Book_2",
          "image": {
            "src": "/covers/congo-ebola-1707-deaths-ituri--a0.png",
            "alt": "Michael Sweerts, Plague in an Ancient City, oil on canvas, about 1652-54, Los Angeles County Museum of Art: corpses and dying figures spread across the steps and streets of a classical city, a scene usually associated with Thucydides' plague of Athens.",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "historical",
          "title": "Samuel Pepys records on 31 August 1665 that London's official plague count was thousands of deaths short of the true toll",
          "excerpt": "Thus this month ends with great sadness upon the publick, through the greatness of the plague every where through the kingdom almost. Every day sadder and sadder news of its encrease. In the City died this week 7,496 and of them 6,102 of the plague. But it is feared that the true number of the dead, this week is near 10,000; partly from the poor that cannot be taken notice of, through the greatness of the number, and partly from the Quakers and others that will not have any bell ring for them.",
          "source": "Samuel Pepys, Diary, entry for 31 August 1665, in Diary of Samuel Pepys - Volume 37: August 1665, transcribed by Mynors Bright and edited by Lord Braybrooke and Henry B. Wheatley; Project Gutenberg ebook no. 4158.",
          "href": "https://www.gutenberg.org/cache/epub/4158/pg4158-images.html",
          "image": {
            "src": "/covers/congo-ebola-1707-deaths-ituri--a1.png",
            "alt": "A printed London Bill of Mortality for the week of 25 April to 2 May 1665, listing parish by parish the causes of death and the number buried, from the Wellcome Collection.",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "literary",
          "title": "In Sophocles' Oedipus the King (about 429 BC) a plague-stricken Thebes hunts for the untraceable source of its infection, and the search ends inside the palace",
          "excerpt": "OEDIPUS: Where are they? Where in the wide world to find / The far, faint traces of a bygone crime? CREON: In this land, said the god; “who seeks shall find; / Who sits with folded hands or sleeps is blind.” OEDIPUS: Was he within his palace, or afield, / Or traveling, when Laius met his fate? CREON: Abroad; he started, so he told us, bound / For Delphi, but he never thence returned. OEDIPUS: Came there no news, no fellow-traveler / To give some clue that might be followed up? CREON: But one escape, who flying for dear life, / Could tell of all he saw but one thing sure. OEDIPUS: And what was that? One clue might lead us far, / With but a spark of hope to guide our quest. CREON: Robbers, he told us, not one bandit but / A troop of knaves, attacked and murdered him. OEDIPUS: Did any bandit dare so bold a stroke, / Unless indeed he were suborned from Thebes? CREON: So ’twas surmised, but none was found to avenge / His murder mid the trouble that ensued. OEDIPUS: What trouble can have hindered a full quest, / When royalty had fallen thus miserably? CREON: The riddling Sphinx compelled us to let slide / The dim past and attend to instant needs.",
          "source": "Sophocles, Oedipus the King, prologue (the exchange between Oedipus and Creon), translated by F. Storr, Loeb Classical Library edition (Harvard University Press and William Heinemann, 1912); Project Gutenberg ebook no. 31, Plays of Sophocles: Oedipus the King; Oedipus at Colonus; Antigone.",
          "href": "https://www.gutenberg.org/cache/epub/31/pg31-images.html"
        },
        {
          "category": "literary",
          "title": "Alessandro Manzoni's The Betrothed reconstructs the 1630 plague of Milan, carried in by soldiers, in which strangers were stoned as deliberate spreaders of the disease",
          "excerpt": "These things were not confined to the city; the frenzy was propagated equally with the contagion. The traveller encountered off the high road, the stranger whose habits or appearance were in any respect singular, were judged to be poisoners. At the first intelligence of a new comer, at the cry even of a child, the alarm bell was rung; and the unfortunate persons were assailed with showers of stones, or seized and conducted to prison. And thus the prison itself was, during a certain period, a place of safety.",
          "source": "Alessandro Manzoni, The Betrothed (I promessi sposi), chapter 31, anonymous English translation (London: Richard Bentley, 1834); Project Gutenberg ebook no. 35155.",
          "href": "https://www.gutenberg.org/cache/epub/35155/pg35155-images.html",
          "image": {
            "src": "/covers/congo-ebola-1707-deaths-ituri--a3.png",
            "alt": "Melchiorre Gherardini, Piazza di S. Babila during the plague of 1630 in Milan: carts and monatti carrying away the dead through an emptied city square.",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "Josse Lieferinxe's altarpiece panel of 1497-99 shows a plague city in which the men burying the dead are dying at the graveside",
          "excerpt": "Painted in Marseille for the Confraternity of St Sebastian, the panel shows a legendary seventh-century outbreak at Pavia. In the foreground a gravedigger collapses over the shrouded corpse he is lowering into the ground while priests read the burial service and mourners recoil; overhead an angel and a demon fight for the city, and Sebastian kneels before God to plead for it. It is one of the earliest European paintings to put the burial workers, rather than the saints, at the centre of an epidemic.",
          "source": "Josse Lieferinxe, Saint Sebastian Interceding for the Plague Stricken, 1497-1499, oil on panel, The Walters Art Museum, Baltimore, accession no. 37.1995.",
          "href": "https://art.thewalters.org/object/37.1995/",
          "image": {
            "src": "/covers/congo-ebola-1707-deaths-ituri--a4.png",
            "alt": "Josse Lieferinxe, Saint Sebastian Interceding for the Plague Stricken (1497-99), Walters Art Museum: a gravedigger falls sick beside an open grave as a shrouded plague victim is buried, with an angel and a demon battling in the sky above the city.",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "Marcantonio Raimondi's engraving Il Morbetto, after Raphael, about 1515-16, pictures Virgil's plague as a disaster whose cause has to be read out of a dream",
          "excerpt": "The print illustrates the pestilence in Book 3 of the Aeneid, which falls on the Trojans after they misread the oracle of Apollo and settle on Crete. On the right, men and beasts die together in the dark of a colonnaded street, a mother slumped beside her child; on the left a torchbearer lights the scene while Aeneas, asleep, is told in a vision what the true origin of the sickness was. The inscription on the pedestal, linquebant dulces animas, aut aegra trahebant corpora, marks the moment when the dying outnumber those who can explain them.",
          "source": "Marcantonio Raimondi (Italian, ca. 1480-before 1534), after Raphael, Il Morbetto (The Plague of Phrygia), engraving, ca. 1515-16, The Metropolitan Museum of Art, New York, accession no. 17.37.156, Gift of Henry Walters, 1917. Image: the impression in the National Gallery of Art, Washington (NGA 654).",
          "href": "https://www.metmuseum.org/art/collection/search/342675",
          "image": {
            "src": "/covers/congo-ebola-1707-deaths-ituri--a5.png",
            "alt": "Il Morbetto, engraving by Marcantonio Raimondi after Raphael, about 1515-16: dying figures and dead animals in a shadowed street, with a torchbearer at left and the sleeping Aeneas receiving a vision.",
            "credit": "Wikimedia Commons"
          }
        }
      ]
    },
    {
      "slug": "bayreuth-ai-ring-cycle-boos",
      "headline": "An artificial-intelligence staging of Wagner's Ring draws boos at the Bayreuth Festival's 150th anniversary",
      "overview": "The production, titled '10010110' - 150 written in binary - and subtitled 'From Myth to Code', combined about a dozen AI models and used Stable Diffusion to generate imagery from the 1876 designs of Gotthold and Max Bruckner, then to select images to match the text and the music. Singers stood, often motionless, between two screens measuring 20 by 60 metres, across 14 and a half hours over four nights. The conductor Christian Thielemann and the cast drew a 17-minute ovation, but roughly 30 seconds of boos and whistles greeted the production team at their bows.",
      "genre": "Culture",
      "sources": [
        {
          "name": "AP",
          "href": "https://news.google.com/rss/articles/CBMimwFBVV95cUxQTXVMYU9JZ19uNGFHT3FNcEdzVkIxNF9BcGpQWFo3OEw0N19lbDVWeU5feEczVENuWVdIQUtiM1ZSa0hDT2RnWFVyVTJwX3BDaFBFbmEyUnIwTVJ6ZmpnUl9VR3lRTmtVT3RpaHIzVTBBRmVfSXRFYTh4X0tVNXgxS1BzLWVEbnJiSGpOZDlrX1BXOE53Wkp5cnIzMA?oc=5"
        },
        {
          "name": "WRAL",
          "href": "https://www.wral.com/news/ap/6fd2a-ai-driven-ring-cycle-sparks-boos-at-150th-anniversary-wagner-festival/"
        }
      ],
      "href": "#",
      "publishedAt": "2026-08-04",
      "image": {
        "src": "/covers/bayreuth-ai-ring-cycle-boos.png",
        "alt": "The Bayreuth Festspielhaus, the brick opera house Wagner built for the Ring, seen across its forecourt.",
        "credit": "Wikimedia Commons"
      },
      "rank": 12,
      "edition": "Evening Edition · 4 August 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "In AD 66-67 the emperor Nero sang in the theatres of Greece with the doors barred, and no one in the audience was allowed to leave until he had finished",
          "excerpt": "While he was singing no one was allowed to leave the theatre even for the most urgent reasons. And so it is said that some women gave birth to children there, while many who were worn out with listening and applauding, secretly leaped from the wall, since the gates at the entrance were closed, or feigned death and were carried out as if for burial. The trepidation and anxiety with which he took part in the contests, his keen rivalry of his opponents and his awe of the judges, can hardly be credited.",
          "source": "Gaius Suetonius Tranquillus, The Lives of the Twelve Caesars, \"Nero\", chapter 23, translated by J. C. Rolfe (Loeb Classical Library, London: William Heinemann / New York: Macmillan, 1914); transcription hosted by Wikisource.",
          "href": "https://en.wikisource.org/wiki/The_Lives_of_the_Twelve_Caesars/Nero",
          "image": {
            "src": "/covers/bayreuth-ai-ring-cycle-boos--a0.png",
            "alt": "Roman marble portrait head of the emperor Nero, Glyptothek, Munich (inv. 321)",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "historical",
          "title": "In 1843 Ada Lovelace published the first prediction that a machine, Babbage's Analytical Engine, might compose music of any degree of complexity",
          "excerpt": "Again, it might act upon other things besides number, were objects found whose mutual fundamental relations could be expressed by those of the abstract science of operations, and which should be also susceptible of adaptations to the action of the operating notation and mechanism of the engine. Supposing, for instance, that the fundamental relations of pitched sounds in the science of harmony and of musical composition were susceptible of such expression and adaptations, the engine might compose elaborate and scientific pieces of music of any degree of complexity or extent.",
          "source": "Augusta Ada Lovelace, \"Notes by the Translator\", Note A, appended to L. F. Menabrea, \"Sketch of the Analytical Engine invented by Charles Babbage, Esq.\", in Scientific Memoirs, Selected from the Transactions of Foreign Academies of Science and Learned Societies, vol. 3 (London: Richard and John E. Taylor, 1843), pp. 666-731; transcription hosted by Wikisource.",
          "href": "https://en.wikisource.org/wiki/Scientific_Memoirs/3/Sketch_of_the_Analytical_Engine_invented_by_Charles_Babbage,_Esq./Notes_by_the_Translator",
          "image": {
            "src": "/covers/bayreuth-ai-ring-cycle-boos--a1.png",
            "alt": "Detail of Margaret Sarah Carpenter's 1836 portrait of Ada King, Countess of Lovelace",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "literary",
          "title": "Aristotle's Poetics ranks spectacle last among the parts of tragedy and hands it to the costumier rather than the poet",
          "excerpt": "Of the other elements which \"enrich\" tragedy the most important is song-making. Spectacle, while highly effective, is yet quite foreign to the art and has nothing to do with poetry. Indeed the effect of tragedy does not depend on its performance by actors, and, moreover, for achieving the spectacular effects the art of the costumier is more authoritative than that of the poet.",
          "source": "Aristotle, Poetics 1450b, in Aristotle in 23 Volumes, vol. 23, translated by W. H. Fyfe (Cambridge, MA: Harvard University Press; London: William Heinemann, 1932); Perseus Digital Library, Tufts University.",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0056:section%3D1450b",
          "image": {
            "src": "/covers/bayreuth-ai-ring-cycle-boos--a2.png",
            "alt": "Roman mosaic of a tragic and a comic theatrical mask, 2nd century AD, Capitoline Museums, Rome",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "literary",
          "title": "The Engine of Lagado in Swift's Gulliver's Travels (1726) writes books by mechanically recombining every word in the language",
          "excerpt": "Every one knew how laborious the usual method is of attaining to arts and sciences; whereas, by his contrivance, the most ignorant person, at a reasonable charge, and with a little bodily labour, might write books in philosophy, poetry, politics, laws, mathematics, and theology, without the least assistance from genius or study.” He then led me to the frame, about the sides, whereof all his pupils stood in ranks. It was twenty feet square, placed in the middle of the room. The superficies was composed of several bits of wood, about the bigness of a die, but some larger than others. They were all linked together by slender wires.",
          "source": "Jonathan Swift, Travels into Several Remote Nations of the World (Gulliver's Travels), Part III, \"A Voyage to Laputa, Balnibarbi, Luggnagg, Glubbdubdrib, and Japan\", chapter 5 (London: Benjamin Motte, 1726); Project Gutenberg eBook no. 829.",
          "href": "https://www.gutenberg.org/files/829/829-h/829-h.htm",
          "image": {
            "src": "/covers/bayreuth-ai-ring-cycle-boos--a3.png",
            "alt": "Frontispiece portrait of Captain Lemuel Gulliver and the title page of the 1726 first edition of Gulliver's Travels, printed for Benjamin Motte",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "William Hogarth's print Masquerades and Operas (1724) shows Shakespeare and Congreve wheeled away as waste paper while London crowds into opera and pantomime",
          "excerpt": "Hogarth's first independently published satire stages the quarrel between spectacle and drama as a street scene. On the left a fool and a devil drag a rope of masqueraders into the Haymarket opera house, where a banner reading \"Pray Accept 8000l.\" hangs over a platform of Italian singers; on the right a crowd presses in to see the pantomime Doctor Faustus. Between them a small figure trundles a wheelbarrow labelled \"Waste paper for shops\", loaded with the bound volumes of Congreve, Dryden, Otway, Shakespeare and Ben Jonson, while Lord Burlington's new \"Accademy of Arts\" rises behind with William Kent enthroned on the pediment above Michelangelo and Raphael.",
          "source": "William Hogarth, Masquerades and Operas, 1724, etching and engraving, second state of three, sheet 12.5 x 17.5 cm, accession no. 32.35(80), Harris Brisbane Dick Fund, 1932, Department of Drawings and Prints, The Metropolitan Museum of Art, New York.",
          "href": "https://www.metmuseum.org/art/collection/search/396309",
          "image": {
            "src": "/covers/bayreuth-ai-ring-cycle-boos--a4.png",
            "alt": "William Hogarth's 1724 etching Masquerades and Operas, with a wheelbarrow of Shakespeare, Dryden and Congreve labelled 'Waste paper for shops'",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "Wagner's own first complete Ring, at the opening of the Bayreuth Festspielhaus in August 1876, was acclaimed as music and derided as scenery",
          "excerpt": "The four dramas of Der Ring des Nibelungen were given complete for the first time at Bayreuth between 13 and 17 August 1876, in a theatre Wagner had built for that single purpose, with the orchestra sunk out of sight beneath the stage. The music and the players carried the occasion; the scenery did not. The swimming machines that carried the Rhinemaidens, the steam that failed to hide the scene changes and the papier-mache dragon Fafner, whose neck had gone astray in transit, were mocked by visiting critics, and Wagner is reported to have told his singers afterwards that next year everything would be done differently. The painted illusion the festival was built on became, almost immediately, the part of it that its own creator wanted to disown.",
          "source": "Richard Wagner, Das Rheingold, WWV 86A, first part of Der Ring des Nibelungen; first-edition full score (Mainz: B. Schott's Sohne, 1873), first complete cycle performed at the Bayreuth Festspielhaus, 13-17 August 1876; International Music Score Library Project / Petrucci Music Library.",
          "href": "https://imslp.org/wiki/Das_Rheingold,_WWV_86A_(Wagner,_Richard)",
          "image": {
            "src": "/covers/bayreuth-ai-ring-cycle-boos--a5.png",
            "alt": "Contemporary engraving of the packed auditorium of the Bayreuth Festspielhaus during a performance of Das Rheingold in 1876",
            "credit": "Wikimedia Commons"
          }
        }
      ]
    },
    {
      "slug": "ninth-circuit-perplexity-amazon-agents",
      "headline": "A US appeals court lifts the ban on Perplexity's AI shopping agent using Amazon, the first appellate ruling on whether AI agents may act for their users",
      "overview": "The Ninth Circuit in San Francisco overturned a preliminary injunction, holding that Amazon was unlikely to succeed on its claim that Perplexity's agents violated the federal Computer Fraud and Abuse Act. The court reasoned that the tool itself does not access Amazon's computers - the users do, with the agent's help. Amazon sued in November, accusing Perplexity of covertly reaching into customer accounts through its Comet browser to place orders on their behalf.",
      "genre": "Technology",
      "sources": [
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMitwFBVV95cUxQWUdUaG1LOUY4WU1sbWdYSlR1UlRpbEpUeXZDTkVJU0s0RXZNR0wtN1Y2akJscWZtZ3NXZlZXaWNJZWpUdVlHdjFlUmItRDE5dm82RG5FWTc1N20xcTRlVUpvZjlGM3pmZ01GUUc0R21fTXZxWkk2akNYNXNtSEVrQTlsd2FTTFdKM1NNd19oTnlWc1ItYV81eDZZSS05VHd5QkR4clJzcnE5ci1yMkEyMFY0a2o3V00?oc=5"
        },
        {
          "name": "Bloomberg Law",
          "href": "https://news.bloomberglaw.com/us-law-week/perplexity-overturns-amazon-ban-on-ai-shopping-bot-on-appeal"
        }
      ],
      "href": "#",
      "publishedAt": "2026-08-04",
      "image": {
        "src": "/covers/ninth-circuit-perplexity-amazon-agents.png",
        "alt": "A courtroom in the James R. Browning US Court of Appeals Building in San Francisco, seat of the Ninth Circuit.",
        "credit": "Carol M. Highsmith via Wikimedia Commons"
      },
      "rank": 13,
      "edition": "Evening Edition · 4 August 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Roman praetors give the shop manager power to bind the man who set him up in business: the actio institoria, as codified in Justinian's Institutes of AD 533",
          "excerpt": "On the same principle the praetor grants two other actions, in which the whole amount due may be sued for; that called exercitoria, to recover the debt of a shipmaster, and that called institoria, to recover the debt of a manager or factor. The former lies against a master who has appointed a slave to be captain of a ship, to recover a debt incurred by the slave in his character of captain, and it is called exercitoria, because the person to whom the daily profits of a ship belong is termed an exercitor. The latter lies against a man who has appointed a slave to manage a shop or business, to recover any debt incurred in that business; it is called institoria, because a person appointed to manage a business is termed an institor.",
          "source": "Justinian, Institutes, Book IV, Title VII (\"Of Contracts Made with Persons in Power\"), section 2, translated by J. B. Moyle, 5th edition (Oxford: Clarendon Press, 1913); Project Gutenberg ebook no. 5983.",
          "href": "https://www.gutenberg.org/files/5983/5983-h/5983-h.htm",
          "image": {
            "src": "/covers/ninth-circuit-perplexity-amazon-agents--a0.png",
            "alt": "Folio 27r of the Littera Florentina, the sixth-century manuscript of Justinian's Digest held in the Biblioteca Medicea Laurenziana, Florence, its columns of Roman legal text written in uncial script",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "historical",
          "title": "The US Supreme Court names an actor nobody can see or touch: Chief Justice Marshall's opinion in Trustees of Dartmouth College v. Woodward, 2 February 1819",
          "excerpt": "A corporation is an artificial being, invisible, intangible, and existing only in contemplation of law. Being the mere creature of law, it possesses only those properties which the charter of its creation confers upon it, either expressly, or as incidental to its very existence. These are such as are supposed best calculated to effect the object for which it was created. Among the most important are immortality, and, if the expression may be allowed, individuality; properties, by which a perpetual succession of many persons are considered as the same, and may act as a single individual.",
          "source": "Chief Justice John Marshall, opinion of the Court, Trustees of Dartmouth College v. Woodward, 17 U.S. (4 Wheat.) 518 (1819); transcription of the United States Reports at Wikisource.",
          "href": "https://en.wikisource.org/wiki/Trustees_of_Dartmouth_College_v._Woodward/Opinion_of_the_Court",
          "image": {
            "src": "/covers/ninth-circuit-perplexity-amazon-agents--a1.png",
            "alt": "Portrait of Chief Justice John Marshall in his judicial robes, painted by Henry Inman in 1832",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "literary",
          "title": "Hephaestus is carried about his house by golden handmaidens that think, speak and work for him, in Book 18 of Homer's Iliad",
          "excerpt": "but there moved swiftly to support their lord handmaidens wrought of gold in the semblance of living maids. In them is understanding in their hearts, and in them speech and strength, and they know cunning handiwork by gift of the immortal gods.",
          "source": "Homer, Iliad 18.417-420, translated by A. T. Murray, Loeb Classical Library (Cambridge, MA: Harvard University Press; London: William Heinemann, 1924); Perseus Digital Library, Tufts University.",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0134%3Abook%3D18%3Acard%3D388",
          "image": {
            "src": "/covers/ninth-circuit-perplexity-amazon-agents--a2.png",
            "alt": "Attic red-figure kylix by the Foundry Painter, about 490-480 BC, showing Hephaestus handing the newly made armour of Achilles to Thetis; Antikensammlung, Berlin, F 2294",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "literary",
          "title": "Goethe's apprentice sends a broom to fetch water in his master's name and cannot call it back, in the ballad of 1797",
          "excerpt": "And they run! and wetter still / Grow the steps and grows the hall. / Lord and master, hear me call! / Ever seems the flood to fill, / Ah, he's coming! see, / Great is my dismay! / Spirits raised by me / Vainly would I lay! / \"To the side / Of the room / Hasten, broom, / As of old! / Spirits I have ne'er untied / Save to act as they are told.\"",
          "source": "Johann Wolfgang von Goethe, \"The Pupil in Magic\" (\"Der Zauberlehrling\", 1797), closing stanzas, in the nineteenth-century English verse translation printed in The Works of J. W. von Goethe, vol. 9 (Poems of Goethe); Wikisource.",
          "href": "https://en.wikisource.org/wiki/The_Works_of_J._W._von_Goethe/Volume_9/The_Pupil_in_Magic",
          "image": {
            "src": "/covers/ninth-circuit-perplexity-amazon-agents--a3.png",
            "alt": "Ferdinand Barth's 1882 illustration to Goethe's Der Zauberlehrling, showing the apprentice recoiling as the animated broom carries pails of water through the flooded hall",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "Rembrandt paints the five men licensed to inspect and stamp cloth in the guild's name, 1662",
          "excerpt": "Five sampling officials of the Amsterdam drapers' guild sit behind a table spread with a red carpet, an open ledger before them, the servant standing bare-headed at the back. They are the guild's deputies: their seal on a bale of cloth bound every buyer and seller in the trade, and no draper could sell without their say-so. Rembrandt catches them looking up from the book as though someone had just walked in and challenged them, one man half-risen from his chair, as if the question were by whose authority they act.",
          "source": "Rembrandt van Rijn, The Sampling Officials of the Amsterdam Drapers' Guild, Known as 'The Syndics' (De Staalmeesters), 1662, oil on canvas, 191.5 x 279 cm, object no. SK-C-6, Rijksmuseum, Amsterdam (on loan from the City of Amsterdam).",
          "href": "https://www.rijksmuseum.nl/en/collection/SK-C-6",
          "image": {
            "src": "/covers/ninth-circuit-perplexity-amazon-agents--a4.png",
            "alt": "Rembrandt's 1662 group portrait The Syndics: five drapers' guild officials in black hats behind a carpet-covered table with an open ledger, looking out at the viewer, with a bare-headed servant behind them",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "Offenbach writes an aria for a wind-up doll passed off as a man's daughter: the 'Couplets de l'automate' in Les contes d'Hoffmann, premiered at the Opera-Comique in Paris on 10 February 1881",
          "excerpt": "Spalanzani presents the mechanical Olympia to his guests as his daughter, and she sings for them; the score labels the number the couplets of the automaton. Twice the voice winds down mid-phrase and has to be cranked back up before it can climb again into its coloratura, and the party applauds anyway. Only Hoffmann, who has fallen in love with her, cannot tell that the thing curtseying in front of him is a machine acting out someone else's design.",
          "source": "Jacques Offenbach, Les contes d'Hoffmann (libretto by Jules Barbier), No. 9, Couplets de l'automate: 'Les oiseaux dans la charmille' (Act II), completed by Ernest Guiraud; vocal score, piano reduction by Auguste Bazille, first edition, Paris: Choudens pere et fils, [1881], plate A.C. 5100; IMSLP / Petrucci Music Library.",
          "href": "https://imslp.org/wiki/Les_contes_d%27Hoffmann_(Offenbach,_Jacques)"
        }
      ]
    },
    {
      "slug": "hormuz-cargo-ship-projectile-strike",
      "headline": "A cargo ship is hit by a projectile in the Strait of Hormuz off Oman as Washington and Tehran give conflicting accounts of talks",
      "overview": "The United Kingdom Maritime Trade Operations centre said the vessel reported being struck by an unknown projectile at 2am local time, 37km north-east of Al Khasab in Oman; the British security firm Ambrey said the ship was damaged. President Trump said the two sides were resuming talks to wind down the war, while Iran insisted it was speaking only to Oman, and only about the strait. The waterway carried a fifth of the world's oil and gas before the war and has been effectively shut since February.",
      "genre": "Conflict",
      "sources": [
        {
          "name": "AP",
          "href": "https://news.google.com/rss/articles/CBMiqwFBVV95cUxObXBWcm1tUGMzTS10VXhUNlBaMENHZzBNMnRxVzhQZnEyN3kwSF9Cd0pQUHZLQS11Y0Jpd2tiTGIxRE1WVXNxa3lqWXBiSmdONXFjTkRXb195eThEeEpVYzlZOU1uaTE0d3M1N3Y5NU9IVGpTM0MzUkRjVzA4SnFXTk9RWDhZRzhPc1JZNVhKZUM1ZFBkSk9qeHJsanhpUzdaVUs4UFlMXzVxRE0?oc=5"
        },
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMipgFBVV95cUxOaUY3M2pidURfcVlodzZaVEctbGNSYS1rNlJrR21pQm8yVm50U05QSmRlWURQWWh5UklWZUVMVmlRdzhmbVJrN05IdVNXVW83T3l1TUo0ZjJTMzNURzlOdmNMM2YxY2JwVHQtby1aTFVfZmFnSjRFT0hSaHlzeW50XzNPcUZROG13MUxxNVMwdGd3UkR2cTgyeURHNERQWlUxeFJYR1ln?oc=5"
        }
      ],
      "href": "#",
      "publishedAt": "2026-08-04",
      "image": {
        "src": "/covers/hormuz-cargo-ship-projectile-strike.png",
        "alt": "Cargo ships lying at anchor in hazy grey light off a coast in the Strait of Hormuz, with children wading in the shallows and a fisherman in the foreground.",
        "credit": "AP"
      },
      "rank": 14,
      "edition": "Morning Edition · 4 August 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Athens builds a customs house on the Bosporus and taxes every ship out of the Black Sea, 410 BC",
          "excerpt": "From there they proceeded to Chrysopolis, in Calchedonia, and fortified it, established a custom house in the city, and proceeded to collect the tithe-duty from vessels sailing out of the Pontus; they also left there as a garrison thirty ships and two of the generals, Theramenes and Eumachus, to have charge of the fort, to attend to the outgoing ships, and to harm the enemy in any other way they could.",
          "source": "Xenophon, Hellenica, Book 1, chapter 1, section 22 (events of 410 BC); English translation by Carleton L. Brownson, Xenophon in Seven Volumes, vols. 1-2, Harvard University Press / William Heinemann, 1918-1921. Hosted by the Perseus Digital Library, Tufts University.",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0206%3Abook%3D1%3Achapter%3D1%3Asection%3D22"
        },
        {
          "category": "historical",
          "title": "Woodrow Wilson tells Congress that submarines have made the sea lanes lawless, 2 April 1917",
          "excerpt": "The new policy has swept every restriction aside. Vessels of every kind, whatever their flag, their character, their cargo, their destination, their errand, have been ruthlessly sent to the bottom without warning and without thought of help or mercy for those on board, the vessels of friendly neutrals along with those of belligerents. Even hospital ships and ships carrying relief to the sorely bereaved and stricken people of Belgium, though the latter were provided with safe conduct through the proscribed areas by the German Government itself and were distinguished by unmistakable marks of identity, have been sunk with the same reckless lack of compassion or of principle.",
          "source": "Woodrow Wilson, address to a joint session of Congress, 2 April 1917. Printed in War Messages, 65th Cong., 1st Sess., Senate Doc. No. 5, Serial No. 7264 (Washington, D.C., 1917), pp. 3-8. Transcribed on Wikisource.",
          "href": "https://en.wikisource.org/wiki/Woodrow_Wilson_Urges_Congress_to_Declare_War_on_Germany",
          "image": {
            "src": "/covers/hormuz-cargo-ship-projectile-strike--a1.png",
            "alt": "Painting of a German U-boat on the surface beside a listing merchant steamer, whose crew is rowing away in an open lifeboat across a grey sea.",
            "credit": "Willy Stöwer, Sinking of the Linda Blanche out of Liverpool (1915). Public domain via Wikimedia Commons."
          }
        },
        {
          "category": "literary",
          "title": "Odysseus takes his ship through the narrows and loses six men to the rock",
          "excerpt": "We then sailed on up the narrow strait with wailing. For on one side lay Scylla and on the other divine Charybdis terribly sucked down the salt water of the sea. Verily whenever she belched it forth, like a cauldron on a great fire she would seethe and bubble in utter turmoil, and high over head the spray would fall on the tops of both the cliffs. But as often as she sucked down the salt water of the sea, within she could all be seen in utter turmoil, and round about the rock roared terribly, while beneath the earth appeared black with sand; and pale fear seized my men.",
          "source": "Homer, Odyssey, Book 12, lines 234-243; The Odyssey with an English Translation by A. T. Murray, 2 vols., Harvard University Press / William Heinemann, 1919. Hosted by the Perseus Digital Library, Tufts University.",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0136%3Abook%3D12%3Acard%3D234",
          "image": {
            "src": "/covers/hormuz-cargo-ship-projectile-strike--a2.png",
            "alt": "Dark oil painting of Odysseus braced in the stern of his ship between the many-headed monster Scylla above and the whirlpool Charybdis below, his crew flailing around him.",
            "credit": "Henry Fuseli (Johann Heinrich Füssli), Odysseus before Scylla and Charybdis (1794-1796), Aargauer Kunsthaus, Aarau. Public domain via Wikimedia Commons."
          }
        },
        {
          "category": "literary",
          "title": "A Venetian merchant's friend cannot look at an hourglass without seeing a cargo ship go down",
          "excerpt": "I should not see the sandy hour-glass run / But I should think of shallows and of flats, / And see my wealthy Andrew dock'd in sand / Vailing her high-top lower than her ribs / To kiss her burial. Should I go to church / And see the holy edifice of stone, / And not bethink me straight of dangerous rocks, / Which touching but my gentle vessel's side / Would scatter all her spices on the stream, / Enrobe the roaring waters with my silks; / And, in a word, but even now worth this, / And now worth nothing?",
          "source": "William Shakespeare, The Merchant of Venice, Act I, Scene 1 (Salarino), first printed 1600; text from the Yale Shakespeare edition, ed. William Lyon Phelps (Yale University Press, 1923). Transcribed on Wikisource.",
          "href": "https://en.wikisource.org/wiki/Merchant_of_Venice_(1923)_Yale/Text/Act_I"
        },
        {
          "category": "artistic",
          "title": "Kaulbach paints a whole navy destroyed inside a strait too narrow to turn in",
          "excerpt": "Kaulbach's vast history painting compresses the Battle of Salamis into a single choked channel: triremes rammed together prow to prow, oars snapped, men spilling into water already crowded with wreckage and bodies. On the cliff at the right the Persian king sits enthroned above the slaughter, watching a fleet that outnumbered its enemy be destroyed precisely because the water gave it nowhere to go. The painting is an argument about geography as a weapon - that in a narrow sea, size becomes a liability and a passage becomes a trap.",
          "source": "Wilhelm von Kaulbach, Die Seeschlacht bei Salamis (The Battle of Salamis), oil on canvas, 1868; Maximilianeum, Munich. Object page and high-resolution reproduction on Wikimedia Commons.",
          "href": "https://commons.wikimedia.org/wiki/File:Kaulbach,_Wilhelm_von_-_Die_Seeschlacht_bei_Salamis_-_1868.JPG",
          "image": {
            "src": "/covers/hormuz-cargo-ship-projectile-strike--a4.png",
            "alt": "Panoramic nineteenth-century history painting of the Battle of Salamis: ancient warships jammed together and burning in a narrow channel between cliffs, drowning sailors in the foreground, and the Persian king enthroned on a rocky height at the right watching the destruction.",
            "credit": "Wilhelm von Kaulbach, Die Seeschlacht bei Salamis (1868), Maximilianeum, Munich. Public domain via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "Berlioz writes eight minutes of music about a raider hunting merchant ships",
          "excerpt": "Berlioz's concert overture opens with a downward rush in the strings - a squall with no warning, over almost before it registers - and then drops into a long, becalmed cantilena for divided cellos and violas. When the fast music returns it never lets go: a hard, clipped corsair theme driven by off-beat accents and brass punctuation, closer to pursuit than to celebration. The score began life under other names, including La tour de Nice, before Berlioz settled on the pirate title, and it remains the most single-minded evocation in the orchestral repertoire of a small fast ship overhauling a slow rich one.",
          "source": "Hector Berlioz, Overture 'Le Corsaire', H 101 (Op. 21), composed 1844, revised 1851. Full scores and orchestral parts (public-domain nineteenth-century editions) on IMSLP / Petrucci Music Library.",
          "href": "https://imslp.org/wiki/Overture_%27Le_Corsaire%27,_H_101_(Berlioz,_Hector)",
          "image": {
            "src": "/covers/hormuz-cargo-ship-projectile-strike--a5.png",
            "alt": "Seventeenth-century marine painting of a crowded action at sea: a low Barbary corsair galley with a gold crescent on its stern lies alongside towering Dutch merchantmen under sail, with archers in the galley's bow and gun smoke drifting across the water.",
            "credit": "Lieve Verschuier, Dutch merchant fleet fighting Barbary corsairs (c. 1670), Royal Museums Greenwich (BHC0849). Public domain via Wikimedia Commons."
          }
        }
      ]
    },
    {
      "slug": "ukraine-drones-russian-warehouses-moscow",
      "headline": "Ukrainian drones strike warehouses near Moscow, St Petersburg and Tver, killing five and injuring 10, Russian officials say",
      "overview": "Moscow region governor Andrei Vorobyov said an industrial site at Novoselki in Chekhov, about 69km south of the Kremlin, was hit overnight, with a warehouse catching fire and an electrical substation damaged. Local officials said depots of the retailer Wildberries, often called the Russian Amazon, were also struck in the St Petersburg and Tver regions; Kyiv says they supply the Russian military, which Moscow denies. Russia's defence ministry said it destroyed 320 drones, while Russian strikes on Mykolaiv and Sumy killed at least four people.",
      "genre": "Conflict",
      "sources": [
        {
          "name": "BBC",
          "href": "https://www.bbc.co.uk/news/articles/c151pkww79zo"
        },
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMixwFBVV95cUxQSXNqV053eGo1Y3UtWjV1S0VuZGFOdU1KWlJRb2pDZkFlTl9ETEhta21XNjIxaDMwRDU5S1c0bTBLemdLdkVEN1FZa19jVU5ZWkRHRDd6aVBhZFNYYnRXU3pkbnN3UWlaYnNyMG12Tm9jMF9ZdkczOFQ0OTNXOHEzWTlQZ0NCRkJWUXhhYXdrSGhBdGV1anpWWXdxS053WEwydjAxSVNYanI4SjBUX0xzcEFET2VFMnE0U2Y3NERmbXFLX3h4VklR?oc=5"
        }
      ],
      "href": "#",
      "publishedAt": "2026-08-04",
      "image": {
        "src": "/covers/ukraine-drones-russian-warehouses-moscow.png",
        "alt": "A blast crater and scattered rubble on the apron outside a long modern distribution warehouse, with a damaged car standing beside torn loading-bay doors.",
        "credit": "BBC"
      },
      "rank": 15,
      "edition": "Morning Edition · 4 August 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "429 BC: the Peloponnesians plot a raid on Piraeus, the harbour Athens never thought to guard",
          "excerpt": "Cnemus, Brasidas, and the other Peloponnesian captains allowed themselves to be persuaded by the Megarians to make an attempt upon Piraeus, the port of Athens, which from her decided superiority at sea had been naturally left unguarded and open... There was no fleet on the look-out in the harbor, and no one had the least idea of the enemy attempting a surprise; while an open attack would, it was thought, never be deliberately ventured on or if in contemplation, would be speedily known at Athens.",
          "source": "Thucydides, History of the Peloponnesian War, Book 2, ch. 93, trans. Richard Crawley (London: J. M. Dent; New York: E. P. Dutton, 1910); hosted by the Perseus Digital Library, Tufts University",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0200%3Abook%3D2%3Achapter%3D93"
        },
        {
          "category": "historical",
          "title": "1587: Drake burns the King of Spain's stores at Cadiz and Cape Sagres",
          "excerpt": "Vpon this information our Generall with al speed possible, bending himselfe thither to cut off their said forces and prouisions, vpon the 19. of April entered with his Fleet into the Harbor of Cadiz... After whose departure wee shaped our course toward Cape Sacre, and in the way thither wee tooke at seuerall times of ships, barkes, and Carauels well neere an hundred, laden with hoopes, gally-oares, pipe-staues, and other prouisions of the king of Spaine, for the furnishing of his forces intended against England, al which we burned, hauing dealt fauourably with the men and sent them on shoare.",
          "source": "\"A briefe relation of the notable seruice performed by Sir Francis Drake vpon the Spanish Fleete prepared in the Road of Cadiz... Performed in the yeere 1587\", in Richard Hakluyt, The Principal Navigations, Voyages, Traffiques and Discoveries of the English Nation (1598-1600), Volume 07; Project Gutenberg eBook #9148",
          "href": "https://www.gutenberg.org/cache/epub/9148/pg9148-images.html",
          "image": {
            "src": "/covers/ukraine-drones-russian-warehouses-moscow--a1.png",
            "alt": "Contemporary manuscript chart of Cadiz harbour in 1587, showing the town, the forts and the anchorages of the English ships, with a handwritten key listing the Spanish and Biscayan vessels and the galleys",
            "credit": "Unknown draughtsman (from the papers of Vice-Admiral William Borough), plan of Drake's attack on Cadiz (1587), Ayuntamiento de San Fernando, Cadiz. Public domain via Wikimedia Commons."
          }
        },
        {
          "category": "literary",
          "title": "Homer: the Trojans get fire to the Achaean ships, the army's only way home",
          "excerpt": "And now, tell me, O Muses that hold your mansions on Olympus, how fire was thrown upon the ships of the Achaeans... Therefore he drew back, and the Trojans flung fire upon the ship which was at once wrapped in flame. The fire was now flaring about the ship's stern, whereon Achilles smote his two thighs and said to Patroklos, \"Up, noble horseman, for I see the glare of hostile fire at our fleet; up, lest they destroy our ships, and there be no way by which we may retreat.\"",
          "source": "Homer, Iliad, Book 16 (lines 101-129), rendered into English prose by Samuel Butler (London: Longmans, Green and Co., 1898); hosted by the Perseus Digital Library, Tufts University",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0217%3Abook%3D16%3Acard%3D101",
          "image": {
            "src": "/covers/ukraine-drones-russian-warehouses-moscow--a2.png",
            "alt": "Line engraving in the style of a Greek vase painting: two Greek warriors stand on the deck of a beached ship thrusting long pikes at a press of Trojans who advance swinging blazing torches, with fallen fighters sprawled beneath them",
            "credit": "John Flaxman, \"Ajax defending the Greek Ships against the Trojans\", illustration to Alfred J. Church, The Story of the Iliad (1895). Public domain via Wikimedia Commons."
          }
        },
        {
          "category": "literary",
          "title": "Tolstoy: a Smolensk shopkeeper empties his flour store rather than leave it to the enemy",
          "excerpt": "As Alpátych was driving out of the gate he saw some ten soldiers in Ferapóntov's open shop, talking loudly and filling their bags and knapsacks with flour and sunflower seeds. Just then Ferapóntov returned and entered his shop. On seeing the soldiers he was about to shout at them, but suddenly stopped and, clutching at his hair, burst into sobs and laughter: \"Loot everything, lads! Don't let those devils get it!\" he cried, taking some bags of flour himself and throwing them into the street.",
          "source": "Leo Tolstoy, War and Peace (1869), Book Ten, ch. 4, trans. Louise and Aylmer Maude; Project Gutenberg eBook #2600",
          "href": "https://www.gutenberg.org/files/2600/2600-h/2600-h.htm",
          "image": {
            "src": "/covers/ukraine-drones-russian-warehouses-moscow--a3.png",
            "alt": "Lithograph of French artillerymen working a field gun in front of a smoking round bastion of the Smolensk city wall, with a dead soldier lying in the foreground",
            "credit": "Christian Wilhelm von Faber du Faur, Smolensk, 18 August 1812 (before 1857). Public domain via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "1667: the Dutch burn the English fleet at its moorings, a few miles from Chatham Dockyard",
          "excerpt": "Van Soest painted this within months of the raid itself, when a Dutch squadron broke the chain across the River Medway in June 1667 and fell on the laid-up English warships in the anchorage below Chatham Royal Dockyard, some thirty miles from London. The canvas is a long horizontal line of great ships burning at their moorings, their masts still standing in the smoke, with Dutch boats rowing coolly between them and men in the water in the foreground. On the shore at the right a handful of small figures simply stand and watch: the fleet that was meant to keep the war offshore is going up in flames in its own home river.",
          "source": "Pieter Cornelisz van Soest, \"Dutch Attack on the Medway, June 1667\", oil on canvas, c. 1667, 660 x 1092 mm, National Maritime Museum, Greenwich, London, object no. BHC0295",
          "href": "https://www.rmg.co.uk/collections/objects/rmgc-object-11787",
          "image": {
            "src": "/covers/ukraine-drones-russian-warehouses-moscow--a4.png",
            "alt": "Seventeenth-century marine painting: a line of large wooden warships lies at anchor in a river estuary with flames and dark smoke rising from several of them, small Dutch rowing boats crowded with men move among the hulls, drowning sailors and floating wreckage fill the foreground water, and a few figures watch from the rocky shore",
            "credit": "Pieter Cornelisz van Soest, Dutch Attack on the Medway, June 1667 (c. 1667), National Maritime Museum, Greenwich, London (BHC0295). Public domain via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "Haydn's Mass in Time of War: kettledrums like distant guns break into a church far behind the front",
          "excerpt": "Haydn wrote this C major Mass in 1796, the year French armies drove deep into Austrian territory and the war stopped being something that happened elsewhere; it has been known ever since as the Missa in tempore belli, or in German the Paukenmesse, the kettledrum Mass. In the Agnus Dei the timpani enter almost alone, soft and insistent, like artillery heard from a great distance, and the trumpets answer them. The choir keeps pleading for peace over a sound that has no business in a church, and the movement ends by turning that intrusion into a defiant march.",
          "source": "Joseph Haydn, Mass in C major, Hob.XXII:9 (\"Missa in tempore belli\" / \"Paukenmesse\"), composed 1796, first performed 26 December 1796 at the Piarist Church of Maria Treu, Vienna; first published Leipzig: Breitkopf und Härtel, 1802. Full scores and parts hosted at the International Music Score Library Project (IMSLP)",
          "href": "https://imslp.org/wiki/Mass_in_C_major,_Hob.XXII:9_(Haydn,_Joseph)"
        }
      ]
    },
    {
      "slug": "apple-openai-injunction-trade-secrets",
      "headline": "Apple asks a federal judge to bar OpenAI and two former Apple employees from using its trade secrets",
      "overview": "Apple filed for a preliminary injunction in the US District Court for the Northern District of California, together with a motion for expedited discovery and depositions of former employees Chang Liu and Tang Yew Tan, who now work for OpenAI. The suit alleges the pair took confidential material to help OpenAI's push into consumer hardware. OpenAI said the request is \"based on false information and completely unnecessary because we do not have, nor want, any of their trade secrets.\"",
      "genre": "Technology",
      "sources": [
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMivgFBVV95cUxOYUxSNUIwOXpQcmNEWkp3ckJYUUVuaExoTVlHbWNEaUp2YVVfX2Z6NHRyWkJZOHAycXZZTlduWkIweHpmd25mblFaYU9EZnRXS2FqYkNsSDBJa2FjZThqZ2c2eWp5OVNKcEhvUmxVT3ZseXZyRnpFT2JjR05INGJWdkIxWGxITUdOXzRyUnNtSWp2MVhOR0tkTjU3THctbjlHVVJTQVZxX01tdFpPX2lrcFFSX0dwNkR3eVA0Z2Jn?oc=5"
        },
        {
          "name": "Yahoo Finance",
          "href": "https://finance.yahoo.com/technology/ai/articles/apple-seeks-preliminary-injunction-against-055716616.html"
        }
      ],
      "href": "#",
      "publishedAt": "2026-08-04",
      "image": {
        "src": "/covers/apple-openai-injunction-trade-secrets.png",
        "alt": "An aerial view of Apple's circular glass headquarters building set in landscaped grounds in Cupertino, California.",
        "credit": "Wikimedia Commons"
      },
      "rank": 16,
      "edition": "Morning Edition · 4 August 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Tiberius destroys the workshop of the man who made glass that would not break",
          "excerpt": "In the reign of Tiberius, it is said, a combination was devised which produced a flexible glass; but the manufactory of the artist was totally destroyed, we are told, in order to prevent the value of copper, silver, and gold, from becoming depreciated.",
          "source": "Pliny the Elder, Naturalis Historia (Natural History), c. AD 77, Book 36, chapter 66 (\"The various kinds of glass, and the mode of making it\"), translated by John Bostock and H. T. Riley, London: Taylor and Francis, 1855; hosted by the Perseus Digital Library, Tufts University.",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.02.0137%3Abook%3D36%3Achapter%3D66",
          "image": {
            "src": "/covers/apple-openai-injunction-trade-secrets--a0.png",
            "alt": "A Roman drinking cup of olive-green glass carved in deep openwork relief with struggling figures and vine tendrils, mounted with a gilt-metal rim and foot, standing in a museum case.",
            "credit": "Photograph by Vassil of the Lycurgus Cup, Roman, 4th century AD, British Museum (1958,1202.1) — a dichroic glass whose method of manufacture was lost for some sixteen centuries. CC0 via Wikimedia Commons."
          }
        },
        {
          "category": "historical",
          "title": "Hamilton proposes that the United States pay bounties to men who carry in other nations' secrets",
          "excerpt": "The usual means of that encouragement are pecuniary rewards, and for a time exclusive privileges. The first must be employed according to the occasion and the utility of the invention or discovery. For the last, so far as respects \"authors and inventors,\" provision has been made by law. But it is desirable in regard to improvements and secrets of extraordinary value to be able to extend the same benefit to introducers as well as authors and inventors; a policy which has been practiced with advantage in other countries.",
          "source": "Alexander Hamilton, Report on the Subject of Manufactures, transmitted to the U.S. House of Representatives, 5 December 1791, section 8 (\"The Encouragement of New Inventions and Discoveries at Home and of the Introduction Into the United States of Such as May Have Been Made in Other Countries, Particularly Those Which Relate to Machinery\"); full text transcribed at English Wikisource. The same report notes that \"It is customary with manufacturing nations to prohibit, under severe penalties, the exportation of implements and machines which they have either invented or improved.\"",
          "href": "https://en.wikisource.org/wiki/Report_on_Manufactures"
        },
        {
          "category": "literary",
          "title": "Prometheus itemizes every art he carried across to the other side",
          "excerpt": "Enough about these arts. Now as to the benefits to men that lay concealed beneath the earth—bronze, iron, silver, and gold—who would claim to have discovered them before me? No one, I know full well, unless he likes to babble idly. Hear the sum of the whole matter in the compass of one brief word—every art possessed by man comes from Prometheus.",
          "source": "Aeschylus, Prometheus Bound, lines 500–506, translated by Herbert Weir Smyth, Loeb Classical Library (Cambridge, MA: Harvard University Press, 1926); hosted by the Perseus Digital Library, Tufts University.",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0010%3Acard%3D472",
          "image": {
            "src": "/covers/apple-openai-injunction-trade-secrets--a2.png",
            "alt": "A muscular naked man sprawled backwards across a rock, one wrist held by an iron chain, while a huge dark eagle pins his head with a talon and tears at his side.",
            "credit": "Peter Paul Rubens (with the eagle by Frans Snyders), Prometheus Bound (c. 1611–1618), Philadelphia Museum of Art. Public domain via Wikimedia Commons."
          }
        },
        {
          "category": "literary",
          "title": "Griffin will not publish, because his professor is a thief of ideas",
          "excerpt": "And all that I knew and had in mind a year after I left London—six years ago. But I kept it to myself. I had to do my work under frightful disadvantages. Oliver, my professor, was a scientific bounder, a journalist by instinct, a thief of ideas—he was always prying! And you know the knavish system of the scientific world. I simply would not publish, and let him share my credit. I went on working; I got nearer and nearer making my formula into an experiment, a reality. I told no living soul, because I meant to flash my work upon the world with crushing effect and become famous at a blow.",
          "source": "H. G. Wells, The Invisible Man: A Grotesque Romance (London: C. Arthur Pearson, 1897), chapter 19, \"Certain First Principles\"; Project Gutenberg ebook no. 5230.",
          "href": "https://www.gutenberg.org/files/5230/5230-h/5230-h.htm"
        },
        {
          "category": "artistic",
          "title": "The guild's sampling officials look up from the book",
          "excerpt": "Five wardens of the Amsterdam drapers' guild sit behind a table spread with a worn Persian carpet, an account book open between them, and every one of them has just raised his eyes to the door. These were the staalmeesters, the men empowered to test each bale of dyed cloth and stamp it — or refuse it — on the guild's authority; a bareheaded servant stands at their backs. Rembrandt paints the exact instant of interruption: the craft's gatekeepers turning to see who has walked in.",
          "source": "Rembrandt van Rijn, The Sampling Officials of the Amsterdam Drapers' Guild, known as 'The Syndics' (De Staalmeesters), 1662, oil on canvas, Rijksmuseum, Amsterdam, object no. SK-C-6 (on loan from the City of Amsterdam); object page at the Rijksmuseum, image via Wikimedia Commons (Google Art Project).",
          "href": "https://www.rijksmuseum.nl/en/collection/SK-C-6",
          "image": {
            "src": "/covers/apple-openai-injunction-trade-secrets--a4.png",
            "alt": "Five seated men in black coats, white collars and wide-brimmed black hats behind a table covered with a red-patterned carpet, an open ledger before them, all looking directly out at the viewer; a bareheaded man in dark clothing stands behind them against a panelled wall.",
            "credit": "Rembrandt van Rijn, The Sampling Officials of the Amsterdam Drapers' Guild (1662), Rijksmuseum, Amsterdam. Public domain via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "Allegri's Miserere, which the Vatican forbade anyone to copy out of the chapel",
          "excerpt": "Tibi soli peccavi, et malum coram te feci; ut justificeris in sermonibus tuis, et vincas cum judicaris. Ecce enim in iniquitatibus conceptus sum, et in peccatis concepit me mater mea. Ecce enim veritatem dilexisti; incerta et occulta sapientiæ tuæ manifestasti mihi.",
          "source": "Gregorio Allegri, Miserere mei, Deus, for two choirs (SSATB and SSAB), composed c. 1638 for the Cappella Sistina; the Vatican reserved the setting to its own chapel and long forbade its transcription, and it reached print only around 1771, after the fourteen-year-old Mozart heard it in Holy Week 1770 and wrote it out from memory. Scores, manuscripts and early editions (Burney 1809, Giussani c. 1795, Cappella Sistina MS 206) at IMSLP / the Petrucci Music Library. Sung text: Psalm 50 (51), verses 6–8, Clementine Vulgate, verified at Latin Wikisource (https://la.wikisource.org/wiki/Vulgata_Clementina/Liber_Psalmorum) — \"the uncertain and hidden things of thy wisdom thou hast made manifest to me.\"",
          "href": "https://imslp.org/wiki/Miserere_(Allegri,_Gregorio)",
          "image": {
            "src": "/covers/apple-openai-injunction-trade-secrets--a5.png",
            "alt": "A pale boy in a gold-braided scarlet coat and powdered wig sits at a small keyboard instrument, one hand on the keys, an open manuscript of music propped on the stand, turning his head to look out at the viewer.",
            "credit": "Attributed to Saverio Dalla Rosa (or Giambettino Cignaroli), Portrait of Wolfgang Amadeus Mozart in Verona (1770), painted months before he transcribed Allegri's Miserere from memory. Public domain via Wikimedia Commons."
          }
        }
      ]
    },
    {
      "slug": "bp-q2-profit-doubles-oil-war",
      "headline": "BP's quarterly profit more than doubles to $5.73 billion as the Iran war drives Brent crude above $100 a barrel",
      "overview": "BP's underlying replacement cost profit rose from $2.35 billion a year earlier and beat forecasts of about $5.11 billion, lifted by higher oil and gas prices and strong refining margins. Brent averaged $103.85 a barrel over the quarter against $81.13 in the first three months of the year. Saudi Aramco separately reported a 44% rise in net profit, days after President Trump accused Big Oil of \"making too much money\" from the war.",
      "genre": "Economy",
      "sources": [
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMipwFBVV95cUxOdU9hYzNQV1Ezbmd5OXB4Z1d4QTR0QU80Z0MteS03b002RE5yd2hPb2l5Z0NqLWJ4Y21PSTN0Z29UNVBBVEVyRDRGc0VNUnoySWNlcWU4cUlVXy1iNWd0MVA3V3pXLXN1ZHlyQWcyNzRfcmNxYnJKWFBQTWZ1anZtajRzcFRSd3BIQWJhOVlfQXZUaVU2Y1RlTUhqcHBQZ1ItTjhJeEg0NA?oc=5"
        },
        {
          "name": "RTÉ",
          "href": "https://www.rte.ie/news/business/2026/0804/1586347-bp-quarterly-results/"
        }
      ],
      "href": "#",
      "publishedAt": "2026-08-04",
      "image": {
        "src": "/covers/bp-q2-profit-doubles-oil-war.png",
        "alt": "An offshore oil production platform standing on steel legs in open grey water in the North Sea.",
        "credit": "Wikimedia Commons"
      },
      "rank": 17,
      "edition": "Morning Edition · 4 August 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Athens, 386 BC: the grain dealers who prayed for bad news",
          "excerpt": "For their interests are the opposite of other men's: they make most profit when, on some bad news reaching the city, they sell their corn at a high price. And they are so delighted to see your disasters that they either get news of them in advance of anyone else, or fabricate the rumor themselves; now it is the loss of your ships in the Black Sea, now the capture of vessels on their outward voyage by the Lacedaemonians, now the blockade of your trading ports, or the impending rupture of the truce; and they have carried their enmity to such lengths that they choose the same critical moments as your foes to overreach you.",
          "source": "Lysias, Against the Corn Dealers (Oration 22), §14, delivered at Athens c. 386 BC. Lysias with an English translation by W. R. M. Lamb, M.A., Cambridge, MA: Harvard University Press; London: William Heinemann Ltd., 1930. Hosted by the Perseus Digital Library, Tufts University.",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0154%3Aspeech%3D22%3Asection%3D14"
        },
        {
          "category": "historical",
          "title": "April 1942: a president tells the shareholders their war profits will be cut",
          "excerpt": "Are you a businessman, or do you own stock in a business corporation? Well, your profits are going to be cut down to a reasonably low level by taxation. Your income will be subject to higher taxes. Indeed in these days, when every available dollar should go to the war effort, I do not think that any American citizen should have a net income in excess of $25,000 per year after payment of taxes.",
          "source": "Franklin D. Roosevelt, Fireside Chat of 28 April 1942 (\"On Our National Economic Policy\"), broadcast from the White House, Washington, D.C. Text hosted at Wikisource.",
          "href": "https://en.wikisource.org/wiki/Roosevelt%27s_Fireside_Chat,_28_April_1942",
          "image": {
            "src": "/covers/bp-q2-profit-doubles-oil-war--a1.png",
            "alt": "Franklin D. Roosevelt seated at a White House desk crowded with radio network microphones, papers in hand, delivering his broadcast address of 28 April 1942.",
            "credit": "Photograph by the U.S. Navy, President Franklin Roosevelt delivering his world-wide address of 28 April 1942 (1942), National Museum of the U.S. Navy. Public domain via Wikimedia Commons."
          }
        },
        {
          "category": "literary",
          "title": "Waterloo eve: Becky Sharp prices her horses by the panic",
          "excerpt": "Jos seldom spent a half-hour in his life which cost him so much money. Rebecca, measuring the value of the goods which she had for sale by Jos's eagerness to purchase, as well as by the scarcity of the article, put upon her horses a price so prodigious as to make even the civilian draw back. \"She would sell both or neither,\" she said, resolutely. ... Jos ended by agreeing, as might be supposed of him. The sum he had to give her was so large that he was obliged to ask for time; so large as to be a little fortune to Rebecca.",
          "source": "William Makepeace Thackeray, Vanity Fair: A Novel without a Hero (serialized 1847–48; London: Bradbury and Evans, 1848), Chapter XXXII, \"In Which Jos Takes Flight, and the War Is Brought to a Close.\" Project Gutenberg eBook #599.",
          "href": "https://www.gutenberg.org/files/599/599-h/599-h.htm"
        },
        {
          "category": "literary",
          "title": "Undershaft states the armourer's creed: an honest price, from anyone",
          "excerpt": "CUSINS. What on earth is the true faith of an Armorer? UNDERSHAFT. To give arms to all men who offer an honest price for them, without respect of persons or principles: to aristocrat and republican, to Nihilist and Tsar, to Capitalist and Socialist, to Protestant and Catholic, to burglar and policeman, to black man white man and yellow man, to all sorts and conditions, all nationalities, all faiths, all follies, all causes and all crimes.",
          "source": "Bernard Shaw, Major Barbara (first performed at the Royal Court Theatre, London, 28 November 1905; published 1907), Act III. Project Gutenberg eBook #3790.",
          "href": "https://www.gutenberg.org/files/3790/3790-h/3790-h.htm",
          "image": {
            "src": "/covers/bp-q2-profit-doubles-oil-war--a3.png",
            "alt": "Formal press photograph of Sir Basil Zaharoff, the Vickers arms salesman known as the \"merchant of death,\" an elderly bearded man in a dark overcoat and top hat.",
            "credit": "Agence de presse Meurisse, portrait of Sir Basil Zaharoff (1928), Bibliothèque nationale de France. Public domain via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "\"Next!\" — Standard Oil drawn as an octopus reaching for the White House",
          "excerpt": "A squat oil storage tank sprouts an octopus's tentacles that coil around the steel, copper and shipping industries, wrap a state capitol and the dome of the U.S. Congress, and grope across the page toward the White House. Published in Puck on 7 September 1904, the single-word caption — \"Next!\" — turns an accounting fact, the sheer scale of oil money, into a public grievance about who is being squeezed and who is being bought. It remains the defining image of the fuel monopoly as a creature that grows fat on everyone else's necessity.",
          "source": "Udo J. Keppler (1872–1956), \"Next!\", chromolithograph published in Puck, vol. 56, no. 1436 (New York: J. Ottmann Lith. Co., Puck Bldg., 7 September 1904). Library of Congress Prints and Photographs Division, Washington, D.C., reproduction no. LC-DIG-ppmsca-25884; no known restrictions on publication.",
          "href": "https://www.loc.gov/pictures/item/2001695241/",
          "image": {
            "src": "/covers/bp-q2-profit-doubles-oil-war--a4.png",
            "alt": "Colour cartoon of an oil storage tank labelled Standard Oil with long octopus tentacles gripping factories, ships, a state house and the U.S. Capitol, one tentacle stretching toward the White House.",
            "credit": "Udo J. Keppler, \"Next!\", Puck (1904), Library of Congress Prints and Photographs Division. Public domain via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "\"Et Satan conduit le bal\": Gounod's hymn to the golden calf, sung to soldiers",
          "excerpt": "Le veau d'or est toujours debout; / On encense / Sa puissance / D'un bout du monde à l'autre bout! / Pour fêter l'infâme idole, / Peuples et rois confondus, / Au bruit sombre des écus / Dansent une ronde folle / Autour de son piédestal?... / Et Satan conduit le bal! ... Il contemple, ô rage étrange! / A ses pieds le genre humain / Se ruant, le fer en main, / Dans le sang et dans la fange / Où brille l'ardent métal!... / Et Satan conduit le bal!",
          "source": "Charles Gounod, Faust, CG 4, opera in five acts, libretto by Jules Barbier and Michel Carré; first performed Théâtre Lyrique, Paris, 19 March 1859; first published Paris: Choudens, 1859. Méphistophélès's Act II \"Ronde du veau d'or,\" sung in a tavern to soldiers about to march. Scores hosted at IMSLP / Petrucci Music Library; French text quoted from the libretto edition Faust: A Lyric Drama in Five Acts, Project Gutenberg eBook #45806.",
          "href": "https://imslp.org/wiki/Faust_(Gounod,_Charles)",
          "image": {
            "src": "/covers/bp-q2-profit-doubles-oil-war--a5.png",
            "alt": "Baroque painting of a crowd dancing in a ring around a golden calf raised on a pedestal, a priest gesturing at the idol while Moses appears in the distance.",
            "credit": "Nicolas Poussin, The Adoration of the Golden Calf (c. 1634), National Gallery, London. Public domain via Wikimedia Commons."
          }
        }
      ]
    },
    {
      "slug": "shein-hong-kong-ipo-valuation",
      "headline": "Shein seeks a $30 billion to $40 billion valuation for a Hong Kong listing it could launch in late August",
      "overview": "The fast-fashion group is targeting far less than the $98.2 billion valuation it reached in 2022 and the $64 billion of its private rounds in 2023 and 2024, a mark of the pressure on its business. It began pre-marketing meetings with investors last week, though the final price and the timing are not yet set. Its draft prospectus showed a $99 million quarterly loss after the United States scrapped a duty exemption on small parcels.",
      "genre": "Economy",
      "sources": [
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMiwgFBVV95cUxOb3NieXJtWmw4S21GUWJYMHAycnA0RmZaeWJKMnVCT19OUDdGQkNLZnVwRDQ0Ukc2cDZCV0FBczAzQlBsbnFUVFhqV2dSb3I2VVpnT0ZFMXRnbGpvSEdNMWxtS1BVeHJuNUV0X1JkX1F6UGpWQW9fQkptZzRiY3hkWWRIMXNUTHFGa3hQQ3VxVk53djFFUEJxdzR1V2NHZXVTODZvRDlnekQzUU56WmlsZUxMdTZiSHQtWE1yTmcxOHhtdw?oc=5"
        },
        {
          "name": "MarketScreener",
          "href": "https://www.marketscreener.com/news/shein-targets-a-30bn-to-40bn-valuation-for-its-hong-kong-ipo-ce7f50d9d08dfe20"
        }
      ],
      "href": "#",
      "publishedAt": "2026-08-04",
      "image": {
        "src": "/covers/shein-hong-kong-ipo-valuation.png",
        "alt": "The pale granite towers of Exchange Square in Central, Hong Kong, home of the Hong Kong Stock Exchange, seen from the street below.",
        "credit": "Wikimedia Commons"
      },
      "rank": 18,
      "edition": "Morning Edition · 4 August 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Rome's tax-farming syndicates: \"scarcely a man who is not interested\"",
          "excerpt": "For contracts, too numerous to count, are given out by the censors in all parts of Italy for the repairs or construction of public buildings; there is also the collection of revenue from many rivers, harbours, gardens, mines, and land—everything, in a word, that comes under the control of the Roman government: and in all these the people at large are engaged; so that there is scarcely a man, so to speak, who is not interested either as a contractor or as being employed in the works.",
          "source": "Polybius, Histories, Book 6, ch. 17 (\"Powers of the Senate\"), c. 140 BCE; trans. Evelyn S. Shuckburgh, London and New York: Macmillan, 1889 (repr. Bloomington 1962). Hosted by the Perseus Digital Library, Tufts University.",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0234%3Abook%3D6%3Achapter%3D17"
        },
        {
          "category": "historical",
          "title": "1720: \"A company for carrying on an undertaking of great advantage, but nobody to know what it is\"",
          "excerpt": "But the most absurd and preposterous of all, and which shewed, more completely than any other, the utter madness of the people, was one started by an unknown adventurer, entitled “A company for carrying on an undertaking of great advantage, but nobody to know what it is.” Were not the fact stated by scores of credible witnesses, it would be impossible to believe that any person could have been duped by such a project. The man of genius who essayed this bold and successful inroad upon public credulity, merely stated in his prospectus that the required capital was half a million, in five thousand shares of 100l. each, deposit 2l. per share.",
          "source": "Charles Mackay, Memoirs of Extraordinary Popular Delusions and the Madness of Crowds (London: Richard Bentley, 1841), chapter on \"The South-Sea Bubble.\" Project Gutenberg eBook #24518.",
          "href": "https://www.gutenberg.org/files/24518/24518-h/24518-h.htm",
          "image": {
            "src": "/covers/shein-hong-kong-ipo-valuation--a1.png",
            "alt": "A 1720 Dutch satirical etching titled \"Complaint of the South Sea Company\": an allegorical scene of the collapsed share company, printed above columns of Dutch verse mocking the wind trade.",
            "credit": "Anonymous, Klacht van de Zuidzee-Compagnie, 1720, from Het Groote Tafereel der Dwaasheid (\"The Great Mirror of Folly\"), Rijksmuseum, Amsterdam (RP-P-OB-83.528). Public domain (CC0) via Wikimedia Commons."
          }
        },
        {
          "category": "literary",
          "title": "Thomas Hood counts the true cost of a cheap shirt",
          "excerpt": "With fingers weary and worn, / With eyelids heavy and red, / A woman sat in unwomanly rags, / Plying her needle and thread— / Stitch! stitch! stitch! / In poverty, hunger, and dirt, / And still with a voice of dolorous pitch,— / Would that its tone could reach the rich!— / She sang this \"Song of the Shirt!\" … O, men, with sisters dear! / O, men, with mothers and wives! / It is not linen you 're wearing out, / But human creatures' lives!",
          "source": "Thomas Hood, \"The Song of the Shirt,\" first published anonymously in Punch, Christmas number, 1843; text from The Poetical Works of Thomas Hood. Hosted on Wikisource.",
          "href": "https://en.wikisource.org/wiki/The_Poetical_Works_of_Thomas_Hood/The_Song_of_the_Shirt",
          "image": {
            "src": "/covers/shein-hong-kong-ipo-valuation--a2.png",
            "alt": "Oil painting of a young seamstress alone in a bare attic room, seated at a small table with white cloth and needle in her hands, eyes raised, a guttering candle beside her and pale light at the window.",
            "credit": "Richard Redgrave, The Sempstress (1846), Art Gallery of New South Wales. Public domain via Wikimedia Commons."
          }
        },
        {
          "category": "literary",
          "title": "Trollope: the point was never the railway, it was to float a company",
          "excerpt": "\"If you could realise all the money it wouldn't make a mile of the railway,\" said Paul. Mr. Fisker laughed at him. The object of Fisker, Montague, and Montague was not to make a railway to Vera Cruz, but to float a company. Paul thought that Mr. Fisker seemed to be indifferent whether the railway should ever be constructed or not. It was clearly his idea that fortunes were to be made out of the concern before a spadeful of earth had been moved.",
          "source": "Anthony Trollope, The Way We Live Now (London: Chapman & Hall, 1875), ch. IX, \"The Great Railway to Vera Cruz.\" Project Gutenberg eBook #5231.",
          "href": "https://www.gutenberg.org/cache/epub/5231/pg5231-images.html"
        },
        {
          "category": "artistic",
          "title": "Hogarth engraves the machinery of a bubble",
          "excerpt": "Hogarth's first great satire turns the City of London into a fairground. A vast wooden merry-go-round spins clergymen, aristocrats, prostitutes and shopkeepers in circles beneath a barker's platform, while a devil butchers the body of Fortune and flings gobbets of her flesh to the scrambling crowd below. Off to one side Honesty is broken on a wheel and Honour flogged by Self-Interest; a queue of women waits at a raffle for husbands. The Monument in the background carries an altered inscription blaming the ruin of the city not on fire but on the South Sea speculation.",
          "source": "William Hogarth, The South Sea Scheme (also known as An Emblematical Print on the South Sea Scheme), etching and engraving, 1721; impression in the British Museum, London (registration no. 1841,0809.230). Object image hosted on Wikimedia Commons.",
          "href": "https://commons.wikimedia.org/wiki/File:The_South_Sea_Scheme_(BM_1841,0809.230).jpg",
          "image": {
            "src": "/covers/shein-hong-kong-ipo-valuation--a4.png",
            "alt": "Crowded black-and-white satirical engraving of a London square: a large wooden merry-go-round carries riders of every class, a devil hacks at a female figure on a platform, a man is stretched on a breaking wheel, and dense crowds throng the streets beneath tall buildings and a monument column.",
            "credit": "William Hogarth, The South Sea Scheme (1721), British Museum (1841,0809.230). Public domain via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "Gilbert and Sullivan set the limited-liability prospectus to music",
          "excerpt": "Some seven men form an Association / (If possible, all Peers and Baronets), / They start off with a public declaration / To what extent they mean to pay their debts. / That's called their Capital; if they are wary / They will not quote it at a sum immense. / The figure's immaterial—it may vary / From eighteen million down to eighteenpence. … If you succeed, your profits are stupendous— / And if you fail, pop goes your eighteenpence.",
          "source": "Arthur Sullivan and W. S. Gilbert, Utopia Limited; or, The Flowers of Progress, comic opera in two acts, first performed Savoy Theatre, London, 7 October 1893; vocal score first published London: Chappell & Co., 1893. Scores hosted at IMSLP / Petrucci Music Library. Libretto wording of Mr. Goldbury's Act II song verified against The Complete Plays of Gilbert and Sullivan, Project Gutenberg eBook #808.",
          "href": "https://imslp.org/wiki/Utopia_Limited_(Sullivan,_Arthur)",
          "image": {
            "src": "/covers/shein-hong-kong-ipo-valuation--a5.png",
            "alt": "Wide colour lithograph theatre poster advertising D'Oyly Carte's Opera Company in Gilbert and Sullivan's new opera Utopia, Limited, with costumed characters arrayed across the sheet.",
            "credit": "Strobridge Lithographing Co., poster for D'Oyly Carte's Opera Company in Utopia, Limited (c. 1894), Library of Congress Prints and Photographs Division. Public domain via Wikimedia Commons."
          }
        }
      ]
    },
    {
      "slug": "spokane-wildfire-arson-arrest",
      "headline": "A man is arrested on suspicion of arson over the largest of three wildfires around Spokane that have destroyed more than 700 buildings",
      "overview": "Aaron Farinacci, 37, was allegedly seen kneeling near grass at the site of the Old Trails fire and later found carrying matches and a lighter, the Spokane County sheriff said; he is held on a $1 million bond. More than 60,000 people have evacuated Washington's second-largest city, and Governor Bob Ferguson called the fires \"likely the worst natural disaster in Spokane history\". Authorities are still trying to reach 14 people, and more than 900 firefighters have been assigned to blazes across the state.",
      "genre": "Climate",
      "sources": [
        {
          "name": "BBC",
          "href": "https://www.bbc.co.uk/news/articles/c5y3ppmmev1o"
        },
        {
          "name": "AP",
          "href": "https://news.google.com/rss/articles/CBMiqAFBVV95cUxObjlrYTFEWU1Td0psdzA1WmlzRUpyelV2aEtibTIyY3FidC14QkxNckU3ZmI1VUFmMVFpOExQOFMyQjBXZTlEdUhLTWFqQnd0UUh5ZE16eEZKOThCSFdzQ2RDMTVkbFRKeUN4elR3bHJJQUl6S1l2Um5uSEpRclhIMkZabHRmbjJwTTJLS25QRVNiQjVpSDJPcm9PM3VPeEZZN0J0MUUxTlY?oc=5"
        }
      ],
      "href": "#",
      "publishedAt": "2026-08-04",
      "image": {
        "src": "/covers/spokane-wildfire-arson-arrest.png",
        "alt": "Burnt-out homes and scorched vehicles on a residential street in Spokane after wildfire swept through the neighbourhood.",
        "credit": "BBC"
      },
      "rank": 19,
      "edition": "Morning Edition · 4 August 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Rome burns for six days and the city cannot tell accident from arson",
          "excerpt": "A disaster followed, whether accidental or treacherously contrived by the emperor, is uncertain, as authors have given both accounts, worse, however, and more dreadful than any which have ever happened to this city by the violence of fire. … And no one dared to stop the mischief, because of incessant menaces from a number of persons who forbade the extinguishing of the flames, because again others openly hurled brands, and kept shouting that there was one who gave them authority, either seeking to plunder more freely, or obeying orders.",
          "source": "Tacitus, Annals 15.38 (AD 64 fire of Rome), trans. Alfred John Church and William Jackson Brodribb, rev. Sara Bryant, in Complete Works of Tacitus (New York: Random House, reprinted 1942); hosted by the Perseus Digital Library, Tufts University.",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0078:book=15:chapter=38",
          "image": {
            "src": "/covers/spokane-wildfire-arson-arrest--a0.png",
            "alt": "Night scene of classical Rome engulfed in flames, with an orange-white blaze consuming colonnaded buildings while crowds of small figures flee through the rubble in the foreground",
            "credit": "Hubert Robert, The Fire of Rome (1785), oil on canvas, MuMa – Musée d'art moderne André Malraux, Le Havre (inv. 226). Public domain via Wikimedia Commons."
          }
        },
        {
          "category": "historical",
          "title": "London, 1666: foreigners jailed on suspicion while the official account settles on 'unhappy chance'",
          "excerpt": "Divers Strangers, Dutch and French were during the Fire, apprehended, upon suspicion that they contributed mischievously to it, who are all Imprisoned and Informations prepared to make a severe inquisition thereupon by my Lord Chief Justice Keeling, assisted by some of the Lords of the Privy council, and some principal Members of the City notwithstanding which suspicions, the manner of the burning all along in a Train and so blown forwards in all its way by strong winds, makes us conclude, the whole was the effect of an unhappy chance, or to speak better, the heavy hand of God upon us for our sins",
          "source": "'A True Relation of that sad and deplorable Fire, that happened and brake out in London, the second of September 1666', printed broadside published by authority (York: Stephen Bulkley for Francis Mawbarne, 1666), also carried in The London Gazette of 10 September 1666. The National Archives, Kew, catalogue reference SP 29/170 f150; transcript hosted by The National Archives.",
          "href": "https://www.nationalarchives.gov.uk/education/resources/great-fire-of-london-examine-the-evidence/a-true-relation-of-the-sad-and-deplorable-fire/",
          "image": {
            "src": "/covers/spokane-wildfire-arson-arrest--a1.png",
            "alt": "Seventeenth-century panoramic painting of London ablaze at night, seen across the Thames from near Tower Wharf, with Old London Bridge in silhouette and a long wall of flame consuming the city behind Old St Paul's",
            "credit": "Unknown artist, The Great Fire of London (c. 1675), oil on canvas, Museum of London. Public domain via Wikimedia Commons."
          }
        },
        {
          "category": "literary",
          "title": "A provincial town burns and the governor declares the fire is in men's minds",
          "excerpt": "\"It's all incendiarism! It's nihilism! If anything is burning, it's nihilism!\" … \"They will wipe away the tears of the people whose houses have been burnt, but they will burn down the town. It's all the work of four scoundrels, four and a half! Arrest the scoundrel! He worms himself into the honour of families. They made use of the governesses to burn down the houses.\" … \"He is putting the fire out, your Excellency.\" \"Not likely. The fire is in the minds of men and not in the roofs of houses.\"",
          "source": "Fyodor Dostoevsky, The Possessed (Devils / Demons), Part III, Chapter II ('The End of the Fete'), first serialised 1871–72; trans. Constance Garnett (1916). Project Gutenberg eBook #8117.",
          "href": "https://www.gutenberg.org/files/8117/8117-h/8117-h.htm"
        },
        {
          "category": "literary",
          "title": "Phaethon takes the reins and the whole earth catches: Ovid's account of a world set alight by one hand",
          "excerpt": "The grass is blighted; trees are burnt up with their leaves; the ripe brown crops give fuel for self destruction—Oh what small complaints! Great cities perish with their walls, and peopled nations are consumed to dust—the forests and the mountains are destroyed. … \"How difficult to open my parched mouth, and speak these words! (the vapours choking her), behold my scorching hair, and see the clouds of ashes falling on my blinded eyes, and on my features! What a recompense for my fertility!\"",
          "source": "Ovid (P. Ovidius Naso), Metamorphoses, Book 2, lines 193–300 (the burning of the earth by Phaethon), trans. Brookes More (Boston: Cornhill Publishing Co., 1922); hosted by the Perseus Digital Library, Tufts University.",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0028:book=2:card=201",
          "image": {
            "src": "/covers/spokane-wildfire-arson-arrest--a3.png",
            "alt": "Baroque painting of the sun-chariot breaking apart in mid-air, horses rearing and plunging in different directions as Phaethon falls backwards out of the wrecked car amid tumbling figures and stormy cloud",
            "credit": "Peter Paul Rubens, The Fall of Phaeton (c. 1604–1605, probably reworked c. 1606–1608), oil on canvas, National Gallery of Art, Washington, D.C. Public domain via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "Turner paints a crowd watching its own government burn across the water",
          "excerpt": "Turner stood among the crowds on the Thames on the night of 16 October 1834 and made this canvas from the memory of it: a wall of white-hot flame swallowing the Palace of Westminster, the stone of the buildings dissolving into the same yellow air as the smoke. Westminster Bridge sags and warps under the heat at the right. The whole lower half of the picture is spectators — a dark packed mass of people on the far bank and in boats, faces lit by the fire they have come to watch, and can do nothing about. Turner deliberately exaggerated the height of the blaze; the painting is less a record of the event than of the crowd's helplessness before it.",
          "source": "Joseph Mallord William Turner (British, 1775–1851), 'The Burning of the Houses of Lords and Commons, 16 October 1834', 1835, oil on canvas, 92 × 123.2 cm. The Cleveland Museum of Art, Bequest of John L. Severance, accession no. 1942.647 (Open Access, public domain).",
          "href": "https://www.clevelandart.org/art/1942.647",
          "image": {
            "src": "/covers/spokane-wildfire-arson-arrest--a4.png",
            "alt": "Turner oil painting of the Houses of Parliament on fire at night, a towering column of white and yellow flame reflected in the Thames, with Westminster Bridge crowded with onlookers and dense throngs of spectators silhouetted along the riverbank",
            "credit": "Joseph Mallord William Turner, The Burning of the Houses of Lords and Commons, 16 October 1834 (1835), Cleveland Museum of Art (1942.647). Public domain via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "Verdi's Dies irae: the world dissolved in ash, and the ledger in which nothing hidden stays hidden",
          "excerpt": "Dies iræ! dies illa / Solvet sæclum in favilla / Teste David cum Sibylla! … Liber scriptus proferetur, / in quo totum continetur, / unde mundus judicetur. // Judex ergo cum sedebit, / quidquid latet apparebit: / nil inultum remanebit. — \"Day of wrath! O day of mourning! / See fulfilled the prophets' warning, / Heaven and earth in ashes burning! … Lo! The book, exactly worded, / wherein all hath been recorded: / thence shall judgment be awarded. // When the Judge his seat attaineth, / and each hidden deed arraigneth, / nothing unavenged remaineth.\"",
          "source": "Giuseppe Verdi, Messa da Requiem (1874), 'Dies irae' sequence — full score (Milan: Ricordi), public domain, hosted at IMSLP/Petrucci Music Library. Text: the thirteenth-century sequence attributed to Thomas of Celano, as given in the Requiem Mass of the Roman Missal, with the 1849 English verse translation by William Josiah Irons as printed in the English Missal (1912), hosted at Wikisource (https://en.wikisource.org/wiki/Dies_Irae_(Irons,_1912)).",
          "href": "https://imslp.org/wiki/Requiem_(Verdi,_Giuseppe)"
        }
      ]
    },
    {
      "slug": "new-zealand-antarctic-cold-snap",
      "headline": "An Antarctic blast brings snow to sea level across New Zealand's South Island, closing roads and schools",
      "overview": "A polar air mass swept the island on Tuesday, blanketing Dunedin, the South Island's second-largest city, where police urged people not to travel and reported cars sliding off icy roads, though nobody was hurt. Snow reached the sand at Christchurch's New Brighton Beach. Skiers and snowboarders took the chance to ride down Dunedin's Baldwin Street, billed as the world's steepest residential street.",
      "genre": "Climate",
      "sources": [
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMiyAFBVV95cUxQM0hHR0dCUUNVOV9ULUo2cWZuVDBYUjFkU0ZZSXlUTUx2QUVwY1JmZ0c1Uk1sMU42RXhUYjNsSFZLZGZ3LXhSUTJZWlQ0V3FwcjkxbjdRNjlsNUtuaDNHVS1RdzNHVk0yT3dTRzVkWElvOEVhY3NMMFc1VTBNT0xEZHlXMHdSeVNFTGVfOFJIa3hoVlFjOXVMak9mX2VLWkZicmZ6MDZXTmN1TlJYNDBhbDJoX19mZDNOVkFsVmlnejVIbGdxMnJWQQ?oc=5"
        },
        {
          "name": "U.S. News",
          "href": "https://www.usnews.com/news/world/articles/2026-08-03/antarctic-cold-snap-sweeps-new-zealands-south-island-shuts-roads-and-schools"
        }
      ],
      "href": "#",
      "publishedAt": "2026-08-04",
      "image": {
        "src": "/covers/new-zealand-antarctic-cold-snap.png",
        "alt": "Snow falling on an empty divided road lined with dark trees and suburban houses in Dunedin, New Zealand.",
        "credit": "Wikimedia Commons"
      },
      "rank": 20,
      "edition": "Morning Edition · 4 August 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "The Anglo-Saxon Chronicle records the \"strong winter\" of 1046, remembered by no man then alive",
          "excerpt": "And in the same year, after Candlemas, came the strong winter, with frost and with snow, and with all kinds of bad weather; so that there was no man then alive who could remember so severe a winter as this was, both through loss of men and through loss of cattle; yea, fowls and fishes through much cold and hunger perished.",
          "source": "The Anglo-Saxon Chronicle, entry for A.D. 1046, translated by James Ingram and J. A. Giles; Project Gutenberg eBook #657 (release 1996, rev. 2021), hosted by Project Gutenberg",
          "href": "https://www.gutenberg.org/cache/epub/657/pg657.txt",
          "image": {
            "src": "/covers/new-zealand-antarctic-cold-snap--a0.png",
            "alt": "The opening page of a medieval manuscript written in Old English in brown ink, with a large decorated initial and ruled lines of script, the parchment stained and worn at the edges.",
            "credit": "Monastic scribes of Peterborough, opening page of the Peterborough Chronicle, one of the surviving manuscripts of the Anglo-Saxon Chronicle (Bodleian Library, MS Laud Misc. 636), 12th century. Public domain via Wikimedia Commons."
          }
        },
        {
          "category": "historical",
          "title": "John Evelyn watches London hold a carnival on the frozen Thames, January 1684",
          "excerpt": "Coaches plied from Westminster to the Temple, and from several other stairs to and fro, as in the streets, sleds, sliding with skates, a bull-baiting, horse and coach-races, puppet-plays and interludes, cooks, tippling, and other lewd places, so that it seemed to be a bacchanalian triumph, or carnival on the water, while it was a severe judgment on the land, the trees not only splitting as if the lightning struck, but men and cattle perishing in divers places, and the very seas so locked up with ice, that no vessels could stir out or come in.",
          "source": "John Evelyn, diary entry for 24 January 1684, in The Diary of John Evelyn (Volume 2 of 2), ed. William Bray; Project Gutenberg eBook #42081, hosted by Project Gutenberg",
          "href": "https://www.gutenberg.org/cache/epub/42081/pg42081.txt",
          "image": {
            "src": "/covers/new-zealand-antarctic-cold-snap--a1.png",
            "alt": "An oil painting of the Thames frozen into broken slabs of white ice, crowded with small figures walking, sledding and standing in groups, with Old London Bridge and city spires under a heavy grey sky in the distance.",
            "credit": "Abraham Hondius, The Frozen Thames, Looking Eastwards towards Old London Bridge (1677), Museum of London. Public domain via Wikimedia Commons."
          }
        },
        {
          "category": "literary",
          "title": "Virgil's Georgics: a northern winter where wheels roll over water and wine is cut with axes",
          "excerpt": "Quick ice-crusts curdle on the running stream, / And iron-hooped wheels the water's back now bears, / To broad wains opened, as erewhile to ships; / Brass vessels oft asunder burst, and clothes / Stiffen upon the wearers; juicy wines / They cleave with axes; to one frozen mass / Whole pools are turned; and on their untrimmed beards / Stiff clings the jagged icicle. Meanwhile / All heaven no less is filled with falling snow",
          "source": "Virgil, Georgics, Book III (c. 29 BC), translated into English verse by James Rhoades; Project Gutenberg eBook #232, hosted by Project Gutenberg",
          "href": "https://www.gutenberg.org/cache/epub/232/pg232.txt"
        },
        {
          "category": "literary",
          "title": "Whittier's \"Snow-Bound\": a household wakes to a world unknown, and the boys cut a tunnel through it",
          "excerpt": "And, when the second morning shone, / We looked upon a world unknown, / On nothing we could call our own. / Around the glistening wonder bent / The blue walls of the firmament, / No cloud above, no earth below,— / A universe of sky and snow! / The old familiar sights of ours / Took marvellous shapes; strange domes and towers / Rose up where sty or corn-crib stood, / Or garden wall, or belt of wood; / A smooth white mound the brush-pile showed, / A fenceless drift what once was road",
          "source": "John Greenleaf Whittier, Snow-Bound: A Winter Idyl (first published 1866), illustrated edition; Project Gutenberg eBook #20226, hosted by Project Gutenberg",
          "href": "https://www.gutenberg.org/files/20226/20226-h/20226-h.htm"
        },
        {
          "category": "artistic",
          "title": "Bruegel's \"Hunters in the Snow\" (1565), painted after one of Europe's cruellest winters",
          "excerpt": "Three hunters trudge home over a snowbound ridge with a lean pack of dogs and a single fox to show for the day, while the village below has surrendered entirely to the cold. On the frozen ponds beyond them, tiny figures skate, sweep and play at kolf, a whole town's ordinary business converted into games on the ice. The sky is a flat green-grey, the trees are black, a bird falls across the valley, and the beauty of the scene is inseparable from its hunger.",
          "source": "Pieter Bruegel the Elder, Hunters in the Snow (Winter), 1565, oil on panel, 116.5 x 162 cm, inv. 1838; Kunsthistorisches Museum, Vienna (museum object page)",
          "href": "https://www.khm.at/en/artworks/hunters-in-the-snow-winter-327",
          "image": {
            "src": "/covers/new-zealand-antarctic-cold-snap--a4.png",
            "alt": "A winter landscape seen from a hilltop: three hunters with spears and a pack of dogs walk away from the viewer through deep snow past bare black trees, looking down on a village with two frozen ponds where small figures skate and play, with jagged mountains beyond under a pale green sky.",
            "credit": "Pieter Bruegel the Elder, Hunters in the Snow (Winter) (1565), Kunsthistorisches Museum, Vienna. Public domain via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "Vivaldi's \"L'Inverno\", RV 297: shivering in the icy snow, and walking on the ice",
          "excerpt": "Aggiacciato tremar trà nevi algenti … Passar al foco i di quieti e contenti Mentre la pioggio fuor bagna ben cento … Caminar Sopra’l giaccio",
          "source": "Antonio Vivaldi, Violin Concerto in F minor, RV 297, \"L'Inverno\" (Winter), from Il cimento dell'armonia e dell'inventione, Op. 8 (Amsterdam: Michel-Charles Le Cène, 1725); sonnet mottoes printed in the score, work page and scores hosted by IMSLP / Petrucci Music Library",
          "href": "https://imslp.org/wiki/Violin_Concerto_in_F_minor,_RV_297_(Vivaldi,_Antonio)",
          "image": {
            "src": "/covers/new-zealand-antarctic-cold-snap--a5.png",
            "alt": "An engraved eighteenth-century music part-book page headed \"Alto Viola\" and \"L'Inverno / Concerto IV\", with lines of hand-engraved notation and the sonnet phrases \"Aggiacciato tremar trà nevi algenti\" and \"Al severo Spirar d'orrido vento\" written above the staves.",
            "credit": "Antonio Vivaldi, Il cimento dell'armonia e dell'inventione, Op. 8 (Amsterdam: Le Cène, 1725), viola part, opening of \"L'Inverno\" (Concerto IV); Bibliothèque nationale de France. Public domain via Wikimedia Commons."
          }
        }
      ]
    },
    {
      "slug": "ethiopia-monastery-landslide",
      "headline": "A landslide at an Ethiopian mountain monastery kills 14 worshippers during an overnight prayer service",
      "overview": "A hillside above the Tsadqane Debre Mitmaq St Mary Monastery in the northern Amhara region gave way in the early hours of Monday after a night of heavy rain, sending rock and earth onto pilgrims gathered in a prayer chamber carved into the mountainside for a holy-water healing ritual. Seven people were found injured, five of them seriously, and the search for others has been called off. Eleven of the dead have been buried at the monastery.",
      "genre": "Climate",
      "sources": [
        {
          "name": "BBC",
          "href": "https://www.bbc.co.uk/news/articles/c2lqpx1qd8lo"
        },
        {
          "name": "AP",
          "href": "https://news.google.com/rss/articles/CBMijgFBVV95cUxOcDJxT05SVGVWbld6QjUxWE9NRUpPbTJUVGFrTlo3NDZPLUtmUks1bGRiZ3A5dndESHAwRDRxM0d4em1WTkM0ZlB3WG14R1h1SGN3UGZiZTVkaWZXZExGdUxtV05Mc1JZZnpRWnQ0aC0yYjZnUVZlaVc4N0NnN0o4X2FjSGVQaEthdzRPSkh3?oc=5"
        }
      ],
      "href": "#",
      "publishedAt": "2026-08-04",
      "image": {
        "src": "/covers/ethiopia-monastery-landslide.png",
        "alt": "Bodies wrapped in brightly patterned cloth laid in a row on carpets outside an Ethiopian Orthodox church while robed clergy and mourners stand around them.",
        "credit": "BBC"
      },
      "rank": 21,
      "edition": "Morning Edition · 4 August 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Antioch, 526: the earth opens on a city swollen with pilgrims for the Feast of the Ascension",
          "excerpt": "An impulsive or vibratory motion was felt, enormous chasms were opened, huge and heavy bodies were discharged into the air, the sea alternately advanced and retreated beyond its ordinary bounds, and a mountain was torn from Libanus, and cast into the waves… Two hundred and fifty thousand persons are said to have perished in the earthquake of Antioch, whose domestic multitudes were swelled by the conflux of strangers to the festival of the Ascension.",
          "source": "Edward Gibbon, The History of the Decline and Fall of the Roman Empire, chapter XLIII (first published 1788), J. B. Bury edition; transcribed on Wikisource",
          "href": "https://en.wikisource.org/wiki/The_History_of_the_Decline_and_Fall_of_the_Roman_Empire_(Bury)/XLIII"
        },
        {
          "category": "historical",
          "title": "Goldau, 2 September 1806: after weeks of rain the Rossberg gives way, and a peasant is still begging for holy water when it falls",
          "excerpt": "The preceding years had been unusually wet, the filtering waters had loosened the Nagelfluh, or coarse conglomerate of which the mountain is composed, and the rains having latterly been almost continuous, a great part of the mountain, undermined by the subterranean action of the waters, at length gave way and was hurled into the valley below… the superstitious peasant, fancying he heard the jubilee of demons, hastened down to Arth, on the bank of the lake of Zug, and begged the parish priest, with tears and lamentations, to accompany him, and exorcise the evil spirits with a copious sprinkling of holy water. While he was still speaking, the catastrophe took place.",
          "source": "Georg Hartwig, The Subterranean World (London: Longmans, Green & Co., 1871), chapter on landslips: 'The Destruction of Goldau in 1806'; Project Gutenberg ebook #52466",
          "href": "https://www.gutenberg.org/files/52466/52466-h/52466-h.htm",
          "image": {
            "src": "/covers/ethiopia-monastery-landslide--a1.png",
            "alt": "Hand-coloured etching looking north into the scar left on the Rossberg after the 1806 landslide: a vast funnel of bare rock and rubble spreading down into the valley of Goldau, with lakes on either side and tiny figures on the debris field in the foreground.",
            "credit": "Franz Xaver Triner and Gabriel Lory, Goldau, von Süden, nach dem Bergsturz (c. 1806), coloured outline etching, Gugelmann Collection, Swiss National Library, Prints and Drawings Department. Public domain via Wikimedia Commons."
          }
        },
        {
          "category": "literary",
          "title": "'Or those eighteen, upon whom the tower in Siloam fell' — the oldest refusal to read disaster as verdict",
          "excerpt": "There were present at that season some that told him of the Galileans, whose blood Pilate had mingled with their sacrifices. And Jesus answering said unto them, Suppose ye that these Galileans were sinners above all the Galileans, because they suffered such things? I tell you, Nay: but, except ye repent, ye shall all likewise perish. Or those eighteen, upon whom the tower in Siloam fell, and slew them, think ye that they were sinners above all men that dwelt in Jerusalem? I tell you, Nay: but, except ye repent, ye shall all likewise perish.",
          "source": "The Gospel according to St Luke 13:1–5, King James Bible, 1772 Oxford edition (vol. 2), proofread transcription on Wikisource",
          "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Luke#chapter_13"
        },
        {
          "category": "literary",
          "title": "Thornton Wilder sends a friar to count the dead and find the plan behind them",
          "excerpt": "On Friday noon, July the twentieth, 1714, the finest bridge in all Peru broke and precipitated five travellers into the gulf below… There was a great service in the Cathedral. The bodies of the victims were approximately collected and approximately separated from one another, and there was great searching of hearts in the beautiful city of Lima… If there were any plan in the universe at all, if there were any pattern in a human life, surely it could be discovered mysteriously latent in those lives so suddenly cut off. Either we live by accident and die by accident, or we live by plan and die by plan.",
          "source": "Thornton Wilder, The Bridge of San Luis Rey (New York: Albert & Charles Boni, 1927), Part One: 'Perhaps an Accident'; Project Gutenberg ebook #69768 (public domain in the United States)",
          "href": "https://www.gutenberg.org/cache/epub/69768/pg69768-images.html"
        },
        {
          "category": "artistic",
          "title": "John Martin paints the moment the mountains themselves come down on the crowd",
          "excerpt": "Martin's vast apocalypse shows the solid world losing its footing: a whole cliff face tips out of the darkness and topples toward the viewer, a city sliding off it in fragments, while lightning opens a red seam across the sky. At the bottom of the canvas, small human figures are swept together in a heap of bodies at the base of the falling rock, too small to be individuals and too many to be counted. It is the pictorial extreme of the fear that outlives every landslide — that the ground under a holy place is not a promise, and that stone can be an instrument as easily as a shelter.",
          "source": "John Martin (1789–1854), The Great Day of His Wrath, oil on canvas, 1851–53, Tate, London, accession N05613 (presented by Mrs Frank Ll. Harris, 1945)",
          "href": "https://www.tate.org.uk/art/artworks/martin-the-great-day-of-his-wrath-n05613",
          "image": {
            "src": "/covers/ethiopia-monastery-landslide--a4.png",
            "alt": "Dark apocalyptic oil painting: a huge mass of rock and a ruined city tilt and fall from the upper right into a chasm lit by lurid red and orange light, with crowds of tiny human figures tumbling and piled at the lower edge of the collapsing landscape.",
            "credit": "John Martin, The Great Day of His Wrath (1851–53), Tate, London (N05613). Public domain via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "Haydn writes music for a chapel cut under the ground, and ends it with an earthquake",
          "excerpt": "Man überzog an dem bestimmten Tage die Wände, Fenster und Pfeiler der Kirche mit schwarzem Tuche, und nur eine in der Mitte hängende Lampe von großem Umfange erleuchtete das heilige Dunkel. Zu einer bestimmten Stunde wurden alle Thüren verschlossen, und die Musik begann. [Translation: On the appointed day the walls, windows and pillars of the church were covered with black cloth, and only a single large lamp hanging in the middle lit the holy darkness. At an appointed hour all the doors were shut, and the music began.] The nine movements close with 'Il Terremoto' — the earthquake — marked Presto e con tutta la forza.",
          "source": "Joseph Haydn, Die sieben letzten Worte unseres Erlösers am Kreuze, Hob. XX:1 (1785–87), composed for the subterranean Oratorio de la Santa Cueva, Cádiz; score hosted at IMSLP / Petrucci Music Library. Quoted words are Haydn's own account of the Cádiz performance, given in his preface to the 1801 Breitkopf & Härtel edition and reprinted by his biographer Georg August von Griesinger, Biographische Notizen über Joseph Haydn (Leipzig, 1810).",
          "href": "https://imslp.org/wiki/Sieben_letzten_Worte_unseres_Erl%C3%B6sers_am_Kreuze,_Hob.XX:1_(Haydn,_Joseph)",
          "image": {
            "src": "/covers/ethiopia-monastery-landslide--a5.png",
            "alt": "The dim lower chapel of the Oratorio de la Santa Cueva in Cádiz: a low subterranean vault of dark stone with a carved crucifix above a small altar, lit by a single hanging lamp.",
            "credit": "Benjamin Smith, Altar and crucifix of the lower chapel, Oratorio de la Santa Cueva, Cádiz (2024). CC BY-SA 4.0 via Wikimedia Commons."
          }
        }
      ]
    },
    {
      "slug": "spacex-falcon-9-moon-impact",
      "headline": "NASA says a discarded SpaceX Falcon 9 upper stage will strike the Moon on 5 August at about 5,400mph",
      "overview": "NASA's Center for Near-Earth Object Studies confirmed the spent stage, left over from a January 2025 launch that carried a pair of lunar landers, is on an accidental collision course and will hit near Einstein Crater at about 06:35 GMT on Wednesday. Astronomer Bill Gray, who first plotted the trajectory, predicts a crater more than 17 metres across and a dust plume tens of kilometres high. Telescopes across the Americas, NASA's Lunar Reconnaissance Orbiter and South Korea's Danuri probe will watch what researchers call a rare free experiment and a warning about space debris.",
      "genre": "Science",
      "sources": [
        {
          "name": "BBC",
          "href": "https://www.bbc.co.uk/news/articles/cx25yn22l97o"
        },
        {
          "name": "Space.com",
          "href": "https://www.space.com/astronomy/moon/a-spacex-rocket-will-crash-into-the-moon-next-week-and-scientists-arent-sure-what-to-expect"
        }
      ],
      "href": "#",
      "publishedAt": "2026-08-04",
      "image": {
        "src": "/covers/spacex-falcon-9-moon-impact.png",
        "alt": "The upper section of a SpaceX Falcon 9 rocket, the component on course to strike the Moon.",
        "credit": "BBC"
      },
      "rank": 22,
      "edition": "Morning Edition · 4 August 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Five men at Canterbury watch the new Moon spit fire, June 1178",
          "excerpt": "Hoc anno, die Dominica ante Nativitatem Sancti Johannis Baptistæ, post solis occasum, luna prima, signum apparuit mirabile, quinque vel eo amplius viris ex adverso sedentibus... Ex hujus divisionis medio prosilivit fax ardens, flammam, carbones et scintillas longius proiciens. Corpus interim lunæ quod inferius erat torquebatur quasi anxie, et... ut percussus coluber luna palpitabat. [In this year, on the Sunday before the Nativity of St John the Baptist, after sunset, the moon being new, a marvellous sign appeared to five or more men sitting opposite it... From the middle of this division a burning torch sprang out, flinging fire, coals and sparks far and wide. Meanwhile the lower body of the moon writhed as if in anguish, and... the moon throbbed like a struck snake.]",
          "source": "Gervase of Canterbury, Chronica, entry for A.D. 1178, in The Historical Works of Gervase of Canterbury, Vol. I, ed. William Stubbs (Rolls Series 73; London: Longman and Co., 1879), p. 276. Digitised copy hosted at the Internet Archive.",
          "href": "https://archive.org/details/thehistoricalworksofgerva1",
          "image": {
            "src": "/covers/spacex-falcon-9-moon-impact--a0.png",
            "alt": "Grey, heavily cratered lunar terrain photographed from orbit, with one small brilliant white crater at the centre throwing long pale rays outward across the older, softened ground.",
            "credit": "NASA, orbital photograph of the young rayed crater Giordano Bruno on the Moon's far limb, the crater once proposed as the site of the 1178 event. Public domain via Wikimedia Commons."
          }
        },
        {
          "category": "historical",
          "title": "Apollo 13's discarded third stage is aimed at the Moon and hits it at 5,600 mph, 1970",
          "excerpt": "The S-IVB impacted the lunar surface at 8:09:41 p.m. e.s.t., April 14, 1970, travelling at a speed of 5600 miles/hr. Stage weight at the time of impact was 30 700 pounds... The energy release from the impact was equivalent to an explosion of 7.7 tons of trinitrotoluene (TNT). Seismic signals were first recorded 28.4 seconds after impact and continued for over 4 hours. Some signals were so large that seismometer sensitivity had to be reduced by command from earth to keep the data on scale.",
          "source": "NASA, Apollo 13 Mission Report, MSC-02680 (also NASA-TM-X-66449), prepared by the Mission Evaluation Team, Manned Spacecraft Center, Houston, September 1970, section 11.3 'S-IVB impact', p. 11-10. Hosted on the NASA Technical Reports Server.",
          "href": "https://ntrs.nasa.gov/api/citations/19710003598/downloads/19710003598.pdf",
          "image": {
            "src": "/covers/spacex-falcon-9-moon-impact--a1.png",
            "alt": "Black-and-white photograph of a seismograph strip chart in a control room: three parallel ink traces run across ruled paper, flat at one end and swelling into thick bands of oscillation at the other, with a digital mission-elapsed-time readout above.",
            "credit": "NASA photograph S70-34985, the seismic record of the Apollo 13 S-IVB impact received at the Manned Spacecraft Center, 14 April 1970. Public domain via Wikimedia Commons."
          }
        },
        {
          "category": "literary",
          "title": "Ariosto sends a knight to the Moon, where everything Earth loses is piled up",
          "excerpt": "He, that with other scope had thither soared, / Pauses not all these wonder to peruse: / But led by the disciple of our Lord, / His way towards a spacious vale pursues; / A place wherein is wonderfully stored / Whatever on our earth below we lose. / Collected there are all things whatsoe'er, / Lost through time, chance, or our own folly, here... These were old crowns of the Assyrian land / And Lydian -- as that paladin was taught -- / Grecian and Persian, all of ancient fame; / And now, alas! well-nigh without a name.",
          "source": "Ludovico Ariosto, Orlando Furioso (1532), Canto XXXIV, stanzas 73 and 76, translated by William Stewart Rose (1823-31). Project Gutenberg eBook #615.",
          "href": "https://www.gutenberg.org/cache/epub/615/pg615.txt",
          "image": {
            "src": "/covers/spacex-falcon-9-moon-impact--a2.png",
            "alt": "Wood engraving in which an immense pitted Moon fills the upper two-thirds of the picture while a tiny winged chariot trailing a plume of cloud climbs toward it out of a starfield, with a small bright globe below.",
            "credit": "Gustave Doré, engraved by Charles Barbant, 'In Elijah's chariot, St John and Astolfo travel to the moon in search of Orlando's lost reason', wood engraving for Orlando Furioso, c. 1880. Public domain via Wikimedia Commons."
          }
        },
        {
          "category": "literary",
          "title": "Verne's projectile deviates from its course from some unknown cause",
          "excerpt": "...that it had deviated from its course from some unknown cause, and had not reached its destination; but that it had passed near enough to be retained by the lunar attraction; that its rectilinear movement had been changed to a circular one, and that following an elliptical orbit round the star of night it had become its satellite... It ended with the double hypothesis: either the attraction of the moon would draw it to herself, and the travelers thus attain their end; or that the projectile, held in one immutable orbit, would gravitate around the lunar disc to all eternity.",
          "source": "Jules Verne, From the Earth to the Moon (De la Terre à la Lune, 1865), chapter XXVIII, 'A New Star', in the anonymous English translation published as From the Earth to the moon; and, round the moon. Project Gutenberg eBook #83.",
          "href": "https://www.gutenberg.org/files/83/83-h/83-h.htm"
        },
        {
          "category": "artistic",
          "title": "Méliès puts the capsule in the Moon's eye, 1902",
          "excerpt": "A plaster Moon with a fleshy human face fills the frame, its craters modelled like blemishes on a cheek. The gunners' shell arrives from the left and buries itself in the right eye, and a splash of hand-painted red runs down from the wound while the face goes on grimacing at the audience. It is the first great image of a human machine striking another world, and it was already a joke at the expense of our aim.",
          "source": "Georges Méliès, Le Voyage dans la Lune (Star-Film, Paris, 1902), frame from the only surviving hand-coloured print, colouring by the Thuillier studio. Object page on Wikimedia Commons.",
          "href": "https://commons.wikimedia.org/wiki/File:Melies_color_Voyage_dans_la_lune.jpg",
          "image": {
            "src": "/covers/spacex-falcon-9-moon-impact--a4.png",
            "alt": "Hand-coloured film frame showing a pale yellow moon with a wrinkled human face; a red bullet-shaped capsule is embedded in its right eye and a bright red splash runs down the cheek, against a background of green painted clouds, with film sprocket holes at the edges.",
            "credit": "Georges Méliès, Le Voyage dans la Lune (1902), hand-coloured print frame. Public domain via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "Offenbach's gunners load the Moon shot, Paris 1875",
          "excerpt": "Act I ends at the mouth of a cannon, with the Chœur des artilleurs: 'Nous sommes les petits artilleurs, moyens artilleurs et grands artilleurs. C'est ici, ce n'est pas ailleurs qu'on trouve de vrais artilleurs' — 'We are the little gunners, middling gunners and great gunners. It is here, and nowhere else, that you find real gunners.' The finale it launches is headed in the score simply 'En route pour la lune!', and Act II opens with the travellers rattling inside their shell in the Rondo de l'obus, 'Dans un obus qui fend l'air'.",
          "source": "Jacques Offenbach, Le voyage dans la lune, opéra-féerie in four acts, libretto by Albert Vanloo, Eugène Leterrier and Arnold Mortier, first performed at the Théâtre de la Gaîté, Paris, 26 October 1875; vocal score, piano reduction by Léon Roques (Paris: Choudens père et fils, [1875], plate A.C.3340), scanned from the Bibliothèque nationale de France copy. Hosted at IMSLP / Petrucci Music Library.",
          "href": "https://imslp.org/wiki/Le_voyage_dans_la_Lune_(Offenbach,_Jacques)"
        }
      ]
    },
    {
      "slug": "august-primaries-michigan-senate",
      "headline": "Voters in five states hold primaries on 4 August, with Michigan's Democratic Senate contest the clearest test yet of the party's direction",
      "overview": "Michigan Democrats choose between Abdul El-Sayed, backed by Senator Bernie Sanders, and four-term Representative Haley Stevens, backed by Senate Democratic leader Chuck Schumer, for the seat left open by the retiring Gary Peters; the winner faces Republican Mike Rogers. Michigan voters are also picking nominees to succeed term-limited Governor Gretchen Whitmer. Kansas, Missouri, Virginia and Washington state are settling primaries too, including a bitter Democratic House rematch in Missouri.",
      "genre": "Politics",
      "sources": [
        {
          "name": "AP",
          "href": "https://news.google.com/rss/articles/CBMiugFBVV95cUxNSVhzbjFSb011WlRldWhpNWU5UkJvTEM2UUpwRG11UTQ5VUZzd3VVRWFxd1dUUFBiUTc1X09zWUI3NEhLZlcxbVp5Y3ZfWHNJQUtPS0VHSWRVUFdHRTVUUDdaNkgtaFpGZGNhaTdrNVNQMlRlRVphTVc1Q283bHVzQU5iRGlLQ0dVTFJ1MWdEQlQ3RDdzWExfbnFCanlNblpHU2I1cy10R1ZNeTkyWkM5bVpOSDRLQmJZNWc?oc=5"
        },
        {
          "name": "AP",
          "href": "https://news.google.com/rss/articles/CBMiqgFBVV95cUxQcVBtQW1SWUtxVzJWZTV3VWFpUTF2azcwZWZrdGRmVHN0dE9jeHJlVHZfYWpKV2lQN0tIelhNdnN4a0UxRzRBb2lSa2xOR1J1eWE0VHIxMWdoRTVKSHg3anloa1gwU0pHQWd1Z3hfX3lGa1pjWk1xdzd4LWFNMXB6WDI5UGdvanpzNmVWbC15cG9KMHp2LUVhR2lIeVVINDQ3dGN0blVTZkVhZw?oc=5"
        }
      ],
      "href": "#",
      "publishedAt": "2026-08-04",
      "image": {
        "src": "/covers/august-primaries-michigan-senate.png",
        "alt": "Voters filling in ballots at privacy booths in an American polling place on primary day.",
        "credit": "AP"
      },
      "rank": 23,
      "edition": "Morning Edition · 4 August 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Sparta chose its elders by measuring the shouting",
          "excerpt": "An assembly of the people having been convened, chosen men were shut up in a room near by so that they could neither see nor be seen, but only hear the shouts of the assembly. For as in other matters, so here, the cries of the assembly decided between the competitors. These did not appear in a body, but each one was introduced separately, as the lot fell, and passed silently through the assembly. ... Whoever was greeted with the most and loudest shouting, him they declared elected.",
          "source": "Plutarch, Life of Lycurgus, ch. 26 (c. AD 100), in Plutarch's Lives, with an English translation by Bernadotte Perrin, Cambridge, MA: Harvard University Press / London: William Heinemann, 1914; hosted by the Perseus Digital Library, Tufts University.",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A2008.01.0047%3Achapter%3D26",
          "image": {
            "src": "/covers/august-primaries-michigan-senate--a0.png",
            "alt": "Line engraving of a bearded Lycurgus seated beside a smoking altar, leaning back as a crowd of young Spartan men in tunics and cloaks presses in around him to listen.",
            "credit": "M. A. Barth, Lycurgus gives his laws to the people before his death, engraving from Vorzeit und Gegenwart (Augsburg, 1832). Public domain via Wikimedia Commons."
          }
        },
        {
          "category": "historical",
          "title": "1896: an insurgent faction declares it will take charge of the party",
          "excerpt": "On the fourth of March, 1895, a few Democrats, most of them members of Congress, issued an address to the Democrats of the nation, asserting that the money question was the paramount issue of the hour; declaring that a majority of the Democratic party had the right to control the action of the party on this paramount issue; and concluding with the request that the believers in the free coinage of silver in the Democratic party should organize, take charge of, and control the policy of the Democratic party.",
          "source": "William Jennings Bryan, \"Cross of Gold\" speech concluding debate on the Chicago Platform at the Democratic National Convention, Chicago, 9 July 1896; transcription hosted by Wikisource.",
          "href": "https://en.wikisource.org/wiki/Cross_of_Gold_Speech",
          "image": {
            "src": "/covers/august-primaries-michigan-senate--a1.png",
            "alt": "Colour campaign poster of 1896: an oval portrait of William Jennings Bryan above smaller portraits of his wife and three children, flanked by American flags and ribbons reading 'You shall not press down upon the brow of labor this Crown of Thorns' and 'You shall not crucify mankind upon a Cross of Gold', with the entire speech printed below in dense columns under the heading 'THE SPEECH THAT WON THE NOMINATION'.",
            "credit": "Peter Tracy (publisher), \"16 to 1 ... the speech that won the nomination ... at the National Democratic Convention at Chicago, 1896\" (1896), Library of Congress Prints and Photographs Division. Public domain via Wikimedia Commons."
          }
        },
        {
          "category": "literary",
          "title": "Coriolanus begs for the voices he despises, because custom calls him to it",
          "excerpt": "Most sweet voices! Better it is to die, better to starve, Than crave the hire which first we do deserve. Why in this wolvish toge should I stand here To beg of Hob and Dick that does appear Their needless vouches? Custom calls me to’t. What custom wills, in all things should we do’t? ... Here come more voices. Your voices! For your voices I have fought; Watched for your voices; for your voices bear Of wounds two dozen odd.",
          "source": "William Shakespeare, The Tragedy of Coriolanus (c. 1608), Act II, scene iii; Project Gutenberg eBook #1535, prepared by the PG Shakespeare Team.",
          "href": "https://www.gutenberg.org/files/1535/1535-h/1535-h.htm"
        },
        {
          "category": "literary",
          "title": "Mr Pickwick's rule for a town split in two: shout with the largest",
          "excerpt": "‘Slumkey for ever!’ roared the honest and independent. ‘Slumkey for ever!’ echoed Mr. Pickwick, taking off his hat. ‘No Fizkin!’ roared the crowd. ‘Certainly not!’ shouted Mr. Pickwick. ... ‘Who is Slumkey?’ whispered Mr. Tupman. ‘I don’t know,’ replied Mr. Pickwick, in the same tone. ‘Hush. Don’t ask any questions. It’s always best on these occasions to do what the mob do.’ ‘But suppose there are two mobs?’ suggested Mr. Snodgrass. ‘Shout with the largest,’ replied Mr. Pickwick.",
          "source": "Charles Dickens, The Posthumous Papers of the Pickwick Club, ch. XIII, \"Some Account of Eatanswill; of the State of Parties therein; and of the Election of a Member to serve in Parliament for that ancient, loyal, and patriotic Borough\" (serialised 1836–37); Project Gutenberg eBook #580.",
          "href": "https://www.gutenberg.org/files/580/580-h/580-h.htm"
        },
        {
          "category": "artistic",
          "title": "Bingham puts the whole apparatus of a party contest on one courthouse step",
          "excerpt": "Bingham, a Whig who had himself lost a Missouri legislative seat and then won it back, crowds more than a hundred men onto a single courthouse portico. At the top of the steps a voter swears his oath with his hand raised before the seated judge while the candidate in the blue coat doffs his hat behind him; below, a party worker in a top hat presses a ticket into a wavering elector's fingers. Cider barrel and punch bowl do their own canvassing at the left, one citizen too drunk to stand is hauled up to vote, and another nurses a head bloodied in a brawl. Hung from the portico, a pale blue banner carries the painting's deadpan caption: The Will of the People the Supreme Law. In the dust in front, two boys play, entirely indifferent.",
          "source": "George Caleb Bingham (American, 1811–1879), The County Election, 1852, oil on canvas, 38 x 52 in. (96.5 x 132.1 cm), Saint Louis Art Museum, object number 44:2001, Gift of Bank of America; museum object page at slam.org.",
          "href": "https://www.slam.org/collection/objects/29775/",
          "image": {
            "src": "/covers/august-primaries-michigan-senate--a4.png",
            "alt": "Oil painting of a crowded American election day: dozens of men in hats and shirtsleeves fill a dusty street outside a columned courthouse, one voter taking an oath with his hand raised before an official on the steps, others electioneering, drinking from a punch bowl and cider barrel, a small pale blue banner hanging from the portico, and two boys playing on the ground in the foreground.",
            "credit": "George Caleb Bingham, The County Election (1852), Saint Louis Art Museum (44:2001). Public domain via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "Sullivan sets the joke to music: born a little Liberal or a little Conservative",
          "excerpt": "I often think it's comical—Fal, lal, la! How Nature always does contrive—Fal, lal, la! That every boy and every gal, That's born into the world alive, Is either a little Liberal, Or else a little Conservative! Fal, lal, la! When in that house M.P.s divide, If they've a brain and cerebellum, too, They've got to leave that brain outside, And vote just as their leaders tell 'em to.",
          "source": "Arthur Sullivan (music) and W. S. Gilbert (words), Iolanthe; or, The Peer and the Peri, comic opera in two acts, first performed at the Savoy Theatre, London, 25 November 1882; Act II, Private Willis's song \"When all night long a chap remains.\" Full score, vocal score and parts at IMSLP / Petrucci Music Library (linked); the sung text quoted here is verified against the Wikisource transcription of the libretto at https://en.wikisource.org/wiki/Iolanthe/Act_II.",
          "href": "https://imslp.org/wiki/Iolanthe_(Sullivan,_Arthur)",
          "image": {
            "src": "/covers/august-primaries-michigan-senate--a5.png",
            "alt": "Chromolithographed sheet-music cover reading 'IOLANTHE — Comic Opera in Two Acts', with an inset of coroneted peers in red and ermine robes filing past a bridge, a Grenadier Guards sentry in a bearskin standing at his sentry box, and below a round vignette of fairies dancing before the moonlit Houses of Parliament while a fairy plays a pipe on the riverbank.",
            "credit": "George H. Walker & Co., lithographed cover for Ernst Perabo, Ten Transcriptions for the Piano on Iolanthe, Op. 14 (Boston, 1887). Public domain via Wikimedia Commons."
          }
        }
      ]
    },
    {
      "slug": "ariana-grande-withdraws-london-musical",
      "headline": "Ariana Grande withdraws from a 2027 London staging of 'Sunday in the Park With George' and will step back from public life",
      "overview": "Empire Street Productions said the singer will no longer appear at the Barbican alongside her \"Wicked\" co-star Jonathan Bailey in the Stephen Sondheim musical. A representative said the 33-year-old will take \"a step back from visibility\" after finishing the Eternal Sunshine Tour, citing \"endless, ongoing public scrutiny\". The withdrawal follows her split from Ethan Slater and last week's album release, amid heavy online speculation about her health and appearance.",
      "genre": "Culture",
      "sources": [
        {
          "name": "AP",
          "href": "https://news.google.com/rss/articles/CBMipwFBVV95cUxNNHBGS0ZoVmlWV3l5ZEkzZFV5cHIwWmxtZlVNMHBlUWxJaG9UaTlTSHhXeEpCTlljdG1GSGd6bjE1aFA2X1EtUTREd3dxX2czajhyOTdnZ3RsMWtvTkY2SURJZFRYZE9QZHJkQlVPUGxkSjNseXdFV1lZWG5wQkQzeklhVEx3dnJ1X0phSktyRC1MYzdEN1FzRmdETzVNZ2FCbWJPOFYtSQ?oc=5"
        },
        {
          "name": "BBC",
          "href": "https://www.bbc.co.uk/news/articles/c3ek7g857q4o"
        }
      ],
      "href": "#",
      "publishedAt": "2026-08-04",
      "image": {
        "src": "/covers/ariana-grande-withdraws-london-musical.png",
        "alt": "Ariana Grande photographed on a red carpet in a pale embellished gown, looking away from the cameras.",
        "credit": "AP"
      },
      "rank": 24,
      "edition": "Morning Edition · 4 August 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Phryne is stripped before the Areopagus, c. 350 BC",
          "excerpt": "But Hyperides, when pleading Phryne's cause, as he did not succeed at all, but it was plain that the judges were about to condemn her, brought her forth into the middle of the court, and, tearing open her tunic and displaying her naked bosom, employed all the end of his speech, with the highest oratorical art, to excite the pity of her judges by the sight of her beauty, and inspired the judges with a superstitious fear, so that they were so moved by pity as not to be able to stand the idea of condemning to death “a prophetess and priestess of Venus.”",
          "source": "Athenaeus of Naucratis, The Deipnosophists, Book XIII, ch. 59 (c. AD 200), trans. C. D. Yonge, London: Henry G. Bohn, 1854, p. 942; hosted by the Perseus Digital Library, Tufts University",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A2013.01.0003%3Abook%3D13%3Achapter%3D59",
          "image": {
            "src": "/covers/ariana-grande-withdraws-london-musical--a0.png",
            "alt": "A nude woman shields her face with her arm as an orator pulls away her robe before a semicircle of seated, gesturing male judges in a marble hall.",
            "credit": "Jean-Léon Gérôme, Phryne revealed before the Areopagus (1861), Hamburger Kunsthalle, Hamburg. Public domain via Wikimedia Commons."
          }
        },
        {
          "category": "historical",
          "title": "Fanny Kemble, the most famous actress of her day, writes home about wanting to leave the stage",
          "excerpt": "It is very well that our audiences should look at us as mere puppets, for could they sometimes see the real feelings of those for whose false miseries their sympathies are excited, I believe sufficiently in their humanity to think they would kindly give us leave to leave off and go home. Ours is a very strange trade, and I am sorry to say that every day increases my distaste for it.... For many years—ever since I entered upon my first girlhood, indeed—a quiet, lonely life upon a small independence has been the aim of my desires and my notion of happiness.",
          "source": "Frances Anne (Fanny) Kemble, letter to Harriet St. Leger, Philadelphia, October 22, 1832, printed in Records of a Girlhood (New York: Henry Holt & Co., 1879); Project Gutenberg ebook no. 16478",
          "href": "https://www.gutenberg.org/files/16478/16478-h/16478-h.htm",
          "image": {
            "src": "/covers/ariana-grande-withdraws-london-musical--a1.png",
            "alt": "Painted three-quarter portrait of a dark-haired young woman in a white gown with a sheer organdy sleeve, looking away from the viewer against a dark background.",
            "credit": "Thomas Sully, Fanny Kemble (1834), The White House, Washington, D.C. Public domain via Wikimedia Commons."
          }
        },
        {
          "category": "literary",
          "title": "Charlotte Brontë watches an audience feed on an actress in 'Villette'",
          "excerpt": "Swordsmen thrust through, and dying in their blood on the arena sand; bulls goring horses disembowelled, made a meeker vision for the public—a milder condiment for a people’s palate—than Vashti torn by seven devils: devils which cried sore and rent the tenement they haunted, but still refused to be exorcised. Suffering had struck that stage empress; and she stood before her audience neither yielding to, nor enduring, nor, in finite measure, resenting it: she stood locked in struggle, rigid in resistance.",
          "source": "Charlotte Brontë, Villette (London: Smith, Elder & Co., 1853), Chapter XXIII, “Vashti”; Project Gutenberg ebook no. 9182",
          "href": "https://www.gutenberg.org/files/9182/9182-h/9182-h.htm"
        },
        {
          "category": "literary",
          "title": "Emily Dickinson on the dreariness of being somebody",
          "excerpt": "I'm nobody! Who are you?\nAre you nobody, too?\nThen there's a pair of us—don't tell!\nThey'd banish us, you know.\n\nHow dreary to be somebody!\nHow public, like a frog\nTo tell your name the livelong day\nTo an admiring bog!",
          "source": "Emily Dickinson, “I'm nobody! Who are you?”, in Poems by Emily Dickinson: Second Series, ed. T. W. Higginson and Mabel Loomis Todd (Boston: Roberts Brothers, 1891), Part I: Life, poem I; transcribed at Wikisource",
          "href": "https://en.wikisource.org/wiki/Poems:_Second_Series_(Dickinson)/I%27m_nobody!_Who_are_you%3F",
          "image": {
            "src": "/covers/ariana-grande-withdraws-london-musical--a3.png",
            "alt": "Daguerreotype of a young woman with centre-parted dark hair in a dark pleated dress, seated with one hand resting on a book, gazing steadily at the camera.",
            "credit": "Unknown photographer, daguerreotype of Emily Dickinson (c. 1848), Todd-Bingham Picture Collection, Yale University Manuscripts & Archives. Public domain via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "Seurat's 'A Sunday on La Grande Jatte' — the crowd the musical is built from",
          "excerpt": "Seurat spent two years assembling a riverbank of Parisians out of millions of separate dots of colour: stiff, frontal, hieratic figures who almost never look at one another. A woman with a monkey on a leash stands under a parasol at the right edge, sealed inside her own silhouette; a lone rower reclines in the grass; a small girl in white stares straight out of the picture at us. It is a painting of a public holiday in which nobody visibly appears to be having one — a whole crowd, and inside it, absolute solitude.",
          "source": "Georges Seurat, A Sunday on La Grande Jatte — 1884, oil on canvas, 1884–86 (border added 1888–89), 207.5 × 308.1 cm, Art Institute of Chicago, Helen Birch Bartlett Memorial Collection, accession no. 1926.224; digital file hosted on Wikimedia Commons",
          "href": "https://commons.wikimedia.org/wiki/File:A_Sunday_on_La_Grande_Jatte,_Georges_Seurat,_1884.jpg",
          "image": {
            "src": "/covers/ariana-grande-withdraws-london-musical--a4.png",
            "alt": "Large pointillist painting of Parisians in Sunday dress standing and sitting on a sunlit river island, with parasols, a sailboat on the water, and figures facing rigidly in profile.",
            "credit": "Georges Seurat, A Sunday on La Grande Jatte — 1884 (1884–86), Art Institute of Chicago. Public domain via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "Hugo Wolf sets Mörike's 'Verborgenheit': leave me, O world, leave me be",
          "excerpt": "Laß, o Welt, o laß mich seyn!\nLocket nicht mit Liebesgaben!\nLaßt dies Herz alleine haben\nSeine Wonne, seine Pein!\n\nWas ich traure weiß ich nicht,\nEs ist unbekanntes Wehe;\nImmerdar durch Thränen sehe\nIch der Sonne liebes Licht.\n\nOft bin ich mir kaum bewußt,\nUnd die helle Freude zücket\nDurch die Schwere, so mich drücket\nWonniglich in meiner Brust.\n\nLaß, o Welt, o laß mich seyn!\nLocket nicht mit Liebesgaben!\nLaßt dies Herz alleine haben\nSeine Wonne, seine Pein!",
          "source": "Hugo Wolf, “Verborgenheit” (Seclusion), no. 12 of Gedichte von Eduard Mörike für eine Singstimme und Klavier, composed 1888, published Vienna 1889; scores at IMSLP / Petrucci Music Library. Poem text quoted from the first edition: Eduard Mörike, Gedichte (Stuttgart and Tübingen: Cotta, 1838), p. 143, digitised by the Deutsches Textarchiv",
          "href": "https://imslp.org/wiki/M%C3%B6rike-Lieder_(Wolf,_Hugo)"
        }
      ]
    },
    {
      "slug": "le-porge-wildfire-ww2-shells",
      "headline": "Wildfires in Gironde uncover a cache of about 400 buried World War Two shells in the French village of Le Porge",
      "overview": "More than 100 explosions heard on the second night of the fire, first taken for gas cylinders, are now believed to have been German and French mortar and anti-tank shells set off by the heat. \"There were ammunition depots buried in land within our municipality, but we didn't know it, and they exploded,\" Mayor Martial Zaninetti said, likening the noise to \"the sound of war\". More than 180 houses in the village burned; demining has allowed most residents home, though some areas remain sealed off.",
      "genre": "Culture",
      "sources": [
        {
          "name": "BBC",
          "href": "https://www.bbc.co.uk/news/articles/cgmkxjrrwdvo"
        },
        {
          "name": "France Info",
          "href": "https://www.franceinfo.fr/environnement/evenements-meteorologiques-extremes/incendies-et-feux-de-foret/incendies-en-gironde/des-obus-ont-explose-au-porge-en-gironde-un-stock-de-munitions-de-la-seconde-guerre-mondiale-a-ete-decouvert-au-plus-fort-de-l-incendie_8128559.html"
        }
      ],
      "href": "#",
      "publishedAt": "2026-08-04",
      "image": {
        "src": "/covers/le-porge-wildfire-ww2-shells.png",
        "alt": "A mother and son standing in the burnt-out surroundings of their destroyed home in Le Porge after the Gironde wildfire.",
        "credit": "BBC"
      },
      "rank": 25,
      "edition": "Morning Edition · 4 August 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Germanicus walks the Teutoburg Forest, AD 15: a battlefield six years buried gives up its bones and broken weapons",
          "excerpt": "In the centre of the field were the whitening bones of men, as they had fled, or stood their ground, strewn everywhere or piled in heaps. Near, lay fragments of weapons and limbs of horses, and also human heads, prominently nailed to trunks of trees. In the adjacent groves were the barbarous altars, on which they had immolated tribunes and first-rank centurions.",
          "source": "Tacitus, The Annals, Book 1, chapter 61 (written c. AD 116), translated by Alfred John Church and William Jackson Brodribb, in Complete Works of Tacitus (New York: Random House, reprinted 1942); hosted by the Perseus Digital Library, Tufts University.",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.02.0078%3Abook%3D1%3Achapter%3D61",
          "image": {
            "src": "/covers/le-porge-wildfire-ww2-shells--a0.png",
            "alt": "Painting of Germanic warriors with spears and shields storming through a dark forest against Roman legionaries, with dead bodies and scattered arms in the mud",
            "credit": "Otto Albert Koch, Varusschlacht (1909), Lippisches Landesmuseum Detmold. Public domain via Wikimedia Commons."
          }
        },
        {
          "category": "historical",
          "title": "An anonymous letter, October 1605: England learns that its Parliament has been sitting above a hidden magazine of powder",
          "excerpt": "My lord, out of the love I beare to some of youere frends, I have a care of youre preservacion, therefore I would aduyse you as you tender your life to devise some excuse to shift youer attendance at this parliament, for God and man hath concurred to punishe the wickedness of this tyme, and thinke not slightly of this advertisement, but retire yourself into your country, where you may expect the event in safety, for though there be no apparance of anni stir, yet I saye they shall receive a terrible blow this parliament and yet they shall not seie who hurts them",
          "source": "Anonymous letter delivered to William Parker, 4th Baron Monteagle, 26 October 1605 (the “Monteagle Letter”), original held by The National Archives, Kew, State Papers SP 14/216; transcription hosted at Wikisource.",
          "href": "https://en.wikisource.org/wiki/Monteagle_Letter",
          "image": {
            "src": "/covers/le-porge-wildfire-ww2-shells--a1.png",
            "alt": "Photograph of the original 1605 Monteagle letter, a single sheet of aged paper covered in cramped brown secretary-hand script",
            "credit": "Anonymous, the Monteagle Letter (October 1605), The National Archives (UK), SP 14/216. Public domain via Wikimedia Commons."
          }
        },
        {
          "category": "literary",
          "title": "Virgil foresees the ploughman of Philippi turning up rusted weapons in a field long since at peace",
          "excerpt": "Then, after length of Time, the lab'ring Swains, / Who turn the Turfs of those unhappy Plains, / Shall rusty Piles from the plough'd Furrows take, / And over empty Helmets pass the Rake. / Amaz'd at Antick Titles on the Stones, / And mighty Relicks of Gygantick Bones.",
          "source": "Virgil, Georgics, Book I, lines 493–497 (29 BC), translated by John Dryden, from Virgil's Pastorals, Georgics and Aeneis (London, 1709), volume 1; transcribed at Wikisource. The Latin (“exesa inveniet scabra robigine pila / aut gravibus rastris galeas pulsabit inanis”) is at Perseus, P. Vergilius Maro, Georgicon, ed. J. B. Greenough, book 1, card 466.",
          "href": "https://en.wikisource.org/wiki/The_Works_of_Virgil_(Dryden)/Georgics_(Dryden)/Book_1"
        },
        {
          "category": "literary",
          "title": "Thomas Hardy's dead, woken in their coffins by gunnery out at sea, mistake the noise of war for the Judgment Day",
          "excerpt": "That night your great guns, unawares, / Shook all our coffins as we lay, / And broke the chancel window-squares, / We thought it was the Judgment-day // And sat upright. While drearisome / Arose the howl of wakened hounds: / The mouse let fall the altar-crumb, / The worms drew back into the mounds, / … / Again the guns disturbed the hour, / Roaring their readiness to avenge, / As far inland as Stourton Tower, / And Camelot, and starlit Stonehenge.",
          "source": "Thomas Hardy, “Channel Firing” (written April 1914; published in Satires of Circumstance, Lyrics and Reveries, London: Macmillan, 1914); full text at Wikisource.",
          "href": "https://en.wikisource.org/wiki/Channel_Firing"
        },
        {
          "category": "artistic",
          "title": "Egbert van der Poel paints the morning after the Delft Thunderclap, when the town's own powder store went up beneath it",
          "excerpt": "On 12 October 1654 the gunpowder store the city of Delft kept for its own defence detonated, and van der Poel — a painter of the town, thought to have lost a daughter that day — went back to the scene again and again, leaving more than twenty versions of it. Here the foreground is a field of shattered beams and rubble under a smoke-yellowed sky, with small figures picking through it and a flooded hollow where the magazine had stood. On the horizon the Nieuwe Kerk, the town hall and the Oude Kerk still stand, their roofs stripped of tiles by the blast; the painter signed the panel with the date of the explosion itself.",
          "source": "Egbert van der Poel, A View of Delft after the Explosion of 1654, oil on wood, 36.2 × 49.5 cm, inscribed with the date 12 Octob 1654; The National Gallery, London, NG1061 (Room 25).",
          "href": "https://www.nationalgallery.org.uk/paintings/egbert-van-der-poel-a-view-of-delft-after-the-explosion-of-1654",
          "image": {
            "src": "/covers/le-porge-wildfire-ww2-shells--a4.png",
            "alt": "Seventeenth-century Dutch painting of a flattened town: broken beams, rubble and small figures in the foreground, a pool of water where the powder magazine stood, and church towers still standing on the horizon under a hazy sky",
            "credit": "Egbert van der Poel, A View of Delft after the Explosion of 1654 (1654), The National Gallery, London (NG1061). Public domain via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "Berlioz's Requiem, written for France's war dead, sets four brass choirs at the compass points to sound through the tombs",
          "excerpt": "Tuba mirum spargens sonum / Per sepulchra regionum, / Coget omnes ante thronum. — “The last loud trumpet's wond'rous sound / Shall through the rending tombs rebound, / And wake the nations under ground.”",
          "source": "Hector Berlioz, Grande messe des morts (Requiem), H 75 / Op. 5, composed March–29 June 1837 on a French government commission commemorating the dead of the July Revolution and the soldiers killed at Constantine; No. 2, “Dies iræ. Prose – Tuba mirum,” for tenor, chorus, orchestra and four antiphonal brass choirs placed north, east, west and south; first performed at Les Invalides, Paris, 5 December 1837 under Habeneck. Holograph manuscript (1837, Bibliothèque nationale de France) and printed scores at IMSLP / Petrucci Music Library. The Latin sequence and John Dryden's English rendering quoted here are as printed in The Catholic Prayer Book and Manual of Meditations (1883), Wikisource: https://en.wikisource.org/wiki/The_Catholic_Prayer_Book_and_Manual_of_Meditations/Dies_Irae",
          "href": "https://imslp.org/wiki/Grande_messe_des_morts,_H_75_(Berlioz,_Hector)",
          "image": {
            "src": "/covers/le-porge-wildfire-ww2-shells--a5.png",
            "alt": "First page of Berlioz's 1837 autograph manuscript score of the Grande messe des morts, a densely inked orchestral page with many staves and handwritten instrument names",
            "credit": "Hector Berlioz, Grande messe des morts, first page of the autograph manuscript (1837), Bibliothèque nationale de France (Gallica). Public domain via Wikimedia Commons."
          }
        }
      ]
    },
    {
      "slug": "japan-defence-paper-combat-drones",
      "headline": "Japan's cabinet adopts a 598-page defence white paper calling combat drones essential to 'new ways of warfare'",
      "overview": "The annual paper, adopted on Tuesday, again names China as Japan's biggest strategic challenge and points to the growing presence of Chinese warships in the Pacific. Drawing on Ukraine's use of drones, Tokyo says it will prioritise developing its own for coastal defence alongside long-range cruise missiles. Prime Minister Sanae Takaichi's government, which needs public support for further military spending and recruits, gave the report a cartoon cover and links to video clips in Japanese, English and Chinese.",
      "genre": "Politics",
      "sources": [
        {
          "name": "AP",
          "href": "https://news.google.com/rss/articles/CBMilwFBVV95cUxPRV9ITkwtMlI3eW5rNDJwVldyU0lmR24xSWoyTGxsbXhXQ2lVZldLS3NMWUdoRFVacFdmeXpMRWo3YUFQN19zSTdsdzIwVm5BdlRPaHlOVGF0ckdBWWVJVFhYeS1kOVRxZU1nbmVZWEZ0QXNrNkxEcU1MdHRQbDVaYVI0MTMzaTBSblhKTEJDVjlhVWoyWkJF?oc=5"
        },
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMirAFBVV95cUxPcUJQVVd6S3NYc2pFV2IyYW90UXl5bjJBb3JwcWFDclNEY1VMbzNYZ1V0cjhvd0lBZVFGMlJ0bzYzNl83TVY1Z0U5M1JsXzA3THlBN2xhUjJkOWpadVhCenRTX0QxME5xSnExeWFpRFF0WVd3ZzNxZ1BJeEQzVGctNlBRUEs3ZHllVVBJNWk4TzlNQmFqY3pHV0JEZll1S1RWUDNjRFlFeXRoWHpB?oc=5"
        }
      ],
      "href": "#",
      "publishedAt": "2026-08-04",
      "image": {
        "src": "/covers/japan-defence-paper-combat-drones.png",
        "alt": "A Japanese naval destroyer moored at a floodlit quayside under a deep twilight sky.",
        "credit": "AP"
      },
      "rank": 26,
      "edition": "Morning Edition · 4 August 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Themistocles talks Athens out of its dividend and into two hundred ships",
          "excerpt": "The advice of Themistocles had prevailed on a previous occasion. The revenues from the mines at Laurium had brought great wealth into the Athenians' treasury, and when each man was to receive ten drachmae for his share, Themistocles persuaded the Athenians to make no such division but to use the money to build two hundred ships for the war, that is, for the war with Aegina. This was in fact the war the outbreak of which saved Hellas by compelling the Athenians to become seamen.",
          "source": "Herodotus, The Histories, Book 7, chapter 144; English translation by A. D. Godley, Cambridge, MA: Harvard University Press, 1920. Hosted by the Perseus Digital Library, Tufts University.",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0126%3Abook%3D7%3Achapter%3D144",
          "image": {
            "src": "/covers/japan-defence-paper-combat-drones--a0.png",
            "alt": "Weathered marble relief fragment carved with the flank of an Athenian trireme, showing three staggered banks of nude rowers bending over their oars beneath the ship's deck rail.",
            "credit": "The Lenormant Relief, fragment of a votive relief showing an Athenian trireme, 4th century BC, Acropolis Museum, Athens. Photograph by Tilemahos Efthimiadis, CC BY-SA 2.0 via Wikimedia Commons."
          }
        },
        {
          "category": "historical",
          "title": "The clause Japan wrote against itself: Article 9 renounces war forever",
          "excerpt": "Aspiring sincerely to an international peace based on justice and order, the Japanese people forever renounce war as a sovereign right of the nation and the threat or use of force as means of settling international disputes. (2) In order to accomplish the aim of the preceding paragraph, land, sea, and air forces, as well as other war potential, will never be maintained. The right of belligerency of the state will not be recognized.",
          "source": "The Constitution of Japan, promulgated 3 November 1946, effective 3 May 1947; Chapter II, \"Renunciation of War,\" Article 9. English text based on the edition of the Government Printing Bureau, published online by the National Diet Library of Japan (\"Birth of the Constitution of Japan\").",
          "href": "https://www.ndl.go.jp/constitution/e/etc/c01.html",
          "image": {
            "src": "/covers/japan-defence-paper-combat-drones--a1.png",
            "alt": "Opening page of the original Constitution of Japan, brush-written in vertical columns of Japanese characters on aged paper ruled with thin red lines, beginning with the Emperor's rescript.",
            "credit": "Government of Japan, opening page (imperial rescript) of the original copy of the Constitution of Japan, 3 November 1946. Public domain via Wikimedia Commons."
          }
        },
        {
          "category": "literary",
          "title": "Milton's rebel angels invent artillery, and everyone wishes they had thought of it first",
          "excerpt": "These in their dark nativity the deep / Shall yield us, pregnant with infernal flame; / Which, into hollow engines, long and round, / Thick rammed, at the other bore with touch of fire / Dilated and infuriate, shall send forth / From far, with thundering noise, among our foes / Such implements of mischief, as shall dash / To pieces, and o’erwhelm whatever stands / Adverse, that they shall fear we have disarmed / The Thunderer of his only dreaded bolt. … The invention all admired, and each, how he / To be the inventer missed; so easy it seemed / Once found, which yet unfound most would have thought / Impossible",
          "source": "John Milton, Paradise Lost, Book VI (first published 1667; revised 1674), speech of Satan on the making of cannon. Project Gutenberg eBook No. 26.",
          "href": "https://www.gutenberg.org/files/26/26-h/26-h.htm"
        },
        {
          "category": "literary",
          "title": "H. G. Wells imagines an air war fought without telling the public",
          "excerpt": "One of the most striking facts historically about this war, and the one that makes the complete separation that had arisen between the methods of warfare and the necessity of democratic support, is the effectual secrecy of the Washington authorities about their airships. They did not bother to confide a single fact of their preparations to the public. They did not even condescend to talk to Congress. They burked and suppressed every inquiry. The war was fought by the President and the Secretaries of State in an entirely autocratic manner. … So they took great pains to direct the popular mind towards defensive artillery, and to divert it from any thought of aerial battle.",
          "source": "H. G. Wells, The War in the Air, 1908; Chapter VI, \"How War Came to New York.\" Project Gutenberg eBook No. 780.",
          "href": "https://www.gutenberg.org/files/780/780-h/780-h.htm"
        },
        {
          "category": "artistic",
          "title": "Kiyochika sells the searchlight: a night attack lit by the newest machine",
          "excerpt": "Heijô kôgeki denki shiyô no zu — \"Illustration of the Use of Electricity in the Attack on Pyongyang.\" Across three joined sheets a hard white beam leaps from a Japanese searchlight crew silhouetted on the left bank, cuts the whole width of the night, and pins the Chinese fort on the far right, which is already blooming into orange fire and smoke. Below the beam, artillerymen in dark tunics manhandle field guns down into the shallows while an officer sits calmly at a folding table with a lamp. The hero of the picture is not a soldier but a piece of equipment.",
          "source": "Kobayashi Kiyochika, Heijô kôgeki denki shiyô no zu (\"Using an Electric Searchlight in the Attack on Pyongyang\"), colour woodcut triptych, 353 × 723 mm, published by Inoue Kichijirô (Teikadô), 1894. Rijksmuseum, Amsterdam, object no. RP-P-2010-310-14.",
          "href": "https://www.rijksmuseum.nl/en/collection/object/Een-elektrisch-zoeklicht-gebruiken-bij-de-aanval-op-Pyongyang--b93d13f0b34a691277fa6cc44a1e4401",
          "image": {
            "src": "/covers/japan-defence-paper-combat-drones--a4.png",
            "alt": "Japanese woodblock print triptych of a night battle: a white searchlight beam sweeps from left to right across dark water, gunners drag field cannon through the shallows in the foreground, and an enemy fort on the right explodes in orange fire.",
            "credit": "Kobayashi Kiyochika, Using an Electric Searchlight in the Attack on Pyongyang (1894), Rijksmuseum, Amsterdam (RP-P-2010-310-14). Public domain via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "Beethoven's battle machine: a victory scored for cannon, rattles and a mechanical orchestra",
          "excerpt": "WELLINGTONS SIEG, oder: die Schlacht bey Vittoria. In Musik gesetzt von Ludwig van Beethoven. 91tes Werk. Vollständige Partitur. Eigenthum der Verleger. Wien im Verlag bey S. A. Steiner und Comp., so wie auch zu haben in Leipzig bey Breitkopf und Härtel — C. F. Peters — Fr. Hoffmeister,",
          "source": "Ludwig van Beethoven, Wellingtons Sieg, oder die Schlacht bey Vittoria, Op. 91 (composed 1813 for Mälzel's panharmonicon; scored with cannon, rattles and separate French and English field drums). First edition full score, Vienna: S. A. Steiner und Comp., plate 2367, 1816; holograph manuscript at the Staatsbibliothek zu Berlin. Scores hosted at IMSLP / Petrucci Music Library.",
          "href": "https://imslp.org/wiki/Wellingtons_Sieg,_Op.91_(Beethoven,_Ludwig_van)",
          "image": {
            "src": "/covers/japan-defence-paper-combat-drones--a5.png",
            "alt": "Engraved title page of an 1816 Viennese music print, foxed and browned, with elaborate copperplate lettering reading Wellingtons-Sieg, oder: die Schlacht bey Vittoria, in Musik gesetzt von Ludwig van Beethoven, 91tes Werk, and a library stamp at the top.",
            "credit": "Title page of the first edition full score of Beethoven's Wellingtons Sieg, Op. 91 (Vienna: S. A. Steiner und Comp., 1816), copy of the Bayerische Staatsbibliothek, Munich. Public domain via Wikimedia Commons."
          }
        }
      ]
    },
    {
      "slug": "rhine-record-low-drought-europe",
      "headline": "The Rhine falls to record-low water levels as a severe drought grips rivers across Europe",
      "overview": "Water levels on the Rhine dropped to record lows as a hot, dry summer parched rivers across Europe, with the Danube and Po also shrinking. The low water has curtailed cargo shipping and cut hydroelectric output, officials said. Drought warnings stretched from Britain to the Balkans as wildfires burned in France and Greece.",
      "genre": "Climate",
      "sources": [
        {
          "name": "BBC",
          "href": "https://www.bbc.co.uk/news/articles/c78gn8zvrx4o"
        },
        {
          "name": "AP",
          "href": "https://news.google.com/rss/articles/CBMisgFBVV95cUxOWVJ3YktkdzVuTjE5NnBtRXhReVlTNDdxZUpfOHZGTmhfVjRtd0pka2J4Nk5kR3FwNHFTWGc1aVIzX0ZteWF5dGRfdW1fdl9BVF9uRmctOGxnd1QxbzlicEpzaWlwYXVrRWFzLWFTM3VhT1AzV3llelkyUEhCWnRhblRCRHkwdW45aFA4SjZNdEkweExfNU4wMzcxWUFjcnNENm5lV2d2UFZKdFdmZ1NuNnZn?oc=5"
        }
      ],
      "href": "#",
      "publishedAt": "2026-08-03",
      "image": {
        "src": "/covers/rhine-record-low-drought-europe.png",
        "alt": "A wide river reduced to a narrow channel between broad expanses of exposed, cracked riverbed and gravel banks under a hazy summer sky.",
        "credit": "BBC"
      },
      "rank": 27,
      "edition": "Evening Edition · 3 August 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "The Famine Stela of Sehel Island",
          "excerpt": "Carved onto a granite boulder overlooking the Nile at the First Cataract, this inscription speaks in the voice of the pharaoh Djoser, recalling seven years in which the god Hapy — the annual flood — failed to arrive: the grain shriveled, the granaries stood empty, and the whole land starved until the king appealed to the ram-god Khnum at the river's supposed source to loose the waters again. It is humanity's oldest surviving account of a nation brought to ruin by a great river running low, and a reminder that in the ancient world a shrunken river meant not inconvenience but famine.",
          "source": "The Famine Stela, Sehel Island near Aswan, Egypt (carved in the Ptolemaic period, c. 3rd–2nd c. BCE, purporting to record the reign of King Djoser of the 3rd Dynasty); English translation by Miriam Lichtheim, Ancient Egyptian Literature, vol. 3 (1980), via Attalus.org",
          "href": "https://www.attalus.org/egypt/famine_stele.html"
        },
        {
          "category": "historical",
          "title": "The Elbe Hunger Stone at Děčín",
          "excerpt": "\"Wenn du mich siehst, dann weine\" — \"If you see me, weep.\" This warning is cut into a boulder that lies submerged in the Elbe and reappears only in the driest years, when the water sinks to famine-low levels; the Děčín stone's oldest legible date is 1616. Generations of Central Europeans carved such marks so that anyone who saw the same rock bared again by drought would know hard times — failed harvests and hunger — were on the way. When the great European droughts of recent summers exposed these stones once more, an early-modern message crossed four centuries intact.",
          "source": "Hunger stone, Elbe River at Děčín, Czech Republic; the boulder's oldest legible carving dates to 1616. Documented via Wikipedia / Wikimedia Commons",
          "href": "https://en.wikipedia.org/wiki/Hunger_stone",
          "image": {
            "src": "/covers/rhine-record-low-drought-europe--a1.png",
            "alt": "A large inscribed stone exposed above the low water of the Elbe river at Děčín during the drought of summer 2015",
            "credit": "Photo: Norbert Kaiser, hunger stone in the Elbe at Děčín during the low water of summer 2015. CC BY-SA 3.0 DE via Wikimedia Commons."
          }
        },
        {
          "category": "literary",
          "title": "Ovid, Metamorphoses, Book II (The Fall of Phaethon)",
          "excerpt": "Caister's streams amid. In terror Nile / Fled to the farthest earth, and sunk his head, / Yet undiscover'd!--void the seven-fold stream, / His mouth seven dry and dusty vales disclos'd. / Now Hebrus dries, and Strymon, Thracian floods: / And streams Hesperian, Rhine; and Rhone; and Po; / And Tiber, destin'd all the world to rule.",
          "source": "Ovid, The Metamorphoses of Publius Ovidius Naso in English Blank Verse, Book the Second, translated by J. J. Howard (London, 1807), Project Gutenberg",
          "href": "https://www.gutenberg.org/files/28621/28621-h/28621-h.htm"
        },
        {
          "category": "literary",
          "title": "T. S. Eliot, The Waste Land (Part V)",
          "excerpt": "Here is no water but only rock / Rock and no water and the sandy road / The road winding above among the mountains / Which are mountains of rock without water / If there were water we should stop and drink / Amongst the rock one cannot stop or think / Sweat is dry and feet are in the sand ... Dead mountain mouth of carious teeth that cannot spit ... There is not even silence in the mountains / But dry sterile thunder without rain",
          "source": "T. S. Eliot, The Waste Land (1922), Part V, 'What the Thunder Said', Project Gutenberg",
          "href": "https://www.gutenberg.org/files/1321/1321-h/1321-h.htm"
        },
        {
          "category": "artistic",
          "title": "Elijah in the Wilderness",
          "excerpt": "Leighton paints the prophet Elijah collapsed on sun-baked rock during the three-year drought he had called down upon Israel (1 Kings 17–18), his sinewy, sun-darkened body sprawled in exhaustion while an angel stoops to offer bread and a cruse of water. The cracked tawny wilderness and the fallen man make visible what a killing drought does to the living — a land where the rains have simply stopped and even the strongest are laid low. It turns the abstraction of a rainless season into a single human body at the edge of endurance.",
          "source": "Frederic Leighton, Elijah in the Wilderness (1877–78), oil on canvas, Walker Art Gallery, Liverpool; Google Art Project via Wikimedia Commons",
          "href": "https://commons.wikimedia.org/wiki/File:Frederic,_Lord_Leighton_-_Elijah_in_the_Wilderness_-_Google_Art_Project.jpg",
          "image": {
            "src": "/covers/rhine-record-low-drought-europe--a4.png",
            "alt": "An exhausted, sun-darkened Elijah lies on parched rock in a desert while an angel brings him bread and water",
            "credit": "Frederic Leighton, Elijah in the Wilderness (1877–78), Walker Art Gallery, Liverpool. Public domain via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "Haydn, The Seasons — 'Summer'",
          "excerpt": "In the 'Summer' part of Haydn's oratorio, the music depicts a countryside gasping beneath a merciless noon sun — sultry, shimmering air, languishing flocks, and fields drooping in the heat — before a great orchestral thunderstorm at last breaks the drought with rain. Composed in 1801 to Gottfried van Swieten's libretto, it is one of the most vivid portraits in all of music of parched land longing for water, and of the relief when the sky finally opens. The listener hears the very arc of a hot, dry summer and its overdue rescue.",
          "source": "Joseph Haydn, Die Jahreszeiten (The Seasons), Hob. XXI:3, Part 2 'Der Sommer' (first performed 1801), full and vocal scores at IMSLP",
          "href": "https://imslp.org/wiki/Die_Jahreszeiten,_Hob.XXI:3_(Haydn,_Joseph)"
        }
      ]
    },
    {
      "slug": "amazon-three-trillion-stocks-rally",
      "headline": "Amazon becomes the fourth company valued at $3 trillion as US stocks rally near a record on falling oil prices",
      "overview": "Amazon's market value closed above $3 trillion for the first time, joining a small club of the world's most valuable companies as AI and cloud growth powered a broad rally. US stock indexes climbed near record highs after oil prices fell sharply, easing Wall Street's worries about inflation. The Dow closed at a record.",
      "genre": "Economy",
      "sources": [
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMiwgFBVV95cUxOT2h5X3dkMzhkV3ZxZ3UtZ2ZlMEh4bVVzeUF6RDlYS3R6SEFrSXlRRlJ6SDBCVFZITUV1eUYwX21VcFlIQkhrV05NM3Rudnp4LVNxNEN5WnlFM0FrSDZFNC1nX2dISGx5Z0xqQndiWHRqdkxDaHJ3ek5hcjNnZERtWTRnYThyd3MwRkVHdmg3djFLeFdFMFBLeW91NXVaVjUxQUpwSDhkUUpBa2hHNGxlcHVEbUc2NUlrUjdIYWhwcWFsZw?oc=5"
        },
        {
          "name": "AP",
          "href": "https://news.google.com/rss/articles/CBMimwFBVV95cUxOWTMweFRadm51ZDBCVG5fZlAzdEFVZGZpZ2dVcVdsb0dfRHI4M3VzTWI4YllxTDBQUzJNUDQwLXFjZnVMMG43aW0zbnJ1ZmxyODhmdk1zeXhIVmdxc2F4OUlPNWZ6MFFZRTlKNnduenlqcjJDQ3JNWHpuZFBpejZmTXVva3ZwTWg1cnduR2hhMTJQYmVVZ3JacklNYw?oc=5"
        }
      ],
      "href": "#",
      "publishedAt": "2026-08-03",
      "image": {
        "src": "/covers/amazon-three-trillion-stocks-rally.png",
        "alt": "The columned neoclassical Wall Street facade of the New York Stock Exchange building, draped with a large flag.",
        "credit": "Wikimedia Commons"
      },
      "rank": 28,
      "edition": "Evening Edition · 3 August 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Crassus, the richest man in Rome",
          "excerpt": "For at the outset he was possessed of not more than three hundred talents; ... when he made a private inventory of his property before his Parthian expedition, he found that it had a value of seventy-one hundred talents. ... And though he owned numberless silver mines, and highly valuable tracts of land with the labourers upon them, nevertheless one might regard all this as nothing compared with the value of his slaves.",
          "source": "Plutarch, Life of Crassus, ch. 2, trans. Bernadotte Perrin (Loeb, 1916); Perseus Digital Library, Tufts University",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:2008.01.0038:chapter=2"
        },
        {
          "category": "historical",
          "title": "Charter of the Dutch East India Company (VOC), 1602 — the first megacorporation",
          "excerpt": "As the prosperity of the united Netherlands consists principally of the navigation, trade and commerce, which have been carried on from these countries from time immemorial, and which from time to time have been praiseworthily increased ... some principal merchants of the aforementioned countries, lovers of navigation, trade and commerce on foreign countries ... have taken in hand the very praiseworthy navigation, trade and commerce on the East Indies.",
          "source": "Charter granted by the States-General of the United Netherlands, 20 March 1602; English translation, Wikisource",
          "href": "https://en.wikisource.org/wiki/Translation:VOC_charter",
          "image": {
            "src": "/covers/amazon-three-trillion-stocks-rally--a1.png",
            "alt": "A sunlit colonnaded courtyard thronged with merchants trading beneath arches, Emanuel de Witte's painting of the Amsterdam stock exchange",
            "credit": "Emanuel de Witte, 'Courtyard of the Amsterdam Stock Exchange' (1653), Museum Boijmans Van Beuningen, Rotterdam. Via Wikimedia Commons (public domain). The world's first stock exchange, where VOC shares were traded."
          }
        },
        {
          "category": "literary",
          "title": "Swift on the South Sea Bubble: 'What magick makes our money rise'",
          "excerpt": "Ye wise philosophers, explain / What magick makes our money rise, / When dropt into the Southern main; / Or do these jugglers cheat our eyes? ... Put in your money fairly told; / Presto! be gone — 'Tis here again: / Ladies and gentlemen, behold, / Here's every piece as big as ten.",
          "source": "Jonathan Swift, 'The South-Sea Project' (1721), in The Works of the Rev. Jonathan Swift, Vol. 7; Wikisource",
          "href": "https://en.wikisource.org/wiki/The_Works_of_the_Rev._Jonathan_Swift/Volume_7/The_South_Sea_Project"
        },
        {
          "category": "literary",
          "title": "Melmotte, 'the very navel of the commercial enterprise of the world'",
          "excerpt": "It seemed that there was but one virtue in the world, commercial enterprise,—and that Melmotte was its prophet. ... at that time, Melmotte was not the strong rock, the impregnable tower of commerce, the very navel of the commercial enterprise of the world,—as all men now regarded him.",
          "source": "Anthony Trollope, The Way We Live Now (1875); Project Gutenberg (eBook #5231)",
          "href": "https://www.gutenberg.org/cache/epub/5231/pg5231.txt"
        },
        {
          "category": "artistic",
          "title": "Hogarth, 'The South Sea Scheme' (1721)",
          "excerpt": "Often called the first editorial cartoon, Hogarth's crowded scene turns the 1720 speculative mania into a carnival of folly: a merry-go-round of stock-jobbers whirls beside a monument to the ruin the bubble caused, while Honesty is broken on the wheel and a mob scrambles for worthless paper fortunes. It is a portrait of a market intoxicated by its own soaring valuations — and of the reckoning that follows.",
          "source": "William Hogarth, 'Emblematical Print on the South Sea Scheme,' engraving, 1721; Wikimedia Commons",
          "href": "https://commons.wikimedia.org/wiki/File:William_Hogarth_-_The_South_Sea_Scheme.png",
          "image": {
            "src": "/covers/amazon-three-trillion-stocks-rally--a4.png",
            "alt": "Satirical engraving of a chaotic square where speculators ride a giant merry-go-round and crowds jostle amid emblems of greed and ruin",
            "credit": "William Hogarth, 'The South Sea Scheme' (1721). Via Wikimedia Commons (public domain)."
          }
        },
        {
          "category": "artistic",
          "title": "'Next!' — the Standard Oil octopus and the anatomy of monopoly",
          "excerpt": "Keppler draws the Standard Oil combine as a bloated octopus, its tentacles already coiled around the steel, copper and shipping industries and around a state capitol and the U.S. Capitol, with one arm stretching hungrily toward the White House. It is the definitive image of a single commercial colossus outgrowing the marketplace and reaching for the machinery of government itself.",
          "source": "Udo J. Keppler, 'Next!', chromolithograph, Puck, 7 September 1904; Library of Congress, Prints & Photographs Division",
          "href": "https://www.loc.gov/item/2001695241/",
          "image": {
            "src": "/covers/amazon-three-trillion-stocks-rally--a5.png",
            "alt": "Political cartoon of an octopus labeled Standard Oil gripping industries and government buildings with its tentacles, reaching toward the White House",
            "credit": "Udo J. Keppler, 'Next!', Puck, 1904. Library of Congress, via Wikimedia Commons (public domain)."
          }
        }
      ]
    },
    {
      "slug": "democratic-states-sue-trump-tariffs",
      "headline": "Twenty-five Democratic-led states sue to challenge President Trump's latest round of tariffs",
      "overview": "A coalition of 25 Democratic-led states filed suit to block President Trump's newest tariffs, calling them a 'pretext' to replace an earlier round struck down in court. The lawsuit argues the president exceeded his authority in imposing sweeping import taxes without congressional approval. It is the latest legal clash over the administration's trade policy.",
      "genre": "Economy",
      "sources": [
        {
          "name": "AP",
          "href": "https://news.google.com/rss/articles/CBMingFBVV95cUxQV1dVOXhnRXI2M3NoSHgwTFZTUnFzZDdfdEM1ZkpnQXQ2cS1ycXJtNkFkQkN4R3hRVUdjWnpKWTZ5cUF3TFRQT3FGaGx6YkhNejZpem9hcTdlVzhPRFdhSUVJbFRSWEFsaGtQQUxKTGVuQ0E1cFYxZElnSlJZRnhiRnl6ay10Nk1GWXFDYmtKeGtWaEFEREpFclhPYU9wdw?oc=5"
        },
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMilwFBVV95cUxNQzdtbnRyNlNqdjVKN2l0dllQSjdlQjM0QWVIbFhiM3NnT1JVR0tSLWY5ajZpTVhsQzdwWUJKcVp5VE5hcFdQZU85TU9yVnJjc1ozM1FJMkY1RmcyZHdYM2hkV21rQlNLSGZLNy1uLUFjNm1NcFVtZUZubjYtNkQyZmpEMEMycXhtZXMzQ0tLMmFhZmdwN2gw?oc=5"
        }
      ],
      "href": "#",
      "publishedAt": "2026-08-03",
      "image": {
        "src": "/covers/democratic-states-sue-trump-tariffs.png",
        "alt": "Rows of stacked shipping containers and a gantry crane at a busy port terminal handling imported goods.",
        "credit": "Wikimedia Commons"
      },
      "rank": 29,
      "edition": "Evening Edition · 3 August 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "The Nullification Crisis: South Carolina Defies the Federal Tariff",
          "excerpt": "We, therefore, the people of the State of South Carolina, in convention assembled, do declare and ordain ... that the several acts and parts of acts of the Congress of the United States, purporting to be laws for the imposing of duties and imposts on the importation of foreign commodities ... are unauthorized by the constitution of the United States, and violate the true meaning and intent thereof and are null, void, and no law, nor binding upon this State, its officers or citizens.",
          "source": "South Carolina Ordinance of Nullification, adopted in convention, November 24, 1832; The Avalon Project, Lillian Goldman Law Library, Yale Law School",
          "href": "https://avalon.law.yale.edu/19th_century/ordnull.asp"
        },
        {
          "category": "historical",
          "title": "No Taxes but by Consent: The Stamp Act Congress",
          "excerpt": "That it is inseparably essential to the freedom of a people, and the undoubted right of Englishmen, that no taxes be imposed on them, but with their own consent, given personally, or by their representatives. That the people of these colonies are not, and from their local circumstances cannot be, represented in the House of Commons in Great-Britain, and that no taxes ever have been, or can be constitutionally imposed on them, but by their respective legislatures.",
          "source": "Declaration of Rights of the Stamp Act Congress, New York, October 19, 1765; The Avalon Project, Lillian Goldman Law Library, Yale Law School",
          "href": "https://avalon.law.yale.edu/18th_century/resolu65.asp"
        },
        {
          "category": "literary",
          "title": "The Candlemakers' Petition: A Satire of Protectionism",
          "excerpt": "We are suffering from the intolerable competition of a foreign rival, placed, it would seem, in a condition so far superior to ours for the production of light, that he absolutely inundates our national market with it at a price fabulously reduced. The moment he shows himself, our trade leaves us--all consumers apply to him ... This rival, who is no other than the Sun, wages war to the knife against us.",
          "source": "Frédéric Bastiat, \"Petition of the Manufacturers of Candles, Waxlights, Lamps...\" in Economic Sophisms (1845; trans. Patrick James Stirling, 1873); Project Gutenberg ebook #44145",
          "href": "https://www.gutenberg.org/ebooks/44145"
        },
        {
          "category": "literary",
          "title": "Civil Disobedience: Refusing an Unjust Tax",
          "excerpt": "I heartily accept the motto,--\"That government is best which governs least;\" and I should like to see it acted up to more rapidly and systematically. ... I have paid no poll-tax for six years. I was put into a jail once on this account, for one night.",
          "source": "Henry David Thoreau, \"On the Duty of Civil Disobedience\" (originally \"Resistance to Civil Government,\" 1849); Project Gutenberg ebook #71",
          "href": "https://www.gutenberg.org/files/71/71-h/71-h.htm"
        },
        {
          "category": "artistic",
          "title": "King Andrew the First: A President Tramples the Constitution",
          "excerpt": "This anonymous Whig broadside answers a President accused of governing by veto and decree. Jackson stands robed and crowned, scepter in one hand and a veto in the other, his royal feet planted on a torn Constitution and the shredded charter of the federal judiciary. The caption brands him a tyrant, 'King Andrew the First' -- the era's sharpest image of an executive who scorns the limits meant to bind him.",
          "source": "\"King Andrew the First,\" anonymous lithograph, c. 1832-33 (Library of Congress Prints and Photographs Division)",
          "href": "https://commons.wikimedia.org/wiki/File:King_Andrew_the_First_(political_cartoon_of_President_Andrew_Jackson).jpg",
          "image": {
            "src": "/covers/democratic-states-sue-trump-tariffs--a4.png",
            "alt": "Lithograph of Andrew Jackson as a crowned king in royal robes, holding a veto and scepter, standing on a torn copy of the U.S. Constitution",
            "credit": "\"King Andrew the First,\" c. 1833, Library of Congress Prints and Photographs Division, via Wikimedia Commons (public domain)"
          }
        },
        {
          "category": "artistic",
          "title": "The Destruction of Tea at Boston Harbour: A Revolt Against Import Taxes",
          "excerpt": "Currier's popular lithograph turns a tax revolt into a founding tableau: Bostonians crowd the wharves by torchlight as men aboard the ships heave chests of dutied East India Company tea into the harbor. It memorializes colonists' refusal to pay a duty on imports levied without their consent -- resistance to an import tax rendered as an act of civic virtue.",
          "source": "Nathaniel Currier, \"The Destruction of Tea at Boston Harbour,\" hand-colored lithograph, 1846 (Springfield Museums)",
          "href": "https://commons.wikimedia.org/wiki/File:Boston_Tea_Party_Currier_colored.jpg",
          "image": {
            "src": "/covers/democratic-states-sue-trump-tariffs--a5.png",
            "alt": "Hand-colored lithograph of colonists dumping chests of tea from ships into Boston Harbor as a crowd watches from the wharf",
            "credit": "Nathaniel Currier, \"The Destruction of Tea at Boston Harbour,\" 1846, via Wikimedia Commons (public domain)"
          }
        }
      ]
    },
    {
      "slug": "sudan-darfur-court-drone-strike",
      "headline": "A Sudanese army drone strike hits a civil court session in Darfur, killing at least 35, a rights group says",
      "overview": "A drone strike blamed on Sudan's army hit a civil court session in a paramilitary-held Darfur village, killing at least 35 people, a rights group said. The army did not comment on claims that civilians were among the dead. The attack came amid the country's grinding war between the army and the Rapid Support Forces.",
      "genre": "Conflict",
      "sources": [
        {
          "name": "AP",
          "href": "https://news.google.com/rss/articles/CBMiogFBVV95cUxOd3NjSDZlSG1reGlHT3VFSVdkQjR6NEJneXIzdC1VWU5vV3h2dDFPZHFZQ0hzalVITUkybVBBRC1sUEsxcHRXWlp6OVZrdXcwS3R6S09TRlJNdjRXTWt2VUFQX2N0R3M1T1N3LTVSaW5yOUFkUnpRMnoxVFFLMV9PbnlMdzJoMEtSdkJRRGVTV05oRUQyQjJaWWNpd0pVT0diWHc?oc=5"
        },
        {
          "name": "BBC",
          "href": "https://www.bbc.co.uk/news/articles/ce85097leydo"
        }
      ],
      "href": "#",
      "publishedAt": "2026-08-03",
      "image": {
        "src": "/covers/sudan-darfur-court-drone-strike.png",
        "alt": "An empty courtroom with rows of plain wooden benches and tall windows, dust hanging in shafts of pale light.",
        "credit": "AI-generated"
      },
      "rank": 30,
      "edition": "Evening Edition · 3 August 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "The massacre at Mycalessus (413 BC)",
          "excerpt": "The Thracians bursting into Mycalessus sacked the houses and temples, and butchered the inhabitants, sparing neither youth nor age, but killing all they fell in with, one after the other, children and women, and even beasts of burden... and in particular they attacked a boys' school, the largest that there was in the place, into which the children had just gone, and massacred them all. In short, the disaster falling upon the whole town was unsurpassed in magnitude, and unapproached by any in suddenness and in horror.",
          "source": "Thucydides, History of the Peloponnesian War, Book VII.29 (trans. Richard Crawley, 1874); Project Gutenberg",
          "href": "https://www.gutenberg.org/cache/epub/7142/pg7142.txt"
        },
        {
          "category": "historical",
          "title": "The bombing of Guernica (1937)",
          "excerpt": "Guernica, the most ancient town of the Basques and the centre of their cultural tradition, was completely destroyed yesterday afternoon by insurgent air raiders... The object of the bombardment was seemingly the demoralization of the civil population and the destruction of the cradle of the Basque race.",
          "source": "George L. Steer, eyewitness dispatch on the destruction of Guernica, The Times (London), 28 April 1937",
          "href": "https://historynet.com/the-tragedy-of-guernica/"
        },
        {
          "category": "literary",
          "title": "The slaying of Priam at the altar",
          "excerpt": "Then Pyrrhus thus: 'Go thou from me to fate, / And to my father my foul deeds relate. / Now die!' With that he dragg'd the trembling sire, / Slidd'ring thro' clotter'd blood and holy mire, / (The mingled paste his murder'd son had made,) / Haul'd from beneath the violated shade, / And on the sacred pile the royal victim laid... Thus Priam fell, and shar'd one common fate / With Troy in ashes, and his ruin'd state",
          "source": "Virgil, Aeneid, Book II (trans. John Dryden, 1697); Project Gutenberg",
          "href": "https://www.gutenberg.org/cache/epub/228/pg228.txt"
        },
        {
          "category": "literary",
          "title": "The murdered child of Troy",
          "excerpt": "Behold, you hapless wives of Troy, the corpse of Astyanax, whom the Danaids have cruelly slain by hurling him from the battlements.",
          "source": "Euripides, The Trojan Women (trans. E. P. Coleridge, 1891); Perseus Digital Library, Tufts University",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0124%3Acard%3D1118"
        },
        {
          "category": "artistic",
          "title": "The Third of May 1808",
          "excerpt": "Goya freezes the instant before the volley: a rank of faceless soldiers levels muskets at a knot of unarmed townspeople herded to a hillside in the dark. A man in a white shirt flings his arms wide in a cruciform gesture of terror and defiance, lit by a single lantern, while the already-shot lie in their blood at his feet and others cover their eyes. There is no glory in it, only the mechanical execution of the defenseless.",
          "source": "Francisco de Goya, The Third of May 1808 (El tres de mayo de 1808 en Madrid), 1814, oil on canvas; Museo del Prado, Madrid",
          "href": "https://commons.wikimedia.org/wiki/File:El_Tres_de_Mayo,_by_Francisco_de_Goya,_from_Prado_thin_black_margin.jpg",
          "image": {
            "src": "/covers/sudan-darfur-court-drone-strike--a4.png",
            "alt": "Goya's painting of French soldiers executing unarmed Madrid civilians at night by lantern light",
            "credit": "Francisco de Goya, The Third of May 1808 (1814), Museo del Prado; public domain via Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "Pillaging and Burning of a Village",
          "excerpt": "In Callot's densely etched panorama, soldiers pour through a village, putting houses and church to the torch as columns of smoke boil into the sky. In the foreground troops run through unarmed peasants, drag women by the hair, and loot a burning home; the ordinary countryside has become a killing ground. Made amid the Thirty Years' War, the plate is a cold indictment of the routine savagery visited on noncombatants.",
          "source": "Jacques Callot, 'Pillage et incendie d'un village' (Pillaging and Burning of a Village), plate 7 of Les Misères et les Malheurs de la Guerre, 1633, etching; impression at The Metropolitan Museum of Art",
          "href": "https://commons.wikimedia.org/wiki/File:Les_mis%C3%A8res_et_les_malheurs_de_la_guerre_-_07_-_Pillage_et_incendie_d%27un_village.png",
          "image": {
            "src": "/covers/sudan-darfur-court-drone-strike--a5.png",
            "alt": "Callot etching of soldiers massacring villagers and burning a village during the Thirty Years' War",
            "credit": "Jacques Callot, plate 7 of Les Misères et les Malheurs de la Guerre (1633); public domain via Wikimedia Commons"
          }
        }
      ]
    },
    {
      "slug": "russia-black-sea-beach-drone-strike",
      "headline": "Russia says a Ukrainian drone struck a crowded Black Sea beach resort, killing seven, including three children",
      "overview": "Russian officials said a Ukrainian drone crashed onto a crowded beach near the Black Sea resort area of Gelendzhik, killing seven people, three of them children, and wounding about 40. Local authorities said an air-raid warning failed to sound in time. Ukraine did not immediately comment as long-range drone attacks intensified on both sides of the war.",
      "genre": "Conflict",
      "sources": [
        {
          "name": "BBC",
          "href": "https://www.bbc.co.uk/news/articles/cr7kmnyrdn7o"
        },
        {
          "name": "Meduza",
          "href": "https://meduza.io/en/news/2026/08/03/ukrainian-drone-crashes-on-beach-with-vacationers-at-russian-black-sea-resort-as-warning-system-fails-to-sound-seven-people-killed"
        }
      ],
      "href": "#",
      "publishedAt": "2026-08-03",
      "image": {
        "src": "/covers/russia-black-sea-beach-drone-strike.png",
        "alt": "A wide sandy beach along a calm sea under a summer sky, striped umbrellas and empty loungers scattered on the shore.",
        "credit": "BBC"
      },
      "rank": 31,
      "edition": "Evening Edition · 3 August 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "The Massacre at Mycalessus (413 BC)",
          "excerpt": "The Thracians bursting into Mycalessus sacked the houses and temples, and butchered the inhabitants, sparing neither youth nor age, but killing all they fell in with, one after the other, children and women, and even beasts of burden, and whatever other living creatures they saw... In particular they attacked a boys' school, the largest that there was in the place, into which the children had just gone, and massacred them all.",
          "source": "Thucydides, History of the Peloponnesian War, Book VII (trans. Richard Crawley, 1874), Wikisource",
          "href": "https://en.wikisource.org/wiki/History_of_the_Peloponnesian_War/Book_7"
        },
        {
          "category": "historical",
          "title": "The Bombardment of Scarborough (16 December 1914)",
          "excerpt": "On a December morning the German battlecruisers Derfflinger and Von der Tann appeared out of the mist off the Yorkshire coast and rained some 500 shells on the undefended seaside resort of Scarborough, striking the Grand Hotel, homes and churches. For the first time in the war, death fell suddenly on British civilians going about their ordinary lives, killing seventeen townspeople, among them children and a fourteen-month-old baby. The shock that a place of holidays and promenades could become a killing ground turned 'Remember Scarborough!' into a national cry of outrage.",
          "source": "Historic England, 'Scarborough Bombardment 1914' (First World War Home Front research)",
          "href": "https://historicengland.org.uk/research/current/discover-and-understand/military/first-world-war-home-front/sea/scarborough-bombardment-1914/",
          "image": {
            "src": "/covers/russia-black-sea-beach-drone-strike--a1.png",
            "alt": "1915 British recruitment poster showing the shell-wrecked home of a Scarborough family, captioned to remember the women and children killed in the raid",
            "credit": "Parliamentary Recruiting Committee, 'Men of Britain! Will You Stand This?' (1915), Library of Congress Prints and Photographs Division, via Wikimedia Commons (public domain)"
          }
        },
        {
          "category": "literary",
          "title": "Dover Beach",
          "excerpt": "Ah, love, let us be true\nTo one another! for the world, which seems\nTo lie before us like a land of dreams,\nSo various, so beautiful, so new,\nHath really neither joy, nor love, nor light,\nNor certitude, nor peace, nor help for pain;\nAnd we are here as on a darkling plain\nSwept with confused alarms of struggle and flight,\nWhere ignorant armies clash by night.",
          "source": "Matthew Arnold, 'Dover Beach' (1867), Wikisource",
          "href": "https://en.wikisource.org/wiki/Dover_Beach"
        },
        {
          "category": "literary",
          "title": "L'Enfant (The Child of Chios)",
          "excerpt": "Les Turcs ont passé là. Tout est ruine et deuil.\nChio, l'île des vins, n'est plus qu'un sombre écueil,",
          "source": "Victor Hugo, Les Orientales, 'L'Enfant' (1829), Wikisource",
          "href": "https://fr.wikisource.org/wiki/Les_Orientales/L%E2%80%99Enfant",
          "image": {
            "src": "/covers/russia-black-sea-beach-drone-strike--a3.png",
            "alt": "Delacroix's painting of the massacre at Chios: exhausted, wounded Greek civilians, including a child clinging to its dead mother, on a devastated shore",
            "credit": "Eugène Delacroix, 'Scène des massacres de Scio' (1824), Musée du Louvre, via Wikimedia Commons (public domain)"
          }
        },
        {
          "category": "artistic",
          "title": "Boys on the Beach (Chicos en la playa)",
          "excerpt": "Three naked boys lie sprawled at the water's edge in the shimmering Mediterranean light, their bodies half-dissolved in the wet reflections of the sand. Sorolla's canvas is the pure image of the summer shore as a place of safety, play, and idle happiness, children entrusting themselves entirely to the sea. Set beside the news, its radiant calm becomes unbearable: this is exactly the world a strike on a crowded beach annihilates.",
          "source": "Joaquín Sorolla, oil on canvas, 1910, Museo Nacional del Prado, Madrid",
          "href": "https://www.museodelprado.es/en/the-collection/art-work/boys-on-the-beach/edd7a202-c069-49f1-a3f4-eacf9b4022c2",
          "image": {
            "src": "/covers/russia-black-sea-beach-drone-strike--a4.png",
            "alt": "Three nude boys lying at the sunlit water's edge on a beach, their bodies reflected in the shallow water",
            "credit": "Joaquín Sorolla, 'Chicos en la playa' (1910), Museo Nacional del Prado, via Wikimedia Commons (public domain)"
          }
        },
        {
          "category": "artistic",
          "title": "The Massacre of the Innocents",
          "excerpt": "Bruegel transplants the biblical slaughter of the innocents into a snowbound Flemish village, where armored soldiers ride into an ordinary community and tear children from screaming, pleading parents. The horror is set amid the mundane textures of daily life, houses, a frozen pond, everyday clothes, making the intrusion of organized violence into a place of peace all the more devastating. It remains the West's defining image of war descending on children who have done nothing.",
          "source": "Pieter Bruegel the Elder, oil on panel, c. 1565–67, Royal Collection (via Wikimedia Commons)",
          "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_the_Elder_-_Massacre_of_the_Innocents_-_Google_Art_Project.jpg",
          "image": {
            "src": "/covers/russia-black-sea-beach-drone-strike--a5.png",
            "alt": "A snow-covered Flemish village where soldiers on horseback seize and kill children as parents beg and grieve",
            "credit": "Pieter Bruegel the Elder, 'Massacre of the Innocents' (c. 1565–67), Royal Collection, via Wikimedia Commons (public domain)"
          }
        }
      ]
    },
    {
      "slug": "michigan-cyclosporiasis-first-deaths",
      "headline": "Michigan reports the first two US deaths in a cyclosporiasis outbreak caused by a foodborne parasite",
      "overview": "Michigan health officials reported the first two US deaths tied to a nationwide cyclosporiasis outbreak, an intestinal illness caused by the microscopic parasite Cyclospora that spreads through contaminated food or water. The infection, marked by prolonged watery diarrhea, is not usually life-threatening, officials said. Investigators are working to trace the contaminated produce behind the outbreak.",
      "genre": "Science",
      "sources": [
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMiywFBVV95cUxPbW9icDFxQ3hEUUY5eV9ubnhsUURuNnpiX0RKbW1BUWRkRGp5ZWVXdnEzdklrMUdtODByVC02T0NxZG9YRGlWYklzNkN3X21kRTNDZlo0Um50Q2hDY0JreUFHcXUwZHh4TFZMVjVheVB0N2lPd0c5RzZNQ05relhmNnhlaUx6NU5MNXQxS0pJY0lOc1hsOHlYbGJYVTZHRy1xRmFOLXlMU1BWUEZ4SmNiOXNmNkFyNlVmZnR1bXVqWlZ4WFdnTzBDZEpBOA?oc=5"
        },
        {
          "name": "AP",
          "href": "https://news.google.com/rss/articles/CBMimwFBVV95cUxQbTlMT3pHaGFaRzdjMHdrZ1RWOVhwY1FPSi1TSm5pNEFuaHlLVldYYXF3VHY3WTR2MHNCMW12SVd4dXRSZy13NEkyR3BVc2QwcV9SZnR4Z1hxX05jUGNOYkJnUXp1V2hYbVhZcG4zUUhJVWl2SS1ibTVtdlQ4cjdvcHZSMC1OQS00WldrVmd0RDdWMEN6MlFnT1BOaw?oc=5"
        }
      ],
      "href": "#",
      "publishedAt": "2026-08-03",
      "image": {
        "src": "/covers/michigan-cyclosporiasis-first-deaths.png",
        "alt": "A microscope view of round, stained Cyclospora parasite oocysts against a pale laboratory background.",
        "credit": "Wikimedia Commons"
      },
      "rank": 32,
      "edition": "Evening Edition · 3 August 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Leeuwenhoek discovers the 'little animals' teeming in a drop of water",
          "excerpt": "incredibly small; nay, so small, in my sight, that I judged that even if 100 of these very wee animals lay stretched out one against another, they could not reach the length of a grain of course sand; and if this be true, then ten hundred thousand of these living creatures could scarce equal the bulk of a course grain of sand",
          "source": "Antony van Leeuwenhoek, 'Observation… concerning little animals by him observed in rain-well-sea and snow water; as also in water wherein pepper had lain infused,' Philosophical Transactions of the Royal Society, vol. 12, 9 Oct. 1676 letter, English'd and published 25 March 1677",
          "href": "https://royalsocietypublishing.org/doi/10.1098/rstl.1677.0003"
        },
        {
          "category": "historical",
          "title": "John Snow maps cholera deaths to a single water pump",
          "excerpt": "On proceeding to the spot, I found that nearly all the deaths had taken place within a short distance of the pump.",
          "source": "John Snow, On the Mode of Communication of Cholera (2nd ed., London: John Churchill, 1855); John Snow Archive & Research Companion, Michigan State University",
          "href": "https://johnsnow.matrix.msu.edu/broadstpump/snow-the-pump-handle/",
          "image": {
            "src": "/covers/michigan-cyclosporiasis-first-deaths--a1.png",
            "alt": "John Snow's 1854 map of the Broad Street cholera outbreak, showing black bars marking deaths clustered around the Broad Street water pump",
            "credit": "John Snow, 1854 cholera map, via Wikimedia Commons (UCLA Dept. of Epidemiology), public domain"
          }
        },
        {
          "category": "literary",
          "title": "The infection 'propagated insensibly' by the unknowing",
          "excerpt": "the infection was propagated insensibly, and by such persons as were not visibly infected, who neither knew whom they infected or who they were infected by.",
          "source": "Daniel Defoe, A Journal of the Plague Year (1722), Project Gutenberg",
          "href": "https://www.gutenberg.org/cache/epub/376/pg376.txt"
        },
        {
          "category": "literary",
          "title": "Dr. Stockmann finds the town's healing waters 'full of infusoria'",
          "excerpt": "It proves the presence of decomposing organic matter in the water—it is full of infusoria. The water is absolutely dangerous to use, either internally or externally.",
          "source": "Henrik Ibsen, An Enemy of the People (1882), trans. R. Farquharson Sharp, Project Gutenberg",
          "href": "https://www.gutenberg.org/cache/epub/2446/pg2446.txt"
        },
        {
          "category": "artistic",
          "title": "Monster Soup, Commonly Called Thames Water",
          "excerpt": "Heath's satirical etching magnifies a single drop of London drinking water into a swarming menagerie of writhing monsters. A genteel lady recoils, dropping her teacup in horror as she peers through a lens at the 'precious stuff' piped from the Thames. Decades before germ theory, the print made visible the invisible menace lurking in ordinary water, mocking a supply already fouled by sewage and, soon, cholera.",
          "source": "William Heath (as 'Paul Pry'), 'Monster Soup commonly called Thames Water, being a correct representation of that precious stuff doled out to us!!!', hand-coloured etching, c. 1828; Wellcome Collection",
          "href": "https://commons.wikimedia.org/wiki/File:Monster_Soup_commonly_called_Thames_Water._Wellcome_V0011218.jpg",
          "image": {
            "src": "/covers/michigan-cyclosporiasis-first-deaths--a4.png",
            "alt": "Coloured etching of a woman dropping her teacup in horror as she views grotesque creatures in a magnified drop of Thames water",
            "credit": "William Heath, 'Monster Soup commonly called Thames Water', c. 1828, Wellcome Collection, via Wikimedia Commons, public domain"
          }
        },
        {
          "category": "artistic",
          "title": "Death's Dispensary",
          "excerpt": "A hooded skeleton works the handle of a public water pump, doling out drink to the ragged poor and their children who crowd around with jugs and cups. Published during London's 1866 cholera epidemic, Pinwell's engraving turns the neighborhood well into an instrument of death, indicting the contaminated water supply that Snow's work had implicated. The everyday act of fetching water becomes a queue for the grave.",
          "source": "George John Pinwell, 'Death's Dispensary — Open to the Poor, Gratis, By Permission of the Parish', wood engraving, Fun magazine, 18 August 1866",
          "href": "https://commons.wikimedia.org/wiki/File:Death%27s_Dispensary.jpg",
          "image": {
            "src": "/covers/michigan-cyclosporiasis-first-deaths--a5.png",
            "alt": "Wood engraving of a skeletal figure of Death operating a public water pump while poor Londoners gather to collect water",
            "credit": "George John Pinwell, 'Death's Dispensary', Fun magazine, 18 August 1866, via Wikimedia Commons, public domain"
          }
        }
      ]
    },
    {
      "slug": "total-solar-eclipse-europe-august",
      "headline": "A total solar eclipse on 12 August will sweep across Spain, Iceland and Greenland, the first over mainland Europe since 1999",
      "overview": "Astronomers say a total solar eclipse on 12 August will darken skies across Greenland, Iceland and northern Spain, the first total eclipse visible from mainland Europe since 1999. The moon will fully cover the sun for more than two minutes along a narrow path, drawing eclipse chasers to the region. Forecasters urged viewers to use certified filters to watch safely.",
      "genre": "Science",
      "sources": [
        {
          "name": "AP",
          "href": "https://news.google.com/rss/articles/CBMikgFBVV95cUxQMjEzV3E0aFlLOFBzZTY5enhOTW1rRE5YNEtOZlF5V0ktV3JISzdPeldDcU04cnVsbHpsZ3Uyc1dXaFpwZ0hPWVpkaGJ4bllJTjZ6Z2poczFGTkVKRTBNWHlFeFJLSDJuVjR4SEhSd2VlWE5qOVRZS01rbncxREp4VTR5ZUNDYnJLRlFRZ1c5UHVqQQ?oc=5"
        },
        {
          "name": "NASA",
          "href": "https://science.nasa.gov/eclipses/future-eclipses/total-solar-eclipse-on-august-12-2026/"
        }
      ],
      "href": "#",
      "publishedAt": "2026-08-03",
      "image": {
        "src": "/covers/total-solar-eclipse-europe-august.png",
        "alt": "The sun's glowing white corona streaming around the black disc of the moon during a total solar eclipse against a dark sky.",
        "credit": "Wikimedia Commons"
      },
      "rank": 33,
      "edition": "Evening Edition · 3 August 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "The eclipse that stopped a war: Thales foretells the day turning to night",
          "excerpt": "in the sixth year a battle took place in which it happened, when the fight had begun, that suddenly the day became night. And this change of the day Thales the Milesian had foretold to the Ionians laying down as a limit this very year in which the change took place.",
          "source": "Herodotus, The History of Herodotus, Book I.74 (on the battle of the Medes and Lydians, 585 BC), trans. G. C. Macaulay, Project Gutenberg",
          "href": "https://www.gutenberg.org/cache/epub/2707/pg2707.txt",
          "image": {
            "src": "/covers/total-solar-eclipse-europe-august--a0.png",
            "alt": "Renaissance scholars observing a darkened sun above a terrace in Antoine Caron's painting",
            "credit": "Antoine Caron, Astronomers Studying an Eclipse (c. 1571), J. Paul Getty Museum, via Wikimedia Commons (public domain)"
          }
        },
        {
          "category": "historical",
          "title": "Eddington's 1919 eclipse: 302 seconds that weighed light",
          "excerpt": "There is a marvellous spectacle above, and, as the photographs afterwards revealed, a wonderful prominence-flame is poised a hundred thousand miles above the surface of the sun. We have no time to snatch a glance at it. We are conscious only of the weird half-light of the landscape and the hush of nature, broken by the calls of the observers, and beat of the metronome ticking out the 302 seconds of totality.",
          "source": "Arthur Eddington, Space, Time and Gravitation: An Outline of the General Relativity Theory (1920), describing the total eclipse of 29 May 1919, Wikisource",
          "href": "https://en.wikisource.org/wiki/Page:Eddington_A._Space_Time_and_Gravitation._1920.djvu/131",
          "image": {
            "src": "/covers/total-solar-eclipse-europe-august--a1.png",
            "alt": "Photographic negative of the 29 May 1919 total solar eclipse showing the corona and faint stars used to test relativity",
            "credit": "F. W. Dyson, A. S. Eddington & C. Davidson, 1919 eclipse negative (1920), via Wikimedia Commons (public domain)"
          }
        },
        {
          "category": "literary",
          "title": "The sun in dim eclipse, and monarchs perplexed with fear of change",
          "excerpt": "As when the sun new-risen / Looks through the horizontal misty air / Shorn of his beams, or, from behind the moon, / In dim eclipse, disastrous twilight sheds / On half the nations, and with fear of change / Perplexes monarchs.",
          "source": "John Milton, Paradise Lost, Book I, ll. 594–599 (1667), Project Gutenberg",
          "href": "https://www.gutenberg.org/files/26/26-h/26-h.htm"
        },
        {
          "category": "literary",
          "title": "Now nothing is unexpected: Zeus makes night at midday",
          "excerpt": "Nothing is unexpected, nothing is foresworn and / Nothing amazes now that father Zeus the Olympian / veiled the light to make it night at midday / even as sun was shining...",
          "source": "Archilochus, fragment 122 (on a solar eclipse, traditionally 648 BC), Greek text with English translation, Sententiae Antiquae",
          "href": "https://sententiaeantiquae.com/2015/09/26/now-nothing-is-unexpected-archilochus-on-an-eclipse-fr-122/"
        },
        {
          "category": "artistic",
          "title": "Astronomers Studying an Eclipse: antiquity's wonder seen through Renaissance eyes",
          "excerpt": "Richly robed scholars crowd a marble terrace strewn with armillary spheres, astrolabes and geometric instruments, arms flung upward toward a wan, cloud-veiled sun. Caron paints the ancient philosophers as courtiers of his own Valois France, turning the terror of a darkened sky into a theatre of learned curiosity — human reason craning to read the heavens even as the light fails.",
          "source": "Antoine Caron (French, 1521–1599), Astronomers Studying an Eclipse, oil on panel, c. 1571, J. Paul Getty Museum (acc. 85.PB.117)",
          "href": "https://commons.wikimedia.org/wiki/File:Antoine_Caron_Astronomers_Studying_an_Eclipse.jpg",
          "image": {
            "src": "/covers/total-solar-eclipse-europe-august--a4.png",
            "alt": "Elaborately dressed astronomers on a classical terrace gesturing toward a dimmed sun amid clouds, surrounded by scientific instruments",
            "credit": "Antoine Caron, Astronomers Studying an Eclipse (c. 1571), J. Paul Getty Museum, via Wikimedia Commons (public domain)"
          }
        },
        {
          "category": "artistic",
          "title": "'Total eclipse! No sun, no moon!' — Samson's lament for the vanished light",
          "excerpt": "Total eclipse! No sun, no moon! All dark amidst the blaze of noon! Oh, glorious light! No cheering ray To glad my eyes with welcome day! Why thus depriv'd Thy prime decree? Sun, moon, and stars are dark to me!",
          "source": "George Frideric Handel, Samson (HWV 57, 1743), tenor aria 'Total eclipse,' libretto by Newburgh Hamilton after Milton's Samson Agonistes; text sheet, IPA Source",
          "href": "https://www.ipasource.com/wp-content/uploads/ipa-source/samples/poems/15179.pdf"
        }
      ]
    },
    {
      "slug": "supreme-court-plo-judgment",
      "headline": "The US Supreme Court declines to halt a $655 million judgment against the PLO and Palestinian Authority over past attacks",
      "overview": "The US Supreme Court refused to block a roughly $655 million judgment against the Palestine Liberation Organization and the Palestinian Authority won by American victims of attacks abroad. The decision lets the award stand under a 2019 federal law tying the groups to US jurisdiction. Lawyers for the Palestinian bodies had argued the law violated due process.",
      "genre": "Politics",
      "sources": [
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMixAFBVV95cUxPRnJXbFlTcnd5ekloOUVSVFItaUU1d1lSR2wxOXp0V2VHdUd5aHl0Z1QzVTE4cjZ0M2JlOU81d05NaHkzeTlTdEZNRkVMaFoxcVRmMDg4aEgwMTZVTUlxTjZDcTVRLU5aM0hYZmdtbk8zbWlaY3d5ZUFsa3NfaE9EelNhWDJuYWVUSnFZSG1FMXhpblRXRWFTWjdZdkVEUTZHakt5dmlaTkZpYU9qYVo0a1c1eTRfaXZyMzAtSjZ1Z3ZsVVRE?oc=5"
        },
        {
          "name": "AP",
          "href": "https://news.google.com/rss/articles/CBMinAFBVV95cUxOQTNFck1qRmVpNFJZUDBCcll3ZUZicVBTbWZ0Skt1RFJXdGJQWUVOUXhnZEhUYWhQTzRLTlhJaHpzcFIwQ01QbmRSZ05YMHh6eldLQlBjeUtfeEwxd2xaUzJyb1M4ZmJiV25rcUQ4c3ozNkNjcmVweEM0QnM4MGxhWGZ6bFQwckdVemhDUV9qT1ZvOUs0eFpfUl8taHY?oc=5"
        }
      ],
      "href": "#",
      "publishedAt": "2026-08-03",
      "image": {
        "src": "/covers/supreme-court-plo-judgment.png",
        "alt": "The marble west facade of the United States Supreme Court building with its tall Corinthian columns, photographed at dusk.",
        "credit": "Wikimedia Commons"
      },
      "rank": 34,
      "edition": "Evening Edition · 3 August 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "The Code of Hammurabi: a community made to pay silver for the slain",
          "excerpt": "If the robber is not caught, then shall he who was robbed claim under oath the amount of his loss; then shall the community, and . . . on whose ground and territory and in whose domain it was compensate him for the goods stolen. If persons are stolen, then shall the community and . . . pay one mina of silver to their relatives.",
          "source": "Code of Hammurabi, laws 23–24, Babylon, c. 1754 BC (trans. L.W. King); The Avalon Project, Yale Law School",
          "href": "https://avalon.law.yale.edu/ancient/hamcode.asp",
          "image": {
            "src": "/covers/supreme-court-plo-judgment--a0.png",
            "alt": "The diorite stele of the Code of Hammurabi, inscribed with cuneiform law, Musée du Louvre",
            "credit": "Code of Hammurabi stele, Louvre Museum, Paris. Photo Mbzt, Wikimedia Commons (CC BY 3.0)"
          }
        },
        {
          "category": "historical",
          "title": "The Alabama Claims: a cross-border tribunal to answer for wartime damage",
          "excerpt": "Now, in order to remove and adjust all complaints and claims on the part of the United States, and to provide for the speedy settlement of such claims, which are not admitted by Her Britannic Majesty's Government, the High Contracting Parties agree that all the said claims, growing out of Acts committed by the aforesaid vessels, and generically known as the Alabama Claims, shall be referred to a tribunal of arbitration to be composed of five arbitrators.",
          "source": "Treaty of Washington, Article I, signed 8 May 1871 (United States and Great Britain); Wikisource",
          "href": "https://en.wikisource.org/wiki/Treaty_of_Washington"
        },
        {
          "category": "literary",
          "title": "Portia turns the bond against its holder",
          "excerpt": "Tarry a little, there is something else.\nThis bond doth give thee here no jot of blood.\nThe words expressly are \"a pound of flesh\":\nTake then thy bond, take thou thy pound of flesh,\nBut in the cutting it, if thou dost shed\nOne drop of Christian blood, thy lands and goods\nAre, by the laws of Venice, confiscate\nUnto the state of Venice.",
          "source": "William Shakespeare, The Merchant of Venice, Act IV, Scene 1 (c. 1596–98); Project Gutenberg",
          "href": "https://www.gutenberg.org/cache/epub/1515/pg1515.txt"
        },
        {
          "category": "literary",
          "title": "Athena founds a standing court to judge bloodshed",
          "excerpt": "But since this matter has fallen here, I will select judges of homicide bound by oath, and I will establish this tribunal for all time. Summon your witnesses and proofs, sworn evidence to support your case; and I will return when I have chosen the best of my citizens, for them to decide this matter truly.",
          "source": "Aeschylus, Eumenides, lines c. 482–484 (458 BC; trans. Herbert Weir Smyth, 1926), Theoi Classical Texts Library",
          "href": "https://www.theoi.com/Text/AeschylusEumenides.html"
        },
        {
          "category": "artistic",
          "title": "Justitia: the blindfold, the scales, and the sword",
          "excerpt": "Cranach's Justice stands almost nude but for a wisp of gauze, balancing the scales of judgment in one hand and resting a great two-edged sword against her shoulder in the other. The near-nakedness insists that Justice hides nothing and cannot be bribed by finery; the sword promises that her verdicts carry force. It is the Renaissance emblem for exactly what a court claims when it makes a defendant pay: measured judgment backed by the power to compel.",
          "source": "Lucas Cranach the Elder, Justitia (Justice), oil on panel, 1537; private collection (via Wikimedia Commons)",
          "href": "https://commons.wikimedia.org/wiki/File:Gerechtigkeit-1537.jpg",
          "image": {
            "src": "/covers/supreme-court-plo-judgment--a4.png",
            "alt": "Allegorical figure of Justice holding scales and a sword, painted by Lucas Cranach the Elder in 1537",
            "credit": "Lucas Cranach the Elder, Justitia (1537). Wikimedia Commons (public domain)"
          }
        },
        {
          "category": "artistic",
          "title": "The murdered man returns to exact his reckoning",
          "excerpt": "The Commendatore, slain in a duel in the opera's first act, comes back as a stone statue to demand a final accounting: \"Don Giovanni, a cenar teco m'invitasti, e son venuto\" (Don Giovanni, you invited me to sup with you, and I have come). He orders repentance—\"Pentiti, cangia vita! È l'ultimo momento!\"—and when the unrepentant Don answers \"No!\", the dead man drags him down. It is the murdered victim, not an earthly court, seizing the debt owed for violence.",
          "source": "W.A. Mozart (music) & Lorenzo Da Ponte (libretto), Don Giovanni, K.527, Act II finale (1787); IMSLP",
          "href": "https://imslp.org/wiki/Don_Giovanni,_K.527_(Mozart,_Wolfgang_Amadeus)"
        }
      ]
    },
    {
      "slug": "spain-ceuta-migrant-children-eu-borders",
      "headline": "Hundreds of migrant children remain stranded in Spain's Ceuta as the EU calls for stronger external borders",
      "overview": "Hundreds of unaccompanied migrant children were left stranded in Spain's North African enclave of Ceuta after a mass border crossing overwhelmed local shelters. European Commission President Ursula von der Leyen called for stronger external borders ahead of an urgent meeting of EU interior ministers. Spain and Morocco traded blame over the surge.",
      "genre": "Politics",
      "sources": [
        {
          "name": "AP",
          "href": "https://news.google.com/rss/articles/CBMikwFBVV95cUxQNDliSkR6N1FYa01rQ2d3V0VRV0N2UVd2ZWhmMjhlaE8wVW1BTE45dkp0YUFuSVBYZEplRGlnMkczdDhTbjY0Unk2MVl0R3VBMG96SEZhd1dQSUFGbHRFTTRDTGl5TXhGeGprYldpdUhGTTVlS0VROG4xajAtS0tfbW9pSVlIc0dneDE2SXREbER2cXM?oc=5"
        },
        {
          "name": "BBC",
          "href": "https://www.bbc.co.uk/news/articles/cyvl84zmgyro"
        }
      ],
      "href": "#",
      "publishedAt": "2026-08-03",
      "image": {
        "src": "/covers/spain-ceuta-migrant-children-eu-borders.png",
        "alt": "A tall border fence topped with razor wire running down toward a rocky Mediterranean shoreline.",
        "credit": "BBC"
      },
      "rank": 35,
      "edition": "Evening Edition · 3 August 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "The Alhambra Decree: Spain expels its Jews across the sea (1492)",
          "excerpt": "we order all Jews and Jewesses of whatever age they may be … that by the end of the month of July next of the present year, they depart from all of these our said realms and lordships, along with their sons and daughters, menservants and maidservants, Jewish familiars, those who are great as well as the lesser folk, of whatever age they may be, and they shall not dare to return to those places.",
          "source": "Ferdinand and Isabella, Alhambra Decree (Edict of the Expulsion of the Jews of Spain), Granada, 31 March 1492; English translation hosted by Florida Atlantic University",
          "href": "https://www.fau.edu/artsandletters/pjhr/chhre/pdf/hh-alhambra-1492-english.pdf"
        },
        {
          "category": "historical",
          "title": "The Kindertransport: unaccompanied children sent to safety (1938–1940)",
          "excerpt": "In the nine months between Kristallnacht and the outbreak of war, Britain admitted roughly 10,000 mostly Jewish children from Germany, Austria and Czechoslovakia—unaccompanied minors placed by desperate parents into the hands of strangers. They travelled by train and boat with identification tags around their necks; the first transport reached Harwich on 2 December 1938, and many of the children never saw their families again. Like the youngsters stranded in Ceuta, they arrived as children first and refugees second, dependent wholly on how the receiving country chose to answer the border.",
          "source": "United States Holocaust Memorial Museum, Holocaust Encyclopedia, 'Kindertransport, 1938–40'",
          "href": "https://encyclopedia.ushmm.org/content/en/article/kindertransport-1938-40"
        },
        {
          "category": "literary",
          "title": "'The New Colossus': the gate that welcomes the wretched",
          "excerpt": "\"Keep, ancient lands, your storied pomp!\" cries she\nWith silent lips. \"Give me your tired, your poor,\nYour huddled masses yearning to breathe free,\nThe wretched refuse of your teeming shore.\nSend these, the homeless, tempest-tost to me,\nI lift my lamp beside the golden door!\"",
          "source": "Emma Lazarus, 'The New Colossus' (sonnet, 1883), as reproduced by the U.S. National Park Service (Statue of Liberty National Monument)",
          "href": "https://www.nps.gov/stli/learn/historyculture/colossus.htm"
        },
        {
          "category": "literary",
          "title": "The Aeneid: the exile driven from his shore by sea and land",
          "excerpt": "Arms, and the man I sing, who, forc'd by fate,\nAnd haughty Juno's unrelenting hate,\nExpell'd and exil'd, left the Trojan shore.\nLong labours, both by sea and land, he bore",
          "source": "Virgil, Aeneid, Book I (trans. John Dryden), Project Gutenberg",
          "href": "https://www.gutenberg.org/files/228/228-h/228-h.htm"
        },
        {
          "category": "artistic",
          "title": "'The Last of England': a family departs its homeland by sea",
          "excerpt": "Brown paints emigration as intimate dread rather than adventure: a young couple, modelled on the artist and his wife, huddle on the deck of a departing ship, the white cliffs of England receding behind them under a grey sky. Her hand clasps a tiny fist barely visible beneath her cloak—their infant, carried into exile. The tight oval frame and their fixed, forward stares make the viewer feel the irreversibility of leaving one shore for an uncertain welcome on another.",
          "source": "Ford Madox Brown, 'The Last of England', oil on panel, 1855, Birmingham Museum and Art Gallery",
          "href": "https://en.wikipedia.org/wiki/The_Last_of_England_(painting)",
          "image": {
            "src": "/covers/spain-ceuta-migrant-children-eu-borders--a4.png",
            "alt": "An emigrant couple on a ship's deck under a grey sky, the woman sheltering an infant beneath her cloak as the English coast recedes",
            "credit": "Ford Madox Brown, 'The Last of England' (1855), Birmingham Museum and Art Gallery. Public domain, via Wikimedia Commons (Google Art Project)."
          }
        },
        {
          "category": "artistic",
          "title": "'The Raft of the Medusa': the stranded straining toward rescue",
          "excerpt": "Géricault built his vast canvas from a real catastrophe: the 1816 wreck of the frigate Méduse, whose castaways were left to drift on a makeshift raft where only fifteen of some 150 survived twelve days at sea. He paints the instant of desperate hope—survivors, living and dead, piled in a pyramid of bodies as one waves a scrap of cloth at a ship barely visible on the horizon. Two centuries on, the image reads as a prophecy of the overloaded boats and stranded lives of the Mediterranean crossing.",
          "source": "Théodore Géricault, 'Le Radeau de la Méduse' (The Raft of the Medusa), oil on canvas, 1818–1819, Musée du Louvre, Paris (INV 4884)",
          "href": "https://collections.louvre.fr/en/ark:/53355/cl010059199",
          "image": {
            "src": "/covers/spain-ceuta-migrant-children-eu-borders--a5.png",
            "alt": "Shipwreck survivors crowded on a makeshift raft at sea, the living heaped over the dead as one figure waves cloth toward a distant ship",
            "credit": "Théodore Géricault, 'The Raft of the Medusa' (1818–19), Musée du Louvre. Public domain, via Wikimedia Commons."
          }
        }
      ]
    },
    {
      "slug": "faa-certifies-boeing-737-max-7",
      "headline": "The FAA certifies Boeing's 737 MAX 7 jetliner for passenger flight after years of delays",
      "overview": "The US Federal Aviation Administration certified Boeing's smallest 737 MAX model, the MAX 7, clearing the long-delayed jet for commercial service. The approval, years behind schedule after crashes and quality crises, is a rare win for the planemaker. Southwest Airlines is the largest customer awaiting the aircraft.",
      "genre": "Technology",
      "sources": [
        {
          "name": "AP",
          "href": "https://news.google.com/rss/articles/CBMipgFBVV95cUxPV0lkMThrX3BhRzNPenJyd3ZQYXowMUdxdVhyNTUxTEJFZWhLa2VIN3FUN1E4bFFKcW84QTRKbzhFdUhSaDBhSGxSQkE4SjZwTnc4Y2YzR011Mkd1V05qWDNIX0FPX0NnWW9Td1czaExYQlBJMnJBRVRwVHlHcGFTOUxDM3Bpa3RodDA4T0Q5UnpycUxnRjNkVjV4WU53RW1OclBxTWZB?oc=5"
        },
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMivgFBVV95cUxObm5abmxuWVVCMWR2ZDdDaTFWSnJ5SEYxZnc5MFg0Qko5RkJWMGZpTndzclotOVAza0ZYRHJoTmpUZk1yclB4MnZxUFlYanVwbnlGd3JaNk5sZ2YxbjliM3EyVk55bUtEZU9mQWNRR214WTlQRVdTRXAwbVdGRzdYdE1CY0hrOXlIWjRlV0V0VGg2d05qLUJzT05iQ0oyaS13UFM4azRFMXF2T2ZOUEhPT2hJblN1bUozNlc1SkNn?oc=5"
        }
      ],
      "href": "#",
      "publishedAt": "2026-08-03",
      "image": {
        "src": "/covers/faa-certifies-boeing-737-max-7.png",
        "alt": "A new twin-engine Boeing 737 MAX airliner in flight against a clear sky.",
        "credit": "Wikimedia Commons"
      },
      "rank": 36,
      "edition": "Evening Edition · 3 August 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Orville Wright's diary of the first powered flight",
          "excerpt": "After running the engine and propellers a few minutes to get them in working order, I got on the machine at 10:35 for the first trial. ... The machine lifted from the truck just as it was entering on the fourth rail. ... A sudden dart when out about 100 feet from the end of the tracks ended the flight. Time about 12 seconds (not known exactly as watch was not promptly stopped).",
          "source": "Orville Wright, personal diary entry for December 17, 1903 (Wright Brothers Collection); transcription on Wikisource",
          "href": "https://en.wikisource.org/wiki/Orville_Wright_diary/1903",
          "image": {
            "src": "/covers/faa-certifies-boeing-737-max-7--a0.png",
            "alt": "The Wright Flyer lifting off at Kill Devil Hills on December 17, 1903, Orville at the controls and Wilbur running alongside",
            "credit": "Photograph by John T. Daniels, December 17, 1903, public domain via Wikimedia Commons"
          }
        },
        {
          "category": "historical",
          "title": "The de Havilland Comet inquiry: fatigue, grounding, and redesign",
          "excerpt": "the cause of the accident to the Comet wrecked off Elba was the structural failure of the pressure cabin brought about by fatigue",
          "source": "Statement by Mr. Boyd-Carpenter on the Report of the Court of Inquiry into the Comet accidents, House of Commons, 16 February 1955 (Hansard)",
          "href": "https://api.parliament.uk/historic-hansard/commons/1955/feb/16/comet-aircraft-accidents-report-of"
        },
        {
          "category": "literary",
          "title": "Daedalus and Icarus",
          "excerpt": "My son, I caution you to keep / the middle way, for if your pinions dip / too low the waters may impede your flight; / and if they soar too high the sun may scorch them. ... but as he neared the scorching sun, its heat / softened the fragrant wax that held his plumes; / and heat increasing melted the soft wax— / he waved his naked arms instead of wings, / with no more feathers to sustain his flight.",
          "source": "Ovid, Metamorphoses, Book 8, trans. Brookes More (1922), Perseus Digital Library",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0028:book%3D8:card%3D183",
          "image": {
            "src": "/covers/faa-certifies-boeing-737-max-7--a2.png",
            "alt": "A serene coastal landscape with a ploughman, shepherd and ships; Icarus's legs disappear into the sea at lower right",
            "credit": "Pieter Bruegel the Elder, Landscape with the Fall of Icarus, c. 1560s, Royal Museums of Fine Arts of Belgium, Brussels — via Wikimedia Commons"
          }
        },
        {
          "category": "literary",
          "title": "Leonardo's prophecy of the great bird",
          "excerpt": "Piglierà il primo volo il grande uccello sopra del dosso del suo magno Cecero e empiendo l'universo di stupore, empiendo di sua fama tutte le scritture e groria eterna al nido dove nacque.",
          "source": "Leonardo da Vinci, Codice sul volo degli uccelli (Codex on the Flight of Birds), c. 1505, Biblioteca Reale, Turin; text as recorded in the entry 'Grande Nibbio' on Italian Wikisource/Wikipedia",
          "href": "https://it.wikipedia.org/wiki/Grande_Nibbio",
          "image": {
            "src": "/covers/faa-certifies-boeing-737-max-7--a3.png",
            "alt": "A folio from Leonardo da Vinci's Codex on the Flight of Birds, with mirror-script notes and sketches analysing birds in flight",
            "credit": "Leonardo da Vinci, Codex on the Flight of Birds, c. 1505, Biblioteca Reale, Turin — via Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "Landscape with the Fall of Icarus",
          "excerpt": "Bruegel hides catastrophe in plain sight: the ploughman leans into his furrow, the shepherd gazes at the sky, and the merchant ship sails on, while at the lower right only two thrashing legs mark where Icarus has plunged into the sea. The painting is a study in how the world keeps working while one over-reaching flight ends in disaster — a fall that scarcely interrupts the ordinary business of the day.",
          "source": "Pieter Bruegel the Elder (attr.), oil on canvas, c. 1560s, Royal Museums of Fine Arts of Belgium, Brussels",
          "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_de_Oude_-_De_val_van_Icarus.jpg",
          "image": {
            "src": "/covers/faa-certifies-boeing-737-max-7--a4.png",
            "alt": "A serene coastal landscape with a ploughman, shepherd and ships; Icarus's legs disappear into the sea at lower right",
            "credit": "Pieter Bruegel the Elder, Landscape with the Fall of Icarus, c. 1560s, Royal Museums of Fine Arts of Belgium, Brussels — via Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "The Lament for Icarus",
          "excerpt": "Draper paints the aftermath of the dream rather than the flight: the golden-winged body of Icarus lies limp against a dark rock as three sea-nymphs mourn over him, his great feathered wings still splendid though the wax has failed. The picture turns a cautionary myth into an elegy, dwelling on the beauty and the cost of reaching too high.",
          "source": "Herbert James Draper, oil on canvas, exhibited 1898, Tate Britain, London",
          "href": "https://www.tate.org.uk/art/artworks/draper-the-lament-for-icarus-n01679",
          "image": {
            "src": "/covers/faa-certifies-boeing-737-max-7--a5.png",
            "alt": "The dead Icarus with large golden wings draped over a dark rock, mourned by three sea-nymphs against a dusky sky",
            "credit": "Herbert James Draper, The Lament for Icarus, exhibited 1898, Tate Britain, London — via Wikimedia Commons (Google Art Project)"
          }
        }
      ]
    },
    {
      "slug": "ai-firms-trump-safety-testing",
      "headline": "Meta, Anthropic, Google and OpenAI are set to meet Trump administration officials on AI safety testing",
      "overview": "Leading AI developers including Meta, Anthropic, Google and OpenAI were invited to meet Trump administration officials to discuss how the most advanced AI models are tested for safety. The talks follow a June executive order outlining voluntary government tests of models' cybersecurity and hacking capabilities. The White House has not said how results would be reported or made public.",
      "genre": "Technology",
      "sources": [
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMiqgFBVV95cUxObWVNalU0cV9OY2Q0RHFkdFJtakZJRTdzV1BiUDVvamY3RlVRX3ZydGl5YnAzU2dxQldBTVVMMW1wMWl0ekI1eXZJdm84bjBtUFBZc2JBeVJfblJEMVhDZGs4UWpaZXZTTUQtYy1QVFVsYmxsUG1jVHZTd2VFWEJXV2FlNXg4ZVZmRUI5SWpxMWo2cGFTT0hWRUJmNUpyaXZFRnRISnhvNy1YUQ?oc=5"
        },
        {
          "name": "Bloomberg",
          "href": "https://www.bloomberg.com/news/articles/2026-08-03/openai-anthropic-google-to-join-white-house-ai-safety-meeting"
        }
      ],
      "href": "#",
      "publishedAt": "2026-08-03",
      "image": {
        "src": "/covers/ai-firms-trump-safety-testing.png",
        "alt": "The White House in Washington, its columned north portico seen across the lawn.",
        "credit": "Wikimedia Commons"
      },
      "rank": 37,
      "edition": "Evening Edition · 3 August 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "The Russell–Einstein Manifesto",
          "excerpt": "We have to learn to think in a new way... In view of the fact that in any future world war nuclear weapons will certainly be employed, and that such weapons threaten the continued existence of mankind, we urge the governments of the world to realize, and to acknowledge publicly, that their purpose cannot be furthered by a world war, and we urge them, consequently, to find peaceful means for the settlement of all matters of dispute between them.",
          "source": "Bertrand Russell, Albert Einstein and nine fellow scientists, statement issued in London, 9 July 1955 (Atomic Heritage Foundation / Nuclear Museum archive)",
          "href": "https://ahf.nuclearmuseum.org/ahf/key-documents/russell-einstein-manifesto/"
        },
        {
          "category": "historical",
          "title": "Summary Statement of the Asilomar Conference on Recombinant DNA Molecules",
          "excerpt": "It is this ignorance that has compelled us to conclude that it would be wise to exercise the utmost caution... it was agreed that standards of protection should be greater at the beginning and modified as assessments of the risks change.",
          "source": "Paul Berg, David Baltimore, Sydney Brenner, Richard O. Roblin III and Maxine F. Singer, Proceedings of the National Academy of Sciences 72(6):1981–1984, 1975",
          "href": "https://pmc.ncbi.nlm.nih.gov/articles/PMC432675/"
        },
        {
          "category": "literary",
          "title": "Frankenstein; or, The Modern Prometheus",
          "excerpt": "Remember that I have power; you believe yourself miserable, but I can make you so wretched that the light of day will be hateful to you. You are my creator, but I am your master; obey!",
          "source": "Mary Wollstonecraft Shelley, first published 1818 (Project Gutenberg full text)",
          "href": "https://www.gutenberg.org/cache/epub/84/pg84.txt",
          "image": {
            "src": "/covers/ai-firms-trump-safety-testing--a2.png",
            "alt": "Theodor von Holst's engraved frontispiece to the 1831 edition of Frankenstein, showing the newly animated creature recoiling as Victor flees his laboratory",
            "credit": "Theodor von Holst, frontispiece to the 1831 edition of Frankenstein; via Wikimedia Commons (public domain)"
          }
        },
        {
          "category": "literary",
          "title": "The Sorcerer's Apprentice (\"The Pupil in Magic\")",
          "excerpt": "Ah, he's coming! see, / Great is my dismay! / Spirits raised by me / Vainly would I lay!",
          "source": "Johann Wolfgang von Goethe, \"Der Zauberlehrling\" (1797); anonymous English translation in The Works of J. W. von Goethe, Vol. 9 (Wikisource)",
          "href": "https://en.wikisource.org/wiki/The_Works_of_J._W._von_Goethe/Volume_9/The_Pupil_in_Magic",
          "image": {
            "src": "/covers/ai-firms-trump-safety-testing--a3.png",
            "alt": "An 1882 illustration of the sorcerer's apprentice overwhelmed by the flood as the enchanted broom carries endless buckets of water",
            "credit": "Illustration by F. Barth, c. 1882; via Wikimedia Commons (public domain)"
          }
        },
        {
          "category": "artistic",
          "title": "Prometheus Bound",
          "excerpt": "Rubens paints the Titan who stole fire for humankind splayed helpless on his rock, an eagle tearing at his liver as punishment from the gods for handing mortals a power that was not theirs to give. Muscles strain, the torch of stolen knowledge already spent, the giver of a transformative technology now bound to endure the consequences of the gift. It is the promethean bargain made flesh: the very act of empowering the world with fire is inseparable from the terror and the reckoning it unleashes.",
          "source": "Peter Paul Rubens (with the eagle by Frans Snyders), oil on canvas, c. 1611–1618, Philadelphia Museum of Art",
          "href": "https://commons.wikimedia.org/wiki/File:Rubens_-_Prometheus_Bound.jpg",
          "image": {
            "src": "/covers/ai-firms-trump-safety-testing--a4.png",
            "alt": "Rubens's Prometheus Bound: a muscular nude Titan lies on his back on a rocky ledge while a great eagle grips him and tears at his side",
            "credit": "Peter Paul Rubens and Frans Snyders, Prometheus Bound, c. 1611–1618, Philadelphia Museum of Art; via Wikimedia Commons (public domain)"
          }
        },
        {
          "category": "artistic",
          "title": "Prometheus: The Poem of Fire, Op. 60",
          "excerpt": "Scriabin's tone poem opens on his unresolved \"mystic chord,\" a sonority hovering outside ordinary tonality, as if to render in sound a power humanity has summoned but cannot yet master. Across the score he binds the orchestra to a keyboard of coloured light, insisting that fire, illumination and creation are one ecstatic and dangerous act. The music climbs toward a blazing, near-uncontainable climax: the myth of stolen fire recast as an intoxicating drive to create something greater and more luminous than ourselves.",
          "source": "Alexander Scriabin, symphonic poem for orchestra, piano, chorus and colour organ, composed 1910 (IMSLP / Petrucci Music Library score)",
          "href": "https://imslp.org/wiki/Prometheus,_Le_Po%C3%A8me_du_Feu,_Op.60_(Scriabin,_Aleksandr)"
        }
      ]
    },
    {
      "slug": "uefa-fifa-infantino-world-cup-selloff",
      "headline": "European soccer body UEFA warns FIFA of legal action over Infantino's abandoned plan to sell World Cup stakes",
      "overview": "UEFA warned FIFA it could take legal action over president Gianni Infantino's failed plan to sell commercial stakes in the men's World Cup, according to senior European soccer officials. Opponents threatened 'non co-operation' with FIFA unless Infantino steps back, deepening a governance crisis. Several national federations have withdrawn support for his re-election.",
      "genre": "Culture",
      "sources": [
        {
          "name": "AP",
          "href": "https://news.google.com/rss/articles/CBMimwFBVV95cUxQS1lMdTNycFBsQVJid1UxY0RFd0xEcVRKdW5MM2NSRGlLUTVraUVtU2xuMzk5MGFUVXhzd19XUXJwajdiNTIxX3lGSGF6UlhLODdwbjhzc1d6c09DbWZzMjJyYmo4ZXBSQ1lRWEtSeHFBRjF2UDM4NzY4OFhGX3ZXS1h4YnFXU29WdS1jTE12RW1YVmNtZUliT0E0WQ?oc=5"
        },
        {
          "name": "BBC",
          "href": "https://www.bbc.co.uk/sport/football/articles/cp30vg829nxo"
        }
      ],
      "href": "#",
      "publishedAt": "2026-08-03",
      "image": {
        "src": "/covers/uefa-fifa-infantino-world-cup-selloff.png",
        "alt": "The modernist stone-and-glass headquarters of world soccer's governing body on a wooded hillside above Zurich.",
        "credit": "Wikimedia Commons"
      },
      "rank": 38,
      "edition": "Evening Edition · 3 August 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "The Zanes of Olympia: statues cast from cheaters' fines",
          "excerpt": "By the platform have been set up bronze images of Zeus. These have been made from the fines inflicted on athletes who have wantonly broken the rules of the contests, and they are called Zanes (figures of Zeus) by the natives.",
          "source": "Pausanias, Description of Greece 5.21.2, trans. W. H. S. Jones (Loeb, 1918); Perseus Digital Library",
          "href": "http://www.perseus.tufts.edu/hopper/text?doc=Paus.+5.21.2",
          "image": {
            "src": "/covers/uefa-fifa-infantino-world-cup-selloff--a0.png",
            "alt": "Row of stone statue bases (the Zanes) lining the entrance to the ancient stadium at Olympia, funded by fines levied on athletes who bribed their way to victory",
            "credit": "Bases of the Zanes, Olympia (4th–1st century BC). Photo by Dennis Jarvis, Wikimedia Commons (CC BY-SA)"
          }
        },
        {
          "category": "historical",
          "title": "The Blue and Green factions and the Nika revolt against Justinian",
          "excerpt": "In every city the population has been divided for a long time past into the Blue and the Green factions; but within comparatively recent times it has come about that, for the sake of these names and the seats which the rival factions occupy in watching the games, they spend their money and abandon their bodies to the most cruel tortures ... I, for my part, am unable to call this anything except a disease of the soul.",
          "source": "Procopius, History of the Wars 1.24, trans. H. B. Dewing (Loeb, 1914); Internet Medieval Sourcebook, Fordham University",
          "href": "https://sourcebooks.fordham.edu/source/procop-wars1.asp",
          "image": {
            "src": "/covers/uefa-fifa-infantino-world-cup-selloff--a1.png",
            "alt": "Byzantine mosaic of Emperor Justinian I flanked by his court and guard, Basilica of San Vitale, Ravenna",
            "credit": "Mosaic of Emperor Justinian I, Basilica of San Vitale, Ravenna (c. 547). Wikimedia Commons"
          }
        },
        {
          "category": "literary",
          "title": "Pindar's Olympian 1: the glory of the games above all wealth",
          "excerpt": "Water is best, and gold, like a blazing fire in the night, stands out supreme of all lordly wealth. But if, my heart, you wish to sing of contests, look no further for any star warmer than the sun ... and let us not proclaim any contest greater than Olympia.",
          "source": "Pindar, Olympian 1 (476 BC), trans. Diane Arnson Svarlien; Perseus Digital Library",
          "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0162:book=O.:poem=1"
        },
        {
          "category": "literary",
          "title": "Dante's simoniacs: those who put holy things up for sale",
          "excerpt": "O Simon Magus, O forlorn disciples, / Ye who the things of God, which ought to be / The brides of holiness, rapaciously / For silver and for gold do prostitute,",
          "source": "Dante Alighieri, Inferno, Canto XIX, trans. Henry Wadsworth Longfellow (1867); Wikisource",
          "href": "https://en.wikisource.org/wiki/Divine_Comedy_(Longfellow_1867)/Volume_1/Canto_19"
        },
        {
          "category": "artistic",
          "title": "Panathenaic Prize Amphora: the foot-race",
          "excerpt": "On the body of this two-handled prize vase four nude runners stretch full-tilt across the clay, heads forward, arms pumping, the timeless image of athletes competing for honor. Such amphorae, filled with sacred olive oil from Athena's groves, were the official prizes of the Panathenaic games, their reverse always stamped with the goddess herself. The vessel fuses the athletic contest, its guardian deity, and its reward into a single object, a reminder that the games and their prizes were once held in trust for a whole community rather than sold off in shares.",
          "source": "Attic black-figure Panathenaic prize amphora attributed to the Euphiletos Painter, ca. 530–520 BC; British Museum (B137), via Wikimedia Commons",
          "href": "https://commons.wikimedia.org/wiki/File:Panathenaic_amphora_BM_B137.jpg",
          "image": {
            "src": "/covers/uefa-fifa-infantino-world-cup-selloff--a4.png",
            "alt": "Attic black-figure amphora showing four nude runners in a foot-race, painted in black silhouette against the orange clay",
            "credit": "Panathenaic prize amphora, attributed to the Euphiletos Painter, ca. 530–520 BC, British Museum (B137). Photo: Jastrow, Wikimedia Commons (public domain)"
          }
        },
        {
          "category": "artistic",
          "title": "El Greco: Christ Driving the Money Changers from the Temple",
          "excerpt": "With a raised cord whip and a swirl of rose and blue robes, Christ scatters the traders who had turned a sacred precinct into a marketplace, their bodies recoiling in a diagonal cascade of alarm. El Greco stages the cleansing amid grand classical columns, coins and caged doves spilling underfoot, dividing the panel between the guilty who flee and the faithful who look on. It is the archetypal image of the sacred defended against those who would put it up for sale.",
          "source": "El Greco (Domenikos Theotokopoulos), Christ Driving the Money Changers from the Temple, c. 1570; Wikimedia Commons (Google Art Project)",
          "href": "https://commons.wikimedia.org/wiki/File:El_Greco_(Domenikos_Theotokopoulos)_-_Christ_Driving_the_Money_Changers_from_the_Temple_-_Google_Art_Project.jpg",
          "image": {
            "src": "/covers/uefa-fifa-infantino-world-cup-selloff--a5.png",
            "alt": "El Greco painting of Christ wielding a whip to drive merchants and money changers out of the temple, figures recoiling amid classical architecture",
            "credit": "El Greco, Christ Driving the Money Changers from the Temple, c. 1570. Wikimedia Commons (Google Art Project), public domain"
          }
        }
      ]
    },
    {
      "slug": "mackintosh-building-rebuild-campaign",
      "headline": "A Scottish architect launches a campaign for a full rebuild of Glasgow's fire-ravaged Mackintosh Building",
      "overview": "Architect Ruairidh Moir launched a public campaign for a faithful reconstruction of Charles Rennie Mackintosh's fire-gutted Glasgow School of Art, dubbed 'Scotland's Notre-Dame'. He called for an independent body to take over the project after the school said it could not afford the roughly £265 million rebuild alone. A petition urging Scottish and UK government support gathered thousands of signatures.",
      "genre": "Culture",
      "sources": [
        {
          "name": "Dezeen",
          "href": "https://www.dezeen.com/2026/08/03/glasgow-school-of-art-campaign/"
        },
        {
          "name": "The Scotsman",
          "href": "https://www.scotsman.com/arts-and-culture/campaign-launched-for-full-rebuild-of-scotlands-notre-dame-at-gsa-8813887"
        }
      ],
      "href": "#",
      "publishedAt": "2026-08-03",
      "image": {
        "src": "/covers/mackintosh-building-rebuild-campaign.png",
        "alt": "The stone-and-glass facade of Charles Rennie Mackintosh's Glasgow School of Art building, with its tall studio windows.",
        "credit": "Wikimedia Commons"
      },
      "rank": 39,
      "edition": "Evening Edition · 3 August 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "The Great Fire of London devours Old St Paul's, 1666 — and Wren rebuilds it anew",
          "excerpt": "All Fleet street, the Old Bailey, Ludgate hill, Warwick lane, Newgate, Paul's chain, Watling street, now flaming, and most of it reduced to ashes; the stones of Paul's flew like grenados, the melting lead running down the streets in a stream, and the very pavements glowing with fiery redness, so as no horse, nor man, was able to tread on them, and the demolition had stopped all the passages, so that no help could be applied.",
          "source": "John Evelyn, 'The Diary of John Evelyn' (Vol. 2), entry for 4 September 1666, Project Gutenberg",
          "href": "https://www.gutenberg.org/cache/epub/42081/pg42081.txt"
        },
        {
          "category": "historical",
          "title": "Venice's Campanile of San Marco collapses in 1902 and is rebuilt 'as it was, where it was'",
          "excerpt": "When the thousand-year-old bell tower crumbled into a heap of rubble in Piazza San Marco — killing no one but the custodian's cat — Venice resolved almost at once to raise it again exactly as it had stood. Mayor Filippo Grimani's watchword, 'com'era, dov'era' (as it was, where it was), overruled voices who found the square handsomer without it or a replica devoid of historical value. The new campanile, rebuilt with surviving bricks and crowned by the one bell that outlived the fall, was consecrated in 1912, a millennium after the first foundations were laid.",
          "source": "St Mark's Campanile — collapse of 14 July 1902 and reconstruction (inaugurated 25 April 1912) on the principle 'com'era, dov'era', Wikipedia",
          "href": "https://en.wikipedia.org/wiki/St_Mark%27s_Campanile",
          "image": {
            "src": "/covers/mackintosh-building-rebuild-campaign--a1.png",
            "alt": "A mound of rubble where a great bell tower once stood, beside the arcades of St Mark's Square",
            "credit": "Domenico Anderson, ruins of the Campanile of San Marco, 14 July 1902, via Wikimedia Commons (public domain)"
          }
        },
        {
          "category": "literary",
          "title": "The Phoenix reborn from its own ashes — Ovid's 'Metamorphoses'",
          "excerpt": "There is one bird which reproduces and renews itself: the Assyrians gave this bird his name—the Phoenix. He does not live either on grain or herbs, but only on small drops of frankincense and juices of amomum. ... As soon as he has strewn in this new nest the cassia bark and ears of sweet spikenard, and some bruised cinnamon with yellow myrrh, he lies down on it and refuses life among those dreamful odors.—And they say that from the body of the dying bird is reproduced a little Phoenix which is destined to live just as many years.",
          "source": "Ovid, 'Metamorphoses' Book XV, trans. Brookes More (1922), Theoi Classical Texts Library",
          "href": "https://www.theoi.com/Text/OvidMetamorphoses15.html"
        },
        {
          "category": "literary",
          "title": "Ruskin's warning: to 'restore' is 'the most total destruction which a building can suffer'",
          "excerpt": "Neither by the public, nor by those who have the care of public monuments, is the true meaning of the word restoration understood. It means the most total destruction which a building can suffer: a destruction out of which no remnants can be gathered; a destruction accompanied with false description of the thing destroyed. Do not let us deceive ourselves in this important matter; it is impossible, as impossible as to raise the dead, to restore anything that has ever been great or beautiful in architecture.",
          "source": "John Ruskin, 'The Seven Lamps of Architecture' (1849), ch. VI 'The Lamp of Memory', Project Gutenberg",
          "href": "https://www.gutenberg.org/cache/epub/35898/pg35898.txt"
        },
        {
          "category": "artistic",
          "title": "Turner paints a beloved landmark ablaze: 'The Burning of the Houses of Lords and Commons'",
          "excerpt": "Turner stood among the crowds on the Thames the night the Palace of Westminster burned, and turned catastrophe into incandescence — a torrent of white-gold fire tearing into the sky while Westminster Bridge and the water below blaze in its reflection. The very stone of a national monument seems to dissolve into heat and light, spectators reduced to shadows at the river's edge. The painting fixes the terrible beauty of the moment a treasured building is lost, the same shock Glasgow felt watching the Mackintosh burn.",
          "source": "J.M.W. Turner, 'The Burning of the Houses of Lords and Commons, October 16, 1834' (1835), oil on canvas, Philadelphia Museum of Art",
          "href": "https://commons.wikimedia.org/wiki/File:Joseph_Mallord_William_Turner,_English_-_The_Burning_of_the_Houses_of_Lords_and_Commons,_October_16,_1834_-_Google_Art_Project.jpg",
          "image": {
            "src": "/covers/mackintosh-building-rebuild-campaign--a4.png",
            "alt": "A vast public building engulfed in white-gold flames at night, its fire mirrored in the river below",
            "credit": "J.M.W. Turner, 'The Burning of the Houses of Lords and Commons' (1835), Philadelphia Museum of Art, via Wikimedia Commons (public domain)"
          }
        },
        {
          "category": "artistic",
          "title": "Stravinsky's 'Firebird' — a score of destruction giving way to radiant rebirth",
          "excerpt": "Stravinsky's 1910 ballet takes the Russian folk emblem of the fire-bird — kin to the phoenix — and drives its music from menace and the shattering of Kashchei's dark kingdom toward a slowly swelling hymn. In the Finale a single horn intones a quiet melody that gathers strength, instrument by instrument, until the whole orchestra blazes into a triumphant coda of bells and brass. It is the sound of something thought lost rising again, luminous and whole — the very hope a full rebuild of the Mackintosh would embody.",
          "source": "Igor Stravinsky, 'The Firebird' (L'Oiseau de feu), ballet, 1910, IMSLP (Petrucci Music Library)",
          "href": "https://imslp.org/wiki/The_Firebird_(ballet),_K010_(Stravinsky,_Igor)"
        }
      ]
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
