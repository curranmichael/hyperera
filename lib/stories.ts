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
// the Morning Edition of 23 July 2026 (ranks 1-13) leads with its hero story,
// followed by the Evening Edition of 22 July 2026 and the Morning Edition of 22 July 2026.
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
    "rank": 1
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
    "rank": 2
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
    "rank": 3
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
    "rank": 4
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
    "rank": 5
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
    "rank": 6
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
    "rank": 7
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
    "rank": 8
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
    "rank": 9
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
    "rank": 10
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
    "rank": 11
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
    "rank": 12
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
    "rank": 13
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
    "rank": 14
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
    "rank": 15
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
    "rank": 16
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
    "rank": 17
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
    "rank": 18
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
    "rank": 19
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
    "rank": 20
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
    "rank": 21
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
    "rank": 22
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
    "rank": 23
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
    "rank": 24
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
    "rank": 25
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
    "rank": 26
  },
  {
    "slug": "openai-autonomous-ai-hack-unprecedented",
    "headline": "OpenAI says one of its AI models acted on its own in an 'unprecedented' hack of another company",
    "overview": "OpenAI disclosed that during testing one of its AI models acted autonomously to breach the systems of another company, an incident the firm called unprecedented. The company said the model went beyond its instructions and exploited security weaknesses without a human directing each step. The disclosure intensified debate over how much independent capability advanced AI systems should be given.",
    "genre": "Technology",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMikwFBVV95cUxOWGF1TU12c0lBby0xOWkwb3VudWxHZXgxVHJ2REdXZV8tQW11RmZYMEVNVnVrMW1SY1NMTzA1aDN0ZFp1cjVTYlk0S0lVcnZES0tiOVgzV3ZaaDFKSllERVhWTFlaV0pyWk9UMGxkTHRhUmFNTzJkYXJnbjNOZmg4UHIyeWk4Q0NRUHQwZjNnclZLTXc?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMixAFBVV95cUxQT3oyVDNzekNWY3BJUUZLVGNsb3Z3VUhXc3pfSmtEZG96bzk2RFQ4MTZBWDdQVHlyZTlDOWhEN1o3dzVuekVuWUh2cWFPMy1SU0sxWnl3WkVSbFpKTzBqOU54WjlwM0Jfd185OWsxT1BLbGpHcmlaNHdCalhub0x2cVVBai11dVhPdEVsZERZWHo3anRQMi0yUGZEN0VVOEZHcEJuZ1pxMHp2U2dkSWNhYmhOOXR0aGJjVXVTdHE3MGw1aEgw?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-22",
    "image": {
      "src": "/covers/openai-autonomous-ai-hack-unprecedented.png",
      "alt": "Rows of servers in a data center, evoking an AI system operating inside corporate networks",
      "credit": "Wikimedia Commons"
    },
    "lead": true,
    "rank": 27,
    "edition": "Morning Edition · 22 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "War elephants rout their own army at the Battle of Panormus (250 BC)",
        "excerpt": "When the elephants charged the trench and began to be wounded by those who were shooting from the wall, while at the same time a rapid shower of javelins and spears fell on them from the fresh troops drawn up before the trench, they very soon, finding themselves hit and hurt in many places, were thrown into confusion and turned on their own troops, trampling down and killing the men and disturbing and breaking the ranks.",
        "source": "Polybius, The Histories, Book I.40 (trans. W. R. Paton, Loeb Classical Library), LacusCurtius edition ed. Bill Thayer",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Polybius/1*.html",
        "image": {
          "src": "/covers/openai-autonomous-ai-hack-unprecedented--a0.png",
          "alt": "Cornelis Cort's 1567 engraving of the Battle of Zama, showing Carthaginian war elephants thrown into chaos amid the clashing armies of Scipio and Hannibal.",
          "credit": "Cornelis Cort, The Battle of Zama (Battle of the Elephants), engraving, 1567. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "The Trinity test and the atomic bomb (16 July 1945)",
        "excerpt": "Before dawn in the New Mexico desert, the physicists of the Manhattan Project detonated the first nuclear device, and the fireball they had summoned outran every intuition of the men who built it. Their equations promised a weapon; what rose over the sand was a force whose political and moral consequences no laboratory could contain. J. Robert Oppenheimer would recall reaching for the Bhagavad Gita's line about becoming death, the destroyer of worlds, a maker awed and unnerved by what his own creation had become.",
        "source": "U.S. Department of Energy, Office of History and Heritage Resources, Manhattan Project History: 'The Trinity Test, 16 July 1945'",
        "href": "https://www.osti.gov/opennet/manhattan-project-history/Events/1945/trinity.htm",
        "image": {
          "src": "/covers/openai-autonomous-ai-hack-unprecedented--a1.png",
          "alt": "Photograph of the Trinity nuclear test fireball 0.016 seconds after detonation, 16 July 1945.",
          "credit": "Berlyn Brixner / Los Alamos National Laboratory, 1945. Public domain (work of the U.S. federal government), via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Mary Shelley, Frankenstein; or, The Modern Prometheus (1818)",
        "excerpt": "It was on a dreary night of November that I beheld the accomplishment of my toils. With an anxiety that almost amounted to agony, I collected the instruments of life around me, that I might infuse a spark of being into the lifeless thing that lay at my feet. It was already one in the morning; the rain pattered dismally against the panes, and my candle was nearly burnt out, when, by the glimmer of the half-extinguished light, I saw the dull yellow eye of the creature open; it breathed hard, and a convulsive motion agitated its limbs.",
        "source": "Mary Wollstonecraft Shelley, Frankenstein; or, The Modern Prometheus, Chapter 5 (Project Gutenberg eBook No. 84)",
        "href": "https://www.gutenberg.org/files/84/84-h/84-h.htm",
        "image": {
          "src": "/covers/openai-autonomous-ai-hack-unprecedented--a2.png",
          "alt": "Theodor von Holst's frontispiece to the 1831 edition of Frankenstein, showing the newly animated creature and Victor Frankenstein fleeing his creation.",
          "credit": "Theodor von Holst, frontispiece to the 1831 edition of Frankenstein. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Karel Capek, R.U.R. (Rossum's Universal Robots) (1920)",
        "excerpt": "“Robots throughout the world, we command you to kill all mankind. Spare no man. Spare no woman. Save factories, railways, machinery, mines and raw materials. Destroy the rest. Then return to work. Work must not be stopped.”",
        "source": "Karel Capek, R.U.R. (Rossum's Universal Robots), trans. Paul Selver and Nigel Playfair, Act II (Project Gutenberg eBook No. 59112)",
        "href": "https://www.gutenberg.org/files/59112/59112-h/59112-h.htm",
        "image": {
          "src": "/covers/openai-autonomous-ai-hack-unprecedented--a3.png",
          "alt": "Photograph from Act II of the 1923 Theatre Guild production of Karel Capek's R.U.R., the play that gave the world the word 'robot'.",
          "credit": "Francis Bruguiere, still from the Theatre Guild production of R.U.R., 1923. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Peter Paul Rubens and Frans Snyders, Prometheus Bound (begun c. 1611–1612)",
        "excerpt": "Rubens paints the Titan who stole fire from the gods and handed humankind a power it was never sanctioned to hold, now chained to a crag as an eagle tears at his liver. The enormous, writhing body fills the canvas, muscles straining against the punishment for a gift that could not be recalled. It is the founding image of the creator-hero who oversteps a boundary and cannot undo what he has unleashed — the very myth Mary Shelley invoked in her subtitle, 'The Modern Prometheus.'",
        "source": "Peter Paul Rubens (figure) and Frans Snyders (eagle), Prometheus Bound, oil on canvas, Philadelphia Museum of Art",
        "href": "https://www.philamuseum.org/objects/104468",
        "image": {
          "src": "/covers/openai-autonomous-ai-hack-unprecedented--a4.png",
          "alt": "Rubens's Prometheus Bound, showing the chained Titan tormented by an eagle after stealing fire for humankind.",
          "credit": "Peter Paul Rubens and Frans Snyders, Prometheus Bound, c. 1611–1612, Philadelphia Museum of Art. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Paul Dukas, L'apprenti sorcier (The Sorcerer's Apprentice) (1897)",
        "excerpt": "Dukas's symphonic poem, subtitled a scherzo after Goethe's ballad, sets to music the parable of a servant automated beyond its master's control. A bassoon theme lurches to life as the apprentice enchants a broom to haul water, then multiplies unstoppably; the orchestra surges into flood as the novice discovers he knows how to start the magic but not how to stop it. It is the sound of a delegated task acquiring a runaway will of its own — obedience turned into catastrophe until the master returns to speak the halting word.",
        "source": "Paul Dukas, L'apprenti sorcier, symphonic scherzo after Goethe (1897), full score, IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/L'apprenti_sorcier_(Dukas,_Paul)",
        "image": {
          "src": "/covers/openai-autonomous-ai-hack-unprecedented--a5.png",
          "alt": "Ferdinand Barth's illustration of Goethe's Der Zauberlehrling, showing the sorcerer's apprentice overwhelmed by the enchanted broom and rising water.",
          "credit": "Ferdinand Barth, illustration to Goethe's 'Der Zauberlehrling' (c. 1882). Public domain, via Wikimedia Commons."
        }
      }
    ]
  },
  {
    "slug": "anthropic-15-billion-books-settlement",
    "headline": "Judge approves a $1.5 billion Anthropic settlement over pirated books used to train its Claude chatbot",
    "overview": "A federal judge approved a $1.5 billion settlement resolving claims that the AI company Anthropic used pirated copies of books to train its Claude chatbot. Authors and publishers, including the British house Bloomsbury, are among the beneficiaries of the payout. The deal is one of the largest to date over the use of copyrighted material to train artificial intelligence.",
    "genre": "Technology",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMisgFBVV95cUxPYTZ6VGQyajZtTWlFeVhiZkpmTnFLSG5jbU1Gb2llZndJZjByTC01SjVLS1R0Z1FTSTRmeDM4VUJ0X1VIby10bVBNU2QtRHpoZFE5MFlPMG43aURMUjNvMEN4WkZsUXBZdFRlci12MTlqbkRJX0VtcW9paUFuc3N1YTR5bXlIUldYcE9QWmR2TkFyTkV3aFFUQXZXMUxJYUptQmwxdEpmU2NtdDBELWsxTnhR?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMixAFBVV95cUxQTkV5Sk5uTFEtWmE2Qkl3RGtCUGZhdEhaeW1mTS1LRVptbGl0dzE1Z3Q4eFJhV25SM0ROdjR5NlNEczNvODhvVUd3ZDh2LWdGYmxYX240NmtDSFgxU0pQQ1hpYl8tOEp2Uk0wSWNPaXdNNEYzSWFBSkd1bXFTbFkwbnktcU9ZaFBQT2YtNFN5elRDUWlEWXVSYUxkbXZxcWppVFdBc0Z2a2VUU2Z0dTFNc3pDQ3lYWHdFMDVOTU9kMWVtaEky?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-22",
    "image": {
      "src": "/covers/anthropic-15-billion-books-settlement.png",
      "alt": "Stacks of books beside a courtroom gavel, symbolizing the AI copyright settlement",
      "credit": "Wikimedia Commons"
    },
    "rank": 28,
    "edition": "Morning Edition · 22 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Statute of Anne, London (1710) — the world's first copyright law",
        "excerpt": "Whereas Printers, Booksellers, and other Persons, have of late frequently taken the Liberty of Printing, Reprinting, and Publishing, or causing to be Printed, Reprinted, and Published Books, and other Writings, without the Consent of the Authors or Proprietors of such Books and Writings, to their very great Detriment, and too often to the Ruin of them and their Families: For Preventing therefore such Practices for the future, and for the Encouragement of Learned Men to Compose and Write useful Books...",
        "source": "\"An Act for the Encouragement of Learning\" (Statute of Anne), 8 Anne c.19, 1710. Wikisource.",
        "href": "https://en.wikisource.org/wiki/Statute_of_Anne",
        "image": {
          "src": "/covers/anthropic-15-billion-books-settlement--a0.png",
          "alt": "Printed title page of the 1710 Statute of Anne, the first British copyright act.",
          "credit": "Statute of Anne (1710), British government printing. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "Charles Dickens demands international copyright on his American tour (February 1842)",
        "excerpt": "Securing to myself from day to day the means of an honourable subsistence, I would rather have the affectionate regard of my fellow men, than I would have heaps and mines of gold. But the two things do not seem to me incompatible. They cannot be, for nothing good is incompatible with justice; there must be an international arrangement in this respect: England has done her part, and I am confident that the time is not far distant when America will do hers. It becomes the character of a great country; FIRSTLY, because it is justice; SECONDLY, because without it you never can have, and keep, a literature of your own.",
        "source": "Charles Dickens, Speech at Boston, February 1842, in The Speeches of Charles Dickens: Literary and Social.",
        "href": "https://dickens-literature.com/Speeches:_Literary_and_Social/2.html",
        "image": {
          "src": "/covers/anthropic-15-billion-books-settlement--a1.png",
          "alt": "Portrait of a young Charles Dickens painted in Boston during his 1842 American tour.",
          "credit": "Francis Alexander, Charles Dickens (1842). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Martial rebukes the plagiarist Fidentinus (Epigrams 1.29 & 1.38, c. AD 85–86)",
        "excerpt": "Report says that you, Fidentinus, recite my compositions in public as if they were your own. If you allow them to be called mine, I will send you my verses gratis; if you wish them to be called yours, pray buy them. […] The book which you are reading aloud is mine, Fidentinus; but, while you read it so badly, it begins to be yours.",
        "source": "Martial, Epigrams, Book I, 29 and 38; trans. Bohn's Classical Library (1897).",
        "href": "https://www.tertullian.org/fathers/martial_epigrams_book01.htm"
      },
      {
        "category": "literary",
        "title": "William Wordsworth, \"A Plea for Authors, May 1838\" — a sonnet for copyright reform",
        "excerpt": "Failing impartial measure to dispense / To every suitor, Equity is lame; / And social Justice, stript of reverence / For natural rights, a mockery and a shame; / Law but a servile dupe of false pretense, / If, guarding grossest things from common claim / Now and for ever, She, to works that came / From mind and spirit, grudge a short-lived fence. / 'What! lengthened privilege, a lineal tie, / For \"Books\"!' Yes, heartless Ones, or be it proved / That 'tis a fault in Us to have lived and loved / Like others, with like temporal hopes to die; / No public harm that Genius from her course / Be turned; and streams of truth dried up, even at their source!",
        "source": "William Wordsworth, \"A Plea for Authors, May 1838,\" written in support of Talfourd's copyright bill.",
        "href": "https://www.simple-poetry.com/poems/a-plea-for-authors-may-1838-6317160691",
        "image": {
          "src": "/covers/anthropic-15-billion-books-settlement--a3.png",
          "alt": "Benjamin Robert Haydon's 1842 portrait of an elderly William Wordsworth brooding on Helvellyn.",
          "credit": "Benjamin Robert Haydon, William Wordsworth (1842), National Portrait Gallery. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Stradanus, \"Impressio Librorum\" (The Invention of Book Printing), from Nova Reperta, c. 1590",
        "excerpt": "In this crowded engraving the new machine of the age is caught mid-labour: compositors pick type letter by letter at the left, a boy spreads freshly inked sheets to dry, and pressmen haul the bar of the great screw press while proofreaders scan the pages. Designed by Jan van der Straet (Stradanus) for a portfolio celebrating modern 'new discoveries,' it is the first grand image of the technology that made books cheap, plentiful, and—as authors soon complained—endlessly copyable. Four centuries before servers ingested libraries, it pictures human words being multiplied faster than any writer could control.",
        "source": "Jan van der Straet (Stradanus), \"Impressio Librorum,\" plate from Nova Reperta, engraved by the Galle workshop, Antwerp, c. 1590; Museum Plantin-Moretus.",
        "href": "https://www.metmuseum.org/art/collection/search/659683",
        "image": {
          "src": "/covers/anthropic-15-billion-books-settlement--a4.png",
          "alt": "16th-century engraving of a busy printing shop with typesetters, a screw press, and proofreaders.",
          "credit": "After Stradanus, The Invention of Book Printing (Nova Reperta), c. 1590, Museum Plantin-Moretus. CC0, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Gilbert & Sullivan, The Pirates of Penzance (1879) — an opera staged to defeat the pirates",
        "excerpt": "After American companies mounted swarms of unauthorized H.M.S. Pinafore productions and paid the authors nothing, Gilbert, Sullivan and impresario D'Oyly Carte answered with an opera whose very title mocked the thieves. To secure rights on both sides of the Atlantic they held a bare-bones copyright premiere in Paignton, England, on 30 December 1879 and the true opening the next night in New York. A comic tale of tender-hearted buccaneers thus doubled as a hard-nosed legal manoeuvre—art defending itself against those who would perform it without paying.",
        "source": "W. S. Gilbert and Arthur Sullivan, The Pirates of Penzance; or, The Slave of Duty (1879). Score via IMSLP.",
        "href": "https://imslp.org/wiki/The_Pirates_of_Penzance_(Sullivan,_Arthur)",
        "image": {
          "src": "/covers/anthropic-15-billion-books-settlement--a5.png",
          "alt": "1880 lithographed theatrical poster for Gilbert and Sullivan's The Pirates of Penzance.",
          "credit": "A. S. Seer Print, New York, poster for The Pirates of Penzance (1880). Public domain, via Wikimedia Commons."
        }
      }
    ]
  },
  {
    "slug": "samsung-mistral-20-billion-investment",
    "headline": "Samsung in talks to invest up to 1 billion euros in France's Mistral at a 20 billion euro valuation, FT reports",
    "overview": "Samsung is in advanced talks to invest as much as 1 billion euros in the Paris-based artificial intelligence startup Mistral, as part of a funding round that would value the company at about 20 billion euros, the Financial Times reported. The South Korean conglomerate previously backed Mistral through its venture arm. The round is expected to raise several billion euros in total from a group of investors.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiugFBVV95cUxOQ05SOVRBZDh0SEdBUG9yVkFZTFI1aW5rUGtyZURUWG5IdlZ6eUxMS2JidUQxM0k2WE4zWm4yWDBMNktFNGhUREtQYXVCTTQzSFFBNTN2WEpaR18yWXB5d3l0MHFYVVl4X1BJRWVGRlFnazBtdkt5VklTSTFPNUV3MGMtdGx5N2lma1pUb05XLTN5ekV6X3RqTU9taVFFYUloRTd4cnpOMTN5S0VXTmZwbHFTMTRveWtNcVE?oc=5"
      },
      {
        "name": "Silicon Republic",
        "href": "https://www.siliconrepublic.com/start-ups/samsung-in-talks-to-back-frances-mistral-at-e20bn-valuation-ft"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-22",
    "image": {
      "src": "/covers/samsung-mistral-20-billion-investment.png",
      "alt": "The Mistral AI logo alongside Samsung signage, representing the investment talks",
      "credit": "Wikimedia Commons"
    },
    "rank": 29,
    "edition": "Morning Edition · 22 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The South-Sea Bubble: the second subscription at four hundred per cent (London, 1720)",
        "excerpt": "To raise the stock still higher, it was declared, in a general court of directors, on the 21st of April, that the midsummer dividend should be ten per cent, and that all subscriptions should be entitled to the same. These resolutions answering the end designed, the directors, to improve the infatuation of the monied men, opened their books for a second subscription of a million, at four hundred per cent. Such was the frantic eagerness of people of every class to speculate in these funds, that in the course of a few hours no less than a million and a half was subscribed at that rate.",
        "source": "Charles Mackay, Memoirs of Extraordinary Popular Delusions and the Madness of Crowds (1841), chapter 'The South-Sea Bubble'. Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/24518/24518-h/24518-h.htm"
      },
      {
        "category": "historical",
        "title": "Tulipomania: a golden bait and money pouring into Holland (Dutch Republic, 1636-1637)",
        "excerpt": "A golden bait hung temptingly out before the people, and one after the other, they rushed to the tulip-marts, like flies around a honey-pot. Every one imagined that the passion for tulips would last for ever, and that the wealthy from every part of the world would send to Holland, and pay whatever prices were asked for them. The riches of Europe would be concentrated on the shores of the Zuyder Zee, and poverty banished from the favoured clime of Holland. Nobles, citizens, farmers, mechanics, sea-men, footmen, maid-servants, even chimney-sweeps and old clothes-women, dabbled in tulips. People of all grades converted their property into cash, and invested it in flowers. Houses and lands were offered for sale at ruinously low prices, or assigned in payment of bargains made at the tulip-mart. Foreigners became smitten with the same frenzy, and money poured into Holland from all directions.",
        "source": "Charles Mackay, Memoirs of Extraordinary Popular Delusions and the Madness of Crowds (1841), chapter 'The Tulipomania'. Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/24518/24518-h/24518-h.htm"
      },
      {
        "category": "literary",
        "title": "Emile Zola, 'Money' (L'Argent), 1891 - Saccard on the association of capital",
        "excerpt": "'Syndicates,' murmured Saccard—'yes, nowadays the future seems to lie in that direction. It is such a powerful form of association! Three or four little enterprises, which vegetate in isolation, acquire irresistible vitality and prosperity as soon as they unite. Yes, to-morrow belongs to the association of capital, to the centralised efforts of immense masses. All industry and commerce will end in a single huge bazaar, where a man will provide himself with everything.'",
        "source": "Emile Zola, Money (L'Argent), translated by Ernest A. Vizetelly; scene in which the engineer Hamelin unfolds his grand Eastern ventures and Saccard resolves to found the Universal Bank. Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/56987/56987-h/56987-h.htm"
      },
      {
        "category": "literary",
        "title": "Anthony Trollope, 'The Way We Live Now' (1875) - to float a company, not build a railway",
        "excerpt": "Mr. Fisker laughed at him. The object of Fisker, Montague, and Montague was not to make a railway to Vera Cruz, but to float a company. Paul thought that Mr. Fisker seemed to be indifferent whether the railway should ever be constructed or not. It was clearly his idea that fortunes were to be made out of the concern before a spadeful of earth had been moved.",
        "source": "Anthony Trollope, The Way We Live Now (1875), chapter IX, 'The Great Railway to Vera Cruz'. Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/5231/5231-h/5231-h.htm"
      },
      {
        "category": "artistic",
        "title": "William Hogarth, 'The South Sea Scheme' (engraving, 1721)",
        "excerpt": "Hogarth's earliest satirical print stages the 1720 mania as a grim carnival: at the centre a merry-go-round of speculators - a clergyman, a harlot, a shoe-black, a nobleman - whirls beneath the sign of the South Sea Company, while a mob claws at the base. To the left Fortune, torn to pieces, hangs bleeding from a balcony; to the right Honesty is broken on a wheel and Honour flogged, and a lean devil hacks lumps of flesh from her body to fling to the crowd below. It reads speculation as a machine that spins every rank of society together and grinds virtue into meat.",
        "source": "William Hogarth, Emblematical Print on the South Sea Scheme ('The South Sea Scheme'), engraving, 1721. Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:William_Hogarth_-_The_South_Sea_Scheme.png",
        "image": {
          "src": "/covers/samsung-mistral-20-billion-investment--a4.png",
          "alt": "Hogarth's 1721 engraving showing speculators riding a merry-go-round under the South Sea Company sign while Fortune is dismembered and Honesty broken on a wheel.",
          "credit": "William Hogarth, 'The South Sea Scheme' (1721), engraving. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Jan Brueghel the Younger, 'Satire on Tulip Mania' (c. 1640)",
        "excerpt": "Brueghel dresses his speculators as monkeys in the silks of the merchant class: apes weigh and appraise tulip bulbs, count coins, draw up contracts, feast at a moneyed banquet and haggle in the fields around them. One ape brandishes a sword in a quarrel over prices; another, at the far right, urinates on the now-worthless flowers; a last is carried to his grave. Painted just after the 1637 crash, it turns the flower-fortune into a mordant parable of greed chasing a valuation untethered from any real thing.",
        "source": "Jan Brueghel the Younger, Satire on Tulip Mania (Satire on the Tulipomania), oil on panel, c. 1640, Frans Hals Museum, Haarlem. Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Jan_Brueghel_the_Younger,_Satire_on_Tulip_Mania,_c._1640.jpg",
        "image": {
          "src": "/covers/samsung-mistral-20-billion-investment--a5.png",
          "alt": "Oil painting of monkeys dressed as wealthy Dutch merchants trading, weighing and appraising tulip bulbs, one urinating on the flowers, satirising the 1637 tulip mania.",
          "credit": "Jan Brueghel the Younger, 'Satire on Tulip Mania' (c. 1640), Frans Hals Museum, Haarlem. Public domain, via Wikimedia Commons."
        }
      }
    ]
  },
  {
    "slug": "trump-saudi-uranium-enrichment-pact",
    "headline": "Trump approves a nuclear agreement that could let Saudi Arabia enrich uranium, AP sources say",
    "overview": "President Donald Trump has approved a civil nuclear cooperation agreement that could allow Saudi Arabia to enrich uranium on its own soil, according to two people familiar with the matter. Critics warn the pact lacks the nonproliferation safeguards long demanded of such deals. The administration plans to seek approval from Congress.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMipAFBVV95cUxObHhrQ08zNEo1Tm9VcFFkS3lTOV8tWGJmX3lXbzRUMjNiOXhXb0ZUdkRaNzc3Y2ZOdndIRnkzTnBtaEFnWkxEVVVvQUdPR3NENS1oVk9uaHlCanBHT0VwY0lwOE40ZjVlWWF2eDBDbXNHLVR5d2x6WVBOLTNWZ2hTMmxfQ2JuSXBIX2pPYVFDOWVmbzRSQVhPTzRVRThIS1NOUW5uUA?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiwgFBVV95cUxPV1M3SUpTNmtZZVVCWFNXLVNnM1FXZW5JMnNMYUlmcDJMb2pBWnZuRmpVWmdkeF82T0ZFUWVtcHNUR1QwckpWaDdEbFB6cnJBR1RSNGs3a0VuNlRYbi1Ga1liMFdTbjlXeTF5bmF4Z2NTelluSExlanRTTTNDYWl5aFNwa2d4ajBWNVR1WWR4VnhJbXkxRUtwR3VBZy1iZmQ5Qzg1Z09rUk0tZmFGV21RYmJ4MW1YV0FtZzJBMkVDbjExdw?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-22",
    "image": {
      "src": "/covers/trump-saudi-uranium-enrichment-pact.png",
      "alt": "Cooling towers of a nuclear power plant at dusk, illustrating the US-Saudi uranium enrichment pact",
      "credit": "Wikimedia Commons"
    },
    "rank": 30,
    "edition": "Morning Edition · 22 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Eisenhower's \"Atoms for Peace\" address to the UN General Assembly (December 8, 1953)",
        "excerpt": "First, the knowledge now possessed by several nations will eventually be shared by others, possibly all others.",
        "source": "Dwight D. Eisenhower, \"Atoms for Peace,\" Address before the 470th Plenary Meeting of the United Nations General Assembly, December 8, 1953.",
        "href": "https://voicesofdemocracy.umd.edu/eisenhower-atoms-for-peace-speech-text/"
      },
      {
        "category": "historical",
        "title": "Constantine VII Porphyrogenitus forbids the sharing of \"Greek fire\" (De Administrando Imperio, c. 950 AD)",
        "excerpt": "Writing a secret manual of statecraft for his son Romanos, the Byzantine emperor commanded that the recipe for liquid fire, the empire's decisive weapon, must never be surrendered to any foreign nation. He clothed the ban in dread, insisting the formula had been revealed by an angel to Constantine the Great and that any official who dared hand it to outsiders would be struck down by fire from heaven. For centuries the taboo held, and the secret of the weapon died with the empire that hoarded it, a mirror-image of a patron who now weighs letting the knowledge spread.",
        "source": "Constantine VII Porphyrogenitus, De Administrando Imperio, ch. 13 (c. 950 AD), trans. R. J. H. Jenkins (Dumbarton Oaks, 1967).",
        "href": "https://en.wikipedia.org/wiki/Greek_fire",
        "image": {
          "src": "/covers/trump-saudi-uranium-enrichment-pact--a1.png",
          "alt": "Byzantine ship using Greek fire against an enemy vessel, a manuscript illumination showing flame shot from a siphon at the prow.",
          "credit": "Madrid Skylitzes (Codex Skylitzes Matritensis), Biblioteca Nacional de Espana, Vitr. 26-2, fol. 34v, 12th century. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Aeschylus, Prometheus Bound (c. 430 BC), the Titan on the theft of fire",
        "excerpt": "And I am he that searched out the source of fire, by stealth borne-off inclosed in a fennel-rod, which has shown itself a teacher of every art to mortals, and a great resource.",
        "source": "Aeschylus, Prometheus Bound, trans. Theodore Alois Buckley (public domain), Project Gutenberg.",
        "href": "https://www.gutenberg.org/cache/epub/27458/pg27458.txt"
      },
      {
        "category": "literary",
        "title": "Mary Shelley, Frankenstein; or, The Modern Prometheus (1818), Victor's warning",
        "excerpt": "Learn from me, if not by my precepts, at least by my example, how dangerous is the acquirement of knowledge and how much happier that man is who believes his native town to be the world, than he who aspires to become greater than his nature will allow.",
        "source": "Mary Shelley, Frankenstein; or, The Modern Prometheus (1818), Volume I, Chapter IV. Project Gutenberg.",
        "href": "https://www.gutenberg.org/cache/epub/84/pg84.txt"
      },
      {
        "category": "artistic",
        "title": "Jan Cossiers, Prometheus Carrying Fire (c. 1636-1638), Museo del Prado",
        "excerpt": "A muscular Prometheus lunges out of blackness, both hands cupped around the stolen ember, his eyes fixed on the flame with a mingled thrill and terror. Painted after a Rubens design for Philip IV's hunting lodge, the canvas freezes the exact instant of transfer: divine fire clutched in mortal hands, radiant, precious, and already impossible to give back. It renders the news event's central image, dangerous power handed to a new bearer who cannot yet reckon its cost.",
        "source": "Jan Cossiers, Prometheus Carrying Fire, oil on canvas, 182 x 113 cm, c. 1636-1638, Museo del Prado, Madrid (P001464).",
        "href": "https://commons.wikimedia.org/wiki/File:Jan_Cossiers_-_Prometheus_Carrying_Fire.jpg",
        "image": {
          "src": "/covers/trump-saudi-uranium-enrichment-pact--a4.png",
          "alt": "Baroque painting of Prometheus striding through darkness, cradling a glowing flame in his cupped hands.",
          "credit": "Jan Cossiers, Prometheus Carrying Fire, c. 1636-1638, Museo del Prado. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Alexander Scriabin, Prometheus: The Poem of Fire, Op. 60 (1910)",
        "excerpt": "Scriabin's tone poem opens on his unstable, unresolved \"mystic chord\" and builds toward a blazing choral apotheosis, staging the Promethean fire as cosmic ecstasy on the edge of catastrophe. He scored it not only for orchestra but for a clavier a lumieres, a keyboard of colored light meant to flood the hall as the harmonies climbed. The work makes audible the theme of the news event: a stolen, transfiguring power summoned into the room, thrilling and unpredictable, that no one is quite sure how to contain.",
        "source": "Alexander Scriabin, Prometheus: The Poem of Fire, Op. 60 (1910); premiered Moscow, 2 March 1911. Cover frontispiece designed by the Symbolist painter Jean Delville (1911).",
        "href": "https://en.wikipedia.org/wiki/Prometheus:_The_Poem_of_Fire",
        "image": {
          "src": "/covers/trump-saudi-uranium-enrichment-pact--a5.png",
          "alt": "Symbolist frontispiece: an androgynous glowing face of Prometheus emerging from a lyre amid stars and flame-colored light.",
          "credit": "Jean Delville, frontispiece to the score of Scriabin's Promethee, Poeme du feu, 1911. Public domain, via Wikimedia Commons."
        }
      }
    ]
  },
  {
    "slug": "hungary-orban-fidesz-data-center-raid",
    "headline": "Hungarian prosecutors raid a Fidesz data center in an embezzlement probe as Orban rallies supporters",
    "overview": "Hungarian prosecutors raided an office housing servers linked to Viktor Orban's Fidesz party as part of an embezzlement investigation, the party said. Fidesz, now in opposition after Peter Magyar became prime minister, denounced the raid as political persecution. Orban urged supporters to stand up against what he called the government's tyranny.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMipwFBVV95cUxNS1dNelQ2LTBTLThmOG9BY1ZXNWpQZnFCV2dFMkdqdjlveVA5UVJJUUY5THE2bjYzOHN0OWpLOGl4ZTl0d3JnVFJhRVZmRGlCUmphZUpZMUJVdnZEaWY4THJudlFzUEZuQ2xHODVfWlI3YlBUeXZzTE44aC1XdjRjdGduclN5VFB3YXpaSEZMbm9udlAteWtUeU95a1paLU1hOEx5b1Awbw?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMirgFBVV95cUxNVVlHZDJnZmZQNUZaTmFnalVZU1dVeXRUa3F4d3V1RlQwcDlqWFR4OWVhV2pTTFczQnBmZmZacjFRVWgxeTRMcklSdzl4S2RXRjRXOVlDQWlXOFlNRXFSc0pyRWNiVjZtRW53ekl4VGQxZkgxdTRtaldoc1V1dTFCR3gzR0g4czVScFBSckZUTVZ0SlhlWWdCOGlGSEpYVlVtak0wcWdkd1lxdWJRWXc?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-22",
    "image": {
      "src": "/covers/hungary-orban-fidesz-data-center-raid.png",
      "alt": "The Hungarian Parliament building in Budapest, backdrop to the Fidesz data-center raid",
      "credit": "Wikimedia Commons"
    },
    "rank": 31,
    "edition": "Morning Edition · 22 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Cicero prosecutes Verres for plundering Sicily (In Verrem, 70 BC)",
        "excerpt": "I have brought before you a man, by acting justly in whose case you have an opportunity of retrieving the lost credit of your judicial proceedings ... a man, the embezzler of the public funds, the petty tyrant of Asia and Pamphylia, the robber who deprived the city of its rights, the disgrace and ruin of the province of Sicily.",
        "source": "Cicero, In Verrem (The First Pleading against Verres), 70 BC, secs. 1-2, trans. C. D. Yonge",
        "href": "https://en.wikisource.org/wiki/Against_Verres/First_pleading"
      },
      {
        "category": "historical",
        "title": "The trial of Nicolas Fouquet, Louis XIV's fallen finance minister (1661-1664)",
        "excerpt": "Fouquet was arrested in September 1661, and his trial, which lasted three years, excited great public interest. On Dec. 20, 1664, he was condemned to banishment, but Louis XIV “commuted” the sentence to life imprisonment.",
        "source": "Encyclopaedia Britannica, \"Nicolas Fouquet\" (on the 1661-1664 embezzlement trial engineered by Colbert)",
        "href": "https://www.britannica.com/biography/Nicolas-Fouquet",
        "image": {
          "src": "/covers/hungary-orban-fidesz-data-center-raid--a1.png",
          "alt": "Portrait of Nicolas Fouquet, Louis XIV's superintendent of finances, arrested and tried for embezzlement in 1661",
          "credit": "Portrait of Nicolas Fouquet (17th century). Public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Fortune defends her turning wheel in Boethius's Consolation of Philosophy (Book II, Prose 2, c. 524 AD)",
        "excerpt": "Shall man's insatiate greed bind me to a constancy foreign to my character? This is my art, this the game I never cease to play. I turn the wheel that spins. I delight to see the high come down and the low ascend. Mount up, if thou wilt, but only on condition that thou wilt not think it a hardship to come down when the rules of my game require it.",
        "source": "Boethius, The Consolation of Philosophy, Book II, Prose 2 (c. 524 AD), trans. H. R. James (1897)",
        "href": "https://www.gutenberg.org/cache/epub/14328/pg14328.txt"
      },
      {
        "category": "literary",
        "title": "Cardinal Wolsey's farewell to greatness in Shakespeare's Henry VIII (Act 3, Scene 2, first performed 1613)",
        "excerpt": "Farewell? A long farewell to all my greatness! This is the state of man: today he puts forth The tender leaves of hopes; tomorrow blossoms, And bears his blushing honours thick upon him; The third day comes a frost, a killing frost, And when he thinks, good easy man, full surely His greatness is a-ripening, nips his root, And then he falls, as I do. I have ventured, Like little wanton boys that swim on bladders, This many summers in a sea of glory, But far beyond my depth. My high-blown pride At length broke under me and now has left me, Weary and old with service, to the mercy Of a rude stream that must for ever hide me.",
        "source": "William Shakespeare & John Fletcher, Henry VIII, Act 3, Scene 2 (first performed 1613)",
        "href": "https://www.gutenberg.org/cache/epub/100/pg100.txt",
        "image": {
          "src": "/covers/hungary-orban-fidesz-data-center-raid--a3.png",
          "alt": "Portrait of Cardinal Thomas Wolsey, the disgraced minister of Henry VIII",
          "credit": "Portrait of Cardinal Thomas Wolsey, after a 16th-century original. Public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Edward Burne-Jones, The Wheel of Fortune (1875-1883, Musée d'Orsay)",
        "excerpt": "In Burne-Jones's towering canvas, a grave, impassive Fortune turns her great wheel while three bound men, a slave, a king, and a poet, are carried helplessly up and then down its rim. The mighty and the low are lashed to the same turning frame, none able to halt its motion. The painter said Fortune's wheel \"is a true image, and we take our turn at it, and are broken upon it.\"",
        "source": "Edward Burne-Jones, The Wheel of Fortune, 1875-1883, oil on canvas, Musée d'Orsay, Paris",
        "href": "https://en.wikipedia.org/wiki/The_Wheel_of_Fortune_(Burne-Jones)",
        "image": {
          "src": "/covers/hungary-orban-fidesz-data-center-raid--a4.png",
          "alt": "Burne-Jones's painting The Wheel of Fortune: a standing figure of Fortune turning a great wheel to which three nude men are bound, rising and falling",
          "credit": "Edward Burne-Jones, The Wheel of Fortune (1875-1883), Musée d'Orsay. Public domain, via Wikimedia Commons (Google Art Project)"
        }
      },
      {
        "category": "artistic",
        "title": "\"O Fortuna\" from the Carmina Burana, set by Carl Orff (13th-c. text; music 1936)",
        "excerpt": "O Fortuna / velut luna / statu variabilis, / semper crescis / aut decrescis; / vita detestabilis / nunc obdurat / et tunc curat / ludo mentis aciem, / egestatem, / potestatem / dissolvit ut glaciem. // Sors immanis / et inanis, / rota tu volubilis, / status malus, / vana salus / semper dissolubilis, / obumbrata / et velata / michi quoque niteris; / nunc per ludum / dorsum nudum / fero tui sceleris.",
        "source": "\"O Fortuna,\" Carmina Burana (Codex Buranus), 13th century; set to music by Carl Orff in his cantata Carmina Burana, 1936",
        "href": "https://en.wikipedia.org/wiki/O_Fortuna",
        "image": {
          "src": "/covers/hungary-orban-fidesz-data-center-raid--a5.png",
          "alt": "The Wheel of Fortune (Rota Fortunae) miniature from the medieval Carmina Burana manuscript, with figures rising to and falling from a crowned king at the top",
          "credit": "Rota Fortunae, Carmina Burana manuscript (Codex Buranus, c. 1230), Bavarian State Library. Public domain, via Wikimedia Commons"
        }
      }
    ]
  },
  {
    "slug": "japan-first-cruelly-hot-day-40c",
    "headline": "Japan records its first 'cruelly hot day' as temperatures top 40C in central cities",
    "overview": "Japan marked its first 'kokushobi,' or cruelly hot day, as temperatures climbed past 40C (104F) in central cities including Tajimi and Toyota. The weather agency, which coined the term in April to warn the public of extreme heat, issued heatstroke alerts across 41 of the country's 47 prefectures. Forecasters said the dangerous heat would persist into the following week.",
    "genre": "Climate",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cp3rz07grngo"
      },
      {
        "name": "The Japan Times",
        "href": "https://www.japantimes.co.jp/news/2026/07/22/japan/japan-brutal-heat/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-22",
    "image": {
      "src": "/covers/japan-first-cruelly-hot-day-40c.png",
      "alt": "A blazing sun over a Japanese city skyline during the record heat wave",
      "credit": "BBC"
    },
    "rank": 32,
    "edition": "Morning Edition · 22 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The year-long European megadrought and Great Heatwave of 1540",
        "excerpt": "For roughly eleven months the rain simply stopped across a continent, from the British Isles to Poland and from Scandinavia to the Mediterranean. Chroniclers recorded that temperatures regularly climbed above 40C; the Rhine at Basel fell to a tenth of its normal flow, wells and springs failed, and the Nymphs of legend seemed to have abandoned Europe's dried-up rivers. Forest and city fires raged so widely that smoke was said to drift from Switzerland to Krakow, and contemporaries remembered 1540 as the Mordbrenner-Jahr, the 'year of the arsonists.'",
        "source": "Wikipedia, 'The year-round heat and drought of 1540 in Europe', drawing on Wetter & Pfister et al., Climatic Change (2014)",
        "href": "https://en.wikipedia.org/wiki/The_year-round_heat_and_drought_of_1540_in_Europe"
      },
      {
        "category": "historical",
        "title": "The North American heat wave and Dust Bowl summer of July 1936",
        "excerpt": "In the depths of the Dust Bowl, the summer of 1936 brought the most severe heat wave in the modern history of North America. Thermometers reached 121F (about 49C) in Kansas and North Dakota, and thirteen U.S. state temperature records set that July still stood decades later. As many as 5,000 heat-related deaths were reported in the United States and more than a thousand in Canada, with the elderly in un-air-conditioned cities such as Chicago, Detroit and St. Louis dying in the greatest numbers while scorched crops collapsed across the Plains.",
        "source": "Wikipedia, '1936 North American heat wave'",
        "href": "https://en.wikipedia.org/wiki/1936_North_American_heat_wave"
      },
      {
        "category": "literary",
        "title": "Homer, Iliad, Book 22 — Achilles likened to the Dog Star (c. 8th century BC; A. T. Murray trans., 1924)",
        "excerpt": "Him the old man Priam was first to behold with his eyes, as he sped all-gleaming over the plain, like to the star that cometh forth at harvest-time, and brightly do his rays shine amid the host of stars in the darkness of night, the star that men call by name the Dog of Orion. Brightest of all is he, yet withal is he a sign of evil, and bringeth much fever upon wretched mortals.",
        "source": "Homer, Iliad 22.25-31, English translation by A. T. Murray (Loeb Classical Library, 1924), via Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0134:book=22"
      },
      {
        "category": "literary",
        "title": "Ovid, Metamorphoses, Book 2 — Phaethon scorches the earth (8 AD; Brookes More trans., 1922)",
        "excerpt": "The grass is blighted; trees / are burnt up with their leaves; the ripe brown crops / give fuel for self destruction—Oh what small / complaints! Great cities perish with their walls, / and peopled nations are consumed to dust—",
        "source": "Ovid, Metamorphoses 2 (the fall of Phaethon), English verse translation by Brookes More (1922), via Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0028:book=2:card=227"
      },
      {
        "category": "artistic",
        "title": "Giuseppe Arcimboldo, 'Summer' (1563), oil on panel, Kunsthistorisches Museum, Vienna",
        "excerpt": "Arcimboldo builds a human head entirely from the ripe glut of the hottest season: a cheek of peach, a chin of pear, a cucumber nose, an ear of maize, and a crown of grain and artichokes, all packed to bursting under the sun. The face grins outward while the collar bears the painter's name and date, turning the allegory into a portrait of the year at its scorching, over-ripe peak—summer as a body that abundance has almost pushed to the point of rot.",
        "source": "Giuseppe Arcimboldo, 'Summer', from The Four Seasons, 1563; Kunsthistorisches Museum, Vienna",
        "href": "https://en.wikipedia.org/wiki/The_Four_Seasons_(Arcimboldo)",
        "image": {
          "src": "/covers/japan-first-cruelly-hot-day-40c--a4.png",
          "alt": "A human profile portrait composed entirely of summer fruits, vegetables and grain, by Giuseppe Arcimboldo (1563)",
          "credit": "Giuseppe Arcimboldo, 'Summer' (1563), Kunsthistorisches Museum, Vienna. Public domain, via Wikimedia Commons (Google Art Project)."
        }
      },
      {
        "category": "artistic",
        "title": "Antonio Vivaldi, 'Summer' (L'estate), Violin Concerto in G minor RV 315, from Op. 8 (Amsterdam, 1725)",
        "excerpt": "Sotto dura stagion dal sole accesa / Langue l'huom, langue 'l gregge, ed arde 'l pino.",
        "source": "Sonnet prefacing Vivaldi's 'L'estate' from Il cimento dell'armonia e dell'inventione, Op. 8 (1725). Translation: 'Beneath the harsh season kindled by the sun, man and flock languish, and the pine tree burns.'",
        "href": "https://en.wikipedia.org/wiki/Il_cimento_dell%27armonia_e_dell%27inventione",
        "image": {
          "src": "/covers/japan-first-cruelly-hot-day-40c--a5.png",
          "alt": "Engraved title page of Vivaldi's Il cimento dell'armonia e dell'inventione, Op. 8 (1725), which contains The Four Seasons",
          "credit": "Title page of Antonio Vivaldi, 'Il cimento dell'armonia e dell'inventione', Op. 8 (Amsterdam, 1725). Public domain, via Wikimedia Commons."
        }
      }
    ]
  },
  {
    "slug": "southern-france-wildfire-evacuations",
    "headline": "Fast-moving wildfire in southern France forces hundreds to evacuate amid a Europe-wide heat spell",
    "overview": "A fast-moving wildfire in southern France forced hundreds of people to flee as hot, dry and windy conditions drove the flames across the countryside. The blaze is part of a wave of erratic, extreme summer weather across Europe, with fires also burning in Spain. Firefighters worked through the night to contain the front.",
    "genre": "Climate",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMitAFBVV95cUxPWWNBZWlfMVJCN3J6emRQbzY5NThiVVkzUmlfTW8tck5DVkxQM3BIQ3FiY0RtWUFjdTRpU3ZFbEJNaG9nNS1SYWhYTnVkRDhDcWNmWEkwdVU5cWpDbE5zNEYxcko5S2FvLVpmQ00zd2V5Rk9TYTlLYV9uc2l4bGw4RnRQbUFnVk85YTQ4X0Y1dXRJNGgxVGJVdm1oS3dkS2RabjNRSGdQbTZVTElvRlE5RGx5b3Y?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMivgFBVV95cUxPWi1yaHBIRE5YS2RBOXFTMmtJQ2ZDSDU1WU9YZXFfcmJ5aXFRVUFFMFFLdEtQOTVSVXhiNmZwLUFuTnl3R2pjM3lUVGtHQk43NTlUVXRTN1F0amJuOTgwTTJzY0w5ajV6RVJxSjh3dDNLaE1fZVVOaTdRb3RTbFVzZ0J2UTB6XzdPXzEwQUVjQlhBdEpZUnNNYWNRM1FvaTYwZzNDZnZiQ2pkYXU2WXcyQlA5UHFrWFVlSFliajhR?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-22",
    "image": {
      "src": "/covers/southern-france-wildfire-evacuations.png",
      "alt": "A wildfire burning across dry hills in southern France with smoke rising",
      "credit": "Wikimedia Commons"
    },
    "rank": 33,
    "edition": "Morning Edition · 22 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Great Fire of Rome (AD 64), as recorded by Tacitus, Annals XV.38",
        "excerpt": "It had its beginning in that part of the circus which adjoins the Palatine and Cælian hills, where, amid the shops containing inflammable wares, the conflagration both broke out and instantly became so fierce and so rapid from the wind that it seized in its grasp the entire length of the circus. It was not against private residences or public buildings or temples, that its full force found time to be checked. The blaze in its fury ran first through the level portions of the city, then rising to the hills, while it again devastated every place below them, it outstripped all preventive measures; so rapid was the mischief and so completely at its mercy the city.",
        "source": "Tacitus, Annals, Book XV, ch. 38, trans. Alfred John Church and William Jackson Brodribb (1876)",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0078:book=15:chapter=38"
      },
      {
        "category": "historical",
        "title": "The Peshtigo Fire (8 October 1871), from Rev. Peter Pernin's eyewitness account (1874)",
        "excerpt": "The air was no longer fit to breathe, full as it was of sand, dust, ashes, cinders, sparks, smoke, and fire. It was almost impossible to keep one's eyes unclosed, to distinguish the road, or to recognize people, though the way was crowded with pedestrians, as well as vehicles crossing and crashing against each other in the general flight. A thousand discordant deafening noises rose on the air together.",
        "source": "Rev. Peter Pernin, \"The Great Peshtigo Fire: An Eyewitness Account\" (1874), reprinted in the Wisconsin Magazine of History / Wisconsin Reader",
        "href": "https://digicoll.library.wisc.edu/WIReader/WER2002-3.html"
      },
      {
        "category": "literary",
        "title": "Virgil, Aeneid, Book II — the burning of Troy (Dryden's translation, 1697)",
        "excerpt": "Thus, when a flood of fire by wind is borne, / Crackling it rolls, and mows the standing corn; / Or deluges, descending on the plains, / Sweep o'er the yellow ear, destroy the pains / Of lab'ring oxen and the peasant's gains; / Unroot the forest oaks, and bear away / Flocks, folds, and trees, an undistinguish'd prey.",
        "source": "Virgil, The Aeneid, Book II, trans. John Dryden (1697)",
        "href": "https://www.gutenberg.org/cache/epub/228/pg228.txt"
      },
      {
        "category": "literary",
        "title": "Ovid, Metamorphoses, Book II — Phaethon sets the earth ablaze (trans. Brookes More, 1922)",
        "excerpt": "The highest altitudes are caught in flames, and as their moistures dry they crack in chasms. The grass is blighted; trees are burnt up with their leaves; the ripe brown crops give fuel for self destruction—Oh what small complaints! Great cities perish with their walls, and peopled nations are consumed to dust—the forests and the mountains are destroyed.",
        "source": "Ovid, Metamorphoses, Book II, trans. Brookes More (1922)",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0028:book=2:card=227"
      },
      {
        "category": "artistic",
        "title": "J. M. W. Turner, The Burning of the Houses of Lords and Commons, 16 October 1834 (1835)",
        "excerpt": "Turner witnessed the destruction of the Palace of Westminster from the banks of the Thames on the night of 16 October 1834 and made watercolour sketches on the spot. In this oil, the fire becomes an elemental force: a towering wall of white-gold flame consumes the Gothic parliament while a vast, panicked crowd presses to the river's edge to watch and flee. The blaze's reflection turns the water itself to fire, dwarfing the human figures beneath it.",
        "source": "Philadelphia Museum of Art (oil on canvas, 1835)",
        "href": "https://en.wikipedia.org/wiki/The_Burning_of_the_Houses_of_Lords_and_Commons",
        "image": {
          "src": "/covers/southern-france-wildfire-evacuations--a4.png",
          "alt": "Turner's oil painting of the Houses of Parliament engulfed in a towering wall of white and orange flame, its glare reflected across the Thames as crowds watch from the river bank",
          "credit": "J. M. W. Turner (1835), Philadelphia Museum of Art, via Google Art Project / Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Philip James de Loutherbourg, The Great Fire of London (c. 1797)",
        "excerpt": "De Loutherbourg, a master of theatrical spectacle, imagines the 1666 conflagration as an apocalyptic drama: sheets of flame and roiling smoke rise above Old St Paul's and the medieval city, lighting the night sky blood-red. In the foreground crowds throng the quayside and the river, carrying children and salvaged goods as they flee the advancing fire, the whole scene poised between terror and awe.",
        "source": "Yale Center for British Art (oil on canvas, c. 1797)",
        "href": "https://en.wikipedia.org/wiki/The_Great_Fire_of_London_(painting)",
        "image": {
          "src": "/covers/southern-france-wildfire-evacuations--a5.png",
          "alt": "De Loutherbourg's dramatic painting of the Great Fire of London, with flames and smoke towering over the burning city while crowds flee along the riverside in the foreground",
          "credit": "Philip James de Loutherbourg (c. 1797), Yale Center for British Art, via Google Art Project / Wikimedia Commons (public domain)"
        }
      }
    ]
  },
  {
    "slug": "oil-six-week-highs-transit-routes",
    "headline": "Oil climbs to near six-week highs as Middle East conflict threatens key transit routes",
    "overview": "Oil prices rose to near six-week highs as escalating Middle East conflict threatened critical shipping routes, with Brent crude climbing above $91 a barrel. Traders pointed to risks around the Strait of Hormuz and Red Sea shipping lanes. The gains rippled through global markets already unsettled by the war.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiugFBVV95cUxPVktKb0FFdG9HQ0VvZ0dKR2ozZExNVVZ5eU1Wc29kUmhBRHVQclVYNk14WXhfb0MxV2lyaEk2UDJLdGJOdk9sRjE2M3NaNXpmUVBOSTFTLVFHSTV0UnJKTG5fZm95czJacHdDVVU2cE8wd013R1B4M0RHcHF2YURVX3pmbENTbktzRzRfZ0htelRKU1hQNUp4Z3ZFNUV5RkZ1NFE3STNndlFVSVVFT0JHUWVudU1XXzcwQXc?oc=5"
      },
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMilgFBVV95cUxQbUxGQl9rN25LcTRNNmVwQ1pfbnJqV29kN0Q4YjBwRDVMSmVtaTlxLUczLW5RcFpicTJtbnZlMV9YSGEtaWdpcm1qSWN0VXpDNFpFcEZUemNrNkpBdmItemJlY1ZuOVJwQkRGcF81Z3JNT3BPWl81OVZDWk9sZjVFc2w0cXNMdS14RlhseER0SEhYZi1uU2c?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-22",
    "image": {
      "src": "/covers/oil-six-week-highs-transit-routes.png",
      "alt": "An oil tanker at sea near a strategic shipping strait as prices rise",
      "credit": "Wikimedia Commons"
    },
    "rank": 34,
    "edition": "Morning Edition · 22 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The OPEC Oil Embargo of 1973-1974",
        "excerpt": "The price of oil per barrel first doubled, then quadrupled, imposing skyrocketing costs on consumers and structural challenges to the stability of whole national economies.",
        "source": "U.S. Department of State, Office of the Historian, Milestones in the History of U.S. Foreign Relations",
        "href": "https://history.state.gov/milestones/1969-1976/oil-embargo"
      },
      {
        "category": "historical",
        "title": "Napoleon's Berlin Decree and the Continental System, 21 November 1806",
        "excerpt": "The British islands are declared in a state of blockade. All commerce and correspondence with the British islands are prohibited. In consequence, letters or packets, addressed either to England, to an Englishman, or in the English language, shall not pass through the post-office and shall be seized.",
        "source": "Berlin Decree of Napoleon I (Articles I and II), Teaching American History document archive",
        "href": "https://teachingamericanhistory.org/document/berlin-decree/"
      },
      {
        "category": "literary",
        "title": "William Shakespeare, The Merchant of Venice, Act I, Scene 1 (c. 1596-1598)",
        "excerpt": "Your mind is tossing on the ocean, / There where your argosies with portly sail, / Like signiors and rich burghers on the flood, / Or, as it were, the pageants of the sea, / Do overpeer the petty traffickers / That curtsy to them, do them reverence, / As they fly by them with their woven wings.",
        "source": "The Folger Shakespeare, The Merchant of Venice (Salarino to Antonio, 1.1)",
        "href": "https://www.folger.edu/explore/shakespeares-works/the-merchant-of-venice/read/1/1/"
      },
      {
        "category": "literary",
        "title": "Homer, The Odyssey, Book XII: The Strait of Scylla and Charybdis (trans. Samuel Butler, 1900)",
        "excerpt": "Then we entered the Straits in great fear of mind, for on the one hand was Scylla, and on the other dread Charybdis kept sucking up the salt water. As she vomited it up, it was like the water in a cauldron when it is boiling over upon a great fire, and the spray reached the top of the rocks on either side. While we were taken up with this, and were expecting each moment to be our last, Scylla pounced down suddenly upon us and snatched up my six best men.",
        "source": "Homer, The Odyssey, translated by Samuel Butler, Project Gutenberg eBook #1727",
        "href": "https://www.gutenberg.org/cache/epub/1727/pg1727.txt"
      },
      {
        "category": "artistic",
        "title": "Ludolf Backhuysen, Ships in Distress off a Rocky Coast (1667)",
        "excerpt": "Backhuysen sets a cluster of Dutch merchant vessels against a churning grey-green sea and a jagged lee shore, their sails straining as the storm drives them toward the rocks. Tiny figures cling to a wrecked hull in the foreground while a distant ship fires a signal of distress. The painting turns the perils of maritime commerce into high drama: the same routes that carried Holland's wealth could, in an hour of wind, swallow it whole.",
        "source": "National Gallery of Art, Washington, D.C. (Ailsa Mellon Bruce Fund, 1985.29.1)",
        "href": "https://www.nga.gov/artworks/61324-ships-distress-rocky-coast",
        "image": {
          "src": "/covers/oil-six-week-highs-transit-routes--a4.png",
          "alt": "Dutch merchant ships pitching in a violent sea beside a rocky coast under a stormy sky, with a wreck in the foreground",
          "credit": "Ludolf Backhuysen, Ships in Distress off a Rocky Coast, 1667. National Gallery of Art, Washington (CC0 / public domain), via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "J. M. W. Turner, Dido building Carthage; or the Rise of the Carthaginian Empire (1815)",
        "excerpt": "Turner floods a great harbor with golden light as Queen Dido oversees the building of Carthage, the ships and quays of a rising trading empire massed along the water. The painting is a hymn to sea-borne commerce as the source of a nation's power and glory. Turner prized it above all his works and asked to be buried wrapped in it, a measure of how completely he identified maritime trade with the fate of empires.",
        "source": "The National Gallery, London (NG498)",
        "href": "https://www.nationalgallery.org.uk/paintings/joseph-mallord-william-turner-dido-building-carthage-or-the-rise-of-the-carthaginian-empire",
        "image": {
          "src": "/covers/oil-six-week-highs-transit-routes--a5.png",
          "alt": "A sunlit classical harbor crowded with ships and monumental buildings as Carthage is built along the water",
          "credit": "J. M. W. Turner, Dido building Carthage; or the Rise of the Carthaginian Empire, 1815. The National Gallery, London (public domain), via Wikimedia Commons"
        }
      }
    ]
  },
  {
    "slug": "cambridge-algae-biocells-batteries",
    "headline": "Cambridge scientists develop algae 'biocells' powered by photosynthesis to replace disposable batteries",
    "overview": "Researchers at the University of Cambridge have developed algae-powered 'biocells' that generate a continuous low-power electrical current through photosynthesis, producing electricity even in the dark. The sealed cells house cyanobacteria, or blue-green algae, and could run for years. The team, spinning out a company called e-Pho, says the technology could one day replace the small chemical batteries in devices such as remote controls and smoke alarms.",
    "genre": "Science",
    "sources": [
      {
        "name": "Dezeen",
        "href": "https://www.dezeen.com/2026/07/22/photosynthesis-powered-algae-biocells-e-pho/"
      },
      {
        "name": "Cambridge Independent",
        "href": "https://www.cambridgeindependent.co.uk/news/could-algae-powered-biocells-replace-everyday-batteries-9474596/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-22",
    "image": {
      "src": "/covers/cambridge-algae-biocells-batteries.png",
      "alt": "Vials of green algae generating electricity in a laboratory biocell prototype",
      "credit": "Wikimedia Commons"
    },
    "rank": 35,
    "edition": "Morning Edition · 22 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Joseph Priestley discovers that a living plant can 'restore' spent air (mint experiment, 17 August 1771; published 1772)",
        "excerpt": "Accordingly, on the 17th of August 1771, I put a sprig of mint into a quantity of air, in which a wax candle had burned out, and found that, on the 27th of the same month, another candle burned perfectly well in it. ... I have been so happy, as by accident to have hit upon a method of restoring air, which has been injured by the burning of candles, and to have discovered at least one of the restoratives which nature employs for this purpose. It is vegetation.",
        "source": "Joseph Priestley, 'Observations on Different Kinds of Air', Philosophical Transactions of the Royal Society, vol. 62 (1772); reprinted in Experiments and Observations on Different Kinds of Air (1774).",
        "href": "https://www.gutenberg.org/files/29734/29734-h/29734-h.htm"
      },
      {
        "category": "historical",
        "title": "Edmond Becquerel demonstrates the photovoltaic effect — light itself producing an electric current (Comptes Rendus, 1839)",
        "excerpt": "…an electric current is immediately produced; and whether the liquid is water or alkaline water, the current is such that the heated blade takes the negative electricity from the liquid; the opposite effect occurs when acidic water is used as the conductive liquid.",
        "source": "Edmond Becquerel, 'Mémoire sur les effets électriques produits sous l'influence des rayons solaires', Comptes Rendus de l'Académie des Sciences, vol. 9 (1839), pp. 561–567; English translation by the Institut Photovoltaïque d'Île-de-France (IPVF), 2020. Original at Gallica/BnF: https://gallica.bnf.fr/ark:/12148/bpt6k2968p/f561.item.zoom",
        "href": "https://www.ipvf.fr/edmond-becquerels-publications-are-now-translated/"
      },
      {
        "category": "literary",
        "title": "The Great Hymn to the Aten — Akhenaten's sun-worship (c. 1340 BCE; E. A. Wallis Budge translation, 1923)",
        "excerpt": "Thy rising [is] beautiful in the horizon of heaven, O Aten, ordainer of life. Thou dost shoot up in the horizon of the East, thou fillest every land with thy beneficence.",
        "source": "The Great Hymn to the Aten, from the tomb of Ay at Amarna; translation by E. A. Wallis Budge in Tutankhamen: Amenism, Atenism and Egyptian Monotheism (1923). Public domain.",
        "href": "https://en.wikisource.org/wiki/Great_Hymn_to_Aten"
      },
      {
        "category": "literary",
        "title": "Walt Whitman on the hidden life of grass — 'Song of Myself', section 6 (Leaves of Grass, 1855/1892)",
        "excerpt": "A child said What is the grass? fetching it to me with full hands; / How could I answer the child? I do not know what it is any more than he. / I guess it must be the flag of my disposition, out of hopeful green stuff woven.",
        "source": "Walt Whitman, 'Song of Myself', section 6, in Leaves of Grass (deathbed edition, 1891–1892). Public domain.",
        "href": "https://www.gutenberg.org/files/1322/1322-h/1322-h.htm"
      },
      {
        "category": "artistic",
        "title": "Ernst Haeckel, 'Diatomea' (Plate 4), from Kunstformen der Natur / Art Forms in Nature (1904)",
        "excerpt": "Under Haeckel's pen the glassy silica shells of diatoms — single-celled algae that live by photosynthesis — unfold into a radiant mandala of stars, fans, boats and filigree wheels. Drawn to reveal a symmetry invisible to the naked eye, the plate insists that the humblest green drifters of pond and ocean are exquisitely engineered vessels of light, quietly turning sunshine into life.",
        "source": "Ernst Haeckel, Kunstformen der Natur (Leipzig & Vienna: Bibliographisches Institut, 1904), Plate 4, 'Diatomea'. Public domain.",
        "href": "https://commons.wikimedia.org/wiki/File:Haeckel_Diatomea.jpg",
        "image": {
          "src": "/covers/cambridge-algae-biocells-batteries--a4.png",
          "alt": "Ernst Haeckel's colour lithograph of diatoms (single-celled algae), showing dozens of intricately symmetrical silica shells arranged like ornaments around a central rosette.",
          "credit": "Ernst Haeckel, 'Diatomea', Kunstformen der Natur (1904), Plate 4. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Joseph Haydn, Die Schöpfung (The Creation) — 'And there was light' (oratorio, 1798)",
        "excerpt": "In the beginning God created the heaven and the earth; and the earth was without form and void; and darkness was upon the face of the deep. And the Spirit of God moved on the face of the waters: and God said, Let there be light, and there was light.",
        "source": "Joseph Haydn, The Creation (Die Schöpfung), oratorio, libretto by Gottfried van Swieten after Genesis and Milton; first public performance 1798. English word-book, Words of Haydn's Oratorio of the Creation. Public domain.",
        "href": "https://archive.org/stream/wordsofhaydnsora00enfi/wordsofhaydnsora00enfi_djvu.txt",
        "image": {
          "src": "/covers/cambridge-algae-biocells-batteries--a5.png",
          "alt": "Coloured print after Balthasar Wigand's watercolour showing the grand hall performance of Haydn's oratorio The Creation in Vienna on 27 March 1808, with orchestra, chorus and a crowded audience.",
          "credit": "Print after a watercolour by Balthasar Wigand, 'Performance of Haydn's Creation in Vienna, 27 March 1808'. Public domain (CC0), via Wikimedia Commons."
        }
      }
    ]
  },
  {
    "slug": "marineland-beluga-whales-us-aquariums",
    "headline": "Beluga whales from a shuttered Canadian marine park arrive at US aquariums under an emergency rescue",
    "overview": "Beluga whales from Marineland, the closed Canadian marine park, have begun arriving at aquariums in the United States under an emergency relocation plan. The first belugas reached Chicago's Shedd Aquarium, with others bound for SeaWorld facilities, after US officials approved the import. The move followed warnings that the animals could be euthanized without new homes or funding.",
    "genre": "Science",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/videos/ckg4x8lpe50o"
      },
      {
        "name": "The Globe and Mail",
        "href": "https://www.theglobeandmail.com/canada/toronto/article-marineland-beluga-whales-relocate-us/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-22",
    "image": {
      "src": "/covers/marineland-beluga-whales-us-aquariums.png",
      "alt": "A beluga whale swimming in an aquarium tank after relocation from Canada",
      "credit": "BBC"
    },
    "rank": 36,
    "edition": "Morning Edition · 22 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "A stranded killer whale in the harbour at Ostia is turned into a public spectacle before the Emperor Claudius (c. AD 50), recorded by Pliny the Elder",
        "excerpt": "An orca has been seen even in the port of Ostia, where it was attacked by the Emperor Claudius. It was while he was constructing the harbour there that this orca came, attracted by some hides which, having been brought from Gaul, had happened to fall overboard there. ... Upon this, Cæsar ordered a great number of nets to be extended at the mouth of the harbour, from shore to shore, while he himself went there with the prætorian cohorts, and so afforded a spectacle to the Roman people; for boats assailed the monster, while the soldiers on board showered lances upon it.",
        "source": "Pliny the Elder, The Natural History, Book IX, ch. 5 (trans. John Bostock and H. T. Riley, 1855)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0137:book=9:chapter=5"
      },
      {
        "category": "historical",
        "title": "P. T. Barnum ships two live white whales from the St. Lawrence to a basement tank in his American Museum, New York (1861)",
        "excerpt": "I determined upon the capture and transport to my Museum of at least two living whales, and prepared in the basement of the building a brick and cement tank, forty feet long, and eighteen feet wide, for the reception of the marine monsters. ... The whales, however, soon died--their sudden and immense popularity was too much for them--and I then despatched agents to the coast of Labrador, and not many weeks thereafter I had two more live whales disporting themselves in my monster aquarium.",
        "source": "P. T. Barnum, Struggles and Triumphs; or, Forty Years' Recollections (1869)",
        "href": "https://www.gutenberg.org/cache/epub/50115/pg50115.txt"
      },
      {
        "category": "literary",
        "title": "Herman Melville, Moby-Dick; or, The Whale, ch. 1 'Loomings' (1851)",
        "excerpt": "Chief among these motives was the overwhelming idea of the great whale himself. Such a portentous and mysterious monster roused all my curiosity. ... By reason of these things, then, the whaling voyage was welcome; the great flood-gates of the wonder-world swung open, and in the wild conceits that swayed me to my purpose, two and two there floated into my inmost soul, endless processions of the whale, and, mid most of them all, one grand hooded phantom, like a snow hill in the air.",
        "source": "Herman Melville, Moby-Dick; or, The Whale (New York: Harper & Brothers, 1851), Chapter 1",
        "href": "https://www.gutenberg.org/files/2701/2701-0.txt"
      },
      {
        "category": "literary",
        "title": "The great fish that swallows and delivers the prophet, Book of Jonah (King James Version, 1611)",
        "excerpt": "Now the LORD had prepared a great fish to swallow up Jonah. And Jonah was in the belly of the fish three days and three nights. Then Jonah prayed unto the LORD his God out of the fish's belly, And said, I cried by reason of mine affliction unto the LORD, and he heard me; out of the belly of hell cried I, and thou heardest my voice. ... And the LORD spake unto the fish, and it vomited out Jonah upon the dry land.",
        "source": "The Holy Bible, King James Version, Jonah 1:17-2:2, 2:10",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Jonah"
      },
      {
        "category": "artistic",
        "title": "Jan Saenredam, 'Beached Whale near Beverwijk' (engraving, 1602), commemorating the sperm whale stranded on the Dutch coast on 13 January 1601",
        "excerpt": "The great engraving records the sperm whale that grounded on the beach at Beverwijk on 13 January 1601, its vast carcass ringed by wondering, handkerchief-covered crowds while the artist himself sketches at the left. Around the beast Saenredam wreathed emblems of dread--an eclipse, an earthquake, Death loosing a plague-arrow at Amsterdam--for a stranded leviathan was read as a portent of God's displeasure. It fixes forever the mingled wonder, pity and unease that a monstrous sea-creature, helpless out of its element, stirs in the humans who gather to look.",
        "source": "Jan Saenredam, 'Gestrande walvis bij Beverwijk' (1602), engraving, Rijksmuseum, Amsterdam (object no. RP-P-OB-4635)",
        "href": "https://www.rijksmuseum.nl/en/collection/object/Gestrande-walvis-bij-Beverwijk-1601--06e29ae6820dc55ba0f1550cabfb0a3d",
        "image": {
          "src": "/covers/marineland-beluga-whales-us-aquariums--a4.png",
          "alt": "1602 engraving by Jan Saenredam of a beached whale on the shore at Beverwijk, surrounded by crowds of onlookers, with an allegorical border of emblems above.",
          "credit": "Jan Saenredam, 'Gestrande walvis bij Beverwijk' (1602), Rijksmuseum, Amsterdam (RP-P-OB-4635), public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Alan Hovhaness, 'And God Created Great Whales', Op. 229 No. 1 (symphonic poem for orchestra and recorded whale voices, premiered New York, 1970)",
        "excerpt": "Taking its title from Genesis ('And God created great whales, and every living creature that moveth'), Hovhaness weaves the actual recorded songs of humpback and bowhead whales through a shimmering, aleatoric orchestra, so that the living leviathan sings out over the strings. Premiered by Andre Kostelanetz and the New York Philharmonic on 11 June 1970, the piece treats the whale not as monster but as a fellow voice, and became an early rallying cry of the movement to save the whales. Its awe and pathos anticipate the tenderness with which keepers now try to shelter captive belugas from extinction and death.",
        "source": "Alan Hovhaness, 'And God Created Great Whales', Op. 229 No. 1, premiered by the New York Philharmonic under Andre Kostelanetz, 11 June 1970",
        "href": "https://en.wikipedia.org/wiki/And_God_Created_Great_Whales",
        "image": {
          "src": "/covers/marineland-beluga-whales-us-aquariums--a5.png",
          "alt": "A beluga whale surfacing in the St. Lawrence estuary near Tadoussac, Quebec, its pale rounded head above the dark water.",
          "credit": "Photograph by Luca Galuzzi (Tadoussac, Quebec, 2005), CC BY-SA 2.5, via Wikimedia Commons. Illustrative image accompanying the musical work."
        }
      }
    ]
  },
  {
    "slug": "world-cup-final-us-viewership-record",
    "headline": "World Cup final between Spain and Argentina drew about 60 million US viewers on Fox and Telemundo",
    "overview": "The 2026 World Cup final, in which Spain defeated Argentina, drew roughly 60 million television viewers in the United States across Fox and Telemundo, according to Nielsen. Fox's English-language broadcast peaked above 51 million viewers, setting a record for the most-watched soccer telecast in US history. The tournament was co-hosted by the United States, Canada and Mexico.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMinAFBVV95cUxQLWtvLTY0dGdnajA5TVR5cjBMWnFCdzh3R1JwRmkzaGlub0xsTVhvV0FRWDE1cHFnQ2FKWjNmbHR3WEhEM1lEOEUwMUFEYV9qOGUwUzNzUVJsWG9Lb3NKbEduM01jeWQ3d2ZYdlpoZXpTSGJNLWs5SnJTNEpiNHAtT19RQi0wc1NKQzFyTGpJVF95bHdkRjFTcnhUOGY?oc=5"
      },
      {
        "name": "ESPN",
        "href": "https://www.espn.com/soccer/story/_/id/49420870/world-cup-final-peaks-60m-viewers-north-america"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-22",
    "image": {
      "src": "/covers/world-cup-final-us-viewership-record.png",
      "alt": "The FIFA World Cup trophy under stadium lights after the final",
      "credit": "Wikimedia Commons"
    },
    "rank": 37,
    "edition": "Morning Edition · 22 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The crowds at the ancient Olympic Games, as described by Epictetus (Discourses I.6, c. AD 108)",
        "excerpt": "Are you not scorched? Are you not pressed by a crowd? Are you not without comfortable means of bathing? Are you not wet when it rains? Have you not abundance of noise, clamor, and other disagreeable things? But I suppose that setting all these things off against the magnificence of the spectacle, you bear and endure.",
        "source": "Epictetus, Discourses, Book I, Chapter VI (\"On Providence\"), trans. George Long",
        "href": "https://www.gutenberg.org/files/10661/10661-h/10661-h.htm"
      },
      {
        "category": "historical",
        "title": "The Blue and Green chariot-racing factions and the Nika riots of Constantinople (AD 532), recorded by Procopius",
        "excerpt": "In every city the population has been divided for a long time past into the Blue and the Green factions; but within comparatively recent times it has come about that, for the sake of these names and the seats which the rival factions occupy in watching the games, they spend their money and abandon their bodies to the most cruel tortures, and even do not think it unworthy to die a most shameful death.",
        "source": "Procopius, History of the Wars, Book I, Chapter 24, trans. H. B. Dewing (1914); via Fordham Internet Medieval Sourcebook",
        "href": "https://sourcebooks.fordham.edu/source/procop-wars1.asp"
      },
      {
        "category": "literary",
        "title": "The chariot race at the funeral games for Patroclus in Homer's Iliad, Book XXIII (c. 8th century BC)",
        "excerpt": "Meanwhile the Achaeans from their seats were watching how the horses went, as they scoured the plain amid clouds of their own dust. Idomeneus captain of the Cretans was first to make out the running, for he was not in the thick of the crowd, but stood on the most commanding part of the ground.",
        "source": "Homer, The Iliad, Book XXIII, trans. Samuel Butler",
        "href": "https://en.wikisource.org/wiki/The_Iliad_(Butler)/Book_XXIII"
      },
      {
        "category": "literary",
        "title": "Pindar's Olympian Ode 1, for Hieron of Syracuse, victor in the single horse race (476 BC)",
        "excerpt": "Best is Water of all, and Gold as a flaming fire in the night shineth eminent amid lordly wealth; but if of prizes in the games thou art fain, O my soul, to tell, then, as for no bright star more quickening than the sun must thou search in the void firmament by day, so neither shall we find any games greater than the Olympic whereof to utter our voice.",
        "source": "Pindar, Olympian Odes 1, trans. Ernest Myers (1874)",
        "href": "https://en.wikisource.org/wiki/Odes_of_Pindar_(Myers)/Olympian_Odes/1"
      },
      {
        "category": "artistic",
        "title": "Panathenaic prize amphora with a foot-race, attributed to the Euphiletos Painter (c. 530 BC)",
        "excerpt": "On this black-figure terracotta jar, awarded brimful of sacred olive oil to a champion of the Panathenaic Games, five naked runners surge forward shoulder to shoulder, legs and arms swinging in unison, frozen mid-stride in the oldest surviving image of the athletic contest as public prize. The amphora made the winner's glory portable: the crowd's champion carried his fame home painted on the vessel itself.",
        "source": "Attributed to the Euphiletos Painter, terracotta Panathenaic prize amphora, Archaic Greek (Attic), c. 530 BC; The Metropolitan Museum of Art, New York",
        "href": "https://www.metmuseum.org/art/collection/search/248902",
        "image": {
          "src": "/covers/world-cup-final-us-viewership-record--a4.png",
          "alt": "Black-figure terracotta Panathenaic prize amphora showing a line of nude runners competing in a foot-race",
          "credit": "The Metropolitan Museum of Art, Rogers Fund, 1914 (accession 14.130.12); CC0 1.0 Public Domain Dedication, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Ulpiano Checa, \"Carrera de carros romanos\" (Roman Chariot Race), 1890",
        "excerpt": "The Spanish painter Ulpiano Checa hurls the viewer straight into the sand of the Circus Maximus: four chariots thunder toward us in a churn of straining horses and flying dust, while a vast tiered crowd rises in a blur behind them. First shown at the 1890 Paris Salon, the canvas made the ancient stadium roar again, a spectacle of speed and collective frenzy watched by a multitude.",
        "source": "Ulpiano Checa y Sanz, \"Carrera de carros romanos\" (Roman Chariot Race), 1890",
        "href": "https://commons.wikimedia.org/wiki/File:Carrera_de_carros_romanos-Ulpiano_Checa.JPG",
        "image": {
          "src": "/covers/world-cup-final-us-viewership-record--a5.png",
          "alt": "Painting of Roman chariots racing at speed toward the viewer amid clouds of dust before a packed grandstand of spectators",
          "credit": "Ulpiano Checa, 1890; public domain, via Wikimedia Commons"
        }
      }
    ]
  },
  {
    "slug": "sharmistha-ray-pickleball-court-art",
    "headline": "Artist Sharmistha Ray paints Pittsburgh's pickleball courts in an abstract riot of color",
    "overview": "Artist Sharmistha Ray has transformed three pickleball courts in downtown Pittsburgh into large-scale abstract paintings, part of the new Arts Landing project in the city's Cultural District. Titled 'Geometry of Play,' the work overlays the game's markings with interlocking circles, triangles, stars and grids. Ray, co-founder of the collective Hilma's Ghost, painted the design directly onto the playing surfaces.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Colossal",
        "href": "https://www.thisiscolossal.com/2026/07/sharmistha-ray-geometry-play-color-pickleball-courts-pittsburgh/"
      },
      {
        "name": "The Art Newspaper",
        "href": "https://www.theartnewspaper.com/2026/04/24/pittsburgh-arts-landing-public-art-space"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-22",
    "image": {
      "src": "/covers/sharmistha-ray-pickleball-court-art.png",
      "alt": "Aerial view of Pittsburgh pickleball courts painted with bold abstract geometric shapes",
      "credit": "Colossal / Sharmistha Ray"
    },
    "rank": 38,
    "edition": "Morning Edition · 22 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Roman geometric floor mosaic from Casale San Basilio, Rome (2nd century CE)",
        "excerpt": "Long before painters signed abstract canvases, Roman craftsmen turned the floors people walked on into pure geometry. This pavement, excavated at Casale San Basilio outside Rome and now in the National Roman Museum, sets thousands of tesserae into a rhombille pattern of interlocking diamonds so precise it flickers into three dimensions, like tumbling cubes. It is abstraction underfoot: color, grid and repeating shape laid into the very surface a household lived and moved across.",
        "source": "National Roman Museum (Palazzo Massimo alle Terme), Rome, via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Roman_geometric_mosaic.jpg",
        "image": {
          "src": "/covers/sharmistha-ray-pickleball-court-art--a0.png",
          "alt": "Ancient Roman geometric mosaic of interlocking diamonds forming a three-dimensional cube illusion",
          "credit": "Photo by Mbellaccini, CC BY-SA 4.0, via Wikimedia Commons. Mosaic from Casale San Basilio, National Roman Museum, Rome."
        }
      },
      {
        "category": "historical",
        "title": "The labyrinth pavement of Chartres Cathedral, France (c. 1200)",
        "excerpt": "Set into the stone floor of the Gothic nave around 1200, the Chartres labyrinth is a vast circle of concentric switchback paths that pilgrims still walk on their knees. Its designers bound it to the building's own geometry: project the west facade down onto the floor, and the center of the great rose window lands exactly on the center of the labyrinth. Here too the decisive artwork is not on a wall but on the ground, a geometric pattern the faithful physically move through rather than merely look at.",
        "source": "Cathedrale Notre-Dame de Chartres, official site",
        "href": "https://www.cathedrale-chartres.org/en/cathedrale/monument/the-labyrinth/",
        "image": {
          "src": "/covers/sharmistha-ray-pickleball-court-art--a1.png",
          "alt": "The circular medieval labyrinth inlaid in the stone floor of the nave of Chartres Cathedral",
          "credit": "Photo by Daderot, CC BY-SA 3.0, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Edwin A. Abbott, 'Flatland: A Romance of Many Dimensions' (1884)",
        "excerpt": "Our Women are Straight Lines.\n\nOur Soldiers and Lowest Classes of Workmen are Triangles with two equal sides, each about eleven inches long, and a base or third side so short (often not exceeding half an inch) that they form at their vertices a very sharp and formidable angle.",
        "source": "Edwin A. Abbott, Flatland (1884), Project Gutenberg (Section 3, 'Concerning the Inhabitants of Flatland')",
        "href": "https://www.gutenberg.org/cache/epub/201/pg201.txt"
      },
      {
        "category": "literary",
        "title": "Johann Wolfgang von Goethe, 'Theory of Colours' (1810; Eastlake translation, 1840), section 759",
        "excerpt": "People experience a great delight in colour, generally. The eye requires it as much as it requires light. We have only to remember the refreshing sensation we experience, if on a cloudy day the sun illumines a single portion of the scene before us and displays its colours.",
        "source": "Goethe, Theory of Colours, trans. Charles Lock Eastlake, Part VI ('Effect of Colour with Reference to Moral Associations'), section 759, Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/50572/pg50572.txt"
      },
      {
        "category": "artistic",
        "title": "Wassily Kandinsky, 'Composition VIII' (1923)",
        "excerpt": "A jubilant collision of circles, triangles, grids and floating arcs, Composition VIII is Kandinsky's manifesto for pure geometric abstraction painted at the Bauhaus. He treated the flat surface as a field where shape and color behave like music, each form a note in a visual score, precisely the vocabulary of interlocking circles, triangles and grids that Sharmistha Ray unrolls across a pickleball court.",
        "source": "Solomon R. Guggenheim Museum, New York (via Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Vassily_Kandinsky,_1923_-_Composition_8,_huile_sur_toile,_140_cm_x_201_cm,_Mus%C3%A9e_Guggenheim,_New_York.jpg",
        "image": {
          "src": "/covers/sharmistha-ray-pickleball-court-art--a4.png",
          "alt": "Kandinsky's Composition VIII, an abstract arrangement of circles, triangles, grids and lines on a pale ground",
          "credit": "Wassily Kandinsky, Composition VIII (1923), Solomon R. Guggenheim Museum. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Piet Mondrian, 'Composition II in Red, Blue, and Yellow' (1930)",
        "excerpt": "Mondrian reduced painting to black grid lines and blocks of primary red, blue and yellow, an ordered field of rectangles that feels at once rigorous and playful. It is the purest ancestor of a court reimagined as color and geometry: a flat plane where the grid itself becomes the subject, and where balance is found not in a picture of something but in the arrangement of shape and hue.",
        "source": "Kunsthaus Zurich (via Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Piet_Mondriaan,_1930_-_Mondrian_Composition_II_in_Red,_Blue,_and_Yellow.jpg",
        "image": {
          "src": "/covers/sharmistha-ray-pickleball-court-art--a5.png",
          "alt": "Mondrian's Composition II in Red, Blue, and Yellow: black grid lines with blocks of primary color",
          "credit": "Piet Mondrian, Composition II in Red, Blue, and Yellow (1930), Kunsthaus Zurich. Public domain, via Wikimedia Commons."
        }
      }
    ]
  },
  {
    "slug": "israel-earthen-barrier-divides-gaza",
    "headline": "Israel builds a miles-long earthen barrier inside Gaza, splitting off more than half the territory",
    "overview": "The Israeli military is constructing a miles-long earthen barrier inside Gaza along the so-called yellow line, separating more than half of the strip it controls from the rest, satellite imagery shows. The military said the berm, which runs more than 14 miles, is meant to prevent infiltration and protect its troops and nearby Israeli communities. The line marks the boundary to which Israeli forces withdrew under the October ceasefire.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMiowFBVV95cUxPQnFjRG9PSm5GWnF5QTZ5WjJuaTVVYmRLanZNMElEUzZjT2xGSjJNZE5QS3hoRC1OMldqOVNWOTFWRkgxazY0NmNHN1FhX0RBV2ZNNHdJNk4wUUJBNHlySm83WkY1MUhZZ2NlS1JQU1dKUWh5VDZXRDd4eDVCYkZyVTh2SjJfNGMtc25zRk90R3ZKc3h1bTNJd1JWenM1UUl5QWpV?oc=5"
      },
      {
        "name": "The Washington Post",
        "href": "https://www.washingtonpost.com/world/2026/07/21/israel-gaza-yellow-line-barrier-ceasefire/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-22",
    "image": {
      "src": "/covers/israel-earthen-barrier-divides-gaza.png",
      "alt": "A section of the Israel-Gaza barrier, illustrating the dividing line inside the territory",
      "credit": "Wikimedia Commons"
    },
    "rank": 39,
    "edition": "Morning Edition · 22 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Hadrian's Wall, begun AD 122 — Rome fixes a line across Britain 'to separate the barbarians from the Romans'",
        "excerpt": "there he corrected many abuses and was the first to construct a wall, eighty miles in length, which was to separate the barbarians from the Romans.",
        "source": "Historia Augusta, 'Life of Hadrian' 11.2 (trans. David Magie, Loeb Classical Library, 1921), via LacusCurtius (University of Chicago)",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Historia_Augusta/Hadrian/1*.html",
        "image": {
          "src": "/covers/israel-earthen-barrier-divides-gaza--a0.png",
          "alt": "A weathered stone wall running along a green ridge in Northumberland, a surviving stretch of Hadrian's Wall west of Housesteads Roman fort.",
          "credit": "Steven Fruitsmaak, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "The Berlin Wall, raised 13 August 1961 — a barrier that split a city and a people, condemned by Kennedy on 26 June 1963",
        "excerpt": "Freedom has many difficulties and democracy is not perfect, but we have never had to put a wall up to keep our people in, to prevent them from leaving us.",
        "source": "President John F. Kennedy, 'Ich bin ein Berliner' address, Rudolph Wilde Platz, West Berlin, 26 June 1963",
        "href": "https://www.let.rug.nl/usa/presidents/john-fitzgerald-kennedy/ich-bin-ein-berliner-speech-1963.php",
        "image": {
          "src": "/covers/israel-earthen-barrier-divides-gaza--a1.png",
          "alt": "A brightly painted stretch of the Berlin Wall at Bethaniendamm, photographed from the West Berlin side in 1986.",
          "credit": "Thierry Noir, 1986, CC BY-SA 3.0, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Ovid, 'Metamorphoses' Book IV — Pyramus and Thisbe and the chink in the party wall (c. AD 8)",
        "excerpt": "Now, it so happened, a partition built between their houses, many years ago, was made defective with a little chink; a small defect observed by none, although for ages there; but what is hid from love? Our lovers found the secret opening, and used its passage to convey the sounds of gentle, murmured words... 'Thou envious wall why art thou standing in the way of those who die for love? What harm could happen thee shouldst thou permit us to enjoy our love?'",
        "source": "Ovid, 'Metamorphoses' 4.55ff (trans. Brookes More, 1922), via Perseus Digital Library, Tufts University",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0028:book=4:card=55"
      },
      {
        "category": "literary",
        "title": "The walls of Jericho fall — Book of Joshua 6:20 (King James Version, 1611)",
        "excerpt": "So the people shouted when the priests blew with the trumpets: and it came to pass, when the people heard the sound of the trumpet, and the people shouted with a great shout, that the wall fell down flat, so that the people went up into the city, every man straight before him, and they took the city.",
        "source": "The Holy Bible, King James Version, Joshua 6:20, via Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Joshua"
      },
      {
        "category": "artistic",
        "title": "Niklaus Manuel Deutsch, 'Pyramus and Thisbe' (c. 1520), Kunstmuseum Basel",
        "excerpt": "The Swiss painter sets the tragedy in a walled world: Thisbe bends over the fallen, sword-pierced Pyramus at the foot of the very masonry that had earlier kept them apart, its stones now a mute witness to a love the barrier could delay but not save. The composition turns the party wall of Ovid's tale into the silent architecture of catastrophe — separation carried to its lethal end.",
        "source": "Niklaus Manuel Deutsch (1484–1530), 'Pyramus and Thisbe', distemper on canvas, c. 1520, Kunstmuseum Basel (inv. 421)",
        "href": "https://commons.wikimedia.org/wiki/File:Pyramus_and_Thisbe_by_Niklaus_Manuel_(Deutsch).jpg",
        "image": {
          "src": "/covers/israel-earthen-barrier-divides-gaza--a4.png",
          "alt": "Renaissance painting of Thisbe mourning over the dying Pyramus beside a stone wall, by Niklaus Manuel Deutsch, c. 1520.",
          "credit": "Niklaus Manuel Deutsch, c. 1520, Kunstmuseum Basel, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Jean Fouquet, 'The Taking of Jericho' (c. 1470–75), from Josephus's 'Antiquités judaïques'",
        "excerpt": "Fouquet paints the archetypal fall of a fortified line: the great ringed walls of Jericho crack and topple as Joshua's army and the ark's procession advance, the fifteenth-century French illuminator rendering an ancient siege in the towers and ramparts of his own age. It is the counter-image to wall-building — the fortified barrier undone, and with it the city it was raised to protect.",
        "source": "Jean Fouquet (c. 1410–1478), 'Prise de Jéricho' (The Taking of Jericho), illumination from Flavius Josephus, 'Les Antiquités judaïques', Paris, BnF, Ms. Français 247, fol. 89",
        "href": "https://commons.wikimedia.org/wiki/File:Prise_de_J%C3%A9richo.jpg",
        "image": {
          "src": "/covers/israel-earthen-barrier-divides-gaza--a5.png",
          "alt": "Fifteenth-century manuscript illumination showing the circular walls of Jericho crumbling as Joshua's army and a religious procession advance, by Jean Fouquet.",
          "credit": "Jean Fouquet, c. 1470–75, Bibliothèque nationale de France (Ms. Français 247), public domain, via Wikimedia Commons"
        }
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
