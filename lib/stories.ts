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

// Hand-curated front page. Three separated editions are shown, newest first:
// the Afternoon Edition of 2 July 2026 (ranks 1-13) leads with its hero story,
// followed by the Morning Edition of 2 July 2026 and the Evening Edition of 1 July 2026.
// Stories are selected from the live RSS feeds in `lib/feeds.ts`. The analogies are
// the heart of each story: six per event, two per category, each linking to a real
// human-written source (a primary text, museum object page, or archive). Excerpts
// quote the most relevant passage verbatim where the source is public domain, and
// otherwise describe rather than quote. Covers are dithered local copies: feed or
// rights-clean Wikimedia art/photos credited to the source, otherwise an
// AI-generated illustration (credit "AI-generated"). Source links to AP/Reuters
// are Google News redirects (see `lib/feeds.ts`).
const stories: Story[] = [
  {
    "slug": "google-eu-android-fine-upheld",
    "headline": "EU's top court upholds record €4.1 billion antitrust fine against Google over Android",
    "overview": "The European Union's Court of Justice upheld a €4.1 billion antitrust fine against Google on Wednesday, ending the company's long appeal over the way it used its Android operating system to entrench its search engine. The judgment confirms the largest antitrust penalty the bloc has ever imposed and closes a case first brought by the European Commission in 2018.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMivgFBVV95cUxNeFFsalo3LWdiNVRiVnR2aGx3VEhYRm9JZW9XMFpWMTNzWENjczNPdG5JOUNrVWJYN3lVeFV6Q1RITnI5OUN3Y3Q4Sno4UlNoNGRybmppNGxVa3hOTXZyNGc4eV9JcUUzaE45cGhGWkRjNlhYSVpvcjR2TWtjZUN4TG9ZWjFOWllFcHBrNnBYM09pS19GYzVxdTFOVGJEUFNrdDJUTHNrWGcwVElWY3dNbGVuSmZSeVB3dGZBbUlR?oc=5"
      },
      {
        "name": "CNBC",
        "href": "https://www.cnbc.com/2026/07/02/alphabet-google-android-eu-antitrust-fine-4-1-billion-euro-appeal.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-02",
    "image": {
      "src": "/covers/google-eu-android-fine-upheld.png",
      "alt": "Brass scales of justice on a dark bench before a glowing glass corporate tower at dusk, symbolising a technology giant weighed by the law.",
      "credit": "AI-generated"
    },
    "lead": true,
    "edition": "Afternoon Edition · 2 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Standard Oil Co. of New Jersey v. United States (U.S. Supreme Court, 1911)",
        "excerpt": "The remedy to be administered in case of a combination violating the Anti-Trust Act is two-fold: first, to forbid the continuance of the prohibited act, and second, to so dissolve the combination as to neutralize the force of the unlawful power.",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/Standard_Oil_Co._of_New_Jersey_v._United_States"
      },
      {
        "category": "historical",
        "title": "Sherman Antitrust Act (United States, 1890)",
        "excerpt": "Every contract, combination in the form of trust or otherwise, or conspiracy, in restraint of trade or commerce among the several States, or with foreign nations, is hereby declared to be illegal. ... Every person who shall monopolize, or attempt to monopolize, or combine or conspire with any other person or persons, to monopolize any part of the trade or commerce among the several States, or with foreign nations, shall be deemed guilty of a misdemeanor.",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/Sherman_Antitrust_Act"
      },
      {
        "category": "literary",
        "title": "The First Book of Samuel, chapter 17 (King James Bible, 1611)",
        "excerpt": "Then said David to the Philistine, Thou comest to me with a sword, and with a spear, and with a shield: but I come to thee in the name of the LORD of hosts, the God of the armies of Israel, whom thou hast defied. This day will the LORD deliver thee into mine hand; and I will smite thee, and take thine head from thee; ... And all this assembly shall know that the LORD saveth not with sword and spear: for the battle is the LORD's, and he will give you into our hands.",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/1_Samuel"
      },
      {
        "category": "literary",
        "title": "Ozymandias, by Percy Bysshe Shelley (The Examiner, 1818)",
        "excerpt": "I met a Traveller from an antique land, / Who said, \"Two vast and trunkless legs of stone / Stand in the desart. Near them, on the sand, / Half sunk, a shattered visage lies, whose frown, / And wrinkled lip, and sneer of cold command, / Tell that its sculptor well those passions read, / Which yet survive, stamped on these lifeless things, / The hand that mocked them, and the heart that fed: / And on the pedestal these words appear: / \"My name is Ozymandias, King of Kings.\" / Look on my works ye Mighty, and despair! / No thing beside remains. Round the decay / Of that Colossal Wreck, boundless and bare, / The lone and level sands stretch far away.",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Examiner_(London)/Ozymandias"
      },
      {
        "category": "artistic",
        "title": "The Bosses of the Senate, by Joseph Keppler (Puck, 23 January 1889)",
        "excerpt": "Keppler crowds the Senate chamber with the bloated trusts of the Gilded Age, their bodies swollen money-bags marked Steel, Copper, Oil, and Sugar, looming over the seated lawmakers who scurry beneath them. A doorway labeled for the monopolists stands wide open, while the People's Entrance is bolted shut, a savage visual argument that industrial giants, not the electorate, hold the levers of government. It is the enduring image of concentrated economic power capturing the sovereign body meant to check it.",
        "source": "Library of Congress",
        "href": "https://www.loc.gov/pictures/item/2002718861/",
        "image": {
          "src": "/covers/google-eu-android-fine-upheld--art.png",
          "alt": "Political cartoon showing giant money-bag figures labeled with trusts towering over the U.S. Senate",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Next!, by Udo J. Keppler (Puck, 7 September 1904)",
        "excerpt": "The Standard Oil monopoly sprawls as a vast octopus, its steel tentacles already coiled around statehouses, Congress, and the copper, steel, and shipping trades. One last tentacle stretches hungrily toward the White House, the single word 'Next!' capturing the boundless appetite of a giant that answers to no border and no ballot. The cartoon frames dominance itself as the threat that a sovereign power must finally reach out and sever.",
        "source": "Library of Congress",
        "href": "https://www.loc.gov/pictures/item/2001695241/"
      }
    ],
    "rank": 1
  },
  {
    "slug": "iran-hormuz-tanker-warning",
    "headline": "Iran warns oil tankers to use approved routes in Strait of Hormuz or face a 'forceful response'",
    "overview": "Iran warned that oil tankers crossing the Strait of Hormuz must stick to Iranian-approved routes or risk a 'forceful response,' sharpening tensions over the waterway that carries roughly a fifth of the world's oil. The warning came as Tehran cautioned the United States and Israel against fresh attacks ahead of funeral processions for Ayatollah Ali Khamenei.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMiogFBVV95cUxQOEM2Y1VRaV9hZEpMWVFYU05hd2FsQjlnbDI5S2FvVmlJNVVjQi1hbTVVTWthM251SFpNcEFsb1ZRX2NuNmo2S3UyUXF3NlkzcHJXTlFGRlotQzR3bDBHSngwcUNYckFDY3VnWUgtRXI5cW9qd0tvUGFjb19kdTVIRXlyU3RkY05neGtOeWRXWmZPdmF0QlQyOG9FdGcxVkxEOWc?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiwwFBVV95cUxQVjd1X1pITDBSckd0dXdzYzdCbTZ2T3o2UmFUWG5yaHRuZFZWR1pMclo4Z3BLNGYzeS1WREhPZ291WFlJcmZGOGNHclp0dEp4cVhaQTdweUx5Rl90U2tnRGdJOEtjZHNnbC05aUJRMXZJbHl3aUtKMzlxRl94SUl5N251SENtMVBqVVFHdldIcDJCTnpaamphc2VVWUlReGZCMkZpOEJYMlBxcGlOaVktWUdIR2RseW94clhPenQzVlVhOWM?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-02",
    "image": {
      "src": "/covers/iran-hormuz-tanker-warning.png",
      "alt": "An oil tanker under way in the narrow shipping lanes of the Strait of Hormuz.",
      "credit": "AI-generated"
    },
    "edition": "Afternoon Edition · 2 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Herodotus, The Histories, Book VIII (on the Battle of Salamis, 480 BC), trans. George Rawlinson",
        "excerpt": "About the hour of midnight, they advanced their western wing towards Salamis, so as to inclose the Greeks. At the same time the force stationed about Ceos and Cynosura moved forward, and filled the whole strait as far as Munychia with their ships.",
        "source": "Wikisource — History of Herodotus, Book 8",
        "href": "https://en.wikisource.org/wiki/History_of_Herodotus/Book_8"
      },
      {
        "category": "historical",
        "title": "Convention respecting the Free Navigation of the Suez Maritime Canal (Convention of Constantinople), signed 29 October 1888",
        "excerpt": "The Suez Maritime Canal shall always be free and open, in time of war as in time of peace, to every vessel of commerce or of war, without distinction of flag. Consequently, the High Contracting Parties agree not in any way to interfere with the free use of the Canal, in time of war as in time of peace. The Canal shall never be subjected to the exercise of the right of blockade.",
        "source": "Wikisource — Constantinople Convention of the Suez Canal, Article I",
        "href": "https://en.wikisource.org/wiki/Constantinople_Convention_of_the_Suez_Canal"
      },
      {
        "category": "literary",
        "title": "Homer, The Odyssey, Book XII (Circe's warning of Scylla and Charybdis), trans. Samuel Butler",
        "excerpt": "On the one hand there are some overhanging rocks against which the deep blue waves of Amphitrite beat with terrific fury; the blessed gods call these rocks the Wanderers. ... Three times in the day does she vomit forth her waters, and three times she sucks them down again; see that you be not there when she is sucking, for if you are, Neptune himself could not save you.",
        "source": "Wikisource — The Odyssey (Butler), Book XII",
        "href": "https://en.wikisource.org/wiki/The_Odyssey_(Butler)/Book_XII"
      },
      {
        "category": "literary",
        "title": "Aeschylus, The Persians (472 BC), Messenger's speech on Salamis, trans. E. D. A. Morshead",
        "excerpt": "Awhile our stream of ships held onward, till within the narrowing creek our jostling vessels were together driven, and none could aid another: each on each drave hard their brazen beaks, or brake away the oar-banks of each other, stem to stern, while the Greek galleys, with no lack of skill, hemmed them and battered in their sides, and soon the hulls rolled over, and the sea was hid, crowded with wrecks and butchery of men.",
        "source": "Wikisource — Four Plays of Aeschylus (1908), Morshead / Persians",
        "href": "https://en.wikisource.org/wiki/Four_Plays_of_Aeschylus_(1908)_Morshead/Persians"
      },
      {
        "category": "artistic",
        "title": "Wilhelm von Kaulbach, Die Seeschlacht bei Salamis (The Sea Battle at Salamis), 1868",
        "excerpt": "Kaulbach's vast history painting crams the whole clash of empires into one boiling channel, where Persian galleys founder against the Greeks in waters too narrow for their numbers to matter. Fighters spill from splintered hulls into a churning strait, and the sea itself becomes the trap that turns a superior fleet into wreckage. The scene stages the ancient lesson now echoing over Hormuz: whoever holds the narrows holds the fate of everyone who must pass through them.",
        "source": "Wikimedia Commons — object page, Maximilianeum, Munich",
        "href": "https://commons.wikimedia.org/wiki/File:Kaulbach,_Wilhelm_von_-_Die_Seeschlacht_bei_Salamis_-_1868.JPG",
        "image": {
          "src": "/covers/iran-hormuz-tanker-warning--art.png",
          "alt": "Wilhelm von Kaulbach's 1868 painting of the Battle of Salamis, showing Greek and Persian warships colliding and men drowning in a narrow strait",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "J. M. W. Turner, Ulysses deriding Polyphemus — Homer's Odyssey, 1829",
        "excerpt": "Turner paints the moment of escape: Ulysses' ship slipping out of the giant's reach as sea and sky blaze with molten light. The vessel threads a hazardous passage past a hostile, looming power that could still crush it, freedom of movement won only by cunning and nerve. It is the perennial drama of the narrow water, where a single coastal force can menace every ship that dares the strait.",
        "source": "Wikimedia Commons — object page, National Gallery, London",
        "href": "https://commons.wikimedia.org/wiki/File:Joseph_Mallord_William_Turner_064.jpg"
      }
    ],
    "rank": 2
  },
  {
    "slug": "india-japan-strategic-pacts",
    "headline": "India and Japan sign agreements on AI, critical minerals and energy after Modi–Takaichi summit",
    "overview": "India and Japan signed a package of agreements on artificial intelligence, critical minerals, semiconductors and clean energy after Prime Minister Narendra Modi met Japanese Prime Minister Sanae Takaichi. The two leaders framed the deals as a push to secure supply chains and to jointly resist economic coercion.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMisgFBVV95cUxQdzFpMWZDTXlQMENEWENudWcwWThrNU00ZVp5UWQwWGp6QXd6d3ZBcmtjRnhLdFZzdFZvWjgxeWRLdDk0eEtiZWV1UGpEUWhhRlYtaHdtODVSNkdqdHlBR3lpYkpkOVNNWTdROHhEX0FlQzdlYTdmRThfd1ZVX2pkc3ZYYlVwdzVZUXU2TWh1c09NRGgyRVpWMEZ6RFhJVk5ld3pQLXlUdXZiRHE3WHBaTXZn?oc=5"
      },
      {
        "name": "Deccan Herald",
        "href": "https://www.deccanherald.com/india/india-japan-summit-modi-takaichi-to-launch-ai-cooperation-plan-push-back-against-economic-coercion-4057849"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-02",
    "image": {
      "src": "/covers/india-japan-strategic-pacts.png",
      "alt": "A grand, sunlit diplomatic conference room with a long polished table and rows of empty chairs, set for a summit.",
      "credit": "AI-generated"
    },
    "edition": "Afternoon Edition · 2 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Anglo-Japanese Agreement (Alliance), signed 30 January 1902",
        "excerpt": "The High Contracting Parties, having mutually recognised the independence of China and Corea, declare themselves to be entirely uninfluenced by any aggressive tendencies in either country.",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/Anglo-Japanese_Agreement_(1902)"
      },
      {
        "category": "historical",
        "title": "Treaty of Alliance between the United States and France, signed 6 February 1778",
        "excerpt": "The essential and direct End of the present defensive alliance is to maintain effectually the liberty, Sovereignty, and independance absolute and unlimited of the said united States, as well in Matters of Gouvernement as of commerce.",
        "source": "U.S. National Archives",
        "href": "https://www.archives.gov/milestone-documents/treaty-of-alliance-with-france"
      },
      {
        "category": "literary",
        "title": "Thucydides, History of the Peloponnesian War, Book I (trans. Richard Crawley)",
        "excerpt": "It was to be a defensive, not an offensive alliance. It did not involve a breach of the treaty with Peloponnese: Athens could not be required to join Corcyra in any attack upon Corinth.",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/files/7142/7142-h/7142-h.htm"
      },
      {
        "category": "literary",
        "title": "William Shakespeare, The Life of King Henry the Fifth, Act V, Scene 2 (Queen Isabel)",
        "excerpt": "God, the best maker of all marriages, / Combine your hearts in one, your realms in one! / As man and wife, being two, are one in love, / So be there 'twixt your kingdoms such a spousal, / That never may ill office, or fell jealousy, / Which troubles oft the bed of blessed marriage, / Thrust in between the paction of these kingdoms, / To make divorce of their incorporate league.",
        "source": "Perseus Digital Library, Tufts University",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.03.0043:act=5:scene=2"
      },
      {
        "category": "artistic",
        "title": "Gerard ter Borch, The Ratification of the Treaty of Münster, 1648",
        "excerpt": "Ter Borch, an eyewitness in Münster, records the exact moment envoys swear the oath confirming the peace that ended the Eighty Years' War and bound the Dutch and Spanish crowns to a settlement. Some seventy-seven soberly dressed diplomats crowd the town hall, hands raised, turning a diplomatic bargain into a solemn public compact. It is the first known oil painting to depict a real political treaty as sober fact rather than allegorical glory.",
        "source": "National Gallery, London (on loan from the Rijksmuseum, Amsterdam)",
        "href": "https://www.nationalgallery.org.uk/paintings/gerard-ter-borch-the-ratification-of-the-treaty-of-munster",
        "image": {
          "src": "/covers/india-japan-strategic-pacts--art.png",
          "alt": "Gerard ter Borch's 1648 painting of diplomats raising their hands to swear the oath ratifying the Treaty of Münster in the town hall.",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "George Frideric Handel, Music for the Royal Fireworks, HWV 351, 1749",
        "excerpt": "Commissioned by George II to crown the celebrations for the Treaty of Aix-la-Chapelle, Handel's suite turns a diplomatic settlement into public spectacle for massed trumpets, horns, oboes and drums. Its central movement, pointedly titled La Paix, sounds the peace itself before La Réjouissance breaks into rejoicing. The music makes audible the political hope that a signed accord can convert rivalry into shared triumph.",
        "source": "IMSLP (Petrucci Music Library)",
        "href": "https://imslp.org/wiki/Music_for_the_Royal_Fireworks,_HWV_351_(Handel,_George_Frideric)"
      }
    ],
    "rank": 3
  },
  {
    "slug": "south-korea-kospi-chip-selloff",
    "headline": "South Korea's Kospi plunges nearly 8% as investors dump chip shares",
    "overview": "South Korea's Kospi index fell almost 8% as a sharp sell-off in semiconductor stocks dragged Asian markets lower, unwinding part of a chip-fuelled rally. The slide hit heavyweights such as Samsung and SK Hynix and rippled across the region as traders braced for U.S. jobs data.",
    "genre": "Economy",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMijgFBVV95cUxQd054NTR5cGRhMk1DMi1qN1FNYmlBNXJILWFLTkE4ZXZBNnVmQml2WTdkRjZnQTAyeUJKSGJaUVhydVk5cW5VQmVyQktFZXVMLV95TFhUZG9mYVRwM0o2QzQxQlZGVVJrU05BQTVqUmpIVXduNGNVZjRvcUh5QzB1alVXMXdSUHU0bV9nMHZ3?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMie0FVX3lxTE9hNUdGZ1o0UkVpa1k0SDE5eG1CUlhJZGhIaklZMjV1VVEtekJxazZHMV8xT2lrU25mWlJuSVJxQ3ZtWF9iNEVsQk9tQjRqazRPUTRLYk9VWHVaRjM0a2FVa29SSUJfakV3MXU5Z0ZLTS1Gc0NhQmlQOEZZOA?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-02",
    "image": {
      "src": "/covers/south-korea-kospi-chip-selloff.png",
      "alt": "A darkened trading floor beneath a towering wall of plunging red bars, a lone silhouetted trader watching.",
      "credit": "AI-generated"
    },
    "edition": "Afternoon Edition · 2 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Tulipomania (Dutch tulip mania, 1636–1637), from Charles Mackay's \"Memoirs of Extraordinary Popular Delusions and the Madness of Crowds\" (1841)",
        "excerpt": "Nobles, citizens, farmers, mechanics, seamen, footmen, maidservants, even chimney-sweeps and old clotheswomen, dabbled in tulips. People of all grades converted their property into cash, and invested it in flowers. Houses and lands were offered for sale at ruinously low prices, or assigned in payment of bargains made at the tulip-mart.",
        "source": "Library of Economics and Liberty (Econlib)",
        "href": "https://www.econlib.org/book-chapters/chapter-ch-3-the-tulipomania/"
      },
      {
        "category": "historical",
        "title": "The South-Sea Bubble (London, 1720), from Charles Mackay's \"Memoirs of Extraordinary Popular Delusions and the Madness of Crowds\" (1841)",
        "excerpt": "Exchange Alley was every day blocked up by crowds, and Cornhill was impassable for the number of carriages.",
        "source": "Library of Economics and Liberty (Econlib)",
        "href": "https://www.econlib.org/book-chapters/chapter-ch-2-the-south-sea-bubble/"
      },
      {
        "category": "literary",
        "title": "Émile Zola, \"L'Argent\" (Money), 1891 — chapitre XI (the crash of the Banque Universelle)",
        "excerpt": "les actions de l'Universelle étaient tombées, coup sur coup, au-dessous du pair, à 430 francs ; et la baisse continuait, l'édifice craquait et s'écroulait, d'heure en heure.",
        "source": "Wikisource (French)",
        "href": "https://fr.wikisource.org/wiki/L%E2%80%99Argent_(Zola)/11"
      },
      {
        "category": "literary",
        "title": "Ecclesiastes 1:2, 14 (King James Version, 1611)",
        "excerpt": "Vanity of vanities, saith the Preacher, vanity of vanities; all is vanity. ... I have seen all the works that are done under the sun; and, behold, all is vanity and vexation of spirit.",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Ecclesiastes"
      },
      {
        "category": "artistic",
        "title": "William Hogarth, \"An Emblematical Print on the South Sea Scheme\" (1721)",
        "excerpt": "This monument was erected in memory of the destruction of the city by the South Sea in 1720.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:William_Hogarth_-_The_South_Sea_Scheme.png",
        "image": {
          "src": "/covers/south-korea-kospi-chip-selloff--art.png",
          "alt": "Hogarth's satirical engraving of the South Sea Bubble: a merry-go-round of speculators whirls around a maypole while a monument records the city's ruin by speculation.",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Jan Brueghel the Younger, \"Satire on Tulip Mania\" (c. 1640), oil on panel, Frans Hals Museum, Haarlem",
        "excerpt": "Brueghel casts the tulip speculators as finely dressed monkeys, gravely weighing bulbs, counting coins and drawing up contracts over a lavish dinner. As the market breaks, one ape is hauled before a magistrate while another urinates on the now-worthless flowers, and a fellow gambler weeps over his ruin. The painting turns a financial frenzy into a mocking parable of greed, folly and the sudden reckoning that follows a burst bubble.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Jan_Brueghel_the_Younger,_Satire_on_Tulip_Mania,_c._1640.jpg"
      }
    ],
    "rank": 4
  },
  {
    "slug": "openai-us-government-stake",
    "headline": "OpenAI proposes handing the US government a 5% stake, Financial Times reports",
    "overview": "OpenAI has proposed giving the U.S. government a roughly 5% equity stake as it tries to ease mounting political pressure in Washington, the Financial Times reported. Chief executive Sam Altman has floated the idea to senior Trump administration officials, suggesting other leading AI companies could cede similar stakes through a sovereign fund.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMirAFBVV95cUxNbUNkeGxUSzgzdlZ3STBUWGtaU3pHVUFhUWlCYWh6MVZKVjNnckJRTVBiNFF0d0ZvTjB0OWtGcWtxR1ZIY1lLVUdtSHQ4LXY3MUQ4ZHNIdkFyMzRuOXZkaEVqMDBaTjRkeXYzcGNTVWg2TEwxWUNVVFJDcEtSbUFnd2J1NzVJLXJPX3lHcG1icFh3YmxqMDR0cS1qTW85ZnpQeXBwdUNuQjBETmIw?oc=5"
      },
      {
        "name": "CNBC",
        "href": "https://www.cnbc.com/2026/07/02/openai-proposes-us-government-own-5percent-stake-to-address-political-blowback.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-02",
    "image": {
      "src": "/covers/openai-us-government-stake.png",
      "alt": "A glowing orb of blue light suspended beneath a domed marble rotunda, a small human figure standing far below.",
      "credit": "AI-generated"
    },
    "edition": "Afternoon Edition · 2 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Anglo-Persian Oil Company (Acquisition of Capital), speech by Winston Churchill, First Lord of the Admiralty (7 July 1914)",
        "excerpt": "I am arranging contracts in such a way as to obtain a continued and independent supply of oil from those regions, so that we shall be not only in possession of this supply of oil, but we shall be able to purchase the rest of the oil we require—only half being drawn from Persia—on terms which will be the result of fair and independent bargaining on each side, and not on terms which are those usually imposed upon a forced purchaser in a close and cornered market.",
        "source": "Hansard, House of Commons Debates, UK Parliament",
        "href": "https://api.parliament.uk/historic-hansard/commons/1914/jul/07/anglo-persian-oil-company-acquisition-of-1"
      },
      {
        "category": "historical",
        "title": "Bank of England Act 1694 (also called the Tonnage Act), 5 and 6 Will. and Mar. c. 20",
        "excerpt": "An Act for granting to theire Majesties severall Rates and Duties upon Tunnage of Shipps and Vessells and upon Beere Ale and other Liquors for secureing certaine Recompenses and Advantages in the said Act mentioned to such Persons as shall voluntarily advance the summe of [£1,500,000] towards the carrying on the Warr against France",
        "source": "legislation.gov.uk, The National Archives (enacted text)",
        "href": "https://www.legislation.gov.uk/aep/WillandMar/5-6/20/enacted"
      },
      {
        "category": "literary",
        "title": "The Prince, Chapter XIII (Concerning Auxiliaries, Mixed Soldiery, and One's Own), by Niccolò Machiavelli, trans. W. K. Marriott",
        "excerpt": "These arms may be useful and good in themselves, but for him who calls them in they are always disadvantageous; for losing, one is undone, and winning, one is their captive.",
        "source": "Project Gutenberg (ebook 1232)",
        "href": "https://www.gutenberg.org/files/1232/1232-h/1232-h.htm"
      },
      {
        "category": "literary",
        "title": "Faust, Part I, \"The Study\" scene, by Johann Wolfgang von Goethe, trans. Bayard Taylor",
        "excerpt": "When thus I hail the Moment flying:\n“Ah, still delay—thou art so fair!”\nThen bind me in thy bonds undying,\nMy final ruin then declare!",
        "source": "Project Gutenberg (ebook 14591)",
        "href": "https://www.gutenberg.org/files/14591/14591-h/14591-h.htm"
      },
      {
        "category": "artistic",
        "title": "The Sampling Officials of the Amsterdam Drapers' Guild, Known as 'The Syndics' (De Staalmeesters), by Rembrandt van Rijn, 1662",
        "excerpt": "Five soberly dressed guild officials look up from their ledger as though the viewer had just entered the room, catching a governing board mid-audit. Their authority is quiet but absolute: appointed to inspect and stamp every bale of cloth, they embody the marriage of civic power and private commerce that ran the Dutch trading economy. The portrait is a monument to a body that answered to both the city and the market at once.",
        "source": "Rijksmuseum, Amsterdam (SK-C-6)",
        "href": "https://www.rijksmuseum.nl/en/collection/object/The-Sampling-Officials-of-the-Amsterdam-Drapers-Guild-Known-as-The-Syndics--575b43f479d021359fb5f63b32f7c234",
        "image": {
          "src": "/covers/openai-us-government-stake--art.png",
          "alt": "Group portrait of five seated officials of the Amsterdam Drapers' Guild in black robes and hats around a table with a ledger, with a bareheaded servant behind them, by Rembrandt (1662).",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "The Return to Amsterdam of the Second Expedition to the East Indies, 19 July 1599, by Hendrik Cornelisz Vroom, 1599",
        "excerpt": "Four great merchant ships ride into the IJ, cannon firing in salute, swarmed by a flotilla of small boats crowded with jubilant citizens welcoming the spice fleet home. The triumphant homecoming of this pre-Company venture helped ignite the merger of rival traders into the chartered Dutch East India Company just three years later—a private enterprise soon armed with quasi-sovereign powers by the state. The painting captures the exact moment commerce and national fortune fused into a single spectacle.",
        "source": "Rijksmuseum, Amsterdam (SK-A-2858)",
        "href": "https://www.rijksmuseum.nl/en/collection/object/The-Return-to-Amsterdam-of-the-Second-Expedition-to-the-East-Indies--68e3266d15d285dcdf44379c4add1c7c"
      }
    ],
    "rank": 5
  },
  {
    "slug": "france-wildfires-heatwave",
    "headline": "Wildfires scorch southern France as firefighters battle blazes after European heatwave",
    "overview": "Hundreds of firefighters battled a wildfire that burned some 800 hectares in southern France's Hérault and Aude regions, forcing evacuations days after a deadly heatwave gripped Europe. Water-dumping aircraft were deployed as drought and strong winds spread the flames, with smaller fires breaking out near Marseille.",
    "genre": "Climate",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiowFBVV95cUxPR2h4ZHBiMThiaTBnRzk1UHM5WEc1eU5lUkVhMGU0amhvVVpzeU9TTnFYR3RJQ2Y5TUZ3S1I5UVBXQWwwNHJoUG9aVUZHVWRsbldGSU5XYUJKQWJqWjVuZ3FMUEJMbTBFMVdRUE5mUngtTmJFTHotZGMzazh5ZXo1ZTdLWlBzNWxYaXNsZ1k5eUFLTzR6bE9RVDRaZFdGV19HcmU0?oc=5"
      },
      {
        "name": "PBS NewsHour",
        "href": "https://www.pbs.org/newshour/world/a-heatwave-scorches-parts-of-europe-and-fans-wildfire-threat-in-southern-france"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-02",
    "image": {
      "src": "/covers/france-wildfires-heatwave.png",
      "alt": "Firefighters and a water-dropping aircraft tackling a wildfire on a dry hillside in southern France.",
      "credit": "AI-generated"
    },
    "edition": "Afternoon Edition · 2 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Diary of Samuel Pepys, entry for 2 September 1666 (the Great Fire of London), by Samuel Pepys",
        "excerpt": "the poor pigeons, I perceive, were loth to leave their houses, but hovered about the windows and balconys till they were, some of them burned... So we down to the water-side, and there got a boat and through bridge, and there saw a lamentable fire... we saw the fire as only one entire arch of fire from this to the other side the bridge, and in a bow up the hill for an arch of above a mile long: it made me weep to see it. The churches, houses, and all on fire and flaming at once; and a horrid noise the flames made, and the cracking of houses at their ruins.",
        "source": "Project Gutenberg — Diary of Samuel Pepys, Volume 45: August/September 1666 (Wheatley/Bright edition)",
        "href": "https://www.gutenberg.org/cache/epub/4167/pg4167.html"
      },
      {
        "category": "historical",
        "title": "The Annals of Tacitus, Book XV, chapter 38 (the Great Fire of Rome, 64 AD), by Tacitus, trans. Alfred John Church & William Jackson Brodribb",
        "excerpt": "It had its beginning in that part of the circus which adjoins the Palatine and Cælian hills, where, amid the shops containing inflammable wares, the conflagration both broke out and instantly became so fierce and so rapid from the wind that it seized in its grasp the entire length of the circus. For here there were no houses fenced in by solid masonry, or temples surrounded by walls, or any other obstacle to interpose delay. The blaze in its fury ran first through the level portions of the city, then rising to the hills, while it again devastated every place below them, it outstripped all preventive measures; so rapid was the mischief and so completely at its mercy the city, with those narrow winding passages and irregular streets, which characterised old Rome.",
        "source": "Perseus Digital Library, Tufts University",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0078:book=15:chapter=38"
      },
      {
        "category": "literary",
        "title": "The Aeneid, Book II (the burning of Troy), by Virgil, trans. John Dryden (1697)",
        "excerpt": "The palace of Deiphobus ascends / In smoky flames, and catches on his friends. / Ucalegon burns next: the seas are bright / With splendor not their own, and shine with Trojan light... Driv'n on the wings of winds, whole sheets of fire, / Thro' air transported, to the roofs aspire.",
        "source": "Wikisource — The Works of Virgil (Dryden), Aeneid, Book II",
        "href": "https://en.wikisource.org/wiki/The_Works_of_Virgil_(Dryden)/Aeneid/Book_II"
      },
      {
        "category": "literary",
        "title": "Metamorphoses, Book II (Phaethon sets the earth ablaze), by Ovid, trans. Sir Samuel Garth, John Dryden, et al. (1717)",
        "excerpt": "But these are trivial Ills: whole Cities burn, / And peopl'd Kingdoms into Ashes turn... The Mountains kindle as the Car draws near, / Athos and Tmolus red with Fires appear... The Ground, deep-cleft, admits the dazling Ray, / And startles Pluto with the Flash of Day.",
        "source": "Wikisource — Metamorphoses (tr. Garth, Dryden, et al.), Book II",
        "href": "https://en.wikisource.org/wiki/Metamorphoses_(tr._Garth,_Dryden,_et_al.)/Book_II"
      },
      {
        "category": "artistic",
        "title": "The Burning of the Houses of Lords and Commons, October 16, 1834 (c. 1835), by Joseph Mallord William Turner",
        "excerpt": "Turner, who witnessed the destruction of the Palace of Westminster among tens of thousands of spectators, transforms catastrophe into a vision of elemental force. A towering wall of orange-white flame erupts against the night, its glare doubled in the black water of the Thames and smearing the sky with smoke, while the fragile silhouettes of towers dissolve at the fire's edge. The plunging perspective of Westminster Bridge, crowded with tiny onlookers, measures human smallness against the conflagration—the same helplessness of a landscape overwhelmed by fire it cannot stop.",
        "source": "Philadelphia Museum of Art (John Howard McFadden Collection)",
        "href": "https://philamuseum.org/collection/object/103831",
        "image": {
          "src": "/covers/france-wildfires-heatwave--art.png",
          "alt": "J. M. W. Turner's painting of the 1834 fire at the Houses of Parliament, a towering blaze of orange flame and smoke reflected in the Thames beneath Westminster Bridge",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Feuerzauber (Magic Fire Music) from Die Walküre, WWV 86B, Act III (1856–70), by Richard Wagner",
        "excerpt": "As Wotan lays the sleeping Brünnhilde upon her rock, he summons Loge to encircle her with flame, and Wagner's orchestra answers with shimmering, flickering figuration—strings and woodwinds licking upward like tongues of fire over a glowing brass haze. The music makes an element audible: heat that ripples, crackles, and spreads, beautiful and untouchable at once. It renders in sound the double face of fire in the news from France—radiant and consuming, protective barrier and destroying force in the same blaze.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Die_Walk%C3%BCre,_WWV_86B_(Wagner,_Richard)"
      }
    ],
    "rank": 6
  },
  {
    "slug": "gaza-1000-days-war",
    "headline": "Gaza marks 1,000 days of war as Palestinians face an uncertain future",
    "overview": "The war in Gaza reached its 1,000th day, with more than two million Palestinians still largely displaced amid ruins and a fragile ceasefire scarred by continued attacks. Aid officials warned that reconstruction has stalled and that a return to any semblance of normal life remains far off.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMisAFBVV95cUxOUnBid29GQ1Vabk5YaVRvUklFZVJuRlNFUkZUT3gzbmoxYVdaZ3k0WEhlZHpneE00Q0pRMlByd3pyZ1pFQ25CMVhmdmdsTUlSR1Q1VmRWeGpjMzRrTFVRUklMWGtfNWdkM0Uwc1VieFFTLWZRTVl3dERpOVNRSm5uS2xwZzlzbzhRRkY4a191MU4tcWFuS0RmcWhNZkZ6ekRyS3ktVDBiakxnbVNRNWpRTQ?oc=5"
      },
      {
        "name": "South China Morning Post",
        "href": "https://www.scmp.com/news/world/middle-east/article/3359135/gaza-marks-1000-days-war-palestinians-there-face-uncertain-future"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-02",
    "image": {
      "src": "/covers/gaza-1000-days-war.png",
      "alt": "A displaced Palestinian family walking past destroyed buildings in Gaza.",
      "credit": "AI-generated"
    },
    "edition": "Afternoon Edition · 2 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Siege of Leningrad (1941–1944)",
        "excerpt": "For 872 days German and Finnish forces encircled a city and let hunger do the work of armies, cutting food, fuel and heat until roughly a million residents perished, most of them from starvation and cold. Those who survived measured time not in battles but in the slow erosion of ordinary life, sharing rationed bread and burying the dead in frozen ground. It stands as the archetype of a population trapped in place, enduring an assault that grinds on far longer than anyone imagines a city can withstand.",
        "source": "Encyclopaedia Britannica",
        "href": "https://www.britannica.com/event/Siege-of-Leningrad"
      },
      {
        "category": "historical",
        "title": "The Siege of Sarajevo (1992–1996)",
        "excerpt": "For nearly 1,400 days, the longest siege of a capital in modern history, Sarajevans lived under snipers and shellfire, hauling water past ruined tram lines and crossing streets that had become killing grounds. Reconstruction remained unthinkable while the encirclement held; survival meant improvised gardens, candlelit basements and a stubborn insistence on normal gestures amid rubble. When the guns finally fell silent, the wounded city faced years of rebuilding and a future that would never simply resume where it had been broken off.",
        "source": "Encyclopaedia Britannica",
        "href": "https://www.britannica.com/event/Siege-of-Sarajevo"
      },
      {
        "category": "literary",
        "title": "The Book of Lamentations 1:1–4 (King James Version, 1611)",
        "excerpt": "How doth the city sit solitary, that was full of people! how is she become as a widow! she that was great among the nations, and princess among the provinces, how is she become tributary! She weepeth sore in the night, and her tears are on her cheeks: among all her lovers she hath none to comfort her: all her friends have dealt treacherously with her, they are become her enemies. Judah is gone into captivity because of affliction, and because of great servitude: she dwelleth among the heathen, she findeth no rest: all her persecutors overtook her between the straits. The ways of Zion do mourn, because none come to the solemn feasts: all her gates are desolate: her priests sigh, her virgins are afflicted, and she is in bitterness.",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Lamentations"
      },
      {
        "category": "literary",
        "title": "Euripides, \"The Trojan Women\" (trans. E. P. Coleridge, 1891)",
        "excerpt": "Lift your head, unhappy one, from the ground; raise up your neck; this is Troy no more, no longer am I queen in Ilium. Though fortune change, endure your lot; sail with the stream, and follow fortune's tack, do not steer your ship of life against the tide, since chance must guide your course. Ah me! ah me! What else but tears is now my hapless lot, whose country, children, husband, all are lost?",
        "source": "Perseus Digital Library, Tufts University",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0124:card=98"
      },
      {
        "category": "artistic",
        "title": "Francisco de Goya, \"I saw it (Yo lo vi),\" Plate 44 of \"The Disasters of War,\" c. 1810 (published 1863)",
        "excerpt": "Goya's etching shows a panicked crowd of civilians in headlong flight, a mother clutching her child at the front as families flee across an empty landscape with only the bundles they can carry. The blunt title, \"I saw it,\" turns the artist and viewer into eyewitnesses of displacement, refusing any heroic framing of war. It renders the anonymous, repeatable catastrophe of ordinary people driven from their homes, an image of uprooting that outlasts the particular war that produced it.",
        "source": "The Metropolitan Museum of Art",
        "href": "https://www.metmuseum.org/art/collection/search/381372",
        "image": {
          "src": "/covers/gaza-1000-days-war--art.png",
          "alt": "Goya etching 'Yo lo vi' (I saw it): a crowd of civilians, including a mother and child, fleeing in terror across a barren landscape.",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Wolfgang Amadeus Mozart, Requiem in D minor, K.626 — \"Lacrimosa\" (1791)",
        "excerpt": "Lacrimosa dies illa, qua resurget ex favilla judicandus homo reus. Huic ergo parce, Deus.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Requiem_in_D_minor,_K.626_(Mozart,_Wolfgang_Amadeus)"
      }
    ],
    "rank": 7
  },
  {
    "slug": "onion-infowars-sandy-hook",
    "headline": "The Onion launches its Infowars parody, sending $100,000 to Sandy Hook families",
    "overview": "Satirical outlet The Onion launched its parody version of Alex Jones's Infowars, pledging an initial $100,000 from branded merchandise sales to families of the Sandy Hook shooting. The relaunch, built around mock livestreams and a licensing deal, proceeds even as Jones fights the takeover of his brand in court.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMipAFBVV95cUxOWU9Ccmx5a1RWM3RIV3dFTUQ4dExWU3YyOTJESUhZTFBjUnZpU3NJeC1kUXFOT1dmbG1JTXBOV2pqNWdYN0x2eUZBSkw1aWdTNGhCYUhlLU5lMTV4RjZfY1hFMHdiT2hhMzB1NmNpZkFNOXRfNGVpUjhjcVNTNlI4Nkl2RUhxWHluMThUMXZHU1NfLVh0bGJIV2QzaE9pMUVZbEx1Nw?oc=5"
      },
      {
        "name": "The Boston Globe",
        "href": "https://www.bostonglobe.com/2026/07/02/nation/the-onion-alex-jones-infowars/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-02",
    "image": {
      "src": "/covers/onion-infowars-sandy-hook.png",
      "alt": "A studio microphone and 'On Air' broadcast sign in a talk-radio set.",
      "credit": "AI-generated"
    },
    "edition": "Afternoon Edition · 2 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Thomas Nast's cartoons against \"Boss\" Tweed and the Tammany Ring (1871)",
        "excerpt": "Two great questions. \"Who is Ingersoll's Co.?\" — \"Who stole the people's money? / Do tell.\"",
        "source": "Library of Congress, Prints & Photographs Division (Harper's Weekly)",
        "href": "https://www.loc.gov/item/2006685392/"
      },
      {
        "category": "historical",
        "title": "Voltaire and the Calas affair — Traité sur la tolérance (1763)",
        "excerpt": "LE meurtre de Calas, commis dans Toulouse avec le glaive de la Justice, le 9me Mars 1762, est un des plus singuliers événements qui méritent l'attention de notre âge & de la postérité.",
        "source": "Wikisource (Édition 1763, ch. I: Histoire abrégée de la mort de Jean Calas)",
        "href": "https://fr.wikisource.org/wiki/Trait%C3%A9_sur_la_tol%C3%A9rance/%C3%89dition_1763/01"
      },
      {
        "category": "literary",
        "title": "Jonathan Swift, \"A Modest Proposal\" (1729)",
        "excerpt": "I have been assured by a very knowing American of my acquaintance in London, that a young healthy child well nursed, is, at a year old, a most delicious nourishing and wholesome food, whether stewed, roasted, baked, or boiled; and I make no doubt that it will equally serve in a fricassee, or a ragout.",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/files/1080/1080-h/1080-h.htm"
      },
      {
        "category": "literary",
        "title": "Aristophanes, \"The Knights\" (Equites, 424 BC), tr. Eugene O'Neill, Jr.",
        "excerpt": "Oh! alas! alas! Oh! woe! oh! woe! Miserable Paphlagonian! may the gods destroy both him and his cursed advice! Since that evil day when this new slave entered the house he has never ceased belaboring us with blows.",
        "source": "Perseus Digital Library, Tufts University",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0034"
      },
      {
        "category": "artistic",
        "title": "Honoré Daumier, \"Gargantua\" (lithograph, La Caricature, 16 December 1831)",
        "excerpt": "Daumier draws King Louis-Philippe as Rabelais's insatiable giant, enthroned on a commode and gorging on baskets of gold hauled up a ramp from the emptied pockets of the poor. From the well-fed monarch the plunder is excreted back as commissions and honours scrambled for by his cronies below. For this mockery the stone was destroyed, the print banned, and Daumier jailed for six months — proof of how much a caricature could frighten power.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Honor%C3%A9_Daumier_-_Gargantua.jpg",
        "image": {
          "src": "/covers/onion-infowars-sandy-hook--art.png",
          "alt": "Honoré Daumier's 1831 lithograph \"Gargantua\" depicting King Louis-Philippe as a giant devouring gold coins carried up a ramp",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Charles Philipon, \"Les Poires\" — Louis-Philippe as a pear (Le Charivari, 1834; after the 1831 original)",
        "excerpt": "In four deft strokes Philipon morphs the jowly face of King Louis-Philippe into a common pear — a joke he first sketched at his own press trial to argue that any resemblance was the censor's problem, not his. The \"poire\" became an emblem of resistance the throne could not suppress; banned as a drawing, it reappeared spelled out in type and scrawled on walls across Paris. The jester's single image turned the monarch into a walking punchline.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Les_Poires_(1834)_(cropped).jpg"
      }
    ],
    "rank": 8
  },
  {
    "slug": "microsoft-lightstorm-undersea-cable",
    "headline": "Microsoft and Lightstorm to build India–Southeast Asia undersea cable for AI traffic",
    "overview": "Microsoft joined a consortium led by Singapore's Lightstorm to build a 3,600-kilometre undersea cable, called I-2SEA, linking India with Malaysia and Singapore to feed surging AI and cloud demand. The system, with partners including Tata Communications and NEC, is expected to enter service in late 2029.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiywFBVV95cUxNSVkwdWpuTlF6d2w2QVpYbGlSZ2RHbzlkTTFtYkRabnlKbE9KVlB1S1VldTdvUDlMTDlsREk2SVlyMDQzVDZzWnNpUzhQdDRUcW45TEg5dEV2RlNZcm9BUk1PMExtR21QNk8yLTRRb0xtQWR1cHgySzNZV3lMQmg3eUNtRGdUWmJOdmh4U3hzT283UHJpbDIzcGtkOWJYYlE0TDd3MjhuY0hBSDJYdGN5d2JFTHkxMEN4Mkh4QVkwSWxpbkxtaUwyUUVkbw?oc=5"
      },
      {
        "name": "Yahoo Finance",
        "href": "https://finance.yahoo.com/technology/articles/microsoft-partners-singapores-lightstorm-build-033554631.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-02",
    "image": {
      "src": "/covers/microsoft-lightstorm-undersea-cable.png",
      "alt": "A submarine fibre-optic cable being laid from the deck of a cable-laying ship at sea.",
      "credit": "AI-generated"
    },
    "edition": "Afternoon Edition · 2 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The first transatlantic telegraph cable (1858, permanently in 1866)",
        "excerpt": "In August 1858 the frigates Agamemnon and Niagara met in mid-ocean, spliced their cable ends and paid out a copper thread across some two thousand miles of Atlantic floor, letting Queen Victoria and President Buchanan exchange greetings that had lately taken ten days by ship. That first line failed within weeks, but in 1866 Brunel's colossal Great Eastern laid a durable cable from Ireland to Newfoundland, and the Old and New Worlds could suddenly speak in minutes rather than weeks. Contemporaries hailed the deep-sea wire as the nervous system of a newly shrunken planet, the same promise now made for an AI-era artery beneath the Indian Ocean.",
        "source": "The Story of the Atlantic Telegraph, Henry M. Field (Project Gutenberg)",
        "href": "https://www.gutenberg.org/ebooks/34765"
      },
      {
        "category": "historical",
        "title": "The opening of the Suez Canal (17 November 1869)",
        "excerpt": "On 17 November 1869 the imperial yacht L'Aigle led a flotilla of some forty ships into Ferdinand de Lesseps' new canal, a hundred-mile channel cut through the isthmus to join the Mediterranean with the Red Sea. At a stroke the sea route from Europe to India and the Far East was shortened by thousands of miles, sparing vessels the long haul around the Cape of Good Hope. Like a fresh artery slashed through desert sand, the canal rerouted the commerce of empires and pulled distant continents into faster, closer contact.",
        "source": "Fondation Napoléon – Inauguration Ceremony of the Suez Canal at Port-Said, 17 November 1869",
        "href": "https://www.napoleon.org/en/history-of-the-two-empires/paintings/inauguration-ceremony-of-the-suez-canal-at-port-said-17-november-1869/"
      },
      {
        "category": "literary",
        "title": "\"The Deep-Sea Cables,\" Rudyard Kipling (from The Seven Seas, 1896)",
        "excerpt": "The wrecks dissolve above us; their dust drops down from afar—\nDown to the dark, to the utter dark, where the blind white sea-snakes are.\nThere is no sound, no echo of sound, in the deserts of the deep,\nOr the great gray level plains of ooze where the shell-burred cables creep.\n\nHere in the womb of the world—here on the tie-ribs of earth\nWords, and the words of men, flicker and flutter and beat—\nWarning, sorrow and gain, salutation and mirth—\nFor a Power troubles the Still that has neither voice nor feet.\n\nThey have wakened the timeless Things; they have killed their father Time;\nJoining hands in the gloom, a league from the last of the sun.\nHush! Men talk to-day o'er the waste of the ultimate slime,\nAnd a new Word runs between: whispering, \"Let us be one!\"",
        "source": "The Seven Seas, Rudyard Kipling (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/27870/27870-h/27870-h.htm"
      },
      {
        "category": "literary",
        "title": "\"Passage to India,\" Walt Whitman (1871; Leaves of Grass)",
        "excerpt": "Passage to India!\nLo, soul, seest thou not God's purpose from the first?\nThe earth to be spann'd, connected by network,\nThe races, neighbors, to marry and be given in marriage,\nThe oceans to be cross'd, the distant brought near,\nThe lands to be welded together.\n\nIn the Old World the east the Suez canal,\nThe New by its mighty railroad spann'd,\nThe seas inlaid with eloquent gentle wires;",
        "source": "Leaves of Grass (1882), Walt Whitman (Wikisource)",
        "href": "https://en.wikisource.org/wiki/Leaves_of_Grass_(1882)/Passage_to_India"
      },
      {
        "category": "artistic",
        "title": "The Eighth Wonder of the World – The Atlantic Cable (Kimmel & Forster, New York, 1866)",
        "excerpt": "This exuberant allegorical lithograph crowns the completion of the 1866 Atlantic cable as a modern marvel. The submarine wire arcs across the ocean from the paw of a British lion to the talon of an American eagle, while Neptune reclines below and a portrait of promoter Cyrus W. Field presides above the flag-draped scene. The ports of London and Manhattan shimmer on either shore, their clock towers marking the time zones now bridged in an instant — a Victorian vision of two continents wired into one.",
        "source": "Library of Congress, Prints & Photographs Division",
        "href": "https://www.loc.gov/item/93510355/",
        "image": {
          "src": "/covers/microsoft-lightstorm-undersea-cable--art.png",
          "alt": "1866 allegorical lithograph of the Atlantic telegraph cable arcing across the ocean between a British lion and an American eagle, with Neptune below and a portrait of Cyrus Field above.",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "The Atlantic Telegraph Cable Fleet Assembled at Berehaven, Robert Charles Dudley (1865–1866)",
        "excerpt": "Dudley, the official artist of the 1865–66 expeditions, shows the cable fleet gathered off the southwest coast of Ireland before setting out to sea. At the center looms the vast hull of the Great Eastern — the only ship large enough to carry the coiled deep-sea cable — flanked by H.M.S. Terrible and the tenders Alby, Medway and William Cory. The calm, ceremonial gathering of ships captures the sheer industrial scale required to lay a single thread of connection between continents.",
        "source": "The Metropolitan Museum of Art, New York",
        "href": "https://www.metmuseum.org/art/collection/search/383832"
      }
    ],
    "rank": 9
  },
  {
    "slug": "new-jersey-medicaid-employer-fee",
    "headline": "New Jersey to charge employers whose workers rely on Medicaid",
    "overview": "New Jersey Governor Mikie Sherrill signed a measure charging companies with at least 50 workers covered by Medicaid, a fee the state expects to raise about $145 million this year. Per-worker charges range from $325 to $725 a year, and officials say other states are weighing similar moves as federal changes strain the program.",
    "genre": "Economy",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMilgFBVV95cUxNZDA1bGpRNHVjRzFnanAxUkVOTURkaEtXbFNoWUsyaHpCZWF4Y1NDYWNKSmtjcEpJRkVZVUQ0ODNMaV9BaTVnbS1mcmNncVhERVBkMjFoZ0p3S2d1Ym81c1QzQ2N4VDI5TTRCM09ZSDhWYmJ2SnB3SzVjY2Z6NjlGX2RxLTJMeWdaRUFWRzFjUWhvSDZWdmc?oc=5"
      },
      {
        "name": "The Boston Globe",
        "href": "https://www.bostonglobe.com/2026/07/02/nation/new-jersey-charge-companies-with-workers-on-medicaid/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-02",
    "image": {
      "src": "/covers/new-jersey-medicaid-employer-fee.png",
      "alt": "A stethoscope and a plain folder resting on a bench in a quiet, dimly lit clinic waiting room.",
      "credit": "AI-generated"
    },
    "edition": "Afternoon Edition · 2 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "An Acte for the Reliefe of the Poore (43 Elizabeth I, c. 2), 1601",
        "excerpt": "And also to raise weekly or otherwise (by taxation of every Inhabitant, Parson, Vicar, and other, and of every occupier of Lands, Houses, Tithes impropriate, or Propriations of Tithes, Coalmines, or saleable underwoods in the said Parish, in such competent sum and sums of money as they think fit) a convenient stock of Flax, Hemp, Wool, Thread, iron, and other necessary ware and stuff to set the poor on work, and also competent sums of money, for, and towards the necessary relief of the lame, impotent, old, blind, and such other among them being poor, and not able to work, and also for the putting out of such children to be apprentices, to be gathered out of the same Parish.",
        "source": "The Statutes Project — full text of the Elizabethan Poor Law of 1601",
        "href": "https://statutes.org.uk/site/the-statutes/seventeenth-century/1601-43-elizabeth-c-2-act-for-the-relief-of-the-poor/"
      },
      {
        "category": "historical",
        "title": "Bismarck's Reichstag Speech on the Law for Workers' Compensation (March 15, 1884)",
        "excerpt": "Defending Germany's pioneering insurance laws, Bismarck argued that a modern state has a positive duty to care for its helpless, injured, and aged citizens rather than abandon them to private charity or the poorhouse. Financed by compulsory contributions from employers and workers alike, his sickness, accident, and old-age insurance schemes bound the very industries that profited from labor to the upkeep of the laborers they used up. He framed it as both a Christian obligation and a shrewd means of drawing the poor away from revolution.",
        "source": "German History in Documents and Images (GHDI), trans. in University of Chicago Readings in Western Civilization, vol. 8",
        "href": "https://germanhistorydocs.org/en/forging-an-empire-bismarckian-germany-1866-1890/bismarck-s-reichstag-speech-on-the-law-for-workers-compensation-march-15-1884"
      },
      {
        "category": "literary",
        "title": "A Christmas Carol, by Charles Dickens (1843), Stave One",
        "excerpt": "\"The Treadmill and the Poor Law are in full vigour, then?\" said Scrooge.\n\n\"Both very busy, sir.\"\n\n\"Oh! I was afraid, from what you said at first, that something had occurred to stop them in their useful course,\" said Scrooge. \"I'm very glad to hear it.\"\n\n\"Under the impression that they scarcely furnish Christian cheer of mind or body to the multitude,\" returned the gentleman, \"a few of us are endeavouring to raise a fund to buy the Poor some meat and drink, and means of warmth. We choose this time, because it is a time, of all others, when Want is keenly felt, and Abundance rejoices. What shall I put you down for?\"\n\n\"Nothing!\" Scrooge replied.",
        "source": "Project Gutenberg, eBook #46",
        "href": "https://www.gutenberg.org/files/46/46-0.txt"
      },
      {
        "category": "literary",
        "title": "The Gospel According to St. Matthew 25:34-40 (King James Bible, 1611/1769)",
        "excerpt": "Then shall the King say unto them on his right hand, Come, ye blessed of my Father, inherit the kingdom prepared for you from the foundation of the world: For I was an hungred, and ye gave me meat: I was thirsty, and ye gave me drink: I was a stranger, and ye took me in: Naked, and ye clothed me: I was sick, and ye visited me: I was in prison, and ye came unto me. Then shall the righteous answer him, saying, Lord, when saw we thee an hungred, and fed thee? or thirsty, and gave thee drink? When saw we thee a stranger, and took thee in? or naked, and clothed thee? Or when saw we thee sick, or in prison, and came unto thee? And the King shall answer and say unto them, Verily I say unto you, Inasmuch as ye have done it unto one of the least of these my brethren, ye have done it unto me.",
        "source": "Wikisource — Bible (King James), Matthew",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Matthew"
      },
      {
        "category": "artistic",
        "title": "The Potato Eaters, by Vincent van Gogh (1885)",
        "excerpt": "Van Gogh's dim, earthen scene gathers five peasants around a single dish of potatoes beneath one hanging lamp, their knotted hands and weathered faces the same colour as the soil they work. He meant the picture as an honest reckoning with rural poverty: these are people who have dug the earth with the very hands now reaching for their meagre supper, laborers whose toil sustains a society that barely sustains them in return.",
        "source": "Van Gogh Museum, Amsterdam — via Wikimedia Commons (Google Art Project)",
        "href": "https://commons.wikimedia.org/wiki/File:Vincent_van_Gogh_-_The_potato_eaters_-_Google_Art_Project_(5776925).jpg",
        "image": {
          "src": "/covers/new-jersey-medicaid-employer-fee--art.png",
          "alt": "Vincent van Gogh's 1885 painting The Potato Eaters, showing five poor peasants sharing a plate of potatoes by lamplight in a dark cottage.",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Applicants for Admission to a Casual Ward, by Luke Fildes (1874)",
        "excerpt": "Fildes lines up a ragged crowd of the destitute — a shivering mother with an infant, a broken laborer, exhausted children — waiting against a cold wall outside a police station for a ticket that might admit them to the workhouse for a single night. Grown from a sketch titled 'Houseless and Hungry,' this landmark of Victorian social realism forced comfortable gallery-goers to look directly at the human cost of the Poor Law, at those the prosperous city had left to queue for charity in the dark.",
        "source": "Tate, London — via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Applicants_for_Admission_to_a_Casual_Ward.jpg"
      }
    ],
    "rank": 10
  },
  {
    "slug": "europe-leaders-close-ranks-trump",
    "headline": "Europe's leaders close ranks amid barbs and pressure from Trump",
    "overview": "European leaders rallied around Italian Prime Minister Giorgia Meloni after President Donald Trump questioned Italy's reliability and mocked her standing, thawing ties once strained by her hard-right roots. Analysts said the episode is drawing European governments closer on defence, trade and foreign policy ahead of a NATO summit in Turkey.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMimgFBVV95cUxOMi0tMUp4U2tXN2pRRTA1QzBqQXZkbFBjQ3lTZmRJZU1lS0pPY096Qm1fMU9rbV9RMGxObUdnaTdkYjhWemFNODh1OWNvdkxLTWNZRWUtWHhIaXhtN0VBeU9FRkdYcm1tSmZlWFF4Q1l0RE0wR2x4aFhFWjFfSUp3UEs5UlRnZm5mMG1DbHZyX0NEbU1ERzZFNW1B?oc=5"
      },
      {
        "name": "The Washington Post",
        "href": "https://www.washingtonpost.com/world/2026/07/02/italy-europe-trump-meloni-iran-war/e4055bae-75cb-11f1-b665-5f8be87f3787_story.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-02",
    "image": {
      "src": "/covers/europe-leaders-close-ranks-trump.png",
      "alt": "European Union flags flying outside a government building in Europe.",
      "credit": "AI-generated"
    },
    "edition": "Afternoon Edition · 2 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Hellenic League against Persia (Congress at the Isthmus of Corinth, 481 BC)",
        "excerpt": "Facing the vast invasion force of Xerxes, the fractious and habitually feuding Greek city-states set aside their quarrels and met at the Isthmus of Corinth to swear common cause. Athens and Sparta, longtime rivals, agreed to pool their fleets and armies under a shared command against the Persian giant. It was the external menace, not any prior affection, that forged the alliance which would hold at Salamis and Plataea.",
        "source": "Herodotus, The Histories, Book 7 (trans. George Rawlinson, 1858), on Wikisource",
        "href": "https://en.wikisource.org/wiki/The_History_of_Herodotus_(Rawlinson)/Book_7"
      },
      {
        "category": "historical",
        "title": "The Lombard League and the Peace of Constance (1183)",
        "excerpt": "When Emperor Frederick Barbarossa pressed his imperial claims over the wealthy towns of northern Italy, once-competing communes such as Milan, Verona and Cremona bound themselves into the Lombard League. Their combined militias broke the emperor's cavalry at Legnano in 1176, and the Peace of Constance in 1183 forced him to recognize their liberties and self-government. A domineering overlord had inadvertently welded scattered, jealous cities into a durable defensive union.",
        "source": "Internet Medieval Sourcebook, Fordham University (Diet of Roncaglia and the Peace of Constance)",
        "href": "https://sourcebooks.web.fordham.edu/source/barbarossa-lombards.asp"
      },
      {
        "category": "literary",
        "title": "Herodotus, The Histories, Book 8.144 (the Athenians' reply to Sparta; trans. George Rawlinson, 1858)",
        "excerpt": "Again, there is our common brotherhood with the Greeks: our common language, the altars and the sacrifices of which we all partake, the common character which we bear - did the Athenians betray all these, of a truth it would not be well. Know then now, if ye have not known it before, that while one Athenian remains alive, we will never join alliance with Xerxes.",
        "source": "Wikisource, The History of Herodotus (Rawlinson), Book 8",
        "href": "https://en.wikisource.org/wiki/The_History_of_Herodotus_(Rawlinson)/Book_8"
      },
      {
        "category": "literary",
        "title": "Aesop, \"The Bundle of Sticks\", Aesop's Fables (trans. V. S. Vernon Jones, 1912)",
        "excerpt": "An old man on the point of death summoned his sons around him to give them some parting advice. He ordered his servants to bring in a faggot of sticks, and said to his eldest son: \"Break it.\" The son strained and strained, but with all his efforts was unable to break the Bundle. The other sons also tried, but none of them was successful. \"Untie the faggots,\" said the father, \"and each of you take a stick.\" When they had done so, he called out to them: \"Now, break,\" and each stick was easily broken. \"You see my meaning,\" said their father.\n\nUnion gives strength.",
        "source": "Project Gutenberg, Aesop's Fables (EBook #28)",
        "href": "https://www.gutenberg.org/files/28/28-h/28-h.htm"
      },
      {
        "category": "artistic",
        "title": "Jacques-Louis David, \"The Oath of the Horatii\" (Le Serment des Horaces), 1784-1785",
        "excerpt": "Three brothers thrust their arms out in unison toward the raised swords their father holds aloft, their bodies drawn taut into a single line of resolve. David freezes the instant private feeling is surrendered to a shared vow, the grieving women collapsed to one side underscoring the cost of that solidarity. It became the defining image of citizens binding themselves together for a cause greater than any of them alone.",
        "source": "Musee du Louvre, collections online object page",
        "href": "https://collections.louvre.fr/en/ark:/53355/cl010062239",
        "image": {
          "src": "/covers/europe-leaders-close-ranks-trump--art.png",
          "alt": "Jacques-Louis David's Oath of the Horatii: three brothers stretch their arms toward their father, who holds up three swords, as women mourn at the right.",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Johann Heinrich Fussli (Henry Fuseli), \"The Oath on the Rutli\" (Die drei Eidgenossen beim Schwur auf dem Rutli), 1780",
        "excerpt": "Three men from separate Alpine valleys clasp their swords together and raise their arms as one, sealing the founding oath of the Swiss Confederation against Habsburg domination. Fuseli lights the figures dramatically against darkness, making the moment of union feel like a sacred, almost superhuman pact. Small, independent communities are shown fusing into a single body precisely because a mightier power threatens them all.",
        "source": "Kunsthaus Zurich (inv. 1989/0015), via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Henry_Fuseli_-_Die_drei_Eidgenossen_beim_Schwur_auf_dem_R%C3%BCtli_-_1989-0015_-_Kunsthaus_Z%C3%BCrich.jpg"
      }
    ],
    "rank": 11
  },
  {
    "slug": "puerto-rico-hurricane-funds-audit",
    "headline": "Federal audit finds Puerto Rico still awaiting billions in grid funds nearly a decade after Hurricane Maria",
    "overview": "A federal audit found that only about a quarter of some $14 billion obligated to rebuild Puerto Rico's power grid after Hurricane Maria has actually reached the island nearly nine years on. Democratic lawmakers who released the 86-page report said residents had watched billions be appropriated while almost none of it arrived.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMirwFBVV95cUxOdjNSNFZKRWNHdXZhb0J6Tk1tV1RqSnotQmtJb0V1UnlZckt6czBSdURuY0NHV251RXhMSXBTanZxVnhrY0RWSXFybVc1LWtXa0llS2ZoaFdmM29HaUtfZk1WU3BXQWI5Y2pYdHZRQTNsQUZwcGM4aUxaTW16WTloYWZhd0UyT052VkI1NDU5WGE1MG1CU2J1NW03V2FvaTdsZmN4QXRETTJxTnNWcHE0?oc=5"
      },
      {
        "name": "The Washington Post",
        "href": "https://www.washingtonpost.com/business/2026/07/01/gao-audit-puerto-rico-hurricane-federal-funds-grid/937cf95e-75ac-11f1-b665-5f8be87f3787_story.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-02",
    "image": {
      "src": "/covers/puerto-rico-hurricane-funds-audit.png",
      "alt": "Damaged electrical transmission towers and power lines in Puerto Rico.",
      "credit": "AI-generated"
    },
    "edition": "Afternoon Edition · 2 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "\"The Story of an Eyewitness\" — Jack London on the 1906 San Francisco earthquake and fire (Collier's, 1906)",
        "excerpt": "Not in history has a modern imperial city been so completely destroyed. San Francisco is gone. Nothing remains of it but memories and a fringe of dwelling-houses on its outskirts.",
        "source": "Jack London, eyewitness dispatch for Collier's, 1906 (UCSB Understanding Earthquakes archive)",
        "href": "https://projects.eri.ucsb.edu/understanding/accounts/london.html"
      },
      {
        "category": "historical",
        "title": "History of the Johnstown Flood — Willis Fletcher Johnson (1889)",
        "excerpt": "All day long men, women, and children were plodding about the desolate waste looking in vain to locate the boundaries of their former homes.",
        "source": "Project Gutenberg, History of the Johnstown Flood by Willis Fletcher Johnson (1889)",
        "href": "https://www.gutenberg.org/files/41271/41271-h/41271-h.htm"
      },
      {
        "category": "literary",
        "title": "\"The Lisbon Earthquake\" (Poem on the Lisbon Disaster) — Voltaire, 1756 (trans. W. F. Fleming)",
        "excerpt": "Oh wretched man, earth-fated to be cursed;\nAbyss of plagues, and miseries the worst!\nHorrors on horrors, griefs on griefs must show,\nThat man's the victim of unceasing woe,\nAnd lamentations which inspire my strain,\nProve that philosophy is false and vain.\nApproach in crowds, and meditate awhile\nYon shattered walls, and view each ruined pile,\nWomen and children heaped up mountain high,\nLimbs crushed which under ponderous marble lie;\nWretches unnumbered in the pangs of death,\nWho mangled, torn, and panting for their breath,\nBuried beneath their sinking roofs expire,",
        "source": "Wikisource, The Works of Voltaire, Volume 36",
        "href": "https://en.wikisource.org/wiki/The_Works_of_Voltaire/Volume_36/The_Lisbon_Earthquake"
      },
      {
        "category": "literary",
        "title": "The Book of Lamentations, Chapter 1 (King James Version, 1611)",
        "excerpt": "How doth the city sit solitary, that was full of people! how is she become as a widow! she that was great among the nations, and princess among the provinces, how is she become tributary! She weepeth sore in the night, and her tears are on her cheeks: among all her lovers she hath none to comfort her: all her friends have dealt treacherously with her, they are become her enemies. Judah is gone into captivity because of affliction, and because of great servitude: she dwelleth among the heathen, she findeth no rest: all her persecutors overtook her between the straits. The ways of Zion do mourn, because none come to the solemn feasts: all her gates are desolate: her priests sigh, her virgins are afflicted, and she is in bitterness.",
        "source": "Wikisource, Bible (King James) / Lamentations",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Lamentations"
      },
      {
        "category": "artistic",
        "title": "The Course of Empire: Desolation — Thomas Cole (1836)",
        "excerpt": "In the last canvas of Cole's five-part cycle the proud city has become a silent ruin. The sun has set and a pale moon climbs a twilight sky as ivy swallows the shattered colonnades and a lone heron nests on a broken column. What men built and celebrated has been abandoned to time; the empire that once thronged these streets is gone, leaving only overgrown wreckage where a people used to live.",
        "source": "Wikimedia Commons (original in the New-York Historical Society)",
        "href": "https://commons.wikimedia.org/wiki/File:Cole_Thomas_The_Course_of_Empire_Desolation_1836.jpg",
        "image": {
          "src": "/covers/puerto-rico-hurricane-funds-audit--art.png",
          "alt": "Twilight over the ivy-grown ruins of a fallen classical city, a lone column standing amid shattered colonnades beside a still river, from Thomas Cole's 1836 painting Desolation.",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Requiem in D minor, K.626 — Wolfgang Amadeus Mozart (1791)",
        "excerpt": "Requiem aeternam dona eis, Domine: et lux perpetua luceat eis. (Grant them eternal rest, O Lord: and let perpetual light shine upon them.)",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Requiem_in_D_minor,_K.626_(Mozart,_Wolfgang_Amadeus)"
      }
    ],
    "rank": 12
  },
  {
    "slug": "davidson-prize-routemaster-playgrounds",
    "headline": "Davidson Prize goes to plan turning retired London Routemaster buses into mobile playgrounds",
    "overview": "R.U.A Studio won the 2026 Davidson Prize for Playdeck, a proposal to convert more than 1,000 decommissioned New Routemaster buses into intergenerational mobile playgrounds parked in neighbourhoods short of play space. Each bus would carry modular play blocks that unpack into a climbing-and-gathering landscape, with the concept unveiled during the London Festival of Architecture.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Dezeen",
        "href": "https://www.dezeen.com/2026/07/02/rua-studio-playdeck-davidson-prize/"
      },
      {
        "name": "Architects' Journal",
        "href": "https://www.architectsjournal.co.uk/news/davidson-prize-2026-reveals-playful-winning-concept"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-02",
    "image": {
      "src": "/covers/davidson-prize-routemaster-playgrounds.png",
      "alt": "A retired red London Routemaster double-decker bus reimagined as a children's play space.",
      "credit": "AI-generated"
    },
    "edition": "Afternoon Edition · 2 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "\"They shall beat their swords into plowshares\" — Isaiah 2:4, King James Bible (1611)",
        "excerpt": "And he shall judge among the nations, and shall rebuke many people: and they shall beat their swords into plowshares, and their spears into pruninghooks: nation shall not lift up sword against nation, neither shall they learn war any more.",
        "source": "The Book of Isaiah, chapter 2, verse 4 (Authorized King James Version)",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Isaiah"
      },
      {
        "category": "historical",
        "title": "The Emdrup Junk Playground — Carl Theodor Sørensen, Copenhagen (opened 1943)",
        "excerpt": "In the middle of the Nazi occupation of Denmark, Carl Theodor Sørensen carved out a fenced patch of Copenhagen where city children could dig, build and invent with scrap timber, tools and salvaged junk. The first planned adventure playground was born not from new equipment but from cast-off material and free imagination, and is now cited as the birthplace of playwork. Its lesson runs straight to Playdeck: give children discarded stuff, a little space, and their play remakes the leftovers of the adult world into something alive.",
        "source": "Emdrup Junk Playground (Skrammellegepladsen), designed by landscape architect Carl Theodor Sørensen with pedagogue John Bertelsen",
        "href": "https://en.wikipedia.org/wiki/Emdrup_Junk_Playground"
      },
      {
        "category": "literary",
        "title": "Letters on the Aesthetic Education of Man, Letter XV — Friedrich Schiller (1795)",
        "excerpt": "For, to speak out once for all, man only plays when in the full meaning of the word he is a man, and he is only completely a man when he plays.",
        "source": "Friedrich Schiller, On the Aesthetic Education of Man in a Series of Letters, Letter XV",
        "href": "https://monadnock.net/schiller/letter-15.html"
      },
      {
        "category": "literary",
        "title": "\"The Ecchoing Green,\" from Songs of Innocence — William Blake (1789)",
        "excerpt": "The Sun does arise,\nAnd make happy the skies.\nThe merry bells ring\nTo welcome the Spring.\nThe sky-lark and thrush,\nThe birds of the bush,\nSing louder around,\nTo the bells' chearful sound.\nWhile our sports shall be seen\nOn the Ecchoing Green.",
        "source": "William Blake, Songs of Innocence and of Experience, \"The Ecchoing Green\" (first stanza)",
        "href": "https://en.wikisource.org/wiki/Songs_of_Innocence_and_of_Experience_(1826)/Songs_of_Innocence/The_Ecchoing_Green"
      },
      {
        "category": "artistic",
        "title": "Children's Games (Kinderspiele) — Pieter Bruegel the Elder (1560)",
        "excerpt": "From a raised, bird's-eye vantage Bruegel fills an entire town square with more than two hundred children absorbed in some eighty-three different games, from hobby-horses and hoops to leapfrog and blind man's buff. There are no adults at play; the whole urban space has been handed over to childhood, its streets and buildings turned into instruments of invention. It is the perfect antecedent for Playdeck's vision of neighbourhoods reclaimed for play.",
        "source": "Kunsthistorisches Museum, Vienna (inv. GG 1017), oil on panel",
        "href": "https://www.khm.at/en/objectdb/detail/321/",
        "image": {
          "src": "/covers/davidson-prize-routemaster-playgrounds--art.png",
          "alt": "Pieter Bruegel the Elder's 1560 painting Children's Games, showing a town square crowded with children playing dozens of different games",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Kinderszenen (Scenes from Childhood), Op. 15 — Robert Schumann (1838)",
        "excerpt": "Schumann's thirteen brief piano pieces are an adult's tender recollection of childhood, with movements like \"Of Foreign Lands and Peoples,\" \"Catch Me If You Can,\" \"Knight of the Hobbyhorse\" and the beloved \"Träumerei\" (Dreaming). Simple in means yet inexhaustible in feeling, they treat play not as something small but as a doorway back to wonder. That is exactly the spirit Playdeck stages: an intergenerational return to play, where the old machines of the city become a bridge between grown-ups and children.",
        "source": "Robert Schumann, Kinderszenen, Op. 15 (thirteen piano miniatures), scores hosted at IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Kinderszenen,_Op.15_(Schumann,_Robert)"
      }
    ],
    "rank": 13
  },
  {
    "slug": "kyiv-strikes-kill-eight",
    "headline": "Russian missile and drone strikes on Kyiv kill at least eight and wound dozens",
    "overview": "A large overnight barrage of Russian missiles and drones struck Kyiv, killing at least eight people and wounding dozens more, Ukrainian officials said. Rescuers dug through damaged apartment blocks as the assault deepened one of the war's most intense stretches of aerial attacks on the capital.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiswFBVV95cUxOUXpINkNPNmhoNlBLZ1FyUHM5alRZVWp0dUlGS3F2ajlhNGJmUFlrU1lYNHBWQzlZenZUYWRaSFByeFVxTG5vVlMtQm5Gd3E1U3FKVlM0TTdZXzFJMEZ3RFZGQV8xdDB5dVUya2dXNWRhTF9Xa1hmdXQ1bXF0WjFELU0xaWdvVFhSbEhMRElBdUtnNk5sRFEtR0NsUmxZNXZLV1NlVEtrNHBTaEFhWmlHQ2luUQ?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c4gyv05gk4do"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-02",
    "image": {
      "src": "/covers/kyiv-strikes-kill-eight.png",
      "alt": "Smoke rising over a damaged apartment block in Kyiv at dawn after an overnight Russian missile and drone strike.",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 2 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Thucydides on the burning of besieged Plataea (429 BC)",
        "excerpt": "The consequence was a fire greater than any one had ever yet seen produced by human agency ... And this fire was not only remarkable for its magnitude, but was also, at the end of so many perils, within an ace of proving fatal to the Plataeans; a great part of the town became entirely inaccessible, and had a wind blown upon it, in accordance with the hopes of the enemy, nothing could have saved them.",
        "source": "Thucydides, History of the Peloponnesian War 2.77 (trans. Richard Crawley), Livius.org",
        "href": "https://www.livius.org/sources/content/thucydides-historian/siege-of-plataea/"
      },
      {
        "category": "historical",
        "title": "Josephus on the fall and burning of Jerusalem (AD 70)",
        "excerpt": "The ground did no where appear visible, for the dead bodies that lay on it; but the soldiers went over heaps of those bodies, as they ran upon such as fled from them.",
        "source": "Flavius Josephus, The War of the Jews, Book VI (trans. William Whiston), Wikisource",
        "href": "https://en.wikisource.org/wiki/The_War_of_the_Jews/Book_VI"
      },
      {
        "category": "literary",
        "title": "Homer, The Iliad, Book XXII — Troy grieving beneath its walls",
        "excerpt": "No less than if the rage of hostile fires,\nFrom her foundations curling to her spires,\nO'er the proud citadel at length should rise,\nAnd the last blaze send Ilion to the skies.",
        "source": "Homer, The Iliad, Book XXII (trans. Alexander Pope), Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Iliad_of_Homer_(Pope)/Book_22"
      },
      {
        "category": "literary",
        "title": "The Book of Lamentations, over a stricken city",
        "excerpt": "Mine eyes do fail with tears, my bowels are troubled, my liver is poured upon the earth, for the destruction of the daughter of my people; because the children and the sucklings swoon in the streets of the city.",
        "source": "Lamentations 2:11, King James Version, Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Lamentations"
      },
      {
        "category": "artistic",
        "title": "Pyotr Ilyich Tchaikovsky, 1812 Overture, Op. 49 — MUSIC",
        "excerpt": "Tchaikovsky built this overture around the roar of literal cannon fire, pealing bells, and two national anthems locked in combat, staging a capital under overwhelming assault. The terror of bombardment is answered by a hymn-like theme that gathers into a defiant final carillon of survival. Heard against Kyiv's nights of missiles and drones, its cannonades sound less like celebration than like a people refusing to be erased.",
        "source": "International Music Score Library Project (IMSLP)",
        "href": "https://imslp.org/wiki/1812_Overture,_Op.49_(Tchaikovsky,_Pyotr)"
      },
      {
        "category": "artistic",
        "title": "Thomas Cole, The Course of Empire: Destruction (1836) — VISUAL ARTWORK",
        "excerpt": "Cole's canvas seizes a once-glittering capital at the instant of its sacking: bridges buckle, colonnades burn, and a storm-dark sky glows orange with fires set by an invading army. Civilians are cut down or hurled into the river as smoke swallows the temples that an hour earlier signified an empire's confidence. Painted in 1836, it reads now as a timeless image of what aerial and artillery terror does to a living city — the swift passage from ordinary streets to rubble and flame.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Cole_Thomas_The_Course_of_Empire_Destruction_1836.jpg",
        "image": {
          "src": "/covers/kyiv-strikes-kill-eight--art.png",
          "alt": "Thomas Cole's 1836 painting 'The Course of Empire: Destruction', showing a classical city being sacked and set ablaze by invaders, with civilians fleeing across a collapsing bridge under a smoke-filled sky.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 14
  },
  {
    "slug": "usmca-renewal-declined",
    "headline": "US declines to renew USMCA trade pact, triggering annual reviews with Canada and Mexico",
    "overview": "The United States let a July 1 deadline pass without agreeing to a 16-year renewal of the USMCA trade pact, opting instead for yearly reviews and further talks aimed at narrowing its trade deficits with Canada and Mexico. The agreement stays in force but now faces annual reviews that could reopen major provisions, and is set to expire in 2036 if no resolution is reached.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMixwFBVV95cUxORWxhSVNvODM1MVFkUkxYbEZKQ0FTbUhoOWpsdUdCTkRDYzlLTDZaTjlKOGQ5ZDQyd3MxOUUxblp4eUxtZGZIeEpKVGtkMXJMNFpkUVpNNnNHTzlSOU5rc21LU1dnNnBld0dmdzItZ2dpS05aOC1BRm8xdmt5WUduWDJjUUc0Nmd3OFdBX3JsbnhOY2RPdm50a2Vyek5IMGhWa1lPSHRWanNWMno1RkJOQkM3NFdOV3pSZVgzX053WnBOWGRGM3VF?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/ce8j2lmrvrdo"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-02",
    "image": {
      "src": "/covers/usmca-renewal-declined.png",
      "alt": "Stacked shipping containers and cranes at a North American border trade port under an overcast sky.",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 2 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Treaty of Amity, Commerce, and Navigation (Jay Treaty), Article 28 — 1794",
        "excerpt": "It is agreed that the first Ten Articles of this Treaty shall be permanent and that the subsequent Articles except the Twelfth shall be limited in their duration to Twelve years to be computed from the Day on which the Ratifications of this Treaty shall be exchanged... But if it should unfortunately happen that His Majesty and the United States should not be able to agree on such new Arrangements, in that case, all the Articles of this Treaty except the first Ten shall then cease and expire together.",
        "source": "The Avalon Project, Yale Law School",
        "href": "https://avalon.law.yale.edu/18th_century/jay.asp"
      },
      {
        "category": "historical",
        "title": "Reciprocity Treaty between the United States and Great Britain, Article V — 1854",
        "excerpt": "Such assent having been given, the treaty shall remain in force for ten years from the date at which it may come into operation, and further until the expiration of twelve months after either of the high contracting parties shall give notice to the other of its wish to terminate the same; each of the high contracting parties being at liberty to give such notice to the other at the end of the said term of ten years, or at any time afterwards.",
        "source": "PrimaryDocuments.ca — text of the 1854 Reciprocity Treaty (terminated by the United States in 1866)",
        "href": "https://primarydocuments.ca/the-reciprocity-treaty-of-1854-canada-united-states-5-june-1854-ratified-february-1855-terminated-march-1866/"
      },
      {
        "category": "literary",
        "title": "Robert Frost, \"Mending Wall\"",
        "excerpt": "Something there is that doesn't love a wall, ... He only says, 'Good fences make good neighbours.'",
        "source": "Robert Frost, \"Mending Wall,\" North of Boston (1914), Wikisource",
        "href": "https://en.wikisource.org/wiki/North_of_Boston/Mending_Wall"
      },
      {
        "category": "literary",
        "title": "Aesop, \"The Wolves and the Sheep\"",
        "excerpt": "\"If you would only dismiss them from your heels, there might soon be treaties of peace and of reconciliation between us.\" The Sheep, poor silly creatures! were easily beguiled, and dismissed the Dogs. The Wolves destroyed the unguarded flock at their own pleasure.",
        "source": "Wikisource — Three Hundred Aesop's Fables (trans. George Fyler Townsend, 1867)",
        "href": "https://en.wikisource.org/wiki/Three_Hundred_%C3%86sop%27s_Fables/The_Wolves_and_the_Sheep"
      },
      {
        "category": "artistic",
        "title": "George Frideric Handel, Music for the Royal Fireworks, HWV 351 — MUSIC",
        "excerpt": "Handel scored this suite of pomp for the public celebration of the 1748 Treaty of Aix-la-Chapelle, the pact that ended the War of the Austrian Succession. Blazing trumpets, drums, and massed wind instruments turn a hard-won diplomatic settlement into open-air spectacle, the Overture swelling from martial tension into a triumphant peace. It is the sound of rival nations pausing their quarrels to shake hands beneath a shower of sparks.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Music_for_the_Royal_Fireworks,_HWV_351_(Handel,_George_Frideric)"
      },
      {
        "category": "artistic",
        "title": "Benjamin West, American Commissioners of the Preliminary Peace Negotiations with Great Britain — VISUAL ARTWORK",
        "excerpt": "Benjamin West's unfinished 1783 canvas gathers the American peacemakers—Franklin, Jay, Adams and their colleagues—around a table to settle the treaty ending the Revolutionary War. Because the British commissioners refused to sit for the painter, one side of the composition trails off into bare, ghostly emptiness where a partner to the bargain should be. The picture freezes diplomacy mid-negotiation: an agreement half-made, its other party conspicuously absent.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Treaty_of_Paris_by_Benjamin_West_1783.jpg",
        "image": {
          "src": "/covers/usmca-renewal-declined--art.png",
          "alt": "Benjamin West's unfinished 1783 painting of the American commissioners seated at the Treaty of Paris peace negotiations, with the right side of the canvas left blank where the absent British delegates would have been.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 15
  },
  {
    "slug": "us-iran-doha-talks-conclude",
    "headline": "US and Iran conclude two days of indirect talks in Doha as oil prices fall",
    "overview": "Qatar-mediated indirect talks between the United States and Iran concluded in Doha after two days, with Qatar reporting positive progress on the Strait of Hormuz and the unfreezing of Iranian funds. Oil prices fell on the easing tensions, with Brent sliding about 1% toward its worst quarter since 2020.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMimwFBVV95cUxPQjJuTlNEejJjWHZfckJtT3BHcWVLbXpJQUZzOVEzaDJCMThGUmJaU1pXRXdKYV9RUG9Nc09WaVRaVHhYUXh5LW43QzNzU3dzNDd5dGVQaFpmQzNhenJRcW1HMVVOQ3pnNVptVHpCSk9mUC1BWl9xTUJyQmttcHdRWF9jdkZiS3dZMkQ2ekY5aWpPX284MnFMOVVBaw?oc=5"
      },
      {
        "name": "CNBC",
        "href": "https://www.cnbc.com/2026/07/02/oil-prices-fall-after-us-iran-talks-conclude-in-doha.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-02",
    "image": {
      "src": "/covers/us-iran-doha-talks-conclude.png",
      "alt": "Empty chairs around a long negotiating table in a Doha conference hall at dusk.",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 2 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Treaty of Portsmouth (1905), Article I",
        "excerpt": "There shall henceforth be peace and amity between their Majesties the Emperor of Japan and the Emperor of all the Russias, and between their respective States and subjects.",
        "source": "Russo-Japanese Peace Treaty (Treaty of Portsmouth), mediated by President Theodore Roosevelt",
        "href": "https://wwi.lib.byu.edu/index.php/Treaty_of_Portsmouth"
      },
      {
        "category": "historical",
        "title": "Treaty of Ghent (1814), Article the First",
        "excerpt": "There shall be a firm and universal Peace between His Britannic Majesty and the United States, and between their respective Countries, Territories, Cities, Towns, and People of every degree without exception of places or persons. All hostilities both by sea and land shall cease as soon as this Treaty shall have been ratified by both parties as hereinafter mentioned.",
        "source": "Treaty of Peace and Amity between the United States and Great Britain, The Avalon Project, Yale Law School",
        "href": "https://avalon.law.yale.edu/19th_century/ghent.asp"
      },
      {
        "category": "literary",
        "title": "Homer, Iliad, Book IX (The Embassy to Achilles)",
        "excerpt": "Even now, however, be appeased, and put away your anger from you. Agamemnon will make you great amends if you will forgive him; listen, and I will tell you what he has said in his tent that he will give you.",
        "source": "Homer, The Iliad, trans. Samuel Butler (public domain), The Internet Classics Archive",
        "href": "https://classics.mit.edu/Homer/iliad.9.ix.html"
      },
      {
        "category": "literary",
        "title": "Aristophanes, Lysistrata (Reconciliation Scene)",
        "excerpt": "Now, brethren twined with mutual benefactions, Can you still war, can you suffer such disgrace? Why not be friends? What is there to prevent you?",
        "source": "Aristophanes, Lysistrata, trans. Jack Lindsay (public domain), Project Gutenberg eBook #7700",
        "href": "https://www.gutenberg.org/files/7700/7700-h/7700-h.htm"
      },
      {
        "category": "artistic",
        "title": "Joseph Haydn, Missa in tempore belli ('Mass in Time of War' / Paukenmesse), Hob.XXII:9 — MUSIC",
        "excerpt": "Haydn composed this mass in 1796 as Napoleonic armies pressed toward Austria, threading military drum-strokes and trumpet calls through a sacred text. Its closing Agnus Dei rises from anxious martial rumbling into an urgent, almost pleading appeal for peace. The work embodies the very hinge of the Doha story: a moment poised between the machinery of war and a fragile prayer for its aversion.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Missa_in_tempore_belli_'Paukenmesse',_Hob.XXII:9_(Haydn,_Joseph)"
      },
      {
        "category": "artistic",
        "title": "Gerard ter Borch, The Ratification of the Treaty of Münster (1648) — VISUAL ARTWORK",
        "excerpt": "Ter Borch's small oil on copper captures the exact instant on 15 May 1648 when Spanish and Dutch envoys swear the oath ending eighty years of war, a founding image of diplomacy made visible. Enemies stand crowded in a single room, hands raised in a shared gesture that converts hostility into treaty. It is the pictorial answer to the Doha talks: the quiet, negotiated room that averts the battlefield.",
        "source": "Rijksmuseum, Amsterdam (SK-A-405); Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:The_Ratification_of_the_Treaty_of_Munster,_Gerard_Ter_Borch_(1648).jpg",
        "image": {
          "src": "/covers/us-iran-doha-talks-conclude--art.png",
          "alt": "Spanish and Dutch delegations raising their hands to swear the oath ratifying the Peace of Münster in the town hall, 15 May 1648, in Gerard ter Borch's group portrait",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 16
  },
  {
    "slug": "us-ai-voluntary-model-standards",
    "headline": "US in talks with leading AI companies over voluntary standards for releasing new models",
    "overview": "The US government is in advanced talks with major AI developers including OpenAI, Anthropic, Google, Microsoft and Amazon to set voluntary standards for releasing new models, the Financial Times reported, with an announcement possible within days. The benchmarks would flag risks and clarify who can access advanced models at home and abroad amid concerns about misuse by rival powers.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiwgFBVV95cUxOcE1CSXY3b1NVTmdnRDcyM3dUeUpxLW93SE9MNW9TX2VSZTJzdHRmTzNpdkdwaFVxTkFqQjFpUnk0cU1JWmtrTTNWVnliSERyVnZGWFZ2VmgtelpEMHhPMDBsVVc4S3RfakFlMFJZTjNDbVpVN1NGVk56R3dJdFZNQTR1RXFyUURVY18zVktHMmJwSGNNbTd4dVBEWUppOXFpc0pJQ3pDYnZsc1lYNzZXU3U1TDA5dzFTemRhX1M2cWlJZw?oc=5"
      },
      {
        "name": "Gizmodo",
        "href": "https://gizmodo.com/trump-administration-reportedly-on-verge-of-standards-deal-with-big-ai-2000780479"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-02",
    "image": {
      "src": "/covers/us-ai-voluntary-model-standards.png",
      "alt": "A single illuminated server cabinet glowing in a darkened data hall.",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 2 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Oath of Hippocrates (c. 5th century BCE)",
        "excerpt": "No entreaties shall induce me to give to any one noxious drugs, nor shall I take part in any such counsels. ... I shall conduct my life and practise my art in holiness.",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Oath_of_Hippocrates"
      },
      {
        "category": "historical",
        "title": "A Proclamation for the Suppression of Coffee-Houses (Charles II, 1675)",
        "excerpt": "Whereas it is most apparent, that the Multitude of Coffee-Houses of late years set up and kept within this Kingdom, the Dominion of Wales, and the Town of Berwick upon Tweed, and the great resort of Idle and disaffected persons to them, have produced very evil and dangerous effects.",
        "source": "University of Giessen (transcription of the 1675 royal proclamation)",
        "href": "https://www.uni-giessen.de/de/fbz/fb05/germanistik/absprache/sprachverwendung/gloning/tx/suppress.htm"
      },
      {
        "category": "literary",
        "title": "Mary Shelley, Frankenstein; or, The Modern Prometheus (1818)",
        "excerpt": "I had worked hard for nearly two years, for the sole purpose of infusing life into an inanimate body ... but now that I had finished, the beauty of the dream vanished, and breathless horror and disgust filled my heart.",
        "source": "Wikisource (First Edition, 1818, Vol. 1, Ch. 4)",
        "href": "https://en.wikisource.org/wiki/Frankenstein,_or_the_Modern_Prometheus_(First_Edition,_1818)/Volume_1/Chapter_4"
      },
      {
        "category": "literary",
        "title": "Ovid, Metamorphoses, Book VIII: Daedalus and Icarus (8 CE)",
        "excerpt": "My son, I caution you to keep the middle way, for if your pinions dip too low the waters may impede your flight; and if they soar too high the sun may scorch them.",
        "source": "Perseus Digital Library (Brookes More translation, 1922)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.02.0028%3Abook%3D8%3Acard%3D183"
      },
      {
        "category": "artistic",
        "title": "Paul Dukas, L'apprenti sorcier (The Sorcerer's Apprentice), 1897 — MUSIC",
        "excerpt": "Dukas's symphonic scherzo sets Goethe's ballad of an apprentice who enchants a broom to fetch water and then cannot stop it, the surging orchestral theme multiplying out of control. The music is the definitive sonic image of a power casually unleashed and impossible to recall — until the master returns to impose order. First performed in Paris in 1897, the score is in the public domain.",
        "source": "IMSLP (Petrucci Music Library)",
        "href": "https://imslp.org/wiki/L'apprenti_sorcier_(Dukas,_Paul)"
      },
      {
        "category": "artistic",
        "title": "Heinrich Füger, Prometheus Brings Fire to Mankind, c. 1817 — VISUAL ARTWORK",
        "excerpt": "Heinrich Füger's neoclassical painting shows the titan Prometheus delivering fire — the first transformative technology — to a humanity reaching eagerly toward it. In the myth this gift of power provokes the wrath of the gods, who punish the giver for handing mortals a force they were not trusted to wield. It is the ur-image of a world-changing capability released to humankind and the anxious question of who should control it. The work is public domain; Füger died in 1818.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Heinrich_fueger_1817_prometheus_brings_fire_to_mankind.jpg",
        "image": {
          "src": "/covers/us-ai-voluntary-model-standards--art.png",
          "alt": "Neoclassical painting of the titan Prometheus holding a flame aloft to a group of nude figures reaching toward the new light, against a dark sky.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 17
  },
  {
    "slug": "germany-charges-ukrainian-nord-stream",
    "headline": "Germany charges a Ukrainian man over the 2022 Nord Stream pipeline explosions",
    "overview": "German federal prosecutors indicted a Ukrainian national, identified only as Serhii K under privacy rules, over the 2022 explosions that ruptured the Nord Stream gas pipelines beneath the Baltic Sea. Prosecutors accuse the former special-forces officer, arrested in Italy last August, of attacking civilian energy infrastructure; Ukraine has denied any state involvement.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMivAFBVV95cUxOalRlaFpyS3FBM2dSdHM0ck5wVzNlWXpQUEZIczhyWF9ITVFqbFNFWE1kQkZkTlVLcUNiWXItYmFTVzNpallnQ1BiVnJ5MmlkWi0zSjNKVzBLMml2cnJ4Vi1RckwxaUxrRFI2OVZaUFJlSWhZem1pUC1tamhWdXFrU29kNTZUTExkZE5ZUHJtUW9TX0xya2M0Z1l6bTltLWJ4UHhmOE5rRHg3UlF5OVRYS3hSWHNRdV96b0ZPRw?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c33yjk0ldkdo"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-02",
    "image": {
      "src": "/covers/germany-charges-ukrainian-nord-stream.png",
      "alt": "Gas bubbling to the surface of the dark Baltic Sea above a ruptured undersea pipeline.",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 2 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "King James I, Speech to Parliament on the Gunpowder Plot (1605)",
        "excerpt": "But in this which did so lately fall out, and which was a destruction prepared not for me alone, but for you all that are here present, and wherein no rank, age, or sex should have been spared; This was not a crying sin of bloud as the former, but it may well be called a roaring, nay, a thundering sin of Fire and Brimstone, from the which, God hath so miraculously delivered us all.",
        "source": "King James I, Speech to Parliament on the Gunpowder Plot (1605) — Famous Trials, UMKC",
        "href": "https://famous-trials.com/gunpowder/2768-speech-of-king-james-to-parliament-regarding-gunpowder-plot"
      },
      {
        "category": "historical",
        "title": "Thucydides, History of the Peloponnesian War, Book II (the night attack on Plataea)",
        "excerpt": "a Theban force a little over three hundred strong, under the command of their Boeotarchs, Pythangelus, son of Phyleides, and Diemporus, son of Onetorides, about the first watch of the night, made an armed entry into Plataea, a town of Boeotia in alliance with Athens. The gates were opened to them by a Plataean called Naucleides, who, with his party, had invited them in, meaning to put to death the citizens of the opposite party, bring over the city to Thebes, and thus obtain power for themselves.",
        "source": "Thucydides, History of the Peloponnesian War, Book II (the night attack on Plataea) — Wikisource",
        "href": "https://en.wikisource.org/wiki/History_of_the_Peloponnesian_War/Book_2"
      },
      {
        "category": "literary",
        "title": "Joseph Conrad, The Secret Agent, Chapter 2",
        "excerpt": "The demonstration must be against learning—science. But not every science will do. The attack must have all the shocking senselessness of gratuitous blasphemy.",
        "source": "Joseph Conrad, The Secret Agent, Chapter 2 — Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Secret_Agent/Chapter_2"
      },
      {
        "category": "literary",
        "title": "William Shakespeare, Macbeth, Act II, Scene 2",
        "excerpt": "Will all great Neptune's ocean wash this blood\nClean from my hand? No, this my hand will rather\nThe multitudinous seas incarnadine,\nMaking the green one red.",
        "source": "William Shakespeare, Macbeth, Act II, Scene 2 — Wikisource",
        "href": "https://en.wikisource.org/wiki/Macbeth_(1918)_Yale/Text/Act_II"
      },
      {
        "category": "artistic",
        "title": "Richard Wagner, Der fliegende Holländer (The Flying Dutchman), WWV 63 — MUSIC",
        "excerpt": "Wagner's storm-lashed overture and opera conjure a cursed ship condemned to wander the seas, a doom that surfaces from beneath the waves. Its churning strings and the ghost-ship legend evoke nemesis rising out of the deep — an apt musical mirror for sabotage carried out unseen, underwater, and a reckoning that will not stay submerged. The full public-domain scores are catalogued on IMSLP.",
        "source": "Richard Wagner, Der fliegende Holländer (The Flying Dutchman), WWV 63 — MUSIC — IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Der_fliegende_Holl%C3%A4nder,_WWV_63_(Wagner,_Richard)"
      },
      {
        "category": "artistic",
        "title": "Crispijn van de Passe the Elder, The Gunpowder Plot Conspirators (1605) — VISUAL ARTWORK",
        "excerpt": "This contemporary engraving groups eight of the Gunpowder Plot conspirators — Guy Fawkes third from the right — in hushed, close-huddled conference. Produced within the year of the plot, it became the enduring image of covert conspirators bound to a hidden act of destruction and its public reckoning. The work is in the public domain.",
        "source": "Crispijn van de Passe the Elder, The Gunpowder Plot Conspirators (1605) — VISUAL ARTWORK — Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Gunpowder_Plot_conspirators.jpg",
        "image": {
          "src": "/covers/germany-charges-ukrainian-nord-stream--art.png",
          "alt": "A 1605 engraving showing eight cloaked Gunpowder Plot conspirators, including Guy Fawkes, gathered together in secret conference",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 18
  },
  {
    "slug": "judge-blocks-usps-mail-voting",
    "headline": "Federal judge blocks Postal Service plan to restrict mail-in ballot delivery",
    "overview": "US District Judge Emmet Sullivan blocked a Postal Service proposal that would have required states to verify voters before the agency delivered mail-in ballots, siding with the NAACP and citing a 2021 settlement guaranteeing timely ballot delivery. It was the second courtroom defeat in two weeks for President Trump's push to curtail mail voting ahead of the November midterms.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMirwFBVV95cUxPbGpZNWZEVGo4VWgzR21MZ1RIbkdpM1B0enE2OU1BcF9TdmY1STNteWhjOWpIc3BHaTZla1BWaEN5TEtmaFBFZnZ5SWNwS2pYeEU3VDMzbzZIQ0hFYWVSZ3J1S2ZjQkNmdzZlRENobk5xX20yZkhnaUdtYTFSMXlsTEZQbXNJNG8wYWppRHM3SFNIUjhoSFlGZkg4SVR6c0RkdFMwRWkzYlNmckpRTW1v?oc=5"
      },
      {
        "name": "Democracy Docket",
        "href": "https://www.democracydocket.com/news-alerts/judge-blocks-trump-mail-voting-executive-order/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-02",
    "image": {
      "src": "/covers/judge-blocks-usps-mail-voting.png",
      "alt": "A wall of postal pigeonhole slots stuffed with plain white envelopes under a hanging lamp.",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 2 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Fifteenth Amendment to the U.S. Constitution (ratified 1870)",
        "excerpt": "The right of citizens of the United States to vote shall not be denied or abridged by the United States or by any State on account of race, color, or previous condition of servitude. The Congress shall have power to enforce this article by appropriate legislation.",
        "source": "The Fifteenth Amendment to the U.S. Constitution (ratified 1870) — U.S. National Archives",
        "href": "https://www.archives.gov/milestone-documents/15th-amendment"
      },
      {
        "category": "historical",
        "title": "Susan B. Anthony, \"Is It a Crime for a Citizen of the United States to Vote?\" (1873)",
        "excerpt": "It was we, the people; not we, the white male citizens; nor yet we, the male citizens; but we, the whole people, who formed the Union.",
        "source": "Susan B. Anthony, \"Is It a Crime for a Citizen of the United States to Vote?\" (1873) — Famous Trials, UMKC",
        "href": "https://famous-trials.com/anthony/438-anthonyaddress"
      },
      {
        "category": "literary",
        "title": "Sophocles, Antigone (Jebb translation, 1917)",
        "excerpt": "Yes; for it was not Zeus that had published me that edict; not such are the laws set among men by the Justice who dwells with the gods below; nor deemed I that thy decrees were of such force, that a mortal could override the unwritten and unfailing statutes of heaven. For their life is not of to-day or yesterday, but from all time, and no man knows when they were first put forth.",
        "source": "Sophocles, Antigone (Jebb translation, 1917) — Wikisource",
        "href": "https://en.wikisource.org/wiki/Tragedies_of_Sophocles_(Jebb_1917)/Antigone"
      },
      {
        "category": "literary",
        "title": "Percy Bysshe Shelley, The Mask of Anarchy (1819)",
        "excerpt": "Rise like lions after slumber\nIn unvanquishable number—\nShake your chains to earth like dew\nWhich in sleep had fallen on you—\nYe are many—they are few.",
        "source": "Percy Bysshe Shelley, The Mask of Anarchy (1819) — Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Mask_of_Anarchy"
      },
      {
        "category": "artistic",
        "title": "Rouget de Lisle, La Marseillaise — MUSIC",
        "excerpt": "Composed in 1792 during the French Revolution, La Marseillaise became the enduring anthem of a people asserting liberty against arbitrary authority. Its rising, marching melody turned a call to defend citizens' rights into a shared musical emblem of the franchise won from tyranny. It endures as one of the world's foremost anthems of liberty.",
        "source": "Rouget de Lisle, La Marseillaise — MUSIC — IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/La_Marseillaise_(Rouget_de_Lisle,_Claude-Joseph)"
      },
      {
        "category": "artistic",
        "title": "George Caleb Bingham, The County Election (1852) — VISUAL ARTWORK",
        "excerpt": "Bingham's 1852 painting depicts an American election day as a crowded civic ritual, ordinary citizens lining up on the courthouse steps to cast their ballots. Housed in the Saint Louis Art Museum, it renders voting as the living machinery of self-government. The work is in the public domain (artist died 1879).",
        "source": "George Caleb Bingham, The County Election (1852) — VISUAL ARTWORK — Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:George_Caleb_Bingham_-_The_County_Election.jpg",
        "image": {
          "src": "/covers/judge-blocks-usps-mail-voting--art.png",
          "alt": "A bustling frontier Missouri town on election day, with a crowd of citizens gathered on and around a courthouse porch to cast their votes by voice, figures ascending steps toward the polling official.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 19
  },
  {
    "slug": "alibaba-600-million-drug-sales-settlement",
    "headline": "Alibaba to pay $600 million to settle US probe into illegal pharmaceutical sales",
    "overview": "Alibaba and its payment affiliate AUS Merchant Services agreed to pay $600 million to resolve a US Justice Department investigation into illegal sales of pharmaceuticals and medical products on its platforms. The company admitted overseas customers made roughly 80,000 unlawful purchases worth more than $200 million between 2016 and 2024, in the largest settlement in the history of the District of Rhode Island.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMisAFBVV95cUxQMmJDMmhkeHMxSFpCOWF5NnM5UkpPMlJTX3AwTG5JdjRxb0pOa3pXZ1ZiYVpQaF83VU9VN3p1U1ZZSzZQcFBMS0JOcENSN3BZV3I2YWVoMTQyNmJyQlJMcXNZNzFJamt1Z1UwSm9tVmotaGJQTHFhQWFDMkpIRmRuRHlxaHBZVC1feE9HUTlLRTVmc2MxUzUyR3NWYTBMTHV5bTZwbXptZVR4MlpRSlQzaQ?oc=5"
      },
      {
        "name": "U.S. Justice Department",
        "href": "https://www.justice.gov/opa/pr/alibaba-group-and-aus-merchant-services-agree-pay-600-million-resolve-allegations-they"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-02",
    "image": {
      "src": "/covers/alibaba-600-million-drug-sales-settlement.png",
      "alt": "Rows of plain brown parcels moving along a conveyor in a large e-commerce fulfilment warehouse at night.",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 2 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Cleansing of the Temple — Gospel of Matthew 21:12–13 (King James Version)",
        "excerpt": "And Jesus went into the temple of God, and cast out all them that sold and bought in the temple, and overthrew the tables of the moneychangers, and the seats of them that sold doves, And said unto them, It is written, My house shall be called the house of prayer; but ye have made it a den of thieves.",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Matthew"
      },
      {
        "category": "historical",
        "title": "The Pure Food and Drug Act of 1906, Section 1",
        "excerpt": "That it shall be unlawful for any person to manufacture within any Territory or the District of Columbia any article of food or drug which is adulterated or misbranded, within the meaning of this Act; and any person who shall violate any of the provisions of this section shall be guilty of a misdemeanor, and for each offense shall, upon conviction thereof, be fined not to exceed five hundred dollars.",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/Pure_Food_and_Drug_Act_of_1906"
      },
      {
        "category": "literary",
        "title": "Romeo and Juliet, Act V, Scene 1 — Romeo and the Apothecary (Shakespeare)",
        "excerpt": "I do remember an apothecary, And hereabouts he dwells, which late I noted In tatter'd weeds, with overwhelming brows, Culling of simples; meagre were his looks, Sharp misery had worn him to the bones:",
        "source": "Wikisource (1917 Yale edition)",
        "href": "https://en.wikisource.org/wiki/Romeo_and_Juliet_(1917)_Yale/Text/Act_V"
      },
      {
        "category": "literary",
        "title": "The Jungle, Chapter 14 — What Went Into the Meat (Upton Sinclair)",
        "excerpt": "These rats were nuisances, and the packers would put poisoned bread out for them; they would die, and then rats, bread, and meat would go into the hoppers together. This is no fairy story and no joke; the meat would be shovelled into carts.",
        "source": "Wikisource (Sinclair, 1906)",
        "href": "https://en.wikisource.org/wiki/The_Jungle_(Sinclair,_1906)/Chapter_14"
      },
      {
        "category": "artistic",
        "title": "Pictures at an Exhibition (Modest Mussorgsky) — MUSIC",
        "excerpt": "Mussorgsky's 1874 piano suite walks the listener from gallery to gallery, and in the movement 'Limoges. The Market Place' it bursts into the chatter, haggling, and jostling gossip of a French market square. The music captures a marketplace as a living organism of commerce, its clamor swelling until it tumbles headlong into the darkness of the catacombs.",
        "source": "IMSLP",
        "href": "https://imslp.org/wiki/Pictures_at_an_Exhibition_(Mussorgsky,_Modest)"
      },
      {
        "category": "artistic",
        "title": "Christ Driving the Money Changers from the Temple (Rembrandt, 1626) — VISUAL ARTWORK",
        "excerpt": "In this early Rembrandt panel, a furious Christ raises a cord whip to scatter the traders, coins, and beasts that have turned the temple into a den of commerce. The chaotic tumble of overturned tables and fleeing merchants renders the moment of reckoning when a sacred space is violently purged of illicit trade.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Rembrandt_Christ_Driving_the_Money_Changers_from_the_Temple.jpg",
        "image": {
          "src": "/covers/alibaba-600-million-drug-sales-settlement--art.png",
          "alt": "Rembrandt's 1626 painting of Christ, whip raised, scattering the money changers, merchants, and their overturned tables and fleeing animals from the temple.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 20
  },
  {
    "slug": "belgium-senegal-world-cup-comeback",
    "headline": "Belgium beat Senegal 3-2 in extra time on the latest goal in World Cup history",
    "overview": "Trailing 2-0 in the 85th minute, Belgium stormed back through Romelu Lukaku and Youri Tielemans to force extra time, then won their round-of-32 tie 3-2 when Tielemans converted a penalty in the 125th minute, the latest goal ever scored at a World Cup. Senegal had led through Habib Diarra and Ismaila Sarr before the collapse in Seattle.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiugFBVV95cUxPdGY4ME1Rc0NxYjZGekVLZG1KRTktTWVtVHQ5dTdWazA1TkhYOGlnN1pfdkZ4Si13MG9TSVFFRU5qNEsxTDlyOHhTZE1WNWNPMUpOZkxUTGxYd3pzSnBCV2NKdUQ2ZGUydWFJVUw1QWNWRlJqZGdMY0E5MWNIbUdDYzNvR1B4RFkwWVltcXFEUEMwXzZtb0J6U0RTRC1Da2x0WTNtZHRoVDdkb3JsdlN0RzltQTZ2MTU1RlE?oc=5"
      },
      {
        "name": "ESPN",
        "href": "https://www.espn.com/soccer/story/_/id/49238481/belgium-vs-senegal-live-world-cup-2026-updates-round-32-clash"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-02",
    "image": {
      "src": "/covers/belgium-senegal-world-cup-comeback.png",
      "alt": "A floodlit World Cup stadium at night with a ball resting on the penalty spot amid drifting confetti.",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 2 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Herodotus, Histories 6.112 — the Athenians charge at a run at Marathon",
        "excerpt": "And when they had been arranged in their places and the sacrifices proved favourable, then the Athenians were let go, and they set forth at a run to attack the Barbarians. … they were the first of all the Hellenes about whom we know who went to attack the enemy at a run.",
        "source": "Herodotus, The Histories 6.112 (Macaulay translation), via Lexundria",
        "href": "https://lexundria.com/hdt/6.112-6.113/mcly"
      },
      {
        "category": "historical",
        "title": "The Duke of Wellington's Waterloo Dispatch to Lord Bathurst, 19 June 1815",
        "excerpt": "The attack succeeded in every point: the enemy was forced from his positions on the heights, and fled in the utmost confusion. … the operation of General Bülow upon the enemy's flank was a most decisive one.",
        "source": "Arthur Wellesley, Duke of Wellington, official dispatch, 19 June 1815, via Wikisource",
        "href": "https://en.wikisource.org/wiki/Wellingon%27s_Waterloo_dispatch_to_Lord_Bathurst,_19_June_1815"
      },
      {
        "category": "literary",
        "title": "Aesop, \"The Hare and the Tortoise\" (Townsend translation)",
        "excerpt": "The Tortoise never for a moment stopped, but went on with a slow but steady pace straight to the end of the course. The Hare, trusting to his native swiftness, cared little about the race, and lying down by the wayside, fell fast asleep. At last waking up, and moving as fast as he could, he saw the Tortoise had reached the goal.",
        "source": "Three Hundred Æsop's Fables, trans. George Fyler Townsend, via Wikisource",
        "href": "https://en.wikisource.org/wiki/Three_Hundred_%C3%86sop's_Fables/The_Hare_and_the_Tortoise"
      },
      {
        "category": "literary",
        "title": "Pindar, Olympian Ode 1 — victory hymn for Hieron of Syracuse",
        "excerpt": "Water is best, and gold, like a blazing fire in the night, stands out supreme of all lordly wealth. But if, my heart, you wish to sing of contests, look no further for any star warmer than the sun, shining by day through the lonely sky, and let us not proclaim any contest greater than Olympia.",
        "source": "Pindar, Olympian 1, trans. Diane Arnson Svarlien (1990), via Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0162:book=O.:poem=1"
      },
      {
        "category": "artistic",
        "title": "Ludwig van Beethoven, Symphony No. 5 in C minor, Op. 67 — MUSIC",
        "excerpt": "Beethoven's Fifth opens with its famous four-note hammer-blows of fate and drives through darkness and struggle before breaking, in its finale, into a blazing C-major triumph. The symphony enacts the very arc of a side battered and all but beaten that finds one last surge to wrench victory from defeat. Its exultant close is the sound of adversity overcome at the final moment.",
        "source": "Ludwig van Beethoven, Symphony No. 5, Op. 67 (1808), IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Symphony_No.5,_Op.67_(Beethoven,_Ludwig_van)"
      },
      {
        "category": "artistic",
        "title": "Ulpiano Checa, \"Carrera de carros romanos\" (Roman Chariot Race), 1890 — VISUAL ARTWORK",
        "excerpt": "Checa's canvas seizes the climactic instant of the race, chariots thundering neck-and-neck toward the line as drivers lash their teams to a final surge. The dust and violent motion capture a contest decided in its last desperate seconds. Victory belongs to whoever finds one more burst of speed at the very end.",
        "source": "Ulpiano Checa (1860–1916), Carrera de carros romanos, 1890; public domain, via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Carrera_de_carros_romanos-Ulpiano_Checa.JPG",
        "image": {
          "src": "/covers/belgium-senegal-world-cup-comeback--art.png",
          "alt": "Roman charioteers racing at full gallop, straining horses and swirling dust as chariots hurtle toward the finish",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 21
  },
  {
    "slug": "swift-kelce-madison-square-garden-wedding",
    "headline": "Taylor Swift and Travis Kelce to hold wedding celebration at Madison Square Garden",
    "overview": "Pop superstar Taylor Swift and NFL star Travis Kelce are set to marry over the July Fourth weekend at Madison Square Garden in New York, according to people familiar with the plans, with a rehearsal dinner Thursday and a ceremony and reception Friday. Swift's team applied for a street permit around the arena from July 2 to 4 as fans and media gathered outside.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMipgFBVV95cUxOQkNoRnQ1ejRXZVF0NG9TOUVqTkNJeW43WmpTNFkxWm9pQ05PSldVTTd4ODZEeFJXTVpIUDVIMGFJWlFwWjh5cTJUbDZYcUNub3VSeHZIOUV2WWF5bkc4QmEtc1FLUFZxSmQtMXR4bDVyMldJS3lJYWwxeEx2TklhNTFldzIyOGM1bmJoa0FWV3IyUHZueFF4X1JZOEdmLXNha2JBaEZB?oc=5"
      },
      {
        "name": "CNN",
        "href": "https://www.cnn.com/2026/07/01/entertainment/taylor-swift-travis-kelce-wedding-weekend"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-02",
    "image": {
      "src": "/covers/swift-kelce-madison-square-garden-wedding.png",
      "alt": "The illuminated exterior of a great New York arena at night before a celebrated wedding.",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 2 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Samuel Pepys: bells and bonfires for the Queen's arrival (1662)",
        "excerpt": "At night, all the bells of the town rung, and bonfires made for the joy of the Queen's arrival, who came and landed at Portsmouth last night.",
        "source": "Diary of Samuel Pepys, 1662 (Wikisource)",
        "href": "https://en.wikisource.org/wiki/Diary_of_Samuel_Pepys/1662/May"
      },
      {
        "category": "historical",
        "title": "Arrian: the mass wedding at Susa",
        "excerpt": "...seats being placed in a row for the bridegrooms; and after the banquet the brides came in and seated themselves, each one near her own husband... He also ordered that the names of all the other Macedonians who had married any of the Asiatic women should be registered. They were over 10,000 in number; and to these Alexander made presents on account of their weddings.",
        "source": "The Anabasis of Alexander, Book VII, Chapter IV (Wikisource)",
        "href": "https://en.wikisource.org/wiki/The_Anabasis_of_Alexander/Book_VII/Chapter_IV"
      },
      {
        "category": "literary",
        "title": "The Wedding at Cana (Gospel of John 2:1–10, King James Version)",
        "excerpt": "AND the third day there was a marriage in Cana of Galilee; and the mother of Jesus was there: And both Jesus was called, and his disciples, to the marriage... Every man at the beginning doth set forth good wine; and when men have well drunk, then that which is worse: but thou hast kept the good wine until now.",
        "source": "Bible (King James)/John, chapter 2 (Wikisource)",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/John"
      },
      {
        "category": "literary",
        "title": "Edmund Spenser, Epithalamion — the bride comes forth",
        "excerpt": "Loe! where she comes along with portly pace, / Lyke Phoebe, from her chamber of the east, / Arysing forth to run her mighty race, / Clad all in white, that seemes a virgin best.",
        "source": "Epithalamion (Wikisource)",
        "href": "https://en.wikisource.org/wiki/Epithalamion_(Spenser)"
      },
      {
        "category": "artistic",
        "title": "Felix Mendelssohn: Wedding March from A Midsummer Night's Dream, Op. 61 — MUSIC",
        "excerpt": "Composed as part of the incidental music to Shakespeare's play (Op. 61, 1842), the exultant Wedding March in C major has become the near-universal processional for the recessional of a bride and groom. Scored for full orchestra and crowned by triumphant fanfares, it turns a private union into a public flourish of pageantry, the sound of a whole assembly rising to celebrate.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/A_Midsummer_Night's_Dream,_incidental_music,_Op.61_(Mendelssohn,_Felix)"
      },
      {
        "category": "artistic",
        "title": "Pieter Bruegel the Elder: The Peasant Wedding (c. 1567–68) — VISUAL ARTWORK",
        "excerpt": "Bruegel crowds a barn with the whole village gathered for a wedding feast, bagpiper playing while dishes are ferried in on an unhinged door. The bride sits beneath a paper crown before a green cloth of honour, radiant amid the communal throng. The painting captures the timeless spectacle of a marriage that belongs not just to the couple but to an entire society watching, eating, and rejoicing together.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:The_Peasant_Wedding_(Bruegel).jpg",
        "image": {
          "src": "/covers/swift-kelce-madison-square-garden-wedding--art.png",
          "alt": "Pieter Bruegel the Elder's oil painting 'The Peasant Wedding', a crowded barn feast with a bride seated beneath a paper crown before a green cloth of honour, guests eating and a bagpiper playing",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 22
  },
  {
    "slug": "us-historic-heatwave-july-fourth",
    "headline": "Historic heat dome bakes central and eastern US ahead of July Fourth weekend",
    "overview": "A sprawling heat dome pushed dangerous temperatures across the central and eastern United States, with the National Weather Service warning of possibly historic highs and heat indices of 100 to 115 degrees from the Midwest to the East Coast. More than 140 million people were under heat alerts, and forecasters said over 300 records could fall by Saturday as the holiday weekend nears.",
    "genre": "Climate",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMisAFBVV95cUxNSVZfeDc3SzNzMVRYVUhhNEIzamlpOHJySC11eURNODU0dlVxM0t6UENzVFpmYW4xb1pieWEzWTJYZlhXOHNaeXE0blRqcVZmaTZKMlJZbVBZMmFGYV9uMEd2OFVRcDQtTmJkQ1h6a3dVWEpjcXFFUHZuN3VaN1dSZWw5VEJLMHJndl9qUWhIVmhjMlEzM05GLXZjdm9nQVRGQWxiZkMxRmh4cW5laFNjdQ?oc=5"
      },
      {
        "name": "NPR",
        "href": "https://www.npr.org/2026/06/30/nx-s1-5876093/heat-wave-fourth-midwest-east-coast"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-02",
    "image": {
      "src": "/covers/us-historic-heatwave-july-fourth.png",
      "alt": "A sun-scorched city skyline shimmering under a hazy, white-hot summer sky.",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 2 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "William Bradford on the great drought of 1623, Of Plymouth Plantation",
        "excerpt": "...the great drought which continued from the third week in May, till about the middle of July, without any rain and with great heat for the most part, insomuch as the corn began to wither away.",
        "source": "William Bradford, Of Plymouth Plantation (Bradford's History of the Plymouth Settlement, rendered into modern English by Harold Paget, 1920)",
        "href": "https://www.gutenberg.org/files/69871/69871-h/69871-h.htm"
      },
      {
        "category": "historical",
        "title": "Gilbert White on the scorching summer of 1783, The Natural History of Selborne",
        "excerpt": "The sun, at noon, looked as blank as a clouded moon, and shed a rust-coloured ferruginous light on the ground, and floors of rooms; but was particularly lurid and blood-coloured at rising and setting.",
        "source": "Gilbert White, The Natural History of Selborne, Letter LXV to Daines Barrington (1789)",
        "href": "https://www.gutenberg.org/files/1408/1408-h/1408-h.htm"
      },
      {
        "category": "literary",
        "title": "The becalmed sea beneath a burning sun — Coleridge, The Rime of the Ancient Mariner",
        "excerpt": "All in a hot and copper sky, / The bloody Sun, at noon, / Right up above the mast did stand, / No bigger than the Moon.",
        "source": "Samuel Taylor Coleridge, The Rime of the Ancient Mariner (text of 1834)",
        "href": "https://www.gutenberg.org/files/151/151-h/151-h.htm"
      },
      {
        "category": "literary",
        "title": "Drought as divine judgment — Deuteronomy 28, King James Bible",
        "excerpt": "And thy heaven that is over thy head shall be brass, and the earth that is under thee shall be iron. The LORD shall make the rain of thy land powder and dust: from heaven shall it come down upon thee, until thou be destroyed.",
        "source": "The Holy Bible, King James Version, Deuteronomy 28:23–24",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Deuteronomy"
      },
      {
        "category": "artistic",
        "title": "\"Summer\" (L'estate), RV 315, from Vivaldi's The Four Seasons — MUSIC",
        "excerpt": "Vivaldi's \"Summer\" is prefaced by a sonnet in which, beneath the blazing and relentless sun, both man and flock languish and even the pines are scorched. The solo violin evokes bodies sapped by the heat and a land gasping in breathless, drought-like stillness before a violent summer thunderstorm finally breaks. It endures as one of music's most vivid portraits of oppressive, punishing heat.",
        "source": "Antonio Vivaldi, Le quattro stagioni (The Four Seasons), Op. 8 (1725), Concerto No. 2 in G minor, RV 315",
        "href": "https://imslp.org/wiki/Le_quattro_stagioni_(Vivaldi,_Antonio)"
      },
      {
        "category": "artistic",
        "title": "The Fall of Phaeton by Peter Paul Rubens — VISUAL ARTWORK",
        "excerpt": "Rubens seizes the moment the sun-god's chariot, driven recklessly by the mortal Phaeton, careers out of control and sets the heavens and the earth ablaze, so that Zeus must hurl a thunderbolt to save the scorched world. Bodies and horses plunge through lurid, fiery light in a Baroque vision of a sky and land consumed by uncontrolled solar heat. It is an emblem of a merciless sun grown too close and too hot for the earth to bear.",
        "source": "Peter Paul Rubens, The Fall of Phaeton (c. 1604–1605), National Gallery of Art, Washington, D.C.",
        "href": "https://commons.wikimedia.org/wiki/File:Peter_Paul_Rubens_-_The_Fall_of_Phaeton_(National_Gallery_of_Art).jpg",
        "image": {
          "src": "/covers/us-historic-heatwave-july-fourth--art.png",
          "alt": "Baroque painting of Phaeton falling from the blazing chariot of the sun as rearing horses and tumbling figures scatter across a fiery, smoke-filled sky.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 23
  },
  {
    "slug": "nrc-radiation-rule-overhaul",
    "headline": "US nuclear regulator proposes easing decades-old radiation protection rules",
    "overview": "The Nuclear Regulatory Commission proposed the first major overhaul of US radiation protection standards in half a century, moving to reconsider the long-standing linear no-threshold model and the 'as low as reasonably achievable' dose limits in favor of a risk-based approach. Supporters say it would speed reactor licensing while critics warn of weakened safeguards; the plan faces a 45-day public comment period.",
    "genre": "Science",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiygFBVV95cUxQS0M0clBnUnpWa0NVdnRCYlFjcFFDaGg5TXU0VnRZS3JROF9YZzB1LWduQ05IMUc4S0M1WGRqb0VTMTkzcHEzM2RjZWZRbVNRZVhmY0NoT2U3dWE0UXhuYzNlaDM5VFVRNEhvVy1SeWdIZkZ4QUpEc2U5aTQ0NlVYRzdkUkxXVGxyd3pOS3d2RV94RjR3T0FLQUVhZ1Z1eDc3a2E1TmN2b3JjTFRxOTFLdjlmMU81Sjd5dU4wVExrVGEwZWhyQTBPYTlR?oc=5"
      },
      {
        "name": "Nuclear Regulatory Commission",
        "href": "https://www.nrc.gov/sites/default/files/cdn/doc-collection-news/2026/26-056.pdf"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-02",
    "image": {
      "src": "/covers/nrc-radiation-rule-overhaul.png",
      "alt": "The cooling towers of a nuclear power plant releasing steam at dawn.",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 2 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Pierre Curie asks whether humanity should know the secrets of nature (Nobel address, 1903)",
        "excerpt": "It is possible to conceive that in criminal hands radium might prove very dangerous, and the question therefore arises whether it be to the advantage of humanity to know the secrets of nature, whether we be sufficiently mature to profit by them, or whether that knowledge may not prove harmful.",
        "source": "Marie Curie, Pierre Curie (1923), quoting Pierre Curie's 1903 Nobel conference — Wikisource (public domain)",
        "href": "https://en.wikisource.org/wiki/Pierre_Curie"
      },
      {
        "category": "historical",
        "title": "Marie Curie, \"The Discovery of Radium\" (Vassar College address, 1921)",
        "excerpt": "And this is a proof that scientific work must not be considered from the point of view of the direct usefulness of it. It must be done for itself, for the beauty of science, and then there is always the chance that a scientific discovery may become like the radium a benefit for humanity.",
        "source": "Marie Skłodowska Curie — Wikisource (public domain)",
        "href": "https://en.wikisource.org/wiki/The_Discovery_of_Radium"
      },
      {
        "category": "literary",
        "title": "Nathaniel Hawthorne, \"Rappaccini's Daughter\"",
        "excerpt": "It appeared to him, however, that a drop or two of moisture from the broken stem of the flower descended upon the lizard's head. For an instant the reptile contorted itself violently, and then lay motionless in the sunshine.",
        "source": "Nathaniel Hawthorne, \"Rappaccini's Daughter,\" Mosses from an Old Manse (1846), Wikisource",
        "href": "https://en.wikisource.org/wiki/Mosses_from_an_Old_Manse/Rappaccini%27s_Daughter"
      },
      {
        "category": "literary",
        "title": "Victor Frankenstein on the danger of forbidden knowledge — Mary Shelley, Frankenstein (1831)",
        "excerpt": "Learn from me, if not by my precepts, at least by my example, how dangerous is the acquirement of knowledge, and how much happier that man is who believes his native town to be the world, than he who aspires to become greater than his nature will allow.",
        "source": "Mary Shelley, Frankenstein; or, the Modern Prometheus (Revised Edition, 1831), Chapter 4 — Wikisource (public domain)",
        "href": "https://en.wikisource.org/wiki/Frankenstein,_or_the_Modern_Prometheus_(Revised_Edition,_1831)/Chapter_4"
      },
      {
        "category": "artistic",
        "title": "Alexander Scriabin, \"Prometheus: The Poem of Fire,\" Op. 60 — MUSIC",
        "excerpt": "Scriabin's 1910 tone poem for orchestra, piano, wordless chorus and a color organ (clavier à lumières) casts the Prometheus myth as the ecstatic, dangerous gift of fire to humankind. Built on his shimmering \"mystic chord,\" the work fuses light and sound to evoke a creative-destructive force barely under human control — an apt sonic emblem for harnessing radiation, the modern fire we cannot see.",
        "source": "Aleksandr Scriabin — IMSLP work page",
        "href": "https://imslp.org/wiki/Prometheus,_Le_Po%C3%A8me_du_Feu,_Op.60_(Scriabin,_Aleksandr)"
      },
      {
        "category": "artistic",
        "title": "John William Waterhouse, \"Pandora\" (1896) — VISUAL ARTWORK",
        "excerpt": "Waterhouse paints the moment Pandora lifts the lid of the forbidden jar, an invisible mist of the world's evils escaping before she can stop it. Her calm curiosity captures how easily an unseen hazard is loosed and how impossible it becomes to shut it away again — the very risk in relaxing safeguards against a danger no eye can detect.",
        "source": "John William Waterhouse — Wikimedia Commons (public domain)",
        "href": "https://commons.wikimedia.org/wiki/File:John_William_Waterhouse_-_Pandora,_1896.jpg",
        "image": {
          "src": "/covers/nrc-radiation-rule-overhaul--art.png",
          "alt": "A young woman kneels beside an ornate golden casket and lifts its lid, a faint vapor curling out into the dim forest — Waterhouse's depiction of Pandora releasing the world's unseen ills.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 24
  },
  {
    "slug": "softbank-openai-margin-loan",
    "headline": "SoftBank revives talks for a $10 billion loan backed by its OpenAI stake",
    "overview": "SoftBank has reopened negotiations with banks for a $10 billion loan secured against its stake in OpenAI, offering to guarantee repayment after lenders balked at collateral tied solely to the hard-to-value shares. The financing would help fund the group's vast AI bets as it faces a March 2027 deadline to repay a $40 billion bridge loan.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiywFBVV95cUxPcHlPOXhkWFNZNWNNTG91STB2SHYzaDZRNXNGVXdVb1NRY2VRVDJFam1oQllaLWFoY29sM1hNbTFUSUNpWWxRVGtxQk44UHhNTGl5bnV6VnpXdVdSN3o5MFhmaFl2b3pnOXk5TTN1M2lkNmxTaWh2b2xqZUJqVlZMXzJsZUotdHRCWHJoOGZuUTJTM2k4bDZDekY5U3pBYVV6V3RZRGNFSEtnWl9PNTZ6b3hiMkNYUnZqOWlFNlNhNy1sdm5rVmdxcFRUWQ?oc=5"
      },
      {
        "name": "The Next Web",
        "href": "https://thenextweb.com/news/softbank-10b-margin-loan-openai-stake-collateral"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-02",
    "image": {
      "src": "/covers/softbank-openai-margin-loan.png",
      "alt": "A towering glass corporate skyscraper reflecting a cool evening sky, seen from below.",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 2 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Adam Smith on the Mississippi Scheme",
        "excerpt": "The idea of the possibility of multiplying paper to almost any extent was the real foundation of what is called the Mississippi scheme, the most extravagant project both of banking and stock-jobbing that, perhaps, the world ever saw.",
        "source": "An Inquiry into the Nature and Causes of the Wealth of Nations, Book II, Chapter II",
        "href": "https://www.marxists.org/reference/archive/smith-adam/works/wealth-of-nations/book02/ch02-2.htm"
      },
      {
        "category": "historical",
        "title": "Adam Smith on the South Sea Company",
        "excerpt": "But they had an immense capital divided among an immense number of proprietors. The knavery and extravagance of their stock-jobbing projects are sufficiently known, and the explication of them would be foreign to the present subject.",
        "source": "An Inquiry into the Nature and Causes of the Wealth of Nations, Book V, Chapter I",
        "href": "https://www.marxists.org/reference/archive/smith-adam/works/wealth-of-nations/book05/ch01c.htm"
      },
      {
        "category": "literary",
        "title": "Shylock's Bond in The Merchant of Venice",
        "excerpt": "Go with me to a notary, seal me there\nYour single bond; and, in a merry sport,\nIf you repay me not on such a day,\nIn such a place, such sum or sums as are\nExpress'd in the condition, let the forfeit\nBe nominated for an equal pound\nOf your fair flesh, to be cut off and taken\nIn what part of your body pleaseth me.",
        "source": "The Merchant of Venice, Act I, Scene III",
        "href": "https://www.gutenberg.org/files/1515/1515-h/1515-h.htm"
      },
      {
        "category": "literary",
        "title": "The Tulipomania",
        "excerpt": "In 1634, the rage among the Dutch to possess them was so great that the ordinary industry of the country was neglected, and the population, even to its lowest dregs, embarked in the tulip trade. People of all grades converted their property into cash, and invested it in flowers.",
        "source": "Memoirs of Extraordinary Popular Delusions and the Madness of Crowds, \"The Tulipomania\"",
        "href": "https://www.econlib.org/book-chapters/chapter-ch-3-the-tulipomania/"
      },
      {
        "category": "artistic",
        "title": "Franz Liszt, Les préludes, S.97 — MUSIC",
        "excerpt": "Liszt's third symphonic poem takes as its motto the notion that human life is but a series of preludes to an unknown song — a surge from tender beginnings through storm and struggle toward triumphant fulfilment. Its swelling brass and restless modulations dramatize ambition wagered against an uncertain fate, the very posture of one who mortgages the present on the promise of a coming boom.",
        "source": "IMSLP — Les préludes, S.97 (Liszt, Franz)",
        "href": "https://imslp.org/wiki/Les_pr%C3%A9ludes,_S.97_(Liszt,_Franz)"
      },
      {
        "category": "artistic",
        "title": "Quentin Massys, The Moneylender and His Wife — VISUAL ARTWORK",
        "excerpt": "Massys shows a banker absorbed in weighing gold coins and pearls while his wife's attention drifts from her devotional book to the glinting money on the table. The painting is an early meditation on the seductions of wealth and the fine reckoning of value — the eternal tension between spiritual duty and the appraisal of speculative fortune.",
        "source": "Wikimedia Commons — The Moneylender and his Wife (1514), Musée du Louvre",
        "href": "https://commons.wikimedia.org/wiki/File:Quinten_Massijs_(I)_-_The_Moneylender_and_his_Wife_-_WGA14281.jpg",
        "image": {
          "src": "/covers/softbank-openai-margin-loan--art.png",
          "alt": "A Flemish moneylender weighs gold coins and pearls on a balance scale while his wife, distracted from her prayer book, watches the money; a convex mirror on the table reflects a window and a reading figure.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 25
  },
  {
    "slug": "rembrandt-hidden-turban-restoration",
    "headline": "Restoration of an early Rembrandt reveals a turbaned figure painted out for centuries",
    "overview": "Conservators cleaning Rembrandt's early biblical scene 'Let the Little Children Come Unto Me' found that a later hand had painted a Dutch cap over a bearded man's turban and clothed a nude child, apparently softening the young artist's image of religious tolerance. The rediscovered work, begun around 1627, went to auction at Sotheby's in London with an estimate of 8 to 12 million pounds.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Artforum",
        "href": "https://www.artforum.com/news/restoration-of-rembrandt-painting-reveals-hidden-figure-1234753866/"
      },
      {
        "name": "ARTnews",
        "href": "https://www.artnews.com/art-news/market/rediscovered-restored-early-rembrandt-auction-sothebys-1234789939/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-02",
    "image": {
      "src": "/covers/rembrandt-hidden-turban-restoration.png",
      "alt": "A conservator examining a dark seventeenth-century oil painting under raking light in a studio.",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 2 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Union of Utrecht (1579), Article XIII — Dutch freedom of religion",
        "excerpt": "As for the matter of religion... each person shall remain free in his religion and that no one shall be investigated or persecuted because of his religion, as is provided in the Pacification of Ghent.",
        "source": "Union of Utrecht, 1579 (English translation), Article XIII",
        "href": "https://constitution.org/1-Constitution/cons/dutch/Union_Utrecht_1579.html"
      },
      {
        "category": "historical",
        "title": "T. L. Heath, The Method of Archimedes (1912) — the recovered palimpsest",
        "excerpt": "An attempt was made (fortunately with only partial success) to wash out the old writing, and then the parchment was used again, for the purpose of writing a Euchologion thereon, in the 12th—13th or 13th—14th centuries. The earlier writing appears with more or less clearness on most of the 177 leaves.",
        "source": "T. L. Heath, The Method of Archimedes, Recently Discovered by Heiberg (Cambridge University Press, 1912), Introductory Note",
        "href": "https://archive.org/details/methodofarchimed00arch"
      },
      {
        "category": "literary",
        "title": "Lessing, Nathan the Wise — the Parable of the Rings",
        "excerpt": "Let each feel honoured by this free affection. Unwarped of prejudice; let each endeavour To vie with both his brothers in displaying The virtue of his ring; assist its might With gentleness, benevolence, forbearance, With inward resignation to the godhead,",
        "source": "Gotthold Ephraim Lessing, Nathan the Wise, Act III (trans. William Taylor of Norwich), Project Gutenberg eBook 3820",
        "href": "https://www.gutenberg.org/ebooks/3820"
      },
      {
        "category": "literary",
        "title": "Milton, Areopagitica (1644) — Truth and Falsehood grapple",
        "excerpt": "And though all the windes of doctrin were let loose to play upon the earth, so Truth be in the field, we do injuriously, by licencing and prohibiting to misdoubt her strength. Let her and Falshood grapple; who ever knew Truth put to the wors, in a free and open encounter.",
        "source": "John Milton, Areopagitica (1644), John Milton Reading Room, Dartmouth (original spelling)",
        "href": "https://milton.host.dartmouth.edu/reading_room/areopagitica/text.shtml"
      },
      {
        "category": "artistic",
        "title": "Sweelinck, Fantasia cromatica, SwWV 258 — MUSIC",
        "excerpt": "Jan Pieterszoon Sweelinck's Fantasia cromatica is a keyboard fantasia built upon a slowly descending chromatic subject, threaded through ever-denser counterpoint. Composed by the great organist of Amsterdam's Oude Kerk at the dawn of the Dutch Golden Age, its winding lines seem to search through shadow toward resolution — an apt emblem, from Rembrandt's own city and era, for a buried image working its way back into the light.",
        "source": "Jan Pieterszoon Sweelinck, Fantasia cromatica (SwWV 258), for organ or harpsichord (IMSLP work page)",
        "href": "https://imslp.org/wiki/Fantasia_cromatica,_SwWV_258_(Sweelinck,_Jan_Pieterszoon)"
      },
      {
        "category": "artistic",
        "title": "Rembrandt, Man in Oriental Costume (\"The Noble Slav\") — VISUAL ARTWORK",
        "excerpt": "A separate, fully attested Rembrandt of 1632, now in the Metropolitan Museum of Art, portrays a dignified figure in a great turban and gold-brocaded robe. Like the turbaned man newly uncovered beneath layers of overpaint, it reflects the Dutch Golden Age's fascination with — and readiness to ennoble — the Near-Eastern 'other.'",
        "source": "Rembrandt van Rijn, Man in Oriental Costume (\"The Noble Slav\"), 1632, oil on canvas, The Metropolitan Museum of Art (public domain)",
        "href": "https://commons.wikimedia.org/wiki/File:Man_in_Oriental_Costume_(%22The_Noble_Slav%22)_MET_DP146479.jpg",
        "image": {
          "src": "/covers/rembrandt-hidden-turban-restoration--art.png",
          "alt": "Rembrandt's oil painting of a standing man in a large white turban and a richly embroidered golden robe, one hand resting on a staff, gazing calmly to the side against a dark ground.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 26
  },
  {
    "slug": "china-export-controls-japan",
    "headline": "China imposes export controls on 40 Japanese firms as tensions with Tokyo rise",
    "overview": "China announced new export controls targeting 40 Japanese companies, escalating a diplomatic and trade dispute with Tokyo. The measures restrict shipments to the named entities and mark a sharp deterioration in relations between Asia's two largest economies.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMinwFBVV95cUxPNC1UQ0FNc0t3cE41MlROU0dWZXplUGY5dUozSjVPM1R0MVotUzZkWFg3elRMOGRxNFFfeDBQSUFVME02ZDkzLXY3NlU5T3YzNGRxTUMzdW9iSTVDMWhtSk8xZ24yeWdmUEUzUFhrYzc0OG84b0dfUGRZRmI4OVAzNVRsZ2ZZXzhVUlBxeUpFMGFZQ0N6LWRpVURCNTl6a00?oc=5"
      },
      {
        "name": "Nikkei Asia",
        "href": "https://asia.nikkei.com/politics/international-relations/japan-china-tensions/china-restricts-exports-to-mitsubishi-hitachi-komatsu-units"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-01",
    "image": {
      "src": "/covers/china-export-controls-japan.png",
      "alt": "Rows of stacked shipping containers at a Chinese port under a grey, overcast sky.",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 1 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Napoleon's Berlin Decree and the Continental System (1806)",
        "excerpt": "Article 1. The British Isles are declared to be in a state of blockade.\n\nArticle 2. All commerce and all correspondence with the British Isles are forbidden. Consequently letters or packages directed to England or to an Englishman or written in the English language shall not pass through the mails and shall be seized.",
        "source": "Napoleon I, \"The Berlin Decree\" (21 November 1806), English translation, Wikisource.",
        "href": "https://en.wikisource.org/wiki/Berlin_Decree"
      },
      {
        "category": "historical",
        "title": "The Megarian Decree in Plutarch's Life of Pericles",
        "excerpt": "The Corinthians were incensed at this procedure, and denounced the Athenians at Sparta, and were joined by the Megarians, who brought their complaint that from every market-place and from all the harbors over which the Athenians had control, they were excluded and driven away, contrary to the common law and the formal oaths of the Greeks.",
        "source": "Plutarch, Life of Pericles 29, trans. Bernadotte Perrin (Loeb Classical Library, 1916), Perseus Digital Library, Tufts University.",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:2008.01.0055:chapter=29"
      },
      {
        "category": "literary",
        "title": "Aristophanes, The Acharnians",
        "excerpt": "Then Pericles, aflame with ire on his Olympian height, let loose the lightning, caused the thunder to roll, upset Greece and passed an edict, which ran like the song, 'That the Megarians be banished both from our land and from our markets and from the sea and from the continent.' Meanwhile the Megarians, who were beginning to die of hunger, begged the Lacedaemonians to bring about the abolition of the decree, of which those harlots were the cause; several times we refused their demand.",
        "source": "Aristophanes, The Acharnians, trans. anonymous (Athenian Society edition), Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/3012/3012-h/3012-h.htm"
      },
      {
        "category": "literary",
        "title": "Shakespeare, Coriolanus",
        "excerpt": "Suffer us to famish, and their storehouses crammed with grain; make edicts for usury to support usurers; repeal daily any wholesome act established against the rich, and provide more piercing statutes daily to chain up and restrain the poor.",
        "source": "William Shakespeare, Coriolanus, Act I, Scene 1 (First Citizen), Project Gutenberg.",
        "href": "https://www.gutenberg.org/cache/epub/1535/pg1535.txt"
      },
      {
        "category": "artistic",
        "title": "Beethoven, Wellington's Victory, Op. 91 — MUSIC",
        "excerpt": "Beethoven's battle piece stages the clash of two great powers as raw sound, marshalling the British side under Arne's 'Rule Britannia' against the French advancing to 'Malbrough s'en va-t-en guerre,' the two national tunes colliding in cannon-fire and drum-rolls. Composed to mark Wellington's rout of the French in 1813, it belongs to the same era of Napoleonic economic warfare and continental blockade, when commerce and armies alike were weapons between rival empires. Its programmatic din makes audible the theme of two dominant states locked in coercive confrontation, each refusing the other passage.",
        "source": "Ludwig van Beethoven, Wellingtons Sieg, Op. 91 (Wellington's Victory), IMSLP / Petrucci Music Library.",
        "href": "https://imslp.org/wiki/Wellingtons_Sieg,_Op.91_(Beethoven,_Ludwig_van)"
      },
      {
        "category": "artistic",
        "title": "James Gillray, The Plumb-pudding in danger — VISUAL ARTWORK",
        "excerpt": "Gillray's 1805 satire seats William Pitt and Napoleon at opposite ends of a table, each carving a slice from a globe-shaped plum pudding, coldly dividing the world into rival spheres of control. Pitt's trident-fork stakes Britain's claim to the oceans while Napoleon's blade sweeps across Europe, a vivid image of two dominant powers partitioning trade and territory between them. The print distills the logic of great-power economic rivalry, in which access to the world's commerce is something the strong apportion to themselves.",
        "source": "James Gillray, \"The Plumb-pudding in danger; –or– State Epicures taking un Petit Souper\" (1805), hand-coloured etching, Library of Congress via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Caricature_gillray_plumpudding.jpg",
        "image": {
          "src": "/covers/china-export-controls-japan--art.png",
          "alt": "James Gillray's 1805 caricature The Plumb-pudding in danger, showing Pitt and Napoleon carving up a globe-shaped pudding of the world.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 27
  },
  {
    "slug": "google-klarna-antitrust-sweden",
    "headline": "Swedish court orders Google to pay $1.5 billion to Klarna in antitrust case",
    "overview": "A Swedish court ordered Google to pay 1.5 billion dollars in damages to the payments company Klarna, finding the search giant had abused its market position. It is one of the largest private antitrust awards against Google in Europe.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiswFBVV95cUxPSUR2WFBXY0dxNVhUYnNOUDF2OWRvZTB2SDU3a2djdHF6NWRkRm1Fc1JTUDl2NENKQ0ZKaC15N1V5QzRLWXo0OGNLT2h4LU1fbWpCODBNMTh3VVJqcFlyTXA0ektubGxMQWx3NzFvblJ4SG1wcXpRQm93OVpmdkZ1cXowUk5yd3lnUjdMS2I1QldWa3NYdzEyaFV1YldrVWhqN3kzVnl3QjNhTktkaVkwNVl1Yw?oc=5"
      },
      {
        "name": "PYMNTS",
        "href": "https://www.pymnts.com/legal/antitrust/2026/klarnas-pricerunner-awarded-1-9-billion-in-google-antitrust-case/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-01",
    "image": {
      "src": "/covers/google-klarna-antitrust-sweden.png",
      "alt": "A glass corporate office tower reflecting a pale sky, seen from below.",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 1 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "David and Goliath (1 Samuel 17)",
        "excerpt": "Thou comest to me with a sword, and with a spear, and with a shield: but I come to thee in the name of the LORD of hosts, the God of the armies of Israel, whom thou hast defied.",
        "source": "The Bible (King James Version), 1 Samuel 17:45, Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/1_Samuel"
      },
      {
        "category": "historical",
        "title": "Theodore Roosevelt on the trusts (First Annual Message, 1901)",
        "excerpt": "Great corporations exist only because they are created and safeguarded by our institutions; and it is therefore our right and our duty to see that they work in harmony with these institutions.",
        "source": "Theodore Roosevelt, First State of the Union Address (3 December 1901), Wikisource",
        "href": "https://en.wikisource.org/wiki/Theodore_Roosevelt%27s_First_State_of_the_Union_Address"
      },
      {
        "category": "literary",
        "title": "Prometheus Bound by Aeschylus",
        "excerpt": "Such an ignominious bondage hath the new ruler of the immortals devised against me.",
        "source": "Aeschylus, Prometheus Bound (trans. Theodore Alois Buckley), Project Gutenberg eBook #27458",
        "href": "https://www.gutenberg.org/files/27458/27458-h/27458-h.htm"
      },
      {
        "category": "literary",
        "title": "Gulliver's Travels by Jonathan Swift",
        "excerpt": "I found my arms and legs were strongly fastened on each side to the ground; and my hair, which was long and thick, tied down in the same manner.",
        "source": "Jonathan Swift, Gulliver's Travels, Part I, Chapter I, Project Gutenberg eBook #829",
        "href": "https://www.gutenberg.org/files/829/829-h/829-h.htm"
      },
      {
        "category": "artistic",
        "title": "Judas Maccabaeus, HWV 63 by George Frideric Handel — MUSIC",
        "excerpt": "Handel's 1746 oratorio turns a small people's revolt against a mighty empire into blazing choral triumph, its trumpets and drums swelling as the underdog prevails. The famous chorus 'See, the Conqu'ring Hero Comes' crowns the victor not by sheer force but by righteous resolve. It is the sound of a colossus overmatched and a lesser rival exalted, an apt fanfare for a giant humbled in court.",
        "source": "George Frideric Handel, Judas Maccabaeus, HWV 63 (1746), IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Judas_Maccabaeus,_HWV_63_(Handel,_George_Frideric)"
      },
      {
        "category": "artistic",
        "title": "David with the Head of Goliath by Caravaggio — VISUAL ARTWORK",
        "excerpt": "Caravaggio's David with the Head of Goliath (c. 1610, Galleria Borghese) shows a pensive young shepherd holding aloft the severed head of the fallen giant. The tenebrist light isolates the trophy against darkness, making the toppling of overwhelming might feel intimate and sober rather than boastful. The image distills the theme of a smaller challenger who, against all odds, brings down a dominant power.",
        "source": "Michelangelo Merisi da Caravaggio, David with the Head of Goliath (c. 1610), Galleria Borghese, Rome; Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:David_with_the_Head_of_Goliath-Caravaggio_(1610).jpg",
        "image": {
          "src": "/covers/google-klarna-antitrust-sweden--art.png",
          "alt": "Caravaggio's painting David with the Head of Goliath, a young David holding the severed head of the giant Goliath against a dark background",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 28
  },
  {
    "slug": "un-panel-ai-catastrophic-risks",
    "headline": "UN scientific panel warns unchecked AI progress could pose catastrophic risks",
    "overview": "A United Nations expert panel warned that rapid, unchecked advances in artificial intelligence could pose catastrophic risks to humanity, while also citing enormous potential benefits. The report urged stronger international governance of the technology.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMirgFBVV95cUxPZzlYcjZBRTVTUHhqcGM3ZXZwVS1XWktHaWVmckFuZjg1bzZPNnZqWDJxUzktV2c4TDA5VHY4ajIxbjVrb21MYnRiM0Q3WDRmMUZZQWxpWlZzZGh4QlVsWF82SGlYZ3lSZVNab056ZWdhTWphSnhXY2lZZHUxb19oWF9udWpTQnNGWkFVVFo0Y0VPckVYTkU5VmozMHA2dE9OanE3SER1cFVzN0U4WkE?oc=5"
      },
      {
        "name": "UN News",
        "href": "https://news.un.org/en/story/2026/07/1167848"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-01",
    "image": {
      "src": "/covers/un-panel-ai-catastrophic-risks.png",
      "alt": "Rows of glowing server racks receding into darkness in a data centre.",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 1 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Prometheus steals fire from the gods",
        "excerpt": "He hid fire; but that the noble son of Iapetus stole again for men from Zeus the counsellor in a hollow fennel-stalk, so that Zeus who delights in thunder did not see it. But afterwards Zeus who gathers the clouds said to him in anger: 'Son of Iapetus, surpassing all in cunning, you are glad that you have outwitted me and stolen fire—a great plague to you yourself and to men that shall be.'",
        "source": "Hesiod, Works and Days, trans. Hugh G. Evelyn-White, Perseus Digital Library, Tufts University",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0132:card=42"
      },
      {
        "category": "historical",
        "title": "Pandora opens the jar of evils",
        "excerpt": "But the woman took off the great lid of the jar with her hands and scattered, all these and her thought caused sorrow and mischief to men. Only Hope remained there in an unbreakable home within under the rim of the great jar, and did not fly out at the door.",
        "source": "Hesiod, Works and Days, trans. Hugh G. Evelyn-White, Perseus Digital Library, Tufts University",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0132:card=90"
      },
      {
        "category": "literary",
        "title": "Frankenstein warns of dangerous knowledge",
        "excerpt": "Learn from me, if not by my precepts, at least by my example, how dangerous is the acquirement of knowledge and how much happier that man is who believes his native town to be the world, than he who aspires to become greater than his nature will allow.",
        "source": "Mary Shelley, Frankenstein; or, The Modern Prometheus, Project Gutenberg",
        "href": "https://www.gutenberg.org/files/84/84-h/84-h.htm"
      },
      {
        "category": "literary",
        "title": "Faust's fateful bargain",
        "excerpt": "When thus I hail the Moment flying: 'Ah, still delay—thou art so fair!' Then bind me in thy bonds undying, My final ruin then declare!",
        "source": "Johann Wolfgang von Goethe, Faust, trans. Bayard Taylor, Project Gutenberg",
        "href": "https://www.gutenberg.org/files/14591/14591-h/14591-h.htm"
      },
      {
        "category": "artistic",
        "title": "Paul Dukas, L'apprenti sorcier — MUSIC",
        "excerpt": "Paul Dukas's orchestral scherzo L'apprenti sorcier (The Sorcerer's Apprentice, 1897) sets Goethe's ballad in which an apprentice enchants a broom to fetch water, only to lose control of the force he has summoned. Unable to reverse the spell, he watches his creation multiply and flood the workshop until the master returns to restore order. The music has become a byword for a powerful technology unleashed without the wisdom to command it—an apt parallel to warnings that AI is outpacing our ability to govern it.",
        "source": "Paul Dukas, L'apprenti sorcier (score and parts), International Music Score Library Project (IMSLP)",
        "href": "https://imslp.org/wiki/L%27apprenti_sorcier_(Dukas,_Paul)"
      },
      {
        "category": "artistic",
        "title": "Heinrich Füger, Prometheus Brings Fire to Mankind — VISUAL ARTWORK",
        "excerpt": "Heinrich Friedrich Füger's neoclassical canvas Prometheus Brings Fire to Mankind (c. 1817) shows the Titan pressing a stolen flame toward newly formed humanity, a gift of transformative power that Zeus had deliberately withheld. The painting captures the double edge of the myth: the same fire that lifts humankind toward civilization also invites divine retribution and unforeseen consequences. It stands as an enduring image of a creation both liberating and perilous, echoing debates over an AI technology whose promise is matched by its capacity for catastrophic harm.",
        "source": "Heinrich Friedrich Füger, Prometheus Brings Fire to Mankind (c. 1817), Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Heinrich_fueger_1817_prometheus_brings_fire_to_mankind.jpg",
        "image": {
          "src": "/covers/un-panel-ai-catastrophic-risks--art.png",
          "alt": "Neoclassical painting of the Titan Prometheus bringing fire to reclining human figures",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 29
  },
  {
    "slug": "kroger-giant-eagle-acquisition",
    "headline": "Kroger to buy grocery chain Giant Eagle in a $1.65 billion deal",
    "overview": "The supermarket giant Kroger agreed to acquire the regional grocer Giant Eagle for 1.65 billion dollars, expanding its footprint as competition in US grocery intensifies. The deal adds Giant Eagle's stores and fuel outlets to Kroger's national network.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMimwFBVV95cUxOU0xTcWNLdGw2QWFGbUtjLTBIcjFtQXIybUdxTlRJdE9lV0F4ZlZsWkxndjgxek5UWVRuX1ZtVEFMbHRSaC1LaV9jd2IxNGphblY3X1NjZWtKbEtfalM3VzJxX2R1anJYM2JMS0NpSzM0S0MzSGZsSjVXTEx5R1FsOU1pMkZWTURwYl9IT2g0Tk9SenMyeFFfd2Z3dw?oc=5"
      },
      {
        "name": "Supermarket News",
        "href": "https://www.supermarketnews.com/mergers-acquisitions/kroger-to-acquire-giant-eagle-for-1-65b"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-01",
    "image": {
      "src": "/covers/kroger-giant-eagle-acquisition.png",
      "alt": "A brightly lit supermarket aisle lined with stocked shelves, empty of shoppers.",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 1 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Cleveland Conquest: Standard Oil absorbs its rivals",
        "excerpt": "In less than four months in 1872, in what was later known as \"The Cleveland Conquest\" or \"The Cleveland Massacre\", Standard Oil absorbed 22 of its 26 Cleveland competitors. By 1880, through elimination of competitors, mergers with other firms, and use of favourable railroad rebates, it controlled the refining of 90 to 95 percent of all oil produced in the United States.",
        "source": "Encyclopaedia Britannica, \"Standard Oil | History, Monopoly, & Breakup\"",
        "href": "https://www.britannica.com/money/Standard-Oil"
      },
      {
        "category": "historical",
        "title": "The Sherman Antitrust Act of 1890",
        "excerpt": "Every contract, combination in the form of trust or otherwise, or conspiracy, in restraint of trade or commerce among the several States, or with foreign nations, is hereby declared to be illegal.",
        "source": "Sherman Anti-Trust Act (1890), Section 1, U.S. National Archives, Milestone Documents",
        "href": "https://www.archives.gov/milestone-documents/sherman-anti-trust-act"
      },
      {
        "category": "literary",
        "title": "Ahab's boundless pursuit of the White Whale in Moby-Dick",
        "excerpt": "Aye, aye! and I'll chase him round Good Hope, and round the Horn, and round the Norway Maelstrom, and round perdition's flames before I give him up. And this is what ye have shipped for, men! to chase that white whale on both sides of land, and over all sides of earth, till he spouts black blood and rolls fin out.",
        "source": "Herman Melville, Moby-Dick; or, The Whale (1851), Chapter 36, \"The Quarter-Deck\"; Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/2701/pg2701.txt"
      },
      {
        "category": "literary",
        "title": "The Parable of the Talents: to him that hath shall be given",
        "excerpt": "Take therefore the talent from him, and give it unto him which hath ten talents. For unto every one that hath shall be given, and he shall have abundance: but from him that hath not shall be taken away even that which he hath.",
        "source": "The Gospel According to St. Matthew 25:28-29, King James Bible; Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/10/pg10.txt"
      },
      {
        "category": "artistic",
        "title": "Smetana, Vltava (The Moldau) from Má vlast — MUSIC",
        "excerpt": "Bedřich Smetana's symphonic poem Vltava (1874) traces the course of Bohemia's great river from its two tiny mountain springs, whose trickling motifs merge and swell until they become a single mighty current sweeping toward Prague. The music dramatizes how many small tributaries are gathered up and absorbed into one dominant flow, a natural image of consolidation and the great growing ever greater by drawing in the small. The score is in the public domain and freely available on IMSLP.",
        "source": "Bedřich Smetana, Vltava, JB 1:112/2 (from Má vlast), 1874; IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Vltava,_JB_1:112/2_(Smetana,_Bed%C5%99ich)"
      },
      {
        "category": "artistic",
        "title": "Pieter Bruegel the Elder, \"Big Fish Eat Little Fish\" — VISUAL ARTWORK",
        "excerpt": "Pieter Bruegel the Elder's 1556 design, engraved by Pieter van der Heyden in 1557, shows an enormous beached fish being sliced open to spill out dozens of smaller fish it has swallowed, while a man points out the scene to a boy and hands hold up ever-smaller fish devouring one another. The proverb it illustrates, \"the big fish eat the little fish,\" is a centuries-old emblem for how the powerful consume the weak and how markets tend toward the great absorbing the small. The work is in the public domain and held at the Rijksmuseum and other collections.",
        "source": "Pieter Bruegel the Elder, \"Big Fish Eat Little Fish,\" 1556 (engraving by Pieter van der Heyden, 1557); Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_the_Elder_-_Big_Fish_Eat_Little_Fish,_1556_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/kroger-giant-eagle-acquisition--art.png",
          "alt": "Bruegel's engraving Big Fish Eat Little Fish, showing a giant fish cut open to reveal many smaller fish it swallowed",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 30
  },
  {
    "slug": "cma-cgm-fedex-logistics-deal",
    "headline": "CMA CGM to buy FedEx's third-party logistics arm in a $1.4 billion deal",
    "overview": "The French shipping group CMA CGM agreed to acquire FedEx's third-party logistics business for 1.4 billion dollars, deepening its move into contract logistics. The purchase expands CMA CGM's land-based supply-chain operations beyond container shipping.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMitgFBVV95cUxQdS1JUGhGT0JHVHBZOTQ4UEVQb0xGMXlVbDl1RDlsWWJfM21abmZ3Yk9ydHdKdWpBM09yS0xnV0duNl80Mkh0Z2NUVmVMTkRwcEJpSTBiajBYOW9vMnRMT0JNWHlSRld1YVZvVlk2YTFjbDBURllmVTlFREdCMHBtRzdwcDZrbGhUbmlZNnktZlBaZUxfMElBSW95OU5zeFpoRWVsNGlxeGpGOElxNm5iczBJLTJrQQ?oc=5"
      },
      {
        "name": "Supply Chain Dive",
        "href": "https://www.supplychaindive.com/news/cma-cgm-to-buy-fedexs-contract-logistics-unit-for-14b/824222/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-01",
    "image": {
      "src": "/covers/cma-cgm-fedex-logistics-deal.png",
      "alt": "A container ship stacked with cargo docked beside cranes at a port terminal.",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 1 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Hanseatic League",
        "excerpt": "Hanseatic League, organization founded by north German towns and German merchant communities abroad to protect their mutual trading interests. The league dominated commercial activity in northern Europe from the 13th to the 15th century.",
        "source": "\"Hanseatic League,\" Encyclopaedia Britannica",
        "href": "https://www.britannica.com/topic/Hanseatic-League"
      },
      {
        "category": "historical",
        "title": "The Phoenician Sea Traders",
        "excerpt": "The Phoenicians were well known to their contemporaries as sea traders and colonizers, and by the 2nd millennium they had already extended their influence along the coast of the Levant by a series of settlements, including Joppa (Jaffa, now part of Tel Aviv–Yafo), Dor, Acre, and Ugarit.",
        "source": "\"Phoenicia,\" Encyclopaedia Britannica",
        "href": "https://www.britannica.com/topic/Phoenicia"
      },
      {
        "category": "literary",
        "title": "Homer, The Odyssey (Book II)",
        "excerpt": "They set the mast in its socket in the cross plank, raised it, and made it fast with the forestays; then they hoisted their white sails aloft with ropes of twisted ox hide. As the sail bellied out with the wind, the ship flew through the deep blue water, and the foam hissed against her bows as she sped onward.",
        "source": "Homer, The Odyssey, trans. Samuel Butler (Project Gutenberg, eBook #1727)",
        "href": "https://www.gutenberg.org/files/1727/1727-0.txt"
      },
      {
        "category": "literary",
        "title": "Shakespeare, The Merchant of Venice (Act 1, Scene 1)",
        "excerpt": "Your minde is tossing on the Ocean,\nThere where your Argosies with portly saile\nLike Signiors and rich Burgers on the flood,\nOr as it were the Pageants of the sea,\nDo ouer-peere the pettie Traffiquers\nThat curtsie to them, do them reuerence\nAs they flye by them with their wouen wings",
        "source": "William Shakespeare, The Merchant of Venice (First Folio text, Project Gutenberg, eBook #2243)",
        "href": "https://www.gutenberg.org/cache/epub/2243/pg2243.txt"
      },
      {
        "category": "artistic",
        "title": "Mendelssohn, Meeresstille und glückliche Fahrt (Calm Sea and Prosperous Voyage), Op. 27 — MUSIC",
        "excerpt": "Felix Mendelssohn's concert overture of 1828, inspired by two Goethe poems, paints in music the dread stillness of a becalmed ship and then the joyous rush of a returning wind that carries the vessel safely to harbour. Its slow, motionless opening followed by a bright, surging Allegro mirrors the perilous patience and eventual triumph of a maritime voyage. The overture became a touchstone for Romantic sea music, evoking the movement of ships and goods across open water.",
        "source": "Felix Mendelssohn, Meeresstille und glückliche Fahrt, Op. 27 (IMSLP / Petrucci Music Library)",
        "href": "https://imslp.org/wiki/Meeresstille_und_gl%C3%BCckliche_Fahrt,_Op.27_(Mendelssohn,_Felix)"
      },
      {
        "category": "artistic",
        "title": "J. M. W. Turner, Dutch Boats in a Gale ('The Bridgewater Sea Piece') — VISUAL ARTWORK",
        "excerpt": "J. M. W. Turner's 1801 oil painting shows Dutch fishing and trading vessels struggling under billowing sails in a heavy sea, the water churning as the boats fight to keep their course. The scene captures the danger and drama of commerce carried by ship, when the movement of goods across the water depended on wind, seamanship, and nerve. Turner's dynamic seascape stands as a Romantic emblem of maritime trade at the mercy of the elements.",
        "source": "J. M. W. Turner, Dutch Boats in a Gale ('The Bridgewater Sea Piece'), 1801, oil on canvas — Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Joseph_Mallord_William_Turner_-_Dutch_Boats_in_a_Gale_-_WGA23163.jpg",
        "image": {
          "src": "/covers/cma-cgm-fedex-logistics-deal--art.png",
          "alt": "Turner's painting of Dutch sailing boats pitching in a stormy sea under heavy clouds",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 31
  },
  {
    "slug": "micron-gm-chip-supply-deal",
    "headline": "Micron and General Motors sign a semiconductor supply agreement for vehicles",
    "overview": "The chipmaker Micron and General Motors signed a multi-year agreement to supply memory chips for GM vehicles, tightening ties between US automakers and domestic semiconductor suppliers. The deal reflects a broader push to secure automotive chip supply chains.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiowFBVV95cUxOTzBDSjNpak1rX0FwX3phTURLa2dYbkRSUzFyWDNBTlZ0MXR3aElaWEhjMEUxOHRiNmY1NWlRYm50ZUxiRl9zcldSUjBQNGNCV0tDdGpSLUNyTEZleXpFSUphSEk2RVRURGU0QS00Q1hHZkdoUU44UXBLeEhVM3FQSTBLdjVNNUpMT0t6cjNndW1zNWlIcVBRNm43T3FJaGNoaEw4?oc=5"
      },
      {
        "name": "Yahoo Finance",
        "href": "https://finance.yahoo.com/technology/articles/general-motors-shares-rise-securing-133524326.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-01",
    "image": {
      "src": "/covers/micron-gm-chip-supply-deal.png",
      "alt": "A silicon wafer held under bright light, its circuitry catching a rainbow sheen.",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 1 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Augustus and Rome's grain supply",
        "excerpt": "I was strongly inclined to do away forever with distributions of grain, because through dependence on them agriculture was neglected; but I did not carry out my purpose, feeling sure that they would one day be renewed through desire for popular favour.",
        "source": "Suetonius, The Lives of the Caesars, \"The Deified Augustus\" 42, trans. J. C. Rolfe (Loeb Classical Library, 1914), public domain (LacusCurtius/Penelope, University of Chicago).",
        "href": "https://penelope.uchicago.edu/Thayer/e/roman/texts/suetonius/12caesars/augustus*.html"
      },
      {
        "category": "historical",
        "title": "Pliny on iron, the maker's essential metal",
        "excerpt": "Iron serves as the best and the worst part of the apparatus of life, inasmuch as with it we plough the ground, plant trees, trim the trees that prop our vines, force the vines to renew their youth yearly by ridding them of decrepit growth; with it we build houses and quarry rocks, and we employ it for all other useful purposes, but we likewise use it for wars and slaughter and brigandage.",
        "source": "Pliny the Elder, Natural History, Book XXXIV.39, trans. H. Rackham (Loeb Classical Library), public domain (Attalus.org).",
        "href": "https://www.attalus.org/pliny/hn34b.html"
      },
      {
        "category": "literary",
        "title": "Hephaestus forges the arms of Achilles (Iliad, Book 18)",
        "excerpt": "And the bellows, twenty in all, blew upon the melting-vats, sending forth a ready blast of every force, now to further him as he laboured hard, and again in whatsoever way Hephaestus might wish and his work go on.",
        "source": "Homer, Iliad 18, trans. A. T. Murray (Harvard University Press / Loeb Classical Library, 1924), public domain (Perseus Digital Library, Tufts University).",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0134:book=18"
      },
      {
        "category": "literary",
        "title": "The forging of the sword Gram (Volsunga Saga)",
        "excerpt": "So he made a sword, and as he bore it forth from the forge, it seemed to the smiths as though fire burned along the edges thereof. Now he bade Sigurd take the sword, and said he knew not how to make a sword if this one failed. Then Sigurd smote it into the anvil, and cleft it down to the stock thereof, and neither burst the sword nor brake it.",
        "source": "The Story of the Volsungs (Volsunga Saga), Chapter XV, trans. Eirikr Magnusson and William Morris (1888), public domain (Project Gutenberg).",
        "href": "https://www.gutenberg.org/files/1152/1152-h/1152-h.htm"
      },
      {
        "category": "artistic",
        "title": "Wagner, Siegfried (the Forging Song) — MUSIC",
        "excerpt": "In the first act of Wagner's music drama Siegfried, the second opera of the Ring cycle, the young hero reforges the shards of his father's shattered sword Nothung, singing the ringing \"Schmiedelieder\" (Forging Songs) as he blows the bellows and hammers the blade on the anvil. The orchestra drives the scene with hammer-stroke rhythms, dramatizing self-reliance and the making of one's own essential weapon from raw material. This IMSLP page hosts public-domain full and vocal scores of the work.",
        "source": "Richard Wagner, Siegfried, WWV 86C (1876), full and vocal scores, public domain, IMSLP Petrucci Music Library.",
        "href": "https://imslp.org/wiki/Siegfried,_WWV_86C_(Wagner,_Richard)"
      },
      {
        "category": "artistic",
        "title": "Velázquez, The Forge of Vulcan — VISUAL ARTWORK",
        "excerpt": "Diego Velázquez's Apollo in the Forge of Vulcan (La Fragua de Vulcano, 1630, Museo del Prado) shows Apollo arriving at the smoky workshop where Vulcan and his laborers pause at the anvil, glowing iron in hand. It is a monumental study of the smith's craft and of skilled makers supplying the tools and armor on which gods and heroes depend. The painting is in the public domain and held in the Prado, Madrid.",
        "source": "Diego Velázquez, Apollo in the Forge of Vulcan (La Fragua de Vulcano), 1630, oil on canvas, Museo del Prado, Madrid; public domain, via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Vel%C3%A1zquez_-_La_Fragua_de_Vulcano_(Museo_del_Prado,_1630).jpg",
        "image": {
          "src": "/covers/micron-gm-chip-supply-deal--art.png",
          "alt": "Velázquez's painting The Forge of Vulcan, showing Apollo visiting Vulcan and his smiths at the anvil",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 32
  },
  {
    "slug": "poland-russia-sabotage-warning",
    "headline": "Poland warns Russia is seeking to exploit Ukraine tensions with sabotage operations",
    "overview": "Poland warned that Russia is seeking to exploit tensions over Ukraine by mounting sabotage operations across Europe, citing a rise in arson, cyberattacks and other disruptions. Warsaw said it had stepped up security in response to the threat.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiuAFBVV95cUxQdGNZQnZSazhzRWRvTFhYQjQ0NG9NYmhMdGRmQUxYLTkzUUlrMUtRTll5TlFkbG5DM2hzdU1SSVJCSnJqVHFKcE5IUUdWcE9ZSXJySkF5dUpHTWZmVFZLdnRLeHdtVkUxU2piUUllWEFscmdzbVFhMU1vWk1VbW40TkM1UVJrWVBaZnNlSHI4RVNqWlFOTnZlaXotaWRjbFdOdUJQMjVqVDlUNW5udnBCbTU5YTNKOGk3?oc=5"
      },
      {
        "name": "Ukrainska Pravda",
        "href": "https://www.yahoo.com/news/world/articles/poland-warns-russia-may-exploit-085300859.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-01",
    "image": {
      "src": "/covers/poland-russia-sabotage-warning.png",
      "alt": "Empty railway tracks stretching into darkness under a single security floodlight.",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 1 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Sun Tzu, The Art of War, Chapter XIII: The Use of Spies",
        "excerpt": "Thus, what enables the wise sovereign and the good general to strike and conquer, and achieve things beyond the reach of ordinary men, is _foreknowledge_. Now this foreknowledge cannot be elicited from spirits; it cannot be obtained inductively from experience, nor by any deductive calculation. Knowledge of the enemy's dispositions can only be obtained from other men.",
        "source": "Sun Tzu, The Art of War, trans. Lionel Giles (1910), Chapter XIII: The Use of Spies, Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/17405/17405-h/17405-h.htm"
      },
      {
        "category": "historical",
        "title": "The Gunpowder Plot: Guy Fawkes's Confession (1605)",
        "excerpt": "I stood as sentinel, to descrie any man that came near, whereof I gave them warning, and so they ceased until I gave notice again to proceed.",
        "source": "Thomas Lathbury, Guy Fawkes; or, A Complete History of the Gunpowder Treason, quoting Guy Fawkes's confession (1605), Project Gutenberg.",
        "href": "https://gutenberg.org/files/31031/31031-h/31031-h.htm"
      },
      {
        "category": "literary",
        "title": "Virgil, The Aeneid, Book II: The Trojan Horse",
        "excerpt": "Thus they pretend, but in the hollow side\nSelected numbers of their soldiers hide:\nWith inward arms the dire machine they load,\nAnd iron bowels stuff the dark abode.",
        "source": "Virgil, The Aeneid, trans. John Dryden, Book II, Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/228/228-h/228-h.htm"
      },
      {
        "category": "literary",
        "title": "Joseph Conrad, The Secret Agent",
        "excerpt": "The door of the shop was the only means of entrance to the house in which Mr Verloc carried on his business of a seller of shady wares, exercised his vocation of a protector of society, and cultivated his domestic virtues.",
        "source": "Joseph Conrad, The Secret Agent: A Simple Tale (1907), Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/974/974-h/974-h.htm"
      },
      {
        "category": "artistic",
        "title": "Giuseppe Verdi, Un ballo in maschera — MUSIC",
        "excerpt": "Verdi's 1859 opera dramatises a hidden conspiracy: behind the glittering surface of court life, a circle of plotters conspires in secret to assassinate the ruler, their treachery masked until it strikes at a masked ball. Its brooding conspirators' choruses and whispered scheming make it a musical portrait of the enemy within — subversion, betrayal and a plot hatched behind the lines. The full orchestral score, published by Ricordi, is freely available on IMSLP.",
        "source": "Giuseppe Verdi, Un ballo in maschera (opera in three acts, 1859), full score, G. Ricordi; IMSLP / Petrucci Music Library.",
        "href": "https://imslp.org/wiki/Un_ballo_in_maschera_(Verdi,_Giuseppe)"
      },
      {
        "category": "artistic",
        "title": "Giovanni Domenico Tiepolo, The Procession of the Trojan Horse in Troy — VISUAL ARTWORK",
        "excerpt": "Giovanni Domenico Tiepolo's canvas (c. 1773) shows the Trojans jubilantly hauling the great wooden horse through their own gates, unaware that armed Greeks lie concealed within it. The painting captures the essence of the fifth column and the hidden enemy: destruction welcomed inside the walls under the guise of a gift. It is a Rococo meditation on deception, misplaced trust and sabotage carried out from within.",
        "source": "Giovanni Domenico Tiepolo, The Procession of the Trojan Horse in Troy (c. 1773), oil on canvas, National Gallery, London (NG3319); Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Giovanni_Domenico_Tiepolo_-_The_Procession_of_the_Trojan_Horse_in_Troy_-_WGA22382.jpg",
        "image": {
          "src": "/covers/poland-russia-sabotage-warning--art.png",
          "alt": "Painting of Trojans pulling the large wooden horse into the city of Troy, concealing hidden Greek soldiers",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 33
  },
  {
    "slug": "romania-storm-deadly",
    "headline": "A powerful storm sweeps Romania, killing at least one person",
    "overview": "A powerful storm battered Romania with high winds and heavy rain, killing at least one person and causing widespread damage. Emergency services responded to fallen trees and flooding as the severe weather moved across the country.",
    "genre": "Climate",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMipAFBVV95cUxNOG9yVnhOaFRqZUZGV3ZPZ1ZRYWdwQl9yZHQ0Y2dZZ3d2V2I1cVk3XzVvbms0WlRVc2U1eUdYd3RBdUtjWmZyRWJ0TVZzSEZEZFozVDZDaVFnYWl5eU9Ibzc1cmdaemhLUkxKelNNVGRGSjNNT2o0bFA2enpKWFloa1JlWjAtNE91ZENTaFFsREEzVHR3WVRYRDRNbkJlSjdrYldpMQ?oc=5"
      },
      {
        "name": "Romania Insider",
        "href": "https://www.romania-insider.com/powerful-storm-bucharest-july1-2026"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-01",
    "image": {
      "src": "/covers/romania-storm-deadly.png",
      "alt": "Dark storm clouds massing over the rooftops of a Central European city.",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 1 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Great Storm of 1703, as recorded by Daniel Defoe",
        "excerpt": "the Bricks, Tiles, and Stones, from the Tops of the Houses, flew with such force, and so thick in the Streets, that no one thought fit to venture out",
        "source": "Daniel Defoe, The Storm; or, a Collection of the most Remarkable Casualties and Disasters which happen'd in the Late Dreadful Tempest, both by Sea and Land (1704), Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/42234/42234-h/42234-h.htm"
      },
      {
        "category": "historical",
        "title": "Aeolus unleashes the winds in Virgil's Aeneid, Book I",
        "excerpt": "The raging winds rush thro' the hollow wound, / And dance aloft in air, and skim along the ground; / Then, settling on the sea, the surges sweep, / Raise liquid mountains, and disclose the deep.",
        "source": "Virgil, The Aeneid, Book I, translated by John Dryden, Project Gutenberg.",
        "href": "https://www.gutenberg.org/cache/epub/228/pg228.txt"
      },
      {
        "category": "literary",
        "title": "King Lear rages against the storm, Act III, Scene 2",
        "excerpt": "Blow, winds, and crack your cheeks! Rage! blow! You cataracts and hurricanoes, spout Till you have drench'd our steeples, drown'd the cocks! You sulphurous and thought-executing fires, Vaunt-couriers to oak-cleaving thunderbolts, Singe my white head! And thou, all-shaking thunder, Strike flat the thick rotundity o' the world!",
        "source": "William Shakespeare, King Lear, Act III, Scene 2, Project Gutenberg.",
        "href": "https://www.gutenberg.org/cache/epub/1532/pg1532.txt"
      },
      {
        "category": "literary",
        "title": "The tempest sent upon Jonah's ship, Book of Jonah 1:4-5",
        "excerpt": "But the LORD sent out a great wind into the sea, and there was a mighty tempest in the sea, so that the ship was like to be broken. Then the mariners were afraid, and cried every man unto his god, and cast forth the wares that were in the ship into the sea, to lighten it of them.",
        "source": "The Book of Jonah 1:4-5, King James Version, Wikisource.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Jonah"
      },
      {
        "category": "artistic",
        "title": "Beethoven's Symphony No. 6 in F major, Op. 68 (Pastoral), 4th movement 'Gewitter, Sturm' — MUSIC",
        "excerpt": "The fourth movement of Beethoven's Pastoral Symphony, marked 'Gewitter, Sturm' (Thunderstorm, Tempest), erupts as a sudden violent storm that shatters the pastoral calm of the preceding movements. Rumbling low strings, stabbing timpani and shrieking piccolo evoke gathering wind, lightning and torrential downpour before the tempest gradually subsides. It stands as one of music's most vivid depictions of nature's fury unleashed.",
        "source": "Ludwig van Beethoven, Symphony No. 6 in F major, Op. 68 ('Pastoral'), fourth movement, full score, IMSLP / Petrucci Music Library.",
        "href": "https://imslp.org/wiki/Symphony_No.6,_Op.68_(Beethoven,_Ludwig_van)"
      },
      {
        "category": "artistic",
        "title": "J. M. W. Turner, 'Snow Storm: Steam-Boat off a Harbour's Mouth' (c. 1842) — VISUAL ARTWORK",
        "excerpt": "Turner's late masterpiece dissolves a steamboat into a swirling vortex of snow, spray and churning sea, placing the viewer at the heart of the tempest itself. The artist claimed he had himself lashed to the mast of a ship to witness such a storm, and the painting's whirling energy conveys the overwhelming, engulfing violence of wind and water. It is a quintessential Romantic image of nature's sublime fury overwhelming human endeavour.",
        "source": "Joseph Mallord William Turner, Snow Storm: Steam-Boat off a Harbour's Mouth, oil on canvas, c. 1842, Tate Britain; public domain reproduction via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Joseph_Mallord_William_Turner_-_Snow_Storm_-_Steam-Boat_off_a_Harbour%27s_Mouth_-_WGA23178.jpg",
        "image": {
          "src": "/covers/romania-storm-deadly--art.png",
          "alt": "Turner's painting Snow Storm: Steam-Boat off a Harbour's Mouth, a steamboat engulfed in a swirling vortex of snow, spray and turbulent sea.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 34
  },
  {
    "slug": "uganda-marburg-case",
    "headline": "Africa CDC says Uganda has confirmed an isolated case of Marburg virus",
    "overview": "The Africa Centres for Disease Control said Uganda had confirmed an isolated case of Marburg virus disease, a highly lethal hemorrhagic fever related to Ebola. Health authorities said contact tracing was under way to contain any spread.",
    "genre": "Science",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMi0gFBVV95cUxNYnE5dWdkeVJ4b3FqWC1jdG1UYXl6NTFfaUtLWDlwNFJjU2hvUHpKWFpkd0UyQXVObkttRndNVGpSbG5QaDVMUU9SdUI0amplZ1JzMGZ4QzV2WEJjeGFaVzdJMk56NU0tY191RVBQVENBRk1ZakJvb0FXX1BtZlZVOGt1VmRyLUIwaUVWalZvU01ORFJLakY4QlJZeFUxMm1ibWF1VUVub3BnVTdtZ01Ha3ZlYXpfd0lfdDRkTFoyVk5KdmtQV1JLcUk4NlJrTmw0WFE?oc=5"
      },
      {
        "name": "STAT News",
        "href": "https://www.statnews.com/2026/06/30/marburg-virus-cases-ugandan-ebola-outbreak-zone/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-01",
    "image": {
      "src": "/covers/uganda-marburg-case.png",
      "alt": "A lab technician in full protective gear handling vials in a biosafety laboratory.",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 1 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Thucydides on the Plague of Athens",
        "excerpt": "As a rule, however, there was no ostensible cause; but people in good health were all of a sudden attacked by violent heats in the head, and redness and inflammation in the eyes, the inward parts, such as the throat or tongue, becoming bloody and emitting an unnatural and fetid breath.",
        "source": "Thucydides, History of the Peloponnesian War, Book 2, ch. 49 (Wikisource, Crawley translation)",
        "href": "https://en.wikisource.org/wiki/History_of_the_Peloponnesian_War/Book_2"
      },
      {
        "category": "historical",
        "title": "Boccaccio's account of the Black Death in Florence",
        "excerpt": "in men and women alike there appeared, at the beginning of the malady, certain swellings, either on the groin or under the armpits, whereof some waxed of the bigness of a common apple, others like unto an egg",
        "source": "Giovanni Boccaccio, The Decameron, Introduction to the First Day, trans. John Payne (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/23700/pg23700.txt"
      },
      {
        "category": "literary",
        "title": "Daniel Defoe, A Journal of the Plague Year",
        "excerpt": "Business led me out sometimes to the other end of the town, even when the sickness was chiefly there; and as the thing was new to me, as well as to everybody else, it was a most surprising thing to see those streets which were usually so thronged now grown desolate, and so few people to be seen in them.",
        "source": "Daniel Defoe, A Journal of the Plague Year (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/376/376-h/376-h.htm"
      },
      {
        "category": "literary",
        "title": "Edgar Allan Poe, The Masque of the Red Death",
        "excerpt": "The \"Red Death\" had long devastated the country. No pestilence had ever been so fatal, or so hideous. Blood was its Avatar and its seal--the redness and the horror of blood.",
        "source": "Edgar Allan Poe, The Masque of the Red Death (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/1064/pg1064.txt"
      },
      {
        "category": "artistic",
        "title": "Camille Saint-Saëns, Danse macabre, Op. 40 — MUSIC",
        "excerpt": "Saint-Saëns's 1874 symphonic poem gives orchestral form to the medieval danse macabre, in which Death fiddles the living into a graveyard dance. A solo violin tuned to a rasping tritone and a xylophone evoking rattling bones summon the dead to their revels before the crowing of the cock scatters them at dawn. The work distils the old terror of an unseen killer that claims high and low alike into a single, feverish nocturne.",
        "source": "Camille Saint-Saëns, Danse macabre, Op. 40 (score, IMSLP / Petrucci Music Library)",
        "href": "https://imslp.org/wiki/Danse_macabre,_Op.40_(Saint-Sa%C3%ABns,_Camille)"
      },
      {
        "category": "artistic",
        "title": "Pieter Bruegel the Elder, The Triumph of Death — VISUAL ARTWORK",
        "excerpt": "Painted around 1562, Bruegel's panel spreads a panoramic vision of pestilence and mortality across a scorched landscape, where armies of skeletons harvest the living without regard for rank, wealth or piety. Kings, lovers, soldiers and peasants are herded alike toward a great coffin-lidded trap, dramatising the universal, indiscriminate reach of a lethal contagion. The work is a defining image of the fear of an unseen killer and of a world overwhelmed by death.",
        "source": "Pieter Bruegel the Elder, The Triumph of Death (c. 1562), Museo del Prado, Madrid; via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_the_Elder_-_The_Triumph_of_Death_-_WGA3389.jpg",
        "image": {
          "src": "/covers/uganda-marburg-case--art.png",
          "alt": "Pieter Bruegel the Elder's painting The Triumph of Death, showing armies of skeletons overwhelming people of all social ranks across a barren landscape",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 35
  },
  {
    "slug": "carroll-trump-damages-appeal",
    "headline": "E. Jean Carroll seeks $5.8 million from Trump after his high court appeal fails",
    "overview": "The writer E. Jean Carroll called on President Trump to pay 5.8 million dollars in damages after the Supreme Court declined to hear his appeal in her defamation and sexual-abuse case. The ruling leaves the earlier civil judgment against Trump in place.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMimAFBVV95cUxNM2lmN1lVOEttaElYZU9NRWF5MFNjX1h2MG5IYk9xQWhkTFNaNWg2QzA0VW1vMEV3N3dqVUJObGp6VlUza2NBVXJrS2F4TVJCZjdPZUM4WTNfaGVYM2NtRkFwUjRvUVNjMzUyMzI2ZXpOLXdSWGtqdWl1OTUwb3d2ZFAxU0xPOC1Yc3hna29xRUpuSHA0cEtVTA?oc=5"
      },
      {
        "name": "NBC News",
        "href": "https://www.nbcnews.com/news/us-news/e-jean-carroll-calls-trump-pay-58m-high-court-appeal-fails-rcna352526"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-01",
    "image": {
      "src": "/covers/carroll-trump-damages-appeal.png",
      "alt": "The stone steps and columns of a US federal courthouse in flat daylight.",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 1 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Nathan Confronts King David (2 Samuel 12)",
        "excerpt": "And Nathan said to David, Thou art the man. Thus saith the LORD God of Israel, I anointed thee king over Israel, and I delivered thee out of the hand of Saul.",
        "source": "The Holy Bible, King James Version, 2 Samuel 12:7 (public domain), Wikisource.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/2_Samuel"
      },
      {
        "category": "historical",
        "title": "The Parable of the Widow and the Unjust Judge (Luke 18)",
        "excerpt": "Yet because this widow troubleth me, I will avenge her, lest by her continual coming she weary me.",
        "source": "The Holy Bible, King James Version, Luke 18:5 (public domain), Wikisource.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Luke"
      },
      {
        "category": "literary",
        "title": "Portia's \"Quality of Mercy\" Speech, The Merchant of Venice",
        "excerpt": "The quality of mercy is not strain'd, It droppeth as the gentle rain from heaven Upon the place beneath. It is twice blest, It blesseth him that gives and him that takes.",
        "source": "William Shakespeare, The Merchant of Venice, Act IV, Scene I (public domain), Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/1515/1515-h/1515-h.htm"
      },
      {
        "category": "literary",
        "title": "Jarndyce and Jarndyce, Bleak House",
        "excerpt": "This scarecrow of a suit has, in course of time, become so complicated that no man alive knows what it means. ... but Jarndyce and Jarndyce still drags its dreary length before the court, perennially hopeless.",
        "source": "Charles Dickens, Bleak House, Chapter I (public domain), Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/1023/1023-h/1023-h.htm"
      },
      {
        "category": "artistic",
        "title": "Verdi, \"Dies Irae\" from the Requiem — MUSIC",
        "excerpt": "Verdi's Requiem (1874) turns the medieval \"Dies Irae\" into a thunderous vision of the Day of Wrath, when every hidden deed is dragged into the light and no one, however mighty, escapes the final reckoning. Its hammering chorus and blazing brass make audible the terror of accountability that no rank or power can evade. The movement stands as one of music's most overwhelming portraits of justice descending upon the great and the small alike.",
        "source": "Giuseppe Verdi, Messa da Requiem, \"Dies irae\" (1874), full score (public domain), IMSLP / Petrucci Music Library.",
        "href": "https://imslp.org/wiki/Requiem_(Verdi,_Giuseppe)"
      },
      {
        "category": "artistic",
        "title": "Nicolas Poussin, The Judgment of Solomon — VISUAL ARTWORK",
        "excerpt": "Poussin's 1649 canvas freezes the instant when Solomon's ruling exposes the truth, the false claimant and the true mother divided by the king's terrible test. The rigid symmetry and stark gestures stage justice as an act of unflinching discernment, the powerful throne bending toward the wronged. It is a monument to the idea that authority is legitimate only when it renders the right verdict.",
        "source": "Nicolas Poussin, The Judgment of Solomon (1649), oil on canvas, Musée du Louvre (public domain), Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Le_Jugement_de_Salomon_-_1649_-_Nicolas_Poussin_-_Louvre_-_INV_7277_;_MR_2316.jpg",
        "image": {
          "src": "/covers/carroll-trump-damages-appeal--art.png",
          "alt": "Nicolas Poussin's 1649 painting The Judgment of Solomon, showing the enthroned king ruling between two women claiming a child.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 36
  },
  {
    "slug": "mexico-city-world-cup-deaths",
    "headline": "Three people die during Mexico City World Cup celebrations",
    "overview": "Three people died during celebrations in Mexico City after the national team's World Cup victory, as huge crowds filled the streets. Authorities reported the deaths amid the crush of fans marking the result.",
    "genre": "Culture",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cx2xjwj8p39o"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiswFBVV95cUxONHRuWjl1VEhoVC1qTllkS0RUSERFbEJCbG9ydkQ0NTF4WG5jSXEzU2J2WkdRb0JUZkNER2loa2FRbmpuNEtRSXo5eVd4dXdlamE0VzBrQmI2TGo3TG9Ud3JfRy0zQThKcmxrUUJ1a3VCMENmMTJKZW1CSHBISHgzSXUzVXJkTVgzMzBtd21taHhGQzJkZC1ZYXRJd2xvVllvcElpS2NEaVBUZTYwdXRVWlVpQQ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-01",
    "image": {
      "src": "/covers/mexico-city-world-cup-deaths.png",
      "alt": "A dense night-time crowd of football fans waving flags under city lights.",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 1 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Fidenae amphitheatre disaster in Tacitus' Annals",
        "excerpt": "Thither flocked all who loved such sights and who during the reign of Tiberius had been wholly debarred from such amusements; men and women of every age crowding to the place because it was near Rome. And thus the calamity was all the more fatal. The building was densely crowded; then came a violent shock, as it fell inwards or spread outwards, precipitating and burying an immense multitude which was intently gazing on the show or standing round.",
        "source": "Tacitus, The Annals, Book IV, ch. 62, trans. Alfred John Church and William Jackson Brodribb (1876), via Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Annals_(Tacitus)/Book_4"
      },
      {
        "category": "historical",
        "title": "The triumph of Aemilius Paulus in Plutarch's Lives",
        "excerpt": "The people erected scaffolds in the forum, in the circuses, as they call their buildings for horse-races, and in all other parts of the city where they could best behold the show. The spectators were clad in white garments; all the temples were open, and full of garlands and perfumes.",
        "source": "Plutarch, Life of Aemilius Paulus, ch. 32 (Dryden translation), via The Internet Classics Archive",
        "href": "https://classics.mit.edu/Plutarch/paulus.html"
      },
      {
        "category": "literary",
        "title": "\"Our dance is turned into mourning\" (Lamentations 5)",
        "excerpt": "The elders have ceased from the gate, the young men from their musick. The joy of our heart is ceased; our dance is turned into mourning.",
        "source": "Lamentations 5:14-15, King James Version, via Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Lamentations"
      },
      {
        "category": "literary",
        "title": "The revel struck down in Poe's \"The Masque of the Red Death\"",
        "excerpt": "And now was acknowledged the presence of the Red Death. He had come like a thief in the night. And one by one dropped the revellers in the blood-bedewed halls of their revel, and died each in the despairing posture of his fall. And Darkness and Decay and the Red Death held illimitable dominion over all.",
        "source": "Edgar Allan Poe, \"The Masque of the Red Death\" (1842), Project Gutenberg eBook #1064",
        "href": "https://www.gutenberg.org/files/1064/1064-h/1064-h.htm"
      },
      {
        "category": "artistic",
        "title": "Berlioz, \"Marche au supplice\" from Symphonie fantastique — MUSIC",
        "excerpt": "The fourth movement of Berlioz's Symphonie fantastique (1830), the \"Marche au supplice\" or March to the Scaffold, casts a festive, brass-heavy procession that swells with crowd-like energy only to end in a sudden fall of the blade. Its blend of pageantry and doom mirrors a celebration overtaken by death, the triumphant march collapsing into silence. The public-domain score and parts are freely available on IMSLP.",
        "source": "Hector Berlioz, Symphonie fantastique, H. 48 (1830), IV. Marche au supplice, IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Symphonie_fantastique,_H_48_(Berlioz,_Hector)"
      },
      {
        "category": "artistic",
        "title": "Pieter Bruegel the Elder, \"The Peasant Dance\" — VISUAL ARTWORK",
        "excerpt": "Bruegel's \"The Peasant Dance\" (c. 1567) throws the viewer into a whirl of villagers dancing, drinking, and embracing at a festival, the whole crowd surging toward the right of the panel. Beneath the boisterous revelry the painter hints at excess and disorder, the celebration teetering on the edge of chaos. The work is in the Kunsthistorisches Museum, Vienna, and is in the public domain.",
        "source": "Pieter Bruegel the Elder, The Peasant Dance, c. 1567, Kunsthistorisches Museum, Vienna; Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_the_Elder_-_The_Peasant_Dance_-_WGA3499.jpg",
        "image": {
          "src": "/covers/mexico-city-world-cup-deaths--art.png",
          "alt": "Pieter Bruegel the Elder's painting The Peasant Dance, showing villagers dancing and reveling at a festival",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 37
  },
  {
    "slug": "canada-eurovision-2027-debut",
    "headline": "Canada will make its Eurovision Song Contest debut in 2027",
    "overview": "Organizers announced that Canada will compete in the Eurovision Song Contest for the first time in 2027, extending the European music competition further beyond its traditional borders. The move follows Australia's long-running participation as a guest nation.",
    "genre": "Culture",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c8x2y2vwqn1o"
      },
      {
        "name": "ESCToday",
        "href": "https://esctoday.com/206004/canada-cbc-confirms-debut-and-participation-at-eurovision-2027/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-01",
    "image": {
      "src": "/covers/canada-eurovision-2027-debut.png",
      "alt": "A brightly lit concert stage with beams of coloured light and a lone microphone.",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 1 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Contest of Apollo and Marsyas (Ovid, Metamorphoses, Book VI)",
        "excerpt": "The Satyr Marsyas, when he played the flute in rivalry against Apollo's lyre, lost that audacious contest and, alas! His life was forfeit.",
        "source": "Ovid, Metamorphoses, Book VI (trans. Brookes More), Perseus Digital Library, Tufts University",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0028:book=6:card=382"
      },
      {
        "category": "historical",
        "title": "The Contest of Pan and Apollo, judged by Tmolus (Ovid, Metamorphoses, Book XI)",
        "excerpt": "his left hand held his lyre, adorned with gems and Indian ivory. His right hand held the plectrum—as an artist he stood there.",
        "source": "Ovid, Metamorphoses, Book XI (trans. Brookes More), Perseus Digital Library, Tufts University",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0028:book=11:card=146"
      },
      {
        "category": "literary",
        "title": "The Bard: A Pindaric Ode by Thomas Gray",
        "excerpt": "'Ruin seize thee, ruthless king! / 'Confusion on thy banners wait, / 'Though fanned by Conquest's crimson wing / 'They mock the air with idle state.",
        "source": "Thomas Gray, \"The Bard: A Pindaric Ode\" (1757), Eighteenth-Century Poetry Archive",
        "href": "https://www.eighteenthcenturypoetry.org/works/tgaen-wbapo.shtml"
      },
      {
        "category": "literary",
        "title": "Tannhäuser und der Sängerkrieg auf Wartburg by Richard Wagner (Wartburg Song Contest)",
        "excerpt": "Minstrels assembled here, I give you greeting. Full oft within these walls your lays have sounded; In veiled wisdom, or in mirthful measures They ever gladdened every list'ning heart.",
        "source": "Richard Wagner, Tannhäuser, Act II (English translation), Internet Archive",
        "href": "https://archive.org/stream/tannhaeuserconta00wagnuoft/tannhaeuserconta00wagnuoft_djvu.txt"
      },
      {
        "category": "artistic",
        "title": "Die Meistersinger von Nürnberg, WWV 96 (Overture) by Richard Wagner — MUSIC",
        "excerpt": "Wagner's comic opera dramatizes a public song contest among the master-singers of Nuremberg, in which an outsider must prove himself before the assembled guild and townsfolk. Its jubilant Overture (Vorspiel) gathers the work's principal themes into a grand processional celebration of song. Free scores and orchestral parts are hosted on IMSLP.",
        "source": "Richard Wagner, Die Meistersinger von Nürnberg, WWV 96, IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Die_Meistersinger_von_N%C3%BCrnberg,_WWV_96_(Wagner,_Richard)"
      },
      {
        "category": "artistic",
        "title": "Apollo and the Muses on Parnassus (after Anton Raphael Mengs) — VISUAL ARTWORK",
        "excerpt": "This engraving after Anton Raphael Mengs depicts Apollo enthroned on Mount Parnassus amid the nine Muses, the mythic gathering of many voices from which poetry and song flow. The image evokes the ideal of a shared festival of the arts, where different talents assemble in one harmonious company. The work is in the public domain.",
        "source": "After Anton Raphael Mengs (engraved by Raffaello Morghen), \"Apollo and the Muses on Parnassus,\" The Metropolitan Museum of Art, via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Apollo_and_the_Muses_on_Parnassus_MET_268819.jpg",
        "image": {
          "src": "/covers/canada-eurovision-2027-debut--art.png",
          "alt": "Engraving of Apollo enthroned on Mount Parnassus surrounded by the nine Muses, after Anton Raphael Mengs",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 38
  },
  {
    "slug": "swiss-traditionalists-defy-pope",
    "headline": "Traditionalist Catholics defy Pope Leo XIV with bishop consecrations in Switzerland",
    "overview": "A traditionalist Catholic group went ahead with the consecration of new bishops in Switzerland in defiance of Pope Leo XIV, deepening a rift with the Vatican. The ceremony proceeded despite warnings that the ordinations were unauthorized.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMimAFBVV95cUxQTmphVU5YWWRJWVo0emtCMTNuYkgtU0NrempyVXViNjJNNmRjWHA0OGJmenh2Xzctb0s4X2J1NFpJcnB0Y3ZwcjcwcWpXNFp1dnJyWTF3NkRzSFdPbjZsUFZMOU1Da1U2QUFPYlJTZnJIdGdlbjU5VlRCVHRCQWRQMldVZkQ4YkJpUTNYNjNveVpXMmJfQlFBQw?oc=5"
      },
      {
        "name": "The Pillar",
        "href": "https://www.pillarcatholic.com/p/sspx-illicitly-ordains-four-new-bishops"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-01",
    "image": {
      "src": "/covers/swiss-traditionalists-defy-pope.png",
      "alt": "The cand-lit stone interior of a gothic cathedral with soaring arches.",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 1 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Martin Luther before the Diet of Worms (1521)",
        "excerpt": "If, then, I am not convinced by proof from Holy Scripture, or by cogent reasons, if I am not satisfied by the very text I have cited, and if my judgment is not in this way brought into subjection to God's word, I neither can nor will retract anything; for it can not be right for a Christian to speak against his conscience. I stand here and can say no more. God help me. Amen.",
        "source": "Martin Luther, \"Before the Diet of Worms\" (1521), in The World's Famous Orations, Vol. VII, ed. William Jennings Bryan (New York: Funk & Wagnalls, 1906), via Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_World's_Famous_Orations/Volume_7/Before_the_Diet_of_Worms"
      },
      {
        "category": "historical",
        "title": "The East–West Schism of 1054",
        "excerpt": "When the leader of the legation, Cardinal Humbert of Silva Candida, learned that Cerularius had refused to accept the demand, he excommunicated him, and in response Cerularius excommunicated Humbert and the other legates.",
        "source": "\"East–West Schism,\" Wikipedia, The Free Encyclopedia (accessed 1 July 2026).",
        "href": "https://en.wikipedia.org/wiki/East%E2%80%93West_Schism"
      },
      {
        "category": "literary",
        "title": "Milton, Paradise Lost, Book I — Satan's defiance",
        "excerpt": "To reign is worth ambition, though in Hell:\nBetter to reign in Hell than serve in Heaven.",
        "source": "John Milton, Paradise Lost, Book I, lines 262–263 (1667), Project Gutenberg eBook No. 26.",
        "href": "https://www.gutenberg.org/cache/epub/26/pg26.txt"
      },
      {
        "category": "literary",
        "title": "Sophocles, Antigone — defying Creon's decree",
        "excerpt": "Yes, since it was not Zeus that published me that edict, and since not of that kind are the laws which Justice who dwells with the gods below established among men. Nor did I think that your decrees were of such force, that a mortal could override the unwritten and unfailing statutes given us by the gods.",
        "source": "Sophocles, Antigone, lines 450–455, trans. Sir Richard C. Jebb, via the Perseus Digital Library, Tufts University.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0186:card=441"
      },
      {
        "category": "artistic",
        "title": "Mendelssohn, Symphony No. 5 \"Reformation,\" Op. 107 — MUSIC",
        "excerpt": "Felix Mendelssohn composed his Fifth Symphony, the \"Reformation\" (1830), to mark the tercentenary of the Augsburg Confession, the founding statement of Lutheran faith. Its finale is built upon Luther's own defiant chorale \"Ein feste Burg ist unser Gott\" (\"A Mighty Fortress Is Our God\"), the anthem of the Reformation's break with Rome. The symphony thus sounds the same theme of principled rupture with an established religious authority that runs through the Écône consecrations.",
        "source": "Felix Mendelssohn, Symphony No. 5 in D minor/major, Op. 107 (\"Reformation\"), 1830; score via IMSLP / Petrucci Music Library.",
        "href": "https://imslp.org/wiki/Symphony_No.5,_Op.107_(Mendelssohn,_Felix)"
      },
      {
        "category": "artistic",
        "title": "Anton von Werner, \"Luther at the Diet of Worms\" (1877) — VISUAL ARTWORK",
        "excerpt": "Anton von Werner's 1877 oil painting depicts Martin Luther standing before Emperor Charles V and the assembled princes of the Holy Roman Empire in 1521, refusing to recant his writings. The lone reformer, upright amid a hostile hierarchy, became the enduring image of conscientious defiance against Rome's authority. It offers a striking visual parallel to a traditionalist body standing firm against the Pope's demand to turn back.",
        "source": "Anton von Werner, Luther auf dem Reichstag zu Worms (\"Luther at the Diet of Worms\"), 1877, oil on canvas, Staatsgalerie Stuttgart; public domain, via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Luther_at_the_Diet_of_Worms.jpg",
        "image": {
          "src": "/covers/swiss-traditionalists-defy-pope--art.png",
          "alt": "Anton von Werner's 1877 painting of Martin Luther standing before Emperor Charles V and the princes at the Diet of Worms, refusing to recant.",
          "credit": "Wikimedia Commons"
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
