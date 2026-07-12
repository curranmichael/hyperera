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
    "slug": "lindsey-graham-dies",
    "headline": "US Senator Lindsey Graham, a close ally of President Trump, dies at 71 after a brief and sudden illness",
    "overview": "Lindsey Graham, the veteran South Carolina Republican and Senate power broker who became one of Washington's most prominent foreign-policy hawks and a close ally of President Trump, died on July 12, 2026 following a brief and unexpected illness, his office said. First elected to the Senate in 2002, he was a fixture of American politics for three decades and a leading voice on national security. Tributes poured in from across the political spectrum, praising his support for Ukraine, trans-Atlantic ties, and Israel.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMimgFBVV95cUxNcGhrZ2FzTUtJem9sWmVlbWNIVFdEdmw0dGNpXzZoenpMLXNIVXZGblVJOEs3MUhPU2hwQTF2cUVtU0VfWjZlOUdmc0pfQy0xWE0xYlFuaDhCY0pBcVFMU3p3dkM3ZXhlc04tdTlEOEpSMDVzWkJ4ZkFlQmVPOVM4ZjhoOVZJdHFXRDVIOUhTMDlVZDMtenEyWmxR?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cvgj25j6nmeo?at_medium=RSS&at_campaign=rss"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-12",
    "image": {
      "src": "/covers/lindsey-graham-dies.png",
      "alt": "A gray-haired man in a dark suit and blue tie stands smiling in front of an American flag for an official government portrait.",
      "credit": "Photo: Brett Flashnick, U.S. Senate Photographic Studio, official Senate portrait (113th Congress); public domain, via Wikimedia Commons"
    },
    "lead": true,
    "edition": "Afternoon Edition · 12 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Plutarch's account of the death of Pericles (5th century BC), in which Athens, having lost its foremost statesman and orator to a lingering illness, only then grasped how indispensable his steady leadership had been — a mirror of a capital suddenly bereft of a veteran power broker.",
        "excerpt": "For those who, while he lived, were oppressed by a sense of his power and felt that it kept them in obscurity, straightway on his removal made trial of other orators and popular leaders, only to be led to the confession that a character more moderate than his in its solemn dignity, and more august in its gentleness, had not been created. That objectionable power of his, which they had used to call monarchy and tyranny, seemed to them now to have been a saving bulwark of the constitution, so greatly was the state afflicted by the corruption and manifold baseness which he had kept weak and grovelling.",
        "source": "Plutarch, Life of Pericles 39, trans. Bernadotte Perrin (Loeb Classical Library, 1916).",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Plutarch/Lives/Pericles*.html"
      },
      {
        "category": "historical",
        "title": "Major-General Henry Lee's funeral oration for George Washington, delivered before Congress on December 26, 1799 — a nation stunned by the loss of its central statesman to a sudden brief illness, echoing the abrupt passing of a long-serving Washington fixture.",
        "excerpt": "The founder of our federal republic — our bulwark in war, our guide in peace, is no more. Oh that this was but questionable! Hope, the comforter of the wretched, would pour into our agonized hearts its balmy dew. But alas! there is no hope for us; our Washington is removed forever. Possessing the stoutest frame, and purest mind, he had passed nearly to his sixty-eighth year, in the enjoyment of high health, when, habituated by his care of us to neglect himself, a slight cold, disregarded, became inconvenient on Friday, oppressive on Saturday, and defying every medical interposition, before the morning of Sunday, put an end to the best of men. ... First in war — first in peace — and first in the hearts of his countrymen, he was second to none in the humble and endearing scenes of private life; pious, humane, temperate and sincere; uniform, dignified and commanding.",
        "source": "Henry Lee, \"Funeral Oration on the Death of General Washington,\" delivered at the request of Congress, Philadelphia, December 26, 1799.",
        "href": "https://en.wikisource.org/wiki/The_Father_of_His_Country"
      },
      {
        "category": "literary",
        "title": "Mark Antony's funeral oration over the body of the slain Caesar in Shakespeare's Julius Caesar (Act III, Scene ii), the archetype of public grief and eulogy for a fallen man of the state whose death reshapes the republic.",
        "excerpt": "Friends, Romans, countrymen, lend me your ears; I come to bury Caesar, not to praise him. The evil that men do lives after them, The good is oft interred with their bones; So let it be with Caesar.",
        "source": "William Shakespeare, The Tragedy of Julius Caesar, Act III, Scene ii (First Folio, 1623).",
        "href": "https://www.gutenberg.org/files/1522/1522-h/1522-h.htm"
      },
      {
        "category": "literary",
        "title": "Walt Whitman's elegy \"O Captain! My Captain!\" (1865), written to mourn the assassinated Abraham Lincoln — the classic American lament for a leader struck down at the height of his mission, the nation exulting even as its captain lies fallen.",
        "excerpt": "O Captain! my Captain! our fearful trip is done,\nThe ship has weathered every rack, the prize we sought is won,\nThe port is near, the bells I hear, the people all exulting,\nWhile follow eyes the steady keel, the vessel grim and daring;\nBut O heart! heart! heart!\nO the bleeding drops of red,\nWhere on the deck my Captain lies,\nFallen cold and dead.",
        "source": "Walt Whitman, \"O Captain! My Captain!\" (1865), in Poems That Every Child Should Know, ed. Mary E. Burt (1904).",
        "href": "https://en.wikisource.org/wiki/Poems_That_Every_Child_Should_Know/O_Captain!_My_Captain!"
      },
      {
        "category": "artistic",
        "title": "John Singleton Copley's grand history painting \"The Death of the Earl of Chatham\" (1779–81) depicts the great orator-statesman William Pitt collapsing on the floor of the House of Lords, surrounded by the assembled peers of the realm — a dramatic image of a leading parliamentary figure struck down at the very seat of power.",
        "excerpt": "Copley freezes the moment William Pitt, 1st Earl of Chatham, is felled by a fatal seizure while rising to speak in the House of Lords on April 7, 1778. The stricken statesman sinks back in his robes as his sons and rival lords rush to catch him, the entire chamber wheeling toward the falling orator. The vast canvas turns a single collapse into a portrait of a nation's political class confronting the sudden loss of one of its towering voices.",
        "source": "John Singleton Copley, The Death of the Earl of Chatham, oil on canvas, 1779–1781; Tate / National Portrait Gallery, London. Public domain, via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:The_Death_of_the_Earl_of_Chatham_by_John_Singleton_Copley.jpg",
        "image": {
          "src": "/covers/lindsey-graham-dies--a4.png",
          "alt": "A robed statesman collapses on the floor of the House of Lords, caught by fellow peers as the crowded chamber turns toward him in alarm.",
          "credit": "John Singleton Copley, The Death of the Earl of Chatham, 1779–1781; Tate / National Portrait Gallery, London; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "The \"Marcia funebre\" (second movement) of Beethoven's Symphony No. 3 in E-flat major, \"Eroica\" (1804) — a solemn funeral march conceived to mourn a fallen great man, its muffled drum-tread and grieving C-minor procession the musical embodiment of a state in public mourning.",
        "excerpt": "Beethoven set at the heart of his heroic symphony a full-scale funeral march, its slow strings imitating a muffled drum and a somber procession bearing a hero to the grave. Originally bound up with Beethoven's ideal of a great public man, the movement builds from hushed lament to a shattering climax before dissolving into broken, halting phrases of grief. It remains the archetypal orchestral music of national mourning for a fallen leader.",
        "source": "Ludwig van Beethoven, Symphony No. 3 in E-flat major, Op. 55 (\"Eroica\"), II. Marcia funebre (Adagio assai), 1804; full score via IMSLP.",
        "href": "https://imslp.org/wiki/Symphony_No.3,_Op.55_(Beethoven,_Ludwig_van)"
      }
    ],
    "rank": 1
  },
  {
    "slug": "qatar-former-emir-hamad-dies",
    "headline": "Sheikh Hamad bin Khalifa Al Thani, the former emir of Qatar who transformed the Gulf state, dies at 74",
    "overview": "Sheikh Hamad bin Khalifa Al Thani, who seized power from his father in a bloodless 1995 palace coup and turned tiny, gas-rich Qatar into an outsized global player, died on July 12, 2026 at 74, state media reported. During his reign he founded the Al Jazeera news network, hosted major US military bases, built vast sovereign wealth, and won Qatar the right to stage the football World Cup before abdicating in favour of his son in 2013. He was widely regarded as the moderniser who reshaped Qatar's wealth and its far-reaching diplomatic ambitions.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMiogFBVV95cUxNWjRDaUlZZWhZMlBnRGVNSmRGNzBoLWVGeXJEWVljdkZwNVkwcTNJT3pURUs5aXR5UkF1RzdzZDRUUWNGSnJnajlYRGptM3U1a01lUEVGRk1xT05sWjdRYjd6MFVOd0JYV3paSndLTEJkVkxwQ01UZmp1S0ZvS2ItOFlVT0xfN2dQd05DZThBVk43NldxaElUUEh4S19JdDl6WGc?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiswFBVV95cUxNa0haajRKdWJvZENRMEpjQnFRUFJ1cEptbFRKQ1B5WHN2LTlHeDNEUUc2Q1lVS2FNV25jd2cxQUx5M1UwWXB0WWppa2FLallzNnAtWnVxc1I1eGo0UGJQNmpzRUdGR2p0OVVDdmNnODFVdGtuYjM4ZllpX3V3bDBLREVtNDlPUHp4N2ZVV1JZb1JTbkFheVllMDFNMFNTSHdmSGh6bWpUN3NXcDlxWTJMa0h2RQ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-12",
    "image": {
      "src": "/covers/qatar-former-emir-hamad-dies.png",
      "alt": "A bearded man in a dark suit stands at a formal diplomatic gathering, photographed in Vienna in 2013.",
      "credit": "Photo: Dragan Tatic / Austrian Foreign Ministry, 5th Global Forum Vienna 2013, 2013; CC BY 2.0, via Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 12 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Philip II of Macedon in Diodorus Siculus — the prince who took a small, threatened kingdom and made it the greatest power in Europe, just as Hamad turned tiny Qatar into a Gulf heavyweight before handing the throne to his son",
        "excerpt": "For Philip was king over the Macedonians for twenty-four years, and having started from the most insignificant beginnings built up his kingdom to be the greatest of the dominions in Europe, and having taken over Macedonia when she was a slave to the Illyrians, made her mistress of many powerful tribes and states.",
        "source": "Diodorus Siculus, Library of History, Book XVI.1.3 (trans. C. H. Oldfather, Loeb Classical Library), 1st century BC",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Diodorus_Siculus/16A*.html"
      },
      {
        "category": "historical",
        "title": "Napoleon's Act of Abdication of 22 June 1815 — a ruler who rose by coup and remade his state, laying down power to proclaim his own son emperor, an echo of Hamad's 2013 abdication in favour of Sheikh Tamim",
        "excerpt": "My political life is terminated, and I proclaim my son, under the title of Napoleon II., Emperor of the French.",
        "source": "Napoleon Bonaparte, Declaration of Abdication, 22 June 1815 (Wikisource, contemporary English translation)",
        "href": "https://en.wikisource.org/wiki/Declaration_of_abdication_by_Napoleon_Bonaparte,_22_June_1815"
      },
      {
        "category": "literary",
        "title": "King Lear's abdication speech — an ageing sovereign who resolves to shed the cares of rule and confer his kingdom on younger hands, the archetype of a monarch stepping down while still alive, as Hamad did in 2013",
        "excerpt": "Meantime we shall express our darker purpose. Give me the map there. Know that we have divided In three our kingdom; and 'tis our fast intent To shake all cares and business from our age, Conferring them on younger strengths, while we Unburden'd crawl toward death.",
        "source": "William Shakespeare, King Lear, Act I, Scene 1 (Yale edition, 1917), first performed c. 1606",
        "href": "https://en.wikisource.org/wiki/King_Lear_(1917)_Yale/Text/Act_I"
      },
      {
        "category": "literary",
        "title": "Machiavelli's The Prince on the peril of the reformer — the hazard borne by any ambitious ruler who introduces a new order of things, mirroring Hamad the moderniser who overturned Qatar's old ways to build Al Jazeera, host US bases and win the World Cup",
        "excerpt": "There is nothing more difficult to take in hand, more perilous to conduct, or more uncertain in its success, than to take the lead in the introduction of a new order of things. Because the innovator has for enemies all those who have done well under the old conditions, and lukewarm defenders in those who may do well under the new.",
        "source": "Niccolò Machiavelli, The Prince, Chapter VI (trans. W. K. Marriott), written 1513",
        "href": "https://www.gutenberg.org/files/1232/1232-h/1232-h.htm"
      },
      {
        "category": "artistic",
        "title": "Frans Francken the Younger, 'Allegory on the Abdication of Emperor Charles V in Brussels' — the great emperor lays down his crowns and passes his realm to his son Philip II while the personified continents kneel with gifts, a sovereign of global reach yielding power to the next generation, as Hamad did",
        "excerpt": "In this allegory the aged, ailing Charles V sits enthroned as he surrenders his vast empire, his heirs Ferdinand I and Philip II beside him. Personifications of his far-flung territories kneel with their banners while the four continents — Europe, Asia, Africa and America — offer tribute, a painted meditation on a world-spanning ruler choosing to relinquish the throne to his son.",
        "source": "Frans Francken the Younger, Allegory on the Abdication of Emperor Charles V in Brussels, 25 October 1555, oil on panel, c. 1630–1640, Rijksmuseum, Amsterdam (SK-A-112)",
        "href": "https://commons.wikimedia.org/wiki/File:Francken_II,_Frans_-_Allegory_on_the_Abdication_of_Emperor_Charles_V_in_Brussels,_25_October_1555,_-_c._1620.jpg",
        "image": {
          "src": "/covers/qatar-former-emir-hamad-dies--a4.png",
          "alt": "An enthroned Emperor Charles V surrenders his crowns to his son as personified continents and territories kneel before him with banners and gifts.",
          "credit": "Frans Francken the Younger, 'Allegory on the Abdication of Emperor Charles V in Brussels, 25 October 1555', c. 1630–1640; Rijksmuseum, Amsterdam (SK-A-112); public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Handel's coronation anthem 'Zadok the Priest' — the sacred music of a son anointed king in his father's place, sung at every British coronation since 1727 and drawn from Solomon's succession to David, a fitting note for a Gulf dynasty passing peacefully from father to son",
        "excerpt": "Zadok the priest, and Nathan the prophet, anointed Solomon king; and all the people rejoiced, and said: God save the King! Long live the King! May the King live for ever! Amen. Alleluia.",
        "source": "George Frideric Handel, Zadok the Priest (Coronation Anthem No. 1), HWV 258, composed 1727 for the coronation of King George II; text after 1 Kings 1:38–40",
        "href": "https://imslp.org/wiki/Zadok_the_Priest,_HWV_258_(Handel,_George_Frideric)"
      }
    ],
    "rank": 2
  },
  {
    "slug": "argentina-switzerland-world-cup-semis",
    "headline": "Argentina beat 10-man Switzerland 3-1 in extra time to reach the World Cup semifinals and a clash with England",
    "overview": "Lautaro Martinez and a stunning long-range strike by Julian Alvarez in extra time carried Argentina past 10-man Switzerland 3-1 on July 12, 2026 to reach the World Cup semifinals. Switzerland, reduced to ten after Breel Embolo's second-yellow dismissal, had drawn level through Dan Ndoye before the reigning champions pulled away late. The win sets up a semifinal against England, and the Swiss coach bitterly condemned the video-review decisions that went against his side.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiwwFBVV95cUxQbjdjRVRIVE9NQVA5aXdUdmlkZzN1dmM1NWgtaFY1TUtzNFlwangwRHBPdWY4TjUyVXkzZzJmRFlRWFMtYnNaSGVKZi1tTS16RzR0a0FBVUljR2NIS0pqTjRxelpPdUJrV3lNZnVpcjJuTEN4RVlnOGotUU1RakFIZXlyaXVrNG5FNGhHREZBcDIwd2hZLXlhYWtqQ01sX2otVWMzQTktYzhTVk5vaXlGU2J0bU9jTzJWd1BLV2YwN0xXemM?oc=5"
      },
      {
        "name": "ESPN",
        "href": "https://www.espn.com/soccer/story/_/id/49337589/argentina-switzerland-live-world-cup-2026-latest-updates-commentary-score-result-lionel-messi"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-12",
    "image": {
      "src": "/covers/argentina-switzerland-world-cup-semis.png",
      "alt": "A footballer in the sky-blue and white striped shirt of Argentina controls the ball on the pitch during a World Cup match.",
      "credit": "Photo: Hossein Zohrevand, Lionel Messi playing for Argentina at the 2022 FIFA World Cup, 2022; CC BY 4.0, via Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 12 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Suetonius on Nero at the Olympic chariot race (AD 67): the emperor thrown from his ten-horse team, unable to finish, yet crowned victor anyway — antiquity's most notorious rigged verdict, a mirror of Switzerland's fury at the officials and the contested call that shadowed the result",
        "excerpt": "He drove a chariot in many places, at Olympia even a ten-horse team, although in one of his own poems he had criticised Mithridates for just that thing. But after he had been thrown from the car and put back in it, he was unable to hold out and gave up before the end of the course; but he received the crown just the same.",
        "source": "Suetonius, The Lives of the Caesars, 'Nero', ch. 24, trans. J. C. Rolfe, Loeb Classical Library (London: Heinemann; New York: Macmillan, 1914), via LacusCurtius (Bill Thayer), University of Chicago.",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Suetonius/12Caesars/Nero*.html"
      },
      {
        "category": "historical",
        "title": "William B. Travis's 'Victory or Death' letter from the besieged Alamo (24 February 1836): a spirited, hopelessly out-numbered garrison that would not surrender or retreat — the defiant, doomed resistance of ten-man Switzerland refusing to yield to the champions",
        "excerpt": "I have answered the demand with a cannon shot, & our flag still waves proudly from the walls—I shall never surrender or retreat... I am determined to sustain myself as long as possible & die like a soldier who never forgets what is due to his own honor & that of his country—Victory or Death.",
        "source": "William Barret Travis, letter 'To the People of Texas & All Americans in the World', the Alamo, February 24, 1836; original manuscript held by the Texas State Library and Archives Commission, Austin.",
        "href": "https://www.tsl.texas.gov/treasures/republic/alamo/travis-full-text.html"
      },
      {
        "category": "literary",
        "title": "Virgil, Aeneid, Book V — the foot-race at Anchises's funeral games, where a trip fells Salius, the crowd erupts, he storms the judges crying the prize was 'wrongfully conferr'd', and Aeneas rules on the disputed result: the ancient epic's own VAR controversy",
        "excerpt": "He strove th' immediate rival's hope to cross, / And caught the foot of Salius as he rose. ... But Salius enters, and, exclaiming loud / For justice, deafens and disturbs the crowd; / Urges his cause may in the court be heard; / And pleads the prize is wrongfully conferr'd. ... Then thus the prince: “Let no disputes arise: / Where fortune plac'd it, I award the prize.”",
        "source": "Virgil, The Aeneid, Book V, trans. John Dryden (1697), Project Gutenberg eBook #228.",
        "href": "https://www.gutenberg.org/cache/epub/228/pg228.txt"
      },
      {
        "category": "literary",
        "title": "Homer, Odyssey, Book XXI — the contest of the bow, where one man alone strings the great bow no rival could bend and sends a single arrow clean through all twelve axes: the hero's one flawless, impossible strike, like Julian Alvarez's long-range wonder-goal settling the tie",
        "excerpt": "He took and laid it on the bridge of the bow, and held the notch and drew the string, even from the settle whereon he sat, and with straight aim shot the shaft and missed not one of the axes, beginning from the first axe-handle, and the bronze-weighted shaft passed clean through and out at the last.",
        "source": "Homer, The Odyssey, Book XXI, trans. S. H. Butcher and Andrew Lang (1879), Project Gutenberg eBook #1728.",
        "href": "https://www.gutenberg.org/cache/epub/1728/pg1728.txt"
      },
      {
        "category": "artistic",
        "title": "Alexander von Wagner's 'The Chariot Race' (c. 1882) — quadrigas thundering neck-and-neck round the packed circus, dust flying and one driver flogging his team clear at the death: the raw drama and glory of the games, distilled into a single decisive surge",
        "excerpt": "Von Wagner freezes a Roman chariot race at its climax: four-horse teams thunder round the turn of a packed circus in a storm of dust, one charioteer flogging his straining horses a length clear of the pack as the crowded grandstands erupt. It is the ancient contest rendered as pure spectacle and nerve, victory seized in a single decisive surge. The same raw drama runs through Argentina's breakaway triumph, snatched clear of a spirited pursuer in the final strides.",
        "source": "Alexander von Wagner (1838–1919), The Chariot Race, oil on canvas, c. 1882; Manchester Art Gallery (acc. no. 1898.12).",
        "href": "https://commons.wikimedia.org/wiki/File:Alexander_von_Wagner_(1838-1919)_-_The_Chariot_Race_-_1898.12_-_Manchester_Art_Gallery.jpg",
        "image": {
          "src": "/covers/argentina-switzerland-world-cup-semis--a4.png",
          "alt": "Roman chariots at full gallop thunder round the sand of a packed circus, horses straining and manes flying, one charioteer whipping his four-horse team clear of the pack as the crowded grandstands roar.",
          "credit": "Alexander von Wagner (1838–1919), 'The Chariot Race', oil on canvas, c. 1882; Manchester Art Gallery; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Verdi, 'Gloria all'Egitto' — the Triumphal Scene from Aida (Act II, 1871): the great processional hymn hailing the returning conqueror, laurels twined on the victors' brows, the sound of Argentina's champions marching on to the semifinal in glory",
        "excerpt": "Gloria all'Egitto, ad Iside / Che il sacro suol protegge! / Al Re che il Delta regge / Inni festosi alziam! ... S'intrecci il loto al lauro / Sul crin dei vincitori!",
        "source": "Giuseppe Verdi, Aida, Act II (Triumphal Scene, 'Gloria all'Egitto'); libretto by Antonio Ghislanzoni; first performed Cairo, 1871. Scores at the International Music Score Library Project (IMSLP / Petrucci Music Library).",
        "href": "https://imslp.org/wiki/Aida_(Verdi,_Giuseppe)"
      }
    ],
    "rank": 3
  },
  {
    "slug": "south-china-sea-ruling-reaffirmed",
    "headline": "Fourteen nations and the European Union reaffirm the 2016 ruling that invalidated China's South China Sea claims",
    "overview": "In a joint statement on July 12, 2026 marking the tenth anniversary of a landmark arbitral ruling, fourteen countries and the European Union restated that China's expansive claims to the South China Sea have no basis in international law. The 2016 tribunal had rejected Beijing's \"nine-dash line,\" but China dismisses the decision and continues to assert control over contested waters and reefs. The signatories pressed for freedom of navigation in one of the world's most vital and disputed sea lanes.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMirAFBVV95cUxQc3pmZ2dBZ2dRWHNTeGJnYUoxRUlqR3hPa3hsMzQyVVU5Nl9kT2FEdlY1SU9QZE9MR1dqM0FxTWNNdzdTOHdCUFRQOE9FNFR4WmtsSjJMZU0tSVZRVlFadTJmU2VzN1JMY1VpYlRzWGtvUl9rT0pDQ2d1ZmgxTTZMRHlBWk1GZEpxZVJHbEYxRTVzVExibVNnVlBJbk11QzlueDNNTlBTX2UzZTFP?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMivgFBVV95cUxQS09EWmdpMEZqVE9nazcwbDh4TWRGN2J3Z1hSQTVzbzh1QzkyRTRjeENDQ2VRYXc4N2ROcmF2bU00MHZDTWMzVllycFpBT25Idk9TMlZrWWZVSzdxZWV4S2k3V3Z6VGJVTTZmZVd1UTNPdVFwSkNudDRwNmVJVnczWHJ2VExVdEQ3bFY2UVVzREZVRjd1bFhoaFR4MzB1TlJHTnNmdWx2RXdpVmR5Y2VwRU43SUN5dFJyNTlpMm1B?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-12",
    "image": {
      "src": "/covers/south-china-sea-ruling-reaffirmed.png",
      "alt": "A regional map of the South China Sea showing overlapping maritime boundary lines claimed by neighboring coastal states.",
      "credit": "Map: Voice of America (U.S. federal government), South China Sea claims map; public domain, via Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 12 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Grotius and the Free Sea: the 1609 case that no power can own the ocean",
        "excerpt": "the sea is common to all, because it is so limitless that it cannot become a possession of any one, and because it is adapted for the use of all, whether we consider it from the point of view of navigation or of fisheries.",
        "source": "Hugo Grotius, The Freedom of the Seas (Mare Liberum, 1609), trans. Ralph Van Deman Magoffin, Carnegie Endowment, 1916",
        "href": "https://www.gutenberg.org/cache/epub/75962/pg75962-images.html"
      },
      {
        "category": "historical",
        "title": "The Melian Dialogue: a maritime empire tells a small island that law is for equals",
        "excerpt": "right, as the world goes, is only in question between equals in power, while the strong do what they can and the weak suffer what they must.",
        "source": "Thucydides, History of the Peloponnesian War, Book 5.89 (Crawley translation), Perseus Digital Library, Tufts University",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0200:book%3D5:chapter%3D89:section%3D1"
      },
      {
        "category": "literary",
        "title": "Byron's ocean, where empires end at the waterline",
        "excerpt": "Roll on, thou deep and dark blue Ocean—roll!\nTen thousand fleets sweep over thee in vain;\nMan marks the earth with ruin—his control\nStops with the shore;—upon the watery plain\nThe wrecks are all thy deed, nor doth remain\nA shadow of man's ravage, save his own,\nWhen for a moment, like a drop of rain,\nHe sinks into thy depths with bubbling groan,\nWithout a grave, unknelled, uncoffined, and unknown.",
        "source": "Lord Byron, Childe Harold's Pilgrimage, Canto IV, stanza CLXXIX (1818)",
        "href": "https://www.gutenberg.org/files/5131/5131-h/5131-h.htm"
      },
      {
        "category": "literary",
        "title": "Aeschylus on Xerxes, the king who tried to shackle the sea like a slave",
        "excerpt": "for he conceived the hope that he could by shackles, as if it were a slave, restrain the current of the sacred Hellespont, the Bosporus, a stream divine; set himself to fashion a roadway of a new order, and, by casting upon it hammer-wrought fetters, made a spacious causeway for his mighty host. Mortal though he was, he thought in his folly that he would gain the mastery over all the gods, aye even over Poseidon.",
        "source": "Aeschylus, The Persians (472 BC), trans. Herbert Weir Smyth, Harvard University Press, 1926 (Wikisource)",
        "href": "https://en.wikisource.org/wiki/Aeschylus_(Smyth_1927)_v1/The_Persians"
      },
      {
        "category": "artistic",
        "title": "The Cannon Shot: a Dutch man-of-war on the open sea that Grotius called free",
        "excerpt": "Willem van de Velde the Younger paints a Dutch warship firing a salute, its sails slack in a light haze while smaller boats bob alongside on a vast, luminous swell. Made around 1680 for the seafaring republic whose jurists argued the ocean could belong to no one, the picture sets a single vessel of naval power against a limitless expanse of water and sky—the smoke drifting off toward a horizon no flag can fence.",
        "source": "Willem van de Velde the Younger, The Cannon Shot (Het kanonschot), c. 1680, Rijksmuseum, Amsterdam (SK-C-244); public domain, via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Het_kanonschot_Rijksmuseum_SK-C-244.jpeg",
        "image": {
          "src": "/covers/south-china-sea-ruling-reaffirmed--a4.png",
          "alt": "A lone Dutch warship fires a salute of smoke on a calm, silvery sea beneath a wide hazed sky, dwarfed by the open water around it.",
          "credit": "Willem van de Velde the Younger, The Cannon Shot (c. 1680), Rijksmuseum; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Debussy's La Mer: the sea rendered as sovereign, ungovernable motion",
        "excerpt": "De l'aube à midi sur la mer — Jeux de vagues — Dialogue du vent et de la mer",
        "source": "Claude Debussy, La mer, trois esquisses symphoniques pour orchestre, CD 111 / L. 109 (1905); International Music Score Library Project (IMSLP)",
        "href": "https://imslp.org/wiki/La_mer,_CD_111_(Debussy,_Claude)"
      }
    ],
    "rank": 4
  },
  {
    "slug": "ukraine-strikes-tanker-sea-of-azov",
    "headline": "Russia says Ukraine struck an oil tanker in the Sea of Azov as Kyiv presses its campaign against Russian fuel",
    "overview": "Russia said on July 12, 2026 that Ukrainian forces had struck an oil tanker in the Sea of Azov, the latest blow in a sustained Ukrainian campaign against the ships and refineries that carry Russia's fuel and revenue. The reported strike widened the war onto the water and deepened Kyiv's targeting of energy infrastructure far behind the front line. Ukraine has increasingly reached tankers and export terminals as it seeks to squeeze Moscow's wartime economy.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMilgFBVV95cUxObmhWWC1hanZqY2JNcURXdGVEMGo3MklhRUxMTlM5NG9aWGwya0Z2SE9RanVYNmUyYjRsZnhEOTd6czNUVEo5dlVSaE11TXFjcVhqVGF6MnRZQ2t3ZzlKek84d0tPcExJTnUzeUsyamJFQmcwRk9Yb2pBZGRmOEw0TFFQUF81WjVhNFotQzVvTFZ2QjR2ZkE?oc=5"
      },
      {
        "name": "The Moscow Times",
        "href": "https://www.themoscowtimes.com/2026/07/12/russia-says-ukraine-struck-tanker-in-sea-of-azov-a93227"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-12",
    "image": {
      "src": "/covers/ukraine-strikes-tanker-sea-of-azov.png",
      "alt": "A large red-and-black oil tanker sits low in the water on calm seas near a port entrance under a hazy sky.",
      "credit": "Photo: Paul Harrison, Oil Tanker Stride at Colon, Panama, 2016; CC BY-SA 4.0, via Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 12 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Dutch fire-ships burn the English fleet in the Medway (1667): an enemy reaches behind the front to torch ships at anchor",
        "excerpt": "the Dutch have broke the chaine and burned our ships, and particularly \"The Royal Charles\" ... \"The Royal James,\" \"Oake,\" and \"London,\" burnt by the enemy with their fire-ships ... I do fear so much that the whole kingdom is undone, that I do this night resolve to study with my father and wife what to do.",
        "source": "The Diary of Samuel Pepys, entries of 12 and 13 June 1667 (Volume 54: June 1667), ed. Henry B. Wheatley. Project Gutenberg.",
        "href": "https://www.gutenberg.org/cache/epub/4177/pg4177-images.html"
      },
      {
        "category": "historical",
        "title": "Caesar burns the Alexandrian fleet in its own harbour (48 BC): denying an enemy the ships that carry his power",
        "excerpt": "At length Caesar carried his point, and not only set fire to the vessels abovementioned, but to all that were in the arsenals, after which he passed some troops into the Isle of Pharos.",
        "source": "Julius Caesar, Commentaries on the Civil War, Book 3, ch. 111, trans. William Duncan (1856). Perseus Digital Library, Tufts University.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0076:book=3:chapter=111"
      },
      {
        "category": "literary",
        "title": "The Trojans hurl fire into the Greek ships in Homer's Iliad, Book 16: the war carried to the vessels, a hull wrapped in flame",
        "excerpt": "Therefore he drew back, and the Trojans flung fire upon the ship which was at once wrapped in flame. The fire was now flaring about the ship's stern, whereon Achilles smote his two thighs and said to Patroclus, 'Up, noble horseman, for I see the glare of hostile fire at our fleet; up, lest they destroy our ships, and there be no way by which we may retreat.'",
        "source": "Homer, The Iliad, Book 16, trans. Samuel Butler (prose, 1898). Perseus Digital Library, Tufts University.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0217:book=16:card=112"
      },
      {
        "category": "literary",
        "title": "The burning of the fleet in Virgil's Aeneid, Book 5: flaming brands loosed among the ships until the fire rides the sterns and oars",
        "excerpt": "The flame, unstopp'd at first, more fury gains, / And Vulcan rides at large with loosen'd reins: / Triumphant to the painted sterns he soars, / And seizes, in this way, the banks and crackling oars.",
        "source": "Virgil, The Aeneid, Book 5, trans. John Dryden. Perseus Digital Library, Tufts University.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0052:book=5:card=654"
      },
      {
        "category": "artistic",
        "title": "Ivan Aivazovsky, 'Battle of Çesme at Night' (1848): an entire enemy fleet ablaze on dark water after a fire-ship attack",
        "excerpt": "Aivazovsky paints the night of 25-26 June 1770, when a Russian fire-ship set the Ottoman fleet alight in Chesme Bay. The whole armada burns at once, masts snapping into pillars of flame that redden the smoke and the black water, while a wan moon looks down on the destruction. It is the maritime story's exact image: a fleet turned to fire far from any battle line, a lifeline of ships consumed on the sea.",
        "source": "Ivan Konstantinovich Aivazovsky, Battle of Çesme at Night, 1848, oil on canvas; Feodosia National Gallery, Aivazovsky Museum. Public domain, via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Ivan_Constantinovich_Aivazovsky_-_Battle_of_%C3%87esme_at_Night.JPG",
        "image": {
          "src": "/covers/ukraine-strikes-tanker-sea-of-azov--a4.png",
          "alt": "An entire Ottoman fleet burns on black night water, masts erupting into towers of flame and smoke beneath a pale moon.",
          "credit": "Ivan Aivazovsky, Battle of Çesme at Night, 1848; Feodosia National Gallery (Aivazovsky Museum); public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Wagner, Overture to 'Der fliegende Holländer' (The Flying Dutchman, 1841): a storm-driven, doomed vessel at the mercy of the open sea",
        "excerpt": "Wagner's overture opens with howling horn-calls and surging strings that conjure a gale-lashed sea and a cursed ship driven across it. Brass and timpani break like waves over the deck as the doomed vessel is hurled toward its fate. The music makes audible the theme of the tanker's night: a ship alone on hostile water, no longer safe, tossed between survival and destruction.",
        "source": "Richard Wagner, Der fliegende Holländer, WWV 63 (1841), overture; full orchestral score (Fürstner, 1896). IMSLP / Petrucci Music Library, public domain.",
        "href": "https://imslp.org/wiki/Der_fliegende_Holländer,_WWV_63_(Wagner,_Richard)"
      }
    ],
    "rank": 5
  },
  {
    "slug": "khosla-family-buys-seahawks",
    "headline": "Vinod Khosla's family agrees to buy the Super Bowl champion Seattle Seahawks for a record $9.6 billion",
    "overview": "A group led by the family of venture capitalist Vinod Khosla has agreed to purchase the reigning Super Bowl champion Seattle Seahawks for a reported $9.612 billion, an NFL record, buying the franchise from the estate of the late owner Paul Allen. Neeru Khosla would serve as the team's control owner, and the family must divest its minority stake in the San Francisco 49ers. League owners are expected to vote on the sale at a special meeting in late August.",
    "genre": "Economy",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMifkFVX3lxTE41RHdYR0dRMjRnSUxoQ3ZHQThoSjYta1UwMjVNS0c2NGgyaHpLaTcyZU9rR19XTXh5Q2VsUTQ0ZHF5YjF2cktrbUhqdjNia3I1aDJfZDlDUU1Hd01yblU1OU9EM195VEZnaldBWnphUFk4RW5USUNqWlNiWGJaQQ?oc=5"
      },
      {
        "name": "ESPN",
        "href": "https://www.espn.com/nfl/story/_/id/49337716/khosla-led-group-agrees-buy-seahawks-sources-say-96-billion"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-12",
    "image": {
      "src": "/covers/khosla-family-buys-seahawks.png",
      "alt": "The north exterior of a large open-air sports stadium glows against a deep blue dusk sky above a city street.",
      "credit": "Photo: SounderBruce, Lumen Field north side at dusk, 2022; CC BY-SA 4.0, via Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 12 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Panem et Circenses: A People Content to Be Bought with Games",
        "excerpt": "Now that no one buys our votes, the public has long since cast off its cares; the people that once bestowed commands, consulships, legions and all else, now meddles no more and longs eagerly for just two things—Bread and Games!",
        "source": "Juvenal, Satire X (\"The Vanity of Human Wishes\"), trans. G. G. Ramsay, Loeb Classical Library, 1918",
        "href": "https://www.tertullian.org/fathers/juvenal_satires_10.htm"
      },
      {
        "category": "historical",
        "title": "A Record Price, Kept Secret: A Beer Baron Buys the Game's Great Champion",
        "excerpt": "New York Yankees Purchase \"Babe\" Ruth from Red Sox. Colonel Ruppert Refuses to Make Public Exact Purchase Price—Ruth Held Out for $20,000 Salary. \"Injustice\" to Red Sox. By Associated Press. New York, January 5.—The purchase of \"Babe\" Ruth of the Boston Americans by the New York American Club was announced tonight by Col. Jacob Ruppert, president of the New York Club. Colonel Ruppert refused to state the price paid.",
        "source": "The Birmingham Age-Herald (Birmingham, Ala.), January 6, 1920, p. 7 (Associated Press); Library of Congress, Chronicling America",
        "href": "https://www.loc.gov/resource/sn85038485/1920-01-06/ed-1/?sp=7"
      },
      {
        "category": "literary",
        "title": "The Prizes by the Course: Achilles Stakes Treasure on a Chariot Race",
        "excerpt": "First stood the prizes to reward the force\nOf rapid racers in the dusty course:\nA woman for the first, in beauty's bloom,\nSkill'd in the needle, and the labouring loom;\nAnd a large vase, where two bright handles rise,\nOf twenty measures its capacious size.",
        "source": "Homer, The Iliad, Book XXIII (\"Funeral Games in Honour of Patroclus\"), trans. Alexander Pope; Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/6130/pg6130.txt"
      },
      {
        "category": "literary",
        "title": "The Man Who Played with the Faith of Fifty Million People",
        "excerpt": "\"Meyer Wolfshiem? No, he's a gambler.\" Gatsby hesitated, then added, coolly: \"He's the man who fixed the World's Series back in 1919.\" ... The idea staggered me. I remembered, of course, that the World's Series had been fixed in 1919, but if I had thought of it at all I would have thought of it as a thing that merely happened, the end of some inevitable chain. It never occurred to me that one man could start to play with the faith of fifty million people—with the single-mindedness of a burglar blowing a safe.",
        "source": "F. Scott Fitzgerald, The Great Gatsby, Chapter IV (1925); Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/64317/pg64317.txt"
      },
      {
        "category": "artistic",
        "title": "Rome Under Trajan: The Roar and Ruin of the Circus Maximus",
        "excerpt": "Ulpiano Checa's thundering canvas throws the viewer into the dust of the Circus Maximus: four-horse quadrigae strain around the turning-post while a packed grandstand rises in a wall of spectators. It is the spectacle as the ancient world knew it—the games as the property and the passion of an empire, staged for a public whose loyalties belonged to the colors of the racing factions.",
        "source": "Ulpiano Checa, \"Rome Under Trajan—A Chariot Race\" (engraving after his painting, published 1894); via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Great_Men_and_Famous_Women_Volume_1_-_ROME_UNDER_TRAJAN%E2%80%94A_CHARIOT_RACE.jpg",
        "image": {
          "src": "/covers/khosla-family-buys-seahawks--a4.png",
          "alt": "Charioteers and their four-horse teams thunder around the turning-post of a Roman circus as a vast crowd roars, dust and wreckage churning in their wake.",
          "credit": "Ulpiano Checa, \"Rome Under Trajan—A Chariot Race\" (1894 engraving after his painting), public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Music for the Royal Fireworks: An Opulent Fanfare for a Public Triumph",
        "excerpt": "Handel scored his Music for the Royal Fireworks for a colossal wind band—dozens of trumpets, horns, oboes and drums—to crown a lavish public celebration staged in London's Green Park, complete with a towering pyrotechnic pavilion. Its blazing overture is the sound of power made spectacle: a fortune spent so that a triumph might be seen and heard by an entire city. The grandeur is the point, the expense the message—glory purchased and put on magnificent display.",
        "source": "George Frideric Handel, Music for the Royal Fireworks, HWV 351 (1749); full score via IMSLP",
        "href": "https://imslp.org/wiki/Music_for_the_Royal_Fireworks,_HWV_351_(Handel,_George_Frideric)"
      }
    ],
    "rank": 6
  },
  {
    "slug": "german-carmakers-china-sales-plunge",
    "headline": "Germany's major carmakers report a steep plunge in China sales as domestic rivals seize the market",
    "overview": "Volkswagen, BMW and Mercedes-Benz reported sharply lower sales in China, long their most profitable market, as fast-rising Chinese electric-vehicle makers capture buyers at home, figures released around July 11, 2026 showed. The reversal threatens the earnings and factories that underpin Germany's industrial economy and marks a historic shift in an industry the German firms once dominated. Executives warned of intensifying competition and pressure on jobs at home.",
    "genre": "Economy",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMilgFBVV95cUxNQ2VPYW1pQUhrWWg1M0xRWWVUVy1GQ2ljaHdpSU5mdlZmdnhKUlhLcU1BZnhZZWpoOTVnaGdoZ2JwRmNXRnZGZGhtZVlDbWIxa3c2cFdpU0ZwcXJEazY2VXpENWJQZkttbEVmT0dsa2FnRDhBclRXc3dTeElRTWNpT0RQbl9qZFFYdTVaYVlvM1BYc0JILXc?oc=5"
      },
      {
        "name": "Bloomberg",
        "href": "https://www.bnnbloomberg.ca/business/international/2026/07/11/major-german-carmakers-hit-by-steep-china-sales-plunge-as-competition-heats-up/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-12",
    "image": {
      "src": "/covers/german-carmakers-china-sales-plunge.png",
      "alt": "An aerial view of a vast automobile manufacturing complex, its long assembly halls and rows of buildings stretching to the horizon.",
      "credit": "Photo: Carsten Steger, Aerial image of the Wolfsburg Volkswagen Plant, 2024; CC BY-SA 4.0, via Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 12 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "A Yorkshire cloth town petitions against the machines, 1786",
        "excerpt": "SHEWETH, That the Scribbling-Machines have thrown thousands of your petitioners out of employ, whereby they are brought into great distress, and are not able to procure a maintenance for their families, and deprived them of the opportunity of bringing up their children to labour.",
        "source": "Leeds Woollen Workers' Petition (1786), Internet Modern History Sourcebook, Fordham University",
        "href": "https://sourcebooks.fordham.edu/mod/1786machines.asp"
      },
      {
        "category": "historical",
        "title": "Detroit's Big Three are overrun in their own market, 1980",
        "excerpt": "For a generation the American giants that had invented the mass-market automobile ruled the road unchallenged. Then, at the turn of the 1980s, nimble Japanese makers built smaller, cheaper, more reliable cars than Detroit could answer, driving imports toward a fifth of U.S. sales while Ford, GM and Chrysler bled billions and idled hundreds of thousands of workers. Washington was reduced to pressuring Tokyo into 'voluntary' export restraints to shield its wounded champions, the moment the world's mightiest manufacturing power learned it could be beaten at home.",
        "source": "Stephen D. Cohen, 'The Route to Japan's Voluntary Export Restraints on Automobiles,' National Security Archive (American University)",
        "href": "https://nsarchive2.gwu.edu/japan/scohenwp.htm"
      },
      {
        "category": "literary",
        "title": "'Look on my Works, ye Mighty, and despair': Shelley's Ozymandias",
        "excerpt": "And on the pedestal these words appear:\n'My name is Ozymandias, king of kings:\nLook on my works, ye Mighty, and despair!'\nNothing beside remains. Round the decay\nOf that colossal wreck, boundless and bare\nThe lone and level sands stretch far away.",
        "source": "Percy Bysshe Shelley, 'Ozymandias' (1818), via American Literature",
        "href": "https://americanliterature.com/author/percy-bysshe-shelley/poem/ozymandias"
      },
      {
        "category": "literary",
        "title": "'Ill fares the land': Goldsmith's The Deserted Village",
        "excerpt": "Ill fares the land, to hastening ills a prey,\nWhere wealth accumulates, and men decay;\nPrinces and lords may flourish, or may fade;\nA breath can make them, as a breath has made:\nBut a bold peasantry, their country's pride,\nWhen once destroyed, can never be supplied.",
        "source": "Oliver Goldsmith, 'The Deserted Village' (1770), via Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Deserted_Village"
      },
      {
        "category": "artistic",
        "title": "Turner's The Fighting Temeraire: the old giant towed to the breakers",
        "excerpt": "A ghostly, pale-masted warship of the old sailing age, once a hero of Trafalgar, is dragged to the scrapyard by a squat, smoke-belching steam tug beneath a blazing sunset. Turner painted the picture in 1839 as an elegy for a superseded order, the majestic veteran of the wind eclipsed in a single canvas by the small, sooty, unstoppable machine of the new age.",
        "source": "J. M. W. Turner, 'The Fighting Temeraire' (1839), National Gallery, London, via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:The_Fighting_Temeraire,_JMW_Turner,_National_Gallery.jpg",
        "image": {
          "src": "/covers/german-carmakers-china-sales-plunge--a4.png",
          "alt": "A ghostly, sunlit sailing warship of the old age is towed to the breaker's yard by a squat, smoke-belching steam tug beneath a fiery sunset.",
          "credit": "J. M. W. Turner, 'The Fighting Temeraire' (1839), National Gallery, London; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Wagner's Gotterdammerung: the Twilight of the Gods",
        "excerpt": "The final opera of Wagner's Ring cycle brings the reign of the gods to a cataclysmic close: their fortress Valhalla and the whole age they ruled are consumed in fire as a new order rises from the ashes. Its surging, valedictory music has become the very sound of an epoch ending, of the once-omnipotent brought low and the guard of an entire world changed forever.",
        "source": "Richard Wagner, 'Gotterdammerung' (Twilight of the Gods), WWV 86D (first published 1876), full score via IMSLP",
        "href": "https://imslp.org/wiki/G%C3%B6tterd%C3%A4mmerung,_WWV_86D_(Wagner,_Richard)"
      }
    ],
    "rank": 7
  },
  {
    "slug": "meta-instagram-ai-tool-reined-in",
    "headline": "Meta reins in a new AI tool that automatically accessed users' public Instagram images after criticism",
    "overview": "Following an outcry over privacy, Meta said around July 11, 2026 that it was scaling back a new artificial-intelligence feature that had been automatically drawing on people's public Instagram photos to generate AI content. Critics argued that users had not meaningfully consented to having their images fed into the system. Meta said it would add limits and give people clearer choices over how their pictures are used.",
    "genre": "Technology",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMiswFBVV95cUxNV3dWTkVYeFZCMmRRcHZMa1BhSGU5dGxTM1VHQnhrV2NmSHJ5RmlGeHRBQmMxZmR0Zno4dmhyamh2NEIxZl9ZSnFtaEdXNDhOWUdWUVQyajk4Y3lpNml2YTA2WVJHRlhGZnJON3hncVpWSlREZ3YwbjFhNXBJYjdpQjJCSEhuVUY4UVZNMnhsOXZyQmdjR0tEM3dPRUdlMENVbV90clVhOFh6blljU05yUzRFTQ?oc=5"
      },
      {
        "name": "TechCrunch",
        "href": "https://techcrunch.com/2026/07/10/meta-removes-controversial-ai-feature-on-instagram-after-backlash/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-12",
    "image": {
      "src": "/covers/meta-instagram-ai-tool-reined-in.png",
      "alt": "The Instagram app icon glowing on a smartphone screen held at an angle.",
      "credit": "Yuri Samoilov / Wikimedia Commons (CC BY 2.0)"
    },
    "edition": "Afternoon Edition · 12 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Bentham's Panopticon: the machine for seeing without being seen (1791)",
        "excerpt": "A new mode of obtaining power of mind over mind, in a quantity hitherto without example: and that, to a degree equally without example, secured by whoever chooses to have it so, against abuse.",
        "source": "Jeremy Bentham, \"Panopticon; or, The Inspection-House\" (Preface), 1791",
        "href": "https://en.wikisource.org/wiki/Panopticon_or_the_Inspection-House"
      },
      {
        "category": "historical",
        "title": "Warren and Brandeis warn that the camera has breached the private threshold (1890)",
        "excerpt": "Instantaneous photographs and newspaper enterprise have invaded the sacred precincts of private and domestic life; and numerous mechanical devices threaten to make good the prediction that \"what is whispered in the closet shall be proclaimed from the house-tops.\"",
        "source": "Samuel D. Warren & Louis D. Brandeis, \"The Right to Privacy,\" Harvard Law Review, Vol. 4, No. 5, Dec. 15, 1890",
        "href": "https://groups.csail.mit.edu/mac/classes/6.805/articles/privacy/Privacy_brand_warr2.html"
      },
      {
        "category": "literary",
        "title": "The Picture of Dorian Gray: a likeness captured that takes on a life of its own",
        "excerpt": "\"How sad it is! I shall grow old, and horrible, and dreadful. But this picture will remain always young. It will never be older than this particular day of June.... If it were only the other way! If it were I who was to be always young, and the picture that was to grow old! For that—for that—I would give everything! Yes, there is nothing in the whole world I would not give! I would give my soul for that!\"",
        "source": "Oscar Wilde, \"The Picture of Dorian Gray,\" Chapter II, 1890 (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/174/174-h/174-h.htm"
      },
      {
        "category": "literary",
        "title": "Orwell's telescreen: the eye that watches every face and cannot be switched off",
        "excerpt": "In Orwell's Nineteen Eighty-Four, the poster reading BIG BROTHER IS WATCHING YOU stares from every wall, and the telescreen in each home both broadcasts and observes, dimming but never fully shutting off. Winston Smith learns to keep his back to the screen and his expression blank, because any glance, any twitch, might be captured and read. It is the nightmare of a citizen whose likeness and attention are always being harvested by a power he never agreed to be seen by.",
        "source": "George Orwell, \"Nineteen Eighty-Four,\" 1949 (Internet Archive)",
        "href": "https://archive.org/details/innernet_1984"
      },
      {
        "category": "artistic",
        "title": "Rubens' Juno and Argus: the hundred watching eyes, harvested and repurposed",
        "excerpt": "Peter Paul Rubens paints the aftermath of the myth in which Argus Panoptes, the giant whose hundred eyes never all slept at once, was set to watch over Io and was then slain by Mercury. In the canvas the goddess Juno gathers the eyes from his severed head and transplants them into the tail of her peacock, turning a slaughtered watchman's gaze into ornament. It is the ancient image of an all-seeing sentinel whose eyes, once taken without his consent, are reproduced and displayed for another's use.",
        "source": "Peter Paul Rubens, \"Juno and Argus,\" c. 1610, Wallraf-Richartz Museum, Cologne",
        "href": "https://commons.wikimedia.org/wiki/File:Peter_Paul_Rubens_-_Juno_and_Argus_-_WGA20280.jpg",
        "image": {
          "src": "/covers/meta-instagram-ai-tool-reined-in--a4.png",
          "alt": "Juno, attended by other figures and her peacocks, plucks the glowing eyes from the severed head of the hundred-eyed watchman Argus to set them into the bird's tail.",
          "credit": "Peter Paul Rubens, Juno and Argus (c. 1610), Wallraf-Richartz Museum, Cologne; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Redon's floating eye: a single disembodied gaze rising over the world",
        "excerpt": "Odilon Redon's lithograph turns an eye into a hot-air balloon, a solitary eyeball drifting up into the sky bearing a small dish beneath it. Detached from any face or body, the giant eye becomes pure watching, an observing organ set loose to roam and rise without limit. It reads as the perfect emblem of a disembodied, all-seeing gaze lifting above ordinary life and looking down on everyone at once.",
        "source": "Odilon Redon, \"The Eye, Like a Strange Balloon, Mounts Toward Infinity,\" 1882 (lithograph)",
        "href": "https://commons.wikimedia.org/wiki/File:Redon_-_L'oeil,_comme_un_ballon_bizarre,_se_dirige_vers_l'infini,_0217275.jpg"
      }
    ],
    "rank": 8
  },
  {
    "slug": "nicaragua-strips-lawyers-dissent",
    "headline": "Nicaragua strips scores of lawyers of their licenses, widening Ortega's crackdown on dissent",
    "overview": "Nicaragua's government revoked the licenses of numerous lawyers, many of whom had defended government critics, in the latest move by President Daniel Ortega and Vice President Rosario Murillo to silence opposition, rights groups said around July 11, 2026. The purge strips the accused of their profession and livelihood. It extends a years-long campaign that has jailed, exiled and stripped the citizenship of critics of the government.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMipAFBVV95cUxNUXhHSm9tUnpUdGJRM1dHNGE5UXR5T1p3NHJRNHphYTBSaHJ0Sks2aFhEdmtGcThCZm5CVktZdnlIYzd1dnhjSE9JTGlTMVFGallieUFfWk93ay1JdUcxY3lZM0xYT1ZZSGswUHpMSE56bV9nVVRZWWpJX1VlSWpHWVh1M1BVNHFqN2dpcTBVRE9IeHo3WTVaNTBJQzY1T2VQUWVtRA?oc=5"
      },
      {
        "name": "Al Jazeera",
        "href": "https://www.aljazeera.com/news/2026/7/10/nicaragua-strips-lawyers-of-certification-in-latest-crackdown-on-dissent"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-12",
    "image": {
      "src": "/covers/nicaragua-strips-lawyers-dissent.png",
      "alt": "The weathered shell of the earthquake-ruined Old Cathedral of Managua, its twin bell towers and empty facade standing against a bright Nicaraguan sky.",
      "credit": "Photo: eric molina, 'Antigua Catedral de Managua'; CC BY 2.0, via Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 12 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Sulla's Proscriptions: Names Posted for Death in the Roman Forum (82 BC)",
        "excerpt": "He said that he was proscribing as many as he could remember, and those who now escaped his memory, he would proscribe at a future time. ... He took away the civil rights from the sons and grandsons of those who had been proscribed, and confiscated the property of all.",
        "source": "Plutarch, Life of Sulla, ch. 31 (trans. Bernadotte Perrin, Loeb Classical Library)",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Plutarch/Lives/Sulla*.html"
      },
      {
        "category": "historical",
        "title": "The Nazi Bar Purge: Disbarring Germany's Jewish and Dissident Lawyers (1933)",
        "excerpt": "Within weeks of taking power, the Nazi regime turned the machinery of law against its own guardians. Beginning with the April 7, 1933 laws barring \"non-Aryan\" and politically undesirable officials, the government stripped Jewish and Socialist judges, lawyers, and court officers of the right to practice, purging from the profession the very people who might defend the regime's targets. The measures erased careers and livelihoods overnight and signaled that the courts would now serve the state rather than justice.",
        "source": "United States Holocaust Memorial Museum, Holocaust Encyclopedia, \"Antisemitic Legislation 1933-1939\"",
        "href": "https://encyclopedia.ushmm.org/content/en/article/antisemitic-legislation-1933-1939"
      },
      {
        "category": "literary",
        "title": "Antigone Defies Creon's Decree: The Unwritten Laws Against a Tyrant's Edict",
        "excerpt": "Yes, since it was not Zeus that published me that edict, and since not of that kind are the laws which Justice who dwells with the gods below established among men. Nor did I think that your decrees were of such force, that a mortal could override the unwritten and unfailing statutes given us by the gods.",
        "source": "Sophocles, Antigone, lines 450-457 (trans. Richard C. Jebb), Perseus Digital Library",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0186%3Acard%3D441"
      },
      {
        "category": "literary",
        "title": "\"The first thing we do, let's kill all the lawyers\": Shakespeare on Tyranny and the Rule of Law",
        "excerpt": "DICK: The first thing we do, let's kill all the lawyers. CADE: Nay, that I mean to do. Is not this a lamentable thing, that of the skin of an innocent lamb should be made parchment? that parchment, being scribbled o'er, should undo a man?",
        "source": "William Shakespeare, Henry VI, Part 2, Act 4, Scene 2",
        "href": "http://shakespeare.mit.edu/2henryvi/2henryvi.4.2.html"
      },
      {
        "category": "artistic",
        "title": "Goya, The Third of May 1808 - The Execution of the Defenders",
        "excerpt": "Francisco Goya's painting freezes the moment a faceless firing squad levels its muskets at defenseless men. A white-shirted figure throws his arms wide in a posture of martyrdom, illuminated by a lone lantern against the darkness, while the bodies of the already-executed bleed at his feet. It is the definitive image of state power annihilating those who dared to resist, rendering the machinery of repression anonymous and the victims unforgettably human.",
        "source": "Francisco de Goya, El tres de mayo de 1808 en Madrid (1814), Museo del Prado, via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:El_tres_de_mayo_de_1808_en_Madrid.jpg",
        "image": {
          "src": "/covers/nicaragua-strips-lawyers-dissent--a4.png",
          "alt": "A white-shirted man flings his arms wide before a faceless firing squad in the lantern-lit night, the bodies of the already-executed at his feet.",
          "credit": "Francisco de Goya, The Third of May 1808 (1814), Museo del Prado; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Sibelius's \"Finlandia\": a suppressed nation's hymn against censorship",
        "excerpt": "Jean Sibelius composed Finlandia in 1899 as a defiant protest against the Russian empire's censorship of the Finnish press and its crackdown on dissent, and the authorities promptly banned its performance under its own name. Its churning, ominous opening gives way to a serene, swelling hymn that became the unofficial anthem of a people forbidden to speak freely. It endures as the sound of a nation's conscience refusing to be silenced by a censoring power.",
        "source": "Jean Sibelius, Finlandia, Op. 26 (1899; final version 1900), tone poem; full score via IMSLP (Petrucci Music Library).",
        "href": "https://imslp.org/wiki/Finlandia,_Op.26_(Sibelius,_Jean)"
      }
    ],
    "rank": 9
  },
  {
    "slug": "us-dangerous-heat-wave-july",
    "headline": "A dangerous heat wave threatens oppressive, near-record temperatures across much of the United States",
    "overview": "Forecasters warned on July 11 and 12, 2026 that a punishing heat wave would bring dangerous, near-record temperatures to a wide swath of the United States, with heat advisories stretching across the Midwest, South and East. Officials urged people to limit outdoor activity as humidity pushed the heat index to hazardous levels. The extreme heat came amid a summer of intensifying global temperature records.",
    "genre": "Climate",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMiigFBVV95cUxPM1NzQVhjN1Q2YkFWNjBIRjU3VzJfMGctRTNnVWk4MnI3S3ZBS3Z0WEJYY2JRN3doOURxeURJYWV4YmwxSVVIUGduTnRFMklRQTdMNU44ZzFiV09Xel9kS1kwWHMwbDVNanNDbGtQWDZpTGhPOWFYTmY1TjA0RVJDbnVKYkNVVFdHNHc?oc=5"
      },
      {
        "name": "The Weather Channel",
        "href": "https://weather.com/2026/07/11/forecast/regional/video/northern-rockies-heat-dome-record-breaking-temperatures"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-12",
    "image": {
      "src": "/covers/us-dangerous-heat-wave-july.png",
      "alt": "Sun-baked, cracked earth of a reservoir bed dried out under intense summer heat.",
      "credit": "Winyadav / Wikimedia Commons (CC BY-SA 4.0)"
    },
    "edition": "Afternoon Edition · 12 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Hesiod's Season of Wearisome Heat, When Sirius Parches Head and Knees",
        "excerpt": "But when the artichoke flowers, and the chirping grass-hopper sits in a tree and pours down his shrill song continually from under his wings in the season of wearisome heat, then goats are plumpest and wine sweetest; women are most wanton, but men are feeblest, because Sirius parches head and knees and the skin is dry through heat.",
        "source": "Hesiod, Works and Days (ll. 582-596), c. 700 BCE, translated by Hugh G. Evelyn-White (Loeb, 1914); the archaic Greek farmer's calendar of the killing high-summer heat under the Dog Star",
        "href": "https://www.gutenberg.org/cache/epub/348/pg348.txt"
      },
      {
        "category": "historical",
        "title": "The Portentous Summer of 1783: A Blood-Coloured Sun over England",
        "excerpt": "The summer of the year 1783 was an amazing and portentous one, and full of horrible phaenomena... The sun, at noon, looked as blank as a clouded moon, and shed a rust-coloured ferruginous light on the ground, and floors of rooms; but was particularly lurid and blood-coloured at rising and setting. All the time the heat was so intense that butchers’ meat could hardly be eaten on the day after it was killed.",
        "source": "Gilbert White, The Natural History of Selborne (1789), Letter LXV to Daines Barrington, describing the scorching, haze-choked summer that followed Iceland's Laki eruption",
        "href": "https://www.gutenberg.org/cache/epub/1408/pg1408.txt"
      },
      {
        "category": "literary",
        "title": "Coleridge's Becalmed Mariner Beneath a Hot and Copper Sky",
        "excerpt": "All in a hot and copper sky,\nThe bloody Sun, at noon,\nRight up above the mast did stand,\nNo bigger than the Moon.\n\nDay after day, day after day,\nWe stuck, nor breath nor motion;\nAs idle as a painted ship\nUpon a painted ocean.\n\nWater, water, every where,\nAnd all the boards did shrink;\nWater, water, every where,\nNor any drop to drink.",
        "source": "Samuel Taylor Coleridge, 'The Rime of the Ancient Mariner' (first published 1798)",
        "href": "https://www.gutenberg.org/cache/epub/151/pg151.txt"
      },
      {
        "category": "literary",
        "title": "Dante's Burning Desert: Flakes of Fire Raining on the Parched Sand",
        "excerpt": "O'er all the sand-waste, with a gradual fall,\nWere raining down dilated flakes of fire,\nAs of the snow on Alp without a wind... Thus was descending the eternal heat,\nWhereby the sand was set on fire, like tinder\nBeneath the steel, for doubling of the dole.",
        "source": "Dante Alighieri, Inferno, Canto XIV (c. 1320), Henry Wadsworth Longfellow translation (1867); heat as divine affliction in the seventh circle",
        "href": "https://en.wikisource.org/wiki/Divine_Comedy_(Longfellow_1867)/Volume_1/Canto_14"
      },
      {
        "category": "artistic",
        "title": "Bruegel's Harvesters Sunk in the Heat of the Midday Wheat Field",
        "excerpt": "Pieter Bruegel the Elder's The Harvesters (1565) sets a sea of ripe, sun-bleached wheat under a hazy summer sky, the whole landscape shimmering in the heat. In the foreground the reapers have surrendered to the noonday sun, sprawled and slumped in the thin shade of a pear tree, one man asleep with his mouth open, too spent to keep working. It is a vision of humanity subdued by an oppressive summer, harvest and exhaustion bound together.",
        "source": "Pieter Bruegel the Elder, The Harvesters (1565), oil on panel, The Metropolitan Museum of Art, New York",
        "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_the_Elder-_The_Harvesters_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/us-dangerous-heat-wave-july--a4.png",
          "alt": "Golden fields of ripe wheat shimmer under a hazy summer sky as exhausted peasant reapers sprawl in the thin shade of a tree, overcome by the midday heat.",
          "credit": "Pieter Bruegel the Elder, The Harvesters (1565), The Metropolitan Museum of Art; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Vivaldi's 'Summer': Man and Flock Languish Beneath the Blazing Sun",
        "excerpt": "Sotto dura Staggion dal Sole accesa\nLangue l' huom, langue 'l gregge, ed arde il Pino",
        "source": "Antonio Vivaldi, 'L'estate' (Summer), Concerto No. 2 in G minor, RV 315, from Le quattro stagioni, Op. 8 (published 1725); the accompanying sonnet reads 'Beneath the harsh season fired by the sun, man languishes, the flock languishes, and the pine tree burns.' Score on IMSLP.",
        "href": "https://imslp.org/wiki/Le_quattro_stagioni_(Vivaldi,_Antonio)"
      }
    ],
    "rank": 10
  },
  {
    "slug": "verstas-helsinki-timber-mortuary",
    "headline": "Verstas Architects completes a 'comforting and gentle' timber mortuary in Helsinki",
    "overview": "The Finnish studio Verstas Architects has completed a new mortuary and funeral facility in the Malmi district of Helsinki, using warm natural materials, soft daylight and timber to create what it calls a 'comforting and gentle' place for mourning and farewell, Dezeen reported on July 12, 2026. The building reframes a space devoted to death as one of quiet dignity and consolation. It adds to a growing movement toward humane, carefully considered architecture for grief.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Dezeen",
        "href": "https://www.dezeen.com/2026/07/12/verstas-architects-malmi-mortuary/"
      },
      {
        "name": "City of Helsinki",
        "href": "https://www.hel.fi/en/news/facade-of-the-malmi-mortuary-finished"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-12",
    "image": {
      "src": "/covers/verstas-helsinki-timber-mortuary.png",
      "alt": "The curved, timber-clad Kamppi Chapel, a contemporary Finnish wooden building on a square in central Helsinki.",
      "credit": "Vadelmavene / Wikimedia Commons (CC BY-SA 4.0)"
    },
    "edition": "Afternoon Edition · 12 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Herodotus and the mourning rites of ancient Egypt (Histories, Book II, 5th century BCE)",
        "excerpt": "The following is the way in which they conduct their mournings and their funerals:- On the death in any house of a man of consequence, forthwith the women of the family beplaster their heads, and sometimes even their faces, with mud; and then, leaving the body indoors, sally forth and wander through the city, with their dress fastened by a band, and their bosoms bare, beating themselves as they walk.",
        "source": "Herodotus, The Histories, Book II, trans. George Rawlinson (Wikisource)",
        "href": "https://en.wikisource.org/wiki/The_History_of_Herodotus_(Rawlinson)/Book_2"
      },
      {
        "category": "historical",
        "title": "Francois Bernier before the Taj Mahal, a mausoleum raised out of grief (Travels in the Mogul Empire, A.D. 1656-1668)",
        "excerpt": "...the mausoleum of Tage Mehale is an astonishing work. It is possible I may have imbibed an Indian taste; but I decidedly think that this monument deserves much more to be numbered among the wonders of the world than the pyramids of Egypt, those unshapen masses which when I had seen them twice yielded me no satisfaction.",
        "source": "Francois Bernier, Travels in the Mogul Empire, A.D. 1656-1668, trans. Archibald Constable (Internet Archive)",
        "href": "https://archive.org/details/travelsinmogulem00bernuoft"
      },
      {
        "category": "literary",
        "title": "Thomas Gray, 'Elegy Written in a Country Churchyard' (1751)",
        "excerpt": "Beneath those rugged elms, that yew-tree's shade,\nWhere heaves the turf in many a mouldering heap,\nEach in his narrow cell for ever laid,\nThe rude forefathers of the hamlet sleep.",
        "source": "Thomas Gray, Elegy Written in a Country Churchyard (Thomas Gray Archive)",
        "href": "https://www.thomasgray.org/texts/poems/elcc"
      },
      {
        "category": "literary",
        "title": "Walt Whitman's carol to death in 'When Lilacs Last in the Dooryard Bloom'd' (1865)",
        "excerpt": "Come lovely and soothing death,\nUndulate round the world, serenely arriving, arriving,\nIn the day, in the night, to all, to each,\nSooner or later delicate death.",
        "source": "Walt Whitman, Leaves of Grass (1891-92 'Deathbed' edition), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/1322/1322-h/1322-h.htm"
      },
      {
        "category": "artistic",
        "title": "Arnold Böcklin, 'Die Toteninsel' (Isle of the Dead), third version, 1883",
        "excerpt": "Böcklin's serene, dreamlike island rises from glassy dark water, a ring of pale rock-cut tombs enclosing a grove of towering black cypresses. A small boat carries a single upright figure draped in white toward the shore, a coffin at its feet, gliding into a hushed architecture built entirely for repose. The painter called it 'a picture for dreaming', and generations have read it as the archetype of a dignified, consoling house for the dead.",
        "source": "Arnold Böcklin, Die Toteninsel (Isle of the Dead), 1883, Alte Nationalgalerie, Berlin (Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Arnold_B%C3%B6cklin_-_Die_Toteninsel_III_(Alte_Nationalgalerie,_Berlin).jpg",
        "image": {
          "src": "/covers/verstas-helsinki-timber-mortuary--a4.png",
          "alt": "A lone white-clad figure is ferried across still, dark water toward a walled island of towering cypresses and pale rock-hewn tombs, under a hushed twilight sky.",
          "credit": "Arnold Böcklin, Die Toteninsel (Isle of the Dead), third version, 1883, Alte Nationalgalerie, Berlin. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Gabriel Fauré, Requiem in D minor, Op. 48, closing with 'In Paradisum' (1877-1893)",
        "excerpt": "Fauré called his Requiem a 'lullaby of death', deliberately turning away from terror and judgment toward tenderness and rest. It closes not with wrath but with 'In Paradisum', a shimmering, weightless prayer that angels lead the departed into paradise, the harp and voices rising like light through timber and stone. Like Verstas Architects' gentle mortuary, the work reframes death as consolation, a soft and dignified place of farewell rather than dread.",
        "source": "Gabriel Fauré, Requiem, Op. 48 (public-domain scores), IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Requiem,_Op.48_(Faur%C3%A9,_Gabriel)"
      }
    ],
    "rank": 11
  },
  {
    "slug": "noskova-wins-wimbledon",
    "headline": "Linda Noskova wins her first Grand Slam title at Wimbledon",
    "overview": "The Czech player Linda Noskova captured her maiden Grand Slam singles title at Wimbledon on July 12, 2026, regrouping after a nervous start to lift the trophy on tennis's most storied grass. The breakthrough crowns a fast-rising career on the sport's grandest stage. Noskova said a glimpse of the championship trophies during a bathroom break had helped her refocus at a decisive moment.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMilgFBVV95cUxPbGVFMkRELTVjOFZwLXJEUHZ1R2dqZmJ3S2w1WV83Nm56OGd2M2ZuLXdMazZIWElnUXIzVHBqR2tPbW5OMHl5NmlRQlp2OHRqNThZdkNIYms3MDY0TVQxOU0yVDRhQlJGU1JidEhPUktpbE1sVE5aT1JjN3Q5X1N4X0ExTnRySjNQck5xR093VHpyMlB0Mnc?oc=5"
      },
      {
        "name": "WTA",
        "href": "https://www.wtatennis.com/news/4533700/at-21-linda-noskova-caps-brilliant-fortnight-to-become-youngest-wimbledon-champion-in-15-years-defeats-karolina-muchova"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-12",
    "image": {
      "src": "/covers/noskova-wins-wimbledon.png",
      "alt": "Czech tennis player Linda Noskova on court during the 2023 US Open.",
      "credit": "Hameltion / Wikimedia Commons (CC BY-SA 4.0)"
    },
    "edition": "Afternoon Edition · 12 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The boy Alkimedon crowned with olive at Olympia (c. 460 BC), sung by Pindar in his Eighth Olympian Ode",
        "excerpt": "O mother of gold-crowned contests, Olympia, queen of truth; where men that are diviners observing burnt-offerings make trial of Zeus the wielder of white lightnings... Now the boy was fair to look upon, neither shamed he by his deeds his beauty, but in the wrestling match victorious made proclamation that his country was Aigina of long oars.",
        "source": "Pindar, Olympian Ode VIII, trans. Ernest Myers (1874), via Wikisource",
        "href": "https://en.wikisource.org/wiki/Odes_of_Pindar_(Myers)/Olympian_Odes/8"
      },
      {
        "category": "historical",
        "title": "Spencer Gore lifts the very first Wimbledon title on the club's new lawns, 1877 — the debut champion of a game not yet a fortnight old",
        "excerpt": "On 19 July 1877, before a few hundred spectators at the All England Croquet and Lawn Tennis Club, a 27-year-old rackets player named Spencer Gore beat William Marshall 6-1, 6-2, 6-4 to win the world's first official lawn tennis tournament. Twenty-two men had each paid a guinea to enter; Gore carried off twelve guineas and a silver challenge cup, and in doing so became the first name inscribed on a trophy that would grow into sport's most storied grass-court crown.",
        "source": "The 1877 Wimbledon Championship, Wikipedia",
        "href": "https://en.wikipedia.org/wiki/1877_Wimbledon_Championship"
      },
      {
        "category": "literary",
        "title": "Apollo consecrates the laurel to victory — the mythic origin of the champion's wreath (Ovid, Metamorphoses, Book I)",
        "excerpt": "Although thou canst not be my bride, thou shalt be called my chosen tree, and thy green leaves, O Laurel! shall forever crown my brows, be wreathed around my quiver and my lyre; the Roman heroes shall be crowned with thee, as long processions climb the Capitol and chanting throngs proclaim their victories; and as a faithful warden thou shalt guard the civic crown of oak leaves fixed between thy branches, and before Augustan gates. And as my youthful head is never shorn, so, also, shalt thou ever bear thy leaves unchanging to thy glory.",
        "source": "Ovid, Metamorphoses, Book I (Apollo and Daphne), trans. Brookes More (1922), via Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0028:book=1:card=525"
      },
      {
        "category": "literary",
        "title": "John Keats, awed and trembling beneath the laurel sprigs set upon his 'ambitious head' — a young poet's first crown",
        "excerpt": "Minutes are flying swiftly; and as yet / Nothing unearthly has enticed my brain / Into a delphic labyrinth — I would fain / Catch an unmortal thought to pay the debt / I owe to the kind poet who has set / Upon my ambitious head a glorious gain — / Two bending laurel sprigs — 'tis nearly pain / To be conscious of such a coronet. / Still time is fleeting, and no dream arises / Gorgeous as I would have it — only I see / A trampling down of what the world most prizes, / Turbans and crowns, and blank regality; / And then I run into most wild surmises / Of all the many glories that may be.",
        "source": "John Keats, 'On Receiving a Laurel Crown from Leigh Hunt' (1816-17), via Mapping Keats's Progress (Univ. of Victoria)",
        "href": "https://johnkeats.uvic.ca/poem_on_receiving_a_laurel_crown_from.html"
      },
      {
        "category": "artistic",
        "title": "Frank Dicksee, 'Victory, a Knight Being Crowned with a Laurel-Wreath' — the moment the winner receives the ultimate laurel",
        "excerpt": "A young armoured knight kneels or stands at the height of his triumph while the laurel wreath is lowered onto his brow, the emblem of victory pressed at last upon the deserving head. Dicksee, a Victorian master of romantic pageantry, freezes exactly the instant a challenger becomes a champion — the crowd, the wreath, and the crowning gesture all bent toward the newly made victor.",
        "source": "Frank Bernard Dicksee (1853-1928), oil painting, public domain, via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Dicksee-Victory,_A_Knight_Being_Crowned_With_A_Laurel-Wreath.jpg",
        "image": {
          "src": "/covers/noskova-wins-wimbledon--a4.png",
          "alt": "A triumphant young knight in armour is crowned with a green laurel wreath, the classic emblem of victory lowered onto the champion's head.",
          "credit": "Frank Bernard Dicksee (1853-1928), 'Victory, a Knight Being Crowned with a Laurel-Wreath', public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Elgar, 'Pomp and Circumstance' March No. 1 in D (Op. 39) — the broad, cresting melody that has become the world's sound of triumphal procession",
        "excerpt": "Elgar's grandest march builds from a striding, ceremonial opening to the soaring central 'Land of Hope and Glory' theme, music written for pageantry and coronation and ever since bound to moments of arrival and honour. It is the swelling, unhurried majesty of a champion walking out to be crowned, the crowd rising as the melody lifts toward its blaze of brass.",
        "source": "Edward Elgar, Pomp and Circumstance Military Marches, Op. 39, No. 1 (1901); full scores public domain via IMSLP",
        "href": "https://imslp.org/wiki/Pomp_and_Circumstance,_Op.39_(Elgar,_Edward)"
      }
    ],
    "rank": 12
  },
  {
    "slug": "cuba-islandwide-blackout-grid",
    "headline": "An islandwide blackout strikes Cuba for the second time in a week as its power grid crumbles",
    "overview": "Cuba was plunged into a nationwide blackout for the second time in a week on July 11, 2026 as its aging, fuel-starved power grid failed again, leaving millions without electricity. Chronic fuel shortages and decrepit thermoelectric plants have pushed the island's system to the brink of collapse. The repeated failures have deepened hardship and public frustration across the country.",
    "genre": "Climate",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMijwFBVV95cUxPSDM2dE5Jck56TlEtSHVlM1pMUmN1UkpqdVFiSkZteWROMWoxQmduVl9FSnUxTGsxajRKOW9DMFBkMS1DdGU4ZjJ4S3JKcUloSTNSU05WcUFQMnRfNFpYNEJDWXlRNm5peWVnTEhTWjZIM0RVTmdvWjVodzFoMldBVmgtdEhqaHJ2VU1lQks4bw?oc=5"
      },
      {
        "name": "Al Jazeera",
        "href": "https://www.aljazeera.com/news/2026/7/10/cuba-suffers-second-island-wide-blackout-in-a-week-amid-trump-fuel-blockade"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-12",
    "image": {
      "src": "/covers/cuba-islandwide-blackout-grid.png",
      "alt": "The rooftops and streets of Old Havana glowing under scattered lights at night.",
      "credit": "Gabriel Rodriguez / Wikimedia Commons (CC BY-SA 2.0)"
    },
    "edition": "Afternoon Edition · 12 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The dimmed sun of 536 AD: a year the light failed over the ancient world",
        "excerpt": "For the sun gave forth its light without brightness, like the moon, during this whole year, and it seemed exceedingly like the sun in eclipse, for the beams it shed were not clear nor such as it is accustomed to shed. And from the time when this thing happened men were free neither from war nor pestilence nor any other thing leading to death.",
        "source": "Procopius, History of the Wars, Book IV (The Vandalic War), ch. 14 (6th century AD; H. B. Dewing trans., Loeb Classical Library)",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Procopius/Wars/4D*.html"
      },
      {
        "category": "historical",
        "title": "New York's Night of Terror: the 1977 blackout that swallowed a city whole",
        "excerpt": "At 9:34 on the sweltering night of July 13, 1977, lightning strikes toppled New York City's power grid and plunged eight million people into darkness for some twenty-five hours. Where the earlier 1965 outage had passed in orderly calm, this one detonated a city already frayed by fiscal crisis, heat, and fear: arsonists set more than a thousand fires and looters stripped roughly 1,600 stores before the lights returned. The blackout became a lasting emblem of a metropolis pushed to the edge, its fragile systems and its social order failing together in the dark.",
        "source": "New York City blackout of 1977 (July 13-14, 1977)",
        "href": "https://en.wikipedia.org/wiki/New_York_City_blackout_of_1977"
      },
      {
        "category": "literary",
        "title": "The plague of thick darkness over Egypt: a darkness which may be felt",
        "excerpt": "And the LORD said unto Moses, Stretch out thine hand toward heaven, that there may be darkness over the land of Egypt, even darkness which may be felt. And Moses stretched forth his hand toward heaven; and there was a thick darkness in all the land of Egypt three days: They saw not one another, neither rose any from his place for three days: but all the children of Israel had light in their dwellings.",
        "source": "Exodus 10:21-23, King James Version (1611)",
        "href": "https://www.biblegateway.com/passage/?search=Exodus%2010%3A21-23&version=KJV"
      },
      {
        "category": "literary",
        "title": "Byron's \"Darkness\": the bright sun extinguished and a world groping toward its end",
        "excerpt": "I had a dream, which was not all a dream.\nThe bright sun was extinguish'd, and the stars\nDid wander darkling in the eternal space,\nRayless, and pathless, and the icy earth\nSwung blind and blackening in the moonless air;\nMorn came and went--and came, and brought no day,\nAnd men forgot their passions in the dread\nOf this their desolation; and all hearts",
        "source": "Lord Byron (George Gordon), \"Darkness\" (1816), lines 1-8",
        "href": "https://rpo.library.utoronto.ca/content/darkness"
      },
      {
        "category": "artistic",
        "title": "Georges de La Tour, \"The Magdalen with the Smoking Flame\": a single flame against the encroaching dark",
        "excerpt": "In this candlelit night scene of around 1640, Georges de La Tour lets one small flame do battle with an ocean of blackness. The Magdalen sits before a guttering lamp, her hand resting on a skull, the light licking her face and hands while everything beyond dissolves into shadow. It is a painting about the fragility of light itself: how a whole visible world can shrink to the reach of a single trembling flame, and how the dark presses in the moment that flame falters.",
        "source": "Georges de La Tour, \"The Magdalen with the Smoking Flame,\" c. 1640, oil on canvas, Los Angeles County Museum of Art",
        "href": "https://commons.wikimedia.org/wiki/File:Georges_de_La_Tour_-_The_Magdalen_with_the_Smoking_Flame_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/cuba-islandwide-blackout-grid--a4.png",
          "alt": "A woman sits in near-total darkness beside a single guttering candle flame, its light falling on her face, hands, and a skull while the rest of the room dissolves into black.",
          "credit": "Georges de La Tour, \"The Magdalen with the Smoking Flame,\" c. 1640, Los Angeles County Museum of Art; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Haydn's \"Farewell\" Symphony: the lights snuffed out one by one until the stage goes dark",
        "excerpt": "Composed in 1772, Joseph Haydn's Symphony No. 45 in F-sharp minor ends with one of music's most theatrical acts of vanishing. In the closing Adagio the players finish their lines one by one, each blowing out the candle on his music stand and walking off, until only two muted violins remain in the near-dark. Written so Haydn's musicians could plead to leave their prince's remote palace, the \"Farewell\" turns the extinguishing of lights into the very substance of the piece, a slow descent into darkness and departure.",
        "source": "Joseph Haydn, Symphony No. 45 in F-sharp minor, Hob. I:45, \"Farewell\" (Abschiedssymphonie), 1772 (score, IMSLP)",
        "href": "https://imslp.org/wiki/Symphony_No.45_in_F-sharp_minor,_Hob.I:45_(Haydn,_Joseph)"
      }
    ],
    "rank": 13
  },
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
    "rank": 14
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
    "rank": 15
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
    "rank": 16
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
    "rank": 17
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
    "rank": 18
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
    "rank": 19
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
    "rank": 20
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
    "rank": 21
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
    "rank": 22
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
    "rank": 23
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
    "rank": 24
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
    "rank": 25
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
    "rank": 26
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
    "rank": 27
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
    "rank": 28
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
    "rank": 29
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
    "rank": 30
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
    "rank": 31
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
    "rank": 32
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
    "rank": 33
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
    "rank": 34
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
    "rank": 35
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
    "rank": 36
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
    "rank": 37
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
    "rank": 38
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
