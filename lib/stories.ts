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
    "rank": 1
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
    "rank": 2
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
    "rank": 3
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
    "rank": 4
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
    "rank": 5
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
    "rank": 6
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
    "rank": 7
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
    "rank": 8
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
    "rank": 9
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
    "rank": 10
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
    "rank": 11
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
    "rank": 12
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
    "rank": 13
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
    "rank": 14
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
    "rank": 15
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
    "rank": 16
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
    "rank": 17
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
    "rank": 18
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
    "rank": 19
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
    "rank": 20
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
    "rank": 21
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
    "rank": 22
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
    "rank": 23
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
    "rank": 24
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
    "rank": 25
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
    "rank": 26
  },
  {
    "slug": "eu-meta-addictive-design-dsa",
    "headline": "EU finds Facebook and Instagram in breach of digital rules over 'addictive' design",
    "overview": "The European Commission said on July 10, 2026 that the 'addictive' design of Facebook and Instagram - features such as infinite scroll, autoplay and engagement-driven recommendations - breaches the Digital Services Act by failing to protect users' mental and physical wellbeing. Regulators told Meta to disable the features by default, add screen-time breaks and retune its algorithms, warning that a final non-compliance ruling could bring fines of up to 6% of global annual turnover, more than $12 billion. Meta said it disagreed with the preliminary findings, pointing to the teen-account protections it has already rolled out.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMirgFBVV95cUxPRUxQS2dYSG5aVnI1cDJONzVVWURrcEE3MzhOZE5VaDBOTGgtR3RHWVAydDVlTUJTSVBDd01TMFp1ZGFiNV9aYXVsMW1hX2ZaamlVcUZQZHlOV3gwcjdXcHJTY2sxY1JOQVRZWGc0SlhXZHJ1M01rUTlkTDkzOFZrUWZNQWlLZGR5b1JHUjFvM0t1LW5NY2ZNUE5EZzJmVHRmc3A1Qmg4MzhQZVpDSlE?oc=5"
      },
      {
        "name": "CNBC",
        "href": "https://www.cnbc.com/2026/07/10/meta-instagram-facebook-addictive-design-breach-eu-laws.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-10",
    "image": {
      "src": "/covers/eu-meta-addictive-design-dsa.png",
      "alt": "The Meta Platforms headquarters sign at Menlo Park, California.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 10 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Alypius drunk on the arena: Augustine on a mind captured by spectacle (Confessions, Book VI, c. 397-400 AD)",
        "excerpt": "For, directly he saw that blood, he therewith imbibed a sort of savageness; nor did he turn away, but fixed his eye, drinking in madness unconsciously, and was delighted with the guilty contest, and drunken with the bloody pastime. Nor was he now the same he came in, but was one of the throng he came unto, and a true companion of those who had brought him there. Why need I say more? He looked, shouted, was excited, carried away with him the madness which would stimulate him to return, not only with those who first enticed him, but also before them, yea, and to draw in others.",
        "source": "Augustine of Hippo, Confessions, Book VI, Chapter 8 (trans. J. G. Pilkington), New Advent / Christian Classics.",
        "href": "https://www.newadvent.org/fathers/110106.htm"
      },
      {
        "category": "historical",
        "title": "A king moves against a seductive new habit: James I, 'A Counterblaste to Tobacco' (1604)",
        "excerpt": "A custome lothsome to the eye, hatefull to the Nose, harmefull to the braine, dangerous to the Lungs, and in the blacke stinking fume thereof, neerest resembling the horrible Stigian smoke of the pit that is bottomelesse.",
        "source": "King James I of England, A Counterblaste to Tobacco (1604), Wikisource.",
        "href": "https://en.wikisource.org/wiki/A_Counterblaste_to_Tobacco"
      },
      {
        "category": "literary",
        "title": "The Lotus-Eaters: engineered forgetting of home (Homer, Odyssey, Book 9)",
        "excerpt": "And whosoever of them ate of the honey-sweet fruit of the lotus, had no longer any wish to bring back word or to return, but there they were fain to abide among the Lotus-eaters, feeding on the lotus, and forgetful of their homeward way. These men, therefore, I brought back perforce to the ships, weeping, and dragged them beneath the benches and bound them fast in the hollow ships;",
        "source": "Homer, Odyssey 9.94-100 (trans. A. T. Murray, Loeb Classical Library), Perseus Digital Library, Tufts University.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0136%3Abook%3D9%3Acard%3D82"
      },
      {
        "category": "literary",
        "title": "'Thou hast the keys of Paradise': De Quincey praises and dreads the drug (Confessions of an English Opium-Eater, 1821)",
        "excerpt": "Oh, just, subtle, and mighty opium! that to the hearts of poor and rich alike, for the wounds that will never heal, and for \"the pangs that tempt the spirit to rebel,\" bringest an assuaging balm; eloquent opium! that with thy potent rhetoric stealest away the purposes of wrath; and to the guilty man for one night givest back the hopes of his youth, and hands washed pure from blood;",
        "source": "Thomas De Quincey, Confessions of an English Opium-Eater (1821), Project Gutenberg (eBook #2040).",
        "href": "https://www.gutenberg.org/files/2040/2040-h/2040-h.htm"
      },
      {
        "category": "artistic",
        "title": "Music of engineered intoxication: Berlioz, 'Symphonie fantastique' (Episode in the Life of an Artist), 1830",
        "excerpt": "Ayant acquis la certitude que son amour est méconnu, l'artiste s'empoisonne avec de l'opium. La dose de narcotique, trop faible pour lui donner la mort, le plonge dans un sommeil accompagné des plus horribles des visions.",
        "source": "Hector Berlioz, programme of the Symphonie fantastique: Épisode de la vie d'un artiste, H. 48 (1830); programme text via Bibliothèque nationale de France (BnF), Les Essentiels. Full public-domain score: IMSLP / Petrucci Music Library (Symphonie fantastique, H. 48).",
        "href": "https://essentiels.bnf.fr/fr/extrait/cda017ec-36b6-4f13-be55-25ad0802899d-programme-la-symphonie-fantastique"
      },
      {
        "category": "artistic",
        "title": "Hogarth's 'Gin Lane' (1751): a city undone by cheap intoxication, and the law that answered it",
        "excerpt": "A public-domain engraving made to rally support for the Gin Act of 1751. Hogarth crowds the scene with the ruin of a population hooked on cheap spirits: a stupefied mother lets her infant tumble from her arms, a gin-soaked corpse is coffined, buildings collapse, and only the pawnbroker and the distiller prosper. It is propaganda in copperplate, moralists and lawmakers marshalling public horror to curb a compulsion the market was busily manufacturing.",
        "source": "William Hogarth, Gin Lane, 1751, etching and engraving, National Gallery of Art, Washington (Rosenwald Collection).",
        "href": "https://www.nga.gov/artworks/30433-gin-lane",
        "image": {
          "src": "/covers/eu-meta-addictive-design-dsa--art.png",
          "alt": "Hogarth's 1751 engraving Gin Lane: a crowded, crumbling London street devastated by gin; in the foreground a drunken, sore-covered woman takes snuff while her baby falls from her arms, with a corpse, a pawnshop, and collapsing houses beyond.",
          "credit": "William Hogarth, Gin Lane, 1751; National Gallery of Art, Washington (Rosenwald Collection); via Wikimedia Commons (public domain)"
        }
      }
    ],
    "lead": true,
    "rank": 27
  },
  {
    "slug": "us-iran-ceasefire-over-talks",
    "headline": "US and Iran trade fresh strikes as Trump declares the ceasefire over but agrees to keep talking",
    "overview": "President Donald Trump said on July 10, 2026 that Washington had told Tehran 'in no uncertain terms' that the ceasefire was over, even as he confirmed the United States had agreed to Iran's request to continue talks. US and Iranian forces exchanged intensifying fire across the Middle East for a second straight day, with Qatari mediators shuttling to Tehran as diplomacy carried on behind the scenes.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMimgFBVV95cUxNQmZnOENNRXdELTloYWdZVG84OGRxcnFydXg5S1RNYWYyeTVkZGQ3XzkwV0hJdXRDNzBrSEp2ZUw2UkU5LVJkcWtyc0FXOHZkM1cwanhvaUFFM3g2WjJ6bkdHZmJVbE8zNGFneWF4VzM5VFdWcGNmUWo4VnljNktvSWJ3eE9XaThVZVVPM2NlQlhoUVh4T2E0cnJB?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMirAFBVV95cUxNWU8weHNqWU10dDFxUGpMR3Z5LW0xVVVnTlNuU2ZBaWpXS0ZnbHQ4c3BENmZ2QVZMZ0VLWmIyUnU0NVM2Tkp4T0lONVM2NnF5cHluZWRxR3FkOXdsNEJoQ3I1VmV3a3hOcExFWll0Vkp2VUJKN2xpcU13US1lOEkxWE1CcEY2dWZGbUZ4TzZ3V0lYRUhLdC1CZjJNTDVJZVM2TDZpSUU0V0lQdkZn?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-10",
    "image": {
      "src": "/covers/us-iran-ceasefire-over-talks.png",
      "alt": "An oil tanker ablaze at dusk in a narrow strait between two arid coastlines.",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 10 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Peace of Nicias unravels: 'neither war nor peace' (Thucydides, History of the Peloponnesian War, Book V, 421 BC)",
        "excerpt": "Looked at by the light of facts it cannot, it will be found, be rationally considered a state of peace, where neither party either gave or got back all that they had agreed, apart from the violations of it which occurred on both sides in the Mantinean and Epidaurian wars and other instances",
        "source": "Thucydides, History of the Peloponnesian War, Book 5 (Richard Crawley translation, 1874), public domain.",
        "href": "https://classics.mit.edu/Thucydides/pelopwar.5.fifth.html"
      },
      {
        "category": "historical",
        "title": "Talking and fighting at once: the Panmunjom armistice talks, begun July 10, 1951",
        "excerpt": "For two years and seventeen days the guns never fell silent while negotiators bargained across a table at Panmunjom. Talks opened on July 10, 1951 (seventy-five years to the day before this story), yet both sides kept killing to gain leverage over the ink, hurling men at hills like Pork Chop even as the wording of a truce was haggled clause by clause. On the final morning of July 27, 1953, delegates signed to the sound of artillery still thundering in the distance, the perfect emblem of a peace pursued at gunpoint.",
        "source": "National Archives, 'Armistice Agreement for the Restoration of the South Korean State (1953)', Milestone Documents; General Records of the United States Government, Record Group 11.",
        "href": "https://www.archives.gov/milestone-documents/armistice-agreement-restoration-south-korean-state"
      },
      {
        "category": "literary",
        "title": "Pandarus's arrow shatters the sworn truce (Homer, Iliad, Book IV)",
        "excerpt": "He laid the notch of the arrow on the oxhide bowstring, and drew both notch and string to his breast till the arrow-head was near the bow; then when the bow was arched into a half-circle he let fly, and the bow twanged, and the string sang as the arrow flew gladly on over the heads of the throng… The Trojans have trampled on their oaths and have wounded you; nevertheless the oath, the blood of lambs, the drink-offerings and the right hands of fellowship in which have put our trust shall not be vain.",
        "source": "Homer, The Iliad, Book 4 (Samuel Butler translation, 1898), public domain; Perseus Digital Library, Tufts University.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0217:book=4"
      },
      {
        "category": "literary",
        "title": "A truce kept in word, broken in deed: Prince John at Gaultree Forest (Shakespeare, Henry IV, Part 2, Act 4, Scene 2)",
        "excerpt": "I promised you redress of these same grievances\nWhereof you did complain; which, by mine honour,\nI will perform with a most Christian care.\nBut for you, rebels, look to taste the due\nMeet for rebellion and such acts as yours.\n…\nStrike up our drums, pursue the scatter'd stray:\nGod, and not we, hath safely fought to-day.\nSome guard these traitors to the block of death,\nTreason's true bed and yielder up of breath.",
        "source": "William Shakespeare, The Second Part of King Henry the Fourth, Act 4, Scene 2 (Moby/Complete Works, public domain); The Complete Works of William Shakespeare, MIT.",
        "href": "https://shakespeare.mit.edu/2henryiv/2henryiv.4.2.html"
      },
      {
        "category": "artistic",
        "title": "Haydn, Missa in tempore belli ('Mass in Time of War' / 'Paukenmesse'), Hob.XXII:9 (1796)",
        "excerpt": "Written at Eisenstadt in the anxious summer of 1796, as Austria mobilized against Napoleon's advancing armies, Haydn's mass literally scores the collision of war and the plea for peace. In the closing Agnus Dei, the choir's prayer 'Dona nobis pacem' — grant us peace — is stalked and interrupted by ominous military timpani and blaring trumpets, the drums that give the work its nickname. It is the sound of a congregation begging for a truce while the artillery answers back, peace and war sung in the same breath.",
        "source": "Joseph Haydn, Mass in C major, Hob.XXII:9 'Missa in tempore belli' (1796); scores in the public domain via IMSLP/Petrucci Music Library.",
        "href": "https://imslp.org/wiki/Mass_in_C_major,_Hob.XXII:9_(Haydn,_Joseph)"
      },
      {
        "category": "artistic",
        "title": "Francisco de Goya, The Third of May 1808 (El tres de mayo de 1808 en Madrid), 1814",
        "excerpt": "Goya painted the moment a fragile occupation-era calm gives way to slaughter: a faceless firing squad of French soldiers, rifles levelled in a rigid mechanical line, executes unarmed citizens of Madrid through the night. At the center a man in a white shirt throws his arms wide in a crucifixion pose, lit by a single lantern, while corpses already lie heaped in their own blood at his feet. It is the definitive image of what a broken peace looks like on the ground — not negotiation, but bodies against a wall.",
        "source": "Francisco de Goya, The Third of May 1808, 1814, oil on canvas; Museo Nacional del Prado, Madrid.",
        "href": "https://www.museodelprado.es/coleccion/obra-de-arte/el-3-de-mayo-en-madrid-o-los-fusilamientos/5e177409-2993-4240-97fb-847a02c6496c",
        "image": {
          "src": "/covers/us-iran-ceasefire-over-talks--art.png",
          "alt": "A night execution: a line of faceless French soldiers with rifles raised fires on a group of Madrid citizens; a kneeling man in a white shirt flings his arms wide beside a lantern, with the bloodied dead heaped in front of him.",
          "credit": "Francisco de Goya, The Third of May 1808 (El tres de mayo de 1808 en Madrid), 1814; Museo Nacional del Prado, Madrid; via Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 28
  },
  {
    "slug": "trump-refuses-housing-bill",
    "headline": "Trump says he will not sign a bipartisan housing bill, using it as leverage on election law",
    "overview": "President Donald Trump said on July 10, 2026 that he would not sign the bipartisan '21st Century ROAD to Housing Act', which cleared both chambers of Congress with broad support, in protest at the Senate's failure to advance his SAVE America Act requiring proof of citizenship to register to vote. Trump stopped short of a formal veto; without his signature or a veto the housing measure - which speeds construction permitting and limits investor purchases of single-family homes - becomes law automatically at midnight.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMimAFBVV95cUxPTWtlTzFxYmlQaXNaZDN0U0NKdEhQbGoxTVBXRERicFc2UmpPcElFbU1jYXlUYXY4UWdzb1ZQbHBfaTJCbTNGb3hobkNzZzF0djRNLTdZbkRnbXNKcTJ0RzFaWTFYdGNXbE02MnNEaHQxS2dsWHpvQTBVRWZYeXQzcHN3VkUzRzZuWGFJalNOTUNMcXk0TGZoUQ?oc=5"
      },
      {
        "name": "PBS NewsHour",
        "href": "https://www.pbs.org/newshour/politics/trump-says-he-wont-sign-bipartisan-housing-affordability-bill"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-10",
    "image": {
      "src": "/covers/trump-refuses-housing-bill.png",
      "alt": "The United States Capitol at dusk.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 10 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Livy, on the creation of the tribunes of the plebs after the Secession to the Sacred Mount (494 BC), *Ab Urbe Condita* Book 2.33",
        "excerpt": "An agreement was arrived at, the terms being that the plebs should have its own magistrates, whose persons were to be inviolable, and who should have the right of affording protection against the consuls. Two 'tribunes of the plebs' were elected, C. Licinius and L. Albinus. These chose three colleagues.",
        "source": "Livy, *The History of Rome*, Book 2.33, trans. Rev. Canon Roberts (Perseus Digital Library, Tufts University)",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.02.0026%3Abook%3D2%3Achapter%3D33"
      },
      {
        "category": "historical",
        "title": "Andrew Jackson, Bank Veto Message returning the bill to the Senate, Washington, July 10, 1832",
        "excerpt": "WASHINGTON, July 10, 1832. To the Senate. The bill \"to modify and continue\" the act entitled \"An act to incorporate the subscribers to the Bank of the United States\" was presented to me on the 4th July instant. Having considered it with that solemn regard to the principles of the Constitution which the day was calculated to inspire, and come to the conclusion that it ought not to become a law, I herewith return it to the Senate, in which it originated, with my objections.",
        "source": "Andrew Jackson, Veto Message (July 10, 1832), The Avalon Project, Yale Law School",
        "href": "https://avalon.law.yale.edu/19th_century/ajveto01.asp"
      },
      {
        "category": "literary",
        "title": "Herman Melville, *Bartleby, the Scrivener: A Story of Wall Street* (1853), the first refusal",
        "excerpt": "Imagine my surprise, nay, my consternation, when without moving from his privacy, Bartleby in a singularly mild, firm voice, replied, \"I would prefer not to.\"",
        "source": "Herman Melville, *The Piazza Tales* (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/11231/11231-h/11231-h.htm"
      },
      {
        "category": "literary",
        "title": "Aristophanes, *Lysistrata* (411 BC): the women resolve to withhold themselves as leverage to force a peace",
        "excerpt": "By the two Goddesses, now can't you see / All we have to do is idly sit indoors / With smooth roses powdered on our cheeks, / Our bodies burning naked through the folds / Of shining Amorgos' silk, and meet the men / With our dear Venus-plats plucked trim and neat. / Their stirring love will rise up furiously, / They'll beg our arms to open. That's our time! / We'll disregard their knocking, beat them off— / And they will soon be rabid for a Peace.",
        "source": "Aristophanes, *Lysistrata*, trans. Jack Lindsay (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/7700/7700-h/7700-h.htm"
      },
      {
        "category": "artistic",
        "title": "Ludwig van Beethoven, *Coriolan* Overture, Op. 62 (1807) — a musical portrait of the intransigent leader who will not yield",
        "excerpt": "Beethoven's terse C-minor overture, composed in 1807 for Heinrich Joseph von Collin's tragedy on Coriolanus, is music of ultimatum and refusal. Hammered unison C's and slashing chords set the will of the unbending man against the pleading, lyrical second theme; the drama is a standoff of assertion and entreaty. The music simply drains away at the close, the hard resolve dissolving rather than relenting.",
        "source": "Coriolan, Op.62 (Beethoven, Ludwig van) — IMSLP/Petrucci Music Library (public-domain scores)",
        "href": "https://imslp.org/wiki/Coriolan,_Op.62_(Beethoven,_Ludwig_van)"
      },
      {
        "category": "artistic",
        "title": "Cesare Maccari, *Cicero Denounces Catiline* (Cicerone denuncia Catilina), fresco, 1888",
        "excerpt": "Maccari's Senate fresco stages a legislative confrontation as raw political theatre: Cicero rises to denounce, arm outstretched, while Catiline sits alone on an empty bench, isolated and shunned by the ranked senators. The chamber becomes an arena where assent is granted or withheld and a single figure is held hostage to the collective will. The composition freezes the instant of brinkmanship, before the body decides whether to act.",
        "source": "Cesare Maccari, *Cicero Denounces Catiline* (1888), Palazzo Madama, Rome — via Wikimedia Commons (public domain)",
        "href": "https://commons.wikimedia.org/wiki/File:Cicero_Denounces_Catiline_in_the_Roman_Senate_by_Cesare_Maccari_-_3.jpg",
        "image": {
          "src": "/covers/trump-refuses-housing-bill--art.png",
          "alt": "Fresco of the ancient Roman Senate: Cicero stands at right, arm extended, denouncing Catiline, who sits alone and isolated on a lower bench at left while rows of togaed senators lean away from him.",
          "credit": "Cesare Maccari, Cicero Denounces Catiline (Cicerone denuncia Catilina), 1888; Palazzo Madama, Rome; via Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 29
  },
  {
    "slug": "china-helium-export-ban",
    "headline": "China imposes a temporary ban on helium exports as Middle East tensions strain supplies",
    "overview": "China's commerce ministry and customs administration announced an immediate temporary ban on helium exports on July 10, 2026, citing supply strains as renewed US-Iran conflict threatens shipments through the Strait of Hormuz and a major Qatari facility. Helium is critical to semiconductor manufacturing, fibre optics and quantum research; China itself imports most of its supply, and the order named no exemptions, implying it applies to all overseas shipments.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMinwFBVV95cUxNc3JNM3pfZEJxTV9oX1JMNXdpSzJ5a2NvTFBNZXBHUWpLMnEyM3BqYjNEcDg0WGZsZGhSaktsODR1di1NbU56SzJRZ2NmcXloY3p1MURESl8xS3NFTDRaYkFLZ3VLQU40X0Rwb0V1amJPRE1BVmdLZmJEc29YVjB0d1FQTFgzZWFSekwxRzE0aDFaeDlUZWlsNkpUcUNuNWM?oc=5"
      },
      {
        "name": "South China Morning Post",
        "href": "https://www.scmp.com/economy/china-economy/article/3360114/china-announces-temporary-ban-helium-exports"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-10",
    "image": {
      "src": "/covers/china-helium-export-ban.png",
      "alt": "A technician holds a twelve-inch silicon wafer of the kind whose manufacture depends on helium.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 10 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Megarian Decree, Athens' embargo on Megara (c. 432 BC), in Aristophanes' Acharnians (staged 425 BC)",
        "excerpt": "But now some young drunkards go to Megara and carry off the harlot Simaetha; the Megarians, hurt to the quick, run off in turn with two harlots of the house of Aspasia; and so for three whores Greece is set ablaze. Then Pericles, aflame with ire on his Olympian height, let loose the lightning, caused the thunder to roll, upset Greece and passed an edict, which ran like the song, 'That the Megarians be banished both from our land and from our markets and from the sea and from the continent.' Meanwhile the Megarians, who were beginning to die of hunger, begged the Lacedaemonians to bring about the abolition of the decree, of which those harlots were the cause; several times we refused their demand; and from that time there was horrible clatter of arms everywhere.",
        "source": "Aristophanes, The Acharnians (trans. The Athenian Society), The Internet Classics Archive (MIT)",
        "href": "https://classics.mit.edu/Aristophanes/acharnians.html"
      },
      {
        "category": "historical",
        "title": "The Arab (OPEC/OAPEC) oil embargo, October 1973 - March 1974",
        "excerpt": "In October 1973 the Arab members of OPEC cut production and cut off petroleum shipments to the United States and other nations that had backed Israel in the Yom Kippur War, wielding a strategic commodity as an instrument of coercion. Within months the price of a barrel of crude roughly quadrupled, exposing how dependence on a single chokepoint supply could be turned into geopolitical leverage overnight. Gas lines, rationing, and the threat of recession followed, and the embargo reset the balance of power between producer states and the industrial economies they fueled.",
        "source": "U.S. Department of State, Office of the Historian, \"Oil Embargo, 1973-1974\"",
        "href": "https://history.state.gov/milestones/1969-1976/oil-embargo"
      },
      {
        "category": "literary",
        "title": "Joseph corners the grain of Egypt during the famine, Genesis 41 & 47 (King James Version, 1611)",
        "excerpt": "And Joseph gathered corn as the sand of the sea, very much, until he left numbering; for it was without number. ... And Joseph opened all the storehouses, and sold unto the Egyptians. ... And all countries came into Egypt to Joseph for to buy corn; because that the famine was so sore in all lands. ... And Joseph gathered up all the money that was found in the land of Egypt, and in the land of Canaan, for the corn which they bought.",
        "source": "The Holy Bible, King James Version, Genesis 41:49, 41:56-57 and 47:14 (eBible.org)",
        "href": "https://ebible.org/kjv/GEN41.htm"
      },
      {
        "category": "literary",
        "title": "Curtis Jadwin corners the Chicago wheat market, in Frank Norris's The Pit: A Story of Chicago (1903), Chapter IX",
        "excerpt": "There was no wheat on the Chicago market. He, the great man, the 'Napoleon of La Salle Street,' had it all. He sold it or hoarded it, as suited his pleasure. ... He dictated the price to those men who must buy it of him to fill their contracts. His hand was upon the indicator of the wheat dial of the Board of Trade, and he moved it through as many or as few of the degrees of the circle as he chose.",
        "source": "Frank Norris, The Pit: A Story of Chicago (1903), Standard Ebooks",
        "href": "https://standardebooks.org/ebooks/frank-norris/the-pit/text/chapter-9"
      },
      {
        "category": "artistic",
        "title": "George Frideric Handel, Joseph and his Brethren, HWV 59 (composed 1743; premiered 2 March 1744), libretto by James Miller",
        "excerpt": "The seven fat cattle, and full ears of corn, / Denote seven years of plenty. The like seven / Of meagre kind, and unreplenish'd grain, / Mark the same years of famine to succeed.",
        "source": "G. F. Handel, Joseph and his Brethren, HWV 59 (1744); libretto by James Miller; full scores in the public domain at IMSLP",
        "href": "https://imslp.org/wiki/Joseph_and_his_Brethren,_HWV_59_(Handel,_George_Frideric)"
      },
      {
        "category": "artistic",
        "title": "Pieter Bruegel the Elder, The Harvesters (1565), The Metropolitan Museum of Art",
        "excerpt": "Under a hazy August sky, peasants scythe and bind a vast field of ripe wheat while others rest and eat beneath a tree, the gathered sheaves stacked like ingots of a precious substance. Painted for an Antwerp merchant-banker, the scene turns the grain harvest into an image of accumulated wealth and stored plenty, the vital resource being reaped, bundled, and laid by. It is a portrait of the moment a life-sustaining commodity passes from open field into private control.",
        "source": "Pieter Bruegel the Elder, The Harvesters (1565), oil on wood, accession 19.164, The Metropolitan Museum of Art",
        "href": "https://www.metmuseum.org/art/collection/search/435809",
        "image": {
          "src": "/covers/china-helium-export-ban--art.png",
          "alt": "A sweeping late-summer landscape of golden wheat fields; peasants cut and bundle the grain into sheaves while others rest and eat under a pear tree, with a village, church, and distant sea beyond.",
          "credit": "Pieter Bruegel the Elder, The Harvesters, 1565; The Metropolitan Museum of Art, New York; via Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 30
  },
  {
    "slug": "hasina-december-return-surrender",
    "headline": "Bangladesh's ousted leader Sheikh Hasina says she will return in December to surrender in court",
    "overview": "Sheikh Hasina, Bangladesh's 78-year-old former prime minister, told Reuters in an interview published on July 10, 2026 that she plans to return from exile in India in December alongside senior Awami League colleagues and surrender in court, calling the proceedings against her 'farcical'. Hasina, sentenced to death in absentia after last year's uprising, said she had urged other condemned party members to join her and acknowledged she could be arrested or killed on her return.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMixgFBVV95cUxPVDVhX3VqUkM1cjdNT1ZPVHJaLTVjOV9vYW5tQjdJOHp5QVR5bEt4UGxVWDZucnJKT0kzZGgtSnIzZ2VLVnFaWF82UTVhb0FfamxtWF90Wkd5SG5kQnVMT1BWQkhxNHFiZ2xQTGo5cE04aGMzbi1KUmEzeEVVT3dESlI1YVRRVk1uZ2JsQUNaaXM5SHJIM2xqUUt5b1Z4SjAydjByYVNtTG14dk1BXzhhUkd2c3RmN0lDQmltUUU2MC1zTjRIbnc?oc=5"
      },
      {
        "name": "Al Jazeera",
        "href": "https://www.aljazeera.com/news/2026/7/10/condemned-ex-pm-hasina-plans-december-return-to-bangladesh"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-10",
    "image": {
      "src": "/covers/hasina-december-return-surrender.png",
      "alt": "Former Bangladeshi prime minister Sheikh Hasina.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 10 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Marcus Atilius Regulus returns to Carthage to face torture (c. 250 BC), recounted in Cicero, De Officiis I.39 (44 BC)",
        "excerpt": "when he was taken prisoner by the Carthaginians, he was sent to Rome on parole to negotiate an exchange of prisoners; he came and, in the first place, it was he that made the motion in the senate that the prisoners should not be restored; and in the second place, when his relatives and friends would have kept him back, he chose to return to a death by torture rather than prove false to his promise, though given to an enemy.",
        "source": "Cicero, De Officiis, trans. Walter Miller (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/47001/47001-h/47001-h.htm"
      },
      {
        "category": "historical",
        "title": "King Charls His Speech Made upon the Scaffold at Whitehall-Gate, 30 January 1649",
        "excerpt": "I Am the Martyr of the People. ... I go from a corruptible, to an incorruptible Crown; where no disturbance can be, no disturbance in the World.",
        "source": "King Charls His Speech Made upon the Scaffold (London, 1649), Project Canterbury / anglicanhistory.org",
        "href": "https://anglicanhistory.org/charles/charles1.html"
      },
      {
        "category": "literary",
        "title": "Sophocles, Antigone, lines 450–460 (441 BC), trans. R. C. Jebb",
        "excerpt": "Nor did I think that your decrees were of such force, that a mortal could override the unwritten and unfailing statutes given us by the gods. ... Die I must, that I knew well (how could I not?). That is true even without your edicts.",
        "source": "Sophocles, Antigone (Perseus Digital Library, Tufts)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0186:card=441"
      },
      {
        "category": "literary",
        "title": "Plato, Crito (c. 360 BC), the Laws of Athens speaking, trans. Benjamin Jowett",
        "excerpt": "Any one who does not like us and the city, and who wants to emigrate to a colony or to any other city, may go where he likes, retaining his property. But he who has experience of the manner in which we order justice and administer the state, and still remains, has entered into an implied contract that he will do as we command him.",
        "source": "Plato, Crito, trans. Benjamin Jowett (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/1657/pg1657.txt"
      },
      {
        "category": "artistic",
        "title": "Wolfgang Amadeus Mozart, Requiem in D minor, K.626 (1791, unfinished)",
        "excerpt": "Introitus — Kyrie — Dies irae — Tuba mirum — Rex tremendae — Recordare — Confutatis — Lacrimosa — Domine Jesu Christe — Hostias et preces — Sanctus — Benedictus — Agnus Dei — Communio (Lux aeterna). The sequence sets the Day of Wrath and Judgment, the soul standing to answer for its deeds; Mozart's Requiem was unfinished at the time of his death.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Requiem_in_D_minor,_K.626_(Mozart,_Wolfgang_Amadeus)"
      },
      {
        "category": "artistic",
        "title": "Paul Delaroche, The Execution of Lady Jane Grey (1833)",
        "excerpt": "Blindfolded and robed in white, the young deposed queen kneels on the black-draped scaffold and gropes for the execution block, steadied by a sympathetic official as the axeman waits at her side. Delaroche freezes the instant before the fatal stroke: youth, dignity, and defenselessness meeting a doom the sitter has resolved to accept. The composition turns a political downfall into an image of martyrdom composed and unflinching before death.",
        "source": "Paul Delaroche, National Gallery, London (via Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:PAUL_DELAROCHE_-_Ejecuci%C3%B3n_de_Lady_Jane_Grey_(National_Gallery_de_Londres,_1834).jpg",
        "image": {
          "src": "/covers/hasina-december-return-surrender--art.png",
          "alt": "A blindfolded young woman in a white gown kneels on a scaffold and reaches for the execution block, guided by an official, with an axeman standing ready against a dark background.",
          "credit": "Paul Delaroche, The Execution of Lady Jane Grey, 1833, National Gallery, London; via Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 31
  },
  {
    "slug": "volkswagen-deliveries-drop-brand-cuts",
    "headline": "Volkswagen deliveries fall 8.6% on a China slump as it plans to halve its model line-up",
    "overview": "Volkswagen said on July 10, 2026 that global deliveries fell 8.6% in the second quarter, dragged down by a 36.6% plunge in China where domestic rivals have gained ground, with the core VW brand down 14%, Audi down 8% and Porsche down 18%. The German group said its multi-year 'fundamental realignment' had reached a new phase, announcing plans to cut the number of models by up to half; gains in North America and Western Europe offset part of the decline.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiogFBVV95cUxPRjdBWXBNTThwdmdOV3VXd1F6Q1dmR0I0OUxSV2JxZ3pOQlRoTmFEVUlHU2djQWdONzFIOE9BRVhkcnNzQ2k3SHdpcEFza1NFanIwblZSY184Z3B6Rk8zWThtbTVJTE45RllvUW1fb0FVa2xFRWtqRk0wdmx4TWVSOUZLT3BxdktLaWZQdVNJYldGREd3cnkyX2l2SEFTUTg0MFE?oc=5"
      },
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMilAFBVV95cUxNTHJJWUNnNjEzQnBvdjlaMDU0OWRPUUJSRTREVzJrMGFCRzdVaURXbTl2eDdEeXg4ZXVOMEI3ejdaUU9NTTZqWkdncC1nSHRiR0hBaEs3M0k1OFdOejVxMlRYZDhMODI2U3pvX0hWTzA3NGxrQTZBV25uSENEcFZTNVB4amtKQkVGRUgxWDFkVlEyV2pC?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-10",
    "image": {
      "src": "/covers/volkswagen-deliveries-drop-brand-cuts.png",
      "alt": "The Volkswagen factory at Wolfsburg, Germany.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 10 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Edward Gibbon, The History of the Decline and Fall of the Roman Empire — \"General Observations on the Fall of the Roman Empire in the West\" (1781)",
        "excerpt": "The decline of Rome was the natural and inevitable effect of immoderate greatness. Prosperity ripened the principle of decay; the causes of destruction multiplied with the extent of conquest; and, as soon as time or accident had removed the artificial supports, the stupendous fabric yielded to the pressure of its own weight. The story of its ruin is simple and obvious; and, instead of inquiring why the Roman empire was destroyed, we should rather be surprised that it had subsisted so long.",
        "source": "Edward Gibbon, The History of the Decline and Fall of the Roman Empire (1781); classical antiquity",
        "href": "https://faculty.georgetown.edu/jod/texts/gibbon.fall.html"
      },
      {
        "category": "historical",
        "title": "John Ruskin, The Stones of Venice, Vol. I, Ch. I \"The Quarry\" (1851)",
        "excerpt": "Since the first dominion of men was asserted over the ocean, three thrones, of mark beyond all others, have been set upon its sands: the thrones of Tyre, Venice, and England. Of the First of these great powers only the memory remains; of the Second, the ruin; the Third, which inherits their greatness, if it forget their example, may be led through prouder eminence to less pitied destruction.",
        "source": "John Ruskin, The Stones of Venice, Volume I (1851); the decline of Venice, the early-modern maritime trading empire",
        "href": "https://www.gutenberg.org/files/30754/30754-h/30754-h.htm"
      },
      {
        "category": "literary",
        "title": "Percy Bysshe Shelley, \"Ozymandias\" (1819)",
        "excerpt": "I met a traveller from an antique land\nWho said: Two vast and trunkless legs of stone\nStand in the desart. Near them, on the sand,\nHalf sunk, a shattered visage lies, whose frown,\nAnd wrinkled lip, and sneer of cold command,\nTell that its sculptor well those passions read\nWhich yet survive, stamped on these lifeless things,\nThe hand that mocked them and the heart that fed:\nAnd on the pedestal these words appear:\n\"My name is Ozymandias, king of kings:\nLook on my works, ye Mighty, and despair!\"\nNothing beside remains. Round the decay\nOf that colossal wreck, boundless and bare\nThe lone and level sands stretch far away.",
        "source": "Percy Bysshe Shelley, \"Ozymandias,\" in Rosalind and Helen, A Modern Eclogue; With Other Poems (1819); via Wikisource",
        "href": "https://en.wikisource.org/wiki/Rosalind_and_Helen,_A_Modern_Eclogue_(1819)/Sonnet"
      },
      {
        "category": "literary",
        "title": "Aesop, \"The Oak and the Reeds\" (V. S. Vernon Jones translation, 1912)",
        "excerpt": "An Oak that grew on the bank of a river was uprooted by a severe gale of wind, and thrown across the stream. It fell among some Reeds growing by the water, and said to them, \"How is it that you, who are so frail and slender, have managed to weather the storm, whereas I, with all my strength, have been torn up by the roots and hurled into the river?\" \"You were stubborn,\" came the reply, \"and fought against the storm, which proved stronger than you: but we bow and yield to every breeze, and thus the gale passed harmlessly over our heads.\"",
        "source": "Aesop's Fables, trans. V. S. Vernon Jones (1912); via Project Gutenberg",
        "href": "https://www.gutenberg.org/files/11339/11339-h/11339-h.htm"
      },
      {
        "category": "artistic",
        "title": "Richard Wagner, Götterdämmerung (Twilight of the Gods), WWV 86D — first performed 1876",
        "excerpt": "IMSLP catalog, verbatim: work title \"Götterdämmerung, WWV 86D\" (Wagner, Richard), alternative title \"Twilight of the Gods\"; Movements/Sections \"3 acts\"; First Performance \"1876/08/17\"; First Publication \"1876.\" The concluding music-drama of Der Ring des Nibelungen stages the fall of the old ruling order: the gods' fortress of Valhalla is consumed by fire and a new age dawns — the collapse sealed by the great \"Siegfried's Funeral March.\" Its very title names the theme of the once-supreme power passing into twilight.",
        "source": "Richard Wagner, Götterdämmerung, WWV 86D (composed 1848–74, premiered Bayreuth 1876); public-domain scores via IMSLP",
        "href": "https://imslp.org/wiki/G%C3%B6tterd%C3%A4mmerung,_WWV_86D_(Wagner,_Richard)"
      },
      {
        "category": "artistic",
        "title": "Thomas Cole, The Course of Empire: Destruction (1836)",
        "excerpt": "The fourth canvas of Cole's five-part cycle shows a once-magnificent imperial city at the height of its ruin: enemy soldiers pour across a shattered bridge, palaces burn, a headless colossus looms over the carnage, and citizens leap into a bloodied harbour beneath a storm-lit sky. The proud metropolis that had risen to \"Consummation\" is overwhelmed in a single afternoon by forces it could no longer master. Cole intended the series as a warning that no empire, however dominant, is exempt from decline and violent overthrow.",
        "source": "Thomas Cole, The Course of Empire: Destruction (1836), New-York Historical Society; via Wikimedia Commons (public domain)",
        "href": "https://commons.wikimedia.org/wiki/File:Cole_Thomas_The_Course_of_Empire_Destruction_1836.jpg",
        "image": {
          "src": "/covers/volkswagen-deliveries-drop-brand-cuts--art.png",
          "alt": "A grand classical city engulfed in war and fire: soldiers storm a broken bridge, buildings burn and topple, a giant headless warrior statue stands amid the chaos, and terrified figures flee into a smoke-darkened harbour under a turbulent sky.",
          "credit": "Thomas Cole, The Course of Empire: Destruction, 1836, New-York Historical Society; via Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 32
  },
  {
    "slug": "uk-regulates-cloud-providers",
    "headline": "Britain brings Microsoft, Google, Amazon and Oracle cloud units under financial regulation",
    "overview": "The UK designated the cloud arms of Microsoft, Google, Amazon and Oracle as 'critical third parties' on July 10, 2026, placing them under the oversight of the Bank of England, the Prudential Regulation Authority and the Financial Conduct Authority from July 13. Regulators said banks' and insurers' growing reliance on a handful of cloud suppliers means an outage at one could ripple across the financial system, and the firms must show they can identify, manage and recover from disruptions.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMi1AFBVV95cUxPTURGc0ZPdHY3WEU0TGdWcnJsZ3JGWXZuZzR1dmM2V1hLR1BneXMxZXp6aUJveVpNNTdhMUZ1Q0RUX245UENvLWw1MXFfMXpBQXZoNllqWVZURE4yUkxKb0k5SW84ZFVWUXZORkdqXzItUzlBWDg5X0lDTzduTm1pWUlmbjVjdGJkUVJ6NHlFVWNBZm81ejMxUDA0ZDMwQVN2cnIzdkNLc1lRNllsN1N1YUlsQkdLbmJGa19BVHdfSkV0V3A5UDVPN0xrbUtwN01XWFoySg?oc=5"
      },
      {
        "name": "Sharecast",
        "href": "https://www.sharecast.com/news/news-and-announcements/uk-to-regulate-cloud-service-providers-microsoft-google-amazon-and-oracle--22983512.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-10",
    "image": {
      "src": "/covers/uk-regulates-cloud-providers.png",
      "alt": "Rows of servers in a data centre.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 10 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Tacitus, Annals, Book III.54 (c. AD 116): Rome's daily dependence on grain shipped from overseas provinces",
        "excerpt": "No one represents to the Senate that Italy requires supplies from abroad, and that the very existence of the people of Rome is daily at the mercy of uncertain waves and storms. And unless masters, slaves, and estates have the resources of the provinces as their mainstay, our shrubberies, forsooth, and our country houses will have to support us.",
        "source": "Tacitus, The Annals (Church and Brodribb translation), Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Annals_(Tacitus)/Book_3"
      },
      {
        "category": "historical",
        "title": "Theodore Roosevelt, First Annual Message to Congress (December 3, 1901): federal supervision of the great interstate corporations",
        "excerpt": "Great corporations exist only because they are created and safeguarded by our institutions; and it is therefore our right and our duty to see that they work in harmony with these institutions. ... In the interest of the whole people the Nation should, without interfering with the power of the States in the matter itself, also assume power of supervision and regulation over all corporations doing an interstate business.",
        "source": "Theodore Roosevelt's First State of the Union Address (1901), Wikisource",
        "href": "https://en.wikisource.org/wiki/Theodore_Roosevelt%27s_First_State_of_the_Union_Address"
      },
      {
        "category": "literary",
        "title": "The Gospel of Matthew 7:24–27 (King James Version, 1611): the house built on rock versus the house built on sand",
        "excerpt": "Therefore whosoever heareth these sayings of mine, and doeth them, I will liken him unto a wise man, which built his house upon a rock: And the rain descended, and the floods came, and the winds blew, and beat upon that house; and it fell not: for it was founded upon a rock. And every one that heareth these sayings of mine, and doeth them not, shall be likened unto a foolish man, which built his house upon the sand: And the rain descended, and the floods came, and the winds blew, and beat upon that house; and it fell: and great was the fall of it.",
        "source": "Bible (King James), Matthew, Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Matthew"
      },
      {
        "category": "literary",
        "title": "Aesop, 'The Belly and the Members' (George Fyler Townsend translation, 1867)",
        "excerpt": "THE MEMBERS of the Body rebelled against the Belly, and said, 'Why should we be perpetually engaged in administering to your wants, while you do nothing but take your rest, and enjoy yourself in luxury and self-indulgence?' The Members carried out their resolve and refused their assistance to the Belly. The whole Body quickly became debilitated, and the hands, feet, mouth, and eyes, when too late, repented of their folly.",
        "source": "Aesop's Fables, translated by George Fyler Townsend, Project Gutenberg",
        "href": "https://www.gutenberg.org/files/21/21-h/21-h.htm"
      },
      {
        "category": "artistic",
        "title": "Bedřich Smetana, Vltava (The Moldau), from Má vlast, JB 1:112/2 (composed 1874)",
        "excerpt": "Smetana's tone poem traces a single great river from two trickling springs, through forests, past a peasant wedding and moonlit water-nymphs, swelling into the broad current on which an entire nation's life, trade and cities depend. The whole land leans on one flowing artery, and the music makes audible both its grandeur and the peril of a channel through which everything must pass. The theme surges to a triumphant climax as the Vltava rolls majestically onward, an indispensable lifeline rendered in sound.",
        "source": "Vltava, JB 1:112/2 (Smetana), full orchestral score, IMSLP (public domain)",
        "href": "https://imslp.org/wiki/Vltava,_JB_1:112/2_(Smetana,_Bed%C5%99ich)"
      },
      {
        "category": "artistic",
        "title": "Hubert Robert, Le Pont du Gard (1787), Musée du Louvre",
        "excerpt": "Robert monumentalises the first-century Roman aqueduct near Nîmes, its three tiers of arches striding across the Gardon valley to carry water fifty kilometres to a distant city. Tiny figures at the base of the piers measure the crushing scale of a piece of vital infrastructure on which a whole population's daily supply once depended. Painted for the crown among the 'principal monuments of France,' it presents indispensable public works as both an engineering marvel and an emblem of collective reliance.",
        "source": "File:Pont-du-gard-hubert-robert-1786.jpg, Wikimedia Commons (public domain)",
        "href": "https://commons.wikimedia.org/wiki/File:Pont-du-gard-hubert-robert-1786.jpg",
        "image": {
          "src": "/covers/uk-regulates-cloud-providers--art.png",
          "alt": "A vast three-tiered Roman aqueduct of golden stone arches spans a river valley beneath a luminous sky, with small human figures dwarfed at its base conveying the immense scale of the structure",
          "credit": "Hubert Robert, Le Pont du Gard, 1787, Musée du Louvre, Paris; via Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 33
  },
  {
    "slug": "circle-occ-trust-bank-approval",
    "headline": "Circle wins final US approval to open a national trust bank for its USDC stablecoin",
    "overview": "Stablecoin issuer Circle said on July 10, 2026 that it had received final approval from the US Office of the Comptroller of the Currency to establish First National Digital Currency Bank, N.A., operating as Circle National Trust. The federally regulated charter - a step toward bringing custody of the world's largest regulated stablecoin under national oversight - lifted Circle's shares, which rose about 10% in premarket trading.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiyAFBVV95cUxPd2VHNDFOeEhZci15NXdVa2QxY2pVQzBMX1BWbFVpOWRPVW1tRXVGVUZNekpEdlpDa2RyenhBVTliUXBVbHFUa3Z3TDBLaklidXkyQ2Vxakw1NUZFWWVhR3VUalpIbUZrcWdiNWl0OExtRmJCM19tMjRsQUpEd25UeXJpWXlxVnRMcktGZDhpaWZzQl9lRkM5QUt6SzdQVDVjY0RydTU0aWtSUWJKc0laZ2h4ZTN1ZGI1OWRrOUFoYkRXdkdGNWlUeQ?oc=5"
      },
      {
        "name": "Circle",
        "href": "https://www.circle.com/pressroom/circle-receives-final-occ-approval-to-establish-national-trust-bank"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-10",
    "image": {
      "src": "/covers/circle-occ-trust-bank-approval.png",
      "alt": "A glowing digital dollar coin sealed inside a vault of light.",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 10 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Herodotus on the Lydians as the first coiners of gold and silver money, Histories, Book I.94 (5th century BC; G. C. Macaulay trans.)",
        "excerpt": "Now the Lydians have very nearly the same customs as the Hellenes … and they were the first of men, so far as we know, who struck and used coin of gold or silver; and also they were the first retail-traders.",
        "source": "Herodotus, The History of Herodotus, Book I (trans. G. C. Macaulay), Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/2707/pg2707.txt"
      },
      {
        "category": "historical",
        "title": "The founding of the Bank of England by charter, 1694 (from Macaulay, The History of England from the Accession of James II, Vol. IV, 1855)",
        "excerpt": "The plan was that twelve hundred thousand pounds should be borrowed by the government on what was then considered as the moderate interest of eight per cent. In order to induce capitalists to advance the money promptly on terms so favourable to the public, the subscribers were to be incorporated by the name of the Governor and Company of the Bank of England. The corporation was to have no exclusive privilege, and was to be restricted from trading in any thing but bills of exchange, bullion and forfeited pledges.",
        "source": "Thomas Babington Macaulay, The History of England from the Accession of James II, Volume IV, Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/2613/pg2613.txt"
      },
      {
        "category": "literary",
        "title": "Goethe, Faust, Part II, Act I, Scene IV — 'Pleasure-Garden' / the Paper-Money Scheme (completed 1832; Bayard Taylor trans., 1871)",
        "excerpt": "To all to whom this cometh, be it known:\nA thousand crowns in worth this note doth own.\nIt to secure, as certain pledge, shall stand\nAll buried treasure in the Emperor's land:\nAnd 't is decreed, perfecting thus the scheme,\nThe treasure, soon as raised, shall this redeem.",
        "source": "Johann Wolfgang von Goethe, Faust, Second Part (trans. Bayard Taylor), via Wikisource",
        "href": "https://en.wikisource.org/wiki/Faust_(trans._Bayard_Taylor)/Act_I/IV"
      },
      {
        "category": "literary",
        "title": "Shakespeare, The Merchant of Venice, Act I, Scene 3 — Shylock's bond and the promise to pay (c. 1596–98)",
        "excerpt": "Go with me to a notary, seal me there\nYour single bond; and, in a merry sport,\nIf you repay me not on such a day,\nIn such a place, such sum or sums as are\nExpress'd in the condition, let the forfeit\nBe nominated for an equal pound\nOf your fair flesh, to be cut off and taken\nIn what part of your body pleaseth me.\n… ANTONIO: Content, i' faith: I'll seal to such a bond\nAnd say there is much kindness in the Jew.",
        "source": "William Shakespeare, The Merchant of Venice, Act I, Scene 3, MIT Shakespeare (public domain)",
        "href": "http://shakespeare.mit.edu/merchant/merchant.1.3.html"
      },
      {
        "category": "artistic",
        "title": "Charles Gounod, “Le veau d’or” (Song of the Golden Calf), from Faust, Act II (1859)",
        "excerpt": "Le veau d’or est toujours debout;\nOn encense\nSa puissance\nD’un bout du monde à l’autre bout!\nPour fêter l’infâme idole,\nPeuples et rois confondus,\nAu bruit sombre des écus\nDansent une ronde folle\nAutour de son piédestal?...\nEt Satan conduit le bal!",
        "source": "Charles Gounod, Faust (1859), libretto by Jules Barbier & Michel Carré; Méphistophélès’s “Le veau d’or”; Project Gutenberg (ebook 45806)",
        "href": "https://www.gutenberg.org/files/45806/45806-h/45806-h.htm"
      },
      {
        "category": "artistic",
        "title": "Quentin Massys (Metsys), The Moneylender and His Wife (Le prêteur et sa femme), 1514, Musée du Louvre",
        "excerpt": "At a cloth-covered table an Antwerp money-changer bends over his scales, weighing gold coins and pearls with delicate care, while beside him his wife pauses over an illuminated book of devotion showing the Virgin and Child. A convex mirror in the foreground catches a window, a distant figure, and the reflected world outside, and the shelves behind them hold weights, ledgers, and glinting metal. Massys turns the humble craft of assaying and lending into a meditation on value, faith, and the trust that makes a coin worth its weight.",
        "source": "Quentin Massys, The Moneylender and His Wife, 1514, Musée du Louvre, Paris (INV 1444; MR 821)",
        "href": "https://collections.louvre.fr/en/ark:/53355/cl010061690",
        "image": {
          "src": "/covers/circle-occ-trust-bank-approval--art.png",
          "alt": "A Renaissance money-changer weighs gold coins on a balance scale at a table while his wife, turning the pages of an illuminated devotional book, watches; coins, pearls, weights, and a small round mirror lie before them.",
          "credit": "Quentin Massys, The Moneylender and His Wife (Le prêteur et sa femme), 1514, Musée du Louvre, Paris; via Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 34
  },
  {
    "slug": "pentagon-uap-fourth-release",
    "headline": "Pentagon releases a fourth batch of declassified UFO files, including 19 videos",
    "overview": "The US Department of War published a fourth tranche of declassified UAP files on July 10, 2026 - 40 records, 19 of them videos - continuing the rolling releases begun in May under President Trump's transparency pledge. The batch includes a 2023 Yellow Sea clip whose sensor footage degrades over nearly five minutes and a 2020 Atlantic encounter matching long-rumoured video of a 'floating brain'-shaped object, all posted to a dedicated government website.",
    "genre": "Science",
    "sources": [
      {
        "name": "NBC News",
        "href": "https://www.nbcnews.com/science/ufos-and-anomalous-phenomena/ufo-uap-files-pentagon-release-trump-rcna344204"
      },
      {
        "name": "NewsNation",
        "href": "https://www.newsnationnow.com/space/ufo/pentagon-ufo-files-fourth-release/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-10",
    "image": {
      "src": "/covers/pentagon-uap-fourth-release.png",
      "alt": "A glowing unidentified orb hovering over a dark ocean at dusk.",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 10 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Pliny the Elder on burning shields and an ominous appearance in the heavens, Natural History Book II, chs. 34–35 (c. AD 77)",
        "excerpt": "A burning shield darted across at sunset, from west to east, throwing out sparks, in the consulship of L. Valerius and C. Marius. We have an account of a spark falling from a star, and increasing as it approached the earth, until it became of the size of the moon, shining as through a cloud; it afterwards returned into the heavens and was converted into a lampas; this occurred in the consulship of Cn. Octavius and C. Scribonius. It was seen by Silanus, the proconsul, and his attendants.",
        "source": "Pliny the Elder, The Natural History, Book II, chapters 34–35, trans. John Bostock & H. T. Riley (Perseus Digital Library, Tufts)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0137:book=2:chapter=35"
      },
      {
        "category": "historical",
        "title": "The 1952 Washington, D.C. 'flying saucer' flap, July 19–27, 1952",
        "excerpt": "On two consecutive summer weekends, unidentified blips swarmed the radar screens at Washington National Airport, hovering over the capital and the White House before darting away at impossible speeds; jet interceptors were scrambled and the objects vanished as the fighters closed in. Front pages screamed of saucers over Washington while the Air Force strained to blame temperature inversions, and a rattled CIA quietly convened a scientific panel to decide whether the lights were Soviet weapons, natural mirages, or something no one could name. It was a national lesson in how a democracy reacts when strange lights appear over its own seat of power and no official explanation quite satisfies.",
        "source": "Gerald K. Haines, 'The CIA's Role in the Study of UFOs, 1947–90,' Studies in Intelligence (Central Intelligence Agency, 1997)",
        "href": "https://www.cia.gov/resources/csi/studies-in-intelligence/studies-in-intelligence-1997/cias-role-in-the-study-of-ufos-1947-1990/"
      },
      {
        "category": "literary",
        "title": "H. G. Wells, The War of the Worlds, opening of Book I, ch. 1 'The Eve of the War' (1898)",
        "excerpt": "No one would have believed in the last years of the nineteenth century that this world was being watched keenly and closely by intelligences greater than man's and yet as mortal as his own; that as men busied themselves about their various concerns they were scrutinised and studied, perhaps almost as narrowly as a man with a microscope might scrutinise the transient creatures that swarm and multiply in a drop of water. With infinite complacency men went to and fro over this globe about their little affairs, serene in their assurance of their empire over matter. No one gave a thought to the older worlds of space as sources of human danger, or thought of them only to dismiss the idea of life upon them as impossible or improbable.",
        "source": "H. G. Wells, The War of the Worlds (1898), Project Gutenberg eBook #36",
        "href": "https://www.gutenberg.org/cache/epub/36/pg36.txt"
      },
      {
        "category": "literary",
        "title": "The vision of Ezekiel, a fire in the northern sky, Book of Ezekiel 1:4–7 (King James Version, 1611)",
        "excerpt": "And I looked, and, behold, a whirlwind came out of the north, a great cloud, and a fire infolding itself, and a brightness was about it, and out of the midst thereof as the colour of amber, out of the midst of the fire. Also out of the midst thereof came the likeness of four living creatures. And this was their appearance; they had the likeness of a man. And every one had four faces, and every one had four wings. And their feet were straight feet; and the sole of their feet was like the sole of a calf's foot: and they sparkled like the colour of burnished brass.",
        "source": "Bible (King James Version), Book of Ezekiel, chapter 1 (Wikisource)",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Ezekiel"
      },
      {
        "category": "artistic",
        "title": "Josef Strauss, Sphärenklänge (Music of the Spheres), Walzer, Op. 235 (1868)",
        "excerpt": "Josef Strauss's concert waltz opens with a hushed, shimmering tremolo and a drifting melody meant to evoke the ancient idea of celestial harmony, the inaudible music that the turning heavens were once thought to make. Its title reaches back to the old dream that the sky is ordered and meaningful, that the lights above move to a design we might overhear if only we listened closely enough. Against a story of unreadable objects on a sensor screen, it stands for humanity's oldest instinct: to hear pattern and beauty, rather than dread, in the things that move overhead.",
        "source": "Josef Strauss, Sphärenklänge Walzer, Op. 235 (full score), International Music Score Library Project (IMSLP)",
        "href": "https://imslp.org/wiki/Sph%C3%A4renkl%C3%A4nge_Walzer,_Op.235_(Strauss,_Josef)"
      },
      {
        "category": "artistic",
        "title": "Hans Glaser, Celestial phenomenon over Nuremberg, 14 April 1561 (broadsheet, 1561)",
        "excerpt": "This hand-colored woodcut news-sheet reports that at dawn on 14 April 1561, the people of Nuremberg looked up to see the sky filled with globes, crosses, and blood-red, black, and blue cylindrical tubes out of which flew spheres, which seemed to battle one another before a great black spear-shaped object appeared and the whole spectacle fell burning to earth. The printed German text below the image frames the apparition as a divine sign and warning, urging citizens to repent, a vivid early-modern instance of witnesses straining to read meaning into unexplained shapes and lights in the sky. It survives as one of the most famous pre-modern 'UFO' documents, blending eyewitness wonder, dread, and the impulse to broadcast the strange sight as news.",
        "source": "Hans Glaser, broadsheet 'Himmelserscheinung über Nürnberg vom 14. April 1561,' Zentralbibliothek Zürich (Wickiana collection); via Wikimedia Commons (public domain)",
        "href": "https://commons.wikimedia.org/wiki/File:Himmelserscheinung_%C3%BCber_N%C3%BCrnberg_vom_14._April_1561.jpg",
        "image": {
          "src": "/covers/pentagon-uap-fourth-release--art.png",
          "alt": "A 1561 colored woodcut showing the sky over Nuremberg crowded with black, red, and blue spheres, tall cylindrical tubes emitting more spheres, crosses, and a large dark spear-shaped object, all above the city's rooftops, depicting a mass aerial apparition witnessed by the townspeople.",
          "credit": "Hans Glaser, 'Celestial phenomenon over Nuremberg, 14 April 1561' (broadsheet woodcut, 1561), Zentralbibliothek Zürich; via Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 35
  },
  {
    "slug": "anthony-hopkins-composer-decca",
    "headline": "Anthony Hopkins, 88, signs a record deal as a composer with Decca Classics",
    "overview": "Two-time Oscar-winning actor Anthony Hopkins released his first classical single, 'Bracken Road', on July 10, 2026 after signing to Decca Classics. His debut album 'Life Is a Dream', out August 21, gathers orchestral works written across six decades and inspired by his childhood in south Wales, performed by conductor Gustavo Dudamel and the Philharmonia Orchestra. Hopkins, who learned the piano at four, called it 'the honour of a lifetime'.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMipwFBVV95cUxNd29zU3Z3SXZTdk1Gb0V5cFVnRGVFQnhwSmJoYy1RYUxfYzZRRkJXblQ4ZjRlZEV3aW9EenF1dXl3MUpvc0VVVThBN2FGb1ZQZzQzNlEtdkZYNkZWMHhIZGxSNTBjVWFSNFRldmt2LUxuNHY0YVRONzNkYkV2VVpiUjZPVVN0Q3NXZm9ONFpyU2tJeGpfZU9FNTh5RGpDa21DV19jTHpXbw?oc=5"
      },
      {
        "name": "Variety",
        "href": "https://variety.com/2026/music/news/anthony-hopkins-decca-classics-life-is-a-dream-album-1236806236/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-10",
    "image": {
      "src": "/covers/anthony-hopkins-composer-decca.png",
      "alt": "Actor and composer Anthony Hopkins.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 10 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Cicero, Cato Maior de Senectute (On Old Age), §17 (44 BC)",
        "excerpt": "It is not by muscle, speed, or physical dexterity that great things are achieved, but by reflection, force of character, and judgement; in these qualities old age is usually not only not poorer, but is even richer.",
        "source": "Cicero, Cato Maior de Senectute, trans. William Armistead Falconer (1923); Perseus Digital Library (public domain)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A2007.01.0039%3Asection%3D17"
      },
      {
        "category": "historical",
        "title": "Grandma Moses takes up painting in her late 70s (from c. 1938)",
        "excerpt": "Anna Mary Robertson 'Grandma Moses' was a Hudson Valley farm wife who had stitched pictures in wool for pleasure until arthritis stiffened her hands; only in her late seventies did she switch to a brush and begin painting the rural scenes she remembered. Discovered in a drugstore window in 1938 and given a New York solo show, 'What a Farmwife Painted,' in 1940, she became a national celebrity in her nineties and painted almost daily until she died at 101, living proof that a hidden gift can flower at the very end of a long life.",
        "source": "Bennington Museum, 'Grandma Moses' (holds the largest public collection of her work)",
        "href": "https://benningtonmuseum.org/portfolio-items/grandma-moses/"
      },
      {
        "category": "literary",
        "title": "Pedro Calderón de la Barca, La vida es sueño, Jornada II — Segismundo's soliloquy (1635)",
        "excerpt": "Yo sueño que estoy aquí\nDestas prisiones cargado,\nY soñé que en otro estado\nMas lisonjero me vi.\n¿Qué es la vida? — Un frenesí.\n¿Qué es la vida? — Una ilusión,\nUna sombra, una ficción,\nY el mayor bien es pequeño:\nQue toda la vida es sueño,\nY los sueños sueño son.",
        "source": "Pedro Calderón de la Barca, La vida es sueño (1635); Wikisource (Spanish, public domain). The play's title is echoed by Hopkins's debut album 'Life Is a Dream.'",
        "href": "https://es.wikisource.org/wiki/La_vida_es_sue%C3%B1o/II"
      },
      {
        "category": "literary",
        "title": "Michelangelo Buonarroti, Sonnet LXV, 'To Giorgio Vasari. On the Brink of Death' (c. 1554)",
        "excerpt": "Now hath my life across a stormy sea\n    Like a frail bark reached that wide port where all\n    Are bidden, ere the final reckoning fall\n    Of good and evil for eternity.\nNow know I well how that fond phantasy\n    Which made my soul the worshipper and thrall\n    Of earthly art, is vain; how criminal\n    Is that which all men seek unwillingly.\nThose amorous thoughts which were so lightly dressed,\n    What are they when the double death is nigh?\n    The one I know for sure, the other dread.\nPainting nor sculpture now can lull to rest\n    My soul that turns to His great love on high,\n    Whose arms to clasp us on the cross were spread.",
        "source": "The Sonnets of Michael Angelo Buonarroti, trans. John Addington Symonds (1878); Project Gutenberg (public domain). The supreme sculptor and painter revealed, in old age, as a maker in a second art — poetry.",
        "href": "https://www.gutenberg.org/cache/epub/10314/pg10314.html.utf8"
      },
      {
        "category": "artistic",
        "title": "Giuseppe Verdi, Falstaff — closing fugue 'Tutto nel mondo è burla' (first performed La Scala, 1893)",
        "excerpt": "Tutto nel mondo è burla.\nL'uom è nato burlone,\nLa fede in cor gli ciurla,\nGli ciurla la ragione.\nTutti gabbati! Irride\nL'un l'altro ogni mortal.\nMa ride ben chi ride\nLa risata final.",
        "source": "Giuseppe Verdi, Falstaff (1893), his last opera, composed at the age of 79–80; libretto by Arrigo Boito. Score public domain via IMSLP; libretto text verified at opera-guide.ch.",
        "href": "https://imslp.org/wiki/Falstaff_(Verdi,_Giuseppe)"
      },
      {
        "category": "artistic",
        "title": "Titian, Pietà (1575–1576), Gallerie dell'Accademia, Venice",
        "excerpt": "Titian painted this vast, torch-lit Pietà in his mid-eighties as an offering for his own tomb, and it stood still unfinished on his easel when he died in 1576. Working in loose, almost dissolving strokes — his celebrated 'late style' — the greatest master of the Venetian Renaissance turned at the very end of his life to his most personal and searching image: a grieving Virgin cradling the dead Christ. Left incomplete at his death, it was finished by the younger painter Palma Giovane.",
        "source": "Titian, Pietà, 1575–1576, Gallerie dell'Accademia, Venice; via Wikimedia Commons (public domain)",
        "href": "https://en.wikipedia.org/wiki/Piet%C3%A0_(Titian)",
        "image": {
          "src": "/covers/anthony-hopkins-composer-decca--art.png",
          "alt": "A shadowed Venetian altarpiece: the seated Virgin Mary cradles the pale, dead body of Christ within a stone niche flanked by statues, a kneeling old man (Saint Jerome, a self-portrait of the aged Titian) reaching toward the body, painted in loose, smoky late-style brushwork.",
          "credit": "Titian, Pietà, 1575–1576, Gallerie dell'Accademia, Venice; via Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 36
  },
  {
    "slug": "formwork-crouch-end-house",
    "headline": "Formwork Architects turns a derelict north London care home into a light-filled family house",
    "overview": "London studio Formwork Architects has transformed a long-derelict Edwardian care home in Crouch End, north London - the subject of years of contested developer proposals - into a single family home, Dezeen reported on July 10, 2026. The scheme expands the basement and adds a two-storey brick extension around a sunken patio to draw daylight into the rear, finished in a pared-back palette of white walls, pale timber floors and bespoke joinery.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Dezeen",
        "href": "https://www.dezeen.com/2026/07/10/formwork-architects-crouch-end-house/"
      },
      {
        "name": "Wallpaper*",
        "href": "https://www.wallpaper.com/architecture/residential/crouch-end-house-formwork-architects"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-10",
    "image": {
      "src": "/covers/formwork-crouch-end-house.png",
      "alt": "An Edwardian housing terrace in Crouch End, north London.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 10 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Paul the Deacon, History of the Langobards, Book IV.36 — the Pantheon made the church of St Mary and All the Martyrs (event 609 AD; written c. 787–796, trans. 1907)",
        "excerpt": "He commanded, at the request of another pope Boniface, that the Church of the Ever-blessed Virgin Mary and of all the Martyrs should be established in the old temple which was called the Pantheon, after all the uncleannesses of idolatry had been removed, so that where formerly the worship, not of all the gods, but of all the devils was performed, there at last there should be a memorial of all the saints.",
        "source": "Paul the Deacon, History of the Langobards, Book IV, ch. 36, trans. William Dudley Foulke (Univ. of Pennsylvania, 1907)",
        "href": "https://archive.org/details/historyoflangoba00pauluoft"
      },
      {
        "category": "historical",
        "title": "John Ruskin, 'The Lamp of Memory,' The Seven Lamps of Architecture (1849) — a founding text of the modern conservation-and-reuse movement",
        "excerpt": "Watch an old building with an anxious care; guard it as best you may, and at any cost from every influence of dilapidation. Count its stones as you would jewels of a crown; set watches about it as if at the gates of a besieged city; bind it together with iron where it loosens; stay it with timber where it declines; do not care about the unsightliness of the aid; better a crutch than a lost limb; and do this tenderly, and reverently, and continually, and many a generation will still be born and pass away beneath its shadow.",
        "source": "John Ruskin, The Seven Lamps of Architecture (1849), 'The Lamp of Memory' — Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/35898/pg35898.txt"
      },
      {
        "category": "literary",
        "title": "Genesis 1:1–5, 'Let there be light' — King James Bible (1611/1769 Oxford)",
        "excerpt": "In the beginning God created the heaven and the earth. And the earth was without form, and void; and darkness was upon the face of the deep. And the Spirit of God moved upon the face of the waters. And God said, Let there be light: and there was light. And God saw the light, that it was good: and God divided the light from the darkness.",
        "source": "The Holy Bible (King James Version), Genesis, Chapter 1 — Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Genesis"
      },
      {
        "category": "literary",
        "title": "Frances Hodgson Burnett, The Secret Garden (1911) — the neglected walled garden found to be alive",
        "excerpt": "Mary touched it herself in an eager, reverent way. “That one?” she said. “Is that one quite alive quite?” Dickon curved his wide smiling mouth. “It’s as wick as you or me,” he said; and Mary remembered that Martha had told her that “wick” meant “alive” or “lively.” “I’m glad it’s wick!” she cried out in her whisper. “I want them all to be wick. Let us go round the garden and count how many wick ones there are.”",
        "source": "Frances Hodgson Burnett, The Secret Garden (1911) — Project Gutenberg, ebook #113",
        "href": "https://www.gutenberg.org/cache/epub/113/pg113.txt"
      },
      {
        "category": "artistic",
        "title": "Henry Rowley Bishop (music) & John Howard Payne (words), 'Home! Sweet Home!' from the opera Clari, or The Maid of Milan (1823)",
        "excerpt": "’Mid pleasures and palaces though we may roam, / Be it ever so humble, there’s no place like home; / A charm from the sky seems to hallow us there, / Which, seek through the world, is ne’er met with elsewhere. / Home! Home! sweet, sweet Home! / There’s no place like Home! there’s no place like Home!",
        "source": "'Home, Sweet Home' (Bishop, Henry Rowley) — IMSLP/Petrucci Music Library; words by John Howard Payne (public domain)",
        "href": "https://imslp.org/wiki/Home,_Sweet_Home_(Bishop,_Henry_Rowley)"
      },
      {
        "category": "artistic",
        "title": "Pieter de Hooch, A Maid with a Child in a Pantry (c. 1656–1660), Rijksmuseum, Amsterdam",
        "excerpt": "In a quiet Dutch burgher's house a maid stoops to hand a jug to a small child, the two framed by the dark doorway of a cool cellar pantry. Beyond them the eye is drawn through an open passage into a front room where daylight streams across the tiled floor, so that the whole painting becomes a study of light let into the shadowed inner rooms of a home. De Hooch turns the ordinary business of a household into an image of order, care and welcome, the domestic interior redeemed and made luminous.",
        "source": "Pieter de Hooch, A Maid with a Child in a Pantry (c. 1656–1660), Rijksmuseum, Amsterdam (object SK-A-182)",
        "href": "https://www.rijksmuseum.nl/en/collection/SK-A-182",
        "image": {
          "src": "/covers/formwork-crouch-end-house--art.png",
          "alt": "Sunlit Dutch Golden Age interior: a maidservant kneels to give a jug to a young boy at the doorway of a cool tiled pantry, while beyond an open passage daylight floods a front room, drawing the eye through the house.",
          "credit": "Pieter de Hooch, A Maid with a Child in a Pantry, c. 1656–1660, Rijksmuseum, Amsterdam; via Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 37
  },
  {
    "slug": "gil-batle-porcelain-prison-plates",
    "headline": "Gil Batle paints scenes of incarceration and freedom onto porcelain plates in a New York show",
    "overview": "Self-taught artist Gil Batle, who learned to draw and carve during 25 years in California prisons, is showing surreal blue-and-white paintings on porcelain plates in 'Double Life' at Ricco/Maresca gallery in New York, Colossal reported on July 10, 2026. The domestic tableware becomes a ground for imagery of bird cages, chains and barbed wire, setting confinement against a longing for freedom; the exhibition runs through August 21.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Colossal",
        "href": "https://www.thisiscolossal.com/2026/07/gil-batle-porcelain-plate-paintings/"
      },
      {
        "name": "Ricco/Maresca Gallery",
        "href": "https://www.riccomaresca.com/artists/gil-batle"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-10",
    "image": {
      "src": "/covers/gil-batle-porcelain-prison-plates.png",
      "alt": "A blue-and-white porcelain plate painted by Gil Batle with figures, birds and cages.",
      "credit": "Gil Batle / Ricco Maresca Gallery, via Colossal"
    },
    "edition": "Evening Edition · 10 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Boethius, The Consolation of Philosophy, Book III, Song II — written awaiting execution in prison, c. 524 AD",
        "excerpt": "And the woodland songster, pent\nIn forlorn imprisonment,\nThough a mistress' lavish care\nStore of honeyed sweets prepare;\nYet, if in his narrow cage,\nAs he hops from bar to bar,\nHe should spy the woods afar,\nCool with sheltering foliage,\nAll these dainties he will spurn,\nTo the woods his heart will turn;\nOnly for the woods he longs,\nPipes the woods in all his songs.",
        "source": "Boethius, The Consolation of Philosophy, trans. H. R. James (1897); Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/14328/pg14328.txt"
      },
      {
        "category": "historical",
        "title": "Miguel de Cervantes, Don Quixote, Author's Preface — the book \"begotten in a prison\" (Part I, 1605)",
        "excerpt": "shrivelled, whimsical offspring, full of thoughts of all sorts and such as never came into any other imagination—just what might be begotten in a prison, where every misery is lodged and every doleful sound makes its dwelling? Tranquillity, a cheerful retreat, pleasant fields, bright skies, murmuring brooks, peace of mind, these are the things that go far to make even the most barren muses fertile, and bring into the world births that fill it with wonder and delight.",
        "source": "Miguel de Cervantes, Don Quixote, trans. John Ormsby; Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/996/pg996.txt"
      },
      {
        "category": "literary",
        "title": "Oscar Wilde, \"The Ballad of Reading Gaol\" (1898)",
        "excerpt": "But I never saw a man who looked\nSo wistfully at the day.\n\nI never saw a man who looked\nWith such a wistful eye\nUpon that little tent of blue\nWhich prisoners call the sky,\nAnd at every drifting cloud that went\nWith sails of silver by.",
        "source": "Oscar Wilde, The Ballad of Reading Gaol; Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/301/pg301.txt"
      },
      {
        "category": "literary",
        "title": "Paul Laurence Dunbar, \"Sympathy\" (1899) — \"I know why the caged bird sings\"",
        "excerpt": "I know what the caged bird feels, alas!\n   When the sun is bright on the upland slopes;\nWhen the wind stirs soft through the springing grass,\nAnd the river flows like a stream of glass;\n   When the first bird sings and the first bud opes,\nAnd the faint perfume from its chalice steals--\nI know what the caged bird feels!\n\nI know why the caged bird beats his wing\n   Till its blood is red on the cruel bars;\nFor he must fly back to his perch and cling\nWhen he fain would be on the bough a-swing;\n   And a pain still throbs in the old, old scars\nAnd they pulse again with a keener sting--\nI know why he beats his wing!\n\nI know why the caged bird sings, ah me,\n   When his wing is bruised and his bosom sore,--\nWhen he beats his bars and he would be free;\nIt is not a carol of joy or glee,\n   But a prayer that he sends from his heart's deep core,\nBut a plea, that upward to Heaven he flings--\nI know why the caged bird sings!",
        "source": "Paul Laurence Dunbar, The Complete Poems of Paul Laurence Dunbar; Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Complete_Poems_of_Paul_Laurence_Dunbar/Sympathy"
      },
      {
        "category": "artistic",
        "title": "Ludwig van Beethoven, \"O welche Lust\" (Prisoners' Chorus), Act I of Fidelio, Op. 72 (final version 1814)",
        "excerpt": "O welche Lust, in freier Luft / Den Atem leicht zu heben! / Nur hier, nur hier ist Leben! / Der Kerker eine Gruft. (Oh what joy, in the open air freely to breathe again! Here alone is life; the dungeon is a grave.) In Beethoven's only opera the prisoners are led briefly from their cells into daylight, and this hushed, swelling chorus of confined men reaching toward light and free air is one of music's supreme images of captivity yearning for freedom.",
        "source": "Ludwig van Beethoven, Fidelio, Op. 72; International Music Score Library Project (IMSLP)",
        "href": "https://imslp.org/wiki/Fidelio,_Op.72_(Beethoven,_Ludwig_van)"
      },
      {
        "category": "artistic",
        "title": "Giovanni Battista Piranesi, \"Prisoners on a Projecting Platform,\" from Carceri d'invenzione (Imaginary Prisons), etching, ca. 1749–1760",
        "excerpt": "Piranesi's Carceri conjure vast, impossible dungeons of soaring vaults, endless stairs, hanging chains, ropes and instruments of torture, in which tiny human figures are dwarfed and lost. In this plate prisoners stand marooned on a jutting platform amid a labyrinth of arches and machinery that recedes into shadow with no visible exit. Etched from imagination rather than any real jail, it renders confinement as a boundless architecture of the mind—the same theatre of cages, chains and thwarted escape that Gil Batle inks in blue onto his plates.",
        "source": "Giovanni Battista Piranesi, Carceri d'invenzione; The Metropolitan Museum of Art (via Wikimedia Commons, public domain)",
        "href": "https://www.metmuseum.org/art/collection/search/362671",
        "image": {
          "src": "/covers/gil-batle-porcelain-prison-plates--art.png",
          "alt": "Etching of a colossal, shadowy imaginary prison interior: massive stone arches, staircases and beams recede into darkness while small human figures stand on a projecting platform amid ropes, chains and machinery, with no clear way out.",
          "credit": "Giovanni Battista Piranesi, \"Prisoners on a Projecting Platform,\" from Carceri d'invenzione (Imaginary Prisons), etching, ca. 1749–1760; The Metropolitan Museum of Art; via Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 38
  },
  {
    "slug": "imago-ethical-ai-music-player",
    "headline": "Designers unveil Imago, an offline audio player that runs only artist-consented AI models",
    "overview": "Central Saint Martins graduates Domenico di Paolo and Kieran Feechan have designed Imago, a domestic audio player that turns a critical eye on AI in music, Dezeen reported on July 10, 2026. A small aluminium puck holds an NFC key that unlocks an AI model trained solely on sounds a musician has willingly provided; listeners reshape those sounds by hand, entirely offline, with no scraping, cloud or data leaving the device.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Dezeen",
        "href": "https://www.dezeen.com/2026/07/10/imago-audio-player-ai-music/"
      },
      {
        "name": "DesignWanted",
        "href": "https://designwanted.com/imago-ai-deep-listening-device-design/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-10",
    "image": {
      "src": "/covers/imago-ethical-ai-music-player.png",
      "alt": "A small minimalist aluminium audio player disc resting on a shelf in a quiet room.",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 10 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Statute of Anne, 'An Act for the Encouragement of Learning' (1710)",
        "excerpt": "Whereas printers, booksellers, and other persons have of late frequently taken the liberty of printing, reprinting, and publishing, or causing to be printed, reprinted, and published, books and other writings, without the consent of the authors or proprietors of such books and writings, to their very great detriment, and too often to the ruin of them and their families: for preventing therefore such practices for the future, and for the encouragement of learned men to compose and write useful books...",
        "source": "The Statute of Anne, 1710, The Avalon Project, Yale Law School",
        "href": "https://avalon.law.yale.edu/18th_century/anne_1710.asp"
      },
      {
        "category": "historical",
        "title": "White-Smith Music Publishing Co. v. Apollo Co., 209 U.S. 1 (1908)",
        "excerpt": "A 'copy' of a musical composition within the meaning of the copyright statute is a written or printed record of it in intelligible notation and this does not include perforated rolls.",
        "source": "White-Smith Music Publishing Company v. Apollo Company, U.S. Supreme Court, via Wikisource",
        "href": "https://en.wikisource.org/wiki/White-Smith_Music_Publishing_Company_v._Apollo_Company"
      },
      {
        "category": "literary",
        "title": "Ovid, Metamorphoses, Book VI - Apollo and Marsyas (c. 8 CE)",
        "excerpt": "his living skin was ripped off from his limbs, till his whole body was a flaming wound, with nerves and veins and viscera exposed.",
        "source": "Ovid, Metamorphoses (Brookes More translation), Perseus Digital Library, Tufts University",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0028:book=6:card=382"
      },
      {
        "category": "literary",
        "title": "E. T. A. Hoffmann, 'The Sand-Man' (Der Sandmann, 1816)",
        "excerpt": "Olimpia played on the piano with great skill; and sang as skilfully an aria di bravura, in a voice which was, if anything, almost too sharp, but clear as glass bells.",
        "source": "E. T. A. Hoffmann, The Sand-Man (trans. J. T. Bealby), Project Gutenberg Australia",
        "href": "https://gutenberg.net.au/ebooks06/0605791h.html"
      },
      {
        "category": "artistic",
        "title": "Anatoly Lyadov, 'Une tabatière à musique' (The Musical Snuff-Box), Op. 32 (1893)",
        "excerpt": "A delicate piano miniature in which the composer imitates the thin, tinkling chime of a wind-up music box, its melody circling within a fixed, mechanical loop. The piece is the machine that makes music rendered directly in sound - a human hand impersonating a clockwork device, raising in reverse the very question Imago poses: where the living voice ends and the automaton's begins.",
        "source": "Anatoly Lyadov, Une tabatière à musique, Op. 32, IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/The_Music_Box,_Op.32_(Lyadov,_Anatoly)"
      },
      {
        "category": "artistic",
        "title": "Herbert James Draper, 'Ulysses and the Sirens' (1909)",
        "excerpt": "Draper paints the moment the Sirens' song reaches across the water - Ulysses bound to the mast, his crew rowing with stopped ears while the singers climb aboard to seize the listener their voices have entranced. The picture makes the captivating voice itself the prize and the peril, a meditation on a song so powerful others would take and be taken by it - the ownership of a creative voice, and the danger of a sound that cannot be resisted.",
        "source": "Herbert James Draper, Ulysses and the Sirens, Ferens Art Gallery, Kingston upon Hull; via Wikimedia Commons (public domain)",
        "href": "https://commons.wikimedia.org/wiki/File:Ulysses_and_the_Sirens_by_H.J._Draper.jpg",
        "image": {
          "src": "/covers/imago-ethical-ai-music-player--art.png",
          "alt": "Oil painting of Ulysses bound to the mast of his ship as three Sirens, depicted as bare-shouldered women, climb from the sea over the vessel's side while oarsmen strain at their benches.",
          "credit": "Herbert James Draper, Ulysses and the Sirens, 1909, Ferens Art Gallery, Kingston upon Hull; via Wikimedia Commons (public domain)"
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
