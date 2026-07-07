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
// the Evening Edition of 5 July 2026 (ranks 1-13) leads with its hero story,
// followed by the Afternoon Edition of 5 July 2026 and the Morning Edition of 5 July 2026.
// Stories are selected from the live RSS feeds in `lib/feeds.ts`. The analogies are
// the heart of each story: six per event, two per category, each linking to a real
// human-written source (a primary text, museum object page, or archive). Excerpts
// quote the most relevant passage verbatim where the source is public domain, and
// otherwise describe rather than quote. Covers are dithered local copies: feed or
// rights-clean Wikimedia art/photos credited to the source, otherwise an
// AI-generated illustration (credit "AI-generated"). Every analogy carries its own
// image too — a rights-clean visual of its subject (the artwork itself, a manuscript
// page, a portrait, a title page; never AI-generated), dithered via
// scripts/dither-art.ts to /covers/<slug>--art. Omit only when nothing rights-clean
// exists; the home hero crossfades to these on hover. Source links to AP/Reuters are
// Google News redirects (see `lib/feeds.ts`).
const stories: Story[] =
[
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
      "lead": true,
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
      "rank": 1
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
      "rank": 2
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
      "rank": 3
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
      "rank": 4
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
      "rank": 5
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
      "rank": 6
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
      "rank": 7
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
      "rank": 8
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
      "rank": 9
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
      "rank": 10
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
      "rank": 11
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
      "rank": 12
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
      "rank": 13
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
      "lead": true,
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
      "rank": 14
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
      "rank": 15
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
      "rank": 16
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
      "rank": 17
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
      "rank": 18
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
      "rank": 19
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
      "rank": 20
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
      "rank": 21
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
      "rank": 22
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
      "rank": 23
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
      "rank": 24
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
      "rank": 25
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
      "rank": 26
    },
    {
      "slug": "china-pacific-missile-test",
      "headline": "China test-fires a ballistic missile into the South Pacific, drawing protests from Japan, Australia and New Zealand",
      "overview": "China's military test-fired a ballistic missile carrying a dummy warhead from a submarine into the South Pacific on July 6, 2026, in what state media called routine annual training. Japan, Australia and New Zealand protested the launch as an unwelcome sign of Beijing's expanding military reach, with Canberra citing a lack of transparency around China's rapid buildup. It was China's first known submarine-launched missile test since 1982 and the first believed to have been fired from a nuclear-powered submarine.",
      "genre": "Politics",
      "sources": [
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMirwFBVV95cUxONHN3R1NZdmtSRi0yZWF1cGt2a3FyVG9qVkJBMkpZUktxZXNYV0tSTXFrdkplR3RsSDdyekFCZGsxODgzR3pjRGxzS2lZVkI4Q1Vvb1VuVm5fb2JXSDdlTEZqZzlxNlJpdHNxQUZNdmJXRzVZdjhPSTRtelE3LXdpZ0h6d0cxRlB3aUh5N1BOS2sxeHFOMUhrMzBTd1hfVS1OZEtHNXY2S01qd3RyOFZF?oc=5"
        },
        {
          "name": "AP News",
          "href": "https://news.google.com/rss/search?q=China%20test-launches%20ballistic%20missile%20South%20Pacific&hl=en-US&gl=US&ceid=US:en"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-06",
      "image": {
        "src": "/covers/china-pacific-missile-test.png",
        "alt": "A ballistic missile rises on a plume of smoke and spray above the open sea beneath a pale dawn sky",
        "credit": "AI-generated"
      },
      "lead": true,
      "edition": "Afternoon Edition · 6 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Xerxes scourges the Hellespont",
          "excerpt": "Then when Xerxes heard it he was exceedingly enraged, and bade them scourge the Hellespont with three hundred strokes of the lash and let down into the sea a pair of fetters. Nay, I have heard further that he sent branders also with them to brand the Hellespont. However this may be, he enjoined them, as they were beating, to say Barbarian and presumptuous words as follows: “Thou bitter water, thy master lays upon thee this penalty, because thou didst wrong him not having suffered any wrong from him: and Xerxes the king will pass over thee whether thou be willing or no; but with right, as it seems, no man doeth sacrifice to thee, seeing that thou art a treacherous and briny stream.”",
          "source": "Herodotus, The History of Herodotus, Book VII.34–35 (trans. G. C. Macaulay), Project Gutenberg",
          "href": "https://www.gutenberg.org/files/2456/2456-0.txt"
        },
        {
          "category": "historical",
          "title": "The Athenian armada sails for Sicily",
          "excerpt": "Indeed the expedition became not less famous for its wonderful boldness and for the splendour of its appearance, than for its overwhelming strength as compared with the peoples against whom it was directed, and for the fact that this was the longest passage from home hitherto attempted, and the most ambitious in its objects considering the resources of those who undertook it.",
          "source": "Thucydides, History of the Peloponnesian War, Book VI.31 (trans. Richard Crawley), Project Gutenberg",
          "href": "https://www.gutenberg.org/cache/epub/7142/pg7142.txt"
        },
        {
          "category": "literary",
          "title": "Apollo's arrows fall upon the fleet",
          "excerpt": "Thus Chryses pray’d:—the favouring power attends, / And from Olympus’ lofty tops descends. / Bent was his bow, the Grecian hearts to wound; / Fierce as he moved, his silver shafts resound. / Breathing revenge, a sudden night he spread, / And gloomy darkness roll’d about his head. / The fleet in view, he twang’d his deadly bow, / And hissing fly the feather’d fates below.",
          "source": "Homer, The Iliad, Book I (trans. Alexander Pope), Project Gutenberg",
          "href": "https://www.gutenberg.org/cache/epub/6130/pg6130.txt"
        },
        {
          "category": "literary",
          "title": "The rebel angels invent artillery",
          "excerpt": "These in their dark nativity the deep / Shall yield us, pregnant with infernal flame; / Which, into hollow engines, long and round, / Thick rammed, at the other bore with touch of fire / Dilated and infuriate, shall send forth / From far, with thundering noise, among our foes / Such implements of mischief, as shall dash / To pieces, and o’erwhelm whatever stands / Adverse, that they shall fear we have disarmed / The Thunderer of his only dreaded bolt.",
          "source": "John Milton, Paradise Lost, Book VI (trans. n/a; Satan's invention of artillery), Project Gutenberg",
          "href": "https://www.gutenberg.org/cache/epub/26/pg26.txt"
        },
        {
          "category": "artistic",
          "title": "Mars, the Bringer of War (from The Planets, Op. 32)",
          "excerpt": "Holst opens his suite with a relentless five-beat ostinato, hammered out col legno by the strings like the mechanical drumbeat of an advancing war machine. Brass and timpani pile into snarling, dissonant climaxes that swell without mercy, conjuring a faceless, overwhelming force on the march. It is music of pure intimidation—an arsenal made audible—mirroring a rising power that stages its firepower to unnerve distant neighbours.",
          "source": "Gustav Holst, The Planets, Op. 32 — I. Mars, the Bringer of War, IMSLP",
          "href": "https://imslp.org/wiki/The_Planets,_Op.32_(Holst,_Gustav)"
        },
        {
          "category": "artistic",
          "title": "The Great Wave off Kanagawa",
          "excerpt": "A colossal wave rears over the sea off Kanagawa, its claw-like crest of foam poised to crash down upon three slender fishing boats whose crews cling low against the onslaught. Far in the distance the snow-capped cone of Mount Fuji is dwarfed to a small triangle beneath the towering surge. Hokusai turns the ocean itself into an unstoppable power—a fitting emblem of an overwhelming force rising from the Pacific to loom over all who lie in its path.",
          "source": "Katsushika Hokusai, The Great Wave off Kanagawa (c. 1830–1832), Wikimedia Commons",
          "href": "https://commons.wikimedia.org/wiki/File:Tsunami_by_hokusai_19th_century.jpg",
          "image": {
            "src": "/covers/china-pacific-missile-test--art.png",
            "alt": "A giant blue wave with a foaming, claw-like crest towers over three small fishing boats, with a small snow-capped Mount Fuji visible in the distance.",
            "credit": "Katsushika Hokusai, The Great Wave off Kanagawa (c. 1831); Metropolitan Museum of Art; public domain, via Wikimedia Commons"
          }
        }
      ],
      "rank": 27
    },
    {
      "slug": "itv-sky-comcast-television-deal",
      "headline": "Comcast's Sky agrees to buy ITV's broadcasting and streaming arm in a £1.6 billion deal",
      "overview": "Comcast-owned Sky agreed on July 6, 2026 to acquire ITV's media and entertainment division — its broadcast channels and streaming service — for about £1.6 billion ($2.1 billion), reshaping British television. The combined operation would account for more than 70% of the UK television advertising market and is meant to compete with global streamers such as Netflix and Disney. The deal, which also brings in the maker of 'The Great British Bake Off,' will face regulatory scrutiny.",
      "genre": "Economy",
      "sources": [
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMiuAFBVV95cUxPMzZaRWVZUmJNd0Q0RExjSTI2bGVsaWpIUWdtb2NNRkc4Mk80Z0VMWXFEUWlHRUNoMEN1Yk1FcW02ZU9qTWxWWWo4LVFKUWZkOVQydWZ5LWVMaGcwLThNd1FJSUttQm5TOTZtUnBDYVFJb212V3JDS19xWnNNcWRWazIwLV9DZVlXd3ZFWjljYWN1SE1EUUlleDlxSEl6YnEyV05UTWpPbzNOVHAwdU1yT21ySW5KSzNV?oc=5"
        },
        {
          "name": "Deadline",
          "href": "https://deadline.com/2026/07/sky-acquires-itv-love-island-1236973761/"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-06",
      "image": {
        "src": "/covers/itv-sky-comcast-television-deal.png",
        "alt": "The riverside London Television Centre studios on the South Bank of the Thames",
        "credit": "Wikimedia Commons"
      },
      "edition": "Afternoon Edition · 6 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Adam Smith on the price of monopoly",
          "excerpt": "The price of monopoly is upon every occasion the highest which can be got. The natural price, or the price of free competition, on the contrary, is the lowest which can be taken, not upon every occasion indeed, but for any considerable time together.",
          "source": "Adam Smith, An Inquiry into the Nature and Causes of the Wealth of Nations, Book I, Chapter VII, Project Gutenberg",
          "href": "https://www.gutenberg.org/files/3300/3300-h/3300-h.htm"
        },
        {
          "category": "historical",
          "title": "Tarbell exposes Standard Oil's secret combination",
          "excerpt": "Let us who see what a combination strictly carried out will effect unite secretly to accomplish it. Let us become the nucleus of a private company which gradually shall acquire control of all refineries everywhere, become the only shippers, and consequently the master of the railroads in the matter of freight rates.",
          "source": "Ida M. Tarbell, The History of the Standard Oil Company, Vol. I, Chapter Five: Laying the Foundations of a Trust, Project Gutenberg",
          "href": "https://www.gutenberg.org/files/60692/60692-h/60692-h.htm"
        },
        {
          "category": "literary",
          "title": "The railroad as the all-devouring Octopus",
          "excerpt": "the galloping monster, the terror of steel and steam, with its single eye, cyclopean, red, shooting from horizon to horizon; but saw it now as the symbol of a vast power, huge, terrible, flinging the echo of its thunder over all the reaches of the valley, leaving blood and destruction in its path; the leviathan, with tentacles of steel clutching into the soil, the soulless Force, the iron-hearted Power, the monster, the Colossus, the Octopus.",
          "source": "Frank Norris, The Octopus: A Story of California, Book I, Chapter I, Project Gutenberg",
          "href": "https://www.gutenberg.org/files/268/268-h/268-h.htm"
        },
        {
          "category": "literary",
          "title": "The marketplace as an all-consuming whirlpool",
          "excerpt": "Endlessly, ceaselessly the Pit, enormous, thundering, sucked in and spewed out, sending the swirl of its mighty central eddy far out through the city's channels. Terrible at the centre, it was, at the circumference, gentle, insidious and persuasive, the send of the flowing so mild, that to embark upon it, yielding to the influence, was a pleasure that seemed all devoid of risk.",
          "source": "Frank Norris, The Pit: A Story of Chicago, Project Gutenberg",
          "href": "https://www.gutenberg.org/files/4382/4382-h/4382-h.htm"
        },
        {
          "category": "artistic",
          "title": "Wagner's Das Rheingold: power seized and hoarded",
          "excerpt": "Wagner's Das Rheingold opens the Ring cycle by dramatizing how absolute power is seized and hoarded, as the dwarf Alberich forswears love to steal the river's gold and forge a ring that bends all others to his will. The relentless hammering of anvils in the descent to Nibelheim conjures an entire underworld enslaved to a single master's ambition. Its surging, accumulating leitmotifs make audible the theme of many hands' labour and wealth gathered into one grasping fist.",
          "source": "Richard Wagner, Das Rheingold, WWV 86A (1869), IMSLP",
          "href": "https://imslp.org/wiki/Das_Rheingold,_WWV_86A_(Wagner,_Richard)"
        },
        {
          "category": "artistic",
          "title": "'Next!' — Standard Oil as the strangling octopus",
          "excerpt": "Udo Keppler's 1904 chromolithograph for Puck renders a commercial monopoly as a bloated octopus, its steel tentacles already throttling the copper, steel, and shipping industries and the halls of a state legislature and Congress. One free tentacle stretches hungrily toward the White House, captioned simply Next!, a warning that consolidated power seeks to swallow even the seats of public authority. It endures as the defining image of a single combine reaching to grip an entire marketplace.",
          "source": "Udo Keppler, Next!, Puck v. 56 no. 1436 (1904), Wikimedia Commons",
          "href": "https://commons.wikimedia.org/wiki/File:Standard_oil_octopus_loc_color.jpg",
          "image": {
            "src": "/covers/itv-sky-comcast-television-deal--art.png",
            "alt": "1904 color political cartoon depicting Standard Oil as a giant octopus whose tentacles wrap around government buildings and industries while one reaches toward the White House.",
            "credit": "Udo Keppler, Next! (1904); Library of Congress; public domain, via Wikimedia Commons"
          }
        }
      ],
      "rank": 28
    },
    {
      "slug": "congo-ebola-outbreak-worsens",
      "headline": "Congo says confirmed Ebola cases have climbed to 1,561 with 506 deaths",
      "overview": "The Democratic Republic of Congo reported that confirmed Ebola cases in the country had risen to 1,561, including 506 deaths, in figures released around July 6, 2026. The Bundibugyo-strain outbreak, declared in May and spanning parts of northeastern DRC and neighbouring Uganda, has become one of the largest on record. Health agencies say needs are escalating as responders work to contain its spread.",
      "genre": "Science",
      "sources": [
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/search?q=Congo%20confirmed%20Ebola%20cases%201561%20deaths&hl=en-US&gl=US&ceid=US:en"
        },
        {
          "name": "U.S. News & World Report",
          "href": "https://www.usnews.com/news/world/articles/2026-07-06/congo-says-confirmed-ebola-cases-rise-to-1-561-including-506-deaths"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-06",
      "image": {
        "src": "/covers/congo-ebola-outbreak-worsens.png",
        "alt": "Health workers in white protective suits outside a canvas Ebola treatment unit",
        "credit": "Wikimedia Commons"
      },
      "edition": "Afternoon Edition · 6 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "The Plague of Athens",
          "excerpt": "It first began, it is said, in the parts of Ethiopia above Egypt, and thence descended into Egypt and Libya and into most of the King’s country. Suddenly falling upon Athens, it first attacked the population in Piraeus—which was the occasion of their saying that the Peloponnesians had poisoned the reservoirs, there being as yet no wells there—and afterwards appeared in the upper city, when the deaths became much more frequent.",
          "source": "Thucydides, History of the Peloponnesian War, Book 2.48 (Crawley translation), Project Gutenberg",
          "href": "https://www.gutenberg.org/cache/epub/7142/pg7142.txt"
        },
        {
          "category": "historical",
          "title": "The Plague of Justinian",
          "excerpt": "During these times there was a pestilence, by which the whole human race came near to being annihilated. Now in the case of all other scourges sent from Heaven some explanation of a cause might be given by daring men, such as the many theories propounded by those who are clever in these matters; for they love to conjure up causes which are absolutely incomprehensible to man.",
          "source": "Procopius, History of the Wars, Book 2.22 (Dewing translation), Project Gutenberg",
          "href": "https://www.gutenberg.org/cache/epub/16764/pg16764.txt"
        },
        {
          "category": "literary",
          "title": "Apollo's Arrows Fall on the Achaean Host",
          "excerpt": "He sat himself down away from the ships with a face as dark as night, and his silver bow rang death as he shot his arrow in the midst of them. First he smote their mules and their hounds, but presently he aimed his shafts at the people themselves, and all day long the pyres of the dead were burning.",
          "source": "Homer, The Iliad, Book 1 (Samuel Butler translation), Project Gutenberg",
          "href": "https://www.gutenberg.org/cache/epub/2199/pg2199.txt"
        },
        {
          "category": "literary",
          "title": "The Plague upon Thebes",
          "excerpt": "She wasteth in the fruitless buds of earth, In parchèd herds and travail without birth Of dying women: yea, and midst of it A burning and a loathly god hath lit Sudden, and sweeps our land, this Plague of power; Till Cadmus' house grows empty, hour by hour, And Hell's house rich with steam of tears and blood.",
          "source": "Sophocles, Oedipus, King of Thebes, Prologue (Gilbert Murray translation), Project Gutenberg",
          "href": "https://www.gutenberg.org/cache/epub/27673/pg27673.txt"
        },
        {
          "category": "artistic",
          "title": "Danse macabre, Op. 40",
          "excerpt": "Camille Saint-Saëns's tone poem summons the medieval Dance of Death, in which the plague made kings and beggars equal beneath the scythe. A solo violin, tuned to a rasping tritone, portrays Death fiddling at midnight while a xylophone clatters like the bones of the risen dead whirling through the churchyard. The frenzied waltz mounts to a delirium and then dissolves at the crow of the cock, the spectres sinking back into their graves.",
          "source": "Camille Saint-Saëns, Danse macabre, Op. 40 (1874), IMSLP",
          "href": "https://imslp.org/wiki/Danse_macabre,_Op.40_(Saint-Sa%C3%ABns,_Camille)"
        },
        {
          "category": "artistic",
          "title": "The Plague at Ashdod",
          "excerpt": "Nicolas Poussin stages the biblical pestilence that fell upon the Philistines of Ashdod after they seized the Ark of the Covenant. Bodies lie sprawled across a classical piazza while the living recoil, press cloths to their faces, and bear off the stricken, and a dead infant lies beside its collapsed mother at the centre of the scene. Painted in Rome around 1630, the work distils the terror and disorder of an epidemic within a cold architectural calm.",
          "source": "Nicolas Poussin, The Plague at Ashdod (1630–1631), Musée du Louvre, Wikimedia Commons",
          "href": "https://commons.wikimedia.org/wiki/File:La_Peste_d%27Asdod_-_1630-1631_-_Nicolas_Poussin_-_Louvre_-_INV_7276_%3B_MR_2312.jpg",
          "image": {
            "src": "/covers/congo-ebola-outbreak-worsens--art.png",
            "alt": "Baroque painting of a plague-stricken city square: bodies sprawled on the pavement, mourners recoiling and covering their faces, and a dead infant beside its collapsed mother, with classical buildings behind.",
            "credit": "Nicolas Poussin, The Plague at Ashdod (1630–1631), oil on canvas, Musée du Louvre, Paris. Public domain, via Wikimedia Commons."
          }
        }
      ],
      "rank": 29
    },
    {
      "slug": "england-mexico-world-cup-azteca",
      "headline": "Ten-man England beat Mexico 3-2 at the Azteca to reach the World Cup quarterfinals",
      "overview": "England beat host nation Mexico 3-2 in a last-16 World Cup thriller at Estadio Azteca on July 5, 2026, holding on with ten men after a red card to reach the quarterfinals. It was Mexico's first-ever World Cup defeat at the storied Mexico City stadium. England survived a late Mexican fightback to advance to a quarterfinal showdown.",
      "genre": "Culture",
      "sources": [
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMiqwFBVV95cUxONDQ1TktiZTl4LVZ3cElzV0xfb2JKak9TZmpsZy1abzN5NHJSSUZWT2o1cXBxbk9iaVV6MWlXRDFPZGtFdVVmbF9GRXNFTDZtcUhoRlR3V2Vmd0QxcU1YWmhCRDRoNUVjdFgteHgtdURyQU0xRGxCSTRKanllS0hnMWhYLVZoVkRkeWxnRlJlMmpJRTRUeGtpLU5qc1pUN2tNN2ppdlZDaWVLbGM?oc=5"
        },
        {
          "name": "AP News",
          "href": "https://news.google.com/rss/search?q=England%20Mexico%20Azteca%203-2%20World%20Cup&hl=en-US&gl=US&ceid=US:en"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-06",
      "image": {
        "src": "/covers/england-mexico-world-cup-azteca.png",
        "alt": "An aerial view of the vast bowl of Estadio Azteca in Mexico City",
        "credit": "Wikimedia Commons"
      },
      "edition": "Afternoon Edition · 6 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "The impregnable citadel of Sardis is finally taken",
          "excerpt": "Then, all the rest being at a stand, a certain Mardian called Hyroeades essayed to mount by a part of the citadel where no guard had been set; for here the height on which the citadel stood was sheer and hardly to be assaulted, and none feared that it could be taken by an attack made here.",
          "source": "Herodotus, The Histories, Book 1.84 (Godley translation), Wikisource",
          "href": "https://en.wikisource.org/wiki/Herodotus_The_Persian_Wars_(Godley)/Book_I"
        },
        {
          "category": "historical",
          "title": "The outnumbered Athenians charge the Persians at Marathon",
          "excerpt": "When the Persians saw them come running they prepared to receive them, deeming the Athenians frenzied to their utter destruction, who being (as they saw) so few were yet charging them at speed, albeit they had no horsemen nor archers.",
          "source": "Herodotus, The Histories, Book 6.112 (Godley translation), Wikisource",
          "href": "https://en.wikisource.org/wiki/Herodotus_The_Persian_Wars_(Godley)/Book_VI"
        },
        {
          "category": "literary",
          "title": "The chariot race at the funeral games for Patroclus",
          "excerpt": "Their heart, their eyes, their voice, they send before;\nAnd up the champaign thunder from the shore:\nThick, where they drive, the dusty clouds arise,\nAnd the lost courser in the whirlwind flies;",
          "source": "Homer, The Iliad, Book 23 (Pope translation), Wikisource",
          "href": "https://en.wikisource.org/wiki/The_Iliad_of_Homer_(Pope)/Book_23"
        },
        {
          "category": "literary",
          "title": "Dares and Entellus trade blows in the boxing match",
          "excerpt": "A Storm of Strokes, well meant, with fury flies,\nAnd errs about their Temples, Ears, and Eyes.\nNor always errs; for oft the Gauntlet draws\nA sweeping stroke, along the crackling Jaws.",
          "source": "Virgil, The Aeneid, Book 5 (Dryden translation), Wikisource",
          "href": "https://en.wikisource.org/wiki/The_Works_of_Virgil_(Dryden)/Aeneid/Book_V"
        },
        {
          "category": "artistic",
          "title": "Tchaikovsky's 1812 Overture",
          "excerpt": "Tchaikovsky's 1812 Overture dramatizes an outnumbered nation's defence of its homeland, pitting the invading strains of 'La Marseillaise' against Russian hymns and folk themes in a swelling musical combat. The orchestra builds through struggle and near-defeat before the enemy motif is beaten back and overwhelmed by pealing bells and thundering cannon. Its triumphant final blaze evokes the roar of a partisan crowd celebrating a hard-won victory on home ground.",
          "source": "Pyotr Ilyich Tchaikovsky, 1812 Overture, Op. 49, IMSLP",
          "href": "https://imslp.org/wiki/1812_Overture,_Op.49_(Tchaikovsky,_Pyotr)"
        },
        {
          "category": "artistic",
          "title": "David's Leonidas at Thermopylae",
          "excerpt": "Jacques-Louis David's monumental canvas shows the Spartan king Leonidas and his vastly outnumbered band steeling themselves to hold the narrow pass against the Persian host. Calm and resolute at the centre, the defenders embody grit and self-sacrifice in the face of overwhelming odds. The picture has become the enduring image of a small force making a defiant last-ditch stand against an army that should, by every measure, sweep it away.",
          "source": "Jacques-Louis David, Leonidas at Thermopylae, 1814 (Louvre), Wikimedia Commons",
          "href": "https://commons.wikimedia.org/wiki/File:Jacques-Louis_David_-_Leonidas_at_Thermopylae_-_WGA6095.jpg",
          "image": {
            "src": "/covers/england-mexico-world-cup-azteca--art.png",
            "alt": "Jacques-Louis David's painting Leonidas at Thermopylae, showing the Spartan king seated amid his warriors as they prepare to defend the mountain pass.",
            "credit": "Jacques-Louis David (1748-1825), Leonidas at Thermopylae, 1814, Louvre Museum. Public domain, via Wikimedia Commons."
          }
        }
      ],
      "rank": 30
    },
    {
      "slug": "philippines-duterte-impeachment-trial",
      "headline": "Philippine Senate opens the impeachment trial of Vice President Sara Duterte",
      "overview": "The Philippine Senate convened as an impeachment court on July 6, 2026 to begin the politically charged trial of Vice President Sara Duterte over alleged misuse of public funds and other accusations she denies. The proceedings open amid a bitter feud between the Duterte and Marcos political dynasties. Days earlier, a senator allied with the Dutertes was arrested on a separate corruption charge.",
      "genre": "Politics",
      "sources": [
        {
          "name": "AP News",
          "href": "https://news.google.com/rss/search?q=Philippine%20Senate%20impeachment%20trial%20Sara%20Duterte&hl=en-US&gl=US&ceid=US:en"
        },
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/search?q=Duterte%20ally%20arrested%20plunder%20impeachment%20trial&hl=en-US&gl=US&ceid=US:en"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-06",
      "image": {
        "src": "/covers/philippines-duterte-impeachment-trial.png",
        "alt": "Philippine Vice President Sara Duterte during an interview",
        "credit": "Wikimedia Commons"
      },
      "edition": "Afternoon Edition · 6 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Burke Impeaches Warren Hastings Before the Lords",
          "excerpt": "I impeach Warren Hastings, Esquire, of high crimes and misdemeanors. I impeach him in the name of the Commons of Great Britain in Parliament assembled, whose parliamentary trust he has betrayed. I impeach him in the name of all the Commons of Great Britain, whose national character he has dishonored. I impeach him in the name of the people of India, whose laws, rights and liberties he has subverted; whose properties he has destroyed; whose country he has laid waste and desolate. I impeach him in the name and by virtue of those eternal laws of justice which he has violated. I impeach him in the name of human nature itself, which he has cruelly outraged, injured and oppressed, in both sexes, in every age, rank, situation, and condition of life.",
          "source": "Edmund Burke, Speech at the Trial of Warren Hastings, in The World's Famous Orations, Vol. 6, Wikisource",
          "href": "https://en.wikisource.org/wiki/The_World's_Famous_Orations/Volume_6/At_the_Trial_of_Warren_Hastings"
        },
        {
          "category": "historical",
          "title": "Cicero Prosecutes Verres for Plundering His Province",
          "excerpt": "That which was above all things to be desired, O judges, and which above all things was calculated to have the greatest influence towards allaying the unpopularity of your order, and putting an end to the discredit into which your judicial decisions have fallen, appears to have been thrown in your way, and given to you not by any human contrivance, but almost by the interposition of the gods, at a most important crisis of the republic. For an opinion has now become established, pernicious to us, and pernicious to the republic, which has been the common talk of every one, not only at Rome, but among foreign nations also,—that in the courts of law as they exist at present, no wealthy man, however guilty he may be, can possibly be convicted.",
          "source": "Marcus Tullius Cicero, Against Verres, First Oration, Book 1, section 1 (trans. C. D. Yonge), Perseus Digital Library",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0018:text=Ver.:actio=1:book=1:section=1"
        },
        {
          "category": "literary",
          "title": "Athena Founds the Court That Judges the House of Atreus",
          "excerpt": "Hear now my ordinance, people of Attica, as you judge the first trial for bloodshed. In the future, even as now, this court of judges will always exist for the people of Aegeus. And this Hill of Ares, the seat and camp of the Amazons, when they came with an army in resentment against Theseus, and in those days built up this new citadel with lofty towers to rival his, and sacrificed to Ares, from which this rock takes its name, the Hill of Ares: on this hill, the reverence of the citizens, and fear, its kinsman, will hold them back from doing wrong by day and night alike, so long as they themselves do not pollute the laws.",
          "source": "Aeschylus, Eumenides, lines 681–695 (trans. Herbert Weir Smyth), Perseus Digital Library",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0006:card=681"
        },
        {
          "category": "literary",
          "title": "Cardinal Wolsey's Fall from Power",
          "excerpt": "Farewell, a long farewell, to all my greatness! This is the state of man: to-day he puts forth The tender leaves of hopes; to-morrow blossoms And bears his blushing honours thick upon him; The third day comes a frost, a killing frost, And when he thinks, good easy man, full surely His greatness is a-ripening, nips his root, And then he falls, as I do. I have ventur'd, Like little wanton boys that swim on bladders, This many summers in a sea of glory; But far beyond my depth. My high-blown pride At length broke under me.",
          "source": "William Shakespeare and John Fletcher, King Henry the Eighth, Act III, Scene 2 (Cardinal Wolsey), Project Gutenberg",
          "href": "https://www.gutenberg.org/ebooks/1802"
        },
        {
          "category": "artistic",
          "title": "Mozart, La clemenza di Tito — A Ruler Betrayed and the Reckoning of Judgment",
          "excerpt": "Mozart's final opera dramatizes a conspiracy against the Roman emperor Titus: as flames engulf the Capitol, the betrayal by his closest friend Sesto is exposed and the traitor is dragged toward judgment. The urgent, striding chords of the overture and the great first-act finale — a horrified chorus crying out over the burning city — capture a court thrown into crisis by those who abused the ruler's trust. Against the grinding machinery of accusation and sentence, the score finally turns from vengeance to the fragile grandeur of clemency.",
          "source": "Wolfgang Amadeus Mozart, La clemenza di Tito, K.621 (libretto by Caterino Mazzolà after Metastasio), IMSLP",
          "href": "https://imslp.org/wiki/La_clemenza_di_Tito,_K.621_(Mozart,_Wolfgang_Amadeus)"
        },
        {
          "category": "artistic",
          "title": "Cesare Maccari, Cicero Denounces Catiline in the Roman Senate",
          "excerpt": "Maccari's fresco freezes the moment of public reckoning: Cicero rises mid-oration, arm outstretched, denouncing the conspirator Catiline before the assembled Roman Senate. The accused sits utterly alone on an empty bench, shunned, as rows of senators lean away from him in cold judgment. Marble, shadow, and a single isolating gap turn the chamber itself into an instrument of condemnation.",
          "source": "Cesare Maccari, Cicero Denounces Catiline (Cicerone denuncia Catilina), 1889, fresco, Palazzo Madama, Rome, Wikimedia Commons",
          "href": "https://commons.wikimedia.org/wiki/File:Cicero_Denounces_Catiline_in_the_Roman_Senate_by_Cesare_Maccari.png",
          "image": {
            "src": "/covers/philippines-duterte-impeachment-trial--art.png",
            "alt": "Fresco of Cicero standing to denounce Catiline, who sits isolated and shunned on a bench, before the assembled Roman Senate.",
            "credit": "Cesare Maccari, Cicero Denounces Catiline (1889); Palazzo Madama, Rome; public domain, via Wikimedia Commons"
          }
        }
      ],
      "rank": 31
    },
    {
      "slug": "sk-hynix-us-listing-ai-memory",
      "headline": "SK Hynix launches a $28 billion US share listing to capitalise on AI memory demand",
      "overview": "South Korean chipmaker SK Hynix launched a roughly $28 billion listing of American depositary receipts on the Nasdaq on July 6, 2026, one of the largest share sales on record, as it rides surging demand for AI memory. The company, the world's top supplier of the high-bandwidth memory chips used by Nvidia, plans to use the proceeds to build new fabrication plants and buy equipment. The offering is expected to rank among the biggest ever, trailing only SpaceX's recent record listing.",
      "genre": "Technology",
      "sources": [
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMiwwFBVV95cUxQOExMMERoTnlfeUtLdDFoejc3emp1SXBuQ3NHUGk4YndsTjBxamcyYnh5Qmp6ckFrNk4xTGtld1ZNT2NDOVJHZGVwODVfSENhYXA1Qkg3SjhnZnNjTmhmSjg5Y2x5MzhZbWRDU3M1VHhBV0NxdGJqYkg0ZnlUSUEybVVNRm9MN3R2VnBWRHZVN2NTbFZJZjVSVEpaV3k3ZGVGOXg1Rl9Hd0dveVlLMGRYQ0xtQWx3VkM4N3Bmc1p1MmRSMVk?oc=5"
        },
        {
          "name": "Fortune",
          "href": "https://fortune.com/2026/07/05/sk-hynix-stock-us-listing-nasdaq-ai-boom-bust-memory-chip-shortage/"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-06",
      "image": {
        "src": "/covers/sk-hynix-us-listing-ai-memory.png",
        "alt": "A green computer memory module lined with black memory chips",
        "credit": "Wikimedia Commons"
      },
      "edition": "Afternoon Edition · 6 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Gold fever seizes Monterey, 1848",
          "excerpt": "The excitement produced was intense; and many were soon busy in their hasty preparations for a departure to the mines. The family who had kept house for me caught the moving infection. Husband and wife were both packing up; the blacksmith dropped his hammer, the carpenter his plane, the mason his trowel, the farmer his sickle, the baker his loaf, and the tapster his bottle.",
          "source": "Walter Colton, The Land of Gold; or, Three Years in California, entry of Tuesday, June 20 [1848], Project Gutenberg",
          "href": "https://www.gutenberg.org/cache/epub/69727/pg69727.txt"
        },
        {
          "category": "historical",
          "title": "The Mississippi Scheme and Law's besieged door",
          "excerpt": "At least three hundred thousand applications were made for the fifty thousand new shares, and Law's house in the Rue de Quincampoix was beset from morning to night by the eager applicants.",
          "source": "Charles Mackay, Memoirs of Extraordinary Popular Delusions and the Madness of Crowds, 'The Mississippi Scheme', Project Gutenberg",
          "href": "https://www.gutenberg.org/cache/epub/24518/pg24518.txt"
        },
        {
          "category": "literary",
          "title": "Colonel Sellers' boundless speculation",
          "excerpt": "I've got the biggest scheme on earth--and I'll take you in; I'll take in every friend I've got that's ever stood by me, for there's enough for all, and to spare.",
          "source": "Mark Twain and Charles Dudley Warner, The Gilded Age: A Tale of To-day, Colonel Sellers's letter to Squire Hawkins, Project Gutenberg",
          "href": "https://www.gutenberg.org/files/3178/3178-h/3178-h.htm"
        },
        {
          "category": "literary",
          "title": "Mammon dreams of the golden mines",
          "excerpt": "Come on, sir. Now, you set your foot on shore / In Novo Orbe; here's the rich Peru: / And there within, sir, are the golden mines, / Great Solomon's Ophir! he was sailing to't, / Three years, but we have reached it in ten months.",
          "source": "Ben Jonson, The Alchemist, Act II, Scene I (Sir Epicure Mammon), Project Gutenberg",
          "href": "https://www.gutenberg.org/files/4081/4081-h/4081-h.htm"
        },
        {
          "category": "artistic",
          "title": "Puccini's Gold Rush opera: La fanciulla del West",
          "excerpt": "Puccini set his three-act opera in a California mining camp during the 1849 Gold Rush, filling the score with the restless energy of prospectors who have travelled far in search of fortune. Surging, cinematic orchestral color evokes both the miners' longing and the feverish hope of striking it rich on a raw frontier. The drama turns on a strongbox of gold and the community that guards it, a fitting mirror for any age gripped by the promise of sudden wealth.",
          "source": "Giacomo Puccini, La fanciulla del West, SC 78 (libretto by Civinini and Zangarini), IMSLP",
          "href": "https://imslp.org/wiki/La_fanciulla_del_West,_SC_78_(Puccini,_Giacomo)"
        },
        {
          "category": "artistic",
          "title": "Hogarth's 'The South Sea Scheme'",
          "excerpt": "William Hogarth's satirical engraving skewers the speculative frenzy of the 1720 South Sea Bubble, showing crowds thronging a giant merry-go-round of investment while allegorical Honesty is broken on the wheel and Fortune is dismembered. Often called the first editorial cartoon, it captures how a mania for paper riches can seize an entire society. The scene endures as a warning about euphoric investment in the promise of easy, boundless wealth.",
          "source": "William Hogarth, The South Sea Scheme (Emblematical Print on the South Sea Scheme), 1721, Wikimedia Commons",
          "href": "https://commons.wikimedia.org/wiki/File:William_Hogarth_-_The_South_Sea_Scheme.png",
          "image": {
            "src": "/covers/sk-hynix-us-listing-ai-memory--art.png",
            "alt": "Hogarth's 1721 engraving satirising the South Sea Bubble, with crowds thronging a speculative merry-go-round amid allegorical figures of ruin.",
            "credit": "William Hogarth (1697-1764), 'The South Sea Scheme' (1721), public domain, via Wikimedia Commons"
          }
        }
      ],
      "rank": 32
    },
    {
      "slug": "southwest-france-wildfire-evacuations",
      "headline": "Thousands evacuated as a wildfire spreads through southwestern France near the Spanish border",
      "overview": "Thousands of people were evacuated in southwestern France on July 6, 2026 as a large wildfire burned through the Aude and Hérault regions near the Spanish border. Around 800 firefighters battled the uncontained blaze, which had scorched hundreds of hectares amid strong winds and drought after a record June heatwave. Many of those evacuated were holidaymakers cleared from campsites in the fire's path.",
      "genre": "Climate",
      "sources": [
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMitAFBVV95cUxPbjVhdnhIVGhSckpLUUtKbmFzQ0tOLVNBMVBkLXdpQ1JzbmZCbENGVHZZV1N6ZWpRaE1ZbVlab2U0aFplc3NQdU1paVJYd1RNcVZnU0hXeE0yTFpaSllzbXEyU2EwODJmQ3AyZ1RGNXk2RnVvWHF4MElXTWk1V25yMEItYjcyT2NiT0p5eTc3bzZPWDRiM2plLUFIS2RjRk9wQUVtSFktakxmamhNaGpNV1BJWHE?oc=5"
        },
        {
          "name": "The Connexion",
          "href": "https://www.connexionfrance.com/news/thousands-more-evacuated-as-wildfires-spread-across-southern-france/800278"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-06",
      "image": {
        "src": "/covers/southwest-france-wildfire-evacuations.png",
        "alt": "A wall of flames sweeps through dry brush and trees as a wildfire advances",
        "credit": "The Connexion"
      },
      "edition": "Afternoon Edition · 6 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "The Great Fire of Rome under Nero (AD 64)",
          "excerpt": "The blaze in its fury ran first through the level portions of the city, then rising to the hills, while it again devastated every place below them, it outstripped all preventive measures; so rapid was the mischief and so completely at its mercy the city, with those narrow winding passages and irregular streets, which characterised old Rome.",
          "source": "Tacitus, Annals, Book 15.38 (trans. Church & Brodribb), Wikisource",
          "href": "https://en.wikisource.org/wiki/The_Annals_(Tacitus)/Book_15"
        },
        {
          "category": "historical",
          "title": "The Great Fire of London in Pepys's Diary (2 September 1666)",
          "excerpt": "Everybody endeavouring to remove their goods, and flinging into the river or bringing them into lighters that lay off; poor people staying in their houses as long as till the very fire touched them, and then running into boats, or clambering from one pair of stairs by the water-side to another.",
          "source": "Samuel Pepys, Diary of Samuel Pepys, 2 September 1666, Wikisource",
          "href": "https://en.wikisource.org/wiki/Diary_of_Samuel_Pepys/1666/September"
        },
        {
          "category": "literary",
          "title": "Homer's forest-fire simile in the Iliad",
          "excerpt": "Even as a consuming fire maketh a boundless forest to blaze on the peaks of a mountain, and from afar is the glare thereof to be seen, even so from their innumerable bronze, as they marched forth, went the dazzling gleam up through the sky unto the heavens.",
          "source": "Homer, Iliad, Book 2.455-458 (trans. A. T. Murray), Perseus Digital Library",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0134:book=2:card=455"
        },
        {
          "category": "literary",
          "title": "Ovid's Phaethon sets the earth ablaze in the Metamorphoses",
          "excerpt": "Great cities perish with their walls, and peopled nations are consumed to dust— the forests and the mountains are destroyed.",
          "source": "Ovid, Metamorphoses, Book 2 (Phaethon; trans. Brookes More), Perseus Digital Library",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0028:book=2:card=210"
        },
        {
          "category": "artistic",
          "title": "Falla's Ritual Fire Dance from El amor brujo",
          "excerpt": "In the 'Danza ritual del fuego' Manuel de Falla conjures a wildfire in sound: shivering, tremolo strings and a snarling low woodwind theme flicker upward like the first tongues of flame. Driving Andalusian rhythms and stabbing orchestral accents build into a roaring, whirling blaze that seems to leap and consume everything in its path. The music captures both the primal dread of fire and the frenzied dance of trying to master it.",
          "source": "Manuel de Falla, El amor brujo (Danza ritual del fuego / Ritual Fire Dance), IMSLP",
          "href": "https://imslp.org/wiki/El_amor_brujo_(Falla,_Manuel_de)"
        },
        {
          "category": "artistic",
          "title": "Turner's The Burning of the Houses of Lords and Commons",
          "excerpt": "J. M. W. Turner witnessed the 1834 fire that destroyed the Palace of Westminster and painted its terrifying grandeur, a wall of white-gold flame erupting into the night sky and staining the Thames blood-orange. Crowds throng the bridge and riverbank as helpless spectators, dwarfed by a conflagration that dissolves solid stone into light and smoke. The canvas distills the ancient dread of an unstoppable inferno consuming everything before it.",
          "source": "J. M. W. Turner, The Burning of the Houses of Lords and Commons, 16 October 1834 (Philadelphia Museum of Art), Wikimedia Commons",
          "href": "https://commons.wikimedia.org/wiki/File:Joseph_Mallord_William_Turner,_English_-_The_Burning_of_the_Houses_of_Lords_and_Commons,_October_16,_1834_-_Google_Art_Project.jpg",
          "image": {
            "src": "/covers/southwest-france-wildfire-evacuations--art.png",
            "alt": "Oil painting of the Houses of Parliament engulfed in towering white-gold flames at night, the fire reflected across the Thames as crowds watch from Westminster Bridge.",
            "credit": "J. M. W. Turner, The Burning of the Houses of Lords and Commons, 16 October 1834 (Philadelphia Museum of Art; Google Art Project), public domain via Wikimedia Commons"
          }
        }
      ],
      "rank": 33
    },
    {
      "slug": "un-guterres-ai-governance-children",
      "headline": "UN chief Guterres warns AI is outpacing oversight and urges global rules to protect children",
      "overview": "UN Secretary-General António Guterres warned on July 6, 2026 that artificial intelligence is advancing faster than governments can regulate it, opening the inaugural UN Global Dialogue on AI Governance in Geneva. He called on nations to adopt an 'AI Child Safety Pledge,' demanding that no AI system reach children without child-specific safety testing and independent oversight. A UN scientific panel accompanying the meeting cautioned that unchecked AI could cause catastrophic harm.",
      "genre": "Technology",
      "sources": [
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMirAFBVV95cUxPcjZKby1qbWJLdDhkOG0zdUhZSzZoR3Q3a2tpU3J1RTJVMXZudXJWenpVTjU5UWZVcDZLX0RlYjFTZnY5M2RMNWlWRXQ1TkJqQnV5d2tlMHlpVkYzRmdtbUF6X05ObDdfYnR2Y1ptNEthZ1AyQzlCMmI1a1NoUlBPcnJ3elUzNkViWXItX0ZFWTZKTGY1ZWlpbkxKeE5uellvMEVSOEJwS0tHOG5i?oc=5"
        },
        {
          "name": "UN News",
          "href": "https://news.un.org/en/story/2026/07/1167873"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-06",
      "image": {
        "src": "/covers/un-guterres-ai-governance-children.png",
        "alt": "UN Secretary-General António Guterres speaking at a podium",
        "credit": "Wikimedia Commons"
      },
      "edition": "Afternoon Edition · 6 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Prometheus steals fire for mankind",
          "excerpt": "He hid fire; but that the noble son of Iapetus stole again for men from Zeus the counsellor in a hollow fennel-stalk, so that Zeus who delights in thunder did not see it.",
          "source": "Hesiod, Works and Days, ll. 50–52 (trans. Hugh G. Evelyn-White), Project Gutenberg",
          "href": "https://www.gutenberg.org/files/348/348-h/348-h.htm"
        },
        {
          "category": "historical",
          "title": "Daedalus warns Icarus of the middle way",
          "excerpt": "Icarus, I recommend thee to keep the middle tract; lest, if thou shouldst go too low, the water should clog thy wings; if too high, the fire of the sun should scorch them.",
          "source": "Ovid, Metamorphoses, Book VIII, Fable III (trans. Henry T. Riley), Project Gutenberg",
          "href": "https://www.gutenberg.org/files/26073/26073-h/26073-h.htm"
        },
        {
          "category": "literary",
          "title": "Frankenstein's creature draws its first breath",
          "excerpt": "It was on a dreary night of November that I beheld the accomplishment of my toils. With an anxiety that almost amounted to agony, I collected the instruments of life around me, that I might infuse a spark of being into the lifeless thing that lay at my feet. It was already one in the morning; the rain pattered dismally against the panes, and my candle was nearly burnt out, when, by the glimmer of the half-extinguished light, I saw the dull yellow eye of the creature open; it breathed hard, and a convulsive motion agitated its limbs.",
          "source": "Mary Shelley, Frankenstein, Chapter V, Project Gutenberg",
          "href": "https://www.gutenberg.org/files/84/84-h/84-h.htm"
        },
        {
          "category": "literary",
          "title": "The sorcerer's apprentice cannot dismiss the spirits",
          "excerpt": "Ach da kommt der Meister!\nHerr, die Noth ist groß!\nDie ich rief, die Geister,\nWerd' ich nun nicht los.",
          "source": "Johann Wolfgang von Goethe, Der Zauberlehrling (1827), Wikisource",
          "href": "https://de.wikisource.org/wiki/Der_Zauberlehrling_(1827)"
        },
        {
          "category": "artistic",
          "title": "Dukas, L'apprenti sorcier",
          "excerpt": "Dukas's 1897 symphonic scherzo sets Goethe's ballad to music: a bewitched broom, animated by an apprentice who has overreached his master's magic, multiplies unstoppably as skittering bassoons and swelling brass depict a flood he can no longer control. The orchestra surges toward chaos until the returning master breaks the spell. It is a vivid parable in sound of a power that is summoned but cannot be commanded.",
          "source": "Paul Dukas, L'apprenti sorcier (1897), IMSLP",
          "href": "https://imslp.org/wiki/L'apprenti_sorcier_(Dukas,_Paul)"
        },
        {
          "category": "artistic",
          "title": "The maker flees his living creation",
          "excerpt": "Theodor von Holst's steel engraving, the frontispiece to the 1831 edition of Frankenstein, shows the newly animated creature stirring to life as its horrified maker recoils and flees the laboratory. The image fixes the story's central warning: knowledge pursued without wisdom yields a creation its creator can neither govern nor unmake. It became the earliest and most enduring visual emblem of the myth.",
          "source": "Theodor von Holst, Frontispiece to Frankenstein (1831), Wikimedia Commons",
          "href": "https://commons.wikimedia.org/wiki/File:Frontispiece_to_Frankenstein_1831.jpg",
          "image": {
            "src": "/covers/un-guterres-ai-governance-children--art.png",
            "alt": "Steel engraving of Victor Frankenstein recoiling in horror as his newly animated creature stirs to life amid a cluttered laboratory.",
            "credit": "Theodor von Holst (1810–1844), engraving for the 1831 edition of Frankenstein; scan via Wikimedia Commons, public domain."
          }
        }
      ],
      "rank": 34
    },
    {
      "slug": "neymar-retires-brazil-national-team",
      "headline": "Neymar says he is done playing for Brazil after the team's earliest World Cup exit since 1990",
      "overview": "Neymar, Brazil's all-time leading scorer, said he is finished playing for the national team after Brazil were knocked out of the World Cup in the round of 16 by Norway on July 5, 2026. The defeat, sealed by two Erling Haaland goals, marked Brazil's earliest World Cup exit since 1990. Neymar signalled the emotional farewell in comments after the match.",
      "genre": "Culture",
      "sources": [
        {
          "name": "AP News",
          "href": "https://news.google.com/rss/articles/CBMimwFBVV95cUxPTGZsUWF4RHNSUmlfNEgtTURjWlhGQzl2ZVB2ME5oMUc4aUxvMEhJWG5mT1FtRlNwamNtNUg4Z3JmSDZvblprTDU0R0lKSkNDOHZRWll6NF9sQmlyMF8wdXQ4dy1DS2NLeHV1YWlyQWk0SFd0bC1GQTY3OThXamlwWFA4MmRBandjOVhCRFdZLUc4UXpjXzZGMDR1QQ?oc=5"
        },
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMitAFBVV95cUxQZG02RHBVdXM3YTdMN0U0Z2dYdXd1Sm4zd01qbGotQmFoUnpWMnYzNmhnTml1T1pwM2NlMTctZGlpdVlEX1RQOVQ4ZXNWOE94NWtsWVJodWswQ2Z1elpka05rS09RMEdSYXhYMnNwWmpaNEV2RGtPYWRMOTlkM3JnTFFIT2RDcmVmUnU4N1IzSFdVd20ya1FlZVcxNWlPamlHTUVoenhUZFR2bWlMLXhOMTB4QU8?oc=5"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-06",
      "image": {
        "src": "/covers/neymar-retires-brazil-national-team.png",
        "alt": "The forward Neymar in a yellow Brazil jersey during an international match",
        "credit": "Wikimedia Commons"
      },
      "edition": "Afternoon Edition · 6 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Scipio Africanus, victor over Hannibal, retires to Liternum from an ungrateful country",
          "excerpt": "He passed his life at Liternum without any wish to return to the City ... it is said that on his death-bed he gave orders that he should be buried and his monument set up there, so that there might be no funeral rites performed for him by his ungrateful country.",
          "source": "Livy, History of Rome, Book 38.53 (Roberts translation), Perseus Digital Library",
          "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0144:book%3D38:chapter%3D53"
        },
        {
          "category": "historical",
          "title": "The death of Hannibal in exile, the great warrior bowing off the stage",
          "excerpt": "\"Let us,\" he said, \"relieve the Romans from the anxiety they have so long experienced, since they think it tries their patience too much to wait for an old man's death.\" ... he drained the cup. Such was the close of Hannibal's life.",
          "source": "Livy, History of Rome, Book 39.51 (Roberts translation), Perseus Digital Library",
          "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0144:book%3D39:chapter%3D51"
        },
        {
          "category": "literary",
          "title": "Hector resolves to fall doing some great deed",
          "excerpt": "My doom has come upon me; let me not then die ingloriously and without a struggle, but let me first do some great thing that shall be told among men hereafter.",
          "source": "Homer, The Iliad, Book 22 (Butler translation), Perseus Digital Library",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0217:book%3D22"
        },
        {
          "category": "literary",
          "title": "Othello bids farewell to the soldier's life",
          "excerpt": "O, now, for ever / Farewell the tranquil mind! Farewell content! / Farewell the plumed troops and the big wars / That make ambition virtue! ... Othello's occupation's gone!",
          "source": "William Shakespeare, Othello, Act 3, Scene 3, Project Gutenberg",
          "href": "https://www.gutenberg.org/cache/epub/1531/pg1531.txt"
        },
        {
          "category": "artistic",
          "title": "The funeral march for a fallen hero (Beethoven's Eroica)",
          "excerpt": "Beethoven's Third Symphony, the 'Eroica,' turns at its second movement into a vast Marcia funebre, a funeral march for a fallen hero. Over a trudging bass the strings intone a grief-laden dirge that swells to a blazing climax before collapsing into broken, halting fragments, as if the music itself can no longer go on. It is the sound of greatness laid to rest, glory sinking into mourning.",
          "source": "Ludwig van Beethoven, Symphony No. 3 in E-flat major, Op. 55 'Eroica,' II. Marcia funebre, IMSLP",
          "href": "https://imslp.org/wiki/Symphony_No.3,_Op.55_(Beethoven,_Ludwig_van)"
        },
        {
          "category": "artistic",
          "title": "The Fighting Temeraire towed to the breaker's yard",
          "excerpt": "Turner shows the once-mighty warship Temeraire, a hero of Trafalgar, ghost-pale and tall-masted, being towed by a squat black steam tug toward the breaker's yard. A blazing sunset floods the sky, at once a glorious farewell salute and the melancholy close of the age of sail. The great veteran, stripped of her guns and her glory, is led quietly off the stage of history.",
          "source": "J. M. W. Turner, The Fighting Temeraire, 1839 (National Gallery, London), Wikimedia Commons",
          "href": "https://commons.wikimedia.org/wiki/File:The_Fighting_Temeraire,_JMW_Turner,_National_Gallery.jpg",
          "image": {
            "src": "/covers/neymar-retires-brazil-national-team--art.png",
            "alt": "Turner's painting of the pale warship Temeraire towed by a dark steam tug across the Thames beneath a fiery sunset",
            "credit": "J. M. W. Turner (1775-1851), The Fighting Temeraire (1839), National Gallery, London; public domain, via Wikimedia Commons"
          }
        }
      ],
      "rank": 35
    },
    {
      "slug": "memphis-national-guard-shooting",
      "headline": "National Guard troops on patrol in Memphis fatally shoot an armed man during a downtown pursuit",
      "overview": "Two Tennessee National Guard members assigned to a federal crime-fighting patrol in Memphis fatally shot a man during a downtown foot pursuit early on July 5, 2026, police said. Authorities identified the man as 20-year-old Tyrin Johnson and said the soldiers opened fire after he turned toward them with a gun while they responded to reports of gunshots. The state bureau of investigation is reviewing the shooting, which drew fresh scrutiny of the Guard deployment ordered by President Trump.",
      "genre": "Conflict",
      "sources": [
        {
          "name": "AP News",
          "href": "https://news.google.com/rss/articles/CBMiowFBVV95cUxQUDBkWnRWWDB2MlY5S0RjU1lvc0FoYjQwaE1kTEFvOFFUQ0hVWnhHTmNYOVVxYlJYeFlxZndtTnZjYWphUTV2SWo5emxOcHk1UWxhSnRtTVpIei1sR3NzVXJlWnNxQ09NSXpCczJiNXBqOUVIR1JtNFEtbGpncnhTUkt0VVBNTjZSX01HN2VrZDBVYUVPNGN2bW5QTXYtSnBCYzU4?oc=5"
        },
        {
          "name": "CNN",
          "href": "https://www.cnn.com/2026/07/05/us/memphis-national-guard-shooting-death-hnk"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-06",
      "image": {
        "src": "/covers/memphis-national-guard-shooting.png",
        "alt": "A deserted downtown street at night under the cold glare of streetlights",
        "credit": "AI-generated"
      },
      "edition": "Afternoon Edition · 6 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "A Grievance Against Standing Armies (Declaration of Independence, 1776)",
          "excerpt": "He has kept among us, in times of peace, Standing Armies without the Consent of our legislatures. He has affected to render the Military independent of and superior to Civil power.",
          "source": "Thomas Jefferson et al., United States Declaration of Independence (engrossed copy), Wikisource",
          "href": "https://en.wikisource.org/wiki/United_States_Declaration_of_Independence_(engrossed_copy)"
        },
        {
          "category": "historical",
          "title": "Soldiers Loosed Upon the City (Tacitus, Histories 1.85)",
          "excerpt": "the soldiers, though they made no concerted disturbance, had dispersed themselves in disguise about private houses, and exercised a malignant surveillance over all whom exalted rank, or distinction of any kind, exposed to injurious reports.",
          "source": "Tacitus, The Histories, Book 1.85 (Church and Brodribb translation), Perseus Digital Library",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.02.0080%3Abook%3D1%3Achapter%3D85"
        },
        {
          "category": "literary",
          "title": "The Bayonets of Peterloo (Shelley, The Masque of Anarchy)",
          "excerpt": "Let the fixèd bayonet / Gleam with sharp desire to wet / Its bright point in English blood / Looking keen as one for food.",
          "source": "Percy Bysshe Shelley, The Masque of Anarchy (written on the Peterloo Massacre, 1819), Wikisource",
          "href": "https://en.wikisource.org/wiki/The_Masque_of_Anarchy"
        },
        {
          "category": "literary",
          "title": "The Soldier's Sigh on the City Walls (Blake, 'London')",
          "excerpt": "How the chimney-sweeper's cry / Every blackening church appals, / And the hapless soldier's sigh / Runs in blood down palace-walls.",
          "source": "William Blake, 'London' (Songs of Experience), Project Gutenberg",
          "href": "https://www.gutenberg.org/cache/epub/1934/pg1934.txt"
        },
        {
          "category": "artistic",
          "title": "Beethoven's Egmont: Music of Occupation and Liberty",
          "excerpt": "Beethoven's overture opens with the heavy, grinding tread of the Duke of Alba's occupying Spanish forces, a sombre sarabande rhythm that presses down on a subject city like boots in the street. Against that oppression a pleading, human voice rises in the strings and woodwinds, straining toward freedom until the music is cut short by a hushed, sudden silence marking the hero's execution. Then a blazing victory fanfare erupts, transforming martial force into a cry of liberation and civic defiance.",
          "source": "Ludwig van Beethoven, Egmont, Op. 84 (Overture), IMSLP",
          "href": "https://imslp.org/wiki/Egmont,_Op.84_(Beethoven,_Ludwig_van)"
        },
        {
          "category": "artistic",
          "title": "Goya, The Third of May 1808",
          "excerpt": "Goya paints the moment troops turn their guns on the people of an occupied city: a rank of faceless soldiers, rifles raised in mechanical unison, fire point-blank at unarmed civilians in the dark. At the center a man in a white shirt throws his arms wide in terror and defiance before the muzzles, while the bloodied dead already heap at his feet. It is the definitive image of martial power loosed in the streets and the fragile human body set against it.",
          "source": "Francisco de Goya, The Third of May 1808 (1814), Wikimedia Commons",
          "href": "https://commons.wikimedia.org/wiki/File:El_Tres_de_Mayo,_by_Francisco_de_Goya,_from_Prado_thin_black_margin.jpg",
          "image": {
            "src": "/covers/memphis-national-guard-shooting--art.png",
            "alt": "A firing squad of faceless soldiers levels rifles at close range on a group of terrified civilians at night; a man in a white shirt flings his arms wide before the guns as the bloodied dead lie at his feet.",
            "credit": "Francisco de Goya, The Third of May 1808 (1814), Museo del Prado, Madrid; public domain via Wikimedia Commons."
          }
        }
      ],
      "rank": 36
    },
    {
      "slug": "australia-fiji-defence-pact",
      "headline": "Australia and Fiji sign a mutual defence pact aimed at countering China in the Pacific",
      "overview": "Australia and Fiji signed a new mutual defence treaty on July 6, 2026, deepening security ties as Canberra seeks to counter China's growing influence across the Pacific. The pact commits the two nations to closer military cooperation and comes amid heightened regional anxiety over Beijing's expanding reach. It was announced the same day China test-fired a missile into the South Pacific.",
      "genre": "Politics",
      "sources": [
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/search?q=Australia%20signs%20defence%20alliance%20Fiji%20counter%20China&hl=en-US&gl=US&ceid=US:en"
        },
        {
          "name": "AP News",
          "href": "https://news.google.com/rss/search?q=Australia%20Fiji%20mutual%20defense%20pact%20Pacific%20China&hl=en-US&gl=US&ceid=US:en"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-06",
      "image": {
        "src": "/covers/australia-fiji-defence-pact.png",
        "alt": "Two clasped hands over a map of the Pacific at dusk, symbolising a new alliance",
        "credit": "AI-generated"
      },
      "edition": "Afternoon Edition · 6 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "The Delian League: allies bound against the Persian king",
          "excerpt": "The Athenians having thus succeeded to the supremacy by the voluntary act of the allies through their hatred of Pausanias, fixed which cities were to contribute money against the barbarian, which ships; their professed object being to retaliate for their sufferings by ravaging the king's country. Now was the time that the office of 'Treasurers for Hellas' was first instituted by the Athenians. These officers received the tribute, as the money contributed was called. The tribute was first fixed at four hundred and sixty talents. The common treasury was at Delos, and the congresses were held in the temple.",
          "source": "Thucydides, History of the Peloponnesian War, Book 1.96 (Crawley translation), Perseus Digital Library",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0200:book=1:chapter=96"
        },
        {
          "category": "historical",
          "title": "The Federal Charter of 1291: three valleys sworn to mutual defence",
          "excerpt": "know all men, that the people of the valley of Uri, the democracy of the valley of Schwiz, and the community of the mountaineers of the Lower Valley ... seeing the malice of the age, in order that they may better defend themselves and their own, and better preserve them in proper condition, have promised in good faith to assist each other with aid, with every counsel and every favor, with person and goods, within the valleys and without, with might and main, against one and all, who may inflict upon any one of them any violence, molestation or injury, or may plot any evil against their persons or goods. And in every case each community has promised to succour the other when necessary, at its own expense, as far as needed in order to withstand the attacks of evil-doers, and to avenge injuries.",
          "source": "The Federal Charter of 1291, in W. D. McCrackan, The Rise of the Swiss Republic, Book 2, Chapter 5, Wikisource",
          "href": "https://en.wikisource.org/wiki/The_Rise_of_the_Swiss_Republic/Book_2/Chapter_5"
        },
        {
          "category": "literary",
          "title": "The Ruetli Oath in Schiller's William Tell",
          "excerpt": "Swear we the oath of our confederacy! A band of brothers true we swear to be, Never to part in danger or in death! ... We swear we will be free as were our sires, And sooner die than live in slavery!",
          "source": "Friedrich Schiller, Wilhelm Tell, Act II (trans. Sir Theodore Martin), Project Gutenberg",
          "href": "https://www.gutenberg.org/cache/epub/2782/pg2782.txt"
        },
        {
          "category": "literary",
          "title": "'All for one, one for all' - the Musketeers' oath",
          "excerpt": "'All for one, one for all-that is our motto, is it not?' ... 'Hold out your hand and swear!' cried Athos and Aramis at once. Overcome by example, grumbling to himself, nevertheless, Porthos stretched out his hand, and the four friends repeated with one voice the formula dictated by D'Artagnan.",
          "source": "Alexandre Dumas, The Three Musketeers (English translation), Project Gutenberg",
          "href": "https://www.gutenberg.org/cache/epub/1257/pg1257.txt"
        },
        {
          "category": "artistic",
          "title": "Rossini's Guillaume Tell: an opera of confederate revolt",
          "excerpt": "Rossini's final opera dramatises the legendary Swiss uprising against Habsburg tyranny, culminating in the cantons' vow to stand together for their freedom. Its celebrated overture builds from a hushed dawn through a pastoral calm to a galloping call to arms, mirroring scattered communities gathering into a single armed cause. The grand choral tableaux of oath and confederation make the score a musical monument to small peoples binding themselves in common defence against a dominant power.",
          "source": "Gioachino Rossini, Guillaume Tell (1829), IMSLP (Petrucci Music Library)",
          "href": "https://imslp.org/wiki/Guillaume_Tell_(Rossini,_Gioachino)"
        },
        {
          "category": "artistic",
          "title": "Jacques-Louis David, The Oath of the Horatii",
          "excerpt": "David's 1784 canvas shows three brothers stretching their arms toward their father, who raises their swords aloft, as they swear to defend Rome even unto death. The rigid, unified gesture of the oath - three bodies fused to a single common cause - became the era's defining image of solidarity pledged against an external foe. Its austere grandeur transforms a private vow into a public compact of collective duty.",
          "source": "Jacques-Louis David, Le Serment des Horaces (The Oath of the Horatii), 1784, Musee du Louvre - Wikimedia Commons",
          "href": "https://commons.wikimedia.org/wiki/File:David-Oath_of_the_Horatii-1784.jpg",
          "image": {
            "src": "/covers/australia-fiji-defence-pact--art.png",
            "alt": "Three Roman brothers raise their arms in a unified salute toward their father, who holds three swords aloft, as they swear a common oath.",
            "credit": "Jacques-Louis David, The Oath of the Horatii (1784), Musee du Louvre. Public domain, via Wikimedia Commons."
          }
        }
      ],
      "rank": 37
    },
    {
      "slug": "atlas-robot-world-cup-ball",
      "headline": "Hyundai's Atlas humanoid robot delivers the match ball at a World Cup game",
      "overview": "Boston Dynamics' Atlas humanoid robot, owned by Hyundai, delivered the match ball before the World Cup round-of-16 match between Brazil and Norway at a New Jersey stadium on July 5, 2026. Emerging from the players' tunnel before a crowd of about 80,000, the robot handed over the ball and mimicked several players' goal celebrations. Hyundai, the tournament's official robotics partner, billed it as the first live robotics activation at a World Cup.",
      "genre": "Technology",
      "sources": [
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMiogFBVV95cUxQSVMyeHgtTGpoYnN3R1NlSldlTkxBRDF6V3FXZm1lMExZWWRIcm8yb1lRLXNTRDRFZ2pHM1p6V1BEUW1BdUg2TlA2OFJsSk4ta3R2cVpyd2FYRkZkSlBNQ2xFNzhJWFd1YW1aV2wxZ0o3S25VS2tSTnZkZ3Vjdnd1TmtNNGo0aHJoVk5veXBBVU1RdkxPY080M0Y1Y2hVa0tVNXc?oc=5"
        },
        {
          "name": "Fortune",
          "href": "https://fortune.com/2026/07/05/humanoid-robot-delivered-game-ball-brazil-norway-world-cup-match-fifa-boston-dynamics-hyundai/"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-06",
      "image": {
        "src": "/covers/atlas-robot-world-cup-ball.png",
        "alt": "A white humanoid robot balances a soccer ball on its hand at the mouth of a stadium tunnel",
        "credit": "Fortune"
      },
      "edition": "Afternoon Edition · 6 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Homer's golden handmaidens, automata that walk and think",
          "excerpt": "but there moved swiftly to support their lord handmaidens wrought of gold in the semblance of living maids. In them is understanding in their hearts, and in them speech and strength, and they know cunning handiwork by gift of the immortal gods.",
          "source": "Homer, Iliad, Book 18 (trans. A. T. Murray), Perseus Digital Library",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0134:book=18:card=388"
        },
        {
          "category": "historical",
          "title": "Talos, the bronze giant who strode round Crete",
          "excerpt": "And Talos, the man of bronze, as he broke off rocks from the hard cliff, stayed them from fastening hawsers to the shore, when they came to the roadstead of Dicte's haven. He was of the stock of bronze, of the men sprung from ash-trees, the last left among the sons of the gods; and the son of Cronos gave him to Europa to be the warder of Crete and to stride round the island thrice a day with his feet of bronze.",
          "source": "Apollonius Rhodius, Argonautica, Book 4 (trans. R. C. Seaton), Project Gutenberg",
          "href": "https://www.gutenberg.org/files/830/830-h/830-h.htm"
        },
        {
          "category": "literary",
          "title": "Ovid's Pygmalion: ivory quickened into flesh",
          "excerpt": "He felt it verrye flesh in deede. By laying on his thumb, He felt her pulses beating. Then he stood no longer dumb But thanked Venus with his hart, and at the length he layd His mouth to hers who was as then become a perfect mayd. Shee felt the kisse, and blusht therat: and lifting fearefully Hir eyelidds up, hir Lover and the light at once did spye.",
          "source": "Ovid, Metamorphoses, Book 10 (trans. Arthur Golding, 1567), Perseus Digital Library",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0074:book=10:card=243"
        },
        {
          "category": "literary",
          "title": "Hoffmann's Olympia, the automaton revealed as a lifeless doll",
          "excerpt": "Nathaniel stood paralysed; he had seen but too plainly that Olympia's waxen, deadly pale countenance had no eyes, but black holes instead—she was, indeed, a lifeless doll.",
          "source": "E. T. A. Hoffmann, The Sandman (trans. John Oxenford), in Tales from the German, Project Gutenberg",
          "href": "https://www.gutenberg.org/files/32046/32046-h/32046-h.htm"
        },
        {
          "category": "artistic",
          "title": "Delibes's Coppélia, the mechanical dancing doll",
          "excerpt": "Léo Delibes's 1870 ballet Coppélia turns on Dr. Coppélius and his life-sized mechanical dancing doll, so convincingly human that young Franz is smitten with her at her window. The score gives the automaton her own stiff, wind-up music, and the doll appears to come to life and dance before the ruse is exposed. It remains the nineteenth century's most beloved staging of the uncanny living machine as public spectacle.",
          "source": "Léo Delibes, Coppélia (ballet, 1870), IMSLP / Petrucci Music Library",
          "href": "https://imslp.org/wiki/Copp%C3%A9lia_(Delibes,_L%C3%A9o)"
        },
        {
          "category": "artistic",
          "title": "Gérôme's Pygmalion and Galatea",
          "excerpt": "Jean-Léon Gérôme's Pygmalion and Galatea depicts the very instant the sculptor's ivory statue turns to warm flesh: her upper body flushes with life and bends to return his kiss while her feet are still cold, pale stone. The painting freezes the threshold between made object and living being, with wonder and disbelief on the sculptor's upturned face. It is the archetypal image of a human-crafted figure quickening into a moving, embracing body.",
          "source": "Jean-Léon Gérôme, Pygmalion and Galatea (ca. 1890), Wikimedia Commons",
          "href": "https://commons.wikimedia.org/wiki/File:Jean-L%C3%A9on_G%C3%A9r%C3%B4me,_Pygmalion_and_Galatea,_ca._1890.jpg",
          "image": {
            "src": "/covers/atlas-robot-world-cup-ball--art.png",
            "alt": "Painting of the sculptor Pygmalion embracing his ivory statue Galatea as her body turns from white stone into living flesh.",
            "credit": "Jean-Léon Gérôme, Pygmalion and Galatea, ca. 1890, oil on canvas, The Metropolitan Museum of Art (Gift of Louis C. Raegner, 1927); public domain via Wikimedia Commons."
          }
        }
      ],
      "rank": 38
    },
    {
      "slug": "bob-design-surrey-street-market",
      "headline": "Bob Design and Croydon art students give London's 750-year-old Surrey Street Market a new identity",
      "overview": "The graphic-design studio Bob Design worked with students from Croydon School of Art to create a new visual identity for Surrey Street Market in Croydon, one of London's oldest markets with roughly 750 years of history. The refresh centres on quirky collaged pictograms, a bespoke typeface, wayfinding and street furniture meant to celebrate the market's heritage and traders. The project was profiled by It's Nice That on July 6, 2026.",
      "genre": "Culture",
      "sources": [
        {
          "name": "It's Nice That",
          "href": "https://www.itsnicethat.com/articles/bob-design-croydon-school-of-art-surrey-market-graphic-design-architecture-project-060726"
        },
        {
          "name": "Croydon Council Newsroom",
          "href": "https://news.croydon.gov.uk/community-creates-new-vision-for-historic-surrey-street/"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-06",
      "image": {
        "src": "/covers/bob-design-surrey-street-market.png",
        "alt": "Bold white pictograms of market-goers pasted across the shutters of Surrey Street Market",
        "credit": "It's Nice That"
      },
      "edition": "Afternoon Edition · 6 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "The Roman forum as a map of buyers and sellers",
          "excerpt": "He who desires to meet with a perjured fellow, let him go into the courts of law; he who wants a liar and a braggart, near the rites of Cloacina. The rich and erring husbands seek you at the magisterial halls of the Basilica.",
          "source": "Plautus, Curculio (The Forgery), Act 4, Scene 1 (Henry Thomas Riley translation), Perseus Digital Library",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0099:act%3D4:scene%3D1"
        },
        {
          "category": "historical",
          "title": "The clamour of a London street-market on a Saturday night",
          "excerpt": "The tumult of the thousand different cries of the eager dealers, all shouting at the top of their voices, at one and the same time, is almost bewildering. 'So-old again,' roars one. 'Chestnuts all 'ot, a penny a score,' bawls another.",
          "source": "Henry Mayhew, London Labour and the London Poor, Vol. 1, 'Of the London Street-Markets on a Saturday Night', Project Gutenberg",
          "href": "https://www.gutenberg.org/files/55998/55998-h/55998-h.htm"
        },
        {
          "category": "literary",
          "title": "Chaucer's guildsmen, tradesmen of the town",
          "excerpt": "An HABERDASSHERE and a CARPENTER, / A WEBBE, a DYERE, and a TAPYCER,– / And they were clothed alle in o lyveree / Of a solempne and a greet fraternitee. / Ful fressh and newe hir geere apiked was; / Hir knyves were chaped noght with bras, / But al with silver; wroght ful clene and weel, / Hire girdles and hir pouches everydeel. / Wel semed ech of hem a fair burgeys / To sitten in a yeldehalle on a deys.",
          "source": "Geoffrey Chaucer, The Canterbury Tales, The General Prologue (Middle English), Wikisource",
          "href": "https://en.wikisource.org/wiki/The_Canterbury_Tales_(unsourced)/General_Prologue"
        },
        {
          "category": "literary",
          "title": "Covent Garden market waking with the city",
          "excerpt": "Covent-garden market, and the avenues leading to it, are thronged with carts of all sorts, sizes, and descriptions, from the heavy lumbering waggon, with its four stout horses, to the jingling coster-monger's cart with its consumptive donkey. The pavement is already strewed with decayed cabbage-leaves, broken hay-bands, and all the indescribable litter of a vegetable market, and the numerous noises are almost as multifarious—men shouting, carts backing, horses neighing, boys fighting, basket-women talking, piemen expatiating on the excellence of their pastry, donkeys braying, and a hundred other sounds.",
          "source": "Charles Dickens, Sketches by Boz, 'The Streets—Morning', Wikisource",
          "href": "https://en.wikisource.org/wiki/Sketches_by_Boz/The_streets_-_morning"
        },
        {
          "category": "artistic",
          "title": "Stravinsky's Shrovetide Fair, a marketplace made of sound",
          "excerpt": "Stravinsky opens his ballet with 'The Shrovetide Fair,' a teeming St. Petersburg marketplace rendered entirely in sound. Barrel-organ tunes, competing street-vendors' cries and swirling folk melodies pile up into a bustling collage, capturing the timeless clamour of buyers and sellers thronging a public square. The orchestra becomes the crowd itself, a restless snapshot of the fairground's energy.",
          "source": "Igor Stravinsky, Petrushka (1911), Scene 1: The Shrovetide Fair, IMSLP",
          "href": "https://imslp.org/wiki/Petrushka,_K012_(Stravinsky,_Igor)"
        },
        {
          "category": "artistic",
          "title": "Aertsen's monumental market stall",
          "excerpt": "Pieter Aertsen's 'Market Scene' fills the foreground with a monumental heap of produce, poultry and wares, the goods themselves crowding the viewer as if leaning off a stall. A pioneer of the market genre, Aertsen celebrates the abundance and daily commerce of the sixteenth-century marketplace. Vendor and buyer meet amid the plenty, an image of the market as the well-stocked heart of civic life.",
          "source": "Pieter Aertsen, Market Scene, c. 1550, Wallraf-Richartz Museum, Cologne (Wikimedia Commons)",
          "href": "https://commons.wikimedia.org/wiki/File:Pieter_Aertsen_-_Market_Scene_-_WGA0062.jpg",
          "image": {
            "src": "/covers/bob-design-surrey-street-market--art.png",
            "alt": "Pieter Aertsen's oil painting 'Market Scene' showing a market stall laden with vegetables, fruit, poultry and other produce crowding the foreground.",
            "credit": "Pieter Aertsen, Market Scene (c. 1550), Wallraf-Richartz Museum, Cologne. Public domain, via Wikimedia Commons."
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
