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
// the Afternoon Edition of 30 June 2026 (ranks 1-13) leads with its hero story,
// followed by the Morning Edition of 30 June and the Evening Edition of 29 June 2026.
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
    "lead": true,
    "rank": 1
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
    "rank": 2
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
    "rank": 3
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
    "rank": 4
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
    "rank": 5
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
    "rank": 6
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
    "rank": 7
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
    "rank": 8
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
    "rank": 9
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
    "rank": 10
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
    "rank": 11
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
    "rank": 12
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
    "rank": 13
  },
  {
    "slug": "guo-wengui-30-years-fraud",
    "headline": "Exiled Chinese tycoon Guo Wengui sentenced to 30 years in US prison for a $1 billion fraud",
    "overview": "Guo Wengui, the self-exiled Chinese businessman and ally of Steve Bannon, was sentenced by a Manhattan federal court to 30 years in prison after being convicted of defrauding thousands of his online followers of more than $1 billion. Prosecutors said he spent the proceeds on a yacht, mansions and luxury cars while casting himself as a crusader against the Chinese Communist Party.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMinAFBVV95cUxOWWRvWFlGZFBqSEdVeUF3eXg5VV9FMWdfeGdIU0JFdXhEOTl5Z1VtUVV6dUtHVEpxVzJlMDl1UlpFdGlUSlJUTFZNOG4zNnFWemh5RUR2TFhWRzN2bWpTb3RmUkM1bXJ2VUhWVVBLZHVTTThMWHh0dFRJRmtncjVKOXdXeUNScVlTY08xTWJCQlA2Qjl5d1QtaVF0ZlU?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cjeg15vw3z9o?at_medium=RSS&at_campaign=rss"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-30",
    "image": {
      "src": "/covers/guo-wengui-30-years-fraud.png",
      "alt": "The Thurgood Marshall United States Courthouse in Lower Manhattan, where the federal fraud trial was held.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 30 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Charles Mackay, \"The South-Sea Bubble,\" Memoirs of Extraordinary Popular Delusions and the Madness of Crowds (1841)",
        "excerpt": "It seemed at that time as if the whole nation had turned stockjobbers. Exchange Alley was every day blocked up by crowds, and Cornhill was impassable for the number of carriages.",
        "source": "Charles Mackay, Memoirs of Extraordinary Popular Delusions and the Madness of Crowds, Vol. 1, Ch. 2 (\"The South-Sea Bubble\"), 1841; hosted at Wikisource.",
        "href": "https://en.wikisource.org/wiki/Memoirs_of_Extraordinary_Popular_Delusions_and_the_Madness_of_Crowds/Volume_1/Chapter_2"
      },
      {
        "category": "historical",
        "title": "\"Captain Thomas Strangeways,\" Sketch of the Mosquito Shore, Including the Territory of Poyais (1822) — the fraudulent guidebook of the swindler Gregor MacGregor",
        "excerpt": "Several noble rivers, after having watered some of the richest land, perhaps, in the world, empty themselves in the vast lagoon of which this harbour is part.",
        "source": "Thomas Strangeways (pseud.), Sketch of the Mosquito Shore, Including the Territory of Poyais, Edinburgh, 1822; digitized full text hosted at the Internet Archive. The book was a promotional fiction by which Gregor MacGregor, self-styled \"Cazique of Poyais,\" lured British and Scottish investors and settlers to a country that did not exist.",
        "href": "https://archive.org/details/sketchmosquitos00conggoog"
      },
      {
        "category": "literary",
        "title": "Anthony Trollope, The Way We Live Now (1875) — the financier-swindler Augustus Melmotte",
        "excerpt": "he was regarded in Paris as the most gigantic swindler that had ever lived; that he had made that City too hot to hold him",
        "source": "Anthony Trollope, The Way We Live Now (1875), Project Gutenberg eBook #5231.",
        "href": "https://www.gutenberg.org/files/5231/5231-h/5231-h.htm"
      },
      {
        "category": "literary",
        "title": "Geoffrey Chaucer, \"The Pardoner's Prologue,\" The Canterbury Tales (late 14th century)",
        "excerpt": "Thus I can preach against that same sin which I practise, and that is avarice. Though of that sin myself be guilty, yet I can make other folk to cast off avarice, and sore to repent; but that is not my principal aim; I preach nothing but for covetousness. For my purpose is naught but gain, and not a whit correction of sin.",
        "source": "Geoffrey Chaucer, The Canterbury Tales of Geoffrey Chaucer (\"The Pardoner's Tale / Prologue\"); modern-English rendering hosted at Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_Canterbury_Tales_of_Geoffrey_Chaucer/Pardoner%E2%80%99s_Tale/Prologue"
      },
      {
        "category": "artistic",
        "title": "Wolfgang Amadeus Mozart, Don Giovanni, K.527 (1787) — the charismatic deceiver dragged down to his reckoning — MUSIC",
        "excerpt": "Mozart's dramma giocoso follows a glittering, fearless seducer who lies, cheats and squanders his way through the world while charming all who follow him. In the final scene the stone statue of a murdered man arrives at his lavish banquet and, before the eyes of his victims, drags the unrepentant libertine down to the flames. The opera's resonance lies in its insistence that no amount of charm, luxury or defiance can finally outrun the moment of judgment.",
        "source": "Wolfgang Amadeus Mozart, Don Giovanni, K.527 (1787), full scores and parts hosted at IMSLP / Petrucci Music Library.",
        "href": "https://imslp.org/wiki/Don_Giovanni,_K.527_(Mozart,_Wolfgang_Amadeus)"
      },
      {
        "category": "artistic",
        "title": "William Hogarth, An Emblematical Print on the South Sea Scheme (1721) — VISUAL ARTWORK",
        "excerpt": "Hogarth's crowded satirical print depicts the frenzy of the 1720 South Sea Bubble: a merry-go-round of deluded speculators whirls beneath a swindler's machine, Honesty is broken on a wheel while Villainy flogs her, and Trade lies dead as the mob scrambles after worthless paper riches. It is among the earliest editorial cartoons, indicting the credulity of the crowd and the cynicism of those who fleece them for vain, ill-gotten gain.",
        "source": "William Hogarth, An Emblematical Print on the South Sea Scheme (also known as The South Sea Scheme), 1721; image hosted at Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:William_Hogarth_-_The_South_Sea_Scheme.png",
        "image": {
          "src": "/covers/guo-wengui-30-years-fraud--art.png",
          "alt": "William Hogarth's 1721 satirical engraving of the South Sea Bubble: a chaotic London scene with a crowd riding a swindler's merry-go-round, the figure of Honesty broken on a wheel, and speculators scrambling after paper riches.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "lead": true,
    "rank": 14
  },
  {
    "slug": "taiwan-president-cadets-china",
    "headline": "Taiwan's president urges military cadets to keep the island out of 'China's clutches'",
    "overview": "Taiwan's President Lai Ching-te told graduating military cadets in Taipei to guard against Chinese infiltration and espionage and to keep the island out of Beijing's 'clutches,' as he sought to bolster the armed forces amid sustained pressure from China. Beijing claims Taiwan as its own territory.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMisgFBVV95cUxNU0ZSNllHVC1Ea0NYUzk0SlhUSzBRSEtzUEhwYXVIaEkybTQwOEtPMWFGV254UjMyWlJIWS1yZDIwaFRmclpmQXFVM0xIWFhHM0MyQ3c0dkV6Mm5XbGMwSHhDdlBXUnF5dUxJY2pDZExST3BHdnpoWEIwam5Sb2MyaDJvU1YzcktBdG1KUHQxeUlYY1VaenpRWW9abEhNV19RR25lUWg4MFJlcG1DZVJXVk1R?oc=5"
      },
      {
        "name": "Taipei Times",
        "href": "https://news.google.com/rss/articles/CBMiekFVX3lxTFBFTjBHWEYtZHhBb1M3MXRIT0NkeEM2dXRYX0hQektWdmhrT1ZTUlhVM1VCUXgxcWY1WnpnY3dNUXRCOWVjU1REVW14Uk9GdnkzdUhGQ2dDWGREOUpINkg3dG1qSWxZWHZfRDRMdHZTbk9MMkQ2dHVPSWVR?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-30",
    "image": {
      "src": "/covers/taiwan-president-cadets-china.png",
      "alt": "The Presidential Office Building in Taipei, seat of Taiwan's government.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 30 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Thucydides, the Melian Dialogue (History of the Peloponnesian War, Book 5, c. 416 BCE)",
        "excerpt": "right, as the world goes, is only in question between equals in power, while the strong do what they can and the weak suffer what they must.",
        "source": "Thucydides, History of the Peloponnesian War 5.89, trans. Richard Crawley, Perseus Digital Library, Tufts University (perseus.tufts.edu)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0200:book%3D5:chapter%3D89:section%3D1"
      },
      {
        "category": "historical",
        "title": "Demosthenes, First Philippic, section 10 (351 BCE)",
        "excerpt": "When, Athenians, will you take the necessary action? What are you waiting for? Until you are compelled, I presume. But what are we to think of what is happening now? For my own part I think that for a free people there can be no greater compulsion than shame for their position.",
        "source": "Demosthenes, Philippic 1, section 10, trans. J. H. Vince (1930), Perseus Digital Library, Tufts University (perseus.tufts.edu)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0070:speech=4:section=10"
      },
      {
        "category": "literary",
        "title": "William Shakespeare, Henry V, Act III, Scene 1, \"Once more unto the breach\" (c. 1599)",
        "excerpt": "Once more unto the breach, dear friends, once more, / Or close the wall up with our English dead. / In peace there's nothing so becomes a man / As modest stillness and humility; / But when the blast of war blows in our ears, / Then imitate the action of the tiger; / Stiffen the sinews, summon up the blood, / Disguise fair nature with hard-favour'd rage.",
        "source": "William Shakespeare, The Life of King Henry the Fifth, Act III, Scene 1, Project Gutenberg eBook #1521 (gutenberg.org)",
        "href": "https://www.gutenberg.org/files/1521/1521-h/1521-h.htm"
      },
      {
        "category": "literary",
        "title": "Thomas Babington Macaulay, \"Horatius\" from Lays of Ancient Rome, stanza XXVII (1842)",
        "excerpt": "Then out spake brave Horatius, / The Captain of the Gate: / \"To every man upon this earth / Death cometh soon or late. / And how can man die better / Than facing fearful odds, / For the ashes of his fathers, / And the temples of his gods\"",
        "source": "Thomas Babington Macaulay, \"Horatius,\" Lays of Ancient Rome, Project Gutenberg eBook #847 (gutenberg.org)",
        "href": "https://www.gutenberg.org/files/847/847-h/847-h.htm"
      },
      {
        "category": "artistic",
        "title": "Jean Sibelius, Finlandia, Op. 26 (1900) — MUSIC",
        "excerpt": "Composed in 1900 as a veiled protest against Russian censorship of the Finnish press, Sibelius's tone poem opens with growling, oppressive brass before surging into a defiant hymn that became an unofficial anthem of Finnish nationhood. Banned at times by the Tsarist authorities, it crystallized a small nation's will to endure and remain free under the shadow of a vast neighbour — the very resolve Lai Ching-te invokes for Taiwan.",
        "source": "Jean Sibelius, Finlandia, Op. 26 (1900), scores hosted at the International Music Score Library Project / Petrucci Music Library (imslp.org)",
        "href": "https://imslp.org/wiki/Finlandia,_Op.26_(Sibelius,_Jean)"
      },
      {
        "category": "artistic",
        "title": "Jacques-Louis David, Leonidas at Thermopylae (1814) — VISUAL ARTWORK",
        "excerpt": "David's vast neoclassical canvas shows the Spartan king Leonidas seated amid his outnumbered band before the pass of Thermopylae, calm and resolute as he prepares to die defending Greece against the overwhelming Persian host. The composition glorifies the disciplined resolve of the few who stand for liberty against an empire — a fitting image for a small free state steeling itself against a looming power.",
        "source": "Jacques-Louis David, Leonidas at Thermopylae (1814), oil on canvas, Musée du Louvre, Paris (INV 3690); image via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:L%C3%A9onidas_aux_Thermopyles_-_Jacques-Louis_David_-_Mus%C3%A9e_du_Louvre_Peintures_INV_3690_%3B_L_3711.jpg",
        "image": {
          "src": "/covers/taiwan-president-cadets-china--art.png",
          "alt": "Jacques-Louis David's neoclassical painting Leonidas at Thermopylae, depicting the Spartan king seated bare-chested with sword and shield amid his soldiers preparing to defend the mountain pass against the Persian army.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 15
  },
  {
    "slug": "pakistan-strikes-afghanistan-civilians",
    "headline": "Pakistani airstrikes kill dozens of civilians in eastern Afghanistan, the UN says",
    "overview": "Pakistani airstrikes on eastern Afghanistan killed at least 28 civilians, the United Nations said, while Afghan officials put the toll higher, at 36 dead and about 160 wounded, most of them women and children. Pakistan said it was striking militant hideouts; the Taliban government condemned the strikes as a violation of Afghan sovereignty.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cy8wygyed0wo?at_medium=RSS&at_campaign=rss"
      },
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMiowFBVV95cUxQU0F6dXd5RmdVQ3k3UDVULUxVNEsyWmd0LWdIT0FvZENuYlVCcE1lalFGT0xVS2lWVUN1MHcwWVJXT0d1R3JUNlZuekJLZGNkYVNVTXZVcFZ3Q0RvaFZ0b1N4aDBtdFVkNzNJTk1yRmVLaHJYNG13cEEtcm40YnZfbjlZbjREUnJSSTZCZi16Ym42ZW9BN2NRV0FFeTd5Y3poRExN?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-30",
    "image": {
      "src": "/covers/pakistan-strikes-afghanistan-civilians.png",
      "alt": "The Spin Ghar (White Mountains) range in eastern Afghanistan near Jalalabad.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 30 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Hansard, House of Commons, 'Frontier Operations (Bombing Warnings)' (3 December 1919)",
        "excerpt": "Lieut.-Commander KENWORTHY asked the Secretary of State for India whether warning is given in time to allow the removal of women, children, and other non-combatants before bombing raids by aeroplane are carried out on frontier towns and villages? Mr. MONTAGU: Warning was given to the Wazirs and Mahsuds, after they had rejected our terms, that they would be subjected to bombing from the air, after time had been allowed for the removal of women and children.",
        "source": "Parliamentary Debates (Hansard), House of Commons, 3 December 1919, 'Frontier Operations (Bombing Warnings)', hosted at the UK Parliament Historic Hansard archive (api.parliament.uk/historic-hansard).",
        "href": "https://api.parliament.uk/historic-hansard/commons/1919/dec/03/frontier-operations-bombing-warnings"
      },
      {
        "category": "historical",
        "title": "George Steer, 'The Tragedy of Guernica' — original report in The Times (27 April 1937)",
        "excerpt": "Guernica, the most ancient town of the Basques and the centre of their cultural tradition, was completely destroyed yesterday afternoon by insurgent air raiders. The bombardment of this open town far behind the lines occupied precisely three hours and a quarter, during which a powerful fleet of aeroplanes consisting of three German types, Junkers and Heinkel bombers and Heinkel fighters, did not cease unloading on the town bombs weighing from 1,000lb. downwards.",
        "source": "George L. Steer, 'The Tragedy of Guernica,' The Times (London), 27 April 1937; original newspaper clipping reproduced on Wikimedia Commons (public domain).",
        "href": "https://commons.wikimedia.org/wiki/File:The_tragedy_of_Guernica_(George_Steer).jpg"
      },
      {
        "category": "literary",
        "title": "Euripides, The Trojan Women (415 BC), Hecuba's lament (trans. E. P. Coleridge)",
        "excerpt": "Ah me! ah me! What else but tears is now my hapless lot, whose country, children, husband, all are lost? Ah! the high-blown pride of ancestors, humbled! how brought to nothing after all!",
        "source": "Euripides, The Trojan Women, English translation by E. P. Coleridge, in the Perseus Digital Library, Tufts University (perseus.tufts.edu).",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0124%3Acard%3D98"
      },
      {
        "category": "literary",
        "title": "Homer, The Iliad, Book XXIV — Andromache's lament for Hector (trans. Samuel Butler)",
        "excerpt": "Husband, you have died young, and leave me in your house a widow; he of whom we are the ill-starred parents is still a mere child, and I fear he may not reach manhood. Ere he can do so our city will be razed and overthrown, for you who watched over it are no more- you who were its saviour, the guardian of our wives and children.",
        "source": "Homer, The Iliad, Book XXIV, prose translation by Samuel Butler (1898), hosted at Wikisource (en.wikisource.org).",
        "href": "https://en.wikisource.org/wiki/The_Iliad_(Butler)/Book_XXIV"
      },
      {
        "category": "artistic",
        "title": "Thomas Tallis, The Lamentations of Jeremiah (c. 1565) — MUSIC",
        "excerpt": "How doth the city sit solitary, that was full of people! how is she become as a widow! ... For these things I weep; mine eye, mine eye runneth down with water, because the comforter that should relieve my soul is far from me: my children are desolate, because the enemy prevailed.",
        "source": "Thomas Tallis, Lamentations of Jeremiah (setting of the Book of Lamentations, ch. 1), public-domain scores at the International Music Score Library Project (imslp.org); scriptural text quoted from the King James Version of Lamentations 1:1, 1:16.",
        "href": "https://imslp.org/wiki/Lamentations_(Tallis,_Thomas)"
      },
      {
        "category": "artistic",
        "title": "Francisco Goya, The Third of May 1808 (1814) — VISUAL ARTWORK",
        "excerpt": "Goya's vast canvas seizes the instant before a faceless firing squad cuts down a row of unarmed townspeople: a white-shirted man flings his arms wide in a cruciform cry while the dead lie bleeding at his feet and others cover their faces in terror. Painted to commemorate Spanish civilians slaughtered during the Napoleonic occupation, it turns the anonymous, mechanical killing of the defenceless into an indictment that resonates with the women and children mourned after the strikes on eastern Afghanistan.",
        "source": "Francisco Goya, El tres de mayo de 1808 en Madrid (The Third of May 1808), oil on canvas, 1814, Museo Nacional del Prado, Madrid; high-resolution image via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:El_Tres_de_Mayo,_by_Francisco_de_Goya,_from_Prado_thin_black_margin.jpg",
        "image": {
          "src": "/covers/pakistan-strikes-afghanistan-civilians--art.png",
          "alt": "Goya's painting The Third of May 1808: a kneeling man in a white shirt throws his arms wide in surrender before a faceless firing squad, the bodies of executed civilians lying bloodied around him under a dark night sky.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 16
  },
  {
    "slug": "israel-strikes-gaza-children",
    "headline": "Israeli strikes kill at least 8 people in Gaza, including 2 children, health officials say",
    "overview": "Israeli strikes across the Gaza Strip killed at least eight people, including two children, Palestinian health officials said, with one strike hitting a tent sheltering displaced families. The deaths came amid reports of repeated violations of a fragile ceasefire.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMingFBVV95cUxQSGw4TkJCNUpfellkLVZuMWludlVPMnpDMFJ3OS1WcDRWVHNyUks0MjB2ZERaOXYwQ3BIa3I3VzU1VWhjMHFES0tVZG5tbDdjbGllN05xNWtyZGd1Z2J6cy1tQ01XNTVWMjNtUUFXUk5LQ1ZiNXZiZDZqamRuaHNWRkQ2SnJ4UVRCTWFxb2dMR1A5cVctaVhyYnpmclVUZw?oc=5"
      },
      {
        "name": "Al Jazeera",
        "href": "https://news.google.com/rss/articles/CBMitwFBVV95cUxOaTRlaE43WkRTTEx6VDdncEE3LTR6b0ExM1hWZkxxTmNCY1pKay1oWlVYdS1hd1VHdXhLQV9lUV9nM294alYzeWJrSm1yTzRhNXB3WnVjOU90SmZiUGwxTVN0Q1VzSW1LdXNvNWNzQVI0N2NOeFUtdno2ODFtcHdRZzZJMlhXTDdGb0pKZVdmTjNZbC1tenk2WXBOanZhZ0plX293Uy1hNnFrZ3hQemEtcXNSbHlubnfSAbwBQVVfeXFMTjBYWkJzUlg0dHdva2dGcnZ2d0VVNzRJZEZpWlRvNXI0b0hWdFR2X084VmluUFBsRFhJTXNKZjFsLXdrZkdSdWl5SmRWbHpva0lJYjg3WFFBRURfc01XdER0R1g5RUZSaDd5VGlkQ1NwQjEyOVVobmpzb1FJQlh6aXE5SjdOc19JU2xOZG8tSVhGTTN2YW1VVEpid2R0UWwzUFFJNkFoSnVHUjYweUVYMmJnQXp3N0ticUxReTk?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-30",
    "image": {
      "src": "/covers/israel-strikes-gaza-children.png",
      "alt": "Displaced families' tents huddled beneath a dark sky in Gaza.",
      "credit": "AI-generated"
    },
    "edition": "Afternoon Edition · 30 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Thucydides on the Siege and Massacre of Melos (c. 416 BC), from the History of the Peloponnesian War",
        "excerpt": "they slew all the men of military age, made slaves of the women and children, and inhabited the place with a colony sent thither afterwards of five hundred men of their own.",
        "source": "Thucydides, History of the Peloponnesian War, Book 5.116 (Richard Crawley translation), hosted by the Perseus Digital Library, Tufts University (perseus.tufts.edu).",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Thuc.+5.116"
      },
      {
        "category": "historical",
        "title": "Josephus, The Wars of the Jews (c. 75 AD): the famine in besieged Jerusalem",
        "excerpt": "It was now a miserable case, and a sight that would justly bring tears into our eyes... the famine was too hard for all other passions, and it is destructive to nothing so much as to modesty; for what was otherwise worthy of reverence was in this case despised; insomuch that children pulled the very morsels that their fathers were eating out of their very mouths, and what was still more to be pitied, so did the mothers do as to their infants.",
        "source": "Flavius Josephus, The Wars of the Jews, Book 5, ch. 10, sec. 3 (William Whiston translation), hosted by the Perseus Digital Library, Tufts University (perseus.tufts.edu).",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0148%3Abook%3D5%3Awhiston+chapter%3D10%3Awhiston+section%3D3"
      },
      {
        "category": "literary",
        "title": "Euripides, The Trojan Women (415 BC): Hecuba over the body of the slain child Astyanax",
        "excerpt": "Place the shield upon the ground, Hector's shield so deftly rounded, a piteous sight, a bitter grief for me to see. O you Achaeans, more reason have you to boast of your prowess than your wisdom. Why have you in terror of this child been guilty of a murder never matched before? Did you fear that some day he would rear again the fallen walls of Troy?... now that our city is taken and every Phrygian slain, you fear a tender child like this!",
        "source": "Euripides, The Trojan Women (E. P. Coleridge translation, 1891), hosted by the Perseus Digital Library, Tufts University (perseus.tufts.edu).",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0124%3Acard%3D1156"
      },
      {
        "category": "literary",
        "title": "The Book of Lamentations (Authorized King James Version): the elegy over ruined Jerusalem",
        "excerpt": "How doth the city sit solitary, that was full of people! how is she become as a widow!... Mine eyes do fail with tears, my bowels are troubled, my liver is poured upon the earth, for the destruction of the daughter of my people; because the children and the sucklings swoon in the streets of the city.",
        "source": "Lamentations 1:1 and 2:11, Bible (King James Version), hosted by Wikisource (en.wikisource.org).",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Lamentations"
      },
      {
        "category": "artistic",
        "title": "Thomas Tallis, The Lamentations of Jeremiah (c. 1565) — MUSIC",
        "excerpt": "Tallis's five-voice setting of the opening of the Book of Lamentations transforms the prophet's grief over the fall of Jerusalem into one of the great laments of Renaissance polyphony. The somber Latin verses, framed by the Hebrew letters Aleph and Beth, unfold in slow, intertwining lines that hold mourning and consolation in the same breath. Its weeping over a desolated, depopulated city resonates directly with grief for a besieged people and the small bodies carried from the rubble.",
        "source": "Thomas Tallis, Lamentations of Jeremiah (Incipit lamentatio / De lamentatione), public-domain score, International Music Score Library Project (imslp.org).",
        "href": "https://imslp.org/wiki/Lamentations_(Tallis,_Thomas)"
      },
      {
        "category": "artistic",
        "title": "Pieter Bruegel the Elder, The Massacre of the Innocents (c. 1565–1567) — VISUAL ARTWORK",
        "excerpt": "Bruegel relocates Herod's slaughter of the children of Bethlehem to a snowbound Flemish village, where armored soldiers ride down on ordinary families and tear infants from their parents' arms. Mothers kneel and plead in the snow while their homes are ransacked, the everyday setting making the horror unbearably close. By transposing an ancient massacre of the innocents into his own war-torn present, the painting becomes a timeless indictment of soldiers who kill children and of grief that finds no comfort.",
        "source": "Pieter Bruegel the Elder, The Massacre of the Innocents (oil on panel, c. 1565–1567), Royal Collection, Windsor Castle (RCIN 405787); image via Wikimedia Commons (Google Art Project).",
        "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_the_Elder_-_Massacre_of_the_Innocents_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/israel-strikes-gaza-children--art.png",
          "alt": "A snow-covered Flemish village where armored soldiers on horseback descend on terrified families, seizing and killing infants while mothers kneel weeping and begging in the snow.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 17
  },
  {
    "slug": "colorado-utah-wildfire-firefighters",
    "headline": "Three firefighters die battling wildfires on the Colorado-Utah border",
    "overview": "Three wildland firefighters were killed fighting fast-moving wildfires along the Colorado-Utah state line, authorities said, with officials reporting the crew had been trying to shield themselves from advancing flames. The fires are among several burning across a parched American West during intense early-summer heat.",
    "genre": "Climate",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cp8l7mpmdggo?at_medium=RSS&at_campaign=rss"
      },
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMimAFBVV95cUxQcHgwOEVxNkNGS2o3XzBOY2RFaVdmc2dUbm54aGtyOFRDTFZkRnFWd3NTb09sR3RKZ3Nucl9EeG5uMGxKeWU5T21uUlloWEtJYlRQQVNJLV9LRlMxRDkxeW9iU0drdzFNSTlKMWJJUUR0VzZuOC1Ca09naWVDVC1RVlMyNnRRTzFlaUlOU3I3NUtFRzI2cXVRVg?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-30",
    "image": {
      "src": "/covers/colorado-utah-wildfire-firefighters.png",
      "alt": "A wildfire burning across rugged forested terrain in the American West.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 30 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Tacitus, The Annals, Book XV (chapters 38-44), on the Great Fire of Rome (AD 64), written c. AD 116",
        "excerpt": "A disaster followed, whether accidental or treacherously contrived by the emperor, is uncertain, as authors have given both accounts, worse, however, and more dreadful than any which have ever happened to this city by the violence of fire. ... The blaze in its fury ran first through the level portions of the city, then rising to the hills, while it again devastated every place below them, it outstripped all preventive measures; so rapid was the mischief and so completely at its mercy the city, with those narrow winding passages and irregular streets, which characterised old Rome.",
        "source": "Tacitus, The Annals, Book 15, trans. Alfred John Church and William Jackson Brodribb; hosted on Wikisource (en.wikisource.org).",
        "href": "https://en.wikisource.org/wiki/The_Annals_(Tacitus)/Book_15"
      },
      {
        "category": "historical",
        "title": "Samuel Pepys, Diary entry for 2 September 1666, the Great Fire of London",
        "excerpt": "So near the fire as we could for smoke; and all over the Thames, with one's face in the wind, you were almost burned with a shower of fire-drops. ... we saw the fire as only one entire arch of fire from this to the other side the bridge, and in a bow up the hill for an arch of above a mile long: it made me weep to see it. The churches, houses, and all on fire and flaming at once; and a horrid noise the flames made, and the cracking of houses at their ruine.",
        "source": "The Diary of Samuel Pepys, Vol. 45: August/September 1666, transcribed from the Pepysian Library shorthand manuscript; Project Gutenberg ebook #4167.",
        "href": "https://www.gutenberg.org/cache/epub/4167/pg4167.txt"
      },
      {
        "category": "literary",
        "title": "Virgil, Aeneid, Book II (the burning of Troy), trans. John Dryden (1697)",
        "excerpt": "The palace of Deiphobus ascends\nIn smoky flames, and catches on his friends.\nUcalegon burns next: the seas are bright\nWith splendour not their own, and shine with Trojan light.",
        "source": "Virgil, The Aeneid, Book II, translated by John Dryden; Project Gutenberg ebook #228 (gutenberg.org).",
        "href": "https://www.gutenberg.org/files/228/228-h/228-h.htm"
      },
      {
        "category": "literary",
        "title": "Robert Frost, \"Fire and Ice\" (1920)",
        "excerpt": "Some say the world will end in fire,\nSome say in ice.\nFrom what I've tasted of desire\nI hold with those who favor fire.\nBut if it had to perish twice,\nI think I know enough of hate\nTo know that for destruction ice\nIs also great,\nAnd would suffice.",
        "source": "Robert Frost, \"Fire and Ice,\" in American Poetry 1922: A Miscellany; hosted on Wikisource (en.wikisource.org).",
        "href": "https://en.wikisource.org/wiki/American_Poetry_1922/Fire_and_Ice"
      },
      {
        "category": "artistic",
        "title": "Manuel de Falla, \"Danza ritual del fuego\" (Ritual Fire Dance) from El amor brujo (1915, rev. 1916-20) — MUSIC",
        "excerpt": "Falla's \"Ritual Fire Dance,\" the incandescent centerpiece of his Andalusian ballet El amor brujo, conjures fire through music: shivering tremolos that flicker like sparks, a snapping, obsessive melody that leaps and crackles, and surging orchestral flares that rise and fall like flames in the night. Written to accompany a midnight dance meant to exorcise a haunting spirit, it captures fire as both a consuming danger and an awesome, almost sacred force — a fitting echo of crews confronting an elemental blaze that demands everything of those who face it.",
        "source": "Manuel de Falla, El amor brujo (containing the Danza ritual del fuego); scores hosted at the International Music Score Library Project (imslp.org).",
        "href": "https://imslp.org/wiki/El_amor_brujo_(Falla,_Manuel_de)"
      },
      {
        "category": "artistic",
        "title": "J. M. W. Turner, The Burning of the Houses of Lords and Commons, 16 October 1834 (1834-35) — VISUAL ARTWORK",
        "excerpt": "Turner painted the night the Houses of Parliament burned, turning catastrophe into the sublime: a wall of golden-white flame erupts into a roiling sky, its glare doubled in the dark river below where tiny crowds gather to watch. The towers of Westminster glow like embers against the inferno. The picture renders fire as Turner saw it that October night — beautiful, overwhelming, and indifferent to the human structures and figures dwarfed before it, much as a fast-moving wildfire dwarfs the firefighters who stand against it.",
        "source": "J. M. W. Turner, The Burning of the Houses of Lords and Commons, October 16, 1834 (oil on canvas), Philadelphia Museum of Art; image via Wikimedia Commons (Google Art Project).",
        "href": "https://commons.wikimedia.org/wiki/File:Joseph_Mallord_William_Turner,_English_-_The_Burning_of_the_Houses_of_Lords_and_Commons,_October_16,_1834_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/colorado-utah-wildfire-firefighters--art.png",
          "alt": "J. M. W. Turner's 1834-35 oil painting showing the Houses of Parliament engulfed in towering golden-white flames against a turbulent night sky, the fire reflected in the dark River Thames with small crowds of onlookers in the foreground.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 18
  },
  {
    "slug": "gojek-makarim-graft",
    "headline": "Gojek founder and former Indonesian minister Nadiem Makarim found guilty of corruption",
    "overview": "Nadiem Makarim, the founder of the Southeast Asian super-app Gojek and a former Indonesian education minister, was found guilty of corruption by a Jakarta court and sentenced to prison over a government laptop-procurement scheme. He had been one of the country's most prominent tech entrepreneurs before entering politics.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMivAFBVV95cUxOYnN6WVhHYTBtekxWRlRWOXl5LVpzRzJ5Tml6ZnByVjUwM1c2Sl9IMTNJUXhORVJ3UndKRHZwc2Z3VThlVFFYRTdZeE1fSldOd1lNajBuQXVtQlFqbkZQTjVlcmNFS3JhWk9sU0Q4OFlrTGFTS25LMjUyUlRmMjJQcTY5amtqWm10aXpMbUlfcDlNaUVXekFYSUpEZXF0QktSWHJ5SEl0SWMwVFM2S2hQY0M5bVZZWUcwUjRPdg?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c79yvw23yr9o?at_medium=RSS&at_campaign=rss"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-30",
    "image": {
      "src": "/covers/gojek-makarim-graft.png",
      "alt": "Nadiem Makarim, founder of Gojek and former Indonesian education minister.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 30 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Cicero, In Verrem (First Pleading against Verres), 70 BCE — prosecution of a corrupt Roman governor",
        "excerpt": "For there is now brought before your tribunal a man who is the embezzler of the public funds, the petty tyrant of Asia and Pamphylia, the robber who deprived the city of its rights, the disgrace and ruin of the province of Sicily. And if you come to a decision about this man with severity and a due regard to your oaths, that authority which ought to remain in you will cling to you still; but if that man's vast riches shall break down the sanctity and honesty of the courts of justice, at least I shall achieve this, that it shall be plain that it was rather honest judgment that was wanting to the republic, than a criminal to the judges or an accuser to the criminal.",
        "source": "Marcus Tullius Cicero, Against Verres, First Pleading, trans. C. D. Yonge; hosted at Wikisource (en.wikisource.org).",
        "href": "https://en.wikisource.org/wiki/Against_Verres/First_pleading"
      },
      {
        "category": "historical",
        "title": "Edmund Burke, Speech at the Impeachment of Warren Hastings, 1788 — a powerful official charged with plundering public office",
        "excerpt": "I impeach Warren Hastings, Esquire, of high crimes and misdemeanors. I impeach him in the name of the Commons of Great Britain in Parliament assembled, whose parliamentary trust he has betrayed. I impeach him in the name of all the Commons of Great Britain, whose national character he has dishonored. I impeach him in the name of the people of India, whose laws, rights, and liberties he has subverted; whose properties he has destroyed; whose country he has laid waste and desolate. I impeach him in the name and by virtue of those eternal laws of justice which he has violated. I impeach him in the name of human nature itself, which he has cruelly outraged, injured, and oppressed, in both sexes, in every age, rank, situation, and condition of life.",
        "source": "Edmund Burke, 'At the Trial of Warren Hastings,' in The World's Famous Orations, Vol. 6; hosted at Wikisource (en.wikisource.org).",
        "href": "https://en.wikisource.org/wiki/The_World's_Famous_Orations/Volume_6/At_the_Trial_of_Warren_Hastings"
      },
      {
        "category": "literary",
        "title": "Dante Alighieri, Inferno, Canto XXI (the Barrators/grafters in boiling pitch), c. 1320, Longfellow translation",
        "excerpt": "\"O Malebranche,\" he began to cry, / \"Behold one of the elders of Saint Zita; / Plunge him beneath, for I return for others / Unto that town, which is well furnished with them. / All there are barrators, except Bonturo; / No into Yes for money there is changed.\" / He hurled him down, and over the hard crag / Turned round, and never was a mastiff loosened / In so much hurry to pursue a thief.",
        "source": "Dante Alighieri, The Divine Comedy: Inferno, Canto XXI, trans. Henry Wadsworth Longfellow (1867); hosted at Wikisource (en.wikisource.org).",
        "href": "https://en.wikisource.org/wiki/Divine_Comedy_(Longfellow_1867)/Volume_1/Canto_21"
      },
      {
        "category": "literary",
        "title": "William Shakespeare, King Henry VIII, Act III Scene 2 — Cardinal Wolsey's 'fallen' farewell to greatness, c. 1613",
        "excerpt": "Farewell? a long farewell to all my greatness! / This is the state of man: to-day he puts forth / The tender leaves of hope, to-morrow blossoms, / And bears his blushing honours thick upon him; / The third day comes a frost, a killing frost, / And when he thinks, good easy man, full surely / His greatness is a-ripening, nips his root, / And then he falls, as I do. I have ventur'd, / Like little wanton boys that swim on bladders, / This many summers in a sea of glory, / But far beyond my depth.",
        "source": "William Shakespeare, The Famous History of the Life of King Henry the Eighth, Act III, Scene 2; Project Gutenberg (gutenberg.org).",
        "href": "https://www.gutenberg.org/cache/epub/2235/pg2235.txt"
      },
      {
        "category": "artistic",
        "title": "Modest Mussorgsky, Boris Godunov (opera, 1869–1872) — MUSIC",
        "excerpt": "Mussorgsky's masterpiece dramatizes the rise and tormented fall of a ruler who attains supreme power but is hollowed out by hidden guilt. In the great monologue 'I have attained the highest power,' the once-revered Tsar finds his glory turned to ash, haunted by conscience until ruin overtakes him. The opera distills the theme of a celebrated public figure whose golden authority curdles into disgrace and downfall when the truth of his wrongdoing closes in.",
        "source": "Modest Mussorgsky, Boris Godunov, vocal and full scores (incl. Rimsky-Korsakov 1908 revision); hosted at IMSLP / Petrucci Music Library (imslp.org).",
        "href": "https://imslp.org/wiki/Boris_Godunov_(Mussorgsky,_Modest)"
      },
      {
        "category": "artistic",
        "title": "Giotto di Bondone, Injustice (Iniustitia), Scrovegni Chapel, Padua, c. 1306 — VISUAL ARTWORK",
        "excerpt": "Giotto personifies Injustice as a tyrant enthroned amid crumbling, fortress-like masonry, his hands curled like talons while violence and plunder unfold in the broken landscape below. Set opposite the serene figure of Justice, the fresco is a stark allegory of bad governance: the abuse of power and public trust collapses the very throne it sits upon. It speaks directly to the spectacle of a once-exalted official brought low by corruption.",
        "source": "Giotto di Bondone, 'Injustice,' fresco, Cappella degli Scrovegni (Arena Chapel), Padua, c. 1306; Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Giotto_-_Scrovegni_-_-50-_-_Injustice.jpg",
        "image": {
          "src": "/covers/gojek-makarim-graft--art.png",
          "alt": "Giotto's fresco 'Injustice' (c. 1306): a tyrannical figure enthroned amid crumbling, turreted walls, with scenes of violence and robbery in the wilderness below, personifying corrupt and lawless rule.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 19
  },
  {
    "slug": "automakers-copper-aluminium",
    "headline": "Ferrari and BMW join Tesla in switching car wiring from copper to cheaper aluminium",
    "overview": "Carmakers including Ferrari and BMW are following Tesla and Chinese manufacturers in replacing copper with lighter, cheaper aluminium in parts of their vehicles' wiring. The shift, driven by copper's soaring price and supply constraints, could ripple through global metals markets as the auto industry electrifies.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMixAFBVV95cUxNZ2lPRHR2cWFNZDNkUldYQlBkWnNnU0dZU1VMQmZGMHZIWW1YamNpLU9SNktDc1htRnJIVF9QcFVlY1pzNkdOYjZlckduODlyZFdrVXRpSWNHNnEzWW5PblV3ZWFZV3NOUkFoRlZkRnZUS2FabGNvM2xqRXBjZFhOblI4LVRlaEItTmlkclpFbmdBXy10M21ZT25ITXZ5NW1xTkI3ZVcyV1p6enBxQy1jcmEwZFlIYVdGdThGV2pzWV9jaU1L?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMirgFBVV95cUxNU01ySzZTWkhvMkNfeV95V3FRWTlhVDZVZGxkWmFXelBVbGdmVUNMWWNodnZQRFFaSUlsWk1CQWFrVTEyRk9qOU5lQTFQSlMybjNaMV9SNk9wbXVaXzRRdDlxeV9wUjJxZ1ZUVjNTX3lOd3BWSnVXMkNmajZtMUdpM09yRGFwT3pyakU2VUZMdUtSVndsN2pOZktPR0FVbUZzSnAzeUhGV25hQjNkTVE?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-30",
    "image": {
      "src": "/covers/automakers-copper-aluminium.png",
      "alt": "Coiled copper-clad aluminium wire of the kind increasingly used in vehicle wiring.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 30 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Setting the Aluminium Apex of the Washington Monument — Harper's Weekly, December 20, 1884",
        "excerpt": "When the Washington Monument was capped on December 6, 1884, its crowning point was cast not from gold or silver but from aluminium — then so difficult to refine that the 100-ounce tip was the largest single piece of the metal ever produced, and aluminium itself was reckoned a precious substance dearer than silver. This Harper's Weekly illustration records the moment workmen set that gleaming apex atop the tallest structure on earth: a humble-seeming light metal chosen for the most prestigious place imaginable. Within two years the Hall-Heroult process collapsed aluminium's price, and the once-precious crown became, in material terms, ordinary — the very inversion now playing out as carmakers reach for cheap aluminium where copper has grown dear.",
        "source": "Harper's Weekly, December 20, 1884, pp. 839, 844-845; engraving of P. H. McLaughlin setting the aluminium-tipped capstone on the Washington Monument. Hosted on Wikimedia Commons (source: Library of Congress Prints and Photographs Division).",
        "href": "https://commons.wikimedia.org/wiki/File:Washington_Monument_-_Setting_the_capstone_-_Harper%27s_Weekly.png"
      },
      {
        "category": "historical",
        "title": "\"Topping Off the Tip\": The Washington Monument's Aluminium Point — U.S. National Archives, Prologue (2014)",
        "excerpt": "This National Archives account describes how, in 1884, the metal we now throw away in cans was rare enough to crown a national monument. As the article puts it, \"Things made of aluminum are commonplace now, but when the monument was completed in 1884, the substance was considered a precious metal\" — it then cost about $1.10 an ounce, twice the price of silver. The chemist William Frishmuth spent decades and tens of thousands of dollars learning to cast it, charging $225 for the small pyramid. The episode is a perfect mirror of the present story in reverse: a metal's worth is never fixed by its nature but by the difficulty of getting it, and when that difficulty shifts, so does which metal industry prizes and which it discards.",
        "source": "Eric Niderost, \"Topping Off the Tip,\" Prologue Magazine, Vol. 46, No. 2 (Summer 2014), U.S. National Archives and Records Administration (archives.gov).",
        "href": "https://www.archives.gov/publications/prologue/2014/summer/aluminum-tip-monument"
      },
      {
        "category": "literary",
        "title": "Hesiod, Works and Days — The Ages of Man (c. 700 BC; Evelyn-White translation)",
        "excerpt": "Of the third, bronze race Hesiod writes: \"Their armour was of bronze, and their houses of bronze, and of bronze were their implements: there was no black iron.\" Of the present, fallen age he laments: \"For now truly is a race of iron, and men never rest from labour and sorrow by day, and from perishing by night,\" wishing \"that I were not among the men of the fifth generation, but either had died before or been born afterwards.\" Hesiod's scheme — each age named for its defining metal — is the oldest Western frame for what we are witnessing: an industry sliding, by necessity, out of one metal's era and into another's.",
        "source": "Hesiod, Works and Days, trans. Hugh G. Evelyn-White (1914), \"The Five Ages.\" Project Gutenberg eBook #348 (gutenberg.org).",
        "href": "https://www.gutenberg.org/files/348/348-h/348-h.htm"
      },
      {
        "category": "literary",
        "title": "Ovid, Metamorphoses, Book I — The Iron Age (8 AD; Riley translation, 1851)",
        "excerpt": "Ovid traces humanity's decline from gold to iron, and locates the fall precisely in the digging of metals from the ground: \"And not only was the rich soil required to furnish corn and due sustenance, but men even descended into the entrails of the Earth; and riches were dug up, the incentives to vice, which the Earth had hidden, and had removed to the Stygian shades.\" In Ovid the worth of metals drives men into the earth and into strife; the modern carmaker, by contrast, descends after the cheaper metal to escape the precious one's price — but the deep link he draws between buried ore and the fortunes of an age is exactly the one rumbling through today's copper and aluminium markets.",
        "source": "Ovid, Metamorphoses, Book I (\"The Iron Age\"), trans. Henry T. Riley (1851). Project Gutenberg eBook #21765 (gutenberg.org).",
        "href": "https://www.gutenberg.org/cache/epub/21765/pg21765.txt"
      },
      {
        "category": "artistic",
        "title": "Richard Wagner, Siegfried, WWV 86C — Act I \"Forging Song\" (Schmiedelieder), 1871 — MUSIC",
        "excerpt": "In the first act of Siegfried, the young hero reforges the shattered sword Nothung from its fragments, and Wagner sets the labour to music: hammer-blows fall on rhythmic anvil strokes while Siegfried sings \"Nothung! Nothung! Neidliches Schwert!\" and bellows roar in the orchestra. The whole Ring turns on metal — the Rhinegold wrenched into a ring of power, the sword melted down and made new — so that forging becomes the cycle's central act of transformation. Wagner dramatizes exactly what an assembly line now performs in prose: the breaking down of one metal stock and its remaking into the indispensable tool of a new age.",
        "source": "Richard Wagner, Siegfried (Der Ring des Nibelungen, third evening), WWV 86C, completed 1871. Full scores and vocal scores at the International Music Score Library Project (imslp.org).",
        "href": "https://imslp.org/wiki/Siegfried,_WWV_86C_(Wagner,_Richard)"
      },
      {
        "category": "artistic",
        "title": "Diego Velazquez, The Forge of Vulcan (La Fragua de Vulcano), 1630 — VISUAL ARTWORK",
        "excerpt": "Velazquez paints the god of metalworking interrupted mid-labour: Apollo, haloed and radiant, brings unwelcome news to Vulcan and his half-naked smiths, who freeze with hammers raised over a white-hot bar at the anvil. The forge — glowing iron, blackened tools, the sweat and muscle of men who turn raw metal into finished things — is rendered with unidealized realism, dignifying ordinary metallurgical work as the engine of the made world. It is the human face of the abstract market story: behind every decision to swap copper for aluminium stand the workshops, the heat, and the craft of shaping base metal into value.",
        "source": "Diego Velazquez, The Forge of Vulcan, 1630, oil on canvas, 223 x 290 cm, Museo Nacional del Prado, Madrid. Image hosted on Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Vel%C3%A1zquez_-_La_Fragua_de_Vulcano_(Museo_del_Prado,_1630).jpg",
        "image": {
          "src": "/covers/automakers-copper-aluminium--art.png",
          "alt": "Velazquez's 1630 painting The Forge of Vulcan: the radiant god Apollo speaks to a startled Vulcan and four muscular blacksmiths who pause at the anvil, a bar of metal glowing white-hot, amid the dark tools and fire of an antique forge.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 20
  },
  {
    "slug": "morocco-eliminate-netherlands-world-cup",
    "headline": "Morocco knock the Netherlands out of the World Cup on penalties in Monterrey",
    "overview": "Morocco beat the Netherlands in a penalty shootout in Monterrey to advance at the 2026 World Cup, ending the Dutch campaign after a tense match. The result extended a strong run for African and underdog sides at the tournament and set off celebrations among Moroccan fans.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiuwFBVV95cUxOOEFRR3U1THl0VW5kSkc3QWhKbW50TW9Cc2xmd2prSVJkdUFnbUZ2TmF2R1NIaGRJczBCb2xTM3M4U2xwRlJvQlJENm13cVM3bjhENEFoaUc1bUtQRXhnczJJenBtRVZ5emoxMXV0Q1lnYzhHRlZXdmU4bDVHcTUxSWxkTjBlbHdOQ1I3MVVRdC11YTVGNmRTQnRWalNrckVFRXBUVlpqU0NJbXoyNVR5VDcwRXFRM1p6SWhJ?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMitwFBVV95cUxOMXFhSEQtTTc5dG16dnN6WnhMcjdyaXRMaDNoXy12b0ktNWlpY29QTmdYYlNOWXJhdGwyeFkyR2J3a2dQa2ZrWU9ZbmhnQVJOd2hYRXNTN0VwSnM0VEJNSXRYUFRJVS1MZ2N4cnpQekRNOVlobUhBNnA3T0JnTXU3ZUxUOHRLNEpLS3ZmX1FXLTVMd3lMWGxtMHN2U2k4UlItamw3LV96UWpiUVJtZjRaWlFHMFpvUUE?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-30",
    "image": {
      "src": "/covers/morocco-eliminate-netherlands-world-cup.png",
      "alt": "A floodlit football stadium at night after a dramatic penalty shootout.",
      "credit": "AI-generated"
    },
    "edition": "Afternoon Edition · 30 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Livy, History of Rome, Book 1.24-25: The Combat of the Horatii and the Curiatii (c. 27-9 BC)",
        "excerpt": "So, that he might encounter each singly, he took to flight, assuming that they would follow as well as their wounds would allow. He had run some distance from the spot where the combat began, when, on looking back, he saw them following at long intervals from each other, the foremost not far from him. He turned and made a desperate attack upon him... had already slain his foe and, flushed with victory, was awaiting the second encounter.",
        "source": "Titus Livius (Livy), The History of Rome, Book 1, chapter 25, trans. Rev. Canon Roberts (1912); hosted by the Perseus Digital Library, Tufts University.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0026:book%3D1:chapter%3D25"
      },
      {
        "category": "historical",
        "title": "David and Goliath, 1 Samuel 17 (King James Bible, 1611)",
        "excerpt": "Then said David to the Philistine, Thou comest to me with a sword, and with a spear, and with a shield: but I come to thee in the name of the LORD of hosts, the God of the armies of Israel, whom thou hast defied... And David put his hand in his bag, and took thence a stone, and slang it, and smote the Philistine in his forehead, that the stone sunk into his forehead; and he fell upon his face to the earth. So David prevailed over the Philistine with a sling and with a stone, and smote the Philistine, and slew him; but there was no sword in the hand of David.",
        "source": "The Holy Bible, King James Version (1611), 1 Samuel 17:45-50; hosted by Wikisource.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/1_Samuel"
      },
      {
        "category": "literary",
        "title": "Homer, Iliad, Book 23: The Boxing Match of Epeius and Euryalus at the Funeral Games of Patroclus (c. 8th century BC)",
        "excerpt": "Let him draw nigh, whoso is to bear as his prize the two-handled cup... But upon him goodly Epeius rushed as he peered for an opening, and smote him on the cheek, nor after that, methinks, did he long stand upright, for even there did his glorious limbs sink beneath him.",
        "source": "Homer, The Iliad, Book 23, trans. A.T. Murray (1924); hosted by the Perseus Digital Library, Tufts University.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0134:book=23:card=664"
      },
      {
        "category": "literary",
        "title": "Virgil, Aeneid, Book 5: The Boxing Match of Entellus and Dares at the Funeral Games of Anchises (c. 19 BC)",
        "excerpt": "He lays on load with either hand, amain, / And headlong drives the Trojan o'er the plain; / Nor stops, nor stays; nor rest nor breath allows; / But storms of strokes descend about his brows, / A rattling tempest, and a hail of blows.",
        "source": "Virgil, The Aeneid, Book 5, trans. John Dryden; hosted by the Perseus Digital Library, Tufts University.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0052:book=5:card=424"
      },
      {
        "category": "artistic",
        "title": "George Frideric Handel, \"See, the Conqu'ring Hero Comes\" from Judas Maccabaeus, HWV 63 (1746-47) — MUSIC",
        "excerpt": "Handel's triumphal chorus, sung as the victorious hero returns to his people, became the supreme musical emblem of acclaimed victory in the English-speaking world. Its rising trumpet-and-drum exultation captures exactly the roar that greeted Morocco's winning penalty in Monterrey: the multitude rising as one to hail an unexpected conqueror, the agony of the contest dissolving into pealing, processional joy.",
        "source": "George Frideric Handel, Judas Maccabaeus, HWV 63, Act III, No. 35; scores hosted by the International Music Score Library Project (IMSLP / Petrucci Music Library).",
        "href": "https://imslp.org/wiki/Judas_Maccabaeus,_HWV_63_(Handel,_George_Frideric)"
      },
      {
        "category": "artistic",
        "title": "Caravaggio, David with the Head of Goliath (c. 1606-07) — VISUAL ARTWORK",
        "excerpt": "Caravaggio shows the young, slight victor holding aloft the severed head of the fallen giant, his expression caught between triumph and a strange melancholy. The painting distills the David-versus-Goliath archetype that frames Morocco's upset: the smaller, doubted challenger who topples the towering favourite, and the unsettling weight that comes with having felled a colossus before a watching world.",
        "source": "Michelangelo Merisi da Caravaggio, David with the Head of Goliath, oil on poplar, c. 1606-07, Kunsthistorisches Museum, Vienna; image hosted by Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:David_with_the_Head_of_Goliath-Caravaggio_(c.1606-7).jpg",
        "image": {
          "src": "/covers/morocco-eliminate-netherlands-world-cup--art.png",
          "alt": "Caravaggio's chiaroscuro painting of the youthful David holding a sword and grasping by the hair the severed, shadowed head of the giant Goliath against a dark background.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 21
  },
  {
    "slug": "adani-ports-msc-stake",
    "headline": "Adani Ports to sell a 49% stake in an Indian port to shipping giant MSC for $1.4 billion",
    "overview": "India's Adani Ports agreed to sell a 49% stake in one of its Indian ports to the Swiss-based shipping group MSC, the world's largest container line, for about $1.4 billion. The deal deepens ties between India's biggest private port operator and a global carrier and reshapes part of the country's port landscape.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMipgFBVV95cUxORDZyZlF2Y2h6RGZiVE5VSzBFb3VZQnB2bXVIdDJkM1Q4SkNHMVJfb2lCTmhBYlNHeUVvZkxvWFB1Qmo0VlhPaFM5dUJTcDJfbE5IXzFZTUxqU0dQdnVxUUhlaEhXbUh0SGpINXItR2lCZTduUUowVHZMYk1vSUpJRDFtU0xYbTJPYUJiVTdiczhhOXp0cV9va1dHYkd2YzIxTGdTUkhR?oc=5"
      },
      {
        "name": "WSJ",
        "href": "https://news.google.com/rss/articles/CBMivwFBVV95cUxQcnpVR3pEYzBQb3d5VkhIUm1sdzBGNGQ0ZXdXRFhzWnBib2dKcWdWUEdBN1R4c1dHYzJVckxNNTdRdVFqRDZNcURxVDBkLVU2cldrc3I3SnB2VTZrR0J3S0hwRmlTZm80N3Z4a1ZQUDROTVRXM3FEWjd4M1ZESnVQMUVmb3NEUHg1SWZPM0lSRXlfYk1ZOGNmN0dKRTN5RVlRRDFielVYTk1DM2JyTXU4Zk8tRHh4cExKbFhnc3ZWTQ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-30",
    "image": {
      "src": "/covers/adani-ports-msc-stake.png",
      "alt": "Container cranes and quays at Mundra Port in Gujarat, India.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 30 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Periplus of the Erythraean Sea on the Indian port of Barygaza (Schoff translation, 1st century AD) — Greco-Roman merchant's guide to Indian Ocean trade",
        "excerpt": "There are imported into this market-town, wine, Italian preferred, also Laodicean and Arabian; copper, tin, and lead; coral and topaz; thin clothing and inferior sorts of all kinds; bright-colored girdles a cubit wide; storax, sweet clover, flint glass, realgar, antimony, gold and silver coin, on which there is a profit when exchanged for the money of the country... There are exported from these places spikenard, costus, bdellium, ivory, agate and carnelian, lycium, cotton cloth of all kinds, silk cloth, mallow cloth, yarn, long pepper and such other things as are brought here from the various market-towns. Those bound for this market-town from Egypt make the voyage favorably about the month of July, that is Epiphi.",
        "source": "Anonymous, The Periplus of the Erythraean Sea, trans. Wilfred H. Schoff (1912), Section 49, hosted at Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Periplus_of_the_Erythraean_Sea"
      },
      {
        "category": "historical",
        "title": "Charter of the Dutch East India Company (VOC), 20 March 1602 — the world's first chartered megacorporation of sea trade",
        "excerpt": "As the prosperity of the united Netherlands consists principally of the navigation, trade and commerce, which have been carried on from these countries from time immemorial, and which from time to time have been praiseworthily increased, not only with the neighbouring kingdoms and provinces, but also with those further away from these countries in Europe, Asia, and Africa...",
        "source": "States General of the United Netherlands, Charter of the Dutch East India Company (1602), English translation hosted at Wikisource",
        "href": "https://en.wikisource.org/wiki/Translation:VOC_charter"
      },
      {
        "category": "literary",
        "title": "The Lament over Tyre, Ezekiel 27 (King James Bible, 1611) — the prophet's dirge for the great merchant city at the entry of the sea",
        "excerpt": "And say unto Tyrus, O thou that art situate at the entry of the sea, which art a merchant of the people for many isles, Thus saith the Lord GOD; O Tyrus, thou hast said, I am of perfect beauty. Thy borders are in the midst of the seas, thy builders have perfected thy beauty... The ships of Tarshish did sing of thee in thy market: and thou wast replenished, and made very glorious in the midst of the seas. Thy rowers have brought thee into great waters: the east wind hath broken thee in the midst of the seas.",
        "source": "The Book of the Prophet Ezekiel 27:3-4, 25-26, King James Version, Project Gutenberg eBook #10",
        "href": "https://www.gutenberg.org/cache/epub/10/pg10.txt"
      },
      {
        "category": "literary",
        "title": "Shakespeare, The Merchant of Venice, Act 1 Scene 1 (1600) — Antonio's argosies riding the flood like princes of the sea",
        "excerpt": "Your minde is tossing on the Ocean, There where your Argosies with portly saile Like Signiors and rich Burgers on the flood, Or as it were the Pageants of the sea, Do ouer-peere the pettie Traffiquers That curtsie to them, do them reuerence As they flye by them with their wouen wings",
        "source": "William Shakespeare, The Merchant of Venice, Act 1, Scene 1 (First Folio spelling), Project Gutenberg eBook #2243",
        "href": "https://www.gutenberg.org/cache/epub/2243/pg2243.txt"
      },
      {
        "category": "artistic",
        "title": "Felix Mendelssohn, The Hebrides (Fingal's Cave) Overture, Op. 26 (1830-32) — MUSIC",
        "excerpt": "Mendelssohn's concert overture, sparked by a visit to the basalt sea-cave of Staffa in the Hebrides, conjures the swell and surge of cold northern waters in its rolling opening figure. Its undulating strings and brooding brass evoke ships meeting the open sea and the immense, indifferent power of the ocean over which trade and fortunes move. The piece resonates with a story of carriers and harbours, where maritime might and the meeting of waters decide the wealth of nations.",
        "source": "Felix Mendelssohn, The Hebrides (Fingal's Cave), Op. 26, MWV P 7 (full scores), hosted at IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/The_Hebrides,_Op.26_(Mendelssohn,_Felix)"
      },
      {
        "category": "artistic",
        "title": "Claude Lorrain, Seaport with the Embarkation of the Queen of Sheba, 1648 (National Gallery, London) — VISUAL ARTWORK",
        "excerpt": "Claude Lorrain's luminous harbour glows at the hour of departure: stately classical palaces frame a busy quay where merchant vessels ride at anchor and figures load a launch beneath a rising sun. The Queen of Sheba sets sail to meet King Solomon, making the painting an image of two rich trading powers brought together across the water. Its grand port, gateway between nations and a meeting place of wealth, mirrors a deal that binds a global shipping line to an Indian harbour.",
        "source": "Claude Lorrain (Claude Gellee), Seaport with the Embarkation of the Queen of Sheba, oil on canvas, 1648, National Gallery London (NG14); image via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Claude_Lorrain_008.jpg",
        "image": {
          "src": "/covers/adani-ports-msc-stake--art.png",
          "alt": "Claude Lorrain's 1648 painting Seaport with the Embarkation of the Queen of Sheba: a sunlit classical harbour with grand palace facades on the right, tall-masted merchant ships at anchor, and richly dressed figures descending stone steps to board a small boat as the sun rises over the calm sea.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 22
  },
  {
    "slug": "australia-sues-amazon-prime-ads",
    "headline": "Australia's consumer regulator sues Amazon over ads added to Prime Video",
    "overview": "Australia's competition watchdog, the ACCC, sued an Amazon unit, alleging it misled about 850,000 Prime subscribers by introducing advertisements into Prime Video and then charging an extra fee to remove them. Amazon began showing ads on the service after customers had signed up expecting ad-free streaming.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiuwFBVV95cUxNbEV0VVVMbHRrdXQzOVJiME1OS1BTVmVkd1R2OXJNNUNSc1hwdzJDODFsTU5sQXZPVlNhT3BDMlY1bHI2RkM3aDNRdXZFWWc4VVY0dFUxYnd3M0hvS0dFU2JSeTE5RXdtM3VsZlJVREd6bGg4LU1lWkE3STdBdERxWDYzM2psRV9hdHp1NGhnMVR3Y28tSDVIZ2dBSUNUWDQ2NmhhREZoR1lfVmlZYWxlT1VWbWFPa1JCS0tF?oc=5"
      },
      {
        "name": "Bloomberg",
        "href": "https://news.google.com/rss/articles/CBMitgFBVV95cUxOd3djdXdaa0k4ajBvX29PRmR6SUx6eXM5TEh2R3V1S09pbFhza09PSWF3akRXbkgycHM1bXhnamtLZHhpdXl4bzlqbTVuNm16M285ZFMyU2JfX3kwUkJPdVpydjJHazhwdnJmWTNCMnpBUjJMNXNjUWhvSlZGT3V1UXFFaENEWGpfampqWHFvNEpFNHktTFJOQlJXRmJmMER5VVlPOTRGMDYtaWQxM014d0FNbEJrQQ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-30",
    "image": {
      "src": "/covers/australia-sues-amazon-prime-ads.png",
      "alt": "A television screen interrupted by advertising in a darkened living room.",
      "credit": "AI-generated"
    },
    "edition": "Afternoon Edition · 30 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Standard Oil Co. of New Jersey v. United States, 221 U.S. 1 (1911)",
        "excerpt": "The unanimous opinion of Chief Justice White held that John D. Rockefeller's petroleum combine had unlawfully monopolized the trade and ordered it broken up, reading the Sherman Act's ban on 'every contract... in restraint of trade' through the lens of a 'rule of reason.' It is the archetype of the public watchdog calling a private giant to account: a regulator dragging the dominant seller into court to answer for the way it had bent the market to its own advantage. The ACCC's suit against Amazon stands in this lineage of antitrust and consumer-protection enforcement, where the state insists that scale does not exempt a company from honest dealing.",
        "source": "Standard Oil Co. of New Jersey v. United States, 221 U.S. 1 (1911), official U.S. Reports vol. 221, hosted by the Library of Congress (tile.loc.gov).",
        "href": "https://tile.loc.gov/storage-services/service/ll/usrep/usrep221/usrep221001/usrep221001.pdf"
      },
      {
        "category": "historical",
        "title": "Magna Carta, clause 35 (1215)",
        "excerpt": "Let there be one measure of wine throughout our whole realm; and one measure of ale; and one measure of corn, to wit, 'the London quarter'; and one width of cloth (whether dyed, or russet, or 'halberget'), to wit, two ells within the selvedges; of weights also let it be as of measures.",
        "source": "Magna Carta (1215), clause 35, English translation, The Avalon Project, Lillian Goldman Law Library, Yale Law School (avalon.law.yale.edu).",
        "href": "https://avalon.law.yale.edu/medieval/magna.asp"
      },
      {
        "category": "literary",
        "title": "William Shakespeare, The Merchant of Venice, Act IV, Scene 1 (Portia and the bond), c. 1596-98",
        "excerpt": "Tarry a little; there is something else. / This bond doth give thee here no jot of blood; / The words expressly are 'a pound of flesh:' / Take then thy bond, take thou thy pound of flesh; / But, in the cutting it, if thou dost shed / One drop of Christian blood, thy lands and goods / Are, by the laws of Venice, confiscate / Unto the state of Venice.",
        "source": "William Shakespeare, The Merchant of Venice, Act IV, Scene 1, Perseus Digital Library, Tufts University (perseus.tufts.edu).",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.03.0050:act=4:scene=1"
      },
      {
        "category": "literary",
        "title": "Aesop, 'The Wolf and the Crane' (V. S. Vernon-Jones translation, 1912)",
        "excerpt": "A WOLF once got a bone stuck in his throat. So he went to a Crane and begged her to put her long bill down his throat and pull it out. 'I'll make it worth your while,' he added. The Crane did as she was asked, and got the bone out quite easily. The Wolf thanked her warmly, and was just turning away, when she cried, 'What about that fee of mine?' 'Well, what about it?' snapped the Wolf, baring his teeth as he spoke; 'you can go about boasting that you once put your head into a Wolf's mouth and didn't get it bitten off. What more do you want?'",
        "source": "Aesop, 'The Wolf and the Crane,' in Aesop's Fables, trans. V. S. Vernon-Jones (1912), Wikisource (en.wikisource.org).",
        "href": "https://en.wikisource.org/wiki/%C3%86sop's_Fables_(V._S._Vernon-Jones)/The_Wolf_and_the_Crane"
      },
      {
        "category": "artistic",
        "title": "Charles Gounod, 'Le veau d'or' (Song of the Golden Calf) from Faust, 1859 — MUSIC",
        "excerpt": "In this Act II aria Mephistopheles steps before the crowd and proclaims that the golden calf still stands and that all of humankind dances around its pedestal, worshiping money while Satan conducts the round. The devil's sardonic hymn to gold as the true idol of the world resonates with a streaming giant that quietly turned a paid promise into a new revenue stream, charging tribute to switch the advertisements back off. The full public-domain score, including 'Le veau d'or' in Act II, is available on IMSLP.",
        "source": "Charles Gounod, Faust (1859), libretto by Jules Barbier and Michel Carre; full vocal and orchestral scores, IMSLP / Petrucci Music Library (imslp.org).",
        "href": "https://imslp.org/wiki/Faust_(Gounod,_Charles)"
      },
      {
        "category": "artistic",
        "title": "Marinus van Reymerswaele, The Tax Collectors, c. 1540s — VISUAL ARTWORK",
        "excerpt": "Two grasping officials in gaudy, outmoded costume hunch over a ledger and a heap of coins, their pinched, avaricious faces caricaturing the bureaucracy of money and exaction. The painting satirizes those who turn the counting of other people's money into private gain, recording and re-tallying every charge owed. It is a fitting emblem for a dispute over fees levied after the bargain was struck, where a powerful collector adds a new toll to an account the customer thought was already settled.",
        "source": "Marinus van Reymerswaele, The Tax Collectors (oil on panel, c. 1540s), Louvre Museum, Paris; image via Wikimedia Commons (commons.wikimedia.org).",
        "href": "https://commons.wikimedia.org/wiki/File:Marinus_van_Reymerswale_-_The_Tax_Collectors_-_WGA19332.jpg",
        "image": {
          "src": "/covers/australia-sues-amazon-prime-ads--art.png",
          "alt": "Renaissance oil painting of two tax collectors in ornate red and green costume seated at a table, one writing in a ledger beside stacks of gold coins, with sour, exaggerated faces.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 23
  },
  {
    "slug": "uk-cma-app-store-payments",
    "headline": "UK regulator proposes forcing Apple and Google to open their app stores to rival payment systems",
    "overview": "Britain's Competition and Markets Authority proposed requiring Apple and Google to let app developers steer users to alternative, cheaper payment options outside the companies' own app-store billing. The move, part of new powers over firms with 'strategic market status,' could cut the commissions the two charge developers.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiqwFBVV95cUxNVGZHZ0IzdUU5OXVwTFFxcjhpbHhucnNJMHpjb2tNZmhXWnBoWF9BRGdiNFR1OEg0bXJuYW1FR2JSeTBRZ05JN1UyQVdfcm1vUjJoaXpwV3J5VVpKOThDaXgyRVhTYkJWdzRIRmJlX3lKOEh6b01hbm91T3d6WlZfOFc5VXBLQ0ZzQmd3RDZPaUlIMi1UZWxWUGlRLVZtZ0xGWUJhYlBnUDJTNVU?oc=5"
      },
      {
        "name": "The Independent",
        "href": "https://news.google.com/rss/articles/CBMihwFBVV95cUxNYkJPU3plSWRPZ3Z1TjBXUXJjYlFJOFVJdThYYUhNbDNjWkFLMlVRUFQxU2RjbGg1S0lHNVFYX2dlLXhPYVU0ZXFJb2dLYVN2MVh2dGxIUnBNZ0Z0Sjc1MXJKMUdyZ2ZDTXV6TGF2LTl4Y3RHRnlvRWhNTTMwRFhDOXZNSWNrb1U?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-30",
    "image": {
      "src": "/covers/uk-cma-app-store-payments.png",
      "alt": "A smartphone displaying a grid of app icons, held in the hand.",
      "credit": "AI-generated"
    },
    "edition": "Afternoon Edition · 30 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Statute of Monopolies (1624, 21 Jac. 1, c. 3)",
        "excerpt": "All monopolies and all commissions, grants, licenses, charters, and letters patents heretofore made or granted... are altogether contrary to the laws of this realm, and so are and shall be utterly void and of none effect. Born of Parliament's revolt against the Crown's habit of selling exclusive rights to court favourites, this is the ancestor of every modern law against the private gatekeeper who taxes all who would trade; the CMA's move against Apple and Google's billing monopolies echoes its founding principle that an exclusive right to charge toll on commerce is no natural property but a privilege the law may declare void.",
        "source": "Statute of Monopolies (An Act concerning Monopolies and Dispensations with Penal Laws), English Parliament, 1623/24, hosted at Wikisource.",
        "href": "https://en.wikisource.org/wiki/Statute_of_Monopolies"
      },
      {
        "category": "historical",
        "title": "Standard Oil Co. of New Jersey v. United States, 221 U.S. 1 (1911)",
        "excerpt": "The decision dissolved Rockefeller's petroleum colossus into competing firms, the canonical instance of public law breaking an overmighty private power that had taxed an entire industry. Reading the Sherman Act's ban on combinations 'in restraint of trade' through a 'rule of reason,' the Court insisted that no firm is too large to answer to the public for how it bends a market. As regulators once pried open the pipelines and refineries, Britain's CMA now proposes to pry open the digital storefront, forcing the gatekeeper to permit rival routes to the customer's purse.",
        "source": "United States Supreme Court, Standard Oil Co. of New Jersey v. United States, 221 U.S. 1 (1911), hosted at Wikisource.",
        "href": "https://en.wikisource.org/wiki/Standard_Oil_Co._of_New_Jersey_v._United_States"
      },
      {
        "category": "literary",
        "title": "Wilhelm Tell by Friedrich Schiller (1804), trans. Theodore Martin",
        "excerpt": "Soon she will come to count our sheep, our cattle, / To portion out the Alps, e'en to their summits, / And in our own free woods to hinder us / From striking down the eagle or the stag; / To set her tolls on every bridge and gate, / Impoverish us to swell her lust of sway, / And drain our dearest blood to feed her wars.",
        "source": "Friedrich Schiller, Wilhelm Tell (1804), English translation by Theodore Martin, Project Gutenberg (eBook #6788).",
        "href": "https://www.gutenberg.org/files/6788/6788-h/6788-h.htm"
      },
      {
        "category": "literary",
        "title": "\"The Three Billy-Goats Gruff,\" from Popular Tales from the Norse, trans. George Webbe Dasent (1859)",
        "excerpt": "\"WHO'S THAT tramping over my bridge?\" roared the Troll. \"IT'S I! THE BIG BILLY-GOAT GRUFF,\" said the billy-goat, and he had such a big voice of his own. \"Well, come along! I've got two spears, and I'll poke your eyeballs out at your ears; I've got besides two curling-stones, and I'll crush you to bits, body and bones.\" That was what the big billy-goat said; and so he flew at the Troll, and poked his eyes out with his horns, and crushed him to bits, body and bones, and tossed him out into the burn.",
        "source": "Asbjornsen & Moe, \"The Three Billy-Goats Gruff,\" in Popular Tales from the Norse, trans. George Webbe Dasent (Edinburgh, 1859), hosted at Wikisource.",
        "href": "https://en.wikisource.org/wiki/Popular_Tales_from_the_Norse/The_Three_Billy-Goats_Gruff"
      },
      {
        "category": "artistic",
        "title": "\"O welche Lust\" (Prisoners' Chorus), Act I Finale of Fidelio, Op. 72, by Ludwig van Beethoven (1814) — MUSIC",
        "excerpt": "Beethoven's prisoners, briefly released into the courtyard, raise a hushed, swelling hymn to liberty — 'O welche Lust, in freier Luft den Atem leicht zu heben!' ('Oh, what joy, in the open air freely to breathe again!'). The chorus is music's supreme image of a confined multitude tasting the open air denied them, of bars and walls giving way. Its resonance with a market opened to the light — developers and users no longer penned within a single billing gate — needs no translation; it is the sound of a closed enclosure breaking open.",
        "source": "Ludwig van Beethoven, Fidelio, Op. 72, Act I Finale, No. 10, \"O welche Lust, in freier Luft\" (Prisoners' Chorus); full scores hosted at IMSLP (International Music Score Library Project).",
        "href": "https://imslp.org/wiki/Fidelio,_Op.72_(Beethoven,_Ludwig_van)"
      },
      {
        "category": "artistic",
        "title": "Christ Driving the Money Changers from the Temple by El Greco (c. 1570), Minneapolis Institute of Art — VISUAL ARTWORK",
        "excerpt": "And Jesus went into the temple, and began to cast out them that sold and bought in the temple, and overthrew the tables of the moneychangers, and the seats of them that sold doves... and he taught, saying unto them, Is it not written, My house shall be called of all nations the house of prayer? but ye have made it a den of thieves. (Mark 11:15-17, KJV.) El Greco freezes the instant of overturned tables and scattered coin — the gatekeepers' commerce upended by a higher authority, the perfect visual analogue for a regulator overturning the toll-takers' tables at the door of the digital marketplace.",
        "source": "El Greco (Domenikos Theotokopoulos), Christ Driving the Money Changers from the Temple, c. 1570, oil on panel, Minneapolis Institute of Art (acc. 24.1); image via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:El_Greco_Christ_Driving_the_Money_Changers_from_the_Temple.jpg",
        "image": {
          "src": "/covers/uk-cma-app-store-payments--art.png",
          "alt": "El Greco's painting Christ Driving the Money Changers from the Temple: Christ in rose and blue robes raises a cord of whips amid a crowd of merchants and moneychangers who recoil and scatter, their tables and goods overturned, within a classical temple architecture.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 24
  },
  {
    "slug": "sothebys-london-record-sale",
    "headline": "Sotheby's London sale of the Joe Lewis collection brings a record $392.6 million",
    "overview": "A pair of Sotheby's auctions in London, led by works from the collection of British businessman Joe Lewis, brought in about $392.6 million, a European record for the house, with a Modigliani nude setting an auction high. The strong result signaled resilience at the top end of the art market.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Artforum",
        "href": "https://www.artforum.com/news/sothebys-london-masterpiece-sale-earns-392-million-1234753425/"
      },
      {
        "name": "CBS News",
        "href": "https://news.google.com/rss/articles/CBMipAFBVV95cUxNZF9TcHo3T0puaDEtZGRyWWQwSGZVNHRCblloZkZYRkhDbjNMdXdHSXNQTkRoZk9QZFhYMEpzelNzQ1dKVlVBSi0tTmk3MFhqS2JxREpQaVoxYkRwdjA2em9RT3V3dEQ2VndtSi1adE56ZjE5dV9nN1o5RmhlM0Y4V2hDX3hJTDBIbjlpc3pickg4WXk0MW1YYUV4RDB6Y3RBS0RUYw?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-30",
    "image": {
      "src": "/covers/sothebys-london-record-sale.png",
      "alt": "Sotheby's auction house on New Bond Street in London.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 30 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Hamilton Palace Sale, Christie, Manson & Woods, London (1882)",
        "excerpt": "For seventeen days in the summer of 1882 the contents of Hamilton Palace passed under the hammer at Christie's, some 2,213 lots of pictures, French furniture, tapestries, plate and curiosities dispersed to relieve the debts of the 12th Duke of Hamilton. Gerald Reitlinger called it 'unquestionably the most magnificent sale of a single collection that has ever been held anywhere.' Like the Sotheby's dispersal of Joe Lewis's pictures, a single great private cabinet was unbound lot by lot and converted, at the fall of the hammer, into a record-breaking river of money, even as buyers from across the world competed to carry off its treasures.",
        "source": "\"The Hamilton Palace Collection: Illustrated Priced Catalogue,\" Christie, Manson & Woods, London, 1882; hosted at the Internet Archive.",
        "href": "https://archive.org/details/hamilton00chri"
      },
      {
        "category": "historical",
        "title": "Pliny the Elder, Natural History, Book XXXV — Mummius, King Attalus, and the price of a painting (1st c. AD)",
        "excerpt": "The high estimation in which the paintings of foreigners were held at Rome commenced with Lucius Mummius, who, from his victories, acquired the surname of \"Achaicus.\" For upon the sale of the spoil on that occasion, King Attalus having purchased, at the price of six thousand denarii, a painting of Father Liber by Aristides, Mummius, feeling surprised at the price, and suspecting that there might be some merit in it of which he himself was unaware, in spite of the complaints of Attalus, broke off the bargain, and had the picture placed in the Temple of Ceres; the first instance, I conceive, of a foreign painting being publicly exhibited at Rome.",
        "source": "Pliny the Elder, \"The Natural History,\" Book XXXV, ch. 8, trans. John Bostock & H. T. Riley (London: Bohn, 1857); The Natural History of Pliny, Volume VI, Project Gutenberg ebook #62704.",
        "href": "https://www.gutenberg.org/cache/epub/62704/pg62704-images.html"
      },
      {
        "category": "literary",
        "title": "Honore de Balzac, Cousin Pons (1847) — the secret collector and his hidden museum",
        "excerpt": "Since Pons returned from Italy, he had regularly spent about two thousand francs a year upon a collection of masterpieces of every sort and description, a collection hidden away from all eyes but his own; and now his catalogue had reached the incredible number of 1907.",
        "source": "Honore de Balzac, \"Cousin Pons,\" trans. Ellen Marriage; Project Gutenberg ebook #1856.",
        "href": "https://www.gutenberg.org/files/1856/1856-h/1856-h.htm"
      },
      {
        "category": "literary",
        "title": "Oscar Wilde, The Picture of Dorian Gray (1890) — beauty bought at the price of a soul",
        "excerpt": "How sad it is! I shall grow old, and horrible, and dreadful. But this picture will remain always young. It will never be older than this particular day of June.... If it were only the other way! If it were I who was to be always young, and the picture that was to grow old! For that—for that—I would give everything! Yes, there is nothing in the whole world I would not give! I would give my soul for that!",
        "source": "Oscar Wilde, \"The Picture of Dorian Gray,\" Ch. II; Project Gutenberg ebook #174.",
        "href": "https://www.gutenberg.org/files/174/174-h/174-h.htm"
      },
      {
        "category": "artistic",
        "title": "Richard Wagner, Das Rheingold, WWV 86A (composed 1854) — the curse of gold and the lust for treasure — MUSIC",
        "excerpt": "In the prologue to the Ring, Alberich renounces love to seize the Rhinegold and forge it into a ring of limitless power, and from that theft flows a tide of greed, bargaining and ruin. Wagner's shimmering gold motif and the gods' haggling over a ransom of treasure render in music the very alchemy on display at the saleroom: beauty weighed against money, and desire transmuted into vast, glittering, and corrupting sums.",
        "source": "Richard Wagner, \"Das Rheingold\" (prologue to Der Ring des Nibelungen), full orchestral score, B. Schott's Sohne, Mainz, 1873; hosted at IMSLP (Petrucci Music Library).",
        "href": "https://imslp.org/wiki/Das_Rheingold,_WWV_86A_(Wagner,_Richard)"
      },
      {
        "category": "artistic",
        "title": "David Teniers the Younger, Archduke Leopold Wilhelm in his Painting Gallery in Brussels (c. 1647-1651), Museo del Prado — VISUAL ARTWORK",
        "excerpt": "Teniers, court painter and keeper of the archduke's pictures, shows Leopold Wilhelm amid the dense-hung walls of his Brussels gallery, dozens of Italian and Flemish masterpieces stacked frame to frame while connoisseurs lean in to examine canvases propped against chairs. It is the Kunstkammer as a monument to the passion, the power, and the vanity of collecting, a single princely cabinet of accumulated beauty, of the very kind that auctions like Sotheby's gather, catalogue, and ultimately disperse.",
        "source": "David Teniers the Younger, \"Archduke Leopold Wilhelm in his Painting Gallery in Brussels,\" oil on canvas, c. 1647-1651, Museo Nacional del Prado, Madrid; image via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:El_archiduque_Leopoldo_Guillermo_en_su_galer%C3%ADa_de_pinturas_en_Bruselas_(David_Teniers_II).jpg",
        "image": {
          "src": "/covers/sothebys-london-record-sale--art.png",
          "alt": "A 17th-century painting of Archduke Leopold Wilhelm standing in his Brussels gallery, its walls densely hung with dozens of framed Old Master paintings while gentlemen examine canvases.",
          "credit": "Wikimedia Commons (Museo del Prado)"
        }
      }
    ],
    "rank": 25
  },
  {
    "slug": "sas-airbus-widebody-order",
    "headline": "SAS orders up to 40 Airbus widebody jets in a deal worth more than $10 billion",
    "overview": "Scandinavian airline SAS placed an order for up to 40 Airbus A330neo widebody aircraft in a deal valued at more than $10 billion at list prices, part of a long-haul fleet renewal as the carrier emerges from restructuring. The order is a boost for Airbus's widebody programme.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiowFBVV95cUxOZFJYR3UyTHN0Y0drcHVlZG1qTkJQcHUzZm9fcmRDVHZtZXI5SFFpS0ZvcWRvcUxZUHNBV0lpa0RDaUIzSXptTUliaFFUaTVlcElKV0ttdE5RODlZMHNHRXpNckpYeWs1b0JyZ3VJMVVoaktVWDZqUGstVjlFOXNTaEhhcHRSYjJkanNqWWFicndMOHp6dGUzajZuWlR1bllYWTh3?oc=5"
      },
      {
        "name": "Simple Flying",
        "href": "https://news.google.com/rss/articles/CBMiakFVX3lxTE1XVDhQNDNfdURoc1FBcWREVjhqbzlab0F1TmhwdjlodmY5R3JtVmdSeFBDQUpUQnVQbEI4Y2JuakRtbEo2RkV5aHhYLVJhRUE4Mk05SUptaWtET01lTnE5cVh0VXRWb3VXV2c?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-30",
    "image": {
      "src": "/covers/sas-airbus-widebody-order.png",
      "alt": "A Scandinavian Airlines Airbus A350 widebody jet.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 30 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Orville and Wilbur Wright, \"The Early History of the Airplane\" (1908)",
        "excerpt": "The first flight lasted only 12 seconds, a flight very modest compared with that of birds, but it was, nevertheless, the first in the history of the world in which a machine carrying a man had raised itself by its own power into the air in free flight, had sailed forward on a level course without reduction of speed, and had finally landed without being wrecked.",
        "source": "Orville and Wilbur Wright, The Early History of the Airplane (Dayton, 1908/1922); Project Gutenberg eBook #25420",
        "href": "https://www.gutenberg.org/files/25420/25420-h/25420-h.htm"
      },
      {
        "category": "historical",
        "title": "Benjamin Franklin, Letter to Sir Joseph Banks on the First Balloon Ascents (1 December 1783)",
        "excerpt": "Between One & Two aClock, all Eyes were gratified with seeing it rise majestically from among the Trees, and ascend gradually above the Buildings, a most beautiful Spectacle! When it was about 200 feet high, the brave Adventurers held out and wav'd a little white Pennant, on both Sides their Car, to salute the Spectators, who return'd loud Claps of Applause. Never before was a philosophical Experiment so magnificently attended.",
        "source": "Benjamin Franklin and the First Balloons, ed. Abbott Lawrence Rotch (1907); Project Gutenberg eBook #43809",
        "href": "https://gutenberg.org/files/43809/43809-h/43809-h.htm"
      },
      {
        "category": "literary",
        "title": "Ovid, Metamorphoses, Book VIII: Daedalus and Icarus (8 AD; Riley trans. 1851)",
        "excerpt": "Although Minos may beset the land and the sea, still the skies, at least, are open. By that way will we go... Icarus, I recommend thee to keep the middle tract; lest, if thou shouldst go too low, the water should clog thy wings; if too high, the fire of the sun should scorch them.",
        "source": "Ovid, The Metamorphoses, trans. Henry T. Riley (1851), Book VIII; Project Gutenberg eBook #26073",
        "href": "https://www.gutenberg.org/files/26073/26073-h/26073-h.htm"
      },
      {
        "category": "literary",
        "title": "Alfred, Lord Tennyson, \"Locksley Hall\" (1842)",
        "excerpt": "For I dipt into the future, far as human eye could see, / Saw the vision of the world, and all the wonder that would be; / Saw the heavens fill with commerce, argosies of magic sails, / Pilots of the purple twilight, dropping down with costly bales;",
        "source": "Alfred Tennyson, \"Locksley Hall,\" Poems (1842); Wikisource",
        "href": "https://en.wikisource.org/wiki/Locksley_Hall"
      },
      {
        "category": "artistic",
        "title": "Gustav Holst, The Planets, Op. 32 — \"Mercury, the Winged Messenger\" (1914-1916) — MUSIC",
        "excerpt": "In this dazzling, quicksilver scherzo Holst sets the winged god Mercury, the swift messenger of the heavens, in perpetual flickering motion, melodies darting between two keys at once and orchestral colors flashing like sunlight on metal. Light, fleet, and weightless, the movement is the sound of pure speed aloft, an apt fanfare for a fleet of new wide-bodied craft built to carry travelers swiftly across the great distances of the sky.",
        "source": "Gustav Holst, The Planets, Op. 32 (1916), full score; IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/The_Planets,_Op.32_(Holst,_Gustav)"
      },
      {
        "category": "artistic",
        "title": "Pieter Bruegel the Elder, Landscape with the Fall of Icarus (c. 1555) — VISUAL ARTWORK",
        "excerpt": "A serene wide landscape of sea, ships, and a plowman at his furrow occupies the eye, while in the lower right corner Icarus has already plunged into the water, only two flailing legs still showing above the waves. The most famous image of flight's oldest myth, it pairs human soaring ambition with the ever-present warning of overreach, the same balance of daring and prudence that governs any fleet built to conquer the air.",
        "source": "Pieter Bruegel the Elder (after), Landscape with the Fall of Icarus, c. 1555, oil on canvas, Royal Museums of Fine Arts of Belgium, Brussels; Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_de_Oude_-_De_val_van_Icarus.jpg",
        "image": {
          "src": "/covers/sas-airbus-widebody-order--art.png",
          "alt": "Pieter Bruegel the Elder's Landscape with the Fall of Icarus: a sunlit coastal scene with a plowman, shepherd, and sailing ships, while the small flailing legs of the fallen Icarus disappear into the sea at lower right.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 26
  },
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
    "rank": 27
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
    "rank": 28
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
    "rank": 29
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
    "rank": 30
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
    "rank": 31
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
    "rank": 32
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
    "rank": 33
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
    "rank": 34
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
    "rank": 35
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
    "rank": 36
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
    "rank": 37
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
    "rank": 38
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
