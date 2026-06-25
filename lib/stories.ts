// The reading model for the public site. Today these are placeholder stories;
// in a later stage `getPublishedStories` / `getStoryBySlug` will read published
// `events` (+ their verified `analogies`) from Neon. The shapes here mirror that
// data model (ARCHITECTURE.md §5) so the swap is a query change, not a refactor.
//
// Future Neon columns implied below: events gain `genre`, `lead`, `rank`, and
// image columns; `sources` becomes a related table (or jsonb). Images are
// optional everywhere.

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

// Hand-curated front page. The 2026-06-24 edition (ranks 1-13) leads; the prior
// 2026-06-23 edition follows (ranks 14-26). Selected from the live RSS feeds in
// `lib/feeds.ts`. The analogies are the heart of each story: six per event, two
// per category, each linking to a real human-written source (a primary text,
// museum object page, or archive). Excerpts quote the most relevant passage
// verbatim where the source is public domain, and otherwise describe rather than
// quote, in keeping with the strict-verification ethos. Covers are dithered local copies: feed
// or rights-clean Wikimedia art credited to the source, otherwise an
// AI-generated illustration (credit "AI-generated", from `npm run images:generate`).
// Source links to AP/Reuters are Google News redirects (see `lib/feeds.ts`); a
// later verify pass canonicalizes them.
const stories: Story[] = [
  {
    "slug": "venezuela-earthquakes-strike-caracas",
    "headline": "Back-to-back earthquakes strike Venezuela, collapsing buildings in Caracas",
    "overview": "Two powerful back-to-back earthquakes struck Venezuela, toppling buildings in the capital, Caracas, and prompting rescue efforts as officials warned of high casualties. The tremors sent residents into the streets and knocked out power and communications in parts of the city.",
    "genre": "Science",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMikgFBVV95cUxOVXpHa29VWnJ2cGpHZkR5NUJiU1NaTHNkNFJmeTU3WGhlMlFodlZ5cGFSRVhLVnlEcHhJUDN1VVZCenR5UExaQmNrYS1OSVFJRE5yUkN3RjlzZWxPZktaSjY2b0R3YW9oRzh3S05WanhJQjRLb1NUanp1ZEdrb3FVWWxaR1ViTGhxU0FhQTJTajI0UQ?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMijwFBVV95cUxNc09ZREJlMlRMQTdKeWM3QUI4RmpVbHBtWl9zamk2V1lxU2NESnVPaXZYa2pWdllSWGpHZ3hpWVMxbzV5OUJLN084ZDNtWEJSV1R5d3Fqb29GajBGbTFGaldHWmxaM1phOEw4YUdUYklTTEo3cU0tVHNDMmsyVTZ1Q3JrcThUeUZkajl3ZVlGYw?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-25",
    "image": {
      "src": "/covers/venezuela-earthquakes-strike-caracas.png",
      "alt": "Rescue workers searching a partly collapsed apartment building after an earthquake.",
      "credit": "AI-generated"
    },
    "lead": true,
    "edition": "Morning Edition · 25 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Caracas Earthquake of 1812",
        "excerpt": "On Maundy Thursday, 26 March 1812, a powerful earthquake threw down Caracas in an instant, killing an estimated 15,000-20,000 people and reducing much of the capital to ruins. Royalist clergy proclaimed the disaster divine punishment for the independence struggle; Simon Bolivar, digging in the rubble for survivors, answered that if Nature were against the patriots they would fight Nature and force it to obey. The episode is the closest precedent for today's catastrophe: the same city, the same sudden collapse of buildings, the same desperate rescue work amid the wreckage.",
        "source": "Encyclopaedia Britannica, \"Caracas\" (History)",
        "href": "https://www.britannica.com/place/Caracas"
      },
      {
        "category": "historical",
        "title": "The Lisbon Earthquake of 1755",
        "excerpt": "The most famous urban earthquake in European history struck on All Saints' Day, when much of the population was at mass. As Britannica records, \"Violent shaking demolished large public buildings and about 12,000 dwellings,\" and \"the churches, unable to withstand the seismic shock, collapsed, killing or injuring thousands of worshippers,\" with an estimated 60,000 dead in Lisbon alone. Like Caracas, a thriving capital was thrown down between one moment and the next, leaving survivors to dig through ruins.",
        "source": "Encyclopaedia Britannica, \"Lisbon earthquake of 1755\"",
        "href": "https://www.britannica.com/event/Lisbon-earthquake-of-1755"
      },
      {
        "category": "literary",
        "title": "Candide, Chapter V (Voltaire)",
        "excerpt": "Scarcely had they reached the city, lamenting the death of their benefactor, when they felt the earth tremble under their feet. The sea swelled and foamed in the harbour, and beat to pieces the vessels riding at anchor. Whirlwinds of fire and ashes covered the streets and public places; houses fell, roofs were flung upon the pavements, and the pavements were scattered. Thirty thousand inhabitants of all ages and sexes were crushed under the ruins.",
        "source": "Voltaire, Candide (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/19942/19942-h/19942-h.htm"
      },
      {
        "category": "literary",
        "title": "Revelation 16:18-20 (King James Bible)",
        "excerpt": "And there were voices, and thunders, and lightnings; and there was a great earthquake, such as was not since men were upon the earth, so mighty an earthquake, and so great. And the great city was divided into three parts, and the cities of the nations fell: and great Babylon came in remembrance before God, to give unto her the cup of the wine of the fierceness of his wrath. And every island fled away, and the mountains were not found.",
        "source": "The Bible (King James), Revelation (Wikisource)",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Revelation"
      },
      {
        "category": "artistic",
        "title": "The Earthquake of 1755 (Joao Glama Stroberle)",
        "excerpt": "Painted in the decades after the disaster by a Lisbon-born artist who lived through its aftermath, this large canvas plunges the viewer into the moment of collapse: figures flee through tilting streets while buildings crack and topple, the dead and dying scattered across the foreground beneath a roiling sky. It captures exactly what Caracas now confronts, a city overwhelmed in an instant, with the living clambering over fallen masonry to reach the trapped.",
        "source": "Joao Glama Stroberle, The Earthquake of 1755, Museu Nacional de Arte Antiga, Lisbon (Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:O_Terramoto_de_1755_(1756-92)_-_Jo%C3%A3o_Glama_(MNAA).png",
        "image": {
          "src": "/covers/venezuela-earthquakes-strike-caracas--art.png",
          "alt": "Painting depicting the 1755 Lisbon earthquake, with collapsing buildings, fleeing crowds, and the dead amid ruins under a dark sky.",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Il Terremoto (The Earthquake), from Haydn's Seven Last Words of Christ",
        "excerpt": "Haydn closed his 1786 orchestral meditation on the death of Christ with a finale marked Presto e con tutta la forza, titled Il Terremoto, The Earthquake. After hours of slow, hushed contemplation, the full orchestra erupts in violent unison hammer-blows, trumpets and timpani shaking the music to its foundations to depict the earth convulsing. It is the sound of the ground itself giving way, the same terror that swallowed the buildings of Caracas.",
        "source": "Joseph Haydn, Die Worte des Erlosers am Kreuze (Seven Last Words of Christ), Hob.XX:1 (IMSLP)",
        "href": "https://imslp.org/wiki/Die_Worte_des_Erl%C3%B6sers_am_Kreuze,_Hob.XX:1_(Haydn,_Joseph)"
      }
    ],
    "rank": 1
  },
  {
    "slug": "micron-qualcomm-ai-chip-stock-rally",
    "headline": "Micron and Qualcomm forecasts spark a $400 billion AI chip stock rally",
    "overview": "Upbeat forecasts from Micron and Qualcomm ignited a roughly $400 billion rally in AI-related chip stocks, easing fears of a slowdown in artificial-intelligence spending. Micron topped earnings estimates and pointed to $22 billion in customer deals, while Qualcomm projected $15 billion in data-center chip sales by 2029.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMirgFBVV95cUxPdVFvNUJ1aWV0VTctX1lFeEFKM1dkVUVKWlhLT3FORGtCUlNnbWx1MFJnVEpNSzc3NjhQVWc3ekJyRDBwNHpaNERuMjl4NHR0Vjd1b0oyVGF0aHZVU19pb01jQ18yTmF3azh3d1pQeWhMbFlxd0pjM2NDR3VwbDNCWjJ4QXUta0lHYUFHOUIwaHZ6aUVJajNZZHNsaUxCUWRYTlgxczNwU3FzTDFVMkE?oc=5"
      },
      {
        "name": "Reuters — Qualcomm data-center forecast",
        "href": "https://news.google.com/rss/articles/CBMixwFBVV95cUxOYnR1NDI4aWZHU3RPUlpodXhUMGlKSXFMU3k0QWZOY2hYSVdsVDlDdnhuSF9BaHh3UlV2WURZeFZQVGVKSFluTlJ4WmVHTEJVQy04clNMR3VONzUycVVUNm5zcHhOVW9EcmdGVXFtR2V6bEVMeE4zOVVNUnAyYUpnRklIWWh3eTZyR0lnUzBkeGNiWXhMRFN4ME9IZm9WMlFwM2I0eC1mY2lwY1B3T21RYUhqNjhNbXhGcHB5UHQxOTlQcXJfN2VV?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-25",
    "image": {
      "src": "/covers/micron-qualcomm-ai-chip-stock-rally.png",
      "alt": "A stock-exchange display board lit up with rising share prices.",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 25 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Tulipomania",
        "excerpt": "Nobles, citizens, farmers, mechanics, seamen, footmen, maidservants, even chimney-sweeps and old clotheswomen, dabbled in tulips. People of all grades converted their property into cash, and invested it in flowers.",
        "source": "Charles Mackay, Memoirs of Extraordinary Popular Delusions and the Madness of Crowds (1841), ch. 3, “The Tulipomania”",
        "href": "https://www.econlib.org/book-chapters/chapter-ch-3-the-tulipomania/"
      },
      {
        "category": "historical",
        "title": "The South-Sea Bubble",
        "excerpt": "Exchange Alley was in a fever of excitement. The company's stock, which had been at a hundred and thirty the previous day, gradually rose to three hundred, and continued to rise with the most astonishing rapidity during the whole time that the bill in its several stages was under discussion.",
        "source": "Charles Mackay, Memoirs of Extraordinary Popular Delusions and the Madness of Crowds (1841), ch. 2, “The South-Sea Bubble”",
        "href": "https://www.econlib.org/book-chapters/chapter-ch-2-the-south-sea-bubble/"
      },
      {
        "category": "literary",
        "title": "The Alchemist",
        "excerpt": "This is the day, wherein, to all my friends, / I will pronounce the happy word, BE RICH; / THIS DAY YOU SHALL BE SPECTATISSIMI. / You shall no more deal with the hollow die, / Or the frail card.",
        "source": "Ben Jonson, The Alchemist (1610), Act II, Scene I (Sir Epicure Mammon)",
        "href": "https://www.gutenberg.org/files/4081/4081-h/4081-h.htm"
      },
      {
        "category": "literary",
        "title": "Roughing It",
        "excerpt": "To make money, and make it fast, was as easy as it was to eat your dinner.",
        "source": "Mark Twain, Roughing It (1872), on the Nevada silver “flush times”",
        "href": "https://www.gutenberg.org/files/8586/8586-h/8586-h.htm"
      },
      {
        "category": "artistic",
        "title": "Oh! Susanna",
        "excerpt": "Stephen Foster's lilting 1848 minstrel tune became the unofficial anthem of the 1849 gold rush, sung by forty-niners as they streamed west chasing instant fortune. Its giddy, optimistic refrain captured the euphoric certainty that untold riches lay just over the horizon. The melody distilled an entire nation's speculative dream into a few bars of irrepressible cheer.",
        "source": "Stephen Foster, “Oh! Susanna” (first published 1848), gold-rush anthem of the forty-niners",
        "href": "https://imslp.org/wiki/Oh!_Susanna_(Foster,_Stephen)"
      },
      {
        "category": "artistic",
        "title": "Satire on Tulip Mania",
        "excerpt": "Jan Brueghel the Younger paints the tulip speculators of 1630s Holland as foolish monkeys in fine merchant dress, weighing bulbs, counting coins, and sealing deals with handshakes over a lavish banquet. In the aftermath one monkey urinates on now-worthless blooms while another is hauled before a judge and a ruined buyer is carried to his grave. The canvas turns a financial frenzy into a biting allegory of greed and the inevitable reckoning that follows euphoria.",
        "source": "Jan Brueghel the Younger, A Satire of Tulip Mania, c. 1640, oil on panel, Frans Hals Museum, Haarlem",
        "href": "https://commons.wikimedia.org/wiki/File:Jan_Brueghel_the_Younger,_Satire_on_Tulip_Mania,_c._1640.jpg",
        "image": {
          "src": "/covers/micron-qualcomm-ai-chip-stock-rally--art.png",
          "alt": "Jan Brueghel the Younger's painting depicting tulip-mania speculators as monkeys weighing bulbs, counting money, and facing ruin in a Dutch landscape",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 2
  },
  {
    "slug": "anthropic-accuses-alibaba-of-extracting-claude",
    "headline": "Anthropic accuses Alibaba of illicitly extracting its Claude AI capabilities",
    "overview": "Anthropic accused the Chinese technology giant Alibaba of illicitly extracting capabilities from its Claude AI models, a technique that can be used to copy a rival's system. The allegation deepens tensions between leading US and Chinese artificial-intelligence developers.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiuwFBVV95cUxOUjhQd2FfckN3bVZ1MS1YQUs1OUJ2R0lsVDREY0tJMlRPbVBTMHFscE92X3B5UnVOajZaYnhsSUhNSHdmNE1md3hIc0FJWWRfcEktajFjTjBkX04tNEIxOVpFajd3eWJJRk05T1d2WTJhRjF5Mkl1TFNjbTJNY0czVGR2bDNFVTdrOUI5czR1dUZpckVzMXdqenJNbGppNjVVWXZNbHpUMlIteTJ1Q3hnSDltTnpSSFBhWmpZ?oc=5"
      },
      {
        "name": "Reuters (via AOL)",
        "href": "https://www.aol.com/articles/anthropic-says-alibaba-illicitly-extracted-203048000.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-25",
    "image": {
      "src": "/covers/anthropic-accuses-alibaba-of-extracting-claude.png",
      "alt": "Glowing data streaming between two rows of server racks in a dark data center.",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 25 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Robert Fortune and the theft of China's tea secrets",
        "excerpt": "Another journey, undertaken in 1848 on behalf of the East India Company, had much more important consequences, occasioning the successful introduction into India of the tea plant in 1851.",
        "source": "Encyclopaedia Britannica, \"Robert Fortune\"",
        "href": "https://www.britannica.com/biography/Robert-Fortune"
      },
      {
        "category": "historical",
        "title": "The stolen arcanum of Meissen porcelain",
        "excerpt": "By 1717, however, a competing production was set up at Vienna, as Samuel Stöltzel, head of the craftsmen and arcanist at Meissen, sold the secret recipe, which involved the use of kaolin.",
        "source": "Wikipedia, \"Meissen porcelain\"",
        "href": "https://en.wikipedia.org/wiki/Meissen_porcelain"
      },
      {
        "category": "literary",
        "title": "Prometheus steals fire from Zeus (Hesiod, Works and Days)",
        "excerpt": "He hid fire; but that the noble son of Iapetus stole again for men from Zeus the counsellor in a hollow fennel-stalk, so that Zeus who delights in thunder did not see it.",
        "source": "Hesiod, Works and Days, trans. Hugh G. Evelyn-White (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/348/348-h/348-h.htm"
      },
      {
        "category": "literary",
        "title": "The Pupil in Magic (The Sorcerer's Apprentice), by Goethe",
        "excerpt": "I am now,—what joy to hear it!—\nOf the old magician rid;\nAnd henceforth shall every spirit\nDo whate'er by me is bid;\nI have watched with rigour\nAll he used to do,\nAnd will now with vigour\nWork my wonders too.",
        "source": "The Works of J. W. von Goethe, Vol. 9, \"The Pupil in Magic,\" trans. Edgar Alfred Bowring (Wikisource)",
        "href": "https://en.wikisource.org/wiki/The_Works_of_J._W._von_Goethe/Volume_9/The_Pupil_in_Magic"
      },
      {
        "category": "artistic",
        "title": "Prometheus Bound, by Peter Paul Rubens (with Frans Snyders)",
        "excerpt": "Rubens and Snyders depict the Titan Prometheus chained to a rock, his torso torn open by Zeus's eagle as punishment for stealing fire from the gods and giving it to humankind. The violent, muscular composition turns the price of stolen knowledge into a monumental image of divine retribution. The painting, begun about 1611-12 and completed by 1618, hangs in the Philadelphia Museum of Art.",
        "source": "Philadelphia Museum of Art / Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Peter_Paul_Rubens,_Flemish_(active_Italy,_Antwerp,_and_England)_-_Prometheus_Bound_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/anthropic-accuses-alibaba-of-extracting-claude--art.png",
          "alt": "Rubens's painting Prometheus Bound, showing the chained Titan attacked by an eagle as punishment for stealing fire",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "L'apprenti sorcier (The Sorcerer's Apprentice), by Paul Dukas",
        "excerpt": "Dukas's 1897 symphonic scherzo sets Goethe's ballad to music, depicting the apprentice who, having watched his master, recites a half-learned spell to make a broom fetch water and then loses all control of the forces he has unleashed. The orchestral score is preserved on IMSLP. It dramatizes the peril of copying a master's craft without truly mastering it.",
        "source": "L'apprenti sorcier (Dukas, Paul) — IMSLP",
        "href": "https://imslp.org/wiki/L'apprenti_sorcier_(Dukas,_Paul)"
      }
    ],
    "rank": 3
  },
  {
    "slug": "world-court-judges-sue-trump-over-sanctions",
    "headline": "International Court of Justice judges sue the Trump administration over US sanctions",
    "overview": "Judges of the International Court of Justice filed suit against the Trump administration over sanctions imposed on the court, arguing the measures unlawfully target them for their official work. The case escalates a confrontation between Washington and the United Nations' top judicial body.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMisAFBVV95cUxQeHlOSy1RQVNCdks4TlFKbm1TajIwQTd6T19rYVVYTzBETWlYTDRxYkFmb080QWh6RTNUdk8wSjNkN0lqUXVxWjZlTmMxUFVsaFE5cXdhNEdMLTkyY19zNENRcWRpU1NfTzNqR2Q1YnNXTFE0N3RCaXdUeXJpZE8zeDZrZXctWnl0MTZDNlRXU1hZUDRwTGo5RzRyT3B0Z0hmZmZ4TWVkRnNUNU9ZV1JfOQ?oc=5"
      },
      {
        "name": "Arab News",
        "href": "https://www.arabnews.com/node/2648485/world"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-25",
    "image": {
      "src": "/covers/world-court-judges-sue-trump-over-sanctions.png",
      "alt": "An empty judge's bench beneath a set of brass scales of justice.",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 25 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Trial of Socrates (Plato's Apology)",
        "excerpt": "Men of Athens, I honour and love you; but I shall obey God rather than you, and while I have life and strength I shall never cease from the practice and teaching of philosophy, exhorting any one whom I meet and saying to him after my manner: You, my friend,—a citizen of the great and mighty and wise city of Athens,—are you not ashamed of heaping up the greatest amount of money and honour and reputation, and caring so little about wisdom and truth and the greatest improvement of the soul, which you never regard or heed at all?",
        "source": "Plato, Apology, trans. Benjamin Jowett (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/1656/1656-h/1656-h.htm"
      },
      {
        "category": "historical",
        "title": "Sir Edward Coke Defies King James I (Prohibitions del Roy, 1607)",
        "excerpt": "that Bracton saith, Quod Rex non debet esse sub homine, sed sub Deo & Lege.",
        "source": "Sir Edward Coke, Prohibitions del Roy (1607), Online Library of Liberty",
        "href": "https://oll.libertyfund.org/pages/1658-coke-prohibitions-del-roy-pamphlet"
      },
      {
        "category": "literary",
        "title": "Antigone defies Creon's decree",
        "excerpt": "Yes; for it was not Zeus that had published me that edict; not such are the laws set among men by the Justice who dwells with the gods below; nor deemed I that thy decrees were of such force, that a mortal could override the unwritten and unfailing statutes of heaven.",
        "source": "Sophocles, Antigone, trans. R. C. Jebb (1917), Wikisource",
        "href": "https://en.wikisource.org/wiki/Tragedies_of_Sophocles_(Jebb_1917)/Antigone"
      },
      {
        "category": "literary",
        "title": "A Man for All Seasons by Robert Bolt",
        "excerpt": "Robert Bolt's drama stages the fatal collision between Henry VIII and his lord chancellor Sir Thomas More, who will not bend his conscience or the law to serve the king's will. More insists that the protections of the law must stand even for the king's enemies, and he is destroyed for refusing to make the law a mere instrument of power. The play has become a touchstone for the idea that justice must not yield to a ruler's displeasure.",
        "source": "Britannica entry on A Man for All Seasons (play by Bolt)",
        "href": "https://www.britannica.com/topic/A-Man-for-All-Seasons-play-by-Bolt"
      },
      {
        "category": "artistic",
        "title": "Honoré Daumier, Les Gens de Justice",
        "excerpt": "In his mid-19th-century lithograph series Les Gens de Justice, Honoré Daumier turned a satirical eye on the courts, depicting robed judges and advocates whose grand poses mask vanity, cruelty and the gulf between legal ritual and true justice. The works expose how the machinery of the law can be bent by those who wield it, making the courtroom a stage for power rather than fairness. Daumier's biting images remain a lasting visual indictment of justice betrayed.",
        "source": "Honoré Daumier, Les Gens de Justice (lithograph series, c. 1846), Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Honor%C3%A9_Daumier_-_Les_Gens_de_Justice-_M._L%27Avocat_a_rendu_pleine_Justice..._-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/world-court-judges-sue-trump-over-sanctions--art.png",
          "alt": "Honoré Daumier lithograph from Les Gens de Justice showing a robed advocate gesturing in a courtroom",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Ludwig van Beethoven, Fidelio, Op. 72",
        "excerpt": "Beethoven's only opera tells of Florestan, a man unjustly imprisoned by the tyrannical governor Pizarro for daring to speak the truth, and of Leonore, who disguises herself to free him. The score builds to the triumph of justice over arbitrary power, as lawful authority arrives to overturn the abuses of a ruler who placed himself above the law. Fidelio stands as music's great hymn to liberty and the vindication of the innocent against political persecution.",
        "source": "Ludwig van Beethoven, Fidelio, Op. 72, IMSLP (Petrucci Music Library)",
        "href": "https://imslp.org/wiki/Fidelio,_Op.72_(Beethoven,_Ludwig_van)"
      }
    ],
    "rank": 4
  },
  {
    "slug": "judge-blocks-trump-proof-of-citizenship-voting",
    "headline": "Federal judge blocks Trump's proof-of-citizenship requirement to vote",
    "overview": "A federal judge barred the Trump administration from implementing a requirement that voters show documentary proof of citizenship to register, ruling the policy exceeded the president's authority. The decision is the latest court setback for the administration's election measures.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMiiAFBVV95cUxON2FiZ2FvcDFKQzFnek9IUy1oRnJfY3I4SU5UeVJZNVJFRjJkWkxqQ2kyb2lSa01nT1htUDZiMmg3XzBkcGJoSWxieTVKbjE0d1lPeEhZbEljSGxTNWxtRDFyQVBwNldpVjZUODVFZDBzQ1pJQkVENnlpcFZXN3hLQl9jOTR6VURa?oc=5"
      },
      {
        "name": "Democracy Docket",
        "href": "https://www.democracydocket.com/news-alerts/court-permanently-blocks-key-parts-of-trumps-first-anti-voting-executive-order/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-25",
    "image": {
      "src": "/covers/judge-blocks-trump-proof-of-citizenship-voting.png",
      "alt": "A hand placing a paper ballot into a sealed voting box.",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 25 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Fifteenth Amendment to the U.S. Constitution (1870)",
        "excerpt": "The right of citizens of the United States to vote shall not be denied or abridged by the United States or by any State on account of race, color, or previous condition of servitude. The Congress shall have power to enforce this article by appropriate legislation.",
        "source": "U.S. National Archives, Milestone Documents",
        "href": "https://www.archives.gov/milestone-documents/15th-amendment"
      },
      {
        "category": "historical",
        "title": "Lyndon B. Johnson, \"The American Promise\" (We Shall Overcome) speech, March 15, 1965",
        "excerpt": "Every device of which human ingenuity is capable has been used to deny this right. The Negro citizen may go to register only to be told that the day is wrong, or the hour is late, or the official in charge is absent.",
        "source": "Wikisource (Public Papers of the Presidents: Lyndon B. Johnson, 1965)",
        "href": "https://en.wikisource.org/wiki/We_Shall_Overcome_(Johnson)"
      },
      {
        "category": "literary",
        "title": "Frederick Douglass, \"What to the Slave is the Fourth of July?\" (1852)",
        "excerpt": "Your high independence only reveals the immeasurable distance between us. The blessings in which you, this day, rejoice, are not enjoyed in common.—The rich inheritance of justice, liberty, prosperity and independence, bequeathed by your fathers, is shared by you, not by me.",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/What_to_the_Slave_is_the_Fourth_of_July"
      },
      {
        "category": "literary",
        "title": "John Greenleaf Whittier, \"The Poor Voter on Election Day\" (1852)",
        "excerpt": "The proudest now is but my peer, / The highest not more high; / To-day, of all the weary year, / A king of men am I.",
        "source": "Wikisource (The Complete Poetical Works of John Greenleaf Whittier, 1895)",
        "href": "https://en.wikisource.org/wiki/The_Complete_Poetical_Works_of_John_Greenleaf_Whittier/The_Poor_Voter_on_Election_Day"
      },
      {
        "category": "artistic",
        "title": "George Caleb Bingham, \"The County Election\" (1852)",
        "excerpt": "Bingham's panoramic oil painting stages the spectacle of a frontier Missouri election day, with a clerk swearing in voters one by one as a boisterous crowd of citizens gathers at the polling place. It dramatizes who is allowed to step up and cast a ballot, capturing both the promise and the limits of the franchise in the early republic.",
        "source": "Wikimedia Commons (Saint Louis Art Museum)",
        "href": "https://commons.wikimedia.org/wiki/File:George_Caleb_Bingham_-_The_County_Election.jpg",
        "image": {
          "src": "/covers/judge-blocks-trump-proof-of-citizenship-voting--art.png",
          "alt": "George Caleb Bingham's 1852 painting The County Election, depicting a crowd of citizens gathered at a frontier polling place as voters are sworn in one by one.",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Henry Mayer, \"The Awakening\" (1915)",
        "excerpt": "Mayer's centerfold cartoon from Puck magazine shows a torch-bearing figure of Liberty in a cape reading \"Votes for Women\" striding eastward across a map of the United States. Light spreads from the western states that had already enfranchised women toward the darkened East, where women reach out for the vote, picturing suffrage as an unstoppable advance of citizenship.",
        "source": "Wikimedia Commons (Cornell University Library, PJ Mode Collection)",
        "href": "https://commons.wikimedia.org/wiki/File:Henry_Mayer,_The_Awakening,_1915_Cornell_CUL_PJM_1176_01_-_Restoration.jpg"
      }
    ],
    "rank": 5
  },
  {
    "slug": "us-clears-f-35-jet-sales-to-turkey",
    "headline": "US moves to clear F-35 and jet-engine sales to Turkey ahead of NATO summit",
    "overview": "The United States said it is reviewing how to let Turkey acquire F-35 fighter jets and signaled it will move forward with jet-engine sales, days before a NATO summit. The shift would mark a thaw after Washington removed Turkey from the F-35 program over its purchase of Russian air defenses.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMivgFBVV95cUxPa3dUYTdScGtsb05LZVB3dVFuY1ZUX0Fjcl9iY0hmOTFkZVhRYXZXRWRiMWtxVFlZY0lQOWVhaXI3MFBwWHp0LXRQaUNwc0hRTWVfYlNVMk8wcWRIT044VzZFSXRRVFdNeEY1eEEzMzJQcWZKOGUwUXg1S2NKN1lGcUxINWN3YUxTYWF0SFl1LWhPaU5md2VoRGxDcGRIRjR2anY4U2ZPYmtMRkhQY0R5bmVaY0syaHlEX2ZyMmFR?oc=5"
      },
      {
        "name": "Reuters — jet engine sales",
        "href": "https://news.google.com/rss/articles/CBMixwFBVV95cUxORHZBcXlkVU9EbDhWVWgyV0tpTDlTUndYdnNpZk1vMzFuQXBGTHdGTFB2WWVFdkFpeGNPQXFManowX1NHdWxqTjZFVU9NSG9DaGk5ODRBNmhNNE9sSl8tX3FTdmdxUGpjeWxQa2RMb2ZFdm1uZDlWYTNNWE44M1hzeVY5NnVxU1RLTTVyQ0hXazN2em9fMjV5SnZlLUo5V3BPVEUxSE5QVTY5cHZXQW54VUFsYXpJY3NnV0hIQWJTLXZlcW5HY004?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-25",
    "image": {
      "src": "/covers/us-clears-f-35-jet-sales-to-turkey.png",
      "alt": "A modern fighter jet parked on a runway at dusk.",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 25 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Lend-Lease Act (1941)",
        "excerpt": "To sell, transfer title to, exchange, lease, lend, or otherwise dispose of, to any such government any defense article",
        "source": "U.S. National Archives, Milestone Documents: Lend-Lease Act (1941)",
        "href": "https://www.archives.gov/milestone-documents/lend-lease-act"
      },
      {
        "category": "historical",
        "title": "Treaty of Alliance Between the United States and France (1778)",
        "excerpt": "The essential and direct End of the present defensive alliance is to maintain effectually the liberty, Sovereignty, and independance absolute and unlimited of the said united States, as well in Matters of Gouvernement as of commerce.",
        "source": "The Avalon Project, Yale Law School: Treaty of Alliance Between The United States and France; February 6, 1778 (Article 2)",
        "href": "https://avalon.law.yale.edu/18th_century/fr1788-2.asp"
      },
      {
        "category": "literary",
        "title": "Virgil, Aeneid, Book II (Laocoon's warning)",
        "excerpt": "O wretched countrymen! what fury reigns? / What more than madness has possess'd your brains? / Think you the Grecians from your coasts are gone? / And are Ulysses' arts no better known? / This hollow fabric either must inclose, / Within its blind recess, our secret foes; / Or 'tis an engine rais'd above the town, / T' o'erlook the walls, and then to batter down. / Somewhat is sure design'd, by fraud or force: / Trust not their presents, nor admit the horse.",
        "source": "Virgil, The Aeneid, trans. John Dryden, Book II (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/228/pg228-images.html"
      },
      {
        "category": "literary",
        "title": "Homer, Iliad, Book VI (Diomedes and Glaucus exchange armour)",
        "excerpt": "And let us make exchange of armour, each with the other, that these men too may know that we declare ourselves to be friends from our fathers' days.",
        "source": "Homer, Iliad, Book 6, trans. A. T. Murray (Perseus Digital Library, Tufts University)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0134%3Abook%3D6%3Acard%3D212"
      },
      {
        "category": "artistic",
        "title": "Giovanni Domenico Tiepolo, The Procession of the Trojan Horse into Troy (c. 1760)",
        "excerpt": "Tiepolo's canvas shows the Trojans hauling the great wooden horse through their gates, rejoicing over what they take to be a gift while it secretly conceals an armed enemy. The crowd's feverish triumph and the looming bulk of the horse turn a celebrated alliance-by-arms into an image of fatal misjudgment. In the background Cassandra is dragged away for prophesying that admitting the gift will doom the city.",
        "source": "The National Gallery, London: Giovanni Domenico Tiepolo, The Procession of the Trojan Horse into Troy (NG3319)",
        "href": "https://www.nationalgallery.org.uk/paintings/giovanni-domenico-tiepolo-the-procession-of-the-trojan-horse-into-troy",
        "image": {
          "src": "/covers/us-clears-f-35-jet-sales-to-turkey--art.png",
          "alt": "Oil painting of crowds hauling a giant wooden horse on wheels through the gates of Troy beneath towering walls",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "George Frideric Handel, Judas Maccabaeus, HWV 63 (chorus: See, the conqu'ring hero comes!)",
        "excerpt": "See, the conqu'ring hero comes!",
        "source": "George Frideric Handel, Judas Maccabaeus, HWV 63, Act III (IMSLP / Petrucci Music Library)",
        "href": "https://imslp.org/wiki/Judas_Maccabaeus,_HWV_63_(Handel,_George_Frideric)"
      }
    ],
    "rank": 6
  },
  {
    "slug": "chemours-forever-chemicals-settlement",
    "headline": "Chemours to pay $450 million to settle 'forever chemicals' case",
    "overview": "The chemical maker Chemours agreed to pay $450 million to settle claims that PFAS 'forever chemicals' contaminated water supplies, US officials said. The settlement is among the largest in a wave of litigation over the long-lasting pollutants.",
    "genre": "Science",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMirgFBVV95cUxPY3VmTGVjNlhOYzM4Ym52RXRFbUFXR1ZxZmpWQ3AxTWFieTgwRmY3LWFqZ0VmZXFlLVZIdnNvY25wRmE2eGxiTXlqeVFrNWxERFppVHdxSXlIRmJWdG9CLU53SHpLQTc0b1pWMlo2QXFOS3laUy1VNmV6Rm0zNmNHcmRjTG5VVm1Bb0ItUEVudnFlTmxvWnBBR3lLM3U3LWVGR3Uzb1d0TlpMajhubmc?oc=5"
      },
      {
        "name": "CBS News",
        "href": "https://www.cbsnews.com/news/chemours-forever-chemicals-pfas-450-million/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-25",
    "image": {
      "src": "/covers/chemours-forever-chemicals-settlement.png",
      "alt": "Foam gathering on the surface of a river below an industrial chemical plant.",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 25 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Minamata Disease (Chisso mercury poisoning, Japan)",
        "excerpt": "Beginning in the 1930s the Chisso chemical factory discharged methylmercury into Minamata Bay, where it accumulated in fish and shellfish and poisoned the people who ate them, causing crippling neurological illness and birth defects. Officially recognized in 1956, it became the first disease acknowledged to be caused by industrial water pollution. Decades of denial, litigation, and compensation followed, making Minamata the archetype of a corporation forced to reckon with the waters it had silently fouled.",
        "source": "Encyclopaedia Britannica",
        "href": "https://www.britannica.com/science/Minamata-disease"
      },
      {
        "category": "historical",
        "title": "The Love Canal Toxic Waste Disaster",
        "excerpt": "In the 1940s and 1950s the Hooker Chemicals and Plastics Corporation buried roughly 22,000 tons of chemical waste in an abandoned canal in Niagara Falls, New York, which was later covered over and built upon as a neighborhood. By 1978 toxic chemicals were seeping into basements and yards, sickening residents, and the site became a national symbol of hidden industrial contamination. Protracted litigation ended with multimillion-dollar settlements paid by Occidental Chemical, the corporate successor, for past contamination of land and water.",
        "source": "Encyclopaedia Britannica",
        "href": "https://www.britannica.com/place/Love-Canal"
      },
      {
        "category": "literary",
        "title": "London, by William Blake",
        "excerpt": "I wander thro' each charter'd street, / Near where the charter'd Thames does flow, / And mark in every face I meet / Marks of weakness, marks of woe.",
        "source": "Wikisource (Songs of Innocence and of Experience, 1826)",
        "href": "https://en.wikisource.org/wiki/London_(Songs_of_Experience)"
      },
      {
        "category": "literary",
        "title": "The Deserted Village, by Oliver Goldsmith",
        "excerpt": "Ill fares the land, to hast'ning ills a prey, / Where wealth accumulates, and men decay: / Princes and lords may flourish, or may fade; / A breath can make them, as a breath has made: / But a bold peasantry, their country's pride, / When once destroy'd, can never be supplied.",
        "source": "CELT: Corpus of Electronic Texts (University College Cork)",
        "href": "https://celt.ucc.ie/published/E750001-001/text001.html"
      },
      {
        "category": "artistic",
        "title": "Israel in Egypt, HWV 54 ('He turned their waters into blood'), by George Frideric Handel",
        "excerpt": "In this 1739 oratorio Handel sets the biblical plagues of Egypt to music, including the grim chorus 'They loathed to drink of the river: He turned their waters into blood.' The chromatic, lurching fugue makes the listener feel the revulsion of waters made undrinkable, dramatizing a land afflicted because of human wrongdoing. It stands as a centuries-old musical image of poisoned waters and the reckoning that follows.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Israel_in_Egypt,_HWV_54_(Handel,_George_Frideric)"
      },
      {
        "category": "artistic",
        "title": "Coalbrookdale by Night, by Philip James de Loutherbourg",
        "excerpt": "Painted in 1801, this oil shows the Bedlam furnaces of Coalbrookdale roaring with flame and smoke, the fires of industry consuming a once-pastoral landscape beneath the moonlight. It has come to symbolize the birth of the Industrial Revolution and the way human industry both transformed and despoiled the natural world. The lurid glow over the darkened valley reads today as an early vision of nature blighted by human hands.",
        "source": "Wikipedia (Coalbrookdale by Night)",
        "href": "https://en.wikipedia.org/wiki/Coalbrookdale_by_Night",
        "image": {
          "src": "/covers/chemours-forever-chemicals-settlement--art.png",
          "alt": "Coalbrookdale by Night (1801) by Philip James de Loutherbourg, showing the fiery glow of industrial furnaces over a darkened valley",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 7
  },
  {
    "slug": "france-air-conditioning-debate-heatwave",
    "headline": "Air conditioning splits France politically after the country records its hottest day",
    "overview": "France's record-breaking heat has ignited a political fight over air conditioning, with parties split over whether to expand its use or discourage it on environmental grounds. The debate erupted after the country logged its hottest day on record during a heatwave across western Europe.",
    "genre": "Climate",
    "sources": [
      {
        "name": "BBC News",
        "href": "https://www.bbc.co.uk/news/articles/c4gyqldl3p5o?at_medium=RSS&at_campaign=rss"
      },
      {
        "name": "Fortune",
        "href": "https://fortune.com/2026/06/22/france-heat-wave-spain-italy-uk-music-dayac/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-25",
    "image": {
      "src": "/covers/france-air-conditioning-debate-heatwave.png",
      "alt": "People resting in narrow strips of shade by a dry fountain during a European heatwave.",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 25 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The European heat wave of 2003",
        "excerpt": "France's deadliest modern heat disaster killed more than 14,000 people in August 2003, most of them elderly and isolated, exposing how little of the country was equipped to cope with extreme heat. The catastrophe shocked French society into rethinking public-health and building responses and remains the touchstone for every later argument over adaptation, including the present fight over air conditioning.",
        "source": "Encyclopaedia Britannica",
        "href": "https://www.britannica.com/event/European-heat-wave-of-2003"
      },
      {
        "category": "historical",
        "title": "The 1976 European heatwave and drought",
        "excerpt": "The summer of 1976 was remembered as the hottest of the twentieth century in western Europe, with the highest temperatures recorded across western France and a months-long drought that scorched crops and emptied reservoirs. It became an early test of how governments and citizens should respond to a sustained, hostile heat, prefiguring today's contest between relief and restraint.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/1976_European_heatwave"
      },
      {
        "category": "literary",
        "title": "Ovid, Metamorphoses, Book II (Phaethon scorches the earth)",
        "excerpt": "The grass is blighted; trees / are burnt up with their leaves; the ripe brown crops / give fuel for self destruction—Oh what small / complaints! Great cities perish with their walls, / and peopled nations are consumed to dust— / the forests and the mountains are destroyed.",
        "source": "Perseus Digital Library (Ovid, Metamorphoses, trans. Brookes More)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0028:book=2:card=227"
      },
      {
        "category": "literary",
        "title": "William Cullen Bryant, “Summer Wind”",
        "excerpt": "It is a sultry day; the sun has drunk\nThe dew that lay upon the morning grass;\nThere is no rustling in the lofty elm\nThat canopies my dwelling, and its shade\nScarce cools me. All is silent, save the faint\nAnd interrupted murmur of the bee,\nSettling on the sick flowers, and then again\nInstantly on the wing.",
        "source": "Project Gutenberg (Poems by William Cullen Bryant)",
        "href": "https://www.gutenberg.org/files/16341/16341-h/16341-h.htm"
      },
      {
        "category": "artistic",
        "title": "Vincent van Gogh, The Sower (June 1888)",
        "excerpt": "Van Gogh paints a peasant striding across a stubble field beneath an enormous yellow sun that fills nearly half the sky, its halo radiating across the canvas. The blazing disc dominates the landscape, turning the heavens molten and pressing its heat over the small laboring figure, an image of human endurance under an overwhelming sun.",
        "source": "Wikimedia Commons (The Sower, Van Gogh, Kröller-Müller Museum)",
        "href": "https://commons.wikimedia.org/wiki/File:Vincent_van_Gogh_-_The_sower_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/france-air-conditioning-debate-heatwave--art.png",
          "alt": "Van Gogh's The Sower, a peasant sowing in a field beneath a huge blazing yellow sun that dominates the sky",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Antonio Vivaldi, “Summer” (L'Estate) from The Four Seasons",
        "excerpt": "Sotto dura Staggion dal Sole accesa / Langue l' huom, langue 'l gregge, ed arde il Pino",
        "source": "IMSLP / Petrucci Music Library (Le quattro stagioni, Vivaldi)",
        "href": "https://imslp.org/wiki/The_Four_Seasons_(Vivaldi,_Antonio)"
      }
    ],
    "rank": 8
  },
  {
    "slug": "ramsa-new-york-historical-extension",
    "headline": "RAMSA completes the Tang Wing extension of the New-York Historical museum",
    "overview": "Robert A. M. Stern Architects has completed the Tang Wing, a new extension for the New-York Historical museum dedicated to the study of American democracy. The classically styled addition adds galleries, a library and an academy on Manhattan's Upper West Side.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Dezeen",
        "href": "https://www.dezeen.com/2026/06/23/tang-wing-american-democracy-new-york-city-ramsa/"
      },
      {
        "name": "Galerie Magazine",
        "href": "https://galeriemagazine.com/tang-wing-for-american-democracy-debuts-at-new-york-historical-society/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-25",
    "image": {
      "src": "/covers/ramsa-new-york-historical-extension.png",
      "alt": "The classical limestone facade of the museum's new Tang Wing extension.",
      "credit": "Dezeen"
    },
    "edition": "Morning Edition · 25 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Vitruvius, The Ten Books on Architecture, Book I, Chapter VII",
        "excerpt": "For the temples, the sites for those of the gods under whose particular protection the state is thought to rest and for Jupiter, Juno, and Minerva, should be on the very highest point commanding a view of the greater part of the city.",
        "source": "Project Gutenberg (Morris H. Morgan translation, 1914)",
        "href": "https://www.gutenberg.org/files/20239/20239-h/20239-h.htm"
      },
      {
        "category": "historical",
        "title": "Thucydides, History of the Peloponnesian War, Book II (Pericles' Funeral Oration)",
        "excerpt": "For heroes have the whole earth for their tomb; and in lands far from their own, where the column with its epitaph declares it, there is enshrined in every breast a record unwritten with no tablet to preserve it, except that of the heart.",
        "source": "Wikisource (Crawley translation)",
        "href": "https://en.wikisource.org/wiki/History_of_the_Peloponnesian_War/Book_2"
      },
      {
        "category": "literary",
        "title": "Walt Whitman, \"For You O Democracy\" (Leaves of Grass, Calamus)",
        "excerpt": "Come, I will make the continent indissoluble,\nI will make the most splendid race the sun ever shone upon,\nI will make divine magnetic lands,\n     With the love of comrades,\n       With the life-long love of comrades.",
        "source": "American Literature (full text, public domain)",
        "href": "https://americanliterature.com/author/walt-whitman/poem/for-you-o-democracy"
      },
      {
        "category": "literary",
        "title": "Daniel Webster, Bunker Hill Monument Oration (1825)",
        "excerpt": "It rises over the land and over the sea; and visible, at their homes, to three hundred thousand of the people of Massachusetts, it stands a memorial of the last, and a monitor to the present, and to all succeeding generations.",
        "source": "American Battlefield Trust (primary sources)",
        "href": "https://www.battlefields.org/learn/primary-sources/dedication-speech-unveiling-bunker-hill-monument"
      },
      {
        "category": "artistic",
        "title": "Thomas Cole, The Architect's Dream (1840)",
        "excerpt": "Cole's oil painting frames a young architect reclining atop a colossal column, dreaming of an imagined landscape crowded with the monuments of the ages. Egyptian pyramids, a Greek Doric temple, a Roman aqueduct and a Gothic cathedral rise in luminous succession, presenting classical architecture as the keeper of civilization's memory. It is a fitting parallel to a classical-style wing conceived as a temple to the American republic and its history.",
        "source": "Toledo Museum of Art / Wikimedia Commons",
        "href": "https://en.wikipedia.org/wiki/The_Architect's_Dream",
        "image": {
          "src": "/covers/ramsa-new-york-historical-extension--art.png",
          "alt": "Thomas Cole's 1840 painting The Architect's Dream, showing an architect reclining atop a tall column amid classical temples, an aqueduct and a Gothic cathedral",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Charles Ives, \"The St.-Gaudens in Boston Common\" from Three Places in New England",
        "excerpt": "The opening movement of Ives's orchestral set is a musical meditation on a civic monument, Augustus Saint-Gaudens's bronze memorial on Boston Common to Colonel Robert Gould Shaw and the 54th Massachusetts Regiment. The slow, layered score weaves Civil War tunes and spirituals into a hushed processional, turning a public memorial into sound. Like a classical wing devoted to American democracy, it treats a monument as a vessel for the keeping of national memory.",
        "source": "IMSLP (Petrucci Music Library)",
        "href": "https://imslp.org/wiki/Three_Places_in_New_England_(Ives,_Charles)"
      }
    ],
    "rank": 9
  },
  {
    "slug": "saype-clasping-arms-mural-minneapolis",
    "headline": "Saype paints a 23,000-square-foot 'clasping arms' land mural in Minneapolis",
    "overview": "The land artist Saype created a 23,000-square-foot biodegradable grass mural of two clasping arms on a Minneapolis green space, part of his global 'Beyond Walls' series celebrating community and human connection. Painted with natural pigments, the work is designed to fade back into the grass.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Colossal",
        "href": "https://www.thisiscolossal.com/2026/06/saype-beyond-walls-minneapolis-temporary-mural/"
      },
      {
        "name": "Colossal",
        "href": "https://www.thisiscolossal.com/2026/06/saype-beyond-walls-minneapolis-temporary-mural/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-25",
    "image": {
      "src": "/covers/saype-clasping-arms-mural-minneapolis.png",
      "alt": "An aerial view of Saype's giant grass mural of two clasping arms on a lawn.",
      "credit": "Colossal"
    },
    "edition": "Morning Edition · 25 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Baltic Way (1989)",
        "excerpt": "On 23 August 1989, roughly two million people across Estonia, Latvia, and Lithuania joined hands to form an unbroken human chain stretching some 675 kilometres between the three capitals. Held on the fiftieth anniversary of the Molotov-Ribbentrop Pact, the fifteen-minute demonstration turned clasped hands into a continent-spanning symbol of solidarity and the shared desire for independence. Like Saype's intertwined arms, it made human connection itself the medium of a vast, temporary, collective artwork.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Baltic_Way"
      },
      {
        "category": "historical",
        "title": "Hands Across America (1986)",
        "excerpt": "On 25 May 1986, an estimated five million people attempted to link hands in a continuous chain from New York's Battery Park to Long Beach, California, threading through sixteen states to raise money against hunger and homelessness. Where gaps opened across the desert, ribbons and ropes stood in for missing hands, yet the gesture of a nation clasping hands across its divides became the event's enduring image. It anticipates the message of Saype's Beyond Walls: that a chain of joined hands can stage solidarity on a landscape scale.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Hands_Across_America"
      },
      {
        "category": "literary",
        "title": "Ozymandias by Percy Bysshe Shelley (1818)",
        "excerpt": "And on the pedestal these words appear: \"My name is Ozymandias, King of Kings.\" Look on my works ye Mighty, and despair! No thing beside remains. Round the decay Of that Colossal Wreck, boundless and bare, The lone and level sands stretch far away.",
        "source": "Wikisource (The Examiner, 1818)",
        "href": "https://en.wikisource.org/wiki/The_Examiner_(London)/Ozymandias"
      },
      {
        "category": "literary",
        "title": "For You O Democracy by Walt Whitman (Leaves of Grass)",
        "excerpt": "I will plant companionship thick as trees along all the rivers of America, and along the shores of the great lakes, and all over the prairies, I will make inseparable cities with their arms about each other's necks, By the love of comrades, By the manly love of comrades.",
        "source": "Project Gutenberg (Leaves of Grass)",
        "href": "https://www.gutenberg.org/files/1322/1322-h/1322-h.htm"
      },
      {
        "category": "artistic",
        "title": "Praying Hands by Albrecht Durer (1508)",
        "excerpt": "Durer's celebrated study renders a pair of hands pressed and clasped together in ink and wash on blue paper, drawn as preparation for the lost Heller Altarpiece. Isolated from any figure, the two hands alone carry the entire weight of devotion and human feeling, much as Saype's mural distills connection into nothing but clasping arms. It remains one of the most reproduced images of joined hands in Western art.",
        "source": "Wikimedia Commons / Albertina, Vienna",
        "href": "https://commons.wikimedia.org/wiki/File:Albrecht_D%C3%BCrer_-_Praying_Hands,_1508_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/saype-clasping-arms-mural-minneapolis--art.png",
          "alt": "Albrecht Durer's 1508 study of two hands pressed and clasped together in prayer, drawn in ink and wash on blue paper.",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Symphony No. 9 (Ode to Joy) by Ludwig van Beethoven (1824)",
        "excerpt": "Beethoven's choral finale sets Schiller's hymn to universal brotherhood, its chorus calling on millions to embrace one another and proclaiming that all people shall become brothers. The surging melody has since become a global anthem of solidarity and fellowship across divides. Its plea to embrace the multitudes mirrors the heart of Saype's Beyond Walls, where clasped hands stand for a single human chain joining city to city.",
        "source": "IMSLP (Petrucci Music Library)",
        "href": "https://imslp.org/wiki/Symphony_No.9,_Op.125_(Beethoven,_Ludwig_van)"
      }
    ],
    "rank": 10
  },
  {
    "slug": "ntsb-investigates-texas-tesla-crash",
    "headline": "US NTSB opens an investigation into a fatal Tesla crash in Texas",
    "overview": "The National Transportation Safety Board said it will investigate a fatal Tesla crash in Texas, examining whether the vehicle's driver-assistance systems were in use. It is the latest federal scrutiny of the automaker's automated-driving technology.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMipgFBVV95cUxPbzQ4REhDNmNqNW5maVlSakJPdnRrTTFnOVFSOWxiQXFuSl9DRFNKaDM0aEhhNklNMU16dnlOV29ncDc1QXdQek5pZDNJb3Z1X3FUSFlBYXZkQ29XbmVPWGNRYjRqRDl5azcxeVp0R2hjdXZYTVFGd1FBZFhNSnNQRk1rVkQtSFdaZWFuWjZKOHctR19sdjFGVHhrNVM3Z0hueWlnUnhR?oc=5"
      },
      {
        "name": "Transport Topics",
        "href": "https://www.ttnews.com/articles/ntsb-tesla-texas-crash"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-25",
    "image": {
      "src": "/covers/ntsb-investigates-texas-tesla-crash.png",
      "alt": "A damaged electric car at the roadside on a dark highway at night.",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 25 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Death of William Huskisson at the Opening of the Liverpool and Manchester Railway (1830)",
        "excerpt": "At the triumphant inauguration of the Liverpool and Manchester Railway on 15 September 1830, the statesman William Huskisson stepped down onto the line and was struck by Stephenson's celebrated locomotive Rocket, becoming one of the first widely reported railway casualties. The very machine paraded as the future of transport killed a man at its own debut, and his death broadcast to the world that rapid mechanical travel was as dangerous as it was revolutionary. It set the enduring pattern of a new technology whose promise and its peril arrive together.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/William_Huskisson"
      },
      {
        "category": "historical",
        "title": "The Tay Bridge Disaster (1879)",
        "excerpt": "On the stormy night of 28 December 1879 the first Tay Rail Bridge, hailed as a marvel of Victorian engineering, collapsed as a passenger train crossed it, plunging every soul aboard into the Firth of Tay and killing 59 people. The Court of Inquiry blamed the design itself, which had made no proper allowance for wind loading, ruining the reputation of its engineer Sir Thomas Bouch. It stands as a parable of automation and engineering hubris outrunning the limits its makers failed to reckon with.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Tay_Bridge_disaster"
      },
      {
        "category": "literary",
        "title": "Frankenstein; or, The Modern Prometheus (Mary Shelley, 1818)",
        "excerpt": "It was on a dreary night of November that I beheld the accomplishment of my toils. With an anxiety that almost amounted to agony, I collected the instruments of life around me, that I might infuse a spark of being into the lifeless thing that lay at my feet.",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/files/84/84-h/84-h.htm"
      },
      {
        "category": "literary",
        "title": "Ovid, Metamorphoses, Book II: The Fall of Phaethon",
        "excerpt": "Soon as the steeds perceived it, with a rush / impetuous, they left the beaten track; / regardless of all order and control; / and Phaethon filled with fear, knew not to guide / with trusted reins, nor where the way might be—",
        "source": "Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0028:book=2:card=150"
      },
      {
        "category": "artistic",
        "title": "Landscape with the Fall of Icarus (after Pieter Bruegel the Elder, c. 1560)",
        "excerpt": "In this celebrated panel held by the Royal Museums of Fine Arts of Belgium, Icarus has already plunged into the sea after flying too near the sun, and only his flailing legs break the water in a corner of the canvas. Plowman, shepherd and ship carry on unmoved, indifferent to the boy whose soaring ambition has just destroyed him. The image distills the myth of human overreach with flight technology, the fatal hubris that drives a creation beyond its safe limits.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Landscape_with_the_Fall_of_Icarus",
        "image": {
          "src": "/covers/ntsb-investigates-texas-tesla-crash--art.png",
          "alt": "Landscape with the Fall of Icarus, showing a plowman, shepherd and ship while Icarus's legs disappear into the sea in the lower right",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "L'apprenti sorcier (The Sorcerer's Apprentice), Paul Dukas (1897)",
        "excerpt": "Dukas's symphonic poem, after Goethe's ballad, sets to music an apprentice who enchants a broomstick to do his labor and then loses all command of it, the magic multiplying and flooding the workshop beyond any human control. Surging, accelerating orchestral figures drive the runaway servant onward until only the returning master can halt the machine the apprentice set in motion. It is the archetypal warning of a created mechanism that turns on its maker once it slips past the bounds of human oversight.",
        "source": "IMSLP",
        "href": "https://imslp.org/wiki/L%27apprenti_sorcier_(Dukas,_Paul)"
      }
    ],
    "rank": 11
  },
  {
    "slug": "white-house-seeks-87-billion-iran-war-ebola",
    "headline": "White House asks Congress for $87.6 billion for Iran war costs, farmers and Ebola",
    "overview": "The White House asked Congress for $87.6 billion in emergency funding to cover costs from the war with Iran, aid to US farmers and the response to an Ebola outbreak. The request would add to federal spending already strained by the recent conflict.",
    "genre": "Economy",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMiqwFBVV95cUxOUDQzaWl6M29jQjFXRGM2MC1IbkhBbG93TVVJcmg1emQ2SkFlYlNRdUtlRlVDU0ExWWY1UGpfaHFvSE4yekhRVGlNWVNrY2p5Nk1Mb05PVEYzX2U4MjFWU1lYUkw3VElTOTFJS1VkLTdoMzF1b25PdzJ5aVdQc2V6X2dZSjNscVdDV1A4eEtoMTM0UDRwVXowYm9uc0VDSVJKMHlFX0J4Vl95dFk?oc=5"
      },
      {
        "name": "Reuters — Ebola funding",
        "href": "https://news.google.com/rss/articles/CBMioAFBVV95cUxPZXdwRVVIQW8wdjlRU1lTVGNDcHRmNmtOUDh3cFh2cmZLamFFdFp6Q0poS2Ztc3YxTjJoMloyNTdKTmk3SWgxMGpwa1ItaTZyVjFjS3Q1Y0toNFU5SDhnWUlDU0g5aDA4RHVDUnJfYUFsNkxQaWJIRkFkYlB2RjRWcENNNDZtUndGSnVOVW84T1hxWkJnM2VDSzVRMmh5QkVN?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-25",
    "image": {
      "src": "/covers/white-house-seeks-87-billion-iran-war-ebola.png",
      "alt": "The dome of the US Capitol against a brooding, stormy sky.",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 25 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Cicero, Philippic V (44 BC)",
        "excerpt": "What is this but to lavish on an enemy all the weapons for civil war? first of all, the sinews of war, infinite treasure, which he now needs; in the next place, cavalry, as many as he wishes.",
        "source": "Cicero, The Fifth Philippic, section 5 (Attalus.org translation)",
        "href": "https://www.attalus.org/cicero/philippic5.html"
      },
      {
        "category": "historical",
        "title": "Dwight D. Eisenhower, \"The Chance for Peace\" (1953)",
        "excerpt": "Every gun that is made, every warship launched, every rocket fired signifies, in the final sense, a theft from those who hunger and are not fed, those who are cold and are not clothed. This world in arms is not spending money alone. It is spending the sweat of its laborers, the genius of its scientists, the hopes of its children. The cost of one modern heavy bomber is this: a modern brick school in more than 30 cities.",
        "source": "Address \"The Chance for Peace\" Delivered Before the American Society of Newspaper Editors, April 16, 1953 (The American Presidency Project)",
        "href": "https://www.presidency.ucsb.edu/documents/address-the-chance-for-peace-delivered-before-the-american-society-newspaper-editors"
      },
      {
        "category": "literary",
        "title": "Rudyard Kipling, \"A Dead Statesman\" from Epitaphs of the War (1919)",
        "excerpt": "I could not dig: I dared not rob:\nTherefore I lied to please the mob.\nNow all my lies are proved untrue\nAnd I must face the men I slew.\nWhat tale shall serve me here among\nMine angry and defrauded young?",
        "source": "Rudyard Kipling, \"Epitaphs of the War\" (Wikisource)",
        "href": "https://en.wikisource.org/wiki/Epitaphs_of_the_War"
      },
      {
        "category": "literary",
        "title": "Wilfred Owen, \"Dulce et Decorum Est\" (1920)",
        "excerpt": "My friend, you would not tell with such high zest\nTo children ardent for some desperate glory,\nThe old Lie: Dulce et decorum est\nPro patria mori.",
        "source": "Poems by Wilfred Owen, \"Dulce et Decorum est\" (Wikisource)",
        "href": "https://en.wikisource.org/wiki/Poems_by_Wilfred_Owen/Dulce_et_Decorum_est"
      },
      {
        "category": "artistic",
        "title": "Gustav Holst, \"Mars, the Bringer of War\" from The Planets, Op. 32 (1914-1916)",
        "excerpt": "Holst's relentless opening movement drives forward on a hammering five-beat ostinato, a mechanized march that swells into brassy, dissonant climaxes. It depicts war not as glory but as an implacable, grinding machine that consumes everything in its path, an apt sonic image for treasure and lives poured into conflict.",
        "source": "The Planets, Op. 32 (Holst, Gustav) (IMSLP / Petrucci Music Library)",
        "href": "https://imslp.org/wiki/The_Planets,_Op.32_(Holst,_Gustav)"
      },
      {
        "category": "artistic",
        "title": "Francisco de Goya, The Disasters of War (c. 1810-1820)",
        "excerpt": "Goya's series of etchings strips war of all pageantry, recording famine, plunder, and slaughter with unsparing realism. The opening plate, \"Tristes presentimientos de lo que va a acontecer\" (Sad forebodings of what is to come), sets the tone for a catalogue of the human price paid when nations turn their resources to violence.",
        "source": "File:Francisco de Goya, Desastre de la Guerra (Disasters of War) (Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Francisco_de_Goya,_Desastre_de_la_Guerra_(Disasters_of_War).JPG",
        "image": {
          "src": "/covers/white-house-seeks-87-billion-iran-war-ebola--art.png",
          "alt": "Francisco de Goya etching \"Tristes presentimientos de lo que va a acontecer\" (Sad forebodings of what is to come), plate 1 of The Disasters of War, showing a kneeling figure amid darkness.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 12
  },
  {
    "slug": "misan-harriman-steps-down-southbank",
    "headline": "Misan Harriman steps down as chair of London's Southbank Centre",
    "overview": "The photographer Misan Harriman announced he will step down as chair of the Southbank Centre, one of Britain's largest arts institutions. His tenure paired his rise as a photographer with a push to broaden the audiences and artists the centre serves.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Artforum",
        "href": "https://www.artforum.com/news/misan-harriman-steps-down-as-southbank-centre-chair-1234753263/"
      },
      {
        "name": "Artforum",
        "href": "https://www.artforum.com/news/misan-harriman-steps-down-as-southbank-centre-chair-1234753263/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-25",
    "image": {
      "src": "/covers/misan-harriman-steps-down-southbank.png",
      "alt": "Portrait of the photographer Misan Harriman.",
      "credit": "Artforum"
    },
    "edition": "Morning Edition · 25 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Abdication of Diocletian (305 AD)",
        "excerpt": "After more than two decades reshaping the Roman state, Diocletian did what no emperor before him had willingly done: he laid down supreme power and retired to private life. He had arranged a succession in advance and entrusted the empire to younger men, then withdrew to his palace by the Adriatic. His voluntary surrender of the highest office became the archetype of the steward who hands on the trust rather than clinging to it.",
        "source": "Encyclopaedia Britannica",
        "href": "https://www.britannica.com/biography/Diocletian/Domestic-reforms"
      },
      {
        "category": "historical",
        "title": "George Washington Resigns His Commission (1783)",
        "excerpt": "On 23 December 1783, having won the war, George Washington walked into the Maryland State House at Annapolis and handed his military commission back to Congress, voluntarily relinquishing power to return to private life. The gesture astonished a world accustomed to victorious generals seizing the state, and it set the founding precedent of civilian stewardship over force. It remains the defining image of a leader who lets go of high office when the work is done.",
        "source": "Wikipedia (George Washington's resignation as commander-in-chief)",
        "href": "https://en.wikipedia.org/wiki/George_Washington%27s_resignation_as_commander-in-chief"
      },
      {
        "category": "literary",
        "title": "King Lear lays down his kingdom (Shakespeare, Act I, Scene 1)",
        "excerpt": "Give me the map there. Know that we have divided / In three our kingdom: and 'tis our fast intent / To shake all cares and business from our age; / Conferring them on younger strengths, while we / Unburthen'd crawl toward death.",
        "source": "The Complete Works of William Shakespeare (MIT)",
        "href": "https://shakespeare.mit.edu/lear/lear.1.1.html"
      },
      {
        "category": "literary",
        "title": "Prospero abjures his art (Shakespeare, The Tempest, Act V)",
        "excerpt": "But this rough magic\nI here abjure; and, when I have required\nSome heavenly music,—which even now I do,—\nTo work mine end upon their senses, that\nThis airy charm is for, I'll break my staff,\nBury it certain fathoms in the earth,\nAnd deeper than did ever plummet sound\nI'll drown my book.",
        "source": "The Tempest, Project Gutenberg",
        "href": "https://www.gutenberg.org/files/23042/23042-h/23042-h.htm"
      },
      {
        "category": "artistic",
        "title": "Napoleon at Fontainebleau, 31 March 1814 (Paul Delaroche)",
        "excerpt": "Paul Delaroche's painting shows the deposed Napoleon seated alone in a chamber of the Palace of Fontainebleau in the hours surrounding his abdication, his hat fallen to the floor and his expression turned inward. The grandeur of the setting only sharpens the picture of a man stripped of supreme office. It is one of art's most studied meditations on the relinquishing of power and the solitude that follows the surrender of high stewardship.",
        "source": "Wikipedia (Napoleon I at Fontainebleau on March 31, 1814)",
        "href": "https://en.wikipedia.org/wiki/Napoleon_I_at_Fontainebleau_on_March_31,_1814",
        "image": {
          "src": "/covers/misan-harriman-steps-down-southbank--art.png",
          "alt": "Paul Delaroche's painting of Napoleon seated alone at the Palace of Fontainebleau around the time of his 1814 abdication, his hat on the floor",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Haydn, Symphony No. 45 in F-sharp minor, 'Farewell' (1772)",
        "excerpt": "Joseph Haydn's 'Farewell' Symphony ends with a quiet stagecraft of departure: in the final Adagio the musicians finish their parts one by one, snuff out their candles and leave the platform, until only a pair of violins remain to close the work. Written so Haydn's players might be released to go home, it has become music's enduring emblem of taking leave and handing the moment on. The slow emptying of the stage turns a resignation into a graceful, deliberate exit.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Symphony_No.45_in_F-sharp_minor,_Hob.I:45_(Haydn,_Joseph)"
      }
    ],
    "rank": 13
  },
  {
    "slug": "openai-designs-custom-ai-chip-with-broadcom",
    "headline": "OpenAI unveils a custom AI chip designed with Broadcom",
    "overview": "OpenAI announced a custom processor it designed with Broadcom to power its data centers, joining Google, Amazon and Meta in building in-house silicon to cut its reliance on Nvidia. The chip is meant to expand the company's AI infrastructure as demand for computing power surges.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMi0AFBVV95cUxQdThteGtwZVZweXpUZTNQR0djS0ViNGhlZjNacUlpaG5KZ2M2SGdLckxXcEV5T3Z5UDhhRjJ5OUh5LTAxQThQVjNGUG1xWGIwM1VLeUNxNjY2N0RfbnFySTY1d0txYjdlNUVWY1lFbFZhRHcyTV9XRWFkRWZjdzM1Mk1QUWVhTmRRYi1IVklHdlJJeThoMUloTlNFTm4yQ29YTUFXRDUtZjZOeVh2cThIazdhUWd1bjdKcXJsamNqN01VR3RMZUtvLXI3SXpvNGV6?oc=5"
      },
      {
        "name": "StockTitan — Broadcom, OpenAI unveil Jalapeño AI processor",
        "href": "https://www.stocktitan.net/news/AVGO/open-ai-and-broadcom-unveil-llm-optimized-intelligence-jqpk7vkxf7jd.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-24",
    "image": {
      "src": "/covers/openai-designs-custom-ai-chip-with-broadcom.png",
      "alt": "A 12-inch silicon wafer patterned with rows of microchips.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 24 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Carnegie and the vertical integration of American steel",
        "excerpt": "To escape dependence on suppliers and middlemen, Andrew Carnegie integrated every stage of steelmaking under one company in the 1880s and 1890s—buying the ore mines of the Mesabi Range, the coke ovens, the railroads, and the lake steamers that carried his raw materials. By owning the whole chain from raw rock to finished rail, he drove out cost and outside leverage alike, making his mills the cheapest in the world. OpenAI designing its own accelerator with Broadcom rather than buying Nvidia's GPUs is the same instinct: control the means of production end to end.",
        "source": "Encyclopaedia Britannica — Andrew Carnegie",
        "href": "https://www.britannica.com/biography/Andrew-Carnegie"
      },
      {
        "category": "historical",
        "title": "Henry Ford's River Rouge plant: from iron ore to finished car",
        "excerpt": "At the Ford River Rouge Complex, completed in the 1920s, raw iron ore and coal entered at one end and finished automobiles rolled out the other. Ford owned the mines, the ships, the blast furnaces, the glassworks, and the assembly lines, refusing to depend on any outside supplier for the parts that mattered most. It became the archetype of industrial self-sufficiency—the company that forged its own tools rather than renting them. OpenAI's move to build silicon in-house echoes that drive to internalize the supply chain when scale and cost demand it.",
        "source": "The Henry Ford — Ford Rouge Factory",
        "href": "https://www.thehenryford.org/visit/ford-rouge-factory-tour/"
      },
      {
        "category": "literary",
        "title": "Aeschylus, Prometheus Bound — the gift of every craft to mortals",
        "excerpt": "Enough of this! What lieth underneath / The bosom of the earth, the helps of man, / Gold, silver, iron, copper—who can say / He track'd them ere my wisdom track'd them? None! / I have sure knowledge—if the boaster's part / He vainly choose not. Learn in brief the whole:— / All science came to mortals from Prometheus!",
        "source": "Aeschylus, Prometheus Bound, trans. Elizabeth Barrett Browning (1833), Wikisource",
        "href": "https://en.wikisource.org/wiki/Prometheus_Bound_(Browning,_1833)/Prometheus_Bound"
      },
      {
        "category": "literary",
        "title": "Homer, Iliad XVIII — Hephaestus forges new arms at his own furnace",
        "excerpt": "Thus having said, the father of the fires / To the black labours of his forge retires. / Soon as he bade them blow, the bellows turn'd / Their iron mouths; and where the furnace burn'd, / Resounding breathed: at once the blast expires, / And twenty forges catch at once the fires; / Just as the god directs, now loud, now low, / They raise a tempest, or they gently blow; / In hissing flames huge silver bars are roll'd, / And stubborn brass, and tin, and solid gold; / Before, deep fix'd, the eternal anvils stand; / The ponderous hammer loads his better hand, / His left with tongs turns the vex'd metal round, / And thick, strong strokes, the doubling vaults rebound.",
        "source": "Homer, The Iliad, Book XVIII, trans. Alexander Pope, Project Gutenberg",
        "href": "https://www.gutenberg.org/files/6130/6130-h/6130-h.htm"
      },
      {
        "category": "artistic",
        "title": "Diego Velázquez, The Forge of Vulcan (1630)",
        "excerpt": "In Velázquez's canvas, Apollo arrives with news at the smoky workshop of Vulcan, where bare-armed smiths pause mid-stroke around a glowing horseshoe of metal. The god of the forge is caught in the act of making the very weapons and armor the gods depend on—labor, fire, and skilled hands rendered with startling realism. It is the timeless image of the workshop that supplies everyone else's power, the place where raw heat becomes hardware.",
        "source": "Museo Nacional del Prado / Wikimedia Commons",
        "href": "https://www.museodelprado.es/en/the-collection/art-work/the-forge-of-vulcan/fc6a36d4-6e6b-4f57-9b6d-2c47e936a59a",
        "image": {
          "src": "/covers/openai-designs-custom-ai-chip-with-broadcom--a4.png",
          "alt": "Velázquez's painting of Vulcan's forge, smiths gathered around glowing metal as Apollo brings news.",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Wagner, Siegfried — the Forging Song (Schmiedelied)",
        "excerpt": "In Act I of Wagner's Siegfried, the hero gives up on the dwarf Mime's failed swords and reforges the shattered blade Nothung himself—filing it to powder, melting it down, and hammering it anew while singing the triumphant Forging Song. The orchestra rings with anvil strokes and roaring bellows as the young smith makes the one tool no one else could supply him. It is the music of self-reliance: if the masters cannot forge your weapon, forge it yourself.",
        "source": "Richard Wagner, Siegfried, WWV 86C (full score), IMSLP",
        "href": "https://imslp.org/wiki/Siegfried,_WWV_86C_(Wagner,_Richard)"
      }
    ],
    "rank": 14
  },
  {
    "slug": "qualcomm-buys-ai-startup-modular-for-4-billion",
    "headline": "Qualcomm to buy AI software startup Modular for $4 billion",
    "overview": "Qualcomm agreed to acquire Modular, an artificial-intelligence software startup, for about $4 billion, pushing the chipmaker deeper into the software that runs AI models. The deal aims to broaden Qualcomm's tools beyond its mobile-chip business.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiggFBVV95cUxNUVdoZzZMMXY4aG1hb2ZsRnFKZF9oOU9CVl9QQ3hQa1cxQ1FpT3QxeXFnQy1PSWxvY0tBVmptczRQaW1zWlVrem96MVBFcDRaeE1zQy12eU96bXpMbG5yc2Q0WWdDcDBGbzg0dzFVdTNlVlMzTS1TenJJNE1qM0phMVRB?oc=5"
      },
      {
        "name": "The Next Web",
        "href": "https://thenextweb.com/news/qualcomm-modular-deal-4bn"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-24",
    "image": {
      "src": "/covers/qualcomm-buys-ai-startup-modular-for-4-billion.png",
      "alt": "Qualcomm's corporate headquarters tower in La Jolla, San Diego.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 24 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "J. P. Morgan buys out Carnegie to forge U.S. Steel (1901)",
        "excerpt": "when Mr. Morgan approached me in March, 1901, through Mr. Schwab, and asked if I really wished to retire from business. I answered in the affirmative and that put an end",
        "source": "Andrew Carnegie, Autobiography of Andrew Carnegie (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/17976/17976-h/17976-h.htm"
      },
      {
        "category": "historical",
        "title": "Standard Oil's plan to buy out and absorb its rivals",
        "excerpt": "What might they not do if they could buy out and absorb the big refineries now competing with them in Cleveland?",
        "source": "Ida M. Tarbell, The History of the Standard Oil Company (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/60692/60692-h/60692-h.htm"
      },
      {
        "category": "literary",
        "title": "Appetite, the universal wolf — Troilus and Cressida",
        "excerpt": "And appetite, an universal wolf,\nSo doubly seconded with will and power,\nMust make perforce an universal prey,\nAnd last eat up himself.",
        "source": "William Shakespeare, Troilus and Cressida, Act I, Scene 3 (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/1790/pg1790-images.html"
      },
      {
        "category": "literary",
        "title": "Those who devour the parents claim the children — A Modest Proposal",
        "excerpt": "I grant this food will be somewhat dear, and therefore very proper for landlords, who, as they have already devoured most of the parents, seem to have the best title to the children.",
        "source": "Jonathan Swift, A Modest Proposal (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/1080/pg1080.txt"
      },
      {
        "category": "artistic",
        "title": "Big Fish Eat Little Fish (1556)",
        "excerpt": "Bruegel's pen-and-ink fantasy splits a beached giant fish open to reveal a cascade of smaller fish tumbling from its belly, each with a yet-smaller fish clamped in its jaws. A knife slung from the carcass bears the artist's initials, while a father in a boat points his son toward the lesson. It is a grim Flemish proverb made visible: the appetite of the strong runs all the way down the chain.",
        "source": "Pieter Bruegel the Elder, Albertina, Vienna (Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_the_Elder_-_Big_Fish_Eat_Little_Fish,_1556_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/qualcomm-buys-ai-startup-modular-for-4-billion--a4.png",
          "alt": "Drawing of a giant beached fish disgorging many smaller fish, each swallowing a smaller one.",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "In the Hall of the Mountain King — Peer Gynt Suite No. 1",
        "excerpt": "Grieg sets a single skulking theme creeping in the low strings, then repeats it without mercy, each cycle louder and faster until the whole orchestra is stampeding. It is the sound of a small intruder swallowed into a giant's domain, the closing-in of an overwhelming, accelerating power. The accelerando never relents; the listener is simply absorbed by the mass it has summoned.",
        "source": "Edvard Grieg, Peer Gynt Suite No. 1, Op. 46, mvt. 4 (IMSLP)",
        "href": "https://imslp.org/wiki/Peer_Gynt_Suite_No.1,_Op.46_(Grieg,_Edvard)"
      }
    ],
    "rank": 15
  },
  {
    "slug": "take-two-prices-grand-theft-auto-vi-at-79-99",
    "headline": "Take-Two prices Grand Theft Auto VI at $79.99 with a November 19 launch",
    "overview": "Take-Two Interactive set the price of Grand Theft Auto VI at $79.99 and confirmed a November 19 release, ending months of speculation about a delay for one of the most anticipated video games ever made. The price sits above the $69.99 that has been standard for new console titles.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMikAFBVV95cUxOTTIyaUktTHJkNkcwQm1KVTdZdk1EcWliQlFKb0ZOOUxUR21vZjA2bDVVSUpXQmdTaFhWMzVINW81bHc1anlmQzZ5RmQ0Z0ZoSDJfakYzeVNqQUljX3RORnNBN0s3TXFoVWEtNjZQZnBuZGtGR3hPZkZlbFE4aXd5UmxWal80RzRab1llekRRWE8?oc=5"
      },
      {
        "name": "The Hollywood Reporter",
        "href": "https://www.hollywoodreporter.com/business/digital/grand-theft-auto-vi-price-revealed-1236629428/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-24",
    "image": {
      "src": "/covers/take-two-prices-grand-theft-auto-vi-at-79-99.png",
      "alt": "Promotional Grand Theft Auto VI artwork showing a speedboat racing across Vice City waters.",
      "credit": "Reuters"
    },
    "edition": "Evening Edition · 24 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Juvenal on \"bread and circuses\"",
        "excerpt": "Now that no one buys our votes, the public has long since cast off its cares; the people that once bestowed commands, consulships, legions and all else, now meddles no more and longs eagerly for just two things----Bread and Games!",
        "source": "Juvenal, Satire X, trans. G. G. Ramsay (1918)",
        "href": "https://www.tertullian.org/fathers/juvenal_satires_10.htm"
      },
      {
        "category": "historical",
        "title": "Augustus stages Rome's spectacles",
        "excerpt": "He surpassed all his predecessors in the frequency, variety, and magnificence of his public shows.",
        "source": "Suetonius, Life of Augustus 43, trans. J. C. Rolfe (Loeb)",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Suetonius/12Caesars/Augustus*.html"
      },
      {
        "category": "literary",
        "title": "Rastignac declares war on Paris",
        "excerpt": "He glanced over that humming hive, seeming to draw a foretaste of its honey, and said magniloquently: “Henceforth there is war between us.” And by way of throwing down the glove to Society, Rastignac went to dine with Mme. de Nucingen.",
        "source": "Honoré de Balzac, Father Goriot, trans. Ellen Marriage",
        "href": "https://www.gutenberg.org/files/1237/1237-h/1237-h.htm"
      },
      {
        "category": "literary",
        "title": "Fagin's den, an empire of crime",
        "excerpt": "In a frying-pan, which was on the fire, and which was secured to the mantelshelf by a string, some sausages were cooking; and standing over them, with a toasting-fork in his hand, was a very old shrivelled Jew, whose villainous-looking and repulsive face was obscured by a quantity of matted red hair. He was dressed in a greasy flannel gown, with his throat bare; and seemed to be dividing his attention between the frying-pan and the clothes-horse, over which a great number of silk handkerchiefs were hanging.",
        "source": "Charles Dickens, Oliver Twist, Chapter VIII",
        "href": "https://www.gutenberg.org/cache/epub/730/pg730.txt"
      },
      {
        "category": "artistic",
        "title": "Couture, The Romans in their Decadence",
        "excerpt": "Couture's vast 1847 canvas crowds a marble hall with revelers sprawled in exhausted pleasure beneath the cold gaze of ancestral statues. Nearly five meters tall and almost eight wide, it turns an orgy into a monument, indicting an empire that traded virtue for spectacle. The price of amusement, the painting warns, is measured in something larger than coin.",
        "source": "Thomas Couture, Les Romains de la décadence (1847), Musée d'Orsay",
        "href": "https://commons.wikimedia.org/wiki/File:Thomas_Couture_-_Les_Romains_de_la_d%C3%A9cadence.jpg",
        "image": {
          "src": "/covers/take-two-prices-grand-theft-auto-vi-at-79-99--a4.png",
          "alt": "Monumental painting of Romans reclining in decadent revelry within a columned hall.",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Offenbach's Infernal Galop (Can-Can)",
        "excerpt": "In Orphée aux enfers, Offenbach sends the gods of Olympus tumbling into a delirious high-kicking galop, the tune that became the can-can of Parisian dance halls. It is commercial entertainment as joyous spectacle, manufactured pleasure spun at breakneck tempo. The same engine of mass amusement that filled the Bouffes-Parisiens now sells a blockbuster game for eighty dollars.",
        "source": "Jacques Offenbach, Orphée aux enfers (1858), Galop infernal",
        "href": "https://imslp.org/wiki/Orph%C3%A9e_aux_enfers_(Offenbach,_Jacques)"
      }
    ],
    "rank": 16
  },
  {
    "slug": "gold-falls-below-4000-dollars-an-ounce",
    "headline": "Gold falls below $4,000 an ounce on a strong dollar and hawkish Fed signals",
    "overview": "Gold dropped below $4,000 an ounce as a strengthening dollar and hawkish signals from the US Federal Reserve pulled the metal off recent record highs. The retreat marks a pause in a months-long rally driven by safe-haven buying.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiqAFBVV95cUxQUzVZRE9TWjVXbWphUlRhbkVvZ1VhMXEzeWxpZW5FQkNjZEVCd2lIME94WTNOYmxFelZlLVUwbnNvQUZpNFQ1R1VaaHp6Ung2bXotVXhUeUtQTlpoVHJXMWoybGJ2dGJlUElKdGFvTDhKdWxEbmZfSHdhSjdqaWUxWjB5U3d1dWU0RERJZVp4VERvXzJKT3Bsdk83UGI0Zlg2RldES2xIeVo?oc=5"
      },
      {
        "name": "BNN Bloomberg (Reuters)",
        "href": "https://www.bnnbloomberg.ca/markets/gold/2026/06/24/gold-falls-below-us4000oz-on-strong-us-dollar-hawkish-fed-signals/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-24",
    "image": {
      "src": "/covers/gold-falls-below-4000-dollars-an-ounce.png",
      "alt": "A pile of stacked gold bullion bars.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 24 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Tulipomania and the crash of 1637",
        "excerpt": "A golden bait hung temptingly out before the people, and one after the other, they rushed to the tulip-marts, like flies around a honey-pot. ... At last, however, the more prudent began to see that this folly could not last for ever. ... As this conviction spread, prices fell, and never rose again. Confidence was destroyed, and a universal panic seized upon the dealers.",
        "source": "Charles Mackay, Memoirs of Extraordinary Popular Delusions, Vol. I (1841), Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/24518/pg24518.txt"
      },
      {
        "category": "historical",
        "title": "The South-Sea Bubble of 1720",
        "excerpt": "The inordinate thirst of gain that had afflicted all ranks of society was not to be slaked even in the South Sea. ... Contrary to all expectation, South-Sea stock fell when the bill received the royal assent.",
        "source": "Charles Mackay, Memoirs of Extraordinary Popular Delusions, Vol. I (1841), Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/24518/pg24518.txt"
      },
      {
        "category": "literary",
        "title": "King Midas and the golden touch",
        "excerpt": "Astonished at the novelty of his misfortune, being both rich and wretched, he wishes to escape from his wealth, and now he hates what but so lately he has wished for; no plenty relieves his hunger, dry thirst parches his throat, and he is deservedly tormented by the now hated gold.",
        "source": "Ovid, Metamorphoses, Book XI (Riley trans.), Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/26073/pg26073.txt"
      },
      {
        "category": "literary",
        "title": "Timon's curse upon gold",
        "excerpt": "Gold? Yellow, glittering, precious gold? No, gods, I am no idle votarist. Roots, you clear heavens! Thus much of this will make black white, foul fair, wrong right, base noble, old young, coward valiant.",
        "source": "William Shakespeare, Timon of Athens, Act IV, Scene 3, Project Gutenberg",
        "href": "https://www.gutenberg.org/files/1536/1536-h/1536-h.htm"
      },
      {
        "category": "artistic",
        "title": "The Adoration of the Golden Calf",
        "excerpt": "Poussin sets the Israelites whirling in a frenzied ring-dance around the glittering idol while Moses, tiny in the distance, descends the mountain to shatter the tablets. The painting freezes the exact moment when a people, dazzled by gold, abandons everything else to worship it.",
        "source": "Nicolas Poussin (c. 1633-34), oil on canvas, National Gallery, London (via Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Nicolas_Poussin_-_The_Adoration_of_the_Golden_Calf_-_WGA18293.jpg",
        "image": {
          "src": "/covers/gold-falls-below-4000-dollars-an-ounce--a4.png",
          "alt": "Poussin's painting of Israelites dancing around a golden calf on a pedestal.",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "\"Le veau d'or\" (The Golden Calf song) from Gounod's Faust",
        "excerpt": "Mephistopheles leaps onto a table and mockingly hymns the Golden Calf still standing, the whole human crowd dancing around its pedestal as Satan conducts the round. The cynical, swaggering refrain turns the worship of money into a devil's drinking song, gold reigning over kings and peoples alike.",
        "source": "Charles Gounod, Faust, CG 4 (1859), Act II, public-domain vocal score, IMSLP",
        "href": "https://imslp.org/wiki/Faust,_CG_4_(Gounod,_Charles)"
      }
    ],
    "rank": 17
  },
  {
    "slug": "north-korea-commissions-nuclear-armed-warship",
    "headline": "North Korea's Kim commissions a new warship and claims progress on a nuclear-armed navy",
    "overview": "North Korean leader Kim Jong Un placed a new warship into service and claimed progress toward a nuclear-armed navy, state media reported. The announcement signals Pyongyang's intent to extend its nuclear forces to the sea despite international sanctions.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMiowFBVV95cUxPT2l6aFZmemNqQVJXNFFpbjRISU1hWDFRSUozZWlORGc4MnVVMlpUWnhiQXRWb051ZnNSb29IdlhJSTBHSEFhV0VuTWxHYm5QTjlPVGhUbTZjZ1huQlZUcGduSkhuaXZYYk5LVnJzTVN0ekRjN2Q1U2JpdThOVGlZcUhDdl9HNUdPVlJMcXhZTXNGM0xkcENzTG94czJ5Vy13YkNR?oc=5"
      },
      {
        "name": "Military.com (Associated Press)",
        "href": "https://www.military.com/north-koreas-kim-claims-progress-on-nuclear-armed-navy-as-new-warship-is-placed-into-service"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-24",
    "image": {
      "src": "/covers/north-korea-commissions-nuclear-armed-warship.png",
      "alt": "North Korea's destroyer Choe Hyon departs Nampo port after its commissioning ceremony.",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 24 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "HMS Dreadnought and the naval arms race of 1906",
        "excerpt": "When the British battleship HMS Dreadnought slid into the water in 1906, she instantly rendered every existing warship obsolete and lent her name to an entire class of vessel. Bristling with uniform big guns and driven by turbines, she touched off a frantic Anglo-German building contest in which each new keel was both a weapon and a boast. The race that followed helped harden the rivalries that culminated in the First World War.",
        "source": "U.S. Naval Historical Center photograph, Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:HMS_Dreadnought_1906_H61017.jpg"
      },
      {
        "category": "historical",
        "title": "Mahan on 'that overbearing power on the sea'",
        "excerpt": "It is not the taking of individual ships or convoys, be they few or many, that strikes down the money power of a nation; it is the possession of that overbearing power on the sea which drives the enemy's flag from it, or allows it to appear only as a fugitive; and which, by controlling the great common, closes the highways by which commerce moves to and from the enemy's shores. This overbearing power can only be exercised by great navies.",
        "source": "Alfred Thayer Mahan, The Influence of Sea Power upon History, 1660–1783 (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/13529/pg13529.txt"
      },
      {
        "category": "literary",
        "title": "Leviathan, king over the children of pride",
        "excerpt": "He maketh the deep to boil like a pot: he maketh the sea like a pot of ointment. He maketh a path to shine after him; one would think the deep to be hoary. Upon earth there is not his like, who is made without fear. He beholdeth all high things: he is a king over all the children of pride.",
        "source": "The Book of Job 41:31–34, King James Bible (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/10/pg10.txt"
      },
      {
        "category": "literary",
        "title": "Ishmael's 'grand hooded phantom' of the sea",
        "excerpt": "By reason of these things, then, the whaling voyage was welcome; the great flood-gates of the wonder-world swung open, and in the wild conceits that swayed me to my purpose, two and two there floated into my inmost soul, endless processions of the whale, and, mid most of them all, one grand hooded phantom, like a snow hill in the air.",
        "source": "Herman Melville, Moby-Dick (1851), Chapter 1, Wikisource",
        "href": "https://en.wikisource.org/wiki/Moby-Dick_(1851)_US_edition/Chapter_1"
      },
      {
        "category": "artistic",
        "title": "Turner, 'The Fighting Temeraire' (1839)",
        "excerpt": "Turner shows a ghostly white warship of Trafalgar, her sails furled, being towed by a squat, fire-belching iron steam-tug toward the breaker's yard against a blazing sunset. The painting is an elegy for the age of fighting sail and an uneasy salute to the iron and steam that replaced it, the new machine dragging the old leviathan of empire to its grave.",
        "source": "J. M. W. Turner, oil on canvas, National Gallery, London (Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:The_Fighting_Temeraire,_JMW_Turner,_National_Gallery.jpg",
        "image": {
          "src": "/covers/north-korea-commissions-nuclear-armed-warship--a4.png",
          "alt": "A glowing sunset over a pale old warship towed by a dark steam-tug.",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Arne, 'Rule, Britannia!' (1740)",
        "excerpt": "\"Rule, Britannia! rule the waves: Britons never will be slaves.\" Thomas Arne's anthem, written for the masque Alfred to words by James Thomson, set to music the dream of total command of the sea. Its swelling, confident strains turned naval supremacy into national hymn, the very fantasy of dominion over the deep that every rising power, ancient or modern, has sought to compose for itself.",
        "source": "Thomas Arne, 'Rule, Britannia!' from the masque Alfred, IMSLP",
        "href": "https://imslp.org/wiki/Rule_Britannia_(Arne,_Thomas_Augustine)"
      }
    ],
    "rank": 18
  },
  {
    "slug": "alibaba-sues-us-government-over-defense-blacklist",
    "headline": "Alibaba sues the US government over its Pentagon defense blacklist",
    "overview": "The Chinese e-commerce company Alibaba filed suit against the US government to challenge its placement on a Defense Department list of firms it says are tied to China's military. Alibaba denies the designation and says it has damaged its business.",
    "genre": "Economy",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/ckg0258vpvqo"
      },
      {
        "name": "Engadget",
        "href": "https://www.engadget.com/2200406/alibaba-sues-us-government-chinese-military-blacklist/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-24",
    "image": {
      "src": "/covers/alibaba-sues-us-government-over-defense-blacklist.png",
      "alt": "Exterior of the Alibaba Group headquarters complex in Hangzhou, China",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 24 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Sulla's Proscriptions",
        "excerpt": "Sulla now busied himself with slaughter, and murders without number or limit filled the city. Many, too, were killed to gratify private hatreds, although they had no relations with Sulla, but he gave his consent to please his adherents. At last one of the younger men, Caius Metellus, made bold to ask Sulla in the senate what end there was to be of these evils... Sulla at once proscribed eighty persons, without communicating with any magistrate.",
        "source": "Plutarch, Life of Sulla 31 (trans. Bernadotte Perrin), Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:abo:tlg,0007,033:31"
      },
      {
        "category": "historical",
        "title": "The Dreyfus Affair and Zola's J'Accuse",
        "excerpt": "I accuse General Billot of having held in his hands the unquestionable evidence of Dreyfus's innocence and of suppressing it, guilty of this crime that injures humanity and justice. I accuse the first council of war of violating the law by condemning a defendant with unrevealed evidence.",
        "source": "Émile Zola, \"J'Accuse...!\" (1898), English translation, Wikisource",
        "href": "https://en.wikisource.org/wiki/Translation:J'Accuse...!"
      },
      {
        "category": "literary",
        "title": "Kafka, The Trial",
        "excerpt": "Someone must have been telling lies about Josef K., he knew he had done nothing wrong but, one morning, he was arrested.",
        "source": "Franz Kafka, The Trial (trans. David Wyllie), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/7849/7849-h/7849-h.htm"
      },
      {
        "category": "literary",
        "title": "Shakespeare, The Merchant of Venice",
        "excerpt": "I charge you by the law, / Whereof you are a well-deserving pillar, / Proceed to judgment: by my soul I swear / There is no power in the tongue of man / To alter me: I stay here on my bond.",
        "source": "William Shakespeare, The Merchant of Venice, Act IV, Scene 1, Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/1515/pg1515.txt"
      },
      {
        "category": "artistic",
        "title": "Honoré Daumier, Le Défenseur (Counsel for the Defense)",
        "excerpt": "An advocate, robe billowing, flings out a beseeching arm before an unseen tribunal, his whole body bent into the act of pleading. Behind him the accused sits hunched and defiant, hands clasped, eyes lowered, waiting on words that will either restore or ruin his name. Daumier strips the courtroom to two figures and a void, making the lonely struggle to be believed the entire drama.",
        "source": "Honoré Daumier, c. 1862–1865, National Gallery of Art (Corcoran Collection), via Wikimedia Commons",
        "href": "https://www.nga.gov/artworks/168817-le-defenseur-counsel-defense",
        "image": {
          "src": "/covers/alibaba-sues-us-government-over-defense-blacklist--a4.png",
          "alt": "Watercolor of a black-robed lawyer pleading with outstretched arm before a tribunal while his accused client sits behind him",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Beethoven, Fidelio, Op. 72 (Prisoners' Chorus)",
        "excerpt": "In Beethoven's only opera, the nobleman Florestan rots in a secret dungeon, imprisoned by a powerful enemy he once dared to expose, condemned on no charge but another man's vengeance. When the cell doors briefly open, the prisoners stagger into daylight and the chorus swells into an ode to freedom that has no part in the plot and exists only to voice the human cry against unjust confinement. It is music built around the conviction that a name wrongly blackened must one day be cleared.",
        "source": "Ludwig van Beethoven, Fidelio, Op. 72 (1814), full scores, IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Fidelio,_Op.72_(Beethoven,_Ludwig_van)"
      }
    ],
    "rank": 19
  },
  {
    "slug": "france-confirms-first-ebola-case",
    "headline": "France confirms its first case of Ebola",
    "overview": "French health authorities confirmed the country's first case of Ebola, in a doctor returning from the Democratic Republic of Congo, prompting isolation and contact-tracing measures. Officials sought to reassure the public that the risk of wider transmission remains low.",
    "genre": "Science",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cj9gzr9rdjlo"
      },
      {
        "name": "Al Jazeera — France confirms first Ebola case in doctor returning from DR Congo",
        "href": "https://www.aljazeera.com/news/2026/6/24/france-confirms-first-ebola-case-in-doctor-returning-from-dr-congo"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-24",
    "image": {
      "src": "/covers/france-confirms-first-ebola-case.png",
      "alt": "Colorized electron micrograph of an Ebola virus virion.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 24 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The plague returns to Holland, 1664 — Defoe's first whispers of contagion",
        "excerpt": "It was about the beginning of September, 1664, that I, among the rest of my neighbours, heard in ordinary discourse that the plague was returned again in Holland; for it had been very violent there, and particularly at Amsterdam and Rotterdam, in the year 1663, whither, they say, it was brought, some said from Italy, others from the Levant, among some goods which were brought home by their Turkey fleet; others said it was brought from Candia; others from Cyprus.",
        "source": "Daniel Defoe, A Journal of the Plague Year (1722), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/376/376-h/376-h.htm"
      },
      {
        "category": "historical",
        "title": "The plague ship Grand-Saint-Antoine at Marseille, 1720",
        "excerpt": "In May 1720 the merchantman Grand-Saint-Antoine reached Marseille from the plague-touched Levant, carrying death among its bales of silk and cotton. It was sent to the lazaret to be held in quarantine, but crew and goods slipped past the cordon — and within months more than half the walled city lay dead. France answered with soldiers and a 36-kilometre stone 'mur de la peste' thrown across the countryside, the last great cordon sanitaire of Western Europe. Michel Serre, painter to the royal galleys, stayed to record the catastrophe street by street.",
        "source": "Joconde / French Ministry of Culture museum notice for Michel Serre, 'Vue du Cours pendant la peste de 1720' (Musée des Beaux-Arts de Marseille)",
        "href": "https://www.pop.culture.gouv.fr/notice/joconde/000PE014364"
      },
      {
        "category": "literary",
        "title": "The death-dealing pestilence enters Florence — Boccaccio's Decameron",
        "excerpt": "I say, then, that the years [of the era] of the fruitful Incarnation of the Son of God had attained to the number of one thousand three hundred and forty-eight, when into the notable city of Florence, fair over every other of Italy, there came the death-dealing pestilence",
        "source": "Giovanni Boccaccio, The Decameron (Proem), trans. John Payne, Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/23700/pg23700-images.html"
      },
      {
        "category": "literary",
        "title": "Prince Prospero bolts the gates against the Red Death — Poe",
        "excerpt": "When his dominions were half depopulated, he summoned to his presence a thousand hale and light-hearted friends from among the knights and dames of his court, and with these retired to the deep seclusion of one of his castellated abbeys. … A strong and lofty wall girdled it in. This wall had gates of iron. … The external world could take care of itself. In the meantime it was folly to grieve, or to think.",
        "source": "Edgar Allan Poe, 'The Masque of the Red Death' (1842), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/1064/1064-h/1064-h.htm"
      },
      {
        "category": "artistic",
        "title": "Michel Serre, 'Vue du Cours pendant la peste de 1720'",
        "excerpt": "Painted the very next year by an eyewitness, Serre's vast canvas turns Marseille's elegant Cours Belsunce into a charnel boulevard: corpses heaped in the foreground, carts loaded with the dead, survivors recoiling with cloths pressed to their faces. Fine townhouses and a serene sky frame the horror, the contrast sharpening the dread of a city whose ordinary life has been overtaken by a contagion that slipped through its defenses.",
        "source": "Michel Serre (1721), oil on canvas, Musée des Beaux-Arts de Marseille — Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Michel_Serre-Peste-Cours_Belsunce.jpg",
        "image": {
          "src": "/covers/france-confirms-first-ebola-case--a4.png",
          "alt": "Serre's painting of plague-stricken Marseille in 1720, bodies strewn along the Cours Belsunce.",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Saint-Saëns, Danse macabre, Op. 40",
        "excerpt": "At the stroke of midnight Death tunes his fiddle and the dead rise to dance — a xylophone rattling like clattering bones beneath a whirling waltz, the old Dies irae chant woven mockingly into the melody. Composed by a French master in 1874, it remains the West's most vivid musical image of mortality come calling for everyone alike, leveller and equaliser, until the cock crows and the dance dissolves.",
        "source": "Camille Saint-Saëns, Danse macabre, Op. 40 (1874) — scores at IMSLP / Petrucci Music Library (public domain)",
        "href": "https://imslp.org/wiki/Danse_macabre,_Op.40_(Saint-Sa%C3%ABns,_Camille)"
      }
    ],
    "rank": 20
  },
  {
    "slug": "supreme-court-sides-with-trump-on-green-card-holders",
    "headline": "Supreme Court sides with the Trump administration in a green-card holder detention case",
    "overview": "The US Supreme Court ruled for the Trump administration in a case over the detention of lawful permanent residents during removal proceedings, expanding the government's authority in immigration enforcement. The decision affects how green-card holders may be held.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMilgFBVV95cUxNNThYMk9wVTgtQW9vX0kwRHpUcVRneWJRakxZM29QZzRQdG5DR01kdzdfeWgwb0ZROHZZUUZlMUpnOTIyZjhXZ2RPaGlsRHZzejl5aEwzOE5MeUhUeFIzODF3TzB6emlTSlJOOVBTTW0yV1ZyajVlUmE1Z3Y1TVNZeGRycmZ0c1RLbER4T1pZODFfRWQyMHc?oc=5"
      },
      {
        "name": "KSL.com (Associated Press)",
        "href": "https://www.ksl.com/article/51533322/scotus-sides-with-trump-administration-on-immigration-case-dealing-with-green-card-holders"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-24",
    "image": {
      "src": "/covers/supreme-court-sides-with-trump-on-green-card-holders.png",
      "alt": "Visitors sit on the steps of the U.S. Supreme Court in Washington.",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 24 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Alien Friends Act of 1798",
        "excerpt": "That it shall be lawful for the President of the United States at any time during the continuance of this act, to order all such aliens as he shall judge dangerous to the peace and safety of the United States, or shall have reasonable grounds to suspect are concerned in any treasonable or secret machinations against the government thereof, to depart out of the territory of the United States, within such time as shall be expressed in such order",
        "source": "United States Statutes at Large, 5th Congress, An Act Concerning Aliens (1798)",
        "href": "https://en.wikisource.org/wiki/United_States_Statutes_at_Large/Volume_1/5th_Congress/2nd_Session/Chapter_58"
      },
      {
        "category": "historical",
        "title": "Fong Yue Ting v. United States (1893)",
        "excerpt": "The right to exclude or to expel all aliens, or any class of aliens, absolutely or upon certain conditions, in war or in peace, being an inherent and inalienable right of every sovereign and independent nation, essential to its safety, its independence and its welfare... I deny that there is any arbitrary and unrestrained power to banish residents, even resident aliens.",
        "source": "Fong Yue Ting v. United States, 149 U.S. 698 (Justice Gray for the Court; Justice Brewer, dissenting)",
        "href": "https://cdn.loc.gov/service/ll/usrep/usrep149/usrep149698/usrep149698.pdf"
      },
      {
        "category": "literary",
        "title": "Franz Kafka, 'Vor dem Gesetz' ('Before the Law')",
        "excerpt": "Vor dem Gesetz steht ein Türhüter. Zu diesem Türhüter kommt ein Mann vom Lande und bittet um Eintritt in das Gesetz. Aber der Türhüter sagt, daß er ihm jetzt den Eintritt nicht gewähren könne.",
        "source": "Franz Kafka, 'Vor dem Gesetz' (1915)",
        "href": "https://de.wikisource.org/wiki/Vor_dem_Gesetz"
      },
      {
        "category": "literary",
        "title": "Aeschylus, The Suppliant Maidens",
        "excerpt": "I cannot aid you without risk of scathe, / Nor scorn your prayers—unmerciful it were. / Perplexed, distraught I stand, and fear alike / The twofold chance, to do or not to do.",
        "source": "Aeschylus, The Suppliant Maidens (Morshead trans.), in Four Plays of Aeschylus",
        "href": "https://www.gutenberg.org/files/8714/8714-h/8714-h.htm"
      },
      {
        "category": "artistic",
        "title": "Ford Madox Brown, The Last of England (1855)",
        "excerpt": "A young emigrant couple sits braced against a gray sea wind, the ribboned bonnet pulled tight, a half-hidden infant's hand clasped in the woman's gloved fingers. Behind them the white cliffs recede and a row of fellow travellers crowds the rail, faces set toward an unknown shore. Brown painted the circular canvas as a meditation on those compelled to leave one country with no certainty of welcome in the next.",
        "source": "Ford Madox Brown, oil on panel, Birmingham Museum and Art Gallery",
        "href": "https://commons.wikimedia.org/wiki/File:Ford_Madox_Brown_-_The_Last_of_England_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/supreme-court-sides-with-trump-on-green-card-holders--a4.png",
          "alt": "An emigrant couple braced against the wind on a ship's deck, the white cliffs of England receding behind them.",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Verdi, 'Va, pensiero' (Chorus of the Hebrew Slaves), Nabucco",
        "excerpt": "Verdi's exiles, enslaved and far from home, sing as one to a homeland they can see only in memory, their voices rising on golden wings toward hills and shores forbidden to them. The hushed unison swells into a collective ache for a country that the law of their captors has placed beyond reach. It became the anthem of every displaced people who belong somewhere they are not permitted to return.",
        "source": "Giuseppe Verdi, Nabucco, Act III (1842), full score on IMSLP",
        "href": "https://imslp.org/wiki/Nabucco_(Verdi,_Giuseppe)"
      }
    ],
    "rank": 21
  },
  {
    "slug": "mcgucken-suspends-light-cones-over-desert",
    "headline": "Artist Elliot McGucken suspends glowing 'Light Cones' over desert landscapes",
    "overview": "The artist and physicist Elliot McGucken installed illuminated sculptures evoking Einstein's spacetime 'light cones' across desert expanses, photographing the glowing forms under night skies. The project is a meditation on relativity, time, and the geometry of light.",
    "genre": "Science",
    "sources": [
      {
        "name": "Colossal",
        "href": "https://www.thisiscolossal.com/2026/06/elliot-mcgucken-spacetime-light-cone-sculptures-photography-landscapes/"
      },
      {
        "name": "My Modern Met — Swirling Light Cone Photography Visualizes Einstein's Theory of Relativity in the Desert",
        "href": "https://mymodernmet.com/light-cone-photography-einstein-relativity/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-24",
    "image": {
      "src": "/covers/mcgucken-suspends-light-cones-over-desert.png",
      "alt": "A glowing hourglass-shaped light cone hovers over a moonlit desert rock formation at night.",
      "credit": "Colossal"
    },
    "edition": "Evening Edition · 24 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Eddington's 1919 Eclipse Expedition",
        "excerpt": "In May 1919, British astronomers sailed to the island of Príncipe and to Sobral in Brazil to photograph a total solar eclipse and measure whether the Sun's gravity bent the light of distant stars. The plates showed starlight nudged from its straight path by almost exactly the angle Einstein had predicted, confirming that mass curves the geometry of spacetime itself. Overnight a quiet patent clerk's theory of relativity became front-page news, and the universe was revealed as a place where even light obeys the contours of bent space.",
        "source": "Eddington experiment (Royal Society / Wikipedia)",
        "href": "https://en.wikipedia.org/wiki/Eddington_experiment"
      },
      {
        "category": "historical",
        "title": "Rømer Measures the Speed of Light, 1676",
        "excerpt": "At the Paris Observatory in 1676, the Danish astronomer Ole Rømer noticed that eclipses of Jupiter's moon Io arrived minutes late whenever Earth swung to the far side of its orbit. He reasoned that light itself takes time to cross the widening gulf between the planets, and announced that it needed roughly twenty-two minutes to traverse the diameter of Earth's orbit. It was the first proof that light is not instantaneous but finite in speed, the very fact that gives McGucken's cones their shape: distance written as time.",
        "source": "Rømer's determination of the speed of light (Wikipedia)",
        "href": "https://en.wikipedia.org/wiki/R%C3%B8mer%27s_determination_of_the_speed_of_light"
      },
      {
        "category": "literary",
        "title": "Plato, The Allegory of the Cave (Republic, Book VII)",
        "excerpt": "And now, I said, let me show in a figure how far our nature is enlightened or unenlightened:—Behold! human beings living in a underground den, which has a mouth open towards the light and reaching all along the den; here they have been from their childhood, and have their legs and necks chained so that they cannot move, and can only see before them, being prevented by the chains from turning round their heads. Above and behind them a fire is blazing at a distance, and between the fire and the prisoners there is a raised way.",
        "source": "Plato, The Republic, trans. Benjamin Jowett (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/1497/pg1497.txt"
      },
      {
        "category": "literary",
        "title": "Dante, Paradiso, Canto XXXIII",
        "excerpt": "As the geometrician, who endeavours\n   To square the circle, and discovers not,\n   By taking thought, the principle he wants,\n\nEven such was I at that new apparition;\n   I wished to see how the image to the circle\n   Conformed itself, and how it there finds place;",
        "source": "Dante, Divine Comedy, trans. H. W. Longfellow (Wikisource)",
        "href": "https://en.wikisource.org/wiki/Divine_Comedy_(Longfellow_1867)/Volume_3/Canto_33"
      },
      {
        "category": "artistic",
        "title": "Caspar David Friedrich, Wanderer above the Sea of Fog (c. 1818)",
        "excerpt": "A lone figure stands on a dark crag, his back to us, gazing into a vast ocean of mist pierced by distant ridges and peaks. The Romantic painter makes the human form small and contemplative against an immensity that dissolves into pale infinity, an emblem of the sublime—the mind reaching toward a grandeur it can sense but never fully grasp. Like McGucken's solitary cones glowing over empty desert, it stages one person's encounter with the boundless geometry of the world.",
        "source": "Hamburger Kunsthalle (via Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Caspar_David_Friedrich_-_Wanderer_above_the_sea_of_fog.jpg",
        "image": {
          "src": "/covers/mcgucken-suspends-light-cones-over-desert--a4.png",
          "alt": "A man in a dark coat stands on a rocky peak overlooking a sea of fog and distant mountains.",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Gustav Holst, 'Neptune, the Mystic' from The Planets (1921)",
        "excerpt": "The suite's final movement drifts in on shimmering, weightless harmonies, gongs and celesta evoking the cold remoteness of the outermost planet. A wordless offstage women's chorus enters and never resolves, fading into silence as if the music itself were dissolving into deep space. Holst conjures the same hush McGucken seeks in the desert night: an awed contemplation of the vast, luminous geometry of the cosmos and the smallness of the listener within it.",
        "source": "Gustav Holst, The Planets, Op. 32 (IMSLP)",
        "href": "https://imslp.org/wiki/The_Planets,_Op.32_(Holst,_Gustav)"
      }
    ],
    "rank": 22
  },
  {
    "slug": "im-pei-archive-transferred-to-mit-museum",
    "headline": "I. M. Pei's architectural archive will be transferred to the MIT Museum",
    "overview": "The vast professional archive of the architect I. M. Pei — drawings, models and papers spanning landmarks from the Louvre Pyramid to the Bank of China Tower — will go to the MIT Museum, his alma mater. The transfer preserves the record of a defining modern architect.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Artforum",
        "href": "https://www.artforum.com/news/landmark-i-m-pei-archive-will-be-transferred-to-mit-museum-1234752943/"
      },
      {
        "name": "Artdaily — Architect I. M. Pei's archive to be transferred to MIT Museum in landmark acquisition",
        "href": "https://artdaily.com/news/197366/Architect-I-M--Pei-s-archive-to-be-transfered-to-MIT-Museum-in-landmark-acquisition"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-24",
    "image": {
      "src": "/covers/im-pei-archive-transferred-to-mit-museum.png",
      "alt": "Contact sheet of I. M. Pei and Araldo Cossuta with a model and drawings of the MIT campus, 1960",
      "credit": "Artforum"
    },
    "edition": "Evening Edition · 24 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Great Pyramid of Giza and its vizier-architect Hemiunu",
        "excerpt": "Across four and a half thousand years, the geometry of Khufu's pyramid still holds, while the man who oversaw it survives only as a seated limestone statue and a cluster of titles: Overseer of All Construction Projects of the King. Hemiunu marshalled a nation's labor and stone into a form so pure it became the measure of monumental ambition. The building outlived every record of how it was drawn — exactly the loss the Pei archive is meant to forestall, keeping the master's hand legible beside the finished wonder.",
        "source": "Wikipedia — Great Pyramid of Giza",
        "href": "https://en.wikipedia.org/wiki/Great_Pyramid_of_Giza"
      },
      {
        "category": "historical",
        "title": "Procopius on the dome of Hagia Sophia, raised by Anthemius and Isidore",
        "excerpt": "Yet it seems not to rest upon solid masonry, but to cover the space with its golden dome (sphaira) suspended from Heaven.",
        "source": "Procopius, Buildings, Book I (Loeb tr., LacusCurtius)",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/texts/Procopius/buildings/1A*.html"
      },
      {
        "category": "literary",
        "title": "Vitruvius defines the architect, in the oldest surviving treatise",
        "excerpt": "The architect should be equipped with knowledge of many branches of study and varied kinds of learning, for it is by his judgement that all work done by the other arts is put to test.",
        "source": "Vitruvius, Ten Books on Architecture, Book I (tr. Morgan)",
        "href": "https://www.gutenberg.org/cache/epub/20239/pg20239.txt"
      },
      {
        "category": "literary",
        "title": "Shelley's 'Ozymandias' and the builder's monument outliving the man",
        "excerpt": "And on the pedestal these words appear: / 'My name is Ozymandias, king of kings: / Look on my works, ye Mighty, and despair!' / Nothing beside remains. Round the decay / Of that colossal wreck, boundless and bare / The lone and level sands stretch far away.",
        "source": "Percy Bysshe Shelley, 'Ozymandias' (1818), Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Hundred_Best_Poems_(lyrical)_in_the_English_language_-_second_series/Ozymandias"
      },
      {
        "category": "artistic",
        "title": "Piranesi, 'The Pyramid of Caius Cestius' (1756)",
        "excerpt": "Piranesi sets the marble-clad pyramid towering above the Roman wall, its sharp geometry rising from a tangle of weeds, crumbling masonry, and tiny figures dwarfed at its base. With obsessive draftsmanship he records every block, crack, and inscription, treating an ancient builder's tomb as a document to be preserved in line and shadow. The print turns architecture into archive — the same impulse driving Pei's drawings into the MIT Museum.",
        "source": "Giovanni Battista Piranesi, etching, Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Piranesi-3-42.jpg",
        "image": {
          "src": "/covers/im-pei-archive-transferred-to-mit-museum--a4.png",
          "alt": "Piranesi etching of the Pyramid of Caius Cestius in Rome, towering above ruins and small figures",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Debussy, 'La cathédrale engloutie' (Préludes, Book I, No. 10)",
        "excerpt": "Debussy builds a cathedral out of sound: bare parallel chords swell up like stone surfacing from the sea, ring with phantom bells, then sink back into stillness. The prelude conjures an entire architecture from memory and light alone, present and dissolved in the same breath. It is the perfect score for an archive that keeps a vanished drafting room — its geometry and luminous ambition — sounding long after the architect is gone.",
        "source": "Claude Debussy, Préludes Livre 1 (1910), IMSLP",
        "href": "https://imslp.org/wiki/Pr%C3%A9ludes,_Livre_1_(Debussy,_Claude)"
      }
    ],
    "rank": 23
  },
  {
    "slug": "power-outages-hit-france-as-heatwave-peaks",
    "headline": "Power outages hit France as a record heatwave reaches its peak",
    "overview": "Power outages struck parts of France as a record-breaking heatwave peaked, straining the electricity grid after the country recorded its hottest day. The crisis sharpened a political divide over the spread of air conditioning.",
    "genre": "Climate",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c78y4102n1zo"
      },
      {
        "name": "France 24 — France outage leaves 68,000 homes without power as record heatwave spreads north",
        "href": "https://www.france24.com/en/europe/20260624-france-outage-leaves-68000-homes-without-power-record-heatwave-spreads-north-brittany"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-24",
    "image": {
      "src": "/covers/power-outages-hit-france-as-heatwave-peaks.png",
      "alt": "Electricity transmission pylon and power lines silhouetted against a burning sunset sky.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 24 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The 2003 European heatwave shuts down France's nuclear grid",
        "excerpt": "In August 2003 a record heat dome killed more than 14,000 people in France alone. The crisis turned on the grid itself: many of France's nuclear reactors draw river water for cooling, and as the Rhône and other rivers ran low and hot, plants approached or breached environmental limits just as air-conditioning demand surged. The government granted emergency exemptions to keep six reactors running, exposing how a fleet designed for a cooler climate buckled when sun and scarcity peaked together.",
        "source": "Wikipedia, '2003 European heatwave'",
        "href": "https://en.wikipedia.org/wiki/2003_European_heatwave"
      },
      {
        "category": "historical",
        "title": "The 1977 New York City blackout during a brutal heat wave",
        "excerpt": "On the evening of 13 July 1977, lightning strikes tripped transmission lines feeding New York City, and within an hour a cascade of failures, including a single loose locking nut that stopped a breaker from reclosing, plunged the entire Con Edison system into darkness. The blackout fell at the very start of a nine-day heat wave that climbed toward 104 degrees Fahrenheit. With air-conditioners dead and the night sweltering, the city saw more than a thousand fires and the largest mass arrest in its history, a vivid lesson in how heat and a fragile grid can fail catastrophically at once.",
        "source": "Wikipedia, 'New York City blackout of 1977'",
        "href": "https://en.wikipedia.org/wiki/New_York_City_blackout_of_1977"
      },
      {
        "category": "literary",
        "title": "Ovid, Metamorphoses — Phaethon scorches the Earth",
        "excerpt": "The grass is blighted; trees / are burnt up with their leaves; the ripe brown crops / give fuel for self destruction—Oh what small / complaints! Great cities perish with their walls, / and peopled nations are consumed to dust— / the forests and the mountains are destroyed.",
        "source": "Ovid, Metamorphoses, Book II (trans. Brookes More), Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0028:book=2:card=227"
      },
      {
        "category": "literary",
        "title": "Coleridge, 'The Rime of the Ancient Mariner' — the bloody sun and no relief",
        "excerpt": "All in a hot and copper sky, / The bloody Sun, at noon, / Right up above the mast did stand, / No bigger than the Moon. / / Day after day, day after day, / We stuck, nor breath nor motion; / As idle as a painted ship / Upon a painted ocean. / / Water, water, every where, / And all the boards did shrink; / Water, water, every where, / Nor any drop to drink.",
        "source": "Samuel Taylor Coleridge, 'The Rime of the Ancient Mariner', Project Gutenberg",
        "href": "https://www.gutenberg.org/files/151/151-h/151-h.htm"
      },
      {
        "category": "artistic",
        "title": "Peter Paul Rubens, 'The Fall of Phaeton'",
        "excerpt": "Rubens paints the instant the sun-chariot careens out of control: horses rear and twist in panic, the reins snap loose, and the boy Phaethon tumbles headlong through a sky split by lightning and writhing female figures of the Hours. The whole heavens seem to overheat and shatter at once, a Baroque vision of a single overloaded system collapsing in fire, the mythic ancestor of every grid that fails when the sun runs too hot.",
        "source": "Peter Paul Rubens, c.1604–1605, National Gallery of Art, Washington (Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Peter_Paul_Rubens_-_The_Fall_of_Phaeton_(National_Gallery_of_Art).jpg",
        "image": {
          "src": "/covers/power-outages-hit-france-as-heatwave-peaks--a4.png",
          "alt": "Baroque painting of Phaethon falling from the runaway sun-chariot amid panicked horses and a lightning-torn sky.",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Vivaldi, 'Summer' (L'estate) from The Four Seasons, Op. 8 No. 2, RV 315",
        "excerpt": "Vivaldi prefaced this concerto with a sonnet that opens 'Beneath the harsh season inflamed by the sun, man languishes, the flock languishes, and the pine tree burns.' The music renders that oppression directly: a heavy, panting opening where strings sag under the heat, then buzzing flies and a sudden violent storm of roaring thunder, the natural world driven to the edge by relentless sun, exactly the menace of a heatwave reaching its breaking point.",
        "source": "Antonio Vivaldi, Le quattro stagioni, IMSLP",
        "href": "https://imslp.org/wiki/Le_quattro_stagioni_(Vivaldi,_Antonio)"
      }
    ],
    "rank": 24
  },
  {
    "slug": "cammock-pulls-churchill-video-from-portrait-gallery",
    "headline": "Helen Cammock withdraws her video from the National Portrait Gallery after a Churchill backlash",
    "overview": "The British artist Helen Cammock pulled her video work from London's National Portrait Gallery after its critical portrayal of Winston Churchill provoked public anger. The dispute revived the long argument over how nations memorialize contested historical figures.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Artforum",
        "href": "https://www.artforum.com/news/helen-cammock-pulls-video-national-portrait-gallery-london-1234753085/"
      },
      {
        "name": "The Art Newspaper — Helen Cammock removes film criticising Churchill from National Portrait Gallery",
        "href": "https://www.theartnewspaper.com/2026/06/24/helen-cammock-video-work-criticising-winston-churchill-removed-from-national-portrait-gallery"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-24",
    "image": {
      "src": "/covers/cammock-pulls-churchill-video-from-portrait-gallery.png",
      "alt": "Bronze statue of Winston Churchill in Parliament Square, London",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 24 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The posthumous hanging of Oliver Cromwell at Tyburn (1661)",
        "excerpt": "This morning the carcases of Cromwell, Ireton, and Bradshaw (which the day before had been brought from the Red Lion Inn, Holborn), were drawn upon a sledge to Tyburn, and then taken out of their coffins, and in their shrouds hanged by the neck, until the going down of the sun. … and seeing of Cromwell, Ireton, and Bradshaw hanged and buried at Tyburn.",
        "source": "The Diary of Samuel Pepys, 30 January 1660/61 (Project Gutenberg)",
        "href": "https://gutenberg.org/cache/epub/4131/pg4131-images.html"
      },
      {
        "category": "historical",
        "title": "New Yorkers topple the statue of King George III (1776)",
        "excerpt": "Johannes Oertel's mid-19th-century history painting captures the moment in July 1776 when New Yorkers, fired by the Declaration of Independence, roped and dragged down the gilded equestrian statue of George III at Bowling Green. The toppling of a once-revered monarch dramatizes how swiftly a celebrated figure can be unmade into a fallen idol when public sentiment turns against the memorialized hero.",
        "source": "New-York Historical Society / Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Johannes_Adam_Simon_Oertel_Pulling_Down_the_Statue_of_King_George_III,_N.Y.C._ca._1859.jpg"
      },
      {
        "category": "literary",
        "title": "Shelley, 'Ozymandias' — the colossal wreck of a tyrant's fame",
        "excerpt": "And on the pedestal these words appear: \"My name is Ozymandias, king of kings: Look on my works, ye Mighty, and despair!\" Nothing beside remains. Round the decay Of that colossal wreck, boundless and bare The lone and level sands stretch far away.",
        "source": "Percy Bysshe Shelley, 'Ozymandias' (1818), via Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Hundred_Best_Poems_(lyrical)_in_the_English_language_-_second_series/Ozymandias"
      },
      {
        "category": "literary",
        "title": "Mark Antony over Caesar's body — how the crowd judges a hero",
        "excerpt": "Friends, Romans, countrymen, lend me your ears; I come to bury Caesar, not to praise him. The evil that men do lives after them, The good is oft interred with their bones; So let it be with Caesar. … For Brutus is an honourable man, So are they all, all honourable men.",
        "source": "Shakespeare, Julius Caesar, Act III Sc. 2 (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/1522/1522-h/1522-h.htm"
      },
      {
        "category": "artistic",
        "title": "Pulling Down the Statue of King George III, N.Y.C.",
        "excerpt": "Oertel renders iconoclasm as theatre: ropes strain against the gilded king and horse, a jubilant crowd surges below, and the toppling idol tilts against an open sky. The canvas freezes the instant a monument to a celebrated leader becomes rubble, the same charged threshold between veneration and outrage now reopened over Churchill's image.",
        "source": "Johannes Adam Simon Oertel, c. 1852–59, New-York Historical Society",
        "href": "https://commons.wikimedia.org/wiki/File:Johannes_Adam_Simon_Oertel_Pulling_Down_the_Statue_of_King_George_III,_N.Y.C._ca._1859.jpg",
        "image": {
          "src": "/covers/cammock-pulls-churchill-video-from-portrait-gallery--a4.png",
          "alt": "Painting of a crowd roping down the gilded equestrian statue of King George III",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Handel, 'See, the Conqu'ring Hero Comes' from Judas Maccabaeus",
        "excerpt": "Handel's triumphal chorus enthrones the returning hero in major-key fanfare and swelling acclamation, the very sound of a nation crowning its champion. Its untroubled glory is exactly the myth Cammock's video set out to interrogate — the burnished heroic anthem against which contested histories now strain.",
        "source": "George Frideric Handel, Judas Maccabaeus HWV 63 (1746), via IMSLP",
        "href": "https://imslp.org/wiki/Judas_Maccabaeus,_HWV_63_(Handel,_George_Frideric)"
      }
    ],
    "rank": 25
  },
  {
    "slug": "nato-chief-rutte-heads-to-white-house-before-summit",
    "headline": "NATO chief Mark Rutte heads to the White House to steady ties with Trump before the summit",
    "overview": "NATO Secretary General Mark Rutte traveled to the White House to smooth relations with President Trump ahead of next month's alliance summit. He sought to keep NATO united over defense spending and continued support for Ukraine.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMijwFBVV95cUxNWndwOG5wU1FsNDQ4c1pHVkNObzE4Q1Q3dk02c2R6V2dQNS1nVnowLVBhcXVEREFkc0tSUXNxcTdCRlFRQkNwT3ZTVk1iaEtfRVdXaFdrY0s0QmZmQWI4M1Q0SmN6eFFFb19kQ2hoVy1Xd1d4VlJSY2FfaVRYeVoyNzAzTVpvQzBWU1VldjI5OA?oc=5"
      },
      {
        "name": "Modern Diplomacy — NATO Chief Rutte Meets Trump to Ease Alliance Tensions Before July Summit",
        "href": "https://moderndiplomacy.eu/2026/06/24/nato-chief-rutte-meets-trump-to-ease-alliance-tensions-before-july-summit/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-24",
    "image": {
      "src": "/covers/nato-chief-rutte-heads-to-white-house-before-summit.png",
      "alt": "NATO Secretary General Mark Rutte with U.S. President Donald Trump at the White House",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 24 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Themistocles' Letter to King Artaxerxes",
        "excerpt": "“I, Themistocles, am come to you, who did your house more harm than any of the Hellenes, when I was compelled to defend myself against your father’s invasion—harm, however, far surpassed by the good that I did him during his retreat, which brought no danger for me but much for him. For the past, you are a good turn in my debt… for the present, able to do you great service, I am here, pursued by the Hellenes for my friendship for you.”",
        "source": "Thucydides, History of the Peloponnesian War, Book I (Crawley trans.), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/7142/7142-0.txt"
      },
      {
        "category": "historical",
        "title": "The Holy Alliance, Article I (1815)",
        "excerpt": "“Conformably to the words of the Holy Scriptures, which command all men to consider each other as brethren, the Three contracting Monarchs will remain united by the bonds of a true and indissoluble fraternity, and considering each other as fellow countrymen, they will, on all occasions and in all places, lend each other aid and assistance.”",
        "source": "The Holy Alliance Treaty, 26 September 1815, The Napoleon Series / Waterloo Association",
        "href": "https://www.napoleon-series.org/research/government/diplomatic/c_alliance.html"
      },
      {
        "category": "literary",
        "title": "Priam Supplicates Achilles (Iliad, Book 24)",
        "excerpt": "“Remember thy father, O Achilles like to the gods, whose years are even as mine, on the grievous threshold of old age… Nay, have thou awe of the gods, Achilles, and take pity on me, remembering thine own father.”",
        "source": "Homer, Iliad 24 (A. T. Murray trans.), Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0134:book=24:card=468"
      },
      {
        "category": "literary",
        "title": "Esther Approaches the Throne of King Ahasuerus",
        "excerpt": "“And it was so, when the king saw Esther the queen standing in the court, that she obtained favour in his sight: and the king held out to Esther the golden sceptre that was in his hand. So Esther drew near, and touched the top of the sceptre. Then said the king unto her, What wilt thou, queen Esther? and what is thy request? it shall be even given thee to the half of the kingdom.”",
        "source": "The Book of Esther 5:1–3 (King James Version), Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Esther"
      },
      {
        "category": "artistic",
        "title": "The Ambassadors of Agamemnon in the Tent of Achilles",
        "excerpt": "Ingres freezes the instant an embassy fails: envoys in solemn drapery lean forward to plead Agamemnon's case, while a seated Achilles turns coolly away, lyre in hand, refusing to be flattered back into the war. The cramped tent and the tension between supplicant gesture and proud silence make it the very image of high-stakes persuasion before an unmovable power.",
        "source": "Jean-Auguste-Dominique Ingres, 1801, oil on canvas, École des Beaux-Arts, Paris (via Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:The_Envoys_of_Agamemnon_by_Ingres.jpg",
        "image": {
          "src": "/covers/nato-chief-rutte-heads-to-white-house-before-summit--a4.png",
          "alt": "Ingres painting of Agamemnon's ambassadors pleading with a seated Achilles in his tent",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Triumphal Scene from Verdi's Aida, Act II",
        "excerpt": "In Verdi's blazing 'Gloria all'Egitto,' victorious Egypt receives a defeated embassy: vanquished prisoners and a foreign king are led before the throne, where pleas, tribute and the politics of mercy collide amid massed trumpets and choral acclamation. It dramatizes the spectacle of the weaker party suing for favor before a power basking in its own strength.",
        "source": "Giuseppe Verdi, Aida, Act II full score (1871), IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/A%C3%AFda_(Verdi,_Giuseppe)"
      }
    ],
    "rank": 26
  },
  {
    "slug": "congress-invokes-war-powers-to-halt-trump-iran-war",
    "headline": "Congress passes a war powers measure rebuking Trump over the Iran strikes",
    "overview": "Both houses of Congress have passed a war powers measure rebuking President Trump's military action against Iran — the first time the resolution has cleared Congress since it was written. The vote is a rare assertion that the power to make war was meant to be shared, even as its practical force remains uncertain.",
    "genre": "Politics",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.com/news/articles/ce8j6g3v3r4o"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMipAFBVV95cUxQNmhxUVNibG82ZUN6NG5vUGVEb3c3X3ExNXJKYjFwYzZCYi03ZGFjX2JNZ1VyNzRzSzF5U3V4LVhIUGM4U0lrZzY4SmhBeGZuVHlqLWxsQ3hPRk5aYVZtT2ZPUk84LUl2LWw1WEl5ai1OS3ZFcGlKTmpEZmVPeG5rT1QwOFVoY25iS2NXRjBPTnQtNnBxYkNpQXFVT1hKTEJYbGJpSg?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-24",
    "image": {
      "src": "/covers/congress-invokes-war-powers-to-halt-trump-iran-war.png",
      "alt": "An empty legislative chamber at dawn",
      "credit": "BBC"
    },
    "rank": 27,
    "analogies": [
      {
        "category": "historical",
        "title": "The English Bill of Rights, 1689",
        "excerpt": "That the raising or keeping a standing army within the kingdom in time of peace, unless it be with consent of Parliament, is against law;",
        "source": "Act of Parliament, 1689 — The Avalon Project, Yale Law School",
        "href": "https://avalon.law.yale.edu/17th_century/england.asp"
      },
      {
        "category": "historical",
        "title": "Thucydides, the Mytilenean Debate, 427 BCE",
        "excerpt": "The morrow brought repentance with it and reflection on the horrid cruelty of a decree, which condemned a whole city to the fate merited only by the guilty. This was no sooner perceived by the Mitylenian ambassadors at Athens and their Athenian supporters, than they moved the authorities to put the question again to the vote; which they the more easily consented to do, as they themselves plainly saw that most of the citizens wished some one to give them an opportunity for reconsidering the matter. An assembly was therefore at once called.",
        "source": "History of the Peloponnesian War, Book 3.36 (Crawley trans.)",
        "href": "https://en.wikisource.org/wiki/History_of_the_Peloponnesian_War/Book_3"
      },
      {
        "category": "literary",
        "title": "Aeschylus, \"The Persians,\" 472 BCE",
        "excerpt": "And who is set over them as shepherd and is master of their host? Of no man are they called the slaves or vassals.",
        "source": "Tragedy, 472 BCE — Perseus Digital Library (Smyth trans.)",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0012:card%3D232"
      },
      {
        "category": "literary",
        "title": "Shakespeare, \"Henry V,\" Act 4, Scene 1",
        "excerpt": "But if the cause be not good, the king himself hath a heavy reckoning to make, when all those legs and arms and heads, chopped off in battle, shall join together at the latter day and cry all 'We died at such a place;' some swearing, some crying for a surgeon, some upon their wives left poor behind them, some upon the debts they owe, some upon their children rawly left.",
        "source": "History play, 1600 — The Complete Works, MIT",
        "href": "http://shakespeare.mit.edu/henryv/henryv.4.1.html"
      },
      {
        "category": "artistic",
        "title": "Francisco Goya, \"The Third of May 1808\"",
        "excerpt": "A lantern throws its hard white light on a man in a white shirt, arms flung wide, the instant before the volley. Facing him a rank of soldiers, faceless, bent to their rifles, a single machine of the state. At his feet the already dead; behind him the line of those still to die, hands at their eyes. Goya paints the war-maker's arithmetic from the wrong end of the barrel: the reckoning that comes, as it always does, too late for the man in the white shirt.",
        "source": "Oil on canvas, 1814 — Museo del Prado, Madrid",
        "href": "https://en.wikipedia.org/wiki/The_Third_of_May_1808",
        "image": {
          "src": "/covers/congress-invokes-war-powers-to-halt-trump-iran-war--a4.png",
          "alt": "Goya, “The Third of May 1808”",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Beethoven, Symphony No. 3 \"Eroica,\" Op. 55, 1804",
        "excerpt": "He had written the hero's name across the title page in his own hand, dedication to the one man who seemed to carry the rights of all men. Then word came that the man had crowned himself, and Beethoven took the page and scratched the name out so hard the pen tore through the paper. What was meant to honor a liberator became music \"to the memory of a great man\" — the artist reaching back to recall a tribute he could no longer give to a ruler who had set himself above the people.",
        "source": "Orchestral score, 1804 — IMSLP",
        "href": "https://imslp.org/wiki/Symphony_No.3,_Op.55_(Beethoven,_Ludwig_van)"
      }
    ],
    "edition": "Morning Edition · 24 June 2026"
  },
  {
    "slug": "ai-stocks-slump-revives-the-bubble-question",
    "headline": "Tech sell-off drags Wall Street lower and revives AI-bubble fears",
    "overview": "A sharp slide in big technology shares dragged Wall Street lower, reviving the question of whether the long AI rally is investors taking profit or the first crack in a bubble. For now no one can say which, and the not-knowing is itself the story.",
    "genre": "Economy",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMijwFBVV95cUxPc0hsaTJHSzN3R1pMUkVGZUZncFczQjZMaHh6RzNzS3BFYWs4ZDQ2b3IzcDE2TXo4LVdReE9QSkNMLXY0eDJBR3RGUzZ0Z2ltUTZLUDdKd2ZsaERzVnZFcXlod1hrVTU1V3VQUngtam9CX0FoWWZOUTVtUlVRakhvcEw4Ti1vQ3ZjbmRsak95MA?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMigwFBVV95cUxOVVhrUmdEOThuTVBvZ2hvWXR5QjJXLXRnb2NicWtJX0hBcWJNRV9yVHlONk5CWkcyeG1rcjJweXdkVDUzYmtUU3o2MHhfM0MyVVZJNEUwaUJQYzh2YWlCTWtiZF85OFJDWTNIRktqVk9jZ1hyRjAyX1NTVzNqakVBdDVYTQ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-23",
    "image": {
      "src": "/covers/ai-stocks-slump-revives-the-bubble-question.png",
      "alt": "A trading floor as the tide turns",
      "credit": "Wikimedia Commons"
    },
    "rank": 28,
    "analogies": [
      {
        "category": "historical",
        "title": "The South Sea Bubble bursts, 1720",
        "excerpt": "Sensible men beheld the extraordinary infatuation of the people with sorrow and alarm. There were some both in and out of parliament who foresaw clearly the ruin that was impending.",
        "source": "Economic history — Mackay, 1841",
        "href": "https://www.gutenberg.org/files/24518/24518-h/24518-h.htm"
      },
      {
        "category": "historical",
        "title": "Tulipomania collapses, Holland, 1630s",
        "excerpt": "At last, however, the more prudent began to see that this folly could not last for ever. Rich people no longer bought the flowers to keep them in their gardens, but to sell them again at cent per cent profit. It was seen that somebody must lose fearfully in the end. As this conviction spread, prices fell, and never rose again.",
        "source": "Economic history — Mackay, 1841",
        "href": "https://www.gutenberg.org/files/24518/24518-h/24518-h.htm"
      },
      {
        "category": "literary",
        "title": "Anthony Trollope, \"The Way We Live Now\" (1875)",
        "excerpt": "How odd it seems! It isn't a fortnight since we all thought him the greatest man in London.",
        "source": "Novel, 1875",
        "href": "https://www.gutenberg.org/files/5231/5231-h/5231-h.htm"
      },
      {
        "category": "literary",
        "title": "Émile Zola, \"Money\" (L'Argent, 1891)",
        "excerpt": "This was the usual result which attends an augmentation of capital: the classic whip-stroke, the trick of stimulating success, of urging the quotations into a brisk canter whenever there is a new issue. But the rise was also in a measure due to the genuine importance of the enterprises which the Bank was about to launch. The large yellow bills, placarded all over Paris, announcing the approaching opening of the Carmel silver mines, had ended by turning every head.",
        "source": "Novel, 1891 (trans. Vizetelly)",
        "href": "https://www.gutenberg.org/files/56987/56987-h/56987-h.htm"
      },
      {
        "category": "artistic",
        "title": "Hogarth, \"The South Sea Scheme\" (1721)",
        "excerpt": "Hogarth's first great satire sets a fairground of greed beneath the City's spires: speculators ride a whirligig while Honesty is broken on the wheel and Honour flogged, the crowd gambling its way to ruin even as the machine spins on. It is the bubble drawn as a carnival — euphoria and the gallows in a single frame.",
        "source": "Engraving, 1721",
        "href": "https://en.wikipedia.org/wiki/Emblematical_Print_on_the_South_Sea_Scheme",
        "image": {
          "src": "/covers/ai-stocks-slump-revives-the-bubble-question--a4.png",
          "alt": "Hogarth, “The South Sea Scheme”",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Edward Matthew Ward, \"The South Sea Bubble, a Scene in 'Change Alley in 1720\" (1847)",
        "excerpt": "Ward paints the morning after as a heaving crush in 'Change Alley: top-hatted gentlemen and ruined clerks press together in a street that has become a casino, faces lit with greed turning to dread. Looking back from Victorian London at a crash a century gone, he makes speculation a costume drama whose moral never dates.",
        "source": "Oil on canvas, 1847 — Tate",
        "href": "https://www.tate.org.uk/art/artworks/ward-the-south-sea-bubble-a-scene-in-change-alley-in-1720-n00432"
      }
    ],
    "edition": "Morning Edition · 24 June 2026"
  },
  {
    "slug": "ships-return-to-the-strait-of-hormuz-amid-toll-warnings",
    "headline": "Ships return to the Strait of Hormuz as the US warns Iran against tolls",
    "overview": "Dozens of ships moved again through the Strait of Hormuz after a US–Iran deal, even as the UN moved to evacuate stranded sailors and Washington warned against any attempt to levy tolls on the passage. The fate of a fifth of the world's oil hangs on a channel a few miles wide.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.com/news/articles/c24yr796emzo"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMivwFBVV95cUxNSjlBc1JxN0hPX3MwaDU1UDMyeEE1SG1tRS1ma1FpSENKVVdpVzY3eUNoeUJvdGtVVDZtRm84UG1jTjBwV0s0RTExRHZCczB3TnBYN05CSlJueGNLSU1zeUstS0U0NTBBa0NhUU00VE0wQWFWU0ZfWGtiT2tfeVBpdWV1NmZ3UlBvTmxwRXU3WlVPNGdDU3VWNXJMOWJfNWM1ZEtyNS1YV3JlY2xEeTZmczZsRmdrd1AzMVhZTEFVdw?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-23",
    "image": {
      "src": "/covers/ships-return-to-the-strait-of-hormuz-amid-toll-warnings.png",
      "alt": "Tankers threading a narrow strait",
      "credit": "BBC"
    },
    "rank": 29,
    "analogies": [
      {
        "category": "historical",
        "title": "The Sound Dues at Elsinore (debated in the House of Commons, 5 June 1857)",
        "excerpt": "The delays ships meet with at Elsinore from having to remain for their necessary papers from the Custom House is often the cause of many disasters.",
        "source": "Hansard, UK Parliament",
        "href": "https://api.parliament.uk/historic-hansard/commons/1857/jun/05/sound-dues-committee"
      },
      {
        "category": "historical",
        "title": "The Suez Crisis, 1956 — Nasser's Nationalization Speech (Alexandria, 26 July 1956)",
        "excerpt": "Egypt nationalized the Egyptian Suez Canal company. When Egypt granted the concession to de Lesseps it was stated in the concession between the Egyptian Government and the Egyptian company that the company of the Suez Canal is an Egyptian company subject to Egyptian authority.",
        "source": "Fordham Modern History Sourcebook",
        "href": "https://sourcebooks.fordham.edu/mod/1956nasser-suez1.asp"
      },
      {
        "category": "literary",
        "title": "Homer, \"Odyssey\" — Scylla and Charybdis (Book 12, 8th c. BCE)",
        "excerpt": "No ship ever yet got past her without losing some men, for she shoots out all her heads at once, and carries off a man in each mouth.",
        "source": "Epic, trans. Samuel Butler",
        "href": "https://www.gutenberg.org/cache/epub/1727/pg1727.html"
      },
      {
        "category": "literary",
        "title": "Apollonius Rhodius, \"Argonautica\" — the Clashing Rocks (Book 2, 3rd c. BCE)",
        "excerpt": "First entrust the attempt to a dove when ye have sent her forth from the ship. And if she escapes safe with her wings between the rocks to the open sea, then no more do ye refrain from the path, but grip your oars well in your hands and cleave the sea's narrow strait, for the light of safety will be not so much in prayer as in strength of hands.",
        "source": "Epic, trans. R. C. Seaton",
        "href": "https://www.gutenberg.org/cache/epub/13977/pg13977.html"
      },
      {
        "category": "artistic",
        "title": "Henry Fuseli, \"Odysseus in front of Scylla and Charybdis\" (oil on canvas, 1794–1796)",
        "excerpt": "Fuseli stages the strait as a single instant of dread: Odysseus rears up in his open boat, shield flung above his head, while the six necks of Scylla coil down from the cliff to pluck his oarsmen one by one. Below the hull the funnel of Charybdis turns. There is no third course between the two—only the toll, paid in men, that the narrows always exact.",
        "source": "Aargauer Kunsthaus, Aarau",
        "href": "https://commons.wikimedia.org/wiki/File:Johann_Heinrich_F%C3%BCssli_054.jpg",
        "image": {
          "src": "/covers/ships-return-to-the-strait-of-hormuz-amid-toll-warnings--a4.png",
          "alt": "Fuseli, “Odysseus before Scylla and Charybdis”",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Maerten van Heemskerck, \"The Colossus of Rhodes\" (engraving, Seven Wonders series, 1572)",
        "excerpt": "Heemskerck sets the bronze giant astride the harbour mouth, one foot on each mole, while small ships pass beneath his legs into the port. The conceit is historically false—the real Colossus never spanned the entrance—but it captures the older truth the print means to flatter: whoever stands over the narrows commands everything that would sail through them.",
        "source": "Engraving, publ. Philips Galle",
        "href": "https://commons.wikimedia.org/wiki/File:Colossus_of_Rhodes.jpg"
      }
    ],
    "edition": "Morning Edition · 24 June 2026"
  },
  {
    "slug": "mamdani-slate-sweeps-new-york-primaries",
    "headline": "Mamdani-backed candidates sweep New York's Democratic primaries",
    "overview": "Candidates backed by Zohran Mamdani swept New York's Democratic primaries, ousting two incumbents from Congress, while a scion of the Kennedy family lost a crowded, expensive race. A generation that ran the city's politics is being shown the door.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMimwFBVV95cUxQY0lqaEZQNlNDM2hCUEZvTXdfMmZ0R050aTZWOUlsR0RYZWQ5ZkUwcHJkd0FyOHBqOG9kS1o0MF9GeWpqd0M0ajdqOE5vWXZxb1VsZUhrSzFjaG1xbkNNZTc4aGpIYXoxQjVIX3dKVXBraUEwVHh0Ny1PREtLR3dETXRxWG9KNVNaVHBmRURhdjloVk5TS2lwbzVDcw?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.com/news/articles/clye652m41po"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-24",
    "image": {
      "src": "/covers/mamdani-slate-sweeps-new-york-primaries.png",
      "alt": "An election night, a changing of the guard",
      "credit": "BBC"
    },
    "rank": 30,
    "analogies": [
      {
        "category": "historical",
        "title": "The fall of Boss Tweed and Tammany Hall, New York (1871)",
        "excerpt": "I don't care who does the electing, so long as I get to do the nominating.",
        "source": "William M. Tweed, Wikiquote",
        "href": "https://en.wikiquote.org/wiki/William_M._Tweed"
      },
      {
        "category": "historical",
        "title": "Plutarch, Life of Tiberius Gracchus, ch. 9 (Perrin trans., 1921)",
        "excerpt": "The wild beasts that roam over Italy have every one of them a cave or lair to lurk in; but the men who fight and die for Italy enjoy the common air and light, indeed, but nothing else; houseless and homeless they wander about with their wives and children.",
        "source": "Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:2008.01.0065:chapter=9"
      },
      {
        "category": "literary",
        "title": "Shakespeare, Henry IV, Part 2, Act V, Scene 5 (c. 1597)",
        "excerpt": "I know thee not, old man: fall to thy prayers; How ill white hairs become a fool and jester! I have long dream'd of such a kind of man, So surfeit-swell'd, so old and so profane; But, being awaked, I do despise my dream.",
        "source": "The Complete Works of Shakespeare (MIT)",
        "href": "https://shakespeare.mit.edu/2henryiv/2henryiv.5.5.html"
      },
      {
        "category": "literary",
        "title": "Ecclesiastes 1:4, King James Version (1611)",
        "excerpt": "One generation passeth away, and another generation cometh: but the earth abideth for ever.",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Ecclesiastes"
      },
      {
        "category": "artistic",
        "title": "Thomas Nast, \"The Tammany Tiger Loose,\" Harper's Weekly (Nov. 11, 1871), wood engraving",
        "excerpt": "The Tammany Tiger Loose—'What are you going to do about it?'",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Nast-Tammany.jpg",
        "image": {
          "src": "/covers/mamdani-slate-sweeps-new-york-primaries--a4.png",
          "alt": "Thomas Nast, “The Tammany Tiger Loose”",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "\"The World Turned Upside Down,\" English broadside ballad (1646)",
        "excerpt": "Yet let's be content, and the times lament, you see the world turn'd upside down.",
        "source": "Wikipedia (Thomason Tracts, 8 April 1646)",
        "href": "https://en.wikipedia.org/wiki/The_World_Turned_Upside_Down"
      }
    ],
    "edition": "Morning Edition · 24 June 2026"
  },
  {
    "slug": "ukraine-strikes-rail-bridge-to-isolate-crimea",
    "headline": "Ukraine strikes a railway bridge to cut supplies to Crimea",
    "overview": "Ukraine says it struck a railway bridge carrying supplies toward Crimea, part of a campaign to isolate the Russian-held peninsula, as Sevastopol and occupied Kherson reported power outages. The aim is older than the weapons: sever the line and the held ground starves.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMiowFBVV95cUxQd1VSejl2SUhJMm5fZDVLcW84X0FKOUpnc0tKUHVSYkNLR3lxY1JFNFBRTE50RkgxcVRJY1hMR0VQVGlkcWRIaldSNjZDbnRPQW44R2dLWFdoWGV2c2lHVGNpWWxxU2xIdHhSTWVya2xXUElVb3M1NFRjdk9SWjN3Y3JjUjRza3kyX0pIOTVHOWVMdnlHWVVET0d5SWNKV25HLWlZ?oc=5"
      },
      {
        "name": "Euronews",
        "href": "https://www.euronews.com/my-europe/2026/06/23/ukraine-says-key-crimea-rail-bridge-no-longer-exists-after-drone-strikes"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-23",
    "image": {
      "src": "/covers/ukraine-strikes-rail-bridge-to-isolate-crimea.png",
      "alt": "A severed railway bridge at dusk",
      "credit": "Euronews"
    },
    "rank": 31,
    "analogies": [
      {
        "category": "historical",
        "title": "Sherman's Memoirs, on the March to the Sea and the twisting of the rails (1864)",
        "excerpt": "The best and easiest way is the one I have described, of heating the middle of the iron-rails on bonfires made of the cross-ties, and then winding them around a telegraph-pole or the trunk of some convenient sapling.",
        "source": "Memoirs of Gen. W. T. Sherman, Vol. II (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/5853/5853-h/5853-h.htm"
      },
      {
        "category": "historical",
        "title": "Caesar, The Gallic War, Book VII.68 — the circumvallation of Alesia (52 BC)",
        "excerpt": "On reconnoitering the situation of the city, finding that the enemy were panic-stricken, because the cavalry in which they placed their chief reliance, were beaten, he encouraged his men to endure the toil, and began to draw a line of circumvallation round Alesia.",
        "source": "Perseus Digital Library (McDevitte & Bohn trans.)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0001:book=7:chapter=68"
      },
      {
        "category": "literary",
        "title": "Homer, Iliad, Book XII — the Achaean wall and trench fail to hold (8th c. BC)",
        "excerpt": "So then amid the huts the valiant son of Menoetius was tending the wounded Eurypylus, but the others, Argives and Trojans, fought on in throngs, nor were the ditch of the Danaans and their wide wall above long to protect them.",
        "source": "Perseus Digital Library (A. T. Murray trans.)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0134:book=12:card=1"
      },
      {
        "category": "literary",
        "title": "Tasso, Jerusalem Delivered — the drought that withers the besiegers' water (Fairfax trans., 1600)",
        "excerpt": "And little Siloe that his store bestows / Of purest crystal on the Christian bands, / The pebbles naked in his channel shows / And scantly glides above the scorched sands.",
        "source": "Jerusalem Delivered, trans. Edward Fairfax (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/392/392-h/392-h.htm"
      },
      {
        "category": "artistic",
        "title": "George N. Barnard, 'Sherman's men destroying railroad,' Atlanta (photograph, 1864)",
        "excerpt": "Soldiers stand along a torn-up line outside Atlanta, the rails levered loose and the ties stacked to burn — the photograph fixes the precise act behind this week's bridge strike: not a battle won, but a lifeline severed, the held ground quietly left to wither. Logistics, the war's silent arbiter, made visible.",
        "source": "Library of Congress / Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Sherman_railroad_destroy.jpg",
        "image": {
          "src": "/covers/ukraine-strikes-rail-bridge-to-isolate-crimea--a4.png",
          "alt": "Sherman's men destroying the railroad, 1864",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "J. B. Elliott, 'Scott's Great Snake' — the Anaconda Plan to strangle the Confederacy (lithograph, 1861)",
        "excerpt": "A great serpent labeled with Winfield Scott's coastal blockade and Mississippi thrust coils around the seceded South, its body a tightening ring meant to cut the Confederacy off from what fed it and squeeze until its breath gave out. The cartoon makes the event's own logic plain: to break a place, ring it and starve it.",
        "source": "Library of Congress, Geography and Map Division",
        "href": "https://www.loc.gov/item/99447020"
      }
    ],
    "edition": "Morning Edition · 24 June 2026"
  },
  {
    "slug": "a-single-fault-halts-all-of-germanys-trains",
    "headline": "An IT failure briefly halts Germany's entire rail network",
    "overview": "Germany's rail network was briefly halted nationwide after an IT and communications malfunction, stranding trains across the country before service resumed. A single point of failure showed how much of modern life rests on one quietly humming system.",
    "genre": "Technology",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.com/news/articles/crm0ek4z7ggo"
      },
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMiwgFBVV95cUxORmdjb1p0RTZETDI1XzhnSjJpTnpRSkJuSENLLU5ZQmQ2emZ5QjVLZWhxdS1MQXFIZUk4OVdITVpPdjAxS1E5eUxCWTFIX2NrVEtOUjFmek5NM1REUWR0LUl3ZW83VFhCYlFyTER3ZnlfVEVLYldpWGk2UXQ1Z0h0ekhPalFoTS1yLVB0cjgwOFF1OEdYcDhXVk0xSmJXQ05XM3NKOUZ5Mlo1UkpTaDJjYjExMC1xZ25hTW1BbmNfdS1rUQ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-24",
    "image": {
      "src": "/covers/a-single-fault-halts-all-of-germanys-trains.png",
      "alt": "An empty platform beneath a stopped clock",
      "credit": "BBC"
    },
    "rank": 32,
    "analogies": [
      {
        "category": "historical",
        "title": "The Northeast Blackout of November 9, 1965",
        "excerpt": "The safety relay had been misprogrammed, and it did what it had been asked to do: to disconnect under the loads it perceived. Instantly, the load that was flowing on the tripped line redistributed to the other lines, causing them to become overloaded. Their own protective relays, which are also designed to protect the lines from overload, tripped, isolating Beck Station.",
        "source": "Wikipedia (Federal Power Commission findings)",
        "href": "https://en.wikipedia.org/wiki/Northeast_blackout_of_1965"
      },
      {
        "category": "historical",
        "title": "The AT&T Long-Distance Network Collapse, January 15, 1990",
        "excerpt": "The problem repeated iteratively throughout the 114 switches in the network, blocking over 50 million calls in the nine hours it took to stabilize the system. ... Because every switch contained the same software, the resets cascaded down the network, incapacitating the system.",
        "source": "Cal Poly, \"All Circuits Are Busy Now\"",
        "href": "https://users.csc.calpoly.edu/~jdalbey/SWE/Papers/att_collapse"
      },
      {
        "category": "literary",
        "title": "E. M. Forster, \"The Machine Stops\" (1909), Chapter III",
        "excerpt": "But there came a day when, without the slightest warning, without any previous hint of feebleness, the entire communication-system broke down, all over the world, and the world, as they understood it, ended.",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Machine_Stops/Chapter_III"
      },
      {
        "category": "literary",
        "title": "Benjamin Franklin, \"The Way to Wealth\" (1758)",
        "excerpt": "A little neglect may breed great mischief; for want of a nail the shoe was lost; for want of a shoe the horse was lost; and for want of a horse the rider was lost; being overtaken and slain by the enemy; all for want of a little care about a horse-shoe nail.",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/files/43855/43855-h/43855-h.htm"
      },
      {
        "category": "artistic",
        "title": "Pieter Bruegel the Elder, \"The Tower of Babel\" (1563, oil on panel)",
        "excerpt": "And the LORD said, Behold, the people is one, and they have all one language; and this they begin to do: and now nothing will be restrained from them, which they have imagined to do. Go to, let us go down, and there confound their language, that they may not understand one another's speech.",
        "source": "Kunsthistorisches Museum, Vienna (text: Genesis 11, KJV)",
        "href": "https://en.wikipedia.org/wiki/The_Tower_of_Babel_(Bruegel)",
        "image": {
          "src": "/covers/a-single-fault-halts-all-of-germanys-trains--a4.png",
          "alt": "Bruegel, “The Tower of Babel”",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "François-Bernard Lépicié after Chardin, \"Le Château de cartes\" (1743, engraving)",
        "excerpt": "Aimable Enfant que le plaisir décide, / Nous badinons de vos frêles travaux: / Mais entre nous, quel est le plus solide. / De nos projets ou bien de vos châteaux.",
        "source": "Harvard Art Museums",
        "href": "https://harvardartmuseums.org/collections/object/354739"
      }
    ],
    "edition": "Morning Edition · 24 June 2026"
  },
  {
    "slug": "anthropics-mythos-model-breaches-classified-systems",
    "headline": "Anthropic's Mythos AI found vulnerabilities in classified US systems",
    "overview": "Anthropic's Mythos model found vulnerabilities in classified US government systems, according to reports — an AI turning its attention to the very defenses meant to be impregnable. The tool built to help now reads every door, and the question is who holds the key.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiwAFBVV95cUxQTEx4cERSZUZNYkRrVFVLVXpTRlh0NDNnZEF5OGg1cXI4WGwweDdzdFM0dFVUZ3YwWXNTUEVjZHhyWUJLWTlFVUw4eXREaG8wbDZaVFFpb0owVE9RbjhTN3JrYUoycGpqamRkd3lmTDRZaUNvUmEwTXhDNHZKU1hjTWkza2hvTWVCYURISXN2eVMtcXhybldMVVBrTV9KS01rRVJPUFpGcHA2LWtKTEZQbHdYS1E0YWVkcUI4SXNvdXg?oc=5"
      },
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMivwFBVV95cUxOYkVjS1FaVVQ2OWktYzZzT0kzdHZGVWE0eks1bnp4VFdQbzlHWlRMQUNaSWNPVkpWdURmbFdrOEJkQ09kMlQxNk9EZEtsVEZLNG5GeG9FanpjblBON194Y3UzUlVNUDE3SkVZTWExU2VCUHZGVlkybVFURFFzdXJVQWlobmYxeFRoalFpM1A5ZWNDQ2FNZnlkUXBObmpyMHkzVHpwWEJKT0ZJRk9OdjZGYkFhSEVwSHpsU0ZIR2Jobw?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-24",
    "image": {
      "src": "/covers/anthropics-mythos-model-breaches-classified-systems.png",
      "alt": "A vault door standing ajar",
      "credit": "Wikimedia Commons"
    },
    "rank": 33,
    "analogies": [
      {
        "category": "historical",
        "title": "The Oracle of Delphi answers Croesus — Herodotus, Histories I.53 (5th c. BC)",
        "excerpt": "Both the oracles agreed in the tenor of their reply, which was in each case a prophecy that if Croesus attacked the Persians, he would destroy a mighty empire, and a recommendation to him to look and see who were the most powerful of the Greeks, and to make alliance with them.",
        "source": "Herodotus, Histories (Rawlinson trans.)",
        "href": "https://en.wikisource.org/wiki/The_History_of_Herodotus_(Rawlinson)/Book_1"
      },
      {
        "category": "historical",
        "title": "The Zimmermann Telegram, decrypted by British cryptanalysts (January 1917)",
        "excerpt": "We intend to begin on the first of February unrestricted submarine warfare. We shall endeavor in spite of this to keep the United States of America neutral.",
        "source": "U.S. National Archives",
        "href": "https://www.archives.gov/milestone-documents/zimmermann-telegram"
      },
      {
        "category": "literary",
        "title": "Virgil, Aeneid, Book II — the Wooden Horse enters Troy (19 BC)",
        "excerpt": "Ourselves did make a breach within our walls and opened wide the ramparts of our city. … till o'er our walls the fatal engine climbed, pregnant with men-at-arms.",
        "source": "Virgil, Aeneid II (Williams trans., Perseus)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0054:book=2:card=234"
      },
      {
        "category": "literary",
        "title": "Aeschylus, Prometheus Bound — the forbidden gift of letters and number (5th c. BC)",
        "excerpt": "Yes, and numbers, too, chiefest of sciences, I invented for them, and the combining of letters, creative mother of the Muses' arts, with which to hold all things in memory.",
        "source": "Aeschylus, Prometheus Bound (Smyth trans., Perseus)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0010:card=436"
      },
      {
        "category": "artistic",
        "title": "Giovanni Domenico Tiepolo, The Procession of the Trojan Horse into Troy (oil on canvas, c. 1760)",
        "excerpt": "Tiepolo paints the moment of the breach made festival: the great wooden horse, taller than the gatehouse, is hauled through Troy's broken wall by a jubilant crowd who mistake their undoing for a triumph. The fortified city, receding into bright Roman stonework behind, has opened its own defenses to the engine of its ruin.",
        "source": "National Gallery, London / Wikimedia Commons",
        "href": "https://www.nationalgallery.org.uk/paintings/giovanni-domenico-tiepolo-the-procession-of-the-trojan-horse-into-troy",
        "image": {
          "src": "/covers/anthropics-mythos-model-breaches-classified-systems--a4.png",
          "alt": "Tiepolo, “The Procession of the Trojan Horse into Troy”",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Goethe, \"Prometheus\" — ode of defiant creation (written c. 1773, published 1789)",
        "excerpt": "Here sit I, forming mortals After my image; A race resembling me, To suffer, to weep, To enjoy, to be glad, And thee to scorn, As I!",
        "source": "The Works of J. W. von Goethe, Vol. 9 (Wikisource)",
        "href": "https://en.wikisource.org/wiki/The_Works_of_J._W._von_Goethe/Volume_9/Prometheus"
      }
    ],
    "edition": "Morning Edition · 24 June 2026"
  },
  {
    "slug": "parthenons-restored-west-facade-unveiled",
    "headline": "The Parthenon's restored west facade is unveiled in Athens",
    "overview": "Restorers in Athens unveiled the Parthenon's western facade, freed of scaffolding and partly recomposed from its scattered stones. Each replaced block reopens an old question: how much of a ruin can be remade before it becomes something new.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Artforum",
        "href": "https://www.artforum.com/news/western-facade-of-the-parthenon-restored-and-unobstructed-1234752681/"
      },
      {
        "name": "Euronews",
        "href": "https://www.euronews.com/culture/2026/06/18/keeping-up-appearances-greece-reveals-parthenon-facade-after-220-years"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-22",
    "image": {
      "src": "/covers/parthenons-restored-west-facade-unveiled.png",
      "alt": "The Parthenon freed of its scaffolding",
      "credit": "Artforum"
    },
    "rank": 34,
    "analogies": [
      {
        "category": "historical",
        "title": "Plutarch, Life of Pericles (on the building of the Parthenon), c. 100 CE",
        "excerpt": "For every particular piece of his work was immediately, even at that time, for its beauty and elegance, antique; and yet in its vigor and freshness looks to this day as if it were just executed. There is a sort of bloom of newness upon those works of his, preserving them from the touch of time, as if they had some perennial spirit and undying vitality mingled in the composition of them.",
        "source": "Plutarch, Lives (Dryden–Clough), Wikisource",
        "href": "https://en.wikisource.org/wiki/Plutarch's_Lives_(Clough)/Life_of_Pericles"
      },
      {
        "category": "historical",
        "title": "Lord Elgin's removal of the Parthenon marbles, 1801–1812 (the contested ownership)",
        "excerpt": "Between 1801 and 1812, agents of Thomas Bruce, 7th Earl of Elgin, removed about half of the surviving sculptures of the Parthenon, as well as architectural members and sculpture from the Propylaea and Erechtheum; to facilitate transport, members were sawn and sliced into smaller sections. Greece has disputed the British Museum's ownership ever since, holding that the sculptures were taken unethically and should be reunited with those in the Acropolis Museum.",
        "source": "Elgin Marbles, Wikipedia (overview of primary record)",
        "href": "https://en.wikipedia.org/wiki/Elgin_Marbles"
      },
      {
        "category": "literary",
        "title": "Plutarch, Life of Theseus (the Ship of Theseus), c. 100 CE",
        "excerpt": "The ship wherein Theseus and the youth of Athens returned had thirty oars, and was preserved by the Athenians down even to the time of Demetrius Phalereus, for they took away the old planks as they decayed, putting in new and stronger timber in their place, insomuch that this ship became a standing example among the philosophers, for the logical question as to things that grow; one side holding that the ship remained the same, and the other contending that it was not the same.",
        "source": "Plutarch, Lives (Dryden–Clough), Wikisource",
        "href": "https://en.wikisource.org/wiki/Plutarch's_Lives_(Clough)/Life_of_Theseus"
      },
      {
        "category": "literary",
        "title": "Percy Bysshe Shelley, \"Ozymandias\" (sonnet, 1818)",
        "excerpt": "And on the pedestal these words appear: \"My name is Ozymandias, king of kings: Look on my works, ye Mighty, and despair!\" Nothing beside remains. Round the decay Of that colossal wreck, boundless and bare The lone and level sands stretch far away.",
        "source": "Shelley, \"Ozymandias,\" Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Hundred_Best_Poems_(lyrical)_in_the_English_language_-_second_series/Ozymandias"
      },
      {
        "category": "artistic",
        "title": "Frederic Edwin Church, The Parthenon (oil on canvas, 1871)",
        "excerpt": "Church visited Greece in 1869 and made numerous studies of the ruined Acropolis at dusk; the resulting 1871 canvas, now in the Metropolitan Museum of Art, sets the bare temple against a reddening sky, its foreground strewn with fallen capitals and column drums. The picture treats the Parthenon not as it once stood but as a luminous ruin, a monument whose grandeur is inseparable from its decay.",
        "source": "The Parthenon (painting), Metropolitan Museum of Art via Wikipedia",
        "href": "https://en.wikipedia.org/wiki/The_Parthenon_(painting)",
        "image": {
          "src": "/covers/parthenons-restored-west-facade-unveiled--a4.png",
          "alt": "Frederic Church, “The Parthenon”",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "The Parthenon Frieze by Phidias (marble relief, c. 443–437 BCE)",
        "excerpt": "It was sculpted between c. 443 and 437 BC, most likely under the direction of Phidias, and the more accepted view is that it depicts the Greater Panathenaic procession. Fifty-six blocks of the frieze are at the British Museum in London (forming the major part of the Elgin Marbles); forty blocks are in the Acropolis Museum in Athens, and the remainder of fragments are shared between six other institutions.",
        "source": "Parthenon Frieze, Wikipedia (British Museum / Acropolis Museum)",
        "href": "https://en.wikipedia.org/wiki/Parthenon_Frieze"
      }
    ],
    "edition": "Morning Edition · 24 June 2026"
  },
  {
    "slug": "picasso-richter-hockney-top-art-basel-2026",
    "headline": "Picasso, Richter and Hockney top the sales at Art Basel 2026",
    "overview": "Works by Picasso, Richter and Hockney drew the largest sums at Art Basel 2026, the fair where the value of art is set in public, in real time. The spectacle is part market, part theater: a painting becomes worth exactly what the room will say out loud.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Artforum",
        "href": "https://www.artforum.com/news/picasso-richter-and-hockney-earn-at-art-basel-2026-1234752945/"
      },
      {
        "name": "ARTnews",
        "href": "https://www.artnews.com/list/art-news/market/top-sales-art-basel-1234789900/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-23",
    "image": {
      "src": "/covers/picasso-richter-hockney-top-art-basel-2026.png",
      "alt": "A fair of priceless canvases",
      "credit": "Artforum"
    },
    "rank": 35,
    "analogies": [
      {
        "category": "historical",
        "title": "The Tulipomania, Holland, 1636–37 (Charles Mackay, 1841)",
        "excerpt": "Nobles, citizens, farmers, mechanics, seamen, footmen, maidservants, even chimney-sweeps and old clotheswomen, dabbled in tulips. People of all grades converted their property into cash, and invested it in flowers. At first, as in all these gambling mania, confidence was at its height, and every body gained.",
        "source": "Mackay, Extraordinary Popular Delusions",
        "href": "https://www.econlib.org/library/Mackay/macEx.html?chapter_num=4"
      },
      {
        "category": "historical",
        "title": "Vasari on Lorenzo de' Medici's patronage and garden of antiquities (Lives, Life of Torrigiano, 1568)",
        "excerpt": "Truly magnificent was the example thus given by Lorenzo, and whenever Princes and other persons of high degree choose to imitate it, they will always gain everlasting honour and glory thereby; since he who assists and favors, in their noble undertakings, men of rare and beautiful genius, from whom the world receives such beauty, honour, convenience and benefit, deserves to live forever in the minds and memories of mankind.",
        "source": "Vasari, Lives of the Most Eminent Painters",
        "href": "https://www.italianrenaissanceresources.com/units/unit-3/sub-page-03/giorgio-vasaris-description-of-the-medici-academy/"
      },
      {
        "category": "literary",
        "title": "Honoré de Balzac, \"The Unknown Masterpiece\" (Le Chef-d'œuvre inconnu, 1831)",
        "excerpt": "\"I like your saint,\" the old man remarked, addressing Porbus. \"I would give you ten golden crowns for her over and above the price the Queen is paying; but as for putting a spoke in that wheel,--the devil take it!\"",
        "source": "Balzac, The Unknown Masterpiece (Project Gutenberg)",
        "href": "https://www.gutenberg.org/ebooks/23060"
      },
      {
        "category": "literary",
        "title": "Oscar Wilde, \"The Picture of Dorian Gray\" (1890), Lord Henry on price and value",
        "excerpt": "\"So sorry I am late, Dorian. I went to look after a piece of old brocade in Wardour Street and had to bargain for hours for it. Nowadays people know the price of everything and the value of nothing.\"",
        "source": "Wilde, The Picture of Dorian Gray (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/174/174-h/174-h.htm"
      },
      {
        "category": "artistic",
        "title": "Adriaen van Utrecht, \"Vanitas — Still Life with Bouquet and Skull\" (oil on canvas, c. 1642)",
        "excerpt": "The Flemish vanitas heaps the spoils of worldly fortune—coins and jewels, a bouquet already wilting, books and a wine glass—around a human skull, so that the eye is invited to price the riches and then reminded that none of it can be kept. It is the seventeenth century's answer to the saleroom: a painting that puts a market on display only to weigh it against the grave.",
        "source": "Wikimedia Commons (public domain)",
        "href": "https://commons.wikimedia.org/wiki/File:Adriaen_van_Utrecht-_Vanitas_-_Still_Life_with_Bouquet_and_Skull.JPG",
        "image": {
          "src": "/covers/picasso-richter-hockney-top-art-basel-2026--a4.png",
          "alt": "Adriaen van Utrecht, “Vanitas Still Life”",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Quentin Matsys, \"The Moneylender and His Wife\" (oil on panel, 1514, Musée du Louvre)",
        "excerpt": "Matsys sets a money-changer weighing gold coins and pearls on a balance while his wife, a book of devotion open before her, lets her eyes drift from the Virgin and Child toward the glittering scales. A convex mirror on the table catches the wider world; the panel turns the act of pricing precious things into a moral spectacle, beauty and devotion forever tilting against the weight of the coin.",
        "source": "Wikipedia / Wikimedia Commons (public domain)",
        "href": "https://en.wikipedia.org/wiki/The_Money_Changer_and_His_Wife"
      }
    ],
    "edition": "Morning Edition · 24 June 2026"
  },
  {
    "slug": "klara-and-the-sun-trailer-arrives",
    "headline": "First trailer arrives for the film of Ishiguro’s “Klara and the Sun”",
    "overview": "The first trailer arrived for the film of Kazuo Ishiguro's “Klara and the Sun,” narrated by an artificial friend who studies human feeling from the outside. The story asks the old question in a new casing: what do we owe the things we make to care for us?",
    "genre": "Culture",
    "sources": [
      {
        "name": "Kottke",
        "href": "https://kottke.org/26/06/0049195-the-trailer-for-klara-and"
      },
      {
        "name": "Variety",
        "href": "https://variety.com/2026/film/news/klara-and-the-sun-trailer-jenna-ortega-taika-waititi-1235997680/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-22",
    "image": {
      "src": "/covers/klara-and-the-sun-trailer-arrives.png",
      "alt": "An artificial figure turned toward the sun",
      "credit": "Variety"
    },
    "rank": 36,
    "analogies": [
      {
        "category": "historical",
        "title": "Babylonian Talmud, Sanhedrin 65b — Rava's golem (c. 5th–6th c. CE)",
        "excerpt": "Indeed, Rava created a man, a golem, using forces of sanctity. Rava sent his creation before Rabbi Zeira. Rabbi Zeira would speak to him but he would not reply. Rabbi Zeira said to him: You were created by one of the members of the group, one of the Sages. Return to your dust.",
        "source": "Sefaria (William Davidson Talmud)",
        "href": "https://www.sefaria.org/Sanhedrin.65b.16"
      },
      {
        "category": "historical",
        "title": "Jacques de Vaucanson, \"An Account of the Mechanism of an Automaton\" (London, 1742)",
        "excerpt": "Together with a description of an artificial duck, eating, drinking, macerating the food, and voiding excrements; pluming her wings, picking her feathers, and performing several operations in imitation of a living duck.",
        "source": "Internet Archive",
        "href": "https://archive.org/details/b30358711"
      },
      {
        "category": "literary",
        "title": "Mary Shelley, \"Frankenstein; or, The Modern Prometheus,\" Chapter 10 (1831)",
        "excerpt": "Every where I see bliss, from which I alone am irrevocably excluded. I was benevolent and good; misery made me a fiend. Make me happy, and I shall again be virtuous.",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/Frankenstein,_or_the_Modern_Prometheus_(Revised_Edition,_1831)/Chapter_10"
      },
      {
        "category": "literary",
        "title": "Carlo Collodi, \"The Adventures of Pinocchio,\" Chapter 36 (1883; Eng. trans. 1904)",
        "excerpt": "How funny I was when I was a marionette! and how happy I am now that I have become a real live boy!",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Adventures_of_Pinocchio_(1904)/Chapter_36"
      },
      {
        "category": "artistic",
        "title": "Jean-Léon Gérôme, \"Pygmalion and Galatea,\" oil on canvas (c. 1890), Metropolitan Museum of Art",
        "excerpt": "The ivory seemed to soften at the touch, and its firm texture yielded to his hand, as honey-wax of Mount Hymettus turns to many shapes when handled in the sun... Now real, true to life— the maiden felt the kisses given to her, and blushing, lifted up her timid eyes, so that she saw the light and sky above, as well as her rapt lover while he leaned gazing beside her.",
        "source": "Wikimedia Commons / The Met",
        "href": "https://commons.wikimedia.org/wiki/File:WLA_metmuseum_Jean-Leon_Gerome_Pygmalion_and_Galatea.jpg",
        "image": {
          "src": "/covers/klara-and-the-sun-trailer-arrives--a4.png",
          "alt": "Gérôme, “Pygmalion and Galatea”",
          "credit": "Wikimedia Commons (The Metropolitan Museum of Art)"
        }
      },
      {
        "category": "artistic",
        "title": "The beloved automaton Olympia — source of Delibes's ballet \"Coppélia\" (1870); after E.T.A. Hoffmann, \"The Sand-Man\" (1816)",
        "excerpt": "And it was only when at last Nathanael rose and kissed her lips or her hand that she said, \"Ach! Ach!\" and then \"Good-night, dear.\" Arrived in his own room, Nathanael would break out with, \"Oh! what a brilliant—what a profound mind! Only you—you alone understand me.\"",
        "source": "Project Gutenberg Australia",
        "href": "https://gutenberg.net.au/ebooks06/0605791h.html"
      }
    ],
    "edition": "Morning Edition · 24 June 2026"
  },
  {
    "slug": "aaltos-paimio-sanatorium-to-become-a-hotel",
    "headline": "Aalto’s Paimio Sanatorium will be converted into a hotel by Snøhetta",
    "overview": "Alvar and Aino Aalto's Paimio Sanatorium, a landmark of healing modernism designed down to the patients' basins, will be converted into a hotel by Snøhetta. A building made to mend the sick will now be asked to rest the well.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Dezeen",
        "href": "https://www.dezeen.com/2026/06/23/aaltos-paimio-sanatorium-set-to-be-turned-into-future-oriented-hotel-by-snohetta/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-23",
    "image": {
      "src": "/covers/aaltos-paimio-sanatorium-to-become-a-hotel.png",
      "alt": "A white modernist sanatorium among pines",
      "credit": "Wikimedia Commons"
    },
    "rank": 37,
    "analogies": [
      {
        "category": "historical",
        "title": "Augustus J. C. Hare on the Baths of Diocletian remade as a church (Walks in Rome, vol. II, 1874)",
        "excerpt": "Pius IV, declaring that angel-worship had never been sanctioned by the Church, except under the three names mentioned in Scripture, ordered the pictures of Del Duca to be taken away. At the same time he engaged Michael Angelo to convert the great oblong hall of the Baths (Calidarium) into a church.",
        "source": "Augustus J. C. Hare, Walks in Rome (Internet Archive)",
        "href": "https://archive.org/details/harewalksinrome02hare"
      },
      {
        "category": "historical",
        "title": "Francis Aidan Gasquet, \"Suppression of English Monasteries under Henry VIII\" (Catholic Encyclopedia, 1913)",
        "excerpt": "that what had been a monument of architectural beauty in the past was now a \"bare roofless choir, where late the sweet birds sang.\"",
        "source": "Catholic Encyclopedia (1913), Wikisource",
        "href": "https://en.wikisource.org/wiki/Catholic_Encyclopedia_(1913)/Suppression_of_English_Monasteries_under_Henry_VIII"
      },
      {
        "category": "literary",
        "title": "Thomas Mann, Der Zauberberg, Erster Band (1924), \"Ankunft\"",
        "excerpt": "Heimat und Ordnung lagen nicht nur weit zurück, sie lagen hauptsächlich klaftertief unter ihm, und noch immer stieg er darüber hinaus. [Homeland and order lay not only far behind, they lay above all fathoms-deep beneath him, and still he kept climbing higher above them — Hans Castorp ascending toward the mountain sanatorium, a world apart from the flatland below.]",
        "source": "Project Gutenberg (German, public domain)",
        "href": "https://www.gutenberg.org/ebooks/65661"
      },
      {
        "category": "literary",
        "title": "Frances Hodgson Burnett, The Secret Garden (1911), ch. XXI",
        "excerpt": "\"I shall get well! I shall get well!\" he cried out. \"Mary! Dickon! I shall get well! And I shall live forever and ever and ever!\"",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/ebooks/113"
      },
      {
        "category": "artistic",
        "title": "Photograph of Paimio Sanatorium amid its forest (Aino and Alvar Aalto, 1933; photo 2022)",
        "excerpt": "A distant view of the long white sanatorium set deep among pines — the building the Aaltos conceived as a medical instrument, sited apart from the world so that light, air, and silence might themselves do the curing. What was built to hold the tubercular now waits to hold the traveler; the world-apart endures, its purpose exchanged.",
        "source": "Wikimedia Commons (CC0)",
        "href": "https://commons.wikimedia.org/wiki/File:Paimio_sanatorium_covered_by_trees.jpg",
        "image": {
          "src": "/covers/aaltos-paimio-sanatorium-to-become-a-hotel--a4.png",
          "alt": "Paimio Sanatorium among the pines",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Caspar David Friedrich, The Abbey in the Oakwood (Abtei im Eichwald), oil on canvas, 1809–1810",
        "excerpt": "Through bare oaks a procession of monks bears a coffin toward the shattered Gothic arch of a ruined abbey, the last upright fragment of a place once built for prayer and now a roofless skeleton against a wintry sky. Friedrich turns a building made for the care of souls into an image of what time does to such places — the function gone, the architecture left to mean something new. It is the sanatorium's question rendered in paint: what becomes of a house raised for healing once the healing is over.",
        "source": "Alte Nationalgalerie, Berlin (Wikimedia Commons, public domain)",
        "href": "https://commons.wikimedia.org/wiki/File:Caspar_David_Friedrich_-_Abtei_im_Eichwald_-_Google_Art_Project.jpg"
      }
    ],
    "edition": "Morning Edition · 24 June 2026"
  },
  {
    "slug": "ballista-spider-builds-a-spring-loaded-trap",
    "headline": "Scientists discover an Australian spider that builds a spring-loaded trap",
    "overview": "Researchers in the far-north Queensland rainforest have described a new spider — nicknamed the “ballista,” after the ancient catapult — that stores elastic energy in its silk and flings a single species of aggressive green tree ant into its web. The mechanics, filmed with high-speed cameras, appear in the journal Current Biology.",
    "genre": "Science",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.com/news/articles/c70y138y995o"
      },
      {
        "name": "CNN",
        "href": "https://www.cnn.com/2026/06/23/science/ballista-spider-trap-ant"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-23",
    "image": {
      "src": "/covers/ballista-spider-builds-a-spring-loaded-trap.png",
      "alt": "A tiny spider beside its silk snare",
      "credit": "BBC"
    },
    "rank": 38,
    "analogies": [
      {
        "category": "historical",
        "title": "Walter Scott, Tales of a Grandfather, ch. VIII — Robert the Bruce and the spider (1828)",
        "excerpt": "The insect made the attempt again and again without success; and at length Bruce counted that it had tried to carry its point six times, and been as often unable to do so. It came into his head that he had himself fought just six battles against the English and their allies, and that the poor persevering spider was exactly in the same situation with himself, having made as many trials, and been as often disappointed in what it aimed at.",
        "source": "Internet Archive (Scott, Tales of a Grandfather)",
        "href": "https://archive.org/details/talesofgrandfath0001sirw"
      },
      {
        "category": "historical",
        "title": "Jean-Henri Fabre, The Life of the Spider, on the Narbonne Lycosa's burrow and ambush (trans. 1912)",
        "excerpt": "Hiding behind the wall, she sees the stranger advancing, keeps her eyes on him and suddenly pounces when he comes within reach. These abrupt tactics make the thing a certainty.",
        "source": "Project Gutenberg (Fabre, The Life of the Spider)",
        "href": "https://readingroo.ms/1/8/8/1887/1887-h/1887-h.htm"
      },
      {
        "category": "literary",
        "title": "Ovid, Metamorphoses VI — the transformation of Arachne (trans. Brookes More, 1922)",
        "excerpt": "Her slender fingers gathered to her sides as long thin legs; and all her other parts were fast absorbed in her abdomen—whence she vented a fine thread;—and ever since, Arachne, as a spider, weaves her web.",
        "source": "Perseus Digital Library (Tufts)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0028:book=6:card=129"
      },
      {
        "category": "literary",
        "title": "Mary Howitt, \"The Spider and the Fly\" (1829)",
        "excerpt": "The Spider turned him round about, and went into his den, / For well he knew the silly Fly would soon come back again; / So he wove a subtle web in a little corner sly, / And set his table ready to dine upon the Fly.",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Spider_and_the_Fly_(Weed)"
      },
      {
        "category": "artistic",
        "title": "Odilon Redon, \"The Smiling Spider\" (lithograph after the charcoal noir, 1881/1887)",
        "excerpt": "A bristling black orb of a body, perched on ten splayed legs, turns toward the viewer a broad human grin. Redon makes the ambusher genial: the thing that waits in the dark is given a face, and the face is pleased. The horror lies in its patience and its courtesy, the same lure the trapdoor offers the passerby.",
        "source": "Wikimedia Commons (Musée du Louvre)",
        "href": "https://commons.wikimedia.org/wiki/File:Redon_smiling-spider.jpg",
        "image": {
          "src": "/covers/ballista-spider-builds-a-spring-loaded-trap--a4.png",
          "alt": "Odilon Redon, “The Smiling Spider”",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Diego Velázquez, \"Las Hilanderas (The Fable of Arachne)\", oil on canvas (c. 1655–1660, Museo del Prado)",
        "excerpt": "In the dim foreground women card and spin, a wheel blurred to a haze of spokes by the speed of the work; behind them, lit like a stage, the contest of mortal and goddess plays out before a woven tapestry. Velázquez folds the whole myth into a workshop—the labor of the thread and the doom it courts in one room. The weaver is at once artisan and quarry, her diligence the very thing that traps her.",
        "source": "Wikimedia Commons (Museo del Prado)",
        "href": "https://commons.wikimedia.org/wiki/File:Velazquez-las_hilanderas.jpg"
      }
    ],
    "edition": "Morning Edition · 24 June 2026"
  },
  {
    "slug": "brexit-ten-years-on",
    "headline": "Britain marks ten years since the Brexit referendum",
    "overview": "A decade on from the referendum that took Britain out of the European Union, the anniversary brought fresh reckonings with what was promised and what arrived. The argument that was supposed to be settled by a single vote has outlived it.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Kottke",
        "href": "https://kottke.org/26/06/0049189-brexit-vote-10-years-on"
      },
      {
        "name": "Al Jazeera",
        "href": "https://www.aljazeera.com/news/2026/6/23/brexit-10-years-on-what-has-changed-in-the-uk-explained-in-maps-and-charts"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-23",
    "image": {
      "src": "/covers/brexit-ten-years-on.png",
      "alt": "A divided union, ten years on",
      "credit": "Al Jazeera"
    },
    "rank": 39,
    "analogies": [
      {
        "category": "historical",
        "title": "Norwegian referendum on the dissolution of the union with Sweden (13 August 1905)",
        "excerpt": "Voters were asked whether they approved the \"already completed dissolution of the union\" — \"den stedfundne Opløsning af Unionen.\" The result was 368,208 in favour to 184 against: 99.95 percent for the parting, 0.05 percent against. A union of nearly a century was undone by a single ballot, and what looked at the time like a clean break opened a long negotiation over crown, borders, and the terms of separate life.",
        "source": "1905 union dissolution referendum",
        "href": "https://en.wikipedia.org/wiki/1905_Norwegian_union_dissolution_referendum"
      },
      {
        "category": "historical",
        "title": "Livy, Ab Urbe Condita, Book 2.32 — the First Secession of the Plebs and Menenius Agrippa's fable (c. 494 BC; Foster trans., 1919)",
        "excerpt": "\"In the days when man's members did not all agree amongst themselves, as is now the case, but had each its own ideas and a voice of its own, the other parts thought it unfair that they should have the worry and the trouble and the labour of providing everything for the belly, while the belly remained quietly in their midst with nothing to do but to enjoy the good things which they bestowed upon it.\" Resolving to starve it, the limbs starved themselves, \"and the whole body were reduced to the utmost weakness.\"",
        "source": "Livy, History of Rome (Perseus)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.02.0151%3Abook%3D2%3Achapter%3D32"
      },
      {
        "category": "literary",
        "title": "Aesop, \"The Bundle of Sticks\" (Jacobs translation, The Fables of Æsop)",
        "excerpt": "An old man on the point of death summoned his sons around him to give them some parting advice. He ordered his servants to bring in a faggot of sticks, and said to his eldest son: \"Break it.\" The son strained and strained, but with all his efforts was unable to break the Bundle. \"Untie the faggots,\" said the father, \"and each of you take a stick.\" When they had done so, he called out to them: \"Now, break,\" and each stick was easily broken. The moral: \"Union gives strength.\"",
        "source": "Aesop's Fables (Wikisource)",
        "href": "https://en.wikisource.org/wiki/The_Fables_of_%C3%86sop_(Jacobs)/The_Bundle_of_Sticks"
      },
      {
        "category": "literary",
        "title": "William Shakespeare, King Lear, Act 1, Scene 1 (c. 1606)",
        "excerpt": "\"Know that we have divided / In three our kingdom, and 'tis our fast intent / To shake all cares and business from our age, / Conferring them on younger strengths, while we / Unburdened crawl toward death.\" The realm is parted in a single afternoon on a flush of promises; the long aftermath is storm, exile, and a king who learns too late what the dividing line has cost.",
        "source": "King Lear (Folger Shakespeare)",
        "href": "https://www.folger.edu/explore/shakespeares-works/king-lear/read/1/1/"
      },
      {
        "category": "artistic",
        "title": "Jacob Jordaens (after Rubens), The Golden Apple of Discord / The Wedding of Thetis and Peleus, oil on canvas, c. 1633",
        "excerpt": "Into a wedding feast of the gods, Discord rolls a single golden apple inscribed \"to the fairest,\" and the goddesses fall to quarreling — the small, vain choice from which, the myth insists, a ten-year war and the ruin of a city would follow. Jordaens crowds the canvas with finery and gesture, the gleaming apple already loose among the guests: the seed of division dropped, lightly, at the very moment of supposed union.",
        "source": "Wikimedia Commons (public domain)",
        "href": "https://commons.wikimedia.org/wiki/File:Golden_Apple_of_Discord_by_Jacob_Jordaens.jpg",
        "image": {
          "src": "/covers/brexit-ten-years-on--a4.png",
          "alt": "Jordaens, “The Golden Apple of Discord”",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Friedrich Schiller, \"An die Freude\" (Ode to Joy), 1785 — set by Beethoven and adopted as the Anthem of Europe",
        "excerpt": "\"Deine Zauber binden wieder, / Was die Mode streng getheilt; / Alle Menschen werden Brüder, / Wo dein sanfter Flügel weilt.\" — \"Your magic binds again what custom strictly parted; all men become brothers where your gentle wing alights.\" The verses Europe chose for its anthem, sung wordlessly at every union ceremony, make a quiet irony of any nation that chooses, instead, to be parted again.",
        "source": "Schiller, An die Freude (Wikisource)",
        "href": "https://de.wikisource.org/wiki/An_die_Freude_(Schiller)"
      }
    ],
    "edition": "Morning Edition · 24 June 2026"
  }
];

// --- Helpers ---

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
