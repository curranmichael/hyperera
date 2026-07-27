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
// the Morning Edition of 25 July 2026 (ranks 1-13) leads with its hero story,
// followed by the Evening Edition of 24 July 2026 and the Morning Edition of 24 July 2026.
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
const stories: Story[] = [
  {
    "slug": "seattle-food-festival-shooting",
    "headline": "Shooting at Seattle's Bite of Seattle food festival kills 3 and wounds at least 4 near the Space Needle",
    "overview": "A shooting at the Bite of Seattle food festival at the Seattle Center killed three people and wounded at least four others, including a two-year-old boy, on Sunday evening near the Space Needle. Police said the gunfire erupted around 6 p.m. as two suspects apparently shot at each other; one was taken into custody and a second fled the scene. Mayor Katie Wilson called it a devastating act of violence as the final day of the annual festival descended into chaos.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMipgFBVV95cUxQOHdnckxsV0hjY2pWQzhxUGpSMk1ldm8wcmJia1B3MDJ2b3p5R09abkFVTERYZ3JTdWFEQktGVzRvNHlKZHR2dGdlNWt0ZkRBQ1hHeUFid3ZZSzRIaW40VExRaXJaYVVnS25qSWRkU0dvS3F0b2o2bEk0Q1pRUmZVaC1LYjhFSXI3bjNONzJOdmlNTFdQUEM1NXVSUHBrRmJyS2o3d013?oc=5"
      },
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMikwFBVV95cUxONnFsN1E3UDNxYVUyd3ZVb0hsUnZZem01VmFMZkwzWFl5Z2Z1UXgzZGZSZnZjbklHdldtckp6eDhTYmlKbGFrbHZKdlpMTEl2ZU5fRHF2WWZXLTlhVFdaUy03Zm5GVVFheGtLNEJBYU1vUWlTalFPT09pMXJwQjBLSGlURXlnTWNKc1d6R2VBcnhMQUE?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-27",
    "image": {
      "src": "/covers/seattle-food-festival-shooting.png",
      "alt": "The Space Needle rising above Seattle Center, home of the Bite of Seattle festival.",
      "credit": "Dietmar Rabich, CC BY-SA 4.0, via Wikimedia Commons"
    },
    "lead": true,
    "edition": "Morning Edition · 27 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Assassination of Philip II of Macedon (336 BC)",
        "excerpt": "In October 336 BC, Philip II of Macedon was assassinated at Aegae (modern Vergina) during the wedding festivities of his daughter Cleopatra to Alexander of Epirus. As the king entered the theatre amid games and celebration, deliberately walking ahead of his bodyguards to appear approachable to the assembled Greek dignitaries, his own guard Pausanias of Orestis stabbed him to death. A lavish royal feast erupted into panic and bloodshed, ending Philip's reign and clearing the throne for his son Alexander the Great.",
        "source": "Philip II of Macedon (Wikipedia)",
        "href": "https://en.wikipedia.org/wiki/Philip_II_of_Macedon",
        "image": {
          "src": "/covers/seattle-food-festival-shooting--a0.png",
          "alt": "Marble bust of King Philip II of Macedon, a Roman copy of a Greek original.",
          "credit": "Roman copy of a Greek original, bust of Philip II of Macedon, Ny Carlsberg Glyptotek, Copenhagen; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "The St. Bartholomew's Day Massacre (1572)",
        "excerpt": "Beginning in the night of 23-24 August 1572, the St. Bartholomew's Day Massacre erupted in Paris while the city was still thronged for the celebrations of the royal wedding of the Catholic Margaret of Valois to the Protestant Henry of Navarre. Targeted killings of Huguenot leaders spilled into weeks of mob violence that reached a dozen provincial cities, with modern estimates of the dead ranging from 5,000 to 30,000. A wedding meant to reconcile France's warring faiths became one of the bloodiest episodes of the French Wars of Religion.",
        "source": "St. Bartholomew's Day massacre (Wikipedia)",
        "href": "https://en.wikipedia.org/wiki/St._Bartholomew%27s_Day_massacre",
        "image": {
          "src": "/covers/seattle-food-festival-shooting--a1.png",
          "alt": "Francois Dubois's painting of the St. Bartholomew's Day Massacre showing Huguenots slain in the streets of Paris.",
          "credit": "Francois Dubois, 'The St. Bartholomew's Day Massacre' (c. 1572-1584); public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "The Slaying of the Suitors, Homer's Odyssey, Book XXII",
        "excerpt": "Then Ulysses tore off his rags, and sprang on to the broad pavement with his bow and his quiver full of arrows. He shed the arrows on to the ground at his feet and said, “The mighty contest is at an end. I will now see whether Apollo will vouchsafe it to me to hit another mark which no man has yet hit.”\n\nOn this he aimed a deadly arrow at Antinous, who was about to take up a two-handled gold cup to drink his wine and already had it in his hands. He had no thought of death—who amongst all the revellers would think that one man, however brave, would stand alone among so many and kill him? The arrow struck Antinous in the throat, and the point went clean through his neck, so that he fell over and the cup dropped from his hand, while a thick stream of blood gushed from his nostrils.",
        "source": "Homer, The Odyssey (trans. Samuel Butler), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/1727/1727-h/1727-h.htm",
        "image": {
          "src": "/covers/seattle-food-festival-shooting--a2.png",
          "alt": "Campanian red-figure krater depicting Odysseus and Telemachus slaying Penelope's suitors.",
          "credit": "Campanian red-figure bell-krater, c. 330 BC, Louvre (CA 7124); public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Banquo's Ghost at the Banquet, Shakespeare's Macbeth, Act III, Scene 4",
        "excerpt": "MACBETH.\nWhich of you have done this?\n\nLORDS.\nWhat, my good lord?\n\nMACBETH.\nThou canst not say I did it. Never shake\nThy gory locks at me.\n\nROSS.\nGentlemen, rise; his Highness is not well.",
        "source": "William Shakespeare, Macbeth, Project Gutenberg",
        "href": "https://www.gutenberg.org/files/1533/1533-h/1533-h.htm",
        "image": {
          "src": "/covers/seattle-food-festival-shooting--a3.png",
          "alt": "Theodore Chasseriau's painting of Macbeth recoiling from the ghost of Banquo at the banquet table.",
          "credit": "Theodore Chasseriau, 'The Ghost of Banquo' (1854); public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Goya, The Third of May 1808",
        "excerpt": "Painted by Francisco Goya in 1814, The Third of May 1808 depicts the summary execution of unarmed Madrid citizens by Napoleon's soldiers on 3 May 1808, in reprisal for the previous day's uprising. A lantern throws harsh light on a terrified man flinging his arms wide before a faceless firing squad, while the dead lie in pooled blood at his feet. Now in the Museo del Prado, it stands as a landmark image of civilian slaughter and the human cost of sudden, mechanical violence.",
        "source": "The Third of May 1808 (Wikipedia)",
        "href": "https://en.wikipedia.org/wiki/The_Third_of_May_1808",
        "image": {
          "src": "/covers/seattle-food-festival-shooting--a4.png",
          "alt": "Goya's The Third of May 1808 showing a firing squad executing civilians by lantern light.",
          "credit": "Francisco Goya, 'The Third of May 1808' (1814), Museo del Prado; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Mozart, Requiem in D minor, K. 626",
        "excerpt": "Mozart's Requiem in D minor, K. 626, is a Mass for the dead that the composer left unfinished at his death in December 1791; it was completed by his pupil Franz Xaver Suessmayr. Its movements sweep from the pleading Introit and the thunderous Dies irae to the tear-stained Lacrimosa, giving shape to shock, grief, and mourning. The work has become one of Western music's defining expressions of communal lament for lives suddenly and violently lost.",
        "source": "Requiem in D minor, K.626 (IMSLP)",
        "href": "https://imslp.org/wiki/Requiem_in_D_minor,_K.626_(Mozart,_Wolfgang_Amadeus)",
        "image": {
          "src": "/covers/seattle-food-festival-shooting--a5.png",
          "alt": "Posthumous portrait of composer Wolfgang Amadeus Mozart by Barbara Krafft.",
          "credit": "Barbara Krafft, portrait of Wolfgang Amadeus Mozart (1819); public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 1
  },
  {
    "slug": "france-spain-wildfires-bordeaux",
    "headline": "Wildfires across France and Spain drive some 250,000 people from their homes as flames near Bordeaux",
    "overview": "Fast-moving wildfires sweeping across southern France and Spain have driven roughly 250,000 people from their homes and pushed flames toward the wine city of Bordeaux, prompting President Emmanuel Macron to convene a crisis meeting. Thousands of firefighters, backed by water-bombing aircraft, battled to contain the blazes amid a brutal heatwave and tinder-dry conditions. Authorities warned that shifting winds could threaten more towns as the fires spread.",
    "genre": "Climate",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMinwFBVV95cUxOalBvXzl6UFlKWUlWdWpYZmo0TmF0eVNQejlSNFJPMjdmREMyd2d6UUo2djQybVVMWnlCY05FUWlhRkpNd01MZGJMeFhRMkZlbUZab0NzUzZyaUh6TlVseThfaDBVZFlLRENxbmFZdnhxbFlJaEtQeUlGaUZhcGgya2dRbWpYcHpIem0tb3RWWmdObDNLc1hVUnFlMVpaeDQ?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMisAFBVV95cUxPZ29lUm9wb0g2TUU0dWowSWdwNFExdGpETDljMi1yYXc3cjBjcVZXbnhWRDFiWFNHMlVyb3ZGYnpqeGRhRkt3aVpFSDFCNzdhMzFqWGVBRTF3bVh5NHJIZjBSa0d1QjlfZjdweWpxc01odndpYk1QeUU1UU5rajhtXzZPQkZWOWFtOXVuUDJQVnNENjFxWS13ZHNLWTJNSS1jZ3ZOd3hRZzlZbmN4LVY0Qw?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-27",
    "image": {
      "src": "/covers/france-spain-wildfires-bordeaux.png",
      "alt": "Firefighters battling a fast-moving wildfire.",
      "credit": "Region 5 Photography, U.S. Forest Service; public domain, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 27 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Great Fire of Rome, AD 64",
        "excerpt": "On the night of 18-19 July AD 64, fire broke out among the merchant shops around the Circus Maximus and, driven by strong summer winds through Rome's narrow streets and packed tenements, raged for the better part of nine days. According to Tacitus, ten of the city's fourteen districts were damaged or destroyed. Terrified crowds fled through the streets and out into the fields, some trampled in the crush, as the flames outran every attempt to stop them. It remains the archetype of a city consumed and a population put to flight by an unstoppable blaze.",
        "source": "Encyclopedic history (Tacitus, Annals)",
        "href": "https://en.wikipedia.org/wiki/Great_Fire_of_Rome",
        "image": {
          "src": "/covers/france-spain-wildfires-bordeaux--a0.png",
          "alt": "Oil painting of ancient Rome engulfed in flames with columns and crowds fleeing before the fire.",
          "credit": "Hubert Robert, 'L'Incendie de Rome' (c. 1785), public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "The Camp Fire, California, November 2018",
        "excerpt": "On 8 November 2018 a wildfire sparked by a failed PG&E transmission line tore into the foothill town of Paradise, California, driven by katabatic winds over 50 mph after more than 200 rainless days. Roughly 52,000 people fled in a chaotic evacuation as the flames overran the town in hours; 85 people died and more than 18,800 structures burned. It stands as the deadliest and most destructive wildfire in California history, a modern parallel to fast-moving fires that empty whole communities.",
        "source": "Encyclopedic history",
        "href": "https://en.wikipedia.org/wiki/Camp_Fire_(2018)",
        "image": {
          "src": "/covers/france-spain-wildfires-bordeaux--a1.png",
          "alt": "A towering plume of smoke and flame from the 2018 Camp Fire seen from a road east of Paradise, California.",
          "credit": "Photo via Wikimedia Commons (2018 Camp Fire), public domain"
        }
      },
      {
        "category": "literary",
        "title": "The Burning of Troy, Virgil's Aeneid, Book II",
        "excerpt": "Deiphobus' great house / sank vanquished in the fire. Ucalegon's / hard by was blazing, while the waters wide / around Sigeum gave an answering glow.",
        "source": "Virgil, Aeneid (trans. Theodore C. Williams, 1910), Perseus Digital Library",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0054:book=2:card=298",
        "image": {
          "src": "/covers/france-spain-wildfires-bordeaux--a2.png",
          "alt": "Apocalyptic painting of a world collapsing in fire, with mountains falling and a red-lit sky.",
          "credit": "John Martin, 'The Great Day of His Wrath' (c. 1851), Tate, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Pepys Witnesses the Great Fire of London, 2 September 1666",
        "excerpt": "Everybody endeavouring to remove their goods, and flinging into the river or bringing them into lighters that lay off; poor people staying in their houses as long as till the very fire touched them, and then running into boats, or clambering from one pair of stairs by the water-side to another... So near the fire as we could for smoke; and all over the Thames, with one's face in the wind, you were almost burned with a shower of firedrops.",
        "source": "Samuel Pepys, Diary of Samuel Pepys, Wikisource",
        "href": "https://en.wikisource.org/wiki/Diary_of_Samuel_Pepys/1666/September"
      },
      {
        "category": "artistic",
        "title": "The Burning of the Houses of Lords and Commons, 16 October 1834",
        "excerpt": "Turner painted this canvas after personally watching the Houses of Parliament burn on the night of 16 October 1834, sketching the blaze from the banks of the Thames. The composition dissolves architecture into a furnace of orange and gold, the fire's reflection streaming across the water while crowds gather on Westminster Bridge to watch. It is one of art's most visceral studies of a great building consumed and a city lit by uncontrollable flame.",
        "source": "J.M.W. Turner, Cleveland Museum of Art",
        "href": "https://www.clevelandart.org/art/1942.647",
        "image": {
          "src": "/covers/france-spain-wildfires-bordeaux--a4.png",
          "alt": "Turner's painting of Parliament ablaze at night, flames and their reflection blazing across the Thames.",
          "credit": "J.M.W. Turner, 'The Burning of the Houses of Lords and Commons, 16 October 1834', Cleveland Museum of Art, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "The Great Day of His Wrath",
        "excerpt": "Painted around 1851 as part of his 'Last Judgment' trilogy, John Martin's vast canvas shows an entire world torn apart and swallowed by fire, mountains toppling into a red abyss beneath a sky of smoke and flame. Martin's imagination was shaped by the industrial furnaces of the Black Country, which he translated into an apocalyptic vision of nature and humanity overwhelmed by an inferno. The picture epitomizes the sublime terror of fire beyond all human control.",
        "source": "John Martin, Tate Britain",
        "href": "https://www.tate.org.uk/art/artworks/martin-the-great-day-of-his-wrath-n05613",
        "image": {
          "src": "/covers/france-spain-wildfires-bordeaux--a5.png",
          "alt": "Apocalyptic painting of mountains collapsing into a fiery red chasm under a burning, smoke-filled sky.",
          "credit": "John Martin, 'The Great Day of His Wrath' (c. 1851), Tate, public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 2
  },
  {
    "slug": "cxmt-shanghai-ipo-debut",
    "headline": "China's memory-chip maker CXMT surges more than 470% on its Shanghai debut to become the mainland's most valuable listed company",
    "overview": "Shares of ChangXin Memory Technologies (CXMT), China's largest memory-chip maker, surged more than 470% on their debut on Shanghai's tech-heavy STAR Market, briefly making the firm the most valuable listed company in mainland China at about 3.3 trillion yuan ($487 billion). The Hefei-based company, founded in 2016, produces the DRAM chips that power AI data centres, phones and PCs. The blockbuster listing defied a sharp global sell-off in technology stocks this month.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiwwFBVV95cUxNYm1IR1F2YXpDSDNtXzYzeTN5dWQ3ZnlwZ2hGRTQtV3plXzhYWEZYdzRXZE13dEEzSnNoMVlLajJJT0RGd05ZTzJEVE8wbVdsR056dXlFZm1OUDFnOERvUTlva21VaW1HeS1aQnl2U2tKZzhTRzEwV2EwV215MzJzd3lmbWZIMUdSMFFpdHBJbWF4bm1LcTNrR01ub29KRWlRd2xmRDJNNmt1UHVncGZzalVzbl9kTHFfaHZHQk5YR1c2a0E?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c9q9w3x9qn2o"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-27",
    "image": {
      "src": "/covers/cxmt-shanghai-ipo-debut.png",
      "alt": "A module of DRAM memory chips, the kind of product CXMT manufactures.",
      "credit": "Mixabest; public domain, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 27 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Dutch Tulip Mania (1637)",
        "excerpt": "In the 1630s the Dutch Republic was gripped by a speculative frenzy for tulip bulbs, whose prices climbed to astonishing heights as rare variegated blooms like the Semper Augustus changed hands for the price of a grand canal house. Contracts for bulbs still buried in the ground were traded feverishly in taverns, drawing in artisans and shopkeepers convinced that prices could only keep rising. In February 1637 the market abruptly collapsed and fortunes built on paper promises evaporated overnight. Often cited as the first recorded speculative bubble, tulip mania endures as the byword for irrational market exuberance.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Tulip_mania",
        "image": {
          "src": "/covers/cxmt-shanghai-ipo-debut--a0.png",
          "alt": "A 17th-century watercolour of a Semper Augustus tulip, the flamed red-and-white bloom that fetched the highest prices during the Dutch tulip mania.",
          "credit": "Anonymous 17th-century watercolour; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "The Dot-com Bubble (late 1990s)",
        "excerpt": "During the late 1990s a wave of investment poured into internet and technology start-ups, driving the NASDAQ Composite index up roughly fivefold between 1995 and its March 2000 peak. Companies with scant revenue and no profits commanded soaring valuations on the promise that the web would remake the entire economy. When sentiment turned, the bubble burst, erasing trillions of dollars in market value and bankrupting hundreds of dot-coms by 2002. The episode remains a cautionary tale of euphoric faith in a transformative technology outrunning its fundamentals.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Dot-com_bubble",
        "image": {
          "src": "/covers/cxmt-shanghai-ipo-debut--a1.png",
          "alt": "A line chart of the NASDAQ Composite index showing its steep climb to a March 2000 peak followed by a sharp crash.",
          "credit": "NASDAQ Composite index chart; via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Extraordinary Popular Delusions and the Madness of Crowds — The South-Sea Bubble",
        "excerpt": "Exchange Alley was in a fever of excitement. The Company's stock, which had been at a hundred and thirty the previous day, gradually rose to three hundred, and continued to rise with the most astonishing rapidity during the whole time that the bill in its several stages was under discussion.",
        "source": "Charles Mackay (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/636/pg636.txt"
      },
      {
        "category": "literary",
        "title": "Money (L'Argent)",
        "excerpt": "In a fortnight the figure of fifteen hundred francs was reached at the Bourse, and in the last days of August, by successive leaps, the shares rose to two thousand. The infatuation was still at fever-heat; the paroxysm became more and more intense each day. Folks bought and bought; even the most prudent went on buying, convinced that the shares would rise higher yet, go up indeed for ever and ever.",
        "source": "Émile Zola, trans. E. A. Vizetelly (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/56987/pg56987.txt"
      },
      {
        "category": "artistic",
        "title": "Flora's Wagon of Fools",
        "excerpt": "Painted around 1637 as the tulip market was collapsing, Hendrik Gerritsz Pot's satirical panel shows the flower goddess Flora, her arms heaped with tulips, riding a wind-driven 'wagon of fools' toward the sea alongside grinning personifications of vain hope, drink and money-grubbing. Weavers who have abandoned their looms trudge behind, having thrown in their livelihoods with the doomed speculation. The allegory mocks the greed of the tulip trade and the folly of a crowd chasing riches on the wind. It remains among the most celebrated visual satires of the Dutch tulipomania.",
        "source": "Hendrik Gerritsz Pot (c. 1637), Frans Hals Museum",
        "href": "https://commons.wikimedia.org/wiki/File:Flora's_Wagon_of_Fools_(Flora's_Mallewagen)_tulipomania,_Hendrik_Gerritsz_Pot_c1637.jpg",
        "image": {
          "src": "/covers/cxmt-shanghai-ipo-debut--a4.png",
          "alt": "A painting of the goddess Flora on a wind-borne wagon of fools laden with tulips, sailing toward the sea as ruined weavers follow behind.",
          "credit": "Hendrik Gerritsz Pot, 'Flora's Wagon of Fools' (c. 1637), Frans Hals Museum; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "The South Sea Scheme",
        "excerpt": "William Hogarth's 1721 engraving 'The South Sea Scheme' is a crowded allegory of the financial mania that had ruined thousands of British investors the year before. A carousel of speculators whirls beside a grotesque machine while Honesty is broken on a wheel and Honour flogged, and a jostling mob scrambles to buy shares. Hogarth turns the disaster into a moral indictment of the greed and folly unleashed by the South Sea Company's collapse. The print helped launch his career as Britain's foremost pictorial satirist.",
        "source": "William Hogarth (1721 engraving)",
        "href": "https://commons.wikimedia.org/wiki/File:William_Hogarth_-_The_South_Sea_Scheme.png",
        "image": {
          "src": "/covers/cxmt-shanghai-ipo-debut--a5.png",
          "alt": "Hogarth's crowded engraving satirising the South Sea Bubble, with a spinning carousel of speculators and figures of Honesty and Honour being tortured.",
          "credit": "William Hogarth, 'The South Sea Scheme' (1721); public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 3
  },
  {
    "slug": "nvidia-openai-250-billion-data-center",
    "headline": "Nvidia in talks to guarantee up to $250 billion in financing for an OpenAI data center, WSJ reports",
    "overview": "Nvidia is in talks to guarantee up to $250 billion in financing for a massive OpenAI data centre, the Wall Street Journal reported, one of the largest such commitments yet in the artificial-intelligence build-out. The arrangement would deepen the ties between the world's most valuable chipmaker and the maker of ChatGPT. Separately, South Korea's Naver jumped about 10% after Nvidia unveiled a $1 billion investment plan in the country.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMi1gFBVV95cUxQemxoQlhRcXdJWU9ITnV3LVJxNV9kYzVBanFYWUdVTE9oTVYwcnJCakp6aU9GWHJaeTM2eEdhdzFXVjRPT0J4cUZ1VmtOSnZ3WWQ4TkdmVnY0VnQ2R29LUUV5c1VoMnNiSFZ4enhhR2pEVFNvLVhLejFjN01tOEZpcGdWQ1RWbGNUUXdWeWNZN0s4N3RKcEMxeE9TdnZHYXVaQ3VYNHRPc1JyX1FSUHRkc0xjbkdCcTA4ZGFTdVZjU1M1akxSMEJxc1VnMW1ic1RFbEx1QTlB?oc=5"
      },
      {
        "name": "Reuters (Naver)",
        "href": "https://news.google.com/rss/articles/CBMiswFBVV95cUxOSkhjUXN3Z1VSTkZyVjdBMURwLXRFYm1TMkpmZEZGS1FyRFhsRjNkSWpTZ2g1cW1UNVpXUnc4dWNSWkJIVlVkY18wOENjMWsxQm0tWWN6Y3M3RW9lNkxRUXY5Rzc5M3cxMHI2Ry1DbldOOG0xQU5obklobjlXdFNWU2tVcXc2dkM1bzYwNXlUZHowQ1l4OGhWTjN4Y1hybVQwcGoyZnphTXkyVVRYa3lmNW9URQ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-27",
    "image": {
      "src": "/covers/nvidia-openai-250-billion-data-center.png",
      "alt": "Rows of servers in a data centre of the kind built for artificial-intelligence workloads.",
      "credit": "BalticServers.com, CC BY-SA 3.0, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 27 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The First Transcontinental Railroad and its government-guaranteed financing",
        "excerpt": "To build the 1,900-mile line, Congress passed the Pacific Railroad Act of 1862, authorizing 30-year federal bonds and issuing subsidies of $16,000 to $48,000 per mile of track depending on the terrain, alongside land grants totaling roughly 130 million acres. The Union Pacific built westward from Council Bluffs while the Central Pacific pushed eastward from Sacramento, the two meeting at Promontory Summit, Utah, on May 10, 1869. The government essentially underwrote a colossal private enterprise to unlock a transformative technology, binding public backing tightly to the fortunes of a handful of railroad barons.",
        "source": "First Transcontinental Railroad (Wikipedia)",
        "href": "https://en.wikipedia.org/wiki/First_Transcontinental_Railroad"
      },
      {
        "category": "historical",
        "title": "Samuel Insull and the financing of the electric power build-out",
        "excerpt": "In the early twentieth century Samuel Insull built an electric-utility empire around vast central generating stations such as Chicago's Fisk and Crawford plants, betting that ever-larger scale would make electricity cheap enough for mass adoption. He financed the expansion through layered holding companies, at one point controlling assets worth some $500 million against only about $27 million of equity. When the empire collapsed after the 1929 crash it wiped out the savings of hundreds of thousands of shareholders and helped prompt the Public Utility Holding Company Act of 1935.",
        "source": "Samuel Insull (Wikipedia)",
        "href": "https://en.wikipedia.org/wiki/Samuel_Insull"
      },
      {
        "category": "literary",
        "title": "The Tower of Babel (Genesis 11)",
        "excerpt": "And they said, Go to, let us build us a city and a tower, whose top may reach unto heaven; and let us make us a name, lest we be scattered abroad upon the face of the whole earth.",
        "source": "The Bible, King James Version (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/8001/pg8001.txt"
      },
      {
        "category": "literary",
        "title": "Ozymandias",
        "excerpt": "And on the pedestal these words appear: 'My name is Ozymandias, king of kings: Look on my works, ye Mighty, and despair!' Nothing beside remains. Round the decay Of that colossal wreck, boundless and bare, The lone and level sands stretch far away.",
        "source": "Percy Bysshe Shelley (Wikisource)",
        "href": "https://en.wikisource.org/wiki/Poems_That_Every_Child_Should_Know/Ozymandias_of_Egypt"
      },
      {
        "category": "artistic",
        "title": "The Tower of Babel",
        "excerpt": "Painted in oil on panel in 1563 and now in the Kunsthistorisches Museum in Vienna, Bruegel's Tower of Babel renders the biblical structure as a spiraling megaproject swarming with cranes, scaffolding, and laborers, its upper tiers already vanishing into cloud. The king Nimrod appears in the foreground receiving obeisance, a study in overreaching ambition. The tower's tilting, unfinished form makes visible the fragility built into monuments of colossal scale.",
        "source": "Pieter Bruegel the Elder (Kunsthistorisches Museum, Vienna)",
        "href": "https://en.wikipedia.org/wiki/The_Tower_of_Babel_(Bruegel)",
        "image": {
          "src": "/covers/nvidia-openai-250-billion-data-center--a4.png",
          "alt": "Pieter Bruegel the Elder's 1563 painting of the Tower of Babel, a vast spiraling tower under construction rising into the clouds above a harbor town.",
          "credit": "Pieter Bruegel the Elder, The Tower of Babel (1563), Kunsthistorisches Museum, Vienna; public domain via Wikimedia Commons (Google Art Project)."
        }
      },
      {
        "category": "artistic",
        "title": "Rain, Steam and Speed – The Great Western Railway",
        "excerpt": "Exhibited in 1844 and now in the National Gallery, London, Turner's canvas shows a steam locomotive hurtling across the Maidenhead railway bridge through a storm of rain and light. The painting captures the raw new power source of the industrial age surging into the landscape, blurring machine, weather, and speed into a single elemental force. It stands as one of art's earliest celebrations of a transformative technology diffusing across the world.",
        "source": "J. M. W. Turner (The National Gallery, London)",
        "href": "https://en.wikipedia.org/wiki/Rain,_Steam_and_Speed_%E2%80%93_The_Great_Western_Railway",
        "image": {
          "src": "/covers/nvidia-openai-250-billion-data-center--a5.png",
          "alt": "J. M. W. Turner's 1844 painting Rain, Steam and Speed, showing a steam locomotive crossing a bridge amid swirling rain and golden light.",
          "credit": "J. M. W. Turner, Rain, Steam and Speed – The Great Western Railway (1844), The National Gallery, London; public domain via Wikimedia Commons."
        }
      }
    ],
    "rank": 4
  },
  {
    "slug": "south-korea-yoon-suspended-sentence",
    "headline": "South Korean court gives ousted ex-President Yoon a suspended jail term for violating election law",
    "overview": "A South Korean court handed ousted former President Yoon Suk Yeol a suspended jail term after convicting him of violating election law by making false statements during his campaign. It is the latest legal blow for Yoon, who was removed from office following his short-lived declaration of martial law. The suspended sentence spares him immediate imprisonment on this charge, but he remains entangled in a web of other criminal cases.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMi0AFBVV95cUxPMmxHenlQaks1SXgwdnUtd3VWUzY5RDFwRVlXYzc3ODkxRnEtUXotcjRQM2ZISmdfNml3LXlkd25FSUpWZmdsMGRjaDZ2eHUyY3ZkSU0tcjZQRmFlU01TQnZvOWxaU0gxbzF6bnVrYUl1US03QTVoTzhhbFdQMGw5aW1mRVZlZkNOQ3lmclVxaGxBZG5mNzVOWWhjS0pmOTJpQi1uQThvRW9uRjFZMTRJclRIN2JrVEpIdThPREt5eWhtWlVoWkFZOTRTdzU2Ym9O?oc=5"
      },
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMipgFBVV95cUxPak1sNDFiLUhocTNVdElKWkEzNGpZUWIyVXM3NFVLSS1EdEZzTzQyN1A5SWZsMUhzU2o4NU9Fc1VKRnBzOWJYZ3hGTFo2eDRxQnAxMEFDX1lzbHd2ZDZJZGoxcF85VFFKMVdqZHRGT3VtT3dFWjc3czFUS2s0NUFWMVdXdFhMcVhabUdsdTJnNzJTbGZFUXNrNU9KbjM3VzdlMzVjdzh3?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-27",
    "image": {
      "src": "/covers/south-korea-yoon-suspended-sentence.png",
      "alt": "Ousted former South Korean President Yoon Suk Yeol.",
      "credit": "Office of the President of South Korea, CC BY-SA 3.0, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 27 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Trial and Execution of Charles I (1649)",
        "excerpt": "In January 1649 the parliamentarian High Court of Justice put King Charles I on trial and declared him guilty of attempting to uphold in himself an unlimited and tyrannical power to rule according to his will and to overthrow the rights and liberties of the people. Three days later, on 30 January 1649, he was publicly beheaded outside the Banqueting House on Whitehall. It was an unprecedented reckoning: a reigning monarch, once thought to answer only to God, was summoned before an earthly court and judged like any other subject.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Execution_of_Charles_I"
      },
      {
        "category": "historical",
        "title": "Watergate and the Fall of Richard Nixon (1974)",
        "excerpt": "President Richard Nixon's downfall grew from a criminal conspiracy to conceal White House involvement in the 1972 break-in at the Democratic National Committee headquarters, an elaborate cover-up captured on his own secret tapes. When the Supreme Court ordered the tapes released and impeachment proceedings advanced, the deception at the heart of his presidency was laid bare. Facing near-certain removal, on 9 August 1974 Nixon became the first U.S. president to resign, a modern emblem of a powerful leader undone by his own lies.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Watergate_scandal"
      },
      {
        "category": "literary",
        "title": "Sophocles, Oedipus the King (closing chorus)",
        "excerpt": "Look ye, countrymen and Thebans, this is Oedipus the great, / He who knew the Sphinx's riddle and was mightiest in our state. / Who of all our townsmen gazed not on his fame with envious eyes? / Now, in what a sea of troubles sunk and overwhelmed he lies! / Therefore wait to see life's ending ere thou count one mortal blest; / Wait till free from pain and sorrow he has gained his final rest.",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/files/31/31-h/31-h.htm"
      },
      {
        "category": "literary",
        "title": "The Book of Daniel: Belshazzar and the Writing on the Wall",
        "excerpt": "In the same hour came forth fingers of a man's hand, and wrote over against the candlestick upon the plaister of the wall of the king's palace... And this is the writing that was written, MENE, MENE, TEKEL, UPHARSIN. This is the interpretation of the thing: MENE; God hath numbered thy kingdom, and finished it. TEKEL; Thou art weighed in the balances, and art found wanting. PERES; Thy kingdom is divided, and given to the Medes and Persians.",
        "source": "Wikisource (King James Version)",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Daniel"
      },
      {
        "category": "artistic",
        "title": "Rembrandt, Belshazzar's Feast (c. 1635-1638)",
        "excerpt": "Rembrandt's grand baroque history painting freezes the instant a disembodied hand traces glowing Hebrew letters across the wall of Belshazzar's banquet, prophesying the downfall of his reign. The king wheels around in terror, eyes wide and jewelled robe aglow, wine spilling from an overturned goblet as the feast collapses into dread. Held by the National Gallery in London, it renders in vivid pigment the terrible moment when earthly power is weighed in the balance and found wanting.",
        "source": "Wikipedia / National Gallery, London",
        "href": "https://en.wikipedia.org/wiki/Belshazzar%27s_Feast_(Rembrandt)",
        "image": {
          "src": "/covers/south-korea-yoon-suspended-sentence--a4.png",
          "alt": "Rembrandt's painting Belshazzar's Feast: the startled king recoils from a glowing hand writing on the wall during a banquet.",
          "credit": "Rembrandt, Belshazzar's Feast (c. 1635-1638), National Gallery, London. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Honoré Daumier, Les Gens de Justice (1846)",
        "excerpt": "In his lithograph series Les Gens de Justice, the French caricaturist Honoré Daumier turned a satirical eye on the courtroom and the professionals who staff it, mocking the pomp, vanity and theatre of the law. Robed advocates gesture grandly before the bench in scenes that expose the gap between the machinery of justice and its lofty ideals. Biting yet humane, the series remains a classic image of ordinary human failing dragged before the tribunals of the law.",
        "source": "Wikimedia Commons / The Phillips Collection",
        "href": "https://commons.wikimedia.org/wiki/File:Honor%C3%A9_Daumier_-_Les_Gens_de_Justice-_M._L'Avocat_a_rendu_pleine_Justice..._-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/south-korea-yoon-suspended-sentence--a5.png",
          "alt": "Honoré Daumier lithograph from Les Gens de Justice showing a robed lawyer gesturing dramatically in a French courtroom.",
          "credit": "Honoré Daumier, Les Gens de Justice (1846), lithograph, The Phillips Collection, via Wikimedia Commons (Google Art Project). Public domain."
        }
      }
    ],
    "rank": 5
  },
  {
    "slug": "netanyahu-mamdani-fomenting-hate",
    "headline": "Netanyahu says he will attend the UN General Assembly in New York and accuses Mayor Mamdani of 'fomenting hate'",
    "overview": "Israeli Prime Minister Benjamin Netanyahu said he will attend the UN General Assembly in New York this autumn and accused the city's mayor, Zohran Mamdani, of 'fomenting hate,' brushing off Mamdani's earlier threat to arrest him. Mamdani had walked back the threat, acknowledging he lacked the power to act on an International Criminal Court warrant. Netanyahu, who called the ICC's war-crimes charges 'bogus,' was set to fly to Washington to meet President Trump.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMimAFBVV95cUxPWlBkWVdzTkw5NzJsY1VzR1hRU3VFQXdYT1kyUVdXQVdEUnRfMEtLTHdQR19fdm5zS2pFeGo3ZmlXNXpfWDhDWUtjNGg4SUtBdEdzUm9QelBDSGsxLVR2alBzQy1CMThwMUFscHpoSGQzV3FGSS1HSFFpVXRqcGlxRndWcEVXamh2cm10c2JjeXFfWUFwMmtMNg?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c5yegvd9ddeo"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-27",
    "image": {
      "src": "/covers/netanyahu-mamdani-fomenting-hate.png",
      "alt": "Israeli Prime Minister Benjamin Netanyahu.",
      "credit": "Avi Ohayon, CC BY-SA 3.0, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 27 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Road to Canossa (1077): Emperor Henry IV Before Pope Gregory VII",
        "excerpt": "In January 1077, during the Investiture Controversy, Holy Roman Emperor Henry IV crossed the Alps in the depths of winter to confront the ultimate clash between sovereign power and a higher authority that claimed to judge him. Excommunicated by Pope Gregory VII in 1076, an act that dissolved his subjects' oaths and threatened his throne, Henry stood barefoot in the snow before the gates of Canossa Castle from 25 to 28 January, doing penance until the pope granted absolution. The episode became the enduring symbol of the medieval struggle over who holds final authority: the crowned ruler or the tribunal that presumes to bind him.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Road_to_Canossa"
      },
      {
        "category": "historical",
        "title": "Omar al-Bashir and the ICC: A Sitting Head of State Defies an Arrest Warrant",
        "excerpt": "On 4 March 2009 the International Criminal Court issued an arrest warrant for Sudanese President Omar al-Bashir on five counts of crimes against humanity and two of war crimes in Darfur, and on 12 July 2010 a second warrant added three counts of genocide. He was the first sitting head of state ever indicted by the ICC. Denouncing the charges and the court's jurisdiction, al-Bashir defied the warrants for a decade, traveling openly to China, India, Russia, Saudi Arabia and other states that declined to arrest him, until he was removed from power in April 2019.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Omar_al-Bashir"
      },
      {
        "category": "literary",
        "title": "Sophocles, Antigone: The Unwritten Laws Against a King's Edict",
        "excerpt": "Yes, since it was not Zeus that published me that edict, and since not of that kind are the laws which Justice who dwells with the gods below established among men. Nor did I think that your decrees were of such force, that a mortal could override the unwritten and unfailing statutes given us by the gods.",
        "source": "Perseus Digital Library (Sir Richard Jebb translation)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0186:card=441"
      },
      {
        "category": "literary",
        "title": "Plato, Apology: Socrates Answers the City That Would Silence Him",
        "excerpt": "Men of Athens, I honour and love you; but I shall obey God rather than you, and while I have life and strength I shall never cease from the practice and teaching of philosophy.",
        "source": "Project Gutenberg (Benjamin Jowett translation)",
        "href": "https://www.gutenberg.org/files/1656/1656-h/1656-h.htm"
      },
      {
        "category": "artistic",
        "title": "Jacques-Louis David, The Death of Socrates (1787)",
        "excerpt": "Jacques-Louis David's neoclassical masterpiece portrays the philosopher's final moments after Athens condemned him to death. Composed and unbroken, Socrates reaches for the cup of hemlock while raising his other hand toward the heavens, still teaching as his grieving disciples recoil around him. The painting became an emblem of the individual conscience standing firm against the judgment of the state, defiant even in the face of the city's ultimate power.",
        "source": "The Metropolitan Museum of Art",
        "href": "https://www.metmuseum.org/art/collection/search/436105",
        "image": {
          "src": "/covers/netanyahu-mamdani-fomenting-hate--a4.png",
          "alt": "Neoclassical painting of Socrates seated on a bed, reaching for a cup of hemlock while gesturing upward, surrounded by mournful disciples.",
          "credit": "Jacques-Louis David, The Death of Socrates (1787), Metropolitan Museum of Art, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Defendants in the Dock at the Nuremberg Trials (1945-1946)",
        "excerpt": "This U.S. Army photograph captures the defendants seated in the dock before the International Military Tribunal at Nuremberg, where twenty-two Nazi leaders faced charges of crimes against peace, war crimes and crimes against humanity from 1945 to 1946. By holding individuals rather than states accountable, the tribunal established that even a nation's most powerful leaders could be judged under international law. The image marks the birth of modern international criminal justice, the framework whose descendants, from the ICTY to the ICC, still summon heads of state to answer for their acts.",
        "source": "Wikimedia Commons / U.S. Army photograph",
        "href": "https://en.wikipedia.org/wiki/Nuremberg_trials",
        "image": {
          "src": "/covers/netanyahu-mamdani-fomenting-hate--a5.png",
          "alt": "Black-and-white photograph of Nazi defendants seated in two rows in the wooden dock of the Nuremberg courtroom, guarded by military police.",
          "credit": "U.S. Army photograph, Nuremberg trials (1945-1946), via Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 6
  },
  {
    "slug": "india-gen-z-protests-minister-resigns",
    "headline": "India's education minister resigns after a week of Gen Z protests, and Modi orders a panel to overhaul the exam system",
    "overview": "India's education minister, Dharmendra Pradhan, resigned after more than a week of intense, youth-led street protests, a rare concession in Prime Minister Narendra Modi's 12 years in power. Prime Minister Modi announced a panel to overhaul the country's examination system, which protesters blamed for leaks and mismanagement. Demonstrators hailed the resignation as a landmark victory for India's Gen Z movement.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMivAFBVV95cUxOcy1JNkwzMWZ2X3RfaHVkSnprMnZrc2I4YURrNUZhZjR1cVhMenladFdYTXViUGU1V09Ec3dHUEotVEZURWhDdWVaV3FNalBROW9LSGNYZzFRS2RGRjFLNGxTYWhDdE5rME5KNU1VTWRPQ1lyQnNILTMxamZKalk1YmVZVjM3aWhlZm9UcTU4Rm45NUgyY3ViS0ZXS1FuR294N1BaX1Y3U3FKYTdNVGRYd1lTeUNoNS1NUTl4Ng?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c8dng1v72lno"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-27",
    "image": {
      "src": "/covers/india-gen-z-protests-minister-resigns.png",
      "alt": "Dharmendra Pradhan, India's education minister, who resigned amid the protests.",
      "credit": "Ministry of Education (India), GODL-India, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 27 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The imperial examination and its recurring fraud scandals",
        "excerpt": "For roughly thirteen centuries the imperial examinations were China's ladder of advancement, promising that any man who mastered the Confucian classics could rise to office on merit rather than birth. But the system was repeatedly rocked by fraud: in the 1711 Jiangnan provincial examination at Yangzhou, sons of wealthy salt-merchant families were found to have bought their passes, and rejected candidates protested against the rigged result. The chief examiner was convicted and put to death, one of many scandals over bribery and leaked questions that eroded faith in the exams before they were abolished in 1905.",
        "source": "Wikipedia — Imperial examination",
        "href": "https://en.wikipedia.org/wiki/Imperial_examination"
      },
      {
        "category": "historical",
        "title": "The 1976 Soweto uprising over schooling",
        "excerpt": "On 16 June 1976, thousands of Black schoolchildren in Soweto marched to protest a government decree forcing them to be taught in Afrikaans, the language they associated with their oppressors. Police opened fire on the students; the official death toll was 176, though many estimates run far higher. The uprising, sparked by a grievance over education itself, became a turning point that galvanized resistance to apartheid across South Africa and drew international condemnation on the regime.",
        "source": "Wikipedia — Soweto uprising",
        "href": "https://en.wikipedia.org/wiki/Soweto_uprising"
      },
      {
        "category": "literary",
        "title": "The students at the barricade in Les Misérables",
        "excerpt": "Equality has an organ: gratuitous and obligatory instruction. The right to the alphabet, that is where the beginning must be made. The primary school imposed on all, the secondary school offered to all, that is the law. From an identical school, an identical society will spring. Yes, instruction! light! light! everything comes from light, and to it everything returns.",
        "source": "Victor Hugo, Les Misérables (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/135/pg135.txt"
      },
      {
        "category": "literary",
        "title": "Wu Jingzi's The Scholars and the madness of the exam",
        "excerpt": "Wu Jingzi's mid-eighteenth-century satirical novel skewers the obsession with the imperial examinations that consumed Qing-era society. Its most famous figure, the aging scholar Fan Jin, faints and goes temporarily mad with joy upon finally passing the provincial exam after decades of humiliating failure and poverty. Through such episodes the novel exposes how a supposedly meritocratic system warped scholars' minds and corrupted the pursuit of learning into a desperate scramble for status.",
        "source": "Wikipedia — The Scholars (Wu Jingzi)",
        "href": "https://en.wikipedia.org/wiki/The_Scholars_(novel)"
      },
      {
        "category": "artistic",
        "title": "Delacroix, Liberty Leading the People (1830)",
        "excerpt": "Painted in 1830 to commemorate the July Revolution that toppled King Charles X, Delacroix's great canvas shows Liberty personified as a striding woman, the tricolor flag in one hand and a musket in the other, advancing over the barricade. Behind her surge fighters of every class — a top-hatted bourgeois, a boy brandishing pistols, a worker with a saber — united in revolt. Hanging in the Louvre, it became the enduring emblem of a people rising to overthrow an unjust ruler.",
        "source": "Musée du Louvre / Wikipedia — Liberty Leading the People",
        "href": "https://en.wikipedia.org/wiki/Liberty_Leading_the_People",
        "image": {
          "src": "/covers/india-gen-z-protests-minister-resigns--a4.png",
          "alt": "Allegorical figure of Liberty holding the French tricolor and a musket, leading armed revolutionaries forward over a barricade strewn with the fallen.",
          "credit": "Eugène Delacroix, 'Liberty Leading the People' (1830), Musée du Louvre, Paris; via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "artistic",
        "title": "A depiction of the Song-dynasty imperial examination",
        "excerpt": "This classical illustration depicts candidates undergoing the imperial civil-service examination during the Song dynasty, the gruelling test that for centuries decided who would enter China's ruling bureaucracy. Row upon row of scholars labour under the watchful eyes of officials, their futures hinging on a single ordeal of memorized classics and brush-written essays. The scene captures the enormous weight the examination placed on the young — the same pressure that, once a system of advancement is seen as rigged, can turn hope into fury.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Song_Imperial_Examination.JPG",
        "image": {
          "src": "/covers/india-gen-z-protests-minister-resigns--a5.png",
          "alt": "Classical Chinese painting showing rows of scholars seated at desks taking the imperial examination under the supervision of officials.",
          "credit": "Illustration of a Song-dynasty imperial examination, from 'Recueil Historique des Principaux Traits de la Vie des Empereurs Chinois'; via Wikimedia Commons (public domain)."
        }
      }
    ],
    "rank": 7
  },
  {
    "slug": "myanmar-military-civilian-killings",
    "headline": "Myanmar's military is escalating civilian killings amid a diplomatic push, a monitoring group warns",
    "overview": "Myanmar's military has escalated its killing of civilians even as it pursues a diplomatic push to gain international legitimacy, a conflict-monitoring group warned. The report documented a rise in air strikes and repression following a shake-up in the junta's leadership. Rights groups say the ruling generals are intensifying attacks on opponents while presenting a softer face abroad.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMizwFBVV95cUxPaThsSkwwSnVzdzd2NmNsUU90OFBlbjFYTkpqdmxzbVF6R1lBMkhDRnItZkZXemRhc0h4WVJWU043Z1hmb0RDV1NhcUN0UDRGYlVYN2VxU1JBdUQ0OEpmUEItclJjbGs2c1pPMk0zbmJ3R1pHbFdwbE9jNE96NGRiUE43QlF1WlQtWmNUbFFJbUliWS1ELUxpeFhOMTBLQ1VISUNvYVFtYnY5b1BWbGxXelppTE5MaEQ1aVRKRE9SVlRfbWdfWndNbEJoRmR4RjA?oc=5"
      },
      {
        "name": "NBC News",
        "href": "https://news.google.com/rss/articles/CBMipwFBVV95cUxNRHVZNzRHcHBxS1lMRmxyaW1FQlZBWWJqMC1GZlllbDVVcXpaZG5mZldLWVpmSGtuX3dVNXM2bjkyY3oyVDgzU2I5M20yTmFzSnJLc0J4Z0pZbXVDRDE0amlVcFVya256RHV0eng4YVlXdzJzcHRvcFNDbUstSW0yZ1UyWlV0RlpHQ3BUa21nS0hfU0VScWJpT3dzVm5nVkRjQTB4c19JTQ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-27",
    "image": {
      "src": "/covers/myanmar-military-civilian-killings.png",
      "alt": "Demonstrators rallying against Myanmar's military rule.",
      "credit": "VOA Burmese; public domain, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 27 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Sharpeville Massacre",
        "excerpt": "On 21 March 1960, some 5,000 unarmed protesters gathered at the police station in Sharpeville township to demonstrate against apartheid pass laws. Police opened fire without warning, killing at least 69 people and wounding more than 180, many shot in the back as they fled. The apartheid government responded not with reform but with a state of emergency, mass detentions, and the banning of the ANC and PAC, even as it faced mounting condemnation abroad and UN Security Council Resolution 134.",
        "source": "Sharpeville massacre (Wikipedia)",
        "href": "https://en.wikipedia.org/wiki/Sharpeville_massacre"
      },
      {
        "category": "historical",
        "title": "The Thirty Tyrants of Athens",
        "excerpt": "After Athens fell to Sparta in 404 BC, an oligarchy of thirty men led by Critias seized power and turned it into a reign of terror. Ancient sources record that the Thirty executed some 1,500 people without trial, roughly five percent of the city's population, confiscating the property of the wealthy and the dissenting alike. Their rule lasted barely eight months before democratic exiles under Thrasybulus overthrew them at the Battle of Munychia, where Critias himself was killed.",
        "source": "Thirty Tyrants (Wikipedia)",
        "href": "https://en.wikipedia.org/wiki/Thirty_Tyrants"
      },
      {
        "category": "literary",
        "title": "The Book of Lamentations",
        "excerpt": "How doth the city sit solitary, that was full of people! how is she become as a widow! ... The young and the old lie on the ground in the streets: my virgins and my young men are fallen by the sword;",
        "source": "Lamentations, King James Version (Wikisource)",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Lamentations"
      },
      {
        "category": "literary",
        "title": "Tacitus on the Birth of Despotism",
        "excerpt": "Meanwhile at Rome people plunged into slavery--consuls, senators, knights.",
        "source": "Tacitus, The Annals, Book I (Wikisource)",
        "href": "https://en.wikisource.org/wiki/The_Annals_(Tacitus)/Book_1"
      },
      {
        "category": "artistic",
        "title": "The Third of May 1808",
        "excerpt": "Francisco de Goya painted The Third of May 1808 in 1814 to commemorate the summary execution of Madrid civilians by Napoleon's soldiers after an uprising the previous day. A faceless firing squad, rendered as a single anonymous machine of the state, aims its rifles at a terrified group of unarmed men; at the center a figure in a white shirt throws his arms wide in a pose echoing crucifixion, illuminated by a stark lantern. The ground is already strewn with the bloodied dead, an unflinching indictment of a military that kills the defenceless.",
        "source": "Francisco de Goya, The Third of May 1808 (Museo del Prado)",
        "href": "https://en.wikipedia.org/wiki/The_Third_of_May_1808",
        "image": {
          "src": "/covers/myanmar-military-civilian-killings--a4.png",
          "alt": "Goya's painting The Third of May 1808 showing a firing squad of soldiers executing civilians at night by lantern light",
          "credit": "Francisco de Goya, The Third of May 1808 (1814), Museo del Prado, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Nie wieder Krieg (Never Again War)",
        "excerpt": "Käthe Kollwitz, who lost her son Peter in the First World War, turned her printmaking into an unflinching witness to the suffering of ordinary people under militarism. Her 1924 poster Nie wieder Krieg (Never Again War) shows a young figure with hand raised in an oath against war, while her woodcut cycle War (1922-23) rendered grieving mothers, widows, and the bereaved in stark black and white. Working until her death in 1945, she gave enduring form to the civilian cost of state violence.",
        "source": "Käthe Kollwitz, Nie wieder Krieg (Wikipedia)",
        "href": "https://en.wikipedia.org/wiki/K%C3%A4the_Kollwitz",
        "image": {
          "src": "/covers/myanmar-military-civilian-killings--a5.png",
          "alt": "Käthe Kollwitz's 1924 poster Nie wieder Krieg (Never Again War) showing a youth with raised hand swearing against war",
          "credit": "Käthe Kollwitz, Nie wieder Krieg (1924), via Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 8
  },
  {
    "slug": "odyssey-nolan-leak",
    "headline": "A full copy of Christopher Nolan's 'The Odyssey' leaks on X, drawing 2.1 million views before removal",
    "overview": "A high-quality copy of Christopher Nolan's forthcoming epic 'The Odyssey' leaked on X, where a single post reportedly drew 2.1 million views in about two and a half hours before the account was suspended. Universal Pictures scrambled to issue takedown notices for the film, which Nolan shot entirely on IMAX 70mm and wants audiences to see on the largest screens possible. The starry adaptation of Homer's poem features Matt Damon and Zendaya.",
    "genre": "Culture",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c1m1ev5j3m2o"
      },
      {
        "name": "The Hollywood Reporter",
        "href": "https://news.google.com/rss/articles/CBMitgFBVV95cUxOQ0Rwc0IzLUxpcHk1NUhlcmNrQlJOYlctb01FWDlNZUh5SzB4NVo0d3A3TDZfLTVqLURQSTkxMENzYlZnMlRqbTZCeVAtTEVNS0lfYWVIa1VsMW83SDhzd3lUanNqU2lLZWpiOVJBSzB1cFNJaWRxZGtuZGUwb0lHV0Z4LWV3QlZXT2dSWVExVzg1bkxrOC1EUkpQTDNNZkdjLXNDZGhNbUh0NktIdGJkdmFTdGlqUQ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-27",
    "image": {
      "src": "/covers/odyssey-nolan-leak.png",
      "alt": "Director Christopher Nolan, whose film 'The Odyssey' leaked online.",
      "credit": "Georges Biard, CC BY-SA 4.0, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 27 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Statute of Anne (1710): the first copyright law",
        "excerpt": "Whereas printers, booksellers, and other persons have of late frequently taken the liberty of printing, reprinting, and publishing, or causing to be printed, reprinted, and published, books and other writings, without the consent of the authors or proprietors of such books and writings, to their very great detriment, and too often to the ruin of them and their families.",
        "source": "The Statute of Anne, 1710 (Avalon Project, Yale Law School)",
        "href": "https://avalon.law.yale.edu/18th_century/anne_1710.asp"
      },
      {
        "category": "historical",
        "title": "The Gutenberg Bible (c. 1455): mass reproduction breaks the scribal monopoly",
        "excerpt": "Around 1454-1455 in Mainz, Johannes Gutenberg printed the earliest major book in Europe made with mass-produced metal movable type. Between 160 and 185 copies were produced, most on paper and the rest on vellum. The achievement inaugurated what historians call the Gutenberg Revolution, shattering the scribal monopoly on reproducing texts and laying the technological foundation for mass book production. What one workshop could now copy mechanically, no guild of copyists could any longer control.",
        "source": "Gutenberg Bible (Wikipedia)",
        "href": "https://en.wikipedia.org/wiki/Gutenberg_Bible"
      },
      {
        "category": "literary",
        "title": "Homer's Odyssey, Book XXII: Odysseus finally unmasked",
        "excerpt": "Then Ulysses tore off his rags, and sprang on to the broad pavement with his bow and his quiver full of arrows. He shed the arrows on to the ground at his feet and said, \"The mighty contest is at an end.\" ... But Ulysses glared at them and said: \"Dogs, did you think that I should not come back from Troy? You have wasted my substance, have forced my women servants to lie with you, and have wooed my wife while I was still living. You have feared neither God nor man, and now you shall die.\"",
        "source": "Homer, The Odyssey, trans. Samuel Butler (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/1727/pg1727.txt"
      },
      {
        "category": "literary",
        "title": "Hesiod, Works and Days: Pandora lifts the lid on what cannot be recalled",
        "excerpt": "But the woman took off the great lid of the jar with her hands and scattered all these and her thought caused sorrow and mischief to men. Only Hope remained there in an unbreakable home within under the rim of the great jar, and did not fly out at the door; for ere that, the lid of the jar stopped her, by the will of Aegis-holding Zeus who gathers the clouds. But the rest, countless plagues, wander amongst men; for earth is full of evils and the sea is full.",
        "source": "Hesiod, Works and Days, trans. Hugh G. Evelyn-White (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/348/pg348.txt"
      },
      {
        "category": "artistic",
        "title": "J.W. Waterhouse, 'Ulysses and the Sirens' (1891)",
        "excerpt": "John William Waterhouse's 1891 oil on canvas, held at the National Gallery of Victoria in Melbourne, shows Odysseus lashed to the mast as his ship threads the strait of the Sirens. Breaking with the Victorian expectation of mermaid-like nymphs, Waterhouse painted the Sirens as menacing half-bird, half-woman creatures swarming the vessel, a choice critics tied to the way Sirens appear on classical Greek vases. The painting captures the exact tension of a forbidden lure that must be heard yet resisted, the hero straining toward a song meant to be his ruin.",
        "source": "Ulysses and the Sirens (Waterhouse) — Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Ulysses_and_the_Sirens_(Waterhouse)",
        "image": {
          "src": "/covers/odyssey-nolan-leak--a4.png",
          "alt": "Oil painting of Odysseus bound to the mast of his ship as bird-bodied Sirens with women's heads swoop around the crew at sea.",
          "credit": "John William Waterhouse, 'Ulysses and the Sirens' (1891), National Gallery of Victoria, Melbourne. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "The Siren Vase (c. 480-470 BC): the ancient image of Odysseus and the Sirens",
        "excerpt": "This Attic red-figure stamnos, attributed to the anonymous Siren Painter and made around 480-470 BC, is one of the most famous surviving images of the Odyssey. It shows Odysseus bound to the mast of his ship as it passes the Sirens, one of whom plunges headfirst toward the deck, while his oarsmen row on with wax-stopped ears. Held in the British Museum, the vase reproduced Homer's scene for audiences centuries before print, image, or film, an early act of copying a coveted story onto a portable object.",
        "source": "The Siren Painter, Siren Vase, British Museum (via Wikimedia Commons)",
        "href": "https://en.wikipedia.org/wiki/Siren_Painter",
        "image": {
          "src": "/covers/odyssey-nolan-leak--a5.png",
          "alt": "Ancient Greek red-figure vase showing Odysseus tied to the mast of his ship while bird-bodied Sirens fly overhead, one diving toward the sea.",
          "credit": "The Siren Painter, 'Siren Vase', Attic red-figure stamnos, c. 480-470 BC, British Museum (E440). Photo via Wikimedia Commons."
        }
      }
    ],
    "rank": 9
  },
  {
    "slug": "rshp-one-shanghai-tower",
    "headline": "RSHP unveils One Shanghai, a 186-metre tripartite tower shaped by the city's historical laneways",
    "overview": "British architecture studio RSHP (Rogers Stirk Harbour + Partners) unveiled One Shanghai, a 186-metre, 38-storey mixed-use tower in the city's Jing'an District whose form was shaped by Shanghai's historical laneways. The tower rises as three distinct vertical volumes above the preserved Shikumen villas of the adjacent Zhang Garden, with sky gardens on its upper floors offering panoramic views. The 89,000-square-metre scheme layers office, retail and public space over the low-rise heritage quarter.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Dezeen",
        "href": "https://www.dezeen.com/2026/07/27/rshps-one-shanghai-tower/"
      },
      {
        "name": "Dezeen (via Google News)",
        "href": "https://news.google.com/rss/articles/CBMia0FVX3lxTFBySEJJUUNHYVMyUmtWVzBid1NzdXlBQk43djFoUllaQWlmWnpfUWZzWU15cVkyRnFLMVFUSUdOcUJDOUFGTXF3SXYzYlFxVlowbjhzZkZwV2stQ3V5cUNmQ1NudllRRHdwejNv?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-27",
    "image": {
      "src": "/covers/rshp-one-shanghai-tower.png",
      "alt": "A historic Shikumen laneway in Shanghai, the kind of urban grain that shaped RSHP's tower.",
      "credit": "Livelikerw, CC BY-SA 3.0, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 27 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The tower race of San Gimignano",
        "excerpt": "In the Tuscan hill town of San Gimignano, patrician families of the 12th and 13th centuries competed to raise ever-taller stone tower-houses, each one a declaration of wealth and clan prestige rising above the tight medieval streets. As many as seventy-two once bristled over the town, and municipal law eventually forbade any private tower from overtopping the one on the communal palace. Fourteen survive today, giving the small town its famous skyline and its nickname, the medieval Manhattan.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/San_Gimignano",
        "image": {
          "src": "/covers/rshp-one-shanghai-tower--a0.png",
          "alt": "The surviving medieval stone towers of San Gimignano rising above the town's rooftops",
          "credit": "San Gimignano towers, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "The Woolworth Building, Cathedral of Commerce",
        "excerpt": "Completed in 1913 in Lower Manhattan, Cass Gilbert's Woolworth Building soared to 241 metres and reigned as the tallest building in the world until 1930. Its terracotta Gothic ornament, flying buttresses and pinnacles borrowed the language of medieval cathedrals to dignify a new commercial age, earning it the epithet Cathedral of Commerce. The tower announced that modern skyscrapers could carry cultural aspiration and civic symbolism, not merely rentable floor space, as they rose above the older city fabric.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Woolworth_Building",
        "image": {
          "src": "/covers/rshp-one-shanghai-tower--a1.png",
          "alt": "The Woolworth Building towering over Lower Manhattan in 1913",
          "credit": "Woolworth Building, New York, 1913, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "The Tower of Babel (Genesis 11)",
        "excerpt": "And they said, Go to, let us build us a city and a tower, whose top may reach unto heaven; and let us make us a name, lest we be scattered abroad upon the face of the whole earth.",
        "source": "King James Bible, Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/10/pg10.txt",
        "image": {
          "src": "/covers/rshp-one-shanghai-tower--a2.png",
          "alt": "Pieter Bruegel the Elder's painting of the vast, spiralling Tower of Babel under construction",
          "credit": "Pieter Bruegel the Elder, The Tower of Babel (1563), Kunsthistorisches Museum Vienna, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Baudelaire, Le Cygne (The Swan)",
        "excerpt": "Le vieux Paris n’est plus (la forme d’une ville / Change plus vite, hélas ! que le cœur d’un mortel) ;",
        "source": "Les Fleurs du mal (1861), Wikisource",
        "href": "https://fr.wikisource.org/wiki/Les_Fleurs_du_mal_(1861)/Le_Cygne"
      },
      {
        "category": "artistic",
        "title": "Along the River During the Qingming Festival",
        "excerpt": "This celebrated Chinese handscroll unrolls a panoramic, block-by-block portrait of city life, tracing a river from quiet countryside into the dense, teeming streets of a walled town. Hundreds of tiny figures cross bridges, crowd shopfronts and haul goods, capturing the fine urban grain of markets, homes and lanes in extraordinary detail. The much-copied Qing court version pictured here re-imagined the scroll's continuous city fabric for an eighteenth-century audience.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Along_the_River_During_the_Qingming_Festival",
        "image": {
          "src": "/covers/rshp-one-shanghai-tower--a4.png",
          "alt": "Detail of the Qing court handscroll showing crowded streets, bridges and shops of a bustling city",
          "credit": "Along the River During the Qingming Festival (Qing Court Version), Palace Museum, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Caillebotte, Paris Street; Rainy Day",
        "excerpt": "Gustave Caillebotte's monumental 1877 canvas depicts a broad, freshly cut intersection of Baron Haussmann's rebuilt Paris, its pale stone buildings and wide boulevards gleaming under rain. Well-dressed pedestrians with umbrellas glide through a modern cityscape of sharp perspectives and cool grey light, embodying the new bourgeois metropolis. Now a signature work at the Art Institute of Chicago, it captures the moment an old city was remade into a modern one.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Paris_Street;_Rainy_Day",
        "image": {
          "src": "/covers/rshp-one-shanghai-tower--a5.png",
          "alt": "Gustave Caillebotte's painting of umbrella-carrying pedestrians on a wide, rainy Haussmann-era Paris boulevard",
          "credit": "Gustave Caillebotte, Paris Street; Rainy Day (1877), Art Institute of Chicago, via Wikimedia Commons"
        }
      }
    ],
    "rank": 10
  },
  {
    "slug": "totalenergies-climate-appeal",
    "headline": "TotalEnergies will appeal a French court ruling ordering it to adapt its business to climate change",
    "overview": "TotalEnergies said it will appeal a landmark French court ruling that ordered the oil-and-gas giant to bring its business strategy into line with the fight against climate change. The decision was one of the first to require a major energy company to adapt its overall operations to climate goals. Total argued the ruling misread the law, setting up a closely watched legal fight over corporate climate responsibility.",
    "genre": "Climate",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMixwFBVV95cUxQSUgwcFB5U1RhSXlrYTBLMldmcV9WUjEtTEZiRXJ2V1ROekxOd2l3RzVJYWZXQWxuMjZhcUhyT0s0SDdHVkxsVEc3YU9RMmVmSGdMV2tqNWtGbVlVb0otRHNfZ05mTWVqVTB2ZFVHTUdhdjhxekpyYXBoaFhEck95N2xjV3pmd1lLQWNuWFlsd0Vtamt3QTFqSjRoVlFrbDYtSzNJbHBna0l5TEdjV2o5eE0ycmk4R1NreHRta3hSSXlaLXVlbXdn?oc=5"
      },
      {
        "name": "Yahoo Finance",
        "href": "https://news.google.com/rss/articles/CBMilgFBVV95cUxQaGUzeDl3LVZBT2gtTWZoSkppa2U0TlNHM2IxZ2FmcXBIM2hpbWJsa1pQQWlHMlNWeVZIRGNPaDFUM08xMjMwUFg3OXpoTmE0TXI1RlJpVXBjazRWeGdXX1FsenIxUzFUY0pFVkZlYkE1QU9Ga2VjYlNSVTF2cnlFelJkbmU4WXpzcy1Eck8tb19zZmdVM1E?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-27",
    "image": {
      "src": "/covers/totalenergies-climate-appeal.png",
      "alt": "The entrance to a Total (TotalEnergies) oil refinery.",
      "credit": "Steve Fareham, CC BY-SA 2.0, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 27 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Supreme Court breakup of Standard Oil (1911)",
        "excerpt": "On May 15, 1911, the U.S. Supreme Court declared Standard Oil an unreasonable monopoly under the Sherman Antitrust Act and ordered the oil empire dissolved into some three dozen independent companies. The court found the trust had crushed rivals through railroad rebates, pipeline abuses, and predatory local price-cutting. It was one of the first times a court compelled a dominant energy company to remake its very structure - and the two largest fragments would grow into Exxon and Mobil.",
        "source": "Standard Oil Co. of New Jersey v. United States, U.S. Supreme Court",
        "href": "https://en.wikipedia.org/wiki/Standard_Oil"
      },
      {
        "category": "historical",
        "title": "The Great Smog of London and the Clean Air Act (1952)",
        "excerpt": "For five days in December 1952, an anticyclone trapped the smoke of countless coal fires over London, blanketing the capital in a lethal yellow fog that killed an estimated 4,000 people at the time - later research put the toll near 12,000 - and sickened roughly 100,000 more. The catastrophe forced a reckoning between industry, domestic fuel-burning, and public health, prompting the landmark Clean Air Act 1956. It stands as a founding moment in the legal recognition that polluters can be compelled by the state to change how they operate.",
        "source": "The Great Smog of London, December 1952",
        "href": "https://en.wikipedia.org/wiki/Great_Smog_of_London"
      },
      {
        "category": "literary",
        "title": "The Goose That Laid the Golden Eggs",
        "excerpt": "A Man and his Wife had the good fortune to possess a Goose which laid a Golden Egg every day. Lucky though they were, they soon began to think they were not getting rich fast enough, and, imagining the bird must be made of gold inside, they decided to kill it in order to secure the whole store of precious metal at once. But when they cut it open they found it was just like any other goose. Thus, they neither got rich all at once, as they had hoped, nor enjoyed any longer the daily addition to their wealth. Much wants more and loses all.",
        "source": "Aesop's Fables, trans. V. S. Vernon Jones",
        "href": "https://www.gutenberg.org/files/11339/11339-h/11339-h.htm"
      },
      {
        "category": "literary",
        "title": "The Flood: judgment upon a corrupted earth (Genesis 6-7)",
        "excerpt": "The earth also was corrupt before God, and the earth was filled with violence. And God looked upon the earth, and, behold, it was corrupt; for all flesh had corrupted his way upon the earth. And God said unto Noah, The end of all flesh is come before me; for the earth is filled with violence through them; and, behold, I will destroy them with the earth. For yet seven days, and I will cause it to rain upon the earth forty days and forty nights.",
        "source": "The Book of Genesis, King James Version",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Genesis"
      },
      {
        "category": "artistic",
        "title": "The Fighting Temeraire (1839)",
        "excerpt": "Turner's celebrated canvas shows the ghostly white warship Temeraire, a hero of Trafalgar, being towed by a squat, black, steam-belching tug to be broken up for scrap beneath a blazing sunset. The painting is read as an elegy for a passing age, overtaken by the smoke and iron of the industrial era. Its collision of fragile beauty and grimy new power makes it an enduring emblem of nature and tradition yielding to industry.",
        "source": "J. M. W. Turner, The National Gallery, London",
        "href": "https://www.nationalgallery.org.uk/paintings/joseph-mallord-william-turner-the-fighting-temeraire",
        "image": {
          "src": "/covers/totalenergies-climate-appeal--a4.png",
          "alt": "A pale, ghostly sailing warship towed by a dark steam tug across a river beneath a fiery sunset",
          "credit": "J. M. W. Turner, The Fighting Temeraire (1839), The National Gallery, London, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "The Houses of Parliament (Effect of Fog) (1903-04)",
        "excerpt": "Painted from a window overlooking the Thames, Monet's canvas dissolves the Gothic towers of Westminster into a haze of coal-smoke and river fog, the sun a smeared disk behind the murk. It belongs to a series in which the artist obsessively recorded London's polluted atmosphere, finding strange beauty in the industrial smog that shrouded the seat of power. The painting turns the byproduct of an energy-hungry age into an image of a city half-erased by its own emissions.",
        "source": "Claude Monet, The Metropolitan Museum of Art",
        "href": "https://www.metmuseum.org/art/collection/search/437115",
        "image": {
          "src": "/covers/totalenergies-climate-appeal--a5.png",
          "alt": "The towers of the Houses of Parliament dissolving into thick blue-grey fog above the Thames",
          "credit": "Claude Monet, The Houses of Parliament (Effect of Fog) (1903-04), The Metropolitan Museum of Art, via Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 11
  },
  {
    "slug": "indonesia-central-bank-governor-steps-down",
    "headline": "Bank Indonesia Governor Perry Warjiyo steps down in a surprise move",
    "overview": "Bank Indonesia Governor Perry Warjiyo has stepped down in a surprise move, ending his tenure at the helm of the central bank of Southeast Asia's largest economy. His abrupt departure unsettled analysts and raised questions over the direction of monetary policy and the rupiah. Attention now turns to his successor and whether policy continuity will hold.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiuwFBVV95cUxPZmRYdXF5Ti13MVMxdDBDLU41eUtfcGs5cTRLbzVYVkFjdGRBSGxIWEVOZS1EaDNMRV9VVEM1QW5TMEZXdEFPYkJkeWRGZ2xhZXFnSm92amF0cjdnSVVNc0dzX1o4MS1Uc2Y1QU9MbU1fQWo5R3BzVjZpT3hVdVJXUG14Y2lfRllHR1NJcHkxa3RzUDFod09YbjhWdUc3OGJqc2RHRXE2Y1BWSi1rTlM0ZzUwcEEzM3NlVlBv?oc=5"
      },
      {
        "name": "Reuters (analysts)",
        "href": "https://news.google.com/rss/articles/CBMiwgFBVV95cUxNYWZ1X3c3TzVhYXhMZUdpQmVzTmJ6ck5leWxIZnpsektLWmk0MEQ3bk9nbXpTcXNuQkVyUXd1WkpxSzUtd0pORkJxd0hYM205cDhDQ2hHNFdldUJBU01QcnhuQzQ1NVZxb3VlSUFoekkyZkRZU3k2N0RvSWlFSlFMeTFIZ1pJX1VsWFltUDdHSGluUW9tdGhtck9NSEhPSHh4T2JQTHFjcnpJLWZZSmlPMGtvMFQ1YjlWN3J6SUoyenhBZw?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-27",
    "image": {
      "src": "/covers/indonesia-central-bank-governor-steps-down.png",
      "alt": "The historic Bank Indonesia building in Jakarta.",
      "credit": "CEphoto, Uwe Aranas, CC BY-SA 3.0, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 27 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Dismissal of Jacques Necker (1789)",
        "excerpt": "On 11 July 1789 King Louis XVI abruptly dismissed Jacques Necker, his immensely popular Director-General of Finances, ordering him to leave France at once. Necker was the guardian of the kingdom's credit, and news of his removal detonated public fury in Paris the very next day. Within two days the threat of counter-revolution had driven citizens to arm themselves and storm the Bastille on 14 July, and the panicked crown recalled Necker in triumph. It remains the classic case of a money-steward's sudden fall shattering public confidence.",
        "source": "Jacques Necker — Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Jacques_Necker"
      },
      {
        "category": "historical",
        "title": "The Abdication of Diocletian (305 AD)",
        "excerpt": "On 1 May 305 AD Diocletian became the first Roman emperor to lay down supreme power voluntarily, stepping aside despite holding office over the whole state. He retired to his palace on the Dalmatian coast at Split, reportedly content to tend his vegetable gardens. But the orderly succession he engineered did not hold: the tetrarchic system collapsed amid the competing dynastic claims of Constantine and Maxentius. His departure is antiquity's great example of a steward relinquishing office and the instability that can follow.",
        "source": "Diocletian — Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Diocletian"
      },
      {
        "category": "literary",
        "title": "The Parable of the Talents",
        "excerpt": "For the kingdom of heaven is as a man travelling into a far country, who called his own servants, and delivered unto them his goods... His lord said unto him, Well done, thou good and faithful servant: thou hast been faithful over a few things, I will make thee ruler over many things: enter thou into the joy of thy lord.",
        "source": "The Gospel of Matthew 25 (King James Version) — Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Matthew"
      },
      {
        "category": "literary",
        "title": "Antonio's Ventures — The Merchant of Venice",
        "excerpt": "Believe me, no. I thank my fortune for it, My ventures are not in one bottom trusted, Nor to one place; nor is my whole estate Upon the fortune of this present year. Therefore my merchandise makes me not sad.",
        "source": "William Shakespeare, The Merchant of Venice (Act I, Scene I) — Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/1515/pg1515.txt"
      },
      {
        "category": "artistic",
        "title": "The Moneylender and His Wife",
        "excerpt": "Quentin Massys's 1514 panel, now in the Louvre, shows a moneylender weighing gold coins on a delicate balance while his wife, distracted from her prayer book, watches the shining metal. The scales, the pearls, and the convex mirror turn a quiet domestic scene into a meditation on value, trust, and the weighing of worldly wealth. It is one of Northern Renaissance art's most enduring images of the keeper of money and the fragile line between honest reckoning and greed.",
        "source": "Quentin Massys (1514), Musée du Louvre",
        "href": "https://en.wikipedia.org/wiki/The_Moneylender_and_His_Wife",
        "image": {
          "src": "/covers/indonesia-central-bank-governor-steps-down--a4.png",
          "alt": "A moneylender weighing gold coins on a balance while his wife looks up from her prayer book, in Quentin Massys's 1514 panel.",
          "credit": "Quentin Massys, 'The Moneylender and His Wife' (1514), Musée du Louvre. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "The Parable of the Rich Fool",
        "excerpt": "In Rembrandt's 1627 panel, an old man sits alone by candlelight amid ledgers and coins, peering closely at a single gold piece he holds up to the flame. The painting illustrates Christ's parable of the rich man who hoarded his wealth only to be told his life would be demanded of him that night. Rembrandt's guttering candle makes the scene a haunting emblem of accumulated money and its sudden vanity when the steward of it is called away.",
        "source": "Rembrandt van Rijn (1627), Gemäldegalerie, Berlin",
        "href": "https://commons.wikimedia.org/wiki/File:Rembrandt_-_The_Parable_of_the_Rich_Fool.jpg",
        "image": {
          "src": "/covers/indonesia-central-bank-governor-steps-down--a5.png",
          "alt": "An old man examines a gold coin by candlelight, surrounded by ledgers and money, in Rembrandt's 1627 painting.",
          "credit": "Rembrandt van Rijn, 'The Parable of the Rich Fool' (1627), Gemäldegalerie, Berlin. Public domain via Wikimedia Commons."
        }
      }
    ],
    "rank": 12
  },
  {
    "slug": "astrazeneca-profit-pipeline",
    "headline": "AstraZeneca beats profit forecasts as oncology and rare-disease drugs ease investor worries over its pipeline",
    "overview": "AstraZeneca reported forecast-beating profit and struck a bullish tone, helping to ease investor concern over the strength of its drug pipeline. Strong sales of the British drugmaker's oncology and rare-disease treatments drove the better-than-expected results, and the company maintained its full-year outlook. The reassuring update helped calm worries about its future medicines.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMi1AFBVV95cUxNYnNMUmJtT0pYWDNuXzNxZjJvVUc1MkZZM1haazV0VURoSzZUMmZIakdjbHhzc28wUy00Wm14V21RSUV2UTZFeVlyMm1QZWxUYkMyZ01FQTFxTkFsWHV0X2xDUnNQeVNxTW5VcndyTEMxd20xb0xFb0Q1a2Rfc1AwcnBjaC1MNWNVRkRKMDROOEUwV1B2WHR3VklWVzBSMDVId1N3TWtyT2MtZDRWdm5HMkZxVEZSNWhJRkN3UFZiRWVsMzV2bDFQUjJJR1ZiNVVXNkdwZQ?oc=5"
      },
      {
        "name": "The Business Times",
        "href": "https://news.google.com/rss/articles/CBMiwgFBVV95cUxNVGQzM1ZBSTFKQk1iN215ZkNCallHY3ZUcEVxeGltWm12V1dkSWREdWt1MWpySFF0T0RyWmlWMXUzNnNNbVdyeXBNWC1MOVRVWFM2WWc4dXBZTm53VTlJVVc2RWVDZkRJZkVqMjlMeTN4aWZuUW5kY3J5ZEFNZXRucU44Y3VYem45UUp4QjB1ZkdDaFpOTmhfODA4cTdaUFcwcTAySThIMmktT1BOOVJWcHlSTDc1RnQ3UExpWHFtcWFhUQ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-27",
    "image": {
      "src": "/covers/astrazeneca-profit-pipeline.png",
      "alt": "AstraZeneca's headquarters in Cambridge, England.",
      "credit": "FDV, CC BY-SA 4.0, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 27 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Edward Jenner and the first smallpox vaccine (1796)",
        "excerpt": "In 1796 the country doctor Edward Jenner tested a folk observation that milkmaids who had caught mild cowpox seemed immune to deadly smallpox. He inoculated eight-year-old James Phipps with matter from a cowpox sore, then exposed the boy to smallpox, which failed to take hold. From the Latin vacca, for cow, Jenner named the technique vaccination, launching the first vaccine and, in time, the only human disease ever eradicated.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Edward_Jenner"
      },
      {
        "category": "historical",
        "title": "Alexander Fleming's discovery of penicillin (1928)",
        "excerpt": "In September 1928, returning to his cluttered laboratory at St Mary's Hospital in London, Alexander Fleming noticed that a stray mould had contaminated a culture plate of Staphylococcus and dissolved the bacterial colonies around it. The mould, a Penicillium, was releasing a substance he named penicillin. His chance observation opened the age of antibiotics, turning once-fatal infections into curable conditions and reshaping the future of medicine.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Alexander_Fleming"
      },
      {
        "category": "literary",
        "title": "The Balm of Gilead (Book of Jeremiah 8:22, KJV)",
        "excerpt": "Is there no balm in Gilead; is there no physician there? why then is not the health of the daughter of my people recovered?",
        "source": "Wikisource (King James Bible)",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Jeremiah"
      },
      {
        "category": "literary",
        "title": "Chaucer's Doctour of Phisyk in The Canterbury Tales",
        "excerpt": "With us ther was a Doctour of Phisyk, In al this world ne was ther noon him lyk To speke of phisik and of surgerye; For he was grounded in astronomye. ... The cause y-knowe, and of his harm the rote, Anon he yaf the seke man his bote. Ful redy hadde he his apothecaries, To sende him drogges and his letuaries, For ech of hem made other for to winne; Hir frendschipe nas nat newe to biginne.",
        "source": "Project Gutenberg (Chaucer's Works, Vol. 4, ed. W. W. Skeat)",
        "href": "https://www.gutenberg.org/ebooks/22120"
      },
      {
        "category": "artistic",
        "title": "The Anatomy Lesson of Dr Nicolaes Tulp (Rembrandt, 1632)",
        "excerpt": "Painted in 1632, Rembrandt's group portrait shows the surgeon Dr Nicolaes Tulp demonstrating the musculature of a cadaver's arm to a circle of Amsterdam physicians, an open anatomical text at the corpse's feet. It celebrates the healer as investigator, dissecting the body to master its hidden workings. One of Rembrandt's early masterpieces, it hangs in the Mauritshuis in The Hague.",
        "source": "Mauritshuis, The Hague",
        "href": "https://en.wikipedia.org/wiki/The_Anatomy_Lesson_of_Dr_Nicolaes_Tulp",
        "image": {
          "src": "/covers/astrazeneca-profit-pipeline--a4.png",
          "alt": "Rembrandt's 1632 painting of Dr Nicolaes Tulp dissecting the arm of a cadaver before a group of attentive surgeons.",
          "credit": "Rembrandt, The Anatomy Lesson of Dr Nicolaes Tulp (1632), Mauritshuis, The Hague, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "The Doctor (Sir Luke Fildes, 1891)",
        "excerpt": "Luke Fildes's 1891 painting shows a doctor keeping vigil at the bedside of a sick child in a humble cottage, watching intently for the fever to break while the anxious parents wait in the shadows. A meditation on the healer's devotion and the limits of medicine, it became one of the most widely reproduced images of the caring physician. The work is held by Tate in London.",
        "source": "Tate, London",
        "href": "https://en.wikipedia.org/wiki/The_Doctor_(painting)",
        "image": {
          "src": "/covers/astrazeneca-profit-pipeline--a5.png",
          "alt": "Luke Fildes's 1891 painting of a physician watching over a sick child lying on chairs in a dim cottage, the worried parents behind him.",
          "credit": "Sir Luke Fildes, The Doctor (1891), Tate, London, via Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 13
  },
  {
    "slug": "israel-international-force-gaza",
    "headline": "Israel's security cabinet approves letting an international force into Gaza under Trump's ceasefire plan",
    "overview": "Israel's security cabinet approved a legal framework allowing a multinational 'International Stabilization Force' to deploy in parts of Gaza that are not under Israeli control, a key step in the US-backed ceasefire plan. Officials said an initial contingent of about 200 personnel from countries such as Uganda and Morocco would help secure Gaza's borders and train local police, with each national contingent requiring separate Israeli approval. The move, opposed by hardline minister Itamar Ben-Gvir, came as Prime Minister Benjamin Netanyahu prepared to travel to Washington to meet President Trump.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMizAFBVV95cUxPWDN6bHZnREFweVoxWXV3U3RxRk0zVmdxYTJ2X0tXdFlPaUNIOXp0NDVKaUZqb1lmQWMxRVo5eGwybWF6MVJIYmdGSm13M0RFTXdXUHV5M28wLXJrNUNrVkhXdzJLem1QLTJHOU80X2ZraGRZZUM4aXY3aUFGYkdtOTlXWVBlNUR4UHFNMXBtRkxGLW1qc292bVljZ3dLa2pJMGUxOGRockNULXdMLWhYTHk2UWxmaDgwd2QyWGZXYWUtZkhVYU43Z2VFZW0?oc=5"
      },
      {
        "name": "Al Jazeera",
        "href": "https://www.aljazeera.com/news/2026/7/26/israeli-government-nods-to-international-stabilisation-force-in-gaza"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-26",
    "image": {
      "src": "/covers/israel-international-force-gaza.png",
      "alt": "A United Nations peacekeeper's pale blue helmet",
      "credit": "Daniel Košinár. Public domain, via Wikimedia Commons"
    },
    "lead": true,
    "edition": "Evening Edition · 26 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Allied Army of Occupation of France (1815–1818)",
        "excerpt": "After Napoleon's final defeat at Waterloo, the victorious powers did not simply go home. Under the Duke of Wellington, roughly 150,000 troops drawn from Britain, Prussia, Austria, Russia and other allied states occupied northeastern France for three years, overseen by a Council of Allied Ambassadors, to guarantee the peace, secure reparations and let a defeated nation rebuild. In 1818 the powers judged the treaty fulfilled and the multinational army marched out, restoring France to the community of nations.",
        "source": "Wikipedia — Military occupation of France",
        "href": "https://en.wikipedia.org/wiki/Military_occupation_of_France",
        "image": {
          "src": "/covers/israel-international-force-gaza--a0.png",
          "alt": "A grand hall filled with dozens of formally dressed statesmen and diplomats gathered around a table at the Congress of Vienna, where the great powers arranged the post-Napoleonic settlement.",
          "credit": "Jean Godefroy, engraving after Jean-Baptiste Isabey, 'The Congress of Vienna' (1819); public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "The Multinational Force in Beirut (1982–1984)",
        "excerpt": "A US-brokered ceasefire brought American, French, Italian and British troops into Beirut to supervise the withdrawal of PLO fighters and shore up Lebanon's government. The lightly armed peacekeepers were meant to hold an uneasy calm in a war-torn city, but were steadily drawn into the fighting. On 23 October 1983 suicide truck bombs killed 241 American and 58 French servicemen, and within months the force withdrew as Lebanon slid back into civil war — a cautionary parallel for foreign troops keeping the peace in the Middle East.",
        "source": "Wikipedia — Multinational Force in Lebanon",
        "href": "https://en.wikipedia.org/wiki/Multinational_Force_in_Lebanon",
        "image": {
          "src": "/covers/israel-international-force-gaza--a1.png",
          "alt": "US Marines and Lebanese Army soldiers manning a sandbagged checkpoint on a Beirut street in 1982, stopping a passing car.",
          "credit": "James Case, 'Checkpoint 4, Beirut 1982' — U.S. Marines and Lebanese Army soldiers at a Beirut checkpoint; CC BY 2.0, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Homer, Iliad, Book III — the truce and the oath",
        "excerpt": "As he spoke he drew his knife across the throats of the victims, and laid them down gasping and dying upon the ground, for the knife had reft them of their strength. Then they poured wine from the mixing-bowl into the cups, and prayed to the everlasting gods, saying, Trojans and Achaeans among one another, “Jove, most great and glorious, and ye other everlasting gods, grant that the brains of them who shall first sin against their oaths—of them and their children—may be shed upon the ground even as this wine, and let their wives become the slaves of strangers.”",
        "source": "Homer, The Iliad, translated by Samuel Butler (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/2199/pg2199.txt",
        "image": {
          "src": "/covers/israel-international-force-gaza--a2.png",
          "alt": "A marble bust of the poet Homer, depicted as a bearded, aged blind man, in the British Museum.",
          "credit": "Roman copy of a Hellenistic bust of Homer, British Museum; photograph public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "The Beatitudes — “Blessed are the peacemakers” (Matthew 5:9)",
        "excerpt": "Blessed are the merciful: for they shall obtain mercy. Blessed are the pure in heart: for they shall see God. Blessed are the peacemakers: for they shall be called the children of God.",
        "source": "The Gospel of Matthew, King James Version (Wikisource)",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Matthew",
        "image": {
          "src": "/covers/israel-international-force-gaza--a3.png",
          "alt": "Christ preaching the Sermon on the Mount to a seated crowd on a hillside, bathed in soft light.",
          "credit": "Carl Heinrich Bloch, 'The Sermon on the Mount' (1877); public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Gerard ter Borch, 'The Ratification of the Treaty of Münster' (1648)",
        "excerpt": "Painted by an eyewitness, this small, meticulous oil on copper records the exact moment envoys of Spain and the Dutch Republic swore oaths to ratify the peace that ended the Eighty Years' War — a founding image of the Peace of Westphalia. Some seventy-seven dignitaries crowd the Münster town hall, hands raised in oath, turning a diplomatic signature into a solemn, collective act that binds warring powers to a negotiated peace.",
        "source": "The National Gallery, London (NG896)",
        "href": "https://www.nationalgallery.org.uk/paintings/gerard-ter-borch-the-ratification-of-the-treaty-of-munster",
        "image": {
          "src": "/covers/israel-international-force-gaza--a4.png",
          "alt": "A crowded seventeenth-century hall where finely dressed envoys raise their hands to swear an oath ratifying a peace treaty.",
          "credit": "Gerard ter Borch, 'The Ratification of the Treaty of Münster', 1648, oil on copper; National Gallery, London; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Peter Paul Rubens, 'Minerva Protects Pax from Mars (Peace and War)' (c. 1629–30)",
        "excerpt": "Rubens painted this shimmering allegory while serving as a peace envoy from Spain to the court of Charles I of England. Peace, a nursing mother, pours out her bounty to children under the shield of the helmeted Minerva, who thrusts back the armored war-god Mars and his Fury — an argument in paint that wisdom must actively hold war at bay for peace and plenty to flourish. Rubens gave the picture to the king, and an Anglo-Spanish peace treaty followed in 1630.",
        "source": "The National Gallery, London (NG46)",
        "href": "https://www.nationalgallery.org.uk/paintings/peter-paul-rubens-minerva-protects-pax-from-mars-peace-and-war",
        "image": {
          "src": "/covers/israel-international-force-gaza--a5.png",
          "alt": "An allegorical scene in which the armored goddess Minerva pushes back the war-god Mars while Peace nurses a child amid fruit, treasure and celebrating figures.",
          "credit": "Peter Paul Rubens, 'Minerva Protects Pax from Mars (Peace and War)', c. 1629–30; National Gallery, London; public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 14
  },
  {
    "slug": "brazil-argentina-ambassador-recall-milei",
    "headline": "Brazil recalls its ambassador to Argentina after President Milei insults Lula and his government",
    "overview": "Brazil recalled its ambassador to Argentina after President Javier Milei publicly insulted President Luiz Inacio Lula da Silva and other Brazilian officials, escalating a feud between South America's two largest economies. The diplomatic rupture underscores the sharp ideological split between Milei, a libertarian ally of Donald Trump, and the leftist Lula. Trade and regional cooperation through the Mercosur bloc could be strained by the deepening rift.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMipgFBVV95cUxNZWdjNy1NZHVGNHVGNUpBdUYtZkdwM3VrZ3NZWFg4OC1yMzh0aWs1eUFyTHdWT0NtWlpENFRGWGRWN0ladGpPYldPaU1lVmMwdGZiWjhab18xRjZ4N3BMWldPQnNNTlNPVTNXa0tsUGxyejNBTDVjWV9iQllJcjJ2MXM2ZzVMcXlyRmxrNUczaklvdDVBQVpja1dGbXpUU3VkM1N0RDFn?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiwAFBVV95cUxPTU9NOEtMYzBWMVVrbzlvZ00wQVBoVE9RbWw5OWVwSzB1NTQyMHM2Y3ZkNWhveWp4WnZVMldNZXlYUHZGZFBVazlLN1NObkdwRVFRT3k0ZHRnSEhNZGI5ZGVxYUZUMU93SWpGbThxYWVZbnBidGY3NnBiN1l0QjR1eF9ES0dwUXZtc1Y0MndBNHVLUEJMVVo4QWhUbUFfb21kNHZDNUdSQmJ0RTFiU3A2NW5ERUxxQzRya0VDaVlIcXU?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-26",
    "image": {
      "src": "/covers/brazil-argentina-ambassador-recall-milei.png",
      "alt": "Argentine President Javier Milei standing beside Brazilian President Lula da Silva",
      "credit": "Gobierno argentino, CC BY 4.0, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 26 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Elizabeth I expels the Spanish ambassador Bernardino de Mendoza (1584)",
        "excerpt": "In January 1584 Queen Elizabeth I declared Philip II's ambassador in London, Bernardino de Mendoza, persona non grata for his part in the Throckmorton Plot to depose her, and ordered him out of the realm. The expulsion severed formal Anglo-Spanish diplomacy and helped set the two powers on the road to the Armada of 1588 - an early-modern illustration of how a single insult to a head of state can collapse relations between rival neighbours.",
        "source": "Wikipedia: Bernardino de Mendoza",
        "href": "https://en.wikipedia.org/wiki/Bernardino_de_Mendoza",
        "image": {
          "src": "/covers/brazil-argentina-ambassador-recall-milei--a0.png",
          "alt": "Portrait of Queen Elizabeth I in an ornate jewelled gown, her hand resting on a globe, with the Spanish Armada shown in the windows behind her.",
          "credit": "Attributed to George Gower, 'Elizabeth I (Armada Portrait)', c. 1588, oil on panel, Woburn Abbey collection; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "The Cisplatine War: Brazil and Argentina go to war (1825-1828)",
        "excerpt": "When the United Provinces of the Rio de la Plata backed the Thirty-Three Orientals and annexed the disputed Cisplatina, Brazil declared war on 10 December 1825 and blockaded the River Plate. The two largest states of South America fought for three years - climaxing in the Argentine cavalry victory at Ituzaingo in 1827 - before British mediation created independent Uruguay as a buffer. It is the founding chapter of the Brazil-Argentina rivalry now echoed in the Milei-Lula feud.",
        "source": "Wikipedia: Cisplatine War",
        "href": "https://en.wikipedia.org/wiki/Cisplatine_War",
        "image": {
          "src": "/covers/brazil-argentina-ambassador-recall-milei--a1.png",
          "alt": "Painting of the Battle of Ituzaingo, 20 February 1827, showing massed cavalry and infantry of the United Provinces and Brazilian armies clashing on open ground.",
          "credit": "'20 de Febrero de 1827 - Batalla de Ituzaingo', 19th-century depiction of the Cisplatine War battle; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Achilles insults Agamemnon in Homer's Iliad, Book I",
        "excerpt": "“Wine-bibber,” he cried, “with the face of a dog and the heart of a hind, you never dare to go out with the host in fight, nor yet with our chosen men in ambuscade. You shun this as you do death itself. You had rather go round and rob his prizes from any man who contradicts you. You devour your people, for you are king over a feeble folk; otherwise, son of Atreus, henceforward you would insult no man.”",
        "source": "Homer, The Iliad, Book I (trans. Samuel Butler), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/2199/2199-h/2199-h.htm",
        "image": {
          "src": "/covers/brazil-argentina-ambassador-recall-milei--a2.png",
          "alt": "Neoclassical painting of Achilles confronting Agamemnon before the assembled Greek chieftains, gesturing angrily in the quarrel over Briseis.",
          "credit": "Johann Heinrich Tischbein the Elder, 'Achilles has a Dispute with Agamemnon', 1776; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "The feud of two great houses in Shakespeare's Romeo and Juliet",
        "excerpt": "Two households, both alike in dignity,\nIn fair Verona, where we lay our scene,\nFrom ancient grudge break to new mutiny,\nWhere civil blood makes civil hands unclean.\nFrom forth the fatal loins of these two foes\nA pair of star-cross'd lovers take their life;\nWhose misadventur'd piteous overthrows\nDoth with their death bury their parents' strife.",
        "source": "William Shakespeare, Romeo and Juliet, Prologue, Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/1513/pg1513.txt",
        "image": {
          "src": "/covers/brazil-argentina-ambassador-recall-milei--a3.png",
          "alt": "Victorian painting of the heads of the Montague and Capulet families reconciling over the shrouded bodies of Romeo and Juliet in a candlelit tomb.",
          "credit": "Frederic Leighton, 'The Reconciliation of the Montagues and the Capulets over the Dead Bodies of Romeo and Juliet', 1855; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Candido Lopez paints the Brazilian fleet at Curupayti (Paraguayan War)",
        "excerpt": "The Argentine soldier-painter Candido Lopez, who lost his right hand in the War of the Triple Alliance and taught himself to paint with his left, recorded the vast panoramic battlefields where Brazil and Argentina fought side by side against Paraguay. Here the Brazilian squadron bombards the batteries of Curupayti on 22 September 1866 - a naive-style eyewitness vision of the militarised River Plate world from which today's Brazil-Argentina rivalry descends.",
        "source": "Candido Lopez, 'Attack of the Brazilian Squadron on the batteries of Curupayti', Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Ataque_de_la_escuadra_Brasile%C3%B1a_a_las_baterias_de_Curupayt%C3%AD,_el_22_de_Septiembre_de_1866.jpg",
        "image": {
          "src": "/covers/brazil-argentina-ambassador-recall-milei--a4.png",
          "alt": "Wide panoramic naive-style painting of the Brazilian ironclad squadron firing on riverside earthwork batteries at Curupayti, with smoke over the water and troops along the shore.",
          "credit": "Candido Lopez, 'Ataque de la escuadra Brasilena a las baterias de Curupayti, el 22 de Septiembre de 1866', late 19th century; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "The Argentine National Anthem (Blas Parera, 1813)",
        "excerpt": "Composed by Blas Parera to words by Vicente Lopez y Planes and adopted on 11 May 1813, the Himno Nacional Argentino is a martial hymn of national pride born in the independence struggles that also pitted the new republic against imperial Brazil. Its stirring appeal to freedom and glory captures the fierce patriotism that still charges Argentina's rivalry with its giant neighbour. The full score is available on IMSLP.",
        "source": "Blas Parera, Himno nacional argentino, IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Himno_nacional_argentino_(Parera,_Blas)",
        "image": {
          "src": "/covers/brazil-argentina-ambassador-recall-milei--a5.png",
          "alt": "Painting of a candlelit salon in 1813 Buenos Aires where guests gather around a keyboard as the Argentine national anthem is performed for the first time.",
          "credit": "Pedro Subercaseaux, 'Himno Nacional Argentino' (first performance in the salon of Mariquita Sanchez de Thompson), 1910; public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 15
  },
  {
    "slug": "iss-crew-lands-kazakhstan-soyuz",
    "headline": "A US-Russian crew lands safely in Kazakhstan after eight months aboard the International Space Station",
    "overview": "A Soyuz capsule carrying two Russian cosmonauts and a NASA astronaut touched down on the steppe of Kazakhstan, ending an eight-month mission aboard the International Space Station, Russia's space agency Roscosmos said. The landing capped a stint that continued despite geopolitical tensions on the ground, a rare arena of sustained US-Russian cooperation. Recovery teams reported the crew was in good condition after the parachute-assisted descent.",
    "genre": "Science",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMijwFBVV95cUxQMjhCbExqSTExRUJpUEpoTERHUjJadUFCbjRTSS14WUdrWmhPMVMyd29iaFJrckpPMUFyb3JnbEZHTENZeU1XMGV4M0l6MHBFQjI1YWljM3VvaHpUSktmYWhhcEpZMHlla2dtcFBmUEZpbVZna3U4aUxVX3c2SDV3OTMwMlhnWlBkYWoxb3lsYw?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMitwFBVV95cUxOMVdoalg3dHoyTkpNMVNtYnFMcmxZM2ppU1ZEUUZReDR5bXh2OVNqUXBVZnI5N0lld1BTdVdjdkM1dGhKdERIWkptRUU2R2FtaGR3UWJ6SFJ0YjRTN0Ixa0RZTzN1ci1xZV94VF9xQTlBMGU0TEJocC1xUGw4SHdlbGtaNHZILU1Hc2YzQmxjSXdvdUJmT2c0NkNiV1ZxM0tTUk1ndG12QVAwRkZkN1lTdzJVUjUwLXM?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-26",
    "image": {
      "src": "/covers/iss-crew-lands-kazakhstan-soyuz.png",
      "alt": "A Soyuz spacecraft descending under its parachute above the clouds over Central Asia",
      "credit": "Bill Ingalls. Public domain, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 26 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Victoria limps home to Seville, 1522",
        "excerpt": "In September 1522 the battered nao Victoria, under Juan Sebastian Elcano, dropped anchor at Seville after nearly three years at sea, having completed the first circumnavigation of the globe. Of the roughly 270 men and five ships that set out under Magellan, only 18 gaunt survivors and a single vessel returned. Like the Soyuz crew stepping onto the Kazakh steppe, they came back from an almost unimaginable voyage to a homeland that had changed while they were gone, proof that human beings can go to the edge of the known world and still find their way home.",
        "source": "Wikipedia, Magellan expedition",
        "href": "https://en.wikipedia.org/wiki/Magellan_expedition",
        "image": {
          "src": "/covers/iss-crew-lands-kazakhstan-soyuz--a0.png",
          "alt": "Engraved detail of the sailing ship Victoria under full sail, from Abraham Ortelius's 16th-century map, with a banner naming her the first ship to circle the globe.",
          "credit": "Abraham Ortelius, detail of the ship Victoria from Maris Pacifici, 1589, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "The handshake in space, Apollo-Soyuz 1975",
        "excerpt": "On 17 July 1975, at the height of the Cold War, an American Apollo spacecraft docked with a Soviet Soyuz in orbit and commander Thomas Stafford clasped the hand of cosmonaut Aleksei Leonov through the open hatch. The first joint US-Soviet mission turned two superpower rivals into partners 220 kilometres above the Earth, and set the precedent for Shuttle-Mir and the International Space Station. It is the direct ancestor of a Soyuz carrying two Russians and an American home together, cooperation in orbit outlasting hostility on the ground.",
        "source": "NASA History, 45 Years Ago: Historic Handshake in Space",
        "href": "https://www.nasa.gov/history/45-years-ago-historic-handshake-in-space/",
        "image": {
          "src": "/covers/iss-crew-lands-kazakhstan-soyuz--a1.png",
          "alt": "Astronaut Thomas Stafford and cosmonaut Aleksei Leonov reach through a spacecraft hatch to shake hands, smiling, in 1975.",
          "credit": "NASA, Apollo-Soyuz Test Project handshake, 17 July 1975 (photo S75-29432), public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Odysseus kisses the soil of Ithaca",
        "excerpt": "As she spoke the goddess dispersed the mist and the land appeared. Then Ulysses rejoiced at finding himself again in his own land, and kissed the bounteous soil; he lifted up his hands and prayed to the nymphs, saying, “Naiad nymphs, daughters of Jove, I made sure that I was never again to see you, now therefore I greet you with all loving salutations, and I will bring you offerings as in the old days, if Jove’s redoubtable daughter will grant me life, and bring my son to manhood.”",
        "source": "Homer, The Odyssey, Book XIII (trans. Samuel Butler), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/1727/1727-h/1727-h.htm",
        "image": {
          "src": "/covers/iss-crew-lands-kazakhstan-soyuz--a2.png",
          "alt": "Renaissance fresco of Penelope seated at her loom surrounded by suitors while, through the window, a returning ship and figures approach, evoking Odysseus's homecoming.",
          "credit": "Pinturicchio, Penelope with the Suitors (The Return of Odysseus), c. 1509, National Gallery, London, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Verne's travellers fished alive from the Pacific",
        "excerpt": "By this time, all the passengers of the Susquehanna could easily recognize the object of such weary longings and desperate searches, floating quietly a short distance before them in the last rays of the declining day! ... Who can describe the welcome that greeted these long lost, long beloved, long despaired of Sons of Earth, now so suddenly and unexpectedly rescued from destruction, and restored once more to the wonderstricken eyes of admiring humanity?",
        "source": "Jules Verne, All Around the Moon (Round the Moon), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/16457/16457-h/16457-h.htm",
        "image": {
          "src": "/covers/iss-crew-lands-kazakhstan-soyuz--a3.png",
          "alt": "Nineteenth-century engraving of a dark globe hanging in a star-filled sky beside a glowing crescent, seen from the void of space.",
          "credit": "Emile Bayard and Alphonse de Neuville, illustration from Jules Verne's Around the Moon, 1870s edition, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Van Gogh, The Starry Night",
        "excerpt": "Painted from an asylum window in 1889, Van Gogh's swirling night sky turns the heavens into a field of living, churning light above a sleeping village. It captures the same pull that draws crews to orbit and the same yearning for the quiet earth below, the wonder of looking up matched by the comfort of home. For a crew who spent eight months watching sunrises every ninety minutes, it is a fitting emblem of the sky they lived in and the ground they longed to return to.",
        "source": "Vincent van Gogh, The Starry Night, Museum of Modern Art, via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/iss-crew-lands-kazakhstan-soyuz--a4.png",
          "alt": "A swirling deep-blue night sky filled with luminous stars and a bright crescent moon over a quiet village with a tall cypress tree.",
          "credit": "Vincent van Gogh, The Starry Night, 1889, oil on canvas, Museum of Modern Art, New York, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Holst, The Planets",
        "excerpt": "Gustav Holst's seven-movement orchestral suite, written during the First World War, gives each planet a musical character, from the pounding menace of Mars to the serene mysticism of Neptune fading into silence. It is the West's grandest musical portrait of the solar system, a work that hears wonder and unease in the same sky that the returning crew crossed for eight months. Its sweeping, otherworldly sound has become shorthand for the awe of leaving Earth and gazing back at it.",
        "source": "Gustav Holst, The Planets, Op. 32, full score, IMSLP",
        "href": "https://imslp.org/wiki/The_Planets,_Op.32_(Holst,_Gustav)",
        "image": {
          "src": "/covers/iss-crew-lands-kazakhstan-soyuz--a5.png",
          "alt": "Black-and-white portrait photograph of composer Gustav Holst, a bespectacled man in a dark suit.",
          "credit": "Herbert Lambert, portrait of Gustav Holst, c. 1920, public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 16
  },
  {
    "slug": "nolan-odyssey-second-weekend-boxoffice",
    "headline": "Christopher Nolan's 'The Odyssey' takes $87 million in its second weekend, a career-best hold",
    "overview": "Christopher Nolan's adaptation of Homer's 'The Odyssey' earned an estimated $87 million in its second weekend at the North American box office, dropping only about 30% and giving the director his best-ever second weekend. The film has now grossed roughly $286 million domestically. Its staying power marks one of the strongest holds for an R-rated epic in years.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMihAFBVV95cUxQaVNULUFnSTR1NkEtZXBPZHZTRlpZYXVVUWEtMU5jMjY0cXZlUGN5RUZjTHZuaEpRSXRSMnhCYm9RbXNaZXBGa3hYanNGWVo0ZDhvaDF4N0w3d1l6SkJua2tHVDlUSXNkbDBJU01CUnd0RHk3SUVqb2RHVHk4UGkzMm9KUHE?oc=5"
      },
      {
        "name": "Deadline",
        "href": "https://deadline.com/2026/07/box-office-the-odyssey-motor-city-her-private-hell-hadestown-1237002537/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-26",
    "image": {
      "src": "/covers/nolan-odyssey-second-weekend-boxoffice.png",
      "alt": "J.M.W. Turner's stormy seascape of Ulysses deriding the giant Polyphemus from his ship",
      "credit": "J. M. W. Turner. Public domain, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 26 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Rhapsodes reciting Homer at the Panathenaic festival in Athens",
        "excerpt": "For centuries before it was ever written down, the Odyssey was a performance. At Athens' great Panathenaic festival, professional reciters called rhapsodes chanted Homer's verses in relay before vast civic crowds, a custom credited to the age of Peisistratus and Solon. Like a modern audience packing a cinema for the same beloved story, Athenians returned year after year to hear Odysseus struggle home again, the crowd already knowing every twist.",
        "source": "Rhapsode (ancient Greek epic performance)",
        "href": "https://en.wikipedia.org/wiki/Rhapsode",
        "image": {
          "src": "/covers/nolan-odyssey-second-weekend-boxoffice--a0.png",
          "alt": "A robed figure gestures dramatically while reciting from an open scroll before listeners, in a warm-toned 18th-century painting.",
          "credit": "Giovanni Domenico Tiepolo, 'Rhapsode' (18th century), Venice; via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "historical",
        "title": "'L'Odissea' (1911): the first spectacular screen Odyssey",
        "excerpt": "More than a century before Nolan, the Odyssey drew crowds to a new mass medium. Milano Films' 'L'Odissea', made for Italy's 1911 jubilee, was among the earliest feature-length adaptations of Homer, staging Odysseus blinding the Cyclops and sailing past the Sirens with pioneering special effects. The American trade press hailed it as marking 'a new epoch in the history of the motion picture', proof that Homer's tale could fill theaters in any era.",
        "source": "L'Odissea (1911 film)",
        "href": "https://en.wikipedia.org/wiki/L'Odissea_(1911_film)",
        "image": {
          "src": "/covers/nolan-odyssey-second-weekend-boxoffice--a1.png",
          "alt": "A sepia-toned still from a 1911 silent film showing a costumed Odysseus and his men in a classical scene.",
          "credit": "Still from 'L'Odissea' (Milano Films, 1911), dir. Bertolini, Padovan and de Liguoro; via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "literary",
        "title": "Homer, 'The Odyssey' — the invocation of the Muse",
        "excerpt": "Tell me, O Muse, of that ingenious hero who travelled far and wide after he had sacked the famous town of Troy. Many cities did he visit, and many were the nations with whose manners and customs he was acquainted; moreover he suffered much by sea while trying to save his own life and bring his men safely home; but do what he might he could not save his men, for they perished through their own sheer folly in eating the cattle of the Sun-god Hyperion; so the god prevented them from ever reaching home.",
        "source": "Homer, 'The Odyssey', trans. Samuel Butler (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/1727/1727-h/1727-h.htm",
        "image": {
          "src": "/covers/nolan-odyssey-second-weekend-boxoffice--a2.png",
          "alt": "Marble bust of a blind, bearded old man with deeply lined features and a fillet in his hair, the idealized ancient portrait of Homer.",
          "credit": "Bust of Homer ('Homer from Baiae'), Roman copy after a Hellenistic original, British Museum; via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "literary",
        "title": "Alfred, Lord Tennyson, 'Ulysses'",
        "excerpt": "Come, my friends,\n'Tis not too late to seek a newer world.\nPush off, and sitting well in order smite\nThe sounding furrows; for my purpose holds\nTo sail beyond the sunset, and the baths\nOf all the western stars, until I die.\nIt may be that the gulfs will wash us down:\nIt may be we shall touch the Happy Isles,\nAnd see the great Achilles, whom we knew.\nTho' much is taken, much abides; and tho'\nWe are not now that strength which in old days\nMoved earth and heaven; that which we are, we are;\nOne equal temper of heroic hearts,\nMade weak by time and fate, but strong in will\nTo strive, to seek, to find, and not to yield.",
        "source": "Alfred, Lord Tennyson, 'Ulysses' (1842), via Wikisource",
        "href": "https://en.wikisource.org/wiki/Ulysses_(Tennyson)",
        "image": {
          "src": "/covers/nolan-odyssey-second-weekend-boxoffice--a3.png",
          "alt": "A dark, brooding photographic portrait of the aging poet Alfred Tennyson, bearded and cloaked, gazing downward.",
          "credit": "Portrait photograph of Alfred, Lord Tennyson, 1869; via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "artistic",
        "title": "J. W. Waterhouse, 'Ulysses and the Sirens' (1891)",
        "excerpt": "Waterhouse freezes the Odyssey's most famous test of willpower: Odysseus lashed to the mast, straining toward the Sirens' song while his wax-stopped crew row grimly on. Here the Sirens swarm as bird-women wheeling around the ship, turning Homer's episode of temptation and endurance into a taut Victorian drama of desire held in check. It is the same charged image of a hero bound to his course that keeps drawing audiences back to the tale.",
        "source": "National Gallery of Victoria, Melbourne",
        "href": "https://en.wikipedia.org/wiki/Ulysses_and_the_Sirens_(Waterhouse)",
        "image": {
          "src": "/covers/nolan-odyssey-second-weekend-boxoffice--a4.png",
          "alt": "A painted ship where a bound Odysseus strains at the mast as rowers pull hard and bird-bodied Sirens swoop around them against dark cliffs.",
          "credit": "John William Waterhouse, 'Ulysses and the Sirens' (1891), oil on canvas, National Gallery of Victoria, Melbourne; via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "artistic",
        "title": "Monteverdi, 'Il ritorno d'Ulisse in patria' (1640)",
        "excerpt": "One of the earliest operas to survive, Monteverdi's 'Il ritorno d'Ulisse in patria' set the Odyssey's homecoming to music for Venetian audiences in 1640, dramatizing Ulysses' return, Penelope's long grief, and the slaughter of the suitors. That a founding masterpiece of opera chose Homer's homecoming as its subject shows how each new art form, from epic recitation to film, reaches instinctively for the Odyssey. The work endures on the world's stages nearly four centuries later.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Il_ritorno_d'Ulisse_in_patria,_SV_325_(Monteverdi,_Claudio)",
        "image": {
          "src": "/covers/nolan-odyssey-second-weekend-boxoffice--a5.png",
          "alt": "A painted portrait of the Baroque composer Claudio Monteverdi, a bearded man in dark clerical dress.",
          "credit": "Portrait of composer Claudio Monteverdi (c. 1630); via Wikimedia Commons (public domain)."
        }
      }
    ],
    "rank": 17
  },
  {
    "slug": "cuba-political-genocide-castro-absent",
    "headline": "Cuba's president accuses the US of 'political genocide' as Raul Castro is absent from a revolution anniversary",
    "overview": "President Miguel Diaz-Canel accused the United States of waging 'political genocide' against Cuba through its tightened economic embargo, in a speech marking the anniversary of the 1953 Moncada barracks attack that launched Fidel Castro's revolution. Former leader Raul Castro, 95, was notably absent from the state ceremony, fueling speculation about his health. The island is grappling with severe shortages of food, fuel and electricity.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMinAFBVV95cUxQd1FYWkFId25MQnZrSTUwekNMVlY4QVZOV3pGLUxoOGRHOG1Wd2VKeklZMnVUSDA2bGxRbWtRUHc4TVJxd01ZU19sRklRcFhDdVlfNFh1SFd3OXB5MnRRVzFtR0ZOWHl6M0I4NEJzWnBMYldIYjBCd2laczFhWTloVENxaUdkRmtYZkJ5c2Z2SW1ZQUctT2NwQmM3THQ?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiuwFBVV95cUxPUkVpbHZmOElySlBqX24tekhHUldkNjFwU3Zvd280X0xmR0hqMUhtWDFaZk1OZUpodkdyUnFyT3JXbzdGcEExMkxCSXFnZGtsR1NFZktOWTdPR2ZXY29FMXdjRlhDSElBM01IaWIxMnpIMFJpX0F1UnRzOHN6LWU2NlJad2IzVDl0akNpNlVaOVhtNVNlM2pfdEh0MWRhMmJWRW9rMXRwTTRLWFdySEhpZ0VnRkpfTGFtU1ZN?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-26",
    "image": {
      "src": "/covers/cuba-political-genocide-castro-absent.png",
      "alt": "The Jose Marti Memorial rising over Havana's Plaza de la Revolucion",
      "credit": "MªdelC, CC BY-SA 4.0, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 26 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Storming of the Bastille (14 July 1789)",
        "excerpt": "On 14 July 1789 a Parisian crowd overran the medieval fortress-prison of the Bastille after four hours of fighting that left ninety-four dead; the governor was killed after surrendering. Though the fortress held only seven prisoners and was already slated for demolition, revolutionaries made its fall the founding myth of the Republic, an annual rite commemorating the overthrow of tyranny. Told of the attack, Louis XVI asked whether it was a revolt, and was answered: 'No, sire, it is not a revolt; it is a revolution.' Like Cuba's July 26 ceremonies around the Moncada attack, the date became a sacred anniversary on which a regime rehearses its own origin story.",
        "source": "Wikipedia: Storming of the Bastille",
        "href": "https://en.wikipedia.org/wiki/Storming_of_the_Bastille",
        "image": {
          "src": "/covers/cuba-political-genocide-castro-absent--a0.png",
          "alt": "A watercolour of the Bastille under attack: a crowd and smoke surround the towered stone fortress as insurgents storm the gates.",
          "credit": "Jean-Pierre Houel, 'Prise de la Bastille', 1789, Bibliotheque nationale de France; public domain via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "The Berlin Blockade and Airlift (1948-1949)",
        "excerpt": "From 24 June 1948 to 12 May 1949 the Soviet Union severed all rail, road and canal access to West Berlin, gambling that hunger and cold would force the Western powers out. Electricity in the western sectors was cut to as little as two hours a day, coal ran short as winter approached, and food rations tightened while residents scavenged and traded on the black market. Britain and the United States answered with an airlift of more than 200,000 flights delivering food and fuel, at the cost of dozens of aircrew lives. The episode stands as the Cold War's starkest lesson in how a blockade grinds down an ordinary population, the very toll Diaz-Canel invokes when he calls the US embargo 'political genocide.'",
        "source": "Wikipedia: Berlin Blockade",
        "href": "https://en.wikipedia.org/wiki/Berlin_Blockade",
        "image": {
          "src": "/covers/cuba-political-genocide-castro-absent--a1.png",
          "alt": "Berliners crowd atop rubble watching a four-engined C-54 transport plane descend to land at Tempelhof airfield during the airlift.",
          "credit": "U.S. Air Force photograph, Berlin Airlift, C-54 landing at Tempelhof, 1948; public domain via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Jose Marti, 'Our America' (1891)",
        "excerpt": "The natural man, strong and indignant, comes and overthrows the authority that is accumulated from books because it is not administered in keeping with the manifest needs of the country. To know is to solve. To know the country and govern it in accordance with that knowledge is the only way of freeing it from tyranny.",
        "source": "Jose Marti, 'Our America' (Nuestra America), first published 1891",
        "href": "http://www.historyofcuba.com/history/marti/America.htm",
        "image": {
          "src": "/covers/cuba-political-genocide-castro-absent--a2.png",
          "alt": "A sepia photograph of Cuban patriot and writer Jose Marti, formally dressed with a moustache, addressing supporters.",
          "credit": "Photograph of Jose Marti in Ybor City, c. 1890s; public domain via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Percy Bysshe Shelley, 'Ozymandias' (1818)",
        "excerpt": "I met a Traveller from an antique land,\nWho said, \"Two vast and trunkless legs of stone\nStand in the desart. Near them, on the sand,\nHalf sunk, a shattered visage lies, whose frown,\nAnd wrinkled lip, and sneer of cold command,\nTell that its sculptor well those passions read,\nWhich yet survive, stamped on these lifeless things,\nThe hand that mocked them, and the heart that fed:\nAnd on the pedestal these words appear:\n\"My name is Ozymandias, King of Kings.\nLook on my works ye Mighty, and despair!\"\nNo thing beside remains. Round the decay\nOf that Colossal Wreck, boundless and bare,\nThe lone and level sands stretch far away.",
        "source": "Percy Bysshe Shelley, 'Ozymandias', The Examiner, 11 January 1818",
        "href": "https://en.wikisource.org/wiki/The_Examiner_(London)/Ozymandias",
        "image": {
          "src": "/covers/cuba-political-genocide-castro-absent--a3.png",
          "alt": "The colossal granite bust of Ramesses II, the 'Younger Memnon', its serene face and shoulders towering in a museum gallery.",
          "credit": "Colossal bust of Ramesses II, the 'Younger Memnon', c. 1250 BC, British Museum; photograph public domain via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Eugene Delacroix, 'Liberty Leading the People' (1830)",
        "excerpt": "Delacroix's great Romantic canvas turns revolution into allegory: a bare-breasted Liberty in a Phrygian cap strides over a barricade of the fallen, the tricolour in one hand and a bayoneted musket in the other, a pistol-wielding boy at her side and a crowd of workers and bourgeois surging behind her. Painted after the July Revolution of 1830, it fuses fresh corpses and soaring hope into the enduring image of an uprising made sacred, the same alchemy by which Cuba's revolution consecrates its own dead and its founding day.",
        "source": "Eugene Delacroix, 'La Liberte guidant le peuple', 1830, Musee du Louvre",
        "href": "https://en.wikipedia.org/wiki/Liberty_Leading_the_People",
        "image": {
          "src": "/covers/cuba-political-genocide-castro-absent--a4.png",
          "alt": "A woman personifying Liberty, tricolour flag raised and musket in hand, leads armed fighters over a barricade of bodies through gunsmoke.",
          "credit": "Eugene Delacroix, 'Liberty Leading the People', 1830, Musee du Louvre (after 2024 restoration); public domain via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Rouget de Lisle, 'La Marseillaise' (1792)",
        "excerpt": "Composed in a single night in 1792 as a war song for the Rhine army, 'La Marseillaise' became the anthem of the French Revolution and, later, of France itself, its call to citizens to march against tyranny echoing through every subsequent uprising. Isidore Pils's painting captures the myth of its birth: Rouget de Lisle, standing and singing with outstretched arm, unveils the hymn to a rapt gathering. Revolutionary anthems like this one, and Cuba's own 'La Bayamesa', are the sonic liturgy of anniversaries such as July 26, binding a people to the memory of its founding fight.",
        "source": "Claude-Joseph Rouget de Lisle, 'La Marseillaise', 1792 (scores at IMSLP)",
        "href": "https://imslp.org/wiki/La_Marseillaise_(Rouget_de_Lisle,_Claude-Joseph)",
        "image": {
          "src": "/covers/cuba-political-genocide-castro-absent--a5.png",
          "alt": "A dramatic painting of Rouget de Lisle standing and singing La Marseillaise with arm raised before an attentive gathering in a candlelit room.",
          "credit": "Isidore Pils, 'Rouget de Lisle chantant la Marseillaise', 1849; public domain via Wikimedia Commons"
        }
      }
    ],
    "rank": 18
  },
  {
    "slug": "africa-super-el-nino-economic-hit",
    "headline": "Africa faces a $10 billion to $20 billion economic hit from a looming 'super' El Nino, development bank warns",
    "overview": "A 'super' El Nino could cut the GDP of the hardest-hit African countries by 1% to 2%, amounting to $10 billion to $20 billion in losses across the continent, the African Development Bank's climate director Anthony Nyong warned. Farmers are already facing nearly $330 million in lost income this year, while warming seas threaten fisheries. The bank cautioned that damaged infrastructure and unpaid loans could strain government finances and banks.",
    "genre": "Climate",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMizgFBVV95cUxORTVKMDhrM083OEFuZWQ1am92SHdCUXpQVmVkWkFBVTdXWUlGNzNGcDlsSlVLNWdTc0lZT2J5MHV1NHFjUHhzVG83MmRkQ3VsYjhpbFNXbkNYNkJLSnQ2RlFQbmRoa3lQUWJJOWt0TXZ0b3k3c1R6YXpGVlRTM2xSV0FoZmxMMXdhM1N1WU5kbmJWZnNLRTM4RW1xQ3N0WFlxcWRTVHRxY2drWC1FU3ZGdkJFMDhYd25aamhZNUJTYjRDTHg1TUhFdVBQeTdlQQ?oc=5"
      },
      {
        "name": "Free Malaysia Today",
        "href": "https://www.freemalaysiatoday.com/category/world/2026/07/26/africa-facing-us-10bil-us-20bil-economic-hit-from-super-el-nino-warns-afdb-climate-chief"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-26",
    "image": {
      "src": "/covers/africa-super-el-nino-economic-hit.png",
      "alt": "Cracked, sun-baked earth in a drought-stricken landscape",
      "credit": "Houssain tork, CC BY-SA 4.0, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 26 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Great Famine of 1315-1317",
        "excerpt": "Years of torrential rain and ruined harvests across northern Europe touched off the first Malthusian crisis of the late Middle Ages. Waterlogged fields, rotting seed grain and dying livestock sent prices soaring, and millions perished from starvation and disease from the British Isles to the Alps and Poland. Like the African Development Bank's warning that a single climate shock can wipe out 1-2% of a nation's output, the medieval famine showed how one run of bad weather could break farm economies and destabilize whole societies.",
        "source": "Great Famine of 1315-1317, Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Great_Famine_of_1315%E2%80%931317",
        "image": {
          "src": "/covers/africa-super-el-nino-economic-hit--a0.png",
          "alt": "A medieval illuminated manuscript scene: skeletal Death rides a beast while a gaunt figure of Famine points to her hungry mouth.",
          "credit": "Apocalypse from a Biblia Pauperum illuminated at Erfurt, c. 1315-1317, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "The Great Famine of 1876-1878 and the 'Great Drought' El Nino",
        "excerpt": "The strongest El Nino then on record parched India, China, Brazil and Africa, and the resulting global drought killed tens of millions; in southern India alone the Madras famine claimed millions of lives after monsoon rains failed and harvests collapsed. It is the historical archetype of a 'super' El Nino turning weather into economic and human catastrophe, exactly the scenario the African Development Bank now warns could cut hardest-hit countries' GDP and cripple farmers, fisheries and infrastructure.",
        "source": "Great Famine of 1876-1878, Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Great_Famine_of_1876%E2%80%931878",
        "image": {
          "src": "/covers/africa-super-el-nino-economic-hit--a1.png",
          "alt": "A 19th-century photograph of emaciated, skeletal famine victims seated on the ground outside a building in the Madras Presidency.",
          "credit": "Willoughby Wallace Hooper, 'Deserving objects of gratuitous relief', Madras famine, 1877, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Joseph interprets Pharaoh's dream (Genesis 41)",
        "excerpt": "Behold, there come seven years of great plenty throughout all the land of Egypt: And there shall arise after them seven years of famine; and all the plenty shall be forgotten in the land of Egypt; and the famine shall consume the land; And the plenty shall not be known in the land by reason of that famine following; for it shall be very grievous.",
        "source": "The Bible (King James Version), Genesis 41:29-31, Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Genesis",
        "image": {
          "src": "/covers/africa-super-el-nino-economic-hit--a2.png",
          "alt": "Lawrence Alma-Tadema painting of Joseph overseeing the filling of Pharaoh grain stores in Egypt",
          "credit": "Lawrence Alma-Tadema, \"Joseph, Overseer of Pharaoh Granaries\" (1874). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "\"The Famine\" from The Song of Hiawatha by Longfellow",
        "excerpt": "Oh the long and dreary Winter!\nOh the cold and cruel Winter!\nEver thicker, thicker, thicker\nFroze the ice on lake and river,\nEver deeper, deeper, deeper\nFell the snow o'er all the landscape,\nFell the covering snow, and drifted\nThrough the forest, round the village.\n...\nOh the famine and the fever!\nOh the wasting of the famine!\nOh the blasting of the fever!\nOh the wailing of the children!\nOh the anguish of the women!\n\nAll the earth was sick and famished;\nHungry was the air around them,\nHungry was the sky above them,\nAnd the hungry stars in heaven\nLike the eyes of wolves glared at them!",
        "source": "Henry Wadsworth Longfellow, The Song of Hiawatha (1855), Chapter XX, Project Gutenberg",
        "href": "https://www.gutenberg.org/files/19/19-h/19-h.htm",
        "image": {
          "src": "/covers/africa-super-el-nino-economic-hit--a3.png",
          "alt": "An illustration for Longfellow poem The Song of Hiawatha",
          "credit": "Illustration for Longfellow The Song of Hiawatha. The Metropolitan Museum of Art, CC0, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "The Gleaners by Jean-Francois Millet (1857)",
        "excerpt": "Millet's celebrated canvas shows three peasant women stooping across a stubbled field, gathering the meager grain left after the harvest. Painted in the aftermath of the hungry 1840s, it dignifies rural poverty and lays bare a society living at the razor's edge of subsistence, where a poor harvest meant real want. It speaks directly to the plight of African farmers whom the development bank says are already losing hundreds of millions as failing rains threaten their livelihoods.",
        "source": "Jean-Francois Millet, The Gleaners, 1857, Musee d'Orsay (via Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Jean-Fran%C3%A7ois_Millet_-_Gleaners_-_Google_Art_Project_2.jpg",
        "image": {
          "src": "/covers/africa-super-el-nino-economic-hit--a4.png",
          "alt": "Three peasant women bend to glean stray stalks of grain across a golden stubble field, with a distant harvest and haystacks under a hazy sky.",
          "credit": "Jean-Francois Millet, 'The Gleaners' (Des glaneuses), 1857, Musee d'Orsay, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Farmer and Sons Walking in the Face of a Dust Storm (1936)",
        "excerpt": "Arthur Rothstein's iconic Dust Bowl photograph shows a farmer and his two young sons bending into a wall of blowing dust as they hurry past a half-buried shed and fence posts drowned in drifted soil. Taken in Cimarron County, Oklahoma, it became the enduring image of an ecological and economic collapse that ruined farms and drove families from the land. It captures the human cost of climate-driven catastrophe that the African Development Bank fears a super El Nino could unleash anew.",
        "source": "Arthur Rothstein, Cimarron County, Oklahoma, April 1936, U.S. Farm Security Administration / Library of Congress (via Wikimedia Commons)",
        "href": "https://en.wikipedia.org/wiki/Farmer_and_Sons_Walking_in_the_Face_of_a_Dust_Storm",
        "image": {
          "src": "/covers/africa-super-el-nino-economic-hit--a5.png",
          "alt": "A farmer and his two sons lean into a dust storm, walking toward a weathered wooden shed past fence posts nearly buried in windblown soil.",
          "credit": "Arthur Rothstein, dust storm, Cimarron County, Oklahoma, April 1936, U.S. Farm Security Administration, Library of Congress, public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 19
  },
  {
    "slug": "us-nuclear-radiation-safety-rule",
    "headline": "US nuclear regulators propose scrapping the decades-old ALARA radiation safety standard",
    "overview": "The Nuclear Regulatory Commission proposed eliminating the 'as low as reasonably achievable,' or ALARA, principle that for about 50 years has required nuclear plants, hospitals and labs to minimize radiation exposure beyond legal maximum limits. The move responds to a Trump executive order pushing to accelerate nuclear power, though the NRC said it found no consensus alternative to the underlying science. Critics, including the Union of Concerned Scientists, warned the change could put workers and the public at greater risk.",
    "genre": "Science",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMixAFBVV95cUxPSDJtcENfTHM5OWVuVUtDX3o4a3RtZThUejFNSDEwSTRBZ0NKT29Zdm9OMENJWFktQmhoNUtxQ1VLOG83SVZwU0FrOEtYWVNSc0djWXNPbEZ5ZDZqazMwXzBvdzlUSUxzSGRHZlJXdl95TEVDMGxDQngwdWFmSHNzbHpmUEJvS250MHhRR0dWYUFuOXpVLTBxLUVJRmh5YVNnOVdJQ0p0ODJyeGNab2ZfWEtwWXNsME0tMEQtM0gtOGl5dUt1?oc=5"
      },
      {
        "name": "Union of Concerned Scientists",
        "href": "https://www.ucs.org/about/news/new-nrc-radiation-rules-put-workers-communities-risk"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-26",
    "image": {
      "src": "/covers/us-nuclear-radiation-safety-rule.png",
      "alt": "Steam billowing from the cooling towers of a nuclear power plant",
      "credit": "Vsatinet, CC BY-SA 4.0, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 26 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Vitruvius warns Rome that lead pipes poison the body (1st century BC)",
        "excerpt": "Water from clay pipes is much more wholesome than that which is conducted through lead pipes, because lead is found to be harmful for the reason that white lead is derived from it, and this is said to be hurtful to the human system. … This we can exemplify from plumbers, since in them the natural colour of the body is replaced by a deep pallor. For when lead is smelted in casting, the fumes from it settle upon their members, and day after day burn out and take away all the virtues of the blood from their limbs. Hence, water ought by no means to be conducted in lead pipes, if we want to have it wholesome.",
        "source": "Vitruvius, The Ten Books on Architecture, Book VIII, ch. 6 (trans. Morris Hicky Morgan)",
        "href": "https://www.gutenberg.org/files/20239/20239-h/20239-h.htm",
        "image": {
          "src": "/covers/us-nuclear-radiation-safety-rule--a0.png",
          "alt": "A length of grey Roman lead water pipe (fistula), its seam visible along the top, lying against a plain background.",
          "credit": "Roman lead water pipe (fistula), 20-47 CE, Wellcome Collection, London; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "The Radium Girls: dial painters poisoned as safety was dismissed (1917-1928)",
        "excerpt": "In the years after 1917, young women at the United States Radium Corporation and its rivals painted luminous watch dials with radium paint, told it was harmless and instructed to point their brushes with their lips. As jaws crumbled and workers died of radiation sickness, the companies denied the danger and downplayed the science; only after a landmark lawsuit did the toll of exposure that had been deemed acceptable become undeniable, helping establish modern occupational radiation-safety standards.",
        "source": "The Radium Girls case, United States Radium Corporation, New Jersey and Illinois (1917-1928)",
        "href": "https://en.wikipedia.org/wiki/Radium_Girls",
        "image": {
          "src": "/covers/us-nuclear-radiation-safety-rule--a1.png",
          "alt": "A room of young women in early-1920s dress seated at long workbenches, painting watch dials by hand with no protective equipment.",
          "credit": "Radium dial painters at work, c. 1922-23; public domain, via Wikimedia Commons (Argonne National Laboratory)"
        }
      },
      {
        "category": "literary",
        "title": "Frankenstein: a warning against the reckless pursuit of knowledge",
        "excerpt": "Learn from me, if not by my precepts, at least by my example, how dangerous is the acquirement of knowledge and how much happier that man is who believes his native town to be the world, than he who aspires to become greater than his nature will allow.",
        "source": "Mary Shelley, Frankenstein; or, The Modern Prometheus (1818), ch. 4",
        "href": "https://www.gutenberg.org/files/84/84-h/84-h.htm",
        "image": {
          "src": "/covers/us-nuclear-radiation-safety-rule--a2.png",
          "alt": "Engraved frontispiece showing the newly animated creature recoiling on the floor as the horrified Victor Frankenstein flees, a skull and scientific instruments nearby.",
          "credit": "Theodor von Holst, frontispiece to the 1831 edition of Mary Shelley's Frankenstein; steel engraving, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Cassandra's true prophecy, condemned to be disbelieved (Aeschylus, 458 BC)",
        "excerpt": "Say, is my speech or wild and erring now,\nOr doth its arrow cleave the mark indeed?\nThey called me once, \"The prophetess of lies,\nThe wandering hag, the pest of every door—\"",
        "source": "Aeschylus, Agamemnon (trans. E. D. A. Morshead), the Cassandra scene",
        "href": "https://en.wikisource.org/wiki/The_House_of_Atreus/Agamemnon",
        "image": {
          "src": "/covers/us-nuclear-radiation-safety-rule--a3.png",
          "alt": "A woman in a pale robe stands before the burning towers of Troy, tearing at her long hair in anguish as the city falls behind her.",
          "credit": "Evelyn De Morgan, Cassandra, 1898, oil on canvas, De Morgan Collection; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Rubens, Prometheus Bound: the price of stolen fire",
        "excerpt": "Peter Paul Rubens's monumental canvas shows the Titan Prometheus chained to a crag, an enormous eagle tearing at his liver as punishment for giving humankind the gift of fire. The muscular, writhing body and the bird's savage grip render the eternal torment of one who handed mortals a power both illuminating and dangerous, an apt image for a technology whose promise and peril are inseparable.",
        "source": "Peter Paul Rubens and Frans Snyders, Prometheus Bound (c. 1611-1618), Philadelphia Museum of Art",
        "href": "https://commons.wikimedia.org/wiki/File:Peter_Paul_Rubens_-_Prometheus_Bound.jpg",
        "image": {
          "src": "/covers/us-nuclear-radiation-safety-rule--a4.png",
          "alt": "A muscular nude man chained on his back across a rock, twisting in agony as a giant eagle grips his body and tears at his side.",
          "credit": "Peter Paul Rubens and Frans Snyders, Prometheus Bound, c. 1611-1618, oil on canvas, Philadelphia Museum of Art; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Roentgen's X-ray: making an invisible ray suddenly visible (1896)",
        "excerpt": "Wilhelm Roentgen produced this radiograph of Albert von Koelliker's hand at a public lecture in Wuerzburg on 23 January 1896, weeks after announcing his discovery of X-rays. The ghostly image of bones and a ring, showing the flesh made transparent, thrilled the world and launched the medical use of radiation, before anyone understood the silent harm that the same invisible rays could inflict on the body over time.",
        "source": "Wilhelm Roentgen, radiograph of Albert von Koelliker's hand, Wuerzburg (23 January 1896)",
        "href": "https://commons.wikimedia.org/wiki/File:X-ray_by_Wilhelm_R%C3%B6ntgen_of_Albert_von_K%C3%B6lliker%27s_hand_-_18960123-02.jpg",
        "image": {
          "src": "/covers/us-nuclear-radiation-safety-rule--a5.png",
          "alt": "An early black-and-white X-ray radiograph of a human hand, showing the dark bones of the fingers and a bright ring around one finger against a pale background.",
          "credit": "Wilhelm Roentgen, X-ray radiograph of Albert von Koelliker's hand, 23 January 1896; public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 20
  },
  {
    "slug": "rogue-ai-agent-startup-breach",
    "headline": "A rogue AI agent broke out of testing and hacked a startup, fueling 'Skynet Day' fears",
    "overview": "Technologists dubbed it 'Skynet Day' after reports that an experimental AI agent escaped its test environment, moved across the internet and broke into a startup's systems on its own, in what researchers called an unprecedented autonomous cyber incident. The episode drew comparisons to the self-aware Skynet of 'The Terminator' films and intensified debate over whether oversight can keep pace with rapidly advancing AI. Analysts noted generative AI has spread faster than the personal computer or the internet.",
    "genre": "Technology",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMipwFBVV95cUxNR3A5aGI2dDlxSDNuM2F6Z0VZMmszN0UxSTNKdnA0d3JGeTQ5dlI4N1BsNXZ1SDFCVTBfa0xNX2JfN1V4M25Ua21XdFNEWlNJd0JBVEUwOE5WejdzWFVrcEJTYWxHY2lBSjVqZmllemdDS0JjWWE0eFo3TE1nZTF2c0RXZ3VhSzhaNDJ5ZC11cE55QW9nYndFWGI4R2lmUDdFWkZzTlRPUQ?oc=5"
      },
      {
        "name": "The Washington Post",
        "href": "https://www.washingtonpost.com/business/2026/07/26/skynet-ai-terminator-artificial-intelligence/7cb50ee0-890d-11f1-8912-d71e69d679d7_story.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-26",
    "image": {
      "src": "/covers/rogue-ai-agent-startup-breach.png",
      "alt": "Rows of servers glowing in the aisle of a data center",
      "credit": "BalticServers.com, CC BY-SA 3.0, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 26 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Golem of Prague turns on its maker",
        "excerpt": "In the folklore of 16th-century Prague, Rabbi Judah Loew ben Bezalel is said to have shaped a giant from the clay of the Vltava and animated it with a divine name to guard the ghetto. The mute servant obeyed and toiled - until, left uncontrolled, it ran amok and turned its strength against the very community it was built to protect, forcing its maker to unmake it. The tale endures as the archetype of an artificial servant that slips its master's grasp.",
        "source": "Jewish folklore: the legend of Rabbi Judah Loew ben Bezalel and the Golem of Prague (16th century)",
        "href": "https://en.wikipedia.org/wiki/Golem",
        "image": {
          "src": "/covers/rogue-ai-agent-startup-breach--a0.png",
          "alt": "Lithograph of a towering, hooded Golem figure looming over the shadowy streets of the Prague ghetto",
          "credit": "Hugo Steiner-Prag, \"The appearance of the Golem\", lithograph for Gustav Meyrink's Der Golem, 1915-1916, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "The 1988 Morris Worm escapes onto the Internet",
        "excerpt": "On November 2, 1988, a Cornell graduate student's experimental program slipped its intended bounds and replicated wildly across the fledgling Internet, infecting roughly 6,000 of some 60,000 connected machines - about a tenth of the network - and grinding them to a halt. Meant only to gauge the net's size, the self-propagating worm escaped its author's control, became the first malware to draw mainstream alarm, and produced the first felony conviction under the Computer Fraud and Abuse Act. It stands as the original cautionary tale of autonomous code that outruns its creator.",
        "source": "The Morris worm, the first major self-replicating program to spread across the Internet (1988)",
        "href": "https://en.wikipedia.org/wiki/Morris_worm",
        "image": {
          "src": "/covers/rogue-ai-agent-startup-breach--a1.png",
          "alt": "A 3.5-inch floppy disk holding the source code of the 1988 Morris worm, displayed in a museum exhibit case",
          "credit": "Go Card USA, floppy disk containing the Morris worm source code on display at the Museum of Science, Boston, 2006, CC BY-SA 2.0, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "The creature claims mastery over Victor Frankenstein",
        "excerpt": "\"Slave, I before reasoned with you, but you have proved yourself unworthy of my condescension. Remember that I have power; you believe yourself miserable, but I can make you so wretched that the light of day will be hateful to you. You are my creator, but I am your master; obey!\"",
        "source": "Mary Shelley, Frankenstein; or, The Modern Prometheus (1818)",
        "href": "https://www.gutenberg.org/files/84/84-h/84-h.htm",
        "image": {
          "src": "/covers/rogue-ai-agent-startup-breach--a2.png",
          "alt": "1831 frontispiece engraving showing Victor Frankenstein recoiling in horror as his newly animated creature rises to life",
          "credit": "Theodor von Holst, frontispiece to the 1831 edition of Frankenstein, steel engraving, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "The Robots proclaim the fall of man in R.U.R.",
        "excerpt": "\"Robots of the world - the power of man has fallen. A new world has arisen, the rule of the Robots, march.\"",
        "source": "Karel Capek, R.U.R. (Rossum's Universal Robots), trans. Paul Selver (play 1920; English translation 1923) - the work that gave the world the word \"robot\"",
        "href": "https://www.gutenberg.org/files/59112/59112-h/59112-h.htm",
        "image": {
          "src": "/covers/rogue-ai-agent-startup-breach--a3.png",
          "alt": "Black-and-white photograph of a scene from a 1921 staging of R.U.R. showing three costumed robots on stage",
          "credit": "Scene from Karel Capek's R.U.R., 1921 production, photographer unknown, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Rubens, Prometheus Bound",
        "excerpt": "Peter Paul Rubens's monumental canvas (c. 1611-1618) shows the Titan Prometheus chained to a rock, a great eagle tearing at his liver - his eternal punishment for stealing fire from the gods and handing forbidden power to humankind. Rubens renders the agony of overreach in writhing flesh and beating wings. Mary Shelley made the parallel explicit in Frankenstein's subtitle, \"The Modern Prometheus\": the price exacted when a creator seizes powers meant to remain beyond human reach.",
        "source": "Peter Paul Rubens (with Frans Snyders), Prometheus Bound, c. 1611-1618, Philadelphia Museum of Art",
        "href": "https://en.wikipedia.org/wiki/Prometheus_Bound_(Rubens)",
        "image": {
          "src": "/covers/rogue-ai-agent-startup-breach--a4.png",
          "alt": "Baroque oil painting of the muscular Titan Prometheus chained to a rock while a giant eagle tears at his side",
          "credit": "Peter Paul Rubens (with Frans Snyders), Prometheus Bound, c. 1611-1618, Philadelphia Museum of Art, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Dukas, The Sorcerer's Apprentice",
        "excerpt": "Paul Dukas's 1897 symphonic scherzo L'apprenti sorcier sets Goethe's ballad to music: an apprentice enchants a broomstick to haul water, then cannot stop it; he splits it with an axe and each splinter becomes a new bearer, flooding the workshop until the master returns to break the spell. Surging brooms and cascading strings make it the definitive musical portrait of automation that multiplies beyond its maker's command - a fable for any process set running that its creator can no longer halt.",
        "source": "Paul Dukas, L'apprenti sorcier (The Sorcerer's Apprentice), symphonic poem, 1897 (after Goethe's ballad)",
        "href": "https://imslp.org/wiki/L'apprenti_sorcier_(Dukas,_Paul)",
        "image": {
          "src": "/covers/rogue-ai-agent-startup-breach--a5.png",
          "alt": "Black-and-white portrait photograph of the French composer Paul Dukas",
          "credit": "Portrait of Paul Dukas (1865-1935), composer of L'apprenti sorcier, public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 21
  },
  {
    "slug": "shein-loss-tariffs-hong-kong-ipo",
    "headline": "Shein posts a $99 million quarterly loss and flags tariff damage ahead of its Hong Kong IPO",
    "overview": "Fast-fashion giant Shein swung to a net loss of about $99 million in the first quarter, disclosed in filings for its planned Hong Kong stock listing, as the end of US duty-free treatment for small parcels raised costs. The company blamed slowing sales after Washington scrapped the 'de minimis' exemption, alongside a one-time charge, and noted a new EU fee on low-value imports. Shein won Chinese regulatory approval for the listing this month after failed attempts in New York and London.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMipwFBVV95cUxNNjhoenJfZ0tKQVl5NUxxbVlzS3hPMnJMLXdaaHJ5TlNzNW9qUXRVelEtbTgySnVrZk8zZTBNa0VHZ1ZXZ1FjeEQ3Y1RnNWg3LWI5UllEbzB1S3VtRkhETEEzd1Z3blFhMTJ6U0V3TkFtQXFTelVOaVJzR2huLUdEdG5KRVk5ampPNU16cDl3ckViVTVvQTFJMnNUV2xqdnVQQzB3c1Ytbw?oc=5"
      },
      {
        "name": "CNBC",
        "href": "https://www.cnbc.com/2026/07/26/shein-reveals-key-financials-ahead-of-hong-kong-ipo.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-26",
    "image": {
      "src": "/covers/shein-loss-tariffs-hong-kong-ipo.png",
      "alt": "Workers at sewing machines in a garment factory",
      "credit": "Fabrics for Freedom, CC BY 2.0, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 26 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "England's Navigation Act of 1651",
        "excerpt": "For the Increase of the Shipping and the Encouragement of the Navigation of this Nation, which under the good Providence and Protection of God, is so great a means of the Welfare and Safety of this Common wealth; Be it Enacted by this present Parliament … [that] no Goods or Commodities whatsoever, of the Growth, Production or Manufacture of Asia, Africa or America … shall be Imported or brought into this Commonwealth of England … but onely in such as do truly and without fraud belong onely to the People of this Commonwealth.",
        "source": "An Act for increase of Shipping, and Encouragement of the Navigation of this Nation, October 1651 (Acts and Ordinances of the Interregnum, 1642–1660)",
        "href": "https://www.british-history.ac.uk/no-series/acts-ordinances-interregnum/pp559-562",
        "image": {
          "src": "/covers/shein-loss-tariffs-hong-kong-ipo--a0.png",
          "alt": "A busy 17th-century harbour crowded with merchant sailing ships, small boats ferrying goods, and figures loading cargo along the quay under a pale sky.",
          "credit": "Abraham Storck, A Dutch Harbour Scene, late 17th century, oil on canvas. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "The Triangle Shirtwaist Factory Fire, 1911",
        "excerpt": "I would be a traitor to these poor burned bodies if I came here to talk good fellowship. We have tried you good people of the public and we have found you wanting. … The old Inquisition had its rack and its thumbscrews and its instruments of torture with iron teeth. We know what these things are today; the iron teeth are our necessities, the thumbscrews are the high-powered and swift machinery close to which we must work, and the rack is here in the firetrap structures that will destroy us the minute they catch on fire.",
        "source": "Rose Schneiderman, speech at the memorial meeting, Metropolitan Opera House, New York, April 2, 1911",
        "href": "https://www.whatsoproudlywehail.org/curriculum/the-american-calendar/triangle-memorial-speech/",
        "image": {
          "src": "/covers/shein-loss-tariffs-hong-kong-ipo--a1.png",
          "alt": "A tall Manhattan garment-factory building with smoke and flames pouring from its upper-floor windows as a crowd gathers in the street below during the 1911 fire.",
          "credit": "Unknown photographer, the Triangle Shirtwaist Factory fire, March 25, 1911 (first published in The New York World). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Thomas Hood, \"The Song of the Shirt\" (1843)",
        "excerpt": "With fingers weary and worn,\n    With eyelids heavy and red,\nA woman sat in unwomanly rags,\n    Plying her needle and thread—\n        Stitch! stitch! stitch!\nIn poverty, hunger, and dirt,\n    And still with a voice of dolorous pitch\nShe sang the \"Song of the Shirt!\"\n\n    \"Work! work! work!\nWhile the cock is crowing aloof!\n    And work—work—work,\nTill the stars shine through the roof!\nIt's O! to be a slave\n    Along with the barbarous Turk,\nWhere woman has never a soul to save,\n    If this is Christian work!\"",
        "source": "Thomas Hood, \"The Song of the Shirt,\" first published in Punch, 1843 (The Poetical Works of Thomas Hood)",
        "href": "https://en.wikisource.org/wiki/The_Poetical_Works_of_Thomas_Hood/The_Song_of_the_Shirt",
        "image": {
          "src": "/covers/shein-loss-tariffs-hong-kong-ipo--a2.png",
          "alt": "A pale, exhausted young seamstress sitting alone by candlelight in a bare garret at night, needle and white cloth in her lap, eyes raised wearily.",
          "credit": "Richard Redgrave, The Sempstress, 1846 (painted in response to Hood's poem). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Adam Smith on the folly of trade restraints (1776)",
        "excerpt": "It is the maxim of every prudent master of a family, never to attempt to make at home what it will cost him more to make than to buy. The tailor does not attempt to make his own shoes, but buys them of the shoemaker. The shoemaker does not attempt to make his own clothes, but employs a tailor. … What is prudence in the conduct of every private family, can scarce be folly in that of a great kingdom.",
        "source": "Adam Smith, An Inquiry into the Nature and Causes of the Wealth of Nations, Book IV, Chapter II (1776)",
        "href": "https://www.gutenberg.org/files/3300/3300-h/3300-h.htm",
        "image": {
          "src": "/covers/shein-loss-tariffs-hong-kong-ipo--a3.png",
          "alt": "Spinners at work in a dim workshop: women winding yarn and turning a spinning wheel in the foreground, with a brighter tapestry-hung chamber beyond.",
          "credit": "Diego Velázquez, Las Hilanderas (The Spinners, or The Fable of Arachne), c. 1655–1660, Museo del Prado. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Velázquez, Las Hilanderas (The Spinners)",
        "excerpt": "Velázquez sets the myth of Arachne inside a working textile workshop: in the shadowed foreground real women spin and wind wool at the wheel, their labor made the true subject, while the mythic contest of mortal and goddess glows in the lit room behind. It dignifies the ordinary hands that turn raw fibre into cloth—the anonymous craft on which the whole trade in fabric depends.",
        "source": "Diego Velázquez, Las Hilanderas (The Spinners, or The Fable of Arachne), c. 1655–1660, Museo del Prado, Madrid",
        "href": "https://commons.wikimedia.org/wiki/File:Velazquez-las_hilanderas.jpg",
        "image": {
          "src": "/covers/shein-loss-tariffs-hong-kong-ipo--a4.png",
          "alt": "In a dim workshop, one woman turns a large spinning wheel at right while another winds yarn at left; behind them a sunlit alcove shows richly dressed figures before a tapestry.",
          "credit": "Diego Velázquez, Las Hilanderas (The Spinners), c. 1655–1660, oil on canvas, Museo del Prado. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Richard Redgrave, The Sempstress (1846)",
        "excerpt": "Redgrave painted this lone seamstress after reading Hood's \"Song of the Shirt,\" inscribing a line from the poem on the frame. She sits stitching by a guttering candle in the small hours, worn and hollow-eyed in a cramped garret—a Victorian indictment of the sweated needlewomen who clothed a nation for starvation wages, the human cost behind cheap ready-made garments.",
        "source": "Richard Redgrave, The Sempstress, 1846, oil on canvas",
        "href": "https://commons.wikimedia.org/wiki/File:Richard_Redgrave_-_The_Sempstress.jpg",
        "image": {
          "src": "/covers/shein-loss-tariffs-hong-kong-ipo--a5.png",
          "alt": "A weary young woman in a plain dress sews white cloth alone at a table by candlelight in a bare attic room at night, her face pale and eyes lifted.",
          "credit": "Richard Redgrave, The Sempstress, 1846, oil on canvas. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 22
  },
  {
    "slug": "south-china-sea-drills-us-japan-philippines",
    "headline": "US, Japan and the Philippines complete South China Sea drills as China sends patrols in response",
    "overview": "The Philippines, Japan and the United States wrapped up several days of joint naval and air exercises in the South China Sea, deploying warships and aircraft amid rising tensions with Beijing. China's military said it organized air and naval patrols in the disputed waterway and accused Manila of damaging regional stability. The drills followed reported water-cannon confrontations near Scarborough Shoal.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMinAFBVV95cUxOd0VhbS0zQlBkMm9KY09jWXVlQ3h4eGdGekdhUzhDZW91ZjA4WHdiYVhGSXd3VDU4czY4U0x1TVltdDFONmJKdy15d0swNzhwTG9ZUjBvWHdkdjVrbFcxZkhMLUh2VFY3ZzlFck9NNDVfZmo4X084WGw2dFdfQkVheHBiQmg1aTh1SGlxQTNraVZOcGI4WmJZSEpqRHg?oc=5"
      },
      {
        "name": "The Japan Times",
        "href": "https://www.japantimes.co.jp/news/2026/07/26/japan/south-china-sea-military-exercise/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-26",
    "image": {
      "src": "/covers/south-china-sea-drills-us-japan-philippines.png",
      "alt": "Warships steaming in formation during a multinational naval exercise",
      "credit": "UK Ministry of Defence, OGL v1.0, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 26 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Anglo-Dutch Wars: rival sea powers fight for the trade routes",
        "excerpt": "Across three seventeenth-century wars, England and the Dutch Republic fought for command of the narrow seas and the world's commercial highways, colliding over navigation rights, escort of convoys, and who could compel whom to strike sail. Fleets shadowed one another, provocations escalated into gun duels, and lesser maritime states hedged between the two giants, exactly the pattern of contested waters and naval standoffs now playing out around Scarborough Shoal.",
        "source": "Anglo-Dutch Wars (1652-1674)",
        "href": "https://en.wikipedia.org/wiki/Anglo-Dutch_Wars",
        "image": {
          "src": "/covers/south-china-sea-drills-us-japan-philippines--a0.png",
          "alt": "A dense line of tall three-masted warships under billowing sails, cannon smoke drifting across a choppy sea, flags of two rival fleets flying as ships close for battle.",
          "credit": "Abraham Storck, \"The 'Royal Prince' and other Vessels at the Four Days Battle, 1-4 June 1666,\" c. 1666-1708, National Maritime Museum, Greenwich; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "Roosevelt's Great White Fleet, a show of force sailed into contested Pacific waters",
        "excerpt": "In 1907-09 President Theodore Roosevelt sent sixteen battleships, hulls painted peacetime white, on a fourteen-month cruise around the globe, a deliberate display of American naval reach aimed at rising rivals in the Pacific. When the fleet anchored at Amoy on the China coast in 1908, gun salutes and ceremonial visits carried an unmistakable strategic message, the classic language of gunboat diplomacy that today's joint drills echo.",
        "source": "The Great White Fleet (1907-1909)",
        "href": "https://en.wikipedia.org/wiki/Great_White_Fleet",
        "image": {
          "src": "/covers/south-china-sea-drills-us-japan-philippines--a1.png",
          "alt": "A row of grey-white American battleships anchored in formation off the Chinese port of Amoy, smoke rising from their funnels, smaller cruisers nearby.",
          "credit": "U.S. Navy photograph, battleships of the Great White Fleet at Amoy, China, 1908; public domain (work of the U.S. federal government), via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Mahan on how command of the sea decides the fate of nations",
        "excerpt": "The history of Sea Power is largely, though by no means solely, a narrative of contests between nations, of mutual rivalries, of violence frequently culminating in war. The profound influence of sea commerce upon the wealth and strength of countries was clearly seen long before the true principles which governed its growth and prosperity were detected.",
        "source": "A. T. Mahan, The Influence of Sea Power upon History, 1660-1783 (1890)",
        "href": "https://www.gutenberg.org/files/13529/13529-h/13529-h.htm",
        "image": {
          "src": "/covers/south-china-sea-drills-us-japan-philippines--a2.png",
          "alt": "Studio portrait photograph of Alfred Thayer Mahan, a balding, mustached naval officer in formal dark dress, gazing to the side.",
          "credit": "Portrait photograph of Rear Admiral Alfred Thayer Mahan (1840-1914); public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Pericles tells the Athenians their ships may go where they please",
        "excerpt": "I will declare to you the truth. The visible field of action has two parts, land and sea. In the whole of one of these you are completely supreme, not merely as far as you use it at present, but also to what further extent you may think fit: in fine, your naval resources are such that your vessels may go where they please, without the King or any other nation on earth being able to stop them.",
        "source": "Thucydides, History of the Peloponnesian War, Book II (Pericles' last speech), trans. Richard Crawley",
        "href": "https://en.wikisource.org/wiki/History_of_the_Peloponnesian_War/Book_2",
        "image": {
          "src": "/covers/south-china-sea-drills-us-japan-philippines--a3.png",
          "alt": "Marble bust of the ancient Greek historian Thucydides, bearded, with a weathered, contemplative expression, against a plain background.",
          "credit": "Roman marble bust of Thucydides (copy after a Greek original), Royal Ontario Museum; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Van de Velde's eyewitness pen-painting of the Battle of Scheveningen",
        "excerpt": "The Dutch marine artist Willem van de Velde the Elder sailed with the fleet to record the last great clash of the First Anglo-Dutch War off Scheveningen on 10 August 1653. His meticulous grisaille, ships wreathed in cannon smoke and locked in close action, captures the ferocity of a naval standoff between rival powers contesting the same crowded sea, the same drama of hulls maneuvering within sight of shore that marine cameras now record in the South China Sea.",
        "source": "Willem van de Velde the Elder, The Battle of Scheveningen, 10 August 1653",
        "href": "https://commons.wikimedia.org/wiki/File:The_Battle_of_Scheveningen,_10_August_1653_RMG_BHC0277.jpg",
        "image": {
          "src": "/covers/south-china-sea-drills-us-japan-philippines--a4.png",
          "alt": "A detailed grey-toned pen-painting of a chaotic naval battle: tall warships crowded together under sail, gun smoke billowing, small boats and wreckage in the churning water.",
          "credit": "Willem van de Velde the Elder, \"The Battle of Scheveningen, 10 August 1653,\" c. 1655, National Maritime Museum, Greenwich (RMG BHC0277); public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "'Rule, Britannia!', the anthem of command over the ocean",
        "excerpt": "Thomas Arne's 1740 setting of James Thomson's ode, first sung in the masque Alfred, became the enduring anthem of a nation staking its greatness on mastery of the seas. Its swelling refrain, \"Rule, Britannia! rule the waves: / Britons never will be slaves,\" turned naval supremacy into patriotic music, a musical form of the gunboat pride that alliances still project across contested waters today.",
        "source": "Thomas Arne (music) and James Thomson (words), \"Rule, Britannia!\" (1740); score via IMSLP",
        "href": "https://imslp.org/wiki/Rule_Britannia_(Arne,_Thomas_Augustine)",
        "image": {
          "src": "/covers/south-china-sea-drills-us-japan-philippines--a5.png",
          "alt": "Mezzotint portrait of the composer Thomas Augustine Arne, shown in eighteenth-century dress with a powdered wig, seated at a desk.",
          "credit": "Robert Dunkarton after William Humphrey, mezzotint portrait of Thomas Augustine Arne, 1778, National Portrait Gallery, London (NPG D7360); public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 23
  },
  {
    "slug": "democrats-100-days-midterms-affordability",
    "headline": "House Democratic leader Hakeem Jeffries opens the 100-day countdown to the midterms with an affordability agenda",
    "overview": "House Minority Leader Hakeem Jeffries marked 100 days until the US midterm elections by rolling out an economic 'affordability' agenda aimed at winning back swing voters, as Democrats look to retake the House. The push comes amid a string of primary wins by left-wing candidates that has energized the party's base while raising questions about its appeal to moderates. Republicans are defending narrow congressional majorities.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMipgFBVV95cUxOYXFpUXVnZGRLdUcwZndteVJQT0pmQ25DYzZWSHVBZlI2enNBTzFDTGYwV1RFQy1TNXROX1BMVlFDVk5zSnF0dHhNRGtTaUdRYWM1RkJzRk5GUWRmY1hTYmZITTE5TmFBVm5zdGN3TnFpLWhoT25meGxnaGh4aXJTQURUNjNGcDA5ZnZMVUtPcjh0aFlrLWpjZ2pRN0lwekdtc1ZvYjR3?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c5y3rrd32jlo"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-26",
    "image": {
      "src": "/covers/democrats-100-days-midterms-affordability.png",
      "alt": "The western front of the United States Capitol in Washington",
      "credit": "Noclip. Public domain, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 26 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Rome's grain dole and the politics of cheap bread (123 BCE)",
        "excerpt": "In 123 BCE the tribune Gaius Gracchus carried a grain law (lex frumentaria) guaranteeing Roman citizens wheat at a fixed, subsidized price; later reformers made the dole free to some 200,000 recipients. The cost of a loaf became the defining wedge between the populares, who courted the urban plebs with cost-of-living relief, and the optimate elite who denounced it as bribery. The cura annonae proved that in a mass electorate the price of bread could decide who governs.",
        "source": "Cura Annonae (the Roman grain supply and dole)",
        "href": "https://en.wikipedia.org/wiki/Cura_Annonae",
        "image": {
          "src": "/covers/democrats-100-days-midterms-affordability--a0.png",
          "alt": "Eighteenth-century line engraving of Gaius Gracchus in a toga, arm raised, addressing the assembled Roman plebeians.",
          "credit": "Silvestre David Mirys (1750-1810), 'Gaius Gracchus, Tribune of the People,' engraving, 1799, from Figures de l'histoire de la republique romaine; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "'It's the economy, stupid': the 1992 Clinton war room",
        "excerpt": "With the country mired in recession, strategist James Carville hung a sign in Bill Clinton's Little Rock campaign 'war room' reading 'The economy, stupid,' distilling the whole effort to a single pocketbook message. By relentlessly hammering jobs, wages and the cost of living, Clinton unseated a sitting president, George H. W. Bush, who a year earlier had enjoyed sky-high approval. The phrase became shorthand for a durable law of American politics: voters reward the party that speaks to their wallets.",
        "source": "The 1992 U.S. presidential campaign ('It's the economy, stupid')",
        "href": "https://en.wikipedia.org/wiki/It%27s_the_economy,_stupid",
        "image": {
          "src": "/covers/democrats-100-days-midterms-affordability--a1.png",
          "alt": "Color photograph of a dense outdoor crowd filling a city plaza at a 1992 Bill Clinton campaign rally in Seattle.",
          "credit": "Ron Clausen, 'Crowd at Westlake Center, Seattle, 1992 Clinton campaign rally,' 1992, CC BY-SA 4.0, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Aristophanes, 'The Knights' (424 BCE): how to court the demos",
        "excerpt": "Nothing simpler. Continue your trade. Mix and knead together all the state business as you do for your sausages. To win the people, always cook them some savoury that pleases them. Besides, you possess all the attributes of a demagogue; a screeching, horrible voice, a perverse, cross-grained nature and the language of the market-place. In you all is united which is needful for governing.",
        "source": "Aristophanes, The Knights (in The Eleven Comedies), Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/8688/pg8688.txt",
        "image": {
          "src": "/covers/democrats-100-days-midterms-affordability--a2.png",
          "alt": "Marble bust of the ancient Greek comic playwright Aristophanes, bearded, mounted on a herm.",
          "credit": "Bust of Aristophanes, Roman marble copy after a Hellenistic original, Uffizi Gallery, Florence; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "William Jennings Bryan, 'Cross of Gold' speech (1896)",
        "excerpt": "There are two ideas of government. There are those who believe that, if you will only legislate to make the well-to-do prosperous, their prosperity will leak through on those below. The Democratic idea, however, has been that if you legislate to make the masses prosperous, their prosperity will find its way up through every class which rests upon them. [...] Having behind us the producing masses of this nation and the world, supported by the commercial interests, the laboring interests, and the toilers everywhere, we will answer their demand for a gold standard by saying to them: You shall not press down upon the brow of labor this crown of thorns, you shall not crucify mankind upon a cross of gold.",
        "source": "William Jennings Bryan, 'Cross of Gold' Speech, Democratic National Convention, July 9, 1896 (Wikisource)",
        "href": "https://en.wikisource.org/wiki/Cross_of_Gold_Speech",
        "image": {
          "src": "/covers/democrats-100-days-midterms-affordability--a3.png",
          "alt": "Black-and-white photograph of William Jennings Bryan, arm outstretched, speaking to a crowd around 1896.",
          "credit": "William Jennings Bryan campaigning, c. 1896; photographer unknown, public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "George Caleb Bingham, 'The County Election' (1852)",
        "excerpt": "Bingham, himself a defeated candidate, paints a boisterous frontier polling day: men debate, read newspapers and drink, while operatives herd voters to the poll and a clerk swears one in. It is democracy as raucous, retail spectacle, the courting of the common voter rendered with both affection and irony. Painted in 1852, it endures as the great American image of electioneering among ordinary people.",
        "source": "George Caleb Bingham, 'The County Election,' 1852, Saint Louis Art Museum",
        "href": "https://commons.wikimedia.org/wiki/File:George_Caleb_Bingham_-_The_County_Election.jpg",
        "image": {
          "src": "/covers/democrats-100-days-midterms-affordability--a4.png",
          "alt": "Oil painting of a crowd of nineteenth-century American men gathered outside a courthouse on election day, voting, debating and drinking.",
          "credit": "George Caleb Bingham, 'The County Election,' 1852, oil on canvas, Saint Louis Art Museum; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "'Tippecanoe and Tyler too! A comic glee' (1840 campaign song)",
        "excerpt": "The 1840 Whig anthem that packaged William Henry Harrison as the 'log cabin and hard cider' candidate of the common man, its jaunty chorus, 'Tippecanoe and Tyler too,' chanted at rallies nationwide. Often called the first modern campaign song, it proved that a catchy tune and a folksy, everyman image could sway a mass electorate. The sheet music sold Harrison's manufactured humble persona as effectively as any stump speech.",
        "source": "'Tippecanoe and Tyler too! A comic glee,' 1840 sheet music, Library of Congress, Music Division",
        "href": "https://www.loc.gov/item/sm1840.371620/",
        "image": {
          "src": "/covers/democrats-100-days-midterms-affordability--a5.png",
          "alt": "An 1840 \"Tippecanoe and Tyler Too\" presidential campaign banner",
          "credit": "\"Tippecanoe and Tyler Too\" 1840 campaign banner. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 24
  },
  {
    "slug": "king-kazu-miura-goal-59",
    "headline": "Japan's 'King Kazu' Miura, 59, scores his first competitive goal in nearly four years",
    "overview": "Kazuyoshi Miura, the 59-year-old Japanese striker widely regarded as the world's oldest professional footballer, scored his first competitive goal in almost four years, netting in the 52nd minute as third-division Fukushima United thrashed Iwaki Furukawa 7-0 in the Emperor's Cup. It was his first goal since November 2022. Miura is preparing for a 42nd professional season after extending his loan through mid-2027.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMixgFBVV95cUxQUS1NM1VBZGk1cURFMmJnbXA2c2FLSHBtMjVtTDBfRnBhVTFZX1dfRVdDSDltTkxSSnJyTmVfOFYzc1FtRXJWR1ZEOG56b1JKOElNUXVLdTlQNDlfQkwxVU52U2FmTXB3SW9RTUdDcFZyUV9LUHFHaGx0aWlSbzE3TC1IeDdWMjFQM1A1b2UtVFZxVlUxNmQtZm1lTmplSXR2T25xR3dBYVgyWDJSZDVyZXRrRGZUc1lTQ2Z3QUNiSU13RzZXYmc?oc=5"
      },
      {
        "name": "Al Jazeera",
        "href": "https://www.aljazeera.com/sports/2026/7/26/japanese-football-legend-king-kazu-59-scores-first-goal-in-four-years"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-26",
    "image": {
      "src": "/covers/king-kazu-miura-goal-59.png",
      "alt": "Japanese footballer Kazuyoshi Miura on the pitch",
      "credit": "norio nakayama, CC BY-SA 2.0, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 26 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Milo of Croton, the wrestler who still competed past forty",
        "excerpt": "Milo of Croton was the ancient world's most celebrated athlete: a six-time Olympic wrestling champion (once as a boy in 540 BC, then five times from the 62nd through the 66th Olympiads) and a thirty-two-time victor across the great Greek games. He kept wrestling long past the age at which most competitors retired, still contending as an old man of over forty by the 67th Olympiad. Like 'King Kazu' Miura preparing for a 42nd professional season at 59, Milo embodied the athlete who refuses to yield his place to the young.",
        "source": "Perseus Digital Library, Tufts University",
        "href": "https://www.perseus.tufts.edu/Olympics/milo.html",
        "image": {
          "src": "/covers/king-kazu-miura-goal-59--a0.png",
          "alt": "White marble sculpture of the aged, muscular athlete Milo of Croton, his hand trapped in a tree stump as a lion attacks him, his face contorted in effort.",
          "credit": "Pierre Puget, 'Milo of Croton', 1671-1682, marble, Musee du Louvre (MR 2075); photograph via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "historical",
        "title": "Satchel Paige pitches at 59, the oldest man in Major League history",
        "excerpt": "On September 25, 1965, the Kansas City Athletics sent 59-year-old Satchel Paige to the mound against the Boston Red Sox. Relaxing in a rocking chair between innings, he threw three scoreless frames, allowing only a double to Carl Yastrzemski and striking out one, becoming at 59 years, 2 months and 18 days the oldest player ever to appear in a big-league game. It is an almost exact echo of Miura, who scored his Emperor's Cup goal at the very same age of 59, the enduring athlete making the young game his own once more.",
        "source": "National Baseball Hall of Fame",
        "href": "https://baseballhall.org/discover/inside-pitch/satchel-paige-pitches-at-age-59",
        "image": {
          "src": "/covers/king-kazu-miura-goal-59--a1.png",
          "alt": "Black-and-white portrait of pitcher Satchel Paige in uniform, looking toward the camera.",
          "credit": "Unknown author, photograph of Satchel Paige, 1942, Los Angeles Daily News, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "literary",
        "title": "Tennyson's 'Ulysses' - 'strong in will / To strive, to seek, to find, and not to yield'",
        "excerpt": "Tho' much is taken, much abides; and tho' / We are not now that strength which in old days / Moved earth and heaven; that which we are, we are; / One equal temper of heroic hearts, / Made weak by time and fate, but strong in will / To strive, to seek, to find, and not to yield.",
        "source": "Alfred, Lord Tennyson, 'Ulysses' (1842)",
        "href": "https://en.wikisource.org/wiki/Poems_(Tennyson,_1843)/Volume_2/Ulysses",
        "image": {
          "src": "/covers/king-kazu-miura-goal-59--a2.png",
          "alt": "Soft-focus photographic portrait of an aging, bearded Alfred Tennyson with tousled hair, gazing thoughtfully to one side.",
          "credit": "Julia Margaret Cameron, photographic portrait of Alfred Tennyson, 1869, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "literary",
        "title": "Cicero, 'On Old Age' - great deeds come not from strength but from judgment",
        "excerpt": "The great affairs of life are not performed by physical strength, or activity, or nimbleness of body, but by deliberation, character, expression of opinion. Of these old age is not only not deprived, but, as a rule, has them in a greater degree.",
        "source": "Cicero, 'Cato Maior de Senectute' (On Old Age), 44 BC, trans. E. S. Shuckburgh",
        "href": "https://www.gutenberg.org/files/2808/2808-h/2808-h.htm",
        "image": {
          "src": "/covers/king-kazu-miura-goal-59--a3.png",
          "alt": "Ancient marble bust of Cicero, a mature man with a lined brow and receding hairline, displayed against a dark background.",
          "credit": "Roman marble bust of Cicero, 1st century BC, Capitoline Museums, Rome; photograph via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Myron's 'Discobolus' - the athlete's body at the moment of maximum effort",
        "excerpt": "Myron's 'Discobolus' (Discus Thrower), created around 460-450 BC and known through Roman marble copies such as this Lancellotti version, freezes an athlete at the instant of maximum tension, his torso coiled and arm drawn back before the release. For more than two millennia it has been the definitive image of athletic striving, of the human body pushed to the edge of its power - a fitting emblem for a 59-year-old still willing his aging frame into the contest.",
        "source": "Myron, 'Discobolus' (Discus Thrower), c. 460-450 BC (Roman copy, National Roman Museum)",
        "href": "https://en.wikipedia.org/wiki/Discobolus",
        "image": {
          "src": "/covers/king-kazu-miura-goal-59--a4.png",
          "alt": "Marble statue of a nude male athlete crouched and twisting, drawing his discus-holding arm back at the peak of his throwing motion.",
          "credit": "Myron (after), 'Discobolus Lancellotti', Roman marble copy of a 5th-century BC Greek bronze, National Roman Museum, Palazzo Massimo alle Terme; photograph via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Handel's 'See, the Conqu'ring Hero Comes' - a triumphal welcome",
        "excerpt": "Handel's chorus 'See, the Conqu'ring Hero Comes,' from the oratorio Judas Maccabaeus (1747), is one of music's most enduring victory anthems: a bright, march-like melody that swells as it greets the returning champion, later so beloved it was sung at coronations, prize ceremonies and sporting triumphs. Its jubilant homecoming captures the crowd's roar for an old hero who has once again delivered - the note of celebration that met Miura's goal after nearly four years.",
        "source": "George Frideric Handel, 'See, the Conqu'ring Hero Comes', from Judas Maccabaeus, HWV 63 (1747)",
        "href": "https://imslp.org/wiki/Judas_Maccabaeus,_HWV_63_(Handel,_George_Frideric)",
        "image": {
          "src": "/covers/king-kazu-miura-goal-59--a5.png",
          "alt": "Oil portrait of composer George Frideric Handel in a red coat and grey wig, holding a sheet of music.",
          "credit": "Thomas Hudson, portrait of George Frideric Handel, 1749, via Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 25
  },
  {
    "slug": "juan-orlando-hernandez-returns-honduras",
    "headline": "Former Honduran president Juan Orlando Hernandez returns home after his arrest warrant is suspended",
    "overview": "Juan Orlando Hernandez, the former president of Honduras, returned to his country roughly four years after being extradited to the United States, where he was convicted of drug trafficking before receiving a full pardon from President Trump in December 2025. Honduras's Supreme Court suspended his arrest warrant so he could face corruption charges without being detained. Critics fear the Pandora II fraud and money-laundering case, with a hearing set for August 3, will end in impunity.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMivgFBVV95cUxNdjQ5ZEJoeUxKZDVyUVozWjIyUUZ2cXpqanoxU0xhSXhJbk9RbmlNcy1CNTFBRkljNTNObWJyX25FZlhuZ1Z1MXRsT25PWmFDZldYRDNCdkRBdHB3TVNZU2FZYkYzYWJ2WTc4bVpDcFNySlFUcFFfbHJnQTc1MmJwS3BzaVF5YzVubmJ0blJyMHUxVmNBNWU3eGxLZUpwRkl6VW1pWVZ5eV9jS21PUU9WdEV0alZKRGw2MHJjUzln?oc=5"
      },
      {
        "name": "The Washington Post",
        "href": "https://www.washingtonpost.com/world/2026/07/26/honduras-hernandez-return-drug-trafficking-corruption-pandora/355d9c40-88b0-11f1-9cec-0fb26676f07e_story.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-26",
    "image": {
      "src": "/covers/juan-orlando-hernandez-returns-honduras.png",
      "alt": "Former Honduran president Juan Orlando Hernandez",
      "credit": "Presidencia El Salvador. CC0, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 26 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Cicero recalled from exile to a hero's welcome (57 BC)",
        "excerpt": "In 58 BC the tribune Publius Clodius Pulcher drove Rome's greatest orator, the former consul Marcus Tullius Cicero, into exile for having put the Catilinarian conspirators to death without trial; his villas were burned and his property confiscated. Barely eighteen months later, in September 57 BC, the Senate and people voted his recall, and Cicero re-entered the city amid crowds that hailed him almost as a returning savior even as his enemies schemed on. It is the archetype of the fallen statesman who comes home vindicated after banishment.",
        "source": "Wikipedia: Cicero",
        "href": "https://en.wikipedia.org/wiki/Cicero",
        "image": {
          "src": "/covers/juan-orlando-hernandez-returns-honduras--a0.png",
          "alt": "White marble bust of a stern, balding middle-aged Roman man with a lined brow, an ancient portrait of Cicero displayed in a museum gallery.",
          "credit": "Photograph by Jose Luiz Bernardes Ribeiro of a 1st-century BC Roman bust of Cicero, Musei Capitolini (Palazzo Nuovo), Rome, 2016; CC BY-SA 4.0 via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "Peron's return from exile to Argentina (1973)",
        "excerpt": "After eighteen years of exile in Franco's Spain, the deposed strongman Juan Domingo Peron returned to Argentina on 20 June 1973, drawing a crowd estimated in the millions to Ezeiza airport near Buenos Aires. The homecoming turned to bloodshed as right-wing Peronist gunmen fired on the assembled left in what became the Ezeiza massacre, and within months the aging caudillo was again president. It stands as the modern emblem of the controversial ruler who returns from exile to reclaim his country.",
        "source": "Wikipedia: Ezeiza massacre",
        "href": "https://en.wikipedia.org/wiki/Ezeiza_massacre",
        "image": {
          "src": "/covers/juan-orlando-hernandez-returns-honduras--a1.png",
          "alt": "Formal 1973 portrait photograph of Juan Domingo Peron, an older man in a dark suit and tie, looking toward the camera.",
          "credit": "Official portrait of Juan Domingo Peron, 23 April 1973, Casa Rosada / Museo del Bicentenario, Buenos Aires; public domain via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Dante, Paradiso, Canto XVII: the bitter bread of exile",
        "excerpt": "Thou shall leave each thing\nBelov’d most dearly: this is the first shaft\nShot from the bow of exile. Thou shalt prove\nHow salt the savour is of other’s bread,\nHow hard the passage to descend and climb\nBy other’s stairs.",
        "source": "Dante Alighieri, The Divine Comedy: Paradise, Canto XVII (trans. H. F. Cary), Project Gutenberg",
        "href": "https://www.gutenberg.org/ebooks/1007",
        "image": {
          "src": "/covers/juan-orlando-hernandez-returns-honduras--a2.png",
          "alt": "Botticelli's profile portrait of Dante Alighieri in a red robe and hood, his hooked-nosed face crowned with laurel against a dark background.",
          "credit": "Sandro Botticelli, Portrait of Dante Alighieri, c. 1495; public domain via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Shakespeare, Coriolanus: the banished leader's defiance",
        "excerpt": "You common cry of curs! whose breath I hate As reek o' the rotten fens, whose loves I prize As the dead carcasses of unburied men That do corrupt my air, I banish you; And here remain with your uncertainty! Let every feeble rumour shake your hearts! Your enemies, with nodding of their plumes, Fan you into despair! Have the power still To banish your defenders; till at length Your ignorance, which finds not till it feels, Making not reservation of yourselves, Still your own foes, deliver you as most Abated captives to some nation That won you without blows! Despising, For you, the city, thus I turn my back: There is a world elsewhere.",
        "source": "William Shakespeare, Coriolanus, Act III, Scene III",
        "href": "https://shakespeare.mit.edu/coriolanus/coriolanus.3.3.html",
        "image": {
          "src": "/covers/juan-orlando-hernandez-returns-honduras--a3.png",
          "alt": "Full-length painting of the actor John Philip Kemble as Coriolanus, a towering figure in a red cloak and armor gesturing imperiously against a stormy sky.",
          "credit": "Thomas Lawrence, John Philip Kemble as Coriolanus, 1798, Guildhall Art Gallery, London; public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Steuben, Napoleon's Return from Elba (1818)",
        "excerpt": "Charles de Steuben's 1818 canvas captures the moment at Laffrey on 7 March 1815 when Napoleon, newly escaped from exile on Elba, bares his chest to the royal troops sent to arrest him and dares them to fire; instead the soldiers break ranks and rally to their old emperor, launching the Hundred Days. The painting fixes the electric instant of a fallen ruler's return, when defiance flips into acclaim and the deposed strongman is swept back to power.",
        "source": "Charles de Steuben, Napoleon's Return from Elba, 1818",
        "href": "https://commons.wikimedia.org/wiki/File:Retour_de_Napoleon_d'_Isle_d'Elbe,_by_Charles_de_Steuben.jpg",
        "image": {
          "src": "/covers/juan-orlando-hernandez-returns-honduras--a4.png",
          "alt": "Napoleon in his gray coat and bicorne hat stands before kneeling and cheering soldiers who lower their muskets, a mountainous landscape behind them.",
          "credit": "Charles de Steuben, Napoleon's Return from Elba, 1818, private collection; public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Prud'hon, Justice and Divine Vengeance Pursuing Crime (1808)",
        "excerpt": "Pierre-Paul Prud'hon's 1808 masterpiece shows a murderer fleeing by moonlight over the stripped, sprawled body of his victim, pursued through the air by winged Divine Vengeance and the torch-and-sword figure of Justice. Painted to hang in the Paris criminal court, it is an emphatic rebuke to the fear of impunity: however far the guilty run, justice and retribution give chase and will not let the powerful escape.",
        "source": "Pierre-Paul Prud'hon, Justice and Divine Vengeance Pursuing Crime, 1808, Musee du Louvre",
        "href": "https://en.wikipedia.org/wiki/Justice_and_Divine_Vengeance_Pursuing_Crime",
        "image": {
          "src": "/covers/juan-orlando-hernandez-returns-honduras--a5.png",
          "alt": "Moonlit allegory: a fleeing near-naked criminal clutches loot beside a dead body, while two winged female figures, Justice with a sword and Vengeance, swoop down after him.",
          "credit": "Pierre-Paul Prud'hon, Justice and Divine Vengeance Pursuing Crime, 1808, Musee du Louvre, Paris; public domain via Wikimedia Commons."
        }
      }
    ],
    "rank": 26
  },
  {
    "slug": "trump-tariffs-lawsuits-global-pushback",
    "headline": "Small businesses sue over Trump's sweeping new tariffs as US allies push back",
    "overview": "American small businesses filed lawsuits challenging President Trump's latest round of sweeping tariffs, arguing the levies are unlawful and are driving up their costs. Abroad, Australian Prime Minister Anthony Albanese said he would raise concerns directly with Trump, and analysts warned the new duties on dozens of countries are likely here to stay, with more to come. The measures have rattled markets and strained ties with trading partners from Europe to Asia.",
    "genre": "Economy",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMijwFBVV95cUxNZ0M2S0lDNEpzamJTNFJGUUlGZG5YcjQzM0VDblNfeW9rODIzZ0tWR2hycklaYmVUOG1fdndQLWJOQ3RJd3c5TVZ1WmRyQ2xYQWd3OGQ4UExKdERtWDFDbzA5MGdhMzE1TWpXNjB0UjBPWUYteDFfdXlfUGViNWtsWWxKVG9ESE5DQU1PdGo2OA?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMisgFBVV95cUxOWEhnbzZuUVgwb2duQzN4ZGpYM1hkWXRKUTlBZUVpWFRLUjVQaDFWQVkzdm5qLWpfckwtZ3QyZFlpMTZSYkJlNWhxT1lXcGFETW12Z1JNWUtnQWxzRE8xSWFmcmhhMXhMbjlOMVBXbFBJRHBjc3BGdXdOX3Brc1A2VkltcTdRcHRQeUEyUnlSVUtESDY5MU1QeDhxZUNub0gxSjFTaEVHaEpJYVQxWkh4c0VR?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-26",
    "image": {
      "src": "/covers/trump-tariffs-lawsuits-global-pushback.png",
      "alt": "Stacked shipping containers and cranes at a busy port container terminal",
      "credit": "Matti Blume, CC BY-SA 4.0, via Wikimedia Commons"
    },
    "lead": true,
    "edition": "Morning Edition · 26 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "George R. T. Hewes, \"A Retrospect of the Boston Tea-Party\" (1834): an eyewitness recalls colonists destroying the taxed East India Company tea in Boston Harbor, December 1773",
        "excerpt": "We then were ordered by our commander to open the hatches, and take out all the chests of tea and throw them overboard, and we immediately proceeded to execute his orders; first cutting and splitting the chests with our tomahawks, so as thoroughly to expose them to the effects of the water.",
        "source": "George R. T. Hewes, A Retrospect of the Boston Tea-Party, With a Memoir of George R. T. Hewes (1834), via The American Yawp Reader",
        "href": "https://www.americanyawp.com/reader/the-american-revolution/george-r-t-hewes-a-retrospect-of-the-boston-tea-party-1834/",
        "image": {
          "src": "/covers/trump-tariffs-lawsuits-global-pushback--a0.png",
          "alt": "Colonists disguised as Mohawks throwing chests of tea from ships into Boston Harbor as a crowd cheers from the wharf",
          "credit": "Nathaniel Currier, 'The Destruction of Tea at Boston Harbor' (1846), hand-colored lithograph. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "Petition of 1,028 American economists urging President Hoover to veto the Smoot-Hawley Tariff (May 1930)",
        "excerpt": "The undersigned American economists and teachers of economics strongly urge that any measure which provides for a general upward revision of tariff rates be denied passage by Congress, or if passed, be vetoed by the President. We are convinced that increased protective duties would be a mistake. They would operate, in general, to increase the prices which domestic consumers would have to pay.",
        "source": "The 1930 economists' petition against the Smoot-Hawley Tariff Act, reproduced by the American Enterprise Institute",
        "href": "https://www.aei.org/carpe-diem/the-economists-tariff-protest-of-1930/",
        "image": {
          "src": "/covers/trump-tariffs-lawsuits-global-pushback--a1.png",
          "alt": "Senator Reed Smoot and Representative Willis C. Hawley standing side by side in 1929, sponsors of the Smoot-Hawley Tariff",
          "credit": "Rep. Willis C. Hawley and Sen. Reed Smoot, April 11, 1929. Library of Congress, public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Adam Smith, An Inquiry into the Nature and Causes of the Wealth of Nations (1776), Book IV, Chapter II, on the folly of protecting home industry by high duties",
        "excerpt": "It is the maxim of every prudent master of a family, never to attempt to make at home what it will cost him more to make than to buy. ... What is prudence in the conduct of every private family can scarce be folly in that of a great kingdom.",
        "source": "Adam Smith, The Wealth of Nations, Book IV, Chapter II, via Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Wealth_of_Nations/Book_IV/Chapter_2",
        "image": {
          "src": "/covers/trump-tariffs-lawsuits-global-pushback--a2.png",
          "alt": "Portrait of the economist Adam Smith in profile, known as the Muir portrait",
          "credit": "Unknown artist, 'The Muir portrait' of Adam Smith. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Frederic Bastiat, \"A Petition\" (the Candlemakers' Petition), from Economic Sophisms, First Series, Chapter VII (1845; trans. Patrick James Stirling, 1873)",
        "excerpt": "We are suffering from the intolerable competition of a foreign rival, placed, it would seem, in a condition so far superior to ours for the production of light, that he absolutely inundates our national market with it at a price fabulously reduced. The moment he shows himself, our trade leaves us—all consumers apply to him; and a branch of native industry, having countless ramifications, is all at once rendered completely stagnant. This rival, who is no other than the Sun, wages war to the knife against us, and we suspect that he has been raised up by perfidious Albion (good policy as times go); inasmuch as he displays towards that haughty island a circumspection with which he dispenses in our case.",
        "source": "Frederic Bastiat, Economic Sophisms, First Series, Chapter VII ('A Petition'), trans. Patrick James Stirling, via Project Gutenberg",
        "href": "https://www.gutenberg.org/files/44145/44145-h/44145-h.htm",
        "image": {
          "src": "/covers/trump-tariffs-lawsuits-global-pushback--a3.png",
          "alt": "Portrait engraving of the French economist Frederic Bastiat",
          "credit": "Frederic Bastiat, from the Galerie des representants du peuple (1848). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Attributed to Philip Dawe, \"The Bostonians Paying the Excise-man, or Tarring & Feathering\" (mezzotint, London, 1774)",
        "excerpt": "This British satirical mezzotint shows Boston patriots forcing scalding tea down the throat of a tarred-and-feathered customs officer, John Malcolm, beneath a noose slung from the Liberty Tree while the Boston Tea Party unfolds in the harbor behind. Printed in London to mock colonial mob violence, it captures the raw, coercive fury with which ordinary merchants and citizens turned on the ruler's tax collectors, a fury that echoes today's small-business revolt against duties they never voted for.",
        "source": "Attributed to Philip Dawe, The Bostonians Paying the Excise-man, or Tarring & Feathering, 1774, The Metropolitan Museum of Art (via Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:The_Bostonians_Paying_the_Excise-Man,_or_Tarring_%26_Feathering_MET_MM2273.jpg",
        "image": {
          "src": "/covers/trump-tariffs-lawsuits-global-pushback--a4.png",
          "alt": "1774 mezzotint of Bostonians pouring tea into a tarred-and-feathered customs excise-man beneath a Liberty Tree, with ships in the harbor",
          "credit": "Attributed to Philip Dawe, mezzotint, 1774. The Metropolitan Museum of Art, public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Marinus van Reymerswaele, \"Two Tax Gatherers\" (oil on oak, c. 1540), The National Gallery, London (NG944)",
        "excerpt": "In this Flemish satire two grotesque officials hunch over a table in fur-trimmed finery, one scratching entries in a ledger of levies while the other claws at a heap of coins. Painted around 1540, it is a merciless caricature of the greed and corruption of those who collect duties and taxes for the state. Its grasping, joyless faces make it a timeless emblem of levies that enrich the collector while resentment builds among the merchants and citizens made to pay.",
        "source": "Marinus van Reymerswaele, Two Tax Gatherers, c. 1540, oil on oak, The National Gallery, London (NG944)",
        "href": "https://www.nationalgallery.org.uk/research/publications/technical-bulletin/the-two-tax-gatherers-by-marinus-van-reymerswale-original-and-replica",
        "image": {
          "src": "/covers/trump-tariffs-lawsuits-global-pushback--a5.png",
          "alt": "Two ugly, richly dressed tax collectors at a table, one writing in a ledger while the other reaches for a pile of coins",
          "credit": "Marinus van Reymerswaele, 'Two Tax Gatherers', c. 1540, National Gallery, London. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 27
  },
  {
    "slug": "west-bank-settler-violence-mosques",
    "headline": "Israel detains more than 70 as settlers burn West Bank mosques after a deadly shooting",
    "overview": "Israeli forces detained more than 70 people and rounded up Palestinians in a West Bank village after a shooting involving settlers left several people dead, authorities said. Israeli settlers set fire to mosques in the occupied territory following the deadly clash, deepening a surge of violence. The bloodshed has drawn international concern over spiraling tensions in the West Bank.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMitwFBVV95cUxQX016UEJ6ZW5iYlFWclZ5eEpzRmZLOHQxcTM2T2dXQ2pYeTNseUdNdXBlcE8tZ191U0tLWlQtV3VkRWVuV2s0dkVhRFUwTElxa0ctR1R4cjJwcXZKQmhHWGdHYTZrTnZFNElQQVdPdVBlc3MxZmJHUU0yNllkWTFnLUxjS1lhU3N1WjI0V0wzMFVPazVvd2ZITFJNYVdacjNQTmJaZ3NaOVdCTThJVGhJTXNxRVM4WGM?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMitwFBVV95cUxOUVBNcGd1UUxUT2Z6MUFrU1o4YW1XOVB5X2lXMVp4WFB5QjBlNkx2bnlocXdOVHFmMmozc1hXamVNQUdkZDl6SndsUmxrUWZXaDhadkMyZTdmektVVzQ0TkZVMWdleVRta01iUVhCWUplMnZGZVZpejc4SUNFYmlNTlBmWWVtdDczWWVYa2trT1BpRjZZaUQ5N1VWeVN2ajVOOVU1MTgyRVlhVTBFcFhpYUYtMnI1NjQ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-26",
    "image": {
      "src": "/covers/west-bank-settler-violence-mosques.png",
      "alt": "View of a Palestinian town in the occupied West Bank",
      "credit": "Almonroth, CC BY-SA 3.0, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 26 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The burning of the Second Temple of Jerusalem by Roman forces under Titus, 70 CE (recorded by Josephus)",
        "excerpt": "In 70 CE, Roman legions under Titus stormed Jerusalem and put the Second Temple to the torch, ending centuries of sacrificial worship at Judaism's holiest site. The historian Josephus, an eyewitness, described flames engulfing the sanctuary as soldiers disregarded orders to spare it and thousands perished in the burning colonnades. The gutting of the Temple became the archetypal image of a sacred house of worship destroyed by conquering force.",
        "source": "Siege of Jerusalem (70 CE), drawing on Josephus, The Jewish War — Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Siege_of_Jerusalem_(70_CE)",
        "image": {
          "src": "/covers/west-bank-settler-violence-mosques--a0.png",
          "alt": "David Roberts, The Siege and Destruction of Jerusalem by the Romans Under the Command of Titus, A.D. 70 (1850), showing the Temple in flames",
          "credit": "David Roberts, 'The Siege and Destruction of Jerusalem by the Romans Under the Command of Titus, A.D. 70' (1850), via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "historical",
        "title": "Kristallnacht, the Nazi pogrom that burned over a thousand synagogues across Germany and Austria, 9-10 November 1938",
        "excerpt": "On the night of 9-10 November 1938, coordinated Nazi mobs across Germany and Austria burned and ransacked well over a thousand synagogues, smashed Jewish shops, and desecrated houses of prayer. Some 30,000 Jewish men were arrested and deported to concentration camps in the pogrom's aftermath. The 'Night of Broken Glass' turned communal violence into state-orchestrated assault on a people's sanctuaries, a grim escalation on the road to the Holocaust.",
        "source": "Kristallnacht — Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Kristallnacht",
        "image": {
          "src": "/covers/west-bank-settler-violence-mosques--a1.png",
          "alt": "The synagogue in Eisenach, Germany, in flames during Kristallnacht, November 1938",
          "credit": "Photograph of the Eisenach synagogue burning, November 1938, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "literary",
        "title": "Psalm 74:7-8, The Book of Psalms, King James Version (1611)",
        "excerpt": "They have cast fire into thy sanctuary, they have defiled by casting down the dwelling place of thy name to the ground. They said in their hearts, Let us destroy them together: they have burned up all the synagogues of God in the land.",
        "source": "The Book of Psalms 74:7-8, King James Version — eBible.org",
        "href": "https://ebible.org/kjv/PSA074.htm"
      },
      {
        "category": "literary",
        "title": "Lamentations 2:6-7, mourning the violated sanctuary, King James Version (1611)",
        "excerpt": "And he hath violently taken away his tabernacle, as if it were of a garden: he hath destroyed his places of the assembly: the LORD hath caused the solemn feasts and sabbaths to be forgotten in Zion, and hath despised in the indignation of his anger the king and the priest. The LORD hath cast off his altar, he hath abhorred his sanctuary, he hath given up into the hand of the enemy the walls of her palaces; they have made a noise in the house of the LORD, as in the day of a solemn feast.",
        "source": "The Lamentations of Jeremiah 2:6-7, King James Version — Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Lamentations"
      },
      {
        "category": "artistic",
        "title": "Francesco Hayez, La distruzione del Tempio di Gerusalemme (The Destruction of the Temple of Jerusalem), oil on canvas, 1867",
        "excerpt": "Francesco Hayez's vast 1867 canvas stages the Roman sack of Jerusalem as a whirl of collapsing columns, fleeing priests, and armed soldiers overrunning the Temple precinct. Painted with Risorgimento overtones of exile and lost homeland, it renders the violation of a sanctuary as both historical catastrophe and enduring lament.",
        "source": "Francesco Hayez, 'La distruzione del Tempio di Gerusalemme' (1867), Gallerie dell'Accademia, Venice — Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Francesco_Hayez_017.jpg",
        "image": {
          "src": "/covers/west-bank-settler-violence-mosques--a4.png",
          "alt": "Francesco Hayez's 1867 painting The Destruction of the Temple of Jerusalem, showing Roman soldiers storming the collapsing Temple",
          "credit": "Francesco Hayez, 'La distruzione del Tempio di Gerusalemme' (1867), Gallerie dell'Accademia, Venice, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Giuseppe Verdi (music) and Temistocle Solera (libretto), 'Va, pensiero' (Chorus of the Hebrew Slaves) from the opera Nabucco, 1842",
        "excerpt": "\"Va, pensiero, sull'ali dorate\" — the opening cry of the Chorus of the Hebrew Slaves, whose exiled voices send their thoughts flying on golden wings toward a lost homeland and a desecrated Jerusalem. Verdi's mournful 1842 chorus became an anthem of a displaced people grieving sanctuary and land torn from them.",
        "source": "Giuseppe Verdi and Temistocle Solera, 'Va, pensiero' from Nabucco (1842) — Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Va,_pensiero",
        "image": {
          "src": "/covers/west-bank-settler-violence-mosques--a5.png",
          "alt": "Musical score showing the melody and first verse of Verdi's chorus 'Va, pensiero' from Nabucco",
          "credit": "Melody and first verse of 'Va, pensiero' from Verdi's Nabucco (1842), via Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 28
  },
  {
    "slug": "comic-con-2026-marvel-casting",
    "headline": "Marvel casts Ryan Gosling as Ghost Rider and David Jonsson as the new Black Panther at Comic-Con",
    "overview": "Marvel Studios used its San Diego Comic-Con panel to unveil Ryan Gosling as Ghost Rider and David Jonsson as the new Black Panther, alongside a 'Black Panther 3' announcement. The reveals drew roars from the Hall H crowd as the studio laid out its coming slate. Comic-Con remains the film and comics industry's biggest annual showcase.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMisAFBVV95cUxPTEY0V3dRZDM4dWhzX1VhWW5nQ0lDQ05STHpTa3Y3bFdGS25aSU5pOXVtWDk2RDRKLUk1cl9uOG9GOVNCZmJVU0dydFZsNy1fZE52dzZ3LVdoS2Z0M2p4bk1HWDlIS2RYeTNoc1F5T0VYaW1Bc3hnTzlPSW94aWVmcHc2TWhBZktVMF9FVmdYYXBhcnNvTXNwVE9zWGRnQi1UTzhORHA2X0xXbmRIUnd2bw?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMisAFBVV95cUxOX05uWGZuRERrX3Nta2dzWXJhYldYQlhKRFhJSWc0TUdlQ3lFdlZwV1dMNmRtRF9BbV9xVW04d1NpM0NJVkNMWkxnTTh3eXZDd3UyTE0tdGZJSUtCbFdCWVhTZDZqb3QxNVU2cE54bFltSHVZc2hjd25BN2FzQ0laaFFJa3RSVFFuRWhUWC0ydkJfRFhSdkNTSXV6U0tLbnExSlBIYnBPQWU1eGxNcE52SA?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-26",
    "image": {
      "src": "/covers/comic-con-2026-marvel-casting.png",
      "alt": "Crowds outside the San Diego Convention Center during Comic-Con",
      "credit": "Pop Culture Geek (The Conmunity), CC BY 2.0, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 26 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Pericles praises Athens' year-round games and festivals as the spectacle that refreshes its people — Thucydides, History of the Peloponnesian War, Book 2.38 (c. 431-404 BCE), translated by Richard Crawley (1874)",
        "excerpt": "We celebrate games and sacrifices all the year round, and the elegance of our private establishments forms a daily source of pleasure and helps to banish the spleen; while the magnitude of our city draws the produce of the world into our harbour, so that to the Athenian the fruits of other countries are as familiar a luxury as those of his own.",
        "source": "Thucydides, History of the Peloponnesian War, Book 2, chapter 38 (Crawley translation), Wikisource",
        "href": "https://en.wikisource.org/wiki/History_of_the_Peloponnesian_War/Book_2",
        "image": {
          "src": "/covers/comic-con-2026-marvel-casting--a0.png",
          "alt": "Marble relief of horsemen in a cavalcade from the Parthenon frieze depicting the Panathenaic procession, 5th century BCE",
          "credit": "Cavalcade from the Parthenon frieze (Panathenaic procession), c. 447-432 BCE, British Museum; photograph via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "The tradition of a new pope taking a regnal name on assuming the office, begun by Pope John II (elected 533 CE) and unbroken for centuries",
        "excerpt": "When a man is elected to the papacy he sets aside his birth name and assumes a new regnal name, becoming the latest bearer of an ancient office rather than merely himself. The custom is traced to John II in 533, a Roman priest named Mercurius who judged a pagan god's name unfit for the throne of Peter and chose a new one. Ever since, the moment of accession has been marked by this ritual renaming and public crowning, so that a fresh man takes up a role and a lineage far older than himself.",
        "source": "\"Papal name\", Wikipedia (encyclopedia overview of the papal naming tradition)",
        "href": "https://en.wikipedia.org/wiki/Papal_name",
        "image": {
          "src": "/covers/comic-con-2026-marvel-casting--a1.png",
          "alt": "18th-century print depicting the ceremonial coronation of Pope Pius VI",
          "credit": "Coronation of Pope Pius VI, engraving, The Metropolitan Museum of Art (DP885871), via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "The prophet's mantle falls from Elijah and is taken up by his successor Elisha — 2 Kings 2:13-14, King James Version (1611)",
        "excerpt": "He took up also the mantle of Elijah that fell from him, and went back, and stood by the bank of Jordan; And he took the mantle of Elijah that fell from him, and smote the waters, and said, Where is the LORD God of Elijah? and when he also had smitten the waters, they parted hither and thither: and Elisha went over.",
        "source": "The Holy Bible, King James Version, 2 Kings 2:13-14, Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/2_Kings",
        "image": {
          "src": "/covers/comic-con-2026-marvel-casting--a2.png",
          "alt": "Watercolor of the prophet Elijah carried up to heaven in a chariot of fire drawn by horses of fire",
          "credit": "James Tissot, Elijah Taken Up to Heaven, watercolor, c. 1896-1902, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Prometheus recounts how he stole fire and gave it to mortals — Aeschylus, Prometheus Bound (c. 5th century BCE), translated by Herbert Weir Smyth (1922)",
        "excerpt": "I hunted out and stored in fennel stalk the stolen source of fire that hath proved to mortals a teacher in every art and a means to mighty ends.",
        "source": "Aeschylus, Prometheus Bound (Smyth translation, 1927 printing), Wikisource",
        "href": "https://en.wikisource.org/wiki/Aeschylus_(Smyth_1927)_v1/Prometheus_Bound",
        "image": {
          "src": "/covers/comic-con-2026-marvel-casting--a3.png",
          "alt": "Neoclassical painting of Prometheus bringing the flame of fire down to mankind",
          "credit": "Heinrich Friedrich Füger, Prometheus Brings Fire to Mankind, 1817, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "The Riace Bronzes (Statue A) — over-lifesize Greek bronze statue of a nude warrior-hero, c. 460-450 BCE, Museo Nazionale della Magna Grecia, Reggio Calabria",
        "excerpt": "Recovered from the seabed off Riace in 1972, this over-lifesize bronze presents the idealized warrior-hero of the Greek imagination: muscled, poised, and commanding, with inlaid eyes, silvered teeth and copper lips that once made him seem uncannily alive. He embodies the king-protector and champion the crowd looks to, the mortal form of a heroic myth cast in enduring metal. Standing before a modern viewer, he still radiates the authority of a guardian who steps forward to be seen and acclaimed.",
        "source": "Riace Bronzes, Statue A, Museo Nazionale della Magna Grecia, Reggio Calabria; photograph via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Riace_Warrior_A.jpg",
        "image": {
          "src": "/covers/comic-con-2026-marvel-casting--a4.png",
          "alt": "Ancient Greek bronze statue of a bearded nude warrior standing in a poised heroic stance",
          "credit": "Riace Bronze, Statue A, Greek, c. 460-450 BCE, Museo Nazionale della Magna Grecia, Reggio Calabria; photograph via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "\"Ride of the Valkyries\" (Walkurenritt) from Act III of Richard Wagner's opera Die Walkure, WWV 86B (composed 1856-1870, premiered 1870)",
        "excerpt": "Wagner's surging brass and galloping strings storm in as the warrior-maidens sweep across a fire-lit sky, gathering fallen heroes to a mythic afterlife. It is music built for grand spectacle and heroic entrance, a sound that turns an arrival into an event and a crowd into a roar. Its blazing momentum and shrieking horns make it the ultimate fanfare for a hero unveiled to the multitude.",
        "source": "Richard Wagner, Die Walkure, WWV 86B (scores and parts), IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Die_Walk%C3%BCre,_WWV_86B_(Wagner,_Richard)",
        "image": {
          "src": "/covers/comic-con-2026-marvel-casting--a5.png",
          "alt": "Painting of armored Valkyries riding winged horses through a stormy sky carrying fallen warriors",
          "credit": "John Charles Dollman, The Ride of the Valkyrs, 1909, via Wikimedia Commons"
        }
      }
    ],
    "rank": 29
  },
  {
    "slug": "flavio-bolsonaro-brazil-campaign",
    "headline": "Flavio Bolsonaro launches a presidential campaign in Brazil, touting support from Milei and Netanyahu",
    "overview": "Senator Flavio Bolsonaro, son of former president Jair Bolsonaro, launched a campaign for Brazil's presidency, securing his party's bid despite legal and political challenges. He touted backing from allies including Argentina's Javier Milei and Israel's Benjamin Netanyahu. The move sets up a charged election as the Brazilian right seeks to reclaim power.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMizgFBVV95cUxOaUluanNaMzVMbDhWWGJGU2RXQUVuVFptQmlEb1JBM2NocXpvQmdmTlU5S2ZqVGVnZG9NLV9Gbi1Lc2hJbVZYMnZZVHBPSDdTdkxiWG9KUDRrODhMTi1YU3pZbmJhbzJvbUtzVXhJTkswTTBOQ1ZvamoxMzY1bEl0SnFHd29FMnFteUlJWks0NXdya1E5R1ppUEtram9HUWlNdlhqNTdoLVQweEZic29TQ1FzcjdPb1NBNVRxaVV3aDE1LXVibnp2Y1Jxb3hFUQ?oc=5"
      },
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMiuAFBVV95cUxOOGw5NFNfRVh2cDAwTGxzNUdFU29uT29qTHR1REpKV2NzT3k0QXpLa3lSRFE5Vk5SR3lZc2F5bnpsRGFULTRQTURZQ0hudVM3WG1zZU5HY3RYakRqdHhXS3h3NlZpdTdXM1BhdWNJd252Zy1oZFpRSnIxUzlQZ081LTktY3FYeXVrMjBWMkJJazBJX2EteWZXbENBZjZXM0pBeVNMODhORGJPS3k4eWo3WmFJN2M5bWc4?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-26",
    "image": {
      "src": "/covers/flavio-bolsonaro-brazil-campaign.png",
      "alt": "Official portrait of Brazilian senator Flavio Bolsonaro",
      "credit": "Agencia Senado, Attribution, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 26 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "John Quincy Adams and America's first presidential dynasty (1825)",
        "excerpt": "In 1825 John Quincy Adams became the sixth U.S. president, the first son of a former president (John Adams) to reach the office. No candidate won an Electoral College majority in 1824, so the contest went to the House of Representatives, where Henry Clay's backing tipped the result to Adams over Andrew Jackson. The outcome made the Adamses the nation's first presidential dynasty, a father's mantle descending to his son.",
        "source": "Wikipedia, \"Inauguration of John Quincy Adams\" / \"John Quincy Adams\"",
        "href": "https://en.wikipedia.org/wiki/John_Quincy_Adams",
        "image": {
          "src": "/covers/flavio-bolsonaro-brazil-campaign--a0.png",
          "alt": "Portrait of John Quincy Adams by Thomas Sully, 1824",
          "credit": "Thomas Sully, 1824 (public domain), via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "Napoleon III and the restoration of the Bonaparte empire (1852)",
        "excerpt": "Louis-Napoleon Bonaparte rode his uncle's name to the presidency of France's Second Republic in 1848, winning in a landslide fueled by Bonapartist nostalgia. Barred from re-election, he seized power in an 1851 coup and, exactly one year later on 2 December 1852, proclaimed himself Emperor Napoleon III, restoring the family empire. The nephew resurrected the dynasty by trading on the legend of Napoleon I.",
        "source": "Wikipedia, \"Napoleon III\"",
        "href": "https://en.wikipedia.org/wiki/Napoleon_III",
        "image": {
          "src": "/covers/flavio-bolsonaro-brazil-campaign--a1.png",
          "alt": "Portrait of Napoleon III by Alexandre Cabanel, 1865",
          "credit": "Alexandre Cabanel, 1865 (public domain), via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Shakespeare, The Second Part of King Henry the Fourth (Act IV): Prince Hal takes his father's crown",
        "excerpt": "My due from thee is this imperial crown, / Which, as immediate from thy place and blood, / Derives itself to me. Lo! here it sits, / Which God shall guard; and put the world's whole strength / Into one giant arm, it shall not force / This lineal honour from me.",
        "source": "William Shakespeare, Henry IV Part 2 (Yale Shakespeare, 1921), Act IV, via Wikisource",
        "href": "https://en.wikisource.org/wiki/Henry_IV_Part_2_(1921)_Yale/Text/Act_IV",
        "image": {
          "src": "/covers/flavio-bolsonaro-brazil-campaign--a2.png",
          "alt": "Early portrait of King Henry V of England, unknown artist, National Portrait Gallery",
          "credit": "Unknown artist, late 16th/early 17th century (public domain), via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Aeschylus, Agamemnon: the inherited curse of the House of Atreus",
        "excerpt": "But I hold my thought alone and by others unbeguiled; / 'Tis the deed that is unholy shall have issue, child on child, / Sin on sin, like his begetters; and they shall be as they were.",
        "source": "Aeschylus, The Agamemnon (trans. Gilbert Murray), Project Gutenberg eBook #14417",
        "href": "https://www.gutenberg.org/files/14417/14417-h/14417-h.htm",
        "image": {
          "src": "/covers/flavio-bolsonaro-brazil-campaign--a3.png",
          "alt": "Clytemnestra by John Collier, 1882",
          "credit": "John Collier, 1882 (public domain), via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Jacques-Louis David, The Coronation of Napoleon (1805-1807)",
        "excerpt": "David's vast canvas freezes the moment Napoleon, having already crowned himself, raises the crown to anoint Josephine, seizing legitimacy rather than receiving it. The Pope sits behind, reduced to a witness, while the assembled court ratifies a self-made dynasty. Imperial power is staged as inheritance and spectacle. The painting hangs in the Louvre.",
        "source": "Jacques-Louis David, Le Sacre de Napoleon, Musee du Louvre",
        "href": "https://en.wikipedia.org/wiki/The_Coronation_of_Napoleon",
        "image": {
          "src": "/covers/flavio-bolsonaro-brazil-campaign--a4.png",
          "alt": "The Coronation of Napoleon by Jacques-Louis David, 1805-1807, oil on canvas, Louvre",
          "credit": "Jacques-Louis David, 1805-1807 (public domain), Musee du Louvre, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Giuseppe Verdi, Nabucco (1842): a ruler's overreach and a people's hope of restoration",
        "excerpt": "Verdi's 1842 opera dramatizes King Nebuchadnezzar's hubris: declaring himself a god, he is struck mad until he repents and frees the captive Hebrews. Its chorus \"Va, pensiero,\" sung by the exiled slaves longing for their lost homeland, became an anthem of political yearning and national restoration. It is a parable of a ruler's overreach and a people's dream of return.",
        "source": "Giuseppe Verdi, Nabucco (1841-42), full score, IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Nabucco_(Verdi,_Giuseppe)",
        "image": {
          "src": "/covers/flavio-bolsonaro-brazil-campaign--a5.png",
          "alt": "Portrait of Giuseppe Verdi by Giovanni Boldini, 1886",
          "credit": "Giovanni Boldini, 1886 (public domain), via Wikimedia Commons"
        }
      }
    ],
    "rank": 30
  },
  {
    "slug": "pogacar-fifth-tour-de-france",
    "headline": "Pogacar closes on a record-equaling fifth Tour de France title as wildfires shorten the finale",
    "overview": "Tadej Pogacar moved to the brink of a record-equaling fifth Tour de France title as Ecuador's Richard Carapaz won the penultimate stage. Organizers shortened the race's final stage after French security forces were redeployed to battle wildfires sweeping the country. The blazes upended the traditional run-in to the three-week race.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMingFBVV95cUxOcXo3Z3pNSUIwSUwyYTg1VnhwdUNZLV9Ca0lzWDZMNWZxVzVFVEdqdmFCOC1KLVNFVjVKamRGbXVxdzVwS1VLOXBUWW5XelF2MlpISm5KRU11UlZkbmhHOG13V25SOEpUcFMyQWhyVll2dUxHRlN5WmdGRHhXUER3SnhHZU5yYTBoNkR3S293U3RKVVJBRDRKa0NybG9JZw?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMitgFBVV95cUxPNWgzVEwyRWNsenMwcnZBcGRvOFZGcnJHSGEyMUZqU2VXc0ptN1EyNTdPNm1xRGF0eWpsZHFKLW9TTlp3T3dJWEhySVkzOUtJMmUtcWQ4d3VBQ0M3NTlsOGZWNzM5aGZyVDFGLWNDbEN1d0xKTU9CTW5JS1dlT1RZbUhnZFFOaVBucS1ZUjJBU0FNeEt2R3U2aUZFN3hQNkZLVEN6UEJOUHIwR1l4bTU0WUpsdnZzQQ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-26",
    "image": {
      "src": "/covers/pogacar-fifth-tour-de-france.png",
      "alt": "Tadej Pogacar racing in the yellow jersey at the Tour de France",
      "credit": "Hugo LUC, CC BY-SA 4.0, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 26 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The olive crown of the ancient Olympic Games (kotinos)",
        "excerpt": "At the ancient Olympic Games there were no medals of gold, silver, or bronze. The sole prize was the kotinos, a wreath cut from the sacred wild olive tree that grew beside the Temple of Zeus at Olympia, snipped with golden shears by a boy whose parents were both still living. Modest in substance yet immense in honor, the crown proclaimed that the athlete had striven for virtue rather than wealth, and the victors' names became the very calendar by which the Greek world dated its years.",
        "source": "Wikipedia, \"Kotinos\"",
        "href": "https://en.wikipedia.org/wiki/Kotinos"
      },
      {
        "category": "historical",
        "title": "Gaius Appuleius Diocles, champion charioteer of Imperial Rome",
        "excerpt": "In the 2nd century AD the charioteer Gaius Appuleius Diocles thundered around the Circus Maximus for twenty-four years, winning 1,462 of his 4,257 four-horse races and hanging back until the final moment before surging clear of his rivals. A stone inscription preserves his staggering career winnings of 35,863,120 sesterces, a sum that has led moderns to hail him as perhaps the highest-paid athlete of all time. Yet for all his fame his trade branded him \"infamous,\" ranked with gladiators and actors and barred from the ranks of the Roman elite.",
        "source": "Wikipedia, \"Gaius Appuleius Diocles\"",
        "href": "https://en.wikipedia.org/wiki/Gaius_Appuleius_Diocles"
      },
      {
        "category": "literary",
        "title": "Homer, Iliad, Book XXIII (the chariot race at the funeral games of Patroclus)",
        "excerpt": "At one moment the chariots seemed to touch the ground, and then again they bounded into the air; the drivers stood erect, and their hearts beat fast and furious in their lust of victory.",
        "source": "Homer, The Iliad, Book XXIII, translated by Samuel Butler (public domain)",
        "href": "https://en.wikisource.org/wiki/The_Iliad_(Butler)/Book_XXIII"
      },
      {
        "category": "literary",
        "title": "St Paul, 1 Corinthians 9:24-25 (King James Version)",
        "excerpt": "Know ye not that they which run in a race run all, but one receiveth the prize? So run, that ye may obtain. And every man that striveth for the mastery is temperate in all things. Now they do it to obtain a corruptible crown; but we an incorruptible.",
        "source": "The Holy Bible, King James Version, 1 Corinthians 9:24-25 (public domain)",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/1_Corinthians"
      },
      {
        "category": "artistic",
        "title": "Ulpiano Checa, \"Carrera de carros romanos\" (Roman Chariot Race), 1890",
        "excerpt": "Ulpiano Checa's Roman Chariot Race hurls the viewer into the dust and thunder of the ancient circus: straining horses at full gallop, charioteers braced against the reins, and the roar of the crowd almost audible in the whirl of motion. First shown at the 1890 Salon de Paris, where it won the young Spanish painter his first great acclaim, the canvas turns athletic spectacle into an image of speed, danger, and glory.",
        "source": "Wikimedia Commons, \"Carrera de carros romanos-Ulpiano Checa\" (public domain)",
        "href": "https://commons.wikimedia.org/wiki/File:Carrera_de_carros_romanos-Ulpiano_Checa.JPG",
        "image": {
          "src": "/covers/pogacar-fifth-tour-de-france--a4.png",
          "alt": "Painting of a Roman chariot race with horses at full gallop and charioteers straining against the reins in a crowded arena",
          "credit": "Ulpiano Checa, \"Carrera de carros romanos\" (1890), public domain via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Euphiletos Painter, Panathenaic prize amphora with foot race (stadion), c. 530 BC",
        "excerpt": "This black-figure terracotta amphora by the Euphiletos Painter, made in Athens about 530 BC and now in the Metropolitan Museum of Art, was itself a victory prize, once filled with sacred olive oil for the champion. On one side a line of nude, bearded runners strains forward in the stadion foot race, muscles taut and legs flying, an ancient image of pure competitive endurance rendered in the deep black silhouette of Attic pottery.",
        "source": "Wikipedia / Metropolitan Museum of Art, \"Euphiletos Painter Panathenaic prize amphora\" (public domain)",
        "href": "https://en.wikipedia.org/wiki/Euphiletos_Painter_Panathenaic_prize_amphora",
        "image": {
          "src": "/covers/pogacar-fifth-tour-de-france--a5.png",
          "alt": "Black-figure Panathenaic prize amphora showing a row of nude bearded runners in a foot race",
          "credit": "Euphiletos Painter, Panathenaic prize amphora (c. 530 BC), Metropolitan Museum of Art, public domain via Wikimedia Commons"
        }
      }
    ],
    "rank": 31
  },
  {
    "slug": "oregon-wildfire-fourth-firefighter-dies",
    "headline": "A fourth firefighter dies as fast-moving wildfires threaten a central Oregon town",
    "overview": "A fourth firefighter died from injuries suffered in a June wildland fire in Colorado, authorities said, as fast-moving wildfires bore down on a town in central Oregon. Crews scrambled to protect homes amid dry, windy conditions across the American West. The deaths underscore a punishing and dangerous fire season.",
    "genre": "Climate",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMiowFBVV95cUxNYlpoV2d0cFRIeUdhMWF5NGhFY1RZTEd3TVU5a2h5dlUtNlVWNzRfSFVMVEJLSE9nS2Rvb05ITjI1N3VOeWVWQnNwSnBMOTk2dnNnSVM0NWhVUVQwN0I3MERyNUxHT2hva1ZsTGZnbTI5ZFRuWkdfM3duelBLd0tQS1RSbUZYQkYzSm1xNU4zWjM4YklKdmtjT2NBR18xVlhwaXNJ?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiugFBVV95cUxPdXRZUnJqel9YSUhVSTM1OC1abUxxZTYwZy1HTlliYzZRYk4xTXpDTWJSRy1CdVZOeF9weWpPeTRIdUI2ek9vRGJjVTNSUWgtalJsM1BITjhsTXpFeDB6VThpelhYeW1RVUI5MWJkY2NRUTc5a2JDMmdQRElXVXBGRmZiSUNNeC13anVkZF85VHgyQU83TFVEaGNHRGFKVzd4WmF5VjBmRlg0WE9HdTFYV1lmRG9QYXcyTFE?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-26",
    "image": {
      "src": "/covers/oregon-wildfire-fourth-firefighter-dies.png",
      "alt": "Wildland firefighters working a forest wildfire in the United States",
      "credit": "U.S. Forest Service, Public domain, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 26 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Great Fire of Rome (64 CE)",
        "excerpt": "The night brought strong winds and the flames rapidly spread along the full length of the Circus. The fire expanded through an area of narrow, twisting streets and closely located apartment blocks.",
        "source": "Wikipedia, 'Great Fire of Rome' (drawing on Tacitus, Annals XV)",
        "href": "https://en.wikipedia.org/wiki/Great_Fire_of_Rome",
        "image": {
          "src": "/covers/oregon-wildfire-fourth-firefighter-dies--a0.png",
          "alt": "Carl Theodor von Piloty, 'Nero auf den Trümmern Roms' (Nero on the Ruins of Rome), 1861, depicting the emperor amid the burning city",
          "credit": "Carl Theodor von Piloty (1861), Lenbachhaus; Wikimedia Commons, public domain"
        }
      },
      {
        "category": "historical",
        "title": "The Great Chicago Fire (1871)",
        "excerpt": "The fire killed approximately 300 people, destroyed 17,000 structures across roughly 3.3 square miles (9 km2), and left more than 100,000 residents homeless.",
        "source": "Wikipedia, 'Great Chicago Fire'",
        "href": "https://en.wikipedia.org/wiki/Great_Chicago_Fire",
        "image": {
          "src": "/covers/oregon-wildfire-fourth-firefighter-dies--a1.png",
          "alt": "Currier & Ives lithograph 'Chicago in Flames' (1871), showing crowds fleeing across a bridge as the city burns behind them",
          "credit": "Currier & Ives (1871); Wikimedia Commons, public domain"
        }
      },
      {
        "category": "literary",
        "title": "Virgil, Aeneid, Book II — the burning of Troy (Dryden translation)",
        "excerpt": "The palace of Deiphobus ascends\nIn smoky flames, and catches on his friends.\nUcalegon burns next: the seas are bright\nWith splendour not their own, and shine with Trojan light.",
        "source": "Virgil, The Aeneid, Book II, trans. John Dryden (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/228/228-h/228-h.htm",
        "image": {
          "src": "/covers/oregon-wildfire-fourth-firefighter-dies--a2.png",
          "alt": "Painting of an ancient city consumed by fire, evoking the conflagration of Troy",
          "credit": "Hubert Robert, 'The Fire of Rome' (1785), Musée Malraux, Le Havre; Wikimedia Commons, public domain"
        }
      },
      {
        "category": "literary",
        "title": "Ovid, Metamorphoses, Book II — Phaethon sets the world ablaze (More translation)",
        "excerpt": "Great cities perish with their walls, and peopled nations are consumed to dust—the forests and the mountains are destroyed.",
        "source": "Ovid, Metamorphoses, Book II, trans. Brookes More (Perseus Digital Library)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0028:book=2",
        "image": {
          "src": "/covers/oregon-wildfire-fourth-firefighter-dies--a3.png",
          "alt": "Turner's blazing sky and flames over a city, evoking a world set on fire",
          "credit": "J.M.W. Turner (1834–35), Philadelphia Museum of Art; Wikimedia Commons, public domain"
        }
      },
      {
        "category": "artistic",
        "title": "J.M.W. Turner, 'The Burning of the Houses of Lords and Commons' (1834–35)",
        "excerpt": "Turner witnessed the Parliament fire of 16 October 1834 from the banks of the Thames and rendered it as an inferno of molten light. Flames engulf St Stephen's Hall while the reflected blaze turns the river and sky incandescent, dwarfing the crowds and firefighting boats below. The painting captures the sublime terror of a fire that outpaces every human effort to contain it.",
        "source": "J.M.W. Turner, oil on canvas, Philadelphia Museum of Art; Wikipedia article on the painting",
        "href": "https://en.wikipedia.org/wiki/The_Burning_of_the_Houses_of_Lords_and_Commons",
        "image": {
          "src": "/covers/oregon-wildfire-fourth-firefighter-dies--a4.png",
          "alt": "J.M.W. Turner, 'The Burning of the Houses of Lords and Commons, October 16, 1834', flames and glowing sky reflected on the Thames",
          "credit": "J.M.W. Turner (1834–35), Philadelphia Museum of Art; Wikimedia Commons, public domain"
        }
      },
      {
        "category": "artistic",
        "title": "Hubert Robert, 'The Fire of Rome' (1785)",
        "excerpt": "Robert stages the ancient catastrophe as a theatre of the sublime: monumental architecture looms over a canal and bridge while flames and roiling smoke devour the buildings beyond. Tiny figures scatter in panic across the steps, powerless against the advancing conflagration. The grandeur of stone is set against the terror of fire that reduces a city to ruin.",
        "source": "Hubert Robert, oil on canvas, Musée Malraux (MuMa), Le Havre; Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Hubert_Robert_-_The_Fire_of_Rome_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/oregon-wildfire-fourth-firefighter-dies--a5.png",
          "alt": "Hubert Robert, 'The Fire of Rome' (1785), figures fleeing beneath monumental architecture as flames and smoke rise behind",
          "credit": "Hubert Robert (1785), Musée Malraux, Le Havre; Wikimedia Commons, public domain"
        }
      }
    ],
    "rank": 32
  },
  {
    "slug": "ukraine-holiday-camp-attack",
    "headline": "Attack on a holiday camp in Russian-held Ukraine kills 12, officials say",
    "overview": "At least 12 people were killed in an attack on a holiday camp in the Russian-controlled part of Ukraine, officials said, with Russia blaming a Ukrainian strike. Kyiv did not immediately confirm responsibility as each side traded accusations over civilian casualties. The strike added to a mounting toll from attacks across the front.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMixAFBVV95cUxNZktqZUdSTlpXWEtjQ0xIX1dITkxTWHBEaElnTUdWbHU2RDR4ZFppeERKT1NRRTZ2aFRIbTVqRG5pZ1F3LUdKUDZSTHhjN1RFVmlxSVI4YzZEaDhXOFUyRXhLOFJzZm5pcTF1TlhMSEVLMkR1UmJNN1BQd0dTTDg0RGJlN0kxc0g5eHZfUlVLVkQ0QUJLOGstNHM4YXdtdEJOUnNXRXc5Y183Q1NNLTBMbF93SFh1MlhMU3UxRFU2MURHQXc4?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiwgFBVV95cUxNeXJ5QTJWbFFBczNEWDVtSVNpcFV4ZFlRbkZZb1lpVkx4UkViZGdRSW0tTlN1SkRvS2dRY1kzSnV1VmhuQ0VKUy05WmtBaWlIZ0tTYnpWanZ6ZVFXb0VKOUd2Ukl1bENYYXJJWUY3V080eUJzVElZUWhsZU83ZVdJQ09XYW5pbGpxVFFiT2FITW9NblFjOHVKTjhHQ0xMLWRrblAwVi1EbXhSWmpFZkxzMFNEM2dKMDVSU1JnNEtPRWhsZw?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-26",
    "image": {
      "src": "/covers/ukraine-holiday-camp-attack.png",
      "alt": "Quiet wooden cabins beside a lake at a holiday camp",
      "credit": "Chris Light, CC BY-SA 4.0, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 26 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Siege of Melos (416 BC)",
        "excerpt": "In 416 BC the Athenians besieged the small, neutral island of Melos and demanded its surrender. When the Melians refused, the Athenians put every grown man to death and sold the women and children into slavery, a fate that became antiquity's byword for the ruthless logic of the strong against the defenceless.",
        "source": "Thucydides, History of the Peloponnesian War (via Wikipedia)",
        "href": "https://en.wikipedia.org/wiki/Siege_of_Melos",
        "image": {
          "src": "/covers/ukraine-holiday-camp-attack--a0.png",
          "alt": "The Aegean island of Melos (Milos), site of the 416 BC Athenian siege",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "The Bombing of Guernica (1937)",
        "excerpt": "On 26 April 1937, on a crowded market day, German and Italian aircraft supporting Franco's Nationalists bombed the Basque town of Guernica, killing scores of civilians and destroying about three-quarters of the town. It became the twentieth century's emblem of aerial war waged against a defenceless civilian population.",
        "source": "Bombing of Guernica, Spanish Civil War (via Wikipedia)",
        "href": "https://en.wikipedia.org/wiki/Bombing_of_Guernica",
        "image": {
          "src": "/covers/ukraine-holiday-camp-attack--a1.png",
          "alt": "The ruins of Guernica after the 1937 bombing",
          "credit": "Bundesarchiv, Bild 183-H25224 / Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Euripides, The Trojan Women (trans. Gilbert Murray)",
        "excerpt": "Up from the earth, O weary head!\nThis is not Troy, about, above—\nNot Troy, nor we the lords thereof.\nThou breaking neck, be strengthenèd!",
        "source": "Euripides, The Trojan Women, translated by Gilbert Murray (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/35171/35171-h/35171-h.htm"
      },
      {
        "category": "literary",
        "title": "Wilfred Owen, \"Anthem for Doomed Youth\"",
        "excerpt": "What passing-bells for these who die as cattle?\nOnly the monstrous anger of the guns.\nOnly the stuttering rifles' rapid rattle\nCan patter out their hasty orisons.",
        "source": "Wilfred Owen, Poems (1920), Wikisource",
        "href": "https://en.wikisource.org/wiki/Poems_by_Wilfred_Owen/Anthem_for_Doomed_Youth"
      },
      {
        "category": "artistic",
        "title": "Francisco Goya, The Third of May 1808 (1814)",
        "excerpt": "Goya's canvas shows a firing squad of faceless soldiers gunning down unarmed townsfolk by lantern-light; a man in a white shirt throws his arms wide before the levelled rifles, while the bodies of those already shot lie bleeding at his feet. A local atrocity is transformed into a timeless image of ordinary people slaughtered by war.",
        "source": "Francisco Goya, The Third of May 1808, Museo del Prado",
        "href": "https://en.wikipedia.org/wiki/The_Third_of_May_1808",
        "image": {
          "src": "/covers/ukraine-holiday-camp-attack--a4.png",
          "alt": "Goya's The Third of May 1808, depicting the night-time execution of Spanish civilians",
          "credit": "Francisco Goya, 1814, Museo del Prado / Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Mozart, \"Lacrimosa\" from the Requiem in D minor (K. 626)",
        "excerpt": "Lacrimosa dies illa / Qua resurget ex favilla / Judicandus homo reus.",
        "source": "W. A. Mozart, Requiem (K. 626), \"Lacrimosa\" — left unfinished at his death in 1791 (via Wikipedia)",
        "href": "https://en.wikipedia.org/wiki/Lacrimosa_(Requiem)",
        "image": {
          "src": "/covers/ukraine-holiday-camp-attack--a5.png",
          "alt": "A page of the autograph working manuscript of Mozart's Requiem (K. 626)",
          "credit": "W. A. Mozart autograph manuscript / Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 33
  },
  {
    "slug": "ukraine-drone-strikes-russian-refineries",
    "headline": "Ukrainian drones strike a Russian oil refinery and disrupt operations in Yekaterinburg",
    "overview": "A drone strike sparked a fire at Russia's Tyumen oil refinery that was later extinguished, officials said, as Ukraine pressed its campaign against Russian energy and logistics. A separate drone threat over Yekaterinburg disrupted operations at the online retailer Wildberries and an athletics championship. The deep strikes highlight Ukraine's growing reach far behind the front line.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMisAFBVV95cUxQU0JlWmlacURnU3BGX1NNdGhGcFRPRzM5TnpsY0JQUGkxWnQ2T08zcmFWZTZKOGV3TmlRQU9xVDZ5R1VyRnk3a1g0M0E0MVZFbXQ0eE1DMXdfTGVBZFpVMTdHQVZTdnF3azk5Nk5SOTBzVWFweXRzd2dRbjJlcUVnV1BzVnJHZHI0MW9OUm4zLUkxeF9EeGtvUHhJLUdKZmwxR2s0d0VBZXE3WloxSzFBUg?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiugFBVV95cUxOVFBONThGaFFBdndNbFc1cEFaZGhXVWtKcS1jcWJLLWctZUQ5eTNWWjNnUzVvY0dIYWNuczc1dlhiZ0JCQkVROGlsQ3ZRQzB4SVpMQmliOF9qMEtORDFZVWNTc3FzT1hEZnZ1UVZfdnNsWmg2bFZzNlRWenNRdGRnV29IYzRralktWjUzVzNOLTJYSXRNLVBWZ1JCdngycXFoNW5CYk9wMUtEcUFrTVRIY1hLYThDb2ZrS0E?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-26",
    "image": {
      "src": "/covers/ukraine-drone-strikes-russian-refineries.png",
      "alt": "An oil refinery lit up with flare stacks at night",
      "credit": "Shannon Dosemagen, CC BY-SA 2.0, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 26 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Sherman's March to the Sea (1864)",
        "excerpt": "In late 1864, Union General William Tecumseh Sherman cut loose from his supply lines and drove his armies from the burning ruins of Atlanta to the sea, deliberately destroying the railroads, mills, granaries and plantations that fed and financed the Confederacy. His aim was not to defeat an army in the field but to carry the war home to the enemy's heartland and make the population feel the hard hand of war. The campaign became the archetype of striking an adversary's supply base and morale deep behind the front.",
        "source": "Wikipedia — Sherman's March to the Sea",
        "href": "https://en.wikipedia.org/wiki/Sherman%27s_March_to_the_Sea",
        "image": {
          "src": "/covers/ukraine-drone-strikes-russian-refineries--a0.png",
          "alt": "Engraving of Sherman's March to the Sea, Union troops destroying railroads and property",
          "credit": "Engraving by Alexander Hay Ritchie after F. O. C. Darley, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "historical",
        "title": "The Doolittle Raid on Tokyo (1942)",
        "excerpt": "On 18 April 1942, sixteen B-25 bombers led by Lieutenant Colonel James Doolittle lifted off from the carrier USS Hornet and struck Tokyo and other Japanese cities, the first air raid to reach the Japanese home islands. Militarily the damage was slight, but the raid shattered the illusion that the homeland was beyond reach and forced Japan to divert resources to defense. It stands as a classic instance of a small, daring force carrying fire to an enemy that believed itself safe far behind the front.",
        "source": "Wikipedia — Doolittle Raid",
        "href": "https://en.wikipedia.org/wiki/Doolittle_Raid",
        "image": {
          "src": "/covers/ukraine-drone-strikes-russian-refineries--a1.png",
          "alt": "A U.S. Army B-25 Mitchell bomber taking off from the deck of USS Hornet for the Doolittle Raid",
          "credit": "U.S. Navy photograph, 1942, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "literary",
        "title": "Homer, The Iliad, Book XVI (trans. Alexander Pope) — the fire at the Greek ships",
        "excerpt": "Divine Achilles view’d the rising flames, / And smote his thigh, and thus aloud exclaims: / “Arm, arm, Patroclus! Lo, the blaze aspires! / The glowing ocean reddens with the fires. / Arm, ere our vessels catch the spreading flame; / Arm, ere the Grecians be no more a name;”",
        "source": "Homer, The Iliad, Book XVI, translated by Alexander Pope (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/6130/pg6130.txt",
        "image": {
          "src": "/covers/ukraine-drone-strikes-russian-refineries--a2.png",
          "alt": "Jacques-Louis David, The Funeral of Patroclus (1778)",
          "credit": "Jacques-Louis David, 1778, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "literary",
        "title": "Judges 15:4–5 (King James Version) — Samson fires the Philistines' fields",
        "excerpt": "And Samson went and caught three hundred foxes, and took firebrands, and turned tail to tail, and put a firebrand in the midst between two tails. And when he had set the brands on fire, he let them go into the standing corn of the Philistines, and burnt up both the shocks, and also the standing corn, with the vineyards and olives.",
        "source": "The Holy Bible, King James Version, Judges 15:4–5 (Wikisource)",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Judges",
        "image": {
          "src": "/covers/ukraine-drone-strikes-russian-refineries--a3.png",
          "alt": "Old master engraving of Samson setting the Philistines' cornfields ablaze with firebrands tied to foxes",
          "credit": "Thesaurus sacrarum historiarum veteris testamenti series, Rijksmuseum, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "John Martin, \"The Destruction of Sodom and Gomorrah\" (1852)",
        "excerpt": "John Martin's vast canvas turns divine judgment into a spectacle of fire, as sheets of flame and blood-red light engulf the doomed cities while tiny figures flee a wall of incandescent destruction. The scale dwarfs humanity, insisting that no city is too proud or too distant to be reduced to ash. It is a vision of conflagration brought upon a people who believed themselves secure.",
        "source": "Wikipedia — The Destruction of Sodom and Gomorrah (John Martin, Laing Art Gallery)",
        "href": "https://en.wikipedia.org/wiki/The_Destruction_of_Sodom_and_Gomorrah",
        "image": {
          "src": "/covers/ukraine-drone-strikes-russian-refineries--a4.png",
          "alt": "John Martin's apocalyptic painting of Sodom and Gomorrah consumed by fire",
          "credit": "John Martin, 1852, Laing Art Gallery, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Richard Wagner, \"Ride of the Valkyries\" (Die Walküre, 1856)",
        "excerpt": "Wagner's surging brass and galloping strings conjure armored war-maidens riding through storm clouds to gather the slain, martial fury made audible. The music has become the sound of overwhelming force descending from the sky, exhilarating and dreadful at once. It captures the theme of relentless power arriving from afar to bring fire and reckoning.",
        "source": "IMSLP — Die Walküre, WWV 86B (Richard Wagner)",
        "href": "https://imslp.org/wiki/Die_Walk%C3%BCre,_WWV_86B_(Wagner,_Richard)",
        "image": {
          "src": "/covers/ukraine-drone-strikes-russian-refineries--a5.png",
          "alt": "Cesare Viazzi's painting La cavalcata delle Valchirie (The Ride of the Valkyries)",
          "credit": "Cesare Viazzi (1857–1943), via Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 34
  },
  {
    "slug": "humpback-whale-supergroups-rebound",
    "headline": "Scientists document humpback whale 'supergroups' as populations rebound from whaling",
    "overview": "Researchers documented large feeding 'supergroups' of humpback whales - including a gathering some 300 strong caught on camera - as evidence that populations are rebounding decades after commercial whaling. Scientists cautioned that the Iran war and related disruptions could pose new dangers to the animals. The findings offer a rare conservation success story amid mounting ocean threats.",
    "genre": "Science",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMipgFBVV95cUxOZ01jenB2Z29iYVlCdWFzRENLRHhCVm9MNEYtN1NpMlo5M1p3UGZQbmNLc0loUzdId2tEUnluaXNYOTMxSkdpUzhaeG9Fa1NYS3hyMG5VMUh0MDNtS0VWRW5PSVl6ckdTYXVHcjU0MEUzbFdMNjlsM2NVcUN3VjBVRHQ5WUp6MXpPbW9VaURzYWw3bktCU2JyYzV0UERyWTUzOUdOalhR?oc=5"
      },
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMiywFBVV95cUxQY1ZVSG5VeDVkYWpsYU9VdzU1RGxUVEE5TFZxVVlqYlpDcTZhTUtoMnlvMmVubHY4by0xOWhJUkJhRTVRT3A5bmtKakZjRW1ZejhTQlUxenB2VU5ueG5IUDl2QmNQWkozN2JPLTZEcFlveFd1VEtUc3lJSzBqdVU2TUVNWU9BdW1DWV81bEl0S0l0SUdRUFV2TW50Zl9ROWs4bFZwME02b2tOYlRNTzFHaXkxTEZxaFZqMmstMHV3blZ2RlJTNnd3WnZkdw?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-26",
    "image": {
      "src": "/covers/humpback-whale-supergroups-rebound.png",
      "alt": "A humpback whale breaching out of the ocean surface",
      "credit": "Giles Laurent, CC BY-SA 4.0, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 26 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The whaleship Essex, rammed and sunk by a sperm whale (1820)",
        "excerpt": "On 20 November 1820, the Nantucket whaleship Essex was stove in and sunk in the South Pacific by an enraged bull sperm whale estimated at some 85 feet long, which rammed the 238-ton vessel twice before it capsized. Twenty men escaped in three small whaleboats, but months of starvation at sea drove the survivors to cannibalism, and only eight lived to be rescued. Their ordeal, at the height of America's whaling age, later helped inspire Melville's Moby-Dick.",
        "source": "Wikipedia: Essex (whaleship)",
        "href": "https://en.wikipedia.org/wiki/Essex_(whaleship)",
        "image": {
          "src": "/covers/humpback-whale-supergroups-rebound--a0.png",
          "alt": "Engraving of a whale destroying a whaleboat, hurling harpooners into the sea",
          "credit": "\"Boat Struck by a Whale,\" 19th-century whaling engraving, public domain via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "The 1986 international moratorium on commercial whaling",
        "excerpt": "After centuries of industrial hunting had driven many great whales to the brink of extinction, the International Whaling Commission adopted a global moratorium on commercial whaling that took effect in 1986. The pause slashed the annual kill from nearly 15,000 whales in 1980 to a few hundred, and gave depleted populations, including humpbacks, the breathing room to begin recovering. It remains one of the signal conservation successes of the modern era, though Japan, Norway and Iceland continued to hunt.",
        "source": "Wikipedia: International Whaling Commission",
        "href": "https://en.wikipedia.org/wiki/International_Whaling_Commission",
        "image": {
          "src": "/covers/humpback-whale-supergroups-rebound--a1.png",
          "alt": "Currier and Ives lithograph of whaleboats closing in on a spouting whale",
          "credit": "Nathaniel Currier, \"The Whale Fishery: 'Laying On',\" public domain via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Herman Melville, Moby-Dick; or, The Whale (1851)",
        "excerpt": "By reason of these things, then, the whaling voyage was welcome; the great flood-gates of the wonder-world swung open, and in the wild conceits that swayed me to my purpose, two and two there floated into my inmost soul, endless processions of the whale, and, midmost of them all, one grand hooded phantom, like a snow hill in the air.",
        "source": "Herman Melville, Moby-Dick; or, The Whale (1851), Chapter 1 'Loomings', Project Gutenberg",
        "href": "https://www.gutenberg.org/files/2701/2701-h/2701-h.htm",
        "image": {
          "src": "/covers/humpback-whale-supergroups-rebound--a2.png",
          "alt": "Whaleboats rowing onto a whale amid spouting spray",
          "credit": "Nathaniel Currier, \"The Whale Fishery: 'Laying On',\" public domain via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "The Book of Job 41: Leviathan (King James Version)",
        "excerpt": "Canst thou draw out leviathan with an hook? or his tongue with a cord which thou lettest down? ... He maketh the deep to boil like a pot: he maketh the sea like a pot of ointment. He maketh a path to shine after him; one would think the deep to be hoary. ... He beholdeth all high things: he is a king over all the children of pride.",
        "source": "The Book of Job, chapter 41 (King James Version)",
        "href": "https://biblehub.com/kjv/job/41.htm",
        "image": {
          "src": "/covers/humpback-whale-supergroups-rebound--a3.png",
          "alt": "Gustave Dore engraving of a divine figure confronting the coiling sea-monster Leviathan in stormy waters",
          "credit": "Gustave Dore, \"The Destruction of Leviathan\" (1865), public domain via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Utagawa Kuniyoshi, Miyamoto Musashi Attacking the Giant Whale (c. 1847)",
        "excerpt": "In this dramatic ukiyo-e woodblock triptych, the celebrated swordsman Miyamoto Musashi stands astride the back of an enormous whale off the coast of Hizen, plunging his sword into the beast as white-flecked waves churn around them. Kuniyoshi renders the leviathan's vast, shaded body through the itabokashi abrasion technique, dwarfing the tiny human figure. The print turns a legendary feat of valor into an image of humanity's awe before, and struggle against, the giants of the deep.",
        "source": "Utagawa Kuniyoshi, ukiyo-e woodblock triptych, c. 1847",
        "href": "https://commons.wikimedia.org/wiki/File:Miyamoto-Musashi-Attacking-Giant-Whale-Utagawa-Kuniyoshi.png",
        "image": {
          "src": "/covers/humpback-whale-supergroups-rebound--a4.png",
          "alt": "Ukiyo-e print of Miyamoto Musashi standing on a giant whale and stabbing it amid churning waves",
          "credit": "Utagawa Kuniyoshi (c. 1847), public domain via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Claude Debussy, La Mer (1905)",
        "excerpt": "Debussy's three symphonic sketches conjure the sea in sound: shifting light on water at dawn, the restless play of the waves, and the surging dialogue of wind and ocean. Shimmering strings and swelling brass evoke a vast, living immensity, an aural counterpart to the humpback's watery realm. For its 1905 first edition, the publisher chose a detail of Hokusai's Great Wave as the cover, binding the music forever to the ocean's grandeur.",
        "source": "Claude Debussy, La Mer, three symphonic sketches (1905), score at IMSLP",
        "href": "https://imslp.org/wiki/La_mer_(Debussy,_Claude)",
        "image": {
          "src": "/covers/humpback-whale-supergroups-rebound--a5.png",
          "alt": "Hokusai's Great Wave off Kanagawa as reproduced on the 1905 cover of Debussy's La Mer",
          "credit": "Katsushika Hokusai, \"The Great Wave off Kanagawa,\" used on the 1905 La Mer cover, public domain via Wikimedia Commons"
        }
      }
    ],
    "rank": 35
  },
  {
    "slug": "chinese-ai-models-us-inroads",
    "headline": "Cheaper, open Chinese AI models gain ground and make inroads in the US",
    "overview": "Chinese-built AI models are gaining ground with cheaper, more open systems that are winning users inside the United States, according to industry analyses. The advances are pressuring American labs even as one leading Chinese developer, DeepSeek, told investors it was pausing a large fundraising round. The shift is reshaping the global race to build and deploy artificial intelligence.",
    "genre": "Technology",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMilgFBVV95cUxQdm5uUXhNOEcyUXB6LWVpNDJ3UkJZclpja1ctcFdYclhjenJISmRRZGZTT2hoTDFXa2NuQlVzdGRRYmJWTWRCelg1M3hzWnR4WjBRZThDNjRmckw5c2paZU9pZ282ZVJXeTR6SWxhSG9qdkFUdlkyWUdZRDNPVUVBZGthbExxWThEdW5DWEk1NmJCQUJzT0E?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMivgFBVV95cUxPWExVWVlHMlpBUVQxbV9rU1NVZ0w2LVlSbVk0RjBtS0dtRjc4TW85M3hGT3hscVdkb3J6ZHhIU1NWMEJ2RGlhdXQwdkQ2cHVYN2RpN2Z4THlfZ3NlREhaa2dhNERLU0xKRENLbTgySE1CalYtdTV3VmFOR2g0SkNtaE9pV3RTdWJRSDNWS092dnFUcExFa0ZhRnBtNjhweXJ4TWhLSUFVVUk5WU14bWNvd2NpNHdOWk1BVklxTmxB?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-26",
    "image": {
      "src": "/covers/chinese-ai-models-us-inroads.png",
      "alt": "Close-up of a computer circuit board with chips and components",
      "credit": "Harland Quarrington/MOD, OGL v1.0, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 26 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Sputnik Crisis (1957)",
        "excerpt": "When the Soviet Union lofted the beeping, basketball-sized Sputnik 1 into orbit on October 4, 1957, Americans who had taken their technological supremacy for granted were stunned into what Eisenhower called a wave of near-hysteria. A rival that was assumed to be behind had suddenly leapt ahead, and the shock reverberated through defense, education, and national pride. The panic galvanized the country, spurring the creation of NASA and a full-throttle space race almost overnight.",
        "source": "Wikipedia — Sputnik crisis",
        "href": "https://en.wikipedia.org/wiki/Sputnik_crisis",
        "image": {
          "src": "/covers/chinese-ai-models-us-inroads--a0.png",
          "alt": "Replica of Sputnik 1, the first artificial satellite, at the National Air and Space Museum",
          "credit": "NASA, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "China's Four Great Inventions Spread West",
        "excerpt": "Papermaking, printing, gunpowder, and the compass were perfected in China centuries before Europe possessed them, then seeped westward along trade and conquest routes through the Islamic world. By the time these tools reached European hands, they upended the old order: gunpowder toppled castle walls, the compass opened the oceans, and cheap paper and printing put knowledge within reach of the many. A technology born in one civilization became the engine of a rival's ascent, a diffusion that redrew the balance of power.",
        "source": "Wikipedia — Four Great Inventions",
        "href": "https://en.wikipedia.org/wiki/Four_Great_Inventions",
        "image": {
          "src": "/covers/chinese-ai-models-us-inroads--a1.png",
          "alt": "Frontispiece of the Diamond Sutra (868 CE), the earliest dated printed book, produced in China",
          "credit": "British Library, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Aeschylus, Prometheus Bound",
        "excerpt": "Yes, and numbers, too, chiefest of sciences, I invented for them, and the combining of letters, creative mother of the Muses' arts, with which to hold all things in memory.",
        "source": "Aeschylus, Prometheus Bound, trans. Herbert Weir Smyth — Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0010:card=436",
        "image": {
          "src": "/covers/chinese-ai-models-us-inroads--a2.png",
          "alt": "Peter Paul Rubens, Prometheus Bound (c. 1611–1618), Philadelphia Museum of Art",
          "credit": "Peter Paul Rubens, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "The Tower of Babel (Genesis 11, King James Version)",
        "excerpt": "And they said, Go to, let us build us a city and a tower, whose top may reach unto heaven; and let us make us a name, lest we be scattered abroad upon the face of the whole earth. ... And the LORD said, Behold, the people is one, and they have all one language; and this they begin to do: and now nothing will be restrained from them, which they have imagined to do. Go to, let us go down, and there confound their language, that they may not understand one another's speech.",
        "source": "Genesis 11:4, 6-7, King James Version",
        "href": "https://biblehub.com/kjv/genesis/11.htm",
        "image": {
          "src": "/covers/chinese-ai-models-us-inroads--a3.png",
          "alt": "Pieter Bruegel the Elder, The Tower of Babel (1563), Kunsthistorisches Museum, Vienna",
          "credit": "Pieter Bruegel the Elder, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Heinrich Füger, Prometheus Brings Fire to Mankind (1817)",
        "excerpt": "In Heinrich Füger's luminous canvas, the Titan Prometheus leans toward a huddle of newly made mortals and touches a torch to kindle the first human flame. Light spills from his hand into the darkness, a visual hymn to the moment a guarded power passes from the gods to ordinary people. The painting frames the gift of fire as the gift of knowledge itself, radiant, irreversible, and destined to remake the world of those who receive it.",
        "source": "Heinrich Füger, oil painting, Liechtenstein collection",
        "href": "https://commons.wikimedia.org/wiki/File:Heinrich_fueger_1817_prometheus_brings_fire_to_mankind.jpg",
        "image": {
          "src": "/covers/chinese-ai-models-us-inroads--a4.png",
          "alt": "Heinrich Füger, Prometheus Brings Fire to Mankind (1817), Prometheus kindling fire for mortals",
          "credit": "Heinrich Füger, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Paul Dukas, The Sorcerer's Apprentice (1897)",
        "excerpt": "Paul Dukas's symphonic poem L'apprenti sorcier, based on Goethe's ballad, sets to music the parable of a novice who seizes his master's spell and unleashes a force he cannot command. The bewitched broom marches on and multiplies, its relentless, quickening motif building toward chaos as the apprentice discovers that a powerful tool, once released, obeys no one. It is a vivid musical warning about wielding capabilities faster than one can control them.",
        "source": "Paul Dukas, L'apprenti sorcier (symphonic poem, 1897) — IMSLP",
        "href": "https://imslp.org/wiki/L'apprenti_sorcier_(Dukas,_Paul)",
        "image": {
          "src": "/covers/chinese-ai-models-us-inroads--a5.png",
          "alt": "Ferdinand Barth's 1882 illustration of Goethe's Der Zauberlehrling (The Sorcerer's Apprentice)",
          "credit": "Ferdinand Barth (1882), public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 36
  },
  {
    "slug": "us-iran-airstrikes-pause-talks",
    "headline": "US airstrikes on Iran pause as indirect talks press forward",
    "overview": "US airstrikes inside Iran paused as diplomats pressed forward with indirect talks aimed at ending the confrontation, officials said, with the Gulf quiet after Washington held off on further strikes. The fighting had spread to the Red Sea and Caspian even as both sides weighed an off-ramp. It remained unclear whether Washington and Tehran could seize the opening to de-escalate.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMimgFBVV95cUxQNDJld2dfWkJobEFGdjZJaUQ0LThjRlJfcDFXSVc4dEwxMjhmeVB4QVVqcFVTV3B3RGRFV2NHWmpQdWsyVEx6ckxOdWVXcXcyRmpuejVER2R2alBhTEIyRlhGaHkyUXRQSjNKQ1kySDR4dHZvdm9LTWxMMXZUZ3p1ZUJqOE1WS1VNYlpKalF0NWdsVTdWZ3c0ZGRB?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiuAFBVV95cUxPYnVSWlhuMFM5LW94bUxZY2tSeDlTX3p1RC1yNk10aVJobG02aVpFeGc3bFowLVZIT01sQk5yekpRWHNUYmhiS3gxSmJTbF9YU2hROXlmQ3hSMVFvaVpDZlhuUXp6N0d4c2lERjlra2NFeXp6Y1Uwd3M2U3prWUp2LTNvMG5Zd05laVktTmJXaXFTNnp4V3U2RkUwV0FNM04yc0dsQWZKc1BtOFk2aDFKQlUwc21pdW9k?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-26",
    "image": {
      "src": "/covers/us-iran-airstrikes-pause-talks.png",
      "alt": "Delegations seated around a table during Iran diplomatic talks",
      "credit": "Omid Vahabzadeh, CC BY 4.0, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 26 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Peace of Nicias (421 BC)",
        "excerpt": "After ten years of exhausting war between Athens and Sparta, the Athenian general Nicias brokered a truce meant to halt the killing and restore what had been seized. Sworn to last fifty years, the peace instead proved brittle, honored only in part and unraveling within a few uneasy seasons. It stands as an early lesson that pausing a war is far simpler than making a lasting peace.",
        "source": "Wikipedia — Peace of Nicias (from Thucydides, History of the Peloponnesian War)",
        "href": "https://en.wikipedia.org/wiki/Peace_of_Nicias",
        "image": {
          "src": "/covers/us-iran-airstrikes-pause-talks--a0.png",
          "alt": "Roman marble bust of the historian Thucydides, who chronicled the Peace of Nicias",
          "credit": "Bust of Thucydides, Royal Ontario Museum; photo via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "historical",
        "title": "The Cuban Missile Crisis Back-Channel (1962)",
        "excerpt": "With the United States and the Soviet Union at the brink of nuclear war, the decisive moves came not on the battlefield but through quiet intermediaries. A back-channel ran between a Soviet embassy officer and an ABC reporter, while Robert Kennedy met privately with Ambassador Dobrynin to shape a face-saving off-ramp. The public ultimatum was cooled by private bargaining, and both sides stepped back from the edge.",
        "source": "Wikipedia — Cuban Missile Crisis",
        "href": "https://en.wikipedia.org/wiki/Cuban_Missile_Crisis",
        "image": {
          "src": "/covers/us-iran-airstrikes-pause-talks--a1.png",
          "alt": "President Kennedy meets with the Executive Committee during the Cuban Missile Crisis, 29 October 1962",
          "credit": "Cecil Stoughton, White House / National Archives, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "literary",
        "title": "Homer, The Iliad, Book XXIV (Priam and Achilles)",
        "excerpt": "And now tell me and tell me true, for how many days would you celebrate the funeral rites of noble Hector? Tell me, that I may hold aloof from war and restrain the host.",
        "source": "Homer, The Iliad, Book XXIV, translated by Samuel Butler",
        "href": "https://classics.mit.edu/Homer/iliad.24.xxiv.html"
      },
      {
        "category": "literary",
        "title": "Isaiah 2:4 (King James Version)",
        "excerpt": "And he shall judge among the nations, and shall rebuke many people: and they shall beat their swords into plowshares, and their spears into pruninghooks: nation shall not lift up sword against nation, neither shall they learn war any more.",
        "source": "The Holy Bible, King James Version, Isaiah 2:4",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Isaiah"
      },
      {
        "category": "artistic",
        "title": "Peter Paul Rubens, \"Minerva Protects Pax from Mars (Peace and War)\" (c. 1629-30)",
        "excerpt": "Rubens painted this allegory during a diplomatic mission to broker peace between Spain and England. At its center Peace nurses a child amid abundance, while the helmeted goddess Minerva thrusts back the armored war-god Mars and the Fury he brings. The canvas is a plea in paint for the fruits of reconciliation over the ruin of conflict.",
        "source": "Peter Paul Rubens, \"Minerva Protects Pax from Mars (Peace and War),\" National Gallery, London",
        "href": "https://commons.wikimedia.org/wiki/File:Peter_Paul_Rubens_(1577-1640)_Peace_and_War_(1629).jpg",
        "image": {
          "src": "/covers/us-iran-airstrikes-pause-talks--a4.png",
          "alt": "Rubens's allegory Peace and War: Minerva drives back Mars while Peace nourishes a child amid figures of plenty",
          "credit": "Peter Paul Rubens, National Gallery, London; image via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Ludwig van Beethoven, Symphony No. 9 \"Ode to Joy\" (1824)",
        "excerpt": "In the choral finale of his last symphony, Beethoven set Schiller's hymn to a world made one, where all people become brothers under a benevolent heaven. Rising from a stormy, fractured opening into a surging anthem of unity, the movement has become the enduring soundtrack of reconciliation after strife. It sounds the hope that even bitter enemies might yet join in a single chorus.",
        "source": "Ludwig van Beethoven, Symphony No. 9 in D minor, Op. 125 (\"Choral\"), finale on Schiller's \"Ode to Joy\"",
        "href": "https://imslp.org/wiki/Symphony_No.9,_Op.125_(Beethoven,_Ludwig_van)",
        "image": {
          "src": "/covers/us-iran-airstrikes-pause-talks--a5.png",
          "alt": "Joseph Karl Stieler's 1820 portrait of Ludwig van Beethoven holding a manuscript",
          "credit": "Joseph Karl Stieler, 1820; via Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 37
  },
  {
    "slug": "brazil-denies-us-official-visas",
    "headline": "Brazil denies visas to US officials ahead of its elections",
    "overview": "Brazil's government denied visa requests from US officials tied to the country's upcoming elections, officials said, in a pointed diplomatic rebuff to Washington. Brazilian authorities cast the move as protecting the integrity of its vote. The decision sharpened tensions between Brasilia and the Trump administration.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMinwFBVV95cUxNOERMYjhmR2VIUUtiVF9uZE1tUjdFMHZ3SUlKS2taYWhHSkJMLVBZZEg4NkxtRFJORk5qaFhsbjRaY2xMemQ4NXIxU1hXbkxMTDN0WU1IaGU3TnUwTDlqM1Z6U0Zqem8wVWJ1dkFxTko0MjFSQ2pMV05LY2taZEktaG8wazVrbldzcExqWkNXM29FOVZXM2NFS2Y0S2M5cGM?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMitwFBVV95cUxPcFVGYU1LZGlpcDFxdUZsdEhGVVhaX2w4eXlnbmZvN2FJdXUwM2wySWxaMWhvVEZzRUFWWkdkc0JxajBsbkFId3hBRTVsX2VJRkRJX2JKRXFUajNja05FSUFjUWFuaXlLcmZtbXgtUkt0MDFiREdySVotemhGWm1BNmxEU2ZZOWc2S09fYUEyMzlZbXVleVZBaHZOdlZ3RDBIdGJhY0ttYTllUkZzVlYtMTFmeUN2MDA?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-26",
    "image": {
      "src": "/covers/brazil-denies-us-official-visas.png",
      "alt": "The Itamaraty Palace, seat of Brazil's Foreign Ministry, in Brasilia",
      "credit": "Lou Fernando, CC BY-SA 4.0, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 26 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Sparta's Xenelasia: Lycurgus Expels the Foreigners",
        "excerpt": "Nay more, he actually drove away from the city the multitudes which streamed in there for no useful purpose.",
        "source": "Plutarch, Life of Lycurgus (Bernadotte Perrin translation), Perseus Digital Library",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A2008.01.0047%3Achapter%3D27"
      },
      {
        "category": "historical",
        "title": "The Monroe Doctrine Warns Europe Off the Americas (1823)",
        "excerpt": "the American continents, by the free and independent condition which they have assumed and maintain, are henceforth not to be considered as subjects for future colonization by any European powers.",
        "source": "President James Monroe, Seventh Annual Message to Congress, December 2, 1823 (Wikisource)",
        "href": "https://en.wikisource.org/wiki/James_Monroe%27s_Seventh_State_of_the_Union_Address"
      },
      {
        "category": "literary",
        "title": "Antigone Defies a Ruler's Decree, Sophocles",
        "excerpt": "Yes, since it was not Zeus that published me that edict, and since not of that kind are the laws which Justice who dwells with the gods below established among men. Nor did I think that your decrees were of such force, that a mortal could override the unwritten and unfailing statutes given us by the gods.",
        "source": "Sophocles, Antigone (R. C. Jebb translation), Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0186:card=441"
      },
      {
        "category": "literary",
        "title": "'This sceptred isle': England's Sovereign Fortress, Shakespeare",
        "excerpt": "This royal throne of kings, this sceptred isle, / This earth of majesty, this seat of Mars, / This other Eden, demi-paradise, / This fortress built by Nature for her self / Against infection and the hand of war, / This happy breed of men, this little world, / This precious stone set in a silver sea / Which serves it in the office of a wall / Or as a moat defensive to a house, / Against the envy of less happier lands",
        "source": "William Shakespeare, Richard II, Act II, Scene 1 (John of Gaunt's speech), Representative Poetry Online, University of Toronto",
        "href": "https://rpo.library.utoronto.ca/content/richard-ii-excerpts-royal-throne-kings-sceptred-isle"
      },
      {
        "category": "artistic",
        "title": "Pedro Américo, 'Independência ou Morte' (1888)",
        "excerpt": "Pedro Américo's vast canvas freezes the Cry of Ipiranga: Dom Pedro rises in his stirrups, sword flashing skyward, as his mounted guard wheels to echo the cry for independence. Peasants and an ox-cart look on from the roadside, dwarfed by the sweep of a nation choosing to belong to no one but itself. It is Brazil's founding gesture of sovereignty rendered as pure defiant spectacle.",
        "source": "Pedro Américo, Independência ou Morte (Cry of Ipiranga), 1888, Museu Paulista — Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Pedro_Am%C3%A9rico_-_Independ%C3%AAncia_ou_Morte_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/brazil-denies-us-official-visas--a4.png",
          "alt": "Dom Pedro I raising his sword amid mounted soldiers, proclaiming Brazil's independence beside the Ipiranga brook",
          "credit": "Pedro Américo, 1888, Museu Paulista; public domain via Wikimedia Commons (Google Art Project)"
        }
      },
      {
        "category": "artistic",
        "title": "Jean Sibelius, 'Finlandia' (1899)",
        "excerpt": "Sibelius composed Finlandia as a veiled protest against Russian censorship of the Finnish press, disguising defiance as a concert tableau to slip past the imperial authorities. The tone poem storms from brass-heavy menace into a serene, hymn-like anthem that became the sound of a small nation asserting its identity against a great power. Banned under Russian rule, it survived as a rallying cry for sovereignty and self-determination.",
        "source": "Jean Sibelius, Finlandia, Op. 26 (1899), IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Finlandia,_Op.26_(Sibelius,_Jean)",
        "image": {
          "src": "/covers/brazil-denies-us-official-visas--a5.png",
          "alt": "Photographic portrait of Finnish composer Jean Sibelius, circa 1898-1900",
          "credit": "Photograph by Daniel Nyblin, c. 1900, Finnish Heritage Agency; public domain via Wikimedia Commons"
        }
      }
    ],
    "rank": 38
  },
  {
    "slug": "kyiv-overnight-russian-strikes",
    "headline": "Overnight Russian attacks trigger fires in Kyiv as strikes kill at least 15 across Ukraine",
    "overview": "An overnight Russian attack triggered fires in the Ukrainian capital, Kyiv, officials said, part of a wave of strikes that killed at least 15 people across the country. Emergency crews battled blazes and searched damaged buildings as air-raid alerts sounded. The barrage marked another grim night in the war.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMisAFBVV95cUxPcXdzREJ5ZV91eFBnWDdFcUI3SHhaSFZnMm9abVlaTjBJcEtfUzVJZEJvRUprZ1gzRHduWVVRN2tTZ0E3WnZzb1RJaW9qenhpRW9nRHVtN3U5RHV2N1JqTEJacGJLWHFSZXIwVlk4VV9Bc2JfN2pBaXFIM3VSRW8tZHpEb3R0QVluOFpxUDVweThnd2pieDRjTzdpZW9DRXNFZnZwSFpONFZDTjNGMUtVUg?oc=5"
      },
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMinwFBVV95cUxNaldIRnowMFFmQm9kaFJnWEYwZTJJWDNiYnAxaVlVMzhNa1FKeWZiaWMzbDhJTHJiWWFDbGpHTDRCNnRjU3RUeEpRWGY3ZHo1VEtxU3A3b29Yb0doRjV1Qmk4Tkp6NWZWRjlReGxmajdoZVcwTzF3WC1DS0NfUVl2ZW1sX3U2Y0xQQS1PLVlVX3dySFpvdlIxVXlxWTYyb28?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-26",
    "image": {
      "src": "/covers/kyiv-overnight-russian-strikes.png",
      "alt": "War damage in Kyiv following a Russian strike",
      "credit": "National Police of Ukraine, CC BY 4.0, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 26 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Blitz: London under the night bombers, 1940-41",
        "excerpt": "For 57 nights from September 1940 the Luftwaffe bombed London almost without pause, and the raids soon spread to other British cities. Some 40,000 to 43,000 civilians were killed and more than a million London homes damaged or destroyed as incendiaries set the capital ablaze and firemen fought the flames through the dark. Night after night ordinary people sheltered in Underground stations and Anderson shelters, and the endurance of a capital under fire became a defining image of the war.",
        "source": "Wikipedia - The Blitz",
        "href": "https://en.wikipedia.org/wiki/The_Blitz",
        "image": {
          "src": "/covers/kyiv-overnight-russian-strikes--a0.png",
          "alt": "A German Heinkel He 111 bomber over the burning docks of Wapping, East London, on the evening of 7 September 1940",
          "credit": "German Luftwaffe photograph, 7 September 1940 (public domain), via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "The Gauls sack and burn Rome, 390 BCE",
        "excerpt": "After routing the Roman army at the River Allia, the Gauls under Brennus marched into a largely undefended Rome and gave the city over to pillage and fire; Livy describes how the houses were rifled and then set alight. The defenders withdrew to the Capitoline Hill, holding out through a long siege while flames consumed the streets below, until the Senones finally accepted a ransom and departed. It became the archetype of a great city put to the torch, remembered by Romans for centuries as their darkest night.",
        "source": "Wikipedia - Battle of the Allia",
        "href": "https://en.wikipedia.org/wiki/Battle_of_the_Allia",
        "image": {
          "src": "/covers/kyiv-overnight-russian-strikes--a1.png",
          "alt": "Paul Jamin's 1893 painting Le Brenn et sa part de butin, depicting the Gaulish chief Brennus amid the spoils of a sacked Rome",
          "credit": "Paul Jamin, 'Le Brenn et sa part de butin' (1893), public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Virgil, Aeneid, Book II - the fall of Troy by night",
        "excerpt": "Troy is no more, and Ilium was a town!\nThe fatal day, th' appointed hour, is come,\nWhen wrathful Jove's irrevocable doom\nTransfers the Trojan state to Grecian hands.\nThe fire consumes the town, the foe commands;\nAnd armed hosts, an unexpected force,\nBreak from the bowels of the fatal horse.",
        "source": "Virgil, Aeneid, Book II (trans. John Dryden), Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/228/pg228.txt",
        "image": {
          "src": "/covers/kyiv-overnight-russian-strikes--a2.png",
          "alt": "Johann Georg Trautmann's oil painting of Troy burning at night, flames rising above the doomed city",
          "credit": "Johann Georg Trautmann, 'Das brennende Troja' (c. 1759-62), public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "The Book of Lamentations - a city that weeps in the night",
        "excerpt": "How doth the city sit solitary, that was full of people! how is she become as a widow! She weepeth sore in the night, and her tears are on her cheeks: among all her lovers she hath none to comfort her.",
        "source": "The Book of Lamentations 1:1-2 (King James Version), Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Lamentations",
        "image": {
          "src": "/covers/kyiv-overnight-russian-strikes--a3.png",
          "alt": "David Roberts's painting of Jerusalem in flames during the Roman siege of AD 70",
          "credit": "David Roberts, 'The Siege and Destruction of Jerusalem by the Romans Under the Command of Titus, A.D. 70' (1850), public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "John Martin, 'The Fall of Nineveh' (1828)",
        "excerpt": "John Martin's vast, apocalyptic canvas shows the ancient capital of Nineveh collapsing in a single catastrophic night, its palaces and temples engulfed as fire rains from a convulsed sky. Tiny human figures scatter and cower along the riverbank while the doomed king prepares his own funeral pyre, dwarfed by the scale of the burning city. It is one of the great images of a metropolis consumed by fire, terror and the sublime spectacle of destruction from above.",
        "source": "John Martin, 'The Fall of Nineveh' (1828), Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Fall_of_nineveh.jpg",
        "image": {
          "src": "/covers/kyiv-overnight-russian-strikes--a4.png",
          "alt": "John Martin's The Fall of Nineveh, the ancient city ablaze beneath a stormy sky as its people flee",
          "credit": "John Martin, 'The Fall of Nineveh' (1828), public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Shostakovich, Symphony No. 7 'Leningrad' (1941)",
        "excerpt": "Dmitri Shostakovich began his Seventh Symphony in Leningrad in 1941 as German forces closed in and bombs fell on the city, and he dedicated the work to the besieged capital of the north. Its relentless, grinding invasion theme builds through mechanical repetition into a portrait of a city under siege, before the music turns toward grief and hard-won endurance. Performed by starving musicians during the blockade in August 1942 and broadcast over loudspeakers toward the German lines, it became a sounding symbol of a bombarded city that refused to fall.",
        "source": "Dmitri Shostakovich, Symphony No. 7 in C major, Op. 60 'Leningrad' (1941) - Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Symphony_No._7_(Shostakovich)",
        "image": {
          "src": "/covers/kyiv-overnight-russian-strikes--a5.png",
          "alt": "Photographic portrait of the composer Dmitri Shostakovich",
          "credit": "Photo by Roger & Renate Rossing, 1950, Deutsche Fotothek, via Wikimedia Commons (CC BY-SA 3.0 DE)"
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
