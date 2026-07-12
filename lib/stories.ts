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
    "slug": "us-strikes-iran-hormuz-closed",
    "headline": "US launches military strikes on Iran after attack on tanker in Strait of Hormuz; Tehran declares strait closed",
    "overview": "The United States said on July 12, 2026, that it had struck targets in Iran in response to an attack on a Cyprus-flagged civilian vessel in the Strait of Hormuz, sharply escalating a confrontation in the Gulf. Iran's Revolutionary Guard navy declared the strait, the passage for roughly a fifth of the world's oil, closed until further notice, and Tehran said several Gulf Arab states had been hit. Oil markets braced for disruption as governments urged ships to avoid the waterway.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMiowFBVV95cUxQb29YUXh5MnNRTjVBazdXOUdMSkx5bkU0WHJFVFRGX1pyY0E5cWZfRXc5NnhQVjdOUVFzZTJFNkpBNlZpdUZIVGdoNk5ieU1sVUw1dDMwdkhSYWF4a0pKUk9nYVFMLW5HRFRjOUJTSTBuVEkxLTQ1X2NEZk5FWDMwV2lnRlBhYmhyY2FjQU82S2pnM2RQSEpfTjFwSXBlbk54OGdr?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiswFBVV95cUxPaWNfWDBGeUlZdnVYdk9zTTBTa05FcHZQZ2NTaE14ZU9SUFRKcDgyamdEaUFjVi1ycHRuaEdaV2cwU3FSWjZqb3BzNXBvMmdobFNvejdtRGo0QUk3emV4alhETFNOcWgyQUg0MnFDVF9mSHRuM3R0Zng3ZnNWUDlqajlyWndRaHk2dkdycXVNdFA0S21RYk5YRElCTVBQZjloVEF2bU5ZTEl6bDFabTdCWWVSdw?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-12",
    "image": {
      "src": "/covers/us-strikes-iran-hormuz-closed.png",
      "alt": "A line of massive oil tankers silhouetted at dusk in the narrow Strait of Hormuz, one vessel ablaze with orange flame and black smoke coiling over dark oil-slicked water between rugged coastlines, the last red light glinting on the sea.",
      "credit": "AI-generated"
    },
    "lead": true,
    "edition": "Morning Edition · 12 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The 1980s Iran-Iraq 'Tanker War' and America's naval reprisals in the Persian Gulf, litigated at The Hague as Oil Platforms (Iran v. United States), in which U.S. warships struck Iranian targets after attacks on Gulf shipping, directly foreshadowing today's strikes on Iran over a tanker in the Strait of Hormuz.",
        "excerpt": "During the Iran-Iraq War's 'Tanker War,' both belligerents attacked merchant shipping across the Gulf; after Iranian missiles and mines struck vessels including the reflagged tanker Sea Isle City and the frigate USS Samuel B. Roberts, U.S. warships destroyed Iranian offshore oil platforms in October 1987 and April 1988 (Operations Nimble Archer and Praying Mantis). Iran brought the reprisals before the International Court of Justice, which weighed whether the strikes were lawful self-defense. The same fault line, an attack on shipping answered by armed retaliation against Iran, runs through today's clash over Hormuz.",
        "source": "Oil Platforms (Islamic Republic of Iran v. United States of America), International Court of Justice; application filed 1992, Judgment of 6 November 2003; ICJ, The Hague. Concerns U.S. naval strikes on Iranian Gulf oil platforms during the Iran-Iraq 'Tanker War' (Operation Nimble Archer, Oct. 1987; Operation Praying Mantis, Apr. 1988).",
        "href": "https://www.icj-cij.org/case/90"
      },
      {
        "category": "historical",
        "title": "Herodotus' account of Themistocles urging the Greeks to fight the Persian fleet in the narrows off Salamis in 480 BC, when mastery of a single maritime choke-point decided an entire war, as the Strait of Hormuz threatens to do today.",
        "excerpt": "At the Isthmus thou wilt fight in an open sea, which is greatly to our disadvantage, since our ships are heavier and fewer in number than the enemy's... If, on the other hand, thou doest as I advise, these are the advantages which thou wilt so secure: in the first place, as we shall fight in a narrow sea with few ships against many, if the war follows the common course, we shall gain a great victory; for to fight in a narrow space is favourable to us - in an open sea, to them.",
        "source": "Herodotus, The Histories, Book VIII.60 (Themistocles before the Battle of Salamis, 480 BC), translated by George Rawlinson (1858-60); via Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_History_of_Herodotus_(Rawlinson)/Book_8"
      },
      {
        "category": "literary",
        "title": "Aeschylus' The Persians (472 BC), the earliest surviving tragedy, in which a Persian messenger describes a mighty fleet packed together and shattered in a narrow strait, mirroring the maritime carnage now feared in Hormuz.",
        "excerpt": "straightaway the ships dashed together their bronze prows. It was a ship of Hellas that began the charge and chopped off in its entirety the curved stern of a Phoenician boat. Each captain drove his ship straight against some other ship. At first the stream of the Persian army held its own. When, however, the mass of our ships had been crowded in the narrows, and none could render another aid, and each crashed its bronze prow against each of its own line, they splintered their whole bank of oars. Then the Hellenic galleys, not heedless of their chance, hemmed them in and battered them on every side. The hulls of our vessels rolled over, and the sea was hidden from our sight, strewn as it was with wrecks and slaughtered men. The shores and reefs were crowded with our dead, and every ship that formed a part of the barbarian fleet plied its oars in disorderly flight. But, as if our men were tuna or some haul of fish, the foe kept striking and hacking them with broken oars and fragments of wrecked ships. Groans and shrieks together filled the open sea until the face of black night hid the scene.",
        "source": "Aeschylus, The Persians (472 BC), Messenger's speech (ll. 409-428), translated by Herbert Weir Smyth (Loeb Classical Library, 1926); Perseus Digital Library, Tufts University.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0012:card=417"
      },
      {
        "category": "literary",
        "title": "Thucydides' description of the doomed Athenian fleet crushed in the Great Harbour of Syracuse in 413 BC, where too many warships fought in too little water, an ancient warning of what a blocked passage does to a navy that echoes in Hormuz.",
        "excerpt": "And as many ships were engaged in a small compass (for these were the largest fleets fighting in the narrowest space ever known, being together little short of two hundred), the regular attacks with the beak were few, there being no opportunity of backing water or of breaking the line; while the collisions caused by one ship chancing to run foul of another, either in flying from or attacking a third, were more frequent... In many quarters also it happened, by reason of the narrow room, that a vessel was charging an enemy on one side and being charged herself on another, and that two, or sometimes more ships had perforce got entangled round one, obliging the helmsmen to attend to defence here, offence there, not to one thing at once, but to many on all sides; while the huge din caused by the number of ships crashing together not only spread terror, but made the orders of the boatswains inaudible.",
        "source": "Thucydides, History of the Peloponnesian War, Book VII.70 (the final sea-battle in the Great Harbour of Syracuse, 413 BC), translated by Richard Crawley (1874); Perseus Digital Library, Tufts University.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0200:book=7:chapter=70"
      },
      {
        "category": "artistic",
        "title": "Philip James de Loutherbourg's The Battle of the Nile (1800), depicting the French flagship L'Orient erupting in a blaze on the water, an image of a burning warship at sea that prefigures the tankers ablaze now dreaded in the Strait of Hormuz.",
        "excerpt": "Loutherbourg freezes the climactic instant of the Battle of the Nile (1 August 1798): the 118-gun French flagship L'Orient detonating in a colossal fireball as its magazine ignites, spars and men hurled into the night while smaller ships heel away from the blast. Firelit smoke turns the sea into a furnace and the darkness is torn open by the explosion. It is a naval catastrophe rendered as sublime terror, the very picture of a great vessel destroyed by fire on the water.",
        "source": "Philip James de Loutherbourg, The Battle of the Nile, 1800, oil on canvas; Tate Britain, London; public domain, via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Phillip_James_De_Loutherbourg_-_The_Battle_of_the_Nile_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/us-strikes-iran-hormuz-closed--a4.png",
          "alt": "Night sea-battle: the French flagship L'Orient erupting in a towering fireball, masts and debris flung skyward, warships silhouetted on burning water.",
          "credit": "Philip James de Loutherbourg, The Battle of the Nile, 1800; Tate Britain; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Rimsky-Korsakov's symphonic suite Scheherazade (1888), whose surging seas and shipwreck told under a vengeful sultan's shadow conjure the wrath and peril at sea now gripping the Strait of Hormuz.",
        "excerpt": "Rimsky-Korsakov's four-movement suite opens with 'The Sea and Sinbad's Ship,' a heaving, brass-swelled evocation of open water framed by the stern unison theme of the sultan Shahriar, and closes with a storm in which Sinbad's vessel is dashed to pieces against a rock. Its alternation of a ruler's menace and the sea's fury, vast, beautiful, and destructive, offers a musical analogue to a strait where commerce and violence now collide.",
        "source": "Nikolai Rimsky-Korsakov, Scheherazade, Op. 35 (1888), symphonic suite; full score, Petrucci Music Library (IMSLP).",
        "href": "https://imslp.org/wiki/Scheherazade,_Op.35_(Rimsky-Korsakov,_Nikolay)"
      }
    ],
    "rank": 1
  },
  {
    "slug": "england-norway-world-cup-semifinal",
    "headline": "Bellingham scores twice as England beat Norway 2-1 to reach the World Cup semifinals",
    "overview": "Jude Bellingham struck twice to send England past Erling Haaland's Norway 2-1 at the 2026 World Cup on July 12, 2026, booking a place in the semifinals. Norway's coach disputed the decisive goal, insisting the ball had struck an overhead camera cable before it crossed the line. The win ended Norway's run and set up a last-four meeting for England.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMilAFBVV95cUxNMjdYd29Xa3NsdWxUR2g0LUJLR1FlSTQzdlZOLUpZUHFrZXUxN1VCU2d6c0djSGpqZEJiZWFoLXJuTlVhdVJ0NmExV1B1aXFvbFYzR0Z4dk1TY21IYk4xX3RNQ1pxdHpDTU9LWlhKcVc5TVF1Q2N6REkwSWtKWk5mTDdNNEhvdU91U2I1YThNNlVsSERZ?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMivgFBVV95cUxNd0NPZllubllJbWo5aFZzaUZWSlg1aUJmVjhPMzhVOXppeVhRVlBhenRnQXNsVFl4UWlTa0tUcmFxek1nYjNpTWVDNmZkNk56cW85aFFCVmxyRFZwaktQdks0OHhDdUI1QkFWOVFpQUpxMWN2QmU2VDYxWWo1OWQ2clFPOVI2S3RycnY3V0tFdm9ra3dEcm0wT1VCMi1QVF8yRW4xakFVN2hYVjZ4ZFcwblpfbmJRQVhSTEZlLWdn?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-12",
    "image": {
      "src": "/covers/england-norway-world-cup-semifinal.png",
      "alt": "The illuminated arch of Wembley Stadium glowing against the night sky.",
      "credit": "Photo by Rob (Flickr user 'BBM Explorer'), 'Wembley Stadium, illuminated', 4 August 2010; CC BY 2.0, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 12 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Pindar's Olympian Ode 1 (476 BC), composed to crown Hieron of Syracuse as victor in the greatest of all games, mirrors England's win over Norway as the age-old rite of exalting a single champion whose triumph is sung above every rival.",
        "excerpt": "Best is Water of all, and Gold as a flaming fire in the night shineth eminent amid lordly wealth; but if of prizes in the games thou art fain, O my soul, to tell, then, as for no bright star more quickening than the sun must thou search in the void firmament by day, so neither shall we find any games greater than the Olympic whereof to utter our voice",
        "source": "Pindar, Olympian Ode 1 (for Hieron of Syracuse, 476 BC), trans. Ernest Myers, 'The Extant Odes of Pindar' (London: Macmillan, 1874), via Wikisource.",
        "href": "https://en.wikisource.org/wiki/Odes_of_Pindar_(Myers)/Olympian_Odes/1"
      },
      {
        "category": "historical",
        "title": "Livy's account of the combat of the Horatii and Curiatii (History of Rome, Book I.25, set c. 672 BC), in which a single surviving Roman champion cuts down three Alban brothers to decide a war between two peoples, mirrors how one man, Bellingham, single-handedly settled England's contest with Norway.",
        "excerpt": "The Roman cried exultingly: 'Two have I sacrificed to appease my brothers' shades; the third I will offer for the issue of this fight, that the Roman may rule the Alban.' He thrust his sword downward into the neck of his opponent, who could no longer lift his shield, and then despoiled him as he lay.",
        "source": "Livy (Titus Livius), 'The History of Rome' (Ab Urbe Condita), Book 1, ch. 25, trans. Rev. Canon Roberts (London: J. M. Dent, 1905), via Wikisource.",
        "href": "https://en.wikisource.org/wiki/From_the_Founding_of_the_City/Book_1"
      },
      {
        "category": "literary",
        "title": "The chariot race in the funeral games of Patroclus (Homer's Iliad, Book XXIII), where Menelaus lodges a sworn protest against Antilochus's contested victory, mirrors Norway's coach disputing the decisive goal that beat him.",
        "excerpt": "Menelaus then upbraided Antilochus and said, 'There is no greater trickster living than you are; go, and bad luck go with you; the Achaeans say not well that you have understanding, and come what may you shall not bear away the prize without sworn protest on my part.'",
        "source": "Homer, 'The Iliad', Book XXIII (the funeral games of Patroclus), trans. Samuel Butler (1898), via Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_Iliad_(Butler)/Book_XXIII"
      },
      {
        "category": "literary",
        "title": "The single combat of David and Goliath (1 Samuel 17), in which a lone challenger topples a towering champion with a single stroke, mirrors England felling Erling Haaland's giant-led Norway through one decisive hero.",
        "excerpt": "And David put his hand in his bag, and took thence a stone, and slang it, and smote the Philistine in his forehead, that the stone sunk into his forehead; and he fell upon his face to the earth. So David prevailed over the Philistine with a sling and with a stone, and smote the Philistine, and slew him; but there was no sword in the hand of David. ... And when the Philistines saw their champion was dead, they fled.",
        "source": "1 Samuel 17:48–51, King James Version (Authorized Version, 1611), via Wikisource.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/1_Samuel"
      },
      {
        "category": "artistic",
        "title": "The Euphiletos Painter's Panathenaic prize amphora (c. 530 BC, Metropolitan Museum of Art), whose black-figure frieze shows athletes straining shoulder to shoulder in a sprint for the crown, mirrors the athletic triumph of England's charge to the World Cup semifinals.",
        "excerpt": "On this prize vase, awarded to the victor of the Athenian games, a line of nude runners surges forward with clenched fists and driving legs, the very image of a contest decided in a burst of speed. Its reverse bore the armed figure of Athena; its face immortalized the sprint that, like Bellingham's decisive strikes, turned effort into glory.",
        "source": "Attributed to the Euphiletos Painter, Terracotta Panathenaic prize amphora, Greek (Attic), Archaic period, c. 530 BC; The Metropolitan Museum of Art, New York, Rogers Fund, 1914 (14.130.12).",
        "href": "https://www.metmuseum.org/art/collection/search/248902",
        "image": {
          "src": "/covers/england-norway-world-cup-semifinal--a4.png",
          "alt": "Black-figure Greek amphora showing a line of nude male runners racing in a footrace, arms and legs extended mid-stride.",
          "credit": "Attributed to the Euphiletos Painter, Terracotta Panathenaic prize amphora (footrace), c. 530 BC; The Metropolitan Museum of Art (14.130.12); public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Handel's chorus 'See, the Conqu'ring Hero Comes' from the oratorio Judas Maccabaeus (HWV 63, 1747), a swelling triumphal welcome for a returning champion, mirrors the acclaim greeting England as it marched into the World Cup semifinals.",
        "excerpt": "Handel's chorus rises with trumpets and drums to hail a victor home from the field, its refrain 'See, the conqu'ring hero comes! Sound the trumpets, beat the drums!' long detached from the oratorio to greet champions of every kind. It is the sound of a triumph announced, the arena roar made music for England's hero of the day.",
        "source": "George Frideric Handel, 'See, the Conqu'ring Hero Comes' (Chorus, Act III, No. 35), from 'Judas Maccabaeus', HWV 63 (1747), libretto by Thomas Morell; scores via IMSLP (Petrucci Music Library).",
        "href": "https://imslp.org/wiki/Judas_Maccabaeus,_HWV_63_(Handel,_George_Frideric)"
      }
    ],
    "rank": 2
  },
  {
    "slug": "toronto-street-festival-shooting",
    "headline": "Shooting at a Toronto street festival kills 2 and wounds 5 as police search for a gunman",
    "overview": "A shooting near a crowded street festival in Toronto killed two people and wounded five others late on July 11, 2026, police said, prompting a search for an active shooter. Officers flooded the downtown area and urged people to avoid the scene as they hunted for the assailant. The motive was not immediately known.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMilwFBVV95cUxOc1o2Rll3VDlMMDFoNE8yUV84cGZWNXRMTXcwcVExb1lSNTJVTC1fZVZCLTBEUG9FU3NYZmVuRk5NajN5TGJZTnBIRjRyXzhLSF96Nk5wTkg0THg4SlhLcTZLSE0yZFhoSWxJSVZEVm9acGhxNHJKYnJmdEpLcWd4YnlXbGFQd0Z6MG9Ic2JhTGNpeThpbnNj?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://news.google.com/rss/articles/CBMiWkFVX3lxTE5TaGp6dURmZU91R3BQTTV0Z0lkRVkyUUFVaWdDQTZ3Rm9xUUN2S3RvZWtxaDJMdy1sTzBpbVhQQXpJV2xtdS1JMEVReEw0d3dCUWFMcDZhdWpoUQ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-12",
    "image": {
      "src": "/covers/toronto-street-festival-shooting.png",
      "alt": "A night city street scene with strung festival lights glowing above empty pavement and a police cordon line, no people, no text.",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 12 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "As Torontonians gathered for a summer festival only to be scattered by gunfire, the citizens of Thessalonica were lured into their circus for the games in 390 AD and cut down in their thousands, a public amusement turned in moments into a killing ground.",
        "excerpt": "Multitudes were mowed down like ears of grain in harvest-tide. It is said that seven thousand perished. No trial preceded the sentence. No condemnation was passed on the perpetrators of the crimes.",
        "source": "Theodoret of Cyrus, Ecclesiastical History, Book V, Chapter 17 (Nicene and Post-Nicene Fathers, 2nd series, vol. 3), on the massacre of Thessalonica.",
        "href": "https://www.newadvent.org/fathers/27025.htm"
      },
      {
        "category": "historical",
        "title": "Where Toronto's crowd assembled in celebration before the shots rang out, Paris in August 1572 was thronged for the royal wedding of Henry of Navarre when a single bell became the signal that plunged the festive city into the St. Bartholomew's Day Massacre.",
        "excerpt": "The signal to commence the massacre should be given by the bell of the palace, and the marks by which they should recognize each other in the darkness were a bit of white linen tied around the left arm and a white cross on the hat... as soon as they had caused the bell of the palace clock to ring, on every side arose the cry, 'To arms !' and the people ran to the house of Coligny.",
        "source": "Jacques-Auguste de Thou, account of the St. Bartholomew's Day Massacre, in J. H. Robinson, ed., Readings in European History (Boston: Ginn, 1906), Internet History Sourcebooks Project, Fordham University.",
        "href": "https://sourcebooks.fordham.edu/mod/1572stbarts.asp"
      },
      {
        "category": "literary",
        "title": "Just as a night of revelry in downtown Toronto broke apart into panic and blood, the suitors' feast in Odysseus's own hall is shattered the instant an arrow finds Antinous at the very moment he lifts his cup, festivity collapsing into slaughter without warning.",
        "excerpt": "But Odysseus of many wiles stripped off his rags and sprang to the great threshold with the bow and the quiver full of arrows... He spoke, and aimed a bitter arrow at Antinous. Now he was on the point of raising to his lips a fair goblet, a two-eared cup of gold, and was even now handling it, that he might drink of the wine, and death was not in his thoughts... Odysseus took aim, and smote him with an arrow in the throat, and clean out through the tender neck passed the point; he sank to one side, and the cup fell from his hand as he was smitten, and straightway up through his nostrils there came a thick jet of the blood of man.",
        "source": "Homer, The Odyssey, Book 22 (trans. A. T. Murray), Perseus Digital Library, Tufts University.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0136:book=22:card=1"
      },
      {
        "category": "literary",
        "title": "Like a crowd sealed inside the bright ring of a festival lulled into safety until death walked in among them, Prince Prospero's masked revellers dance on behind their locked gates until the Red Death appears and drops them one by one on the floors of their own celebration.",
        "excerpt": "And now was acknowledged the presence of the Red Death. He had come like a thief in the night. And one by one dropped the revellers in the blood-bedewed halls of their revel, and died each in the despairing posture of his fall. And the life of the ebony clock went out with that of the last of the gay. And the flames of the tripods expired. And Darkness and Decay and the Red Death held illimitable dominion over all.",
        "source": "Edgar Allan Poe, \"The Masque of the Red Death,\" in The Works of the Late Edgar Allan Poe (1850), Vol. 1, via Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_Works_of_the_Late_Edgar_Allan_Poe_(1850)/Volume_1/The_Masque_of_the_Red_Death"
      },
      {
        "category": "artistic",
        "title": "Goya's lantern-lit executioners bearing down on unarmed civilians renders the same civic horror Toronto woke to: ordinary people, gathered in the open, suddenly at the mercy of anonymous, faceless violence in the dark.",
        "excerpt": "Goya lights a single squat lantern on the ground so that a white-shirted man, arms flung wide, blazes out of the night before a faceless rank of soldiers; around him the already-dead lie in their blood and the next victims hide their eyes. Painted to commemorate Spanish civilians shot after the 1808 uprising, it endures as art's starkest image of ordinary people cut down by anonymous, mechanical violence — the same horror a festival crowd met when the shots began.",
        "source": "Francisco de Goya, The Third of May 1808 (El Tres de Mayo), 1814, oil on canvas, Museo del Prado, Madrid. Public domain, via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:El_Tres_de_Mayo,_by_Francisco_de_Goya,_from_Prado_thin_black_margin.jpg",
        "image": {
          "src": "/covers/toronto-street-festival-shooting--a4.png",
          "alt": "Goya's painting The Third of May 1808: a lantern lights a white-shirted man throwing up his arms before a firing squad, with the dead and the doomed crowded around him in the night.",
          "credit": "Francisco de Goya, The Third of May 1808 (1814), Museo del Prado; public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "For a city now counting its dead after a night meant for music and crowds, Mozart's Lacrimosa is the fitting counterpart: a hushed, weeping lament that turns communal grief and the mourning of the innocent into sound.",
        "excerpt": "Mozart's unfinished final work, the Lacrimosa sets the words \"that day of weeping\" to a rising, sighing figure in the strings, a slow procession of grief that breaks off where the dying composer laid down his pen. It has become the West's shared music of mourning, sung wherever the innocent are lost to sudden death. Its restraint and tenderness answer horror not with spectacle but with lament.",
        "source": "Wolfgang Amadeus Mozart, Requiem in D minor, K.626 (1791), \"Lacrimosa\" movement, completed by F. X. Süssmayr; scores via IMSLP / Petrucci Music Library.",
        "href": "https://imslp.org/wiki/Requiem_in_D_minor,_K.626_(Mozart,_Wolfgang_Amadeus)"
      }
    ],
    "rank": 3
  },
  {
    "slug": "india-judge-death-threats-cow-vigilantes",
    "headline": "Indian judge who convicted 'cow vigilantes' of a lynching faces death threats and is given protection",
    "overview": "A Muslim judge in India's Madhya Pradesh state has faced death threats after convicting members of a 'cow vigilante' group over a fatal lynching, prompting a high court to demand secure housing for the judiciary. The case is among the few in which vigilantes accused of attacking people over cattle have been found guilty. Rights groups say such attacks, which often target Muslims, have rarely led to convictions.",
    "genre": "Politics",
    "sources": [
      {
        "name": "BBC",
        "href": "https://news.google.com/rss/articles/CBMiXEFVX3lxTFBIN1lvYjRmM21NQURuOERIMlVCREE2Zkh1azduUnNFVnBKTG1sc1VUZGtsWGNrQ2ZWUlgyNDd6QWs2a016SkVxcmRyaUpRQUNicmlqX25sb2hqbkFw?oc=5"
      },
      {
        "name": "LawBeat",
        "href": "https://news.google.com/rss/articles/CBMi4AFBVV95cUxPX2hBSF9takVxUGhlOXhBTmZBd1Z2T3Q0T3JfeVg0eVgwc2NyU0ZnaVZ3SWxrdW8yVHFicHJ4STI5bm45YVA4Yk5IdDVfWkYwdlNPdGRjbTh3UFhoa1lnMDlxWlZXZ3ZiSWc0T2NhbDN6bWdGaG5nMVdpV3VGc3ZqMTlQc291M3JSaUtDY3JCMDE5Rzl4MndidHdZRTRqbjd1NlRHb2xEUEJfRDZMZVpUS3Q2elMyLVBVOG1LSnhoV21HUGtRZkVOTndNSVROd1h5OEdmVXZHNjB3bzJ2T3Nwdw?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-12",
    "image": {
      "src": "/covers/india-judge-death-threats-cow-vigilantes.png",
      "alt": "The colonial-era ornamented stone facade of the Madhya Pradesh High Court building in Jabalpur, India.",
      "credit": "Gyanendra Singh Chauhan, via Panoramio / Wikimedia Commons, CC BY 3.0."
    },
    "edition": "Morning Edition · 12 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Two thousand years before a Madhya Pradesh judge needed armed protection for convicting a lynch mob, Cicero rose in a Roman court to prosecute the governor Verres for torturing and crucifying a citizen, insisting the mighty must still answer to law.",
        "excerpt": "It is a crime to put a citizen of Rome in bonds; it is an atrocity to scourge him; to put him to death is well-nigh parricide; what shall I say it is to crucify him?—Language has no word by which I may designate such an enormity.",
        "source": "Marcus Tullius Cicero, The Second Oration against Verres, Book V (70 BC), as rendered in W. Lucas Collins, Cicero (Ancient Classics for English Readers), Edinburgh & London: William Blackwood and Sons, 1871.",
        "href": "https://en.wikisource.org/wiki/Cicero_(Collins_1871)/Chapter_2"
      },
      {
        "category": "historical",
        "title": "Where the Indian bench dared to punish a 'cow vigilante' lynching that the powerful preferred to ignore, Ida B. Wells a century earlier catalogued America's lynch mobs and demanded that the law, not the crowd, decide who lives.",
        "excerpt": "The lesson this teaches and which every Afro-American should ponder well, is that a Winchester rifle should have a place of honor in every black home, and it should be used for that protection which the law refuses to give.",
        "source": "Ida B. Wells, Southern Horrors: Lynch Law in All Its Phases, New York: The New York Age Print, 1892 (Project Gutenberg ebook No. 14975).",
        "href": "https://www.gutenberg.org/files/14975/14975-h/14975-h.htm"
      },
      {
        "category": "literary",
        "title": "Like the Madhya Pradesh judge whose unpopular verdict required the courage to protect the vulnerable, King Solomon's famous judgment shows a magistrate whose authority rests on discerning truth against the loud claims of the crowd.",
        "excerpt": "Then spake the woman whose the living child was unto the king, for her bowels yearned upon her son, and she said, O my lord, give her the living child, and in no wise slay it. But the other said, Let it be neither mine nor thine, but divide it. Then the king answered and said, Give her the living child, and in no wise slay it: she is the mother thereof. And all Israel heard of the judgment which the king had judged; and they feared the king: for they saw that the wisdom of God was in him, to do judgment.",
        "source": "The Holy Bible, King James Version, 1 Kings 3:26–28.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/1_Kings"
      },
      {
        "category": "literary",
        "title": "As the threatened Indian judge stood between a mob and the demands of justice, the young Daniel halted an assembly rushing an innocent woman to her death, exposing the false witnesses and reminding the crowd that a verdict must rest on truth, not clamour.",
        "excerpt": "Therefore when she was led to be put to death, the Lord raised up the holy spirit of a young youth, whose name was Daniel: Who cried with a loud voice, I am clear from the blood of this woman.",
        "source": "The Holy Bible, King James Version (Apocrypha), The History of Susanna, verses 45–46.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Susanna"
      },
      {
        "category": "artistic",
        "title": "Poussin's serene Solomon, sword poised above the disputed child as two women plead, is the very image of the judicial calm the Madhya Pradesh judge summoned in delivering a rare conviction against a vengeful mob.",
        "excerpt": "A frozen instant of judgment: the enthroned Solomon raises one hand to command, the other to refuse, as a soldier grips the living infant and the true mother lunges forward to save it while the false claimant coldly assents to the division—Poussin staging the moment when a judge's discernment turns a bloodthirsty demand into justice.",
        "source": "Nicolas Poussin, The Judgement of Solomon, 1649, oil on canvas, 101 × 150 cm, Musée du Louvre, Paris (INV 7277; MR 2316).",
        "href": "https://commons.wikimedia.org/wiki/File:Le_Jugement_de_Salomon_-_1649_-_Nicolas_Poussin_-_Louvre_-_INV_7277_;_MR_2316.jpg",
        "image": {
          "src": "/covers/india-judge-death-threats-cow-vigilantes--a4.png",
          "alt": "Poussin's painting The Judgement of Solomon: the enthroned king raises his hands as a soldier holds the disputed infant aloft and two women plead before the throne amid a crowd.",
          "credit": "Nicolas Poussin, The Judgement of Solomon (1649), Musée du Louvre. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "The thunderous 'Dies irae' of Verdi's Requiem—the day of wrath and final reckoning—echoes the moral weight borne by an Indian judge who convicted a lynch mob and then faced threats upon his own life.",
        "excerpt": "In the Sequence of his Requiem, Verdi unleashes the 'Dies irae'—the day of wrath—with hammering drums, plunging brass and a terrified chorus, a musical vision of the last judgment in which no crime escapes reckoning and every soul, powerful or poor, must stand answerable before an incorruptible tribunal.",
        "source": "Giuseppe Verdi, Messa da Requiem (1874), Sequence: Dies irae, for four soloists, chorus and orchestra.",
        "href": "https://imslp.org/wiki/Requiem_(Verdi,_Giuseppe)"
      }
    ],
    "rank": 4
  },
  {
    "slug": "trex-most-expensive-fossil-auction",
    "headline": "Rare T. rex skeleton from South Dakota could fetch more than $30 million at auction, alarming scientists",
    "overview": "A rare Tyrannosaurus rex skeleton unearthed in South Dakota is heading to auction with an estimate of more than $30 million, which could make it one of the most expensive fossils ever sold. Paleontologists warn that soaring prices are pushing important specimens out of public museums and into private hands, where they become unavailable for research. The sale has reignited debate over the commercialization of fossils.",
    "genre": "Science",
    "sources": [
      {
        "name": "BBC",
        "href": "https://news.google.com/rss/articles/CBMiXEFVX3lxTE1pdVA3RVg4V1FRTjQtTmg5cmFmRktVUURtMHNHenMtcU0tSXhNUENkMHNjR081ZEdobXp2T2M4dnV0ck9fUTMzTTZBRGIxTGxVSHlfa3hBLW9rSlBS?oc=5"
      },
      {
        "name": "KOTA Territory News",
        "href": "https://news.google.com/rss/articles/CBMiqgFBVV95cUxNc3p2dG5lTkVuakNyUmprX0ljcXpnR3JudzV1SG5YaEx4am9IY21EWDEwdjlFcE9OOGF1ZWFfU2sxWVYwdW11bnNIOU1sUUloR0VFYWxOT3JFaVdMajJNdThCUlY1U1pGNlJZYU5BUEFBNEFTblczUXdIcEFyNG5vTWF2OEJrbHdNc216SjRRTVRiWWR0MGt4T0xMNGpaSjZ5a2F2VXRjYl8wUQ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-12",
    "image": {
      "src": "/covers/trex-most-expensive-fossil-auction.png",
      "alt": "The mounted Tyrannosaurus rex skeleton 'Sue' (FMNH PR 2081) rearing over the hall of the Field Museum of Natural History, Chicago.",
      "credit": "Photo by Evolutionnumber9, 2019. CC BY-SA 4.0 via Wikimedia Commons."
    },
    "edition": "Morning Edition · 12 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The 1997 Sotheby's sale of 'Sue' for $8.36 million was the first time a T. rex became a trophy for the highest bidder, and it set the very market now threatening to price fossils past public reach.",
        "excerpt": "On 4 October 1997 the Field Museum, bankrolled by McDonald's and Disney, paid a then-unheard-of $8.36 million for the T. rex 'Sue' after a nine-minute bidding war at Sotheby's. Only a public consortium's deep pockets kept the most complete tyrannosaur ever found from vanishing into a private vault. That single sale minted the speculative fossil market whose ever-higher prices scientists now warn are pushing specimens beyond the reach of museums.",
        "source": "\"SUE the T. rex,\" Field Museum of Natural History, Chicago (record of the 4 October 1997 Sotheby's auction, in which the museum, backed by McDonald's and Walt Disney World, bought the specimen FMNH PR 2081 for $8,362,500).",
        "href": "https://www.fieldmuseum.org/blog/sue-t-rex"
      },
      {
        "category": "historical",
        "title": "Two centuries before a $30 million T. rex, the poor girl Mary Anning was already selling England's greatest fossils to passing gentry, the original tension between scientific treasure and the marketplace.",
        "excerpt": "Lyme and its neighbour, Charmouth, were then on the old coach-road, and the passengers mostly liked to take away a specimen or two, which they got either from Anning or from a Charmouth 'fossiler.'",
        "source": "\"Mary Anning, the Fossil Finder,\" All the Year Round (conducted by Charles Dickens), 11 February 1865.",
        "href": "https://victorianweb.org/periodicals/ayr/anning.html"
      },
      {
        "category": "literary",
        "title": "Milton reached for Leviathan and the earth-born Titans to name a creature too vast for the mind, the same awe that a towering tyrannosaur provokes as it goes under the hammer.",
        "excerpt": "As whom the fables name of monstrous size, / Titanian, or Earth-born, that warr'd on Jove, / Briareos or Typhon, whom the Den / By ancient Tarsus held, or that Sea-beast / Leviathan, which God of all his works / Created hugest that swim th' Ocean stream: / Him haply slumbring on the Norway foam / The Pilot of some small night-founder'd Skiff, / Deeming some Island, oft, as Sea-men tell, / With fixed Anchor in his skaly rind / Moors by his side under the Lee, while Night / Invests the Sea, and wished Morn delayes:",
        "source": "John Milton, Paradise Lost, Book I (1667), lines 196-208.",
        "href": "https://www.gutenberg.org/cache/epub/26/pg26.txt"
      },
      {
        "category": "literary",
        "title": "Shelley's shattered colossus in the sand is the fate of every buried giant, a monument to vanished power that survives only as a wreck to be gazed upon, or bid upon.",
        "excerpt": "I met a traveller from an antique land / Who said: Two vast and trunkless legs of stone / Stand in the desart. Near them, on the sand, / Half sunk, a shattered visage lies, whose frown, / And wrinkled lip, and sneer of cold command, / Tell that its sculptor well those passions read / Which yet survive, stamped on these lifeless things, / The hand that mocked them and the heart that fed: / And on the pedestal these words appear: / \"My name is Ozymandias, king of kings: / Look on my works, ye Mighty, and despair!\" / Nothing beside remains. Round the decay / Of that colossal wreck, boundless and bare / The lone and level sands stretch far away.",
        "source": "Percy Bysshe Shelley, \"Ozymandias\" (1818), as printed in The Hundred Best Poems (Lyrical) in the English Language, second series.",
        "href": "https://en.wikisource.org/wiki/The_Hundred_Best_Poems_(lyrical)_in_the_English_language_-_second_series/Ozymandias"
      },
      {
        "category": "artistic",
        "title": "Henry De la Beche's 1830 'Duria Antiquior' — painted from Mary Anning's fossils to raise money for her — is the ancestor of every dramatic vision of ancient monsters that makes a T. rex worth $30 million.",
        "excerpt": "De la Beche drew Duria Antiquior directly from the ichthyosaurs and plesiosaurs Mary Anning dug from the Lyme Regis cliffs, then sold prints to support her — the first widely circulated scene of deep-time monsters brought back to violent life. It fused scientific specimen and popular spectacle in a single image, teaching the public to marvel at extinct beasts. That marriage of wonder and commerce is exactly what now inflates a tyrannosaur's auction price.",
        "source": "Henry De la Beche, Duria Antiquior, a more Ancient Dorset (watercolour, 1830), reproduced as a lithograph; National Museum Cardiff. Public domain.",
        "href": "https://commons.wikimedia.org/wiki/File:Duria_Antiquior.jpg",
        "image": {
          "src": "/covers/trex-most-expensive-fossil-auction--a4.png",
          "alt": "A crowded prehistoric Dorset sea: ichthyosaurs and plesiosaurs battling amid fish and ammonites, with pterosaurs overhead, reconstructed from fossils found by Mary Anning.",
          "credit": "Henry De la Beche, Duria Antiquior (1830), National Museum Cardiff. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Saint-Saens turned petrified bones into a mocking little dance in 'Fossiles,' catching the same uneasy delight and reduction of ancient life to entertainment now on show in the salesroom.",
        "excerpt": "In 'Fossiles,' the twelfth movement of his 1886 Carnival of the Animals, Saint-Saens sets a xylophone rattling like dry bones, quoting his own 'Danse macabre' and old folk tunes so that the deep past becomes a wry, clattering parlour game. The primeval is rendered charming, collectible, faintly absurd. It is the same domestication of the monstrous that lets a 66-million-year-old predator be wheeled onto an auction block.",
        "source": "Camille Saint-Saens, \"Fossiles\" (No. 12) from Le carnaval des animaux (composed February 1886). Public domain.",
        "href": "https://imslp.org/wiki/Le_carnaval_des_animaux_(Saint-Sa%C3%ABns,_Camille)"
      }
    ],
    "rank": 5
  },
  {
    "slug": "us-housing-affordability-bill-law",
    "headline": "Bipartisan US housing bill becomes law after Trump declines to sign it in protest",
    "overview": "A bipartisan housing bill became law on July 11, 2026, without President Donald Trump's signature, after he allowed it to take effect while protesting a stalled Republican voter-ID measure. Senators from both parties celebrated the legislation, which aims to expand the supply of affordable homes. Trump's refusal to sign was a symbolic rebuke even as he let the measure stand.",
    "genre": "Economy",
    "sources": [
      {
        "name": "The Hill",
        "href": "https://news.google.com/rss/articles/CBMisgFBVV95cUxQQjZrU3lvS09QRl9pVkUzSGpHRkhhU1Y3dU14Qm1teUd5MXdRSnU4dXR0ZnNRMzd1NEV2T0ZFXzJRWTNiZmZiTWRLczc5RkdSTEZVTWRLVVZrTWdtcmU4VlFMdXdqcEZKVTBZRUkwT181ZVlkR2tKdmhVTHVXRFI1MTRiMHc1TU96LWU0M2txRkJicjNzNHVEQlNZR2pXajRZWnI5TV9RQW95MkxVWmttbkJ3?oc=5"
      },
      {
        "name": "The New York Times",
        "href": "https://news.google.com/rss/articles/CBMiekFVX3lxTE1fRTlmQ0hGYi01dERHWEM2aEpsZ1U5SE1VUWhlNDhhOGt0ak9qU0JfX0dDUnhlekNPb3Flbm1GcHExdU92bG1UaGxPV0NnWGE5TVVseTJmTXpoVEZtcm5odjdCV2c0X0JCbnZ4ZnBwNkRQdHhYQkc3Nm93?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-12",
    "image": {
      "src": "/covers/us-housing-affordability-bill-law.png",
      "alt": "The west front of the United States Capitol, where senators of both parties celebrated the new housing law",
      "credit": "Architect of the Capitol, Wikimedia Commons (public domain)"
    },
    "edition": "Morning Edition · 12 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Twenty-one centuries before a bipartisan bill promised to expand America's affordable-home supply, Tiberius Gracchus stood in the Roman Forum to demand land and shelter for the soldiers who had none, launching the lex agraria that convulsed the Republic.",
        "excerpt": "The wild beasts that roam over Italy have every one of them a cave or lair to lurk in, but the men who fight and die for Italy enjoy the common air and light, indeed, but nothing else; houseless and homeless they wander about with their wives and children.",
        "source": "Plutarch, Life of Tiberius Gracchus, chapter 9, trans. Bernadotte Perrin (Loeb Classical Library, 1921), Perseus Digital Library.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:2008.01.0065:chapter=9"
      },
      {
        "category": "historical",
        "title": "The precise constitutional mechanism by which President Trump let the housing bill become law while refusing to endorse it was written into Article I in 1787, which lets presidential silence, not only a signature, turn a bill into law.",
        "excerpt": "If any Bill shall not be returned by the President within ten Days (Sundays excepted) after it shall have been presented to him, the Same shall be a Law, in like Manner as if he had signed it, unless the Congress by their Adjournment prevent its Return, in which Case it shall not be a Law.",
        "source": "Constitution of the United States, Article I, Section 7. National Archives, founding documents transcript.",
        "href": "https://www.archives.gov/founding-docs/constitution-transcript"
      },
      {
        "category": "literary",
        "title": "Jacob Riis's 1890 walk through New York's fetid tenements remains the founding indictment of the housing misery the new affordable-home law is meant to relieve.",
        "excerpt": "Their large rooms were partitioned into several smaller ones, without regard to light or ventilation, and they soon became filled from cellar to garret with a class of tenantry living from hand to mouth, loose in morals, improvident in habits, degraded, and squalid as beggary itself.",
        "source": "Jacob A. Riis, How the Other Half Lives: Studies Among the Tenements of New York (1890), Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/45502/45502-h/45502-h.htm"
      },
      {
        "category": "literary",
        "title": "Dickens's Tom-all-Alone's, a collapsing warren of houses let out to the desperate poor, is the literary shadow that any law promising decent affordable shelter is written to dispel.",
        "excerpt": "Jo lives—that is to say, Jo has not yet died—in a ruinous place known to the like of him by the name of Tom-all-Alone's. It is a black, dilapidated street, avoided by all decent people, where the crazy houses were seized upon, when their decay was far advanced, by some bold vagrants who after establishing their own possession took to letting them out in lodgings. Now, these tumbling tenements contain, by night, a swarm of misery.",
        "source": "Charles Dickens, Bleak House (1852-53), chapter XVI, \"Tom-all-Alone's,\" Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/1023/1023-h/1023-h.htm"
      },
      {
        "category": "artistic",
        "title": "Riis's flash-lit photograph of a dozen lodgers crammed into a Bayard Street room rented five cents a spot is the image of scarcity the new law's supply expansion is meant to consign to history.",
        "excerpt": "In a low, airless room barely thirteen feet long, bodies lie shoulder to shoulder on plank shelves and bare floor, faces caught in the sudden white glare of Riis's magnesium flash. It is not a home but a human warehouse, the exact deprivation that housing reform sets itself against.",
        "source": "Jacob A. Riis, \"Lodgers in a Crowded Bayard Street Tenement — Five Cents a Spot\" (1889), Wikimedia Commons (public domain).",
        "href": "https://commons.wikimedia.org/wiki/File:Jacob_Riis,_Lodgers_in_a_Crowded_Bayard_Street_Tenement.jpg",
        "image": {
          "src": "/covers/us-housing-affordability-bill-law--a4.png",
          "alt": "Poor lodgers packed tightly into a squalid, dark Bayard Street tenement room, photographed by flash in 1889",
          "credit": "Jacob Riis, 1889, Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "The nineteenth century's most beloved anthem to a humble dwelling, \"Home, Sweet Home,\" gives melodic voice to the plain human longing that a bill to build affordable houses ultimately serves.",
        "excerpt": "'Mid pleasures and palaces though we may roam, / Be it ever so humble, there's no place like home.",
        "source": "Henry Rowley Bishop (music) and John Howard Payne (words), \"Home, Sweet Home\" (1823), from Clari, or the Maid of Milan. IMSLP / Petrucci Music Library (public domain).",
        "href": "https://imslp.org/wiki/Home,_Sweet_Home_(Bishop,_Henry_Rowley)"
      }
    ],
    "rank": 6
  },
  {
    "slug": "missouri-flooding-summer-camp-rescue",
    "headline": "Missouri flooding kills one as helicopters airlift more than 200 from a summer camp",
    "overview": "Flash flooding in Missouri killed at least one person and forced the rescue of more than 200 children and staff from a summer camp on July 11, 2026, with National Guard and Black Hawk helicopters lifting stranded campers to safety. Torrential rain sent rivers over their banks, submerging roads and cutting off low-lying areas. Emergency crews warned that more rain could bring further flooding.",
    "genre": "Climate",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMiswFBVV95cUxPWnJOdE1Pa19BdXV1RzhSc2c2dGRVYy1XTVczUHhKYTNOX0xKZ1AzbnpFXzQ1R1NCcWlNT0RhSEUyb290MlhuZWxaSTZFSEdRTTVEd0FSS0E4WFZ2WTBBNHF5Si1ZOWZZYzI5Tmp4VHJTQ3U0NDN4ZzlNUTZhNjMzX3dNX3VVb0xvMVNtdVZYdUdtN2VlamN0TGZJMExGemZnNHdLLVdNWFVZVExSLTZHTzFubw?oc=5"
      },
      {
        "name": "The Guardian",
        "href": "https://news.google.com/rss/articles/CBMihwFBVV95cUxOY1RFc1R1dGxaSXpoSTEtS2RVd1pDWEtBQ3BoQTNFUjd6bDlDaFF6RjFUS1pYWFJOa0lTUng3MnNmdEtmS2tOTVZybkVwR1VWazdzTWI4UTd0T1JDcTFSLUMwSHpxWDNNRlJFaUY4Y2tqYm45VUVyMWZTeTRYRmlZWUdCRV8yQ0E?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-12",
    "image": {
      "src": "/covers/missouri-flooding-summer-camp-rescue.png",
      "alt": "A UH-60 Black Hawk helicopter of the South Carolina Helicopter Aquatic Rescue Team hovers low over brown floodwater during a rescue mission.",
      "credit": "South Carolina Helicopter Aquatic Rescue Team, Oct. 4, 2015; U.S. Army National Guard photo by Lt. Col. Cindi King; Wikimedia Commons, public domain."
    },
    "edition": "Morning Edition · 12 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "When the South Fork Dam gave way above Johnstown in 1889, a churning wall of water swallowed a valley much as this month's flash flood engulfed Missouri's low ground and its riverside camp.",
        "excerpt": "Away up the Conemaugh came a yellow wall, whose crest was white and frothy.",
        "source": "Willis Fletcher Johnson, History of the Johnstown Flood (Edgewood Publishing Co., 1889), eyewitness account of George Johnston, Chapter VI; Project Gutenberg eBook 41271.",
        "href": "https://www.gutenberg.org/files/41271/41271-h/41271-h.htm"
      },
      {
        "category": "historical",
        "title": "The Great Mississippi Flood of 1927 drowned 27,000 square miles and stranded families on rooftops and levees, foreshadowing the marooned campers Missouri crews had to lift from the water this week.",
        "excerpt": "A silent U.S. Army Signal Corps newsreel records the greatest river flood in American history: brown water swallowing homes and fields across Illinois and Louisiana, families and livestock huddled on narrow levees, and rescuers working boats through the drowned countryside. It shows Secretary of Commerce Herbert Hoover touring the ruin and vast refugee camps where more than half a million displaced people were fed and sheltered.",
        "source": "Mississippi River Flood of 1927, U.S. Army Signal Corps motion picture (National Archives ARC 24699); Internet Archive, public domain.",
        "href": "https://archive.org/details/mississippi_flood_1927"
      },
      {
        "category": "literary",
        "title": "In the oldest flood story of the West, the waters that bore up Noah's ark prefigure the deluge that this week lifted more than two hundred souls out of a Missouri valley to safety.",
        "excerpt": "And the flood was forty days upon the earth; and the waters increased, and bare up the ark, and it was lift up above the earth. And the waters prevailed, and were increased greatly upon the earth; and the ark went upon the face of the waters. And the waters prevailed exceedingly upon the earth; and all the high hills, that were under the whole heaven, were covered.",
        "source": "Genesis 7:17-19, Authorized (King James) Version; Wikisource.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Genesis"
      },
      {
        "category": "literary",
        "title": "The Babylonian deluge of Gilgamesh, where the gods' storm swept the earth and the flood 'reached to heaven,' speaks to the torrential Missouri rain that drove rivers over their banks in hours.",
        "excerpt": "Vul in the midst of it thundered, and Nebo and Saru went in front, the throne bearers went over mountains and plains, the destroyer Nergal overturned, Ninip went in front and cast down, the spirits carried destruction, in their glory they swept the earth; of Vul the flood reached to heaven.",
        "source": "The Epic of Gilgamesh, Eleventh (Flood) Tablet, trans. George Smith, The Chaldean Account of Genesis (1876); Sacred Atlas.",
        "href": "https://sacredatlas.org/read/gilgamesh/1/"
      },
      {
        "category": "artistic",
        "title": "Gustave Doré's engraving of the Deluge, with the last of the living clutching a rock as the waters close over them, is the visual echo of Missouri's stranded campers waiting above the rising flood.",
        "excerpt": "Doré's dramatic wood engraving shows a family and a tigress crowded onto a last bare crag as the drowned world sinks beneath them, a floating child and the arms of the perishing rising from the black water below. Light breaks over a boundless flooded horizon, rendering the terror of waters that have overtaken every high place.",
        "source": "Gustave Doré (1832-1883), 'The Deluge,' Plate I from The Holy Bible with Illustrations by Gustave Doré (Cassell & Company, c. 1866); Wikimedia Commons, public domain.",
        "href": "https://commons.wikimedia.org/wiki/File:Gustave_Dor%C3%A9_-_The_Holy_Bible_-_Plate_I,_The_Deluge.jpg",
        "image": {
          "src": "/covers/missouri-flooding-summer-camp-rescue--a4.png",
          "alt": "Wood engraving of people and a tigress stranded on a rock as floodwaters rise around them, with a drowning child and reaching arms below and a vast flooded horizon behind.",
          "credit": "Gustave Doré, 'The Deluge' (c. 1866), engraved by A. Pannemaker; Wikimedia Commons, public domain."
        }
      },
      {
        "category": "artistic",
        "title": "Camille Saint-Saens opened his oratorio Le deluge with an orchestral Prelude that gathers the storm and the swelling of the waters into sound, the music of a flood like the one now loosed over Missouri.",
        "excerpt": "The Prelude to Saint-Saens's 1875 biblical poem Le deluge is a serene fugal string meditation crowned by a famous solo violin song, the calm of the world before the rain, from which the score builds toward the tempest and the rising waters that drown the earth. It stands as one of the tenderest musical evocations of the moment before catastrophe.",
        "source": "Camille Saint-Saens, Le deluge, Op. 45 (poeme biblique, 1875-76), Prelude; scores at IMSLP, public domain.",
        "href": "https://imslp.org/wiki/Le_d%C3%A9luge,_Op.45_(Saint-Sa%C3%ABns,_Camille)"
      }
    ],
    "rank": 7
  },
  {
    "slug": "trinidad-tobago-us-data-center-deals",
    "headline": "Trinidad and Tobago signs agreements with US firms to build data centers",
    "overview": "Trinidad and Tobago signed agreements with US companies on July 11, 2026, that pave the way for large data centers on the Caribbean twin-island nation. Officials cast the deals as a step toward becoming a regional technology hub, while critics warned about the strain the energy-hungry facilities could place on power and water. The move reflects a wider rush to site AI infrastructure in new locations.",
    "genre": "Technology",
    "sources": [
      {
        "name": "The Washington Times",
        "href": "https://news.google.com/rss/articles/CBMiuAFBVV95cUxPZWpaWkpzb2xBRGJpWFcxSFNjX3piNFpWWUFYUHFwdEVaUUNvRVh2WmNxUTdaNENhendZRkZrSm5NQVh2dl9aTHlIem5xRGJZMzMwamtjTmZ4SG9YUHBXQVhfeXJZX1VHTURJRGN3anZBbWozZGt6em1FMUN5ZXh0M0c0Mk43SmN0ajRseFkwRDVHZ2wzcDR4SlgxLTRqcmhaS3lHaEtrR2ZQRUFkOUU0ODFNelFxbTVu?oc=5"
      },
      {
        "name": "Trinidad Guardian",
        "href": "https://news.google.com/rss/articles/CBMiswFBVV95cUxPa3phWnpqbmNjX0JOdEZIVVppZ0VXdk44bjQzTm9fREt2UWstLV8yZVd0RWVYU1JrcHEya2g5ZlFqa0FhcjlyZlMyNC10aU82T09MZHRXTjcxTTN0aVZ3M2hKM1FvYUtKX1ZMMVYtMEl0dm91c1EtcnFQbDRuVEQ2SnpnTUV0cGJNV3o3XzVJTE5jeG51NFRlVGc3anlJMFRWS3FoOV9wQ3FCdGtXVmE4NU0wZw?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-12",
    "image": {
      "src": "/covers/trinidad-tobago-us-data-center-deals.png",
      "alt": "Rows of illuminated server racks and cabling receding down the aisles of a data-center server hall, no people present.",
      "credit": "Indrajit Das, CC BY-SA 3.0, via Wikimedia Commons."
    },
    "edition": "Morning Edition · 12 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "As Trinidad wires itself into the global AI economy through foreign-built server halls, the 1858 transatlantic cable shows how a single new strand of infrastructure could be sold as a nation's 'additional link' to the wider world.",
        "excerpt": "On August 16 Queen Victoria sent a telegram of congratulation to President Buchanan through the line, and expressed a hope that it would prove 'an additional link between the nations whose friendship is founded on their common interest and reciprocal esteem.' The President responded that, 'it is a triumph more glorious, because far more useful to mankind, than was ever won by conqueror on the field of battle.'",
        "source": "John Munro, Heroes of the Telegraph (London: The Religious Tract Society, 1891), Chapter IV, via Wikisource.",
        "href": "https://en.wikisource.org/wiki/Heroes_of_the_Telegraph/Chapter_4"
      },
      {
        "category": "historical",
        "title": "Trinidad's leaders casting the data-center deals as a leap toward becoming a regional technology hub echo Roosevelt's Depression-era gamble that harnessing a whole valley's resources through vast new public works would remake a region's fortunes.",
        "excerpt": "Second, I have requested the Congress and have secured action upon a proposal to put the great properties owned by our Government at Muscle Shoals to work after long years of wasteful inaction, and with this a broad plan for the improvement of a vast area in the Tennessee Valley. It will add to the comfort and happiness of hundreds of thousands of people and the incident benefits will reach the entire Nation.",
        "source": "Franklin D. Roosevelt, Fireside Chat, 7 May 1933, via Wikisource.",
        "href": "https://en.wikisource.org/wiki/Roosevelt%27s_Fireside_Chat,_7_May_1933"
      },
      {
        "category": "literary",
        "title": "Blake's vision of 'dark Satanic Mills' rising amid England's green hills warns that the machines promising prosperity can also cast a shadow over the land and water they consume — the very fear Trinidad's critics now voice.",
        "excerpt": "And did the Countenance Divine,\nShine forth upon our clouded hills?\nAnd was Jerusalem builded here,\nAmong these dark Satanic Mills?",
        "source": "William Blake, \"Preface\" to Milton: A Poem (c. 1808), via Wikisource.",
        "href": "https://en.wikisource.org/wiki/Milton_(excerpts)/Preface"
      },
      {
        "category": "literary",
        "title": "Dickens's Coketown, a town remade in the image of its machinery and its dye-stained river, foreshadows the fear that Trinidad's server farms could reshape the twin islands around the appetites of the engines they house.",
        "excerpt": "It was a town of red brick, or of brick that would have been red if the smoke and ashes had allowed it; but as matters stood, it was a town of unnatural red and black like the painted face of a savage. It was a town of machinery and tall chimneys, out of which interminable serpents of smoke trailed themselves for ever and ever, and never got uncoiled. It had a black canal in it, and a river that ran purple with ill-smelling dye, and vast piles of building full of windows where there was a rattling and a trembling all day long, and where the piston of the steam-engine worked monotonously up and down, like the head of an elephant in a state of melancholy madness.",
        "source": "Charles Dickens, Hard Times (1854), Book the First, Chapter V \"The Key-note\", via Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/786/786-h/786-h.htm"
      },
      {
        "category": "artistic",
        "title": "Loutherbourg's furnaces blazing over Coalbrookdale capture the awe and dread of an earlier industrial dawn — the same double face Trinidad now sees in power-hungry data centers that would light up its nights.",
        "excerpt": "Painted in 1801, Coalbrookdale by Night shows the Bedlam Furnaces of Shropshire erupting in fiery red light against a darkened sky, one of the first works to treat heavy industry as a subject worthy of the sublime. The molten glow is at once thrilling and hellish, awe and alarm held in a single frame. It is the visual ancestor of every debate over whether an all-consuming new industry lifts a place up or scorches it.",
        "source": "Philip James de Loutherbourg, Coalbrookdale by Night, 1801, oil on canvas, Science Museum, London (public domain).",
        "href": "https://commons.wikimedia.org/wiki/File:Philipp_Jakob_Loutherbourg_d._J._002.jpg",
        "image": {
          "src": "/covers/trinidad-tobago-us-data-center-deals--a4.png",
          "alt": "Night landscape of an ironworks, its furnaces throwing lurid orange-red light and smoke into a dark sky above silhouetted buildings and figures.",
          "credit": "Philip James de Loutherbourg, Coalbrookdale by Night (1801), Science Museum, London, via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "artistic",
        "title": "Honegger's locomotive rendered as roaring orchestral machinery gives voice to the mechanical sublime that data centers embody — relentless, powerful, and indifferent to the land it runs through.",
        "excerpt": "Pacific 231 translates a steam locomotive into pure orchestral motion: from the shudder of a stationary engine at rest, the music accelerates through massed, grinding rhythms into a thundering climax before braking to a halt. Honegger said he sought not to imitate the noise of the train but to convey the sensation of speed and the visual impression of a 300-ton machine hurled through the night. It is the sound of the machine age exalted and made monstrous at once — an apt score for the humming, ceaseless engines Trinidad has agreed to host.",
        "source": "Arthur Honegger, Pacific 231 (Mouvement symphonique No. 1), H. 53 (1923), via IMSLP.",
        "href": "https://imslp.org/wiki/Pacific_231,_H.53_(Honegger,_Arthur)"
      }
    ],
    "rank": 8
  },
  {
    "slug": "poland-volhynia-massacre-memorial",
    "headline": "Poland to build memorial to World War II massacre victims as PM Tusk calls Volhynia killings 'genocide'",
    "overview": "Poland's prime minister, Donald Tusk, pledged on July 11, 2026, to build a memorial to Polish victims of the World War II massacres in Volhynia, describing the killings by Ukrainian nationalists as genocide. The announcement came on the anniversary of the wartime atrocities and amid strained ties with Kyiv. Warsaw said a 'Wall of Remembrance' would honor those killed in the 1940s.",
    "genre": "Politics",
    "sources": [
      {
        "name": "BBC",
        "href": "https://news.google.com/rss/articles/CBMiXEFVX3lxTFB5d1dhbUNWX3dLQVlydnZBVWhRVXpRZC1PNjAzTGpEZVc0bFdtbGtialBMQldiX0c0TVBHYkpFVTV0cHFuWGhIRmRvcWxiTUJ3eW5nYjBQNFo4aUZf?oc=5"
      },
      {
        "name": "The Times of Israel",
        "href": "https://news.google.com/rss/articles/CBMitwFBVV95cUxQdHctSUVvdGNlYjNCcl9oSnUxTUU4R2pGUE1oSlJmQlBMbDdnTk5JYlpxZkpoQnlNcWhsTnJsUnNjVmZTZkhGTkpreWpFYTZXbGx1Rkw1a3MxeEpwX19xTXVUS24xSDVhNDUyelFxYWNPZW54WnJWNkNiQTJnck1xM2dnanJmakVVNHJua2dBYmtnWTFxNXlJd1ZZeEItTk5LOGpFdXBjbzdMWFFVc3Nqa3NtVXlQa1U?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-12",
    "image": {
      "src": "/covers/poland-volhynia-massacre-memorial.png",
      "alt": "A dark stone monument to the victims of the 1940 Katyn massacre in Podkowa Leśna, Poland.",
      "credit": "Katyn 1940 Massacre monument, Podkowa Leśna, Poland. Photograph by Christopher Ziemnowicz (CZmarlin), public domain, via Wikimedia Commons."
    },
    "edition": "Morning Edition · 12 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Long before Tusk's Wall of Remembrance, democratic Athens turned mourning into a civic monument, burying its war dead in a public tomb in the city's fairest suburb and parading an empty bier for those whose bodies could never be brought home.",
        "excerpt": "The dead are laid in the public sepulchre in the Beautiful suburb of the city, in which those who fall in war are always buried... Among these is carried one empty bier decked for the missing, that is, for those whose bodies could not be recovered.",
        "source": "Thucydides, History of the Peloponnesian War, Book II, §34 (English Wikisource edition).",
        "href": "https://en.wikisource.org/wiki/History_of_the_Peloponnesian_War/Book_2"
      },
      {
        "category": "historical",
        "title": "Poland's own long agony over Katyn—where the Soviet secret police shot thousands of its officers in 1940 and the truth was denied for half a century—shows how a memorial to massacre becomes at once a national reckoning and a wound between neighbors, the very charge the Volhynia stones now carry toward Kyiv.",
        "excerpt": "For decades after 1940, Poles could not name Katyn aloud: the graves were real but the crime was officially blamed on others, and remembrance itself was an act of defiance. Only after 1989 could monuments rise to the murdered officers. Like Tusk's memorial to the Volhynia dead, each stone is both a grief finally spoken and a demand that a neighboring power acknowledge what was done.",
        "source": "Katyn Massacre Monument, Wrocław, Poland (photograph by ElaineLat, Wikimedia Commons, CC BY-SA 3.0 PL).",
        "href": "https://commons.wikimedia.org/wiki/File:Pomnik_Katynski_-_Katyn_Memorial.jpg"
      },
      {
        "category": "literary",
        "title": "Antigone, defying a ruler's decree to leave her brother's body unburied, gives voice to the ancient conviction behind Warsaw's memorial: that the dead are owed a grave and a name, whatever the politics of the living.",
        "excerpt": "It was not Zeus that had published me that edict; not such are the laws set among men by the justice who dwells with the gods below. ... I owe a longer allegiance to the dead than to the living: in that world I shall abide for ever.",
        "source": "Sophocles, Antigone, trans. R. C. Jebb (The Internet Classics Archive).",
        "href": "http://classics.mit.edu/Sophocles/antigone.html"
      },
      {
        "category": "literary",
        "title": "As Priam ransoms Hector's body from his enemy and the women of Troy raise their lament over it, Homer names the oldest duty any memorial serves—to reclaim the slain and mourn each one by name, as Poland now vows to do for the victims of Volhynia.",
        "excerpt": "Husband, you have died young, and leave me in your house a widow; he of whom we are the ill-starred parents is still a mere child.",
        "source": "Homer, The Iliad, Book XXIV, trans. Samuel Butler (The Internet Classics Archive).",
        "href": "http://classics.mit.edu/Homer/iliad.24.xxiv.html"
      },
      {
        "category": "artistic",
        "title": "Käthe Kollwitz's grieving mothers, cut in stark black and white by a woman who lost her own son to war, are the visual conscience behind memorials like Poland's—monuments raised not to victory but to the bereaved.",
        "excerpt": "A knot of women presses together into a single sculptural mass, their bodies forming a wall of protection around the children hidden in their skirts, faces hollowed by dread. Kollwitz strips war down to those it leaves behind. It is the same sorrow a Wall of Remembrance is built to hold.",
        "source": "Käthe Kollwitz, Die Mütter (The Mothers), plate 6 from the cycle Krieg (War), 1921–22. Public domain (artist died 1945).",
        "href": "https://commons.wikimedia.org/wiki/File:Die_M%C3%BCtter.jpg",
        "image": {
          "src": "/covers/poland-volhynia-massacre-memorial--a4.png",
          "alt": "Black-and-white print of a tightly clustered group of mothers shielding their children, their faces marked by grief and fear.",
          "credit": "Käthe Kollwitz, Die Mütter (The Mothers), plate 6 from Krieg (War), 1921–22. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Poland's own Chopin gave the modern world its music of public mourning; his Funeral March is the very sound a nation makes when it gathers, as Warsaw now will, to grieve its dead in stone.",
        "excerpt": "Over a slow, tolling tread in the left hand, the march advances like a funeral cortege, broken only by a tender central trio before the dirge returns and darkens. Written by an exile who never saw his homeland again, it has accompanied the burials of the famous and the anonymous alike. It is the sound of a whole community walking behind the dead.",
        "source": "Frédéric Chopin, Marche funèbre (Funeral March), third movement of the Piano Sonata No. 2 in B-flat minor, Op. 35 (1837/1839). Scores at IMSLP (public domain).",
        "href": "https://imslp.org/wiki/Piano_Sonata_No.2,_Op.35_(Chopin,_Fr%C3%A9d%C3%A9ric)"
      }
    ],
    "rank": 9
  },
  {
    "slug": "pamplona-san-fermin-bull-run-goring",
    "headline": "Runner gored in the face and a dozen injured at Pamplona's San Fermin bull run",
    "overview": "A runner was gored in the face and about a dozen others were injured during a bull run at Spain's San Fermin festival in Pamplona on July 11, 2026. The half-ton fighting bulls charged through the old town's narrow streets as thousands watched the centuries-old spectacle made famous by Ernest Hemingway. Medics treated the wounded as the annual festival, long criticized by animal-rights groups, continued.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMipgFBVV95cUxQaXVQYVlldm1TcE5PSDBFRE1TM0dIWW5OcHh2ODZZVzBaQTJEbWVLZXEzVzI4TDhvaWtiWWVFVVloRzd0SXdwQWRKZzhjLW5Ec2MxYmFqSjFyakljLVB1MnBQRlRjbXkxZUIxeG4tTFJfbU5fTTluZlFyeHp4M2tDUzcyV09NS29hSEhMVngtWkdwcnQ1RXlRS1ZjWDhQQjZzNVZuYm1B?oc=5"
      },
      {
        "name": "Sky News",
        "href": "https://news.google.com/rss/articles/CBMiygFBVV95cUxPcExlMFZpaWJVMGhEWnktbWluZTdkSUNaLWltNWgxREY3bkV0X0dCdkNzRVB1cDBfa29JOUxzMEczUjFVSzVRX2xvYThmUl9CcmJTc3VvTXVZSF95OHk3RFlwemxXODB2NGpNQ1R1dXk3VGp2SldhZVV2Q3UwcXR5anVqOXhnYk5BTUVSX25vbnJod2s2MnpIajhhVzdfbmhidTg4MUFINjV0eWZRdHJ5emxtNV90djdBZ3pGVjRVcXZpMkJBZ0VkTmNR?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-12",
    "image": {
      "src": "/covers/pamplona-san-fermin-bull-run-goring.png",
      "alt": "Bulls and runners charging up the narrow Estafeta street during the Pamplona running of the bulls",
      "credit": "Photo by Atkins525, CC BY-SA 4.0 via Wikimedia Commons"
    },
    "edition": "Morning Edition · 12 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Long before Pamplona's fighting bulls charged down Estafeta street, imperial Rome had already turned the killing of beasts into mass entertainment, a spectacle Augustus himself proudly tallied.",
        "excerpt": "Twenty-six times, under my name or that of my sons and grandsons, I gave the people hunts of African beasts in the circus, in the open, or in the amphitheater; in them about 3,500 beasts were killed.",
        "source": "Augustus, Res Gestae Divi Augusti ('The Deeds of the Divine Augustus'), section 22 (early 1st century CE), English translation via Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_Deeds_of_the_Divine_Augustus"
      },
      {
        "category": "historical",
        "title": "The gored runner at San Fermin belongs to a lineage of awe far older than the arena: in Egypt the bull was not quarry but the sacred god Apis, worshipped rather than fought, a reminder of how many ways humanity has bound itself to the animal it now sends charging through Pamplona.",
        "excerpt": "Now this Apis, or Epaphus, is the calf of a cow which is never afterwards able to bear young... He is black, with a square spot of white upon his forehead, and on his back the figure of an eagle; the hairs in his tail are double, and there is a beetle upon his tongue.",
        "source": "Herodotus, The History of Herodotus, Book III.28, trans. George Rawlinson, via Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_History_of_Herodotus_(Rawlinson)/Book_3"
      },
      {
        "category": "literary",
        "title": "A half-ton bull loose in the maze of Pamplona's old town revives the oldest nightmare of horns in a labyrinth: the man-bull Minotaur that King Minos hid away and fed with human tribute.",
        "excerpt": "Within this Maze did Minos shet the Monster that did beare / The shape of man and Bull.",
        "source": "Ovid, Metamorphoses, Book VIII, trans. Arthur Golding (1567), via Wikisource.",
        "href": "https://en.wikisource.org/wiki/Metamorphoses_(tr._Golding)/Book_8"
      },
      {
        "category": "literary",
        "title": "The runner gored in the face on the cobbles echoes Greek tragedy's supreme image of bovine terror, the monstrous bull risen from the sea whose bellowing panic drags a man to a shattering death.",
        "excerpt": "then swelling and frothing with a crest of foam, the sea discharged it toward the beach where stood the harnessed car, and in the moment that it broke, that mighty wall of waters, there issued from the wave a monstrous bull, whose bellowing filled the land with fearsome echoes",
        "source": "Euripides, Hippolytus, trans. E. P. Coleridge, via Wikisource.",
        "href": "https://en.wikisource.org/wiki/Hippolytus_(Coleridge)"
      },
      {
        "category": "artistic",
        "title": "Goya engraved San Fermin's worst nightmare two centuries in advance, catching the instant a bull's horn kills the celebrated matador Pepe-Hillo before a packed Madrid ring.",
        "excerpt": "Goya's aquatint freezes the goring at its climax: the bull drives a horn into the fallen matador while the ring's shadowed crowd looks on, the famed Pepe-Hillo killed in the Madrid arena in 1801.",
        "source": "Francisco de Goya, La Tauromaquia, Plate 33: 'La desgraciada muerte de Pepe Illo en la plaza de Madrid' (The Unlucky Death of Pepe-Hillo in the Madrid Ring), etching and aquatint, 1816. Wikimedia Commons (public domain).",
        "href": "https://commons.wikimedia.org/wiki/File:Tauromaquia_Goya_33.jpg",
        "image": {
          "src": "/covers/pamplona-san-fermin-bull-run-goring--a4.png",
          "alt": "Goya etching showing a fighting bull goring the matador Pepe-Hillo as he falls in a crowded bullring",
          "credit": "Francisco de Goya, 'La Tauromaquia' Plate 33 (1816), public domain via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "The centuries-old spectacle that drew thousands to watch the Pamplona bulls found its most famous anthem in Bizet's swaggering Toreador Song, the crowd's thrill and the fighter's mortal danger fused into a single march.",
        "excerpt": "Bizet's baritone toreador struts into the tavern promising the glory of the ring even as he warns that dark eyes watch and death waits its turn, the spectacle's glamour and its peril bound together in one strutting refrain.",
        "source": "Georges Bizet, Carmen (1875), 'Votre toast, je peux vous le rendre' (the Toreador Song), Act II; full scores at IMSLP (public domain).",
        "href": "https://imslp.org/wiki/Carmen_(Bizet,_Georges)"
      }
    ],
    "rank": 10
  },
  {
    "slug": "venezuela-earthquake-death-toll-rises",
    "headline": "Venezuela earthquake death toll rises to 4,333 with more than 16,000 injured",
    "overview": "The death toll from twin earthquakes that struck Venezuela in June has climbed to 4,333, with 16,740 people injured, the president of the National Assembly said on July 11, 2026. Rescue teams continued searching collapsed buildings as the country grappled with a deepening humanitarian crisis. It ranks among the deadliest natural disasters in Venezuela's history.",
    "genre": "Science",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiywFBVV95cUxORkE0LXY1NzZMSC1kVURVTDA0a0NGc3l4aXNreERjdXJhZWlWWDlzVGhKaGhFS2p2WGIyVV9SdzVzcHJXS0w1UG9ZSGpyUFpVUWx5UEVTOTlQYWJmRHBkRlZlSHVsN19zQ3RCUVQxaWhzWTFpYWQtSUY4YWVJcnZmUkk2S3NpcFFUR1dBQU9tRjZqSWE4NGlXenJmVTQzSEo5Vk5qakZ1TDVoSXNyX1pEZFpFcnRrb0ZEZldPQlBuLW5KM2RKUVRPMDVQWQ?oc=5"
      },
      {
        "name": "Bloomberg",
        "href": "https://news.google.com/rss/articles/CBMixwFBVV95cUxOSGV1MnkwcUhBb1Y0N2JIWWxzU18weEc5bzlocGFQZzlnclpLV3ZSRy12Nk9fYTlvVUczZUFnTEdwTVJjQW1ySDYwOWo1d3R1SC1XR1gxcWl3YXhRLTlocjNmanEzRzhuRThZUDJtd3FOUmp3cGNoelZpa0M0VkNzM3pPMzEtUmlXSjVvcFZ5MjZVYnFyaDZxa1VhbGxTRENkTjFCUEgwMkZZa3FRNzNYdnZUS05iZ3EyVGs1WnA5bnRrRGdpXzZ3?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-12",
    "image": {
      "src": "/covers/venezuela-earthquake-death-toll-rises.png",
      "alt": "a collapsed concrete building and rubble under a grey sky, no people, no text",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 12 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "As Venezuela counts 4,333 dead beneath fallen buildings, the 1755 Lisbon earthquake shows how a single morning's convulsion of the earth can throw down a great city and haunt a civilization's conscience.",
        "excerpt": "On the morning of All Saints' Day, 1 November 1755, a massive earthquake, followed by a tsunami and sweeping fires, destroyed Lisbon in minutes and killed tens of thousands. Churches packed with worshippers collapsed on the faithful; the harbor waters heaved and swallowed ships. The catastrophe shook not only a capital but the Enlightenment's confidence that this was the best of all possible worlds.",
        "source": "Contemporary copper engraving, \"The 1755 Lisbon earthquake,\" 1755, Museu da Cidade, Lisbon; public domain, via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:1755_Lisbon_earthquake.jpg"
      },
      {
        "category": "historical",
        "title": "Like the rescue teams still digging through Venezuela's rubble, San Franciscans in 1906 awoke to streets torn open and buildings toppled, a reminder that modern cities are no safer from the earth's sudden violence than ancient ones.",
        "excerpt": "At dawn on 18 April 1906 a violent earthquake struck San Francisco, rupturing gas mains and igniting fires that burned for days across the ruined city. Some 3,000 people died and much of the city was leveled or consumed by flame. Arnold Genthe's photograph of residents watching the smoke advance up Sacramento Street became one of the enduring images of a metropolis brought to its knees.",
        "source": "Arnold Genthe, photograph of Sacramento Street, San Francisco, 18 April 1906; public domain, via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:San_Francisco_Fire_Sacramento_Street_1906-04-18.jpg"
      },
      {
        "category": "literary",
        "title": "Voltaire's anguished cry over Lisbon's dead speaks directly to the mounting Venezuelan toll, refusing every easy consolation that would explain away a mother and child crushed together in the wreckage.",
        "excerpt": "Unhappy mortals! Dark and mourning earth!\nAffrighted gathering of human kind!\nEternal lingering of useless pain!\nCome, ye philosophers, who cry, \"All's well,\"\nAnd contemplate this ruin of a world.\nBehold these shreds and cinders of your race,\nThis child and mother heaped in common wreck,\nThese scattered limbs beneath the marble shafts—",
        "source": "Voltaire, \"Poem on the Lisbon Disaster; or an Examination of the Axiom, 'All is Well'\" (1756), trans. Joseph McCabe, in Toleration and Other Essays; via Wikisource.",
        "href": "https://en.wikisource.org/wiki/Toleration_and_other_essays/Poem_on_the_Lisbon_Disaster"
      },
      {
        "category": "literary",
        "title": "Pliny the Younger's eyewitness account of the ground writhing beneath Vesuvius mirrors the terror of Venezuelans who felt solid earth turn treacherous as buildings tottered around them.",
        "excerpt": "For although the ground was perfectly level, the vehicles which we had ordered to be brought with us began to sway to and fro, and though they were wedged with stones, we could not keep them still in their places. Moreover, we saw the sea drawn back upon itself, and, as it were, repelled by the quaking of the earth.",
        "source": "Pliny the Younger, Letters, Book 6, Letter 20 (to Tacitus), describing the AD 79 eruption of Vesuvius; English translation via Attalus.org.",
        "href": "https://www.attalus.org/old/pliny6.html"
      },
      {
        "category": "artistic",
        "title": "Bryullov's vast canvas of Pompeii's last hour—columns snapping, families shielding one another beneath a livid sky—gives monumental form to the human catastrophe now unfolding among Venezuela's collapsed buildings.",
        "excerpt": "Bryullov depicts the instant of the AD 79 catastrophe: statues pitch from their pedestals, temples crack apart, and terrified citizens crowd together beneath a sky torn by red lightning. Mothers clutch children, sons carry aged fathers, and a fallen woman lies beside her infant amid the debris. The painting fuses the grandeur of history painting with raw human panic before the earth's destroying power.",
        "source": "Karl Bryullov, The Last Day of Pompeii, 1830–1833, oil on canvas, State Russian Museum, Saint Petersburg; public domain, via Wikimedia Commons (Google Art Project).",
        "href": "https://commons.wikimedia.org/wiki/File:Karl_Brullov_-_The_Last_Day_of_Pompeii_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/venezuela-earthquake-death-toll-rises--a4.png",
          "alt": "A crowded classical square in chaos as buildings and statues topple, lit by red lightning, with terrified families sheltering amid falling debris.",
          "credit": "Karl Bryullov, The Last Day of Pompeii (1830–1833), State Russian Museum; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "The thunder of the \"Dies irae\" in Mozart's Requiem—its day of wrath when the world dissolves in ashes—offers a musical equivalent to the grief and terror rising with Venezuela's death toll.",
        "excerpt": "Mozart's setting of the medieval \"Dies irae\" sequence erupts with hammering strings and full chorus, evoking the day of wrath when heaven and earth are shaken and dissolved into ash. Trembling voices and stabbing orchestral chords render cosmic catastrophe and human dread in sound. Left unfinished at the composer's death, the movement has become music's archetypal cry before overwhelming disaster.",
        "source": "Wolfgang Amadeus Mozart, Requiem in D minor, K.626 (completed by F. X. Süssmayr, 1791–92), \"Dies irae\" (No. 3); scores via IMSLP/Petrucci Music Library.",
        "href": "https://imslp.org/wiki/Requiem_in_D_minor,_K.626_(Mozart,_Wolfgang_Amadeus)"
      }
    ],
    "rank": 11
  },
  {
    "slug": "ford-unifor-tentative-labor-deal",
    "headline": "Ford and Canada's Unifor union reach a tentative labor deal for autoworkers",
    "overview": "Ford and the Canadian union Unifor reached a tentative agreement on a new national labor contract early on July 12, 2026, averting a possible strike at the automaker's Canadian operations. The deal covers thousands of autoworkers and now goes to members for a ratification vote. Terms were not immediately disclosed.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMitAFBVV95cUxPcVIyLTBWVFN2UGNfWXZUY3pUajVmdkFTNnVlRVBUZFd1T3NWaUpqek9qRm9lV29ZLXJ5X2JqWGpuVEh4YnBnSjllVWlDOV9rSEhJVGNXLWtSZmRtRmpHUXQtcUNvNkpYYVJtTjB4M3p3VUR5czNuVkRkQmU3SE9PU1h5QndCMW5ZX3hBcGVkTzBDVEpsclVYd2g3MktJVGJxVGZLMk90RXNwUzR0Y2JOYS01WGs?oc=5"
      },
      {
        "name": "The Detroit News",
        "href": "https://news.google.com/rss/articles/CBMixwFBVV95cUxObTVxSktZMDRfemRvVFhZQ2Yxd245dUdEYUJXckJxUWdIZ2pQRlZLVk1FdmZKQTM0M3BydEc0RncwaEpJMXhzSWZBcGVOOWEzOWVLZGl5SlgxQWhYUzlpU1JETzdXX3loTU96Wm16M3VVRTB1OVY3SnJWS2hBREVqNVpSVll0dDJrTGR3aXdXY0dSeE9fYlpVakpLTmpPaDRyTV8xQXgzZV9tMHNDYzJxNEtFX0s0aXVCSkIzUmpCQTE3eVlSdHBF?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-12",
    "image": {
      "src": "/covers/ford-unifor-tentative-labor-deal.png",
      "alt": "Rows of workers along the Ford Model T assembly line at the Highland Park plant in 1913, car components moving down the line in a vast factory hall.",
      "credit": "Ford Motor Company Model T assembly line, Highland Park, Michigan, 1913; U.S. National Archives, public domain via Wikimedia Commons."
    },
    "edition": "Morning Edition · 12 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "As Ford and Unifor step back from a walkout, Rome recalls its own averted rupture — when the plebeians seceded to the Sacred Mount and Menenius Agrippa won them back with the parable that a body's belly and limbs must share the fruits of common labor.",
        "excerpt": "In the days when all the parts of the human body were not as now agreeing together, but each member took its own course and spoke its own speech, the other members, indignant at seeing that everything acquired by their care and labour and ministry went to the belly.",
        "source": "Livy, The History of Rome (Ab Urbe Condita), Book II, ch. 32 (the secession to the Sacred Mount, 494 BC), trans. Rev. Canon Roberts (London: J.M. Dent, 1912); Perseus Digital Library.",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0026:book=2:chapter=32"
      },
      {
        "category": "historical",
        "title": "The Flint sit-down strikers who occupied GM's plants in 1936-37 and forced recognition of the UAW are the ancestors of every autoworker whose union now bargains, as Unifor does with Ford, from a position of hard-won strength.",
        "excerpt": "For forty-four days in the winter of 1936-37, autoworkers occupied General Motors' Fisher Body plants in Flint rather than surrender their claims, holding the machines until the company recognized their union. This photograph shows strikers dug in on the factory floor, turning the assembly line itself into a fortress of collective will. Their victory birthed the modern UAW and the very tradition of auto-sector bargaining that Unifor now carries to the table with Ford.",
        "source": "Sheldon Dick, 'Sit-down strikers in the Fisher body plant factory number three, Flint, Michigan' (1937), U.S. Farm Security Administration, Library of Congress Prints & Photographs Division (digital id fsa.8c28669); Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Sitdown_strikers_in_the_Fisher_body_plant_factory_number_three._Flint,_Michigan.jpg"
      },
      {
        "category": "literary",
        "title": "Zola's doomed colliers, laboring in the shadow of a pit that crouches like a gluttonous beast, embody the desperation that makes a negotiated contract — the alternative Ford and Unifor have just chosen — a hard-won mercy rather than a last resort.",
        "excerpt": "This pit, piled up in the bottom of a hollow, with its squat brick buildings, raising its chimney like a threatening horn, seemed to him to have the evil air of a gluttonous beast crouching there to devour the earth.",
        "source": "Émile Zola, Germinal (1885), trans. Havelock Ellis (1894), Part First, Chapter I; Project Gutenberg (eBook #56528).",
        "href": "https://www.gutenberg.org/files/56528/56528-h/56528-h.htm"
      },
      {
        "category": "literary",
        "title": "The Gospel's ancient principle that 'the labourer is worthy of his hire' is the moral seed of every wage negotiation, including the tentative terms Ford and Unifor now put before members for a ratification vote.",
        "excerpt": "And in the same house remain, eating and drinking such things as they give: for the labourer is worthy of his hire. Go not from house to house.",
        "source": "The Gospel According to St. Luke 10:7, Authorized (King James) Version (1611); Wikisource.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Luke"
      },
      {
        "category": "artistic",
        "title": "Robert Koehler's 'The Strike' freezes the charged instant of confrontation between massed workers and the owner on his steps — precisely the rupture that Ford and Unifor, in reaching a tentative deal, have stepped back from.",
        "excerpt": "Painted in 1886, a year of industrial upheaval on both sides of the Atlantic, Koehler stages the moment a factory owner is confronted by his workers — one man arguing, a woman with her children, another stooping for a stone. It was the first painting of a strike exhibited in the United States, and it dignifies the worker's grievance as high drama. The canvas holds the very tension that collective bargaining exists to resolve.",
        "source": "Robert Koehler, The Strike / Der Streik (1886), oil on canvas, 181.6 × 275.6 cm, Deutsches Historisches Museum, Berlin (acc. 1990/2920); Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Robert_Koehler_-_Der_Streik_(1886).jpg",
        "image": {
          "src": "/covers/ford-unifor-tentative-labor-deal--a4.png",
          "alt": "Oil painting of factory workers massing at the steps of the mill owner's house, one gesturing angrily in confrontation, a woman and children among them and a man crouching for a stone.",
          "credit": "Robert Koehler (1850–1917), 'The Strike' (1886), Deutsches Historisches Museum; public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "The workers' anthem 'The Internationale,' rising from the same age of industrial struggle, is the sonic backdrop to the collective bargaining that let Ford's autoworkers press their claims and avert a strike.",
        "excerpt": "Set to Pierre De Geyter's marching melody, Eugène Pottier's verses summon the world's laborers to rise and claim the wealth their own hands create. It became the hymn of organized labor across continents, sung in factory yards and union halls wherever workers gathered to bargain or to strike. Its steady cadence is the sound of collective leverage — the force that turns individual grievance into a signed contract.",
        "source": "Pierre De Geyter (music, 1888) and Eugène Pottier (words, 1871), L'Internationale; IMSLP / Petrucci Music Library.",
        "href": "https://imslp.org/wiki/L'Internationale_(De_Geyter,_Pierre)"
      }
    ],
    "rank": 12
  },
  {
    "slug": "andrew-salgado-still-life-paintings",
    "headline": "Painter Andrew Salgado unveils 'Glory!', a series of gestural still lifes, at London's BEERS gallery",
    "overview": "The Canadian-born, London-based painter Andrew Salgado has unveiled 'Glory!', a body of exuberant still-life paintings opening at BEERS London on July 16, 2026, that reinvents the centuries-old genre with thick, gestural brushwork and vivid color. Color ripples across canvases of flowers caught in states of blossom and decay, pushing the traditional bouquet toward abstraction. The series continues Salgado's move from portraiture into densely worked still life, threaded with literary and art-historical allusions.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Colossal",
        "href": "https://www.thisiscolossal.com/2026/07/andrew-salgado-flower-still-life-paintings/"
      },
      {
        "name": "Colossal (Google News)",
        "href": "https://news.google.com/rss/articles/CBMiigFBVV95cUxORlhnTk45TS1OcWp5cko5RUh6b095ZHQ5V0JqcXBtcXFqS3hKc0s5V0xjcmt2dmxLT2dDZGxUMEk2ZHZlVDg2WGc1WGlEbUtfdF8zcktNNEdRcFRzcDBrSUtSQ1RqdlN0UmNrVXpIbjd2d2FPTjgzUFBsU0xJTkNRQ3ZoOFBDbWkzY0E?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-12",
    "image": {
      "src": "/covers/andrew-salgado-still-life-paintings.png",
      "alt": "A thickly painted, colorful still life of flowers in a vase",
      "credit": "Andrew Salgado / Colossal"
    },
    "edition": "Morning Edition · 12 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Two millennia before Salgado thickened paint into blooms, Roman painters at Herculaneum were already arranging fruit and glass into freestanding still lifes, proving the genre he reinvents is among the oldest impulses in Western art.",
        "excerpt": "In the House of the Stags at Herculaneum, a first-century Roman painter set four peaches and a half-filled glass pitcher against a plain ground — one of a decorative series of xenia panels named for the Greek word for hospitality. Buried by Vesuvius in 79 CE and among the earliest known still lifes, these frescoes established the very convention Salgado now pushes toward abstraction: humble objects and produce isolated on a wall, asked to hold a viewer's whole attention.",
        "source": "Roman fresco, Still life with fruit and pitcher, House of the Stags (Casa dei Cervi), Herculaneum, 1st century CE; Museo Archeologico Nazionale di Napoli. Via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Roman_fresco_House_of_the_Stags_Herculaneum_Still_life_with_fruit_and_pitcher_1st_century_CE.jpg"
      },
      {
        "category": "historical",
        "title": "The Dutch flower specialists Salgado echoes turned a vase of blooms into a virtuoso arena, where painters like Rachel Ruysch composed impossible bouquets that, like his canvases, prize abundance and pictorial bravura over botanical fact.",
        "excerpt": "By 1710 the Dutch flower piece was a mature discipline, born in the tulip-mania decades of the earlier Golden Age and carried to its height by specialists such as Rachel Ruysch (1664–1750). Her still life gathers roses, tulips, a sunflower and other blooms in a glass vase, complete with a bee and a butterfly on a marble ledge — flowers of different seasons united in a single fictional arrangement. That tradition of the densely worked, exuberant bouquet is exactly the centuries-old genre Salgado now reinvents with gestural brushwork and vivid color.",
        "source": "Rachel Ruysch, Flower Still Life, 1710, oil on canvas, 88.9 × 71.1 cm, private collection. Via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Rachel_Ruysch_-_flower_still_life_-_1710.jpg"
      },
      {
        "category": "literary",
        "title": "Salgado's blossoming canvases carry the same carpe diem charge as Herrick's most famous lines, in which the open rose is beauty already tilting toward its own decay.",
        "excerpt": "Gather ye rosebuds while ye may,\n  Old time is still a-flying:\nAnd this same flower that smiles to-day\n  To-morrow will be dying.",
        "source": "Robert Herrick, \"To the Virgins, to Make Much of Time,\" in Hesperides (1648); The Hesperides & Noble Numbers, ed. Alfred Pollard, 1898. Via Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_Hesperides_%26_Noble_Numbers/Hesperides/To_the_Virgins,_to_Make_Much_of_Time"
      },
      {
        "category": "literary",
        "title": "Where Salgado lavishes thick color on the humble flower, the Gospel exalts the same wildflower above kings, insisting that a bloom's fleeting glory outshines all worldly splendor.",
        "excerpt": "Consider the lilies of the field, how they grow; they toil not, neither do they spin: And yet I say unto you, That even Solomon in all his glory was not arrayed like one of these.",
        "source": "Gospel of Matthew 6:28–29, King James Version (1611). Via Wikisource.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Matthew"
      },
      {
        "category": "artistic",
        "title": "Bosschaert's jewel-precise bouquet is the ancestral opposite of Salgado's loose, gestural still lifes — the same subject of blooms in a vase, but rendered with a clarity his thick brushwork now dissolves into pure color.",
        "excerpt": "Ambrosius Bosschaert the Elder assembled roses, tulips, columbine, iris and carnations in a single glass vase set in a stone window niche, each petal and dewdrop rendered with near-scientific exactitude, a tiny insect perched on a bloom. Painted around 1618 at the dawn of the Dutch flower-piece tradition, it is the pristine, tightly finished pole of the very genre Salgado reinvents by pushing the arrangement of blooms and objects toward abstraction.",
        "source": "Ambrosius Bosschaert the Elder, Vase of Flowers in a Window, c. 1618, oil on panel, 64 × 46 cm, Mauritshuis, The Hague. Via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Ambrosius_Bosschaert_de_Oude_-_Vase_of_Flowers_in_a_Window_-_679_-_Mauritshuis.jpg",
        "image": {
          "src": "/covers/andrew-salgado-still-life-paintings--a4.png",
          "alt": "A meticulously detailed bouquet of tulips, roses, iris and carnations in a glass vase set within a stone window niche, with an insect and dewdrops.",
          "credit": "Ambrosius Bosschaert the Elder, Vase of Flowers in a Window (c. 1618), Mauritshuis / Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Van Gogh's sunflowers are the truer precedent for Salgado — a flower still life built from thick, gestural strokes and saturated color, where paint and feeling matter more than botanical likeness.",
        "excerpt": "In his August 1889 Sunflowers, Van Gogh massed the blooms in a simple earthenware pot against a flat yellow ground, laying the paint on thick and visibly worked so that the flowers become fields of vibrating color rather than exact description. This is the modern lineage Salgado extends: the still life as a vehicle for gesture, texture and vivid color, the traditional bouquet pressed toward abstraction.",
        "source": "Vincent van Gogh, Sunflowers (F458), August 1889, oil on canvas, 95 × 73 cm, Van Gogh Museum, Amsterdam. Via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Vincent_van_Gogh_-_Sunflowers_-_VGM_F458.jpg",
        "image": {
          "src": "/covers/andrew-salgado-still-life-paintings--a5.png",
          "alt": "A bouquet of sunflowers in an earthenware pot against a bright yellow background, painted in thick, expressive brushstrokes.",
          "credit": "Vincent van Gogh, Sunflowers (F458, 1889), Van Gogh Museum, Amsterdam / Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 13
  },
  {
    "slug": "bangladesh-monsoon-floods-2026",
    "headline": "Monsoon floods across Bangladesh kill at least 44 and leave more than a million people stranded",
    "overview": "Days of relentless monsoon rain triggered widespread flooding across Bangladesh on July 11, 2026, killing at least 44 people and leaving more than a million stranded as swollen rivers burst their banks. Whole communities were cut off as water swept away homes, roads and crops, and rescuers used boats to reach families marooned on rooftops and embankments. Officials warned the death toll could climb as more low-lying districts went under.",
    "genre": "Climate",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMirwFBVV95cUxQa1RjbW1VQ1YtSGN4bXY1MWZrZFZEQjg1eXNuRkxfTGdHaWtiZUFJSUFSNFZObW9meXFDR3A4bFFERTB2SHozZ3lpbzJJbU5aNmFaelpIaWtLSEtHUUdlNWdHbmRvNDhRWEhPS3JSemtzbUZMSUpqVzhsRHppVW5qLWRfcVhpZkQzYVY3SE43RmU3RmJYMy1TcFVQV083Tkh5S3NFQ21QeVhXVmdraEl3?oc=5"
      },
      {
        "name": "The Economic Times",
        "href": "https://news.google.com/rss/articles/CBMi2gFBVV95cUxPcHNxMzlMVXgzYkM3Ml9ET3NzTWZPSW5kYm02anc3bjhyNExBTS1wY29CMEJhTngyNlh6dEpZYmVpemh6dVpxem1lVi1ORGVwQlc1Q3RoX1pnN1kwSEIzSzdlRHBqZHp0VUk2dnkyS211ei1pTThHOVlGbDI2LTZzNllUWnJ0eXRKbVd0cXMtdjE0cVRRRVdpQzVxRFNnUGtoT0tlYUxCTHpoUTV6aTNla0g5TnhaWDBqdW9KQlUwR19OeHZ1Njl3bTNCZ1JoNjRLQUkwVjg4bWVTd9IB3wFBVV95cUxPQ1JuN1dQX0MtLUhQaXlqVXlnSmZCcnRNSk9yT09HZnN2U0d0Z3FSVDZtVDhBNEZ2R3NITHVFUHpHZXZaWWxtOFlFWmZuTERqS3JrNU1BOXdvWm82Q2Q5Y3c4WUhZeWR6d1lqbGtWeXJzTkdTVXgtQ0lYbkNHRWI0OG1lMDJzckVid09UNkxod01UWG9IRzllREl6NXRGZmw1c1huVWlvMFVBM0VNMEVLX2RZNGxBNTZGMVdfWkVQNTMxTENleThBRUExWXpLaktjN0NFNmp6bEpwbl82NDU4?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-11",
    "image": {
      "src": "/covers/bangladesh-monsoon-floods-2026.png",
      "alt": "An aerial view of a Bangladeshi village inundated by muddy floodwater, homes and trees surrounded by water.",
      "credit": "Airman 1st Class Cheryl Sanzi (USAF), Public domain, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 11 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The flooding of the Tiber (15 CE), recorded by the Roman historian Tacitus in his Annals, saw the rain-swollen river burst over the low-lying quarters of Rome and topple buildings, just as Bangladesh's rivers have now overrun whole communities and swept homes away.",
        "excerpt": "In the same year the Tiber, swollen by continuous rains, flooded the level portions of the city. Its subsidence was followed by a destruction of buildings and of life.",
        "source": "Tacitus, Annals, Book 1, Chapter 76, trans. Alfred John Church and William Jackson Brodribb; Perseus Digital Library, Tufts University.",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.02.0078%3Abook%3D1%3Achapter%3D76"
      },
      {
        "category": "historical",
        "title": "The Johnstown Flood (1889), chronicled that same year by Willis Fletcher Johnson, drove families into their upper stories and up the surrounding hills as the waters rose, foreshadowing the rooftop rescues now unfolding across Bangladesh.",
        "excerpt": "The Conemaugh had then gotten so high that the residents of the low-lying districts had moved into upper stories. I noticed a number of wagons filled with furniture hurrying through the streets. A few families, either apprehensive of the impending calamity or driven from their houses by the rising waters, had started for the surrounding hills.",
        "source": "Willis Fletcher Johnson, History of the Johnstown Flood (Edgewood Publishing Co., 1889); Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/41271/41271-h/41271-h.htm"
      },
      {
        "category": "literary",
        "title": "The Flood of Noah in the Book of Genesis (chapter 7, King James Version, 1611) describes the waters rising until they covered the highest hills of the whole earth, an ancient image of total inundation mirrored in Bangladesh's drowned villages.",
        "excerpt": "And the waters prevailed exceedingly upon the earth; and all the high hills, that were under the whole heaven, were covered. Fifteen cubits upward did the waters prevail; and the mountains were covered.",
        "source": "Genesis 7:19-20, King James Version (1611); Wikisource.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Genesis"
      },
      {
        "category": "literary",
        "title": "The deluge of Deucalion in Ovid's Metamorphoses (Book 1, c. 8 CE, Brookes More translation) drowns the world until land and sea can no longer be told apart, echoing the endless waters now stranding more than a million Bangladeshis.",
        "excerpt": "And now one vast expanse, the land and sea were mingled in the waste of endless waves—a sea without a shore.",
        "source": "Ovid, Metamorphoses, Book 1 (the flood of Deucalion), trans. Brookes More (1922); Perseus Digital Library, Tufts University.",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0028:book=1:card=253"
      },
      {
        "category": "artistic",
        "title": "Le Deluge (1875-76), Camille Saint-Saens's oratorio on the biblical Flood, unfolds from a hushed prelude into a surging orchestral drowning of the world, a sonic counterpart to the swollen rivers now engulfing Bangladesh.",
        "excerpt": "Saint-Saens sets the biblical deluge in three parts, moving from God's wrath and the building of the ark to the receding waters and the returning dove. Its celebrated orchestral prelude, led by a solo violin over shimmering strings, builds from stillness to a full surging tide, an unmistakable musical image of waters rising to overwhelm the earth.",
        "source": "Camille Saint-Saens, Le Deluge (The Flood), oratorio, Op. 45 (1875-76), libretto by Louis Gallet; full scores at IMSLP / Petrucci Music Library.",
        "href": "https://imslp.org/wiki/Le_d%C3%A9luge,_Op.45_(Saint-Sa%C3%ABns,_Camille)"
      },
      {
        "category": "artistic",
        "title": "Une Scene de Deluge (1806) by Anne-Louis Girodet shows a family clinging to a breaking tree above the rising water, a Romantic vision of ordinary people overwhelmed by a sudden inundation that mirrors the Bangladeshi families now marooned on rooftops.",
        "excerpt": "In Girodet's vast canvas a father braces on a crumbling rock, straining to haul his wife and children upward while an aged man clutches at his back; the very branch that anchors them is already snapping. Lightning splits a black sky and a corpse drifts in the churning water below, a scene of a family engulfed by a convulsion of nature.",
        "source": "Anne-Louis Girodet de Roucy-Trioson, Une Scene de Deluge (Scene of a Deluge), oil on canvas, 1806, Musee du Louvre, Paris; via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Une_Sc%C3%A8ne_de_D%C3%A9luge_Girodet.jpg",
        "image": {
          "src": "/covers/bangladesh-monsoon-floods-2026--a5.png",
          "alt": "A family clings to a breaking tree above dark rising floodwaters; a man strains to pull up a woman and two children while carrying an old man on his back, lightning splitting the storm-black sky and a body floating in the churning water below.",
          "credit": "Anne-Louis Girodet, Une Scene de Deluge, 1806, Musee du Louvre, Paris; public domain, via Wikimedia Commons."
        }
      }
    ],
    "lead": true,
    "rank": 14
  },
  {
    "slug": "typhoon-bavi-china-landfall",
    "headline": "Typhoon Bavi makes landfall in eastern China after more than a million people are evacuated",
    "overview": "Typhoon Bavi struck China's eastern coast on July 11, 2026, driving fierce winds and torrential rain ashore after authorities evacuated more than a million people from its path. It was the second typhoon to menace the region in a week, forcing the suspension of trains, flights and ferries and the closure of ports and factories. Forecasters warned of dangerous storm surges and inland flooding as Bavi pushed deeper into the country.",
    "genre": "Climate",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMilgFBVV95cUxQUFpYaEtpZ2dWSzVtVndmRk01cTZ0aHQybGswb1c5QXd1WGtBRjIwejcwbUQ3cFJOVDV1MEpzdVQ0MGNKWWdETkVxVTRYV0ZHYVNTOEVJTktCWlQwVFJnVklJMEIwa3R0SHJDZVotNHdnRi1lbXl1dFpMcXo4eE5pV1lyeWlLWmdoeWxlX0pFRFk5QXRRMHc?oc=5"
      },
      {
        "name": "Al Jazeera",
        "href": "https://news.google.com/rss/articles/CBMirwFBVV95cUxONmhKZVUzOHhLaGZlV1JPdVp6a3NyOVpuakMwc3l3N2FPNUk4WmVvYVhUZjM1eDU1ZEJJR21rVDNYcFhvOVY2N0NLSzF5Qmxubk1PSThxeGs0dWt1TDBHUzZkUFE4QmtzcXNsZFJxY1BBSDlNNUZFcUF1MnBEczdQd3NLdEJaQzkyaFRDLUZrdzVNQVdqVVRqVy0tVFFYUFJMeGxmMWJrTENEaFpfdUR30gG0AUFVX3lxTE1RQi1nZ2F4SEdGcHJVbTBjRjdxcTFqYW9HOXNBUm8xd3V3cmZoTFJOZ2NHU2lqejd2c2lWN1FldUs2blVsa19HOUFuRUJ5OFRXU0NEa09tZEdRUGRnZDF1X1hwM1NDSXRhcEhha0RxYS1HS0JSVWhHSXczSHBHUE9JM2JsTkJGV3hoVlRwUy1vVjFuWHVLRmFzZF85RkVUbVJQanRfc0NtRUdWckZsM3hzRmRrcw?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-11",
    "image": {
      "src": "/covers/typhoon-bavi-china-landfall.png",
      "alt": "A vast spiral of white typhoon cloud swirling over the sea off the Chinese coast, seen from space.",
      "credit": "MODIS Land Rapid Response Team, NASA GSFC, Public domain, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 11 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The tempest that wrecked Kublai Khan's invasion fleet off Japan (1281), recorded by Marco Polo in The Travels, when a great north wind hurled the Great Kaan's ships onto the rocks and drowned a host of his men — the same fury of wind and sea now driving more than a million people from China's eastern coast ahead of Typhoon Bavi.",
        "excerpt": "According to Marco Polo, the Great Kaan's vast armada against Chipangu (Japan) was undone not by any enemy but by the weather: a north wind rose with tremendous force and drove the fleet against the shore until a multitude of ships were wrecked, stranding thousands of soldiers. Medieval Japan remembered such storms as the kamikaze, or 'divine wind' — the same marriage of gale and sea that now shutters ports and coastlines before Bavi's landfall.",
        "source": "Marco Polo, The Travels of Marco Polo, trans. Henry Yule, rev. Henri Cordier (3rd ed., 1903), Book Third, Chapter III: 'What Further came of the Great Kaan's Expedition against Chipangu.'",
        "href": "https://www.gutenberg.org/files/12410/12410-h/12410-h.htm"
      },
      {
        "category": "historical",
        "title": "The Great Storm of 1703, chronicled by Daniel Defoe in The Storm (1704), when Britain's fiercest recorded tempest flung bricks and tiles through the streets and no one dared leave their crumbling homes — just as Typhoon Bavi shuts down China's coastal cities and drives residents indoors and inland.",
        "excerpt": "And yet in this general Apprehension, no body durst quit their tottering Habitations; for whatever the Danger was within doors, 'twas worse without; the Bricks, Tiles, and Stones, from the Tops of the Houses, flew with such force, and so thick in the Streets, that no one thought fit to venture out, tho' their Houses were near demolish'd within.",
        "source": "Daniel Defoe, The Storm: Or, a Collection of the most Remarkable Casualties and Disasters which happen'd in the Late Dreadful Tempest, both by Sea and Land (London, 1704).",
        "href": "https://www.gutenberg.org/files/42234/42234-h/42234-h.htm"
      },
      {
        "category": "literary",
        "title": "The storm Poseidon unleashes on Odysseus in Homer's Odyssey (Book V, c. 8th century BCE), when winds from every quarter fall on his raft at once and a monstrous sea breaks his courage — an ancient mirror of the wind and surge now battering China's coast as Typhoon Bavi makes landfall.",
        "excerpt": "Thereon he gathered his clouds together, grasped his trident, stirred it round in the sea, and roused the rage of every wind that blows till earth, sea, and sky were hidden in cloud, and night sprang forth out of the heavens. Winds from East, South, North, and West fell upon him all at the same time, and a tremendous sea got up, so that Ulysses' heart began to fail him.",
        "source": "Homer, The Odyssey, Book V, trans. Samuel Butler (1900).",
        "href": "https://en.wikisource.org/wiki/The_Odyssey_(Butler)/Book_V"
      },
      {
        "category": "literary",
        "title": "The shipwreck that opens Shakespeare's The Tempest (Act I, Scene 1, c. 1611), where a roaring sea overwhelms the mariners' skill and drives them to prayer — echoing the helpless shutdown of ports, ships and flights as Typhoon Bavi strikes eastern China.",
        "excerpt": "On a ship at sea: a tempestuous noise of thunder and lightning heard.\n\nBoats. Heigh, my hearts! cheerly, cheerly, my hearts! yare, yare! Take in the topsail. Tend to the master's whistle. Blow, till thou burst thy wind, if room enough!",
        "source": "William Shakespeare, The Tempest, Act I, Scene 1 (first printed in the First Folio, 1623).",
        "href": "https://www.gutenberg.org/cache/epub/23042/pg23042.txt"
      },
      {
        "category": "artistic",
        "title": "The 'Gewitter, Sturm' (Thunderstorm) fourth movement of Beethoven's Symphony No. 6 in F major, Op. 68 ('Pastoral,' 1808), where strings and timpani erupt into a musical cloudburst of wind and rain — the orchestral counterpart to the storm surge and torrential downpour Typhoon Bavi brings to China's coast.",
        "excerpt": "In the Pastoral Symphony's fourth movement Beethoven turns the whole orchestra into weather: distant rumblings in the low strings swell into slashing violin figures, cracks of timpani thunder and a shrieking piccolo, until the tempest exhausts itself and gives way to calm. It is one of music's most vivid depictions of a sudden violent storm — the sonic mirror of the wind and rain now lashing eastern China.",
        "source": "Ludwig van Beethoven, Symphony No. 6 in F major, Op. 68 ('Pastoral'), fourth movement 'Gewitter. Sturm' (composed 1808); full score via IMSLP / Petrucci Music Library.",
        "href": "https://imslp.org/wiki/Symphony_No.6,_Op.68_(Beethoven,_Ludwig_van)"
      },
      {
        "category": "artistic",
        "title": "Ivan Aivazovsky's The Ninth Wave (1850), which shows a handful of survivors clinging to wreckage as a towering, sunlit wave rears over them — a Romantic vision of the sea's overwhelming power that matches the storm surges forecasters fear as Typhoon Bavi hits eastern China.",
        "excerpt": "Aivazovsky paints the aftermath of a night storm: shipwrecked sailors cling to a broken mast on a heaving sea as the ninth wave — in sailors' lore the deadliest — rises to engulf them, its foam glowing against a sunrise. The canvas captures both the terror and the awful beauty of wind and water turned against people, the very forces now bearing down on China's flooded coast.",
        "source": "Ivan Aivazovsky, The Ninth Wave (Девятый вал), oil on canvas, 1850; State Russian Museum, Saint Petersburg.",
        "href": "https://commons.wikimedia.org/wiki/File:Hovhannes_Aivazovsky_-_The_Ninth_Wave_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/typhoon-bavi-china-landfall--a5.png",
          "alt": "Shipwrecked sailors cling to a broken mast amid enormous waves at dawn under a glowing sky",
          "credit": "Ivan Aivazovsky, The Ninth Wave, 1850, State Russian Museum, Saint Petersburg; public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 15
  },
  {
    "slug": "nigeria-oyo-schoolchildren-freed",
    "headline": "Nigerian army frees 44 abducted schoolchildren and teachers in Oyo State",
    "overview": "Nigerian soldiers freed 44 schoolchildren and teachers who had been seized by gunmen in southwestern Oyo State, the army said on July 11, 2026, in a rescue that brought relief to anxious families. The captives were taken in a mass abduction that revived fears over Nigeria's recurring crisis of school kidnappings for ransom. The military said the hostages were recovered during a security operation.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "BBC",
        "href": "https://news.google.com/rss/articles/CBMiXEFVX3lxTE53YlhXTUpwM3Z2bDhibDBic0I1ZjFXWFJoTkRyOGpBOXdaNzFNSE5vTE1BdERtN3FWN3hQZ1Z0S01ESURyLTR3eFh0VDJhY21yaVBHNEdhb2FHX2Fx?oc=5"
      },
      {
        "name": "Premium Times Nigeria",
        "href": "https://news.google.com/rss/articles/CBMivAFBVV95cUxQUjhWLVlJQXVYZmxWRHhSV3hkbjVaSWVzSE5uMXdoWU85U3RTM2pxLWJCdDFPY19ma1dIWmV6dXJaZjhNNDNKQ1c0UzM0WmFfYkVyMDVQaTBsWjB2UVpMdml1QnNMTXdrWk1meGVPVDcwSS1FbnhWRzRORl91bEd5U2dkV29GbG1LdFZzZlp1MjdwYWxHak9tNjVueHRxM3hiMXYzZ0lEcEdiSDNUTTJMV1hGS2drVHR0Z3A1ZA?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-11",
    "image": {
      "src": "/covers/nigeria-oyo-schoolchildren-freed.png",
      "alt": "Nigerian Army soldiers in camouflage advancing across scrubland during a military field exercise.",
      "credit": "USAFRICOM from Stuttgart, Germany, CC BY 2.0, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 11 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Cyrus Cylinder (c. 539 BCE), inscribed in Akkadian cuneiform after Cyrus the Great captured Babylon and now held in the British Museum, records a conqueror who gathered up scattered captive peoples and sent them back to their homes, just as Nigerian soldiers gathered the 44 seized schoolchildren and teachers and returned them to their families in Oyo State.",
        "excerpt": "I gathered all their inhabitants and returned to them their dwellings.",
        "source": "The Cyrus Cylinder, line 32 (trans. Irving Finkel), Livius.org archive",
        "href": "https://www.livius.org/sources/content/cyrus-cylinder/cyrus-cylinder-translation/"
      },
      {
        "category": "historical",
        "title": "Operation Entebbe (July 3-4, 1976), the Israeli commando raid that stormed a hijacked Air France jet held at Uganda's Entebbe Airport, freed roughly 105 hostages in a 58-minute strike carried out a continent from home, just as Nigerian troops crossed hostile ground to recover 44 captives taken by gunmen in Oyo State.",
        "excerpt": "Nearly a hundred passengers had been held for days at a distant airport, their fate bargained over by their captors, when a rescue force arrived under cover of night and led them out to freedom. The raid cost the life of its assault commander, Lt. Col. Yonatan Netanyahu, and it fixed in memory the idea that a state will reach across borders to bring its captives home. The relief of the freed hostages and their waiting families echoes in the recovery of the abducted Oyo schoolchildren.",
        "source": "Jewish Virtual Library, 'The Entebbe Rescue Operation'",
        "href": "https://www.jewishvirtuallibrary.org/the-entebbe-rescue-operation"
      },
      {
        "category": "literary",
        "title": "The prophet's proclamation in Isaiah 61 (King James Version, 1611), vowing liberty to those held in bondage and the opening of the prison to the bound, sounds across the millennia in the freeing of Oyo's captive schoolchildren, answering their families' cry for deliverance.",
        "excerpt": "The Spirit of the Lord God is upon me; because the Lord hath anointed me to preach good tidings unto the meek; he hath sent me to bind up the brokenhearted, to proclaim liberty to the captives, and the opening of the prison to them that are bound;",
        "source": "Isaiah 61:1, King James Version (1611)",
        "href": "https://www.biblegateway.com/passage/?search=Isaiah%2061&version=KJV"
      },
      {
        "category": "literary",
        "title": "Ovid's tale of Perseus and Andromeda in the Metamorphoses (Book IV, 8 CE), in which the hero discovers a young captive chained to the sea-rock and slays the monster to loose her bonds, mirrors the deliverance of the young hostages carried off in Oyo State and set free by their rescuers.",
        "excerpt": "Released from her chains, the virgin walks along, both the reward and the cause of his labors.",
        "source": "Ovid, Metamorphoses, Book IV (trans. Henry T. Riley, 1851), Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/21765/pg21765.txt"
      },
      {
        "category": "artistic",
        "title": "The Prisoners' Chorus, 'O welche Lust,' from Beethoven's only opera Fidelio (Op. 72, 1814), in which captives emerge blinking into daylight to hymn their fleeting freedom, sounds the very release felt when 44 schoolchildren and teachers were led out of captivity in Oyo State.",
        "excerpt": "O welche Lust, in freier Luft / Den Atem leicht zu heben! / Nur hier, nur hier ist Leben, / Der Kerker eine Gruft.",
        "source": "Ludwig van Beethoven, Fidelio, Op. 72, Act I Prisoners' Chorus (libretto by J. Sonnleithner & G. F. Treitschke), IMSLP",
        "href": "https://imslp.org/wiki/Fidelio,_Op.72_(Beethoven,_Ludwig_van)"
      },
      {
        "category": "artistic",
        "title": "Peter Paul Rubens's 'Perseus Freeing Andromeda' (c. 1620-22, Gemaldegalerie, Berlin), which shows the winged hero unbinding a young woman from the rock as victory crowns him, gives painted form to the rescue of Oyo's captives, the chains struck away and the young returned to safety.",
        "excerpt": "Rubens paints the instant after the danger has passed: Perseus, still armored, gently loosens the cords that fastened Andromeda to the rock while a winged putto lifts them free and Fame reaches to crown him. The pale, delivered figure of the young captive stands at the center of the canvas, no longer a victim but a life restored. The scene distills the arc of every rescue, from seizure and helplessness to the moment bonds fall away.",
        "source": "Peter Paul Rubens, Perseus Freeing Andromeda, c. 1620-22, Gemaldegalerie, Berlin (Wikimedia Commons, public domain)",
        "href": "https://commons.wikimedia.org/wiki/File:Peter_Paul_Rubens_-_Perseus_Freeing_Andromeda_-_WGA20306.jpg",
        "image": {
          "src": "/covers/nigeria-oyo-schoolchildren-freed--a5.png",
          "alt": "Rubens painting of the winged hero Perseus unbinding Andromeda from the rock as a putto lifts her chains and a winged figure crowns him with laurel.",
          "credit": "Peter Paul Rubens, Perseus Freeing Andromeda (c. 1620-22), Gemaldegalerie, Berlin. Public domain via Wikimedia Commons."
        }
      }
    ],
    "rank": 16
  },
  {
    "slug": "nyt-air-force-one-subpoena",
    "headline": "US Justice Department subpoenas New York Times journalists over Air Force One reporting",
    "overview": "The Trump administration has subpoenaed journalists at The New York Times over their reporting about Air Force One, the newspaper said on July 11, 2026, in a step press-freedom advocates called an escalation of pressure on the media. The demand seeks information tied to coverage of the president's aircraft and drew swift condemnation from the paper, which vowed to fight it. It was the latest clash between the administration and news organizations over leaks and coverage the president has attacked.",
    "genre": "Politics",
    "sources": [
      {
        "name": "The Guardian",
        "href": "https://news.google.com/rss/articles/CBMiqAFBVV95cUxQLUZOSkNZY1ZFRUpPZVNYZFdrRW1ZcjRRc1hGSkt3VHhJZHNWVzAySzd0TVlSQ3FreWJiQTlUZlhwUzNnZ3BrQXJTeWQ3OEpVZ3p6c3lNWEFxNHItQXpXWmtSVmU5VFJ5Mkcwb25ZU2FrTlpCUDR3VExJSlI3NUQ0R0hlOG5qOGNiUGJmY250alZuekpJT1U4Z0paeGdoNHdwVEN1Z0lWeGw?oc=5"
      },
      {
        "name": "NBC News",
        "href": "https://news.google.com/rss/articles/CBMizAFBVV95cUxPekRuS3lkX1E3WFI3a2lsRVN6YmZzRE4wMEJzcHFRUXZmM0NobnVPbWt5STB1M2J2d1RnbzV6aTEwcDkzWEdEMnRteS1pRjJxWWxtRkFnX1drOGZvb0pFV003dkd4bkVtSXN6NmNrdUxvcHZjNHFNUWxCSWw0WUJYbGV4d0loZEdPWW5nRm5XamJ2NEw4d0RuYzAxckt5em1HUjFoUmduVk9YdkhrWXJBRi1rODNtcXhWZTJLY0pHTTZocWhfazR3ZG53ZTY?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-11",
    "image": {
      "src": "/covers/nyt-air-force-one-subpoena.png",
      "alt": "The blue-and-white Boeing VC-25A jet that serves as Air Force One.",
      "credit": "Mees Jansen, CC0, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 11 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The 1735 seditious-libel trial of New York printer John Peter Zenger, in which lawyer Andrew Hamilton persuaded a jury that publishing the truth about a grasping colonial governor could be no crime, just as the New York Times insists that its Air Force One reporting is journalism the government may not punish or unmask by subpoena.",
        "excerpt": "by an impartial and uncorrupt verdict, have laid a noble foundation for securing to ourselves, our posterity, and our neighbors that to which nature and the laws of our country have given us a right—the liberty—both of exposing and opposing arbitrary power (in these parts of the world, at least) by speaking and writing truth.",
        "source": "Andrew Hamilton, summation in the trial of John Peter Zenger (1735), National Constitution Center, Historic Document Library",
        "href": "https://constitutioncenter.org/the-constitution/historic-document-library/detail/andrew-hamilton-argument-in-the-zenger-trial-1735"
      },
      {
        "category": "historical",
        "title": "New York Times Co. v. United States (1971), the Pentagon Papers ruling in which Justice Hugo Black's concurrence forbade the government from gagging this very newspaper, just as the Justice Department now turns the state's power against Times reporters to force disclosure of their Air Force One sources.",
        "excerpt": "The press was to serve the governed, not the governors. The Government's power to censor the press was abolished so that the press would remain forever free to censure the Government. The press was protected so that it could bare the secrets of government and inform the people. Only a free and unrestrained press can effectively expose deception in government.",
        "source": "Justice Hugo Black, concurring opinion, New York Times Co. v. United States, 403 U.S. 713 (1971), Legal Information Institute, Cornell Law School",
        "href": "https://www.law.cornell.edu/supremecourt/text/403/713"
      },
      {
        "category": "literary",
        "title": "John Milton's Areopagitica (1644), his thunderous address to Parliament against the licensing and pre-censorship of the printing press, just as the Times vows to fight a government demand it regards as an attempt to police and chill its reporting.",
        "excerpt": "Give me the liberty to know, to utter, and to argue freely according to conscience, above all liberties.",
        "source": "John Milton, Areopagitica; A Speech for the Liberty of Unlicensed Printing (1644), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/608/608-h/608-h.htm"
      },
      {
        "category": "literary",
        "title": "Sophocles' Antigone (c. 441 BCE), whose heroine defies King Creon's edict by invoking unwritten laws that stand above any ruler's decree, just as journalists refuse a state command they hold to violate a higher duty owed to the public.",
        "excerpt": "Yes; for it was not Zeus that had published me that edict; not such are the laws set among men by the justice who dwells with the gods below; nor deemed I that thy decrees were of such force, that a mortal could override the unwritten and unfailing statutes of heaven.",
        "source": "Sophocles, Antigone (trans. R. C. Jebb), The Internet Classics Archive, MIT",
        "href": "http://classics.mit.edu/Sophocles/antigone.html"
      },
      {
        "category": "artistic",
        "title": "\"Va, pensiero,\" the Chorus of the Hebrew Slaves from Giuseppe Verdi's Nabucco (1842), the exiles' yearning hymn that a subjugated people turned into an anthem of defiance against oppression, just as press-freedom advocates rally around the Times against the administration's pressure on its journalists.",
        "excerpt": "Va, pensiero, sull'ali dorate; va, ti posa sui clivi, sui colli, ove olezzano tepide e molli l'aure dolci del suolo natal!",
        "source": "Giuseppe Verdi, Nabucco (1842), libretto by Temistocle Solera, \"Va, pensiero\" (Chorus of the Hebrew Slaves); score at IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Nabucco_(Verdi,_Giuseppe)"
      },
      {
        "category": "artistic",
        "title": "Honoré Daumier's lithograph \"Ne vous y frottez pas!!\" (Don't Meddle With It!!, 1834), showing a muscular printer standing guard over the freedom of the press as King Louis-Philippe lunges and a deposed monarch lies fallen, just as the Times braces to defend its journalists against a government subpoena.",
        "excerpt": "A defiant young printer, sleeves rolled and fists ready, plants himself before his press as the reigning king charges at him with an umbrella and a toppled Charles X sprawls on the ground. Captioned \"Ne vous y frottez pas!!\"—Don't meddle with it!—the image casts the press not as a victim but as a fighter who will not be intimidated. Daumier, jailed two years earlier for mocking the king, made the printer an unbowed symbol of liberty resisting the reach of state power.",
        "source": "Honoré Daumier, \"Ne vous y frottez pas!!\" (1834), lithograph, National Gallery of Art, Washington (Rosenwald Collection), via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Honor%C3%A9_Daumier,_Ne_vous_y_frottez_pas!!,_1834,_NGA_6131.jpg",
        "image": {
          "src": "/covers/nyt-air-force-one-subpoena--a5.png",
          "alt": "Lithograph of a muscular printer standing defiantly with fists ready before his press, while King Louis-Philippe lunges at him and the deposed Charles X lies fallen on the ground.",
          "credit": "Honoré Daumier, \"Ne vous y frottez pas!!\", 1834, lithograph. National Gallery of Art, Washington (Rosenwald Collection). Public domain (CC0), via Wikimedia Commons."
        }
      }
    ],
    "rank": 17
  },
  {
    "slug": "ro-khanna-west-bank-detained",
    "headline": "US Representative Ro Khanna says he was detained by Israeli settlers during a West Bank visit",
    "overview": "California Democrat Ro Khanna said he and a group that included journalists were detained and harassed by Israeli settlers during a visit to the occupied West Bank on July 11, 2026. Khanna said the encounter turned menacing before the group was able to leave, and he called for accountability over settler violence in the territory. Israeli police said several settlers were arrested over an attack on journalists in the area.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiugFBVV95cUxPemk1Y2lWN29BWVNsNWJNNzFZYVU2ZG94Zmt3R1VyWmVjLVBnOHdEdVFudE1sOGotX0NpTXMyUWhpN2xub2cxUDhXdmhRUURUczNPSmR4RGJPU2xjeDU5V2sxcW5MYWNfaG1ET3VXdGZiUnNnbkFDcW90Z0k5LURYWGgzeVgzNm9ESXVjOGxER3BxVXMyclRZc3dBZHVjU2xQdmxteTlzQ2hCZjhmMTYyZ1BjRm1yVUpOSkE?oc=5"
      },
      {
        "name": "CBS News",
        "href": "https://news.google.com/rss/articles/CBMidEFVX3lxTE9hcUFhaWtmRzBwVHRvakdtcjYtNjRzTTlnc2RpUm9kNTJPcnB1WEZFYlh5Tk1kaGd6ZGhrbm41c0YwRnVVLWhNekJkTkhhQjE4cFNXcS0wWWJQbFFnYnN6UHlqNUdiNjlmcWN5S0pMcGZQWnRv?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-11",
    "image": {
      "src": "/covers/ro-khanna-west-bank-detained.png",
      "alt": "Two Israeli settlements of pale, red-roofed houses spread across arid hilltops in the occupied West Bank.",
      "credit": "upyernoz from Haverford, USA, CC BY 2.0, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 11 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Persian heralds hurled into the pit and the well, recorded by Herodotus in the Histories (Book 7.133, c. 440 BCE): envoys who crossed into hostile country to demand submission were themselves seized and abused by the locals who received them, just as Rep. Ro Khanna's traveling delegation was surrounded and detained by armed settlers on the roads of the occupied West Bank.",
        "excerpt": "King Xerxes had sent no heralds either to Athens or Sparta to ask earth and water, for a reason which I will now relate. When Darius some time before sent messengers for the same purpose, they were thrown, at Athens, into the pit of punishment, at Sparta into a well, and bidden to take therefrom earth and water for themselves, and carry it to their king.",
        "source": "Herodotus, The Histories, Book 7 (Polymnia), ch. 133, trans. George Rawlinson",
        "href": "https://www.parstimes.com/history/herodotus/persian_wars/polymnia.html"
      },
      {
        "category": "historical",
        "title": "The Trent Affair (November 1861), told in Captain Charles Wilkes's own report to Secretary Gideon Welles: travelers moving under a neutral flag were stopped, boarded, and hauled off as prisoners by an armed party that judged the seizure its 'duty,' just as Rep. Ro Khanna and accompanying journalists were stopped and detained by armed settlers who took the road into their own hands.",
        "excerpt": "I have pointed out sufficient reasons to show you that my action in this case was derived from a firm conviction that it became my duty to make these parties prisoners, and to bring them to the United States.",
        "source": "Capt. Charles Wilkes to Sec. Gideon Welles, report on the seizure of Confederate commissioners Mason and Slidell, Nov. 1861 (The Rebellion Record, vol. III), House Divided Project, Dickinson College",
        "href": "https://hd.housedivided.dickinson.edu/index.php/node/38230"
      },
      {
        "category": "literary",
        "title": "The Parable of the Good Samaritan (Gospel of Luke 10:30-34, King James Version): a lone traveler on the Jerusalem-to-Jericho road is set upon, stripped, and left half-dead while others pass by on the far side, the ancient archetype of the wayfarer waylaid, echoed as Rep. Ro Khanna's party was menaced and stopped on a West Bank road.",
        "excerpt": "A certain man went down from Jerusalem to Jericho, and fell among thieves, which stripped him of his raiment, and wounded him, and departed, leaving him half dead. And by chance there came down a certain priest that way: and when he saw him, he passed by on the other side. And likewise a Levite, when he was at the place, came and looked on him, and passed by on the other side. But a certain Samaritan, as he journeyed, came where he was: and when he saw him, he had compassion on him, And went to him, and bound up his wounds, pouring in oil and wine, and set him on his own beast, and brought him to an inn, and took care of him.",
        "source": "The Gospel According to St. Luke 10:30-34, King James Version",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Luke"
      },
      {
        "category": "literary",
        "title": "Naboth's Vineyard (1 Kings 21:1-4, King James Version): a man's refusal to surrender his inherited land beside a powerful neighbor's house sets in motion his ruin and the seizure of his ground, scripture's parable of contested and coveted land, mirrored in the settler-versus-resident struggle over the West Bank soil Rep. Ro Khanna came to witness.",
        "excerpt": "And it came to pass after these things, that Naboth the Jezreelite had a vineyard, which was in Jezreel, hard by the palace of Ahab king of Samaria. And Ahab spake unto Naboth, saying, Give me thy vineyard, that I may have it for a garden of herbs, because it is near unto my house: and I will give thee for it a better vineyard than it; or, if it seem good to thee, I will give thee the worth of it in money. And Naboth said to Ahab, The Lord forbid it me, that I should give the inheritance of my fathers unto thee. And Ahab came into his house heavy and displeased because of the word which Naboth the Jezreelite had spoken to him: for he had said, I will not give thee the inheritance of my fathers.",
        "source": "The First Book of the Kings 21:1-4, King James Version",
        "href": "https://www.biblegateway.com/passage/?search=1%20Kings%2021%3A1-16&version=KJV"
      },
      {
        "category": "artistic",
        "title": "'Va, pensiero' (Chorus of the Hebrew Slaves) from Giuseppe Verdi's opera Nabucco (1842, libretto by Temistocle Solera): captives held on foreign soil send their thoughts flying home to a lost and contested homeland, a lament for banishment and disputed land that resonates with Rep. Ro Khanna's account of being detained amid the West Bank's bitter struggle over territory.",
        "excerpt": "Va, pensiero, sull'ali dorate;\nva, ti posa sui clivi, sui colli,\nove olezzano tepide e molli\nl'aure dolci del suolo natal!",
        "source": "Giuseppe Verdi, Nabucco (1842), Part III, 'Va, pensiero, sull'ali dorate'; libretto by Temistocle Solera",
        "href": "https://imslp.org/wiki/Nabucco_(Verdi,_Giuseppe)"
      },
      {
        "category": "artistic",
        "title": "'The Good Samaritan (after Delacroix)' by Vincent van Gogh (1890, Kroller-Muller Museum): in swirling blues and golds a rescuer hoists a robbed, wounded traveler onto his horse on a lonely road while indifferent figures recede into the distance, a canvas of the wayfarer waylaid that mirrors Rep. Ro Khanna's account of a traveler menaced and detained on a West Bank road.",
        "excerpt": "In turbulent, spiraling brushstrokes van Gogh shows a robbed and beaten traveler being lifted onto a horse by his rescuer on an empty mountain road, the victim's scattered belongings strewn across the ground as two indifferent figures walk away. Painted at the asylum in Saint-Remy after a composition by Delacroix, the scene distills the peril of the lone traveler set upon in a hostile place, the same vulnerability Rep. Ro Khanna described on the roads of the occupied West Bank.",
        "source": "Vincent van Gogh, 'The Good Samaritan (after Delacroix),' 1890, oil on canvas, Kroller-Muller Museum, Otterlo",
        "href": "https://commons.wikimedia.org/wiki/File:Vincent_van_Gogh_-_The_Good_Samaritan,_1890_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/ro-khanna-west-bank-detained--a5.png",
          "alt": "Van Gogh's The Good Samaritan (1890): a rescuer lifts a wounded, robbed traveler onto a horse on a mountain road, rendered in swirling blue and gold brushstrokes.",
          "credit": "Vincent van Gogh, The Good Samaritan (after Delacroix), 1890, Kroller-Muller Museum, Otterlo. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 18
  },
  {
    "slug": "malaysia-johor-election-barisan",
    "headline": "Malaysia's Barisan Nasional sweeps the Johor state election, setting back PM Anwar's coalition",
    "overview": "The Barisan Nasional coalition swept to a commanding win in Malaysia's Johor state election on July 11, 2026, taking the large majority of seats and dealing a setback to Prime Minister Anwar Ibrahim's Pakatan Harapan alliance. Unofficial tallies showed Barisan Nasional capturing 48 of the state's 56 seats, underscoring strains within the national unity government. The result was read as a test of Anwar's standing in a populous southern state bordering Singapore.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiuAFBVV95cUxNdlJSUjdlUjFQTUdMMDNGOWR4aXA5cVlhWVBtSmdSTzFiaHhhdFFabnVlWXdUd25JdTNQb3NWcW1ndVRIS0JlSmRYUUNsMHpJRmtQQU50cTdvVV95SVpjcE05cjU1UEcxMDZ2YXU4T09zZklXMTdIRVpRWC1HcHlUR1FtNG9maWVaQjFNMU5LQk5YMDBRSmtpZWFMbkpVYThULS1HUDhXYmt4eS1yZmlXSGF6ZHBobTA3?oc=5"
      },
      {
        "name": "CNA",
        "href": "https://news.google.com/rss/articles/CBMilAFBVV95cUxNN2lDYlF4UkVMWnctRWpvME1yZ1lZX29rcWR1c0R1NzdvdzNrNWZ6VmZSRWZGelVRaHBTak9DRjZDNEFrSWFBX3FBSk9mTDNOdWJlRFNVUTlUWFBVS28xUXpRaXRfY1FjWXJYNDlVWlFJcWUtUXlmZVl2eC0tdkJ3WVIyNnBORzNPdVUzRzd4bk5vaWJX?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-11",
    "image": {
      "src": "/covers/malaysia-johor-election-barisan.png",
      "alt": "A hand dropping a folded paper ballot into a sealed ballot box at a polling station.",
      "credit": "W.carter, CC BY-SA 4.0, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 11 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The ostracism of Aristides 'the Just' (c. 482 BCE), recorded by Plutarch in his Life of Aristides, shows an Athenian public abruptly banishing a trusted leader out of sheer weariness with him, just as Johor's voters swept aside Anwar's Pakatan Harapan and restored the old Barisan Nasional to power.",
        "excerpt": "An illiterate clownish fellow, giving Aristides his sherd, supposing him a common citizen, begged him to write Aristides upon it; and he being surprised and asking if Aristides had ever done him any injury, 'None at all,' said he, 'neither know I the man; but I am tired of hearing him everywhere called the just.'",
        "source": "Plutarch, Life of Aristides, ch. 7 (Dryden translation), The Internet Classics Archive (MIT)",
        "href": "http://classics.mit.edu/Plutarch/aristide.html"
      },
      {
        "category": "historical",
        "title": "The Restoration of Charles II (29 May 1660), described by eyewitness John Evelyn in his diary, captures a nation swinging jubilantly back to a monarchy it had overthrown, just as Johor's electorate returned the long-dominant Barisan Nasional to power at Anwar's expense.",
        "excerpt": "29th May, 1660. This day, his Majesty, Charles II. came to London, after a sad and long exile and calamitous suffering both of the King and Church, being seventeen years. This was also his birthday, and with a triumph of above 20,000 horse and foot, brandishing their swords, and shouting with inexpressible joy; the ways strewn with flowers, the bells ringing, the streets hung with tapestry, fountains running with wine; the Mayor, Aldermen, and all the companies, in their liveries, chains of gold, and banners; Lords and Nobles, clad in cloth of silver, gold, and velvet; the windows and balconies, all set with ladies; trumpets, music, and myriads of people flocking, even so far as from Rochester, so as they were seven hours in passing the city, even from two in the afternoon till nine at night. I stood in the Strand and beheld it, and blessed God. And all this was done without one drop of blood shed, and by that very army which rebelled against him: but it was the Lord's doing, for such a restoration was never mentioned in any history, ancient or modern, since the return of the Jews from their Babylonish captivity; nor so joyful a day and so bright ever seen in this nation, this happening when to expect or effect it was past all human policy.",
        "source": "John Evelyn, The Diary of John Evelyn (Vol. 1), entry for 29 May 1660 (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/41218/41218-h/41218-h.htm"
      },
      {
        "category": "literary",
        "title": "Shakespeare's Coriolanus (c. 1608), in which the plebeians grant and then revoke their 'voices,' anatomizes the fickle, many-headed crowd whose judgment scatters to every point of the compass, just as Johor's voters withdrew their favour from Anwar's coalition and handed the day to Barisan Nasional.",
        "excerpt": "We have been called so of many; not that our heads are some brown, some black, some auburn, some bald, but that our wits are so diversely coloured: and truly I think if all our wits were to issue out of one skull, they would fly east, west, north, south, and their consent of one direct way should be at once to all the points o' the compass.",
        "source": "William Shakespeare, Coriolanus, Act 2, Scene 3 (Third Citizen), The Complete Works of William Shakespeare (MIT)",
        "href": "http://shakespeare.mit.edu/coriolanus/coriolanus.2.3.html"
      },
      {
        "category": "literary",
        "title": "Boethius's Consolation of Philosophy (c. 524 CE), in which Lady Fortune defends her ever-turning wheel and delights to bring the high low, gives voice to the caprice that topples the mighty, just as the wheel turned on Anwar's Pakatan Harapan and lifted Barisan Nasional back to power in Johor.",
        "excerpt": "This is my art, this the game I never cease to play. I turn the wheel that spins. I delight to see the high come down and the low ascend. Mount up, if thou wilt, but only on condition that thou wilt not think it a hardship to come down when the rules of my game require it.",
        "source": "Boethius, The Consolation of Philosophy, Book II, Prose 2 (trans. H. R. James, 1897), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/14328/14328-h/14328-h.htm"
      },
      {
        "category": "artistic",
        "title": "'Fortuna desperata' (c. 1470s), a Renaissance chanson on 'desperate, unjust and accursed' Fortune long attributed to Antoine Busnois, sings of a fate that casts down whatever it once raised, just as fortune's wheel turned against Anwar's coalition in the Johor result.",
        "excerpt": "One of the most widely reworked songs of the fifteenth century, this three-voice chanson laments 'Fortuna desperata, iniqua e maledecta'—desperate, unjust and accursed Fortune—who lifts men high only to hurl them down. Its melody became a musical emblem of fate's indifference to the powerful, borrowed by Josquin, Isaac, Senfl and dozens of other composers. That brooding lament over reversed fortune mirrors the sudden turn that stripped Anwar's Pakatan Harapan of its Johor stronghold.",
        "source": "'Fortuna desperata' (attrib. Antoine Busnois), c. 1470s, IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Fortuna_desperata_(Busnois,_Antoine)"
      },
      {
        "category": "artistic",
        "title": "The Rota Fortunae (Wheel of Fortune) illumination from the Codex Buranus (c. 1230), which crowns one king at its summit even as another tumbles crownless from it, is the medieval emblem of political rise and fall, just as Johor's ballot spun Anwar's coalition down and Barisan Nasional back up.",
        "excerpt": "At the hub sits crowned Fortune turning her wheel, ringed by four kings whose Latin mottoes trace the arc of power: 'Regnabo' (I shall reign) as one climbs, 'Regno' (I reign) enthroned at the summit, 'Regnavi' (I have reigned) as a third topples, and 'Sum sine regno' (I am without a kingdom) at the bottom. The image distils the whole cycle of political ascent and collapse into a single revolution of the wheel.",
        "source": "Rota Fortunae, Codex Buranus (Carmina Burana), c. 1230, Bayerische Staatsbibliothek, Munich (Clm 4660, fol. 1r), via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:CarminaBurana_wheel.jpg",
        "image": {
          "src": "/covers/malaysia-johor-election-barisan--a5.png",
          "alt": "Medieval manuscript illumination of the Wheel of Fortune: crowned Fortune at the center turns a wheel bearing four kings who rise to and fall from the top.",
          "credit": "Codex Buranus (Carmina Burana), c. 1230, Bayerische Staatsbibliothek Munich (Clm 4660, fol. 1r). Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 19
  },
  {
    "slug": "havana-syndrome-first-payments",
    "headline": "US makes first payments to 'Havana Syndrome' victims, totaling nearly $3 million",
    "overview": "The United States issued its first compensation payments to victims of 'Havana Syndrome,' disbursing nearly $3 million to personnel afflicted by the mysterious cluster of ailments, officials said on July 11, 2026. The payments, made under a law authorizing support for those with the brain injuries, mark a milestone after years in which diplomats and spies reported headaches, dizziness and cognitive problems. The cause of the syndrome, first reported in Havana, remains officially unexplained.",
    "genre": "Science",
    "sources": [
      {
        "name": "BBC",
        "href": "https://news.google.com/rss/articles/CBMiXEFVX3lxTE9heS11Qm9INGNSRi05THIzclRtaHc3bG9zS1pid2hUMEk1Yjh3UUNQR2t6dmVFZXBkYnNvSVpRZngzZUJtR29zV1dzZVBTV3pXd2JKb0tIUkZieUVq?oc=5"
      },
      {
        "name": "The Defense Post",
        "href": "https://news.google.com/rss/articles/CBMid0FVX3lxTE0yZUROdVRSWklkU2RNQXh1Sno3Y1QxSjVZRFd6R3JqN1pPelBSLVI1THN3UC1CWElkbndnUFF2bXlrSS13TmpFWVRrV3kycXJuclF5aVpCdkw1NWh6M2RKOW9KdmRuMXc3cS16dWFxM2p1eE1YR2FB0gF3QVVfeXFMTTJlRE51VFJaSWRTZE1BeHVKejdjVDFKNVlEV3pHcmo3Wk96UFItUjVMc3dQLUJYSWRud2dQUXZteWtJLXdOakVZVGtXeTJxcm5yUXlpWkJ2TDU1aHozZEo5b0p2ZG4xdzdxLXp1YXEzanV4TVhHYUE?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-11",
    "image": {
      "src": "/covers/havana-syndrome-first-payments.png",
      "alt": "A black-and-white sagittal MRI scan showing a human brain in profile inside the skull.",
      "credit": "Raymond F Sekula Jr, Peter J Jannetta, Kenneth F Casey, Edward M Marchan, L Kathleen Sekula and Christine S McCrady, CC BY 2.0, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 11 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Plague of Athens (430 BCE), recorded by the historian Thucydides in his History of the Peloponnesian War, struck down a whole population with a malady that baffled every physician and defied all explanation of its origin — just as the cause of 'Havana Syndrome' remains officially unknown even as its stricken victims are finally compensated.",
        "excerpt": "Neither were the physicians at first of any service, ignorant as they were of the proper way to treat it... the body was not very hot to the touch, nor pale in its appearance, but reddish, livid, and breaking out into small pustules and ulcers.",
        "source": "Thucydides, History of the Peloponnesian War, Book 2.47-49 (Crawley translation), Wikisource",
        "href": "https://en.wikisource.org/wiki/History_of_the_Peloponnesian_War/Book_2"
      },
      {
        "category": "historical",
        "title": "The English 'sweating sickness' (1485-1551), chronicled by the physician John Caius in A Boke or Counseill Against the Disease Commonly Called the Sweate (1552), was a sudden invisible affliction that killed within hours and whose cause has never been identified to this day — mirroring the way 'Havana Syndrome' strikes without warning and remains medically unexplained.",
        "excerpt": "immediatly killed some in opening theire windowes, some in plaieng with children in their strete dores, some in one hour, many in two it destroyed... As it founde them so it toke them, some in sleape some in wake, some in mirthe some in care, some fasting & some ful.",
        "source": "John Caius, A Boke or Counseill Against the Disease Commonly Called the Sweate, or Sweatyng Sicknesse (1552), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/33503/33503-h/33503-h.htm"
      },
      {
        "category": "literary",
        "title": "Sophocles' Oedipus the King (c. 429 BCE) opens as the Priest of Zeus begs the king to lift a mysterious pestilence blighting the crops, the herds, and the bodies of Thebes with no visible source — just as the unexplained cluster of ailments known as 'Havana Syndrome' has quietly struck down US personnel from an origin no one can name.",
        "excerpt": "For the city, as thou thyself seest, is now too sorely vexed, and can no more lift her head from beneath the angry waves of death; a blight is on her in the fruitful blossoms of the land, in the herds among the pastures, in the barren pangs of women; and withal the flaming god, the malign plague, hath swooped on us, and ravages the town; by whom the house of Cadmus is made waste, but dark Hades rich in groans and tears.",
        "source": "Sophocles, Oedipus the King, trans. Richard C. Jebb (1917), Wikisource",
        "href": "https://en.wikisource.org/wiki/Tragedies_of_Sophocles_(Jebb_1917)/Oedipus_the_King"
      },
      {
        "category": "literary",
        "title": "Edgar Allan Poe's 'The Masque of the Red Death' (1842) imagines a pestilence that seizes its victims with sharp pains and sudden dizziness before dissolving them within the hour — an eerie mirror of the headaches, dizziness, and cognitive fog that came to define 'Havana Syndrome.'",
        "excerpt": "The \"Red Death\" had long devastated the country. No pestilence had ever been so fatal, or so hideous. Blood was its Avatar and its seal—the redness and the horror of blood... There were sharp pains, and sudden dizziness, and then profuse bleeding at the pores, with dissolution.",
        "source": "Edgar Allan Poe, The Masque of the Red Death (1842), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/1064/1064-h/1064-h.htm"
      },
      {
        "category": "artistic",
        "title": "Camille Saint-Saens' symphonic poem Danse Macabre, Op. 40 (1874), conjures Death as a solo violinist summoning the dead to dance until the cock crows at dawn — a musical vision of an unseen force that strikes indiscriminately, like the invisible malady behind 'Havana Syndrome.'",
        "excerpt": "In this 1874 tone poem Death tunes a spectral violin at midnight and leads skeletons in a whirling dance, the rattle of dry bones evoked by a xylophone before the music scatters at daybreak. The affliction arrives from nowhere, touches everyone in its reach, and vanishes without leaving its cause behind - an apt echo of a mysterious ailment whose source no investigation has pinned down.",
        "source": "Camille Saint-Saens, Danse macabre, Op. 40 (1874), IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Danse_macabre,_Op.40_(Saint-Sa%C3%ABns,_Camille)"
      },
      {
        "category": "artistic",
        "title": "Arnold Boecklin's The Plague (Die Pest, 1898) depicts Death astride a winged dragon sweeping unseen down a medieval street, felling townspeople as it passes — a haunting image of an invisible affliction that mirrors the unexplained cluster of ailments now called 'Havana Syndrome.'",
        "excerpt": "Boecklin's tempera panel shows a skeletal figure of Death riding a bat-winged beast low through a narrow town, scattering the living as it goes; the victims collapse in the foreground while the source of their ruin hovers just above them, seen yet unstoppable. Painted as Europe still feared unseen contagion, it captures the terror of a malady that arrives from the air itself - much as 'Havana Syndrome' has struck without any identifiable cause.",
        "source": "Arnold Boecklin, Die Pest (The Plague), 1898, Kunstmuseum Basel - via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Arnold_B%C3%B6cklin_-_Die_Pest.jpg",
        "image": {
          "src": "/covers/havana-syndrome-first-payments--a5.png",
          "alt": "Arnold Boecklin's 1898 painting 'The Plague': a skeletal Death rides a winged dragon down a medieval street, felling townspeople as it passes.",
          "credit": "Arnold Boecklin, Die Pest (1898), tempera on fir wood, Kunstmuseum Basel. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 20
  },
  {
    "slug": "meta-teen-addiction-verdict-appeal",
    "headline": "Meta appeals landmark jury verdict that found it liable for teen social-media addiction",
    "overview": "Meta has appealed a landmark jury verdict that found the company partly to blame for social-media addiction among young users, it said on July 11, 2026. The verdict, one of the first of its kind, held that Meta's platforms were designed in ways that harmed minors and opened the door to further liability claims. Meta argued the decision was wrongly decided and vowed to challenge it, as scrutiny of social media's effect on children intensifies.",
    "genre": "Technology",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMipAFBVV95cUxNT2UwWExOZ3pyRVhrMUF3a1lsU3ZLOV9aOUdtdWpjLThKSmFMTGJxXzM3VlhsV0NSTlhlVlRNY3RHVjVJcUN2THlKZ2ZQdkU4WnNBWFBVWnA3ekJ4ekFoTVBuTVdOZlVwaVE5XzBCdEQyMVd1LS0xcG0xN0NOc2lJU3hEZ3VRMW1JX0pfa2hPcHB0Z0dMYlR2c2ZKbEI0T0ZRdEtzMQ?oc=5"
      },
      {
        "name": "Newser",
        "href": "https://news.google.com/rss/articles/CBMi_gFBVV95cUxOM25nd1l3RENyS1VSNkIwc20tZ3ZHV1ZWVjZjTWc4c0JxUkcxLVEzV2xGMjBKMXV3aDNxbkcyekltYjVHUG4tV1pOZjl4aDlvZThBRWM2WTNGcXZHVmFhRFdqa1dhVVlOV2NIcndfUmdEWFBwZU9wbkszMWFyREo5ZXloaFc5SEo0cnZhZ3RFemptc05oVWhueHRmaWdocFR3dGQ3UTJlVDV5Z05WWXlGMUoxaGZVRjc0dndJLVBRbmVIOUtWcXpUQi1YYW9KQzhrMTFkWWZfLTBhaUhoTXh4MFFoekUwUndwSVVqYTJpTjJGZ1V3bjJwZjV0R28tdw?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-11",
    "image": {
      "src": "/covers/meta-teen-addiction-verdict-appeal.png",
      "alt": "A hand holding a smartphone with its screen glowing in a dim room.",
      "credit": "Mictlancihuatl, CC BY-SA 4.0, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 11 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Commissioner Lin Zexu's Letter of Advice to Queen Victoria (1839), an appeal against the British opium trade in China, mirrors the Meta verdict just as Lin denounced foreign merchants who grew rich pushing an addictive drug on a people they would not touch themselves, so a jury has now faulted a maker for designing a product that ensnares the young while the makers guard their own children from it.",
        "excerpt": "Writing on behalf of the Qing court on the eve of the First Opium War, Lin Zexu confronts the sellers of an addictive poison who reap profit abroad while inflicting ruin they would never accept at home. He asks by what right foreigners may injure the Chinese people with a drug forbidden in their own lands, and warns that those who profit themselves while disregarding harm to others are tolerated by neither heaven nor humankind.",
        "source": "Lin Zexu, Letter of Advice to Queen Victoria (1839), Harvard University archive of primary sources on the opium trade",
        "href": "https://cyber.harvard.edu/ChinaDragon/lin_xexu.html"
      },
      {
        "category": "historical",
        "title": "The Tobacco Master Settlement Agreement (November 1998), struck between 46 state attorneys general and America's largest cigarette makers, mirrors the Meta verdict just as that landmark reckoning held an industry answerable for a compulsively addictive product and barred it from targeting the young, so today a jury has held a social-media maker liable for a design built to hook minors.",
        "excerpt": "The 1998 accord forced seven tobacco companies to pay states an estimated $206 billion, to bankroll anti-smoking campaigns, and to release long-hidden industry documents. Crucially, it prohibited the direct or indirect targeting of youth in advertising and promotion and banned the cartoons, sponsorships, and giveaways that lured minors, treating a firm's cultivation of young users as itself a harm the law would punish.",
        "source": "California Attorney General, 1998 Tobacco Master Settlement Agreement (official state archive)",
        "href": "https://oag.ca.gov/tobacco/msa"
      },
      {
        "category": "literary",
        "title": "The Lotus-Eaters in Homer's Odyssey, Book IX (Samuel Butler translation, 1900), where a sweet fruit erases all desire to go home, mirrors the Meta case just as Odysseus must drag his craving crewmen back to the ship, so a jury weighed a design engineered to keep the young endlessly consuming and forgetful of the world beyond the feed.",
        "excerpt": "They started at once, and went about among the Lotus-eaters, who did them no hurt, but gave them to eat of the lotus, which was so delicious that those who ate of it left off caring about home, and did not even want to go back and say what had happened to them, but were for staying and munching lotus with the Lotus-eaters without thinking further of their return",
        "source": "Homer, The Odyssey, Book IX, trans. Samuel Butler (1900), Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Odyssey_(Butler)/Book_IX"
      },
      {
        "category": "literary",
        "title": "The temptation in the Garden, Genesis chapter 3 (King James Version, 1611), where a fruit \"pleasant to the eyes\" and promising to \"make one wise\" is offered by a subtle serpent, mirrors the Meta case just as the allure is engineered to overpower restraint, so a jury judged a platform crafted to be irresistibly desirable to the young.",
        "excerpt": "Now the serpent was more subtil than any beast of the field which the LORD God had made. And he said unto the woman, Yea, hath God said, Ye shall not eat of every tree of the garden? And the woman said unto the serpent, We may eat of the fruit of the trees of the garden: But of the fruit of the tree which is in the midst of the garden, God hath said, Ye shall not eat of it, neither shall ye touch it, lest ye die. And the serpent said unto the woman, Ye shall not surely die: For God doth know that in the day ye eat thereof, then your eyes shall be opened, and ye shall be as gods, knowing good and evil. And when the woman saw that the tree was good for food, and that it was pleasant to the eyes, and a tree to be desired to make one wise, she took of the fruit thereof, and did eat, and gave also unto her husband with her; and he did eat.",
        "source": "Genesis 3:1-6, King James Version (1611), eBible.org",
        "href": "https://ebible.org/kjv/GEN03.htm"
      },
      {
        "category": "artistic",
        "title": "Richard Wagner's opera Tannhauser, WWV 70 (Dresden version 1845), whose Venusberg music conjures an enchanted realm of endless sensual pleasure that holds its captive in thrall, mirrors the Meta case just as the knight cannot free himself from the goddess's seductive grotto, so a jury confronted a platform designed to keep young minds compulsively enthralled.",
        "excerpt": "In the Venusberg and its Bacchanale that open the opera, Wagner's surging, chromatic orchestral writing embodies a paradise of intoxicating delight from which the hero Tannhauser struggles in vain to escape. The music makes audible a seductive compulsion, beautiful and engulfing, that dissolves the will to leave, a fitting emblem for an alluring design that ensnares the young.",
        "source": "Richard Wagner, Tannhauser, WWV 70 (1845), full scores at IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Tannh%C3%A4user,_WWV_70_(Wagner,_Richard)"
      },
      {
        "category": "artistic",
        "title": "John William Waterhouse's \"Circe Offering the Cup to Odysseus\" (1891), in which the enchantress holds out a beautiful goblet of potion that will transform the men who drink it, mirrors the Meta case just as Circe's alluring cup masks its power to reduce its victims to swine, so a jury judged a seductive product designed to captivate and diminish the young who consume it.",
        "excerpt": "Waterhouse depicts Circe enthroned, extending a raised cup with imperious allure while behind her a mirror reflects the approaching Odysseus. The painting distills the theme of the enchanting draught: a thing of beauty offered as pleasure that is in truth a snare, transforming those who accept it. It stands as a haunting image of seductive compulsion and the maker who dispenses it.",
        "source": "John William Waterhouse, Circe Offering the Cup to Odysseus (1891), Gallery Oldham; via Wikimedia Commons (public domain)",
        "href": "https://commons.wikimedia.org/wiki/File:Circe_Offering_the_Cup_to_Odysseus.jpg",
        "image": {
          "src": "/covers/meta-teen-addiction-verdict-appeal--a5.png",
          "alt": "Painting of the enchantress Circe seated on a throne, holding out a cup of potion, with Odysseus reflected in a mirror behind her",
          "credit": "John William Waterhouse, Circe Offering the Cup to Odysseus (1891), Gallery Oldham. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 21
  },
  {
    "slug": "nyc-subscription-traps-ban",
    "headline": "New York City announces 'click-to-cancel' rules to ban subscription traps and junk fees",
    "overview": "New York City unveiled first-of-their-kind consumer-protection rules on July 11, 2026 that would ban 'subscription traps' and require companies to make canceling a service as easy as signing up. Mayor Zohran Mamdani's administration said the 'click-to-cancel' measures also target hidden junk fees that lock consumers into recurring charges. The rules follow a broader push by regulators against deceptive 'dark pattern' designs that make subscriptions hard to escape.",
    "genre": "Technology",
    "sources": [
      {
        "name": "The Straits Times",
        "href": "https://news.google.com/rss/articles/CBMiuwFBVV95cUxPV1pjLUFZdlhTYXFhNkMtNUpPRGpOeVg5eDNzUHQ3eVZQUGw2ei1tSlFhQWh0OTByUy1PVjkzbFBqY0NkOGVUV2VVbTl1em1ZVngyb0tPNVQxTEpSaDhxZjdfdUZLbkJ1Y012dnhLV1hBWGRBN3o5ZC13Y2tTbE5BNUdMS2EtTFJqT2RCUlp3aEhuYWlvV1Z0bUU3ZW1zeDU5TWRfQk1fRGZsSDYyZHNiMm9qdTRDTWp4Z2o0?oc=5"
      },
      {
        "name": "NYC.gov",
        "href": "https://news.google.com/rss/articles/CBMisAFBVV95cUxNYUJFZ2NLalYyaF95MXFpRFVvTGdWOTc1cVZiQjByR0J6TnFocV84YzNKN2tQbUd0X2Y1NkZIMGFXWlp5b09ST3dXSTVpa3I0NFJTTnBCWXNfUHo2RUlreFNLMVhXWFY1REV1VjVZNldpZ0dwMHdxQWxPQlQ0ZTlVSk9YRUFoXzRaSkUtRTZ0UGVZdmR5THo2LVZjRmxBNDZmRUU5NnJJdjRNR0N1WldmVg?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-11",
    "image": {
      "src": "/covers/nyc-subscription-traps-ban.png",
      "alt": "A hand holding a smartphone whose screen is filled with a grid of app icons.",
      "credit": "Elexfedi, CC BY-SA 4.0, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 11 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Plutarch's 'Life of Solon' (c. 100 CE) records the seisachtheia of 594 BCE, in which Solon cancelled crushing debts and forbade lending on a borrower's own body, the original 'shaking off of burdens' that freed Athenians ensnared into bondage, just as New York's click-to-cancel rule frees consumers snared by services they cannot escape.",
        "excerpt": "For the first of his public measures was an enactment that existing debts should be remitted, and that in future no one should lend money on the person of a borrower.",
        "source": "Plutarch, Life of Solon 15 (Bernadotte Perrin translation), Perseus Digital Library, Tufts University",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:2008.01.0063:chapter=15"
      },
      {
        "category": "historical",
        "title": "The Truth in Lending Act (1968), codified at 15 U.S.C. 1601, demanded 'meaningful disclosure of credit terms' so borrowers could no longer be trapped by hidden costs, a twentieth-century consumer-protection landmark that, like New York's ban on hidden junk fees, drags the fine print into the light.",
        "excerpt": "It is the purpose of this subchapter to assure a meaningful disclosure of credit terms so that the consumer will be able to compare more readily the various credit terms available to him and avoid the uninformed use of credit, and to protect the consumer against inaccurate and unfair credit billing and credit card practices.",
        "source": "Truth in Lending Act, 15 U.S.C. Section 1601(a), Legal Information Institute, Cornell Law School",
        "href": "https://www.law.cornell.edu/uscode/text/15/1601"
      },
      {
        "category": "literary",
        "title": "Psalm 124 in the King James Bible (1611) cries that the soul is 'escaped as a bird out of the snare of the fowlers,' the ancient image of the sprung trap that New York's rule now enacts for consumers caught in a subscription they cannot cancel.",
        "excerpt": "Blessed be the LORD, who hath not given us as a prey to their teeth. Our soul is escaped as a bird out of the snare of the fowlers: the snare is broken, and we are escaped. Our help is in the name of the LORD, who made heaven and earth.",
        "source": "Psalm 124:6-8, King James Version (1611), Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Psalms"
      },
      {
        "category": "literary",
        "title": "Christopher Marlowe's 'The Tragical History of Doctor Faustus' (c. 1592) stages the ultimate deceptive bargain, a signed deed that is easy to enter and impossible to escape, mirroring the 'subscription traps' New York now bans by making cancellation as easy as signing up.",
        "excerpt": "I, JOHN FAUSTUS, OF WITTENBERG, DOCTOR, BY THESE PRESENTS, DO GIVE BOTH BODY AND SOUL TO LUCIFER PRINCE OF THE EAST, AND HIS MINISTER MEPHISTOPHILIS; AND FURTHERMORE GRANT UNTO THEM, THAT, FOUR-AND-TWENTY YEARS BEING EXPIRED, AND THESE ARTICLES ABOVE-WRITTEN BEING INVIOLATE, FULL POWER TO FETCH OR CARRY THE SAID JOHN FAUSTUS, BODY AND SOUL ... INTO THEIR HABITATION WHERESOEVER. BY ME, JOHN FAUSTUS.",
        "source": "Christopher Marlowe, The Tragical History of Doctor Faustus (1616 quarto), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/811/811-h/811-h.htm"
      },
      {
        "category": "artistic",
        "title": "Hector Berlioz's dramatic legend 'La damnation de Faust' (1846) sets to music the pact that damns its signer, Faust dragged to the abyss by a contract he can never undo, an operatic warning against the easy-to-sign, impossible-to-leave bargain that New York's click-to-cancel rule targets.",
        "excerpt": "Berlioz's four-part 'dramatic legend' dramatizes Faust's bargain with Mephistopheles, culminating in the terrifying 'Ride to the Abyss,' where the hero is swept to damnation as the price of the pact comes due. The full orchestral and vocal scores, published by Breitkopf und Hartel (1901) and others, are freely available in the public domain.",
        "source": "Hector Berlioz, La damnation de Faust, H. 111 (1846), full scores at the International Music Score Library Project (IMSLP)",
        "href": "https://imslp.org/wiki/La_damnation_de_Faust,_H_111_(Berlioz,_Hector)"
      },
      {
        "category": "artistic",
        "title": "Pieter Bruegel the Elder's 'Winter Landscape with a Bird Trap' (1565) hides a propped-up death-trap for unwary birds amid a serene village scene, the very picture of a snare that lures easily and kills quietly, just as New York's rule exposes the hidden 'dark pattern' traps that catch subscribers.",
        "excerpt": "In a tranquil snow-covered Flemish village, skaters glide on a frozen river while, at right, a heavy wooden door is propped on a slender stick above scattered bait. Birds gather unaware beneath it; a single pull of the hidden cord will spring the deadly trap. Bruegel sets the lethal snare beside carefree play, a quiet emblem of danger disguised as harmless invitation.",
        "source": "Pieter Bruegel the Elder, Winter Landscape with a Bird Trap (1565), Royal Museums of Fine Arts of Belgium, Brussels; Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_the_Elder_-_Winter_Landscape_with_Skaters_and_Bird_Trap_-_WGA03333.jpg",
        "image": {
          "src": "/covers/nyc-subscription-traps-ban--a5.png",
          "alt": "Snowy Flemish village where villagers skate on a frozen river while, at right, a heavy wooden door is propped on a stick as a bird trap over ground strewn with bait.",
          "credit": "Pieter Bruegel the Elder, Winter Landscape with a Bird Trap (1565), Royal Museums of Fine Arts of Belgium, Brussels. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 22
  },
  {
    "slug": "us-home-prices-record-fed-split",
    "headline": "US home prices hit a record high as Federal Reserve officials split over inflation",
    "overview": "US home prices climbed to an all-time high even as the pace of sales slowed, while Federal Reserve officials remained divided over the path of inflation, according to data and remarks reported on July 11, 2026. The record prices deepened an affordability squeeze for would-be buyers held back by elevated mortgage rates. The split among Fed policymakers underscored uncertainty over when, and how far, the central bank might cut interest rates.",
    "genre": "Economy",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMiowFBVV95cUxNYmRkSnA4a1VCa3Fpb1FiQ1ZseFd0dW5VdVMwajdWLV91MUdtb3YydktCMEdwRk5jeGo0SnhkWlgtT281NjdibVhjUko5alZ6YmZrRVIyVjBSeTYyclRYNkFKVDY1ekNqTlZlQ0tweWYxeHdfa0c3WHoxNFM5b3FEM1UzR1RNWVdsU0p2NWwyZDRDaDZiRHJpVlZVekpjVGViQXc0?oc=5"
      },
      {
        "name": "AOL News",
        "href": "https://news.google.com/rss/articles/CBMie0FVX3lxTE4tWUs3Q0ltY3cwU2J2UFQ2LVl4YzBHeTJ2U3hiRlp1bmFwWVlmblZvLTlyVTRadzdoXzlWUkZMUXVzQndMZGRjNzlvdVk3bTRlSEVBY3JTUzlRbm5yREdfLWdmbFRkVjY5ZEtoeGpoblY3NEJJNVU3NVdHUQ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-11",
    "image": {
      "src": "/covers/us-home-prices-record-fed-split.png",
      "alt": "An aerial view of a dense American suburb of near-identical houses and curving streets.",
      "credit": "David Shankbone, CC BY-SA 3.0, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 11 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Tiberius Gracchus's land speech (133 BCE), recorded by Plutarch in the Life of Tiberius Gracchus, decried a Rome where the soldiers who fought and died for Italy owned no roof of their own while the wealthy engrossed the land - just as US home prices hit a record high in July 2026 and priced ordinary buyers out of any house to call their own.",
        "excerpt": "The wild beasts that roam over Italy have every one of them a cave or lair to lurk in; but the men who fight and die for Italy enjoy the common air and light, indeed, but nothing else; houseless and homeless they wander about with their wives and children.",
        "source": "Plutarch, Life of Tiberius Gracchus 9, trans. Bernadotte Perrin (Loeb Classical Library), hosted at LacusCurtius, University of Chicago",
        "href": "https://penelope.uchicago.edu/Thayer/e/roman/texts/plutarch/lives/tiberius_gracchus*.html"
      },
      {
        "category": "historical",
        "title": "The tenement housing crisis of Gilded Age New York, documented by Jacob Riis in How the Other Half Lives (1890), exposed landlords wringing fifteen-to-thirty-percent returns from overcrowded slum rooms while the poor could barely make rent - just as record-high 2026 home prices and steep mortgage rates squeeze buyers while property owners stay secure.",
        "excerpt": "The owner was seeking a certain percentage on his outlay, and that percentage very rarely fell below fifteen per cent., and frequently exceeded thirty.",
        "source": "Jacob A. Riis, How the Other Half Lives: Studies Among the Tenements of New York (1890), Introduction (Project Gutenberg eBook 45502)",
        "href": "https://www.gutenberg.org/files/45502/45502-h/45502-h.htm"
      },
      {
        "category": "literary",
        "title": "The prophet Isaiah's cry against those who \"join house to house\" and \"lay field to field\" (Isaiah 5:8, King James Version) condemned the wealthy who engrossed all the land until the poor had no place left to stand - just as record US home prices in July 2026 leave the young shut out of any shelter of their own.",
        "excerpt": "Woe unto them that join house to house, that lay field to field, till there be no place, that they may be placed alone in the midst of the earth!",
        "source": "Isaiah 5:8, King James Version (Wikisource)",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Isaiah"
      },
      {
        "category": "literary",
        "title": "Oliver Goldsmith's poem \"The Deserted Village\" (1770) lamented a countryside \"where wealth accumulates, and men decay,\" its poor displaced so the estates of the rich could expand - just as America's all-time-high home prices in 2026 hollow out affordability for everyone but the wealthy.",
        "excerpt": "Ill fares the land, to hastening ills a prey,\nWhere wealth accumulates, and men decay:\nPrinces and lords may flourish, or may fade;\nA breath can make them, as a breath has made:\nBut a bold peasantry, their country's pride,\nWhen once destroy'd, can never be supplied.",
        "source": "Oliver Goldsmith, The Deserted Village (1770), lines 51-56 (Project Gutenberg eBook 50500)",
        "href": "https://www.gutenberg.org/files/50500/50500-h/50500-h.htm"
      },
      {
        "category": "artistic",
        "title": "Gustave Doré's wood engraving \"Over London by Rail\" (1872), from London: A Pilgrimage, crowds the poor into the packed back-yards of railway-side tenements, home stacked upon identical home - just as record-high US home prices in July 2026 wall off decent housing from all but the affluent.",
        "excerpt": "Dore's engraving looks down on a warren of soot-stained back yards where laundry lines and cramped brick terraces press hard against a railway viaduct. Row upon identical row of tiny tenement dwellings hems in the London poor, shut in by industry and want alike. It is a vision of the many packed into the little the city would allow them, while the trains of the prosperous rush past overhead.",
        "source": "Gustave Doré, \"Over London by Rail,\" from Blanchard Jerrold & Gustave Doré, London: A Pilgrimage (1872) (Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Dore_London.jpg",
        "image": {
          "src": "/covers/us-home-prices-record-fed-split--a4.png",
          "alt": "Gustave Doré's 1872 wood engraving 'Over London by Rail', looking down on the crowded back yards of railway-side London tenements with laundry strung between packed brick terraces.",
          "credit": "Gustave Doré, 'Over London by Rail,' from London: A Pilgrimage (1872). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Stephen Foster's parlor ballad \"Hard Times Come Again No More\" (1854) sings of the weary poor lingering at the cabin door while others enjoy life's pleasures - just as a record-price 2026 housing market keeps first-time buyers out in the cold.",
        "excerpt": "Foster's melancholy parlor song asks listeners to pause amid life's pleasures and count its many tears, dwelling on the weary poor who linger, unhoused and unwelcome, at the cabin door. Its aching refrain pleads that hard times might come again no more - the era's tender protest against a comfort and a home reserved for the few.",
        "source": "Stephen Foster, \"Hard Times Come Again No More\" (New York: Firth, Pond & Co., 1854) (IMSLP / Petrucci Music Library)",
        "href": "https://imslp.org/wiki/Hard_Times_Come_Again_No_More_(Foster,_Stephen)"
      }
    ],
    "rank": 23
  },
  {
    "slug": "gas-plants-ai-data-centers",
    "headline": "US utilities build new gas-fired power plants to feed AI data centers, drawing clean-energy pushback",
    "overview": "A wave of new natural-gas power plants is being planned and built across the United States to meet the surging electricity demand of artificial-intelligence data centers, according to reporting on July 11, 2026. The buildout has pitted utilities and technology companies against renewable-energy advocates, who argue solar, wind and storage could meet the load faster and more cleanly. The clash highlights how the AI boom is reshaping the power grid and complicating climate goals.",
    "genre": "Technology",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMitwFBVV95cUxONF9fd3ZnLUVCb0FDcm43Mks4UFEtTnBzUThWN3ItYjUzLWc1OGVhOFhIX3V2Tzd0UzI0UnBqNUttejRRWWRIRUtIZVBWWXB2NGJnd09QdnV4aVhCM2dfajdzSkl0c2NMWkJrdXRLYVg5V3FiVzNBWEIwTVhYczFUVEotRC03RzItYndEWjRETzZib3ZJdDRCcy1vb284bHdXSEVkdTNrZEZvdFY4ajByWGN3MUF4VDg?oc=5"
      },
      {
        "name": "Click2Houston",
        "href": "https://news.google.com/rss/articles/CBMi4AFBVV95cUxObjJvYVc2WXlRUmg0OVROemtfdFZ0eTM2TWNUNUFTa2VYMkdwTTZSWE5BRGxZRm43WGlDRmZCeXhsTWRRM01QeWw2MFNrcWRRbS1JSjdVVXpnTUczZUhFYVF6eDI2cXpkV2xadXB5MlhFMFo2R3pMd3RvRHJ1dXJPX3JUM1RxT3I2cy1nVDlxY3Iyb3RtOU1ZdTlWak1GV29YeDBNVTVzd2owX3RmUVpQbDlUSnM2NmN2MHFJeHpZMWNMTHVlX2l4T2U0VC03cnZac1VYUFRvVTA5R0tHUzJYcg?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-11",
    "image": {
      "src": "/covers/gas-plants-ai-data-centers.png",
      "alt": "The turbines, silver pipework and tall stacks of a natural-gas power plant.",
      "credit": "CC BY 3.0, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 11 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In The Coal Question (1865), the economist William Stanley Jevons crowned coal 'the factor in everything we do' and warned that a nation's appetite for cheap energy only swells the more abundantly it is fed, just as US utilities now fire up new gas plants to satisfy AI data centers' bottomless hunger for power.",
        "excerpt": "Coal in truth stands not beside, but entirely above, all other commodities. It is the material source of the energy of the country—the universal aid—the factor in everything we do. With coal almost any feat is possible or easy; without it we are thrown back into the laborious poverty of early times. With such facts familiarly before us, it can be no matter of surprise that year by year we make larger draughts upon a material of such myriad qualities—of such miraculous powers.",
        "source": "William Stanley Jevons, The Coal Question (1865), Chapter I",
        "href": "https://archive.org/details/coalquestioninqu00jevo"
      },
      {
        "category": "historical",
        "title": "The Great Smog of London (December 1952), documented by the UK Met Office, killed thousands when a cold snap drove Londoners to burn mountains of coal and a temperature inversion trapped the fumes, a grim reminder, as new US gas plants rise to power AI, that the smoke of cheap energy carries a human bill.",
        "excerpt": "For five days in December 1952, smoke from countless coal fires fused with fog to smother London beneath a lethal yellow pall so dense that traffic halted and pedestrians lost their way. Roughly 4,000 people, and likely far more, died from the poisoned air, and the catastrophe forced Britain to pass its first Clean Air Acts. It endures as an early warning that powering everyday life with abundant fossil fuel can exact a sudden and deadly public cost.",
        "source": "Met Office, 'The Great Smog of 1952' (National Meteorological Library and Archive case study)",
        "href": "https://weather.metoffice.gov.uk/learn-about/weather/case-studies/great-smog"
      },
      {
        "category": "literary",
        "title": "In Frankenstein; or, The Modern Prometheus (1818), Mary Shelley's man-made creature turns on its maker with 'You are my creator, but I am your master; obey!', much as the AI systems now conjured inside US data centers compel their makers to raise ever more power plants to feed them.",
        "excerpt": "“Slave, I before reasoned with you, but you have proved yourself unworthy of my condescension. Remember that I have power; you believe yourself miserable, but I can make you so wretched that the light of day will be hateful to you. You are my creator, but I am your master; obey!”",
        "source": "Mary Shelley, Frankenstein; or, The Modern Prometheus (1818)",
        "href": "https://www.gutenberg.org/files/84/84-h/84-h.htm"
      },
      {
        "category": "literary",
        "title": "William Blake's hymn 'And did those feet in ancient time' (1808) sets England's green hills against its 'dark Satanic Mills', the smoke-belching furnaces of a new industrial age, an image mirrored today as gas-fired plants sprout to power the insatiable AI machine.",
        "excerpt": "And did those feet in ancient time\nWalk upon England's mountains green?\nAnd was the holy Lamb of God\nOn England's pleasant pastures seen?\n\nAnd did the Countenance Divine\nShine forth upon our clouded hills?\nAnd was Jerusalem builded here\nAmong those dark Satanic mills?",
        "source": "William Blake, Preface to Milton: A Poem ('And did those feet in ancient time'), 1808",
        "href": "https://en.wikisource.org/wiki/Jerusalem_(Blake)"
      },
      {
        "category": "artistic",
        "title": "In the Nibelheim scene of Wagner's Das Rheingold (1869), eighteen offstage anvils hammer in relentless rhythm as enslaved dwarves toil at Alberich's fiery forge, an industrial din that prefigures the furnace-fed gas plants now humming to power AI.",
        "excerpt": "As the gods descend into the subterranean smithy of Nibelheim, Wagner scores a mounting clangor of tuned anvils, the sound of an entire workforce enslaved to feed a machine of greed. The relentless metallic pulse hammers raw fire and labor into gold, dramatizing an appetite for power that consumes everything beneath it. It is opera's great portrait of industry as bondage lit by forge-fire.",
        "source": "Richard Wagner, Das Rheingold, WWV 86A, Scene 3 (Nibelheim); full orchestral score, B. Schott's Söhne",
        "href": "https://imslp.org/wiki/Das_Rheingold,_WWV_86A_(Wagner,_Richard)"
      },
      {
        "category": "artistic",
        "title": "Philippe-Jacques de Loutherbourg's 'Coalbrookdale by Night' (1801) sets the Shropshire ironworks ablaze against a black sky, one of the first paintings to render industry as an infernal furnace, the very vision evoked by today's gas plants glowing to feed AI data centers.",
        "excerpt": "De Loutherbourg paints the Coalbrookdale foundry as a hellmouth: flame and molten glare erupt from the Bedlam Furnaces, staining the night sky orange while dark smoke boils overhead and tiny figures labor at the edge of the blaze. It is among the earliest works to cast the machinery of industrial power as something sublime and terrifying at once, progress lit by relentless fire.",
        "source": "Philippe-Jacques de Loutherbourg, Coalbrookdale by Night (1801), oil on canvas, Science Museum, London",
        "href": "https://commons.wikimedia.org/wiki/File:Philipp_Jakob_Loutherbourg_d._J._002.jpg",
        "image": {
          "src": "/covers/gas-plants-ai-data-centers--a5.png",
          "alt": "Coalbrookdale by Night (1801) by Philippe-Jacques de Loutherbourg: fiery furnaces glow orange beneath billowing smoke against a dark night sky.",
          "credit": "Philippe-Jacques de Loutherbourg, Coalbrookdale by Night (1801), Science Museum, London. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 24
  },
  {
    "slug": "jayden-adams-footballer-dies",
    "headline": "South Africa and World Cup midfielder Jayden Adams dies at 25",
    "overview": "Jayden Adams, a South African midfielder who played for the national team at this year's World Cup, has died at the age of 25, his club and football authorities said on July 11, 2026. Tributes poured in for the young player, who had featured for South Africa only weeks earlier, as the cause of his death was not immediately made public. South African football mourned the sudden loss of one of its rising talents.",
    "genre": "Culture",
    "sources": [
      {
        "name": "BBC",
        "href": "https://news.google.com/rss/articles/CBMiZ0FVX3lxTE9ndVgzUzNBQzR0QnFfUWs3aTc4Qy14R0JkQnlLSHNYeTQzN1laZDFrQmcwREtiQUktd0xNeWlaQkJXVW9yYVRsZWp4OHF2cDJBVjZyT3VMOHEybWV0NjVBeGMyYUpzS1E?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMipAFBVV95cUxNZ2U1YlJyWlRNSTRqUnFjR2xmQ2N6cl9fb3BTVGtyeEw5eVRYaU15X1pnR3VWaGNGR2EzNVpXMS0yS193RXdfd3d3WThURW5PNG1YYkx5amxrbzRJank1Rzk3aGFnRVRZWlFKVkM4enJaNkYzM2sxUU12VF9UUFZsM0t4Nnp0UlFyNENFSDhwTjRpVFhDSklJeWZBQTFscF92YzB3dA?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-11",
    "image": {
      "src": "/covers/jayden-adams-footballer-dies.png",
      "alt": "Rows of empty seats overlooking the quiet green pitch of a large football stadium.",
      "credit": "Alex Kinney, CC BY-SA 2.0, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 11 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Pausanias' Description of Greece (c. 175 CE) records the tomb of Ladas, the swiftest runner in the Greek world, who fell ill and died on the road home in the very hour of his Olympic triumph, just as Jayden Adams was lost only weeks after taking the field at the World Cup.",
        "excerpt": "there is the tomb of Ladas, the fastest runner of his day. He was crowned at Olympia for a victory in the long race, and falling ill, I take it, immediately after the victory he was on his way home; his death took place here, and his grave is above the highway.",
        "source": "Pausanias, Description of Greece, Book 3 (Laconia), 21.1, trans. W. H. S. Jones (Loeb Classical Library, 1918) — Wikisource",
        "href": "https://en.wikisource.org/wiki/Description_of_Greece_(Jones)/Book_3"
      },
      {
        "category": "historical",
        "title": "The death of Cameroon midfielder Marc-Vivien Foé, who collapsed on the pitch during the 2003 FIFA Confederations Cup semi-final and could not be revived, mirrors the loss of Jayden Adams — another young African international struck down suddenly at the height of his game.",
        "excerpt": "On 26 June 2003, in the 72nd minute of a Confederations Cup semi-final in Lyon, Cameroon's tireless holding midfielder Marc-Vivien Foé collapsed on the field and, despite frantic resuscitation, died at 28; the cause was later identified as an undiagnosed heart condition. A veteran of the Premier League and two World Cups, he was mourned with a state funeral, and the shock of his death reshaped cardiac screening across football.",
        "source": "Confederation of African Football (CAF) — official tribute to Marc-Vivien Foé",
        "href": "https://www.cafonline.com/afcon2025/news/remembering-marc-vivien-foe-celebrating-the-life-and-legacy-of-cameroon-star/"
      },
      {
        "category": "literary",
        "title": "A. E. Housman's 'To an Athlete Dying Young' (1896), which chairs a victorious runner home through cheering crowds only to bear him again to his grave, reads like an elegy written for Jayden Adams — the champion carried shoulder-high one season and mourned the next.",
        "excerpt": "The time you won your town the race\nWe chaired you through the market-place;\nMan and boy stood cheering by,\nAnd home we brought you shoulder-high.\n...\nSmart lad, to slip betimes away\nFrom fields where glory does not stay\nAnd early though the laurel grows\nIt withers quicker than the rose.",
        "source": "A. E. Housman, A Shropshire Lad, XIX ('To an Athlete Dying Young'), 1896 — Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/5720/pg5720.txt"
      },
      {
        "category": "literary",
        "title": "Andromache's lament over the fallen Hector in Homer's Iliad, Book XXIV (Samuel Butler's prose translation), grieves a hero cut down in his youth and the future left unfulfilled, echoing the tributes poured out for Jayden Adams, dead at 25.",
        "excerpt": "Husband, you have died young, and leave me in your house a widow; he of whom we are the ill-starred parents is still a mere child, and I fear he may not reach manhood.",
        "source": "Homer, The Iliad, Book XXIV, trans. Samuel Butler (1898) — Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Iliad_(Butler)/Book_XXIV"
      },
      {
        "category": "artistic",
        "title": "Frédéric Chopin's 'Marche funèbre' from the Piano Sonata No. 2 in B-flat minor, Op. 35 (1839), the most familiar music of mourning ever written and played at the composer's own funeral, tolls for the beloved young dead as it now might for Jayden Adams.",
        "excerpt": "Chopin's slow, tolling funeral march — its heavy, repeated chords swelling to a keening climax before a tender, song-like central trio — has accompanied the grief of nations and was sounded over Chopin's own coffin. Composed when he was himself a young man, it has become the archetypal sound of a life cut short and of mourners moving in procession behind it.",
        "source": "Frédéric Chopin, Piano Sonata No. 2 in B-flat minor, Op. 35 (III. Marche funèbre. Lento) — IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Piano_Sonata_No.2,_Op.35_(Chopin,_Fr%C3%A9d%C3%A9ric)"
      },
      {
        "category": "artistic",
        "title": "Henry Wallis's 'The Death of Chatterton' (1856), the Pre-Raphaelite image of the seventeen-year-old poet lying dead by his garret window amid the torn shreds of his verses, is an emblem of brilliant promise extinguished too soon — the same grief now voiced for Jayden Adams at 25.",
        "excerpt": "Wallis lays the boy-poet Thomas Chatterton lifeless across his narrow bed, one pale arm trailing to the floor amid the scattered fragments of his manuscripts, as a cold dawn breaks over the London rooftops beyond the open attic window. The beautiful, youthful body and the wasted genius it holds make the canvas an enduring portrait of talent lost in its first flower.",
        "source": "Henry Wallis, The Death of Chatterton (1856), Yale Center for British Art — Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Henry_Wallis_-_The_Death_of_Chatterton_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/jayden-adams-footballer-dies--a5.png",
          "alt": "Oil painting of the young poet Thomas Chatterton lying dead on a bed beside an open attic window, one arm hanging to the floor, torn papers scattered around him at dawn.",
          "credit": "Henry Wallis, The Death of Chatterton (1856), Yale Center for British Art, via Wikimedia Commons (Google Art Project). Public domain."
        }
      }
    ],
    "rank": 25
  },
  {
    "slug": "ohtani-knee-drained-all-star",
    "headline": "Dodgers star Shohei Ohtani to have his left knee drained and will miss the All-Star Game",
    "overview": "Los Angeles Dodgers two-way star Shohei Ohtani will have fluid drained from his left knee and sit out Major League Baseball's All-Star Game, the team said on July 11, 2026. The Dodgers described the problem as knee irritation and called the procedure precautionary, with Ohtani expected back soon after the break. The reigning MVP had continued to hit and pitch through the discomfort during a demanding season.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMiogFBVV95cUxNeEx6X0tieUZEdUJ2Q0hMTldjSERqSFQxeS1OSFB2Ym40bm82cVZ1a1E1RDBHbG0tYWRDY3JuajdNZ2pJb1QzaGotRXUxNFJTX3RQeExKaEhqSllObVRXc3hQNmhBMHBZX3h5YTJvWVVsY3dMWUxPOHEzOW96STVQM2xBSTlHNTAtRGJWZ2VmUUpqai1nT25EZ0RlVDg3a1NtdEE?oc=5"
      },
      {
        "name": "ABC30 Fresno",
        "href": "https://news.google.com/rss/articles/CBMijgFBVV95cUxOVk1fSDlPVjJVWXlRdnFwa1AtbXduUzE2aFVXYW1sdEdOUTNIQktVa0hhMGg2RTJ3MjFQZ2E5UFhMaDZHVHlwcmdxQV8tMFhyT3Nqb28zdmF1YVZlbl94TTY3SWFTelNBTG9ZS1FOT2VjcDhvY1NYLTlNUzFEMDhMQWR3NlF6Zm9sLUs0MUhn?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-11",
    "image": {
      "src": "/covers/ohtani-knee-drained-all-star.png",
      "alt": "An empty baseball diamond with reddish infield dirt and a green outfield under an open sky.",
      "credit": "Public domain, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 11 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Alexander the Great felled at Tarsus (333 BCE), recorded in Plutarch's 'Life of Alexander,' where the unstoppable conqueror is laid flat by a chill caught bathing in the icy Cydnus and must submit to a physician's care before resuming his campaign, just as the reigning MVP pauses to have his ailing knee treated before returning to the fight.",
        "excerpt": "It was sickness that detained him there, which some say he contracted from his fatigues, others from bathing in the river Cydnus, whose waters were exceedingly cold. ... till Philip, the Acarnanian, seeing how critical his case was, but relying on his own well-known friendship for him, resolved to try the last efforts of his art ... and when Philip came in with the potion, he took it with great cheerfulness and assurance.",
        "source": "Plutarch, 'Life of Alexander' (Dryden translation), The Internet Classics Archive",
        "href": "https://classics.mit.edu/Plutarch/alexandr.html"
      },
      {
        "category": "historical",
        "title": "Sandy Koufax's arthritic left arm (1966), chronicled by the National Baseball Hall of Fame, in which the Dodgers' peerless left-hander pitched an entire season through swelling and pain in a damaged joint that had to be drained and injected between starts, just as a Dodgers star now rests his balky left knee at the height of his powers.",
        "excerpt": "The Hall of Fame's account recalls how Koufax's left elbow, wrecked by traumatic arthritis, swelled and stiffened as he pushed through his final 1966 season on sheer will, the joint iced, drained, and shot with cortisone between outings. Team doctors warned the pain would only worsen, yet he answered with a career-best 27 wins before the damaged arm forced him to walk away at his peak. It is the archetype of the great athlete undone not by any rival but by his own body's small, stubborn breakdown.",
        "source": "'Koufax Calls It Quits,' National Baseball Hall of Fame and Museum",
        "href": "https://baseballhall.org/discover-more/stories/inside-pitch/koufax-calls-it-quits"
      },
      {
        "category": "literary",
        "title": "Sophocles' 'Philoctetes' (409 BCE), in Richard Jebb's translation, whose peerless archer is sidelined from the war by a festering, blood-draining wound in his foot and must be healed before the Greeks can win, just as the two-way champion sits out the season's showcase to let his lower-body injury be drained and mend.",
        "excerpt": "his foot all ulcerous with a gnawing sore,—when neither drink-offering nor sacrifice could be attempted by us in peace ... the plague that gnawed his flesh and drained his blood;—no one to assuage the burning flux, oozing from the ulcers of his envenomed foot",
        "source": "Sophocles, 'Philoctetes,' trans. Richard C. Jebb (1917), Wikisource",
        "href": "https://en.wikisource.org/wiki/Tragedies_of_Sophocles_(Jebb_1917)/Philoctetes"
      },
      {
        "category": "literary",
        "title": "Samson's downfall in the Book of Judges, chapter 16 (King James Version), the strongest of champions whose whole might depends on a single hidden vulnerability and collapses the instant it is touched, just as a season-defining hero is halted by one small point of bodily weakness.",
        "excerpt": "There hath not come a rasor upon mine head; for I have been a Nazarite unto God from my mother's womb: if I be shaven, then my strength will go from me. ... And she made him sleep upon her knees; and she called for a man, and she caused him to shave off the seven locks of his head; and she began to afflict him, and his strength went from him. And she said, The Philistines be upon thee, Samson. And he awoke out of his sleep, and said, I will go out as at other times before, and shake myself. And he wist not that the LORD was departed from him.",
        "source": "Judges 16:17-20, King James Version, Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Judges"
      },
      {
        "category": "artistic",
        "title": "Richard Wagner's 'Parsifal' (WWV 111, composed 1857-1882), whose wounded king Amfortas suffers from a spear-wound that will not heal and lies in agony awaiting the pure hero who can make him whole again, its music of suffering and the balm of the 'Karfreitagszauber' (Good Friday Music) mirroring the wounded warrior who must rest and be healed before he can return.",
        "excerpt": "Wagner's final sacred drama gives musical form to the wounded champion: Amfortas, guardian-king of the Grail, bears an unclosing wound and cries out under a pain no strength of his own can master. The score moves from his throbbing lament to the radiant serenity of the Good Friday Music, sound made into the promise of healing. IMSLP hosts the full public-domain orchestral scores, including the complete edition prepared by Felix Mottl for Edition Peters.",
        "source": "Richard Wagner, 'Parsifal,' WWV 111 (full scores), IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Parsifal,_WWV_111_(Wagner,_Richard)"
      },
      {
        "category": "artistic",
        "title": "Ernst Herter's marble 'Dying Achilles' (Sterbender Achill, 1884) at the Achilleion in Corfu, which shows the mightiest Greek warrior sinking down as he grasps at the arrow lodged in his heel, his one vulnerable point, a perfect emblem of the invincible hero brought low through the smallest weakness of the lower body, just as a lower-leg injury sidelines the game's dominant star.",
        "excerpt": "Herter carves the instant the unconquerable Achilles is undone: seated and slumping, sword-arm falling slack, his hand reaches down to the fatal shaft in his heel, the single spot where the greatest of warriors could be harmed. The whole heroic body strains around that one small point of ruin. It renders in stone the ancient truth that overwhelming strength can be canceled by the frailty of a single joint or limb.",
        "source": "Ernst Herter, 'Dying Achilles' (1884), Achilleion, Corfu; Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Closeup_of_Achilles_thniskon_in_Corfu_Achilleion.JPG",
        "image": {
          "src": "/covers/ohtani-knee-drained-all-star--a5.png",
          "alt": "Marble sculpture of the dying Achilles seated and slumping, reaching toward the arrow embedded in his heel, at the Achilleion palace in Corfu",
          "credit": "Ernst Herter, 'Dying Achilles' (1884), Achilleion, Corfu. Photograph by Tasoskessaris, via Wikimedia Commons (CC BY-SA)."
        }
      }
    ],
    "rank": 26
  },
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
    "rank": 27
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
    "rank": 28
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
    "rank": 29
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
    "rank": 30
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
    "rank": 31
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
    "rank": 32
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
    "rank": 33
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
    "rank": 34
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
    "rank": 35
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
    "rank": 36
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
    "rank": 37
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
    "rank": 38
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
