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
// the Morning Edition of 26 June 2026 (ranks 1-13) leads with its hero story,
// followed by the Evening and Afternoon Editions of 25 June 2026. Stories are
// selected from the live RSS feeds in `lib/feeds.ts`. The analogies are the heart
// of each story: six per event, two per category, each linking to a real
// human-written source (a primary text, museum object page, or archive). Excerpts
// quote the most relevant passage verbatim where the source is public domain, and
// otherwise describe rather than quote. Covers are dithered local copies: feed or
// rights-clean Wikimedia art/photos credited to the source, otherwise an
// AI-generated illustration (credit "AI-generated"). Source links to AP/Reuters
// are Google News redirects (see `lib/feeds.ts`).

const stories: Story[] = [
  {
    "slug": "dea-fentanyl-allowed-on-streets",
    "headline": "Records show the DEA allowed large quantities of fentanyl to reach US streets without intervening",
    "overview": "An Associated Press investigation found that the US Drug Enforcement Administration tracked staggering amounts of fentanyl moving toward American streets over several years but repeatedly took no action to seize it or arrest those responsible. The DEA has since asked its inspector general to investigate the claims that agents allowed the drugs to flow.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMinwFBVV95cUxOaTlFUUlUQzd1SmQ0ZUxnc0hSVEF4SkR0Z2U0MWJacURCNkp6akhDMmQyTU56RmllUmZFbFpPQ1FVeVV5R09oaldhbTRBanMwenpVQXVzSWZXbnZ0bVFJLTVjbUk1UWthd2g0OVRDRnRIZWdRZDJkY2FuX3EwZGlYRE5Nb00tc3FJWVZmaUxNNmlBZjg5TDZibVUzczJ2T1U?oc=5"
      },
      {
        "name": "PBS NewsHour",
        "href": "https://www.pbs.org/newshour/nation/staggering-amounts-of-fentanyl-hit-streets-as-dea-watched-and-took-no-action-records-show"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-26",
    "image": {
      "src": "/covers/dea-fentanyl-allowed-on-streets.png",
      "alt": "A dim evidence room with sealed bags of seized white powder stacked on a steel table under a single overhead lamp",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 26 June 2026",
    "lead": true,
    "rank": 1,
    "analogies": [
      {
        "category": "historical",
        "title": "The Tuskegee Syphilis Study (1932-1972)",
        "excerpt": "For forty years the U.S. Public Health Service tracked the progress of untreated syphilis in roughly 400 African American men in Macon County, Alabama, deliberately withholding care to observe the disease's course. Even after penicillin became a proven cure in the late 1940s, officials kept treatment from the subjects, and dozens died of a disease the government could have stopped. Like agents who watched fentanyl flow rather than seize it, the study shows a federal institution choosing to let a documented harm unfold against the very people it was meant to protect, all in the name of building a longer record.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Tuskegee_Syphilis_Study"
      },
      {
        "category": "historical",
        "title": "The First Opium War and the British Opium Trade (1839-1842)",
        "excerpt": "Through the East India Company, Britain controlled vast poppy plantations in India and funneled some 1,400 tons of opium a year into China, even after Chinese authorities banned the drug. Merchants moored floating warehouses offshore to keep the trade flowing, while corrupt officials on both sides took their cut and a populace sank into addiction. The parallel is stark: institutions positioned to halt a poison instead let it pour into communities, with profit and strategy outweighing the human ruin they could plainly see.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/First_Opium_War"
      },
      {
        "category": "literary",
        "title": "Ezekiel 33:6-8 (King James Bible) - The Watchman",
        "excerpt": "But if the watchman see the sword come, and blow not the trumpet, and the people be not warned; if the sword come, and take any person from among them, he is taken away in his iniquity; but his blood will I require at the watchman's hand. So thou, O son of man, I have set thee a watchman unto the house of Israel; therefore thou shalt hear the word at my mouth, and warn them from me. When I say unto the wicked, O wicked man, thou shalt surely die; if thou dost not speak to warn the wicked from his way, that wicked man shall die in his iniquity; but his blood will I require at thine hand.",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Ezekiel"
      },
      {
        "category": "literary",
        "title": "Homer, The Odyssey, Book IX - The Lotus-Eaters",
        "excerpt": "They started at once, and went about among the Lotus-eaters, who did them no hurt, but gave them to eat of the lotus, which was so delicious that those who ate of it left off caring about home, and did not even want to go back and say what had happened to them, but were for staying and munching lotus with the Lotus-eaters without thinking further of their return; nevertheless, though they wept bitterly I forced them back to the ships and made them fast under the benches.",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/1727/pg1727.txt"
      },
      {
        "category": "artistic",
        "title": "Modest Mussorgsky, Songs and Dances of Death (1875-1877)",
        "excerpt": "In this song cycle, personified Death moves unhurried through ordinary life as a lullaby at a sick child's cradle, a serenade to a fevered girl, a peasant lost in a snowstorm, and a commander surveying a battlefield, always patient and always victorious while the living carry on around it. The music makes a chilling case for harm that advances in plain sight while no one intervenes. It mirrors an agency that tracked a deadly drug coursing toward its citizens yet let Death keep its appointments, counting the toll rather than halting it.",
        "source": "IMSLP",
        "href": "https://imslp.org/wiki/Songs_and_Dances_of_Death_(Mussorgsky,_Modest)"
      },
      {
        "category": "artistic",
        "title": "William Hogarth, Gin Lane (1751)",
        "excerpt": "Hogarth's engraving shows a London parish dissolving under the cheap-gin epidemic: a stupefied mother lets her infant tumble from her arms, corpses are coffined, buildings collapse, and only the pawnbroker, the distiller, and the undertaker prosper while authority is nowhere to be seen. It is a portrait of a populace poisoned while those who profit look on and the state stays absent. The image speaks directly to a regulator that watched the flow of fentanyl and chose not to stem the harm consuming the streets.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Beer_Street_and_Gin_Lane",
        "image": {
          "src": "https://upload.wikimedia.org/wikipedia/commons/1/15/GinLane.jpg",
          "alt": "William Hogarth's 1751 engraving Gin Lane, depicting a London street ravaged by gin addiction, with a drunken mother letting her baby fall, ruined buildings, and figures collapsing in the streets.",
          "credit": "Wikimedia Commons"
        }
      }
    ]
  },
  {
    "slug": "judge-halts-federal-voter-list",
    "headline": "Federal judge halts Trump executive order seeking to build a national voter registration list",
    "overview": "A federal judge blocked a Trump administration executive order that sought to compile a centralized federal list of registered voters, ruling the effort exceeded presidential authority over elections, which the Constitution largely leaves to the states. The order had directed federal agencies to share data toward a national voter roll.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMipgFBVV95cUxQcjd6ei0tejRNVEZlZFFWU3N5WTB3Vm80WE1nVl9JVGFVQmFoSTh5ektaejBnR2pNU1VyQ3h2WW95dnNYb1lZWXdBUmxtU1h3M3h3ejhXM3JCcWFWLS1BaHhXbTNaemx4b0xaR1pCbjBYUHJsdThFdjJEbTBoTGlHZ1Q2aGE5eldkMEp6cC15bnhHNlMtekdWU01od3NkendxUm1jVzVR?oc=5"
      },
      {
        "name": "PBS NewsHour",
        "href": "https://www.pbs.org/newshour/politics/federal-judge-halts-trumps-election-executive-order-seeking-to-create-a-federal-voter-list"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-26",
    "image": {
      "src": "/covers/judge-halts-federal-voter-list.png",
      "alt": "A wooden ballot box on a table in an empty hall, a shaft of cold light from a high window, no signage",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 26 June 2026",
    "rank": 2,
    "analogies": [
      {
        "category": "historical",
        "title": "The Domesday Book (1086)",
        "excerpt": "After the Norman Conquest, William the Conqueror dispatched royal commissioners across England to compile a single, sweeping register of who held what land and owed what dues to the crown. The Domesday Book was an unprecedented act of centralized state record-keeping, binding the population into one authoritative ledger held by the sovereign. Like the blocked voter list, it concentrated knowledge of an entire people in the hands of central power, and contemporaries regarded its verdicts as final and unchallengeable.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Domesday_Book"
      },
      {
        "category": "historical",
        "title": "The Census of Quirinius (6 CE)",
        "excerpt": "When Rome annexed Judaea, Emperor Augustus ordered a census under the governor Quirinius to enroll the population and assess their property for imperial taxation. The registration of a people by central imperial authority provoked the revolt of Judas of Galilee and his Zealots, who refused to be counted by a distant power. The episode shows how the centralized enrollment of citizens has long been felt as an encroachment on local self-rule, the very tension at the heart of the federal voter-list ruling.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Census_of_Quirinius"
      },
      {
        "category": "literary",
        "title": "The Gospel of Luke 2:1",
        "excerpt": "AND it came to pass in those days, that there went out a decree from Cesar Augustus that all the world should be taxed.",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Luke"
      },
      {
        "category": "literary",
        "title": "Franz Kafka, The Trial",
        "excerpt": "Someone must have been telling lies about Josef K., he knew he had done nothing wrong but, one morning, he was arrested.",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/files/7849/7849-h/7849-h.htm"
      },
      {
        "category": "artistic",
        "title": "Verdi, \"Va, pensiero\" from Nabucco (1842)",
        "excerpt": "In Verdi's chorus of the Hebrew slaves, an enrolled and exiled people sings of a homeland lost to a foreign power that has counted, conquered, and uprooted them. The melody became an anthem of a nation longing to govern itself rather than be administered from afar. Its yearning for self-determination echoes the states' insistence that the rolls of their own citizens belong to them, not to a centralized federal authority.",
        "source": "IMSLP",
        "href": "https://imslp.org/wiki/Nabucco_(Verdi,_Giuseppe)"
      },
      {
        "category": "artistic",
        "title": "Pieter Bruegel the Elder, The Census at Bethlehem (1566) (visual artwork)",
        "excerpt": "Bruegel reimagines the biblical census as an ordinary Flemish village in winter, where crowds queue at a tax-collector's window to be registered while life carries on around them. The painting quietly dramatizes the moment a distant authority counts and enrolls an entire population, folding the sacred into a scene of bureaucratic procedure. It captures the unease of being entered into a central register, the same impulse the court found beyond the president's reach.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/The_Census_at_Bethlehem",
        "image": {
          "src": "https://upload.wikimedia.org/wikipedia/commons/6/64/Pieter_Bruegel_der_%C3%84ltere_-_Volksz%C3%A4hlung_zu_Bethlehem.jpg",
          "alt": "Pieter Bruegel the Elder's 1566 painting The Census at Bethlehem, showing villagers gathering in a snowy Flemish town to register for a census.",
          "credit": "Wikimedia Commons"
        }
      }
    ]
  },
  {
    "slug": "us-sanctions-rwanda-gold-refinery",
    "headline": "US sanctions a Rwandan gold refinery it accuses of smuggling minerals looted from Democratic Republic of Congo",
    "overview": "The United States imposed sanctions on a gold refinery in Rwanda that it accuses of laundering minerals smuggled out of the conflict-torn eastern Democratic Republic of Congo. Washington said the trade helps finance armed groups fueling the fighting in the region.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "BBC News",
        "href": "https://www.bbc.co.uk/news/articles/c9d268xy90xo"
      },
      {
        "name": "The Tribune (India)",
        "href": "https://www.tribuneindia.com/news/conflict-minerals/us-sanctions-6-targets-over-conflict-mineral-smuggling-linked-to-rwanda-backed-armed-group-in-eastern-congo"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-26",
    "image": {
      "src": "/covers/us-sanctions-rwanda-gold-refinery.png",
      "alt": "Artisanal miners working in an open mineral pit in eastern Democratic Republic of Congo",
      "credit": "BBC"
    },
    "edition": "Evening Edition · 26 June 2026",
    "rank": 3,
    "analogies": [
      {
        "category": "historical",
        "title": "King Leopold's Red Rubber: Plundering the Congo",
        "excerpt": "Between 1885 and 1908 King Leopold II turned the Congo Free State into a private fortune, nationalizing the land and forcing men, women and children to harvest wild rubber under quotas enforced by the hippo-hide chicotte whip and the rifle. Soldiers severed the hands of the dead, and sometimes the living, as proof that bullets had not been wasted, while Leopold pocketed tens of millions of francs. Then as now, the wealth wrung from Congolese soil flowed outward to finance armed power, leaving devastation behind, the same dynamic the new U.S. sanctions on Gasabo Gold Refinery aim to disrupt.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Atrocities_in_the_Congo_Free_State"
      },
      {
        "category": "historical",
        "title": "Blood Diamonds and the Limits of Sanctions",
        "excerpt": "Through the 1990s, rebel groups such as Sierra Leone's Revolutionary United Front seized diamond mines, extracting some $125 million a year to buy weapons while hacking the limbs from civilians who resisted. The Kimberley Process certification scheme was created in 2002 to keep these conflict stones out of world markets, yet corruption and forged paperwork meant it never fully stemmed the flow. Like conflict diamonds, the smuggled Congolese gold refined in Rwanda shows how a single laundering point can wash war-financing minerals into the legitimate global trade.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Blood_diamond"
      },
      {
        "category": "literary",
        "title": "Joseph Conrad, Heart of Darkness",
        "excerpt": "\"To tear treasure out of the bowels of the land was their desire, with no more moral purpose at the back of it than there is in burglars breaking into a safe.\"",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/files/219/219-h/219-h.htm"
      },
      {
        "category": "literary",
        "title": "Mark Twain, King Leopold's Soliloquy",
        "excerpt": "\"the rubber, the ivory and all the other riches of the land mine—mine solely—and gathered for me by the men, the women and the little children under compulsion of lash and bullet, fire, starvation, mutilation and the halter.\"",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/62739/pg62739-images.html"
      },
      {
        "category": "artistic",
        "title": "Richard Wagner, Das Rheingold",
        "excerpt": "In Wagner's opera the dwarf Alberich renounces love to steal the Rhinegold and forge it into a ring of world-ruling power, and when it is wrested from him he lays a curse so that it brings restless jealousy to whoever holds it and murderous envy to those who do not. The doom is instant: one giant kills another over the gold before the scene is done. It is myth's purest parable of looted treasure that finances violence and corrupts all it touches, the very cycle the sanctions on a Rwandan gold refinery seek to break.",
        "source": "IMSLP",
        "href": "https://imslp.org/wiki/Das_Rheingold,_WWV_86A_(Wagner,_Richard)"
      },
      {
        "category": "artistic",
        "title": "Alice Seeley Harris, Nsala of Wala (1904)",
        "excerpt": "Missionary Alice Seeley Harris photographed Nsala of Wala staring at the small severed hand and foot of his five-year-old daughter Boali, killed when rubber-company guards attacked his village over an unmet quota. Published in Edmund Morel's exposé and reproduced by Mark Twain, the image became one of history's first humanitarian photographs, indicting an economy of extraction paid for in mutilated bodies. It stands as the human face behind every chain of looted minerals that funds armed groups in the Congo.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Nsala_of_Wala",
        "image": {
          "src": "https://upload.wikimedia.org/wikipedia/commons/5/5a/Nsala_of_Wala_in_the_Nsongo_District.jpg",
          "alt": "Black-and-white 1904 photograph of Nsala of Wala seated on a veranda, gazing at the severed hand and foot of his young daughter laid before him, documenting atrocities in King Leopold's Congo Free State.",
          "credit": "Wikimedia Commons"
        }
      }
    ]
  },
  {
    "slug": "sergei-ivanov-putin-ally-dies-73",
    "headline": "Sergei Ivanov, Putin ally and former Russian defense minister, dies at 73",
    "overview": "Sergei Ivanov, a longtime ally of President Vladimir Putin who served as Russia's defense minister and later as his chief of staff, has died at 73, Russian officials said. A former KGB officer, he rose with Putin from the security services and was once seen as a possible successor.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMilwFBVV95cUxNQnVFZUJtWkFlbnBVNTdwOG40MjBxRXJnLTVwS0U0TTF3QlRyLU9Sa09iYUYwNkZydVpBOFRnc0d2dU9NbjVPcHlCUEJqeXNXeEhJYjg5MWNaSF9lZjBzdkxGRGlRM3J4UGVzWUJkZEYzZHVWTzh3aDEzc2ZUWWdoSlI1cDlEUXo3a21MUFpyN1Y3M0FRVDFn?oc=5"
      },
      {
        "name": "The Moscow Times",
        "href": "https://www.themoscowtimes.com/2026/06/26/putins-longtime-ally-sergei-ivanov-dies-at-73-a93111"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-26",
    "image": {
      "src": "/covers/sergei-ivanov-putin-ally-dies-73.png",
      "alt": "Portrait photograph of Sergei Ivanov, former Russian defense minister and Kremlin chief of staff",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 26 June 2026",
    "rank": 4,
    "analogies": [
      {
        "category": "historical",
        "title": "Lavrentiy Beria, Stalin's secret-police chief who outlived his master only briefly",
        "excerpt": "Beria rose through the Soviet security organs to run the NKVD, becoming the most feared instrument of Stalin's power and a Deputy Premier sitting at the very center of the Kremlin. Like Ivanov, he was a security man turned statesman, bound to a single ruler. Yet his story is the dark mirror of the loyal courtier: when Stalin died in 1953 Beria reached for the succession himself, only to be arrested and executed within months. The episode shows how perilous the ground is for the spymaster who lingers near the throne.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Lavrentiy_Beria"
      },
      {
        "category": "historical",
        "title": "Joseph Fouché, Napoleon's Minister of Police and the great survivor",
        "excerpt": "Fouché built and ran Napoleon's ministry of police, weaving a vast web of spies and informants that made him indispensable to the Emperor. A consummate intriguer, he glided from the Revolution through the Consulate, Empire and Restoration, always positioning himself as the right-hand man of power. His career captures the figure Ivanov embodied: the security-service operator who becomes a statesman, prized for his usefulness and his intimate knowledge of how a regime truly keeps its grip.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Joseph_Fouch%C3%A9"
      },
      {
        "category": "literary",
        "title": "Cardinal Wolsey's farewell to greatness in Shakespeare's Henry VIII",
        "excerpt": "Farewell? A long farewell to all my greatness!",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/2258/pg2258.html"
      },
      {
        "category": "literary",
        "title": "Machiavelli on the servant who serves the prince",
        "excerpt": "The first opinion which one forms of a prince, and of his understanding, is by observing the men he has around him",
        "source": "Marxists Internet Archive",
        "href": "https://www.marxists.org/reference/archive/machiavelli/works/prince/ch22.htm"
      },
      {
        "category": "artistic",
        "title": "The Death of Boris from Mussorgsky's opera Boris Godunov",
        "excerpt": "Mussorgsky's opera, public domain since the composer's death in 1881, closes with the dying Tsar Boris summoning his son to give him final counsel before he collapses to tolling bells. It is a profoundly Russian meditation on power, guilt and the anxiety of succession near a ruler's end. The scene resonates with the death of a Kremlin power broker once spoken of as a possible heir, and with the unsettled question of who inherits when a strongman's circle thins.",
        "source": "IMSLP",
        "href": "https://imslp.org/wiki/Boris_Godunov_(Mussorgsky,_Modest)"
      },
      {
        "category": "artistic",
        "title": "Portrait of Cardinal Richelieu by Philippe de Champaigne",
        "excerpt": "Champaigne's full-length portrait, painted around 1633-1640 and now in the National Gallery, London, shows France's all-powerful first minister standing in scarlet robes, the embodiment of the statesman who governs in a sovereign's name. Richelieu was the ultimate eminence behind the throne, and the image distills the gravity and cold authority of the courtier who is the real engine of state. It is a fitting visual epitaph for the kind of indispensable minister Ivanov became.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Portrait_of_Cardinal_Richelieu_(Champaigne,_London)",
        "image": {
          "src": "https://upload.wikimedia.org/wikipedia/commons/6/65/Philippe_de_Champaigne_-_Portrait_de_Cardinal_Richelieu_%28NGL%29.jpg",
          "alt": "Full-length portrait of Cardinal Richelieu in red cardinal's robes standing beside a golden curtain, by Philippe de Champaigne",
          "credit": "Wikimedia Commons"
        }
      }
    ]
  },
  {
    "slug": "netanyahu-faces-ex-general-challenge",
    "headline": "Israel's Netanyahu faces an election challenge from a hawkish former general",
    "overview": "Israeli Prime Minister Benjamin Netanyahu faces a new electoral challenge from a hawkish former general positioning himself as a security-focused alternative ahead of the country's coming election. Polls suggest a tight contest as Netanyahu's long tenure comes under renewed pressure.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMitgFBVV95cUxPNnc1RE1tYk5Fd1dlZFVIeEV3MGgyd01qd2haNTF2YnRkQWFPeGpDQ0FyUEF3ZDQ3TWRwaVdNdmd6YU5lbWJWR3FRM285UkZNa3dYR3hYMzIyUl9HdEVqWm5EdmQ5aUVIeEs2WlIzX2hmbExnZ0dweGUxOFdaWVJjellzNmFkSjdrNW9PYXNZa0lJVHJYM2R2akM1MUNnQnFZWDMxTEhNbmtPaGZaV1ZIM2JON3dLUQ?oc=5"
      },
      {
        "name": "Al-Monitor",
        "href": "https://www.al-monitor.com/originals/2026/06/israels-netanyahu-faces-election-challenge-hawkish-ex-general"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-26",
    "image": {
      "src": "/covers/netanyahu-faces-ex-general-challenge.png",
      "alt": "Portrait photograph of Israeli Prime Minister Benjamin Netanyahu",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 26 June 2026",
    "rank": 5,
    "analogies": [
      {
        "category": "historical",
        "title": "Eisenhower vs. Stevenson, 1952",
        "excerpt": "In 1952 the five-star general Dwight Eisenhower, hero of the Normandy landings, set aside a lifetime of military service to run for president, trading on the prestige of command rather than any record in office. His war-won popularity, distilled into the slogan 'I Like Ike,' carried him past the eloquent governor Adlai Stevenson. Like Eisenkot today, Eisenhower offered voters a soldier's authority as an alternative to career politicians.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/1952_United_States_presidential_election"
      },
      {
        "category": "historical",
        "title": "De Gaulle Returns to Power, 1958",
        "excerpt": "When the Algerian War threatened to topple France's unstable Fourth Republic in 1958, the wartime general Charles de Gaulle emerged from retirement at the president's summons to refound the state. He won a new constitution by referendum and a presidency by an overwhelming mandate, casting himself as the soldier-statesman who could rescue a nation its politicians could not govern. The parallel to a security-focused general stepping forward amid crisis is direct.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Charles_de_Gaulle"
      },
      {
        "category": "literary",
        "title": "Shakespeare, Coriolanus",
        "excerpt": "Shakespeare's tragedy of the Roman war hero who is pressed to seek the consulship dramatizes the unease of a soldier turning to popular politics. Coriolanus recoils from courting the people for their votes: 'I do beseech you / Let me o'erleap that custom, for I cannot / Put on the gown, stand naked, and entreat them / For my wounds' sake to give their suffrage.'",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/files/1535/1535-h/1535-h.htm"
      },
      {
        "category": "literary",
        "title": "Tennyson, Ode on the Death of the Duke of Wellington",
        "excerpt": "Tennyson's elegy for the Duke of Wellington crowns the general who became a statesman, the soldier whose authority outlasted the battlefield. He praises him as 'The statesman-warrior, moderate, resolute, / Whole in himself, a common good.' It is the very image a security-minded ex-general invokes when he asks a nation to trust the soldier over the politician.",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/Maud,_and_other_poems/Ode_on_the_Death_of_the_Duke_of_Wellington"
      },
      {
        "category": "artistic",
        "title": "Beethoven, Wellington's Victory, Op. 91",
        "excerpt": "Beethoven's 'Wellington's Victory,' written to celebrate the general's triumph at Vitoria in 1813, is martial music that turns a soldier's exploits into public spectacle. Opposing armies march in to 'Rule, Britannia!' and 'Malbrough,' cannon and musket fire crash through the orchestra, and a blazing Victory Symphony exalts the commander as national hero. It captures how a battlefield reputation is amplified into the stuff of leadership and acclaim.",
        "source": "IMSLP",
        "href": "https://imslp.org/wiki/Wellingtons_Sieg,_Op.91_(Beethoven,_Ludwig_van)"
      },
      {
        "category": "artistic",
        "title": "Jacques-Louis David, Napoleon Crossing the Alps",
        "excerpt": "David's neoclassical portrait transfigures a general into a destined ruler: Napoleon rears on a wind-whipped charger, cloak streaming, finger pointed toward the heights. The artist idealized a practical mountain crossing into an icon of heroic command, propaganda for a soldier ascending to political power. It is the visual grammar of the warrior who would govern, the same myth a former general courts when he steps into the political arena.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:David_-_Napoleon_crossing_the_Alps_-_Malmaison2.jpg",
        "image": {
          "src": "https://upload.wikimedia.org/wikipedia/commons/f/fd/David_-_Napoleon_crossing_the_Alps_-_Malmaison2.jpg",
          "alt": "Jacques-Louis David's painting Napoleon Crossing the Alps, showing Napoleon in a general's uniform mounted on a rearing horse, cloak billowing, pointing upward toward a mountain pass.",
          "credit": "Wikimedia Commons"
        }
      }
    ]
  },
  {
    "slug": "china-eastern-airbus-a330neo-order",
    "headline": "China Eastern Airlines agrees to buy 25 Airbus A330neo jets at a list price of $9.4 billion",
    "overview": "China Eastern Airlines said it would purchase 25 Airbus A330neo wide-body jets, a deal valued at about $9.4 billion at list prices. The order is a boost for Airbus in the competitive Chinese market and comes as Chinese carriers expand long-haul capacity.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiwgFBVV95cUxOd2FHZnkwMmdZNS1ZQnJyZjQ3VFNPZ0Vvbk1QTThvREVUT21ObV9RUk1GQVg3LW1yQm5PM05MY2FvQ2ZFUmo5RXR1REVxcjZ0VFlxTGI2Szl3YXhwYWt2cndVSHdOTGFzRnc4OF9LQXRCZ1V4eUY2SThRSHdZcFNWeGFDdGJpYU5pMGVDN2w0elg4QWxmV1FXV01yUVM2N0hKRWV1aFE1OUg0UzVIa242ZklBLWtsUEVLRmlxWnBoQms1dw?oc=5"
      },
      {
        "name": "South China Morning Post",
        "href": "https://www.scmp.com/economy/article/3358540/china-eastern-buys-25-a330neo-widebody-jets-domestic-interest-rises-airbus-wings"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-26",
    "image": {
      "src": "/covers/china-eastern-airbus-a330neo-order.png",
      "alt": "An Airbus A330neo wide-body jet on the tarmac",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 26 June 2026",
    "rank": 6,
    "analogies": [
      {
        "category": "historical",
        "title": "The Boeing 307 Stratoliner and the dawn of long-haul commercial flight",
        "excerpt": "When the Boeing 307 Stratoliner entered revenue service with Pan American in July 1940, it became the first airliner with a pressurized cabin, letting passengers cruise serenely above the weather at 20,000 feet. Just as China Eastern now bets on fuel-efficient A330neos to open new intercontinental routes, the Stratoliner embodied the early gamble that wide-bodied long-haul flight could shrink oceans and remake global trade. Only ten were built, yet they pointed the way toward the great pressurized fleets that followed.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Boeing_307_Stratoliner"
      },
      {
        "category": "historical",
        "title": "Cutty Sark and the great clipper trade routes to China",
        "excerpt": "Launched in 1869, the tea clipper Cutty Sark was among the fastest ships of her day, built when British shipyards raced one another to carry China's tea home before rivals. Reaching 17.5 knots, she symbolized national pride in speed and the romance of long ocean trade routes. As China Eastern orders 25 jets to expand long-haul capacity, the parallel holds: great fleets, fierce builder rivalry, and the relentless pursuit of faster passage between continents have always driven commerce.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Cutty_Sark"
      },
      {
        "category": "literary",
        "title": "Daedalus warns Icarus to fly the middle way (Ovid, Metamorphoses Book VIII)",
        "excerpt": "\"My son, I caution you to keep / the middle way, for if your pinions dip / too low the waters may impede your flight; / and if they soar too high the sun may scorch them. / Fly midway.\"",
        "source": "Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0028:book=8:card=183"
      },
      {
        "category": "literary",
        "title": "Tennyson foresees the heavens filled with commerce (Locksley Hall)",
        "excerpt": "\"Saw the heavens fill with commerce, argosies of magic sails, / Pilots of the purple twilight, dropping down with costly bales;\"",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/Locksley_Hall"
      },
      {
        "category": "artistic",
        "title": "Flight of Fancy March (Albert Frederick Marzian, 1914)",
        "excerpt": "Published in New Albany in 1914, at the very dawn of powered flight, Marzian's public-domain Flight of Fancy March set the era's giddy optimism about the air to a brisk parlor-piano tempo. Its title captures the same spirit that drives a great fleet order: the dream of the air as buoyant, forward-marching progress. The piece survives as a six-page score scanned from Mississippi State University's collection.",
        "source": "IMSLP",
        "href": "https://imslp.org/wiki/Flight_of_Fancy_March_(Marzian,_Albert_Frederick)"
      },
      {
        "category": "artistic",
        "title": "Robert Delaunay, Hommage à Blériot (1914)",
        "excerpt": "Delaunay's vast 1914 canvas honors aviator Louis Blériot with whirling solar discs, a spinning propeller, and a biplane circling the Eiffel Tower, fusing modern flight with the pride of a nation. The painting turns the airplane into a radiant emblem of progress and rivalry between makers and countries. It is the perfect visual ancestor of today's headline-grabbing contest for the skies, in which Airbus jets and national fleets become symbols of ascendancy.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Robert_Delaunay,_Hommage_%C3%A0_Bl%C3%A9riot,_1914.jpg",
        "image": {
          "src": "https://upload.wikimedia.org/wikipedia/commons/5/54/Robert_Delaunay%2C_Hommage_%C3%A0_Bl%C3%A9riot%2C_1914.jpg",
          "alt": "Robert Delaunay's 1914 painting Hommage a Bleriot, with swirling colored discs, a propeller, a biplane and the Eiffel Tower celebrating early aviation",
          "credit": "Wikimedia Commons"
        }
      }
    ]
  },
  {
    "slug": "swatch-sues-samsung-watch-faces",
    "headline": "Swatch seeks $170 million from Samsung over watch-face trademark infringement",
    "overview": "Swiss watchmaker Swatch is seeking about $170 million in damages from Samsung, accusing the company of infringing Swatch and Omega trademarks through smartwatch faces sold via Samsung's app store that copy the brands' designs. The case escalates a long-running dispute over digital reproductions of luxury watch dials.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMizwFBVV95cUxPWkxHeGhzZkFPN0tTMVBLc0FacWZwZXZxZ1ZNWENTTHlTMjdfbTVodnhsRnVMckUzR0szWF9WRXJELTBBa3IzTVBuTHg3di1xMm9Jb2dXNENsN3pIUEo4U085R0VoUUNNYnBQQ1hoM05ZVkJhVVBXUkY2Ykk4dE9HXzlDQjR4SE5rWHRsVUJXTVhqelJkY2VmMVd6alZtSTZNeWlfYnU4VkZQWG1maE5SY3k1NTVjT0REMkVQRy1MQ2RBSUVfZTRjMmpKR01GNHc?oc=5"
      },
      {
        "name": "SWI swissinfo.ch",
        "href": "https://www.swissinfo.ch/eng/global-trade/swatch-is-seeking-damages-in-its-legal-dispute-with-samsung/91653872"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-26",
    "image": {
      "src": "/covers/swatch-sues-samsung-watch-faces.png",
      "alt": "An antique marine chronometer and its mechanism resting in a fitted wooden case",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 26 June 2026",
    "rank": 7,
    "analogies": [
      {
        "category": "historical",
        "title": "Han van Meegeren and the forged Vermeers",
        "excerpt": "In the 1930s and 40s Han van Meegeren painted brand-new pictures in the manner of Johannes Vermeer, baking the canvases and washing them with India ink to fake the cracks of age. The leading expert Abraham Bredius hailed his Supper at Emmaus as a genuine Vermeer masterpiece, and the forgery was bought for 520,000 guilders. Like the smartwatch dials that wear another maker's face, van Meegeren's fakes sold not on their own merit but on a borrowed name, until chemical analysis exposed the deception at his 1947 trial.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Han_van_Meegeren"
      },
      {
        "category": "historical",
        "title": "John Harrison and the marine chronometer",
        "excerpt": "After the 1707 Scilly naval disaster, Britain offered a fortune for a way to fix a ship's longitude, a problem that came down to keeping accurate time at sea. The clockmaker John Harrison spent decades perfecting his H4, a watch that on its 1761 Atlantic trial drifted only about a nautical mile off. The Board of Longitude long dismissed his accuracy as luck and withheld the prize, a reminder that the craft of measuring time and the credit owed to its makers have always been hard-won and bitterly contested.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/John_Harrison"
      },
      {
        "category": "literary",
        "title": "Edgar Allan Poe, \"William Wilson\"",
        "excerpt": "His cue, which was to perfect an imitation of myself, lay both in words and in actions; and most admirably did he play his part. My dress it was an easy matter to copy; my gait and general manner, were, without difficulty, appropriated; in spite of his constitutional defect, even my voice did not escape him.",
        "source": "Project Gutenberg",
        "href": "https://gutenberg.net.au/ebooks06/0603401h.html"
      },
      {
        "category": "literary",
        "title": "William Shakespeare, Othello (Iago on \"good name\")",
        "excerpt": "Good name in man and woman, dear my lord, / Is the immediate jewel of their souls. / Who steals my purse steals trash. 'Tis something, nothing; / 'Twas mine, 'tis his, and has been slave to thousands. / But he that filches from me my good name / Robs me of that which not enriches him / And makes me poor indeed.",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/1531/pg1531.txt"
      },
      {
        "category": "artistic",
        "title": "Joseph Haydn, Symphony No. 101 in D major, \"The Clock\"",
        "excerpt": "Haydn's Symphony No. 101 of 1794 earned its nickname from the steady tick-tock of bassoons and pizzicato strings beneath the Andante, a musical clockwork that turns the measurement of time into melody. Where Swatch and Omega prize the precise, hand-built ticking of a Swiss movement, Haydn renders that same regular pulse in sound, the craft of timekeeping reimagined as art rather than counterfeited as a digital dial.",
        "source": "IMSLP",
        "href": "https://imslp.org/wiki/Symphony_No.101_(Haydn,_Joseph)"
      },
      {
        "category": "artistic",
        "title": "Pieter Claesz, Vanitas – Still Life (1625)",
        "excerpt": "In this Dutch vanitas of 1625, Pieter Claesz arranges a toppled glass, an overturned skull and a pocket watch as emblems of fleeting time and earthly vanity. The timepiece, ticking toward death, is the painting's quiet moral center, the very object luxury houses now fight to control in pixels. Four centuries on, a watch face still carries weight far beyond its size, whether painted on canvas or sold through an app store.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Pieter_Claeszoon-_Vanitas_-_Still_Life_(1625,_29,5_x_34,5_cm).JPG",
        "image": {
          "src": "https://upload.wikimedia.org/wikipedia/commons/e/e8/Pieter_Claeszoon-_Vanitas_-_Still_Life_%281625%2C_29%2C5_x_34%2C5_cm%29.JPG",
          "alt": "A 17th-century Dutch vanitas still life by Pieter Claesz showing a skull, an overturned glass roemer, writing implements and a pocket watch on a table.",
          "credit": "Wikimedia Commons"
        }
      }
    ]
  },
  {
    "slug": "kazakhstan-cuts-oil-after-drone-strike",
    "headline": "Kazakhstan cuts oil and gas output after a Ukrainian drone strike on a Russian processing plant",
    "overview": "Kazakhstan reduced output at major oil and gas fields after a drone attack damaged a Russian processing plant that handles Kazakh exports, disrupting flows through shared infrastructure. The strike underscored how the war in Ukraine continues to ripple through Central Asian energy supplies.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMivgFBVV95cUxQUjJmeFhzd2RoQXFXTGlrQnU1aTh5ZHVsOWZtejYwa1lBdHZtRk5iS3hDdHlhWEU3QVhsY0hlenhFaVJXRnVzYll6VnBIYlVQZVREOTRGVS1SWENGYmNCSzFKV1NzejJORW43eVduY1ItZFl6WG45Zm10UUF1TTktZkNWMG5PaDZoZ2tPcGFoZ0l4bDMtUUUwd1l0TklRZXRwV1ZpR2V2UWJTZ0ZCRkhFVVBmWFJ3Rkx4bmgwLVd3?oc=5"
      },
      {
        "name": "OilPrice.com",
        "href": "https://oilprice.com/Latest-Energy-News/World-News/Kazakhstan-Cuts-Gas-Output-after-Drone-Strike-on-Russian-Processing-Plant.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-26",
    "image": {
      "src": "/covers/kazakhstan-cuts-oil-after-drone-strike.png",
      "alt": "An oil and gas processing plant at night with flare stacks burning against a dark sky",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 26 June 2026",
    "rank": 8,
    "analogies": [
      {
        "category": "historical",
        "title": "The 1973 Oil Embargo",
        "excerpt": "In October 1973 the Arab members of OPEC cut production and embargoed exports to nations backing Israel during the Yom Kippur War, slashing Middle East shipments to the West by 60 to 70 percent and sending prices from about $3 to nearly $12 a barrel. The shock proved that oil is not merely a commodity but a weapon, and that a distant war could choke the energy flowing to nations far from the fighting. Just as a strike on an Orenburg processing plant now throttles Kazakh fields, the embargo showed how dependence on shared supply turns conflict into scarcity.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/1973_oil_crisis"
      },
      {
        "category": "historical",
        "title": "The Kuwaiti Oil Fires of 1991",
        "excerpt": "As Iraqi forces retreated from Kuwait in early 1991, they deliberately set ablaze some 600 to 700 oil wells, which burned for roughly ten months and consumed as much as six million barrels of crude a day. The horizon turned black at noon and the desert ran with lakes of fire, a scorched-earth tactic that made the oilfield itself the battlefield. The image of war setting petroleum alight echoes in the fire that erupted at the Russian gas plant, severing the lifeline that feeds Kazakhstan's wells.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Kuwaiti_oil_fires"
      },
      {
        "category": "literary",
        "title": "Oil! by Upton Sinclair (1926)",
        "excerpt": "\"The inside of the earth seemed to burst out through that hole; a roaring and rushing, as Niagara, and a black column shot up into the air, two hundred feet, two hundred and fifty—no one could say for sure—and came thundering down to earth as a mass of thick, black, slimy, slippery fluid.\" Sinclair's account of a gusher captures oil as a violent, living force erupting from the ground—the same raw power that, when its flow is broken at a processing plant, brings entire economies to a halt.",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/70379/pg70379-images.html"
      },
      {
        "category": "literary",
        "title": "America, 1915 by John Gould Fletcher",
        "excerpt": "\"The sun sees engines that rattle and cough, black derricks that wave their arms in arcs aloft, crazy log cabins that topple into the marsh.\" Fletcher's vision of a continent bristling with derricks renders the oilfield as the restless skeleton of modern industry, arms raised toward an indifferent sun. It is that same forest of derricks at Karachaganak that now stands idled, its rhythm broken by a fire hundreds of miles away.",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/66083/pg66083-images.html"
      },
      {
        "category": "artistic",
        "title": "In the Steppes of Central Asia (Borodin, 1880)",
        "excerpt": "Borodin's program note describes the work directly: \"In the silence of the monotonous steppes of Central Asia is heard the unfamiliar sound of a peaceful Russian song. From the distance we hear the approach of horses and camels and the bizarre and melancholy notes of an oriental melody. A caravan approaches, escorted by Russian soldiers, and continues safely on its way through the immense desert. It disappears slowly. The notes of the Russian and Asiatic melodies join in a common harmony, which dies away as the caravan disappears in the distance.\" The piece imagines Russian and Central Asian fates intertwined across the same steppe—a harmony that, today, is jolted as a Russian war and Kazakh oil prove inseparably linked.",
        "source": "IMSLP",
        "href": "https://imslp.org/wiki/In_the_Steppes_of_Central_Asia_(Borodin,_Aleksandr)"
      },
      {
        "category": "artistic",
        "title": "Burning Oil Well at Night, near Rouseville, Pennsylvania by James Hamilton (c. 1861)",
        "excerpt": "Painted in the first years of the American oil rush, Hamilton's canvas shows a Pennsylvania well exploding into a tower of flame against the night, dwarfing the tiny figures who flee its heat. The 1861 Rouseville fire it depicts killed the well's owner and burned for some twenty hours, a reminder that fire and fortune have always traveled together through the oilfields. The blaze prefigures the fire at the Russian processing plant whose smoke now reaches all the way to Kazakhstan's idled fields.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:James_Hamilton_-_Burning_Oil_Well_at_Night_-_Smithsonian.jpg",
        "image": {
          "src": "https://upload.wikimedia.org/wikipedia/commons/0/06/James_Hamilton_-_Burning_Oil_Well_at_Night_-_Smithsonian.jpg",
          "alt": "Oil painting of an oil well erupting in a tall column of fire at night, casting orange light over dark figures and the landscape near Rouseville, Pennsylvania",
          "credit": "Wikimedia Commons"
        }
      }
    ]
  },
  {
    "slug": "anthropic-accuses-alibaba-ai-extraction",
    "headline": "Anthropic accuses Chinese rival Alibaba of illicitly extracting its AI capabilities",
    "overview": "US artificial-intelligence company Anthropic accused Chinese technology giant Alibaba of improperly extracting capabilities from its models, alleging a form of unauthorized copying known as distillation. Alibaba rejected the claim, in the latest flashpoint in the US-China contest over advanced AI.",
    "genre": "Technology",
    "sources": [
      {
        "name": "BBC News",
        "href": "https://www.bbc.co.uk/news/articles/cwyklykn5dwo"
      },
      {
        "name": "Reuters",
        "href": "https://finance.yahoo.com/news/anthropic-says-alibaba-illicitly-extracted-203048057.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-26",
    "image": {
      "src": "/covers/anthropic-accuses-alibaba-ai-extraction.png",
      "alt": "Anthropic chief executive Dario Amodei speaking during an interview",
      "credit": "BBC"
    },
    "edition": "Evening Edition · 26 June 2026",
    "rank": 9,
    "analogies": [
      {
        "category": "historical",
        "title": "Monks smuggle silk's secret into Byzantium (c. 552 AD)",
        "excerpt": "Around 552 AD, two monks approached Emperor Justinian I with an audacious offer: to steal the jealously guarded craft of silk from the East. Having watched Chinese production firsthand, they carried silkworm eggs westward concealed inside hollow bamboo canes, a two-year journey that shattered the Chinese-Persian monopoly. Almost overnight, Constantinople and its rivals could spin their own silk, and an empire's prosperity rested on knowledge quietly extracted from a guarded competitor. The episode prefigures Anthropic's charge that Alibaba covertly siphoned off the closely held capabilities of Claude.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Smuggling_of_silkworm_eggs_into_the_Byzantine_Empire"
      },
      {
        "category": "historical",
        "title": "Robert Fortune steals China's tea secrets for Britain",
        "excerpt": "In 1848 the Scottish botanist Robert Fortune, working for the British East India Company, disguised himself as a Chinese merchant and ventured into forbidden inland provinces to spirit away tea plants, seeds, and the skilled makers who knew the craft. Smuggled out in sealed Wardian cases, the stolen plants and expertise broke China's monopoly and seeded a vast tea industry in British India. It was industrial espionage aimed squarely at a rival power's most valuable technique, exactly the kind of illicit extraction Anthropic alleges Alibaba carried out by harvesting Claude's reasoning and engineering skills.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Robert_Fortune"
      },
      {
        "category": "literary",
        "title": "Prometheus steals fire from Zeus (Hesiod, Works and Days)",
        "excerpt": "Hesiod tells how the gods hid the means of life from mortals until a cunning titan stole it back: \"He hid fire; but that the noble son of Iapetus stole again for men from Zeus.\" The enraged sky-god answers, \"You are glad that you have outwitted me and stolen fire—a great plague to you yourself.\" The theft of a guarded, world-changing power, and the fury of the one robbed, mirrors Anthropic's account of a rival reaching across forbidden lines to seize capabilities it did not earn.",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/files/348/348-h/348-h.htm"
      },
      {
        "category": "literary",
        "title": "Faustus reaches for forbidden, godlike knowledge (Marlowe)",
        "excerpt": "Christopher Marlowe's overreaching scholar dreams of mastering powers never meant for him: \"A sound magician is a mighty god: / Here, Faustus, tire thy brains to gain a deity.\" He imagines that \"All things that move between the quiet poles / Shall be at my command.\" The hunger to obtain a rival's deepest, most dangerous capabilities by any means captures the spirit of the dispute, in which Anthropic says Alibaba sought to acquire Claude's most coveted powers through illegitimate channels.",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/files/779/779-h/779-h.htm"
      },
      {
        "category": "artistic",
        "title": "Paul Dukas, L'apprenti sorcier (The Sorcerer's Apprentice, 1897)",
        "excerpt": "Dukas's whirling 1897 scherzo, built on Goethe's ballad, depicts an apprentice who copies his absent master's enchantment without truly understanding it, commanding a broomstick to fetch water until the spell spirals beyond his control and the workshop floods. The skittering bassoon theme that surges and multiplies dramatizes the peril of borrowing a master's techniques you have not earned. It is the apprentice-copies-the-master fable in sound, echoing the charge that Alibaba imitated Claude's hard-won skills by extracting them wholesale.",
        "source": "IMSLP",
        "href": "https://imslp.org/wiki/L%27apprenti_sorcier_(Dukas,_Paul)"
      },
      {
        "category": "artistic",
        "title": "Heinrich Friedrich Füger, Prometheus Brings Fire to Mankind (1817)",
        "excerpt": "Füger's luminous oil painting shows the titan Prometheus pressing a stolen torch to the breast of newly made humanity, the divine fire glowing against surrounding darkness. The composition glorifies the act of carrying a god's guarded power down to mortals who lacked it. As a visual emblem of forbidden knowledge taken from a superior and handed to a rival, it crystallizes the theme of Anthropic's accusation that its AI capabilities were illicitly extracted.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Heinrich_fueger_1817_prometheus_brings_fire_to_mankind.jpg",
        "image": {
          "src": "https://upload.wikimedia.org/wikipedia/commons/5/5b/Heinrich_fueger_1817_prometheus_brings_fire_to_mankind.jpg",
          "alt": "Painting by Heinrich Friedrich Füger showing Prometheus bringing the stolen fire of the gods to mankind, a glowing torch illuminating a human figure against darkness",
          "credit": "Wikimedia Commons"
        }
      }
    ]
  },
  {
    "slug": "magdeburg-christmas-market-life-sentence",
    "headline": "Saudi doctor sentenced to life for the car-ramming attack on a German Christmas market that killed six",
    "overview": "A German court sentenced a Saudi-born doctor to life in prison for driving a car into a crowded Christmas market in Magdeburg in December 2024, killing six people and injuring hundreds. Judges convicted him of murder and attempted murder in one of Germany's deadliest attacks in years.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiuAFBVV95cUxNTWtKOVBFOS1sWHBLVUsxZlBQa000Rkt1a19FaXlwd3pQbjhuR1ZrLTlKVlo5MUdic3libHB3d2dzX0hfV3p1amh0RG1SOXdxczIzTWNOTWZHYmNsSy1NWUk5TjB2Rk5GRlJLTC02TEdfcGlJZUpYRVYxMmZGMkU1Q0p0ekNySnZJblE3YzF5Tk11MEtneDhpRjJ4RkxoZzV6X1dZcDVpWGEtc2pGem5pdUZzWGdPOVEx?oc=5"
      },
      {
        "name": "ABC News (Associated Press)",
        "href": "https://abcnews.com/International/wireStory/driver-2024-magdeburg-christmas-market-attack-convicted-murder-134232976"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-26",
    "image": {
      "src": "/covers/magdeburg-christmas-market-life-sentence.png",
      "alt": "Floral tributes and candles left in memory of the victims of the Magdeburg Christmas market attack",
      "credit": "BBC"
    },
    "edition": "Evening Edition · 26 June 2026",
    "rank": 10,
    "analogies": [
      {
        "category": "historical",
        "title": "The 2016 Nice truck attack on Bastille Day",
        "excerpt": "On the night of 14 July 2016, as some 30,000 people gathered on the Promenade des Anglais in Nice to watch fireworks for Bastille Day, a heavy cargo truck was deliberately driven more than a kilometre through the crowd, killing 86 people and injuring over 450. As in Magdeburg, an ordinary vehicle turned a public celebration into a killing field in a matter of minutes, and the city was left to mourn families who had come only to share a festival.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/2016_Nice_truck_attack"
      },
      {
        "category": "historical",
        "title": "The St. Bartholomew's Day Massacre, 1572",
        "excerpt": "Days after a royal wedding meant to bring peace had drawn Protestant Huguenots into Paris, targeted killings on the night of 23-24 August 1572 spiralled into mass slaughter, with estimates of the dead ranging from 5,000 to 30,000 across France. The episode shows how an occasion of public gathering and celebration can be turned, with sudden violence, into one of a nation's defining wounds, the memory of which outlasts the perpetrators.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/St._Bartholomew%27s_Day_massacre"
      },
      {
        "category": "literary",
        "title": "Edgar Allan Poe, \"The Masque of the Red Death\"",
        "excerpt": "Poe's tale ends with revellers struck down at the height of their masquerade, the festive walls no protection at all: \"And Darkness and Decay and the Red Death held illimitable dominion over all.\" The line speaks to the horror of death breaking uninvited into a place of celebration, as it did among the lit stalls of a Christmas market.",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/files/1064/1064-h/1064-h.htm"
      },
      {
        "category": "literary",
        "title": "Aeschylus, Agamemnon (Chorus on suffering and wisdom)",
        "excerpt": "The chorus of Aeschylus's tragedy gives ancient voice to grief that judgment cannot undo: \"Zeus, who did ordain / Man by Suffering shall Learn. / So the heart of him, again / Aching with remembered pain, / Bleeds and sleepeth not, until / Wisdom comes against his will.\" It frames the long aftermath of atrocity, the city's sleepless grief that no verdict can entirely answer.",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/files/14417/14417-h/14417-h.htm"
      },
      {
        "category": "artistic",
        "title": "Mozart, Requiem in D minor, K.626 (Lacrimosa)",
        "excerpt": "Mozart's unfinished Requiem turns the liturgy of mourning into music, and its Lacrimosa addresses precisely the scene of a court of judgment: \"Lacrimosa dies illa / Qua resurget ex favilla / Judicandus homo reus\" - \"Full of tears will be that day / When from the ashes shall arise / The guilty man to be judged.\" The plea that follows, \"Pie Jesu Domine, / Dona eis requiem\" (\"Merciful Lord Jesus, grant them rest\"), holds together judgment of the guilty and rest for the dead, the two burdens that fall on a city after such an atrocity.",
        "source": "IMSLP",
        "href": "https://imslp.org/wiki/Requiem_in_D_minor,_K.626_(Mozart,_Wolfgang_Amadeus)"
      },
      {
        "category": "artistic",
        "title": "Francisco Goya, The Third of May 1808 (1814)",
        "excerpt": "Goya's painting depicts the execution of unarmed Madrid civilians by a faceless firing squad, the victims lit by a stark lantern, one figure with arms flung wide above the bodies of the already fallen. Refusing to glorify the killing, Goya fixes our gaze on the terror and dignity of ordinary people destroyed by sudden violence, an image of grief and outrage that resonates with a community mourning its own innocent dead.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/The_Third_of_May_1808",
        "image": {
          "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/El_Tres_de_Mayo%2C_by_Francisco_de_Goya%2C_from_Prado_thin_black_margin.jpg/500px-El_Tres_de_Mayo%2C_by_Francisco_de_Goya%2C_from_Prado_thin_black_margin.jpg",
          "alt": "Goya's The Third of May 1808, showing a man in a white shirt with arms raised before a firing squad at night, lit by a lantern, with the bodies of the dead around him",
          "credit": "Wikimedia Commons"
        }
      }
    ]
  },
  {
    "slug": "ecuador-beats-germany-world-cup",
    "headline": "Ecuador beats Germany 2-1 to reach the World Cup knockout rounds",
    "overview": "Ecuador came from behind to beat Germany 2-1 on a 77th-minute goal by Kendry Plata, advancing to the knockout stage of the 2026 World Cup. Ecuador's president declared a national holiday to celebrate the result.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMilgFBVV95cUxOLTVQbzJWdnNkaDI0bXdYMWNMV1pYTzdodzZiaGZqeTNBZXl0MlhSVk9ja0d2YVRFRDE4dTFOUlJ5bVBrVW9hUF9EZFZBN1lyV3pLSmxpNW9uS2c0LTZzdWU5NUtTNkhBSTA5N2VpMXlxeGJPY0U3UktUSUdkVER6dnZ1Y2FYMWl1QjhQaGFZaUhfOHFBY0E?oc=5"
      },
      {
        "name": "Al Jazeera",
        "href": "https://www.aljazeera.com/sports/2026/6/25/ecuador-edge-germany-2-1-to-squeeze-into-world-cup-last-32"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-26",
    "image": {
      "src": "/covers/ecuador-beats-germany-world-cup.png",
      "alt": "A floodlit football stadium at night with a single ball at the centre circle",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 26 June 2026",
    "rank": 11,
    "analogies": [
      {
        "category": "historical",
        "title": "The Maracanazo: Uruguay stuns Brazil, 1950",
        "excerpt": "On 16 July 1950, before a record 173,850 spectators at the Maracana in Rio de Janeiro, underdog Uruguay came from behind to beat host nation Brazil 2-1 and seize the World Cup, a result so unexpected that Brazilian newspapers had printed victory editions before kickoff. Remembered simply as the Maracanazo, it remains one of football's greatest upsets, just as Ecuador's late comeback over four-time champions Germany silenced the favourites and turned grief in one camp into national jubilation in the other.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Maracanazo"
      },
      {
        "category": "historical",
        "title": "The ancient Olympic Games at Olympia",
        "excerpt": "Traditionally dated to 776 BC, the ancient Olympic Games drew athletes from across the Greek world to the sanctuary of Zeus at Olympia, where victors were crowned with a simple wreath of wild olive yet won fame that spread across city-states and, later, the Roman Empire. A single triumph could become a vehicle for a whole polis to celebrate itself, much as Ecuador's win over Germany prompted President Daniel Noboa to declare a national holiday so an entire country could share in the glory of its champions.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Ancient_Olympic_Games"
      },
      {
        "category": "literary",
        "title": "David answers Goliath (1 Samuel 17:45)",
        "excerpt": "Then said David to the Philistine, Thou comest to me with a sword, and with a spear, and with a shield: but I come to thee in the name of the LORD of hosts, the God of the armies of Israel, whom thou hast defied.",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/1_Samuel"
      },
      {
        "category": "literary",
        "title": "Pindar, Olympian Ode 1",
        "excerpt": "Water is best, and gold, like a blazing fire in the night, stands out supreme of all lordly wealth.",
        "source": "Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0162%3Abook%3DO.%3Apoem%3D1"
      },
      {
        "category": "artistic",
        "title": "Handel, \"See, the Conqu'ring Hero Comes\" (Judas Maccabaeus, HWV 63)",
        "excerpt": "See, the conqu'ring hero comes! Sound the trumpets, beat the drums.",
        "source": "IMSLP",
        "href": "https://imslp.org/wiki/Judas_Maccabaeus,_HWV_63_(Handel,_George_Frideric)"
      },
      {
        "category": "artistic",
        "title": "The Discobolus (Discus Thrower) of Myron",
        "excerpt": "Myron's Discobolus, sculpted around 460-450 BC and known today through Roman copies, freezes an athlete at the coiled instant before release, a body taut with effort yet a face serene with concentration. It is antiquity's enduring emblem of the athletic ideal, the same blend of explosive power and poise that carried Ecuador's underdogs to their stunning victory.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Discobolus",
        "image": {
          "src": "https://upload.wikimedia.org/wikipedia/commons/9/93/Discobolus_in_National_Roman_Museum_Palazzo_Massimo_alle_Terme.JPG",
          "alt": "Marble Roman copy of Myron's Discobolus, an ancient Greek athlete poised to hurl the discus, in the National Roman Museum, Palazzo Massimo alle Terme.",
          "credit": "Wikimedia Commons"
        }
      }
    ]
  },
  {
    "slug": "mel-brooks-turns-100",
    "headline": "Mel Brooks, comedy filmmaker behind 'The Producers' and 'Blazing Saddles,' turns 100",
    "overview": "Mel Brooks, the writer, director and performer behind 'The Producers,' 'Blazing Saddles' and 'Young Frankenstein,' is turning 100. One of the few entertainers to win an Emmy, Grammy, Oscar and Tony, Brooks helped define American screen comedy over more than half a century.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMiiwFBVV95cUxONmw0YmR6eWFvM1h1UGVXQlVMbUFXRXdWMzB2OXJiTzVPNno5cmtUd2xQWjJMaFM0RVN2X01xYUljVWdxZEtRczhDNVFHYXgwdmVHWlB4SGpOLUNnWUlyWmZzZEwtME9UUTFsSVljT2JNWG5yWG5Mb3JvaDdRUktQaGszSUdxZzhBbkhj?oc=5"
      },
      {
        "name": "ABC News",
        "href": "https://abcnews.com/Entertainment/wireStory/happy-birthday-2000-year-man-mel-brooks-turning-134233903"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-26",
    "image": {
      "src": "/covers/mel-brooks-turns-100.png",
      "alt": "Portrait photograph of filmmaker and comedian Mel Brooks",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 26 June 2026",
    "rank": 12,
    "analogies": [
      {
        "category": "historical",
        "title": "The court jester's licensed mockery",
        "excerpt": "For centuries the court jester held a unique privilege: the right to mock and criticize the powerful without punishment, his cap and bells signaling a sanctioned license to wound with wit. Where a courtier risked his head, the fool could deliver unwelcome truths that no one else dared speak. When Philip VI of France lost his fleet in 1340, it fell to his jester to break the news with a joke. Like Brooks aiming Blazing Saddles and The Producers squarely at bigots and tyrants, the jester turned laughter into the one weapon that authority could not easily silence.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Jester"
      },
      {
        "category": "historical",
        "title": "Aristophanes and the comedy that taunted Athens",
        "excerpt": "In fifth-century Athens, Aristophanes weaponized Old Comedy against the demagogue Cleon, ridiculing him relentlessly across plays like The Knights even after Cleon denounced him for slander. With preposterous premises, wordplay and savage satire he pushed the failings of war profiteers and corrupt leaders to absurd conclusions on the public stage. More than two thousand years before Brooks set Nazis singing 'Springtime for Hitler,' Greek comedy had already established laughter as a civic act of defiance against the strong.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Aristophanes"
      },
      {
        "category": "literary",
        "title": "Mark Twain on laughter as humanity's one weapon",
        "excerpt": "In The Mysterious Stranger, Twain's Satan declares: \"For your race, in its poverty, has unquestionably one really effective weapon—laughter. Power, money, persuasion, supplication, persecution—these can lift at a colossal humbug—push it a little—weaken it a little, century by century; but only laughter can blow it to rags and atoms at a blast. Against the assault of laughter nothing can stand.\" It is the credo Brooks lived by, ridiculing tyranny until it shrank to absurdity.",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/files/50109/50109-h/50109-h.htm"
      },
      {
        "category": "literary",
        "title": "Shakespeare's Feste: better a witty fool",
        "excerpt": "In Twelfth Night, the clown Feste turns folly into wisdom: \"Wit, and't be thy will, put me into good fooling! Those wits that think they have thee, do very oft prove fools; and I that am sure I lack thee, may pass for a wise man. For what says Quinapalus? Better a witty fool than a foolish wit. God bless thee, lady!\" Like Brooks, Shakespeare's licensed fool plays the simpleton precisely so he can speak the truths the court cannot bear to hear plainly.",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/1526/pg1526.txt"
      },
      {
        "category": "artistic",
        "title": "Gilbert and Sullivan's The Mikado",
        "excerpt": "Arthur Sullivan and W. S. Gilbert's 1885 Savoy opera dresses its barbs in mock-Japanese costume, but its target is Victorian England's bureaucrats, hypocrites and self-important officials. Ko-Ko, the bumbling Lord High Executioner, sings of a 'little list' of social offenders 'who never would be missed,' skewering arbitrary authority through the safe distance of farce. As with Brooks, the silliness is a smuggler's trick: it lets pointed ridicule of power reach an audience disarmed by song and laughter.",
        "source": "IMSLP",
        "href": "https://imslp.org/wiki/The_Mikado_(Sullivan,_Arthur)"
      },
      {
        "category": "artistic",
        "title": "Jan Matejko, 'Stańczyk' (1862)",
        "excerpt": "Matejko paints Poland's most famous court jester slumped alone in his red motley, brow furrowed, while a royal ball glitters on behind him. He has just heard that Smolensk has fallen to Moscow, and he is the only soul in the room grave enough to grasp the disaster. The image crystallizes the paradox at the heart of Brooks's art: that the fool in cap and bells is often the one who sees, and tells, the truth most clearly.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Jan_Matejko_-_Sta%C5%84czyk_-_Google_Art_Project.jpg",
        "image": {
          "src": "https://upload.wikimedia.org/wikipedia/commons/9/95/Jan_Matejko_-_Sta%C5%84czyk_-_Google_Art_Project.jpg",
          "alt": "Painting of the court jester Stańczyk in red, sitting alone and pensive while a royal ball continues behind him",
          "credit": "Wikimedia Commons"
        }
      }
    ]
  },
  {
    "slug": "nasa-cigar-galaxy-223mp-image",
    "headline": "NASA releases a 223-megapixel image capturing 16.5 million stars in the Cigar Galaxy",
    "overview": "NASA released a sweeping 223-megapixel image of Messier 82, the Cigar Galaxy, resolving some 16.5 million individual stars in one of the most detailed views yet of the galaxy's furious star formation. Astronomers say the starburst, likely triggered by a past galactic encounter, is producing stars far faster than the Milky Way.",
    "genre": "Science",
    "sources": [
      {
        "name": "Colossal",
        "href": "https://www.thisiscolossal.com/2026/06/messier-82-cigar-galaxy-webb-image/"
      },
      {
        "name": "NASA Science — NASA's Webb Pinpoints Millions of Stars Within Cigar Galaxy",
        "href": "https://science.nasa.gov/missions/webb/nasas-webb-pinpoints-millions-of-stars-within-cigar-galaxy/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-26",
    "image": {
      "src": "/covers/nasa-cigar-galaxy-223mp-image.png",
      "alt": "A detailed telescope image of Messier 82, the Cigar Galaxy, resolving millions of individual stars",
      "credit": "NASA"
    },
    "edition": "Evening Edition · 26 June 2026",
    "rank": 13,
    "analogies": [
      {
        "category": "historical",
        "title": "Galileo turns the telescope skyward (Sidereus Nuncius, 1610)",
        "excerpt": "In March 1610 Galileo published Sidereus Nuncius, the first scientific work grounded in telescopic observation. Pointing his crude instrument at the Milky Way, he found that its soft glow dissolved into countless individual stars too faint for the naked eye, declaring the heavens to be a congeries of innumerable stars. Webb's resolving of 16.5 million stars inside M82 is the same revelation across four centuries: a new instrument transforms a luminous smear into a multitude of suns.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Sidereus_Nuncius"
      },
      {
        "category": "historical",
        "title": "Herschel and the construction of the heavens",
        "excerpt": "Building his own giant mirrors in the 1780s, William Herschel surpassed every observatory of his day and resolved into stars many nebulae that had looked merely 'milky' to lesser instruments. By 1786 he had cataloged a thousand nebulae and, in 'On the Construction of the Heavens' (1784), began mapping the very architecture of the Milky Way. His conviction that better optics could turn clouds into stellar multitudes prefigures Webb piercing M82's dust to pinpoint its millions of stars.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/William_Herschel"
      },
      {
        "category": "literary",
        "title": "Walt Whitman, \"When I Heard the Learn'd Astronomer\"",
        "excerpt": "Look'd up in perfect silence at the stars.",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/When_I_Heard_the_Learn'd_Astronomer"
      },
      {
        "category": "literary",
        "title": "Dante, the final line of the Paradiso",
        "excerpt": "L'amor che move il sole e l'altre stelle. (\"The Love that moves the sun and the other stars.\") — the final line of the Divine Comedy, in which Dante's vision reaches the love that turns the heavens.",
        "source": "Wikisource",
        "href": "https://it.wikisource.org/wiki/Divina_Commedia/Paradiso/Canto_XXXIII"
      },
      {
        "category": "artistic",
        "title": "Gustav Holst, \"Neptune, the Mystic\" from The Planets, Op. 32",
        "excerpt": "Holst's suite, premiered in 1918 and long in the public domain, closes with 'Neptune, the Mystic,' where shimmering orchestral textures and a wordless, fading offstage choir conjure the vast cold silence at the edge of the solar system. The music seems to dissolve into the infinite, much as Webb's image opens onto 16.5 million stars receding into the dust of a distant galaxy. It is the sound of the cosmic sublime: immensity made audible, then trailing off beyond the reach of hearing.",
        "source": "IMSLP",
        "href": "https://imslp.org/wiki/The_Planets,_Op.32_(Holst,_Gustav)"
      },
      {
        "category": "artistic",
        "title": "Vincent van Gogh, \"The Starry Night\" (1889)",
        "excerpt": "From the window of his asylum room at Saint-Rémy, van Gogh painted a night sky churning with swollen, radiant stars and a luminous swirl of light over a sleeping village. Its turbulent, spiraling energy uncannily anticipates the eddies of gas, dust, and packed starlight Webb reveals in M82. Both works insist that the heavens are not still but alive with motion and creation.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
        "image": {
          "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1280px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
          "alt": "Vincent van Gogh's 1889 oil painting The Starry Night, showing a swirling blue night sky filled with glowing yellow stars and a crescent moon above a quiet village and dark cypress tree.",
          "credit": "Wikimedia Commons"
        }
      }
    ]
  },
  {
    "slug": "venezuela-earthquakes-235-dead",
    "headline": "Two earthquakes kill at least 235 and injure 4,300 in Venezuela as rescuers search the rubble",
    "overview": "Venezuela's health minister said two powerful earthquakes — a so-called doublet that struck within hours of each other — left around 235 people dead and roughly 4,300 injured along the coast and on the outskirts of Caracas. Rescuers dug through collapsed concrete apartment blocks for survivors as the government appealed for international aid.",
    "genre": "Science",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMipAFBVV95cUxPQUFpX1BxeVRVN1RBaEZmRkVuSXFsclJJQjN2YWlMdnRhaXJnV2ZUNUJkVFJMSEZnSG5ieXl2TUEzQ2FHT0lQNlF5UXlNYUQ4MTVGUEhtMnZHQXVlTEpiWWdEek1DbWpiU29HMm1Rc3Q0Wm1kMmRRNFQ5VEEzMEdYcjFCNlZKVVRHLS1IM2R2b3lHNDkxNnNhRlRnS3R2UTdrbURkNw?oc=5"
      },
      {
        "name": "BBC News",
        "href": "https://www.bbc.co.uk/news/articles/cjegdqw5d3yo"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-26",
    "image": {
      "src": "/covers/venezuela-earthquakes-235-dead.png",
      "alt": "1755 copper engraving of Lisbon in ruins and flames during the Great Earthquake, with tsunami waves wrecking ships in the harbour and panicked figures fleeing in the foreground",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 26 June 2026",
    "lead": true,
    "rank": 14,
    "analogies": [
      {
        "category": "historical",
        "title": "The 1812 Caracas earthquake",
        "excerpt": "On Maundy Thursday, 26 March 1812, a doublet of shocks rupturing the Boconó and San Sebastián faults struck Caracas and La Guaira, killing an estimated 15,000–20,000 people. Royalist clergy called it divine punishment for the independence rebellion, prompting Simón Bolívar's defiant vow that if Nature itself opposed them, they would fight Nature and make it obey. Two centuries later the same coast and capital again face a deadly earthquake doublet.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/1812_Caracas_earthquake"
      },
      {
        "category": "historical",
        "title": "The 1755 Lisbon earthquake",
        "excerpt": "Striking on All Saints' Day, 1 November 1755, the Great Lisbon Earthquake and its tsunami and fires killed tens of thousands and razed roughly 85 percent of the city. The catastrophe shook Enlightenment Europe to its philosophical foundations, inspiring Voltaire, Rousseau and Kant to wrestle with the problem of suffering, and gave rise to modern seismology and earthquake-resistant rebuilding.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/1755_Lisbon_earthquake"
      },
      {
        "category": "literary",
        "title": "Voltaire, Candide (Chapter V — the Lisbon earthquake)",
        "excerpt": "Scarcely had they reached the city, lamenting the death of their benefactor, when they felt the earth tremble under their feet. The sea swelled and foamed in the harbour, and beat to pieces the vessels riding at anchor. Whirlwinds of fire and ashes covered the streets and public places; houses fell, roofs were flung upon the pavements, and the pavements were scattered. Thirty thousand inhabitants of all ages and sexes were crushed under the ruins.",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/files/19942/19942-h/19942-h.htm"
      },
      {
        "category": "literary",
        "title": "The Book of Lamentations (King James Version)",
        "excerpt": "How doth the city sit solitary, that was full of people! how is she become as a widow! she that was great among the nations, and princess among the provinces, how is she become tributary! She weepeth sore in the night, and her tears are on her cheeks: among all her lovers she hath none to comfort her: all her friends have dealt treacherously with her, they are become her enemies.",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Lamentations"
      },
      {
        "category": "artistic",
        "title": "John Martin, The Destruction of Pompeii and Herculaneum (1822)",
        "excerpt": "John Martin's vast 1822 canvas imagines the ground heaving and Vesuvius hurling whirlwinds of fire over a doomed city, its temples and amphitheatre lit by an apocalyptic red glare. Tiny human figures scatter in terror through the foreground, dwarfed by the collapsing architecture and a sea lashed into chaos. The painting captures the same primal dread of a city undone in moments by the earth itself.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Destruction_of_Pompeii_and_Herculaneum.jpg",
        "image": {
          "src": "/covers/venezuela-earthquakes-235-dead--art.png",
          "alt": "John Martin's 1822 painting of Pompeii and Herculaneum destroyed, with Vesuvius erupting fire over collapsing temples while tiny figures flee a storm-tossed shore",
          "credit": "John Martin (1789–1854), Tate, London — via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Chopin, Marche funèbre from Piano Sonata No. 2 in B-flat minor, Op. 35",
        "excerpt": "Chopin's solemn Marche funèbre, the third movement of his 1839 Second Piano Sonata, has become the world's archetypal music of mourning, its heavy tolling chords evoking a slow procession through grief. A tender middle section opens like a brief consolation before the relentless death-tread returns. Its weight of lament mirrors the sorrow of communities digging through rubble for their dead.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Piano_Sonata_No.2,_Op.35_(Chopin,_Fr%C3%A9d%C3%A9ric)"
      }
    ]
  },
  {
    "slug": "trump-seeks-billions-iran-war-funding",
    "headline": "Trump asks Congress for billions in Iran war funding as Senate Republicans reject a war powers resolution",
    "overview": "President Trump asked Congress for billions of dollars to fund continued U.S. military operations against Iran, hours after Senate Republicans rejected a war powers resolution that would have limited his authority to wage the conflict. The request deepened tensions between the White House and lawmakers wary of an open-ended war.",
    "genre": "Politics",
    "sources": [
      {
        "name": "BBC News",
        "href": "https://www.bbc.co.uk/news/articles/c1eydwldzdjo"
      },
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMiqwFBVV95cUxPOGVVZHRmWUdtV2cxbTI0WFpHdVRZSl9RMDV6Z1pEZmZicFlPUG5lTTVrbE9xNHN4VTdmU3Zwd0JHTHU1SExxQ2lRajNrWElUVXB4SzlqREdXZkVsUTJXbm1kUzFnRXQ5LWluSzNGNXRWUkpMa3VuNTRRam5vYjZodWRmZl9lTGs1Y0VoWmtiN2hlU1Z5eHdyUkpma0laLXZtb053bmx4VEs3SXM?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-26",
    "image": {
      "src": "/covers/trump-seeks-billions-iran-war-funding.png",
      "alt": "Peter Paul Rubens's allegorical painting The Consequences of War (1637-1638), in which Mars the god of war is drawn toward destruction as Europe laments amid the wreckage",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 26 June 2026",
    "rank": 15,
    "analogies": [
      {
        "category": "historical",
        "title": "Charles I and Ship Money",
        "excerpt": "The attempt of King Charles I from 1634 onwards to levy ship money during peacetime and extend it to the inland counties of England without parliamentary approval provoked fierce resistance.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Ship_money"
      },
      {
        "category": "historical",
        "title": "The War Powers Resolution of 1973",
        "excerpt": "The War Powers Resolution requires the president to notify Congress within 48 hours of committing armed forces to military action and forbids armed forces from remaining for more than 60 days, with a further 30-day withdrawal period, without congressional authorization for use of military force (AUMF) or a declaration of war by the United States.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/War_Powers_Resolution"
      },
      {
        "category": "literary",
        "title": "The Council of the Achaeans — Homer's Iliad, Book I",
        "excerpt": "Son of Atreus, now I think we shall return home, beaten back again, should we even escape death, if war and pestilence alike are to ravage the Achaeans.",
        "source": "Homer, Iliad (Murray translation), Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0134:book=1:card=53"
      },
      {
        "category": "literary",
        "title": "Shakespeare's Henry V — the king seeks just cause for war",
        "excerpt": "May I with right and conscience make this claim?",
        "source": "William Shakespeare, King Henry V (Act 1, Scene 2), Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/1784/pg1784.html"
      },
      {
        "category": "artistic",
        "title": "Cesare Maccari, Cicero Denounces Catiline in the Roman Senate (1889)",
        "excerpt": "Maccari's celebrated fresco places the viewer inside the Roman Senate as Cicero rises to denounce the conspirator Catiline, who sits alone and shunned at the right. The packed tiers of senators embody an assembly weighing the security of the Republic against the ambitions of a single dangerous man. Painted for the Italian Senate's own Palazzo Madama, it has become the enduring popular image of a legislature confronting the question of war and the state's survival.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Cicero_Denounces_Catiline_in_the_Roman_Senate_by_Cesare_Maccari.png",
        "image": {
          "src": "/covers/trump-seeks-billions-iran-war-funding--art.png",
          "alt": "Cicero stands addressing the assembled senators of Rome while Catiline sits isolated and condemned on the far right",
          "credit": "Cesare Maccari (1840-1919), 1889, via Wikimedia Commons, public domain"
        }
      },
      {
        "category": "artistic",
        "title": "Beethoven, Wellington's Victory (Wellingtons Sieg), Op. 91",
        "excerpt": "Beethoven's 'Battle Symphony' stages an actual war in sound, opening with the rival drums and trumpets of the British and French armies before erupting into cannon-fire, musket volleys, and a clash of national anthems. Composed to mark Wellington's 1813 victory at Vitoria, it concludes with a triumphant victory symphony built on 'God Save the King.' The full scores and parts are freely available in the public domain on IMSLP.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Wellingtons_Sieg,_Op.91_(Beethoven,_Ludwig_van)"
      }
    ]
  },
  {
    "slug": "scotus-revives-asylum-restrictions",
    "headline": "US Supreme Court lets Trump administration revive restrictions barring asylum seekers at the southern border",
    "overview": "The U.S. Supreme Court cleared the way for the Trump administration to reinstate a restrictive policy that bars migrants from applying for asylum while at the U.S.-Mexico border. The justices lifted lower-court orders, ruling that migrants standing on the Mexican side of the border are not entitled to seek asylum.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMilgFBVV95cUxOdWxXMy1BZ3d6OTdfeHNlWHhMLTl2azFpZVBkNG5OQXJZdklWSDN6SndmYUZhZE9SeGZ2M3VWOXZHUUFxZTJKY05xbm9UWFNsc0p0Y1h1UnpuYjB3VDlfWVFfWkJlcjlfcXhGY2JhMlJGc05rSFVLN1RpT3ppR2FrbmJsaFMzUDB0TWNJZmhURlZxTzloUlE?oc=5"
      },
      {
        "name": "SCOTUSblog",
        "href": "https://news.google.com/rss/articles/CBMiswFBVV95cUxOZ0pHajQ1VkU0TWNlVzByejJGX0E2QzFrdHBsRVYzSzlKd2ZYbHI5b0J1bEY2YjQzN3FDcTFJelJKdG1oNkJHZTVSTDFydkxzQXhsdDF1OFRtM3FXUmYtWnRaSGl1VTlJYXhwTjYwc01aX3Zra3NqVnNuSU1SOXFxRklyVVUxUFl0QkR1TFlfSzJtMEtjZllVWWJsRjlFamlSd3l0ZF9CZVV6SGJObGhTVmxLOA?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-26",
    "image": {
      "src": "/covers/scotus-revives-asylum-restrictions.png",
      "alt": "Jewish refugees boarding the German liner MS St. Louis in Hamburg in 1939, fleeing Nazi persecution; the ship was later turned away from Cuba, the United States, and Canada.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 26 June 2026",
    "rank": 16,
    "analogies": [
      {
        "category": "historical",
        "title": "The Voyage of the MS St. Louis (1939)",
        "excerpt": "In May 1939 the German liner St. Louis sailed from Hamburg carrying 937 passengers, most of them Jews fleeing Nazi persecution. Denied landing in Cuba, the ship lingered off the Florida coast in sight of Miami while the United States refused to admit the refugees; Canada too closed its doors. Forced back to Europe, hundreds of those turned away later perished in the Holocaust.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/MS_St._Louis"
      },
      {
        "category": "historical",
        "title": "The Chinese Exclusion Act (1882)",
        "excerpt": "Signed by President Chester A. Arthur on May 6, 1882, the Chinese Exclusion Act prohibited the immigration of Chinese laborers for ten years and barred Chinese already in the country from naturalizing. It was the first major U.S. law to bar an entire national group from the nation's gates, enshrining in statute the closing of the border to a class of strangers deemed unwelcome.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Chinese_Exclusion_Act"
      },
      {
        "category": "literary",
        "title": "The Aeneid, Book I — the Trojan exiles plead for shelter",
        "excerpt": "We wretched Trojans, toss'd on ev'ry shore,\nFrom sea to sea, thy clemency implore.\nForbid the fires our shipping to deface!",
        "source": "Virgil, The Aeneid (trans. John Dryden), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/228/228-h/228-h.htm"
      },
      {
        "category": "literary",
        "title": "The New Colossus by Emma Lazarus (1883)",
        "excerpt": "\"Give me your tired, your poor, / Your huddled masses yearning to breathe free, / The wretched refuse of your teeming shore.\"",
        "source": "Emma Lazarus, \"The New Colossus,\" Wikisource",
        "href": "https://en.wikisource.org/wiki/The_New_Colossus"
      },
      {
        "category": "artistic",
        "title": "The Last of England by Ford Madox Brown (1852–1855)",
        "excerpt": "Ford Madox Brown's tightly framed tondo shows a young emigrant couple huddled at a ship's rail, the white cliffs of England receding behind them in cold sea spray. The wife's gloved hand clasps her husband's, and beneath her shawl a tiny infant's hand is just visible, as the pair set their faces grimly against an uncertain future abroad. Painted as Britain's own poor sailed away in search of refuge, it renders with unsentimental intimacy the human cost of leaving one shore in hope of another.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Ford_Madox_Brown_-_The_Last_of_England_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/scotus-revives-asylum-restrictions--art.png",
          "alt": "A young emigrant couple wrapped in shawls at a ship's rail, the wife clutching a hidden infant's hand, as the English coast fades behind them.",
          "credit": "Ford Madox Brown (1821–1893), Birmingham Museum and Art Gallery, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "\"Va, pensiero\" (Chorus of the Hebrew Slaves) from Verdi's Nabucco",
        "excerpt": "Giuseppe Verdi's 1842 chorus gives voice to the Hebrew captives exiled by the rivers of Babylon, longing for a homeland they can no longer reach. Sung in a sweeping unison line, \"Va, pensiero, sull'ali dorate\" bids their thoughts fly on golden wings back to the hills and shores of their lost country. The IMSLP page offers the public-domain Ricordi score of the opera and this celebrated anthem of the displaced and the dispossessed.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Nabucco_(Verdi,_Giuseppe)"
      }
    ]
  },
  {
    "slug": "iran-iaea-inspectors-access",
    "headline": "Iran agrees to grant UN nuclear inspectors access to its sites under new deal, IAEA chief says",
    "overview": "A new agreement grants International Atomic Energy Agency inspectors access to Iran's nuclear sites, the agency's director general said, restoring monitoring that had been suspended during the recent conflict between Iran and Israel. The deal aims to rebuild verification of Iran's contested nuclear program.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMisgFBVV95cUxQbklORW1hNXYwX1pxRFpuTlVTZ0xTZUJOVXdXcUdScUpoQm1fUGx3NUVMZGh4S0hYelhlTEdUd1dDTzUydU9xWW5kWDZxMnd2U3prZklQSXZjRk1aQ2J2OEt5Wkl4Tm1kaktRRDhxdGJlZjJuWF9VNC1jUkhpT2tqajdWbXNYVUhqVTJZZGdCSnNBV0YwOTRCWVhrWnFHdDdkTm9aTkVTOFhfb1BDM0RBZlFn?oc=5"
      },
      {
        "name": "CNBC",
        "href": "https://news.google.com/rss/articles/CBMiekFVX3lxTE5KZDZGTkRhbXpuRzBCdkh2T1FDdXl3SzIxWGNwUWhKMVVxcU1RbVlTOXo1ODNxWmxmN0FfdGRqQ3lucFNMRnJ3QmNQTVN1eVFnX1BvWnZMMUlJRE1YY2tLM0o3S1JiY3BzQ3lnZklNai0xVGhReG9sdVFB0gF_QVVfeXFMTkFOT09wUTlLU3Q3eVlPOW1oc1VBNnNBVjFEaVIyd3c5LUFheWZaRGoyLTBPQTFwMkpQNG1xZEdPRElOMFdxMmk5eURJdFFzNXBIdy1iZjVQQUZPQy10YUp1bEFuVUVrYzRlS1dFRmhUZXpXakNXU3czMTU2Qzg2MA?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-26",
    "image": {
      "src": "/covers/iran-iaea-inspectors-access.png",
      "alt": "Rembrandt's 1642 painting The Night Watch, depicting a militia company mustering under arms, vigilant in the gloom as their captain steps forward.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 26 June 2026",
    "rank": 17,
    "analogies": [
      {
        "category": "historical",
        "title": "UNSCOM and the inspectors at Iraq's gate (1991-1999)",
        "excerpt": "After the Gulf War, the UN Special Commission was granted unrestricted freedom of movement and the right to unimpeded access to any site in Iraq to verify the dismantling of its weapons programs. Inspectors uncovered concealed stocks, including thousands of litres of botulism toxin and anthrax, even as Baghdad obstructed and disputed their findings. The episode became the modern template for intrusive, on-the-ground arms-control verification.",
        "source": "Wikipedia: United Nations Special Commission",
        "href": "https://en.wikipedia.org/wiki/United_Nations_Special_Commission"
      },
      {
        "category": "historical",
        "title": "INF Treaty on-site inspections (1987)",
        "excerpt": "The 1987 Intermediate-Range Nuclear Forces Treaty required existing missiles to be destroyed and, for the first time between the superpowers, established a protocol for mutual on-site inspection. Soviet inspectors entered weapons storage areas in Britain while American inspectors watched cruise missiles dismantled, a verification regime that ran until 2001. It enshrined the principle that an adversary's word must be checked at the gate.",
        "source": "Wikipedia: Intermediate-Range Nuclear Forces Treaty",
        "href": "https://en.wikipedia.org/wiki/Intermediate-Range_Nuclear_Forces_Treaty"
      },
      {
        "category": "literary",
        "title": "The exhaustive search in Poe's 'The Purloined Letter'",
        "excerpt": "The cushions we probed with the fine long needles you have seen me employ.",
        "source": "Edgar Allan Poe, 'The Purloined Letter' (The Works of Edgar Allan Poe, Vol. 2)",
        "href": "https://www.gutenberg.org/files/2148/2148-h/2148-h.htm"
      },
      {
        "category": "literary",
        "title": "Juvenal: who will guard the guards?",
        "excerpt": "\"Put on a lock and keep your wife indoors.\" Yes, and who will ward the warders?",
        "source": "Juvenal, Satire VI (trans. G. G. Ramsay), Wikisource",
        "href": "https://en.wikisource.org/wiki/Juvenal_and_Persius/The_Satires_of_Juvenal/Satire_6"
      },
      {
        "category": "artistic",
        "title": "Caravaggio, 'The Incredulity of Saint Thomas' (c. 1601-1602)",
        "excerpt": "Caravaggio paints the literal embodiment of trust-but-verify: the doubting apostle Thomas, refusing to take the resurrection on faith, drives his finger into the wound in Christ's side while Jesus guides his hand. Three furrowed, scrutinizing faces lean in under harsh light, intent on direct physical proof. It is verification made flesh, the inspector compelled to see and touch before he will believe.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:The_Incredulity_of_Saint_Thomas-Caravaggio_(1601-2).jpg",
        "image": {
          "src": "/covers/iran-iaea-inspectors-access--art.png",
          "alt": "Caravaggio's painting of Saint Thomas inserting his finger into the wound in the side of the risen Christ, as two other apostles peer closely.",
          "credit": "Caravaggio (1571-1610), via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Bach, 'Wachet auf, ruft uns die Stimme' (Sleepers, Awake!), BWV 140",
        "excerpt": "Bach's 1731 chorale cantata opens with the watchmen's cry ringing from the towers, summoning the sleeping city to vigilance and readiness. Built on Nicolai's hymn and the parable of the wise and foolish virgins, it dramatizes the reward of those who keep watch and stay prepared. Its theme is the night-watchman's vigil, the call to remain alert and open-eyed against what may come.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Wachet_auf,_ruft_uns_die_Stimme,_BWV_140_(Bach,_Johann_Sebastian)"
      }
    ]
  },
  {
    "slug": "ukraine-drone-attack-russian-chemical-plant",
    "headline": "Ukraine launches one of its largest drone attacks on Russia, striking a chemical plant and Crimea",
    "overview": "Russia reported one of the largest Ukrainian drone assaults of the war, with Ukraine striking a Russian chemical plant again and hitting targets across Russian territory and annexed Crimea in a heavy overnight barrage. Russian officials said air defenses intercepted dozens of incoming drones.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMioAFBVV95cUxPWUxKWVVURzlOOExucEtWZmFIbmZKNm44RUNyaE44R1NHVElJbkJUS2t5OGRtSTNORUd0YWNud3E0TDhCMXJxVFZ5cnA3S2k2UWtGT3VfWnB0SW1LZUZ4cEkzOXo2OE15X0hZNEhvekE1U0E0NThmWndtRU9sOV9lQWJ2SVhlZXRwQUllY0xlY2xpaUxRVlFGYnhzazdkZ1JJ?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiwgFBVV95cUxNZ2JtQkJhN0ExTUJVa0JudnJObjRlZm1id1gxQWlLWi1nbHJQblNmRlctSmJkc29QVkJDM1NDV0lEOEFnaDdJS0w1emdqV0k1TFdSczRza2hlbHRpbzRSbHd1aW9PWnBzRmlFTjl6T2xOcHoyNnEzaElmWWdwbXJldG5LTW0wbDZiT0tGWGNON0ZqSHJjN1NhUFRLREJIem9nVTJaU2tUZEVJb3N2d1BrRXcwRUpyMTFLR0JuTUtJTHo5UQ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-26",
    "image": {
      "src": "/covers/ukraine-drone-attack-russian-chemical-plant.png",
      "alt": "John Martin's apocalyptic painting 'The Great Day of His Wrath', showing a city consumed and torn apart by fire and cataclysm under a burning sky.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 26 June 2026",
    "rank": 18,
    "analogies": [
      {
        "category": "historical",
        "title": "The Doolittle Raid carries the war to Japan, 1942",
        "excerpt": "Launched on April 18, 1942, it was the first American air operation to strike the Japanese archipelago. The daring long-range raid, flown off an aircraft carrier far from home, demonstrated that an enemy's homeland was no longer safe from attack and delivered a profound psychological blow deep behind the lines.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Doolittle_Raid"
      },
      {
        "category": "historical",
        "title": "Zeppelin night raids on Britain, 1915–1918",
        "excerpt": "Night raids provided a measure of protection from interceptors and anti-aircraft fire but they greatly complicated navigation and landing. Germany's airships were among the first weapons to carry war from the front to civilians far behind the lines, drifting over Britain under cover of darkness to rain bombs on towns and cities.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/German_bombing_of_Britain,_1914%E2%80%931918"
      },
      {
        "category": "literary",
        "title": "H. G. Wells imagines the airship bombardment of a city, 'The War in the Air' (1908)",
        "excerpt": "Below, they left ruins and blazing conflagrations and heaped and scattered dead; men, women, and children mixed together as though they had been no more than Moors, or Zulus, or Chinese.",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/The_War_in_the_Air/Chapter_VI"
      },
      {
        "category": "literary",
        "title": "Tennyson foresees aerial war, 'Locksley Hall' (1842)",
        "excerpt": "Heard the heavens fill with shouting, and there rain'd a ghastly dew\nFrom the nations' airy navies grappling in the central blue;",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/Locksley_Hall"
      },
      {
        "category": "artistic",
        "title": "John Martin, 'The Destruction of Sodom and Gomorrah' (1852)",
        "excerpt": "Martin's vast canvas shows two cities annihilated by fire and brimstone hurled from the heavens, the buildings dissolving in the heart of a furnace beneath a swirling storm of flame. Fleeing figures in the foreground flee the destruction as lightning strikes the plain. It is one of the great visions in Western art of fire raining from the sky upon a doomed settlement.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:John_Martin_-_Sodom_and_Gomorrah.jpg",
        "image": {
          "src": "/covers/ukraine-drone-attack-russian-chemical-plant--art.png",
          "alt": "Painting of the biblical cities Sodom and Gomorrah engulfed in a towering storm of fire and brimstone falling from a blazing sky, with tiny figures fleeing in the foreground.",
          "credit": "John Martin (1789–1854), The Destruction of Sodom and Gomorrah, 1852, Laing Art Gallery; via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Tchaikovsky, '1812 Overture' (Ouverture solennelle), Op. 49 (1880)",
        "excerpt": "Tchaikovsky's thunderous festival overture commemorates Russia's repulse of an invading army, building from a solemn hymn to a tumult of clashing themes, pealing bells and live cannon fire. The work has become the archetypal musical depiction of bombardment and martial fury, war rendered as a wall of percussive sound. The full score and parts are freely available in the public domain.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/1812_Overture,_Op.49_(Tchaikovsky,_Pyotr)"
      }
    ]
  },
  {
    "slug": "volkswagen-cut-100000-jobs",
    "headline": "Volkswagen CEO plans to cut up to 100,000 jobs and close four German plants, German report says",
    "overview": "Volkswagen chief executive Oliver Blume is targeting cuts of up to 100,000 jobs over the coming years and the closure of four German factories, Manager Magazin reported. The plan, part of a deep cost-cutting drive, would also spin off the core VW brand as the carmaker grapples with weak demand and the costly shift to electric vehicles.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMi1gFBVV95cUxQRmpKMDNaaHdMOHRySUVZR2ExZjUxWllrYnVDUGpVQ1UzMkgzcXFPSXAycVJnSkFITXExNEt4elVaZ1NoUnpBLUJhakZjb1NpWnJaRU9YcnAydGFBVlhDVTJwOVRldk9GS2hwQmhISF8xSENmU1ViUVNHUmlFdkE3WUp2UFhsZEZKOXI5bnZ2dVZ2bnA3SkxBSTlZSjlWNWpsR3pBM3JhWGptZ2ZoMmwtNWJoMVB5TkRPVWhYSzhRVDFVNDMwbksxQUlnQ015cThTRnVjNG5n?oc=5"
      },
      {
        "name": "Automotive News",
        "href": "https://news.google.com/rss/articles/CBMijwFBVV95cUxNcVRyZEhTZ2JsUXNwZkNCcVMxSi1pUy1nU0pLVWZkNXM3WGhCNThfM0NTVlhEbUoxQnotQ2xEYUQ1MzZGNWRLYWdfN05LSFVqNmlmRmtTYWVNYy1fbHFBbWJQV0FJT1lFLUl6QlhldDhhMmZwRGF4U2lvZ04ySENkMk1rQVprenM4dmtGNzJjMA?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-26",
    "image": {
      "src": "/covers/volkswagen-cut-100000-jobs.png",
      "alt": "Adolph Menzel's 1875 painting 'The Iron Rolling Mill (Modern Cyclopes)', showing workers laboring amid fire, smoke and machinery in a 19th-century German foundry",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 26 June 2026",
    "rank": 19,
    "analogies": [
      {
        "category": "historical",
        "title": "The Luddite Uprising (1811-1816)",
        "excerpt": "English textile workers who protested the use of certain types of automated machinery due to concerns relating to worker pay, child labour, working conditions and output quality, organizing raids to destroy the machines that were displacing them.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Luddite"
      },
      {
        "category": "historical",
        "title": "The 1984-1985 UK Miners' Strike and the Death of British Coal",
        "excerpt": "From March 1984 to March 1985, British miners struck against proposed pit closures; the strike ended in a decisive government victory that allowed the closure of most collieries and hastened the collapse of a great industry that once employed hundreds of thousands.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/1984%E2%80%931985_United_Kingdom_miners%27_strike"
      },
      {
        "category": "literary",
        "title": "Charles Dickens, Hard Times (1854)",
        "excerpt": "It was a town of machinery and tall chimneys, out of which interminable serpents of smoke trailed themselves for ever and ever, and never got uncoiled... where the piston of the steam-engine worked monotonously up and down, like the head of an elephant in a state of melancholy madness.",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/ebooks/786"
      },
      {
        "category": "literary",
        "title": "Émile Zola, Germinal (1885)",
        "excerpt": "This pit, piled up in the bottom of a hollow, with its squat brick buildings, raising its chimney like a threatening horn, seemed to him to have the evil air of a gluttonous beast crouching there to devour the earth.",
        "source": "Project Gutenberg (trans. Havelock Ellis)",
        "href": "https://www.gutenberg.org/ebooks/56528"
      },
      {
        "category": "artistic",
        "title": "Robert Koehler, The Strike (Der Streik), 1886",
        "excerpt": "Koehler's vast canvas captures the moment of rupture between labor and capital: angry mill workers crowd before a top-hatted factory owner on his steps, one man stooping to gather a stone. Painted the year of the Haymarket affair, it was the first painting of an industrial strike exhibited in America. The faces register exhaustion, defiance and the dread of a vanishing livelihood.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Robert_Koehler_-_Der_Streik_(1886).jpg",
        "image": {
          "src": "/covers/volkswagen-cut-100000-jobs--art.png",
          "alt": "Robert Koehler's 1886 painting 'The Strike', depicting factory workers confronting a top-hatted employer outside a mill, one worker bending to pick up a stone",
          "credit": "Robert Koehler (1850-1917), Deutsches Historisches Museum, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Alexander Mosolov, Zavod (Iron Foundry), Op. 19 (1926-27)",
        "excerpt": "Mosolov's relentless orchestral movement, the first part of his ballet suite 'Steel', renders the factory itself as music: hammering ostinatos, grinding brass and a shaken metal sheet evoke the pounding of an iron works. A landmark of Soviet machine-age futurism, it celebrates the very industrial din that, a century later, falls silent when the plants close.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Steel,_Op.19_(Mosolov,_Alexander)"
      }
    ]
  },
  {
    "slug": "nyc-board-freezes-rents",
    "headline": "New York rent board approves a two-year freeze on one million regulated apartments, fulfilling Mamdani pledge",
    "overview": "New York City's Rent Guidelines Board voted to freeze rents on roughly one million rent-stabilized apartments for two years, delivering on a central campaign promise by Mayor Zohran Mamdani. Landlord groups condemned the freeze, warning it would deprive aging buildings of funds for maintenance.",
    "genre": "Economy",
    "sources": [
      {
        "name": "BBC News",
        "href": "https://www.bbc.co.uk/news/articles/cn947pxxz4yo"
      },
      {
        "name": "CNN",
        "href": "https://news.google.com/rss/articles/CBMif0FVX3lxTE82QXp5XzNURC0xZ3VxWHN2NTRrRDdKTE5zblY5TkVIYW1tQ2VNVW5tTEpwVHVZVUR3cGpmZDAtZ19RV0p1UldnOE9vbzlEVG43RXJ6eHU0STVaM2F1eXh1dzl4eEc0dENzbEVDbXNYcmllRGk5Qjcxa2RRN0VzUkU?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-26",
    "image": {
      "src": "/covers/nyc-board-freezes-rents.png",
      "alt": "Bandit's Roost, a crowded, squalid tenement alley at 59 1/2 Mulberry Street in New York's Mulberry Bend slum, photographed by Jacob Riis in 1888",
      "credit": "Jacob Riis (1849-1914), via Wikimedia Commons (public domain)"
    },
    "edition": "Afternoon Edition · 26 June 2026",
    "rank": 20,
    "analogies": [
      {
        "category": "historical",
        "title": "Solon's Seisachtheia: the 'shaking off of burdens' in ancient Athens",
        "excerpt": "The seisachtheia laws immediately cancelled all outstanding debts, retroactively emancipated all Athenian previously enslaved debtors, reinstated all confiscated serf property to the hektemoroi, and forbade the use of personal freedom as collateral in all future debts.",
        "source": "Wikipedia, 'Seisachtheia'",
        "href": "https://en.wikipedia.org/wiki/Seisachtheia"
      },
      {
        "category": "historical",
        "title": "The Emergency Price Control Act of 1942 and wartime U.S. rent ceilings",
        "excerpt": "Enacted to halt 'inflationary spiraling,' the Act gave the Office of Price Administration sweeping power over 'Prices, Rents, And Market And Renting Practices,' freezing what landlords could charge across America's defense-housing areas during the Second World War. It is an early federal precedent for the state intervening to cap rents in a moment of crisis, a measure landlords likewise condemned.",
        "source": "Wikipedia, 'Emergency Price Control Act of 1942'",
        "href": "https://en.wikipedia.org/wiki/Emergency_Price_Control_Act_of_1942"
      },
      {
        "category": "literary",
        "title": "Jacob Riis, How the Other Half Lives (1890)",
        "excerpt": "Collect the rent in advance, or, failing, eject the occupants.",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/files/45502/45502-h/45502-h.htm"
      },
      {
        "category": "literary",
        "title": "Maxim Gorky, The Lower Depths (1902)",
        "excerpt": "You take up a whole lot of room for your two rubles a month.",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/files/52468/52468-h/52468-h.htm"
      },
      {
        "category": "artistic",
        "title": "George Bellows, Cliff Dwellers (1913)",
        "excerpt": "In this Ashcan School oil painting, the teeming poor of New York's Lower East Side spill out of their tenements onto stoops, sidewalks, and fire escapes on a sweltering summer day. Laundry flaps overhead and a pushcart vendor hawks his wares amid the crowd, a vision of the overcrowded housing of the people that rent regulation was meant to relieve. The work, exhibited at the 1913 Armory Show, distills the human density behind the era's housing reform debates.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:George_Bellows_-_Cliff_Dwellers_(1913).jpg",
        "image": {
          "src": "/covers/nyc-board-freezes-rents--art.png",
          "alt": "Oil painting of a crowded Lower East Side tenement street, with people packed onto stoops, fire escapes, and sidewalks, laundry strung overhead and a pushcart vendor in the foreground",
          "credit": "George Bellows (1882-1925), Los Angeles County Museum of Art, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Stephen Foster, Hard Times Come Again No More (1854)",
        "excerpt": "Foster's parlor song pleads with the comfortable to pause at the door of the poor and hear their lament, its refrain begging that hard times come again no more. Published in New York in 1854, it became an enduring anthem of compassion for the destitute of the growing American city. Its sympathy for those crushed by want echoes the moral case behind shielding tenants from rising rents.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Hard_Times_Come_Again_No_More_(Foster,_Stephen)"
      }
    ]
  },
  {
    "slug": "scotus-strikes-hawaii-gun-law",
    "headline": "US Supreme Court strikes down Hawaii law requiring a permit to carry guns in stores and hotels",
    "overview": "The U.S. Supreme Court struck down a Hawaii law that required businesses to grant explicit permission before firearms could be carried into stores, hotels and other private establishments. The decision marks a significant expansion of the right to carry firearms in public spaces.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMilgFBVV95cUxQVF9WSjdITWlxaWFSUlNtNHN3THJGaUJDV0YzNE1YalZXa3Z0QmdBa3Q5OElGMFYzMWFTVmhSa0VOX0JzemhoQVRXOGstVnlNNm1rWDIwcmlkbENJLXpSYU5xU2FEOUU0c1cyd1liRllHMS1SNnp4Nkl5TktfYURNWmlRX2tXdzRGLThZNDVQcEpWUG96Rnc?oc=5"
      },
      {
        "name": "The Guardian",
        "href": "https://news.google.com/rss/articles/CBMiggFBVV95cUxPeVZQVWZMd09xSy00RVFsOU9Iemc1LUFic19ZRlZIN2tGVXQ1YlpUMlFuVTZmZENQZ0tIU3kzUG5fUUYxaGItcDBHdm1qc0JXelFLSC1FUy1yd2tTUFd2Y3IxMnlaTTROVHdCQTVwTGVEQktNc0w3M2dZZ2hYV0ZmMHpR?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-26",
    "image": {
      "src": "/covers/scotus-strikes-hawaii-gun-law.png",
      "alt": "The Minute Man, Daniel Chester French's 1874 bronze statue at Concord of an armed colonial militiaman stepping from his plow, musket in hand",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 26 June 2026",
    "rank": 21,
    "analogies": [
      {
        "category": "historical",
        "title": "The Statute of Northampton (1328): going armed in fairs and markets",
        "excerpt": "nor to go nor ride armed by night nor by day, in fairs, markets, nor in the presence of the justices or other ministers",
        "source": "Statute of Northampton 1328 (Wikipedia)",
        "href": "https://en.wikipedia.org/wiki/Statute_of_Northampton"
      },
      {
        "category": "historical",
        "title": "The English Bill of Rights (1689): arms for defence",
        "excerpt": "Protestants may have arms for their defence suitable to their conditions and as allowed by law",
        "source": "Bill of Rights 1689 (Wikipedia)",
        "href": "https://en.wikipedia.org/wiki/Bill_of_Rights_1689"
      },
      {
        "category": "literary",
        "title": "Homer, Iliad, Book 3: the arming of Paris",
        "excerpt": "First he greaved his legs with greaves of good make and fitted with ancle-clasps of silver; after this he donned the cuirass of his brother Lycaon, and fitted it to his own body; he hung his silver-studded sword of bronze about his shoulders, and then his mighty shield. On his comely head he set his helmet, well-wrought, with a crest of horse-hair that nodded menacingly above it, and he grasped a redoubtable spear that suited his hands.",
        "source": "The Iliad of Homer (Samuel Butler trans.), Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Iliad_of_Homer_(Butler)/Book_3"
      },
      {
        "category": "literary",
        "title": "Shakespeare, Henry V: 'Once more unto the breach'",
        "excerpt": "Once more vnto the Breach, Deare friends, once more; Or close the Wall vp with our English dead:",
        "source": "The Life of King Henry the Fifth (First Folio), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/2253/2253-h/2253-h.htm"
      },
      {
        "category": "artistic",
        "title": "Peter Paul Rubens, David Slaying Goliath (1616)",
        "excerpt": "Rubens captures the instant the shepherd David, sling still in hand, overcomes the fallen giant warrior Goliath, a study in the citizen who meets armed force with a humble weapon. The muscular, twisting composition makes the act of bearing and wielding arms its violent center. The canvas hangs in the Norton Simon Museum and is in the public domain.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:David_Slaying_Goliath_by_Peter_Paul_Rubens.jpg",
        "image": {
          "src": "/covers/scotus-strikes-hawaii-gun-law--art.png",
          "alt": "Rubens's painting of David, sling in hand, standing over the slain giant Goliath",
          "credit": "Peter Paul Rubens (1577–1640), via Wikimedia Commons, public domain"
        }
      },
      {
        "category": "artistic",
        "title": "Gustav Holst, 'Mars, the Bringer of War' from The Planets, Op. 32",
        "excerpt": "Holst's relentless five-beat ostinato and braying brass turn the opening movement of The Planets into a portrait of mechanized, advancing war. Composed 1914–1916 and now in the public domain, the music renders the armed man not as a hero but as an implacable, grinding force. Full scores and parts are freely available on the Petrucci Music Library.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/The_Planets,_Op.32_(Holst,_Gustav)"
      }
    ]
  },
  {
    "slug": "europe-heatwave-climate-attribution",
    "headline": "Scientists find Europe's record June heatwave was made far more likely by climate change",
    "overview": "A rapid attribution study by climate scientists concluded that Europe's deadly June heatwave, which set temperature records across Britain, Switzerland and beyond, would have been virtually impossible without human-caused climate change. Researchers said warming made the extreme heat several degrees hotter and far more frequent.",
    "genre": "Climate",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiygFBVV95cUxOa0M1dVdRTjNTSDlXLU5XaEVxUzBaSUU0eG80UWdYZVlIaWtHYWVIdHctMXhlWlZlU2JJYm84VGVOaUxKVDZIVTU2N1MyLUdVdW5ldy1uZGNYWktuQ1p3ZzY0aVZJYTZCcnYtaGlIbndob0xmUUJZY1FqN1ZxZXRuUTVtaGNrMUNxaFdtaTR4ek1PZHZUd285YW5OSFNoLWJYR3p0ZGZaYVZwWURPa1hnR2oyMUhPX0E2WTZiYkVnSlNNbWN2U2RocEFB?oc=5"
      },
      {
        "name": "The Guardian",
        "href": "https://news.google.com/rss/articles/CBMisgFBVV95cUxNTXlxU2h5YWV6dXUwSHE3c0RidkpRUDBqYWFCeEZNd3BuSnhEUzFNYWI2UHpFLTFRZnZ5MFJPZTljTVY0T2RMblltNXJSZnpnQlhxQzA3MDJZU0pWRFllelIyTEg3UWdpTkxOWHBvbGhqZkNQOFVQcnI0Qy1zbTZqOGVud29QSHY3d1Yza0VwS3VnRkFlMTk5VzEzbGhWeXVsVGFRNF9vQTNFTTBaQmI2WTJR?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-26",
    "image": {
      "src": "/covers/europe-heatwave-climate-attribution.png",
      "alt": "Vincent van Gogh's 1888 painting 'The Harvest' (De oogst), showing golden wheat fields baking under the brilliant summer sun of Provence near Arles.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 26 June 2026",
    "rank": 22,
    "analogies": [
      {
        "category": "historical",
        "title": "The 2003 European heatwave",
        "excerpt": "The summer of 2003 brought Europe its hottest weather since at least 1540 and killed an estimated 70,000 people, a disaster later studied as one of the first heat events shown by attribution science to have been made far more likely by human-caused warming. It stands as the grim precedent against which each new record-breaking summer is now measured.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/2003_European_heat_wave"
      },
      {
        "category": "historical",
        "title": "The Dust Bowl of the 1930s",
        "excerpt": "Severe drought and reckless ploughing of the Great Plains stripped away the topsoil, raising vast black blizzards of dust that buried farms and drove families from the land throughout the 1930s. It remains the archetype of a parched, ruined country in which human action and a punishing sky combined to make catastrophe.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Dust_Bowl"
      },
      {
        "category": "literary",
        "title": "Phaethon scorches the earth (Ovid, Metamorphoses II)",
        "excerpt": "Great cities perish with their walls, / and peopled nations are consumed to dust.",
        "source": "Ovid, Metamorphoses, Book II (trans. Brookes More)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.02.0028%3Abook%3D2"
      },
      {
        "category": "literary",
        "title": "Cassandra's prophecy unheeded (Aeschylus, Agamemnon)",
        "excerpt": "I say thou shalt look upon Agamemnon dead.",
        "source": "Aeschylus, Agamemnon (trans. Herbert Weir Smyth, 1926)",
        "href": "https://en.wikisource.org/wiki/Aeschylus_(Smyth_1926)_v2/Agamemnon"
      },
      {
        "category": "artistic",
        "title": "The Fall of Phaeton — Peter Paul Rubens (c. 1604–1605)",
        "excerpt": "Rubens paints the very instant the boy Phaethon loses control of the sun's chariot, his horses plunging amid a blaze of fire and writhing bodies as the heavens themselves recoil. The scene renders the ancient warning made vivid: a world set alight when a mortal seizes powers over the sun he cannot govern.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Peter_Paul_Rubens_-_The_Fall_of_Phaeton_(National_Gallery_of_Art).jpg",
        "image": {
          "src": "/covers/europe-heatwave-climate-attribution--art.png",
          "alt": "Baroque painting of Phaethon falling from the blazing chariot of the sun amid panicked horses and tumbling figures against a fiery sky.",
          "credit": "Peter Paul Rubens, National Gallery of Art, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "'Summer' (L'estate) from Vivaldi's The Four Seasons, RV 315",
        "excerpt": "Vivaldi's Concerto No. 2 in G minor evokes a land languishing under a merciless sun, its opening movement marked by drooping heat and exhaustion before a violent thunderstorm breaks. The accompanying sonnet describes scorched flocks and a shepherd trembling at the approaching tempest, a Baroque portrait of summer's oppressive, dangerous power.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/The_Four_Seasons_(Vivaldi,_Antonio)"
      }
    ]
  },
  {
    "slug": "italy-probes-microsoft-365-price-hike",
    "headline": "Italy's antitrust regulator opens an investigation into Microsoft over its Microsoft 365 price increases",
    "overview": "Italy's competition watchdog opened a probe into Microsoft over price increases for its Microsoft 365 software suite tied to the integration of its Copilot AI features. Regulators are examining whether bundling the AI tools into higher-priced plans harms consumers.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMipwFBVV95cUxQcmR2NXI4RklGVFZIRXRlTC1Dcndyc1VaVWJLQlRmcmt3dTRDTHdqSTFLU2NNVmdxcXFPOHE4ckJGU2FDMnhsMFhMeEJBc2VIelBvYWZUdVVJdDB3Q3BUZER6aVVEbmNEcEVuM2Zycy1VbllhcU14MG9uYUtXRkd6NzNvVXJ3ZUF3YVVNUm1QUmtMMmp0ZW8xbVU5UGRsU0hfMHpWNlIydw?oc=5"
      },
      {
        "name": "Seeking Alpha",
        "href": "https://news.google.com/rss/articles/CBMirgFBVV95cUxNT2M0Z2daeHFDeHViYy1MN3RuTzlYeGY4TktqeURCUldDenE2UjNUN0FqeG5WTENIYnpRS041Zl9tV2lJbmRFNWRuWWVLZGhBU3NLaDZyZlVnVlFnb2loUTloWURubkRQMUQwUm5uUjBDUEl2R1hqVVVjdnk2VllHNktjcHBteVNuSWpqRDAtS29TZml5RDdRajlLdi02bEdkNDVyZ2Rrd3Vub3hlSkE?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-26",
    "image": {
      "src": "/covers/italy-probes-microsoft-365-price-hike.png",
      "alt": "1904 political cartoon depicting Standard Oil as a giant octopus, its steel tentacles gripping Congress, state houses, the steel and copper industries, and reaching toward the White House",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 26 June 2026",
    "rank": 23,
    "analogies": [
      {
        "category": "historical",
        "title": "Standard Oil broken up by the Supreme Court (1911)",
        "excerpt": "The U.S. Supreme Court ruled that John D. Rockefeller's Standard Oil had illegally monopolized the American petroleum industry and ordered the company to break itself up into 34 separate firms, the landmark application of the Sherman Antitrust Act against a dominant trust.",
        "source": "Wikipedia — Standard Oil Co. of New Jersey v. United States",
        "href": "https://en.wikipedia.org/wiki/Standard_Oil_Co._of_New_Jersey_v._United_States"
      },
      {
        "category": "historical",
        "title": "United States v. Microsoft (1998–2001)",
        "excerpt": "The U.S. government's earlier antitrust case against Microsoft turned on whether the company was allowed to bundle its Internet Explorer web browser with the Windows operating system, an alleged tying arrangement used to leverage one monopoly into a neighboring market. The case nearly resulted in the company's breakup.",
        "source": "Wikipedia — United States v. Microsoft Corp.",
        "href": "https://en.wikipedia.org/wiki/United_States_v._Microsoft_Corp."
      },
      {
        "category": "literary",
        "title": "Frank Norris, The Octopus: A Story of California (1901)",
        "excerpt": "the galloping monster, the terror of steel and steam, with its single eye, cyclopean, red, shooting from horizon to horizon; but saw it now as the symbol of a vast power, huge, terrible, flinging the echo of its thunder over all the reaches of the valley, leaving blood and destruction in its path; the leviathan, with tentacles of steel clutching into the soil, the soulless Force, the iron-hearted Power, the monster, the Colossus, the Octopus.",
        "source": "Project Gutenberg — The Octopus by Frank Norris",
        "href": "https://www.gutenberg.org/files/268/268-h/268-h.htm"
      },
      {
        "category": "literary",
        "title": "Frank Norris, The Pit: A Story of Chicago (1903)",
        "excerpt": "It can't be done; first, for the reason that there is a great harvest of wheat somewhere in the world for every month in the year; and, second, because the smart man who runs the corner has every other smart man in the world against him.",
        "source": "Project Gutenberg — The Pit by Frank Norris",
        "href": "https://www.gutenberg.org/cache/epub/4382/pg4382-images.html"
      },
      {
        "category": "artistic",
        "title": "Joseph Keppler, 'The Bosses of the Senate' (Puck, 1889)",
        "excerpt": "Bloated trust magnates, their bodies swollen into giant money bags labeled steel, copper, oil, iron, sugar and tin, loom over the tiny senators of the 50th Congress. Above them a sign declares this 'the Senate of the Monopolists, by the Monopolists, for the Monopolists,' while the gallery marked 'People's Entrance' stands bolted and barred. Recognized as an early antitrust image, it helped feed the public mood that produced the Sherman Antitrust Act.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:The_Bosses_of_the_Senate_by_Joseph_Keppler.jpg",
        "image": {
          "src": "/covers/italy-probes-microsoft-365-price-hike--art.png",
          "alt": "Political cartoon showing corporate trusts as enormous money-bag figures towering over diminutive U.S. senators, with the people's gallery entrance barred shut",
          "credit": "Joseph Keppler, Puck, 1889 — Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Richard Wagner, Das Rheingold, WWV 86A (1869)",
        "excerpt": "The opening drama of Wagner's Ring cycle stages the primal myth of greed and power: the dwarf Alberich renounces love to seize the Rhinegold and forge a ring that promises mastery of the world, while the giants who built Valhalla demand their payment and the gods scheme to keep the hoard. It is an allegory of accumulation without limit, in which whoever monopolizes the treasure is cursed by the very power it confers.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Das_Rheingold,_WWV_86A_(Wagner,_Richard)"
      }
    ]
  },
  {
    "slug": "spacex-starlink-mobile-us-consumers",
    "headline": "SpaceX plans to sell Starlink mobile phone service directly to US consumers, Financial Times reports",
    "overview": "Elon Musk's SpaceX is preparing to push its Starlink satellite service into the U.S. consumer mobile market, the Financial Times reported, aiming to offer phone connectivity from space that bypasses traditional cellular carriers. The move would put SpaceX in direct competition with the major U.S. mobile network operators.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMi0wFBVV95cUxOSkdfekMzbXFsVjJKT3dEWGdLN1hBRDMwNnBJdk54OEppVERtcHhmMUZlS0ZVSXQxSTFCWkVLZmk0ZWVYdFMyeVhJbVRKc3gwaE1UbGdDckQtUUtkUFNRZXVkUm5NNVNRWm1OYndacXBTYklRQnpFQ3FxeWl5YlY1a1dDX0Znbl9iYXdoNWotVUkwR2FubVo5Mk9PSUxoMXdHTVJTcnI0MGM0cmZ2QjZ2UlYzc0J3UUNqd0l6QkVva2REX2FWbWl2dTYtOTQ2emdpMTBn?oc=5"
      },
      {
        "name": "Financial Times",
        "href": "https://news.google.com/rss/articles/CBMicEFVX3lxTFBRN2paclZ1aHEzTU1vd0l4eHhPd0tQd2ZEdDBkSzViRnBEZGRZZ2g0RGFFd3lqdGpsVjZGMTRkakNDdkNQdGZGUTgyZlVkUVpsNUNMUU1JUE8ybDNjNUxQbV93R1N0Vl9NZTJvc3FDRTE?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-26",
    "image": {
      "src": "/covers/spacex-starlink-mobile-us-consumers.png",
      "alt": "1865 Harper's Weekly wood engraving celebrating the Atlantic telegraph cable, with the steamship Great Eastern at center and the line from A Midsummer Night's Dream, 'I'll put a girdle round the earth in forty minutes.'",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 26 June 2026",
    "rank": 24,
    "analogies": [
      {
        "category": "historical",
        "title": "The first transatlantic telegraph cable (1858/1866)",
        "excerpt": "Europe and America are united by telegraph.",
        "source": "Wikipedia: Transatlantic telegraph cable",
        "href": "https://en.wikipedia.org/wiki/Transatlantic_telegraph_cable"
      },
      {
        "category": "historical",
        "title": "The first transcontinental telegraph (1861)",
        "excerpt": "The completion of the line immediately made the Pony Express obsolete, which officially ceased operations two days later, as California Chief Justice Stephen Field telegraphed President Lincoln to pledge the state's loyalty to the Union.",
        "source": "Wikipedia: First transcontinental telegraph",
        "href": "https://en.wikipedia.org/wiki/First_transcontinental_telegraph"
      },
      {
        "category": "literary",
        "title": "Rudyard Kipling, 'The Deep-Sea Cables' (1893)",
        "excerpt": "They have wakened the timeless Things; they have killed their father Time; / Joining hands in the gloom, a league from the last of the sun. / Hush! Men talk to-day o'er the waste of the ultimate slime, / And a new Word runs between: whispering, 'Let us be one!'",
        "source": "Wikisource: A Song of the English (1909)",
        "href": "https://en.wikisource.org/wiki/A_Song_of_the_English_(1909)/The_Deep-Sea_Cables"
      },
      {
        "category": "literary",
        "title": "E. M. Forster, 'The Machine Stops' (1909)",
        "excerpt": "She could not be sure, for the Machine did not transmit nuances of expression. It only gave a general idea of people—an idea that was good enough for all practical purposes, Vashti thought.",
        "source": "Wikisource: The Machine Stops, Chapter I",
        "href": "https://en.wikisource.org/wiki/The_Machine_Stops/Chapter_I"
      },
      {
        "category": "artistic",
        "title": "'The Laying of the Cable—John and Jonathan Joining Hands' (1858)",
        "excerpt": "A jubilant 1858 woodcut shows John Bull and Brother Jonathan—Britain and America—clasping hands across a stormy ocean to celebrate the completed transatlantic cable. Behind them ride the Niagara and the Agamemnon, the very ships that paid out the line, while the figures exchange words of friendship and lasting peace. It is the abolition of distance rendered as a handshake between two shores.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:The_laying_of_the_cable--John_and_Jonathan_joining_hands_LCCN2004665357.jpg",
        "image": {
          "src": "/covers/spacex-starlink-mobile-us-consumers--art.png",
          "alt": "1858 woodcut of John Bull and Brother Jonathan shaking hands across the Atlantic over the newly laid telegraph cable, with the cable-laying steamships in the background.",
          "credit": "Popular Graphic Arts / Library of Congress, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Joseph Haydn, 'The Heavens Are Telling' from Die Schöpfung (1798)",
        "excerpt": "The triumphant chorus 'Die Himmel erzählen die Ehre Gottes'—The heavens are telling the glory of God—crowns Part I of Haydn's oratorio The Creation, setting Psalm 19 as a hymn to the firmament. Voices and orchestra surge skyward, the soloists answering one another as day speaks to day across the vault of heaven. Long in the public domain, it is music of the sky itself proclaiming a message across distance.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Die_Sch%C3%B6pfung,_Hob.XXI:2_(Haydn,_Joseph)"
      }
    ]
  },
  {
    "slug": "david-clayton-thomas-dies-84",
    "headline": "David Clayton-Thomas, lead singer of Blood, Sweat & Tears, dies at 84",
    "overview": "David Clayton-Thomas, the powerhouse Canadian vocalist who fronted Blood, Sweat & Tears and sang the band's hits \"Spinning Wheel\" and \"You've Made Me So Very Happy,\" has died at 84. His gritty, soulful voice helped define the jazz-rock sound of the late 1960s.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMimwFBVV95cUxNbFM0dk5OTFZ4c2YxMm9SSUs5Smp0SXlVZC1MRTZyemdELXdxMWYtZHVoVWNoNVctMV96UUZTdEJmdlZvSUo3Z2M5elEzdzNvaGdFREhVT0dpcTNKUUI4YkxvWGZwcWdZTEhfOFd3SlpiUU9BYTUtUXJxN0RvblN6WDVfYnljU3lIU28wUlpKOFdOSjluLWlZSE9SVQ?oc=5"
      },
      {
        "name": "Variety",
        "href": "https://news.google.com/rss/articles/CBMilgFBVV95cUxPaERHcDRtVlNFb0dZRWhYQzBkcGlaeFlUNUplS284SkNSWWFMQ2ZOY1l5ZDVXQnBGMUEwbkQ5UmVxbG8xX1haWXJabER2Nm9CLUhIVEIzblA4OFJ4ak9LUUgtY2J5OG95UkR3djdldU1aMVlyQ1V4MmdlajZFVmE3NnhzMWhmcms0bjIydnVsdC1pb3FtMkE?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-26",
    "image": {
      "src": "/covers/david-clayton-thomas-dies-84.png",
      "alt": "Edward Burne-Jones's painting The Wheel of Fortune, in which a towering figure of Fortune turns a great wheel bearing the bound figures of a slave, a king, and a poet as they rise and fall",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 26 June 2026",
    "rank": 25,
    "analogies": [
      {
        "category": "historical",
        "title": "The death of Farinelli, greatest voice of his age",
        "excerpt": "Carlo Broschi, known as Farinelli (1705–1782), was the most celebrated castrato of the eighteenth century, a singer whose voice could hold a Spanish king spellbound and who reigned over the opera houses of Europe before retiring to a villa near Bologna, where the aging Mozart came to pay homage. His death silenced a voice so rare that no instrument has ever fully reproduced it, a reminder that the most extraordinary singers carry their art irrecoverably into the grave.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Farinelli"
      },
      {
        "category": "historical",
        "title": "The birth of jazz, a fusion of traditions",
        "excerpt": "Its roots are in blues, ragtime, European harmony, African rhythmic rituals, spirituals, hymns, marches, vaudeville song, and dance music.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Jazz"
      },
      {
        "category": "literary",
        "title": "Shelley's elegy for a dead singer of verse",
        "excerpt": "I weep for Adonais—he is dead!",
        "source": "Wikisource — Percy Bysshe Shelley, Adonais",
        "href": "https://en.wikisource.org/wiki/Adonais"
      },
      {
        "category": "literary",
        "title": "Boethius and the turning Wheel of Fortune",
        "excerpt": "I turn the wheel that spins. I delight to see the high come down and the low ascend.",
        "source": "Project Gutenberg — Boethius, The Consolation of Philosophy (trans. H. R. James)",
        "href": "https://www.gutenberg.org/files/14328/14328-h/14328-h.htm"
      },
      {
        "category": "artistic",
        "title": "Gustave Moreau, Orpheus (1865)",
        "excerpt": "Gustave Moreau's dreamlike canvas shows a Thracian maiden cradling the severed head of Orpheus, still resting upon his lyre after the singer has been torn apart, his music outliving his body. The fallen poet-musician, whose song once charmed beasts and stones and moved the gods of the underworld, becomes here an emblem of the voice that death cannot wholly silence. It is a meditation on the mortality of the artist and the strange survival of his song.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Gustave_Moreau_-_Orpheus_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/david-clayton-thomas-dies-84--art.png",
          "alt": "A young woman tenderly holds the severed head of Orpheus resting on his lyre against a mountainous landscape",
          "credit": "Gustave Moreau (1826–1898), Musée d'Orsay, via Google Art Project / Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Gluck, Orfeo ed Euridice (1762)",
        "excerpt": "Christoph Willibald Gluck's reform opera dramatizes the archetypal myth of the singer whose art can pierce death itself, as Orpheus descends to the underworld to reclaim his lost Euridice through the sheer power of his voice. Its famous lament Che farò senza Euridice gives music to the grief of irreplaceable loss, the silence left where a beloved voice once sounded. The full score is in the public domain on IMSLP.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Orfeo_ed_Euridice_(Gluck,_Christoph_Willibald)"
      }
    ]
  },
  {
    "slug": "abu-dhabi-gehry-performing-arts",
    "headline": "Abu Dhabi unveils plans for a Frank Gehry-designed performing arts center on Saadiyat Island",
    "overview": "Abu Dhabi revealed designs for Dar Al Funoon, a sweeping performing arts institution designed by architect Frank Gehry, to rise on the emirate's Saadiyat cultural district. The sculptural landmark, drawing on Gehry's signature forms, is slated to open by 2030.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Dezeen",
        "href": "https://www.dezeen.com/2026/06/26/dar-al-funoon-abu-dhabi-frank-gehry/"
      },
      {
        "name": "The National",
        "href": "https://news.google.com/rss/articles/CBMi1AFBVV95cUxOdXJSSWZKR2pWeld5UnBjMVZnWHY4ZkxWbWNjTVVsVk5naHFUemZpVG1RM1M4dF92eHpPX3dFOTdIS3M3MjJMSXlIcGFnZnprMnNxX19wcTRONjJ4ZVZDM3hscFBsbnZLSi1LdXpJS2w3UWRVaVk1WFZBRmhjdlRBX0s5RzVnTnlLVHViNy1zd3RuT1JVQi1PLWk0VVZBbzh4aEZRZjJXam8waVpLb1FEOUlFbC1yclBFaGdQNjFZZG1EWW1pSm04V2s0SzNtWWtnRHZ1Mw?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-26",
    "image": {
      "src": "/covers/abu-dhabi-gehry-performing-arts.png",
      "alt": "The grand sculpted facade of the Palais Garnier, the Paris opera house designed by Charles Garnier, seen from the Avenue de l'Opera",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 26 June 2026",
    "rank": 26,
    "analogies": [
      {
        "category": "historical",
        "title": "Pericles raises the Parthenon on the Athenian Acropolis",
        "excerpt": "In the mid-5th century BC, when the Athenian Acropolis became the seat of the Delian League, Pericles initiated the building project that lasted the entire second half of the century. The architects Iktinos and Callicrates led the design while the sculptor Phidias oversaw the decoration and the great chryselephantine statue of Athena, making the temple at once a thanksgiving for victory over Persia and a monument to Athenian power and aspiration.",
        "source": "Wikipedia (The Parthenon)",
        "href": "https://en.wikipedia.org/wiki/Parthenon"
      },
      {
        "category": "historical",
        "title": "Napoleon III commissions Charles Garnier's Paris Opera",
        "excerpt": "Built between 1861 and 1875 as part of the Second Empire's reconstruction of Paris under Haussmann, the Palais Garnier was won in open competition by the then-unknown 35-year-old Charles Garnier. Its opulent eclectic design fused Baroque and Renaissance splendor with modern iron framing, becoming probably the most famous opera house in the world and the model of a ruler-sponsored temple of art.",
        "source": "Wikipedia (Palais Garnier)",
        "href": "https://en.wikipedia.org/wiki/Palais_Garnier"
      },
      {
        "category": "literary",
        "title": "Coleridge, 'Kubla Khan' — the stately pleasure-dome decreed",
        "excerpt": "In Xanadu did Kubla Khan / A stately pleasure-dome decree: / Where Alph, the sacred river, ran / Through caverns measureless to man / Down to a sunless sea.",
        "source": "Wikisource (Christabel; Kubla Khan; The Pains of Sleep, 1816)",
        "href": "https://en.wikisource.org/wiki/Christabel;_Kubla_Khan;_The_Pains_of_Sleep_(1816)/Kubla_Khan"
      },
      {
        "category": "literary",
        "title": "Shelley, 'Ozymandias' — the works of mighty kings",
        "excerpt": "And on the pedestal these words appear: / 'My name is Ozymandias, king of kings: / Look on my works, ye Mighty, and despair!' / Nothing beside remains. Round the decay / Of that colossal wreck, boundless and bare, / The lone and level sands stretch far away.",
        "source": "Wikisource (Poems That Every Child Should Know)",
        "href": "https://en.wikisource.org/wiki/Poems_That_Every_Child_Should_Know/Ozymandias_of_Egypt"
      },
      {
        "category": "artistic",
        "title": "Hubert Robert, 'Project for the Transformation of the Grande Galerie du Louvre' (1796)",
        "excerpt": "Hubert Robert, keeper of the king's paintings, imagined the Louvre's Grande Galerie remade as a luminous temple of art, its long nave divided by double Corinthian columns and transverse arches and washed by skylights from above. The vast hall recedes toward infinity, lined with masterpieces and sculptures, an architect's visionary statement of a great house of art conjured before it was built. It is the eighteenth-century counterpart to a sculptural cultural landmark unveiled as both aspiration and spectacle.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Hubert_Robert_-_Projet_d%27am%C3%A9nagement_de_la_Grande_Galerie_du_Louvre_(1796).JPG",
        "image": {
          "src": "/covers/abu-dhabi-gehry-performing-arts--art.png",
          "alt": "Oil painting of an imagined grand gallery of the Louvre, a vast skylit hall of double Corinthian columns lined with paintings and sculptures receding into the distance",
          "credit": "Hubert Robert (1796), Musee du Louvre — Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Handel, 'Music for the Royal Fireworks,' HWV 351 (1749)",
        "excerpt": "Composed in 1749 to crown a royal celebration with its blazing fireworks, Handel's suite opens with a majestic French overture for massed trumpets, horns, oboes and drums, ceremonial music written expressly to consecrate a public spectacle of state. Its pomp and brilliance make it a natural fanfare for the grand opening of a temple of the arts. The full scores are public domain and freely downloadable.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Music_for_the_Royal_Fireworks,_HWV_351_(Handel,_George_Frideric)"
      }
    ]
  },
  {
    "slug": "scotus-ends-tps-haitians-syrians",
    "headline": "US Supreme Court allows Trump administration to end deportation protections for Haitians and Syrians",
    "overview": "The U.S. Supreme Court cleared the way for the Trump administration to terminate Temporary Protected Status for hundreds of thousands of Haitian and Syrian immigrants, lifting lower-court orders that had kept the protections in place. The ruling exposes the affected migrants to potential deportation while litigation over the policy continues.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMiowFBVV95cUxPTFZFZDU5c1hnMWFhOTcxa196M1NaZ09RU3lNOWxOQm56ekRKNkhYX19OSDhuNWxoejI0TDV1eWtuWlR5Z3JYZHRRWU9pcENHTlRrajdYSDZvNkNtMVZnc1E1TXNkbk10UUZIUWM4THBfd3pRNlBoUUVCRTZxVDlfaW45RmxrVUtLb0w3NG9IVEQwSEZLQVBubEZ6LXRnWnNUTjZF?oc=5"
      },
      {
        "name": "PBS NewsHour",
        "href": "https://www.pbs.org/newshour/politics/supreme-court-allows-trump-administration-to-end-legal-protections-for-haitians-and-syrians"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-26",
    "image": {
      "src": "/covers/scotus-ends-tps-haitians-syrians.png",
      "alt": "Edward Moran's 1886 painting of the unveiling of the Statue of Liberty in New York Harbor, the nation's enduring emblem of welcome to immigrants.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 26 June 2026",
    "lead": true,
    "rank": 27,
    "analogies": [
      {
        "category": "historical",
        "title": "The Edict of Expulsion of the Jews from England (Edward I, 18 July 1290)",
        "excerpt": "The Edict of Expulsion is a royal decree expelling all Jews from the Kingdom of England that was issued by Edward I on 18 July 1290; it was the first time a European state is known to have permanently banned their presence. Jews were allowed to leave England with cash and personal possessions, but the debts which they were owed, their homes, and other buildings—including synagogues and cemeteries—were forfeited to the king.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Edict_of_Expulsion"
      },
      {
        "category": "historical",
        "title": "The Alhambra Decree expelling the Jews from Spain (Isabella and Ferdinand, 31 March 1492)",
        "excerpt": "The Alhambra Decree (also known as the Edict of Expulsion of the Jews) was an edict issued on 31 March 1492 by the joint Catholic Monarchs of Spain (Isabella I of Castile and Ferdinand II of Aragon) ordering the expulsion of practising Jews from the Crowns of Castile and Aragon and its territories and possessions by 31 July of that year. The expulsion was intended to eliminate the influence of practising Jews on Spain's large formerly-Jewish converso New Christian population, to ensure the latter and their descendants did not revert to Judaism.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Alhambra_Decree"
      },
      {
        "category": "literary",
        "title": "Dante, The Divine Comedy: Paradiso, Canto XVII — Cacciaguida foretells Dante's exile (c. 1320; Longfellow translation, 1867)",
        "excerpt": "Thou shalt abandon everything beloved\n   Most tenderly, and this the arrow is\n   Which first the bow of banishment shoots forth.\n\nThou shalt have proof how savoureth of salt\n   The bread of others, and how hard a road\n   The going down and up another's stairs.",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/Divine_Comedy_(Longfellow_1867)/Volume_3/Canto_17"
      },
      {
        "category": "literary",
        "title": "The Book of Ruth, chapters 1–2 — the stranger who seeks refuge in a foreign land (King James Version)",
        "excerpt": "And Ruth said, Intreat me not to leave thee, or to return from following after thee: for whither thou goest, I will go; and where thou lodgest, I will lodge: thy people shall be my people, and thy God my God: Where thou diest, will I die, and there will I be buried: the LORD do so to me, and more also, if ought but death part thee and me. ... Then she fell on her face, and bowed herself to the ground, and said unto him, Why have I found grace in thine eyes, that thou shouldest take knowledge of me, seeing I am a stranger?",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Ruth"
      },
      {
        "category": "artistic",
        "title": "Eduard Bendemann, The Mourning Jews in Exile (Die trauernden Juden im Exil), c. 1832",
        "excerpt": "Inspired by Psalm 137 (\"By the rivers of Babylon we sat down and wept\"), Bendemann's canvas gathers a deported people beneath a willow on the banks of the Euphrates: a chained old harper anchors a cluster of grieving young women, their instruments laid silent on the ground. The painting renders the desolation of a community torn from its homeland and made captive in a foreign land, a visual lament for those stripped of refuge and forced into exile.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Eduard_Bendemann-_Die_trauernden_Juden_im_Exil_um_1832.jpg",
        "image": {
          "src": "/covers/scotus-ends-tps-haitians-syrians--art.png",
          "alt": "The Mourning Jews in Exile (Die trauernden Juden im Exil) by Eduard Bendemann, c. 1832, depicting deported Jews mourning in Babylonian captivity beneath a willow by the river, a chained harper among grieving women.",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Giuseppe Verdi, \"Va, pensiero\" (Chorus of the Hebrew Slaves), from the opera Nabucco (1842)",
        "excerpt": "In the third act of Verdi's Nabucco, the Hebrew exiles, captive in Babylon and torn from their homeland, sing \"Va, pensiero, sull'ali dorate\" — \"Fly, thought, on golden wings\" — a yearning lament drawn from Psalm 137 for a lost native land. The chorus became an anthem of a displaced people longing for the home from which they were expelled, voicing the grief of those who shelter, unwillingly, in a foreign land.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Nabucco_(Verdi,_Giuseppe)"
      }
    ]
  },
  {
    "slug": "cargo-ship-attacked-hormuz-un-pauses-evacuation",
    "headline": "Cargo ship attacked near Oman as UN agency pauses ship evacuations through the Strait of Hormuz",
    "overview": "A cargo vessel came under attack near Oman, prompting a United Nations maritime agency to pause its initiative to escort and evacuate ships through the Strait of Hormuz. U.S. officials told Reuters that Iran fired on the ship, raising fresh fears for commercial shipping through the vital oil chokepoint.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMizwFBVV95cUxQNEdwQnducDl3RzgxSWs1NXVmdWQzSW5QY2xWc3ZXd251dG8xcHFDQXg1TkNQd2NOV1RDN201R1NrVEtMaml6MUdibUdXWGZveWo2YVpMMElrVFcxWjhVN29DZWFGem5MWVpjNlpzVUlYSEE4M2FVV1NXSTNvSm1LOUxMSmpONDg3QzlPVUZOMGxNSU5CZ2NWbEg4Ty1Ybkp3UmloQzVFMzFtRWV5Q2NMUXFDYzJubXkySk91YU1DQ3BjNXNyd0YyMGhnQnBZUVk?oc=5"
      },
      {
        "name": "CBS News",
        "href": "https://www.cbsnews.com/live-updates/us-iran-war-trump-strait-of-hormuz-oil-prices/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-26",
    "image": {
      "src": "/covers/cargo-ship-attacked-hormuz-un-pauses-evacuation.png",
      "alt": "A satellite view of the Strait of Hormuz and the Musandam Peninsula, the narrow chokepoint at the mouth of the Persian Gulf through which much of the world's oil shipping passes.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 26 June 2026",
    "rank": 28,
    "analogies": [
      {
        "category": "historical",
        "title": "Battle of Salamis (480 BC)",
        "excerpt": "Themistocles lured the vast Persian fleet into the narrow straits of Salamis, where Xerxes' superior numbers became a fatal liability: crammed into the confined channel, the Persian ships could not maneuver, collided with one another, and were destroyed by the smaller Greek force. The battle stands as antiquity's defining lesson that command of a narrow sea passage can overturn an entire war.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Battle_of_Salamis"
      },
      {
        "category": "historical",
        "title": "The Tanker War in the Persian Gulf and Strait of Hormuz (1981-1988)",
        "excerpt": "During the Iran-Iraq War, both belligerents waged a sustained campaign of attacks on neutral merchant vessels in the Persian Gulf and Strait of Hormuz, the most prolonged assault on commercial shipping since World War II. Iraq mounted 283 attacks and Iran 168; well over 100 sailors were killed and tens of millions of tons of cargo damaged, drawing the U.S. Navy into reflagging and escorting tankers through the chokepoint.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Tanker_war"
      },
      {
        "category": "literary",
        "title": "Homer, The Odyssey, Book XII — Scylla and Charybdis (Butler translation)",
        "excerpt": "While we were taken up with this, and were expecting each moment to be our last, Scylla pounced down suddenly upon us and snatched up my six best men. I was looking at once after both ship and men, and in a moment I saw their hands and feet ever so high above me, struggling in the air as Scylla was carrying them off, and I heard them call out my name in one last despairing cry.",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Odyssey_(Butler)/Book_XII"
      },
      {
        "category": "literary",
        "title": "Aeschylus, The Persians (472 BC) — the Messenger's account of Salamis",
        "excerpt": "It was a ship of Hellas that began the charge and chopped off in its entirety the curved stern of a Phoenician boat. Each captain drove his ship straight against some other ship. When, however, the mass of our ships had been crowded in the narrows, and none could render another aid, and each crashed its bronze prow against each of its own line, they splintered their whole bank of oars. The hulls of our vessels rolled over, and the sea was hidden from our sight, strewn as it was with wrecks and slaughtered men.",
        "source": "Perseus Digital Library (Tufts)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0012:card=384"
      },
      {
        "category": "artistic",
        "title": "J. M. W. Turner, The Shipwreck (1805)",
        "excerpt": "Turner's tempest-tossed canvas shows a merchant ship foundering amid towering waves, its survivors crowded into pitching lifeboats as the sea overwhelms them. Thought to depict the recent sinking of the Earl of Abergavenny off Dorset, the painting is a defining image of the sublime terror of the sea and the utter vulnerability of vessels to forces beyond their control.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/The_Shipwreck_(Turner)",
        "image": {
          "src": "/covers/cargo-ship-attacked-hormuz-un-pauses-evacuation--art.png",
          "alt": "The Shipwreck, J. M. W. Turner, 1805 — a merchant ship foundering in a violent storm as survivors crowd into lifeboats amid towering waves",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Felix Mendelssohn, Meeresstille und glückliche Fahrt (Calm Sea and Prosperous Voyage), Overture Op. 27 (1828)",
        "excerpt": "Inspired by Goethe's paired poems, Mendelssohn's concert overture opens in an eerie, motionless calm that evokes the peril of a ship becalmed and helpless on a glassy sea, before a stirring breeze fills the sails and the music surges toward safe passage. The work dramatizes in sound the precariousness of a voyage at the mercy of the sea and the longing for a clear, unobstructed crossing.",
        "source": "IMSLP",
        "href": "https://imslp.org/wiki/Meeresstille_und_gl%C3%BCckliche_Fahrt,_Op.27_(Mendelssohn,_Felix)"
      }
    ]
  },
  {
    "slug": "samsung-648-billion-south-korea-investment",
    "headline": "Samsung Group to unveil $648 billion South Korea investment plan, including new chip plants",
    "overview": "Samsung Group is preparing to announce roughly 890 trillion won ($648 billion) in investments across South Korea, including major spending on new semiconductor plants, according to a report. The plan would rank among the largest corporate investment commitments in the country's history.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiuAFBVV95cUxOY2F3d094MUpXQUcxZUloQzFSYVNpRWRjUWhSSEtQZ2RMVDdGdU1hZnl4VnFGSjd4emtNYm5FTkFITFByZXpFX3BQNmstbDZDVDJITjgtYnBIN1NiQ3RfSG5CbEdaQnlqaXFva2RRcDZqUDdFTGlZck1rcmtadU96R0hETkk1bnlNNGgwTGs2N3JYQl9jMVJGWlo3OXlhTzBwa2UtOWhQUDJrdGExaTZnTGRRbEJXVF9o?oc=5"
      },
      {
        "name": "The Korea Herald",
        "href": "https://www.koreaherald.com/article/10789340"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-26",
    "image": {
      "src": "/covers/samsung-648-billion-south-korea-investment.png",
      "alt": "Workers in protective suits inside a semiconductor cleanroom, the kind of advanced fabrication plant at the heart of Samsung's investment plan.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 26 June 2026",
    "rank": 29,
    "analogies": [
      {
        "category": "historical",
        "title": "The Magnitogorsk Iron and Steel Works, built during the Soviet First Five-Year Plan (1929-1934)",
        "excerpt": "Conceived under Stalin's industrialization drive, Magnitogorsk was raised almost from nothing on the steppe beside Magnitnaya Mountain's iron ore, planned as a one-industry giant modeled on Gary, Indiana and Pittsburgh. Tens of thousands of workers built one of the largest steel complexes in the world, a monument to a nation's headlong industrial ambition.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Magnitogorsk"
      },
      {
        "category": "historical",
        "title": "The Tennessee Valley Authority dam and infrastructure program (founded 1933)",
        "excerpt": "Created in 1933 as a flagship of Roosevelt's New Deal, the TVA undertook a sweeping buildout of hydroelectric dams, power lines, and regional infrastructure across an impoverished river basin. It became one of history's most ambitious public works campaigns, electrifying and remaking an entire region through monumental construction.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Tennessee_Valley_Authority"
      },
      {
        "category": "literary",
        "title": "Germinal by Émile Zola (1885), trans. Havelock Ellis",
        "excerpt": "This pit, piled up in the bottom of a hollow, with its squat brick buildings, raising its chimney like a threatening horn, seemed to him to have the evil air of a gluttonous beast crouching there to devour the earth.",
        "source": "Standard Ebooks",
        "href": "https://standardebooks.org/ebooks/emile-zola/germinal/havelock-ellis/text/single-page"
      },
      {
        "category": "literary",
        "title": "\"Smoke and Steel\" by Carl Sandburg (1920)",
        "excerpt": "Smoke into steel and blood into steel; Homestead, Braddock, Birmingham, they make their steel with men. … Smoke and blood is the mix of steel.",
        "source": "U.S. National Park Service",
        "href": "https://www.nps.gov/articles/000/sandburg-poetry-collection-smoke-and-steel.htm"
      },
      {
        "category": "artistic",
        "title": "Detroit Industry Murals, North Wall, by Diego Rivera (1932-33)",
        "excerpt": "Diego Rivera's vast fresco cycle in the Detroit Institute of Arts glorifies the machinery and labor of Ford's River Rouge plant, with blast furnaces, conveyor belts, and engine-making rendered as an epic of modern manufacture. Massed workers and looming apparatus turn an automobile factory into a cathedral of industrial ambition.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Rivera_detroit_industry_north.jpg",
        "image": {
          "src": "/covers/samsung-648-billion-south-korea-investment--art.png",
          "alt": "Detroit Industry, North Wall, fresco by Diego Rivera, 1932-33, depicting workers and machinery manufacturing Ford's V8 engine at the River Rouge plant",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Iron Foundry (Zavod / Steel), Op. 19, by Alexander Mosolov (1926-27)",
        "excerpt": "Mosolov's brief orchestral tour de force, drawn from his lost ballet \"Steel,\" conjures a factory at full roar using a live orchestra and a shaken sheet of metal. Pounding ostinatos accumulate instrument by instrument to evoke machines starting up and grinding away, a futurist hymn to industrial power.",
        "source": "IMSLP",
        "href": "https://imslp.org/wiki/Steel,_Op.19_(Mosolov,_Alexander)"
      }
    ]
  },
  {
    "slug": "us-bans-polestar-china-ev-pressure",
    "headline": "United States bans Polestar vehicles as it escalates pressure on Chinese electric carmakers",
    "overview": "The U.S. government moved to bar Polestar, the Volvo-affiliated electric vehicle brand, as part of a broader crackdown on Chinese-linked carmakers over national security concerns about connected-vehicle technology. The ban deepens trade tensions between Washington and Beijing over the auto industry.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMi3gFBVV95cUxQLW1SMWdEUXp3ODA1STNZaXRMZVNWek9QRVRRMHpvdmJIRm8zYWhrVHJwOTFUWm9nSEVrVzVGYTFjR1JIMGYycHZwLXNqWVBKLUpIYkgtY1djSEJwb0hOTkdNSGpXSXByRlVUYnZnbVJLcm1BTGc2OUtSU2M3UzFzcGdYeU5yUnBydFgyZUdyMXcwY0RXRFMzWlZEOEYtSVdCakdLajRXb25rRGFEV295Z01iN0N1S0F4dTg2OVNQczJRV3A4UTFyMW14SWxUbXlrQ2pRUzNZUXhQcEh4WkE?oc=5"
      },
      {
        "name": "Electrek",
        "href": "https://electrek.co/2026/06/25/polestar-us-connected-vehicle-rule-europe/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-26",
    "image": {
      "src": "/covers/us-bans-polestar-china-ev-pressure.png",
      "alt": "A Polestar 2 electric car, the Volvo-affiliated brand barred from the United States amid pressure on Chinese-linked carmakers.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 26 June 2026",
    "rank": 30,
    "analogies": [
      {
        "category": "historical",
        "title": "Chinese Exclusion Act (1882)",
        "excerpt": "Whereas, in the opinion of the Government of the United States the coming of Chinese laborers to this country endangers the good order of certain localities within the territory thereof: Therefore, Be it enacted by the Senate and House of Representatives of the United States of America in Congress assembled, That from and after the expiration of ninety days next after the passage of this act, and until the expiration of ten years next after the passage of this act, the coming of Chinese laborers to the United States be, and the same is hereby, suspended; and during such suspension it shall not be lawful for any Chinese laborer to come, or, having so come after the expiration of said ninety days, to remain within the United States.",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/Chinese_Exclusion_Act"
      },
      {
        "category": "historical",
        "title": "Embargo Act of 1807",
        "excerpt": "Be it enacted by the Senate and House of Representatives of the United States of America in Congress assembled, That an embargo be, and hereby is laid on all ships and vessels in the ports and places within the limits or jurisdiction of the United States, cleared or not cleared, bound to any foreign port or place; and that no clearance be furnished to any ship or vessel bound to such foreign port or place, except vessels under the immediate direction of the President of the United States.",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/United_States_Statutes_at_Large/Volume_2/10th_Congress/1st_Session/Chapter_5"
      },
      {
        "category": "literary",
        "title": "Report on the Subject of Manufactures (1791)",
        "excerpt": "These have relations to the strong influence of habit and the spirit of imitation; the fear of want of success in untried enterprises; the intrinsic difficulties incident to first essays toward a competition with those who have previously attained to perfection in the business to be attempted; the bounties, premiums, and other artificial encouragements with which foreign nations second the exertions of their own citizens in the branches in which they are to be rivalled.",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/Report_on_Manufactures"
      },
      {
        "category": "literary",
        "title": "The National System of Political Economy, Chapter XXVI (1841)",
        "excerpt": "Measures of protection are justifiable only for the purpose of furthering and protecting the internal manufacturing power, and only in the case of nations which through an extensive and compact territory, large population, possession of natural resources, far advanced agriculture, a high degree of civilisation and political development, are qualified to maintain an equal rank with the principal agricultural manufacturing commercial nations, with the greatest naval and military powers.",
        "source": "Library of Economics and Liberty (EconLib)",
        "href": "https://www.econlib.org/library/YPDBooks/List/lstNPE26.html"
      },
      {
        "category": "artistic",
        "title": "Ograbme, or the American Snapping Turtle (1807)",
        "excerpt": "The cartoon shows a snapping turtle named \"Ograbme\" — \"Embargo\" spelled backwards — clamping onto a merchant who is trying to smuggle a barrel of goods aboard a British ship, while the trapped man cries out against the cursed restriction. It savages Jefferson's embargo as a self-inflicted bite that throttled American commerce in the name of pressuring a rival power, turning a trade weapon against the nation that wielded it.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Ograbme.jpg",
        "image": {
          "src": "/covers/us-bans-polestar-china-ev-pressure--art.png",
          "alt": "Ograbme, or the American Snapping Turtle, anonymous American political cartoon, 1807, depicting a snapping turtle labeled Ograbme seizing a merchant smuggling a barrel toward a British ship in protest of Jefferson's embargo",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Rule, Britannia! (1740), words by James Thomson, music by Thomas Arne",
        "excerpt": "When Britain first, at Heaven's command, / Arose from out the azure main; / This was the charter of the land, / And guardian angels sung this strain: / \"Rule, Britannia! rule the waves: / \"Britons never will be slaves.\" ... To thee belongs the rural reign; / Thy cities shall with commerce shine: / All thine shall be the subject main, / And every shore it circles thine. / \"Rule, Britannia! rule the waves: / \"Britons never will be slaves.\"",
        "source": "IMSLP",
        "href": "https://imslp.org/wiki/Rule_Britannia_(Arne,_Thomas_Augustine)"
      }
    ]
  },
  {
    "slug": "xbox-raises-console-prices-worldwide",
    "headline": "Microsoft to raise Xbox console prices worldwide starting in August",
    "overview": "Microsoft said it will increase the price of Xbox consoles across global markets beginning in August, citing rising costs. It is the second worldwide Xbox price increase in roughly a year and follows similar moves by hardware makers passing higher costs on to consumers.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMikAFBVV95cUxNNFV2TUZuMzZYbHBGM21sRUp4d0lBVjFFb0RtRHFKd3pjMVpQSEwzOFFhbkVLQkVEMjd2VzlfUTV3WkViSTQ0ZkdGRngwYmRSM29HbXM5RFFZd0NqaEsxMHZDVHBsUFo3NmVwQ1JVbkgtLUNXejVfaThTWS12Q3RORHdLQkFqT2RybU5SbUFBUGc?oc=5"
      },
      {
        "name": "Gematsu",
        "href": "https://www.gematsu.com/2026/06/xbox-series-global-price-increase-announced"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-26",
    "image": {
      "src": "/covers/xbox-raises-console-prices-worldwide.png",
      "alt": "A Microsoft Xbox Series X games console, the hardware whose price is rising in markets worldwide.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 26 June 2026",
    "rank": 31,
    "analogies": [
      {
        "category": "historical",
        "title": "The Price Revolution, Europe (c. 1550–1650)",
        "excerpt": "The Price Revolution, sometimes known as the Spanish Price Revolution, was a series of economic events that occurred between the second half of the 16th century and the first half of the 17th century, and most specifically linked to the high rate of inflation that occurred during this period across Western Europe. Prices rose on average roughly sixfold over 150 years.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Price_revolution"
      },
      {
        "category": "historical",
        "title": "Hungarian Pengő Hyperinflation (1945–1946)",
        "excerpt": "The pengő lost value dramatically after World War II, suffering the highest rate of hyperinflation ever recorded in human history. There were several attempts to break the back of hyperinflation, such as a 75% capital levy in December 1945. However, this did not stop the inflation, and prices continued to spiral out of control, with ever higher denominations introduced.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Hungarian_peng%C5%91"
      },
      {
        "category": "literary",
        "title": "Henry David Thoreau, Walden, ch. \"Economy\" (1854)",
        "excerpt": "the cost of a thing is the amount of what I will call life which is required to be exchanged for it, immediately or in the long run. An average house in this neighborhood costs perhaps eight hundred dollars, and to lay up this sum will take from ten to fifteen years of the laborer's life, even if he is not encumbered with a family.",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/files/205/205-h/205-h.htm"
      },
      {
        "category": "literary",
        "title": "Benjamin Franklin, The Way to Wealth (1758)",
        "excerpt": "You expect they will be sold cheap, and, perhaps, they may for less than they cost; but, if you have no occasion for them, they must be dear to you. Remember what poor Richard says, \"Buy what thou hast no need of, and ere long thou shalt sell thy necessaries.\" And again, \"At a great pennyworth pause a while:\" he means, that perhaps the cheapness is apparent only, and not real.",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/files/43855/43855-h/43855-h.htm"
      },
      {
        "category": "artistic",
        "title": "Pieter Aertsen, A Meat Stall with the Holy Family Giving Alms (1551)",
        "excerpt": "Pieter Aertsen's panel piles the foreground with an almost obscene abundance of costly market wares — slabs of meat, sausages, a slaughtered ox's head, butter, fish and pretzels — heaped so thickly that the Holy Family giving alms recedes into the small background. The inverted composition sets the dear price of worldly goods against modest charity, making the viewer reckon the true cost of plenty. The overflowing stall reads as a meditation on consumption and what we pay, in coin and in conscience, for our appetites.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/A_Meat_Stall_with_the_Holy_Family_Giving_Alms",
        "image": {
          "src": "/covers/xbox-raises-console-prices-worldwide--art.png",
          "alt": "A Meat Stall with the Holy Family Giving Alms, Pieter Aertsen, 1551, oil-on-panel showing a market stall overflowing with meat, fish, butter and other costly wares, with the Holy Family giving alms in the small background",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Stephen Foster, Hard Times Come Again No More (1854)",
        "excerpt": "Stephen Foster's parlor song of 1854 sets a plaintive melody against a refrain that pleads for relief from want and dear days. It lingers at the door of the poor, naming the sigh of the weary and the frail forms fainting at the threshold, then begs that hard times come again no more. The tune has outlived its century precisely because the burden of rising costs and lean purses never fully passes.",
        "source": "IMSLP",
        "href": "https://imslp.org/wiki/Hard_Times_Come_Again_No_More_(Foster,_Stephen)"
      }
    ]
  },
  {
    "slug": "openai-delays-ipo-2027",
    "headline": "OpenAI leans toward delaying its initial public offering until 2027",
    "overview": "OpenAI is leaning toward waiting until next year to pursue an initial public offering, according to a New York Times report, rather than moving ahead in 2026. A listing of the ChatGPT maker would rank among the most closely watched market debuts in the technology sector.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiwAFBVV95cUxQRkNFVmI0YkkxNUpIT2Zjc1ZjVGthLTViVlk0NG5kSzZMeEllaDBVcmlaUEczS25qMjR6VGg4MVpvVUM0M2sxOURZb1lhUWdSRHdUZHVLN0ZVZjBFQXRRX2N1NlI4bGJxc29GZEtiUnRNNElMbFRCZnNZV0pfbXpTOE8xbVZ3THpfY3Z1OXh2SXpEVWkzQWgxcDBURWloa05VVlVTZXFVWTViSXJiMVlNU0pIMkIzejhSOGFYNnliWVY?oc=5"
      },
      {
        "name": "PYMNTS",
        "href": "https://www.pymnts.com/news/investment-tracker/ipo/2026/openai-weighs-delay-of-ipo-as-tech-stock-volatility-rattles-advisers/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-26",
    "image": {
      "src": "/covers/openai-delays-ipo-2027.png",
      "alt": "A 1606 share certificate of the Dutch East India Company, the first company to offer tradeable public shares, recalling the long history of going public.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 26 June 2026",
    "rank": 32,
    "analogies": [
      {
        "category": "historical",
        "title": "The Dutch East India Company (VOC), the first public share offering (1602)",
        "excerpt": "Shares in the company could be purchased by any citizen of the Dutch Republic and bought and sold in open-air secondary markets, one of which became the Amsterdam Stock Exchange.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Dutch_East_India_Company"
      },
      {
        "category": "historical",
        "title": "The founding subscription of the Bank of England (1694)",
        "excerpt": "In the end the £1.2 million was raised in 12 days; 1,268 people subscribed.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Bank_of_England"
      },
      {
        "category": "literary",
        "title": "The Way We Live Now, by Anthony Trollope (1875)",
        "excerpt": "The object of Fisker, Montague, and Montague was not to make a railway to Vera Cruz, but to float a company. Paul thought that Mr. Fisker seemed to be indifferent whether the railway should ever be constructed or not. It was clearly his idea that fortunes were to be made out of the concern before a spadeful of earth had been moved.",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/files/5231/5231-h/5231-h.htm"
      },
      {
        "category": "literary",
        "title": "Money (L'Argent), by Émile Zola (1891)",
        "excerpt": "There was only gambling that was worth anything--gambling which in one afternoon can at one stroke bring comfort, luxury, life, broad and entire. Even if this old social world were fated to crumble some day, could not a man like himself still find time and room to satisfy his desires before the Downfall?",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/files/56987/56987-h/56987-h.htm"
      },
      {
        "category": "artistic",
        "title": "Portraits at the Stock Exchange (À la Bourse), by Edgar Degas (c. 1878–79)",
        "excerpt": "Degas sets his patron, the banker Ernest May, on the crowded trading floor of the Paris Bourse, a slip of paper passing furtively between gloved hands. With its quick, sketchy brushwork the painting captures the modern temple of finance where fortunes are made on whispered information and the buying and selling of shares.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Portraits_at_the_Stock_Exchange",
        "image": {
          "src": "/covers/openai-delays-ipo-2027--art.png",
          "alt": "Portraits at the Stock Exchange (À la Bourse), painting by Edgar Degas, c. 1878–79, depicting the banker Ernest May and others on the trading floor of the Paris Bourse, with a note passing between hands.",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Utopia, Limited; or, The Flowers of Progress, by Gilbert and Sullivan (1893)",
        "excerpt": "In this Savoy opera, an entire kingdom is reconstituted as a limited liability joint-stock company, lampooning the Victorian craze for floating ventures and the notion that a bankrupt enterprise could leave its creditors unpaid while its owners bore no liability. Sullivan's buoyant score sets Gilbert's satire on company promotion, shares, and the speculative gospel of progress.",
        "source": "IMSLP",
        "href": "https://imslp.org/wiki/Utopia_Limited_(Sullivan,_Arthur)"
      }
    ]
  },
  {
    "slug": "meta-first-in-house-ai-glasses",
    "headline": "Meta unveils its first in-house AI glasses designs, including a Kylie Jenner collaboration",
    "overview": "Meta revealed the first smart glasses designed entirely in-house, expanding its line of AI-enabled eyewear beyond its partnership with EssilorLuxottica. The launch includes a collaboration with the celebrity Kylie Jenner aimed at broadening the appeal of face-worn computing.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Dezeen",
        "href": "https://www.dezeen.com/2026/06/25/meta-glasses-smart-ai-kylie-jenner/"
      },
      {
        "name": "Engadget",
        "href": "https://www.engadget.com/2199519/meta-ai-glasses-hands-on-kylie-jenner-edition/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-26",
    "image": {
      "src": "/covers/meta-first-in-house-ai-glasses.png",
      "alt": "A replica of Galileo's telescope, one of the early optical instruments in the long lineage of devices that extend and augment human sight.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 26 June 2026",
    "rank": 33,
    "analogies": [
      {
        "category": "historical",
        "title": "Ibn al-Haytham, Book of Optics (Kitāb al-Manāẓir), c. 1011–1021",
        "excerpt": "In his seven-volume Book of Optics, the Arab polymath Ibn al-Haytham overturned the ancient idea that the eye casts out rays, demonstrating instead the intromission theory still accepted today: that vision arises from light reflecting off objects and entering the eye. Through careful experiment with mirrors, lenses, and the camera obscura, he laid the mathematical and experimental foundations of how human sight actually works, shaping every optical instrument that followed.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Book_of_Optics"
      },
      {
        "category": "historical",
        "title": "Robert Hooke, Micrographia, 1665",
        "excerpt": "By the means of Telescopes, there is nothing so far distant but may be represented to our view; and by the help of Microscopes, there is nothing so small, as to escape our inquiry; hence there is a new visible World discovered to the understanding. By this means the Heavens are open'd, and a vast number of new Stars, and new Motions, and new Productions appear in them, to which all the ancient Astronomers were utterly Strangers.",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/files/15491/15491-h/15491-h.htm"
      },
      {
        "category": "literary",
        "title": "John Keats, \"On First Looking into Chapman's Homer,\" 1816",
        "excerpt": "Then felt I like some watcher of the skies\nWhen a new planet swims into his ken;\nOr like stout Cortez when with eagle eyes\nHe stared at the Pacific—and all his men\nLook'd at each other with a wild surmise—\nSilent, upon a peak in Darien.",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/On_First_Looking_into_Chapman's_Homer"
      },
      {
        "category": "literary",
        "title": "H. G. Wells, \"The Crystal Egg\" (in Tales of Space and Time), 1897",
        "excerpt": "The view, as Mr. Cave described it, was invariably of an extensive plain, and he seemed always to be looking at it from a considerable height, as if from a tower or a mast.",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/files/27365/27365-h/27365-h.htm"
      },
      {
        "category": "artistic",
        "title": "Tommaso da Modena, Portrait of Cardinal Hugh of Saint-Cher (fresco), 1352",
        "excerpt": "Painted in the chapter house of San Nicolò in Treviso, Tommaso da Modena's fresco of the Dominican cardinal Hugh of Saint-Cher shows the scholar at his writing desk peering through a pair of rivet spectacles—the earliest known depiction of a person wearing eyeglasses. The small framed lenses, perched on the nose as he annotates a manuscript, capture the precise moment optics entered the everyday human face, centuries before the camera or the smart lens.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:38_Ugo_da_San_Caro.jpg",
        "image": {
          "src": "/covers/meta-first-in-house-ai-glasses--art.png",
          "alt": "Portrait of Cardinal Hugh of Saint-Cher, fresco by Tommaso da Modena, 1352, depicting the scholar at his desk wearing rivet spectacles—the earliest known image of a person wearing eyeglasses.",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Richard Strauss, Also sprach Zarathustra, Op. 30, 1896",
        "excerpt": "Strauss's tone poem opens with its celebrated \"Sunrise,\" a slow swell of low organ and trumpet blazing into a radiant C-major chord—an unmistakable musical image of light dawning and consciousness awakening. The passage stages perception itself as an event, the moment the eye first opens upon a vast new world, a fitting overture for any instrument that promises to expand how we see.",
        "source": "IMSLP",
        "href": "https://imslp.org/wiki/Also_sprach_Zarathustra,_Op.30_(Strauss,_Richard)"
      }
    ]
  },
  {
    "slug": "spacex-starpipe-gas-pipeline-starship",
    "headline": "SpaceX plans 'Starpipe' natural gas pipeline to fuel its Starship rockets in Texas",
    "overview": "SpaceX is planning to build a natural gas pipeline, dubbed 'Starpipe', to supply fuel for its Starship rocket program, according to a Reuters report. The project would secure a dedicated energy supply for the company's expanding launch operations in Texas.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMivwFBVV95cUxOTy0zT1R2aUUxTFA1NVhDVnVVZjdMQWFSQ0tEOVE1d1poakNjS19jX1ExemhSS3QxVGQyYkNsZjg1eHRtRFdIbjNfTjBNVW1BNVFTdjRza3EySmY3UzAwRVFNRmt6d0NQeURSVnBvcThnZnZUX2JGald5em52c1ViSXlXWW9zME5ONXJfWk96RDNqdFZoSW9Ram83VXVkZjVyXzByallqMjFkSDJJbm9NYjEyY1ZqQ1REU3RjT0x5UQ?oc=5"
      },
      {
        "name": "OilPrice.com",
        "href": "https://oilprice.com/Latest-Energy-News/World-News/SpaceX-Wants-to-Fuel-Its-Mars-Ambitions-With-Its-Own-Gas-Pipeline.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-26",
    "image": {
      "src": "/covers/spacex-starpipe-gas-pipeline-starship.png",
      "alt": "A SpaceX Starship rocket climbing on a column of flame, the launch program a Texas natural-gas pipeline would fuel.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 26 June 2026",
    "rank": 34,
    "analogies": [
      {
        "category": "historical",
        "title": "Frontinus, The Aqueducts of Rome (De aquaeductu), c. AD 97",
        "excerpt": "With such an array of indispensable structures carrying so many waters, compare, if you will, the idle Pyramids or the useless, though famous, works of the Greeks!",
        "source": "LacusCurtius (University of Chicago)",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Frontinus/De_Aquis/Bennett/1*.html"
      },
      {
        "category": "historical",
        "title": "The Big Inch and Little Big Inch Pipelines, 1942–1944",
        "excerpt": "The Big Inch and Little Big Inch were emergency wartime petroleum pipelines built between 1942 and 1944 to carry oil more than 1,200 miles from the fields of Texas to the refineries and ports of the northeastern United States, beyond the reach of German submarines. Among the longest pipelines ever attempted, they delivered hundreds of thousands of barrels a day and, after the war, were converted to move natural gas, transforming the energy market of the East Coast.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Big_Inch"
      },
      {
        "category": "literary",
        "title": "Aeschylus, Prometheus Bound, 5th century BC",
        "excerpt": "And I am he that searched out the source of fire, by stealth borne-off inclosed in a fennel-rod, which has shown itself a teacher of every art to mortals, and a great resource. Such then as this is the vengeance that I endure for my trespasses, being riveted in fetters beneath the naked sky.",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/files/27458/27458-h/27458-h.htm"
      },
      {
        "category": "literary",
        "title": "The Tower of Babel, Genesis 11:1–4 (King James Version), 1611",
        "excerpt": "And the whole earth was of one language, and of one speech. And it came to pass, as they journeyed from the east, that they found a plain in the land of Shinar; and they dwelt there. And they said one to another, Go to, let us make brick, and burn them throughly. And they had brick for stone, and slime had they for morter. And they said, Go to, let us build us a city and a tower, whose top may reach unto heaven; and let us make us a name, lest we be scattered abroad upon the face of the whole earth.",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Genesis"
      },
      {
        "category": "artistic",
        "title": "Philip James de Loutherbourg, Coalbrookdale by Night, 1801",
        "excerpt": "De Loutherbourg's nocturne sets the Madeley Wood ironworks ablaze against a moonlit gorge, fire and smoke roaring from the furnaces while laborers haul fuel and iron through the dark. Often called an emblem of the Industrial Revolution's birth, it makes industry itself a kind of infernal sublime—humanity harnessing fire and earth to forge a new world.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Coalbrookdale_by_Night",
        "image": {
          "src": "/covers/spacex-starpipe-gas-pipeline-starship--art.png",
          "alt": "Coalbrookdale by Night, Philip James de Loutherbourg, 1801, depicting the Bedlam ironworks furnaces blazing with fire and smoke in a moonlit gorge",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Arthur Honegger, Pacific 231 (Mouvement symphonique No. 1), 1923",
        "excerpt": "Honegger's orchestral tour de force portrays a heavy steam locomotive heaving into motion, gathering speed, and thundering across the rails before its final braking halt. Built from accelerating rhythmic layers and roaring brass, it is a hymn to the raw power of the machine—the same harnessed energy and forward momentum that hurls a fuelled rocket skyward.",
        "source": "IMSLP",
        "href": "https://imslp.org/wiki/Pacific_231,_H.53_(Honegger,_Arthur)"
      }
    ]
  },
  {
    "slug": "world-cup-all-time-attendance-record",
    "headline": "2026 World Cup sets all-time attendance record, surpassing the 1994 mark",
    "overview": "The 2026 FIFA World Cup has set a new all-time attendance record, surpassing the figure set when the United States last hosted the tournament in 1994. Organizers credited the expanded 48-team field and matches across North America for drawing the largest crowds in the competition's history.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMisgFBVV95cUxQa0NzZGZyMDRIeWtVd1ltMFNhdFRyeEVjNWxVb0ZTLXBHZ2JUNG9TQVEzeFY3MnlpMExoVUhUdmVBUWpoS0NBTGlvRmFiOGxvaW90dEJ6UWJkeDNZUjhWQjZQUjNfVU1oRHNOMWpQdlJnUVluOWVUWTlPc1l5TGpYUnduQlFSVGZ6V3NLUEVyOGhnbUFRUkl6VG9TLXQtaTluQ3ZodWFsOU1yUnM4aEZKSUZ3?oc=5"
      },
      {
        "name": "FIFA (inside.fifa.com)",
        "href": "https://inside.fifa.com/news/world-cup-2026-sets-new-daily-attendance-record"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-26",
    "image": {
      "src": "/covers/world-cup-all-time-attendance-record.png",
      "alt": "The Panathenaic Stadium in Athens packed with spectators at the 1896 Olympic Games, an emblem of the vast crowds drawn to great public contests.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 26 June 2026",
    "rank": 35,
    "analogies": [
      {
        "category": "historical",
        "title": "The Ancient Olympic Games (from 776 BC), Olympia",
        "excerpt": "The Olympic Games were a series of athletic competitions among representatives of city-states and one of the Panhellenic Games of ancient Greece. They were held in honor of Zeus, and the Greeks gave them a mythological origin. Uninhabited throughout the year, when the games were held the site became over congested. There were no permanent living structures for spectators, who, rich or poor, made do with tents.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Ancient_Olympic_Games"
      },
      {
        "category": "historical",
        "title": "The Inaugural Games of the Colosseum (AD 80), Rome",
        "excerpt": "The inaugural games were held, on the orders of the Roman Emperor Titus, to celebrate the completion in AD 80 (81 according to some sources) of the Colosseum, then known as the Flavian Amphitheatre (Latin: Amphitheatrum Flavium). Titus inaugurated the opening of the Colosseum with lavish games which lasted for more than a hundred days.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Inaugural_games_of_the_Colosseum"
      },
      {
        "category": "literary",
        "title": "Pindar, Olympian Ode 1 (476 BC; trans. Ernest Myers, 1874)",
        "excerpt": "Best is Water of all, and Gold as a flaming fire in the night shineth eminent amid lordly wealth; but if of prizes in the games thou art fain, O my soul, to tell, then, as for no bright star more quickening than the sun must thou search in the void firmament by day, so neither shall we find any games greater than the Olympic whereof to utter our voice.",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/Odes_of_Pindar_(Myers)/Olympian_Odes/1"
      },
      {
        "category": "literary",
        "title": "Juvenal, Satire X (\"bread and circuses\"), c. AD 100–127; trans. Lewis Evans",
        "excerpt": "For that sovereign people that once gave away military command, consulships, legions, and every thing, now bridles its desires, and limits its anxious longings to two things only--bread, and the games of the circus!",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/files/50657/50657-h/50657-h.htm"
      },
      {
        "category": "artistic",
        "title": "Ulpiano Checa, \"Carrera de carros romanos\" (Roman Chariot Race), 1890",
        "excerpt": "Checa's thundering chariot race captures the essence of the mass spectacle: charioteers straining forward as the teams of horses surge across the arena, the whole composition charged with the speed, dust, and roar of a crowd-packed Roman circus. It distills the ancient appetite for public contest and communal frenzy that great games have always summoned.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Carrera_de_carros_romanos-Ulpiano_Checa.JPG",
        "image": {
          "src": "/covers/world-cup-all-time-attendance-record--art.png",
          "alt": "Carrera de carros romanos (Roman Chariot Race) by Ulpiano Checa, 1890, depicting charioteers and horses racing before a packed arena",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Spyridon Samaras, Olympic Hymn (1896), lyrics by Kostis Palamas",
        "excerpt": "Composed for the opening ceremony of the first modern Olympic Games in Athens and first performed before a crowd of tens of thousands at the Panathenaic Stadium, Samaras's cantata sets Palamas's invocation of the immortal spirit of antiquity to surging choral and orchestral forces. It is music built to bind a mass gathering together, summoning nations into a single festival of contest and glory.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Olympic_Anthem_Score.pdf"
      }
    ]
  },
  {
    "slug": "king-charles-leaves-buckingham-palace",
    "headline": "King Charles will not return to live at Buckingham Palace after its renovation, officials say",
    "overview": "King Charles III will not move back into Buckingham Palace once a long-running, multibillion-pound renovation of the building is complete, royal officials said. The monarch is expected to continue residing elsewhere, leaving the historic London palace primarily for state functions and public access.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMitgFBVV95cUxQcV9Ub1ZBdm1YbzRyMm4zaHBIeU9YTzQ0bEJNRzNMWWlqTjdOR3g1cUF1cmNMNGZ5VlVFc2V0U2ZnUzhrWUpqRzFuRjdvdm1tVDRJN2E4VmNEcWtyVG1VdUs2UVBHZFpHOTJsVHVTUkl0TTRFZzdnUjRvMVFFWUxhaERjcUJmWFpxWEtKcFcyVW5Oa25BNlFiNGZNVmtLbWtSVUFLVlNMR1I4X09DNzFZSlBNSFIwdw?oc=5"
      },
      {
        "name": "PBS News",
        "href": "https://www.pbs.org/newshour/world/king-charles-iii-will-not-live-at-buckingham-palace-after-completion-of-costly-decade-long-refurbishment"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-26",
    "image": {
      "src": "/covers/king-charles-leaves-buckingham-palace.png",
      "alt": "Buckingham Palace in London, the historic royal residence King Charles will not return to live in after its renovation.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 26 June 2026",
    "rank": 36,
    "analogies": [
      {
        "category": "historical",
        "title": "The French court moves to Versailles (1682) and is swept out in 1789",
        "excerpt": "The king, the court, and the royal government lived there permanently from 6 May 1682 until 6 October 1789, except during the Regency years (1715–1723). In 1789, the French Revolution swept the royal family and government out of Versailles forever.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Palace_of_Versailles"
      },
      {
        "category": "historical",
        "title": "Diocletian's Palace at Split, the emperor's retirement residence (c. 305 AD)",
        "excerpt": "It was built at the end of the third century AD by the Roman Emperor Diocletian as his retirement residence. Diocletian had ordered the construction of the heavily fortified compound near his hometown of Spalatum in preparation for his retirement on 1 May 305 AD.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Diocletian%27s_Palace"
      },
      {
        "category": "literary",
        "title": "Shakespeare, Henry IV, Part 2, Act 3 Scene 1 (c. 1600)",
        "excerpt": "O sleep, O gentle sleep,\nNature's soft nurse, how have I frighted thee,\nThat thou no more wilt weigh my eyelids down\nAnd steep my senses in forgetfulness?\nWhy rather, sleep, liest thou in smoky cribs,\nUpon uneasy pallets stretching thee\nAnd hush'd with buzzing night-flies to thy slumber,\nThan in the perfumed chambers of the great,\nUnder the canopies of costly state,\nAnd lull'd with sound of sweetest melody?\nO thou dull god, why liest thou with the vile\nIn loathsome beds, and leavest the kingly couch\nA watch-case or a common 'larum-bell?\nCanst thou, O partial sleep, give thy repose\nTo the wet sea-boy in an hour so rude,\nAnd in the calmest and most stillest night,\nWith all appliances and means to boot,\nDeny it to a king? Then happy low, lie down!\nUneasy lies the head that wears a crown.",
        "source": "The Complete Works of William Shakespeare (MIT)",
        "href": "https://shakespeare.mit.edu/2henryiv/2henryiv.3.1.html"
      },
      {
        "category": "literary",
        "title": "Percy Bysshe Shelley, \"Ozymandias\" (1818)",
        "excerpt": "I met a traveller from an antique land\nWho said: Two vast and trunkless legs of stone\nStand in the desert . . . Near them, on the sand,\nHalf sunk, a shattered visage lies, whose frown,\nAnd wrinkled lip, and sneer of cold command,\nTell that its sculptor well those passions read\nWhich yet survive, stamped on these lifeless things,\nThe hand that mocked them, and the heart that fed:\nAnd on the pedestal these words appear:\n'My name is Ozymandias, king of kings:\nLook on my works, ye Mighty, and despair!'\nNothing beside remains. Round the decay\nOf that colossal wreck, boundless and bare\nThe lone and level sands stretch far away.",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Complete_Poetical_Works_of_Percy_Bysshe_Shelley_(ed._Hutchinson,_1914)/Ozymandias"
      },
      {
        "category": "artistic",
        "title": "\"Throne Room, Buckingham Palace\" (1914), photograph by Alexander Hood",
        "excerpt": "A 1914 photograph of the gilded Throne Room at Buckingham Palace: the empty canopied thrones beneath an ornate, deserted hall of state, an image of royal grandeur as ceremonial setting rather than lived-in home. The picture captures the palace as a stage for monarchy, magnificent yet uninhabited, anticipating its later turn toward state functions and public access.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Throne_Room,_Buckingham_Palace,_1914.jpg",
        "image": {
          "src": "/covers/king-charles-leaves-buckingham-palace--art.png",
          "alt": "Throne Room, Buckingham Palace, 1914, photograph by Alexander Hood, depicting the gilded, empty canopied thrones in the palace's ceremonial hall of state",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "George Frideric Handel, Music for the Royal Fireworks, HWV 351 (1749)",
        "excerpt": "Handel's grand wind suite was composed under contract to George II to accompany a royal fireworks display in London's Green Park, celebrating peace with the full pomp of the court. Its blazing brass and ceremonial pageantry embody the sound of monarchy on public display, music made not for private chambers but for the spectacle of the crown before the people.",
        "source": "IMSLP",
        "href": "https://imslp.org/wiki/Music_for_the_Royal_Fireworks,_HWV_351_(Handel,_George_Frideric)"
      }
    ]
  },
  {
    "slug": "sothebys-london-record-392-million-sale",
    "headline": "Sotheby's London masterpiece sale earns a record-setting $392.6 million",
    "overview": "Sotheby's said its London masterpiece evening sale brought in $392.6 million, a record for the auction house's marquee summer event. The result signaled resilience at the top end of the art market despite broader economic uncertainty.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Artforum",
        "href": "https://www.artforum.com/news/sothebys-london-masterpiece-sale-earns-392-million-1234753425/"
      },
      {
        "name": "Artforum",
        "href": "https://www.artforum.com/news/sothebys-london-masterpiece-sale-earns-392-million-1234753425/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-26",
    "image": {
      "src": "/covers/sothebys-london-record-392-million-sale.png",
      "alt": "A 19th-century painting of a connoisseur appraising a work of art, evoking the collectors and experts who drive the high-end art market.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 26 June 2026",
    "rank": 37,
    "analogies": [
      {
        "category": "historical",
        "title": "The Sale of the Orleans Collection in London (1798)",
        "excerpt": "The Orleans Collection was a very important collection of over 500 paintings formed by Philippe II, Duke of Orléans, mostly acquired between about 1700 and his death in 1723. The pictures were put on exhibition for seven months in 1798, with a view to selling at a least a part of them, in Bryan's Gallery in Pall Mall, with the larger ones at the Lyceum in the Strand; admission was 2/6d rather than the 1s. usual for such events.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Orleans_Collection"
      },
      {
        "category": "historical",
        "title": "The Commonwealth 'Sale of the Late King's Goods' (1649)",
        "excerpt": "The entire Royal Collection, which included 1,500 paintings and 500 statues, was sold after Charles's execution in 1649. The 'Sale of the Late King's Goods' at Somerset House raised £185,000 for the English Republic.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Royal_Collection"
      },
      {
        "category": "literary",
        "title": "Honoré de Balzac, Cousin Pons (1847)",
        "excerpt": "This system, carried out for forty years, in Rome or Paris alike, had borne its fruits. Since Pons returned from Italy, he had regularly spent about two thousand francs a year upon a collection of masterpieces of every sort and description, a collection hidden away from all eyes but his own; and now his catalogue had reached the incredible number of 1907.",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/files/1856/1856-h/1856-h.htm"
      },
      {
        "category": "literary",
        "title": "Ecclesiastes 2:8–11 (King James Version, 1611)",
        "excerpt": "I gathered me also silver and gold, and the peculiar treasure of kings and of the provinces: I gat me men singers and women singers, and the delights of the sons of men, as musical instruments, and that of all sorts. So I was great, and increased more than all that were before me in Jerusalem: also my wisdom remained with me. And whatsoever mine eyes desired I kept not from them, I withheld not my heart from any joy; for my heart rejoiced in all my labour: and this was my portion of all my labour. Then I looked on all the works that my hands had wrought, and on the labour that I had laboured to do: and, behold, all was vanity and vexation of spirit, and there was no profit under the sun.",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Ecclesiastes"
      },
      {
        "category": "artistic",
        "title": "David Teniers the Younger, Archduke Leopold Wilhelm in his Painting Gallery in Brussels (c. 1647–1651)",
        "excerpt": "Teniers, court painter and de facto keeper of the Archduke's collection, fills the canvas wall-to-wall with masterpieces, a connoisseur's dream catalogued in paint. The Archduke and his friends move among the hung pictures while the artist inspects engravings at a table, an inventory of taste and possession that doubled as a marketing tool for the collection.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Archduke_Leopold_Wilhelm_in_his_Painting_Gallery_in_Brussels_(Prado)",
        "image": {
          "src": "/covers/sothebys-london-record-392-million-sale--art.png",
          "alt": "Archduke Leopold Wilhelm in his Painting Gallery in Brussels, David Teniers the Younger, c. 1647–1651, oil on copper depicting the Archduke and companions among walls densely hung with Italian masterpieces",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Franz Lehár, Gold und Silber (Gold and Silver Waltz), Op. 79 (1902)",
        "excerpt": "Lehár composed this glittering Viennese waltz at the request of Princess Pauline Metternich for her lavish high-society 'Gold and Silver Ball' of January 1902. Its shimmering, opulent melodies became an emblem of belle-époque luxury and aristocratic extravagance, the very sound of wealth on display.",
        "source": "IMSLP",
        "href": "https://imslp.org/wiki/Gold_und_Silber,_Op.79_(Leh%C3%A1r,_Franz)"
      }
    ]
  },
  {
    "slug": "paris-court-totalenergies-climate-order",
    "headline": "Paris court gives TotalEnergies six months to bring its climate policy into line",
    "overview": "A Paris court ordered French oil and gas major TotalEnergies to tighten its climate policies within six months, in a closely watched case brought by environmental groups. The ruling adds to mounting legal pressure on fossil-fuel companies to align their strategies with international climate goals.",
    "genre": "Climate",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMioAFBVV95cUxOekRzdVVjdnp4d3N5X1hMTzhnNlRJTU9GRTJNNkhJVzBMcG9mMW1jZFl4dXdORWlXMTMzSm1yYjdjdUs2Tk81Z1RxNG9qQU9kbjRORTZEc1F1Q3Nfd296ZkgyX0dHV2lFOGFlWUxKTXluSEc5dlJqZS1FOWJBSjduNVI4ZXhvSUNzenpUc29TMVRlUU4wdWxYemp2N3BnUlBj?oc=5"
      },
      {
        "name": "Fortune",
        "href": "https://fortune.com/2026/06/25/paris-court-total-energies-climate-policy-lawsuit-heatwave/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-26",
    "image": {
      "src": "/covers/paris-court-totalenergies-climate-order.png",
      "alt": "An oil refinery's towers and tanks at dusk, the fossil-fuel industry a French court has ordered to tighten its climate policy.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 26 June 2026",
    "rank": 38,
    "analogies": [
      {
        "category": "historical",
        "title": "Trail Smelter Arbitration (United States v. Canada), 1938 and 1941",
        "excerpt": "The Trail Smelter dispute was a trans-boundary pollution case involving the federal governments of both Canada and the United States, which eventually contributed to establishing the harm principle in the environmental law of transboundary pollution.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Trail_Smelter_dispute"
      },
      {
        "category": "historical",
        "title": "The 1948 Donora Smog, Pennsylvania, 1948",
        "excerpt": "The 1948 Donora smog, also called the Donora death fog, was an air pollution disaster that occurred in Donora, Pennsylvania, beginning on October 27, 1948, and lasting several days. It killed 20 people and caused respiratory problems for 6,000 of the 14,000 people living in Donora, a mill town on the Monongahela River 24 miles (39 km) southeast of Pittsburgh.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/1948_Donora_smog"
      },
      {
        "category": "literary",
        "title": "\"God's Grandeur\" by Gerard Manley Hopkins, written 1877 (published 1918)",
        "excerpt": "Generations have trod, have trod, have trod; And all is seared with trade; bleared, smeared with toil; And wears man's smudge and shares man's smell: the soil Is bare now, nor can foot feel, being shod. And for all this, nature is never spent; There lives the dearest freshness deep down things;",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/Poems_of_Gerard_Manley_Hopkins/God's_Grandeur"
      },
      {
        "category": "literary",
        "title": "An Enemy of the People by Henrik Ibsen, 1882",
        "excerpt": "All the nastiness up at Molledal, all that stinking filth, is infecting the water in the conduit-pipes leading to the reservoir; and the same cursed, filthy poison oozes out on the shore too—... The whole Bath establishment is a whited, poisoned sepulchre, I tell you—the gravest possible danger to the public health!",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/files/2446/2446-h/2446-h.htm"
      },
      {
        "category": "artistic",
        "title": "The Houses of Parliament, Sunset by Claude Monet, 1903",
        "excerpt": "Monet painted the Palace of Westminster again and again as a dim silhouette dissolving into the thick, sulfurous haze that hung over the Thames. The artist was openly fascinated by London's fogs, a by-product of the Industrial Revolution's coal smoke, and rendered the polluted air itself as shifting curtains of violet, amber and rose. What reads as beauty is also a portrait of a great city's sky choked by industry.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Houses_of_Parliament_(Monet_series)",
        "image": {
          "src": "/covers/paris-court-totalenergies-climate-order--art.png",
          "alt": "The Houses of Parliament, Sunset, Claude Monet, 1903, oil painting of the Palace of Westminster as a dark silhouette behind glowing industrial fog and smog over the River Thames",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Die Schöpfung (The Creation), oratorio by Joseph Haydn, 1798",
        "excerpt": "Haydn's grand oratorio sings the making of the world from primordial chaos into light, sea, sky and teeming life, voicing in radiant choruses the splendor of an unspoiled earth. Its exultant hymn to the heavens and the land stands as a vision of the very creation that climate litigation now seeks to defend. Against the soiled air and water of the industrial age, the score offers nature in its first, untainted glory.",
        "source": "IMSLP",
        "href": "https://imslp.org/wiki/Die_Sch%C3%B6pfung,_Hob.XXI:2_(Haydn,_Joseph)"
      }
    ]
  },
  {
    "slug": "congo-ebola-cases-rise-1155",
    "headline": "Democratic Republic of Congo says confirmed Ebola cases have risen to 1,155",
    "overview": "Health authorities in the Democratic Republic of Congo said the number of confirmed Ebola cases in the country's current outbreak has climbed to 1,155, as responders work to contain the spread. The figures underscore the scale of one of the largest recent flare-ups of the often-deadly virus.",
    "genre": "Science",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMivwFBVV95cUxPS1Fla3NXMkZiSGpDbjZXZk1uVUIxN0ROaHdKaURtN2RELW1pVkpmeERRMHkzQWttNXhFaE9UazZRaGlHOUJUYXFWcnVHSTRaaHdKc0lVTWVfa3VaR2dQYTVSYXU5MmZkZjhNaXRGZFJwdzRnWkpLYnAyM0N1ZDhTTEFNT0xKUFBiWERlTmg5dGViZVpCeFUzaUwzcWpmeGE0UmViNHVEa3VpWkw3V1NFYzkyYnJ3UnJEUHNOVEIzTQ?oc=5"
      },
      {
        "name": "World Health Organization — Disease Outbreak News",
        "href": "https://www.who.int/emergencies/disease-outbreak-news/item/2026-DON602"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-26",
    "image": {
      "src": "/covers/congo-ebola-cases-rise-1155.png",
      "alt": "A coloured electron-microscope image of an Ebola virus virion, the pathogen behind the outbreak spreading in the Democratic Republic of Congo.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 26 June 2026",
    "rank": 39,
    "analogies": [
      {
        "category": "historical",
        "title": "The Black Death (1346–1353)",
        "excerpt": "The Black Death was a catastrophic plague pandemic that swept across Eurasia and North Africa, caused by the bacterium Yersinia pestis spread by fleas and by respiratory transmission. It killed an estimated 25 to 50 million people, wiping out roughly 30 to 60 percent of Europe's population, with cities such as Florence losing as much as 80 percent of their inhabitants within months. Reaching Europe via Genoese traders fleeing the siege of Kaffa, it spread relentlessly through Mediterranean ports and trade networks.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Black_Death"
      },
      {
        "category": "historical",
        "title": "The 1918 Influenza Pandemic (1918–1920)",
        "excerpt": "The H1N1 influenza pandemic infected nearly a third of the global population — an estimated 500 million people — over roughly two years. Death estimates range from 17 million to 50 million, with some scholars proposing figures as high as 100 million. Its second wave in late 1918 proved far deadlier than the mild spring outbreak, with October 1918 the most lethal month, killing young, healthy adults in vast numbers.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Spanish_flu"
      },
      {
        "category": "literary",
        "title": "Mary Shelley, The Last Man (1826)",
        "excerpt": "Can it be true, each asked the other with wonder and dismay, that whole countries are laid waste, whole nations annihilated, by these disorders in nature? The vast cities of America, the fertile plains of Hindostan, the crowded abodes of the Chinese, are menaced with utter ruin. Where late the busy multitudes assembled for pleasure or profit, now only the sound of wailing and misery is heard. The air is empoisoned, and each human being inhales death, even while in youth and health, their hopes are in the flower.",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/18247/pg18247.txt"
      },
      {
        "category": "literary",
        "title": "Jack London, The Scarlet Plague (1912)",
        "excerpt": "The heart began to beat faster and the heat of the body to increase. Then came the scarlet rash, spreading like wildfire over the face and body. Most persons never noticed the increase in heat and heart-beat, and the first they knew was when the scarlet rash came out. Usually, they had convulsions at the time of the appearance of the rash.",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/21970/pg21970.txt"
      },
      {
        "category": "artistic",
        "title": "Pieter Bruegel the Elder, The Triumph of Death (c. 1562)",
        "excerpt": "An oil panel in which the triumph of Death over all earthly things is rendered as a vast army of skeletons laying waste to a blackened, desolate landscape. Death leads his legions on a reddish horse, herding the living toward an enormous coffin from which there is no escape — a sweeping vision of mortality overrunning every rank of society, painted in the shadow of recurring plague.",
        "source": "Museo Nacional del Prado",
        "href": "https://www.museodelprado.es/en/the-collection/art-work/the-triumph-of-death/d3d82b0b-9bf2-4082-ab04-66ed53196ccc",
        "image": {
          "src": "/covers/congo-ebola-cases-rise-1155--art.png",
          "alt": "The Triumph of Death, Pieter Bruegel the Elder, c. 1562, depicting an army of skeletons ravaging a blackened landscape and herding the living toward death",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Modest Mussorgsky, Songs and Dances of Death (1875–1877)",
        "excerpt": "A song cycle for voice and piano in four scenes, each portraying Death personified as he comes to claim the dying — soothing a sick child by its cradle, serenading a feverish young woman, luring a lost peasant to freeze in the snow, and gloating over a battlefield of the slain. Set to poems by Golenishchev-Kutuzov, the music turns the intimate, inescapable approach of death into a series of tender, terrifying encounters.",
        "source": "IMSLP",
        "href": "https://imslp.org/wiki/Songs_and_Dances_of_Death_(Mussorgsky,_Modest)"
      }
    ]
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
