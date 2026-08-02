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
// the newest edition leads with its hero story, followed by the two prior
// editions rendered as labeled grids.
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
    "slug": "iran-trump-cancels-strikes-deal",
    "headline": "Trump says he has cancelled US strikes on Iran, provided a deal is reached 'rapidly,' as the war that began on 28 February drags on",
    "overview": "US President Donald Trump said on Truth Social that he had called off planned strikes on Iran after being asked by Tehran and other Middle Eastern governments to 'hold off,' claiming the 'perimeters' of a deal had been agreed. The announcement followed US media reports that Washington and Israel had been preparing one of the heaviest bombing campaigns yet against Iranian energy infrastructure. Iran did not confirm requesting talks, and its acting defence minister said Tehran treated every threat as 'real and credible,' more than five months into a war that opened with US and Israeli strikes on 28 February.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMizgFBVV95cUxOQnFCZlNtaWNsWjNfQzZYSUltNnlianRRMlRsUmVqWFNEWlEwWERhVmp5dVdSazcwNmo4bTNzQjNwcW1rS1pYSFRzUXZvUkF5dEFRYzY4T3Q4UUF0ZVBFLXlxVzA5YnRXZTliVWN0M2ZlcV9WVEw4ZjZqblVxOFJ6N2JmX1FMSk5HUXdLWWpOM2l1SWI3b0E2NHB5UU5rLUFRbjRXUEZ6ajZ1VUt1N0JIdURWT1VNbkVHX2UxUVU1b1lFTzY4aFNaOEJ5TTJJdw?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cjwx74qgld2o"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-02",
    "image": {
      "src": "/covers/iran-trump-cancels-strikes-deal.png",
      "alt": "Delegations of the United States, Iran and other world powers seated around a large table during the Iran nuclear negotiations in Vienna, 14 July 2015.",
      "credit": "Bundesministerium fuer Europa, Integration und Aeusseres (Austrian Foreign Ministry), 'Iran Talks 14 July 2015,' Wikimedia Commons (CC BY 2.0)."
    },
    "lead": true,
    "edition": "Morning Edition · 2 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Melian Dialogue: bargaining at the edge of the sword",
        "excerpt": "Since you know as well as we do that right, as the world goes, is only in question between equals in power, while the strong do what they can and the weak suffer what they must.",
        "source": "Thucydides, History of the Peloponnesian War, Book V (the Melian Dialogue), c. 411 BC, translated by Richard Crawley; Wikisource.",
        "href": "https://en.wikisource.org/wiki/History_of_the_Peloponnesian_War/Book_5"
      },
      {
        "category": "historical",
        "title": "Chamberlain returns from Munich: a catastrophe 'averted'",
        "excerpt": "It has been possible to agree on a way of carrying out a difficult and delicate operation by discussion instead of by force of arms, and thereby they have averted a catastrophe which would have ended civilisation as we have known it. The relief that our escape from this great peril of war has, I think, everywhere been mingled in this country with a profound feeling of sympathy.",
        "source": "Neville Chamberlain, Prime Minister's Statement on the Munich Agreement, House of Commons debate, 3 October 1938; Hansard (HC Deb), UK Parliament.",
        "href": "https://api.parliament.uk/historic-hansard/commons/1938/oct/03/prime-ministers-statement"
      },
      {
        "category": "literary",
        "title": "Nineveh spared: the threatened destruction called off",
        "excerpt": "Yet forty days, and Nineveh shall be overthrown. So the people of Nineveh believed God, and proclaimed a fast, and put on sackcloth, from the greatest of them even to the least of them. ... And God saw their works, that they turned from their evil way; and God repented of the evil, that he had said that he would do unto them; and he did it not.",
        "source": "The Holy Bible, King James Version, Book of Jonah 3:4-10, 1611; Christian Classics Ethereal Library (ccel.org).",
        "href": "https://www.ccel.org/ccel/bible/kjv.Jonah.3.html"
      },
      {
        "category": "literary",
        "title": "Henry V: the last parle before the gates of Harfleur",
        "excerpt": "How yet resolves the governor of the town?\nThis is the latest parle we will admit;\nTherefore to our best mercy give yourselves,\nOr like to men proud of destruction\nDefy us to our worst; for, as I am a soldier,\nA name that in my thoughts becomes me best,\nIf I begin the battery once again,\nI will not leave the half-achieved Harfleur\nTill in her ashes she lie buried.",
        "source": "William Shakespeare, The Life of King Henry the Fifth, Act III, Scene 3, c. 1599; Project Gutenberg.",
        "href": "https://www.gutenberg.org/cache/epub/1521/pg1521.txt"
      },
      {
        "category": "artistic",
        "title": "Vereshchagin's 'The Apotheosis of War': what the reprieve prevents",
        "excerpt": "A sun-scorched pyramid of human skulls rises on a barren plain, circled by crows, a blasted city and dead trees behind it. Vasily Vereshchagin painted it as a universal indictment of conquest and dedicated it 'to all conquerors, past, present and to come.' It stands as the image of the catastrophe that a last-minute deal or a called-off strike is meant to hold at bay.",
        "source": "Vasily Vereshchagin, The Apotheosis of War (Apofeoz voyny), 1871, oil on canvas, Tretyakov Gallery, Moscow.",
        "href": "https://commons.wikimedia.org/wiki/File:Vasily_Vereshchagin_-_%D0%90%D0%BF%D0%BE%D1%84%D0%B5%D0%BE%D0%B7_%D0%B2%D0%BE%D0%B9%D0%BD%D1%8B_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/iran-trump-cancels-strikes-deal--a4.png",
          "alt": "A tall pyramid of yellowed human skulls on a scorched, empty plain, with crows circling and wheeling around it and a ruined city and dead trees on the horizon under a hazy sky.",
          "credit": "Vasily Vereshchagin, The Apotheosis of War, 1871, Tretyakov Gallery, Moscow. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Rubens's 'The Consequences of War': Peace pulling against Mars",
        "excerpt": "Rubens shows the war-god Mars, sword drawn, being dragged forward by the Fury Alecto while a grieving figure of Europe throws up her arms in despair; Venus and cupids strain to hold him back, and beneath his feet lie a trampled mother and child and the broken instruments of art and learning. The whole canvas is a tug-of-war between restraint and unleashed violence, its outcome hanging in the balance. It mirrors a moment when planned strikes are held off and diplomacy tries, however precariously, to pull the god of war back.",
        "source": "Peter Paul Rubens, The Consequences of War (Gli orrori della guerra), 1638-1639, oil on canvas, Galleria Palatina, Palazzo Pitti, Florence.",
        "href": "https://commons.wikimedia.org/wiki/File:Peter_Paul_Rubens_%E2%80%93_Consequences_of_War_(1638).png",
        "image": {
          "src": "/covers/iran-trump-cancels-strikes-deal--a5.png",
          "alt": "A swirling Baroque allegory in which an armoured Mars with a bloody sword is pulled forward by a torch-bearing Fury while Venus and cupids try to restrain him and a black-clad figure of Europe raises her arms in grief amid trampled figures and scattered objects.",
          "credit": "Peter Paul Rubens, The Consequences of War, 1638-1639, Galleria Palatina, Palazzo Pitti, Florence. Public domain via Wikimedia Commons."
        }
      }
    ],
    "rank": 1
  },
  {
    "slug": "china-military-drills-scarborough-shoal",
    "headline": "China stages military and coast guard drills and naval and air patrols near the disputed Scarborough Shoal in the South China Sea, warning the Philippines",
    "overview": "China's military said it conducted combat readiness drills together with naval and air patrols around the contested Scarborough Shoal in the South China Sea, and Beijing warned Manila it had 'rich and powerful options' to respond in the waterway. The shoal, a rich fishing ground within the Philippines' exclusive economic zone but controlled by China since 2012, has been a repeated flashpoint. The exercises came amid renewed confrontations between Chinese and Philippine vessels.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMisAFBVV95cUxNdVltVTN1VjZFdU05eU9fdEF4aXU3WDVTSVg4blgwRzBNeWRZdll3NmN1ZHNkYy1lUm5jOHBqSHQxRWtPY1g2d29nOFZiU2J5YU44VjZnZkg1cTcyaTBzVXg2eU1oY0xHYVpNdGxPODZJa29ScnJkbUt5OFI4UTRIdWUwOTZreVBiamhzbVV1ZGpXcjRCOElNUV9qTFZGTUtKdlBkSWJURU9VQVphVl9vMQ?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiugFBVV95cUxNRXE0c1JmUmhDb3FjV211UkdlZ2c2ZHBoOW9saThSV0tFdVBYTlFELThzcmltODNtNGpCbHZFUEJtMkFSTU5BMDVydGEtSXhVQkVDNWtyeUZoY0hvblBCN2dTV2VmeUtvc2FPRWxxTVdxdjFUMTJXMzB0SDNGUjlNNzhQT2NKNElMX3RVOEpKMFBjTkJlTkRuN0dzRmhHUmpucXdxTzA5X2t1Zkg2SXU0dXlHSTQ1MEJZSkE?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-02",
    "image": {
      "src": "/covers/china-military-drills-scarborough-shoal.png",
      "alt": "China Coast Guard cutter CCG 3105 underway in the waters near Scarborough Shoal in the South China Sea, February 2024.",
      "credit": "Philippine Coast Guard, via Philippine Information Agency (public domain), Wikimedia Commons"
    },
    "edition": "Morning Edition · 2 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Melian Dialogue (416 BC)",
        "excerpt": "since you know as well as we do that right, as the world goes, is only in question between equals in power, while the strong do what they can and the weak suffer what they must.",
        "source": "Thucydides, History of the Peloponnesian War, Book V (the Melian Dialogue), trans. Richard Crawley",
        "href": "https://classics.mit.edu/Thucydides/pelopwar.5.fifth.html"
      },
      {
        "category": "historical",
        "title": "Palmerston's 'Civis Romanus sum' (Don Pacifico debate, 1850)",
        "excerpt": "as the Roman, in days of old, held himself free from indignity, when he could say Civis Romanus sum; so also a British subject, in whatever land he may be, shall feel confident that the watchful eye and the strong arm of England, will protect him against injustice and wrong.",
        "source": "Viscount Palmerston, speech in the House of Commons, 25 June 1850 (the 'Don Pacifico' debate), Hansard, transcribed on Wikisource",
        "href": "https://en.wikisource.org/wiki/Don_Pacifico_Speech"
      },
      {
        "category": "literary",
        "title": "Ahab Covets Naboth's Vineyard (1 Kings 21)",
        "excerpt": "Give me thy vineyard, that I may have it for a garden of herbs, because it is near unto my house... And Naboth said to Ahab, The Lord forbid it me, that I should give the inheritance of my fathers unto thee.",
        "source": "The Bible, 1 Kings 21:2-3, King James Version",
        "href": "https://www.ccel.org/ccel/bible/kjv.1Kings.21.html"
      },
      {
        "category": "literary",
        "title": "Byron, 'Roll on, thou deep and dark blue Ocean'",
        "excerpt": "Roll on, thou deep and dark blue Ocean--roll!\nTen thousand fleets sweep over thee in vain;\nMan marks the earth with ruin--his control\nStops with the shore;--upon the watery plain\nThe wrecks are all thy deed, nor doth remain\nA shadow of man's ravage, save his own,\nWhen for a moment, like a drop of rain,\nHe sinks into thy depths with bubbling groan,\nWithout a grave, unknelled, uncoffined, and unknown.",
        "source": "Lord Byron, Childe Harold's Pilgrimage, Canto IV, stanza 179",
        "href": "https://www.gutenberg.org/cache/epub/5131/pg5131.txt"
      },
      {
        "category": "artistic",
        "title": "J. M. W. Turner, 'The Fighting Temeraire' (1839)",
        "excerpt": "Turner paints a veteran warship of Trafalgar, ghostly and gilded, being towed by a small dark steam-tug toward the breaker's yard beneath a blazing sunset. It is an elegy for a fading order of sea power and a meditation on how command of the waves passes from one age and technology to the next.",
        "source": "Joseph Mallord William Turner, The Fighting Temeraire tugged to her last Berth to be broken up, 1838-39, oil on canvas, The National Gallery, London",
        "href": "https://commons.wikimedia.org/wiki/File:The_Fighting_Temeraire,_JMW_Turner,_National_Gallery.jpg",
        "image": {
          "src": "/covers/china-military-drills-scarborough-shoal--a4.png",
          "alt": "A luminous, pale old sailing warship towed by a small steam-tug across still water beneath a fiery sunset in J. M. W. Turner's The Fighting Temeraire.",
          "credit": "J. M. W. Turner, The Fighting Temeraire (1839), The National Gallery, London (public domain), via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Ivan Aivazovsky, 'Battle of Chios' (1848)",
        "excerpt": "Aivazovsky stages a great naval engagement at sea: rival fleets crowded under towering sails and gun-smoke, one warship ablaze, the water lit by fire and flag. The vast Romantic canvas dramatizes the raw spectacle of contested seas, where empires assert their reach through massed firepower on the open water.",
        "source": "Ivan Konstantinovich Aivazovsky, The Battle of Chios (26 June 1770), 1848, oil on canvas",
        "href": "https://commons.wikimedia.org/wiki/File:Battle_of_Chios_(1770),_by_Ivan_Aivazovsky_(1848).jpg",
        "image": {
          "src": "/covers/china-military-drills-scarborough-shoal--a5.png",
          "alt": "A dramatic Romantic seascape of two fleets of tall wooden warships locked in battle, one ship on fire and smoke filling the sky, in Aivazovsky's Battle of Chios.",
          "credit": "Ivan Aivazovsky, Battle of Chios (1848) (public domain), via Wikimedia Commons"
        }
      }
    ],
    "rank": 2
  },
  {
    "slug": "ukraine-drones-strike-wildberries-warehouse",
    "headline": "Ukrainian drone strikes kill at least two people in Russia and set fire to a Wildberries e-commerce warehouse, regional governors say",
    "overview": "Ukrainian drones struck several sites inside Russia overnight, killing at least two people when a drone hit a residential building in the Saratov region and igniting a large fire at a warehouse belonging to the e-commerce giant Wildberries, Russian regional governors said. The strikes were part of a widening Ukrainian campaign against logistics, fuel and industrial targets far behind the front line. Russia said its air defences downed dozens of drones overnight.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiuAFBVV95cUxNalRXTDFKTmlXU19IODRKYXA1bkZiSXU2MEMxUmxBRlpjakdLenAtS3EyZ1NaR1ByOXBsc182MzRkLTRUX1R2NFNJTXMyNWt4Nm5mZlBtbEw5ZWhNM2dndjJTZElZbGhWVXhjQm93bkJ1NURwSV9GWlItZjRKTDJYdV9vRjhDYWt2SVZFWGpfNXV4UXpWNnFVeGhQZkpnMEdnMFdZYThzQmxzS0YyNEVqSEFWdkJIX19a?oc=5"
      },
      {
        "name": "The Moscow Times",
        "href": "https://news.google.com/rss/articles/CBMisAFBVV95cUxOVUFOSUhMZFlqeU12cm5zZUN0VXBQUmp6QmhydjFlQmpDSmhaUklMRUFlYVliT3BrX3hfSkh5TFpSSGxjb3d5UlNITTFDcF93d0w0TjlIdnRzako2Tm5xN3BkUUFrWElWTm1aaXlTb0VvN0hhYm1rQ1pKajM0ZTA0a3ZmR2ZERDFjY25mNVVuNUZmLXhlYzJHVTQ1MEhZa1NUaDBQVlBFV0tldVRZZDE4VA?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-02",
    "image": {
      "src": "/covers/ukraine-drones-strike-wildberries-warehouse.png",
      "alt": "A large warehouse engulfed in a raging blaze, thick smoke and towering flames rising into the sky",
      "credit": "U.S. National Archives (NARA 283525), \"Warehouse engulfed in a raging blaze, St. Louis\", public domain, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 2 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The burning of Jerusalem's storehouses (70 AD)",
        "excerpt": "till he set on fire those houses that were full of corn, and of all other provisions. The same thing was done by Simon, when, upon the other's retreat, he attacked the city also; as if they had, on purpose, done it to serve the Romans, by destroying what the city had laid up against the siege, and by thus cutting off the nerves of their own power.",
        "source": "Flavius Josephus, The Wars of the Jews, Book V, ch. 1 (trans. William Whiston)",
        "href": "https://www.gutenberg.org/cache/epub/2850/pg2850.txt"
      },
      {
        "category": "historical",
        "title": "Sherman burns the depots and stores of Atlanta (1864)",
        "excerpt": "The fire also reached the block of stores near the depot, and the heart of the city was in flames all night, but the fire did not reach the parts of Atlanta where the court-house was, or the great mass of dwelling houses... Behind us lay Atlanta, smouldering and in ruins, the black smoke rising high in air, and hanging like a pall over the ruined city.",
        "source": "William Tecumseh Sherman, Memoirs of General W. T. Sherman, Vol. II, ch. XXI (1875)",
        "href": "https://www.gutenberg.org/cache/epub/4361/pg4361.txt"
      },
      {
        "category": "literary",
        "title": "The fall and burning of Troy (Virgil, Aeneid, Book II)",
        "excerpt": "The fatal day, th’ appointed hour, is come,\nWhen wrathful Jove’s irrevocable doom\nTransfers the Trojan state to Grecian hands.\nThe fire consumes the town, the foe commands;",
        "source": "Virgil, The Aeneid, Book II (trans. John Dryden)",
        "href": "https://www.gutenberg.org/files/228/228-h/228-h.htm"
      },
      {
        "category": "literary",
        "title": "The granaries laid desolate (The Book of Joel)",
        "excerpt": "The seed is rotten under their clods, the garners are laid desolate, the barns are broken down; for the corn is withered... O Lord, to thee will I cry: for the fire hath devoured the pastures of the wilderness, and the flame hath burned all the trees of the field.",
        "source": "The Bible, Joel 1:17,19 (King James Version)",
        "href": "https://ccel.org/ccel/bible/kjv.Joel.1.html"
      },
      {
        "category": "artistic",
        "title": "Turner, The Burning of the Houses of Lords and Commons (1834-35)",
        "excerpt": "J. M. W. Turner painted the night the seat of British power caught fire, working from sketches he made among the riverside crowds. A vast wall of orange flame swallows the Palace of Westminster and pours its glare across the Thames, dwarfing the tiny silhouettes of onlookers. It is one of art's greatest images of a great institution consumed in a single incandescent night.",
        "source": "Joseph Mallord William Turner, \"The Burning of the Houses of Lords and Commons, 16 October 1834\" (1835), oil on canvas, Cleveland Museum of Art",
        "href": "https://commons.wikimedia.org/wiki/File:Joseph_Mallord_William_Turner,_English_-_The_Burning_of_the_Houses_of_Lords_and_Commons,_October_16,_1834_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/ukraine-drones-strike-wildberries-warehouse--a4.png",
          "alt": "Turner's painting of the Palace of Westminster ablaze at night, a towering sheet of orange flame reflected across the Thames while crowds watch from the far bank",
          "credit": "J. M. W. Turner, \"The Burning of the Houses of Lords and Commons, 16 October 1834\" (1835), Cleveland Museum of Art, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "John Martin, The Destruction of Sodom and Gomorrah",
        "excerpt": "John Martin renders divine fire falling from the heavens upon two doomed cities, a favourite theme of his apocalyptic imagination. Bolts of flame rain down from a blood-red sky as the distant metropolis erupts into an inferno, its towers dissolving in light and smoke. Tiny fleeing figures in the foreground measure the scale of a destruction arriving from far above.",
        "source": "John Martin, \"The Destruction of Sodom and Gomorrah\" (1852), oil on canvas, Laing Art Gallery, Newcastle upon Tyne",
        "href": "https://commons.wikimedia.org/wiki/File:John_Martin_(1789-1854)_-_The_Destruction_of_Sodom_and_Gomorrah_-_TWCMS_,_C6975_-_Laing_Art_Gallery.jpg",
        "image": {
          "src": "/covers/ukraine-drones-strike-wildberries-warehouse--a5.png",
          "alt": "John Martin's painting of fire raining from a dark red sky onto the burning cities of Sodom and Gomorrah, with small figures fleeing in the foreground",
          "credit": "John Martin, \"The Destruction of Sodom and Gomorrah\" (1852), Laing Art Gallery, public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 3
  },
  {
    "slug": "washington-state-wildfires-spokane-evacuations",
    "headline": "Wind-driven wildfires burn more than 250,000 acres across Washington state, forcing thousands to evacuate as flames cross a river into north Spokane",
    "overview": "More than a dozen wildfires burning across Washington state have scorched over 250,000 acres and forced thousands of people to flee, with one fast-moving fire crossing the Spokane River into the north side of the city. Fire officials cited high winds, record heat and bone-dry vegetation across the Pacific Northwest. Governors declared emergencies as crews struggled to contain the blazes.",
    "genre": "Climate",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiuAFBVV95cUxQYThmc2Z4VmNwMVRiazd6X3c4T0Myd0pqbWplTkNMU3o5M0RoVnFNRzViejJ3UlZnUGk4Z29tVGwwRXk2ZS1hM1BWa252d2t3bVhPcU1LLWs1UTVxdTR0Yl91cTl3blhQV2xBMERaODkwZ29iU1RjXzBXY25qTkh6djNXTjdmSTRBNUZRYVo2d1l5cm9jWFpTRjMwOEpzRmlqeHpDNXlOSDFnSzltaFdldk5MNUtWZkVy?oc=5"
      },
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMirAFBVV95cUxQTmpxLWw0WF91MFowZkpGc2JmRXdPMHM2cHRyd0V5S1NRZHlDQXhRYzVJYnhlUEhwblVVVUNlNm1vMW9FN3V1MFR6WWsxVUZlbkRMUDZHTl9pQlYzbW41d24ySWRQeUlPSDR5M2hPWXRYTVUtZDBPSVkxX3pWYVdpejVsbjh1TWNaOVdoS0ZPcS1QcmJLWm9EMHlFSV8xNEJMRkJoZ1Q3QmFSRC1H?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-02",
    "image": {
      "src": "/covers/washington-state-wildfires-spokane-evacuations.png",
      "alt": "An air tanker drops a long trail of red fire retardant over a smoke-shrouded, forested ridge during a wildfire in Washington state.",
      "credit": "BLM Oregon & Washington, \"Tanker drop on Washington wildfire.\" Public domain, via Wikimedia Commons."
    },
    "edition": "Morning Edition · 2 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Great Fire of Rome (64 CE)",
        "excerpt": "the conflagration both broke out and instantly became so fierce and so rapid from the wind that it seized in its grasp the entire length of the circus.... Often, while they looked behind them, they were intercepted by flames on their side or in their face. Or if they reached a refuge close at hand, when this too was seized by the fire, they found that, even places, which they had imagined to be remote, were involved in the same calamity.",
        "source": "Tacitus, Annals, Book XV.38 (trans. Alfred John Church and William Jackson Brodribb), on the Great Fire of Rome, 64 CE.",
        "href": "https://classics.mit.edu/Tacitus/annals.11.xv.html"
      },
      {
        "category": "historical",
        "title": "The Great Fire of London (1666)",
        "excerpt": "poor people staying in their houses as long as till the very fire touched them, and then running into boats, or clambering from one pair of stairs by the water-side to another. And among other things, the poor pigeons, I perceive, were loth to leave their houses, but hovered about the windows and balconys till they were, some of them burned, their wings, and fell down.... and the wind mighty high and driving it into the City; and every thing, after so long a drought, proving combustible.",
        "source": "Samuel Pepys, The Diary of Samuel Pepys, entry for 2 September 1666, the Great Fire of London.",
        "href": "https://www.gutenberg.org/cache/epub/4200/pg4200.txt"
      },
      {
        "category": "literary",
        "title": "Virgil, the burning of Troy (Aeneid, Book II)",
        "excerpt": "Thus, when a flood of fire by wind is borne,\nCrackling it rolls, and mows the standing corn;\nOr deluges, descending on the plains,\nSweep o'er the yellow ear, destroy the pains\nOf lab'ring oxen and the peasant's gains;\nUnroot the forest oaks, and bear away\nFlocks, folds, and trees, and undistinguish'd prey",
        "source": "Virgil, The Aeneid, Book II (trans. John Dryden), the fall and burning of Troy.",
        "href": "https://www.gutenberg.org/cache/epub/228/pg228.txt"
      },
      {
        "category": "literary",
        "title": "The destruction of Sodom and Gomorrah (Genesis 19)",
        "excerpt": "Escape for thy life; look not behind thee, neither stay thou in all the plain; escape to the mountain, lest thou be consumed.... Then the Lord rained upon Sodom and upon Gomorrah brimstone and fire from the Lord out of heaven; And he overthrew those cities, and all the plain.... and, lo, the smoke of the country went up as the smoke of a furnace.",
        "source": "The Holy Bible, King James Version, Genesis 19:17-28 (the destruction of Sodom and Gomorrah).",
        "href": "https://www.ccel.org/ccel/bible/kjv.Gen.19.html"
      },
      {
        "category": "artistic",
        "title": "J. M. W. Turner, The Burning of the Houses of Lords and Commons (c. 1835)",
        "excerpt": "Turner witnessed the 1834 fire that consumed the Palace of Westminster and turned the catastrophe into a vision of pure elemental force. A towering wall of white-gold flame and smoke erupts against the night, its glare doubled in the black water of the Thames, while a dense crowd of tiny onlookers massed on Westminster Bridge is dwarfed to insignificance before it. The painting captures the terror and awe of a city consumed by fire faster than any human hand could stop it.",
        "source": "J. M. W. Turner, The Burning of the Houses of Lords and Commons, 16 October 1834 (c. 1834-35), oil on canvas, Philadelphia Museum of Art.",
        "href": "https://commons.wikimedia.org/wiki/File:Turner-The_Burning_of_the_Houses_of_Lords_and_Commons.jpg",
        "image": {
          "src": "/covers/washington-state-wildfires-spokane-evacuations--a4.png",
          "alt": "A vast blaze of white and orange flame and smoke rises into the night sky over the River Thames as the Houses of Parliament burn, the fire reflected in the water before a crowd on the bridge.",
          "credit": "J. M. W. Turner, The Burning of the Houses of Lords and Commons (c. 1835). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "John Martin, The Great Day of His Wrath (1851-53)",
        "excerpt": "In this apocalyptic canvas the whole world seems to catch fire at once: mountains are torn loose and hurled through a sky of molten red, and a doomed multitude tumbles into a fiery abyss below. Martin painted humanity as helpless specks before an overwhelming, all-consuming inferno. It renders in paint the primal dread of an elemental force that no city or crowd can withstand.",
        "source": "John Martin, The Great Day of His Wrath (1851-1853), oil on canvas, Tate, London.",
        "href": "https://commons.wikimedia.org/wiki/File:John_Martin_-_The_Great_Day_of_His_Wrath_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/washington-state-wildfires-spokane-evacuations--a5.png",
          "alt": "A cataclysmic scene of collapsing red-lit mountains and burning skies, with masses of tiny human figures falling into a blazing chasm.",
          "credit": "John Martin, The Great Day of His Wrath (1851-53), Tate. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 4
  },
  {
    "slug": "china-gansu-landslides-floods-deaths",
    "headline": "Flash floods and landslides in China's Gansu province kill at least 25 people and injure more than 20 as torrential rains continue",
    "overview": "At least 25 people were killed and more than 20 injured by flash floods and landslides in northwest China's Gansu province after days of torrential rain, state media said, with rescuers searching for people still missing. Large parts of China were placed on flood alert as the summer's heavy rains overwhelmed rivers and hillsides. It is one of the deadliest rain-triggered disasters of the season.",
    "genre": "Climate",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMixAFBVV95cUxOU211TUJlRDhVUV9BaEFiVG9wY18xdnJ0U1NBZDgtRFZsVTVDN0puSnkyRnk0Mi11Q0RrcV9NalNyY2RxUDNNNjkwM3FnNlVNTkZMcVBVeGF3RHBHNXFqclEtME9JSWxpRHJjRXNMRUgtVlpfYl9lUzlfZ1RsRm1SRXdjMGJsSy1lYzVEWjBFbVNhRHVjenMzWkRfYUUwV3BvRmdSdXBsVnVnaGhxSFV1YXRULWplREx5YVVJcEFFQVZBUEd6?oc=5"
      },
      {
        "name": "South China Morning Post",
        "href": "https://news.google.com/rss/articles/CBMiwwFBVV95cUxPVjh5X1VBZV9uWk0tRGZVeXZ0RGxWclMtSERDRXJvTUM4NlhrVXFEZC1KVm5Hd0xySXdZYTdqRnowSFo0M3ZOZndUaDhFUkItUjJKWlR4SjQxRVNKTDE5LS1mYmxrS2lKWDJ2c0RINjJISm5VYmVETjBnTUxkM0taWG9kRW9XQVRXVzI5ODh2Ykt6OVRGRUY2bWE2X0V3SERZNFZFUUdEd1dPRFNKdXVvRHowQTFGVjhjVXVkcDFBeXVJM03SAcMBQVVfeXFMT1Y4eV9VQWVfblpNLURmVXl2dERsVnJTLUhEQ0Vyb01DODZYa1VxRGQtSlZuR3dMckl3WWE3akZ6MEhaNDN2TmZ3VGg4RVJCLVIySlpUeEo0MUVTSkwxOS0tZmJsa0tpSlgydnNESDYySEpuVWJlRE4wZ01MZDNLWlhvZEVvV0FUV1cyOTg4dmJLejlURkVGNm1hNl9Fd0hEWTRWRVFHRHdXT0RTSnV1b0R6MEExRlY4Y1V1ZHAxQXl1STNN?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-02",
    "image": {
      "src": "/covers/china-gansu-landslides-floods-deaths.png",
      "alt": "The swollen Gan River overflowing its banks and inundating riverside land during flooding in Jiangxi, China, June 2010",
      "credit": "Alancrh, CC BY-SA 3.0, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 2 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Great Flood of Yao and the Taming of the Waters",
        "excerpt": "Destructive in their overflow are the waters of the inundation. In their vast extent they embrace the hills and overtop the great heights, threatening the heavens with their floods, so that the lower people groan and murmur.",
        "source": "The Shoo King (Book of Documents), \"The Canon of Yao,\" trans. James Legge, in The Chinese Classics, Vol. III (1865).",
        "href": "https://ctext.org/shang-shu/canon-of-yao"
      },
      {
        "category": "historical",
        "title": "The Tiber Overwhelms Rome (15 CE)",
        "excerpt": "That same year the Tiber, swollen by continuous rains, flooded the level portions of the city. Its subsidence was followed by a destruction of buildings and of life.",
        "source": "Tacitus, The Annals, Book I (ch. 76), trans. Alfred John Church and William Jackson Brodribb.",
        "href": "https://en.wikisource.org/wiki/The_Annals_(Tacitus)/Book_1"
      },
      {
        "category": "literary",
        "title": "The Deluge of Gilgamesh: Corpses Floating Like Reeds",
        "excerpt": "Six days and nights passed, the wind tempest and storm overwhelmed, on the seventh day in its course, was calmed the storm, and all the tempest which had destroyed like an earthquake, quieted... and the whole of mankind who turned to sin, like reeds their corpses floated.",
        "source": "George Smith, \"The Chaldean Account of the Deluge,\" Transactions of the Society of Biblical Archaeology, Vol. II (1873).",
        "href": "https://en.wikisource.org/wiki/The_Chaldean_Account_of_the_Deluge"
      },
      {
        "category": "literary",
        "title": "The Flood of Noah in Genesis",
        "excerpt": "And the flood was forty days upon the earth; and the waters increased, and bare up the ark, and it was lift up above the earth... And all the high hills, that were under the whole heaven, were covered. Fifteen cubits upward did the waters prevail; and the mountains were covered.",
        "source": "Genesis 7:17-20, King James Version.",
        "href": "https://www.ccel.org/ccel/bible/kjv.Gen.7.html"
      },
      {
        "category": "artistic",
        "title": "Hokusai, The Great Wave off Kanagawa",
        "excerpt": "Katsushika Hokusai's woodblock print sets tiny fishing boats and their crews beneath a colossal cresting wave whose foam claws down like talons. It is the definitive image of humanity dwarfed and imperiled by the sheer power of water, distant Mount Fuji reduced to a small triangle behind the towering swell.",
        "source": "Katsushika Hokusai, \"The Great Wave off Kanagawa\" (Under the Wave off Kanagawa), from Thirty-six Views of Mount Fuji, c. 1831, color woodblock print.",
        "href": "https://commons.wikimedia.org/wiki/File:Tsunami_by_hokusai_19th_century.jpg",
        "image": {
          "src": "/covers/china-gansu-landslides-floods-deaths--a4.png",
          "alt": "A towering ocean wave with clawing foam crests over three small boats, with Mount Fuji small in the distance",
          "credit": "Katsushika Hokusai, The Great Wave off Kanagawa (c. 1831). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Francis Danby, The Deluge",
        "excerpt": "Danby's vast, storm-darkened canvas imagines the biblical flood at its climax: mountainous waves engulf a drowning world while desperate figures cling to rocks and the dead are swept away in the churning dark. A single shaft of light and the distant ark are all that survive the annihilating water.",
        "source": "Francis Danby, \"The Deluge,\" c. 1840, oil on canvas, Tate, London.",
        "href": "https://commons.wikimedia.org/wiki/File:Francis_Danby_-_The_Deluge_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/china-gansu-landslides-floods-deaths--a5.png",
          "alt": "A dark, tempestuous painting of the biblical Deluge with towering waves overwhelming struggling human figures under a stormy sky",
          "credit": "Francis Danby, The Deluge (c. 1840), Tate. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 5
  },
  {
    "slug": "opec-plus-september-output-hike-pause",
    "headline": "OPEC+ is set to approve another oil output increase for September and then pause further hikes, sources tell Reuters",
    "overview": "OPEC and its allies led by Russia are expected to agree a further increase in oil production quotas for September before pausing additional hikes, sources familiar with the talks said ahead of the group's meeting. The producers have been unwinding earlier output cuts to regain market share even as the Iran war roils crude prices. Analysts said the added barrels may do little to bring prices down while the conflict persists.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiyAFBVV95cUxOOUxtS1l6d0U4NVcxelJCQ1EwSGpaQ3BjNXJHUlpQcVlfZXJjMWU5WllQR21KdDZ0dlo2NDI0cW1RVXd3U0FiTHZMRHNDNng5ZXZseU9lT19KeG1RY18xRGNTVzBjdHpzOWpYQkwxTENWWko4NmtFQm5iQzFvQWdfeGhvQVZSMHdrZjhzRFREVnN2RWQyanBEdGp0T19mazNxR0ZiRXdFRVlvX1RZNW5mVFgyYlUxeS15QlZfOHhWY1UzSzFTZk13Yw?oc=5"
      },
      {
        "name": "Yahoo Finance",
        "href": "https://news.google.com/rss/articles/CBMilgFBVV95cUxQV3Y4SXlSOEpmOWpzdXdPeXpzMTBkRlBOaWcxVGVDUDJJYWlTckhhelQ2ZW5na1BLTFg4UVRkTGJ1NzlKaXhQNFR2b1ZmRDMwQkN6Z1RSb1J4MURQTnhCajBRWkxKUTNWQ1NTM29wVEJ5dHFRM0c2TXBvdnRvdVlaUVJ0Wnc1eHV0emItQWpQN0VfbVQwM3c?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-02",
    "image": {
      "src": "/covers/opec-plus-september-output-hike-pause.png",
      "alt": "Rows of pumpjacks silhouetted against a hazy orange sunset at the Lost Hills oil field, California",
      "credit": "Pumpjacks at the Lost Hills Oil Field, California. Photo by Arne Hückelheim, CC BY-SA 3.0, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 2 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Standard Oil combination: Rockefeller defends controlling the flow",
        "excerpt": "It is equally true that combinations of capital are bound to continue and to grow... The day of individual competition in large affairs is past and gone... It is too late to argue about advantages of industrial combinations. They are a necessity.",
        "source": "John D. Rockefeller, Random Reminiscences of Men and Events (New York: Doubleday, Page & Co., 1909).",
        "href": "https://www.gutenberg.org/cache/epub/17090/pg17090.txt"
      },
      {
        "category": "historical",
        "title": "Pliny the Elder on tearing riches from the earth (1st century AD)",
        "excerpt": "We penetrate into her entrails, and seek for treasures in the abodes even of the Manes... when will be the end of thus exhausting the earth, and to what point will avarice finally penetrate!",
        "source": "Pliny the Elder, Natural History, Book XXXIII (trans. John Bostock & H. T. Riley, 1855).",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0137:book=33:chapter=1"
      },
      {
        "category": "literary",
        "title": "The golden touch of Midas",
        "excerpt": "He, destined to make a foolish use of the favour, says, ‘Cause that whatever I shall touch with my body shall be turned into yellow gold.’ ... Astonished at the novelty of his misfortune, being both rich and wretched, he wishes to escape from his wealth.",
        "source": "Ovid, Metamorphoses, Book XI (trans. Henry T. Riley, 1893).",
        "href": "https://www.gutenberg.org/cache/epub/26073/pg26073.txt"
      },
      {
        "category": "literary",
        "title": "Zola's Germinal: the pit as an insatiable god of coal",
        "excerpt": "...the evil air of a gluttonous beast crouching there to devour the earth... it was as if he were speaking of an inaccessible tabernacle containing a sated and crouching god to whom they had given all their flesh and whom they had never seen.",
        "source": "Émile Zola, Germinal (1885), trans. Havelock Ellis (1894), Part I.",
        "href": "https://www.gutenberg.org/cache/epub/56528/pg56528.txt"
      },
      {
        "category": "artistic",
        "title": "Hieronymus Bosch, Death and the Miser",
        "excerpt": "Bosch's tall panel shows a dying miser propped in bed as Death enters at the door, a demon proffering him a bag of gold while an angel points toward the crucifix in the window. At the foot of the bed the man's earlier self still rakes coins into a strongbox that grasping creatures pick at. It is a memento mori on avarice: wealth hoarded to the very last breath, clutched even when it can no longer be kept.",
        "source": "Hieronymus Bosch, Death and the Miser, c. 1485–1490, oil on panel, National Gallery of Art, Washington, D.C.",
        "href": "https://commons.wikimedia.org/wiki/File:Hieronymus_Bosch_-_Death_and_the_Miser_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/opec-plus-september-output-hike-pause--a4.png",
          "alt": "Painted panel of a dying man in bed reaching toward a bag of gold offered by a demon while an angel gestures to a crucifix",
          "credit": "Hieronymus Bosch, Death and the Miser (c. 1485–1490), National Gallery of Art; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Wagner, Das Rheingold: the theft of the river's gold",
        "excerpt": "Wagner's opera opens with three Rhinemaidens guarding a hoard of gold in the depths of the river; the spurned dwarf Alberich renounces love to seize the gold and forge from it a ring of absolute power. The whole four-opera cycle that follows turns on the curse of that hoard, as gods, giants, and dwarves scheme to command it. It is the founding modern parable of a precious substance wrested from nature and the greed and dominion it unleashes.",
        "source": "Richard Wagner, Das Rheingold, WWV 86A (first performed 1869); plate by Arthur Rackham (1910).",
        "href": "https://imslp.org/wiki/Das_Rheingold,_WWV_86A_(Wagner,_Richard)",
        "image": {
          "src": "/covers/opec-plus-september-output-hike-pause--a5.png",
          "alt": "Ink and wash illustration of a Rhinemaiden swimming through the river depths above the crouching dwarf Alberich",
          "credit": "Arthur Rackham, illustration for The Rhinegold & The Valkyrie (1910); public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 6
  },
  {
    "slug": "westjet-flight-attendants-strike",
    "headline": "WestJet flight attendants walk off the job after contract talks collapse, grounding flights across Canada",
    "overview": "Flight attendants at Canada's WestJet went on strike after negotiations for a new contract broke down, prompting the airline to cancel flights and stranding travellers during the busy summer season. The union representing about 5,000 cabin crew said members were seeking better pay and an end to unpaid work on the ground. WestJet urged passengers to check flight status and warned of widespread disruption.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiuwFBVV95cUxQblhNTDVZU3dqTmw4d252dTlOaS1pdnFEcU5ZTjdobll4RnNJYXdVVkszRExqOHRLRGFYbG5XNVE3a0h0TUp3UzZocVNic3l1dXdPMzNGaDljWWZmS2kwUF90RVlfcG02TVc0LVJTS0dqbUV2QWhLZlhEVTloNHUxUjZJLXdwb0FRUk8td1FDaHdUdC1SalhBTWlJVEJ5cDBiaGlmeWtLNHBycWJlVFU0VTlFYThLamVfMGNB?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://news.google.com/rss/articles/CBMiWkFVX3lxTFBkVmVrenFIbjdQMUw0eTliWlRYRnVNY1FjS284RTliY0R1THBZdzdndEZtX1V6cUdiNTdHczNKaHRsZDY4aUpTbFdWeTNNLWhQMEZLVjk3WG5XZw?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-02",
    "image": {
      "src": "/covers/westjet-flight-attendants-strike.png",
      "alt": "A WestJet Boeing 737 aircraft parked on the apron at Toronto Pearson International Airport",
      "credit": "\"WestJet plane at Pearson\" by Roc1233, CC BY-SA 4.0, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 2 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Secession of the Plebeians (Secessio plebis), 494 BC",
        "excerpt": "In the days when all the parts of the human body were not as now agreeing together, but each member took its own course and spoke its own speech, the other members, indignant at seeing that everything acquired by their care and labour and ministry went to the belly, whilst it, undisturbed in the middle of them, did nothing but enjoy the pleasures provided for it, entered into a conspiracy; the hands were not to bring food to the mouth, the mouth was not to accept it when offered, the teeth were not to masticate it.",
        "source": "Livy, The History of Rome (Ab Urbe Condita), Book 2, ch. 32, trans. Rev. Canon Roberts (1905). Menenius Agrippa's fable of the belly and the members, told to persuade the plebeians who had withdrawn their labour and seceded to the Sacred Mount.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0026:book=2:chapter=32"
      },
      {
        "category": "historical",
        "title": "John Ball and the Peasants' Revolt, England 1381",
        "excerpt": "Ah, ye good people, the matters goeth not well to pass in England, nor shall not do till everything be common, and that there be no villains nor gentlemen, but that we may be all united together, and that the lords be no greater masters than we be. What have we deserved, or why should we be kept thus in servage? ... They are clothed in velvet and camlet furred with grise, and we be vestured with poor cloth: they have their wines, spices and good bread, and we have the drawing out of the chaff and drink water; ... and by that that cometh of our labours they keep and maintain their estates: we be called their bondmen, and without we do readily them service, we be beaten.",
        "source": "Jean Froissart, Chronicles, trans. Lord Berners (1523-25), recording the preaching of the priest John Ball before the Peasants' Revolt of 1381; from Chronicle and Romance: Froissart, Malory, Holinshed (Harvard Classics, vol. 35).",
        "href": "https://www.gutenberg.org/cache/epub/13674/pg13674.txt"
      },
      {
        "category": "literary",
        "title": "Germinal, the coal miners' strike",
        "excerpt": "The closed horizon was bursting out; a gap of light was opening in the sombre lives of these poor people. The eternal wretchedness, beginning over and over again, the brutalizing labour, the fate of a beast who gives his wool and has his throat cut, all the misfortune disappeared, as though swept away by a great flood of sunlight; and beneath the dazzling gleam of fairyland justice descended from heaven.",
        "source": "Émile Zola, Germinal (1885), trans. Havelock Ellis. Étienne Lantier kindles the miners of Montsou toward the strike and a dreamed-of society of workers.",
        "href": "https://www.gutenberg.org/cache/epub/56528/pg56528.txt"
      },
      {
        "category": "literary",
        "title": "The Mask of Anarchy",
        "excerpt": "Rise like Lions after slumber\nIn unvanquishable number,\nShake your chains to earth like dew\nWhich in sleep had fallen on you—\nYe are many—they are few.",
        "source": "Percy Bysshe Shelley, The Mask of Anarchy (written 1819, published 1832), the closing stanza calling the working people to rise in their numbers.",
        "href": "https://en.wikisource.org/wiki/The_Mask_of_Anarchy"
      },
      {
        "category": "artistic",
        "title": "The Strike (Der Streik)",
        "excerpt": "Workers pour out of a factory gate and confront the mill owner on the steps of his house: one man, fists clenched, leans forward to argue while a woman clutches her children behind him and, at the lower right, another labourer stoops to pick up a stone. Robert Koehler's monumental canvas, first shown in 1886, was one of the earliest paintings to make an industrial strike its heroic subject and became an emblem of the American and European labour movements.",
        "source": "Robert Koehler, The Strike (Der Streik), 1886, oil on canvas. Deutsches Historisches Museum, Berlin.",
        "href": "https://commons.wikimedia.org/wiki/File:Robert_Koehler_-_Der_Streik_(1886).jpg",
        "image": {
          "src": "/covers/westjet-flight-attendants-strike--a4.png",
          "alt": "Painting of factory workers massed outside a mill, one man confronting the well-dressed owner on the steps of his house while others gather angrily around",
          "credit": "Robert Koehler, The Strike (1886), public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "The March of the Weavers (Weberzug)",
        "excerpt": "A grim procession of impoverished weavers advances from the left, heads bowed and fists tightened, the men shouldering tools like weapons and a woman pressing forward with a child. Käthe Kollwitz's 1897 etching, part of her cycle A Weavers' Revolt inspired by Gerhart Hauptmann's play, renders the collective determination of workers marching toward the master's house in stark, unheroic realism.",
        "source": "Käthe Kollwitz, The March of the Weavers (Weberzug), 1897, etching, plate 4 from the cycle A Weavers' Revolt (Ein Weberaufstand).",
        "href": "https://commons.wikimedia.org/wiki/File:The_March_of_the_Weavers_in_Berlin%27_by_K%C3%A4the_Kollwitz,_1897.jpg",
        "image": {
          "src": "/covers/westjet-flight-attendants-strike--a5.png",
          "alt": "Black-and-white etching of a crowd of poor weavers marching forward together, faces set with resolve, carrying tools",
          "credit": "Käthe Kollwitz, The March of the Weavers (1897), public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 7
  },
  {
    "slug": "us-water-utilities-cyberattack-iran",
    "headline": "FBI investigates as Michigan joins Minnesota in reporting cyberattacks on water systems, with evidence pointing to Iran across seven states",
    "overview": "Michigan became the latest state to report cyberattacks on its public water systems, joining Minnesota and prompting an FBI investigation, officials said, as the scope of intrusions widened to about seven states. US investigators are examining whether Iran was behind the hacks of operational-technology systems at water utilities, amid the ongoing conflict. Authorities said there was no confirmed contamination of drinking water but urged utilities to harden defences.",
    "genre": "Technology",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMimwFBVV95cUxPejV5NEdoc3dyRHhtTTZXUVlOQXI0a0JIMjhOOWtGZ2xvNzlPS2h6WnJ0d25LejIwNDB4TzFYZWRFNk1CaUVQVXp1ZTdpXzNieFFRVUFYUHNfa2tKRGwzRWwwbElHa0dDcmc4Xzl1Y2hfN1JjYkpoVEhsZ2dEbkQweWk0RUxueW5JcW1ybGY0RUZUUFhGRzNadXJ5WQ?oc=5"
      },
      {
        "name": "The New York Times",
        "href": "https://news.google.com/rss/articles/CBMiigFBVV95cUxNZGxpY1JycXNJbGxZOUYwbVFEYzBXbDdCd2NnU3NZOVU5UGxjOS1hRDBhWHp3Ukc4UV9rS0Jad3psZUVwWVBxRE9TLWMtOEVrMUtuYVBYNE1nQ2RLUXlRSmRKQVQySFpicV9kTWNqSjRsSXZQcTVWUWxaSmlQa0ZfTW1SUzRNdmVicmc?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-02",
    "image": {
      "src": "/covers/us-water-utilities-cyberattack-iran.png",
      "alt": "A SCADA supervisory-control room at a water treatment plant, banks of monitors displaying the flow schematics of the water system.",
      "credit": "NEWater SCADA room, photo by Wikimedia Commons user Z22, CC BY-SA 4.0"
    },
    "edition": "Morning Edition · 2 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Clisthenes poisons the water of Crisa (First Sacred War, c. 590 BC)",
        "excerpt": "Clisthenes of Sicyon cut the water-pipes leading into the town of the Crisaeans. Then when the townspeople were suffering from thirst, he turned on the water again, now poisoned with hellebore. When the inhabitants used this, they were so weakened by diarrhoea that Clisthenes overcame them.",
        "source": "Frontinus, Stratagems (Strategemata), Book III, ch. VII.6, “On Diverting Streams and Contaminating Waters,” trans. Charles E. Bennett (Loeb Classical Library, 1925).",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Frontinus/Strategemata/3*.html"
      },
      {
        "category": "historical",
        "title": "The Goths cut the fourteen aqueducts of Rome (Siege of Rome, AD 537)",
        "excerpt": "So the Goths, having taken their positions in this way, tore open all the aqueducts, so that no water at all might enter the city from them. Now the aqueducts of Rome are fourteen in number, and were made of baked brick by the men of old, being of such breadth and height that it is possible for a man on horseback to ride in them.",
        "source": "Procopius, History of the Wars, Book V (The Gothic War), xix.13, trans. H. B. Dewing (Loeb Classical Library, 1919).",
        "href": "https://www.gutenberg.org/cache/epub/20298/pg20298.txt"
      },
      {
        "category": "literary",
        "title": "The first plague of Egypt: the waters turned to blood (Exodus 7)",
        "excerpt": "And Moses and Aaron did so, as the LORD commanded; and he lifted up the rod, and smote the waters that were in the river, in the sight of Pharaoh, and in the sight of his servants; and all the waters that were in the river were turned to blood. And the fish that was in the river died; and the river stank, and the Egyptians could not drink of the water of the river; and there was blood throughout all the land of Egypt.",
        "source": "Exodus 7:20–21, King James Version (1611).",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Exodus"
      },
      {
        "category": "literary",
        "title": "The plague on Thebes and the hidden pollution within the walls (Sophocles, Oedipus)",
        "excerpt": "She wasteth in the fruitless buds of earth,\nIn parched herds and travail without birth\nOf dying women: yea, and midst of it\nA burning and a loathly god hath lit\nSudden, and sweeps our land, this Plague of power;\nTill Cadmus' house grows empty, hour by hour,\nAnd Hell's house rich with steam of tears and blood.",
        "source": "Sophocles, Oedipus, King of Thebes, the Priest’s appeal to Oedipus, trans. Gilbert Murray (George Allen & Sons, 1911).",
        "href": "https://www.gutenberg.org/cache/epub/27673/pg27673.txt"
      },
      {
        "category": "artistic",
        "title": "Nicolas Poussin, The Plague of Ashdod (1630–1631)",
        "excerpt": "Poussin stages an entire city collapsing under an invisible affliction: bodies sprawl across the plaza, a mother lies dead as her infant still reaches for her, and citizens recoil with cloths pressed to their faces against the contagion in the air. In the shadowed temple behind them the toppled idol of Dagon signals a punishment that has entered the community unseen and struck at everyone at once. The painting turns the sabotage of a population’s wellbeing into a single tableau of dread — an enemy that cannot be fought hand to hand, only suffered.",
        "source": "Nicolas Poussin, La Peste d’Asdod (The Plague of Ashdod), 1630–1631, oil on canvas, Musée du Louvre, Paris (INV 7276).",
        "href": "https://commons.wikimedia.org/wiki/File:La_Peste_d%27Asdod_-_1630-1631_-_Nicolas_Poussin_-_Louvre_-_INV_7276_;_MR_2312.jpg",
        "image": {
          "src": "/covers/us-water-utilities-cyberattack-iran--a4.png",
          "alt": "Baroque painting of a stricken city square strewn with the dead and dying; survivors cover their faces as a fallen idol lies in a temple behind them.",
          "credit": "Nicolas Poussin, The Plague of Ashdod (1630–1631), Musée du Louvre; via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "artistic",
        "title": "Hubert Robert, Aqueduct in Ruins (18th century)",
        "excerpt": "Robert paints a colossal Roman aqueduct broken open and overrun, its once life-giving arches now silent, dwarfing the small figures who wander among the rubble. The grandeur of the engineering only sharpens the pathos of its failure: the artery that carried a city’s water has been severed, and what remains is monument rather than lifeline. It is a meditation on how the vast, taken-for-granted systems that sustain civilization can be reduced to picturesque ruin.",
        "source": "Hubert Robert (French, 1733–1808), Aqueduct in Ruins, 18th century, oil on canvas (overdoor), The Metropolitan Museum of Art, New York.",
        "href": "https://commons.wikimedia.org/wiki/File:Aqueduct_in_Ruins_MET_DP230529.jpg",
        "image": {
          "src": "/covers/us-water-utilities-cyberattack-iran--a5.png",
          "alt": "Painting of a monumental ruined Roman aqueduct with broken arches, small figures moving among the overgrown stones beneath a wide sky.",
          "credit": "Hubert Robert, Aqueduct in Ruins (18th c.), The Metropolitan Museum of Art (CC0); via Wikimedia Commons."
        }
      }
    ],
    "rank": 8
  },
  {
    "slug": "new-zealand-north-island-earthquake",
    "headline": "A magnitude 5.9 earthquake strikes off the east coast of New Zealand's North Island, seismologists say",
    "overview": "A magnitude 5.9 earthquake struck off the east coast of New Zealand's North Island, the German Research Centre for Geosciences (GFZ) reported, shaking coastal communities. There were no immediate reports of serious damage or a tsunami warning. New Zealand sits on the boundary of the Pacific and Australian tectonic plates along the seismically active Ring of Fire.",
    "genre": "Science",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiygFBVV95cUxPbWdaQkJhWGNkUHZsUkZqQXAyLWJ1MGs1XzJCTlVuUFVrald2bzBLdnU4TnNHVjFIYXNmOTJJNVVrVFR2QmVDZjJJU0x2b0NiOF9iLVViQjk2VkViT0lmZ0Fpd1R4T1NiLTdWQ1JKemFTNmhaM2lxQ0FaV2NvdW1RbHJYMkZQZElYN29kcWNxd09rUzRVRHMxS05SbzVFal9TNUgzS1hka2xLcmFMbUFHNVc3eWppcUJBTElvbjRsNHpfU2VGcEJLczNn?oc=5"
      },
      {
        "name": "Anadolu Agency",
        "href": "https://news.google.com/rss/articles/CBMitwFBVV95cUxOSlpBT0tqNUpaZHB3Mm90dzZ1aWdhQmdTNG5lSjJ2LVpiLW0xR0VBcVhfb0h2UFc2QVZidFBqU0hLSklVdDhUR2NfczdHQ0NZQmkzT1pTek83QklvLUJvMEc4SElvSlo5SkVwWl9qYkFkUXByZVZoVEtXMFZBMHNlb1gxMDZjWC1rRXRTVS05aVY4VGRzMF9UVDN1NzZpQ09jQVpWbE5nWmRhMVdsZnp5andsa2ZqTDQ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-02",
    "image": {
      "src": "/covers/new-zealand-north-island-earthquake.png",
      "alt": "A seismograph drum recording with dense, jagged ink traces marking the arrival of seismic waves.",
      "credit": "Seismogram recorded at Weston Observatory. Photo by Z22, CC BY-SA 3.0, via Wikimedia Commons."
    },
    "edition": "Morning Edition · 2 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Pliny the Younger watches the earth convulse at Misenum (AD 79)",
        "excerpt": "The chariots, which we had ordered to be drawn out, were so agitated backwards and forwards, though upon the most level ground, that we could not keep them steady, even by supporting them with large stones. The sea seemed to roll back upon itself, and to be driven from its banks by the convulsive motion of the earth; it is certain at least the shore was considerably enlarged, and several sea animals were left upon it.",
        "source": "Pliny the Younger, Letters, Book VI, Letter 20 (to Tacitus), on the eruption of Vesuvius, AD 79; trans. William Melmoth, rev. F. C. T. Bosanquet.",
        "href": "https://www.gutenberg.org/cache/epub/2811/pg2811.txt"
      },
      {
        "category": "historical",
        "title": "An eyewitness feels the ground give way in Lisbon (1755)",
        "excerpt": "It was on the morning of this fatal day, between the hours of nine and ten, that I was set down in my apartment, just finishing a letter, when the papers and table I was writing on began to tremble with a gentle motion, which rather surprised me, as I could not perceive a breath of wind stirring. Whilst I was reflecting with myself what this could be owing to, but without having the least apprehension of the real cause, the whole house began to shake from the very foundation.",
        "source": "The Rev. Charles Davy, eyewitness letter on the Lisbon earthquake of 1 November 1755; reproduced in the Fordham Internet Modern History Sourcebook.",
        "href": "https://sourcebooks.fordham.edu/mod/1755lisbonquake.asp"
      },
      {
        "category": "literary",
        "title": "Voltaire denies that the ruined earth is 'all for the best' (1756)",
        "excerpt": "Unhappy mortals! Dark and mourning earth!\nAffrighted gathering of human kind!\nEternal lingering of useless pain!\nCome, ye philosophers, who cry, “All’s well,”\nAnd contemplate this ruin of a world.\nBehold these shreds and cinders of your race,\nThis child and mother heaped in common wreck,\nThese scattered limbs beneath the marble shafts—\nA hundred thousand whom the earth devours.",
        "source": "Voltaire, “Poem on the Lisbon Disaster; or an Examination of the Axiom, ‘All is Well’” (1756), in Toleration and Other Essays, trans. Joseph McCabe (1912).",
        "href": "https://www.gutenberg.org/cache/epub/64858/pg64858.txt"
      },
      {
        "category": "literary",
        "title": "The earth quakes at the moment of the Crucifixion (Gospel of Matthew)",
        "excerpt": "And, behold, the veil of the temple was rent in twain from the top to the bottom; and the earth did quake, and the rocks rent; And the graves were opened; and many bodies of the saints which slept arose. Now when the centurion, and they that were with him, watching Jesus, saw the earthquake, and those things that were done, they feared greatly, saying, Truly this was the Son of God.",
        "source": "The Gospel According to St. Matthew 27:51–54, King James Version.",
        "href": "https://www.ccel.org/ccel/bible/kjv.Matt.27.html"
      },
      {
        "category": "artistic",
        "title": "The 1755 copperplate of Lisbon in ruins",
        "excerpt": "A contemporary copper engraving depicts Lisbon at the instant of catastrophe: churches and houses splitting and toppling, fires breaking out across the skyline, ships flung and capsized as the Tagus surges over the quay, and tiny figures fleeing or crushed in the streets. The image fixed the disaster in the European imagination as the emblem of humanity's helplessness before the moving earth.",
        "source": "Anonymous copper engraving, “The 1755 Lisbon earthquake” (1755), showing the earthquake, fire, and tsunami. Public domain, via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:1755_Lisbon_earthquake.jpg",
        "image": {
          "src": "/covers/new-zealand-north-island-earthquake--a4.png",
          "alt": "1755 copperplate engraving of Lisbon in ruins, with collapsing buildings, fires, and ships tossed by a tsunami as crowds flee.",
          "credit": "“The 1755 Lisbon earthquake,” anonymous copper engraving, 1755. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "The god pins the earthquake catfish (namazu-e, 1855)",
        "excerpt": "In this Japanese woodblock print made just after the great Ansei Edo earthquake of 1855, the thunder deity Takemikazuchi pins down Namazu, the giant subterranean catfish, with the sacred kaname-ishi (foundation stone). Folk belief held that when the god's guard slipped, the writhing catfish shook the land — a vivid pre-scientific explanation for why the ground suddenly gives way.",
        "source": "Namazu-e (catfish print): Takemikazuchi pinning Namazu with the kaname-ishi keystone, Japan, 1855. Public domain, via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Takemikazuchi-pins-Namazu-with-Kaname-ishi-spirit-stone-1855.png",
        "image": {
          "src": "/covers/new-zealand-north-island-earthquake--a5.png",
          "alt": "1855 Japanese woodblock print showing the deity Takemikazuchi pressing a keystone onto a giant catfish blamed for causing earthquakes.",
          "credit": "Namazu-e woodblock print, Takemikazuchi pinning the catfish Namazu with the kaname-ishi, 1855. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 9
  },
  {
    "slug": "vincent-pastore-sopranos-dies",
    "headline": "Vincent Pastore, who played Salvatore 'Big Pussy' Bonpensiero on The Sopranos, dies at 80",
    "overview": "Vincent Pastore, the American actor best known as Salvatore 'Big Pussy' Bonpensiero, Tony Soprano's friend turned FBI informant on HBO's The Sopranos, has died at 80, his manager and US outlets said. He was found at his home in the Bronx, with no indication of foul play. Born in the Bronx in 1946, Pastore served in the US Navy during the Vietnam War and appeared in films including Goodfellas and Carlito's Way.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMiiAFBVV95cUxNRjdHZzA2RVEzM205b2pGVndobXEtQmotZ3NDS1Q3WGxPQTFxbHpPdXRRMTFGejJpaHZfVkdZVEFNNDY2NDVSQWFyRWx1LW5lNzgxXzdoeHdiWU0xZ3Q0aVFFbTBMZUVLMVpjbTNacDNsaUFFV0hqbUtKaklkaFVUVFZndzRxMXMz?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cm2gz0epljgo"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-02",
    "image": {
      "src": "/covers/vincent-pastore-sopranos-dies.png",
      "alt": "Ancient Roman mosaic showing two theatrical masks, one of Tragedy and one of Comedy, set against a dark ground",
      "credit": "Roman mosaic of the masks of Tragedy and Comedy, 2nd century AD, from the Thermae Decianae, Capitoline Museums, Rome. Photo by Carole Raddato; public domain, via Wikimedia Commons."
    },
    "edition": "Morning Edition · 2 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Johnson mourns Garrick: the death that eclipsed the gaiety of nations",
        "excerpt": "I am disappointed by that stroke of death, which has eclipsed the gaiety of nations, and impoverished the publick stock of harmless pleasure.",
        "source": "Samuel Johnson, \"Life of Edmund Smith,\" in The Lives of the Poets, Volume 1 (1779-1781).",
        "href": "https://www.gutenberg.org/cache/epub/9823/pg9823.txt"
      },
      {
        "category": "historical",
        "title": "The kiss of Judas: the informer's sign, an ancient archetype of betrayal",
        "excerpt": "Now he that betrayed him gave them a sign, saying, Whomsoever I shall kiss, that same is he: hold him fast.",
        "source": "The Gospel According to St. Matthew 26:48, King James Version (1611).",
        "href": "https://ccel.org/ccel/bible/kjv.Matt.26.html"
      },
      {
        "category": "literary",
        "title": "All the world's a stage: the player and his many parts",
        "excerpt": "All the world's a stage,\nAnd all the men and women merely players:\nThey have their exits and their entrances;\nAnd one man in his time plays many parts,\nHis acts being seven ages.",
        "source": "William Shakespeare, As You Like It, Act II, Scene vii (Jaques).",
        "href": "https://shakespeare.mit.edu/asyoulikeit/full.html"
      },
      {
        "category": "literary",
        "title": "A poor player that struts and frets his hour upon the stage",
        "excerpt": "Life's but a walking shadow; a poor player,\nThat struts and frets his hour upon the stage,\nAnd then is heard no more: it is a tale\nTold by an idiot, full of sound and fury,\nSignifying nothing.",
        "source": "William Shakespeare, Macbeth, Act V, Scene v (Macbeth).",
        "href": "https://www.gutenberg.org/cache/epub/1533/pg1533.txt"
      },
      {
        "category": "artistic",
        "title": "Watteau's Pierrot: the melancholy player, the mask and the man",
        "excerpt": "Antoine Watteau's life-size Pierrot (long called Gilles) stands frontally in a loose white satin costume, arms hanging, isolated above a crowd of smaller commedia dell'arte figures. The clown gazes out with a solemn, vacant stillness, as if the performance has ended and only the man beneath the costume remains. It is one of art's great images of the actor stranded between his role and himself.",
        "source": "Antoine Watteau, Pierrot (formerly known as Gilles), c. 1718-1719, oil on canvas, Musee du Louvre, Paris.",
        "href": "https://commons.wikimedia.org/wiki/File:Jean-Antoine_Watteau_-_Pierrot,_dit_autrefois_Gilles.jpg",
        "image": {
          "src": "/covers/vincent-pastore-sopranos-dies--a4.png",
          "alt": "Full-length painting of a clown in a loose white satin costume standing frontally, arms at his sides, with a still, melancholy expression",
          "credit": "Antoine Watteau, Pierrot (formerly Gilles), c. 1718-1719, Musee du Louvre. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Mozart's Requiem: rest for the dead, an elegy left unfinished",
        "excerpt": "Requiem aeternam dona eis, Domine: et lux perpetua luceat eis. (Grant them eternal rest, O Lord: and let perpetual light shine upon them.) Mozart set these words of the Latin Mass for the Dead in 1791 and died before completing the score, leaving his own requiem to be finished by another hand.",
        "source": "Wolfgang Amadeus Mozart, Requiem in D minor, K. 626 (1791), opening Introit; text from the Latin Mass for the Dead.",
        "href": "https://imslp.org/wiki/Requiem_in_D_minor,_K.626_(Mozart,_Wolfgang_Amadeus)",
        "image": {
          "src": "/covers/vincent-pastore-sopranos-dies--a5.png",
          "alt": "A page from the manuscript of Mozart's Requiem, K. 626, showing the composer's handwritten heading and staves for the first movement",
          "credit": "Section of the manuscript of W. A. Mozart's Requiem, K. 626 (1791). Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 10
  },
  {
    "slug": "peru-nazca-lines-tourist-plane-crash",
    "headline": "A tourist plane crashes over Peru's Nazca Lines, killing all 13 people on board",
    "overview": "A Cessna Caravan C-208 carrying sightseeing tourists crashed near Peru's Nazca Lines, the ancient UNESCO World Heritage geoglyphs, killing all 13 people aboard, Peruvian officials said. The dead included seven Italian, two German and two Spanish tourists and two pilots; the aircraft had taken off from Pisco and went down around midday in the Pueblo Viejo area. The cause was not immediately clear.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiugFBVV95cUxQSnE5c2hGZjM2RjZHLWU5Z3lKclF4ZXUteFlvbk5CTE0wdGN4SlJVdkIyNVFNZXF3SjVyYmY3ZDFkRjMwVTBvUFE3THItbkN1RjF5NFV1UkF6MFhWSDBydFRiQXVxX2djcTBrcm1VTjRCcjJkUGs0VjB6RU12bG91Q2k2ZHZNY1dFUzJqZW9KT09QRVFQZXphSjdDNnJMTWQtRDBsSVR3RnlOSXFvbGg4UTBjU2Rua3Q5VkE?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c70g132erlko"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-02",
    "image": {
      "src": "/covers/peru-nazca-lines-tourist-plane-crash.png",
      "alt": "Aerial view of the hummingbird geoglyph etched into the Nazca desert, Peru, visible only from the sky",
      "credit": "Diego Delso, Wikimedia Commons, CC BY-SA 4.0"
    },
    "edition": "Morning Edition · 2 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The lost army of Cambyses vanishes in the desert (5th century BCE)",
        "excerpt": "It is said that the army reached this place, but from that point onwards, except the Ammonians themselves and those who have heard the account from them, no man is able to say anything about them; for they neither reached the Ammonians nor returned back. This however is added to the story by the Ammonians themselves:—they say that as the army was going from this Oasis through the sandy desert to attack them, and had got to a point about mid-way between them and the Oasis, while they were taking their morning meal a violent South Wind blew upon them, and bearing with it heaps of the desert sand it buried them under it, and so they disappeared and were seen no more.",
        "source": "Herodotus, The History, Book III (c. 430 BCE), trans. G. C. Macaulay.",
        "href": "https://www.gutenberg.org/cache/epub/2707/pg2707.txt"
      },
      {
        "category": "historical",
        "title": "The first fatal flight: Pilâtre de Rozier falls from the sky (1785)",
        "excerpt": "M. Pilatre de Rosier, accompanied by M. Romain, determined on crossing the Channel from the French side; and, thinking to add to their buoyancy and avoid the risk of falling in the sea, hit on the extraordinary idea of using a fire balloon beneath another filled with hydrogen gas! With this deadly compound machine they actually ascended from Boulogne, and had not left the land when the inevitable catastrophe took place. The balloons caught fire and blew up at a height of 3,000 feet, while the unfortunate voyagers were dashed to atoms.",
        "source": "John M. Bacon, The Dominion of the Air: The Story of Aerial Navigation (London, 1902), ch. II.",
        "href": "https://www.gutenberg.org/files/861/861-h/861-h.htm"
      },
      {
        "category": "literary",
        "title": "Ovid: Icarus tumbles from the sky when the sun melts his wings",
        "excerpt": "When now the boy, whose childish thoughts aspire\nTo loftier aims, and make him ramble high'r,\nGrown wild, and wanton, more embolden'd flies\nFar from his guide, and soars among the skies.\nThe soft'ning wax, that felt a nearer sun,\nDissolv'd apace, and soon began to run.\nThe youth in vain his melting pinions shakes,\nHis feathers gone, no longer air he takes:\nOh! Father, father, as he strove to cry,\nDown to the sea he tumbled from on high,\nAnd found his Fate; yet still subsists by fame,\nAmong those waters that retain his name.",
        "source": "Ovid, Metamorphoses, Book VIII (8 CE), trans. Sir Samuel Garth, John Dryden, et al. (1717).",
        "href": "https://classics.mit.edu/Ovid/metam.8.eighth.html"
      },
      {
        "category": "literary",
        "title": "Milton: a maker of towers is hurled down from heaven, falling all day long",
        "excerpt": "Nor was his name unheard or unadored\nIn ancient Greece; and in Ausonian land\nMen called him Mulciber; and how he fell\nFrom Heaven they fabled, thrown by angry Jove\nSheer o'er the crystal battlements: from morn\nTo noon he fell, from noon to dewy eve,\nA summer's day, and with the setting sun\nDropt from the zenith, like a falling star,\nOn Lemnos, th' Aegaean isle.",
        "source": "John Milton, Paradise Lost, Book I, lines 738–746 (1667).",
        "href": "https://www.gutenberg.org/cache/epub/26/pg26.txt"
      },
      {
        "category": "artistic",
        "title": "Bruegel: the world goes on while Icarus drowns unnoticed",
        "excerpt": "In this famous Netherlandish panel, a vast luminous seascape spreads beneath a serene sky while a ploughman, a shepherd and a fisherman go about their work. Only on close looking does the eye find Icarus: two pale legs and a splash in the lower right corner, the fallen flyer already swallowed by the sea as the indifferent world sails on. The painting turns catastrophe into a small event glimpsed from a great, panoramic distance—much as the Nazca desert reveals its meaning only when seen whole from above.",
        "source": "After Pieter Bruegel the Elder, Landscape with the Fall of Icarus, c. 1555–1560, oil on canvas, Royal Museums of Fine Arts of Belgium, Brussels.",
        "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_de_Oude_-_De_val_van_Icarus.jpg",
        "image": {
          "src": "/covers/peru-nazca-lines-tourist-plane-crash--a4.png",
          "alt": "A wide coastal landscape with a ploughman in the foreground; in the lower right, only the legs of the drowning Icarus break the water",
          "credit": "After Pieter Bruegel the Elder, Landscape with the Fall of Icarus (c. 1555–1560), Royal Museums of Fine Arts of Belgium; via Wikimedia Commons, public domain."
        }
      },
      {
        "category": "artistic",
        "title": "Draper: mourners gather over the broken body of the fallen flyer",
        "excerpt": "Herbert James Draper's late-Victorian canvas shows Icarus fallen at last upon a rocky shore, his great feathered wings still strapped to his back and now useless, his bronzed body limp. Three grieving sea-nymphs cradle and lament him as the sun that killed him blazes low on the horizon. The picture dwells on the aftermath of flight—the beautiful ambition of rising into the sky answered by stillness, gravity and grief.",
        "source": "Herbert James Draper, The Lament for Icarus, 1898, oil on canvas, Tate, London.",
        "href": "https://commons.wikimedia.org/wiki/File:Herbert_Draper_-_The_Lament_for_Icarus_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/peru-nazca-lines-tourist-plane-crash--a5.png",
          "alt": "The dead Icarus with large feathered wings lies against a rock while three sea-nymphs mourn over his body at sunset",
          "credit": "Herbert James Draper, The Lament for Icarus (1898), Tate; via Wikimedia Commons (Google Art Project), public domain."
        }
      }
    ],
    "rank": 11
  },
  {
    "slug": "capital-one-closes-trump-organization-accounts",
    "headline": "Capital One says it closed the Trump Organization's accounts after an anti-money-laundering review",
    "overview": "Capital One said it closed the Trump Organization's bank accounts following an internal anti-money-laundering review, according to a court filing, disclosed as it defends against a lawsuit brought by the company. The Trump Organization had accused the bank of 'de-banking' it for political reasons after the January 6 Capitol riot. Capital One said the closures followed its standard risk and compliance processes.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiwwFBVV95cUxORFNsQWFYNkk3UUhkdm5yRmpmNmZnTjVLS1RrSGdTcGZxTVhOaHVURzlhQTJUd3BYSzlYa3dNcnRXb1Y5VEZuSE1HdjA0bXNjNkM3Y2hHOHptN2I3N2FsQWxsLXFhNVZ2ZDROUkJFaXFLYVNjd0FmcUNqRlNYbkN0SUhfVURTQzdZbzRvaXkyRFVCTGZMTkJMa0Q3SlVHeW0zaGtvY1VidWRETENLWERtSUJUeHdlMmFzemp4bXhTV1BySTQ?oc=5"
      },
      {
        "name": "The Guardian",
        "href": "https://news.google.com/rss/articles/CBMimwFBVV95cUxQdjJVOG1mVnpGTnJEUlp2UHJvakFoMko0N3BzTU0xZXE5XzF3eEE1YlA0ZEF5eVBWbExvN0lTMlhCMEp5RGpVQUFKWTFNa1dZUXRQdjM5SjNadTgyU2tkV0lBWnRzdHJfZ1M1Mzk3eDBpSGNXMDlDM2FmOEFkNk9Db0lwdUhiY1dETmVzWkhKaF9ZZTRQeGxmNEtiOA?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-02",
    "image": {
      "src": "/covers/capital-one-closes-trump-organization-accounts.png",
      "alt": "The massive steel door of a bank vault, its bolts and gears exposed, standing shut on a strongroom.",
      "credit": "Photo by Santoman, CC BY-SA 4.0, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 2 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Rome's credit crisis of A.D. 33: the moneylenders called to account",
        "excerpt": "Meanwhile a powerful host of accusers fell with sudden fury on the class which systematically increased its wealth by usury in defiance of a law passed by Caesar the Dictator defining the terms of lending money and of holding estates in Italy, a law long obsolete because the public good is sacrificed to private interest. The curse of usury was indeed of old standing in Rome and a most frequent cause of sedition and discord, and it was therefore repressed even in the early days of a less corrupt morality.",
        "source": "Tacitus, The Annals, Book VI (c. A.D. 116), trans. Alfred John Church and William Jackson Brodribb.",
        "href": "https://classics.mit.edu/Tacitus/annals.6.vi.html"
      },
      {
        "category": "historical",
        "title": "John Law's bank falls: the master of credit undone (1720)",
        "excerpt": "He was thoroughly acquainted with the philosophy and true principles of credit. He understood the monetary question better than any man of his day; and if his system fell with a crash so tremendous, it was not so much his fault as that of the people amongst whom he had erected it.",
        "source": "Charles Mackay, Memoirs of Extraordinary Popular Delusions and the Madness of Crowds, Vol. I, \"The Mississippi Scheme\" (London, 1841).",
        "href": "https://www.gutenberg.org/cache/epub/24518/pg24518.txt"
      },
      {
        "category": "literary",
        "title": "The cleansing of the temple: the money-changers cast out",
        "excerpt": "And found in the temple those that sold oxen and sheep and doves, and the changers of money sitting: And when he had made a scourge of small cords, he drove them all out of the temple, and the sheep, and the oxen; and poured out the changers' money, and overthrew the tables; And said unto them that sold doves, Take these things hence; make not my Father's house an house of merchandise.",
        "source": "The Gospel According to St. John 2:14-16, King James Version (1611).",
        "href": "https://www.ccel.org/ccel/bible/kjv.John.2.html"
      },
      {
        "category": "literary",
        "title": "Shylock on usury: the lender scorned, then needed",
        "excerpt": "Signior Antonio, many a time and oft\nIn the Rialto you have rated me\nAbout my moneys and my usances.\nStill have I borne it with a patient shrug,\n(For suff'rance is the badge of all our tribe.)\nYou call me misbeliever, cut-throat dog,\nAnd spet upon my Jewish gaberdine,\nAnd all for use of that which is mine own.",
        "source": "William Shakespeare, The Merchant of Venice, Act I, Scene 3 (c. 1596-99).",
        "href": "https://www.gutenberg.org/files/1515/1515-0.txt"
      },
      {
        "category": "artistic",
        "title": "Matsys, The Moneylender and His Wife (1514)",
        "excerpt": "In Quentin Matsys's panel, a moneylender bends over his scales, weighing gold coins and pearls with the concentration of a priest at an altar, while his wife pauses over an illuminated prayer book, her eyes drifting from the Virgin's page to the glinting metal. A small convex mirror on the table catches a window, a red-hatted figure, and a distant church steeple, so that the sacred and the mercantile share one crowded surface. The picture holds, without resolving, the old question the news revives: when does the counting of money become a moral reckoning?",
        "source": "Quentin Matsys (Massys), The Moneylender and His Wife, 1514, oil on panel, Musee du Louvre, Paris.",
        "href": "https://commons.wikimedia.org/wiki/File:Massysm_Quentin_%E2%80%94_The_Moneylender_and_his_Wife_%E2%80%94_1514.jpg",
        "image": {
          "src": "/covers/capital-one-closes-trump-organization-accounts--a4.png",
          "alt": "A moneylender weighs gold coins on a small balance while his wife, turning from a prayer book, watches the scales.",
          "credit": "Quentin Matsys, The Moneylender and His Wife (1514), public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "El Greco, Christ Driving the Traders from the Temple",
        "excerpt": "El Greco returned again and again to this subject, and here a whip-raising Christ in flaming rose-red erupts at the center of a marble portico, his twisting arm scattering a knot of traders and money-changers who recoil, stumble, and shield themselves in a tumble of muscular limbs. To the right, apostles look on calmly, so that the canvas splits into the cast-out and the kept, judgment enacted in a single gesture. The violence of the expulsion, staged as a cleansing rather than a cruelty, is exactly the frame each side now claims in a fight over who is being driven from the marketplace.",
        "source": "El Greco (Domenikos Theotokopoulos), Christ Driving the Traders from the Temple (The Purification of the Temple), c. 1600, oil on canvas.",
        "href": "https://commons.wikimedia.org/wiki/File:El_Greco_016.jpg",
        "image": {
          "src": "/covers/capital-one-closes-trump-organization-accounts--a5.png",
          "alt": "A red-robed Christ raises a whip at the center of a temple, scattering money-changers and traders who recoil in alarm.",
          "credit": "El Greco, Christ Driving the Traders from the Temple, public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 12
  },
  {
    "slug": "hungary-post-orban-political-era",
    "headline": "Hungary's business and political elite recalibrate as a new post-Orban era takes hold",
    "overview": "Hungary's companies and power brokers are adjusting to a new political era as Viktor Orban's long dominance gives way, with a change of government reshaping the ties between business and the state, Reuters reported. Firms that thrived under Orban's system are hedging their bets as lawmakers move to unwind parts of his political machinery. The transition is testing whether Hungary can loosen the grip of state-linked capitalism built over more than a decade.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMitgFBVV95cUxQRm5DNHdPUDhzLXBHNEhFTVFnTVQyN3RGNXVvSWFpWVVTZEE2X0V6cTNmQi1iV2RxWTZqdnJGR1RSZ0pZNnk1UEV1Y1AtM19pYXJWUzBwM09ucEU5OElmVnV4OW4wWXdNNWh4QVpTelZZbTdVVjZyYjdXNEpZRzJDckV6cGJoNUxoQU5JU2NfVnZ3MWNsVDFVcGZiZ25WVnFEdmVFZUV5enNDdlF3Q1hzTDl3RVpwZw?oc=5"
      },
      {
        "name": "The Economic Times",
        "href": "https://news.google.com/rss/articles/CBMi7AFBVV95cUxNY3MzTWs5cENaUHBJVTF1T1RZbC1qSUx3bkxEMHVqX20yYmFxbk50TjE3a2NOazRtVlk2dUZRSkZsd081WWtjUmhVN1lHbjJUeF9hS3hOcVdRSjF4b3doYTBWajh4aElDek13eFo1aTd5NUwtQkJjaFdwRTNTcnlTOG9iSVdKdDhQV05mbUlNV3E4SVgtQjV2by1TZTA3TUZNcW16LTMydjRmMW5JZzdMWmtVb1dTUkxmSVZqczN2eklneE40WmpOVS1hNW1VLWg1RldPNzB0OFdCMGQ2OHhJV0RxU09kazNsUXFPUg?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-02",
    "image": {
      "src": "/covers/hungary-post-orban-political-era.png",
      "alt": "The Hungarian Parliament Building illuminated at night, reflected in the Danube in Budapest",
      "credit": "Florian Fèvre (User:Billy69150), via Wikimedia Commons, CC BY-SA 4.0"
    },
    "edition": "Morning Edition · 2 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The fall of Sejanus, Rome, AD 31",
        "excerpt": "They hurled down, beat down, and dragged down all his images, as though they were thereby treating the man himself with contumely, and he thus became a spectator of what he was destined to suffer. For the moment, it is true, he was merely cast into prison.",
        "source": "Cassius Dio, Roman History, Book LVIII.11 (Loeb Classical Library translation by Earnest Cary, 1924), on the sudden ruin of Lucius Aelius Sejanus, all-powerful favourite of the emperor Tiberius.",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Cassius_Dio/58*.html"
      },
      {
        "category": "historical",
        "title": "Cardinal Wolsey's fall from favour, England, 1530",
        "excerpt": "\"Well, well, Master Kingston,\" quoth he, \"I see the matter against me how it is framed; but if I had served God as diligently as I have done the king, he would not have given me over in my grey hairs. Howbeit this is the just reward that I must receive for my worldly diligence and pains that I have had to do him service.\"",
        "source": "George Cavendish, The Life of Cardinal Wolsey (written c. 1557), recording the dying words of Thomas Wolsey, Henry VIII's Lord Chancellor, after his disgrace. Project Gutenberg eBook 54043.",
        "href": "https://www.gutenberg.org/cache/epub/54043/pg54043.txt"
      },
      {
        "category": "literary",
        "title": "Fortune addresses her victim, Boethius, c. 524",
        "excerpt": "This is my art, this the game I never cease to play. I turn the wheel that spins. I delight to see the high come down and the low ascend. Mount up, if thou wilt, but only on condition that thou wilt not think it a hardship to come down when the rules of my game require it.",
        "source": "Boethius, The Consolation of Philosophy, Book II, Prose 2 (H. R. James translation, 1897), Fortune speaking in her own defence. Project Gutenberg eBook 14328.",
        "href": "https://www.gutenberg.org/files/14328/14328-h/14328-h.htm"
      },
      {
        "category": "literary",
        "title": "Ozymandias, Percy Bysshe Shelley, 1818",
        "excerpt": "And on the pedestal these words appear:\n\"My name is Ozymandias, King of Kings.\"\nLook on my works ye Mighty, and despair!\nNo thing beside remains. Round the decay\nOf that Colossal Wreck, boundless and bare,\nThe lone and level sands stretch far away.",
        "source": "Percy Bysshe Shelley, \"Ozymandias,\" first published in The Examiner (London), 11 January 1818, under the pseudonym Glirastes.",
        "href": "https://en.wikisource.org/wiki/The_Examiner_(London)/Ozymandias"
      },
      {
        "category": "artistic",
        "title": "The Wheel of Fortune, from Boccaccio's De Casibus",
        "excerpt": "A French illuminated miniature shows the goddess Fortune turning her great wheel while crowned kings cling to its rim: one rides triumphant at the summit, another is flung headlong to the ground as it revolves. It illustrates Boccaccio's De Casibus Virorum Illustrium (On the Fates of Famous Men), the medieval catalogue of the powerful brought low, painted in France around 1450-75.",
        "source": "Wheel of Fortune miniature from a 15th-century French illuminated manuscript of Giovanni Boccaccio's De Casibus Virorum Illustrium, translated by Laurent de Premierfait, c. 1450-75.",
        "href": "https://commons.wikimedia.org/wiki/File:Boccaccio,_de_casibus...,_tradotto_in_francese_da_laurent_de_premierfait,_edizione_miniata_in_francia_nel_1450-75_ca._02_ruota_della_fortuna.jpg",
        "image": {
          "src": "/covers/hungary-post-orban-political-era--a4.png",
          "alt": "Medieval illumination of the goddess Fortune turning a wheel to which crowned kings cling, one rising and one falling",
          "credit": "Wheel of Fortune, illuminated manuscript of Boccaccio's De Casibus Virorum Illustrium, France c. 1450-75, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Romans of the Decadence, Thomas Couture, 1847",
        "excerpt": "Thomas Couture's vast canvas stages the exhaustion of empire: revellers sprawl among marble columns after a night of dissipation, hollow-eyed and spent, while austere statues of the old republican virtues look down in reproach. Exhibited to acclaim in 1847, it was read at once as a verdict on a ruling order that had outlived its vigour and was drifting toward collapse.",
        "source": "Thomas Couture, Les Romains de la décadence (Romans of the Decadence), oil on canvas, 1847, Musée d'Orsay, Paris.",
        "href": "https://commons.wikimedia.org/wiki/File:Thomas_Couture_-_Les_Romains_de_la_d%C3%A9cadence.jpg",
        "image": {
          "src": "/covers/hungary-post-orban-political-era--a5.png",
          "alt": "Large 19th-century painting of Romans reclining and carousing amid classical columns after a night of excess, watched by stern ancestral statues",
          "credit": "Thomas Couture, Les Romains de la décadence (1847), Musée d'Orsay, via Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 13
  },
  {
    "slug": "ukraine-sea-drones-sink-rosatom-ship",
    "headline": "Ukrainian sea drones sink the Rosatom-owned cargo ship Yanina in the Black Sea, the first time Kyiv has sunk a Russian civilian merchant vessel; all 17 crew are rescued",
    "overview": "Two Ukrainian naval drones struck and sank the container ship Yanina, operated by a subsidiary of Russia's state nuclear corporation Rosatom, about 130 nautical miles (240 km) from the port of Novorossiysk in the Black Sea early on 1 August, Russian and Ukrainian officials said. Russia said the vessel was carrying civilian cargo and that all 17 crew members were rescued, while President Volodymyr Zelensky confirmed the strike, saying Ukrainian forces had hit assets supporting Moscow's war effort. It was the first reported sinking of a Russian-owned commercial cargo ship by Ukraine's uncrewed surface vessels.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMivwFBVV95cUxQdHRSSERGYnJKSWphUV9LNVBnVEE2RHpZS2d3eTVTMDNGR2dDTlRhSlBfNHYwb2ZoSHl3d3QtX0xVV1NiSHMwZVExN1hOTTA0eTBnYUZoeE5LV2R2T0tuRFV6VXJtNkxIV0tfRXRwTXluMkZ0UW81R1hCQ0JrcHFSVVhUbThXWURObTJHaFhMRmdETHhTN29Ca3ZHTjdkaWVBRldJVy1oNFNlekk5SmRQSGtVTFR6TmJuVklEWHlBdw?oc=5"
      },
      {
        "name": "The Moscow Times",
        "href": "https://www.themoscowtimes.com/2026/08/01/ukraine-sinks-russian-owned-container-ship-in-black-sea-rosatom-says-a93393"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-01",
    "image": {
      "src": "/covers/ukraine-sea-drones-sink-rosatom-ship.png",
      "alt": "A large ocean-going container ship laden with stacked cargo containers steaming across open grey sea",
      "credit": "RO-RO cargo vessel MISANA. Wikimedia Commons (CC BY-SA 4.0)."
    },
    "lead": true,
    "edition": "Evening Edition · 1 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Battle of Salamis (480 BC)",
        "excerpt": "Far the greater number of the Persian ships engaged in this battle were disabled, either by the Athenians or by the Eginetans.",
        "source": "Herodotus, The Histories, Book VIII (the Battle of Salamis), trans. George Rawlinson. The Internet Classics Archive (MIT).",
        "href": "https://classics.mit.edu/Herodotus/history.8.viii.html"
      },
      {
        "category": "historical",
        "title": "The Sinking of the RMS Titanic (1912)",
        "excerpt": "She was absolutely still—indeed from the first it seemed as if the blow from the iceberg had taken all the courage out of her and she had just come quietly to rest and was settling down without an effort to save herself, without a murmur of protest against such a foul blow.",
        "source": "Lawrence Beesley, The Loss of the S.S. Titanic: Its Story and Its Lessons (1912), Chapter IV. Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/6675/6675-h/6675-h.htm"
      },
      {
        "category": "literary",
        "title": "Homer, The Odyssey, Book XII (c. 8th century BC)",
        "excerpt": "The men all fell into the sea; they were carried about in the water round the ship, looking like so many sea-gulls, but the god presently deprived them of all chance of getting home again.",
        "source": "Homer, The Odyssey, Book XII, trans. Samuel Butler. The Internet Classics Archive (MIT).",
        "href": "https://classics.mit.edu/Homer/odyssey.12.xii.html"
      },
      {
        "category": "literary",
        "title": "The Lament for Tyre, Ezekiel 27 (King James Version, 1611)",
        "excerpt": "Thy rowers have brought thee into great waters: the east wind hath broken thee in the midst of the seas.",
        "source": "The Holy Bible, Book of Ezekiel, chapter 27, verse 26 (King James Version). Christian Classics Ethereal Library.",
        "href": "https://ccel.org/ccel/bible/kjv.Ezek.27.html"
      },
      {
        "category": "artistic",
        "title": "Ivan Aivazovsky, The Ninth Wave (1850)",
        "excerpt": "Aivazovsky, the master marine painter of the Black Sea, shows a handful of shipwreck survivors clinging to a fragment of a broken mast at dawn as a towering ninth wave, the sailors' fabled deadliest swell, rears up to break over them. Their great vessel is already gone beneath the water; only the small and the desperate remain, held in a defiant golden sunrise. It mirrors the drowning of a proud ship in this very sea, and a crew who, against the odds, live to see the morning.",
        "source": "Ivan (Hovhannes) Aivazovsky, The Ninth Wave, 1850, oil on canvas. State Russian Museum, Saint Petersburg. Via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Hovhannes_Aivazovsky_-_The_Ninth_Wave_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/ukraine-sea-drones-sink-rosatom-ship--a4.png",
          "alt": "Shipwreck survivors cling to a broken mast at sunrise as an enormous wave rises over them on a stormy sea.",
          "credit": "Ivan Aivazovsky, The Ninth Wave, 1850, State Russian Museum, Saint Petersburg. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "J. M. W. Turner, The Shipwreck (1805)",
        "excerpt": "Turner sets a great sailing ship foundering amid mountainous seas, her masts canting over as tiny, overloaded boats pitch among the waves and figures strain against water that dwarfs every human effort. He makes the sea itself the true subject of the picture, indifferent and overwhelming, swallowing the proud vessel whole. It is the Romantic vision of exactly this ancient fear: that for all a ship's size and power, the water can take her in minutes.",
        "source": "Joseph Mallord William Turner, The Shipwreck, 1805, oil on canvas. Tate, London (N00476). Via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Joseph_Mallord_William_Turner_-_The_Shipwreck_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/ukraine-sea-drones-sink-rosatom-ship--a5.png",
          "alt": "A large sailing ship founders in towering storm waves while small crowded boats struggle in the water nearby.",
          "credit": "J. M. W. Turner, The Shipwreck, 1805, Tate, London. Public domain via Wikimedia Commons."
        }
      }
    ],
    "rank": 14
  },
  {
    "slug": "moscow-region-restaurant-bombing",
    "headline": "A bomb carried by a woman explodes near a restaurant outside Moscow, killing three people and wounding 21, Russian investigators say",
    "overview": "An improvised explosive device carried by a woman detonated near a restaurant in the Moscow region on 1 August, killing three people, including the woman, and injuring 21 others, Russia's Investigative Committee and state media reported. Investigators opened a criminal case and said they were working to establish the circumstances and motive of the blast.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMilwFBVV95cUxQNkhRMDdsSlFaempsUmw0WmZQV0VzNTg5MnQ2TE9pbEs0WUg1ZDVYQWlfVWdXSjRwdUM4YThmMnB3aUs2cUVDZ0s0MnNlSDNHMDJDZU5iWmE0eFdpTmRlMlcwV05HNkI4b0d5SVJhS080bl9CZlNPUkpoSWZjRjRNZUw5alNtaFVQdERIT2p5MDlSTTFCWms4?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c86n4ljxp63o"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-01",
    "image": {
      "src": "/covers/moscow-region-restaurant-bombing.png",
      "alt": "Flashing blue lights of emergency service vehicles cordoning off a street at night",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 1 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Sicarii strike in the crowds of Jerusalem (1st century AD)",
        "excerpt": "When the country was purged of these, there sprang up another sort of robbers in Jerusalem, which were called Sicarii, who slew men in the day time, and in the midst of the city; this they did chiefly at the festivals, when they mingled themselves among the multitude, and concealed daggers under their garments, with which they stabbed those that were their enemies; and when any fell down dead, the murderers became a part of those that had indignation against them; by which means they appeared persons of such reputation, that they could by no means be discovered.",
        "source": "Flavius Josephus, The War of the Jews (The Jewish War), Book II, ch. 13, trans. William Whiston; Wikisource",
        "href": "https://en.wikisource.org/wiki/The_War_of_the_Jews/Book_II"
      },
      {
        "category": "historical",
        "title": "The Cafe Terminus bombing, Paris (12 February 1894)",
        "excerpt": "The bomb exploded in the middle of the room and wounded twenty persons.... An instrumental concert began in the cafe, which is on the ground floor of the hotel, at 8 o'clock.... The bomb struck an electric light fixture, then fell on a marble table and exploded.",
        "source": "\"Bomb in a Paris Hotel,\" New-York Tribune, February 13, 1894, p. 1; Chronicling America, Library of Congress",
        "href": "https://www.loc.gov/resource/sn83030214/1894-02-13/ed-1/?sp=1"
      },
      {
        "category": "literary",
        "title": "Belshazzar's feast and the writing on the wall (Book of Daniel, c. 2nd century BC)",
        "excerpt": "In the same hour came forth fingers of a man's hand, and wrote over against the candlestick upon the plaister of the wall of the king's palace: and the king saw the part of the hand that wrote. Then the king's countenance was changed, and his thoughts troubled him, so that the joints of his loins were loosed, and his knees smote one against another.",
        "source": "The Holy Bible, Book of Daniel 5:5-6 (King James Version, 1611); Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Daniel"
      },
      {
        "category": "literary",
        "title": "W. B. Yeats, \"The Second Coming\" (1920)",
        "excerpt": "Things fall apart; the centre cannot hold;\nMere anarchy is loosed upon the world,\nThe blood-dimmed tide is loosed, and everywhere\nThe ceremony of innocence is drowned;",
        "source": "William Butler Yeats, \"The Second Coming,\" in Michael Robartes and the Dancer (Cuala Press, 1920); Wikisource",
        "href": "https://en.wikisource.org/wiki/Michael_Robartes_and_the_Dancer/The_Second_Coming"
      },
      {
        "category": "artistic",
        "title": "Pieter Bruegel the Elder, The Massacre of the Innocents (c. 1565-1567)",
        "excerpt": "A snow-covered Flemish village, the most ordinary of winter scenes, is overrun without warning by a column of armored soldiers who break into the houses and cut down the children. Bruegel paints terror not as distant scripture but as it would look in his own streets, with villagers pleading in the snow and doors kicked in. The gospel massacre becomes a study of how sudden, organized violence descends on people going quietly about their day.",
        "source": "Pieter Bruegel the Elder, The Massacre of the Innocents, oil on panel, c. 1565-1567, Kunsthistorisches Museum, Vienna (via Web Gallery of Art); Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_the_Elder_-_The_Massacre_of_the_Innocents_-_WGA3479.jpg",
        "image": {
          "src": "/covers/moscow-region-restaurant-bombing--a4.png",
          "alt": "Pieter Bruegel the Elder's painting The Massacre of the Innocents: soldiers on horseback raiding a snowy village while families plead in the street.",
          "credit": "Pieter Bruegel the Elder, The Massacre of the Innocents (c. 1565-1567), Kunsthistorisches Museum, Vienna. Public domain, via Wikimedia Commons (Web Gallery of Art)."
        }
      },
      {
        "category": "artistic",
        "title": "Francisco de Goya, The Third of May 1808 (1814)",
        "excerpt": "In the dark hours outside Madrid a firing squad guns down ordinary townspeople rounded up after the uprising, their bodies lit by a single stark lantern. The central figure throws his arms wide in a pose echoing the crucifixion, a defenseless man in the instant before annihilation. Goya strips war of all glory and shows only the raw, arbitrary killing of civilians seized by terror.",
        "source": "Francisco de Goya, El tres de mayo de 1808 en Madrid, oil on canvas, 1814, Museo del Prado, Madrid; Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:El_Tres_de_Mayo,_by_Francisco_de_Goya,_from_Prado_thin_black_margin.jpg",
        "image": {
          "src": "/covers/moscow-region-restaurant-bombing--a5.png",
          "alt": "Francisco de Goya's The Third of May 1808: a firing squad executing civilians by lantern light, a man in a white shirt with arms outstretched.",
          "credit": "Francisco de Goya, The Third of May 1808 (1814), Museo del Prado, Madrid. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 15
  },
  {
    "slug": "india-delhi-protest-pellet-gun-wounds",
    "headline": "Independent experts tell the BBC that wounds on India's detained 'Cockroach' party protesters are consistent with pellet-gun fire, as Modi says punishing students will not resolve the unrest",
    "overview": "Independent ballistics and forensic experts told the BBC that injuries suffered by supporters of the Cockroach Janta Party during a 20 July march on India's parliament in Delhi are consistent with birdshot fired from pump-action shotguns, or 'pellet guns.' Tens of thousands had rallied for education reforms and the resignation of the education minister, and Delhi Police said 60 protesters and 118 officers were injured in the crackdown. Prime Minister Narendra Modi said punishing the student protesters would not resolve the situation.",
    "genre": "Politics",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c74gwvygkjdo"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMivAFBVV95cUxQelgxUVNMNHZzSFlGQTdBVXdwbG54VEczcDVNMjFLZGlGSEpEbVdKMmVrOXNXdk84LTZOWVlwV0l6UjZMclg3ZnUxZlAxR2F2QTBneTFGdWJYYkJtVUhVU01lOTBVeVJ6STdncl9fTXpkSDdCYlBJTGJOMWdtb21PZE9PZU1HYnlmRS04bzZtRHNJelVSYzdOOTl5d1lHNTUxcTByaldpZlBPZzJnVkdIRjdycVN4NzY5N1U2Qg?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-01",
    "image": {
      "src": "/covers/india-delhi-protest-pellet-gun-wounds.png",
      "alt": "A large crowd of protesters filling a broad city avenue amid haze",
      "credit": "Student protesters at Raisina Hill, New Delhi. Wikimedia Commons (CC BY-SA 3.0)."
    },
    "edition": "Evening Edition · 1 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Peterloo Massacre, St Peter's Field, Manchester (16 August 1819)",
        "excerpt": "On the afternoon of the 17th I visited, in company with some military medical officers, the Infirmary. I saw there from twelve to twenty cases of sabre-wounds, and among these two women who appeared not likely to recover. One man was in a dying state from a gunshot wound in the head; another had had his leg amputated; both these casualties arose from the firing of the 88th the night before. Two or three were reputed dead; one of them a constable, killed on St. Peter's field, but I saw none of the bodies.",
        "source": "Sir William G. H. Jolliffe, eyewitness letter, in F. A. Bruton (ed.), Three Accounts of Peterloo (Manchester University Press / Longmans, 1921); Project Gutenberg eBook #37004",
        "href": "https://www.gutenberg.org/files/37004/37004-h/37004-h.htm"
      },
      {
        "category": "historical",
        "title": "Winston Churchill on the Amritsar (Jallianwala Bagh) Massacre, House of Commons (8 July 1920)",
        "excerpt": "one tremendous fact stands out—I mean the slaughter of nearly 400 persons and the wounding of probably three or four times as many, at the Jallian Wallah Bagh on 13th April. That is an episode which appears to me to be without precedent or parallel in the modern history of the British Empire. It is an event of an entirely different order from any of those tragical occurrences which take place when troops are brought into collision with the civil population. It is an extraordinary event, a monstrous event, an event which stands in singular and sinister isolation.",
        "source": "Mr Winston Churchill, \"Army Council and General Dyer,\" HC Deb 08 July 1920, vol 131, cc1725-1727; Hansard, UK Parliament (official record)",
        "href": "https://api.parliament.uk/historic-hansard/commons/1920/jul/08/army-council-and-general-dyer"
      },
      {
        "category": "literary",
        "title": "Percy Bysshe Shelley, \"The Masque of Anarchy\" (written 1819, on Peterloo)",
        "excerpt": "'And these words shall then become\nLike Oppression's thundered doom\nRinging through each heart and brain,\nHeard again—again—again—\n\n'Rise like Lions after slumber\nIn unvanquishable number—\nShake your chains to earth like dew\nWhich in sleep had fallen on you—\nYe are many—they are few.'",
        "source": "Percy Bysshe Shelley, \"The Mask of Anarchy,\" in The Complete Poetical Works of Percy Bysshe Shelley, ed. Thomas Hutchinson (Oxford University Press, 1914); Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Complete_Poetical_Works_of_Percy_Bysshe_Shelley_(ed._Hutchinson,_1914)/The_Mask_of_Anarchy"
      },
      {
        "category": "literary",
        "title": "Victor Hugo, Les Misérables — Enjolras on the barricade (1862; set 1832)",
        "excerpt": "Equality has an organ: gratuitous and obligatory instruction. The right to the alphabet, that is where the beginning must be made. The primary school imposed on all, the secondary school offered to all, that is the law. From an identical school, an identical society will spring. Yes, instruction! light! light! everything comes from light, and to it everything returns. Citizens, the nineteenth century is great, but the twentieth century will be happy.",
        "source": "Victor Hugo, Les Misérables, Volume V (Jean Valjean), Book First, ch. V, trans. Isabel F. Hapgood; Project Gutenberg eBook #135",
        "href": "https://www.gutenberg.org/cache/epub/135/pg135.txt"
      },
      {
        "category": "artistic",
        "title": "Honoré Daumier, The Uprising (L'Émeute) (c. 1848–1852)",
        "excerpt": "Out of a crush of anonymous, shadowed heads a single young man surges to the front in a bright open-collared shirt, one arm flung upward in a fist that seems to pull the whole street after him. Daumier paints not a battle but the electric instant a crowd becomes a movement—faces caught between fear and exaltation, the human tide leaning as one toward something just out of frame. It is the archetypal image of ordinary people rising, with the young at their head.",
        "source": "Honoré Daumier, The Uprising (L'Émeute), oil on canvas, c. 1848–1852, The Phillips Collection, Washington, D.C.; via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Honor%C3%A9_Daumier_-_The_Uprising_(L%27Emeute)_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/india-delhi-protest-pellet-gun-wounds--a4.png",
          "alt": "A young man in a white open-collared shirt raises a clenched fist high as he leads a dense, dim crowd of men surging forward through a narrow street.",
          "credit": "Honoré Daumier, The Uprising (L'Émeute), c. 1848–1852, The Phillips Collection, Washington, D.C. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Ilya Repin, 17 October 1905 (1907)",
        "excerpt": "Repin captures the euphoric moment a demonstration pours through a city square, red banners and a spray of scarlet carnations thrust to the sky as students, workers and intelligentsia lock arms and sing. A jubilant orator is hoisted shoulder-high above the throng, faces flushed with the giddy, dangerous freedom of the streets. It is the crowd not as victim but as a mass political force, defiant and exultant in the open air.",
        "source": "Ilya Repin, 17 October 1905 (Demonstration on 17 October 1905), oil on canvas, 1907 (reworked 1911), State Russian Museum, St Petersburg; via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Repin_17October.jpg",
        "image": {
          "src": "/covers/india-delhi-protest-pellet-gun-wounds--a5.png",
          "alt": "A dense, jubilant demonstration crowd fills a street; people raise red flags and a bunch of red flowers, a man is carried aloft, and a placard reads '1905 17'.",
          "credit": "Ilya Repin, 17 October 1905 (1907), State Russian Museum, St Petersburg. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 16
  },
  {
    "slug": "ceuta-morocco-mass-crossing-barrier",
    "headline": "Spain installs a floating sea barrier at its Ceuta enclave and the EU calls an emergency meeting after a mass crossing from Morocco that authorities say left 67 migrants dead",
    "overview": "Spain deployed a floating barrier in the sea off its North African enclave of Ceuta after thousands of migrants tried to reach it by swimming and wading from neighbouring Morocco, a surge in which Spanish authorities said at least 67 people died. The European Union announced an emergency meeting to address the crossings. Many of those who reached Ceuta told reporters that hunger and hostility soon drove them back into Morocco.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMikwFBVV95cUxOSnlUUmF3WUJfaG9nWXdGdGVqakY5UFB2T1BQQmFHQzRCRjd0TXFBSDdlQzdVVG5jQU1xRm8wMXR1bWhFZThuWVhiMHo4ZXJVdU9YTHUwb3VyWXBLX0R6dXFWLWtDanFDVzBES05tX200V1h0Z2FSOEt0TWtCalg4OXAtRGNwRkt6NjgzcEpDY1M2SDg?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cz7d17r455go"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-01",
    "image": {
      "src": "/covers/ceuta-morocco-mass-crossing-barrier.png",
      "alt": "A rocky Mediterranean coastline and breakwater where sea meets a fortified border",
      "credit": "The Ceuta border fence between Spain and Morocco. Wikimedia Commons (CC BY-SA 2.0)."
    },
    "edition": "Evening Edition · 1 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Goths cross the Danube into the Roman Empire (376 AD)",
        "excerpt": "they crossed the stream day and night, without ceasing, embarking in troops on board ships and rafts, and canoes made of the hollow trunks of trees, in which enterprise, as the Danube is the most difficult of all rivers to navigate, and was at that time swollen with continual rains, a great many were drowned, who, because they were too numerous for the vessels, tried to swim across, and in spite of all their exertions were swept away by the stream.",
        "source": "Ammianus Marcellinus, Roman History (Res Gestae), Book XXXI.4, trans. C. D. Yonge, Bohn's Classical Library (London, 1862); Tertullian.org text archive",
        "href": "https://www.tertullian.org/fathers/ammianus_31_book31.htm"
      },
      {
        "category": "historical",
        "title": "The Athenians abandon their city before Salamis (480 BC)",
        "excerpt": "Immediately upon their arrival, proclamation was made that every Athenian should save his children and household as he best could; whereupon some sent their families to Egina, some to Salamis, but the greater number to Troezen.",
        "source": "Herodotus, The Histories, Book VIII.41, trans. George Rawlinson; Wikisource",
        "href": "https://en.wikisource.org/wiki/The_History_of_Herodotus_(Rawlinson)/Book_8"
      },
      {
        "category": "literary",
        "title": "The crossing of the Red Sea, Exodus 14 (King James Version, 1611)",
        "excerpt": "And the children of Israel went into the midst of the sea upon the dry ground: and the waters were a wall unto them on their right hand, and on their left. ... And the waters returned, and covered the chariots, and the horsemen, and all the host of Pharaoh that came into the sea after them; there remained not so much as one of them.",
        "source": "The Book of Exodus 14:22, 28, King James Bible; Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Exodus"
      },
      {
        "category": "literary",
        "title": "Inferno, Canto III — the multitude of the dead (c. 1320)",
        "excerpt": "And after it there came so long a train / Of people, that I ne’er would have believed / That ever Death so many had undone.",
        "source": "Dante Alighieri, The Divine Comedy: Inferno, Canto III, trans. Henry Wadsworth Longfellow; Project Gutenberg (ebook 1001)",
        "href": "https://www.gutenberg.org/cache/epub/1001/pg1001.txt"
      },
      {
        "category": "artistic",
        "title": "The Raft of the Medusa — Théodore Géricault (1818–1819)",
        "excerpt": "Géricault built his vast canvas from the true horror of the frigate Méduse, wrecked off West Africa in 1816, whose castaways were abandoned on a makeshift raft where scores died of thirst, despair, and drowning. A pyramid of tangled, dying bodies strains toward a barely visible sail on the horizon, hope and death heaped together on the same heaving sea. It turned the shipwreck of desperate people into the defining image of an age.",
        "source": "Théodore Géricault, Le Radeau de la Méduse, oil on canvas, 1818–19, Musée du Louvre, Paris (INV 4884); Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:JEAN_LOUIS_TH%C3%89ODORE_G%C3%89RICAULT_-_La_Balsa_de_la_Medusa_(Museo_del_Louvre,_1818-19).jpg",
        "image": {
          "src": "/covers/ceuta-morocco-mass-crossing-barrier--a4.png",
          "alt": "A crowded makeshift raft on a stormy sea, a pyramid of dying and dead figures straining toward a tiny sail on the distant horizon.",
          "credit": "Théodore Géricault, The Raft of the Medusa (1818–19), Musée du Louvre. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "The Slave Ship — J. M. W. Turner (1840)",
        "excerpt": "Turner set a burning red-gold sunset over a sea into which slavers have flung the drowning and the dead, chained limbs and grasping hands still breaking the surface as a typhoon gathers. The water itself seems to blaze and bleed, an indictment of a commerce that treated human beings as cargo to be jettisoned. It endures as one of art's fiercest images of bodies abandoned to the sea.",
        "source": "J. M. W. Turner, Slavers Throwing overboard the Dead and Dying — Typhoon coming on, oil on canvas, 1840, Museum of Fine Arts, Boston; Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Slave-ship.jpg",
        "image": {
          "src": "/covers/ceuta-morocco-mass-crossing-barrier--a5.png",
          "alt": "A ship on a turbulent, fiery-hued sea at sunset, with human limbs and manacled hands visible amid the waves in the foreground.",
          "credit": "J. M. W. Turner, The Slave Ship (1840), Museum of Fine Arts, Boston. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 17
  },
  {
    "slug": "turkey-iraq-kirkuk-ceyhan-pipeline-deal",
    "headline": "Turkey and Iraq sign a one-year agreement to resume crude shipments through the Kirkuk-Ceyhan oil pipeline as the Strait of Hormuz stays closed",
    "overview": "Turkey and Iraq signed a one-year deal to restart crude oil exports through the Kirkuk-Ceyhan pipeline, which runs from northern Iraq to Turkey's Mediterranean coast, aiming to raise Iraqi shipments while the Strait of Hormuz remains shut amid Middle East tensions. The pipeline had been largely offline during a long-running payments and arbitration dispute; officials said the accord would allow flows to restart.",
    "genre": "Economy",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMimgFBVV95cUxOYmZiUEx2MGE0dmlwQkd1WExZYnZjLWtiZEIyS09HNl9Ia3N4QkY3Q2tJZE56OUpHakstaTlOMFNicE82MTZiRkh5OWVFd05mM05odnR0OWg0WEJFTmZ5ZnlwQlFPWmROVzhWTHpCdmRlVDJ2UzVaWXl6ZXNjV0w5clR3U3p1RE82ZkhBT3BPQi00M3gxUGsyMmJR?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMitAFBVV95cUxQb2NQd2hqRlhYZnpFNWd2YmVNQzJqLWJiWlFCdjBoWTEwMnpjMGdGSHladmlfMzRCUnRrTlNYNUVZa0RFN2paaVNDMlNGTWtQaGx6RU9RN3A4TDMtVlpkc3VtNnJUTkNIaDU4YWx2SFF5ZTFUYXNWd3VRX3pLSGJ2ZHFXLUlheHo1OEplenItMkkwQVVheVE4cDJibVhZdHJSUHFfSkY1Z1g3dkE4LXA2VUFkY0M?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-01",
    "image": {
      "src": "/covers/turkey-iraq-kirkuk-ceyhan-pipeline-deal.png",
      "alt": "A steel oil pipeline running across arid terrain toward a distant terminal",
      "credit": "Oil pipelines crossing desert terrain. Wikimedia Commons (CC BY 3.0)."
    },
    "edition": "Evening Edition · 1 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Darius the Great's Suez Canal Inscription (DZc, the Chalouf Stele), c. 500 BCE",
        "excerpt": "King Darius says: I am a Persian; setting out from Persia, I conquered Egypt. I ordered to dig this canal from the river that is called Nile and flows in Egypt, to the sea that begins in Persia. Therefore, when this canal had been dug as I had ordered, ships went from Egypt through this canal to Persia, as I had intended.",
        "source": "Achaemenid royal inscription DZc (the Chalouf Stele), Old Persian/Elamite/Babylonian/Egyptian, discovered near Kabret, Egypt; English translation via Livius.org",
        "href": "https://www.livius.org/sources/content/achaemenid-royal-inscriptions/dz/"
      },
      {
        "category": "historical",
        "title": "Convention respecting the Free Navigation of the Suez Maritime Canal (Constantinople, 29 October 1888), Article I",
        "excerpt": "The Suez Maritime Canal shall always be free and open, in time of war as in time of peace, to every vessel of commerce or of war, without distinction of flag. Consequently, the High Contracting Parties agree not in any way to interfere with the free use of the Canal, in time of war as in time of peace. The Canal shall never be subjected to the exercise of the right of blockade.",
        "source": "Constantinople Convention of the Suez Canal, Article I, in Wikisource (public domain treaty text)",
        "href": "https://en.wikisource.org/wiki/Constantinople_Convention_of_the_Suez_Canal"
      },
      {
        "category": "literary",
        "title": "Homer, Odyssey, Book 12 — Circe warns of the strait of Scylla and Charybdis (8th c. BCE); trans. A. T. Murray, 1919",
        "excerpt": "But the other cliff, thou wilt note, Odysseus, is lower—they are close to each other; thou couldst even shoot an arrow across—and on it is a great fig tree with rich foliage, but beneath this divine Charybdis sucks down the black water. Thrice a day she belches it forth, and thrice she sucks it down terribly.",
        "source": "Homer, The Odyssey, Book 12, translated by A. T. Murray (Loeb Classical Library, 1919), Perseus Digital Library, Tufts University",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0136%3Abook%3D12%3Acard%3D73"
      },
      {
        "category": "literary",
        "title": "The Book of Ezekiel 27:3–4, 25 — the lament over Tyre, merchant of the seas (King James Version, 1611)",
        "excerpt": "And say unto Tyrus, O thou that art situate at the entry of the sea, which art a merchant of the people for many isles, Thus saith the Lord GOD; O Tyrus, thou hast said, I am of perfect beauty. Thy borders are in the midst of the seas, thy builders have perfected thy beauty. ... The ships of Tarshish did sing of thee in thy market: and thou wast replenished, and made very glorious in the midst of the seas.",
        "source": "Ezekiel 27:3–4, 25, King James Version of the Bible (public domain), via Biblehub",
        "href": "https://biblehub.com/kjv/ezekiel/27.htm"
      },
      {
        "category": "artistic",
        "title": "Claude Lorrain, Seaport with the Embarkation of the Queen of Sheba, 1648 (National Gallery, London, NG14)",
        "excerpt": "A great classical harbour glows at dawn, its palaces, quaysides and moored ships rimmed in the low gold of a rising sun as the Queen of Sheba's retinue boards launches at the water's edge. Claude Lorrain turns a working port into the very image of trade's promise, ordering vessels and open sea around a single luminous channel out toward the horizon. Here commerce is rendered as radiance — the artery of the sea gathering the wealth of nations and carrying it on to distant shores.",
        "source": "Claude Lorrain (Claude Gellée), oil on canvas, 149.1 × 196.7 cm, 1648, The National Gallery, London (NG14); reproduction via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Claude_Lorrain_008.jpg",
        "image": {
          "src": "/covers/turkey-iraq-kirkuk-ceyhan-pipeline-deal--a4.png",
          "alt": "Sunlit classical seaport at dawn, with palaces, moored sailing ships, and figures embarking onto boats at the water's edge",
          "credit": "Claude Lorrain, Seaport with the Embarkation of the Queen of Sheba (1648), National Gallery, London. Public domain, via Wikimedia Commons (The Yorck Project)."
        }
      },
      {
        "category": "artistic",
        "title": "Nikolai Rimsky-Korsakov, Scheherazade, Op. 35 (1888)",
        "excerpt": "Rimsky-Korsakov's symphonic suite opens with 'The Sea and Sinbad's Ship,' a swelling, undulating theme that rolls like ocean swell beneath a solo violin standing in for the storyteller Scheherazade. Across four movements it conjures the whole imagined East of The Arabian Nights—merchant voyages, shipwreck, treasure and bazaars—the romance of trade and travel between empires. It is the perfect musical emblem for great powers bargaining over the sea-lanes and pipelines that carry the riches of the East.",
        "source": "Nikolai Rimsky-Korsakov, Scheherazade (Шехеразада), symphonic suite, Op. 35, 1888; work page at the Petrucci Music Library (IMSLP)",
        "href": "https://imslp.org/wiki/Scheherazade,_Op.35_(Rimsky-Korsakov,_Nikolay)",
        "image": {
          "src": "/covers/turkey-iraq-kirkuk-ceyhan-pipeline-deal--a5.png",
          "alt": "A color illustration of Sinbad the Sailor clinging to the leg of a giant roc bird as it carries him aloft over dark mist-wreathed cliffs.",
          "credit": "Edmund Dulac, illustration to Sinbad the Sailor & Other Stories from the Arabian Nights (Hodder & Stoughton, 1914). Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 18
  },
  {
    "slug": "hungary-paks-nuclear-danube-drought",
    "headline": "Hungary says its Paks nuclear plant, source of much of the country's electricity, may power down this weekend as drought pushes the Danube to record lows",
    "overview": "Hungarian Prime Minister Viktor Orban said the Paks nuclear power plant, which supplies a large share of Hungary's electricity, could be fully powered down this weekend because the Danube River, whose water cools the reactors, has fallen to record-low levels amid a severe Central European drought and heat. The shrunken Danube is also disrupting shipping, tourism and industry across the region.",
    "genre": "Climate",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMisAFBVV95cUxNYWtqLVNjSzJRUXMtTHZSQkQ4UXJtd2VkdlpHTHNXaDhhV3h4TkR2MTkwX0FpcldoYUtwVThOQXYxV0VmZERSOHk2bm04MkV2U2YyejJDMWQ1Y2dyQzZEcFRNYTNjQ1phRlU2M2lXMkNPWXY5TXYtdEFDaWNmUldFOVV0Vi0wWHFsZkZrcl9xS1F0VEJnd2NnNEY2UTRKNHZ2SEtrRk9ScUdpS0VGc3h1VA?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMivwFBVV95cUxPeWpyZFpUY19WRVp3aFN1ZURWa3hNTU55WnltbHBodng0WlhUekcyX1BEcWJZc0sxOGdTaXdrUDBVaG9uV192bXFveWVWUjdLeUhVeEFZWi1RekN4eEZkV1gzb3ZPdV80MGV4a1dWVXRyRFFiS1N4VHBZZWgzQ2NmVkNRVHhEM0E1SGhGcXBib0hCZU1nT3ppWnhFbk1xMXRMMFBGUjl3SmVjNEFXU1kxX3pkX0g5cWFFUjBablUwWQ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-01",
    "image": {
      "src": "/covers/hungary-paks-nuclear-danube-drought.png",
      "alt": "A satellite view of the shrunken Danube winding through Hungary, pale exposed sandbanks lining the narrowed river",
      "credit": "Low water on the Danube in Hungary, July 2025, Copernicus Sentinel imagery. Wikimedia Commons."
    },
    "edition": "Evening Edition · 1 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Famine Stela of Sehel Island (Ptolemaic inscription recalling a legendary seven-year Nile failure under King Djoser, c. 3rd-2nd century BCE)",
        "excerpt": "Carved on a granite boulder above the Nile's first cataract, the stela speaks in the voice of a grieving king who mourns that Hapy, the life-giving inundation, had failed to arrive in season for seven long years. Grain grew scant and kernels dried up; every kind of food ran short, so that neighbor robbed neighbor, children cried, the young collapsed, and the hearts of the old bowed down in grief. Only when the pharaoh turns to the sage Imhotep to learn where the flood-god dwells does he hope to coax the withholding river back to its bounty.",
        "source": "Famine Stela, granite boulder on Sehel Island above the First Cataract of the Nile, Aswan; English translation by Miriam Lichtheim, Ancient Egyptian Literature, vol. 3 (University of California Press, 1980), pp. 95f., hosted at Attalus.org",
        "href": "https://www.attalus.org/egypt/famine_stele.html"
      },
      {
        "category": "historical",
        "title": "The Hunger Stones of the Elbe (drought-year boundary markers, the Decin stone bearing carvings from 1616 onward)",
        "excerpt": "\"Wenn du mich siehst, dann weine\" - \"If you see me, weep.\" The warning was chiseled into a rock in the bed of the Elbe that surfaces only when the great Central European river sinks to famine-threatening lows; the Decin stone is scored with drought years reaching back to 1616, and older marks from 1417 and 1473 that the current has since worn smooth. Each time the water fell far enough to read the words, they promised the same thing to come: dead crops, hunger, and hardship.",
        "source": "Inscription on the 'hunger stone' (Hungerstein) in the Elbe at Decin, Czech Republic, a low-water marker exposed only in severe drought; documented in Wikipedia, 'Hunger stone'",
        "href": "https://en.wikipedia.org/wiki/Hunger_stone"
      },
      {
        "category": "literary",
        "title": "Ovid, Metamorphoses, Book II: Phaethon sets the world afire and the rivers run dry (c. 8 CE)",
        "excerpt": "\"Orontes and the Ganges, swift Thermodon, Ister and Phasis and Alpheus boil.\" ... \"The Nile affrighted fled to parts remote, and hid his head forever from the world: now empty are his seven mouths, and dry without or wave or stream.\" (Ister is the ancient name for the Danube.)",
        "source": "Ovid, Metamorphoses 2, translated by Brookes More (Boston: Cornhill Publishing Co., 1922); Perseus Digital Library, Tufts University",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0028:book=2:card=227"
      },
      {
        "category": "literary",
        "title": "T. S. Eliot, The Waste Land, V: 'What the Thunder Said' (1922)",
        "excerpt": "\"Here is no water but only rock\nRock and no water and the sandy road\nThe road winding above among the mountains\nWhich are mountains of rock without water\nIf there were water we should stop and drink\nAmongst the rock one cannot stop or think\nSweat is dry and feet are in the sand\nIf there were only water amongst the rock\nDead mountain mouth of carious teeth that cannot spit\nHere one can neither stand nor lie nor sit\nThere is not even silence in the mountains\nBut dry sterile thunder without rain\"",
        "source": "T. S. Eliot, The Waste Land (1922); Project Gutenberg EBook #1321",
        "href": "https://www.gutenberg.org/files/1321/1321-0.txt"
      },
      {
        "category": "artistic",
        "title": "Albrecht Altdorfer, Danube Landscape with Worth Castle (Donaulandschaft mit Schloss Worth), c. 1528-1530",
        "excerpt": "One of the first pure landscapes in Western art, Altdorfer's tiny, luminous panel makes the Danube valley itself the sole protagonist, with no saints or heroes to compete with it. A winding road threads down through feathery woods toward Worth Castle, past a full, glinting river and away to blue-hazed mountains under a wide bright sky. It is a portrait of the Danube as pure lifegiver - the wooded, watered artery of Central Europe - and so a quiet measure of everything a record-low, power-throttling drought now strips away.",
        "source": "Albrecht Altdorfer, Donaulandschaft mit Schloss Worth, color on vellum mounted on beech wood, 30.5 x 22.2 cm, Alte Pinakothek, Munich (inv. W.A.F. 30); Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Landscape_of_Danube_near_Regensburg,_Albrecht_Altdorfer,_W.A.F._30,_Alte_Pinakothek_Munich.jpg",
        "image": {
          "src": "/covers/hungary-paks-nuclear-danube-drought--a4.png",
          "alt": "A small, luminous Renaissance landscape looking down the wooded Danube valley toward Worth Castle, a winding road and a full river leading the eye to distant blue mountains under a bright sky.",
          "credit": "Albrecht Altdorfer, Danube Landscape with Worth Castle, c. 1528-30, Alte Pinakothek, Munich. Public domain (CC0); photograph by Jebulon via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Bedrich Smetana, 'Vltava' (The Moldau), second symphonic poem of Ma vlast (1874)",
        "excerpt": "Smetana's most famous tone poem traces a river from its birth: two trickling springs in the flutes braid together, swell into the great sweeping melody of the main current, and carry the listener past forest hunts, a village wedding, moonlit water-nymphs, and the roaring St. John's Rapids before flowing broad and triumphant through Prague. The whole piece is music made of moving water, a nation's identity poured into a living stream. Against a summer that has dropped the real rivers of Central Europe to record lows, the score sounds almost like an elegy for the very idea of a mighty, inexhaustible river.",
        "source": "Bedrich Smetana, Vltava (No. 2 of Ma vlast, JB 1:112), composed 1874; score at IMSLP / Petrucci Music Library; autograph manuscript held by the Bedrich Smetana Museum, Prague, via Wikimedia Commons",
        "href": "https://imslp.org/wiki/M%C3%A1_Vlast,_JB_1:112_(Smetana,_Bed%C5%99ich)",
        "image": {
          "src": "/covers/hungary-paks-nuclear-danube-drought--a5.png",
          "alt": "Title page of Bedrich Smetana's handwritten autograph manuscript of the symphonic poem Vltava (The Moldau).",
          "credit": "Bedrich Smetana, autograph manuscript of Vltava, 1874, Bedrich Smetana Museum, Prague. Public domain; faithful photographic reproduction via Wikimedia Commons."
        }
      }
    ],
    "rank": 19
  },
  {
    "slug": "michigan-court-enbridge-line5-permit",
    "headline": "Michigan's Supreme Court rejects a state permit for Enbridge's planned Line 5 oil tunnel under the Straits of Mackinac, ordering regulators to reconsider the environmental risks",
    "overview": "In a 6-1 decision, the Michigan Supreme Court ordered state regulators to reconsider a permit for Canadian company Enbridge to encase its 73-year-old Line 5 oil pipeline in a tunnel beneath the Straits of Mackinac, where Lakes Huron and Michigan meet. The court said the Public Service Commission failed to weigh whether the tunnel would prolong the pipeline's life and increase environmental harm, clouding the future of a project opposed by four tribal nations and environmental groups.",
    "genre": "Climate",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMiogFBVV95cUxPaWRtajJreDVJMGhOOThIQlk5NUN1Uk9hUzBzSWQ3UE0zck5kbG9EZ0g0OXhZRUNsVGZfRlgzM3BLZzRFenl5LWJfQ0paYkJhcFpBYzRFQTgwcE1Kck51bEVZd0pJbGZ4LWZkS202bGt2OC1mbTdBeHVhU3ZQM0MwZWVGSExDRHR6OFUxTmJjNHRiUWxDbHdhLTRzdWZfdC1uU3c?oc=5"
      },
      {
        "name": "Bangor Daily News",
        "href": "https://www.bangordailynews.com/2026/08/01/nation/michigan-supreme-court-rejects-permit-for-enbridge-oil-pipeline-under-great-lakes/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-01",
    "image": {
      "src": "/covers/michigan-court-enbridge-line5-permit.png",
      "alt": "The Mackinac Bridge spanning the Straits of Mackinac at sunset",
      "credit": "The Mackinac Bridge over the Straits of Mackinac at sunset. Public domain via Wikimedia Commons."
    },
    "edition": "Evening Edition · 1 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Institutes of Justinian, Book II, Title I — 'Of the Different Kinds of Things' (Byzantine Roman law, promulgated 533 CE)",
        "excerpt": "Thus, the following things are by natural law common to all – the air, running water, the sea, and consequently the sea-shore. No one therefore is forbidden access to the sea-shore, provided he abstains from injury to houses, monuments, and buildings generally; for these are not, like the sea itself, subject to the law of nations.",
        "source": "The Institutes of Justinian, Book II, Title I, secs. 1–2, trans. J. B. Moyle; Roman Law Library (droitromain), Université Grenoble Alpes",
        "href": "https://droitromain.univ-grenoble-alpes.fr/Anglica/just2_Moyle.htm"
      },
      {
        "category": "historical",
        "title": "John Muir's fight for Hetch Hetchy, from 'The Yosemite' (1912), on the eve of the valley's damming",
        "excerpt": "These temple destroyers, devotees of ravaging commercialism, seem to have a perfect contempt for Nature, and, instead of lifting their eyes to the God of the mountains, lift them to the Almighty Dollar. Dam Hetch Hetchy! As well dam for water-tanks the people’s cathedrals and churches, for no holier temple has ever been consecrated by the heart of man.",
        "source": "John Muir, The Yosemite (New York: The Century Co., 1912), ch. 16, 'Hetch Hetchy Valley,' closing lines; Project Gutenberg eBook #7091",
        "href": "https://www.gutenberg.org/files/7091/7091-h/7091-h.htm"
      },
      {
        "category": "literary",
        "title": "Henrik Ibsen, 'An Enemy of the People,' Act I — Dr. Stockmann finds the town's Baths poisoned (1882)",
        "excerpt": "The whole Bath establishment is a whited, poisoned sepulchre, I tell you—the gravest possible danger to the public health! All the nastiness up at Molledal, all that stinking filth, is infecting the water in the conduit-pipes leading to the reservoir; and the same cursed, filthy poison oozes out on the shore too—",
        "source": "Henrik Ibsen, An Enemy of the People, Act I, trans. R. Farquharson Sharp; Project Gutenberg eBook #2446",
        "href": "https://www.gutenberg.org/files/2446/2446-h/2446-h.htm"
      },
      {
        "category": "literary",
        "title": "Henry Wadsworth Longfellow, 'The Song of Hiawatha,' III — 'Hiawatha's Childhood' by the shores of Gitche Gumee (1855)",
        "excerpt": "By the shores of Gitche Gumee,\nBy the shining Big-Sea-Water,\nStood the wigwam of Nokomis,\nDaughter of the Moon, Nokomis.\nDark behind it rose the forest,\nRose the black and gloomy pine-trees,\nRose the firs with cones upon them;\nBright before it beat the water,\nBeat the clear and sunny water,\nBeat the shining Big-Sea-Water.",
        "source": "Henry Wadsworth Longfellow, The Song of Hiawatha (Boston: Ticknor and Fields, 1855), Part III, 'Hiawatha's Childhood'; Project Gutenberg eBook #19",
        "href": "https://www.gutenberg.org/files/19/19-h/19-h.htm"
      },
      {
        "category": "artistic",
        "title": "Thomas Cole, 'View from Mount Holyoke, Northampton, Massachusetts, after a Thunderstorm — The Oxbow' (1836)",
        "excerpt": "Cole splits his canvas down the middle: on the left, a storm-lashed wilderness of shattered trees; on the right, the sunlit Connecticut River curling in its great oxbow past tamed and settled fields. It is the founding image of the Hudson River School, a meditation on the fragile boundary between untouched creation and the advancing hand of commerce. The pristine river at the center becomes the very thing at stake — a source of life poised between reverence and exploitation.",
        "source": "Thomas Cole, The Oxbow, 1836, oil on canvas, The Metropolitan Museum of Art, New York; via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Cole_Thomas_The_Oxbow_(The_Connecticut_River_near_Northampton_1836).jpg",
        "image": {
          "src": "/covers/michigan-court-enbridge-line5-permit--a4.png",
          "alt": "Panoramic landscape split between a dark stormy wilderness on the left and a sunlit river valley curving in a great oxbow bend on the right",
          "credit": "Thomas Cole, The Oxbow (1836), oil on canvas. The Metropolitan Museum of Art, New York (public domain). Via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Frederic Edwin Church, Niagara (1857)",
        "excerpt": "Church places the viewer out on the very brink, the green flood of the Niagara sliding past our feet toward a thundering drop, spray rising into a bruised sky where a faint rainbow arcs. The great cataract is rendered as a living force—vast, unstoppable, and luminous—the emblem of North America's continental waters at their most sublime. It is precisely the sanctity and power of such waters that a pipeline threatens, and that a court is asked to weigh.",
        "source": "Frederic Edwin Church, Niagara, oil on canvas, 1857, National Gallery of Art, Washington, D.C. (Corcoran Collection); via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Frederic_Edwin_Church,_Niagara,_1857,_NGA_166436.jpg",
        "image": {
          "src": "/covers/michigan-court-enbridge-line5-permit--a5.png",
          "alt": "A sweeping panorama of Niagara Falls seen from the brink, with a broad sheet of green-and-white water plunging over the edge, mist rising, and a faint rainbow beneath a stormy sky.",
          "credit": "Frederic Edwin Church, Niagara (1857), National Gallery of Art, Washington, D.C. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 20
  },
  {
    "slug": "amazon-zoox-driverless-robotaxi-approval",
    "headline": "Amazon's Zoox becomes the first company cleared by U.S. regulators to charge for rides in a purpose-built robotaxi with no steering wheel or pedals",
    "overview": "Amazon's self-driving unit Zoox won an exemption from the U.S. National Highway Traffic Safety Administration that makes it the first company allowed to charge passengers for rides in a vehicle built without a steering wheel, pedals or driver's seat. Zoox said it would begin paid service in Las Vegas before expanding to other cities; the exemption permits up to 2,500 vehicles a year for two years and requires U.S.-based remote operators and public crash reporting.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMitgFBVV95cUxNWnc0dGM0Q3ViQk5QbzEtVXRJeFhHSG5rMGlGQXk1TC1sT3lIRHVjRVpPbUdTdDRkOHVTNk94dnV3RF80TlA1M0xnZHZZcXRwenlhaVBtTlJqcm1fVlpOS1Etb3c2TmZtNXhHZmozZDZPNWp5NHgxazUtQkxieXg5WmIxLUFKRWlsWDVyN2txWlBYOHZXMlVISHhZYlhvRVZIU25KY3E5dlZBLUJYRnRRY0ROX2Ztdw?oc=5"
      },
      {
        "name": "NBC News",
        "href": "https://www.nbcnews.com/tech/tech-news/amazons-zoox-wins-first-us-approval-paid-robotaxis-human-controls-rcna590106"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-01",
    "image": {
      "src": "/covers/amazon-zoox-driverless-robotaxi-approval.png",
      "alt": "A boxy, symmetrical self-driving robotaxi pod with no visible steering wheel on a city street",
      "credit": "A Zoox purpose-built robotaxi, San Francisco, 2025. Wikimedia Commons (CC BY 4.0)."
    },
    "edition": "Evening Edition · 1 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Politics, Book I (c. 350 BCE)",
        "excerpt": "if every instrument could accomplish its own work, obeying or anticipating the will of others, like the statues of Daedalus, or the tripods of Hephaestus, which, says the poet, 'of their own accord entered the assembly of the Gods'; if, in like manner, the shuttle would weave and the plectrum touch the lyre without a hand to guide them, chief workmen would not want servants, nor masters slaves.",
        "source": "Aristotle, Politics, Book I, §4 (trans. Benjamin Jowett) — Wikisource",
        "href": "https://en.wikisource.org/wiki/Politics_(Jowett)/Book_1"
      },
      {
        "category": "historical",
        "title": "Maelzel's Chess-Player (1836)",
        "excerpt": "Perhaps no exhibition of the kind has ever elicited so general attention as the Chess-Player of Maelzel. Wherever seen it has been an object of intense curiosity, to all persons who think. Yet the question of its modus operandi is still undetermined. ... A figure is seen habited as a Turk, and seated, with its legs crossed, at a large box apparently of maple wood, which serves it as a table.",
        "source": "Edgar Allan Poe, \"Maelzel's Chess-Player,\" Southern Literary Messenger (April 1836) — Wikisource",
        "href": "https://en.wikisource.org/wiki/Maelzel%27s_Chess-Player"
      },
      {
        "category": "literary",
        "title": "The Iliad, Book XVIII (c. 8th century BCE)",
        "excerpt": "for he was fashioning tripods, twenty in all, to stand around the wall of his well-builded hall, and golden wheels had he set beneath the base of each that of themselves they might enter the gathering of the gods at his wish and again return to his house ... there moved swiftly to support their lord handmaidens wrought of gold in the semblance of living maids. In them is understanding in their hearts, and in them speech and strength, and they know cunning handiwork by gift of the immortal gods.",
        "source": "Homer, Iliad, Book XVIII, ll. 369–422 (trans. A. T. Murray, Loeb Classical Library, 1924) — Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0134:book=18:card=368"
      },
      {
        "category": "literary",
        "title": "R.U.R. (Rossum's Universal Robots) (1920)",
        "excerpt": "Young Rossum invented a worker with the minimum amount of requirements. He had to simplify him. He rejected everything that did not contribute directly to the progress of work.",
        "source": "Karel Čapek, R.U.R. (Rossum's Universal Robots), Act I (1920; trans. Paul Selver, 1923) — Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/59112/pg59112.txt"
      },
      {
        "category": "artistic",
        "title": "The Fall of Phaeton (c. 1604–1608)",
        "excerpt": "Rubens paints the instant the sun-chariot runs wild: Phaethon, the mortal who begged to drive his father Helios's blazing team, is hurled backward as the horses bolt across the heavens beyond any hand's control. Overturning wheels and writhing bodies tumble through a bruised, lightning-torn sky while the winged Hours scatter in panic and the order of the cosmos itself is thrown into chaos. It is the ancient nightmare of the self-moving vehicle that will not obey — motion loosed from the governing hand.",
        "source": "Peter Paul Rubens, The Fall of Phaeton, oil on canvas — National Gallery of Art, Washington, D.C. (via Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Peter_Paul_Rubens_-_The_Fall_of_Phaeton_(National_Gallery_of_Art).jpg",
        "image": {
          "src": "/covers/amazon-zoox-driverless-robotaxi-approval--a4.png",
          "alt": "Peter Paul Rubens's The Fall of Phaeton: the sun-chariot's horses rear and bolt in panic across a stormy sky as Phaethon is flung from the runaway car amid tumbling figures.",
          "credit": "Peter Paul Rubens, The Fall of Phaeton (c. 1604–1608), National Gallery of Art, Washington, D.C. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Coppélia, ou La fille aux yeux d'émail (1870)",
        "excerpt": "Delibes's 1870 ballet turns on Coppélia, a life-sized clockwork doll with enamel eyes so lifelike that the young hero falls in love with her, mistaking mechanism for a living girl. The score's brittle wind-up mazurkas and the doll's stiff, jerking waltz animate both the wonder and the unease of a machine that mimics human motion. Behind the comedy lies the old dread: the automaton that passes for one of us, moving and dancing as though it were alive.",
        "source": "Léo Delibes, Coppélia, ou La fille aux yeux d'émail, ballet (premiered 25 May 1870, Théâtre Impérial de l'Opéra, Paris) — International Music Score Library Project (IMSLP)",
        "href": "https://imslp.org/wiki/Copp%C3%A9lia_(Delibes,_L%C3%A9o)",
        "image": {
          "src": "/covers/amazon-zoox-driverless-robotaxi-approval--a5.png",
          "alt": "Photograph of ballerina Giuseppina Bozzacchi costumed as Swanilda in the 1870 Paris premiere of Delibes's automaton ballet Coppélia.",
          "credit": "Unknown Opéra studio photographer, Giuseppina Bozzacchi as Swanilda in Coppélia, Paris, 1870. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 21
  },
  {
    "slug": "dr-congo-ebola-largest-outbreak",
    "headline": "The WHO says Democratic Republic of Congo's Bundibugyo Ebola outbreak, with more than 3,500 cases, is the country's largest ever and the world's second largest",
    "overview": "The World Health Organization said the Ebola outbreak in the Democratic Republic of Congo has become the country's biggest on record and the second largest recorded anywhere, with confirmed cases surpassing 3,500 and more than 500 deaths. Caused by the Bundibugyo strain, for which there is no approved vaccine or treatment, the epidemic was declared a public health emergency of international concern in May and has spread faster than any previous Ebola outbreak.",
    "genre": "Science",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cy07qe0knvzo"
      },
      {
        "name": "Al Jazeera",
        "href": "https://www.aljazeera.com/news/2026/7/31/dr-congo-ebola-epidemic-becomes-worlds-second-largest-outbreak"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-01",
    "image": {
      "src": "/covers/dr-congo-ebola-largest-outbreak.png",
      "alt": "A health worker in full personal protective equipment and face shield at a treatment centre",
      "credit": "Frontline healthcare workers in protective equipment. Wikimedia Commons (CC BY 2.0)."
    },
    "edition": "Evening Edition · 1 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Plague of Athens (430 BC)",
        "excerpt": "It first began, it is said, in the parts of Ethiopia above Egypt, and thence descended into Egypt and Libya and into most of the King's country. Suddenly falling upon Athens, it first attacked the population in Piraeus... Neither were the physicians at first of any service, ignorant as they were of the proper way to treat it, but they died themselves the most thickly, as they visited the sick most often; nor did any human art succeed any better.",
        "source": "Thucydides, History of the Peloponnesian War, Book II (Crawley translation), The Internet Classics Archive, MIT",
        "href": "http://classics.mit.edu/Thucydides/pelopwar.2.second.html"
      },
      {
        "category": "historical",
        "title": "The Plague of Justinian (542 AD)",
        "excerpt": "For it did not come in a part of the world nor upon certain men, nor did it confine itself to any season of the year, so that from such circumstances it might be possible to find subtle explanations of a cause, but it embraced the entire world, and blighted the lives of all men, though differing from one another in the most marked degree, respecting neither sex nor age. And the tale of dead reached five thousand each day, and again it even came to ten thousand and still more than that.",
        "source": "Procopius, History of the Wars, Book II, trans. H. B. Dewing (Loeb, 1914), modernized by J. S. Arkenberg; Internet Medieval Sourcebook, Fordham University",
        "href": "https://sourcebooks.fordham.edu/source/542procopius-plague.asp"
      },
      {
        "category": "literary",
        "title": "The Decameron, Introduction (c. 1353)",
        "excerpt": "I say, then, that the years [of the era] of the fruitful Incarnation of the Son of God had attained to the number of one thousand three hundred and forty-eight, when into the notable city of Florence, fair over every other of Italy, there came the death-dealing pestilence... in men and women alike there appeared, at the beginning of the malady, certain swellings, either on the groin or under the armpits, whereof some waxed of the bigness of a common apple, others like unto an egg, some more and some less, and these the vulgar named plague-boils.",
        "source": "Giovanni Boccaccio, The Decameron, trans. John Payne; Project Gutenberg eBook",
        "href": "https://www.gutenberg.org/files/23700/23700-h/23700-h.htm"
      },
      {
        "category": "literary",
        "title": "A Journal of the Plague Year (1722)",
        "excerpt": "The shrieks of women and children at the windows and doors of their houses, where their dearest relations were perhaps dying, or just dead, were so frequent to be heard as we passed the streets, that it was enough to pierce the stoutest heart in the world to hear them. Tears and lamentations were seen almost in every house, especially in the first part of the visitation; for towards the latter end men's hearts were hardened, and death was so always before their eyes, that they did not so much concern themselves for the loss of their friends, expecting that themselves should be summoned the next hour.",
        "source": "Daniel Defoe, A Journal of the Plague Year; Project Gutenberg eBook #376",
        "href": "https://www.gutenberg.org/files/376/376-h/376-h.htm"
      },
      {
        "category": "artistic",
        "title": "The Triumph of Death (c. 1562)",
        "excerpt": "Across a scorched, smoke-blackened landscape, armies of skeletons drive the living toward death without mercy, sparing neither peasant nor king, mother nor child. Bruegel turns the medieval memory of the Black Death into an all-consuming panorama in which no barricade, prayer, or rank can hold back the advancing dead. It is the plague not as a single event but as a universal reckoning that levels every human distinction.",
        "source": "Pieter Bruegel the Elder, oil on panel, Museo del Prado, Madrid (P01393); via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:The_Triumph_of_Death_by_Pieter_Bruegel_the_Elder.jpg",
        "image": {
          "src": "/covers/dr-congo-ebola-largest-outbreak--a4.png",
          "alt": "Bruegel's panorama of skeleton armies driving the living toward death across a blackened, ruined landscape",
          "credit": "Pieter Bruegel the Elder, The Triumph of Death (c. 1562), Museo del Prado; public domain via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "The Plague / Die Pest (1898)",
        "excerpt": "Death rides a monstrous bat-winged creature low through the narrow street of a medieval town, scythe swinging, as bodies fall in its wake. Böcklin renders the whole scene in sickly, corpse-pale greens, giving invisible contagion a terrifying visible form. The painting captures the modern dread of an unseen killer sweeping through a defenseless community, an image as resonant for Ebola as for the Black Death that inspired it.",
        "source": "Arnold Böcklin, tempera on fir wood, Kunstmuseum Basel (inv. 114); via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Arnold_B%C3%B6cklin_-_Die_Pest.jpg",
        "image": {
          "src": "/covers/dr-congo-ebola-largest-outbreak--a5.png",
          "alt": "A skeletal figure of Death astride a bat-winged beast sweeping a scythe through a pale-green medieval street strewn with the dead",
          "credit": "Arnold Böcklin, Die Pest (The Plague), 1898, Kunstmuseum Basel; public domain via Wikimedia Commons"
        }
      }
    ],
    "rank": 22
  },
  {
    "slug": "total-solar-eclipse-europe-august-2026",
    "headline": "A total solar eclipse on 12 August will cross Greenland, Iceland and northern Spain, the first over mainland Europe since 1999",
    "overview": "Astronomers say a total solar eclipse on 12 August 2026 will sweep from Siberia over the Arctic to eastern Greenland, western Iceland and northern Spain, with up to 2 minutes and 18 seconds of totality. It will be the first total solar eclipse visible from mainland Europe since 1999; the Moon's shadow will trace a roughly 8,000-kilometre path, much of it over the North Atlantic, drawing eclipse-chasers toward Spain and Iceland.",
    "genre": "Science",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMikgFBVV95cUxQMjEzV3E0aFlLOFBzZTY5enhOTW1rRE5YNEtOZlF5V0ktV3JISzdPeldDcU04cnVsbHpsZ3Uyc1dXaFpwZ0hPWVpkaGJ4bllJTjZ6Z2poczFGTkVKRTBNWHlFeFJLSDJuVjR4SEhSd2VlWE5qOVRZS01rbncxREp4VTR5ZUNDYnJLRlFRZ1c5UHVqQQ?oc=5"
      },
      {
        "name": "NASA",
        "href": "https://science.nasa.gov/eclipses/future-eclipses/total-solar-eclipse-on-august-12-2026/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-01",
    "image": {
      "src": "/covers/total-solar-eclipse-europe-august-2026.png",
      "alt": "The Sun's white corona blazing around the black disc of the Moon during a total solar eclipse",
      "credit": "The total solar eclipse of 11 August 1999. Wikimedia Commons (CC BY-SA 3.0)."
    },
    "edition": "Evening Edition · 1 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Herodotus records the eclipse that stopped a war (Battle of the Halys, 585 BC)",
        "excerpt": "They were still warring with equal success, when it chanced, at an encounter which happened during the sixth year, that during the battle the day was suddenly turned to night. Thales of Miletus had foretold this loss of daylight to the Ionians, fixing it within the year in which the change did indeed happen.",
        "source": "Herodotus, The Histories, Book I.74, trans. A. D. Godley; LacusCurtius (Bill Thayer), University of Chicago",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Herodotus/1B*.html"
      },
      {
        "category": "historical",
        "title": "The Anglo-Saxon Chronicle, annal for A.D. 1135 — a midday darkness read as an omen",
        "excerpt": "In this year went the King Henry over sea at the Lammas; and the next day, as he lay asleep on ship, the day darkened over all lands, and the sun was all as it were a three night old moon, and the stars about him at midday. Men were very much astonished and terrified, and said that a great event should come hereafter. So it did; for that same year was the king dead, the next day after St. Andrew's mass-day, in Normandy.",
        "source": "The Anglo-Saxon Chronicle, entry for A.D. 1135, trans. J. A. Giles; Yale Law School, The Avalon Project",
        "href": "https://avalon.law.yale.edu/medieval/ang12.asp"
      },
      {
        "category": "literary",
        "title": "John Milton, Paradise Lost, Book I (1667) — an eclipse that \"perplexes monarchs\"",
        "excerpt": "As when the Sun new ris'n\nLooks through the Horizontal misty Air\nShorn of his Beams, or from behind the Moon\nIn dim Eclips disastrous twilight sheds\nOn half the Nations, and with fear of change\nPerplexes Monarchs.",
        "source": "John Milton, Paradise Lost, Book I, ll. 594–599; The John Milton Reading Room, Dartmouth College",
        "href": "https://milton.host.dartmouth.edu/reading_room/pl/book_1/text.shtml"
      },
      {
        "category": "literary",
        "title": "William Shakespeare, King Lear, Act I, Scene 2 (c. 1606) — Gloucester on eclipses as portents",
        "excerpt": "These late eclipses in the sun and moon portend no good to us: though the wisdom of nature can reason it thus and thus, yet nature finds itself scourged by the sequent effects: love cools, friendship falls off, brothers divide: in cities, mutinies; in countries, discord; in palaces, treason; and the bond cracked 'twixt son and father.",
        "source": "William Shakespeare, King Lear, Act I, Scene 2; The Complete Works of William Shakespeare, MIT (shakespeare.mit.edu)",
        "href": "http://shakespeare.mit.edu/lear/lear.1.2.html"
      },
      {
        "category": "artistic",
        "title": "Antoine Caron, Astronomers Studying an Eclipse (1570s), J. Paul Getty Museum",
        "excerpt": "Antoine Caron's late-Renaissance panel gathers robed scholars around armillary spheres and astrolabes on a marble terrace, every face craning upward to measure a darkened sun. Painted in the era of a real eclipse over France, it fuses dread with the age's new appetite for observation — the heavens treated at once as an omen to be feared and an object to be reasoned about. The sky's sudden gloom becomes, in the crowd's rapt attention, an occasion for wonder rather than panic.",
        "source": "Antoine Caron, \"Astronomers Studying an Eclipse\" (also titled \"Dionysius the Areopagite Converting the Pagan Philosophers\"), oil on panel, 1570s, J. Paul Getty Museum (acc. 85.PB.117); Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Antoine_Caron_Astronomers_Studying_an_Eclipse.jpg",
        "image": {
          "src": "/covers/total-solar-eclipse-europe-august-2026--a4.png",
          "alt": "Renaissance scholars with astronomical instruments gathered on a terrace, gazing up at an eclipsed sun in a dim sky",
          "credit": "Antoine Caron, 'Astronomers Studying an Eclipse', 1570s, J. Paul Getty Museum. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Utagawa Kunisada (Toyokuni III), Origin of Iwato Kagura Dance (1856) — the sun returns",
        "excerpt": "In Kunisada's woodblock triptych the sun goddess Amaterasu steps from the mouth of the heavenly rock-cave in a burst of light, ending the darkness she had cast over the world by hiding herself away. The assembled gods — who lured her out with a mirror, jewels and riotous dance — recoil and rejoice as radiance floods back across a heaven that had gone black. The myth translates into divine drama the universal experience an eclipse rehearses: a daytime sky that darkens, terrifies, and is then miraculously restored.",
        "source": "Utagawa Kunisada (Toyokuni III), \"Origin of Iwato Kagura Dance\" (Iwato kagura no kigen), nishiki-e woodblock triptych, 1856; Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Origin_of_Iwato_Kagura_Dance_Amaterasu_by_Toyokuni_III_(Kunisada)_1856.png",
        "image": {
          "src": "/covers/total-solar-eclipse-europe-august-2026--a5.png",
          "alt": "Japanese woodblock triptych of the sun goddess Amaterasu emerging in a blaze of light from the heavenly rock-cave as gods gather",
          "credit": "Utagawa Kunisada (Toyokuni III), 'Origin of Iwato Kagura Dance' (Iwato kagura no kigen), 1856. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 23
  },
  {
    "slug": "met-costume-institute-john-galliano",
    "headline": "The Metropolitan Museum names John Galliano the subject of its spring 2027 Costume Institute show, confronting the disgrace that once ended his career",
    "overview": "The Metropolitan Museum of Art announced that British designer John Galliano will be the focus of its spring 2027 Costume Institute exhibition and Met Gala, spanning his work at Givenchy, Christian Dior and Maison Margiela. The museum said the show will directly address the antisemitic and racist remarks that cost Galliano his Dior job in 2011; he becomes only the third living designer given a solo Met show, after Yves Saint Laurent and Rei Kawakubo.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMilAFBVV95cUxOa2RSQjUwVVF6RjNPQVRSS0FRMmRVd0FkVC1sTVJFS1h3OE5hUkVoTDZQOUVEUW02N3o5UEFsQnBCSC1NckVPNGE5NUVKZHdqbktNQ1h4bnJ6UnFsMVlMakNNMkkzVVU4cGE0b0MyZXlHaFMzN01fZ0c3S1gwZjFha0JwV3NVdDVmSDZvVVk3TkFMWXlU?oc=5"
      },
      {
        "name": "The Hollywood Reporter",
        "href": "https://www.hollywoodreporter.com/lifestyle/lifestyle-news/john-galliano-met-gala-2027-museum-exhibition-controversy-1236661277/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-01",
    "image": {
      "src": "/covers/met-costume-institute-john-galliano.png",
      "alt": "The neoclassical stone facade and grand steps of the Metropolitan Museum of Art on Fifth Avenue",
      "credit": "The Metropolitan Museum of Art, Fifth Avenue, New York. Wikimedia Commons (CC BY-SA 4.0)."
    },
    "edition": "Evening Edition · 1 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The triumphant recall of Alcibiades to Athens, 407 BCE (Plutarch, Life of Alcibiades §32, c. 100 CE)",
        "excerpt": "When he landed, however, people did not deign so much as to look at the other generals whom they met, but ran in throngs to Alcibiades with shouts of welcome, escorting him on his way, and putting wreaths on his head as they could get to him, while those who could not come to him for the throng, gazed at him from afar, the elderly men pointing him out to the young.",
        "source": "Plutarch, Life of Alcibiades 32, trans. Bernadotte Perrin, Loeb Classical Library (Harvard University Press, 1916); Perseus Digital Library, Tufts University",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:2008.01.0006:chapter=32"
      },
      {
        "category": "historical",
        "title": "Pope Paul III pardons the goldsmith Benvenuto Cellini for homicide, Rome, 1534 (The Life of Benvenuto Cellini, Book I §74, written 1558-1563)",
        "excerpt": "Know then that men like Benvenuto, unique in their profession, stand above the law; and how far more he, then, who received the provocation I have heard of?",
        "source": "Benvenuto Cellini, The Life of Benvenuto Cellini, Book First, Section LXXIV, trans. John Addington Symonds (1888); Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Life_of_Benvenuto_Cellini/Sections_LXXI_to_LXXXII"
      },
      {
        "category": "literary",
        "title": "The Parable of the Prodigal Son, Gospel of Luke 15:20-24 (1st century CE; King James Version, 1611)",
        "excerpt": "And he arose, and came to his father. But when he was yet a great way off, his father saw him, and had compassion, and ran, and fell on his neck, and kissed him. And the son said unto him, Father, I have sinned against heaven, and in thy sight, and am no more worthy to be called thy son. But the father said to his servants, Bring forth the best robe, and put it on him; and put a ring on his hand, and shoes on his feet: And bring hither the fatted calf, and kill it; and let us eat, and be merry: For this my son was dead, and is alive again; he was lost, and is found. And they began to be merry.",
        "source": "The Holy Bible, King James Version, Luke 15:20-24; Christian Classics Ethereal Library (CCEL)",
        "href": "https://www.ccel.org/ccel/bible/kjv.Luke.15.html"
      },
      {
        "category": "literary",
        "title": "Oscar Wilde on his own fall from fame to infamy, De Profundis (written Reading Gaol, 1897; published 1905)",
        "excerpt": "I was a man who stood in symbolic relations to the art and culture of my age. I had realised this for myself at the very dawn of my manhood, and had forced my age to realise it afterwards. ... For I have come, not from obscurity into the momentary notoriety of crime, but from a sort of eternity of fame to a sort of eternity of infamy, and sometimes seem to myself to have shown, if indeed it required showing, that between the famous and the infamous there is but one step, if as much as one.",
        "source": "Oscar Wilde, De Profundis; Project Gutenberg (ebook #921)",
        "href": "https://www.gutenberg.org/cache/epub/921/pg921.txt"
      },
      {
        "category": "artistic",
        "title": "Rembrandt van Rijn, The Return of the Prodigal Son (c. 1668)",
        "excerpt": "In one of his last canvases Rembrandt paints the parable's climax: the ragged, shorn son, one shoe fallen from his blistered foot, sinks against the breast of his aged, half-blind father, whose two mismatched hands rest in forgiveness on his back. Everything else dissolves into a vast warm darkness; the light falls only on the reunion while silent onlookers witness the restoration of the one who was lost. Made near the end of the artist's own life of bankruptcy and ruin, it stands as Western art's supreme image of disgrace absolved.",
        "source": "Rembrandt Harmensz. van Rijn, oil on canvas, c. 1668, State Hermitage Museum, Saint Petersburg; via Wikimedia Commons (Google Art Project)",
        "href": "https://commons.wikimedia.org/wiki/File:Rembrandt_Harmensz_van_Rijn_-_Return_of_the_Prodigal_Son_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/met-costume-institute-john-galliano--a4.png",
          "alt": "Rembrandt's painting The Return of the Prodigal Son: a kneeling, ragged son with shorn head embraced by his aged father, lit against a deep brown shadow while onlookers watch.",
          "credit": "Rembrandt van Rijn, The Return of the Prodigal Son, c. 1668, State Hermitage Museum, Saint Petersburg. Public domain, via Wikimedia Commons (Google Art Project)."
        }
      },
      {
        "category": "artistic",
        "title": "Richard Wagner, Tannhäuser und der Sängerkrieg auf Wartburg, WWV 70 (Dresden version, 1845)",
        "excerpt": "Wagner's opera follows a gifted minstrel who squanders his honour in the sensual realm of Venus, is publicly shamed before the assembled court at the Wartburg song contest, and undertakes a penitential pilgrimage to Rome, only to be told by the Pope that his sin can no sooner be forgiven than a dry staff can put forth leaves. Grace, withheld by the institution, arrives only at the very end. That an artist's fall, exile and craving for absolution should be set to such sublime music is doubled in irony by Wagner himself, whose towering genius remains permanently entangled with the antisemitism he published under his own name.",
        "source": "Richard Wagner, Tannhäuser, WWV 70, full score (Dresden version, 1845); IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Tannh%C3%A4user,_WWV_70_(Wagner,_Richard)",
        "image": {
          "src": "/covers/met-costume-institute-john-galliano--a5.png",
          "alt": "Title page of the 1845 first edition of Wagner's opera Tannhäuser und der Sängerkrieg auf Wartburg, a grand romantic opera in three acts, published in Dresden.",
          "credit": "Title page of the original 1845 Dresden edition of Wagner's Tannhäuser (C. F. Meser). Photograph by H.-P. Haack, CC BY 3.0, via Wikimedia Commons."
        }
      }
    ],
    "rank": 24
  },
  {
    "slug": "west-ham-staveley-gold-stake",
    "headline": "A consortium led by financier Amanda Staveley agrees to buy the Gold family's 25.1% stake in West Ham United for a reported £160 million",
    "overview": "Financier Amanda Staveley, a former co-owner of Newcastle United, has agreed a deal through her PCP Capital Partners consortium to buy Vanessa Gold's 25.1% shareholding in English football club West Ham United, reported to be worth about £160 million. Existing West Ham shareholders can still exercise pre-emption rights to buy the stake instead; Staveley's group is expected to pursue the larger holding of co-owner David Sullivan if the deal completes.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMitwFBVV95cUxNd1BZck5EVWxaa0x0QzZpLVp5aXpFbVpiVmtLdHRNNjNLcjc2NU95MlFRLXdDRWdia3g4VmJYdGtyWjhsNjVUTWptaWRmRFViOVAyaHdyamFxbUlIOXd0ZzVNV0pPWl92bmhuNURpWTFoYVFCclNFa3ZodVJTbjRpWWFKbVBvNW54MWtpVVRzdGlVOERmR29nS1ZYOXE5bVJCaGpaVHpLY3JVbHdNQUNfNXpjeGtfdHM?oc=5"
      },
      {
        "name": "RTE",
        "href": "https://www.rte.ie/sport/soccer/2026/0801/1586130-staveley-consortium-agrees-to-buy-25-stake-in-west-ham/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-01",
    "image": {
      "src": "/covers/west-ham-staveley-gold-stake.png",
      "alt": "A large modern football stadium with a claret and blue running track under floodlights",
      "credit": "The London Stadium, home of West Ham United. Wikimedia Commons (CC BY-SA 3.0 DE)."
    },
    "edition": "Evening Edition · 1 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Pliny the Younger, Letters, to Calvisius Rufus (c. AD 100)",
        "excerpt": "Myself, I consider the will of the dead (though I am afraid what I say will not please the lawyers) of higher authority than the law, especially when the interest of one's native country is concerned. Ought I, who made them a present of eleven hundred thousand sesterces out of my own patrimony, to withhold a benefaction of little more than a third part of that sum out of an estate which has come quite by a chance into my hands? You, who like a true patriot have the same affection for this our common country, will agree with me in opinion, I feel sure.",
        "source": "Pliny the Younger, The Letters of Pliny the Younger, letter to Calvisius Rufus on his benefactions to his native town of Comum; trans. William Melmoth, rev. F. C. T. Bosanquet. Project Gutenberg eBook #2811.",
        "href": "https://gutenberg.org/files/2811/2811-h/2811-h.htm"
      },
      {
        "category": "historical",
        "title": "Andrew Carnegie, “The Gospel of Wealth” (1889)",
        "excerpt": "This, then, is held to be the duty of the man of Wealth: First, to set an example of modest, unostentatious living, shunning display or extravagance; to provide moderately for the legitimate wants of those dependent upon him; and after doing so to consider all surplus revenues which come to him simply as trust funds, which he is called upon to administer, and strictly bound as a matter of duty to administer in the manner which, in his judgment, is best calculated to produce the most beneficial results for the community—the man of wealth thus becoming the mere agent and trustee for his poorer brethren, bringing to their service his superior wisdom, experience, and ability to administer, doing for them better than they would or could do for themselves.",
        "source": "Andrew Carnegie, “The Gospel of Wealth,” North American Review (1889), on the rich man as trustee for the community. Full text via Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_Gospel_of_Wealth"
      },
      {
        "category": "literary",
        "title": "Anton Chekhov, The Cherry Orchard, Act III (1904)",
        "excerpt": "LOPAKHIN. I bought it! Wait, ladies and gentlemen, please, my head’s going round, I can’t talk.... [Laughs] When we got to the sale, Deriganov was there already. Leonid Andreyevitch had only fifteen thousand roubles, and Deriganov offered thirty thousand on top of the mortgage to begin with. I saw how matters were, so I grabbed hold of him and bid forty. He went up to forty-five, I offered fifty-five. That means he went up by fives and I went up by tens.... Well, it came to an end. I bid ninety more than the mortgage; and it stayed with me. The cherry orchard is mine now, mine! [Roars with laughter] My God, my God, the cherry orchard’s mine! Tell me I’m drunk, or mad, or dreaming.... [Stamps his feet] Don’t laugh at me! If my father and grandfather rose from their graves and looked at the whole affair, and saw how their Ermolai, their beaten and uneducated Ermolai, who used to run barefoot in the winter, how that very Ermolai has bought an estate, which is the most beautiful thing in the world! I’ve bought the estate where my grandfather and my father were slaves, where they weren’t even allowed into the kitchen.",
        "source": "Anton Chekhov, The Cherry Orchard, in Plays by Anton Chekhov, Second Series, trans. Julius West. Project Gutenberg eBook #7986.",
        "href": "https://www.gutenberg.org/files/7986/7986-h/7986-h.htm"
      },
      {
        "category": "literary",
        "title": "Anthony Trollope, The Way We Live Now (1875)",
        "excerpt": "It was at any rate an established fact that Mr. Melmotte had made his wealth in France. He no doubt had had enormous dealings in other countries, as to which stories were told which must surely have been exaggerated. It was said that he had made a railway across Russia, that he provisioned the Southern army in the American civil war, that he had supplied Austria with arms, and had at one time bought up all the iron in England. He could make or mar any company by buying or selling stock, and could make money dear or cheap as he pleased.",
        "source": "Anthony Trollope, The Way We Live Now, on the arrival of the financier Augustus Melmotte. Project Gutenberg eBook #5231.",
        "href": "https://www.gutenberg.org/cache/epub/5231/pg5231.txt"
      },
      {
        "category": "artistic",
        "title": "William Hogarth, Marriage A-la-Mode: 1, The Marriage Settlement (c. 1743)",
        "excerpt": "In Hogarth's opening scene the gout-ridden Earl of Squander spreads out his ancient family tree while a wealthy City alderman pores over the marriage contract, gold coins and banknotes heaped on the table between them. The great house is, in effect, being sold: an old title bought with new mercantile money, the couple themselves sitting back to back as indifferent instruments of the deal. It is a merciless portrait of a proud lineage and its house changing hands for cash.",
        "source": "William Hogarth, Marriage A-la-Mode: 1, The Marriage Settlement, c. 1743, oil on canvas. National Gallery, London (NG113); image via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Marriage_A-la-Mode_1,_The_Marriage_Settlement_-_William_Hogarth.jpg",
        "image": {
          "src": "/covers/west-ham-staveley-gold-stake--a4.png",
          "alt": "Hogarth's painting The Marriage Settlement: an earl displays his family tree to a wealthy merchant while a marriage contract and piles of gold coins lie on the table, the betrothed couple seated indifferently to one side.",
          "credit": "William Hogarth, Marriage A-la-Mode: 1, The Marriage Settlement, c. 1743, oil on canvas, National Gallery, London (NG113). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Thomas Gainsborough, Mr and Mrs Andrews (c. 1750)",
        "excerpt": "Gainsborough places the newly married Robert and Frances Andrews at the edge of their own broad acres — he leaning easily with his gun and dog, she seated beneath a spreading oak — with neat sheaves of wheat and rolling fields stretching behind them. The picture is as much a portrait of property as of people: land, harvest and lineage displayed as the family's proudest possession. It captures the pride and quiet confidence of those who own a treasured estate and mean to hold it.",
        "source": "Thomas Gainsborough, Mr and Mrs Andrews, c. 1750, oil on canvas. National Gallery, London (NG6301); image via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Thomas_Gainsborough_-_Mr_and_Mrs_Andrews.jpg",
        "image": {
          "src": "/covers/west-ham-staveley-gold-stake--a5.png",
          "alt": "Gainsborough's portrait Mr and Mrs Andrews: a well-dressed couple, the man standing with a gun beside a seated woman under an oak tree, at the edge of their fields of harvested wheat.",
          "credit": "Thomas Gainsborough, Mr and Mrs Andrews, c. 1750, oil on canvas, National Gallery, London (NG6301). Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 25
  },
  {
    "slug": "couche-tard-zabka-poland-acquisition",
    "headline": "Canada's Alimentation Couche-Tard agrees to buy Poland's convenience-store chain Zabka for about $8.7 billion, its biggest-ever acquisition",
    "overview": "Alimentation Couche-Tard, the Canadian owner of Circle K, said it would acquire Polish convenience-store operator Zabka Group in a voluntary tender offer valuing the company at about 32.6 billion zlotys ($8.7 billion), the largest deal in Couche-Tard's history. The offer of 32 zlotys per share is roughly a 9.4% premium, and Zabka runs some 13,000 stores across Poland and Romania. The purchase follows Couche-Tard's abandoned $46 billion pursuit of Japan's Seven & i.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiqgFBVV95cUxPWldfUzZRRi1pWnRLaWp5aWdvdEU0NVJmUVF5MjdTUEU0VUh5QzFFNVItZGxFTmQ3SVVJTGRhM1RKSXJTa2E2OWFnLWlRTmRqRk4tVGNiaDdMN05qZTRRX1hwaG9NdkxxTHF5OGFhR0RvY1E1OWhtODN3MkhxOTlLXy0tWm5HdTBSdjl2WEF3X0NmNV9NM2pkbk1kd1B0MVY2WF9rZTNGSkNJQQ?oc=5"
      },
      {
        "name": "The Globe and Mail",
        "href": "https://www.theglobeandmail.com/business/article-couche-tard-buy-polish-retailer-zabka/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-01",
    "image": {
      "src": "/covers/couche-tard-zabka-poland-acquisition.png",
      "alt": "A green-and-white Zabka convenience store on a street in a Polish town",
      "credit": "A Żabka convenience store in Tomaszów Mazowiecki, Poland. Public domain via Wikimedia Commons."
    },
    "edition": "Evening Edition · 1 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Old Oligarch on Athens' command of maritime trade (c. 431-424 BC)",
        "excerpt": "Wealth they alone of the Greeks and non-Greeks are capable of possessing. If some city is rich in ship-timber, where will it distribute it without the consent of the rulers of the sea? Again if some city is rich in iron, copper, or flax, where will it distribute without the consent of the rulers of the sea? However, it is from these very things that I have my ships: timber from one place, iron from another, copper from another, flax from another, wax from another.",
        "source": "Pseudo-Xenophon (the \"Old Oligarch\"), Constitution of the Athenians 2.11, Perseus Digital Library, Tufts University",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0158:chapter%3D2"
      },
      {
        "category": "historical",
        "title": "Charter of the Dutch West India Company, Article I (3 June 1621)",
        "excerpt": "That for the period of twenty-four years no native or inhabitant of this country shall be permitted, except in the name of this United Company, from these United Netherlands nor even from any place outside of them, to sail to or trade with the coasts and countries of Africa, from the Tropic of Cancer to the Cape of Good Hope; nor to or with the countries of America, or the West Indies, beginning at the south end of Terra Nova, through the Straits of Magellan, le Maire, and other straits and passages situated thereabouts, to the Strait of Anjan, neither on the North Sea nor on the South Sea, nor to or with any islands situated on the one side or the other.",
        "source": "Charter of the Dutch West India Company (1621), English translation, Wikisource",
        "href": "https://en.wikisource.org/wiki/Charter_of_the_Dutch_West_India_Company"
      },
      {
        "category": "literary",
        "title": "Theodore Dreiser, The Financier, Chapter I: the lobster and the squid (1912)",
        "excerpt": "The incident made a great impression on him. It answered in a rough way that riddle which had been annoying him so much in the past: “How is life organized?” Things lived on each other—that was it. Lobsters lived on squids and other things. What lived on lobsters? Men, of course! Sure, that was it! And what lived on men? he asked himself. Was it other men? Wild animals lived on men. And there were Indians and cannibals. And some men were killed by storms and accidents. He wasn’t so sure about men living on men; but men did kill each other. How about wars and street fights and mobs? He had seen a mob once. It attacked the Public Ledger building as he was coming home from school. His father had explained why. It was about the slaves. That was it! Sure, men lived on men.",
        "source": "Theodore Dreiser, The Financier (1912), Chapter I, Project Gutenberg (ebook #1840)",
        "href": "https://www.gutenberg.org/files/1840/1840-h/1840-h.htm"
      },
      {
        "category": "literary",
        "title": "Frank Norris, The Octopus, Book I: the railroad as a devouring monster (1901)",
        "excerpt": "and abruptly Presley saw again, in his imagination, the galloping monster, the terror of steel and steam, with its single eye, cyclopean, red, shooting from horizon to horizon; but saw it now as the symbol of a vast power, huge, terrible, flinging the echo of its thunder over all the reaches of the valley, leaving blood and destruction in its path; the leviathan, with tentacles of steel clutching into the soil, the soulless Force, the iron-hearted Power, the monster, the Colossus, the Octopus.",
        "source": "Frank Norris, The Octopus: A Story of California (1901), Book I, Project Gutenberg (ebook #268)",
        "href": "https://www.gutenberg.org/files/268/268-h/268-h.htm"
      },
      {
        "category": "artistic",
        "title": "Hans Holbein the Younger, The Merchant Georg Gisze (1532)",
        "excerpt": "Amid ledgers, seals, a gold balance and a signet ring, Holbein fixes the Danzig-born Hanseatic merchant Georg Gisze in his London counting-house at the Steelyard, every instrument of long-distance trade arranged about him like the emblems of a private commercial dominion. Coins, weights and letters map a network reaching from the Baltic to the Thames, the portrait of a single trading house at the height of its independent reach. It captures precisely the kind of proud, self-contained merchant enterprise that greater mercantile powers would in time draw into their own empires.",
        "source": "Hans Holbein the Younger, Der Kaufmann Georg Gisze, 1532, oil and tempera on oak, Gemaeldegalerie, Staatliche Museen zu Berlin (inv. 586); via Wikimedia Commons (Google Art Project)",
        "href": "https://commons.wikimedia.org/wiki/File:Hans_Holbein_der_J%C3%BCngere_-_Der_Kaufmann_Georg_Gisze_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/couche-tard-zabka-poland-acquisition--a4.png",
          "alt": "Portrait of the merchant Georg Gisze seated at his counting-house table surrounded by coins, letters, seals, a balance and ledgers.",
          "credit": "Hans Holbein the Younger, The Merchant Georg Gisze (1532), Gemaeldegalerie, Staatliche Museen zu Berlin. Public domain, via Wikimedia Commons (Google Art Project)."
        }
      },
      {
        "category": "artistic",
        "title": "Rembrandt, The Syndics of the Amsterdam Drapers' Guild (De Staalmeesters) (1662)",
        "excerpt": "Five wardens of the Amsterdam drapers' guild glance up from their account book as though the viewer had just entered the room, their sober authority the collective face of a trading corporation at the zenith of the Dutch commercial age. Charged with stamping their seal of approval on every bale of cloth, they embody the quiet machinery by which a mercantile power certifies, controls and extends its markets. Rembrandt lends the business of commerce the gravity of a council of state, the board of a great trading house made monumental.",
        "source": "Rembrandt van Rijn, The Sampling Officials of the Amsterdam Drapers' Guild (De Staalmeesters), 1662, oil on canvas, Rijksmuseum, Amsterdam (inv. SK-C-6); via Wikimedia Commons (Google Art Project)",
        "href": "https://commons.wikimedia.org/wiki/File:Rembrandt_-_De_Staalmeesters-_het_college_van_staalmeesters_(waardijns)_van_het_Amsterdamse_lakenbereidersgilde_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/couche-tard-zabka-poland-acquisition--a5.png",
          "alt": "Group portrait of five cloth-guild officials in black hats and white collars seated at a table covered with a Persian carpet, with a bareheaded servant behind them.",
          "credit": "Rembrandt van Rijn, The Syndics of the Amsterdam Drapers' Guild (1662), Rijksmuseum, Amsterdam. Public domain, via Wikimedia Commons (Google Art Project)."
        }
      }
    ],
    "rank": 26
  },
  {
    "slug": "fifa-scraps-world-cup-sell-off",
    "headline": "FIFA drops its plan to sell a 20% stake in a $20 billion World Cup company after UEFA and other confederations threatened a boycott",
    "overview": "FIFA president Gianni Infantino said on 31 July that a proposal to spin off the governing body's commercial businesses, including the men's and women's World Cups, into a roughly $20 billion company with 20% owned by private investors 'will not proceed,' abandoning the plan after intense global pushback. UEFA's 55 member associations had agreed to boycott the World Cup and all FIFA competitions over the scheme, and North America's Concacaf and the Asian Football Confederation also opposed it; Infantino's senior adviser, former U.S. Soccer president Carlos Cordeiro, resigned in protest. The anchor investor had been an investment firm founded by Joshua Kushner, brother of Jared Kushner.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMimgFBVV95cUxPWEpDcHVOTlpQTHlKczVBamNkUWFHcUtOT2VlS1pSVlZ2VWg1QTZfLXFJZDA4VEl1eDB6c3FGbU5USlNZbjFDMXlaX0xRZHlSbmpmckh4WjF5RTZrWEFEOHh6SDVmSC0zWW9RQ2Zxd2hLajhkV1lVaTgwb3F1aC1tNWhxdUgxYlU1bVRyQnphemhPck95Mkh1bjR3?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/sport/football/articles/czekr6kn58po"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-01",
    "image": {
      "src": "/covers/fifa-scraps-world-cup-sell-off.png",
      "alt": "The interior of a large football stadium with an illuminated green pitch and tiers of empty seats",
      "credit": "Emirates Stadium, London. Wikimedia Commons."
    },
    "lead": true,
    "edition": "Morning Edition · 1 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The First Secession of the Plebs to the Sacred Mount (494 BC)",
        "excerpt": "There, without any commander, in a regularly entrenched camp, taking nothing with them but the necessaries of life, they quietly maintained themselves for some days, neither receiving nor giving any provocation.",
        "source": "Livy, The History of Rome, Book 2, ch. 32 (Rev. Canon Roberts translation), Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0026:book%3D2:chapter%3D32"
      },
      {
        "category": "historical",
        "title": "Parliament Repeals the Stamp Act after Colonial Boycotts (1766)",
        "excerpt": "from and after the first day of May, one thousand seven hundred and sixty-six, the above-mentioned Act, and the several matters and things therein contained, shall be, and is and are hereby repealed and made void to all intents and purposes whatsoever.",
        "source": "An Act Repealing the Stamp Act; March 18, 1766, The Avalon Project, Yale Law School",
        "href": "https://avalon.law.yale.edu/18th_century/repeal_stamp_act_1766.asp"
      },
      {
        "category": "literary",
        "title": "Esau Sells His Birthright for a Mess of Pottage (Genesis 25)",
        "excerpt": "And Jacob said, Sell me this day thy birthright. And Esau said, Behold, I am at the point to die: and what profit shall this birthright do to me? And Jacob said, Swear to me this day; and he sware unto him: and he sold his birthright unto Jacob. Then Jacob gave Esau bread and pottage of lentiles; and he did eat and drink, and rose up, and went his way: thus Esau despised his birthright.",
        "source": "The Bible, King James Version, Genesis 25:31-34, Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Genesis"
      },
      {
        "category": "literary",
        "title": "Doctor Faustus Signs Away His Soul in Blood",
        "excerpt": "Consummatum est; this bill is ended, / And Faustus hath bequeath'd his soul to Lucifer.",
        "source": "Christopher Marlowe, The Tragical History of Doctor Faustus, Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/779/pg779.txt"
      },
      {
        "category": "artistic",
        "title": "El Greco, Christ Driving the Money Changers from the Temple (before 1570)",
        "excerpt": "El Greco packs the temple's marble threshold with panicked merchants scrambling to gather their coins and overturned wares as a whip-raising Christ, robed in flaming red, sweeps them out of the sacred precinct. The composition sets the profaning traffic of money against the purity of the holy place, indicting anyone who would turn a shrine into a marketplace. It is the enduring image of commerce cast out of a temple that was never meant to be for sale.",
        "source": "El Greco, Christ Driving the Money Changers from the Temple, National Gallery of Art, Washington, D.C.",
        "href": "https://commons.wikimedia.org/wiki/File:El_Greco_13.jpg",
        "image": {
          "src": "/covers/fifa-scraps-world-cup-sell-off--a4.png",
          "alt": "Painting of Christ in a red robe raising a whip to drive money changers and merchants out of a marble temple.",
          "credit": "El Greco (Domenikos Theotokopoulos), Christ Driving the Money Changers from the Temple, before 1570, National Gallery of Art, Washington, D.C. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Eugene Delacroix, Liberty Leading the People (1830)",
        "excerpt": "Delacroix paints an allegorical Liberty, tricolour flag in one hand and musket in the other, striding over the barricade and the fallen as a ragged coalition of workers, a top-hatted bourgeois and a pistol-waving boy surge forward behind her. The canvas is the definitive image of a united crowd overpowering an entrenched ruler, wrested from the July Revolution that toppled Charles X. It captures the exact moment when the many, once roused, become irresistible to the powerful.",
        "source": "Eugene Delacroix, Liberty Leading the People, Musee du Louvre, Paris",
        "href": "https://commons.wikimedia.org/wiki/File:Eug%C3%A8ne_Delacroix_-_Le_28_Juillet._La_Libert%C3%A9_guidant_le_peuple.jpg",
        "image": {
          "src": "/covers/fifa-scraps-world-cup-sell-off--a5.png",
          "alt": "Painting of a bare-breasted allegorical woman holding a tricolour flag and musket, leading armed revolutionaries over a barricade of bodies.",
          "credit": "Eugene Delacroix, Liberty Leading the People (Le 28 Juillet. La Liberte guidant le peuple), 1830, Musee du Louvre, Paris. Public domain via Wikimedia Commons."
        }
      }
    ],
    "rank": 27
  },
  {
    "slug": "russia-kyiv-missile-strike-nine-killed",
    "headline": "A Russian ballistic-missile and drone barrage kills at least nine and wounds more than 30 in Kyiv as Ukraine says it has run out of Patriot interceptors",
    "overview": "Russia struck the Ukrainian capital before dawn on 1 August with a heavy barrage that President Volodymyr Zelensky said involved about 35 missiles, 27 of them ballistic, and roughly 185 drones, killing at least nine people and injuring more than 30. Only one ballistic missile was intercepted because Ukraine has no remaining interceptors for its U.S.-made Patriot systems, Zelensky said, renewing appeals to allies for more. Damage was reported across seven districts of Kyiv, hitting 18 residential buildings, a school and the Lithuanian embassy.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMimwFBVV95cUxQYnpVZ3NtazgzQnJBN050TDk4R2FoUzV3ZXB2REhtUnFMY0hwZTB3ek9kTEVpcFkxT3hCZkQ4TTNvZXNqNEpBZEFaNVlzcXROWGh1MkFFNElLUV80OExFbnNrS0pJUThJd3lobkRLSklQRG9sWkpjM0QtNVhCRjFzYkM5b01kYWoxeFVOSXZ1ZDE5RHdWOWdJdE4yOA?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/ce973yvk7pko"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-01",
    "image": {
      "src": "/covers/russia-kyiv-missile-strike-nine-killed.png",
      "alt": "The Podil district of Kyiv illuminated at night",
      "credit": "Podil, Kyiv, at night. Wikimedia Commons."
    },
    "edition": "Morning Edition · 1 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The massacre at Mycalessus (413 BCE)",
        "excerpt": "They spared neither old nor young, but cut down, one after another, all whom they met, the women and children, the very beasts of burden, and every living thing which they saw. ... They even fell upon a boys' school, the largest in the place, which the children had just entered, and massacred them every one.",
        "source": "Thucydides, History of the Peloponnesian War 7.29 (trans. Richard Crawley), via Perseus Digital Library",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=urn%3Acts%3AgreekLit%3Atlg0003.tlg001.perseus-eng2%3A7.29"
      },
      {
        "category": "historical",
        "title": "The Blitz on Britain's cities (1940-41)",
        "excerpt": "For eight months German bombers pounded London, Coventry, Great Yarmouth and other cities night after night, killing more than 40,000 civilians and reducing whole streets to rubble and flame. Families sheltered in Underground stations and cellars while fire crews battled the blazes until dawn. A besieged Britain appealed across the Atlantic for arms, and the American Lend-Lease supplies that followed helped it endure.",
        "source": "Imperial War Museum photograph H 8799, 'Air Raid Damage in Great Britain during the Second World War', via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Air_Raid_Damage_in_Great_Britain_during_the_Second_World_War_H8799.jpg",
        "image": {
          "src": "/covers/russia-kyiv-missile-strike-nine-killed--a1.png",
          "alt": "Firemen playing their hoses on burning buildings after a German air raid during the Second World War",
          "credit": "War Office official photographer Lt. Cash, 'Air Raid Damage in Great Britain during the Second World War' (H 8799), Imperial War Museum. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Andromache's lament for Troy — Homer, Iliad, Book 24",
        "excerpt": "For thou hast perished that didst watch thereover, thou that didst guard it, and keep safe its noble wives and little children.",
        "source": "Homer, Iliad 24 (trans. A. T. Murray, 1924), via Perseus Digital Library",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=urn%3Acts%3AgreekLit%3Atlg0012.tlg001.perseus-eng1%3A24.723-24.745"
      },
      {
        "category": "literary",
        "title": "The Book of Lamentations over fallen Jerusalem",
        "excerpt": "How doth the city sit solitary, that was full of people! how is she become as a widow! she that was great among the nations, and princess among the provinces, how is she become tributary!",
        "source": "Lamentations 1:1, King James Version (1611), via Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Lamentations"
      },
      {
        "category": "artistic",
        "title": "Francisco Goya, The Third of May 1808",
        "excerpt": "Goya's canvas freezes the instant before a firing squad kills unarmed Madrid townsfolk who had risen against Napoleon's occupation. A lantern throws harsh light on a man in a white shirt flinging his arms wide in surrender and terror, while the soldiers stand faceless and mechanical, their rifles already level. It is Western art's starkest image of defenceless civilians at the mercy of an occupying army's guns.",
        "source": "Francisco de Goya, 'The 3rd of May 1808 in Madrid, or The Executions', 1814, Museo Nacional del Prado, Madrid",
        "href": "https://www.museodelprado.es/en/the-collection/art-work/the-3rd-of-may-1808-in-madrid-or-the-executions/5e177409-2993-4240-97fb-847a02c6496c",
        "image": {
          "src": "/covers/russia-kyiv-missile-strike-nine-killed--a4.png",
          "alt": "Goya's painting of a firing squad executing civilians at night, a man in a white shirt with arms raised before the levelled rifles",
          "credit": "Francisco de Goya, The Third of May 1808 (1814), Museo Nacional del Prado, Madrid. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Tchaikovsky, 1812 Overture, Op. 49",
        "excerpt": "Tchaikovsky scored the terror and deliverance of a city under invasion: a hymn of prayer swells beneath the clash of armies, and real cannon fire punches through the orchestra as Napoleon's Grande Armee is driven from a burning Moscow. Written to celebrate Russia surviving a foreign onslaught, the overture now reads as a grim inversion, its thundering guns today aimed by Russia at Kyiv. It closes in the pealing bells of survival that Ukraine's besieged capital can only long to hear.",
        "source": "Pyotr Ilyich Tchaikovsky, 1812 Overture, Op. 49 (1880), full score, IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/1812_Overture,_Op.49_(Tchaikovsky,_Pyotr)"
      }
    ],
    "rank": 28
  },
  {
    "slug": "us-treasury-japan-yen-intervention",
    "headline": "The U.S. Treasury steps in to buy yen alongside Japan, its first intervention to support the currency in more than a decade",
    "overview": "The U.S. Treasury intervened in currency markets on 31 July to help prop up the yen after Tokyo acted first, marking Washington's first move to support Japan's currency in more than a decade as it languished near 40-year lows, the Financial Times reported. The Federal Reserve Bank of New York sold euros to buy yen on the Treasury's behalf. A photographed note from Treasury Secretary Scott Bessent read 'Buy Japanese Yen (JPY) $5-10 bil.'; Bessent said the yen 'seems very undervalued' and had 'substantially overshot' its equilibrium price.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMisgFBVV95cUxQU0lVZ3FOWEp0MkVGaWc4UkprSmVwZlZMSzBQRlBuQ3UzOEVuN09za080MDFQTHFfOVFGU1hsOUF3THBnbGc0Tk4zdi1sR0xBdHhJV3FiOTNmaEZkbWNWQ0VMRjROZXJUQ1VwX1BrS3NvdWRDYThPSWVhdnhZUmxHWHNsVEFRYTZFXy1CeTJVdW13SVpqcl9wdTBoRjdINnV6R0tEcTI3Qnpjc3RpLWxQOVVB?oc=5"
      },
      {
        "name": "Nikkei Asia",
        "href": "https://asia.nikkei.com/business/markets/currencies/us-treasury-intervenes-to-support-the-yen-after-japan-steps-in-ft-reports"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-01",
    "image": {
      "src": "/covers/us-treasury-japan-yen-intervention.png",
      "alt": "The front of a Japanese 10,000-yen banknote",
      "credit": "Series F 10,000-yen note, Bank of Japan. Wikimedia Commons."
    },
    "edition": "Morning Edition · 1 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Pliny the Elder condemns the debasement of the Roman denarius (1st century AD)",
        "excerpt": "The Triumvir Antonius alloyed the silver denarius with iron: and in spurious coin there is an alloy of copper employed. Some, again, curtail the proper weight of our denarii, the legitimate proportion being eighty-four denarii to a pound of silver. It was in consequence of these frauds that a method was devised of assaying the denarius.",
        "source": "Pliny the Elder, The Natural History, Book XXXIII (Bostock & Riley translation, 1855)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0137:book=33:chapter=46"
      },
      {
        "category": "historical",
        "title": "The Plaza Accord: five governments collude to reset the price of the dollar (1985)",
        "excerpt": "On 22 September 1985, at New York's Plaza Hotel, the finance ministers of the United States, Japan, West Germany, France and Britain announced they would jointly push down an overvalued dollar. Coordinated central-bank selling followed, and within two years the dollar had fallen by roughly half against the yen and the Deutsche Mark. It remains the textbook case of great powers steering the value of money by concerted design rather than leaving it to the market, and the direct ancestor of the 2026 yen operation.",
        "source": "Announcement of the Ministers of Finance and Central Bank Governors of France, Germany, Japan, the United Kingdom and the United States (Plaza Accord), 22 September 1985; archived by the G7/G8 Information Centre, University of Toronto",
        "href": "http://www.g7.utoronto.ca/finance/fm850922.htm"
      },
      {
        "category": "literary",
        "title": "Aristophanes likens Athens' fallen leaders to debased coinage in The Frogs (405 BC)",
        "excerpt": "Often has it crossed my fancy, that the city loves to deal\nWith the very best and noblest members of her commonweal,\nJust as with our ancient coinage, and the newly-minted gold.\nYea for these, our sterling pieces, all of pure Athenian mould,\nAll of perfect die and metal, all the fairest of the fair,\nAll of workmanship unequalled, proved and valued every-where",
        "source": "Aristophanes, The Frogs, translated by Benjamin Bickley Rogers (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/7998/7998-h/7998-h.htm"
      },
      {
        "category": "literary",
        "title": "Goethe's Faust: Mephistopheles rescues a bankrupt Empire with paper money (1832)",
        "excerpt": "To all to whom this cometh, be it known:\nA thousand crowns in worth this note doth own.\nIt to secure, as certain pledge, shall stand\nAll buried treasure in the Emperor's land:\nAnd 't is decreed, perfecting thus the scheme,\nThe treasure, soon as raised, shall this redeem.",
        "source": "Johann Wolfgang von Goethe, Faust, Part II, Act I, 'Pleasure-Garden (Paper-Money Scheme),' translated by Bayard Taylor (Wikisource)",
        "href": "https://en.wikisource.org/wiki/Faust_(trans._Bayard_Taylor)/Act_I/IV"
      },
      {
        "category": "artistic",
        "title": "Quentin Metsys, The Moneylender and His Wife (1514)",
        "excerpt": "A moneylender tips his delicate balance to weigh gold coins and pearls, while his wife, her prayer-book open to an illumination of the Virgin, turns her eyes from devotion to the glinting scales. In the tiny convex mirror on the table a man reads beside a window, a moralizing glimpse of the world beyond the counting-house. Metsys freezes the exact instant when the measure of money outweighs the measure of the soul.",
        "source": "Quentin Metsys, The Moneylender and His Wife, oil on panel, 1514, Musée du Louvre, Paris",
        "href": "https://commons.wikimedia.org/wiki/File:Quinten_Massijs_(I)_-_The_Moneylender_and_his_Wife_-_WGA14281.jpg",
        "image": {
          "src": "/covers/us-treasury-japan-yen-intervention--a4.png",
          "alt": "A 16th-century Flemish painting of a moneylender weighing gold coins on a balance while his wife, holding an illustrated prayer-book, watches the scales.",
          "credit": "Quentin Metsys, The Moneylender and His Wife, 1514, Musée du Louvre, Paris. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Richard Wagner, Das Rheingold (1869): the theft and curse of the gold",
        "excerpt": "The music-drama opens in the depths of the Rhine, where the Rhinemaidens guard a hoard of gold until the dwarf Alberich renounces love to seize it and forge a ring of absolute power. From that theft flows a curse that dooms gods and mortals alike. Wagner's shimmering E-flat prelude and the clanging anvils of Nibelheim stage the oldest warning about money itself: whoever masters the gold seeks to master the world, and is consumed by it.",
        "source": "Richard Wagner, Das Rheingold, WWV 86A, full score (IMSLP / Petrucci Music Library)",
        "href": "https://imslp.org/wiki/Das_Rheingold,_WWV_86A_(Wagner,_Richard)",
        "image": {
          "src": "/covers/us-treasury-japan-yen-intervention--a5.png",
          "alt": "Arthur Rackham illustration of the Rhinemaidens lamenting beneath the water after the loss of the Rhinegold.",
          "credit": "Arthur Rackham, 'The Rhinemaidens lament the loss of the Rhinegold,' from The Rhinegold and the Valkyrie, 1910. Public domain via Wikimedia Commons."
        }
      }
    ],
    "rank": 29
  },
  {
    "slug": "google-earth-ai-image-rollback",
    "headline": "Google pulls an AI image-generation feature from Google Earth a day after launch as users create fake scenes of real places",
    "overview": "Alphabet's Google rolled back an AI image-generation tool in Google Earth on 31 July, one day after introducing it, after users shared images that appeared to violate the company's policies. The feature, powered by Google's Nano Banana 2 model, let users generate photorealistic pictures grounded in Earth's satellite, aerial and 3D imagery from a text prompt for any location, drawing criticism that it could spread misinformation by placing fabricated scenes atop real landmarks. Google said it was pausing the capability while it builds stronger guardrails.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMizwFBVV95cUxPcW44Z0xhdlhwQVJJQUZKdVM2RkRZM1Fsa2VKVXFWdFFfZ1piUmhfazYwdkpEcFFGODNyZTRVUE9meXBwWElKZXIzU3dEZnUxd0xDdlYwNWo4aHFTMlJudmdLMHVCdTJLbHl6NUdVaXNVcUxLR24yOVR5Tzkzd09hNWV3cGx0V2Z5cGpwWHE5Q1hidl9rZ29idFZCbXBMMG9zYVNoYzU4UlpGa3RkVzQ1M1J5RDEzSGhHQ290am5MUi1uRDRkTjNrajFfdkNUZmM?oc=5"
      },
      {
        "name": "Bloomberg",
        "href": "https://www.bloomberg.com/news/articles/2026-07-31/google-rolls-back-earth-ai-tool-over-concern-about-fake-images"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-01",
    "image": {
      "src": "/covers/google-earth-ai-image-rollback.png",
      "alt": "The full disc of planet Earth seen from space, showing Africa, Antarctica and swirling clouds",
      "credit": "NASA, The Blue Marble (Apollo 17), 1972. Public domain via Wikimedia Commons."
    },
    "edition": "Morning Edition · 1 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The contest of Zeuxis and Parrhasius: painted grapes and the painted curtain (5th c. BCE, recorded by Pliny)",
        "excerpt": "This last, it is recorded, entered into a competition with Zeuxis, who produced a picture of grapes so successfully represented that birds flew up to the stage-buildings; whereupon Parrhasius himself produced such a realistic picture of a curtain that Zeuxis, proud of the verdict of the birds, requested that the curtain should now be drawn and the picture displayed; and when he realized his mistake, with a modesty that did him honour he yielded up the prize, saying that whereas he had deceived birds Parrhasius had deceived him, an artist.",
        "source": "Pliny the Elder, Natural History, Book XXXV (H. Rackham translation), on the rival painters Zeuxis and Parrhasius",
        "href": "https://www.attalus.org/translate/pliny_hn35a.html"
      },
      {
        "category": "historical",
        "title": "The commissar vanishes: Stalin-era retouching erases Nikolai Yezhov from the Moscow-Volga Canal photograph (1937 photo, later doctored)",
        "excerpt": "In April 1937 the secret-police chief Nikolai Yezhov was photographed strolling beside Stalin and Molotov along the newly opened Moscow-Volga Canal. After his fall and 1940 execution, retouchers airbrushed him out entirely, smoothing the canal wall over the spot where he had stood so that the published image showed only two leaders where there had been three. The doctored photograph, circulated as the authentic record, made a fabricated version of the past sit seamlessly atop the real place and the real day.",
        "source": "University of Pennsylvania Libraries digital exhibit 'April Fooled' — retouched Soviet photograph of Voroshilov, Molotov and Stalin at the Moscow-Volga Canal, with Yezhov removed",
        "href": "https://pennds.org/aprilfooled/items/show/21",
        "image": {
          "src": "/covers/google-earth-ai-image-rollback--a1.png",
          "alt": "Doctored Soviet photograph showing Stalin and Molotov walking beside a canal; a third official, Nikolai Yezhov, has been airbrushed out, leaving only a blank stretch of canal wall.",
          "credit": "Unknown Soviet photographer (retouched), Stalin and Molotov along the Moscow-Volga Canal with Nikolai Yezhov removed, photographed April 1937 and later doctored. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Plato's Allegory of the Cave: prisoners who mistake the shadows for the world (Republic, Book VII)",
        "excerpt": "Behold! human beings living in a underground den, which has a mouth open towards the light and reaching all along the den; here they have been from their childhood, and have their legs and necks chained so that they cannot move, and can only see before them, being prevented by the chains from turning round their heads. Above and behind them a fire is blazing at a distance, and between the fire and the prisoners there is a raised way; and you will see, if you look, a low wall built along the way, like the screen which marionette players have in front of them, over which they show the puppets.",
        "source": "Plato, The Republic, Book VII, the Allegory of the Cave (Benjamin Jowett translation)",
        "href": "https://people.bu.edu/wwildman/courses/wphil/readings/wphil_rdg02b_republic_cave.htm"
      },
      {
        "category": "literary",
        "title": "Lewis Carroll's map on the scale of a mile to the mile (Sylvie and Bruno Concluded, 1893)",
        "excerpt": "\"We actually made a map of the country, on the scale of a mile to the mile!\" ... \"It has never been spread out, yet,\" said Mein Herr: \"the farmers objected: they said it would cover the whole country, and shut out the sunlight! So we now use the country itself, as its own map, and I assure you it does nearly as well.\"",
        "source": "Lewis Carroll, Sylvie and Bruno Concluded, chapter XI, 'The Man in the Moon'",
        "href": "https://en.wikisource.org/wiki/Sylvie_and_Bruno_Concluded/The_Man_in_the_Moon"
      },
      {
        "category": "artistic",
        "title": "Pere Borrell del Caso, 'Escaping Criticism' (1874): a painted boy climbing out of his own frame",
        "excerpt": "A ragged, wide-eyed boy grips the edge of a gilded picture frame and appears to clamber straight out of it into the viewer's space, his hand and foot casting shadows that seem to fall on the real wall. This 19th-century trompe-l'oeil deliberately collapses the border between the painted illusion and the world of the spectator, so that for an instant the fiction looks as though it has escaped into reality. Like the Nano Banana images pasted over real terrain, its whole force lies in a made thing convincingly overstepping the frame that should mark it as unreal.",
        "source": "Pere Borrell del Caso, 'Escaping Criticism' (Huyendo de la crítica), 1874, oil on canvas, Banco de España, Madrid",
        "href": "https://commons.wikimedia.org/wiki/File:Escaping_criticism-by_pere_borrel_del_caso.png",
        "image": {
          "src": "/covers/google-earth-ai-image-rollback--a4.png",
          "alt": "Trompe-l'oeil oil painting of a barefoot boy in ragged clothes climbing out of a gilded picture frame, one hand and foot crossing over the frame's edge as if entering the real world.",
          "credit": "Pere Borrell del Caso, 'Escaping Criticism' (Huyendo de la crítica), 1874, Banco de España, Madrid. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Paul Dukas, 'The Sorcerer's Apprentice' (L'apprenti sorcier, 1897): a conjured thing that runs amok until the master returns",
        "excerpt": "Dukas's symphonic scherzo sets Goethe's tale to music: an apprentice enchants a broom to haul water, delights as it obeys, then watches in horror as the animated creation floods the workshop and will not stop. His panicked attempts to control it only multiply the chaos, until the returning sorcerer speaks the word that breaks the spell and stills the flood. The parable of a maker who summons a lifelike power he cannot govern, and needs a higher hand to recall it, mirrors Google launching a photorealistic image tool and pulling it a day later once the fakes began to spread.",
        "source": "Paul Dukas, L'apprenti sorcier (The Sorcerer's Apprentice), symphonic scherzo, first published 1897 — full orchestral score",
        "href": "https://imslp.org/wiki/L%27apprenti_sorcier_(Dukas,_Paul)"
      }
    ],
    "rank": 30
  },
  {
    "slug": "europe-wildfires-heatwave-evacuations",
    "headline": "Wildfires driven by a third summer heatwave force hundreds of thousands from their homes across France, Spain and Greece",
    "overview": "Wildfires fanned by Europe's third heatwave of the summer have driven more than 375,000 people from homes and holiday lodgings across France and Spain, with more than 167,000 evacuated in France's Gironde region alone, while blazes in Greece forced residents and tourists to flee by sea from coastal villages. Firefighters reported some easing near Bordeaux and Madrid by 31 July even as new fires broke out near Athens. A temperature of 48.4C recorded in Sicily on 18 July was the highest in Europe so far this summer, and officials warned extreme fire danger could persist through August.",
    "genre": "Climate",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c0kmzx8vpv4o"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMirgFBVV95cUxOd05jdW45TDVMejhCUHVfa2RCaDJLTFk5RUxkOTFmeEdKMllFcTk1eVllOFlsZWFXWTBXTVdIME1OUWxMemY3WUhJdFpZVUpyNXoxNy1SMTRBVTRNTjYteHNBRmhRTHB5T19PRmFFcFNheE91aUFEY1FkbzItS18xR2dDTHFpTDVKcVBYU2VmaWItSnRzeHJPeFhWTlRtRDRpTTAwd0RiWElITEdhdHc?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-01",
    "image": {
      "src": "/covers/europe-wildfires-heatwave-evacuations.png",
      "alt": "A high-intensity forest wildfire with towering orange flames and heavy smoke",
      "credit": "KNP Complex Fire. U.S. National Park Service, public domain via Wikimedia Commons."
    },
    "edition": "Morning Edition · 1 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Great Fire of Rome under Nero (64 AD)",
        "excerpt": "The blaze in its fury ran first through the level portions of the city, then rising to the hills, while it again devastated every place below them, it outstripped all preventive measures; so rapid was the mischief and so completely at its mercy the city, with those narrow winding passages and irregular streets, which characterised old Rome. Often, while they looked behind them, they were intercepted by flames on their side or in their face.",
        "source": "Tacitus, Annals, Book XV.38 (Church and Brodribb translation), Perseus Digital Library",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0078:book=15:chapter=38"
      },
      {
        "category": "historical",
        "title": "The Great Fire of London (1666)",
        "excerpt": "poor people staying in their houses as long as till the very fire touched them, and then running into boats, or clambering from one pair of stairs by the water-side to another. And among other things, the poor pigeons, I perceive, were loth to leave their houses, but hovered about the windows and balconys till they were, some of them burned, their wings, and fell down.",
        "source": "The Diary of Samuel Pepys, entry for 2 September 1666, Project Gutenberg",
        "href": "https://www.gutenberg.org/ebooks/4167"
      },
      {
        "category": "literary",
        "title": "The Burning of Troy in Virgil's Aeneid",
        "excerpt": "The palace of Deiphobus ascends In smoky flames, and catches on his friends. Ucalegon burns next: the seas are bright With splendor not their own, and shine with Trojan light.",
        "source": "Virgil, Aeneid, Book II (Dryden translation), Perseus Digital Library",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0052:book=2:card=298"
      },
      {
        "category": "literary",
        "title": "The Rain of Fire in Dante's Inferno",
        "excerpt": "O'er all the sand-waste, with a gradual fall, Were raining down dilated flakes of fire, As of the snow on Alp without a wind.",
        "source": "Dante Alighieri, The Divine Comedy: Inferno, Canto XIV (Longfellow translation), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/1001/1001-h/1001-h.htm"
      },
      {
        "category": "artistic",
        "title": "J.M.W. Turner, The Burning of the Houses of Lords and Commons (1835)",
        "excerpt": "Turner, an eyewitness on the Thames, dissolves the stone of Parliament into a towering wall of orange and white flame that overwhelms the night sky and doubles itself in the water. Crowds press onto Westminster Bridge as spectators to a great public building consumed before them. The painting turns a civic catastrophe into a vision of nature's fire outstripping every human structure.",
        "source": "J.M.W. Turner, oil on canvas, 1835, Cleveland Museum of Art (1942.647), via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Joseph_Mallord_William_Turner_-_The_Burning_of_the_Houses_of_Lords_and_Commons,_16_October_1834_-_1942.647_-_Cleveland_Museum_of_Art.jpg",
        "image": {
          "src": "/covers/europe-wildfires-heatwave-evacuations--a4.png",
          "alt": "A great conflagration engulfing the Houses of Parliament at night, flames and smoke filling the sky and reflected in the River Thames as crowds watch from the bridge.",
          "credit": "J.M.W. Turner, The Burning of the Houses of Lords and Commons, 16 October 1834, 1835, Cleveland Museum of Art. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Karl Bryullov, The Last Day of Pompeii (1830–1833)",
        "excerpt": "Bryullov paints the AD 79 eruption of Vesuvius as a red-black sky raining ash and fire while terrified families flee amid collapsing statues and buildings. Mothers shield children, the old are carried on younger backs, and the whole crowd surges away from the flames toward the edge of the frame. It renders the ancient horror of a population driven en masse from a burning land, echoing today's coastal villagers fleeing the fire by sea.",
        "source": "Karl Bryullov, oil on canvas, 1830–1833, State Russian Museum, Saint Petersburg, via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Karl_Brullov_-_The_Last_Day_of_Pompeii_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/europe-wildfires-heatwave-evacuations--a5.png",
          "alt": "Panicked crowds flee through a Pompeiian street under a dark red sky lit by lightning and volcanic fire, as statues topple and buildings crumble around them.",
          "credit": "Karl Bryullov, The Last Day of Pompeii, 1830–1833, State Russian Museum, Saint Petersburg. Public domain via Wikimedia Commons."
        }
      }
    ],
    "rank": 31
  },
  {
    "slug": "doj-drops-reflecting-pool-case",
    "headline": "The Justice Department drops its vandalism case against a former Olympian, conceding the Lincoln Memorial Reflecting Pool damage came from a botched contractor job",
    "overview": "Federal prosecutors moved on 31 July to dismiss the criminal case charging former Olympian David Hearn with deliberately damaging the Lincoln Memorial Reflecting Pool, saying newly received Interior Department documents showed the damage stemmed from a 'flawed' and 'botched' installation by a contractor rushing to finish before America 250 celebrations, not vandalism. Hearn had faced up to 10 years in prison. The reversal was an embarrassment for a department that had promoted the prosecution as accountability for harm at a landmark where President Trump launched a major renovation ahead of the nation's 250th anniversary.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMipgFBVV95cUxNR3FFR1RadzVYZW44TWxxMzcwWi1FTElMbHQwdy1sdDRYRWhxeWZnOWZMRWpEaEdodDdWTUJWaHlzd21sWmc1U2FUcjg2bjhKR1NMMUIzM19mRnEySmJ5NGpLZ0ppVzJMYUpDWkhCWm5GWEhqdU92Q2psUFVNQUFxVl9IZTFfdjB6YXA1S0RjZ2owRndsdURBM0Y3cnRPaVNrcTJUX2xB?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cz05yx5dd7yo"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-01",
    "image": {
      "src": "/covers/doj-drops-reflecting-pool-case.png",
      "alt": "The Lincoln Memorial Reflecting Pool in Washington with the memorial mirrored in the water",
      "credit": "Lincoln Memorial Reflecting Pool, Washington, D.C. Wikimedia Commons."
    },
    "edition": "Morning Edition · 1 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The trial of Socrates (399 BCE)",
        "excerpt": "How you, O Athenians, have been affected by my accusers, I cannot tell; but I know that they almost made me forget who I was—so persuasively did they speak; and yet they have hardly uttered a word of truth.",
        "source": "Plato, Apology (trans. Benjamin Jowett), Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/1656/pg1656.txt"
      },
      {
        "category": "historical",
        "title": "The Dreyfus Affair and Zola's \"J'Accuse...!\" (1898)",
        "excerpt": "I accuse General Billot of having held in his hands the unquestionable evidence of Dreyfus's innocence and of suppressing it, guilty of this crime that injures humanity and justice, with a political aim and to save the compromised Chief of High Command. I accuse General De Boisdeffre and General Gonse as accomplices of the same crime, one undoubtedly by clerical passion, the other perhaps by this spirit of body which makes offices of the war an infallible archsaint.",
        "source": "Émile Zola, \"J'Accuse...!\", L'Aurore, 13 January 1898 (English translation, Wikisource)",
        "href": "https://en.wikisource.org/wiki/Translation:J'Accuse...!"
      },
      {
        "category": "literary",
        "title": "Franz Kafka, \"The Trial\" (1925)",
        "excerpt": "Someone must have been telling lies about Josef K., he knew he had done nothing wrong but, one morning, he was arrested.",
        "source": "Franz Kafka, The Trial (trans. David Wyllie), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/7849/7849-h/7849-h.htm"
      },
      {
        "category": "literary",
        "title": "Victor Hugo, \"Les Misérables\" — the Champmathieu affair",
        "excerpt": "Gentlemen of the jury, order the prisoner to be released! Mr. President, have me arrested. He is not the man whom you are in search of; it is I: I am Jean Valjean.",
        "source": "Victor Hugo, Les Misérables, Vol. 1, Bk. 7, Ch. 11 (trans. Isabel F. Hapgood), Wikisource",
        "href": "https://en.wikisource.org/wiki/Les_Mis%C3%A9rables/Volume_1/Book_Seventh/Chapter_11"
      },
      {
        "category": "artistic",
        "title": "Honoré Daumier, from the series \"Les Gens de Justice\" (Men of the Law)",
        "excerpt": "In his satirical series for the journal Le Charivari, Daumier stages the theatre of the courtroom: robed advocates striking grand, self-important poses while the ordinary person's fate hangs unregarded in the balance. The caricature strips the majesty from the machinery of justice, exposing the vanity, cynicism and self-protection of the men who administer it. It is a mordant reminder that a prosecution can be more about performance and institutional face-saving than about the truth of who did what.",
        "source": "Honoré Daumier, \"Les Gens de Justice\" series, published in Le Charivari",
        "href": "https://commons.wikimedia.org/wiki/File:Le_Charivari,_No._14,_Les_Gens_De_Justice,_No._14,_Les_Gens_De_Justice,_Honor%C3%A9_Daumier.JPG",
        "image": {
          "src": "/covers/doj-drops-reflecting-pool-case--a4.png",
          "alt": "Honoré Daumier lithograph from Les Gens de Justice satirizing lawyers and the French legal system.",
          "credit": "Honoré Daumier, Les Gens de Justice (published in Le Charivari), 19th century. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "William Holman Hunt, \"The Scapegoat\" (1854–1856)",
        "excerpt": "Hunt paints a single, exhausted goat abandoned on the salt-crusted, blood-red shore of the Dead Sea, the animal onto which, in the ancient Levitical rite, a whole community's sins were symbolically loaded before it was driven out to die. The innocent creature bears the weight of guilt that belongs to others, cast out so that the many may feel absolved. It is the visual archetype of scapegoating: the failure of the powerful transferred onto one blameless victim and sent into the wilderness.",
        "source": "William Holman Hunt, The Scapegoat, Lady Lever Art Gallery, Port Sunlight",
        "href": "https://commons.wikimedia.org/wiki/File:William_Holman_Hunt_-_The_Scapegoat.jpg",
        "image": {
          "src": "/covers/doj-drops-reflecting-pool-case--a5.png",
          "alt": "William Holman Hunt's painting The Scapegoat: a lone goat on the desolate salt flats by the Dead Sea.",
          "credit": "William Holman Hunt, The Scapegoat, 1854–1856, Lady Lever Art Gallery. Public domain via Wikimedia Commons."
        }
      }
    ],
    "rank": 32
  },
  {
    "slug": "us-visa-bond-program-permanent",
    "headline": "The State Department will make its visa-bond program permanent, requiring travelers from about 50 countries, mostly in Africa, to post bonds of up to $20,000",
    "overview": "The State Department is making permanent a pilot program that requires visa applicants from about 50 countries, most of them in Africa, to post refundable bonds, and is raising the maximum bond to $20,000 from $15,000, according to a draft Federal Register notice published on 31 July. Officials said a nearly year-long review showed the requirement sharply curbed visa overstays, citing fewer than 50 overstays from those countries in the pilot's first 10 months against about 45,500 in 2024. Critics say it places an unfair burden on visitors from poorer nations seeking to see family or study.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMirwFBVV95cUxObXZGQ2ZieTZMNTdFc1JubVRaY0dubDRXaFhfZGx0WjVwU3psc0lOdmFPT3lLQ0NGbEV4ekUzd2pIOThibHBIVVo0aW9yUEdybnhUX3ZxOS1OVVhZSFhOTGlCN0xOWGJ5MjNKTmtaUWJubkZWenZUUzZhdUtJYV9pWUxmb1hxTUZCb1pDRUI5T01jSnVZLXZfaW9FOXdNVno0T2tqY2VXVnhxWGFodTk4?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMipwFBVV95cUxPVzlLSWZRazMxRDYzOEoyR2s4TUd2czgtdkt3ejMydU5tOWRWZU5VanB3WDF1SmpWNGt1M0pJcGJqUGNTU2o4a0hrX2Ftdmp2MnJPeXdVVkh0a0tLbVhscWhHZ1JQczZHT3pvZmZNUjViekVqYnIwWHNPaVNKYjZvTmhET05TUUxuR3FKbkZmcjRLWnRYMWRVeXF0cXg3NXluUDVEOE5GTQ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-01",
    "image": {
      "src": "/covers/us-visa-bond-program-permanent.png",
      "alt": "A United States passport with its gold eagle emblem on the dark blue cover",
      "credit": "A United States passport. Wikimedia Commons."
    },
    "edition": "Morning Edition · 1 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Athens and the metic tax: foreigners paying for the right to reside (Xenophon, c. 355 BC)",
        "excerpt": "For in them we have one of the very best sources of revenue, in my opinion, inasmuch as they are self-supporting and, so far from receiving payment for the many services they render to states, they contribute by paying a special tax.",
        "source": "Xenophon, Ways and Means (Poroi) 2.1, trans. E. C. Marchant",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Xen.+Ways+2.1"
      },
      {
        "category": "historical",
        "title": "The fifty-cent head tax at the gate of Ellis Island America (Immigration Act of 1882)",
        "excerpt": "That there shall be levied, collected, and paid a duty of fifty cents for each and every passenger not a citizen of the United States who shall come by steam or sail vessel from a foreign port to any port within the United States.",
        "source": "Immigration Act of August 3, 1882, 22 Stat. 214, U.S. Statutes at Large",
        "href": "https://www.govinfo.gov/content/pkg/STATUTE-22/pdf/STATUTE-22-Pg214.pdf"
      },
      {
        "category": "literary",
        "title": "Emma Lazarus, \"The New Colossus\" (1883): the golden door of welcome",
        "excerpt": "\"Keep, ancient lands, your storied pomp!\" cries she\nWith silent lips. \"Give me your tired, your poor,\nYour huddled masses yearning to breathe free,\nThe wretched refuse of your teeming shore.\nSend these, the homeless, tempest-tost to me,\nI lift my lamp beside the golden door!\"",
        "source": "Emma Lazarus, \"The New Colossus\" (1883)",
        "href": "https://en.wikisource.org/wiki/The_New_Colossus"
      },
      {
        "category": "literary",
        "title": "Homer, Odyssey, Book 6: the sacred duty of welcoming the stranger at the shore",
        "excerpt": "For from Zeus are all strangers and beggars, and a gift, though small, is welcome. Come, then, my maidens, give to the stranger food and drink, and bathe him in the river in a spot where there is shelter from the wind.",
        "source": "Homer, Odyssey 6.207-210, trans. A. T. Murray (Loeb Classical Library, 1919)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0136:book%3D6:card%3D186"
      },
      {
        "category": "artistic",
        "title": "Ford Madox Brown, \"The Last of England\" (1855): emigrants staking everything on departure",
        "excerpt": "A young couple, wind-bitten and grim, huddle at a ship's rail as the white cliffs of home recede behind them, the wife's hand clasping the tiny fingers of a baby hidden beneath her cloak. Brown paints emigration not as adventure but as reluctant exile, the fare paid and the future uncertain. Every face on the crowded deck weighs the cost of crossing against the hope of a life elsewhere.",
        "source": "Ford Madox Brown, oil on panel, 1855, Birmingham Museum and Art Gallery",
        "href": "https://commons.wikimedia.org/wiki/File:Ford_Madox_Brown_-_The_Last_of_England_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/us-visa-bond-program-permanent--a4.png",
          "alt": "A young emigrant couple in Victorian dress sit at the rail of a departing ship, faces set against the cold sea wind, the wife sheltering an infant beneath her cloak as the coast of England fades behind them.",
          "credit": "Ford Madox Brown, \"The Last of England,\" 1855, Birmingham Museum and Art Gallery. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Antonin Dvorak, Symphony No. 9 \"From the New World\" (1893): the newcomer's music of longing and arrival",
        "excerpt": "Composed by a Czech immigrant during his years in the United States, the symphony braids melodies that evoke both a distant homeland and an unfamiliar new land. Its famous Largo swells with homesickness and hope in the same breath, the sound of someone far from family reaching toward an uncertain welcome. It is the immigrant experience rendered as orchestral yearning, dignity and dislocation held together.",
        "source": "Antonin Dvorak, Symphony No. 9 in E minor, Op. 95 (1893), full score, IMSLP",
        "href": "https://imslp.org/wiki/Symphony_No.9,_Op.95_(Dvo%C5%99%C3%A1k,_Anton%C3%ADn)"
      }
    ],
    "rank": 33
  },
  {
    "slug": "deepseek-v4-flash-open-weights",
    "headline": "China's DeepSeek releases V4-Flash, a 304-billion-parameter open-weights model priced far below rivals of similar ability",
    "overview": "The Chinese lab DeepSeek released DeepSeek-V4-Flash-0731 on 31 July, a 304-billion-parameter open-weights model, roughly 167GB on Hugging Face, that it says brings substantially stronger agentic and reasoning capabilities. Independent testing by Artificial Analysis placed it ahead of the larger MiniMax M3 on its intelligence index while pricing it at about $0.14 per million input tokens and $0.27 per million output tokens, a fraction of what comparable models charge. Reviewers called it one of the best value-for-intelligence models available.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Simon Willison's Weblog",
        "href": "https://simonwillison.net/2026/Jul/31/deepseek-v4-flash-0731/"
      },
      {
        "name": "Hugging Face",
        "href": "https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-01",
    "image": {
      "src": "/covers/deepseek-v4-flash-open-weights.png",
      "alt": "A close-up of a computer processor chip and its array of connector pins",
      "credit": "A computer processor. Wikimedia Commons."
    },
    "edition": "Morning Edition · 1 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Gutenberg prints the Bible in Mainz (1454-1455)",
        "excerpt": "Johannes Gutenberg's movable-type press turned a costly, hand-copied luxury into a reproducible object, printing roughly 180 copies of a large-format Bible that a lone scribe would have needed years to duplicate. Text that had been locked inside monasteries and the purses of the wealthy could suddenly be multiplied cheaply and spread across Europe. Just as DeepSeek hands out open weights that undercut far pricier rivals, Gutenberg's cheap, replicable technology collapsed the cost of duplicating knowledge and put it into far more hands.",
        "source": "The Gutenberg Bible, Library of Congress",
        "href": "https://www.loc.gov/item/2002715914/"
      },
      {
        "category": "historical",
        "title": "Stallman's GNU Manifesto and the free-software movement (1985)",
        "excerpt": "In 1985 Richard Stallman published the GNU Manifesto, calling for a complete operating system whose source code anyone could read, run, copy and modify without permission or fee. He reframed software not as proprietary property to be locked away, but as shared knowledge that users had a right to inspect and improve, seeding the open-source ecosystem that now underpins the internet. DeepSeek's decision to release its 304-billion-parameter model as open weights extends the same logic to artificial intelligence: powerful tools given away for others to study, run, and build on rather than rented from a closed vendor.",
        "source": "The GNU Manifesto, Richard Stallman / GNU Project",
        "href": "https://www.gnu.org/gnu/manifesto.html"
      },
      {
        "category": "literary",
        "title": "Milton, Areopagitica (1644)",
        "excerpt": "as good almost kill a man as kill a good book. Who kills a man kills a reasonable creature, God's image; but he who destroys a good book, kills reason itself, kills the image of God, as it were in the eye.",
        "source": "John Milton, Areopagitica (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/608/608-h/608-h.htm"
      },
      {
        "category": "literary",
        "title": "Victor Hugo, Notre-Dame de Paris, \"This Will Kill That\" (1832)",
        "excerpt": "This will kill that. The book will kill the edifice.",
        "source": "Victor Hugo, Notre-Dame de Paris, Book Fifth, Ch. II (Hapgood trans., Wikisource)",
        "href": "https://en.wikisource.org/wiki/Notre-Dame_de_Paris_(Hapgood)/Book_Fifth/Chapter_II"
      },
      {
        "category": "artistic",
        "title": "Jost Amman, \"Der Buchdrucker\" (The Book Printer), woodcut from Das Standebuch (1568)",
        "excerpt": "Jost Amman's woodcut for Hans Sachs's Book of Trades shows a busy print shop: a pressman hauling the great screw of the press, an inker dabbing the type, and freshly printed sheets stacking up. Made barely a century after Gutenberg, the image celebrates printing as an ordinary craft rather than a marvel, a trade whose whole purpose was to churn out identical copies for anyone who could buy them. It captures visually what DeepSeek does for AI: the machinery of reproduction, once dazzling, becomes cheap, repeatable, and widely shared.",
        "source": "Jost Amman, Das Standebuch (1568), Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Buchdrucker-1568.png",
        "image": {
          "src": "/covers/deepseek-v4-flash-open-weights--a4.png",
          "alt": "1568 woodcut of a Renaissance printing workshop, with a pressman working a large screw press while an assistant inks the type and printed sheets are set aside.",
          "credit": "Jost Amman, \"Der Buchdrucker\" (The Book Printer), woodcut from Das Standebuch, 1568. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Martin Luther, chorale \"Ein feste Burg ist unser Gott\" (c. 1529)",
        "excerpt": "Luther wrote both the German words and the melody of \"A Mighty Fortress Is Our God,\" a hymn meant to be sung by ordinary congregations in their own tongue rather than chanted by clergy in Latin. By handing sacred music to the people to sing for themselves, he turned worship into something participatory and portable, spread by the same cheap print that carried his vernacular Bible. Like an open-weights model released for anyone to run, the chorale was designed to be freely reproduced, shared, and made the common property of all who wanted it.",
        "source": "Martin Luther, Ein feste Burg ist unser Gott (IMSLP / Petrucci Music Library)",
        "href": "https://imslp.org/wiki/Ein_feste_Burg_ist_unser_Gott_(Luther,_Martin)"
      }
    ],
    "rank": 34
  },
  {
    "slug": "broad-peak-avalanche-climbers",
    "headline": "An avalanche on Pakistan's Broad Peak kills at least four of 10 climbers, including American Mallory Geis, as a team led by Nirmal Purja is buried",
    "overview": "An avalanche swept a 10-member expedition on Broad Peak, an 8,000-metre summit in Pakistan's Karakoram range, with rescuers recovering at least four bodies by 31 July, among them American climber Mallory Geis, Omani mountaineer Nadhira Al Harthy and Nepali climber Pur Bahadur Gurung. The team was led by the celebrated Nepali climber Nirmal Purja, known as 'Nims Dai,' who in 2019 scaled all 14 of the world's 8,000-metre peaks in about six months and who was among those still missing. Drone footage suggested more bodies remained on the mountain, and the search was paused until Saturday.",
    "genre": "Climate",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMirwFBVV95cUxOYnFLSTBFRVdZS3BrQTM5LXl1Mk5mNi10MEZYR1lURDJMZ1laM0FqS1FYbklaTngyYnVWUTlUX2QtU3RHTjVWQ2llUGotNmNhUGZxWmk3NHY0S0xWVi1iR3JRRDNnSk8xSENTNUdQY21HM2VaclQ4akJQTEphbklLWHlHMk5teDUtaHRoaU1DbnZTRUpVUXgtV3A5T2NrYUhDT0JxVHAwZUt5YUM5Yi1Z?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cddjz1r01l8o"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-01",
    "image": {
      "src": "/covers/broad-peak-avalanche-climbers.png",
      "alt": "The snow-covered summit of Broad Peak in Pakistan's Karakoram range under a clear sky",
      "credit": "Broad Peak, Karakoram, Pakistan. Wikimedia Commons."
    },
    "edition": "Morning Edition · 1 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Hannibal's army perishing in the snows of the Alps (218 BC)",
        "excerpt": "Neither were there any stems or roots about, by which a man could pull himself up with foot or hand—only smooth ice and thawing snow, on which they were continually rolling. But the baggage animals, as they went over the snow, would sometimes even cut into the lowest crust, and pitching forward and striking out with their hoofs, as they struggled to rise, would break clean through it, so that numbers of them were caught fast, as if entrapped, in the hard, deep-frozen snow.",
        "source": "Livy, The History of Rome, Book 21, chapter 36 (Rev. Canon Roberts translation), Perseus Digital Library",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=urn:cts:latinLit:phi0914.phi00121.perseus-eng1:36"
      },
      {
        "category": "historical",
        "title": "George Mallory and Andrew Irvine lost near the summit of Everest (1924)",
        "excerpt": "In his last letter to his wife Ruth before the fatal attempt, Mallory wrote: \"It is 50 to 1 against us but we'll have a whack yet & do ourselves proud.\" He closed, \"The candle is burning out and I must stop.\" The two men were seen \"going strong for the top\" through a break in the cloud and never returned; Mallory's body was found in 1999, Irvine's fate still uncertain.",
        "source": "The George Mallory letters, digitised archive, Magdalene College, Cambridge",
        "href": "https://magdalene.maxarchiveservices.co.uk/index.php/mallory-george-herbert-leigh"
      },
      {
        "category": "literary",
        "title": "Longfellow's \"Excelsior\" — the youth who climbs to his death in the snow (1841)",
        "excerpt": "A traveller, by the faithful hound, / Half-buried in the snow was found, / Still grasping in his hand of ice / That banner with the strange device, / Excelsior! There in the twilight cold and gray, / Lifeless, but beautiful, he lay, / And from the sky, serene and far, / A voice fell, like a falling star, / Excelsior!",
        "source": "Henry Wadsworth Longfellow, \"Excelsior\" (1841), Wikisource",
        "href": "https://en.wikisource.org/wiki/Excelsior_(Longfellow)"
      },
      {
        "category": "literary",
        "title": "Shelley's \"Mont Blanc\" — the sublime and deadly mountain (1817)",
        "excerpt": "A desert peopled by the storms alone, / Save when the eagle brings some hunter's bone, / And the wolf tracks her there—how hideously / Its shapes are heaped around! rude, bare, and high, / Ghastly, and scarred, and riven.",
        "source": "Percy Bysshe Shelley, \"Mont Blanc\" (1817), in The Complete Poetical Works of Percy Bysshe Shelley (ed. Hutchinson, 1914), Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Complete_Poetical_Works_of_Percy_Bysshe_Shelley_(ed._Hutchinson,_1914)/Mont_Blanc"
      },
      {
        "category": "artistic",
        "title": "Caspar David Friedrich, \"The Sea of Ice\" (Das Eismeer), 1823–1824",
        "excerpt": "Friedrich's canvas heaves with jagged slabs of ice thrust upward into a frozen pyramid, the wreck of a ship crushed and nearly swallowed at the lower right. The tiny vessel is overwhelmed utterly by the indifferent, sublime violence of the polar cold. It stands as Romanticism's starkest image of human ambition annihilated by nature's immensity — the same terrible beauty that draws climbers to the high Karakoram and buries them there.",
        "source": "Caspar David Friedrich, The Sea of Ice (Das Eismeer), 1823–1824, Hamburger Kunsthalle, via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Caspar_David_Friedrich_-_Das_Eismeer_-_Hamburger_Kunsthalle_-_02.jpg",
        "image": {
          "src": "/covers/broad-peak-avalanche-climbers--a4.png",
          "alt": "Painting of a shattered field of ice slabs piled into a jagged peak, with a small crushed ship half-buried at the right, under a pale cold sky.",
          "credit": "Caspar David Friedrich, The Sea of Ice (Das Eismeer), 1823–1824, Hamburger Kunsthalle. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Richard Strauss, \"Eine Alpensinfonie\" (An Alpine Symphony), Op. 64 (1915)",
        "excerpt": "Strauss traces a single day's mountain ascent across twenty-two continuous sections, from the darkness of \"Nacht\" through the shining exertion of \"Der Anstieg\" (The Ascent) to the blazing brass triumph of \"Auf dem Gipfel\" (On the Summit). Then the sky turns: \"Gewitter und Sturm, Abstieg\" (Thunder and Storm, Descent) unleashes wind machine, thunder sheet and organ as the climber is driven down the mountain. The music enacts exactly the arc of Broad Peak — aspiration to the heights, then nature's overwhelming force — before sinking back into the closing night.",
        "source": "Richard Strauss, Eine Alpensinfonie, Op. 64 (first published 1915), full score, IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Eine_Alpensinfonie,_Op.64_(Strauss,_Richard)"
      }
    ],
    "rank": 35
  },
  {
    "slug": "amsterdam-worldpride-opens",
    "headline": "WorldPride's canal parade opens in Amsterdam under heavy security days after a deadly car attack on Berlin's Pride",
    "overview": "Hundreds of thousands of people gathered along Amsterdam's canals on 1 August for the flagship boat parade of WorldPride, held under tightened security days after a man drove a car into a crowd at the close of Berlin Pride, killing one woman and injuring 29. Authorities placed some 250 concrete blocks along the canals and stepped up bag searches for the two-week event, which runs to 8 August under the slogan 'UNITY.' Thousands had earlier gathered at Amsterdam's Homomonument to commemorate the Berlin victims.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiswFBVV95cUxQYUR4aERLVE00azhSZHJQbWZZUktuVmNhYkFKb1lTWUhEcS1CS3dIbEdJREpybnlaRk01elZwWi1EMlNLV290anVpWTltNDNON1p0em1LLXBraWlSTzhMOVAydVM0NFhSR1dZNE8wRzJvaC16dGlPUkVoM25ZRjZvejNTMzRZZWZNMEE4UnRJN2JWTDc2VTdYblhiNnlYQVhnUmVxQktVSlJ2VWgtZVJfWFBuUQ?oc=5"
      },
      {
        "name": "DutchNews.nl",
        "href": "https://www.dutchnews.nl/2026/07/amsterdam-steps-up-pride-security-in-wake-of-attack-in-berlin/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-01",
    "image": {
      "src": "/covers/amsterdam-worldpride-opens.png",
      "alt": "Crowds line an Amsterdam canal as decorated boats pass during the Pride canal parade",
      "credit": "Amsterdam Canal Pride parade. Wikimedia Commons."
    },
    "edition": "Morning Edition · 1 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Pericles' Funeral Oration at Athens' public burial of the war dead (431 BC)",
        "excerpt": "Further, we provide plenty of means for the mind to refresh itself from business. We celebrate games and sacrifices all the year round, and the elegance of our private establishments forms a daily source of pleasure and helps to banish the spleen…",
        "source": "Thucydides, History of the Peloponnesian War, Book 2 (Pericles' Funeral Oration), trans. Richard Crawley — Wikisource",
        "href": "https://en.wikisource.org/wiki/History_of_the_Peloponnesian_War/Book_2"
      },
      {
        "category": "historical",
        "title": "The Stonewall uprising, Greenwich Village, 28 June 1969",
        "excerpt": "In the early hours of 28 June 1969, patrons of the Stonewall Inn fought back against a police raid, and the resistance spilled into days of defiant street demonstrations. Out of that grief and rage grew the first Pride marches the following summer, turning persecution into an annual public celebration of visibility and solidarity. Every canal parade and rainbow procession since traces its lineage to that uprising.",
        "source": "The Stonewall Uprising, June 1969 — Library of Congress, LGBTQIA+ Studies Research Guide",
        "href": "https://guides.loc.gov/lgbtq-studies/stonewall-era"
      },
      {
        "category": "literary",
        "title": "Walt Whitman, \"For You, O Democracy\" (Calamus, Leaves of Grass)",
        "excerpt": "Come, I will make the continent indissoluble,\nI will make the most splendid race the sun ever shone upon,\nI will make divine magnetic lands,\nWith the love of comrades,\nWith the life-long love of comrades.",
        "source": "Walt Whitman, 'For You, O Democracy,' from the 'Calamus' cluster of Leaves of Grass — Project Gutenberg",
        "href": "https://www.gutenberg.org/files/1322/1322-h/1322-h.htm"
      },
      {
        "category": "literary",
        "title": "Alfred, Lord Tennyson, In Memoriam A.H.H., Canto 27",
        "excerpt": "I hold it true, whate'er befall;\nI feel it, when I sorrow most;\n'Tis better to have loved and lost\nThan never to have loved at all.",
        "source": "Alfred, Lord Tennyson, In Memoriam A.H.H., Canto 27 — Wikisource",
        "href": "https://en.wikisource.org/wiki/In_Memoriam_(Tennyson)/Canto_27"
      },
      {
        "category": "artistic",
        "title": "Pieter Bruegel the Elder, The Fight Between Carnival and Lent (1559)",
        "excerpt": "Bruegel packs a Flemish town square with nearly two hundred revelers: a portly figure of Carnival astride a wine barrel jousts against the gaunt personification of Lent, while musicians, dancers, maskers, and beggars throng the streets. The panel frames festival as a whole community's ritual — a boisterous, defiant public celebration staged in the open air. Its teeming procession of ordinary people prefigures the massed, joyful crowds lining Amsterdam's canals.",
        "source": "Pieter Bruegel the Elder, The Fight Between Carnival and Lent, 1559 — Kunsthistorisches Museum, Vienna (object page)",
        "href": "https://www.khm.at/en/artworks/the-fight-between-carnival-and-lent-320",
        "image": {
          "src": "/covers/amsterdam-worldpride-opens--a4.png",
          "alt": "A crowded 16th-century Flemish town square where a rotund Carnival figure on a wine barrel mock-jousts a thin Lent figure, surrounded by nearly two hundred townspeople feasting, dancing, and processing.",
          "credit": "Pieter Bruegel the Elder, The Fight Between Carnival and Lent, 1559, Kunsthistorisches Museum, Vienna. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Ludwig van Beethoven, Symphony No. 9 in D minor, Op. 125 (\"Ode to Joy\"), 1824",
        "excerpt": "Composed as Beethoven was losing his hearing, the Ninth's choral finale sets Schiller's ode whose refrain proclaims that all people shall become brothers ('Alle Menschen werden Brüder'). Voices and orchestra surge into a universal anthem of human fellowship that has since become an emblem of unity, adopted as the anthem of Europe. Its joy wrested from struggle mirrors a Pride crowd singing together in defiance of violence.",
        "source": "Ludwig van Beethoven, Symphony No. 9, Op. 125, full score — IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Symphony_No.9,_Op.125_(Beethoven,_Ludwig_van)"
      }
    ],
    "rank": 36
  },
  {
    "slug": "cwas-david-malin-astrophotography-awards",
    "headline": "Stefan Buda's lunar-mountain portrait wins the 2026 CWAS David Malin Awards for astrophotography in Australia",
    "overview": "The Central West Astronomical Society announced the winners of its 2026 David Malin Awards, Australia's premier astrophotography competition, on 31 July, with Stefan Buda's 'The Lunar Apennines,' a finely detailed study of the Moon's Montes Apenninus shot with a home-built 405mm telescope, taking the overall prize. Judges reviewed more than 200 entries across seven categories, from deep-sky nebulae to nightscapes, honouring images such as Frank Alvaro's 'A Dragon's Egg in a Gossamer Cocoon.' The awards are named for the pioneering British-Australian astronomical photographer David Malin.",
    "genre": "Science",
    "sources": [
      {
        "name": "Colossal",
        "href": "https://www.thisiscolossal.com/2026/07/winning-photos-cwas-astrofest-space-astrophotography/"
      },
      {
        "name": "David Malin Awards",
        "href": "https://www.davidmalinawards.com/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-01",
    "image": {
      "src": "/covers/cwas-david-malin-astrophotography-awards.png",
      "alt": "An astronaut, lunar rover and lunar module on the Moon with the Apennine mountains rising behind",
      "credit": "NASA, Apollo 15 at Hadley-Apennine, 1971. Public domain via Wikimedia Commons."
    },
    "edition": "Morning Edition · 1 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Galileo turns his new telescope on the Moon (Sidereus Nuncius, 1610)",
        "excerpt": "it is full of inequalities, uneven, full of hollows and protuberances, just like the surface of the Earth itself, which is varied everywhere by lofty mountains and deep valleys.",
        "source": "Galileo Galilei, The Sidereal Messenger (Sidereus Nuncius), trans. Edward Stafford Carlos, 1880 — Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Sidereal_Messenger_of_Galileo_Galilei/The_Sidereal_Messenger",
        "image": {
          "src": "/covers/cwas-david-malin-astrophotography-awards--a0.png",
          "alt": "Galileo's ink-wash sketches of the Moon showing its mountainous, cratered surface, from Sidereus Nuncius (1610)",
          "credit": "Galileo Galilei, sketches of the Moon from Sidereus Nuncius, 1610 (Istituto e Museo di Storia della Scienza, Florence). Public domain via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "John W. Draper makes the first photograph of the Moon (New York, 1840)",
        "excerpt": "From a rooftop observatory at New York University in March 1840, the chemist John William Draper aimed a lens at the Moon and fixed its cratered face onto a silver daguerreotype plate — the first successful astronomical photograph. Where Buda now resolves the lunar Apennines with a home-built telescope and a camera, Draper needed a long, patient exposure and a plate coated by hand. Both are the same human impulse two centuries apart: to not merely gaze at the Moon but to capture it, and to prove that a new instrument can bring the heavens down to Earth.",
        "source": "\"The John Draper Lunar Daguerreotype\" — New York University Division of Libraries",
        "href": "https://library.nyu.edu/about/events-exhibitions/exhibitions/draper-daguerreotype/",
        "image": {
          "src": "/covers/cwas-david-malin-astrophotography-awards--a1.png",
          "alt": "John W. Draper's 1840 daguerreotype of the Moon, the first astronomical photograph, showing a faint mottled lunar disc",
          "credit": "John W. Draper, first photograph of the Moon, 1840. Public domain via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Walt Whitman, \"When I Heard the Learn'd Astronomer\"",
        "excerpt": "Till rising and gliding out I wander'd off by myself,\nIn the mystical moist night-air, and from time to time,\nLook'd up in perfect silence at the stars.",
        "source": "Walt Whitman, \"When I Heard the Learn'd Astronomer\" — Wikisource",
        "href": "https://en.wikisource.org/wiki/McClure%27s_Magazine/Volume_9/Number_6/When_I_Heard_the_Learn%27d_Astronomer"
      },
      {
        "category": "literary",
        "title": "Dante, the closing vision of the Paradiso (Canto XXXIII)",
        "excerpt": "Here vigour failed the lofty fantasy:\nBut now was turning my desire and will,\nEven as a wheel that equally is moved,\nThe Love which moves the sun and the other stars.",
        "source": "Dante Alighieri, The Divine Comedy, Paradiso, Canto XXXIII, trans. Henry Wadsworth Longfellow, 1867 — Wikisource",
        "href": "https://en.wikisource.org/wiki/Divine_Comedy_(Longfellow_1867)/Volume_3/Canto_33"
      },
      {
        "category": "artistic",
        "title": "Vincent van Gogh, \"The Starry Night\" (1889)",
        "excerpt": "From the window of his asylum room at Saint-Rémy, Van Gogh painted the night sky not as it is but as it feels: swirling currents of blue and a Moon and stars blazing in halos of thick, turning paint. It is the wonder side of the same coin as astrophotography — where Buda's prize-winning image renders the lunar Apennines with instrumental precision, Van Gogh renders the heavens with the eye and the hand. Together they mark the two ways humanity answers the night sky: measure it exactly, or feel it deeply.",
        "source": "Vincent van Gogh, \"The Starry Night\", 1889 — The Museum of Modern Art (MoMA)",
        "href": "https://www.moma.org/collection/works/79802",
        "image": {
          "src": "/covers/cwas-david-malin-astrophotography-awards--a4.png",
          "alt": "Van Gogh's The Starry Night: a swirling blue night sky over a village, with a bright crescent moon and radiant stars",
          "credit": "Vincent van Gogh, The Starry Night, 1889, oil on canvas (Museum of Modern Art, New York). Public domain via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Claude Debussy, \"Clair de lune\" from Suite bergamasque (1905)",
        "excerpt": "Debussy's most famous piano piece translates moonlight into sound: hushed, floating chords that seem to hang in still night air, swelling and receding like light moving across a landscape. Inspired by Verlaine's poem of the same name, it captures the Moon as mood rather than map. Where Buda's telescope resolves the sharp ridges of the lunar Apennines, Debussy dissolves the Moon into shimmer — the night sky as pure atmosphere, the softer counterpart to the astrophotographer's precision.",
        "source": "Claude Debussy, Suite bergamasque, L. 75 (No. 3, \"Clair de lune\"), first published 1905 — IMSLP / Petrucci Music Library (free score)",
        "href": "https://imslp.org/wiki/Suite_bergamasque_(Debussy,_Claude)"
      }
    ],
    "rank": 37
  },
  {
    "slug": "puerto-rico-esencia-coastal-development",
    "headline": "Puerto Rico approves a $2 billion luxury resort in Cabo Rojo over objections from environmentalists",
    "overview": "Puerto Rico's government has authorized construction of Esencia, a roughly $2 billion luxury development on about 2,000 acres of coastline in the southwestern town of Cabo Rojo, over the objections of environmentalists who warn it will strain the U.S. territory's water and power and threaten wildlife. Backed by the global investment firm Reuben Brothers and developer Three Rules Capital, the project is to include 500 hotel rooms, 1,200 private residences, two golf courses, an equestrian centre, a school and a 24-hour medical centre. The developers say more than 75% of the site will be conservation and green space, including restored wetlands and dunes.",
    "genre": "Economy",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMiogFBVV95cUxQRzJ4NnpQSGQtRFBOcnRQeDV4VXhZT3VOZXBzQWNyWktXMml1ekwtVC11Mlp3M3RfYmJTcWo5ZzdlTDBfa3AtZTNVUkJGeUotLXdGUHBlN0l4MklucmRjaTdVWGlXaVJwTXMtODBVMlY1WFVPczVDXzN1OEloWExHY1RiOEdVRkNpNWtIOGtnWEpYd0RfMlJ3dUNoblEzcG5MN2c?oc=5"
      },
      {
        "name": "ABC News",
        "href": "https://abcnews.com/Business/wireStory/puerto-rico-authorizes-2-billion-coastal-luxury-development-135275208"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-01",
    "image": {
      "src": "/covers/puerto-rico-esencia-coastal-development.png",
      "alt": "An undeveloped tropical islet and shallow turquoise water off the coast of Cabo Rojo, Puerto Rico",
      "credit": "Isla de los Ratones, off Cabo Rojo, Puerto Rico. Wikimedia Commons."
    },
    "edition": "Morning Edition · 1 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Pliny the Elder warns that great estates ruined Italy",
        "excerpt": "verumque confitentibus latifundia perdidere Italiam, iam vero et provincias — sex domini semissem Africae possidebant, cum interfecit eos Nero princeps. (To confess the truth, the great estates have been the ruin of Italy, and now of the provinces too: six owners were in possession of one half of Africa, at the time when the Emperor Nero had them put to death.)",
        "source": "Pliny the Elder, Natural History, Book XVIII.35 (1st century AD); Latin text via LacusCurtius, University of Chicago",
        "href": "https://penelope.uchicago.edu/Thayer/L/Roman/Texts/Pliny_the_Elder/18*.html"
      },
      {
        "category": "historical",
        "title": "The Diggers protest the enclosure of England's commons",
        "excerpt": "the earth was not made purposely for you, to be Lords of it, and we to be your Slaves, Servants, and Beggers; but it was made to be a common Livelihood to all, without respect of persons ... some of you, that have been Lords of Manors, do cause the Trees and Woods that grow upon the Commons, which you pretend a Royalty unto, to be cut down and sold, for your own private use.",
        "source": "Gerrard Winstanley, A Declaration from the Poor Oppressed People of England (1649)",
        "href": "https://jacklynch.net/Texts/winstanley.html"
      },
      {
        "category": "literary",
        "title": "Goldsmith mourns a village emptied by wealth",
        "excerpt": "Ill fares the land, to hastening ills a prey, / Where wealth accumulates, and men decay: / Princes and lords may flourish, or may fade; / A breath can make them, as a breath has made:",
        "source": "Oliver Goldsmith, The Deserted Village (1770); Project Gutenberg",
        "href": "https://www.gutenberg.org/files/50500/50500-h/50500-h.htm"
      },
      {
        "category": "literary",
        "title": "The expulsion from the garden of Eden",
        "excerpt": "Therefore the LORD God sent him forth from the garden of Eden, to till the ground from whence he was taken. So he drove out the man; and he placed at the east of the garden of Eden Cherubims, and a flaming sword which turned every way, to keep the way of the tree of life.",
        "source": "Genesis 3:23–24, King James Version (1611); Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Genesis"
      },
      {
        "category": "artistic",
        "title": "Thomas Cole, The Consummation of Empire",
        "excerpt": "At the zenith of Cole's five-part allegory, the wild harbor of the earlier canvases has vanished beneath a blazing marble metropolis of colonnades, triumphal processions, and gilded crowds. Luxury fills every inch of the once-forested shore, and the single green tree of the wilderness has given way to columns and statuary. The very splendor is the warning: the next painting in the series shows the same city sacked, and the last shows it a ruin overtaken by weeds.",
        "source": "Thomas Cole, The Consummation of Empire, from The Course of Empire (1836), New-York Historical Society",
        "href": "https://commons.wikimedia.org/wiki/File:Cole_Thomas_The_Consummation_The_Course_of_the_Empire_1836.jpg",
        "image": {
          "src": "/covers/puerto-rico-esencia-coastal-development--a4.png",
          "alt": "An opulent classical city of marble colonnades, temples, and crowds thronging a harbor at the height of its wealth and empire",
          "credit": "Thomas Cole, The Consummation of Empire (1836), New-York Historical Society. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Frederic Edwin Church, El Rio de Luz (The River of Light)",
        "excerpt": "Church's last great tropical landscape shows a river at dawn, its still water glowing beneath mist as palms and dense jungle crowd an untouched shore. No building, road, or human figure breaks the primeval calm; the paradise is complete precisely because it remains undeveloped. It is the 'before' image — the luminous, unspoiled tropical coast that golf courses and a thousand residences are built to erase.",
        "source": "Frederic Edwin Church, El Rio de Luz (The River of Light) (1877), National Gallery of Art, Washington, D.C.",
        "href": "https://www.nga.gov/artworks/50299-el-rio-de-luz-river-light",
        "image": {
          "src": "/covers/puerto-rico-esencia-coastal-development--a5.png",
          "alt": "A misty tropical river at dawn glowing with golden light, framed by palms and dense untouched jungle with no sign of human presence",
          "credit": "Frederic Edwin Church, El Rio de Luz (The River of Light) (1877), National Gallery of Art, Washington, D.C. Public domain via Wikimedia Commons."
        }
      }
    ],
    "rank": 38
  },
  {
    "slug": "adelene-koh-bookbinding-sculptures",
    "headline": "Singaporean book artist Adelene Koh turns hidden bookbinding techniques into intricate paper-and-thread sculptures",
    "overview": "The Taiwan-based Singaporean bookmaker and conservator Adelene Koh, profiled on 31 July, builds sculptures that bring the concealed craft of bookbinding into view, stitching meticulously folded paper with brightly coloured thread using traditional 18th- and 19th-century English endband techniques. Her cylindrical work 'Endless' resembles a book's spine and fore-edge fused into an unbroken loop. Koh, who runs a studio called dddots, was among 30 finalists chosen from more than 5,100 entries for the 2026 Loewe Foundation Craft Prize.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Colossal",
        "href": "https://www.thisiscolossal.com/2026/07/adelene-koh-bookbinding-paper-sewing-sculpture-loewe-craft-prize/"
      },
      {
        "name": "Loewe Foundation Craft Prize",
        "href": "https://craftprize.loewe.com/en/craftprize2026"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-01",
    "image": {
      "src": "/covers/adelene-koh-bookbinding-sculptures.png",
      "alt": "Four hand-sewn book headbands in coloured thread at the spine of bound books",
      "credit": "Hand-sewn book headbands (endbands). Wikimedia Commons."
    },
    "edition": "Morning Edition · 1 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The medieval scriptorium and the Chi Rho page of the Book of Kells",
        "excerpt": "Made around A.D. 800 by Insular monks, folio 34r turns two Greek letters into a labyrinth of spirals, interlace and hidden creatures, where moths, cats, mice and angels lurk in the abstract knotwork. Every hairline was drawn by hand with a patience that could consume a lifetime, transforming ink, vellum and thread into an object treated as literally sacred. Like Koh, the anonymous scribes lavished their most obsessive craft on structures a casual reader would never pause to see.",
        "source": "The Library of Trinity College Dublin, Digital Collections (Book of Kells, MS 58, folio 34r)",
        "href": "https://digitalcollections.tcd.ie/concern/folios/6395w7327",
        "image": {
          "src": "/covers/adelene-koh-bookbinding-sculptures--a0.png",
          "alt": "The richly ornamented Chi Rho monogram page from the Book of Kells, folio 34r, dense with spirals and interlace",
          "credit": "Book of Kells, folio 34r (Chi Rho monogram), c. 800, The Library of Trinity College Dublin. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "Roger Payne and the revival of English fine binding",
        "excerpt": "His bindings united elegance with durability; and the ornaments, which are said to have been designed by himself, were chosen with excellent taste.",
        "source": "Dictionary of National Biography (1885-1900), \"Payne, Roger\" (Wikisource)",
        "href": "https://en.wikisource.org/wiki/Payne,_Roger_(DNB00)"
      },
      {
        "category": "literary",
        "title": "Milton's Areopagitica: the book as living body",
        "excerpt": "Many a man lives a burden to the earth; but a good book is the precious life-blood of a master spirit, embalmed and treasured up on purpose to a life beyond life.",
        "source": "John Milton, Areopagitica (1644), Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/608/pg608-images.html"
      },
      {
        "category": "literary",
        "title": "Emily Dickinson, \"A Book\": the vessel that carries a soul",
        "excerpt": "There is no frigate like a book\nTo take us lands away,\nNor any coursers like a page\nOf prancing poetry.\nThis traverse may the poorest take\nWithout oppress of toll;\nHow frugal is the chariot\nThat bears a human soul!",
        "source": "Emily Dickinson, Poems: Third Series (1896), Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/12241/pg12241.html"
      },
      {
        "category": "artistic",
        "title": "Jan Davidsz. de Heem, Still Life with Books and a Violin (1628)",
        "excerpt": "In muted browns and greys, the young de Heem heaps worn volumes on a table, their frayed spines, curling pages and slackening bindings rendered with tender exactness. The books are not props but the whole subject: humble, dog-eared objects raised to the dignity of contemplation. As with Koh's sculptures, the painting asks us to look hard at the physical body of the book and find beauty in its overlooked structure.",
        "source": "Jan Davidsz. de Heem, Still Life with Books and a Violin, Mauritshuis (inv. 613), via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Jan_Davidszoon_de_Heem_-_Still-Life_of_Books.JPG",
        "image": {
          "src": "/covers/adelene-koh-bookbinding-sculptures--a4.png",
          "alt": "A dim tonal still life of weathered books piled on a table, their spines and pages worn, with a violin",
          "credit": "Jan Davidsz. de Heem, Still Life with Books and a Violin, 1628, Mauritshuis, The Hague. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "J. S. Bach, The Art of Fugue (BWV 1080): concealed structure made audible",
        "excerpt": "Across fourteen fugues and four canons, Bach spins a single unassuming theme into an inverting, mirroring architecture of astonishing hidden order, much of it invisible to the untrained ear. It is craft pursued for its own perfection, the compositional equivalent of stitching bright thread into a binding no reader will normally see. Like Koh's looping spine and fore-edge, the work turns pure structure into the very thing we are meant to admire.",
        "source": "Johann Sebastian Bach, Die Kunst der Fuge, BWV 1080, scores on IMSLP",
        "href": "https://imslp.org/wiki/Die_Kunst_der_Fuge,_BWV_1080_(Bach,_Johann_Sebastian)"
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
