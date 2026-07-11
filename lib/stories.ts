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
// the Morning Edition of 11 July 2026 (ranks 1-13) leads with its hero story,
// followed by the Evening Edition of 10 July 2026 and the Afternoon Edition of 10 July 2026.
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
    "rank": 1
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
    "rank": 2
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
    "rank": 3
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
    "rank": 4
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
    "rank": 5
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
    "rank": 6
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
    "rank": 7
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
    "rank": 8
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
    "rank": 9
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
    "rank": 10
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
    "rank": 11
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
    "rank": 12
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
    "rank": 13
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
    "rank": 14
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
    "rank": 15
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
    "rank": 16
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
    "rank": 17
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
    "rank": 18
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
    "rank": 19
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
    "rank": 20
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
    "rank": 21
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
    "rank": 22
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
    "rank": 23
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
    "rank": 24
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
    "rank": 25
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
    "rank": 26
  },
  {
    "slug": "china-reusable-rocket-landing",
    "headline": "China lands a Long March 10B rocket booster at sea, becoming the second nation to recover an orbital-class rocket",
    "overview": "China recovered the first-stage booster of its Long March 10B rocket on an offshore platform early on July 10, 2026, after a launch from the Hainan Commercial Space Launch Site, its space agency said. The controlled sea landing makes China only the second country after the United States to retrieve an orbital-class rocket, a milestone toward reusable launchers; engineers said they aim to fly the booster again before year's end.",
    "genre": "Science",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMivgFBVV95cUxNN2RjUGFsaXBkem9rVmIyZlJvaUROSmJJY2lVVC1tV0xPcGo2eEd6WHhMeDlLMkV4dnhlaHZwYm9LeThGYkJ3Zm5zZmhiWGtNWmI3Q3hYZFV5M3dYQXpMclMzYTNIV3RSMWlKN2JQLUQ4dzN5OXpKSmctVkt1ckthVV9MQmFHYkFURC16MWxseDVfc0l5SURlb1ktb1lXNnpXalF2Tkkza3dXdXpHSGVHSUdnSm10Q0RqTW53V0lR?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cm2rmmx86pdo"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-10",
    "image": {
      "src": "/covers/china-reusable-rocket-landing.png",
      "alt": "A rocket booster descends toward an offshore sea platform amid flame and smoke over the ocean.",
      "credit": "BBC"
    },
    "lead": true,
    "edition": "Afternoon Edition · 10 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Archytas of Tarentum builds a self-propelled wooden dove that flies (c. 400 BC)",
        "excerpt": "Archytas made a wooden model of a dove with such mechanical ingenuity and art that it flew; so nicely balanced was it, you see, with weights and moved by a current of air enclosed and hidden within it.",
        "source": "Aulus Gellius, Attic Nights, Book X.12, trans. John C. Rolfe (Loeb), reporting Favorinus; LacusCurtius, University of Chicago",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Gellius/10*.html"
      },
      {
        "category": "historical",
        "title": "Benjamin Franklin watches the Montgolfier and Charles balloons rise over Paris, 1783",
        "excerpt": "From Passy in 1783 Franklin reported to the Royal Society on the great globes that carried men aloft for the first time, France electrified as balloons ascended and drifted down to be recovered. Pressed on what earthly use so strange a machine could serve, he gave his celebrated retort, likening the new invention to a new-born baby that might one day grow into something great.",
        "source": "Benjamin Franklin to Sir Joseph Banks, 30 August–2 September 1783; Founders Online, U.S. National Archives",
        "href": "https://founders.archives.gov/documents/Franklin/01-40-02-0342"
      },
      {
        "category": "literary",
        "title": "The flight and fall of Icarus in Ovid's Metamorphoses, Book VIII",
        "excerpt": "bold in vanity, began to soar, rising upon his wings to touch the skies; but as he neared the scorching sun, its heat softened the fragrant wax that held his plumes; and heat increasing melted the soft wax— he waved his naked arms instead of wings, with no more feathers to sustain his flight.",
        "source": "Ovid, Metamorphoses 8.183ff, trans. Brookes More; Perseus Digital Library, Tufts University",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.02.0028%3Abook%3D8%3Acard%3D183"
      },
      {
        "category": "literary",
        "title": "Cyrano de Bergerac is carried to the Moon by tiers of firework rockets in A Voyage to the Moon (1657)",
        "excerpt": "For so soon as the Flame had devoured one tier of Squibs, which were ranked by six and six, by means of a Train that reached every half-dozen, another tier went off, and then another; so that the Salt-Peter taking Fire, put off the danger by encreasing it.",
        "source": "Cyrano de Bergerac, A Voyage to the Moon, trans. A. Lovell; Project Gutenberg (ebook 46547)",
        "href": "https://www.gutenberg.org/files/46547/46547-h/46547-h.htm"
      },
      {
        "category": "artistic",
        "title": "Joseph Haydn, chorus 'Die Himmel erzählen die Ehre Gottes' (The Heavens Are Telling) from The Creation (1798)",
        "excerpt": "Haydn's oratorio crowns the fourth day of creation with a soaring chorus, 'The heavens are telling the glory of God,' voices climbing skyward as the newborn firmament and its fires break into song. It is music of mastery over the heavens and of order kindled from chaos, an apt echo of engineers lofting fire aloft and calling it home.",
        "source": "Joseph Haydn, Die Schöpfung, Hob.XXI:2 (1798), libretto after Genesis, Milton and the Psalms; IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Die_Sch%C3%B6pfung,_Hob.XXI:2_(Haydn,_Joseph)"
      },
      {
        "category": "artistic",
        "title": "Pieter Bruegel the Elder, Landscape with the Fall of Icarus (c. 1555–1560)",
        "excerpt": "A ploughman, a shepherd and a laden ship go calmly about their work while, unremarked in a corner of the sea, two pale flailing legs are all that remains of Icarus after his soaring ascent and headlong plunge. Bruegel sets the daring flight against an indifferent, ongoing world, the sky he dared to climb closing over him without pause.",
        "source": "Pieter Bruegel the Elder, oil on panel, Royal Museums of Fine Arts of Belgium, Brussels (inv. 4030); Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Bruegel,_Pieter_de_Oude_-_De_val_van_icarus_-_hi_res.jpg",
        "image": {
          "src": "/covers/china-reusable-rocket-landing--art.png",
          "alt": "Bruegel's panel: a ploughman and coastal landscape in sunlight while Icarus's legs disappear into the sea near a passing ship",
          "credit": "Pieter Bruegel the Elder, Landscape with the Fall of Icarus, c. 1555–1560, Royal Museums of Fine Arts of Belgium, Brussels; via Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 27
  },
  {
    "slug": "sk-hynix-record-nasdaq-debut",
    "headline": "SK Hynix raises $26.5 billion in the largest-ever US market debut by a foreign company",
    "overview": "South Korean chipmaker SK Hynix raised about $26.5 billion ahead of its Nasdaq debut on July 10, 2026, the biggest US listing by a foreign firm, as investors bet on surging demand for AI memory chips. The blockbuster offering lifted global chip stocks and became an early test of appetite for the AI-driven semiconductor boom.",
    "genre": "Economy",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c4gym70r0y4o"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiowFBVV95cUxOSWhFRmx4bEZ1MW5rMXlkYmN0d0RqeXR6XzhQOXpiTlJBUGhub1gtWDhkb0hrM1RteDhnTmxacklUTXQ3UjRJb3laeEJoSFZXV0ljWklqMTVTYlpnNzMyLXRTd2xzWTB1QkZkNlI1RnFnWE1FX2kzNkVCTlNLMWpKUDhCVUJ5ZGxoQU1DalJLNFhvTVRZN0ZuSDVDZW1LR0duc3pZ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-10",
    "image": {
      "src": "/covers/sk-hynix-record-nasdaq-debut.png",
      "alt": "Two technology executives give a thumbs-up before a display of AI memory and chip products.",
      "credit": "BBC"
    },
    "edition": "Afternoon Edition · 10 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Roman credit crash of A.D. 33",
        "excerpt": "Hence followed a scarcity of money, a great shock being given to all credit, the current coin too, in consequence of the conviction of so many persons and the sale of their property, being locked up in the imperial treasury or the public exchequer.",
        "source": "Tacitus, The Annals, Book VI (chs. 16–17), trans. Alfred John Church & William Jackson Brodribb, Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Annals_(Tacitus)/Book_6"
      },
      {
        "category": "historical",
        "title": "The Dutch Tulipomania of 1636–37",
        "excerpt": "Nobles, citizens, farmers, mechanics, seamen, footmen, maidservants, even chimney-sweeps and old clotheswomen, dabbled in tulips.",
        "source": "Charles Mackay, Memoirs of Extraordinary Popular Delusions, \"The Tulipomania\" (1841), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/636/636-h/636-h.htm"
      },
      {
        "category": "literary",
        "title": "The flood-tide roar of the Bourse in Zola's Money",
        "excerpt": "from among the coulissiers, already installed under the clock and hard at work, there arose the clamour of bull and bear, the flood-tide roar of speculation dominating all the rumbling hubbub of the city.",
        "source": "Émile Zola, Money (L'Argent), trans. Ernest A. Vizetelly (1894), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/56987/56987-h/56987-h.htm"
      },
      {
        "category": "literary",
        "title": "The wheat torrent in Frank Norris's The Pit",
        "excerpt": "the roar of the torrent of wheat which drove through Chicago from the Western farms to the mills and bakeshops of Europe. There at the foot of the street the torrent swirled once upon itself, forty million strong, in the eddy which he told himself he mastered.",
        "source": "Frank Norris, The Pit: A Story of Chicago (1903), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/4382/4382-h/4382-h.htm"
      },
      {
        "category": "artistic",
        "title": "\"Some seven men form an Association\" from Utopia, Limited",
        "excerpt": "Some seven men form an Association\n(If possible, all Peers and Baronets),\nThey start off with a public declaration\nTo what extent they mean to pay their debts.\nThat's called their Capital; if they are wary\nThey will not quote it at a sum immense.",
        "source": "W. S. Gilbert & Arthur Sullivan, Utopia, Limited; or, The Flowers of Progress (1893), Mr. Goldbury's song, Wikisource libretto",
        "href": "https://en.wikisource.org/wiki/Utopia,_Limited"
      },
      {
        "category": "artistic",
        "title": "Satire on Tulip Mania",
        "excerpt": "Jan Brueghel the Younger paints the speculators as bewigged monkeys in fine Dutch dress, weighing bulbs, toasting deals, and drawing swords over prices. One ape pisses on a discarded bloom while another is dragged before a magistrate and a third is carried, bankrupt, to the grave — the whole giddy market rendered as a troop of apes.",
        "source": "Jan Brueghel the Younger, Satire on the Tulipomania, oil on panel, c. 1640, Frans Hals Museum, Haarlem (inv. os 75-699); Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Jan_Brueghel_the_Younger,_Satire_on_Tulip_Mania,_c._1640.jpg",
        "image": {
          "src": "/covers/sk-hynix-record-nasdaq-debut--art.png",
          "alt": "Monkeys in 17th-century Dutch dress trading, weighing, and quarrelling over tulip bulbs, with one urinating on the flowers and another carried to his grave",
          "credit": "Jan Brueghel the Younger, Satire on the Tulipomania (c. 1640), Frans Hals Museum / Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 28
  },
  {
    "slug": "typhoon-bavi-japan-china-alert",
    "headline": "Powerful Typhoon Bavi bears down on Japan's Okinawa islands as China reels from a week of deadly storms",
    "overview": "Typhoon Bavi, packing sustained winds near 162 kph (100 mph), closed in on Japan's remote Sakishima Islands in Okinawa on July 10, 2026, forcing more than 1,000 evacuations and the cancellation of dozens of flights and ferries before its expected closest approach on Saturday. The storm came as China braced for the same system after a week of floods and storms that killed dozens.",
    "genre": "Climate",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMixwFBVV95cUxNekhCZ2F4SGtjYVBVTG8tZFJ4b1VyeFdyNHpZdW5SNFg4SlQwX3UyZjRKQlNUbzd6VTl3eXl5cUpKTlM3NzdzTDI0b3VDNE84TnZwSnFDcUY2MmJZZEg2NWJLSW5IZHM2SjFVYno2ZE9FV2dIU2gxSE51ZWd6aGdhQlRhTVVfWUFoV3JUS1hXemNmWTBYM3Y1amxHdHl0MUxQM3JQbGdncHFVeVVnSDZ0WDNqbWhSR2FnX0lYTW53RjN2RDRYNWpr?oc=5"
      },
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMilgFBVV95cUxOYnUzZnNQeXh5WjA5MUZENGN2UDFzUGY3Mk5obDlsOE95TzdzaGxobEowX09pVmlKbU04YUdnTzIxcFF5R1E0QWdWWEp0VGlCbW4tdHdzVF9kX1Jtc3g4Tkk3RWczWE50amYtLUp1S0NGRUVWOEJxQjlKbTI1QTRnYzB3YW5IaGVqTERJeVZHWUN5bHBIZ2c?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-10",
    "image": {
      "src": "/covers/typhoon-bavi-japan-china-alert.png",
      "alt": "A shop in Okinawa with its windows taped in crosses and a storm-closure notice as Typhoon Bavi nears.",
      "credit": "The Japan Times"
    },
    "edition": "Afternoon Edition · 10 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The storm at Sepias wrecks Xerxes' fleet (480 BC)",
        "excerpt": "at dawn, after clear and calm weather, the sea began to boil, and there brake upon them a great storm and a strong east wind, that wind which the people of that country call the Hellespontian... In that stress there perished by the least reckoning not fewer than four hundred ships, and men innumerable and a great plenty of substance.",
        "source": "Herodotus, Histories 7.188–190, trans. A. D. Godley (Loeb), via LacusCurtius (University of Chicago)",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Herodotus/7D*.html"
      },
      {
        "category": "historical",
        "title": "Isaac Cline's report on the Galveston hurricane (September 8, 1900)",
        "excerpt": "The water rose at a steady rate from 3 p.m. until about 7:30 p.m., when there was a sudden rise of about four feet in as many seconds... Probably more than six thousand persons had passed from life to death during that dreadful night.",
        "source": "Isaac M. Cline, official U.S. Weather Bureau report on the Galveston hurricane, 1900 (NOAA NWS Heritage)",
        "href": "https://vlab.noaa.gov/web/nws-heritage/-/galveston-storm-of-1900"
      },
      {
        "category": "literary",
        "title": "Poseidon raises the storm against Odysseus (Odyssey, Book 5)",
        "excerpt": "So saying, he gathered the clouds, and seizing his trident in his hands troubled the sea, and roused all blasts of all manner of winds, and hid with clouds land and sea alike; and night rushed down from heaven.",
        "source": "Homer, Odyssey 5.291–294, trans. A. T. Murray, Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0136:book=5:card=282"
      },
      {
        "category": "literary",
        "title": "The shipwreck that opens Shakespeare's The Tempest (Act 1, Scene 1)",
        "excerpt": "Blow, till thou burst thy wind, if room enough!... All lost! to prayers, to prayers! all lost!",
        "source": "William Shakespeare, The Tempest, Act I, Scene 1, Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/23042/pg23042.txt"
      },
      {
        "category": "artistic",
        "title": "'Gewitter. Sturm' — the storm movement of Beethoven's Pastoral Symphony (No. 6, Op. 68)",
        "excerpt": "Beethoven's fourth movement erupts out of a placid country afternoon: rolling timpani mimic distant thunder, frantic string tremolos drive sheets of rain, and piccolo and trombones enter for the first time to make the tempest's fury physical. The music churns through remote keys until, spent, it dissolves into a shepherd's song of thanksgiving after the storm.",
        "source": "Ludwig van Beethoven, Symphony No. 6 in F major, Op. 68 ('Pastorale'), 4th movement (public domain scores), IMSLP",
        "href": "https://imslp.org/wiki/Symphony_No.6,_Op.68_(Beethoven,_Ludwig_van)"
      },
      {
        "category": "artistic",
        "title": "The Great Wave off Kanagawa",
        "excerpt": "A towering, claw-fingered wave rears over three slender boats whose oarsmen crouch low, dwarfed to specks against the water's curling might, while distant Mount Fuji sits small and still beneath the crest. Hokusai freezes the exact instant before the sea falls, making human smallness before nature the whole subject of the print.",
        "source": "Katsushika Hokusai, 'The Great Wave off Kanagawa,' from Thirty-six Views of Mount Fuji, c. 1830–32 (Tokyo Fuji Art Museum copy), Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Katsushika_Hokusai_-_The_Great_Wave_off_the_Coast_of_Kanagawa.jpg",
        "image": {
          "src": "/covers/typhoon-bavi-japan-china-alert--art.png",
          "alt": "A giant cresting wave with foaming claw-like tips looms over small fishing boats, with Mount Fuji visible in the distance",
          "credit": "Katsushika Hokusai (c. 1830–32), public domain via Wikimedia Commons (Tokyo Fuji Art Museum)"
        }
      }
    ],
    "rank": 29
  },
  {
    "slug": "iris-van-herpen-plasma-couture",
    "headline": "Iris van Herpen unveils the first couture gown lit by plasma at Paris Couture Week",
    "overview": "Dutch designer Iris van Herpen presented \"Helix Nebula,\" billed as the first dress made with plasma, at Paris Couture Week on July 10, 2026. Hand-blown glass horns filled with ionized gas glow red and streak with color as the wearer's body conducts their electrical field, part of her 17-look \"Sonic Starquakes\" collection wrapped in 10,000 hand-blown glass spheres.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Dezeen",
        "href": "https://www.dezeen.com/2026/07/10/iris-van-herpen-glass-gown-glowing-plasma/"
      },
      {
        "name": "FashionUnited",
        "href": "https://fashionunited.com/news/fashion/iris-van-herpen-only-she-could-invent-the-worlds-first-plasma-dress/2026070773354"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-10",
    "image": {
      "src": "/covers/iris-van-herpen-plasma-couture.png",
      "alt": "A plasma globe glowing with filaments of violet electrical light held in two hands.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 10 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The High Priest's Vestments as a Map of the Cosmos",
        "excerpt": "And for the twelve stones, whether we understand by them the months, or whether we understand the like number of the signs of that circle which the Greeks call the Zodiac, we shall not be mistaken in their meaning.",
        "source": "Flavius Josephus, Antiquities of the Jews, Book III, ch. 7 (William Whiston translation), Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Antiquities_of_the_Jews/Book_III"
      },
      {
        "category": "historical",
        "title": "Alice Vanderbilt's 'Electric Light' Gown at the 1883 Vanderbilt Ball",
        "excerpt": "Designed by the House of Worth, the yellow-satin gown was threaded with gold and silver in a lightning-bolt pattern and studded with glass beads and pearls. Dry-cell batteries hidden in its folds fed a torch bulb the wearer could raise overhead like the Statue of Liberty, so that a woman herself became a walking source of electric light — a garment animated by the newest science of its age.",
        "source": "House of Worth, 'Electric Light' fancy-dress ensemble (1883), Museum of the City of New York, acc. 51.284.3A-H",
        "href": "https://www.mcny.org/story/vanderbilt-ball"
      },
      {
        "category": "literary",
        "title": "Pygmalion's Ivory Statue Wakes to Life",
        "excerpt": "the ivory seemed to soften at the touch, and its firm texture yielded to his hand",
        "source": "Ovid, Metamorphoses, Book X (Brookes More translation), Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0028:book=10:card=243"
      },
      {
        "category": "literary",
        "title": "The Heavens' Embroidered Cloths",
        "excerpt": "Had I the heavens' embroidered cloths, / Enwrought with golden and silver light, / The blue and the dim and the dark cloths / Of night and light and the half light,",
        "source": "W. B. Yeats, 'Aedh wishes for the Cloths of Heaven,' from The Wind Among the Reeds (1899), Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Wind_Among_the_Reeds/Aedh_wishes_for_the_Cloths_of_Heaven"
      },
      {
        "category": "artistic",
        "title": "'And there was Light' — Haydn's The Creation",
        "excerpt": "Out of a groping, tonally unmoored 'Representation of Chaos,' the chorus murmurs of the world's first dawn until, on the single word 'Light,' Haydn detonates a sudden blaze of C major. The birth of radiance is rendered as pure sound, the cosmos summoned into being by a chord — music that does not describe light so much as switch it on.",
        "source": "Joseph Haydn, Die Schöpfung (The Creation), Hob. XXI:2 (1796–98), IMSLP",
        "href": "https://imslp.org/wiki/Die_Sch%C3%B6pfung,_Hob.XXI:2_(Haydn,_Joseph)"
      },
      {
        "category": "artistic",
        "title": "Vincent van Gogh, The Starry Night (1889)",
        "excerpt": "Van Gogh's night sky churns with spiraling nebulae and swollen, haloed stars, the heavens made turbulent and alive above a sleeping town. The cosmos here is not observed but felt — pigment swept into currents of living light, a universe caught and set glowing in paint.",
        "source": "Vincent van Gogh, The Starry Night (1889), oil on canvas, Museum of Modern Art, New York; Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/iris-van-herpen-plasma-couture--art.png",
          "alt": "Vincent van Gogh's The Starry Night: a swirling, luminous night sky of spiraling stars and a glowing crescent moon over a quiet village and cypress tree",
          "credit": "Vincent van Gogh, The Starry Night (1889), Museum of Modern Art / Google Art Project, public domain via Wikimedia Commons"
        }
      }
    ],
    "rank": 30
  },
  {
    "slug": "xi-north-korea-premier-treaty",
    "headline": "North Korea's premier arrives in Beijing for the 65th anniversary of the China–North Korea friendship treaty",
    "overview": "North Korean Premier Pak Thae-song arrived in Beijing on July 10, 2026, leading a delegation to mark the 65th anniversary of the 1961 China–North Korea Treaty of Friendship, Cooperation and Mutual Assistance. It is the first time in seven years Pyongyang has sent a government delegation to Beijing for the anniversary, following a Xi–Kim summit last month and signaling a deepening thaw between the two allies.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMisgFBVV95cUxQWm8yOEY5OW1ILWYxd3BWdElGRVZBNTlrdDNSZ1F0NWRLMnlwNERTcGV4SlE5Y255SktnYjRZeHpaV1pWU1hDWV9tWmZUR3ZLR3N1aEdPSHZBSjd3MkpIRVNiaTVLc1BKU1U4bUlXSXRuZkJhMWtEY3FKTDlXZUFRZThtbEFPQ282VHBvX1lEdGd3eklvQ1BkdjVCYXVSal8xb0ozcnEtXzVQaTFqTG9lTW9B?oc=5"
      },
      {
        "name": "Xinhua",
        "href": "https://english.news.cn/20260710/e713c57ea57c4d1f8810fb135a9c2618/c.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-10",
    "image": {
      "src": "/covers/xi-north-korea-premier-treaty.png",
      "alt": "The colonnaded facade of the Great Hall of the People in Beijing under a clear sky.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 10 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Egyptian–Hittite \"Eternal Treaty\" of Ramesses II and Hattusili III (c. 1259 BC)",
        "excerpt": "Behold then, Khetasar, the great chief of Kheta, is in treaty relation with Usermare-Setepnere (Ramses II), the great ruler of Egypt, beginning with this day, in order to bring about good peace and good brotherhood between us forever, while he is in brotherhood with me, he is in peace with me; and I am in brotherhood with him, and I am in peace with him, forever.",
        "source": "James Henry Breasted, Ancient Records of Egypt, Vol. III: The Nineteenth Dynasty, §375 (Univ. of Chicago Press, 1906), via Internet Archive",
        "href": "https://archive.org/details/ancient-records-of-egypt-vol-3_202012"
      },
      {
        "category": "historical",
        "title": "The Franco-Russian Military Convention of 1892",
        "excerpt": "If France is attacked by Germany, or by Italy supported by Germany, Russia shall employ all her available forces to attack Germany. If Russia is attacked by Germany, or by Austria supported by Germany, France shall employ all her available forces to attack Germany.",
        "source": "The Franco-Russian Alliance Military Convention, August 18, 1892; The Avalon Project, Yale Law School",
        "href": "https://avalon.law.yale.edu/19th_century/frrumil.asp"
      },
      {
        "category": "literary",
        "title": "The Oath of the Peach Garden in Romance of the Three Kingdoms",
        "excerpt": "We three, Liu Pei, Kuan Yü and Chang Fei, though of different families, swear brotherhood, and promise mutual help to one end. We will rescue each other in difficulty, we will aid each other in danger. We swear to serve the state and save the people. We ask not the same day of birth but we seek to die together.",
        "source": "Luo Guanzhong, Romance of the Three Kingdoms, Chapter 1, trans. C. H. Brewitt-Taylor, Project Gutenberg",
        "href": "https://www.gutenberg.org/files/77416/77416-h/77416-h.htm"
      },
      {
        "category": "literary",
        "title": "The Rütli Oath in Schiller's Wilhelm Tell",
        "excerpt": "We swear to be a nation of true brothers, Never to part in danger or in death!",
        "source": "Friedrich Schiller, Wilhelm Tell, Act II, trans. Theodore Martin, Project Gutenberg",
        "href": "https://www.gutenberg.org/files/6788/6788-h/6788-h.htm"
      },
      {
        "category": "artistic",
        "title": "The Oath of the Knights of Death in Verdi's La battaglia di Legnano (1849)",
        "excerpt": "In Verdi's opera the free cities of the Lombard League bind themselves against the German emperor Frederick Barbarossa, and the warriors of the Compagnia della Morte swear on the cross to conquer or die for a common homeland. Their thundering third-act chorus turns a military pact into a sacred vow of brotherhood, the private oath of allies made public and irrevocable before God and country.",
        "source": "Giuseppe Verdi, La battaglia di Legnano (1849), full and vocal scores (Ricordi), IMSLP",
        "href": "https://imslp.org/wiki/La_battaglia_di_Legnano_(Verdi,_Giuseppe)"
      },
      {
        "category": "artistic",
        "title": "Jacques-Louis David, Oath of the Horatii (1784)",
        "excerpt": "Three brothers stretch their arms as one toward the swords their father lifts high, their bodies rigid with a collective vow to fight and die for the state. David freezes the instant an alliance is sealed by oath: rigid geometry, clasped weapons, and outstretched hands make allegiance a matter of unbreakable ceremony, while the grieving women at the right foretell the cost such pacts exact.",
        "source": "Jacques-Louis David, Le Serment des Horaces, 1784, oil on canvas, Musée du Louvre, Paris; Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:David-Oath_of_the_Horatii-1784.jpg",
        "image": {
          "src": "/covers/xi-north-korea-premier-treaty--art.png",
          "alt": "Three Roman brothers raise their arms toward three swords held aloft by their father, swearing a martial oath, while women mourn at the right.",
          "credit": "Jacques-Louis David, Oath of the Horatii (1784), Musée du Louvre / Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 31
  },
  {
    "slug": "bayeux-tapestry-british-museum",
    "headline": "The Bayeux Tapestry arrives at the British Museum after a secret overnight journey from France",
    "overview": "The 70-metre, 11th-century Bayeux Tapestry reached the British Museum in the early hours of July 10, 2026, spirited across the Channel under police escort in a vibration-proof, climate-controlled case. It is the first time the embroidery depicting the 1066 Norman Conquest has been in Britain in nearly a thousand years; the loan, insured for more than $1 billion, goes on display from September.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMingFBVV95cUxNdUNLd3BlT282aXJPLVJxUzIzbG1pLTdoajR3S2FyMF9tWXdQM1hqdnVRZXBWdGNTdTVTMlBlUGJqS29EUW9PZWJrMDREcjJuZmFBbmpZSDlibW9RX2VHRE5CazJHZTJaZUtUVzljdzBOVGdzNlZINW5FWmE2dy0waVhsQ29BNUNRd0tsWlZVamZDR1JudmVHVFlvY2xYUQ?oc=5"
      },
      {
        "name": "British Museum",
        "href": "https://www.britishmuseum.org/about-us/press/press-releases/bayeux-tapestry-displayed-british-museum"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-10",
    "image": {
      "src": "/covers/bayeux-tapestry-british-museum.png",
      "alt": "A panel of the Bayeux Tapestry showing Norman knights on horseback charging with archers below.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 10 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Trajan's Column: Rome winds a war into a spiral of stone",
        "excerpt": "Trajan constructed over the Ister a stone bridge for which I cannot sufficiently admire him.",
        "source": "Cassius Dio, Roman History, Book LXVIII.13, trans. Earnest Cary (Loeb Classical Library, 1925), LacusCurtius",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Cassius_Dio/68*.html"
      },
      {
        "category": "historical",
        "title": "The Parthenon (Elgin) Marbles: a treasure carried across the sea",
        "excerpt": "Dull is the eye that will not weep to see / Thy walls defaced, thy mouldering shrines removed / By British hands",
        "source": "Lord Byron, Childe Harold's Pilgrimage, Canto II, stanza XI (1812), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/5131/5131-h/5131-h.htm"
      },
      {
        "category": "literary",
        "title": "The Song of Roland — the battle-lay reputedly sung by Taillefer at Hastings",
        "excerpt": "Rollant hath set the olifant to his mouth, / He grasps it well, and with great virtue sounds.",
        "source": "La Chanson de Roland, trans. C. K. Scott-Moncrieff (1919), Laisse CXXXIII, Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/391/pg391.html"
      },
      {
        "category": "literary",
        "title": "Helen embroiders the Trojan War into cloth (Iliad, Book 3)",
        "excerpt": "She found Helen in the hall, where she was weaving a great purple web of double fold, and thereon was broidering many battles of the horse-taming Trojans and the brazen-coated Achaeans, that for her sake they had endured at the hands of Ares.",
        "source": "Homer, Iliad 3.125-128, trans. A. T. Murray (Loeb Classical Library, 1924), Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0134%3Abook%3D3%3Acard%3D121"
      },
      {
        "category": "artistic",
        "title": "Handel, 'Zadok the Priest' (HWV 258) — an anthem to crown a conquering king",
        "excerpt": "Handel's coronation anthem, first sung at the crowning of George II in 1727 and at every British coronation since, builds from murmuring, rising strings into a sudden blaze of choir and trumpets shouting 'God save the King.' It is the sound of legitimacy conferred by ceremony rather than by blood on the field, the very thing William the Conqueror sought when he was crowned in Westminster Abbey on Christmas Day 1066, the campaign the Tapestry sets out to justify.",
        "source": "George Frideric Handel, Zadok the Priest, Coronation Anthem HWV 258 (1727), IMSLP",
        "href": "https://imslp.org/wiki/Zadok_the_Priest,_HWV_258_(Handel,_George_Frideric)"
      },
      {
        "category": "artistic",
        "title": "'Isti mirant stella': Halley's Comet as omen over King Harold (Bayeux Tapestry, Scene 32)",
        "excerpt": "Crowds crane their necks and point at a blazing, fire-tailed star stitched across the linen, above the caption 'Isti mirant stella' - 'these men marvel at the star.' Below, a newly crowned Harold sits uneasy on his throne as a messenger leans in with news, while a ghostly line of empty ship-hulls in the lower border already foretells the invasion the comet is taken to announce.",
        "source": "The Bayeux Tapestry, Scene 32 (embroidery, 1070s), photograph by Myrabella, Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Bayeux_Tapestry_scene32_Halley_comet.jpg",
        "image": {
          "src": "/covers/bayeux-tapestry-british-museum--art.png",
          "alt": "Bayeux Tapestry scene of men pointing up at Halley's Comet, with a seated King Harold and empty ships in the lower border",
          "credit": "Bayeux Tapestry, Scene 32 (1070s); photo Myrabella / Wikimedia Commons (CC0 / public domain)"
        }
      }
    ],
    "rank": 32
  },
  {
    "slug": "australia-h5n1-bird-flu-seabird",
    "headline": "Australia confirms its first H5N1 bird-flu case in a local seabird as detections rise to 12",
    "overview": "Australia recorded its first H5N1 avian-influenza infection in a native seabird, a greater crested tern found at Robe in South Australia, the agriculture minister said on July 10, 2026. The finding, which brought the country's confirmed detections to 12, deepened concern that the virus is spreading after arriving last month, though officials reported no mass die-offs or poultry outbreaks.",
    "genre": "Science",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMi1gFBVV95cUxNUWJBa0kyTGdzY2dqcmRCRDRBZDAtVEZNWXVGby1CcDdYVjNFRDFPamxPbGRMaWd3NVg1YVM1eV9hY3lvb0E1eEtVak56dDZjY05kdkRwbXdZbzdwcXVtQVhpQnR6UGp6NzB3MDZWRWZ2dFRwZ0NJSXRQQk1SZHMtZXZNTTBEb0xhc0xWN2x4ZVdudXpGZnQ4T0NlbmtRTUlkcjcxZE9jX2xRcjlHQjJQc0tFV1F4VnR5Q2lrYy01VHZ2OWVkWmozWjVjWkxCMlI2WTFHQ1Vn?oc=5"
      },
      {
        "name": "Xinhua",
        "href": "https://english.news.cn/20260710/2bee1736af0b4101ade744e1aae120bc/c.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-10",
    "image": {
      "src": "/covers/australia-h5n1-bird-flu-seabird.png",
      "alt": "A greater crested tern in flight over dark water, a small fish held in its bill.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 10 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Plague of Athens: birds and beasts that fed on the dead perished too",
        "excerpt": "All the birds and beasts that prey upon human bodies, either abstained from touching them (though there were many lying unburied), or died after tasting them.",
        "source": "Thucydides, History of the Peloponnesian War, Book II (trans. Richard Crawley), Wikisource",
        "href": "https://en.wikisource.org/wiki/History_of_the_Peloponnesian_War/Book_2"
      },
      {
        "category": "historical",
        "title": "The Plague of Justinian: a pestilence that spread over the whole world",
        "excerpt": "It started from the Egyptians who dwell in Pelusium. Then it divided and moved in one direction towards Alexandria and the rest of Egypt, and in the other direction it came to Palestine on the borders of Egypt; and from there it spread over the whole world, always moving forward and travelling at times favorable to it.",
        "source": "Procopius, History of the Wars, Book II (trans. H. B. Dewing, 1914), World History Encyclopedia",
        "href": "https://www.worldhistory.org/article/1536/procopius-on-the-plague-of-justinian-text--comment/"
      },
      {
        "category": "literary",
        "title": "Boccaccio's Decameron: the plague leaps from man to beast, and two hogs fall dead",
        "excerpt": "the rags of a poor man, who had died of the plague, being cast out into the public way, two hogs came up to them and having first, after their wont, rooted amain among them with their snouts, took them in their mouths and tossed them about their jaws; then, in a little while, after turning round and round, they both, as if they had taken poison, fell down dead upon the rags with which they had in an ill hour intermeddled.",
        "source": "Giovanni Boccaccio, The Decameron, Introduction to the First Day (trans. John Payne), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/23700/23700-h/23700-h.htm"
      },
      {
        "category": "literary",
        "title": "Poe's 'The Raven': the ominous bird as prophet and thing of evil",
        "excerpt": "\"Prophet!\" said I, \"thing of evil!—prophet still, if bird or devil!\"",
        "source": "Edgar Allan Poe, 'The Raven' (1845), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/1065/1065-h/1065-h.htm"
      },
      {
        "category": "artistic",
        "title": "Mozart's Requiem in D minor, K. 626",
        "excerpt": "Left unfinished at Mozart's death in 1791, the Requiem opens in the shadow of the Introitus and swells into the terror of the Dies irae, a mass for the dead that has become the sound of mortality itself. Its Latin sequence pleads for rest and mercy as a wrathful day of reckoning approaches. For a nation watching a new contagion arrive on its shores, it is the music of dread held in suspension.",
        "source": "Wolfgang Amadeus Mozart, Requiem in D minor, K.626 (1791), IMSLP Petrucci Music Library",
        "href": "https://imslp.org/wiki/Requiem,_K.626_(Mozart,_Wolfgang_Amadeus)"
      },
      {
        "category": "artistic",
        "title": "Arnold Böcklin, 'The Plague' (Die Pest), 1898",
        "excerpt": "A skeletal figure of Death rides a winged, dragon-like beast low through the narrow street of a medieval town, its scythe sweeping the air as bodies crumple in the gutters below. The airborne monster embodies pestilence as a thing that flies in from elsewhere, a harbinger swooping down on a place that had felt safe. Böcklin painted it while cholera stalked Europe, fixing the ancient dread of a contagion arriving on the wing.",
        "source": "Arnold Böcklin, Die Pest (The Plague), 1898, tempera on fir wood, Kunstmuseum Basel; Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Arnold_B%C3%B6cklin_-_Die_Pest.jpg",
        "image": {
          "src": "/covers/australia-h5n1-bird-flu-seabird--art.png",
          "alt": "Death astride a winged creature flying through a plague-stricken medieval street strewn with the dead",
          "credit": "Arnold Böcklin, Die Pest (1898), Kunstmuseum Basel / Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 33
  },
  {
    "slug": "hungary-orban-protest-sulyok",
    "headline": "Thousands rally in Budapest as Orbán's allies protest a plan to remove President Tamás Sulyok",
    "overview": "Several thousand supporters of former prime minister Viktor Orbán gathered outside the Sándor Palace in Budapest on July 9–10, 2026, to protest the new pro-European government's plan to oust President Tamás Sulyok by constitutional amendment. Prime Minister Péter Magyar, who ended Orbán's 16-year rule in April, says his two-thirds majority gives him a mandate; Orbán's Fidesz calls the move an assault on the rule of law.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMipAFBVV95cUxQUjNsNWxUUXBrcGNTeVZpVUNNQ3QwQXZrR0JzNXpKV1dhVlNId0lOdGl4UjhhNzBxMzlwQkpSaW53MWdsODR1VHFnQTNyZndPNGdWSWhUMTVCdUtCUFZUeTFKUU90UlF3WEU4VDNCZ0JmdS12bEtNcTVjZndZTW5LUmFYbHFOSUFRRWZidzBiZjNqbC1fY011c1ZwS2hYSHJCUG5qcg?oc=5"
      },
      {
        "name": "PBS NewsHour",
        "href": "https://www.pbs.org/newshour/world/orban-allies-protest-in-hungary-against-new-prime-ministers-plans-to-oust-president-sulyok"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-10",
    "image": {
      "src": "/covers/hungary-orban-protest-sulyok.png",
      "alt": "A crowd of protesters waving Hungarian flags applauds at an outdoor rally in Budapest.",
      "credit": "PBS NewsHour"
    },
    "edition": "Afternoon Edition · 10 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Expulsion of Tarquin the Proud from Rome (509 BC)",
        "excerpt": "He goaded on the incensed multitude to strip the king of his sovereignty and pronounce a sentence of banishment against Tarquin with his wife and children.",
        "source": "Livy, The History of Rome, Book 1, ch. 59, trans. Rev. Canon Roberts (Perseus Digital Library, Tufts University)",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.02.0026%3Abook%3D1%3Achapter%3D59"
      },
      {
        "category": "historical",
        "title": "The Declaration that James II Had 'Abdicated the Government' (Bill of Rights, 1689)",
        "excerpt": "And whereas the said late King James the Second having abdicated the government and the throne being thereby vacant, his Highness the prince of Orange (whom it hath pleased Almighty God to make the glorious instrument of delivering this kingdom from popery and arbitrary power)...",
        "source": "Bill of Rights 1689 (English Parliament), Wikisource",
        "href": "https://en.wikisource.org/wiki/Bill_of_Rights_1689"
      },
      {
        "category": "literary",
        "title": "Richard II Unmakes Himself in the Deposition Scene",
        "excerpt": "Now mark me how I will undo myself: / I give this heavy weight from off my head, / And this unwieldy sceptre from my hand, / The pride of kingly sway from out my heart; / With mine own tears I wash away my balm, / With mine own hands I give away my crown, / With mine own tongue deny my sacred state, / With mine own breath release all duteous rites:",
        "source": "William Shakespeare, King Richard II, Act IV, Scene 1 (Yale edition, 1921), Wikisource",
        "href": "https://en.wikisource.org/wiki/Richard_II_(1921)_Yale/Text/Act_IV"
      },
      {
        "category": "literary",
        "title": "'Ye are many—they are few': Shelley's Call to the Risen Crowd",
        "excerpt": "Rise like Lions after slumber / In unvanquishable number— / Shake your chains to earth like dew / Which in sleep had fallen on you— / Ye are many—they are few.",
        "source": "Percy Bysshe Shelley, The Masque of Anarchy (written 1819), Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Masque_of_Anarchy"
      },
      {
        "category": "artistic",
        "title": "La Marseillaise — the Revolution's Anthem of the Sovereign People",
        "excerpt": "Composed in Strasbourg in April 1792 as an army marching song, La Marseillaise became the roaring voice of a people claiming to be the true source of authority. Its summons—citizens to arms, tyranny's banner raised against them—turned a crowd into a nation and a nation into a judge of its rulers. On the palace steps of any contested succession, its cadence is the sound of the street asserting its mandate.",
        "source": "Claude-Joseph Rouget de Lisle, La Marseillaise (1792), scores and arrangements at IMSLP",
        "href": "https://imslp.org/wiki/La_Marseillaise_(Rouget_de_Lisle,_Claude-Joseph)"
      },
      {
        "category": "artistic",
        "title": "Liberty Leading the People (Le 28 Juillet)",
        "excerpt": "Delacroix paints the crowd itself as the protagonist: a bare-breasted Liberty strides over the fallen, tricolor in one hand and musket in the other, a ragged mass of citizens surging up from the barricades behind her. Painted to commemorate the July Revolution of 1830 that toppled Charles X, it is the definitive image of a people overturning a ruler by force of numbers—the will of the crowd made flesh.",
        "source": "Eugène Delacroix, oil on canvas, 1830, Musée du Louvre (RF 129); Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Eug%C3%A8ne_Delacroix_-_Le_28_Juillet._La_Libert%C3%A9_guidant_le_peuple.jpg",
        "image": {
          "src": "/covers/hungary-orban-protest-sulyok--art.png",
          "alt": "Delacroix's painting of Liberty, a bare-breasted woman holding the French tricolor and a musket, leading an armed crowd over barricades and fallen bodies",
          "credit": "Eugène Delacroix, La Liberté guidant le peuple (1830), Musée du Louvre, Paris — Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 34
  },
  {
    "slug": "africa-clean-cooking-commitments",
    "headline": "African nations secure $900 million in new pledges to expand clean cooking access",
    "overview": "Governments and partners pledged $900 million in fresh funding to bring clean cooking fuels and stoves to Africa, the International Energy Agency said on July 9–10, 2026, lifting total commitments past $3.1 billion since a 2024 Paris summit. Nearly a billion people on the continent still cook over polluting open fires; the IEA also launched a program to shore up supply chains for fuels such as LPG.",
    "genre": "Climate",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMinAFBVV95cUxPSjJPOTFzaEhnLUlVeXVjOTJFLVpTc0ZWZDRieUFPUHhiT2c1R3lLa1dsV29vYWF0SDNKcUt4bGZ5b01HWGJaQ3BtcDlJWWlsQzlIRHlXa1BHNWllV0tWaGwwZHhKOUJiZWN2amszOENKNUN3c1ZXLXNzSGwwNnRoS1c4aUh1LVZuSFBvX0d5QkFRbnFuWjRxc1BzR2o?oc=5"
      },
      {
        "name": "IEA",
        "href": "https://www.iea.org/news/new-commitments-to-clean-cooking-in-africa-reach-900-million-ahead-of-2nd-major-summit"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-10",
    "image": {
      "src": "/covers/africa-clean-cooking-commitments.png",
      "alt": "A cooking pot balanced on stones over an open wood fire, smoke rising.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 10 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Vestal Virgins and Rome's perpetual sacred fire",
        "excerpt": "to Numa is ascribed the consecration of the Vestal virgins, and in general the worship and care of the perpetual fire entrusted to their charge.",
        "source": "Plutarch, Life of Numa 9; Bernadotte Perrin translation, Loeb Classical Library (1914), hosted at LacusCurtius (Bill Thayer, University of Chicago)",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Plutarch/Lives/Numa*.html"
      },
      {
        "category": "historical",
        "title": "Count Rumford's public soup-kitchens: warm, cheap, wholesome food for the poor",
        "excerpt": "At the hour of dinner, a large bell was rung in the court, when those at work in the different parts of the building repaired to the dining-hall; where they found a wholesome and nourishing repast; consisting of about A POUND AND A QUARTER, Avoirdupois weight, of a very rich soup of peas and barley, mixed with cuttings of fine white bread",
        "source": "Benjamin Thompson, Count Rumford, 'Essays, Political, Economical, and Philosophical' (First Essay, 1790s), full text at FullTextArchive",
        "href": "https://www.fulltextarchive.com/book/ESSAYS-Political-Economical-and-Philosophical/"
      },
      {
        "category": "literary",
        "title": "Prometheus, who stole fire as the teacher of every human art",
        "excerpt": "And I am he that searched out the source of fire, by stealth borne-off inclosed in a fennel-rod, which has shown itself a teacher of every art to mortals, and a great resource.",
        "source": "Aeschylus, 'Prometheus Bound', trans. Theodore Alois Buckley, Project Gutenberg eBook 27458",
        "href": "https://www.gutenberg.org/files/27458/27458-h/27458-h.htm"
      },
      {
        "category": "literary",
        "title": "The poor cottager's family gathered round the ingle",
        "excerpt": "The cheerfu' supper done, wi' serious face, / They, round the ingle, form a circle wide;",
        "source": "Robert Burns, 'The Cotter's Saturday Night', in 'The Poetical Works of Robert Burns', Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Poetical_Works_of_Robert_Burns/The_Cotter's_Saturday_Night"
      },
      {
        "category": "artistic",
        "title": "Beethoven, 'The Creatures of Prometheus' (Die Geschöpfe des Prometheus), Op. 43",
        "excerpt": "Beethoven's only full-length ballet (1801) dramatizes Prometheus finding humankind in ignorance and raising it through the gifts of fire, science, and art. Its heroic finale theme so possessed the composer that he reused it in the 'Eroica' Symphony, turning the fire-bringer's myth into a hymn of human elevation.",
        "source": "Ludwig van Beethoven, 'Die Geschöpfe des Prometheus', Op. 43 (1801); full public-domain scores at IMSLP",
        "href": "https://imslp.org/wiki/Die_Gesch%C3%B6pfe_des_Prometheus,_Op.43_(Beethoven,_Ludwig_van)"
      },
      {
        "category": "artistic",
        "title": "Vincent van Gogh, 'The Potato Eaters' (1885)",
        "excerpt": "Around a rough table in a dim cottage, five peasants share a plain meal of potatoes by the glow of a single hanging lamp. Van Gogh wanted the coarse hands and shadowed faces to show people who had 'tilled the earth' eating honestly by their own light, dignifying the humblest hearth-lit gathering of the poor.",
        "source": "Vincent van Gogh, 'The Potato Eaters', oil on canvas, 1885, Van Gogh Museum, Amsterdam; Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Vincent_van_Gogh_-_The_potato_eaters_-_Google_Art_Project_(5776925).jpg",
        "image": {
          "src": "/covers/africa-clean-cooking-commitments--art.png",
          "alt": "Five peasants gathered around a wooden table sharing potatoes by the light of a single hanging oil lamp in a dark cottage interior",
          "credit": "Vincent van Gogh, The Potato Eaters (1885), Van Gogh Museum, Amsterdam / Google Art Project via Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 35
  },
  {
    "slug": "tencent-manus-ai-stake",
    "headline": "Tencent in talks to become the largest shareholder of AI startup Manus after Beijing blocks Meta's takeover",
    "overview": "Tencent is negotiating to become the biggest single shareholder of Manus, the Chinese \"agentic\" AI startup whose $2 billion sale to Meta was blocked by Beijing, people familiar with the matter said on July 10, 2026. Early backers including Tencent and ZhenFund would unwind Meta's deal at the same valuation, shifting the company's ownership decisively toward domestic investors.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMitwFBVV95cUxPbFpzUmJDMlREcGZWUUdDdlJybWdBY0Q5NXcxUFdiT0NrV3V2OUtyZjVHUmFROHB5c2ZHNjN5QkNmNU0wT2dSdm1YaEJKRklfNFZSWmpEdHVYa2VDNXhEX3FpLUhyZFZCZHlndjhJbE1pQUtRRlpyT0ZOdWdFYVc1S3Z4VC1FamNUdlpXNUxQcjZOa1FBSFlHV044NHFKSlNNWjZwVGFQeU9WZUVCYWZqUDF6cXVRQXc?oc=5"
      },
      {
        "name": "The Next Web",
        "href": "https://thenextweb.com/news/tencent-in-talks-to-become-manus-largest-shareholder"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-10",
    "image": {
      "src": "/covers/tencent-manus-ai-stake.png",
      "alt": "The twin glass towers of Tencent's headquarters in Shenzhen rising behind street trees.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 10 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Aristotle imagines self-working tools that would end the need for slaves",
        "excerpt": "if every tool could perform its own work when ordered, or by seeing what to do in advance, like the statues of Daedalus in the story, or the tripods of Hephaestus which the poet says 'enter self-moved the company divine,'—if thus shuttles wove and quills played harps of themselves, master-craftsmen would have no need of assistants and masters no need of slaves.",
        "source": "Aristotle, Politics 1.1253b, trans. H. Rackham (Loeb), Perseus Digital Library, Tufts University",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0058:book=1:section=1253b"
      },
      {
        "category": "historical",
        "title": "Kempelen's chess automaton 'The Turk,' the machine that seemed to think for itself",
        "excerpt": "It is quite certain that the operations of the Automaton are regulated by mind, and by nothing else.",
        "source": "Edgar Allan Poe, 'Maelzel's Chess-Player,' Southern Literary Messenger (1836), Edgar Allan Poe Society of Baltimore",
        "href": "https://www.eapoe.org/works/essays/maelzel.htm"
      },
      {
        "category": "literary",
        "title": "Talos, the bronze guardian who hurled rocks to keep strangers from the shore",
        "excerpt": "And Talos, the man of bronze, as he broke off rocks from the hard cliff, stayed them from fastening hawsers to the shore, when they came to the roadstead of Dicte's haven. He was of the stock of bronze, of the men sprung from ash-trees, the last left among the sons of the gods.",
        "source": "Apollonius Rhodius, Argonautica 4, trans. R. C. Seaton (1912), Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/830/pg830.txt"
      },
      {
        "category": "literary",
        "title": "Frankenstein's creature opens its eye and the maker recoils from his own hands' work",
        "excerpt": "I saw the dull yellow eye of the creature open; it breathed hard, and a convulsive motion agitated its limbs.",
        "source": "Mary Shelley, Frankenstein (1818), Chapter 5, Project Gutenberg",
        "href": "https://www.gutenberg.org/files/84/84-h/84-h.htm"
      },
      {
        "category": "artistic",
        "title": "Paul Dukas, 'The Sorcerer's Apprentice' (L'apprenti sorcier)",
        "excerpt": "Dukas sets Goethe's fable to a shimmering, quickening orchestra: the apprentice enchants a broom to haul water, then watches in horror as the servant obeys too well, splitting into an unstoppable army that cannot be recalled. Bassoon and brass build to a flood the maker can no longer control, until the master returns to break the spell. It is the theme of the servant that acts on its own, made audible.",
        "source": "Paul Dukas, L'apprenti sorcier, symphonic scherzo after Goethe (Paris: Durand & Fils, 1897), public domain, IMSLP",
        "href": "https://imslp.org/wiki/L'apprenti_sorcier_(Dukas,_Paul)"
      },
      {
        "category": "artistic",
        "title": "The Death of Talos, Attic red-figure volute krater by the Talos Painter, c. 400 BC",
        "excerpt": "On this krater the bronze man Talos, painted in pale white to mark his metal skin, topples backward into the arms of the Dioskouroi as Medea works her spell, draining the single vein at his ankle. It is one of antiquity's rare images of a man-made automaton dying, a metal guardian undone by the very people who sought to master him.",
        "source": "Talos Painter, Attic red-figure volute krater (ARV 1338.1), Museo Nazionale Jatta, Ruvo di Puglia (inv. MANJ 36933); Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Talos_Painter_-_ARV_1338_1_-_Dionysos_with_satyrs_and_maenads_-_death_of_Talos_-_Argonauts_and_gods_-_Ruvo_MANJ_36933_-_02.jpg",
        "image": {
          "src": "/covers/tencent-manus-ai-stake--art.png",
          "alt": "Red-figure krater showing the bronze giant Talos, rendered in white, collapsing into the arms of the Dioskouroi as Medea enchants him",
          "credit": "Talos Painter, c. 400 BC, Museo Nazionale Jatta, Ruvo di Puglia; via Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 36
  },
  {
    "slug": "easyjet-apollo-takeover",
    "headline": "EasyJet backs Apollo's $7.7 billion takeover bid, dropping its support for a rival offer",
    "overview": "EasyJet said on July 10, 2026 it would recommend a £5.7 billion ($7.7 billion) cash offer from private-equity firm Apollo Global Management, judging it superior to a lower bid from Castlelake it had accepted days earlier. Shares in the Luton-based budget airline jumped about 15% to their highest level since 2022 as a bidding war for the carrier took shape.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMinwFBVV95cUxPSHd2cTd0TXlycFNqcnZHYml2Qzc1NXRyaWt4UERsRktub0dvR0JGc2NfX2FBNW5CdjVFYkZwX1lfZ21TdlpjSTRRR0ZrVml0RG5zUVU3S1Z3cFV1TGJnQlJUQjR4bFRna2lxVFM5emMtU3ZqY1RuOGhSVWhVaGJGcVdqVnlsSFk4aXBxUURkeWdCcm1EUGF5Y1NhM0QwUVk?oc=5"
      },
      {
        "name": "CNBC",
        "href": "https://www.cnbc.com/2026/07/10/easyjet-apollo-takeover-bid-castlelake-share-price.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-10",
    "image": {
      "src": "/covers/easyjet-apollo-takeover.png",
      "alt": "Two easyJet aircraft in orange-and-white livery parked on an airport tarmac.",
      "credit": "CNBC"
    },
    "edition": "Afternoon Edition · 10 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Praetorian Guard auctions the Roman Empire to the highest bidder (193 AD)",
        "excerpt": "For, just as if it had been in some market or auction-room, both the City and its entire empire were auctioned off.",
        "source": "Cassius Dio, Roman History, Epitome of Book LXXIV.11, trans. Earnest Cary (Loeb Classical Library); LacusCurtius",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Cassius_Dio/74*.html"
      },
      {
        "category": "historical",
        "title": "Charles V and Francis I outbid each other for the imperial crown (1519)",
        "excerpt": "When Charles and Francis entered the lists as candidates for the imperial dignity, they conducted their rivalship with many professions of regard for each other... \"We both court the same mistress,\" said Francis, with his usual vivacity; \"each ought to urge his suit with all the address of which he is master; the most fortunate will prevail, and the other must rest contented.\"",
        "source": "William Robertson, The History of the Reign of the Emperor Charles V, Book II (1769); Internet Archive",
        "href": "https://archive.org/details/historyofreign01robe"
      },
      {
        "category": "literary",
        "title": "The suitors devour Odysseus's house while contending for Penelope",
        "excerpt": "the chiefs from all our islands, Dulichium, Same, and the woodland island of Zacynthus, as also all the principal men of Ithaca itself, are eating up my house under the pretext of paying their court to my mother",
        "source": "Homer, The Odyssey, Book I, trans. Samuel Butler; Project Gutenberg",
        "href": "https://www.gutenberg.org/files/1727/1727-h/1727-h.htm"
      },
      {
        "category": "literary",
        "title": "Portia's rival suitors gamble on the caskets for a prize all the world desires",
        "excerpt": "Who chooseth me shall gain what many men desire.",
        "source": "William Shakespeare, The Merchant of Venice, Act II, Scene VII; Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/1515/pg1515.txt"
      },
      {
        "category": "artistic",
        "title": "Wagner, Die Meistersinger von Nürnberg — a public song contest whose prize is a bride",
        "excerpt": "Wagner's comedy stages a public singing contest in Nuremberg in which the prize is the hand of Eva Pogner, pledged to whichever mastersinger the guild judges best. The pedantic clerk Beckmesser and the young knight Walther von Stolzing become rival suitors, each straining to outdo the other before the assembled townsfolk, until the finer voice carries off both the trophy and the bride.",
        "source": "Richard Wagner, Die Meistersinger von Nürnberg, WWV 96 (1868); IMSLP",
        "href": "https://imslp.org/wiki/Die_Meistersinger_von_N%C3%BCrnberg,_WWV_96_(Wagner,_Richard)"
      },
      {
        "category": "artistic",
        "title": "John William Waterhouse, Penelope and the Suitors (1912)",
        "excerpt": "Waterhouse paints Penelope bent over her loom, unweaving by night the shroud that stalls her choice, while a press of suitors crowds the window behind her, thrusting flowers, a lyre, and gifts through the frame to advance their competing claims. The canvas freezes the long siege of rival bidders circling a single prize, each convinced his suit will prevail.",
        "source": "John William Waterhouse, \"Penelope and the Suitors\" (1912), Aberdeen Art Gallery & Museums; Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:JohnWilliamWaterhouse-PenelopeandtheSuitors(1912).jpg",
        "image": {
          "src": "/covers/easyjet-apollo-takeover--art.png",
          "alt": "Penelope seated at her loom, unweaving her work, while a crowd of suitors leans through the window behind her offering gifts to win her",
          "credit": "John William Waterhouse (1912), Aberdeen Art Gallery & Museums; Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 37
  },
  {
    "slug": "vodafone-niel-shareholder",
    "headline": "French billionaire Xavier Niel becomes Vodafone's largest shareholder in a $6 billion deal",
    "overview": "The family group of French telecoms magnate Xavier Niel agreed to buy the roughly 16.2% Vodafone stake held by UAE group e& for about £4.4 billion ($5.9 billion), making Niel the biggest shareholder in Britain's largest mobile operator, the companies said on July 10, 2026. Niel, a longtime advocate of European telecom consolidation, expects to take direct ownership by year's end.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiwwFBVV95cUxOWDZrN29mWjdCYWhqM0pHcmkwZzVCR0lJUXYxRVYyQTRDS2RjWlpyd3JKaGMyMWZQTGtHWXBWYnZhZFRfQ2RIZEgwQnRsNkpPeEQzLU96ek8tTEhxa2hQLVFSdDU2RmhjZEVNNzU5b0xtUnR6ZnlzMU9RVzJBMWpuN0NPMnBDZlRrQnFmN0RYdE5iRDJUYWdRSlpWLTRfY3RwekdTTE1rOFFuOVhYRVFRdi0tNkZWcUQ5T19ZeG9pdEpublk?oc=5"
      },
      {
        "name": "The Irish Times",
        "href": "https://www.irishtimes.com/business/2026/07/10/eirs-owner-xavier-niel-becomes-biggest-vodafone-investor-in-6bn-deal/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-10",
    "image": {
      "src": "/covers/vodafone-niel-shareholder.png",
      "alt": "A large white Vodafone sign mounted above a storefront.",
      "credit": "The Irish Times"
    },
    "edition": "Afternoon Edition · 10 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Marcus Licinius Crassus, the Richest Man in Rome",
        "excerpt": "he got together out of fire and war, making the public calamities his greatest source of revenue",
        "source": "Plutarch, Life of Crassus, ch. 2, trans. Bernadotte Perrin; Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:2008.01.0038:chapter=2"
      },
      {
        "category": "historical",
        "title": "Cosimo de' Medici, the Banker Who Bought Florence",
        "excerpt": "it appeared there was no citizen of any consequence to whom Cosmo had not lent a large sum of money",
        "source": "Niccolò Machiavelli, The History of Florence, Book VII (Universal Classics Library, 1901); Project Gutenberg",
        "href": "https://www.gutenberg.org/files/2464/2464-h/2464-h.htm"
      },
      {
        "category": "literary",
        "title": "Tamburlaine's Ascent: 'passing brave to be a king'",
        "excerpt": "Is it not passing brave to be a king, / And ride in triumph through Persepolis?",
        "source": "Christopher Marlowe, Tamburlaine the Great, Part I, Act II, Scene V; Project Gutenberg",
        "href": "https://www.gutenberg.org/files/1094/1094-h/1094-h.htm"
      },
      {
        "category": "literary",
        "title": "Frank Cowperwood and the Street-Railways of Chicago",
        "excerpt": "Street-cars, he knew, were his natural vocation. Even more than stock-brokerage, even more than banking, even more than stock-organization he loved the thought of street-cars and the vast manipulative life it suggested.",
        "source": "Theodore Dreiser, The Titan (1914); Project Gutenberg",
        "href": "https://www.gutenberg.org/files/3629/3629-h/3629-h.htm"
      },
      {
        "category": "artistic",
        "title": "The Coronation Scene from Mussorgsky's Boris Godunov",
        "excerpt": "Mussorgsky opens his opera with the great bells of the Kremlin as Boris, having schemed his way to the summit, is crowned Tsar of All Russia. In the Coronation Scene the crowd is marshalled to acclaim the new sovereign while Boris, already burdened by ambition and guilt, prays to rule justly. Pealing bells and a massed chorus swell one man's ascent to supreme power into overwhelming public spectacle.",
        "source": "Modest Mussorgsky, Boris Godunov (1874), vocal and full scores; IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Boris_Godunov_(Mussorgsky,_Modest)"
      },
      {
        "category": "artistic",
        "title": "Portrait of Cornelius Vanderbilt (Jared B. Flagg, 1879)",
        "excerpt": "Flagg paints the self-made 'Commodore' who built a transport empire by buying up steamship lines and railroads until he commanded the arteries of a nation. Vanderbilt sits square and immovable in sober black, the very image of a magnate whose fortune was assembled through relentless acquisition. It is the Gilded-Age face of one man consolidating scattered networks into a single dominion.",
        "source": "Jared Bradley Flagg, Portrait of Cornelius Vanderbilt (1879), oil on canvas, Preservation Society of Newport County; Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Portrait_of_Cornelius_Vanderbilt.jpg",
        "image": {
          "src": "/covers/vodafone-niel-shareholder--art.png",
          "alt": "Oil portrait of railroad and shipping magnate Cornelius Vanderbilt, seated in dark formal dress",
          "credit": "Jared Bradley Flagg, Portrait of Cornelius Vanderbilt (1879), Preservation Society of Newport County — public domain via Wikimedia Commons"
        }
      }
    ],
    "rank": 38
  },
  {
    "slug": "russia-unjammable-drones-ukraine-grid",
    "headline": "Russia uses small fibre-optic drones to slip past defences and knock out Ukrainian power substations",
    "overview": "Russian forces are flying cheap fibre-optic FPV drones—immune to electronic jamming because they trail a thin cable—to strike high-voltage electricity substations in Ukraine's Sumy region, Reuters reported on July 10, 2026. Investigators verified strikes that threaded through ventilation gaps to destroy autotransformers worth millions, a tactic that a roughly $2,000 drone can carry out from up to 26 km behind the front.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMi0wFBVV95cUxPNFhpZjBWeVhPRG14SGhuQnZJcDFFRzlMR2xfbURJTXBqTU41X2hDa3RvOXBLYjhmZWxEc1J0cE8tOEVSNmtyOG5NVU1hWmw5dk5KSUFDd3ZLdWpoSHhWeEtOeElRRkJtaU5iT0YxUDVkUVk3OGdQSm9TMkdLYnp3ektHT1UwcXJkbWl0RWNrRjVEQTNGVlB6MEQ4ODYzZjZkRkpQLVpycldOWndvUExrM3B4VG1tYXZaNExKMDFuVXZDdHZVdXJ5Q0M1YWNNcHAxT3Q4?oc=5"
      },
      {
        "name": "Atlantic Council",
        "href": "https://www.atlanticcouncil.org/blogs/ukrainealert/fiber-optics-drones-have-emerged-as-critical-kit-for-both-russia-and-ukraine/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-10",
    "image": {
      "src": "/covers/russia-unjammable-drones-ukraine-grid.png",
      "alt": "A small quadcopter FPV drone carrying a payload flies low over a snow-covered field.",
      "credit": "Atlantic Council"
    },
    "edition": "Afternoon Edition · 10 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "David slings a stone into Goliath's forehead (1 Samuel 17)",
        "excerpt": "Then said David to the Philistine, Thou comest to me with a sword, and with a spear, and with a shield: but I come to thee in the name of the LORD of hosts, the God of the armies of Israel, whom thou hast defied. ... And David put his hand in his bag, and took thence a stone, and slang it, and smote the Philistine in his forehead, that the stone sunk into his forehead; and he fell upon his face to the earth.",
        "source": "The Bible, King James Version, 1 Samuel 17:45,49 (Wikisource)",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/1_Samuel"
      },
      {
        "category": "historical",
        "title": "Operation Chastise: a handful of bombers cripples the Ruhr's dams and power stations (16-17 May 1943)",
        "excerpt": "A single squadron with a purpose-built weapon threaded low over Germany at night and breached the Möhne and Eder dams, unleashing floods that swept away two hydroelectric stations and slashed the Ruhr's steel output to a quarter. A tiny, precisely aimed force reached past massed defences to sever the water and current that fed an entire industrial heartland.",
        "source": "RAF reconnaissance photograph of the breached Möhne Dam, 17 May 1943 (UK Crown, public domain, Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Mohne_Dam_Breached.jpg"
      },
      {
        "category": "literary",
        "title": "Ariadne's thread guides Theseus out of the labyrinth (Ovid, Metamorphoses VIII)",
        "excerpt": "and when the difficult entrance, retraced by none of those who have entered it before, has been found by the aid of the maiden, by means of the thread gathered up again",
        "source": "Ovid, Metamorphoses, Book VIII, trans. Henry T. Riley (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/26073/26073-h/26073-h.htm"
      },
      {
        "category": "literary",
        "title": "The Greeks fall on sleeping Troy in the dead of night (Virgil, Aeneid II)",
        "excerpt": "'Twas in the dead of night, when sleep repairs / Our bodies worn with toils, our minds with cares",
        "source": "Virgil, The Aeneid, Book II, trans. John Dryden (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/228/pg228.txt"
      },
      {
        "category": "artistic",
        "title": "1812 Overture, Op. 49 (Overture solennelle)",
        "excerpt": "Tchaikovsky's festival overture stages an invasion in sound: the Marseillaise of the advancing army swelling against Russian hymns and folk tunes, cannon fire punching through the orchestra as a homeland is overrun and then, in triumph, delivered. It is the din of a nation's defences breaking and reforming under assault.",
        "source": "Pyotr Ilyich Tchaikovsky, 1812 Overture, Op. 49 (1880), full scores and parts (IMSLP/Petrucci Music Library)",
        "href": "https://imslp.org/wiki/1812_Overture,_Op.49_(Tchaikovsky,_Pyotr)"
      },
      {
        "category": "artistic",
        "title": "David with the Head of Goliath",
        "excerpt": "Caravaggio paints the small victor holding the severed head of the giant, the mighty champion undone by a shepherd boy's stone. Light falls out of surrounding darkness onto the sword and the lifeless face, a meditation on how the great are brought low by the least.",
        "source": "Caravaggio, David with the Head of Goliath, c.1610, oil on canvas, Galleria Borghese, Rome (Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:David_with_the_Head_of_Goliath-Caravaggio_(1610).jpg",
        "image": {
          "src": "/covers/russia-unjammable-drones-ukraine-grid--art.png",
          "alt": "Caravaggio's David holding the severed head of Goliath, emerging from deep shadow",
          "credit": "Caravaggio, c.1610, Galleria Borghese, Rome; public domain via Wikimedia Commons"
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
