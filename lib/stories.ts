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
// the Afternoon Edition of 29 June 2026 (ranks 1-13) leads with its hero story,
// followed by the Morning Edition of 29 June and the Evening Edition of 28 June 2026.
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
    "slug": "scotus-late-mail-ballots",
    "headline": "US Supreme Court rules states may count mail ballots arriving after Election Day, rejecting a Trump-led challenge",
    "overview": "The US Supreme Court ruled that states may continue to count mail-in ballots that arrive after Election Day as long as they are postmarked by the deadline, turning back a challenge led by President Trump and Republican allies. The decision preserves the ballot grace periods used by roughly 18 states and is a setback for the campaign to tighten voting rules.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMipwFBVV95cUxObER1b0drcGJvbnk2Y0xMMDExU1RJb3M0aWpyUThPUXNPelVoamdYdUo0dmdkcWJmdmdLal9MTHBUN3pwTkZEcVlCdmRHbU44S09JTlA5YUhseDJOS2tvbGptenlEX3JHZ1hxRlBOQ09vcDdJYVoxRldienZLMkE4Vk03NllQNDVYUTA1REQ1M0FrRk0ySnJ3TDVpZU4tUEZicGMxTW9BTQ?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMingFBVV95cUxON0xMTS1IWWpkQnlfbXk4N1lQakV1ZjZzNnctTFIwM0UzRlhRMnItR1ltWDlvWUxmZ1dUZzBIa1RRbTN1Z0MtTV9XMVFoeU1hcE5YODIxbEREWnNIOXlYRkhLUmUwWVUxMmIwMDVyMVdNQk9YNXhfa3FLcUxFdl9QdGJwVWhJMXZacEN4MUwzOWRvUU9yNWlZQ2stbURnUQ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-30",
    "image": {
      "src": "/covers/scotus-late-mail-ballots.png",
      "alt": "The marble west facade and columns of the United States Supreme Court building",
      "credit": "Wikimedia Commons"
    },
    "lead": true,
    "edition": "Morning Edition · 30 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "South Carolina v. Katzenbach (1966): the Court turns back a state's challenge to a voting law",
        "excerpt": "The Voting Rights Act was designed by Congress to banish the blight of racial discrimination in voting, which has infected the electoral process in parts of our country for nearly a century. Congress felt itself confronted by an insidious and pervasive evil which had been perpetuated in certain parts of our country through unremitting and ingenious defiance of the Constitution.",
        "source": "Chief Justice Earl Warren, majority opinion, South Carolina v. Katzenbach, 383 U.S. 301 (1966), official U.S. Reports as digitized by the Library of Congress.",
        "href": "https://tile.loc.gov/storage-services/service/ll/usrep/usrep383/usrep383301/usrep383301.pdf"
      },
      {
        "category": "historical",
        "title": "Frederick Douglass, \"An Appeal to Congress for Impartial Suffrage\" (1867)",
        "excerpt": "The fundamental and unanswerable argument in favor of the enfranchisement of the negro is found in the undisputed fact of his manhood. He is a man, and by every fact and argument by which any man can sustain his right to vote, the negro can sustain his right equally. It is plain that, if the right belongs to any, it belongs to all. The doctrine that some men have no rights that others are bound to respect, is a doctrine which we must banish as we have banished slavery, from which it emanated.",
        "source": "Frederick Douglass, \"An Appeal to Congress for Impartial Suffrage,\" The Atlantic Monthly (January 1867), transcribed at Wikisource.",
        "href": "https://en.wikisource.org/wiki/Appeal_to_Congress_for_Impartial_Suffrage"
      },
      {
        "category": "literary",
        "title": "Walt Whitman, \"Election Day, November, 1884\"",
        "excerpt": "If I should need to name, O Western World, your powerfulest scene and show,\n'Twould not be you, Niagara--nor you, ye limitless prairies--nor your huge rifts of canyons, Colorado,\nNor you, Yosemite--nor Yellowstone, with all its spasmic geyser-loops ascending to the skies, appearing and disappearing,\nNor Oregon's white cones--nor Huron's belt of mighty lakes--nor Mississippi's stream:\n--This seething hemisphere's humanity, as now, I'd name--the still small voice vibrating--America's choosing day,\n(The heart of it not in the chosen--the act itself the main, the quadriennial choosing,)\nThe stretch of North and South arous'd--sea-board and inland--Texas to Maine--the Prairie States--Vermont, Virginia, California,\nThe final ballot-shower from East to West--the paradox and conflict,\nThe countless snow-flakes falling--(a swordless conflict,\nYet more than all Rome's wars of old, or modern Napoleon's:) the peaceful choice of all,\nOr good or ill humanity--welcoming the darker odds, the dross:\n--Foams and ferments the wine? it serves to purify--while the heart pants, life glows:\nThese stormy gusts and winds waft precious ships,\nSwell'd Washington's, Jefferson's, Lincoln's sails.",
        "source": "Walt Whitman, \"Election Day, November, 1884,\" Leaves of Grass (\"Sands at Seventy\" annex), Project Gutenberg eBook #1322.",
        "href": "https://www.gutenberg.org/cache/epub/1322/pg1322.txt"
      },
      {
        "category": "literary",
        "title": "Aeschylus, \"Eumenides\": the count of the ballots decides legitimacy",
        "excerpt": "It is my duty to give the final judgment and I shall cast my vote for Orestes. For there was no mother who gave me birth; and in all things, except for marriage, whole-heartedly I am for the male and entirely on the father's side. Therefore, I will not award greater honor to the death of a woman who killed her husband, the master of the house. Orestes wins, even if the vote comes out equal.",
        "source": "Aeschylus, Eumenides, lines 734-741, trans. Herbert Weir Smyth (1926), Perseus Digital Library, Tufts University.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0006%3Acard%3D734"
      },
      {
        "category": "artistic",
        "title": "La Marseillaise (Claude-Joseph Rouget de Lisle, 1792) — MUSIC",
        "excerpt": "Born in Strasbourg in the spring of 1792, Rouget de Lisle's anthem became the marching voice of a people insisting that sovereignty belongs to the many, not the few. Its surging, ascending opening and its hammering refrain turn an ordinary crowd into a single body politic laying claim to its rights against those who would deny them. The melody's defiance maps onto the event's stakes: ordinary citizens, including the latecomer whose envelope is postmarked in time, demanding that their voice be admitted to the count rather than turned away at the door.",
        "source": "Claude-Joseph Rouget de Lisle, La Marseillaise (1792), scores and editions hosted at IMSLP / Petrucci Music Library.",
        "href": "https://imslp.org/wiki/La_Marseillaise_(Rouget_de_Lisle,_Claude-Joseph)"
      },
      {
        "category": "artistic",
        "title": "George Caleb Bingham, \"The County Election\" (1852) — VISUAL ARTWORK",
        "excerpt": "Bingham crowds his canvas with the whole untidy machinery of democracy: men climbing the courthouse steps to cast their votes, a clerk swearing in a voter, an official tallying the result, idlers and drinkers and arguers at the edges. Above the scene hangs a banner reading \"The Will of the People[,] The Supreme Law\" -- the very principle the Court vindicated when it refused to discard ballots that arrived in good faith and on time. The painting insists that an election is messy, inclusive, and human, and that the count is sacred precisely because every ordinary person in the crowd is entitled to be in it.",
        "source": "George Caleb Bingham, The County Election (oil on canvas, 1852), Saint Louis Art Museum; image via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:George_Caleb_Bingham_-_The_County_Election.jpg",
        "image": {
          "src": "/covers/scotus-late-mail-ballots--art.png",
          "alt": "George Caleb Bingham's 1852 painting The County Election, showing a crowd of nineteenth-century American men gathered at a courthouse to vote, with a banner reading 'The Will of the People The Supreme Law.'",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 1
  },
  {
    "slug": "yen-40-year-low",
    "headline": "Japanese yen falls to a 40-year low against the dollar as markets watch for intervention",
    "overview": "The Japanese yen slid to its weakest level against the US dollar in about 40 years, pressuring Tokyo to consider intervening in currency markets to halt the decline. The slump reflects a wide gap between Japanese and US interest rates and has raised the cost of imports for Japanese households and firms.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiogFBVV95cUxQUXZ6T3FUR1VKRXVTa05UdkplVkhySmRiWGhZaGpFV1VPYVBEeGpMMDlMM1RTT0E2SFdEc0REN3NReGc5ZkNvNmxWbHJjSVFtdTFFaVU1WXJFRWVqZlNyRWpjWVZEOFNXRUdqdEktRW9ZQnc1Zy1EMTRPZHdWdFlyZC1PUzdlY3JsMEJNS2ZFU0RUMWNoX0Z3emF2czV1MEZNOVE?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMigAFBVV95cUxPYUFwVXVYYUk3ZXZGYUhac1BmQjhYN1JiSHM5SlhvWW9taHVTRkFZeVlrNFVfTl8wQVY0VTc3ekNEd1EyX2NMYjdNZXFwWi1WMFJWTHVIaE8yNTNNVWR4NkFHelBmSFlwYWdjRTZQREo4elhtYnNhZ3RMMjg2ckttSw?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-30",
    "image": {
      "src": "/covers/yen-40-year-low.png",
      "alt": "A fan of Japanese yen banknotes",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 30 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Pliny the Elder on the debasement of the Roman denarius",
        "excerpt": "The triumvir Antonius alloyed the silver denarius with iron, and forgers put an alloy of copper in silver coins, while others also reduce the weight, the proper coinage being 84 denarii from a pound of silver. Consequently a method was devised of assaying the denarius, under a law that was so popular that the common people unanimously district by district voted statues to Marius Gratidianus. And it is a remarkable thing that in this alone among arts spurious methods are objects of study, and a sample of a forged denarius is carefully examined and the adulterated coin is bought for more than genuine ones.",
        "source": "Pliny the Elder, Natural History, Book XXXIII (on metals), section 132, English translation hosted at Attalus.org (after the Loeb Classical Library)",
        "href": "https://www.attalus.org/translate/pliny_hn33b.html"
      },
      {
        "category": "historical",
        "title": "The Weimar Reichsbanknote of 1923: a currency that melted away",
        "excerpt": "This 100,000-mark Reichsbanknote, issued by the Reichsbankdirektorium during Germany's 1923 hyperinflation, is the tangible residue of a currency losing value almost by the hour. As the mark collapsed against the dollar, denominations leapt from thousands to billions within weeks, wages were spent before they could lose worth, and savings evaporated. It is the modern archetype of the anxiety now stalking Tokyo: a weakening currency that quietly transfers a nation's wealth out of the pockets of households and into the gap between domestic money and the world's reserve standard.",
        "source": "Weimar Germany Reichsbanknote, 100,000 mark (1923), object record, United States Holocaust Memorial Museum Collections",
        "href": "https://collections.ushmm.org/search/catalog/irn524941"
      },
      {
        "category": "literary",
        "title": "Aristophanes, The Frogs: the good old coin driven out by the base new",
        "excerpt": "Many times it seems to us the city has done the same thing with the best and the brightest of its citizens as with the old coinage and the new gold currency. For these, not counterfeit at all, but the finest it seems of all coins, and the only ones of the proper stamp, of resounding metal amongst Greeks and foreigners everywhere, we never use, but the inferior bronze ones instead, minted just yesterday or the day before with the basest stamp.",
        "source": "Aristophanes, The Frogs, lines 718ff., trans. Matthew Dillon, Perseus Digital Library (Tufts University)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0032:card%3D718"
      },
      {
        "category": "literary",
        "title": "Goethe, Faust Part II: paper money conjured from buried gold",
        "excerpt": "[ Reads. \"Be it to all whom it concerneth known, This note is worth a thousand crowns alone, And, for a guarantee, the wealth untold, Throughout the empire buried, it doth hold. Means are on foot this treasure bare to lay, And out of it the guarantee to pay.\" EMPEROR. Crime I surmise, some monstrous fraud. Oh, shame! Who dared to counterfeit the Emperor's name?",
        "source": "Johann Wolfgang von Goethe, Faust, Part II, Act I, Scene IV (Pleasure-garden), trans. Anna Swanwick, in The Works of J. W. von Goethe, Vol. 7, hosted at Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Works_of_J._W._von_Goethe/Volume_7/Faust,_Part_II/Act_I,_Scene_IV"
      },
      {
        "category": "artistic",
        "title": "Richard Wagner, Das Rheingold (MUSIC): gold, greed, and the price of power",
        "excerpt": "Wagner's Das Rheingold opens with a shimmering river and the pure gold at its bottom, then turns on a fateful bargain: only by renouncing love can the Rhinegold be forged into a ring of limitless power. The opera dramatizes wealth detached from human worth, the curse it carries, and the way a hoard's value rests on collective belief and fear. It is a fitting overture to a world watching one currency's worth drain toward another, where money's power and money's anxiety are two faces of the same gleaming metal.",
        "source": "Richard Wagner, Das Rheingold, WWV 86A (1869), full orchestral score, IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Das_Rheingold,_WWV_86A_(Wagner,_Richard)"
      },
      {
        "category": "artistic",
        "title": "Quentin Matsys, The Moneylender and His Wife (VISUAL ARTWORK)",
        "excerpt": "Quentin Matsys's 1514 panel shows a moneychanger weighing gold coins on a delicate balance while his wife, a prayer book open before her, lets her gaze drift from the Scriptures to the glinting metal. The convex mirror at the table's edge reflects another world beyond the counting of money. It is a quiet meditation on weighing value, the lure of gold over paper and piety alike, and the human anxiety that gathers around a currency's true worth, the same anxiety now measured in Tokyo by the yen on the scales against the dollar.",
        "source": "Quentin Matsys, The Moneylender and His Wife (also called The Money Changer and His Wife), 1514, oil on panel, Musee du Louvre, Paris (INV 1444); reproduction via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Massysm_Quentin_%E2%80%94_The_Moneylender_and_his_Wife_%E2%80%94_1514.jpg",
        "image": {
          "src": "/covers/yen-40-year-low--art.png",
          "alt": "Renaissance oil painting of a moneylender weighing gold coins on a balance scale while his wife, holding a prayer book, watches the gold; coins, pearls, and a convex mirror lie on the table.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 2
  },
  {
    "slug": "uber-waymo-end-phoenix-robotaxi",
    "headline": "Uber and Waymo end their robotaxi partnership in Phoenix after three years",
    "overview": "Uber and Alphabet's Waymo have ended the Phoenix robotaxi partnership they began in 2023, with Waymo folding the vehicles back into its own fleet as Uber prepares to name a new self-driving partner in the city. The two companies said they will keep collaborating in Austin and Atlanta.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMikgFBVV95cUxOVFhWSHl4RkpSamZpOGZXRnNLNUVuQnZzTFRBSHpxX2hrQzBnRk9iOW5jbnMzZ3FleFlTb1BtM18temswYW5Hc2F1Zy1FQkhwVzlMQ0E4U0RpYmR3eENaX2JDajhzbFJsT281V1FRMGdobzVtS2JYT2ZXUE9aRnp5VFpnWFlDN2NWYVBwSHkwX3JSUQ?oc=5"
      },
      {
        "name": "TechCrunch",
        "href": "https://techcrunch.com/2026/06/29/waymo-and-uber-quietly-part-ways-in-phoenix/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-30",
    "image": {
      "src": "/covers/uber-waymo-end-phoenix-robotaxi.png",
      "alt": "A white self-driving car fitted with roof-mounted sensors on a city street",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 30 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Luddites and the proclamation of \"King Ludd\" (1811-1812)",
        "excerpt": "any Person found out, in so doing or attempting to give any information, will be Punish'd with death ... Death (by order of King Lud)",
        "source": "Threatening letter signed \"by order of King Lud,\" 23 December 1811; transcribed in \"The proclamation of Ned Ludd,\" The National Archives (UK), Explore the Collection.",
        "href": "https://www.nationalarchives.gov.uk/explore-the-collection/stories/the-proclamation-of-ned-ludd/"
      },
      {
        "category": "historical",
        "title": "The Molotov-Ribbentrop Pact: an alliance of rivals that did not last (1939)",
        "excerpt": "Both High Contracting Parties obligate themselves to desist from any act of violence, any aggressive action, and any attack on each other, either individually or jointly with other powers. Should one of the High Contracting Parties become the object of belligerent action by a third power, the other High Contracting Party shall in no manner lend its support to this third power.",
        "source": "Treaty of Non-Aggression Between Germany and the Union of Soviet Socialist Republics, Articles I and II, signed Moscow, 23 August 1939; The Avalon Project, Yale Law School.",
        "href": "https://avalon.law.yale.edu/20th_century/nonagres.asp"
      },
      {
        "category": "literary",
        "title": "Homer's self-moving tripods of Hephaestus (Iliad, Book 18)",
        "excerpt": "Golden wheels had he set beneath the base of each that of themselves they might enter the gathering of the gods at his wish and again return to his house, a wonder to behold.",
        "source": "Homer, Iliad 18.373-377, A. T. Murray translation (Loeb), hosted at the Perseus Digital Library, Tufts University.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0134:book=18:card=368"
      },
      {
        "category": "literary",
        "title": "Karel Capek, R.U.R. (Rossum's Universal Robots), 1920",
        "excerpt": "FABRY. For work, Miss Glory. One Robot can replace two and a half workmen. The human machine, Miss Glory, was terribly imperfect. It had to be removed sooner or later.",
        "source": "Karel Capek, R.U.R. (Rossum's Universal Robots), trans. Paul Selver and Nigel Playfair, Act One; Project Gutenberg eBook #59112.",
        "href": "https://www.gutenberg.org/files/59112/59112-h/59112-h.htm"
      },
      {
        "category": "artistic",
        "title": "Arthur Honegger, Pacific 231 (Mouvement symphonique No. 1), 1923 (MUSIC)",
        "excerpt": "Honegger's orchestral movement begins as a vast metal body stirring from rest, then accelerates into a relentless mechanical surge before slowing again to a halt. The composer insisted it was not literal train-painting but the pure sensation of a machine in motion, a contraption that seems to drive itself. Honegger called locomotives living creatures he loved as others love horses, which makes the work an uncanny mirror of the robotaxi: the horseless carriage given a will of its own, thrilling and faintly menacing in the same breath.",
        "source": "Arthur Honegger, Pacific 231, H.53 (Mouvement symphonique No. 1), 1923; full score (Maurice Senart, Paris, 1924), public domain, hosted at IMSLP / Petrucci Music Library.",
        "href": "https://imslp.org/wiki/Pacific_231,_H.53_(Honegger,_Arthur)"
      },
      {
        "category": "artistic",
        "title": "Umberto Boccioni, Unique Forms of Continuity in Space (1913) (VISUAL ARTWORK)",
        "excerpt": "Boccioni's striding bronze figure is part man and part machine, its flesh streaming backward into aerodynamic blades as if speed itself were reshaping the body. The Futurists worshipped the autonomous, self-propelled machine as a new kind of being, and this faceless walker captures both the dream and the dread of it: a figure surging forward under its own momentum, no longer quite human, a fitting emblem for the driverless car set loose to move through the city on its own.",
        "source": "Umberto Boccioni (1882-1916), Forme uniche della continuita nello spazio (Unique Forms of Continuity in Space), 1913, bronze; The Metropolitan Museum of Art, New York (open access). File via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Unique_Forms_of_Continuity_in_Space_MET_DT6411.jpg",
        "image": {
          "src": "/covers/uber-waymo-end-phoenix-robotaxi--art.png",
          "alt": "Bronze Futurist sculpture by Umberto Boccioni of a striding, faceless figure whose body streams backward into flame-like, machine-like forms, conveying motion and speed.",
          "credit": "The Metropolitan Museum of Art / Wikimedia Commons"
        }
      }
    ],
    "rank": 3
  },
  {
    "slug": "paraguay-knock-germany-out-world-cup",
    "headline": "Paraguay knock Germany out of the World Cup on penalties in the tournament's biggest upset",
    "overview": "Paraguay beat Germany in a penalty shootout to reach the World Cup last 16, the biggest upset of the 2026 tournament and a shock elimination for one of the competition's traditional powers. The match finished level before Paraguay held their nerve from the spot.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMilwFBVV95cUxONk50SzZjeVRjeVNKSlFMbUdCbUI0NXBCa0p4cjF6VXlaVWxxQmFnSjFZdnpVWVF5Y200M0M0cThxd3hPNzhxVndFUWZ1N1pfdkJ4TXZkVDBGTWJic1hGQ1d6VmtackxVaWNtNzNESGVNdVg4QkNqY0UwMUlJZFduakFWZC05X1BPaUpCWGhIeG1mSEdua2pB?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMirAFBVV95cUxQUTBhTjhSZlFZVWs0Q3dGVlVsUlF5WWFqYlRMa29Lek1TT0ZhcGNYdFozbDhvLWpNeUZuMkpoaXZlX19TVzlrWFVtNnMtaHlYOFhvbUhUNUw3S1VMZ0JtUkZMeGFnR09tMzl6bDhnSTJVSjlQbTBoYk5sYlhNekdvQXk2dkNZYUpNRjl5Z3A1TlNLdi1MdlBOazRqRFR2REpNNV8wc3FmT0xpZmZC?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-30",
    "image": {
      "src": "/covers/paraguay-knock-germany-out-world-cup.png",
      "alt": "A floodlit football stadium at night with a brilliant green pitch",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 30 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Athenians charge the Persian host at Marathon (490 BC)",
        "excerpt": "And when they had been arranged in their places and the sacrifices proved favourable, then the Athenians were let go, and they set forth at a run to attack the Barbarians. Now the space between the armies was not less than eight furlongs: and the Persians seeing them advancing to the attack at a run, made preparations to receive them; and in their minds they charged the Athenians with madness which must be fatal, seeing that they were few and yet were pressing forwards at a run, having neither cavalry nor archers. Such was the thought of the Barbarians; but the Athenians when all in a body they had joined in combat with the Barbarians, fought in a memorable fashion: for they were the first of all the Hellenes about whom we know who went to attack the enemy at a run, and they were the first also who endured to face the Median garments and the men who wore them, whereas up to this time the very name of the Medes was to the Hellenes a terror to hear.",
        "source": "Herodotus, The History of Herodotus, Book VI.112, trans. G. C. Macaulay, hosted at Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_History_of_Herodotus_(Macaulay)/Book_VI"
      },
      {
        "category": "historical",
        "title": "The fall of mighty Athens in Sicily (413 BC)",
        "excerpt": "This was the greatest Hellenic achievement of any in this war, or, in my opinion, in Hellenic history; at once most glorious to the victors, and most calamitous to the conquered. They were beaten at all points and altogether; all that they suffered was great; they were destroyed, as the saying is, with a total destruction, their fleet, their army, everything was destroyed, and few out of many returned home. Such were the events in Sicily.",
        "source": "Thucydides, History of the Peloponnesian War, Book VII (conclusion of the Sicilian Expedition), trans. Richard Crawley, Project Gutenberg eBook #7142.",
        "href": "https://www.gutenberg.org/files/7142/7142-h/7142-h.htm"
      },
      {
        "category": "literary",
        "title": "David slays Goliath with a sling and a stone (1 Samuel 17)",
        "excerpt": "Then said David to the Philistine, Thou comest to me with a sword, and with a spear, and with a shield: but I come to thee in the name of the LORD of hosts, the God of the armies of Israel, whom thou hast defied. This day will the LORD deliver thee into mine hand; and I will smite thee, and take thine head from thee; and I will give the carcases of the host of the Philistines this day unto the fowls of the air, and to the wild beasts of the earth; that all the earth may know that there is a God in Israel. And David put his hand in his bag, and took thence a stone, and slang it, and smote the Philistine in his forehead, that the stone sunk into his forehead; and he fell upon his face to the earth. So David prevailed over the Philistine with a sling and with a stone, and smote the Philistine, and slew him; but there was no sword in the hand of David.",
        "source": "The Bible, King James Version, 1 Samuel 17:45-46, 49-50, hosted at Wikisource.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/1_Samuel"
      },
      {
        "category": "literary",
        "title": "Antilochus dares the narrow ground to overtake Menelaus (Iliad, Book 23)",
        "excerpt": "Presently Antilochus saw a narrow place where the road had sunk. The ground was broken, for the winter's rain had gathered and had worn the road so that the whole place was deepened. Menelaus was making towards it so as to get there first, for fear of a foul, but Antilochus turned his horses out of the way, and followed him a little on one side. The son of Atreus was afraid and shouted out, \"Antilochus, you are driving recklessly; rein in your horses; the road is too narrow here, it will be wider soon, and you can pass me then; if you foul my chariot you may bring both of us to a mischief.\" But Antilochus plied his whip, and drove faster, as though he had not heard him.",
        "source": "Homer, The Iliad, Book XXIII (the funeral games and chariot race of Patroclus), trans. Samuel Butler, hosted at Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_Iliad_(Butler)/Book_XXIII"
      },
      {
        "category": "artistic",
        "title": "MUSIC: \"See, the Conqu'ring Hero Comes\" from Handel's Judas Maccabaeus (HWV 63)",
        "excerpt": "Handel's triumphal chorus from the oratorio Judas Maccabaeus greets the unexpected victor returning from the field; its mounting trumpets and the swelling answer of the crowd capture the roar that follows an underdog's triumph. Borrowed and reborrowed ever since as the anthem of the conquering hero, it is the sound of a giant felled and a smaller champion chaired by an exultant throng, the exact emotional pitch of Paraguay's players mobbed at the final spot-kick.",
        "source": "George Frideric Handel, Judas Maccabaeus, HWV 63, Act III, No. 35 chorus \"See, the conqu'ring hero comes!\", full scores and parts hosted at IMSLP / Petrucci Music Library.",
        "href": "https://imslp.org/wiki/Judas_Maccabaeus,_HWV_63_(Handel,_George_Frideric)"
      },
      {
        "category": "artistic",
        "title": "VISUAL ARTWORK: Caravaggio, David with the Head of Goliath",
        "excerpt": "Caravaggio paints the aftermath of the upset: the slight young David, sword still in hand, lifting aloft the severed head of the giant who only moments before towered over the field. The picture's stark light and the felled colossus distil the theme of the favourite brought down by nerve and a single decisive blow, the smaller figure quietly carrying the day against overwhelming odds.",
        "source": "Michelangelo Merisi da Caravaggio, David and Goliath (David with the Head of Goliath), c. 1600, oil on canvas; image via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:David_and_Goliath_by_Caravaggio.jpg",
        "image": {
          "src": "/covers/paraguay-knock-germany-out-world-cup--art.png",
          "alt": "Caravaggio painting of the youthful David standing over and holding up the severed head of the giant Goliath, sword in his other hand, against a dark background.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 4
  },
  {
    "slug": "uganda-army-shuts-media",
    "headline": "Uganda's military chief orders soldiers to shut down the Daily Monitor and NTV",
    "overview": "Ugandan military chief Gen. Muhoozi Kainerugaba, the son of President Yoweri Museveni, deployed soldiers to close the Daily Monitor newspaper and the NTV broadcaster, along with other Nation Media Group outlets in Kampala. Kainerugaba said on social media that he does not believe in a free press and claimed the authority to close any media house.",
    "genre": "Politics",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cj9gyk1z7ngo"
      },
      {
        "name": "Al Jazeera",
        "href": "https://www.aljazeera.com/news/2026/6/28/ugandas-military-chief-orders-shutdown-of-two-media-outlets"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-30",
    "image": {
      "src": "/covers/uganda-army-shuts-media.png",
      "alt": "A dark, silent newspaper printing press hall with the lights switched off",
      "credit": "BBC"
    },
    "edition": "Morning Edition · 30 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Cato's Letters No. 15: \"Of Freedom of Speech\" (1721)",
        "excerpt": "Without freedom of thought, there can be no such thing as wisdom; and no such thing as publick liberty, without freedom of speech: Which is the right of every man, as far as by it he does not hurt and control the right of another; and this is the only check which it ought to suffer, the only bounds which it ought to know. This sacred privilege is so essential to free government, that the security of property; and the freedom of speech, always go together; and in those wretched countries where a man can not call his tongue his own, he can scarce call any thing else his own. Whoever would overthrow the liberty of the nation, must begin by subduing the freedom of speech; a thing terrible to publick traitors.",
        "source": "John Trenchard and Thomas Gordon, Cato's Letters, No. 15, \"Of Freedom of Speech: That the same is inseparable from publick Liberty\" (4 February 1721); hosted at Wikisource.",
        "href": "https://en.wikisource.org/wiki/Cato%27s_Letters/Letter_15"
      },
      {
        "category": "historical",
        "title": "The Trial of John Peter Zenger (1735) and Andrew Hamilton's plea for a free press",
        "excerpt": "the Question before the Court and you Gentlemen of the Jury, is not of small nor private Concern, it is not the Cause of a poor Printer, nor of New-York alone, which you are now trying: No! It may in its Consequence affect every Freeman that lives under a British Government on the Main of America. It is the best Cause. It is the Cause of Liberty; and I make no Doubt but your upright Conduct this Day, will not only entitle you to the Love and Esteem of your Fellow-Citizens, but every Man who prefers Freedom to a Life of Slavery will bless and honour you, as Men who have baffled the Attempt of Tyranny ... The Liberty both of exposing and opposing arbitrary Power (in these Parts of the World, at least) by speaking and writing Truth.",
        "source": "James Alexander (attrib.), A Brief Narrative of the Case and Tryal of John Peter Zenger, Printer of the New-York Weekly Journal (New York, 1736), Andrew Hamilton's summation to the jury; Evans Early American Imprint, digitized at the Internet Archive.",
        "href": "https://archive.org/details/briefnarrativeof00zeng"
      },
      {
        "category": "literary",
        "title": "John Milton, Areopagitica (1644) — a speech for the liberty of unlicensed printing",
        "excerpt": "For books are not absolutely dead things, but do contain a potency of life in them to be as active as that soul was whose progeny they are; nay, they do preserve as in a vial the purest efficacy and extraction of that living intellect that bred them. I know they are as lively, and as vigorously productive, as those fabulous dragon's teeth; and being sown up and down, may chance to spring up armed men. And yet, on the other hand, unless wariness be used, as good almost kill a man as kill a good book. Who kills a man kills a reasonable creature, God's image; but he who destroys a good book, kills reason itself, kills the image of God, as it were in the eye. Many a man lives a burden to the earth; but a good book is the precious life-blood of a master spirit, embalmed and treasured up on purpose to a life beyond life.",
        "source": "John Milton, Areopagitica; A Speech of Mr. John Milton for the Liberty of Unlicenc'd Printing, to the Parlament of England (1644); Project Gutenberg eBook #608.",
        "href": "https://www.gutenberg.org/files/608/608-h/608-h.htm"
      },
      {
        "category": "literary",
        "title": "Heinrich Heine, Almansor (1823) — \"where they burn books\"",
        "excerpt": "Das war ein Vorspiel nur, dort wo man Bücher / Verbrennt, verbrennt man auch am Ende Menschen. [\"That was but a prelude; where they burn books, they will in the end also burn people.\"]",
        "source": "Heinrich Heine, Almansor. Eine Tragödie, in Tragödien nebst einem lyrischen Intermezzo (Berlin: Dümmler, 1823), p. 148, spoken by Hassan; hosted at German Wikisource.",
        "href": "https://de.wikisource.org/wiki/Seite:Tragoedien_nebst_einem_lyrischen_Intermezzo_148.jpg"
      },
      {
        "category": "artistic",
        "title": "MUSIC: Giuseppe Verdi, \"Va, pensiero, sull'ali dorate\" (Chorus of the Hebrew Slaves), from Nabucco (1842)",
        "excerpt": "Verdi's chorus gives voice to a captive people who, stripped of their homeland and forbidden their own song, pour their longing for freedom into one shared lament — \"Va, pensiero, sull'ali dorate\" (\"Fly, thought, on wings of gold\"). Written for exiles under Babylonian rule, it became an anthem of the oppressed against tyranny, and it echoes here against soldiers silencing a newsroom: when rulers can shut the presses, the suppressed voice survives only as a collective cry. The score and full vocal parts are available on IMSLP.",
        "source": "Giuseppe Verdi, Nabucco (opera, 1842), Act III, No. 12, \"Va, pensiero\"; full scores and parts hosted at IMSLP / Petrucci Music Library.",
        "href": "https://imslp.org/wiki/Nabucco_(Verdi,_Giuseppe)"
      },
      {
        "category": "artistic",
        "title": "VISUAL ARTWORK: Honoré Daumier, \"Ne vous y frottez pas!!\" (Don't Meddle With It! — Freedom of the Press), lithograph, 1834",
        "excerpt": "Daumier's lithograph plants a sturdy printer squarely over the words \"Liberté de la presse,\" sleeves rolled, fists ready, refusing to yield his press. To one side King Louis-Philippe is toppled backward, to the other a fallen rival is tended by attendants — a defiant image of the working printer who will not be cowed by power. Made during a French crackdown on the political press, it stands as a near-literal rebuke to a regime that would send men to seize a newsroom and shut it down.",
        "source": "Honoré Daumier, \"Ne vous y frottez pas!!\" (L'Association Mensuelle, Plate 20), lithograph, March 1834; National Gallery of Art, Washington (no. 6131), via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Honor%C3%A9_Daumier,_Ne_vous_y_frottez_pas!!,_1834,_NGA_6131.jpg",
        "image": {
          "src": "/covers/uganda-army-shuts-media--art.png",
          "alt": "1834 lithograph by Honoré Daumier showing a defiant printer standing with rolled-up sleeves over the words 'Liberté de la presse', with King Louis-Philippe fallen backward to one side and a tended figure to the other.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 5
  },
  {
    "slug": "nasa-webb-cigar-galaxy",
    "headline": "NASA's Webb telescope resolves 16.5 million individual stars in the Cigar Galaxy",
    "overview": "NASA released a 223-megapixel near-infrared image from the James Webb Space Telescope that pierces the dust of the starburst galaxy Messier 82, the Cigar Galaxy, to resolve about 16.5 million individual stars for the first time. The galaxy, 12 million light-years away, is forming stars roughly ten times faster than the Milky Way.",
    "genre": "Science",
    "sources": [
      {
        "name": "NASA",
        "href": "https://science.nasa.gov/missions/webb/nasas-webb-pinpoints-millions-of-stars-within-cigar-galaxy/"
      },
      {
        "name": "Colossal",
        "href": "https://www.thisiscolossal.com/2026/06/messier-82-cigar-galaxy-webb-image/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-30",
    "image": {
      "src": "/covers/nasa-webb-cigar-galaxy.png",
      "alt": "A near-infrared image of the edge-on Cigar Galaxy, its disk glowing with millions of resolved stars",
      "credit": "NASA"
    },
    "edition": "Morning Edition · 30 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Galileo turns his telescope on the Milky Way and finds it made of countless stars (Sidereus Nuncius, 1610)",
        "excerpt": "The next object which I have observed is the essence or substance of the Milky Way. By the aid of a telescope any one may behold this in a manner which so distinctly appeals to the senses that all the disputes which have tormented philosophers through so many ages are exploded at once by the irrefragable evidence of our eyes, and we are freed from wordy disputes upon this subject, for the Galaxy is nothing else but a mass of innumerable stars planted together in clusters. Upon whatever part of it you direct the telescope straightway a vast crowd of stars presents itself to view; many of them are tolerably large and extremely bright, but the number of small ones is quite beyond determination.",
        "source": "Galileo Galilei, The Sidereal Messenger (Sidereus Nuncius, Venice, 1610), trans. Edward Stafford Carlos (1880); hosted by Project Gutenberg.",
        "href": "https://www.gutenberg.org/cache/epub/46036/pg46036.txt"
      },
      {
        "category": "historical",
        "title": "William Herschel gauges the Milky Way star by star to chart 'the construction of the heavens' (1785)",
        "excerpt": "That the milky way is a most extensive stratum of stars of various sizes admits no longer of the least doubt; and that our sun is actually one of the heavenly bodies belonging to it is as evident. I have now viewed and gaged this shining zone in almost every direction, and find it composed of stars whose number, by the account of these gages, constantly increases and decreases in proportion to its apparent brightness to the naked eye.",
        "source": "William Herschel, \"On the Construction of the Heavens,\" Philosophical Transactions of the Royal Society of London, vol. 75 (1785), pp. 213-266; scanned original hosted by the Internet Archive.",
        "href": "https://archive.org/details/philtrans02233147"
      },
      {
        "category": "literary",
        "title": "God tells Abram to number the stars, if he be able (Genesis 15:5, KJV)",
        "excerpt": "And he brought him forth abroad, and said, Look now toward heaven, and tell the stars, if thou be able to number them: and he said unto him, So shall thy seed be.",
        "source": "Genesis 15:5, Bible (King James Version), Book of Genesis; hosted by Wikisource.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Genesis"
      },
      {
        "category": "literary",
        "title": "Walt Whitman walks out from charts and columns to look up at the stars in silence (1865)",
        "excerpt": "When I heard the learn'd astronomer,\nWhen the proofs, the figures, were ranged in columns before me,\nWhen I was shown the charts, the diagrams, to add, divide, and measure them,\nWhen I sitting heard the astronomer where he lectured with much applause in the lecture-room,\nHow soon unaccountable I became tired and sick,\nTill rising and gliding out I wander'd off by myself,\nIn the mystical moist night-air, and from time to time,\nLook'd up in perfect silence at the stars.",
        "source": "Walt Whitman, \"When I Heard the Learn'd Astronomer,\" Leaves of Grass; hosted by Project Gutenberg.",
        "href": "https://www.gutenberg.org/cache/epub/1322/pg1322-images.html"
      },
      {
        "category": "artistic",
        "title": "MUSIC: Joseph Haydn, 'The Heavens Are Telling the Glory of God' from The Creation (1798)",
        "excerpt": "The mightiest chorus of Haydn's oratorio Die Schoepfung (The Creation), setting Psalm 19, opens with the radiant proclamation 'The heavens are telling the glory of God.' Soaring choral entries and a soloists' trio pile voice upon voice the way Webb piles star upon star, turning a single act of looking upward into an overwhelming multitude. The music's swelling fullness mirrors a galaxy resolving from a blur into 16.5 million distinct points of light, each one adding to the proclamation of the firmament. The full scores and parts are freely available on IMSLP.",
        "source": "Joseph Haydn, Die Schoepfung (The Creation), Hob.XXI:2 (1796-98), No. 13/14 chorus 'The heavens are telling the glory of God'; scores hosted by IMSLP / Petrucci Music Library.",
        "href": "https://imslp.org/wiki/Die_Sch%C3%B6pfung,_Hob.XXI:2_(Haydn,_Joseph)"
      },
      {
        "category": "artistic",
        "title": "VISUAL ARTWORK: Vincent van Gogh, The Starry Night (1889)",
        "excerpt": "From the window of an asylum at Saint-Remy, Van Gogh painted a night sky that does not merely contain stars but seethes with them: spiraling, swirling currents of light press outward against the dark, each star ringed in a halo of churning brushwork. Like Webb's near-infrared portrait of Messier 82, the canvas insists that what looks like a calm dark vault is in fact teeming, turbulent, and crowded with luminous life. The painting transforms the immensity of the heavens into something at once measurable in individual strokes and overwhelming in its sublime abundance.",
        "source": "Vincent van Gogh, The Starry Night (Saint-Remy, June 1889), oil on canvas, Museum of Modern Art, New York; image via the Google Art Project on Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/nasa-webb-cigar-galaxy--art.png",
          "alt": "Vincent van Gogh's The Starry Night, showing a swirling night sky filled with bright stars and a crescent moon above a sleeping village with a tall cypress tree in the foreground.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 6
  },
  {
    "slug": "vatican-restores-raphael-loggia",
    "headline": "Vatican begins a five-year restoration of Raphael's Loggia",
    "overview": "The Vatican Museums announced a five-year, roughly $5.5 million project to clean and restore the Raphael Loggia, the frescoed and stuccoed second-floor corridor designed by Raphael and his workshop. Restorers will use hand-held lasers and a dry cleaning method to treat the water-soluble paintings, and new filtering glass will be installed in the arched windows.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Artforum",
        "href": "https://www.artforum.com/news/vatican-launches-five-year-restoration-of-raphaels-loggia-1234753583/"
      },
      {
        "name": "The Washington Times",
        "href": "https://www.washingtontimes.com/news/2026/jun/25/vatican-begins-restoration-raphael-loggia-used-popes-presidents/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-30",
    "image": {
      "src": "/covers/vatican-restores-raphael-loggia.png",
      "alt": "Raphael's Loggia in the Vatican, a long vaulted corridor painted with biblical scenes and grotesque ornament",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 30 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Vasari records Raphael designing the very Loggie now being restored",
        "excerpt": "And besides embellishing the Palace greatly with grotesques and varied pavements, he also gave the designs for the Papal staircases, as well as for the loggie begun by the architect Bramante, but left unfinished on account of his death, and afterwards carried out with the new design and architecture of Raffaello, who made for this a model of wood with better proportion and adornment than had been accomplished by Bramante. The Pope wishing to demonstrate the greatness and magnificence of his generous ambition, Raffaello made the designs for the ornaments in stucco and for the scenes that were painted there, and likewise for the compartments; and as for the stucco and the grotesques, he placed at the head of that work Giovanni da Udine, and the figures he entrusted to Giulio Romano, although that master worked but little at them; and he also employed Giovanni Francesco, Il Bologna, Perino del Vaga, Pellegrino da Modena, Vincenzio da San Gimignano, and Polidoro da Caravaggio, with many other painters, who executed scenes and figures and other things that were required throughout that work, which Raffaello caused to be completed with such perfection, that he even sent to Florence for pavements by the hand of Luca della Robbia. Wherefore it is certain that with regard to the paintings, the stucco-ornaments, the arrangement, or any of the beautiful inventions, no one would be able to execute or even to imagine a more marvellous work; and its beauty was the reason that Raffaello received the charge of all the works of painting and architecture that were in progress in the Palace.",
        "source": "Giorgio Vasari, 'Lives of the Most Eminent Painters Sculptors and Architects,' Vol. 4 (of 10), trans. Gaston du C. de Vere; Life of Raffaello da Urbino. Project Gutenberg eBook #28420.",
        "href": "https://www.gutenberg.org/cache/epub/28420/pg28420.txt"
      },
      {
        "category": "historical",
        "title": "The rediscovery of Nero's buried Domus Aurea, which gave Raphael his 'grotesque' ornament",
        "excerpt": "When a young Roman inadvertently fell through a cleft in the Esquiline hillside at the end of the 15th century, he found himself in a strange cave or grotto filled with painted figures. ... When Raphael and Michelangelo crawled underground and were let down shafts to study them, the paintings were a revelation of the true world of antiquity. ... Because of their underground origin, these works were referred to as grotteschi, (\"belonging to caves\") and their strangeness changed the meaning of the word.",
        "source": "Wikipedia, 'Domus Aurea' (Golden House of Nero), section on its Renaissance rediscovery and the origin of the term 'grotesque' / grottesche.",
        "href": "https://en.wikipedia.org/wiki/Domus_Aurea"
      },
      {
        "category": "literary",
        "title": "Du Bellay seeks Rome amid Rome's ruins and finds only the work of time",
        "excerpt": "Nouveau venu qui cherches Rome en Rome\nEt rien de Rome en Rome n’apperçois,\nCes vieux palais, ces vieux arcs que tu vois,\nEt ces vieux murs, c’est ce que Rome on nomme.\nVoy quel orgueil, quelle ruine, et comme\nCelle qui mist le monde sous ses lois\nPour donter tout, se donta quelquefois,\nEt devint proye au temps qui tout consomme.\nRome de Rome est le seul monument,\nEt Rome Rome a vaincu seulement.\nLe Tybre seul, qui vers la mer s’enfuit,\nReste de Rome, ô mondaine inconstance !\nCe qui est ferme est par le temps destruit,\nEt ce qui fuit, au temps fait resistance.",
        "source": "Joachim du Bellay, 'Les Antiquités de Rome' (1558), Sonnet III; Œuvres complètes, édition Séché, tome 3. French Wikisource.",
        "href": "https://fr.wikisource.org/wiki/Les_Antiquit%C3%A9s_de_Rome"
      },
      {
        "category": "literary",
        "title": "Shelley's 'Ozymandias' on the decay of even the proudest works",
        "excerpt": "I met a traveller from an antique land\nWho said: \"Two vast and trunkless legs of stone\nStand in the desert. Near them on the sand,\nHalf sunk, a shatter'd visage lies, whose frown\nAnd wrinkled lip and sneer of cold command\nTell that its sculptor well those passions read\nWhich yet survive, stamp'd on these lifeless things,\nThe hand that mock'd them and the heart that fed;\nAnd on the pedestal these words appear:\n'My name is Ozymandias, king of kings:\nLook on my works, ye Mighty, and despair!'\nNothing beside remains. Round the decay\nOf that colossal wreck, boundless and bare,\nThe lone and level sands stretch far away.\"",
        "source": "Percy Bysshe Shelley, 'Ozymandias' (1818), as printed in 'Poems That Every Child Should Know.' English Wikisource.",
        "href": "https://en.wikisource.org/wiki/Poems_That_Every_Child_Should_Know/Ozymandias_of_Egypt"
      },
      {
        "category": "artistic",
        "title": "Allegri's 'Miserere' (MUSIC), the guarded sound of the Sistine Chapel restored to the world",
        "excerpt": "Gregorio Allegri's 'Miserere mei, Deus' (a setting of Psalm 51 for two choirs, c. 1638) was sung in the Sistine Chapel during the Tenebrae services of Holy Week and was so prized by the papal chapel that the score was kept secret, surviving only as a closely guarded Vatican manuscript whose ornamented 'abbellimenti' passed by oral tradition. Like the Loggia restoration, it embodies a fragile Renaissance-and-Baroque masterpiece preserved within the Vatican walls and only gradually, painstakingly recovered for public access. Its slow, luminous polyphony is the aural counterpart to cleaning centuries of grime from Raphael's frescoes, a renewal of beauty long sealed away.",
        "source": "Gregorio Allegri, 'Miserere' (Psalm 51 setting, c. 1638); scores and editions hosted at the International Music Score Library Project (IMSLP / Petrucci Music Library).",
        "href": "https://imslp.org/wiki/Miserere_(Allegri,_Gregorio)"
      },
      {
        "category": "artistic",
        "title": "Raphael's 'The School of Athens' (VISUAL ARTWORK), the High Renaissance masterpiece in the same Vatican rooms",
        "excerpt": "Painted 1509–1511 in the Stanza della Segnatura, just off the corridors Raphael would go on to design, 'The School of Athens' gathers Plato, Aristotle and the sages of antiquity beneath a soaring vault, the supreme statement of the Vatican's High Renaissance program. It is the monumental fresco kin to the Loggia: the same artist, the same papal palace, the same revival of the antique world that the restorers are now laboring to clean and protect. To recover the Loggia is to recover the setting and spirit of this very picture.",
        "source": "Raffaello Sanzio (Raphael), 'The School of Athens' (Scuola di Atene), fresco, 1509–1511, Stanza della Segnatura, Apostolic Palace, Vatican. Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Raffael_058.jpg",
        "image": {
          "src": "/covers/vatican-restores-raphael-loggia--art.png",
          "alt": "Raphael's fresco The School of Athens, showing Plato and Aristotle walking forward amid a crowd of ancient philosophers and mathematicians beneath grand Renaissance arches.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 7
  },
  {
    "slug": "duke-energy-cancels-nc-offshore-wind",
    "headline": "Duke Energy cancels its North Carolina offshore wind lease and will reinvest $129 million elsewhere",
    "overview": "Duke Energy agreed to terminate its federal Carolina Long Bay offshore wind lease and instead reinvest nearly $129 million in other generation in the Carolinas, in a buy-back arranged with the Interior Department. The utility said offshore wind is not currently the most reliable or cost-effective option, and the deal advances a wider Trump administration push to unwind offshore wind leases.",
    "genre": "Climate",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMirAFBVV95cUxPc3NmYTdxUGxCSW5fcUZrVmNFaXdiNWlLdlMwT2t2SXVOQWVRVWVqOVNhcUx3N25sWVZ2RHlWcGVBaHNmLVZscURUTmNFNklDVUg3OHpfSVhXbkpqaWYzdVhfRmlQdzJ0a0tDMUNJeERwc3JZVy04R3JXZV84U3lRbUNkNEZ4Z0RoNmVuVXlITFJ6RlRVaTEwTUdsMGZtZlB0WVM1QmJXY3hXOGQt?oc=5"
      },
      {
        "name": "The Maritime Executive",
        "href": "https://maritime-executive.com/article/duke-energy-to-sell-back-its-north-carolina-offshore-wind-area-lease"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-30",
    "image": {
      "src": "/covers/duke-energy-cancels-nc-offshore-wind.png",
      "alt": "A row of offshore wind turbines standing in open sea under a pale sky",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 30 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Draining the Beemster: the Dutch mastery of the wind",
        "excerpt": "The Beemster is the first polder in the Netherlands reclaimed from a lake, the water extracted by windmills between 1609 and 1612. Around 1605 private investors initiated drainage efforts; a 1610 breach in the Zuiderzee dikes briefly refilled the lake, but work resumed with reinforced defenses, and by 1612 the polder was dry and land distributed to investors. Since 1999 the entire Beemster polder has been on the UNESCO World Heritage list as a masterpiece of creative planning. Where the Dutch Golden Age bet its fortunes on harnessing the wind to remake the landscape, Duke Energy has now judged the offshore wind off the Carolinas not worth the harness, walking away from its Carolina Long Bay lease.",
        "source": "\"Beemster,\" English Wikipedia (encyclopedia entry on the first Dutch lake-polder reclaimed by windmills, 1609-1612; UNESCO World Heritage Site).",
        "href": "https://en.wikipedia.org/wiki/Beemster"
      },
      {
        "category": "historical",
        "title": "\"He blew and they were scattered\": the wind that ended the Spanish Armada",
        "excerpt": "This silver medal commemorates the defeat of the Spanish Armada in 1588. The obverse bears the inscription FLAVIT [JEHOVAH] . ET . DISSIPATI . SVNT 1588 - \"He blew and they were scattered\" - with the name of Jehovah in Hebrew above the fleets in the clouds; the reverse shows a church founded upon a rock amid turbulent waves. Struck by the Dutch medallist Gerard van Bylaer at the request of Prince Maurice of Orange, the medal made the wind itself the agent that undid Philip II's grand armada. The same fickle element that once shattered an empire's most ambitious undertaking is the one Duke Energy now declares too unreliable to build upon, retreating from its own offshore venture.",
        "source": "Medal commemorating the defeat of the Spanish Armada, 1588, by Gerard van Bylaer; Royal Museums Greenwich / National Maritime Museum, object MEC0012.",
        "href": "https://www.rmg.co.uk/collections/objects/rmgc-object-37452"
      },
      {
        "category": "literary",
        "title": "Don Quixote tilting at windmills",
        "excerpt": "\"At this point they came in sight of thirty or forty windmills that there are on that plain, and as soon as Don Quixote saw them he said to his squire, 'Fortune is arranging matters for us better than we could have shaped our desires ourselves, for look there, friend Sancho Panza, where thirty or more monstrous giants present themselves, all of whom I mean to engage in battle and slay, and with whose spoils we shall begin to make our fortunes...' 'What giants?' said Sancho Panza. 'Those thou seest there,' answered his master, 'with the long arms, and some have them nearly two leagues long.' 'Look, your worship,' said Sancho; 'what we see there are not giants but windmills, and what seem to be their arms are the sails that turned by the wind make the millstone go.'... A slight breeze at this moment sprang up, and the great sails began to move, seeing which Don Quixote exclaimed, 'Though ye flourish more arms than the giant Briareus, ye have to reckon with me.' So saying... he charged at Rocinante's fullest gallop and fell upon the first mill that stood in front of him; but as he drove his lance-point into the sail the wind whirled it round with such force that it shivered the lance to pieces, sweeping with it horse and rider, who went rolling over on the plain, in a sorry condition.\" The proverbial image of a costly, quixotic campaign against windmills is the literary shadow over a utility abandoning its own contest with the wind.",
        "source": "Miguel de Cervantes, \"Don Quixote,\" Part I, Chapter VIII (trans. John Ormsby), Project Gutenberg eBook #996.",
        "href": "https://www.gutenberg.org/cache/epub/996/pg996.txt"
      },
      {
        "category": "literary",
        "title": "The wind drops: Coleridge's becalmed mariner",
        "excerpt": "\"Down dropt the breeze, the sails dropt down, / 'Twas sad as sad could be; / And we did speak only to break / The silence of the sea!... Day after day, day after day, / We stuck, nor breath nor motion; / As idle as a painted ship / Upon a painted ocean. / Water, water, every where, / And all the boards did shrink; / Water, water, every where, / Nor any drop to drink.\" Coleridge's mariner learns that a voyage staked on the wind can be halted the instant the wind fails - the very fickleness and unreliability Duke Energy cited in turning away from offshore generation, an ambition left, like the ship, stuck and going nowhere.",
        "source": "Samuel Taylor Coleridge, \"The Rime of the Ancient Mariner,\" Part II, Project Gutenberg eBook #151.",
        "href": "https://www.gutenberg.org/cache/epub/151/pg151.txt"
      },
      {
        "category": "artistic",
        "title": "Mendelssohn, \"The Hebrides\" (Fingal's Cave) Overture, Op. 26 [MUSIC]",
        "excerpt": "Mendelssohn's concert overture \"The Hebrides\" (also \"Fingal's Cave\"), composed 1829-1833 and premiered in London in 1832, conjures the swell, surge, and restless gusts of the North Atlantic in orchestral sound - the rolling cellos and gathering winds of a wild northern sea. It is music about the sublime, ungovernable power of wind and water off a remote coast, the same elemental force Duke Energy hoped to capture off the Carolinas and has now decided lies beyond reliable mastery. The score and parts are hosted in the public domain on IMSLP.",
        "source": "Felix Mendelssohn, \"Die Hebriden\" (The Hebrides / Fingal's Cave), Op. 26; full score and parts, IMSLP / Petrucci Music Library.",
        "href": "https://imslp.org/wiki/The_Hebrides,_Op.26_(Mendelssohn,_Felix)"
      },
      {
        "category": "artistic",
        "title": "Jacob van Ruisdael, \"The Windmill at Wijk bij Duurstede\" (c. 1670) [VISUAL ARTWORK]",
        "excerpt": "Ruisdael's c. 1670 masterpiece sets a single great cylindrical windmill towering over the river town of Wijk bij Duurstede beneath a vast, cloud-driven Dutch sky - the sails poised to catch a wind that is the painting's true subject. It is the supreme image of a society that built its prosperity on turning the wind to human use, harmonizing riverbank, sails, light and shadow into an emblem of the wind harnessed. Held by the Amsterdam Museum on long-term loan to the Rijksmuseum, it stands as the visual counterpoint to Duke Energy's retreat - the wind once embraced as power, now set aside.",
        "source": "Jacob van Ruisdael, \"The Windmill at Wijk bij Duurstede,\" oil on canvas, c. 1670; Rijksmuseum, Amsterdam (inv. SK-C-211); image via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:De_molen_bij_Wijk_bij_Duurstede,_SK-C-211.jpg",
        "image": {
          "src": "/covers/duke-energy-cancels-nc-offshore-wind--art.png",
          "alt": "Oil painting of a large cylindrical windmill rising above the river town of Wijk bij Duurstede under a wide, cloudy Dutch sky, with sailboats on the water below.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 8
  },
  {
    "slug": "trump-vehicle-right-to-repair",
    "headline": "Trump signs a memo directing the EPA to expand Americans' right to repair their own vehicles",
    "overview": "President Trump signed a presidential memorandum titled \"Lowering the Cost of Living by Promoting the Freedom to Fix,\" directing the Environmental Protection Agency to ease rules so drivers can repair their own cars and use third-party parts. The order tells the EPA to expedite alternative certification for aftermarket parts and to deprioritize enforcement against good-faith self-repairs.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiqAFBVV95cUxQR3ZPZXBLVlBtb0NQbDNRVEIyNFp6dGxidXZ0Z1FNblZicENrS2FrVVhmQTZ6Ykg4WGc5RzBzbzh6SEJUemlkNzJtUlpxdndhUTRCYmYxN1hCSlpqR3djUFNtV0hHdWVXendKOWdMcU9IcTJGQ2JRcDBEN20zTTM5SEFlTVBzZ3RuOGlyWXFyNWJVdElNNnpJX21hdjRJTVNjRThkd1ZiZHc?oc=5"
      },
      {
        "name": "The White House",
        "href": "https://www.whitehouse.gov/presidential-actions/2026/06/lowering-the-cost-of-living-by-promoting-the-freedom-to-fix/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-30",
    "image": {
      "src": "/covers/trump-vehicle-right-to-repair.png",
      "alt": "Close-up of a mechanic's hand tools resting on the engine bay of a car",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 30 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Statute of Monopolies (1624): Parliament strikes down the makers' exclusive grip",
        "excerpt": "All Monopolies and all Comissions Graunts Licences Charters and tres patents heretofore made or graunted, or hereafter to be made or graunted to any person or persons Bodies politique or corporate whatsoever, of or for the sole buyinge sellinge makinge workinge or usinge of any thinge within this Realme or the Dominion of Wales, or of any other Monopolies ... are altogether contrary to the Lawes of this Realme, and so are and shalbe utterlie void and of none effecte, and in noe wise to be putt in use or execucion.",
        "source": "Statute of Monopolies 1623 (21 Jac. 1, c. 3), \"An Act concerning Monopolies and Dispensations with penall Lawes and the Forfeyture thereof,\" hosted by The National Archives at legislation.gov.uk",
        "href": "https://www.legislation.gov.uk/aep/Ja1/21/3"
      },
      {
        "category": "historical",
        "title": "The Homestead Act (1862): own what you work with your own hands",
        "excerpt": "That any person who is the head of a family, or who has arrived at the age of twenty-one years, and is a citizen of the United States ... shall ... be entitled to enter one quarter section or a less quantity of unappropriated public lands ... and that any person owning and residing on land may, under the provisions of this act, enter other land lying contiguous to his or her said land.",
        "source": "Homestead Act, May 20, 1862 (Public Law 37-64), transcript, U.S. National Archives, Milestone Documents",
        "href": "https://www.archives.gov/milestone-documents/homestead-act"
      },
      {
        "category": "literary",
        "title": "Emerson, \"Self-Reliance\": leaning on property and protective institutions is the want of self-reliance",
        "excerpt": "And so the reliance on Property, including the reliance on governments which protect it, is the want of self-reliance. Men have looked away from themselves and at things so long that they have come to esteem the religious, learned and civil institutions as guards of property, and they deprecate assaults on these, because they feel them to be assaults on property. They measure their esteem of each other by what each has, and not by what each is. ... Insist on yourself; never imitate. Your own gift you can present every moment with the cumulative force of a whole life's cultivation; but of the adopted talent of another you have only an extemporaneous half possession.",
        "source": "Ralph Waldo Emerson, \"Self-Reliance,\" in Essays: First Series (1841), Project Gutenberg eBook #2944",
        "href": "https://www.gutenberg.org/ebooks/2944"
      },
      {
        "category": "literary",
        "title": "Longfellow, \"The Village Blacksmith\": the dignity of the maker who owes not any man",
        "excerpt": "Under a spreading chestnut-tree\n  The village smithy stands;\nThe smith, a mighty man is he,\n  With large and sinewy hands,\nAnd the muscles of his brawny arms\n  Are strong as iron bands.\n\nHis hair is crisp, and black, and long;\n  His face is like the tan;\nHis brow is wet with honest sweat,\n  He earns whate'er he can,\nAnd looks the whole world in the face,\n  For he owes not any man. ... Toiling,—rejoicing,—sorrowing,\n  Onward through life he goes;\nEach morning sees some task begin,\n  Each evening sees it close;\nSomething attempted, something done,\n  Has earned a night's repose. ... Thus at the flaming forge of life\n  Our fortunes must be wrought;\nThus on its sounding anvil shaped\n  Each burning deed and thought.",
        "source": "Henry Wadsworth Longfellow, \"The Village Blacksmith\" (1841), Wikisource (text from Poems That Every Child Should Know, ed. Mary E. Burt, 1904)",
        "href": "https://en.wikisource.org/wiki/The_Village_Blacksmith_(Longfellow)"
      },
      {
        "category": "artistic",
        "title": "Verdi, \"Anvil Chorus\" (Coro di zingari) from Il trovatore (MUSIC): smiths praising the labor of their own hands",
        "excerpt": "Verdi's 1853 \"Anvil Chorus\" opens Act II with Gypsy smiths striking real anvils on the offbeat as the dawn fire blazes, turning the rhythm of hammer on iron into music itself. The chorus sings the praise of hard work at the forge—\"Chi del gitano i giorni abbella? La zingarella!\"—celebrating the independent craftsman whose wine, woman, and worth are won by his own arm at the anvil. It is the sound of self-reliant makers reveling in the dignity of working with their hands, the very spirit of the tinkerer's freedom to fix.",
        "source": "Giuseppe Verdi, Il trovatore, Act II, \"Vedi! le fosche notturne spoglie\" (Coro di zingari / Anvil Chorus), 1853; full scores at the International Music Score Library Project (IMSLP)",
        "href": "https://imslp.org/wiki/Il_trovatore_(Verdi,_Giuseppe)"
      },
      {
        "category": "artistic",
        "title": "Velázquez, \"The Forge of Vulcan\" (1630) (VISUAL ARTWORK): the divine smith and his fellow craftsmen at the anvil",
        "excerpt": "Diego Velázquez's La fragua de Vulcano (Apollo in the Forge of Vulcan, 1630, oil on canvas, Museo del Prado, Madrid) shows the god Apollo intruding upon Vulcan and his half-dressed, muscular journeymen as they pause mid-labor at the glowing forge, tongs and hammers in hand, a half-finished breastplate cooling on the anvil. Velázquez dignifies the working bodies of the smiths with the same gravity Renaissance art reserved for gods and kings, making the craftsman's sweat and skill heroic. It is a luminous monument to the maker's hands—the forge as the place where raw metal and human craft are joined into something owned and useful.",
        "source": "Diego Velázquez, La fragua de Vulcano (The Forge of Vulcan), 1630, Museo del Prado, Madrid; via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Vel%C3%A1zquez_-_La_Fragua_de_Vulcano_(Museo_del_Prado,_1630).jpg",
        "image": {
          "src": "/covers/trump-vehicle-right-to-repair--art.png",
          "alt": "Velázquez's painting The Forge of Vulcan: Apollo, haloed, visits the god Vulcan and his bare-torsoed blacksmith assistants who pause from hammering glowing metal at the anvil in a dim forge.",
          "credit": "Wikimedia Commons (Museo del Prado)"
        }
      }
    ],
    "rank": 9
  },
  {
    "slug": "sf-archdiocese-abuse-settlement",
    "headline": "San Francisco's Catholic archdiocese agrees to a $395 million clergy sex-abuse settlement",
    "overview": "The Roman Catholic Archdiocese of San Francisco agreed to pay $395 million to settle more than 500 lawsuits accusing clergy of child sexual abuse, ending nearly three years of bankruptcy proceedings. The deal, which still needs court approval, requires the archdiocese to publish a list of accused clergy and to send each of the roughly 530 survivors an apology letter.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiwAFBVV95cUxNQVFTSVVDdXd5bHFjTmRuRWo1ZENod29rcHhyTkhoQlQ0OUFabHFscklXbDg5M2w4UXpaMEQtZDlKWHRCWHVtVDZZUTF6Vm5IVzhPRFdXUzVydFJzcWtITEhkZEgwZC1Ed3NyOFVTMTF0N1oxczhPOU56QW5XdjFzU1lHOE03U2FJak9KbnlxRUdXM2lxc0R1aVFHUXhpS1B0cExCa3BnbzhuTjNTVjRkTk1adFBsX1g2a0psbm83VzY?oc=5"
      },
      {
        "name": "The San Francisco Standard",
        "href": "https://sfstandard.com/2026/06/29/sf-archdiocese-sexual-abuse-settlement/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-30",
    "image": {
      "src": "/covers/sf-archdiocese-abuse-settlement.png",
      "alt": "The twin towers and facade of a large Catholic cathedral against an overcast sky",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 30 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Pope Benedict XVI's 2010 Pastoral Letter to the Catholics of Ireland",
        "excerpt": "You have suffered grievously and I am truly sorry. I know that nothing can undo the wrong you have endured. Your trust has been betrayed and your dignity has been violated. Many of you found that, when you were courageous enough to speak of what happened to you, no one would listen. Those of you who were abused in residential institutions must have felt that there was no escape from your sufferings. It is understandable that you find it hard to forgive or be reconciled with the Church. In her name, I openly express the shame and remorse that we all feel.",
        "source": "Pope Benedict XVI, Pastoral Letter to the Catholics of Ireland (19 March 2010), Section 6, hosted at the Vatican (vatican.va)",
        "href": "https://www.vatican.va/content/benedict-xvi/en/letters/2010/documents/hf_ben-xvi_let_20100319_church-ireland.html"
      },
      {
        "category": "historical",
        "title": "Martin Luther's Ninety-Five Theses against the sale of indulgences (1517)",
        "excerpt": "27. They preach man who say that so soon as the penny jingles into the money-box, the soul flies out [of purgatory]. ... 1. Our Lord and Master Jesus Christ, when He said Poenitentiam agite, willed that the whole life of believers should be repentance.",
        "source": "Martin Luther, The Ninety-Five Theses (Disputation on the Power and Efficacy of Indulgences, 1517), trans. Adolph Spaeth et al., 1915; via Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Ninety-Five_Theses"
      },
      {
        "category": "literary",
        "title": "The revered minister's hidden sin in Hawthorne's The Scarlet Letter",
        "excerpt": "“I, who ascend the sacred desk, and turn my pale face heavenward, taking upon myself to hold communion in your behalf with the Most High Omniscience—I, in whose daily life you discern the sanctity of Enoch—I, whose footsteps, as you suppose, leave a gleam along my earthly track, whereby the Pilgrims that shall come after me may be guided to the regions of the blest—I, who have laid the hand of baptism upon your children—I, who have breathed the parting prayer over your dying friends, to whom the Amen sounded faintly from a world which they had quitted—I, your pastor, whom you so reverence and trust, am utterly a pollution and a lie!”",
        "source": "Nathaniel Hawthorne, The Scarlet Letter (1850), Chapter XI, “The Interior of a Heart”; Project Gutenberg eBook No. 33",
        "href": "https://www.gutenberg.org/ebooks/33"
      },
      {
        "category": "literary",
        "title": "Ivan's protest over the unatoned tears of children in The Brothers Karamazov",
        "excerpt": "It’s not worth the tears of that one tortured child who beat itself on the breast with its little fist and prayed in its stinking outhouse, with its unexpiated tears to ‘dear, kind God’! It’s not worth it, because those tears are unatoned for. They must be atoned for, or there can be no harmony. But how? How are you going to atone for them? Is it possible? By their being avenged?",
        "source": "Fyodor Dostoevsky, The Brothers Karamazov (1880), Book V, Chapter 4 (“Rebellion”), trans. Constance Garnett; Project Gutenberg eBook No. 28054",
        "href": "https://www.gutenberg.org/ebooks/28054"
      },
      {
        "category": "artistic",
        "title": "Allegri's Miserere mei, Deus — a sung plea for mercy and cleansing (MUSIC)",
        "excerpt": "Gregorio Allegri's c.1638 setting of Psalm 51, the great penitential psalm, was guarded for centuries as the property of the Sistine Chapel, sung in the shadows of Holy Week. Its soaring, repeated cry of “Miserere mei, Deus”—have mercy on me, O God—and “wash me thoroughly from mine iniquity, and cleanse me from my sin” gives voice to exactly the contrition an institution must reach for when it confronts the wrongs done in its own name, pleading to have a hidden stain washed clean.",
        "source": "Gregorio Allegri, Miserere (c.1638), setting of Psalm 51; scores and editions hosted at IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Miserere_(Allegri,_Gregorio)"
      },
      {
        "category": "artistic",
        "title": "Michelangelo's The Last Judgment — the reckoning where every hidden deed is weighed (VISUAL ARTWORK)",
        "excerpt": "Michelangelo's fresco on the altar wall of the Sistine Chapel (1536–1541) depicts the moment of final reckoning: Christ raises his hand as the saved ascend and the damned are dragged down, every concealed act dragged into the light to be judged. Painted in the very church at the heart of Catholic authority, it embodies the theme of institutional accounting—the conviction that no wrong against the innocent stays hidden forever, and that a day of exposure and judgment must come.",
        "source": "Michelangelo Buonarroti, The Last Judgment (1536–1541), fresco, Sistine Chapel, Vatican; via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Michelangelo_-_Fresco_of_the_Last_Judgement.jpg",
        "image": {
          "src": "/covers/sf-archdiocese-abuse-settlement--art.png",
          "alt": "Michelangelo's fresco The Last Judgment in the Sistine Chapel, with Christ at the center surrounded by saints, the blessed rising and the damned descending.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 10
  },
  {
    "slug": "turrell-100th-skyspace-aarhus",
    "headline": "James Turrell unveils his 100th Skyspace, his largest in a museum, at ARoS in Aarhus",
    "overview": "The American light artist James Turrell opened \"As Seen Below,\" his 100th Skyspace and the largest ever built inside a museum, at the ARoS art museum in Aarhus, Denmark. The semi-submerged domed chamber is about 40 metres wide and 16 metres tall, with a near-six-metre oculus open to the changing Danish sky.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Colossal",
        "href": "https://www.thisiscolossal.com/2026/06/james-turrell-as-seen-below-skyspace-aros-aarhus-denmark/"
      },
      {
        "name": "Dezeen",
        "href": "https://www.dezeen.com/2026/06/19/james-turrell-as-seen-below-skyspace-aarhus-aros-museum/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-30",
    "image": {
      "src": "/covers/turrell-100th-skyspace-aarhus.png",
      "alt": "The interior of a domed chamber with a circular oculus opening to the sky",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 30 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Pantheon in Rome, its dome a likeness of the heavens (Cassius Dio)",
        "excerpt": "Also he completed the building called the Pantheon. It has this name, perhaps because it received among the images which decorated it the statues of many gods, including Mars and Venus; but my own opinion of the name is that, because of its vaulted roof, it resembles the heavens.",
        "source": "Cassius Dio, Roman History, Book 53, chapter 27 (Loeb Classical Library translation by Earnest Cary), hosted at Bill Thayer's LacusCurtius, University of Chicago.",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Cassius_Dio/53*.html"
      },
      {
        "category": "historical",
        "title": "Newgrange: a Neolithic chamber entered by the solstice sun through a roof-box",
        "excerpt": "Roughly five thousand years before Turrell sank his domed chamber into the earth at Aarhus, the builders of Newgrange in Ireland's Boyne Valley raised a great passage tomb with a narrow opening contrived above its doorway. For about seventeen minutes at dawn on the winter solstice, a single beam of sunrise light slips through this 'roof box', travels the length of the passage and floods the inner chamber. As at a Skyspace, architecture is shaped to one purpose: to capture the moving light of the heavens and bring it, on the sky's own schedule, deep into the body of the earth.",
        "source": "Heritage Ireland (Office of Public Works), official page on the Newgrange winter solstice, Brú na Bóinne World Heritage Site.",
        "href": "https://heritageireland.ie/winter-solstice/"
      },
      {
        "category": "literary",
        "title": "Genesis 1:3 — \"Let there be light\"",
        "excerpt": "And God said, Let there be light: and there was light. And God saw the light, that it was good: and God divided the light from the darkness. And God called the light Day, and the darkness he called Night. And the evening and the morning were the first day.",
        "source": "The Holy Bible, King James Version, Genesis 1:3-5, hosted at Wikisource.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Genesis"
      },
      {
        "category": "literary",
        "title": "Dante gazes into the eternal light at the close of the Paradiso",
        "excerpt": "Even such was I at that new apparition;\n   I wished to see how the image to the circle\n   Conformed itself, and how it there finds place;\n\nBut my own wings were not enough for this,\n   Had it not been that then my mind there smote\n   A flash of lightning, wherein came its wish.\n\nHere vigour failed the lofty fantasy:\n   But now was turning my desire and will,\n   Even as a wheel that equally is moved,\n\nThe Love which moves the sun and the other stars.",
        "source": "Dante Alighieri, The Divine Comedy, Paradiso, Canto XXXIII (closing lines), translated by Henry Wadsworth Longfellow (1867), hosted at Wikisource.",
        "href": "https://en.wikisource.org/wiki/Divine_Comedy_(Longfellow_1867)/Volume_3/Canto_33"
      },
      {
        "category": "artistic",
        "title": "Joseph Haydn, Die Schöpfung (The Creation) — \"and there was light\" (MUSIC)",
        "excerpt": "Haydn's oratorio Die Schöpfung (1796-98) sets the opening of Genesis, and at the words 'und es ward Licht' ('and there was light') the chorus and orchestra burst from murky pianissimo into a single blazing C-major chord, one of the most famous depictions of light in all of Western music. Like a Turrell Skyspace, the work stages light not as subject matter but as a sudden, overwhelming perceptual event, drawing the listener from darkness into radiance. This IMSLP page hosts the public-domain full scores and parts of the work.",
        "source": "Joseph Haydn, Die Schöpfung, Hob.XXI:2 (1796-98), full scores and parts at IMSLP / Petrucci Music Library.",
        "href": "https://imslp.org/wiki/Die_Sch%C3%B6pfung,_Hob.XXI:2_(Haydn,_Joseph)"
      },
      {
        "category": "artistic",
        "title": "Giovanni Paolo Panini, Interior of the Pantheon, Rome (VISUAL ARTWORK)",
        "excerpt": "Panini's luminous capriccio of about 1734 looks up into the vast coffered dome of the Roman Pantheon, where the open oculus pours a shaft of daylight across the marble interior. The painting makes the same proposition as Turrell's 'As Seen Below': that a domed chamber with a single circular opening to the sky becomes an instrument for measuring and contemplating celestial light. What the eye reads is not architecture so much as the living light that falls through the round aperture and travels the walls.",
        "source": "Giovanni Paolo Panini, Interior of the Pantheon, Rome, c. 1734, oil on canvas, National Gallery of Art, Washington, D.C. (Samuel H. Kress Collection, 1939.1.24); file hosted at Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Giovanni_Paolo_Panini_-_Interior_of_the_Pantheon,_Rome_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/turrell-100th-skyspace-aarhus--art.png",
          "alt": "Painting looking up into the interior of the Roman Pantheon, with sunlight streaming through the circular oculus in the coffered dome onto the marble floor and walls.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 11
  },
  {
    "slug": "sa-police-general-assassination-attempt",
    "headline": "Senior South African police general survives an assassination attempt days before testifying",
    "overview": "Major General Feroz Khan, a deputy head of South Africa's crime intelligence division, survived an assassination attempt after being shot while driving home in a Johannesburg suburb and was rushed into emergency surgery. The shooting came days before he was due to testify to the Madlanga commission, a public inquiry into allegations that organised crime has infiltrated the police.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c9v2x700l8vo"
      },
      {
        "name": "allAfrica",
        "href": "https://allafrica.com/view/group/main/main/id/00097255.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-30",
    "image": {
      "src": "/covers/sa-police-general-assassination-attempt.png",
      "alt": "A quiet affluent suburban street in Johannesburg at dusk",
      "credit": "BBC"
    },
    "edition": "Morning Edition · 30 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The conspirators strike down Julius Caesar (Plutarch's account)",
        "excerpt": "It was Casca who gave him the first blow with his dagger, in the neck, not a mortal wound, nor even a deep one, for which he was too much confused, as was natural at the beginning of a deed of great daring; so that Caesar turned about, grasped the knife, and held it fast. At almost the same instant both cried out, the smitten man in Latin: ‘Accursed Casca, what doest thou?’ and the smiter, in Greek, to his brother: ‘Brother, help!’",
        "source": "Plutarch, Life of Caesar 66, trans. Bernadotte Perrin, Plutarch's Lives (Harvard University Press / William Heinemann, 1919), hosted by the Perseus Digital Library, Tufts University",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0244%3Achapter%3D66"
      },
      {
        "category": "historical",
        "title": "Cicero prosecutes the corrupt governor Verres and the courts that shield the guilty",
        "excerpt": "That which was above all things to be desired, O judges, and which above all things was calculated to have the greatest influence towards allaying the unpopularity of your order, and putting an end to the discredit into which your judicial decisions have fallen, appears to have been thrown in your way, and given to you not by any human contrivance, but almost by the interposition of the gods, at a most important crisis of the republic. For an opinion has now become established, pernicious to us, and pernicious to the republic, which has been the common talk of every one, not only at Rome, but among foreign nations also,—that in the courts of law as they exist at present, no wealthy man, however guilty he may be, can possibly be convicted.",
        "source": "M. Tullius Cicero, Against Verres, First Oration (In Verrem, actio 1, section 1), English translation hosted by the Perseus Digital Library, Tufts University",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0018:text=Ver.:actio=1:book=1:section=1"
      },
      {
        "category": "literary",
        "title": "Shakespeare's Caesar ignored the warning and met the daggers",
        "excerpt": "CAESAR.\nDoth not Brutus bootless kneel?\n\nCASCA.\nSpeak, hands, for me!\n\n[_Casca stabs Caesar in the neck. Caesar catches hold of his arm. He is\nthen stabbed by several other Conspirators, and at last by Marcus\nBrutus._]\n\nCAESAR.\n_Et tu, Brute?_—Then fall, Caesar!\n\n[_Dies. The Senators and People retire in confusion._]",
        "source": "William Shakespeare, Julius Caesar, Act III, Scene 1 (Project Gutenberg eBook #1522)",
        "href": "https://www.gutenberg.org/cache/epub/1522/pg1522.txt"
      },
      {
        "category": "literary",
        "title": "Macbeth and the murder that no ocean can wash clean",
        "excerpt": "How is’t with me, when every noise appals me?\nWhat hands are here? Ha, they pluck out mine eyes!\nWill all great Neptune’s ocean wash this blood\nClean from my hand? No, this my hand will rather\nThe multitudinous seas incarnadine,\nMaking the green one red.",
        "source": "William Shakespeare, Macbeth, Act II, Scene 2 (Project Gutenberg eBook #1533)",
        "href": "https://www.gutenberg.org/cache/epub/1533/pg1533.txt"
      },
      {
        "category": "artistic",
        "title": "Beethoven, Marcia funebre from Symphony No. 3 “Eroica” (MUSIC)",
        "excerpt": "The second movement of Beethoven's “Eroica” Symphony is a vast Marcia funebre (Adagio assai) in C minor: a heavy, processional tread over which the strings sing a grief-laden melody for a fallen hero, broken by a brighter major-key interlude before the theme returns shattered into fragments. Written as a memorial march, it sounds like the cortege of a public man cut down, and stands as the natural soundtrack to a figure ambushed on the eve of his testimony, the institution mourning even as it suspects its own. The full orchestral score is freely available on IMSLP.",
        "source": "Ludwig van Beethoven, Symphony No. 3 in E-flat major, Op. 55 “Eroica”, second movement (Marcia funebre. Adagio assai), full score hosted by IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Symphony_No.3,_Op.55_(Beethoven,_Ludwig_van)"
      },
      {
        "category": "artistic",
        "title": "Jean-Léon Gérôme, The Death of Caesar (VISUAL ARTWORK)",
        "excerpt": "Gérôme paints not the murder but its aftermath: Caesar lies sprawled and abandoned at the foot of Pompey's statue in the empty senate hall, a small white heap on the marble, while the jubilant conspirators stride away to the right, daggers raised, hailing their deed. The cold, near-photographic realism makes the loneliness of the slain man devastating—a powerful figure struck down by a coordinated conspiracy from within his own ranks, exactly the fate that a marked witness escaped only by surgery.",
        "source": "Jean-Léon Gérôme, The Death of Caesar (La Mort de César), 1859–1867, oil on canvas, Walters Art Museum, Baltimore (acc. 37.884); image via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Jean-L%C3%A9on_G%C3%A9r%C3%B4me_-_The_Death_of_Caesar_-_Walters_37884.jpg",
        "image": {
          "src": "/covers/sa-police-general-assassination-attempt--art.png",
          "alt": "Painting of the senate hall after Julius Caesar's assassination: Caesar's body lies on the floor at lower left while a group of conspirators raises daggers and walks away at right.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 12
  },
  {
    "slug": "alphabet-joins-dow-jones",
    "headline": "Alphabet joins the Dow Jones Industrial Average, replacing Verizon",
    "overview": "Alphabet, the parent of Google, replaced Verizon in the Dow Jones Industrial Average, joining mega-cap technology peers Nvidia, Amazon, Apple and Microsoft in the 30-stock benchmark. The change tilts the price-weighted index further toward artificial intelligence, cloud computing and digital advertising.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMixgFBVV95cUxOYWl5TkU1UWRkNmJiYTRINmM4NzlwWTlTbW1LbVVYLXVyU0VNZXpSNnFsMGFDOFMzRkVsZlJFZUZwZnc5cVRxMER6cW9qMnl6SXlWWGF5VXhUbzlPNmd3cVJTdXpudkZkR3ljSF9QQTcyaXc0bHlZNUhNYm5YcGxuNUw0eXN1aWIyRzdSOFhuaGNWa3JpekFLZFVmaGVFZDdrZEJIOVFqMC1BZENXX2UteXRqRGVKNzdoeFRsWmRxNWxtZHpiNWc?oc=5"
      },
      {
        "name": "CNBC",
        "href": "https://www.cnbc.com/2026/06/23/alphabet-verizon-dow-djia.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-30",
    "image": {
      "src": "/covers/alphabet-joins-dow-jones.png",
      "alt": "The neoclassical facade of the New York Stock Exchange on Wall Street",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 30 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Hanseatic League eclipsed by the Dutch and English",
        "excerpt": "In the 15th century the League, with increasing difficulty, held a defensive position against the competition of strong rivals and new trade-routes. In England the inevitable conflict of interests between the new mercantile power, growing conscious of its national strength, and the old, standing insistant on the letter of its privileges, was postponed by the factional discord out of which the Hansa in 1474 dexterously snatched a renewal of its rights. Under Elizabeth, however, the English Merchant Adventurers could finally rejoice at the withdrawal of privileges from the Hanseatics and their concession to England, in return for the retention of the Steelyard, of a factory in Hamburg. In the Netherlands the Hanseatics clung to their position in Bruges until 1540, while trade was migrating to the ports of Antwerp and Amsterdam. By the peace of Copenhagen in 1441, after the unsuccessful war of the League with Holland, the attempted monopoly of the Baltic was broken, and, though the Hanseatic trade regulations were maintained on paper, the Dutch with their larger ships increased their hold on the herring fisheries, the French salt trade, and the Baltic grain trade.",
        "source": "Edwin Francis Gay, \"Hanseatic League,\" Encyclopaedia Britannica, 11th ed. (1911), vol. 12; hosted on Wikisource. The medieval Hansa, once the dominant trading network of northern Europe, was displaced by a new mercantile power exactly as Verizon, an old telecom giant, yields its index seat to Alphabet.",
        "href": "https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Hanseatic_League"
      },
      {
        "category": "historical",
        "title": "The original Dow of 1896 and the long churn of its members",
        "excerpt": "The first calculation of the DJIA was comprised of stocks of twelve different companies in the industrial sector. The average started at 40.94 points. These companies were selected specifically to represent major areas of the U.S. economy following the recession in the late 1800s. ... By 1916 the number of stocks rose to 20 and again rose to 30 in 1928. ... Throughout most of its history, the stocks on the Index have been listed on the New York Stock Exchange, but in 1999 Microsoft and Intel (which were listed on the NASDAQ), were included. While General Electric is the only one of the original 12 stocks that is still listed (although it was removed and reinstated twice), many of the other original 12 have merged into other companies, which are included in the DIJA. ... Components of the DJIA are continually revised to reflect corporate industry in the United States.",
        "source": "Library of Congress, \"Dow Jones Industrial Average First Published,\" This Month in Business History research guide. The 1896 average measured an age of cotton oil, sugar, lead and gas; the same revising hand that retired those founding names now lifts Alphabet over Verizon to measure an age of AI and the cloud.",
        "href": "https://guides.loc.gov/this-month-in-business-history/may/djia-first-published"
      },
      {
        "category": "literary",
        "title": "Boethius: Fortune turns her wheel, the high come down and the low ascend",
        "excerpt": "Shall man's insatiate greed bind _me_ to a constancy foreign to my character? This is my art, this the game I never cease to play. I turn the wheel that spins. I delight to see the high come down and the low ascend. Mount up, if thou wilt, but only on condition that thou wilt not think it a hardship to come down when the rules of my game require it. Wert thou ignorant of my character? Didst not know how Croesus, King of the Lydians, erstwhile the dreaded rival of Cyrus, was afterwards pitiably consigned to the flame of the pyre, and only saved by a shower sent from heaven?",
        "source": "Boethius, The Consolation of Philosophy, Book II, Prose II (Fortune speaks), trans. H. R. James; Project Gutenberg ebook 14328. The figure of Fortune turning her wheel so that one giant rises while another descends is the oldest image for exactly what a price-weighted index does when it swaps Alphabet in for Verizon.",
        "href": "https://www.gutenberg.org/ebooks/14328"
      },
      {
        "category": "literary",
        "title": "Shelley's \"Ozymandias\": Look on my works, ye Mighty, and despair",
        "excerpt": "I met a traveller from an antique land\nWho said: Two vast and trunkless legs of stone\nStand in the desert...Near them, on the sand,\nHalf sunk, a shattered visage lies, whose frown,\nAnd wrinkled lip, and sneer of cold command,\nTell that its sculptor well those passions read\nWhich yet survive, stamped on these lifeless things,\nThe hand that mocked them, and the heart that fed:\nAnd on the pedestal these words appear:\n‘My name is Ozymandias, king of kings:\nLook on my works, ye Mighty, and despair!’\nNothing beside remains. Round the decay\nOf that colossal wreck, boundless and bare\nThe lone and level sands stretch far away.",
        "source": "Percy Bysshe Shelley, \"Ozymandias\" (1818); hosted on Wikisource. The sonnet on the transience of seemingly invincible greatness mirrors the fate of yesterday's commanding names: Verizon, once a benchmark titan, slips from the index while newer powers command the heights.",
        "href": "https://en.wikisource.org/wiki/Ozymandias_(Shelley)"
      },
      {
        "category": "artistic",
        "title": "Verdi, \"Triumphal March\" from Aida (MUSIC)",
        "excerpt": "Verdi's Grand March from Act II of Aida is the supreme musical image of a victorious new power being borne in triumph: blazing trumpets, a striding processional, the crowd massed to acclaim the conqueror entering the city in glory. Its pomp captures the moment a rising champion is welcomed into the highest company, just as Alphabet is paraded into the Dow's exclusive circle of thirty. Beneath the fanfare, Verdi laces the scene with the captives and the vanquished, a reminder that every triumphal entry is also someone's displacement, as Verizon quietly exits the procession the march celebrates.",
        "source": "Giuseppe Verdi, Aida (1871), Act II Triumphal March / Grand March; full scores and the Triumphal March extract hosted on IMSLP (Petrucci Music Library), public domain.",
        "href": "https://imslp.org/wiki/A%C3%AFda_(Verdi,_Giuseppe)"
      },
      {
        "category": "artistic",
        "title": "The Wheel of Fortune from the Carmina Burana (VISUAL ARTWORK)",
        "excerpt": "On the opening folio of the thirteenth-century Codex Buranus, blindfolded Fortune turns her great wheel while four crowned figures ride its rim, labelled Regnabo, Regno, Regnavi, Sum sine regno: \"I shall reign, I reign, I have reigned, I am without a realm.\" One king is hauled triumphantly upward to the throne at the top; another, scepter slipping, is flung headlong off the bottom. The single image fuses ascent and fall in one turning machine, the very motion of a benchmark that elevates Alphabet to the summit in the same instant it casts Verizon out below.",
        "source": "Anonymous, Wheel of Fortune (Rota Fortunae) illumination, folio 1r of the Carmina Burana / Codex Buranus, c. 1230, Bayerische Staatsbibliothek, Munich (Clm 4660); object file on Wikimedia Commons, public domain.",
        "href": "https://commons.wikimedia.org/wiki/File:CarminaBurana_wheel.jpg",
        "image": {
          "src": "/covers/alphabet-joins-dow-jones--art.png",
          "alt": "Medieval manuscript illumination of the Wheel of Fortune: a blindfolded crowned goddess turns a large wheel on which four kings rise to and fall from a throne, with Latin captions regnabo, regno, regnavi, sum sine regno.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 13
  },
  {
    "slug": "scotus-blocks-trump-firing-fed-cook",
    "headline": "US Supreme Court blocks Trump's attempt to fire Federal Reserve governor Lisa Cook",
    "overview": "The US Supreme Court has blocked President Trump's attempt to remove Federal Reserve governor Lisa Cook, sending the dispute over whether he can dismiss her back to the lower courts. The unsigned order is widely seen as a defence of the central bank's independence and a check on the president's power to fire officials at the Fed.",
    "genre": "Politics",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cy4wwy0nkeno"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiqgFBVV95cUxQb1JHcW4zcGozWE9wcl9IM2FnczFEbHBaRVVvdDRhQm9DTXVEOVJYaVJoS3hIakhvQjE1RWNRU182N3FNRmNMbkJhZFQtbXI1Zlh1M1M5R054QnNid1ZNdmFKbnVjX1h2M2xNR0M3eXJGM29pNVR6Zkh2R0IyU2ZpNDZ0OXJFVFJ3dnd4c3NZVGc1bnhuaWJtM2hLVVlWUVQtZDM1UFAxd1dqUQ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-29",
    "image": {
      "src": "/covers/scotus-blocks-trump-firing-fed-cook.png",
      "alt": "Federal Reserve governor Lisa Cook speaking at a conference",
      "credit": "BBC"
    },
    "edition": "Evening Edition · 29 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Humphrey's Executor v. United States (1935)",
        "excerpt": "In this unanimous decision the Supreme Court held that Congress could shield the commissioners of independent agencies from removal at the President's pleasure, ruling that an officer of a body that is \"neither political nor executive, but predominantly quasi judicial and quasi legislative\" could be removed only for cause. The Court declared that \"the authority of Congress, in creating quasi legislative or quasi judicial agencies, to require them to act in discharge of their duties independently of executive control cannot well be doubted; and that authority includes, as an appropriate incident, power to fix the period during which they shall continue, and to forbid their removal except for cause in the meantime.\" For ninety years this case has been the legal cornerstone of central-bank and agency independence cited in the Cook dispute.",
        "source": "Humphrey's Executor v. United States, 295 U.S. 602 (1935), U.S. Reports, Library of Congress",
        "href": "https://tile.loc.gov/storage-services/service/ll/usrep/usrep295/usrep295602/usrep295602.pdf"
      },
      {
        "category": "historical",
        "title": "The Act of Settlement 1701 (securing judicial tenure)",
        "excerpt": "That after the said Limitation shall take Effect as aforesaid Judges Commissions be made Quam diu se bene Gesserint and their Salaries ascertained and established but upon the Address of both Houses of Parliament it may be lawfull to remove them.",
        "source": "Act of Settlement 1701 (12 & 13 Will. III c. 2), via Wikisource",
        "href": "https://en.wikisource.org/wiki/Act_of_Settlement_1701"
      },
      {
        "category": "literary",
        "title": "The Book of Daniel 6:8, 6:15 (King James Version)",
        "excerpt": "Now, O king, establish the decree, and sign the writing, that it be not changed, according to the law of the Medes and Persians, which altereth not.\n...\nThen these men assembled unto the king, and said unto the king, Know, O king, that the law of the Medes and Persians is, That no decree nor statute which the king establisheth may be changed.",
        "source": "The Holy Bible, King James Version, Daniel 6, via Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Daniel"
      },
      {
        "category": "literary",
        "title": "Shakespeare, The Merchant of Venice (Act 3, Scene 3)",
        "excerpt": "The Duke cannot deny the course of law,\nFor the commodity that strangers have\nWith us in Venice, if it be denied,\nWill much impeach the justice of the state,\nSince that the trade and profit of the city\nConsisteth of all nations.",
        "source": "William Shakespeare, The Merchant of Venice, Act III, Scene iii, via Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/1515/pg1515.txt"
      },
      {
        "category": "artistic",
        "title": "Beethoven, Fidelio, Op. 72",
        "excerpt": "Beethoven's only opera dramatizes the triumph of justice over the abuse of arbitrary power: the nobleman Florestan is illegally imprisoned and slated for murder by the tyrannical governor Don Pizarro, only to be rescued when the lawful minister Don Fernando arrives to restore order and free the unjustly held. The work's surge from a dark dungeon into the light of the liberation chorus is one of music's great statements that no ruler stands above the law. It mirrors a court stepping in to check an executive's unilateral attempt to remove and silence an official.",
        "source": "Ludwig van Beethoven, Fidelio, Op. 72 — work page on IMSLP",
        "href": "https://imslp.org/wiki/Fidelio,_Op.72_(Beethoven,_Ludwig_van)"
      },
      {
        "category": "artistic",
        "title": "Peter Paul Rubens, Daniel in the Lions' Den (c. 1614-1616)",
        "excerpt": "Rubens depicts Daniel surrounded by life-size lions in the den into which the king was forced to cast him because, under the unchangeable law of the Medes and Persians, even the sovereign could not reverse his own sealed decree. The serene, praying figure ringed by predators makes vivid the moment when a ruler is bound by a law he cannot unmake. The canvas, now in the National Gallery of Art in Washington, gives visual form to the theme that fixed law constrains the power of the one who governs.",
        "source": "Peter Paul Rubens, Daniel in the Lions' Den, National Gallery of Art, Washington — Wikimedia Commons (Google Art Project)",
        "href": "https://commons.wikimedia.org/wiki/File:Sir_Peter_Paul_Rubens_-_Daniel_in_the_Lions%27_Den_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/scotus-blocks-trump-firing-fed-cook--art.png",
          "alt": "Painting of Daniel kneeling and praying, surrounded by a circle of lions in a stone den",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 14
  },
  {
    "slug": "scotus-rejects-trump-carroll-appeal",
    "headline": "US Supreme Court rejects Trump's appeal in the E. Jean Carroll case, leaving a $5 million verdict standing",
    "overview": "The US Supreme Court has declined to hear President Trump's appeal of the $5 million civil verdict won by the writer E. Jean Carroll, whom a jury found he had sexually abused and defamed. The decision leaves the award intact and exhausts Trump's main avenue to overturn the judgment.",
    "genre": "Politics",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cn8q2z5wpn2o"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMipgFBVV95cUxQWG1Gdm5YX2N0ZWlxZ2c4cU5Gb0NCdl9aZlRQY3UyZnR3WU9UQUhaN19qb3V2WkFWTjFjS0dVVmFHeFRVdFkyRXV6VmNseDNLWUo0UVB0emctajg4X1NpZjMxZHItTjBJUUQ1OUgwQUJIQU8teUdQSEROUm5US1BpVHZrSXFXU2E5aWticTh5YnQxNjhUV0hvU2xsdkhBbnVYOVlSV2Jn?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-29",
    "image": {
      "src": "/covers/scotus-rejects-trump-carroll-appeal.png",
      "alt": "Writer E. Jean Carroll in sunglasses and a blazer",
      "credit": "BBC"
    },
    "edition": "Evening Edition · 29 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "United States v. Nixon (1974): No man above the law",
        "excerpt": "When the Supreme Court unanimously rejected President Nixon's claim of an absolute executive privilege and ordered him to surrender the Watergate tapes, it established that even the most powerful office in the land bends to the courts. Nixon complied, the tapes exposed the cover-up, and within weeks he resigned. The case remains the touchstone for the principle that no person, however mighty, stands above judicial accountability.",
        "source": "Encyclopaedia Britannica, \"United States v. Nixon\"",
        "href": "https://www.britannica.com/event/United-States-v-Nixon"
      },
      {
        "category": "historical",
        "title": "New York Times Co. v. Sullivan (1964): The architecture of defamation",
        "excerpt": "This landmark ruling reshaped American libel law, holding that public officials must prove a false statement was made with \"actual malice\" to recover damages. It is the constitutional framework against which every modern defamation verdict, including the one Trump sought to overturn, is measured. The decision drew the enduring line between protected speech and reputational harm that the law will punish.",
        "source": "Encyclopaedia Britannica, \"New York Times Co. v. Sullivan\"",
        "href": "https://www.britannica.com/event/New-York-Times-Co-v-Sullivan"
      },
      {
        "category": "literary",
        "title": "Shakespeare, Othello (Iago on a good name)",
        "excerpt": "Good name in man and woman, dear my lord,\nIs the immediate jewel of their souls.\nWho steals my purse steals trash. 'Tis something, nothing;\n'Twas mine, 'tis his, and has been slave to thousands.\nBut he that filches from me my good name\nRobs me of that which not enriches him\nAnd makes me poor indeed.",
        "source": "William Shakespeare, Othello, Act III, Scene 3 (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/1531/pg1531.txt"
      },
      {
        "category": "literary",
        "title": "The History of Susanna: a woman falsely accused, then vindicated",
        "excerpt": "Are ye such fools, ye sons of Israel, that without examination or knowledge of the truth ye have condemned a daughter of Israel? Return again to the place of judgment: for they have borne false witness against her. ... With that all the assembly cried out with a loud voice, and praised God, who saveth them that trust in him. And they arose against the two elders, for Daniel had convicted them of false witness by their own mouth.",
        "source": "The History of Susanna (Apocrypha), King James Version, verses 48-61 (Wikisource)",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Susanna"
      },
      {
        "category": "artistic",
        "title": "Handel, Susanna, HWV 66 (1749)",
        "excerpt": "Handel's oratorio dramatizes the biblical Susanna, the virtuous wife falsely accused by two powerful elders whose lies are unmasked and turned back upon them. Premiered in 1749, its arias trace innocence besieged by slander and ultimately delivered by a just judgment. The work gives musical voice to a woman's word triumphing over the testimony of the mighty.",
        "source": "George Frideric Handel, Susanna, HWV 66 (IMSLP)",
        "href": "https://imslp.org/wiki/Susanna,_HWV_66_(Handel,_George_Frideric)"
      },
      {
        "category": "artistic",
        "title": "Artemisia Gentileschi, Susanna and the Elders (1610)",
        "excerpt": "Painted when the artist was around seventeen, this canvas shows Susanna recoiling from two conspiring elders, her body twisted in visceral refusal of their pressure. Gentileschi, who herself testified in a notorious rape trial, renders the wronged woman's distress with unusual psychological truth rather than as a pretext for sensual display. The painting has become an enduring emblem of a woman's resistance to the powerful and her eventual vindication.",
        "source": "Artemisia Gentileschi, Susanna and the Elders (1610), Schloss Weissenstein, Pommersfelden (Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Susanna_and_the_Elders_(1610),_Artemisia_Gentileschi.jpg",
        "image": {
          "src": "/covers/scotus-rejects-trump-carroll-appeal--art.png",
          "alt": "Susanna seated nude by a fountain, recoiling and turning her face away from two elders who lean over her conspiratorially.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 15
  },
  {
    "slug": "germany-youth-centre-shooting",
    "headline": "Six killed in a shooting at a youth welfare centre in northern Germany, two suspects detained",
    "overview": "Six people were killed in a shooting at a youth welfare centre in northern Germany, police said, after a sixth victim died of their injuries. Two suspects were detained as investigators worked to establish a motive for one of the country's deadliest shootings in recent years.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c17yzzw1vkjo"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMimwFBVV95cUxPWjh1ZkR3d0VldldxMEFSNDBSWEx5Y1RUZHNLbEVqMWc4dHR4MVZ2QlhFZ1h4LVc0eE5RNENRR2xDWGlDdFo5VF80aGtXbEFLZGh2UlB1NTE5amY4TkdreHVBMEhLb3E4VVZ1UUFyMWtHb0ZRTUNRMTVmVWtSazVFOVFRV1pRX0NxNjRhdWxFZjB2SUVKN253NmhZQQ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-29",
    "image": {
      "src": "/covers/germany-youth-centre-shooting.png",
      "alt": "Police and a crisis-intervention team near the scene of the shooting in northern Germany",
      "credit": "BBC"
    },
    "edition": "Evening Edition · 29 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Dunblane school massacre (1996)",
        "excerpt": "On 13 March 1996 a gunman, Thomas Hamilton, walked into the gymnasium of a primary school in the small Scottish town of Dunblane and opened fire on a class of five- and six-year-olds. Sixteen children and their teacher, Gwen Mayor, were killed before he turned a weapon on himself. The slaughter of the very young in a place of learning convulsed Britain and led to a near-total ban on private handgun ownership.",
        "source": "Encyclopaedia Britannica, \"Dunblane school massacre\"",
        "href": "https://www.britannica.com/event/Dunblane-school-massacre"
      },
      {
        "category": "historical",
        "title": "Beslan school siege (2004)",
        "excerpt": "On the morning of 1 September 2004, armed militants stormed School No. 1 in Beslan, North Ossetia, taking more than a thousand hostages, the majority of them children gathered with parents and teachers for the first day of the new term. After three days the siege ended in explosions and gunfire, leaving more than 330 people dead, most of them children. It remains one of the most harrowing modern instances of sudden violence engulfing the young and a whole grieving community.",
        "source": "Encyclopaedia Britannica, \"Beslan school attack\"",
        "href": "https://www.britannica.com/event/Beslan-school-attack"
      },
      {
        "category": "literary",
        "title": "The Massacre of the Innocents (Gospel of Matthew 2:16-18, KJV)",
        "excerpt": "Then Herod, when he saw that he was mocked of the wise men, was exceeding wroth, and sent forth, and slew all the children that were in Bethlehem, and in all the coasts thereof, from two years old and under...\nIn Rama was there a voice heard, lamentation, and weeping, and great mourning, Rachel weeping for her children, and would not be comforted, because they are not.",
        "source": "Gospel of Matthew 2:16-18, King James Version (Wikisource)",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Matthew"
      },
      {
        "category": "literary",
        "title": "Lycidas, by John Milton (1637)",
        "excerpt": "He must not flote upon his watry bear\nUnwept, and welter to the parching wind,\nWithout the meed of som melodious tear.\n\nWho would not sing for Lycidas? he knew\nHimself to sing, and build the lofty rhyme.",
        "source": "John Milton, \"Lycidas,\" in The Poetical Works of John Milton (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/1745/1745-h/1745-h.htm"
      },
      {
        "category": "artistic",
        "title": "Requiem in D minor, K.626 — Wolfgang Amadeus Mozart",
        "excerpt": "Mozart's unfinished Requiem, left incomplete at his death in 1791 and completed by his pupil Franz Xaver Suessmayr, is the supreme musical lament of the Western tradition. Its Lacrimosa (\"Full of tears shall be that day\") gives voice to grief almost beyond words, a weeping for the dead that mourners across centuries have made their own. It is the natural music of communal sorrow for the slain.",
        "source": "IMSLP / Petrucci Music Library, \"Requiem, K.626 (Mozart, Wolfgang Amadeus)\"",
        "href": "https://imslp.org/wiki/Requiem,_K.626_(Mozart,_Wolfgang_Amadeus)"
      },
      {
        "category": "artistic",
        "title": "Massacre of the Innocents — Guido Reni (1611)",
        "excerpt": "Guido Reni's Baroque masterpiece, painted in 1611 for the Basilica of San Domenico in Bologna, depicts Herod's soldiers slaughtering the infants of Bethlehem as their mothers recoil in anguish. The composition's upturned faces and outstretched arms transform raw horror into a frozen cry of maternal grief. It is one of art's most enduring images of innocent blood spilled and a community plunged into mourning.",
        "source": "Wikimedia Commons, \"Guido Reni - Massacre of the Innocents\" (Pinacoteca Nazionale, Bologna)",
        "href": "https://commons.wikimedia.org/wiki/File:Guido_Reni_-_Massacre_of_the_Innocents.jpg",
        "image": {
          "src": "/covers/germany-youth-centre-shooting--art.png",
          "alt": "Guido Reni's 1611 painting Massacre of the Innocents, showing mothers and soldiers amid the killing of children",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 16
  },
  {
    "slug": "ukraine-drones-russian-refinery-fuel",
    "headline": "Ukrainian drones set another Russian oil refinery ablaze as Putin admits spreading fuel shortages",
    "overview": "Ukrainian long-range drones set another Russian oil refinery ablaze overnight, part of a sustained campaign against Russia's energy industry. President Vladimir Putin acknowledged that fuel shortages were spreading to more regions of Russia as the strikes disrupted refining and distribution.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMinwFBVV95cUxPNTZPUlo3WW9DRjJzZzIxV3hsNzhpLUdGZEFGQXRUR0tUd1Q4dURpSnYxcFJFTFJuM0ZTRmd3RUVfZ0FEMlJ5U1ZrYlVLcDBOR2RaMmU4YzAzS0t0UzZBU21rbzlqU19HTjZRN0t0dEo1MWJuSW9RNEV0MVNCNDM1RDFqQU80T0tkTzNvOEpfWEE4SDdIN2R4ZlNuRHRINHc?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMipwFBVV95cUxOVkFhWExsZjdwNmxvdkd0TFFRaTQ5UW9CVi15QXdsazVwX3F5VEZoWl9sZmlYZi10cHdBOWtzZHRyQ18xWDNHR2NvMXRESnRIZFlGekJpa3RveG82WnVHMl90QVNSQ0JRVFUzY0d2dVVNbm5VZ0VMWWdWam1DU3UxMmtvX1hicWlBWWR5Qk1wQmhRNXdmQXEzSExuczloekFyUFNKa2E1SQ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-29",
    "image": {
      "src": "/covers/ukraine-drones-russian-refinery-fuel.png",
      "alt": "An oil refinery burning at night after a drone strike",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 29 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Allied Oil Campaign of World War II",
        "excerpt": "From 1944 the British and American air forces concentrated on Germany's refineries and synthetic-fuel plants, aiming to starve the Wehrmacht and Luftwaffe of petroleum. The strikes on installations such as Ploiesti and the Leuna works choked aviation fuel to a trickle, grounding aircraft and stalling armor. Armaments chief Albert Speer judged the loss of fuel meant the end of German war production, and Luftwaffe Field Marshal Erhard Milch said the Americans had stabbed Germany in the heart.",
        "source": "\"Oil campaign of World War II,\" Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Oil_campaign_of_World_War_II"
      },
      {
        "category": "historical",
        "title": "Sherman's March to the Sea (1864)",
        "excerpt": "After taking Atlanta, Union Major General William T. Sherman cut loose from his supply lines and marched across Georgia waging deliberate \"total war,\" destroying anything that could sustain the Confederate war effort. His troops burned military stores, tore up railroads, and torched depots and factories, severing the enemy's logistics and shattering Southern morale far behind the front. The scorched-earth campaign showed how striking an opponent's economic lifeblood could be as decisive as any battlefield victory.",
        "source": "\"Sherman's March to the Sea,\" Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Sherman's_March_to_the_Sea"
      },
      {
        "category": "literary",
        "title": "Homer, The Iliad, Book XV (Pope's translation)",
        "excerpt": "Haste, bring the flames! the toil of ten long years \nIs finished, and the day desired appears; \nThis happy day with acclamations greet, \nBright with destruction of yon hostile fleet.",
        "source": "Homer, The Iliad of Homer, trans. Alexander Pope, Book XV; Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Iliad_of_Homer_(Pope)/Book_15"
      },
      {
        "category": "literary",
        "title": "The Burning of Ai (Joshua 8, King James Version)",
        "excerpt": "And when the men of Ai looked behind them, they saw, and,\nbehold, the smoke of the city ascended up to heaven, and they\nhad no power to flee this way or that way...\nAnd Joshua burnt Ai, and made it an heap for ever, even a\ndesolation unto this day.",
        "source": "The Bible (King James Version), Joshua 8:20, 28; Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Joshua"
      },
      {
        "category": "artistic",
        "title": "Tchaikovsky, 1812 Overture, Op. 49",
        "excerpt": "Tchaikovsky's festival overture musically dramatizes Napoleon's catastrophic 1812 campaign in Russia, weaving the French anthem against Russian themes amid the roar of cannon and pealing bells. Composed to evoke a homeland set ablaze and an invading army broken by fire, cold, and resistance, it is among the most famous martial works in the repertoire. Its booming artillery and triumphant climax make it an apt sonic emblem of war reaching deep into a great power's home territory.",
        "source": "Pyotr Ilyich Tchaikovsky, 1812 Overture, Op. 49 (1880); IMSLP",
        "href": "https://imslp.org/wiki/1812_Overture,_Op.49_(Tchaikovsky,_Pyotr)"
      },
      {
        "category": "artistic",
        "title": "Fire of Moscow, 1812",
        "excerpt": "This painting depicts the great conflagration that consumed Moscow in September 1812 during Napoleon's occupation, the night sky lit orange as the city burns. The image captures a capital sacrificed to fire to deny the invader its spoils, a vision of war's destruction reaching the very heart of a nation. It stands as a haunting portrait of fire wielded as a weapon and a home front engulfed by war.",
        "source": "\"Fire of Moscow 1812,\" Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Fire_of_Moscow_1812.jpg",
        "image": {
          "src": "/covers/ukraine-drones-russian-refinery-fuel--art.png",
          "alt": "Painting of Moscow ablaze in 1812, flames and smoke rising over the burning city at night",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 17
  },
  {
    "slug": "comcast-spins-off-nbcuniversal",
    "headline": "Comcast to spin off NBCUniversal and Sky into a separate, publicly traded company",
    "overview": "Comcast said it will split into two public companies by spinning off NBCUniversal and Sky — its film and television studios, the Peacock streaming service, theme parks and broadcast networks — from its core cable and broadband business. Executives framed the roughly year-long separation as a way to unlock value, and Comcast shares jumped on the news.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMitwFBVV95cUxNeEstV29CWGdTSFdsV3dVZUg5eGM5N0ZkeTd3YWRvX0I3dk1CMHlpUHM3d1dGZUQ2NTVoWHVvNGtjWEltYi1CN0hsVmd3OUtNM0ZSYUJPa09LLUFXYjJZZkZ6VS0wNHEwdjV3dXdOWGhPRVNXX2Znd05RMXpqZW5pOVgtTXJjS1AxSkJQOE5vRUxQTjRfV0R5Vm1NVWhMWHBYc0hPdXlTVVVBQ1VBQVptc29SYm1ZTW8?oc=5"
      },
      {
        "name": "CNBC",
        "href": "https://www.cnbc.com/2026/06/29/comcast-announces-it-will-spin-off-media-and-tech-wings-into-separate-public-companies.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-29",
    "image": {
      "src": "/covers/comcast-spins-off-nbcuniversal.png",
      "alt": "30 Rockefeller Plaza, the New York home of NBCUniversal and Comcast",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 29 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Treaty of Verdun and the Partition of Charlemagne's Empire (843)",
        "excerpt": "After Louis's death the principles of heredity conquered at last the spirit of unity. By the treaty of Verdun (843)- of which unfortunately no authentic document remains- the three separate kingdoms were called into being which afterwards developed into France, Italy and Germany. The empire waned away, but did not die, although for a time the emperors were little more than petty local potentates. It was reserved for Otto the Great to restore it to its pristine glory.",
        "source": "Encyclopaedia Britannica (1911), \"Treaty of Verdun,\" via The Avalon Project, Yale Law School",
        "href": "https://avalon.law.yale.edu/medieval/verdun.asp"
      },
      {
        "category": "historical",
        "title": "Standard Oil Co. of New Jersey v. United States (1911)",
        "excerpt": "The unification of power and control over a commodity such as petroleum and its products by combining in one corporation the stocks of many other corporations aggregating a vast capital gives rise, of itself, to the prima facie presumption of an intent and purpose to dominate the industry connected with, and gain perpetual control of the movement of, that commodity and its products in the channels of interstate commerce in violation of the Anti-Trust Act of 1890, and that presumption is made conclusive by proof of specific acts such as those in the record of this case.",
        "source": "Standard Oil Co. of New Jersey v. United States, 221 U.S. 1 (1911), Syllabus, via Wikisource",
        "href": "https://en.wikisource.org/wiki/Standard_Oil_Co._of_New_Jersey_v._United_States"
      },
      {
        "category": "literary",
        "title": "King Lear Divides His Kingdom (Shakespeare, Act I, Scene 1)",
        "excerpt": "Give me the map there. Know that we have divided\nIn three our kingdom: and 'tis our fast intent\nTo shake all cares and business from our age;\nConferring them on younger strengths, while we\nUnburden'd crawl toward death. Our son of Cornwall,\nAnd you, our no less loving son of Albany,\nWe have this hour a constant will to publish\nOur daughters' several dowers, that future strife\nMay be prevented now.",
        "source": "William Shakespeare, The Tragedy of King Lear, Act I, Scene 1, via Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/1532/pg1532.txt"
      },
      {
        "category": "literary",
        "title": "Abram and Lot Divide the Land (Genesis 13)",
        "excerpt": "Is not the whole land before thee? separate thyself, I pray thee, from me: if thou wilt take the left hand, then I will go to the right; or if thou depart to the right hand, then I will go to the left.",
        "source": "The Holy Bible, King James Version, Genesis 13:9, via Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Genesis"
      },
      {
        "category": "artistic",
        "title": "Grande ouverture du roi Lear, H 53 (Hector Berlioz)",
        "excerpt": "Hector Berlioz's dramatic concert overture, inspired by Shakespeare's King Lear, opens with a grave, kingly unison theme for the lower strings that evokes the aging monarch's authority before the music fractures into stormy, conflicting passages mirroring the kingdom torn apart by his fateful division. Composed in 1831, the work translates the tragedy of a great realm sundered among heirs into orchestral form, swinging between tender lyricism and violent upheaval. The IMSLP work page provides the full public-domain score.",
        "source": "Hector Berlioz, Grande ouverture du roi Lear, H 53 (1831), IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Grande_ouverture_du_roi_Lear,_H_53_(Berlioz,_Hector)"
      },
      {
        "category": "artistic",
        "title": "Cordelia's Portion (Ford Madox Brown)",
        "excerpt": "Ford Madox Brown's vivid composition stages the very moment of partition: the aged King Lear gestures over the spread map of his realm as his court watches him carve the inheritance among his daughters. The flattering elder sisters bask in the glow of their lavish shares while the honest Cordelia stands apart, refused her portion, the whole tableau dramatizing how the dismemberment of a great estate sows the seeds of ruin. The work renders in paint the same logic of a giant divided that animates any breakup of an empire or a conglomerate.",
        "source": "Ford Madox Brown, Cordelia's Portion (c. 1866-1872), via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Cordelia%27s_Portion.jpg",
        "image": {
          "src": "/covers/comcast-spins-off-nbcuniversal--art.png",
          "alt": "Painting of King Lear dividing his kingdom among his daughters, with Cordelia standing apart",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 18
  },
  {
    "slug": "strategy-value-below-bitcoin",
    "headline": "Strategy's market value slips below the worth of its bitcoin holdings as crypto sentiment sours",
    "overview": "Strategy, the largest corporate holder of bitcoin, has seen its market value fall below the worth of its roughly 847,000 bitcoin, erasing the premium that funded its buying spree. The crossover raises doubts about whether the company can keep raising money to accumulate more of the cryptocurrency.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiwgFBVV95cUxNZk42eF9xeEpsNF93b3l1Ul9OUlplNEs3VnJwUjB4bjAwTnRXQWxLOWRsc2lQYURsWEFBZDZQdUtGZnhSeDA3cVBXM01RTHV4MW56dnhkMkl5Sk5qeEZMbThmUWlVOEdBQXduaUVYLVNSTGhkakdleUFaYmVNemxCajdfTmZPNHlRWFZWX2ZnWEhsYjZiNGpKOTZfVkRDaFdTcDEwUFRPWEtoSDlMcW1oTFFFcTAwVDhoRlM1R0tQZElGQQ?oc=5"
      },
      {
        "name": "PYMNTS",
        "href": "https://www.pymnts.com/cryptocurrency/2026/strategy-valuation-drop-threatens-key-bitcoin-funding-engine/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-29",
    "image": {
      "src": "/covers/strategy-value-below-bitcoin.png",
      "alt": "A deflating soap bubble drifting in a darkened room",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 29 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The South Sea Bubble (1720)",
        "excerpt": "In August the fall in the price of South Sea stock began, and in September, just as the 'insiders' had sold out, it became serious. Instead of being a buyer every one became a seller, and the result was that in a few days the stock of the South Sea Company fell to 175, while the stocks of many other companies were unsaleable.",
        "source": "\"South Sea Bubble,\" Encyclopaedia Britannica (11th ed., 1911), via Wikisource",
        "href": "https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/South_Sea_Bubble"
      },
      {
        "category": "historical",
        "title": "John Law and the Mississippi Scheme",
        "excerpt": "People began to sell their shares, and to buy coin, houses, land—anything that had a stable element of value in it.",
        "source": "\"Law, John,\" Encyclopaedia Britannica (11th ed., 1911), via Wikisource",
        "href": "https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Law,_John"
      },
      {
        "category": "literary",
        "title": "Ecclesiastes: \"Vanity of vanities\"",
        "excerpt": "Vanity of vanities, saith the Preacher, vanity of vanities; all is vanity.\nHe that loveth silver shall not be satisfied with silver; nor he that loveth abundance with increase: this is also vanity.\nThere is a sore evil which I have seen under the sun, namely, riches kept for the owners thereof to their hurt.",
        "source": "Ecclesiastes 1:2; 5:10,13, King James Version, via Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Ecclesiastes"
      },
      {
        "category": "literary",
        "title": "The Parable of the Rich Fool (Luke 12:16-21)",
        "excerpt": "And he said, This will I do: I will pull down my barns, and build greater; and there will I bestow all my grain and my goods. And I will say to my soul, Soul, thou hast much goods laid up for many years; take thine ease, eat, drink, be merry. But God said unto him, Thou foolish one, this night is thy soul required of thee; and the things which thou hast prepared, whose shall they be? So is he that layeth up treasure for himself, and is not rich toward God.",
        "source": "Luke 12:18-21, American Standard Version, via Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(American_Standard)/Luke"
      },
      {
        "category": "artistic",
        "title": "Saint-Saens, Danse macabre, Op. 40",
        "excerpt": "Saint-Saens's 1874 symphonic poem conjures Death tuning his fiddle at midnight to rouse skeletons into a frenzied dance, the xylophone clattering like rattling bones. Its whirling waltz spins ever faster toward an inevitable, deflating collapse when the cock crows and the dancers crumble back to dust. A fitting score for a euphoric speculative dance that ends, abruptly, at dawn.",
        "source": "Camille Saint-Saens, Danse macabre, Op. 40 (1874), IMSLP work page",
        "href": "https://imslp.org/wiki/Danse_macabre,_Op.40_(Saint-Sa%C3%ABns,_Camille)"
      },
      {
        "category": "artistic",
        "title": "William Hogarth, The South Sea Scheme (1721)",
        "excerpt": "Hogarth's earliest satirical engraving depicts Londoners crowding to ride a merry-go-round of speculation while Honesty is broken on a wheel and Honour is flogged. Set beneath the Monument, the print pillories the greed and credulity that inflated the South Sea Company before its ruinous crash. It remains the defining visual indictment of a financial mania built on illusory premium.",
        "source": "William Hogarth, \"The South Sea Scheme\" (1721), British Museum impression, via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:The_South_Sea_Scheme_(BM_S,2.4).jpg",
        "image": {
          "src": "/covers/strategy-value-below-bitcoin--art.png",
          "alt": "Hogarth's 1721 satirical print of crowds riding a speculation merry-go-round during the South Sea Bubble",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 19
  },
  {
    "slug": "rocket-lab-buys-iridium",
    "headline": "Rocket Lab to buy satellite operator Iridium in an $8 billion cash-and-stock deal",
    "overview": "Rocket Lab has agreed to acquire the satellite-communications company Iridium in a deal valuing it at about $8 billion, paying $54 a share in cash and stock. The acquisition pushes the launch company into operating its own global satellite network, with the deal expected to close in mid-2027.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMixAFBVV95cUxQejk2T29RQV9nS05KV205R1FobVVPcFFySVdTaEhkYzV4djZNVDlPaEpOQTF5bGYxMUVxTG1LekJabG5PZ2w0TUsxRjRrQm1EVzdBdHZ2dkZSNEVCS0toS2ROV1dBWk1OSkI3Qk9hRjB2bnlNcXdjNV9PYlJyaDNzbmhFM3otb2hQc2FpWUt2YWdjRGN2dDZPZWZVSExvdDFPcWdHYUJRMEs5eVFQT1ZoYnkyUGhSMVUzQzJZZDRmeWxCZWlj?oc=5"
      },
      {
        "name": "TechCrunch",
        "href": "https://techcrunch.com/2026/06/29/rocket-lab-continues-buying-spree-by-acquiring-satellite-company-iridium/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-29",
    "image": {
      "src": "/covers/rocket-lab-buys-iridium.png",
      "alt": "Rocket Lab's Launch Complex 1 on New Zealand's Mahia Peninsula",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 29 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The first transatlantic telegraph cable (1858/1866)",
        "excerpt": "After repeated failures and one cable that died within weeks, the Atlantic Telegraph Company finally bound the Old World to the New: on 16 August 1858 the first messages crossed the ocean, and the durable 1866 cable made permanent, near-instant communication between continents a reality. What had taken ten days by ship now took minutes. It was the original dream of girdling the planet in a single communications network, the same ambition Rocket Lab pursues by reaching not under the sea but above the sky.",
        "source": "Transatlantic telegraph cable, Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Transatlantic_telegraph_cable"
      },
      {
        "category": "historical",
        "title": "AT&T, the telephone upstart, swallows the telegraph giant Western Union",
        "excerpt": "Western Union had ridden the telegraph to a near-monopoly over American communications, the established colossus of its age. Yet in 1909 the younger American Telephone & Telegraph Company acquired control of the very giant whose technology it was rendering obsolete, an upstart absorbing the incumbent it had outgrown. The pattern echoes in Rocket Lab buying the established satellite operator Iridium: a fast-rising power devouring the entrenched one to control the whole chain.",
        "source": "History of AT&T, Wikipedia",
        "href": "https://en.wikipedia.org/wiki/History_of_AT%26T"
      },
      {
        "category": "literary",
        "title": "Puck girdles the earth in A Midsummer Night's Dream",
        "excerpt": "PUCK. I'll put a girdle round about the earth\nIn forty minutes.",
        "source": "William Shakespeare, A Midsummer Night's Dream, Act 2, Scene 1 (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/1778/pg1778.html"
      },
      {
        "category": "literary",
        "title": "The fall of Icarus in Ovid's Metamorphoses, Book VIII",
        "excerpt": "touched with a desire of reaching heaven, pursued his course still higher. The vicinity of the scorching Sun softened the fragrant wax that fastened his wings. The wax was melted; he shook his naked arms, and, wanting his oar-like wings, he caught no more air. His face, too, as he called on the name of his father, was received in the azure water, which received its name from him.",
        "source": "Ovid, Metamorphoses, Book VIII (trans. Henry T. Riley), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/26073/26073-h/26073-h.htm"
      },
      {
        "category": "artistic",
        "title": "Gustav Holst, The Planets, Op. 32",
        "excerpt": "Holst's sweeping orchestral suite gives each planet a character, from the hammering menace of Mars to the soaring nobility of Jupiter and the mystic dissolution of Neptune. Composed 1914-1917, it is the supreme musical embodiment of humanity's gaze into the heavens, mapping the solar system in sound. Its cosmic ambition mirrors a launch company reaching to operate its own constellation across the sky.",
        "source": "The Planets, Op.32 (Holst, Gustav), IMSLP",
        "href": "https://imslp.org/wiki/The_Planets,_Op.32_(Holst,_Gustav)"
      },
      {
        "category": "artistic",
        "title": "Pieter Bruegel the Elder, The Tower of Babel (1563)",
        "excerpt": "Bruegel's vast spiraling tower rises into the clouds, a monument to humanity's ambition to build a structure that would reach the heavens and unite all people under one name. Cracks and uneven tiers already hint at the hubris of the project. It is the archetypal image of mankind binding itself together and grasping for the sky, the mythic shadow of any quest to master the heavens.",
        "source": "Pieter Bruegel the Elder, The Tower of Babel (Vienna), 1563, Kunsthistorisches Museum (Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_the_Elder_-_The_Tower_of_Babel_(Vienna)_-_Google_Art_Project_-_edited.jpg",
        "image": {
          "src": "/covers/rocket-lab-buys-iridium--art.png",
          "alt": "Pieter Bruegel the Elder's 1563 painting of the Tower of Babel rising into the clouds",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 20
  },
  {
    "slug": "apple-india-antitrust-copy-paste",
    "headline": "Apple accuses India's antitrust regulator of 'copy-pasting' rivals' claims and seeks to quash the case",
    "overview": "Apple has accused investigators at the Competition Commission of India of 'copy-pasting' the claims of rivals such as Match and Paytm rather than conducting their own analysis, and has asked for the findings against it to be thrown out. The dispute centres on allegations that Apple abused its position over App Store payments, with a closed-door hearing set for July.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiyAFBVV95cUxQd3hWX013N1NMeEhOMWxxRkZhbFBrTGZ4ajhMS0ltUTBkZnFNcFk5U0RLLWtBRVd6RXl6RWpPR2hQREpFSUl6WlN3R0RndzlKQnVhenN4UUd5d2hQUnBQUDNENUVTbXJheXd2VVFEZXE4eDVsQ19uYlZjdVRudWthX3ZXWlpERk94V2x3NXZTRFBqNDcwZHlMOEozeWdkQlppNVZfcUlrSXhJa0V2azlxaWhhcVpmYUVUblpCYXV3MmxiOXhkeGgxNw?oc=5"
      },
      {
        "name": "Business Standard",
        "href": "https://www.business-standard.com/companies/news/apple-accuses-cci-of-copy-pasting-rivals-claims-in-antitrust-probe-126062900563_1.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-29",
    "image": {
      "src": "/covers/apple-india-antitrust-copy-paste.png",
      "alt": "Brass scales of justice before a sleek glass storefront",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 29 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Standard Oil Co. of New Jersey v. United States (1911)",
        "excerpt": "The colossus of its age, John D. Rockefeller's Standard Oil controlled some ninety percent of American oil refining, squeezing rivals through secret rebates and predatory pricing until the Supreme Court ruled it an unreasonable restraint of trade under the Sherman Act and ordered the trust dissolved into thirty-four companies. It is the archetypal trustbuster-versus-giant case: the gatekeeper of an entire industry broken open by the state. Chief Justice White's opinion announced the enduring \"rule of reason\" for judging monopoly power.",
        "source": "Standard Oil Co. of New Jersey v. United States, 221 U.S. 1 (1911), Cornell Legal Information Institute",
        "href": "https://www.law.cornell.edu/supremecourt/text/221/1"
      },
      {
        "category": "historical",
        "title": "United States v. Microsoft Corp. (2001)",
        "excerpt": "Microsoft was found to have unlawfully maintained its operating-system monopoly and to have tied its browser to Windows, the classic gatekeeper leveraging control of a platform. Strikingly close to Apple's gambit, Microsoft attacked the fairness of its judge: the D.C. Circuit disqualified District Judge Thomas Penfield Jackson for giving press interviews betraying bias, even as it affirmed the core monopolization finding. A tech giant escaping its breakup not by disproving the antitrust case but by impeaching the impartiality of the one who judged it.",
        "source": "United States v. Microsoft Corp., 253 F.3d 34 (D.C. Cir. 2001), opinion text (UC Berkeley Law)",
        "href": "https://www.law.berkeley.edu/files/US_v_Microsoft3.pdf"
      },
      {
        "category": "literary",
        "title": "The Lion's Share (Aesop)",
        "excerpt": "He then very carefully divided the Stag into four equal parts.\n\"I am King Lion,\" he said, when he had finished, \"so of course I get the first part. This next part falls to me because I am the strongest; and this is mine because I am the bravest.\"\nHe now began to glare at the others very savagely. \"If any of you have any claim to the part that is left,\" he growled, stretching his claws meaningly, \"now is the time to speak up.\"",
        "source": "\"The Lion's Share,\" The Aesop for Children (Library of Congress, read.gov)",
        "href": "https://read.gov/aesop/141.html"
      },
      {
        "category": "literary",
        "title": "Christian and Apollyon in the Valley of Humiliation (Bunyan)",
        "excerpt": "By this I perceive that thou art one of my subjects; for all that country is mine, and I am the prince and god of it.\n...\nThen Apollyon straddled quite over the whole breadth of the way, and said, I am void of fear in this matter.",
        "source": "John Bunyan, The Pilgrim's Progress (1890 ed.), \"The Fourth Stage,\" Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Pilgrim's_Progress_(1890)/The_Fourth_Stage"
      },
      {
        "category": "artistic",
        "title": "Johann Kuhnau, \"Der Streit zwischen David und Goliath\" (Biblical Sonata No. 1, 1700)",
        "excerpt": "The first of Kuhnau's six Biblical Sonatas is early program music that narrates the David and Goliath duel entirely on a keyboard: the boasting of the giant, the trembling of Israel, the whir of the slung stone, the fall of the colossus, and the rejoicing that follows. It is the perfect sonic emblem of the small challenger toppling the gatekeeping giant, a theme that haunts every monopoly fight. Published in Leipzig in 1700, it stands among the earliest descriptive instrumental music in the Western canon.",
        "source": "Johann Kuhnau, Musicalische Vorstellung einiger biblischer Historien (1700), IMSLP",
        "href": "https://imslp.org/wiki/Musicalische_Vorstellung_einiger_biblischer_Historien_(Kuhnau,_Johann)"
      },
      {
        "category": "artistic",
        "title": "\"Next!\" — the Standard Oil octopus (Udo Keppler, Puck, 1904)",
        "excerpt": "Udo Keppler's 1904 chromolithograph for Puck shows Standard Oil as a vast octopus, its tentacles already wrapped around state legislatures, the Capitol, and the steel and shipping industries, with one arm reaching hungrily toward the White House. It is the defining visual shorthand for monopoly as a strangling, toll-extracting colossus that captures the very institutions meant to check it. A fitting image for a gatekeeper accused of choking competition while battling the regulators at its door.",
        "source": "Udo J. Keppler, \"Next!\", Puck, Sept. 7, 1904 (Library of Congress; Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Standard_oil_octopus_loc_color.jpg",
        "image": {
          "src": "/covers/apple-india-antitrust-copy-paste--art.png",
          "alt": "1904 political cartoon depicting Standard Oil as an octopus whose tentacles grip the U.S. Capitol, state houses, and industries while reaching for the White House",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 21
  },
  {
    "slug": "delhi-ev-scrappage-incentive",
    "headline": "New Delhi to offer residents more than $1,000 to scrap old cars and switch to electric vehicles",
    "overview": "New Delhi has finalised a policy offering car owners a cash incentive of more than $1,000 to scrap older petrol and diesel vehicles and buy an electric vehicle, tying its biggest subsidies to taking high-emission cars off the road. The government says the measure, part of a new EV policy, is aimed at curbing the capital's notorious air pollution.",
    "genre": "Climate",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiuAFBVV95cUxQSHFTWEdOenVOclRpNmdCNF9SV1RTeXZUaGRSUTlPNGhmaHQzWVVNN2FXcE9CZ1lGMUs2bkJCcVRiTkJwSFg4LVh1NTlwdzRBb2ZzbkZjaG9ESi1FMm1fNzdVaXJDMjFkcVBQalRDU09QSzUxX2R5TDg5MWYxNmRIeWFWZnhhR1liZVgwdGI5ajR5YkdJNWk4MDN3Tm5XX0RQREx3R2VjQzAybU1rTFhXR05LdThEQlB5?oc=5"
      },
      {
        "name": "Outlook Business",
        "href": "https://www.outlookbusiness.com/news/delhi-ev-policy-20-subsidies-scrappage-benefits-and-neighborhood-charging-for-2026"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-29",
    "image": {
      "src": "/covers/delhi-ev-scrappage-incentive.png",
      "alt": "A New Delhi street shrouded in heavy air pollution",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 29 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Great Smog of London (1952) and the Clean Air Act",
        "excerpt": "In December 1952 a high-pressure inversion trapped coal smoke and sulphur dioxide over London, turning the city into a deadly, choking pall that killed an estimated thousands and brought transport to a standstill. The disaster shocked Britain into passing the Clean Air Act of 1956, which created smoke-control areas and pushed households off raw coal toward cleaner fuels. Like Delhi paying to retire its dirtiest cars, Britain decided that clearing the air meant deliberately driving the worst polluters out of the city.",
        "source": "Encyclopaedia Britannica, \"Great Smog of London\"",
        "href": "https://www.britannica.com/event/Great-Smog-of-London"
      },
      {
        "category": "historical",
        "title": "The Great Stink of 1858 and Bazalgette's London sewers",
        "excerpt": "When the stench of the sewage-choked Thames drove Members of Parliament from their chamber in the hot summer of 1858, the civil engineer Sir Joseph William Bazalgette designed a vast main-drainage system of intercepting sewers to carry the city's filth away. Opened in 1865 and completed in 1875, the network cleansed the river and is credited with ending London's cholera epidemics. It is the classic case of a great capital spending heavily to purge an old, sickening contamination and make way for a healthier city.",
        "source": "Encyclopaedia Britannica, \"Sir Joseph William Bazalgette\"",
        "href": "https://www.britannica.com/biography/Joseph-William-Bazalgette"
      },
      {
        "category": "literary",
        "title": "Sophocles, Oedipus the King — the plague-pall over Thebes",
        "excerpt": "A blight is on our harvest in the ear,\nA blight upon the grazing flocks and herds...\nArmed with his blazing torch the God of Plague\nHath swooped upon our city emptying\nThe house of Cadmus, and the murky realm\nOf Pluto is full fed with groans and tears.",
        "source": "Sophocles, Oedipus King of Thebes (trans. F. Storr), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/31/31-h/31-h.htm"
      },
      {
        "category": "literary",
        "title": "Shakespeare, Hamlet — \"a foul and pestilent congregation of vapours\"",
        "excerpt": "this most excellent canopy the air, look you, this brave o'erhanging firmament, this majestical roof fretted with golden fire, why, it appears no other thing to me than a foul and pestilent congregation of vapours.",
        "source": "William Shakespeare, Hamlet, Act II, Scene II, Project Gutenberg",
        "href": "https://www.gutenberg.org/files/1524/1524-h/1524-h.htm"
      },
      {
        "category": "artistic",
        "title": "Vaughan Williams, A London Symphony (Symphony No. 2)",
        "excerpt": "Ralph Vaughan Williams's second symphony evokes a great city wreathed in mist and river haze, its movements drifting from the muffled chimes of the Thames embankment to the surging clamour of the streets. The music holds together the murk and the grandeur of London, the same brooding atmosphere of smoke and fog that hangs over Monet's Westminster and over smog-bound capitals like Delhi. It is a portrait of an industrial metropolis breathing through its own grey air.",
        "source": "Ralph Vaughan Williams, A London Symphony (Symphony No. 2), IMSLP",
        "href": "https://imslp.org/wiki/A_London_Symphony_(Symphony_No.2)_(Vaughan_Williams,_Ralph)"
      },
      {
        "category": "artistic",
        "title": "Claude Monet, Houses of Parliament, London (1900-1901)",
        "excerpt": "Monet painted the Palace of Westminster again and again as a spectral silhouette dissolving in London's thick, coal-tinged fog, the river and sky merged into a single luminous haze. The series turns industrial smog into something hauntingly beautiful while documenting exactly the kind of choking urban air that modern cities now race to clear. It is the visual archetype of a great capital seen through a pall of pollution.",
        "source": "Claude Monet, \"Houses of Parliament, London\" (Art Institute of Chicago), Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Claude_Monet_-_Houses_of_Parliament,_London.jpg",
        "image": {
          "src": "/covers/delhi-ev-scrappage-incentive--art.png",
          "alt": "Monet's impressionist painting of the Houses of Parliament looming as a dark silhouette through dense London fog over the Thames",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 22
  },
  {
    "slug": "drc-bans-gatherings-ebola",
    "headline": "DR Congo bans mass gatherings in its capital to curb a growing Ebola outbreak",
    "overview": "The Democratic Republic of Congo has banned mass gatherings in the capital, Kinshasa, and stepped up screening to prevent the spread of an Ebola outbreak that has become one of the largest on record. More than 1,000 cases have been confirmed, with the eastern Ituri province the worst affected.",
    "genre": "Science",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c992k7zk981o"
      },
      {
        "name": "WHO",
        "href": "https://www.who.int/emergencies/situations/ebola-outbreak---drc-2026"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-29",
    "image": {
      "src": "/covers/drc-bans-gatherings-ebola.png",
      "alt": "A health worker in goggles and a mask holding a thermometer during the Ebola outbreak",
      "credit": "BBC"
    },
    "edition": "Evening Edition · 29 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Birth of Quarantine in Ragusa and Venice (1377-1448)",
        "excerpt": "As the Black Death tore through Europe, the Adriatic port city of Ragusa (modern Dubrovnik) in 1377 became the first to legally enforce isolation, requiring arriving ships and travelers to wait in a restricted place for thirty days (a trentino) before entering the city to see whether the symptoms of plague would appear. Venice later extended the waiting period to forty days, the quarantena that gives us the word quarantine, sealing the city's gates against pestilence by holding suspected carriers at bay. These medieval measures of detention, isolation, and the throttling of free movement are the direct ancestors of Kinshasa's screening and gathering bans.",
        "source": "Sarah Pruitt, \"Social Distancing and Quarantine Were Used in Medieval Times to Fight the Black Death,\" History.com",
        "href": "https://www.history.com/articles/quarantine-black-death-medieval"
      },
      {
        "category": "historical",
        "title": "Thucydides, The Plague of Athens (430 BC)",
        "excerpt": "An aggravation of the existing calamity was the influx from the country into the city, and this was especially felt by the new arrivals.  As there were no houses to receive them, they had to be lodged at the hot season of the year in stifling cabins, where the mortality raged without restraint.  The bodies of dying men lay one upon another, and half-dead creatures reeled about the streets and gathered round all the fountains in their longing for water.",
        "source": "Thucydides, History of the Peloponnesian War, Book 2 (Crawley trans.), via Wikisource",
        "href": "https://en.wikisource.org/wiki/History_of_the_Peloponnesian_War/Book_2"
      },
      {
        "category": "literary",
        "title": "Daniel Defoe, A Journal of the Plague Year (1722)",
        "excerpt": "That all plays, bear-baitings, games, singing of ballads, buckler-play, or such-like causes of assemblies of people be utterly prohibited.",
        "source": "Daniel Defoe, A Journal of the Plague Year, Project Gutenberg eBook #376",
        "href": "https://www.gutenberg.org/files/376/376-h/376-h.htm"
      },
      {
        "category": "literary",
        "title": "Giovanni Boccaccio, The Decameron, Proem (1353)",
        "excerpt": "Some there were who conceived that to live moderately and keep oneself from all excess was the best defence against such a danger; wherefore, making up their company, they lived removed from every other and shut themselves up in those houses where none had been sick and where living was best.",
        "source": "Giovanni Boccaccio, The Decameron (Payne trans.), Project Gutenberg eBook #23700",
        "href": "https://www.gutenberg.org/cache/epub/23700/pg23700.txt"
      },
      {
        "category": "artistic",
        "title": "Franz Liszt, Totentanz (Dance of Death), S.126",
        "excerpt": "Liszt's Totentanz for piano and orchestra is a thunderous set of variations on the medieval Dies Irae plainchant, the sequence sung over the dead since the age of plague. Its grim, hammering paraphrase of the Dance of Death evokes the universal leveling power of pestilence, in which all ranks of a city are summoned alike to the grave. The work channels the same dread of contagion and mass mortality that drives a capital to bolt its doors and forbid its crowds.",
        "source": "Franz Liszt, Totentanz, S.126, work page on IMSLP",
        "href": "https://imslp.org/wiki/Totentanz,_S.126_(Liszt,_Franz)"
      },
      {
        "category": "artistic",
        "title": "Nicolas Poussin, The Plague at Ashdod (1630-1631)",
        "excerpt": "Poussin's canvas depicts the biblical plague that struck the Philistine city of Ashdod after the Ark was seized, the streets strewn with the dead and dying while the living recoil, cover their faces, and flee the contagion. Stricken bodies sprawl beside infants clinging to dead mothers as terrified citizens point and scatter, the architecture of a great city emptying in panic. Painted during a plague outbreak in Italy, it crystallizes the ancient terror of pestilence loosed within a city's walls.",
        "source": "Nicolas Poussin, The Plague at Ashdod, Musee du Louvre (INV 7276), via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:La_Peste_d%27Asdod_-_Nicolas_Poussin_-_Mus%C3%A9e_du_Louvre_Peintures_INV_7276_%3B_MR_2312.jpg",
        "image": {
          "src": "/covers/drc-bans-gatherings-ebola--art.png",
          "alt": "Baroque painting of plague-stricken Ashdod, with the dead and dying in the streets and panicked citizens fleeing amid classical architecture.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 23
  },
  {
    "slug": "antarctica-first-dinosaur-bone",
    "headline": "First dinosaur bone from Antarctica identified after lying forgotten in a museum drawer for 40 years",
    "overview": "Scientists have identified the first dinosaur bone ever found in Antarctica — a titanosaur tail bone collected on James Ross Island in 1985 that sat unrecognised in a British Antarctic Survey drawer for four decades. The fossil dates to about 82 million years ago, when Antarctica was covered in forest, confirming that the giant plant-eaters roamed the polar continent.",
    "genre": "Science",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cdep67jnn9zo"
      },
      {
        "name": "The Daily Beast",
        "href": "https://www.thedailybeast.com/scientists-stumble-on-historic-discovery-of-dinosaur-bone-in-forgotten-drawer/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-29",
    "image": {
      "src": "/covers/antarctica-first-dinosaur-bone.png",
      "alt": "The fossilised titanosaur tail bone resting on a map of Antarctica",
      "credit": "BBC"
    },
    "edition": "Evening Edition · 29 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Mary Anning and the fossils of Lyme Regis",
        "excerpt": "From childhood, Mary Anning combed the crumbling cliffs of Lyme Regis on the Dorset coast, prising the bones of vanished sea-dragons from the Jurassic rock. In 1811 her brother spotted an ichthyosaur skull, and Mary, then about twelve, painstakingly excavated the rest of the five-metre skeleton over the following months. Her finds reshaped science, yet for decades the unsung collector who unearthed them went largely uncredited, her discoveries scattered into museum cases under other men's names.",
        "source": "Natural History Museum, London — \"Mary Anning: the unsung hero of fossil discovery\"",
        "href": "https://www.nhm.ac.uk/discover/mary-anning-unsung-hero.html"
      },
      {
        "category": "historical",
        "title": "Gideon Mantell and the first dinosaurs",
        "excerpt": "In 1825 the English physician Gideon Mantell described Iguanodon from a handful of fossil teeth whose resemblance to those of a living iguana convinced him he had found a giant extinct reptile. It became only the second creature ever named scientifically as a dinosaur, alongside Buckland's Megalosaurus, opening humanity's eyes to a lost world of vanished giants. The story is one of patient inference: from a few overlooked fragments, an entire prehistoric age was reconstructed.",
        "source": "Encyclopaedia Britannica — \"Iguanodon\"",
        "href": "https://www.britannica.com/animal/Iguanodon"
      },
      {
        "category": "literary",
        "title": "Shelley, \"Ozymandias\" (1818)",
        "excerpt": "I met a Traveller from an antique land,\nWho said, \"Two vast and trunkless legs of stone\nStand in the desart. Near them, on the sand,\nHalf sunk, a shattered visage lies, whose frown,\nAnd wrinkled lip, and sneer of cold command,\nTell that its sculptor well those passions read,\nWhich yet survive, stamped on these lifeless things,\nThe hand that mocked them, and the heart that fed:\n...\nNo thing beside remains. Round the decay\nOf that Colossal Wreck, boundless and bare,\nThe lone and level sands stretch far away.",
        "source": "Percy Bysshe Shelley, \"Ozymandias,\" The Examiner (11 January 1818), via Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Examiner_(London)/Ozymandias"
      },
      {
        "category": "literary",
        "title": "The Valley of Dry Bones (Ezekiel 37)",
        "excerpt": "The hand of the LORD was upon me, and carried me out in the spirit of the LORD, and set me down in the midst of the valley which was full of bones,\nAnd caused me to pass by them round about: and, behold, there were very many in the open valley; and, lo, they were very dry.\nAnd he said unto me, Son of man, can these bones live? And I answered, O Lord GOD, thou knowest.",
        "source": "Ezekiel 37:1-3, King James Version, via Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Ezekiel"
      },
      {
        "category": "artistic",
        "title": "Saint-Saens, \"Fossils\" from The Carnival of the Animals",
        "excerpt": "In the twelfth movement of his 1886 zoological fantasy, Camille Saint-Saens set the xylophone clattering like dry bones rattling in a drawer, its brittle, skeletal melody evoking creatures long turned to stone. He slyly quotes his own \"Danse macabre\" and old French tunes, as if half-remembered relics of the past were surfacing into the present. It is the perfect musical image of vanished giants stirred briefly back to life.",
        "source": "Camille Saint-Saens, Le carnaval des animaux (1886), no. 12 \"Fossiles\" — IMSLP",
        "href": "https://imslp.org/wiki/Le_carnaval_des_animaux_(Saint-Sa%C3%ABns,_Camille)"
      },
      {
        "category": "artistic",
        "title": "John Martin, \"The Country of the Iguanodon\" (1837)",
        "excerpt": "John Martin's apocalyptic watercolour, made to accompany Gideon Mantell's writings, imagines the lost antediluvian world the first dinosaur bones revealed: monstrous reptiles battling beneath a stormy, primeval sky. It was among the earliest attempts to picture deep time, to clothe scattered fossil fragments in living flesh. The painting captures exactly the vertigo of the deep past surfacing into the human imagination.",
        "source": "John Martin, \"The Country of the Iguanodon\" (1837), Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:John_Martin_-_The_country_of_the_Iguanodon_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/antarctica-first-dinosaur-bone--art.png",
          "alt": "John Martin's 1837 watercolour depicting prehistoric Iguanodon and other giant reptiles in a dramatic primeval landscape",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 24
  },
  {
    "slug": "bet-awards-2026-lauryn-hill",
    "headline": "Lauryn Hill honored and Janet Jackson stuns at the 2026 BET Awards as Teyana Taylor is moved to tears",
    "overview": "The 2026 BET Awards honored Lauryn Hill and featured a show-stopping appearance by Janet Jackson that left fellow artist Teyana Taylor in tears. The night, a celebration of Black music and culture, also saw the comedian Druski make history.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMigwFBVV95cUxORVlCbHBDWHNKZURjS2RwYkw5S1NNUzB0V19DaUktaDB3LWxMZ0cxWTloSEpLQTBnWUd0aWxkcGJTVi1OX25tckQzeER4WjJBOUlsTHF0R29FRk5seGhFcVJDMmRWbXY4VUJhYTlCN1hQblJBVFg1dDdKaXM4M3Rqd3pUcw?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cpd3y6lv819o"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-29",
    "image": {
      "src": "/covers/bet-awards-2026-lauryn-hill.png",
      "alt": "Singer Teyana Taylor reacting emotionally at the BET Awards",
      "credit": "BBC"
    },
    "edition": "Evening Edition · 29 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Pythian Games at Delphi: the singing contest crowned with laurel",
        "excerpt": "The oldest contest and the one for which they first offered prizes was, according to tradition, the singing of a hymn to the god. The man who sang and won the prize was Chrysothemis of Crete, whose father Carmanor is said to have cleansed Apollo. After Chrysothemis, says tradition, Philammon won with a song, and after him his son Thamyris.",
        "source": "Pausanias, Description of Greece 10.7.2, trans. W. H. S. Jones (Perseus Digital Library, Tufts University)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0160:book=10:chapter=7"
      },
      {
        "category": "historical",
        "title": "The crowning of Petrarch as poet laureate on the Capitol (1341)",
        "excerpt": "There, in the month of April, Petrarch assumed the poet's crown upon the Capitol from the hand of the Roman senator amid the plaudits of the people and the patricians.",
        "source": "\"Petrarch,\" Encyclopaedia Britannica, 11th ed. (1911), via Wikisource",
        "href": "https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Petrarch"
      },
      {
        "category": "literary",
        "title": "Demodocus the bard and the weeping of Odysseus (Homer, Odyssey VIII)",
        "excerpt": "When the bard left off singing he wiped the tears from his eyes, uncovered his face, and, taking his cup, made a drink-offering to the gods; but when the Phaeacians pressed Demodocus to sing further, for they delighted in his lays, then Ulysses again drew his mantle over his head and wept bitterly. No one noticed his distress except Alcinous, who was sitting near him.",
        "source": "Homer, The Odyssey, Book VIII, trans. Samuel Butler (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/1727/pg1727.txt"
      },
      {
        "category": "literary",
        "title": "Pindar's Olympian Ode 1: the victory crowned in song",
        "excerpt": "Water is best, and gold, like a blazing fire in the night, stands out supreme of all lordly wealth.",
        "source": "Pindar, Olympian Ode 1 (for Hieron of Syracuse, 476 BC), trans. Diane Arnson Svarlien (Perseus Digital Library, Tufts University)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0162:book%3DO."
      },
      {
        "category": "artistic",
        "title": "Handel, Zadok the Priest (Coronation Anthem No. 1, HWV 258)",
        "excerpt": "Handel composed Zadok the Priest for the coronation of George II in 1727, and it has been sung at the anointing of every British monarch since. Its hushed, swelling string introduction erupting into a blaze of choral and trumpet acclamation makes it the archetypal sound of public crowning and triumphal celebration — a fitting echo of a community rising to honor and exalt its own.",
        "source": "George Frideric Handel, Zadok the Priest, HWV 258 (IMSLP / Petrucci Music Library)",
        "href": "https://imslp.org/wiki/Zadok_the_Priest,_HWV_258_(Handel,_George_Frideric)"
      },
      {
        "category": "artistic",
        "title": "Raphael, The Parnassus (1509-1511)",
        "excerpt": "In this fresco in the Vatican's Stanza della Segnatura, Raphael gathers Apollo playing his lyre on Mount Parnassus, encircled by the nine Muses and the great poets of antiquity and his own age. It is a painted festival of song — a vision of artists assembled, honored, and bound into a single lineage of acclaim. The laurel-laden grove crowns poetry itself as the shared inheritance of a creative community.",
        "source": "Raphael (Raffaello Sanzio), The Parnassus, fresco, Stanza della Segnatura, Vatican (Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Raphael_-_The_Parnassus.jpg",
        "image": {
          "src": "/covers/bet-awards-2026-lauryn-hill--art.png",
          "alt": "Raphael's fresco The Parnassus, showing Apollo playing the lyre among the nine Muses and assembled poets on Mount Parnassus",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 25
  },
  {
    "slug": "swiss-institute-bowery-home",
    "headline": "New York's Swiss Institute buys its first permanent home, on the Bowery, after nearly 40 years",
    "overview": "The Swiss Institute, a contemporary-art nonprofit that has moved repeatedly during its almost four decades in New York, has bought a permanent home at 250 Bowery on the Lower East Side. The building, which once housed the International Center of Photography, will expand the institute's space by more than half when it opens in spring 2027.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Artforum",
        "href": "https://www.artforum.com/news/swiss-institute-announces-new-permanent-home-on-bowery-1234753568/"
      },
      {
        "name": "The Art Newspaper",
        "href": "https://www.theartnewspaper.com/2026/06/29/new-york-swiss-institute-buys-permanent-home-on-the-bowery"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-29",
    "image": {
      "src": "/covers/swiss-institute-bowery-home.png",
      "alt": "The Swiss Institute's new building at 250 Bowery in New York",
      "credit": "Artforum"
    },
    "edition": "Evening Edition · 29 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "From the portable Tabernacle to Solomon's permanent Temple",
        "excerpt": "For nearly forty years of wilderness wandering, Israel worshipped in the Tabernacle, a portable tent-sanctuary that could be struck and carried from camp to camp. Only once the people had finally settled the land did that itinerant shrine give way to a fixed house: Solomon's Temple in Jerusalem, after which the wandering sanctuary no longer served a purpose. The movable tent became, at last, a building meant to stand.",
        "source": "\"Tabernacle,\" Encyclopaedia Britannica",
        "href": "https://www.britannica.com/topic/Tabernacle"
      },
      {
        "category": "historical",
        "title": "The Whitney Museum settles into a permanent home",
        "excerpt": "The Whitney Museum of American Art opened in Greenwich Village in 1931 and then relocated repeatedly, moving uptown to Marcel Breuer's Madison Avenue building in 1966. After decades of shifting quarters, it finally put down roots downtown in 2015, opening Renzo Piano's purpose-built home in the meatpacking district, ending a long institutional itinerancy with a lasting house of its own.",
        "source": "\"Whitney Museum of American Art,\" Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Whitney_Museum_of_American_Art"
      },
      {
        "category": "literary",
        "title": "Aeneas destined to build a lasting home in Italy",
        "excerpt": "Thy son (nor is th' appointed season far)\nIn Italy shall wage successful war,\nShall tame fierce nations in the bloody field,\nAnd sov'reign laws impose, and cities build.",
        "source": "Virgil, Aeneid, Book I, trans. John Dryden (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/228/228-h/228-h.htm"
      },
      {
        "category": "literary",
        "title": "Solomon builds the house of the LORD",
        "excerpt": "And it came to pass in the four hundred and eightieth year after the children of Israel were come out of the land of Egypt, in the fourth year of Solomon's reign over Israel, in the month Zif, which is the second month, that he began to build the house of the LORD.",
        "source": "1 Kings 6:1, King James Version (Wikisource)",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/1_Kings"
      },
      {
        "category": "artistic",
        "title": "Handel, Solomon, HWV 67",
        "excerpt": "Handel's 1748 oratorio Solomon draws on the books of Kings and Chronicles to celebrate the wise king at the height of his reign, with its second part centering on the consecration of the newly built Temple. The music turns the founding of a permanent house of worship into grand choral splendor, a fitting score for the moment a wandering institution finally raises lasting walls. Its famous orchestral interlude, \"The Arrival of the Queen of Sheba,\" frames the Temple as a destination worth journeying toward.",
        "source": "George Frideric Handel, Solomon, HWV 67 (IMSLP)",
        "href": "https://imslp.org/wiki/Solomon,_HWV_67_(Handel,_George_Frideric)"
      },
      {
        "category": "artistic",
        "title": "James Tissot, Solomon Dedicates the Temple at Jerusalem",
        "excerpt": "James Tissot's late watercolor depicts the climactic moment when the long-awaited permanent Temple is consecrated, the king and his people gathered before the finished house they will no longer have to carry. After generations of a portable sanctuary, the painting captures the solemn joy of putting down roots in a fixed dwelling. It renders in vivid detail the passage from itinerant worship to an enduring temple.",
        "source": "James Tissot, Solomon Dedicates the Temple at Jerusalem (c. 1896-1902), Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Tissot_Solomon_Dedicates_the_Temple_at_Jerusalem.jpg",
        "image": {
          "src": "/covers/swiss-institute-bowery-home--art.png",
          "alt": "Watercolor of King Solomon and the assembled Israelites dedicating the newly built Temple at Jerusalem",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 26
  },
  {
    "slug": "us-iran-stand-down-hormuz",
    "headline": "US and Iran agree to stand down after exchange of strikes near the Strait of Hormuz",
    "overview": "Washington and Tehran have agreed to \"stand down\" after several days of tit-for-tat strikes around the Strait of Hormuz that had threatened their fragile ceasefire, a US official said. Vessels will again pass through the waterway freely and talks aimed at ending the war are due to resume in Doha, easing fears of a wider Gulf conflict and helping oil prices cool.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c872rjw17qpo"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMigAFBVV95cUxPYUFwVXVYYUk3ZXZGYUhac1BmQjhYN1JiSHM5SlhvWW9taHVTRkFZeVlrNFVfTl8wQVY0VTc3ekNEd1EyX2NMYjdNZXFwWi1WMFJWTHVIaE8yNTNNVWR4NkFHelBmSFlwYWdjRTZQREo4elhtYnNhZ3RMMjg2ckttSw?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-29",
    "image": {
      "src": "/covers/us-iran-stand-down-hormuz.png",
      "alt": "Warships and a tanker in the haze of the Strait of Hormuz at dusk",
      "credit": "BBC"
    },
    "edition": "Afternoon Edition · 29 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Proclamation 3504: Interdiction of the Delivery of Offensive Weapons to Cuba",
        "excerpt": "In carrying out this order, force shall not be used except in case of failure or refusal to comply with directions, or with regulations or directives of the Secretary of Defense issued hereunder, after reasonable efforts have been made to communicate them to the vessel or craft, or in case of self-defense. In any case, force shall be used only to the extent necessary.",
        "source": "Proclamation 3504, John F. Kennedy, October 23, 1962 (American Presidency Project)",
        "href": "https://www.presidency.ucsb.edu/documents/proclamation-3504-interdiction-the-delivery-offensive-weapons-cuba"
      },
      {
        "category": "historical",
        "title": "Treaty of Ghent (1814)",
        "excerpt": "There shall be a firm and universal Peace between His Britannic Majesty and the United States, and between their respective Countries, Territories, Cities, Towns, and People of every degree without exception of places or persons. All hostilities both by sea and land shall cease as soon as this Treaty shall have been ratified by both parties.",
        "source": "Treaty of Ghent, December 24, 1814 (The Avalon Project, Yale Law School)",
        "href": "https://avalon.law.yale.edu/19th_century/ghent.asp"
      },
      {
        "category": "literary",
        "title": "The Melian Dialogue, History of the Peloponnesian War, Book V",
        "excerpt": "For ourselves, we shall not trouble you with specious pretences... and make a long speech which would not be believed; and in return we hope that you... will aim at what is feasible, holding in view the real sentiments of us both; since you know as well as we do that right, as the world goes, is only in question between equals in power, while the strong do what they can and the weak suffer what they must.",
        "source": "Thucydides, History of the Peloponnesian War (Crawley translation)",
        "href": "https://www.gutenberg.org/cache/epub/7142/pg7142.txt"
      },
      {
        "category": "literary",
        "title": "The Persians",
        "excerpt": "And straight to all his captains gave this charge—\nAs soon as sunlight warms the ground no more,\nAnd gloom enwraps the sanctuary of sky,\nRange we our fleet in triple serried lines\nTo bar the passage from the seething strait,\nThis way and that: let other ships surround\nThe isle of Ajax... So spake the king,\nInspired at heart with over-confidence,\nUnwitting of the gods' predestined will.",
        "source": "Aeschylus, The Persians, in Four Plays of Aeschylus (E. D. A. Morshead translation)",
        "href": "https://www.gutenberg.org/files/8714/8714-h/8714-h.htm"
      },
      {
        "category": "artistic",
        "title": "1812 Overture, Op. 49",
        "excerpt": "Tchaikovsky's festival overture stages the very arc of brinkmanship and reprieve: a solemn hymn for the threatened nation gives way to clashing martial themes that collide like fleets in a narrow sea, cannon fire punching through the orchestra. Then the storm breaks, the antagonist's anthem is overwhelmed, and bells peal a hard-won deliverance—great powers pulling back from ruin into triumph.",
        "source": "Pyotr Ilyich Tchaikovsky, 1812 Overture, Op. 49 (1880), IMSLP",
        "href": "https://imslp.org/wiki/1812_Overture,_Op.49_(Tchaikovsky,_Pyotr)"
      },
      {
        "category": "artistic",
        "title": "Die Seeschlacht bei Salamis (The Battle of Salamis)",
        "excerpt": "Kaulbach crowds the canvas with locked galleys and tumbling oarsmen in a strangling channel, where a great navy's overreach turns to chaos amid spray, sail, and fallen bodies. Above the carnage Greek figures surge with defiant resolve, a vision of an empire checked at a narrow strait—the perennial peril, and the deliverance, of contesting freedom of the seas.",
        "source": "Wilhelm von Kaulbach, Die Seeschlacht bei Salamis (1868), Maximilianeum, Munich (Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Kaulbach,_Wilhelm_von_-_Die_Seeschlacht_bei_Salamis_-_1868.JPG",
        "image": {
          "src": "/covers/us-iran-stand-down-hormuz--art.png",
          "alt": "Painting of the naval Battle of Salamis",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 27
  },
  {
    "slug": "europe-heatwave-record-deaths",
    "headline": "Europe's heatwave linked to more than 1,300 deaths as Germany hits a record 41.7C",
    "overview": "The World Health Organization says Europe's unprecedented early-summer heatwave has been linked to more than 1,300 excess deaths since 21 June, calling heat a \"silent killer.\" Germany reached a record 41.7C and France reported around 1,000 more deaths than expected since Wednesday as the extreme heat pushed eastward across the continent.",
    "genre": "Climate",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cn4d2vv935lo"
      },
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMiswFBVV95cUxPNWp3QVd0ZG5MR05VMklHaHZYRVFsSmtibXdaV2pORDBIVXhfSFNwaGt4QUl4blQzeUNzMjV0S2NxbUtVbHh1a290NTB5ZGxXNnBiNjhab0g0dzRjTjVUM3N6Z091cTJZWHdwcEFxMDZZc0doSlZsVHQxS3d4T2VTZ1dzVmJYb19aYnpnUXpVajhLeWE4NW4xYW9kaTJDTGZqRVNEeTBxM0N6Znh1alhqeVVYdw?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-29",
    "image": {
      "src": "/covers/europe-heatwave-record-deaths.png",
      "alt": "A sun-scorched European city baking under a hazy white sky during a heatwave",
      "credit": "BBC"
    },
    "edition": "Afternoon Edition · 29 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The 2003 European Heatwave",
        "excerpt": "In August 2003 a stagnant dome of heat settled over the continent and became the deadliest such event in modern European memory, killing an estimated 70,000 people, with roughly 15,000 deaths in France alone. The victims were overwhelmingly the elderly and the isolated, who perished quietly in apartments that never cooled, even at night. It was the hottest summer Europe had seen in centuries, and it taught the continent that heat is a silent killer that strikes hardest at the frail.",
        "source": "Encyclopaedia Britannica",
        "href": "https://www.britannica.com/event/European-heat-wave-of-2003"
      },
      {
        "category": "historical",
        "title": "The 1936 North American Heat Wave (Dust Bowl)",
        "excerpt": "During the depths of the Dust Bowl in July 1936, a merciless heat wave baked the United States and Canada, killing about 5,000 people as thermometers climbed past 120 degrees Fahrenheit on the drought-stricken plains. Stripped of vegetation by failed farming, the land had no power to moderate the scorching air, and the dead piled up in sweltering cities and parched farmsteads alike. Many of the state temperature records it set stood unbroken for more than seventy years.",
        "source": "National Weather Service (NOAA)",
        "href": "https://www.weather.gov/ilx/july1936heat"
      },
      {
        "category": "literary",
        "title": "The Rime of the Ancient Mariner",
        "excerpt": "All in a hot and copper sky,\nThe bloody Sun, at noon,\nRight up above the mast did stand,\nNo bigger than the Moon.\n\nDay after day, day after day,\nWe stuck, nor breath nor motion;\nAs idle as a painted ship\nUpon a painted ocean.\n\nWater, water, every where,\nAnd all the boards did shrink;\nWater, water, every where,\nNor any drop to drink.",
        "source": "Samuel Taylor Coleridge (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/151/151-h/151-h.htm"
      },
      {
        "category": "literary",
        "title": "The Book of Jonah 4:7-8 (King James Bible)",
        "excerpt": "7 But God prepared a worm when the morning rose the next day, and it smote the gourd that it withered. 8 And it came to pass, when the sun did arise, that God prepared a vehement east wind; and the sun beat upon the head of Jonah, that he fainted, and wished in himself to die, and said, It is better for me to die than to live.",
        "source": "King James Bible, Jonah (Wikisource)",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Jonah"
      },
      {
        "category": "artistic",
        "title": "L'estate (Summer), from The Four Seasons",
        "excerpt": "Vivaldi's Summer concerto in G minor (Op. 8, No. 2, RV 315) is music wilted by heat: languid violins droop under an oppressive sun, men and flocks faint in the sweltering stillness, and even the cuckoo and turtledove sing wearily. The composer's own accompanying sonnet describes a season under the merciless sun before the heat erupts into a violent summer storm. It is one of the earliest vivid musical portraits of human frailty before the elements.",
        "source": "Antonio Vivaldi (IMSLP)",
        "href": "https://imslp.org/wiki/The_Four_Seasons_(Vivaldi,_Antonio)"
      },
      {
        "category": "artistic",
        "title": "El Khasné, Petra",
        "excerpt": "Frederic Edwin Church's 1874 painting bathes the rose-red rock temple of Petra in the burning, golden light of a desert sun, the sandstone cliffs glowing as if heated to the touch. Tiny human figures are dwarfed by the vast, sun-scorched canyon, emphasizing human smallness before an arid and merciless landscape. The image captures the beauty and the menace of a world ruled by relentless heat.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:El_Khasne,_Petra_Frederic_Edwin_Church.jpg",
        "image": {
          "src": "/covers/europe-heatwave-record-deaths--art.png",
          "alt": "Sun-drenched rock temple of Petra by Frederic Edwin Church",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 28
  },
  {
    "slug": "venezuela-earthquake-survivors-rescued",
    "headline": "Rescuers pull survivors from the rubble four days after twin Venezuela earthquakes kill about 1,450",
    "overview": "Four days after twin earthquakes devastated Venezuela and killed at least 1,450 people, rescue teams are still pulling survivors from collapsed buildings, including a mother and her 18-day-old baby. Footage of the infant's rescue has been shared worldwide as a rare symbol of hope amid the search for the missing.",
    "genre": "Science",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/clyw3rkj2p7o"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMixwFBVV95cUxOVEpJTmpsemVuX3FnVE9RZU9iT3VGUkdPTmt5VjlwV0dwMzBsTWlQeTNBR3pZRVdwUXN0Tks0YlM2XzltXzN4QzFRdTZ4cUMyV2w4V0hmbkpyeFNQaUtkRUZILWZQQ0ZvNmhUX1RvWjNMY2VNVUxhU2JfbF9va1pJVEF1NkpYV3BPTUc4WTJfSGtxcjF5MnhGaWpiM1J5QXlyZUlGY19FSWlZamd6OFlTdGhzTHZHMzNPckRuYy1LMlFRU1ZBQWxz?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-29",
    "image": {
      "src": "/covers/venezuela-earthquake-survivors-rescued.png",
      "alt": "Rescuers searching the rubble of a collapsed building after an earthquake",
      "credit": "BBC"
    },
    "edition": "Afternoon Edition · 29 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Rev. Charles Davy's Eyewitness Account of the Lisbon Earthquake (1755)",
        "excerpt": "The house I was in shook with such violence, that the upper stories immediately fell; and though my apartment (which was the first floor) did not then share the same fate, yet everything was thrown out of its place in such a manner that it was with no small difficulty I kept my [feet] ... I expected nothing less than to be soon crushed to death, as the walls continued rocking to and fro in the frightfulest manner, opening in several places; large stones falling down on every side.",
        "source": "Rev. Charles Davy, \"The Earthquake at Lisbon, 1755,\" Fordham Modern History Sourcebook",
        "href": "https://sourcebooks.fordham.edu/mod/1755lisbonquake.asp"
      },
      {
        "category": "historical",
        "title": "The 1908 Messina Earthquake",
        "excerpt": "At dawn on 28 December 1908 a quake and tsunami flattened Messina and Reggio Calabria, killing tens of thousands as homes folded onto sleeping families. For weeks afterward rescuers clawed through the rubble with bare hands, and again and again pulled out whole families still alive, some discovered days after the shock had buried them. Naval crews and the Red Cross raced to the ruined coast, and survivors emerged blinking into a city that had become a single vast graveyard.",
        "source": "\"1908 Messina earthquake,\" Wikipedia",
        "href": "https://en.wikipedia.org/wiki/1908_Messina_earthquake"
      },
      {
        "category": "literary",
        "title": "The Book of Numbers (King James Version), the destruction of Korah",
        "excerpt": "And the earth opened her mouth, and swallowed them up, and their houses, and all the men that appertained unto Korah, and all their goods. They, and all that appertained to them, went down alive into the pit, and the earth closed upon them: and they perished from among the congregation.",
        "source": "Bible (King James), Numbers 16:32-33, Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Numbers"
      },
      {
        "category": "literary",
        "title": "Candide, Chapter V (the Lisbon earthquake), by Voltaire",
        "excerpt": "The sea swelled and foamed in the harbour, and beat to pieces the vessels riding at anchor. Whirlwinds of fire and ashes covered the streets and public places; houses fell, roofs were flung upon the pavements, and the pavements were scattered. Thirty thousand inhabitants of all ages and sexes were crushed under the ruins.",
        "source": "Voltaire, Candide, Project Gutenberg",
        "href": "https://www.gutenberg.org/files/19942/19942-h/19942-h.htm"
      },
      {
        "category": "artistic",
        "title": "Requiem in D minor, K.626, by Wolfgang Amadeus Mozart",
        "excerpt": "Mozart's unfinished Requiem voices the terror and grief that follow sudden catastrophe: in the Dies Irae the chorus erupts in jagged, trembling cries, the orchestra shuddering like ground that will not hold still. Yet the music turns from the day of wrath toward pleading and rest, mourning the dead while begging mercy for the living. It is the sound of a world cracking open, and of survivors crying out from beneath the dust.",
        "source": "Requiem in D minor, K.626 (Mozart), IMSLP",
        "href": "https://imslp.org/wiki/Requiem_in_D_minor,_K.626_(Mozart,_Wolfgang_Amadeus)"
      },
      {
        "category": "artistic",
        "title": "The Last Day of Pompeii, by Karl Bryullov (1830-1833)",
        "excerpt": "Bryullov's vast canvas freezes the instant a city dies: the sky is torn by lightning and a blood-red volcanic glare, columns and statues topple from rooftops onto the fleeing crowd below. A mother shields her children, a son carries his aged father, and a fallen woman lies beside her living infant who still reaches up amid the chaos. It is the eternal image of the earth's sudden violence and of human tenderness clinging on as everything collapses.",
        "source": "File:Karl Brullov - The Last Day of Pompeii - Google Art Project.jpg, Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Karl_Brullov_-_The_Last_Day_of_Pompeii_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/venezuela-earthquake-survivors-rescued--art.png",
          "alt": "Karl Bryullov, The Last Day of Pompeii",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 29
  },
  {
    "slug": "bat-cuts-9000-jobs",
    "headline": "British American Tobacco to cut 9,000 jobs as it shifts away from cigarettes",
    "overview": "British American Tobacco said it will cut about 9,000 jobs — roughly 5,500 directly and 3,500 moved to outside partners — as it tries to save 600 million pounds a year by 2028. The cuts, equal to nearly a fifth of its non-US workforce, come as cigarette demand declines and the company invests in vaping and nicotine pouches.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiqwFBVV95cUxNT3Vwc2JXeTRDNDdRU3hiNTJuZVpVQUpHSy12a3dYZDc3Wm56QklwUklWckcwenpoMVJOQXIxWk1TbXQ5SVNtcmhfOG1SS3g0TVBzT2RvMWFseWJvdm9RZW5pQjhIVWZoVkJsZ0NsR1haMW9scnM5bjUxeXV4MTVvRldUSzl0Ui1tM3RWM0ZKOE9ITGpaV01kTGF0V0ZlUlM2R0Z4RkdFWHFoTGs?oc=5"
      },
      {
        "name": "East Lothian Courier",
        "href": "https://www.eastlothiancourier.com/news/national/26235818.british-american-tobacco-cutting-9-000-jobs-slash-costs/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-29",
    "image": {
      "src": "/covers/bat-cuts-9000-jobs.png",
      "alt": "A dim, nearly empty cigarette factory floor with idle conveyor lines at dusk",
      "credit": "AI-generated"
    },
    "edition": "Afternoon Edition · 29 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Proclamation of Ned Ludd (1811)",
        "excerpt": "Ned Lud's Proclamation 23 Decr 1811\n\nI do hereby discharge, all manner of Persons, who has been, employ'd by me, in giveing any information, of breaking Frames, to the Town Clerk, or to the Corporation Silley Committee ~ any Person found out, in so doing or attempting to give any information, will be Punish'd with death, or any Constable found out making any enquiries, so has to hurt the Cause of Ned, or any of his army, Death (by order of King Lud)",
        "source": "The National Archives (UK), HO 42/118",
        "href": "https://www.nationalarchives.gov.uk/explore-the-collection/stories/the-proclamation-of-ned-ludd/"
      },
      {
        "category": "historical",
        "title": "Andrew Carnegie, \"The Gospel of Wealth\" (1889)",
        "excerpt": "The problem of our age is the proper administration of wealth, so that the ties of brotherhood may still bind together the rich and poor in harmonious relationship. The conditions of human life have not only been changed, but revolutionized, within the past few hundred years.",
        "source": "Andrew Carnegie, North American Review (1889), via Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Gospel_of_Wealth"
      },
      {
        "category": "literary",
        "title": "The Deserted Village",
        "excerpt": "But times are alter'd; trade's unfeeling train\nUsurp the land, and dispossess the swain;\nAlong the lawn, where scatter'd hamlets rose,\nUnwieldy wealth and cumbrous pomp repose;",
        "source": "Oliver Goldsmith, The Deserted Village (1770), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/50500/50500-h/50500-h.htm"
      },
      {
        "category": "literary",
        "title": "Ecclesiastes (King James Version)",
        "excerpt": "Vanity of vanities, saith the Preacher, vanity of vanities; all is vanity. What profit hath a man of all his labour which he taketh under the sun? One generation passeth away, and another generation cometh: but the earth abideth for ever.",
        "source": "Ecclesiastes 1:2-4, King James Version, Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/8021/pg8021.txt"
      },
      {
        "category": "artistic",
        "title": "Götterdämmerung (Twilight of the Gods), WWV 86D",
        "excerpt": "Wagner's vast cycle ends in conflagration: Brünnhilde rides her horse into Siegfried's funeral pyre, the Rhine overflows, and the hall of the gods is consumed by fire as an entire order of the world passes away. The shimmering, world-ending music makes the fall of one age and the uncertain dawn of another almost unbearably vivid, a requiem for power that thought itself eternal.",
        "source": "Richard Wagner, Götterdämmerung (1876), full score on IMSLP",
        "href": "https://imslp.org/wiki/G%C3%B6tterd%C3%A4mmerung,_WWV_86D_(Wagner,_Richard)"
      },
      {
        "category": "artistic",
        "title": "The Smokers",
        "excerpt": "Adriaen Brouwer's tavern scene shows young men crammed together exhaling great curling plumes of pipe smoke, eyes rolling and faces contorted in a coarse pleasure that the painter clearly frames as folly. Painted when tobacco was a new and controversial vice, the work treats smoke itself as the very emblem of vanity and dissipation, a fleeting vapour that vanishes as quickly as it rises.",
        "source": "Adriaen Brouwer, The Smokers (ca. 1636), The Metropolitan Museum of Art",
        "href": "https://www.metmuseum.org/art/collection/search/435807",
        "image": {
          "src": "/covers/bat-cuts-9000-jobs--art.png",
          "alt": "Adriaen Brouwer's painting The Smokers, men exhaling pipe smoke in a tavern",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 30
  },
  {
    "slug": "cxmt-tencent-memory-deal",
    "headline": "China's CXMT signs a $2.94 billion memory-chip supply deal with Tencent ahead of its IPO",
    "overview": "Chinese memory-chip maker CXMT has agreed a long-term DRAM supply deal worth more than 20 billion yuan (about $2.94 billion) with Tencent, sources say, as Chinese internet giants race to lock in domestic chips during a global shortage. The agreement, struck ahead of CXMT's stock-market debut, underscores Beijing's push for semiconductor self-sufficiency.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiugFBVV95cUxPY1lpSXBra1c5eWlrY0IyOXdLRXcyX2dKWHM2YmJRVXRHWmhmMjM3UUs1MnVmN0doWGVUeDJjeGVxQkEydHZjT19jbko5X0VJZm81bjU3c1llaG9WZExyaElQWjBET280RzE0Y0ZxR1hYRnFkQ1dDYWtQRVRiTzh4VjBMR2VvVXM0TkVETkt6cjF4N2RDZi15QWlyX0NTZFBHNks3ZVM1Z3dCQmRob2Vmd0NEYXdHMlBVWHc?oc=5"
      },
      {
        "name": "Yahoo Finance",
        "href": "https://finance.yahoo.com/technology/articles/exclusive-chinas-cxmt-wins-3-070237888.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-29",
    "image": {
      "src": "/covers/cxmt-tencent-memory-deal.png",
      "alt": "A gloved hand holding a gleaming silicon memory wafer inside a clean room",
      "credit": "AI-generated"
    },
    "edition": "Afternoon Edition · 29 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Hamilton's Report on the Subject of Manufactures (1791)",
        "excerpt": "Every nation, with a view to those great objects, ought to endeavour to possess within itself all the essentials of national supply. These comprise the means of Subsistence, habitation, clothing, and defence.",
        "source": "Alexander Hamilton, Report on the Subject of Manufactures, December 5, 1791",
        "href": "https://publicpolicy.pepperdine.edu/academics/research/faculty-research/intellectual-foundations/early-american/ahrepman.htm"
      },
      {
        "category": "historical",
        "title": "President Polk Confirms California Gold (1848)",
        "excerpt": "The accounts of the abundance of gold in that territory are of such an extraordinary character as would scarcely command belief were they not corroborated by the authentic reports of officers in the public service who have visited the mineral district and derived the facts which they detail from personal observation.",
        "source": "James K. Polk, Fourth Annual Message to Congress, December 5, 1848",
        "href": "https://millercenter.org/the-presidency/presidential-speeches/december-5-1848-fourth-annual-message-congress"
      },
      {
        "category": "literary",
        "title": "Aeschylus, Prometheus Bound",
        "excerpt": "Still, listen to the miseries that beset mankind—how they were witless before and I made them have sense and endowed them with reason. I will not speak to upbraid mankind but to set forth the friendly purpose that inspired my blessing. First of all, though they had eyes to see, they saw to no avail; they had ears, but they did not understand; but, just as shapes in dreams, throughout their length of days, without purpose they wrought all things in confusion.",
        "source": "Aeschylus, Prometheus Bound, lines 442-451 (trans. Herbert Weir Smyth)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Aesch.+PB+436"
      },
      {
        "category": "literary",
        "title": "Homer, Iliad — The Forging of Achilles' Shield",
        "excerpt": "And the bellows, twenty in all, blew upon the melting-vats, sending forth a ready blast of every force, now to further him as he laboured hard, and again in whatsoever way Hephaestus might wish and his work go on. And on the fire he put stubborn bronze and tin and precious gold and silver; and thereafter he set on the anvil-block a great anvil, and took in one hand a massive hammer, and in the other took he the tongs.",
        "source": "Homer, Iliad, Book 18, lines 470-477 (trans. A. T. Murray)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0134%3Abook%3D18%3Acard%3D468"
      },
      {
        "category": "artistic",
        "title": "Richard Wagner, Siegfried (WWV 86C) — the Forging Song",
        "excerpt": "In Act I, the young Siegfried reforges the shattered sword Nothung that no smith could mend, hammering the splinters into molten steel and singing his exultant \"Schmiedelied\" as sparks fly. Wagner turns metalworking into an anthem of self-sufficiency: a hero who refuses inherited, broken tools and forges his own weapon to win his destiny. The pounding orchestral rhythms mimic the anvil itself.",
        "source": "Richard Wagner, Siegfried, third opera of Der Ring des Nibelungen (1871)",
        "href": "https://imslp.org/wiki/Siegfried,_WWV_86C_(Wagner,_Richard)"
      },
      {
        "category": "artistic",
        "title": "Diego Velázquez, The Forge of Vulcan (1630)",
        "excerpt": "Apollo strides into Vulcan's smoky workshop bearing news, and the half-naked smiths freeze mid-labor, hammers raised over a glowing blade upon the anvil. Velázquez dignifies the grimy work of metalmaking with the gravity of myth, light glinting off sweat and beaten metal. It is a vision of skilled hands turning raw material into instruments of power.",
        "source": "Diego Velázquez, La Fragua de Vulcano, Museo del Prado, Madrid",
        "href": "https://commons.wikimedia.org/wiki/File:Vel%C3%A1zquez_-_La_Fragua_de_Vulcano_(Museo_del_Prado,_1630).jpg",
        "image": {
          "src": "/covers/cxmt-tencent-memory-deal--art.png",
          "alt": "Velázquez painting of Vulcan's forge with smiths at the anvil",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 31
  },
  {
    "slug": "south-korea-coach-resigns-world-cup",
    "headline": "South Korea coach Hong Myung-bo resigns after World Cup exit as president orders a probe",
    "overview": "Hong Myung-bo has resigned as head coach of South Korea's men's national football team after they failed to reach the World Cup knockout stage, finishing behind Mexico and South Africa. President Lee Jae Myung called for an investigation into the team's performance, and Hong said the responsibility \"rests entirely with me as head coach.\"",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMikwFBVV95cUxOdGE0Q09NR0lUTUkzR29zaVJoSE1GOVhEWWpnS1hpVVZRWXJmbE9fWWRxamRRNk94QWdhUTNPbklOMXROT1FpV19KOE1JZFk3Y2lyYVN0ejFKLVE0X0FydENLeUpOUnRIVGRBdk5VVlF1d3dTUTZPeWtzVVZVbVJnNDY1OVk0dkJ4bzlJcHloYmdDaWM?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cdx7jk0kq4vo"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-29",
    "image": {
      "src": "/covers/south-korea-coach-resigns-world-cup.png",
      "alt": "An empty floodlit football pitch at night after a match",
      "credit": "BBC"
    },
    "edition": "Afternoon Edition · 29 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Robert E. Lee's Letter Offering His Resignation to Jefferson Davis",
        "excerpt": "The general remedy for the want of success in a military commander is his removal. This is natural, and, in many instances, proper. For, no matter what may be the ability of the officer, if he loses the confidence of his troops disaster must sooner or later ensue. I have been prompted by these reflections more than once since my return from Pennsylvania to propose to Your Excellency the propriety of selecting another commander for this army. ... I therefore, in all sincerity, request Your Excellency to take measures to supply my place.",
        "source": "Robert E. Lee to Jefferson Davis, August 8, 1863 (Lee Family Digital Archive)",
        "href": "https://leefamilyarchive.org/robert-e-lee-to-jefferson-davis-1863-august-8/"
      },
      {
        "category": "historical",
        "title": "The Trial of the Athenian Generals after Arginusae",
        "excerpt": "Not long after, repentance seized the Athenians, and they passed a decree authorising the public prosecution of those who had deceived the people. ... Callixenus eventually came back when the party in Piraeus returned to the city, at the date of the amnesty, but only to die of hunger, an object of universal detestation.",
        "source": "Xenophon, Hellenica, Book I, ch. 7 (trans. Dakyns), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/1174/1174-h/1174-h.htm"
      },
      {
        "category": "literary",
        "title": "Coriolanus",
        "excerpt": "You common cry of curs! whose breath I hate\nAs reek o' the rotten fens, whose loves I prize\nAs the dead carcasses of unburied men\nThat do corrupt my air, I banish you",
        "source": "William Shakespeare, Coriolanus, Act III, Scene 3",
        "href": "https://www.gutenberg.org/ebooks/1535"
      },
      {
        "category": "literary",
        "title": "King Henry VIII (Cardinal Wolsey's Farewell)",
        "excerpt": "Farewell? A long farewell to all my Greatnesse.\nThis is the state of Man; to day he puts forth\nThe tender Leaues of hopes, to morrow Blossomes,\nAnd beares his blushing Honors thicke vpon him:\nThe third day, comes a Frost; a killing Frost,\nAnd when he thinkes, good easie man, full surely\nHis Greatnesse is a ripening, nippes his roote,\nAnd then he fals as I do.",
        "source": "William Shakespeare, King Henry VIII, Act III, Scene 2 (Cardinal Wolsey), Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/2258/pg2258.txt"
      },
      {
        "category": "artistic",
        "title": "Eroica Symphony No. 3, Op. 55 — Marcia funebre",
        "excerpt": "The second movement of Beethoven's Eroica is a vast funeral march, a slow tread of muffled strings and keening oboe mourning a fallen hero. Music that once celebrated a champion's greatness turns to public lamentation, the whole orchestra bowed under the weight of a downfall. It is the sound of glory collapsing into grief, and of a people grieving the leader they had exalted.",
        "source": "Ludwig van Beethoven, Symphony No. 3 'Eroica', Op. 55 (IMSLP)",
        "href": "https://imslp.org/wiki/Symphony_No.3,_Op.55_(Beethoven,_Ludwig_van)"
      },
      {
        "category": "artistic",
        "title": "Napoleon I at Fontainebleau, 31 March 1814",
        "excerpt": "Delaroche paints the conqueror of Europe slumped alone in a chair, his hat fallen to the floor, boots muddied, gaze fixed on nothing as the wheel of fortune turns against him. The empire is gone and abdication is at hand; the canvas captures the precise hour when a champion, once master of a continent, must sit in silence and confront his own fall.",
        "source": "Paul Delaroche, oil on canvas, 1840 (Musée de l'Armée, Paris)",
        "href": "https://commons.wikimedia.org/wiki/File:DelarocheNapoleon.jpg",
        "image": {
          "src": "/covers/south-korea-coach-resigns-world-cup--art.png",
          "alt": "Napoleon seated alone at Fontainebleau after his fall",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 32
  },
  {
    "slug": "gehry-abu-dhabi-arts-venue",
    "headline": "Frank Gehry's final design, a performing-arts centre for Abu Dhabi, is unveiled",
    "overview": "Abu Dhabi has unveiled Dar al Funoon, a sculptural performing-arts centre on Saadiyat Island designed by Frank Gehry and due to open in 2030 near his nearly finished Guggenheim Abu Dhabi. With a 2,000-seat hall and a flowing, fabric-like form, it is among the last buildings designed by the architect, who died aged 96 in December 2025.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Dezeen",
        "href": "https://www.dezeen.com/2026/06/27/this-week-frank-gehry-arts-centre/"
      },
      {
        "name": "The National",
        "href": "https://www.thenationalnews.com/arts-culture/2026/06/25/dar-al-funoon-abu-dhabi-new-arts-venue-saadiyat-island/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-29",
    "image": {
      "src": "/covers/gehry-abu-dhabi-arts-venue.png",
      "alt": "A sculptural building of flowing silver-white forms beside calm water at golden hour",
      "credit": "AI-generated"
    },
    "edition": "Afternoon Edition · 29 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Sir Christopher Wren and St Paul's Cathedral",
        "excerpt": "When the medieval St Paul's burned in the Great Fire of 1666, Christopher Wren spent more than thirty-five years raising its vast domed successor, laying its last stone as an old man and living to see the whole completed. Buried beneath the cathedral he created, he was given an epitaph that needs no statue: Lector, si monumentum requiris, circumspice — Reader, if you seek his monument, look around you. It is the archetype of the architect whose final, greatest building becomes his tomb and his legacy at once.",
        "source": "\"Christopher Wren,\" Encyclopaedia Britannica",
        "href": "https://www.britannica.com/biography/Christopher-Wren"
      },
      {
        "category": "historical",
        "title": "Shah Jahan's Taj Mahal",
        "excerpt": "When the Mughal emperor Shah Jahan lost his wife Mumtaz Mahal in 1631, he answered grief with stone, raising between 1631 and 1648 a vast white-marble mausoleum on the Yamuna that fused Persian, Islamic and Indian forms into a single luminous gesture. The patron's commission long outlived him: deposed and imprisoned by his own son, Shah Jahan gazed across the river at the monument he would never surpass. Today it endures as a timeless ode to love and to the idea that a building can carry a maker's name far beyond his lifetime.",
        "source": "Ministry of Culture, Government of India — \"Taj Mahal\"",
        "href": "https://culture.gov.in/taj-mahal"
      },
      {
        "category": "literary",
        "title": "Sonnet 55, by William Shakespeare",
        "excerpt": "Not marble, nor the gilded monuments\nOf princes, shall outlive this powerful rhyme;\nBut you shall shine more bright in these contents\nThan unswept stone, besmear'd with sluttish time.\nWhen wasteful war shall statues overturn,\nAnd broils root out the work of masonry,\nNor Mars his sword, nor war's quick fire shall burn\nThe living record of your memory.",
        "source": "William Shakespeare, Sonnet 55, Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/1041/pg1041.txt"
      },
      {
        "category": "literary",
        "title": "The Tempest, by William Shakespeare",
        "excerpt": "Our revels now are ended. These our actors,\nAs I foretold you, were all spirits, and\nAre melted into air, into thin air:\nAnd, like the baseless fabric of this vision,\nThe cloud-capp'd towers, the gorgeous palaces,\nThe solemn temples, the great globe itself,\nYea, all which it inherit, shall dissolve,\nAnd, like this insubstantial pageant faded,\nLeave not a rack behind. We are such stuff\nAs dreams are made on; and our little life\nIs rounded with a sleep.",
        "source": "William Shakespeare, The Tempest, Act IV, Scene 1 (Prospero), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/23042/23042-h/23042-h.htm"
      },
      {
        "category": "artistic",
        "title": "Requiem in D minor, K. 626, by Wolfgang Amadeus Mozart",
        "excerpt": "Mozart's last and unfinished work, a Requiem mysteriously commissioned through an anonymous intermediary, was left a torso when he died in December 1791 — the Lacrimosa breaking off after only eight bars. His pupil Sussmayr completed the score in the master's name, so that the music we revere is at once Mozart's farewell and a posthumous act of devotion. Like a great building finished after its architect is gone, it stands as a masterpiece the maker never heard whole.",
        "source": "Wolfgang Amadeus Mozart, Requiem in D minor, K.626 — IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Requiem_in_D_minor%2C_K.626_(Mozart%2C_Wolfgang_Amadeus)"
      },
      {
        "category": "artistic",
        "title": "The Architect's Dream, by Thomas Cole",
        "excerpt": "In Thomas Cole's 1840 canvas an architect reclines atop a colossal column, dreaming of the monuments of the ages — Egyptian pylons, Greek temples, a Roman aqueduct and a soaring Gothic cathedral — massed in golden light. The painting frames architecture itself as the grandest of human ambitions, a vision of building that outlasts every builder. It reads almost as a portrait of the master architect contemplating the legacy his structures will leave behind.",
        "source": "Thomas Cole, The Architect's Dream (1840), Toledo Museum of Art — Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Thomas_Cole_-_Architect%E2%80%99s_Dream_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/gehry-abu-dhabi-arts-venue--art.png",
          "alt": "Thomas Cole, The Architect's Dream (1840)",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 33
  },
  {
    "slug": "russia-ukraine-fortress-belt",
    "headline": "Russia presses its summer offensive against Ukraine's fortified 'fortress belt'",
    "overview": "Russian forces are grinding against Ukraine's fortified belt of towns around Kostiantynivka in the Donbas, with President Vladimir Putin vowing to press on regardless of Ukrainian peace proposals. Military analysts say Moscow's claimed advances are exaggerated and have come at heavy cost, even as Ukrainian drones strike deep inside Russia.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMilgFBVV95cUxQUkF2Z250bW15cU9RSWYyLUllbC1XVWxRV2xPYUtSVUtaWWg0OG1NMkJFNkM1aHI3Tkp4dWxMUTZJSDR5N2VSWmlfdl9zRHN1cEFlaGdDWjFFOEdLbjlSSmJjclFaUEtKUFFMeFpJWVN3cTBtN2NyY3dRYTdydVZXRFJMVDVtcEM0YXpkV2FzT1VEV1Y5dlE?oc=5"
      },
      {
        "name": "CNN",
        "href": "https://www.cnn.com/2026/06/24/europe/ukraine-russia-kostyantynivka-infiltrations-intl"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-29",
    "image": {
      "src": "/covers/russia-ukraine-fortress-belt.png",
      "alt": "A bleak, war-ravaged plain at dusk with a ruined town on the horizon",
      "credit": "AI-generated"
    },
    "edition": "Afternoon Edition · 29 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Battle of Verdun (1916)",
        "excerpt": "For ten months in 1916, German and French armies fed hundreds of thousands of men into the mincing-machine of Verdun's forts and shell-cratered hills. The German plan was explicitly to \"bleed France white\" by attacking ground the French could not abandon, yet the offensive bled both sides almost equally, costing some 700,000 casualties for a few kilometers of ruined earth. It became the byword for industrial attrition: a battle won by no one and survived by few.",
        "source": "Encyclopaedia Britannica, \"Battle of Verdun\"",
        "href": "https://www.britannica.com/event/Battle-of-Verdun"
      },
      {
        "category": "historical",
        "title": "The Siege of Sevastopol (1854–1855)",
        "excerpt": "For nearly eleven months Russia's fortress port on the Black Sea withstood an Anglo-French siege, its earthworks battered by hundreds of guns each day and re-dug each night by exhausted defenders. The Russians lost as many as 100,000 men holding the city, suffering thousands of casualties in single bombardments. Only when the French stormed the Malakhov redoubt in September 1855 did the garrison sink its own fleet, raze its defenses, and abandon the smoking ruin.",
        "source": "Encyclopaedia Britannica, \"Siege of Sevastopol\"",
        "href": "https://www.britannica.com/event/Siege-of-Sevastopol"
      },
      {
        "category": "literary",
        "title": "Sebastopol in December",
        "excerpt": "There you see surgeons with pale and serious countenances, their arms blood-splashed to the elbows, beside the bed of a wounded man, who, stretched on his back with open eyes, is delirious under the influence of chloroform, and utters broken phrases, some unimportant, some touching. The surgeons are busy with their repulsive but beneficent task, amputation. You see the curved and keen blade penetrate the healthy white flesh. The wounded man suddenly comes to himself with heart-rending cries, with curses. The assistant surgeon throws the arm into a corner, while another wounded man on a stretcher who sees the operation turns and groans.",
        "source": "Leo Tolstoy, Sebastopol (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/61388/61388-h/61388-h.htm"
      },
      {
        "category": "literary",
        "title": "Dulce et Decorum Est",
        "excerpt": "Bent double, like old beggars under sacks,\nKnock-kneed, coughing like hags, we cursed through sludge,\nTill on the haunting flares we turned our backs\nAnd towards our distant rest began to trudge.\nMen marched asleep. Many had lost their boots\nBut limped on, blood-shod. All went lame; all blind;\nDrunk with fatigue; deaf even to the hoots\nOf tired, outstripped Five-Nines that dropped behind.",
        "source": "Wilfred Owen, \"Dulce et Decorum Est\" (1920)",
        "href": "https://americanliterature.com/author/wilfred-owen/poem/dulce-et-decorum-est"
      },
      {
        "category": "artistic",
        "title": "Symphony No. 7 in C major, \"Leningrad\" (Op. 60)",
        "excerpt": "Over a relentless snare-drum tattoo, a banal little march repeats and swells across eleven hypnotic iterations until it becomes a deafening, mechanized juggernaut. Shostakovich wrote it in a city under siege, scoring the grinding, faceless violence of an army that advances by sheer mass. The theme does not so much triumph as crush, an unstoppable engine devouring everything in its path.",
        "source": "Dmitri Shostakovich, Symphony No. 7 (IMSLP)",
        "href": "https://imslp.org/wiki/Symphony_No.7,_Op.60_(Shostakovich,_Dmitry)"
      },
      {
        "category": "artistic",
        "title": "The Apotheosis of War",
        "excerpt": "A pyramid of bleached human skulls rises on a scorched yellow plain, picked over by carrion crows beneath an empty sky. Behind it stand the breached walls of a dead city, a ruin emptied by conquest. Vereshchagin, a Russian battle-painter, dedicated the canvas \"to all great conquerors, past, present and to come.\"",
        "source": "Vasily Vereshchagin, The Apotheosis of War (1871), Tretyakov Gallery",
        "href": "https://en.wikipedia.org/wiki/The_Apotheosis_of_War",
        "image": {
          "src": "/covers/russia-ukraine-fortress-belt--art.png",
          "alt": "Painting of a pyramid of skulls before a ruined city",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 34
  },
  {
    "slug": "china-export-controls-japan",
    "headline": "China places 20 Japanese firms on an export-control list and 20 more on a watch list",
    "overview": "China has added 20 Japanese companies, including units of Mitsubishi, to a list barring exports of Chinese dual-use goods to them, and put 20 others on a watch list requiring special licences. Beijing cited Japan's \"militarism\" as tensions over Taiwan continue to strain ties between the two countries.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiwwFBVV95cUxNZ2szTEV2dzBCd3dkeE9IVW51eDJDb1VwUHhrVUt5aExvQmVDVThqa2x3OVZzazJ5dDQwcHVUbUUxSTE2Z3plZHY1QllkbXllbEF1a3NtbFNjanM4Qy14aHNhUVFBUlQ2MDhwdk1Hc3dQZXVjMUlhUUtId0tWTTJld3djdEVldjBNb2VkaElLZEg2ck4tX0s2Ul94R2tYQm9nYjZnbGxFYVB6RWJvUS02Qnh1SlRBVE9YUFlRVHI0cWVkdm8?oc=5"
      },
      {
        "name": "Xinhua",
        "href": "https://english.news.cn/asiapacific/20260629/9a4a9dd6ec044ad4ad9a3a90e04bc8f1/c.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-29",
    "image": {
      "src": "/covers/china-export-controls-japan.png",
      "alt": "A container port at dusk with stacked containers and idle cranes across dark water",
      "credit": "AI-generated"
    },
    "edition": "Afternoon Edition · 29 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Megarian Decree (432 BC)",
        "excerpt": "There were many who came forward and made their several accusations; among them the Megarians, in a long list of grievances, called special attention to the fact of their exclusion from the ports of the Athenian empire and the market of Athens, in defiance of the treaty.",
        "source": "Thucydides, History of the Peloponnesian War, Book 1.67 (Crawley translation)",
        "href": "https://en.wikisource.org/wiki/History_of_the_Peloponnesian_War/Book_1"
      },
      {
        "category": "historical",
        "title": "The Oil Embargo on Imperial Japan (1940-1941)",
        "excerpt": "To curb what Washington branded Japanese militarism in China and Indochina, the United States, Britain, China, and the Dutch progressively choked off Japan's lifelines, restricting exports of scrap iron, aviation fuel, and finally crude oil. In July 1941 Roosevelt froze Japanese assets and placed all petroleum shipments under embargo, severing Japan from roughly four-fifths of its imported oil. Tokyo cast the strangling \"ABCD encirclement\" as an act of aggression, and within months chose war over capitulation.",
        "source": "Foreign Relations of the United States, Diplomatic Papers, 1941, The Far East, Vol. IV (U.S. State Dept., Office of the Historian)",
        "href": "https://history.state.gov/historicaldocuments/frus1941v04/d629"
      },
      {
        "category": "literary",
        "title": "Aristophanes, The Acharnians (425 BC)",
        "excerpt": "But now some young drunkards go to Megara and carry off the courtesan Simaetha; the Megarians, hurt to the quick, run off in turn with two harlots of the house of Aspasia; and so for three gay women Greece is set ablaze. Then Pericles, aflame with ire on his Olympian height, let loose the lightning, caused the thunder to roll, upset Greece and passed an edict, which ran like the song, \"That the Megarians be banished both from our land and from our markets and from the sea and from the continent.\" Meanwhile the Megarians, who were beginning to die of hunger, begged the Lacedaemonians to bring about the abolition of the decree, of which those harlots were the cause.",
        "source": "Aristophanes, The Acharnians (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/3012/3012-h/3012-h.htm"
      },
      {
        "category": "literary",
        "title": "The Siege of Samaria (2 Kings 6)",
        "excerpt": "And it came to pass after this, that Benhadad king of Syria gathered all his host, and went up, and besieged Samaria. And there was a great famine in Samaria: and, behold, they besieged it, until an ass's head was sold for fourscore pieces of silver, and the fourth part of a cab of dove's dung for five pieces of silver.",
        "source": "King James Bible, 2 Kings 6:24-25 (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/10/pg10.txt"
      },
      {
        "category": "artistic",
        "title": "Finlandia, Op. 26 (Jean Sibelius, 1899)",
        "excerpt": "Composed as Tsarist Russia stripped away Finland's autonomy and tightened its grip over its small neighbor, Sibelius's tone poem opens with snarling, oppressive brass before swelling into a hymn of defiance and hope. The imperial authorities found its nationalist charge so dangerous that they banned its performance under its own name. It endures as the sound of a lesser power refusing to be coerced by a looming empire next door.",
        "source": "Finlandia, Op.26 (Sibelius, Jean) — IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Finlandia,_Op.26_(Sibelius,_Jean)"
      },
      {
        "category": "artistic",
        "title": "The Destruction of the Temple of Jerusalem (Francesco Hayez, 1867)",
        "excerpt": "Hayez's vast canvas freezes the moment a blockaded, starved-out city is finally overrun, its defenders scattering amid collapsing columns, smoke, and flame. The painting captures the terrible endgame of a siege: when an adversary's supplies and sanctuaries are cut off, ruin follows. It transforms the politics of strangulation into an image of total catastrophe between rival powers.",
        "source": "Gallerie dell'Accademia, Venice — Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Francesco_Hayez_017.jpg",
        "image": {
          "src": "/covers/china-export-controls-japan--art.png",
          "alt": "Francesco Hayez, The Destruction of the Temple of Jerusalem",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 35
  },
  {
    "slug": "australia-doubles-social-media-penalty",
    "headline": "Australia doubles the maximum fine for platforms breaching its under-16 social-media ban",
    "overview": "Australia will double the maximum penalty for platforms that breach its under-16 social-media ban to about A$99 million and give its eSafety Commissioner power to demand proof of compliance. The government acted amid evidence that many children still access banned apps more than six months after the world-first law took effect.",
    "genre": "Politics",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c78yv5g74e9o"
      },
      {
        "name": "Prime Minister of Australia",
        "href": "https://www.pm.gov.au/media/stronger-powers-and-double-penalties-world-leading-social-media-law"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-29",
    "image": {
      "src": "/covers/australia-doubles-social-media-penalty.png",
      "alt": "A child's face lit by the glow of a smartphone screen in a darkened room",
      "credit": "BBC"
    },
    "edition": "Afternoon Edition · 29 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Eighteenth Amendment to the United States Constitution (Prohibition)",
        "excerpt": "After one year from the ratification of this article the manufacture, sale, or transportation of intoxicating liquors within, the importation thereof into, or the exportation thereof from the United States and all territory subject to the jurisdiction thereof for beverage purposes is hereby prohibited.\n\nThe Congress and the several States shall have concurrent power to enforce this article by appropriate legislation.",
        "source": "U.S. Constitution, Amendment XVIII (1919), via The Avalon Project, Yale Law School",
        "href": "https://avalon.law.yale.edu/20th_century/amend_18.asp"
      },
      {
        "category": "historical",
        "title": "The Comstock Act of 1873",
        "excerpt": "Anthony Comstock, a self-appointed moral crusader turned U.S. postal inspector, won a federal law banning \"obscene, lewd or lascivious\" matter from the mails, vowing to keep the post from being used to corrupt the morals of the young. Wielding sweeping power over what Americans could read, he ran sting operations under false names and boasted of destroying 160 tons of books and prints. Yet the forbidden material kept circulating, smuggled past a regulator forever chasing a public ingenious at evading him.",
        "source": "\"Comstock Act of 1873,\" The First Amendment Encyclopedia, Middle Tennessee State University",
        "href": "https://firstamendment.mtsu.edu/article/comstock-act-of-1873/"
      },
      {
        "category": "literary",
        "title": "Plato, The Republic, Book II (trans. Benjamin Jowett)",
        "excerpt": "Then the first thing will be to establish a censorship of the writers of fiction, and let the censors receive any tale of fiction which is good, and reject the bad; and we will desire mothers and nurses to tell their children the authorised ones only. Let them fashion the mind with such tales, even more fondly than they mould the body with their hands; but most of those which are now in use must be discarded.",
        "source": "Plato, The Republic, translated by Benjamin Jowett (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/1497/1497-h/1497-h.htm"
      },
      {
        "category": "literary",
        "title": "Robert Browning, \"The Pied Piper of Hamelin\"",
        "excerpt": "Out came the children running.\nAll the little boys and girls,\nWith rosy cheeks and flaxen curls,\nAnd sparkling eyes and teeth like pearls,\nTripping and skipping, ran merrily after\nThe wonderful music with shouting and laughter.",
        "source": "Robert Browning, The Pied Piper of Hamelin (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/18343/18343-h/18343-h.htm"
      },
      {
        "category": "artistic",
        "title": "Franz Schubert, \"Erlkönig,\" D.328 (Op. 1)",
        "excerpt": "Schubert sets Goethe's terror into galloping triplets: a father rides through the night clutching his son while a seductive Erlking whispers promises of games and gold into the boy's ear. The parent insists it is only the wind and mist, but the unseen, alluring voice keeps working on the child the rider cannot fully shield. By the time they reach home the boy is dead in his arms, the protector outpaced by a force he could neither see nor stop.",
        "source": "Erlkönig, D.328 (Schubert, Franz), IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Erlk%C3%B6nig,_D.328_(Schubert,_Franz)"
      },
      {
        "category": "artistic",
        "title": "William Hogarth, \"Gin Lane\" (1751)",
        "excerpt": "Hogarth's engraving is a moral catastrophe in print, made to rally support for laws curbing cheap gin. A drunken mother lets her baby tumble from her arms down a stairwell while ruin spreads through the street, the corrupting new vice devouring the young and the old alike. It is the eighteenth-century image of a society pleading for the state to police an intoxicant that lawmakers struggled to contain.",
        "source": "William Hogarth, Gin Lane (1751), Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:William_Hogarth_-_Gin_Lane.jpg",
        "image": {
          "src": "/covers/australia-doubles-social-media-penalty--art.png",
          "alt": "Hogarth's 1751 engraving Gin Lane depicting urban ruin from gin",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 36
  },
  {
    "slug": "willison-red-team-ai-assistant",
    "headline": "AI email assistant withstands more than 6,000 attempts to trick it into leaking secrets",
    "overview": "After more than 6,000 prompt-injection attempts from over 2,000 people — and about $500 in costs — nobody managed to trick developer Fernando Irarrázaval's AI email assistant into leaking its secret credentials. Reviewing the experiment, Simon Willison says frontier models are becoming markedly harder to jailbreak, while cautioning against complacency in production systems.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Simon Willison's Weblog",
        "href": "https://simonwillison.net/2026/Jun/26/hack-my-ai-assistant/"
      },
      {
        "name": "Fernando Irarrázaval",
        "href": "https://www.fernandoi.cl/posts/hackmyclaw/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-29",
    "image": {
      "src": "/covers/willison-red-team-ai-assistant.png",
      "alt": "A computer monitor glowing in a dark room beside a padlock and a pair of glasses",
      "credit": "AI-generated"
    },
    "edition": "Afternoon Edition · 29 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Dieneces at Thermopylae (480 BC)",
        "excerpt": "Nevertheless one man is said to have distinguished himself above all the rest, to wit, Dieneces the Spartan. A speech which he made before the Greeks engaged the Medes, remains on record. One of the Trachinians told him, \"Such was the number of the barbarians, that when they shot forth their arrows the sun would be darkened by their multitude.\" Dieneces, not at all frightened at these words, but making light of the Median numbers, answered \"Our Trachinian friend brings us excellent tidings. If the Medes darken the sun, we shall have our fight in the shade.\"",
        "source": "Herodotus, The History of Herodotus, Book VII (Rawlinson translation)",
        "href": "https://en.wikisource.org/wiki/The_History_of_Herodotus_(Rawlinson)/Book_7"
      },
      {
        "category": "historical",
        "title": "The Great Siege of Malta (1565)",
        "excerpt": "For nearly four months a few thousand Knights Hospitaller and Maltese held their harbour forts against an Ottoman host many times their number, enduring relentless bombardment, mine, and assault. Wave after wave broke against the battered walls of Birgu and Senglea, yet the defenders would not yield, and at last the great armada withdrew empty-handed. The defence became the most celebrated feat of arms of its century, a small bastion that swallowed an empire's effort and gave nothing back.",
        "source": "\"Siege of Malta,\" Encyclopaedia Britannica",
        "href": "https://www.britannica.com/event/Siege-of-Malta-1565"
      },
      {
        "category": "literary",
        "title": "The Contest of the Bow (Homer, Odyssey, Book XXI)",
        "excerpt": "He was now the first to take the bow and arrow, so he went on to the pavement to make his trial, but he could not string the bow, for his hands were weak and unused to hard work, they therefore soon grew tired... Melanthius lit the fire, and set a seat covered with sheep skins beside it. He also brought a great ball of lard from what they had in the house, and the suitors warmed the bow and again made trial of it, but they were none of them nearly strong enough to string it.",
        "source": "Homer, The Odyssey, Book XXI (Samuel Butler translation)",
        "href": "https://www.gutenberg.org/files/1727/1727-0.txt"
      },
      {
        "category": "literary",
        "title": "Sir Galahad (Alfred Tennyson)",
        "excerpt": "My good blade carves the casques of men,\n  My tough lance thrusteth sure,\nMy strength is as the strength of ten,\n  Because my heart is pure.",
        "source": "Alfred Tennyson, 'Sir Galahad', Poems (1843), Volume 2",
        "href": "https://en.wikisource.org/wiki/Poems_(Tennyson,_1843)/Volume_2/Sir_Galahad"
      },
      {
        "category": "artistic",
        "title": "Overture to Egmont, Op. 84 (Ludwig van Beethoven)",
        "excerpt": "Beethoven's overture opens in grim, oppressive F minor, the weight of a tyrant's siege pressing down upon a defiant people. Theme after theme strains against that darkness, refusing to be crushed, until the music shatters into a blazing major-key Victory Symphony. It is the sound of resistance that holds firm under pressure and breaks through unbroken.",
        "source": "Ludwig van Beethoven, Egmont, Op. 84 (IMSLP / Petrucci Music Library)",
        "href": "https://imslp.org/wiki/Egmont,_Op.84_(Beethoven,_Ludwig_van)"
      },
      {
        "category": "artistic",
        "title": "The Defence of Saragossa (David Wilkie, 1828)",
        "excerpt": "Amid the smoke and rubble of a besieged city, Agustina de Aragon stoops to fire the cannon her fallen comrades can no longer serve, while a friar and a volunteer press the defence beside her. Wilkie freezes the instant when ordinary defenders, outnumbered and overwhelmed, simply refuse to fall. The shattered wall becomes a stage for the unyielding will of those who guard what the enemy cannot take.",
        "source": "David Wilkie, The Defence of Saragossa (Royal Collection; Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:La_defensa_de_Zaragoza,_por_David_Wilkie.jpg",
        "image": {
          "src": "/covers/willison-red-team-ai-assistant--art.png",
          "alt": "Wilkie's painting The Defence of Saragossa",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 37
  },
  {
    "slug": "toyota-sales-fourth-monthly-fall",
    "headline": "Toyota's global sales fall for a fourth straight month, down 7.2% in May",
    "overview": "Toyota reported its fourth consecutive month of declining global sales in May, down 7.2% year-on-year to 834,279 vehicles, dragged by a 31.7% plunge in China and a 38.6% collapse in the Middle East amid the fallout from the Iran war. Sales rose 15.3% in India, a bright spot in one of the world's fastest-growing car markets.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMi0gFBVV95cUxObHN4ckJqYlpoVlZ0dHRKX2RybkZtMUloV3ZTWUlLcUlsUEIwMHVIYUczYndYRWRkZHJ4WE5fWnNxcG5wTzRJekR5OVJnei1WT0N4VTZVS2U3RTd4SVZWbkFjZXZONlFub2dnNXhHdVJxVmFTMUZ1NXVmdVdQRGRVMjFoOUxRS1h2bnJIUWRRdFZCbWpfaGNVX2ZjeE9pNHBSemhNV2xBLWVZdExyanlXMWw2dDNHbHc4QncycXlRQUpZdGRCTUtsZ2NDLXkwMk52MEE?oc=5"
      },
      {
        "name": "The Week",
        "href": "https://www.theweek.in/news/biz-tech/2026/06/29/toyota-global-sales-may-2026.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-29",
    "image": {
      "src": "/covers/toyota-sales-fourth-monthly-fall.png",
      "alt": "A silent automobile assembly hall at dawn with an idle production line and robotic arms",
      "credit": "AI-generated"
    },
    "edition": "Afternoon Edition · 29 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "General Observations on the Fall of the Roman Empire in the West",
        "excerpt": "The decline of Rome was the natural and inevitable effect of immoderate greatness. Prosperity ripened the principle of decay; the causes of destruction multiplied with the extent of conquest; and, as soon as time or accident had removed the artificial supports, the stupendous fabric yielded to the pressure of its own weight. The story of its ruin is simple and obvious; and, instead of inquiring why the Roman empire was destroyed, we should rather be surprised that it had subsisted so long.",
        "source": "Edward Gibbon, The History of the Decline and Fall of the Roman Empire (1781)",
        "href": "https://faculty.georgetown.edu/jod/texts/gibbon.fall.html"
      },
      {
        "category": "historical",
        "title": "The Fall of Babylon to Cyrus the Great",
        "excerpt": "When this happened, the Persians who were posted with this objective made their way into Babylon by the channel of the Euphrates, which had now sunk to a depth of about the middle of a man's thigh. Now if the Babylonians had known beforehand or learned what Cyrus was up to, they would have let the Persians enter the city and have destroyed them utterly.",
        "source": "Herodotus, The Histories, Book 1.191 (trans. A. D. Godley)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0126:book%3D1:chapter%3D191"
      },
      {
        "category": "literary",
        "title": "Inferno, Canto VII (on Fortune)",
        "excerpt": "Ordained a general ministress and guide,\nThat she might change at times the empty treasures\nFrom race to race, from one blood to another,\nBeyond resistance of all human wisdom.\nTherefore one people triumphs, and another\nLanguishes, in pursuance of her judgment,\nWhich hidden is, as in the grass a serpent.\nYour knowledge has no counterstand against her;\nShe makes provision, judges, and pursues\nHer governance, as theirs the other gods.",
        "source": "Dante Alighieri, The Divine Comedy, trans. Henry Wadsworth Longfellow (1867)",
        "href": "https://en.wikisource.org/wiki/Divine_Comedy_(Longfellow_1867)/Volume_1/Canto_7"
      },
      {
        "category": "literary",
        "title": "Ozymandias",
        "excerpt": "And on the pedestal these words appear:\n'My name is Ozymandias, king of kings:\nLook on my works, ye Mighty, and despair!'\nNothing beside remains. Round the decay\nOf that colossal wreck, boundless and bare\nThe lone and level sands stretch far away.",
        "source": "Percy Bysshe Shelley, Ozymandias (1818), in The Complete Poetical Works (ed. Hutchinson, 1914)",
        "href": "https://en.wikisource.org/wiki/The_Complete_Poetical_Works_of_Percy_Bysshe_Shelley_(ed._Hutchinson,_1914)/Ozymandias"
      },
      {
        "category": "artistic",
        "title": "Belshazzar, HWV 61",
        "excerpt": "Handel's oratorio stages the last night of a complacent empire: as the Babylonian king feasts in arrogant security, a disembodied hand scrawls his doom upon the wall while the Persian armies divert the river beneath his walls. The choruses swell from drunken triumph to terror, dramatizing how the mightiest power can be overturned in a single night by a rising rival.",
        "source": "George Frideric Handel, Belshazzar, HWV 61 (1744)",
        "href": "https://imslp.org/wiki/Belshazzar,_HWV_61_(Handel,_George_Frideric)"
      },
      {
        "category": "artistic",
        "title": "The Course of Empire: Destruction",
        "excerpt": "Thomas Cole's apocalyptic canvas shows a once-glittering metropolis at the summit of its wealth being sacked and burned, its marble splendor toppling as an enemy fleet storms the harbor under a blood-red sky. A headless colossus presides over the carnage, a stark emblem of how a civilization at the peak of prosperity carries within it the seeds of its own sudden ruin.",
        "source": "Thomas Cole, The Course of Empire: Destruction (1836), New-York Historical Society",
        "href": "https://commons.wikimedia.org/wiki/File:Cole_Thomas_The_Course_of_Empire_Destruction_1836.jpg",
        "image": {
          "src": "/covers/toyota-sales-fourth-monthly-fall--art.png",
          "alt": "Thomas Cole, The Course of Empire: Destruction (1836)",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 38
  },
  {
    "slug": "bangladesh-hasina-vows-return",
    "headline": "Ousted Bangladesh PM Sheikh Hasina vows to return home this year despite a death sentence",
    "overview": "Bangladesh's ousted prime minister Sheikh Hasina, 78, who has been in exile in India since a student-led uprising forced her out in August 2024, says she will return home this year despite being sentenced to death in absentia. \"I do not fear death,\" she said, casting the case against her as politically motivated.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMirgFBVV95cUxNMmVYNnNCOGN6OWgtanBpamVETmVmd0lodlFVN215QXE5YW9sSDkxQnFpMWZMblVMc1h2YlpxOGZZNnhvVmhLYmZUek1hR21WYUpOUTVzUEdOMXdkdWwtTFBvbDdGbS1ON3FjODVqelFGXzFEWjBJMVdCS3dGSllLRExPSUJfN0pZXzhIMkhvTDF4S3ZTY3hXcUdFMDB2MjdzOEdDYXduWVhvQzhFYlE?oc=5"
      },
      {
        "name": "Dawn",
        "href": "https://www.dawn.com/news/2011401/bangladeshs-fugitive-ex-pm-sheikh-hasina-says-will-return-to-dhaka-this-year"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-29",
    "image": {
      "src": "/covers/bangladesh-hasina-vows-return.png",
      "alt": "An empty lectern and a single chair under a lone spotlight on a dark stage",
      "credit": "AI-generated"
    },
    "edition": "Afternoon Edition · 29 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "General MacArthur's Return to the Philippines (1944)",
        "excerpt": "Driven out of the Philippines by the Japanese in 1942, General Douglas MacArthur left with a vow that became legend: \"I shall return.\" For more than two years it was an exile's pledge that many doubted he could keep, yet in October 1944 he waded ashore at Leyte to make it good, declaring that he had come back. It remains the archetype of the deposed commander who refuses to accept his removal as final and stakes everything on a homecoming.",
        "source": "\"Douglas MacArthur,\" Encyclopaedia Britannica",
        "href": "https://www.britannica.com/biography/Douglas-MacArthur"
      },
      {
        "category": "historical",
        "title": "The Restoration of Charles II and the Declaration of Breda (1660)",
        "excerpt": "After more than a decade of exile that followed his father's execution and the collapse of the royalist cause, Charles II issued the Declaration of Breda from the Netherlands, promising pardon and reconciliation, and was proclaimed lawful king. He sailed from The Hague and landed at Dover to wild acclaim, entering London on his thirtieth birthday. The deposed dynasty, written off as finished, returned in triumph, reversing the verdict of a revolution that had once seemed absolute.",
        "source": "The National Archives (UK)",
        "href": "https://www.nationalarchives.gov.uk/education/students/videos/spotlight-on/spotlight-on-charles-ii/"
      },
      {
        "category": "literary",
        "title": "The Divine Comedy, Paradiso, Canto XVII (the prophecy of exile)",
        "excerpt": "Thou shalt abandon everything beloved\nMost tenderly, and this the arrow is\nWhich first the bow of banishment shoots forth.\nThou shalt have proof how savoureth of salt\nThe bread of others, and how hard a road\nThe going down and up another's stairs.",
        "source": "Dante Alighieri, The Divine Comedy, trans. Henry Wadsworth Longfellow (1867), Wikisource",
        "href": "https://en.wikisource.org/wiki/Divine_Comedy_(Longfellow_1867)/Volume_3/Canto_17"
      },
      {
        "category": "literary",
        "title": "Homer, Odyssey, Book 9",
        "excerpt": "I am Odysseus, son of Laertes, who am known among men for all manner of wiles, and my fame reaches unto heaven. But I dwell in clear-seen Ithaca, wherein is a mountain, Neriton, covered with waving forests, conspicuous from afar; and round it lie many isles hard by one another, Dulichium, and Same, and wooded Zacynthus.",
        "source": "Homer, Odyssey 9.19, trans. A. T. Murray (Perseus Digital Library)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0136:book%3D9:card%3D1"
      },
      {
        "category": "artistic",
        "title": "Va, pensiero (Chorus of the Hebrew Slaves) from Verdi's Nabucco",
        "excerpt": "In Verdi's 1842 opera, the captive Hebrews, already condemned and torn from their homeland, lift their voices toward the lost country they refuse to forget, sending their thoughts on golden wings across the sea to the hills of home. The melody became an anthem of exiles and a defiant cry of a people who would not be erased. It transforms banishment and the shadow of death into an unbroken longing for return.",
        "source": "Giuseppe Verdi, Nabucco (IMSLP)",
        "href": "https://imslp.org/wiki/Nabucco_(Verdi,_Giuseppe)"
      },
      {
        "category": "artistic",
        "title": "Napoleon's Return from Elba",
        "excerpt": "Charles de Steuben's 1818 painting captures the moment at Laffrey when the exiled emperor, having slipped back onto French soil, walks bareheaded toward the soldiers sent to arrest him and bares his breast, daring them to fire. The royal troops, frozen between duty and devotion, lower their muskets and surge to his side. It is the image of a condemned man who refuses to fear death and turns his own execution party into an army of homecoming.",
        "source": "Charles de Steuben, Napoleon's Return from Elba (1818), Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Retour_de_Napoleon_d'_Isle_d'Elbe,_by_Charles_de_Steuben.jpg",
        "image": {
          "src": "/covers/bangladesh-hasina-vows-return--art.png",
          "alt": "Napoleon bares his chest before soldiers on his return from Elba",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 39
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
