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
// the Morning Edition of 1 July 2026 (ranks 1-13) leads with its hero story,
// followed by the Evening Edition and the Afternoon Edition of 30 June 2026.
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
    "slug": "ukraine-drones-russian-refinery-fuel",
    "headline": "Ukrainian drone strikes on oil refineries push Russia into a summer fuel crisis",
    "overview": "A sustained campaign of Ukrainian drone strikes on Russian oil refineries has triggered a summer fuel crisis, with shortages and sharply higher pump prices reported across Russia. The attacks have knocked out significant refining capacity, and Moscow has moved to curb fuel exports as the disruption spreads.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMimgFBVV95cUxPVWhCd0owd29LOGZjcXNhWmpEaVRIb1lyUE5jamlUVlhLNE5aMWVPLUVvTTdDSlRUNkNIa2RjS2NUY3gyZG5VWHl1bV9IUERWVkR4NlpHYk9xZ3pzY2VOZUdpdWtZNzhYTVEtWjJ1c0xvTlJjZVZ3STlBcmFtUl96RnRoZHA2dFRxVXZSUzZCQmZCbldBT0hEZ1Zn?oc=5"
      },
      {
        "name": "Arab News",
        "href": "https://www.arabnews.com/node/2649211/world"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-01",
    "image": {
      "src": "/covers/ukraine-drones-russian-refinery-fuel.png",
      "alt": "A Russian oil refinery burning at night after a drone strike, flare stacks and storage tanks aflame against a dark sky.",
      "credit": "AI-generated"
    },
    "edition": "Afternoon Edition · 1 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Thucydides on the ravaging of Attica",
        "excerpt": "In the first days of summer the Lacedaemonians and their allies, with two-thirds of their forces as before, invaded Attica, under the command of Archidamus, son of Zeuxidamus, King of Lacedaemon, and sat down and laid waste the country.",
        "source": "Thucydides, History of the Peloponnesian War, Book 2 (second invasion of Attica), trans. Richard Crawley; Wikisource.",
        "href": "https://en.wikisource.org/wiki/History_of_the_Peloponnesian_War/Book_2"
      },
      {
        "category": "historical",
        "title": "Samson burns the Philistines' standing corn",
        "excerpt": "And when he had set the brands on fire, he let them go into the standing corn of the Philistines, and burnt up both the shocks, and also the standing corn, with the vineyards and olives.",
        "source": "The Bible (King James Version), Judges 15:5; Wikisource.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Judges"
      },
      {
        "category": "literary",
        "title": "Tolstoy on the burning of Moscow",
        "excerpt": "Moscow was burned by its inhabitants, it is true, but by those who had abandoned it and not by those who remained in it.\nDeserted Moscow had to burn as inevitably as a heap of shavings has to burn on which sparks continually fall for several days.",
        "source": "Leo Tolstoy, War and Peace, Book 11, Chapter 26, trans. Louise and Aylmer Maude; Wikisource.",
        "href": "https://en.wikisource.org/wiki/War_and_Peace_(Tolstoy)/Book_11/Chapter_26"
      },
      {
        "category": "literary",
        "title": "Virgil on Troy in flames",
        "excerpt": "Transfers the Trojan State to Grecian Hands.\nThe Fire consumes the Town, the Foe commands:",
        "source": "Virgil, Aeneid, Book II, trans. John Dryden (The Works of Virgil, 1697); Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_Works_of_Virgil_(Dryden)/Aeneid/Book_II"
      },
      {
        "category": "artistic",
        "title": "Tchaikovsky, 1812 Overture, Op. 49 — MUSIC",
        "excerpt": "Tchaikovsky's festival overture dramatizes Napoleon's doomed 1812 invasion of Russia as a musical war of attrition, opposing a plaintive Russian hymn against the advancing strains of the Marseillaise. Cannon fire, tolling bells and surging orchestral flames depict an army swallowed by the vast, unforgiving interior it sought to conquer. Its arc from invasion to collapse mirrors a modern campaign that turns an aggressor's own energy and logistics into the source of its undoing.",
        "source": "Pyotr Ilyich Tchaikovsky, 1812 Overture (Festival Overture), Op. 49 (1880); IMSLP / Petrucci Music Library.",
        "href": "https://imslp.org/wiki/1812_Overture,_Op.49_(Tchaikovsky,_Pyotr)"
      },
      {
        "category": "artistic",
        "title": "Turner, The Burning of the Houses of Lords and Commons — VISUAL ARTWORK",
        "excerpt": "Turner renders a great national institution devoured by fire, its stone silhouette dissolving into a furnace of orange and gold reflected across the Thames. Crowds mass helplessly on the far bank as flame and smoke rise into the night, an inferno beyond any hope of control. The vision of vital infrastructure consumed in a single blaze speaks directly to refineries set alight and a nation's fuel going up in smoke.",
        "source": "J. M. W. Turner, The Burning of the Houses of Lords and Commons, 16 October 1834 (c. 1834-35), oil on canvas, Philadelphia Museum of Art; Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Joseph_Mallord_William_Turner,_English_-_The_Burning_of_the_Houses_of_Lords_and_Commons,_October_16,_1834_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/ukraine-drones-russian-refinery-fuel--art.png",
          "alt": "J. M. W. Turner's oil painting of the Houses of Parliament engulfed in fire at night, flames and smoke reflected across the Thames.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "lead": true,
    "rank": 1
  },
  {
    "slug": "sudan-rsf-el-fasher-crimes",
    "headline": "Sudan's RSF committed crimes against humanity in the siege of el-Fasher, Amnesty says",
    "overview": "The paramilitary Rapid Support Forces committed crimes against humanity during their assault on the city of el-Fasher in Sudan's Darfur region, Amnesty International said in a new report documenting mass killings, sexual violence and other abuses as the RSF seized the city. The rights group called for accountability and an arms embargo.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cz9lqvx0z1vo"
      },
      {
        "name": "Amnesty International",
        "href": "https://www.amnesty.org/en/latest/news/2026/07/sudan-rsf-atrocities-in-el-fasher-a-stain-on-the-conscience-of-humanity-new-report/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-01",
    "image": {
      "src": "/covers/sudan-rsf-el-fasher-crimes.png",
      "alt": "A besieged Darfur city at dusk, deserted streets and shuttered houses beneath a smoke-darkened sky.",
      "credit": "AI-generated"
    },
    "edition": "Afternoon Edition · 1 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Josephus on the fall of Jerusalem, AD 70",
        "excerpt": "But when they went in numbers into the lanes of the city with their swords drawn, they slew those whom they overtook without and set fire to the houses whither the Jews were fled, and burnt every soul in them, and laid waste a great many of the rest; and when they were come to the houses to plunder them, they found in them entire families of dead men, and the upper rooms full of dead corpses, that is, of such as died by the famine; they then stood in a horror at this sight, and went out without touching any thing.",
        "source": "Flavius Josephus, The Wars of the Jews, Book VI, Whiston chapter 8, section 5, trans. William Whiston. Perseus Digital Library, Tufts University.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0148:book=6:whiston%20chapter=8:whiston%20section=5"
      },
      {
        "category": "historical",
        "title": "Thucydides on the massacre at Mycalessus",
        "excerpt": "The Thracians, entering into Mycalessus, spoiled both houses and temples, slew the people without mercy on old or young, but killed all they could light on, both women and children, yea, and the labouring cattle, and whatsoever other living thing they saw. For the nation of the Thracians, where they dare, are extreme bloody, equal to any of the barbarians. Insomuch as there was put in practice at this time, besides other disorder, all forms of slaughter that could be imagined; they likewise fell upon the schoolhouse, which was in the city a great one, and the children newly entered into it; and killed them every one. And the calamity of the whole city, as it was as great as ever befell any, so also was it more unexpected and more bitter.",
        "source": "Thucydides, History of the Peloponnesian War, Book VII, chapter 29, trans. Thomas Hobbes (London: Bohn, 1843). Perseus Digital Library, Tufts University.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0247:book=7:chapter=29"
      },
      {
        "category": "literary",
        "title": "Virgil, Aeneid Book II: the sack of Troy",
        "excerpt": "The bars are broken, and the guards are slain.\nIn rush the Greeks, and all the apartments fill;\nThose few defendants whom they find, they kill.",
        "source": "Virgil, Aeneid, Book II (lines 496–498), trans. John Dryden. Perseus Digital Library, Tufts University.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0052:book=2:card=486"
      },
      {
        "category": "literary",
        "title": "The Lamentations of Jeremiah over fallen Jerusalem",
        "excerpt": "How doth the city sit solitary, that was full of people! how is she become as a widow! she that was great among the nations, and princess among the provinces, how is she become tributary!\nShe weepeth sore in the night, and her tears are on her cheeks: among all her lovers she hath none to comfort her: all her friends have dealt treacherously with her, they are become her enemies.",
        "source": "The Book of Lamentations 1:1–2, King James Version. Wikisource.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Lamentations"
      },
      {
        "category": "artistic",
        "title": "Thomas Tallis, Lamentations of Jeremiah — MUSIC",
        "excerpt": "Tallis sets the Latin lament of the prophet over a desolated Jerusalem in two grave, interweaving polyphonic settings for five unaccompanied voices. The Hebrew letters that open each verse are drawn out into slow, aching melismas, and the falling lines seem to mourn a city emptied of its people. It is one of the supreme Renaissance meditations on the sack and abandonment of a great city.",
        "source": "Thomas Tallis, Lamentations of Jeremiah (two settings, for five voices, c. 1560s). Public domain. IMSLP / Petrucci Music Library.",
        "href": "https://imslp.org/wiki/Lamentations_of_Jeremiah_(Tallis,_Thomas)"
      },
      {
        "category": "artistic",
        "title": "Nicolas Poussin, The Destruction and Sack of the Temple of Jerusalem — VISUAL ARTWORK",
        "excerpt": "Poussin crowds the canvas with the frenzy of a stormed city: Roman soldiers surge through the collapsing colonnades of the Temple, plundering its golden vessels as terrified inhabitants are struck down amid the smoke. Titus reins his horse at the center while bodies tumble across the marble steps, the sacred architecture itself splitting apart. Painted around 1625–1626, it renders the archetypal fall of a besieged holy city as pure, terrible tumult.",
        "source": "Nicolas Poussin, The Destruction and Sack of the Temple of Jerusalem, oil on canvas, 1625–1626, Israel Museum, Jerusalem. Public domain. Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Nicolas_Poussin_-_The_Destruction_and_Sack_of_the_Temple_of_Jerusalem_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/sudan-rsf-el-fasher-crimes--art.png",
          "alt": "Nicolas Poussin's painting The Destruction and Sack of the Temple of Jerusalem, showing Roman soldiers storming and plundering the burning Temple amid falling figures.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 2
  },
  {
    "slug": "colorado-kiros-defeats-degette",
    "headline": "Democratic socialist Melat Kiros defeats longtime Representative Diana DeGette in Colorado primary",
    "overview": "Democratic socialist Melat Kiros defeated longtime Representative Diana DeGette in a Colorado Democratic primary, unseating one of the US House's most senior members. The upset adds to a wave of insurgent progressive challenges within the party.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMitAFBVV95cUxOeTRzNlZzZl9PeWZDaDdDaUE0UXBYMUtPMjltVWYyakRETUtlM08wWmMtN05sY2pyUGQtdXdfLXYycGJxYlZ3X0MyTGU2S2xJR0NpenBZMEVWMW15eHUtbmVSYjdXZEp5V3VnbjZLUFdvcDNwdzNWQkVIWmE1ek5ycFlhSEpPY0k3XzI1bmgxaktCbmhoOGc3SEQzc1ZycFkyc25QM1FiWVVheGNpYzhCWnp4MjQ?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiwgFBVV95cUxPVElnV0tST3A5X3hGOFVyN2Q5bDAycUR6QWctVGZkeGtZUzZ0QS1fTkJkN3B5QmVKd0hnQ2cyWGNjZUlDMkxsRDk0NUcyVG4wOXR4ejJwNHdoZDZMWnVwZDJfbTZqbFhfLTRFUzRLWWtYdm1OOFNTTTZ4N255Z0dveHFHU3dIaXNjR3o0ZzhpRUZmQTBjRGM3RUlrLV9SUHRpZ3RnWERSUnFqUWNqdUtNWmJtR3BfODhRUHRJMmczZWQ3Zw?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-01",
    "image": {
      "src": "/covers/colorado-kiros-defeats-degette.png",
      "alt": "An empty US congressional primary polling place at dusk, a ballot box on a plain table.",
      "credit": "AI-generated"
    },
    "edition": "Afternoon Edition · 1 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "David and Goliath (1 Samuel 17)",
        "excerpt": "45 Then said David to the Philistine, Thou comest to me with a sword, and with a spear, and with a shield: but I come to thee in the name of the LORD of hosts, the God of the armies of Israel, whom thou hast defied.\n49 And David put his hand in his bag, and took thence a stone, and slang it, and smote the Philistine in his forehead, that the stone sunk into his forehead; and he fell upon his face to the earth.\n50 So David prevailed over the Philistine with a sling and with a stone, and smote the Philistine, and slew him; but there was no sword in the hand of David.",
        "source": "The Holy Bible, King James Version, 1 Samuel 17:45, 49-50. Wikisource.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/1_Samuel"
      },
      {
        "category": "historical",
        "title": "The Declaration of Independence on the Right to Alter Government",
        "excerpt": "That whenever any Form of Government becomes destructive of these ends, it is the Right of the People to alter or to abolish it, and to institute new Government, laying its foundation on such principles and organizing its powers in such form, as to them shall seem most likely to effect their Safety and Happiness.",
        "source": "The Declaration of Independence, July 4, 1776. National Archives, transcription of the engrossed document.",
        "href": "https://www.archives.gov/founding-docs/declaration-transcript"
      },
      {
        "category": "literary",
        "title": "The Fall of Caesar in Shakespeare's Julius Caesar",
        "excerpt": "O, what a fall was there, my countrymen!\nThen I, and you, and all of us fell down,\nWhilst bloody treason flourish'd over us.\nO, now you weep; and I perceive you feel\nThe dint of pity.",
        "source": "William Shakespeare, The Tragedy of Julius Caesar, Act III, Scene II (Antony's oration). Project Gutenberg eBook #1522.",
        "href": "https://www.gutenberg.org/cache/epub/1522/pg1522.txt"
      },
      {
        "category": "literary",
        "title": "The Magnificat: He Hath Put Down the Mighty (Luke 1)",
        "excerpt": "51 He hath shewed strength with his arm; he hath scattered the proud in the imagination of their hearts.\n52 He hath put down the mighty from their seats, and exalted them of low degree.\n53 He hath filled the hungry with good things; and the rich he hath sent empty away.",
        "source": "The Holy Bible, King James Version, Luke 1:51-53 (the Magnificat). Wikisource.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Luke"
      },
      {
        "category": "artistic",
        "title": "Tchaikovsky, 1812 Overture, Op. 49 — MUSIC",
        "excerpt": "A young nation's defiance made audible: Tchaikovsky pits the ominous, advancing tread of the invader against surging folk melodies until the smaller force turns the tide. Cannon fire and pealing bells crown a triumph that seemed impossible when the overture began, the entrenched giant scattered by an underdog's resolve. It is the sound of an overwhelming favorite toppled and a changing of the guard rung out in brass and thunder.",
        "source": "Pyotr Ilyich Tchaikovsky, 1812 Overture (Ouverture solennelle), Op. 49 (1880). IMSLP / Petrucci Music Library, public domain.",
        "href": "https://imslp.org/wiki/1812_Overture,_Op.49_(Tchaikovsky,_Pyotr)"
      },
      {
        "category": "artistic",
        "title": "Caravaggio, David with the Head of Goliath — VISUAL ARTWORK",
        "excerpt": "Caravaggio's David stands in a shaft of raking light, sword lowered, holding aloft the severed head of the giant who had terrorized an army. The youth's expression is not triumphal but pensive, as if awed by how completely the mighty have fallen to the small. Darkness swallows the vanquished champion while the unlikely victor emerges into the light, the ultimate image of an entrenched power overthrown.",
        "source": "Michelangelo Merisi da Caravaggio, David with the Head of Goliath, oil on canvas, c. 1610, Galleria Borghese, Rome. Wikimedia Commons, public domain.",
        "href": "https://commons.wikimedia.org/wiki/File:David_with_the_Head_of_Goliath-Caravaggio_(1610).jpg",
        "image": {
          "src": "/covers/colorado-kiros-defeats-degette--art.png",
          "alt": "Caravaggio's painting of David holding aloft the severed head of Goliath, emerging from deep shadow into light.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 3
  },
  {
    "slug": "student-loan-forgiveness-struck-down",
    "headline": "Federal judges strike down the Trump administration's overhaul of the student loan forgiveness program",
    "overview": "Federal judges in Massachusetts and Washington blocked the Trump administration's overhaul of the Public Service Loan Forgiveness program a day before the new rules were to take effect. The changes would have let officials strip loan forgiveness from public workers whose employers were deemed to have a 'substantial illegal purpose.' The courts found the Education Department had exceeded its authority and raised First Amendment concerns.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMipAFBVV95cUxQUmQ5dnhlZEZGSExfY1Z4R2NMNU95OHlRVlBBM2szV1pkdjF0QlQ4M3oyaWk3UWVmaVdJSWNIQ2xXaldxN2szcVdMZHBKYjJNUXdwTUV5YnFJdXJiX0ViaEhfbjdsMU54UFFjWU9ONmZrMndnSUgxSkFhUU4yc1NBMGhONld3WXRwcDJyU190VmVNQ3puNy1uU05HUjF6YTB4LU95dQ?oc=5"
      },
      {
        "name": "Benzinga",
        "href": "https://www.benzinga.com/news/education/26/07/60208203/trump-suffers-fresh-court-setback-as-federal-judges-block-student-loan-forgiveness-overhaul-ahead-of-rollout"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-01",
    "image": {
      "src": "/covers/student-loan-forgiveness-struck-down.png",
      "alt": "A judge's carved wooden bench in a grand courtroom beneath brass scales of justice, cold light from tall windows.",
      "credit": "AI-generated"
    },
    "edition": "Afternoon Edition · 1 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Jubilee year proclaimed in Leviticus",
        "excerpt": "And ye shall hallow the fiftieth year, and proclaim liberty throughout all the land unto all the inhabitants thereof: it shall be a jubile unto you; and ye shall return every man unto his possession, and ye shall return every man unto his family.\nA jubile shall that fiftieth year be unto you: ye shall not sow, neither reap that which groweth of itself in it, nor gather the grapes in it of thy vine undressed.\nFor it is the jubile; it shall be holy unto you: ye shall eat the increase thereof out of the field.\nIn the year of this jubile ye shall return every man unto his possession.",
        "source": "Leviticus 25:10-13, The Holy Bible (King James Version, 1611; 1769 Oxford standard text). Wikisource.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Leviticus/Chapter_25"
      },
      {
        "category": "historical",
        "title": "Solon's seisachtheia, the 'disburdenment' of debts in Athens",
        "excerpt": "But Solon was the first, it would seem, to use this device, when he called his cancelling of debts a 'disburdenment.' For the first of his public measures was an enactment that existing debts should be remitted, and that in future no one should lend money on the person of a borrower.",
        "source": "Plutarch, Life of Solon, chapter 15, translated by Bernadotte Perrin (Loeb Classical Library). Perseus Digital Library, Tufts University.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:2008.01.0063:chapter%3D15"
      },
      {
        "category": "literary",
        "title": "The Parable of the Unforgiving Servant, forgiven his debt yet showing no mercy",
        "excerpt": "32 Then his lord called him in, and said to him, 'You wicked servant! I forgave you all that debt because you begged me. 33 Shouldn't you also have had mercy on your fellow servant, even as I had mercy on you?'",
        "source": "Gospel of Matthew 18:32-33, World English Bible (public domain). Wikisource.",
        "href": "https://en.wikisource.org/wiki/Bible_(World_English)/Matthew"
      },
      {
        "category": "literary",
        "title": "Portia's plea for mercy against the letter of the bond in The Merchant of Venice",
        "excerpt": "The quality of mercy is not strain'd,\nIt droppeth as the gentle rain from heaven\nUpon the place beneath. It is twice blest,\nIt blesseth him that gives and him that takes.\n'Tis mightiest in the mightiest; it becomes\nThe throned monarch better than his crown.\nHis sceptre shows the force of temporal power,\nThe attribute to awe and majesty,\nWherein doth sit the dread and fear of kings;\nBut mercy is above this sceptred sway,\nIt is enthroned in the hearts of kings,\nIt is an attribute to God himself;\nAnd earthly power doth then show likest God's\nWhen mercy seasons justice.",
        "source": "William Shakespeare, The Merchant of Venice, Act IV, Scene I (Portia). Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/1515/1515-h/1515-h.htm"
      },
      {
        "category": "artistic",
        "title": "Va, pensiero (Chorus of the Hebrew Slaves) from Verdi's Nabucco — MUSIC",
        "excerpt": "Giuseppe Verdi's great chorus for the enslaved Hebrews rises as a single hushed, homesick line before swelling into a full-voiced yearning for a lost homeland and release from bondage. Sung in unison over a rocking accompaniment, it turns the ancient captivity by the waters of Babylon into an anthem of longing for liberty. In the opera's arc of a proud ruler humbled and captives set free, the music embodies the hope that decrees of oppression are never the final word.",
        "source": "Giuseppe Verdi, Nabucco (opera in four acts, 1841-1842; libretto by Temistocle Solera), Act III, 'Va, pensiero, sull'ali dorate' (Chorus of the Hebrew Slaves). IMSLP / Petrucci Music Library.",
        "href": "https://imslp.org/wiki/Nabucco_(Verdi,_Giuseppe)"
      },
      {
        "category": "artistic",
        "title": "Jan van Hemessen's The Parable of the Unmerciful Servant — VISUAL ARTWORK",
        "excerpt": "Jan Sanders van Hemessen crowds his broad panel with the very moment of reckoning, as the servant who was forgiven a vast debt seizes his own debtor by the throat. Sharp Northern light rakes across muscular, gesturing figures whose ledgers, coins and grasping hands make the accounting of debt almost tactile. The painting turns Christ's parable into a stark drama of mercy received and mercy withheld, where the powerful are called to account for how they treat those beneath them.",
        "source": "Jan Sanders van Hemessen (c. 1500 - c. 1566), The Parable of the Unmerciful Servant, oil on panel, c. 1556, University of Michigan Museum of Art (accession 1959/1.108). Public domain via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Jan_van_Hemessen_-_The_Parable_of_the_Unmerciful_Servant.jpg",
        "image": {
          "src": "/covers/student-loan-forgiveness-struck-down--art.png",
          "alt": "16th-century oil painting by Jan van Hemessen depicting the parable of the unmerciful servant seizing his fellow servant by the throat over a small debt.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 4
  },
  {
    "slug": "xi-chinese-wisdom-developing-nations",
    "headline": "Xi Jinping touts Chinese wisdom and solutions as a model for developing nations",
    "overview": "Chinese leader Xi Jinping promoted what he called Chinese wisdom and solutions as a development model for other nations, casting Beijing's governance as an alternative for the developing world. The remarks came as China seeks to expand its influence across the Global South.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMisAFBVV95cUxPZWpuWTRXY1hpVjQwMXdieEVNcGVXbWdMZ3dpcW1FMnAwVmFMNk9QOW5pVTM3N1JubUJTLTJSRENwN3d6UmhFLWZHMW1XVEU0dVE1MDF0T2NCSEplNXZrcEU4UlVrMUhPODNZVGtRZ21mbTQ0aEo1VnMzUkZwNjh3LWRFQUo3UEVzbU05QmF6RXphQk9vZVlQaF84M1hxalMzdTdjcGV1OEJFNEpsZjEydw?oc=5"
      },
      {
        "name": "South China Morning Post",
        "href": "https://www.scmp.com/news/china/politics/article/3359003/xi-projects-confidence-chinas-communist-party-home-and-world-stage"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-01",
    "image": {
      "src": "/covers/xi-chinese-wisdom-developing-nations.png",
      "alt": "An official portrait of Chinese leader Xi Jinping in a dark suit and blue tie.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 1 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Mencius, King Hui of Liang, Part I, Chapter 1",
        "excerpt": "Mencius went to see king Hui of Liang. The king said, 'Venerable sir, since you have not counted it far to come here, a distance of a thousand li, may I presume that you are provided with counsels to profit my kingdom?'\n\nMencius replied, 'Why must your Majesty use that word \"profit?\" What I am provided with, are counsels to benevolence and righteousness, and these are my only topics.",
        "source": "Mencius (Mengzi), Book I ('Liang Hui Wang'), Part I, Ch. 1, trans. James Legge, The Chinese Classics, Vol. II (1895); Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_Chinese_Classics/Volume_2/The_Works_of_Mencius/chapter01"
      },
      {
        "category": "historical",
        "title": "Confucius, Analects, Book II ('Wei Chang'), Chapter 1",
        "excerpt": "The Master said, 'He who exercises government by means of his virtue may be compared to the north polar star, which keeps its place and all the stars turn towards it.'",
        "source": "Confucius, Confucian Analects, Book II, Ch. 1, trans. James Legge, The Chinese Classics, Vol. I: Confucian Analects (1893); Project Gutenberg eBook #4094.",
        "href": "https://www.gutenberg.org/cache/epub/4094/pg4094.txt"
      },
      {
        "category": "literary",
        "title": "Laozi, Tao Te Ching, Chapter 61",
        "excerpt": "What makes a great state is its being (like) a low-lying, down-flowing (stream);--it becomes the centre to which tend (all the small states) under heaven.\n\nThus it is that a great state, by condescending to small states, gains them for itself; and that small states, by abasing themselves to a great state, win it over to them. In the one case the abasement leads to gaining adherents, in the other case to procuring favour.\n\nThe great state only wishes to unite men together and nourish them; a small state only wishes to be received by, and to serve, the other. Each gets what it desires, but the great state must learn to abase itself.",
        "source": "Laozi, The Tao Teh King (Tao Te Ching), Ch. 61, trans. James Legge, Sacred Books of the East, Vol. 39 (1891); Project Gutenberg eBook #216.",
        "href": "https://www.gutenberg.org/cache/epub/216/pg216.txt"
      },
      {
        "category": "literary",
        "title": "Virgil, Aeneid, Book VI (Anchises' prophecy of Rome's mission)",
        "excerpt": "But, Rome, ’tis thine alone, with awful sway,\nTo rule mankind, and make the world obey,\nDisposing peace and war by thy own majestic way;\nTo tame the proud, the fetter’d slave to free:\nThese are imperial arts, and worthy thee.”",
        "source": "Virgil, The Aeneid, Book VI, trans. John Dryden (1697); Project Gutenberg eBook #228.",
        "href": "https://www.gutenberg.org/cache/epub/228/pg228.txt"
      },
      {
        "category": "artistic",
        "title": "Edward Elgar, Pomp and Circumstance Marches, Op. 39 — MUSIC",
        "excerpt": "Elgar's imperial marches stride forward with brass-crowned pomp, their broad central melody swelling into the anthem later sung as 'Land of Hope and Glory.' The music is the very sound of a confident empire proclaiming its greatness to the world, ceremony elevated into soft power. Grand, processional and unabashedly self-celebrating, it casts national grandeur as a model for others to admire and follow.",
        "source": "Edward Elgar, Pomp and Circumstance Marches, Op. 39 (1901-1930); public-domain scores at IMSLP (Petrucci Music Library).",
        "href": "https://imslp.org/wiki/Pomp_and_Circumstance_Marches,_Op.39_(Elgar,_Edward)"
      },
      {
        "category": "artistic",
        "title": "Thomas Cole, The Consummation of Empire (The Course of Empire) — VISUAL ARTWORK",
        "excerpt": "Thomas Cole's 1836 canvas depicts a civilization at the dazzling zenith of its power: marble colonnades, gilded temples and triumphal processions crowd a sunlit harbor while throngs celebrate imperial splendor. Every column and crowd proclaims a society certain that its way is the summit of human achievement. Painted as one scene in a cautionary cycle, it shows the seductive grandeur of an empire presenting itself as the model for all.",
        "source": "Thomas Cole, The Consummation of Empire, from the series The Course of Empire, 1836, oil on canvas, New-York Historical Society; Wikimedia Commons (public domain).",
        "href": "https://commons.wikimedia.org/wiki/File:Cole_Thomas_The_Consummation_The_Course_of_the_Empire_1836.jpg",
        "image": {
          "src": "/covers/xi-chinese-wisdom-developing-nations--art.png",
          "alt": "Thomas Cole's 1836 painting The Consummation of Empire, showing a grand classical city at the height of its imperial power",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 5
  },
  {
    "slug": "eu-parcel-fee-shein-temu",
    "headline": "EU imposes a 3-euro fee on cheap e-commerce parcels in a blow to Shein, Temu and AliExpress",
    "overview": "The European Union agreed to impose a 3-euro handling fee on low-value e-commerce parcels shipped directly to consumers, targeting the surge of cheap goods from retailers such as Shein, Temu and AliExpress. Officials said the charge would help fund customs and product-safety checks on the billions of small parcels entering the bloc each year.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMixAFBVV95cUxPQnBaVHNyUzh0S3pVeFR6OXRkT3U2Ym9jX3IzUk1HMnZGSW1rSXY3aTF6V3FWb1pyWW9aeERLc01xVlU2REVNSUQ1UG1VREk0dmJwQ1VfNjV6aEVLeXdBSzcxcnJtWXZOc2pSeXd0ZWVreExCeGVCdjBuTDV0Qldzdzkyby1OUUhYRkljV0kxM2sxcFZDZWVRektpMWtZcDB6dVNhaEpMUzJPMlN6Q2lEUUpBdDJfTG9CWUhrZ09ORDNRRnhO?oc=5"
      },
      {
        "name": "Euronews",
        "href": "https://www.euronews.com/my-europe/2026/07/01/eu-slaps-3-duty-fee-on-shein-temu-and-aliexpress-imports"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-01",
    "image": {
      "src": "/covers/eu-parcel-fee-shein-temu.png",
      "alt": "Stacks of small cardboard e-commerce parcels on a conveyor at a customs sorting depot.",
      "credit": "AI-generated"
    },
    "edition": "Afternoon Edition · 1 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Adam Smith on restraints upon the importation of foreign goods",
        "excerpt": "BY RESTRAINING, either by high duties, or by absolute prohibitions, the importation of such goods from foreign countries as can be produced at home, the monopoly of the home market is more or less secured to the domestic industry employed in producing them.",
        "source": "Adam Smith, An Inquiry into the Nature and Causes of the Wealth of Nations (1776), Book IV, Chapter II, “Of Restraints upon the Importation from Foreign Countries of such Goods as can be produced at Home.” Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_Wealth_of_Nations/Book_IV/Chapter_2"
      },
      {
        "category": "historical",
        "title": "Richard Cobden against a tax on the people's bread",
        "excerpt": "I will not further detain the House. The question resolves itself into a very narrow compass. If you find that there are exclusive burdens on the land, do not put a tax upon the bread of the people, but remove the burdens.",
        "source": "Richard Cobden, speech in the House of Commons, 24 February 1842, on a motion to abolish the duties payable on the importation of corn (the Corn Laws). Wikisource, “The working classes and the corn laws.”",
        "href": "https://en.wikisource.org/wiki/The_working_classes_and_the_corn_laws"
      },
      {
        "category": "literary",
        "title": "The money changers driven from the temple",
        "excerpt": "And Jesus went into the temple of God, and cast out all them that sold and bought in the temple, and overthrew the tables of the moneychangers, and the seats of them that sold doves,\nAnd said unto them, It is written, My house shall be called the house of prayer; but ye have made it a den of thieves.",
        "source": "The Gospel According to St. Matthew 21:12–13, King James Version (1611). Wikisource, Bible (King James)/Matthew.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Matthew"
      },
      {
        "category": "literary",
        "title": "Vanity Fair, where the wares of every nation are vended",
        "excerpt": "And as in other fairs of less moment, there are the several rows and streets, under their proper names, where such and such wares are vended; so here likewise you have the proper places, rows, streets, (viz. countries and kingdoms), where the wares of this fair are soonest to be found. Here is the Britain Row, the French Row, the Italian Row, the Spanish Row, the German Row, where several sorts of vanities are to be sold.",
        "source": "John Bunyan, The Pilgrim's Progress from this World to that which is to Come (1678), the description of Vanity Fair. Project Gutenberg eBook #131.",
        "href": "https://www.gutenberg.org/cache/epub/131/pg131.txt"
      },
      {
        "category": "artistic",
        "title": "Smetana, The Bartered Bride — MUSIC",
        "excerpt": "Smetana's comic opera whirls the listener straight into the bustle of a village marketplace, its famous overture scampering with the chatter of gossip, haggling and the clink of coins. At its heart lies a bargain struck over a bride, a contract of goods and money mistaken for love, until the arithmetic of the marriage-broker unravels. The dances, from the stamping polka to the breathless furiant, are the sound of a fair in full swing, where everything, it seems, has its price.",
        "source": "Bedřich Smetana, Prodaná nevěsta (The Bartered Bride), JB 1:100, comic opera in three acts (1866, revised 1870); libretto by Karel Sabina. IMSLP work page.",
        "href": "https://imslp.org/wiki/Prodan%C3%A1_nev%C4%9Bsta,_JB_1:100_(Smetana,_Bed%C5%99ich)"
      },
      {
        "category": "artistic",
        "title": "Quinten Massys, The Moneylender and his Wife — VISUAL ARTWORK",
        "excerpt": "In Massys' meticulous panel a moneylender bends over his counter, weighing gold coins on a delicate balance while his wife, a devotional book open in her hands, lets her attention drift toward the glinting metal. Every object on the table — the scales, the pearls, the stacked coins, the convex mirror — speaks of value counted, taxed and measured at the point of exchange. It is an unblinking portrait of commerce at the gate, where piety and the reckoning of money sit side by side.",
        "source": "Quinten Massys (Quentin Matsys), The Moneylender and his Wife, 1514, oil on panel, Musée du Louvre, Paris (INV 1444). Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Quinten_Massijs_(I)_-_The_Moneylender_and_his_Wife_-_WGA14281.jpg",
        "image": {
          "src": "/covers/eu-parcel-fee-shein-temu--art.png",
          "alt": "A 1514 painting by Quinten Massys of a moneylender weighing gold coins on a balance while his wife looks on beside her prayer book.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 6
  },
  {
    "slug": "australia-big-four-accounting-breakup",
    "headline": "Australia weighs breaking up the Big Four accounting firms after a series of scandals",
    "overview": "Australia's government said it was considering breaking up the Big Four accounting firms - Deloitte, EY, KPMG and PwC - and tightening their oversight after a run of scandals over conflicts of interest and audit failures. Treasury proposals include structurally separating the firms' audit and consulting arms and capping partnership sizes. The move follows the PwC tax-leaks affair and fresh allegations against KPMG.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMivgFBVV95cUxOMHQ2ai1Ma0hPUXcwMFBpRXR5TFpzc2hlMkJtNVV5Wk5keERpX2QybW1USkhUMzZfc0c3SlBYUVNqNGVNTlJDdmQ2bWpSZXhjbjF2N1RwbWN6VGdScTBlN0FzM2E4TFBTbGRVT0xjMDZpTGI3YmJHSUV1Xzg2dVkyWjgzNE4wbEFvTUJtTHpwT2o5cWV2ZW1TOVR3UUJqRGZVdWNib1BfYVhLWm1VbVdPclVyZWRnUm16aXZxXzhR?oc=5"
      },
      {
        "name": "Nikkei Asia",
        "href": "https://asia.nikkei.com/business/companies/australia-eyes-big-four-accounting-reforms-after-scandals"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-01",
    "image": {
      "src": "/covers/australia-big-four-accounting-breakup.png",
      "alt": "A hushed corporate boardroom at dusk, a long polished table and empty chairs beneath a set of brass scales.",
      "credit": "AI-generated"
    },
    "edition": "Afternoon Edition · 1 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Sherman Antitrust Act of 1890",
        "excerpt": "Every contract, combination in the form of trust or otherwise, or conspiracy, in restraint of trade or commerce among the several States, or with foreign nations, is hereby declared to be illegal.",
        "source": "Sherman Antitrust Act (An act to protect trade and commerce against unlawful restraints and monopolies), United States, approved July 2, 1890, Section 1. Wikisource.",
        "href": "https://en.wikisource.org/wiki/Sherman_Act"
      },
      {
        "category": "historical",
        "title": "Standard Oil Co. of New Jersey v. United States (1911)",
        "excerpt": "The remedy to be administered in case of a combination violating the Anti-Trust Act is two-fold: first, to forbid the continuance of the prohibited act, and second, to so dissolve the combination as to neutralize the force of the unlawful power.",
        "source": "Standard Oil Co. of New Jersey v. United States, 221 U.S. 1 (decided May 15, 1911), syllabus. Wikisource.",
        "href": "https://en.wikisource.org/wiki/Standard_Oil_Co._of_New_Jersey_v._United_States"
      },
      {
        "category": "literary",
        "title": "Juvenal, Satire VI — \"who will watch the warders?\"",
        "excerpt": "I hear all this time the advice of my old friends—keep your women at home, and put them under lock and key. Yes, but who will watch the warders? Wives are crafty and will begin with them.",
        "source": "Juvenal, Satire VI (\"quis custodiet ipsos custodes\"), translated by G. G. Ramsay, in Juvenal and Persius (Loeb Classical Library, 1918). Wikisource.",
        "href": "https://en.wikisource.org/wiki/Juvenal_and_Persius/The_Satires_of_Juvenal/Satire_6"
      },
      {
        "category": "literary",
        "title": "The Gospel of Matthew — \"No man can serve two masters\"",
        "excerpt": "No man can serve two masters: for either he will hate the one, and love the other; or else he will hold to the one, and despise the other. Ye cannot serve God and mammon.",
        "source": "The Gospel According to St. Matthew 6:24, Authorized (King James) Version, 1611. Wikisource.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Matthew"
      },
      {
        "category": "artistic",
        "title": "Verdi, Messa da Requiem, \"Dies irae\" — MUSIC",
        "excerpt": "Verdi unleashes the day of reckoning in a torrent of hammered chords, thundering bass drum, and a chorus screaming in terror as the trumpets of judgment answer one another across the hall. It is music of accounts finally called due, of every hidden deed dragged into the open light. Beneath the terror runs a trembling awe: no power, however great, escapes the weighing of the scales.",
        "source": "Giuseppe Verdi, Messa da Requiem (1874, rev. 1875), No. 2 Sequence (\"Dies irae\"). Full score, IMSLP.",
        "href": "https://imslp.org/wiki/Requiem_(Verdi,_Giuseppe)"
      },
      {
        "category": "artistic",
        "title": "Marinus van Reymerswaele, \"The Money Changer and His Wife\" — VISUAL ARTWORK",
        "excerpt": "A money changer bends intently over his balance, weighing gold coins with a jeweller's precision while ledgers, receipts, and glinting specie crowd the cramped table. His wife, a devotional book open before her, lets her eyes drift from the sacred page toward the shimmering money—faith and profit tugging in opposite directions. The painting turns the counting-house into a quiet parable of divided loyalty, where the scales of commerce quietly displace the scales of conscience.",
        "source": "Marinus van Reymerswaele (workshop of), The Money Changer and His Wife, c. 1538, oil on panel, Musée des Beaux-Arts de Nantes. Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Marinus_van_Reymerswale_007.jpg",
        "image": {
          "src": "/covers/australia-big-four-accounting-breakup--art.png",
          "alt": "A money changer weighing coins on a balance beside his wife, who looks up from her prayer book toward the gold, in a cramped counting-house scene.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 7
  },
  {
    "slug": "south-korea-google-android-app-store",
    "headline": "South Korea's antitrust regulator accuses Google of abusing its position in the Android app store",
    "overview": "South Korea's Fair Trade Commission accused Google of abusing its dominant position in the Android app store market, alleging the company pressured game developers to release titles exclusively on its Play Store. The regulator signalled possible penalties.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMizgFBVV95cUxOeVRQQzlfMWh6TktXNVhTZTJCNkFzTVNTRmdkODhXSWlIMGdLQThtQ2hGZ01pZHRvbVFnQlZTc1NVeWF4MzBwaXYwN25VblhpVGlWd29xenk1STJicDhGdFJoWlk1aUxYbVYzaTBOX3JEb1dkd3plUXJhU2hKYWpVTWdycGZ2Y2JISURvZlB1SkJFOWthNmUwS2NKaDQ3Ym9CRmhGRWtyQk5GZDFJckVJZDA1VkM3cTg0N0ZwUEJrRnVlSnFDcUYwMFplb25Ydw?oc=5"
      },
      {
        "name": "The Korea Times",
        "href": "https://www.koreatimes.co.kr/business/companies/20260701/watchdog-launches-review-on-googles-alleged-fair-trade-violation"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-01",
    "image": {
      "src": "/covers/south-korea-google-android-app-store.png",
      "alt": "A single smartphone in soft light showing a grid of blank app tiles against a dark background.",
      "credit": "AI-generated"
    },
    "edition": "Afternoon Edition · 1 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Sherman Antitrust Act, §2 (1890)",
        "excerpt": "Every person who shall monopolize, or attempt to monopolize, or combine or conspire with any other person or persons, to monopolize any part of the trade or commerce among the several States, or with foreign nations, shall be deemed guilty of a misdemeanor, and, on conviction thereof; shall be punished by fine not exceeding five thousand dollars, or by imprisonment not exceeding one year, or by both said punishments, in the discretion of the court.",
        "source": "Sherman Antitrust Act, Section 2 (26 Stat. 209, July 2, 1890), transcribed at Wikisource, “Sherman Act.”",
        "href": "https://en.wikisource.org/wiki/Sherman_Antitrust_Act"
      },
      {
        "category": "historical",
        "title": "Ida M. Tarbell, The History of the Standard Oil Company (1904)",
        "excerpt": "“There was a pressure brought to bear upon my mind, and upon almost\nall citizens of Cleveland engaged in the oil business, to the effect\nthat unless we went into the South Improvement Company we were\nvirtually killed as refiners; that if we did not sell out we should\nbe crushed out. … There was only one buyer in the market, and we had\nto sell on their terms or be crushed out, as it was represented to\nus. … After learning what the arrangements were I felt as if, rather than fight such a monopoly, I would withdraw from the business, even at a sacrifice.”",
        "source": "Ida M. Tarbell, The History of the Standard Oil Company (New York: McClure, Phillips & Co., 1904), testimony of Mr. Alexander, of Alexander, Scofield and Company; Project Gutenberg eBook No. 60692.",
        "href": "https://www.gutenberg.org/cache/epub/60692/pg60692.txt"
      },
      {
        "category": "literary",
        "title": "The Three Billy-Goats Gruff",
        "excerpt": "“Trip, trap; trip, trap!” went the bridge.\n\n“WHO’S THAT tripping over my bridge?” roared the Troll.\n\n“Oh! it is only I, the tiniest billy-goat Gruff; and I’m going up to\nthe hill-side to make myself fat”, said the billy-goat, with such a\nsmall voice.\n\n“Now, I’m coming to gobble you up”, said the Troll.",
        "source": "“The Three Billy-Goats Gruff,” in Popular Tales from the Norse, trans. George Webbe Dasent (Edinburgh: David Douglas, 1888); Project Gutenberg eBook No. 8933.",
        "href": "https://www.gutenberg.org/cache/epub/8933/pg8933.txt"
      },
      {
        "category": "literary",
        "title": "John Bunyan, The Pilgrim’s Progress — Apollyon straddles the way",
        "excerpt": "APOL. Then Apollyon straddled quite over the whole breadth of the\nway, and said, I am void of fear in this matter: prepare thyself\nto die; for I swear by my infernal den, that thou shalt go no\nfurther; here will I spill thy soul.",
        "source": "John Bunyan, The Pilgrim’s Progress from This World to That Which Is to Come (1678); Project Gutenberg eBook No. 131.",
        "href": "https://www.gutenberg.org/cache/epub/131/pg131.txt"
      },
      {
        "category": "artistic",
        "title": "Edvard Grieg, “In the Hall of the Mountain King,” Peer Gynt Suite No. 1, Op. 46 — MUSIC",
        "excerpt": "A single skulking theme creeps up from the depths on plucked low strings, then repeats and repeats, gathering instruments and speed as it goes. What begins as a furtive tiptoe swells into a stamping, overwhelming stampede, as if a single dominant power were slowly closing every exit and crushing all resistance. By the frenzied end the listener is engulfed, trapped in the mountain king’s cavern with no room left to escape.",
        "source": "Edvard Grieg, Peer Gynt Suite No. 1, Op. 46, No. 4, “In the Hall of the Mountain King (I Dovregubbens hall)” (composed 1874–75); work page at IMSLP (Petrucci Music Library).",
        "href": "https://imslp.org/wiki/Peer_Gynt_Suite_No.1,_Op.46_(Grieg,_Edvard)"
      },
      {
        "category": "artistic",
        "title": "Udo Keppler, “Next!” (Standard Oil octopus), Puck, 1904 — VISUAL ARTWORK",
        "excerpt": "A bloated Standard Oil storage tank looms as a monstrous octopus, its tentacles snaking out to throttle the copper, steel, and shipping industries and to coil around a statehouse and the Capitol. One last tentacle reaches hungrily toward the White House, the giant’s grip tightening on every rival and every lever of power. The cartoon renders monopoly as a living creature that strangles competition and swallows the public square whole.",
        "source": "Udo J. Keppler, “Next!” chromolithograph, Puck, vol. 56, no. 1436 (September 7, 1904); Library of Congress; reproduced on Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Standard_oil_octopus_loc_color.jpg",
        "image": {
          "src": "/covers/south-korea-google-android-app-store--art.png",
          "alt": "1904 Puck political cartoon depicting Standard Oil as an octopus whose tentacles grip industry, statehouses, the U.S. Capitol, and reach toward the White House.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 8
  },
  {
    "slug": "kim-dotcom-extradition-appeal",
    "headline": "Kim Dotcom loses his latest appeal against extradition from New Zealand to the United States",
    "overview": "A New Zealand court rejected Kim Dotcom's latest appeal against his extradition to the United States, where he faces criminal charges tied to the defunct file-sharing site Megaupload. The ruling brings the internet entrepreneur's long-running legal battle closer to an end.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiugFBVV95cUxPS3dMYmhRdjNHUUcwMFRwYnJJWVYwUHRFM3JRR3NlVnNxSzlKQmR1WWt6Z1ppLWRjTmRTV0hWZjhYQmtDbnd0SzBZX3hmZDdzWjdoUnpDQlZUZ3pPS0QzVGI5eVZBeU5KMGkzSFRTWkVjb2dDLVVMLUJqSVZjNUtkN2VTd0hPSEZCVXBDUm82NkdLRzVGbWhqaUZlTktvTFFzYVl0enJXUmpQZGtJNnc4UV9HRk1mZFRZamc?oc=5"
      },
      {
        "name": "The New Zealand Herald",
        "href": "https://www.nzherald.co.nz/nz/court-of-appeal-dismisses-kim-dotcom-challenge-to-us-extradition/KF6O7TYEMVGTDLS6KLB7OHZD3A/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-01",
    "image": {
      "src": "/covers/kim-dotcom-extradition-appeal.png",
      "alt": "Internet entrepreneur Kim Dotcom speaking into a microphone at a press conference.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 1 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Cicero, First Oration Against Catiline",
        "excerpt": "When, O Catiline, do you mean to cease abusing our patience? How long is that madness of yours still to mock us? When is there to be an end of that unbridled audacity of yours, swaggering about as it does now?",
        "source": "Marcus Tullius Cicero, \"The First Oration Against Lucius Catilina\" (In Catilinam I), 63 B.C., trans. C. D. Yonge (1856), Perseus Digital Library, Tufts University.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.02.0019%3Atext%3DCatil.%3Aspeech%3D1%3Achapter%3D1"
      },
      {
        "category": "historical",
        "title": "Suetonius, The Life of Nero",
        "excerpt": "He was suddenly struck with horror at an earthquake, and by a flash of lightning which darted full in his face, and heard from the neighbouring camp the shouts of the soldiers, wishing his destruction, and prosperity to Galba.",
        "source": "Gaius Suetonius Tranquillus, \"Nero,\" ch. 48, in The Lives of the Twelve Caesars, trans. Alexander Thomson, Perseus Digital Library, Tufts University.",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.02.0132%3Alife%3Dnero%3Achapter%3D48"
      },
      {
        "category": "literary",
        "title": "Victor Hugo, Les Misérables — the pursuit of Jean Valjean",
        "excerpt": "As eleven o'clock struck from Saint-Etienne-du-Mont, he was traversing the Rue de Pontoise, in front of the office of the commissary of police, situated at No. 14. A few moments later, the instinct of which we have spoken above made him turn round. At that moment he saw distinctly, thanks to the commissary's lantern, which betrayed them, three men who were following him closely, pass, one after the other, under that lantern, on the dark side of the street.",
        "source": "Victor Hugo, Les Misérables (1862), Volume 2 (Cosette), Book Fifth (\"For a Black Hunt, a Mute Pack\"), Chapter 1, trans. Isabel F. Hapgood, Wikisource.",
        "href": "https://en.wikisource.org/wiki/Les_Mis%C3%A9rables/Volume_2/Book_Fifth/Chapter_1"
      },
      {
        "category": "literary",
        "title": "A Gest of Robyn Hode — the courteous outlaw",
        "excerpt": "Robyn was a prude outlaw,\n  Whyles he walked on grounde;\nSo curteyse an outlaw as he was one\n  Was never non yfounde.",
        "source": "\"A Gest of Robyn Hode,\" stanza 2, in Ballads of Robin Hood and other Outlaws: Popular Ballads of the Olden Times, Fourth Series, ed. Frank Sidgwick (London: Sidgwick & Jackson, 1912), Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/28744/28744-h/28744-h.htm"
      },
      {
        "category": "artistic",
        "title": "Franz Schubert, Erlkönig, D. 328 — MUSIC",
        "excerpt": "",
        "source": "Franz Schubert, Erlkönig, D. 328 (1815), ballad for voice and piano, text by Johann Wolfgang von Goethe; work page at the International Music Score Library Project (IMSLP / Petrucci Music Library).",
        "href": "https://imslp.org/wiki/Erlk%C3%B6nig,_D.328_(Schubert,_Franz)"
      },
      {
        "category": "artistic",
        "title": "John Singer Sargent, Orestes Pursued by the Furies — VISUAL ARTWORK",
        "excerpt": "",
        "source": "John Singer Sargent, Orestes Pursued by the Furies (1921), oil on canvas, 347.9 × 317.5 cm, Museum of Fine Arts, Boston (accession no. 25.645); public domain, via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Singer_Sargent,_John_-_Orestes_Pursued_by_the_Furies_-_1921.jpg",
        "image": {
          "src": "/covers/kim-dotcom-extradition-appeal--art.png",
          "alt": "Painting of a nude Orestes recoiling in terror as a swarm of avenging Furies with snakes in their hair press in around him",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 9
  },
  {
    "slug": "italy-etruscan-tomb-paintings",
    "headline": "Italy puts the frescoes of the ancient Etruscan François Tomb on public display in Rome",
    "overview": "Italy put the celebrated wall paintings of the François Tomb, a 4th-century BC Etruscan burial from Vulci, on public display at Rome's Villa Giulia National Etruscan Museum. The state acquired the frescoes for about 15 million euros from the Torlonia family, ending more than a century in private hands. The panels, depicting scenes from Greek myth and Etruscan history, anchor a new exhibition of recovered antiquity.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMikgFBVV95cUxQc1l1dTVoaDJtRkZmbHFRYVJKb1VzOEdZQVN4TXhFSXk5d3ZseVRJaFJoV1FZLTU1OXp0RGVZYl9vbXh5RjFQdVlqY1d0ME9aTWhLX0lwOFVtakg4MzZzbzdBLTRLVC1vSTJ2RVc0dVgwZVkxYUtaWkEwTmhMY2JDam8xMFIwZ3BYenMtQVBZamJidw?oc=5"
      },
      {
        "name": "Artnet News",
        "href": "https://news.artnet.com/art-world/italy-acquired-etruscan-frescoes-on-display-in-rome-2785043"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-01",
    "image": {
      "src": "/covers/italy-etruscan-tomb-paintings.png",
      "alt": "A brightly painted ancient Etruscan tomb fresco of banqueters and dancers.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 1 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Frederik Poulsen enters the painted tombs of Etruria",
        "excerpt": "The tombs and tomb-paintings of Etruria constitute a field of archaeology in which the investigator is particularly apt to be reminded of numerous sins of omission and to be haunted by a painfully uneasy conscience.",
        "source": "Frederik Poulsen, \"Etruscan Tomb Paintings: Their Subjects and Significance,\" trans. Ingeborg Andersen (Oxford: Clarendon Press, 1922), opening of Chapter I. Project Gutenberg eBook No. 62431.",
        "href": "https://www.gutenberg.org/cache/epub/62431/pg62431.txt"
      },
      {
        "category": "historical",
        "title": "George Dennis stands before an opened Etruscan tomb at Tarquinii",
        "excerpt": "The next impression is one of surprise. Can this be the resting-place of the dead? — Can these scenes of feasting and merriment, this dancing, this piping, this sporting, appertain to a tomb?",
        "source": "George Dennis, \"The Cities and Cemeteries of Etruria\" (London: John Murray, 1848), Chapter XVIII, \"Corneto — Tarquinii: The Cemetery.\" Transcribed text hosted by the University of Chicago (Bill Thayer's LacusCurtius/Penelope).",
        "href": "https://penelope.uchicago.edu/Thayer/E/Gazetteer/Places/Europe/Italy/_Periods/Roman/Archaic/Etruscan/_Texts/DENETR*/18A.html"
      },
      {
        "category": "literary",
        "title": "Keats addresses an urn that outlives its makers",
        "excerpt": "Thou still unravish'd bride of quietness,\n    Thou foster-child of silence and slow time,\nSylvan historian, who canst thus express\n    A flowery tale more sweetly than our rhyme:\nWhat leaf-fring'd legend haunts about thy shape\n    Of deities or mortals, or of both,\n        In Tempe or the dales of Arcady?\n    What men or gods are these? What maidens loth?\nWhat mad pursuit? What struggle to escape?\n    What pipes and timbrels? What wild ecstasy?",
        "source": "John Keats, \"Ode on a Grecian Urn,\" in \"Lamia, Isabella, The Eve of St. Agnes, and Other Poems\" (London: Taylor and Hessey, 1820), first stanza. Wikisource, from the 1909 Robertson edition.",
        "href": "https://en.wikisource.org/wiki/Keats;_poems_published_in_1820/Ode_on_a_Grecian_Urn"
      },
      {
        "category": "literary",
        "title": "Shelley on the sculptor's hand surviving in the desert",
        "excerpt": "Half sunk, a shattered visage lies, whose frown,\nAnd wrinkled lip, and sneer of cold command,\nTell that its sculptor well those passions read,\nWhich yet survive, stamped on these lifeless things,\nThe hand that mocked them, and the heart that fed:",
        "source": "Percy Bysshe Shelley, \"Ozymandias,\" first published (under the pen-name Glirastes) in \"The Examiner,\" 11 January 1818. Wikisource transcription of the 1818 Examiner printing.",
        "href": "https://en.wikisource.org/wiki/The_Examiner_(London)/Ozymandias"
      },
      {
        "category": "artistic",
        "title": "Respighi, Pini di Roma — MUSIC",
        "excerpt": "Respighi conjures the eternal city as living stone, closing his tetralogy with \"I pini della Via Appia,\" where distant footsteps swell out of the dawn mist into an overwhelming brass procession. Like the recovered frescoes, the music summons a vanished people back into presence, marching phantom legions across ground that has outlived them. It is antiquity made audible: buried life exhumed, and the dead given voice through art.",
        "source": "Ottorino Respighi, \"Pini di Roma\" (Pines of Rome), symphonic poem in four movements for orchestra (1924). Score hosted on IMSLP (Petrucci Music Library).",
        "href": "https://imslp.org/wiki/Pini_di_Roma_(Respighi,_Ottorino)"
      },
      {
        "category": "artistic",
        "title": "Musician of the Tomb of the Triclinium — VISUAL ARTWORK",
        "excerpt": "A young musician turns, barbiton in hand, his fingers caught mid-note against a bright field scattered with foliage and birds. Painted around 470 BCE for the walls of a tomb at Tarquinia, he was made to play forever for the dead reclining nearby. Colour and gesture survive where the mourners did not, so that a lost people still feasts and pipes to us across twenty-five centuries.",
        "source": "Etruscan master, \"Detail of a musician with a barbiton, Tomb of the Triclinium, Necropolis of Monterozzi, Tarquinia,\" fresco, c. 470 BCE. Public domain reproduction on Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Etruskischer_Meister_001.jpg",
        "image": {
          "src": "/covers/italy-etruscan-tomb-paintings--art.png",
          "alt": "Etruscan fresco detail of a musician playing a barbiton among trees and birds, from the Tomb of the Triclinium at Tarquinia, c. 470 BCE.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 10
  },
  {
    "slug": "mexico-beat-ecuador-world-cup",
    "headline": "Mexico beat Ecuador 2-0 to reach the World Cup round of 16, ending a 40-year knockout drought",
    "overview": "Mexico beat Ecuador 2-0 to reach the round of 16 at the World Cup, ending a knockout-stage drought that had stretched about 40 years. The win, played before a home crowd, sends the host nation through to the last 16.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMijAFBVV95cUxNTWJNR2NWYjI2NmVIdmVzQi1yMGdtYmFEV2k4ZTBsX1lRaFdHWDNFbllsdll4dHlFMmlfWUlsQXJpYTE2eFZENEhLaHFXQk9pc2NoRHEwQmp4MlljQ0Exa3JTRFl5Y3lEOHVFN0g3TmFUZzNNWnk4X1B3NUFEdXltYnlWUTQwZm1zN3RObg?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiuAFBVV95cUxOVkRkdzNZdExtUXNZTEVvWHdjT1pRcjdoLUVPUFNCQWptaUhPUkdVSjFKTDRsbUt4QVhaTUR0M29LWDhWQWRXcV9Zc3FqbmtqQkg5UlBUM0FQUzNrS0pINGtYSlJnejRIT185T2trWTVGX0lJRjJUWGJwLU9qS2NidWxTVkpTM25PNEpReFBhM2R4VVBpbUtUa0tMMElTdURWT3V0aV94aFlCMlZOblVYbzJOWk91WTVu?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-01",
    "image": {
      "src": "/covers/mexico-beat-ecuador-world-cup.png",
      "alt": "An empty floodlit football stadium at night, a brilliant green pitch and a single ball on the centre spot.",
      "credit": "AI-generated"
    },
    "edition": "Afternoon Edition · 1 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Pindar, Olympian 1 (for Hieron of Syracuse, 476 BC)",
        "excerpt": "Water is best, and gold, like a blazing fire in the night, stands out supreme of all lordly wealth. But if, my heart, you wish to sing of contests, [5] look no further for any star warmer than the sun, shining by day through the lonely sky, and let us not proclaim any contest greater than Olympia.",
        "source": "Pindar, Olympian 1, trans. Diane Arnson Svarlien (1990); Perseus Digital Library, Tufts University.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0162%3Abook%3DO.%3Apoem%3D1"
      },
      {
        "category": "historical",
        "title": "Pindar, Olympian 2 (for Theron of Acragas, 476 BC)",
        "excerpt": "Songs, rulers of the lyre, what god, what hero, what man shall we celebrate? Indeed, Pisa belongs to Zeus; and Heracles established the Olympic festival, as the finest trophy of battle; and Theron must be proclaimed because of his victorious four-horse chariot.",
        "source": "Pindar, Olympian 2, trans. Diane Arnson Svarlien (1990); Perseus Digital Library, Tufts University.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0162%3Abook%3DO.%3Apoem%3D2"
      },
      {
        "category": "literary",
        "title": "Homer, The Odyssey, Book XXIII — the homecoming of Ulysses",
        "excerpt": "“Wake up Penelope, my dear child,” she exclaimed, “and see with your own eyes something that you have been wanting this long time past. Ulysses has at last indeed come home again, and has killed the suitors who were giving so much trouble in his house, eating up his estate and ill treating his son.”",
        "source": "Homer, The Odyssey, Book XXIII, trans. Samuel Butler; Project Gutenberg eBook #1727.",
        "href": "https://www.gutenberg.org/files/1727/1727-h/1727-h.htm"
      },
      {
        "category": "literary",
        "title": "Psalm 126 (King James Version) — the ending of a long captivity",
        "excerpt": "When the LORD turned again the captivity of Zion, we were like them that dream. Then was our mouth filled with laughter, and our tongue with singing: then said they among the heathen, The LORD hath done great things for them. The LORD hath done great things for us; whereof we are glad.",
        "source": "Psalm 126:1–3, Authorized (King James) Version; Wikisource, Bible (King James)/Psalms.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Psalms"
      },
      {
        "category": "artistic",
        "title": "Giuseppe Verdi, Triumphal March from Aïda — MUSIC",
        "excerpt": "Verdi's Grand March from Act II of Aïda is the sound of a nation exulting before its own people: blaring long-belled trumpets in bright A-flat, a broad striding melody, and massed chorus swelling as the victorious army parades home. Brass fanfares answer one another across the stage while the orchestra drives forward with festive, unstoppable momentum. It is the archetype of public triumph, a homecoming celebrated in the open before a rejoicing crowd.",
        "source": "Giuseppe Verdi, Aïda (1870–71), Act II Triumphal March (“Gloria all'Egitto”); work page, International Music Score Library Project (IMSLP / Petrucci Music Library).",
        "href": "https://imslp.org/wiki/Aida_(Verdi,_Giuseppe)"
      },
      {
        "category": "artistic",
        "title": "Euphiletos Painter, Panathenaic Prize Amphora with a foot race — VISUAL ARTWORK",
        "excerpt": "Five nude, bearded runners surge across the black-figure surface of this Athenian prize vase, each with a leg thrown forward in a long stride, muscles taut in the sprint of the stadion. Awarded to victors at the Panathenaic Games held in honour of Athena, the amphora itself was the trophy, brimming with sacred olive oil. It fuses the theme of athletic contest and the glory of the winner into a single object of the ancient games.",
        "source": "Attributed to the Euphiletos Painter, Terracotta Panathenaic prize amphora (foot race), Greek, Attic, Archaic, ca. 530 BC; The Metropolitan Museum of Art, New York, accession no. 14.130.12 (Open Access, CC0). Photograph by Eileen Travell, via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Terracotta_Panathenaic_prize_amphora_MET_DP245711.jpg",
        "image": {
          "src": "/covers/mexico-beat-ecuador-world-cup--art.png",
          "alt": "Black-figure Panathenaic prize amphora showing five nude runners in a foot race, attributed to the Euphiletos Painter, ca. 530 BC.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 11
  },
  {
    "slug": "california-food-date-labels",
    "headline": "California becomes the first US state to ban 'sell by' food date labels to cut waste",
    "overview": "California became the first US state to bar consumer-facing 'sell by' food date labels, with a law taking effect that standardizes wording to 'best if used by' for quality and 'use by' for safety. Officials said a confusing patchwork of more than 50 date phrases drives Americans to throw out billions of meals of good food each year. Regulators framed the change as a way to cut household waste and the organic matter piling up in landfills.",
    "genre": "Climate",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMimgFBVV95cUxQSjZZLWNySl8wd1pneUJka3VFVWwxSTE0X1I5Vk40WGxfX3J2OTVVRXYwSkE1VUNtVF81dDlYTlRFaV9xVkktdXFJdHlhLWUzMXRuTkx6Uk92ZkJHcmdtR1BfOVR0dG5oNU5SY3BkdlpQRkJMVlhxekZUSEhZRjV3UklVTXNxSkU1RmFRdHRsX2paMmtkSmMzaW13?oc=5"
      },
      {
        "name": "KTVU",
        "href": "https://www.ktvu.com/news/starting-july-1-new-california-law-changes-confusing-food-safety-sell-by-labeling-rules"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-01",
    "image": {
      "src": "/covers/california-food-date-labels.png",
      "alt": "Rows of packaged food on brightly lit grocery-store shelves.",
      "credit": "AI-generated"
    },
    "edition": "Afternoon Edition · 1 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Gleaning Law of Leviticus",
        "excerpt": "And when ye reap the harvest of your land, thou shalt not wholly reap the corners of thy field, neither shalt thou gather the gleanings of thy harvest.\nAnd thou shalt not glean thy vineyard, neither shalt thou gather every grape of thy vineyard; thou shalt leave them for the poor and stranger: I am the LORD your God.",
        "source": "Leviticus 19:9-10, King James Version, Wikisource.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Leviticus"
      },
      {
        "category": "historical",
        "title": "Ruth Gleans in the Fields of Boaz",
        "excerpt": "And Ruth the Moabitess said unto Naomi, Let me now go to the field, and glean ears of corn after him in whose sight I shall find grace.",
        "source": "Ruth 2:2, King James Version, Wikisource.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Ruth"
      },
      {
        "category": "literary",
        "title": "Gather Up the Fragments That Remain",
        "excerpt": "When they were filled, he said unto his disciples, Gather up the fragments that remain, that nothing be lost.",
        "source": "The Gospel of John 6:12, King James Version, Wikisource.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/John"
      },
      {
        "category": "literary",
        "title": "Hesiod on Thrift and the Wine Cask",
        "excerpt": "Take your fill when the cask is first opened and when it is nearly spent, but midways be sparing: it is poor saving when you come to the lees.",
        "source": "Hesiod, Works and Days, trans. Hugh G. Evelyn-White (1914), Perseus Digital Library.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0132:card=356"
      },
      {
        "category": "artistic",
        "title": "Haydn, Die Jahreszeiten (The Seasons) — Autumn — MUSIC",
        "excerpt": "Haydn's late oratorio ripens from sowing to reaping to feast, and in Der Herbst (Autumn) the chorus swells with the joy of the full harvest and the groaning abundance of laden fields. Horns blaze through the exhilarating hunting chorus while the vineyard's tumult of song celebrates the pressing of the grape. It is music of plenty at its peak, the very moment when gathered fruit is either honored or left to rot.",
        "source": "Joseph Haydn, Die Jahreszeiten (The Seasons), Hob.XXI:3, Part 3 'Der Herbst' (Autumn), composed 1799-1801; work page at IMSLP / Petrucci Music Library.",
        "href": "https://imslp.org/wiki/Die_Jahreszeiten,_Hob.XXI:3_(Haydn,_Joseph)"
      },
      {
        "category": "artistic",
        "title": "Jean-François Millet, The Gleaners — VISUAL ARTWORK",
        "excerpt": "Three peasant women stoop across a vast shorn field, gathering by hand the stray stalks left behind after the reapers and the towering stacks of the landowner's harvest in the sunlit distance. Millet dignifies the ancient right of the poor to glean what would otherwise be wasted, casting the bent backs of the gatherers in monumental, almost sacred solemnity. Nothing of the harvest is meant to be lost, and the painting makes a quiet moral drama of abundance and its remainders.",
        "source": "Jean-François Millet (1814-1875), The Gleaners (Des glaneuses), 1857, oil on canvas, Musée d'Orsay, Paris; public domain, via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Jean-Fran%C3%A7ois_Millet_-_Gleaners_-_Google_Art_Project_2.jpg",
        "image": {
          "src": "/covers/california-food-date-labels--art.png",
          "alt": "Three peasant women bending to gather leftover stalks of grain in a wide harvested field, with haystacks and reapers in the sunlit background.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 12
  },
  {
    "slug": "spain-june-heat-deaths",
    "headline": "Spain links more than 1,000 excess deaths to heat during its second-hottest June on record",
    "overview": "Spain attributed more than 1,000 excess deaths to high temperatures during what its weather service called the country's second-hottest June on record. Health authorities said the elderly were most affected as an early, intense heatwave gripped the Iberian peninsula.",
    "genre": "Climate",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMixgFBVV95cUxOOE4zcnY2eUV1cXBPNDV6b01mR1BpcE1pc2RLZG1ReDZ0LXFJdERlMG9zV1dYLW55c2xzeUt3dHB3THdKaGRoSW1DbnpLaWFfU1lFLTBDTC1YUExQOHlLT3d2VWcyNi1ZN1lWcmpsaXpiUXYwcm1wY29PejJMZVhDZDFFTUlFak9IMGtUdUYwVTlsc1loVllQV1N6c2JFQXZIMEJYSU4wVnp2WWRSWFV6bVNnTndRWGVaUUVLVWtBNE9RVFY1Ymc?oc=5"
      },
      {
        "name": "RTÉ News",
        "href": "https://www.rte.ie/news/world/2026/0701/1581217-spain-heatwave/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-01",
    "image": {
      "src": "/covers/spain-june-heat-deaths.png",
      "alt": "A sun-bleached Spanish city square at midday in a heatwave, a dry stone fountain shimmering under a white-hot sky.",
      "credit": "AI-generated"
    },
    "edition": "Afternoon Edition · 1 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Plague of Athens",
        "excerpt": "Externally the body was not very hot to the touch, nor pale in its appearance, but reddish, livid, and breaking out into small pustules and ulcers. But internally it burned so that the patient could not bear to have on him clothing or linen even of the very lightest description; or indeed to be otherwise than stark naked. What they would have liked best would have been to throw themselves into cold water; as indeed was done by some of the neglected sick, who plunged into the rain-tanks in their agonies of unquenchable thirst; though it made no difference whether they drank little or much.",
        "source": "Thucydides, History of the Peloponnesian War, Book II (the plague of Athens), translated by Richard Crawley. Wikisource.",
        "href": "https://en.wikisource.org/wiki/History_of_the_Peloponnesian_War/Book_2"
      },
      {
        "category": "historical",
        "title": "Fever in the Summer Heat of Mesopotamia",
        "excerpt": "extremely dry and hot. And the Romans were not accustomed to this and especially those who came from Thrace; and since they were living their daily life in a place where the heat was excessive and in stuffy huts in the summer season, they became so ill that the third part of the army were lying half-dead.",
        "source": "Procopius, History of the Wars, Book II, translated by H. B. Dewing (Loeb Classical Library). Project Gutenberg eBook #16764.",
        "href": "https://www.gutenberg.org/files/16764/16764-h/16764-h.htm"
      },
      {
        "category": "literary",
        "title": "The Ravening Dog-Star",
        "excerpt": "And now the ravening dog-star that burns up\nThe thirsty Indians blazed in heaven; his course\nThe fiery sun had half devoured: the blades\nWere parched, and the void streams with droughty jaws\nBaked to their mud-beds by the scorching ray,",
        "source": "Virgil, Georgics, Book IV, translated by James Rhoades. Project Gutenberg eBook #232.",
        "href": "https://www.gutenberg.org/cache/epub/232/pg232.txt"
      },
      {
        "category": "literary",
        "title": "The Bloody Sun at Noon",
        "excerpt": "All in a hot and copper sky,\nThe bloody Sun, at noon,\nRight up above the mast did stand,\nNo bigger than the Moon.\n\nDay after day, day after day,\nWe stuck, nor breath nor motion,\nAs idle as a painted ship\nUpon a painted ocean.\n\nWater, water, every where,\nAnd all the boards did shrink;\nWater, water, every where,\nNor any drop to drink.",
        "source": "Samuel Taylor Coleridge, \"The Rime of the Ancient Mariner\" (Sibylline Leaves, 1817), Part the Second. Wikisource.",
        "href": "https://en.wikisource.org/wiki/Sibylline_Leaves_(Coleridge)/The_Rime_of_the_Ancient_Mariner"
      },
      {
        "category": "artistic",
        "title": "Summer, from The Four Seasons — MUSIC",
        "excerpt": "Over a shimmering, oppressive stillness the strings droop and languish, evoking a land and its people worn thin beneath a merciless sun. Vivaldi's accompanying sonnet describes man and flock exhausted and the pine tree scorched, before the music erupts into a furious summer thunderstorm. The Presto finale unleashes torrents of racing notes, the violent release of a heat that has built until the sky itself breaks.",
        "source": "Antonio Vivaldi, Violin Concerto in G minor, RV 315, \"L'estate\" (Summer), No. 2 of Le quattro stagioni (The Four Seasons), Op. 8 (1725). IMSLP work page.",
        "href": "https://imslp.org/wiki/Violin_Concerto_in_G_minor,_RV_315_(Vivaldi,_Antonio)"
      },
      {
        "category": "artistic",
        "title": "Sower at Sunset — VISUAL ARTWORK",
        "excerpt": "A vast molten sun hangs low and enormous over a burning field, flooding the whole canvas with searing yellow. A lone sower strides across the parched, harvest-gold earth, dwarfed beneath the blazing orb that seems less to warm than to consume. Van Gogh turns the summer sun into a radiant, almost violent force, at once life-giving and scorching the land it rules.",
        "source": "Vincent van Gogh, Sower at Sunset (De zaaier), oil on canvas, Arles, June 1888, Kröller-Müller Museum, Otterlo. Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Sower_at_Sunset_-_Vincent_Van_Gogh.jpg",
        "image": {
          "src": "/covers/spain-june-heat-deaths--art.png",
          "alt": "Van Gogh's Sower at Sunset: an enormous glowing sun over a field of parched golden earth, with a solitary sower scattering seed beneath it.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 13
  },
  {
    "slug": "trump-crypto-income-billion",
    "headline": "Trump reports more than $1.4 billion in income from crypto ventures in his first year back in office",
    "overview": "President Donald Trump reported more than $1.4 billion in income from cryptocurrency ventures over his first year back in office, according to a new financial disclosure. The figure, drawn largely from his family's crypto businesses, dwarfs his other sources of income and has intensified questions about conflicts of interest.",
    "genre": "Politics",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cvgmv98ez3zo"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMipAFBVV95cUxPM3BNSU5vN1NhSXlTQXg0M2NCcXV0dEczV2hwTDhFNHJxMFk1ZEhpZUMxd0tPdTZxTUtLdDl3YjdQR0RXV2RiRE5rSzUtVFEwVFNlTVBPNkFyR3RuclFXemJIRF84VkJHcThiOU85N3RUdHRwdjF2QjYzUkhIeC1YS0xIZWNLTVhoUUEzSjM2V0VXZVdSdExhNmpTdTRTaU9wVWpncA?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-01",
    "image": {
      "src": "/covers/trump-crypto-income-billion.png",
      "alt": "President Donald Trump pictured alongside imagery of cryptocurrency.",
      "credit": "BBC"
    },
    "edition": "Morning Edition · 1 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Vespasian and the Tax on Urine (\"Pecunia non olet\")",
        "excerpt": "When his son Titus blamed him for even laying a tax upon urine, he applied to his nose a piece of the money he received in the first instalment, and asked him, \"if it stunk?\" And he replying no, \"And yet,\" said he, \"it is derived from urine.\"",
        "source": "Suetonius, The Lives of the Twelve Caesars, Divus Vespasianus, ch. 23 (Alexander Thomson trans.), Perseus Digital Library, Tufts University",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0132:life%3Dves.:chapter%3D23"
      },
      {
        "category": "historical",
        "title": "Plutarch on the Avarice of Crassus",
        "excerpt": "The Romans, it is true, say that the many virtues of Crassus were obscured by his sole vice of avarice; and it is likely that the one vice which became stronger than all the others in him, weakened the rest. The chief proofs of his avarice are found in the way he got his property and in the amount of it.",
        "source": "Plutarch, Life of Crassus, ch. 2 (Bernadotte Perrin trans., 1916), Perseus Digital Library, Tufts University",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:2008.01.0038:chapter%3D2:section%3D1"
      },
      {
        "category": "literary",
        "title": "Dante on the Simonists (Inferno, Canto XIX)",
        "excerpt": "O SIMON MAGUS, O forlorn disciples,\nYe who the things of God, which ought to be\nThe brides of holiness, rapaciously\nFor silver and for gold do prostitute,\nNow it behoves for you the trumpet sound,\nBecause in this third Bolgia ye abide.",
        "source": "Dante Alighieri, The Divine Comedy: Inferno, Canto XIX (Henry Wadsworth Longfellow trans., 1867), Wikisource",
        "href": "https://en.wikisource.org/wiki/Divine_Comedy_(Longfellow_1867)/Volume_1/Canto_19"
      },
      {
        "category": "literary",
        "title": "Volpone Worships His Gold (Ben Jonson)",
        "excerpt": "Good morning to the day; and next, my gold!—\nHail the world's soul, and mine!",
        "source": "Ben Jonson, Volpone; or, The Fox, Act I, Scene 1 (1606), Wikisource",
        "href": "https://en.wikisource.org/wiki/Volpone/Act_I"
      },
      {
        "category": "artistic",
        "title": "Wagner, Das Rheingold — MUSIC",
        "excerpt": "The prelude of Wagner's Ring cycle turns on a curse: the dwarf Alberich renounces love to seize the Rhinemaids' gold and forge a ring of limitless power, and the treasure poisons everyone who touches it. Wagner scores the gold's allure with shimmering, hypnotic orchestral color that darkens into menace as greed takes hold. It is the definitive musical parable of vast wealth corrupting whoever grasps for dominion through it.",
        "source": "Richard Wagner, Das Rheingold, WWV 86A, full score (B. Schott's Söhne, Mainz, 1873), IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Das_Rheingold,_WWV_86A_(Wagner,_Richard)"
      },
      {
        "category": "artistic",
        "title": "Evelyn De Morgan, The Worship of Mammon — VISUAL ARTWORK",
        "excerpt": "Evelyn De Morgan's 1909 allegory shows a woman abasing herself at the feet of Mammon, the cold idol of riches, who dangles a bag of gold while she clings to his knee and gazes up in rapture. The painting dramatizes the biblical warning that one cannot serve both God and Mammon, rendering the pull of money as literal, degrading worship. It is a pointed image of a person who has traded every higher loyalty for the glitter of wealth.",
        "source": "Evelyn De Morgan, The Worship of Mammon, 1909, oil on canvas, De Morgan Collection; Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:The_worship_of_Mammon.jpg",
        "image": {
          "src": "/covers/trump-crypto-income-billion--art.png",
          "alt": "A kneeling woman in white clings to the knee of a towering golden idol of Mammon who holds out a bag of gold.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 14
  },
  {
    "slug": "us-lifts-anthropic-export-ban",
    "headline": "US lifts export ban on Anthropic's advanced Fable and Mythos AI models",
    "overview": "The United States lifted export curbs that had restricted sales of Anthropic's most advanced artificial-intelligence models, including its Fable and Mythos systems, the company said. The move eases limits that had kept the frontier models out of a number of overseas markets.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMitAFBVV95cUxNZDJJRUpoY0J3YUZXZWFpUFF5N2pzUTM3X2pSMzZXdVI3ZEtsTnU1b09yRl9TU1NhMlV2RFF4Q3ZEaUVnQXVYWlpzd0k0OGVjRkgzNlBtVTFab3ZxZWFGWUMtWXFCOEZqODdRNzhhSml1Y0pTZGZVNVJLSFZvSGJ2VDFMZ1RTNm5fTXoxVXpQWWRSR3ptWXVpM2Mzc0l4YW05cl9LRDBPV3kwc1FhdmVKcWJwWHA?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cdr42623e1do"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-01",
    "image": {
      "src": "/covers/us-lifts-anthropic-export-ban.png",
      "alt": "An abstract representation of an advanced artificial-intelligence system.",
      "credit": "BBC"
    },
    "edition": "Morning Edition · 1 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Byzantine Silk Smuggling under Justinian (c. 552 CE)",
        "excerpt": "About the same time there came from India certain monks; and when they had satisfied Justinian Augustus that the Romans no longer should buy silk from the Persians, they promised the emperor in an interview that they would provide the materials for making silk so that never should the Romans seek business of this kind from their enemy the Persians, or from any other people whatsoever. They said that they were formerly in Serinda, which they call the region frequented by the people of the Indies, and there they learned perfectly the art of making silk. Moreover, to the emperor who plied them with many questions as to whether he might have the secret, the monks replied that certain worms were manufacturers of silk, nature itself forcing them to keep always at work; the worms could certainly not be brought here alive, but they could be grown easily and without difficulty; the eggs of single hatchings are innumerable; as soon as they are laid men cover them with dung and keep them warm for as long as it is necessary so that they produce insects.",
        "source": "Procopius of Caesarea, History of the Wars, Book VIII (Gothic War IV), ch. 17, on the introduction of sericulture into the Byzantine Empire. Internet Medieval Sourcebook (Fordham University).",
        "href": "https://sourcebooks.fordham.edu/source/550byzsilk.asp"
      },
      {
        "category": "historical",
        "title": "The 1843 Debate on the Exportation of Machinery in the House of Commons",
        "excerpt": "These branches of manufacture had found their way abroad; other countries are determined to manufacture for themselves instead of taking them from us, and the only question now was, whether we should inflict the small additional charge upon the prosecution of foreign manufacturing enterprise which the prohibition of the exportation of our machinery seemed to enable us to do.",
        "source": "Mr. Gladstone, \"Exportation of Machinery,\" HC Deb, 10 August 1843, Hansard (UK Parliament historic Hansard archive).",
        "href": "https://api.parliament.uk/historic-hansard/commons/1843/aug/10/exportation-of-machinery"
      },
      {
        "category": "literary",
        "title": "Prometheus Bound",
        "excerpt": "Yes, and I caused mortals to cease foreseeing their doom.\n\nChorus: Of what sort was the cure that you found for this affliction?\n\nPrometheus: I caused blind hopes to dwell within their breasts.\n\nChorus: A great benefit was this you gave to mortals.\n\nPrometheus: In addition, I gave them fire.\n\nChorus: What! Do creatures of a day now have flame-eyed fire?\n\nPrometheus: Yes, and from it they shall learn many arts.",
        "source": "Aeschylus, Prometheus Bound, lines 248-256, trans. Herbert Weir Smyth (1926). Perseus Digital Library, Tufts University.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0010:card=250"
      },
      {
        "category": "literary",
        "title": "Frankenstein; or, The Modern Prometheus",
        "excerpt": "Learn from me, if not by my precepts, at least by my example, how dangerous is the acquirement of knowledge, and how much happier that man is who believes his native town to be the world, than he who aspires to become greater than his nature will allow.",
        "source": "Mary Wollstonecraft Shelley, Frankenstein, or the Modern Prometheus, Revised Edition (London: Henry Colburn and Richard Bentley, 1831), Chapter 4. Wikisource.",
        "href": "https://en.wikisource.org/wiki/Frankenstein,_or_the_Modern_Prometheus_(Revised_Edition,_1831)/Chapter_4"
      },
      {
        "category": "artistic",
        "title": "Scriabin, Prometheus: The Poem of Fire, Op. 60 — MUSIC",
        "excerpt": "Scriabin's single-movement symphonic poem for orchestra, piano, wordless chorus, and a keyboard of colored light channels the Promethean myth into pure sound, built almost entirely on his shimmering, unresolved \"mystic chord.\" The music surges from a dark, hovering haze toward a blazing, ecstatic climax, staging the theft of fire as the awakening of human consciousness. First performed in Moscow in 1911, it fuses light and tone to make the diffusion of a stolen, transformative power almost physically audible.",
        "source": "Aleksandr Scriabin, Prometheus, Le Poème du Feu (Symphony No. 5), Op. 60 (1910). IMSLP / Petrucci Music Library work page.",
        "href": "https://imslp.org/wiki/Prometheus,_Le_Po%C3%A8me_du_Feu,_Op.60_(Scriabin,_Aleksandr)"
      },
      {
        "category": "artistic",
        "title": "Heinrich Füger, Prometheus Brings Fire to Mankind — VISUAL ARTWORK",
        "excerpt": "Heinrich Füger's luminous Neoclassical canvas shows the Titan Prometheus kneeling amid shadowed, half-formed mortals, cupping a newly kindled flame that throws warm light across their awakening faces. The stolen fire becomes the visual center of the composition, radiating knowledge outward from a single source into the surrounding darkness. The painting frames the gift of a forbidden, world-changing power as the very moment humankind steps into enlightenment.",
        "source": "Heinrich Friedrich Füger, Prometheus Brings Fire to Mankind, oil on canvas, c. 1817, Liechtenstein Museum, Vienna. Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Heinrich_fueger_1817_prometheus_brings_fire_to_mankind.jpg",
        "image": {
          "src": "/covers/us-lifts-anthropic-export-ban--art.png",
          "alt": "Prometheus kneels in shadow holding a bright flame that illuminates awakening human figures around him.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 15
  },
  {
    "slug": "antarctica-dinosaur-fossil-drawer",
    "headline": "Fossil kept in a drawer for 40 years is identified as Antarctica's first dinosaur bone",
    "overview": "A fossil that sat in a British Antarctic Survey drawer for about 40 years has been identified as the first dinosaur bone ever collected on Antarctica. The 82-million-year-old tail vertebra belonged to a titanosaur, a long-necked plant-eating sauropod, and was originally recorded as a marine reptile when it was gathered on James Ross Island in 1985.",
    "genre": "Science",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMingFBVV95cUxQOTUxZlhZYTFpM21TSUJpelczQ3JnS08yZFM4Tm9ZRnNNU2ZuWVBLN0hIaVQtcy15V2Z0NDVnRDlNVWhfbjQwaFVRNmJ3VnZiUkVGazZTOGJvbWJxWk5waGtHWTVzOVpTNEp2Y0ZWMEdndlBxRkhLNlQ2Mm5Pb3lodzRxSWs0a0VUbEZZaDNZUTE2NVNXM2xRVlJmMjRsQQ?oc=5"
      },
      {
        "name": "CNN",
        "href": "https://www.cnn.com/2026/06/30/science/antarctica-first-dinosaur-scli-intl"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-01",
    "image": {
      "src": "/covers/antarctica-dinosaur-fossil-drawer.png",
      "alt": "An illustrated reconstruction of a long-necked titanosaur sauropod dinosaur.",
      "credit": "CNN"
    },
    "edition": "Morning Edition · 1 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Scott's Last Expedition: fossils gathered at Mount Buckley",
        "excerpt": "From the last Wilson, with his sharp eyes, has picked several plant impressions, the last a piece of coal with beautifully traced leaves in layers, also some excellently preserved impressions of thick stems, showing cellular structure.",
        "source": "Robert Falcon Scott, Scott's Last Expedition, Volume 1 (journal entry of 8 February 1912, at Mount Buckley near the Beardmore Glacier), arranged by Leonard Huxley, 1913. Wikisource.",
        "href": "https://en.wikisource.org/wiki/Scott's_Last_Expedition/Volume_1/Chapter_19"
      },
      {
        "category": "historical",
        "title": "Howard Carter opens the tomb of Tut-ankh-Amen",
        "excerpt": "At first I could see nothing, the hot air escaping from the chamber causing the candle flame to flicker, but presently, as my eyes grew accustomed to the light, details of the room within emerged slowly from the mist, strange animals, statues, and gold—everywhere the glint of gold.",
        "source": "Howard Carter and A. C. Mace, The Tomb of Tut-ankh-Amen, Discovered by the Late Earl of Carnarvon and Howard Carter, Volume 1, George H. Doran Co., New York, 1923. Internet Archive.",
        "href": "https://archive.org/details/tomboftutankhame00cart_1"
      },
      {
        "category": "literary",
        "title": "A Journey to the Centre of the Earth: the field of bleached bones",
        "excerpt": "It seemed like an immense cemetery, where the remains of twenty ages mingled their dust together.",
        "source": "Jules Verne, A Journey to the Centre of the Earth, chapter XXXVII, translated by Frederick Amadeus Malleson (1877). Standard Ebooks.",
        "href": "https://standardebooks.org/ebooks/jules-verne/journey-to-the-center-of-the-earth/f-a-malleson/text/chapter-37"
      },
      {
        "category": "literary",
        "title": "Ozymandias by Percy Bysshe Shelley",
        "excerpt": "Nothing beside remains. Round the decay\nOf that colossal wreck, boundless and bare\nThe lone and level sands stretch far away.",
        "source": "Percy Bysshe Shelley, \"Ozymandias\" (1818), as printed in The Hundred Best Poems (Lyrical) in the English Language, Second Series. Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_Hundred_Best_Poems_(lyrical)_in_the_English_language_-_second_series/Ozymandias"
      },
      {
        "category": "artistic",
        "title": "Sinfonia Antartica (Symphony No. 7), Ralph Vaughan Williams — MUSIC",
        "excerpt": "Grown from Vaughan Williams's score for the film Scott of the Antarctic, this five-movement symphony turns the frozen continent itself into sound, with a wordless soprano and women's chorus keening like wind over the ice. Wind machine, organ, tuned percussion and glittering strings conjure a landscape of vast silences and deep, indifferent time. It is a fitting soundtrack to a bone that lay unseen in the polar dark for eighty million years, then decades more in a drawer.",
        "source": "Ralph Vaughan Williams, Sinfonia Antartica (Symphony No. 7), composed 1949–1952, first performed 1953. IMSLP / Petrucci Music Library work page.",
        "href": "https://imslp.org/wiki/Sinfonia_Antartica_(Symphony_No.7)_(Vaughan_Williams,_Ralph)"
      },
      {
        "category": "artistic",
        "title": "The Sea of Ice (Das Eismeer) by Caspar David Friedrich — VISUAL ARTWORK",
        "excerpt": "Jagged slabs of pack ice heave upward in a shattered pyramid, and beneath them the crushed stern of a ship is almost lost, swallowed by the frozen wreckage. Friedrich's polar vision is a monument to human ambition overwhelmed and preserved by the cold, the vessel entombed like a specimen waiting to be found. It captures the icy indifference of the far south, where a titanosaur's tail bone waited eighty-two million years to be recognized.",
        "source": "Caspar David Friedrich, Das Eismeer (The Sea of Ice / The Wreck of Hope), oil on canvas, 1823–1824, Hamburger Kunsthalle. Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Caspar_David_Friedrich_-_Das_Eismeer_-_Hamburger_Kunsthalle_-_02.jpg",
        "image": {
          "src": "/covers/antarctica-dinosaur-fossil-drawer--art.png",
          "alt": "A ship crushed and half-buried beneath jagged upthrust slabs of polar pack ice under a pale sky.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 16
  },
  {
    "slug": "texas-bible-required-reading",
    "headline": "Texas board approves Bible stories as required reading for more than 5 million public school students",
    "overview": "The Texas State Board of Education approved a reading list that makes Bible stories required reading for more than five million public-school students. The roughly 200 mandated texts, which take effect in 2030, place Texas at the forefront of a conservative push to bring Christian teachings into American classrooms and drew objections over church-state separation.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMimAFBVV95cUxNYk5leVVPRGxXaDlvbTlOY1NmWmlIRjlzVDJteXMxNWgwWHNsSXk3b2pld0tKeGJXSzhEU01qWW1qN21INzA0VmpEbjhISWVDejljUVNXUU5WeVIzTFdNYlBBbnpEZ1VCZDdxa0o3WXBPbGt2UXRNU1djSGJhUmg5WlhyX1l0THowdlc5VG1EbktVdlo0a2ZQRQ?oc=5"
      },
      {
        "name": "PBS NewsHour",
        "href": "https://www.pbs.org/newshour/education/texas-education-board-approves-bible-stories-as-required-reading-in-public-schools"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-01",
    "image": {
      "src": "/covers/texas-bible-required-reading.png",
      "alt": "An open Bible resting in a school classroom.",
      "credit": "PBS NewsHour"
    },
    "edition": "Morning Edition · 1 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Old Deluder Satan Act of 1647",
        "excerpt": "It being one chief project of that old deluder, Satan, to keep men from the knowledge of the Scriptures, as in former times by keeping them in an unknown tongue, so in these latter times by persuading from the use of tongues, that so that at least the true sense and meaning of the original might be clouded and corrupted with false glosses of saint-seeming deceivers...",
        "source": "Massachusetts Bay Colony, \"The Old Deluder Satan Act\" (1647), Records of the Governor and Company of the Massachusetts Bay in New England.",
        "href": "https://constitution.org/1-History/primarysources/deluder.html"
      },
      {
        "category": "historical",
        "title": "Julian's Rescript on Christian Teachers (362 AD)",
        "excerpt": "All who profess to teach anything whatever ought to be men of upright character, and ought not to harbour in their souls opinions irreconcilable with what they publicly profess... if they think that those writers were in error with respect to the most honoured gods, then let them betake themselves to the churches of the Galilaeans to expound Matthew and Luke.",
        "source": "The Emperor Julian, Letter 36, \"Rescript on Christian Teachers,\" in The Works of the Emperor Julian, trans. Wilmer Cave Wright.",
        "href": "https://en.wikisource.org/wiki/The_Works_of_the_Emperor_Julian/Letters/Letter_36"
      },
      {
        "category": "literary",
        "title": "Plato, Republic, Book II — the censorship of tales for the young",
        "excerpt": "And shall we just carelessly allow children to hear any casual tales which may be devised by casual persons, and to receive into their minds ideas for the most part the very opposite of those which we should wish them to have when they are grown up?",
        "source": "Plato, The Republic, Book II (377b), trans. Benjamin Jowett.",
        "href": "https://en.wikisource.org/wiki/The_Republic_of_Plato/Book_2"
      },
      {
        "category": "literary",
        "title": "Charlotte Brontë, Jane Eyre — Mr. Brocklehurst and the Psalms",
        "excerpt": "\"And the Psalms? I hope you like them?\" \"No, sir.\" \"That proves you have a wicked heart; and you must pray to God to change it: to give you a new and clean one: to take away your heart of stone and give you a heart of flesh.\"",
        "source": "Charlotte Brontë, Jane Eyre (1847), Chapter IV.",
        "href": "https://victorianweb.org/authors/bronte/cbronte/janeeyre/4.html"
      },
      {
        "category": "artistic",
        "title": "Bach, Clavier-Übung III (the \"German Organ Mass\") — MUSIC",
        "excerpt": "In this monumental 1739 collection for organ, Bach set the core hymns of Luther's Catechism as a cycle of chorale preludes, framing the whole with a great prelude and fugue. Doctrine becomes counterpoint: the articles of faith a child was made to memorize are woven into music of staggering intricacy. It is scripture drilled into the mind and then transfigured into sound.",
        "source": "Johann Sebastian Bach, Clavier-Übung III (Dritter Teil der Klavierübung), BWV 552, 669–689, 802–805 (Leipzig, 1739).",
        "href": "https://imslp.org/wiki/Clavier-%C3%9Cbung_III_(Bach,_Johann_Sebastian)"
      },
      {
        "category": "artistic",
        "title": "Jan Steen, A School for Boys and Girls — VISUAL ARTWORK",
        "excerpt": "Jan Steen's crowded classroom, painted around 1670, teems with children who squabble, doze, and ignore their exasperated master and mistress. The scene wryly stages the gap between the lofty ideal of instruction and the chaos of actual young minds. Loosely echoing Raphael's School of Athens, it turns the schoolroom into both a temple of learning and a comic riot.",
        "source": "Jan Steen, A School for Boys and Girls, oil on canvas, about 1670, Scottish National Gallery, Edinburgh (NG 2421).",
        "href": "https://commons.wikimedia.org/wiki/File:Jan_Steen_-_A_School_for_Boys_and_Girls_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/texas-bible-required-reading--art.png",
          "alt": "A crowded seventeenth-century Dutch schoolroom full of unruly children with a schoolmaster and schoolmistress.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 17
  },
  {
    "slug": "getty-shutterstock-merger-scrapped",
    "headline": "Getty Images scraps its $3.7 billion merger with Shutterstock after UK regulator's conditions",
    "overview": "Getty Images called off its $3.7 billion merger with Shutterstock after Britain's competition regulator demanded the sale of Shutterstock's editorial business as a condition of approval. The two stock-image companies had announced the tie-up in 2025 to build a larger rival amid growing competition from AI image generators.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMimwFBVV95cUxOZ2lWLWdzNkRYX2FwdGd3LVhWRkQwSnFsckpuRkV5OTV2YVFUMzRjNVBsdjB5ZVM0c1dQbWNVWm0zUTJBdGRWeHlwUEd3M1BKQzljZGlZNWFydUY4aDA3NGlpY0ttSE9vb2xRSk5Wb1hOX2hGTmlkdFYyc1RPUXByTGJGM2JxamhoMVgtYWIzblNtNE80aTl0a2tqUQ?oc=5"
      },
      {
        "name": "U.S. News & World Report",
        "href": "https://money.usnews.com/investing/news/articles/2026-06-30/getty-images-scraps-shutterstock-merger"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-01",
    "image": {
      "src": "/covers/getty-shutterstock-merger-scrapped.png",
      "alt": "The Getty Images and Shutterstock corporate branding.",
      "credit": "Global Banking & Finance Review"
    },
    "edition": "Morning Edition · 1 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Northern Securities railroad trust dissolved (1904)",
        "excerpt": "No scheme or device could more certainly come within the words of the act,—'combination in the form of a trust or otherwise . . . in restraint of commerce among the several states or with foreign nations,'—or could more effectively and certainly suppress free competition between the constituent companies.",
        "source": "Justice John Marshall Harlan, majority opinion, Northern Securities Co. v. United States, 193 U.S. 197 (1904).",
        "href": "https://www.law.cornell.edu/supremecourt/text/193/197"
      },
      {
        "category": "historical",
        "title": "The Supreme Court breaks up Standard Oil (1911)",
        "excerpt": "The duty to enforce the statute requires the application of broader and more controlling remedies.",
        "source": "Chief Justice Edward D. White, opinion of the Court, Standard Oil Co. of New Jersey v. United States, 221 U.S. 1 (1911).",
        "href": "https://www.law.cornell.edu/supremecourt/text/221/1"
      },
      {
        "category": "literary",
        "title": "Miss Havisham jilted at the hour of her wedding in Great Expectations",
        "excerpt": "The day came, but not the bridegroom. He wrote a letter—— … When she recovered from a bad illness that she had, she laid the whole place waste, as you have seen it, and she has never since looked upon the light of day.",
        "source": "Charles Dickens, Great Expectations (London: Chapman & Hall, 1890 edition), Chapter XXII (Herbert Pocket recounting the jilting to Pip).",
        "href": "https://en.wikisource.org/wiki/Great_Expectations_(1890)/Chapter_XXII"
      },
      {
        "category": "literary",
        "title": "The colossal wreck of Ozymandias",
        "excerpt": "And on the pedestal these words appear: \"My name is Ozymandias, king of kings: Look on my works, ye Mighty, and despair!\" Nothing beside remains. Round the decay Of that colossal wreck, boundless and bare The lone and level sands stretch far away.",
        "source": "Percy Bysshe Shelley, \"Ozymandias\" (1818).",
        "href": "https://en.wikisource.org/wiki/The_Hundred_Best_Poems_(lyrical)_in_the_English_language_-_second_series/Ozymandias"
      },
      {
        "category": "artistic",
        "title": "Wagner, Götterdämmerung (Twilight of the Gods) — MUSIC",
        "excerpt": "The final music drama of Wagner's Ring cycle stages the collapse of an entire world order, ending as Valhalla and its gods are consumed by fire. A grand design built on a stolen hoard of gold cannot hold, and the towering ambition of would-be masters is dissolved into ruin. The score's closing conflagration is one of music's most overwhelming depictions of a mighty union coming undone.",
        "source": "Richard Wagner, Götterdämmerung, WWV 86D (composed 1848–74), the fourth part of Der Ring des Nibelungen. Work page at IMSLP / Petrucci Music Library.",
        "href": "https://imslp.org/wiki/G%C3%B6tterd%C3%A4mmerung,_WWV_86D_(Wagner,_Richard)"
      },
      {
        "category": "artistic",
        "title": "Pieter Bruegel the Elder, The Tower of Babel — VISUAL ARTWORK",
        "excerpt": "Bruegel's vast unfinished tower spirals up toward the clouds, its upper stages already crumbling even as builders toil below. It is the archetypal image of an over-reaching collective project halted before completion, a would-be monument to unity that scrutiny and disorder bring to nothing. The grand ambition to build something that reaches heaven ends, instead, in a magnificent ruin.",
        "source": "Pieter Bruegel the Elder, The Tower of Babel, 1563, oil on panel, Kunsthistorisches Museum, Vienna. Image via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_the_Elder_-_The_Tower_of_Babel_(Vienna)_-_Google_Art_Project_-_edited.jpg",
        "image": {
          "src": "/covers/getty-shutterstock-merger-scrapped--art.png",
          "alt": "Pieter Bruegel the Elder's painting of the unfinished Tower of Babel, a huge spiraling tower rising over a landscape and harbor.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 18
  },
  {
    "slug": "saab-gripen-ukraine-deal",
    "headline": "Saab signs a $2.54 billion deal to sell 16 Gripen fighter jets to Ukraine",
    "overview": "Sweden's Saab signed a contract to sell 16 Gripen E fighter jets to Ukraine in a deal worth about 24.6 billion Swedish crowns, or $2.54 billion. President Volodymyr Zelensky said deliveries would begin in 2027, though Saab put the timeline at 2029 to 2030.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMivwFBVV95cUxPVXJlbHk5dlJaTjNCbzVhX3RDS1R2SFh0ajQ4UVJDRkJXa3ZTTm1HVWFBNzE5OXhPY2RwV3VZRHJweXA3aF85TjktQzlhZGh3NFZyc0pEM1NxSTlHQzZYZUdTMkUyZzZ1TjBwaU5QTWo4SmNPZzBUT09pU1FuZ2djZ1VtcF9rN2c1d3F1NFVrRXRhWklwb2NMU3dyclg4NmMxOUdvcW55OWJtUVJhWVBPaW5HZTY5TGF0cTNnZG9BSQ?oc=5"
      },
      {
        "name": "AP",
        "href": "https://www.aol.com/articles/saab-signs-2-54-billion-193146000.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-01",
    "image": {
      "src": "/covers/saab-gripen-ukraine-deal.png",
      "alt": "A Saab Gripen fighter jet in flight.",
      "credit": "Global Banking & Finance Review"
    },
    "edition": "Morning Edition · 1 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Lend-Lease Act of 1941",
        "excerpt": "To sell, transfer title to, exchange, lease, lend, or otherwise dispose of, to any such government any defense article.",
        "source": "An Act to Promote the Defense of the United States (Lend-Lease Act), Public Law 77-11, Section 3(a)(2), March 11, 1941. U.S. National Archives.",
        "href": "https://www.archives.gov/milestone-documents/lend-lease-act"
      },
      {
        "category": "historical",
        "title": "The Treaty of Alliance with France, 1778",
        "excerpt": "his Majesty and the said united States, shall make it a common cause, and aid each other mutually with their good Offices, their Counsels, and their forces... The essential and direct End of the present defensive alliance is to maintain effectually the liberty, Sovereignty, and independance absolute and unlimited of the said united States.",
        "source": "Treaty of Alliance between the United States and France, Articles 1 and 2, February 6, 1778. U.S. National Archives.",
        "href": "https://www.archives.gov/milestone-documents/treaty-of-alliance-with-france"
      },
      {
        "category": "literary",
        "title": "The Shield of Achilles, Homer's Iliad, Book 18",
        "excerpt": "First fashioned he a shield, great and sturdy, adorning it cunningly in every part... But when the glorious god of the two strong arms had fashioned all the armour, he took and laid it before the mother of Achilles. And like a falcon she sprang down from snowy Olympus, bearing the flashing armour from Hephaestus.",
        "source": "Homer, The Iliad, Book 18, trans. A. T. Murray. Perseus Digital Library, Tufts University.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0134:book=18"
      },
      {
        "category": "literary",
        "title": "The Arms of Aeneas, Virgil's Aeneid, Book 8",
        "excerpt": "Behold the promised gift, by craft and power of my Olympian spouse made perfect, that my son need never fear Laurentum's haughty host, nor to provoke fierce Turnus to the fray. Cythera's Queen so saying, embraced her son, and hung the arms, all glittering, on an oak that stood thereby.",
        "source": "Virgil, The Aeneid, Book 8, trans. Theodore C. Williams. Perseus Digital Library, Tufts University.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0054:book=8"
      },
      {
        "category": "artistic",
        "title": "Finlandia, Op. 26 by Jean Sibelius — MUSIC",
        "excerpt": "Composed in 1899 as a covert protest against Russian imperial censorship, Sibelius's tone poem became an anthem of a small nation's will to defend itself. Turbulent, martial music surges toward the serene, hymn-like theme that Finns embraced as the sound of their freedom. To evade censors, it was performed under disguised titles, yet its message of resistance was unmistakable.",
        "source": "Jean Sibelius, Finlandia, Op. 26 (1899, rev. 1900). International Music Score Library Project (IMSLP).",
        "href": "https://imslp.org/wiki/Finlandia,_Op.26_(Sibelius,_Jean)"
      },
      {
        "category": "artistic",
        "title": "Liberty Leading the People by Eugène Delacroix — VISUAL ARTWORK",
        "excerpt": "Delacroix's 1830 masterpiece shows an allegorical Liberty striding over a barricade, tricolour raised and musket in hand, leading armed citizens of every class into the fight. It is a defining image of a people taking up weapons to defend their freedom against a stronger power. The blend of raw violence and soaring ideal has made it one of the most enduring symbols of a nation in arms.",
        "source": "Eugène Delacroix, La Liberté guidant le peuple (Liberty Leading the People), 1830, oil on canvas, Musée du Louvre, Paris. Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Eug%C3%A8ne_Delacroix_-_Le_28_Juillet._La_Libert%C3%A9_guidant_le_peuple.jpg",
        "image": {
          "src": "/covers/saab-gripen-ukraine-deal--art.png",
          "alt": "An allegorical figure of Liberty holding a tricolour flag and a musket leads armed citizens over a barricade during a revolution.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 19
  },
  {
    "slug": "swiss-museums-benin-bronzes",
    "headline": "Three Swiss museums return 18 looted Benin Bronzes to Nigeria",
    "overview": "Three Swiss museums returned 18 looted Benin Bronzes to Nigeria, part of a wider agreement to hand back 28 objects. The artefacts, received in Lagos, were taken from the royal palace of the Kingdom of Benin during the 1897 British invasion and had been held in Zurich and Geneva collections for more than a century.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Artforum",
        "href": "https://www.artforum.com/news/swiss-museums-return-eighteen-benin-bronzes-to-nigeria-1234753783/"
      },
      {
        "name": "SWI swissinfo.ch",
        "href": "https://www.swissinfo.ch/eng/various/swiss-museums-return-important-benin-bronzes-to-nigeria/91671565"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-01",
    "image": {
      "src": "/covers/swiss-museums-benin-bronzes.png",
      "alt": "One of the Benin Bronzes returned to Nigeria.",
      "credit": "SWI swissinfo.ch"
    },
    "edition": "Morning Edition · 1 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Benin Massacre — an eyewitness of the 1897 Punitive Expedition",
        "excerpt": "\"On the altars were several rudely carved maces for killing the unfortunate victims\" and there stood \"carved ivory tusks, standing upright, on hideous bronze heads.\" Captain Alan Boisragon, one of only two British survivors of the ambushed Phillips mission, set down this account within months of the reprisal that stripped the Oba's palace of the very bronzes and ivories now being sent home to Nigeria.",
        "source": "Alan Maxwell Boisragon, The Benin Massacre (London: Methuen & Co., 1897), p. 185.",
        "href": "https://archive.org/details/beninmassacre00bois"
      },
      {
        "category": "historical",
        "title": "Byron's curse on Lord Elgin, who stripped the Parthenon",
        "excerpt": "\"Thy country sends a spoiler worse than both. / Survey this vacant, violated fane; / Recount the relics torn that yet remain.\" Writing in 1811, Byron branded Elgin's removal of the Parthenon marbles a sacrilege on a par with the sack of Rome, declaring that \"the insulted wall sustains his hated name\" — the earliest and fiercest voice in a restitution debate that still burns two centuries on.",
        "source": "Lord Byron, \"The Curse of Minerva\" (1811), in The Works of Lord Byron, ed. E. H. Coleridge, vol. 1.",
        "href": "https://en.wikisource.org/wiki/The_Works_of_Lord_Byron_(ed._Coleridge,_Prothero)/Poetry/Volume_1/The_Curse_of_Minerva"
      },
      {
        "category": "literary",
        "title": "The sack of Troy in Virgil's Aeneid",
        "excerpt": "\"The palace of Deiphobus ascends / In smoky flames, and catches on his friends. / Ucalegon burns next: the seas are bright / With splendor not their own, and shine with Trojan light.\" Aeneas recalls the night a great city was broken open and its palaces plundered and put to the torch — the archetypal image of a royal seat despoiled by an invading army.",
        "source": "Virgil, Aeneid, Book II, trans. John Dryden (1697), lines ~310-315.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0052:book=2:card=298"
      },
      {
        "category": "literary",
        "title": "Belshazzar's feast — the looted temple vessels and the reckoning",
        "excerpt": "\"Belshazzar, whiles he tasted the wine, commanded to bring the golden and silver vessels which his father Nebuchadnezzar had taken out of the temple which was in Jerusalem; that the king, and his princes, his wives, and his concubines, might drink therein. Then they brought the golden vessels that were taken out of the temple of the house of God which was at Jerusalem; and the king, and his princes, his wives, and his concubines, drank in them. They drank wine, and praised the gods of gold, and of silver, of brass, of iron, of wood, and of stone.\"",
        "source": "The Bible, Book of Daniel 5:2-4 (King James Version, 1611).",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Daniel"
      },
      {
        "category": "artistic",
        "title": "Verdi's Triumphal March from Aida — MUSIC",
        "excerpt": "In the Act II Grand March of Verdi's Aida, a victorious Egyptian army parades through Thebes displaying the plunder and captives seized from conquered Ethiopia. The blazing trumpets and processional pomp stage the exact spectacle at the heart of this story: an empire glorying in the spoils it has carried home from a defeated kingdom. First performed in Cairo in 1871, it remains the most famous musical pageant of imperial conquest and its human cost.",
        "source": "Giuseppe Verdi, Aida (opera, 1871), \"Marcia trionfale\" (Act II). IMSLP work page.",
        "href": "https://imslp.org/wiki/Aida_(Verdi,_Giuseppe)"
      },
      {
        "category": "artistic",
        "title": "A cast brass plaque from the Oba's palace, Benin City — VISUAL ARTWORK",
        "excerpt": "This intricately cast brass plaque is one of the celebrated Benin Bronzes, made to adorn the pillars of the royal palace in Benin City and depicting court figures in high relief. Its virtuoso metalwork gives a face to what was taken in 1897 and to what is now, plaque by plaque, being returned. The example pictured was carried off during the Punitive Expedition and long held in the British Museum.",
        "source": "Cast brass plaque from Benin City, Kingdom of Benin (16th-17th c.). Photograph by Michel wal, 2009, CC BY-SA 3.0, via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Benin_brass_plaque_01.jpg",
        "image": {
          "src": "/covers/swiss-museums-benin-bronzes--art.png",
          "alt": "A cast brass plaque from Benin City showing court figures in relief, one of the Benin Bronzes.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 20
  },
  {
    "slug": "greece-wildfire-deadly",
    "headline": "One dead as firefighters battle a wildfire near Thessaloniki in northern Greece",
    "overview": "Firefighters backed by aircraft and helicopters struggled to contain a wildfire near Thessaloniki in northern Greece, where a body was found in the burned area and a village was evacuated. The blaze is one of several fanned by extreme summer heat across the region.",
    "genre": "Climate",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c0qy3nkex0qo"
      },
      {
        "name": "GreekReporter",
        "href": "https://greekreporter.com/2026/06/30/thessaloniki-wildfire-deadly-body-found/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-01",
    "image": {
      "src": "/covers/greece-wildfire-deadly.png",
      "alt": "Aircraft and firefighters tackling a wildfire in Greece.",
      "credit": "BBC"
    },
    "edition": "Morning Edition · 1 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Forest Fire on the Mountain",
        "excerpt": "As when some great forest fire is raging upon a mountain top and its light is seen afar, even so as they marched the gleam of their armor flashed up into the firmament of heaven.",
        "source": "Homer, The Iliad, Book 2 (lines 455-458), trans. Samuel Butler (1898). Perseus Digital Library.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0217%3Abook%3D2%3Acard%3D455"
      },
      {
        "category": "historical",
        "title": "The Great Fire of Rome",
        "excerpt": "It had its beginning in that part of the circus which adjoins the Palatine and Caelian hills, where, amid the shops containing inflammable wares, the conflagration both broke out and instantly became so fierce and so rapid from the wind that it seized in its grasp the entire length of the circus.",
        "source": "Tacitus, The Annals, Book 15.38, trans. Alfred John Church and William Jackson Brodribb. Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_Annals_(Tacitus)/Book_15"
      },
      {
        "category": "literary",
        "title": "The Burning of Troy",
        "excerpt": "The Palace of Deiphobus ascends In smoaky Flames, and catches on his Friends. Ucalegon burns next; the Seas are bright With splendor, not their own; and thine with Trojan light.",
        "source": "Virgil, The Aeneid, Book II, trans. John Dryden (1697). Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_Works_of_Virgil_(Dryden)/Aeneid/Book_II"
      },
      {
        "category": "literary",
        "title": "The Chariot of the Sun Sets the World Ablaze",
        "excerpt": "The grass is blighted; trees are burnt up with their leaves; the ripe brown crops give fuel for self destruction—Oh what small complaints! Great cities perish with their walls, and peopled nations are consumed to dust—",
        "source": "Ovid, Metamorphoses, Book 2 (Phaethon), trans. Brookes More (1922). Perseus Digital Library.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.02.0028%3Abook%3D2%3Acard%3D227"
      },
      {
        "category": "artistic",
        "title": "Joseph Haydn, The Seasons (Summer) — MUSIC",
        "excerpt": "In the Summer part of Haydn's late oratorio, the music paints a landscape prostrated by drought and merciless heat before a shattering thunderstorm breaks over the fields. Shimmering strings evoke the scorching midday sun and nature succumbing to its pressure, and the chorus erupts in the terror of the tempest. It is the elements turned against the land, rendered as pure orchestral drama.",
        "source": "Joseph Haydn, Die Jahreszeiten (The Seasons), Hob.XXI:3 (1801), Part 2 \"Der Sommer\". IMSLP work page.",
        "href": "https://imslp.org/wiki/Die_Jahreszeiten,_Hob.XXI:3_(Haydn,_Joseph)"
      },
      {
        "category": "artistic",
        "title": "Hubert Robert, The Fire of Rome — VISUAL ARTWORK",
        "excerpt": "Hubert Robert imagines the great conflagration of 64 AD as a wall of flame swallowing the classical city, its columns and monuments silhouetted against a furnace-red sky. Panicked figures scatter in the foreground as smoke boils upward and the architecture itself seems to dissolve into fire. Painted in 1785, it is a sublime vision of humankind dwarfed and undone by the burning of a city.",
        "source": "Hubert Robert (1733-1808), L'incendie de Rome (The Fire of Rome, 18 July 64 AD), 1785, oil on canvas, Musée des Beaux-Arts André Malraux, Le Havre. Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Robert,_Hubert_-_Incendie_%C3%A0_Rome_-.jpg",
        "image": {
          "src": "/covers/greece-wildfire-deadly--art.png",
          "alt": "A painting of the ancient city of Rome engulfed in flames, with panicked figures fleeing as buildings burn against a red sky.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 21
  },
  {
    "slug": "scotus-cellphone-location-privacy",
    "headline": "US Supreme Court rules cellphone location data is protected by the Fourth Amendment",
    "overview": "The US Supreme Court ruled 6-3 that police accessing a person's cellphone location history is a search under the Fourth Amendment, even when the data is held by a third-party company such as Google. Writing for the majority, Justice Elena Kagan said people have a reasonable expectation of privacy in records of where their phones have been, sharply limiting the use of 'geofence' warrants.",
    "genre": "Technology",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMiqgFBVV95cUxPdnVnWktZSmNZWlJ4YU9XVXd4WEJIbXlvR3JXTm05dllGTVU0TXgzYXNBLW9JSTRtSnQ1WTJIVkE1czluWVpZQUVqR1JLSDVmTGZrLU9VV19XTURTdEI3TnlDTW43MUNOUXl3OHB3dnViV2l2cHdMbzZWLTBvS1hrajUwWFVPZ3BJdXdJMWVVUmRyVWJyVWtyeU9HZWtiWTE3THJQLVhhNC13Zw?oc=5"
      },
      {
        "name": "ABC News",
        "href": "https://abcnews.com/Politics/supreme-court-limits-geofence-warrants-amid-cellphone-data/story?id=134314228"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-01",
    "image": {
      "src": "/covers/scotus-cellphone-location-privacy.png",
      "alt": "The United States Supreme Court building in Washington, D.C.",
      "credit": "ABC News"
    },
    "edition": "Morning Edition · 1 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Fourth Amendment to the United States Constitution (1791)",
        "excerpt": "The right of the people to be secure in their persons, houses, papers, and effects, against unreasonable searches and seizures, shall not be violated, and no Warrants shall issue, but upon probable cause, supported by Oath or affirmation, and particularly describing the place to be searched, and the persons or things to be seized.",
        "source": "Bill of Rights, Amendment IV (ratified 1791). Transcription, U.S. National Archives, \"The Bill of Rights: A Transcription.\"",
        "href": "https://www.archives.gov/founding-docs/bill-of-rights-transcript"
      },
      {
        "category": "historical",
        "title": "Jeremy Bentham, Panopticon; or, The Inspection-House (1787)",
        "excerpt": "the more constantly the persons to be inspected are under the eyes of the persons who should inspect them, the more perfectly will the purpose of the establishment have been attained... the next thing to be wished for is, that... he should conceive himself to be so.",
        "source": "Jeremy Bentham, Panopticon; or, The Inspection-House (written 1787), Letter I. Text via Wikisource.",
        "href": "https://en.wikisource.org/wiki/Panopticon_or_the_Inspection-House"
      },
      {
        "category": "literary",
        "title": "George Orwell, Nineteen Eighty-Four (1949)",
        "excerpt": "Orwell's citizens live under the telescreen, a two-way device that watches and listens as it broadcasts, so that no gesture or movement is ever certainly private. Winston Smith learns to assume that any sound or motion may be scrutinized and any record of his whereabouts kept. The novel gave the modern world its enduring image of total surveillance: a watchful authority that need not always be looking, so long as you can never know that it is not.",
        "source": "George Orwell, Nineteen Eighty-Four (Secker & Warburg, 1949). Described here (in copyright); see reference: Wikipedia, \"Telescreen.\"",
        "href": "https://en.wikipedia.org/wiki/Telescreen"
      },
      {
        "category": "literary",
        "title": "Edgar Allan Poe, \"The Tell-Tale Heart\" (1843)",
        "excerpt": "I think it was his eye! yes, it was this! He had the eye of a vulture—a pale blue eye, with a film over it. Whenever it fell upon me, my blood ran cold; and so by degrees—very gradually—I made up my mind to take the life of the old man, and thus rid myself of the eye for ever.",
        "source": "Edgar Allan Poe, \"The Tell-Tale Heart\" (1843), in Poe's Tales of Mystery and Imagination. Text via Wikisource.",
        "href": "https://en.wikisource.org/wiki/Poe's_Tales_of_Mystery_and_Imagination/The_Tell-Tale_Heart"
      },
      {
        "category": "artistic",
        "title": "Ludwig van Beethoven, Symphony No. 5 in C minor, Op. 67 (1808) — MUSIC",
        "excerpt": "Beethoven's Fifth opens with four hammered notes that his biographer described as fate knocking at the door, an inescapable presence that returns again and again across the work. The motif stalks the listener, refusing to be left behind, a relentless force that pursues and will not release its grip. It is music of being followed and marked, then finally struggling toward the light against a power that never stops watching.",
        "source": "Ludwig van Beethoven, Symphony No. 5 in C minor, Op. 67 (composed 1804-1808). Scores at the International Music Score Library Project (IMSLP).",
        "href": "https://imslp.org/wiki/Symphony_No.5,_Op.67_(Beethoven,_Ludwig_van)"
      },
      {
        "category": "artistic",
        "title": "Jacopo Pontormo, Supper at Emmaus (1525) — VISUAL ARTWORK",
        "excerpt": "Pontormo's altarpiece shows Christ revealed to his disciples at a supper table, and hovering above the scene is a single all-seeing Eye of Providence set within a radiant triangle. The disembodied eye gazes down upon every figure, a watchful authority that sees into the private gathering below. Painted for a Florentine monastery, it renders the ancient conviction that no act, however hidden, escapes an ever-present observer.",
        "source": "Jacopo Pontormo, Supper at Emmaus (Cena in Emmaus), 1525, oil on canvas, Uffizi Gallery, Florence. Via Wikimedia Commons (Google Art Project).",
        "href": "https://commons.wikimedia.org/wiki/File:Pontormo_-_Cena_in_Emmaus_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/scotus-cellphone-location-privacy--art.png",
          "alt": "A Renaissance painting of Christ at a supper table with disciples, watched from above by an all-seeing eye inside a glowing triangle.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 22
  },
  {
    "slug": "nike-china-turnaround",
    "headline": "Nike beats forecasts but warns its turnaround will run into 2027 as China sales fall 12%",
    "overview": "Nike beat Wall Street forecasts for its fourth quarter but warned that its turnaround would stretch into fiscal 2027 as sales in Greater China fell about 12%. Chief executive Elliott Hill said the recovery was taking longer than expected even as the company insisted its direction was clear.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMioAFBVV95cUxOWnNzWkdGLVk5dVdwM0ZUQ3RObWpYSkdGNnhsc1JuMFhWeXBtT1pSS3luR3UxcVNEcTVTM0tCdFRTSHlYQVNZTGFkQXIzeldDUV91djhzbFN1dWZyOWVKOHVrbGFpcy1rRkYxd3dTTzNKMjdTcFN6OFVSVk5iX3ZhU2tULVpzR1RfdVpEcXFkUFZ4ZlFYT01EY1VvNlR3dDBG?oc=5"
      },
      {
        "name": "CNBC",
        "href": "https://www.cnbc.com/2026/06/30/nike-nke-q4-2026-earnings.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-01",
    "image": {
      "src": "/covers/nike-china-turnaround.png",
      "alt": "A Nike retail store frontage.",
      "credit": "CNBC"
    },
    "edition": "Morning Edition · 1 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Croesus on the Pyre: the Richest King Brought Low",
        "excerpt": "Croesus was already on the pile, when it entered his mind in the depth of his woe that there was a divine warning in the words which had come to him from the lips of Solon, \"No one while he lives is happy.\" When this thought smote him he fetched a long breath, and breaking his deep silence, groaned out aloud, thrice uttering the name of Solon.",
        "source": "Herodotus, The Histories, Book 1 (Clio), section 1.86, trans. George Rawlinson.",
        "href": "https://www.parstimes.com/history/herodotus/persian_wars/clio.html"
      },
      {
        "category": "historical",
        "title": "Napoleon's Retreat from Moscow, 1812",
        "excerpt": "The seemingly invincible emperor entered Moscow in triumph, only to find a burned and emptied city that offered no victory to hold. The long march home through snow and hunger destroyed the Grande Armee, turning the greatest conqueror of the age into a fugitive. The disaster shattered the myth of his invincibility and began the unraveling of his empire, a recovery he would never complete.",
        "source": "\"Napoleonic Wars: The retreat from Moscow,\" Encyclopaedia Britannica.",
        "href": "https://www.britannica.com/event/Napoleonic-Wars/The-retreat-from-Moscow"
      },
      {
        "category": "literary",
        "title": "Milton, Samson Agonistes: \"Eyeless in Gaza\"",
        "excerpt": "Ask for this great Deliverer now, and find him / Eyeless in Gaza at the Mill with slaves, / Himself in bonds under Philistian yoke;",
        "source": "John Milton, Samson Agonistes (1671), lines 40-42. The John Milton Reading Room, Dartmouth College.",
        "href": "https://milton.host.dartmouth.edu/reading_room/samson/drama/text.shtml"
      },
      {
        "category": "literary",
        "title": "Boethius, The Consolation of Philosophy: the Wheel of Fortune",
        "excerpt": "What! art thou verily striving to stay the swing of the revolving wheel? Oh, stupidest of mortals, if it takes to standing still, it ceases to be the wheel of Fortune.",
        "source": "Boethius, The Consolation of Philosophy, Book II (\"Fortune's Malice\"), trans. H. R. James (1897). Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_Consolation_of_Philosophy_(James)/Fortune%27s_Malice"
      },
      {
        "category": "artistic",
        "title": "Handel, Judas Maccabaeus: \"See, the Conqu'ring Hero Comes\" — MUSIC",
        "excerpt": "Handel's oratorio culminates in a chorus of pure, hard-won triumph, greeting the returning champion with a procession that has become the anthem of victory itself. Written to celebrate a hero's homecoming after a long and costly campaign, the music captures the moment when struggle finally gives way to acclaim. Its stately, marching jubilation makes it the definitive musical portrait of triumph earned rather than assumed.",
        "source": "George Frideric Handel, Judas Maccabaeus, HWV 63 (1746), Act III, No. 35, \"See, the conqu'ring hero comes.\" IMSLP.",
        "href": "https://imslp.org/wiki/Judas_Maccabaeus,_HWV_63_(Handel,_George_Frideric)"
      },
      {
        "category": "artistic",
        "title": "The Winged Victory of Samothrace — VISUAL ARTWORK",
        "excerpt": "The goddess Nike alights on the prow of a ship, wings still beating and drapery pressed against her by the sea wind, caught in the instant of announcing victory. Carved around 190 BC, she is headless and armless yet radiates unstoppable forward motion and triumphant power. She stands as the ancient world's supreme image of victory in mid-flight, the very goddess whose name the modern brand bears.",
        "source": "Winged Victory of Samothrace (Nike of Samothrace), Hellenistic marble, c. 190 BC, Musee du Louvre, Paris.",
        "href": "https://commons.wikimedia.org/wiki/File:Louvre_-_Winged_Victory_of_Samothrace.jpg",
        "image": {
          "src": "/covers/nike-china-turnaround--art.png",
          "alt": "The headless, winged marble statue of the goddess Nike standing on a ship's prow at the Louvre.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 23
  },
  {
    "slug": "uk-military-spending-boost",
    "headline": "UK unveils a 15 billion pound defence boost as critics say it falls short",
    "overview": "Britain unveiled a 15 billion pound ($20 billion) boost to defence spending, centred on drones, uncrewed submarines and new stealth fighter jets, as part of a plan to spend nearly 300 billion pounds over four years. Critics said the increase falls short of what a more dangerous world demands, noting it stops short of committing to 3% of GDP by 2030.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMijAFBVV95cUxPUjQtSlZLeE9Cd3ZVbmpPQnJFb0UxRnJ2MndBTkRaeHNCMlUyUjFEaWFnR1pYdlZTQTN3V21MLVh0b082WTRXeEcyWGdSb3hmNDd3XzlUREpFblU1U3RGV2pEdHJrLXhVTFVMSHE3dU5RRl90MUc5cU9kU0VWbDVzUjdTdV9vZFJxTlBDMA?oc=5"
      },
      {
        "name": "Al Jazeera",
        "href": "https://www.aljazeera.com/economy/2026/6/30/uks-starmer-announces-300-billion-pound-defence-investment-plan"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-01",
    "image": {
      "src": "/covers/uk-military-spending-boost.png",
      "alt": "British military personnel and equipment.",
      "credit": "Al Jazeera"
    },
    "edition": "Morning Edition · 1 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Demosthenes rouses Athens against Philip of Macedon (First Philippic)",
        "excerpt": "When, Athenians, will you take the necessary action? What are you waiting for? Until you are compelled, I presume. But what are we to think of what is happening now? For my own part I think that for a free people there can be no greater compulsion than shame for their position. Or tell me, are you content to run round and ask one another, 'Is there any news today?' Could there be any news more startling than that a Macedonian is triumphing over Athenians and settling the destiny of Hellas?",
        "source": "Demosthenes, First Philippic (Philippic 1), section 10, trans. J. H. Vince, Loeb Classical Library (Harvard University Press, 1930). Delivered c. 351 BC.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0070:speech=4:section=10"
      },
      {
        "category": "historical",
        "title": "Vegetius: si vis pacem, para bellum (Epitoma rei militaris)",
        "excerpt": "Igitur qui desiderat pacem, praeparet bellum; qui victoriam cupit, milites inbuat diligenter; qui secundos optat eventus, dimicet arte, non casu.",
        "source": "Publius Flavius Vegetius Renatus, Epitoma rei militaris, Book III, prologue (c. late 4th century AD). Latin text via The Latin Library. The maxim is the origin of the proverb 'si vis pacem, para bellum' ('if you want peace, prepare for war').",
        "href": "https://www.thelatinlibrary.com/vegetius3.html"
      },
      {
        "category": "literary",
        "title": "Alfred, Lord Tennyson — 'The Fleet'",
        "excerpt": "You, you, if you shall fail to understand\nWhat England is, and what her all-in-all,\nOn you will come the curse of all the land,\nShould this old England fall\nWhich Nelson left so great.",
        "source": "Alfred, Lord Tennyson, 'The Fleet' (first printed in The Times, 23 April 1885; collected in Locksley Hall Sixty Years After, Etc., 1886), stanza I.",
        "href": "http://www.telelib.com/authors/T/TennysonAlfred/verse/locksleyhall/fleet.html"
      },
      {
        "category": "literary",
        "title": "Shakespeare — the Bastard's defiance in King John",
        "excerpt": "This England never did nor never shall\nLie at the proud foot of a conqueror\nBut when it first did help to wound itself.\nNow these her princes are come home again,\nCome the three corners of the world in arms\nAnd we shall shock them. Naught shall make us rue,\nIf England to itself do rest but true.",
        "source": "William Shakespeare, The Life and Death of King John, Act 5, Scene 7 (closing speech of Philip the Bastard), c. 1596. Text: Folger Shakespeare Library.",
        "href": "https://www.folger.edu/explore/shakespeares-works/king-john/read/5/7/"
      },
      {
        "category": "artistic",
        "title": "Gustav Holst — 'Mars, the Bringer of War' from The Planets, Op. 32 — MUSIC",
        "excerpt": "Composed on the eve of the First World War (1914-16), the opening movement of Holst's The Planets is a relentless march driven by a hammering 5/4 ostinato that builds from a menacing whisper to a crushing, machine-like climax. It captures the mechanised, inhuman momentum of a nation mobilising for war and has become the archetypal musical sound of gathering conflict. Its inexorable buildup speaks to arms races and the grinding logic of preparedness that no one seems able to halt.",
        "source": "Gustav Holst, The Planets, Op. 32, movement I, 'Mars, the Bringer of War' (composed 1914-16). Work page at IMSLP (International Music Score Library Project).",
        "href": "https://imslp.org/wiki/The_Planets,_Op.32_(Holst,_Gustav)"
      },
      {
        "category": "artistic",
        "title": "Peter Paul Rubens — The Consequences of War — VISUAL ARTWORK",
        "excerpt": "Rubens' great Baroque allegory shows Mars, the god of war, breaking loose in armour with a bloodied sword, dragged onward by the Fury Alecto while Venus strains in vain to hold him back. Beneath his trampling feet lie a book and a lute, the arts and learning crushed by conflict, as a grieving figure of Europe throws up her arms in despair. Painted amid the devastation of the Thirty Years' War, it is a warning about what unleashed war costs a continent, and about the stakes when nations arm.",
        "source": "Peter Paul Rubens, The Consequences of War (Horrors of War), oil on canvas, 1637-1638, Galleria Palatina, Palazzo Pitti, Florence.",
        "href": "https://commons.wikimedia.org/wiki/File:Rubens_-_The_Consequences_of_War.jpg",
        "image": {
          "src": "/covers/uk-military-spending-boost--art.png",
          "alt": "Baroque painting of the armoured god Mars striding forward with a sword while Venus tries to restrain him and allegorical figures of war and grief surround them.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 24
  },
  {
    "slug": "france-sweden-world-cup",
    "headline": "France beat Sweden 3-0 at the World Cup as Mbappe scores twice",
    "overview": "France beat Sweden 3-0 in the World Cup last 32, with Kylian Mbappe scoring twice and Michael Olise providing two assists in front of more than 80,000 at the New York New Jersey Stadium. Mbappe's brace moved him level with Lionel Messi on six goals in the tournament as France advanced to a last-16 meeting with Paraguay.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiuwFBVV95cUxQaXduMS13MGdCamhfZUxPQVoteXZ3V1lJcFlHamZ4eUZEVUhZa1FLaERiSU9ZdXVpdTRvUmhLRmh4a1ZEVGVwNU83aWNEZnBxM21yTl90NHVTdy00bWJNb1I5ZXlYR3l0a1hVdmNmRlQzZUJiRmJ2NkJqWlZEam9OYjdlMm5KZmZVMUtlUFlkbGpMTTBneXlzZVRXMzhINmhWbnNaQzd0QV9rb29iNVdTNDVzUHI0TkVoVi1Z?oc=5"
      },
      {
        "name": "ESPN",
        "href": "https://www.espn.com/soccer/story/_/id/49227768/france-sweden-live-world-cup-2026-latest-updates-commentary-score-result"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-01",
    "image": {
      "src": "/covers/france-sweden-world-cup.png",
      "alt": "France players celebrating during their World Cup match against Sweden.",
      "credit": "Al Jazeera"
    },
    "edition": "Morning Edition · 1 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Persians marvel that Greeks contend for glory, not gold (Herodotus)",
        "excerpt": "The Arcadians answered - 'They are holding the Olympic Games, seeing the athletic sports and the chariot-races.' 'And what,' said the man, 'is the prize for which they contend?' 'An olive-wreath,' returned the others, 'which is given to the man who wins.' On hearing this, Tritantaechmes, the son of Artabanus, uttered a speech which was in truth most noble... Hearing the men say that the prize was not money but a wreath of olive, he could not forbear from exclaiming before them all: 'Good heavens! Mardonius, what manner of men are these against whom thou hast brought us to fight? - men who contend with one another, not for money, but for honour!'",
        "source": "Herodotus, The History of Herodotus, Book VIII.26, trans. George Rawlinson (1858-60), public domain.",
        "href": "https://en.wikisource.org/wiki/The_History_of_Herodotus_(Rawlinson)/Book_8"
      },
      {
        "category": "historical",
        "title": "Astylus of Croton, thrice victor in the foot-races at Olympia (Pausanias)",
        "excerpt": "The statue of Astylus of Crotona is the work of Pythagoras; this athlete won three successive victories at Olympia, in the short race and in the double race. But because on the two latter occasions he proclaimed himself a Syracusan, in order to please Hiero the son of Deinomenes, the people of Crotona for this condemned his house to be a prison, and pulled down his statue set up by the temple of Lacinian Hera.",
        "source": "Pausanias, Description of Greece, Book VI.13.1, trans. W. H. S. Jones and H. A. Ormerod (Loeb Classical Library, 1918), public domain.",
        "href": "https://en.wikisource.org/wiki/Description_of_Greece_(Jones)/Book_6"
      },
      {
        "category": "literary",
        "title": "Pindar praises the thrice-victorious house and Xenophon's Olympic garlands (Olympian 13)",
        "excerpt": "While I praise a house that has been three times victorious at Olympia, gentle to her own citizens, and hospitable to strangers, I shall recognize prosperous Corinth, the portal of Isthmian Poseidon, glorious in her young men.",
        "source": "Pindar, Olympian Ode 13 (for Xenophon of Corinth, 464 B.C.), trans. Diane Arnson Svarlien, Perseus Digital Library.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0162:book=O.:poem=13"
      },
      {
        "category": "literary",
        "title": "Odysseus hurls the discus past every mark at the Phaeacian games (Odyssey)",
        "excerpt": "He spoke, and, leaping up with his cloak about him as it was, seized a discus larger than the rest and thick, no little heavier than those with which the Phaeacians were wont to contend one with another. This with a whirl he sent from his stout hand, and the stone hummed as it flew; and down they crouched to the earth, the Phaeacians of the long oars, men famed for their ships, beneath the rush of the stone. Past the marks of all it flew, speeding lightly from his hand, and Athena, in the likeness of a man, set the mark, and she spoke and addressed him.",
        "source": "Homer, The Odyssey, Book VIII, trans. S. H. Butcher and A. Lang (1879), Perseus Digital Library, public domain.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0136:book=8:card=165"
      },
      {
        "category": "artistic",
        "title": "Handel, Alexander's Feast, or the Power of Musick, HWV 75 — MUSIC",
        "excerpt": "Handel's 1736 ode, set to Dryden's verse, stages a victory banquet for Alexander the Great in which the musician Timotheus rouses the conqueror through waves of feeling toward the exultation of triumph. Trumpets, choruses, and driving choral fugues make audible the roar of a crowd exalting its hero. It is Baroque music at its most celebratory, a monument to glory won and hailed.",
        "source": "George Frideric Handel, Alexander's Feast, or the Power of Musick, HWV 75 (1736), libretto after John Dryden. IMSLP / Petrucci Music Library.",
        "href": "https://imslp.org/wiki/Alexander's_Feast,_HWV_75_(Handel,_George_Frideric)"
      },
      {
        "category": "artistic",
        "title": "Black-figure Panathenaic amphora with runners in the foot-race, ca. 530 BC — VISUAL ARTWORK",
        "excerpt": "On this Attic black-figure prize amphora of about 530 BC, four bearded athletes are frozen at full sprint, legs scissoring and arms pumping as they surge across the field. Such vases, filled with sacred olive oil, were the trophies awarded to victors of the Panathenaic footraces in Athens. The image distills the antique thrill of the race and the champion breaking clear of the pack.",
        "source": "Attic black-figure Panathenaic prize amphora depicting runners, ca. 530 BC, Staatliche Antikensammlungen, Munich. Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Greek_vase_with_runners_at_the_panathenaic_games_530_bC.jpg",
        "image": {
          "src": "/covers/france-sweden-world-cup--art.png",
          "alt": "An ancient Greek black-figure vase showing four bearded athletes running in a foot-race.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 25
  },
  {
    "slug": "venezuela-earthquake-rescue",
    "headline": "Three-year-old pulled alive from rubble six days after Venezuela earthquake as US sends 900 personnel",
    "overview": "A three-year-old was pulled alive from the rubble and taken to hospital six days after a powerful earthquake struck Venezuela, as rescuers pressed on through aftershocks. The United States said it had deployed more than 900 personnel to help with the earthquake response.",
    "genre": "Science",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c1jykwk8n18o"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiuwFBVV95cUxPSENIWDQtZWZzZE9SenJGVU5xWE0tYS1pQUN4SGFkZ0xCYUdET29ON1pwSWppaEdMZW5yZnJKVXlBTENHTXV5RFVUV3NURURydmxIVTc1UTZ6bnpXa0dOTlVITkVmQzBaOFdwZFBfZ1hqNGR3Vlk0YUNWeHE0QTlJRVRQZUVfRGlMejl6QnNzdmg5VGdGUi1WVS1xV1Fwc3VYTjI5d0hSQzFjRHp4X21uYzR5a2JOUC1ENTI0?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-01",
    "image": {
      "src": "/covers/venezuela-earthquake-rescue.png",
      "alt": "Rescue workers searching earthquake rubble in Venezuela.",
      "credit": "BBC"
    },
    "edition": "Morning Edition · 1 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Pliny the Younger on the shaking earth at Misenum (AD 79)",
        "excerpt": "The chariots, which we had ordered to be drawn out, were so agitated backwards and forwards, though upon the most level ground, that we could not keep them steady, even by supporting them with large stones. The sea seemed to roll back upon itself, and to be driven from its banks by the convulsive motion of the earth; it is certain at least the shore was considerably enlarged, and several sea animals were left upon it.",
        "source": "Pliny the Younger, Letters, Book 6, Letter 20 (to Tacitus), trans. William Melmoth, describing the eruption of Vesuvius and earthquakes at Misenum, AD 79.",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Plin.+Ep.+6.20"
      },
      {
        "category": "historical",
        "title": "The Reverend Charles Davy inside the Lisbon earthquake (1755)",
        "excerpt": "The house I was in shook with such violence, that the upper stories immediately fell; and though my apartment (which was the first floor) did not then share the same fate, yet everything was thrown out of its place in such a manner that it was with no small difficulty I kept my feet, and expected nothing less than to be soon crushed to death, as the walls continued rocking to and fro in the frightfulest manner, opening in several places; large stones falling down on every side from the cracks, and the ends of most of the rafters starting out from the roof.",
        "source": "Rev. Charles Davy, eyewitness account of the Lisbon earthquake of 1 November 1755, from Letters Addressed to a Young Gentleman upon Subjects of Literature (London, 1787).",
        "href": "https://sourcebooks.fordham.edu/mod/1755lisbonquake.asp"
      },
      {
        "category": "literary",
        "title": "Voltaire, Candide — the earth trembles under their feet",
        "excerpt": "Scarcely had they reached the city, lamenting the death of their benefactor, when they felt the earth tremble under their feet. The sea swelled and foamed in the harbour, and beat to pieces the vessels riding at anchor. Whirlwinds of fire and ashes covered the streets and public places; houses fell, roofs were flung upon the pavements, and the pavements were scattered. Thirty thousand inhabitants of all ages and sexes were crushed under the ruins.",
        "source": "Voltaire, Candide, ou l'Optimisme (1759), Chapter V, English translation, Project Gutenberg edition.",
        "href": "https://www.gutenberg.org/files/19942/19942-h/19942-h.htm"
      },
      {
        "category": "literary",
        "title": "Psalm 40 — brought up out of the pit",
        "excerpt": "I waited patiently for the LORD; and he inclined unto me, and heard my cry. He brought me up also out of an horrible pit, out of the miry clay, and set my feet upon a rock, and established my goings. And he hath put a new song in my mouth, even praise unto our God: many shall see it, and fear, and shall trust in the LORD.",
        "source": "The Bible, King James Version (1611), Psalm 40, verses 1-3.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Psalms"
      },
      {
        "category": "artistic",
        "title": "Joseph Haydn, The Seven Last Words of Our Saviour on the Cross — 'Il terremoto' — MUSIC",
        "excerpt": "Haydn's meditation on the crucifixion, composed in 1786, closes with a movement unlike anything before it: 'Il terremoto,' The Earthquake. After seven slow, hushed sonatas, the orchestra erupts into a Presto e con tutta la forza, driven strings and stabbing chords culminating in the work's only triple-forte, an evocation of the ground itself splitting apart. It renders in sound the moment when the earth quakes and rocks are rent, disaster followed at last by awe.",
        "source": "Joseph Haydn, Die Worte des Erlösers am Kreuze (The Seven Last Words of Our Saviour on the Cross), Hob.XX:1, orchestral version, final movement 'Il terremoto' (composed 1786).",
        "href": "https://imslp.org/wiki/Die_Worte_des_Erl%C3%B6sers_am_Kreuze,_Hob.XX:1_(Haydn,_Joseph)"
      },
      {
        "category": "artistic",
        "title": "Karl Bryullov, The Last Day of Pompeii — VISUAL ARTWORK",
        "excerpt": "Bryullov's vast 1830-1833 canvas freezes a city in the instant of its destruction: columns snap and topple, statues pitch from their pedestals, and a blood-red sky of ash presses down on the fleeing crowd. Amid the terror the painter fills the foreground with acts of tenderness, sons carrying an aged father, a mother clutching her children, a fallen woman shielding her infant, showing mercy and love persisting even as the ground gives way. It made Bryullov the first Russian painter to win an international reputation.",
        "source": "Karl Bryullov, The Last Day of Pompeii, oil on canvas, 1830-1833, State Russian Museum, St. Petersburg.",
        "href": "https://commons.wikimedia.org/wiki/File:Karl_Brullov_-_The_Last_Day_of_Pompeii_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/venezuela-earthquake-rescue--art.png",
          "alt": "A crowd flees through a collapsing ancient city as statues topple and a red sky of ash and fire looms overhead.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 26
  },
  {
    "slug": "scotus-birthright-citizenship",
    "headline": "US Supreme Court upholds birthright citizenship, rejecting Trump's bid to restrict it",
    "overview": "The US Supreme Court upheld the constitutional guarantee of birthright citizenship, rejecting the Trump administration's attempt to deny automatic citizenship to children born on US soil to certain non-citizen parents. The ruling leaves the longstanding reading of the Fourteenth Amendment's Citizenship Clause intact.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMitAFBVV95cUxPeHFHR0ZCdDJuOUJjckJLaWRDcGc4a2xQb3lyM3lnZE9pbFVibF8xeHVxanl1VGF3Tnd1a29IVkpIUHNoTjR2WV9Uc1doeDQ0LWNabVV3MmZmM3luSk94MEo1RXdnSkx1cDdPTDMwNmdvWkZNNlRRX043SUpqTnA1MXdSZFpnOW1FQVVoQnZRazFPdFk5MFBOOVRXTVlrY2MzUmdtQ3JTb1Z0SEduczZxTEpqRDY?oc=5"
      },
      {
        "name": "ABC News",
        "href": "https://abcnews.com/Politics/faq-birthright-citizenship-ahead-supreme-courts-ruling/story?id=134215675"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-30",
    "image": {
      "src": "/covers/scotus-birthright-citizenship.png",
      "alt": "The United States Supreme Court building in Washington, D.C., at dusk.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 30 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "United States v. Wong Kim Ark (1898)",
        "excerpt": "A child born in the United States, of parents of Chinese descent, who, at the time of his birth, are subjects of the Emperor of China, but have a permanent domicil and residence in the United States, and are there carrying on business, and are not employed in any diplomatic or official capacity under the Emperor of China, becomes at the time of his birth a citizen of the United States, by virtue of the first clause of the Fourteenth Amendment.",
        "source": "Supreme Court of the United States, United States v. Wong Kim Ark, 169 U.S. 649 (1898), Wikisource",
        "href": "https://en.wikisource.org/wiki/United_States_v._Wong_Kim_Ark"
      },
      {
        "category": "historical",
        "title": "The Fourteenth Amendment's Citizenship Clause (1868)",
        "excerpt": "All persons born or naturalized in the United States, and subject to the jurisdiction thereof, are citizens of the United States and of the State wherein they reside.",
        "source": "14th Amendment to the U.S. Constitution (1868), Section 1, U.S. National Archives, Milestone Documents",
        "href": "https://www.archives.gov/milestone-documents/14th-amendment"
      },
      {
        "category": "literary",
        "title": "Emma Lazarus, \"The New Colossus\" (1883)",
        "excerpt": "\"Keep, ancient lands, your storied pomp!\" cries she\nWith silent lips. \"Give me your tired, your poor,\nYour huddled masses yearning to breathe free,\nThe wretched refuse of your teeming shore.\nSend these, the homeless, tempest-tost to me,\nI lift my lamp beside the golden door!\"",
        "source": "Emma Lazarus, \"The New Colossus\" (1883), Wikisource",
        "href": "https://en.wikisource.org/wiki/The_New_Colossus"
      },
      {
        "category": "literary",
        "title": "Edward Everett Hale, \"The Man Without a Country\" (1863)",
        "excerpt": "Damn the United States! I wish I may never hear of the United States again!",
        "source": "Edward Everett Hale, \"The Man Without a Country\" (1863), Project Gutenberg ebook #16493",
        "href": "https://www.gutenberg.org/cache/epub/16493/pg16493.txt"
      },
      {
        "category": "artistic",
        "title": "\"The Star-Spangled Banner\" (music by John Stafford Smith) — MUSIC",
        "excerpt": "The national anthem whose melody (originally \"The Anacreontic Song\") and Francis Scott Key's words bind a people to a single flag and homeland. Its swelling, triumphant cadence is the sound of national belonging itself — fitting for a ruling that reaffirms who is counted as American from the moment of birth. IMSLP hosts the original scores and dozens of arrangements in the public domain.",
        "source": "The Star-Spangled Banner (Smith, John Stafford), IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/The_Star-Spangled_Banner_(Smith,_John_Stafford)"
      },
      {
        "category": "artistic",
        "title": "Edward Moran, \"Unveiling the Statue of Liberty Enlightening the World\" (1886) — VISUAL ARTWORK",
        "excerpt": "Edward Moran's luminous 1886 oil painting depicts New York Harbor crowded with ships flying French and American flags as gun-smoke rolls across the island and Liberty rises clear above it all, torch lifted to the sky. As the \"Mother of Exiles\" welcoming newcomers to her shores, the image embodies the nation's self-understanding as a country defined by those it receives and claims as its own — the very promise affirmed when the Court left birthright citizenship intact.",
        "source": "Edward Moran (1829–1901), \"Unveiling the Statue of Liberty Enlightening the World\" (1886), Museum of the City of New York; via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:EdwardMoran-UnveilingTheStatueofLiberty1886Large.jpg",
        "image": {
          "src": "/covers/scotus-birthright-citizenship--art.png",
          "alt": "Edward Moran's 1886 painting of New York Harbour crowded with ships and gunsmoke as the Statue of Liberty is unveiled, torch lifted to the sky.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 27
  },
  {
    "slug": "scotus-transgender-school-sports",
    "headline": "US Supreme Court upholds state laws barring transgender girls and women from female school sports",
    "overview": "The US Supreme Court upheld state laws that bar transgender girls and women from competing on female school and college sports teams, a victory for conservative states. The decision affects athletes in more than two dozen states with similar bans and turns on questions of fairness, sex and inclusion in competition.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMiqwFBVV95cUxQZ0k5Vmc2S1lZU2JqQXR1SDVRZEVUMnRsUEFCVm14SmI3VTNramx5bEhqeEpIQVlDdjdsa0ZTQjBCaE9nRjRNMS10Yk5sNll3RzJBN2VlbFNyVHRzek4wcUtHVGVucEVJMXhsQUVabHBraGc3dDFyd1VndnN3SEpyMzc5aGJjSkFrMkVaU0NkRUVnVXQtQVdLMHFITmliYU5aS19LanVuSDJZT0U?oc=5"
      },
      {
        "name": "PBS NewsHour",
        "href": "https://www.pbs.org/newshour/politics/supreme-court-upholds-state-laws-banning-transgender-girls-and-women-from-school-sports"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-30",
    "image": {
      "src": "/covers/scotus-transgender-school-sports.png",
      "alt": "An empty outdoor running track with starting blocks under stadium floodlights at dusk.",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 30 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Law of Mount Typaeum: Women Barred from Olympia",
        "excerpt": "It is a law of Elis to cast down it any women who are caught present at the Olympic games, or even on the other side of the Alpheius, on the days prohibited to women. However, they say that no woman has been caught, except Callipateira only; some, however, give the lady the name of Pherenice and not Callipateira.",
        "source": "Pausanias, Description of Greece 5.6.7, trans. W. H. S. Jones (1918), Wikisource",
        "href": "https://en.wikisource.org/wiki/Description_of_Greece_(Jones)/Book_5"
      },
      {
        "category": "historical",
        "title": "The Heraea: A Separate Footrace for Maidens",
        "excerpt": "Every fourth year there is woven for Hera a robe by the Sixteen women, and the same also hold games called Heraea. The games consist of foot-races for maidens. These are not all of the same age. The first to run are the youngest; after them come the next in age, and the last to run are the oldest of the maidens. They run in the following way: their hair hangs down, a tunic reaches to a little above the knee, and they bare the right shoulder as far as the breast. These too have the Olympic stadium reserved for their games, but the course of the stadium is shortened for them by about one-sixth of its length.",
        "source": "Pausanias, Description of Greece 5.16.2-3, trans. W. H. S. Jones (1918), Wikisource",
        "href": "https://en.wikisource.org/wiki/Description_of_Greece_(Jones)/Book_5"
      },
      {
        "category": "literary",
        "title": "Atalanta's Footrace: The Condition of the Game",
        "excerpt": "I am not to be had (quoth shee) onlesse yee able bee In ronning for to vanquish mee. Yee must contend with mee In footemanshippe. And who so winnes the wager, I agree To bee his wife. But if that he bee found too slowe, then hee Shall lose his head.",
        "source": "Ovid, Metamorphoses, Book 10, trans. Arthur Golding (1567), Wikisource",
        "href": "https://en.wikisource.org/wiki/Metamorphoses_(tr._Golding)/Book_10"
      },
      {
        "category": "literary",
        "title": "The Rules of the Race: Atalanta and the Golden Apples",
        "excerpt": "she went away to a place that might serve as a racecourse, and, having planted a stake three cubits high in the middle of it, she caused her wooers to race before her from there, and ran herself in arms; and if the wooer was caught up, his due was death on the spot, and if he was not caught up, his due was marriage. When many had already perished, Melanion came to run for love of her, bringing golden apples from Aphrodite, and being pursued he threw them down, and she, picking up the dropped fruit, was beaten in the race.",
        "source": "Apollodorus, The Library 3.9.2, trans. J. G. Frazer (1921), ToposText",
        "href": "https://topostext.org/work/150"
      },
      {
        "category": "artistic",
        "title": "Glazunov, Triumphal March, Op. 40 (1892) — MUSIC",
        "excerpt": "Glazunov wrote this grand march for chorus and orchestra to crown a great public contest of nations at the 1893 Chicago World's Columbian Exposition. Its blazing brass and ceremonial pomp embody the ancient idea of victory celebrated before a watching crowd, a fitting echo of a courtroom and a culture still arguing over who may stand on the winners' podium and under what rules.",
        "source": "Aleksandr Glazunov, Triumphal March, Op. 40 (1892-93), IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Triumphal_March,_Op.40_(Glazunov,_Aleksandr)"
      },
      {
        "category": "artistic",
        "title": "Guido Reni, Atalanta and Hippomenes (c. 1620-25) — VISUAL ARTWORK",
        "excerpt": "Reni freezes the decisive instant of the contest: Atalanta bends to snatch a golden apple while Hippomenes surges past, his cloak streaming, the rules of the race bent by a trick. The two near-nude figures form an elegant, almost balletic X across the dark ground, dramatizing how a single condition placed on a competition can decide who wins and who is left behind, a tension at the heart of the modern fight over fairness in sport.",
        "source": "Guido Reni, Atalanta and Hippomenes (c. 1620-25), Museo di Capodimonte, Naples; Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Guido_Reni_-_Atalanta_and_Hippomenes_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/scotus-transgender-school-sports--art.png",
          "alt": "Guido Reni's painting Atalanta and Hippomenes, two nude runners crossing the dark canvas as Atalanta stoops for a golden apple.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 28
  },
  {
    "slug": "monaco-bomb-ukrainian-tycoon",
    "headline": "Manhunt under way after a bomb in Monaco injures a Ukrainian-born tycoon",
    "overview": "A bomb blast in Monaco injured three people, including a Ukrainian-born oligarch, prompting a manhunt after the suspected attacker fled across the border into France, authorities said. The targeted bombing shook the principality, a haven for the global wealthy.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMimAFBVV95cUxNRkFtOEk3cmZwQUNRT2MxT0ctUDB3Z1JKSWhCQmtGd2tjdjdHb0J6b0U3aEdORlZ5TERrYjRpTDljVFMyTUkxTVpjelJQWk02dUViem1TMzJOQnVQSm5VdVM2eG5Qbkp1alNneHlTWExCVDkzamhGUFVaRmVETlBoOUlPY0JMUWl6Qk5pYXh1LV9VRWhUTlZ1ZA?oc=5"
      },
      {
        "name": "CBS News",
        "href": "https://www.cbsnews.com/news/monaco-explosion-ukraine-victim/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-30",
    "image": {
      "src": "/covers/monaco-bomb-ukrainian-tycoon.png",
      "alt": "The harbour and high-rise skyline of Monaco on the Mediterranean coast.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 30 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Assassination of Julius Caesar",
        "excerpt": "It was Casca who gave him the first blow with his dagger, in the neck, not a mortal wound, nor even a deep one, for which he was too much confused, as was natural at the beginning of a deed of great daring; so that Caesar turned about, grasped the knife, and held it fast.",
        "source": "Plutarch, Life of Caesar, ch. 66, trans. Bernadotte Perrin (1919), Perseus Digital Library, Tufts University",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0244%3Achapter%3D66"
      },
      {
        "category": "historical",
        "title": "Emma Goldman on Political Violence and 'Propaganda of the Deed'",
        "excerpt": "Such acts are the violent recoil from violence, whether aggressive or repressive; they are the last desperate struggle of outraged and exasperated human nature for breathing space and life.",
        "source": "Emma Goldman, 'The Psychology of Political Violence' (1911), Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Psychology_of_Political_Violence"
      },
      {
        "category": "literary",
        "title": "Joseph Conrad, The Secret Agent",
        "excerpt": "\"You used a shovel,\" he remarked, observing a sprinkling of small gravel, tiny brown bits of bark, and particles of splintered wood as fine as needles.",
        "source": "Joseph Conrad, The Secret Agent (1907), Chapter 5, Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Secret_Agent/Chapter_5"
      },
      {
        "category": "literary",
        "title": "Fyodor Dostoevsky, The Possessed (Demons)",
        "excerpt": "Every member of the society spies on the others, and it's his duty to inform against them. Every one belongs to all and all to every one.",
        "source": "Fyodor Dostoevsky, The Possessed, Part II, Chapter VIII 'Ivan the Tsarevitch', trans. Constance Garnett, AmericanLiterature.com",
        "href": "https://americanliterature.com/author/fyodor-dostoevsky/book/the-possessed/chapter-viii-ivan-the-tsarevitch"
      },
      {
        "category": "artistic",
        "title": "Mussorgsky, Night on Bald Mountain — MUSIC",
        "excerpt": "Mussorgsky's tone poem unleashes a churning, demonic orchestral storm — a witches' sabbath of menace, sudden detonations of brass and roaring strings that erupt out of darkness. Its atmosphere of conspiracy gathering in the night and bursting into violent chaos mirrors the dread of a targeted bombing that shatters a supposed haven of calm.",
        "source": "Modest Mussorgsky, Night on Bald Mountain (1867), public-domain scores at IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Night_on_Bald_Mountain_(Mussorgsky,_Modest)"
      },
      {
        "category": "artistic",
        "title": "The Assassination of Alexander II, 1881 — VISUAL ARTWORK",
        "excerpt": "This 1881 illustrated print depicts the bomb attack that killed Tsar Alexander II on a St. Petersburg street, the carriage wrecked and bodies strewn amid smoke and debris from the explosion. As one of the first modern terrorist bombings, it captures the same shock as the Monaco blast: sudden, premeditated violence striking down a powerful figure in a public place.",
        "source": "A. Baldinger, 'The assassination of Alexander II of Russia on March 1, 1881', Vsemirnaya Illyustratsia (1881), Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:The_assassination_of_Alexander_II_of_Russia_on_March_1_1881.jpg",
        "image": {
          "src": "/covers/monaco-bomb-ukrainian-tycoon--art.png",
          "alt": "An 1881 illustrated print of the bomb attack that killed Tsar Alexander II, his wrecked carriage and figures strewn amid smoke on a St Petersburg street.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 29
  },
  {
    "slug": "ukraine-dubna-second-strike",
    "headline": "Ukraine strikes a site in Russia's Dubna for a second time, Zelensky says",
    "overview": "Ukraine struck a site in Dubna, north of Moscow, for a second time, President Volodymyr Zelensky said, in the latest deep long-range drone attack on Russian territory. Russia has acknowledged that Ukrainian strikes are causing fuel shortages as Kyiv reaches ever farther behind the front lines.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiywFBVV95cUxQeUxTaWVPX2Z0bm04b1RSNkd0bkF5NGNhQnY3cW1jNXZxdE9SWU9EZGhFSnZINkFHM0hfU2xPbVc0bzBrblVCOVF2TS05MjBYT1Q0RlZCVGh4Z2YwcFVoVHdLVEcyU0J0dUs2bkt3MHZ5dU1aWmpRV3BvMUdybXVaaEtwSWR1SjFWalJkLXBLUFZWd3NCc0VNMFRvcWxsZlRSM0p1U01hSjNkaGlEanJqcUNYOG1RMHVNU1o3Ymh0Z0ZlbmE0czVfX01OSQ?oc=5"
      },
      {
        "name": "Washington Examiner",
        "href": "https://www.washingtonexaminer.com/news/4630094/ukrainian-drones-strike-russian-space-communications-center-in-moscow-region/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-30",
    "image": {
      "src": "/covers/ukraine-dubna-second-strike.png",
      "alt": "An industrial complex burning bright orange against the night sky.",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 30 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Darius's long march against the distant Scythians",
        "excerpt": "For this Dareios wished to take vengeance upon them, and was gathering together an army to go against them.",
        "source": "Herodotus, The History, Book IV.4 (trans. G. C. Macaulay), Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/2707/pg2707.txt"
      },
      {
        "category": "historical",
        "title": "David and Goliath: the smaller power fells the giant",
        "excerpt": "So David prevailed over the Philistine with a sling and with a stone, and smote the Philistine, and slew him; but there was no sword in the hand of David.",
        "source": "1 Samuel 17:50, Bible (King James Version), Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/1_Samuel"
      },
      {
        "category": "literary",
        "title": "Tennyson, \"The Charge of the Light Brigade\"",
        "excerpt": "Cannon to right of them, / Cannon to left of them, / Cannon in front of them / Volley'd and thunder'd;",
        "source": "Alfred, Lord Tennyson, \"The Charge of the Light Brigade\" (1854), Wikisource",
        "href": "https://en.wikisource.org/wiki/Poems_That_Every_Child_Should_Know/The_Charge_of_the_Light_Brigade"
      },
      {
        "category": "literary",
        "title": "Wilfred Owen, \"Dulce et Decorum Est\"",
        "excerpt": "Drunk with fatigue; deaf even to the hoots / Of gas-shells dropping softly behind.",
        "source": "Wilfred Owen, \"Dulce et Decorum Est,\" Poems (1920), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/1034/1034-h/1034-h.htm"
      },
      {
        "category": "artistic",
        "title": "Tchaikovsky, 1812 Overture, Op. 49 — MUSIC",
        "excerpt": "Tchaikovsky's festival overture stages an invader reaching deep into Russian territory, building from a solemn hymn to roaring cannon fire and pealing bells. Its very subject is a powerful foe striking far behind the lines and the convulsive response that follows. The clash of distant menace and home-front alarm mirrors drones reaching hundreds of kilometers past the front toward Moscow.",
        "source": "Pyotr Ilyich Tchaikovsky, 1812 Overture, Op. 49 (1880), full orchestral score, IMSLP/Petrucci Music Library",
        "href": "https://imslp.org/wiki/1812_Overture,_Op.49_(Tchaikovsky,_Pyotr)"
      },
      {
        "category": "artistic",
        "title": "Caravaggio, \"David and Goliath\" — VISUAL ARTWORK",
        "excerpt": "Caravaggio's tenebrous canvas shows the boy David binding the head of the felled giant, a single decisive blow having toppled a vastly larger adversary. The dramatic chiaroscuro makes the asymmetry visceral: small hands, immense consequence. It resonates with a smaller power reaching past the front to strike a far more massive foe deep in its own territory.",
        "source": "Caravaggio (Michelangelo Merisi), David and Goliath, c. 1600, Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:David_and_Goliath_by_Caravaggio.jpg",
        "image": {
          "src": "/covers/ukraine-dubna-second-strike--art.png",
          "alt": "Caravaggio's dark, dramatic painting of the boy David holding the severed head of the giant Goliath.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 30
  },
  {
    "slug": "europe-heatwave-record-deaths",
    "headline": "Europe's heatwave is linked to about 1,300 deaths as Germany hits a record 41.7C, WHO says",
    "overview": "A severe heatwave across Europe has been linked to roughly 1,300 deaths, the World Health Organization said, as Germany recorded its highest-ever temperature of 41.7C. Health officials warned that the elderly and other vulnerable people are most at risk as extreme heat intensifies.",
    "genre": "Climate",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cn4d2vv935lo?at_medium=RSS&at_campaign=rss"
      },
      {
        "name": "Al Jazeera",
        "href": "https://www.aljazeera.com/news/2026/6/29/more-than-1300-deaths-in-europe-amid-heatwave-what-can-countries-do"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-30",
    "image": {
      "src": "/covers/europe-heatwave-record-deaths.png",
      "alt": "A sun-scorched, near-empty European city square shimmering in extreme heat.",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 30 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Phaethon scorches the earth in Ovid's Metamorphoses",
        "excerpt": "Great cities perish with their walls, and peopled nations are consumed to dust—",
        "source": "Ovid, Metamorphoses, Book 2 (trans. Brookes More), hosted at Perseus Digital Library, Tufts University",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.02.0028%3Abook%3D2%3Acard%3D227"
      },
      {
        "category": "historical",
        "title": "The great drought and famine in the days of Elijah (1 Kings)",
        "excerpt": "And Elijah the Tishbite, who was of the inhabitants of Gilead, said unto Ahab, As the LORD God of Israel liveth, before whom I stand, there shall not be dew nor rain these years, but according to my word.",
        "source": "The Bible (King James Version), 1 Kings 17:1, Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/1_Kings/Chapter_17"
      },
      {
        "category": "literary",
        "title": "The bloody Sun at noon in Coleridge's Ancient Mariner",
        "excerpt": "All in a hot and copper sky, / The bloody Sun, at noon, / Right up above the mast did stand, / No bigger than the Moon.",
        "source": "Samuel Taylor Coleridge, \"The Rime of the Ancient Mariner,\" Part II, Project Gutenberg",
        "href": "https://www.gutenberg.org/files/151/151-h/151-h.htm"
      },
      {
        "category": "literary",
        "title": "Archibald Lampman's \"Heat\" and the shimmering, droughty noon",
        "excerpt": "From plains that reel to southward, dim, / The road runs by me white and bare; / Up the steep hill it seems to swim / Beyond, and melt into the glare.",
        "source": "Archibald Lampman, \"Heat,\" in Among the Millet and Other Poems (1888), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/12413/12413-h/12413-h.htm"
      },
      {
        "category": "artistic",
        "title": "Vivaldi, \"Summer\" (L'estate) from The Four Seasons — MUSIC",
        "excerpt": "Vivaldi's G minor concerto opens with strings drooping under languid, oppressive heat before erupting into a violent thunderstorm — the composer's own accompanying sonnet describes a shepherd terrified beneath a sun that scorches the land. Its depiction of nature pushed past endurance by summer's blaze makes it an uncanny soundtrack to a heatwave that has overwhelmed Europe and claimed some 1,300 lives.",
        "source": "Antonio Vivaldi, Violin Concerto in G minor, RV 315, \"L'estate\" (1723), from Le quattro stagioni, IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Violin_Concerto_in_G_minor,_RV_315_(Vivaldi,_Antonio)"
      },
      {
        "category": "artistic",
        "title": "J. M. W. Turner, Regulus — VISUAL ARTWORK",
        "excerpt": "Turner dissolves a Mediterranean harbour into a blinding white-gold detonation of sunlight, so brilliant it nearly erases the architecture and figures around it. The picture makes light itself a force of suffering, an overwhelming sun that scorches the eye — a fitting image for a heatwave whose blazing skies pushed Germany to a record 41.7C and proved lethal to the vulnerable.",
        "source": "J. M. W. Turner, Regulus (1828, reworked 1837), Tate, via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Turner_-_Regulus,_1828,_reworked_1837,_N00519.jpg",
        "image": {
          "src": "/covers/europe-heatwave-record-deaths--art.png",
          "alt": "J. M. W. Turner's painting Regulus, a Mediterranean harbour dissolved in a blinding white-gold blaze of sunlight.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 31
  },
  {
    "slug": "ghana-accra-flooding-deaths",
    "headline": "Flooding in Ghana's capital Accra kills at least 13, with more storms forecast",
    "overview": "Severe flooding struck Ghana's capital, Accra, killing at least 13 people, with authorities warning of further storms. The city's recurring deadly floods have been blamed on clogged drains, unplanned building and intensifying seasonal rains.",
    "genre": "Climate",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cn4r8zlv8edo?at_medium=RSS&at_campaign=rss"
      },
      {
        "name": "Africa.com",
        "href": "https://www.africa.com/global-south-world/ghanas-capital-accra-submerged-as-floods-expose-long-running-urban-drainage-crisis"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-30",
    "image": {
      "src": "/covers/ghana-accra-flooding-deaths.png",
      "alt": "A flooded tropical city street at dawn, muddy brown water rising over cars and the steps of low houses.",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 30 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Great Flood of Genesis",
        "excerpt": "And the waters prevailed exceedingly upon the earth; and all the high hills, that were under the whole heaven, were covered. Fifteen cubits upward did the waters prevail; and the mountains were covered. And all flesh died that moved upon the earth, both of fowl, and of cattle, and of beast, and of every creeping thing that creepeth upon the earth, and every man:",
        "source": "Bible (King James Version), Genesis 7:19-21, Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Genesis"
      },
      {
        "category": "historical",
        "title": "The Johnstown Flood of 1889",
        "excerpt": "Away up the Conemaugh came a yellow wall, whose crest was white and frothy. I rushed for the platform of the car, not knowing what I did, and just then the train began to move.",
        "source": "Willis Fletcher Johnson, History of the Johnstown Flood (1889), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/41271/41271-h/41271-h.htm"
      },
      {
        "category": "literary",
        "title": "The Deluge in the Epic of Gilgamesh",
        "excerpt": "The raging of a storm in the morning arose, from the horizon of heaven extending and wide / Vul in the midst of it thundered, and / Nebo and Saru went in front; / the throne bearers went over mountains and plains; / the destroyer Nergal overturned; / Ninip went in front, and cast down; / the spirits carried destruction; / in their glory they swept the earth; / of Vul the flood, reached to heaven; / the bright earth to a waste was turned",
        "source": "George Smith (trans.), The Chaldean Account of the Deluge (1872), Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Chaldean_Account_of_the_Deluge"
      },
      {
        "category": "literary",
        "title": "Deucalion's Flood in Ovid's Metamorphoses",
        "excerpt": "And now one vast expanse, the land and sea were mingled in the waste of endless waves—a sea without a shore.",
        "source": "Ovid, Metamorphoses Book 1 (Brookes More trans.), Perseus Digital Library, Tufts",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0028:book=1:card=253"
      },
      {
        "category": "artistic",
        "title": "Beethoven, Symphony No. 6 'Pastoral', Op. 68, IV. 'Gewitter, Sturm' — MUSIC",
        "excerpt": "Beethoven's fourth movement unleashes a sudden, terrifying thunderstorm: low rumbling cellos and basses swell into shrieking piccolo and crashing timpani as the orchestra depicts torrential rain breaking over a peaceful countryside. Its abrupt violence and the dread of nature turned destructive mirror the way ordinary seasonal rains over Accra escalate into a deadly deluge. The storm's eventual subsiding into calm underscores the cyclical, recurring nature of such catastrophes.",
        "source": "Ludwig van Beethoven, Symphony No. 6 in F major, Op. 68 (1808), IMSLP/Petrucci Music Library",
        "href": "https://imslp.org/wiki/Symphony_No.6,_Op.68_(Beethoven,_Ludwig_van)"
      },
      {
        "category": "artistic",
        "title": "Francis Danby, 'The Deluge' (c. 1840) — VISUAL ARTWORK",
        "excerpt": "Danby's vast canvas shows humanity engulfed by a cataclysmic flood: figures cling desperately to rocks and floating debris as towering, storm-darkened waves swallow the land beneath a fractured, lightning-torn sky. The painting's overwhelming scale and helpless human figures capture the terror of water rising beyond all control. It resonates with Accra's flooding, where rising waters overwhelm a city and its people are left scrambling for higher ground.",
        "source": "Francis Danby, The Deluge, c. 1840, oil on canvas, Tate Britain (via Wikimedia Commons / Google Art Project)",
        "href": "https://commons.wikimedia.org/wiki/File:Francis_Danby_-_The_Deluge_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/ghana-accra-flooding-deaths--art.png",
          "alt": "Francis Danby's painting The Deluge, tiny figures clinging to rocks as towering waves engulf the land under a storm-torn sky.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 32
  },
  {
    "slug": "ubs-million-new-millionaires",
    "headline": "Nearly one million people became millionaires worldwide in 2025, UBS report finds",
    "overview": "Almost one million people joined the ranks of dollar millionaires worldwide in 2025, a UBS wealth report found, as rising asset prices swelled fortunes even amid economic uncertainty. The report underscored a widening gap between the very wealthy and everyone else.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMixwFBVV95cUxQczdTd1FBWlZNVHJMSERzckFVLWthNFJVeUhUNzdsQ2RIRjRRQW0yT2lFSk5uNEVBWUc5ajhvXzlRb0tNR1lJTklHN09hYVQwQUw1TlotMVVFYU1GVE1JZ0xEMGRrZ0NrdEJRVkJnRVB2QVFMQUlnMVV1WEVtaldZTl9MdURlUWdBd3hEdUdJOWR3VWt1LXJpVHE3YTdlR3haQWR4ZGpSOHFzUzVPWVlUUUlzSmc5LXg2Y01VbXBucjZPenlkQnJR?oc=5"
      },
      {
        "name": "Gulf News",
        "href": "https://gulfnews.com/business/markets/nearly-1-million-new-millionaires-created-in-2025-ubs-says-1.500591623"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-30",
    "image": {
      "src": "/covers/ubs-million-new-millionaires.png",
      "alt": "Gold coins heaped before a glittering city skyline of glass towers at dusk.",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 30 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Solon Warns Croesus: Count No Man Happy Until He Dies",
        "excerpt": "But in every matter it behoves us to mark well the end: for oftentimes God gives men a gleam of happiness, and then plunges them into ruin.",
        "source": "Herodotus, The Histories, Book 1.32, trans. George Rawlinson (Wikisource)",
        "href": "https://en.wikisource.org/wiki/The_History_of_Herodotus_(Rawlinson)/Book_1"
      },
      {
        "category": "historical",
        "title": "Carnegie's Gospel of Wealth and the Gulf Between Palace and Cottage",
        "excerpt": "The contrast between the palace of the millionaire and the cottage of the laborer with us to-day measures the change which has come with civilization.",
        "source": "Andrew Carnegie, \"The Gospel of Wealth,\" North American Review, 1889 (Wikisource)",
        "href": "https://en.wikisource.org/wiki/The_Gospel_of_Wealth"
      },
      {
        "category": "literary",
        "title": "Gatsby's Gardens of New Money and Excess",
        "excerpt": "In his blue gardens men and girls came and went like moths among the whisperings and the champagne and the stars.",
        "source": "F. Scott Fitzgerald, The Great Gatsby, 1925 (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/64317/pg64317.txt"
      },
      {
        "category": "literary",
        "title": "The Parable of the Rich Fool and His Bigger Barns",
        "excerpt": "But God said unto him, Thou foolish one, this night is thy soul required of thee; and the things which thou hast prepared, whose shall they be?",
        "source": "Gospel of Luke 12:20 (American Standard Version, Wikisource)",
        "href": "https://en.wikisource.org/wiki/Bible_(American_Standard)/Luke"
      },
      {
        "category": "artistic",
        "title": "Wagner, Das Rheingold — The Curse of the Hoarded Gold — MUSIC",
        "excerpt": "Wagner's opera opens at the bottom of the Rhine, where the theft of the river's gold and the renunciation of love to forge a ring of limitless power sets a curse upon all who covet the hoard. Its shimmering, restless motifs render wealth as both intoxicating and ruinous — a fitting overture to a world minting nearly a million new millionaires while the gap between the few and the many widens.",
        "source": "Richard Wagner, Das Rheingold, WWV 86A, 1854 (IMSLP / Petrucci Music Library)",
        "href": "https://imslp.org/wiki/Das_Rheingold,_WWV_86A_(Wagner,_Richard)"
      },
      {
        "category": "artistic",
        "title": "Klimt, Danaë — The Shower of Gold — VISUAL ARTWORK",
        "excerpt": "In Klimt's golden-period masterpiece, Zeus descends upon the sleeping Danaë as a literal shower of gold, fortune pouring down upon a single fortunate body. The lavish gilding and intimate rapture make wealth itself the seductive subject — an apt emblem for a year in which rising asset prices rained new fortunes on the few.",
        "source": "Gustav Klimt, Danaë, c. 1907–08, Leopold Museum, Vienna (Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Gustav_Klimt_010.jpg",
        "image": {
          "src": "/covers/ubs-million-new-millionaires--art.png",
          "alt": "Gustav Klimt's painting Danaë, a sleeping woman bathed in a cascading shower of gold.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 33
  },
  {
    "slug": "usmca-withdrawal-countdown",
    "headline": "US move to exit USMCA starts a decade-long countdown for the North American trade pact",
    "overview": "A US declaration to withdraw from the US-Mexico-Canada Agreement would trigger a years-long countdown that could unwind the continent's free-trade framework, analysts said, as a key review deadline looms. Businesses across the three economies face fresh uncertainty over tariffs and supply chains.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMirgFBVV95cUxOd3EyUnplRFp0LW81Mjdic3pGeGpSaWVQRkNSZjRjVGY5THBqMGQzb1NjaERnOVhGWFNZSmFRWmtyWlk3T0dhdWtfWWh1ZUVMbEhUbTNCMzJydklzTWxoNV8yUGFMakx2MklYNXRoaGJfcDliMUFRX1ZwNkstR0EwbGpwakljMWlGRzdlRDhVUHZUMXdXcDM1X19JWk5zNC1oeGRmYzFHYUdfYWRFamc?oc=5"
      },
      {
        "name": "Newsweek",
        "href": "https://www.newsweek.com/trump-official-warns-president-may-leave-his-signature-trade-deal-11156415"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-30",
    "image": {
      "src": "/covers/usmca-withdrawal-countdown.png",
      "alt": "A vast container port at dusk, towering stacks of shipping containers and idle cranes under a brooding sky.",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 30 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Smoot-Hawley Tariff Act of 1930 and the collapse of world trade",
        "excerpt": "Even before its enactment, U.S. trading partners began retaliating by raising their tariff rates, which froze international trade.",
        "source": "United States Senate, \"The Senate Passes the Smoot-Hawley Tariff\" (Senate Art & History, senate.gov)",
        "href": "https://www.senate.gov/artandhistory/history/minute/Senate_Passes_Smoot_Hawley_Tariff.htm"
      },
      {
        "category": "historical",
        "title": "The rise and decline of the Hanseatic League",
        "excerpt": "The assertion of Hanseatic influence in the two decades, 1356 to 1377, marks the zenith of the League's power and the completion of the long process of unification.",
        "source": "\"Hanseatic League,\" Encyclopædia Britannica (11th ed., 1911), via Wikisource",
        "href": "https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Hanseatic_League"
      },
      {
        "category": "literary",
        "title": "Adam Smith on the folly of restraining commerce",
        "excerpt": "What is prudence in the conduct of every private family can scarce be folly in that of a great kingdom. If a foreign country can supply us with a commodity cheaper than we ourselves can make it, better buy it of them with some part of the produce of our own industry, employed in a way in which we have some advantage.",
        "source": "Adam Smith, An Inquiry into the Nature and Causes of the Wealth of Nations, Book IV, Ch. II (1776), via Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Wealth_of_Nations/Book_IV/Chapter_2"
      },
      {
        "category": "literary",
        "title": "The Bastard on kings who \"break faith upon commodity\" in Shakespeare's King John",
        "excerpt": "Mad world! mad kings! mad composition! ... That smooth-fac'd gentleman, tickling commodity, Commodity, the bias of the world ... Since kings break faith upon commodity, Gain, be my lord, for I will worship thee!",
        "source": "William Shakespeare, The Life and Death of King John, Act II, Scene I (c. 1596), via Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/1511/pg1511.txt"
      },
      {
        "category": "artistic",
        "title": "François Couperin, \"Les nations\" (1726) — MUSIC",
        "excerpt": "Couperin gathers four trio suites each cast as a sovereign nation — \"La Françoise,\" \"L'Espagnole,\" \"L'Impériale,\" and \"La Piémontoise\" — distinct voices set side by side yet bound into one harmonious whole. The work mirrors a continent of separate economies once knit together by a common framework, now at risk of drifting back into their own keys as the trade pact unwinds.",
        "source": "François Couperin, Les nations: Sonades, & Suites de Simphonies en trio (Paris, 1726), IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Les_nations_(Couperin,_Fran%C3%A7ois)"
      },
      {
        "category": "artistic",
        "title": "Claude Lorrain, \"Seaport with the Embarkation of the Queen of Sheba\" (1648) — VISUAL ARTWORK",
        "excerpt": "Claude Lorrain bathes a thriving Mediterranean harbor in golden dawn light, its quays crowded with merchants, cargo, and ships poised to set sail on the open trade of nations. The serene, prosperous port stands as an emblem of commerce flowing freely across borders — the very vision of integrated North American trade now facing a decade-long countdown to its possible end.",
        "source": "Claude Lorrain, Seaport with the Embarkation of the Queen of Sheba, oil on canvas, 1648, National Gallery, London; via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Claude_Lorrain_-_Seaport_with_the_Embarkation_of_the_Queen_of_Sheba_-_WGA05002.jpg",
        "image": {
          "src": "/covers/usmca-withdrawal-countdown--art.png",
          "alt": "Claude Lorrain's painting Seaport with the Embarkation of the Queen of Sheba, a golden Mediterranean harbour crowded with ships and merchants at dawn.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 34
  },
  {
    "slug": "meta-states-child-addiction-suit",
    "headline": "Meta loses bid to dismiss US states' claims that Facebook and Instagram addict children",
    "overview": "A US judge refused to throw out claims by dozens of states that Meta deliberately designed Facebook and Instagram to be addictive to children, allowing the lawsuits to proceed. The states argue the company concealed the harms its products cause to young users.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMizAFBVV95cUxQTW1oX1plcXNSQ1ZoOXBJanVnUlhSbjZ3WEcwQ1NrUHUyMDFZa1ZzR2o0VERfX1JYdjdkRXIzVmVSMEthblRwOFJqRGZfalA5bE1Yd0QxeGxfNGltaGZJdnhYeHo1M1NkM0xsamRuY0xVWkk0VGxfZnhna083enVoQkhzdWlhdEZhZXRNVUNPQ0djaDhPSDg5YnVDZmx6YkZxVGtVaU0wNHluMUVSaFREejBMOU4zbVRzMWtuNHVCRWJETHJ4ZWRIWEdlRUI?oc=5"
      },
      {
        "name": "Devdiscourse",
        "href": "https://www.devdiscourse.com/article/law-order/3943022-meta-faces-legal-challenge-over-alleged-child-online-safety-violations"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-30",
    "image": {
      "src": "/covers/meta-states-child-addiction-suit.png",
      "alt": "A child's face lit from below by the pale glow of a smartphone screen in a darkened room.",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 30 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "De Quincey's \"Just, Subtle, and Mighty Opium\"",
        "excerpt": "happiness might now be bought for a penny, and carried in the waistcoat pocket: portable ecstasies might be had corked up in a pint bottle",
        "source": "Thomas De Quincey, Confessions of an English Opium-Eater (1821), \"The Pleasures of Opium\", Wikisource",
        "href": "https://en.wikisource.org/wiki/Confessions_of_an_English_Opium-Eater/The_Pleasures_of_Opium"
      },
      {
        "category": "historical",
        "title": "Longfellow's \"The Children's Crusade\" March Out the Gates",
        "excerpt": "From the gates, that summer day,\nClad in robes of hodden gray,\nWith the red cross on the breast,\nAzure-eyed and golden-haired,\nForth the young crusaders fared;",
        "source": "Henry Wadsworth Longfellow, \"The Children's Crusade\" (In the Harbor), The Complete Poetical Works of Henry Wadsworth Longfellow, Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/1365/pg1365.html"
      },
      {
        "category": "literary",
        "title": "Browning's Pied Piper Leads the Children Away",
        "excerpt": "Out came the children running.\nAll the little boys and girls,\nWith rosy cheeks and flaxen curls,\nAnd sparkling eyes and teeth like pearls,\nTripping and skipping, ran merrily after\nThe wonderful music with shouting and laughter.",
        "source": "Robert Browning, \"The Pied Piper of Hamelin\" (1842), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/18343/18343-h/18343-h.htm"
      },
      {
        "category": "literary",
        "title": "The Lotus-Eaters Make Odysseus's Men Forget Home",
        "excerpt": "And whosoever of them ate of the honey-sweet fruit of the lotus, had no longer any wish to bring back word or to return, but there they were fain to abide among the Lotus-eaters, feeding on the lotus, and forgetful of their homeward way.",
        "source": "Homer, Odyssey 9.94-97, trans. A.T. Murray (1919), Perseus Digital Library",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0136%3Abook%3D9%3Acard%3D82"
      },
      {
        "category": "artistic",
        "title": "Debussy, \"Sirènes\" from Nocturnes — MUSIC",
        "excerpt": "In the final Nocturne, Debussy dissolves a wordless female chorus into shimmering orchestral waves, conjuring the Sirens whose enchanting song lures sailors toward destruction. The piece's seductive, hypnotic pull captures the very allure at the heart of the states' case: a beautiful, irresistible signal engineered to draw the listener helplessly in.",
        "source": "Claude Debussy, Nocturnes (1900), No. 3 \"Sirènes\", IMSLP/Petrucci Music Library",
        "href": "https://imslp.org/wiki/Nocturnes_(Debussy,_Claude)"
      },
      {
        "category": "artistic",
        "title": "Waterhouse, \"Ulysses and the Sirens\" — VISUAL ARTWORK",
        "excerpt": "Waterhouse's 1891 canvas shows bird-bodied Sirens swooping around Odysseus's ship as he, bound to the mast, strains toward their lethal song while his crew row on with ears stopped. The image dramatizes the central tension of the Meta case: an alluring, addictive call against which the young are largely defenseless, with the few protections too easily overwhelmed.",
        "source": "John William Waterhouse, Ulysses and the Sirens (1891), National Gallery of Victoria; Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:John_William_Waterhouse_-_Ulysses_and_the_Sirens_(1891).jpg",
        "image": {
          "src": "/covers/meta-states-child-addiction-suit--art.png",
          "alt": "John William Waterhouse's painting Ulysses and the Sirens, bird-bodied sirens swooping around Odysseus's ship as he is bound to the mast.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 35
  },
  {
    "slug": "esa-milky-way-60-million-stars",
    "headline": "New European Space Agency image maps more than 60 million stars in the most detailed photo of the Milky Way yet",
    "overview": "The European Space Agency unveiled the most detailed photograph of the Milky Way ever produced, capturing more than 60 million stars in the crowded heart of the galaxy. The sweeping portrait distills years of observations into a single image of our home galaxy.",
    "genre": "Science",
    "sources": [
      {
        "name": "Colossal",
        "href": "https://www.thisiscolossal.com/2026/06/european-space-agency-milky-way-photograph/"
      },
      {
        "name": "European Space Agency",
        "href": "https://www.esa.int/Science_Exploration/Space_Science/Euclid/ESA_s_Euclid_captures_the_Milky_Way_s_crowded_heart"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-30",
    "image": {
      "src": "/covers/esa-milky-way-60-million-stars.png",
      "alt": "The European Space Agency's detailed photograph of the crowded heart of the Milky Way galaxy, dense with countless stars.",
      "credit": "ESA/Euclid"
    },
    "edition": "Evening Edition · 30 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Galileo turns the telescope on the Milky Way (1610)",
        "excerpt": "By the aid of a telescope any one may behold this in a manner which so distinctly appeals to the senses that all the disputes which have tormented philosophers through so many ages are exploded at once by the irrefragable evidence of our eyes, and we are freed from wordy disputes upon this subject, for the Galaxy is nothing else but a mass of innumerable stars planted together in clusters.",
        "source": "Galileo Galilei, The Sidereal Messenger (Sidereus Nuncius), 1610, Edward Stafford Carlos translation; Project Gutenberg eBook #46036",
        "href": "https://www.gutenberg.org/cache/epub/46036/pg46036.txt"
      },
      {
        "category": "historical",
        "title": "Ptolemy catalogues the fixed stars (2nd century AD)",
        "excerpt": "It is the first and most ancient document we possess which gives a description of the heavens of sufficient exactness to admit of comparison with modern observations.",
        "source": "Christian Heinrich Friedrich Peters & Edward Ball Knobel, Ptolemy's Catalogue of Stars: a revision of the Almagest, Carnegie Institution of Washington, 1915; Internet Archive",
        "href": "https://archive.org/details/cu31924012300491"
      },
      {
        "category": "literary",
        "title": "Walt Whitman, \"When I Heard the Learn'd Astronomer\"",
        "excerpt": "When I heard the learn’d astronomer,\nWhen the proofs, the figures, were ranged in columns before me,\nWhen I was shown the charts and diagrams, to add, divide, and measure them,\nWhen I sitting heard the astronomer where he lectured with much applause in the lecture-room,\nHow soon unaccountable I became tired and sick,\nTill rising and gliding out I wander’d off by myself,\nIn the mystical moist night-air, and from time to time,\nLook’d up in perfect silence at the stars.",
        "source": "Walt Whitman, \"When I Heard the Learn'd Astronomer,\" Leaves of Grass, 1865; Project Gutenberg eBook #1322",
        "href": "https://www.gutenberg.org/cache/epub/1322/pg1322.txt"
      },
      {
        "category": "literary",
        "title": "Dante closes the Inferno on \"the stars\"",
        "excerpt": "We mounted up, he first and I the second,\n    Till I beheld through a round aperture\n    Some of the beauteous things that Heaven doth bear;\n\nThence we came forth to rebehold the stars.",
        "source": "Dante Alighieri, The Divine Comedy: Inferno, Canto XXXIV, Henry Wadsworth Longfellow translation; Project Gutenberg eBook #1001",
        "href": "https://www.gutenberg.org/cache/epub/1001/pg1001.txt"
      },
      {
        "category": "artistic",
        "title": "Claude Debussy, \"Clair de lune\" from Suite bergamasque — MUSIC",
        "excerpt": "Debussy's shimmering piano nocturne pours moonlight into sound, its rippling arpeggios drifting like light scattered across a vast night sky. The piece evokes the same quiet awe as the new portrait of sixty million stars: a hushed, luminous immensity rendered with delicate, glittering detail. Its serene movement mirrors the slow patient gathering of starlight into one sweeping image of our home galaxy.",
        "source": "Claude Debussy, \"Clair de lune,\" third movement of Suite bergamasque, CD 82 (Paris: E. Fromont, 1905); IMSLP/Petrucci Music Library",
        "href": "https://imslp.org/wiki/Suite_bergamasque_(Debussy,_Claude)"
      },
      {
        "category": "artistic",
        "title": "Vincent van Gogh, \"The Starry Night\" (1889) — VISUAL ARTWORK",
        "excerpt": "Van Gogh's swirling cobalt sky churns with oversized, radiant stars spiralling above a sleeping town, transforming the night into a living, turbulent cosmos. Painted from memory and imagination, it captures the human urge to behold and map the heavens that drives the new sixty-million-star portrait. Where the telescope resolves the galaxy's crowded heart into precise points of light, Van Gogh dissolves it into rapturous motion, two visions of the same overwhelming sky.",
        "source": "Vincent van Gogh, The Starry Night, 1889, Museum of Modern Art (Google Art Project); Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Vincent_van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/esa-milky-way-60-million-stars--art.png",
          "alt": "Vincent van Gogh's The Starry Night, a swirling blue night sky of radiant stars above a sleeping town.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 36
  },
  {
    "slug": "brazil-beat-japan-world-cup",
    "headline": "Brazil beat Japan 2-1 at the World Cup as Martinelli scores in injury time",
    "overview": "Gabriel Martinelli scored deep in injury time to give Brazil a 2-1 win over Japan at the World Cup, rescuing the five-time champions after a stubborn Japanese fightback. The late goal sent Brazil through in dramatic fashion.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMikgFBVV95cUxOQ0RRN1A1TFhqb0dqM2VoaHlqUmN4YXkxWlU3d3M4aHBOcEZWbDFaSVNDVFNjTWJvOHBfWEV6SkFKeHExbjVENjE1YmJWOUJBcnJPeWs2WEE3STRKNE5IQjJrMFQyOTU0a0hwQlNXU2l3TzlLUWVscVVrbnZGUGJmbnBXSWhPOHBNaXZ3TVpuNVk0UQ?oc=5"
      },
      {
        "name": "Al Jazeera",
        "href": "https://www.aljazeera.com/sports/2026/6/29/martinelli-scores-late-as-brazil-beat-japan-2-1-enter-world-cup-last-16"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-30",
    "image": {
      "src": "/covers/brazil-beat-japan-world-cup.png",
      "alt": "A floodlit football stadium at night with a brilliant green pitch and drifting confetti.",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 30 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Pindar crowns the Olympic victor in song",
        "excerpt": "Water is best, and gold, like a blazing fire in the night, stands out supreme of all lordly wealth.",
        "source": "Pindar, Olympian Ode 1 (trans. Diane Arnson Svarlien), Perseus Digital Library, Tufts University",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0162:book=O.:poem=1"
      },
      {
        "category": "historical",
        "title": "Pheidippides, the long-course runner of Marathon",
        "excerpt": "First of all, while they were still in the city, the generals sent off to Sparta a herald, namely Pheidippides an Athenian and for the rest a runner of long day-courses and one who practised this as his profession.",
        "source": "Herodotus, The History of Herodotus, Book VI.105 (trans. G. C. Macaulay), Wikisource",
        "href": "https://en.wikisource.org/wiki/The_History_of_Herodotus_(Macaulay)/Book_VI"
      },
      {
        "category": "literary",
        "title": "Casey at the Bat — the great reversal at the death",
        "excerpt": "Oh, somewhere in this favoured land the sun is shining bright, / The band is playing somewhere, and somewhere hearts are light, / And somewhere men are laughing, and somewhere children shout; / But there is no joy in Mudville—mighty Casey has struck out.",
        "source": "Ernest Lawrence Thayer, \"Casey at the Bat\" (1888; 1912 edition), Wikisource",
        "href": "https://en.wikisource.org/wiki/Casey_at_the_Bat_(1912)"
      },
      {
        "category": "literary",
        "title": "To an Athlete Dying Young — glory chaired shoulder-high",
        "excerpt": "The time you won your town the race / We chaired you through the market-place; / Man and boy stood cheering by, / And home we brought you shoulder-high.",
        "source": "A. E. Housman, \"To an Athlete Dying Young,\" A Shropshire Lad (1896), Wikisource",
        "href": "https://en.wikisource.org/wiki/A_Shropshire_Lad/To_an_Athlete_Dying_Young"
      },
      {
        "category": "artistic",
        "title": "Verdi, \"Triumphal March\" from Aida — MUSIC",
        "excerpt": "Verdi's blazing Grand March from Act II of Aida is the sound of victory made into spectacle: trumpets ringing, the conquering procession sweeping the stage. Its surging brass captures the jubilation of a five-time champion saved at the last gasp, the roar of a stadium erupting as the winning goal finds the net.",
        "source": "Giuseppe Verdi, Aida (1871), Act II Triumphal March, IMSLP/Petrucci Music Library",
        "href": "https://imslp.org/wiki/Aida_(Verdi,_Giuseppe)"
      },
      {
        "category": "artistic",
        "title": "Henri Rousseau, The Football Players (1908) — VISUAL ARTWORK",
        "excerpt": "Rousseau's naive, dreamlike canvas freezes four mustachioed players leaping for a ball in striped jerseys beneath autumn trees, bodies suspended in joyful, weightless motion. The painting distills the pure play and theatrical drama of the sporting moment — the same suspended instant of leaping bodies that decides a match deep in injury time.",
        "source": "Henri Rousseau, The Football Players (1908), oil on canvas, Solomon R. Guggenheim Museum; via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Henri_Rousseau_-_The_Football_Players.jpg",
        "image": {
          "src": "/covers/brazil-beat-japan-world-cup--art.png",
          "alt": "Henri Rousseau's painting The Football Players, four moustachioed players in striped jerseys leaping for a ball among autumn trees.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 37
  },
  {
    "slug": "rick-owens-adidas-aircon-tracksuits",
    "headline": "Rick Owens designs inflatable Adidas tracksuits that double as personal air conditioning",
    "overview": "Designer Rick Owens has created a line of inflatable Adidas tracksuits that function as personal air conditioning, channeling air around the wearer's body. The collaboration fuses avant-garde fashion with wearable climate control as summers grow hotter.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Dezeen",
        "href": "https://www.dezeen.com/2026/06/30/rick-owens-adidas-inflatable-aircon-tracksuits/"
      },
      {
        "name": "Highsnobiety",
        "href": "https://www.highsnobiety.com/p/rick-owens-adidas-2026/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-30",
    "image": {
      "src": "/covers/rick-owens-adidas-aircon-tracksuits.png",
      "alt": "Avant-garde inflatable, puffed-up tracksuits on faceless mannequins under soft studio light.",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 30 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Marinetti's Manifesto of Futurism (1909)",
        "excerpt": "the world's magnificence has been enriched by a new beauty: the beauty of speed.",
        "source": "Filippo Tommaso Marinetti, \"The Founding and Manifesto of Futurism,\" Le Figaro, 20 February 1909 (Encyclopædia Britannica primary source)",
        "href": "https://cdn.britannica.com/primary_source/eb/435828.html"
      },
      {
        "category": "historical",
        "title": "Oskar Schlemmer's Triadic Ballet premiere program (1922)",
        "excerpt": "On 30 September 1922 the Bauhaus master Oskar Schlemmer premiered Das Triadische Ballett in Stuttgart, encasing dancers in padded, spherical and conical costumes that swallowed the human silhouette into pure geometry. This program sheet, designed by Schlemmer himself, marks the moment fashion became architecture for the body — the same impulse that puffs Owens's wearers into ballooning, Michelin-Man volumes.",
        "source": "Oskar Schlemmer, program for the premiere of Das Triadische Ballett, Stuttgart, 30 September 1922 (Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Das_Triadische_Ballett,_Programmzettel_1922.jpg"
      },
      {
        "category": "literary",
        "title": "Thomas Carlyle, Sartor Resartus (1836)",
        "excerpt": "Clothes gave us individuality, distinctions, social polity; Clothes have made Men of us; they are threatening to make Clothes-screens of us.",
        "source": "Thomas Carlyle, Sartor Resartus, 1836 (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/1051/1051-h/1051-h.htm"
      },
      {
        "category": "literary",
        "title": "Hans Christian Andersen, \"The Emperor's New Clothes\" (1837)",
        "excerpt": "The tissue is as light as a cobweb, and one might fancy one had nothing on; but that is just its greatest beauty.",
        "source": "Hans Christian Andersen, \"The Emperor's New Clothes,\" 1837 (Wikisource)",
        "href": "https://en.wikisource.org/wiki/The_Fairy_Tales_of_Hans_Christian_Andersen/The_Emperor's_New_Clothes"
      },
      {
        "category": "artistic",
        "title": "Arthur Honegger, Pacific 231 — MUSIC",
        "excerpt": "Honegger's 1923 symphonic movement builds a roaring orchestral machine, accelerating a steam locomotive from dead stillness to thundering full speed. Its mechanical exhilaration — the body of music remade as an engine — mirrors Owens's tracksuits humming with built-in fans, turning the wearer into a piece of climate-control apparatus.",
        "source": "Arthur Honegger, Pacific 231 (Mouvement symphonique No. 1), 1923 (IMSLP / Petrucci Music Library)",
        "href": "https://imslp.org/wiki/Pacific_231,_H.53_(Honegger,_Arthur)"
      },
      {
        "category": "artistic",
        "title": "Umberto Boccioni, Unique Forms of Continuity in Space (1913) — VISUAL ARTWORK",
        "excerpt": "Boccioni's striding bronze figure is a human body dissolved into aerodynamic wind and speed, its flesh swelling outward into rippling, sculpted volumes as it forges ahead. This Futurist dream of a body remade by motion anticipates Owens's inflated, air-channeling silhouettes — clothing that swells around the wearer to become a second, dynamic skin.",
        "source": "Umberto Boccioni, Unique Forms of Continuity in Space, 1913 bronze (Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:%27Unique_Forms_of_Continuity_in_Space%27,_1913_bronze_by_Umberto_Boccioni.jpg",
        "image": {
          "src": "/covers/rick-owens-adidas-aircon-tracksuits--art.png",
          "alt": "Umberto Boccioni's 1913 Futurist bronze Unique Forms of Continuity in Space, a striding figure whose body swells into rippling aerodynamic volumes.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 38
  },
  {
    "slug": "guggenheim-strike-threat",
    "headline": "Workers threaten to strike at New York's Guggenheim Museum as the tourist season peaks",
    "overview": "Unionized workers at New York's Guggenheim Museum are threatening to strike at the height of the summer tourist season amid a contract dispute, the museum said. A walkout would disrupt one of the city's busiest cultural institutions.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Artforum",
        "href": "https://www.artforum.com/news/strike-looms-at-guggenheim-at-height-of-tourist-season-1234753765/"
      },
      {
        "name": "Hyperallergic",
        "href": "https://hyperallergic.com/904954/guggenheim-museum-workers-rally-for-fair-contract-in-lunch-break-action/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-30",
    "image": {
      "src": "/covers/guggenheim-strike-threat.png",
      "alt": "The spiral exterior of the Solomon R. Guggenheim Museum in New York.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 30 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The 1894 Pullman Strike",
        "excerpt": "After the Pullman Company refused wage negotiations, workers walked out on May 11, 1894, and the American Railway Union under Eugene V. Debs organized a nationwide boycott of Pullman railway cars that severely disrupted rail traffic until federal troops, an injunction, and the jailing of Debs broke it by mid-July. Like the Guggenheim crews weighing a walkout at the season's peak, the Pullman workers chose the moment of maximum leverage to make a contract grievance impossible to ignore.",
        "source": "National Park Service, Pullman National Historical Park, \"The Strike of 1894\" (nps.gov)",
        "href": "https://www.nps.gov/pull/learn/historyculture/the-strike-of-1894.htm"
      },
      {
        "category": "historical",
        "title": "The 1892 Homestead Strike",
        "excerpt": "The men had hoped for the best all along, but were apprehensive that Mr Frick would not concede anything, or at least would not come to an agreement with the conferees, so when the details of the meeting became noised about the town, preparations for a strike were begun.",
        "source": "Myron R. Stowell, \"Fort Frick,\" or the Siege of Homestead (1893), via Internet Archive",
        "href": "https://archive.org/stream/fortfrickorsiege00stow/fortfrickorsiege00stow_djvu.txt"
      },
      {
        "category": "literary",
        "title": "Émile Zola, Germinal (1885)",
        "excerpt": "The mine ought to belong to the miner, as the sea belongs to the fisherman, and the earth to the peasant. Do you see? The mine belongs to you, to all of you who, for a century, have paid for it with so much blood and misery!",
        "source": "Émile Zola, Germinal, trans. Havelock Ellis (1894), Part Fourth, Ch. 7, Wikisource",
        "href": "https://en.wikisource.org/wiki/Germinal/4/Chapter_7"
      },
      {
        "category": "literary",
        "title": "Marx & Engels, Manifesto of the Communist Party (1848)",
        "excerpt": "Let the ruling classes tremble at a Communistic revolution. The proletarians have nothing to lose but their chains. They have a world to win. Working men of all countries, unite!",
        "source": "Karl Marx & Friedrich Engels, Manifesto of the Communist Party, trans. Samuel Moore (1888), Section IV, Wikisource",
        "href": "https://en.wikisource.org/wiki/Manifesto_of_the_Communist_Party/4"
      },
      {
        "category": "artistic",
        "title": "L'Internationale by Pierre De Geyter — MUSIC",
        "excerpt": "The global anthem of the labor movement, set by Pierre De Geyter to Eugène Pottier's defiant verse, rises as a summons for the workers of the world to stand together and claim their due. Its surging, march-like refrain is the sound of solidarity itself — the exact spirit a unionized museum crew invokes when it threatens to lay down its tools at the busiest hour. To hear it is to feel the collective resolve that turns a contract dispute into a movement.",
        "source": "Pierre De Geyter (music), Eugène Pottier (text), L'Internationale (1888), IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/L'Internationale_(De_Geyter,_Pierre)"
      },
      {
        "category": "artistic",
        "title": "Robert Koehler, The Strike (1886) — VISUAL ARTWORK",
        "excerpt": "Robert Koehler's sweeping canvas freezes the charged instant when laborers down their tools and confront the factory owner on his doorstep — fists clenched, a woman pleading, a man stooping for a stone. First shown in New York days before the Haymarket affair, it became an enduring emblem of working-class grievance and resolve. Its taut standoff between labor and management mirrors the Guggenheim workers' threatened walkout, the moment grievance hardens into collective action.",
        "source": "Robert Koehler, The Strike (1886), oil on canvas, Deutsches Historisches Museum, Berlin; via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:%22Der_Streik%22_von_Robert_Koehler.jpg",
        "image": {
          "src": "/covers/guggenheim-strike-threat--art.png",
          "alt": "Robert Koehler's 1886 painting The Strike, workers confronting a factory owner outside the mill as one man stoops for a stone.",
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
