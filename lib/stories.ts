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
// the Evening Edition of 23 July 2026 (ranks 1-13) leads with its hero story,
// followed by the Morning Edition of 23 July 2026 and the Evening Edition of 22 July 2026.
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
    "slug": "trump-global-tariffs-60-countries",
    "headline": "Trump imposes double-digit tariffs on 60 countries as temporary 10% global levies expire",
    "overview": "The Trump administration will impose tariffs of 10% to 12.5% on imports from 60 countries that account for about 99% of US imports, taking effect at 12:01 a.m. Friday as temporary 10% worldwide levies lapse. The White House said the new duties, imposed under a 1974 trade law, punish nations it accuses of inadequately enforcing bans on goods made with forced labor. Trump turned to the more durable measures after the Supreme Court struck down his broadest tariffs in February.",
    "genre": "Economy",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMiogFBVV95cUxOOVM1QThyUlVoWl9xS1lVTTFZUHJJdU1peU1wZjdlaEZ5R08xUFZQcGVmc05LWHhhR0hOdlBqLVlhOWRGRVg5RmpKU2FiUnVSMmZMTEZocGtlZ05xTVJicmJOMndxNENHYU14enNWdllRR2RYZE1jSVVYM2VRZGJuRmhyVW1rcVRnNnNCcDlweURpSTlSUXJZVkZTX0JseUtnTkE?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMitgFBVV95cUxOZjlYNnVfaDJNN2FOQldfTTRPclB4cmxtTWxaSDkyUGJJZHhtYjJEVUZnRmxhNjZEV0daUkZJS1ZHWHFJM1hSNDlBcVlwUlRIdVN4ZmVzVmgtbUpxM1NyVlotQVA3NmhUb090NVFzamlaUkhCTjFuRzZWTjVTUTYxMzhBLXNld09NWGdadEx1bXdnemUwbWdtbzg1X0I2Y3VJZFpiOFk0blpFSS1ieklCeFItZzQ4UQ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-23",
    "image": {
      "src": "/covers/trump-global-tariffs-60-countries.png",
      "alt": "A container ship stacked with freight steams away from a port",
      "credit": "Container ship, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 23 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Megarian Decree and the road to the Peloponnesian War (c. 432 BC), in Thucydides",
        "excerpt": "war might be prevented by the revocation of the Megara decree, excluding the Megarians from the use of Athenian harbors and of the market of Athens. But Athens was not inclined either to revoke the decree, or to entertain their other proposals; she accused the Megarians of pushing their cultivation into the consecrated ground and the unenclosed land on the border, and of harboring her runaway slaves.",
        "source": "Thucydides, History of the Peloponnesian War 1.139, trans. Richard Crawley; Perseus Digital Library, Tufts University.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0200:book=1:chapter=139",
        "image": {
          "src": "/covers/trump-global-tariffs-60-countries--a0.png",
          "alt": "Marble bust of the Athenian statesman Pericles wearing a Corinthian helmet, a Roman copy after a Greek original",
          "credit": "Bust of Pericles, Roman copy after Kresilas, Museo Pio-Clementino, Vatican Museums. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "Napoleon's Berlin Decree launching the Continental System (November 21, 1806)",
        "excerpt": "1. The British Isles are declared to be in a state of blockade. 2. All commerce and all correspondence with the British Isles are forbidden. Consequently letters or packages directed to England or to an Englishman or written in the English language shall not pass through the mails and shall be seized. 3. Every individual who is an English subject, of whatever state or condition he may be, who shall be discovered in any country occupied by our troops or by those of our allies, shall be made a prisoner of war.",
        "source": "Napoleon I, Berlin Decree (21 November 1806), establishing the Continental System; Wikisource.",
        "href": "https://en.wikisource.org/wiki/Berlin_Decree",
        "image": {
          "src": "/covers/trump-global-tariffs-60-countries--a1.png",
          "alt": "Jacques-Louis David's full-length portrait of the Emperor Napoleon standing in his study at the Tuileries",
          "credit": "Jacques-Louis David, The Emperor Napoleon in His Study at the Tuileries (1812), National Gallery of Art. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Adam Smith on restraints upon importation and the \"invisible hand,\" Wealth of Nations, Book IV (1776)",
        "excerpt": "By preferring the support of domestic to that of foreign industry, he intends only his own security; and by directing that industry in such a manner as its produce may be of the greatest value, he intends only his own gain, and he is in this, as in many other cases, led by an invisible hand to promote an end which was no part of his intention. Nor is it always the worse for the society that it was no part of it. By pursuing his own interest he frequently promotes that of the society more effectually than when he really intends to promote it.",
        "source": "Adam Smith, An Inquiry into the Nature and Causes of the Wealth of Nations (1776), Book IV, Chapter II, \"Of Restraints upon the Importation from Foreign Countries\"; Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_Wealth_of_Nations/Book_IV/Chapter_2",
        "image": {
          "src": "/covers/trump-global-tariffs-60-countries--a2.png",
          "alt": "The Muir portrait of the political economist Adam Smith in profile",
          "credit": "The Muir portrait of Adam Smith (artist unknown). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Frédéric Bastiat, \"The Candlemakers' Petition\" (1845)",
        "excerpt": "We are suffering from the ruinous competition of a rival who apparently works under conditions so far superior to our own for the production of light that he is flooding the domestic market with it at an incredibly low price; for the moment he appears, our sales cease, all the consumers turn to him, and a branch of French industry whose ramifications are innumerable is all at once reduced to complete stagnation. This rival, which is none other than the sun, is waging war on us so mercilessly... We ask you to be so good as to pass a law requiring the closing of all windows, dormers, skylights, inside and outside shutters, curtains, casements, bull's-eyes, deadlights, and blinds — in short, all openings, holes, chinks, and fissures through which the light of the sun is wont to enter houses.",
        "source": "Frédéric Bastiat, \"A Petition\" (the Candlemakers' Petition), Economic Sophisms (1845), trans. Arthur Goddard; Bastiat.org / Foundation for Economic Education.",
        "href": "https://bastiat.org/en/petition.html",
        "image": {
          "src": "/covers/trump-global-tariffs-60-countries--a3.png",
          "alt": "Engraved portrait of the French economist Frédéric Bastiat",
          "credit": "Portrait of Frédéric Bastiat (19th century). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Marinus van Reymerswaele, \"The Tax Collectors\" (c. 1540)",
        "excerpt": "In a cramped counting-house two officials hunch over a table strewn with coins, ledgers, and sealed documents, one scratching entries into an account book of tolls and duties while his companion clutches a purse. The Netherlandish master turns the machinery of taxing commerce into grotesque caricature, every wrinkle and grasping finger rendered in exacting detail. It is a Renaissance portrait of the state's hand reaching into every transaction that crosses a market or a border.",
        "source": "Marinus van Reymerswaele, The Tax Collectors, oil on panel, c. 1540; reproduced via the Web Gallery of Art on Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Marinus_van_Reymerswale_-_The_Tax_Collectors_-_WGA19332.jpg",
        "image": {
          "src": "/covers/trump-global-tariffs-60-countries--a4.png",
          "alt": "Two tax collectors at a table covered with coins, ledgers, and documents in a 16th-century Netherlandish painting",
          "credit": "Marinus van Reymerswaele, The Tax Collectors (c. 1540). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Bernhard Gillam, \"The Protectors of Our Industries\" (Puck, 1883)",
        "excerpt": "A chromolithograph from Puck skewers the protective tariff: a raft labeled for monopoly floats on the backs of exhausted laborers, while portly financiers—Cyrus Field, Jay Gould, William Vanderbilt, Russell Sage—lounge comfortably above them on bags of money. The cartoon frames the high tariff not as a shield for workers but as a subsidy for the rich, borne on the shoulders of the poor. It captures the recurring charge that a tariff sold as national protection redistributes upward.",
        "source": "Bernhard Gillam, \"The Protectors of Our Industries,\" chromolithograph, Puck, 7 February 1883; Library of Congress, via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:The_protectors_of_our_industries_-_Gillam_;_Mayer_Merkel_&_Ottmann_lith.,_N.Y._LCCN94507245.jpg",
        "image": {
          "src": "/covers/trump-global-tariffs-60-countries--a5.png",
          "alt": "1883 Puck cartoon showing wealthy financiers seated on money bags atop a raft carried on the backs of struggling laborers",
          "credit": "Bernhard Gillam, The Protectors of Our Industries, Puck, 1883. Library of Congress; public domain, via Wikimedia Commons."
        }
      }
    ],
    "lead": true,
    "rank": 1
  },
  {
    "slug": "eu-google-1-billion-dma-fine",
    "headline": "EU fines Google 890 million euros ($1 billion) over Play Store and search self-preferencing",
    "overview": "The European Commission fined Google 890 million euros (about $1 billion) on Thursday, ruling that the company breached the Digital Markets Act by steering users toward its own services in Google Search and the Play app store. About $524 million of the penalty covered the search violations and roughly $490 million the Play store. Google has 60 days to pay or face escalating penalties tied to its global revenue.",
    "genre": "Technology",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMirAFBVV95cUxNeUh6QmR1OUZ1T0owdUZpUkd5RGxwV29ZYmR0NExtRjEwN09OUm1mcUp2S1FOUkw0OElMbkpfd3FodUtFNkNUalg5OEg0ajA2SHlwWWw2ams5SUdNWW5DakFyNGVPZHBTQUQ5aTJlamk2WF90eE1jalVvMEVkMDIwUjJ5eFdzNE5kWXhXVjZhb21xc3BiS3hibkR1QVpMRjB5SW1fOHlQVTVPMDc0?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMipAFBVV95cUxPYkZ0Y296UnBOaHhsNXpXR29WRHJXSjJvOHFZYzBQSW04Z3FfZk9TcWU0Ty15TGEtUUZpeElDN0E5SmlpcV9GT0txMnBPV19HZkR5TDJEQ1NiX2VEcVB2UVY0c3FTZEZIRkRIODhwUVRrLTl0THB4U2R2QjhnekhtWDFkSk80ajd1a0VENUlSNW1ja09GeVpDc2N6b25GMG5tQVlMMw?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-23",
    "image": {
      "src": "/covers/eu-google-1-billion-dma-fine.png",
      "alt": "The Berlaymont building, headquarters of the European Commission in Brussels",
      "credit": "The Berlaymont, European Commission headquarters, Brussels, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 23 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The U.S. Supreme Court dissolves the great oil trust, Standard Oil Co. of New Jersey v. United States (221 U.S. 1, 1911)",
        "excerpt": "The unification of power and control over a commodity such as petroleum and its products by combining in one corporation the stocks of many other corporations aggregating a vast capital gives rise, of itself, to the prima facie presumption of an intent and purpose to dominate the industry connected with, and gain perpetual control of the movement of, that commodity and its products in the channels of interstate commerce in violation of the Anti-Trust Act of 1890. This country has followed the line of development of the law of England, and the public policy has been to prohibit, or treat as illegal, contracts, or acts entered into with intent to wrong the public and which unreasonably restrict competitive conditions, limit the right of individuals, restrain the free flow of commerce, or bring about public evils such as the enhancement of prices.",
        "source": "Standard Oil Co. of New Jersey v. United States, 221 U.S. 1 (decided May 15, 1911), syllabus. Opinion of Chief Justice White ordering the breakup of the Standard Oil combination. Wikisource.",
        "href": "https://en.wikisource.org/wiki/Standard_Oil_Co._of_New_Jersey_v._United_States",
        "image": {
          "src": "/covers/eu-google-1-billion-dma-fine--a0.png",
          "alt": "Portrait photograph of John D. Rockefeller, founder of the Standard Oil Company",
          "credit": "Portrait of John D. Rockefeller (c. 1885), public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "Adam Smith denounces the monopoly of the exclusive merchant company, The Wealth of Nations, Book IV, Chapter VII (1776)",
        "excerpt": "The government of an exclusive company of merchants is, perhaps, the worst of all governments for any country whatever. It was not, however, able to stop altogether the progress of these colonies, though it rendered it more slow and languid.",
        "source": "Adam Smith, An Inquiry into the Nature and Causes of the Wealth of Nations, Book IV, Chapter VII, \"Of Colonies\" (1776), in his critique of the East India Company and other chartered monopolies. Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_Wealth_of_Nations/Book_IV/Chapter_7",
        "image": {
          "src": "/covers/eu-google-1-billion-dma-fine--a1.png",
          "alt": "The Muir portrait of the economist Adam Smith",
          "credit": "Adam Smith, the Muir portrait, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Ida M. Tarbell anatomizes the first perfect trust, The History of the Standard Oil Company (1904)",
        "excerpt": "This work is the outgrowth of an effort on the part of the editors of McClure's Magazine to deal concretely in their pages with the trust question. In order that their readers might have a clear and succinct notion of the processes by which a particular industry passes from the control of the many to that of the few, they decided a few years ago to publish a detailed narrative of the history of the growth of a particular trust. The Standard Oil Trust was chosen for obvious reasons. It was the first in the field, and it has furnished the methods, the charter, and the traditions for its followers. It is the most perfectly developed trust in existence; that is, it satisfies most nearly the trust ideal of entire control of the commodity in which it deals.",
        "source": "Ida M. Tarbell, The History of the Standard Oil Company (1904), Preface. Project Gutenberg (ebook 60692).",
        "href": "https://www.gutenberg.org/ebooks/60692",
        "image": {
          "src": "/covers/eu-google-1-billion-dma-fine--a2.png",
          "alt": "Photographic portrait of the muckraking journalist Ida M. Tarbell",
          "credit": "Ida M. Tarbell, public domain photograph, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Balzac's usurer proclaims the secret sovereignty of gold, Gobseck (1830)",
        "excerpt": "There are ten of us in Paris, silent, unknown kings, the arbiters of your destinies. ... What is life but a machine set in motion by money? ... Gold is the spiritual basis of existing society.",
        "source": "Honoré de Balzac, Gobseck (1830), translated by Ellen Marriage; the moneylender Gobseck boasting that a handful of financiers secretly rule society. Project Gutenberg (ebook 1389).",
        "href": "https://www.gutenberg.org/files/1389/1389-h/1389-h.htm",
        "image": {
          "src": "/covers/eu-google-1-billion-dma-fine--a3.png",
          "alt": "Portrait of the novelist Honoré de Balzac, 1842",
          "credit": "Honoré de Balzac (1842), public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "\"Next!\" — Standard Oil as an all-grasping octopus, Udo J. Keppler, Puck (September 7, 1904)",
        "excerpt": "Udo Keppler's chromolithograph for Puck renders the Standard Oil monopoly as a bloated octopus, its tentacles coiled around the steel, copper and shipping industries and clamped over a state legislature and the domed U.S. Capitol. One last tentacle reaches hungrily toward the White House itself. The image crystallized a public fear that a single self-dealing giant had seized the arteries of commerce and the organs of government alike — the same anxiety about gatekeeper power that animates a modern regulator moving against a dominant platform.",
        "source": "Udo J. Keppler, \"Next!\", cartoon in Puck, vol. 56, no. 1436 (September 7, 1904). Library of Congress Prints and Photographs Division, via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Standard_oil_octopus_loc_color.jpg",
        "image": {
          "src": "/covers/eu-google-1-billion-dma-fine--a4.png",
          "alt": "1904 Puck cartoon depicting Standard Oil as an octopus whose tentacles grip industries and government buildings including the U.S. Capitol",
          "credit": "Udo J. Keppler, \"Next!\", Puck (1904), Library of Congress, public domain via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Avarice at the counting table — Quentin Massys, The Moneylender and His Wife (1514)",
        "excerpt": "In Quentin Massys's panel a money-changer weighs gold coins on a delicate balance while his wife, a devotional book open before her, lets her eyes slide from the Virgin's image to the glinting pile of coin. A convex mirror on the table catches a window and a small distant figure, drawing the viewer into the merchant's room. The picture is an early, unsparing meditation on how the love of profit quietly displaces piety at the trader's table — the over-mighty merchant weighing the world in his scales.",
        "source": "Quentin Massys (Metsys), The Moneylender and His Wife (1514), oil on panel, Musée du Louvre, Paris (INV 1444). Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Quentin_Massys_001.jpg",
        "image": {
          "src": "/covers/eu-google-1-billion-dma-fine--a5.png",
          "alt": "1514 painting of a money-changer weighing gold coins on a balance beside his wife",
          "credit": "Quentin Massys, The Moneylender and His Wife (1514), Musée du Louvre, public domain via Wikimedia Commons"
        }
      }
    ],
    "rank": 2
  },
  {
    "slug": "bangladesh-president-shahabuddin-resign",
    "headline": "Bangladesh's president to resign Friday amid pressure over Sheikh Hasina's planned return",
    "overview": "President Mohammed Shahabuddin, a former ally of ousted premier Sheikh Hasina, will resign on Friday halfway through his term, his spokesperson said Thursday, days after Hasina said she would return from exile in India to surrender following a death sentence handed down in absentia. The government pushed Shahabuddin out over his longstanding ties to Hasina, whose 2024 crackdown on a student-led uprising killed nearly 1,400 people. His exit would leave Hasina without allies in high office before her planned return around December.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMixwFBVV95cUxQb0I2eFNHM1lwYUlTeXBXdW9WZTBiNmVhU1lGWDFIVEJWdUZhSHI0LVZVck1IbG1obk9iWFQ5MFJMVXpKTzhBUjBzMHBQWFhKa3I2Smd2LXJmVE9lU3Jrd2JGT2lJY290U1ZBMzRxand2cktIX0NlSDBiU2RqOFBMeHdTV3JUZWJsbWNQSFVIQmVXdmFsQ1p4UnI0M3BYc01kUTJYNzFIUFFWZ0laaDh5TWpuSVV6eEdZVWkycXREYzRseWVHWVJz?oc=5"
      },
      {
        "name": "The Star",
        "href": "https://www.thestar.com.my/aseanplus/aseanplus-news/2026/07/23/bangladesh-president-likely-to-resign-amid-growing-political-tensions"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-23",
    "image": {
      "src": "/covers/bangladesh-president-shahabuddin-resign.png",
      "alt": "Bangladesh President Mohammed Shahabuddin",
      "credit": "President Mohammed Shahabuddin, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 23 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "King Edward VIII’s Abdication Broadcast (11 December 1936)",
        "excerpt": "A few hours ago I discharged my last duty as King and Emperor, and now that I have been succeeded by my brother, the Duke of York, my first words must be to declare my allegiance to him. This I do with all my heart.\n\nYou all know the reasons which have impelled me to renounce the throne. But I want you to understand that in making up my mind I did not forget the country or the empire, which, as Prince of Wales and lately as King, I have for twenty-five years tried to serve.\n\nBut you must believe me when I tell you that I have found it impossible to carry the heavy burden of responsibility and to discharge my duties as King as I would wish to do without the help and support of the woman I love.",
        "source": "Edward VIII, radio address on his abdication, 11 December 1936 (Wikisource).",
        "href": "https://en.wikisource.org/wiki/Edward_VIII_of_the_United_Kingdom%27s_Abdication"
      },
      {
        "category": "historical",
        "title": "Napoleon’s Farewell to the Old Guard at Fontainebleau (20 April 1814)",
        "excerpt": "Soldiers of my old guard, I bid you farewell. For twenty years I have constantly accompanied you on the road to honor and glory. In these latter times, as in the days of our prosperity, you have invariably been models of courage and fidelity. With men such as you our cause could not be lost; but the war would have been interminable; it would have been civil war, and that would have entailed deeper misfortunes on France. I have sacrificed all my interests to those of the country. I go, but you, my friends, will continue to serve France. Her happiness was my only thought. It will still be the object of my wishes. Do not regret my fate; if I have consented to survive, it is to serve your glory. I intend to write the history of the great achievements we have performed together. Adieu, my friends. Would I could press you all to my heart.",
        "source": "Napoleon Bonaparte, “Farewell to the Old Guard,” Fontainebleau, 20 April 1814, in Napoleon’s Addresses, ed. Ida M. Tarbell (Wikisource).",
        "href": "https://en.wikisource.org/wiki/Napoleon%27s_Addresses/Part_V"
      },
      {
        "category": "literary",
        "title": "Shakespeare, Richard II, Act III, Scene 2 — “the death of kings” (c. 1595)",
        "excerpt": "For God’s sake let us sit upon the ground\nAnd tell sad stories of the death of kings—\nHow some have been deposed, some slain in war,\nSome haunted by the ghosts they have deposed,\nSome poisoned by their wives, some sleeping killed,\nAll murdered. For within the hollow crown\nThat rounds the mortal temples of a king\nKeeps Death his court; and there the antic sits,\nScoffing his state and grinning at his pomp,\nAllowing him a breath, a little scene,\nTo monarchize, be feared, and kill with looks,\nInfusing him with self and vain conceit,\nAs if this flesh which walls about our life\nWere brass impregnable; and, humoured thus,\nComes at the last, and with a little pin\nBores through his castle wall, and farewell, king!\nCover your heads, and mock not flesh and blood\nWith solemn reverence. Throw away respect,\nTradition, form, and ceremonious duty,\nFor you have but mistook me all this while.\nI live with bread like you, feel want,\nTaste grief, need friends. Subjected thus,\nHow can you say to me I am a king?",
        "source": "William Shakespeare, The Life and Death of King Richard the Second, Act III, Scene 2 (Project Gutenberg eBook #1512).",
        "href": "https://www.gutenberg.org/cache/epub/1512/pg1512.txt",
        "image": {
          "src": "/covers/bangladesh-president-shahabuddin-resign--a2.png",
          "alt": "The Westminster Abbey portrait of King Richard II of England, enthroned, crowned and holding orb and sceptre, painted in the 1390s.",
          "credit": "The Westminster Portrait of Richard II (1390s), Westminster Abbey. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Shakespeare, King Lear, Act I, Scene 1 — the division of the kingdom (First Folio, 1623)",
        "excerpt": "Meane time we shal expresse our darker purpose.\nGiue me the Map there. Know, that we haue diuided\nIn three our Kingdome: and 'tis our fast intent,\nTo shake all Cares and Businesse from our Age,\nConferring them on yonger strengths, while we\nVnburthen'd crawle toward death. Our son of Cornwal,\nAnd you our no lesse louing Sonne of Albany,\nWe haue this houre a constant will to publish\nOur daughters seuerall Dowers, that future strife\nMay be preuented now. The Princes, France & Burgundy,\nGreat Riuals in our yongest daughters loue,\nLong in our Court, haue made their amorous soiourne,\nAnd heere are to be answer'd. Tell me my daughters\n(Since now we will diuest vs both of Rule,\nInterest of Territory, Cares of State)",
        "source": "William Shakespeare, King Lear, Act I, Scene 1 (Project Gutenberg eBook #1128, First Folio text).",
        "href": "https://www.gutenberg.org/cache/epub/1128/pg1128.txt",
        "image": {
          "src": "/covers/bangladesh-president-shahabuddin-resign--a3.png",
          "alt": "Edwin Austin Abbey’s painting of King Lear, Act I, Scene I, showing the aged king dividing his kingdom before his court.",
          "credit": "Edwin Austin Abbey, King Lear, Act I, Scene I (1898), The Metropolitan Museum of Art. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Paul Delaroche, Napoleon at Fontainebleau, 31 March 1814 (1845)",
        "excerpt": "Delaroche shows the emperor slumped in a chair at Fontainebleau in the hours after signing his abdication: booted and uniformed but utterly still, hands limp, gaze fixed on nothing, the machinery of empire drained out of him. There is no battlefield and no crowd—only a conqueror reduced to a private man contemplating exile, majesty collapsing inward into exhaustion and defeat.",
        "source": "Paul Delaroche, Napoleon at Fontainebleau, 31 March 1814, oil on canvas, 1845.",
        "href": "https://commons.wikimedia.org/wiki/File:Napoleon_at_Fontainebleau,_31_March_1814_by_Paul_Hippolyte_Delaroche_(Paris_1797-1856).jpg",
        "image": {
          "src": "/covers/bangladesh-president-shahabuddin-resign--a4.png",
          "alt": "Paul Delaroche’s painting of a defeated Napoleon seated alone at Fontainebleau in the hours after his abdication, uniformed but slumped and downcast.",
          "credit": "Paul Delaroche, Napoleon at Fontainebleau, 31 March 1814 (1845). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Modest Mussorgsky, Boris Godunov — the fall of a guilt-haunted Tsar (1874)",
        "excerpt": "Mussorgsky’s opera traces a ruler who climbs to the throne over a dead child and is then destroyed from within by guilt and by a pretender who returns out of exile to claim his crown. In the great monologue the Tsar’s conscience turns his palace into a torment, and in the final scene—tolling bells, a descending vocal line—Boris bids farewell to his son and dies, his dynasty swept away as the usurper advances on Moscow.",
        "source": "Modest Mussorgsky, Boris Godunov (opera, 1874 version), after Pushkin; full score at IMSLP.",
        "href": "https://imslp.org/wiki/Boris_Godunov_(Mussorgsky,_Modest)",
        "image": {
          "src": "/covers/bangladesh-president-shahabuddin-resign--a5.png",
          "alt": "Alexander Golovin’s 1912 portrait of the bass Fyodor Chaliapin in the title role of Boris Godunov, robed and crowned in gold against a theatrical curtain.",
          "credit": "Alexander Golovin, Portrait of Fyodor Chaliapin in the Role of Boris Godunov (1912), State Russian Museum. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 3
  },
  {
    "slug": "ukraine-fedorov-defense-minister-rejects-role",
    "headline": "Ukraine's ousted defense minister Fedorov rejects Zelensky's offer of a lesser government role",
    "overview": "Mykhailo Fedorov, dismissed as Ukraine's defense minister last week after six months in the job, publicly rejected President Volodymyr Zelensky's offer to return as deputy prime minister for military innovation, saying he would accept no post other than defense minister. Fedorov, credited with modernizing the armed forces and expanding Ukraine's drone warfare, said only that role carried the authority to fight procurement corruption and complete the army's transformation. His firing has triggered street protests across Ukraine.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMirgFBVV95cUxPWlZMNnNDWW1Pay1QOXVoLS0tQ19rdVl4bXdPRWlfUTA5TnMxVVVyVnZvVzRZdG94dE5IbFdCNVVvRkdhOG1NV0RoTC04U0VLbWEwRDJrMngwdXJ4RGc2N2kwV1NGZkZfeFNmMHdaV0R2ZlNxZ1NHdThMZ1hrNnFtT3JRRW1xZUdYaTNPMHJ1dDd1MlE5VllYYWU2U1dZcmZfUGthdEZHbDloWDM4TXc?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMitwFBVV95cUxObjl3eFpwYTR4M3ZQSFRseE9PckVCQ0RWenNWR2toLXNrcTMwcW9DQjRudVN0Zlk0aV82OHJaOXk5RFlvc2JGdFg0UzNtT1dlRWM0RDZsVFNISzh2ZmIzMzlaWVdDc19JYkpkT0ZyMXZCVXZXdWd0ZDJheWNFMmlFYnEwVE1RendMY3pfWU42dFRqV1ZidUFkNjE4MlNHN2h2MjZMcUZXX0JOX0hYczRSZTg5RmJ5MTQ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-23",
    "image": {
      "src": "/covers/ukraine-fedorov-defense-minister-rejects-role.png",
      "alt": "Mykhailo Fedorov, Ukraine's ousted defense minister, speaking at a conference",
      "credit": "Mykhailo Fedorov at the World Economic Forum, 2023, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 23 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Plutarch, Life of Caius Marcius Coriolanus, ch. 15 (Roman Republic, c. 491 BC; Perrin translation, 1916)",
        "excerpt": "He had indulged the passionate and contentious side of his nature, with the idea that there was something great and exalted in this, and had not been imbued, under the influence of reason and discipline, with that gravity and mildness which are the chief virtues of a statesman.",
        "source": "Plutarch, Lives, 'Caius Marcius Coriolanus' 15, trans. Bernadotte Perrin (Loeb Classical Library, 1916)",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Plutarch/Lives/Coriolanus*.html",
        "image": {
          "src": "/covers/ukraine-fedorov-defense-minister-rejects-role--a0.png",
          "alt": "Neoclassical painting of the fallen Roman-era general Belisarius, blind and reduced to begging, echoing the fate of the proud commander at odds with the state.",
          "credit": "Jacques-Louis David, 'Belisarius Begging for Alms' (1781), Palais des Beaux-Arts de Lille, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "The resignation of Lord Randolph Churchill as Chancellor of the Exchequer, 20 December 1886 (Victorian Britain)",
        "excerpt": "His sudden resignation on the 20th of December 1886. Various motives influenced him in taking this surprising step; but the only ostensible cause was that put forward in his letter to Lord Salisbury, which was read in the House of Commons on 27th January. In this document he stated that his resignation was due to his inability, as chancellor of the exchequer, to concur in the demands made on the treasury by the ministers at the head of the naval and military establishments. The cabinet was reconstructed with Mr Goschen as chancellor of the exchequer; and Lord Randolph Churchill's own career as a Conservative chief was practically closed.",
        "source": "'Churchill, Lord Randolph Henry Spencer', Encyclopaedia Britannica, 11th ed. (1911)",
        "href": "https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Churchill,_Lord_Randolph_Henry_Spencer",
        "image": {
          "src": "/covers/ukraine-fedorov-defense-minister-rejects-role--a1.png",
          "alt": "Portrait of Lord Randolph Churchill, the brilliant reformer whose proud resignation ended his political career.",
          "credit": "Portrait of Lord Randolph Churchill, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "William Shakespeare, Coriolanus, Act III, Scene 3 — the banishment speech (c. 1608)",
        "excerpt": "You common cry of curs! whose breath I hate / As reek o' the rotten fens, whose loves I prize / As the dead carcasses of unburied men / That do corrupt my air, I banish you; / And here remain with your uncertainty! / Let every feeble rumour shake your hearts! / Your enemies, with nodding of their plumes, / Fan you into despair! Have the power still / To banish your defenders; till at length / Your ignorance, which finds not till it feels, / Making not reservation of yourselves, / Still your own foes, deliver you as most / Abated captives to some nation / That won you without blows! Despising, / For you, the city, thus I turn my back: / There is a world elsewhere.",
        "source": "William Shakespeare, The Tragedy of Coriolanus, III.iii (The Complete Works of Shakespeare, MIT)",
        "href": "http://shakespeare.mit.edu/coriolanus/coriolanus.3.3.html",
        "image": {
          "src": "/covers/ukraine-fedorov-defense-minister-rejects-role--a2.png",
          "alt": "Full-length portrait of the actor John Philip Kemble as a defiant, proud Coriolanus, hand raised in scornful address.",
          "credit": "Thomas Lawrence, 'John Philip Kemble as Coriolanus' (1798), via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "John Milton, Paradise Lost, Book I — Satan's resolve (1667)",
        "excerpt": "The mind is its own place, and in itself / Can make a Heaven of Hell, a Hell of Heaven. / What matter where, if I be still the same, / And what I should be, all but less than he / Whom thunder hath made greater? Here at least / We shall be free; th' Almighty hath not built / Here for his envy, will not drive us hence: / Here we may reign secure; and, in my choice, / To reign is worth ambition, though in Hell: / Better to reign in Hell than serve in Heaven.",
        "source": "John Milton, Paradise Lost, Book I, lines 254–263 (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/26/26-h/26-h.htm",
        "image": {
          "src": "/covers/ukraine-fedorov-defense-minister-rejects-role--a3.png",
          "alt": "William Blake's 'Satan Arousing the Rebel Angels', the fallen Satan rallying his host, illustrating Milton's 'better to reign in Hell than serve in Heaven.'",
          "credit": "William Blake, 'Satan Arousing the Rebel Angels' (1808), illustration to Milton's Paradise Lost, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Jacques-Louis David, Belisarius Begging for Alms (1781)",
        "excerpt": "David's great neoclassical canvas shows Belisarius, the general who conquered the Vandals and reconquered Italy for the Emperor Justinian, blinded and cast down, seated in rags and begging for alms as a passing soldier recognizes his former commander with horror. The severe geometry and grave dignity of the composition turn the fallen hero's disgrace into a silent indictment of ingratitude and power's caprice. It is the archetypal image of the great servant of the state discarded and refusing to disappear quietly into the crowd.",
        "source": "Jacques-Louis David, 'Belisarius Begging for Alms' (1781), oil on canvas, Palais des Beaux-Arts de Lille",
        "href": "https://en.wikipedia.org/wiki/Belisarius_Begging_for_Alms",
        "image": {
          "src": "/covers/ukraine-fedorov-defense-minister-rejects-role--a4.png",
          "alt": "Belisarius, blind and in rags, sits begging while a soldier recognizes the once-great general; a woman drops a coin into his helmet.",
          "credit": "Jacques-Louis David, 'Belisarius Begging for Alms' (1781), Palais des Beaux-Arts de Lille, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Ludwig van Beethoven, Coriolan Overture, Op. 62 (1807)",
        "excerpt": "Beethoven wrote this taut, tragic overture in C minor for Heinrich Joseph von Collin's tragedy Coriolan, portraying the same proud, unbending Roman commander who would rather be destroyed than submit. Hammering unison chords and a driving, defiant first theme depict Coriolanus's implacable will, while a pleading lyrical melody stands for the entreaties that fail to move him; at the close the music simply disintegrates, the great man's resolve collapsing into silence. It is a musical portrait of pride that will accept no compromise and no lesser part.",
        "source": "Ludwig van Beethoven, Coriolan Overture (Ouverture zu Collins Trauerspiel 'Coriolan'), Op. 62 (1807); scores at IMSLP",
        "href": "https://imslp.org/wiki/Coriolan,_Op.62_(Beethoven,_Ludwig_van)",
        "image": {
          "src": "/covers/ukraine-fedorov-defense-minister-rejects-role--a5.png",
          "alt": "Joseph Karl Stieler's 1820 portrait of Ludwig van Beethoven, composer of the Coriolan Overture.",
          "credit": "Joseph Karl Stieler, portrait of Ludwig van Beethoven (1820), via Wikimedia Commons"
        }
      }
    ],
    "rank": 4
  },
  {
    "slug": "ukraine-drones-wildberries-russia",
    "headline": "Ukrainian drones strike more Wildberries warehouses, hobbling Russia's largest online retailer",
    "overview": "Ukraine struck two more distribution centers of Wildberries, Russia's largest online retailer, in the southern Krasnodar and Stavropol regions, killing at least one person and injuring several, in a drone campaign that has hit five of the company's facilities since mid-July. Kyiv accuses Wildberries of helping supply the Russian military with drone parts and other equipment; analysts estimate the strikes have caused up to 100 billion rubles ($1.3 billion) in damage. Earlier strikes on warehouses near Moscow killed eight people.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMinwFBVV95cUxPMUJFSWFvTG9vQXNqVmZLWmxuQVN6aU9sa1F3MTZkeE8yZlBvU1lzQVJXZE5samhlQ3JKS2Zoa1pUMlVXNW5MQ3lsOXlOejNGbTFKaUJ6UVgwdU0ydHowaFhBOGszdnNSeU1ic0VEZkR6VmZHZzQ3aU5HbUZscEsxaTBwSXNIVFNOVTN0a09lbUItb2xFT0lTajZsb3FzUTg?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMi1gFBVV95cUxOcWJhZzRQbDFwWDZFZDh0bE5Lc2FwT0FmZHB5ZXNaaDEweDAxUDVSaW43TV9EUmEyY0FkVEY3TEhmdWk5V0NxZ1VtTWNyYU5jSEgtWUxyaWxtaExjbTVZQ2g2dVlYd1hSRGwxYURuTEJtV3JqRm5mYVJtQ19TTGRwSTVSOTI1bDRhOXpxN2F6dXJ4bDd6NVloamtJOUFMalRyN3M3aG44RUJ3SlI0QmNPd3lVYTJNekZLbWh4VDJfckhYUFV5Z000WlpCNDFuWWc0NW53U1J3?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-23",
    "image": {
      "src": "/covers/ukraine-drones-wildberries-russia.png",
      "alt": "A logistics warehouse ablaze at night after a drone strike",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 23 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Sherman's Special Field Orders No. 120, Georgia (November 9, 1864)",
        "excerpt": "The army will forage liberally on the country during the march. To this end, each brigade commander will organize a good and sufficient foraging party ... who will gather, near the route traveled, corn or forage of any kind, meat of any kind, vegetables, corn-meal, or whatever is needed by the command ... To army corps commanders alone is intrusted the power to destroy mills, houses, cotton-gins, &c., and for them this general principle is laid down: In districts and neighborhoods where the army is unmolested no destruction of such property should be permitted; but should guerrillas or bushwhackers molest our march ... then army commanders should order and enforce a devastation more or less relentless according to the measure of such hostility.",
        "source": "Maj. Gen. William T. Sherman, Special Field Orders No. 120, Military Division of the Mississippi, November 9, 1864 (transcription, Civil War Era NC, NC State University Libraries).",
        "href": "https://cwnc.omeka.chass.ncsu.edu/items/show/145",
        "image": {
          "src": "/covers/ukraine-drones-wildberries-russia--a0.png",
          "alt": "Engraving of Sherman's troops tearing up railroad track and burning stores and buildings during the March to the Sea.",
          "credit": "F. O. C. Darley (design) and Alexander Hay Ritchie (engraving), 'Sherman's March to the Sea,' c. 1868. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "Vercingetorix's scorched-earth counsel, Caesar's Gallic War, Book VII (52 BC)",
        "excerpt": "that forage could not be cut; that the enemy must necessarily disperse, and look for it in the houses, that all these might be daily destroyed by the horse ... that the villages and houses ought to be fired, over such an extent of country in every direction from Boia, as the Romans appeared capable of scouring in their search for forage.",
        "source": "Julius Caesar, The Gallic War (De Bello Gallico), Book VII, ch. 14, trans. W. A. McDevitte and W. S. Bohn; Internet Classics Archive.",
        "href": "https://classics.mit.edu/Caesar/gallic.7.7.html"
      },
      {
        "category": "literary",
        "title": "Samson burns the Philistines' standing corn, Judges 15:4-5 (King James Version, 1611)",
        "excerpt": "And Samson went and caught three hundred foxes, and took firebrands, and turned tail to tail, and put a firebrand in the midst between two tails. And when he had set the brands on fire, he let them go into the standing corn of the Philistines, and burnt up both the shocks, and also the standing corn, with the vineyards and olives.",
        "source": "The Holy Bible, Judges 15:4-5, Authorized (King James) Version, 1611; Wikisource.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Judges"
      },
      {
        "category": "literary",
        "title": "The burning of Moscow, Tolstoy's War and Peace, Book XI (1869)",
        "excerpt": "Moscow was burned because it found itself in a position in which any town built of wood was bound to burn, quite apart from whether it had, or had not, a hundred and thirty inferior fire engines.",
        "source": "Leo Tolstoy, War and Peace, Book XI, ch. 26, trans. Louise and Aylmer Maude.",
        "href": "https://www.marxists.org/archive/tolstoy/1869/war-and-peace/book-11-chapter-26.html"
      },
      {
        "category": "artistic",
        "title": "Viktor Mazurovsky, 'The Fire of Moscow, 1812' (depicting the 1812 conflagration)",
        "excerpt": "Mazurovsky's canvas engulfs Moscow in a wall of fire, its towers and the domes of Saint Basil's silhouetted against a churning orange sky. Grande Armee troops and fleeing figures are dwarfed by the inferno, staging the deliberate destruction of a captured city's stores and shelter as an act of war that denies the enemy any spoils.",
        "source": "Viktor Mazurovsky (1859-1944), 'The Fire of Moscow (1812)' / 'Moskovsky pozhar (1812).' Public domain, via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Fireofmoscow.jpg",
        "image": {
          "src": "/covers/ukraine-drones-wildberries-russia--a4.png",
          "alt": "Painting of Moscow ablaze in 1812, flames and smoke rising over the city as small figures flee in the foreground.",
          "credit": "Viktor Mazurovsky, 'The Fire of Moscow (1812).' Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Tchaikovsky, 1812 Overture (Overture solennelle), Op. 49 (composed 1880)",
        "excerpt": "Tchaikovsky's festival overture dramatizes Napoleon's 1812 invasion and repulse: the French 'Marseillaise' surges and is finally overwhelmed by Russian hymn and folk themes, cannon fire, and pealing bells. The music turns the burning and abandonment of Moscow and the enemy's ruinous retreat into a roaring emblem of a war carried home to the invader.",
        "source": "Pyotr Ilyich Tchaikovsky, 1812 Overture (Overture solennelle 'l'annee 1812'), Op. 49, 1880; scores at IMSLP / Petrucci Music Library.",
        "href": "https://imslp.org/wiki/1812_Overture,_Op.49_(Tchaikovsky,_Pyotr)"
      }
    ],
    "rank": 5
  },
  {
    "slug": "us-jobless-claims-1969-low",
    "headline": "US weekly jobless claims fall to 187,000, the fewest since 1969",
    "overview": "US filings for unemployment benefits dropped to 187,000 last week, the lowest level since 1969, the Labor Department said Thursday, underscoring an unusually resilient labor market even as other parts of the economy show strain. The decline defied forecasts of a modest rise and marked the fewest initial claims in more than half a century. Employers have been reluctant to lay off workers despite higher borrowing costs and tariff uncertainty.",
    "genre": "Economy",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMirwFBVV95cUxOcHJXNWRHeWp6RkEzRDhsM283eGhMSGw1ckNwaHVGbllRaDBNMm9WWjZwVHU1VFNPemVBT0Zycmw2WWprS2pvTGw1RjBtUzc0N0hJa3JPNXpOU09RRjdKQzhvay0tdDdad1NKM0o4SkVhaVhjZXdzdlFGdXZJcGVKajJreXhPOGEzeXUwTW9wdDg5bVFwdXpDcDJ6ZWVMcVRPcWR2UGM3bTZhVEhhdUtV?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMimgFBVV95cUxQaDVZUF9PZTBpQ1NWcl9oY3hCNTVKTmMzLWoyNnE3VzlXQUZRa1NfX1Rpc2Y5dDU3Z0FDbjlPRVBYdTJwRHFKSFBEUjVETDZmdXhqQ2QxZVFadXJaRkpCNkxSTmF0bkRkNzUxS2xjYmZkdU5NdTFkaGtJVkR2a3BOQV84dE5TTkxxTXR2d1JIa0YyMGpIZXE1Y3lR?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-23",
    "image": {
      "src": "/covers/us-jobless-claims-1969-low.png",
      "alt": "The Frances Perkins Building, headquarters of the US Department of Labor in Washington",
      "credit": "Frances Perkins Building, US Department of Labor, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 23 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Franklin D. Roosevelt, Second Inaugural Address, January 20, 1937",
        "excerpt": "I see millions of families trying to live on incomes so meager that the pall of family disaster hangs over them day by day. I see millions whose daily lives in city and on farm continue under conditions labeled indecent by a so-called polite society half a century ago. I see millions denied education, recreation, and the opportunity to better their lot and the lot of their children. I see millions lacking the means to buy the products of farm and factory and by their poverty denying work and productiveness to many other millions. I see one-third of a nation ill-housed, ill-clad, ill-nourished.",
        "source": "Franklin D. Roosevelt, Second Inaugural Address, delivered January 20, 1937 (Wikisource).",
        "href": "https://en.wikisource.org/wiki/Franklin_Roosevelt%27s_Second_Inaugural_Address",
        "image": {
          "src": "/covers/us-jobless-claims-1969-low--a0.png",
          "alt": "A long line of jobless men in overcoats and hats queued on a Chicago sidewalk outside a Depression-era soup kitchen, February 1931.",
          "credit": "U.S. National Archives and Records Administration (NARA 541927), February 1931. Public domain."
        }
      },
      {
        "category": "historical",
        "title": "Juvenal, Satire X (“bread and circuses”), c. 100–127 AD",
        "excerpt": "Long ago they have thrown overboard all anxiety. For that sovereign people that once gave away military command, consulships, legions, and every thing, now bridles its desires, and limits its anxious longings to two things only—bread, and the games of the circus!",
        "source": "Juvenal, Satire X, lines 78–81 (“panem et circenses”), translated by Lewis Evans (London: Henry G. Bohn, 1852).",
        "href": "https://pages.pomona.edu/~cmc24747/sources/juvenal/juv_10.htm"
      },
      {
        "category": "literary",
        "title": "Thomas Carlyle, Past and Present, Book III, Ch. XI “Labour” (1843)",
        "excerpt": "For there is a perennial nobleness, and even sacredness, in Work. Were he never so benighted, forgetful of his high calling, there is always hope in a man that actually and earnestly works: in Idleness alone is there perpetual despair. […] Blessed is he who has found his work; let him ask no other blessedness. He has a work, a Life-purpose; he has found it, and will follow it!",
        "source": "Thomas Carlyle, Past and Present (1843), Book III, Chapter XI, “Labour.”",
        "href": "http://www.historyhome.co.uk/readings/carlyle/3-11.htm"
      },
      {
        "category": "literary",
        "title": "John Steinbeck, The Grapes of Wrath (1939)",
        "excerpt": "Steinbeck's novel follows the Joad family, tenant farmers driven off their Oklahoma land by drought and foreclosure and westward to California, where thousands of displaced workers converge on a handful of jobs and wages collapse under the sheer weight of the desperate unemployed. In its pages a job is survival itself, and its absence is a slow erosion of dignity, as men who want nothing more than honest labor are turned away at every gate. The book's fury is aimed at an economy that lets fruit rot while families starve—treating human work as worthless at precisely the moment workers need it most.",
        "source": "John Steinbeck, The Grapes of Wrath (New York: The Viking Press, 1939). Text in copyright; described, not quoted.",
        "href": "https://en.wikipedia.org/wiki/The_Grapes_of_Wrath",
        "image": {
          "src": "/covers/us-jobless-claims-1969-low--a3.png",
          "alt": "A towering wall of dust rolls toward buildings on the flat plains near Stratford, Texas, during a Dust Bowl storm, 1935.",
          "credit": "Photograph by George E. Marsh, NOAA George E. Marsh Album, April 18, 1935. Public domain."
        }
      },
      {
        "category": "artistic",
        "title": "Dorothea Lange, “Migrant Mother,” Nipomo, California (1936)",
        "excerpt": "Lange's photograph of Florence Owens Thompson, a thirty-two-year-old pea-picker cradling her children in a California migrant camp, became the enduring face of Depression-era unemployment and want. Made for the Farm Security Administration, it distilled a nation of displaced, jobless laborers into a single weathered, anxious gaze. The image made visible both the precarity of work stripped away and the stubborn dignity of those who endured its loss.",
        "source": "Dorothea Lange, “Destitute pea pickers in California. Mother of seven children. Age thirty-two. Nipomo, California” (Migrant Mother), Farm Security Administration, March 1936; Library of Congress.",
        "href": "https://commons.wikimedia.org/wiki/File:Lange-MigrantMother02.jpg",
        "image": {
          "src": "/covers/us-jobless-claims-1969-low--a4.png",
          "alt": "Florence Owens Thompson, a careworn migrant mother, gazes into the distance with two children turned away against her shoulders and a baby in her lap, California, 1936.",
          "credit": "Dorothea Lange, Farm Security Administration, March 1936. U.S. Library of Congress; public domain."
        }
      },
      {
        "category": "artistic",
        "title": "Ford Madox Brown, “Work” (1852–1865)",
        "excerpt": "Brown's crowded Victorian panorama sets muscular navvies digging a Hampstead road at its blazing center, surrounded by a whole social order defined by its relation to labor—idle gentry, a ragged flower-seller, ragged children, and, at the margins, the “brainworkers” Thomas Carlyle and F. D. Maurice who preach the gospel of work. The painting is a deliberate hymn to physical toil as the moral engine of society, and a pointed meditation on those cast outside it. Every figure is placed to ask who works, who cannot, and who merely watches.",
        "source": "Ford Madox Brown, Work, oil on canvas, 1852–1865; Manchester Art Gallery.",
        "href": "https://commons.wikimedia.org/wiki/File:Ford_Madox_Brown_-_Work_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/us-jobless-claims-1969-low--a5.png",
          "alt": "A sunlit Victorian street scene crowded with laborers digging a roadway at the center, surrounded by figures from every social class, in Ford Madox Brown's painting Work.",
          "credit": "Ford Madox Brown, Work (1852–1865), Manchester Art Gallery, via Google Art Project / Wikimedia Commons. Public domain."
        }
      }
    ],
    "rank": 6
  },
  {
    "slug": "ibm-acquires-hrl-quantum",
    "headline": "IBM to acquire HRL Laboratories from Boeing and GM to boost quantum computing",
    "overview": "IBM said Thursday it has agreed to acquire HRL Laboratories, the research institution jointly owned by Boeing and General Motors, to gain HRL's silicon-spin qubit expertise for its quantum computing roadmap. IBM did not disclose a purchase price; Boeing and GM will continue partnering with IBM on quantum applications and advanced technology. The deal, part of a shift to a two-track quantum strategy, is expected to close by the end of the third quarter of 2026.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMizwFBVV95cUxNTEZOTUgtTjhhUDR0UGdnb28wZW5LX1dpLXZzTGg0dlVqam1zcUg4ZEhqeUtkNjFteXUyOGx3NGNua1lHSXhxcnI0ZXB5N1NOZlJIbWVkRGlHVW4tVVRuYy02aE12cS1IU09oN1RGYWdjT0tNaHJjMTdIbDI3TFoxUjB0LU9sVWV0WmRLaWM4cFZoeENSbmhsTnh0d0cxNElxdG5rMVVmbFRlT2NyQjN0QlFXQ1FzalFFV19SazZRZmdQT1JSNkczVkxNbzJBbEk?oc=5"
      },
      {
        "name": "IBM Newsroom",
        "href": "https://newsroom.ibm.com/2026-07-23-ibm-to-acquire-hrl-laboratories-to-power-the-future-of-quantum"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-23",
    "image": {
      "src": "/covers/ibm-acquires-hrl-quantum.png",
      "alt": "An IBM Quantum System One computer inside its glass enclosure",
      "credit": "IBM Quantum System One, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 23 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Michael Faraday demonstrates electromagnetic induction — obtaining electricity from ordinary magnetism (First Series, read 24 November 1831)",
        "excerpt": "The power which electricity of tension possesses of causing an opposite electrical state in its vicinity has been expressed by the general term Induction... These considerations, with their consequence, the hope of obtaining electricity from ordinary magnetism, have stimulated me at various times to investigate experimentally the inductive effect of electric currents.... The various experiments of this section prove, I think, most completely the production of electricity from ordinary magnetism.",
        "source": "Michael Faraday, \"Experimental Researches in Electricity,\" First Series (read 24 November 1831), Philosophical Transactions of the Royal Society; reprinted Vol. 1 (Project Gutenberg).",
        "href": "https://www.gutenberg.org/files/14986/14986-h/14986-h.htm"
      },
      {
        "category": "historical",
        "title": "The first transistor is built at Bell Telephone Laboratories (16 December 1947)",
        "excerpt": "In December 1947, at Bell Telephone Laboratories, physicists John Bardeen and Walter Brattain pressed two closely spaced gold contacts against a sliver of germanium and watched a tiny electrical signal amplify — the first working point-contact transistor. Within weeks William Shockley devised the more robust junction transistor, and the three would share the 1956 Nobel Prize in Physics. This corporate-laboratory breakthrough replaced the fragile vacuum tube and became the semiconductor switch on which all modern computing — and now the silicon-based qubit — is built.",
        "source": "PBS, \"Transistorized!\" — on the invention of the transistor at Bell Labs, December 1947.",
        "href": "https://www.pbs.org/transistor/album1/",
        "image": {
          "src": "/covers/ibm-acquires-hrl-quantum--a1.png",
          "alt": "A replica of the first point-contact transistor built at Bell Labs in 1947, showing gold foil contacts on a triangular wedge above a germanium crystal.",
          "credit": "Replica of the first (point-contact) transistor, Bell Labs, 1947; via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Mary Shelley, Frankenstein; or, The Modern Prometheus — Victor discovers the cause of life (1818, Chapter 4)",
        "excerpt": "After days and nights of incredible labour and fatigue, I succeeded in discovering the cause of generation and life; nay, more, I became myself capable of bestowing animation upon lifeless matter. The sun does not more certainly shine in the heavens, than that which I now affirm is true.",
        "source": "Mary Shelley, Frankenstein; or, The Modern Prometheus (1818), Chapter 4 (Project Gutenberg).",
        "href": "https://www.gutenberg.org/files/42324/42324-h/42324-h.htm"
      },
      {
        "category": "literary",
        "title": "Francis Bacon, New Atlantis — the Father of Salomon's House on the end of the great research foundation (1627)",
        "excerpt": "The end of our foundation is the knowledge of causes, and secret motions of things; and the enlarging of the bounds of human empire, to the effecting of all things possible.",
        "source": "Francis Bacon, The New Atlantis (1627), speech of the Father of Salomon's House (Project Gutenberg).",
        "href": "https://www.gutenberg.org/files/2434/2434-h/2434-h.htm"
      },
      {
        "category": "artistic",
        "title": "Joseph Wright of Derby, \"An Experiment on a Bird in the Air Pump\" (1768)",
        "excerpt": "In candlelit darkness a travelling natural philosopher demonstrates a vacuum pump, drawing the air from a glass globe until a white cockatoo begins to suffocate as his audience reacts with wonder, curiosity and dread. A young girl turns away in tears while others lean in, transfixed by the new experimental science and the power it grants over life itself. Wright's great canvas captures the Enlightenment instant in which knowledge of nature's hidden forces becomes at once a marvel and a moral reckoning.",
        "source": "Joseph Wright of Derby, \"An Experiment on a Bird in the Air Pump,\" 1768, oil on canvas, National Gallery, London.",
        "href": "https://commons.wikimedia.org/wiki/File:An_Experiment_on_a_Bird_in_an_Air_Pump_by_Joseph_Wright_of_Derby,_1768.jpg",
        "image": {
          "src": "/covers/ibm-acquires-hrl-quantum--a4.png",
          "alt": "Oil painting of a natural philosopher demonstrating an air pump by candlelight; a white bird gasps inside a glass globe as a mixed audience watches with awe, dread and grief.",
          "credit": "Joseph Wright of Derby, \"An Experiment on a Bird in the Air Pump\" (1768), National Gallery, London; public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Alexander Scriabin, \"Prometheus: The Poem of Fire,\" Op. 60 (1910)",
        "excerpt": "Scriabin's tone poem retells the myth of Prometheus — who stole fire from the gods to give to humankind — as a mounting surge of orchestral color built upon his unresolved \"mystic chord.\" The score famously calls for a clavier à lumières, a keyboard of colored light meant to flood the hall as the music plays, fusing a new sound with a new technology. It stages the ecstasy, and the hubris, of seizing a strange creative power once reserved for the gods.",
        "source": "Alexander Scriabin, \"Prometheus: The Poem of Fire,\" Op. 60 (1910), full score (IMSLP / Petrucci Music Library).",
        "href": "https://imslp.org/wiki/Prometheus,_Le_Po%C3%A8me_du_Feu,_Op.60_(Scriabin,_Aleksandr)",
        "image": {
          "src": "/covers/ibm-acquires-hrl-quantum--a5.png",
          "alt": "Portrait photograph of the Russian composer Alexander Scriabin.",
          "credit": "Portrait photograph of Alexander Scriabin; public domain via Wikimedia Commons."
        }
      }
    ],
    "rank": 7
  },
  {
    "slug": "saudi-pif-ea-eu-merger-approval",
    "headline": "EU clears Saudi PIF's $55 billion buyout of Electronic Arts",
    "overview": "The European Commission approved the $55 billion acquisition of video-game maker Electronic Arts by Saudi Arabia's Public Investment Fund, Jared Kushner's Affinity Partners and private-equity firm Silver Lake, saying the deal raised no competition concerns. Announced last September, it is the largest leveraged buyout in history, with EA shareholders due to receive $210 a share. The Commission is still reviewing the takeover under its Foreign Subsidies Regulation, and completion is expected in the first quarter of 2027.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiswFBVV95cUxPV0N3bTlaODRZX0FaRzl0UzhlckVHYzJQQkFXLTBKdnRVYjRYWmhRRGs3Z1RWQWVPMWUtV3J6NUhzUnJSdU9pTWdHRGJoN3pidkQ1a2lZTTBkY3BLLVRIcXZ1dV9fbEFRdjdldXdtMkhaRVZncWdfYmZkQU5lV1R5aWw4MUZ4NjhLNHY2TWotcTZNRzBuX083LW9pZHFvcnNpcWN5ZDVJbVEwdTlNQzhPOHdCRQ?oc=5"
      },
      {
        "name": "Seeking Alpha",
        "href": "https://seekingalpha.com/news/4617241-electronic-arts-buyout-by-saudi-arabias-pif-is-cleared-by-european-regulators"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-23",
    "image": {
      "src": "/covers/saudi-pif-ea-eu-merger-approval.png",
      "alt": "The Electronic Arts headquarters campus in Redwood City, California",
      "credit": "Electronic Arts headquarters, Redwood City, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 23 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Louisiana Purchase Treaty, signed at Paris, 30 April 1803",
        "excerpt": "And whereas in pursuance of the Treaty and particularly of the third article the French Republic has an incontestible title to the domain and to the possession of the said Territory--The First Consul of the French Republic desiring to give to the United States a strong proof of his friendship doth hereby cede to the United States in the name of the French Republic for ever and in full Sovereignty the said territory with all its rights and appurtenances as fully and in the Same manner as they have been acquired by the French Republic in virtue of the above mentioned Treaty concluded with his Catholic Majesty. ... In the cession made by the preceeding article are included the adjacent Islands belonging to Louisiana all public lots and Squares, vacant lands and all public buildings, fortifications, barracks and other edifices which are not private property.",
        "source": "Treaty Between the United States and the French Republic (the Louisiana Purchase), Articles I and II, Paris, 30 April 1803. Avalon Project, Yale Law School.",
        "href": "https://avalon.law.yale.edu/19th_century/louis1.asp",
        "image": {
          "src": "/covers/saudi-pif-ea-eu-merger-approval--a0.png",
          "alt": "A page of the manuscript 1803 Louisiana Purchase Treaty in period handwriting.",
          "credit": "Louisiana Purchase Treaty, page 2 (1803), U.S. National Archives, via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "historical",
        "title": "King James I's Letters Patent creating 'the King's Men', 19 May 1603",
        "excerpt": "Knowe yee that Wee of our Speciall grace certein knowledge & mere motion haue licenced and aucthorized and by theise presentes doe licence and aucthorize theise our Servauntes lawrence ffletcher William Shakespeare Richard Burbage Augustyne Phillippes John Heninges Henrie Condell William Sly Robert Armyn Richard Cowly and the rest of theire Assosiates freely to vse and exercise the Arte and faculty of playinge Comedies Tragedies Histories Enterludes Moralls Pastoralles Stageplaies ... when the infection of the plague shall decrease aswell within theire nowe vsual howse called the Globe within our County of Surrey, as alsoe within anie towne halls or moute halls or other conveniente places within the liberties and freedome of anie other Cittie vniversitie towne or Boroughe whatsoever within our said Realmes and domynions.",
        "source": "Letters patent of James I taking Shakespeare's company under royal patronage as the King's Men, enrolled 19 May 1603. Transcription via Shakespeare Documented, Folger Shakespeare Library.",
        "href": "https://shakespearedocumented.folger.edu/resource/document/enrollment-letters-patent-issued-under-signet-and-privy-seals-authorizing-kings",
        "image": {
          "src": "/covers/saudi-pif-ea-eu-merger-approval--a1.png",
          "alt": "Portrait of King James I of England seated in state robes, holding the orb, by Daniel Mytens, 1621.",
          "credit": "Daniel Mytens, King James I of England (1621), National Portrait Gallery, London, via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "literary",
        "title": "Shakespeare, 'Timon of Athens', Act IV, Scene 3 (First Folio, 1623)",
        "excerpt": "Gold? Yellow, glittering, precious Gold?\nNo Gods, I am no idle Votarist,\nRoots you cleere Heauens. Thus much of this will make\nBlacke, white; fowle, faire; wrong, right;\nBase, Noble; Old, young; Coward, valiant.\nHa you Gods! why this? what this, you Gods? why this\nWill lugge your Priests and Seruants from your sides:\nPlucke stout mens pillowes from below their heads.\nThis yellow Slaue,\nWill knit and breake Religions, blesse th' accurst,\nMake the hoare Leprosie ador'd, place Theeues,\nAnd giue them Title, knee, and approbation\nWith Senators on the Bench: This is it\nThat makes the wappen'd Widdow wed againe;\nShee, whom the Spittle-house, and vlcerous sores,\nWould cast the gorge at.",
        "source": "William Shakespeare, The Life of Timon of Athens, Act IV, Scene 3 (First Folio text). Project Gutenberg, ebook #1132.",
        "href": "https://www.gutenberg.org/cache/epub/1132/pg1132.txt",
        "image": {
          "src": "/covers/saudi-pif-ea-eu-merger-approval--a2.png",
          "alt": "Caravaggio's painting The Cardsharps: a richly dressed young man at cards is cheated by two sharpers, one signalling behind his back.",
          "credit": "Caravaggio, The Cardsharps (c. 1594), Kimbell Art Museum, via Wikimedia Commons / Google Art Project (public domain)."
        }
      },
      {
        "category": "literary",
        "title": "Ben Jonson, 'Volpone; or, The Fox', Act I, Scene 1 (1607)",
        "excerpt": "Good morning to the day; and next, my gold:\nOpen the shrine, that I may see my Saint.\n... Hail the world's soul, and mine! more glad than is\nThe teeming earth to see the long'd-for sun\nPeep through the horns of the celestial Ram,\nAm I, to view thy splendour darkening his ...\nDear saint,\nRiches, the dumb God, that giv'st all men tongues;\nThat canst do nought, and yet mak'st men do all things;\nThe price of souls; even hell, with thee to boot,\nIs made worth heaven. Thou art virtue, fame,\nHonour, and all things else. Who can get thee,\nHe shall be noble, valiant, honest, wise.",
        "source": "Ben Jonson, Volpone; or, The Fox, Act I, Scene 1. Project Gutenberg, ebook #4039.",
        "href": "https://www.gutenberg.org/cache/epub/4039/pg4039.txt",
        "image": {
          "src": "/covers/saudi-pif-ea-eu-merger-approval--a3.png",
          "alt": "Engraved title page of Ben Jonson's Volpone, or The Fox.",
          "credit": "Title page, Ben Jonson's Volpone, via Library of Congress / Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "artistic",
        "title": "Caravaggio, 'The Cardsharps' (I Bari), c. 1594",
        "excerpt": "A naive, finely dressed youth studies his hand while two confederates fleece him: an older cheat peers over his cards and signals with gloved, split-fingered hands, as his young accomplice palms a hidden card from behind his belt. Caravaggio turns a card table into a parable of money, appetite and deception, the drama pushed close to the picture plane so the viewer becomes complicit in the trick. Painted for and prized by Cardinal Francesco Maria del Monte, it is an early masterpiece of gold, chance and play changing hands.",
        "source": "Michelangelo Merisi da Caravaggio, The Cardsharps (I Bari), c. 1594, oil on canvas, Kimbell Art Museum, Fort Worth.",
        "href": "https://commons.wikimedia.org/wiki/File:Caravaggio_(Michelangelo_Merisi)_-_The_Cardsharps_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/saudi-pif-ea-eu-merger-approval--a4.png",
          "alt": "Caravaggio's painting The Cardsharps: a richly dressed young man at cards is cheated by two sharpers, one signalling behind his back.",
          "credit": "Caravaggio, The Cardsharps (c. 1594), Kimbell Art Museum, via Wikimedia Commons / Google Art Project (public domain)."
        }
      },
      {
        "category": "artistic",
        "title": "Bronzino, 'Cosimo I de' Medici in Armour', c. 1545",
        "excerpt": "Bronzino presents the first Grand Duke of Tuscany encased in gleaming, damascened steel, his face cool and impassive, the very image of Medici wealth translated into dynastic power. The Medici bank fortune here underwrites a state and a golden age of patronage; the polished armour and controlled, courtly finish make dominion look effortless and hereditary. The composition was so prized that Bronzino's workshop produced numerous versions to be sent as instruments of Medici prestige and diplomacy.",
        "source": "Agnolo Bronzino, Cosimo I de' Medici in Armour, c. 1545, oil on panel, Art Gallery of New South Wales, Sydney.",
        "href": "https://commons.wikimedia.org/wiki/File:Agnolo_Bronzino_-_Cosimo_I_de%27_Medici_in_armour_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/saudi-pif-ea-eu-merger-approval--a5.png",
          "alt": "Bronzino's portrait of Cosimo I de' Medici in polished damascened armour against a dark ground.",
          "credit": "Agnolo Bronzino, Cosimo I de' Medici in Armour (c. 1545), Art Gallery of New South Wales, via Wikimedia Commons / Google Art Project (public domain)."
        }
      }
    ],
    "rank": 8
  },
  {
    "slug": "boelter-life-sentence-hortman-killing",
    "headline": "Vance Boelter sentenced to two life terms for assassinating Minnesota lawmaker Melissa Hortman",
    "overview": "Vance Boelter, 59, was sentenced Thursday in federal court to two life terms plus 40 years for assassinating Minnesota House Speaker Melissa Hortman and her husband Mark and for wounding state Sen. John Hoffman and his wife Yvette in June 2025. Boelter, who stalked his targets and posed as a police officer to reach their homes at night, pleaded guilty in June under a deal that spared him the death penalty. Hortman's family described their trauma and loss in court.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMitAFBVV95cUxQaUFYdmJXS2pRYTI3aVRXM1ktWWlpaWpqb01UZlUtcDV4ZTdaampkUlFQNnhBaVBvamRZLUstSmFLcXRDOU5SZl83b181SlBjcDBRTnI1UmtTVE9sdWozUkhIbmtLTDAxSTUzNFRNSGFOdTVBbExrYUk5UXRWYUZjOWxJLTFTUU5CaVZwS0p0bnBHWFdSbmpacGp3RFFpdVlwQk83VUZhVU9IX0k3OEZHdWxuTE4?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiugFBVV95cUxPZGczOS1PRTNMM25DUWU4NEowYmRBUTR3dUJNekRNbUdOaUkyQkV4Q1NST3lIT2l4MHU3eEVwMFNVOVoyRExzQXpwZzdlLW9QdzZ6MzJINng4UGZDdHdtaVAwNXVjdWp2MDU1UDNQbHBpeUYtbnVfMER3aWpxYmdGS0FpVkJOeGRTNVFiemVFNjdZT0p3YWxTZlQ3bGs5VXR3ZTVDR1lTX1o2VGxQbTFHZV9EcmxBeUJIb2c?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-23",
    "image": {
      "src": "/covers/boelter-life-sentence-hortman-killing.png",
      "alt": "Minnesota House Speaker Melissa Hortman, who was assassinated in June 2025",
      "credit": "Melissa Hortman, 2020 (official portrait), via Wikimedia Commons"
    },
    "edition": "Evening Edition · 23 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Suetonius on the Assassination of Julius Caesar (Divus Julius, ch. 82), 44 BC",
        "excerpt": "When he had taken his seat, the conspirators stood round him, under colour of paying their compliments; and immediately Tullius Cimber, who had engaged to commence the assault, advancing nearer than the rest, as if he had some favour to request, Caesar made signs that he should defer his petition to some other time. Tullius immediately seized him by the toga, on both shoulders; at which Caesar crying out, \"Violence is meant!\" one of the Cassii wounded him a little below the throat. Caesar seized him by the arm, and ran it through with his style; and endeavouring to rush forward was stopped by another wound. Finding himself now attacked on all hands with naked poniards, he wrapped the toga about his head, and at the same moment drew the skirt round his legs with his left hand, that he might fall more decently with the lower part of his body covered. He was stabbed with three and twenty wounds, uttering a groan only, but no cry, at the first wound; although some authors relate, that when Marcus Brutus fell upon him, he exclaimed, \"What! art thou, too, one of them? Thou, my son!\"",
        "source": "Suetonius, The Lives of the Twelve Caesars, \"Julius Caesar,\" ch. 82, trans. Alexander Thomson, rev. T. Forester (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/6400/pg6400.txt",
        "image": {
          "src": "/covers/boelter-life-sentence-hortman-killing--a0.png",
          "alt": "Vincenzo Camuccini's history painting of the assassination of Julius Caesar, the dictator swarmed by dagger-wielding senators in the Roman Senate",
          "credit": "Vincenzo Camuccini, La morte di Cesare (c. 1804–1805); Galleria Nazionale d'Arte Moderna, Rome. Public domain via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "Walt Whitman, \"Death of Abraham Lincoln\" — Booth's leap at Ford's Theatre, April 14, 1865",
        "excerpt": "and then, through the ornamented, draperied, starr'd and striped space-way of the President's box, a sudden figure, a man, raises himself with hands and feet, stands a moment on the railing, leaps below to the stage... and so the figure, Booth, the murderer, dress'd in plain black broadcloth, bare-headed, with full, glossy, raven hair, and his eyes like some mad animal's flashing with light and resolution, yet with a certain strange calmness, holds aloft in one hand a large knife—walks along not much back from the footlights—turns fully toward the audience his face of statuesque beauty, lit by those basilisk eyes, flashing with desperation, perhaps insanity—launches out in a firm and steady voice the words Sic semper tyrannis—and then walks with neither slow nor very rapid pace diagonally across to the back of the stage, and disappears.",
        "source": "Walt Whitman, \"Death of Abraham Lincoln\" (lecture), in The Complete Prose Works of Walt Whitman (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/8813/pg8813.txt",
        "image": {
          "src": "/covers/boelter-life-sentence-hortman-killing--a1.png",
          "alt": "Currier and Ives lithograph of the assassination of President Lincoln, John Wilkes Booth firing into the President's box at Ford's Theatre",
          "credit": "Currier & Ives, The Assassination of President Lincoln (1865). Public domain via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Shakespeare, Julius Caesar, Act III, Scene 2 — Mark Antony's funeral oration (1599)",
        "excerpt": "Friends, Romans, countrymen, lend me your ears;\nI come to bury Caesar, not to praise him.\nThe evil that men do lives after them,\nThe good is oft interred with their bones;\nSo let it be with Caesar. The noble Brutus\nHath told you Caesar was ambitious.\nIf it were so, it was a grievous fault,\nAnd grievously hath Caesar answer'd it.\nHere, under leave of Brutus and the rest,\nFor Brutus is an honourable man,\nSo are they all, all honourable men,\nCome I to speak in Caesar's funeral.\nHe was my friend, faithful and just to me;\nBut Brutus says he was ambitious,\nAnd Brutus is an honourable man.",
        "source": "William Shakespeare, Julius Caesar, Act III, Scene ii (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/1522/pg1522.txt",
        "image": {
          "src": "/covers/boelter-life-sentence-hortman-killing--a2.png",
          "alt": "Painting of Mark Antony delivering his funeral oration over the body of Caesar, rousing the Roman crowd",
          "credit": "George Edward Robertson, Marc Antony's Oration at Caesar's Funeral. Public domain via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Aeschylus, Agamemnon — Clytemnestra proclaims the killing of the king (458 BC)",
        "excerpt": "All is avowed, and as I smote I stand\nWith foot set firm upon a finished thing!\nI turn not to denial: thus I wrought\nSo that he could nor flee nor ward his doom,\nEven as the trammel hems the scaly shoal,\nI trapped him with inextricable toils,\nThe ill abundance of a baffling robe;\nThen smote him, once, again—and at each wound\nHe cried aloud, then as in death relaxed\nEach limb and sank to earth; and as he lay,\nOnce more I smote him, with the last third blow,\nSacred to Hades, saviour of the dead.",
        "source": "Aeschylus, Agamemnon, trans. E. D. A. Morshead, in The House of Atreus (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/8604/pg8604.txt",
        "image": {
          "src": "/covers/boelter-life-sentence-hortman-killing--a3.png",
          "alt": "Pierre-Narcisse Guérin's painting of Clytemnestra hesitating, dagger in hand, before striking the sleeping Agamemnon",
          "credit": "Pierre-Narcisse Guérin, Clytemnestra and Agamemnon (1817); Louvre. Public domain via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Jean-Léon Gérôme, The Death of Caesar (1867)",
        "excerpt": "In the aftermath of the Ides of March, Gérôme paints the murdered dictator sprawled alone in the foreground beside his toppled curule chair, his white toga crumpled on the marble floor of Pompey's portico. To the right the conspirators surge away in a jubilant knot, daggers and swords raised aloft, one brandishing a cap of liberty—already receding from the body they have made. The vast, near-empty hall leaves the solitary corpse as the still, terrible center of the scene.",
        "source": "Jean-Léon Gérôme, The Death of Caesar, oil on canvas, 1867; The Walters Art Museum, Baltimore (37.884)",
        "href": "https://commons.wikimedia.org/wiki/File:Jean-L%C3%A9on_G%C3%A9r%C3%B4me_-_The_Death_of_Caesar_-_Walters_37884.jpg",
        "image": {
          "src": "/covers/boelter-life-sentence-hortman-killing--a4.png",
          "alt": "Jean-Léon Gérôme's painting The Death of Caesar: Caesar's body lies alone in the foreground as the conspirators exit with daggers raised",
          "credit": "Jean-Léon Gérôme, The Death of Caesar (1867); The Walters Art Museum, Baltimore. Public domain via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "George Frideric Handel, \"Dead March\" from Saul, HWV 53 (1738)",
        "excerpt": "Handel's grave march for winds, brass and drums—the funeral music for the fallen King Saul and his son Jonathan in the 1738 oratorio—became the standard dirge of the English-speaking world's public mourning. Its slow, tolling tread accompanied the state obsequies of the Duke of Wellington and, across the Atlantic, the funeral processions of Abraham Lincoln, sounding a nation's grief for a stricken leader.",
        "source": "George Frideric Handel, Saul, HWV 53, Act III, \"Dead March\" (1738); score via IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Saul,_HWV_53_(Handel,_George_Frideric)",
        "image": {
          "src": "/covers/boelter-life-sentence-hortman-killing--a5.png",
          "alt": "Balthasar Denner's portrait of the composer George Frideric Handel",
          "credit": "Balthasar Denner, portrait of George Frideric Handel (c. 1726–1728); National Portrait Gallery, London. Public domain via Wikimedia Commons"
        }
      }
    ],
    "rank": 9
  },
  {
    "slug": "screwworm-gmo-flies-panama-tests",
    "headline": "US-funded scientists begin first outdoor tests of genetically modified screwworm flies in Panama",
    "overview": "At a US-funded facility in Panama, scientists are launching the first outdoor tests of genetically modified screwworm flies engineered to produce only males, a step toward a stronger weapon against the flesh-eating parasite that infested Texas livestock in June for the first time in decades. Sterilized male flies mate with wild females, which then lay unfertilized eggs, driving the population down. Researchers will first confine the flies in mesh cages to measure how long they survive Panama's heat and humidity.",
    "genre": "Science",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiyAFBVV95cUxNQ3pGWUI5aEo1ejZTWGlBaWpkRXZ5ZEJzdUZuWHQ2RVNfaDNaNkVjS1V3OGx1dTRiWS1BSWp0VUtjWnRybmE5MHUwSTNwTnpjbU4zZmMzZnVwVXlteHo2UjdNZ3FhLUtGZ0g1cmdLQnVCZjlrSmdIWGcxNVA3QkZRWUNYSEFrSTdfRldnTXVmS29yM0NBSmhWekJ5WjVlWEpYdFYtRk0wMGdYVjhCNXNCZUdXd3pIWXhycGdrZkdfdXVSV2NhNVpOZw?oc=5"
      },
      {
        "name": "NewsNation",
        "href": "https://www.newsnationnow.com/health/usda-sterile-fly-mexico-screwworm/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-23",
    "image": {
      "src": "/covers/screwworm-gmo-flies-panama-tests.png",
      "alt": "An adult New World screwworm fly, Cochliomyia hominivorax",
      "credit": "Adult screwworm fly (Cochliomyia hominivorax), via Wikimedia Commons"
    },
    "edition": "Evening Edition · 23 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Rocky Mountain Locust Plague of 1874",
        "excerpt": "About July 25, one of those periodical calamitous visitations to which the trans-Mississippi states are liable once in from eight to ten years made its appearance in northern and northwestern Kansas — the grasshopper or locust. The air was filled, and the fields and trees were completely covered with these voracious trespassers.",
        "source": "Kansas State Board of Agriculture, Report for 1874 (describing the Rocky Mountain locust, Melanoplus spretus, invasion of the Great Plains)",
        "href": "https://legendsofkansas.com/grasshopper-plague/",
        "image": {
          "src": "/covers/screwworm-gmo-flies-panama-tests--a0.png",
          "alt": "Nineteenth-century lithographic plate showing the Rocky Mountain locust (Caloptenus spretus) in multiple views and life stages",
          "credit": "Plate I from the First Annual Report of the United States Entomological Commission (1877), drawn by J. H. Emerton. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "Knipling and Bushland's Sterile Insect Technique Eradicates the Screwworm (1950s–1960s)",
        "excerpt": "Beginning in the late 1930s at a USDA laboratory in Texas, Edward Knipling and Raymond Bushland devised 'autocidal control' — mass-rearing screwworms, sterilizing the males with radiation, and releasing them so that, in the words of their citation, 'the sterilized males mate with native females to produce infertile eggs. This break in the insects' life cycle dramatically reduces the number of offspring.' After tests on Sanibel Island, Florida, and the total eradication of screwworms from the island of Curaçao in 1954, the technique cleared the flesh-eating pest from the U.S. Southeast and Southwest over the following decade — the same principle now being adapted with genetically modified flies in Panama.",
        "source": "The World Food Prize — 1992 Laureates: Edward F. Knipling and Raymond C. Bushland",
        "href": "https://www.worldfoodprize.org/en/laureates/19871999_laureates/1992_knipling_and_bushland/",
        "image": {
          "src": "/covers/screwworm-gmo-flies-panama-tests--a1.png",
          "alt": "A sterile male New World screwworm fly (Cochliomyia hominivorax), marked with a yellow dye spot, held on a person's fingertip",
          "credit": "Sterile male screwworm fly used in the Sterile Insect Technique, USDA. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "The Plague of Flies — Exodus 8:21–24, King James Bible (1611)",
        "excerpt": "Else, if thou wilt not let my people go, behold, I will send swarms of flies upon thee, and upon thy servants, and upon thy people, and into thy houses: and the houses of the Egyptians shall be full of swarms of flies, and also the ground whereon they are. And I will sever in that day the land of Goshen, in which my people dwell, that no swarms of flies shall be there; to the end thou mayest know that I am the LORD in the midst of the earth. And I will put a division between my people and thy people: to morrow shall this sign be. And the LORD did so; and there came a grievous swarm of flies into the house of Pharaoh, and into his servants' houses, and into all the land of Egypt: the land was corrupted by reason of the swarm of flies.",
        "source": "The Holy Bible, King James Version (1611), Exodus 8:21–24",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Exodus"
      },
      {
        "category": "literary",
        "title": "Victor Frankenstein Gives Life to His Creature — Mary Shelley, Frankenstein, Chapter 5 (1818)",
        "excerpt": "It was on a dreary night of November that I beheld the accomplishment of my toils. With an anxiety that almost amounted to agony, I collected the instruments of life around me, that I might infuse a spark of being into the lifeless thing that lay at my feet. It was already one in the morning; the rain pattered dismally against the panes, and my candle was nearly burnt out, when, by the glimmer of the half-extinguished light, I saw the dull yellow eye of the creature open; it breathed hard, and a convulsive motion agitated its limbs. How can I describe my emotions at this catastrophe, or how delineate the wretch whom with such infinite pains and care I had endeavoured to form? His limbs were in proportion, and I had selected his features as beautiful. Beautiful! Great God! His yellow skin scarcely covered the work of muscles and arteries beneath; his hair was of a lustrous black, and flowing; his teeth of a pearly whiteness; but these luxuriances only formed a more horrid contrast with his watery eyes, that seemed almost of the same colour as the dun-white sockets in which they were set, his shrivelled complexion and straight black lips.",
        "source": "Mary Shelley, Frankenstein; or, The Modern Prometheus (1818), Chapter 5",
        "href": "https://www.gutenberg.org/cache/epub/84/pg84.txt",
        "image": {
          "src": "/covers/screwworm-gmo-flies-panama-tests--a3.png",
          "alt": "Engraved frontispiece to the 1831 edition of Frankenstein, showing the newly animated creature and Victor Frankenstein fleeing",
          "credit": "Theodor von Holst, frontispiece to the 1831 edition of Frankenstein. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Stag Beetle — Albrecht Dürer (1505)",
        "excerpt": "In this small watercolour and gouache study, Dürer renders a single stag beetle with startling, almost portrait-like precision — its armoured body, branching antlers, and jointed legs set against blank paper. To elevate a lowly insect into the sole subject of a finished work was unprecedented in 1505, when insects were dismissed as the meanest of creatures. The image epitomizes the impulse the screwworm program shares: to study, master, and turn to human purpose the very forms of life once thought beneath notice.",
        "source": "Albrecht Dürer, Stag Beetle (1505), watercolour and gouache on paper, J. Paul Getty Museum, Los Angeles",
        "href": "https://www.getty.edu/art/collection/object/103QS6",
        "image": {
          "src": "/covers/screwworm-gmo-flies-panama-tests--a4.png",
          "alt": "Albrecht Dürer's 1505 watercolour of a stag beetle, meticulously detailed against a plain background",
          "credit": "Albrecht Dürer, Stag Beetle (1505), J. Paul Getty Museum. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Flight of the Bumblebee — Nikolai Rimsky-Korsakov, from The Tale of Tsar Saltan (1899–1900)",
        "excerpt": "This breakneck orchestral interlude was composed to depict a prince, transformed by magic into an insect, darting and buzzing through the air toward his enemies. Rimsky-Korsakov conjures the swarm's frenzy through relentless chromatic runs that whir without rest — music that turns a single insect into a force of nature. It is the sound of the swarm: small, unstoppable, and, like the screwworm fly, a creature made an agent of a larger design.",
        "source": "Nikolai Rimsky-Korsakov, 'Flight of the Bumblebee,' orchestral interlude from the opera The Tale of Tsar Saltan (composed 1899–1900)",
        "href": "https://imslp.org/wiki/Flight_of_the_Bumblebee_(Rimsky-Korsakov,_Nikolay)"
      }
    ],
    "rank": 10
  },
  {
    "slug": "rushdie-testifies-matar-terror-trial",
    "headline": "Salman Rushdie testifies at the federal terrorism trial of the man who stabbed him",
    "overview": "Salman Rushdie testified Thursday at the federal terrorism trial of Hadi Matar in Buffalo, telling jurors he first thought he had been punched before realizing, \"I was on the stage, lying down, with an enormous pool of blood all around me,\" and removing his glasses to show his sightless right eye. Matar, already convicted of state attempted murder in the 2022 attack, faces federal terrorism charges; prosecutors say he acted on Iran's 1989 fatwa over \"The Satanic Verses.\" The stabbing blinded Rushdie in one eye and damaged his liver.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMiogFBVV95cUxOQW05d28wem9GcHlSb3dndFhWc0FwbTVYbDRMOXNUZjZYeUh3ZlVFWm1XMk9UZ01yUzdaOFZuUzdWZmIzekgxOEdxMGEweHB5bnFjMnExSzliZmtfN3M4YTJtWFRUdkNxQWxyck9tOTRWNWF6MkxMTWpwMDZ4SDdHRkZkNFg5Tm1tUnZqTnJua3VFTkJOa2U5RzdWYmRXOWZSd0E?oc=5"
      },
      {
        "name": "ABC News",
        "href": "https://abcnews.com/Entertainment/wireStory/salman-rushdie-testifies-terrorism-trial-man-convicted-stabbing-135023750"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-23",
    "image": {
      "src": "/covers/rushdie-testifies-matar-terror-trial.png",
      "alt": "The author Salman Rushdie",
      "credit": "Salman Rushdie, New York City, 2008, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 23 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The trial and defense of Socrates, Athens, 399 BC",
        "excerpt": "Men of Athens, I honour and love you; but I shall obey God rather than you, and while I have life and strength I shall never cease from the practice and teaching of philosophy, exhorting any one whom I meet and saying to him after my manner: You, my friend,—a citizen of the great and mighty and wise city of Athens,—are you not ashamed of heaping up the greatest amount of money and honour and reputation, and caring so little about wisdom and truth and the greatest improvement of the soul, which you never regard or heed at all?",
        "source": "Plato, Apology, trans. Benjamin Jowett (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/1656/1656-h/1656-h.htm",
        "image": {
          "src": "/covers/rushdie-testifies-matar-terror-trial--a0.png",
          "alt": "Marble bust of Socrates, a Roman copy after a Greek original, in the Louvre",
          "credit": "Roman marble bust of Socrates, Louvre; via Wikimedia Commons, public domain"
        }
      },
      {
        "category": "historical",
        "title": "The abjuration of Galileo before the Roman Inquisition, 22 June 1633",
        "excerpt": "I, Galileo, son of the late Vincenzo Galilei, Florentine, aged seventy years, arraigned personally before this tribunal ... I abjure, curse, and detest the aforesaid errors and heresies, and generally every other error, heresy, and sect whatsoever contrary to the said Holy Church, and I swear that in the future I will never again say or assert, verbally or in writing, anything that might furnish occasion for a similar suspicion regarding me.",
        "source": "Abjuration of Galileo Galilei (1633), Famous Trials / Douglas O. Linder",
        "href": "https://famous-trials.com/galileotrial/1020-recantation",
        "image": {
          "src": "/covers/rushdie-testifies-matar-terror-trial--a1.png",
          "alt": "Painting of Galileo standing before the Roman Inquisition",
          "credit": "Cristiano Banti, Galileo Facing the Roman Inquisition, 1857; via Wikimedia Commons, public domain"
        }
      },
      {
        "category": "literary",
        "title": "Milton, Areopagitica: a speech for the liberty of unlicensed printing, 1644",
        "excerpt": "As good almost kill a man as kill a good book. Who kills a man kills a reasonable creature, God's image; but he who destroys a good book, kills reason itself, kills the image of God, as it were in the eye.",
        "source": "John Milton, Areopagitica (1644), Project Gutenberg eBook 608",
        "href": "https://www.gutenberg.org/cache/epub/608/pg608.txt",
        "image": {
          "src": "/covers/rushdie-testifies-matar-terror-trial--a2.png",
          "alt": "Title page of the first edition of Milton's Areopagitica, 1644",
          "credit": "Title page of the first edition of Areopagitica, 1644; via Wikimedia Commons, public domain"
        }
      },
      {
        "category": "literary",
        "title": "Milton, Sonnet XIX (On His Blindness), c. 1652–1655",
        "excerpt": "When I consider how my light is spent\nEre half my days, in this dark world and wide,\nAnd that one talent which is death to hide,\nLodg'd with me useless, though my soul more bent\nTo serve therewith my Maker, and present\nMy true account, lest He, returning, chide;\nDoth God exact day-labour, light denied?\nI fondly ask: but Patience, to prevent\nThat murmur, soon replies, God doth not need\nEither man's work, or His own gifts; who best\nBear His mild yoke, they serve Him best; His state\nIs kingly; thousands at His bidding speed,\nAnd post o'er land and ocean without rest;\nThey also serve who only stand and wait.",
        "source": "John Milton, Sonnet XIX (On His Blindness), via Wikisource",
        "href": "https://en.wikisource.org/wiki/Poems_That_Every_Child_Should_Know/On_His_Blindness",
        "image": {
          "src": "/covers/rushdie-testifies-matar-terror-trial--a3.png",
          "alt": "Portrait of the poet John Milton as a young man",
          "credit": "Portrait of John Milton, c. 1629; via Wikimedia Commons, public domain"
        }
      },
      {
        "category": "artistic",
        "title": "Jacques-Louis David, The Death of Socrates, 1787",
        "excerpt": "David paints the condemned Socrates upright and serene on his prison bed, one hand reaching for the cup of hemlock without so much as glancing at it, the other raised mid-argument as he goes on discoursing about the immortality of the soul. His disciples recoil and cover their faces in grief, while the philosopher, sentenced to die for his words, refuses to stop speaking them even in his last moment.",
        "source": "Jacques-Louis David, The Death of Socrates (1787), oil on canvas, The Metropolitan Museum of Art",
        "href": "https://en.wikipedia.org/wiki/The_Death_of_Socrates",
        "image": {
          "src": "/covers/rushdie-testifies-matar-terror-trial--a4.png",
          "alt": "Neoclassical painting of Socrates reaching for the cup of hemlock while lecturing his mournful followers",
          "credit": "Jacques-Louis David, The Death of Socrates, 1787, The Metropolitan Museum of Art; via Wikimedia Commons, public domain"
        }
      },
      {
        "category": "artistic",
        "title": "William-Adolphe Bouguereau, Homer and his Guide, 1874",
        "excerpt": "Bouguereau paints the blind Homer, staff in hand and eyes closed, led along a rocky path by the young shepherd Glaucus, who wards off a pack of snarling dogs. The wandering poet—sightless yet the fountainhead of Western verse—embodies the ancient bond between blindness and song that later attached itself to Milton and to every bard said to see with an inner eye.",
        "source": "William-Adolphe Bouguereau, Homer and his Guide (1874), Milwaukee Art Museum",
        "href": "https://commons.wikimedia.org/wiki/File:William-Adolphe_Bouguereau_(1825-1905)_-_Homer_and_his_Guide_(1874).jpg",
        "image": {
          "src": "/covers/rushdie-testifies-matar-terror-trial--a5.png",
          "alt": "Painting of a blind, robed Homer led by a young guide who fends off dogs on a rocky path",
          "credit": "William-Adolphe Bouguereau, Homer and his Guide, 1874, Milwaukee Art Museum; via Wikimedia Commons, public domain"
        }
      }
    ],
    "rank": 11
  },
  {
    "slug": "chongqing-landslide-11-dead",
    "headline": "Death toll from Chongqing landslide rises to 11 with 50 still missing in southwest China",
    "overview": "The death toll from a landslide that buried more than 10 buildings in the Hanjia area of Pengshui county, in southwest China's Chongqing municipality, has risen to 11, with 50 people still missing and 10 injured, state media said Thursday. Rescuers who recovered eight bodies soon after the collapse found three more in recent days. The search has been hampered by the huge volume of debris, including many large boulders.",
    "genre": "Climate",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiuAFBVV95cUxOMWNWVFROY05TbmZNOVpqQzg1aVdMZHNWckF5SDVBbTZuZTNvUjRGd3dOT3VrTWVUTHFmdTZodnhIcG5MUFhlMHlKUkotSkVUV1RPRVQ1dXVtNjVCcVFudEhmdHN2SEJHSnBhUFMyUU5ZU2tON29tMDNPTWFNSUpsQTJDY25GMURmay1oeFdZYXdaZFUtazNRWnZBQlh6UjJQUE1GQUR3ajN3X0MxOXJ0OF9sNjZ6VWlR?oc=5"
      },
      {
        "name": "Xinhua",
        "href": "https://english.news.cn/20260723/92fceb544b4a4e4c933a7f844cbc6365/c.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-23",
    "image": {
      "src": "/covers/chongqing-landslide-11-dead.png",
      "alt": "A vast landslide deposit of rock and mud across a mountainside in Sichuan, southwest China",
      "credit": "Landslide deposit in Sichuan, southwest China, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 23 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The burial of Pompeii and Herculaneum by Vesuvius, 24 August AD 79",
        "excerpt": "In the early afternoon of 24 August AD 79, Mount Vesuvius hurled a column of ash and pumice miles into the sky, then collapsed into searing avalanches of gas and rock. Within roughly a day the flourishing Roman towns of Pompeii and Herculaneum were entombed under metres of volcanic debris, their streets, houses and inhabitants sealed where they fell. Excavations centuries later found voids in the hardened ash that, filled with plaster, revealed the exact forms of the buried dead.",
        "source": "Eruption of Mount Vesuvius in AD 79; destruction of Pompeii and Herculaneum (Wikipedia)",
        "href": "https://en.wikipedia.org/wiki/Eruption_of_Mount_Vesuvius_in_AD_79",
        "image": {
          "src": "/covers/chongqing-landslide-11-dead--a0.png",
          "alt": "Plaster casts of victims lying where they died, in the Garden of the Fugitives at Pompeii",
          "credit": "Garden of the Fugitives, Pompeii, via Wikimedia Commons (CC BY-SA)"
        }
      },
      {
        "category": "historical",
        "title": "The Vajont Dam landslide disaster, Italy, 9 October 1963",
        "excerpt": "On the night of 9 October 1963 a mass of some 260 million cubic metres of rock broke from Monte Toc and plunged into the reservoir behind Italy's Vajont Dam. The displaced water rose in a wave roughly 250 metres high that overtopped the still-intact dam and swept down the valley in minutes, obliterating the town of Longarone and neighbouring villages. Close to two thousand people were killed, many never recovered from the mud and rubble, a catastrophe caused not by the mountain alone but by geological warnings that had been ignored.",
        "source": "Vajont Dam disaster, 1963 (Wikipedia)",
        "href": "https://en.wikipedia.org/wiki/Vajont_Dam",
        "image": {
          "src": "/covers/chongqing-landslide-11-dead--a1.png",
          "alt": "The Vajont Dam seen from Erto, with the scarred flank of Monte Toc rising above the gorge",
          "credit": "Vajont Dam viewed from Erto, via Wikimedia Commons (CC BY-SA)"
        }
      },
      {
        "category": "literary",
        "title": "Pliny the Younger, Letter to Tacitus on the eruption of Vesuvius (c. AD 107)",
        "excerpt": "The court which led to his apartment being now almost filled with stones and ashes, if he had continued there any time longer, it would have been impossible for him to have made his way out. So he was awoke and got up, and went to Pomponianus and the rest of his company, who were feeling too anxious to think of going to bed. They consulted together whether it would be most prudent to trust to the houses, which now rocked from side to side with frequent and violent concussions as though shaken from their very foundations; or fly to the open fields, where the calcined stones and cinders, though light indeed, yet fell in large showers, and threatened destruction. In this choice of dangers they resolved for the fields. They went out then, having pillows tied upon their heads with napkins; and this was their whole defence against the storm of stones that fell round them. It was now day everywhere else, but there a deeper darkness prevailed than in the thickest night.",
        "source": "Pliny the Younger, Letters, Book VI.16 (to Tacitus), trans. William Melmoth, rev. F. C. T. Bosanquet; Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/2811/pg2811.txt"
      },
      {
        "category": "literary",
        "title": "Ovid, Metamorphoses, Book I: the Flood of Deucalion (c. AD 8)",
        "excerpt": "The rivers, breaking out, rush through the open plains, and bear away, together with the standing corn, the groves, flocks, men, houses, and temples, together with their sacred utensils. If any house remained, and, not thrown down, was able to resist ruin so vast, yet the waves, rising aloft, covered the roof of that house, and the towers tottered, overwhelmed beneath the stream. And now sea and land had no mark of distinction; everything now was ocean; and to that ocean shores were wanting.",
        "source": "Ovid, The Metamorphoses, Book I, trans. Henry T. Riley (1893); Project Gutenberg",
        "href": "https://www.gutenberg.org/files/21765/21765-h/21765-h.htm"
      },
      {
        "category": "artistic",
        "title": "Karl Bryullov, The Last Day of Pompeii (1830-1833)",
        "excerpt": "Bryullov's vast canvas freezes the instant Vesuvius destroys Pompeii: the sky splits with red lightning, columns and statues topple from their pedestals, and families shield themselves beneath cloaks as ash rains down. A fallen young woman lies in the foreground beside her living infant, mothers clutch their children, and a son bears his aged father through the panic, the whole crowd lit by the lurid glare of the erupting mountain. It is an image of an entire civilisation collapsing before the fury of nature.",
        "source": "Karl Bryullov, The Last Day of Pompeii, oil on canvas, 1830-1833, State Russian Museum, Saint Petersburg",
        "href": "https://en.wikipedia.org/wiki/The_Last_Day_of_Pompeii",
        "image": {
          "src": "/covers/chongqing-landslide-11-dead--a4.png",
          "alt": "Crowds fleeing collapsing buildings and toppling statues under a lightning-lit sky as Vesuvius destroys Pompeii",
          "credit": "Karl Bryullov, The Last Day of Pompeii (1833), State Russian Museum; Google Art Project via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Philip James de Loutherbourg, An Avalanche in the Alps (1803)",
        "excerpt": "Loutherbourg's Romantic landscape captures the moment a mass of rock and ice breaks loose high in the Alps and thunders down toward a lone timber chalet. Tiny human figures in the foreground recoil in terror as the boulders shatter the pines, dwarfed by the overwhelming scale of the collapsing mountainside. The painting turns a mountain slide into an emblem of nature's sublime, indifferent power over the fragile dwellings of humankind.",
        "source": "Philip James de Loutherbourg, An Avalanche in the Alps, oil on canvas, 1803, Tate Britain, London",
        "href": "https://en.wikipedia.org/wiki/An_Avalanche_in_the_Alps",
        "image": {
          "src": "/covers/chongqing-landslide-11-dead--a5.png",
          "alt": "A rockslide and avalanche crashing down an Alpine mountainside toward a small chalet as figures flee",
          "credit": "Philip James de Loutherbourg, An Avalanche in the Alps (1803), Tate; via Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 12
  },
  {
    "slug": "comic-con-2026-marvel-spaceballs",
    "headline": "Comic-Con 2026 opens in San Diego with Marvel's 'Avengers: Doomsday' and a 'Spaceballs' sequel",
    "overview": "San Diego Comic-Con opened Wednesday evening with more than 120,000 fans expected over four days, as Marvel Studios prepares a Hall H panel Saturday to build hype for December's \"Avengers: Doomsday.\" A Friday panel spotlights \"Spaceballs: The New One,\" which brings back Rick Moranis, Bill Pullman and 100-year-old Mel Brooks reprising roles from the 1987 parody. The convention remains the biggest event on the pop-culture calendar.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMikAFBVV95cUxQYmN5TUtCd1p4TnNVdTRsVG11WnBfeUJNeThKREZfN3czR3hKUEMxYlB0WFUyYkJCSVlEMEs1dVUxTjF2bndVcXhpTUNfd0dSWElLUXVpVXByTHcyRjhKaGdOV3FGYzM5UlVleTRqbGZVeHRNV3JaRnlDRXhaN1U1V1B2NzIxQnJ5cTdidXctZWc?oc=5"
      },
      {
        "name": "ABC News",
        "href": "https://abcnews.com/Entertainment/wireStory/comic-con-2026-marvel-returns-hall-spaceballs-sequel-134995730"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-23",
    "image": {
      "src": "/covers/comic-con-2026-marvel-spaceballs.png",
      "alt": "Crowds of fans fill the floor at San Diego Comic-Con",
      "credit": "San Diego Comic-Con, 2019, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 23 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Martial celebrates the opening of the Colosseum, \"On the Spectacles\" III (AD 80)",
        "excerpt": "What race is set so far, what race so barbarous, Caesar, wherefrom a spectator is not in thy city? There has come the farmer of Rhodope from Orphic Haemus, there has come too the Sarmatian fed on draughts of horses' blood, and he who quaffs at its spring the stream of first-found Nile, and he whose shore the wave of farthest Tethys beats; the Arab has sped, Sabaeans have sped, and Cilicians have here been drenched in their own saffron dew. With hair twined in a knot have come Sygambrians, and, with locks twined elsewise, Aethiopians. Diverse sounds the speech of the peoples, yet then is it one when thou art acclaimed thy country's Father true.",
        "source": "Martial, Epigrams, \"On the Spectacles,\" III, trans. Walter C. A. Ker, Loeb Classical Library (London: Heinemann, 1919).",
        "href": "https://archive.org/stream/martialepigrams01martiala/martialepigrams01martiala_djvu.txt",
        "image": {
          "src": "/covers/comic-con-2026-marvel-spaceballs--a0.png",
          "alt": "Roman floor mosaic depicting gladiators in combat, a referee, and a surrendering fighter, from Zliten in Libya, c. AD 200.",
          "credit": "Gladiators from the Zliten mosaic (Roman, c. AD 200), Archaeological Museum of Tripoli. Photograph via Wikimedia Commons, public domain."
        }
      },
      {
        "category": "historical",
        "title": "Hubert Howe Bancroft, \"The Book of the Fair,\" on the World's Columbian Exposition, Chicago (1893)",
        "excerpt": "Following each one of these throngings of humanity, wherein all men and nations are brought nearer to one another, into closer commercial, political and social relationships, is a general awakening of intellect, and a further polish given to the surface of human affairs.",
        "source": "Hubert Howe Bancroft, The Book of the Fair (Chicago and San Francisco: The Bancroft Company, 1893), vol. 1.",
        "href": "https://archive.org/stream/bookfair1banca/bookfair1banca_djvu.txt",
        "image": {
          "src": "/covers/comic-con-2026-marvel-spaceballs--a1.png",
          "alt": "The Court of Honor and Grand Basin of the 1893 World's Columbian Exposition in Chicago, ringed by white beaux-arts palaces.",
          "credit": "Court of Honor and Grand Basin, World's Columbian Exposition, Chicago, 1893. Photograph via Wikimedia Commons, public domain."
        }
      },
      {
        "category": "literary",
        "title": "Juvenal coins \"bread and circuses,\" Satire X, \"The Vanity of Human Wishes\" (c. AD 100-127)",
        "excerpt": "Now that no one buys our votes, the public has long since cast off its cares; the people that once bestowed commands, consulships, legions and all else, now meddles no more and longs eagerly for just two things—Bread and Games!",
        "source": "Juvenal, Satire X (\"The Vanity of Human Wishes\"), trans. G. G. Ramsay, Loeb Classical Library (1918).",
        "href": "https://en.wikisource.org/wiki/Juvenal_and_Persius/The_Satires_of_Juvenal/Satire_10"
      },
      {
        "category": "literary",
        "title": "Aristophanes, \"The Frogs,\" the initiates' hymn to Iacchus at the Dionysia (405 BC)",
        "excerpt": "O Iacchus! power excelling, here in stately temple dwelling,\nO Iacchus! O Iacchus!\nCome to tread this verdant level,\nCome to dance in mystic revel,\nCome whilst round thy forehead hurtles\nMany a wreath of fruitful myrtles,\nCome with wild and saucy paces\nMingling in our joyous dance,\nPure and holy, which embraces all the charms of all the Graces\nWhen the mystic choirs advance.",
        "source": "Aristophanes, The Frogs, trans. Benjamin Bickley Rogers, in Nine Greek Dramas (The Harvard Classics, ed. Charles W. Eliot).",
        "href": "https://www.gutenberg.org/files/7998/7998-h/7998-h.htm"
      },
      {
        "category": "artistic",
        "title": "Pieter Bruegel the Elder, \"The Fight Between Carnival and Lent\" (1559)",
        "excerpt": "Bruegel crowds his panel with a whole town at play: on the left the fat, barrel-riding figure of Carnival leads a rout of maskers, mummers and feasting revelers, while on the right gaunt Lent, drawn on a cart, marshals the penitent. Between them the square swarms with beggars, players, children's games and a stage of costumed amateur actors—the entire community turned out for the great seasonal spectacle of fandom and folly.",
        "source": "Pieter Bruegel the Elder, The Fight Between Carnival and Lent, oil on oak panel, 1559, Kunsthistorisches Museum, Vienna (inv. GG 1016).",
        "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_d._%C3%84._066.jpg",
        "image": {
          "src": "/covers/comic-con-2026-marvel-spaceballs--a4.png",
          "alt": "Densely populated town square where a rotund Carnival figure on a barrel jousts against a lean Lent on a cart, surrounded by revelers, players and townsfolk.",
          "credit": "Pieter Bruegel the Elder, The Fight Between Carnival and Lent (1559), Kunsthistorisches Museum, Vienna. Via Wikimedia Commons (The Yorck Project), public domain."
        }
      },
      {
        "category": "artistic",
        "title": "Jean-Léon Gérôme, \"Pollice Verso\" (1872)",
        "excerpt": "In Gérôme's meticulously reconstructed Colosseum a victorious murmillo stands over his fallen opponent and turns to the tiers for their verdict, while the crowd and the white-robed Vestals thrust their thumbs down in a roaring, unanimous demand. The painting fixes the exact instant when a mass audience gathered for spectacle becomes the arbiter of a hero's fate—an image so potent it later shaped the look of Hollywood's own arena epics.",
        "source": "Jean-Léon Gérôme, Pollice Verso, oil on canvas, 1872, Phoenix Art Museum.",
        "href": "https://commons.wikimedia.org/wiki/File:Jean-Leon_Gerome_Pollice_Verso.jpg",
        "image": {
          "src": "/covers/comic-con-2026-marvel-spaceballs--a5.png",
          "alt": "A victorious Roman gladiator stands over a defeated opponent in the Colosseum arena as the tiered crowd and Vestal Virgins give a thumbs-down gesture.",
          "credit": "Jean-Léon Gérôme, Pollice Verso (1872), Phoenix Art Museum. Via Wikimedia Commons, public domain."
        }
      }
    ],
    "rank": 13
  },
  {
    "slug": "houthi-red-sea-saudi-tankers-blockade",
    "headline": "Houthi forces attack two Saudi oil tankers in the Red Sea as US strikes on Iran enter a 12th night",
    "overview": "Yemen's Iran-aligned Houthis said they hit two Saudi oil tankers, the Encelia and the Layla, with missiles and drones in the Red Sea, declaring a naval blockade of Saudi Arabia and threatening a second chokepoint for global oil alongside the near-shut Strait of Hormuz. At least seven vessels changed course to avoid the Bab el-Mandeb strait. The attacks came as the US military carried out a 12th straight night of strikes on Iran, with both sides now threatening each other's civilian infrastructure.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMizgFBVV95cUxOck9rMklSSHp1Z0E2UmlqZUJHSWNxRXNSZGtZd1JTOFdSbUE2amI3RHFmaUNuSS1nU1NzaThJdVIwVzZFcXVIaXNjU3lrSVYtaDF5THNwWkpqUHVwTEFsWklsbnp4ZllTMndIYWhRM0RZa09qaTNiVXVCNmh5a2p6MnBidG1kWkJSUVJnb1RuOXdUcU5MRDVxbzJmcDE2UWZsaVZYRDdCdHlYcG1kUTdKT093ZXI4b3VkWjZNRzdDUDIwWEFWMHRia2FIY3dIdw?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cpw9xzx9r4ko"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-23",
    "image": {
      "src": "/covers/houthi-red-sea-saudi-tankers-blockade.png",
      "alt": "A satellite view of an oil tanker in the Red Sea off the coast of Yemen",
      "credit": "Copernicus Sentinel-2 imagery (European Union), via Wikimedia Commons"
    },
    "lead": true,
    "edition": "Morning Edition · 23 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Lysander seizes the Hellespont grain route at Lampsacus and Aegospotami (405 BC)",
        "excerpt": "Lysander was again on the move; leaving Abydos, he passed up channel to Lampsacus, which town was allied with Athens... They then attacked and took by storm the town, which was wealthy, and with its stores of wine and wheat and other commodities was pillaged by the soldiery.",
        "source": "Xenophon, Hellenica, Book II.i (the Hellespont campaign and the battle of Aegospotami, 405 BC), trans. H. G. Dakyns, via Project Gutenberg",
        "href": "https://www.gutenberg.org/files/1174/1174-h/1174-h.htm",
        "image": {
          "src": "/covers/houthi-red-sea-saudi-tankers-blockade--a0.png",
          "alt": "Marble bust of the historian Xenophon, who recorded Sparta's strangling of Athens' sea-borne grain supply",
          "credit": "Bust of Xenophon, Aphrodisias Museum, CC0 / public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "Lincoln proclaims the Union naval blockade of the Southern coast (19 April 1861)",
        "excerpt": "Now, therefore, I, Abraham Lincoln, President of the United States... have further deemed it advisable to set on foot a blockade of the ports within the States aforesaid, in pursuance of the laws of the United States, and of the law of Nations, in such case provided. For this purpose a competent force will be posted so as to prevent entrance and exit of vessels from the ports aforesaid.",
        "source": "Abraham Lincoln, Proclamation of a Blockade of the South, April 19, 1861, in The Collected Works of Abraham Lincoln, ed. Roy P. Basler, 4:338-339, via Dickinson College House Divided Project",
        "href": "https://housedivided.dickinson.edu/sites/lincoln/presidential-proclamation-april-19-1861/",
        "image": {
          "src": "/covers/houthi-red-sea-saudi-tankers-blockade--a1.png",
          "alt": "Scott's Great Snake, an 1861 cartoon map showing the Union blockade coiling around the Confederate coastline",
          "credit": "J. B. Elliott, 'Scott's Great Snake' (1861), public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Scylla and Charybdis: the deadly strait in Homer's Odyssey, Book XII",
        "excerpt": "No ship ever yet got past her without losing some men, for she shoots out all her heads at once, and carries off a man in each mouth. ... You will find the other rock lie lower, but they are so close together that there is not more than a bow-shot between them ... Three times in the day does she vomit forth her waters, and three times she sucks them down again; see that you be not there when she is sucking, for if you are, Neptune himself could not save you.",
        "source": "Homer, The Odyssey, Book XII, trans. Samuel Butler, via Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Odyssey_(Butler)/Book_XII",
        "image": {
          "src": "/covers/houthi-red-sea-saudi-tankers-blockade--a2.png",
          "alt": "Henry Fuseli's painting of Odysseus steering his ship through the narrow passage between Scylla and Charybdis",
          "credit": "Henry Fuseli, 'Odysseus in front of Scylla and Charybdis' (1794-96), public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "The war for the sea-lanes of the East in Camoes' The Lusiads, Book I (1572)",
        "excerpt": "ARMS and the Heroes, who from Lisbon's shore, / Thro' seas where sail was never spread before, / Beyond where Ceylon lifts her spicy breast, / And waves her woods above the watery waste, / With prowess more than human forc'd their way / To the fair kingdoms of the rising day: / What wars they wag'd, what seas, what dangers past, / What glorious empire crown'd their toils at last",
        "source": "Luis de Camoes, The Lusiads, Book I (opening lines), trans. William Julius Mickle, via Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Lusiads_(tr._Mickle)/Book_I",
        "image": {
          "src": "/covers/houthi-red-sea-saudi-tankers-blockade--a3.png",
          "alt": "Sixteenth-century portrait of the poet Luis de Camoes, who made the seizure of the Eastern trade route his epic subject",
          "credit": "Fernao Gomes (attrib.), portrait of Luis de Camoes, c. 1577, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Philip James de Loutherbourg, The Battle of the Nile (1800)",
        "excerpt": "Loutherbourg freezes the instant the French flagship L'Orient detonates in Aboukir Bay, hurling masts and men into a sky of orange fire while the surrounding fleet is silhouetted against the blaze. The painting turns a fight for control of a sea route into pure apocalypse: a warship burning to the waterline, the water itself alight. It renders visceral what a missile-struck tanker set ablaze in the Red Sea threatens to make ordinary again.",
        "source": "Philip James de Loutherbourg, The Battle of the Nile (1800), oil on canvas, Tate Britain, London (T01452); file via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Phillip_James_De_Loutherbourg_-_The_Battle_of_the_Nile_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/houthi-red-sea-saudi-tankers-blockade--a4.png",
          "alt": "Dramatic painting of the French flagship L'Orient exploding in flames during the Battle of the Nile",
          "credit": "Philip James de Loutherbourg, 'The Battle of the Nile' (1800), Tate Britain, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "The Battle of Lepanto, 7 October 1571 (H. Letter, late 16th century)",
        "excerpt": "Massed galleys lock together at the mouth of the Gulf of Corinth, oars splintering and gun-smoke rising as two civilizations fight to command the trade of the Mediterranean at a single narrow gateway. The high horizon crowds the whole sea with wreckage and grappling hulls, dramatizing how a maritime chokepoint concentrates world power into one bloody afternoon. The scene mirrors the contest now unfolding at Bab el-Mandeb and Hormuz, where a strait once again becomes the stake of a wider war.",
        "source": "The Battle of Lepanto, 7 October 1571, attributed to H. Letter (late 16th c.), oil on canvas, National Maritime Museum, Greenwich (BHC0261); file via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Battle_of_Lepanto_1571.jpg",
        "image": {
          "src": "/covers/houthi-red-sea-saudi-tankers-blockade--a5.png",
          "alt": "Sixteenth-century painting of hundreds of galleys locked in battle at the naval chokepoint of Lepanto in 1571",
          "credit": "H. Letter, 'The Battle of Lepanto, 7 October 1571', National Maritime Museum, Greenwich, public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 14
  },
  {
    "slug": "rubio-lavrov-manila-ukraine",
    "headline": "US Secretary of State Rubio meets Russia's Lavrov in Manila to try to revive talks on ending the Ukraine war",
    "overview": "US Secretary of State Marco Rubio met Russian Foreign Minister Sergei Lavrov on the sidelines of a Southeast Asian security gathering in Manila, seeking to revive a stalled American effort to broker an end to the war in Ukraine. Rubio said Washington remained committed to helping end the conflict but signaled no breakthrough. The meeting came as European allies pressed ahead with new sanctions on Moscow.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMimAFBVV95cUxNeWFkYnFRZ1lKYlVmbi1lS2QyT1BteDg5MHdtQ2NsUnBPY0c1ZXF3TXluc3JLc2FlTENucHNwalh0cHU4emJnSnZkaFJqTDlaQTB3aHB1cm0wM0tKQWlFaTh0RkhleG1qME9SSnhNVlotaWFnU0NYczZaQ2pQSmJkZGtMZF9vclBhOXRmY2lYYTdpS0c4WWRQTg?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMirwFBVV95cUxQZkxVQ1A5UHo4b2tRdnpPQ3JaZWtwZHZJNlA4M0hpN2U1dzR2clM1UjhGcjRPakxGNFBHUXlpMWtPcnBuTkxrTy1HVVVvRHpYaHMxM2JZSDVjdkdYc3c2eEcwODNmZ3o3aVMwSHpfd3BoSEYyMDIxYzZ1UGNMcWU5cGFTbmpjUF9DWDFkLTJsTFJCU0U2OFNrX1phTWw2ZFZKNkhtN1N2Q3plUkUwU1RJ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-23",
    "image": {
      "src": "/covers/rubio-lavrov-manila-ukraine.png",
      "alt": "U.S. Secretary of State Marco Rubio at a diplomatic meeting with Russian and Saudi officials",
      "credit": "U.S. Department of State, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 23 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Peace of Nicias (421 BC), recorded by Thucydides",
        "excerpt": "Looked at by the light of facts it cannot, it will be found, be rationally considered a state of peace, where neither party either gave or got back all that they had agreed, apart from the violations of it which occurred on both sides in the Mantinean and Epidaurian wars and other instances, and the fact that the allies in the direction of Thrace were in as open hostility as ever, while the Boeotians had only a truce renewed every ten days.",
        "source": "Thucydides, History of the Peloponnesian War, Book 5, ch. 26 (trans. Richard Crawley), via Wikisource",
        "href": "https://en.wikisource.org/wiki/History_of_the_Peloponnesian_War/Book_5",
        "image": {
          "src": "/covers/rubio-lavrov-manila-ukraine--a0.png",
          "alt": "Marble bust of the ancient Greek historian Thucydides, who chronicled the fragile Peace of Nicias",
          "credit": "Photograph by Captmondo, Royal Ontario Museum, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "The Treaty of Portsmouth (5 September 1905), ending the Russo-Japanese War under American mediation",
        "excerpt": "The Emperor of Japan on the one part, and His Majesty the Emperor of all the Russias on the other part, animated by a desire to restore the blessings of peace to their countries and peoples, have resolved to conclude a treaty of Peace... There shall henceforth be peace and amity between Their Majesties the Emperor of Japan and the Emperor of all the Russias and between Their respective States and Subjects.",
        "source": "Treaty of Peace between Japan and Russia (Treaty of Portsmouth), preamble and Article 1; The World and Japan Database, Institute for Advanced Studies on Asia, University of Tokyo",
        "href": "https://worldjpn.net/documents/texts/pw/19050905.T1E.html",
        "image": {
          "src": "/covers/rubio-lavrov-manila-ukraine--a1.png",
          "alt": "Russian and Japanese delegations seated across the negotiating table during the 1905 Portsmouth peace conference brokered by the United States",
          "credit": "P. F. Collier & Son (1905), public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "The Embassy to Achilles, Homer's Iliad, Book IX",
        "excerpt": "Ulysses and Ajax now came in- Ulysses leading the way -and stood before him. Achilles sprang from his seat with the lyre still in his hand, and Patroclus, when he saw the strangers, rose also. Achilles then greeted them saying, \"All hail and welcome- you must come upon some great matter, you, who for all my anger are still dearest to me of the Achaeans.\"",
        "source": "Homer, The Iliad, Book IX (trans. Samuel Butler), via Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Iliad_(Butler)/Book_IX",
        "image": {
          "src": "/covers/rubio-lavrov-manila-ukraine--a2.png",
          "alt": "Attic red-figure cup showing the embassy to Achilles: the sulking Achilles wrapped in his cloak, Hermes, white-haired Phoenix and Odysseus",
          "credit": "Tarquinia Painter, c. 480-470 BC; photograph by Jastrow, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "The Duke of Burgundy's plea for peace, Shakespeare's Henry V (Act V, Scene 2, c. 1599)",
        "excerpt": "Why that the naked, poor, and mangled Peace, Dear nurse of arts, plenties, and joyful births, Should not in this best garden of the world, Our fertile France, put up her lovely visage? Alas, she hath from France too long been chas'd, And all her husbandry doth lie on heaps, Corrupting in it own fertility.",
        "source": "William Shakespeare, King Henry V, Act V, Scene 2 (the Duke of Burgundy addressing the kings of England and France), Project Gutenberg eBook 1521",
        "href": "https://www.gutenberg.org/cache/epub/1521/pg1521.txt",
        "image": {
          "src": "/covers/rubio-lavrov-manila-ukraine--a3.png",
          "alt": "Medieval French manuscript miniature of the marriage of Henry V of England and Catherine of Valois, sealing the negotiated 1420 Treaty of Troyes",
          "credit": "From Jean Chartier, Chronique de Charles VII, British Library Royal 20 E. vi, f. 9v, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Gerard ter Borch, The Ratification of the Treaty of Munster (1648)",
        "excerpt": "An eyewitness painted this quiet, momentous scene: Spanish and Dutch envoys gathered around a table, hands raised to swear the oath that ended eighty years of war. There is no triumph, only the sober formality of rival powers binding themselves by treaty. Ter Borch, who was there, even inserted his own face at the edge of the crowd, a reminder that peace is made by particular men in a particular room, much as Rubio and Lavrov met at a table in Manila.",
        "source": "Gerard ter Borch, 'The Ratification of the Treaty of Munster', 1648, oil on copper, Rijksmuseum, Amsterdam (SK-A-405); file page at Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:The_Ratification_of_the_Treaty_of_Munster,_Gerard_Ter_Borch_(1648).jpg",
        "image": {
          "src": "/covers/rubio-lavrov-manila-ukraine--a4.png",
          "alt": "Dutch and Spanish envoys raising their hands to swear the oath ratifying the 1648 Peace of Munster",
          "credit": "Gerard ter Borch, 1648, Rijksmuseum, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Peter Paul Rubens, Minerva protects Pax from Mars ('Peace and War') (1629-30)",
        "excerpt": "Rubens painted this allegory while serving as a diplomat, offering it to Charles I to coax England toward peace with Spain. Minerva, goddess of wisdom, thrusts back the armoured Mars while Peace nurses her children and pours out abundance. The composition captures the event's underlying anxiety: peace is a bounty that must be actively shielded from a war god who is only ever pushed a step away, never banished, its survival forever provisional.",
        "source": "Peter Paul Rubens, 'Minerva protects Pax from Mars (Peace and War)', 1629-30, oil on canvas, The National Gallery, London (NG46); file page at Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Peter_Paul_Rubens_(1577-1640)_Peace_and_War_(1629).jpg",
        "image": {
          "src": "/covers/rubio-lavrov-manila-ukraine--a5.png",
          "alt": "Allegory in which Minerva shields the goddess of Peace from Mars, god of war, as children enjoy Peace's bounty",
          "credit": "Peter Paul Rubens, 1629-30, The National Gallery, London, public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 15
  },
  {
    "slug": "eu-21st-sanctions-russia-banks",
    "headline": "European Union agrees a 21st sanctions package against Russia, adding 32 banks to its transaction ban",
    "overview": "EU ambassadors agreed the bloc's 21st package of sanctions against Russia, expanding restrictions on Moscow's financial sector, energy revenues and its 'shadow fleet' of oil tankers, and adding 32 more Russian banks to a transaction ban that now covers most of the country's internationally connected lenders. The package also freezes an oil price-cap adjustment for a year and, for the first time, targets vessels aiding the shadow fleet. A written procedure to formally adopt the measures was launched Thursday.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMixwFBVV95cUxNbDk5Tmt4am9MUUVyY0V1RGRnbm5hbE5TcDJqTDJuRXlmaVpOdVJuN2VRYXIwaUwyRU9UdDN0b3N1eGMxS0NlelNjWmhqemJfN252N2QyVTBNSU9QSHcxbmwySkRnQk5XSDZLdXEwNEVTbEhmMDJNdFpuM2RvcjItMGJwVF9JMElIekt4TEtjSlF0dXBJMG5XUkw3ZHg1aVdRX2paMnRBdkFWcHlCbW5zU1NWWDRpazZtQjJfTWlQMnZ5cDN1dE5J?oc=5"
      },
      {
        "name": "U.S. News",
        "href": "https://www.usnews.com/news/world/articles/2026-07-23/eu-ambassadors-agree-21st-sanctions-package-against-russia-eu-diplomats-say"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-23",
    "image": {
      "src": "/covers/eu-21st-sanctions-russia-banks.png",
      "alt": "The blue-and-gold flag of the European Union flying beside a parliament building",
      "credit": "Marek Slusarczyk, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 23 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Megarian Decree, c. 432 BC, in Thucydides, History of the Peloponnesian War (Book I.67, 5th c. BC)",
        "excerpt": "There were many who came forward and made their several accusations; among them the Megarians, in a long list of grievances, called special attention to the fact of their exclusion from the ports of the Athenian empire and the market of Athens, in defiance of the treaty. Athens' decree barring Megara from every harbour and marketplace of its empire is antiquity's clearest case of a trade embargo wielded as an instrument of coercion, and it helped ignite the Peloponnesian War.",
        "source": "Thucydides, History of the Peloponnesian War, Book I, ch. 67, trans. Richard Crawley; Wikisource.",
        "href": "https://en.wikisource.org/wiki/History_of_the_Peloponnesian_War/Book_1"
      },
      {
        "category": "historical",
        "title": "Napoleon I, The Berlin Decree, 21 November 1806 (the Continental System)",
        "excerpt": "The British Isles are declared to be in a state of blockade. All commerce and all correspondence with the British Isles are forbidden. No vessel coming directly from England or from the English colonies or which shall have visited these since the publication of the present decree shall be received in any port. Napoleon's Continental System sought to bankrupt Britain by sealing the whole of Europe against its trade, banks and shipping, prefiguring today's continent-wide effort to strangle a state's financial and energy revenues.",
        "source": "Decree of Napoleon I issued at Berlin, 21 November 1806; English translation, Wikisource.",
        "href": "https://en.wikisource.org/wiki/Berlin_Decree",
        "image": {
          "src": "/covers/eu-21st-sanctions-russia-banks--a1.png",
          "alt": "1807 satirical print 'Blockade Against Blockade' depicting the rival British and French commercial blockades of the Napoleonic era.",
          "credit": "George M. Woodward, etched by Charles Williams, 1807, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Aristophanes, The Acharnians, 425 BC (Athenian Society translation)",
        "excerpt": "[Pericles] passed an edict, which ran like the song, \"That the Megarians be banished both from our land and from our markets and from the sea and from the continent.\" Meanwhile the Megarians, who were beginning to die of hunger, begged the Lacedaemonians to bring about the abolition of the decree, of which those harlots were the cause; several times we refused their demand. Aristophanes' comedy stages the human cost of the Megarian embargo — a whole people starving under a paper decree — the same logic that drives modern sanctions and transaction bans.",
        "source": "Aristophanes, The Acharnians, in The Eleven Comedies; Project Gutenberg ebook #3012.",
        "href": "https://www.gutenberg.org/files/3012/3012-h/3012-h.htm",
        "image": {
          "src": "/covers/eu-21st-sanctions-russia-banks--a2.png",
          "alt": "Engraved portrait of the Athenian comic playwright Aristophanes.",
          "credit": "Unknown engraver (before 1896), public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "The Book of Lamentations 1:1; 4:9 (King James Version, 1611)",
        "excerpt": "How doth the city sit solitary, that was full of people! how is she become as a widow! she that was great among the nations, and princess among the provinces, how is she become tributary! ... They that be slain with the sword are better than they that be slain with hunger: for these pine away, stricken through for want of the fruits of the field. Lamentations gives voice to a great city cut off, isolated and impoverished under siege — the ancient image of a proud power reduced to solitude and want by encirclement.",
        "source": "The Book of Lamentations, King James Version (1611); Wikisource.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Lamentations",
        "image": {
          "src": "/covers/eu-21st-sanctions-russia-banks--a3.png",
          "alt": "David Roberts' 1850 painting of the burning city during the Roman siege and destruction of Jerusalem.",
          "credit": "David Roberts, 1850, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Francisco Goya, 'Gracias á la almorta' (Thanks to the grass-pea), plate 51 of Los Desastres de la Guerra, 1811–12 (published 1863)",
        "excerpt": "Gaunt, half-collapsed figures crowd forward for a ladle of watery gruel, their bodies bent by hunger against a bare and shadowed ground. Goya etched the plate during Madrid's famine of 1811–12, when severed supply lines under the Napoleonic wars killed perhaps a seventh of the city. It renders with pitiless economy what economic strangulation looks like from below — the ledger of blockade written in emaciated flesh.",
        "source": "Francisco de Goya, Los Desastres de la Guerra, plate 51; etching, The Metropolitan Museum of Art (public-domain scan), Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Plate_51_from_%27The_Disasters_of_War%27_(Los_Desastres_de_la_Guerra)-_%27Thanks_to_the_millet.%27_(Gracias_%C3%A1_la_almorta.)_MET_DP817397.jpg",
        "image": {
          "src": "/covers/eu-21st-sanctions-russia-banks--a4.png",
          "alt": "Goya etching of starving, emaciated figures receiving scraps of food during the Madrid famine.",
          "credit": "Francisco Goya, 1811–12 (published 1863), public domain (CC0, Metropolitan Museum of Art), via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Jean-Louis-Ernest Meissonier, The Siege of Paris (1870–1871), oil on canvas, 1884",
        "excerpt": "An allegorical Paris, draped in black and a lion's skin, stands defiant before a tattered tricolour as the dead and dying of the blockaded city pile at her feet and a Prussian eagle looms above. Meissonier painted the four-month Prussian encirclement that starved the French capital into surrender in January 1871. The canvas fixes the pathos of a great city sealed off from the world — the ordeal a modern financial and energy blockade is meant to inflict without a shot.",
        "source": "Jean-Louis-Ernest Meissonier, Le Siège de Paris (1870–1871); Musée d'Orsay, Paris (RF 1249), Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Siege_of_Paris.jpg",
        "image": {
          "src": "/covers/eu-21st-sanctions-russia-banks--a5.png",
          "alt": "Meissonier's painting of an allegorical figure of Paris defending the besieged city amid fallen defenders.",
          "credit": "Jean-Louis-Ernest Meissonier, 1884, public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 16
  },
  {
    "slug": "china-taiwan-strait-drills-scarborough",
    "headline": "China stages two days of live-fire drills in the Taiwan Strait and fires a water cannon at a Philippine ship at Scarborough Shoal",
    "overview": "China began two days of live-fire military exercises in the Taiwan Strait, closing parts of the waterway, while its coast guard fired a water cannon at a Philippine fisheries vessel near the disputed Scarborough Shoal in the South China Sea. Manila said its ship faced 'dangerous maneuvers' but reported no injuries or damage. The twin actions marked a fresh escalation of Beijing's pressure on its maritime neighbors.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiowFBVV95cUxQejZfZS1QLTgtdG5SWUNpTlZsTmN0emFuTDBLZU1id0dyeXZrdl9Wc0lHYTc2VnBYcXo5ZzREUEM4QUpyMmNUT21NaWJlN3lqUng1am9Mdm1NUlVUdGdORDA5Ujd5TGZEb3JNb1lpS0EzM2ZIUnJzdUxjNEJMWTZxRGFNTXdobThjOUtoUll2Q2tma29xZ1FwTmFGVzlDa2tUaGVv?oc=5"
      },
      {
        "name": "Rappler",
        "href": "https://www.rappler.com/philippines/china-scarborough-shoal-encounter-july-23-2026/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-23",
    "image": {
      "src": "/covers/china-taiwan-strait-drills-scarborough.png",
      "alt": "A China Coast Guard cutter under way at sea",
      "credit": "Philippine Coast Guard, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 23 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Thucydides, the Melian Dialogue, History of the Peloponnesian War, Book V.89 (416 BCE; Crawley translation)",
        "excerpt": "right, as the world goes, is only in question between equals in power, while the strong do what they can and the weak suffer what they must.",
        "source": "Thucydides, History of the Peloponnesian War, Book 5, ch. 89, trans. Richard Crawley; The Latin Library, Ancient Imperialism readings",
        "href": "https://www.thelatinlibrary.com/imperialism/readings/thucydides8.html"
      },
      {
        "category": "historical",
        "title": "President Millard Fillmore's letter to the Emperor of Japan, delivered by Commodore Matthew C. Perry's squadron (13 November 1852)",
        "excerpt": "I send you this public letter by Commodore Matthew C. Perry, an officer of the highest rank in the navy of the United States, and commander of the squadron now visiting your imperial majesty's dominions. ... These are the only objects for which I have sent Commodore Perry, with a powerful squandron, to pay a visit to your imperial majesty's renowned city of Yedo: friendship, commerce, a supply of coal and provisions, and protection for our shipwrecked people.",
        "source": "Letter from the President of the United States of America to the Emperor of Japan, 13 November 1852; 'The World and Japan' Database, Institute for Advanced Studies on Asia, University of Tokyo",
        "href": "https://worldjpn.net/documents/texts/pw/18521113.O1E.html"
      },
      {
        "category": "literary",
        "title": "Aeschylus, The Persians (472 BCE) — the ghost of Darius on Xerxes chaining the Hellespont (Robert Potter translation)",
        "excerpt": "Hath quickened their arrival, while he hoped\nTo bind the sacred Hellespont, to hold\nThe raging Bosphorus, like a slave, in chains,\nAnd dared the advent'rous passage, bridging firm\nWith links of solid iron his wondrous way,\nTo lead his numerous host; and swell'd with thoughts\nPresumptuous, deem'd, vain mortal! that his power\nShould rise above the gods, and Neptune's might.",
        "source": "Aeschylus, The Persians, trans. Robert Potter; The Internet Classics Archive, classics.mit.edu",
        "href": "https://classics.mit.edu/Aeschylus/persians.html"
      },
      {
        "category": "literary",
        "title": "Jonathan Swift, Gulliver's Travels, Part I 'A Voyage to Lilliput,' Chapter V (1726)",
        "excerpt": "I then took my tackling, and, fastening a hook to the hole at the prow of each, I tied all the cords together at the end. ... I then took up the knotted end of the cables, to which my hooks were tied, and with great ease drew fifty of the enemy's largest men of war after me.",
        "source": "Jonathan Swift, Travels into Several Remote Nations of the World (Gulliver's Travels); Project Gutenberg eBook #829",
        "href": "https://www.gutenberg.org/files/829/829-h/829-h.htm"
      },
      {
        "category": "artistic",
        "title": "Edward Duncan, 'The iron steam ship Nemesis... destroying the Chinese war junks in Anson's Bay, 7 January 1841' (hand-coloured aquatint, 1843)",
        "excerpt": "A single iron paddle-steamer, spitting fire, shatters a huddle of wooden Chinese junks whose splintered masts pitch into the water. The image was Britain's triumphant advertisement of gunboat diplomacy: overwhelming naval technology used to force open a reluctant Asian empire. Read against today's headlines the roles are inverted, a reminder of how a great sea power once humbled at the muzzle of foreign warships now trains its own guns and water cannon on smaller neighbours.",
        "source": "Edward Duncan (1803–1882), coloured aquatint, published 30 May 1843, depicting an East India Company steam warship in the First Opium War; Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Destroying_Chinese_war_junks,_by_E._Duncan_(1843).jpg",
        "image": {
          "src": "/covers/china-taiwan-strait-drills-scarborough--a4.png",
          "alt": "The East India Company steam warship Nemesis firing on and destroying Chinese war junks in Anson's Bay, 7 January 1841, during the First Opium War.",
          "credit": "Edward Duncan (1803–1882), 1843, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Wilhelm von Kaulbach, 'Die Seeschlacht bei Salamis' (The Sea Battle at Salamis), 1868",
        "excerpt": "In a churning, crowded strait, oared warships lock together as an invading armada is broken by a smaller fleet fighting for its home waters. Kaulbach's vast painting stages the decisive contest of antiquity for control of a narrow sea-lane, where geography and nerve, not sheer numbers, decide the outcome. It renders in paint the enduring drama of a confined channel turned into a theatre of power, ambition, and the will of a smaller people to hold its own water.",
        "source": "Wilhelm von Kaulbach (1805–1874), oil on canvas, 1868, in the Senate Hall of the Maximilianeum, Munich; Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Kaulbach,_Wilhelm_von_-_Die_Seeschlacht_bei_Salamis_-_1868.JPG",
        "image": {
          "src": "/covers/china-taiwan-strait-drills-scarborough--a5.png",
          "alt": "Wilhelm von Kaulbach's 1868 painting of the Battle of Salamis, oared warships clashing in a narrow strait as the Persian fleet is defeated by the Greeks.",
          "credit": "Wilhelm von Kaulbach (1805–1874), 1868, public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 17
  },
  {
    "slug": "tropical-storm-bertha-louisiana",
    "headline": "Tropical Storm Bertha makes landfall in southern Louisiana with 45 mph winds",
    "overview": "Tropical Storm Bertha came ashore in St. Bernard Parish, about 40 miles east of New Orleans, with maximum sustained winds near 45 mph, the National Hurricane Center said. Forecasters warned of 1 to 4 inches of rain, isolated 6-inch totals and storm surge of up to 3 feet as the system tracked toward the upper Texas coast. Heavy rain linked to the storm also fed flooding along the mid-Atlantic coast.",
    "genre": "Climate",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMisgFBVV95cUxQemtTejktLV9VZl9XYW9vOEZUNHA5TlkyLXVBbHAxemRNc3RfZGw1eVlWZHRKQzJQbV9HV1ctSlcxVTRvTUFObkNqU0ZXVG9NQWlzWnFaeWVHai1xWEZndTI4Tnp5SXd2Y09nTVgyU0N6SzFtODhsaHBoUHk3V2hERlpXbVU3YVJTLWw0aS1WLVhfQ2JMRTFLNjRRUXk3SFVWMlZTNUZpR0QyTU5sTFpRZmtn?oc=5"
      },
      {
        "name": "NBC News",
        "href": "https://www.nbcnews.com/weather/storms/tropical-storm-bertha-makes-landfall-southern-louisiana-threatening-wi-rcna588774"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-23",
    "image": {
      "src": "/covers/tropical-storm-bertha-louisiana.png",
      "alt": "A satellite image of a tropical storm system coming ashore on the U.S. Gulf Coast",
      "credit": "NOAA / CIRA, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 23 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Great Storm of 1703, recorded by Daniel Defoe in The Storm (1704)",
        "excerpt": "It did not blow so hard till Twelve a Clock at Night, but that most Families went to Bed; though many of them not without some Concern at the terrible Wind, which then blew: But about One, or at least by Two a Clock, 'tis suppos'd, few People, that were capable of any Sense of Danger, were so hardy as to lie in Bed.",
        "source": "Daniel Defoe, The Storm: or, a Collection of the most Remarkable Casualties and Disasters which happen'd in the Late Dreadful Tempest, both by Sea and Land (London, 1704), Project Gutenberg eBook #42234",
        "href": "https://www.gutenberg.org/files/42234/42234-h/42234-h.htm"
      },
      {
        "category": "historical",
        "title": "The Great Galveston Hurricane of 1900, reported by Isaac M. Cline",
        "excerpt": "The water rose at a steady rate from 3 p.m. until about 7:30 p.m., when there was a sudden rise of about four feet in as many seconds. ... There is not a house in Galveston that escaped injury, and there are houses totally wrecked in all parts of the city.",
        "source": "Isaac M. Cline, Special Report on the Galveston Hurricane of September 8, 1900, excerpted from the Monthly Weather Review, September 1900; NOAA National Weather Service Heritage archive",
        "href": "https://vlab.noaa.gov/web/nws-heritage/-/galveston-storm-of-1900",
        "image": {
          "src": "/covers/tropical-storm-bertha-louisiana--a1.png",
          "alt": "A house wrenched and twisted on its foundations amid the wreckage left by the 1900 Galveston hurricane",
          "credit": "Stereograph by Griffith & Griffith, Library of Congress Prints and Photographs Division, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "The Flood in the Book of Genesis (chapter 7), King James Version (1611)",
        "excerpt": "In the six hundredth year of Noah's life, in the second month, the seventeenth day of the month, the same day were all the fountains of the great deep broken up, and the windows of heaven were opened. And the rain was upon the earth forty days and forty nights. ... And the flood was forty days upon the earth; and the waters increased, and bare up the ark, and it was lift up above the earth. And the waters prevailed, and were increased greatly upon the earth; and the ark went upon the face of the waters. And the waters prevailed exceedingly upon the earth; and all the high hills, that were under the whole heaven, were covered.",
        "source": "The Holy Bible, King James Version, Book of Genesis, chapter 7; Project Gutenberg eBook of Genesis (KJV)",
        "href": "https://www.gutenberg.org/cache/epub/8001/pg8001.txt",
        "image": {
          "src": "/covers/tropical-storm-bertha-louisiana--a2.png",
          "alt": "John Martin's apocalyptic painting The Deluge, showing terrified figures overwhelmed by surging floodwaters beneath a darkened sky",
          "credit": "John Martin, The Deluge (1834), Yale Center for British Art, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "The opening tempest of Shakespeare's The Tempest, Act I, Scene 1 (c. 1611)",
        "excerpt": "Heigh my hearts, cheerely, cheerely my harts: yare, yare: Take in the toppe-sale ... A confused noyse within. Mercy on us. We split, we split, Farewell my wife, and children, Farewell brother: we split, we split, we split.",
        "source": "William Shakespeare, The Tempest, Act I, Scene 1 (First Folio text), Project Gutenberg eBook #1135",
        "href": "https://www.gutenberg.org/cache/epub/1135/pg1135.html"
      },
      {
        "category": "artistic",
        "title": "Katsushika Hokusai, Under the Wave off Kanagawa (The Great Wave), c. 1830-1832",
        "excerpt": "Hokusai's colossal wave curls its claw-like crest high over three slender boats, dwarfing the fishermen who cling to their oars in the trough below. Mount Fuji sits tiny and serene on the far horizon, utterly powerless against the towering sea. The print distills the ancient terror of small human vessels caught in the ocean's overwhelming fury, an image that speaks directly to a coast bracing for storm surge.",
        "source": "Katsushika Hokusai, 'Under the Wave off Kanagawa' (The Great Wave), from the series Thirty-six Views of Mount Fuji, colour woodblock print, c. 1830-1832; Wikimedia Commons file page",
        "href": "https://commons.wikimedia.org/wiki/File:Tsunami_by_hokusai_19th_century.jpg",
        "image": {
          "src": "/covers/tropical-storm-bertha-louisiana--a4.png",
          "alt": "A giant cresting wave with clawing foam towers over small boats, with Mount Fuji small in the distance",
          "credit": "Katsushika Hokusai, c. 1830-1832, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Ivan Aivazovsky, The Ninth Wave (1850)",
        "excerpt": "Survivors of a shipwreck cling to a fragment of mast as an enormous swell, the dreaded 'ninth wave' of sailors' lore, rears against a blazing dawn. Aivazovsky paints the sea as at once radiant and merciless, its heaving water vast enough to swallow the tiny knot of clinging figures. The canvas captures the raw vulnerability of human life before the storm-driven sea that this Louisiana landfall threatens anew.",
        "source": "Ivan (Hovhannes) Aivazovsky, The Ninth Wave (1850), oil on canvas, State Russian Museum, Saint Petersburg; Wikimedia Commons file page",
        "href": "https://commons.wikimedia.org/wiki/File:Hovhannes_Aivazovsky_-_The_Ninth_Wave_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/tropical-storm-bertha-louisiana--a5.png",
          "alt": "Shipwreck survivors cling to a mast amid towering storm waves lit by a glowing sunrise",
          "credit": "Ivan Aivazovsky, The Ninth Wave (1850), State Russian Museum, public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 18
  },
  {
    "slug": "france-wildfire-evacuations-heat",
    "headline": "More than 10,000 people evacuated as a wildfire spreads across southwestern France in a Mediterranean heat wave",
    "overview": "A fast-moving wildfire in southwestern France forced the evacuation of more than 10,000 people as flames tore through tinder-dry countryside during a heat wave gripping the Mediterranean. Firefighters battled the blaze from the air and the ground as officials warned of extreme fire risk. The fire is one of several burning across the region, including one of Spain's largest on record.",
    "genre": "Climate",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiuwFBVV95cUxOUmNtQkc1TWJrRl9jMC1IVkVjM05uOVAxSGpZNkZnTXFGTDRHRkR1OWtfUkhPM2NRVXZiNTYteGFadTJPZG9WYjNYZGYyZVRySllSZU5XN0xjeURhQUhaZjZuWFZ2cXNYWDRlQ0NZZF8zZ2ZQNFVjbkswWnNHMzJUTnN4MWgzaTRvRDB3MkRxbWkyMEZmQlVjN2xVcE00aG1EbU5CYWVLTVNRdm5xRnhON1Y3QTNJeS10T0pZ?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cy4kmr82n44o"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-23",
    "image": {
      "src": "/covers/france-wildfire-evacuations-heat.png",
      "alt": "Flames from a wildfire burning through forest at night",
      "credit": "U.S. Forest Service, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 23 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Tacitus on the Great Fire of Rome (Annals 15.38, AD 64)",
        "excerpt": "The blaze in its fury ran first through the level portions of the city, then rising to the hills, while it again devastated every place below them, it outstripped all preventive measures; so rapid was the mischief and so completely at its mercy the city, with those narrow winding passages and irregular streets, which characterised old Rome. Added to this were the wailings of terror-stricken women, the feebleness of age, the helpless inexperience of childhood, the crowds who sought to save themselves or others, dragging out the infirm or waiting for them, and by their hurry in the one case, by their delay in the other, aggravating the confusion.",
        "source": "Tacitus, The Annals, Book 15, ch. 38, trans. Alfred John Church and William Jackson Brodribb; hosted at Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Annals_(Tacitus)/Book_15"
      },
      {
        "category": "historical",
        "title": "Samuel Pepys eyewitness to the Great Fire of London (Diary, 2 September 1666)",
        "excerpt": "Poor Michell's house, as far as the Old Swan, already burned that way, and the fire running further, that in a very little time it got as far as the Steeleyard, while I was there. Everybody endeavouring to remove their goods, and flinging into the river or bringing them into lighters that layoff; poor people staying in their houses as long as till the very fire touched them, and then running into boats, or clambering from one pair of stairs by the water-side to another.",
        "source": "Samuel Pepys, The Diary of Samuel Pepys, entry for 2 September 1666, ed. Henry B. Wheatley; Project Gutenberg",
        "href": "https://www.gutenberg.org/files/4200/4200-h/4200-h.htm"
      },
      {
        "category": "literary",
        "title": "The burning of Troy in Virgil's Aeneid, Book 2 (trans. John Dryden, 1697)",
        "excerpt": "Thus, when a flood of fire by wind is borne, / Crackling it rolls, and mows the standing corn; / Or deluges, descending on the plains, / Sweep o'er the yellow year, destroy the pains / Of lab'ring oxen and the peasant's gains; / Unroot the forest oaks, and bear away / Flocks, folds, and trees, and undistinguish'd prey: / The shepherd climbs the cliff, and sees from far / The wasteful ravage of the wat'ry war.",
        "source": "Virgil, Aeneid, Book 2, lines 298-317, trans. John Dryden; Perseus Digital Library, Tufts University",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0052:book%3D2:card%3D298"
      },
      {
        "category": "literary",
        "title": "Phaethon sets the earth ablaze in Ovid's Metamorphoses, Book 2 (trans. Brookes More, 1922)",
        "excerpt": "The highest altitudes are caught in flames, and as their moistures dry they crack in chasms. The grass is blighted; trees are burnt up with their leaves; the ripe brown crops give fuel for self destruction—Oh what small complaints! Great cities perish with their walls, and peopled nations are consumed to dust— the forests and the mountains are destroyed.",
        "source": "Ovid, Metamorphoses, Book 2, lines 193-300, trans. Brookes More (Boston: Cornhill, 1922); Perseus Digital Library, Tufts University",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0028:book%3D2:card%3D193"
      },
      {
        "category": "artistic",
        "title": "J. M. W. Turner, The Burning of the Houses of Lords and Commons, 16 October 1834 (1835)",
        "excerpt": "Turner paints the night the Palace of Westminster burned, the flames roaring up in a molten column of orange and gold that dissolves stone into pure light. The blaze doubles itself in the black Thames, where a crush of tiny boats and spectators is dwarfed by the conflagration. It is the very image of a landmark consumed and a crowd fleeing before an inferno too vast to fight.",
        "source": "J. M. W. Turner (1775-1851), oil on canvas, Philadelphia Museum of Art; digitized via the Google Art Project on Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Joseph_Mallord_William_Turner,_English_-_The_Burning_of_the_Houses_of_Lords_and_Commons,_October_16,_1834_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/france-wildfire-evacuations-heat--a4.png",
          "alt": "Turner's painting of the Houses of Parliament engulfed in towering orange flames at night, reflected in the Thames as crowds watch from boats and the far bank.",
          "credit": "J. M. W. Turner, The Burning of the Houses of Lords and Commons (1835), Philadelphia Museum of Art, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "John Martin, The Destruction of Sodom and Gomorrah (1852)",
        "excerpt": "Martin stages an apocalypse of fire: whole cities on the plain vanish beneath a sky split open with blood-red flame and a rain of burning destruction. In the foreground tiny figures flee the cataclysm across scorched ground, powerless against the scale of the blaze. His vision of settlements swallowed by an unstoppable firestorm speaks directly to countryside and towns consumed as people run before the flames.",
        "source": "John Martin (1789-1854), oil on canvas, Laing Art Gallery, Newcastle upon Tyne; Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:John_Martin_-_Sodom_and_Gomorrah.jpg",
        "image": {
          "src": "/covers/france-wildfire-evacuations-heat--a5.png",
          "alt": "John Martin's dramatic painting of Sodom and Gomorrah engulfed in fire under a lurid red sky, with small figures fleeing across the darkened foreground.",
          "credit": "John Martin, The Destruction of Sodom and Gomorrah (1852), Laing Art Gallery, public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 19
  },
  {
    "slug": "nestle-water-spinoff-peranel",
    "headline": "Nestle to spin off its bottled-water business into a joint venture, raising about 3 billion euros",
    "overview": "Nestle said it will move its water brands, including Perrier, S.Pellegrino and Acqua Panna, into a new 50-50 joint venture with US investment firm Platinum Equity called Peranel, raising roughly 3 billion euros in cash. The deal values the water business at about 4.9 billion euros and is expected to close in the first half of next year. Nestle is shedding the unit, which has faced legal and environmental scrutiny in France, to focus on faster-growing coffee and snacks.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMimwFBVV95cUxQejZRRDZ3elVHY1lHdjF1UWZ5eUQyczBCNTFPblRmZ0IyUVZqZm9SWEJyYmJmQjhiRUpzRWxjT1FDOEstbjNVekllN1ZnUUs0RGRUNVJSS3BXTWpfcm5lRjNpV2szWXpyN0F6OXVoQ3N1NFF3X2tvWVR6ZFM1N1lSV3k2UzRvVElPeEVUc1R1cWMyaldMMVd5ZDVzMA?oc=5"
      },
      {
        "name": "SWI swissinfo",
        "href": "https://www.swissinfo.ch/eng/agribusiness/nestle-spins-off-its-water-business-into-a-joint-venture/91787865"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-23",
    "image": {
      "src": "/covers/nestle-water-spinoff-peranel.png",
      "alt": "Pallets and containers of French bottled mineral water",
      "credit": "Train Photos, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 23 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Sextus Julius Frontinus, De Aquaeductu Urbis Romae (The Aqueducts of Rome), c. AD 97",
        "excerpt": "Nerva Augustus (an emperor of whom I am at a loss to say whether he devotes more industry or love to the State) has laid upon me the duties of water commissioner, an office which concerns not merely the convenience but also the health and even the safety of the City.",
        "source": "Frontinus, The Aqueducts of Rome, Book I.1-2, trans. Charles E. Bennett (Loeb Classical Library, 1925), Latin text of Clemens Herschel; hosted in the ToposText digital library.",
        "href": "https://topostext.org/work/686"
      },
      {
        "category": "historical",
        "title": "Standard Oil Co. of New Jersey v. United States, 221 U.S. 1 (U.S. Supreme Court, 15 May 1911)",
        "excerpt": "It commanded the dissolution of the combination, and therefore, in effect, directed the transfer by the New Jersey corporation back to the stockholders of the various subsidiary corporations entitled to the same of the stock which had been turned over to the New Jersey company in exchange for its stock.",
        "source": "Opinion of the Court delivered by Chief Justice Edward D. White, United States Reports vol. 221; full text via Wikisource.",
        "href": "https://en.wikisource.org/wiki/Standard_Oil_Co._of_New_Jersey_v._United_States/Opinion_of_the_Court"
      },
      {
        "category": "literary",
        "title": "Samuel Taylor Coleridge, \"The Rime of the Ancient Mariner\" (1798)",
        "excerpt": "Water, water, every where, / And all the boards did shrink; / Water, water, every where, / Nor any drop to drink.",
        "source": "The Rime of the Ancient Mariner, Part the Second; Project Gutenberg (ebook #151).",
        "href": "https://www.gutenberg.org/files/151/151-h/151-h.htm"
      },
      {
        "category": "literary",
        "title": "The Woman at the Well, Gospel of John 4:13-15 (King James Version, 1611)",
        "excerpt": "Jesus answered and said unto her, Whosoever drinketh of this water shall thirst again: But whosoever drinketh of the water that I shall give him shall never thirst; but the water that I shall give him shall be in him a well of water springing up into everlasting life. The woman saith unto him, Sir, give me this water, that I thirst not, neither come hither to draw.",
        "source": "Bible (King James), The Gospel According to St John, chapter 4; Wikisource.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/John"
      },
      {
        "category": "artistic",
        "title": "Jean-Auguste-Dominique Ingres, La Source (The Spring), 1820-1856",
        "excerpt": "Ingres idealizes the spring itself as a young woman tilting an urn from which water endlessly pours, an emblem of purity and inexhaustible natural abundance. That serene image of water freely flowing from its source is precisely what corporate ownership complicates when brands like Perrier and S.Pellegrino turn a spring into a balance-sheet asset. The painting invites the question at the heart of the Nestle spin-off: who owns the source, and at what price does its purity reach the buyer?",
        "source": "Oil on canvas, 163 x 80 cm, Musee d'Orsay, Paris; digital reproduction (Google Art Project) on Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Jean_Auguste_Dominique_Ingres_-_The_Spring_-_Google_Art_Project_2.jpg",
        "image": {
          "src": "/covers/nestle-water-spinoff-peranel--a4.png",
          "alt": "A nude young woman standing against dark rock, tilting an earthenware urn from which a stream of water pours.",
          "credit": "Jean-Auguste-Dominique Ingres, La Source (1856), Musee d'Orsay; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Diego Velazquez, The Waterseller of Seville, c. 1618-1622",
        "excerpt": "Velazquez dignifies the humblest of commerce: a weathered street vendor handing a glass of water, a bead of condensation sliding down the great earthenware jar between them. The painting makes visible the ancient act of putting a price on water, the same transaction now scaled to global bottled-water brands and private-equity balance sheets. As Nestle sells Perrier and Acqua Panna into a new joint venture, the waterseller's transaction is a reminder that turning a spring into merchandise is one of the oldest trades of all.",
        "source": "Oil on canvas, 107.7 x 81.3 cm, Wellington Collection, Apsley House, London; reproduction (Web Gallery of Art) via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Diego_Vel%C3%A1zquez_-_The_Waterseller_of_Seville_-_WGA24366.jpg",
        "image": {
          "src": "/covers/nestle-water-spinoff-peranel--a5.png",
          "alt": "An old water seller in a torn brown cloak hands a glass of water to a boy, a large clay water jar in the foreground.",
          "credit": "Diego Velazquez, The Waterseller of Seville (c. 1620), Apsley House; public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 20
  },
  {
    "slug": "nokia-q2-ai-cloud-profit",
    "headline": "Nokia's quarterly profit beats forecasts as sales to AI and cloud customers double",
    "overview": "Nokia reported comparable second-quarter operating profit up 18% to 434 million euros, beating analyst expectations, as net sales to artificial-intelligence and cloud customers doubled to 446 million euros. The Finnish company, which is selling more optical and network gear to firms building AI data centers, booked 2.8 billion euros in new orders and raised its full-year profit guidance. Comparable net sales reached 4.82 billion euros.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMigAFBVV95cUxPaXFROUYzNzNCV3lTbWU5bTlNYnlDS3o5aUVOZ1FBb2pMOG9sczRaNFFCOUk3cG5vUEwzQ3E2QTRiOG9rbmE1OFR6RU41cGNRRC03MTIwTDBfamJYNk1BbWdZWl8yUmU2d1JvN2lKRHNEZXlKcnFFLUk0cmlOYnRWVg?oc=5"
      },
      {
        "name": "RTE",
        "href": "https://www.rte.ie/news/business/2026/0723/1584736-nokia-quarterly-results/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-23",
    "image": {
      "src": "/covers/nokia-q2-ai-cloud-profit.png",
      "alt": "Rows of servers in a data-center aisle",
      "credit": "BalticServers.com, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 23 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Queen Victoria's message to President Buchanan over the first transatlantic telegraph cable (16 August 1858)",
        "excerpt": "The Queen desires to congratulate the President upon the successful completion of this great international work, in which The Queen has taken the deepest interest. The Queen is convinced that the President will join her in fervently hoping that the electric cable, which now connects Great Britain with the United States, will prove an additional link between the nations, whose friendship is founded upon their common interest and reciprocal esteem.",
        "source": "Wood engraving reproducing the telegraphic messages of Queen Victoria and President James Buchanan sent by trans-Atlantic cable, 16 August 1858; Prints & Photographs Division, Library of Congress.",
        "href": "https://www.loc.gov/item/2005694829/"
      },
      {
        "category": "historical",
        "title": "U.S. Patent 3,711,262, 'Method of Producing Optical Waveguide Fibers,' Corning Glass Works (D. B. Keck & P. C. Schultz), granted 16 January 1973",
        "excerpt": "A METHOD OF PRODUCING AN OPTICAL WAVEGUIDE BY FIRST FORMING A FILM OF GLASS WITH A PRESELECTED INDEX OF REFRACTION ON THE INSIDE WALL OF A GLASS TUBE HAVING A DIFFERENT PRESELECTED INDEX OF REFRACTION. THIS GLASS TUBE AND GLASS FILM COMBINATION IS THEN DRAWN TO REDUCE THE CROSS-SECTIONAL AREA AND TO COLLAPSE THE FILM OF GLASS TO FORM A FIBER HAVING A SOLID CROSS-SECTIONAL AREA; THE CORE BEING FORMED FROM THE GLASS FILM, AND THE CLADDING BEING FORMED FROM THE GLASS TUBE.",
        "source": "United States Patent 3,711,262, Donald B. Keck and Peter C. Schultz, assignors to Corning Glass Works; United States Patent and Trademark Office.",
        "href": "https://patents.google.com/patent/US3711262A/en"
      },
      {
        "category": "literary",
        "title": "Walt Whitman, 'Passage to India,' from Leaves of Grass (1891–1892 edition)",
        "excerpt": "Singing my days,\nSinging the great achievements of the present,\nSinging the strong light works of engineers,\nOur modern wonders, (the antique ponderous Seven outvied,)\nIn the Old World the east the Suez canal,\nThe New by its mighty railroad spann’d,\nThe seas inlaid with eloquent gentle wires; [...] Passage to India!\nLo, soul, seest thou not God’s purpose from the first?\nThe earth to be spann’d, connected by network,\nThe races, neighbors, to marry and be given in marriage,\nThe oceans to be cross’d, the distant brought near,\nThe lands to be welded together.",
        "source": "Walt Whitman, Leaves of Grass (1891–1892), 'Passage to India'; full text, Project Gutenberg eBook No. 1322.",
        "href": "https://www.gutenberg.org/cache/epub/1322/pg1322.txt"
      },
      {
        "category": "literary",
        "title": "Ovid, Metamorphoses, Book XV — the Phoenix (trans. Brookes More, 1922)",
        "excerpt": "Now these I named derive their origin from other living forms. There is one bird which reproduces and renews itself: the Assyrians gave this bird his name—the Phoenix. He does not live either on grain or herbs, but only on small drops of frankincense and juices of amomum. When this bird completes a full five centuries of life straightway with talons and with shining beak he builds a nest among palm branches, where they join to form the palm tree's waving top.",
        "source": "Ovid, Metamorphoses 15.391 ff., English verse translation by Brookes More (Boston: Cornhill, 1922); Theoi Classical Texts Library.",
        "href": "https://www.theoi.com/Text/OvidMetamorphoses15.html"
      },
      {
        "category": "artistic",
        "title": "Robert Charles Dudley, 'Landing the Shore End of the Atlantic Cable' (1865–66)",
        "excerpt": "Dudley's plate shows the great cable being hauled ashore at Newfoundland: a crowd hauls the heavy line up the shingle beach while the cable fleet stands offshore under a luminous sky. The image made visible a moment of pure infrastructure — an unglamorous rope of gutta-percha and iron that would carry a continent's words beneath the ocean. It is the perfect emblem of fortunes and futures turning on the quiet laying of a cable, the arteries of a new era.",
        "source": "Robert Charles Dudley, chromolithograph plate from W. H. Russell, The Atlantic Telegraph (London: Day & Son, 1866); The Metropolitan Museum of Art (CC0), via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Landing_the_Shore_End_of_the_Atlantic_Cable_MET_DP371472.jpg",
        "image": {
          "src": "/covers/nokia-q2-ai-cloud-profit--a4.png",
          "alt": "Chromolithograph of workers hauling the Atlantic telegraph cable ashore on a beach as ships wait offshore",
          "credit": "Robert Charles Dudley, The Metropolitan Museum of Art, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "J. M. W. Turner, 'Rain, Steam and Speed – The Great Western Railway' (1844)",
        "excerpt": "Turner dissolves a Great Western Railway locomotive into a storm of light and rain as it races across Brunel's Maidenhead bridge, the engine's dark boiler the one hard fact in a blur of golden weather. Painted at the height of Britain's railway boom, it is an old master's astonished embrace of a new machine age — the very drama of an established order remade by the arteries of a new technology. For a company laying the optical rails of the AI era, it is a fitting ancestor: the thrill and the fortune of building the infrastructure everyone else will ride.",
        "source": "Joseph Mallord William Turner, oil on canvas, 1844; National Gallery, London (NG538), via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Rain_Steam_and_Speed_the_Great_Western_Railway.jpg",
        "image": {
          "src": "/covers/nokia-q2-ai-cloud-profit--a5.png",
          "alt": "Turner painting of a steam locomotive crossing a bridge through rain and golden mist at speed",
          "credit": "J. M. W. Turner, National Gallery, London, public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 21
  },
  {
    "slug": "intel-amd-china-server-cpu-deals",
    "headline": "Intel and AMD sign long-term server-chip supply deals with Chinese buyers as prices jump more than 40 percent",
    "overview": "Intel and AMD are locking in longer-term purchase commitments with Chinese data-center customers for server processors as prices surge, sources told Reuters, with server-CPU prices up more than 40% since January and lead times stretching to six months. The deals typically secure volumes for about a year, and in some cases two, as the AI boom spreads demand beyond graphics chips to the processors that run servers, storage and networking. Intel was said to be largely sold out of server CPUs for 2026.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiywFBVV95cUxQTUIxX2ZqcHFIWTA3T2dfWk1fZFJLdU5nMk5FcldiVmt5eUJrcWhrdmd3bnhzTDVKN0c3TlpsTmdhYTdDUEJ0MUljdy1xMmkxOHFvRG9WSGFjUmdEQ1VvTjZYQWhJQjV6QnF4a3p0aVB1dWdVOUQ5bnVIcnZVckJDaEZTaURSSV9FbG9jVEtnRndmTEU2R19iQjc4QkRaMUJtaE5YTmFMS1ZWcGk3RU5GeGhNU3djVFBsQWxDMERleWlVUG1ERnNkdHNxUQ?oc=5"
      },
      {
        "name": "Rappler",
        "href": "https://www.rappler.com/technology/intel-amd-long-term-server-cpu-deals-china-clients/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-23",
    "image": {
      "src": "/covers/intel-amd-china-server-cpu-deals.png",
      "alt": "Computer server processor chips arranged on a dark surface",
      "credit": "PantheraLeo1359531, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 23 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Thales corners the olive-presses of Miletus and Chios — Aristotle, Politics I.11 (c. 350 BCE)",
        "excerpt": "Thales, so the story goes, because of his poverty was taunted with the uselessness of philosophy; but from his knowledge of astronomy he had observed while it was still winter that there was going to be a large crop of olives, so he raised a small sum of money and paid round deposits for the whole of the olive-presses in Miletus and Chios, which he hired at a low rent as nobody was running him up; and when the season arrived, there was a sudden demand for a number of presses at the same time, and by letting them out on what terms he liked he realized a large sum of money, so proving that it is easy for philosophers to be rich if they choose, but this is not what they care about.",
        "source": "Aristotle, Politics, Book 1, section 1259a, trans. H. Rackham; Perseus Digital Library, Tufts University.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0058:book%3D1:section%3D1259a"
      },
      {
        "category": "historical",
        "title": "Jay Gould and James Fisk attempt to corner the U.S. gold market — Black Friday, 24 September 1869",
        "excerpt": "It is evident that the tendency of gold was downward, and that the movement of the conspirators was wholly artificial and unnatural, and that its effects were most disastrous to the legitimate business of the country. It dealt a heavy blow to our credit abroad by shaking the faith of foreign capitalists in the stability of our trade and the honesty of our people.",
        "source": "United States Congress, House Committee on Banking and Currency, Investigation into the Causes of the Gold Panic (Report of the Majority), March 1, 1870 (Washington: Government Printing Office); digitized from the Cornell University Library copy at the Internet Archive.",
        "href": "https://archive.org/details/cu31924032442679"
      },
      {
        "category": "literary",
        "title": "Midas and the golden touch — Ovid, Metamorphoses, Book XI (8 CE)",
        "excerpt": "but when he touched the gift of Ceres with his right hand, instantly the gift of Ceres stiffened to gold; or if he tried to bite with hungry teeth a tender bit of meat, the dainty, as his teeth but touched it, shone at once with yellow shreds and flakes of gold. And wine, another gift of Bacchus, when he mixed it in pure water, can be seen in his astonished mouth as liquid gold.",
        "source": "Ovid, Metamorphoses, Book 11, lines 85 ff., trans. Brookes More; Perseus Digital Library, Tufts University.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0028:book%3D11:card%3D85"
      },
      {
        "category": "literary",
        "title": "Volpone worships his hoard of gold — Ben Jonson, Volpone; or, The Fox, Act I, Scene 1 (1606)",
        "excerpt": "Good morning to the day; and next, my gold: Open the shrine, that I may see my Saint. Hail the world's soul, and mine! more glad than is The teeming earth to see the long'd-for sun Peep through the horns of the celestial Ram, Am I, to view thy splendour darkening his; That lying here, amongst my other hoards, Shew'st like a flame by night; or like the day Struck out of chaos, when all darkness fled Unto the centre.",
        "source": "Ben Jonson, Volpone; or, The Fox (1606), Act I, Scene 1; Project Gutenberg eBook #4039.",
        "href": "https://www.gutenberg.org/files/4039/4039-h/4039-h.htm"
      },
      {
        "category": "artistic",
        "title": "The Moneylender and His Wife — Quentin Massys (1514), oil on panel, Musée du Louvre",
        "excerpt": "Massys paints a moneylender absorbed in weighing gold coins and jewels on a delicate balance, his eyes fixed on the metal rather than the pious book his wife holds half-forgotten. The convex mirror on the table and the meticulous still life of coins turn a private counting-house into a meditation on avarice and the pull of accumulated wealth. It is the merchant's calculating gaze, appraising scarce value in his own hands, that the picture makes unforgettable.",
        "source": "Quentin Massys, The Moneylender and His Wife, 1514, oil on panel, Musée du Louvre, Paris; file page at Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Massysm_Quentin_%E2%80%94_The_Moneylender_and_his_Wife_%E2%80%94_1514.jpg",
        "image": {
          "src": "/covers/intel-amd-china-server-cpu-deals--a4.png",
          "alt": "A moneylender weighs gold coins on a balance scale while his wife, distracted from her illustrated prayer book, watches the money.",
          "credit": "Quentin Massys, The Moneylender and His Wife (1514), Musée du Louvre, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "The Moneychanger and His Wife — Marinus van Reymerswaele (1539), oil on panel, Museo del Prado",
        "excerpt": "Reymerswaele crowds the panel with a moneychanger and his wife bent over stacks of copper, silver and gold, weighing each coin on a small hand-scale as ledgers and money-bags press in around them. The wife's devotional book lies open but ignored, eclipsed by the glitter of the coins she cannot stop watching. The painting frames hoarding as an all-consuming trade, where those who hold the metal set its worth.",
        "source": "Marinus van Reymerswaele, The Moneychanger and His Wife, 1539, oil on panel, Museo del Prado, Madrid; file page at Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Marinus_Claesz._van_Reymerswaele_001.jpg",
        "image": {
          "src": "/covers/intel-amd-china-server-cpu-deals--a5.png",
          "alt": "A moneychanger weighs coins on a small balance while his wife looks up from an illuminated book to watch the gold and silver on the table.",
          "credit": "Marinus van Reymerswaele, The Moneychanger and His Wife (1539), Museo del Prado, public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 22
  },
  {
    "slug": "debra-broz-superorganisms-seattle",
    "headline": "Debra Broz's 'Superorganisms,' ceramic hybrids cut from thrift-store figurines, debut at the Seattle Art Fair",
    "overview": "Sculptor Debra Broz unveiled new works from her 'Superorganisms' series at Antler Gallery's booth at the Seattle Art Fair, which runs July 23 to 26. Broz saws apart secondhand porcelain figurines of cats, rabbits, horses and birds and reassembles them into uncanny many-limbed creatures that look at once familiar and impossible. Three sculptures titled 'Biblical Angel' anchor the presentation.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Colossal",
        "href": "https://www.thisiscolossal.com/2026/07/debra-broz-superorganisms-ceramics-found-objects-sculpture/"
      },
      {
        "name": "Antler Gallery",
        "href": "https://antlerpdx.com/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-23",
    "image": {
      "src": "/covers/debra-broz-superorganisms-seattle.png",
      "alt": "An uncanny multi-limbed sculpture assembled from cut-up porcelain animal figurines",
      "credit": "Debra Broz, via Colossal"
    },
    "edition": "Morning Edition · 23 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Human-headed winged lion (lamassu), Neo-Assyrian, reign of Ashurnasirpal II, 883–859 B.C.",
        "excerpt": "Nearly three millennia before Debra Broz, Assyrian sculptors were already assembling new beings from familiar parts: the lamassu fuses a human head, a lion's body, a bird's wings and a horned divine crown into a single guardian. The carver even gave the figure five legs, so it stands firmly when seen from the front but strides forward when viewed from the side. Like Broz's spliced menagerie, it turns recognizable animals into a composite creature meant to unsettle and awe those who pass before it.",
        "source": "Human-headed winged lion (lamassu), gypsum alabaster, from the Northwest Palace at Nimrud (Kalhu), Neo-Assyrian; The Metropolitan Museum of Art, New York (acc. no. 32.143.2).",
        "href": "https://www.metmuseum.org/art/collection/search/322609"
      },
      {
        "category": "historical",
        "title": "P. T. Barnum on the \"Fejee Mermaid,\" Struggles and Triumphs (1869)",
        "excerpt": "This was the curiosity which had fallen into Mr. Kimball’s hands. I requested my naturalist’s opinion of the genuineness of the animal and he said he could not conceive how it could have been manufactured, for he never saw a monkey with such peculiar teeth, arms, hands, etc., and he never saw a fish with such peculiar fins; but he did not believe in mermaids. … Since Japan has been opened to the outer world it has been discovered that certain “artists” in that country manufacture a great variety of fabulous animals, with an ingenuity and mechanical perfection well calculated to deceive. No doubt my mermaid was a specimen of this curious manufacture.",
        "source": "P. T. Barnum, Struggles and Triumphs; or, Forty Years' Recollections of P. T. Barnum, ch. VIII; Project Gutenberg eBook #50115.",
        "href": "https://www.gutenberg.org/cache/epub/50115/pg50115.txt"
      },
      {
        "category": "literary",
        "title": "Ovid, Metamorphoses, Book I (c. 8 A.D.; Garth–Dryden translation)",
        "excerpt": "Of bodies chang'd to various forms, I sing:\nYe Gods, from whom these miracles did spring,\nInspire my numbers with coelestial heat;\n'Till I my long laborious work compleat:\nAnd add perpetual tenour to my rhimes,\nDeduc'd from Nature's birth, to Caesar's times.",
        "source": "Ovid, Metamorphoses, Book the First, trans. Sir Samuel Garth, John Dryden et al.; The Internet Classics Archive, MIT.",
        "href": "https://classics.mit.edu/Ovid/metam.1.first.html"
      },
      {
        "category": "literary",
        "title": "Mary Shelley, Frankenstein; or, The Modern Prometheus (1818)",
        "excerpt": "It was on a dreary night of November that I beheld the accomplishment of my toils. With an anxiety that almost amounted to agony, I collected the instruments of life around me, that I might infuse a spark of being into the lifeless thing that lay at my feet. It was already one in the morning; the rain pattered dismally against the panes, and my candle was nearly burnt out, when, by the glimmer of the half-extinguished light, I saw the dull yellow eye of the creature open; it breathed hard, and a convulsive motion agitated its limbs.",
        "source": "Mary Wollstonecraft Shelley, Frankenstein; or, The Modern Prometheus, ch. 5; Project Gutenberg eBook #84.",
        "href": "https://www.gutenberg.org/cache/epub/84/pg84.txt",
        "image": {
          "src": "/covers/debra-broz-superorganisms-seattle--a3.png",
          "alt": "Theodor von Holst's engraved frontispiece to the 1831 edition of Frankenstein, showing the newly animated creature and its horrified maker.",
          "credit": "Theodor von Holst, frontispiece to the 1831 edition of Frankenstein, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Chimera of Arezzo, Etruscan bronze, c. 400 B.C.",
        "excerpt": "The Chimera of Arezzo is antiquity's definitive many-limbed hybrid: a lion whose spine erupts into a second head, a goat's, while its tail resolves into a striking serpent. Cast in bronze around 400 B.C., it fuses three familiar animals into one snarling, impossible body, exactly the operation Broz performs with a bandsaw on thrift-store cats, rabbits and horses. Its wounded, bristling menace shows how old the impulse is to make a single creature that should not, by nature, exist.",
        "source": "Chimera of Arezzo, Etruscan votive bronze, ca. 400 B.C.; Museo Archeologico Nazionale, Florence; file via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Chimera_d%27arezzo,_fi,_04.JPG",
        "image": {
          "src": "/covers/debra-broz-superorganisms-seattle--a4.png",
          "alt": "Etruscan bronze Chimera of Arezzo: a snarling lion with a goat's head rising from its back and a serpent tail.",
          "credit": "Photograph by Sailko, CC BY-SA 3.0, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Giuseppe Arcimboldo, Vertumnus (Emperor Rudolf II), 1591",
        "excerpt": "Arcimboldo assembles an entire human likeness out of harvested parts: a pear for a nose, corn and pea-pods for the cheeks and chin, cherries and blackberries for the eyes, a whole orchard massed into the head of Emperor Rudolf II. Like Broz's 'Superorganisms,' it is a portrait built from found things, familiar produce made strange by the act of recombination. Both artists prove that recognizable fragments, reassembled with care, can conjure a wholly new and uncanny being.",
        "source": "Giuseppe Arcimboldo, Vertumnus (portrait of Emperor Rudolf II), oil on panel, 1591; Skokloster Castle, Sweden; file via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Giuseppe_Arcimboldo_-_Rudolf_II_of_Habsburg_as_Vertumnus_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/debra-broz-superorganisms-seattle--a5.png",
          "alt": "Giuseppe Arcimboldo's Vertumnus: a portrait of Emperor Rudolf II composed entirely of fruits, vegetables and flowers.",
          "credit": "Giuseppe Arcimboldo, 1591, public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 23
  },
  {
    "slug": "cinerama-dome-reopen-alamo-sony",
    "headline": "Sony's Alamo Drafthouse announces a deal to reopen Hollywood's Cinerama Dome and the former ArcLight, dark since 2020",
    "overview": "Sony Pictures' Alamo Drafthouse chain said it will lease and reopen the landmark Cinerama Dome and the adjoining former ArcLight Hollywood multiplex, which have sat empty since the pandemic closed them in 2020. The Dome will keep its name while the 14-screen complex becomes an Alamo Drafthouse showing new releases and repertory films in formats including 35mm and 70mm. Construction is set to begin in August, with reopening planned for 2028.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMiiwFBVV95cUxQRXlrV1VOYWR5NEI0elNZZVFxSjJzNjZOc2hVQmZXMXNhQ2xTZk5jQm5FMDRVSFpvSExlM2VTOHZXY2RXeUp1MDBOdzFkQnRQTXAyeHZVUEpDNlhydkNpRmdGa2g1UENKcTJFT3d1WVc5YWNqSkFhNktRZkZpcFR3NzY3bFhxemVqNzcw?oc=5"
      },
      {
        "name": "Deadline",
        "href": "https://deadline.com/2026/07/cinerama-dome-hollywood-arclight-sony-deal-1236999607/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-23",
    "image": {
      "src": "/covers/cinerama-dome-reopen-alamo-sony.png",
      "alt": "The geodesic concrete dome of Hollywood's Cinerama Dome theater",
      "credit": "UpdateNerd, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 23 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Theatre of Dionysus, Athens, described by Pausanias (Description of Greece, 2nd century AD)",
        "excerpt": "The oldest sanctuary of Dionysus is near the theater. Within the precincts are two temples and two statues of Dionysus, the Eleuthereus (Deliverer) and the one Alcamenes made of ivory and gold. In the theater the Athenians have portrait statues of poets, both tragic and comic, but they are mostly of undistinguished persons. With the exception of Menander no poet of comedy represented here won a reputation, but tragedy has two illustrious representatives, Euripides and Sophocles.",
        "source": "Pausanias, Description of Greece 1.20.3-1.21.1, trans. W. H. S. Jones (Loeb Classical Library), Theoi Classical Texts Library",
        "href": "https://www.theoi.com/Text/Pausanias1B.html",
        "image": {
          "src": "/covers/cinerama-dome-reopen-alamo-sony--a0.png",
          "alt": "Architectural reconstruction drawing of the ancient Theatre of Dionysus on the slope of the Athenian Acropolis, its stone seating curving around the orchestra and stage.",
          "credit": "Reconstruction of the Theatre of Dionysus, Athens, by Ernst R. Fiechter, 1914, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "Teatro La Fenice, Venice, reborn from the ashes: fire of 1996, reopening in 2003",
        "excerpt": "Venice's great opera house, whose name means 'the Phoenix,' had already risen once from an 1836 blaze when arson gutted it again on 29 January 1996, leaving only the outer walls standing. The city chose to rebuild it exactly com'era, dov'era, 'as it was, where it was,' painstakingly recreating the gilded, tiered auditorium under modern safety codes. On 14 December 2003 La Fenice reopened, a lost temple of spectacle restored plush and glittering to the audiences who had mourned it.",
        "source": "Teatro La Fenice official Historical Archive (Archivio Storico), Venice",
        "href": "https://www.teatrolafenice.it/archivio-storico/"
      },
      {
        "category": "literary",
        "title": "The Chorus's Prologue to Henry V, William Shakespeare (c. 1599)",
        "excerpt": "O for a Muse of fire, that would ascend / The brightest heaven of invention, / A kingdom for a stage, princes to act / And monarchs to behold the swelling scene! ... But pardon, and gentles all, / The flat unraised spirits that have dared / On this unworthy scaffold to bring forth / So great an object: can this cockpit hold / The vasty fields of France? or may we cram / Within this wooden O the very casques / That did affright the air at Agincourt?",
        "source": "William Shakespeare, The Life of King Henry the Fifth, Prologue spoken by the Chorus; text via MIT Shakespeare (Globe/Moby edition)",
        "href": "https://shakespeare.mit.edu/henryv/full.html"
      },
      {
        "category": "literary",
        "title": "The Allegory of the Cave, Plato, Republic Book VII (c. 375 BC)",
        "excerpt": "And now, I said, let me show in a figure how far our nature is enlightened or unenlightened:--Behold! human beings living in a underground den, which has a mouth open towards the light and reaching all along the den; here they have been from their childhood, and have their legs and necks chained so that they cannot move, and can only see before them, being prevented by the chains from turning round their heads. Above and behind them a fire is blazing at a distance, and between the fire and the prisoners there is a raised way; and you will see, if you look, a low wall built along the way, like the screen which marionette players have in front of them, over which they show the puppets. ... Like ourselves, I replied; and they see only their own shadows, or the shadows of one another, which the fire throws on the opposite wall of the cave?",
        "source": "Plato, The Republic, Book VII, trans. Benjamin Jowett; Project Gutenberg eBook #1497",
        "href": "https://www.gutenberg.org/cache/epub/1497/pg1497.txt",
        "image": {
          "src": "/covers/cinerama-dome-reopen-alamo-sony--a3.png",
          "alt": "1604 engraving of Plato's cave: chained figures seated before a wall watch shadows cast by statues and a bright light, while others turn toward the daylight of the cave mouth.",
          "credit": "Jan Saenredam after Cornelis van Haarlem, Antrum Platonicum (Plato's Cave), 1604, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "The Melodrama (Le Drame), Honore Daumier, c. 1856-1860",
        "excerpt": "Daumier paints not the stage but the darkened house: rows of upturned faces massed in shadow, rapt and tense before a violently lit tableau of murder. The footlights carve the actors out of blackness in sharp chiaroscuro while the crowd dissolves into a single transfixed body. It is the communal wonder of the theatre itself, the way a whole room can be held spellbound by illusion.",
        "source": "Honore Daumier, The Melodrama, oil on canvas, Neue Pinakothek, Munich; artwork file page on Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Honor%C3%A9_Daumier_026.jpg",
        "image": {
          "src": "/covers/cinerama-dome-reopen-alamo-sony--a4.png",
          "alt": "Daumier painting of a theatre audience seen from the dark auditorium, faces lit from below, gazing at a brightly lit melodramatic scene on stage.",
          "credit": "Honore Daumier, The Melodrama (Le Drame), c. 1856-1860, Neue Pinakothek, Munich, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "La Loge (The Theatre Box), Pierre-Auguste Renoir, 1874",
        "excerpt": "Renoir frames the night out itself: a woman in a black-and-white striped gown at the front of her theatre box, her companion lifting opera glasses to the crowd beyond. The picture is less about the play than the glamour of going, the ritual of dressing, arriving, and being seen inside a palace of spectacle. It captures the social magic of the moving-picture house's ancestor, the shared occasion of the great auditorium.",
        "source": "Pierre-Auguste Renoir, La Loge, oil on canvas, Courtauld Gallery, London; artwork file page on Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:La_Loge_Pierre-Auguste_Renoir_1874FXD.jpg",
        "image": {
          "src": "/covers/cinerama-dome-reopen-alamo-sony--a5.png",
          "alt": "Renoir painting of an elegantly dressed woman in a theatre box wearing a black-and-white striped gown, with a man behind her raising opera glasses.",
          "credit": "Pierre-Auguste Renoir, La Loge (The Theatre Box), 1874, Courtauld Gallery, London, public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 24
  },
  {
    "slug": "totalenergies-q2-profit-oil",
    "headline": "TotalEnergies posts its strongest quarterly profit in nearly three years as the Iran conflict drives up oil prices",
    "overview": "TotalEnergies reported adjusted net income of $6 billion for the second quarter, up 67% from a year earlier and its best result in nearly three years, as the conflict with Iran pushed Brent crude to average about $97 a barrel. Profit from refining and chemicals surged 362% to $1.8 billion on strong fuel margins and oil trading. The French energy major's results underscore how the war has enriched oil producers while squeezing consumers.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMizAFBVV95cUxPMzBfZ2dVYUNDa2lMZlVQYXFfSWU3bWlaZjRVTV9DM0V3NjRDN2pvWnRhMVE4T2RwYXhGdTd1ZEMybWE4ekJGcC1Oa3lsWnFwQ1ZISE5XcUZOazlVaEZQaU9jLTQ2UmstZkZ3UWw5amhGQU1TTVY4VGRXX2R6d0xOMENmTmlYTHBKOGJnRTNDdzVZQ1p3NXA0alZSOVJxV0dwS3AxQkliUkpES0hneVdYMmtjNFpERW1TRkNUVDN5Z2E?oc=5"
      },
      {
        "name": "Global Banking & Finance",
        "href": "https://www.globalbankingandfinance.com/totalenergies-q2-profit-up-67-higher-oil-price-strong/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-23",
    "image": {
      "src": "/covers/totalenergies-q2-profit-oil.png",
      "alt": "An oil refinery's towers and pipework at dusk",
      "credit": "Xepheid, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 23 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Cicero, De Officiis (On Duties), Book III.50 — the grain merchant of Rhodes (c. 44 BCE)",
        "excerpt": "Suppose, for example, a time of dearth and famine at Rhodes, with provisions at fabulous prices; and suppose that an honest man has imported a large cargo of grain from Alexandria and that to his certain knowledge also several other importers have set sail from Alexandria ... is he to report the fact to the Rhodians or is he to keep his own counsel?",
        "source": "Marcus Tullius Cicero, De Officiis, Book III, section 50, trans. Walter Miller (Loeb Classical Library, 1913); Perseus Digital Library, Tufts University",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A2007.01.0048%3Abook%3Dpos%3D3%3Asection%3D50"
      },
      {
        "category": "historical",
        "title": "President Jimmy Carter, Energy Address to the Nation (April 5, 1979) — windfall profits of the oil companies amid the Iran-driven oil shock",
        "excerpt": "Part of this excessive new profit will be totally unearned—what is called a 'windfall' profit ... We must, therefore, impose a windfall profits tax on the oil companies to capture part of this money for the American people.",
        "source": "Jimmy Carter, 'Energy Address to the Nation,' April 5, 1979; Gerhard Peters and John T. Woolley, The American Presidency Project, University of California, Santa Barbara",
        "href": "https://www.presidency.ucsb.edu/documents/energy-address-the-nation"
      },
      {
        "category": "literary",
        "title": "John Milton, Paradise Lost, Book I — Mammon rifling the bowels of the earth for treasure (1667)",
        "excerpt": "Mammon led them on— / Mammon, the least erected Spirit that fell / From Heaven; for even in Heaven his looks and thoughts / Were always downward bent, admiring more / The riches of heaven's pavement, trodden gold, / Than aught divine or holy else enjoyed / In vision beatific. By him first / Men also, and by his suggestion taught, / Ransacked the centre, and with impious hands / Rifled the bowels of their mother Earth / For treasures better hid.",
        "source": "John Milton, Paradise Lost, Book I (the description of Mammon, the least erected spirit); Project Gutenberg eBook #26",
        "href": "https://www.gutenberg.org/files/26/26-h/26-h.htm"
      },
      {
        "category": "literary",
        "title": "George Bernard Shaw, Major Barbara, Act II — Andrew Undershaft, the armaments maker whose faith is 'Money and gunpowder' (1905)",
        "excerpt": "CUSINS ... have you any religion? UNDERSHAFT. Yes. CUSINS. Anything out of the common? UNDERSHAFT. Only that there are two things necessary to Salvation. ... UNDERSHAFT. The two things are— CUSINS. Baptism and— UNDERSHAFT. No. Money and gunpowder.",
        "source": "George Bernard Shaw, Major Barbara (first performed 1905); Project Gutenberg eBook #3790",
        "href": "https://www.gutenberg.org/files/3790/3790-h/3790-h.htm"
      },
      {
        "category": "artistic",
        "title": "Nicolas Poussin, The Adoration of the Golden Calf (1633–1634)",
        "excerpt": "Poussin's canvas stages the ancient temptation at the heart of any windfall: a crowd dancing in ecstatic worship around an idol of gold while Moses, unseen behind them, descends with the law. The gilded calf glows against the darkening sky as the people abandon everything to adore wealth itself — a fitting emblem for an age that reveres the riches a crisis throws up, however they were won.",
        "source": "Nicolas Poussin, oil on canvas, National Gallery, London (NG5597); file page on Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Nicolas_Poussin_-_The_Adoration_of_the_Golden_Calf_-_WGA18293.jpg",
        "image": {
          "src": "/covers/totalenergies-q2-profit-oil--a4.png",
          "alt": "Painting of a crowd dancing and kneeling in worship around a golden calf raised on a pedestal, with a robed priest gesturing and Moses descending in the background.",
          "credit": "Nicolas Poussin (1594–1665), National Gallery, London; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Vasily Vereshchagin, The Apotheosis of War (1871)",
        "excerpt": "A pyramid of human skulls rises on a scorched plain before a ruined city, crows wheeling around it under a pitiless sky. Vereshchagin dedicated the picture 'to all conquerors, past, present and to come,' insisting that the true harvest of war is not treasure but the dead — the suffering from which others' fortunes are ultimately wrung.",
        "source": "Vasily Vereshchagin, oil on canvas, Tretyakov Gallery, Moscow; file page on Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:1871_Vereshchagin_Apotheose_des_Krieges_anagoria.JPG",
        "image": {
          "src": "/covers/totalenergies-q2-profit-oil--a5.png",
          "alt": "Painting of a large pyramid of human skulls on a barren plain outside a ruined city, with black crows circling in a hazy sky.",
          "credit": "Vasily Vereshchagin (1842–1904), Tretyakov Gallery, Moscow; public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 25
  },
  {
    "slug": "greece-israel-achilles-shield-air-defence",
    "headline": "Greece approves the purchase of a 3.5 billion euro Israeli air-defense system",
    "overview": "Greece's government security council approved the purchase of a multi-layer air-defense system from Israel worth up to 3.5 billion euros ($4 billion), plus several types of drones, in one of Athens' largest-ever defense deals. The network, dubbed 'Achilles' Shield,' will be built around radars and missiles from Israel's Rafael and Israel Aerospace Industries to guard cities, military bases and energy sites against aircraft, ballistic missiles and drones. It is part of a roughly 28 billion euro plan to modernize the Greek armed forces by 2036.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMivwFBVV95cUxQZWUydERDck5OUFpNOXZyQ3FwdzJhemdFdDRhNFZLeXBGQ3VNMWg4SUNnWjk4ZTZYVmMyNGY3OExkYnVMUzhhVVFyVDNnRHVnVlh4UDdSaHZhRVpiZGlFemg5RXpSUnMwVy1uWXR4X0F2MGJvZEJfYVo2QldLQlhPVFB3MDFmYldDZ2tFOU1WU21SbkJrVmdHRk8yblZyb0s0V3gtaEh1b1RfYmE2OVpkcjYtZFBacF9UcThXMFVjcw?oc=5"
      },
      {
        "name": "The Jerusalem Post",
        "href": "https://www.jpost.com/international/article-903399"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-23",
    "image": {
      "src": "/covers/greece-israel-achilles-shield-air-defence.png",
      "alt": "A David's Sling air-defense interceptor missile launching skyward",
      "credit": "U.S. Missile Defense Agency, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 23 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The rebuilding of the walls of Athens under Themistocles (479 BCE), in Thucydides, History of the Peloponnesian War, Book I",
        "excerpt": "In this way the Athenians walled their city in a little while. To this day the building shows signs of the haste of its execution; the foundations are laid of stones of all kinds, and in some places not wrought or fitted, but placed just in the order in which they were brought by the different hands; and many columns, too, from tombs, and sculptured stones were put in with the rest. For the bounds of the city were extended at every point of the circumference; and so they laid hands on everything without exception in their haste.",
        "source": "Thucydides, History of the Peloponnesian War, Book I.93, trans. Richard Crawley (London, 1874); Project Gutenberg eBook #7142",
        "href": "https://www.gutenberg.org/cache/epub/7142/pg7142.txt"
      },
      {
        "category": "historical",
        "title": "The Maginot Line — labelled cross-section of the Franco-German fortifications (drawing, 14 April 1938)",
        "excerpt": "Between the wars France buried a nation's fear of its neighbour in concrete and steel, threading casemates, gun turrets and buried galleries in an unbroken line along the German frontier. This 1938 cutaway lays the whole system open like an anatomical chart — layered armour against a blow everyone expected but hoped never to feel. Like Greece's multi-tier 'Achilles' Shield,' it was a state's attempt to make defence itself into architecture, betting survival on a fortified line rather than on the open field.",
        "source": "Drawing showing a labelled cross-section of the fortifications along the Maginot Line between France and Germany, published 14 April 1938; Prints & Photographs Division, Library of Congress (reproduction no. LC-USZ62-132632)",
        "href": "https://www.loc.gov/item/2003668313/"
      },
      {
        "category": "literary",
        "title": "The Shield of Achilles forged by Hephaestus — Homer, Iliad, Book XVIII (trans. Samuel Butler, 1898)",
        "excerpt": "First he shaped the shield so great and strong, adorning it all over and binding it round with a gleaming circuit in three layers; and the baldric was made of silver. He made the shield in five thicknesses, and with many a wonder did his cunning hand enrich it. He wrought the earth, the heavens, and the sea; the moon also at her full and the untiring sun, with all the signs that glorify the face of heaven—the Pleiads, the Hyads, huge Orion, and the Bear, which men also call the Wain and which turns round ever in one place, facing Orion, and alone never dips into the stream of Oceanus.",
        "source": "Homer, The Iliad, Book XVIII, trans. Samuel Butler (1898); Project Gutenberg eBook #2199",
        "href": "https://www.gutenberg.org/cache/epub/2199/pg2199.txt",
        "image": {
          "src": "/covers/greece-israel-achilles-shield-air-defence--a2.png",
          "alt": "Engraved reconstruction of the Shield of Achilles as described in Homer's Iliad, with concentric bands of scenes around a central star",
          "credit": "Angelo Monticelli, c. 1820, from 'Le Costume Ancien ou Moderne', public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Building the walls of Jerusalem with weapons in hand — Nehemiah 4:16–18 (King James Version, 1611)",
        "excerpt": "And it came to pass from that time forth, that the half of my servants wrought in the work, and the other half of them held both the spears, the shields, and the bows, and the habergeons; and the rulers were behind all the house of Judah. They which builded on the wall, and they that bare burdens, with those that laded, every one with one of his hands wrought in the work, and with the other hand held a weapon. For the builders, every one had his sword girded by his side, and so builded. And he that sounded the trumpet was by me.",
        "source": "The Book of Nehemiah 4:16–18, King James Version (1611); Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Nehemiah",
        "image": {
          "src": "/covers/greece-israel-achilles-shield-air-defence--a3.png",
          "alt": "Gustave Doré wood engraving of Nehemiah surveying the ruined, broken-down walls and burned gates of Jerusalem before rebuilding them",
          "credit": "Gustave Doré, 1866 (La Grande Bible de Tours), public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "The Shield of Achilles — John Flaxman, silver-gilt reconstruction executed by Rundell, Bridge & Rundell (1821)",
        "excerpt": "Flaxman turned Homer's verbal shield into a real object: a great gilded disc where earth, sea and the wheeling constellations ring a central sunburst, and bands of life — cities at peace and cities at war — armour the hero's whole world in miniature. The impulse is the same one behind Greece's layered air defence: to gather everything worth protecting behind a single, encircling shield. That a defensive system should be named for this shield is no accident — it is the West's oldest image of protection made craft.",
        "source": "John Flaxman, The Shield of Achilles, silver gilt, manufactured by Rundell, Bridge & Rundell, 1821; photograph by Thad Zajdowicz; Wikimedia Commons file page",
        "href": "https://commons.wikimedia.org/wiki/File:Flaxman_shield_of_achilles_cc0_pub_dom_photo_by_Thad_Zajdowicz_flickr_thadz_31680177383_a12794660a_o.jpg",
        "image": {
          "src": "/covers/greece-israel-achilles-shield-air-defence--a4.png",
          "alt": "Silver-gilt reconstruction of the Shield of Achilles designed by John Flaxman, with a radiant central boss surrounded by concentric relief scenes",
          "credit": "John Flaxman / Rundell, Bridge & Rundell (1821); photograph by Thad Zajdowicz (CC0), public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Thetis Receiving the Armour of Achilles from Hephaestus — Anthony van Dyck (workshop), c. 1630–1632",
        "excerpt": "Van Dyck paints the moment of arming: the sea-goddess Thetis reaches for the shield and helmet the smith-god has forged, the newly beaten metal catching the light as divine craft is handed over for mortal defence. It is the ancient scene behind every modern procurement — a people receiving, at cost and with anxiety, the armour meant to keep the coming blow from its body. Greece taking delivery of its Israeli-built shield replays this exchange of protection for peril on a national scale.",
        "source": "Anthony van Dyck (workshop), Thetis Receiving Armour for Achilles from Hephaestus, oil on canvas, c. 1630–1632, Bildergalerie, Sanssouci, Potsdam; Wikimedia Commons file page",
        "href": "https://commons.wikimedia.org/wiki/File:Dyck,_Anthony_van_-_Thetis_receiving_armour_for_Achilles_from_Hephaestus_-_Bildergalerie_Sanssouci.jpeg",
        "image": {
          "src": "/covers/greece-israel-achilles-shield-air-defence--a5.png",
          "alt": "Baroque painting of the goddess Thetis receiving the freshly forged armour and shield of Achilles from Hephaestus in his workshop",
          "credit": "Anthony van Dyck (workshop), c. 1630–1632, Bildergalerie Sanssouci, public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 26
  },
  {
    "slug": "trump-iran-bridges-power-plants-hormuz",
    "headline": "Trump threatens to destroy an Iranian bridge or power plant for every ship attacked in the Strait of Hormuz",
    "overview": "President Trump said the United States would strike an Iranian bridge or power plant in retaliation for each commercial vessel that Iran attacks in the Strait of Hormuz, sharply escalating the confrontation over the vital oil chokepoint. The warning came as Iran-linked forces menaced shipping through the strait, through which roughly a fifth of the world's oil passes. European aviation authorities added Jordan to a no-fly warning list as the wider regional fighting continued.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMinwFBVV95cUxQVkxVRHNEai1jeXMzeVdPZVZqZmJvUjBqdTY5ZVZyWEp5bC0yWFJTWldhSlhlbFhoRmEwcFBnNkk0UWdDdHZMWFRXMk5acElxZEFSQ0otZzFQRElSMXdER1NlT0ptZUxVbTRPT3dFM25rOGtsb08yLUdXRll4SkhUZk9QejZ2RWZrb1hLcmhBYktXeEhrTTZIR3FTSTN6RUk?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cdrv0p37k8jo"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-22",
    "image": {
      "src": "/covers/trump-iran-bridges-power-plants-hormuz.png",
      "alt": "A U.S. Navy frigate passing an oil tanker in the Strait of Hormuz",
      "credit": "U.S. Navy, via Wikimedia Commons"
    },
    "lead": true,
    "edition": "Evening Edition · 22 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Xerxes Scourges the Hellespont (Herodotus, 480 BC)",
        "excerpt": "When Xerxes heard of that, he was very angry, and gave command that the Hellespont be scourged with three hundred lashes, and a pair of fetters be thrown into the sea; nay, I have heard ere now that he sent branders with the rest to brand the Hellespont. This is certain, that he charged them while they scourged to utter words outlandish and presumptuous: “Thou bitter water,” they should say, “our master thus punishes thee, because thou didst him wrong albeit he had done thee none. Yea, Xerxes the king will pass over thee, whether thou wilt or no; it is but just that no man offers thee sacrifice, for thou art a turbid and a briny river.” Thus he commanded that the sea should be punished, and that they who had been overseers of the bridging of the Hellespont should be beheaded.",
        "source": "Herodotus, The Persian Wars, Book VII.35, trans. A. D. Godley, via Wikisource",
        "href": "https://en.wikisource.org/wiki/Herodotus_The_Persian_Wars_(Godley)/Book_VII",
        "image": {
          "src": "/covers/trump-iran-bridges-power-plants-hormuz--a0.png",
          "alt": "Engraving of soldiers lashing the waters of the Hellespont with whips at the command of the Persian king Xerxes, who watches from the shore.",
          "credit": "Anonymous illustration, “Xerxes' punishment of the Hellespont,” 1909 print. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "Operation Praying Mantis: America's Reprisal in the Gulf (1988)",
        "excerpt": "In response to this attack on the ROBERTS and commencing at approximately 1:00 a.m. (EDT), April 18, 1988, Armed Forces of the United States assigned to the Joint Task Force Middle East, after warning Iranian personnel and providing an opportunity to escape, attacked and effectively neutralized the Sassan and Sirri Platforms, which have been used to support unlawful Iranian attacks on non-belligerent shipping. … These necessary and proportionate actions by U.S. Armed Forces were taken at my specific direction in the exercise of our inherent right of self-defense.",
        "source": "President Ronald Reagan, Letter to the Speaker of the House and the President Pro Tempore of the Senate on the United States Military Strike in the Persian Gulf, April 19, 1988 (Operation Praying Mantis), Ronald Reagan Presidential Library & Museum",
        "href": "https://www.reaganlibrary.gov/archives/speech/letter-speaker-house-representatives-and-president-pro-tempore-senate-united-4",
        "image": {
          "src": "/covers/trump-iran-bridges-power-plants-hormuz--a1.png",
          "alt": "Smoke and flames pour from the Iranian Sassan oil platform in the Persian Gulf after it was struck by U.S. forces during Operation Praying Mantis, 18 April 1988.",
          "credit": "U.S. Navy / Department of Defense photograph, “Sassan Oil Platform Burns, 1988.” Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Running the Strait of Scylla and Charybdis (Homer's Odyssey)",
        "excerpt": "Then we entered the Straits in great fear of mind, for on the one hand was Scylla, and on the other dread Charybdis kept sucking up the salt water. As she vomited it up, it was like the water in a cauldron when it is boiling over upon a great fire, and the spray reached the top of the rocks on either side. When she began to suck again, we could see the water all inside whirling round and round, and it made a deafening sound as it broke against the rocks. … While we were taken up with this, and were expecting each moment to be our last, Scylla pounced down suddenly upon us and snatched up my six best men.",
        "source": "Homer, The Odyssey, Book XII, trans. Samuel Butler (1900), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/1727/1727-h/1727-h.htm",
        "image": {
          "src": "/covers/trump-iran-bridges-power-plants-hormuz--a2.png",
          "alt": "Henry Fuseli's painting of Odysseus standing in the prow of his ship, shield raised, as his crew rows through the narrow strait between the monsters Scylla and Charybdis.",
          "credit": "Henry Fuseli (Johann Heinrich Füssli), “Odysseus in front of Scylla and Charybdis,” 1794–1796, Aargauer Kunsthaus. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Lex Talionis: A Life for a Life (Exodus 21)",
        "excerpt": "And if any mischief follow, then thou shalt give life for life, Eye for eye, tooth for tooth, hand for hand, foot for foot, Burning for burning, wound for wound, stripe for stripe.",
        "source": "Exodus 21:23–25, King James Version (1611), via Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Exodus",
        "image": {
          "src": "/covers/trump-iran-bridges-power-plants-hormuz--a3.png",
          "alt": "Rembrandt's painting of Moses holding aloft the two stone tablets inscribed with the Hebrew text of the Law.",
          "credit": "Rembrandt van Rijn, “Moses with the Ten Commandments,” 1659, Gemäldegalerie, Berlin. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "The Battle of Salamis (Wilhelm von Kaulbach, 1868)",
        "excerpt": "Kaulbach's vast history painting depicts the moment the outnumbered Greek fleet trapped and shattered Xerxes' navy inside the narrow strait off Salamis in 480 BC. The canvas seethes with capsizing galleys, drowning warriors and the smoke of ruin, while the Persian king watches his sea power destroyed from a throne on the heights. It is the archetypal image of a great power's fleet caught and annihilated in a chokepoint it thought it controlled — the same logic of narrow waters and naval reprisal now invoked over the Strait of Hormuz.",
        "source": "Wilhelm von Kaulbach, Die Seeschlacht bei Salamis (The Battle of Salamis), 1868, Maximilianeum, Munich",
        "href": "https://commons.wikimedia.org/wiki/File:Kaulbach,_Wilhelm_von_-_Die_Seeschlacht_bei_Salamis_-_1868.JPG",
        "image": {
          "src": "/covers/trump-iran-bridges-power-plants-hormuz--a4.png",
          "alt": "Monumental painting of the naval Battle of Salamis: Greek and Persian galleys collide and sink in a narrow strait crowded with struggling warriors, with figures triumphing in the foreground.",
          "credit": "Wilhelm von Kaulbach, “Die Seeschlacht bei Salamis,” 1868, Maximilianeum, Munich. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "“Rule, Britannia!” — Command of the Seas (Thomas Arne, 1740)",
        "excerpt": "Thomas Arne's anthem, composed for the masque Alfred in 1740, set to music a nation's claim to dominate the world's sea lanes: “Rule, Britannia! Britannia rule the waves.” It is the sound of maritime supremacy as a political weapon — the conviction that command of the water lets one power dictate who may pass and whose trade may flow. That doctrine of ruling the chokepoints, and threatening any rival who challenges it, echoes directly in the contest over the Strait of Hormuz.",
        "source": "Thomas Augustine Arne, “Rule, Britannia!” from the masque Alfred (1740); score via IMSLP (International Music Score Library Project)",
        "href": "https://imslp.org/wiki/Rule_Britannia_(Arne,_Thomas_Augustine)",
        "image": {
          "src": "/covers/trump-iran-bridges-power-plants-hormuz--a5.png",
          "alt": "Portrait of the English composer Thomas Augustine Arne, seated at a keyboard with sheet music.",
          "credit": "Portrait of Thomas Augustine Arne (1710–1778), composer of “Rule, Britannia!” Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 27
  },
  {
    "slug": "alphabet-capex-205-billion-cloud-earnings",
    "headline": "Google parent Alphabet lifts its 2026 capital-spending forecast to as much as $205 billion after a cloud-driven earnings beat",
    "overview": "Alphabet raised its full-year capital-expenditure guidance to a range of $195 billion to $205 billion, citing surging demand for artificial-intelligence infrastructure, after reporting quarterly revenue that topped estimates on 82% growth in its cloud business. Executives said the company remained in a supply-constrained environment and would keep investing as long as returns looked attractive. The forecast underscored how heavily the largest technology firms are betting on AI capacity.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiowFBVV95cUxPNTZyTWZjRUFlVHJzZlUxbjIzNFI4OUt5WG1WR1ZtV0U0OHlBSVpJQm10VFJiYy1zcjhHUGpYTlVRWWduUjJHd19OYW1aaTZ4ZE81V3FOU1AwQVFmVzJaeEFHYkJJNUJxQzRVZFF1dDVjLTdpNjR2bTBIN1BrVTZXMUNUaWxBVkQ3VEZBNThMeWNxRnk1RnMtLTlUS0UtNGJNNkQ4?oc=5"
      },
      {
        "name": "CNBC",
        "href": "https://www.cnbc.com/2026/07/22/google-earnings-q2-goog-live-updates.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-22",
    "image": {
      "src": "/covers/alphabet-capex-205-billion-cloud-earnings.png",
      "alt": "Rows of servers glowing in a data center, evoking the AI infrastructure buildout",
      "credit": "BalticServers.com, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 22 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Herodotus on the Great Pyramid of Cheops (c. 440 BC)",
        "excerpt": "They said that Egypt until the time of King Rhampsinitus was altogether well-governed and prospered greatly, but that Kheops, who was the next king, brought the people to utter misery. For first he closed all the temples, so that no one could sacrifice there; and next, he compelled all the Egyptians to work for him.",
        "source": "Herodotus, The Histories, Book 2.124, trans. A. D. Godley (1920), Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0126:book=2:chapter=124",
        "image": {
          "src": "/covers/alphabet-capex-205-billion-cloud-earnings--a0.png",
          "alt": "The pyramids of Giza rising from the desert plateau under a clear sky.",
          "credit": "Photo by Ricardo Liberato, 'All Gizah Pyramids', via Wikimedia Commons (CC BY-SA 2.0)"
        }
      },
      {
        "category": "historical",
        "title": "The South Sea Bubble of 1720, from Mackay's 'Extraordinary Popular Delusions'",
        "excerpt": "The inordinate thirst of gain that had afflicted all ranks of society was not to be slaked even in the South Sea. Other schemes, of the most extravagant kind, were started. The share-lists were speedily filled up, and an enormous traffic carried on in shares, while, of course, every means were resorted to to raise them to an artificial value in the market.",
        "source": "Charles Mackay, Memoirs of Extraordinary Popular Delusions, Vol. 1, 'The South-Sea Bubble' (1841), Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/24518/pg24518.txt",
        "image": {
          "src": "/covers/alphabet-capex-205-billion-cloud-earnings--a1.png",
          "alt": "William Hogarth's satirical engraving of the South Sea Bubble, a crowded London scene of speculators and ruin.",
          "credit": "William Hogarth, 'The South Sea Scheme' (1721), British Museum, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Percy Bysshe Shelley, 'Ozymandias' (1818)",
        "excerpt": "And on the pedestal these words appear:\n'My name is Ozymandias, king of kings:\nLook on my works, ye Mighty, and despair!'\nNothing beside remains. Round the decay\nOf that colossal wreck, boundless and bare\nThe lone and level sands stretch far away.",
        "source": "Percy Bysshe Shelley, 'Ozymandias', in The Complete Poetical Works (ed. Hutchinson, 1914), Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Complete_Poetical_Works_of_Percy_Bysshe_Shelley_(ed._Hutchinson,_1914)/Ozymandias",
        "image": {
          "src": "/covers/alphabet-capex-205-billion-cloud-earnings--a2.png",
          "alt": "The colossal granite bust of Ramesses II, the 'Younger Memnon', in the British Museum, the statue that inspired Shelley's poem.",
          "credit": "Colossal bust of Ramesses II (the 'Younger Memnon'), British Museum, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Anthony Trollope, 'The Way We Live Now' (1875)",
        "excerpt": "The object of Fisker, Montague, and Montague was not to make a railway to Vera Cruz, but to float a company. Paul thought that Mr. Fisker seemed to be indifferent whether the railway should ever be constructed or not. It was clearly his idea that fortunes were to be made out of the concern before a spadeful of earth had been moved.",
        "source": "Anthony Trollope, The Way We Live Now, Ch. IX, 'The Great Railway to Vera Cruz' (1875), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/5231/5231-h/5231-h.htm",
        "image": {
          "src": "/covers/alphabet-capex-205-billion-cloud-earnings--a3.png",
          "alt": "Portrait photograph of the Victorian novelist Anthony Trollope.",
          "credit": "Public-domain photographic portrait of Anthony Trollope, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "J. M. W. Turner, 'Rain, Steam and Speed - The Great Western Railway' (1844)",
        "excerpt": "Turner flings a black locomotive of the Great Western Railway hurtling across a rain-lashed bridge, its firebox glowing as it outruns the storm. Land, water and sky dissolve into a golden blur of steam and speed, the new machine tearing through an older, sublime landscape. It is the industrial building boom painted as elemental force: thrilling, unstoppable, and faintly terrifying.",
        "source": "J. M. W. Turner, oil on canvas, 1844, The National Gallery, London (NG538)",
        "href": "https://www.nationalgallery.org.uk/paintings/joseph-mallord-william-turner-rain-steam-and-speed-the-great-western-railway",
        "image": {
          "src": "/covers/alphabet-capex-205-billion-cloud-earnings--a4.png",
          "alt": "Turner's painting of a steam train speeding across a bridge through rain, mist and golden light.",
          "credit": "J. M. W. Turner, 'Rain, Steam and Speed - The Great Western Railway' (1844), The National Gallery, London, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Richard Wagner, 'Das Rheingold' (1869)",
        "excerpt": "Wagner's cycle opens with gold glimmering untouched in the depths of the Rhine, until the dwarf Alberich forswears love to seize it and forge a ring of limitless power. To pay the giants who have built his colossal fortress, Valhalla, the god Wotan must plunder that same hoard, and the curse it carries dooms everyone who craves it. The whole drama is an overture to greed: a race to amass a treasure whose price is destruction.",
        "source": "Richard Wagner, Das Rheingold (Der Ring des Nibelungen), WWV 86A, full orchestral score, IMSLP",
        "href": "https://imslp.org/wiki/Das_Rheingold,_WWV_86A_(Wagner,_Richard)",
        "image": {
          "src": "/covers/alphabet-capex-205-billion-cloud-earnings--a5.png",
          "alt": "Arthur Rackham's illustration of the Rhinemaidens circling the glowing Rhinegold from Wagner's 'Das Rheingold'.",
          "credit": "Arthur Rackham, illustration for 'The Rhinegold & The Valkyrie' (1910), via Wikimedia Commons"
        }
      }
    ],
    "rank": 28
  },
  {
    "slug": "tesla-q2-2026-profit-miss-cash-burn",
    "headline": "Tesla posts a steep quarterly profit miss and its first cash burn since 2024 as AI and robotics spending surges",
    "overview": "Tesla reported second-quarter adjusted earnings of 33 cents a share, far below Wall Street forecasts, and a free-cash-flow deficit of about $1.1 billion, its first cash-burning quarter since early 2024, as capital spending more than doubled to $5.8 billion. Record deliveries of about 480,000 vehicles failed to translate into stronger profits, with operating income falling 57% from a year earlier. The company attributed the outlays to heavy investment in AI infrastructure, robotaxis and its Optimus robot.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMivgFBVV95cUxPUEtwQkhZU00zSGZYcmdzNmhEY0VUUUtyc1ZVbHV1OW80Mnd3OHlTaEh5OFFEbkZPUGt6Um5jQWRRb0tBRVZhb3MzQ21Vb2FNT0VaWlNkcThLX2V3d04zSGY4S29xUC1odU9rMGNWWWQyVVNBSUlEWUt6WkNkODJnUnFvNFhpTEZiQWNUemVrcksxZk0wb0ZpQi1ZeWtDdThJOTJkNHI4MDBaYnBCa241LXVnVE9sdzZzZ0E5SFVn?oc=5"
      },
      {
        "name": "Electrek",
        "href": "https://electrek.co/2026/07/22/tesla-tsla-q2-2026-financial-results/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-22",
    "image": {
      "src": "/covers/tesla-q2-2026-profit-miss-cash-burn.png",
      "alt": "Rows of newly built Tesla cars parked at the factory",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 22 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "John Law and the Mississippi Scheme (1720)",
        "excerpt": "It glittered afar, like a palace of crystals and diamonds; but there came one warm breeze from the south, and the stately building dissolved away, till none were able even to gather up the fragments. So with Law and his paper system. No sooner did the breath of popular mistrust blow steadily upon it, than it fell to ruins, and none could raise it up again.",
        "source": "Charles Mackay, Memoirs of Extraordinary Popular Delusions (1841), 'The Mississippi Scheme'",
        "href": "https://www.gutenberg.org/files/636/636-h/636-h.htm",
        "image": {
          "src": "/covers/tesla-q2-2026-profit-miss-cash-burn--a0.png",
          "alt": "Eighteenth-century portrait of the Scottish financier John Law, architect of the Mississippi Scheme",
          "credit": "Portrait of John Law (18th century); photograph by Rama, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "Nikola Tesla's Wardenclyffe Tower (1901-1906)",
        "excerpt": "Here was a stupendous possibility of achievement. If we could produce electric effects of the required quality, this whole planet and the conditions of existence on it could be transformed.",
        "source": "Nikola Tesla, My Inventions (Electrical Experimenter, 1919)",
        "href": "https://en.wikisource.org/wiki/My_Inventions",
        "image": {
          "src": "/covers/tesla-q2-2026-profit-miss-cash-burn--a1.png",
          "alt": "Tesla's unfinished Wardenclyffe wireless transmission tower on Long Island, photographed in 1904",
          "credit": "Wardenclyffe (Tesla Broadcast Tower), 1904, unattributed photographer; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Honore de Balzac, The Quest of the Absolute (1834)",
        "excerpt": "She fully understood the deliberate ardor, the well-considered, inalterable steadfastness of Balthazar; if it were indeed true that he was seeking to make gold, he was capable of throwing his last crust into the crucible with absolute indifference.",
        "source": "Honore de Balzac, The Alkahest (La Recherche de l'Absolu), trans. Katharine Prescott Wormeley",
        "href": "https://www.gutenberg.org/files/1453/1453-h/1453-h.htm",
        "image": {
          "src": "/covers/tesla-q2-2026-profit-miss-cash-burn--a2.png",
          "alt": "Portrait photograph of the novelist Honore de Balzac, 1842",
          "credit": "Honore de Balzac, 1842, daguerreotype by Louis-Auguste Bisson; Paris Musees, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Herman Melville, Moby-Dick (1851)",
        "excerpt": "'How many barrels will thy vengeance yield thee even if thou gettest it, Captain Ahab? it will not fetch thee much in our Nantucket market.' 'Nantucket market! Hoot! ... If money's to be the measurer, man ... then, let me tell thee, that my vengeance will fetch a great premium here!'",
        "source": "Herman Melville, Moby-Dick; or, The Whale (1851), ch. 36 'The Quarter-Deck'",
        "href": "https://www.gutenberg.org/files/2701/2701-h/2701-h.htm",
        "image": {
          "src": "/covers/tesla-q2-2026-profit-miss-cash-burn--a3.png",
          "alt": "Currier & Ives lithograph of whalers in small boats attacking a sperm whale",
          "credit": "'Whaling of Sperm Whale', Currier & Ives, 1850s; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Pieter Bruegel the Elder, The Tower of Babel (1563)",
        "excerpt": "Bruegel's vast, spiralling tower climbs into the clouds, its upper storeys still crawling with cranes and laborers even as the lower stonework already cracks and tilts. The colossal enterprise, raised by human ambition to reach heaven itself, is monumental and doomed in the same breath, a megaproject whose grandeur and folly are fused in one overreaching structure.",
        "source": "Pieter Bruegel the Elder, The Tower of Babel (1563), oil on panel, Kunsthistorisches Museum, Vienna (inv. GG 1026)",
        "href": "https://www.khm.at/en/artworks/the-tower-of-babel-323",
        "image": {
          "src": "/covers/tesla-q2-2026-profit-miss-cash-burn--a4.png",
          "alt": "Pieter Bruegel's painting of the Tower of Babel, an immense unfinished spiral tower under construction",
          "credit": "Pieter Bruegel the Elder, The Tower of Babel, 1563, Kunsthistorisches Museum Vienna; public domain, via Wikimedia Commons (Google Art Project)"
        }
      },
      {
        "category": "artistic",
        "title": "Richard Wagner, Das Rheingold - The Entry of the Gods into Valhalla (1869)",
        "excerpt": "In Wagner's opera the god Wotan commissions Valhalla, a gleaming fortress meant to secure his power forever, but he cannot pay the giant builders except with stolen, cursed gold. As the orchestra swells and the gods stride across the rainbow bridge into their radiant new citadel, the music already darkens with the doom that this borrowed splendor has set in motion, a triumphant edifice mortgaged against ruin.",
        "source": "Richard Wagner, Das Rheingold, WWV 86A, full orchestral score (1869)",
        "href": "https://imslp.org/wiki/Das_Rheingold,_WWV_86A_(Wagner,_Richard)",
        "image": {
          "src": "/covers/tesla-q2-2026-profit-miss-cash-burn--a5.png",
          "alt": "Painted portrait of the composer Richard Wagner, circa 1862",
          "credit": "Richard Wagner, c. 1862, painting by Casar Willich; public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 29
  },
  {
    "slug": "amd-anthropic-ai-server-deal-5-billion",
    "headline": "AMD agrees to sell Anthropic tens of billions of dollars in AI servers and invest up to $5 billion in the startup",
    "overview": "Advanced Micro Devices said it would supply Anthropic with tens of billions of dollars' worth of AI servers built around its coming Instinct MI450 chips and invest as much as $5 billion in the Claude maker, with the investment tied to deployment milestones. The chips are scheduled to begin shipping in the first half of 2027 and mark AMD's latest push to challenge Nvidia's dominance in AI hardware. Analysts called it another 'circular' deal in which chipmakers back the AI firms that are among their biggest customers.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMilAFBVV95cUxQRjQ4V2RqTUl4bWRtck5LZy1ST1VZNVBzcmswTUVyc3ZGcFNJeXlrRHpkUUIybkZSLUhoQXJtYUFKOHkzam15amh0dW5POHg2alBDMTRPRDQyWUUwUXBaX1czSWQtSGpXYlFvcGFRQ1p0WFZ3bndQYzlqdmZQSnN6NUhfbTdVYWZZNnBxYXZUYktkcVZu?oc=5"
      },
      {
        "name": "CNBC",
        "href": "https://www.cnbc.com/2026/07/22/amd-anthropic-ai-chip-investment.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-22",
    "image": {
      "src": "/covers/amd-anthropic-ai-server-deal-5-billion.png",
      "alt": "A silicon wafer catching iridescent light, evoking the AI chips at the center of the deal",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 22 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "France Arms the American Rebels: The Treaty of Alliance (1778)",
        "excerpt": "The essential and direct End of the present defensive alliance is to maintain effectually the liberty, Sovereignty, and independance absolute and unlimited of the said united States, as well in Matters of Gouvernement as of commerce.",
        "source": "Treaty of Alliance between the United States and France, Article 2 (February 6, 1778), U.S. National Archives",
        "href": "https://www.archives.gov/milestone-documents/treaty-of-alliance-with-france",
        "image": {
          "src": "/covers/amd-anthropic-ai-server-deal-5-billion--a0.png",
          "alt": "First handwritten page of the 1778 Treaty of Alliance between the United States and France.",
          "credit": "The U.S. National Archives, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "historical",
        "title": "Picks and Shovels of the California Gold Rush",
        "excerpt": "Gold-mining is nature's great lottery scheme. A man may work in a claim for many months, and be poorer at the end of the time than when he commenced, or he may take out thousands in a few hours. It is a mere matter of chance.",
        "source": "Louise Amelia Knapp Smith Clappe ('Dame Shirley'), The Shirley Letters from California Mines in 1851-52, Letter Fifteenth",
        "href": "https://www.gutenberg.org/files/23280/23280-h/23280-h.htm",
        "image": {
          "src": "/covers/amd-anthropic-ai-server-deal-5-billion--a1.png",
          "alt": "Painting of California Gold Rush miners working a sluice with picks, shovels and a water flume in the Sierras.",
          "credit": "Charles Christian Nahl, 'Miners in the Sierras' (1851-52), Smithsonian American Art Museum, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "literary",
        "title": "Shylock's Bond in The Merchant of Venice",
        "excerpt": "Goe with me to a Notarie, seale me there Your single bond, and in a merrie sport If you repaie me not on such a day, In such a place, such sum or sums as are Exprest in the condition, let the forfeite Be nominated for an equall pound Of your faire flesh, to be cut off and taken In what part of your bodie it pleaseth me",
        "source": "William Shakespeare, The Merchant of Venice, Act I, Scene 3 (Shylock to Antonio)",
        "href": "https://www.gutenberg.org/cache/epub/2243/pg2243-images.html",
        "image": {
          "src": "/covers/amd-anthropic-ai-server-deal-5-billion--a2.png",
          "alt": "Painting of Shylock and Tubal conferring over the money and the bond in The Merchant of Venice.",
          "credit": "Herbert Stoppelaer, 'Shylock and Tubal from The Merchant of Venice', via Google Art Project / Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "literary",
        "title": "Faust's Pact with Mephistopheles",
        "excerpt": "Here, an unwearied slave, I’ll wear thy tether, And to thine every nod obedient be: When There again we come together, Then shalt thou do the same for me.",
        "source": "Johann Wolfgang von Goethe, Faust, Part I, 'The Study' (trans. Bayard Taylor), Mephistopheles to Faust",
        "href": "https://www.gutenberg.org/files/14591/14591-h/14591-h.htm",
        "image": {
          "src": "/covers/amd-anthropic-ai-server-deal-5-billion--a3.png",
          "alt": "Delacroix print of Faust riding with the devil Mephistopheles through the Harz mountains.",
          "credit": "Eugene Delacroix, 'Faust and Mephistopheles in the Hartz Mountains', The Metropolitan Museum of Art (CC0), via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Wagner's Homage March to His Patron King Ludwig II",
        "excerpt": "A stately, brass-laden processional that Wagner composed in 1864 as an act of homage to the eighteen-year-old King Ludwig II of Bavaria, whose sudden patronage had just lifted the composer out of debt and exile. Its swelling grandeur is the sound of an artist glorifying the benefactor who bankrolled his vision, the funding that would eventually raise the festival house at Bayreuth. The dedication seals the bargain in music: the king's treasury made the art possible, and the art was turned to the king's praise.",
        "source": "Richard Wagner, Huldigungsmarsch (Homage March), WWV 97 (1864), dedicated to Ludwig II of Bavaria, IMSLP",
        "href": "https://imslp.org/wiki/Huldigungsmarsch,_WWV_97_(Wagner,_Richard)",
        "image": {
          "src": "/covers/amd-anthropic-ai-server-deal-5-billion--a4.png",
          "alt": "Photographic portrait of composer Richard Wagner, Paris, 1861.",
          "credit": "Photograph of Richard Wagner by Pierre Petit, Paris 1861, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Quentin Metsys, The Moneylender and His Wife (1514)",
        "excerpt": "A moneylender tips gold coins onto his balance scale, weighing their worth with total absorption, while his wife's hand pauses over an illuminated prayer book, her eyes drawn from devotion to the glinting metal. Pearls, rings and stacked coins crowd the table, and a small convex mirror in the foreground reflects a window and a distant figure, pulling the viewer into the transaction. Painted in Antwerp in 1514, it is an unflinching study of capital and the grip it holds on those who handle it.",
        "source": "Quentin Metsys, The Moneylender and His Wife (Le Preteur et sa femme), 1514, oil on panel, Musee du Louvre",
        "href": "https://collections.louvre.fr/en/ark:/53355/cl010061690",
        "image": {
          "src": "/covers/amd-anthropic-ai-server-deal-5-billion--a5.png",
          "alt": "Renaissance painting of a moneylender weighing gold coins on a scale beside his wife, who holds a prayer book.",
          "credit": "Quentin Metsys, 'The Moneylender and His Wife' (1514), via Web Gallery of Art / Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 30
  },
  {
    "slug": "paramount-warner-bros-eu-approval",
    "headline": "EU clears Paramount's $110 billion takeover of Warner Bros. Discovery as US states challenge the deal",
    "overview": "The European Commission approved Paramount Skydance's $110 billion acquisition of Warner Bros. Discovery after the company agreed to end a longstanding film-distribution arrangement with Universal Pictures in Europe and divest a related joint-venture stake. The clearance removes a major regulatory hurdle even as the deal faces mounting resistance in the United States, where a federal judge paused it after states raised antitrust concerns. The merger would unite two of Hollywood's largest studios.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMitwFBVV95cUxOLTZpR1FMN3VoQXVtYTd6MEJJV2QxVVp0Z3JsTXQ5Sm91NU5sZHhpdE1PdEU2eDRmUDdNbHpCQy1zLXg0R0V5THM3QjgzU2ZWd0dUM0pTVjlyRjMwUWdvc2ZTSm5leHlDUXFpM2c4cUNNOHN4QnIxV2xLUnJ4SG05a3pvRlRtS1ptZzBGM2RvYTByTERmRGo5RmFlZTM5QXU5dHptbkx1LURrMjVjck1jVEl2dkFSOTg?oc=5"
      },
      {
        "name": "CNBC",
        "href": "https://www.cnbc.com/2026/07/22/european-commission-paramount-wbd-approval.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-22",
    "image": {
      "src": "/covers/paramount-warner-bros-eu-approval.png",
      "alt": "Sound-stage buildings on the Paramount Pictures studio lot in Los Angeles",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 22 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The marriage of Antony and Octavia: a union of convenience between rival giants",
        "excerpt": "...they hoped that Octavia, who, besides her great beauty, had intelligence and dignity, when united to Antony and beloved by him, as such a woman naturally must be, would restore harmony and be their complete salvation.",
        "source": "Plutarch, Life of Antony 31 (Bernadotte Perrin translation, Loeb Classical Library), via LacusCurtius, University of Chicago",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Plutarch/Lives/Antony*.html",
        "image": {
          "src": "/covers/paramount-warner-bros-eu-approval--a0.png",
          "alt": "Ancient silver cistophorus of 39 BC showing the laureate head of Mark Antony on the obverse and the draped bust of Octavia on the reverse, struck to celebrate their political marriage.",
          "credit": "Coin of Mark Antony and Octavia, cistophorus, Ephesus, 39 BC. Photo: Classical Numismatic Group (CNG), via Wikimedia Commons, CC BY-SA 3.0."
        }
      },
      {
        "category": "historical",
        "title": "The Sherman Antitrust Act: the Gilded Age reply to consolidation",
        "excerpt": "Every contract, combination in the form of trust or otherwise, or conspiracy, in restraint of trade or commerce among the several States, or with foreign nations, is hereby declared to be illegal.",
        "source": "Sherman Antitrust Act of 1890, Section 1 (An act to protect trade and commerce against unlawful restraints and monopolies), via Wikisource",
        "href": "https://en.wikisource.org/wiki/Sherman_Act",
        "image": {
          "src": "/covers/paramount-warner-bros-eu-approval--a1.png",
          "alt": "Studio portrait photograph of Senator John Sherman of Ohio, seated, whose name was given to the 1890 antitrust act.",
          "credit": "Senator John Sherman, Brady-Handy Collection, Library of Congress Prints and Photographs Division. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Romeo and Juliet: two great houses joined at last",
        "excerpt": "Two households, both alike in dignity, / In fair Verona, where we lay our scene, / From ancient grudge break to new mutiny, / Where civil blood makes civil hands unclean.",
        "source": "William Shakespeare, Romeo and Juliet, Prologue (The Chorus), via Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/1513/pg1513-images.html",
        "image": {
          "src": "/covers/paramount-warner-bros-eu-approval--a2.png",
          "alt": "Frank Dicksee's 1884 oil painting of Romeo and Juliet embracing on the balcony at dawn.",
          "credit": "Frank Bernard Dicksee, 'Romeo and Juliet' (1884), Southampton City Art Gallery. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Frank Norris's The Octopus: the monopoly as an all-devouring monster",
        "excerpt": "...abruptly Presley saw again, in his imagination, the galloping monster, the terror of steel and steam, with its single eye, cyclopean, red, shooting from horizon to horizon; but saw it now as the symbol of a vast power, huge, terrible, flinging the echo of its thunder over all the reaches of the valley, leaving blood and destruction in its path; the leviathan, with tentacles of steel clutching into the soil, the soulless Force, the iron-hearted Power, the monster, the Colossus, the Octopus.",
        "source": "Frank Norris, The Octopus: A Story of California (1901), Chapter I, via Project Gutenberg",
        "href": "https://www.gutenberg.org/files/268/268-h/268-h.htm",
        "image": {
          "src": "/covers/paramount-warner-bros-eu-approval--a3.png",
          "alt": "1904 color cartoon depicting the Standard Oil monopoly as a giant octopus, its tentacles wrapped around industries, statehouses and the U.S. Capitol, one reaching toward the White House.",
          "credit": "Udo J. Keppler, 'Next!', Puck, September 7, 1904, Library of Congress Prints and Photographs Division. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Wagner's Der Ring des Nibelungen: forging a ring to rule the whole world",
        "excerpt": "Wagner's four-opera cycle opens as the dwarf Alberich renounces love to seize the Rhinemaidens' gold and forge a ring that makes its bearer master of the world. What follows is a saga of gods, giants and schemers grasping for a single instrument of total dominion, and of the curse that such concentration of power carries. Das Rheingold, the cycle's prelude, sets the whole empire-building tragedy in motion from the shimmering depths of the Rhine.",
        "source": "Richard Wagner, Das Rheingold, WWV 86A (first opera of Der Ring des Nibelungen), full orchestral score, via IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Das_Rheingold,_WWV_86A_(Wagner,_Richard)",
        "image": {
          "src": "/covers/paramount-warner-bros-eu-approval--a4.png",
          "alt": "1871 photographic portrait of composer Richard Wagner, seated in profile.",
          "credit": "Richard Wagner, photograph by Franz Hanfstaengl, Munich, 1871 (Bavarian State Library). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Keppler's 'The Bosses of the Senate': the trusts towering over the regulators",
        "excerpt": "Towering money bags labeled for the steel, copper, oil, sugar and coal trusts loom over the shrunken senators at their desks, while the People's Entrance to the chamber stands bolted shut. Across the wall a banner rewrites the founding creed as 'This is the Senate of the Monopolists by the Monopolists and for the Monopolists!' Joseph Keppler's 1889 cartoon became the defining image of monopoly's grip on government and helped spur the trust-busting that followed.",
        "source": "Joseph Keppler, 'The Bosses of the Senate', Puck, January 23, 1889, U.S. Senate Collection object record",
        "href": "https://www.senate.gov/art-artifacts/historical-images/political-cartoons-caricatures/38_00392_001.htm",
        "image": {
          "src": "/covers/paramount-warner-bros-eu-approval--a5.png",
          "alt": "1889 color cartoon showing corpulent trust magnates as giant money bags looming over tiny senators in the U.S. Senate chamber.",
          "credit": "Joseph Keppler, 'The Bosses of the Senate', Puck, 1889. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 31
  },
  {
    "slug": "louvre-apollo-gallery-reopens-empty-cases",
    "headline": "Louvre reopens its Apollo Gallery nine months after a jewel heist, with the crown-jewel cases left empty",
    "overview": "The Louvre reopened the Galerie d'Apollon, the ornate hall that houses France's crown jewels, roughly nine months after thieves staged a brazen daylight robbery there. Visitors returned to the gilded gallery, but the display cases that once held the stolen royal jewels remained empty, their contents still missing. The reopening drew crowds even as the investigation into the heist continued.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMingFBVV95cUxPMlVSTk9UV0R5S2tQQmo5U0ZGalp5NEc5RGloeW5IM1hsM3h0ODhheVdFSFB5aTFpa0JTZVlGTUMyWWhudHdmYmRpa1c0R0JCUnljanY1cFYtX1V1bVMzNlNZbnBFZDltbVhTeks1S2F0bFJBMHdfLTBaQ3ZwVS02MTVEYmllOWVsWEhycUZYRUY3YnVKQVZpWmRyT1lrZw?oc=5"
      },
      {
        "name": "Artforum",
        "href": "https://www.artforum.com/news/louvre-reopens-apollo-gallery-nine-months-after-jewel-heist-1234755330/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-22",
    "image": {
      "src": "/covers/louvre-apollo-gallery-reopens-empty-cases.png",
      "alt": "The gilded, richly painted vault of the Louvre's Galerie d'Apollon glowing with gold ornament",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 22 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Colonel Blood's Raid on the Crown Jewels (1671)",
        "excerpt": "In broad daylight on 9 May 1671 an Irish adventurer calling himself a parson talked his way into the Jewel House at the Tower of London, overpowered the aged keeper of the regalia, and made off with St Edward's Crown flattened under his cloak and the orb thrust down his breeches. He was seized only at the outer gate, the sceptre dropped in the scramble. Astonishingly, Charles II not only pardoned the thief but granted him lands and a pension.",
        "source": "The National Archives (UK), Education: 'The King, the Crown and the Colonel' (primary documents, 1671)",
        "href": "https://www.nationalarchives.gov.uk/education/resources/the-king-the-crown-the-colonel/",
        "image": {
          "src": "/covers/louvre-apollo-gallery-reopens-empty-cases--a0.png",
          "alt": "Engraved portrait of Colonel Thomas Blood, who attempted to steal the English Crown Jewels in 1671",
          "credit": "Portrait of Colonel Thomas Blood, engraving by G. Scott (1813). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "The Mona Lisa Vanishes from the Louvre (1911)",
        "excerpt": "On 21 August 1911 Leonardo's portrait was lifted from its four iron pegs and carried out of the Louvre under a workman's smock; the disappearance went unnoticed for more than a day. For over two years the wall of the Salon Carre stood bare, and crowds filed past to stare at the empty space where the world's most famous face had hung. The painting resurfaced in Florence in 1913.",
        "source": "Musee du Louvre, collections online: object page for Leonardo's 'La Joconde' (Mona Lisa), INV 779",
        "href": "https://collections.louvre.fr/en/ark:/53355/cl010062370",
        "image": {
          "src": "/covers/louvre-apollo-gallery-reopens-empty-cases--a1.png",
          "alt": "The vacant place in the Salon Carre of the Louvre where the Mona Lisa hung, photographed after the 1911 theft",
          "credit": "The empty space in the Salon Carre after the theft, 1911 (published in Century Magazine, 1914). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Wilkie Collins, 'The Moonstone' (1868)",
        "excerpt": "The deity predicted certain disaster to the presumptuous mortal who laid hands on the sacred gem, and to all of his house and name who received it after him.",
        "source": "Wilkie Collins, 'The Moonstone' (1868), Prologue, via Project Gutenberg",
        "href": "https://www.gutenberg.org/files/155/155-h/155-h.htm",
        "image": {
          "src": "/covers/louvre-apollo-gallery-reopens-empty-cases--a2.png",
          "alt": "1850 oil portrait of novelist Wilkie Collins by John Everett Millais",
          "credit": "Wilkie Collins, portrait by John Everett Millais, 1850 (National Portrait Gallery, London). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Maurice Leblanc, 'The Queen's Necklace' (Arsene Lupin, 1907)",
        "excerpt": "He entered the cabinet; but, after a few seconds, and without any sign of astonishment, he asked: 'Did you take it, my dear?'",
        "source": "Maurice Leblanc, 'The Queen's Necklace,' in The Extraordinary Adventures of Arsene Lupin, Gentleman-Burglar (1907), Ch. V, via Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Extraordinary_Adventures_of_Arsene_Lupin,_Gentleman_Burglar/Chapter_V",
        "image": {
          "src": "/covers/louvre-apollo-gallery-reopens-empty-cases--a3.png",
          "alt": "The 18th-century diamond necklace made by the jewellers Boehmer and Bassenge, at the heart of the Affair of the Diamond Necklace",
          "credit": "The diamond necklace by Boehmer and Bassenge, 18th century. Public domain (PD-old), via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Delacroix, 'Apollo Vanquishing the Serpent Python' (1850-51)",
        "excerpt": "Crowning the Galerie d'Apollon, the very room built to display France's crown jewels, Delacroix's vast ceiling shows the sun-god Apollo loosing his arrows to slay the monstrous serpent Python, light and order triumphant over darkness and chaos. Painted in 1850-51 as a manifesto of French Romanticism, the eight-metre canvas presides in gold and storm-blue over the cases below, an image of splendour standing guard over treasure.",
        "source": "Musee du Louvre, collections online: Eugene Delacroix, 'Apollon vainqueur du serpent Python' (ceiling of the Galerie d'Apollon)",
        "href": "https://collections.louvre.fr/en/ark:/53355/cl010065703",
        "image": {
          "src": "/covers/louvre-apollo-gallery-reopens-empty-cases--a4.png",
          "alt": "Eugene Delacroix's ceiling painting Apollo Vanquishing the Serpent Python in the Galerie d'Apollon, Louvre",
          "credit": "Eugene Delacroix, Apollo Vanquishing the Serpent Python, 1850-51, Musee du Louvre. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Gounod, the 'Jewel Song' from Faust (1859)",
        "excerpt": "Ah! je ris de me voir si belle en ce miroir!",
        "source": "Charles Gounod, Faust (1859), Act III, 'Air des bijoux' (Jewel Song); full score via IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Faust,_CG_4_(Gounod,_Charles)",
        "image": {
          "src": "/covers/louvre-apollo-gallery-reopens-empty-cases--a5.png",
          "alt": "Photograph of the composer Charles Gounod, taken in 1890 by Nadar",
          "credit": "Charles Gounod, photograph by Nadar, 1890 (restored). Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 32
  },
  {
    "slug": "escamez-murals-uncovered-chile-pinochet",
    "headline": "Long-lost murals by Chilean artist Julio Escámez, hidden since Pinochet's 1973 coup, are uncovered in Chillán",
    "overview": "Restorers in Chillán, Chile, are painstakingly uncovering two 1970s murals by the artist Julio Escámez that were long thought destroyed after Augusto Pinochet's 1973 military coup, removing a dozen layers of paint that had buried them for more than five decades. The works, titled 'The Beginning' and 'The End,' were declared a national historic monument in 2024, and the first is expected to be fully restored by late 2027. Escámez, whose politically charged art was suppressed by the dictatorship, spent more than two years completing the murals.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Artforum",
        "href": "https://www.artforum.com/news/long-lost-julio-escamez-murals-uncovered-in-chile-1234755327/"
      },
      {
        "name": "ARTnews",
        "href": "https://www.artnews.com/art-news/news/long-lost-art-by-chilean-muralist-julio-escamez-restoration-1234793027/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-22",
    "image": {
      "src": "/covers/escamez-murals-uncovered-chile-pinochet.png",
      "alt": "A conservator's workshop with a large mural undergoing careful restoration",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 22 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Damnatio memoriae: Rome scratches Geta's face from the imperial family portrait (AD 211)",
        "excerpt": "Indeed, if anyone so much as wrote the name Geta or even uttered it, he was immediately put to death.",
        "source": "Cassius Dio, Roman History 78.12.6 (trans. Earnest Cary, Loeb Classical Library)",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Cassius_Dio/78*.html",
        "image": {
          "src": "/covers/escamez-murals-uncovered-chile-pinochet--a0.png",
          "alt": "The Severan Tondo, a painted panel of the imperial family in which the young Geta's face has been deliberately smeared out after his brother Caracalla ordered his memory erased.",
          "credit": "The Severan Tondo (c. AD 200), Antikensammlung, Altes Museum, Berlin. Photo: Carole Raddato, CC BY-SA 2.0, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "Byzantine Iconoclasm: a council orders every painted image 'rejected and cursed' (754)",
        "excerpt": "Supported by the Holy Scriptures and the Fathers, we declare unanimously, in the name of the Holy Trinity, that there shall be rejected and removed and cursed one of the Christian Church every likeness which is made out of any material and colour whatever by the evil art of painters.",
        "source": "Definition (Horos) of the Iconoclast Council of Hieria, AD 754 (Internet Medieval Sourcebook, Fordham University)",
        "href": "https://sourcebooks.fordham.edu/source/icono-cncl754.asp",
        "image": {
          "src": "/covers/escamez-murals-uncovered-chile-pinochet--a1.png",
          "alt": "A 9th-century Chludov Psalter miniature pairing the Crucifixion with iconoclasts whitewashing an icon of Christ, as a soldier extends a sponge on a pole to Christ on the cross.",
          "credit": "Chludov Psalter, fol. 67r (mid-9th c.), State Historical Museum, Moscow. Public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "John Milton, Areopagitica: to kill a book is to kill 'the image of God' (1644)",
        "excerpt": "As good almost kill a man as kill a good book. Who kills a man kills a reasonable creature, God's image; but he who destroys a good book, kills reason itself, kills the image of God, as it were in the eye.",
        "source": "John Milton, Areopagitica (1644)",
        "href": "https://www.gutenberg.org/files/608/608-h/608-h.htm",
        "image": {
          "src": "/covers/escamez-murals-uncovered-chile-pinochet--a2.png",
          "alt": "Portrait of the English poet John Milton, author of the anti-censorship tract Areopagitica.",
          "credit": "Portrait of John Milton (c. 1629), artist unknown. Public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Thomas De Quincey, 'The Palimpsest of the Human Brain' (1845)",
        "excerpt": "What else than a natural and mighty palimpsest is the human brain? ... Everlasting layers of ideas, images, feelings, have fallen upon your brain softly as light. Each succession has seemed to bury all that went before. And yet, in reality, not one has been extinguished.",
        "source": "Thomas De Quincey, 'The Palimpsest of the Human Brain,' Suspiria de Profundis (1845)",
        "href": "https://standardebooks.org/ebooks/thomas-de-quincey/suspiria-de-profundis/text/the-palimpsest-of-the-human-brain",
        "image": {
          "src": "/covers/escamez-murals-uncovered-chile-pinochet--a3.png",
          "alt": "Portrait of the essayist Thomas De Quincey, who likened memory to a palimpsest whose buried layers can never be fully erased.",
          "credit": "Thomas De Quincey by Sir John Watson-Gordon. Public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Diego Rivera's Rockefeller mural, destroyed for its politics and repainted in Mexico (1934)",
        "excerpt": "In 1933 Diego Rivera painted a monumental fresco in the lobby of New York's Rockefeller Center; when he refused to remove a portrait of Lenin, the patrons curtained the unfinished work and, in February 1934, chiseled it off the wall entirely. Refusing to let the image be erased, Rivera repainted it that same year at Mexico City's Palacio de Bellas Artes as 'El hombre controlador del universo,' the censored composition intact and open to the public. A political mural smashed by the powerful returned, larger in meaning than the wall it had been denied.",
        "source": "Diego Rivera, El hombre controlador del universo (Man, Controller of the Universe), fresco, 1934, Museo del Palacio de Bellas Artes, Mexico City",
        "href": "https://artsandculture.google.com/asset/man-controller-of-the-universe-diego-rivera/JwESYqRaLENE7g",
        "image": {
          "src": "/covers/escamez-murals-uncovered-chile-pinochet--a4.png",
          "alt": "Diego Rivera's fresco Man, Controller of the Universe at the Palacio de Bellas Artes, his recreation of the Rockefeller Center mural destroyed for including a portrait of Lenin.",
          "credit": "Diego Rivera, El hombre controlador del universo (1934), Museo del Palacio de Bellas Artes. Photo: Renata Frias, CC BY-SA 4.0, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Beethoven's Fidelio: prisoners raised from the dungeon into the light (1814)",
        "excerpt": "O welche Lust, in freier Luft den Atem leicht zu heben! Nur hier, nur hier ist Leben! (\"O what joy, in the open air freely to breathe again! Here, only here, is life!\")",
        "source": "Ludwig van Beethoven, Fidelio, Op. 72, Act I - Prisoners' Chorus (libretto by Joseph Sonnleithner and Georg Friedrich Treitschke), 1814",
        "href": "https://imslp.org/wiki/Fidelio,_Op.72_(Beethoven,_Ludwig_van)",
        "image": {
          "src": "/covers/escamez-murals-uncovered-chile-pinochet--a5.png",
          "alt": "Joseph Karl Stieler's 1820 portrait of Ludwig van Beethoven, composer of Fidelio, an opera about a political prisoner freed from a tyrant's dungeon.",
          "credit": "Ludwig van Beethoven by Joseph Karl Stieler (1820), Beethoven-Haus, Bonn. Public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 33
  },
  {
    "slug": "pan-am-1952-wreckage-found-safety-briefings",
    "headline": "Wreckage of a 1952 Pan Am crash that led to today's in-flight safety briefings is found after 74 years",
    "overview": "Searchers located the long-lost wreckage of a Pan American World Airways aircraft that crashed in 1952, an accident whose investigation helped establish the pre-flight safety briefings now standard on every commercial flight. The discovery, after 74 years, closes a decades-old gap in aviation history and offers a chance to honor those killed. Investigators said the crash reshaped how airlines prepare passengers for emergencies.",
    "genre": "Science",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cdrvyllxj71o"
      },
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMiqwFBVV95cUxOOHBkTDZJTnNQbmlYRll4amRyUlVJQXFKQ2loYUVkakFQUXp1WE0tUWp2elpCVm42V2RyUndBNHIxU0JnQV9PMzZ0cVNTdm5UZjNwSVZoVUNMZ1ZuYjVJR1JEV285Q0Y3RTczdGdSa3QyNGVGTURDLTZ5cmFVZmc3bFUzdHNWQ1p1VF9rQUtXLUNDblB6Y2poY1JCRXhfMTc4dUMzaTNGc0JsT0E?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-22",
    "image": {
      "src": "/covers/pan-am-1952-wreckage-found-safety-briefings.png",
      "alt": "A vintage Pan American Boeing 377 Stratocruiser airliner in its classic livery",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 22 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Titanic disaster and the birth of modern maritime safety law (1912)",
        "excerpt": "The committee made numerous recommendations, including revisions of statutes to require lifeboat capacity for every passenger, proper assignment and training of crew members, lifeboat assignments and drills for passengers before departure, regulation of radiotelegraphy, and safety improvements to ocean-going passenger steamships.",
        "source": "United States Senate, inquiry into the sinking of the RMS Titanic (1912)",
        "href": "https://www.senate.gov/about/powers-procedures/investigations/titanic.htm",
        "image": {
          "src": "/covers/pan-am-1952-wreckage-found-safety-briefings--a0.png",
          "alt": "The RMS Titanic departing Southampton on 10 April 1912",
          "credit": "Photograph by Francis Godolphin Osbourne Stuart, 1912. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "HMS Erebus, lost in 1845, found on the Arctic seabed after 169 years",
        "excerpt": "Sir John Franklin's HMS Erebus vanished into the Arctic ice in 1845, taking its entire crew and becoming one of history's great maritime mysteries. Guided by generations of Inuit oral testimony and modern sonar, a Parks Canada team finally located the wreck on the seabed in September 2014. The discovery reopened a sealed chapter of exploration and honored men whose fate had been unknown for more than a century and a half.",
        "source": "Parks Canada, \"Finding HMS Erebus\"",
        "href": "https://parks.canada.ca/lhn-nhs/nu/epaveswrecks/culture/archeologie-archeology/decouvertes-discoveries/erebus",
        "image": {
          "src": "/covers/pan-am-1952-wreckage-found-safety-briefings--a1.png",
          "alt": "HMS Erebus beset in Arctic ice, a 19th-century oil painting",
          "credit": "Francois Etienne Musin, \"HMS Erebus in the Ice, 1846.\" Royal Museums Greenwich; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Ovid, \"Metamorphoses\" - the fall of Icarus",
        "excerpt": "The wax was melted; he shook his naked arms, and, wanting his oar-like wings, he caught no more air. His face, too, as he called on the name of his father, was received in the azure water, which received its name from him.",
        "source": "Ovid, Metamorphoses, Book VIII (trans. Henry T. Riley)",
        "href": "https://www.gutenberg.org/files/26073/26073-h/26073-h.htm",
        "image": {
          "src": "/covers/pan-am-1952-wreckage-found-safety-briefings--a2.png",
          "alt": "The drowned Icarus mourned by sea nymphs, his great wings still attached",
          "credit": "Herbert James Draper, \"The Lament for Icarus,\" 1898. Lady Lever Art Gallery; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "John Milton, \"Lycidas\" - an elegy for a friend drowned at sea",
        "excerpt": "Weep no more, woeful shepherds, weep no more, / For Lycidas, your sorrow, is not dead, / Sunk though he be beneath the watery floor.",
        "source": "John Milton, \"Lycidas\" (1638)",
        "href": "https://www.gutenberg.org/cache/epub/397/pg397.html",
        "image": {
          "src": "/covers/pan-am-1952-wreckage-found-safety-briefings--a3.png",
          "alt": "Portrait of the poet John Milton",
          "credit": "Portrait of John Milton. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Pieter Bruegel the Elder, \"Landscape with the Fall of Icarus\"",
        "excerpt": "In Bruegel's serene panorama a ploughman, a shepherd and a fisherman go about their work while, almost unnoticed in one corner, a pair of pale legs disappears beneath the sea - all that remains of Icarus. The world's indifference to a single falling flier gives the picture its quiet, haunting power. It renders the price of overreaching flight as a small splash the busy living never pause to see.",
        "source": "Royal Museums of Fine Arts of Belgium, Brussels (after Pieter Bruegel the Elder)",
        "href": "https://artsandculture.google.com/asset/landscape-with-the-fall-of-icarus-pieter-bruegel-the-elder-after/6gGkgMwPyiEqUQ",
        "image": {
          "src": "/covers/pan-am-1952-wreckage-found-safety-briefings--a4.png",
          "alt": "Pastoral coastal landscape with a ploughman in the foreground and Icarus's legs vanishing into the sea",
          "credit": "After Pieter Bruegel the Elder, \"Landscape with the Fall of Icarus.\" Royal Museums of Fine Arts of Belgium; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Gabriel Faure, \"Requiem,\" Op. 48 - music of consolation and rest",
        "excerpt": "Faure called his Requiem a \"lullaby of death,\" turning away from terror and judgment toward tenderness and peace. Its closing \"In Paradisum\" lifts the departed gently toward rest, offering the living not dread but consolation and closure. Written as the composer mourned his own parents, it has become one of music's great acts of memorial.",
        "source": "Gabriel Faure, Requiem in D minor, Op. 48 (1888-1900); score via IMSLP",
        "href": "https://imslp.org/wiki/Requiem,_Op.48_(Faur%C3%A9,_Gabriel)",
        "image": {
          "src": "/covers/pan-am-1952-wreckage-found-safety-briefings--a5.png",
          "alt": "Portrait of the composer Gabriel Faure",
          "credit": "John Singer Sargent, portrait of Gabriel Faure, 1889. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 34
  },
  {
    "slug": "congo-ebola-outbreak-nears-1000-deaths",
    "headline": "Congo's Ebola outbreak, the fastest on record, has now killed close to 1,000 people",
    "overview": "The Democratic Republic of the Congo's Ebola outbreak has claimed close to 1,000 lives, with official data recording 999 deaths among some 2,473 confirmed cases, health authorities said. Declared in May and caused by the Bundibugyo strain of the virus, for which there is no approved vaccine or treatment, it has spread faster than any Ebola outbreak on record. Ituri province remains the hardest hit as overwhelmed health workers struggle to contain it.",
    "genre": "Science",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMikgFBVV95cUxPWGZTeFNodFcyOE1BSGRvRkhkVzNxYXV3RVVRWkh2VXQxdFB1MFRRZXlBMjJoTWdDbVExekJyWUtGajFEWDJ2V3BaRkNxSXdVQ3U5Wm5wRU5fenZpWlNwNGtjekJZX2tKRzZ1ZmdCY0dnYVpLN3REd0tIX2o0clM5N0p3dHpGV0pUb1RXYXpVX19HUQ?oc=5"
      },
      {
        "name": "Al Jazeera",
        "href": "https://www.aljazeera.com/news/2026/7/22/nearly-1000-people-have-died-from-ebola-in-dr-congo"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-22",
    "image": {
      "src": "/covers/congo-ebola-outbreak-nears-1000-deaths.png",
      "alt": "Health workers checking their protective equipment in the fight against Ebola",
      "credit": "UK Department for International Development, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 22 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Plague of Athens (430 BC)",
        "excerpt": "It was said that it had broken out in many places previously in the neighbourhood of Lemnos and elsewhere; but a pestilence of such extent and mortality was nowhere remembered. Neither were the physicians at first of any service, ignorant as they were of the proper way to treat it, but they died themselves the most thickly, as they visited the sick most often; nor did any human art succeed any better.",
        "source": "Thucydides, History of the Peloponnesian War, Book II (trans. Richard Crawley), Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/7142/pg7142.txt",
        "image": {
          "src": "/covers/congo-ebola-outbreak-nears-1000-deaths--a0.png",
          "alt": "A baroque painting of a stricken ancient city, with the dead and dying sprawled among classical ruins as survivors mourn.",
          "credit": "Michiel Sweerts and Workshop, 'Plague in an Ancient City' (c. 1652–54), via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "historical",
        "title": "The Plague of Justinian (542 AD)",
        "excerpt": "During these times there was a pestilence, by which the whole human race came near to being annihilated. ... For it did not come in a part of the world nor upon certain men, nor did it confine itself to any season of the year, so that from such circumstances it might be possible to find subtle explanations of a cause, but it embraced the entire world, and blighted the lives of all men, though differing from one another in the most marked degree, respecting neither sex nor age.",
        "source": "Procopius, History of the Wars, Book II (trans. H. B. Dewing), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/16764/16764-h/16764-h.htm",
        "image": {
          "src": "/covers/congo-ebola-outbreak-nears-1000-deaths--a1.png",
          "alt": "A gold-ground Byzantine mosaic of the Emperor Justinian I, crowned and haloed, flanked by attendants and clergy.",
          "credit": "Emperor Justinian mosaic, Basilica of San Vitale, Ravenna (6th century), via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "literary",
        "title": "Edgar Allan Poe, \"The Masque of the Red Death\"",
        "excerpt": "The “Red Death” had long devastated the country. No pestilence had ever been so fatal, or so hideous. Blood was its Avatar and its seal—the redness and the horror of blood. There were sharp pains, and sudden dizziness, and then profuse bleeding at the pores, with dissolution. ... And the whole seizure, progress and termination of the disease, were the incidents of half an hour.",
        "source": "Edgar Allan Poe, 'The Masque of the Red Death' (1842), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/1064/1064-h/1064-h.htm",
        "image": {
          "src": "/covers/congo-ebola-outbreak-nears-1000-deaths--a2.png",
          "alt": "A dark, ornate Harry Clarke illustration for Poe's tale, showing masked revellers recoiling amid gothic splendour.",
          "credit": "Harry Clarke, illustration for Poe's 'Tales of Mystery and Imagination' (1919), via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "literary",
        "title": "Daniel Defoe, \"A Journal of the Plague Year\"",
        "excerpt": "The shrieks of women and children at the windows and doors of their houses, where their dearest relations were perhaps dying, or just dead, were so frequent to be heard as we passed the streets, that it was enough to pierce the stoutest heart in the world to hear them. Tears and lamentations were seen almost in every house, especially in the first part of the visitation.",
        "source": "Daniel Defoe, 'A Journal of the Plague Year' (1722), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/376/376-h/376-h.htm",
        "image": {
          "src": "/covers/congo-ebola-outbreak-nears-1000-deaths--a3.png",
          "alt": "An old print of the Great Plague of London: two men discovering a dead woman lying in a deserted street.",
          "credit": "'Two men discovering a dead woman in the street during the Great Plague of London', Wellcome Collection, via Wikimedia Commons (CC BY 4.0)"
        }
      },
      {
        "category": "artistic",
        "title": "Camille Saint-Saëns, \"Danse macabre\" (Op. 40)",
        "excerpt": "Saint-Saëns's 1874 symphonic poem summons Death as a fiddler who, at the stroke of midnight, calls the dead from their graves to dance. A solo violin, tuned to a jarring dissonance, saws out a whirling waltz over the dry rattle of xylophone bones, building to a frenzy until the crow of a cock scatters the skeletons back to the earth. It has become music's defining image of pestilence and mortality made grimly, irresistibly gay.",
        "source": "Camille Saint-Saëns, 'Danse macabre', Op. 40 (1874) — full orchestral score, IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Danse_macabre,_Op.40_(Saint-Sa%C3%ABns,_Camille)",
        "image": {
          "src": "/covers/congo-ebola-outbreak-nears-1000-deaths--a4.png",
          "alt": "A formal photographic portrait of the French composer Camille Saint-Saëns.",
          "credit": "Portrait of Camille Saint-Saëns by Henri Manuel, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Arnold Böcklin, \"Die Pest\" (The Plague), 1898",
        "excerpt": "Böcklin's tempera panel shows Death astride a bat-winged monster, sweeping low through the narrow street of a medieval town. Painted in sickly greens and shadow, it renders the plague as an unstoppable aerial predator, leaving fallen bodies in its wake. The Swiss symbolist made it in direct response to news of the 1898 plague outbreak in Bombay, giving abstract contagion a terrifyingly physical form.",
        "source": "Arnold Böcklin, 'Die Pest' (The Plague), 1898 — Kunstmuseum Basel, Sammlung Online",
        "href": "https://sammlungonline.kunstmuseumbasel.ch/eMP/eMuseumPlus?service=ExternalInterface&module=collection&objectId=1121",
        "image": {
          "src": "/covers/congo-ebola-outbreak-nears-1000-deaths--a5.png",
          "alt": "A symbolist painting of a skeletal Death riding a bat-winged beast low through a narrow medieval street, the dead falling below.",
          "credit": "Arnold Böcklin, 'Die Pest' (1898), Kunstmuseum Basel, via Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 35
  },
  {
    "slug": "amazon-agi-group-layoffs-nova-models",
    "headline": "Amazon cuts jobs in the AGI group behind its Nova models as it shifts focus to business AI",
    "overview": "Amazon laid off employees in its artificial general intelligence organization, the unit responsible for its Nova family of models, as it redirects resources toward AI tools for business customers. The cuts follow the departures of senior AGI leaders and a reorganization that folded the group into a broader division overseeing chips and quantum computing. Affected US workers were offered 90 days of pay and benefits, the latest in a series of reductions this year.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiuAFBVV95cUxQdkQtS0lHSVM5ZnlBd05WU003NW92NWU0MWVHYVVBVFlFYUpjWEd3NTdIUU5UT05fUVFGT19JTkdRTEktZG1Cc1Mxd3ZEekRiUVl2aFNjY1dYUnhxWU1kMjNILWh5UlgwcktaN3JEV3g2Q2hrNTF6c1U2MmFPSnppdW1PZWdZN1ZZZnpoNVFuS05jVjJ2WkZEZ0RyWHE0YUttVWhhOVllbkI0anhMZjROUjBTeTY1N1VR?oc=5"
      },
      {
        "name": "CNBC",
        "href": "https://www.cnbc.com/2026/07/22/amazon-lays-off-some-employees-in-its-agi-unit.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-22",
    "image": {
      "src": "/covers/amazon-agi-group-layoffs-nova-models.png",
      "alt": "A lone worker at a desk in a large, mostly empty open-plan office",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 22 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Byron defends the Luddites against the frame that replaced them (1812)",
        "excerpt": "The rejected workmen in the blindness of their ignorance, instead of rejoicing at these improvements in arts so beneficial to mankind, conceived themselves to be sacrificed to improvements in mechanism.",
        "source": "Lord Byron, maiden speech on the Frame Work Bill, House of Lords, 27 February 1812 (Hansard)",
        "href": "https://api.parliament.uk/historic-hansard/lords/1812/feb/27/frame-work-bill",
        "image": {
          "src": "/covers/amazon-agi-group-layoffs-nova-models--a0.png",
          "alt": "1812 hand-coloured engraving 'The Leader of the Luddites' showing a masked figure leading machine-breakers",
          "credit": "'The Leader of the Luddites', engraving, May 1812, British Museum; via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "historical",
        "title": "Akhenaten's sun-god revolution, abandoned by his successors (c. 1330 BCE)",
        "excerpt": "By Tutankhamun's reign the temples of Egypt's gods stood abandoned and overgrown, their sanctuaries ruined and their courts worn into footpaths, after Akhenaten had redirected the kingdom's entire devotion toward a single radiant sun-disc, the Aten. The Restoration Stela records how the young king's court quietly dismantled that grand religious experiment, restoring the old, plural, workaday cults and the temple economy and returning the state to practical order, while Akhenaten's city and creed were erased from the record.",
        "source": "Restoration Stela of Tutankhamun (c. 1330 BCE), translation in the St Andrews Corpus of Middle Egyptian (ed. Nederhof)",
        "href": "https://mjn.host.cs.st-andrews.ac.uk/egyptian/texts/corpus/pdf/RestorationTutankhamun.pdf",
        "image": {
          "src": "/covers/amazon-agi-group-layoffs-nova-models--a1.png",
          "alt": "Limestone house-altar relief of Akhenaten and Nefertiti with their daughters beneath the rays of the sun-disc Aten",
          "credit": "House altar of Akhenaten and Nefertiti, Amarna, c. 1340 BCE, Ägyptisches Museum Berlin (Neues Museum); photo Gerbil, via Wikimedia Commons (CC BY-SA 3.0)"
        }
      },
      {
        "category": "literary",
        "title": "Frankenstein: the maker recoils from the mind he laboured to create",
        "excerpt": "For this I had deprived myself of rest and health. I had desired it with an ardour that far exceeded moderation; but now that I had finished, the beauty of the dream vanished, and breathless horror and disgust filled my heart.",
        "source": "Mary Shelley, Frankenstein; or, The Modern Prometheus (1818), Chapter 5",
        "href": "https://www.gutenberg.org/cache/epub/84/pg84.txt",
        "image": {
          "src": "/covers/amazon-agi-group-layoffs-nova-models--a2.png",
          "alt": "1831 steel engraving of Victor Frankenstein recoiling from his newly animated creature",
          "credit": "Theodor von Holst, frontispiece to the 1831 edition of Frankenstein; via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "literary",
        "title": "Ozymandias: the colossal ambition sunk in the sand",
        "excerpt": "And on the pedestal these words appear: / 'My name is Ozymandias, King of Kings.' / Look on my works ye Mighty, and despair! / No thing beside remains. Round the decay / Of that Colossal Wreck, boundless and bare, / The lone and level sands stretch far away.",
        "source": "Percy Bysshe Shelley, 'Ozymandias', The Examiner (London), 11 January 1818",
        "href": "https://en.wikisource.org/wiki/The_Examiner_(London)/Ozymandias",
        "image": {
          "src": "/covers/amazon-agi-group-layoffs-nova-models--a3.png",
          "alt": "Colossal broken granite bust of Ramesses II, the 'Younger Memnon', in the British Museum",
          "credit": "Statue of Ramesses II ('Younger Memnon'), British Museum; via Wikimedia Commons (CC BY-SA)"
        }
      },
      {
        "category": "artistic",
        "title": "Dukas, The Sorcerer's Apprentice: the automated servant that cannot be stopped (1897)",
        "excerpt": "In Dukas's symphonic poem the apprentice, left alone, enchants a broom to fetch water and do his labour for him, and for a giddy while the automated servant works. But he has never learned the word to halt it: the broom floods the workshop, and when he splits it with an axe every splinter rises as a fresh drudge hauling still more water. Only the returning master, with a word of command, can arrest the machine the apprentice set loose and restore the room to order.",
        "source": "Paul Dukas, L'apprenti sorcier (The Sorcerer's Apprentice), symphonic poem after Goethe, 1897",
        "href": "https://imslp.org/wiki/L'apprenti_sorcier_(Dukas,_Paul)",
        "image": {
          "src": "/covers/amazon-agi-group-layoffs-nova-models--a4.png",
          "alt": "Portrait photograph of the French composer Paul Dukas (1865-1935)",
          "credit": "Paul Dukas (1865-1935), French composer; via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Bruegel, The Tower of Babel: the grand project doomed to be abandoned unfinished (1563)",
        "excerpt": "Bruegel's vast panel shows the tower spiralling storey upon storey into the clouds, swarming with cranes, scaffolds and toiling figures, yet its lower arches already lean and crack while the summit is nowhere near heaven. The grandest of human undertakings is painted at the very moment its ambition outruns its foundations, a monument built to be left unfinished and forsaken.",
        "source": "Pieter Bruegel the Elder, The Tower of Babel, 1563, Kunsthistorisches Museum, Vienna (inv. GG 1026)",
        "href": "https://www.khm.at/en/artworks/the-tower-of-babel-323-1",
        "image": {
          "src": "/covers/amazon-agi-group-layoffs-nova-models--a5.png",
          "alt": "Pieter Bruegel the Elder's 1563 painting of the unfinished Tower of Babel spiralling into the clouds",
          "credit": "Pieter Bruegel the Elder, The Tower of Babel, 1563, Kunsthistorisches Museum, Vienna; via Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 36
  },
  {
    "slug": "india-neet-exam-cockroach-protests",
    "headline": "India's youth-led 'cockroach' protests intensify over an exam-leak scandal, pressing the education minister to resign",
    "overview": "Student groups and opposition parties escalated nationwide protests across India demanding the resignation of Education Minister Dharmendra Pradhan over alleged irregularities in the NEET medical-entrance exam, including paper leaks that affected roughly two million students. The satirical youth-led 'cockroach' movement has staged sit-ins at New Delhi's Jantar Mantar and drawn demonstrators from Kerala to Ladakh. Under pressure, the minister pledged reforms and debate over the examination system.",
    "genre": "Politics",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c9d8p88lyjdo"
      },
      {
        "name": "The Express Tribune",
        "href": "https://tribune.com.pk/story/2619604/under-soaring-pressure-indias-education-minister-promises-reforms-and-debate"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-22",
    "image": {
      "src": "/covers/india-neet-exam-cockroach-protests.png",
      "alt": "Students protesting the 2026 NEET exam-paper leak at Jantar Mantar in New Delhi",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 22 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "China's Imperial Examinations and the War on Exam Fraud",
        "excerpt": "As a further measure of precaution against corrupt practices at examinations, the papers handed in by the candidates are all copied out in red ink, and only these copies are submitted to the examiners.",
        "source": "Herbert A. Giles, The Civilization of China (1911), on the competitive examinations",
        "href": "https://www.gutenberg.org/cache/epub/2076/pg2076.txt",
        "image": {
          "src": "/covers/india-neet-exam-cockroach-protests--a0.png",
          "alt": "A silk cribbing garment covered in minute Chinese characters, smuggled into the imperial civil-service examinations to cheat.",
          "credit": "Imperial examination cheating garment, Hongyinshanfang Museum, Suzhou. Photo: Jack No1, CC BY-SA 3.0, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "Gandhi's 'Do or Die' and the Quit India Movement, 1942",
        "excerpt": "Here is a mantra, a short one, that I give you. You may imprint it on your hearts and let every breath of yours give expression to it. The mantra is: 'Do or Die.' We shall either free India or die in the attempt; we shall not live to see the perpetuation of our slavery.",
        "source": "The Collected Works of Mahatma Gandhi, Vol. 76 — Speech at the A.I.C.C., Bombay, 8 August 1942",
        "href": "https://www.gandhiheritageportal.org/the-collected-works-of-mahatma-gandhi",
        "image": {
          "src": "/covers/india-neet-exam-cockroach-protests--a1.png",
          "alt": "Studio portrait of Mahatma Gandhi, leader of India's mass civil-disobedience movement.",
          "credit": "Mahatma Gandhi, studio portrait, 1931. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Gogol's The Government Inspector: Corruption Unmasked",
        "excerpt": "What are you laughing at? You are laughing at yourself, oh you!",
        "source": "Nikolai Gogol, The Inspector-General (1836), trans. Thomas Seltzer — the Governor's closing line to the audience",
        "href": "https://www.gutenberg.org/files/3735/3735-h/3735-h.htm",
        "image": {
          "src": "/covers/india-neet-exam-cockroach-protests--a2.png",
          "alt": "Portrait of the Russian satirist Nikolai Gogol, author of The Government Inspector.",
          "credit": "Nikolai Gogol, portrait by Fyodor Moller, 1840, Tretyakov Gallery. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Shelley's The Mask of Anarchy and the Peterloo Protest",
        "excerpt": "Rise like Lions after slumber / In unvanquishable number, / Shake your chains to earth like dew / Which in sleep had fallen on you— / Ye are many—they are few.",
        "source": "Percy Bysshe Shelley, The Mask of Anarchy (written 1819, after the Peterloo Massacre)",
        "href": "https://en.wikisource.org/wiki/The_Complete_Poetical_Works_of_Percy_Bysshe_Shelley_(ed._Hutchinson,_1914)/The_Mask_of_Anarchy",
        "image": {
          "src": "/covers/india-neet-exam-cockroach-protests--a3.png",
          "alt": "Coloured print of the 1819 Peterloo Massacre, cavalry charging a peaceful mass reform demonstration in Manchester.",
          "credit": "'The Massacre of Peterloo!' (1819), Library of Congress. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Delacroix, Liberty Leading the People",
        "excerpt": "Delacroix turns a street insurrection into an allegory of a people rising against a discredited regime. A bare-breasted Liberty strides over the fallen, tricolour aloft, leading a ragged crowd of workers, students and a pistol-waving boy across the barricades. Painted within months of the July 1830 revolution that toppled Charles X, it became the enduring emblem of popular revolt.",
        "source": "Eugène Delacroix, Liberty Leading the People (1830), oil on canvas, Musée du Louvre, Paris",
        "href": "https://collections.louvre.fr/en/ark:/53355/cl010065872",
        "image": {
          "src": "/covers/india-neet-exam-cockroach-protests--a4.png",
          "alt": "Delacroix's painting of Liberty, holding the French tricolour, leading an armed crowd over a barricade.",
          "credit": "Eugène Delacroix, Liberty Leading the People (1830), Musée du Louvre. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Rouget de Lisle's La Marseillaise",
        "excerpt": "Written in a single feverish night in 1792, La Marseillaise became the sound of insurrection itself, roared by volunteers marching on the capital and by crowds tearing down the old order. Its call to arms against tyranny outlived the Revolution to become the anthem of every people demanding that its rulers answer for their crimes. Isidore Pils later imagined the moment of its first singing.",
        "source": "Claude-Joseph Rouget de Lisle, La Marseillaise (1792)",
        "href": "https://imslp.org/wiki/La_Marseillaise_(Rouget_de_Lisle,_Claude-Joseph)",
        "image": {
          "src": "/covers/india-neet-exam-cockroach-protests--a5.png",
          "alt": "Isidore Pils's painting of Rouget de Lisle singing La Marseillaise for the first time before a rapt gathering.",
          "credit": "Isidore Pils, Rouget de Lisle chantant la Marseillaise (1849), Musée historique de Strasbourg. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 37
  },
  {
    "slug": "spain-guadalajara-wildfire-evacuations",
    "headline": "A wildfire in Spain's Guadalajara province burns for a sixth day, forcing more than 1,200 to evacuate amid a European heat spell",
    "overview": "A forest fire in Spain's central Guadalajara province raged for a sixth day, having scorched an estimated 32,000 hectares and forced the evacuation of more than 1,200 people across dozens of municipalities as intense heat gripped southern Europe. Firefighters in Spain and France battled multiple blazes fed by a punishing summer that has followed a record June heat wave. Authorities said the Guadalajara fire had begun to stabilize but warned that dangerous conditions persisted.",
    "genre": "Climate",
    "sources": [
      {
        "name": "US News",
        "href": "https://www.usnews.com/news/world/articles/2026-07-22/spain-france-battle-wildfires-as-heat-grips-southern-europe"
      },
      {
        "name": "The Detroit News",
        "href": "https://www.detroitnews.com/story/news/world/2026/07/22/spain-france-battle-wildfires-intense-heat-grips-southern-europe/91010959007/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-22",
    "image": {
      "src": "/covers/spain-guadalajara-wildfire-evacuations.png",
      "alt": "A forest fire raging across a Spanish hillside beneath a smoke-darkened sky",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 22 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Great Fire of Rome (AD 64), in Tacitus' Annals",
        "excerpt": "The blaze in its fury ran first through the level portions of the city, then rising to the hills, while it again devastated every place below them... Often, while they looked behind them, they were intercepted by flames on their side or in their face.",
        "source": "Tacitus, Annals, Book XV.38 (English translation), Perseus Digital Library",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.02.0078%3Abook%3D15%3Achapter%3D38",
        "image": {
          "src": "/covers/spain-guadalajara-wildfire-evacuations--a0.png",
          "alt": "Hubert Robert's 1785 painting The Fire of Rome, showing crowds fleeing amid burning classical architecture",
          "credit": "Hubert Robert, The Fire of Rome (1785), Musee d'art moderne Andre Malraux (MuMa), Le Havre. Public domain via Wikimedia Commons (Google Art Project)."
        }
      },
      {
        "category": "historical",
        "title": "The Great Fire of London (1666), in the Diary of Samuel Pepys",
        "excerpt": "The poor pigeons, I perceive, were loth to leave their houses, but hovered about the windows and balconys till they were, some of them burned, their wings, and fell down.... [We saw] the fire as only one entire arch of fire from this to the other side the bridge, and in a bow up the hill for an arch of above a mile long: it made me weep to see it.",
        "source": "Samuel Pepys, Diary, entry for 2 September 1666, Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/4167/pg4167.txt",
        "image": {
          "src": "/covers/spain-guadalajara-wildfire-evacuations--a1.png",
          "alt": "A 1675 painting of the Great Fire of London seen from the Thames, with Old London Bridge and the city engulfed in flames",
          "credit": "Unknown artist (Dutch School), The Great Fire of London (c.1675), Museum of London. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "The Burning of Troy in Virgil's Aeneid, Book II",
        "excerpt": "The palace of Deiphobus ascends / In smoky flames, and catches on his friends. / Ucalegon burns next: the seas are bright / With splendour not their own, and shine with Trojan light.",
        "source": "Virgil, The Aeneid, Book II (John Dryden translation), Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/228/pg228.txt",
        "image": {
          "src": "/covers/spain-guadalajara-wildfire-evacuations--a2.png",
          "alt": "Kerstiaen de Keuninck's painting of Aeneas fleeing the burning city of Troy as flames consume the buildings behind him",
          "credit": "Kerstiaen de Keuninck (c.1561-c.1635), Aeneas Fleeing from Burning Troy. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Phaethon Sets the Earth Ablaze in Ovid's Metamorphoses, Book II",
        "excerpt": "The Mountains kindle as the Car draws near, / Athos and Tmolus red with Fires appear; / Oeagrian Haemus (then a single Name) / And Virgin Helicon increase the Flame;",
        "source": "Ovid, Metamorphoses, Book II (Garth, Dryden, et al. translation), Wikisource",
        "href": "https://en.wikisource.org/wiki/Metamorphoses_(tr._Garth,_Dryden,_et_al.)/Book_II",
        "image": {
          "src": "/covers/spain-guadalajara-wildfire-evacuations--a3.png",
          "alt": "Peter Paul Rubens' painting The Fall of Phaeton, showing the sun-chariot plunging in chaos as the sky burns",
          "credit": "Peter Paul Rubens, The Fall of Phaeton (c.1604-1608), National Gallery of Art, Washington. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Turner, The Burning of the Houses of Lords and Commons (1834)",
        "excerpt": "Turner witnessed the 1834 fire that destroyed London's Parliament and turned it into an image of nature's sublime terror. A wall of orange flame roars up into a bruised sky, its light streaming across the black Thames while tiny crowds gather helplessly on the far bank. Solid stone dissolves into incandescent haze, dwarfing every human effort to contain the blaze.",
        "source": "J. M. W. Turner, The Burning of the Houses of Lords and Commons, October 16, 1834, Philadelphia Museum of Art",
        "href": "https://philamuseum.org/collection/object/103831",
        "image": {
          "src": "/covers/spain-guadalajara-wildfire-evacuations--a4.png",
          "alt": "J. M. W. Turner's oil painting of the 1834 Houses of Parliament fire, a blaze of flame and smoke reflected in the Thames",
          "credit": "J. M. W. Turner, The Burning of the Houses of Lords and Commons, October 16, 1834 (c.1835), Philadelphia Museum of Art. Public domain via Wikimedia Commons (Google Art Project)."
        }
      },
      {
        "category": "artistic",
        "title": "Manuel de Falla, Ritual Fire Dance from El amor brujo (1915)",
        "excerpt": "In this Andalusian ballet score the Spanish composer conjures fire itself into music, its Ritual Fire Dance whirling with obsessive trills and pounding rhythm to drive out a haunting spirit. The orchestra flickers and flares like a bonfire at midnight, restless and dangerous. It stands among the most vivid evocations of flame in the concert repertoire, born of the same sun-scorched Spanish landscape now threatened by wildfire.",
        "source": "Manuel de Falla, El amor brujo (contains the Ritual Fire Dance / Danza ritual del fuego), public-domain scores at IMSLP",
        "href": "https://imslp.org/wiki/El_amor_brujo_(Falla,_Manuel_de)",
        "image": {
          "src": "/covers/spain-guadalajara-wildfire-evacuations--a5.png",
          "alt": "Black-and-white portrait photograph of the Spanish composer Manuel de Falla holding a cane",
          "credit": "Portrait of Manuel de Falla, Archivo Manuel de Falla. Public domain via Wikimedia Commons."
        }
      }
    ],
    "rank": 38
  },
  {
    "slug": "jessica-morgan-named-tate-director",
    "headline": "Jessica Morgan, leader of New York's Dia Art Foundation, is named the next director of Britain's Tate",
    "overview": "Jessica Morgan, who has led New York's Dia Art Foundation for more than a decade, was named the next director of Tate, the British institution that oversees Tate Modern, Tate Britain and its Liverpool and St Ives galleries. Morgan, who previously held curatorial roles at Tate between 2002 and 2014, succeeds Maria Balshaw and will take up the post in January 2027. Her appointment ends a year-long search for one of the most prominent jobs in the art world.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Artforum",
        "href": "https://www.artforum.com/news/dias-jessica-morgan-appointed-director-of-tate-1234755310/"
      },
      {
        "name": "The Art Newspaper",
        "href": "https://www.theartnewspaper.com/2026/07/22/jessica-morgan-named-new-tate-director"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-22",
    "image": {
      "src": "/covers/jessica-morgan-named-tate-director.png",
      "alt": "The vast Turbine Hall interior of the Tate Modern, figures dwarfed by the industrial space",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 22 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Demetrius of Phalerum, Keeper of the Great Library of Alexandria",
        "excerpt": "Demetrius of Phalerum, the president of the king's library, received vast sums of money, for the purpose of collecting together, as far as he possibly could, all the books in the world.",
        "source": "Letter of Aristeas (c. 2nd century BC), trans. R. H. Charles",
        "href": "https://www.attalus.org/translate/aristeas1.html",
        "image": {
          "src": "/covers/jessica-morgan-named-tate-director--a0.png",
          "alt": "A 19th-century artistic reconstruction of the interior of the Great Library of Alexandria, with scholars among tall columns and shelves of scrolls.",
          "credit": "O. Von Corven, 19th century (public domain), via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "The British Museum Act 1753 and Sir Hans Sloane's Bequest",
        "excerpt": "Whereas Sir Hans Sloane of Chelsea, in the County of Middlesex Baronet, having, through the Course of many Years, with great Labour and Expence, gathered together whatever could be procured either in our own or foreign Countries, that was rare and curious, did, by a Codicil bearing Date the Twentieth Day of July in the Year of our Lord One thousand seven hundred and forty-nine, and annexed to his last Will and Testament, after having expressed his Will and Desire that his Collection, in all its Branches, might be, if it were possible, kept and preserved together Whole and Intire, in his Manor House in the Parish of Chelsea",
        "source": "British Museum Act 1753 (26 Geo. 2 c. 22), preamble",
        "href": "https://statutes.org.uk/site/the-statutes/eighteenth-century/1753-26-george-2-c-22-establishing-the-british-museum/",
        "image": {
          "src": "/covers/jessica-morgan-named-tate-director--a1.png",
          "alt": "Oil portrait of Sir Hans Sloane, seated in dark robes, whose bequeathed collection founded the British Museum.",
          "credit": "Stephen Slaughter, 1736, National Portrait Gallery, London (NPG 569), public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Odysseus Reclaims His House — Homer, Odyssey, Book 23",
        "excerpt": "A bush of long-leafed olive was growing within the court, strong and vigorous, and girth it was like a pillar. Round about this I built my chamber, till I had finished it, with close-set stones, and I roofed it over well, and added to it jointed doors, close-fitting.",
        "source": "Homer, Odyssey, Book 23, trans. A. T. Murray (1919)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0136%3Abook%3D23%3Acard%3D205",
        "image": {
          "src": "/covers/jessica-morgan-named-tate-director--a2.png",
          "alt": "Renaissance painting of Ulysses and Penelope reunited and embracing in their bedchamber after his long homecoming.",
          "credit": "Francesco Primaticcio, 'Ulysses and Penelope', c. 1563, Toledo Museum of Art (public domain), via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "The Keeper of the Papers — Henry James, The Aspern Papers",
        "excerpt": "I hold it singular, as I look back, that I should never have doubted for a moment that the sacred relics were there; never have failed to feel a certain joy at being under the same roof with them.",
        "source": "Henry James, The Aspern Papers (1888)",
        "href": "https://www.gutenberg.org/files/211/211-h/211-h.htm",
        "image": {
          "src": "/covers/jessica-morgan-named-tate-director--a3.png",
          "alt": "John Singer Sargent's oil portrait of the novelist Henry James, shown in profile against a dark ground.",
          "credit": "John Singer Sargent, 1913, National Portrait Gallery, London (NPG 1767), public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Haydn's 'Farewell' Symphony and the Esterhazy Court",
        "excerpt": "For three decades Joseph Haydn served as Kapellmeister to the Esterhazy princes, the keeper of a whole musical establishment whose taste his music quietly shaped. In the 1772 'Farewell' Symphony he made patronage itself audible: as the finale winds down, the players snuff their candles and depart one by one, a courtly plea to the prince to let the homesick musicians return home. It is the sound of a great institution's steward negotiating, with exquisite tact, between his patron and those in his charge.",
        "source": "Joseph Haydn, Symphony No. 45 in F-sharp minor 'Farewell' (1772), score at IMSLP",
        "href": "https://imslp.org/wiki/Symphony_No.45_(Haydn,_Joseph)",
        "image": {
          "src": "/covers/jessica-morgan-named-tate-director--a4.png",
          "alt": "Painted portrait of the composer Joseph Haydn, seated with quill in hand, by Thomas Hardy.",
          "credit": "Thomas Hardy, 1791 (public domain), via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Isabella Stewart Gardner, Founder of Fenway Court",
        "excerpt": "Isabella Stewart Gardner poured a fortune and a lifetime of collecting into Fenway Court, a Venetian-style palace in Boston she built to house her treasures and open to the public as a temple to art. Sargent's towering 1888 portrait shows her frontal and iconic against a shimmering brocade, an image so charged that her husband asked it never be shown publicly in his lifetime. The founder-keeper made herself part of the collection, and her will decreed the whole be preserved unchanged, forever.",
        "source": "John Singer Sargent, Isabella Stewart Gardner (1888), Isabella Stewart Gardner Museum, Boston",
        "href": "https://www.gardnermuseum.org/experience/collection/10867",
        "image": {
          "src": "/covers/jessica-morgan-named-tate-director--a5.png",
          "alt": "Full-length Sargent portrait of Isabella Stewart Gardner in a black gown, standing frontally against a patterned gold ground.",
          "credit": "John Singer Sargent, 1888, Isabella Stewart Gardner Museum, Boston (public domain), via Wikimedia Commons"
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
