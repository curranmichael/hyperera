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
const stories: Story[] = [
  {
    "slug": "trump-america-250th-anniversary-speech",
    "headline": "Trump celebrates America's 250th anniversary with a speech mixing patriotism and partisanship as storms delay festivities",
    "overview": "President Donald Trump marked the 250th anniversary of American independence on July 4, 2026 with a speech that blended patriotic celebration with partisan attacks, after storms and extreme weather delayed festivities across the country. Addressing crowds amid fireworks and flyovers, he lauded the United States on its semiquincentennial. The holiday was marred by scorching heat and violent storms in several states.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP News",
        "href": "https://apnews.com/article/trump-july-4-250-anniversary"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiZ0FVX3lxTFBFTG1RdVl1QXdrZVdUSWdEWk85cmdXZ19UV1RNajhWUDVTenIzcS1lLUFQWHhEYl9jUkg4TndRQUZfa05NdE1sV3dTdWZkSFhiRzEwaXh6VjRlYWFQRHF3bDNBbFMzeTg?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-05",
    "image": {
      "src": "/covers/trump-america-250th-anniversary-speech.png",
      "alt": "A Fourth of July fireworks display marking the 250th anniversary of American independence",
      "credit": "BBC"
    },
    "lead": true,
    "edition": "Evening Edition · 5 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Declaration of Independence (1776)",
        "excerpt": "When in the Course of human events, it becomes necessary for one people to dissolve the political bands which have connected them with another, and to assume among the powers of the earth, the separate and equal station to which the Laws of Nature and of Nature's God entitle them... We hold these truths to be self-evident, that all men are created equal, that they are endowed by their Creator with certain unalienable Rights, that among these are Life, Liberty and the pursuit of Happiness.",
        "source": "The Declaration of Independence, July 4, 1776 (U.S. National Archives transcript)",
        "href": "https://www.archives.gov/founding-docs/declaration-transcript"
      },
      {
        "category": "historical",
        "title": "Lincoln's \"House Divided\" Speech (1858)",
        "excerpt": "\"A house divided against itself cannot stand.\" I believe this government cannot endure permanently half slave and half free. I do not expect the Union to be dissolved—I do not expect the house to fall—but I do expect it will cease to be divided.",
        "source": "Abraham Lincoln, \"House Divided\" Speech, Springfield, Illinois, June 16, 1858",
        "href": "https://en.wikisource.org/wiki/House_Divided_Speech"
      },
      {
        "category": "literary",
        "title": "The Storm of Omens in Julius Caesar",
        "excerpt": "But never till tonight, never till now, / Did I go through a tempest dropping fire. / Either there is a civil strife in heaven, / Or else the world too saucy with the gods, / Incenses them to send destruction. ... When these prodigies / Do so conjointly meet, let not men say, / \"These are their reasons; they are natural\"; / For I believe, they are portentous things / Unto the climate that they point upon.",
        "source": "William Shakespeare, The Tragedy of Julius Caesar, Act I, Scene 3 (Casca)",
        "href": "https://www.gutenberg.org/cache/epub/1522/pg1522.txt"
      },
      {
        "category": "literary",
        "title": "Whitman's \"I Hear America Singing\"",
        "excerpt": "I hear America singing, the varied carols I hear, / Those of mechanics, each one singing his as it should be blithe and strong, / The carpenter singing his as he measures his plank or beam, / The mason singing his as he makes ready for work, or leaves off work, / The boatman singing what belongs to him in his boat, the deckhand singing on the steamboat deck, / The shoemaker singing as he sits on his bench, the hatter singing as he stands, / The wood-cutter's song, the ploughboy's on his way in the morning, or at noon intermission or at sundown, / The delicious singing of the mother, or of the young wife at work, or of the girl sewing or washing, / Each singing what belongs to him or her and to none else, / The day what belongs to the day—at night the party of young fellows, robust, friendly, / Singing with open mouths their strong melodious songs.",
        "source": "Walt Whitman, \"I Hear America Singing,\" Leaves of Grass",
        "href": "https://www.gutenberg.org/cache/epub/1322/pg1322.txt"
      },
      {
        "category": "artistic",
        "title": "Sousa, The Stars and Stripes Forever",
        "excerpt": "Sousa's rousing 1896–97 march became an unofficial national anthem, its soaring piccolo obbligato and swelling brass the very sound of American civic ceremony and Fourth-of-July pageantry. Composed as a patriotic exultation, it carries the same blend of triumphal spectacle and mass public ritual that frames a national jubilee. The freely downloadable IMSLP scores preserve the march in Sousa's original band and orchestral arrangements.",
        "source": "John Philip Sousa, The Stars and Stripes Forever (1896–97), IMSLP",
        "href": "https://imslp.org/wiki/The_Stars_and_Stripes_Forever_(Sousa,_John_Philip)"
      },
      {
        "category": "artistic",
        "title": "Trumbull's Declaration of Independence",
        "excerpt": "Trumbull's monumental 1819 canvas stages the founding as solemn civic theater: the drafting committee presents the Declaration to a hushed Congress in a chamber ordered by draped flags and disciplined ranks of seated delegates. Though it depicts unity and shared purpose, it is a deliberate idealization—the figures were never all in one room—an image of national origin as ceremony rather than fact. Hanging in the Capitol Rotunda, it remains the archetypal picture of American founding ritual.",
        "source": "John Trumbull, Declaration of Independence (1819), oil on canvas, U.S. Capitol Rotunda",
        "href": "https://commons.wikimedia.org/wiki/File:Declaration_of_Independence_(1819),_by_John_Trumbull.jpg",
        "image": {
          "src": "/covers/trump-america-250th-anniversary-speech--art.png",
          "alt": "A large history painting showing the five-man drafting committee, led by Thomas Jefferson, presenting the Declaration of Independence to John Hancock and the seated Continental Congress in a red-draped chamber hung with military flags and drums.",
          "credit": "John Trumbull, Declaration of Independence, 1819; public domain (published before 1931); via Wikimedia Commons"
        }
      }
    ],
    "rank": 1
  },
  {
    "slug": "iberia-greece-wildfires-thessaloniki",
    "headline": "Wildfires sweep Portugal, Greece and Spain as a blaze near Thessaloniki forces evacuations",
    "overview": "Fast-moving wildfires spread across Portugal, Greece and Spain on July 5, 2026 amid an intense heatwave, with a blaze near Greece's second-largest city, Thessaloniki, forcing evacuations as smoke blanketed suburbs. Greek authorities warned residents about toxic smoke as crews battled multiple fronts. Firefighting aircraft and hundreds of personnel were deployed across the three countries.",
    "genre": "Climate",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMiqAFBVV95cUxNU0Q0S2Z4bFgtWUxEZWYyN0htZWEzOU5Vb01WdkNSMWZfb0lUQU5neW5KY25qSmQ1OXdYNWhXR2tITXQtRzBnbUE3b3FBQjFzblFQU0l5YlhHcW5ZZXpHLUlUNXhGN21pVm9oWkpGVm91ZXRudzBiYjhBMjdNLXhBU2F3bU9FaS1mM05CWENIdXhzcEFvZ0ExcHFkek0yb0VIQW45UEl0TVY?oc=5"
      },
      {
        "name": "AP News (Thessaloniki)",
        "href": "https://news.google.com/rss/articles/CBMiswFBVV95cUxNNF9KV0VCbmtrWndvSGMtZm4zMEdtMlJZSzVJZWxSY1ljeFBJZlF4ejk3b0pHX1VGQW1QOVNuaVQ0NEJ2eThVc0tRVUJuZk9ldHFSU3c4c0FxcDdwbDFVTm12TVFsOTBPbUpxZnlIWC16akQxdkxrbWpyenRKMVprQ2xSWmFJRm1HT2JBaVRiRVFHUm9Qa05JUjN0Yy1Mc1B2WDVzNl9CU0sxeXdSa1NaZThGQQ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-05",
    "image": {
      "src": "/covers/iberia-greece-wildfires-thessaloniki.png",
      "alt": "Tall orange flames and billowing smoke from a fast-moving forest wildfire",
      "credit": "Public domain via Wikimedia Commons"
    },
    "edition": "Evening Edition · 5 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Great Fire of Rome under Nero (AD 64)",
        "excerpt": "It had its beginning in that part of the circus which adjoins the Palatine and Cælian hills, where, amid the shops containing inflammable wares, the conflagration both broke out and instantly became so fierce and so rapid from the wind that it seized in its grasp the entire length of the circus.",
        "source": "Tacitus, Annals, Book XV.38 (trans. Church and Brodribb), Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0078:book=15:chapter=38"
      },
      {
        "category": "historical",
        "title": "The Great Fire of London, 2 September 1666",
        "excerpt": "the poor pigeons, I perceive, were loth to leave their houses, but hovered about the windows and balconys till they were, some of them burned, their wings, and fell down.",
        "source": "The Diary of Samuel Pepys, entry for 2 September 1666 (Volume 45: August/September 1666), Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/4167/pg4167.txt"
      },
      {
        "category": "literary",
        "title": "Phaethon sets the world ablaze — Ovid's Metamorphoses",
        "excerpt": "Great cities perish with their walls, and peopled nations are consumed to dust—the forests and the mountains are destroyed.",
        "source": "Ovid, Metamorphoses, Book II (Phaethon), trans. Brookes More, Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0028:book=2:card=201"
      },
      {
        "category": "literary",
        "title": "The burning of Troy — Virgil's Aeneid",
        "excerpt": "Thus, when a flood of fire by wind is borne, Crackling it rolls, and mows the standing corn.",
        "source": "Virgil, Aeneid, Book II (trans. John Dryden), Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0052:book=2:card=298"
      },
      {
        "category": "artistic",
        "title": "Wagner's Magic Fire Music (Feuerzauber) from Die Walküre",
        "excerpt": "As the drama closes, Wotan strikes the rock with his spear and cries out to the god of fire—\"Loge, hör'! Lausche hieher!\"—summoning a wall of flame to encircle the sleeping Brünnhilde. The orchestra erupts into shimmering, flickering figuration in the strings and woodwinds, a musical conflagration of rising, curling tongues of fire that both menaces and dazzles. It is one of music's most vivid evocations of fire as something at once beautiful and terrifying.",
        "source": "Richard Wagner, Die Walküre, WWV 86B (Act III finale, 'Magic Fire Music'), full score, IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Die_Walküre,_WWV_86B_(Wagner,_Richard)"
      },
      {
        "category": "artistic",
        "title": "Turner — The Burning of the Houses of Lords and Commons",
        "excerpt": "Turner witnessed the 1834 blaze that destroyed Britain's Houses of Parliament and rendered it as a vortex of incandescent orange and yellow, the flames roaring up into the night sky and doubling in the black water of the Thames. A crowd of tiny spectators massed on Westminster Bridge is dwarfed by the inferno, capturing the sublime terror and awe of an unstoppable fire consuming a great city.",
        "source": "J.M.W. Turner, 'The Burning of the Houses of Lords and Commons, October 16, 1834' (1835), oil on canvas, Philadelphia Museum of Art",
        "href": "https://commons.wikimedia.org/wiki/File:Joseph_Mallord_William_Turner,_English_-_The_Burning_of_the_Houses_of_Lords_and_Commons,_October_16,_1834_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/iberia-greece-wildfires-thessaloniki--art.png",
          "alt": "A blazing fire engulfs the Houses of Parliament along the Thames at night; brilliant orange and yellow flames surge into a smoke-filled sky and reflect on the water, with a dark crowd of onlookers on Westminster Bridge to the right.",
          "credit": "J.M.W. Turner, 'The Burning of the Houses of Lords and Commons, October 16, 1834' (1835); Philadelphia Museum of Art; public domain (Google Art Project), via Wikimedia Commons"
        }
      }
    ],
    "rank": 2
  },
  {
    "slug": "nato-summit-trump-loyalty-turkey",
    "headline": "NATO chief Rutte faces a summit test in Turkey as Trump demands 'loyalty' from allies",
    "overview": "Ahead of a NATO summit in Turkey, Secretary-General Mark Rutte is under pressure as President Trump demands 'loyalty' from allies rather than just higher defense spending, US and European officials said on July 5, 2026. Frustrated that some members declined to join the recent Iran war, Trump said 'I just want loyalty,' shifting the alliance's long-running burden-sharing debate. Rutte has leaned on flattery to keep Washington anchored to the alliance.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMirwFBVV95cUxOeTZHUDdWLUd3UnJha291NEVncUFKaEotUFFjaV9iVFlTTFRnMlpEU0NmdnFVa3p3VWEyVHlvTjctUm1hYWtSaURwdXloTS1YZmFZeS1TN0lMeFhrUVdnc29OZzBSWmhoR0tFZjFpN182dlktME50NDZhUkI2aVhicFJWSFZldVdsNUg2ckdBNnpyOXlBcXQ0RWJZaHRDUm1KT0lrNFdBSS1NeUJuUEIw?oc=5"
      },
      {
        "name": "The Washington Post",
        "href": "https://www.washingtonpost.com/world/2026/07/05/nato-summit-rutte-stoltenberg-trump-flattery-pitch/0df4d7ee-7830-11f1-b665-5f8be87f3787_story.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-05",
    "image": {
      "src": "/covers/nato-summit-trump-loyalty-turkey.png",
      "alt": "NATO Secretary-General Mark Rutte gestures beside a chart labelled 'The Trump Trillion' during a presentation",
      "credit": "AP Photo via ABC News"
    },
    "edition": "Evening Edition · 5 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Thucydides, History of the Peloponnesian War 5.89 (The Melian Dialogue)",
        "excerpt": "right, as the world goes, is only in question between equals in power, while the strong do what they can and the weak suffer what they must.",
        "source": "Thucydides, History of the Peloponnesian War, Book 5, ch. 89 (Richard Crawley translation), Perseus Digital Library, Tufts University",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0200:book=5:chapter=89:section=1"
      },
      {
        "category": "historical",
        "title": "Plutarch, Life of Aristides 25 (the founding oath of the Delian League)",
        "excerpt": "Aristides did, indeed, bind the Hellenes by an oath, and took oath himself for the Athenians, to mark his imprecations casting iron ingots into the sea; but afterwards, when circumstances, forsooth, compelled a more strenuous sway, he bade the Athenians lay the perjury to his own charge, and turn events to their own advantage.",
        "source": "Plutarch, Lives, \"Aristides\" 25.1 (Bernadotte Perrin translation, Loeb Classical Library, 1914), via LacusCurtius (Bill Thayer, University of Chicago)",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Plutarch/Lives/Aristides*.html"
      },
      {
        "category": "literary",
        "title": "Shakespeare, King Lear, Act 1, Scene 1 (Goneril's love-test flattery)",
        "excerpt": "Sir, I love you more than words can wield the matter; / Dearer than eyesight, space, and liberty; / Beyond what can be valued, rich or rare; / No less than life, with grace, health, beauty, honour; / As much as child e'er lov'd, or father found; / A love that makes breath poor, and speech unable.",
        "source": "William Shakespeare, King Lear, Act I, Scene 1, Project Gutenberg eBook #1794",
        "href": "https://www.gutenberg.org/cache/epub/1794/pg1794.txt"
      },
      {
        "category": "literary",
        "title": "Shakespeare, Julius Caesar, Act 2, Scene 1 (Decius on how to flatter Caesar)",
        "excerpt": "I can o'ersway him, for he loves to hear / That unicorns may be betray'd with trees, / And bears with glasses, elephants with holes, / Lions with toils, and men with flatterers; / But when I tell him he hates flatterers, / He says he does, being then most flattered.",
        "source": "William Shakespeare, Julius Caesar, Act II, Scene 1, Project Gutenberg eBook #1785",
        "href": "https://www.gutenberg.org/cache/epub/1785/pg1785.txt"
      },
      {
        "category": "artistic",
        "title": "Mozart, La clemenza di Tito, K.621 (opera on loyalty to and betrayal of the emperor Titus)",
        "excerpt": "Mozart's final opera seria stages a court where profession of loyalty and actual fidelity come apart: the emperor Titus is surrounded by allies who swear devotion even as a conspiracy grows against him. The drama turns on whether a ruler holds his coalition by extracting fealty or by clemency, and on how flattery masks divided allegiance beneath the throne.",
        "source": "Wolfgang Amadeus Mozart, La clemenza di Tito, K.621 (1791), full scores including the Breitkopf & Härtel edition, International Music Score Library Project (IMSLP)",
        "href": "https://imslp.org/wiki/La_clemenza_di_Tito,_K.621_(Mozart,_Wolfgang_Amadeus)"
      },
      {
        "category": "artistic",
        "title": "Jacques-Louis David, Oath of the Horatii (Le Serment des Horaces), 1784",
        "excerpt": "Three brothers throw their arms toward the raised swords held by their father, binding themselves by oath to the Roman state before battle. David's austere composition freezes the moment a demand for loyalty crystallizes into a vow, the individual will subordinated to the collective cause even at the price of everything else.",
        "source": "Jacques-Louis David, Oath of the Horatii, 1784, oil on canvas, Musée du Louvre, Paris; Wikimedia Commons file page",
        "href": "https://commons.wikimedia.org/wiki/File:Jacques-Louis_David,_Le_Serment_des_Horaces.jpg",
        "image": {
          "src": "/covers/nato-summit-trump-loyalty-turkey--art.png",
          "alt": "Neoclassical painting: three Roman brothers stretch their arms in salute toward three swords held aloft by their father, swearing an oath of loyalty, while grieving women sit at the right.",
          "credit": "Jacques-Louis David, Oath of the Horatii (Le Serment des Horaces), 1784, oil on canvas, Musée du Louvre; public domain; via Wikimedia Commons"
        }
      }
    ],
    "rank": 3
  },
  {
    "slug": "north-korea-kim-naval-destroyer-tests",
    "headline": "North Korea's Kim observes weapons tests from a new naval destroyer, state media says",
    "overview": "North Korean leader Kim Jong Un observed cruise-missile launches and other weapons tests aboard a new naval destroyer, state media reported on July 5, 2026, presenting the tests as part of an effort to modernize the country's navy. The report did not specify when the launches took place. It came amid a broader push to expand North Korea's naval capabilities.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMipAFBVV95cUxObUtPQzRZazNmZzFnd1cwNzZrYURBeU9iMDhUenVZbE85TWRobGVLV2RDcEFtMjVjWEVZU1l1dzY5OWp1OEVBaFVjOTBQZXV0cVlTSXFtNTlmMVZFMS1vZFJxeUhoNTdvTGllMW9rUmhBenNVT0xYU1Y2UllhWHc2Ul9LV01IUW1SQ1NUc3lMWmdUV0FxVVZwaG1XUXVoRTdJRWdwWQ?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMi1wFBVV95cUxPWnlQN19oX094ZjZaN0llMDFKbFJLLUNqZVIydHQ3TU43bEJ2clVvTm1Ya2RvZmYxMGozR2diZGN1SzBPQmFIQkxkX3BfX0JObWhKckkxNjRZWUpqYUx0R3cxdF9kenMwVDRzOUVYUUNPNzJtVkt3R3pIeG8tbGNKclR0emZOS0lRbHR3Y1dKdnJtdjRCWnpqSzFKRDJxa0NnbENOWFZCNFJPQVZwWW9sdllCLV9VcnptcHVaMUhzS3Nkem5FWVhxNE9FNmI0bFVRZXVTMmRaYw?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-05",
    "image": {
      "src": "/covers/north-korea-kim-naval-destroyer-tests.png",
      "alt": "A grey guided-missile destroyer steaming at sea under an overcast sky",
      "credit": "US Navy photo, public domain via Wikimedia Commons"
    },
    "edition": "Evening Edition · 5 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Xerxes reviews his fleet at Abydos — Herodotus, Histories, Book VII (44–45)",
        "excerpt": "When Xerxes had come to the midst of Abydos, he desired to see the whole of his army; and this he could do, for a lofty seat of white stone had been set up for him on a hill there with that intent, built by the people of Abydos at the king's command. There Xerxes sat, and looked down on the sea-shore, viewing his army and his fleet; and as he viewed them he was fain to see the ships contend in a race. They did so, and the Phoenicians of Sidon won it; and Xerxes was pleased with the race, and with his armament.",
        "source": "Herodotus, The Persian Wars, trans. A. D. Godley (Wikisource)",
        "href": "https://en.wikisource.org/wiki/Herodotus_The_Persian_Wars_(Godley)/Book_VII"
      },
      {
        "category": "historical",
        "title": "Themistocles builds Athens' navy — Plutarch, Life of Themistocles (4)",
        "excerpt": "And, first of all, the Athenians being accustomed to divide amongst themselves the revenue proceeding from the silver mines at Laurium, he was the only man that durst propose to the people that this distribution should cease, and that with the money ships should be built to make war against the Aeginetans, who were the most flourishing people in all Greece, and by the number of their ships held the sovereignty of the sea. So that with this money an hundred ships were built, with which they afterwards fought against Xerxes.",
        "source": "Plutarch, Lives, trans. John Dryden (The Internet Classics Archive)",
        "href": "https://classics.mit.edu/Plutarch/themisto.html"
      },
      {
        "category": "literary",
        "title": "The Catalogue of Ships — Homer, Iliad, Book 2",
        "excerpt": "Tell me now, ye Muses that have dwellings on Olympus—for ye are goddesses and are at hand and know all things, whereas we hear but a rumour and know not anything—who were the captains of the Danaans and their lords. But the common folk I could not tell nor name, nay, not though ten tongues were mine and ten mouths and a voice unwearying. Now will I tell the captains of the ships and the ships in their order.",
        "source": "Homer, Iliad, trans. A. T. Murray (Perseus Digital Library)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0134%3Abook%3D2%3Acard%3D484"
      },
      {
        "category": "literary",
        "title": "The Revenge: A Ballad of the Fleet — Alfred, Lord Tennyson",
        "excerpt": "At Flores in the Azores Sir Richard Grenville lay, / And a pinnace, like a flutter'd bird, came flying from away: / 'Spanish ships of war at sea! we have sighted fifty-three!'",
        "source": "Alfred, Lord Tennyson, Ballads and Other Poems (Wikisource)",
        "href": "https://en.wikisource.org/wiki/The_Revenge:_A_Ballad_of_the_Fleet"
      },
      {
        "category": "artistic",
        "title": "Rule, Britannia! — Thomas Arne (from the masque Alfred, 1740)",
        "excerpt": "Arne's grand ode swells with the confidence of a nation that measures its power in warships, its refrain vowing that Britannia will forever rule the waves and never be enslaved. Trumpet flourishes and a rising, march-like chorus turn sea power itself into ceremony, the musical equivalent of a fleet drawn up for a sovereign's inspection. It endures as an anthem in which naval might, national pride, and spectacle are inseparable.",
        "source": "Rule Britannia (Arne, Thomas Augustine) — full score (IMSLP / Petrucci Music Library)",
        "href": "https://imslp.org/wiki/Rule_Britannia_(Arne,_Thomas_Augustine)"
      },
      {
        "category": "artistic",
        "title": "Review of the Black Sea Fleet in 1849 — Ivan Aivazovsky",
        "excerpt": "Aivazovsky, who witnessed the event beside Emperor Nicholas I, paints a long, disciplined line of warships riding a Sevastopol roadstead under a vast, brooding sky, sails filled and cannon poised. In the foreground uniformed officers stand at a railing to observe the fleet, casting the scene as a ruler's inspection of his sea power. The canvas fuses martial order, imperial ceremony, and the sublime scale of the sea into a single display of naval might.",
        "source": "Ivan Aivazovsky, Review of the Black Sea Fleet in 1849 (1886), Central Naval Museum, St Petersburg — via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:%D0%A1%D0%BC%D0%BE%D1%82%D1%80_%D0%A7%D0%B5%D1%80%D0%BD%D0%BE%D0%BC%D0%BE%D1%80%D1%81%D0%BA%D0%BE%D0%B3%D0%BE_%D1%84%D0%BB%D0%BE%D1%82%D0%B0_%D0%B2_1849_%D0%B3%D0%BE%D0%B4%D1%83.jpg",
        "image": {
          "src": "/covers/north-korea-kim-naval-destroyer-tests--art.png",
          "alt": "A long line of billowing-sailed warships of the Russian Black Sea Fleet reviewed at Sevastopol under a wide grey sky, with uniformed officers watching from a railing in the foreground",
          "credit": "Ivan Aivazovsky, Review of the Black Sea Fleet in 1849, 1886; public domain (author died 1900); via Wikimedia Commons"
        }
      }
    ],
    "rank": 4
  },
  {
    "slug": "red-sea-cargo-ship-attack-yemen",
    "headline": "Cargo ship reports coming under attack in the Red Sea off Yemen",
    "overview": "A bulk carrier reported being attacked by armed assailants in a skiff about 30 nautical miles southwest of the Houthi-held port of Hodeida in the Red Sea on July 5, 2026, the British military's UK Maritime Trade Operations centre said. The attackers opened fire before the ship's guards returned fire, and the vessel and crew were reported safe. No group immediately claimed the attack.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMiiwFBVV95cUxONm9jMzVyNFJ5NlJ3dXAzcWpYTkxGam1ZNE1wSEVBVmNlSWFIUndEdEhsMDJfdUNvN2FTS0JnMkpjOVBpS3VnZGh2bWptN1ZHYjhuQkNxOHBlMjVPZjIzdTlkVHRWckxYUHBsTGwzQTFWeUdrU2JoTnFneFhQbWZ5V1hWNGVoNjM4NmVV?oc=5"
      },
      {
        "name": "CNBC",
        "href": "https://www.cnbc.com/2026/07/05/cargo-vessel-in-red-sea-reports-attack-uk-maritime-body-says.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-05",
    "image": {
      "src": "/covers/red-sea-cargo-ship-attack-yemen.png",
      "alt": "A locator map of Yemen showing the Red Sea, the Gulf of Aden and the cities of Sana'a and Aden",
      "credit": "AP graphic (map data © OpenStreetMap contributors) via ABC News"
    },
    "edition": "Evening Edition · 5 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Julius Caesar Captured by Cilician Pirates (Plutarch, Life of Caesar 2)",
        "excerpt": "To begin with, then, when the pirates demanded twenty talents for his ransom, he laughed at them for not knowing who their captive was, and of his own accord agreed to give them fifty.",
        "source": "Plutarch, Life of Caesar 2.1, trans. Bernadotte Perrin (Loeb, 1919), Perseus Digital Library, Tufts University",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0244:chapter=2"
      },
      {
        "category": "historical",
        "title": "Pompey's War on the Pirates Who Closed the Sea (Plutarch, Life of Pompey 24)",
        "excerpt": "The power of the pirates had its seat in Cilicia at first, and at the outset it was venturesome and elusive; but it took on confidence and boldness during the Mithridatic war, because it lent itself to the king's service. ... This power extended its operations over the whole of our Mediterranean Sea, making it unnavigable and closed to all commerce.",
        "source": "Plutarch, Life of Pompey 24, trans. Bernadotte Perrin (Loeb, 1917), Perseus Digital Library, Tufts University",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:2008.01.0058:chapter=24"
      },
      {
        "category": "literary",
        "title": "Nestor Asks If the Strangers Are Sea-Robbers (Homer, Odyssey III)",
        "excerpt": "Strangers, who are ye? Whence sail ye over the wet ways? On some trading enterprise, or at adventure do ye rove, even as sea-robbers, over the brine, for they wander at hazard of their own lives bringing bale to alien men?",
        "source": "Homer, The Odyssey, Book III, trans. S. H. Butcher and A. Lang (prose), Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/1728/pg1728.txt"
      },
      {
        "category": "literary",
        "title": "Byron, The Corsair, Canto I — the Pirate Song",
        "excerpt": "O'er the glad waters of the dark blue sea, / Our thoughts as boundless, and our souls as free, / Far as the breeze can bear, the billows foam, / Survey our empire, and behold our home!",
        "source": "Lord Byron, The Corsair (1814), Canto I, stanza I, Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Corsair_(Byron,_1814)/CANTO_I"
      },
      {
        "category": "artistic",
        "title": "Hector Berlioz, Overture 'Le Corsaire', H. 101 (Op. 21)",
        "excerpt": "Berlioz's concert overture opens with a headlong, spray-flung rush of strings that evokes a corsair's raid across open water. Conceived on the wave-battered coast near Nice and named for the piratical hero of Romantic sea-tales, the music swings between surging attack and a brooding lyrical calm before driving to a triumphant, almost predatory finish. It is one of the repertoire's most vivid portraits of danger and daring upon the sea.",
        "source": "Hector Berlioz, Overture 'Le Corsaire', H. 101 — full score, IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Overture_'Le_Corsaire',_H_101_(Berlioz,_Hector)"
      },
      {
        "category": "artistic",
        "title": "Howard Pyle, 'An Attack on a Galleon' (1905)",
        "excerpt": "Pyle paints the terror of the old trade routes: a towering galleon looms in the smoke while a small, low pirate craft slips alongside to board her. Gunfire lights the billowing clouds as raiders swarm up the great vessel's side, the huge merchantman all but helpless before the nimble attackers. It distills the ancient asymmetry of a lone armed skiff striking a laden ship at sea.",
        "source": "Howard Pyle, 'An Attack on a Galleon' (1905), Delaware Art Museum; via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Attack_on_a_Galleon.jpg",
        "image": {
          "src": "/covers/red-sea-cargo-ship-attack-yemen--art.png",
          "alt": "A towering galleon wreathed in cannon smoke is attacked at close range by a small low pirate boat, with raiders swarming her side amid gunfire on the open sea.",
          "credit": "Howard Pyle, 'An Attack on a Galleon', 1905; public domain; via Wikimedia Commons"
        }
      }
    ],
    "rank": 5
  },
  {
    "slug": "macron-visit-syria-damascus",
    "headline": "Macron expected to visit Syria in first trip by a Western European leader since Assad's fall",
    "overview": "Syria's presidency said on July 5, 2026 that French President Emmanuel Macron is expected to visit the country for talks on strengthening ties, in what would be the first visit by a Western European head of state since the fall of Bashar al-Assad. Macron is expected to meet interim President Ahmed al-Sharaa, accompanied by a delegation of French investors and companies. No date for the trip was announced.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMisgFBVV95cUxQMlpGYWxDdEIwTHZtZ2dZUm1rU18xUzNJa24yU2F1TEdPUVh2ZHVLdXh1bkE3dk5icVlwZ0o0bEQ4VVdjaElia190dEZyaVQ3V3hpbzlnSEFjaFFQRHNvV21QOURoMlVIZ19veEFXTnFubnZGZDRxWV9YUlh6SmswN1p1aC1td0dPMkpoY2h3djdhcWZ2djMza2lPRk9RaXBuYTFzOHpvZ1ZSTnV2cFdsYUNB?oc=5"
      },
      {
        "name": "Arab News",
        "href": "https://www.arabnews.com/node/2649735/middle-east"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-05",
    "image": {
      "src": "/covers/macron-visit-syria-damascus.png",
      "alt": "French President Emmanuel Macron shaking hands with Syria's interim President Ahmed al-Sharaa in front of flags",
      "credit": "Arab News"
    },
    "edition": "Evening Edition · 5 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Themistocles received by the Persian King (Thucydides, History of the Peloponnesian War, Book I.137)",
        "excerpt": "He sent a letter to King Artaxerxes, Xerxes's son, who had just come to the throne. Its contents were as follows: \"I, Themistocles, am come to you, who did your house more harm than any of the Hellenes, when I was compelled to defend myself against your father's invasion—harm, however, far surpassed by the good that I did him during his retreat... for the present, able to do you great service, I am here, pursued by the Hellenes for my friendship for you. However, I desire a year's grace, when I shall be able to declare in person the objects of my coming.\" It is said that the King approved his intention, and told him to do as he said... Arrived at court at the end of the year, he attained to very high consideration there, such as no Hellene has ever possessed before or since.",
        "source": "Thucydides, History of the Peloponnesian War, Book I.137–138 (trans. Richard Crawley), Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/7142/pg7142.txt"
      },
      {
        "category": "historical",
        "title": "Cyrus spares his enemy Croesus and seats him beside his throne (Herodotus, Histories, Book I.87–88)",
        "excerpt": "Then Cyrus, having perceived that Croesus was a lover of the gods and a good man, caused him to be brought down from the pyre and asked him as follows: \"Croesus, tell me who of all men was it who persuaded thee to march upon my land and so to become an enemy to me instead of a friend?\"... So he spoke, and Cyrus loosed his bonds and caused him to sit near himself and paid to him much regard, and he marvelled both himself and all who were about him at the sight of Croesus.",
        "source": "Herodotus, The History of Herodotus, Book I.87–88 (trans. G. C. Macaulay), Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/2707/pg2707.txt"
      },
      {
        "category": "literary",
        "title": "The Queen of Sheba visits King Solomon (1 Kings 10, King James Bible)",
        "excerpt": "And when the queen of Sheba heard of the fame of Solomon concerning the name of the LORD, she came to prove him with hard questions. And she came to Jerusalem with a very great train, with camels that bare spices, and very much gold, and precious stones... And she said to the king, It was a true report that I heard in mine own land of thy acts and of thy wisdom. Howbeit I believed not the words, until I came, and mine eyes had seen it: and, behold, the half was not told me: thy wisdom and prosperity exceedeth the fame which I heard.",
        "source": "The Holy Bible, King James Version, 1 Kings 10:1–7, Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/1_Kings"
      },
      {
        "category": "literary",
        "title": "Queen Dido welcomes the wandering Aeneas to newly-built Carthage (Virgil, Aeneid, Book I, Dryden translation)",
        "excerpt": "Enter, my noble guest, and you shall find, / If not a costly welcome, yet a kind: / For I myself, like you, have been distress'd, / Till Heav'n afforded me this place of rest; / Like you, an alien in a land unknown, / I learn to pity woes so like my own.",
        "source": "Virgil, The Aeneid, Book I (trans. John Dryden), Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/228/pg228.txt"
      },
      {
        "category": "artistic",
        "title": "George Frideric Handel, \"The Arrival of the Queen of Sheba,\" Sinfonia opening Act III of the oratorio Solomon, HWV 67 (1748)",
        "excerpt": "A brisk, glittering orchestral sinfonia of interlacing oboes and darting strings that Handel wrote to depict a foreign sovereign sweeping into Solomon's court. The music enacts an arrival: two voices call and answer as if envoys advancing in procession, building an atmosphere of ceremony, welcome, and the meeting of two powers before a single word is sung.",
        "source": "George Frideric Handel, Solomon, HWV 67, Act III Sinfonia (\"The Arrival of the Queen of Sheba\"), full score, IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Solomon,_HWV_67_(Handel,_George_Frideric)"
      },
      {
        "category": "artistic",
        "title": "Sir Edward John Poynter, \"The Visit of the Queen of Sheba to King Solomon\" (1890)",
        "excerpt": "Poynter's vast, archaeologically detailed canvas stages the moment of encounter: the Queen of Sheba, trailed by a great retinue bearing gold and spices, ascends the marble steps of Solomon's throng-filled hall to be received by the enthroned king. Courtiers, guards, and bearers of tribute crowd a scene of pomp and diplomacy—one realm formally paying court to another, the meeting of two powers made spectacle.",
        "source": "Sir Edward John Poynter, oil on canvas, 1890, Art Gallery of New South Wales; via Wikimedia Commons (Google Art Project)",
        "href": "https://commons.wikimedia.org/wiki/File:Sir_Edward_John_Poynter_-_The_visit_of_the_Queen_of_Sheba_to_King_Solomon_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/macron-visit-syria-damascus--art.png",
          "alt": "A grand columned hall in which the Queen of Sheba and her richly dressed retinue, bearing gifts, are received by King Solomon enthroned amid a crowd of courtiers.",
          "credit": "Sir Edward John Poynter, 'The Visit of the Queen of Sheba to King Solomon', 1890; public domain; via Wikimedia Commons"
        }
      }
    ],
    "rank": 6
  },
  {
    "slug": "iran-qatar-maritime-trade-resume",
    "headline": "Iran and Qatar resume maritime trade after a five-month suspension",
    "overview": "Iranian state media reported on July 5, 2026 that shipping between Iran's Dayyer port and Qatar's Al Ruwais port has resumed after a roughly five-month halt. Iran's commercial attaché in Doha said the restart followed coordination between the Iranian embassy and Qatari authorities. The resumption follows a US-Iran deal last month declaring an end to hostilities and a return of pre-war Gulf traffic.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMitAFBVV95cUxPNGpKTHAxUnc3bjEyYzczRHhyc2JxYUdEbWlKY3g5MWlVZWJfT3RSRVl5MDJQemVfTHRydm94TUktcTQ1ZjlSOEkyR2Ital9NUUllbVBLcUZEckxPWk40c0dJTXNKQkQxcWlBOEVNZTFtYnA2X3dTNERvZmJNWDRXTVRxRXc2S0JFX3F4cTRvTXZiUjBKRlEzYUh1VkR0UmxGcUpEWFJ4OU1TWko2VVhaM1A5UVY?oc=5"
      },
      {
        "name": "The Times of Israel",
        "href": "https://www.timesofisrael.com/liveblog_entry/iran-and-qatar-resume-maritime-trade-after-5-month-suspension-iranian-state-media-reports/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-05",
    "image": {
      "src": "/covers/iran-qatar-maritime-trade-resume.png",
      "alt": "A large bulk-carrier cargo ship at sea",
      "credit": "Public domain via Wikimedia Commons"
    },
    "edition": "Evening Edition · 5 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Marco Polo on the port of Hormuz, a Persian Gulf emporium of world trade",
        "excerpt": "Merchants come thither from India, with ships loaded with spicery and precious stones, pearls, cloths of silk and gold, elephants' teeth, and many other wares, which they sell to the merchants of Hormos, and which these in turn carry all over the world to dispose of again. In fact, 'tis a city of immense trade.",
        "source": "The Travels of Marco Polo, Volume 1 (trans. Henry Yule), Book I, Ch. XIX — Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/10636/pg10636.txt"
      },
      {
        "category": "historical",
        "title": "Herodotus: Gulf-born Phoenician merchants open the long sea routes",
        "excerpt": "These, they say, came from that which is called the Erythraian Sea to this of ours; and having settled in the land where they continue even now to dwell, set themselves forthwith to make long voyages by sea. And conveying merchandise of Egypt and of Assyria they arrived at other places and also at Argos... the Phenicians arrived then at this land of Argos, and began to dispose of their ship's cargo.",
        "source": "Herodotus, The History, Book I.1 (trans. G. C. Macaulay) — Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/2707/pg2707.txt"
      },
      {
        "category": "literary",
        "title": "The first voyage of Sindbad the Sailor: setting sail to trade among the islands",
        "excerpt": "Thus prepared I set sail with a company of merchants in a ship bound for the city of El-Basrah. For many days and nights we sailed upon the sea, visiting islands and passing thence to other islands; and everywhere we bartered, and bought and sold.",
        "source": "Sindbad the Sailor & Other Stories from the Arabian Nights, \"The First Voyage\" — Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/47285/pg47285.txt"
      },
      {
        "category": "literary",
        "title": "Ezekiel's lament for Tyre, the sea-merchant of many isles",
        "excerpt": "And say unto Tyrus, O thou that art situate at the entry of the sea, which art a merchant of the people for many isles, Thus saith the Lord GOD; O Tyrus, thou hast said, I am of perfect beauty. Thy borders are in the midst of the seas, thy builders have perfected thy beauty.... The ships of Tarshish did sing of thee in thy market: and thou wast replenished, and made very glorious in the midst of the seas.",
        "source": "Bible (King James Version), Ezekiel 27:3–4, 25 — Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Ezekiel"
      },
      {
        "category": "artistic",
        "title": "Rimsky-Korsakov, Scheherazade, Op. 35 — I. \"The Sea and Sinbad's Ship\"",
        "excerpt": "A stern unison for the sultan gives way to a rocking, swelling theme in the strings, and a single violin spins the storyteller's tale over harp arpeggios. The music becomes a merchant vessel riding long Gulf swells, sails filling as it glides from port to port. Woodwinds and brass rise and fall like the sea itself, carrying the ship — and its cargo of wonders — across open water toward distant harbors.",
        "source": "Nikolai Rimsky-Korsakov, Scheherazade, Op. 35 (1888), full orchestral score — IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Scheherazade,_Op.35_(Rimsky-Korsakov,_Nikolay)"
      },
      {
        "category": "artistic",
        "title": "Claude Lorrain, Seaport with the Embarkation of the Queen of Sheba (1648)",
        "excerpt": "A radiant sun hangs low over a calm harbor, its light spilling gold across the water and the hulls of anchored merchant ships. Along the quay, figures load and unload bales beneath grand classical palaces, while a fleet waits to carry a royal party and its treasures across the sea. Lorrain turns commerce into serenity: the port is a threshold where wealth, travel, and peace meet at the water's edge.",
        "source": "Claude Lorrain, Seaport with the Embarkation of the Queen of Sheba, 1648, oil on canvas, National Gallery, London — Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Claude_Lorrain_008.jpg",
        "image": {
          "src": "/covers/iran-qatar-maritime-trade-resume--art.png",
          "alt": "A sunlit classical seaport at dawn: merchant ships anchored in a calm harbor, figures loading goods along a quay lined with grand palatial buildings, as a royal party prepares to embark.",
          "credit": "Claude Lorrain, Seaport with the Embarkation of the Queen of Sheba, 1648; public domain; via Wikimedia Commons"
        }
      }
    ],
    "rank": 7
  },
  {
    "slug": "china-maysak-tropical-storm-floods",
    "headline": "Heavy rains kill five in northern China as Tropical Storm Maysak floods the south and Vietnam",
    "overview": "Flash floods killed at least five people in Inner Mongolia and Liaoning province in northern China on July 5, 2026, while Tropical Storm Maysak, after landfall in northern Vietnam, flooded the southern region of Guangxi. Residents in Fangchenggang described the worst flooding in two decades, with rivers overflowing and cars submerged. The storm earlier toppled trees and ripped roofs off buildings in Vietnam.",
    "genre": "Climate",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMipAFBVV95cUxPU2FBYmoxYWYybkdvaE56VnNaV1lJYk5fZW0wblpHNk0wOEw3dHd3RE1LZ2ZCeGxMdkhHRy1zWndDWk81NE9FWjNsVFNUcDVmODduWDVRVlFoc2lCTVZKcFlRWURqQ0pOeGpXTXMza090ZkZENVNFejczZjRPQzVfSUozRXlqbzVjeWh5UXJ0NnZrYjNNYnNKdGhhUEpPQk5OVzRLUw?oc=5"
      },
      {
        "name": "The Washington Post",
        "href": "https://www.washingtonpost.com/world/2026/07/05/china-vietnam-typhoon-maysak-rain-flooding/b6c390c0-7855-11f1-b194-f872dd4ec5aa_story.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-05",
    "image": {
      "src": "/covers/china-maysak-tropical-storm-floods.png",
      "alt": "A man and child watch large storm waves crash over a waterfront barrier during a tropical storm",
      "credit": "AP Photo via The Star"
    },
    "edition": "Evening Edition · 5 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Defoe's The Storm — the Great Storm of 1703",
        "excerpt": "the Water rising Six or Eight Foot higher than it was ever known to do in the Memory of Man; by which Ships were fleeted up upon the firm Land several Rods off from the Banks",
        "source": "Daniel Defoe, The Storm; or, a Collection of the most Remarkable Casualties and Disasters which happen'd in the Late Dreadful Tempest, both by Sea and Land (1704), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/42234/42234-h/42234-h.htm"
      },
      {
        "category": "historical",
        "title": "The Johnstown Flood of 1889",
        "excerpt": "Houses were spinning through beneath the bridge, and I did not know at what moment the structure would melt away under the train.",
        "source": "Willis Fletcher Johnson, History of the Johnstown Flood (1889), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/41271/41271-h/41271-h.htm"
      },
      {
        "category": "literary",
        "title": "The Flood of Noah — Genesis 7",
        "excerpt": "And the waters prevailed exceedingly upon the earth; and all the high hills, that were under the whole heaven, were covered. Fifteen cubits upward did the waters prevail; and the mountains were covered. And all flesh died that moved upon the earth, both of fowl, and of cattle, and of beast, and of every creeping thing that creepeth upon the earth, and every man.",
        "source": "Bible (King James Version), Genesis 7:19–21, Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Genesis"
      },
      {
        "category": "literary",
        "title": "The Deluge in Ovid's Metamorphoses, Book I",
        "excerpt": "And now sea and land had no mark of distinction; everything now was ocean; and to that ocean shores were wanting.",
        "source": "Ovid, Metamorphoses, Book I (Henry T. Riley trans., 1851), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/21765/21765-h/21765-h.htm"
      },
      {
        "category": "artistic",
        "title": "Saint-Saëns, Le déluge (The Flood), Op. 45",
        "excerpt": "Saint-Saëns's biblical oratorio renders the deluge in sound: after a serene violin prelude, the orchestra swells into surging chromatic waves as the fountains of the deep break open and rain drowns the world. Strings churn like rising floodwater and the chorus laments a humanity abandoned to the water, before a lone dove signals the receding tide.",
        "source": "Camille Saint-Saëns, Le déluge (poème biblique), Op. 45 (1875), IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Le_déluge,_Op.45_(Saint-Saëns,_Camille)"
      },
      {
        "category": "artistic",
        "title": "Hokusai, The Great Wave off Kanagawa",
        "excerpt": "A towering wave rears over three slender fishing boats, its foaming claws poised to fall as the boatmen crouch helpless beneath the crest. Distant Mount Fuji shrinks to a small peak between the walls of water, dwarfed by the sea, an image of frail humanity at the mercy of an overwhelming flood.",
        "source": "Katsushika Hokusai, The Great Wave off Kanagawa, from Thirty-six Views of Mount Fuji (c. 1830–1832), Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Tsunami_by_hokusai_19th_century.jpg",
        "image": {
          "src": "/covers/china-maysak-tropical-storm-floods--art.png",
          "alt": "A giant cresting ocean wave with foaming claw-like tips looms over small fishing boats, with a small Mount Fuji in the distance",
          "credit": "Katsushika Hokusai, The Great Wave off Kanagawa, c. 1830–1832; public domain; via Wikimedia Commons"
        }
      }
    ],
    "rank": 8
  },
  {
    "slug": "morocco-canada-world-cup-quarterfinals",
    "headline": "Morocco beats World Cup co-host Canada 3-0 to reach the quarterfinals",
    "overview": "Morocco defeated co-host Canada 3-0 in the World Cup Round of 16 on July 5, 2026, eliminating one of the tournament's hosts and advancing to the quarterfinals. Azzedine Ounahi was among the scorers as the North African side ended Canada's run. It continued a strong World Cup for Morocco.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMilAFBVV95cUxQV2xNUDJGaE9BRk1ENkt4T3dWVThhNkdsWVYxRjhELXhpUG5aai1vSmxrNFpWcTYtUW5MYjJOZTBwVHBYdW9fUEMzVFY4eWJuTzRDdTlraDVTZkRfa2lsV3dXMUZNZlVnZ2tlcGhXaHdXTFhscWY0QWFTYTJ0cWM4eW1QZHljVU43MGRERFp4RDB0aEdq?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMipwFBVV95cUxPNjNyLUhPWmVMc1ByblNuVHlfUHZ6V0tNSnctVzBaeF9TVkQtRTUxV2lZYlh4eWVVYmxxNzZobjlWamh0V1M2U3gxcmdFMUdqbDdrVUMzZnZrdndheERGQjdPWkFvSXpaTGZoREJZWWFvdDc3bDlEcUNJNkhZN2dONXhFZ2V2RFd4ZzlCLWpSdmN6a240MUxpR0RGOGZwTTlLMUJVUUVPVQ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-05",
    "image": {
      "src": "/covers/morocco-canada-world-cup-quarterfinals.png",
      "alt": "A packed football stadium under floodlights during a night match",
      "credit": "Wisła Kraków match, CC BY 4.0 via Wikimedia Commons"
    },
    "edition": "Evening Edition · 5 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Herodotus on the Olympic Games — glory, not money (Histories 8.26)",
        "excerpt": "The Arcadians telling them that the Greeks were keeping the Olympic festival and viewing sports and horse-races, the Persian asked what was the prize offered, wherefore they contended; and they told him of the crown of olive that was given to the victor. Then Tigranes son of Artabanus uttered a most noble saying ... when he heard that the prize was not money but a crown, he could not hold his peace, but cried, \"Zounds, Mardonius, what manner of men are these that you have brought us to fight withal? 'tis not for money they contend but for glory of achievement!\"",
        "source": "Herodotus, The Persian Wars, Book VIII.26 (trans. A. D. Godley), Wikisource",
        "href": "https://en.wikisource.org/wiki/Herodotus_The_Persian_Wars_(Godley)/Book_VIII"
      },
      {
        "category": "historical",
        "title": "Pausanias on the victor statues at Olympia (Description of Greece 6.1)",
        "excerpt": "After my description of the votive offerings I must now go on to mention the statues of racehorses and those of men, whether athletes or ordinary folk. Not all the Olympic victors have had their statues erected; some, in fact, who have distinguished themselves, either at the games or by other exploits, have had no statue. These I am forced to omit by the nature of my work, which is not a list of athletes who have won Olympic victories, but an account of statues and of votive offerings generally.",
        "source": "Pausanias, Description of Greece, Book VI.1.1–2 (trans. W. H. S. Jones), Wikisource",
        "href": "https://en.wikisource.org/wiki/Description_of_Greece_(Jones)/Book_6"
      },
      {
        "category": "literary",
        "title": "The foot race at the funeral games (Homer, Iliad, Book 23)",
        "excerpt": "So spake he, and forthwith uprose swift Aias, son of Oïleus, and Odysseus of many wiles, and after them Antilochus, Nestor's son, for he surpassed all the youths in swiftness of foot.",
        "source": "Homer, Iliad, Book 23 (trans. A. T. Murray), Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0134:book=23:card=740"
      },
      {
        "category": "literary",
        "title": "Pindar crowns the Olympic victor (Olympian Ode 1)",
        "excerpt": "Water is best, and gold, like a blazing fire in the night, stands out supreme of all lordly wealth. But if, my heart, you wish to sing of contests, look no further for any star warmer than the sun, shining by day through the lonely sky, and let us not proclaim any contest greater than Olympia.",
        "source": "Pindar, Olympian 1 (trans. Diane Arnson Svarlien), Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0162:book=O.:poem=1"
      },
      {
        "category": "artistic",
        "title": "Handel, \"See, the Conqu'ring Hero Comes\" (Judas Maccabaeus, HWV 63)",
        "excerpt": "See, the conqu'ring hero comes! Sound the trumpets, beat the drums! Sports prepare, the laurel bring, songs of triumph to him sing.",
        "source": "George Frideric Handel, Judas Maccabaeus, HWV 63, Act III (libretto by Thomas Morell), full scores, IMSLP",
        "href": "https://imslp.org/wiki/Judas_Maccabaeus,_HWV_63_(Handel,_George_Frideric)"
      },
      {
        "category": "artistic",
        "title": "Runners in the stadion race — Terracotta Panathenaic prize amphora",
        "excerpt": "Five nude, bearded athletes surge forward in the sprint of the stadion, each with left leg thrust into a long stride, their muscles cut in fine incised lines against the black glaze — the winning runner's prize the very vessel that pictures the race, once brimming with sacred Athenian olive oil.",
        "source": "Attributed to the Euphiletos Painter, Terracotta Panathenaic prize amphora, ca. 530 B.C., The Metropolitan Museum of Art; via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Terracotta_Panathenaic_prize_amphora_MET_GR147.jpg",
        "image": {
          "src": "/covers/morocco-canada-world-cup-quarterfinals--art.png",
          "alt": "Black-figure Greek amphora showing five nude bearded runners in mid-stride competing in the stadion foot race",
          "credit": "Attributed to the Euphiletos Painter, Terracotta Panathenaic prize amphora, ca. 530 B.C., Metropolitan Museum of Art; public domain (CC0); via Wikimedia Commons"
        }
      }
    ],
    "rank": 9
  },
  {
    "slug": "tour-de-france-del-toro-stage-two",
    "headline": "Del Toro wins Tour de France stage two as Pogacar closes on race leader Vingegaard",
    "overview": "Mexican rider Isaac del Toro won stage two of the Tour de France on July 5, 2026, while defending champion Tadej Pogacar narrowed the gap to race leader Jonas Vingegaard. Del Toro took the win at the end of the stage. The result tightened the battle for the overall lead early in the race.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiqwFBVV95cUxPV0trS1h3aU9xWU9WWGtLenFfU3VCSXVYSXUzNGh5RnN5V1BQbFhERUt4eVl2bjRUY0dtMmxpMERKdmhzMnJ3SFFVTWxYdlJSVzU1TUV0MktMaGVrVXBrTGJDc3JFMTVUWFM3YndtR0RQa1pPVXdSSDVPNl9tVkdhQVRyOG4tRnVEUy16VFlQdXUydERMalQ5SUVKZ1lfNFB3bFo1V0FjM212Mjg?oc=5"
      },
      {
        "name": "Reuters (stage three wildfires)",
        "href": "https://news.google.com/rss/articles/CBMi0wFBVV95cUxOdklrQVJoYVlHczhybFRWMC0xbGZJRjJ6Rzd0SHlaV3lIVllYc09WSWdjakNBRm5IelZ0dmdONVlyejV0TEI0SExrRm54ejlHR25ZTjAxQmtNc0E5dHpHNnNOZzY1Zmc4ZWdldWxLbGFlZndQd0t6ZTlLX2ZEVTVvOG05c0o3eEdPNVpPTHBYa3hrX0xENEdtNGNxSEV2R1RmTzIwZGxFb1haSXVuYURtQjIxXzRQR29TQ1RhZDVSdERmNTRmM2U3R0M1M1JicnRsMU5B?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-05",
    "image": {
      "src": "/covers/tour-de-france-del-toro-stage-two.png",
      "alt": "A tight peloton of road cyclists racing along a road during the Tour de France",
      "credit": "Tour de France 2021, CC BY-SA 4.0 via Wikimedia Commons"
    },
    "edition": "Evening Edition · 5 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Pliny the Younger on the frenzy of the chariot races",
        "excerpt": "It was the time of celebrating the Circensian games; an entertainment for which I have not the least taste. It does the more surprise me therefore that so many thousand people should be possessed with the childish passion of desiring so often to see a parcel of horses gallop, and men standing upright in their chariots. If, indeed, it were the swiftness of the horses, or the skill of the men that attracted them, there might be some pretence of reason for it.",
        "source": "Pliny the Younger, Letters, Book 9, Letter 6 (to Calvisius), trans. William Melmoth — Project Gutenberg",
        "href": "https://gutenberg.org/files/2811/2811-h/2811-h.htm"
      },
      {
        "category": "historical",
        "title": "Pausanias records the first Olympic champion, a runner",
        "excerpt": "The people of Elis say that the boundary is the tomb of Corœbus, who was victor when Iphitus restored the Olympian games that had been for a long time discontinued, and offered prizes only for racing. And there is an inscription on his tomb that he was the first victor at Olympia, and that his tomb was erected on the borders of Elis.",
        "source": "Pausanias, Description of Greece, 8.26 (on Corœbus, first victor of the Olympic foot-race), trans. A. R. Shilleto — Project Gutenberg",
        "href": "https://www.gutenberg.org/files/68680/68680-h/68680-h.htm"
      },
      {
        "category": "literary",
        "title": "Homer's chariot race: the pursuer closing on the leader",
        "excerpt": "And forthwith the swift-footed mares of the son of Pheres shot to the front, and after them Diomedes' stallions of the breed of Tros; not far behind were they, but close behind, for they seemed ever like to mount upon Eumelus' car, and with their breath his back waxed warm and his broad shoulders, for right over him did they lean their heads as they flew along.",
        "source": "Homer, Iliad, Book 23 (the chariot race at Patroclus' funeral games), trans. A. T. Murray — Perseus Digital Library, Tufts",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0134:book=23:card=362"
      },
      {
        "category": "literary",
        "title": "Virgil's foot-race: the front-runner outstrips the field",
        "excerpt": "Shot from the crowd, swift Nisus all o'erpass'd; / Nor storms, nor thunder, equal half his haste. / The next, but tho' the next, yet far disjoin'd, / Came Salius, and Euryalus behind.",
        "source": "Virgil, Aeneid, Book 5 (the foot-race at Anchises' funeral games), trans. John Dryden — Perseus Digital Library, Tufts",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0052:book=5:card=315"
      },
      {
        "category": "artistic",
        "title": "Rossini's galloping finale to the Guillaume Tell overture",
        "excerpt": "The overture's closing March of the Swiss Soldiers erupts into a headlong cavalry charge of hammering strings and blazing trumpets. Its relentless, accelerating rhythm becomes pure pursuit, a surge of momentum driving toward an imagined finishing line. Few pieces so completely distil speed, stamina, and the exhilaration of the will to win.",
        "source": "Gioachino Rossini, Guillaume Tell — Overture (galop finale), 1829; full scores and parts — IMSLP",
        "href": "https://imslp.org/wiki/Guillaume_Tell_(Rossini,_Gioacchino)"
      },
      {
        "category": "artistic",
        "title": "Tominz paints the thunder of the Circus Maximus",
        "excerpt": "A dramatic canvas of quadrigas thundering around the Circus Maximus, charioteers braced low and straining as their teams jostle for the lead before a packed grandstand. The dust, the massed horses, and the raw velocity capture the ancient spectacle of the race and the rivalry of champions that mirrors a modern peloton's charge to the line.",
        "source": "Alfredo Tominz, The Chariot Race in the Circus Maximus, 1890 — Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Alfredo_Tominz_-_The_chariot_race_in_the_Circus_Maximus.jpg",
        "image": {
          "src": "/covers/tour-de-france-del-toro-stage-two--art.png",
          "alt": "Oil painting of four-horse chariots racing around the turning-posts of the Circus Maximus, drivers straining forward amid dust before a crowded grandstand",
          "credit": "Alfredo Tominz, The Chariot Race in the Circus Maximus, 1890; public domain (author died 1936); via Wikimedia Commons"
        }
      }
    ],
    "rank": 10
  },
  {
    "slug": "australia-space-balls-queensland-debris",
    "headline": "Mysterious 'space balls' wash up on Queensland beaches, prompting exclusion zones",
    "overview": "Six large spheres of suspected space debris washed up near Forrest Beach in Townsville, Queensland, prompting Australian authorities to set up exclusion zones, officials said on July 5, 2026. The Australian Space Agency was investigating the objects, thought to be pressurized fuel tanks from a rocket stage that may contain toxic residue. Police said there was no danger to the community, and five of the objects were secured in drums.",
    "genre": "Science",
    "sources": [
      {
        "name": "BBC News",
        "href": "https://www.bbc.co.uk/news/articles/cp9lppvkmz5o"
      },
      {
        "name": "The Irish Times",
        "href": "https://www.irishtimes.com/world/australia/2026/07/05/space-balls-mysterious-debris-found-on-australian-beaches-could-contain-toxic-rocket-fuel/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-05",
    "image": {
      "src": "/covers/australia-space-balls-queensland-debris.png",
      "alt": "A large metallic sphere of suspected space debris resting on the ground beside fallen timber and scrub",
      "credit": "The Irish Times"
    },
    "edition": "Evening Edition · 5 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Livy, History of Rome (Ab Urbe Condita), Book 1.31 — the shower of stones on the Alban Mount",
        "excerpt": "At this time it was reported to the king and the senate that there had been a shower of stones on the Alban Mount.",
        "source": "Livy, History of Rome, Book I, ch. 31 (Rev. Canon Roberts translation), Perseus Digital Library, Tufts University",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0026:book=1:chapter=31"
      },
      {
        "category": "historical",
        "title": "Plutarch, Life of Lysander, ch. 12 — the great stone that fell from heaven at Aegospotami",
        "excerpt": "For a stone of a great size did fall, according to the common belief, from heaven, at Ægos Potami, which is shown to this day, and had in great esteem by the Chersonites. And it is said that Anaxagoras foretold, that the occurrence of a slip or shake among the bodies fixed in the heavens, dislodging any one of them, would be followed by the fall of the whole of them.",
        "source": "Plutarch's Lives, 'Life of Lysander' (Dryden translation, revised by A. H. Clough), Wikisource",
        "href": "https://en.wikisource.org/wiki/Plutarch%27s_Lives_(Clough)/Life_of_Lysander"
      },
      {
        "category": "literary",
        "title": "Revelation 8:10–11 — the falling star named Wormwood that poisons the waters",
        "excerpt": "And the third angel sounded, and there fell a great star from heaven, burning as it were a lamp, and it fell upon the third part of the rivers, and upon the fountains of waters; And the name of the star is called Wormwood: and the third part of the waters became wormwood; and many men died of the waters, because they were made bitter.",
        "source": "The Holy Bible, King James Version, Revelation, ch. 8, Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Revelation"
      },
      {
        "category": "literary",
        "title": "H. G. Wells, The War of the Worlds, Book I, ch. II 'The Falling Star' — the cylinder in the pit",
        "excerpt": "The Thing itself lay almost entirely buried in sand, amidst the scattered splinters of a fir tree it had shivered to fragments in its descent. The uncovered part had the appearance of a huge cylinder, caked over and its outline softened by a thick scaly dun-coloured incrustation. It had a diameter of about thirty yards.",
        "source": "H. G. Wells, The War of the Worlds (1898), Project Gutenberg eBook #36",
        "href": "https://www.gutenberg.org/files/36/36-0.txt"
      },
      {
        "category": "artistic",
        "title": "Gustav Holst, The Planets, Op. 32 — 'Neptune, the Mystic'",
        "excerpt": "Holst's suite closes on the outermost, least-known world, where hushed strings and a wordless, unseen women's chorus drift in and out like something glimpsed but never grasped. The music conjures exactly the mood of an object arriving from the dark beyond the sky: cold, beautiful, and quietly unnerving. It fades to silence rather than resolving, leaving the listener suspended between wonder and dread at what lies out there.",
        "source": "Gustav Holst, The Planets, Op. 32 (1914–16), full orchestral score, IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/The_Planets,_Op.32_(Holst,_Gustav)"
      },
      {
        "category": "artistic",
        "title": "Frederic Edwin Church, The Meteor of 1860",
        "excerpt": "Church paints the rare Earth-grazing meteor procession he witnessed over the Catskills in July 1860: a chain of blazing fireballs strung across a darkening sky, trailing molten light above a still, shadowed landscape. Awestruck onlookers below watch fragments of the heavens sail overhead, a spectacle of beauty shot through with foreboding. It is the same primal reaction that strange objects from above still provoke — the pull between marvel and alarm at wreckage falling out of the sky.",
        "source": "Frederic Edwin Church (1826–1900), 'The Meteor of 1860', oil on canvas, 1860; Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Frederic_Church_Meteor_of_1860.jpg",
        "image": {
          "src": "/covers/australia-space-balls-queensland-debris--art.png",
          "alt": "Oil painting of a procession of bright meteor fireballs streaking across a twilight sky above a dim landscape and water.",
          "credit": "Frederic Edwin Church, 'The Meteor of 1860', 1860; public domain; via Wikimedia Commons"
        }
      }
    ],
    "rank": 11
  },
  {
    "slug": "nieves-gonzalez-puffer-coat-portraits",
    "headline": "Nieves González paints women in modern puffer coats as Spanish Baroque portraits",
    "overview": "Colossal profiled Spanish painter Nieves González on July 5, 2026, whose oil portraits dress contemporary women in puffer coats and parkas while borrowing the dramatic chiaroscuro of 17th-century Spanish Baroque masters like Velázquez and Murillo. Her solo show 'A Friendship Story' runs at Richard Heller Gallery in Santa Monica through July 25. González says she has never tried to separate 'the cultured from the popular or the historical from the contemporary.'",
    "genre": "Culture",
    "sources": [
      {
        "name": "Colossal",
        "href": "https://www.thisiscolossal.com/2026/07/nieves-gonzalez-paintings-portraits-puffer-coats/"
      },
      {
        "name": "Nieves González (artist website)",
        "href": "https://nieves-gonzalez.com/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-05",
    "image": {
      "src": "/covers/nieves-gonzalez-puffer-coat-portraits.png",
      "alt": "A 17th-century Spanish Baroque oil portrait of a young woman in an elaborate court gown against a dark background",
      "credit": "Diego Velázquez, 'Retrato de la infanta María Teresa'; public domain via Wikimedia Commons"
    },
    "edition": "Evening Edition · 5 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Livy, History of Rome, Book 34 — the debate over the Oppian Law on women's finery (195 BC)",
        "excerpt": "No offices, no priesthoods, no triumphs, no decorations, no gifts, no spoils of war can come to them; elegance of appearance, adornment, apparel—these are the woman's badges of honour; in these they rejoice and take delight; these our ancestors called the woman's world.",
        "source": "Livy, The History of Rome, Book 34, ch. 7 (Lucius Valerius defending women against the sumptuary Oppian Law), trans. Evan T. Sage, 1935 — Perseus Digital Library, Tufts University",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0164:book=34:chapter=7"
      },
      {
        "category": "historical",
        "title": "Pliny the Elder, Natural History, Book 35 — the lost art of the true portrait",
        "excerpt": "The painting of portraits, used to transmit through the ages extremely correct likenesses of persons, has entirely gone out. ... In the halls of our ancestors it was otherwise; portraits were the objects displayed to be looked at, not statues by foreign artists, nor bronzes nor marbles, but wax models of faces were set out each on a separate sideboard.",
        "source": "Pliny the Elder, Natural History, Book 35, ch. 2, trans. Rackham, Jones & Eichholz (Loeb) — Wikisource",
        "href": "https://en.wikisource.org/wiki/Natural_History_(Rackham,_Jones,_%26_Eichholz)/Book_35"
      },
      {
        "category": "literary",
        "title": "Oscar Wilde, The Picture of Dorian Gray — the portrait that holds a life",
        "excerpt": "How sad it is! I shall grow old, and horrible, and dreadful. But this picture will remain always young. ... If it were only the other way! If it were I who was to be always young, and the picture that was to grow old! ... I would give my soul for that!",
        "source": "Oscar Wilde, The Picture of Dorian Gray (1891), Chapter II — Project Gutenberg (plain text, eBook #174)",
        "href": "https://www.gutenberg.org/cache/epub/174/pg174.txt"
      },
      {
        "category": "literary",
        "title": "Shakespeare, Sonnet 24 — the eye that plays the painter",
        "excerpt": "Mine eye hath play'd the painter and hath stell'd, / Thy beauty's form in table of my heart; / My body is the frame wherein 'tis held, / And perspective it is best painter's art. ... Yet eyes this cunning want to grace their art, / They draw but what they see, know not the heart.",
        "source": "William Shakespeare, Shakespeare's Sonnets, Sonnet XXIV — Project Gutenberg (plain text, eBook #1041)",
        "href": "https://www.gutenberg.org/cache/epub/1041/pg1041.txt"
      },
      {
        "category": "artistic",
        "title": "Gaspar Sanz, Instrucción de música sobre la guitarra española (Zaragoza, 1674)",
        "excerpt": "Sanz set the popular dances heard in Spanish streets and courts—canarios, zarabandas, pavanas, the españoleta—into a rigorous method for the guitar, dressing the everyday tune in the elaborate counterpoint of high art. Composed in the same Spanish Baroque decades as Velázquez and Murillo, it refuses to keep the cultured and the popular apart, exactly the seam González works. To hear it is to feel a folk melody wearing courtly finery, past and present sounded on a single string.",
        "source": "Gaspar Sanz, Instrucción de música sobre la guitarra española (first published Zaragoza, 1674; public domain) — IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Instrucci%C3%B3n_de_m%C3%BAsica_sobre_la_guitarra_espa%C3%B1ola_(Sanz,_Gaspar)"
      },
      {
        "category": "artistic",
        "title": "Diego Velázquez, Infanta Margarita Teresa in a Blue Dress (1659)",
        "excerpt": "Velázquez frames a child in the vast silver-blue guardainfante of the Habsburg court, letting the dress itself—its bows, its glinting embroidery—carry the drama while the face floats pale out of a dim, shadowed ground. It is the chiaroscuro and the reverence for costume that González borrows and updates, swapping the farthingale for a puffer coat. Seen beside her portraits, the painting shows how a garment can become the whole subject, finery lit like a relic against the dark.",
        "source": "Diego Velázquez, Infanta Margarita Teresa in a Blue Dress, 1659, oil on canvas, Kunsthistorisches Museum, Vienna (public domain) — Wikimedia Commons file page",
        "href": "https://commons.wikimedia.org/wiki/File:Diego_Rodriguez_de_Silva_y_Vel%C3%A1zquez_-_Infanta_Margarita_Teresa_in_a_Blue_Dress_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/nieves-gonzalez-puffer-coat-portraits--art.png",
          "alt": "Oil portrait of the young Infanta Margarita Teresa standing in an elaborate silver-blue court gown against a dark background, her fair hair adorned, painted with dramatic Baroque light.",
          "credit": "Diego Velázquez, Infanta Margarita Teresa in a Blue Dress, 1659; public domain (artist died 1660); via Wikimedia Commons"
        }
      }
    ],
    "rank": 12
  },
  {
    "slug": "inflatable-garments-temperature-regulation",
    "headline": "Dezeen rounds up five inflatable garments that use air to regulate the wearer's temperature",
    "overview": "Dezeen featured five inflatable garments on July 5, 2026 that trap air to control body temperature, from Sheryl Teng's pleated, valve-inflated Looft Jacket to Japanese fan jackets and Rick Owens's blow-up Adidas tracksuits. The projects use pockets of air, built-in fans or inflatable layers to insulate or cool the body. Several treat inflation as both a technical and a decorative feature.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Dezeen",
        "href": "https://www.dezeen.com/2026/07/05/inflatable-garments-roundup/"
      },
      {
        "name": "Vollebak",
        "href": "https://www.vollebak.com/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-05",
    "image": {
      "src": "/covers/inflatable-garments-temperature-regulation.png",
      "alt": "An inflatable, air-filled garment used to regulate body temperature",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 5 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Franklin watches the Montgolfier balloon fill with rarefied air (1783)",
        "excerpt": "Its bottom was open, and in the middle of the Opening was fixed a kind of Basket Grate in which Faggots and Sheaves of Straw were burnt. The Air rarified in passing thro' this Flame rose in the Balloon, swell'd out its sides, and fill'd it.",
        "source": "Benjamin Franklin, letter to Sir Joseph Banks, 21 November 1783, printed in 'Benjamin Franklin and the First Balloons' (Project Gutenberg)",
        "href": "https://gutenberg.org/files/43809/43809-h/43809-h.htm"
      },
      {
        "category": "historical",
        "title": "Halley's diving bell traps a pocket of air to shield the body under the sea (1716)",
        "excerpt": "if the Cavity of the Vessel may contain a Tun of Water, a single Man may remain therein at least an Hour, without much inconvenience, at five or six Fathoms Deep... at thirty three Foot deep or thereabouts, the Bell will be half full of Water, the Pressure of it being then equal to that of the whole Atmosphere.",
        "source": "Edmond Halley, 'The Art of Living under Water,' Philosophical Transactions, vol. 29 (1714-1716), Internet Archive scan",
        "href": "https://archive.org/details/philtrans05114087"
      },
      {
        "category": "literary",
        "title": "Daedalus fashions wings and harnesses the air (Ovid, Metamorphoses VIII)",
        "excerpt": "He bound with thread the middle feathers, and the lower fixed with pliant wax; till so, in gentle curves arranged, he bent them to the shape of birds.... But when at last the father finished it, he poised himself, and lightly floating in the winnowed air waved his great feathered wings with bird-like ease.",
        "source": "Ovid, Metamorphoses, Book VIII (Daedalus and Icarus), trans. Brookes More; Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.02.0028%3Abook%3D8%3Acard%3D183"
      },
      {
        "category": "literary",
        "title": "Aeolus binds the winds in a bag of ox-hide (Homer, Odyssey X)",
        "excerpt": "He gave me a wallet, made of the hide of an ox nine years old, which he flayed, and therein he bound the paths of the blustering winds; for the son of Cronos had made him keeper of the winds, both to still and to rouse whatever one he will. And in my hollow ship he bound it fast with a bright cord of silver, that not a breath might escape, were it never so slight.",
        "source": "Homer, Odyssey, Book X (Aeolus and the bag of winds), trans. A. T. Murray; Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0136%3Abook%3D10%3Acard%3D1"
      },
      {
        "category": "artistic",
        "title": "Vivaldi's 'Winter' scores the body braced against the biting wind (Le quattro stagioni, Op. 8)",
        "excerpt": "Agghiacciato tremar trà nevi algenti / Al Severo Spirar d'orrido Vento, / Correr battendo i piedi ogni momento; / E pel Soverchio gel batter i denti.",
        "source": "Antonio Vivaldi, Le quattro stagioni, Op. 8 - Concerto No. 4 in F minor 'L'inverno' (Winter), with its accompanying sonnet; IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/The_Four_Seasons_(Vivaldi,_Antonio)"
      },
      {
        "category": "artistic",
        "title": "The first aeronauts borne aloft on heated air over Paris (1783 balloon print)",
        "excerpt": "A great decorated globe swells with fire-heated air and lifts free of the earth, carrying the first two aeronauts above the rooftops of Paris. Below, the crowd cranes upward as human ingenuity turns rarefied air into flight. It captures the founding moment when trapped, heated air first bore the human body skyward.",
        "source": "Illustration of the first manned Montgolfier balloon flight, 21 November 1783 (from 'Menneskeaandens sejre', 1904); via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Mongolfier_brothers'_hot_air_balloon_from_1783.jpg",
        "image": {
          "src": "/covers/inflatable-garments-temperature-regulation--art.png",
          "alt": "Engraved illustration of a large decorated hot-air balloon rising over Paris carrying Pilatre de Rozier and the Marquis d'Arlandes in its gallery, watched by a crowd, 21 November 1783.",
          "credit": "Unknown artist, first manned Montgolfier balloon flight of Pilatre de Rozier and the Marquis d'Arlandes over Paris, 21 November 1783 (from 'Menneskeaandens sejre', 1904); public domain; via Wikimedia Commons"
        }
      }
    ],
    "rank": 13
  },
  {
    "slug": "guam-typhoon-bavi-evacuations",
    "headline": "Guam orders evacuations as Super Typhoon Bavi bears down on the US Pacific territory",
    "overview": "Authorities in Guam ordered evacuations and opened shelters on July 5, 2026 as Super Typhoon Bavi tracked toward the US Pacific territory. Forecasters warned of destructive winds, heavy rain, storm surge and flooding along the coast as the storm intensified on its approach. Residents in low-lying and exposed areas were urged to move to higher ground.",
    "genre": "Climate",
    "sources": [
      {
        "name": "BBC News",
        "href": "https://www.bbc.co.uk/news/articles/cr7xpgx50jxo"
      },
      {
        "name": "Stars and Stripes",
        "href": "https://www.stripes.com/theaters/asia_pacific/2026-07-04/bravi-guam-marianas-typhoon-andersen-22175821.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-05",
    "image": {
      "src": "/covers/guam-typhoon-bavi-evacuations.png",
      "alt": "Satellite view of a powerful Pacific super typhoon with a broad spiral of white cloud bands wrapping around a clear circular eye over the dark ocean",
      "credit": "NASA Aqua/MODIS satellite imagery (EOSDIS Worldview), public domain via Wikimedia Commons"
    },
    "lead": true,
    "edition": "Afternoon Edition · 5 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Great Galveston Disaster (1900)",
        "excerpt": "Nothing so exemplified the impotency of man as the storm. Massive buildings were crushed like egg shells, great timbers were carried through the air as though they were of no weight, and the winds and the waves swept everything before them until their appetite for destruction was satiated and their force spent.",
        "source": "Paul Lester, The Great Galveston Disaster (1900), Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/60105/pg60105.txt"
      },
      {
        "category": "historical",
        "title": "History of the Johnstown Flood (1889)",
        "excerpt": "Down the Conemaugh Valley was advancing a mighty wall of water and mist with a terrible roar. Before it were rolling houses and buildings of all kinds, tossing over and over. We thought it was a cyclone, the roar sounding like a tempest among forest trees.",
        "source": "Willis Fletcher Johnson, History of the Johnstown Flood (1889), Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/41271/pg41271.txt"
      },
      {
        "category": "literary",
        "title": "The Tempest, Act I, Scene 1",
        "excerpt": "Mercy on us!—We split, we split!—Farewell my wife and children!—Farewell, brother! We split, we split, we split!",
        "source": "William Shakespeare, The Tempest, Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/23042/pg23042.txt"
      },
      {
        "category": "literary",
        "title": "The Rime of the Ancient Mariner",
        "excerpt": "And now the STORM-BLAST came, and he\nWas tyrannous and strong:\nHe struck with his o'ertaking wings,\nAnd chased south along.",
        "source": "Samuel Taylor Coleridge, The Rime of the Ancient Mariner, Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/151/pg151.txt"
      },
      {
        "category": "artistic",
        "title": "Symphony No. 6 in F major, Op. 68 'Pastoral' — IV. Gewitter, Sturm (Thunderstorm)",
        "excerpt": "Distant rumblings in the low strings swell without warning into a full orchestral tempest, cellos and basses churning while the violins slash downward like sheets of driven rain. Timpani crack like thunder overhead and the woodwinds shriek through the gale as the whole orchestra is caught in the storm's fury. Only slowly does the violence ebb, the clouds parting to reveal a calm, grateful shepherd's hymn.",
        "source": "Ludwig van Beethoven, Symphony No. 6, Op. 68 (1808), IMSLP",
        "href": "https://imslp.org/wiki/Symphony_No.6,_Op.68_(Beethoven,_Ludwig_van)"
      },
      {
        "category": "artistic",
        "title": "The Great Wave off Kanagawa",
        "excerpt": "A colossal wave rears up with clawing, foam-tipped talons, dwarfing the frail boats and their rowers as tiny Mount Fuji sits calm on the far horizon, capturing nature's overwhelming power over human vessels.",
        "source": "Katsushika Hokusai, The Great Wave off Kanagawa (c. 1830-1832), Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Tsunami_by_hokusai_19th_century.jpg",
        "image": {
          "src": "/covers/guam-typhoon-bavi-evacuations--art.png",
          "alt": "Woodblock print of a towering deep-blue ocean wave with white clawing crests curling over small boats, with a snow-capped Mount Fuji small in the distance",
          "credit": "Katsushika Hokusai, 'The Great Wave off Kanagawa,' from Thirty-six Views of Mount Fuji, c. 1830-1832; public domain via Wikimedia Commons"
        }
      }
    ],
    "rank": 14
  },
  {
    "slug": "france-paraguay-world-cup-quarterfinals",
    "headline": "France beats Paraguay 1-0 on a Mbappe penalty to reach the World Cup quarterfinals",
    "overview": "France reached the quarterfinals of the 2026 World Cup with a 1-0 win over Paraguay, played in front of 68,324 fans in Philadelphia. Kylian Mbappe converted a second-half penalty for the only goal in an ill-tempered, heat-affected match, drawing level with Lionel Messi as the tournament's joint-top scorer on seven goals. France, who have now won five straight matches at the finals, advance to meet Morocco.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP (via Google News)",
        "href": "https://news.google.com/rss/articles/CBMilgFBVV95cUxONXFZWG5zWUNVbHZKNk9VLTJTNnJ3d0hVaHh1bXZPX1VzYWlxTmozeHowRHhyT1BCX3B4NU1nWWdJTmJfS0JIWDloUVkzMERxZ1pvMERmVzZncW1xUm9SVGI3Um5tWk1BcGpIaUZJbldKOGFwOHZGbzBrdUdnSVp4aXFneDQ1dTFBU3YyZ184aWpCWGJaUGc?oc=5"
      },
      {
        "name": "Reuters (via Google News)",
        "href": "https://news.google.com/rss/articles/CBMivgFBVV95cUxNQnZXV3M1ZWI4SVNzSnd3VVBwRnc2dHVkUWZleEZsZ29BV0h3RzFQZWxqYXVMN2hvejFPSGhmaUhQVENILWljSmNDSm1GTktJVWtHVVFkLWhHamc2X1lKR01zYndvam12LVFGWkRTSWxpalJaQ25oNzhfVWh1NHc3V2xXVlZZSnk0RzVPcFNCYmVPaTAzbUJPM2daWEE2S0UxZkM1OGxxcFdHaWNTS0JmVlFFSTlxcmExOS15R1dR?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-05",
    "image": {
      "src": "/covers/france-paraguay-world-cup-quarterfinals.png",
      "alt": "Kylian Mbappé of France at the 2018 FIFA World Cup",
      "credit": "Anton Zaitsev / soccer.ru, CC BY-SA 3.0, via Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 5 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Herodotus on the Olympic Games — the olive wreath (Histories, Book VIII 'Urania', ch. 26)",
        "excerpt": "They told them that the Hellenes were keeping the Olympic festival and were looking on at a contest of athletics and horsemanship. He then inquired again, what was the prize proposed to them, for the sake of which they contended; and they told them of the wreath of olive which is given. Then Tigranes the son of Artabanos uttered a thought which was most noble, though thereby he incurred from the king the reproach of cowardice: for hearing that the prize was a wreath and not money, he could not endure to keep silence, but in the presence of all he spoke these words: \"Ah! Mardonios, what kind of men are these against whom thou hast brought us to fight, who make their contest not for money but for honour!\"",
        "source": "Herodotus, The History of Herodotus, trans. G. C. Macaulay, Vol. 2, Book VIII (Urania), ch. 26 (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/2456/pg2456.txt"
      },
      {
        "category": "historical",
        "title": "Pausanias on Milo of Croton, six-time Olympic wrestling champion (Description of Greece, Book VI, ch. 14)",
        "excerpt": "This Milo had six prizes for wrestling at Olympia, one of them among boys, and at Pythia six among men and one among boys. And he came to Olympia to wrestle for the 7th time. But he could not beat in wrestling Timasitheus, a citizen and quite young, as Timasitheus would not contend with him at close quarters in the arena at all. And Milo is said to have carried his own statue to Altis.",
        "source": "Pausanias, Description of Greece, trans. A. R. Shilleto, Book VI (Elis, Part II), ch. 14 (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/68946/pg68946.txt"
      },
      {
        "category": "literary",
        "title": "The funeral games of Patroclus — the chariot race (Homer, Iliad, Book XXIII)",
        "excerpt": "Fired at his word the rival racers rise;\nBut far the first Eumelus hopes the prize,\nFamed though Pieria for the fleetest breed,\nAnd skill'd to manage the high-bounding steed.\nWith equal ardour bold Tydides swell'd,\nThe steeds of Tros beneath his yoke compell'd\n(Which late obey'd the Dardan chief's command,\nWhen scarce a god redeem'd him from his hand).\nThen Menelaus his Podargus brings,\nAnd the famed courser of the king of kings.",
        "source": "Homer, The Iliad, trans. Alexander Pope, Book XXIII, 'Funeral Games in Honour of Patroclus' (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/6130/pg6130.txt"
      },
      {
        "category": "literary",
        "title": "Pindar, Olympian Ode I — for Hieron of Syracuse, winner in the horse-race",
        "excerpt": "Best is Water of all, and Gold as a flaming fire in the night shineth eminent amid lordly wealth; but if of prizes in the games thou art fain, O my soul, to tell, then, as for no bright star more quickening than the sun must thou search in the void firmament by day, so neither shall we find any games greater than the Olympic whereof to utter our voice: for hence cometh the glorious hymn and entereth into the minds of the skilled in song. Take from the peg the Dorian lute, if in any wise the glory of Pherenikos at Pisa hath swayed thy soul unto glad thoughts, when by the banks of Alpheos he ran, and gave his body ungoaded in the course, and brought victory to his master, the Syracusans' king, who delighteth in horses.",
        "source": "Pindar, The Extant Odes of Pindar, trans. Ernest Myers, Olympian Ode I (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/10717/pg10717.txt"
      },
      {
        "category": "artistic",
        "title": "Handel, 'See, the Conqu'ring Hero Comes' from Judas Maccabaeus, HWV 63",
        "excerpt": "A hush, then a single unison melody rises in unadorned major-key confidence, gathering voices and instruments as it swells into a broad processional of trumpets and drums. Handel's victory chorus paints the returning champion greeted by rejoicing crowds, its striding rhythm and rising phrases evoking the roar of a stadium welcoming its hero. So enduring is its triumphal air that it became the anthem sung at prize-givings and homecomings for generations after.",
        "source": "George Frideric Handel, Judas Maccabaeus, HWV 63, Act III, No. 35 (IMSLP / Petrucci Music Library)",
        "href": "https://imslp.org/wiki/Judas_Maccabaeus,_HWV_63_(Handel,_George_Frideric)"
      },
      {
        "category": "artistic",
        "title": "Discobolus (The Discus-Thrower) — Roman marble copy after Myron, British Museum",
        "excerpt": "A nude athlete is caught coiled at the instant before release, torso twisted and discus swung back at the top of its arc, weight poised on a single flexed leg. Myron's lost 5th-century BC bronze, known through Roman marble copies such as this Townley example from Hadrian's Villa, distils the whole tension of athletic contest into one balanced, held moment — the ancient ideal of the victorious competitor rendered eternal in stone.",
        "source": "Discobolus (Townley), Roman copy after Myron, British Museum — Wikimedia Commons file page",
        "href": "https://commons.wikimedia.org/wiki/File:Discus-thrower_(discobolus),_Roman_copy_of_a_bronze_original_of_the_5th_century_BC,_found_at_Hadrians_Villa,_Winning_at_the_ancient_Games,_British_Museum_(7376120902).jpg",
        "image": {
          "src": "/covers/france-paraguay-world-cup-quarterfinals--art.png",
          "alt": "Roman marble Discobolus (discus-thrower) after Myron, an athlete poised to hurl the discus, British Museum",
          "credit": "Photo by Carole Raddato, CC BY-SA 2.0, via Wikimedia Commons"
        }
      }
    ],
    "rank": 15
  },
  {
    "slug": "congo-ebola-treatment-trial",
    "headline": "New Ebola treatment trial begins in eastern Democratic Republic of Congo",
    "overview": "A clinical trial of a new Ebola treatment began in the eastern Democratic Republic of Congo, offering fresh hope to communities in a region repeatedly struck by outbreaks of the virus. Health workers said the trial would test the therapy's safety and effectiveness during the current response. The effort comes as residents continue to grapple with the disease's toll.",
    "genre": "Science",
    "sources": [
      {
        "name": "AP (via Google News)",
        "href": "https://news.google.com/rss/articles/CBMikAFBVV95cUxQOW4xWVlFc1dzLXBNU0VQQ3VXZ0s0QVpJT2IxRjA5OVpKNW5qbUcwdXZlTnQwYlJ1cnY0cTNNSEJvNXE2bkR3UU5lbldsRmRscF9KZ1RZUWh0Yi1Zd2Z5cFBjZUY0S1VkR19FYUNNeDBTUEh1UENBNGlKWjNzazEyNE9Dd3oyVW9rYmp4ZFEtMFc?oc=5"
      },
      {
        "name": "World Health Organization — Ebola outbreak: DRC 2026",
        "href": "https://www.who.int/emergencies/situations/ebola-outbreak---drc-2026"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-05",
    "image": {
      "src": "/covers/congo-ebola-treatment-trial.png",
      "alt": "Colorized transmission electron micrograph of an Ebola virus virion, showing the characteristic filamentous shape of the filovirus",
      "credit": "CDC/Cynthia Goldsmith, Public Health Image Library (#10816) — public domain"
    },
    "edition": "Afternoon Edition · 5 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Thucydides, History of the Peloponnesian War — the Plague of Athens (Book 2, Crawley translation)",
        "excerpt": "People in good health were all of a sudden attacked by violent heats in the head, and redness and inflammation in the eyes, the inward parts, such as the throat or tongue, becoming bloody and emitting an unnatural and fetid breath. These symptoms were followed by sneezing and hoarseness, after which the pain soon reached the chest, and produced a hard cough. When it fixed in the stomach, it upset it; and discharges of bile of every kind named by physicians ensued, accompanied by very great distress. Externally the body was not very hot to the touch, nor pale in its appearance, but reddish, livid, and breaking out into small pustules and ulcers.",
        "source": "Thucydides, History of the Peloponnesian War, Book 2 (Crawley trans.), Wikisource",
        "href": "https://en.wikisource.org/wiki/History_of_the_Peloponnesian_War/Book_2"
      },
      {
        "category": "historical",
        "title": "Edward Jenner, An Inquiry into the Causes and Effects of the Variolae Vaccinae (1798) — Case XVII",
        "excerpt": "I selected a healthy boy, about eight years old, for the purpose of inoculation for the Cow Pox. The matter was taken from a sore on the hand of a dairymaid, who was infected by her master's cows, and it was inserted, on the 14th of May, 1796, into the arm of the boy by means of two superficial incisions. In order to ascertain whether the boy, after feeling so slight an affection of the system from the Cow-pox virus, was secure from the contagion of the Small-pox, he was inoculated the 1st of July following with variolous matter, immediately taken from a pustule... but no disease followed.",
        "source": "Edward Jenner, An Inquiry into the Causes and Effects of the Variolae Vaccinae, Project Gutenberg eBook #29414",
        "href": "https://www.gutenberg.org/files/29414/29414-h/29414-h.htm"
      },
      {
        "category": "literary",
        "title": "Daniel Defoe, A Journal of the Plague Year (1722)",
        "excerpt": "The shrieks of women and children at the windows and doors of their houses, where their dearest relations were perhaps dying, or just dead, were so frequent to be heard as we passed the streets, that it was enough to pierce the stoutest heart in the world to hear them. Tears and lamentations were seen almost in every house, especially in the first part of the visitation.",
        "source": "Daniel Defoe, A Journal of the Plague Year, Project Gutenberg eBook #376",
        "href": "https://www.gutenberg.org/cache/epub/376/pg376.txt"
      },
      {
        "category": "literary",
        "title": "Edgar Allan Poe, The Masque of the Red Death (1842)",
        "excerpt": "The \"Red Death\" had long devastated the country. No pestilence had ever been so fatal, or so hideous. Blood was its Avatar and its seal—the redness and the horror of blood. There were sharp pains, and sudden dizziness, and then profuse bleeding at the pores, with dissolution. The scarlet stains upon the body and especially upon the face of the victim, were the pest ban which shut him out from the aid and from the sympathy of his fellow-men.",
        "source": "Edgar Allan Poe, The Masque of the Red Death, Project Gutenberg eBook #1064",
        "href": "https://www.gutenberg.org/files/1064/1064-h/1064-h.htm"
      },
      {
        "category": "artistic",
        "title": "Beethoven, String Quartet No. 15 in A minor, Op. 132 — III. \"Heiliger Dankgesang eines Genesenen an die Gottheit\"",
        "excerpt": "Written in 1825 as Beethoven convalesced from a grave intestinal illness that he feared would kill him, the vast slow movement is inscribed as a \"Holy Song of Thanksgiving of a Convalescent to the Deity, in the Lydian mode.\" Solemn hymn-like chorales, rising as if from a sickbed, alternate with quickened passages marked \"Neue Kraft fühlend\" — feeling new strength — so that the music itself enacts the passage from disease back into life. It is one of art's most direct musical prayers of healing, a fitting resonance with clinicians testing whether a new therapy can pull patients back from Ebola.",
        "source": "Beethoven, String Quartet No. 15, Op. 132, IMSLP (Petrucci Music Library)",
        "href": "https://imslp.org/wiki/String_Quartet_No.15,_Op.132_(Beethoven,_Ludwig_van)"
      },
      {
        "category": "artistic",
        "title": "Nicolas Poussin, The Plague of Ashdod (1630–1631), Louvre",
        "excerpt": "Poussin's canvas stages the biblical pestilence that struck the Philistines of Ashdod after they seized the Ark of the Covenant: a stricken city of collapsing bodies, mothers dead beside living infants, and citizens recoiling with cloaks pressed to their faces against the contagion. It is one of Western art's defining images of epidemic terror and the human struggle to contain an unseen killer.",
        "source": "Nicolas Poussin, The Plague of Ashdod, Wikimedia Commons (Louvre INV 7276)",
        "href": "https://commons.wikimedia.org/wiki/File:Nicolas_Poussin_-_La_Peste_%C3%A0_Ashdod.jpg",
        "image": {
          "src": "/covers/congo-ebola-treatment-trial--art.png",
          "alt": "Baroque painting of the plague at Ashdod: figures collapsing and dying in a classical city square while others flee and cover their faces",
          "credit": "Nicolas Poussin, The Plague of Ashdod (1630–31), Musée du Louvre; The Yorck Project — public domain"
        }
      }
    ],
    "rank": 16
  },
  {
    "slug": "china-frees-pastor-jin-mingri",
    "headline": "China releases Beijing house-church pastor Jin Mingri weeks after Trump sought his freedom",
    "overview": "Jin Mingri, the prominent founder of Beijing's unregistered Zion Church, was released from detention in China, his supporters said, weeks after US President Donald Trump publicly called for his freedom. Jin had been held by Chinese authorities in a case watched closely by religious-freedom advocates. His release was welcomed by campaigners who had pressed for it.",
    "genre": "Politics",
    "sources": [
      {
        "name": "BBC News",
        "href": "https://www.bbc.co.uk/news/articles/c4gy51ky75vo"
      },
      {
        "name": "AP (via Google News)",
        "href": "https://news.google.com/rss/articles/CBMioAFBVV95cUxPUmI5bHRvM080TlNabU5GUzEwVE5FcmViSkcycXlueHc0MVN4cjRGNzNxZ1hzSHJnbjIwbnlINjFjM19ubFRqZklVaGp4cV8yRTlaZXNGcnhCR2pLS3JtdWtwaEdOZVNpdThLdXkzWHh4RjRaOFo4NEV6ZmN0T2Nacjk5TnZVYzdLTk1aaXR4RFZaRVk5b3FySzlBMXE3cEQw?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-05",
    "image": {
      "src": "/covers/china-frees-pastor-jin-mingri.png",
      "alt": "A large crucifix standing atop a pine-covered mountain peak, lit by the rays of a setting sun, an emblem of steadfast faith.",
      "credit": "Caspar David Friedrich, 'Cross in the Mountains (Tetschen Altar)', 1808, Galerie Neue Meister, Dresden — public domain via Wikimedia Commons."
    },
    "edition": "Afternoon Edition · 5 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Peter Freed from Prison (Acts of the Apostles 12)",
        "excerpt": "And, behold, the angel of the Lord came upon him, and a light shined in the prison: and he smote Peter on the side, and raised him up, saying, Arise up quickly. And his chains fell off from his hands.",
        "source": "Bible (King James Version), Acts 12:7–8, via Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Acts"
      },
      {
        "category": "historical",
        "title": "Paul and Silas Delivered at Philippi (Acts of the Apostles 16)",
        "excerpt": "And at midnight Paul and Silas prayed, and sang praises unto God: and the prisoners heard them. And suddenly there was a great earthquake, so that the foundations of the prison were shaken: and immediately all the doors were opened, and every one's bands were loosed.",
        "source": "Bible (King James Version), Acts 16:25–26, via Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Acts"
      },
      {
        "category": "literary",
        "title": "John Bunyan, The Pilgrim's Progress (the Key called Promise)",
        "excerpt": "What a fool, quoth he, am I, thus to lie in a stinking Dungeon, when I may as well walk at liberty. I have a Key in my bosom called Promise, that will, I am persuaded, open any Lock in Doubting Castle.",
        "source": "John Bunyan, The Pilgrim's Progress (1678), Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/131/pg131.txt"
      },
      {
        "category": "literary",
        "title": "Boethius, The Consolation of Philosophy (Book I, Song II)",
        "excerpt": "Now, reft of reason's light, he lies,\nAnd bonds his neck oppress;\nWhile by the heavy load constrained,\nHis eyes to this dull earth are chained.",
        "source": "Boethius, The Consolation of Philosophy, trans. H. R. James, Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/14328/pg14328.txt"
      },
      {
        "category": "artistic",
        "title": "Beethoven, Fidelio, Op. 72 — the Prisoners' Chorus",
        "excerpt": "In Beethoven's only opera, prisoners long shut in a dark fortress are briefly let up into the daylight and raise the hushed, luminous chorus 'O welche Lust' — the joy of breathing free air once more. The wrongly jailed Florestan is at last delivered from his dungeon by the courage of his devoted wife, and the trembling hymn to liberty made the work an enduring anthem for prisoners of conscience.",
        "source": "Ludwig van Beethoven, Fidelio, Op. 72, IMSLP",
        "href": "https://imslp.org/wiki/Fidelio,_Op.72_(Beethoven,_Ludwig_van)"
      },
      {
        "category": "artistic",
        "title": "Raphael, Deliverance of Saint Peter (1514)",
        "excerpt": "Raphael's Vatican fresco stages the miracle of Acts 12 in blazing nocturnal light: an angel wrapped in supernatural radiance rouses the sleeping apostle, his chains slipping away, then leads him past armored guards slumped in slumber and out through the prison's iron gate to freedom.",
        "source": "Raphael, Deliverance of Saint Peter, Stanza di Eliodoro, Vatican — Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Raphael_-_Deliverance_of_Saint_Peter.jpg",
        "image": {
          "src": "/covers/china-frees-pastor-jin-mingri--art.png",
          "alt": "An angel bathed in radiant light wakes the sleeping apostle Peter and leads him past sleeping guards out of Herod's prison.",
          "credit": "Raphael, 'Deliverance of Saint Peter', 1514, fresco, Stanza di Eliodoro, Apostolic Palace, Vatican — public domain via Wikimedia Commons."
        }
      }
    ],
    "rank": 17
  },
  {
    "slug": "china-russia-navy-drills",
    "headline": "China and Russia announce joint naval drills off China's coast",
    "overview": "China and Russia announced they would hold joint naval exercises off China's coast, the latest in a series of drills between the two militaries. State media said the exercises would involve warships from both navies. The announcement comes amid heightened tensions in the western Pacific.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters (via Google News)",
        "href": "https://news.google.com/rss/articles/CBMimwFBVV95cUxOSkh1azJTOTZ0czF5WkFZZ185TlZPUVdkOERpUGVFTm12ekY4cjdFY2NiUzBrb2lHQ0ducnRkS0E2aGdjMTVfVHAyZ2txNEdGaVhpblFBZG5KTndFc0c1aEtBbHZ4UjVSNVJDNUJMRGpzRUMwVXIyU1p6MkV3Y2d5X0FvNkp4YW4xVnlfX25Ic0FTc2JqTFlGTHNVNy01RQ?oc=5"
      },
      {
        "name": "Nikkei Asia",
        "href": "https://asia.nikkei.com/politics/defense/chinese-russian-navies-to-hold-drills-off-china-coast-beijing-says"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-05",
    "image": {
      "src": "/covers/china-russia-navy-drills.png",
      "alt": "Warships steaming in formation at sea, the aircraft carrier USS Ronald Reagan leading a strike group across the western Pacific",
      "credit": "U.S. Navy photo by Mass Communication Specialist 2nd Class Christian Senyk (public domain)"
    },
    "edition": "Afternoon Edition · 5 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The allied Greek fleet mustering at Salamis (Herodotus, Histories, Book VIII)",
        "excerpt": "When those who came from Artemision had put their ships in to land at Salamis, the remainder of the naval force of the Hellenes, being informed of this, came over gradually to join them from Troizen: for they had been ordered beforehand to assemble at Pogon, which is the harbour of the Troizenians. There were assembled accordingly now many more ships than those which were in the sea-fight at Artemision, and from more cities. Over the whole was set as admiral the same man as at Artemision, namely Eurybiades the son of Eurycleides, a Spartan but not of the royal house; the Athenians however supplied by far the greatest number of ships and those which sailed the best.",
        "source": "Herodotus, The History of Herodotus, Vol. 2, trans. G. C. Macaulay (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/2456/pg2456.txt"
      },
      {
        "category": "historical",
        "title": "The Athenian armada sails for Sicily as a display of power (Thucydides, History of the Peloponnesian War, Book VI)",
        "excerpt": "The fleet had been elaborately equipped at great cost to the captains and the state; the treasury giving a drachma a day to each seaman, and providing empty ships, sixty men-of-war and forty transports, and manning these with the best crews obtainable; while the captains gave a bounty in addition to the pay from the treasury to the thranitae and crews generally, besides spending lavishly upon figure-heads and equipments, and one and all making the utmost exertions to enable their own ships to excel in beauty and fast sailing. Meanwhile the land forces had been picked from the best muster-rolls, and vied with each other in paying great attention to their arms and personal accoutrements. From this resulted not only a rivalry among themselves in their different departments, but an idea among the rest of the Hellenes that it was more a display of power and resources than an armament against an enemy.",
        "source": "Thucydides, History of the Peloponnesian War, trans. Richard Crawley (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/7142/pg7142.txt"
      },
      {
        "category": "literary",
        "title": "The Greek fleet charges at Salamis (Aeschylus, The Persians)",
        "excerpt": "First from the Grecian fleet rang out a cry, / A song of onset! and the island crags / Re-echoed to the shrill exulting sound. / Then on us Eastern men amazement fell / And fear in place of hope; for what we heard / Was not a call to flight! the Greeks rang out / Their holy, resolute, exulting chant, / Like men come forth to dare and do and die. / Their trumpets pealed, and fire was in that sound, / And with the dash of simultaneous oars / Replying to the war-chant, on they came, / Smiting the swirling brine, and in a trice / They flashed upon the vision of the foe!",
        "source": "Aeschylus, The Persians, in Four Plays of Aeschylus, trans. E. D. A. Morshead (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/8714/pg8714.txt"
      },
      {
        "category": "literary",
        "title": "The Catalogue of the Ships (Homer, Iliad, Book II)",
        "excerpt": "Say, virgins, seated round the throne divine, / All-knowing goddesses! immortal nine! / Since earth's wide regions, heaven's umneasur'd height, / And hell's abyss, hide nothing from your sight, / (We, wretched mortals! lost in doubts below, / But guess by rumour, and but boast we know,) / O say what heroes, fired by thirst of fame, / Or urged by wrongs, to Troy's destruction came. / To count them all, demands a thousand tongues, / A throat of brass, and adamantine lungs. / Daughters of Jove, assist! inspired by you / The mighty labour dauntless I pursue; / What crowded armies, from what climes they bring, / Their names, their numbers, and their chiefs I sing.",
        "source": "Homer, The Iliad, trans. Alexander Pope (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/6130/pg6130.txt"
      },
      {
        "category": "artistic",
        "title": "Thomas Arne, \"Rule, Britannia!\" from the masque Alfred (1740)",
        "excerpt": "Arne's grand ode swells from a stately dotted-rhythm summons into the thundering refrain \"Rule, Britannia! Britannia, rule the waves,\" a soprano and full chorus proclaiming a nation's dominion over the sea. Set to James Thomson's words for the masque Alfred, it turns naval supremacy itself into music, its broad D-major cadences imitating the roll of the ocean and the confidence of a fleet putting out to sea. For nearly three centuries it has been the sound of maritime power on parade, a martial anthem of ships and empire.",
        "source": "Rule Britannia (Arne, Thomas Augustine) — IMSLP",
        "href": "https://imslp.org/wiki/Rule_Britannia_(Arne,_Thomas_Augustine)"
      },
      {
        "category": "artistic",
        "title": "J. M. W. Turner, The Battle of Trafalgar (1822-1824)",
        "excerpt": "Turner's vast canvas, his largest work, compresses the whole din of Trafalgar into a single towering wall of masts, sails, and gunsmoke, with HMS Victory rising at the center as her signal flags stream out the famous message to the fleet. Around the flagship the sea churns with wreckage, drowning sailors, and the collapsing spars of the combined Franco-Spanish line, a chaos of collision and firepower that dwarfs the men caught within it. It stands as one of the great images of massed naval force, a fleet action rendered as sublime catastrophe.",
        "source": "Wikimedia Commons — File:Turner, The Battle of Trafalgar (1822).jpg",
        "href": "https://commons.wikimedia.org/wiki/File:Turner,_The_Battle_of_Trafalgar_(1822).jpg",
        "image": {
          "src": "/covers/china-russia-navy-drills--art.png",
          "alt": "Turner's painting of the Battle of Trafalgar, HMS Victory towering amid a mass of warships, sails, and smoke",
          "credit": "J. M. W. Turner (1775-1851), National Maritime Museum, London — public domain via Wikimedia Commons"
        }
      }
    ],
    "rank": 18
  },
  {
    "slug": "taiwan-anticommunist-classes",
    "headline": "Taiwan's military revives 'anti-communist' classes for graduates, citing the threat from China",
    "overview": "Taiwan's military said it was reinstating 'anti-communist' political education classes for newly commissioned officers, citing the growing threat from China. Officials framed the move as part of efforts to strengthen ideological resilience within the armed forces. The step reflects deepening concern in Taipei over Beijing's military pressure.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters (via Google News)",
        "href": "https://news.google.com/rss/articles/CBMixAFBVV95cUxPYmdzSWJNOFN5azlMdy04dlIyOWVRQVBaQ2llMzg2Y0lkSHFSTDkzaXF2MC1EUlIxLUZSQjJhVGxLUWpqUkRhbkNkajk5S2VVNTZYWXdfQ0dsWmhFclQ0dkFQbjNpdUFNTFNVdzVWdUwzNzZPQlpoMmlDNm5hS2h1Tk5WQmtuV0hBcnhQVW1mMGZvYjZZTUJ5RFpfbzV4MjZacnNwc0VQUTlPMXVsZnF6elIzREJKbmtkQkFxSl85eVhKSkRX?oc=5"
      },
      {
        "name": "The Jerusalem Post",
        "href": "https://www.jpost.com/international/article-901429"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-05",
    "image": {
      "src": "/covers/taiwan-anticommunist-classes.png",
      "alt": "Cadets of Taiwan's Republic of China Military Academy marching in formation on a road during a campus open house, 2014.",
      "credit": "玄史生 / Wikimedia Commons, CC BY-SA 3.0"
    },
    "edition": "Afternoon Edition · 5 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Plutarch, Life of Lycurgus (the Spartan agōgē)",
        "excerpt": "nor was it lawful, indeed, for the father himself to breed up the children after his own fancy; but as soon as they were seven years old they were to be enrolled in certain companies and classes, where they all lived under the same order and discipline, doing their exercises and taking their play together. Of these, he who showed the most conduct and courage was made captain; they had their eyes always upon him, obeyed his orders, and underwent patiently whatsoever punishment he inflicted; so that the whole course of their education was one continued exercise of a ready and perfect obedience. The old men, too, were spectators of their performances, and often raised quarrels and disputes among them, to have a good opportunity of finding out their different characters, and of seeing which would be valiant, which a coward, when they should come to more dangerous encounters. Reading and writing they gave them, just enough to serve their turn; their chief care was to make them good subjects, and to teach them to endure pain and conquer in battle.",
        "source": "Plutarch, Life of Lycurgus, trans. John Dryden (rev. A. H. Clough) — Wikisource",
        "href": "https://en.wikisource.org/wiki/Plutarch%27s_Lives_(Clough)/Life_of_Lycurgus"
      },
      {
        "category": "historical",
        "title": "Xenophon, Cyropaedia — the Persian education of boys in justice and obedience",
        "excerpt": "The boys go to school and give their time to learning justice and righteousness: they will tell you they come for that purpose, and the phrase is as natural with them as it is for us to speak of lads learning their letters. The masters spend the chief part of the day in deciding cases for their pupils: for in this boy-world, as in the grown-up world without, occasions of indictment are never far to seek. [...] Further, the boys are instructed in temperance and self-restraint, and they find the utmost help towards the attainment of this virtue in the self-respecting behaviour of their elders, shown them day by day.",
        "source": "Xenophon, Cyropaedia, Book I, trans. H. G. Dakyns — Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/2085/pg2085.txt"
      },
      {
        "category": "literary",
        "title": "Yevgeny Zamyatin, We — the ideology of the collective United State",
        "excerpt": "Every morning with six-wheeled precision, at the same hour, at the same minute, we wake up, millions of us at once. At the very same hour millions like one we begin our work, and millions like one, we finish it. United into a single body with a million hands, at the very same second, designated by the Tables, we carry the spoons to our mouths; at the same second we all go out to walk, go to the auditorium, to the halls for the Taylor exercises and then to bed.",
        "source": "Yevgeny Zamyatin, We, trans. Gregory Zilboorg (1924) — Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/61963/pg61963.txt"
      },
      {
        "category": "literary",
        "title": "Shakespeare, Henry V — the St. Crispin's Day speech on why and for whom soldiers fight",
        "excerpt": "This story shall the good man teach his son;\nAnd Crispin Crispian shall ne'er go by,\nFrom this day to the ending of the world,\nBut we in it shall be remembered-\nWe few, we happy few, we band of brothers;\nFor he to-day that sheds his blood with me\nShall be my brother; be he ne'er so vile,\nThis day shall gentle his condition;\nAnd gentlemen in England now-a-bed\nShall think themselves accurs'd they were not here,\nAnd hold their manhoods cheap whiles any speaks\nThat fought with us upon Saint Crispin's day.",
        "source": "William Shakespeare, The Life of King Henry V, Act IV, Scene III — Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/1784/pg1784.txt"
      },
      {
        "category": "artistic",
        "title": "La Marseillaise (Claude-Joseph Rouget de Lisle, 1792)",
        "excerpt": "Composed in a single feverish night in Strasbourg in 1792 by Claude-Joseph Rouget de Lisle, 'La Marseillaise' is the archetypal call-to-arms anthem, summoning citizens to rise against tyranny with its cry of 'Aux armes, citoyens!' Its surging, martial melody swept through the ranks of Revolutionary France and became the beating heart of a nation-in-arms, teaching soldiers not merely to fight but to know why, and for whom, they marched. It endures as the very sound of a people converting political conviction into collective military resolve.",
        "source": "La Marseillaise (Rouget de Lisle, Claude-Joseph) — IMSLP",
        "href": "https://imslp.org/wiki/La_Marseillaise_(Rouget_de_Lisle,_Claude-Joseph)"
      },
      {
        "category": "artistic",
        "title": "Jacques-Louis David, Oath of the Horatii (1784)",
        "excerpt": "Jacques-Louis David's 'Oath of the Horatii' freezes the instant three brothers stretch their arms toward their father's raised swords, swearing to fight and die for Rome while the grieving women slump aside. The rigid geometry of the salute against a stark classical arcade transforms a private family into an instrument of the state — a visual catechism of martial duty and civic self-sacrifice. Painted on the eve of the French Revolution, it became an enduring emblem of subordinating the individual to the patriotic cause.",
        "source": "Jacques-Louis David, Le Serment des Horaces — Wikimedia Commons (Louvre)",
        "href": "https://commons.wikimedia.org/wiki/File:Jacques-Louis_David,_Le_Serment_des_Horaces.jpg",
        "image": {
          "src": "/covers/taiwan-anticommunist-classes--art.png",
          "alt": "Neoclassical painting of three Roman brothers raising their arms in oath toward swords held by their father, with mourning women at the right.",
          "credit": "Jacques-Louis David (1784), Musée du Louvre — public domain via Wikimedia Commons"
        }
      }
    ],
    "rank": 19
  },
  {
    "slug": "uber-pauses-europe-delivery-hero",
    "headline": "Uber pauses European food-delivery expansion as it pursues a Delivery Hero deal",
    "overview": "Uber has paused the expansion of its food-delivery business in Europe as it pursues a deal involving the German company Delivery Hero, the Financial Times reported on July 5, 2026. The move suggests Uber is prioritizing a possible tie-up over organic growth in the region's crowded delivery market. Neither company confirmed the terms.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters (via Google News)",
        "href": "https://news.google.com/rss/articles/CBMivAFBVV95cUxPaWVmYTl5ZGlpY19WZWZxWE5KcTFEUXZUTFA1VmxDa2JWM0QyZ2hSdlo2N252cW1iNEdudlRUb184RDVyTU5jVVFsTWw3bzBtblFHdEdSemZOZXlTQVRuMWVyNU8yenJZTmhrcDZvLVY2TTYtT3M4SXZNMWFVUGNtZmhZUk9HTm5ZbWRtM2ZTa3hOaUlTTGF6dTJiNGRwWEp5V1BVZTNQQjF6QXY3d2s5VDdzVmNoblhtSVlnTw?oc=5"
      },
      {
        "name": "Investing.com (Reuters)",
        "href": "https://www.investing.com/news/stock-market-news/uber-pauses-europe-food-delivery-expansion-as-it-pursues-delivery-hero-deal-ft-reports-4775399"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-05",
    "image": {
      "src": "/covers/uber-pauses-europe-delivery-hero.png",
      "alt": "A food-delivery courier riding a bicycle with a branded insulated delivery backpack through a city street",
      "credit": "Môsieur J. [version 9.1] from Rouen, France, CC BY 2.0, via Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 5 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Macaulay on the East India Company's monopoly (Speech on Copyright, 1841)",
        "excerpt": "Or rather, why should we not restore the monopoly of the East India trade to the East India Company? Why should we not revive all those old monopolies which, in Elizabeth's reign, galled our fathers so severely that, maddened by intolerable wrong, they opposed to their sovereign a resistance before which her haughty spirit quailed for the first and for the last time? Was it the cheapness and excellence of commodities that then so violently stirred the indignation of the English people? I believe, Sir, that I may with safety take it for granted that the effect of monopoly generally is to make articles scarce, to make them dear, and to make them bad.",
        "source": "Thomas Babington Macaulay, The Miscellaneous Writings and Speeches of Lord Macaulay, Vol. 4 (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/2170/pg2170.txt"
      },
      {
        "category": "historical",
        "title": "Ida Tarbell, The History of the Standard Oil Company — the South Improvement Company circular",
        "excerpt": "“The object of this combination of interests,” ran the circular, “is understood to be twofold: firstly, to do away, at least in a great measure, with the excessive and undue competition now existing between the refining interest, by reason of there being a far greater refining capacity than is called for or justified by the existing petroleum-consuming requirements of the world; secondly, to avoid the heretofore undue competition between the various railroad companies transporting oil to the seaboard, by fixing a uniform rate of freight... It is also asserted that a prominent feature of the combination will be to limit the production of refined petroleum to such amounts as may serve, in a great measure, to do away with the serious periodical depressions in the article.”",
        "source": "Ida M. Tarbell, The History of the Standard Oil Company (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/60692/pg60692.txt"
      },
      {
        "category": "literary",
        "title": "Adam Smith, The Wealth of Nations — on trades conspiring against the public",
        "excerpt": "People of the same trade seldom meet together, even for merriment and diversion, but the conversation ends in a conspiracy against the public, or in some contrivance to raise prices. It is impossible, indeed, to prevent such meetings, by any law which either could be executed, or would be consistent with liberty and justice. But though the law cannot hinder people of the same trade from sometimes assembling together, it ought to do nothing to facilitate such assemblies, much less to render them necessary.",
        "source": "Adam Smith, An Inquiry into the Nature and Causes of the Wealth of Nations (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/3300/pg3300.txt"
      },
      {
        "category": "literary",
        "title": "Shakespeare, The Merchant of Venice — argosies overpeering the petty traffickers",
        "excerpt": "Your mind is tossing on the ocean, There where your argosies, with portly sail Like signiors and rich burghers on the flood, Or as it were the pageants of the sea, Do overpeer the petty traffickers That curtsy to them, do them reverence, As they fly by them with their woven wings.",
        "source": "William Shakespeare, The Merchant of Venice (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/1515/pg1515.txt"
      },
      {
        "category": "artistic",
        "title": "Arthur Honegger, Pacific 231 (Mouvement symphonique No. 1), H.53 (1923)",
        "excerpt": "Honegger builds an entire orchestral machine out of a stationary locomotive slowly gathering speed: a low hiss of held strings, then pistons of brass and percussion accelerating into a hammering, unstoppable momentum before the great mass brakes to a halt. It is the sound of industrial power consolidating motion into a single overwhelming force — apt for a company that would rather absorb a continent's network than build track by track. The relentless churn evokes the logic of scale itself, where the biggest engine on the line makes every smaller trafficker curtsy in its wake.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Pacific_231,_H.53_(Honegger,_Arthur)"
      },
      {
        "category": "artistic",
        "title": "Quentin Matsys, The Moneylender and His Wife (1514)",
        "excerpt": "In Matsys' Antwerp panel a moneylender weighs gold coins on a delicate balance while his wife, a book of devotions in her lap, lets her eyes drift to the glittering pile — piety quietly displaced by the reckoning of value. Coins, pearls, a convex mirror and account-books crowd the table, portraying the merchant city where commerce, credit and consolidation of wealth had become the measure of all things. It is one of Northern art's sharpest images of the marketplace mind: everything, even the sacred, subordinated to the scales.",
        "source": "Quentin Matsys, The Moneylender and His Wife, Louvre (Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Quentin_Massys_001.jpg",
        "image": {
          "src": "/covers/uber-pauses-europe-delivery-hero--art.png",
          "alt": "Renaissance painting of a moneylender weighing gold coins on a balance while his wife watches, a table strewn with coins, pearls and account books",
          "credit": "Quentin Matsys (1514), Louvre; public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 20
  },
  {
    "slug": "foxconn-q2-revenue-geopolitics",
    "headline": "Foxconn reports a jump in second-quarter revenue but warns on geopolitical risk",
    "overview": "Foxconn, the world's largest contract electronics maker and a key Apple supplier, reported a jump in second-quarter revenue on strong demand, while cautioning that geopolitical uncertainty could weigh on its outlook. The Taiwan-based company pointed to trade tensions and shifting supply chains as risks. Its results are watched as a barometer of global technology demand.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters (via Google News)",
        "href": "https://news.google.com/rss/articles/CBMingFBVV95cUxPWmx3T3BFZ1E1WU1nRUZ1S1BJV3lNNnh0Vm5pRFIxYkw4STEzcDRhLTdSd0xrNVhsZEJEZjRCUTVXSmJoVmVJSXNwU1RKTmVxX2RpeVdEWFlyM0QtLWt5bVJydXhuYVMyZ2wzTGVFMWxTck16bEM3THJjWWl1X0FSOFRleklxdjJQMHU4QnN5U1BicnZvdjFYRlNjVEdrZw?oc=5"
      },
      {
        "name": "Reuters (via Investing.com)",
        "href": "https://www.investing.com/news/stock-market-news/foxconn-secondquarter-revenue-jumps-40-yy-4775408"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-05",
    "image": {
      "src": "/covers/foxconn-q2-revenue-geopolitics.png",
      "alt": "An automated machine placing electronic components onto a printed circuit board on a factory assembly line.",
      "credit": "Nenad Stojković, CC BY 2.0, via Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 5 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Adam Smith on the pin factory, The Wealth of Nations (1776)",
        "excerpt": "One man draws out the wire; another straights it; a third cuts it; a fourth points it; a fifth grinds it at the top for receiving the head; to make the head requires two or three distinct operations; to put it on is a peculiar business; to whiten the pins is another; it is even a trade by itself to put them into the paper; and the important business of making a pin is, in this manner, divided into about eighteen distinct operations, which, in some manufactories, are all performed by distinct hands, though in others the same man will sometimes perform two or three of them. I have seen a small manufactory of this kind, where ten men only were employed, and where some of them consequently performed two or three distinct operations. But though they were very poor, and therefore but indifferently accommodated with the necessary machinery, they could, when they exerted themselves, make among them about twelve pounds of pins in a day. There are in a pound upwards of four thousand pins of a middling size. Those ten persons, therefore, could make among them upwards of forty-eight thousand pins in a day.",
        "source": "Adam Smith, An Inquiry into the Nature and Causes of the Wealth of Nations (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/3300/pg3300.txt"
      },
      {
        "category": "historical",
        "title": "John Evelyn on the Arsenal of Venice, Diary (1645)",
        "excerpt": "The arsenal is thought to be one of the best furnished in the world. We entered by a strong port, always guarded, and, ascending a spacious gallery, saw arms of back, breast, and head, for many thousands; in another were saddles; over them, ensigns taken from the Turks. Another hall is for the meeting of the Senate; passing a graff, are the smiths' forges, where they are continually employed on anchors and iron work. Near it is a well of fresh water, which they impute to two rhinoceros's horns which they say lie in it, and will preserve it from ever being empoisoned. Then we came to where the carpenters were building their magazines of oars, masts, etc., for an hundred galleys and ships, which have all their apparel and furniture near them. Then the foundry, where they cast ordnance; the forge is 450 paces long, and one of them has thirteen furnaces. There is one cannon, weighing 16,573 pounds, cast while Henry the Third dined, and put into a galley built, rigged, and fitted for launching within that time.",
        "source": "The Diary of John Evelyn, Vol. 1 (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/41218/pg41218.txt"
      },
      {
        "category": "literary",
        "title": "Charles Dickens on Coketown, Hard Times (1854)",
        "excerpt": "It was a town of red brick, or of brick that would have been red if the smoke and ashes had allowed it; but as matters stood, it was a town of unnatural red and black like the painted face of a savage. It was a town of machinery and tall chimneys, out of which interminable serpents of smoke trailed themselves for ever and ever, and never got uncoiled. It had a black canal in it, and a river that ran purple with ill-smelling dye, and vast piles of building full of windows where there was a rattling and a trembling all day long, and where the piston of the steam-engine worked monotonously up and down, like the head of an elephant in a state of melancholy madness. It contained several large streets all very like one another, and many small streets still more like one another, inhabited by people equally like one another, who all went in and out at the same hours, with the same sound upon the same pavements, to do the same work, and to whom every day was the same as yesterday and to-morrow, and every year the counterpart of the last and the next.",
        "source": "Charles Dickens, Hard Times (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/786/pg786.txt"
      },
      {
        "category": "literary",
        "title": "Thomas Hood, The Song of the Shirt (1843)",
        "excerpt": "With fingers weary and worn,\nWith eyelids heavy and red,\nA woman sat in unwomanly rags,\nPlying her needle and thread—\nStitch! stitch! stitch!\nIn poverty, hunger, and dirt,\nAnd still with a voice of dolorous pitch\nShe sang the \"Song of the Shirt!\"\n\n\"Work! work! work!\nWhile the cock is crowing aloof!\nAnd work—work—work,\nTill the stars shine through the roof!\nIt's O! to be a slave\nAlong with the barbarous Turk,\nWhere woman has never a soul to save,\nIf this is Christian work!\"",
        "source": "Thomas Hood, The Poetical Works of Thomas Hood (Wikisource)",
        "href": "https://en.wikisource.org/wiki/The_Poetical_Works_of_Thomas_Hood/The_Song_of_the_Shirt"
      },
      {
        "category": "artistic",
        "title": "Arthur Honegger, Pacific 231, H.53 (1923)",
        "excerpt": "Arthur Honegger's Pacific 231 is a symphonic movement that portrays a great steam locomotive of that name, opening from near-stillness and mounting to a thundering full-throttle momentum before braking back toward rest. Honegger said he wanted to render not the imitation of engine noises but the visual impression and physical thrill of the machine — the swelling pressure, the hammering acceleration, three hundred tons of metal hurtling through the night. It remains one of the great modernist hymns to industry, the roar of engineered power translated into pure orchestral rhythm.",
        "source": "IMSLP / Petrucci Music Library (public-domain scores)",
        "href": "https://imslp.org/wiki/Pacific_231_(Honegger,_Arthur)"
      },
      {
        "category": "artistic",
        "title": "Joseph Wright of Derby, An Iron Forge (1772)",
        "excerpt": "Joseph Wright of Derby's An Iron Forge gathers a family around a bar of white-hot iron resting on the anvil, the incandescent metal itself casting the light that floods the whole nocturnal scene. Painted at the dawn of the Industrial Revolution, it lends the ironworker's labour the solemn drama once reserved for religious painting, while the water-powered tilt-hammer looming in the shadows announces the arrival of the machine age.",
        "source": "Joseph Wright of Derby, An Iron Forge (Tate Britain), via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Joseph_Wright_-_An_Iron_Forge_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/foxconn-q2-revenue-geopolitics--art.png",
          "alt": "Eighteenth-century painting of a family gathered around a glowing white-hot iron ingot on an anvil in a dim forge, the metal lighting their faces.",
          "credit": "Joseph Wright of Derby, An Iron Forge (1772), Tate Britain; public domain via Wikimedia Commons"
        }
      }
    ],
    "rank": 21
  },
  {
    "slug": "iraq-oil-export-pipeline-agreements",
    "headline": "Iraq approves preliminary agreements to study new oil-export pipeline projects",
    "overview": "Iraq's cabinet approved preliminary agreements to study new strategic oil-export pipeline projects, part of efforts to diversify the country's export routes. Officials said the agreements would allow feasibility work to proceed before any construction. Iraq is one of OPEC's largest producers and has long sought to reduce its dependence on existing export channels.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters (via Google News)",
        "href": "https://news.google.com/rss/articles/CBMiwgFBVV95cUxPanVDQU1kSjJIRXJsYkpBX1RPS2lZM1JZOERFMFVRdzloOG1YTUFSalBHMW9DTTA5d1NLWGpaUEVGRjlCZndKNUc1Q29taHNNWmxaSnNQZWx3cnZDc1BiNWJBUnNrM0kxTy1Zd19xLUVTdEM1TG53dE1valZMdHV6clphU0VIcGNYeDU2M3gtYWpyWXZ3YjJvaUYxX3VwUVNoUnVUak5pVzVvUzNqM19KVlRMZ2FqVlhralpCV1pvS1EwQQ?oc=5"
      },
      {
        "name": "Asharq Al-Awsat (English)",
        "href": "https://english.aawsat.com/business/5292266-iraq-approves-preliminary-agreements-study-strategic-oil-export-pipeline-projects"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-05",
    "image": {
      "src": "/covers/iraq-oil-export-pipeline-agreements.png",
      "alt": "The elevated Trans-Alaska oil pipeline snaking across open terrain, a raised steel conduit carrying crude over the land.",
      "credit": "Luca Galuzzi (Lucag), CC BY-SA 2.5, via Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 5 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Frontinus, De Aquaeductu (The Aqueducts of Rome), §16",
        "excerpt": "With such an array of indispensable structures carrying so many waters, compare, if you will, the idle Pyramids or the useless, though famous, works of the Greeks!",
        "source": "Frontinus, The Two Books on the Water Supply of the City of Rome, trans. Charles E. Bennett (LacusCurtius)",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Frontinus/De_Aquis/Bennett/1*.html"
      },
      {
        "category": "historical",
        "title": "Herodotus, Histories, Book II.158 — the canal from the Nile to the Red Sea",
        "excerpt": "The son of Psammetichos was Necos, and he became king of Egypt. This man was the first who attempted the channel leading to the Erythraian Sea, which Dareios the Persian afterwards completed: the length of this is a voyage of four days, and in breadth it was so dug that two triremes could go side by side driven by oars; and the water is brought into it from the Nile.",
        "source": "Herodotus, The History of Herodotus, trans. G. C. Macaulay (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/2707/pg2707.txt"
      },
      {
        "category": "literary",
        "title": "Samuel Taylor Coleridge, \"Kubla Khan\"",
        "excerpt": "In Xanadu did Kubla Khan\nA stately pleasure-dome decree:\nWhere Alph, the sacred river, ran\nThrough caverns measureless to man\nDown to a sunless sea.",
        "source": "The Complete Poetical Works of Samuel Taylor Coleridge (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/29090/pg29090.txt"
      },
      {
        "category": "literary",
        "title": "John Milton, Paradise Lost, Book I (Mammon and the ransacking of the earth)",
        "excerpt": "by him first\nMen also, and by his suggestion taught,\nRansack'd the Center, and with impious hands\nRifl'd the bowels of thir mother Earth\nFor Treasures better hid. Soon had his crew\nOp'nd into the Hill a spacious wound\nAnd dig'd out ribs of Gold. Let none admire\nThat riches grow in Hell; that soyle may best\nDeserve the pretious bane.",
        "source": "John Milton, Paradise Lost (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/20/pg20.txt"
      },
      {
        "category": "artistic",
        "title": "Bedřich Smetana, \"Vltava\" (The Moldau), from Má vlast",
        "excerpt": "Smetana's symphonic poem traces a single river from two trickling mountain springs, through hunting horns and a village wedding, past moonlit water-nymphs, into the roar of the St. John's Rapids, until the broadened stream sweeps in full-throated majesty past the castle of Vyšehrad. The music is pure flowing motion, the rippling strings never ceasing as the melody swells with the current's gathering power. It is the sound of a channel of water carrying a nation's life toward the sea, an apt echo of any great conduit that binds a land's wealth to distant waters.",
        "source": "Vltava, JB 1:112/2 (Smetana) — IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Vltava,_JB_1:112/2_(Smetana,_Bed%C5%99ich)"
      },
      {
        "category": "artistic",
        "title": "Hubert Robert, Le Pont du Gard (1786)",
        "excerpt": "Hubert Robert's grand canvas monumentalizes the Roman aqueduct of the Pont du Gard, its tiered arches glowing in warm evening light above the Gardon river. Painted for Louis XVI and now in the Louvre, the picture treats the ancient water-conduit as sublime architecture, a triumph of engineering that carried a vital resource across a landscape.",
        "source": "Musée du Louvre / Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Pont-du-gard-hubert-robert-1786.jpg",
        "image": {
          "src": "/covers/iraq-oil-export-pipeline-agreements--art.png",
          "alt": "Hubert Robert's painting of the towering tiered arches of the Roman Pont du Gard aqueduct spanning a river valley in golden light.",
          "credit": "Hubert Robert, Le Pont du Gard (1786), Musée du Louvre, public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 22
  },
  {
    "slug": "superflex-fish-architecture-sea-level",
    "headline": "Superflex and KWY.studio design underwater 'architecture for fish' for a rising-sea future",
    "overview": "The art collective Superflex and KWY.studio unveiled 'architecture for fish,' a design proposal for submerged structures intended to shelter marine life as sea levels rise, Dezeen reported on July 5, 2026. The project imagines coastal infrastructure that would become habitat for fish in a flooded future. It blends art, architecture and climate adaptation.",
    "genre": "Climate",
    "sources": [
      {
        "name": "Dezeen",
        "href": "https://www.dezeen.com/2026/07/05/superflex-kwy-studio-suepr-kello-fish-architecture/"
      },
      {
        "name": "Wallpaper*",
        "href": "https://www.wallpaper.com/art/superflex-super-reef"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-05",
    "image": {
      "src": "/covers/superflex-fish-architecture-sea-level.png",
      "alt": "A coral outcrop teeming with fish on Flynn Reef, Great Barrier Reef, Australia",
      "credit": "Toby Hudson, CC BY-SA 3.0, via Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 5 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Plato, Timaeus — the sinking of Atlantis",
        "excerpt": "A little while afterwards there were great earthquakes and floods, and your warrior race all sank into the earth; and the great island of Atlantis also disappeared in the sea.",
        "source": "Plato, Timaeus (trans. Benjamin Jowett)",
        "href": "https://www.gutenberg.org/cache/epub/1572/pg1572.txt"
      },
      {
        "category": "historical",
        "title": "Ovid, Metamorphoses Book I — the flood of Deucalion",
        "excerpt": "The Nereids wonder at the groves, the cities, and the houses under water; dolphins get into the woods, and run against the lofty branches, and beat against the tossed oaks.",
        "source": "Ovid, Metamorphoses, Book I (trans. Henry T. Riley)",
        "href": "https://www.gutenberg.org/files/21765/21765-h/21765-h.htm"
      },
      {
        "category": "literary",
        "title": "Shakespeare, The Tempest — Ariel's song 'Full fathom five'",
        "excerpt": "Full fathom five thy father lies;\nOf his bones are coral made;\nThose are pearls that were his eyes:\nNothing of him that doth fade,\nBut doth suffer a sea-change\nInto something rich and strange.\nSea-nymphs hourly ring his knell:\nDing-dong.\nHark! now I hear them—Ding-dong, bell.",
        "source": "William Shakespeare, The Tempest, Act I, Scene 2",
        "href": "https://www.gutenberg.org/cache/epub/23042/pg23042.txt"
      },
      {
        "category": "literary",
        "title": "Jules Verne, Twenty Thousand Leagues Under the Sea",
        "excerpt": "The great depths of the ocean are entirely unknown to us. Soundings cannot reach them. What passes in those remote depths—what beings live, or can live, twelve or fifteen miles beneath the surface of the waters—what is the organisation of these animals, we can scarcely conjecture.",
        "source": "Jules Verne, Twenty Thousand Leagues Under the Sea",
        "href": "https://www.gutenberg.org/cache/epub/164/pg164.txt"
      },
      {
        "category": "artistic",
        "title": "Claude Debussy, 'La cathédrale engloutie' (The Sunken Cathedral)",
        "excerpt": "Debussy's tenth prelude from Préludes, Book I, conjures a legendary cathedral that rises streaming from beneath the sea off the Breton coast, only to sink again into the deep. Great parallel chords toll like submerged bells while swelling arpeggios evoke water closing back over stone, so the whole piece seems to breathe underwater. It remains one of music's most haunting images of a drowned monument glimpsed through the waves.",
        "source": "Claude Debussy, Préludes, Livre 1 (IMSLP)",
        "href": "https://imslp.org/wiki/Pr%C3%A9ludes,_Livre_1_(Debussy,_Claude)"
      },
      {
        "category": "artistic",
        "title": "Arnold Böcklin, Im Spiel der Wellen (Play of the Waves)",
        "excerpt": "Böcklin's 1883 canvas plunges the viewer into a churning green sea where tritons and nereids tumble among the whitecaps, half-human bodies threading through the swell. The waves themselves seem alive, foaming and heaving as the mythic creatures ride and wrestle the water. It is a vision of the sea as a teeming, populated world in perpetual restless motion beneath the light.",
        "source": "Wikimedia Commons — File:Arnold Böcklin - Im Spiel der Wellen (1883).jpg",
        "href": "https://commons.wikimedia.org/wiki/File:Arnold_B%C3%B6cklin_-_Im_Spiel_der_Wellen_(1883).jpg",
        "image": {
          "src": "/covers/superflex-fish-architecture-sea-level--art.png",
          "alt": "Mythical sea creatures, tritons and nereids, tumbling and swimming among churning green ocean waves in Böcklin's painting",
          "credit": "Arnold Böcklin (1827–1901), public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 23
  },
  {
    "slug": "terta-iceland-power-station-playground",
    "headline": "Terta turns a decommissioned Reykjavik power station into a colourful children's play space",
    "overview": "The studio Terta has transformed Elliðaárstöð, a decommissioned power station in Reykjavik, Iceland, into a brightly coloured space for 'learning by playing,' Dezeen reported on July 5, 2026. The project repurposes the historic industrial building into a children's play and education venue. It preserves the structure's heritage while giving it a new public use.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Dezeen",
        "href": "https://www.dezeen.com/2026/07/05/terta-ellidaarstod-power-station/"
      },
      {
        "name": "Terta — Elliðaárstöð (studio project page)",
        "href": "https://www.terta.is/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-05",
    "image": {
      "src": "/covers/terta-iceland-power-station-playground.png",
      "alt": "A small Icelandic hydroelectric power station building of pale concrete standing beside a river with a rocky gorge and waterfall behind it",
      "credit": "Andakílsvirkjun hydroelectric power station, Iceland. Photo by Bromr, CC BY-SA 3.0, via Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 5 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Froebel's kindergarten idea: learning by playing",
        "excerpt": "Play is the natural, the appropriate business and occupation of the child left to his own resources, and we must strive to turn our lessons into that channel,--only thus shall we reach the highest measure of true success.",
        "source": "Kate Douglas Wiggin & Nora Archibald Smith, Froebel's Gifts (1895)",
        "href": "https://www.gutenberg.org/cache/epub/31097/pg31097.txt"
      },
      {
        "category": "historical",
        "title": "Jane Addams on the city's duty to provide for play",
        "excerpt": "Only in the modern city have men concluded that it is no longer necessary for the municipality to provide for the insatiable desire for play. In so far as they have acted upon this conclusion, they have entered upon a most difficult and dangerous experiment; and this at the very moment when the city has become distinctly industrial, and daily labor is continually more monotonous and subdivided.",
        "source": "Jane Addams, The Spirit of Youth and the City Streets (1909)",
        "href": "https://www.gutenberg.org/cache/epub/16221/pg16221.txt"
      },
      {
        "category": "literary",
        "title": "Block City — Robert Louis Stevenson",
        "excerpt": "What are you able to build with your blocks?\nCastles and palaces, temples and docks.\nRain may keep raining, and others go roam,\nBut I can be happy and building at home.\n\nLet the sofa be mountains, the carpet be sea,\nThere I'll establish a city for me:\nA kirk and a mill and a palace beside,\nAnd a harbour as well where my vessels may ride.\n\nGreat is the palace with pillar and wall,\nA sort of a tower on the top of it all,\nAnd steps coming down in an orderly way\nTo where my toy vessels lie safe in the bay.\n\nThis one is sailing and that one is moored:\nHark to the song of the sailors on board!\nAnd see, on the steps of my palace, the kings\nComing and going with presents and things!\n\nNow I have done with it, down let it go!\nAll in a moment the town is laid low.\nBlock upon block lying scattered and free,\nWhat is there left of my town by the sea?\n\nYet as I saw it, I see it again,\nThe kirk and the palace, the ships and the men,\nAnd as long as I live and where'er I may be,\nI'll always remember my town by the sea.",
        "source": "Robert Louis Stevenson, A Child's Garden of Verses (1885)",
        "href": "https://www.gutenberg.org/cache/epub/25609/pg25609.txt"
      },
      {
        "category": "literary",
        "title": "The Echoing Green — William Blake",
        "excerpt": "The sun does arise,\nAnd make happy the skies;\nThe merry bells ring\nTo welcome the Spring;\nThe skylark and thrush,\nThe birds of the bush,\nSing louder around\nTo the bells' cheerful sound;\nWhile our sports shall be seen\nOn the echoing green.\n\nOld John, with white hair,\nDoes laugh away care,\nSitting under the oak,\nAmong the old folk.\nThey laugh at our play,\nAnd soon they all say,\n'Such, such were the joys\nWhen we all—girls and boys—\nIn our youth-time were seen\nOn the echoing green.'\n\nTill the little ones, weary,\nNo more can be merry:\nThe sun does descend,\nAnd our sports have an end.\nRound the laps of their mothers\nMany sisters and brothers,\nLike birds in their nest,\nAre ready for rest,\nAnd sport no more seen\nOn the darkening green.",
        "source": "William Blake, Songs of Innocence and of Experience (1789)",
        "href": "https://www.gutenberg.org/cache/epub/1934/pg1934.txt"
      },
      {
        "category": "artistic",
        "title": "Kinderszenen (Scenes from Childhood), Op. 15 — Robert Schumann",
        "excerpt": "Schumann's thirteen miniatures for solo piano look back on childhood not from inside it but through an adult's tender remembering, each tiny scene a room in a house of play. Curious tales, games of tag ('Hasche-Mann'), the hobby-horse knight and the dreamy 'Träumerei' conjure the small, serious world of a child at play, before the closing 'Der Dichter spricht' lets the poet step forward to speak. It is exactly the spirit a colourful play-space hopes to bottle: wonder made from the plainest materials.",
        "source": "IMSLP — Kinderszenen, Op.15 (Schumann, Robert)",
        "href": "https://imslp.org/wiki/Kinderszenen,_Op.15_(Schumann,_Robert)"
      },
      {
        "category": "artistic",
        "title": "Children's Games — Pieter Bruegel the Elder (1560)",
        "excerpt": "Bruegel fills an entire town square with some two hundred children absorbed in roughly eighty games—leapfrog, hoops, hobby-horses, blind-man's-buff, handstands against a brick wall—turning ordinary streets and buildings into a vast open-air playground. Painted in 1560, it is one of art's great hymns to play as the serious business of childhood, and a fitting ancestor to a whole building given over to learning by playing.",
        "source": "Kunsthistorisches Museum, Vienna — via Wikimedia Commons (public domain)",
        "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_the_Elder_-_Children%E2%80%99s_Games_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/terta-iceland-power-station-playground--art.png",
          "alt": "A crowded 16th-century town square packed with hundreds of children playing dozens of different games",
          "credit": "Pieter Bruegel the Elder, Children's Games (1560), Kunsthistorisches Museum, Vienna — public domain via Wikimedia Commons"
        }
      }
    ],
    "rank": 24
  },
  {
    "slug": "new-york-ship-parade-banners-removed",
    "headline": "Vessel is removed from New York's July 4 ship parade over politically charged banners",
    "overview": "A vessel was removed from an international ship parade in New York Harbor after it displayed banners that organizers deemed politically charged, Reuters reported on July 5, 2026. The parade was part of festivities marking the United States' 250th anniversary of independence. Organizers said the display violated the event's rules.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Reuters (via Google News)",
        "href": "https://news.google.com/rss/articles/CBMitwFBVV95cUxQNU5VTHZkWTIyNkE0Ry0zOFNsVE5odUpqb0NEQnplMFRIQ1dSb3RuWDlpN1RZUWk4VUJ4Mzh5WkF0eC1hdWtWaFpial9Zb0J0dm11ekg5NDBTcEs1cnhLU3lzWGRST1BBamdYT0cxdUFqeER0ZG9TWW44SmlQVUttYVBBd1RYanVQZWZXVHYzNDgzX3A0OWhtaXlwZjd4cWpVUS1PN3E4RHdlOXdPUFN3SWpVQ3VOWkE?oc=5"
      },
      {
        "name": "Newsweek",
        "href": "https://www.newsweek.com/historic-activist-ship-ejected-nyc-july-4-parade-over-climate-banners-12158749"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-05",
    "image": {
      "src": "/covers/new-york-ship-parade-banners-removed.png",
      "alt": "Tall ships led by the U.S. Coast Guard barque Eagle parade through New York Harbor during OpSail 2000.",
      "credit": "Photographer's Mate 1st Class Johnny Bivera, U.S. Navy (public domain) — OpSail 2000 / International Naval Review, New York Harbor"
    },
    "edition": "Afternoon Edition · 5 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Xerxes Reviews His Fleet at Abydos (The Histories, Book VII)",
        "excerpt": "When Xerxes had come into the midst of Abydos, he had a desire to see all the army; and there had been made purposely for him beforehand upon a hill in this place a raised seat of white stone, which the people of Abydos had built at the command of the king given beforehand. There he took his seat, and looking down upon the shore he gazed both upon the land-army and the ships; and gazing upon them he had a longing to see a contest take place between the ships; and when it had taken place and the Phenicians of Sidon were victorious, he was delighted both with the contest and with the whole armament.",
        "source": "Herodotus, The Histories, trans. G. C. Macaulay — Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/2456/pg2456.txt"
      },
      {
        "category": "historical",
        "title": "The Athenian Armada Sails from the Piraeus (History of the Peloponnesian War, Book VI)",
        "excerpt": "The ships being now manned, and everything put on board with which they meant to sail, the trumpet commanded silence, and the prayers customary before putting out to sea were offered, not in each ship by itself, but by all together to the voice of a herald; and bowls of wine were mixed through all the armament, and libations made by the soldiers and their officers in gold and silver goblets. In their prayers joined also the crowds on shore, the citizens and all others that wished them well. The hymn sung and the libations finished, they put out to sea, and first out in column then raced each other as far as Aegina.",
        "source": "Thucydides, History of the Peloponnesian War, trans. Richard Crawley — Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/7142/pg7142.txt"
      },
      {
        "category": "literary",
        "title": "Crossing Brooklyn Ferry",
        "excerpt": "Come on, ships from the lower bay! pass up or down, white-sail’d schooners, sloops, lighters! Flaunt away, flags of all nations! be duly lower’d at sunset!",
        "source": "Walt Whitman, Leaves of Grass — Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/1322/pg1322.txt"
      },
      {
        "category": "literary",
        "title": "The Mask of Anarchy",
        "excerpt": "‘Rise like Lions after slumber / In unvanquishable number, / Shake your chains to earth like dew / Which in sleep had fallen on you— / Ye are many—they are few.",
        "source": "Percy Bysshe Shelley, The Complete Poetical Works — Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/4800/pg4800.txt"
      },
      {
        "category": "artistic",
        "title": "Water Music, HWV 348–350",
        "excerpt": "Handel composed the Water Music for King George I's grand river procession up the Thames on 17 July 1717, when a barge of some fifty musicians played alongside the royal barge as it drifted from Whitehall to Chelsea. Its sparkling hornpipes, stately minuets, and pealing horn and trumpet fanfares were designed to carry across open water to crowds thronging the banks and countless accompanying boats. It remains the definitive sound of festive nautical pageantry — ceremony afloat, meant for a fleet of vessels on parade.",
        "source": "George Frideric Handel — IMSLP",
        "href": "https://imslp.org/wiki/Water_Music,_HWV_348-350_(Handel,_George_Frideric)"
      },
      {
        "category": "artistic",
        "title": "A Regatta on the Grand Canal",
        "excerpt": "Canaletto's Regatta on the Grand Canal captures Venice's great civic water-festival: gondolas and decorated boats crowd the canal in a choreographed maritime procession while spectators mass on balconies, quays, and the ornate floating grandstand (the macchina). The painting distills the enduring appeal of the harbor pageant — a city turning its waterways into a stage of ships, flags, and public spectacle.",
        "source": "Giovanni Antonio Canal (Canaletto), Gemäldegalerie Alte Meister, Dresden — Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Giovanni_Antonio_Canal,_il_Canaletto_-_Regatta_on_the_Canale_Grande_-_WGA03904.jpg",
        "image": {
          "src": "/covers/new-york-ship-parade-banners-removed--art.png",
          "alt": "Boats and gondolas crowd Venice's Grand Canal during a regatta as spectators watch from palace balconies and quays.",
          "credit": "Canaletto, Regatta on the Grand Canal (c. 1740), Web Gallery of Art — public domain via Wikimedia Commons"
        }
      }
    ],
    "rank": 25
  },
  {
    "slug": "iran-khamenei-succession-question",
    "headline": "Khamenei's sons appear at his Tehran funeral as questions mount over his successor",
    "overview": "Three of the late Ayatollah Ali Khamenei's sons appeared at his funeral in Tehran, while the cleric reported to be his expected successor did not appear publicly, according to Reuters, sharpening questions over who will become Iran's next supreme leader. Khamenei, who led Iran for decades, was killed in the recent war. The succession is among the most consequential in the country's modern history.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters (via Google News)",
        "href": "https://news.google.com/rss/articles/CBMiwwFBVV95cUxNRmcyb0xaUjZMcUNjSDFQODFUX0Y1TDg0bDlHUkxLZE5FeWZQajJtZnRKYjRWdzZjN0RmRWcwdFN1dWtkLXdhUWFGNGJKVTFSSDJVRnV4Yy05YWJVbjh4RjJyS1YxdnBOMW9jQVp5Uk9aa1hxYmd1RndVZER6dTBSa0V2cnQxTTFscG5rY1hpV3NEMVNIeWJ0TFF4WE9XcEdoanFyVmtkenhSbXhvdnU1c3BQNEVOVmM1OHgyVmJvdGR3aWc?oc=5"
      },
      {
        "name": "NPR — \"Dayslong funeral for slain Supreme Leader Ayatollah Ali Khamenei begins in Tehran\"",
        "href": "https://www.npr.org/2026/07/04/nx-s1-5882083/iran-funeral-ayatollah-ali-khamenei"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-05",
    "image": {
      "src": "/covers/iran-khamenei-succession-question.png",
      "alt": "Baroque painting of grieving Roman soldiers and family gathered around the deathbed of a leader, mourning as the question of who will succeed him hangs over the scene.",
      "credit": "Nicolas Poussin, The Death of Germanicus (1627), Minneapolis Institute of Art — public domain, via Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 5 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Arrian on the death of Alexander the Great: \"To the best\"",
        "excerpt": "It is said that when his soldiers passed by him he was unable to speak; yet he greeted each of them with his right hand, raising his head with difficulty and making a sign with his eyes. Some authors, however, have related that his Companions asked him to whom he left his kingdom; and that he replied: \"To the best.\"",
        "source": "Arrian, The Anabasis of Alexander, Book VII, Ch. XXVI (trans. E. J. Chinnock)",
        "href": "https://en.wikisource.org/wiki/The_Anabasis_of_Alexander/Book_VII/Chapter_XXVI"
      },
      {
        "category": "historical",
        "title": "Tacitus on the accession of Tiberius after Augustus",
        "excerpt": "So Tiberius Nero, though he took to himself the same phrases and the same face, entered the palace... one and the same report told men that Augustus was dead and that Tiberius Nero was master of the State. The first crime of the new reign was the murder of Postumus Agrippa.",
        "source": "Tacitus, The Annals, Book I",
        "href": "https://en.wikisource.org/wiki/The_Annals_(Tacitus)/Book_1"
      },
      {
        "category": "literary",
        "title": "The contested succession of David: Adonijah versus Solomon (1 Kings 1)",
        "excerpt": "Then Adonijah the son of Haggith exalted himself, saying, I will be king: and he prepared him chariots and horsemen, and fifty men to run before him. And his father had not displeased him at any time in saying, Why hast thou done so? and he also was a very goodly man; and his mother bare him after Absalom. And he conferred with Joab the son of Zeruiah, and with Abiathar the priest: and they following Adonijah helped him. ... So Zadok the priest, and Nathan the prophet, and Benaiah the son of Jehoiada, and the Cherethites, and the Pelethites, went down, and caused Solomon to ride upon king David's mule, and brought him to Gihon. And Zadok the priest took an horn of oil out of the tabernacle, and anointed Solomon.",
        "source": "The Bible, King James Version, 1 Kings 1:5-7, 38-39",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/1_Kings"
      },
      {
        "category": "literary",
        "title": "Prince Henry takes the crown from his dying father (Shakespeare, Henry IV, Part 2)",
        "excerpt": "Why doth the crown lie there upon his pillow,\nBeing so troublesome a bedfellow?\nO polish'd perturbation! golden care!\nThat keep'st the ports of slumber open wide\nTo many a watchful night! Sleep with it now!\nYet not so sound, and half so deeply sweet\nAs he whose brow with homely biggin bound\nSnores out the watch of night. O majesty!\nWhen thou dost pinch thy bearer, thou dost sit\nLike a rich armour worn in heat of day,\nThat scalds with safety. ... My gracious lord! my father!\nThis sleep is sound indeed; this is a sleep\nThat from this golden rigol hath divorc'd\nSo many English kings. ... My due from thee is this imperial crown,\nWhich, as immediate from thy place and blood,\nDerives itself to me.",
        "source": "William Shakespeare, The Second Part of King Henry the Fourth, Act IV",
        "href": "https://en.wikisource.org/wiki/Henry_IV_Part_2_(1921)_Yale/Text/Act_IV"
      },
      {
        "category": "artistic",
        "title": "Handel, Zadok the Priest (Coronation Anthem, HWV 258)",
        "excerpt": "Handel composed Zadok the Priest for the coronation of George II at Westminster Abbey in 1727, setting the very words of Solomon's anointing from the First Book of Kings, and it has been sung at every British coronation since. The anthem opens with a long, quietly gathering orchestral crescendo that finally explodes as the full chorus enters on the moment of anointing — a pure sonic image of legitimacy being conferred and succession made unquestionable. That slow build and sudden burst make it the sound of power passing cleanly from one head to the next, exactly the certainty absent in Tehran.",
        "source": "George Frideric Handel, Zadok the Priest, HWV 258 (IMSLP)",
        "href": "https://imslp.org/wiki/Zadok_the_Priest,_HWV_258_(Handel,_George_Frideric)"
      },
      {
        "category": "artistic",
        "title": "Jacques-Louis David, The Coronation of Napoleon",
        "excerpt": "David's monumental Coronation of Napoleon (1805-07) freezes the exact instant power is transferred and sanctified, as Napoleon — having crowned himself — crowns Joséphine before the assembled court, clergy and pope in Notre-Dame. Commissioned to manufacture an aura of dynastic permanence for a brand-new empire, the canvas reveals a coronation as theatre of succession, every gaze and gesture staged to make the new order look inevitable. It is the visual opposite of an absent, unseen heir: legitimacy asserted in blinding public spectacle.",
        "source": "Jacques-Louis David, Sacre de l'empereur Napoléon Ier (1805-07), Louvre, via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Jacques-Louis_David,_The_Coronation_of_Napoleon_edit.jpg",
        "image": {
          "src": "/covers/iran-khamenei-succession-question--art.png",
          "alt": "Vast neoclassical painting of Napoleon in imperial robes raising a crown over the kneeling Empress Joséphine amid a crowded cathedral of dignitaries and clergy, staging the transfer of sovereign power.",
          "credit": "Jacques-Louis David, The Coronation of Napoleon (1805-07), Louvre — public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 26
  },
  {
    "slug": "taylor-swift-travis-kelce-wedding",
    "headline": "Taylor Swift and Travis Kelce marry at Madison Square Garden with Adam Sandler officiating",
    "overview": "Taylor Swift and NFL star Travis Kelce were married on July 4, 2026 inside Madison Square Garden in New York, with the actor and comedian Adam Sandler officiating. Guests said the couple exchanged vows in an intimate garden set built within the arena; the bride wore Dior, and a celebrity-heavy guest list drew fans and media worldwide. The wedding capped a relationship that had become one of the most closely followed celebrity pairings in recent memory.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP (via Google News)",
        "href": "https://news.google.com/rss/articles/CBMimAFBVV95cUxOTHRRWXZCUDd4RWUzZ0JvMHdwbUp1ZjVXVVYxVVVrTkpZMWhyQk15R1ZrWTVldDd1Qm9xMXI2TDZYa3g5bTBybEtDbzh1ejJzTFlmMzNfTHNSc0JaejFORjd2LUttSzU2VUMwWHYzVWJIdC14bXNBdTdkMUFjWWZqdVp0bEtBcURqQzJUbDhGNVY4TGVWXzMyYg?oc=5"
      },
      {
        "name": "BBC News",
        "href": "https://www.bbc.co.uk/news/articles/c982ry2pen3o"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-04",
    "image": {
      "src": "/covers/taylor-swift-travis-kelce-wedding.png",
      "alt": "The vast interior of Madison Square Garden in New York, the arena where Taylor Swift and Travis Kelce were married.",
      "credit": "Interior of Madison Square Garden; Wikimedia Commons (CC0)"
    },
    "lead": true,
    "edition": "Morning Edition · 5 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Wedding of Queen Victoria and Prince Albert (10 February 1840)",
        "excerpt": "The wedding on Monday went off tolerably well. The week before was fine, and Albert drove about the town with a mob shouting at his heels. Tuesday, Wednesday, and to-day, all beautiful days; but Monday, as if by a malignant influence, was a dreadful day—torrents of rain, and violent gusts of wind. Nevertheless a countless multitude thronged the park, and was scattered over the town. I never beheld such a congregation as there was, in spite of the weather. The Queen proceeded in state from Buckingham House to St. James's without any cheering, but then it was raining enough to damp warmer loyalty than that of a London mob. The procession in the Palace was pretty enough by all accounts, and she went through the ceremony with much grace and propriety, not without emotion, though sufficiently subdued, and her manner to her family was very pretty and becoming.",
        "source": "Charles C. F. Greville, A Journal of the Reign of Queen Victoria, 1837–1852, Vol. I (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/24504/pg24504.txt"
      },
      {
        "category": "historical",
        "title": "The Weddings at Susa: Alexander the Great and his Companions (324 BC)",
        "excerpt": "The weddings were celebrated after the Persian manner, seats being placed in a row for the bridegrooms; and after the banquet the brides came in and seated themselves, each one near her own husband. The bridegrooms took them by the right hand and kissed them; the king being the first to begin, for the weddings of all were conducted in the same way. This appeared the most popular thing which Alexander ever did; and it proved his affection for his Companions. Each man took his own bride and led her away; and on all without exception Alexander bestowed dowries.",
        "source": "Arrian, Anabasis of Alexander, Book VII, ch. IV, trans. E. J. Chinnock (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/46976/pg46976.txt"
      },
      {
        "category": "literary",
        "title": "Epithalamion",
        "excerpt": "Harke! how the minstrils gin to shrill aloud\nTheir merry musick that resounds from far,\nThe pipe, the tabor, and the trembling croud,\nThat well agree withouten breach or iar.\nBut most of all the damzels doe delite,\nWhen they their tymbrels smyte,\nAnd thereunto doe daunce and carrol sweet,\nThat all the sences they doe ravish quite;\nThe whyles the boyes run up and downe the street,\nCrying aloud with strong confused noyce,\nAs if it were one voyce,\n\"Hymen, Iö Hymen, Hymen,\" they do shout;\nThat even to the heavens theyr shouting shrill\nDoth reach, and all the firmament doth fill;\nTo which the people, standing all about,\nAs in approvance, doe thereto applaud,\nAnd loud advaunce her laud;\nAnd evermore they \"Hymen, Hymen,\" sing,\nThat all the woods them answer, and theyr eccho ring.",
        "source": "Edmund Spenser, Epithalamion (1595), in The Poetical Works of Edmund Spenser (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/10602/pg10602.txt"
      },
      {
        "category": "literary",
        "title": "The Song of Solomon 3:11 — the King's Wedding Procession",
        "excerpt": "Go forth, O ye daughters of Zion, and behold king Solomon with the crown wherewith his mother crowned him in the day of his espousals, and in the day of the gladness of his heart.",
        "source": "The Song of Solomon, King James Version (Wikisource)",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Song_of_Solomon"
      },
      {
        "category": "artistic",
        "title": "Wedding March (No. 9) from A Midsummer Night's Dream, Op. 61",
        "excerpt": "Composed as incidental music for Shakespeare's comedy, Mendelssohn's Wedding March erupts in blazing C-major fanfares that have escorted brides and grooms from the altar for nearly two centuries. Its triumphant brass and pealing chords turn a private vow into a public procession, the very sound of a crowd rising to its feet. No melody has more completely become the anthem of the wedding as grand spectacle, the union of two figures paraded before an adoring throng.",
        "source": "IMSLP: A Midsummer Night's Dream, Op.61 (Mendelssohn, Felix)",
        "href": "https://imslp.org/wiki/A_Midsummer_Night%27s_Dream,_Op.61_(Mendelssohn,_Felix)"
      },
      {
        "category": "artistic",
        "title": "The Arnolfini Portrait",
        "excerpt": "In a richly furnished Bruges chamber a solemn couple join hands in what generations of viewers have read as a marriage or betrothal, their union witnessed by tiny figures mirrored in the convex glass on the far wall. Every object testifies to the sacred weight of the vow: the single lit candle, the faithful little dog, the shoes slipped off on holy ground, the ripe oranges of prosperity. Above the mirror the painter signs himself as a present witness — 'Johannes de eyck fuit hic 1434,' Jan van Eyck was here — making the intimate rite an enduring public record.",
        "source": "Jan van Eyck, The Arnolfini Portrait (1434), National Gallery, London — Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Van_Eyck_-_Arnolfini_Portrait.jpg",
        "image": {
          "src": "/covers/taylor-swift-travis-kelce-wedding--art.png",
          "alt": "A man in a dark fur-trimmed robe and a woman in a full green gown join hands in an opulent bedchamber; a small dog stands at their feet, a single candle burns in the chandelier, and a round mirror hangs on the wall behind them.",
          "credit": "Jan van Eyck, The Arnolfini Portrait, 1434, oil on oak panel, National Gallery, London. Public domain via Wikimedia Commons."
        }
      }
    ],
    "rank": 27
  },
  {
    "slug": "trump-ukraine-peace-putin-zelensky-calls",
    "headline": "Trump offers to help broker a Ukraine deal after separate calls with Putin and Zelensky",
    "overview": "President Donald Trump said on July 4, 2026 that he had offered to help Russia and Ukraine reach a settlement, speaking by phone with Russian President Vladimir Putin and, separately, with Ukrainian President Volodymyr Zelensky. Zelensky said afterward that he had urged 'American resolve' to help end the war and pressed for stronger air-defense support. The overtures came as fighting continued in eastern Ukraine and after recent Ukrainian long-range strikes inside Russia.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters (via Google News)",
        "href": "https://news.google.com/rss/articles/CBMiwwFBVV95cUxNQ3Z6dHlGeW9Jcy1FYzg0OGJMRFhNWlFucnlnalREWTZnQnlrVUxMSm9Mclloclh2QkRqMlRTSDBCNHNBS0VFV08xLUVBejFrVVFKQk5rNGk0YlhiSXZYcFlJbWFqY0tpQWNnTkdNMVRhd0ZYN2s1bThsbk5xMEc2VklRd1pCc1huMDNFTjBlLTlHeE1XaUFudmR6RTE4ejhtUERSREVGNEN0emdyd3RSekJwWm5IRUgzWmdsVGs1dDMtNTg?oc=5"
      },
      {
        "name": "Reuters — Zelensky calls for American resolve (via Google News)",
        "href": "https://news.google.com/rss/articles/CBMitwFBVV95cUxQR1ctYWUyVXNZVTQ3Qld0Y2pmMmQ0MFVEUE9qalZVMldzSWlfc0FSdHo2VENpbHhwX2lxWVNzSl9TQWVqMlgyRmNPYkY3OWk0ZjNTQzEyV25CTV9WX1F3dzFFaWJSNEVaQnJqNzNMUzlTWkN4aHFEZ2FYc3cwUTFhdHZzZllIUWVVMnZpQng1MVl1aXRrX045U21NQ3I5eW0yOU1NN2JPNW8wdjRCcDRPcGJBekZ5bXM?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-04",
    "image": {
      "src": "/covers/trump-ukraine-peace-putin-zelensky-calls.png",
      "alt": "US President Donald Trump and Ukrainian President Volodymyr Zelensky seated together during a meeting.",
      "credit": "Volodymyr Zelensky and Donald Trump; public domain via Wikimedia Commons"
    },
    "edition": "Morning Edition · 5 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Treaty of Portsmouth (1905)",
        "excerpt": "There shall henceforth be peace and amity between Their Majesties the Emperor of Japan and the Emperor of all the Russias and between Their respective States and subjects.",
        "source": "Treaty of Portsmouth, ending the Russo-Japanese War, via Wikisource",
        "href": "https://en.wikisource.org/wiki/Treaty_of_Portsmouth"
      },
      {
        "category": "historical",
        "title": "The Peace of Nicias",
        "excerpt": "The Athenians and Lacedaemonians and their allies made a treaty, and swore to it, city by city, as follows; ... 3. The treaty shall be binding for fifty years upon the Athenians and the allies of the Athenians, and upon the Lacedaemonians and the allies of the Lacedaemonians, without fraud or hurt by land or by sea.",
        "source": "Thucydides, History of the Peloponnesian War, Book V (Crawley translation), via Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/7142/pg7142.txt"
      },
      {
        "category": "literary",
        "title": "The Embassy to Achilles (Iliad, Book IX)",
        "excerpt": "The gifts you offer are no small ones, let us then send chosen messengers, who may go to the tent of Achilles son of Peleus without delay. Let those go whom I shall name. Let Phoenix, dear to Jove, lead the way; let Ajax and Ulysses follow, and let the heralds Odius and Eurybates go with them.",
        "source": "Homer, The Iliad (Samuel Butler prose translation), via Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/2199/pg2199.txt"
      },
      {
        "category": "literary",
        "title": "Aristophanes' Peace",
        "excerpt": "'Tis now, oh Greeks! the moment when freed of quarrels and fighting, we should rescue sweet Peace and draw her out of this pit, before some other pestle prevents us. Come, labourers, merchants, workmen, artisans, strangers, whether you be domiciled or not, islanders, come here, Greeks of all countries, come hurrying here with picks and levers and ropes!",
        "source": "Aristophanes, Peace (Athenian Society translation), via Project Gutenberg",
        "href": "https://www.gutenberg.org/files/2571/2571.txt"
      },
      {
        "category": "artistic",
        "title": "Utrecht Te Deum, HWV 278",
        "excerpt": "Handel composed the Utrecht Te Deum in 1713 to crown the Peace of Utrecht, the great settlement that ended the War of the Spanish Succession. Its blazing trumpets and massed voices turn a negotiated treaty into public thanksgiving, the sound of exhausted enemies finally laying down their arms. First heard beneath the dome of St Paul's Cathedral, it makes the act of signing a peace feel like a nation exhaling.",
        "source": "IMSLP: Te Deum in D major, HWV 278 (Handel, George Frideric)",
        "href": "https://imslp.org/wiki/Te_Deum_in_D_major,_HWV_278_(Handel,_George_Frideric)"
      },
      {
        "category": "artistic",
        "title": "The Ratification of the Treaty of Münster, 15 May 1648",
        "excerpt": "Ter Borch's small oil on copper freezes the exact instant peace becomes real: Dutch and Spanish envoys, crowded into the Münster town hall, raise their hands to swear the oath that ended eighty years of war. The painter was present at the ceremony and slipped his own face into the left edge of the crowd, making himself a witness to a treaty being born. It is one of the earliest paintings to record an actual diplomatic signing rather than an allegory of peace.",
        "source": "Gerard ter Borch, The Ratification of the Treaty of Münster (1648), Rijksmuseum, via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:The_Ratification_of_the_Treaty_of_Munster,_Gerard_Ter_Borch_(1648).jpg",
        "image": {
          "src": "/covers/trump-ukraine-peace-putin-zelensky-calls--art.png",
          "alt": "A crowded seventeenth-century hall where Dutch and Spanish delegations, in dark robes and white ruffs, gather around a table and raise their hands to swear the oath ratifying the Peace of Munster.",
          "credit": "Gerard ter Borch, 1648, Rijksmuseum, Amsterdam; public domain via Wikimedia Commons"
        }
      }
    ],
    "rank": 28
  },
  {
    "slug": "patriot-front-masked-march-washington",
    "headline": "Masked Patriot Front members stage a July 4 march through Washington, DC",
    "overview": "Hundreds of masked members of the white-nationalist group Patriot Front marched through downtown Washington, DC on July 4, 2026, carrying shields and flags in a choreographed procession. Photographs showed ranks of participants in matching attire with their faces covered. The demonstration, on the nation's Independence Day, drew condemnation and renewed scrutiny of organized extremist movements in the United States.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters (via Google News)",
        "href": "https://news.google.com/rss/articles/CBMitAFBVV95cUxOb3R0bHRwLXM2YXd2dTZpc0tWekt5aDM3NkhycjZpdFdVWDFrRUZ5c1RfbXU4YWtmLV9vSUViNnRJeERwMmZpVGZGSjczbFZ5VV9EU3lhLXFNbGltUzZIaE93NkRnZmxxczJUMk0tLXhpcjhGaDBhVjlnTGNVTzduRE84d0xPX2toVm1CRTZQWWRJckNzNEVNZXJ0OGxfQnZjWmw0QjVzdGM1UGNmZzdBXzQxUVI?oc=5"
      },
      {
        "name": "Reuters — Photos of the march (via Google News)",
        "href": "https://news.google.com/rss/articles/CBMiuAFBVV95cUxOZzFqZVFwYU12QW1EOWFJcXY4b0ZSbEV0NDdUQ3ZqTlk5YWhpUVFEVUNXUUFTYWlERGwzcnM5Uy1QbFNnNldtYWczMjhOVjQ5Rk9CNVFFNEszUEJnUEh0aWJLYUxQM3dXb1Y0bnpTclE3QnJPNS1RQ2tqSm0ybGN5dElPQjV6SnNKTTM1SEJaWWkxMG0zd1k5UWR3WHkweHJNbjFOelpMY0lBOF9rMGpEYWUzTnJDXzlr?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-04",
    "image": {
      "src": "/covers/patriot-front-masked-march-washington.png",
      "alt": "Members of the white-nationalist group Patriot Front marching in matching attire through Washington, DC.",
      "credit": "Patriot Front in Washington, DC; Wikimedia Commons (CC BY-SA 4.0)"
    },
    "edition": "Morning Edition · 5 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Ku Klux Klan: Its Origin, Growth and Disbandment",
        "excerpt": "In single file, in death-like stillness, with funeral slowness, they marched and counter-marched throughout the town.",
        "source": "John C. Lester and D. L. Wilson (1884); Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/31819/pg31819.txt"
      },
      {
        "category": "historical",
        "title": "The History of Rome, Book 39 (the Bacchanalian conspiracy)",
        "excerpt": "They formed an immense multitude, almost equal to the population of Rome; amongst them were members of noble families both men and women.",
        "source": "Livy, trans. Rev. Canon Roberts (1905); Wikisource",
        "href": "https://en.wikisource.org/wiki/From_the_Founding_of_the_City/Book_39"
      },
      {
        "category": "literary",
        "title": "The Masque of the Red Death",
        "excerpt": "The mask which concealed the visage was made so nearly to resemble the countenance of a stiffened corpse that the closest scrutiny must have had difficulty in detecting the cheat.",
        "source": "Edgar Allan Poe (1842); Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/1064/pg1064.txt"
      },
      {
        "category": "literary",
        "title": "The Second Coming",
        "excerpt": "Things fall apart; the centre cannot hold; / Mere anarchy is loosed upon the world, / The blood-dimmed tide is loosed, and everywhere / The ceremony of innocence is drowned; / The best lack all conviction, while the worst / Are full of passionate intensity.",
        "source": "W. B. Yeats (1920); Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Second_Coming_(Yeats)"
      },
      {
        "category": "artistic",
        "title": "Un ballo in maschera (A Masked Ball)",
        "excerpt": "Verdi's opera climaxes at a masked ball where every face is hidden behind a domino and the anonymity of the costumed crowd becomes perfect cover for an assassin who strikes from within the throng. The music twists festive dance rhythms into something sinister, letting a glittering, faceless multitude conceal a lethal conspiracy until the moment a single mask is torn away.",
        "source": "IMSLP: Un ballo in maschera (Verdi, Giuseppe)",
        "href": "https://imslp.org/wiki/Un_ballo_in_maschera_(Verdi,_Giuseppe)"
      },
      {
        "category": "artistic",
        "title": "Christ's Entry into Brussels in 1889",
        "excerpt": "James Ensor crams his vast canvas with a surging carnival mob whose faces have dissolved into leering masks, skulls, and grotesque caricatures, an anonymous multitude that all but swallows the tiny figure of Christ. Massed under banners and slogans, the crowd reads less as celebrants than as a menacing, faceless tide, turning a procession into an image of the dehumanized power of the many.",
        "source": "James Ensor (1888); Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Christ's_Entry_Into_Brussels_in_1889.jpg",
        "image": {
          "src": "/covers/patriot-front-masked-march-washington--art.png",
          "alt": "A huge, densely packed crowd fills a Brussels street beneath red banners, nearly every face hidden behind a grotesque carnival mask or reduced to a caricature, with a small haloed figure of Christ almost lost in the throng.",
          "credit": "James Ensor, 1888, J. Paul Getty Museum. Public domain via Wikimedia Commons."
        }
      }
    ],
    "rank": 29
  },
  {
    "slug": "venezuela-earthquake-death-toll-2600",
    "headline": "Venezuela earthquake death toll passes 2,600 as families identify victims in La Guaira",
    "overview": "The death toll from the twin earthquakes that struck Venezuela in late June rose past 2,600 by July 4, 2026, as rescuers pulled a survivor from the rubble days after the tremors. In the coastal state of La Guaira, a port storage facility was converted into a makeshift morgue where families waited hours to identify loved ones as improvised tents held the dead. Officials said collapsed infrastructure had overwhelmed local services and complicated both recovery and identification.",
    "genre": "Science",
    "sources": [
      {
        "name": "Reuters (via Google News)",
        "href": "https://news.google.com/rss/articles/CBMikwFBVV95cUxOeUI5MnBPd0JxRzk0VE1ZS1JwR1kwQmhkWUxBRklnaGpGdHpHWENweWVDd0JMdV9BcS16YmYydUdBaHBMQ19BbVVnTHFsUVdnT0pBRWJnZHVpeE14WFowUy1sUHlTb0xHYzlBMDkzSDdobEdkOWwyTVhkSmxEOW1SS29LTFktUGZGd2tIWUd4TVlFelE?oc=5"
      },
      {
        "name": "BBC News",
        "href": "https://www.bbc.co.uk/news/articles/c20y2p9qqqko"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-04",
    "image": {
      "src": "/covers/venezuela-earthquake-death-toll-2600.png",
      "alt": "Families wait at a port facility in La Guaira, Venezuela, transformed into a makeshift morgue after the earthquakes.",
      "credit": "AFP via Getty Images (via BBC)"
    },
    "edition": "Morning Edition · 5 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Cassius Dio on the Eruption of Vesuvius (AD 79)",
        "excerpt": "an inconceivable quantity of ashes was blown out, which covered both sea and land and filled all the air. It wrought much injury of various kinds, as chance befell, to men and farms and cattle, and in particular it destroyed all fish and birds. Furthermore, it buried two entire cities, Herculaneum and Pompeii, the latter place while its populace was seated in the theatre.",
        "source": "Cassius Dio, Roman History, Book 66 (Loeb/Cary translation), LacusCurtius",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Cassius_Dio/66*.html"
      },
      {
        "category": "historical",
        "title": "The Earthquake at Lisbon, 1755 (eyewitness account of Rev. Charles Davy)",
        "excerpt": "The whole number of persons that perished, including those who were burnt or afterwards crushed to death whilst digging in the ruins, is supposed, on the lowest calculation, to amount to more than sixty thousand; and though the damage in other respects cannot be computed, yet you may form some idea of it.",
        "source": "Rev. Charles Davy, letter on the Lisbon earthquake, Fordham Modern History Sourcebook",
        "href": "https://sourcebooks.fordham.edu/mod/1755lisbonquake.asp"
      },
      {
        "category": "literary",
        "title": "Pliny the Younger, Letter to Cornelius Tacitus on the Vesuvius Eruption",
        "excerpt": "You might hear the shrieks of women, the screams of children, and the shouts of men; some calling for their children, others for their parents, others for their husbands, and seeking to recognise each other by the voices that replied; one lamenting his own fate, another that of his family; some wishing to die, from the very fear of dying; some lifting their hands to the gods; but the greater part convinced that there were now no gods at all, and that the final endless night of which we have heard had come upon the world.",
        "source": "Pliny the Younger, Letters, trans. William Melmoth, Project Gutenberg",
        "href": "https://gutenberg.org/files/2811/2811-h/2811-h.htm"
      },
      {
        "category": "literary",
        "title": "Voltaire, Poem on the Lisbon Disaster (\"The Lisbon Earthquake\")",
        "excerpt": "Approach in crowds, and meditate awhile / Yon shattered walls, and view each ruined pile, / Women and children heaped up mountain high, / Limbs crushed which under ponderous marble lie;",
        "source": "Voltaire, The Works of Voltaire, Vol. 36, trans. Fleming, Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Works_of_Voltaire/Volume_36/The_Lisbon_Earthquake"
      },
      {
        "category": "artistic",
        "title": "Il Terremoto (The Earthquake) — finale of Haydn's The Seven Last Words of Christ, Hob.XX:1",
        "excerpt": "After seven hushed meditations on the words spoken from the cross, Haydn shatters the stillness with a final movement titled Il Terremoto — The Earthquake. Marked Presto e con tutta la forza, the whole orchestra convulses into the work's only fortississimo, the strings churning like ground splitting open. It is music that renders the moment a city is torn apart and the living are left trembling amid the fallen.",
        "source": "IMSLP: Die Worte des Erlösers am Kreuze, Hob.XX:1 (Haydn, Joseph)",
        "href": "https://imslp.org/wiki/Die_Worte_des_Erl%C3%B6sers_am_Kreuze,_Hob.XX:1_(Haydn,_Joseph)"
      },
      {
        "category": "artistic",
        "title": "The Last Day of Pompeii",
        "excerpt": "Bryullov's monumental canvas freezes a city in its death throes: the sky boils red and black over Pompeii as buildings and statues topple, and terrified families shield their heads and clutch their fallen dead in the lurid light of the eruption. Bodies lie crushed in the foreground while survivors flee across the rubble, an image of mass calamity and grief that has defined how the modern eye pictures a city destroyed.",
        "source": "Karl Bryullov, The Last Day of Pompeii (1830–1833), State Russian Museum — Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Karl_Brullov_-_The_Last_Day_of_Pompeii_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/venezuela-earthquake-death-toll-2600--art.png",
          "alt": "A vast crowd of panicked Pompeiians flees collapsing buildings and toppling statues beneath a black, lightning-lit sky glowing red from Vesuvius; mothers shield children and the dead lie strewn across the ground.",
          "credit": "Karl Bryullov, The Last Day of Pompeii, 1830–1833, State Russian Museum, Saint Petersburg; public domain via Wikimedia Commons"
        }
      }
    ],
    "rank": 30
  },
  {
    "slug": "egypt-byzantine-city-western-desert",
    "headline": "Egypt uncovers a lost Byzantine-era city in the western desert",
    "overview": "Egyptian archaeologists announced on July 4, 2026 the discovery of a well-preserved Byzantine-era city in the Dakhla Oasis of the western desert, revealing daily life in fourth-century Egypt when the country was part of the Byzantine empire. A grid of streets and squares centers on a mid-fourth-century basilica church flanked by two watchtowers, with bread ovens, kitchens, bronze coins bearing Byzantine emperors and about 200 inscribed pottery ostraca among the finds. Officials unveiled it alongside a second discovery of 18 tombs at the Marina el-Alamein site west of Alexandria.",
    "genre": "Science",
    "sources": [
      {
        "name": "AP (via Google News)",
        "href": "https://news.google.com/rss/articles/CBMirAFBVV95cUxPTVhxNmVwdlhPMjJybGI5UUZQWWptMjRQWjlWQjRjT3dYVnVtbDBiUUFxdlNQalpPU0FIdWhtSFcwRFJ4T24zcl8tek9DUFZmY0ZzRWI4SmhjRDN5MWI2RUtFRThTNG5fZUJ2WnBvaTR5elF0eDQyZDM2b0k3cjFTakdOMEFlVkZtZmowTkk5WDdFVG1OczE0RS1NVEFwUHVFcXFGeEFNb3p6bFhu?oc=5"
      },
      {
        "name": "Global News",
        "href": "https://globalnews.ca/news/11952992/egypt-uncovers-byzantine-city/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-04",
    "image": {
      "src": "/covers/egypt-byzantine-city-western-desert.png",
      "alt": "The domed mud-brick chapels of the Bagawat necropolis, an early Christian, Byzantine-era burial site in Egypt's western desert.",
      "credit": "Bagawat Necropolis, Kharga Oasis; public domain via Wikimedia Commons"
    },
    "edition": "Morning Edition · 5 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Nineveh and Its Remains: the winged lions unveiled at Nimroud",
        "excerpt": "The moon was at her full, and as we drew nigh to the edge of the deep wall of earth rising around them, her soft light was creeping over the stern features of the human heads, and driving before it the dark shadows which still clothed the lion forms. One by one the limbs of the gigantic sphinxes emerged from the gloom, until the monsters were unveiled before us. I shall never forget that night, or the emotions which those venerable figures caused within me.",
        "source": "Austen Henry Layard, Discoveries Among the Ruins of Nineveh and Babylon (1853), Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/39897/pg39897.txt"
      },
      {
        "category": "historical",
        "title": "The discovery of the lost city of Copán",
        "excerpt": "The city was desolate. No remnant of this race hangs round the ruins, with traditions handed down from father to son, and from generation to generation. It lay before us like a shattered bark in the midst of the ocean, her masts gone, her name effaced, her crew perished, and none to tell whence she came, to whom she belonged, how long on her voyage, or what caused her destruction.",
        "source": "John Lloyd Stephens, Incidents of Travel in Central America, Chiapas and Yucatan, Chapter V, Wikisource",
        "href": "https://en.wikisource.org/wiki/Incidents_of_Travel_in_Central_America,_Chiapas_and_Yucatan/Chapter_5"
      },
      {
        "category": "literary",
        "title": "Ozymandias",
        "excerpt": "And on the pedestal these words appear: 'My name is Ozymandias, king of kings: Look on my works, ye Mighty, and despair!' Nothing beside remains. Round the decay Of that colossal wreck, boundless and bare, The lone and level sands stretch far away.",
        "source": "Percy Bysshe Shelley, 'Ozymandias of Egypt' (1818), in Poems That Every Child Should Know (1904), Wikisource",
        "href": "https://en.wikisource.org/wiki/Poems_That_Every_Child_Should_Know/Ozymandias_of_Egypt"
      },
      {
        "category": "literary",
        "title": "The Ruins, or Meditation on the Revolutions of Empires",
        "excerpt": "Here, said I, once flourished an opulent city; here was the seat of a powerful empire. Yes! these places now so wild and desolate, were once animated by a living multitude; a busy crowd thronged in these streets, now so solitary. Within these walls, where now reigns the silence of death, the noise of the arts, and the shouts of joy and festivity incessantly resounded; these piles of marble were regular palaces; these fallen columns adorned the majesty of temples; these ruined galleries surrounded public places.",
        "source": "Constantin-François Volney, The Ruins (1791), Chapter II 'The Reverie', Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/1397/pg1397.txt"
      },
      {
        "category": "artistic",
        "title": "Pini di Roma (The Pines of Rome)",
        "excerpt": "Respighi's 1924 tone poem walks the listener through Rome as a living palimpsest of its own vanished past. In the hushed second movement, 'Pini presso una catacomba,' muted brass and a distant plainchant seem to rise out of the buried earth like an ancient hymn resurfacing from the tombs, before the whole orchestra swells with the ghostly grandeur of a civilization the sand had swallowed.",
        "source": "IMSLP: Pini di Roma (Respighi, Ottorino)",
        "href": "https://imslp.org/wiki/Pini_di_Roma_(Respighi,_Ottorino)"
      },
      {
        "category": "artistic",
        "title": "The Course of Empire: Desolation",
        "excerpt": "Cole's final canvas shows a once-mighty imperial city returned to silence: broken colonnades and a solitary ruined column rise from marshy overgrowth as the moon climbs a fading sky. Nature has reclaimed the metropolis, vines wreathing shattered marble where crowds once thronged, a haunting vision of a civilization sunk back into oblivion and waiting to be remembered.",
        "source": "Thomas Cole, The Course of Empire: Desolation (1836), New-York Historical Society, via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Cole_Thomas_The_Course_of_Empire_Desolation_1836.jpg",
        "image": {
          "src": "/covers/egypt-byzantine-city-western-desert--art.png",
          "alt": "A twilight landscape of a ruined classical city: ivy-grown broken columns and a single tall column stand above still water, reflected in the calm, as the moon rises over silent, overgrown marble ruins.",
          "credit": "Thomas Cole, 1836, New-York Historical Society; public domain via Wikimedia Commons"
        }
      }
    ],
    "rank": 31
  },
  {
    "slug": "sqlite-utils-4-fable-agent-written",
    "headline": "Simon Willison ships sqlite-utils 4.0rc2 largely written by an AI coding agent for about $149",
    "overview": "Developer Simon Willison released sqlite-utils 4.0rc2 on July 5, 2026, saying the work toward a stable 4.0 was mostly carried out by an AI model running in an agentic coding loop, at a token cost of about $149. The agent's pre-release review flagged five 'release blockers,' including a data-loss bug in which a delete never committed and could corrupt a database connection. Willison framed the release as a case study in using AI agents for careful, version-conscious open-source maintenance.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Simon Willison’s Weblog",
        "href": "https://simonwillison.net/2026/Jul/5/sqlite-utils-fable/"
      },
      {
        "name": "sqlite-utils changelog",
        "href": "https://sqlite-utils.datasette.io/en/stable/changelog.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-05",
    "image": {
      "src": "/covers/sqlite-utils-4-fable-agent-written.png",
      "alt": "A brass clockwork automaton seated at a desk, a quill in its hand, poised over a blank page in a dim workshop.",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 5 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Maelzel's Chess-Player",
        "excerpt": "It is quite certain that the operations of the Automaton are regulated by mind, and by nothing else.",
        "source": "Edgar Allan Poe, \"Maelzel's Chess-Player\" (Southern Literary Messenger, 1836)",
        "href": "https://en.wikisource.org/wiki/Maelzel's_Chess-Player"
      },
      {
        "category": "historical",
        "title": "Vaucanson's Automata (the flute-player and the duck)",
        "excerpt": "Jacques de Vaucanson, the celebrated mechanician, exhibited three admirable figures,—the flute-player, the tambourine-player, and the duck, which was capable of eating, drinking, and imitating exactly the natural voice of that fowl.",
        "source": "\"Automaton,\" 1911 Encyclopædia Britannica",
        "href": "https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Automaton"
      },
      {
        "category": "literary",
        "title": "Frankenstein; or, The Modern Prometheus",
        "excerpt": "I saw the dull yellow eye of the creature open; it breathed hard, and a convulsive motion agitated its limbs.",
        "source": "Mary Wollstonecraft Shelley, Frankenstein (1818), Chapter 5",
        "href": "https://www.gutenberg.org/cache/epub/84/pg84.txt"
      },
      {
        "category": "literary",
        "title": "The Pupil in Magic (Der Zauberlehrling)",
        "excerpt": "Stop, for, lo!\nAll the measure\nOf thy treasure\nNow is right!—\nAh, I see it! woe, oh woe!\nI forget the word of might.",
        "source": "Johann Wolfgang von Goethe, trans. Edgar Alfred Bowring, The Works of J. W. von Goethe, Vol. 9",
        "href": "https://en.wikisource.org/wiki/The_Works_of_J._W._von_Goethe/Volume_9/The_Pupil_in_Magic"
      },
      {
        "category": "artistic",
        "title": "L'apprenti sorcier (The Sorcerer's Apprentice)",
        "excerpt": "Paul Dukas's 1897 symphonic scherzo sets Goethe's ballad to music, and the orchestra tells the whole cautionary tale without a word. A skittering bassoon becomes the enchanted broom, marching tirelessly to fetch water while the strings swell into flood; the apprentice's panic mounts as the thing he animated refuses to stop. It is the definitive musical portrait of a made servant that does its master's labor brilliantly—and then runs beyond his control.",
        "source": "IMSLP: L'apprenti sorcier (Dukas, Paul)",
        "href": "https://imslp.org/wiki/L'apprenti_sorcier_(Dukas,_Paul)"
      },
      {
        "category": "artistic",
        "title": "Pygmalion and Galatea",
        "excerpt": "Gérôme paints the exact instant a maker's craftsmanship crosses into life: the sculptor Pygmalion reaches up to kiss his ivory statue as Galatea, still pale marble from the thighs down, flushes into warm living flesh above. Her twisting body turns from artwork into person under his hands, while a hovering Cupid aims the arrow that seals the miracle. It is the dream of every craftsman—the made thing awakening to answer its maker—rendered as tender triumph rather than horror.",
        "source": "Jean-Léon Gérôme, Pygmalion and Galatea (ca. 1890), The Metropolitan Museum of Art",
        "href": "https://commons.wikimedia.org/wiki/File:WLA_metmuseum_Jean-Leon_Gerome_Pygmalion_and_Galatea.jpg",
        "image": {
          "src": "/covers/sqlite-utils-4-fable-agent-written--art.png",
          "alt": "A sculptor in his studio embraces and kisses a nude female statue whose upper body has turned to living flesh while her legs remain white marble on the pedestal; a small winged Cupid hovers at right aiming a bow.",
          "credit": "Jean-Léon Gérôme, ca. 1890, The Metropolitan Museum of Art (Gift of Louis C. Raegner, 1927), public domain via Wikimedia Commons"
        }
      }
    ],
    "rank": 32
  },
  {
    "slug": "joey-chestnut-nathans-hot-dog-66",
    "headline": "Joey Chestnut eats 66 hot dogs to reclaim the Nathan's Famous Mustard Belt",
    "overview": "Joey Chestnut won the Nathan's Famous Fourth of July International Hot Dog Eating Contest at Coney Island on July 4, 2026, downing 66 hot dogs and buns in ten minutes to take back the Mustard Belt. The victory extended the competitive eater's long dominance of the Independence Day spectacle. Thousands watched at Coney Island as Chestnut again outpaced the field.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP (via Google News)",
        "href": "https://news.google.com/rss/articles/CBMipwFBVV95cUxQV3NMNHBUbTNNMThRTjY1UzJfOE9vNUIzV1BZRXZoNlhhcUhEbWdEYW1GNG5UU3B4QjlLWndBQnNFWm1uZXdHejl5WmlBRWFPWGUyZ2d3ZC1vQ21VSUM2MDdEbk1PQWl0UGJzSlZYQ3RlZHEwWTBrOVJqa2t6ang3ZzRYc0tjZ2hYa2RMZi1fbEJ2ZDR0MlBPMTlka1EtMW45NkducmR0dw?oc=5"
      },
      {
        "name": "Nathan’s Famous Hot Dog Eating Contest",
        "href": "https://en.wikipedia.org/wiki/Nathan%27s_Hot_Dog_Eating_Contest"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-04",
    "image": {
      "src": "/covers/joey-chestnut-nathans-hot-dog-66.png",
      "alt": "Competitive eater Joey Chestnut at the Nathan's Famous Fourth of July hot dog eating contest.",
      "credit": "Wikimedia Commons (CC BY 4.0)"
    },
    "edition": "Morning Edition · 5 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Maximinus Thrax's Legendary Appetite",
        "excerpt": "It is agreed, moreover, that often in a single day he drank a Capitoline amphora of wine, and ate forty pounds of meat, or, according to Cordus, no less than sixty.",
        "source": "Historia Augusta, The Two Maximini (Loeb translation by David Magie), via LacusCurtius",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Historia_Augusta/Maximini_duo*.html"
      },
      {
        "category": "historical",
        "title": "The Eating Contest of Loki and Logi at Utgard",
        "excerpt": "Then a trough was taken and borne in upon the hall-floor and filled with flesh; Loki sat down at the one end and Logi at the other, and each ate as fast as he could, and they met in the middle of the trough. By that time Loki had eaten all the meat from the bones, but Logi likewise had eaten all the meat, and the bones with it, and the trough too; and now it seemed to all as if Loki had lost the game.",
        "source": "Snorri Sturluson, The Prose Edda, Gylfaginning (1916 translation by Arthur Gilchrist Brodeur), via Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Prose_Edda_(1916_translation_by_Arthur_Gilchrist_Brodeur)/Gylfaginning"
      },
      {
        "category": "literary",
        "title": "Gargamelle Gorges on Tripe (Gargantua and Pantagruel)",
        "excerpt": "Notwithstanding these admonitions, she did eat sixteen quarters, two bushels, three pecks and a pipkin full. O the fair fecality wherewith she",
        "source": "François Rabelais, Gargantua and Pantagruel (trans. Urquhart & Motteux), Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/1200/pg1200.txt"
      },
      {
        "category": "literary",
        "title": "The Cyclops Polyphemus Devours the Crew (The Odyssey)",
        "excerpt": "Then he tore them limb from limb and supped upon them. He gobbled them up like a lion in the wilderness, flesh, bones, marrow, and entrails, without leaving anything uneaten.",
        "source": "Homer, The Odyssey (trans. Samuel Butler), Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/1727/pg1727.txt"
      },
      {
        "category": "artistic",
        "title": "Bacchanale from Samson et Dalila, Op. 47",
        "excerpt": "Saint-Saëns' orgiastic third-act Bacchanale unleashes appetite as pure spectacle: a snaking oboe over pounding drums coils the Philistines into a frenzy of feasting, wine and abandon before the temple. The orchestra swells into a whirling, insatiable dance, a roaring crowd rendered in sound, gorging on pleasure until the pillars themselves come down. It is the perfect soundtrack for gluttony turned into public ritual.",
        "source": "IMSLP: Samson et Dalila, Op.47 (Saint-Saëns, Camille)",
        "href": "https://imslp.org/wiki/Samson_et_Dalila,_Op.47_(Saint-Sa%C3%ABns,_Camille)"
      },
      {
        "category": "artistic",
        "title": "The Land of Cockaigne",
        "excerpt": "Bruegel paints the glutton's paradise: a scholar, a peasant, and a soldier lie sprawled and stupefied around a tree-table, too stuffed to move. Roast fowl trot up ready-carved, a pig runs about with a carving knife already stuck in its flank, and eggs walk on legs toward the gorged sleepers. It is appetite as a whole world, a satirical monument to feasting without limit.",
        "source": "Pieter Bruegel the Elder, The Land of Cockaigne (1567), Alte Pinakothek, Munich — Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_the_Elder_-_The_Land_of_Cockaigne_-_WGA3507.jpg",
        "image": {
          "src": "/covers/joey-chestnut-nathans-hot-dog-66--art.png",
          "alt": "Three overfed men lie sprawled on their backs around a small tree with a round table-top, in a landscape where a roasted pig runs with a knife in its side, a soft-boiled egg walks on legs, and cooked fowl and pastries offer themselves for eating.",
          "credit": "Pieter Bruegel the Elder, The Land of Cockaigne, 1567, Alte Pinakothek, Munich; public domain via Wikimedia Commons"
        }
      }
    ],
    "rank": 33
  },
  {
    "slug": "solo-rower-california-hawaii-record",
    "headline": "American rower completes a record-setting solo row from California to Hawaii",
    "overview": "An American woman completed a record-breaking solo, unsupported ocean row from California to Hawaii, reaching the islands on July 4, 2026 after weeks alone at sea. Rowing more than 2,000 miles across the Pacific, she set a new mark for the crossing. Supporters tracked her arrival after a voyage that tested her endurance against currents, isolation and open water.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP (via Google News)",
        "href": "https://news.google.com/rss/articles/CBMirgFBVV95cUxQSFM2cVZ1TDNDd2NRUmttV2hEVzRrMXpta1pqNTYzYUNQNG5oNXhKNVhjZWpKR3ZobWU1MDczdF8tSnkzVUpVTTlLUWU5bEZGRnR3eU9vaXUwaHk3ZTluWm5EMGZSdnB6WXU3TVFBYmo4WXZ6a3pxbVQ2T3I0UmdsWTJyUlI3SmZZRXFKa1BCbkZfTk9UbTJZZnl5TEhodUpVSFQyVHZfTnBYRm5ybWc?oc=5"
      },
      {
        "name": "Ocean Rowing Society International",
        "href": "https://www.oceanrowing.com/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-04",
    "image": {
      "src": "/covers/solo-rower-california-hawaii-record.png",
      "alt": "A small ocean rowing boat on open water.",
      "credit": "Wikimedia Commons (CC BY-SA 3.0)"
    },
    "edition": "Morning Edition · 5 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Sailing Alone Around the World",
        "excerpt": "In the dismal fog I felt myself drifting into loneliness, an insect on a straw in the midst of the elements.",
        "source": "Joshua Slocum (1900), Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/6317/pg6317.txt"
      },
      {
        "category": "historical",
        "title": "South: The Story of Shackleton's Last Expedition (Chapter 9: The Boat Journey)",
        "excerpt": "The tale of the next sixteen days is one of supreme strife amid heaving waters. The sub-Antarctic Ocean lived up to its evil winter reputation.",
        "source": "Ernest Shackleton (1919), Wikisource",
        "href": "https://en.wikisource.org/wiki/South:_the_story_of_Shackleton's_last_expedition,_1914-1917/Chapter_9"
      },
      {
        "category": "literary",
        "title": "The Rime of the Ancient Mariner",
        "excerpt": "Alone, alone, all, all alone, / Alone on a wide wide sea! / And never a saint took pity on / My soul in agony.",
        "source": "Samuel Taylor Coleridge (text of 1834), Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/151/pg151.txt"
      },
      {
        "category": "literary",
        "title": "Ulysses",
        "excerpt": "To sail beyond the sunset, and the baths / Of all the western stars, until I die.",
        "source": "Alfred, Lord Tennyson (1842), Wikisource",
        "href": "https://en.wikisource.org/wiki/Ulysses_(Tennyson)"
      },
      {
        "category": "artistic",
        "title": "La mer, trois esquisses symphoniques (L. 109)",
        "excerpt": "Debussy's three symphonic sketches conjure the ocean not as backdrop but as living immensity, its swell rising and falling around anyone adrift upon it. From the shimmering dawn of \"De l'aube a midi sur la mer\" through the restless \"Jeux de vagues\" to the storm-lashed \"Dialogue du vent et de la mer,\" the music dramatizes the small human presence dwarfed by wind and water. It is the sound of the sea's vastness pressing in on a solitary voyager.",
        "source": "IMSLP: Claude Debussy, La mer (1903–05)",
        "href": "https://imslp.org/wiki/La_mer_(Debussy,_Claude)"
      },
      {
        "category": "artistic",
        "title": "The Gulf Stream",
        "excerpt": "A lone sailor lies on the deck of a dismasted, rudderless boat, surrounded by circling sharks and a churning, boundless sea. Homer strips the scene to a single small vessel and one exhausted man set against the ocean's overwhelming immensity, a distant ship offering only faint hope of rescue. It is the image of human endurance and isolation at the mercy of the open water.",
        "source": "Winslow Homer (1899), The Metropolitan Museum of Art",
        "href": "https://commons.wikimedia.org/wiki/File:Winslow_Homer_-_The_Gulf_Stream_-_Metropolitan_Museum_of_Art.jpg",
        "image": {
          "src": "/covers/solo-rower-california-hawaii-record--art.png",
          "alt": "An oil painting of a Black sailor reclining on the deck of a small, broken sailboat with no mast, adrift on a deep blue-green sea amid whitecaps and circling sharks, with a distant ship on the horizon.",
          "credit": "Winslow Homer, 1899, The Metropolitan Museum of Art, public domain via Wikimedia Commons"
        }
      }
    ],
    "rank": 34
  },
  {
    "slug": "europe-record-heat-new-climate",
    "headline": "Europe endures back-to-back record heatwaves as scientists warn of a new climate",
    "overview": "Britain and Europe have been hit by two record-breaking heatwaves in the first weeks of the 2026 summer, with UK temperatures reaching 37.7C in Norfolk in June and forecasters warning of another heatwave to come, according to a July 4, 2026 analysis. Climate scientists said the extremes, well above historic June records, are exactly what models predicted for a world warmed by fossil-fuel emissions. The UN's weather agency called the June heat across the continent 'extraordinary.'",
    "genre": "Climate",
    "sources": [
      {
        "name": "BBC News",
        "href": "https://www.bbc.co.uk/news/articles/c8e2j0j87reo"
      },
      {
        "name": "UK Met Office",
        "href": "https://www.metoffice.gov.uk/about-us/news-and-media/media-centre/weather-and-climate-news"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-04",
    "image": {
      "src": "/covers/europe-record-heat-new-climate.png",
      "alt": "A person labouring outdoors under a blazing sun during a European heatwave.",
      "credit": "Tino Romano/EPA (via BBC)"
    },
    "edition": "Morning Edition · 5 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The amazing and portentous summer of 1783",
        "excerpt": "The summer of the year 1783 was an amazing and portentous one, and full of horrible phenomena; for besides the alarming meteors and tremendous thunder-storms that affrighted and distressed the different counties of this kingdom, the peculiar haze, or smokey fog, that prevailed for many weeks in this island, and in every part of Europe, and even beyond its limits, was a most extraordinary appearance, unlike anything known within the memory of man... The sun, at noon, looked as blank as a clouded moon, and shed a rust-coloured ferruginous light on the ground, and floors of rooms; but was particularly lurid and blood-coloured at rising and setting.",
        "source": "Gilbert White, The Natural History of Selborne (1789), Letter LXV to Daines Barrington",
        "href": "https://www.gutenberg.org/cache/epub/1408/pg1408.txt"
      },
      {
        "category": "historical",
        "title": "The Atarantes curse the burning sun",
        "excerpt": "After another ten days' journey from the Garamantes there is again a salt hillock and water; men dwell there called Atarantes... These when the sun is exceeding hot curse and most foully revile him, for that his burning heat afflicts their people and their land.",
        "source": "Herodotus, The Histories, Book IV.184 (A. D. Godley translation, LacusCurtius)",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Herodotus/4g*.html"
      },
      {
        "category": "literary",
        "title": "Phaethon's chariot scorches the earth",
        "excerpt": "The grass is blighted; trees are burnt up with their leaves; the ripe brown crops give fuel for self destruction—Oh what small complaints! Great cities perish with their walls, and peopled nations are consumed to dust—the forests and the mountains are destroyed.",
        "source": "Ovid, Metamorphoses, Book II (Brookes More translation, Perseus Digital Library)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0028:book=2:card=227"
      },
      {
        "category": "literary",
        "title": "The rain of fire on the burning sand",
        "excerpt": "O'er all the sand-waste, with a gradual fall, / Were raining down dilated flakes of fire, / As of the snow on Alp without a wind.",
        "source": "Dante Alighieri, Inferno, Canto XIV (Henry Wadsworth Longfellow translation, 1867)",
        "href": "https://en.wikisource.org/wiki/Divine_Comedy_(Longfellow_1867)/Volume_1/Canto_14"
      },
      {
        "category": "artistic",
        "title": "'Summer' (L'estate), RV 315, from The Four Seasons",
        "excerpt": "Vivaldi's 1725 concerto opens in a landscape gasping under a merciless sun, the violins languishing in heat-heavy stillness before the cuckoo and turtledove call across parched fields. The music grows oppressive and airless, the shepherd trembling in dread, until the finale explodes into a violent summer storm that flattens the ripened grain—heat as both stupor and calamity, portent turning to disaster.",
        "source": "IMSLP: Le quattro stagioni (The Four Seasons) — Antonio Vivaldi",
        "href": "https://imslp.org/wiki/Le_quattro_stagioni_(Vivaldi,_Antonio)"
      },
      {
        "category": "artistic",
        "title": "The Fall of Phaeton",
        "excerpt": "Rubens paints the catastrophe of the sun itself run wild: Phaethon, having seized the chariot of the sun, hurtles earthward as the blazing horses rear and the heavens split with fire. Winged Hours scatter in terror while Jupiter's thunderbolt strikes to halt the runaway sun before it burns the whole world to ash—a baroque vision of the sky ablaze and the earth in mortal peril.",
        "source": "Peter Paul Rubens, The Fall of Phaeton — National Gallery of Art / Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Peter_Paul_Rubens_-_The_Fall_of_Phaeton_(National_Gallery_of_Art).jpg",
        "image": {
          "src": "/covers/europe-record-heat-new-climate--art.png",
          "alt": "A turbulent baroque painting of Phaethon and the sun-chariot's horses tumbling through a fiery sky, figures falling amid billowing smoke and flame as a thunderbolt breaks the clouds.",
          "credit": "Peter Paul Rubens, c. 1604–1605 (reworked c. 1606–1608), National Gallery of Art, Washington, D.C.; public domain via Wikimedia Commons"
        }
      }
    ],
    "rank": 35
  },
  {
    "slug": "vance-britain-failed-by-leaders",
    "headline": "US Vice President Vance says Britain has been failed by its leaders",
    "overview": "US Vice President JD Vance said on July 4, 2026 that Britain had been 'failed by its leaders,' expressing hope that the country's next prime minister would deliver change. The remarks, aimed at the British political establishment, drew attention for a senior American official's pointed intervention in another democracy's domestic politics. They came amid strained transatlantic debate over migration, security and the direction of Europe.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters (via Google News)",
        "href": "https://news.google.com/rss/articles/CBMiuwFBVV95cUxQVHJ5YzZKd011OS1jRmxONjc0Zkx3eVZ1ZDBLZHZSNWNuOTVyRzRpV2xpcHQ1NDdzZlBzeTFxNldvcnZQekRJeTVjRk1HaGJESVc0YXRWNEJhQ1FMN0Y3NC04SllESEFuelVTbjR5ZFo0d0xhZGVrSkhSLWZOdVVUNkRyZ1lKenpaa2JpaFZPUm1UZTFQNTBDTDBiTjFmTlRsNWZTY3dWNjhWTC1MOHdmSkVtT1ppWFBPUUhv?oc=5"
      },
      {
        "name": "AP News — JD Vance",
        "href": "https://apnews.com/hub/jd-vance"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-04",
    "image": {
      "src": "/covers/vance-britain-failed-by-leaders.png",
      "alt": "US Vice President JD Vance in his official portrait.",
      "credit": "Official Vice Presidential Portrait; public domain (U.S. government) via Wikimedia Commons"
    },
    "edition": "Morning Edition · 5 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Speech of Galgacus to the Britons",
        "excerpt": "These plunderers of the world, after exhausting the land by their devastations, are rifling the ocean: stimulated by avarice, if their enemy be rich; by ambition, if poor; unsatiated by the East and by the West: the only people who behold wealth and indigence with equal avidity. To ravage, to slaughter, to usurp under false titles, they call empire; and where they make a desert, they call it peace.",
        "source": "Tacitus, The Agricola (Oxford translation, revised), Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/7524/pg7524.txt"
      },
      {
        "category": "historical",
        "title": "General Observations on the Fall of the Roman Empire in the West",
        "excerpt": "But the decline of Rome was the natural and inevitable effect of immoderate greatness. Prosperity ripened the principle of decay; the causes of destruction multiplied with the extent of conquest; and as soon as time or accident had removed the artificial supports, the stupendous fabric yielded to the pressure of its own weight.",
        "source": "Edward Gibbon, The Decline and Fall of the Roman Empire, Vol. 3, Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/892/pg892.txt"
      },
      {
        "category": "literary",
        "title": "John of Gaunt's \"This England\" speech, King Richard II, Act II, Scene 1",
        "excerpt": "This blessed plot, this earth, this realm, this England, This nurse, this teeming womb of royal kings, Feared by their breed, and famous by their birth, Renowned for their deeds as far from home, For Christian service and true chivalry, As is the sepulchre in stubborn Jewry Of the world's ransom, blessed Mary's Son, This land of such dear souls, this dear dear land, Dear for her reputation through the world, Is now leased out—I die pronouncing it— Like to a tenement or pelting farm.",
        "source": "William Shakespeare, King Richard II, Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/1512/pg1512.txt"
      },
      {
        "category": "literary",
        "title": "England in 1819",
        "excerpt": "An old, mad, blind, despised, and dying king,— Princes, the dregs of their dull race, who flow Through public scorn,—mud from a muddy spring,— Rulers who neither see, nor feel, nor know, But leech-like to their fainting country cling, Till they drop, blind in blood, without a blow,— A people starved and stabbed in the unfilled field,— An army, which liberticide and prey Makes as a two-edged sword to all who wield,— Golden and sanguine laws which tempt and slay; Religion Christless, Godless—a book sealed; A Senate,—Time's worst statute unrepealed,— Are graves, from which a glorious Phantom may Burst, to illumine our tempestuous day.",
        "source": "Percy Bysshe Shelley, Poetical Works (ed. Hutchinson, 1914), Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Complete_Poetical_Works_of_Percy_Bysshe_Shelley_(ed._Hutchinson,_1914)/Sonnet:_England_in_1819"
      },
      {
        "category": "artistic",
        "title": "Belshazzar, HWV 61",
        "excerpt": "Handel's 1745 oratorio stages the last night of Babylon: the tyrant Belshazzar feasts in blind arrogance while a disembodied hand scrawls its verdict upon the palace wall, and Daniel reads the sentence upon a ruler weighed in the balance and found wanting. By dawn the king lies slain and his glittering empire has fallen to the Persians. Handel turns the collapse of a proud, misgoverned kingdom into a thunderous warning to every complacent throne.",
        "source": "IMSLP: Belshazzar, HWV 61 (Handel, George Frideric)",
        "href": "https://imslp.org/wiki/Belshazzar,_HWV_61_(Handel,_George_Frideric)"
      },
      {
        "category": "artistic",
        "title": "The Course of Empire: Destruction",
        "excerpt": "The fourth canvas of Cole's five-part cycle shows a proud empire at the hour of its ruin: the golden city of the earlier panels is now an inferno, its bridge broken, its temples toppling, its people put to the sword by storming invaders. Painted as a warning to a young, boastful republic, it insists that no civilization, however dazzling, is exempt from the wages of luxury, pride, and misrule.",
        "source": "Wikimedia Commons — Thomas Cole, The Course of Empire: Destruction (1836)",
        "href": "https://commons.wikimedia.org/wiki/File:Cole_Thomas_The_Course_of_Empire_Destruction_1836.jpg",
        "image": {
          "src": "/covers/vance-britain-failed-by-leaders--art.png",
          "alt": "A once-magnificent classical city engulfed in fire and smoke as an invading army storms across a broken bridge, marble statues topple, and citizens are slaughtered amid collapsing palaces.",
          "credit": "Thomas Cole, \"The Course of Empire: Destruction,\" 1836, New-York Historical Society; public domain via Wikimedia Commons."
        }
      }
    ],
    "rank": 36
  },
  {
    "slug": "paul-pelosi-hit-and-run-california",
    "headline": "Paul Pelosi injured in a California hit-and-run that left his car heavily damaged",
    "overview": "Paul Pelosi, husband of former US House Speaker Nancy Pelosi, was involved in a hit-and-run crash in California in which his vehicle was left with major damage, authorities said on July 4, 2026. Officials said another driver struck his car and fled the scene. It was the second serious incident to befall Pelosi in recent years, after he was assaulted at the couple's San Francisco home in 2022.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP (via Google News)",
        "href": "https://news.google.com/rss/articles/CBMingFBVV95cUxQTFZHdjgtcXVxb0JrY0ZPNkZpZTVMQml5Q2FHamNsQW8xLW5BODdJLTB2TkJSUmxXY1RXOU1hWWQ1WHU0Z0xJczZsVDM5bXJYZDV2ejU4bWlNTl8zckppR1prWUFBTU00X3JDaTRKbkFtNUl5b2I3T29tSF9tZk9TOHE5QWZ3bExVWm5MQUJIaVdJWkk4WnNVUGd2RmE4QQ?oc=5"
      },
      {
        "name": "AP News — Nancy Pelosi",
        "href": "https://apnews.com/hub/nancy-pelosi"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-04",
    "image": {
      "src": "/covers/paul-pelosi-hit-and-run-california.png",
      "alt": "Paul Pelosi, husband of former House Speaker Nancy Pelosi.",
      "credit": "public domain via Wikimedia Commons"
    },
    "edition": "Morning Edition · 5 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Nero thrown from his chariot at the Olympic games",
        "excerpt": "He drove the chariot with various numbers of horses, and at the Olympic games with no fewer than ten... Being thrown out of his chariot, he was again replaced, but could not retain his seat, and was obliged to give up, before he reached the goal, but was crowned notwithstanding.",
        "source": "Suetonius, The Lives of the Twelve Caesars: Nero (trans. Alexander Thomson)",
        "href": "https://www.gutenberg.org/cache/epub/6400/pg6400.txt"
      },
      {
        "category": "historical",
        "title": "The Taraxippus at Olympia, 'the terror of the horses'",
        "excerpt": "Taraxippus, the terror of the horses. It has the shape of a round altar, and as they run along the horses are seized, as soon as they reach this point, by a great fear without any apparent reason. The fear leads to disorder; the chariots generally crash and the charioteers are injured.",
        "source": "Pausanias, Description of Greece 6.20 (trans. W. H. S. Jones, Perseus Digital Library)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Paus.+6.20&fromdoc=Perseus%3Atext%3A1999.01.0160"
      },
      {
        "category": "literary",
        "title": "The Fall of Phaethon (Metamorphoses, Book II)",
        "excerpt": "The horses are affrighted, and, making a bound in an opposite direction, they shake the yoke from off their necks... In one place lie the reins; in another, the axle-tree wrenched away from the pole... and the fragments of the chariot torn in pieces are scattered far and wide. But Phaeton, the flames consuming his yellow hair, is hurled headlong, and is borne in a long tract through the air.",
        "source": "Ovid, Metamorphoses (trans. Henry T. Riley)",
        "href": "https://www.gutenberg.org/cache/epub/21765/pg21765.txt"
      },
      {
        "category": "literary",
        "title": "The trampling of the child (Strange Case of Dr Jekyll and Mr Hyde)",
        "excerpt": "the two ran into one another naturally enough at the corner; and then came the horrible part of the thing; for the man trampled calmly over the child's body and left her screaming on the ground. It sounds nothing to hear, but it was hellish to see. It wasn't like a man; it was like some damned Juggernaut.",
        "source": "Robert Louis Stevenson, Strange Case of Dr Jekyll and Mr Hyde",
        "href": "https://www.gutenberg.org/cache/epub/43/pg43.txt"
      },
      {
        "category": "artistic",
        "title": "Phaeton, Op. 39 (symphonic poem)",
        "excerpt": "Camille Saint-Saens's 1873 symphonic poem sets the myth of Phaethon, who seizes the reins of the sun-god's chariot and is dragged in a headlong, runaway gallop across the heavens. Surging strings and hammering brass whip the horses faster and faster until the music itself careens out of control, and a sudden thunderbolt hurls the reckless driver to his death. In barely ten minutes it stages a violent collision of ambition and catastrophe on the road of the sky.",
        "source": "IMSLP: Phaeton, Op.39 (Saint-Saens, Camille)",
        "href": "https://imslp.org/wiki/Pha%C3%A9ton,_Op.39_(Saint-Sa%C3%ABns,_Camille)"
      },
      {
        "category": "artistic",
        "title": "The Fall of Phaeton",
        "excerpt": "Rubens freezes the instant of the crash: the sun-chariot pitches over, horses rearing and plunging in every direction as the reins fly loose. Phaethon tumbles headlong through the smoke and lightning, limbs flailing, thrown clear of the wreck in a whirl of terrified bodies and shattered momentum. The whole sky becomes the scene of a single catastrophic collision, misfortune striking without warning.",
        "source": "Peter Paul Rubens, The Fall of Phaeton (National Gallery of Art, Washington)",
        "href": "https://commons.wikimedia.org/wiki/File:Peter_Paul_Rubens_-_The_Fall_of_Phaeton_(National_Gallery_of_Art).jpg",
        "image": {
          "src": "/covers/paul-pelosi-hit-and-run-california--art.png",
          "alt": "A baroque painting of the sun-chariot overturning in mid-air, horses rearing and plunging amid dark clouds and lightning while the youth Phaethon is hurled headlong from the wreck.",
          "credit": "Peter Paul Rubens, c. 1604-1605 (reworked c. 1606-1608), National Gallery of Art, Washington; public domain via Wikimedia Commons"
        }
      }
    ],
    "rank": 37
  },
  {
    "slug": "world-map-500-bytes-ascii",
    "headline": "A developer generates a recognizable ASCII world map from just 445 bytes of data",
    "overview": "A programmer, Iwo Kadziela, demonstrated a way to render a credible ASCII-art map of the world from only 445 bytes of compressed data, drawing wide interest after Simon Willison highlighted it on July 4, 2026. The trick packs the coastlines into a deflate-compressed data URI that the browser unpacks with a few lines of JavaScript using a DecompressionStream. The feat revived appreciation for extreme data compression and minimalist coding.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Simon Willison’s Weblog",
        "href": "https://simonwillison.net/2026/Jul/4/building-a-world-map-with-only-500-bytes/"
      },
      {
        "name": "DecompressionStream (MDN)",
        "href": "https://developer.mozilla.org/en-US/docs/Web/API/DecompressionStream"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-04",
    "image": {
      "src": "/covers/world-map-500-bytes-ascii.png",
      "alt": "A recognizable map of the world's continents rendered entirely in ASCII characters.",
      "credit": "Iwo Kadziela / Simon Willison (simonwillison.net)"
    },
    "edition": "Morning Edition · 5 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Strabo on building a globe of the whole inhabited world",
        "excerpt": "it is better for him to construct a globe of adequate size, if he can do so; and let it be no less than ten feet in diameter. But if he cannot construct a globe of adequate size or not much smaller, he should sketch his map on a plane surface of at least seven feet.",
        "source": "Strabo, Geography, Book II.5.10 (trans. H. L. Jones, Loeb Classical Library)",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Strabo/2E1*.html"
      },
      {
        "category": "historical",
        "title": "Herodotus laughs at those who draw the whole Earth as a compass-circle",
        "excerpt": "I laugh when I see that, though many before this have drawn maps of the Earth, yet no one has set the matter forth in an intelligent way; seeing that they draw Ocean flowing round the Earth, which is circular exactly as if drawn with compasses, and they make Asia equal in size to Europe.",
        "source": "Herodotus, The History of Herodotus, Book IV.36 (trans. G. C. Macaulay)",
        "href": "https://www.gutenberg.org/cache/epub/2707/pg2707.txt"
      },
      {
        "category": "literary",
        "title": "Lewis Carroll, Sylvie and Bruno Concluded — the map on the scale of a mile to the mile",
        "excerpt": "\"And then came the grandest idea of all! We actually made a map of the country, on the scale of a mile to the mile!\" \"Have you used it much?\" I enquired. \"It has never been spread out, yet,\" said Mein Herr: \"the farmers objected: they said it would cover the whole country, and shut out the sunlight! So we now use the country itself, as its own map, and I assure you it does nearly as well.\"",
        "source": "Lewis Carroll, Sylvie and Bruno Concluded (1893), Chapter XI",
        "href": "https://www.gutenberg.org/cache/epub/48795/pg48795.txt"
      },
      {
        "category": "literary",
        "title": "Jorge Luis Borges, On Exactitude in Science",
        "excerpt": "In Borges's single-paragraph fable, an empire's cartographers grow so obsessed with precision that they draw a map coinciding point for point with the empire itself, exactly its size. Later generations judge so monstrous a map useless and abandon it to the sun and winters of the desert, where its tattered ruins shelter beasts and beggars. It is the inverse of the ASCII globe: where Borges warns of the map that swallows its territory, the developer proves how little of the world it takes to make the whole thing recognizable.",
        "source": "Jorge Luis Borges, \"On Exactitude in Science\" (\"Del rigor en la ciencia\", 1946) — copyrighted, described not quoted",
        "href": "https://en.wikipedia.org/wiki/On_Exactitude_in_Science"
      },
      {
        "category": "artistic",
        "title": "Gustav Holst, The Planets, Op. 32",
        "excerpt": "Holst compresses the entire solar system into a single orchestral suite, sketching each wandering planet in a handful of themes: Mars pounding in relentless five-beat menace, Jupiter blazing with jollity, Neptune dissolving into a wordless offstage chorus that recedes into silence. It is the immensity of the heavens caught in seven movements, the cosmos rendered in miniature. Like a world map drawn in 445 bytes, it shows how few strokes it takes to conjure something vast.",
        "source": "IMSLP: The Planets, Op.32 (Holst, Gustav)",
        "href": "https://imslp.org/wiki/The_Planets,_Op.32_(Holst,_Gustav)"
      },
      {
        "category": "artistic",
        "title": "Johannes Vermeer, The Geographer",
        "excerpt": "A scholar in a blue-and-gold robe leans over his charts, dividers in hand, caught mid-measurement as light pours through the window; a terrestrial globe stands behind him and maps hang on the wall. Vermeer turns the whole earth into the quiet furniture of a single sunlit room, globe and charts standing in for oceans and continents no larger than a tabletop. It is the vast made intimate — the entire world brought indoors and rendered in miniature.",
        "source": "The Geographer, Städel Museum, Frankfurt (Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Johannes_Vermeer_-_The_Geographer_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/world-map-500-bytes-ascii--art.png",
          "alt": "An oil painting of a seated scholar in a blue-and-gold robe leaning over a table strewn with charts, holding a pair of dividers and gazing toward a bright window; a terrestrial globe and rolled maps stand behind him.",
          "credit": "Johannes Vermeer, ca. 1668-1669, Städel Museum, Frankfurt am Main. Public domain via Wikimedia Commons."
        }
      }
    ],
    "rank": 38
  },
  {
    "slug": "brooklyn-bridge-fire-july4-fireworks",
    "headline": "Fire breaks out on the Brooklyn Bridge during New York's July 4 fireworks show",
    "overview": "A fire broke out on the Brooklyn Bridge during New York City's Fourth of July fireworks display late on July 4, 2026, sending smoke over the East River as crowds watched the pyrotechnics. Firefighters responded to the blaze on the landmark span. The cause was under investigation, with officials assessing any damage to the 19th-century bridge.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP (via Google News)",
        "href": "https://news.google.com/rss/articles/CBMijgFBVV95cUxPN1pVaU5aNTVsdlBDQldJdDNtVzVKbXlXUkEwdzNsUy1UdzNKME1MWmNQMDVPdkhVdnE4c2JMRTBHbDZWVXpBZVlxNWNGS0MtNG16bXREOGlnUjhfNDdUQ3dPMjVXSmNFVWNkdU12UXVRdDJoZVNxOTU1Uzh4OUFSRVRoMkJDOUQ3ZTdoYTBR?oc=5"
      },
      {
        "name": "FDNY",
        "href": "https://www.nyc.gov/site/fdny/index.page"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-05",
    "image": {
      "src": "/covers/brooklyn-bridge-fire-july4-fireworks.png",
      "alt": "Fireworks bursting over the Brooklyn Bridge on the Fourth of July.",
      "credit": "Wikimedia Commons (CC BY-SA 3.0)"
    },
    "edition": "Morning Edition · 5 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Great Fire of London (1666)",
        "excerpt": "All the sky was of a fiery aspect, like the top of a burning oven, and the light seen above forty miles round about for many nights. God grant mine eyes may never behold the like, who now saw above 10,000 houses all in one flame! The noise and cracking and thunder of the impetuous flames, the shrieking of women and children, the hurry of people, the fall of towers, houses, and churches, was like a hideous storm; and the air all about so hot and inflamed, that at the last one was not able to approach it, so that they were forced to stand still, and let the flames burn on.",
        "source": "John Evelyn, The Diary of John Evelyn, Vol. II (entry of 2 September 1666)",
        "href": "https://www.gutenberg.org/cache/epub/42081/pg42081.txt"
      },
      {
        "category": "historical",
        "title": "The Royal Fireworks Disaster in Green Park (1749)",
        "excerpt": "The rockets, and whatever was thrown up into the air, succeeded mighty well; but the wheels, and all that was to compose the principal part, were pitiful and ill-conducted, with no changes of coloured fires and shapes: the illumination was mean, and lighted so slowly that scarce any body had patience to wait the finishing; and then,—what contributed to the awkwardness of the whole, was the right pavilion catching fire, and being burnt down in the middle of the show.",
        "source": "Horace Walpole, letter to Sir Horace Mann, 3 May 1749, in The Letters of Horace Walpole, Vol. II",
        "href": "https://www.gutenberg.org/cache/epub/4610/pg4610-images.html"
      },
      {
        "category": "literary",
        "title": "The Burning of Troy (Aeneid, Book II)",
        "excerpt": "The fatal Day, th' appointed Hour is come, / When wrathful Jove's irrevocable Doom / Transfers the Trojan State to Grecian Hands. / The Fire consumes the Town, the Foe commands: / And armed Hosts, an unexpected Force, / Break from the Bowels of the Fatal Horse.",
        "source": "Virgil, The Aeneid, Book II, trans. John Dryden — the speech of Panthus",
        "href": "https://en.wikisource.org/wiki/The_Works_of_Virgil_(Dryden)/Aeneid/Book_II"
      },
      {
        "category": "literary",
        "title": "The Great Fire of Rome under Nero (Annals, Book XV)",
        "excerpt": "It had its beginning in that part of the circus which adjoins the Palatine and Caelian hills, where, amid the shops containing inflammable wares, the conflagration both broke out and instantly became so fierce and so rapid from the wind that it seized in its grasp the entire length of the circus. The blaze in its fury ran first through the level portions of the city, then rising to the hills, while it again devastated every place below them, it outstripped all preventive measures.",
        "source": "Tacitus, The Annals, Book XV, trans. Church and Brodribb",
        "href": "https://en.wikisource.org/wiki/The_Annals_(Tacitus)/Book_15"
      },
      {
        "category": "artistic",
        "title": "Music for the Royal Fireworks, HWV 351",
        "excerpt": "Handel scored this blazing D-major suite for a colossal wind band—two dozen oboes, a battery of trumpets, horns, and thundering timpani—to accompany the very Green Park fireworks of April 1749 that ended in flames. Its jubilant Overture and triumphant La Réjouissance were built to compete with rockets and cannon-fire over London, music engineered to sound like the sky itself catching light. That the celebration it crowned collapsed into a burning pavilion makes it the perfect anthem for spectacle tipping into disaster.",
        "source": "IMSLP: George Frideric Handel, Music for the Royal Fireworks, HWV 351",
        "href": "https://imslp.org/wiki/Music_for_the_Royal_Fireworks,_HWV_351_(Handel,_George_Frideric)"
      },
      {
        "category": "artistic",
        "title": "The Burning of the Houses of Lords and Commons, October 16, 1834",
        "excerpt": "Turner witnessed the 1834 blaze that destroyed the Palace of Westminster among tens of thousands of spectators lining the Thames, and here he turns catastrophe into incandescent spectacle. A towering white-gold fireball erupts against the night, its glare doubled in the black river below and silhouetting the crowds and the arch of Westminster Bridge. Fragile stone and a great riverside landmark dissolve into pure flame—celebration and horror fused in a single burning sky.",
        "source": "J. M. W. Turner, Philadelphia Museum of Art (via Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Joseph_Mallord_William_Turner,_English_-_The_Burning_of_the_Houses_of_Lords_and_Commons,_October_16,_1834_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/brooklyn-bridge-fire-july4-fireworks--art.png",
          "alt": "An oil painting of the Houses of Parliament engulfed in a vast burst of white-and-orange flame at night, the inferno reflected across the dark Thames as crowds watch from a bridge and the riverbanks.",
          "credit": "J. M. W. Turner, 1834–35, Philadelphia Museum of Art; public domain via Wikimedia Commons"
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
