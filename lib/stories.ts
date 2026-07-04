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
// the Evening Edition of 2 July 2026 (ranks 1-13) leads with its hero story,
// followed by the Afternoon Edition and the Morning Edition of 2 July 2026.
// Stories are selected from the live RSS feeds in `lib/feeds.ts`. The analogies are
// the heart of each story: six per event, two per category, each linking to a real
// human-written source (a primary text, museum object page, or archive). Excerpts
// quote the most relevant passage verbatim where the source is public domain, and
// otherwise describe rather than quote. Covers are dithered local copies: feed or
// rights-clean Wikimedia art/photos credited to the source, otherwise an
// AI-generated illustration (credit "AI-generated"). Every analogy carries its own
// image too — a rights-clean visual of its subject (the artwork itself, a manuscript
// page, a portrait, a title page; never AI-generated), dithered via
// scripts/dither-art.ts to /covers/<slug>--historical-1|2, --literary-1|2, --music,
// --art. Omit only when nothing rights-clean exists; the home hero crossfades to
// these on hover. Source links to AP/Reuters are Google News redirects (see
// `lib/feeds.ts`).
const stories: Story[] = [
  {
    "slug": "us-july4-record-heat-america-250",
    "headline": "Record heat strains US power grids and disrupts Fourth of July events as 'America 250' celebrations begin",
    "overview": "A punishing heat dome pushed temperatures to dangerous highs across much of the United States on Saturday, straining electricity grids and forcing the closure or cancellation of Independence Day events even as the country opened its 250th-anniversary celebrations. President Donald Trump traveled to Mount Rushmore for a holiday address. Forecasters warned the extreme heat would persist through the July Fourth weekend.",
    "genre": "Climate",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMioAFBVV95cUxPblE3V2g1dE5UeTNfUkdDanpSbTdrbktXdjhDUUg5eXhycWtsSEFPcmpLOFZBMDd3ZzJwTFF3MkN5VGVROWhwd1ZTZjZ1OVVYdnZ0Sy10RlhzOVQ3WG5UV2x2Z2tTRHpFVXhpaTl1UWY1NXZrTUJPU3BVV04yTUdtdEpYbURxMkEyVXllMzlDWkpzamR6WXdDd3FFQ2FsYmth?oc=5"
      },
      {
        "name": "South China Morning Post",
        "href": "https://news.google.com/rss/articles/CBMizgFBVV95cUxOZHhSNy10NWUzeU5fNGp6bDZqLWYxUF92SzdZcmJLREdwYzE0TV9TRy1YYXJzaVNtX2JlRXhCMzNGSEZHNWw2STFMRzdiaDZXeFBjVm84Z0syRzZDbUczTVdGUmJ1X3RqWEJESTJPandwMGtjRUktZUM5dHg2QkFVbHUwNlBwQjlMU0RScWRZQ3BVbUhkVTRCV0J4ZUppS1VIWVVJb3J2aUo1YnhIWVpQa09pd1E3YjhFLXhzZFFsSmxDbmlBQW5jejlWZGJSd9IBzgFBVV95cUxOSXc4T2NhLUZETmwxcUJDY0dmeEJaWDZnTTdBbzdzSXVFeFk4eFdGR1E5OXJsWjVwaTVMSW9CN1VkMGh4WElrNDhnYmd3RUpseV9fT0JRVzJuV0F0MDZfdk45bmJhTnU4cnNra20taDJWYjF4TDJOZGlQaXJzQ0xrX3otWTNIdVBwbXVySHJMdmZMVE1aWEdDeGJmVXgwVmY0clhJSFlpdjhzZFpDM1hhUEIzeE0xOFVWbWhxc1BBRGt0Q1pYVDR5Z1dGTk1lUQ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-04",
    "image": {
      "src": "/covers/us-july4-record-heat-america-250.png",
      "alt": "A sun-scorched, deserted American town square at noon under a white-hot sky, heat shimmering above empty streets.",
      "credit": "AI-generated"
    },
    "lead": true,
    "edition": "Morning Edition · 4 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Fireside Chat on Drought Conditions, Franklin D. Roosevelt (1936) — a US president tours states seared by heat and failed crops, prefiguring today's heat dome bearing down on the nation",
        "href": "https://en.wikisource.org/wiki/Roosevelt's_Fireside_Chat,_6_September_1936",
        "excerpt": "I saw drought devastation in nine States. … I shall never forget the fields of wheat so blasted by heat that they cannot be harvested. … I saw brown pastures which would not keep a cow on fifty acres.",
        "source": "Wikisource"
      },
      {
        "category": "historical",
        "title": "History of the Peloponnesian War — the Plague of Athens, Thucydides (c. 430 BC) — a great power struck at the height of its glory by burning fever and unquenchable thirst, adversity falling on a civilization mid-celebration",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0247:book=2:chapter=49",
        "excerpt": "they were taken first with an extreme ache in their heads, redness and inflammation of the eyes … Many of them that were not looked to, possessed with insatiate thirst, ran unto the wells.",
        "source": "Perseus (Tufts)"
      },
      {
        "category": "literary",
        "title": "The Rime of the Ancient Mariner, Samuel Taylor Coleridge (1817) — a ship becalmed under a bloody noon sun, water everywhere yet none to drink, an emblem of heat and thirst amid apparent abundance",
        "href": "https://en.wikisource.org/wiki/Sibylline_Leaves_(Coleridge)/The_Rime_of_the_Ancient_Mariner",
        "excerpt": "All in a hot and copper sky, / The bloody Sun, at noon, / Right up above the mast did stand, / No bigger than the Moon. … Water, water, every where, / Nor any drop to drink.",
        "source": "Wikisource"
      },
      {
        "category": "literary",
        "title": "The Waste Land, T. S. Eliot (1922) — 'no water but only rock,' a parched modern wasteland mirroring drought-stricken land baking under a punishing sky",
        "href": "https://www.gutenberg.org/files/1321/1321-h/1321-h.htm",
        "excerpt": "Here is no water but only rock / Rock and no water and the sandy road / The road winding above among the mountains / Which are mountains of rock without water",
        "source": "Project Gutenberg"
      },
      {
        "category": "artistic",
        "title": "The Harvesters, Pieter Bruegel the Elder (1565) — laborers collapsed in the shade at high summer, the age-old bodily toll of extreme heat on those who must work outdoors",
        "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_the_Elder-_The_Harvesters_-_Google_Art_Project.jpg",
        "excerpt": "Under a hazy golden sky, peasants pause from cutting the wheat to sprawl exhausted beneath a lone pear tree, one man asleep open-mouthed in the heat while others gulp food and drink. The scorched, sun-bleached fields stretch to a shimmering horizon, capturing the oppressive warmth of high summer. It renders the same heat exhaustion that record temperatures now inflict on outdoor workers.",
        "source": "Wikimedia Commons",
        "image": {
          "src": "/covers/us-july4-record-heat-america-250--art.png",
          "alt": "Bruegel's The Harvesters (1565): peasants resting exhausted in the heat of the wheat harvest, echoing the human toll of extreme heat",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "'Summer' (L'estate) from The Four Seasons, Antonio Vivaldi (1725) — a concerto whose sonnet has man and flock languishing under a merciless sun before a violent storm, evoking a heat dome breaking into grid-straining tempest",
        "href": "https://imslp.org/wiki/Le_quattro_stagioni_(Vivaldi,_Antonio)",
        "excerpt": "Vivaldi's concerto opens in oppressive stillness, its programmatic sonnet describing man and flock languishing beneath a scorching sun and the pine tree parched by heat. The violins pant and shimmer like heat-haze before erupting into a ferocious thunderstorm that flattens the ripe grain. The music dramatizes exactly the pattern of a heat dome collapsing into violent, power-straining storms.",
        "source": "IMSLP"
      }
    ],
    "rank": 1
  },
  {
    "slug": "trump-pardons-clean-air-act-convictions",
    "headline": "Trump pardons 11, wiping out Clean Air Act emissions-fraud convictions, including a former Abramoff associate",
    "overview": "President Donald Trump granted pardons to 11 people, most of them convicted of violating the Clean Air Act by tampering with vehicle emissions controls, the White House said Saturday. The list includes a former business partner of disgraced lobbyist Jack Abramoff. The clemency, announced over the July Fourth weekend, clears convictions tied to schemes that disabled pollution controls on diesel trucks.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMiqwFBVV95cUxNWWFReFN0Q1VXaGliVGwyUHBkTVM1dEdHSmNKenFtQU9YbHJYRUkwUjU0RGg2NjQxbW5mNVk4VlJtNUhfMGRnd0dJQmZ2aFZlOUxHRUh4YXBmNTdPNkVGSmpwcHYxZE00OHRiMnIwUmVBYmdtVmdMeGlzR0tRVGxwQ0JTcEd0aUFVVUc5V2RkeGxPV0l6M1FkRXZVSVlKWlFFb1FYcDI3ZXFaUmM?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMinwFBVV95cUxQTl9RODR6cEV0Q3dFY29GdER3bTkxZ1MtUEIwc0hxdEdoRTdiTG1tZ3ZwWUdZbGYxZjluNWlyTGpqWXhmUTRNT1ZneEhLMHVvZHNwOW5JaHNyQm1rUm5yNjZmVlBTZVIwV213YjRQcmZGZVIwVEFuTWxKVUtLTl8waWhpT1dzVlJ1bnhha2FKdm9lVjNmaUp1Q2lLbFdnVkE?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-04",
    "image": {
      "src": "/covers/trump-pardons-clean-air-act-convictions.png",
      "alt": "A parked heavy diesel truck idling under a sodium streetlight at night, a faint haze of exhaust hanging in the air.",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 4 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Federalist No. 74, Alexander Hamilton (1788) — the case for the president's near-unfettered pardon power that Trump now wields to erase Clean Air Act convictions",
        "href": "https://avalon.law.yale.edu/18th_century/fed74.asp",
        "excerpt": "Humanity and good policy conspire to dictate, that the benign prerogative of pardoning should be as little as possible fettered or embarrassed. The reflection that the fate of a fellow-creature depended on his sole fiat, would naturally inspire scrupulousness and caution; the dread of being accused of weakness or connivance, would beget equal circumspection.",
        "source": "Avalon Project, Yale Law School"
      },
      {
        "category": "historical",
        "title": "Proclamation 4311, Gerald R. Ford (1974) — a president's sweeping pardon lifting the threat of prosecution from a powerful ally",
        "href": "https://en.wikisource.org/wiki/Proclamation_4311",
        "excerpt": "do grant a full, free, and absolute pardon unto Richard Nixon for all offenses against the United States which he, Richard Nixon, has committed or may have committed or taken part in during the period from January 20, 1969 through August 9, 1974.",
        "source": "Wikisource"
      },
      {
        "category": "literary",
        "title": "Measure for Measure, William Shakespeare (1604) — a drama of corrupt authority and mercy, warning that 'pardon is still the nurse of second woe'",
        "href": "http://shakespeare.mit.edu/measure/measure.2.1.html",
        "excerpt": "It is but needful:\nMercy is not itself, that oft looks so;\nPardon is still the nurse of second woe:\nBut yet,--poor Claudio! There is no remedy.",
        "source": "The Complete Works of William Shakespeare (MIT)"
      },
      {
        "category": "literary",
        "title": "Inferno, Dante Alighieri (c.1320) — the barrators, corrupt officials boiled in pitch, the reckoning that clemency now cancels",
        "href": "https://en.wikisource.org/wiki/Divine_Comedy_(Longfellow_1867)/Volume_1/Canto_21",
        "excerpt": "As in the Arsenal of the Venetians / Boils in the winter the tenacious pitch / To smear their unsound vessels o'er again ... O Malebranche, / Behold one of the elders of Saint Zita; / Plunge him beneath, for I return for others",
        "source": "Wikisource"
      },
      {
        "category": "artistic",
        "title": "The Return of the Prodigal Son, Rembrandt van Rijn (c.1668) — mercy that folds the wayward back into favor with no penance exacted",
        "href": "https://commons.wikimedia.org/wiki/File:Rembrandt_Harmensz_van_Rijn_-_Return_of_the_Prodigal_Son_-_Google_Art_Project.jpg",
        "excerpt": "A ragged, kneeling figure buries his shaved head in his father's chest while the elder man's worn hands rest gently on his shoulders in wordless forgiveness. Rembrandt bathes the reunion in warm light and pushes the disapproving onlookers into shadow, so that clemency, not accountability, fills the canvas. The scene reads as pardon rendered absolute: the transgressor restored, the debt simply dissolved.",
        "source": "Wikimedia Commons",
        "image": {
          "src": "/covers/trump-pardons-clean-air-act-convictions--art.png",
          "alt": "Rembrandt's The Return of the Prodigal Son, a father embracing his kneeling wayward son in total forgiveness, echoing clemency that wipes away wrongdoing",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "La clemenza di Tito, Wolfgang Amadeus Mozart (1791) — an opera in which an emperor pardons the very conspirator who plotted his death, staging clemency as the ruler's supreme prerogative",
        "href": "https://imslp.org/wiki/La_clemenza_di_Tito,_K.621_(Mozart,_Wolfgang_Amadeus)",
        "excerpt": "Mozart's final opera seria dramatizes the Roman emperor Titus discovering that his trusted friend Sesto led an armed plot to assassinate him and burn the Capitol. Rather than execute the traitor, Tito tears up the death warrant and forgives him, and the chorus exalts the sovereign's boundless mercy. The work turns an act of clemency toward a guilty intimate into a spectacle of imperial magnanimity, mercy dispensed from on high as an emblem of power.",
        "source": "IMSLP"
      }
    ],
    "rank": 2
  },
  {
    "slug": "netanyahu-trump-us-summit-iran-rift",
    "headline": "Netanyahu and Trump agree in phone call to hold a US summit soon amid friction over the Iran war",
    "overview": "Israeli Prime Minister Benjamin Netanyahu spoke with US President Donald Trump and the two agreed to meet in the United States soon, Netanyahu's office said Saturday. The planned summit comes amid visible strain between the allies following the war with Iran and the death of Supreme Leader Ayatollah Ali Khamenei. Netanyahu's office said Israel greatly appreciates US support.",
    "genre": "Politics",
    "sources": [
      {
        "name": "SBS",
        "href": "https://news.google.com/rss/articles/CBMiZkFVX3lxTFBoQ3JCM0JqVHVSOWFIZW1qTXZlTXBnYW1oemczdU1fMFAydFpicWFlVE5mS0M4TWFMMW91WVlNTlNQQkJkR2JZdVZjdklZZFhzVVVUdWxFbkNJYmVHUk1rdlJDbWllQQ?oc=5"
      },
      {
        "name": "Chosunbiz",
        "href": "https://news.google.com/rss/articles/CBMiiAFBVV95cUxOdzVRUV96c2s2Nmo0dFFTRWwyLVJ0VEVrRExnWGlDQUNVR0pNS0lGMEEtampSYjVNeldQWDNrb2RwMzQtMWdRX1R1TWJsckNiVnVQNHZqZFRwWTJPUTQtLU80ZE8tSjM2emk4di1ZaHBXTUhaVmJWY2swRWs4TDZicmd3Wlp5MnZk0gGcAUFVX3lxTE1zWVBpbDlXQTVwMGg1YnlUVFRyWXdqenNxbGRVQ0txN3EzVTZLV1EtMGFZLVc5dUpJeHY1QmlhU192NWxBWGpwbzBVTkZkT3dwVWF5aGFqaVFiQlhEdi1vQVZncHdmTnZmRnBGMEUwZ2VPdzBjMTdRV0JrU2h4eU5xY3NBbEhWakFhMVNPS2o4Qnh0ZWpvMWpaM0MybA?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-04",
    "image": {
      "src": "/covers/netanyahu-trump-us-summit-iran-rift.png",
      "alt": "Two empty high-backed leather chairs facing each other across a polished table in a formal state reception room.",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 4 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Suez Crisis, Eisenhower Administration (1956) — a great power publicly reining in its own smaller allies just after their war ends",
        "href": "https://history.state.gov/milestones/1953-1960/suez",
        "excerpt": "In 1956 the United States found itself at odds with the very partners who had just fought a war, pressuring Britain, France, and Israel to accept a United Nations ceasefire and withdraw. Washington voted for UN resolutions and publicly censured its allies, a rare open rebuke that temporarily soured relations even among close friends. It is a vivid case of the strongest power constraining the smaller states in its camp in the war's immediate aftermath.",
        "source": "U.S. Department of State, Office of the Historian"
      },
      {
        "category": "historical",
        "title": "The 1973 Arab-Israeli War and Kissinger's Shuttle Diplomacy, United States (1973–1975) — postwar friction between allies channeled into summit diplomacy",
        "href": "https://history.state.gov/milestones/1969-1976/arab-israeli-war-1973",
        "excerpt": "The October 1973 war ended in an Israeli battlefield victory only after a massive American airlift, yet it nearly dragged the superpowers into confrontation and triggered an Arab oil embargo. In its wake, Secretary of State Kissinger launched an intensive round of face-to-face diplomacy to manage a relationship that was at once indispensable and strained. The episode shows how a shared war can leave a great power and its ally needing to sit down together to repair the bond.",
        "source": "U.S. Department of State, Office of the Historian"
      },
      {
        "category": "literary",
        "title": "The Iliad, Homer (c. 8th century BC) — the bitter quarrel between the paramount king and his greatest warrior after a shared war",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0134%3Abook%3D1%3Acard%3D101",
        "excerpt": "Most glorious son of Atreus, most covetous of all, how shall the great-hearted Achaeans give you a prize?",
        "source": "Perseus Digital Library, Tufts University"
      },
      {
        "category": "literary",
        "title": "Julius Caesar, William Shakespeare (1599) — allied victors turning on each other in a tent-side quarrel",
        "href": "https://www.gutenberg.org/files/1522/1522-h/1522-h.htm",
        "excerpt": "Let me tell you, Cassius, you yourself Are much condemn'd to have an itching palm.",
        "source": "Project Gutenberg"
      },
      {
        "category": "artistic",
        "title": "The Meeting of Napoleon I and Tsar Alexander I at Tilsit, Adolphe Roehn (1808) — two rulers, unequal in power, meeting to settle terms after a war",
        "href": "https://commons.wikimedia.org/wiki/File:Tilsitz_1807.JPG",
        "excerpt": "Roehn depicts the June 1807 summit on a raft in the middle of the River Neman, where Napoleon and Tsar Alexander I negotiated the Peace of Tilsit ending the War of the Fourth Coalition. Though staged as an equal meeting, the composition subtly places Napoleon in a posture of ascendancy, waiting for the Russian to approach. It captures the choreography and quiet tension of a face-to-face summit between a dominant power and a partner seeking accommodation.",
        "source": "Wikimedia Commons",
        "image": {
          "src": "/covers/netanyahu-trump-us-summit-iran-rift--art.png",
          "alt": "Roehn's painting of Napoleon and Tsar Alexander meeting on a raft on the Niemen at Tilsit, a summit between a great power and a smaller partner after war",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Music for the Royal Fireworks, HWV 351, George Frideric Handel (1749) — grand ceremonial music marking peace and reconciliation among powers after a war",
        "href": "https://imslp.org/wiki/Music_for_the_Royal_Fireworks,_HWV_351_(Handel,_George_Frideric)",
        "excerpt": "Handel composed this festive suite of overture, bourrees, and triumphant movements for the public celebrations in London's Green Park honoring the peace that ended the War of the Austrian Succession. Its blazing brass and drums were meant to turn the close of a costly, divisive conflict into a display of restored harmony among nations. The music embodies the impulse to convert postwar strain into a stately, public gesture of alliance renewed.",
        "source": "IMSLP / Petrucci Music Library"
      }
    ],
    "rank": 3
  },
  {
    "slug": "aspen-acres-wildfire-colorado",
    "headline": "Aspen Acres wildfire in southern Colorado forces thousands to evacuate and destroys more than 160 structures",
    "overview": "A fast-moving wildfire dubbed the Aspen Acres fire exploded across southern Colorado near Pueblo on Saturday, scorching roughly 28 square miles in hours and growing toward 82,000 acres with little containment. Authorities ordered thousands of residents to evacuate and said the blaze had destroyed more than 160 structures. Firefighters struggled against erratic winds as the fire threatened the landmark Bishop Castle.",
    "genre": "Climate",
    "sources": [
      {
        "name": "Colorado Public Radio",
        "href": "https://news.google.com/rss/articles/CBMiiAFBVV95cUxPZWRrSWozNHpuRjJLLTJjTFFwTU1VdWdScjM3NzZjT20wN1Zibk84TDBJWmhDSHppUkZrMkZjVmZVOXlDOUowcHhPMUllRm5SN2dfQ00zTFdfX05qUTNVbVdBN2xEeloyaW80bkdkajdYWjFIaG9TaF92SWFXSmFCVlRsbkUtUzFO?oc=5"
      },
      {
        "name": "The Denver Post",
        "href": "https://news.google.com/rss/articles/CBMiiwFBVV95cUxNS0dsVFJ3NkMtdmZuU05aSHRQdlkzSEZ0VENBZUVMLU1xRnJHZ0d6cWExVmhFRHdFc3JFSDVjOXRob1lCMkctRGp2Z0VWYVNkZ2J2RE4tRDRuRk56ZHd2VDZMY0lUTjctbHlFdnZaLWF6am1qVUh0X3hjNzRCbnZzNW01V1hHc1JlZXJZ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-04",
    "image": {
      "src": "/covers/aspen-acres-wildfire-colorado.png",
      "alt": "A hillside of pine forest ablaze at dusk, orange flames and thick smoke rising against a darkening sky.",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 4 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Annals, Book XV (The Great Fire of Rome), Tacitus (c. 116 AD) — a fast-moving blaze racing through a city faster than anyone could flee, exactly as the Aspen Acres fire outran containment.",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0078:book=15:chapter=38",
        "excerpt": "Often, while they looked behind them, they were intercepted by flames on their side or in their face. Or if they reached a refuge close at hand, when this too was seized by the fire, they found that, even places, which they had imagined to be remote, were involved in the same calamity.",
        "source": "Perseus Digital Library (Tufts)"
      },
      {
        "category": "historical",
        "title": "The Great Peshtigo Fire: An Eyewitness Account, Rev. Peter Pernin (1874) — the deadliest wildfire in U.S. history, whose wind-driven wall of flame and terrified flight mirror the panic near Pueblo.",
        "href": "https://archive.org/stream/the-great-peshtigo-fire-an-eyewitness-account/The%20Great%20Peshtigo%20Fire%20-%20An%20Eyewitness%20Account_djvu.txt",
        "excerpt": "The neighing of horses, falling of chimneys, crashing of uprooted trees, roaring and whistling of the wind, crackling of fire as it ran with lightning-like rapidity from house to house—all sounds were there save that of the human voice.",
        "source": "Internet Archive"
      },
      {
        "category": "literary",
        "title": "The Aeneid, Book II, Virgil (trans. John Dryden, 1697) — Aeneas fleeing a burning city, its wildfire simile of flame mowing standing corn echoing 28 square miles scorched in hours.",
        "href": "https://www.gutenberg.org/files/228/228-h/228-h.htm",
        "excerpt": "Thus, when a flood of fire by wind is borne, / Crackling it rolls, and mows the standing corn",
        "source": "Project Gutenberg"
      },
      {
        "category": "literary",
        "title": "Metamorphoses, Book II (Phaethon), Ovid (trans. Brookes More) — the sun-chariot loosed to set the whole earth ablaze, cities, forests and mountains consumed like the 82,000-acre front.",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0028:book=2:card=227",
        "excerpt": "Great cities perish with their walls, / and peopled nations are consumed to dust— / the forests and the mountains are destroyed.",
        "source": "Perseus Digital Library (Tufts)"
      },
      {
        "category": "artistic",
        "title": "The Burning of the Houses of Lords and Commons, October 16, 1834, J. M. W. Turner (1834–35) — a landmark engulfed in roaring flame and glowing sky, as fire threatened Colorado's Bishop Castle.",
        "href": "https://commons.wikimedia.org/wiki/File:Joseph_Mallord_William_Turner,_English_-_The_Burning_of_the_Houses_of_Lords_and_Commons,_October_16,_1834_-_Google_Art_Project.jpg",
        "excerpt": "Turner turns catastrophe into a towering column of orange-white fire that dissolves stone into light, its heat smearing across the night sky and reflecting in the crowded river below. Tiny onlookers press to the water's edge, dwarfed by a blaze that has swallowed a landmark whole. The painting captures the awe and helplessness of watching an unstoppable fire consume the familiar.",
        "source": "Wikimedia Commons",
        "image": {
          "src": "/covers/aspen-acres-wildfire-colorado--art.png",
          "alt": "J. M. W. Turner's 'The Burning of the Houses of Lords and Commons' (1834-35), a landmark consumed by roaring fire, evoking the wildfire threatening Bishop Castle",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Magic Fire Music (Feuerzauber) from Die Walküre, Richard Wagner (1870) — orchestral flames rising to encircle and cut off all approach, sonically mirroring a fire ring closing around evacuees.",
        "href": "https://imslp.org/wiki/Die_Walk%C3%BCre,_WWV_86B_(Wagner,_Richard)",
        "excerpt": "Shimmering strings and darting woodwinds flicker upward like sparks catching, building into a radiant, restless blaze of orchestral color. The music surrounds a mountaintop with an impassable ring of fire, beautiful and terrifying at once. Its glowing, ever-shifting textures evoke the mesmerizing menace of flames consuming everything in their path.",
        "source": "IMSLP (Petrucci Music Library)"
      }
    ],
    "rank": 4
  },
  {
    "slug": "geneva-lake-wisconsin-boat-capsize",
    "headline": "Three children die after a boat capsizes on Wisconsin's Geneva Lake during a severe storm",
    "overview": "Three children died and other passengers were rescued after a boat capsized on Geneva Lake in southern Wisconsin when a severe storm swept across the area, authorities said Saturday. Rescuers pulled survivors from the water after the sudden storm overturned the vessel. The deaths came amid a wave of violent weather battering the US Midwest over the holiday weekend.",
    "genre": "Climate",
    "sources": [
      {
        "name": "CBS News",
        "href": "https://news.google.com/rss/articles/CBMijgFBVV95cUxQTlZHNFdDdWdjTEZ5LUl4RlNadlpucHlibE44N3lISDVJMnhweU9KNkF6b1VlT1ItVzJhOTk5cmdfTzJrcXVCSDhLVWNlRkRjams5Y1otczRWNlBBalNWVUF5dkgtYWNuZ015VzE0ZGdqU0ZzNnRwRDZlTVF2MU16eG1GUjdZaE1jNVBXRXln?oc=5"
      },
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMilgFBVV95cUxQZzNyMm9MaHowU04ya1FzR1lMMEJfUjZmdGNBdGhPbUluSkM1U3VBY2FLazhfUkdBY2pKYV9xanZxRWdRc2VreUJvcURyVExzYTVZQkpJRmNIUDk1YWlYbXgzbEk4SXN4X2pPR1ZrRTFTbEhJV3ZfZzFSMnk2ZjNGMVRfRmVWd1lBakpvRWVxTV9xQXFTTkE?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-04",
    "image": {
      "src": "/covers/geneva-lake-wisconsin-boat-capsize.png",
      "alt": "A small empty pleasure boat overturned on choppy grey lake water under a bank of dark storm clouds.",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 4 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Children's Blizzard, U.S. Great Plains (January 12, 1888) — a sudden storm on a mild day killed roughly 213 schoolchildren caught in the open, like the squall that swamped the Geneva Lake boat",
        "href": "https://www.weather.gov/unr/1888-01-12",
        "excerpt": "Snow like flour—could not breathe in it. I was 7 years and stuck my head around corner of house and nearly choked before I got indoors again.",
        "source": "National Weather Service (NOAA)"
      },
      {
        "category": "historical",
        "title": "The Wreck of the Steamer Lady Elgin, Lake Michigan (September 8, 1860) — a Great Lakes vessel lost in a nighttime gale, drowning some 300, echoing the sudden storm that capsized the Geneva Lake boat",
        "href": "https://drloihjournal.blogspot.com/2020/03/sinking-of-the-ps-lady-elgin-on-9-8-1860.html",
        "excerpt": "A most appalling calamity has burst upon our community, and the other communities yet to be thrilled with the intelligence of a disaster which has just occurred on this lake [Michigan], without parallel in the marine annals of the lakes.",
        "source": "Chicago Tribune (Sept. 10, 1860), via Digital Research Library of Illinois History Journal"
      },
      {
        "category": "literary",
        "title": "The Wreck of the Hesperus, Henry Wadsworth Longfellow (1842) — a skipper's young daughter, lashed to the mast, dies when a sudden storm wrecks the schooner, mirroring children lost on the water",
        "href": "https://en.wikisource.org/wiki/The_Wreck_of_the_Hesperus",
        "excerpt": "He wrapped her warm in his seaman's coat / Against the stinging blast; / He cut a rope from a broken spar, / And bound her to the mast.",
        "source": "Wikisource"
      },
      {
        "category": "literary",
        "title": "The Tempest, William Shakespeare (c. 1611) — the play opens with a ship foundering in a violent tempest, the mariners crying their farewells as the vessel splits",
        "href": "https://www.gutenberg.org/files/23042/23042-h/23042-h.htm",
        "excerpt": "Mercy on us!—We split, we split!—Farewell my wife and children!—Farewell, brother!—We split, we split, we split!",
        "source": "Project Gutenberg"
      },
      {
        "category": "artistic",
        "title": "The Ninth Wave, Ivan Aivazovsky (1850) — shipwreck survivors cling to a broken mast beneath a towering storm wave, an image of the sea's sudden and lethal violence",
        "href": "https://commons.wikimedia.org/wiki/File:Hovhannes_Aivazovsky_-_The_Ninth_Wave_-_Google_Art_Project.jpg",
        "excerpt": "Aivazovsky paints a handful of survivors lashed to the shattered mast of a wrecked ship, tossed on a blazing dawn sea as an enormous wave rears to break over them. The canvas fuses terror and fragile hope: the light of survival glows through the storm even as the water threatens to engulf them, capturing the exact moment when a sudden tempest turns a vessel into a fight for life.",
        "source": "Wikimedia Commons",
        "image": {
          "src": "/covers/geneva-lake-wisconsin-boat-capsize--art.png",
          "alt": "Aivazovsky's The Ninth Wave: shipwreck survivors clinging to a broken mast beneath a giant storm wave, evoking a boat overturned by a sudden squall",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Kindertotenlieder ('Songs on the Death of Children'), Gustav Mahler (1904) — the final song, 'In diesem Wetter' ('In this weather, in this storm'), voices a parent's grief for children lost to the tempest",
        "href": "https://imslp.org/wiki/Kindertotenlieder_(Mahler,_Gustav)",
        "excerpt": "Mahler's cycle sets a grieving parent's meditation on children who have died, and its fifth and final song erupts into a raging orchestral storm—wind, rain, and thunder—before subsiding into unbearable tenderness. The voice laments that the children were carried out into the tempest against the parent's will, then finds fragile consolation that they now rest as if in their mother's house, sheltered from every storm.",
        "source": "IMSLP"
      }
    ],
    "rank": 5
  },
  {
    "slug": "peco-philadelphia-utility-workers-strike",
    "headline": "Philadelphia utility PECO hit by worker strike as contract talks collapse over the July Fourth weekend",
    "overview": "Unionized workers at PECO, the utility serving Philadelphia and its suburbs, walked off the job just after midnight Saturday after contract negotiations broke down, the union said. The walkout began at 12:01 a.m. ahead of a busy July Fourth weekend, with no new deal in place. PECO said it had activated contingency plans to maintain electricity and gas service.",
    "genre": "Economy",
    "sources": [
      {
        "name": "The Philadelphia Inquirer",
        "href": "https://news.google.com/rss/articles/CBMimwFBVV95cUxQa0RoM083Nm4yVHhCMWhDQzNnMnVfYmhWU0NFZjZESUxlZG05WEpEVTZHbWVTYWNvTTZ4R1dYZUVOS0ZtRVZIRUZWOV9qT0RQd1d5aTJRREVwcXYtRjAwclZLc05OcE9oalNXNTBsYXRjZVJ3enV5LWhxajEyRDVlMkR1TllwaXVpM1JHWmVLb1VzTGpicklrUFBKcw?oc=5"
      },
      {
        "name": "NBC10 Philadelphia",
        "href": "https://news.google.com/rss/articles/CBMia0FVX3lxTE5nUW9PWE5WZzRHaDBnZUtIZVpPWjVxdU0zU21jSEZOaFJnYkhOTnRsc2JmdEE2STRaWnp6T21SaWhpanFRRjNZMmZVM0wwbzZpcUhEMWw1MXhwRllCRUlUSTk5M1dnNFZrejhn0gFzQVVfeXFMT0tXTEpkSTNGVzRmZjB2M21JcGdmcWtScHFicnJZZVBsLVduckJxOEstblM3QjhiQkdPb3A3dThfR1EwYWVKN0dnUzRrZ0Y2TE5Ob2dmbFRRcVNYSGZOaTJSZ00xZGdBUFk2TkdiTWJNZjU4Zw?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-04",
    "image": {
      "src": "/covers/peco-philadelphia-utility-workers-strike.png",
      "alt": "An electrical utility hard hat and gloves resting on a coil of heavy cable beside a locked substation gate at dawn.",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 4 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Telegram to Samuel Gompers on the Boston Police Strike, Calvin Coolidge (1919) — a public-service walkout that framed the tension between the right to strike and uninterrupted public services, exactly the dilemma PECO's contingency plans now confront",
        "href": "https://www.presidency.ucsb.edu/documents/telegram-the-president-the-american-federation-labor-samuel-gompers-the-boston-police",
        "excerpt": "That furnished the opportunity, the criminal element furnished the action. There is no right to strike against the public safety by anybody, anywhere, any time. You ask that the public safety again be placed in the hands of these same policemen while they continue in disobedience to the laws of Massachusetts.",
        "source": "The American Presidency Project"
      },
      {
        "category": "historical",
        "title": "Statement from the Pullman Strikers, American Railway Union delegates (1894) — railway workers who downed tools when negotiations failed, voicing the same last-resort desperation as PECO crews walking out after talks collapsed",
        "href": "https://www.historyisaweapon.com/defcon1/pullmanstrikersstatement.html",
        "excerpt": "We struck at Pullman because we were without hope. We joined the American Railway Union because it gave us a glimmer of hope.",
        "source": "History Is a Weapon"
      },
      {
        "category": "literary",
        "title": "Germinal, Émile Zola (1885) — the coal miners' strike erupts before dawn in a single decisive moment, mirroring PECO workers walking off just after midnight with no deal in place",
        "href": "https://www.gutenberg.org/files/56528/56528-h/56528-h.htm",
        "excerpt": "Suddenly, on this very Monday, at four o'clock in the morning, the strike broke out.",
        "source": "Project Gutenberg"
      },
      {
        "category": "literary",
        "title": "The Masque of Anarchy, Percy Bysshe Shelley (1819) — the archetypal summons to collective action and solidarity, the moral engine behind any labor stoppage like the PECO walkout",
        "href": "https://en.wikisource.org/wiki/The_Masque_of_Anarchy",
        "excerpt": "Rise like Lions after slumber / In unvanquishable number, / Shake your chains to earth like dew / Which in sleep had fallen on you— / Ye are many—they are few.",
        "source": "Wikisource"
      },
      {
        "category": "artistic",
        "title": "The Strike (Der Streik), Robert Koehler (1886) — the first major painting of a strike, showing workers who have downed tools confronting the factory owner, a visual precedent for PECO's crews withholding their labor",
        "href": "https://commons.wikimedia.org/wiki/File:Robert_Koehler_-_Der_Streik_(1886).jpg",
        "excerpt": "Koehler's monumental canvas freezes the instant a strike ignites: workers stream from the mill gates and mass before the owner on his steps, one man arguing with clenched urgency while another stoops to gather a stone. Women and children crowd the margins, and the smokestacks stand cold behind them. It is the dignity of labor rendered as tense, collective confrontation.",
        "source": "Wikimedia Commons",
        "image": {
          "src": "/covers/peco-philadelphia-utility-workers-strike--art.png",
          "alt": "Robert Koehler's 1886 painting The Strike, workers confronting a factory owner after downing tools, echoing PECO crews walking off the job",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Solidarity Forever, Ralph Chaplin (1915) — the most famous labor anthem, distilling the collective power PECO's unionized workers assert by walking off together",
        "href": "https://en.wikisource.org/wiki/Songs_of_the_Workers_(15th_edition)/Solidarity_Forever!",
        "excerpt": "Solidarity forever! / Solidarity forever! / Solidarity forever! / But the Union makes us strong.",
        "source": "Wikisource"
      }
    ],
    "rank": 6
  },
  {
    "slug": "anthropic-samsung-custom-ai-chip",
    "headline": "Anthropic in talks with Samsung to manufacture custom AI chips, reports say",
    "overview": "The AI company Anthropic is in discussions with South Korea's Samsung to manufacture custom artificial-intelligence chips, according to reports published Saturday. A deal would deepen Anthropic's push to secure dedicated silicon for training and running its Claude models and reduce reliance on existing suppliers. Neither company confirmed the talks.",
    "genre": "Technology",
    "sources": [
      {
        "name": "UPI",
        "href": "https://news.google.com/rss/articles/CBMimwFBVV95cUxQZF9aSlNYNWJvblNUYm5SRnpnRkZWUk1UbEVIcW5LclBuc05PQ0lZMkdIb3JwWmNfNDJHcFhUaU9CTDVMNklDaDA1Y1Z4Q0xJRGx3NG9rX0ZvYzF4WUxHNktlQldMZnFfV29mV3VmRkZqeUMya2hBanE3bHBsMmJMX1BQcTFDUEtub3BvNnFrRUFTc29RQ1ppRXJIONIBoAFBVV95cUxNODNpSWktRTdVQlNWRVY1VDJudF84bXRVZm1SQU5aNFJ6R3R2RzZrcGJpQW55b1Y3Tm1PMWtBb2Vnd1BfaTZCVUFMUldGS1lSc25VTDhaM3REbXdyQXZxcUdUMkluTmQ1bXR2N28yTWs5bEZvdkNhX0hFcVNIcGJuZGFFMHFQa3NoOWNXYkswMFZrWFNSd2VNM3FIQmxyWFgz?oc=5"
      },
      {
        "name": "GSMArena",
        "href": "https://news.google.com/rss/articles/CBMilAFBVV95cUxOa3B4aHhQeEY5Tk01T1NZZmNqeDZ6OV9Md1VCdjRCZ2Z5ZTNKc1h1cVZRVkxrS1BMT19uQjhmYWstYmF0Nm9WUGZELVF1Q0l4OC1ITXdPNUhjR01WWE5BYnpqSDJyOTZsM2JGc0N3SFQwRWZqR0xoQUIxOFlwUUpKSWNtNlRONDFGQ3cyR1lkdjNjaERL0gGQAUFVX3lxTE5aVEdyTnFjOVVVMERWR0xKcjYxNkZhR19BeVBZLXE0UHkzY0Z1RmJITFZWWF8xYVU2MTBmTkhBVDFMZUtBYTdYSVBpcDJMbWRKOVg0TnpTdGpFb0tJdjNUOFhCWjdoay05Qm12X25nMDhQOTZaSHVyRXlneWx5bHlNWmwxbnlkTGNUamZud1k0TQ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-04",
    "image": {
      "src": "/covers/anthropic-samsung-custom-ai-chip.png",
      "alt": "A single silicon wafer held under clean-room light, its mirrored surface catching a grid of circuitry.",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 4 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Life of Benvenuto Cellini, Benvenuto Cellini (c. 1563) — a master who, rather than trust others, flings his own pewter into the furnace to cast his masterpiece himself, mastering fire and metal",
        "href": "https://en.wikisource.org/wiki/The_Life_of_Benvenuto_Cellini/Section_LXXII_to_LXXXVII",
        "excerpt": "Accordingly I sent for all my pewter platters, porringers, and dishes, to the number of some two hundred pieces, and had a portion of them cast, one by one, into the channels, the rest into the furnace.",
        "source": "Wikisource"
      },
      {
        "category": "historical",
        "title": "My Life and Work, Henry Ford (1922) — Ford makes his own parts and materials so he cannot be crippled when an outside supplier fails, foreshadowing Anthropic forging its own silicon",
        "href": "https://www.gutenberg.org/cache/epub/7213/pg7213-images.html",
        "excerpt": "But also we aim to make some of every part so that we cannot be caught in any market emergency or be crippled by some outside manufacturer being unable to fill his orders.",
        "source": "Project Gutenberg"
      },
      {
        "category": "literary",
        "title": "Iliad, Book 18, Homer (trans. A. T. Murray, 1924) — Hephaestus fires his forge to hammer out new arms for Achilles, the god making the hero's tools with his own hands",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0134%3Abook%3D18%3Acard%3D468",
        "excerpt": "And on the fire he put stubborn bronze and tin and precious gold and silver; and thereafter he set on the anvil-block a great anvil, and took in one hand a massive hammer, and in the other took he the tongs.",
        "source": "Perseus Digital Library"
      },
      {
        "category": "literary",
        "title": "Prometheus Bound, Aeschylus (c. 430 BCE) — Prometheus hands mortals fire so 'they shall learn many arts,' the primal act of seizing the means of making",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0010%3Acard%3D250",
        "excerpt": "Prometheus: In addition, I gave them fire. Chorus: What! Do creatures of a day now have flame-eyed fire? Prometheus: Yes, and from it they shall learn many arts.",
        "source": "Perseus Digital Library"
      },
      {
        "category": "artistic",
        "title": "Apollo in the Forge of Vulcan (La Fragua de Vulcano), Diego Velázquez (1630) — the divine smithy where armor is beaten from glowing metal, an image of owning the forge itself",
        "href": "https://commons.wikimedia.org/wiki/File:Diego_Vel%C3%A1zquez_-_The_Forge_of_Vulcan_-_WGA24376.jpg",
        "excerpt": "Velazquez paints Vulcan and his sweating assistants frozen at the anvil, a bar of iron glowing white-hot between hammer and tongs as Apollo arrives with unwelcome news. Light pours across bare muscle and half-finished armor, dignifying manual labor as the very engine of the divine workshop. It is the forge as a place of self-made power, metal mastered by fire and human hands.",
        "source": "Wikimedia Commons",
        "image": {
          "src": "/covers/anthropic-samsung-custom-ai-chip--art.png",
          "alt": "Velazquez's The Forge of Vulcan (1630): smiths at a fiery anvil forging armor, an emblem of controlling the means of production like Anthropic forging its own chips",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Siegfried, Forging Song ('Nothung! Nothung!'), Richard Wagner (1876) — the young hero reforges his father's shattered sword with his own hands rather than rely on the smith Mime",
        "href": "https://www.gutenberg.org/files/49507/49507-h/49507-h.htm",
        "excerpt": "Nothung! Nothung! / Conquering sword! ... Hoho! Hoho! / Hohei! Hohei! Hoho! / Bellows blow! / Brighten the flame!",
        "source": "Project Gutenberg"
      }
    ],
    "rank": 7
  },
  {
    "slug": "argentina-cape-verde-world-cup",
    "headline": "Messi scores again as champion Argentina survive a 3-2 extra-time scare against Cape Verde to reach the World Cup last 16",
    "overview": "Lionel Messi scored to take the Golden Boot lead as defending champion Argentina edged debutants Cape Verde 3-2 after extra time on Saturday to reach the World Cup round of 16. An extra-time own goal ultimately settled a thriller in which Cape Verde pushed the title-holders to the brink. Messi extended his scoring streak to eight games with his 20th career World Cup goal.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMipAFBVV95cUxPaGk1V1JkY0kyQWNqeC0zZ0gxOU1COWFSYmFOdUgtV0VIaTF0N1pBaVJseXZIcTVBT011Qzl6TWJmWU5RWmxEelJTeEJsZnYxb2ZhS1p1R2ZDaUJmdE9DQmY1Z1YtMGItQWo1YWMxS0hwVlowWnRKTHFqZTdnX1VtR2JWQlo0cFkyaEpRS1NvSHBRaHgtelBMc01GaFJZZ2Jvd1lUeA?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMivgFBVV95cUxNZjhKaXIyN2txZWRYNVRldjA0dnV1TE5ncWE5LTluTlZtV0JwdkRoQWpaQU1xejBtc1NYNTFNMGR2dXRiZThOZUtPbDRKWk96TXI1WkZ3Wk1vZkcwdHdGa2hzdmtnWVdFVmh1UFVMaklYVmFBbDkwbkpIY3lzdEp2UTRNNFVBb0FBR3AtSFhaUjRJNDRFRFhvRjFoV3dEZ1JwUERsX3IxWUZfQ29PTG1jczRRb20zNzdVcUpyMkxR?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-04",
    "image": {
      "src": "/covers/argentina-cape-verde-world-cup.png",
      "alt": "An empty floodlit football stadium at night, a single ball resting on the centre spot amid drifting confetti.",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 4 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Histories (Book 7: Thermopylae), Herodotus (c. 430 BC) — a tiny band hurls itself at an overwhelming host with reckless valour, as debutant Cape Verde did against the reigning champions",
        "href": "https://anthonyhollingsworth.com/resources/Battle-of-Thermopylae-Herodotus.pdf",
        "excerpt": "The Hellenes with Leonidas, feeling that they were going forth to death, now advanced out much further than at first into the broader part of the defile... they displayed upon the Barbarians all the strength which they had, to its greatest extent, disregarding danger and acting as if possessed by a spirit of recklessness.",
        "source": "Herodotus, The Histories (Macaulay translation)"
      },
      {
        "category": "historical",
        "title": "History of the Peloponnesian War (Book 7: the Sicilian Expedition), Thucydides (c. 400 BC) — the overwhelming favourite's grand campaign brought to the brink of ruin, an echo of the scare Argentina survived",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Thuc.+7.87",
        "excerpt": "Few of many returned home. And thus passed the business concerning Sicily.",
        "source": "Perseus Digital Library, Tufts University"
      },
      {
        "category": "literary",
        "title": "1 Samuel 17 (David and Goliath), King James Bible (1611) — the small shepherd who fells the giant, the frame every report reached for as a tiny island nation staggered the holders",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/1_Samuel",
        "excerpt": "Thou comest to me with a sword, and with a spear, and with a shield: but I come to thee in the name of the LORD of hosts, the God of the armies of Israel, whom thou hast defied. ... So David prevailed over the Philistine with a sling and with a stone, and smote the Philistine, and slew him; but there was no sword in the hand of David.",
        "source": "Wikisource"
      },
      {
        "category": "literary",
        "title": "Ulysses, Alfred, Lord Tennyson (1842) — the aged hero who refuses to rest or yield, mirroring Messi's persistence as he pressed on for the Golden Boot lead",
        "href": "https://en.wikisource.org/wiki/Ulysses_(Tennyson)",
        "excerpt": "that which we are, we are; / One equal temper of heroic hearts, / Made weak by time and fate, but strong in will / To strive, to seek, to find, and not to yield.",
        "source": "Wikisource"
      },
      {
        "category": "artistic",
        "title": "David with the Head of Goliath, Caravaggio (c. 1610) — the young giant-slayer grasping the vanquished giant's severed head, the ultimate image of the underdog overturning the mighty",
        "href": "https://commons.wikimedia.org/wiki/File:David_with_the_Head_of_Goliath-Caravaggio_(1610).jpg",
        "excerpt": "Caravaggio freezes the aftermath of the upset: a pensive young David lifts the dripping head of the fallen giant out of deep shadow, the whole drama staked on a single unlikely stone. The vanquished colossus, dwarfing the boy in life, is reduced to a trophy in the underdog's grip. It is the definitive picture of the small felling the great.",
        "source": "Wikimedia Commons",
        "image": {
          "src": "/covers/argentina-cape-verde-world-cup--art.png",
          "alt": "Caravaggio's David with the Head of Goliath, the underdog boy holding the slain giant's head — a visual analogy for tiny Cape Verde staggering the champions",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Saul, George Frideric Handel (1738) — an oratorio that opens with all Israel hailing the young giant-killer's victory, celebrating the underdog whose feat unsettles the mighty",
        "href": "https://imslp.org/wiki/Saul,_HWV_53_(Handel,_George_Frideric)",
        "excerpt": "Handel's dramatic oratorio opens in the glow of David's triumph over Goliath, the massed chorus swelling in exultation as a nation salutes a shepherd boy who toppled a giant. The music turns that improbable victory into communal jubilation before envy and downfall follow. Its opening captures exactly the roar that greets an underdog who humbles a colossus.",
        "source": "IMSLP (International Music Score Library Project)"
      }
    ],
    "rank": 8
  },
  {
    "slug": "egypt-australia-world-cup-shootout",
    "headline": "Salah's Egypt beat Australia 4-2 on penalties to reach the World Cup knockout stage for the first time",
    "overview": "Mohamed Salah converted a Panenka penalty as Egypt beat Australia 4-2 in a shootout on Saturday, after the last-32 match finished 1-1, to reach the World Cup knockout stage for the first time in the nation's history. The Socceroos, still searching for a first World Cup knockout win, were left heartbroken. Egypt advance to the round of 16.",
    "genre": "Culture",
    "sources": [
      {
        "name": "ESPN",
        "href": "https://news.google.com/rss/articles/CBMisgFBVV95cUxPa2k2bnJEcXlzdFg3dGZudk9VQjBjZkxrSTFWOVpVaUZLTVJOM1Y0UThTNjJ0VlFDRmxZR2xULWxMaGs5UU9vOWpMb0gtOXkweTUwa3ZIVm1yWWVUaTkzM2VRYkhydjNCMHFUeGpsTDh3Ym9TNUIza1VhTHFRX1REekxGYk82M2R1WlZFX3VfbUtMWWUwTUM1Vm85YWxzQVZJNGNqb3VFcnZ2RHp3T3ZjY2dn?oc=5"
      },
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMilgFBVV95cUxOMEctZ3hfTXA1MTRhQTV4VTF6aXl2dDJtVEJSRDFYelFPeFpISXdSZlpBWTF1a1A5QVZMVDhKdFNtT0FZeUxiYlkzX2NXRXJrSEJmaFZoQ25wQjRHWXNJbFgxWWc0SWg1YnR5VUFmV0tTbmYzZzVvaEVpNnRmczc1Y2ZHTUJvTDYzS0w3MWdqNW1JcllMM3c?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-04",
    "image": {
      "src": "/covers/egypt-australia-world-cup-shootout.png",
      "alt": "A lone football resting on the penalty spot before an empty goal in a brightly floodlit stadium at night.",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 4 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Histories, Book 6 (Battle of Marathon), Herodotus (c. 430 BCE) — a free people daring to charge the mighty and win for the first time, as Egypt first broke into the knockout stage",
        "href": "https://lexundria.com/hdt/6.112/mcly",
        "excerpt": "for they were the first of all the Hellenes about whom we know who went to attack the enemy at a run, and they were the first also who endured to face the Median garments and the men who wore them, whereas up to this time the very name of the Medes was to the Hellenes a terror to hear.",
        "source": "Lexundria (Herodotus, trans. G. C. Macaulay)"
      },
      {
        "category": "historical",
        "title": "Inscription of the Battle of Kadesh, Ramesses II (c. 1274 BCE) — an Egyptian leader charging alone when his own had fled, as Salah shouldered a whole nation under pressure",
        "href": "https://archive.org/stream/ancientrecordsof03brea/ancientrecordsof03brea_djvu.txt",
        "excerpt": "I charged all countries, while I was alone, my infantry and my chariotry having forsaken me. Not one among them stood to turn about.",
        "source": "Internet Archive — Breasted, Ancient Records of Egypt, Vol. III (1906)"
      },
      {
        "category": "literary",
        "title": "David and Goliath (1 Samuel 17), King James Bible (1611) — the audacious underdog felling the giant with one decisive stroke, mirroring Salah's cheeky Panenka",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/1_Samuel",
        "excerpt": "And David put his hand in his bag, and took thence a stone, and slang it, and smote the Philistine in his forehead, that the stone sunk into his forehead; and he fell upon his face to the earth.",
        "source": "Wikisource (King James Bible)"
      },
      {
        "category": "literary",
        "title": "Olympian Ode 1, Pindar (476 BCE) — the victory ode immortalizing a single champion's triumph carried home in glory to his people",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0162:book=O.:poem=1",
        "excerpt": "Water is best, and gold, like a blazing fire in the night, stands out supreme of all lordly wealth.",
        "source": "Perseus Digital Library (trans. Diane Arnson Svarlien)"
      },
      {
        "category": "artistic",
        "title": "The Narmer Palette, ancient Egyptian (c. 3100 BCE) — the earliest monument to a first-ever national triumph, its ruler standing victorious over the fallen foe",
        "href": "https://commons.wikimedia.org/wiki/File:Narmer_Palette.jpg",
        "excerpt": "Carved in green siltstone more than five thousand years ago, the palette shows King Narmer, the tall white crown on his head, raising a mace to strike down a kneeling enemy. Rows of bound and fallen foes and paired long-necked beasts frame the scene, celebrating one leader who bound Upper and Lower Egypt into a single people. It is Egypt's oldest image of a nation carried, by one man, into an unprecedented new era.",
        "source": "Wikimedia Commons",
        "image": {
          "src": "/covers/egypt-australia-world-cup-shootout--art.png",
          "alt": "The Narmer Palette showing an Egyptian king triumphant over a fallen enemy — the first unification of a nation, echoing Egypt's first-ever World Cup breakthrough",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Triumphal March (Gloria all'Egitto) from Aida, Giuseppe Verdi (1871) — Egypt's grand victory anthem for a hero's homecoming triumph",
        "href": "https://imslp.org/wiki/A%C3%AFda_(Verdi,_Giuseppe)",
        "excerpt": "As Act II opens, blazing trumpets in a bright key of victory herald the return of Egypt's conquering hero, and the chorus thunders its hymn of glory to the nation. The march swells with pageantry — massed brass, jubilant rhythms, and a roaring crowd hailing their champion. Verdi's music captures exactly the ecstasy of a people greeting an unprecedented, hard-won triumph.",
        "source": "IMSLP (Petrucci Music Library)"
      }
    ],
    "rank": 9
  },
  {
    "slug": "dearborn-fairlane-mall-shooting",
    "headline": "Two killed in shooting at the Fairlane Town Center mall in Dearborn, Michigan; two in custody",
    "overview": "A shooting at the Fairlane Town Center mall in Dearborn, in suburban Detroit, left two people dead and another wounded, and two suspects were taken into custody, police said Saturday. Investigators were working to determine a motive for the violence at the shopping center. The mall was evacuated as officers responded.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMiogFBVV95cUxQY29UQWxsVHFlMkZKS21KMmR4LTl3VG9nQmgzYTQzUnpBbzh3YmsybjlMNFJ5aUl3cnRQclhIa3F1TlVrRjdTalNaR1VBbGNYajJCMC1Wc0lPYkF2YWdDV005UUdObEtKSUh1SUZFLVo1TXpRR1pxTWxaSmE0Z282TVZ6T2dReDU5czFKMUplMnJnWnRlTnY4QXhMYU1MUEl3dFE?oc=5"
      },
      {
        "name": "The Detroit News",
        "href": "https://news.google.com/rss/articles/CBMi2gFBVV95cUxNZ0VSQU0zVEMtazBhemZEcDVJQ21WcUNHYkNaUldXVThBRS0wcXNUSkZGVnVqdnc3clhuQUZGczJvRFhZeHc3djhaaWlvbWpSQUJaUjMxMkZsSWtLNGROVkctczNDRzFiNjd3M09BbHNXVU1mZ1hOZzNudE5hbFM3Vl9rZFpGT3o4VF8xVFFxRDdfZllQTzJta0VxRS0xeXY0WEljeE1jX25IVnhhOC1nVENwMXd5SkRnNFFYQ2ZTVW1nbmpoSkd4V05GRzBRM0lFZWFwZHY4cE9VZw?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-04",
    "image": {
      "src": "/covers/dearborn-fairlane-mall-shooting.png",
      "alt": "An empty shopping-mall concourse at night, polished floor reflecting shuttered storefronts and a lone security light.",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 4 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "A Short Narrative of the Horrid Massacre in Boston, Boston Town Committee (1770) — soldiers open fire on an ordinary street crowd, the archetype of sudden lethal violence erupting in a public place",
        "href": "https://www.digitalhistory.uh.edu/active_learning/explorations/revolution/account2.cfm",
        "excerpt": "One gun was fired first; then others in succession and with deliberation, till ten or a dozen guns were fired.",
        "source": "Digital History (University of Houston)"
      },
      {
        "category": "historical",
        "title": "A Concise History of the Great Trial of the Chicago Anarchists in 1886, Dyer D. Lum (1886) — a bomb turns a crowded market square into a scene of instant death, a marketplace turned deadly",
        "href": "https://archive.org/stream/ldpd_14875839_000/ldpd_14875839_000_djvu.txt",
        "excerpt": "It rose about twenty feet in the air, describing a curve, and fell right in the middle of the street and among the marching police. It gave a red glare while in the air. The bomb lay on the ground for a few seconds, then a loud explosion occurred, and the crowd took to their heels, scattering in all directions.",
        "source": "Internet Archive"
      },
      {
        "category": "literary",
        "title": "When Lilacs Last in the Dooryard Bloom'd, Walt Whitman (1865) — a nation's recurring public mourning for a life cut down by sudden violence",
        "href": "https://americanliterature.com/author/walt-whitman/poem/when-lilacs-last-in-the-dooryard-bloomd",
        "excerpt": "When lilacs last in the dooryard bloom'd, / And the great star early droop'd in the western sky in the night, / I mourn'd, and yet shall mourn with ever-returning spring. / Ever-returning spring, trinity sure to me you bring, / Lilac blooming perennial and drooping star in the west, / And thought of him I love.",
        "source": "American Literature"
      },
      {
        "category": "literary",
        "title": "The Book of Lamentations 1:1, King James Bible (1611) — grief over a once-thronged place left desolate, the fragility of civic peace",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Lamentations",
        "excerpt": "How doth the city sit solitary, that was full of people! how is she become as a widow!",
        "source": "Wikisource"
      },
      {
        "category": "artistic",
        "title": "The Third of May 1808, Francisco de Goya (1814) — anonymous civilians gunned down without warning, ordinary life shattered by sudden lethal violence",
        "href": "https://commons.wikimedia.org/wiki/File:El_Tres_de_Mayo,_by_Francisco_de_Goya,_from_Prado_thin_black_margin.jpg",
        "excerpt": "Goya's oil painting confronts the viewer with faceless soldiers leveling their muskets at unarmed townspeople in the dark. A man in a white shirt throws his arms wide in terror as the dead already lie bloodied at his feet. The canvas turns anonymous slaughter into an enduring image of innocent life extinguished in an instant.",
        "source": "Wikimedia Commons",
        "image": {
          "src": "/covers/dearborn-fairlane-mall-shooting--art.png",
          "alt": "Goya's The Third of May 1808, showing a firing squad executing unarmed civilians, evoking sudden lethal violence against ordinary people",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Requiem in D minor, K.626, Wolfgang Amadeus Mozart (1791) — the music of mourning, a mass for the dead answering senseless loss",
        "href": "https://imslp.org/wiki/Requiem_in_D_minor,_K.626_(Mozart,_Wolfgang_Amadeus)",
        "excerpt": "Mozart's unfinished funeral mass gathers grief into sound, its pleading Requiem aeternam and thundering Dies irae voicing both sorrow and dread. The work has become a universal soundtrack for public mourning after violent death. It transforms private loss into a collective rite of remembrance.",
        "source": "IMSLP"
      }
    ],
    "rank": 10
  },
  {
    "slug": "sudan-el-obeid-rsf-drone-strikes",
    "headline": "Drone strikes kill at least 45 civilians in Sudan's El-Obeid as the UN warns of a deepening catastrophe",
    "overview": "Drone strikes by the paramilitary Rapid Support Forces killed at least 45 civilians in the city of El-Obeid in Sudan's North Kordofan state, aid officials said Saturday, as the United Nations warned of a deepening humanitarian catastrophe. The relentless bombardment struck a densely populated area amid the country's grinding civil war. The strikes drew condemnation from rights groups.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Punch",
        "href": "https://news.google.com/rss/articles/CBMigwFBVV95cUxQTFRXQ3JQSHdDNk1vMWlVUXhBaUtPeWhJMVdITmZyUlBJNUxWZnNzckd2SF80aVRrSGRGS010Z2I5SUVSNmwyemxIU05HeU9Ca2hYdGtiRm54dUYwMWg0M2pFNHdkM2M2YXFUUXFzWEduZGZjVFdTWGJXV0ItUUN5U0Y3bw?oc=5"
      },
      {
        "name": "NewsCord",
        "href": "https://news.google.com/rss/articles/CBMizwFBVV95cUxOaUJoRzk4Y0lsRnMwSm5XTmNLSWt6dHlZdFljak1pTjlLS21kOUdYbzI2WW80UjhQbkwyaDR4UXhPQm5aUkgxMjlBdUFLejAzWUxaXzdRbWduejVzS01MNGhaaHJieVVKSXgxOHZiZk1GTW96ZFl0cVRNRGptTEloZTZNUkMxUUxjMlhLeDZOVmExVkh3N1paVG9nZlF2d1laM29pN3RzS2IyUV9Vekxsb0U5YWRlUUprSU9CTFlxVDlsV0JfUHh4aU9laFk5dEU?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-04",
    "image": {
      "src": "/covers/sudan-el-obeid-rsf-drone-strikes.png",
      "alt": "A shattered, deserted street in a North African city at dusk, dust hanging in the air and rubble strewn across the road.",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 4 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Massacre at Mycalessus, Thucydides, History of the Peloponnesian War (c. 413 BC) — a mercenary raid falls on an undefended town and butchers its civilians, prefiguring paramilitary strikes on El-Obeid's crowded streets",
        "href": "https://classics.mit.edu/Thucydides/pelopwar.7.seventh.html",
        "excerpt": "The Thracians bursting into Mycalessus sacked the houses and temples, and butchered the inhabitants, sparing neither youth nor age, but killing all they fell in with, one after the other, children and women... they attacked a boys' school, the largest that there was in the place, into which the children had just gone, and massacred them all.",
        "source": "The Internet Classics Archive (MIT)"
      },
      {
        "category": "historical",
        "title": "The Wars of the Jews (Siege of Jerusalem, AD 70), Flavius Josephus (c. AD 75) — an eyewitness account of a besieged city's streets choked with the dead, echoing the UN's warning of catastrophe in El-Obeid",
        "href": "https://penelope.uchicago.edu/josephus/war-6.html",
        "excerpt": "The ground did no where appear visible, for the dead bodies that lay on it; but the soldiers went over heaps of those bodies, as they ran upon such as fled from them.",
        "source": "LacusCurtius (University of Chicago)"
      },
      {
        "category": "literary",
        "title": "Aeneid, Virgil, Book II (19 BC) — Aeneas watches Troy burn and its people slaughtered by night, the archetype of a populous city destroyed in war",
        "href": "https://www.gutenberg.org/files/228/228-h/228-h.htm",
        "excerpt": "An ancient and imperial city falls: / The streets are fill'd with frequent funerals; / Houses and holy temples float in blood.",
        "source": "Project Gutenberg"
      },
      {
        "category": "literary",
        "title": "The Book of Lamentations (King James Version, 1611) — a lament over a stormed and starving Jerusalem, its dead of every age strewn in the streets, as in bombarded El-Obeid",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Lamentations",
        "excerpt": "The young and the old lie on the ground in the streets: my virgins and my young men are fallen by the sword; thou hast slain them in the day of thine anger; thou hast killed, and not pitied.",
        "source": "Wikisource (King James Bible)"
      },
      {
        "category": "artistic",
        "title": "Pillage and Burning of a Village, Jacques Callot (1633) — plate 7 of 'Les Grandes Misères de la guerre,' among the first anti-war images, showing soldiers torching a village and cutting down its inhabitants",
        "href": "https://commons.wikimedia.org/wiki/File:Les_mis%C3%A8res_et_les_malheurs_de_la_guerre_-_07_-_Pillage_et_incendie_d%27un_village.png",
        "excerpt": "Callot's small, densely detailed etching shows armed men swarming a village as its houses go up in flames. In the foreground inhabitants are beaten, stabbed, and dragged from their homes while smoke boils over the rooftops. The scene distills war's indiscriminate cruelty toward a defenseless civilian community, the same horror now visited from the sky on El-Obeid.",
        "source": "Wikimedia Commons",
        "image": {
          "src": "/covers/sudan-el-obeid-rsf-drone-strikes--art.png",
          "alt": "Jacques Callot's 1633 etching 'Pillage and Burning of a Village': soldiers loot and set fire to a village and kill its inhabitants, mirroring the bombardment of civilians in El-Obeid",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Estragos de la guerra (Ravages of War), Francisco Goya (c. 1810–15, pub. 1863) — plate 30 of 'Los Desastres de la Guerra,' civilians killed in an instant inside their own home by an explosion",
        "href": "https://commons.wikimedia.org/wiki/File:Plate_30_from_%27The_Disasters_of_War%27_(Los_Desastres_de_la_Guerra)-_%27_Ravages_of_War%27_(Estragos_de_la_guerra)_MET_DP817374.jpg",
        "excerpt": "Goya depicts a home collapsing under the blast of a bombardment, its ceiling and walls torn open. A mother and infant, a fallen man, and ordinary household objects are hurled together amid the rubble. The image captures the sudden annihilation of domestic life by a weapon striking from without, the very fate of families killed by drone strikes on a crowded city.",
        "source": "Wikimedia Commons"
      }
    ],
    "rank": 11
  },
  {
    "slug": "chess-federation-suspends-former-champion",
    "headline": "World chess federation suspends a former world champion who accused Daniel Naroditsky of cheating",
    "overview": "The international chess federation has suspended a former world champion who had publicly accused American grandmaster Daniel Naroditsky of cheating, officials said. The governing body took disciplinary action over the unsubstantiated allegations. The case has roiled the elite chess world.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMiowFBVV95cUxQZXVEdkhVYXBsdTB5VGJZbHF0RXlHbXdLZDVBZ3dRaW1hYlRzZEZNNl92NjZ6aUoyQmNFQjBWN3pQSXZGMmNvcXdZWVlySHVjN3FJNHZIbTd5SHA3SHlTYjd4em5DZFZld09nby03bWZMR1p2UE53cFU1bmlFZm4zbmRqMERadmhrQzZfSjBvLUdnTnQ5ajZrMzdGN3lYSVVpRWk4?oc=5"
      },
      {
        "name": "ABC News",
        "href": "https://news.google.com/rss/articles/CBMirgFBVV95cUxQcVBUblVDVU9IdWtQME1hT2hzQjc3aHVBVmVNaW1PQ1pFS1hzWkEzWkhHNS1paXU3TEFFSldqbml5R2RROW15YzZaM2YyOEdvSXdFM3QtRlQ2MFQ3NXB3OFpHbGd3UGQzVFpmekxIMGZNX2ZpYm1WYU5kV1libWRGT1BXZk5fM0xPSXJMMERlQWFkLXNQSEFILVVhV3QwaVF5SjAtUnE2YlNQTGI4cGfSAbMBQVVfeXFMUHQ0azNyY3JjWjl0a1hHaWc1Nk52ZjZ3b1dUUTVxUWNVME9IQlFGYXQ4TVVUREFsNXRQZk1UQzRYZVV6elJBRDIzUXNoQVhlc3ZZYWRLREY2UGtrQnNYdl9HeXgyU3dRcHRVN24wRkFYWkp0TXhhZVROamZ0WkhFci03UExSeHVqczR1cXdIUHl3cmgySFI2dXpDVWhlaDJ3S2NnZmx6dHZDVGx5WjQxSlZjRGc?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-04",
    "image": {
      "src": "/covers/chess-federation-suspends-former-champion.png",
      "alt": "A wooden chessboard mid-game lit from the side, a toppled black king lying beside the remaining pieces.",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 4 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Maelzel's Chess-Player, Edgar Allan Poe (1836) — a celebrated chess 'automaton' exposed as a fraud, the deception at the heart of the game laid bare",
        "href": "https://en.wikisource.org/wiki/Maelzel%27s_Chess-Player",
        "excerpt": "It is quite certain that the operations of the Automaton are regulated by mind, and by nothing else.",
        "source": "Wikisource"
      },
      {
        "category": "historical",
        "title": "'Oates, Titus' in the Dictionary of National Biography (1885–1900) — the accuser whose sensational plot collapsed into perjury, and who was disgraced, pilloried and whipped for his lies",
        "href": "https://en.wikisource.org/wiki/Dictionary_of_National_Biography,_1885-1900/Oates,_Titus",
        "excerpt": "The prisoner was found guilty upon both indictments, and nine days later Jeffreys deputed Sir Francis Wythens to pronounce sentence.",
        "source": "Wikisource"
      },
      {
        "category": "literary",
        "title": "Othello, William Shakespeare (1603) — Iago's whispered, unfounded slander topples a great man, though 'good name' is 'the immediate jewel' of the soul",
        "href": "https://www.gutenberg.org/files/1531/1531-h/1531-h.htm",
        "excerpt": "Good name in man and woman, dear my lord, / Is the immediate jewel of their souls. / Who steals my purse steals trash.",
        "source": "Project Gutenberg"
      },
      {
        "category": "literary",
        "title": "The Game and Playe of the Chesse, William Caxton (1474) — the medieval 'game of kings' cast as a mirror of wisdom, virtue and just rule",
        "href": "https://www.gutenberg.org/files/10672/10672-h/10672-h.htm",
        "excerpt": "It is a werke of ryght special recomendacion to enforme and to late vnderstonde wysedom and vertue",
        "source": "Project Gutenberg"
      },
      {
        "category": "artistic",
        "title": "Die Schachspieler (The Chess Players), Moritz Retzsch (1831) — a man gambles his soul in a chess match against the Devil, a master poised on the edge of ruin",
        "href": "https://commons.wikimedia.org/wiki/File:Die_Schachspieler_-_Les_joueurs_d%27%C3%A9checs_-_The_Chess_Players.jpg",
        "excerpt": "A young man leans over a chessboard set upon a tomb, locked in a match against a leering Devil who plays for his soul while his guardian angel looks on. The black pieces are carved as the vices—Pride, Deceit, Envy—that will undo him. It is the picture of a player brought to the brink of disgrace by a single, fateful game.",
        "source": "Wikimedia Commons",
        "image": {
          "src": "/covers/chess-federation-suspends-former-champion--art.png",
          "alt": "Retzsch's Die Schachspieler: a man playing chess with the Devil for his soul, mirroring a chess master brought low",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Otello, Giuseppe Verdi and Arrigo Boito (1887) — Iago's 'Credo,' the aria of a man who makes lying and false accusation his creed",
        "href": "https://it.wikisource.org/wiki/Otello_(Boito)/Atto_secondo/Scena_seconda",
        "excerpt": "Credo in un Dio crudel che m'ha creato / simile a sè e che nell'ira io nomo.",
        "source": "Wikisource"
      }
    ],
    "rank": 12
  },
  {
    "slug": "congo-ebola-outbreak-worst-ever",
    "headline": "Africa CDC says the Congo Ebola outbreak may be its worst ever and approves a $319 million response",
    "overview": "The Africa Centres for Disease Control and Prevention said the Ebola outbreak in the Democratic Republic of Congo may be the worst on record and approved a $319 million response plan covering the DRC and Uganda, officials said Saturday. Health authorities warned that cases were still climbing. The funding will support treatment, vaccination and containment across the affected regions.",
    "genre": "Science",
    "sources": [
      {
        "name": "AOL",
        "href": "https://news.google.com/rss/articles/CBMitAFBVV95cUxOYWhhSGdpOHhIbEdxS1JTTDNtRDFtQk5CLVBvTW02Z3lKa0VKSk10dzdnNDB5ZXZjd3VPQWJDczlwRlJUdENROTZTSVdMajdkRUFoeWNJT1R3U2hBWDhKYUlsY3pHSlhQZ3JjT3hPd01HUVBVREd5dHJlZ21IRjBoZHhiOE55Y1E0VldlQTFFM3FOR3VNZVYtLXZWNC1mS2xPTVZONFdLTFA0cjhIN1NTSmlmcXg?oc=5"
      },
      {
        "name": "MSN",
        "href": "https://news.google.com/rss/articles/CBMizgJBVV95cUxPejBWMml6QnhQR2FyMnh1NU1GZlcycXNWYUdKREs5TnZnOUFwSGkyakxiT2FKSkEyQ0xMOW9qZjdlVU1XU3ZlWi1UQy00WG11SnVTc3VOTVc0RU52YVZsZDJmUVoxZG50RGlLdjRiMy1HTVZTalpERUxmc3BrX1lkS1NEbGxlUEtCLWhrQXY0UGcwRjRTT3VINno3VmlGX09VQTZYT1Y5SFhjUWdZeGIwNWJoeC1QSVlJY0NBSUZRNVYtemdfVHRDVUdqZm5DLVlHMkJ1blBPVlctdlF3cjFaZXBlb1BNMlQwNjdpeFp4VWdPWWRCZ0RoUDZmOFU2UVg4XzRrcGlkR3AxN3EwRUM1aUROa19jTHp4SmQwUGVOanF0MXBvUTFzLXVHX1ZkQVF1SHp5dkJ4NzVESTl0dnAwQmNvc3oxazVQbzZvVTRn?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-04",
    "image": {
      "src": "/covers/congo-ebola-outbreak-worst-ever.png",
      "alt": "A row of empty protective medical suits and face shields hanging in a dim field-clinic tent.",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 4 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "History of the Peloponnesian War (Plague of Athens), Thucydides (c. 430 BCE) — an epidemic that outstripped every physician, as the Congo outbreak overwhelms responders",
        "href": "https://en.wikisource.org/wiki/History_of_the_Peloponnesian_War/Book_2",
        "excerpt": "Neither were the physicians at first of any service, ignorant as they were of the proper way to treat it, but they died themselves the most thickly, as they visited the sick most often; nor did any human art succeed any better.",
        "source": "Wikisource"
      },
      {
        "category": "historical",
        "title": "History of the Wars (Plague of Justinian), Procopius (c. 550 CE) — a pestilence that respected no border, mirroring warnings that DRC cases are still climbing",
        "href": "https://sourcebooks.fordham.edu/source/542procopius-plague.asp",
        "excerpt": "it embraced the entire world, and blighted the lives of all men, though differing from one another in the most marked degree, respecting neither sex nor age.",
        "source": "Fordham Medieval Sourcebook"
      },
      {
        "category": "literary",
        "title": "The Decameron (Introduction), Giovanni Boccaccio (1353) — medicine helpless before contagion, echoing the scramble for treatment in Congo",
        "href": "https://www.gutenberg.org/files/23700/23700-h/23700-h.htm",
        "excerpt": "To the cure of these maladies nor counsel of physician nor virtue of any medicine appeared to avail or profit aught",
        "source": "Project Gutenberg"
      },
      {
        "category": "literary",
        "title": "A Journal of the Plague Year, Daniel Defoe (1722) — mounting death bills that undercount the true toll, as Africa CDC warns cases keep rising",
        "href": "https://www.gutenberg.org/files/376/376-h/376-h.htm",
        "excerpt": "The second week in June, the parish of St Giles, where still the weight of the infection lay, buried 120, whereof though the bills said but sixty-eight of the plague, everybody said there had been 100 at least",
        "source": "Project Gutenberg"
      },
      {
        "category": "artistic",
        "title": "The Plague of Ashdod, Nicolas Poussin (1630–1631) — a city convulsed by contagion, its dead and dying strewn through the streets like a society under siege",
        "href": "https://commons.wikimedia.org/wiki/File:The_plague_of_ashdod_1630.jpg",
        "excerpt": "Poussin stages a stricken city where the plague-dead sprawl across the foreground and survivors recoil, pinching their noses against the pestilential air. Panic radiates outward as figures flee and mothers collapse over infants, dramatizing a whole community overwhelmed by an unstoppable epidemic. The scene captures exactly the fear behind a $319 million emergency response: contagion outpacing any human effort to contain it.",
        "source": "Wikimedia Commons",
        "image": {
          "src": "/covers/congo-ebola-outbreak-worst-ever--art.png",
          "alt": "Nicolas Poussin's The Plague of Ashdod, showing a city overwhelmed by epidemic dead and dying, paralleling the Congo Ebola outbreak",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Danse macabre, Op. 40, Camille Saint-Saëns (1874) — the old dance of death set to music, evoking pestilence sweeping indiscriminately through the living",
        "href": "https://imslp.org/wiki/Danse_macabre,_Op.40_(Saint-Sa%C3%ABns,_Camille)",
        "excerpt": "Saint-Saëns' tone poem summons Death as a fiddler leading skeletons in a whirling nocturnal dance, a xylophone rattling like dry bones over a feverish waltz. Rooted in the medieval plague-era imagery of the danse macabre, it renders mortality as a force that gathers rich and poor alike into its rhythm. The relentless, accelerating figure resonates with an outbreak Africa CDC fears may be its worst ever, still gathering victims.",
        "source": "IMSLP"
      }
    ],
    "rank": 13
  },
  {
    "slug": "nato-ankara-summit-declaration",
    "headline": "NATO ambassadors approve summit text affirming 'ironclad' Article 5 commitment and €70bn for Ukraine",
    "overview": "NATO ambassadors on Friday approved the declaration for next week's July 7-8 leaders' summit in Ankara, in which all 32 members including US President Donald Trump will reaffirm an \"ironclad commitment\" to collective defence under Article 5 — that \"an attack on one is an attack on all.\" The text also pledges €70 billion ($80 billion) in military aid to Ukraine for 2026, with at least equivalent support in 2027. The wording is striking given Trump's past doubts over whether Washington would defend allies he considers to be underspending on their own security.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMi1wFBVV95cUxNR21mS1FvbzMzXzlxSUFEVVV5ZENiRktERHRtQ1hycW16UmphZF9RdUEybTVmYjNkOWY4dTFvZ3MyVlZPSnVaLVU2dS1DRjBkempBVkRvd2NROFBkRjlTajI5cjVLSjBxSzlaWmp2Z1RxQVlPaFBJMjQzNUd0VUdFejN1OVItOEhTQUtQU1Zzc2VfU0xQUFgxdWlvZEJfYUROWG9ZMlBhZUNsaTNLWDVzcTc0b2pLc0pRWDBkUGVSbTljVjNudFhGcU84amZSb1dPTzN2TDN0TQ?oc=5"
      },
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMirAFBVV95cUxPMEJ2U2h1dUV2aFNOZUt1b0NJTkduUEE0RENuNjNqV0JxZjFCNzczV2tnVWNGZXYyOXBTT0s2MkoyYXphVDNCdlZ4bk14cE5NVzhWLThpUEN0NXVSc09WZzVjSG04eDZDMXRJQXdoTjRqRlFNNEZmLTNIRGQtM2c1N3NKUmJYaU53N1FGU1RFUHFaTXM3c2Y3S0hsU3dUVVcxaVRiMlU3b3lZYzgw?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-03",
    "image": {
      "src": "/covers/nato-ankara-summit-declaration.png",
      "alt": "A ring of bare flagpoles before a grand government facade under a brooding sky, evoking an alliance closing ranks.",
      "credit": "AI-generated"
    },
    "lead": true,
    "edition": "Evening Edition · 3 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "History of the Peloponnesian War, Thucydides (c. 400 BCE) — the Delian League, in which many Greek city-states pooled ships and tribute under Athens for common defence, prefigures NATO's collective-security compact.",
        "excerpt": "The Athenians having thus succeeded to the supremacy by the voluntary act of the allies through their hatred of Pausanias, fixed which cities were to contribute money against the barbarian, which ships; their professed object being to retaliate for their sufferings by ravaging the king's country. Now was the time that the office of 'Treasurers for Hellas' was first instituted by the Athenians. These officers received the tribute, as the money contributed was called. The tribute was first fixed at four hundred and sixty talents. The common treasury was at Delos, and the congresses were held in the temple.",
        "source": "Perseus (Tufts)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0200%3Abook%3D1%3Achapter%3D96"
      },
      {
        "category": "historical",
        "title": "The Federal Charter of 1291, the Three Forest Cantons of Switzerland (1291) — Uri, Schwyz and Unterwalden swear mutual aid 'against one and all,' an early 'attack on one is an attack on all' oath of union.",
        "excerpt": "have promised in good faith to assist each other with aid, with every counsel and every favor, with person and goods, within the valley and without, with might and main, against one and all, who may inflict upon any one of them any violence, molestation or injury, or may plot any evil against their persons or goods.",
        "source": "The Constitution Society (constitution.org)",
        "href": "https://www.constitution.org/cons/swiss/Swiss_Federal_Charter_1291.html"
      },
      {
        "category": "literary",
        "title": "The Three Musketeers, Alexandre Dumas (1844) — the comrades' sworn motto 'All for one, one for all' as the storybook embodiment of a mutual-defence pledge among allies.",
        "excerpt": "“Hold out your hand and swear!” cried Athos and Aramis at once. Overcome by example, grumbling to himself, nevertheless, Porthos stretched out his hand, and the four friends repeated with one voice the formula dictated by D’Artagnan: “All for one, one for all.”",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/files/1257/1257-h/1257-h.htm"
      },
      {
        "category": "literary",
        "title": "The Life of King Henry V, William Shakespeare (1599) — the St Crispin's Day vow that those who fight together become a 'band of brothers,' binding allies by shared blood and sacrifice.",
        "excerpt": "We few, we happy few, we band of brothers; For he to-day that sheds his blood with me Shall be my brother; be he ne'er so vile, This day shall gentle his condition:",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/Henry_V_(1918)_Yale/Text/Act_IV"
      },
      {
        "category": "artistic",
        "title": "Oath of the Horatii, Jacques-Louis David (1784) — three brothers swearing a single unified oath of arms to their state, the neoclassical icon of the binding pledge of collective defence.",
        "excerpt": "Three brothers thrust their arms out as one toward their father, who lifts three swords aloft, their taut bodies fused into a single unbending line of resolve. The gesture welds separate wills into one sworn pact—to defend Rome even unto death. David's austere geometry makes the oath itself the subject, rendering mutual commitment as visual law.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Jacques-Louis_David_-_Oath_of_the_Horatii_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/nato-ankara-summit-declaration--art.png",
          "alt": "Jacques-Louis David's Oath of the Horatii: three Roman brothers salute with outstretched arms as their father holds up three swords, swearing a united oath to defend the state.",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Symphony No. 9 in D minor, Op. 125 ('Choral'), Ludwig van Beethoven (1824) — the choral finale's setting of Schiller's 'Ode to Joy,' proclaiming all mankind as brothers, an anthem of fraternal union echoing the allies' oath.",
        "excerpt": "In the choral finale Beethoven sets Friedrich Schiller's ode to joy, its massed voices swelling on the vow that all men shall become brothers beneath a loving heaven. The theme rises from one hushed line to a thunderous universal embrace, binding strangers into a single fellowship. Adopted as the Anthem of Europe, it endures as music's supreme hymn of union across nations.",
        "source": "IMSLP",
        "href": "https://imslp.org/wiki/Symphony_No.9,_Op.125_(Beethoven,_Ludwig_van)"
      }
    ],
    "rank": 14
  },
  {
    "slug": "monaco-parcel-bombing-ukrainian-suspect",
    "headline": "Interpol issues Red Notice for Ukrainian woman suspected of Monaco parcel bombing that wounded a sanctioned oligarch",
    "overview": "Monaco's deputy prosecutor said the prime suspect in a parcel bombing in the principality, 39-year-old Anastasiia Berezovska, was \"disguised as a man\" when she left an explosive package in the entrance hall of an apartment building on Monday evening before fleeing on foot and driving to Germany. A sanctioned Ukrainian multi-millionaire, his partner and their 13-year-old son were seriously wounded. Interpol has issued a Red Notice for Berezovska, who speaks German and is wanted for attempted murder, planting an explosive device and criminal conspiracy.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c4gy603z2qlo"
      },
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMisgFBVV95cUxOeVFEX0Zob1hIQnpZTlpfOFVmbkNJcnlKbnZ5WWlqN1BYb2dlR2oyNURsTWhVZmtrU0Y5SDduYWJ4TDNSSXdjekkyT3U5RjZDUFk3dTZGWDFLLXZzc1dUSW9PRzYwRF9TaXBDTUJYOHRuTlF5M0RyN2hCNWMtZ1ZQQm90ckZSVnhTNzZNM1dyV21HX05UUFVlV1lka2pESXFlUU0yMnIya0dod0hDanNCZ3BB?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-03",
    "image": {
      "src": "/covers/monaco-parcel-bombing-ukrainian-suspect.png",
      "alt": "A single smartphone-lit parcel on a dim marble entrance-hall floor, tense and deserted, evoking a hidden explosive device.",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 3 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Book of Judges 3:15-26, King James Bible (1611) — an assassin conceals a dagger, stabs the tyrant in his private chamber, then bolts the doors and escapes",
        "excerpt": "And Ehud came unto him; and he was sitting in a summer parlour, which he had for himself alone. And Ehud said, I have a message from God unto thee. And he arose out of his seat. And Ehud put forth his left hand, and took the dagger from his right thigh, and thrust it into his belly: And the haft also went in after the blade; and the fat closed upon the blade, so that he could not draw the dagger out of his belly; and the dirt came out. Then Ehud went forth through the porch, and shut the doors of the parlour upon him, and locked them... And Ehud escaped while they tarried, and passed beyond the quarries, and escaped unto Seirath.",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Judges"
      },
      {
        "category": "historical",
        "title": "The French Revolution: A History, Thomas Carlyle (1837) — a woman draws a concealed knife and kills the powerful demagogue Marat with a single stroke to the heart",
        "excerpt": "Their heads shall fall within a fortnight, croaks the eager People's-Friend, clutching his tablets to write: Barbaroux, Petion, writes he with bare shrunk arm, turning aside in the bath: Petion, and Louvet, and—Charlotte has drawn her knife from the sheath; plunges it, with one sure stroke, into the writer's heart. 'A moi, chere amie, Help, dear!' No more could the Death-choked say or shriek... but his life with a groan gushes out, indignant, to the shades below. And so Marat People's-Friend is ended; the lone Stylites has got hurled down suddenly from his Pillar.",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/1301/pg1301.txt"
      },
      {
        "category": "literary",
        "title": "The Book of Judith, Chapter 13 (King James Bible, Apocrypha) — a woman who uses stratagem and disguise to get close to a powerful commander and behead him in his own bed",
        "excerpt": "Then she came to the pillar of the bed, which was at Holofernes' head, and took down his fauchion from thence, And approached to his bed, and took hold of the hair of his head, and said, Strengthen me, O Lord God of Israel, this day. And she smote twice upon his neck with all her might, and she took away his head from him, And tumbled his body down from the bed, and pulled down the canopy from the pillars; and anon after she went forth, and gave Holofernes his head to her maid;",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Judith"
      },
      {
        "category": "literary",
        "title": "Agamemnon, Aeschylus (458 BCE), trans. Herbert Weir Smyth — a woman's premeditated vengeance, snaring a mighty man in a robe and striking him down",
        "excerpt": "as if to catch a haul of fish, I cast an impassable net—fatal wealth of robe—so that he should neither escape nor ward off doom. Twice I struck him, and with two groans his limbs relaxed. Once he had fallen, I dealt him yet a third stroke to grace my prayer to the infernal Zeus, the savior of the dead.",
        "source": "Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0004:card=1372"
      },
      {
        "category": "artistic",
        "title": "Judith Slaying Holofernes, Artemisia Gentileschi (c. 1620, Uffizi) — a woman killing a powerful man rendered in unflinching, visceral detail",
        "excerpt": "Gentileschi stages the biblical killing as a brutal, close-quarters struggle: Judith and her maidservant pin the thrashing Holofernes to the bed while she saws through his neck, blood spraying across the white sheets. The powerful general's strength is useless against the resolve of two determined women. The picture is often read as the artist's own defiant answer to the men who had wronged her.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Judith_Slaying_Holofernes_by_Artemisia_Gentileschi.jpg",
        "image": {
          "src": "/covers/monaco-parcel-bombing-ukrainian-suspect--art.png",
          "alt": "Artemisia Gentileschi's painting Judith Slaying Holofernes: two women hold down a man on a bed as one beheads him with a sword, blood streaming across white sheets.",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "'Der Hölle Rache kocht in meinem Herzen' from Die Zauberflöte, W. A. Mozart / libretto Emanuel Schikaneder (1791) — a vengeful woman's aria commanding the death of a powerful man",
        "excerpt": "Der Hölle Rache kocht in meinem Herzen, Tod und Verzweiflung flammet um mich her! Fühlt nicht durch dich Sarastro Todesschmerzen, So bist du meine Tochter nimmermehr.",
        "source": "IMSLP",
        "href": "https://imslp.org/wiki/Die_Zauberfl%C3%B6te,_K.620_(Mozart,_Wolfgang_Amadeus)"
      }
    ],
    "rank": 15
  },
  {
    "slug": "us-withdraws-troops-nigeria-isis",
    "headline": "US withdraws about 200 troops from Nigeria after joint operation against Islamic State in the Lake Chad Basin",
    "overview": "The United States has pulled out most of the roughly 200 soldiers it deployed to Nigeria earlier this year to help fight Islamist militants, saying the months-long joint operation in the Lake Chad Basin had \"significantly degraded\" Islamic State's leadership. The mission, launched in December with strikes on Christmas Day, killed senior IS commander Abu-Bilal al-Minuki. Nigeria's military said the withdrawal would \"not affect our momentum,\" even as jihadist groups continue to stage attacks across the country's north-east.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cwylkvpl80xo"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiwAFBVV95cUxQcldNbzFNWDVFNE1PZ2RIYjV1RGx3cUlGNHQzd1NEczRFUl9DeGpYMWwyZHhCcTFEX3JiYnZsMTZPRFl4eVJHbElValByaVhxMXEzYVROdzZ4Vk4wZmtKb1ozVWRITFRxUXV3dGdKR212YTZMWmc5NE50MkxhMWJjMWUwakh1NzkxdWZTZUdoNDV5MlgyYnFSV21oVnB1Z1FhdFBQQkVhUERyb2MwaW9ILXpEaFhmQVBzeWxCREM0a2U?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-03",
    "image": {
      "src": "/covers/us-withdraws-troops-nigeria-isis.png",
      "alt": "A remote Sahel airstrip at dawn with an idle transport aircraft and empty desert, evoking soldiers departing after a campaign.",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 3 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Anabasis (The March of the Ten Thousand), Book IV",
        "excerpt": "Presently they could hear the soldiers shouting and passing on the joyful word, \"The sea! the sea!\" Thereupon they began running, rearguard and all, and the baggage animals and horses came galloping up. But when they had reached the summit, then indeed they fell to embracing one another--generals and officers and all--and the tears trickled down their cheeks.",
        "source": "Xenophon, trans. H. G. Dakyns (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/1170/pg1170.txt"
      },
      {
        "category": "historical",
        "title": "Commentaries on the Gallic War, Book V (Caesar withdraws his army from Britain)",
        "excerpt": "When he had received the hostages, he leads back the army to the sea, and finds the ships repaired. After launching these, because he had a large number of prisoners, and some of the ships had been lost in the storm, he determines to convey back his army at two embarkations.",
        "source": "Julius Caesar, trans. W. A. McDevitte & W. S. Bohn (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/10657/pg10657.txt"
      },
      {
        "category": "literary",
        "title": "The Odyssey, Book I (the longing for a soldier's return)",
        "excerpt": "This daughter of Atlas has got hold of poor unhappy Ulysses, and keeps trying by every kind of blandishment to make him forget his home, so that he is tired of life, and thinks of nothing but how he may once more see the smoke of his own chimneys.",
        "source": "Homer, trans. Samuel Butler (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/1727/pg1727.txt"
      },
      {
        "category": "literary",
        "title": "The Return",
        "excerpt": "Peace is declared, and I return\nTo 'Ackneystadt, but not the same;\nThings 'ave transpired which made me learn\nThe size and meanin' of the game.\n\nIf England was what England seems\nAn' not the England of our dreams,\nBut only putty, brass, an' paint,\n'Ow quick we'd drop 'er! But she ain't!",
        "source": "Rudyard Kipling, from The Five Nations (1903), text via The Kipling Society",
        "href": "https://www.kiplingsociety.co.uk/poem/poems_return.htm"
      },
      {
        "category": "artistic",
        "title": "The Remnants of an Army (Jellalabad, January 13, 1842)",
        "excerpt": "A lone, swaying rider on a spent horse emerges from an empty Afghan waste toward the walls of Jalalabad: Dr. William Brydon, cast by legend as the sole survivor of an army of some 16,000 destroyed on the 1842 retreat from Kabul. Lady Butler paints not the victory that launched the campaign but its bitter remnant, the whole expedition reduced to one exhausted man. It is the image of a foreign intervention's homeward road at its most desolate.",
        "source": "Elizabeth Thompson (Lady Butler), oil on canvas, 1879, Tate (public domain)",
        "href": "https://commons.wikimedia.org/wiki/File:Remnants_of_an_army2.jpg",
        "image": {
          "src": "/covers/us-withdraws-troops-nigeria-isis--art.png",
          "alt": "Elizabeth Thompson (Lady Butler), 'The Remnants of an Army' (1879): a lone exhausted rider on a stumbling horse approaches the walls of Jalalabad across an empty plain, the sole survivor of the 1842 retreat from Kabul.",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "\"See, the Conqu'ring Hero Comes\" (chorus and march), from Judas Maccabaeus, HWV 63",
        "excerpt": "See, the conqu'ring hero comes! Sound the trumpets, beat the drums! Sports prepare, the laurel bring, Songs of triumph to him sing!",
        "source": "George Frideric Handel (music) & Thomas Morell (libretto), 1747 (public domain); score at IMSLP",
        "href": "https://imslp.org/wiki/Judas_Maccabaeus,_HWV_63_(Handel,_George_Frideric)"
      }
    ],
    "rank": 16
  },
  {
    "slug": "iran-oil-sales-japan-waiver",
    "headline": "Iran opens talks to sell oil to Japanese buyers for the first time since 2019, seeking a longer US sanctions waiver",
    "overview": "Iran has begun talks to sell crude to Japanese companies for the first time since 2019, though prospective buyers want Washington to extend a temporary sanctions waiver and to guarantee safe shipping through the Gulf, sources told Reuters. The waiver, part of 60-day peace talks between Tehran and Washington, was issued on June 22 and expires on August 21 — too soon, buyers say, given the weeks-long voyage from Iran to Japan. China has been Iran's main oil customer since President Trump withdrew from the nuclear deal in 2018.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMixAFBVV95cUxONlpxZVF6RnlianRMXzVTT05hLXpuT3FCY3pCRzMweXJjUDF5N2pJa3hYOXJzdTFpMTJpWUhKckZZWlllM2pVbzRFcGQ3SUlKZWRyNmRNaW9hNWdBNEU1d2JLYnp2YWJxU2doQXl2bVdZTDlMaWJFbHJiR19VZFVwTHAydHZudzdEN0xJWTdsczNkSmQtZVNUb0FJcjVhV0NSWWJDNEVvcFE1M0RTM2VnSFFPRm1tNGpwTklqSXdUYklQZWIy?oc=5"
      },
      {
        "name": "The Times of Israel",
        "href": "https://www.timesofisrael.com/liveblog_entry/iran-in-talks-with-japanese-companies-to-sell-oil-under-us-sanctions-waiver-sources-say/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-03",
    "image": {
      "src": "/covers/iran-oil-sales-japan-waiver.png",
      "alt": "A vast oil supertanker threading a narrow moonlit strait between dark headlands, evoking sanctioned crude returning to market.",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 3 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "History of the Peloponnesian War, Book 1.139, Thucydides (c. 431 BCE) — Sparta's ultimatum that war could be averted only by revoking the Megarian Decree, an embargo shutting Megara out of Athenian harbors and markets",
        "excerpt": "Above all, it gave her most distinctly to understand that war might be prevented by the revocation of the Megara decree, excluding the Megarians from the use of Athenian harbors and of the market of Athens.",
        "source": "Perseus",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0200%3Abook%3D1%3Achapter%3D139"
      },
      {
        "category": "historical",
        "title": "The Japan Expedition: Japan and Around the World, J. W. Spalding (1855) — a firsthand account of Commodore Perry's squadron sent to force open the ports of a nation sealed for two centuries and open its sources of trade",
        "excerpt": "The cruel treatment which had long been practised by that singular and secluded people, the Japanese, toward American whalers who were thrown by the misfortune of shipwreck upon their coasts, the incentive of mercantile cupidity, and the urgency of personal ambition, induced the government of the United States, in 1852, to project an expedition to Japan, to obtain some assurance from the government of the country against a continuance or repetition of the inhospitality and cruelty inflicted upon our unfortunate citizens, and, if possible, to open the sources of trade.",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/60403/pg60403-images.html"
      },
      {
        "category": "literary",
        "title": "The Merchant of Venice",
        "excerpt": "My ventures are not in one bottom trusted, Nor to one place; nor is my whole estate Upon the fortune of this present year. Therefore my merchandise makes me not sad.",
        "source": "William Shakespeare, via Project Gutenberg",
        "href": "https://www.gutenberg.org/files/1515/1515-h/1515-h.htm"
      },
      {
        "category": "literary",
        "title": "The First Voyage of Sindbad the Sailor, from The Arabian Nights' Entertainments",
        "excerpt": "I sold all my household goods by public auction, and joined a company of merchants who traded by sea, embarking with them at Balsora in a ship which we had fitted out between us. We set sail and took our course towards the East Indies by the Persian Gulf, having the coast of Persia upon our left hand and upon our right the shores of Arabia Felix.",
        "source": "Andrew Lang (ed.), via Project Gutenberg",
        "href": "https://www.gutenberg.org/files/128/128-h/128-h.htm"
      },
      {
        "category": "artistic",
        "title": "The Black Ship Scroll (anonymous, 1854)",
        "excerpt": "An anonymous Japanese handscroll from 1854 records the arrival of Commodore Perry's black ships as awestruck local eyes first saw them. Painted the very year Japan's ports were forced open, it captures the moment a sealed nation confronted foreign vessels riding at anchor in its waters. The scroll turns a diplomatic rupture into an intimate visual chronicle of a closed market meeting the outside world.",
        "source": "Wikimedia Commons (Honolulu Museum of Art)",
        "href": "https://commons.wikimedia.org/wiki/File:The_Black_Ship_Scroll,_anonymous,_1854,_handscroll,_Honolulu_Museum_of_Art,_2732.1.jpg",
        "image": {
          "src": "/covers/iran-oil-sales-japan-waiver--art.png",
          "alt": "Detail from the 1854 Japanese Black Ship Scroll depicting Commodore Perry's foreign vessels arriving in Japanese waters.",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Meeresstille und gluckliche Fahrt (Calm Sea and Prosperous Voyage), Op. 27",
        "excerpt": "Mendelssohn's 1828 concert overture opens on a becalmed, motionless sea, a stillness that once spelled danger for a merchant vessel dead in the water. Then the winds rise, the strings quicken, and the music carries the ship safely onward to a triumphant arrival in port. It is a musical portrait of anxious waiting giving way to safe passage across the water, the very reassurance that traders now seek through the Gulf.",
        "source": "Felix Mendelssohn, via IMSLP",
        "href": "https://imslp.org/wiki/Meeresstille_und_gl%C3%BCckliche_Fahrt,_Op.27_(Mendelssohn,_Felix)"
      }
    ],
    "rank": 17
  },
  {
    "slug": "russia-fuel-crisis-imports-rationing",
    "headline": "Facing fuel shortages from Ukrainian drone strikes, Russia moves to import gasoline by sea and rations pumps",
    "overview": "Ukrainian drone strikes have knocked out roughly a quarter of Russia's oil-refining capacity, plunging the country into a summer fuel crisis that has forced the Black Sea port of Novorossiysk to suspend gasoline sales to private drivers and pushed Moscow toward importing motor fuel by sea for the first time — a historic reversal for a major oil exporter. Many stations are rationing drivers to 20-30 litres each. President Vladimir Putin publicly shrugged off the shortages even as he intensified attacks on Ukraine.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMixwFBVV95cUxQNy1VbDFEWnlxYTVzNHpibkVYcmF4cmdPNVFXLVlYbW1rTFktQm5xaXZVN3B1cktjUmJLNWNXUWZZWk40Y0taZWdfb2dmMVdkTVBxTWZleUJQR0t2c3J5WUxPMEd4Y1hNSkNCYzBhckJySGg1Y0dHclhQQlZ3SVJsQzYyWUg2aWpYZTV4Yl9ZbWhzN0lLd29KRGpiTVhlY3pXczRzejZfSUxvYzlBVUZSMXFrT3ZoMDdYSUZ0ek82VXpidF9IOGs0?oc=5"
      },
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMirAFBVV95cUxNZkg1ZzBwMDZqYVhHLUwtUWhNbWd2eVJkOGdFcDJHZUxKWTRFc3MyZTdoWHpKczlmVTgwR2R5QjQwU0lhUmJNOVYydlppNHR3emVMaEVuQW9GY1RHU1pHVFhYcDRBeWZHcG1sVjFFYWp2blNseUZjVjRHampXU3BPeHVsWDZBMGhOUVJaaWF5dzN1bWdocWR5eFA1MU90ZlQ5cUhvTHEySXJ6LUsw?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-03",
    "image": {
      "src": "/covers/russia-fuel-crisis-imports-rationing.png",
      "alt": "A large oil refinery at night with a flare stack burning orange against a black sky, evoking energy infrastructure struck in war.",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 3 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Book of Genesis, attributed to Moses (King James Version, 1611) — Joseph stockpiles grain in Egypt's years of plenty, then rations the stores when a land of abundance is struck by famine",
        "excerpt": "47 And in the seven plenteous years the earth brought forth by handfuls. 48 And he gathered up all the food of the seven years, which were in the land of Egypt, and laid up the food in the cities: the food of the field, which was round about every city, laid he up in the same. 49 And Joseph gathered corn as the sand of the sea, very much, until he left numbering; for it was without number. ... 53 And the seven years of plenteousness, that was in the land of Egypt, were ended. 54 And the seven years of dearth began to come, according as Joseph had said: and the dearth was in all lands; but in all the land of Egypt there was bread. 55 And when all the land of Egypt was famished, the people cried to Pharaoh for bread: and Pharaoh said unto all the Egyptians, Go unto Joseph; what he saith to you, do. 56 And the famine was over all the face of the earth: And Joseph opened all the storehouses, and sold unto the Egyptians; and the famine waxed sore in the land of Egypt.",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Genesis"
      },
      {
        "category": "historical",
        "title": "The Wars of the Jews, Flavius Josephus (c. 75 AD, Whiston translation) — a wealthy Jerusalem, besieged and cut off from supply, is reduced to a horror of famine and rationing during the Roman siege",
        "excerpt": "It was now a miserable case, and a sight that would justly bring tears into our eyes, how men stood as to their food, while the more powerful had more than enough, and the weaker were lamenting [for want of it.] But the famine was too hard for all other passions, and it is destructive to nothing so much as to modesty; for what was otherwise worthy of reverence was in this case despised; insomuch that children pulled the very morsels that their fathers were eating out of their very mouths, and what was still more to be pitied, so did the mothers do as to their infants; and when those that were most dear were perishing under their hands, they were not ashamed to take from them the very last drops that might preserve their lives.",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/2850/pg2850.txt"
      },
      {
        "category": "literary",
        "title": "The Ants and the Grasshopper",
        "excerpt": "The Ants were spending a fine winter's day drying grain collected in the summertime. A Grasshopper, perishing with famine, passed by and earnestly begged for a little food. The Ants inquired of him, 'Why did you not treasure up food during the summer?' He replied, 'I had not leisure enough. I passed the days in singing.' They then said in derision: 'If you were foolish enough to sing all the summer, you must dance supperless to bed in the winter.'",
        "source": "Aesop's Fables (trans. George Fyler Townsend)",
        "href": "https://www.gutenberg.org/files/21/21-h/21-h.htm"
      },
      {
        "category": "literary",
        "title": "Water, Water, Every Where",
        "excerpt": "Water, water, every where,\nAnd all the boards did shrink;\nWater, water, every where,\nNor any drop to drink.",
        "source": "Samuel Taylor Coleridge, The Rime of the Ancient Mariner (Sibylline Leaves, 1817)",
        "href": "https://en.wikisource.org/wiki/Sibylline_Leaves_(Coleridge)/The_Rime_of_the_Ancient_Mariner"
      },
      {
        "category": "artistic",
        "title": "The Burning of the Houses of Lords and Commons, October 16, 1834",
        "excerpt": "Turner turns a national disaster into a blaze of pure light: the seat of a great power dissolves into towering sheets of fire that pour their reflection across the Thames. Crowds press along the bank and bridge, dwarfed and helpless before flames the painter deliberately magnified. It is an image of the mighty consumed, infrastructure burning while spectators can only watch.",
        "source": "J. M. W. Turner (Philadelphia Museum of Art)",
        "href": "https://commons.wikimedia.org/wiki/File:Joseph_Mallord_William_Turner,_English_-_The_Burning_of_the_Houses_of_Lords_and_Commons,_October_16,_1834_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/russia-fuel-crisis-imports-rationing--art.png",
          "alt": "Turner's oil painting of the Houses of Parliament engulfed in golden flames that blaze into the night sky and reflect across the River Thames, with crowds of spectators gathered on the riverbank and Westminster Bridge.",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Magic Fire Music (Feuerzauber) from Die Walkure",
        "excerpt": "As the opera closes, Wotan summons Loge and a ring of flame rises to encircle the sleeping Brunnhilde. Wagner's shimmering, flickering strings and glowing brass conjure fire that both punishes and protects, an all-consuming blaze born of a god's own decree. It is the sound of a mighty power ringed by the flames of its own making.",
        "source": "Richard Wagner, Die Walkure, WWV 86B (IMSLP)",
        "href": "https://imslp.org/wiki/Die_Walk%C3%BCre,_WWV_86B_(Wagner,_Richard)"
      }
    ],
    "rank": 18
  },
  {
    "slug": "tesla-robotaxi-miami",
    "headline": "Tesla launches its driverless robotaxi service in Miami, its third US market",
    "overview": "Tesla said on Friday that its robotaxi is now available in Miami, expanding the driverless ride-hailing service into a third US state as chief executive Elon Musk pivots the company toward AI and robotics. Miami joins Austin — where the unsupervised service launched last summer — along with Dallas, Houston, San Antonio and the San Francisco Bay Area. The rollout, which initially covers a small mapped zone, sharpens Tesla's competition with Alphabet's Waymo and Amazon's Zoox.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMipwFBVV95cUxOYVpPc3UwY3ZUR3huTGF5MWU4YWpKMW1BOXlkTURObnJfaXVjclAtREdhaDk1QnlVd0d5MGV1WG83cXRmd29KRXdXcThIRkhPbnM3RW9jOFhrdEIyb3dFejVNOHU0ckdlTkJtVnpMcU10WldGc3g2RGJOWlNMRjdNZms3R2FnOGk5NU12dUFLNUtmT0dnb1kzWE5SZzZoZ1BqUGNOY2xWNA?oc=5"
      },
      {
        "name": "Electrek",
        "href": "https://electrek.co/2026/07/03/tesla-robotaxi-miami-service-area-map/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-03",
    "image": {
      "src": "/covers/tesla-robotaxi-miami.png",
      "alt": "A driverless white electric car waiting on a palm-lined Miami street at dusk, evoking autonomous ride-hailing.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 3 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Politics, Aristotle (c. 350 BCE) — the ancient thought-experiment of self-working tools that would make human drivers and servants unnecessary, now literalized by Tesla's driverless robotaxi",
        "excerpt": "And every assistant is as it were a tool that serves for several tools; for if every tool could perform its own work when ordered, or by seeing what to do in advance, like the statues of Daedalus in the story, or the tripods of Hephaestus which the poet says 'enter self-moved the company divine,'—if thus shuttles wove and quills played harps of themselves, master-craftsmen would have no need of assistants and masters no need of slaves.",
        "source": "Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0058%3Abook%3D1%3Asection%3D1253b"
      },
      {
        "category": "historical",
        "title": "The Iliad, Homer (c. 8th century BCE) — Hephaestus's self-moving golden tripods that roll to the gods' assembly of their own accord, myth's first driverless vehicles anticipating the autonomous robotaxi",
        "excerpt": "for he was fashioning tripods, twenty in all, to stand around the wall of his well-builded hall, and golden wheels had he set beneath the base of each that of themselves they might enter the gathering of the gods at his wish and again return to his house, a wonder to behold.",
        "source": "Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0134%3Abook%3D18%3Acard%3D368"
      },
      {
        "category": "literary",
        "title": "Hephaestus's self-moving tripods and golden handmaids in the Iliad",
        "excerpt": "She found him busy with his bellows, sweating and hard at work, for he was making twenty tripods that were to stand by the wall of his house, and he set wheels of gold under them all that they might go of their own selves to the assemblies of the gods, and come back again—marvels indeed to see. … There were golden handmaids also who worked for him, and were like real young women, with sense and reason, voice also and strength, and all the learning of the immortals …",
        "source": "Homer, The Iliad, Book XVIII, trans. Samuel Butler (1898)",
        "href": "https://www.gutenberg.org/files/2199/2199-h/2199-h.htm"
      },
      {
        "category": "literary",
        "title": "Karel Čapek's R.U.R. and the soulless manufactured worker",
        "excerpt": "My dear Miss Glory, the Robots are not people. Mechanically they are more perfect than we are; they have an enormously developed intelligence, but they have no soul.",
        "source": "Karel Čapek, R.U.R. (Rossum's Universal Robots), trans. Paul Selver & Nigel Playfair (1923)",
        "href": "https://www.gutenberg.org/files/59112/59112-h/59112-h.htm"
      },
      {
        "category": "artistic",
        "title": "Luigi Russolo, Dynamism of a Car (1913)",
        "excerpt": "A Futurist hymn to the automobile: Russolo shatters a speeding car into a wedge of hard red and violet triangles, chevrons of force streaming backward from its nose. There is no driver and barely a road—only pure velocity, the machine dissolving into the energy of its own motion. It captures the era's intoxication with the self-propelled vehicle as a new kind of living, roaring being.",
        "source": "Luigi Russolo, Dinamismo di un'automobile (Dynamism of a Car), 1913, oil on canvas, Musée National d'Art Moderne, Paris",
        "href": "https://commons.wikimedia.org/wiki/File:Luigi_Russolo_dynamism-of-a-car-1913.jpg",
        "image": {
          "src": "/covers/tesla-robotaxi-miami--art.png",
          "alt": "Luigi Russolo's 1913 Futurist painting Dynamism of a Car, a speeding automobile fragmented into overlapping red, blue and violet triangular wedges suggesting rushing motion.",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Arthur Honegger, Pacific 231 (1923)",
        "excerpt": "Honegger's orchestral movement portrays a steam locomotive as a machine with a will of its own: it wakes at a standstill, gathers its breathing mass of iron, then accelerates through churning ostinatos to a hurtling, thunderous full speed. The orchestra becomes the engine, driven not by a human hand but by its own relentless mechanical momentum. It is the machine age set to music—awe and menace in the same roaring pulse.",
        "source": "Arthur Honegger, Pacific 231 (Mouvement symphonique No. 1), composed 1923, first published Paris: Senart, 1924",
        "href": "https://imslp.org/wiki/Pacific_231,_H.53_(Honegger,_Arthur)"
      }
    ],
    "rank": 19
  },
  {
    "slug": "india-tata-apple-iphone-leak",
    "headline": "India investigates Tata Electronics breach after ransomware group leaks unreleased Apple iPhone 18 Pro data",
    "overview": "India's IT ministry said it is investigating a data breach at Tata Electronics, an Apple supplier, after a ransomware group posted sensitive component and supplier lists and photographs of the unreleased iPhone 18 Pro on the dark web. IT secretary S. Krishnan said the incident had been reported to India's Computer Emergency Response Team, and Tata has hired a global consultant for a forensic audit. Documents belonging to Tesla, Qualcomm and TSMC were reportedly caught up in the same leak.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMitwFBVV95cUxPYnNPUm9SdmFzZVBkODdSeUxOc3Joa2FtenhfaWlvVU5OVWMzMXNqVVVQdF9OcllPS3pUdjg5cF9GeTZPanZ4bHdzdmIzVGtZVGZ6Q18zd3dGVk9iNkpjNjAwQ1p0Z05xajZDbWVULXpDN3pmOFNza091RERiOHFNcmpfVFV0d2tVcEswSnNZeFJhcmU2R2Q5SEp4Y3ZGcy1zdU5mZ2NVNkFFY1NzVFEwbGExTHlid28?oc=5"
      },
      {
        "name": "Business Standard",
        "href": "https://www.business-standard.com/industry/news/govt-investigates-tata-electronics-breach-after-apple-iphone-data-leak-126070300679_1.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-03",
    "image": {
      "src": "/covers/india-tata-apple-iphone-leak.png",
      "alt": "A dim data hall of glowing server cabinets with one aisle sealed shut, evoking a corporate breach and stolen secrets.",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 3 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "History of the Wars, Procopius (c. 550 CE) — monks smuggle the jealously guarded secret of silk out of the East, just as a gang exfiltrates Apple's guarded iPhone designs",
        "excerpt": "At about this time certain monks, coming from India and learning that the Emperor Justinian entertained the desire that the Romans should no longer purchase their silk from the Persians, came before the emperor and promised so to settle the silk question that the Romans would no longer purchase this article from their enemies, the Persians, nor indeed from any other nation... They then once more went to Serinda and brought back the eggs to Byzantium, and in the manner described caused them to be transformed into worms, which they fed on the leaves of the mulberry; and thus they made possible from that time forth the production of silk in the land of the Romans.",
        "source": "penelope.uchicago.edu",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Procopius/Wars/8C*.html"
      },
      {
        "category": "historical",
        "title": "The Histories, Herodotus (c. 430 BCE) — a hidden message is smuggled out tattooed on a slave's shaved head, prefiguring a secret conveyed past its guardians to the world",
        "excerpt": "Since Histiaeus desired to give word to Aristagoras that he should revolt and had no other safe way of doing so because the roads were guarded, he shaved and branded the head of his most trustworthy slave. He waited till the hair had grown again, and as soon as it was grown, he sent the man to Miletus with no other message except that when he came to Miletus he must bid Aristagoras shave his hair and examine his head. The writing branded on it signified revolt, as I have already said.",
        "source": "perseus.tufts.edu",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0126%3Abook%3D5%3Achapter%3D35"
      },
      {
        "category": "literary",
        "title": "Prometheus Bound",
        "excerpt": "And I am he that searched out the source of fire, by stealth borne-off inclosed in a fennel-rod, which has shown itself a teacher of every art to mortals, and a great resource.",
        "source": "Aeschylus, Prometheus Bound (T. A. Buckley translation)",
        "href": "https://www.gutenberg.org/files/27458/27458-h/27458-h.htm"
      },
      {
        "category": "literary",
        "title": "Pandora opens the jar",
        "excerpt": "But the woman took off the great lid of the jar with her hands and scattered all these and her thought caused sorrow and mischief to men. Only Hope remained there in an unbreakable home within under the rim of the great jar, and did not fly out at the door.",
        "source": "Hesiod, Works and Days (Hugh G. Evelyn-White translation, 1914)",
        "href": "https://www.theoi.com/Text/HesiodWorksDays.html"
      },
      {
        "category": "artistic",
        "title": "Prometheus Bound",
        "excerpt": "Rubens's monumental canvas seizes the instant of divine retribution: the Titan who stole heaven's fire sprawls backward across his rock, chained, as Jupiter's eagle drives its talons into his face and tears at his liver. The pilfered gift of the gods is answered with an unending, public punishment.",
        "source": "Peter Paul Rubens (with Frans Snyders), 1611–1618, Philadelphia Museum of Art",
        "href": "https://commons.wikimedia.org/wiki/File:Peter_Paul_Rubens,_Flemish_(active_Italy,_Antwerp,_and_England)_-_Prometheus_Bound_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/india-tata-apple-iphone-leak--art.png",
          "alt": "Peter Paul Rubens's Baroque painting Prometheus Bound, depicting the chained Titan wracked by an eagle as punishment for stealing fire from the gods.",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Prometheus, Symphonic Poem No. 5, S.99",
        "excerpt": "Liszt's symphonic poem, drawn from the myth of the fire-thief, opens in storm and defiance—jagged, restless music evoking suffering endured for a stolen gift. Out of the turbulence a fugue strives upward toward deliverance, the sound of forbidden knowledge let loose upon the world and never to be recalled.",
        "source": "Franz Liszt, 1850 (revised 1855)",
        "href": "https://imslp.org/wiki/Prometheus,_S.99_(Liszt,_Franz)"
      }
    ],
    "rank": 20
  },
  {
    "slug": "turkey-detains-comedian-erdogan",
    "headline": "Turkish court jails popular stand-up comedian Deniz Göktaş over jokes about Erdogan and Islam",
    "overview": "A court in Istanbul placed stand-up comedian Deniz Göktaş under arrest after he was detained at the city's main airport over a routine that has drawn 9.4 million views on YouTube. Göktaş, one of Turkey's most popular comics, is accused of \"inciting hatred and hostility\" and of insulting President Recep Tayyip Erdoğan. His arrest is the latest in a widening crackdown on dissent that has swept up journalists, activists and LGBT+ groups, with more than 200 people detained ahead of next week's NATO summit in Ankara.",
    "genre": "Politics",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c36yrlzew39o"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-03",
    "image": {
      "src": "/covers/turkey-detains-comedian-erdogan.png",
      "alt": "A lone stand-up microphone under a hot spotlight on a dark empty stage, evoking a silenced comedian.",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 3 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Annals, Tacitus (c. AD 116) — the historian Cremutius Cordus is prosecuted for his writings and his books ordered burned, and defends the writer's freedom to speak",
        "excerpt": "Tacitus records how, under Tiberius, the historian Cremutius Cordus was dragged before the Senate and driven to his death for having praised Brutus and Cassius in his histories, with his books condemned to be burned. In his defence he insists it is his words alone, not any deed, that are on trial: \"It is my words, Senators, which are condemned, so innocent am I of any guilty act; yet these do not touch the emperor or the emperor's mother, who are alone comprehended under the law of treason. I am said to have praised Brutus and Cassius, whose careers many have described and no one mentioned without eulogy.\" Like the comedian jailed for jokes aimed at the ruler, a writer is punished by the state purely for what he said.",
        "source": "Perseus",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.02.0078%3Abook%3D4%3Achapter%3D34"
      },
      {
        "category": "historical",
        "title": "Tristia, Ovid (AD 9–12) — the poet, banished by the emperor Augustus for \"a poem and a mistake,\" laments that he was punished for his verse",
        "excerpt": "Writing from exile on the Black Sea, to which Augustus had relegated him, Ovid traces his ruin to his own writing. In Book 2, addressed to the emperor himself, he names the twin causes of his downfall: \"perdiderint cum me duo crimina, carmen et error\" (\"since two crimes, a poem and a blunder, have destroyed me\"). As with the comedian imprisoned for mocking the ruler, it is an artist punished by an all-powerful state for the words of his art—here, carmen et error, the poem itself the offence.",
        "source": "Perseus",
        "href": "https://scaife.perseus.org/reader/urn:cts:latinLit:phi0959.phi008.perseus-lat2:2/"
      },
      {
        "category": "literary",
        "title": "The Fool whipped for speaking true in Shakespeare's King Lear",
        "excerpt": "I marvel what kin thou and thy daughters are: they'll have me whipped for speaking true, thou'lt have me whipped for lying; and sometimes I am whipped for holding my peace.",
        "source": "William Shakespeare, King Lear, Act I, Scene IV",
        "href": "https://shakespeare.mit.edu/lear/lear.1.4.html"
      },
      {
        "category": "literary",
        "title": "Aristophanes lampoons the demagogue Cleon in The Knights",
        "excerpt": "Easy as lying! Do as now you do. Turn every question to a public stew. Hash things, and cook things. Win the common herd By strong sweet sauces in your every word. For other gifts, you have half the catalogue Already, for the perfect demagogue; A blood-shot voice, low breeding, huckster's tricks— What more can man require for politics?",
        "source": "Aristophanes, The Knights, trans. Gilbert Murray (Gutenberg Canada)",
        "href": "https://gutenberg.ca/ebooks/murrayaristophanes-knights/murrayaristophanes-knights-00-h.html"
      },
      {
        "category": "artistic",
        "title": "Velázquez's dignified portrait of the court jester Don Diego de Acedo (El Primo)",
        "excerpt": "Velázquez painted the jesters and fools of Philip IV's court not as objects of ridicule but as grave, intelligent human beings, seating El Primo among books and papers with the composure of a scholar. The portrait dignifies the very figure a court kept to be laughed at—the licensed fool who, precisely because he was a fool, could speak freely to the king. It is a quiet argument that the jester is a person of substance, not merely a target for royal amusement or royal anger.",
        "source": "Diego Velázquez, El bufón don Diego de Acedo, el Primo (c. 1644), Museo del Prado",
        "href": "https://commons.wikimedia.org/wiki/File:Diego_Vel%C3%A1zquez_-_Don_Diego_de_Acedo_(El_Primo)_-_WGA24436.jpg",
        "image": {
          "src": "/covers/turkey-detains-comedian-erdogan--art.png",
          "alt": "Velázquez's portrait of the court dwarf and jester Don Diego de Acedo, called El Primo, seated in black dress reading a large book with papers at his feet.",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Mussorgsky's satirical 'Song of the Flea', mocking a king who ennobles a pest",
        "excerpt": "Setting Mephistopheles' cabaret song from Goethe's Faust, Mussorgsky tells of a king who so doted on a flea that he dressed it in velvet, made it a minister, and let it and its relatives torment the whole court—while no one dared to scratch. The music's mock-solemn strut and jeering laughter turn the fable into a biting caricature of tyranny and the sycophancy that surrounds a ruler. It is comedy aimed squarely at power, the singer as jester exposing a court that fawns on absurd favourites and punishes anyone who complains.",
        "source": "Modest Mussorgsky, Mephistopheles' Song of the Flea (1879), IMSLP",
        "href": "https://imslp.org/wiki/Mephistopheles'_Song_of_the_Flea_(Mussorgsky,_Modest)"
      }
    ],
    "rank": 21
  },
  {
    "slug": "canada-alberta-westcoast-oil-pipeline",
    "headline": "Canada and Alberta advance a new one-million-barrel West Coast oil pipeline to reach Asian markets",
    "overview": "Prime Minister Mark Carney advanced a new Pacific Coast pipeline that would carry more than one million barrels a day of Alberta crude from Bruderheim, near Edmonton, to the southern British Columbia coast for export to Asia — part of his goal to double Canada's non-US exports within a decade and blunt the price discount on oil sold to the United States. The federally owned Trans Mountain Corporation and Calgary's Pembina Pipeline are partners, with construction possible as early as September 2027. BC Premier David Eby secured a commitment to keep the province's northern tanker ban in place.",
    "genre": "Economy",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMipgFBVV95cUxPTXZHUGpMQ2FTRDhycnBEbWNWc1Zic0NKeWQ5Um5QUWEzR2lBckZZWjhOdV9pc3FaNno3elFXS2kzQzBGTHJLc2lUNDlmbDI4LVhqdVJVUGZBWWFtTGRjNUZVYXhOZkgyOTN5V09DeDFyV3ZHeC1McVFpemVhM0VXVnN3cWVqbDd2d0ZWZTdOM21aUEVvOXUxcllfYUlCSHQ0V3prTV93?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiuAFBVV95cUxQa3V6aW03b3B2UUh6ek54ZG9nSGJJOVlldWZnNG54ZzJqWVd2d000LU1WRUZqM2FpSmN5S2ZfXzBTTGZnM2hWQlR1WTZHNGJDb1M2T2sxcUd4U1ZJSVhCLUFwUkljZ0d3XzR2dzBjeDZsYmpESmU5cWNERFRZSm5BYzRMOE9BVXRnal9DelNYWlNXb0sydk1FMDlCSlpnWVZ0OW5MMnNERElyUzl6b0NsLXlxdzhwYjZk?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-03",
    "image": {
      "src": "/covers/canada-alberta-westcoast-oil-pipeline.png",
      "alt": "A pipeline right-of-way cutting through forested mountains toward the Pacific coast at dawn, evoking a new export route.",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 3 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Histories, Herodotus (c. 430 BC) — Pharaoh Necho cuts a canal joining the Nile to the Red Sea to reach distant trade",
        "excerpt": "Psammetichus had a son, Necos, who became king of Egypt. It was he who began building the canal into the Red Sea, which was finished by Darius the Persian. This is four days' voyage in length, and it was dug wide enough for two triremes to move in it rowed abreast. It is fed by the Nile, and is carried from a little above Bubastis by the Arabian town of Patumus; it issues into the Red Sea. Digging began in the part of the Egyptian plain nearest to Arabia; the mountains that extend to Memphis (the mountains where the stone quarries are) come close to this plain; the canal is led along the foothills of these mountains in a long reach from west to east; passing then into a ravine, it bears southward out of the hill country towards the Arabian Gulf. Now the shortest and most direct passage from the northern to the southern or Red Sea is from the Casian promontory, the boundary between Egypt and Syria, to the Arabian Gulf, and this is a distance of one hundred and twenty five miles, neither more nor less; this is the most direct route, but the canal is far longer, inasmuch as it is more crooked. In Necos' reign, a hundred and twenty thousand Egyptians died digging it. Necos stopped work, stayed by a prophetic utterance that he was toiling beforehand for the barbarian.",
        "source": "Perseus",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0126:book=2:chapter=158"
      },
      {
        "category": "historical",
        "title": "The Life of Nero, Suetonius (AD 121) — Nero breaks ground to cut the Isthmus of Corinth and join two seas",
        "excerpt": "In Achaia he attempted to cut through the Isthmus and called together the praetorians and urged them to begin the work; then at a signal given on a trumpet he was first to break ground with a mattock and to carry off a basketful of earth upon his shoulders.",
        "source": "penelope.uchicago.edu",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Suetonius/12Caesars/Nero*.html"
      },
      {
        "category": "literary",
        "title": "\"Passage to India\"",
        "excerpt": "Singing my days,\nSinging the great achievements of the present,\nSinging the strong light works of engineers,\nOur modern wonders, (the antique ponderous Seven outvied,)\nIn the Old World the east the Suez canal,\nThe New by its mighty railroad spann'd,\nThe seas inlaid with eloquent gentle wires;",
        "source": "Walt Whitman, Leaves of Grass (1882), Wikisource",
        "href": "https://en.wikisource.org/wiki/Leaves_of_Grass_(1882)/Passage_to_India"
      },
      {
        "category": "literary",
        "title": "\"Columbus\"",
        "excerpt": "Then, pale and worn, he kept his deck,\nAnd thro' the darkness peered that night\nAh, darkest night! and then a speck—\nA light! a light! a light! a light!\nIt grew—a star-lit flag unfurled!\nIt grew to be Time's burst of dawn;\nHe gained a world! he gave that world\nIts watch-word: \"On! and on!\"",
        "source": "Joaquin Miller, in Poems That Every Child Should Know (1904), Wikisource",
        "href": "https://en.wikisource.org/wiki/Poems_That_Every_Child_Should_Know/Columbus"
      },
      {
        "category": "artistic",
        "title": "American Progress",
        "excerpt": "A luminous allegorical woman floats westward across the continent, stringing telegraph wire and trailing settlers, stagecoaches, and railroads behind her. Ahead of her the light gives way to darkness as Indigenous peoples and buffalo are driven off the land. Gast's 1872 image is the era's most famous picture of Manifest Destiny, capturing both the exhilaration of westward expansion and its human cost.",
        "source": "John Gast (1872), Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:American_Progress_(1872)_by_John_Gast.jpg",
        "image": {
          "src": "/covers/canada-alberta-westcoast-oil-pipeline--art.png",
          "alt": "John Gast's 1872 painting American Progress: a female figure in white floats westward over the plains bringing light, telegraph wire, and settlers as Indigenous peoples and animals retreat into shadow.",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Symphony No. 9 in E minor, Op. 95, \"From the New World\"",
        "excerpt": "Written in America and premiered in 1893, Dvořák's \"New World\" symphony fuses the composer's Bohemian voice with the wide-open spirit of a young continent. Its surging brass and the vast, homesick calm of the Largo evoke frontier horizons and the pull of distant lands. The work has become the sound of a nation reaching outward across open space toward its future.",
        "source": "Antonín Dvořák (1893), IMSLP",
        "href": "https://imslp.org/wiki/Symphony_No.9,_Op.95_(Dvo%C5%99%C3%A1k,_Anton%C3%ADn)"
      }
    ],
    "rank": 22
  },
  {
    "slug": "super-typhoon-bavi-mariana-islands",
    "headline": "Forecasters warn Typhoon Bavi could strike the US Northern Mariana Islands as a super typhoon, months after Sinlaku",
    "overview": "Meteorologists warned that Typhoon Bavi, strengthening over warm Pacific waters east of Guam, could rapidly intensify into a Category 4 or 5 super typhoon and sweep through the US Northern Mariana Islands — Saipan, Tinian and Rota — and Guam early next week, with the Joint Typhoon Warning Center forecasting winds topping 175 mph. The islands are still recovering from Super Typhoon Sinlaku, which devastated Saipan and Tinian as a Category 4 storm in April. Residents queued for fuel and stripped shelves of plywood, water and food.",
    "genre": "Climate",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMiogFBVV95cUxNNksxWUtLaXMwWXVXX2I2YnRVS2d1T2tUVG5kd1BwWGlneEFiYkJ5STk1NmdfV25vMG93VWRLV3BPZURXTTdWOENjUHRjNzBlbk84S1ZDQXZIYzZtNU5wZEctd1lRT041U3p1dmJoSUNZTnpyV2hxVXRtUmk0M052dW1fLWg3dV9iQm03dFcwRUplQ2k2MEdnYUp4d0p4NXVVcUE?oc=5"
      },
      {
        "name": "weather.com",
        "href": "https://weather.com/2026/07/01/storms/hurricane/super-typhoon-bavi-northern-marianas-guam-forecast"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-03",
    "image": {
      "src": "/covers/super-typhoon-bavi-mariana-islands.png",
      "alt": "Dark spiraling storm clouds massing over a small Pacific island at dusk, evoking an approaching super typhoon.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 3 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Histories, Herodotus (c. 430 BC) — a sudden storm out of a clear sky wrecks Xerxes' Persian fleet on the Magnesian coast, as a super typhoon now bears down on the Pacific islands",
        "excerpt": "The Persian fleet put to sea and reached the beach of the Magnesian land, between the city of Casthanaea and the headland of Sepia. The first ships to arrive moored close to land, with the others after them at anchor; since the beach was not large, they lay at anchor in rows eight ships deep out into the sea. They spent the night in this way, but at dawn a storm descended upon them out of a clear and windless sky, and the sea began to boil. A strong east wind blew, which the people living in those parts call Hellespontian. Those who felt the wind rising or had proper mooring dragged their ships up on shore ahead of the storm and so survived with their ships. The wind did, however, carry those ships caught out in the open sea against the rocks called the Ovens at Pelion or onto the beach. Some ships were wrecked on the Sepian headland, others were cast ashore at the city of Meliboea or at Casthanaea. The storm was indeed unbearable.",
        "source": "Perseus",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0126%3Abook%3D7%3Achapter%3D188"
      },
      {
        "category": "historical",
        "title": "The Histories, Herodotus (c. 430 BC) — a great and irresistible north wind off Mount Athos destroys about 300 ships of Mardonius's fleet and drowns 20,000 men, an omen of nature's force from the sea",
        "excerpt": "Crossing over from Thasos they travelled near the land as far as Acanthus, and putting out from there they tried to round Athos. But a great and irresistible north wind fell upon them as they sailed past and dealt very roughly with them, driving many of their ships upon Athos. It is said that about three hundred ships were lost, and more than twenty thousand men. Since the coasts of Athos abound in wild beasts, some men were carried off by beasts and so perished; others were dashed against the rocks; those who could not swim perished because of that, and still others by the cold.",
        "source": "Perseus",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0126%3Abook%3D6%3Achapter%3D44"
      },
      {
        "category": "literary",
        "title": "The Tempest, Act I, Scene 1 (the opening shipwreck storm)",
        "excerpt": "A tempestuous noise of thunder and lightning heard. ... Heigh, my hearts! cheerly, cheerly, my hearts! yare, yare! Take in the topsail. Tend to the master's whistle—Blow, till thou burst thy wind, if room enough!",
        "source": "William Shakespeare, The Tempest (Yale, 1918), via Wikisource",
        "href": "https://en.wikisource.org/wiki/Tempest_(1918)_Yale/Text/Act_I"
      },
      {
        "category": "literary",
        "title": "The Odyssey, Book 5: Poseidon Raises the Storm",
        "excerpt": "So saying, he gathered the clouds, and seizing his trident in his hands troubled the sea, and roused all blasts of all manner of winds, and hid with clouds land and sea alike; and night rushed down from heaven. Together the East Wind and the South Wind dashed, and the fierce-blowing West Wind and the North Wind, born in the bright heaven, rolling before him a mighty wave. Then were the knees of Odysseus loosened and his heart melted.",
        "source": "Homer, The Odyssey (trans. A. T. Murray), via Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0136:book=5:card=291"
      },
      {
        "category": "artistic",
        "title": "The Great Wave off Kanagawa",
        "excerpt": "Hokusai's iconic print towers a single colossal wave over fragile fishing boats, its clawed crest of foam poised to crash down on the helpless crews below. Distant Mount Fuji is dwarfed by the surging sea, capturing in one image nature's overwhelming power over human works. It is the definitive vision of small vessels and small people at the mercy of an unstoppable ocean.",
        "source": "Katsushika Hokusai, woodblock print, c. 1831 (via Wikimedia Commons)",
        "href": "https://en.wikipedia.org/wiki/File:Tsunami_by_hokusai_19th_century.jpg",
        "image": {
          "src": "/covers/super-typhoon-bavi-mariana-islands--art.png",
          "alt": "Katsushika Hokusai's woodblock print The Great Wave off Kanagawa, showing a giant cresting wave about to break over small boats with Mount Fuji in the distance.",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "The Four Seasons: \"Summer\" (Concerto No. 2 in G minor, RV 315), the storm finale",
        "excerpt": "The closing Presto of Vivaldi's \"Summer\" unleashes a summer tempest in sound, its racing violins and thundering bass evoking hail, howling wind and a sky torn by lightning. After the languid heat of the earlier movements, the music erupts into churning, unstoppable fury. It is one of music's most vivid portraits of a violent storm bearing down without mercy.",
        "source": "Antonio Vivaldi, Le quattro stagioni, c. 1725 (via IMSLP)",
        "href": "https://imslp.org/wiki/The_Four_Seasons_(Vivaldi,_Antonio)"
      }
    ],
    "rank": 23
  },
  {
    "slug": "declaration-independence-copy-national-archives",
    "headline": "UK National Archives finds a rare Exeter printing of the Declaration of Independence in a captured privateer's papers",
    "overview": "A volunteer cataloguer at Britain's National Archives, retired insurance executive Michael Scurr, discovered a rare early copy of the US Declaration of Independence tucked into the papers of an 18th-century Royal Navy captain. The document — an \"Exeter printing\" produced in Exeter, New Hampshire, days after the July 1776 signing — had been seized with the American privateer Dalton, captured off Portugal on Christmas Eve 1776 by HMS Raisonnable. It is one of just 11 known Exeter copies and the only one identified outside the United States, and is now on display in London.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMiugFBVV95cUxPSTNGbHhRRS02TkdoeDY4cHBqMmJpWHNPMEpZM3hYRHNldUlnQ0JZUmU0dlNHeFFYSHQ3R3BoMnROeU1abjFPUTdzblpEaXczNEgtc05CS2szVnJwd21VRnR2aTU3VktveURYa09zMVZZVkNmRUswNEVXMFlnMjZkbW5BNi1xRWJNZFNPWlNUZzZhMXNBcFpkbVcyckhPVFJ4dldqOVBoMVhBeWNCalo1MFJodjdPaVN6bFE?oc=5"
      },
      {
        "name": "The Washington Times",
        "href": "https://www.washingtontimes.com/news/2026/jul/2/rare-copy-declaration-independence-found-uk-national-archives-papers/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-03",
    "image": {
      "src": "/covers/declaration-independence-copy-national-archives.png",
      "alt": "An 18th-century printed broadside of the Declaration of Independence, yellowed and folded, resting under archive light.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 3 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Magna Carta, King John of England (1215) — the founding charter binding a ruler to the rule of law, echoing the Declaration's assertion of rights against arbitrary power",
        "excerpt": "39. No freemen shall be taken or imprisoned or disseised or exiled or in any way destroyed, nor will we go upon him nor send upon him, except by the lawful judgment of his peers or by the law of the land. 40. To no one will we sell, to no one will we refuse or delay, right or justice.",
        "source": "avalon.law.yale.edu",
        "href": "https://avalon.law.yale.edu/medieval/magna.asp"
      },
      {
        "category": "historical",
        "title": "The Ninety-Five Theses, Martin Luther (1517) — a manifesto defying the highest authority, posted and spread by the printing press like the Declaration it foreshadows",
        "excerpt": "1. Our Lord and Master Jesus Christ, when He said Poenitentiam agite, willed that the whole life of believers should be repentance. 2. This word cannot be understood to mean sacramental penance, i.e., confession and satisfaction, which is administered by the priests. 3. Yet it means not inward repentance only; nay, there is no inward repentance which does not outwardly work divers mortifications of the flesh.",
        "source": "projectwittenberg.org",
        "href": "https://www.projectwittenberg.org/pub/resources/text/wittenberg/luther/web/ninetyfive.html"
      },
      {
        "category": "literary",
        "title": "United States Declaration of Independence (Thomas Jefferson, 1776)",
        "excerpt": "We hold these truths to be self-evident, that all men are created equal, that they are endowed by their Creator with certain unalienable Rights, that among these are Life, Liberty and the pursuit of Happiness.",
        "source": "U.S. National Archives",
        "href": "https://www.archives.gov/founding-docs/declaration-transcript"
      },
      {
        "category": "literary",
        "title": "Common Sense (Thomas Paine, 1776)",
        "excerpt": "We have it in our power to begin the world over again. A situation, similar to the present, hath not happened since the days of Noah until now. The birthday of a new world is at hand, and a race of men, perhaps as numerous as all Europe contains, are to receive their portion of freedom from the event of a few months.",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/files/147/147-h/147-h.htm"
      },
      {
        "category": "artistic",
        "title": "Declaration of Independence (John Trumbull, 1818)",
        "excerpt": "John Trumbull's grand history painting, hung in the Rotunda of the U.S. Capitol, depicts the drafting committee presenting the Declaration to the Continental Congress. It fixed in the public imagination the moment a printed proclamation of liberty was set before the nation, the same document that a captured privateer would later carry across the Atlantic into an enemy's papers.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Declaration_of_Independence_(1819),_by_John_Trumbull.jpg",
        "image": {
          "src": "/covers/declaration-independence-copy-national-archives--art.png",
          "alt": "Oil painting by John Trumbull showing the five-man drafting committee presenting the Declaration of Independence to John Hancock and the Continental Congress in a formal Philadelphia chamber.",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Chester, from The Singing Master's Assistant (William Billings, 1778)",
        "excerpt": "Let tyrants shake their iron rod, And Slav'ry clank her galling chains, We fear them not, we trust in God, New England's God forever reigns.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/The_Singing_Master's_Assistant_(Billings,_William)"
      }
    ],
    "rank": 24
  },
  {
    "slug": "big-dymak-timber-hq-odense",
    "headline": "BIG completes a circular mass-timber headquarters for Dymak in Odense, built from 44 radial timber frames",
    "overview": "Bjarke Ingels Group has completed a 2,800-square-metre headquarters for the building-materials firm Dymak in Odense, Denmark, conceived as a full-scale showcase of the natural materials the company supplies. The circular building encloses a planted courtyard with stepped terraces and is framed by 44 radial cross-laminated timber trusses beneath an undulating roof carrying 880 solar panels. Its interiors of mass timber, clay, cork, eelgrass and recycled-paper ceilings have earned DGNB Gold, Heart and Diamond certifications.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Dezeen",
        "href": "https://www.dezeen.com/2026/07/03/big-dymak-headquarters-denmark/"
      },
      {
        "name": "Designboom",
        "href": "https://www.designboom.com/architecture/big-bjarke-ingels-group-dymak-headquarters-full-scale-showcase-natural-materials-denmark/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-03",
    "image": {
      "src": "/covers/big-dymak-timber-hq-odense.png",
      "alt": "A circular timber building enclosing a planted courtyard with stepped terraces under an undulating solar roof.",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 3 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Roman History, Cassius Dio (c. 200 AD) — Agrippa completes the great round Pantheon, the domed temple that 'resembles the heavens'",
        "excerpt": "Also he completed the building called the Pantheon. It has this name, perhaps because it received among the images which decorated it the statues of many gods, including Mars and Venus; but my own opinion of the name is that, because of its vaulted roof, it resembles the heavens.",
        "source": "LacusCurtius (penelope.uchicago.edu)",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Cassius_Dio/53*.html"
      },
      {
        "category": "historical",
        "title": "Germania, Tacitus (98 AD) — the northern peoples build only in timber, each dwelling set apart amid spring, meadow and wood",
        "excerpt": "They live scattered and apart, just as a spring, a meadow, or a wood has attracted them. Their villages they do not arrange in our fashion, with the buildings connected and joined together, but every person surrounds his dwelling with an open space... No use is made by them of stone or tile; they employ timber for all purposes, rude masses without ornament or attractiveness.",
        "source": "Perseus (perseus.tufts.edu)",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.02.0083%3Achapter%3D16"
      },
      {
        "category": "literary",
        "title": "Vitruvius, The Ten Books on Architecture (De Architectura)",
        "excerpt": "All these must be built with due reference to durability, convenience, and beauty. Durability will be assured when foundations are carried down to the solid ground and materials wisely and liberally selected.",
        "source": "Vitruvius, trans. Morris Hicky Morgan (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/20239/20239-h/20239-h.htm"
      },
      {
        "category": "literary",
        "title": "Henry David Thoreau, Walden",
        "excerpt": "Near the end of March, 1845, I borrowed an axe and went down to the woods by Walden Pond, nearest to where I intended to build my house, and began to cut down some tall, arrowy white pines, still in their youth, for timber.",
        "source": "Henry David Thoreau, Walden (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/205/205-h/205-h.htm"
      },
      {
        "category": "artistic",
        "title": "The Ideal City (Città ideale), Urbino panel",
        "excerpt": "This Renaissance panel from the 1480s imagines the perfect town as pure geometry: an immaculate piazza opening onto a domed, central-plan circular temple that anchors the whole composition on its axis. The round building is set as the ideal at the heart of communal space, exactly the gesture BIG makes by placing a planted courtyard within a ring of timber. It is architecture painted as an argument, the ideal building offered as a statement of how people should live together.",
        "source": "Formerly attributed to Piero della Francesca; Galleria Nazionale delle Marche, Urbino (Wikipedia)",
        "href": "https://commons.wikimedia.org/wiki/File:Formerly%20Piero%20della%20Francesca%20-%20Ideal%20City%20-%20Galleria%20Nazionale%20delle%20Marche%20Urbino.jpg",
        "image": {
          "src": "/covers/big-dymak-timber-hq-odense--art.png",
          "alt": "Renaissance painting of an ideal city: an empty sunlit piazza flanked by classical palazzi, centered on a circular domed temple.",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Beethoven, Symphony No. 6 in F major, Op. 68 (\"Pastoral\")",
        "excerpt": "Beethoven built his Pastoral Symphony as sound in harmony with nature, from the \"Awakening of cheerful feelings on arrival in the countryside\" to the \"Scene by the brook\" and the shepherd's grateful hymn after the storm. Its movements are architecture in time, serene proportions that carry the listener through an idealized landscape. The same pastoral serenity animates Dymak's courtyard of timber, clay and living plants, where the building itself is tuned to the rhythms of the natural world.",
        "source": "Ludwig van Beethoven (IMSLP / Petrucci Music Library)",
        "href": "https://imslp.org/wiki/Symphony_No.6,_Op.68_(Beethoven,_Ludwig_van)"
      }
    ],
    "rank": 25
  },
  {
    "slug": "swift-kelce-msg-wedding",
    "headline": "Taylor Swift and Travis Kelce marry at Madison Square Garden after giving $26 million to charity",
    "overview": "Pop superstar Taylor Swift and NFL tight end Travis Kelce celebrated their wedding on Friday evening at Madison Square Garden in New York, with about 1,000 guests expected for festivities that could run past midnight. Ahead of the nuptials the couple gave away $26 million to charities, including the nonprofit The Store. The guest list reportedly drew a constellation of celebrities, from Selena Gomez and Ed Sheeran to Robert Pattinson, ringing midtown Manhattan with security and spectacle.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMirgFBVV95cUxPZVM2RTBVekZXWnY2WVdwanlSNEpkVVJ6Tk14dXBaZHd3b3lDcUJycXd6UEd5STVkYUFscXM1ZjJvMjhreWtrNGJ6VjlrNDI2azhFSjlwMlhoNS1ZQUtfMC1uSG1reDhmUzR2X0FUR0haa3RpOUJjZzljZDFWU3hYSVV0QjJHbW05LUl1VUxCSUJuQVFZdno2QW1kRy0tNW5XQXk1MmVLLUdiQnRtX0E?oc=5"
      },
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMiowFBVV95cUxPd0RkVnhQanhVVE04YTk3bVdJbDFFTnN1b1FINTVTejZzWmFQNVRfaXVhQm10LVdpT2h4eUt2SVAxVlB2bEdVNXVpVjI1a0dFUUVaSHQwYUZGTHNpenRpWGdOX1l0ZEp1SExvM1hLMUJGWVpGczdzSFZQR3ByaG5DU1E3SnhUeWhjVWFla0JPM0JHZWtLMUdtZVAzLWl3VThFbHlZ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-03",
    "image": {
      "src": "/covers/swift-kelce-msg-wedding.png",
      "alt": "The illuminated facade of Madison Square Garden at night with a red carpet, evoking a celebrated public wedding as spectacle.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 3 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Histories, Herodotus (c. 430 BC) — Cleisthenes of Sicyon summons the suitors of all Greece to a year-long contest for his daughter's hand, a wedding staged as public spectacle",
        "excerpt": "Cleisthenes son of Aristonymus son of Myron son of Andreas had one daughter, whose name was Agariste. He desired to wed her to the best man he could find in Hellas. It was the time of the Olympian games, and when he was victor there with a four-horse chariot, Cleisthenes made a proclamation that whichever Greek thought himself worthy to be his son-in-law should come on the sixtieth day from then or earlier to Sicyon, and Cleisthenes would make good his promise of marriage in a year from that sixtieth day. Then all the Greeks who were proud of themselves and their country came as suitors, and to that end Cleisthenes had them compete in running and wrestling contests.",
        "source": "Perseus (perseus.tufts.edu)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0126%3Abook%3D6%3Achapter%3D126"
      },
      {
        "category": "historical",
        "title": "The Anabasis of Alexander, Arrian (c. 145 AD) — the mass wedding at Susa, where Alexander and scores of his companions wed Persian brides in one splendid ceremony",
        "excerpt": "Likewise to the rest of his Companions he gave the choicest daughters of the Persians and Medes, to the number of eighty. The weddings were celebrated after the Persian manner, seats being placed in a row for the bridegrooms; and after the banquet the brides came in and seated themselves, each one near her own husband. The bridegrooms took them by the right hand and kissed them; the king being the first to begin, for the weddings of all were conducted in the same way.",
        "source": "Wikisource (en.wikisource.org)",
        "href": "https://en.wikisource.org/wiki/The_Anabasis_of_Alexander/Book_VII/Chapter_IV"
      },
      {
        "category": "literary",
        "title": "Edmund Spenser, \"Epithalamion\" (1595)",
        "excerpt": "Open the temple gates unto my love,\nOpen them wide that she may enter in,\nAnd all the postes adorne as doth behove,\nAnd all the pillours deck with girlands trim,\nFor to receyve this saynt with honour dew,\nThat commeth in to you.\nWith trembling steps and humble reverence,\nShe commeth in before th' Almighties vew:",
        "source": "Wikisource: The Works of Edmund Spenser / Epithalamion",
        "href": "https://en.wikisource.org/wiki/The_Works_of_Edmund_Spenser/Epithalamion"
      },
      {
        "category": "literary",
        "title": "William Shakespeare, \"A Midsummer Night's Dream,\" Act V (Oberon's blessing of the bride-bed)",
        "excerpt": "Now, until the break of day,\nThrough this house each fairy stray.\nTo the best bride-bed will we,\nWhich by us shall blessed be;\nAnd the issue there create\nEver shall be fortunate.\nSo shall all the couples three\nEver true in loving be;",
        "source": "Wikisource: A Midsummer-Night's Dream (Rackham), Act V, Sc. 1",
        "href": "https://en.wikisource.org/wiki/A_Midsummer-Night%27s_Dream_(Rackham)/Act_V,_Sc._1"
      },
      {
        "category": "artistic",
        "title": "Paolo Veronese, \"The Wedding at Cana\" (1563), Musée du Louvre",
        "excerpt": "Veronese's colossal canvas, more than six by nine metres, crowds a marble loggia with over a hundred richly dressed guests, musicians, and servants at a wedding feast so sumptuous it dwarfs the miracle at its center. Painted for a Benedictine refectory in Venice, it turns a nuptial banquet into pure spectacle, a shimmering multitude gathered around a single celebrated table. It is the Renaissance vision of the wedding-as-festival, the same instinct that ringed midtown Manhattan with stars.",
        "source": "Wikipedia: Wedding at Cana (Veronese)",
        "href": "https://commons.wikimedia.org/wiki/File:Paolo%20Veronese%20008.jpg",
        "image": {
          "src": "/covers/swift-kelce-msg-wedding--art.png",
          "alt": "Paolo Veronese's monumental 1563 painting The Wedding at Cana, showing a vast crowd of guests, musicians, and servants at an opulent Renaissance wedding banquet set in a columned marble courtyard.",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Felix Mendelssohn, \"Wedding March\" from the incidental music to A Midsummer Night's Dream, Op. 61 (1842)",
        "excerpt": "Mendelssohn's blazing C-major march, written to accompany the triple wedding that closes Shakespeare's comedy, became the world's default sound of nuptial triumph, its fanfare summoning a bride down the aisle before a watching throng. Brass and full orchestra turn a private procession into a public rite of pomp and jubilation. It is the aural equivalent of a wedding staged as spectacle, ceremony amplified into celebration.",
        "source": "IMSLP: A Midsummer Night's Dream, Op.61 (Mendelssohn, Felix)",
        "href": "https://imslp.org/wiki/A_Midsummer_Night%27s_Dream,_Op.61_(Mendelssohn,_Felix)"
      }
    ],
    "rank": 26
  },
  {
    "slug": "kyiv-russia-massive-attack",
    "headline": "Russia launches its largest missile and drone attack on Kyiv, killing at least 30",
    "overview": "Rescuers spent Friday clearing rubble across the Ukrainian capital after an overnight barrage that officials said deployed more weapons than any previous strike on the city, killing at least 30 people and wounding more than 90. Ukraine's air force said Russia fired 74 missiles and roughly 496 drones, damaging around 20 residential buildings and driving thousands to shelter in metro stations. Moscow said the assault was retaliation for Ukrainian drone strikes on its oil refineries, which have caused fuel shortages across Russia.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiuAFBVV95cUxONU1hNlBDTURsc1NhcHNqODU1dTRDdnVLOUladWNPbTBGTUVVaDlzbFRVUU94SVVuM2w2c3E3Zjk2b0hUSVEtZk5tSkxoVzRRWDNsWjd0NmE0V2J6NnJGWXhoYzlETDdfT3VGaGtLaWhfUlFPc3JPYkM5djFBM3ZuTFZCYXVpcUpKcUt2M1ZueEpEWm9SYWNFdzE0Z2FCek1Qek9JM250M1hUUkNQTHVIUksybURObjJT?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c4gyv05gk4do"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-03",
    "image": {
      "src": "/covers/kyiv-russia-massive-attack.png",
      "alt": "A woman weeps as she embraces a relative in front of an apartment block damaged by an overnight strike in Kyiv.",
      "credit": "BBC"
    },
    "lead": true,
    "rank": 27,
    "edition": "Afternoon Edition · 3 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The London Blitz (1940–41) — a capital bombed night after night in reprisal, its people sheltering deep in Underground stations",
        "excerpt": "When the Luftwaffe turned on London in September 1940 — a switch to bombing the capital driven in part as reprisal for RAF raids on Berlin — tens of thousands of Londoners carried blankets down into Tube stations and slept on the platforms while the city burned above them. The Underground became a subterranean city of the night, exactly as Kyiv's metro fills with families the moment the sirens sound. The raids killed tens of thousands of civilians, yet the nightly ritual of descending into the earth and climbing back up into the smoke became the defining image of civilian endurance under aerial terror.",
        "source": "Imperial War Museum / Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:The_London_Underground_As_Air_Raid_Shelter,_London,_England,_1940_D1675.jpg"
      },
      {
        "category": "historical",
        "title": "George R. Gleig, \"The Campaigns of the British Army at Washington\" (1821) — a soldier watches an enemy capital set ablaze in openly declared retaliation",
        "excerpt": "The sky was brilliantly illumined by the different conflagrations; and a dark red light was thrown upon the road, sufficient to permit each man to view distinctly his comrade's face. Except the burning of St. Sebastian's, I do not recollect to have witnessed at any period of my life a scene more striking or more sublime.",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/18479/pg18479-images.html"
      },
      {
        "category": "literary",
        "title": "Virgil, \"Aeneid,\" Book II (c. 19 BC) — Aeneas wakes to find his city aflame, the archetype of a capital consumed in a single catastrophic night",
        "excerpt": "I woke on sudden, and up-starting scaled the roof, the tower, then stood with listening ear: 't was like an harvest burning, when wild winds uprouse the flames... Now their Greek plot was plain, the stratagem at last laid bare. Deiphobus' great house sank vanquished in the fire. Ucalegon's hard by was blazing, while the waters wide around Sigeum gave an answering glow.",
        "source": "Perseus (Tufts)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0054:book=2:card=298"
      },
      {
        "category": "literary",
        "title": "Wilfred Owen, \"Dulce et Decorum Est\" (1920) — a soldier-poet strips war of its glory, indicting the old lies that justify slaughter",
        "excerpt": "Gas! GAS! Quick, boys!—An ecstasy of fumbling, / Fitting the clumsy helmets just in time; / But someone still was yelling out and stumbling, / And flound'ring like a man in fire or lime... My friend, you would not tell with such high zest / To children ardent for some desperate glory, / The old Lie: Dulce et decorum est / Pro patria mori.",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Complete_Poems_and_Fragments_of_Wilfred_Owen/Dulce_et_Decorum_Est"
      },
      {
        "category": "artistic",
        "title": "John Martin, \"The Great Day of His Wrath\" (1851–53) — a whole city torn from its foundations and hurled into an abyss of fire, apocalypse as bombardment from the sky",
        "excerpt": "Martin's vast canvas shows a city dissolving in a storm of fire and darkness: cliffs collapse, buildings tumble end over end into a red chasm, and tiny human figures vanish beneath cascading rock and flame. Painted in his final years, it fuses the Book of Revelation with the industrial hell of the mining valleys he knew, imagining annihilation descending from above upon the whole built world. Stand before it and the roar is almost audible — the same blinding light a barrage of missiles throws over a sleeping capital at night.",
        "source": "The Tate / Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:John_Martin_-_The_Great_Day_of_His_Wrath_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/kyiv-russia-massive-attack--art.png",
          "alt": "John Martin's apocalyptic painting The Great Day of His Wrath, showing a city collapsing into a red chasm of fire and darkness.",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Giuseppe Verdi, \"Messa da Requiem\" — Dies irae (1874) — the medieval Day of Wrath rendered as an overwhelming barrage of sound, terror falling from above",
        "excerpt": "Verdi set the medieval \"Dies irae\" — the \"day of wrath\" — as the most terrifying music in his Requiem: hammer-blow strokes of the bass drum, plunging chromatic scales, and a chorus crying out at a world dissolving into ash and fire. Premiered in 1874, it turns the liturgy of the Last Judgment into a wall of sound, the sound of wrath crashing down on the living. It is about as close as music comes to the terror of a sky raining fire on a sleeping city.",
        "source": "IMSLP",
        "href": "https://imslp.org/wiki/Requiem_(Verdi,_Giuseppe)"
      }
    ]
  },
  {
    "slug": "iran-khamenei-state-funeral",
    "headline": "Iran opens six days of state funeral ceremonies for slain Supreme Leader Ayatollah Ali Khamenei",
    "overview": "Iran began days of public mourning for Ayatollah Ali Khamenei, who was killed at 86 in a joint US-Israeli airstrike on his compound on February 28, the first day of the war, in a burial repeatedly postponed as the conflict dragged on. Authorities said they expect up to 20 million people at ceremonies running July 3-9 across Tehran, Qom, the Iraqi shrine cities of Najaf and Karbala, and finally Mashhad, where he will be buried on July 9. His son Mojtaba, elected supreme leader in March, has scarcely appeared in public.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMiuwFBVV95cUxOQ3FKcmxXQ3lQTHVFQ1JpTTBFdnp5QmhyVXZaSVlSSHBZSUNIYkpRMmExRDJzcTFSRXF0TDdtbE1BV0xfMlNqLVpkMUFjVm1Za2xIRmRTa19CMkhRNU9zbGJqUzJ2SGs0cmNQakxTV3ktcFpueGdkZ0hEdU8tbWs0QnF5VUo3T3NveHYyNW5iSGRidmpURTBvVWR5QWlleU1KWFJCN3UzWjRvWnNsRURwYzhJUHZNT2w0dnp3?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cx2k4k7jqeno"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-03",
    "image": {
      "src": "/covers/iran-khamenei-state-funeral.png",
      "alt": "Mourners in black hold a portrait of Ayatollah Ali Khamenei during memorial ceremonies in Iran.",
      "credit": "BBC"
    },
    "rank": 28,
    "edition": "Afternoon Edition · 3 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Suetonius, \"The Life of Julius Caesar\" (c. 121 AD) — the state funeral of a slain ruler, whose grieving multitude turns the mourning into a political act",
        "excerpt": "Notice of his funeral having been solemnly proclaimed, a pile was erected in the Campus Martius, near the tomb of his daughter Julia; and before the Rostra was placed a gilded tabernacle, on the model of the temple of Venus Genitrix; within which was an ivory bed, covered with purple and cloth of gold. At the head was a trophy, with the [blood-stained] robe in which he was slain. It being considered that the whole day would not suffice for carrying the funeral oblations in solemn procession before the corpse, directions were given for every one, without regard to order, to carry them from the city into the Campus Martius, by what way they pleased.",
        "source": "Perseus",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.02.0132%3Alife%3Djul.%3Achapter%3D84"
      },
      {
        "category": "historical",
        "title": "Herodotus, \"The Histories,\" Book 9.24 (c. 430 BC) — Persians in collective mourning for a fallen leader, wailing so loud it is heard across a whole land",
        "excerpt": "When the cavalry returned to camp, Mardonius and the whole army mourned deeply for Masistius, cutting their own hair and the hair of their horses and beasts of burden, and lamenting loudly; the sound of this was heard over all Boeotia, for a man was dead who, next to Mardonius, was most esteemed by all Persia and the king.",
        "source": "Perseus",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0126%3Abook%3D9%3Achapter%3D24"
      },
      {
        "category": "literary",
        "title": "Shakespeare, \"Julius Caesar,\" Act III (1599) — Antony over the slain leader's body, turning a funeral into the founding rite of who inherits power",
        "excerpt": "Friends, Romans, countrymen, lend me your ears; I come to bury Cæsar, not to praise him. The evil that men do lives after them, The good is oft interred with their bones; So let it be with Cæsar. The noble Brutus Hath told you Cæsar was ambitious; If it were so, it was a grievous fault, And grievously hath Cæsar answer'd it.",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/Julius_Caesar_(1919)_Yale/Text/Act_III"
      },
      {
        "category": "literary",
        "title": "Homer, \"The Iliad,\" Book 24 (c. 8th c. BC) — the epic closes on the funeral rites of a fallen hero, a whole city gathered to mourn its slain defender",
        "excerpt": "And when they had piled the barrow they went back, and gathering together duly feasted a glorious feast in the palace of Priam, the king fostered of Zeus. On this wise held they funeral for horse-taming Hector.",
        "source": "Perseus",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0134%3Abook%3D24%3Acard%3D776"
      },
      {
        "category": "artistic",
        "title": "Abbas Al-Musavi, \"Battle of Karbala\" (late 19th c.) — the martyrdom of Husayn at Karbala, the founding grief of Shia tradition now written into Khamenei's own funeral itinerary",
        "excerpt": "A vast Qajar-era oil canvas that unfolds the martyrdom of Imam Husayn and his companions on the plain of Karbala, rendered not as a single moment but as an entire cosmos of sacrifice. Rows of the slain, mourning women, and the faithful of every era crowd the field, angels descending above them, so that the seventh-century martyrdom becomes an eternally present grief. It is the visual liturgy behind the Shia rites of public mourning that Iran now stages for its own fallen leader across the same holy cities of Najaf and Karbala.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Brooklyn_Museum_-_Battle_of_Karbala_-_Abbas_Al-Musavi_-_overall.jpg",
        "image": {
          "src": "/covers/iran-khamenei-state-funeral--art.png",
          "alt": "Abbas Al-Musavi's panoramic painting of the Battle of Karbala, crowded with martyrs, mourners, and descending angels around the death of Imam Husayn",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Chopin, \"Marche funèbre\" from Piano Sonata No. 2, Op. 35 (1839) — the funeral march that became civilization's shorthand for the burial of the great",
        "excerpt": "The slow, tolling third movement of Chopin's B-flat minor sonata is the funeral march the modern world reaches for when a leader is carried to the grave. Over a relentless dirge of heavy chords the melody rises like a distant procession, breaks into a brief, tender consolation, then returns inexorably to the tread of the cortège. It has accompanied countless state funerals, its measured grief the sound of a whole nation walking behind a bier.",
        "source": "IMSLP",
        "href": "https://imslp.org/wiki/Piano_Sonata_No.2,_Op.35_(Chopin,_Fr%C3%A9d%C3%A9ric)"
      }
    ]
  },
  {
    "slug": "moldova-pm-munteanu-resigns",
    "headline": "Moldovan Prime Minister Alexandru Munteanu resigns eight months into his term amid graft scandal",
    "overview": "Alexandru Munteanu announced on Friday that he was stepping down as Moldova's prime minister after just eight months in office, saying he could no longer exercise his mandate in line with his principles. His departure, which follows a corruption scandal at a state-owned air traffic management company, brings down the entire government. President Maia Sandu will now consult parliamentary groups and nominate a new candidate to lead the country wedged between Ukraine and EU member Romania.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMilwFBVV95cUxQVkJTWl9mOFBvRF8xcGtOSVMwdGpLb1U1U2xKYnFRR3c2MDBGdmxJc3V2Wkl6Tk5EU0laZjBOUXlvVFYyajBUbXNGSWxhdC1sVVZFWG02NVFzQ3RPY0JTMURBcFVEaDF5SEpuS29MS093UjdMOGkxTEhKUTMzN05fM2plUnZ0c0plR1F6YXJpUnJEVWtnczFZ?oc=5"
      },
      {
        "name": "Bloomberg",
        "href": "https://www.bloomberg.com/news/articles/2026-07-03/moldovan-prime-minister-resigns-as-graft-scandal-shakes-country"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-03",
    "image": {
      "src": "/covers/moldova-pm-munteanu-resigns.png",
      "alt": "A pale neoclassical parliament building at dusk under a grey sky.",
      "credit": "AI-generated"
    },
    "rank": 29,
    "edition": "Afternoon Edition · 3 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Livy, \"The History of Rome\" Book 3 (c. 27 BC) — Cincinnatus lays down absolute power the moment his task is done, the ideal of the leader who will not cling to office",
        "excerpt": "Quinctius resigned on the sixteenth day the dictatorship which had been conferred upon him for six months.",
        "source": "Perseus",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.02.0026%3Abook%3D3%3Achapter%3D29"
      },
      {
        "category": "historical",
        "title": "Cicero, \"Against Verres\" First Oration (70 BC) — a prosecution of a graft-riddled official that indicts the belief no rich man is ever convicted, mirroring the corruption scandal that toppled the government",
        "excerpt": "For an opinion has now become established, pernicious to us, and pernicious to the republic, which has been the common talk of every one, not only at Rome, but among foreign nations also,—that in the courts of law as they exist at present, no wealthy man, however guilty he may be, can possibly be convicted.",
        "source": "Perseus",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Cic.+Ver.+1.1.1&lang=english"
      },
      {
        "category": "literary",
        "title": "Shakespeare, \"Richard II\" Act 4 (c. 1595) — a ruler ceremonially unmaking himself, surrendering crown and mandate piece by piece, as Munteanu concedes he can no longer exercise his office",
        "excerpt": "Now mark me how I will undo myself: I give this heavy weight from off my head, And this unwieldy sceptre from my hand, The pride of kingly sway from out my heart; With mine own tears I wash away my balm, With mine own hands I give away my crown, With mine own tongue deny my sacred state, With mine own breath release all duteous rites: All pomp and majesty I do forswear.",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/Complete_Works_of_William_Shakespeare_(Oxford_1911)/Volume_4/The_Tragedy_of_King_Richard_the_Second"
      },
      {
        "category": "literary",
        "title": "Shakespeare, \"Coriolanus\" Act 3 (c. 1608) — a proud leader who cannot bend his principles to the state turns his back and walks out of power on his own terms",
        "excerpt": "You common cry of curs! whose breath I hate As reek o' the rotten fens, whose loves I prize As the dead carcasses of unburied men That do corrupt my air, I banish you... Despising, For you, the city, thus I turn my back: There is a world elsewhere.",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/Coriolanus_(1924)_Yale/Text/Act_III"
      },
      {
        "category": "artistic",
        "title": "John Trumbull, \"General George Washington Resigning His Commission\" (1824) — the voluntary handing back of power as an act of honor, the model of the leader who steps down rather than hold on",
        "excerpt": "Trumbull's vast Capitol Rotunda canvas freezes the moment in 1783 when Washington, victorious and adored, walked into the Congress at Annapolis and gave back his commission as commander-in-chief. He stands almost humbled before the seated legislators, offering up the document that made him powerful. The painting made the relinquishing of power itself the heroic subject, a rebuke to every ruler who confuses office with self.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:General_George_Washington_Resigning_his_Commission.jpg",
        "image": {
          "src": "/covers/moldova-pm-munteanu-resigns--art.png",
          "alt": "John Trumbull's painting of George Washington standing before the Continental Congress to resign his military commission in 1783",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Mussorgsky, \"Boris Godunov\" (1874) — a guilt-shadowed ruler whose legitimacy collapses, dying with the crown slipping from his grasp amid a nation between empires",
        "excerpt": "Mussorgsky's opera follows a Tsar who gained the throne under a moral stain and is slowly undone by conscience, rumor, and a restless people. In the final scene Boris, his authority crumbling, bids farewell, names a successor, and dies as power passes from him. Set on the fault line of a nation pulled between larger neighbors, its music turns the fall of a leader into a vast public reckoning.",
        "source": "IMSLP",
        "href": "https://imslp.org/wiki/Boris_Godunov_(Mussorgsky,_Modest)"
      }
    ]
  },
  {
    "slug": "eu-us-trade-record-tariffs",
    "headline": "EU-US goods trade hit a record €875 billion in 2025 despite tariffs, German institute finds",
    "overview": "Trade in goods between the European Union and the United States reached a record €875 billion last year even as new tariffs took hold, according to a study published Friday by the German Economic Institute. EU exports to the US rose 7.7% to €580 billion, lifting the bloc's trade surplus to nearly €285 billion, though researchers said the figures were flattered by companies front-loading shipments ahead of April's duties. Beneath the record, European carmakers were hit hard: EU vehicle and parts exports to the US fell 20.4%, with German shipments down 18.9%.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMirgFBVV95cUxQcmRSZ1pJNUhacVlzZWFEeGF6aDNXUk5tTkc5cWNsb2dnWkZFUnYxWlpELXJlX0lzUEVvV0JpRVdEQVZwN3FoNWJieUNQa2pxZWthMEZFUXRwbm1GYXdqN29hTlN2RnAtSzJHc3VnUEx1aExRcG5MSDdzSzk1RnZOendzdk9RQ3NRT1dtY1FNMmIzNnk0WnFqYmp2VVNkZWI4M1IwQ1V6Zmd3S2ZWWmc?oc=5"
      },
      {
        "name": "Investing.com",
        "href": "https://www.investing.com/news/economic-indicators/eu-trade-with-us-hits-record-despite-tariff-tensions-study-shows-4775030"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-03",
    "image": {
      "src": "/covers/eu-us-trade-record-tariffs.png",
      "alt": "Stacked shipping containers and gantry cranes at a European container terminal.",
      "credit": "Wikimedia Commons"
    },
    "rank": 30,
    "edition": "Afternoon Edition · 3 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Pliny the Elder, \"Natural History\" (77 AD) — Rome's trade with the East swells even as coin drains away and wares return at a hundredfold markup, an ancient mirror of Europe's soaring surplus with America",
        "excerpt": "The subject is one well worthy of our notice, seeing that in no year does India drain our empire of less than five hundred and fifty millions of sesterces, giving back her own wares in exchange, which are sold among us at fully one hundred times their prime cost.",
        "source": "Perseus",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.02.0137%3Abook%3D6%3Achapter%3D26"
      },
      {
        "category": "historical",
        "title": "Herodotus, \"The Histories\" (c. 430 BC) — Carthaginian and Libyan traders exchange cargo for gold across a gulf of language and mistrust, commerce flourishing over a divide neither side crosses in person",
        "excerpt": "There is a place in Libya, they say, where men live beyond the Pillars of Heracles; they come here and unload their cargo; then, having laid it in order along the beach, they go aboard their ships and light a smoking fire. The people of the country see the smoke, and, coming to the sea, they lay down gold to pay for the cargo, and withdraw from the wares.",
        "source": "Perseus",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0126%3Abook%3D4%3Achapter%3D196"
      },
      {
        "category": "literary",
        "title": "Adam Smith, \"The Wealth of Nations\" (1776) — the maxim that a nation, like a household, gains by buying abroad what costs more to make at home, the free-trade logic that April's duties defy",
        "excerpt": "It is the maxim of every prudent master of a family, never to attempt to make at home what it will cost him more to make than to buy. The tailor does not attempt to make his own shoes, but buys them of the shoemaker. The shoemaker does not attempt to make his own clothes, but employs a tailor. The farmer attempts to make neither the one nor the other, but employs those different artificers.",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/files/3300/3300-h/3300-h.htm"
      },
      {
        "category": "literary",
        "title": "Frédéric Bastiat, \"The Candlemakers' Petition\" (1845) — a mock plea to bar a cheaper foreign rival lays bare the paradox of protectionism now taxing European cars into the American market",
        "excerpt": "We are suffering from the intolerable competition of a foreign rival, placed, it would seem, in a condition so far superior to ours for the production of light, that he absolutely inundates our national market with it at a price fabulously reduced. The moment he shows himself, our trade leaves us—all consumers apply to him; and a branch of native industry, having countless ramifications, is all at once rendered completely stagnant.",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/Candlemakers%27_Petition"
      },
      {
        "category": "artistic",
        "title": "Claude Lorrain, \"Seaport with the Embarkation of the Queen of Sheba\" (1648) — a golden harbour crowded with merchants and cargo, the bustling port of commerce made luminous",
        "excerpt": "Claude's imaginary Mediterranean port glows at sunrise: merchants and porters move bales and barrels along the quay, tall ships ride at anchor, and figures load cargo into rowing boats as the day's trade begins. Grand classical facades frame a harbour humming with the traffic of goods and people. It is commerce idealized, a vision of maritime prosperity that outlasts the biblical pretext of its title.",
        "source": "The National Gallery, London",
        "href": "https://www.nationalgallery.org.uk/paintings/claude-seaport-with-the-embarkation-of-the-queen-of-sheba",
        "image": {
          "src": "/covers/eu-us-trade-record-tariffs--art.png",
          "alt": "Claude Lorrain's 1648 painting of a sunlit Mediterranean seaport, its quays crowded with merchants and cargo, tall ships at anchor before grand classical buildings.",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Nikolai Rimsky-Korsakov, \"Sadko\" (1897) — foreign merchant-guests sing the riches of their homelands in Novgorod's trading hall, a musical pageant of goods crossing seas and borders",
        "excerpt": "In Rimsky-Korsakov's operatic epic the poor gusli-player Sadko rises to become a merchant-adventurer trading across the seas. Its celebrated market scene brings on the foreign traders—the Viking, Indian, and Venetian guests—each singing of the wealth of his distant homeland. The music turns international commerce into spectacle, wealth flowing between peoples divided by oceans and tongues.",
        "source": "IMSLP",
        "href": "https://imslp.org/wiki/Sadko_(opera)_(Rimsky-Korsakov,_Nikolay)"
      }
    ]
  },
  {
    "slug": "egg-producers-price-fixing-settlement",
    "headline": "Egg producers Cal-Maine, Versova and Hickman's to pay $3.3 million and donate 53 million eggs over price-fixing",
    "overview": "Three of the largest US egg producers — Cal-Maine Foods, Versova and Hickman's Egg Ranch — agreed to pay a combined $3.3 million and donate 53 million eggs to settle allegations by the Justice Department and 17 states that they conspired to inflate prices. Prosecutors said the companies coordinated bids to push up a key industry price index between 2022 and 2025, a period when average US egg prices peaked at a record $6.23 a dozen. None of the companies admitted wrongdoing; the donated eggs will go to nonprofits.",
    "genre": "Economy",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMilgFBVV95cUxOT3paelRnUklQRTVOS2pONEVzNlp5cHNDM05QUUtxS1dVRmFSZmJucEhkNEhvQmw4ZThDb0pta0xvUEFucW9QMWh5YWE1bkxTWmlOOThLRDhvRGhsSkViTDdITjBLanZhbnlfRUUxR0JXX3FBdHRoNXhsc2M4QjI3VU9kd0hfSXhSWXdrYjNDVjlsZXBYa2c?oc=5"
      },
      {
        "name": "CNBC",
        "href": "https://www.cnbc.com/2026/06/30/egg-producers-settle-price-inflation-probe-for-3point3-million.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-03",
    "image": {
      "src": "/covers/egg-producers-price-fixing-settlement.png",
      "alt": "Rows of brown chicken eggs in open cartons.",
      "credit": "Wikimedia Commons"
    },
    "rank": 31,
    "edition": "Afternoon Edition · 3 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Lysias, \"Against the Corn-Dealers\" (c. 386 BC) — Athens prosecutes a ring of grain sellers for hoarding a staple to keep the price high",
        "excerpt": "For, just when you find yourselves worst off for corn, these persons snap it up and refuse to sell it, in order to prevent our disputing about the price: we are to be glad enough if we come away from them with a purchase made at any price, however high.",
        "source": "Perseus",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0154:speech=22:section=15"
      },
      {
        "category": "historical",
        "title": "Ulpian on the lex Julia de annona, Digest of Justinian 48.12.2 (3rd c. AD) — Roman law fining anyone who forms a combine to inflate the price of provisions",
        "excerpt": "By the Julian Law relating to Provisions a penalty is prescribed against him who commits any act, or forms any association by means of which the price of provisions may be increased.",
        "source": "Digest of Justinian (Scott trans., droitromain, Univ. Grenoble)",
        "href": "https://droitromain.univ-grenoble-alpes.fr/Anglica/D48_Scott.htm"
      },
      {
        "category": "literary",
        "title": "Adam Smith, \"The Wealth of Nations\" (1776) — the classic warning that traders who gather together drift into conspiracy to raise prices",
        "excerpt": "People of the same trade seldom meet together, even for merriment and diversion, but the conversation ends in a conspiracy against the public, or in some contrivance to raise prices.",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/files/3300/3300-h/3300-h.htm"
      },
      {
        "category": "literary",
        "title": "Genesis 47:14 (King James Version) — Joseph corners Egypt's grain in the famine and gathers up all the money for the corn men buy",
        "excerpt": "And Joseph gathered up all the money that was found in the land of Egypt, and in the land of Canaan, for the corn which they bought: and Joseph brought the money into Pharaoh's house.",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Genesis"
      },
      {
        "category": "artistic",
        "title": "Joachim Beuckelaer, \"The Four Elements: Air\" (1570) — a lavish poultry-and-egg market whose seductive abundance masks a moral about appetite and gain",
        "excerpt": "Beuckelaer heaps his foreground with the spoils of a produce market: baskets of eggs, stacked cheeses, and plucked and living fowl piled for sale. The tender realism of everyday provisions is deliberately alluring, an invitation to gluttony and greed, while the tiny Prodigal Son squandering his money in the distance supplies the quiet reckoning. The staples of the ordinary table become the stage for a sermon on human appetite.",
        "source": "The National Gallery, London",
        "href": "https://www.nationalgallery.org.uk/paintings/joachim-beuckelaer-the-four-elements-air",
        "image": {
          "src": "/covers/egg-producers-price-fixing-settlement--art.png",
          "alt": "Joachim Beuckelaer's 1570 painting of a crowded poultry market, its foreground heaped with baskets of eggs, cheeses, and fowl for sale",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Richard Wagner, \"Das Rheingold\" (1869) — Alberich curses love to seize the hoard, and the greed for that gold sets the whole reckoning in motion",
        "excerpt": "Das Licht lösch ich euch aus, entreiße dem Riff das Gold, schmiede den rachenden Ring; denn hör' es die Fluth: so verfluch' ich die Liebe!",
        "source": "IMSLP",
        "href": "https://imslp.org/wiki/Das_Rheingold,_WWV_86A_(Wagner,_Richard)"
      }
    ]
  },
  {
    "slug": "nasa-swift-telescope-rescue-delay",
    "headline": "Last-minute rocket problem grounds NASA's mission to rescue the aging Swift space telescope",
    "overview": "A rush mission to save NASA's Swift Observatory remained grounded after a Northrop Grumman carrier plane, flying from the Marshall Islands, aborted the release of its Pegasus rocket when engineers spotted a warning in the data. NASA has hired Katalyst Space Technologies, under a $30 million contract, to fly a robotic servicing craft with three articulated arms to boost the 2004 telescope, which studies gamma-ray bursts and exploding stars. Without intervention, Swift is expected to fall back into the atmosphere by October; no new launch date has been set.",
    "genre": "Science",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMinAFBVV95cUxPb3lZSEZPSTU3Yy0zTkVFb3NYdjhNZW9rOFNOaVpwb1huRUlUQU1uaHd4LTlXSmxkSEJYTkpja242YmpKcVZNRjZNeEZIaEFJX1Q5MFd6OV93XzNGbFNaZ2RfcW9yc1ZfbVJlN3dTVEV2QlJKWXZlR2FNTzA2WDFXTGtONG1MT1FGQlZzMVhPVGp4VTlFQUl2eV8xemI?oc=5"
      },
      {
        "name": "Space.com",
        "href": "https://www.space.com/space-exploration/launches-spacecraft/nasa-to-launch-ambitious-mission-to-save-a-space-telescope-from-burning-up-in-earths-atmosphere"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-03",
    "image": {
      "src": "/covers/nasa-swift-telescope-rescue-delay.png",
      "alt": "A rendering of NASA's Swift Observatory, a gold-wrapped space telescope with solar panels, against black.",
      "credit": "NASA/Wikimedia Commons"
    },
    "rank": 32,
    "edition": "Afternoon Edition · 3 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Galileo Galilei, \"The Sidereal Messenger\" (1610) — the wonder of a fragile new instrument turned to the heavens, the same discovery drive Swift embodies",
        "excerpt": "After the Moon, I frequently observed other heavenly bodies, both fixed stars and planets, with incredible delight; and, when I saw their very great number, I began to consider about a method by which I might be able to measure their distances apart, and at length I found one.",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/files/46036/46036-h/46036-h.htm"
      },
      {
        "category": "historical",
        "title": "Pliny the Younger, \"Letters\" Book VI (c. 107 CE) — Pliny the Elder orders his ships toward the erupting Vesuvius to rescue the stranded, a daring sail into danger like the Swift servicing run",
        "excerpt": "He ordered the galleys to be put to sea, and went himself on board with an intention of assisting not only Rectina, but the several other towns which lay thickly strewn along that beautiful coast. Hastening then to the place from whence others fled with the utmost terror, he steered his course direct to the point of danger.",
        "source": "Project Gutenberg",
        "href": "https://gutenberg.org/files/2811/2811-h/2811-h.htm"
      },
      {
        "category": "literary",
        "title": "Ovid, \"Metamorphoses\" Book VIII (8 CE) — Icarus climbs too near the sun and plunges into the sea, the archetype of a bright craft falling back to earth",
        "excerpt": "The vicinity of the scorching Sun softened the fragrant wax that fastened his wings. The wax was melted; he shook his naked arms, and, wanting his oar-like wings, he caught no more air. His face, too, as he called on the name of his father, was received in the azure water, which received its name from him.",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/files/26073/26073-h/26073-h.htm"
      },
      {
        "category": "literary",
        "title": "Alfred, Lord Tennyson, \"The Eagle\" (1851) — a lord of the high skies who, in an instant, drops like a thunderbolt from his lonely height",
        "excerpt": "He clasps the crag with crooked hands;\nClose to the sun in lonely lands,\nRing'd with the azure world, he stands.\n\nThe wrinkled sea beneath him crawls;\nHe watches from his mountain walls,\nAnd like a thunderbolt he falls.",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Eagle_(Tennyson)"
      },
      {
        "category": "artistic",
        "title": "Pieter Bruegel the Elder, \"Landscape with the Fall of Icarus\" (c. 1560) — the falling flyer slips almost unnoticed into the sea while the world carries on, the quiet stakes of a fading observatory",
        "excerpt": "In Bruegel's panel the plowman, shepherd and fisherman labor on beneath a golden sky while, unseen at the lower right, only two pale legs vanish into the green sea. The catastrophe of a fallen sky-traveler is reduced to a tiny splash at the edge of an indifferent world, a meditation on how easily even a glorious flight ends and is forgotten.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_de_Oude_-_De_val_van_Icarus.jpg",
        "image": {
          "src": "/covers/nasa-swift-telescope-rescue-delay--art.png",
          "alt": "Bruegel's Landscape with the Fall of Icarus: a sunlit harbor and plowman in the foreground, with Icarus's legs disappearing into the sea at lower right",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Joseph Haydn, \"The Heavens Are Telling\" from \"The Creation\" (1798) — a soaring chorus to the glory written across the sky, the very heavens Swift was built to read",
        "excerpt": "The heavens are telling the glory of God,\nThe wonder of his work displays the firmament.",
        "source": "IMSLP",
        "href": "https://imslp.org/wiki/Die_Sch%C3%B6pfung,_Hob.XXI:2_(Haydn,_Joseph)"
      }
    ]
  },
  {
    "slug": "alibaba-bans-anthropic-claude-code",
    "headline": "Alibaba orders staff to stop using Anthropic's Claude Code coding tool, citing security concerns",
    "overview": "Alibaba has told employees to stop using Anthropic's Claude Code agent, with a ban taking effect July 10, after scrutiny of code that the Chinese group said could help identify China-linked users. The move follows Anthropic's accusation last month that Alibaba illicitly extracted its models in what it called the largest attack of its kind; Anthropic says the flagged feature was an experiment to curb account abuse. Employees have been directed to Alibaba's in-house coding platform, Qoder.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMivgFBVV95cUxPc1ozV1JIcjJDWWRCZGZZZEN0Z0p4dHVpMkw3eXBWMF9EMlJOemlKSEg1WVRjV2I5VklmMGFFT3FLblVuTEtKa3dYUXctSmpMS0tQdzJhbmhGTEVlRjhHSWdrUUlXZXJydTN2Q3JQTXRSWUVzVkh5TThmaEtVZURBMzdFTHFHaWI0UE43aUw1QS1vbXRoS3BmRUQ0bExHZ0hDQzRmc09kSkxlNUVDOGxNRXctN2dWWGwtX21DSnN3?oc=5"
      },
      {
        "name": "The Standard",
        "href": "https://www.thestandard.com.hk/innovation/article/336315/Alibaba-to-ban-employees-from-using-Anthropics-coding-tool-source-says"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-03",
    "image": {
      "src": "/covers/alibaba-bans-anthropic-claude-code.png",
      "alt": "A dim data hall of glowing server cabinets with a sealed steel door.",
      "credit": "AI-generated"
    },
    "rank": 33,
    "edition": "Afternoon Edition · 3 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Qianlong Emperor, Edict to King George III (1793) — a rising power spurns a foreign tool, trusting its own house to supply all it needs",
        "excerpt": "As your Ambassador can see for himself, we possess all things. I set no value on objects strange or ingenious, and have no use for your country's manufactures. This then is my answer to your request to appoint a representative at my Court, a request contrary to our dynastic usage, which would only result in inconvenience to yourself.",
        "source": "Fordham Internet Modern History Sourcebook",
        "href": "https://sourcebooks.fordham.edu/mod/1793qianlong.asp"
      },
      {
        "category": "historical",
        "title": "Lord Byron, Speech on the Frame Work Bill, House of Lords (1812) — workers smash the new machines they believe were built to displace and impoverish them",
        "excerpt": "By the adoption of one species of Frame in particular, one man performed the work of many, and the superfluous labourers were thrown out of employment. Yet it is to be observed, that the work thus executed was inferior in quality... The rejected workmen in the blindness of their ignorance, instead of rejoicing at these improvements in arts so beneficial to mankind, conceived themselves to be sacrificed to improvements in mechanism.",
        "source": "Hansard, UK Parliament",
        "href": "https://api.parliament.uk/historic-hansard/lords/1812/feb/27/frame-work-bill"
      },
      {
        "category": "literary",
        "title": "Virgil, \"Aeneid\" Book II (19 BC) — Laocoön warns Troy that the enemy's magnificent gift conceals armed men, and to fear it even as they receive it",
        "excerpt": "'o miseri, quae tanta insania, cives? creditis avectos hostis? aut ulla putatis dona carere dolis Danaum? sic notus Ulixes? aut hoc inclusi ligno occultantur Achivi, aut haec in nostros fabricata est machina muros, inspectura domos venturaque desuper urbi, aut aliquis latet error; equo ne credite, Teucri. quidquid id est, timeo Danaos et dona ferentis.'",
        "source": "The Latin Library",
        "href": "https://www.thelatinlibrary.com/vergil/aen2.shtml"
      },
      {
        "category": "literary",
        "title": "Aeschylus, \"Prometheus Bound\" (c. 5th c. BC) — the theft of a jealously guarded fire, handed to mortals so they might master every art",
        "excerpt": "Chorus: A great benefit was this you gave to mortals. Prometheus: In addition, I gave them fire. Chorus: What! Do creatures of a day now have flame-eyed fire? Prometheus: Yes, and from it they shall learn many arts.",
        "source": "Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0010:card=244"
      },
      {
        "category": "artistic",
        "title": "Giovanni Domenico Tiepolo, \"The Procession of the Trojan Horse in Troy\" (c. 1760) — a jubilant city hauls the beautiful foreign engine through its own gates, not seeing the danger sealed inside",
        "excerpt": "Tiepolo paints the fatal moment of welcome: crowds strain at ropes and pulleys to drag the towering wooden horse toward the walls of Troy, banners and trumpets turning a mortal threat into a festival. The Trojans read the object as a trophy and a gift; the viewer, knowing Virgil, sees the hidden soldiers and the smoke of the coming sack. The painting is a study in misplaced trust — a whole people ushering the enemy in with their own hands.",
        "source": "National Gallery, London",
        "href": "https://www.nationalgallery.org.uk/paintings/giovanni-domenico-tiepolo-the-procession-of-the-trojan-horse-into-troy",
        "image": {
          "src": "/covers/alibaba-bans-anthropic-claude-code--art.png",
          "alt": "Oil painting by Giovanni Domenico Tiepolo showing a crowd of Trojans hauling a large wooden horse on a wheeled base toward the city walls, with banners and figures gesturing in celebration.",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Ludwig van Beethoven, \"The Creatures of Prometheus,\" Op. 43 (1801) — a ballet on the Titan who steals fire and knowledge and bestows the arts on humankind",
        "excerpt": "Beethoven's only full-length ballet dramatizes the Prometheus myth as a gift of enlightenment: the Titan brings stolen fire down to lifeless clay figures and awakens them into thinking, feeling, art-making beings. Its quicksilver overture bursts open like a spark leaping to tinder, and its finale theme so pleased Beethoven that he reused it in the Eroica Symphony. The music frames technology's transfer as both a liberation and a transgression — power taken from its guardians and placed in new hands.",
        "source": "IMSLP",
        "href": "https://imslp.org/wiki/Die_Geschöpfe_des_Prometheus_Op.43_(Beethoven,_Ludwig_van)"
      }
    ]
  },
  {
    "slug": "eu-lawmaker-pegasus-spyware-hack",
    "headline": "Citizen Lab says Greek ex-MEP Stelios Kouloglou was hacked with Pegasus while probing spyware abuses",
    "overview": "The Toronto-based research group Citizen Lab reported Friday that the iPhone of Stelios Kouloglou, a Greek investigative journalist and member of the European Parliament from 2015 to 2024, was infected with NSO Group's Pegasus spyware at least three times in 2022 and 2023. The hacks came while he sat on the parliamentary committee investigating the illegal use of Pegasus across the EU. Researchers did not name the government behind the attack but linked it to an operator that had targeted journalists across Europe; Kouloglou said he plans to sue NSO Group.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMizgFBVV95cUxOSXpnRVhYUFJmVkRtMkFfcEV0MW55b25EQWR0aENNZGt3cnVMcVMyVlhCZmVpRDQ5RUdkMnI0UHBwT051MjFWSThRZzY1Rm14RmFzZWRUQzN6T245Rks4dE5FNUU0ZEVEdmZUbGltX1lQOEEtNUVRM3BHdzZzV1JYRFc5ODJ4bTRCeC1VbE1iSGdPaXlrMFNTLWxoWkV5SURVRmQxTXdEMm9TcnE2U3k1cXdxQTF0UnRGWGQyYkRNUHZHanBLdTFidl84UDlJZw?oc=5"
      },
      {
        "name": "TechCrunch",
        "href": "https://techcrunch.com/2026/07/02/politician-who-investigated-spyware-abuses-had-his-phone-hacked-with-pegasus-spyware/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-03",
    "image": {
      "src": "/covers/eu-lawmaker-pegasus-spyware-hack.png",
      "alt": "A smartphone glowing on a dark desk with a watching eye reflected in its screen.",
      "credit": "AI-generated"
    },
    "rank": 34,
    "edition": "Afternoon Edition · 3 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Jeremy Bentham, \"Panopticon; or, The Inspection-House\" (1791) — the blueprint for an all-seeing eye that keeps the watched under constant, invisible observation",
        "excerpt": "It is obvious that, in all these instances, the more constantly the persons to be inspected are under the eyes of the persons who should inspect them, the more perfectly will the purpose of the establishment have been attained. Ideal perfection, if that were the object, would require that each person should actually be in that predicament, during every instant of time.",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/Panopticon_or_the_Inspection-House"
      },
      {
        "category": "historical",
        "title": "Tacitus, \"The Annals,\" Book IV (c. 116 AD) — Sejanus's informers reported even a prince's private sighs, the surveillance state that leaves no thought unwatched",
        "excerpt": "Whether the young prince spoke or held his tongue, silence and speech were alike criminal. Every night had its anxieties, for his sleepless hours, his dreams and sighs were all made known by his wife to her mother Livia and by Livia to Sejanus.",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Annals_(Tacitus)/Book_4"
      },
      {
        "category": "literary",
        "title": "Juvenal, \"Satire VI\" (early 2nd c. AD) — 'but who will guard the guardians themselves?', the ancient doubt that the watchers cannot be trusted",
        "excerpt": "audio quid ueteres olim moneatis amici, / 'pone seram, cohibe.' sed quis custodiet ipsos / custodes? cauta est et ab illis incipit uxor. [I hear all this while, the advice my old friends give: 'bolt the door, keep her in.' But who is to guard the guards themselves? The wife plans ahead, and begins with them.]",
        "source": "The Latin Library",
        "href": "https://www.thelatinlibrary.com/juvenal/6.shtml"
      },
      {
        "category": "literary",
        "title": "Ovid, \"Metamorphoses,\" Book I (8 AD) — hundred-eyed Argus set to watch over Io, the all-seeing guardian whose eyes never all close at once",
        "excerpt": "Centum luminibus cinctum caput Argus habebat: / inde suis vicibus capiebant bina quietem, / cetera servabant atque in statione manebant. [Argus had a head encircled with a hundred eyes: from these, two by turns took their rest, while the rest kept watch and stayed on guard.]",
        "source": "Perseus",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0029:book=1:card=622"
      },
      {
        "category": "artistic",
        "title": "Diego Velázquez, \"Mercury and Argus\" (c. 1659) — the all-seeing watchman lulled asleep and about to be slain, the surveillant caught off guard",
        "excerpt": "Velázquez's late canvas catches the myth at its hinge: the hundred-eyed sentinel Argus slumped in heavy sleep, his ceaseless vigilance at last undone, while Mercury creeps in low and barely seen, blade ready, to behead the watchman and free the captive Io. The eye that was meant to see everything is the one taken unaware — the watcher watched, and then destroyed.",
        "source": "Museo del Prado",
        "href": "https://www.museodelprado.es/en/the-collection/art-work/mercury-and-argus/d15f630f-cc1c-42c4-80e6-14087dfcecb5",
        "image": {
          "src": "/covers/eu-lawmaker-pegasus-spyware-hack--art.png",
          "alt": "Velázquez's painting Mercury and Argus: the hundred-eyed watchman Argus asleep while the god Mercury steals in with a sword to kill him",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Jean-Baptiste Lully, \"Isis,\" LWV 54 (1677) — an opera that stages Argus, the hundred-eyed spy, whose relentless watch over Io ends in his own death",
        "excerpt": "Quinault's libretto, drawn from Ovid, hands the nymph Io to jealous Juno's guardian, the hundred-eyed Argus, who never wholly sleeps; Mercury must lull the tireless spy with the tale of Pan and Syrinx before he can strike him down. Lully's tragédie en musique turns the ancient machinery of surveillance — an ever-open eye planted over an innocent — into court spectacle, and Louis XIV's audience read into it the real informers and intrigues of their own watching court.",
        "source": "IMSLP",
        "href": "https://imslp.org/wiki/Isis,_LWV_54_(Lully,_Jean-Baptiste)"
      }
    ]
  },
  {
    "slug": "europe-heatwave-excess-deaths",
    "headline": "At least 3,700 excess deaths recorded in France, Belgium and the Netherlands during June heatwave",
    "overview": "France, Belgium and the Netherlands together recorded at least 3,700 excess deaths during the extreme heat that gripped Europe in late June, national authorities said, warning the preliminary toll could climb. France counted about 2,025 excess deaths, Belgium roughly 1,200 and the Netherlands around 480, with the elderly worst affected. Scientists said the heatwave, among the most severe on record for the continent, was almost certainly intensified by climate change.",
    "genre": "Climate",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMi4gFBVV95cUxQM1dpenBjM01NWi1iUlVVUkZrZEg0ZnNrbHhQTnpSZVYwSlRrLVpFRy1ZbzZNblBHZTR1SFVKMTFGVGZQSTdrY1RIRXRoT0NwVGJDT2dYWDBibmhLOGo3ekJsSkw4TkNuR3hkRTVBeDY1eG9lcE5paDJFdUNZYmQ1Mk9zSkRiS2dRWm9LX2FaWFZkX1NhR1VPSlJTRTZrRlI0Tm5VS2Y1dWRmaHpwbERxUkpWZUEyMUFIZlpWenFnSFJ0SkFLYzZxZVlRTWg5ejBlQUgwcUwwQkRmTmcyMUlGVXJB?oc=5"
      },
      {
        "name": "The Star",
        "href": "https://www.thestar.com.my/news/world/2026/07/03/at-least-3700-excess-deaths-reported-during-heatwave-in-france-belgium-and-netherlands"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-03",
    "image": {
      "src": "/covers/europe-heatwave-excess-deaths.png",
      "alt": "A deserted sun-bleached city square shimmering under a white-hot sky.",
      "credit": "AI-generated"
    },
    "rank": 35,
    "edition": "Afternoon Edition · 3 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Thucydides, \"History of the Peloponnesian War\" (c. 431–404 BCE) — a great city's mass mortality in the hot season, the dying crowding the fountains for water, mirrors the crush of heat deaths in Europe's cities",
        "excerpt": "An aggravation of the existing calamity was the influx from the country into the city, and this was especially felt by the new arrivals. As there were no houses to receive them, they had to be lodged at the hot season of the year in stifling cabins, where the mortality raged without restraint. The bodies of dying men lay one upon another, and half-dead creatures reeled about the streets and gathered round all the fountains in their longing for water.",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/ebooks/7142"
      },
      {
        "category": "historical",
        "title": "Gilbert White, \"The Natural History of Selborne\" (1789) — the naturalist's account of the blank, blood-coloured sun and killing heat of the summer of 1783, an omen-laden season felt across all Europe, prefigures a heatwave read as a warning from the sky",
        "excerpt": "The summer of the year 1783 was an amazing and portentous one, and full of horrible phaenomena... The sun, at noon, looked as blank as a clouded moon, and shed a rust-coloured ferruginous light on the ground, and floors of rooms; but was particularly lurid and blood-coloured at rising and setting. All the time the heat was so intense that butchers' meat could hardly be eaten on the day after it was killed.",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/ebooks/1408"
      },
      {
        "category": "literary",
        "title": "Ovid, \"Metamorphoses,\" Book II (8 CE) — Phaethon loses the reins of the sun-chariot and scorches the whole earth, cities and peoples consumed, the archetypal image of a sky gone lethally hot",
        "excerpt": "The grass is blighted; trees are burnt up with their leaves; the ripe brown crops give fuel for self destruction—Oh what small complaints! Great cities perish with their walls, and peopled nations are consumed to dust— the forests and the mountains are destroyed.",
        "source": "Perseus",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.02.0028%3Abook%3D2"
      },
      {
        "category": "literary",
        "title": "Hesiod, \"Works and Days\" (c. 700 BCE) — the season of wearisome heat when Sirius parches the body and \"men are feeblest,\" the ancient knowledge that extreme heat drains human strength first, as it fell hardest on Europe's elderly",
        "excerpt": "But when the artichoke flowers, and the chirping grass-hopper sits in a tree and pours down his shrill song continually from under his wings in the season of wearisome heat, then goats are plumpest and wine sweetest; women are most wanton, but men are feeblest, because Sirius parches head and knees and the skin is dry through heat.",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/ebooks/348"
      },
      {
        "category": "artistic",
        "title": "Peter Paul Rubens, \"The Fall of Phaeton\" (c. 1604/1605) — the sun-chariot's horses bolting as the reckless driver plunges, a baroque vision of the heavens set ablaze and thrown out of balance",
        "excerpt": "Painted in Rome by the young Rubens, the canvas seizes the instant the Sun's chariot careens off course: rearing horses twist against a sky ripped by lightning, and human figures tumble headlong as fire and cold collide. It renders in paint the same terror Ovid described—a burning sky and a world scorched when the mechanism that governs the sun's heat spins out of control.",
        "source": "The National Gallery of Art",
        "href": "https://commons.wikimedia.org/wiki/File:Peter_Paul_Rubens_-_The_Fall_of_Phaeton_(National_Gallery_of_Art).jpg",
        "image": {
          "src": "/covers/europe-heatwave-excess-deaths--art.png",
          "alt": "Rubens's The Fall of Phaeton: the runaway horses of the sun-chariot rear amid lightning as Phaethon and other figures plunge from a blazing sky",
          "credit": "National Gallery of Art / Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Antonio Vivaldi, \"Summer\" (L'estate) from The Four Seasons, Op. 8 (1725) — the accompanying sonnet opens with man and beast languishing under a blazing sun before a violent storm breaks, heat and its climate-driven fury set to music",
        "excerpt": "Sotto dura Staggion dal Sole accesa / Langue l'huom, langue 'l gregge, ed arde il Pino; / Scioglie il Cucco la Voce, e tosto intesa / Canta la Tortorella e 'l gardelino. (Beneath the harsh season kindled by the sun, man languishes, the flock languishes, and the pine burns.)",
        "source": "IMSLP",
        "href": "https://imslp.org/wiki/Le_quattro_stagioni_(Vivaldi,_Antonio)"
      }
    ]
  },
  {
    "slug": "portugal-croatia-round-of-16",
    "headline": "Ronaldo and Ramos strike as Portugal beat Croatia 2-1 to reach the World Cup round of 16",
    "overview": "Portugal came from behind to beat Croatia 2-1 and advance at the 2026 World Cup, with Cristiano Ronaldo equalizing from the penalty spot in the 68th minute after Ivan Perisic had put Croatia ahead. Gonçalo Ramos headed in Rafael Leão's cross in the 94th minute for a dramatic winner, and Croatia had a 103rd-minute equalizer disallowed for a marginal offside after a VAR review. Portugal will face Spain in the round of 16.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMilwFBVV95cUxQMlA0N1hodEYwZDBPQVFBSS1vUUo4NER6enZ2YTNKWlhkLXZnbU1HbzFDMjl5MTE0TVZTQnhZNlNCc1UwXzk5aEhNWGVWSk9EcUR0V01qaGRzV25jM3dSMDNfZDAzMDhuYVpENW52eklmZldVNHZPOVhwaDdKcEpIa0RjSDJWUXNGSllvRUZjMlQ1dWY0TElF?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMivAFBVV95cUxONHFXWmY3VXZZUjgwWEdMUXg2U1pmam9aTHNfNGp0Zi1iRmE1ZnBVWnpWS2w2Vm0yazlnN285cjQ3QlBIMWRuVlpCWkxDZGg5RVVCSWQwZ2VxOGdBRkI3akJDZnh5eW9SNUdUZndRZkdzOEV1WEZVSnN0Nlp1bHBEYzEyeU85elEwNTVYWGstRFpLYzBNNDlTWDF1OFltbWt0RjJEakhUMHRKeUp2czc5RDVjY19scU44S1U1Mg?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-03",
    "image": {
      "src": "/covers/portugal-croatia-round-of-16.png",
      "alt": "An empty floodlit football stadium at night with a ball on the penalty spot.",
      "credit": "AI-generated"
    },
    "rank": 36,
    "edition": "Afternoon Edition · 3 July 2026",
    "analogies": [
      {
        "category": "literary",
        "title": "Homer, \"Iliad,\" Book XXIII (c. 8th century BC) — the funeral-games footrace decided at the very last stride, like Ramos's 94th-minute winner",
        "excerpt": "But when they were now about to dart forth to win the prize, then Aias slipped as he ran—for Athene hampered him—where was strewn the filth from the slaying of the loud bellowing bulls that swift-footed Achilles had slain in honour of Patroclus... So then much-enduring, goodly Odysseus took up the bowl, seeing he came in the first.",
        "source": "Perseus",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0134:book=23:card=740"
      },
      {
        "category": "literary",
        "title": "Pindar, \"Olympian Ode 1\" (476 BC) — the victory ode crowning a champion, the song of triumph a great win still summons",
        "excerpt": "Water is best, and gold, like a blazing fire in the night, stands out supreme of all lordly wealth. But if, my heart, you wish to sing of contests, look no further for any star warmer than the sun, shining by day through the lonely sky, and let us not proclaim any contest greater than Olympia... A victor throughout the rest of his life enjoys honeyed calm, so far as contests can bestow it.",
        "source": "Perseus",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0162:book=O.:poem=1"
      },
      {
        "category": "historical",
        "title": "Herodotus, \"Histories,\" 8.26 (c. 430 BC) — Greeks who contend not for money but for glory, the pure drama behind a knockout tie",
        "excerpt": "When he heard that the prize was not money but a crown, he could not hold his peace, but cried, “Good heavens, Mardonius, what kind of men are these that you have pitted us against? It is not for money they contend but for glory of achievement!”",
        "source": "Perseus",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0126:book=8:chapter=26"
      },
      {
        "category": "historical",
        "title": "Pausanias, \"Description of Greece,\" 8.40 (2nd century AD) — Arrhachion proclaimed Olympic victor at the last gasp, a result hanging on the finest margin like Croatia's disallowed 103rd-minute equalizer",
        "excerpt": "For when he was contending for the wild olive with the last remaining competitor... Arrhachion dislocated his opponent's toe, but expired owing to suffocation; but he who suffocated Arrhachion was forced to give in at the same time because of the pain in his toe. The Eleans crowned and proclaimed victor the corpse of Arrhachion.",
        "source": "Perseus",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0160:book=8:chapter=40"
      },
      {
        "category": "artistic",
        "title": "Myron, \"Discobolus\" (c. 450 BC, Roman marble copy) — the athlete's body coiled to its decisive instant, the timeless image of effort and glory in the games",
        "excerpt": "Myron's lost bronze survives in Roman marble copies like this one in Rome's Palazzo Massimo: a discus-thrower wound to the split-second before release, weight loaded, arm swept back, every muscle gathered for the throw. It froze athletic striving at its peak of tension and became antiquity's enduring emblem of the contest — the whole drama of sport compressed into one held breath, the moment before glory is won or lost.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Discobolus_in_National_Roman_Museum_Palazzo_Massimo_alle_Terme.JPG",
        "image": {
          "src": "/covers/portugal-croatia-round-of-16--art.png",
          "alt": "Roman marble copy of Myron's Discobolus, a nude athlete coiled to throw the discus, in the Palazzo Massimo alle Terme, Rome",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Handel, \"See, the Conqu'ring Hero Comes,\" from Judas Maccabaeus, HWV 63 (1747) — the triumphal chorus hailing the returning victor, the fanfare a hard-won knockout win still earns",
        "excerpt": "See, the conqu'ring hero comes! Sound the trumpets! Beat the drums! Sports prepare! The laurel bring! Songs of triumph to him sing!",
        "source": "IMSLP",
        "href": "https://imslp.org/wiki/Judas_Maccabaeus,_HWV_63_(Handel,_George_Frideric)"
      }
    ]
  },
  {
    "slug": "riba-jay-morton-president",
    "headline": "Bell Phillips director Jay Morton elected president of the Royal Institute of British Architects",
    "overview": "Jay Morton, a 40-year-old director at London practice Bell Phillips who specializes in housing and regeneration, has been elected the next president of the Royal Institute of British Architects. She defeated environmentalist Duncan Baker-Brown by 329 votes, along with Buttress director Chithra Marsh and academic Austin Williams. Morton becomes president-elect on 1 September 2026 and begins a two-year term in 2027, succeeding Chris Williamson, on a pledge to \"get architects back in the room where decisions are made.\"",
    "genre": "Culture",
    "sources": [
      {
        "name": "Dezeen",
        "href": "https://www.dezeen.com/2026/07/03/jay-morton-elected-riba-president/"
      },
      {
        "name": "Architects' Journal",
        "href": "https://www.architectsjournal.co.uk/news/jay-morton-wins-riba-presidential-election"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-03",
    "image": {
      "src": "/covers/riba-jay-morton-president.png",
      "alt": "The pale stone Art Deco facade of the RIBA headquarters at 66 Portland Place in London.",
      "credit": "Wikimedia Commons"
    },
    "rank": 37,
    "edition": "Afternoon Edition · 3 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Vitruvius, \"The Ten Books on Architecture\" (c. 25 BC) — the Roman architect's charter of the profession's enduring duty, invoked afresh as a new RIBA president defines her calling",
        "excerpt": "All these must be built with due reference to durability, convenience, and beauty. Durability will be assured when foundations are carried down to the solid ground and materials wisely and liberally selected; convenience, when the arrangement of the apartments is faultless and presents no hindrance to use, and when each class of building is assigned to its suitable and appropriate exposure; and beauty, when the appearance of the work is pleasing and in good taste, and when its members are in due proportion according to correct principles of symmetry.",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/files/20239/20239-h/20239-h.htm"
      },
      {
        "category": "historical",
        "title": "Plutarch, \"Life of Pericles\" (c. 100 AD) — the Athenian building program that set architects at the heart of civic decision and shared the public wealth with the people, mirroring Morton's housing-and-regeneration mission",
        "excerpt": "he boldly suggested to the people projects for great constructions, and designs for works which would call many arts into play and involve long periods of time, in order that the stay-at-homes, no whit less than the sailors and sentinels and soldiers, might have a pretext for getting a beneficial share of the public wealth.",
        "source": "LacusCurtius (University of Chicago)",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Plutarch/Lives/Pericles*.html"
      },
      {
        "category": "literary",
        "title": "The First Book of Kings (King James Version, 1611) — Solomon raising the house of the LORD, the archetype of the master-builder shaping a great work for the whole community",
        "excerpt": "And the house, when it was in building, was built of stone made ready before it was brought thither: so that there was neither hammer nor ax nor any tool of iron heard in the house, while it was in building.",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/1_Kings"
      },
      {
        "category": "literary",
        "title": "Henrik Ibsen, \"The Master Builder\" (1892) — Solness turning from soaring church-towers to \"homes for human beings,\" echoing Morton's focus on housing the people",
        "excerpt": "No. I build no more church-towers now. Nor churches either. HILDA. What do you build then? SOLNESS. Homes for human beings.",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/files/4070/4070-h/4070-h.htm"
      },
      {
        "category": "artistic",
        "title": "Thomas Cole, \"The Architect's Dream\" (1840) — the architect reclining amid the monuments of every age, dreaming the built world into being, as a new president imagines the city to come",
        "excerpt": "Cole paints an architect sprawled atop a colossal column, gazing across a dreamscape of Egyptian, Greek, Gothic, and Roman monuments stacked to the horizon. The whole history of building unfurls as a single vision, at once the profession's inheritance and its unbuilt future. It renders architecture as an act of imagination before it is ever an act of stone.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Thomas_Cole_-_Architect%E2%80%99s_Dream_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/riba-jay-morton-president--art.png",
          "alt": "The Architect's Dream by Thomas Cole (1840): an architect reclines on a giant column beside a great book, surveying a fantasy landscape of Egyptian, classical, and Gothic monuments.",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Modest Mussorgsky, \"Pictures at an Exhibition — The Great Gate of Kiev\" (1874) — music raised from an architect's unbuilt design for a monumental city gate, the drawing become a monument in sound",
        "excerpt": "The suite's triumphant finale was inspired by Viktor Hartmann's design for a grand gate to the city of Kiev, crowned with a cupola shaped like a Slavonic helmet. The gate was never built in stone, yet Mussorgsky's chords erect it in sound, bells pealing over a broad processional theme. It is the architect's vision surviving as monument long after the plans were shelved.",
        "source": "IMSLP",
        "href": "https://imslp.org/wiki/Pictures_at_an_Exhibition_(Mussorgsky,_Modest)"
      }
    ]
  },
  {
    "slug": "albania-tirana-protest-violence",
    "headline": "Albanian police fire tear gas as anti-government 'flamingo revolution' protest turns violent in Tirana",
    "overview": "Police in Tirana fired tear gas and pepper spray at demonstrators who pelted them with rocks, eggs and bottles outside Albania's parliament, in the latest of more than a month of daily protests dubbed the \"flamingo revolution.\" Authorities said 12 officers were injured and 18 protesters detained. The movement opposes a luxury coastal development linked to Jared Kushner, US President Donald Trump's son-in-law, and demands the resignation of Prime Minister Edi Rama.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMiuAFBVV95cUxQQ3dOWDZmd0ladzhFQkZLZmI3TnRCNnpxczRBSXR1M29FN0gzcDNtTHoyYlFUN210QWRnNVowWEZhcDhPVFQ4ajBrVFRsTHBZc2tMaktLdXQ4NThBaU56M0dXQWhJT2xFLTBzLTlGX0tOSkRObGZpVVFzeHBCQUZmODcxdEtrUlJKTmRfZFZvdENfNDVJQ1NucWVjVU1kZEZvY3c4dEozQmg3V08wM245cU9IQWxYNWVW?oc=5"
      },
      {
        "name": "The Hill",
        "href": "https://thehill.com/homenews/ap/ap-international/ap-albanian-police-use-tear-gas-and-pepper-spray-as-tirana-protest-turns-violent/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-03",
    "image": {
      "src": "/covers/albania-tirana-protest-violence.png",
      "alt": "A smoke-filled night square before a government building with an overturned barrier.",
      "credit": "AI-generated"
    },
    "rank": 38,
    "edition": "Afternoon Edition · 3 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Livy, \"History of Rome\" (c. 27 BC) — the plebeians secede en masse against their rulers, just as Tirana's crowds mass daily outside parliament",
        "excerpt": "They, by the advice of one Sicinius, retired, without the orders of the consuls, to the sacred mount, beyond the river Anio, three miles from the city... There without any leader, their camp being fortified with a rampart and trench, remaining quiet, taking nothing but what was necessary for sustenance, they kept themselves for several days, neither being attacked, nor attacking others. Great was the panic in the city, and through mutual fear all was suspense.",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/19725/pg19725.txt"
      },
      {
        "category": "historical",
        "title": "Thomas Carlyle, \"The French Revolution\" (1837) — the roaring people storm a fortress of authority, mirroring the fury massing on Rama's parliament",
        "excerpt": "On, then, all Frenchmen that have hearts in their bodies! Roar with all your throats, of cartilage and metal, ye Sons of Liberty; stir spasmodically whatsoever of utmost faculty is in you, soul, body or spirit; for it is the hour! Smite, thou Louis Tournay, cartwright of the Marais, old-soldier of the Regiment Dauphine; smite at that Outer Drawbridge chain, though the fiery hail whistles round thee!",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/files/1301/1301-h/1301-h.htm"
      },
      {
        "category": "literary",
        "title": "Shakespeare, \"Coriolanus\" (c. 1608) — armed citizens rise against a proud ruling class, echoing the crowd demanding the powerful yield",
        "excerpt": "FIRST CITIZEN. You are all resolved rather to die than to famish? ALL. Resolved, resolved! FIRST CITIZEN. First, you know Caius Martius is chief enemy to the people. ALL. We know't, we know't! FIRST CITIZEN. Let us kill him, and we'll have corn at our own price. Is't a verdict? ALL. No more talking on't; let it be done. Away, away!",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/ebooks/1535"
      },
      {
        "category": "literary",
        "title": "Victor Hugo, \"Les Misérables\" (1862) — the Paris barricade of 1832 taken and re-taken, mirroring the running street battle outside Albania's parliament",
        "excerpt": "Men fire in a square, in a passage, in a blind alley; they take and re-take the barricade; blood flows, the grape-shot riddles the fronts of the houses, the balls kill people in their beds, corpses encumber the streets.",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/135/pg135.txt"
      },
      {
        "category": "artistic",
        "title": "Eugène Delacroix, \"Liberty Leading the People\" (1830) — an insurgent crowd surges over the barricade against the throne, the visual archetype of the 'flamingo revolution'",
        "excerpt": "Delacroix's vast canvas commemorates the July Revolution that toppled Charles X: a bare-breasted Liberty, tricolour in one hand and musket in the other, strides across a barricade of paving stones and fallen bodies. Behind her a ragged crowd of workers, a boy with pistols and a top-hatted bourgeois press forward through gunsmoke. It is the enduring image of a people rising as one to force a ruler from power.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Eug%C3%A8ne_Delacroix_-_Le_28_Juillet._La_Libert%C3%A9_guidant_le_peuple.jpg",
        "image": {
          "src": "/covers/albania-tirana-protest-violence--art.png",
          "alt": "Delacroix's painting of Liberty, a bare-breasted woman holding the French tricolour and a musket, leading an armed crowd over a barricade of bodies through gunsmoke",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Rouget de Lisle, \"La Marseillaise\" (1792) — the revolutionary anthem summoning citizens to arms against tyranny's bloody standard",
        "excerpt": "Allons, enfans de la Patrie ! / Le jour de gloire est arrivé. / Contre nous de la tyrannie / L'étendard sanglant est levé... / Aux armes, citoyens ! formez vos bataillons. / Marchons, qu'un sang impur abreuve nos sillons !",
        "source": "Wikisource",
        "href": "https://fr.wikisource.org/wiki/La_Marseillaise_(1792)"
      }
    ]
  },
  {
    "slug": "ecb-lagarde-early-exit",
    "headline": "ECB's Christine Lagarde says she may leave before her term ends to join France's political debate",
    "overview": "European Central Bank President Christine Lagarde said she could not rule out leaving the ECB before her term expires in October 2027, telling Les Échos it was \"possible\" she would step down early to weigh in on France's presidential debate. Lagarde, who had previously likened resigning to a captain abandoning ship in a storm, said a European voice needed to be heard, while ruling out running in next spring's election herself. Her comments revived speculation about an early departure from Frankfurt.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMinAFBVV95cUxPcjdpM2hGZElscmk5djBuNE80MlBmN0h5R1MtZWN1YXpwbThZY1FvSXR5S0J4UWxHel9zVDA1Q29DWWZVUm4tTU52bFVaSlZOYmNzVWNEYWoxamtYZ1RGY3hEdF9OQnJQZ0pXTWlLUWhkYzlCM0p5TXVaTDNRa3FJbElmaDhXaXhkWnpQc2wwZG5lSkg5dWVDOEstY3k?oc=5"
      },
      {
        "name": "CNBC",
        "href": "https://www.cnbc.com/2026/07/03/christine-lagarde-ecb-france-election.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-03",
    "image": {
      "src": "/covers/ecb-lagarde-early-exit.png",
      "alt": "A glass central-bank tower at dusk beside a river with a small sailboat below.",
      "credit": "AI-generated"
    },
    "rank": 39,
    "edition": "Afternoon Edition · 3 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Plutarch, \"Life of Solon\" (c. 100 AD) — the lawgiver who reformed Athens' coinage and debts, then sailed away for ten years rather than stay to be pressed into unmaking his work",
        "excerpt": "He saw that to do this was out of the question, and that not to do it would bring odium upon him, and wishing to be wholly rid of these perplexities and to escape from the captiousness and censoriousness of the citizens (for 'in great affairs,' as he says himself, 'it is difficult to please all'), he made his ownership of a vessel an excuse for foreign travel, and set sail, after obtaining from the Athenians leave of absence for ten years. In this time he hoped they would be accustomed to his laws.",
        "source": "Perseus",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:2008.01.0063:chapter=25"
      },
      {
        "category": "historical",
        "title": "Livy, \"History of Rome,\" Book 3 (c. 27 BC) — Cincinnatus summoned from the plough to the helm of the state, the servant who takes up power only at the hour of peril and lays it down again",
        "excerpt": "There, whether leaning on a stake in a ditch which he was digging, or in the employment of ploughing, engaged at least on some rural work, as is certain, after mutual salutations had passed, being requested by the ambassadors to put on his gown, and listen to the commands of the senate... he bids his wife Racilia immediately to bring his toga from his hut. As soon as he put this on and came forward, after first wiping off the dust and sweat, the ambassadors, congratulating him, unite in saluting him as dictator.",
        "source": "Perseus",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0145:book=3:chapter=26"
      },
      {
        "category": "literary",
        "title": "Horace, \"Odes\" I.14 (23 BC) — \"O ship, new waves will bear you back to sea\": the ship of state begged not to venture again into the storm it can barely weather",
        "excerpt": "O luckless bark! new waves will force you back / To sea. O, haste to make the haven yours! / E'en now, a helpless wrack, / You drift, despoil'd of oars... Your trouble late made sick this heart of mine, / And still I love you, still am ill at ease. / O, shun the sea, where shine / The thick-sown Cyclades!",
        "source": "Perseus",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0025:book=1:poem=14"
      },
      {
        "category": "literary",
        "title": "Aristophanes, \"The Frogs\" (405 BC) — the city that scorns its sterling old coin for base new bronze, just as it casts aside its worthiest guardians for lesser men",
        "excerpt": "Many times it seems to us the city has done the same thing with the best and the brightest of its citizens as with the old coinage and the new gold currency. For these, not counterfeit at all, but the finest it seems of all coins, and the only ones of the proper stamp, of resounding metal amongst Greeks and foreigners everywhere, we never use, but the inferior bronze ones instead, minted just yesterday or the day before with the basest stamp.",
        "source": "Perseus",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0032:card=718"
      },
      {
        "category": "artistic",
        "title": "Quentin Matsys, \"The Money Changer and His Wife\" (1514) — the exacting weighing of gold and coin, the guardianship of value rendered as a scale held level between duty and distraction",
        "excerpt": "In Matsys's Flemish panel a money changer bends over his table, delicately balancing gold coins on a small brass scale, his eyes fixed on the fragile equilibrium of the pans. Beside him his wife lets her prayer book fall open, her fingers straying from the illuminated Virgin toward the glittering coins, her gaze pulled to the gold. The painting turns the keeping of money into a moral drama of attention and temptation, weighing the coin of the realm against the pull of other callings.",
        "source": "The Louvre",
        "href": "https://commons.wikimedia.org/wiki/File:Massysm_Quentin_%E2%80%94_The_Moneylender_and_his_Wife_%E2%80%94_1514.jpg",
        "image": {
          "src": "/covers/ecb-lagarde-early-exit--art.png",
          "alt": "Quentin Matsys, The Money Changer and His Wife (1514): a man weighs gold coins on a small scale while his wife, prayer book in hand, turns her gaze to the money.",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Richard Wagner, \"Der fliegende Holländer\" (1843) — the sea-captain bound to the storm-tossed helm, longing for release from a voyage he cannot simply abandon",
        "excerpt": "Wagner's overture opens on howling strings and brass that conjure a ship pitching in a North Sea gale, the doomed Dutchman condemned to roam the oceans and permitted ashore only once every seven years. The music sets the captain's yearning for deliverance against the relentless surge of the sea that will not let him rest at any harbor. It is a portrait of command as burden: the helmsman who dreams of stepping off the deck yet remains lashed by duty to the storm.",
        "source": "IMSLP",
        "href": "https://imslp.org/wiki/Der_fliegende_Holl%C3%A4nder,_WWV_63_(Wagner,_Richard)"
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
