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
// the Afternoon Edition of 13 July 2026 (ranks 1-13) leads with its hero story,
// followed by the Morning Edition of 13 July 2026 and the Evening Edition of 12 July 2026.
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
    "slug": "china-purges-ma-xingrui-politburo",
    "headline": "China expels former Politburo member Ma Xingrui from the Communist Party in the third such purge since 2025",
    "overview": "China's ruling Communist Party expelled Ma Xingrui, a former member of its 24-seat Politburo and until recently the party chief of the Xinjiang region, on corruption charges, state media said, making him the third Politburo-level official removed in President Xi Jinping's deepening anti-graft campaign since 2025. Investigators said Ma took bribes, sought advantage for others in official appointments and helped relatives buy property below market price, and his case was referred to prosecutors. The purge underscores how Xi has used the party's discipline apparatus to sideline senior figures across China's security and regional power structures.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMirwFBVV95cUxNVDJ0bDJkYnZTU2tsTDVzUjZPQnlveXk3dW9oYjlGMkVUcmt0YllQQ0RPTGYyenczYWtCMVlXbWJtVlp2ODNWdlhZd3ZUemcxOFVDdlFKZEZMTFVBa2VacXRISXB4MGtHTV9LVHFEMWoxd0hqTXFrRHhyVS1OemNGTHQ1eW54QWhlVUlfajBSV0FWbVozZEgyQTBCTUJGTUNiZkRHU292M2pCMURRNUxB?oc=5"
      },
      {
        "name": "Bloomberg",
        "href": "https://www.bloomberg.com/news/newsletters/2026-07-14/china-purges-third-politburo-member-since-2025-in-anti-corruption-drive"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-14",
    "image": {
      "src": "/covers/china-purges-ma-xingrui-politburo.png",
      "alt": "The Great Hall of the People in Beijing, seat of the Chinese Communist Party's most powerful bodies, under an overcast sky.",
      "credit": "Photo by Thomas Fanghänel, CC BY-SA 3.0, via Wikimedia Commons"
    },
    "lead": true,
    "edition": "Afternoon Edition · 14 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In AD 31 the Roman emperor Tiberius destroyed Lucius Aelius Sejanus, the praetorian prefect he had raised to be the second man in the empire. Sejanus had used his command of the guard and his grip on official appointments to enrich himself and pack the state with clients, until Tiberius, fearing a rival, had a letter read in the Senate ordering his arrest; he was strangled that same day and his statues torn down. The historian Cassius Dio records how the crowd that had escorted him at dawn as a superior being was dragging him to prison by nightfall. Ma Xingrui's fall follows the same arc: a Politburo member who once ran Xinjiang and steered promotions, brought down in a single announcement by the ruler he served. As with Sejanus, the charge sheet of bribery and rigged appointments doubles as a warning to every other lieutenant.",
        "excerpt": "After exalting Sejanus to a high pinnacle of glory and making him a member of his family by his alliance with Julia, the daughter of Drusus, Tiberius later killed him. … the man whom at dawn they had escorted to the senate-hall as a superior being, they were now dragging to prison as if no better than the worst; on him whom they had previously thought worthy of many crowns, they now laid bonds.",
        "source": "Cassius Dio, Roman History, Book LVIII (Loeb Classical Library, trans. Earnest Cary), via LacusCurtius (Bill Thayer, University of Chicago).",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Cassius_Dio/58*.html",
        "image": {
          "src": "/covers/china-purges-ma-xingrui-politburo--a0.png",
          "alt": "Ancient Roman marble bust of the Emperor Tiberius, the ruler who elevated and then destroyed Sejanus",
          "credit": "Marble bust of Tiberius, 1st century AD, Museo Archeologico Regionale, Palermo; photo public domain via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "After Cardinal Mazarin died in 1661, the young Louis XIV resolved to rule France himself and had his superintendent of finances, Nicolas Fouquet, arrested on charges of embezzlement and treason. Fouquet, one of the richest and most powerful men in the kingdom, was tried for three years before a special chamber staffed with his enemies and condemned to lifelong imprisonment, letting the king consolidate personal rule and elevate his rival Colbert. Madame de Sévigné, who followed the proceedings closely, recorded the chancellor pressing Fouquet in open court while the outcome was effectively foreordained. The parallel to Ma Xingrui is direct: an over-mighty official accused of financial crimes and removed through a disciplined legal apparatus that serves the ruler's consolidation of power. In both cases the corruption charge is real enough to stick and convenient enough to eliminate a potential rival.",
        "excerpt": "The chancellor interrupted him: “What! do you mean to say that the king abuses his power?” M. Fouquet replied, “It is you, sir, who say it, not I; this was not my idea, and, in my present situation, I can not but wonder at your wishing to implicate me still further with his majesty; but, sir, you yourself well know that we may be mistaken. When you sign a sentence, you believe it just, yet the next day you annul that sentence; thus you see it is possible to change our opinion.”",
        "source": "Madame de Sévigné, The Letters of Madame de Sévigné to Her Daughter and Friends — letters on the trial of M. Fouquet addressed to the Marquis de Pomponne, 1664; Project Gutenberg eBook #78579.",
        "href": "https://www.gutenberg.org/cache/epub/78579/pg78579.txt",
        "image": {
          "src": "/covers/china-purges-ma-xingrui-politburo--a1.png",
          "alt": "Charles Le Brun's portrait of Nicolas Fouquet, Louis XIV's superintendent of finances arrested for embezzlement",
          "credit": "Charles Le Brun, Portrait of Nicolas Fouquet, 17th century, public domain via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "In Shakespeare and Fletcher's play King Henry VIII, Cardinal Wolsey — the king's chief minister and one of the mightiest figures in the realm — is stripped of office and possessions the moment the king turns against him. In his farewell soliloquy Wolsey reflects on how abruptly greatness collapses and how wretched is the man who hangs on a prince's favour. The speech is the classic English dramatization of the fall of a once-supreme official brought low by the sovereign he served. It reads as a gloss on Ma Xingrui, a full Politburo member expelled from the party and handed to prosecutors, his career nipped at the moment of apparent ripeness. Like Wolsey, he is a servant of power discarded the instant he becomes a liability.",
        "excerpt": "Farewell! a long farewell, to all my greatness!\nThis is the state of man: to-day he puts forth\nThe tender leaves of hopes; to-morrow blossoms,\nAnd bears his blushing honours thick upon him;\nThe third day comes a frost, a killing frost,\nAnd, when he thinks, good easy man, full surely\nHis greatness is a-ripening, nips his root,\nAnd then he falls, as I do. I have ventured,\nLike little wanton boys that swim on bladders,\nThis many summers in a sea of glory,\nBut far beyond my depth: my high-blown pride\nAt length broke under me and now has left me,\nWeary and old with service, to the mercy\nOf a rude stream, that must for ever hide me.\nVain pomp and glory of this world, I hate ye:\nI feel my heart new open'd. O, how wretched\nIs that poor man that hangs on princes' favours!\nThere is, betwixt that smile we would aspire to,\nThat sweet aspect of princes, and their ruin,\nMore pangs and fears than wars or women have:\nAnd when he falls, he falls like Lucifer,\nNever to hope again.",
        "source": "William Shakespeare and John Fletcher, King Henry VIII, Act 3, Scene 2 (Cardinal Wolsey's soliloquy); The Complete Works of William Shakespeare, MIT.",
        "href": "https://shakespeare.mit.edu/henryviii/henryviii.3.2.html"
      },
      {
        "category": "literary",
        "title": "Arthur Koestler's 1940 novel Darkness at Noon follows Rubashov, an old Bolshevik and former commissar arrested by the very revolutionary regime he helped build and interrogated until he confesses to invented crimes in a show trial. The book is the defining literary study of the party purge — how a movement devours its own leaders and how discipline demands the ritual destruction of once-powerful men. Koestler shows the machinery of denunciation and confession operating with bureaucratic calm. Ma Xingrui's expulsion, announced by the party's discipline inspectors before his case even reaches court, echoes that machinery: a senior insider processed and cast out by the apparatus he once embodied.",
        "excerpt": "Koestler renders the purge from inside the accused's own cell — the endless night interrogations, the pitiless logic that a loyal revolutionary must confess for the good of the Party, the calm ticking of a life once spent at the summit of power. Rubashov comes to see his own liquidation as the natural conclusion of the system he served, and signs his name to it. The novel's horror is procedural rather than violent: the Party need not hate the man it destroys, only file him away.",
        "source": "Arthur Koestler, Darkness at Noon, translated from the German by Daphne Hardy (Macmillan, 1941). Modern copyrighted work — described, not quoted.",
        "href": "https://archive.org/details/darknessatnoon00koes"
      },
      {
        "category": "artistic",
        "title": "Rembrandt's painting Belshazzar's Feast (about 1636–1638, National Gallery, London) depicts the Babylonian king at his banquet, recoiling in terror as a disembodied hand writes his condemnation on the wall. The words, read by the prophet Daniel, declare that the king has been weighed in the balances and found wanting, and that his reign is finished. It is an archetypal image of a mighty ruler suddenly judged and stripped of power at the height of his splendour. The stopped moment of dawning ruin mirrors the logic of Ma Xingrui's downfall — a figure at the peak of official privilege abruptly weighed, found corrupt, and cast down by an authority he cannot resist. Rembrandt fixes on the instant a career ends in a single verdict.",
        "excerpt": "And this is the writing that was written, MENE, MENE, TEKEL, UPHARSIN. This is the interpretation of the thing: MENE; God hath numbered thy kingdom, and finished it. TEKEL; Thou art weighed in the balances, and art found wanting. PERES; Thy kingdom is divided, and given to the Medes and Persians.",
        "source": "Rembrandt van Rijn, Belshazzar's Feast, c. 1636–1638, oil on canvas, National Gallery, London (NG6350); inscription from the Book of Daniel, chapter 5 (King James Version).",
        "href": "https://www.nationalgallery.org.uk/paintings/rembrandt-belshazzar-s-feast",
        "image": {
          "src": "/covers/china-purges-ma-xingrui-politburo--a4.png",
          "alt": "Rembrandt's Belshazzar's Feast: a richly robed king recoils as a glowing hand writes on the wall",
          "credit": "Rembrandt van Rijn, Belshazzar's Feast, c. 1636–1638, public domain via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "The Dies irae of Mozart's Requiem in D minor, K.626 (1791) sets the medieval sequence describing the Day of Wrath, when every hidden deed is exposed before a seated judge and nothing goes unpunished. Mozart renders judgment as a sudden, overwhelming force that spares no rank, the chorus and orchestra crashing in without warning. The text's insistence that all that is concealed will be brought to light speaks directly to an anti-graft reckoning. In Ma Xingrui's case the party's discipline apparatus performs that role, exposing bribes and hidden property deals once shielded by his high office. The movement's terror lies in its impartial finality — the quality Xi's campaign projects as it reaches even the Politburo.",
        "excerpt": "Dies irae, dies illa / solvet saeclum in favilla, / teste David cum Sibylla. … Iudex ergo cum sedebit, / quidquid latet, apparebit; / nil inultum remanebit. (Day of wrath, that day will dissolve the world in ash… When therefore the Judge takes his seat, whatever is hidden shall be revealed; nothing shall remain unpunished.)",
        "source": "Wolfgang Amadeus Mozart, Requiem in D minor, K.626, 'Sequenz: Dies irae' (completed by F. X. Süssmayr, 1792); Latin sequence attributed to Thomas of Celano, text via the Choral Public Domain Library (CPDL). Score at IMSLP.",
        "href": "https://imslp.org/wiki/Requiem_in_D_minor,_K.626_(Mozart,_Wolfgang_Amadeus)"
      }
    ],
    "rank": 1
  },
  {
    "slug": "new-york-data-center-moratorium",
    "headline": "New York becomes the first U.S. state to impose a one-year moratorium on large new data centers",
    "overview": "New York became the first U.S. state to halt construction of large new data centers, as Governor Kathy Hochul imposed a one-year moratorium on state permits for facilities drawing 20 megawatts or more amid concern that the artificial-intelligence build-out is driving up electricity bills and straining water supplies. During the pause the state's environmental agency will withhold discretionary permits and draft binding standards, and Hochul said she would also seek to repeal sales-tax breaks for large data centers. The step follows a bill state lawmakers passed in June and makes New York a national test case for regulating AI infrastructure.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiogFBVV95cUxQS1VqV09jX0hhZXQxRXpwaGRHbnY1SmdGT1RMYVEyM1pBaWtyNlBoaTBKYWpCRlMyWHQzMFVCUTFyakRMaDlhTkJpWUtMQThfeFlPQml2RHRUbVJTQmVWMjRvb2w5al9CeW1iQzJ5dkVLUlJHaWZMcXNRbUxZSGdIX2VrZkhKSWplczI1Rlc5d1puZng2Mkc3SXdYM2VYUER4Vnc?oc=5"
      },
      {
        "name": "The Star",
        "href": "https://www.thestar.com.my/tech/tech-news/2026/07/14/new-york-becomes-the-first-state-to-impose-a-data-center-moratorium"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-14",
    "image": {
      "src": "/covers/new-york-data-center-moratorium.png",
      "alt": "Rows of illuminated server racks stretch down the cold aisle of a large data center.",
      "credit": "BalticServers.com, via Wikimedia Commons (CC BY-SA 3.0 / GFDL)"
    },
    "edition": "Afternoon Edition · 14 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Long before AI, a city government could simply smother a machine it feared. In 1579 the mayor of Danzig, alarmed that a new ribbon-loom weaving four to six pieces at once would throw weavers onto the street, reportedly had its inventor secretly strangled, and across seventeenth-century Europe town councils banned the device outright, as Leyden's did after riots. New York's moratorium is the lawful, humane descendant of that same reflex: a government hitting pause on a technology whose appetite outruns the community's ability to absorb it. Then the fear was for jobs; now it is for power and water. The instinct to freeze a runaway machine is centuries old.",
        "excerpt": "Abbé Lancellotti, in a work that appeared in Venice in 1636, but which was written in 1579, says as follows: “Anthony Müller of Danzig saw about 50 years ago in that town, a very ingenious machine, which weaves 4 to 6 pieces at once. But the Mayor being apprehensive that this invention might throw a large number of workmen on the streets, caused the inventor to be secretly strangled or drowned.” In Leyden, this machine was not used till 1629; there the riots of the ribbon-weavers at length compelled the Town Council to prohibit it.",
        "source": "Karl Marx, Capital, Volume I, Chapter 15 (“Machinery and Modern Industry”), quoting Abbé Lancellotti; Marxists Internet Archive",
        "href": "https://www.marxists.org/archive/marx/works/1867-c1/ch15.htm"
      },
      {
        "category": "historical",
        "title": "In 1974 the very scientists inventing gene-splicing did something almost unheard of: they called for a halt on their own most dangerous work. Led by Paul Berg, they published a letter urging a voluntary worldwide moratorium on certain recombinant-DNA experiments until the hazards could be understood, a pause that culminated in the 1975 Asilomar conference where researchers drafted binding safety rules before proceeding. New York's data-center freeze follows the same three-beat logic almost exactly: stop, study, then permit under standards. The difference is who holds the brake. At Asilomar the industry restrained itself; in Albany it is the state drawing the line around a powerful new technology.",
        "excerpt": "In a landmark 1974 letter to the journals Science and PNAS, Paul Berg and ten colleagues asked scientists worldwide to voluntarily defer whole classes of recombinant-DNA experiments until the risks of moving genes between organisms could be assessed. The following year the Asilomar conference translated that pause into a tiered system of physical and biological containment, allowing the research to resume only under agreed safeguards. It remains the textbook case of a field choosing to hit pause on itself.",
        "source": "Paul Berg et al., “Potential Biohazards of Recombinant DNA Molecules,” Proceedings of the National Academy of Sciences 71:7 (1974); PubMed Central",
        "href": "https://pmc.ncbi.nlm.nih.gov/articles/PMC388511/"
      },
      {
        "category": "literary",
        "title": "Goethe's 1797 ballad gives us the enduring image of a convenience, summoned to save labor, that then floods the room. The apprentice enchants a broom to haul water but cannot recall the spell to stop it, and the water rises and rises while he cries out for his master. It is the moratorium's theme in miniature: a marvel that solves one problem while drowning its maker in another. Data centers were conjured to carry our digital water; New York, eyeing the electric bills and the strained reservoirs, is now the apprentice calling for someone to make it stop.",
        "excerpt": "Ever seems the flood to fill, / Ah, he's coming! see, / Great is my dismay! / Spirits raised by me / Vainly would I lay!",
        "source": "Johann Wolfgang von Goethe, “The Pupil in Magic” (Der Zauberlehrling, 1797), trans. Edgar Alfred Bowring, The Works of J. W. von Goethe, Vol. 9; Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Works_of_J._W._von_Goethe/Volume_9/The_Pupil_in_Magic"
      },
      {
        "category": "literary",
        "title": "Samuel Butler's 1872 satire Erewhon imagines a nation that did what no real country ever quite has: it abolished its machines. Centuries before the narrator arrives, the Erewhonians were persuaded by a philosopher's tract that machines were evolving far faster than men and would one day master them, so they smashed nearly every mechanical device and forbade further progress. Butler's “Book of the Machines” is essentially a moratorium manifesto, arguing that it is safer to nip the danger in the bud. As New York freezes permits for the vast machine-halls of the AI age, Butler's fable reads less like whimsy than like a policy memo.",
        "excerpt": "May not the world last twenty million years longer? If so, what will they not in the end become? Is it not safer to nip the mischief in the bud and to forbid them further progress?",
        "source": "Samuel Butler, Erewhon; Or, Over the Range, Chapter XXIII (“The Book of the Machines”), 1872; Project Gutenberg",
        "href": "https://www.gutenberg.org/files/1906/1906-h/1906-h.htm"
      },
      {
        "category": "artistic",
        "title": "Philip James de Loutherbourg's 1801 painting Coalbrookdale by Night shows the Bedlam ironworks blazing in the dark, its furnaces throwing a hellish orange glare across the Shropshire valley that gave birth to the Industrial Revolution. It is among the first artworks to treat heavy industry as a sublime and slightly terrifying force, reshaping the land and devouring everything around it. Two centuries on, the data center humming through the night is our Coalbrookdale: the new furnace drinking power and water from the countryside. The painting captures exactly the unease that pushed New York to act.",
        "excerpt": "A nocturne of industry: molten light pours from the furnaces of the Madeley Wood ironworks while smoke and steam boil into a black sky, dwarfing the tiny figures and carts below. Loutherbourg renders the birth of the industrial age as both awe-inspiring and infernal, a landscape being consumed by the very fires of production.",
        "source": "Philip James de Loutherbourg, “Coalbrookdale by Night,” 1801, oil on canvas, Science Museum, London; Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Philipp_Jakob_Loutherbourg_d._J._002.jpg",
        "image": {
          "src": "/covers/new-york-data-center-moratorium--a4.png",
          "alt": "Coalbrookdale by Night (1801): ironworks furnaces glowing red against a dark, smoke-filled night sky.",
          "credit": "Philip James de Loutherbourg, 1801, Science Museum, London (public domain), via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Paul Dukas turned Goethe's ballad into music in 1897 with L'apprenti sorcier, the symphonic poem later immortalized by Disney's Fantasia. Listen and you hear the runaway logic of the moratorium itself: a mischievous little theme starts up, multiplies, and swells into an unstoppable sloshing march as the enchanted brooms flood the workshop, until a single thunderclap, the master's return, cuts it dead. It is the sound of a system that cannot regulate itself and must be halted from outside. New York's one-year freeze is that thunderclap; the open question is whether the master arrives in time.",
        "excerpt": "Dukas builds the piece from a single skittering motif that begins as a light bassoon curiosity, then breeds and accelerates into a churning, brass-heavy tide as the animated brooms multiply and the water keeps rising. The music has no internal off-switch; only an abrupt orchestral crash, the returning sorcerer, breaks the spell and restores silence.",
        "source": "Paul Dukas, L'apprenti sorcier (The Sorcerer's Apprentice), symphonic poem, 1897, A. Durand & Fils; IMSLP",
        "href": "https://imslp.org/wiki/L'apprenti_sorcier_(Dukas,_Paul)"
      }
    ],
    "rank": 2
  },
  {
    "slug": "china-europe-south-china-sea-ruling",
    "headline": "China urges Europe to withdraw support for the 2016 South China Sea ruling as 14 nations and the EU reaffirm it",
    "overview": "Beijing called on European governments to stop endorsing the 2016 Hague arbitration ruling that rejected most of China's claims in the South China Sea, warning that continued support for the 'illegal' award would harm China-EU ties, after the European Union and 14 countries reaffirmed the decision as 'final and legally binding' on its tenth anniversary. China's foreign ministry repeated that it 'neither accepts nor recognizes' the tribunal, which it says overstepped its jurisdiction. The exchange marks a fresh flashpoint between Beijing and the West over freedom of navigation in one of the world's busiest waterways.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiwgFBVV95cUxQM1ZheXdvZmxPZ09nRGcyYXQta1JHLXhGc2tFYXU3TmdoWFZtWXpfdU1zaXNTVG9LTnBKRkxwZ0kwWHBVNGJJU3Z5d2VIRWZiejlBMFFjekhlaWd6OTNIbjNPc01jazd0NWZBQTNMNWlqb01KWG8wRUItUVA2dkZ0cjVaMmxxT0t0QzAwXzEya2ZjNjYwdGdRYTFqLWJ6ZURhVnpFZU9QYkFTMktqWHE0aWlOZ1hsbUwyMnVnSGpPMlRTUQ?oc=5"
      },
      {
        "name": "Taipei Times",
        "href": "https://www.taipeitimes.com/News/front/archives/2026/07/13/2003860650"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-14",
    "image": {
      "src": "/covers/china-europe-south-china-sea-ruling.png",
      "alt": "A Chinese coast guard vessel patrols disputed waters in the South China Sea.",
      "credit": "The Peace Palace, The Hague, seat of the Permanent Court of Arbitration that issued the 2016 South China Sea award. Photo by Thomas Wolf (www.foto-tw.de), CC BY-SA 3.0 DE, via Wikimedia Commons."
    },
    "edition": "Afternoon Edition · 14 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In 416 BC the Athenian empire sent envoys to the tiny island of Melos with a blunt message: talk of justice is meaningless between unequal powers, and the weak must simply accept what the strong impose. Melos refused to surrender its independence, trusting in fairness and hope; Athens besieged the island, killed the men and enslaved the rest. Thucydides preserved the exchange as the founding text of \"might makes right.\" It is precisely this logic that the 2016 Hague ruling, and the 15 governments now reaffirming it, are trying to overturn when a small coastal state invokes law against a giant.",
        "excerpt": "Since you know as well as we do that right, as the world goes, is only in question between equals in power, while the strong do what they can and the weak suffer what they must.",
        "source": "Thucydides, History of the Peloponnesian War, Book V (The Melian Dialogue), trans. Richard Crawley",
        "href": "https://sourcebooks.web.fordham.edu/ancient/thuc-melian.asp"
      },
      {
        "category": "historical",
        "title": "In 1609 the Dutch jurist Hugo Grotius published Mare Liberum, arguing that the sea belongs to no single nation and that free navigation is a right of all peoples. Written to defend Dutch traders against Portuguese and Spanish claims to closed seas, it became the cornerstone of the modern law of the sea that produced UNCLOS and the very tribunal in The Hague. Beijing's expansive \"nine-dash line\" is a contemporary version of the closed-sea (mare clausum) claim Grotius attacked. Europe reaffirming the award is, in effect, restating his four-century-old axiom of the free seas.",
        "excerpt": "By the Law of Nations navigation is free to all persons whatsoever... I shall base my argument on the following most specific and unimpeachable axiom of the Law of Nations, called a primary rule or first principle, the spirit of which is self-evident and immutable, to wit: Every nation is free to travel to every other nation, and to trade with it.",
        "source": "Hugo Grotius, The Freedom of the Seas (Mare Liberum, 1609), Chapter I, trans. Ralph Van Deman Magoffin (Carnegie Endowment / Oxford Univ. Press, 1916)",
        "href": "https://bpb-us-w2.wpmucdn.com/sites.umassd.edu/dist/4/628/files/2016/10/Hugo-Grotius-The-Freedom-of-the-Seas1609.pdf"
      },
      {
        "category": "literary",
        "title": "In Chapter 89 of Moby-Dick, Melville lays out the whalemen's entire code of ownership in two brutal rules: a fish already harpooned belongs to whoever holds it, and a loose one is fair game for whoever can grab it first. He then widens the joke into a theory of empires, colonies and human rights themselves as \"Loose-Fish\" waiting to be seized by the strongest. It is a mordant portrait of possession by power rather than by law. A maritime claim asserted by grabbing, and denying any court can say otherwise, is Melville's Loose-Fish doctrine made real.",
        "excerpt": "I. A Fast-Fish belongs to the party fast to it. II. A Loose-Fish is fair game for anybody who can soonest catch it... What are the Rights of Man and the Liberties of the World but Loose-Fish?",
        "source": "Herman Melville, Moby-Dick; or, The Whale (1851), Chapter 89, \"Fast-Fish and Loose-Fish\"",
        "href": "https://en.wikisource.org/wiki/Moby-Dick_(1851)_US_edition/Chapter_89"
      },
      {
        "category": "literary",
        "title": "In Aesop's fable, a wolf that has already decided to eat a lamb methodically invents charges against it, so that the killing will look justified. The lamb refutes every accusation with plain facts, but the facts never mattered; the wolf devours it anyway. The moral is that a tyrant will always manufacture a pretext for tyranny. When a great power dismisses a legal award as \"illegal\" and declares it \"neither accepts nor recognizes\" the tribunal, the lamb's careful, law-based answers meet the same fate.",
        "excerpt": "[A Wolf] resolved not to lay violent hands on him, but to find some plea to justify to the Lamb the Wolf's right to eat him... The tyrant will always find a pretext for his tyranny.",
        "source": "Aesop, \"The Wolf and the Lamb,\" Aesop's Fables, trans. George Fyler Townsend; Internet Classics Archive",
        "href": "https://classics.mit.edu/Aesop/fab.1.1.html"
      },
      {
        "category": "artistic",
        "title": "Hokusai's woodblock print shows a colossal wave curling over three slender fishing boats, its claws of foam about to crash down while Mount Fuji sits tiny on the horizon. The overwhelming sea dwarfs the fragile human vessels clinging to their route. It is an image of small craft trying to hold their line against a force that answers to no one. In a dispute over freedom of navigation, it captures the position of smaller coastal states pressing forward beneath the shadow of a giant's claim.",
        "excerpt": "Katsushika Hokusai's \"Under the Wave off Kanagawa,\" better known as \"The Great Wave,\" is the most famous print of his series Thirty-six Views of Mount Fuji (c. 1830-31). A towering wave overwhelms small boats while distant Fuji stands unmoved, an enduring emblem of human smallness before the power of the sea.",
        "source": "Katsushika Hokusai, \"Under the Wave off Kanagawa (The Great Wave),\" c. 1830-31, from Thirty-six Views of Mount Fuji; public domain, via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Tsunami_by_hokusai_19th_century.jpg",
        "image": {
          "src": "/covers/china-europe-south-china-sea-ruling--a4.png",
          "alt": "Hokusai's woodblock print The Great Wave off Kanagawa: a giant cresting wave towering over three small boats with Mount Fuji in the distance",
          "credit": "Katsushika Hokusai, The Great Wave off Kanagawa (c. 1830-31), public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Turner's 1839 masterpiece shows the ghostly warship Temeraire, a hero of the Battle of Trafalgar, being towed by a small dark steam-tug to be scrapped, glowing pale against a blazing sunset. It is a meditation on how even the mightiest sea power fades, its command of the waves passing into memory. No fleet, however dominant, rules the ocean forever. Against a giant that treats the South China Sea as its permanent possession, the painting whispers that dominion by force is temporary, while the shared law of the seas endures.",
        "excerpt": "J. M. W. Turner's \"The Fighting Temeraire tugged to her last berth to be broken up\" (1839) depicts a once-great warship, veteran of Trafalgar, hauled off to be dismantled beneath a fiery sunset. The luminous, elegiac scene turns the end of one navy's supremacy into a universal emblem: sea power is mortal, and no empire holds the waves for good.",
        "source": "J. M. W. Turner, \"The Fighting Temeraire tugged to her last berth to be broken up\" (1839), National Gallery, London; public domain, via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:The_Fighting_Temeraire,_JMW_Turner,_National_Gallery.jpg",
        "image": {
          "src": "/covers/china-europe-south-china-sea-ruling--a5.png",
          "alt": "Turner's painting The Fighting Temeraire: a pale ghostly sailing warship towed by a small steam-tug across a golden sunset on calm water",
          "credit": "J. M. W. Turner, The Fighting Temeraire (1839), National Gallery, London; public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 3
  },
  {
    "slug": "google-switzerland-android-search-probe",
    "headline": "Switzerland's competition regulator opens an investigation into Google over Android's dropped search-engine choice screen",
    "overview": "Switzerland's Competition Commission (COMCO/WEKO) opened a preliminary investigation into Google after the company removed the 'choice screen' that let Android users pick a default search engine during setup, a feature Google still offers in the European Economic Area. Regulators said the change could shut out rival search providers and creates unequal treatment for Swiss users, in a market where Google holds about 82% of search. Google said it was aware of the probe and would cooperate fully with the authority.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMivgFBVV95cUxOUGtmS3lEY2QtaUNTd2NnVFlYZ3drc2pKZWlyQ0J4T1VUVzlLejVPNW1Va3FxUXpzX1R0VmZ5VEtpTmI0dkIwMUhiTF9Vdmc0YUZqZ1lwWjlNZVd1Nk1PcTRWbVBDWG5rSGFvOHh4QWM5TUIwLVRIbE9OeS1vSFFJTzA2bGhnRXdybFJISFY3OEN6WWtocXJRM0tseWp4WmpaNnA2VTJUOHlFeTM4QlIxbDAtRTJLSnExRE9xcFZB?oc=5"
      },
      {
        "name": "SWI swissinfo.ch",
        "href": "https://www.swissinfo.ch/eng/various/weko-is-investigating-google-in-relation-to-search-engines/91742043"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-14",
    "image": {
      "src": "/covers/google-switzerland-android-search-probe.png",
      "alt": "An Android smartphone displays a search bar on its home screen, held in one hand.",
      "credit": "Android smartphone (Samsung Galaxy Note 10), photo via Wikimedia Commons, CC BY-SA."
    },
    "edition": "Afternoon Edition · 14 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Nearly four centuries before Android, England's Parliament struck at the exact thing COMCO now fears: a powerful gatekeeper handed an exclusive road that everyone else is forced to travel. The Crown had been selling monopoly patents on playing cards, salt, even the making of glass, and the 1623 Statute of Monopolies declared them void as contrary to the realm's laws. It is among the first times a state formally decided that whoever controls the default channel of commerce must be curbed by statute. Google's roughly 82% grip on Swiss search, hardened by a removed choice screen, is a modern letters-patent by another name: the many funneled through one door because no rival can afford the toll.",
        "excerpt": "...are altogether contrary to the laws of this realm, and so are and shall be utterly void and of none effect, and in no wise to be put in ure or execution.",
        "source": "Statute of Monopolies, 1623 (21 Jac. 1, c. 3), Parliament of England",
        "href": "https://en.wikisource.org/wiki/Statute_of_Monopolies"
      },
      {
        "category": "historical",
        "title": "A generation before Android, another dominant platform learned that the default is the most valuable real estate in all of software. U.S. regulators found that Microsoft used its Windows monopoly to steer users toward Internet Explorer, and courts held that bundling and pre-installation, not merit, kept rivals from ever earning a fair click. The parallel to Switzerland's case is almost exact: remove the moment of choice at setup and inertia quietly does the monopolist's work. The choice screen Google deleted is the 2020s version of the browser Microsoft made hard to replace.",
        "excerpt": "Microsoft enjoys so much power in the market for Intel-compatible PC operating systems that if it wished to exercise this power solely in terms of price, it could charge a price for Windows substantially above that which could be charged in a competitive market.",
        "source": "United States v. Microsoft Corp., Court's Findings of Fact, U.S. District Court (D.D.C.), Nov. 5, 1999, para. 33",
        "href": "https://www.justice.gov/atr/us-v-microsoft-courts-findings-fact"
      },
      {
        "category": "literary",
        "title": "Kafka's parable gives us the choice screen as a nightmare. A man from the country waits his entire life before an open door to the Law, held back by a single doorkeeper who never quite says no, only 'not yet.' The gate was meant for him alone, yet he never walks through it, paralyzed by the gatekeeper's authority until death. That is the quiet violence of a default: the gate is technically open to rival search engines, but whoever guards the threshold, here the setup screen Google controls, decides who is ever really let in.",
        "excerpt": "Vor dem Gesetz steht ein Türhüter. Zu diesem Türhüter kommt ein Mann vom Lande und bittet um Eintritt in das Gesetz.",
        "source": "Franz Kafka, 'Vor dem Gesetz' (Before the Law), 1915",
        "href": "https://de.wikisource.org/wiki/Vor_dem_Gesetz"
      },
      {
        "category": "literary",
        "title": "Hobbes imagined sovereignty as a 'Mortall God,' an artificial giant assembled from the wills of the many who consent to be ruled for the sake of peace. A search monopoly is a commercial Leviathan of the same shape: 82% of a nation's queries flow up into one body because each user, individually, defers to the default. COMCO's probe is the older question in new clothes, namely who checks the Leviathan once it is built. When a private power sets the first choice for millions, the state becomes the only rival sovereign left that can say no.",
        "excerpt": "This is the Generation of that great Leviathan, or rather (to speake more reverently) of that Mortall God, to which wee owe under the Immortall God, our peace and defence.",
        "source": "Thomas Hobbes, Leviathan (1651), Part II, Chapter XVII",
        "href": "https://en.wikisource.org/wiki/Leviathan_(1651)/Chapter_17"
      },
      {
        "category": "artistic",
        "title": "Udo Keppler's 1904 cartoon 'Next!' renders Standard Oil as an octopus, its tentacles coiled around Congress, statehouses, and industry, with one arm reaching for the White House itself. It is the defining image of a monopoly that has stopped competing and started swallowing. Swap crude oil for search queries and the picture updates cleanly: a single firm whose reach into the default settings of every Android phone grips rivals before they can grow. The choice screen was one tentacle the Swiss regulators now want pried loose.",
        "excerpt": "Keppler's octopus captions the modern anxiety perfectly: a single creature whose reach is so total that no institution escapes its grip. Replace the oil tank with a search box and the tentacles become defaults, pre-installs, and the removed choice screen.",
        "source": "Udo J. Keppler, 'Next!', Puck, September 7, 1904 (Library of Congress)",
        "href": "https://commons.wikimedia.org/wiki/File:Standard_oil_octopus_loc_color.jpg",
        "image": {
          "src": "/covers/google-switzerland-android-search-probe--a4.png",
          "alt": "1904 political cartoon depicting Standard Oil as an octopus whose tentacles grip the U.S. Capitol, statehouses, and industry, one arm reaching for the White House",
          "credit": "Udo J. Keppler / Puck, 1904. U.S. Library of Congress (ppmsca.25884). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Joseph Keppler's 'The Bosses of the Senate' (1889) shows bloated trust monopolists looming over tiny lawmakers, while the people's entrance to the chamber is bolted shut. The cartoon's entire point is gatekeeping: the powerful decide which door stands open and which is closed. Switzerland's regulators are, in effect, trying to unbolt the people's entrance to search, restoring the moment where an ordinary Android user, not Google's default, picks who gets in. The image is more than a century old and still reads as a caption for this case.",
        "excerpt": "This is a Senate of the Monopolists, by the Monopolists, and for the Monopolists!",
        "source": "Joseph Keppler, 'The Bosses of the Senate', Puck, January 23, 1889 (Library of Congress)",
        "href": "https://commons.wikimedia.org/wiki/File:The_Bosses_of_the_Senate_by_Joseph_Keppler.jpg",
        "image": {
          "src": "/covers/google-switzerland-android-search-probe--a5.png",
          "alt": "1889 cartoon showing giant money-bag 'trust' figures towering over U.S. senators, with a closed 'People's Entrance' to the Senate",
          "credit": "Joseph Keppler / Puck, 1889. U.S. Library of Congress. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 4
  },
  {
    "slug": "nvidia-halves-asia-chip-buyers",
    "headline": "Nvidia more than halves its approved list of Asian AI-chip buyers to keep restricted GPUs from reaching China",
    "overview": "Nvidia has cut its roster of authorized customers in Asia by more than half after introducing a vetting 'white list' meant to stop its advanced AI processors from being diverted to China, the Financial Times reported. Over recent months the company tightened due diligence on distributors in Singapore, Malaysia and Japan, removing more than half of previous buyers—many of them smaller 'neo-cloud' providers—who may reapply after making changes. The clampdown follows U.S. export controls expected to shrink Nvidia's share of China's AI-chip market from roughly two-thirds in 2024 to single digits.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMirgFBVV95cUxQQ042c2NBTzI2SnhBeFZzMC03WndWMmFTRG1KbXI4V2hacnh2SWZUZ29nbkRvcUNVRi1NVEhWd19hSmNNNzh0QzNLVjhZcjFLWXhGdjFhLXIxcDRnUEQ0X0RRaXRVckJRd2Q1bmNpTklSbW5NUnNJUTdNejllLTVpTzF2QkI5V1YwUHVCWVgyREVXZG1QVS1fYWNGRVFweUlVQlpJSVhWNDF6WDd2TGc?oc=5"
      },
      {
        "name": "Zawya (Reuters)",
        "href": "https://www.zawya.com/en/business/technology-and-telecom/nvidia-halves-asia-buyer-list-in-china-chip-crackdown-ft-reports-bo5o1os8"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-14",
    "image": {
      "src": "/covers/nvidia-halves-asia-chip-buyers.png",
      "alt": "A high-end Nvidia data-center GPU board with heat sinks, seen close up.",
      "credit": "NVIDIA H100 Tensor Core GPU. Photo by 极客湾Geekerwan, CC BY 3.0, via Wikimedia Commons."
    },
    "edition": "Afternoon Edition · 14 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "When Nvidia pared its roster of trusted Asian buyers down to a vetted 'white list,' it revived a Cold War instinct: deny the rival the machines that make power. From 1949 the Western allies ran CoCom, a quiet committee in Paris that policed which computers, precision lathes, and microelectronics could cross the Iron Curtain. Like Nvidia's list, CoCom lived by lists — goods permitted, buyers approved, end-users watched — precisely because front companies and transshipment thrived in every gap. Singapore and Kuala Lumpur now play the role once held by Vienna and Zurich: neutral waypoints where a diverted shipment can quietly change its destination.",
        "excerpt": "An informal club of Western governments drew up 'control lists' and demanded that each strategic export declare its true end-user; a computer routed through a Swiss trading house could be traced, denied, or seized if its real destination lay in Moscow. Enforcement leaked constantly through third countries, and CoCom's whole history became a running battle against the diverted shipment.",
        "source": "Coordinating Committee for Multilateral Export Controls (CoCom), 1949–1994",
        "href": "https://en.wikipedia.org/wiki/Coordinating_Committee_for_Multilateral_Export_Controls"
      },
      {
        "category": "historical",
        "title": "Eight centuries before export-control lawyers, the Church wrestled with Nvidia's exact problem: how to stop your own merchants from arming the adversary for profit. The Third Lateran Council of 1179 threatened excommunication, confiscation, and even enslavement for Christians who sold the Saracens arms, iron, and shipbuilding timber — the strategic 'dual-use' goods of their day. The logic is identical to a GPU white list: deny the rival the material that converts directly into military strength. Then as now, the driver was 'cruel avarice,' the fat margin in selling contraband to a forbidden buyer.",
        "excerpt": "Cruel avarice has so seized the hearts of some that though they glory in the name of Christians they provide the Saracens with arms and wood for helmets, and become their equals or even their superiors in wickedness and supply them with arms and necessaries to attack Christians... Therefore we declare that such persons should be cut off from the communion of the church and be excommunicated for their wickedness, that catholic princes and civil magistrates should confiscate their possessions, and that if they are captured they should become the slaves of their captors.",
        "source": "Third Lateran Council (1179), Canon 24",
        "href": "https://www.papalencyclicals.net/councils/ecum11.htm"
      },
      {
        "category": "literary",
        "title": "Nvidia's real fear is the smuggler — the tidy distributor in Singapore who nods through the vetting and ships the accelerators onward to China anyway. Kipling's Sussex ballad is the folk anthem of exactly that trade: goods moving in the dark, everyone paid to look the other way, 'them that ask no questions isn't told a lie.' Swap the brandy and 'baccy for restricted H100 boards and the moral geography is unchanged — a coveted good, a forbidden destination, and a chain of paid intermediaries who profit by watching the wall. The poem is a manual in plausible deniability, the very thing Nvidia's due diligence is meant to strip away.",
        "excerpt": "If you wake at midnight, and hear a horse's feet,\nDon't go drawing back the blind, or looking in the street,\nThem that ask no questions isn't told a lie.\nWatch the wall, my darling, while the Gentlemen go by!\n\nFive and twenty ponies,\nTrotting through the dark—\nBrandy for the Parson,\n'Baccy for the Clerk;\nLaces for a lady; letters for a spy,\nAnd watch the wall, my darling, while the Gentlemen go by!",
        "source": "Rudyard Kipling, 'A Smuggler's Song' (from Puck of Pook's Hill, 1906)",
        "href": "https://en.wikisource.org/wiki/A_Smuggler's_Song"
      },
      {
        "category": "literary",
        "title": "At bottom this is a story about denying a rival the fire. Zeus meant to keep the transformative technology from mortals; Prometheus stole it hidden in a hollow reed and paid for the diversion with eternity chained to a rock. Nvidia's chips are the modern fire — a 'measureless resource' and 'mighty teacher of all arts' that lifts whoever holds it. Export controls cast Washington as Zeus guarding the flame, the smuggling networks as so many Prometheuses, and the blacklists, seizures, and prosecutions as the eagle sent to the liver.",
        "excerpt": "I sought the fount of fire in hollow reed\nHid privily, a measureless resource\nFor man, and mighty teacher of all arts.",
        "source": "Aeschylus, Prometheus Bound (trans. E. B. Browning)",
        "href": "http://classics.mit.edu/Aeschylus/prometheus.html"
      },
      {
        "category": "artistic",
        "title": "Wright of Derby lit his forge like a shrine, the white-hot iron bar the only sun in the room — a reminder that strategic power has always begun in the heat of manufacture. In 1772 the coveted, controllable technology was worked metal; today it is the etched silicon of an AI accelerator. The painting sanctifies the moment of making that nations have forever tried to hoard, license, and deny to rivals. Nvidia's white list is a ledger drawn around a glow much like this one — deciding who may stand in the light of the forge.",
        "excerpt": "A family gathers around a water-powered forge at night, every face lit by a single incandescent billet of iron. Wright makes industrial technology feel sacred and closely held — a source of light and power guarded in the dark. It is the eighteenth century's portrait of the thing worth controlling.",
        "source": "Joseph Wright of Derby, An Iron Forge (1772), Tate Britain",
        "href": "https://www.tate.org.uk/art/artworks/wright-an-iron-forge-t06670",
        "image": {
          "src": "/covers/nvidia-halves-asia-chip-buyers--a4.png",
          "alt": "Joseph Wright of Derby's 1772 painting An Iron Forge: a family lit by a glowing white-hot iron bar in a dark forge.",
          "credit": "Joseph Wright of Derby, An Iron Forge (1772), Tate Britain. Public domain, via Wikimedia Commons / Google Art Project."
        }
      },
      {
        "category": "artistic",
        "title": "Bizet gave smuggling its swagger. In Act III of Carmen the contrabandistas thread the mountain passes by night, singing that fortune waits down below if only they take care not to make a single false step. It is the diverted-goods trade set to music — the thrill and the risk of running forbidden cargo past the guards. Nvidia's tightened vetting is precisely the cordon these smugglers sing about slipping; the chips are the cargo, the neutral ports the moonlit pass.",
        "excerpt": "Écoute, écoute, compagnon, écoute!\nLa fortune est là-bas, là-bas;\nMais prends garde, pendant la route,\nPrends garde de faire un faux pas!",
        "source": "Georges Bizet, Carmen (1875), Act III, 'Marche des contrebandiers'",
        "href": "https://imslp.org/wiki/Carmen_(Bizet,_Georges)"
      }
    ],
    "rank": 5
  },
  {
    "slug": "softbank-son-ai-5-trillion",
    "headline": "SoftBank's Masayoshi Son says the AI boom will require $5 trillion of investment a year by 2040 and dismisses bubble fears",
    "overview": "SoftBank Group founder Masayoshi Son told the company's annual conference in Tokyo that building out artificial intelligence will demand about $5 trillion (800 trillion yen) in investment every year by 2040, calling talk of an AI bubble 'absurd.' Son argued the spending would be sustainable if AI generates a fifth of global GDP by then, and predicted AI data centers would eventually need three terawatts of power—nearly twice today's total global electricity use. The remarks underline SoftBank's all-in wager on AI infrastructure even as investors question the scale of capital flooding into the sector.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiywFBVV95cUxPWkZUSElPZnM5N25jRGkzYnp1bGFGcHI0UkFPc3pQaFFfWnJneGdXMWdCRXNCT3F4N0tZYVVTLU9CUU4xVUg3LVF4aVJsQkNvenNiUURXQ0x4SDRmT1ZpZktxLU1VSmtRZUtmR0RuNVctTGFjandiM3pVTG9sVWdmRDBfMk13SjI4LU1XOEFhNnBHTG84RnVaMC1YQ3JwU3pSSVhDRHR3TEJaMXZJalpHWGJqQUI0RlZKZDN0N3BhdnhpbUxxSXNiVGN0Zw?oc=5"
      },
      {
        "name": "Nikkei Asia",
        "href": "https://asia.nikkei.com/business/softbank/softbank-s-son-says-ai-boom-will-require-5tn-in-annual-investment"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-14",
    "image": {
      "src": "/covers/softbank-son-ai-5-trillion.png",
      "alt": "A vast hall of illuminated server racks representing an artificial-intelligence data center.",
      "credit": "Masayoshi Son, SoftBank founder. Photo by Nobuyuki Hayashi (nobihaya), CC BY 2.0, via Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 14 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In 1720 London, investors hurled money at any venture wrapped in the promise of boundless future riches, none more infamous than a company floated 'for carrying on an undertaking of great advantage, but nobody to know what it is.' Its promoter took a fortune in a single morning and vanished across the Channel. When Masayoshi Son insists $5 trillion a year is not a bubble but the sober arithmetic of a golden AI future, he speaks in the same register of visionary certainty that once inflated the South Sea Company before it collapsed and ruined thousands. The line between prophet and promoter is only ever drawn in hindsight.",
        "excerpt": "Next morning, at nine o'clock, this great man opened an office in Cornhill. Crowds of people beset his door, and when he shut up at three o'clock, he found that no less than one thousand shares had been subscribed for, and the deposits paid. He was thus, in five hours, the winner of 2,000 l. ... He was never heard of again.",
        "source": "Charles Mackay, Memoirs of Extraordinary Popular Delusions and the Madness of Crowds (1841), 'The South-Sea Bubble'",
        "href": "https://www.econlib.org/book-chapters/chapter-ch-2-the-south-sea-bubble/"
      },
      {
        "category": "historical",
        "title": "A century earlier, Holland lost its head over flower bulbs, until a single rare tulip could fetch the price of a canal-side house and every rank of society was speculating on next spring's blooms. Son's claim that AI will one day generate a fifth of global GDP, and so justify any sum poured into it now, echoes the self-reinforcing logic every mania runs on: the price is rational because everyone believes it will keep climbing. Tulipmania is remembered not because tulips were worthless, but because the story people told about them outran anything they could deliver. Calling bubble fears 'absurd' is precisely what a market says at its peak.",
        "excerpt": "Nobles, citizens, farmers, mechanics, seamen, footmen, maidservants, even chimney-sweeps and old clotheswomen, dabbled in tulips.",
        "source": "Charles Mackay, Memoirs of Extraordinary Popular Delusions and the Madness of Crowds (1841), 'The Tulipomania'",
        "href": "https://www.econlib.org/book-chapters/chapter-ch-3-the-tulipomania/"
      },
      {
        "category": "literary",
        "title": "Humanity's first great capital project, in the Book of Genesis, was a tower 'whose top may reach unto heaven,' an infrastructure gamble meant to make its builders' name immortal. Son's vision of AI data centers drawing three terawatts, nearly twice the world's current electricity, is a literal bid to build toward the heavens on a planetary scale of power and ambition. Babel is the founding parable of collective hubris: the confidence that pooled resources and a single purpose can breach any ceiling. The story ends not in catastrophe but in confusion, as the builders lose the shared language that held the dream together.",
        "excerpt": "And they said, Go to, let us build us a city and a tower, whose top may reach unto heaven; and let us make us a name, lest we be scattered abroad upon the face of the whole earth.",
        "source": "The Bible, King James Version, Genesis 11:4",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Genesis"
      },
      {
        "category": "literary",
        "title": "Marlowe's Faustus signs away his soul for 'a world of profit and delight, of power, of honour, of omnipotence,' the scholar who craves not knowledge for its own sake but godlike command over the world. Son, who has staked SoftBank's fortunes on an all-in AI wager and speaks of artificial superintelligence as civilization's next engine, is the modern studious artisan reaching for that same omnipotence. The Faustian question is never whether the power is real; it is what must be mortgaged in advance to obtain it. A $5-trillion-a-year altar asks a great deal to be promised up front.",
        "excerpt": "O, what a world of profit and delight, / Of power, of honour, of omnipotence, / Is promis'd to the studious artizan! ... A sound magician is a mighty god: / Here, Faustus, tire thy brains to gain a deity.",
        "source": "Christopher Marlowe, The Tragical History of Doctor Faustus (c. 1604), Scene 1",
        "href": "https://www.gutenberg.org/files/779/779-h/779-h.htm"
      },
      {
        "category": "artistic",
        "title": "Pieter Bruegel the Elder's 1563 panel renders Babel as a colossal spiraling megastructure, half-built and already fracturing, dwarfing the tiny king who commissioned it. The painting captures the exact mood of a hubristic mega-build: awe at the scale, unease at the foundations. Set beside Son's three-terawatt data-center vision, Bruegel's tower is a warning rendered in oil; the grander the monument to human ambition, the more visible its structural strain. It remains the definitive image of a project reaching past its own limits.",
        "excerpt": "A spiraling brick colossus climbs into the clouds, its upper arches still wrapped in scaffolding while the lower storeys already list and crack. At its foot a king inspects the works as an entire city labors on a monument that will never be finished. Ambition and instability rise together, storey by storey.",
        "source": "Pieter Bruegel the Elder, The Tower of Babel (1563), Kunsthistorisches Museum, Vienna",
        "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_the_Elder_-_The_Tower_of_Babel_(Vienna)_-_Google_Art_Project_-_edited.jpg",
        "image": {
          "src": "/covers/softbank-son-ai-5-trillion--a4.png",
          "alt": "Pieter Bruegel the Elder's 1563 painting of the Tower of Babel, a vast unfinished spiral tower rising into the clouds",
          "credit": "Pieter Bruegel the Elder, The Tower of Babel (1563), Kunsthistorisches Museum, Vienna. Public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "William Hogarth's 1721 print skewers the South Sea Bubble as a grotesque carnival: crowds ride a giddy merry-go-round of speculation while Honesty is broken on the wheel and Fortune's flesh is hacked away for the mob to fight over. Often called the first editorial cartoon, it turns a financial mania into moral spectacle. It is the ideal visual foil to any era's promise of effortless riches, a reminder that manias look like festivals right up until they don't. Hogarth drew what euphoria conceals.",
        "excerpt": "At the center a wooden machine whirls dizzy speculators in circles while a mob scrambles for shares. Off to one side Honesty is broken on the wheel and Self-Interest flays the body of Fortune, whose scattered flesh the crowd scrabbles over. Hogarth stages the boom as a fairground of folly bound for ruin.",
        "source": "William Hogarth, The South Sea Scheme (Emblematical Print on the South Sea Scheme), 1721",
        "href": "https://www.metmuseum.org/art/collection/search/396205",
        "image": {
          "src": "/covers/softbank-son-ai-5-trillion--a5.png",
          "alt": "William Hogarth's 1721 satirical print The South Sea Scheme, showing crowds on a speculative merry-go-round amid figures of Honesty and Fortune being tortured",
          "credit": "William Hogarth, The South Sea Scheme (1721). Public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 6
  },
  {
    "slug": "south-korea-bok-rate-hike",
    "headline": "South Korea's central bank is expected to raise interest rates on 16 July, its first hike in more than three years",
    "overview": "The Bank of Korea is expected to lift its benchmark seven-day repo rate by a quarter-point to 2.75% on 16 July, which would be its first increase since January 2023, as consumer inflation running near 3.1% and oil prices lifted by Middle East tensions push policymakers to tighten, a Reuters poll of economists found. The move would set South Korea against a broader global drift toward rate cuts, with markets pricing in a further rise to 3.00% by year-end. Analysts said the won's weakness and stubborn price pressures left the bank little room to wait.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMixgFBVV95cUxOcVllY0FCSXYtWEhqWHNXUFhEbXVaQVRfTXVCQzF5enF5U0dZaWlZS2RyMjJ1dFhjaXRUVHdNc3lHeWpMNTlPX283TXRGZmdENlZIaURIMWk4Q0NwV09rOGt1Q09PS3BUOXVIX1lwWXVkaThGLWpvOVhPOERiUDFsWW9lbElRMDdNVVZlZHNhTHptUGFKMU5QOUIwREtXQ2xBaG0zWkcyRU5TSmUyZHNjVEc2d3o1S1E1NEkzTFBsSExTTFIwWlE?oc=5"
      },
      {
        "name": "KED Global",
        "href": "https://www.kedglobal.com/bok/newsView/ked202607130001"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-14",
    "image": {
      "src": "/covers/south-korea-bok-rate-hike.png",
      "alt": "The headquarters of the Bank of Korea in central Seoul.",
      "credit": "Bank of Korea head office, Seoul. Photo by 우한길 (HK Woo), via Wikimedia Commons, CC BY 3.0."
    },
    "edition": "Afternoon Edition · 14 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "When the Bank of Korea lifts its benchmark rate to 2.75% on 16 July, it revives the hardest lesson a central banker ever learns: that only pain reliably kills inflation. Paul Volcker learned it the brutal way after 1979, driving the U.S. federal funds rate toward 19–20% to break a decade of runaway prices. Mortgages became unaffordable, unemployment climbed toward 10.8%, and Volcker needed bodyguards as farmers blockaded the Fed. Yet inflation that had topped 14% collapsed to near 3%, and the credibility he bought defined a generation of policy. Governor Rhee's quarter-point is a whisper beside Volcker's roar, but the logic is identical: raise the cost of money now, or pay far more later.",
        "excerpt": "On 6 October 1979 Volcker's Fed shifted to constraining bank reserves and let interest rates rise to record highs near 20%. The move triggered a severe recession and double-digit unemployment, but inflation fell from about 11.6% in early 1980 to under 4% by 1983 — and the Fed's hard-won credibility anchored the decades that followed.",
        "source": "Federal Reserve History — 'Volcker's Announcement of Anti-Inflation Measures' (Great Inflation, October 1979)",
        "href": "https://www.federalreservehistory.org/essays/anti-inflation-measures"
      },
      {
        "category": "historical",
        "title": "South Korea confronts oil-driven prices with the disciplined tool of dearer money; the Emperor Diocletian, facing an empire whose debased silver coinage had ignited runaway inflation around 301 AD, reached instead for the opposite and cruder lever — a decree freezing prices by force. His Edict on Maximum Prices set ceilings on a thousand goods and threatened death for overcharging. Merchants simply withdrew their wares, black markets bloomed, and, as the Christian writer Lactantius recorded, blood was spilled over trifles until the law collapsed. It is the enduring counter-example the Bank of Korea implicitly honours: you cannot command prices down, you can only make money scarce and let markets cool. Sound coin, not coercion, is the guardian's real instrument.",
        "excerpt": "\"He also, when by various extortions he had made all things exceedingly dear, attempted by an ordinance to limit their prices. Then much blood was shed for the veriest trifles; men were afraid to expose anything to sale, and the scarcity became more excessive and grievous than ever, until, in the end, the ordinance, after having proved destructive to multitudes, was from mere necessity abrogated.\"",
        "source": "Lactantius, 'Of the Manner in Which the Persecutors Died' (De Mortibus Persecutorum), ch. 7",
        "href": "https://www.newadvent.org/fathers/0705.htm"
      },
      {
        "category": "literary",
        "title": "Interest is the price of borrowed money, and the moral heat around it is as old as lending itself — never fiercer than in Shakespeare's Rialto, where the merchant Antonio despises Shylock for charging usury even as he comes to borrow. Shylock's reply lays bare the ancient argument the Bank of Korea now settles with a policy rate: money has a cost, and to lend it is to demand a return. When the BOK nudges its benchmark to 2.75%, it is officially raising the price Koreans pay 'for use of that which is mine own.' The play dramatises the resentment that dearer money always breeds — the borrower who scorns the lender until he needs him. It is a reminder that every rate decision is also a judgement about who bears the cost of scarce capital.",
        "excerpt": "\"Signior Antonio, many a time and oft / In the Rialto you have rated me / About my moneys and my usances. / Still have I borne it with a patient shrug, / (For suff'rance is the badge of all our tribe.) / You call me misbeliever, cut-throat dog, / And spet upon my Jewish gaberdine, / And all for use of that which is mine own.\"",
        "source": "William Shakespeare, 'The Merchant of Venice', Act 1, Scene 3 (Shylock)",
        "href": "https://www.gutenberg.org/ebooks/1515"
      },
      {
        "category": "literary",
        "title": "Behind every rate hike is a homely truth that Benjamin Franklin spent a career preaching: cheap credit is a seduction, and debt quietly mortgages your freedom. In 'The Way to Wealth', his character Father Abraham warns a crowd tempted by six months' easy credit that borrowing hands another person power over your liberty. That is precisely the discipline the Bank of Korea seeks to restore after years of low rates fed household borrowing — by making money dearer, it forces the thrift Franklin prized. Korea carries some of the world's heaviest household debt, and a 2.75% rate is the stern reminder that the empty bag cannot stand upright. Poor Richard would have recognised the medicine, and swallowed it.",
        "excerpt": "\"But, ah! think what you do when you run in debt; you give to another power over your liberty, If you cannot pay at the time, you will be ashamed to see your creditor; you will be in fear when you speak to him; you will make poor pitiful sneaking excuses, and, by degrees, come to lose your veracity, and sink into base, downright lying.\"",
        "source": "Benjamin Franklin, 'The Way to Wealth' (Poor Richard Improved, 1758)",
        "href": "https://www.gutenberg.org/files/43855/43855-h/43855-h.htm"
      },
      {
        "category": "artistic",
        "title": "Long before central banks, the guardianship of money's value was a scale, a coin, and a careful human eye — nowhere more vividly than in Quentin Matsys's 1514 masterpiece in the Louvre. A money-changer weighs gold coins on delicate scales while his wife, distracted from her prayer book, watches the glinting metal. The painting captures the exact anxiety the Bank of Korea now institutionalises: is this money worth what it claims to be? Every weighed coin is a private act of anti-inflation vigilance, testing for the clipped and debased currency that erodes trust. Raising rates is the modern equivalent of Matsys's scales — a public insistence that the won hold its weight.",
        "excerpt": "A money-changer bends over his balance, weighing gold and pearls with total absorption, while his richly dressed wife lets her illuminated prayer book fall open, her gaze pulled from the sacred page to the shining coins. In the convex mirror on the table a tiny figure reads by a window — a whole world reflected around the act of valuing money. The scene is a quiet sermon on the seductive weight of gold and the eternal task of testing what money is truly worth.",
        "source": "Quentin Matsys, 'The Moneylender and His Wife' (Le prêteur et sa femme), 1514, oil on panel, Musée du Louvre, Paris",
        "href": "https://commons.wikimedia.org/wiki/File:Le_pr%C3%AAteur_et_sa_femme_-_Quentin_Metsys_-_Mus%C3%A9e_du_Louvre_Peintures_INV_1444_%3B_MR_821.jpg",
        "image": {
          "src": "/covers/south-korea-bok-rate-hike--a4.png",
          "alt": "A 16th-century money-changer weighing gold coins on a balance while his wife looks up from her prayer book",
          "credit": "Quentin Matsys, 'The Moneylender and His Wife' (1514), Musée du Louvre. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Wagner's 'Das Rheingold' opens the entire Ring cycle with a parable about the price of money: the dwarf Alberich renounces love itself to seize the Rhinegold and forge a ring of limitless power. From that theft flows a curse that poisons gods and mortals alike — wealth hoarded and debased corrupts everything it touches. The Bank of Korea's stern quarter-point is the sober answer to Alberich's fantasy that money can be conjured without cost. Inflation is the modern curse of debased gold, and tightening is the guardian's grim refusal of the free lunch. Wagner's shimmering, sinister score is the sound of value being stolen; a rate hike is the discipline that guards it.",
        "excerpt": "In the depths of the Rhine, the gold lies guarded and pure until Alberich, spurned and mocked, forswears love forever to tear it from the water and forge the ring of dominion. The music darkens as innocent wealth becomes an instrument of greed, and a curse settles on all who covet it. It is the oldest warning set to sound: gold seized without cost brings ruin, not power.",
        "source": "Richard Wagner, 'Das Rheingold', WWV 86A (1854; premiered 1869) — full score, IMSLP",
        "href": "https://imslp.org/wiki/Das_Rheingold,_WWV_86A_(Wagner,_Richard)"
      }
    ],
    "rank": 7
  },
  {
    "slug": "samsung-us-adr-listing",
    "headline": "Bloomberg reports Samsung Electronics is exploring a U.S. share listing via ADRs; the company denies it",
    "overview": "Samsung Electronics is in early-stage talks with banks about issuing American depositary receipts that would give U.S. investors easier access to its shares, Bloomberg News reported, though Samsung publicly denied it was reviewing such a plan. The report said interest was revived by the blockbuster Nasdaq debut of rival SK Hynix, whose ADRs priced at $149 to raise about $26.5 billion, and by pressure from institutional shareholders. Any listing remains uncertain and could still be abandoned, according to the report.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiwgFBVV95cUxOV2pYUFhWMjF0QmZ5eXl3NFJ6X2lNSUdqX2FkcWszRjRweGNpUlVWekNPTVExNWRjSk9ua1VOS1pOdktMTnRlUDNILTZIamdaWGlpOXF1cnN1Y0FVb2F1S3hFb2Z3S3pXODhTQ1RHaUdyZWpHQTJjYm0yWVRYZEF1NllXUk1wX2xldXlrVFhDUzhTZnV0S1AxQnNjVlM5ZkEyQmNfSEhMQjJWZ3lHai1iTE1NZU5LZTh5cnZteHBTa3U5Zw?oc=5"
      },
      {
        "name": "Korea JoongAng Daily",
        "href": "https://www.koreajoongangdaily.com/business/samsung-explores-potential-us-adr-listing-bloomberg-news-reports/12773649"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-14",
    "image": {
      "src": "/covers/samsung-us-adr-listing.png",
      "alt": "A Samsung sign on the exterior of a corporate building.",
      "credit": "The New York Stock Exchange seen from Federal Hall. Photo by Wikimedia Commons user Andy C, CC BY-SA 3.0."
    },
    "edition": "Afternoon Edition · 14 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In 1602 the young Dutch Republic did what Samsung is rumored to be weighing: it opened a company to a wider pool of outside capital and, in doing so, invented the modern share market. The States-General fused competing merchant ventures into the United East India Company (VOC) and let ordinary inhabitants subscribe capital and trade their stakes on the Amsterdam Beurs. It was the first time a firm reached past its founders to the broad investing public for money. A Korean chip giant courting U.S. ADR buyers is chasing the same thing four centuries later: deeper, more liquid pools of foreign capital.",
        "excerpt": "held, driven and increased under a fixed and certain unity, order, and police, for all the inhabitants of the united Lands who wished to participate",
        "source": "Charter (Octrooi) of the Dutch East India Company (VOC), 20 March 1602 — English translation",
        "href": "https://en.wikisource.org/wiki/Translation:VOC_charter"
      },
      {
        "category": "historical",
        "title": "When a nation or firm needs money at a scale its home market cannot supply, it travels to the era's dominant financial capital, hat in hand. In 1824 the fledgling Greek revolutionary government floated its bonds not in Athens but on the London Stock Exchange, riding a wave of investor enthusiasm for exotic new issues. London then was what New York is now: the deepest well of capital and the ultimate stamp of financial legitimacy. Samsung's reported flirtation with a U.S. ADR listing follows the same logic that once carried Greek loans, and countless sovereign flotations after them, to the world's leading exchange.",
        "excerpt": "To fund its war of independence, the provisional Greek government sent agents to London and, in February 1824, floated an £800,000 loan on the exchange there rather than raise it at home. Investors, chasing yield and romance, snapped it up before the young state had proven it could survive. Going abroad for capital brought prestige and cash, but it also bound Greece to the judgments of distant financiers.",
        "source": "George Finlay, History of the Greek Revolution (Edinburgh, 1861), vol. II",
        "href": "https://archive.org/details/historyofgreekre02finluoft"
      },
      {
        "category": "literary",
        "title": "Shakespeare gave us the perfect shorthand for a denial that draws attention to the very thing it denies. Watching the Player Queen swear undying fidelity, Hamlet's mother judges the vow overdone and suspect. The louder the insistence, the less anyone believes it. When Samsung flatly denies reviewing a U.S. listing even as Bloomberg reports early talks with banks, the market hears an echo of Gertrude: the emphatic 'no' becomes its own kind of tell.",
        "excerpt": "QUEEN: The lady protests too much, methinks.\nHAMLET: O, but she'll keep her word.",
        "source": "William Shakespeare, Hamlet, Act III, Scene 2",
        "href": "https://www.gutenberg.org/files/1524/1524-h/1524-h.htm"
      },
      {
        "category": "literary",
        "title": "Aesop's frog sees a rival's triumph and cannot bear to be smaller. Told the ox is enormous, the frog puffs itself up, and up, and up, straining to match a peer's bulk until it bursts. The fable is about the danger of measuring yourself against a dazzling competitor. Samsung's revived listing chatter was lit by rival SK Hynix's blockbuster Nasdaq debut, and the story is a warning about ambition driven by a neighbor's success rather than one's own plan.",
        "excerpt": "So the Frog took a deep breath, and blew and blew and blew, and swelled and swelled and swelled. And then he said: \"I'm sure the Ox is not as big as ——\" But at this moment he burst. Moral: Self-conceit may lead to self-destruction.",
        "source": "Aesop, 'The Frog and the Ox,' The Fables of Æsop (Joseph Jacobs, 1894)",
        "href": "https://en.wikisource.org/wiki/The_Fables_of_%C3%86sop_(Jacobs)/The_Frog_and_the_Ox"
      },
      {
        "category": "artistic",
        "title": "Emanuel de Witte painted the beating heart of the world's first stock market: the arcaded courtyard of the Amsterdam Beurs, thronged with merchants striking deals in the light. This was the physical stage on which VOC shares changed hands and the very idea of a public equity market took shape. It is the ancestor of every trading floor Samsung's bankers now eye across the Atlantic. The canvas makes visible what an ADR listing really means: joining the crowd inside the exchange where capital gathers.",
        "excerpt": "De Witte's 1653 canvas floods a Renaissance courtyard with light, its colonnades filled with brokers, buyers and idlers. Amid the bustle a market is being made, share by whispered share. It is a portrait of the exchange as a living organism, the same creature Samsung would be joining were the New York rumors to prove true.",
        "source": "Emanuel de Witte, 'The Courtyard of the Beurs in Amsterdam' (1653), Museum Boijmans Van Beuningen, Rotterdam",
        "href": "https://commons.wikimedia.org/wiki/File:Emanuel_de_Witte_-_De_binnenplaats_van_de_beurs_te_Amsterdam.jpg",
        "image": {
          "src": "/covers/samsung-us-adr-listing--a4.png",
          "alt": "Sunlit arcaded courtyard of the Amsterdam Beurs filled with merchants, by Emanuel de Witte, 1653.",
          "credit": "Emanuel de Witte, 'The Courtyard of the Beurs in Amsterdam' (1653), Museum Boijmans Van Beuningen. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Artemisia Gentileschi painted Fame as a winged woman lifting her trumpet, the classical personification of Fama, or Rumour, whose blast carries a story across the world whether or not it is true. That is exactly the force Samsung is fighting: a Bloomberg report, amplified and half-believed, that no official denial can fully call back once the trumpet has sounded. Gentileschi's allegory captures the tension at the center of this event, the gap between what is loudly reported and what is quietly true. Fame flies faster than any corporate press statement.",
        "excerpt": "Gentileschi's Fame raises her trumpet in a swirl of drapery, radiant and unstoppable. She is Rumour made flesh, the ancient goddess who spreads word of a thing before anyone can confirm it. Once she sounds her note, denial arrives too late to silence the echo.",
        "source": "Artemisia Gentileschi, 'Allegory of Fame' (c. 1630–1635)",
        "href": "https://commons.wikimedia.org/wiki/File:Allegory_of_Fame_by_Artemisia_Gentileschi_ca._1630-1635.jpg",
        "image": {
          "src": "/covers/samsung-us-adr-listing--a5.png",
          "alt": "Allegorical winged female figure raising a trumpet, personifying Fame and Rumour, by Artemisia Gentileschi.",
          "credit": "Artemisia Gentileschi, 'Allegory of Fame' (c. 1630–1635). Public domain via Wikimedia Commons."
        }
      }
    ],
    "rank": 8
  },
  {
    "slug": "chipotle-opens-mexico",
    "headline": "Chipotle opens its first restaurant in Mexico, in Nuevo Leon, testing its burritos in the cuisine's home country",
    "overview": "Chipotle Mexican Grill opened its first location in Mexico this week, in San Pedro Garza Garcia in the northern state of Nuevo Leon, bringing its customizable burritos, bowls and tacos to the country whose cuisine inspired the chain. The opening, run with local operator Alsea, is a 'proof of concept' the company says it will extend across Nuevo Leon and into Mexico City by 2027. The move drew mockery online—one commenter called it 'selling Mexico a corporate version of Mexico'—and follows failed forays by other U.S. chains such as Taco Bell, which no longer operates in the country.",
    "genre": "Economy",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c0ryr89gp09o"
      },
      {
        "name": "CNBC",
        "href": "https://www.cnbc.com/2026/07/13/chipotle-opening-first-restaurant-in-mexico.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-14",
    "image": {
      "src": "/covers/chipotle-opens-mexico.png",
      "alt": "The storefront of a Chipotle Mexican Grill restaurant with its logo above the entrance.",
      "credit": "Photo by Flickr user 'tacvbo', CC BY-SA 2.0, via Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 14 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "When the Spanish were led through the great Aztec market of Tlatelolco in 1519, they were stunned by the abundance: cacao, turkeys, chiles, maize and countless herbs — the native larder that would soon cross the Atlantic and rebuild the world's kitchens. These were the foods that made Mexican cuisine the ancestor of the global 'Mexican' menu. Nearly five centuries later, a U.S. chain carries a corporate, Americanized descendant of that pantry back to Nuevo Leon. It is coals to Newcastle: selling Mexico a burrito bowl assembled from Mexico's own ingredients.",
        "excerpt": "The moment we arrived in this immense market, we were perfectly astonished at the vast numbers of people, the profusion of merchandise which was there exposed for sale, and at the good police and order that reigned throughout. […] In another place were sold beans and sage, with other herbs and vegetables. A particular market was assigned for the merchants in fowls, turkeys, ducks, rabbits, hares, deer, and dogs; also for fruit-sellers, pastry-cooks, and tripe-sellers.",
        "source": "Bernal Díaz del Castillo, The Memoirs of the Conquistador Bernal Diaz del Castillo, Written by Himself, Vol. 1 (completed 1568) — on the great market of Tlatelolco",
        "href": "https://www.gutenberg.org/ebooks/32474"
      },
      {
        "category": "historical",
        "title": "Under the Raj, Britain shipped raw Indian cotton to the mills of Manchester, spun and wove it by steam, then sold the finished cloth back to the country that grew the fibre — a homeland made to buy its own material, marked up and rebranded as English. Gandhi's swadeshi answer was to reclaim the spinning wheel and make khadi at home. Chipotle's burrito is the culinary echo: Mexican staples processed into an American format and retailed to Mexicans. It is the old colonial trick of selling a place a reworked version of what it already possessed.",
        "excerpt": "It may be considered a heresy, but I am bound to say that it were better for us to send money to Manchester and to use flimsy Manchester cloth than to multiply mills in India.",
        "source": "M. K. Gandhi, Hind Swaraj or Indian Home Rule (1909), Chapter XIX, 'Machinery'",
        "href": "https://en.wikisource.org/wiki/Hind_Swaraj_(1938_edition)"
      },
      {
        "category": "literary",
        "title": "In Aesop's fable a plain jackdaw dresses himself in cast-off peacock feathers and struts into the peacocks' garden to pass as one of them — only to be recognized, stripped of the borrowed plumes, and then shunned by his own kind as well. It is the ancient parable of the imitation confronting the original: a copy in borrowed finery, exposed the instant it stands beside the source. Chipotle, decked in the plumage of Mexican cuisine and opening its doors inside Mexico, is the jackdaw walking straight into the peacocks' garden. The birds know their own feathers when they see them.",
        "excerpt": "So he picked up some castoff feathers of the Peacocks and stuck them among his own black plumes. […] Then he flew down into the garden among the Peacocks. But they soon saw who he was. Angry at the cheat, they flew at him, plucking away the borrowed feathers and also some of his own. […] Borrowed feathers do not make fine birds.",
        "source": "Aesop, 'The Vain Jackdaw and His Borrowed Feathers,' The Æsop for Children (1919)",
        "href": "https://read.gov/aesop/073.html"
      },
      {
        "category": "literary",
        "title": "Wilde's Lord Darlington defines a cynic as a man who knows the price of everything and the value of nothing — a line tailor-made for a fast-casual chain that can quote a burrito bowl to the cent yet is mocked for selling Mexico 'a corporate version of Mexico.' The gag is authenticity turned into a commodity: heritage priced, portioned, standardized and franchised. A cuisine's meaning is one thing; its menu price is another. Chipotle's Nuevo Leon gambit is a wager that the market price can stand in for the value.",
        "excerpt": "CECIL GRAHAM. What is a cynic? LORD DARLINGTON. A man who knows the price of everything and the value of nothing.",
        "source": "Oscar Wilde, Lady Windermere's Fan (1893), Act III",
        "href": "https://www.gutenberg.org/ebooks/790"
      },
      {
        "category": "artistic",
        "title": "On this page of the Codex Mendoza — an Aztec pictorial manuscript made for Spanish administrators around 1541 — scribes tallied the tribute owed to the empire: green-and-red quetzal-feather headdresses, two spread jaguar pelts, and squat golden bins beside which a Spanish hand has written 'ciento cargas de cacao,' a hundred loads of cacao. It is a native inventory of the very goods — cacao above all, the seed of the world's chocolate — that would soon sail to Europe and conquer the global palate. The manuscript is the origin ledger of Mexican foodways. Chipotle's franchised bowl in Nuevo Leon is the far-flung, corporate return of that pantry to the homeland that first catalogued it.",
        "excerpt": "Rows of feather panaches and two spread jaguar skins hover above squat golden bins, and beside them a Spanish gloss reads 'ciento cargas de cacao.' Cacao beans — at once the money and the ceremonial drink of the Aztecs — are logged here as imperial tribute, centuries before any of it left Mexico to become the world's chocolate. The page is a native accounting of the ingredients a modern chain now sells back across the same border.",
        "source": "Codex Mendoza, folio 47r (c. 1541), Bodleian Library, Oxford (MS. Arch. Selden. A. 1)",
        "href": "https://commons.wikimedia.org/wiki/File:Codex_Mendoza_folio_47r.jpg",
        "image": {
          "src": "/covers/chipotle-opens-mexico--a4.png",
          "alt": "Folio 47r of the Codex Mendoza showing Aztec tribute goods: green and red feather headdresses, two spread jaguar skins, and golden bins, with a Spanish note reading 'ciento cargas de cacao' (a hundred loads of cacao).",
          "credit": "Codex Mendoza, c. 1541, Bodleian Library, Oxford (public domain), via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "In 1932 the American composer Aaron Copland visited a rowdy Mexico City dance hall called El Salón México, copied tunes out of published folk anthologies, and spun them into a glittering, syncopated orchestral crowd-pleaser — a stylized, exportable 'Mexico' for concert audiences. Tellingly, its 1937 premiere was given in Mexico City itself: an outsider's polished repackaging of Mexican music, played back to Mexicans. Critics have argued ever since over whether it captures Mexico or only a tourist's postcard of it. Chipotle, plotting its own Mexico City debut by 2027, follows the very same score — a foreign gloss on a native source, brought home for sale.",
        "excerpt": "Copland stitched borrowed dance-hall melodies into a brassy, cosmopolitan showpiece — Mexican raw material recast in an American idiom and, pointedly, premiered in Mexico City in 1937. Ever since, listeners have debated whether it renders Mexico or merely a visitor's glossy impression of it, the same charge now leveled at a burrito chain crossing the border. It is an imported version of a culture performed back to the culture that inspired it.",
        "source": "Aaron Copland, El Salón México (1932–36), premiered Mexico City, 27 Aug 1937, Orquesta Sinfónica de México cond. Carlos Chávez",
        "href": "https://www.aaroncopland.com/works/el-salon-mexico/"
      }
    ],
    "rank": 9
  },
  {
    "slug": "eu-bans-sudan-gold",
    "headline": "The EU bans imports of Sudanese gold to choke off financing for the RSF and army in Sudan's civil war",
    "overview": "European Union foreign ministers approved a ban on the purchase, import and transfer of gold from Sudan, together with a ban on exporting mercury and cyanide used in gold mining, saying the trade has become a key source of revenue sustaining a civil war that has raged since April 2023. Sudan is one of Africa's largest gold producers; UN experts estimate more than half its gold is smuggled out—much of it via Egypt, Chad and Libya to Dubai—by the Rapid Support Forces and the army, which control rival goldfields. The EU said the measures aim to 'reduce the resources' available to those perpetuating a conflict that has displaced more than 14 million people.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/ce3e3nqwr5do"
      },
      {
        "name": "Bloomberg",
        "href": "https://www.bloomberg.com/news/articles/2026-07-13/eu-to-sanction-sudan-s-gold-trade-as-civil-war-rages"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-14",
    "image": {
      "src": "/covers/eu-bans-sudan-gold.png",
      "alt": "Stacked bars of refined gold bullion.",
      "credit": "Stacked gold bullion bars. Photo by Stevebidmead (via Pixabay), released under CC0 1.0 Universal Public Domain Dedication, via Wikimedia Commons (File:Gold_bullion_bars.jpg)."
    },
    "edition": "Afternoon Edition · 14 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "When the EU bars Sudanese gold, it is fighting the oldest engine of conquest: the belief that whoever holds the gold can do anything. Five centuries earlier, Christopher Columbus, stranded on his fourth voyage, wrote to the Spanish crown that gold was not merely wealth but a passport to power and even to heaven. That creed sent conquistadors to melt Inca and Aztec treasure into ingots and drove the plunder of two continents. In Sudan the same logic runs in reverse: the RSF and the army seize rival goldfields precisely because gold buys the guns that keep the war alive.",
        "excerpt": "Gold is most excellent. Gold constitutes treasure, and he who possesses it may do what he will in the world, and may so attain as to bring souls to Paradise.",
        "source": "Christopher Columbus, Letter from the Fourth Voyage (written from Jamaica, 7 July 1503)",
        "href": "https://earlyamericas.wordpress.com/anthology/columbus-letter-from-the-fourth-voyage/"
      },
      {
        "category": "historical",
        "title": "The EU's gold ban is modeled almost exactly on the fight against 'blood diamonds.' In the 1990s, rebel armies in Sierra Leone, Angola and Liberia funded their wars by seizing diamond fields and smuggling the stones onto world markets, so governments built the Kimberley Process to certify diamonds as conflict-free and choke the money at the source. Swap diamonds for gold, and Sierra Leone for Sudan, and the mechanism is identical: cut off the mineral revenue that pays the fighters. Brussels is applying a hard-won lesson about resources that finance slaughter.",
        "excerpt": "Conflict diamonds are defined as 'rough diamonds used by rebel movements or their allies to finance conflict aimed at undermining legitimate governments' (UN Security Council resolution 1459). The Kimberley Process, launched in 2003, is 'a coalition of governments, civil society and the diamond industry to eliminate the trade in so-called conflict diamonds.'",
        "source": "European Commission (Service for Foreign Policy Instruments), 'The Kimberley Process, the fight against conflict diamonds'",
        "href": "https://fpi.ec.europa.eu/what-we-do/kimberley-process-fight-against-conflict-diamonds_en"
      },
      {
        "category": "literary",
        "title": "Two thousand years ago Virgil gave the accursed hunger for gold its immortal name. In the Aeneid, the ghost of murdered Polydorus tells how he was slain for the gold he guarded, and the poet cries out against the greed that drives men to any crime. His phrase 'auri sacra fames' — the accursed lust for gold — is the exact indictment behind the EU's ban. Sudan's war, in which more than half the gold is smuggled out to Dubai to buy weapons, is that ancient hunger armed with modern rifles.",
        "excerpt": "quid non mortalia pectora cogis, auri sacra fames!",
        "source": "Virgil, Aeneid, Book III, lines 56–57 (Latin)",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.02.0055%3Abook%3D3%3Acard%3D49"
      },
      {
        "category": "literary",
        "title": "Chaucer's Pardoner tells a parable of gold that kills those who grasp it. Three drunkards go hunting for Death and instead find a hoard of gold florins beneath a tree; delighted, they promptly murder one another to keep it all. The Pardoner's motto — radix malorum est cupiditas, greed is the root of all evils — is the moral spine of the tale. It reads like a fable of Sudan's warlords, who fight over goldfields that fund a war displacing millions, the treasure and the killing inseparable.",
        "excerpt": "And everich of thise riotoures ran / Til he cam to that tree, and ther they founde / Of floryns fyne of gold ycoyned rounde / Wel ny an eighte busshels, as hem thoughte. / No lenger thanne after Deeth they soughte, / But ech of hem so glad was of that sighte, / For that the floryns been so faire and brighte, / That doun they sette hem by this precious hoord.",
        "source": "Geoffrey Chaucer, 'The Pardoner's Tale,' The Canterbury Tales, lines 768–775 (Middle English)",
        "href": "https://chaucer.fas.harvard.edu/pages/pardoners-prologue-introduction-and-tale"
      },
      {
        "category": "artistic",
        "title": "George Frederic Watts painted greed as a god. His 'Mammon' shows the demon of money as a bloated idol enthroned on gold, one careless hand pressing down on the head of a crushed human figure, deaf to the suffering beneath him. Watts meant it as a scornful dedication to Mammon's worshippers — the people who lay human lives at the feet of wealth. It is a portrait of exactly what the EU is trying to interrupt: a trade in Sudanese gold in which the metal is enthroned and the 14 million displaced are the bodies underfoot.",
        "excerpt": "A brutal, crowned idol sits rigid on a golden throne, a bag of coin at his side, while his heavy hands rest without pity on the bowed heads of two pale human victims. Watts strips wealth of all glamour, painting Mammon as a stupid, merciless god served by the ruin of the weak.",
        "source": "George Frederic Watts, Mammon: Dedicated to his Worshippers (1884–85), oil on canvas, Tate Britain, London",
        "href": "https://commons.wikimedia.org/wiki/File:Watts_%E2%80%93_Mammon.jpg",
        "image": {
          "src": "/covers/eu-bans-sudan-gold--a4.png",
          "alt": "George Frederic Watts's painting 'Mammon', a crowned idol enthroned on gold resting his hands on the heads of two crushed human figures.",
          "credit": "George Frederic Watts, Mammon: Dedicated to his Worshippers (1884–85), Tate Britain. Public domain (artist died 1904) via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Grieg's 'In the Hall of the Mountain King' is the sound of greed closing in. In Ibsen's play, the chancer Peer Gynt — who later grows rich through slaving and crooked trade before losing it all — blunders into the troll king's cavern, where the creatures swarm to claim him and everything he has. Grieg builds the scene from a sly, creeping tune into a stamping, accelerating frenzy, a whole hall grasping at once. It is the perfect score for Sudan's rival forces massing over the goldfields, each faction lunging for a hoard that funds the slaughter.",
        "excerpt": "A low, stealthy theme creeps in the bassoons and cellos, then repeats faster and louder, pizzicato feet stamping, until the whole orchestra is a stampede of trolls clawing toward their prize. Grieg turns the pursuit of treasure into pure, accelerating menace that ends in a crash.",
        "source": "Edvard Grieg, 'In the Hall of the Mountain King' (Dovregubbens hall), from the incidental music to Peer Gynt, Op.23 (1875)",
        "href": "https://imslp.org/wiki/Peer_Gynt,_Op.23_(Grieg,_Edvard)"
      }
    ],
    "rank": 10
  },
  {
    "slug": "fontainebleau-forest-fire-arson",
    "headline": "Wildfire in France's Fontainebleau forest near Paris burns more than 1,900 hectares as police probe suspected arson",
    "overview": "A wildfire in the Fontainebleau forest about 60 km southeast of Paris has scorched more than 1,900 hectares (4,700 acres) and forced roughly 1,000 people to evacuate, with authorities deploying four Canadair water-bombers in an unprecedented mobilization for the greater Paris region. Interior Minister Laurent Nunez said around ten separate ignition points pointed to a deliberately set fire, and police detained two suspects, including an 18-year-old found with a lighter and soot on his hands. The blaze, in a former royal hunting estate, is part of a wave of fires across France and Spain during an intense summer heat.",
    "genre": "Climate",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/search?q=site:reuters.com+fontainebleau+fire+when:1d&hl=en-US&gl=US&ceid=US:en"
      },
      {
        "name": "France 24",
        "href": "https://www.france24.com/en/france/20260714-more-than-1-900-hectares-fontainebleau-forest-near-paris-destroyed-by-wildfires"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-14",
    "image": {
      "src": "/covers/fontainebleau-forest-fire-arson.png",
      "alt": "A firefighting aircraft drops water over a forest fire sending up a plume of smoke.",
      "credit": "Kari Greer / U.S. Forest Service (USDA). Public domain (work of the U.S. federal government), via Wikimedia Commons. Canadair CL-415 water-bomber dropping water on the Pioneer Fire, Boise National Forest, 2016 — the same amphibious type of aircraft (four of which were deployed over Fontainebleau)."
    },
    "edition": "Afternoon Edition · 14 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "When Fontainebleau's canopy went up in ten separate columns of smoke and the Interior Minister spoke of a deliberate hand, he was reaching for the oldest suspicion in the Western record: that a great fire is not always an accident. In July 64 AD Rome burned for days through the crowded quarters below the Palatine, and Tacitus reports that firefighters were menaced and firebrands openly thrown, so that many refused to believe the disaster was mere misfortune. The rumour hardened into an accusation against Nero himself, and to deflect it he found scapegoats to punish. Nineteen centuries later, an 18-year-old carrying a lighter is detained beside a former royal forest — the same ancient story of the incendiary hand and the search for who lit the match.",
        "excerpt": "But all human efforts, all the lavish gifts of the emperor, and the propitiations of the gods, did not banish the sinister belief that the conflagration was the result of an order.",
        "source": "Tacitus, Annals, Book XV (trans. Church & Brodribb)",
        "href": "https://en.wikisource.org/wiki/The_Annals_(Tacitus)/Book_15"
      },
      {
        "category": "historical",
        "title": "The Fontainebleau that burned in 2026 is beloved precisely because artists once fought to save it from a slower destruction. In the 1830s–50s the forest administration was clear-cutting ancient oaks and planting monotonous softwood, and the Barbizon painters — led by Théodore Rousseau, who petitioned Napoleon III's minister de Morny — militated to protect the woodland they painted. Their campaign produced the imperial decree of 13 April 1861 that set aside a 'réserve artistique,' widely called the first nature reserve on earth, protected by law eleven years before Yellowstone. That a fire now devours the very trees the world's first conservationists rescued gives this blaze its peculiar sting.",
        "excerpt": "By the imperial decree of 13 April 1861 an 'artistic reserve' was set aside within the Forest of Fontainebleau at the urging of the Barbizon painters — the first area of land in history to be protected for its beauty rather than its yield, predating Yellowstone by more than a decade. The men who painted its oaks became, almost by accident, the first to argue that a forest could be worth defending simply for what it was.",
        "source": "Milwaukee Art Museum — 'Peasants and Preservation: The Barbizon School Artists and the Struggle for Fontainebleau Forest'",
        "href": "https://blog.mam.org/2020/04/27/peasants-and-preservation-the-barbizon-school-artists-and-the-struggle-for-fontainebleau-forest/"
      },
      {
        "category": "literary",
        "title": "Long before satellite maps of burn scars, the forest fire was poetry's great image of an unstoppable, glittering force. In Book II of the Iliad, Homer likens the massed Greek army pouring onto the plain of Troy to a wildfire seen blazing from a distant mountaintop, its glare thrown up into the sky. It is the identical spectacle that greeted greater Paris this month: a woodland turned to a wall of light visible for miles, unprecedented Canadair bombers wheeling over the smoke. Homer's simile reminds us that humans have always read a forest ablaze as both terror and terrible beauty.",
        "excerpt": "As when some great forest fire is raging upon a mountain top and its light is seen afar, even so as they marched the gleam of their armour flashed up into the firmament of heaven.",
        "source": "Homer, Iliad, Book II (trans. Samuel Butler)",
        "href": "https://www.gutenberg.org/files/2199/2199-h/2199-h.htm"
      },
      {
        "category": "literary",
        "title": "Virgil turned the same fire-image inward, toward loss. In Book II of the Aeneid, Aeneas recounts the night Troy burned, and compares the flames sweeping the doomed city to a firestorm driven by the wind flattening a ripe cornfield — devastation that rolls faster than anyone can flee. The palace of Ucalegon catches next; the sea itself glows with the reflected blaze. The Fontainebleau fire, forcing some thousand people to evacuate a landscape of memory and royal history, replays this ancient grief: a beloved place consumed while its people can only watch the light on the horizon.",
        "excerpt": "Thus, when a flood of fire by wind is borne, / Crackling it rolls, and mows the standing corn.",
        "source": "Virgil, Aeneid, Book II (trans. John Dryden)",
        "href": "https://www.gutenberg.org/cache/epub/228/pg228.txt"
      },
      {
        "category": "artistic",
        "title": "No painter is more bound up with this forest than Théodore Rousseau, the Barbizon master who both immortalised and helped protect it. In 'The Forest of Fontainebleau, Morning' (c. 1850) he paints the very woodland now scorched — great trees rising into a luminous dawn sky, cattle in a glade, the light almost sacred. Rousseau's canvases are the reason the world thinks of Fontainebleau as hallowed ground rather than mere timber. To look at his morning light now is to measure exactly what 1,900 hectares of flame have taken.",
        "excerpt": "Rousseau's oaks stand in a hush of early light, the forest rendered as a cathedral of living wood rather than a stand of trees. It is the vision that persuaded a nation, and then the world, that such a place must never be cut or burned — the same trees over which four water-bombers now circle.",
        "source": "Théodore Rousseau, 'The Forest of Fontainebleau, Morning' (c. 1850), oil on canvas, The Wallace Collection, London",
        "href": "https://commons.wikimedia.org/wiki/File:Th%C3%A9odore_Rousseau_(1812-1867)_-_The_Forest_of_Fontainebleau,_Morning_-_P283_-_The_Wallace_Collection.jpg",
        "image": {
          "src": "/covers/fontainebleau-forest-fire-arson--a4.png",
          "alt": "Théodore Rousseau's oil painting of the Fontainebleau forest at morning: tall trees and cattle in a clearing beneath a luminous dawn sky.",
          "credit": "Théodore Rousseau (1812–1867), The Forest of Fontainebleau, Morning, c. 1850, The Wallace Collection, London. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Fire has also been staged as spectacle and myth. At the close of Wagner's 'Die Walküre' (1870), Wotan summons the fire-god Loge and rings the sleeping Brünnhilde's rock with a wall of flame in the shimmering 'Magic Fire Music' (Feuerzauber) — an orchestral conjuring of fire as both punishment and enchantment, the incendiary as a god's deliberate act. It is fire willed into being, encircling and consuming, exactly the deliberate ignition investigators suspect at Fontainebleau. Wagner's flickering strings and brass give musical form to the destroyer who sets the world alight.",
        "excerpt": "In the Feuerzauber, Wagner builds fire from the orchestra itself — flickering figures in the strings, the glowing motif of Loge, brass swelling into a blaze that surrounds the mountain. It is the sound of a conflagration summoned on purpose, beautiful and terrible at once.",
        "source": "Richard Wagner, Die Walküre, WWV 86B — 'Wotans Abschied und Feuerzauber' (Act III finale)",
        "href": "https://imslp.org/wiki/Die_Walk%C3%BCre,_WWV_86B_(Wagner,_Richard)"
      }
    ],
    "rank": 11
  },
  {
    "slug": "nerihu-mandarin-oriental-facade",
    "headline": "Neri&Hu wraps the Mandarin Oriental's Landmark hotel in Hong Kong in a staggered terracotta-tile 'urban tapestry' facade",
    "overview": "Shanghai studio Neri&Hu unveiled a new facade for Mandarin Oriental The Landmark on Queen's Road in Hong Kong's Central district, cladding the former Harvey Nichols department store in staggered terracotta tiles meant to evoke a woven tapestry and the city's history of intricate tile and metalwork. The architects said the main challenge was to unify a fragmented, previously glass-and-billboard frontage into a single coherent identity for the recently renovated hotel. The redesigned Landmark hotel reopened on 1 June 2026.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Dezeen",
        "href": "https://www.dezeen.com/2026/07/14/nerihu-mandarin-oriental-the-landmark-facade-hong-kong/"
      },
      {
        "name": "Hotel Designs",
        "href": "https://hoteldesigns.net/industry-news/mandarin-oriental-the-landmark-hong-kong-unveils-its-next-chapter/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-14",
    "image": {
      "src": "/covers/nerihu-mandarin-oriental-facade.png",
      "alt": "A hotel facade clad in staggered terracotta tiles resembling woven tapestry in Hong Kong's Central district.",
      "credit": "Natural History Museum, London (Alfred Waterhouse, 1881), buff-and-blue terracotta-tiled facade. Photo: Txllxt TxllxT, CC BY-SA 4.0, via Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 14 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Babylon dressed its walls in fired clay long before Hong Kong did. On the Ishtar Gate the city wrapped raw brick in glazed tiles, turning a defensive mass into a shimmering, patterned skin of lions and rosettes. Herodotus marveled that the very earth dug from the moat was baked and re-laid as ornament. Neri&Hu's staggered terracotta 'urban tapestry' is the same ancient instinct: take clay from the ground, fire it, and make a great building wear a woven face. The Landmark's tiled frontage is a distant cousin of the blue-brick gates of Mesopotamia.",
        "excerpt": "As fast as they dug the moat the soil which they got from the cutting was made into bricks, and when a sufficient number were completed they baked the bricks in kilns. Then they set to building, and began with bricking the borders of the moat, after which they proceeded to construct the wall itself, using throughout for their cement hot bitumen, and interposing a layer of wattled reeds at every thirtieth course of the bricks.",
        "source": "Herodotus, The Histories, Book I.179 (trans. George Rawlinson)",
        "href": "https://earth-history.com/bavbylon/greek-reports-of-babylon",
        "image": {
          "src": "/covers/nerihu-mandarin-oriental-facade--a0.png",
          "alt": "Reconstruction of the glazed blue-brick Ishtar Gate of Babylon at the Pergamon Museum, Berlin",
          "credit": "Ishtar Gate reconstruction, Pergamon Museum, Berlin. Photo: Rictor Norton, CC BY 2.0, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "When American towers first rose in steel, Louis Sullivan sheathed their skeletons in flowering terracotta, insisting a building's surface could sing. Yet even Sullivan argued that ornament was a chosen luxury, never a crutch for weak form; a structure should first be 'comely in the nude.' Neri&Hu take up exactly this tension in Central: beneath the woven tiles sits an ordinary commercial frame, and the terracotta is the deliberate, added grace. Their tapestry unifies a fragmented glass-and-billboard front the way Sullivan's clay foliage once redeemed the blunt Chicago box. The craft of fired clay as considered ornament runs straight from the 1890s to Queen's Road.",
        "excerpt": "If I answer the question in entire candor, I should say that it would be greatly for our aesthetic good if we should refrain entirely from the use of ornament for a period of years, in order that our thought might concentrate acutely upon the production of buildings well formed and comely in the nude... ornament is mentally a luxury, not a necessary.",
        "source": "Louis H. Sullivan, 'Ornament in Architecture,' The Engineering Magazine (1892)",
        "href": "https://www.readingdesign.org/ornament-in-architecture"
      },
      {
        "category": "literary",
        "title": "Penelope kept her suitors at bay with a loom, weaving a shroud by day and secretly unpicking it by night so the cloth was forever both whole and unfinished. Her web is the original story of fabric as strategy: a woven surface that holds an identity together while the world tugs at its threads. Neri&Hu's facade performs a gentler version of the same magic, drawing a single continuous 'tapestry' over a frontage that had unravelled into mismatched glass and signage. Where Penelope wove to delay a decision, the studio weaves to resolve one, binding fragments into one face. Both treat the woven surface as an act of will.",
        "excerpt": "She set up a great tambour frame in her room, and began to work on an enormous piece of fine needlework... we could see her working on her great web all day long, but at night she would unpick the stitches again by torchlight.",
        "source": "Homer, The Odyssey, Book II (trans. Samuel Butler)",
        "href": "https://www.gutenberg.org/files/1727/1727-h/1727-h.htm"
      },
      {
        "category": "literary",
        "title": "Ovid's Arachne was a weaver so gifted her cloth seemed to breathe, her fingers coaxing raw fleece into images finer than a goddess could bear. Her tale is antiquity's great meditation on the woven surface as both craft and hubris, the loom as a place where skill becomes art. Neri&Hu's terracotta 'urban tapestry' claims that lineage openly, casting the building's outer skin as a piece of virtuoso weaving rendered in clay. The staggered tiles are the studio's threads, teased and twisted into a pattern that reads as fabric from the street. Arachne would recognize the ambition: to make a hard material look impossibly, gracefully woven.",
        "excerpt": "So graceful was her motion then,—if she / was twisting the coarse wool in little balls, / or if she teased it with her finger-tips, / or if she softened the fine fleece, drawn forth / in misty films, or if she twirled the smooth / round spindle with her energetic thumb,",
        "source": "Ovid, Metamorphoses, Book VI (trans. Brookes More)",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0028:book=6"
      },
      {
        "category": "artistic",
        "title": "In the c.1500 tapestry cycle The Lady and the Unicorn, an entire world of millefleurs, animals and heraldry is knotted into a single flat plane of wool and silk, a wall that is literally cloth. It is the medieval ideal of the building-as-tapestry made real: architecture and narrative dissolved into one continuous woven surface. Neri&Hu invert the material but keep the dream, hanging a 'woven' skin of terracotta over the Mandarin Oriental so the hotel reads as a hung fabric rather than a stacked frame. Both turn a vertical surface into a field to be read, dense with pattern and identity. The Landmark's facade is a tapestry that happens to be fired, not spun.",
        "excerpt": "A field of deep red scattered with a thousand flowers, animals and heraldic devices, the six panels of The Lady and the Unicorn knot an entire courtly world into flat planes of wool and silk. The cloth becomes a wall, and the wall becomes a story, exactly the fusion of surface and image that Neri&Hu chase in terracotta.",
        "source": "The Lady and the Unicorn ('Sight'), c. 1500, Musée de Cluny, Paris",
        "href": "https://commons.wikimedia.org/wiki/File:The_Lady_and_the_unicorn_Sight.jpg",
        "image": {
          "src": "/covers/nerihu-mandarin-oriental-facade--a4.png",
          "alt": "Medieval millefleurs tapestry 'The Lady and the Unicorn: Sight', a lady holding a mirror to a unicorn on a red woven ground",
          "credit": "The Lady and the Unicorn: 'Sight', c. 1500, Musée de Cluny. Public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Gustav Klimt's The Kiss dissolves two embracing figures into a single golden mantle of mosaic-like pattern, so that ornament, not anatomy, holds the image together. It is a masterclass in unifying fragments through a woven, tessellated surface, the very problem Neri&Hu set out to solve on Queen's Road. Their staggered terracotta tiles do for the fractured hotel frontage what Klimt's gold leaf does for his lovers: cloak disparate parts in one shimmering, patterned skin until they read as a whole. Both artists trust surface ornament to carry meaning and identity. The facade, like the painting, becomes a robe of tiles thrown over structure.",
        "excerpt": "Klimt wraps his lovers in a single glittering cloak of gold, spirals and tesserae, until pattern itself becomes the subject and two figures read as one ornamented mass. It is precisely this trick, unifying fragments beneath a woven, tile-like skin, that Neri&Hu perform in terracotta over a once-fractured Hong Kong frontage.",
        "source": "Gustav Klimt, The Kiss (Der Kuss), 1907–1908, Osterreichische Galerie Belvedere, Vienna",
        "href": "https://commons.wikimedia.org/wiki/File:The_Kiss_-_Gustav_Klimt_-_Google_Cultural_Institute.jpg",
        "image": {
          "src": "/covers/nerihu-mandarin-oriental-facade--a5.png",
          "alt": "Gustav Klimt's The Kiss, two figures embracing within a large patterned cloak of gold leaf",
          "credit": "Gustav Klimt, The Kiss (1907–08), Belvedere, Vienna. Public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 12
  },
  {
    "slug": "sean-harte-roy-keane-red-cards",
    "headline": "Irish artist Sean Harte paints all 13 of Roy Keane's career red cards for a Dublin exhibition",
    "overview": "Dublin-based artist Sean Harte has made an oil-pastel painting of each of the 13 red cards footballer Roy Keane received over his career, for a show titled 'Sent Off' opening at Hen's Teeth in Dublin on 3 September. Harte said the series began as a playful personal project after Keane miscounted his dismissals on a podcast, and aims to turn the notorious sending-offs into something 'fun and playful.' The paintings revisit a childhood hero through the flashpoints that defined his combative reputation.",
    "genre": "Culture",
    "sources": [
      {
        "name": "It's Nice That",
        "href": "https://www.itsnicethat.com/articles/sean-harte-sent-off-art-project-140726"
      },
      {
        "name": "Hen's Teeth",
        "href": "https://www.hensteethdublin.com/all-events/sent-off-senie-harte-painting-of-every-roy-keane-red-card"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-14",
    "image": {
      "src": "/covers/sean-harte-roy-keane-red-cards.png",
      "alt": "Football referee's hand holding up a red card against a stadium backdrop.",
      "credit": "Roy Keane in 2014. Photo: Irish Defence Forces (Óglaigh na hÉireann), via Wikimedia Commons, CC BY 2.0."
    },
    "edition": "Afternoon Edition · 14 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Long before a referee's red card, Athens had its own ritual of sending a man off: ostracism. Each year citizens could scratch a name on a pottery shard and, by vote, banish a prominent figure for ten years. In 482 BCE they expelled Aristides, a general so upright he was nicknamed 'the Just' - the very fame that undid him. Like Roy Keane, whose combative brilliance made him both hero and marked man, Aristides learned that a towering reputation invites the crowd's verdict. Sean Harte's thirteen paintings are a gentler, playful version of that same ancient impulse to commemorate an expulsion.",
        "excerpt": "As therefore, they were writing the names on the sherds, it is reported that an illiterate clownish fellow, giving Aristides his sherd, supposing him a common citizen, begged him to write Aristides upon it; and he being surprised and asking if Aristides had ever done him any injury, 'None at all,' said he, 'neither know I the man; but I am tired of hearing him everywhere called the just.'",
        "source": "Plutarch, Life of Aristides (trans. John Dryden), Internet Classics Archive (MIT)",
        "href": "http://classics.mit.edu/Plutarch/aristide.html"
      },
      {
        "category": "historical",
        "title": "On 15 May 1912, Detroit's Ty Cobb - the fiercest competitor of his age - vaulted the railing at New York's Hilltop Park and thrashed a heckler in the stands. The American League suspended him, and in protest his Tigers teammates went on strike, forcing the club to field amateurs. Cobb, like Roy Keane, was a champion whose genius on the field was inseparable from a temper that repeatedly got him sent off it. His disgrace became the stuff of legend, endlessly retold - much as Keane's thirteen dismissals are now retold in oil pastel. The great competitor undone by his own rage is a story every era rewrites.",
        "excerpt": "The most famous of baseball's hot-tempered stars, Cobb climbed into the grandstand during a game against New York and beat a jeering spectator, then found himself suspended by league president Ban Johnson. His Detroit teammates, refusing to take the field without him, staged the sport's first players' strike. The incident cemented Cobb's reputation as a champion perpetually at war with the crowd.",
        "source": "New-York Tribune, 20 May 1912 (Library of Congress, Chronicling America)",
        "href": "https://chroniclingamerica.loc.gov/lccn/sn83030214/1912-05-20/ed-1/seq-8/"
      },
      {
        "category": "literary",
        "title": "Western literature opens on a red card. The very first word of Homer's Iliad is the wrath of Achilles - the anger of a peerless warrior who, feeling wronged, storms off the field and lets his own side suffer. It is the founding portrait of the great competitor undone by his temper, the hero whose defining trait is rage. Roy Keane, captain and combatant, walks in that ancient tradition of the champion whose fury is inseparable from his greatness. Sean Harte's exhibition turns thirteen fits of that same wrath into something 'fun and playful.'",
        "excerpt": "Sing, O goddess, the anger of Achilles son of Peleus, that brought countless ills upon the Achaeans. Many a brave soul did it send hurrying down to Hades, and many a hero did it yield a prey to dogs and vultures.",
        "source": "Homer, The Iliad, Book I (trans. Samuel Butler), Internet Classics Archive (MIT)",
        "href": "http://classics.mit.edu/Homer/iliad.1.i.html"
      },
      {
        "category": "literary",
        "title": "Shakespeare's Coriolanus is the tragedy of a supreme warrior whose pride and temper get him thrown out of his own city. When Rome moves to banish him, he rounds on the citizens with contempt and banishes them right back before striding into exile. It is the sending-off as high drama: the champion too combative to bend, expelled from the arena that made him. Roy Keane's dismissals carry the same charge - a hero whose refusal to back down turned the field into a place he was repeatedly ordered to leave. Harte's 'Sent Off' reframes that banishment as playful commemoration rather than shame.",
        "excerpt": "You common cry of curs! whose breath I hate / As reek o' the rotten fens, whose loves I prize / As the dead carcasses of unburied men / That do corrupt my air, I banish you; ... Thus I turn my back: / There is a world elsewhere.",
        "source": "William Shakespeare, Coriolanus, Act III, Scene 3, The Complete Works of Shakespeare (MIT)",
        "href": "http://shakespeare.mit.edu/coriolanus/coriolanus.3.3.html"
      },
      {
        "category": "artistic",
        "title": "François-Léon Benouville's 1847 canvas 'The Wrath of Achilles' shows the hero in the grip of the rage that opens the Iliad - furious, withdrawn, undone by his own temper. Painted in Rome as a Prix de Rome pensioner's exercise, it makes anger monumental and beautiful, the way great art has always dignified transgression. That is exactly Sean Harte's move: taking a champion's fits of fury and rendering them, deliberately, as art. Where Benouville ennobles the wrath, Harte makes Keane's thirteen sendings-off 'fun and playful' - two artists commemorating a combative hero's anger on the wall of a gallery.",
        "excerpt": "A neoclassical oil in which Achilles, stripped of his prize by Agamemnon, seethes with the anger that will cost the Greeks dearly - the archetypal image of a champion consumed by his own rage. Benouville painted it while at the Villa Medici; it now hangs in the Musée Fabre, Montpellier.",
        "source": "François-Léon Benouville, 'The Wrath of Achilles' (1847), Musée Fabre, via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Leon_Benouville_The_Wrath_of_Achilles.jpg",
        "image": {
          "src": "/covers/sean-harte-roy-keane-red-cards--a4.png",
          "alt": "Neoclassical painting of Achilles seated and seething with anger, 'The Wrath of Achilles' by François-Léon Benouville, 1847",
          "credit": "François-Léon Benouville, 'The Wrath of Achilles' (1847), Musée Fabre. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Beethoven's Coriolan Overture (1807) sets the banished warrior to music: relentless, jagged C-minor chords that stalk and stab, the sound of a proud temper unable to yield. Inspired by the Coriolanus tragedy, it is a portrait in sound of the hero whose fury drives him out of his own world. It matches Roy Keane exactly - the driving intensity, the refusal to relent, the combative energy that repeatedly earned him the walk to the tunnel. Where Beethoven gives that wrath thunder, Sean Harte gives it oil pastel, each of Keane's thirteen dismissals recast as a small, playful artwork about a great competitor's temper.",
        "excerpt": "An orchestral overture in C minor whose hammering opening chords depict the intransigent, hot-tempered Coriolanus - a champion whose pride and anger lead to banishment and ruin. Beethoven distils the warrior's fury into music of violent forward drive that finally subsides into collapse.",
        "source": "Ludwig van Beethoven, Coriolan Overture, Op. 62 (1807), scores at IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Coriolan,_Op.62_(Beethoven,_Ludwig_van)"
      }
    ],
    "rank": 13
  },
  {
    "slug": "us-iran-hormuz-blockade-tankers",
    "headline": "The United States begins enforcing a Strait of Hormuz blockade and a 20% shipping levy as Iranian missiles strike tankers, killing a sailor",
    "overview": "Over a third consecutive night of U.S. airstrikes on Iran, President Donald Trump announced a 20% levy on cargo moving through the Strait of Hormuz and said Washington would begin enforcing a maritime blockade of the waterway on Tuesday. The United Arab Emirates condemned what it called a 'brazen' Iranian missile attack on oil tankers in the strait that killed at least one sailor, and Trump sent Congress formal notice that the conflict with Iran had resumed. Oil prices climbed to a one-month high and Asian shares wavered as traders braced for disruption to the world's most important oil chokepoint.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "NPR",
        "href": "https://www.npr.org/2026/07/13/nx-s1-5891746/us-iran-strait-of-hormuz-updates"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMixwFBVV95cUxQdF9iNjRwdm9pODdabFB6TGd0b0llZjQxY3NDQWktelE1c2NnUERlYUs2TnNPc0JBaFZvWlZhM3VfRUVwTV9MZUFteVh3VlV0QVhfZi1NUGpQdEp3elpuYnFrVE9Yb1BzNmtGLWdiYlJ2THBOT3NrRmppdG5mNWFVRDcyWmFSRHJzWXJyVVpQYy16cVZKb1I1UEh4eFdYN1VURkFtQmNVanhnM2I4Y3JSLXhHTmhOMXBmSTRMZE4xam5CSlN1eGFR?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-14",
    "image": {
      "src": "/covers/us-iran-hormuz-blockade-tankers.png",
      "alt": "A U.S. Navy aircraft carrier and its strike group steam in column through the narrow Strait of Hormuz.",
      "credit": "U.S. Navy photo by Petty Officer 3rd Class Janae Chambers, via Wikimedia Commons (public domain)"
    },
    "lead": true,
    "edition": "Morning Edition · 14 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In 413 BC the Syracusans decided to seal the mouth of their Great Harbour, penning the Athenian fleet inside a narrow neck of water it could no longer escape. It is the classic lesson of the chokepoint: whoever controls the strait controls the fate of every ship behind it, and a proud naval power can be trapped by the same geography it came to dominate. Washington's move to close the Strait of Hormuz and blockade Iranian ports is the modern echo, a decision to bar a narrow gate and turn a waterway into a cage. Thucydides shows how quickly such a plan escalates from self-defense to a bid to annihilate the enemy outright.",
        "excerpt": "Meanwhile the Syracusans immediately began to sail freely along the harbour, and determined to close up its mouth, so that the Athenians might not be able to steal out in future, even if they wished. Indeed, the Syracusans no longer thought only of saving themselves, but also how to hinder the escape of the enemy; thinking, and thinking rightly, that they were now much the stronger, and that to conquer the Athenians and their allies by land and sea would win them great glory in Hellas.",
        "source": "Thucydides, History of the Peloponnesian War, Book VII (trans. Richard Crawley)",
        "href": "https://www.gutenberg.org/cache/epub/7142/pg7142.txt"
      },
      {
        "category": "historical",
        "title": "When Woodrow Wilson asked Congress to declare war in April 1917, the trigger was a campaign of attacks on shipping: German submarines sinking merchant vessels without warning and drowning the sailors aboard. Wilson framed strikes on commerce as an assault on all nations, the kind of injury that pulls neutrals and bystanders into a widening war. The Iranian missiles that struck oil tankers in Hormuz and killed a crew member echo that same logic, an attack on civilian shipping that the UAE condemned and that risks dragging outside powers into direct combat. As in 1917, a war on cargo becomes the argument for a much larger war.",
        "excerpt": "The present German submarine warfare against commerce is a warfare against mankind. It is a war against all nations. American ships have been sunk, American lives taken, in ways which it has stirred us very deeply to learn of, but the ships and people of other neutral and friendly nations have been sunk and overwhelmed in the waters in the same way.",
        "source": "Woodrow Wilson, War Message to Congress, April 2, 1917 (U.S. National Archives)",
        "href": "https://www.archives.gov/milestone-documents/address-to-congress-declaration-of-war-against-germany"
      },
      {
        "category": "literary",
        "title": "Aeschylus wrote The Persians for an audience that had itself fought at Salamis, and its messenger describes a superpower's fleet destroyed inside a strait too cramped for its own numbers. The horror is precisely geographic: masses of ships jammed into narrow water, unable to maneuver, colliding with one another as the enemy picks them apart. That is the danger now hanging over Hormuz, where a blockade, a toll, and missile strikes crowd tankers and warships into one of the world's tightest maritime bottlenecks. The play is a warning about hubris in a strait, where scale becomes a liability and a single choke of water can undo a giant.",
        "excerpt": "Meantime from Persia's hosts the deep'ning shout Answer'd their shout; no time for cold delay; But ship 'gainst ship its brazen beak impell'd. First to the charge a Grecian galley rush'd; Ill the Phoenician bore the rough attack, Its sculptured prow all shatter'd. Each advanced Daring an opposite. The deep array Of Persia at the first sustain'd the encounter; But their throng'd numbers, in the narrow seas Confined, want room for action; and, deprived Of mutual aid, beaks clash with beaks, and each Breaks all the other's oars.",
        "source": "Aeschylus, The Persians (trans. Robert Potter)",
        "href": "https://classics.mit.edu/Aeschylus/persians.html"
      },
      {
        "category": "literary",
        "title": "In Book XII of the Odyssey, Odysseus must thread his ship through a strait guarded on one side by the whirlpool Charybdis and on the other by the monster Scylla, who reaches down and snatches six sailors to their deaths. Homer's strait is the original deadly chokepoint: a passage so narrow that ships cannot avoid the peril, and the price of transit is measured in dead crewmen. The Strait of Hormuz has become that same gauntlet, where a tanker's sailor was killed passing through waters ringed by missiles and warships. The poem captures the specific dread of a crew forced through a place where the sea itself has become a weapon.",
        "excerpt": "Then we entered the Straits in great fear of mind, for on the one hand was Scylla, and on the other dread Charybdis kept sucking up the salt water. As she vomited it up, it was like the water in a cauldron when it is boiling over upon a great fire, and the spray reached the top of the rocks on either side. When she began to suck again, we could see the water all inside whirling round and round, and it made a deafening sound as it broke against the rocks. We could see the bottom of the whirlpool all black with sand and mud, and the men were at their wits ends for fear. While we were taken up with this, and were expecting each moment to be our last, Scylla pounced down suddenly upon us and snatched up my six best men.",
        "source": "Homer, The Odyssey, Book XII (trans. Samuel Butler)",
        "href": "https://www.gutenberg.org/cache/epub/1727/pg1727.txt"
      },
      {
        "category": "artistic",
        "title": "Ivan Aivazovsky's The Battle of Chesme at Night depicts an entire fleet ablaze on dark water, the sea lit orange by burning hulls and columns of smoke and flame climbing into the night sky. It renders exactly the image now emerging from Hormuz: ships set on fire in a confined sea, the water itself turned into a field of destruction. The painting also carries the theme of oil and cargo as fuel for catastrophe, the way a strike on shipping becomes a conflagration visible for miles. Aivazovsky, the great painter of naval disaster, gives visual form to the tankers burning in the strait.",
        "excerpt": "A night seascape in which a trapped fleet burns on the water, its hulls glowing and exploding while towers of fire and smoke rise against a black sky. The calm sea mirrors the flames, turning the whole strait into a sheet of light and wreckage. Small boats pick their way among the burning ships, dwarfed by the scale of the destruction.",
        "source": "Ivan Aivazovsky, The Battle of Chesme at Night (1848), via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Ivan_Constantinovich_Aivazovsky_-_Battle_of_%C3%87esme_at_Night.JPG",
        "image": {
          "src": "/covers/us-iran-hormuz-blockade-tankers--a5.png",
          "alt": "Oil painting of a naval fleet burning at night on calm water, flames and smoke rising against a dark sky.",
          "credit": "Ivan Aivazovsky (1848), public domain via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Thomas Arne's Rule, Britannia! from the masque Alfred is the anthem of a nation claiming ownership of the seas, its refrain vowing that Britannia will rule the waves and command all who sail them. That is the political claim now being asserted over the Strait of Hormuz, where Washington announced it would control the passage, blockade Iranian ports, and charge a 20% levy on cargo for the privilege of protection. The piece captures the old fusion of naval power and maritime toll, the idea that whoever rules a waterway may tax everything that moves through it. Set to swelling music, it is the sound of a great power turning a chokepoint into a source of dominion and revenue.",
        "excerpt": "A grand patriotic ode built on a rising, march-like melody and a triumphant recurring refrain in praise of naval supremacy. The music swells with brass and chorus into an anthem of a maritime empire that claims to command the seas and everyone who sails them. Its confident, ceremonial tone turns control of the waves into a matter of national glory.",
        "source": "Thomas Arne, Rule, Britannia! from the masque Alfred (1740), via IMSLP.",
        "href": "https://imslp.org/wiki/The_Masque_of_Alfred_(Arne,_Thomas_Augustine)"
      }
    ],
    "rank": 14
  },
  {
    "slug": "sudan-rsf-hemedti-death-sentence",
    "headline": "A Sudanese court sentences paramilitary RSF leader Mohamed Hamdan Dagalo to death in absentia over war crimes",
    "overview": "A Sudanese court sentenced Mohamed Hamdan Dagalo, the commander of the paramilitary Rapid Support Forces known as Hemedti, to death in absentia for war crimes, in the first judicial conviction of the group's leadership since Sudan's civil war erupted in April 2023. Fifteen other RSF commanders and allies were condemned alongside him over the killing of a state governor and atrocities in West Darfur. Rights groups warned the army-aligned court's verdict could further dim prospects for a negotiated peace in a war that has killed tens of thousands and displaced millions.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cn4dk3kl0l4o"
      },
      {
        "name": "The National",
        "href": "https://www.thenationalnews.com/news/mena/2026/07/13/army-aligned-sudan-court-deals-blow-to-peace-hopes-with-death-sentence-against-rsf-leader-dagalo/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-14",
    "image": {
      "src": "/covers/sudan-rsf-hemedti-death-sentence.png",
      "alt": "Mohamed Hamdan Dagalo wearing a beige military cap with a round red logo.",
      "credit": "BBC News"
    },
    "edition": "Morning Edition · 14 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In 70 BC the orator Cicero prosecuted Gaius Verres, the Roman governor whose plunder and cruelty devastated the province of Sicily and who illegally scourged and crucified a Roman citizen. Verres fled into exile before judgment, so his condemnation was pronounced over an empty seat, much as Hemedti was convicted with no defendant in the dock. Both cases turn a courtroom into a public reckoning for a strongman who terrorised the very people he was meant to protect. The prosecution's power lies less in seizing the culprit than in naming the atrocity for history.",
        "excerpt": "It is a crime to bind a Roman citizen; to scourge him is a wickedness; to put him to death is almost parricide. What shall I say of crucifying him?",
        "source": "Cicero, In Verrem (Against Verres), Second Pleading, Book 5. Marcus Tullius Cicero (trans. C. D. Yonge). Wikisource.",
        "href": "https://en.wikisource.org/wiki/Against_Verres/Second_pleading/Book_5"
      },
      {
        "category": "historical",
        "title": "At Nuremberg in 1946 the International Military Tribunal tried Hitler's secretary Martin Bormann in absentia and sentenced him to death for war crimes and crimes against humanity, unsure whether he was even alive. The Sudanese court's verdict against Hemedti echoes that precedent closely: a leader of an organised campaign of mass killing condemned to hang though he sits far beyond the court's reach. In both, judges refused to let a defendant's absence harden into impunity. The sentence stands as much as a moral record of the atrocities as a practical order of execution.",
        "excerpt": "Counsel has argued that Bormann is dead and that the Tribunal should not avail itself of Article 12 of the Charter which gives it the right to take proceedings in absentia. But the evidence of death is not conclusive, and the Tribunal, as previously stated, determined to try him in absentia.",
        "source": "Judgment of the International Military Tribunal at Nuremberg: Martin Bormann. The Avalon Project, Yale Law School.",
        "href": "https://avalon.law.yale.edu/imt/judborma.asp"
      },
      {
        "category": "literary",
        "title": "In Canto XII of Dante's Inferno the warlords and tyrants who \"dealt in bloodshed and in pillaging\" are sunk to their brows in a river of boiling blood, guarded by centaurs who shoot any who dare rise too high. Dante imagines a divine tribunal that measures each ruler's punishment to the exact depth of his slaughter and condemns them by name for eternity. Hemedti's sentencing for the killings in West Darfur reaches for the same poetic justice: the man who drowned a region in blood is publicly consigned to judgment. Like Dante's court, the verdict insists the record of atrocity outlives the perpetrator's escape.",
        "excerpt": "People I saw within up to the eyebrows,\nAnd the great Centaur said: “Tyrants are these,\nWho dealt in bloodshed and in pillaging.\n\nHere they lament their pitiless mischiefs; here\nIs Alexander, and fierce Dionysius\nWho upon Sicily brought dolorous years.”",
        "source": "Dante Alighieri, Inferno, Canto XII (the tyrants in the river of boiling blood). Dante Alighieri (trans. Henry Wadsworth Longfellow). Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/1001/1001-h/1001-h.htm"
      },
      {
        "category": "literary",
        "title": "Euripides' The Trojan Women shows the sack of a city from the victims' side, and the god Poseidon warns the conquering army that those who lay temples and tombs to waste are \"yourselves so soon to die.\" The play frames the massacre of a defenceless population as a crime that summons its own reckoning. Hemedti's RSF stands accused of exactly such atrocities against civilians in Darfur, and the death sentence is the reckoning the play foretells. Both insist that the sacking of a people is never the end of the story.",
        "excerpt": "How are ye blind,\nYe treaders down of cities, ye that cast\nTemples to desolation, and lay waste\nTombs, the untrodden sanctuaries where lie\nThe ancient dead; yourselves so soon to die!",
        "source": "Euripides, The Trojan Women (Poseidon's warning to the sackers of the city). Euripides (trans. Gilbert Murray). Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/35171/35171-h/35171-h.htm"
      },
      {
        "category": "artistic",
        "title": "Goya's The Third of May 1808 depicts the summary execution of unarmed civilians, the terrified figures lit against a wall of anonymous rifles. It is the visual grammar of the very atrocities for which Hemedti was condemned: a defenceless population slaughtered by an armed force acting with impunity. The painting also inverts the courtroom's ritual, showing execution without trial where the Sudanese court offers trial without the executed. Set side by side, they frame the war's central question of who answers for the killing of the helpless.",
        "excerpt": "Goya throws a lantern's harsh white light onto a kneeling man in a white shirt, arms flung wide, as a faceless firing squad levels its muskets inches from his chest. Around him the dead already lie in pools of blood while others cover their eyes and wait their turn. The night, the anonymity of the executioners, and the raw terror of the victims make the massacre feel at once specific and endless.",
        "source": "Francisco de Goya, The Third of May 1808 (El Tres de Mayo). Wikimedia Commons (Museo del Prado, public domain)",
        "href": "https://commons.wikimedia.org/wiki/File:El_Tres_de_Mayo,_by_Francisco_de_Goya,_from_Prado_in_Google_Earth.jpg",
        "image": {
          "src": "/covers/sudan-rsf-hemedti-death-sentence--a5.png",
          "alt": "Goya's The Third of May 1808: a firing squad executes a group of civilians at night, one kneeling with arms outstretched, the dead lying in blood at his feet.",
          "credit": "Francisco de Goya, The Third of May 1808 (1814), Museo del Prado. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Verdi's Messa da Requiem sets the medieval Dies irae, the \"Day of Wrath\" on which all deeds are judged and the guilty face their sentence. Its overwhelming force mirrors the moral weight of a court at last pronouncing judgment on the leader of a mass atrocity. Where the Sudanese verdict is symbolic because the defendant is absent, Verdi's judgment is likewise a matter of conscience rather than capture. The Requiem insists that a reckoning withheld on earth is still demanded in full.",
        "excerpt": "In the Dies irae, hammer-blow chords and a shrieking chorus conjure the Day of Wrath, when every hidden deed is dragged into the light for judgment. Brass and bass drum fall like the strokes of doom while the voices plead and tremble before an implacable verdict. The music stages a cosmic tribunal in sound, terrifying and inescapable.",
        "source": "Giuseppe Verdi, Messa da Requiem, \"Dies irae\" (Day of Wrath). IMSLP (Petrucci Music Library)",
        "href": "https://imslp.org/wiki/Requiem_(Verdi,_Giuseppe)"
      }
    ],
    "rank": 15
  },
  {
    "slug": "trump-shrinks-utah-monuments",
    "headline": "President Trump orders roughly 90% cuts to Utah's Bears Ears and Grand Staircase-Escalante national monuments",
    "overview": "President Donald Trump signed proclamations on July 13, 2026, sharply cutting the boundaries of two national monuments in Utah, shrinking Bears Ears from about 1.36 million acres to roughly 121,000 and stripping protection from nearly 1.7 million of Grand Staircase-Escalante's 1.87 million acres. The reductions, deeper than the cuts he made in his first term and reversed under President Biden, reopen close to three million acres of federal land to potential mining, grazing and energy development. Tribal nations and conservation groups called the move heartbreaking and vowed to fight it in court.",
    "genre": "Climate",
    "sources": [
      {
        "name": "The Washington Post",
        "href": "https://www.washingtonpost.com/climate-environment/2026/07/13/trump-again-dramatically-cuts-size-two-national-monuments-utah/"
      },
      {
        "name": "The Hill",
        "href": "https://thehill.com/policy/energy-environment/5966604-trump-shrinks-utah-monuments/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-14",
    "image": {
      "src": "/covers/trump-shrinks-utah-monuments.png",
      "alt": "Sandstone canyon country seen from the Comb Ridge Overlook in Bears Ears National Monument, Utah.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 14 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In the second century BCE, Rome's public land, the ager publicus meant for common use, was steadily swallowed by wealthy landholders until Tiberius Gracchus rose to demand it be returned to the people. His reform set the common good against private extraction, much as the fight over Bears Ears sets shared federal wilderness against mining and grazing. Trump's proclamations reopen roughly three million acres to private use, echoing the Roman rich who quietly absorbed the commons under other people's names. Then as now, dispossession was framed as orderly management. And then as now, those with the least standing were the ones displaced.",
        "excerpt": "The savage beasts in Italy, have their particular dens, they have their places of repose and refuge; but the men who bear arms, and expose their lives for the safety of their country, enjoy in the meantime nothing more in it but the air and light; and having no houses or settlements of their own, are constrained to wander from place to place with their wives and children.",
        "source": "Plutarch, Life of Tiberius Gracchus. Wikisource (Plutarch's Lives, tr. Clough)",
        "href": "https://en.wikisource.org/wiki/Plutarch%27s_Lives_(Clough)/Life_of_Tiberius_Gracchus"
      },
      {
        "category": "historical",
        "title": "John Muir helped launch America's conservation movement by insisting wild places be preserved from the axe of the lumberman and the pick of the prospector. Writing in 1901, he warned that the nation's vast forest reserves were already sadly wasted and threatened at their margins. Shrinking Bears Ears and Grand Staircase-Escalante reverses exactly the impulse Muir fought for, trading protection for extraction. Where Muir saw reserves as a public trust, the new proclamations treat them as inventory to be released. His century-old warning reads as a direct rebuke to the 2026 rollback.",
        "excerpt": "The forty million acres of these reserves are in the main unspoiled as yet, though sadly wasted and threatened on their more open margins by the axe and fire of the lumberman and prospector.",
        "source": "John Muir, Our National Parks. Project Gutenberg (Our National Parks, 1901)",
        "href": "https://www.gutenberg.org/files/60929/60929-h/60929-h.htm"
      },
      {
        "category": "literary",
        "title": "John Clare watched the open moors and commons of his English childhood fenced off by the Enclosure Acts and mourned the loss in The Mores. His lines grieve how enclosure trampled on labour's rights and turned free pasture into private parcels. The 90% cut to Utah's monuments is a modern enclosure, converting shared wilderness into ground opened for private mining and grazing claims. Clare's fences meeting fences in owners' little bounds foreshadow the boundary lines now redrawn across the desert. His elegy for a vanished commons speaks directly to the acres being enclosed again.",
        "excerpt": "Inclosure came and trampled on the grave\nOf labour's rights and left the poor a slave\nAnd memory's pride ere want to wealth did bow\nIs both the shadow and the substance now\n... Fence now meets fence in owners' little bounds\nOf field and meadow large as garden grounds\nIn little parcels little minds to please\nWith men and flocks imprisoned ill at ease",
        "source": "Three Acres and a Cow (John Clare, The Mores)",
        "href": "https://threeacresandacow.co.uk/2014/07/the-mores-by-john-clare/"
      },
      {
        "category": "literary",
        "title": "In Walking, Henry David Thoreau distilled the American case for wildness into a single creed, that in wildness lies the preservation of the world. He treated untamed land not as raw material but as the source of the nation's vitality and freedom. Reopening three million acres to mining and energy inverts that creed, valuing the land only for what can be taken from it. Bears Ears, sacred to tribal nations and prized by conservationists, is precisely the wildness Thoreau meant. His words frame the monument cuts as the loss of something the country cannot manufacture again.",
        "excerpt": "The West of which I speak is but another name for the Wild; and what I have been preparing to say is, that in Wildness is the preservation of the World. Every tree sends its fibers forth in search of the Wild.",
        "source": "Henry David Thoreau, Walking. Project Gutenberg (Walking)",
        "href": "https://www.gutenberg.org/files/1022/1022-h/1022-h.htm"
      },
      {
        "category": "artistic",
        "title": "Thomas Moran's monumental paintings of the American West helped persuade Congress to protect Yellowstone as the first national park in 1872. His Grand Canyon of the Yellowstone rendered the wilderness as something sacred and worth preserving, helping shape the very idea of public land the monuments embody. The 2026 proclamations undo that legacy, treating the red-rock West as territory to be mined rather than beheld. Moran's canvas argued that some landscapes are worth more intact than exploited. Set against the shrinking of Bears Ears, the painting becomes an image of what is being surrendered.",
        "excerpt": "A towering canvas of the Yellowstone's plunging gorge: sunlit cliffs banded in gold, ochre and rose fall away toward a distant thread of waterfall, while storm light breaks over the rim. The wilderness is painted as a cathedral, vast and untouched, its scale dwarfing the two tiny human figures at the edge. It is a landscape rendered explicitly as something to revere and protect, not to strip.",
        "source": "Thomas Moran, The Grand Canyon of the Yellowstone. Wikimedia Commons (public domain, Thomas Moran)",
        "href": "https://commons.wikimedia.org/wiki/File:Thomas_Moran_-_Grand_Canyon_of_the_Yellowstone_-_Smithsonian.jpg",
        "image": {
          "src": "/covers/trump-shrinks-utah-monuments--a5.png",
          "alt": "A towering canvas of the Yellowstone's plunging gorge: sunlit cliffs banded in gold, ochre and rose fall away toward a distant thread of waterfall, while storm light breaks over the rim.",
          "credit": "Thomas Moran, The Grand Canyon of the Yellowstone. Wikimedia Commons (public domain, Thomas Moran)"
        }
      },
      {
        "category": "artistic",
        "title": "Antonin Dvorak composed his New World Symphony in 1893 after immersing himself in American melodies, including those he associated with Native and African American song. Its sweeping Largo evokes the vast open spaces of the continent and a reverence for the land and its first peoples. The shrinking of Bears Ears, a landscape sacred to tribal nations, strikes at exactly the heritage Dvorak tried to honor in sound. The symphony's grandeur stands against the reduction of that wilderness to extractable acreage. It sounds like the memory of a commons the proclamations would enclose.",
        "excerpt": "The famous Largo opens with solemn brass chords that dissolve into a plaintive English-horn melody, a wide, aching theme that seems to survey an immense and lonely landscape. Strings swell and recede like wind moving over open country, evoking distance, memory and loss. The whole movement reads as an elegy for a vast land and the peoples bound to it.",
        "source": "Antonin Dvorak, Symphony No. 9 in E minor, 'From the New World', Op. 95. IMSLP (public domain score)",
        "href": "https://imslp.org/wiki/Symphony_No.9,_Op.95_(Dvo%C5%99%C3%A1k,_Anton%C3%ADn)"
      }
    ],
    "rank": 16
  },
  {
    "slug": "uk-switzerland-services-trade-deal",
    "headline": "Britain and Switzerland sign a services trade deal that scraps roaming charges and opens Swiss e-gates to UK travelers",
    "overview": "The United Kingdom and Switzerland signed what London called its most significant services trade agreement ever, a deal the government estimates could add about 5.2 billion pounds a year to UK services exports in the long run. The pact commits both countries to scrap mobile roaming charges and will let British travelers use Swiss airport e-gates from later this year, starting with Zurich. It also puts a services-mobility arrangement on a permanent footing, allowing professionals to work for up to 90 days without a permit.",
    "genre": "Economy",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c621p9yjz1zo"
      },
      {
        "name": "CNBC",
        "href": "https://www.cnbc.com/2026/07/13/uk-switzerland-free-trade-deal-brexit.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-14",
    "image": {
      "src": "/covers/uk-switzerland-services-trade-deal.png",
      "alt": "A view of a Swiss flag on a boat on Lake Lucerne and Lucerne city in central Switzerland",
      "credit": "BBC News"
    },
    "edition": "Morning Edition · 14 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Long before the European Union, the towns of the Hanseatic League bound themselves together to protect merchants, secure safe passage, and let goods and people move freely across borders. Britain and Switzerland's services pact echoes that medieval instinct: prosperity grows when nations pool trust rather than wall themselves off. Scrapping roaming charges and opening e-gates is a modern version of the League clearing the highroads for its traders. Both are agreements that treat open exchange as a shared civic project. The scale differs, but the logic of mutual advantage is the same.",
        "excerpt": "Peace and security of property, being the very corner-stones of commerce, did the merchant seek above all to secure, and since nothing in this life can be obtained without a struggle, these cities had to fight hard, not only with moral force, but often with the sword, in order to extort from their rulers these elementary rights of civilization.",
        "source": "The Hanseatic League.",
        "href": "https://www.gutenberg.org/cache/epub/39664/pg39664.txt"
      },
      {
        "category": "historical",
        "title": "Richard Cobden built his life around a single conviction: that free trade dissolves the suspicions that set nations against one another. The UK-Switzerland agreement is a small, contemporary vindication of his creed, replacing frictions at the phone bill and the passport gate with easier commerce in services. Where Cobden fought tariffs on corn, today's negotiators target roaming surcharges and border queues. The barriers are humbler, but the aim is the one he named. Every removed obstacle, he argued, knits two peoples a little closer.",
        "excerpt": "Free Trade! What is it? Why, breaking down the barriers that separate nations; those barriers, behind which nestle the feelings of pride, revenge, hatred, and jealousy, which every now and then burst their bounds, and deluge whole countries with blood.",
        "source": "Richard Cobden and the free-trade movement.",
        "href": "https://archive.org/details/speechesonquesti01cobduoft"
      },
      {
        "category": "literary",
        "title": "Walt Whitman heard in the railways and cables of his age a sacred purpose: to weld the world's distant lands together. A services treaty that lets a Briton stride through a Zurich e-gate and use her phone without penalty is exactly the kind of stitching he celebrated. The instruments are prosaic, but the effect is Whitmanian, the distant brought near. Britain and Switzerland are, in his phrase, being connected by network. It is romance dressed as regulation.",
        "excerpt": "Passage to India!\nLo, soul, seest thou not God's purpose from the first?\nThe earth to be spann'd, connected by network,\nThe races, neighbors, to marry and be given in marriage,\nThe oceans to be cross'd, the distant brought near,\nThe lands to be welded together.",
        "source": "Walt Whitman, \"Passage to India\".",
        "href": "https://www.gutenberg.org/files/1322/1322-0.txt"
      },
      {
        "category": "literary",
        "title": "In 'Locksley Hall' Tennyson dreamed of skies crowded with peaceful commerce and a coming 'Federation of the world.' The UK-Switzerland deal is a modest brick in that visionary wall, choosing trade and mobility over friction and distance. His argosies of magic sails have become airliners cleared through automated gates and data flowing without surcharge. The poem's faith that exchange breeds peace underwrites every such treaty. Two nations lowering their barriers is the Parliament of man in miniature.",
        "excerpt": "Saw the heavens fill with commerce, argosies of magic sails,\nPilots of the purple twilight, dropping down with costly bales;\n...\nTill the war-drum throbbed no longer, and the battle-flags were furl'd\nIn the Parliament of man, the Federation of the world.",
        "source": "Alfred, Lord Tennyson, \"Locksley Hall\".",
        "href": "https://www.gutenberg.org/cache/epub/8601/pg8601.txt"
      },
      {
        "category": "artistic",
        "title": "Canaletto painted the Thames thick with the masts and merchantmen that made Georgian London a hub of the world's trade. His luminous port is a portrait of what open commerce looks like when it flourishes: ships, cargo, and people in constant, prosperous motion. The UK-Switzerland services deal seeks the same vitality by other means, unclogging the modern channels of travel and communication. Where Canaletto had river traffic, today's equivalent is the frictionless airport gate and the borderless phone signal. Both depict prosperity as movement made easy.",
        "excerpt": "A wide, sunlit view of the River Thames crowded with sailing vessels and barges, their masts rising like a forest before the distant dome of St Paul's and the spires of the City. Boatmen and merchants throng the water in the foreground while gilded light glints off the rippling surface. The whole canvas hums with the traffic of a great trading port at the height of its commercial confidence.",
        "source": "Canaletto, \"London: The Thames from Somerset House Terrace towards the City\" (c. 1750-51)",
        "href": "https://commons.wikimedia.org/wiki/File:Canaletto_-_London-_The_Thames_from_Somerset_House_Terrace_towards_the_City_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/uk-switzerland-services-trade-deal--a5.png",
          "alt": "A wide, sunlit view of the River Thames crowded with sailing vessels and barges, their masts rising like a forest before the distant dome of St Paul's and the spires of the City.",
          "credit": "Canaletto, \"London: The Thames from Somerset House Terrace towards the City\" (c. 1750-51) Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Mendelssohn's concert overture 'Calm Sea and Prosperous Voyage' traces a ship stilled in dead calm, then carried home on rising, favorable winds. It is a musical parable of exactly what a trade agreement promises: the removal of what becalms exchange, followed by a swift and prosperous passage. The UK-Switzerland deal aims to turn the traveller's and exporter's dead calm, the queue and the surcharge, into open water. As the music swells into its bright, arriving finale, it sounds like commerce reaching port. Mutual prosperity, scored for orchestra.",
        "excerpt": "The overture opens in an eerie, motionless hush, strings suspended over a windless sea, before a solo flute signals a freshening breeze. The orchestra gradually gathers momentum until it surges forward on full, glittering sail. It closes with fanfares of safe and joyful arrival in port.",
        "source": "Felix Mendelssohn, \"Calm Sea and Prosperous Voyage\" (Meeresstille und glückliche Fahrt), Op. 27.",
        "href": "https://imslp.org/wiki/Meeresstille_und_gl%C3%BCckliche_Fahrt,_Op.27_(Mendelssohn,_Felix)"
      }
    ],
    "rank": 17
  },
  {
    "slug": "erythrulose-interstellar-sugar",
    "headline": "Astronomers report the first detection of a true sugar, erythrulose, in interstellar space",
    "overview": "An international team led by researcher Izaskun Jimenez-Serra said it had detected erythrulose, a four-carbon sugar, in a molecular cloud near the center of the Milky Way, the first time a true sugar has been identified in interstellar space. Using ultrasensitive radio surveys from the Yebes and IRAM telescopes, the astronomers found the molecule in the cloud G+0.693-0.027, alongside simpler compounds thought to be its chemical precursors. The finding, published in Nature Astronomy, strengthens the idea that the molecular building blocks tied to life can form in space before planets do.",
    "genre": "Science",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMingFBVV95cUxNblN0Q0NkUlI5Sm5abFJvaVRZN3B0OXpLY0dkQWg0Nllna3JlRUQ4S3hqRGJ1dGZWeTQ2WHBuSTF5b2o2UU9iLVc5cWdSLThUVWlJZ2lMZU9aVVAzQjNsTjE5YzJyQ3pfM2tuT1A2VWZDanYtdEc1YVlYMU9DekVyVzYzOXE5bVprUkFLU1RfWU9xZkJQcDVidGFhRjZuQQ?oc=5"
      },
      {
        "name": "Scientific American",
        "href": "https://www.scientificamerican.com/article/scientists-spot-sugar-in-interstellar-space-for-the-first-time-ever/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-14",
    "image": {
      "src": "/covers/erythrulose-interstellar-sugar.png",
      "alt": "Composite image of the center of the Milky Way galaxy, glowing with clouds of gas and dust, where the erythrulose-bearing molecular cloud G+0.693-0.027 lies",
      "credit": "NASA, ESA, JPL-Caltech, CXC and STScI (public domain) via Wikimedia Commons"
    },
    "edition": "Morning Edition · 14 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Two thousand years before radio telescopes, Lucretius argued that everything we see is built from invisible \"seeds of things\" drifting and combining in an endless void. The detection of erythrulose in a cloud near the galactic center is almost a literal fulfillment of that intuition: a molecular seed of life's chemistry found scattered through interstellar space. Where Lucretius reasoned from pure philosophy that the cosmos is chemically fertile, astronomers now read that same fertility directly in the spectrum of a distant cloud. Ancient atomism imagined the building blocks; modern spectroscopy has begun to catch them in the act.",
        "excerpt": "This ultimate stock we have devised to name\nProcreant atoms, matter, seeds of things,\nOr primal bodies, as primal to the world.",
        "source": "Lucretius, De Rerum Natura (On the Nature of Things), Book I, trans. William Ellery Leonard.",
        "href": "https://www.gutenberg.org/files/785/785-h/785-h.htm"
      },
      {
        "category": "historical",
        "title": "In the 1800s the spectroscope revealed that the stars and nebulae are built from the very same chemical elements found on Earth, and Agnes Clerke chronicled how the heavens became \"celestial laboratories\" open to chemical study. Finding erythrulose — a sugar also present in raspberries and kiwis — in a molecular cloud is the direct heir of that revolution. The same trick of reading light for chemical fingerprints has advanced from identifying elements to identifying an actual sugar in space. What began as proof that the cosmos shares our elements now suggests it can also share our biochemistry.",
        "excerpt": "The sun, stars, and nebulæ form so many celestial laboratories, where the nature and mutual relations of the chemical 'elements' may be tried by more stringent tests than sublunary conditions afford.",
        "source": "Agnes M. Clerke, A Popular History of Astronomy During the Nineteenth Century.",
        "href": "https://www.gutenberg.org/files/28247/28247-h/28247-h.htm"
      },
      {
        "category": "literary",
        "title": "Whitman's speaker sits through an astronomer's lecture of \"proofs, the figures... charts and diagrams\" until, tired of the arithmetic, he wanders out to look up in silence at the stars. The erythrulose discovery lives entirely in that world of columns and measured spectral lines — a molecule confirmed by data, not by eye. Yet what those figures point to is precisely Whitman's wonder: the mystical night sky now revealed to hold the sweet ingredients of life itself. The poem holds both truths at once — the measuring and the marveling — just as this discovery does.",
        "excerpt": "When I heard the learn'd astronomer,\nWhen the proofs, the figures, were ranged in columns before me,\nWhen I was shown the charts and diagrams, to add, divide, and measure them,\nWhen I sitting heard the astronomer where he lectured with much applause in the lecture-room,\nHow soon unaccountable I became tired and sick,\nTill rising and gliding out I wander'd off by myself,\nIn the mystical moist night-air, and from time to time,\nLook'd up in perfect silence at the stars.",
        "source": "Walt Whitman, \"When I Heard the Learn'd Astronomer,\" Leaves of Grass.",
        "href": "https://en.wikisource.org/wiki/When_I_Heard_the_Learn%27d_Astronomer"
      },
      {
        "category": "literary",
        "title": "Dante ends his ascent through the spheres by glimpsing the single \"Love which moves the sun and the other stars\" — one ordering principle binding the whole cosmos to the smallest human longing. Detecting a sugar woven into a cloud near the galaxy's heart echoes that vision of a universe unified from the very large to the very small. The molecule of life turns out to be present in the machinery of the stars themselves, as if chemistry and cosmos were parts of one design. Dante reached this by mystical vision; astronomers now trace a faint version of the same connection in a radio spectrum.",
        "excerpt": "Here vigour failed the lofty fantasy:\nBut now was turning my desire and will,\nEven as a wheel that equally is moved,\nThe Love which moves the sun and the other stars.",
        "source": "Dante Alighieri, Paradiso, Canto XXXIII (closing lines), trans. Henry Wadsworth Longfellow.",
        "href": "https://en.wikisource.org/wiki/Divine_Comedy_(Longfellow_1867)/Volume_3/Canto_33"
      },
      {
        "category": "artistic",
        "title": "Van Gogh's swirling night sky turns the heavens into a living, churning field of light and motion, the stars ringed with halos of energy above a quiet town. It captures exactly the intuition behind this discovery: that the cosmos is not cold and inert but restless and generative, a place where things are made. The erythrulose finding gives that romantic vision a chemical basis — the turbulent clouds really are cauldrons brewing the molecules of life. Where Van Gogh painted the sky's fertility as feeling, spectroscopy now measures it as fact.",
        "excerpt": "A small dark village sleeps beneath a sky that will not hold still: enormous stars pulse inside glowing halos, a luminous crescent moon burns at the edge, and a great river of blue and white swirls across the night like a visible current of energy. A dark cypress reaches upward, joining earth to a heaven that seems alive with churning, creative force.",
        "source": "Vincent van Gogh, The Starry Night (1889), Museum of Modern Art; public domain via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/erythrulose-interstellar-sugar--a5.png",
          "alt": "Vincent van Gogh's The Starry Night: a swirling, luminous night sky with pulsing stars and a crescent moon over a sleeping village",
          "credit": "Vincent van Gogh, The Starry Night (1889), public domain via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Haydn's oratorio opens with a shadowy \"Representation of Chaos\" and then erupts into a blaze of sound at the words \"and there was Light,\" dramatizing raw matter resolving into an ordered, living world. The erythrulose discovery is a scientific verse of that same creation story — the disordered chemistry of a molecular cloud quietly assembling the sweet building blocks from which life can be built. Both works locate the origin of life not in a single miraculous instant but in the slow patient organizing of the cosmos. Haydn heard creation as music; astronomers now read one of its early chords in a sugar's spectral signature.",
        "excerpt": "Emerging from a hushed, groping orchestral fog that refuses to settle on any key, the oratorio gathers tension until the chorus breaks into a sudden, overwhelming C-major flood of sound on the word \"Light\" — the musical image of chaos giving way to a created, ordered universe. From there the score unfolds the shaping of heavens, seas, and living things as a rising hymn of cosmic fertility.",
        "source": "Joseph Haydn, Die Schöpfung (The Creation), Hob. XXI:2, full score via IMSLP.",
        "href": "https://imslp.org/wiki/Die_Sch%C3%B6pfung,_Hob.XXI:2_(Haydn,_Joseph)"
      }
    ],
    "rank": 18
  },
  {
    "slug": "fed-waller-rate-hike-warning",
    "headline": "Fed governor Christopher Waller says a rate hike may be needed if core inflation stays hot",
    "overview": "Federal Reserve Governor Christopher Waller said the central bank may need to tighten monetary policy in the near term if inflation data due this week come in hot again, calling policy at a 'crossroads.' Waller noted that core inflation had climbed from 3% in December to 3.4% by May and warned that price pressures appeared to be broadening through the economy. He cautioned that the Fed should not overreact, saying 'the desire to avoid past mistakes is often the author of new ones,' but signaled he would lean heavily on the coming consumer-price report.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMipAFBVV95cUxNaW0tUldZeEtOTXVXNFlST05jYjZUMzcxcVZQNl9MVXh3ZXltWVVUcUlMelA2OENsVmdtSDNqTUVBSTBNdEVpbzg3Q1E2N28wMVBlYlZCVS1SYU5XUkVuMUdtUzUwcEJrWmRDYVp2ajg3cHdXMnpHbHhfSHc4Z2VaNmpVZUNrLTFKY2hBdmFwNWt3b2xJdzdRYzFpbUMxSERsdmtTZQ?oc=5"
      },
      {
        "name": "CNBC",
        "href": "https://www.cnbc.com/2026/07/13/waller-says-fed-shouldnt-fight-the-last-war-on-inflation-but-warns-hikes-still-possible.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-14",
    "image": {
      "src": "/covers/fed-waller-rate-hike-warning.png",
      "alt": "Official Federal Reserve portrait of Governor Christopher J. Waller.",
      "credit": "Federal Reserve Board (public domain, U.S. federal government work) via Wikimedia Commons"
    },
    "edition": "Morning Edition · 14 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In 301 CE the emperor Diocletian, facing a debased coinage and prices spiraling out of control, issued his Edict on Maximum Prices to cap what merchants could charge. Its preamble rails against unrestrained greed as an evil the state must fence in with law, exactly the language of stewardship Waller now invokes at the Fed's \"crossroads.\" Where Diocletian tried to choke off runaway prices by decree, the modern central bank reaches instead for interest rates, warning it may have to tighten if core inflation stays hot. Both are attempts to impose discipline on money that has lost its footing. And both wrestle with the same fear: that rising prices punish ordinary people the state is meant to protect.",
        "excerpt": "When some expensiveness should arise (the gods forbid it!) the greed that could not be restrained, as if it ranged in fields spread over some limitless expanse, will be choked off by the limits of our statute and the boundaries of a moderating law.",
        "source": "Diocletian, Edict on Maximum Prices (preamble). Judaism and Rome (translation of Diocletian's Price Edict preamble, AE 1890, 66)",
        "href": "https://www.judaism-and-rome.org/preamble-diocletian%E2%80%99s-%E2%80%98edict-maximum-prices%E2%80%99-ae-1890-66"
      },
      {
        "category": "historical",
        "title": "Writing amid the inflationary chaos that followed the First World War, Keynes warned that debauching the currency was the surest way to unsettle the foundations of society. He described how continuing inflation lets governments quietly confiscate the wealth of their citizens, enriching some and impoverishing many at random. That is precisely the harm Waller cites when he stresses the cost of hot inflation to ordinary people and the discipline needed to tame it. Keynes framed sound money as a matter of social trust, not mere arithmetic. His century-old warning is the intellectual backdrop to a Fed governor threatening to hike rather than let prices run.",
        "excerpt": "Lenin is said to have declared that the best way to destroy the Capitalist System was to debauch the currency. By a continuing process of inflation, governments can confiscate, secretly and unobserved, an important part of the wealth of their citizens. By this method they not only confiscate, but they confiscate arbitrarily; and, while the process impoverishes many, it actually enriches some.",
        "source": "John Maynard Keynes, The Economic Consequences of the Peace. Project Gutenberg (The Economic Consequences of the Peace, 1919)",
        "href": "https://www.gutenberg.org/cache/epub/15776/pg15776.txt"
      },
      {
        "category": "literary",
        "title": "In the second part of Goethe's Faust, Mephistopheles rescues a bankrupt emperor by conjuring paper money, notes backed only by treasure still buried and unmined in the ground. The court rejoices as the printed slips flood the realm, a fable of currency created out of nothing that Goethe meant as a warning about debasement. Waller's caution stands on the opposite bank of that river: the central banker who fears exactly the illusion of easy money and may raise rates to defend the currency's worth. The scene dramatizes how quickly confidence in money can be manufactured, and how fragile it is. It is the temptation Waller warns the Fed must resist.",
        "excerpt": "To all to whom this cometh, be it known: / A thousand crowns in worth this note doth own. / It to secure, as certain pledge, shall stand / All buried treasure in the Emperor's land: / And 'tis decreed, perfecting thus the scheme, / The treasure, soon as raised, shall this redeem.",
        "source": "Goethe, Faust, Part Two (Act I, the paper-money scene). Internet Archive (Faust: The Second Part, tr. Bayard Taylor, 1871)",
        "href": "https://archive.org/download/goethetaylorfaust02/goethetaylorfaust02_djvu.txt"
      },
      {
        "category": "literary",
        "title": "In The Frogs, Aristophanes likens Athens' treatment of its citizens to its coinage, lamenting that the city hoards its pure, full-weight silver and circulates cheap debased tokens instead. It is one of the oldest literary statements of what economists later called Gresham's law, that bad money drives out good. The image speaks directly to Waller's worry about hot inflation eroding the value of the dollar people hold. Where Aristophanes mourned sterling coin driven from use by base metal, the Fed governor warns against letting sound money slide into something worth less. The comedy's ancient complaint about debasement is the same anxiety that now argues for tightening.",
        "excerpt": "Often has it crossed my fancy, that the city loves to deal / With the very best and noblest members of her commonweal, / Just as with our ancient coinage, and the newly-minted gold. / Yea for these, our sterling pieces, all of pure Athenian mould, / All of perfect die and metal, all the fairest of the fair ... / These we use not: but the worthless pinchbeck coins of yesterday, / Vilest die and basest metal, now we always use instead.",
        "source": "Aristophanes, The Frogs (parabasis). Project Gutenberg (The Frogs, tr. B. B. Rogers)",
        "href": "https://www.gutenberg.org/cache/epub/7998/pg7998.txt"
      },
      {
        "category": "artistic",
        "title": "Quentin Matsys painted a Flemish moneylender weighing gold coins on a delicate balance while his wife, a devotional book open before her, is drawn from prayer to the glinting metal. The painting is a meditation on the pull between material value and moral judgment, on the honest weighing of money as both a literal and ethical act. Waller's warning about defending the currency's worth is a modern version of that scale: the steward who must weigh prudence against panic. The careful balance in the moneylender's hands mirrors a central bank calibrating whether the moment calls for restraint. It is an image of value measured with painstaking, almost sacred, exactness.",
        "excerpt": "A moneychanger sits at his table delicately balancing gold coins on a small scale, every glint of metal rendered with jeweler's precision. Beside him his wife turns the page of an illuminated prayer book, yet her eyes drift toward the shining money and the scale's fragile equilibrium. A convex mirror in the foreground reflects a distant window, quietly asking the viewer to weigh worldly wealth against the spiritual.",
        "source": "Quentin Matsys, The Moneylender and His Wife (1514). Wikimedia Commons (public domain, Quentin Matsys, 1514)",
        "href": "https://commons.wikimedia.org/wiki/File:Quentin_Massys_001.jpg",
        "image": {
          "src": "/covers/fed-waller-rate-hike-warning--a5.png",
          "alt": "A moneychanger sits at his table delicately balancing gold coins on a small scale, every glint of metal rendered with jeweler's precision.",
          "credit": "Quentin Matsys, The Moneylender and His Wife (1514). Wikimedia Commons (public domain, Quentin Matsys, 1514)"
        }
      },
      {
        "category": "artistic",
        "title": "Wagner's Das Rheingold opens with pure gold resting untouched beneath the Rhine, until the dwarf Alberich renounces love to seize it and forge a ring of limitless power. The opera turns on the corruption that follows once gold is torn from its natural order and hoarded for domination, a myth of value debased by greed. It resonates with the themes behind Waller's warning: the discipline of hard money, and the ruin that follows when its integrity is abandoned. Where Wagner's gods and dwarves grasp for a cursed treasure, the central banker frames sound money as a trust that must be guarded against overreach. The score sounds the ancient dread of what happens when the measure of wealth is defiled.",
        "excerpt": "From the river's shimmering depths the orchestra builds a single swelling E-flat chord, as if watching sunlight strike the untouched Rhinegold. The Rhinemaidens' voices ripple over the water in innocent play, until Alberich's harsh motif intrudes and the music darkens with the theft and the curse to come. The gold's radiant leitmotif and the grinding menace that overtakes it dramatize, in sound, the corruption of pure value into instrument of power.",
        "source": "Richard Wagner, Das Rheingold, WWV 86A (1869). IMSLP (public domain score, Das Rheingold)",
        "href": "https://imslp.org/wiki/Das_Rheingold,_WWV_86A_(Wagner,_Richard)"
      }
    ],
    "rank": 19
  },
  {
    "slug": "ecuador-fito-brother-killed",
    "headline": "Gunmen disguised as police kill David Macias, brother of extradited Ecuadorean drug lord 'Fito,' on the Pacific coast",
    "overview": "David Macias, 35, a regional leader of Ecuador's Los Choneros gang and brother of its jailed former boss Adolfo 'Fito' Macias, was shot dead by men dressed as police officers who forced their way into his rented home in the coastal town of Olon. The killing, in the early hours of Sunday, was the latest blow to Los Choneros after the extradition of Fito to the United States last year and the arrest of another brother in Colombia last month. The gunmen fled and no arrests have been announced.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c20yx84g103o"
      },
      {
        "name": "The Star",
        "href": "https://www.the-star.co.ke/news/world/2026-07-13-men-disguised-as-cops-kill-ecuadorean-drug-lords-brother"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-14",
    "image": {
      "src": "/covers/ecuador-fito-brother-killed.png",
      "alt": "Adolfo Macias, alias 'Fito', former leader of Ecuador's Los Choneros gang and brother of the slain David Macias.",
      "credit": "EPA via BBC News"
    },
    "edition": "Morning Edition · 14 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "When the Second Triumvirate posted its proscription lists, a man's blood relations became a death sentence in themselves. Marcus Cicero and his brother Quintus fled together, marked purely for who they were, before parting on the road that would kill them both. Quintus was betrayed by his own household and cut down beside his son, just as David Macias was hunted for the name he shared with 'Fito'. The oldest lesson of the proscription is the one Olon has just relearned: when a dynasty falls, the killers come next for the kin.",
        "excerpt": "They were conveyed in litters, being worn out by grief; and halting by the way and placing their litters side by side they lamented to one another. ... embracing one another with tears they separated. Now Quintus, not many days after, was betrayed by his slaves to those who were in search of him and put to death with his son.",
        "source": "The Roman proscriptions and the death of Cicero's brother Quintus (Plutarch, Life of Cicero, trans. George Long). Project Gutenberg — Plutarch's Lives, Volume 4.",
        "href": "https://www.gutenberg.org/cache/epub/44315/pg44315.txt"
      },
      {
        "category": "historical",
        "title": "In a Chicago garage the men who wiped out Bugs Moran's crew wore police uniforms and flashed badges, so that murder looked to a neighbour like a routine arrest. The disguise let the killers control the room before a single shot was fired, exactly as men dressed as officers walked into David Macias' home on the Pacific coast. Both scenes belong to a war between rival syndicates for control of a lucrative trade. And both show the same treachery: the uniform of the law turned into the costume of the assassin.",
        "excerpt": "\"Two men in uniforms had rifles or shotguns as they came out the door,\" she said, \"and there were two or three men walking ahead of them with their hands in the air. It looked as though the police were making an arrest, and they all got into an automobile and drove away.\"",
        "source": "The St. Valentine's Day Massacre, Chicago, 14 February 1929 (contemporary eyewitness account, Chicago Tribune, 15 February 1929). Chicagology — The St. Valentine's Day Massacre.",
        "href": "https://chicagology.com/notorious-chicago/stvalentinesmassacre/"
      },
      {
        "category": "literary",
        "title": "Aeschylus built his trilogy on the idea that a house steeped in blood cannot stop the bleeding, because each killing summons the next avenger. 'The slayer of to-day shall die to-morrow' is a precise account of a gang feud that has already taken one Macias brother to a U.S. jail and another to a grave. The Choneros and their rivals are the children of a curse none of them can escape. Their coastal mansions are only the modern halls of high estate on which the clinging grasp of fate closes.",
        "excerpt": "Lo! sin by sin and sorrow dogg'd by sorrow—\nAnd who the end can know?\nThe slayer of to-day shall die to-morrow—\nThe wage of wrong is woe.\n...\nOn him that wrought shall vengeance be outpoured—\nThe tides of doom return.\nThe children of the curse abide within\nThese halls of high estate—\nAnd none can wrench from off the home of sin\nThe clinging grasp of fate.",
        "source": "Aeschylus, Agamemnon (from The House of Atreus, trans. E. D. A. Morshead). Project Gutenberg — The House of Atreus.",
        "href": "https://www.gutenberg.org/cache/epub/8604/pg8604.txt"
      },
      {
        "category": "literary",
        "title": "Unable to reach Macduff himself, Macbeth sends hired killers to force their way into his home and slaughter the family he left behind. The murderers burst in on the wife and children and put them to the sword in their own rooms, punishing them for a bond of blood rather than any deed. It is the same logic that sent gunmen into a rented house in Olon to kill 'Fito's' brother while the boss sat in a cell abroad. Shakespeare knew that when tyrants and warlords cannot strike the man, they strike his kin at the hearth.",
        "excerpt": "FIRST MURDERER. He's a traitor.\nSON. Thou liest, thou shag-ear'd villain!\nFIRST MURDERER. What, you egg! [Stabbing him.] Young fry of treachery!\nSON. He has kill'd me, mother: Run away, I pray you!",
        "source": "William Shakespeare, Macbeth, Act IV, Scene ii (the murderers sent to Macduff's castle). Project Gutenberg — Macbeth.",
        "href": "https://www.gutenberg.org/cache/epub/1533/pg1533.txt"
      },
      {
        "category": "artistic",
        "title": "David painted a leader killed at home by a visitor who gained entry under false pretences, exactly the treachery that let disguised gunmen through David Macias' door. Corday used a petitioner's letter as her disguise the way the Olon assassins used police uniforms. The scene is quiet, intimate and domestic, the violence delivered in the one place a man believes he is safe. It is the visual grammar of the ambush that consumes those who live by the knife or the gun.",
        "excerpt": "The revolutionary Jean-Paul Marat slumps dead in his bath, quill still in one hand and the assassin's letter of introduction in the other, the water darkened with blood. Charlotte Corday had won entry to his private room by pretending to bring information, then struck once he was disarmed by trust. David turns a political murder in a domestic setting into a still, almost sacred image of betrayal.",
        "source": "Jacques-Louis David, The Death of Marat (1793). Wikimedia Commons — Death of Marat by David.",
        "href": "https://commons.wikimedia.org/wiki/File:Death_of_Marat_by_David.jpg",
        "image": {
          "src": "/covers/ecuador-fito-brother-killed--a5.png",
          "alt": "The revolutionary Jean-Paul Marat slumps dead in his bath, quill still in one hand and the assassin's letter of introduction in the other, the water darkened with blood.",
          "credit": "Jacques-Louis David, The Death of Marat (1793). Wikimedia Commons — Death of Marat by David."
        }
      },
      {
        "category": "artistic",
        "title": "Il trovatore is opera's great study of a vendetta that binds brother to brother in death without either fully knowing it. Azucena's hunger for revenge sets in motion a cycle that ends only when the Count destroys the sibling he was fated to destroy. That is the machinery now grinding through the Macias family, where one brother's power dooms the others one by one. Verdi scores in music what the Choneros war spells in blood: those who live by vengeance are consumed by it.",
        "excerpt": "Verdi's opera drives toward a fatal secret: the vengeful Count di Luna sends his rival Manrico to the executioner's block, only to be told by the gypsy Azucena that the man he has just killed was his own brother. A mother's cry for vengeance echoes across a generation until it closes, as a blood feud must, on kin destroying kin. The final chords land as the Count realises the revenge he engineered has devoured his own blood.",
        "source": "Giuseppe Verdi, Il trovatore (1853). IMSLP — Il trovatore (Verdi, Giuseppe)",
        "href": "https://imslp.org/wiki/Il_trovatore_(Verdi,_Giuseppe)"
      }
    ],
    "rank": 20
  },
  {
    "slug": "ice-agent-kills-colombian-maine",
    "headline": "A Colombian national is killed by a U.S. immigration agent during an operation in Maine",
    "overview": "A Colombian man was shot and killed by an Immigration and Customs Enforcement officer during an operation in Maine, the agency said, adding that the officer had been 'fearing for public safety.' The death came less than a week after an undocumented migrant was fatally shot by an immigration agent in Houston, intensifying scrutiny of the use of force in the Trump administration's stepped-up deportation campaign. Local officials and immigrant-rights groups demanded an independent investigation.",
    "genre": "Politics",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c2ly580kxnko"
      },
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMimgFBVV95cUxPMkctXzZKbXA0N0pNVGw1Ykt1NjNHMHBCZFluRWE1Q0RMVUZ0cERwOHpZNklyWTZIN0dMc2IzSDdRZC0xMmpnTGRidFFwcldRNkhMNTlxcDFGSlBTV09SZkNzMzJFeWMyV0g2YkNpSGpBR3B1dzJiczFEcGZESG5HNGN6OFZnUEVTam9zZzFUUjhvN3BodzdpNnVB?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-14",
    "image": {
      "src": "/covers/ice-agent-kills-colombian-maine.png",
      "alt": "U.S. Immigration and Customs Enforcement (ICE) Enforcement and Removal Operations officers during an enforcement action in Chicago, January 2025",
      "credit": "U.S. Immigration and Customs Enforcement (ICE), public domain (federal government work) via Wikimedia Commons"
    },
    "edition": "Morning Edition · 14 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In Homer's world the arriving stranger is sacred, placed under the protection of Zeus himself, and the measure of a people is how it receives the shipwrecked wanderer at its shore. Nausicaa answers her frightened maids by insisting the stranger and the poor are heaven-sent guests, not threats to be repelled. The Colombian man killed in Maine stood at exactly that threshold, an outsider arriving among strangers. The ancient duty of xenia asked for shelter and food; the modern encounter answered with a gun.",
        "excerpt": "By Jove the stranger and the poor are sent; / And what to those we give to Jove is lent.",
        "source": "Homer, The Odyssey, Book VI (Alexander Pope translation)",
        "href": "https://www.gutenberg.org/ebooks/3160"
      },
      {
        "category": "historical",
        "title": "When armed agents of the state killed civilians on a Boston street, the young republic did not simply accept the soldiers' account that they had fired in fear. John Adams demanded that passion and politics yield to evidence, that the killing be tried on facts alone. The Maine shooting, with its official claim that the officer feared for public safety against a man who was not even the target of the warrant, raises the same old question of who fired and why. Adams' warning insists that fear cannot be its own acquittal, and that lethal force by authority must answer to the record.",
        "excerpt": "Facts are stubborn things; and whatever may be our wishes, our inclinations, or the dictates of our passions, they cannot alter the state of facts and evidence.",
        "source": "John Adams, defense argument at the Boston Massacre soldiers' trial (1770), in Frederic Kidder, History of the Boston Massacre (1870)",
        "href": "https://archive.org/details/cu31924076622731"
      },
      {
        "category": "literary",
        "title": "Lazarus imagined the nation as a Mother of Exiles lifting a lamp beside a golden door, calling the tired and the poor toward welcome rather than warning. Her sonnet became the country's own account of itself, the promise inscribed on the pedestal that greets arrivals. A Colombian man authorized to work, shot dead during a deportation sweep, marks the distance between that promise and the operation in Maine. The poem reads now as both invitation and indictment, measuring the golden door against the drawn weapon.",
        "excerpt": "Give me your tired, your poor, / Your huddled masses yearning to breathe free, / The wretched refuse of your teeming shore. / Send these, the homeless, tempest-tost to me, / I lift my lamp beside the golden door!",
        "source": "Emma Lazarus, \"The New Colossus\" (1883)",
        "href": "https://en.wikisource.org/wiki/The_New_Colossus"
      },
      {
        "category": "literary",
        "title": "Old and exiled, Oedipus arrives on foreign ground as a wanderer with no standing but his need, begging the natives not to scorn him for being a stranger. His safety hangs entirely on whether the citizens will honor the suppliant or drive him off. The migrant in Maine occupied the same fragile ground, a stranger whose fate turned on the discretion of those with power over him. Sophocles frames the encounter as a test of the community's mercy, and here the test ended in death rather than sanctuary.",
        "excerpt": "Now in God's name, O stranger, scorn me not / As a wayfarer; tell me what I crave.",
        "source": "Sophocles, Oedipus at Colonus (F. Storr translation)",
        "href": "https://www.gutenberg.org/ebooks/31"
      },
      {
        "category": "artistic",
        "title": "Brown painted emigration not as adventure but as raw vulnerability, two people cast onto the water with everything they love at their backs. That mixture of hope and fear is the same freight the Colombian man carried into Maine, the ordinary human gamble of seeking a life across a border. The painting's tight frame closes in on the migrants until their exposure is inescapable. It asks the viewer to see the person before the category, the face before the file.",
        "excerpt": "A young emigrant couple sits huddled at the rail of a departing ship, wrapped against the cold sea spray, the white cliffs of their homeland receding behind them. The woman clasps a baby's hand hidden beneath her cloak while the man stares outward with a set, anxious face, the whole scene ringed by a circular frame that holds them like a locket. It is the migrant's leap into the unknown rendered as tenderness and dread at once, the precise moment a person becomes a stranger bound for another nation.",
        "source": "Ford Madox Brown, \"The Last of England\" (1855)",
        "href": "https://commons.wikimedia.org/wiki/File:Ford_Madox_Brown_-_The_Last_of_England_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/ice-agent-kills-colombian-maine--a5.png",
          "alt": "A young emigrant couple sits huddled at the rail of a departing ship, wrapped against the cold sea spray, the white cliffs of their homeland receding behind them.",
          "credit": "Ford Madox Brown, \"The Last of England\" (1855) Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Dvorak composed his New World symphony as an outsider who found both wonder and loneliness in America, translating the immigrant's divided heart into sound. Its central Largo is the ache of someone far from home, the very condition of the man killed in Maine. The music holds the New World's promise and its melancholy in a single breath. Heard against this event, its longing turns to lament for a life that reached the new land and did not survive it.",
        "excerpt": "Written by a homesick Czech immigrant in America, the symphony aches with the pull between a distant homeland and a strange new land, its famous Largo unfolding as a slow, plaintive melody that sounds like exile set to music. Restless first-movement rhythms surge with the energy and unease of arrival, then dissolve into longing. The whole work is the sound of a stranger listening for home across an ocean.",
        "source": "Antonin Dvorak, Symphony No. 9 in E minor, Op. 95, \"From the New World\" (1893)",
        "href": "https://imslp.org/wiki/Symphony_No.9,_Op.95_(Dvo%C5%99%C3%A1k,_Anton%C3%ADn)"
      }
    ],
    "rank": 21
  },
  {
    "slug": "china-detains-us-seismologist",
    "headline": "China is holding a U.S. seismologist who studied North Korean nuclear tests, facing trial on spying charges",
    "overview": "A Chinese-born American seismologist, Youlin Chen, has been detained in China for nearly two years and faces trial on spying charges, according to a Reuters report, after publishing U.S.-funded research on detecting North Korean nuclear tests. Secretary of State Marco Rubio in March designated Chen, 54, as 'wrongfully detained,' making his release a priority, though Washington had held back a public announcement to allow for quiet diplomacy. The case adds a fresh irritant to a U.S.-China relationship the Trump administration is trying to keep steady after last year's trade war.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiuAFBVV95cUxPM2RCTlAtbmVLSG1sQjJCblpURk9nQ2JPWFpoR1dKNWJxQVVZNGpRM1hGSEFKa1VQQy14UnhtcTFOeGswVUhFQXJ3ZWRyekU4NXNzaWhPY2xyN0JoYVg3bnFXTURPSHUyYTZEOUZOWDdIQmZMTVlKV0RHU19qNjRwUDM4NFVZRVp0YnBETnhwWkxKVkpEMHpEY0ZKNEFqdzFQNjlFRE5uMUNyT2hvSXZvc2Q2Q2lIT0l1?oc=5"
      },
      {
        "name": "Yahoo News",
        "href": "https://www.yahoo.com/news/politics/articles/exclusive-china-detains-us-seismologist-194844059.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-14",
    "image": {
      "src": "/covers/china-detains-us-seismologist.png",
      "alt": "A seismogram tracing showing the P-wave and S-wave arrivals of a seismic event, the kind of ground-motion record used to detect and characterize underground nuclear tests.",
      "credit": "Seismogram by Crickett (English Wikipedia), via Wikimedia Commons; released for free use by the copyright holder."
    },
    "edition": "Morning Edition · 14 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Boethius was a learned Roman official who, having served the state, found himself accused of conspiracy and condemned to die far from home without a hearing. Like Youlin Chen, he was a man of knowledge suddenly recast as an enemy of the power he had lived under. His complaint that he was punished \"unheard and undefended\" mirrors a secret trial in which the defendant cannot answer the charges. His prison became the place where a scholar's mind was treated as a threat to the regime.",
        "excerpt": "Now for my too great zeal towards the senate I have been condemned to outlawry and death, unheard and undefended, at a distance of near five hundred miles away.",
        "source": "Boethius, \"The Consolation of Philosophy\" (c. 524 AD), written in prison at Pavia while awaiting execution on charges of treasonous conspiracy against Theodoric. Project Gutenberg.",
        "href": "https://www.gutenberg.org/cache/epub/14328/pg14328.txt"
      },
      {
        "category": "historical",
        "title": "Galileo was compelled by a tribunal to renounce, under threat, the very research that defined his life's work. His case is the archetype of knowledge itself being prosecuted as a crime against the state's authority. Youlin Chen's published seismic science, funded to detect nuclear tests, has likewise been reframed by a government as espionage. In both, a scientist's data becomes evidence in a trial he never expected to face.",
        "excerpt": "I abjure, curse, and detest the aforesaid errors and heresies, and generally every other error, heresy, and sect whatsoever contrary to the said Holy Church.",
        "source": "Galileo Galilei's forced abjuration before the Roman Inquisition, 22 June 1633, for his scientific findings on the motion of the Earth. Famous Trials (Douglas O. Linder)",
        "href": "https://famous-trials.com/galileotrial/1020-recantation"
      },
      {
        "category": "literary",
        "title": "Byron's prisoner ages and withers not from time but from the slow ruin of captivity. The poem captures how imprisonment erodes the body and spirit of a person held for what he represents to those in power. Reports describe Chen losing thirty to forty pounds and being denied medication across nearly two years in detention. Byron's \"vile repose\" is the same grinding stillness of a cell that consumes a captive far from home.",
        "excerpt": "My hair is grey, but not with years,\nNor grew it white\nIn a single night,\nAs men's have grown from sudden fears:\nMy limbs are bowed, though not with toil,\nBut rusted with a vile repose,\nFor they have been a dungeon's spoil,\nAnd mine has been the fate of those",
        "source": "Lord Byron, \"The Prisoner of Chillon\" (1816), a narrative poem on the long confinement of François Bonivard in a lakeside dungeon. Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_Works_of_Lord_Byron_(ed._Coleridge,_Prothero)/Poetry/Volume_4/The_Prisoner_of_Chillon"
      },
      {
        "category": "literary",
        "title": "Socrates stood before the Athenian court accused of corrupting the city, his inquiry and teaching turned into a capital charge. His trial is the enduring image of the individual crushed between his own conscience and the machinery of the state. Youlin Chen, a single scientist, has become a bargaining chip between two great powers who value him more as leverage than as a man. Socrates' words insist that the real injustice lies not in the prisoner's fate but in the wrong done to him.",
        "excerpt": "The difficulty, my friends, is not to avoid death, but to avoid unrighteousness; for that runs faster than death.",
        "source": "Plato, \"Apology\" (the trial and defense of Socrates), Benjamin Jowett translation. Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/1656/1656-h/1656-h.htm"
      },
      {
        "category": "artistic",
        "title": "David's canvas freezes the instant a scholar accepts punishment rather than surrender his convictions, the state's authority pressing in from the darkness. It renders visible the same collision Youlin Chen embodies: an intellectual held captive because his knowledge unsettles those who govern. The serene captive amid mourning companions evokes a man detained far from a family that can only wait. The painting turns a courtroom verdict into an image of the individual set against the power that would erase him.",
        "excerpt": "David paints Socrates upright on his prison bed, reaching for the cup of hemlock while still lecturing, his finger raised toward the heavens as grief-stricken disciples recoil around him. Light falls sharply on the philosopher's calm, defiant body while his jailer and the shadowed cell close in from the edges. It is the portrait of a thinker condemned by the state yet unbroken, his mind lucid even as power moves to silence him.",
        "source": "Jacques-Louis David, \"The Death of Socrates\" (1787), oil on canvas, The Metropolitan Museum of Art. Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:David_-_The_Death_of_Socrates.jpg",
        "image": {
          "src": "/covers/china-detains-us-seismologist--a5.png",
          "alt": "David paints Socrates upright on his prison bed, reaching for the cup of hemlock while still lecturing, his finger raised toward the heavens as grief-stricken disciples recoil around him.",
          "credit": "Jacques-Louis David, \"The Death of Socrates\" (1787), oil on canvas, The Metropolitan Museum of Art. Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Fidelio is the great musical protest against secret, unjust detention, its hero hidden in a dungeon because of what he dared to know. The Prisoners' Chorus gives voice to captives who taste light for a moment before being shut away again, an image of a detainee whose release remains just out of reach. Chen, designated wrongfully detained, is the modern Florestan awaiting rescue through diplomacy rather than a lone heroine. Beethoven's music insists that such prisoners are not forgotten and that their freedom is a moral cause.",
        "excerpt": "In the Prisoners' Chorus, captives are briefly let out into the daylight and sing in hushed wonder of freedom and air, voices swelling and then fearfully falling as the guards return them to darkness. The whole opera turns on Florestan, a man locked away in secret by a powerful enemy for what he knew, and on the devotion that refuses to abandon him. Beethoven makes political imprisonment audible as both a cry against tyranny and a hymn to the loyalty that keeps searching for the disappeared.",
        "source": "Ludwig van Beethoven, \"Fidelio,\" Op. 72 (final version 1814) — the Prisoners' Chorus \"O welche Lust,\" and the opera's story of Leonore rescuing her wrongfully imprisoned husband Florestan. IMSLP / Petrucci Music Library.",
        "href": "https://imslp.org/wiki/Fidelio,_Op.72_(Beethoven,_Ludwig_van)"
      }
    ],
    "rank": 22
  },
  {
    "slug": "judge-trump-irs-lawsuit-improper",
    "headline": "A federal judge finds a Trump IRS lawsuit was filed for an 'improper purpose' and refers a lawyer for possible discipline",
    "overview": "A federal judge ruled that a lawsuit brought by the Trump administration touching the Internal Revenue Service was filed for an 'improper purpose' and referred a government lawyer for possible disciplinary action, a rare rebuke of the administration's use of the courts. The judge found the case misused the judicial process, according to court filings reported by news agencies. The decision adds to a series of clashes between the administration and federal judges over the aggressive legal tactics it has pursued.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMikgFBVV95cUxNd25adDEyakJVZHRUVFFOdzJRbE9RYVFRTFRVeExWb2ZydFVsNVJPalhqVmFjaHROckNza2NBd0NVeDlJbHlET1l4ZW5hNXl4U1duOTd3ZGFOVDVTU1lCUm9RQVVOY3ZuZlYzZ3JCUGk1QVg4aTdpZWEzNGpOd0ZoT2xNeUF3WWdhV3dWbjBQazF2Zw?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiiwFBVV95cUxNdjhWLThSQkhTLVV3c3o2ZWRyYm1KVjROOWxHWU9KNjg1S2NwYlFzcXhCSE5QeU5BTkIzR3daU1JRWkNkNW1YaHVaNnFneWVaa2hlTjRPREpVTzFHanhXYmRHd0tYNnoxRVJMbjBOUVdaRHVQSXF5UFVJT0FxbjNMOW1pMUFLMW1pQXlz?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-14",
    "image": {
      "src": "/covers/judge-trump-irs-lawsuit-improper.png",
      "alt": "Honore Daumier lithograph from the series 'Les Gens de Justice,' satirizing lawyers and the machinery of a French courtroom.",
      "credit": "Honore Daumier, 'Les Gens de Justice' (c. 1845-1848). Public domain, via Wikimedia Commons."
    },
    "edition": "Morning Edition · 14 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Eight centuries before this ruling, Magna Carta bound the crown itself to the principle that justice may not be sold, denied, or delayed for any person. When a federal judge found the administration's IRS suit was filed for an 'improper purpose,' the judge was enforcing that same ancient promise: the machinery of law may not be perverted to serve power. The clause is a vow that right belongs to the governed, not to whoever holds office. The rebuke of a government lawyer echoes the charter's insistence that even the sovereign's servants answer to the law.",
        "excerpt": "To no one will we sell, to no one will we refuse or delay, right or justice.",
        "source": "Magna Carta, clause 40 (1215). The Avalon Project, Yale Law School.",
        "href": "https://avalon.law.yale.edu/medieval/magna.asp"
      },
      {
        "category": "historical",
        "title": "In Marbury v. Madison, Chief Justice Marshall claimed for the courts the authority to say what the law is, cementing the judiciary as a check on the other branches. The judge here exercised precisely that power, declaring that a lawsuit brought by the executive was an abuse of process rather than a legitimate use of it. Marshall's principle is why a single trial judge can tell an administration that its litigation crossed a line. The referral of a lawyer for discipline shows the courts not merely interpreting the law but defending its integrity.",
        "excerpt": "It is emphatically the province and duty of the judicial department to say what the law is. Those who apply the rule to particular cases, must of necessity expound and interpret that rule.",
        "source": "Marbury v. Madison, 5 U.S. 137 (1803), opinion of Chief Justice John Marshall. Legal Information Institute, Cornell Law School.",
        "href": "https://www.law.cornell.edu/supremecourt/text/5/137"
      },
      {
        "category": "literary",
        "title": "In the trial scene of The Merchant of Venice, Portia lets a bad-faith litigant press his claim to its literal edge, then turns the law's own strictness against him. Shylock came to court to weaponize a contract; the bench answers that the very law he invokes forbids what he seeks. So too the federal judge found the administration's IRS suit was a misuse of legal process and turned the court's authority back on the party that abused it. The scene dramatizes the reckoning that awaits those who wield the law in bad faith.",
        "excerpt": "Tarry a little; there is something else.\nThis bond doth give thee here no jot of blood;\nThe words expressly are 'a pound of flesh:'\nTake then thy bond, take thou thy pound of flesh;\nBut, in the cutting it, if thou dost shed\nOne drop of Christian blood, thy lands and goods\nAre, by the laws of Venice, confiscate\nUnto the state of Venice.",
        "source": "William Shakespeare, The Merchant of Venice, Act 4, Scene 1 (Portia). The Complete Works of William Shakespeare (MIT)",
        "href": "https://shakespeare.mit.edu/merchant/merchant.4.1.html"
      },
      {
        "category": "literary",
        "title": "Dickens's Jarndyce and Jarndyce is his indictment of a legal system consumed by process detached from justice. The endless suit shows how courts can be turned into instruments of exhaustion and self-interest rather than truth. The judge's finding of an 'improper purpose' names that same corruption: litigation launched not to resolve a wrong but to serve an ulterior end. The referral of a lawyer for discipline is the check that Dickens's fictional Chancery never received.",
        "excerpt": "Jarndyce and Jarndyce drones on. This scarecrow of a suit has, in course of time, become so complicated that no man alive knows what it means.",
        "source": "Charles Dickens, Bleak House, Chapter 1 ('In Chancery'). Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/1023/1023-h/1023-h.htm"
      },
      {
        "category": "artistic",
        "title": "Painted in the 1760s, Gandolfi's figure embodies the impartial power a judge is meant to wield. The scales are the weighing of a lawsuit's true purpose; the sword is the authority to sanction those who abuse the court. In finding the IRS suit improper and referring a lawyer for discipline, the judge acted out this allegory of justice that both measures and enforces. The image is a reminder that judicial power is legitimate only when it stays blind to who stands before it.",
        "excerpt": "Gandolfi personifies Justice as a serene, commanding woman who holds the scales in one hand and the sword in the other, her gaze steady and impartial. The scales weigh each side without favor; the sword stands ready to enforce the verdict. Light falls on her as though truth itself illuminates the judgment.",
        "source": "Gaetano Gandolfi, 'Allegory of Justice' (1760s). Wikimedia Commons (public domain)",
        "href": "https://commons.wikimedia.org/wiki/File:Gandolfi_-_Allegory_of_Justice.jpg",
        "image": {
          "src": "/covers/judge-trump-irs-lawsuit-improper--a5.png",
          "alt": "Gandolfi personifies Justice as a serene, commanding woman who holds the scales in one hand and the sword in the other, her gaze steady and impartial.",
          "credit": "Gaetano Gandolfi, 'Allegory of Justice' (1760s). Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Verdi's setting of the day of judgment captures the gravity of a court calling the powerful to account. The 'improper purpose' ruling is a smaller, earthly version of that reckoning: a moment when misuse of the law is named and answered. The referral of the government lawyer is the judgment falling on a specific actor rather than an abstraction. Verdi reminds us that justice, when it finally speaks, is meant to be felt.",
        "excerpt": "Verdi's 'Dies irae' erupts with hammering chords, thundering bass drum, and a chorus crying out the day of wrath and reckoning. He turns the ancient text on the day of judgment into overwhelming sound, a tribunal from which nothing is hidden and no deed goes unweighed. The music is terror and majesty at once, the moment when accounts come due.",
        "source": "Giuseppe Verdi, Messa da Requiem, 'Dies irae' (1874). IMSLP / Petrucci Music Library (public domain)",
        "href": "https://imslp.org/wiki/Requiem_(Verdi,_Giuseppe)"
      }
    ],
    "rank": 23
  },
  {
    "slug": "1x-neo-dexterous-robot-hand",
    "headline": "Robotics firm 1X unveils a tendon-driven humanoid hand it says can match or surpass human dexterity",
    "overview": "The robotics company 1X Technologies revealed a new 25-degree-of-freedom, tendon-driven hand for its Neo humanoid robot, saying it was built to 'match or surpass human capability across every dimension that matters.' Featured by design magazine Dezeen, the hand uses fingertip tactile sensors and roughly human-level grip strength to perform fine tasks such as assembling Lego, spinning in a light bulb and plugging in a USB-C cable. The company said it had set up a California production line with capacity for 10,000 units a year and would begin shipping in 2026.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Dezeen",
        "href": "https://www.dezeen.com/2026/07/13/1x-technologies-neo-robot-hand/"
      },
      {
        "name": "Forbes",
        "href": "https://www.forbes.com/sites/johnkoetsier/2026/07/09/human-level-hands-1x-just-gave-humanoid-robot-neo-something-close/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-14",
    "image": {
      "src": "/covers/1x-neo-dexterous-robot-hand.png",
      "alt": "A close-up of 1X Technologies' new tendon-driven Neo humanoid robot hand",
      "credit": "1X Technologies"
    },
    "edition": "Morning Edition · 14 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Nearly 2,400 years ago Aristotle called the human hand the tool that lets us wield every other tool. 1X's tendon-driven hand is an engineered attempt to reproduce that universal capability in metal and cord. By packing 25 degrees of freedom and fingertip touch into a manipulator meant to grasp almost anything a person can, the company is chasing the oldest definition of what makes the hand special. The dream of copying the tool of tools is now a factory line rated at 10,000 units a year.",
        "excerpt": "It follows that the soul is analogous to the hand; for as the hand is a tool of tools, so the mind is the form of forms and sense the form of sensible things.",
        "source": "Aristotle, On the Soul (De Anima), Book III, ch. 8 (4th century BC). Aristotle, On the Soul (trans. J. A. Smith), MIT Internet Classics Archive.",
        "href": "https://classics.mit.edu/Aristotle/soul.3.iii.html"
      },
      {
        "category": "historical",
        "title": "In 1920 Karel Capek's play gave the world the word robot and its founding anxiety: workers manufactured to labour and nothing else. Capek's engineer strips away everything unnecessary in a person to build the cheapest possible worker, exactly the logic behind a humanoid designed for household and factory tasks. 1X's promise of a hand that can match or surpass human capability, and be mass-produced by the thousand, echoes that assembly line of artificial people. The play's warning about labour replaced by machines hangs over every USB-C port the Neo hand plugs in.",
        "excerpt": "But a working machine must not play the piano, must not feel happy, must not do a whole lot of other things. A gasoline motor must not have tassels or ornaments, Miss Glory. And to manufacture artificial workers is the same thing as the manufacture of a gasoline motor.",
        "source": "Karel Capek, R.U.R. (Rossum's Universal Robots), Act I (1920). Karel Capek, R.U.R. (trans. Paul Selver), Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/59112/59112-h/59112-h.htm"
      },
      {
        "category": "literary",
        "title": "Ovid's Pygmalion carves an ivory woman so perfect he falls in love, and when he touches her the ivory turns soft and the veins throb beneath his thumb. The myth turns on touch as the moment lifeless craft crosses into living responsiveness. 1X's fingertips carry tactile sensors that feel pressure and slippage, giving the machine its own version of that responsive thumb. Where a goddess animated Pygmalion's statue, engineers now grant sensation to a hand of tendon and steel.",
        "excerpt": "The pressed ivory becomes soft, and losing its hardness, yields to the fingers, and gives way, just as Hymettian wax grows soft in the sun, and being worked with the fingers is turned into many shapes, and becomes pliable by the very handling. While he is amazed, and is rejoicing, though with apprehension, and is fearing that he is deceived; the lover again and again touches the object of his desires with his hand. It is a real body; the veins throb, when touched with the thumb.",
        "source": "Ovid, Metamorphoses, Book X: Pygmalion (8 AD). Ovid, Metamorphoses Book X (trans. Henry T. Riley), Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/26073/26073-h/26073-h.htm"
      },
      {
        "category": "literary",
        "title": "Mary Shelley's Victor Frankenstein watches the dull yellow eye of his creature open, then flees as one hand is stretched out to detain him. The reaching hand is the image of the creature crossing from assembled parts into unsettling life. A humanoid hand that grips a twenty-pound kettlebell yet picks a grape off its stem revives that same mix of wonder and dread at the made thing that moves like us. Frankenstein remains the founding fable of creators who fear what their creatures' hands might do.",
        "excerpt": "I saw the dull yellow eye of the creature open; it breathed hard, and a convulsive motion agitated its limbs. ... one hand was stretched out, seemingly to detain me, but I escaped and rushed downstairs.",
        "source": "Mary Shelley, Frankenstein; or, The Modern Prometheus, Chapter 5 (1818). Mary Shelley, Frankenstein, Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/84/84-h/84-h.htm"
      },
      {
        "category": "artistic",
        "title": "Michelangelo's Creation of Adam reduces the whole drama of creation to two nearly touching hands, God's finger charging Adam's with life. It is Western art's defining image of the maker reaching out to animate a creature in his own likeness. 1X, building a hand in humanity's image and calling it near-human, inherits that gesture in reverse: now the human is the god extending life to the artificial. The famous gap between the two fingers is exactly the gap the robot's tactile fingertips are engineered to close.",
        "excerpt": "Across the Sistine Chapel ceiling a languid Adam reaches out his left arm, his finger almost meeting the outstretched hand of a windswept God borne on a cloud of angels. The two index fingers hang a breath apart, the whole spark of creation suspended in that unclosed gap. It is the most celebrated pair of hands in Western art, the instant the inert is charged with life through a single touch.",
        "source": "Michelangelo, The Creation of Adam, Sistine Chapel ceiling (c. 1508-1512). Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Michelangelo_-_Creation_of_Adam_(cropped).jpg",
        "image": {
          "src": "/covers/1x-neo-dexterous-robot-hand--a5.png",
          "alt": "Detail of Michelangelo's fresco The Creation of Adam, showing the near-touching hands of God and Adam",
          "credit": "Michelangelo, Sistine Chapel ceiling / Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Leo Delibes's ballet Coppelia turns on the toymaker Dr. Coppelius and his life-sized mechanical dancing doll, so convincing that the young villager Franz falls in love with her, mistaking clockwork for a living girl. Its music dances on the uncanny line between automaton and human that 1X's near-human hand now walks in a Californian factory. The ballet's charm and menace both come from a maker who longs for his doll to move as if alive. A humanoid that assembles Lego and screws in a bulb is that automaton's dream finally made dexterous.",
        "excerpt": "Delibes's score brings to life a village square where an old inventor sets his dark-eyed automaton Coppelia on a balcony, her jerky clockwork nods and mechanical dances so lifelike that a smitten young man courts a machine. When the doll is unmasked and a real girl mimics its stiff, winding-down movements, the music teeters between comedy and dread. It is the sound of the mechanical made in a human likeness, charming and unnerving at once.",
        "source": "Leo Delibes, Coppelia, ou la fille aux yeux d'email (ballet, 1870). IMSLP (Petrucci Music Library)",
        "href": "https://imslp.org/wiki/Copp%C3%A9lia_(Delibes,_L%C3%A9o)"
      }
    ],
    "rank": 24
  },
  {
    "slug": "jeongmin-lee-korean-folklore-ink",
    "headline": "Colossal features Busan artist Jeongmin Lee's ink illustrations steeped in Korean coastal folklore",
    "overview": "The arts publication Colossal spotlighted Jeongmin Lee, a Busan-based artist who draws delicate ink and mineral pigments on traditional Korean mulberry paper, or hanji, to render surreal scenes of life by the sea. Lee builds each composition by reading regional folktales, visiting the places tied to them and collecting fragments of myth and oral history. Many of the works center on women's knowledge, labor and resilience as passed down through coastal storytelling.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Colossal",
        "href": "https://www.thisiscolossal.com/2026/07/jeongmin-lee-korean-folklore-illustrations/"
      },
      {
        "name": "Jeongmin Lee (Min the Elephant) — artist website",
        "href": "https://mintheelephant.com/work"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-14",
    "image": {
      "src": "/covers/jeongmin-lee-korean-folklore-ink.png",
      "alt": "An ink and mineral-pigment illustration on Korean hanji paper by Jeongmin Lee, rendering a surreal seaside folktale of rippling waves and coastal figures in fine, whirling line.",
      "credit": "Colossal / Jeongmin Lee"
    },
    "edition": "Morning Edition · 14 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Long before Jeongmin Lee bent ink across hanji, coastal Korea told stories in which the sea itself was a living, willful power that could rise to the height of the mountains. This old tale of a holy man watching the ocean climb the hills belongs to the same body of regional sea-lore that Lee mines for her surreal shorelines. Both treat the water as a keeper of dread and wonder rather than mere scenery. Her illustrations are, in effect, a modern retelling of exactly this kind of ancient coastal myth.",
        "excerpt": "When cock-crow came, sure enough the sea suddenly lifted its face, overflowed its banks, and the waves came rolling up to the heavens, climbing the mountain-sides till they touched the feet of To-jong.",
        "source": "“The Vision of the Holy Man,” from Korean Folk Tales: Imps, Ghosts and Fairies (tales of Im Bang and Yi Ryuk, trans. James S. Gale, 1913). Project Gutenberg — Korean Folk Tales.",
        "href": "https://www.gutenberg.org/files/51002/51002-h/51002-h.htm"
      },
      {
        "category": "historical",
        "title": "A century ago, a chance manuscript of Im Bang’s stories sent James Gale scrambling to collect and carry Korea’s oral folklore into print before it faded. Jeongmin Lee works in that same preservationist spirit: she reads regional folktales, visits the places tied to them, and gathers fragments of history, myth, and oral memory. Where Gale used translation to keep the tales alive, Lee uses ink and mineral pigment. Both are acts of rescue that turn vanishing coastal storytelling into a durable form.",
        "excerpt": "An old manuscript copy of Im Bang’s stories came into the hands of the translator a year ago, and he gives them now to the Western world that they may serve as introductory essays to the mysteries, and, what many call, absurdities of Asia.",
        "source": "Preface by James S. Gale to Korean Folk Tales (1913), an early-modern effort to gather and preserve Korea’s oral tradition. Project Gutenberg — Korean Folk Tales.",
        "href": "https://www.gutenberg.org/files/51002/51002-h/51002-h.htm"
      },
      {
        "category": "literary",
        "title": "Byron’s famous address to the ocean casts the sea as an immortal, ungovernable force at whose shoreline human control simply stops. That is precisely the border Jeongmin Lee’s folklore lives on — the edge where coastal communities negotiate with a power far larger than themselves. Her women divers and sea-keepers are figures who dwell at that same threshold Byron marks. The poem’s reverence for the deep echoes the awe running through her seaside scenes.",
        "excerpt": "Roll on, thou deep and dark blue Ocean—roll!\nTen thousand fleets sweep over thee in vain;\nMan marks the earth with ruin—his control\nStops with the shore;",
        "source": "Lord Byron, apostrophe to the ocean from Childe Harold’s Pilgrimage, Canto IV (1818). Project Gutenberg — Childe Harold’s Pilgrimage.",
        "href": "https://www.gutenberg.org/cache/epub/5131/pg5131.txt"
      },
      {
        "category": "literary",
        "title": "Whitman opens his great sea-poem with the ocean as an endless rocking cradle that hands down song and memory across a lifetime. Jeongmin Lee’s work is animated by the same idea: the sea as a source of inherited story, its knowledge passed from one generation of coastal women to the next. Both artist and poet treat the shoreline as a place where memory, place, and voice are braided together. Her rippling lines are a visual counterpart to Whitman’s musical shuttle of the waves.",
        "excerpt": "Out of the cradle endlessly rocking,\nOut of the mocking-bird’s throat, the musical shuttle,\nOut of the Ninth-month midnight,",
        "source": "Walt Whitman, opening of “Out of the Cradle Endlessly Rocking,” from Leaves of Grass. Project Gutenberg — Leaves of Grass.",
        "href": "https://www.gutenberg.org/cache/epub/1322/pg1322.txt"
      },
      {
        "category": "artistic",
        "title": "Hokusai’s towering wave is the defining East Asian image of the sea as both beauty and threat, its clawed crest curling over tiny human boats. Jeongmin Lee inherits that visual lineage — the fine, whirling line describing water as something alive and immense. Like Hokusai, she uses traditional materials and a graphic economy of line to fold folklore and coastal danger into a single arresting scene. His wave and her surreal shorelines share the same conviction that the sea deserves to be drawn with awe.",
        "excerpt": "A single deep-blue breaker rears up and arcs across the print, its foaming crest splintering into finger-like claws that seem poised to fall on the slender fishing boats below. Far in the distance, dwarfed by the water, the snow-capped cone of Mount Fuji sits calm and immovable. The composition holds motion and stillness, terror and serenity, in one taut, unforgettable line.",
        "source": "Katsushika Hokusai, The Great Wave off Kanagawa (c. 1830–1832), woodblock print from Thirty-six Views of Mount Fuji. Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Katsushika_Hokusai_-_The_Great_Wave_off_the_Coast_of_Kanagawa.jpg",
        "image": {
          "src": "/covers/jeongmin-lee-korean-folklore-ink--a5.png",
          "alt": "Hokusai’s The Great Wave off Kanagawa: a giant cresting wave with clawing foam looming over small boats, with Mount Fuji small in the distance.",
          "credit": "Katsushika Hokusai, The Great Wave off Kanagawa (public domain) via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Debussy’s La mer paints the ocean in sound — shifting light on water, the play of waves, and the dialogue of wind and sea rendered in shimmering orchestral color rather than literal depiction. That impressionistic method mirrors Jeongmin Lee’s own: she chases the symbols, emotions, and questions a folktale leaves behind instead of illustrating it word for word. Both artists evoke the sea’s mood and mystery rather than transcribing it. Heard alongside her ink, La mer feels like the soundtrack to her rippling, folklore-steeped coasts.",
        "excerpt": "One of the most celebrated evocations of the sea in Western music, its three movements move from dawn glinting on the water, through the restless dance of the waves, to a churning conversation between wind and sea. Debussy conjures swells, spray, and shifting light entirely through orchestral color and surging rhythm, suggesting the ocean’s power without ever describing it plainly. The result is atmosphere made audible — a mood-portrait of the deep.",
        "source": "Claude Debussy, La mer, trois esquisses symphoniques pour orchestre (1905). IMSLP / Petrucci Music Library — La mer (Debussy)",
        "href": "https://imslp.org/wiki/La_mer_(Debussy,_Claude)"
      }
    ],
    "rank": 25
  },
  {
    "slug": "barbican-community-greenhouse",
    "headline": "A barrel-vaulted community greenhouse opens on the Barbican estate in London",
    "overview": "A new barrel-vaulted community greenhouse has been built on London's brutalist Barbican estate, giving residents and visitors a shared space to grow plants amid the concrete complex. Featured by Dezeen, the timber-and-glass structure echoes the estate's arches and adds to the Barbican's celebrated conservatory and gardens. The project reflects a wider push to weave food-growing and green space into dense urban housing.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Dezeen",
        "href": "https://www.dezeen.com/2026/07/13/veggery-barbican-studio-folk-architects-raskl/"
      },
      {
        "name": "Barbican Centre",
        "href": "https://www.barbican.org.uk/whats-on/2026/event/visit-the-conservatory"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-14",
    "image": {
      "src": "/covers/barbican-community-greenhouse.png",
      "alt": "The Veggery, a hexagonal timber-framed community greenhouse with a multi-arched polytunnel roof that echoes the barrel-vaulted arches of the Barbican, standing on the estate beside St Giles' Cripplegate church",
      "credit": "Dezeen"
    },
    "edition": "Morning Edition · 14 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Nearly three thousand years ago, Homer imagined the ultimate civic amenity as a walled, ever-fruiting garden set just beyond the king's threshold, watered by shared springs from which the town's people drew. The new Barbican greenhouse revives that ancient idea of a cultivated green enclosure planted in the heart of a settlement for common benefit. Where Alcinous's orchard fed a Phaeacian court, the Veggery offers estate residents a place to grow plants together amid the concrete. Both treat tended greenery not as luxury but as something a good community keeps close at hand.",
        "excerpt": "Outside the gate of the outer court there is a large garden of about four acres with a wall all round it. It is full of beautiful trees—pears, pomegranates, and the most delicious apples. There are luscious figs also, and olives in full growth. The fruits never rot nor fail all the year round, neither winter nor summer, for the air is so soft that a new crop ripens before the old has dropped.",
        "source": "Homer, The Odyssey, Book VII, trans. Samuel Butler.",
        "href": "https://www.gutenberg.org/files/1727/1727-h/1727-h.htm"
      },
      {
        "category": "historical",
        "title": "In 1851 Joseph Paxton raised a vast barrel-vaulted hall of iron and glass in Hyde Park, so tall its transept could enclose living elm trees under crystal, and Thackeray marveled that a blazing arch of glass had leapt from bare grass \"as though 'twere by a wizard's rod.\" The Barbican's timber-and-glass greenhouse, with its multi-arched roof echoing the estate's vaults, is a small, communal descendant of that glasshouse dream. Both structures answer the same Victorian impulse: to shelter growing green things beneath a transparent, sunlit vault in the middle of a city. Where the Crystal Palace glazed a nation's spectacle, the Veggery glazes a neighbourhood's growing space.",
        "excerpt": "But yesterday a naked sod\nThe dandies sneered from Rotten Row,\nAnd cantered o'er it to and fro:\nAnd see 'tis done!\nAs though 'twere by a wizard's rod\nA blazing arch of lucid glass\nLeaps like a fountain from the grass\nTo meet the sun!\n\nA quiet green but few days since,\nWith cattle browsing in the shade:\nAnd here are lines of bright arcade\nIn order raised!\nA palace as for fairy Prince,\nA rare pavilion, such as man\nSaw never since mankind began,\nAnd built and glazed!",
        "source": "William Makepeace Thackeray, \"May-Day Ode\" (1851), Ballads.",
        "href": "https://www.gutenberg.org/files/2732/2732-h/2732-h.htm"
      },
      {
        "category": "literary",
        "title": "Voltaire ends Candide by having his weary hero renounce grand philosophy for the humble, grounding work of tending a plot of land: \"we must cultivate our garden.\" The Barbican greenhouse is that maxim built in timber and glass, turning a corner of a dense estate into a place where people quietly grow things with their hands. Voltaire's little society finds purpose and peace once each member takes up useful cultivation together, much as the greenhouse means to give residents a shared task and a shared ground. It is the same modest, communal answer to a hard world: plant, tend, and belong.",
        "excerpt": "\"I know also,\" said Candide, \"that we must cultivate our garden.\"\n\"You are right,\" said Pangloss, \"for when man was first placed in the Garden of Eden, he was put there ut operaretur eum, that he might cultivate it; which shows that man was not born to be idle.\"\n\"Let us work,\" said Martin, \"without disputing; it is the only way to render life tolerable.\"",
        "source": "Voltaire, Candide, Chapter XXX (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/19942/19942-h/19942-h.htm"
      },
      {
        "category": "literary",
        "title": "Frances Hodgson Burnett's The Secret Garden turns on a walled, forgotten green space brought back to life by children who choose to tend it, and are themselves healed in the tending. The Barbican greenhouse carries the same promise: an enclosed patch of cultivation set into a hard, built landscape that revives when a community starts to care for it. Burnett's garden becomes the place where lonely, transplanted people finally take root and belong, echoing the festival theme of \"Belonging\" behind the Veggery. Both insist that a shared, sheltered garden can quietly remake the people who work it.",
        "excerpt": "It was the sweetest, most mysterious-looking place anyone could imagine. The high walls which shut it in were covered with the leafless stems of climbing roses which were so thick that they were matted together.",
        "source": "Frances Hodgson Burnett, The Secret Garden, Chapter IX.",
        "href": "https://www.gutenberg.org/files/113/113-h/113-h.htm"
      },
      {
        "category": "artistic",
        "title": "J. McNeven's 1851 lithograph looks down the barrel-vaulted glass transept of the Crystal Palace, capturing the astonishing sight of full-grown elm trees and a fountain sheltered inside a soaring crystal aisle. It is almost a portrait of the Barbican greenhouse's guiding idea a century and a half early: a vaulted, transparent structure that folds living, growing nature into the heart of a man-made monument. The crowds streaming between the arches beneath the glass foreshadow the Veggery's role as a shared public room around its plants. In both, the arched glass roof becomes the frame that lets a garden thrive amid the city.",
        "excerpt": "A brilliant colour lithograph looks the length of the barrel-vaulted glass transept of the Crystal Palace, where a great fountain and full-grown elm trees rise inside the crystal aisles. Crowds in Victorian dress drift between the arches beneath a soaring web of iron and glass that lets the daylight pour down. Nature and industry share a single luminous nave, the living trees framed and sheltered by the shining vault overhead.",
        "source": "J. McNeven, The Transept from the Grand Entrance, Souvenir of the Great Exhibition (1851), Victoria and Albert Museum; public domain via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Crystal_Palace_interior.jpg",
        "image": {
          "src": "/covers/barbican-community-greenhouse--a5.png",
          "alt": "Colour lithograph of the interior of the Crystal Palace in 1851: the barrel-vaulted glass transept enclosing full-grown elm trees and a fountain, with crowds of visitors below",
          "credit": "J. McNeven, 'The Transept from the Grand Entrance' (1851), public domain via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Handel's opera Serse opens with the king alone in his garden, singing the tender arioso \"Ombra mai fù\" in gratitude to the cool shade of a single plane tree. That famous melody makes an act of quiet devotion out of resting beneath living leaves, elevating the simple care of a tree to something like reverence. The Barbican greenhouse offers the same unhurried pleasure in a brutalist setting: a green, sheltering space where residents can slow down among growing plants. Handel set the love of tended greenery to music; the Veggery builds a modest timber sanctuary for the same feeling.",
        "excerpt": "The opera opens with Xerxes alone in a garden, addressing a tender arioso to the welcome shade of a plane tree. Over a slow, gently rocking accompaniment the voice unfolds one of the most serene melodies ever written—a hymn of gratitude to a single living tree. Its calm devotion turns the simple act of resting beneath green leaves into something close to reverence.",
        "source": "George Frideric Handel, \"Ombra mai fù\" from Serse (Xerxes), HWV 40 (1738), full score via IMSLP.",
        "href": "https://imslp.org/wiki/Serse,_HWV_40_(Handel,_George_Frideric)"
      }
    ],
    "rank": 26
  },
  {
    "slug": "graham-dies-aortic-tear",
    "headline": "U.S. Senator Lindsey Graham dies at 71; a medical examiner attributes his death to an aortic tear",
    "overview": "U.S. Senator Lindsey Graham of South Carolina, a prominent Republican and hawkish foreign-policy voice who was a close ally of President Donald Trump, died over the weekend at age 71, and a medical examiner said on July 13, 2026, that the cause was a tear in his aorta. The four-term senator, a fixture on Capitol Hill for more than two decades, was remembered across party lines as colleagues returned to a Senate facing an uncertain agenda. Officials in South Carolina began weighing how to fill his seat.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMimgFBVV95cUxNcGhrZ2FzTUtJem9sWmVlbWNIVFdEdmw0dGNpXzZoenpMLXNIVXZGblVJOEs3MUhPU2hwQTF2cUVtU0VfWjZlOUdmc0pfQy0xWE0xYlFuaDhCY0pBcVFMU3p3dkM3ZXhlc04tdTlEOEpSMDVzWkJ4ZkFlQmVPOVM4ZjhoOVZJdHFXRDVIOUhTMDlVZDMtenEyWmxR?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cn75083d472o"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-13",
    "image": {
      "src": "/covers/graham-dies-aortic-tear.png",
      "alt": "Official U.S. Senate photographic portrait of Lindsey Graham of South Carolina.",
      "credit": "United States Congress (Senate), official Senate portrait. Public domain (work of the U.S. federal government) via Wikimedia Commons."
    },
    "lead": true,
    "edition": "Evening Edition · 13 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Athens' guiding voice, the strategist Pericles, was carried off by plague barely two and a half years into the war he had counseled — his body failing where his judgment had not. Thucydides observes that the city came to appreciate the correctness of his foresight only after his death, the way a republic suddenly weighs a fixture it had taken for granted. Graham, a hawkish architect of America's posture abroad, is felled not by an enemy but by his own aorta, and Washington now measures the silence he leaves.",
        "excerpt": "For as long as he was at the head of the state during the peace, he pursued a moderate and conservative policy; and in his time its greatness was at its height. When the war broke out, here also he seems to have rightly gauged the power of his country. He outlived its commencement two years and six months, and the correctness of his previsions respecting it became better known by his death.",
        "source": "Thucydides, History of the Peloponnesian War, Book II, ch. 65, trans. Richard Crawley (c. 431–404 BC; translation 1874). Wikisource.",
        "href": "https://en.wikisource.org/wiki/History_of_the_Peloponnesian_War/Book_2"
      },
      {
        "category": "historical",
        "title": "Henry Clay, the Great Compromiser and towering Senate orator, died in 1852 and was mourned by rivals as much as allies; the young Lincoln, adopting a political opponent's newspaper tribute, gave the grief its language. The passage laments a voice 'hushed—hushed for ever,' the loss of a form that once rose in the council-chambers to beat back the storms of faction. The Senate that reconvenes to eulogize Graham across the aisle reenacts an old American rite: the chamber briefly uniting to bury one of its own fixtures.",
        "excerpt": "Alas! who can realize that Henry Clay is dead! Who can realize that never again that majestic form shall rise in the council-chambers of his country to beat back the storms of anarchy which may threaten, or pour the oil of peace upon the troubled billows as they rage and menace around? Who can realize that the workings of that mighty mind have ceased, that the throbbings of that gallant heart are stilled, that the mighty sweep of that graceful arm will be felt no more, and the magic of that eloquent tongue, which spake as spake no other tongue besides, is hushed—hushed for ever!",
        "source": "Abraham Lincoln, Eulogy on Henry Clay, delivered at Springfield, Illinois, July 6, 1852 (quoting a contemporary newspaper tribute); in Life and Works of Abraham Lincoln, Vol. III. Wikisource.",
        "href": "https://en.wikisource.org/wiki/Life_and_Works_of_Abraham_Lincoln/Volume_3/Eulogy_of_Henry_Clay"
      },
      {
        "category": "literary",
        "title": "Shirley's dirge insists that no rank or armour shields a man from death — 'Death lays his icy hand on kings,' and sceptre and crown tumble into common dust. A senator of great power and sharper tongue is, at the last, leveled with any 'poor crooked scythe and spade.' A torn aorta is that icy hand, indifferent to office, party, or the strength of the man it seizes.",
        "excerpt": "The glories of our blood and state\nAre shadows, not substantial things;\nThere is no armour against fate;\nDeath lays his icy hand on kings:\nSceptre and Crown\nMust tumble down,\nAnd in the dust be equal made\nWith the poor crooked scythe and spade.",
        "source": "James Shirley, \"Death the Leveller\" (from The Contention of Ajax and Ulysses, 1659), as printed in Palgrave's Golden Treasury of English Songs and Lyrics. Wikisource.",
        "href": "https://en.wikisource.org/wiki/Page:Golden_Treasury_of_English_Songs_and_Lyrics.djvu/75"
      },
      {
        "category": "literary",
        "title": "David's lament over Saul and Jonathan is the archetype of the eulogy that crosses enmity: he mourns even the king who had hunted him, crying 'how are the mighty fallen.' For a warrior-politician the elegy fits doubly, since the mighty man and the weapons of war perish together. Its refrain supplies the very note Washington strikes when old adversaries rise to praise a fallen hawk.",
        "excerpt": "The beauty of Israel is slain upon thy high places: how are the mighty fallen! ... How are the mighty fallen in the midst of the battle! O Jonathan, thou wast slain in thine high places. I am distressed for thee, my brother Jonathan: very pleasant hast thou been unto me: thy love to me was wonderful, passing the love of women. How are the mighty fallen, and the weapons of war perished!",
        "source": "The Holy Bible, King James Version (1611), 2 Samuel 1:19, 25–27 — David's lament for Saul and Jonathan. Wikisource.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/2_Samuel"
      },
      {
        "category": "artistic",
        "title": "Copley's vast canvas freezes the moment the Earl of Chatham — William Pitt, the great war-voice of his age — collapses mid-debate among the assembled peers, his body giving way inside the very chamber where his eloquence had reigned. Fifty-five statesmen turn as one toward the stricken orator, a legislature absorbing in real time the fall of its fixture. It is the nearest thing painting offers to a senator struck down on the floor, and to the hush that follows.",
        "excerpt": "Oil on canvas depicting William Pitt, 1st Earl of Chatham, seized by a fatal collapse during a debate in the House of Lords on 7 April 1778. Robed peers crowd around and reach toward the falling statesman beneath a shadowed canopy; light falls on his pale, swooning figure at the center as the chamber freezes in alarm.",
        "source": "John Singleton Copley, The Death of the Earl of Chatham, 1779–81, oil on canvas, Tate / National Portrait Gallery, London. Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:The_Death_of_the_Earl_of_Chatham_by_John_Singleton_Copley.jpg",
        "image": {
          "src": "/covers/graham-dies-aortic-tear--a5.png",
          "alt": "Crowded 18th-century House of Lords scene in which the robed Earl of Chatham collapses at center, held up by alarmed peers who press around him.",
          "credit": "John Singleton Copley, The Death of the Earl of Chatham (1779–81), Tate. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "The second movement of Beethoven's 'Eroica' is a funeral march written for a fallen hero — a slow C-minor tread over muffled, drum-like basses that has accompanied the mourning of statesmen and soldiers for two centuries. Beethoven set it inside a symphony about heroic ambition precisely to reckon with the grief that shadows the man of action. It is the sound a republic makes when it lays a warrior to rest.",
        "excerpt": "A funeral march (Marcia funebre: Adagio assai) in C minor forming the symphony's second movement: a solemn, halting theme over low muffled figures suggesting drums and a procession, rising to a fugal climax before dissolving into broken, fading phrases of mourning.",
        "source": "Ludwig van Beethoven, Symphony No. 3 in E-flat major, Op. 55 (\"Eroica\"), 2nd movement, \"Marcia funebre,\" composed 1803–04. Full score at IMSLP (Petrucci Music Library).",
        "href": "https://imslp.org/wiki/Symphony_No.3,_Op.55_(Beethoven,_Ludwig_van)"
      }
    ],
    "rank": 27
  },
  {
    "slug": "qatar-former-emir-hamad-dies",
    "headline": "Sheikh Hamad bin Khalifa Al Thani, the former emir who transformed Qatar into a gas-rich power, dies at 74",
    "overview": "Sheikh Hamad bin Khalifa Al Thani, who seized power in Qatar in a bloodless 1995 coup against his father and later abdicated in favor of his son in 2013, has died at 74, the Qatari royal court announced on July 13, 2026. During his reign he turned the small Gulf peninsula into one of the world's wealthiest states, building a vast liquefied-natural-gas industry, founding the Al Jazeera network, and winning the bid to host the 2022 World Cup. He was mourned across the Arab world as an ambitious and transformative leader.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMiogFBVV95cUxNWjRDaUlZZWhZMlBnRGVNSmRGNzBoLWVGeXJEWVljdkZwNVkwcTNJT3pURUs5aXR5UkF1RzdzZDRUUWNGSnJnajlYRGptM3U1a01lUEVGRk1xT05sWjdRYjd6MFVOd0JYV3paSndLTEJkVkxwQ01UZmp1S0ZvS2ItOFlVT0xfN2dQd05DZThBVk43NldxaElUUEh4S19JdDl6WGc?oc=5"
      },
      {
        "name": "Al Jazeera",
        "href": "https://news.google.com/rss/articles/CBMirwFBVV95cUxObXNsemVrTDJtTnUzY3hkSVNKRWJkT3hnNEZkWENpc2VSYlhuR2hZbmVKZFlWQ3dfdVhsamxCNXFSMENzNmhfU2VnTzJHTTFfeDg2Z3QtYXhyQUFveGhOLU9OTV9GblVkdHN2NUZObmdyN0lPTmRrYTlUN1lzZWpvU2syNlM4aVNJU1E3anZnM3YwZE00LTItMkhpMW5zQzFaYnFwNzlzdGZTbVVxb3RN0gG0AUFVX3lxTE1SVS1PNUNQUjN0N1k4RzNvWlJPX1hmMTFuTXBRZjgzQjUtRnhhZHFCUVRyTHZybmhGend5RzJfQWV6bDdQaUNwTWo5X1o2U0FhTkJfYWxrdzhxdlJDQ0NEZUg5aHQtenFGejFBOGJOMzhuQ0JQYU1oZ05iOFRNTUdEdnFSVHhsSnEtNFRaR2V6QXRNWFBJZFF6V0dlOU83YnNkQnFoZmZOZk93VlVfV2xncjB1Ug?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-13",
    "image": {
      "src": "/covers/qatar-former-emir-hamad-dies.png",
      "alt": "Sheikh Hamad bin Khalifa Al Thani, Emir of Qatar, photographed during a 1997 visit to the Pentagon.",
      "credit": "U.S. Department of Defense (Pentagon) photograph, 11 June 1997. Public domain (U.S. federal government work), via Wikimedia Commons."
    },
    "edition": "Evening Edition · 13 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Croesus turned a modest Anatolian kingdom into a byword for wealth, panning gold from the sands of the river Pactolus much as Hamad drew fortunes from the gas beneath Qatar's peninsula. When the Athenian sage Solon toured his treasure-houses, he pointedly refused to call the king happy, insisting no man be judged fortunate until his life has closed. For an emir who amassed glittering wealth and then, rarely, laid down power before death could take it, Solon's caution reads like the fitting text at the graveside.",
        "excerpt": "For thyself, oh! Croesus, I see that thou art wonderfully rich, and art the lord of many nations; but with respect to that whereon thou questionest me, I have no answer to give, until I hear that thou hast closed thy life happily.",
        "source": "Herodotus, The Histories, Book 1.32, trans. George Rawlinson (1858-60); Solon's reply to Croesus, King of Lydia.",
        "href": "https://en.wikisource.org/wiki/The_History_of_Herodotus_(Rawlinson)/Book_1"
      },
      {
        "category": "historical",
        "title": "In December 1783, at the height of his power and adored by an army that might have crowned him king, George Washington instead handed his commission back to Congress and rode home to his farm. The voluntary surrender of supreme authority is among history's rarest acts, which is precisely what made Hamad's 2013 abdication so startling to the watching world. Both men chose to leave the stage while still applauded, trusting a chosen successor rather than clinging until death pried power from their hands.",
        "excerpt": "Having now finished the work assigned to me, I retire from the great theatre of Action; and bidding an Affectionate farewell to this August body under whose orders I have so long acted, I here offer my Commission, and take my leave of all the employments of public life.",
        "source": "George Washington, Address to Congress on Resigning His Commission, Annapolis, 23 December 1783.",
        "href": "https://en.wikisource.org/wiki/Resignation_as_commander-in-chief_of_the_Continental_Army"
      },
      {
        "category": "literary",
        "title": "Shakespeare's dying Henry IV wakes to find his son Hal has already lifted the crown from the pillow and set it on his own head, and the old king's wounded question captures the ancient friction between a father's throne and a son's ambition. Hamad did not wait by any deathbed: in 1995 he took power from his living father in a bloodless palace coup, seizing the crown, as the play has it, before its hour was ripe. Yet the drama's deeper irony fits him too, for this usurping son would one day hand the same crown, freely, to a son of his own.",
        "excerpt": "Dost thou so hunger for mine empty chair / That thou wilt needs invest thee with my honors / Before thy hour be ripe?",
        "source": "William Shakespeare, Henry IV, Part 2, Act 4, Scene 3 (Folger Shakespeare Library edition); King Henry IV rebuking Prince Hal.",
        "href": "https://www.folger.edu/explore/shakespeares-works/henry-iv-part-2/read/4/3/"
      },
      {
        "category": "literary",
        "title": "Shelley's traveller finds only two vast legs and a shattered face half-sunk in desert sand, all that survives of a king who once commanded the mighty to look on his works and despair. It is the eternal rebuke to every ruler who builds monuments against mortality, and it hangs over the gleaming towers Hamad raised from the Gulf sand. The obituary of any desert king is written, in the end, in that boundless and level emptiness stretching far away.",
        "excerpt": "And on the pedestal these words appear: / 'My name is Ozymandias, king of kings: / Look on my works, ye Mighty, and despair!' / Nothing beside remains. Round the decay / Of that colossal wreck, boundless and bare, / The lone and level sands stretch far away.",
        "source": "Percy Bysshe Shelley, 'Ozymandias' (1818), closing lines.",
        "href": "https://en.wikisource.org/wiki/Poems_That_Every_Child_Should_Know/Ozymandias_of_Egypt"
      },
      {
        "category": "artistic",
        "title": "Honthorst paints the moment the wise Solon stands unimpressed before Croesus enthroned amid his heaped gold and silver, warning that no measure of treasure secures a happy end. The Caravaggesque light falls at once on the king's glittering riches and on the sage's raised, cautioning hand, a Baroque memento that wealth and mortality keep close company. Set beside the passing of a monarch who turned a poor peninsula into one of Earth's richest states, the canvas becomes a quiet meditation on what gold can never purchase.",
        "excerpt": "Oil on canvas in which the Athenian lawgiver Solon, gesturing in admonition, confronts the seated Lydian king Croesus surrounded by gold and silver vessels. Dramatic chiaroscuro throws the piled treasure into gleaming relief against deep shadow, staging the sage's warning that riches are no guarantee of a fortunate life.",
        "source": "Gerard van Honthorst, Solon and Croesus, 1624, oil on canvas, Hamburger Kunsthalle, Hamburg (inv. HK-772).",
        "href": "https://commons.wikimedia.org/wiki/File:Honthorst_solon_and_croesus.jpg",
        "image": {
          "src": "/covers/qatar-former-emir-hamad-dies--a5.png",
          "alt": "Baroque painting of the sage Solon gesturing in warning before King Croesus seated among heaps of gold and silver treasure.",
          "credit": "Gerard van Honthorst, Solon and Croesus (1624), Hamburger Kunsthalle. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Handel wrote Zadok the Priest for a coronation, its long-gathering strings breaking into a sudden choral blaze at the instant a new king is anointed and the people cry that he may live for ever. Its words recall the orderly passing of David's crown to Solomon, power delivered to a chosen heir, the very thing Hamad enacted in 2013 when he anointed his son emir. The anthem is a hymn to succession itself, and to the hope that a kingdom outlasts the king who made it.",
        "excerpt": "Zadok the priest, and Nathan the prophet, anointed Solomon king. And all the people rejoiced, and said: God save the King! Long live the King! May the King live for ever.",
        "source": "George Frideric Handel, Zadok the Priest, HWV 258, Coronation Anthem No. 1 (1727); words after 1 Kings 1:38-40.",
        "href": "https://imslp.org/wiki/Zadok_the_Priest,_HWV_258_(Handel,_George_Frideric)"
      }
    ],
    "rank": 28
  },
  {
    "slug": "houthis-accuse-saudi-sanaa-airport",
    "headline": "Yemen's Houthis accuse Saudi Arabia of airstrikes on Sanaa's international airport and vow retaliation",
    "overview": "Yemen's Iran-aligned Houthi movement said Saudi-led airstrikes hit Sanaa International Airport on July 13, 2026, and vowed to retaliate, in a sharp escalation of a conflict that had been relatively quiet. The Houthis, who control the capital and much of northern Yemen, said the strikes damaged the airport; there was no immediate Saudi confirmation. The exchange revived fears of a wider resumption of a war that has already caused one of the world's worst humanitarian crises.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMimwFBVV95cUxQMGJJX3RrZlBnOUd3aXc5VlloY3JNOVN4V0xqX1EycG5QcU5DNUlWQU1qNmZWbUpMTTFLZjdyTzY1NTFNOFJ1d3F1aFlobUMzN1VDdnp3RWJibHI2MGFaaWZzdTJGVEJfYlFVZk5DUVRCN1V6Z1JOMTl5aldnOFUtUXdSSFFEZmR4ZUhueEM0M1o4VE4wck1HTmF5SQ?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMizgFBVV95cUxQV2Q4MUdSUXZ0ZWdUWnM4SFNoV0lqYlBHTy1PMURKeFA1TS02RWRjbVZDYzJTY29obkdIa29MV2Y1WjZta2c5TXRzTEdNRjc3alR0MGtNV3QzUXpoanJyLWQ4VHV4NlM2WloyaWZaenV1Y1hqUjY1dHNaaXRiWnoxdmxLYWtyNURVQlRfblZjaFBYTmdXNDVVVFFlM1BWS3M2SzFOcm5MakVrYWNwM01aT0s2UThnckpQRDlSUjdqRjlMaWM4eTJtRG5JZU9FQQ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-13",
    "image": {
      "src": "/covers/houthis-accuse-saudi-sanaa-airport.png",
      "alt": "The old city of Sana'a, Yemen, with its distinctive traditional tower-houses",
      "credit": "Rod Waddington, CC BY-SA 2.0, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 13 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In 25 BC the emperor Augustus dispatched Aelius Gallus with a Roman army deep into 'Arabia Felix' — the incense-rich south of Yemen — to seize the fabled wealth of Saba. Strabo, writing within living memory of the campaign, records how the legions reached the walls of Marib and laid siege to it, only to break off, beaten less by the defenders than by thirst and disease. Two thousand years later a foreign power again strikes at the Sabaean heartland from outside, and the hinterland of that same ancient capital becomes once more a theatre of siege.",
        "excerpt": "advanced to a city called Marsiaba, which belonged to the tribe of the Rhammanitae, who were subject to Ilasarus. Now he assaulted and besieged this city for six days, but for want of water desisted.",
        "source": "Strabo, Geography, Book XVI, Chapter 4, section 24 (on the expedition of Aelius Gallus into Arabia Felix); English translation, LacusCurtius, University of Chicago.",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Strabo/16D*.html"
      },
      {
        "category": "historical",
        "title": "On 26 April 1937 the German Condor Legion and Italian aircraft reduced the Basque town of Guernica to rubble in a single afternoon, the first time modern warplanes deliberately annihilated a defenceless town — an atrocity that gave the twentieth century its template for the terror-bombing of cities. Photographs of its gutted streets became a universal emblem of what falls from the sky onto civilians. The Houthi charge that warplanes struck Sanaa's airport places Yemen's capital in that same long shadow, where a city wakes to find its gateway to the world in ruins.",
        "excerpt": "In a single afternoon, waves of bombers and fighters set the market town ablaze and machine-gunned those who fled into the surrounding fields, leaving its centre a smoking shell. It was aerial warfare turned deliberately upon civilians, and the ruined streets recorded in this photograph became the century's enduring image of a city bombed from the air.",
        "source": "Photograph of the ruins of Guernica after the aerial bombing of 26 April 1937 by the German Condor Legion; German Federal Archives (Bundesarchiv, Bild 183-H25224).",
        "href": "https://commons.wikimedia.org/wiki/File:Bundesarchiv_Bild_183-H25224,_Guernica,_Ruinen.jpg",
        "image": {
          "src": "/covers/houthis-accuse-saudi-sanaa-airport--a2.png",
          "alt": "The ruins of Guernica, Spain, in 1937 after the aerial bombardment by the German Condor Legion",
          "credit": "Bundesarchiv, Bild 183-H25224 / Unknown author / CC-BY-SA 3.0, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "The oldest war poem in the Western canon opens not with a battle but with a wrath — the anger that spends brave lives and yields heroes as a prey to dogs and vultures. Homer's Troy is a besieged city awaiting its doom, and the Iliad's engine is the endless answer of blow to blow, vengeance breeding vengeance until a whole people is consumed. The Houthi vow to retaliate for the strike on Sanaa echoes that oldest logic, in which wrath calls forth wrath and no side can say where the reckoning ends.",
        "excerpt": "Sing, O goddess, the anger of Achilles son of Peleus, that brought countless ills upon the Achaeans. Many a brave soul did it send hurrying down to Hades, and many a hero did it yield a prey to dogs and vultures, for so were the counsels of Jove fulfilled from the day on which the son of Atreus, king of men, and great Achilles, first fell out with one another.",
        "source": "Homer, The Iliad, Book I (opening), translated by Samuel Butler (1898); Project Gutenberg.",
        "href": "https://www.gutenberg.org/cache/epub/2199/pg2199.txt"
      },
      {
        "category": "literary",
        "title": "The Books of Kings preserve the memory of Sheba — the ancient south-Arabian kingdom centred on Yemen — as a byword for fabulous wealth: a queen arriving at Jerusalem with camel-trains of gold and spices in an abundance never seen again. That prosperous, storied land is the same Yemen now battered by a decade of war and fresh airstrikes. Set against a bombed capital, the scripture's vision of Sheba's caravans and treasure reads as an elegy for a kingdom whose fame has curdled into ruin.",
        "excerpt": "And when the queen of Sheba heard of the fame of Solomon concerning the name of the LORD, she came to prove him with hard questions. And she came to Jerusalem with a very great train, with camels that bare spices, and very much gold, and precious stones... And she gave the king an hundred and twenty talents of gold, and of spices very great store, and precious stones: there came no more such abundance of spices as these which the queen of Sheba gave to king Solomon.",
        "source": "The Holy Bible, King James Version, 1 Kings 10:1-2, 10 (the visit of the Queen of Sheba to Solomon); Wikisource.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/1_Kings"
      },
      {
        "category": "artistic",
        "title": "John Martin painted 'The Great Day of His Wrath' with the whole material world hurled into a fiery abyss, entire cities torn from their foundations by cataclysm — a Victorian vision of divine vengeance and total destruction drawn from the Book of Revelation. Its lurid glare and collapsing towers eerily anticipate the modern spectacle of a metropolis lit up under bombardment. It offers a fitting image for a capital its inhabitants say was struck from the heavens, and for the answering 'wrath' each side now promises the other.",
        "excerpt": "A whole landscape of cities and mountains is flung into a blazing chasm, rocks and buildings toppling amid a red and thunderous darkness. Martin renders the wrath of the Apocalypse as an apocalypse of the built world itself — towers and multitudes swallowed in a single instant of fire.",
        "source": "John Martin, The Great Day of His Wrath (1851-1853), oil on canvas, Tate Britain, London.",
        "href": "https://commons.wikimedia.org/wiki/File:John_Martin_-_The_Great_Day_of_His_Wrath_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/houthis-accuse-saudi-sanaa-airport--a5.png",
          "alt": "John Martin's apocalyptic painting The Great Day of His Wrath, showing a city and mountains cast into a fiery abyss",
          "credit": "John Martin, The Great Day of His Wrath (1851-53), Tate Britain; public domain, via Wikimedia Commons (Google Art Project)"
        }
      },
      {
        "category": "artistic",
        "title": "Verdi set the medieval 'Dies irae' — the 'day of wrath' — as the terrifying heart of his Requiem: hammering drums and a shrieking chorus conjuring a world dissolved in ashes. Composed in 1874, it remains music's most visceral rendering of judgement falling from above, of a day when the sky itself becomes an instrument of destruction. Its Latin lines, sung over and over as catastrophe descends, speak uncannily to a city bracing under airstrikes and to the vows of retribution that follow.",
        "excerpt": "Dies iræ, dies illa, / Solvet sæclum in favilla, / Teste David cum Sybilla. / Quantus tremor est futurus, / Quando Judex est venturus, / Cuncta stricte discussurus.",
        "source": "Giuseppe Verdi, Messa da Requiem (1874), 'Dies irae' movement; text from the medieval Latin sequence attributed to Thomas of Celano. Score at IMSLP.",
        "href": "https://imslp.org/wiki/Requiem_(Verdi,_Giuseppe)"
      }
    ],
    "rank": 29
  },
  {
    "slug": "germany-convicts-couple-yazidi-enslavement",
    "headline": "A German court convicts an Iraqi couple of enslaving Yazidi girls under the Islamic State",
    "overview": "A court in Germany on July 13, 2026, convicted an Iraqi couple of enslavement and crimes against humanity for holding Yazidi girls as slaves after the pair joined the Islamic State group, sentencing one defendant to life imprisonment. Prosecutors said the couple bought and abused captives seized during ISIS's 2014 genocide of the Yazidi minority in northern Iraq. The verdict is part of Germany's use of universal-jurisdiction laws to prosecute atrocities committed abroad.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cg53rp4e2j4o"
      },
      {
        "name": "Deutsche Welle",
        "href": "https://news.google.com/rss/articles/CBMijwFBVV95cUxOS2RpT0hYS1g5V24xZEU2emxHLWhlS2c5NTlwb2FiR2llMUFwWXo1LWRMd2IzdUtTUDJsMm9jcVk4R0lqdnN4VEQ4Z2o3VE42VXJVWndOWUFLZ1A0Uk5IZFdlUUJaV1l4Sm4zeXduSnZXQXZUSU9tSVpIaVlfOWpoOUtheHNHRDhlaEFKTzE5QdIBjwFBVV95cUxQb3RoUkZRLWZYRFFvWm1faWNXd21EUGRSUnNpbmtrbkR4MDR0ZUh4akdWR3RiTHU2VUlWalIzeF8yUXRGWmtPajA0SUFYaDMyQnpSLUlmTVNsUVQtQXM1Ui1ieUZoeUR3THVISlRqXzMtUUg3NzhQVHFBVEJLbklxeDZDN1ZqQlg0azlDSGRxbw?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-13",
    "image": {
      "src": "/covers/germany-convicts-couple-yazidi-enslavement.png",
      "alt": "Nazi defendants seated in the dock at the Nuremberg Trials, 1945-46, where 'crimes against humanity' were first prosecuted.",
      "credit": "U.S. Army photograph of the defendants at the Nuremberg Trials, 1945-46. Public domain, via Wikimedia Commons."
    },
    "edition": "Evening Edition · 13 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In 416 BCE the Athenians besieged the small neutral island of Melos, and when it fell they killed every man of military age and sold the women and children into slavery. Thucydides records the atrocity in flat, unsparing prose that has echoed for millennia as the archetype of the strong doing what they will to the weak. The Yazidi women and girls seized by ISIS in 2014 relive that ancient logic of conquest, in which the female body is counted among the spoils. Germany's verdict answers Thucydides' silence with a name and a sentence.",
        "excerpt": "And the town being now strongly besieged, there being also within some that practised to have it given up, they yielded themselves to the discretion of the Athenians, who slew all the men of military age, made slaves of the women and children, and inhabited the place with a colony sent thither afterwards of five hundred men of their own.",
        "source": "Thucydides, History of the Peloponnesian War, Book 5, ch. 116 (the fate of Melos), translated by Thomas Hobbes (1629); Perseus Digital Library, Tufts University.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0247%3Abook%3D5%3Achapter%3D116"
      },
      {
        "category": "historical",
        "title": "When the Allies tried Nazi leaders at Nuremberg in 1945-46, the tribunal's charter coined a new legal category, 'crimes against humanity,' and listed enslavement among them. Its founding principle, that atrocities against a civilian population may be judged even when a state sanctioned them, is exactly what the German court invoked in 2026. Convicting an Iraqi couple under universal jurisdiction for crimes committed in Iraq is Nuremberg's long shadow reaching across borders and decades. The dock at Nuremberg and the dock in Germany are the same seat.",
        "excerpt": "Crimes against Humanity: namely, murder, extermination, enslavement, deportation, and other inhumane acts committed against any civilian population, before or during the war; or persecutions on political, racial or religious grounds in execution of or in connection with any crime within the jurisdiction of the Tribunal, whether or not in violation of the domestic law of the country where perpetrated.",
        "source": "Charter of the International Military Tribunal (Nuremberg), Article 6(c), 8 August 1945; The Avalon Project, Yale Law School.",
        "href": "https://avalon.law.yale.edu/imt/imtconst.asp"
      },
      {
        "category": "literary",
        "title": "Euripides staged The Trojan Women in 415 BCE, only months after Athens' own sack of Melos, forcing his city to look upon the women it had enslaved. Hecuba, once queen of Troy, foresees herself dragged to a master's threshold to raise the children of her enemies. The play insists that the captive is a person with a remembered name and throne, not a chattel, the same insistence Yazidi survivors carried into a German courtroom. Across twenty-four centuries the lament of the enslaved woman is unchanged.",
        "excerpt": "And I the agèd, where go I,\n  A winter-frozen bee, a slave\nDeath-shapen, as the stones that lie\n  Hewn on a dead man's grave:\nThe children of mine enemy\nTo foster, or keep watch before\nThe threshold of a master's door,\n  I that was Queen in Troy!",
        "source": "Euripides, The Trojan Women, translated by Gilbert Murray (1905); the lament of Hecuba. Project Gutenberg.",
        "href": "https://www.gutenberg.org/cache/epub/10096/pg10096.txt"
      },
      {
        "category": "literary",
        "title": "Harriet Jacobs wrote Incidents in the Life of a Slave Girl (1861) to expose what enslavement meant for a girl: to be told she is another's property, subject to his will, with no shadow of law to shield her. Her testimony, set down while the wound was fresh, gives voice to the specific violation the Yazidi girls endured, ownership, sexual coercion, and the absence of any protector. Jacobs believed that naming the crime in a survivor's own words was itself an act of justice. The German verdict is the law at last catching up to that demand.",
        "excerpt": "He told me I was his property; that I must be subject to his will in all things. My soul revolted against the mean tyranny. But where could I turn for protection? No matter whether the slave girl be as black as ebony or as fair as her mistress. In either case, there is no shadow of law to protect her from insult, from violence, or even from death; all these are inflicted by fiends who bear the shape of men.",
        "source": "Harriet Jacobs, Incidents in the Life of a Slave Girl, Written by Herself (1861), from the chapter 'The Trials of Girlhood.' Project Gutenberg.",
        "href": "https://www.gutenberg.org/cache/epub/11030/pg11030.txt"
      },
      {
        "category": "artistic",
        "title": "Jean-Léon Gérôme's The Slave Market shows a buyer coldly probing the mouth of a naked captive woman while robed men appraise her like livestock. Painted as a nineteenth-century Orientalist tableau, it lays bare the ancient commerce in enslaved women that ISIS revived in 2014, complete with price lists and slave markets for captured Yazidis. The picture denies the viewer any comfortable distance; we are made to stand among the buyers. It is the visual grammar of the crime the German court condemned.",
        "excerpt": "Gérôme depicts a slave market in which a nude captive woman is displayed for sale as a prospective buyer forces open her mouth to inspect her teeth, the way one would check livestock. Around her, robed men wait their turn to appraise the merchandise. The cool, meticulous realism makes the transaction all the more chilling: a human being reduced to a body for purchase.",
        "source": "Jean-Léon Gérôme (1824-1904), The Slave Market (Le Marché d'esclaves), oil on canvas; via Wikimedia Commons (Google Art Project).",
        "href": "https://commons.wikimedia.org/wiki/File:Jean-L%C3%A9on_G%C3%A9r%C3%B4me_-_The_Slave_Market_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/germany-convicts-couple-yazidi-enslavement--a5.png",
          "alt": "Oil painting of a slave market: a nude captive woman stands while a buyer inspects her teeth and robed men look on.",
          "credit": "Jean-Léon Gérôme, 'The Slave Market' (Le Marché d'esclaves). Public domain, via Wikimedia Commons (Google Art Project)."
        }
      },
      {
        "category": "artistic",
        "title": "Verdi's Nabucco (1842) gives the enslaved Hebrews, exiled in Babylon, the chorus 'Va, pensiero,' thought flying on golden wings back to a lost homeland. It became an anthem for every people torn from its soil and held in bondage, its longing indistinguishable from that of the Yazidis driven from Sinjar into captivity. The chorus mourns a ruined temple and a scattered nation, precisely the fate ISIS sought to impose on a religious minority. The music does what the verdict does: it refuses to let the captives be forgotten.",
        "excerpt": "Va, pensiero, sull'ali dorate;\nVa, ti posa sui clivi, sui colli,\nove olezzano tepide e molli\nl'aure dolci del suolo natal!\nDel Giordano le rive saluta,\ndi Sionne le torri atterrate…",
        "source": "Giuseppe Verdi, Nabucco (1842), Act III, 'Va, pensiero, sull'ali dorate' (Chorus of the Hebrew Slaves), libretto by Temistocle Solera. Full score on IMSLP (public domain).",
        "href": "https://imslp.org/wiki/Nabucco_(Verdi,_Giuseppe)"
      }
    ],
    "rank": 30
  },
  {
    "slug": "congo-ebola-spreads-provinces",
    "headline": "Democratic Republic of Congo's Ebola outbreak spreads to two more provinces",
    "overview": "The Democratic Republic of Congo said its Ebola outbreak has spread to two additional provinces, health officials reported on July 13, 2026, widening an emergency that has strained the country's health system. Authorities are racing to trace contacts and deploy vaccines against the hemorrhagic fever, which spreads through bodily fluids and can be highly lethal. The World Health Organization has flagged the outbreak as a serious concern.",
    "genre": "Science",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMivAFBVV95cUxQeHZ5TlB5OTAwb0tINDBBRVBYaU5ERXJZQkthTmYtMXVlcTl4dFp1VFg4cFZlM0h6WGlTQ3hiWUpKSnFfX2VvZ2xJY013TXdrTTcxd3ZWTjNHM0JWVTRXZDI2MW9tRC1nZ05vRkZ1YUF5OFlFUXRaZXcxRi02a3U5TzBWZzJpOXVQWWEyWVZIaWdYeThxMHJMdFRWeDBfOURDQXB6WWk5TEN6TzY1MUVHSWUxTDVuQ2JLY0c2bQ?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://news.google.com/rss/articles/CBMiWkFVX3lxTE1wVERtZkpCMzNrZ1lKNHVlQ1RaS2N1QVcyaVRMT3JTV2puMTVvWm1IUEhVWklQVVFteDkyWEtXbmRiRHY5alpBN0hydEJuZDF6WXhxa003NXRqdw?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-13",
    "image": {
      "src": "/covers/congo-ebola-spreads-provinces.png",
      "alt": "Colorized transmission electron micrograph of an Ebola virus virion.",
      "credit": "Cynthia Goldsmith / CDC Public Health Image Library (PHIL #10816); public domain via Wikimedia Commons"
    },
    "edition": "Evening Edition · 13 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In 430 BC a plague, said to have travelled from Ethiopia through Egypt before striking Athens, mirrors the way Congo's Ebola has now leapt across provincial borders. Thucydides, who caught the disease and survived, recorded not only its relentless geographic spread but how mortal fear corroded the bonds of law and faith. His warning that a stricken people, expecting to die, ceases to be restrained by god or law is the oldest account of how contagion dissolves a society.",
        "excerpt": "It first began, it is said, in the parts of Ethiopia above Egypt, and thence descended into Egypt and Libya and into most of the King's country. Suddenly falling upon Athens, it first attacked the population in Piraeus... Fear of gods or law of man there was none to restrain them. As for the first, they judged it to be just the same whether they worshipped them or not, as they saw all alike perishing; and for the last, no one expected to live to be brought to trial for his offences",
        "source": "Thucydides, History of the Peloponnesian War, Book II, the Plague of Athens (430 BC), trans. Richard Crawley",
        "href": "https://www.gutenberg.org/cache/epub/7142/pg7142.txt"
      },
      {
        "category": "historical",
        "title": "As Ebola widens its reach across the Congo, the marked doors of London in 1665 offer a nearer echo. Samuel Pepys, walking through Drury Lane during the Great Plague, saw the first houses sealed and painted with a red cross and the plea 'Lord have mercy upon us'. His visceral dread, and his resort to tobacco against the contagion, capture the private terror that spreads faster than any pathogen.",
        "excerpt": "This day, much against my will, I did in Drury Lane see two or three houses marked with a red cross upon the doors, and \"Lord have mercy upon us\" writ there; which was a sad sight to me, being the first of the kind that, to my remembrance, I ever saw. It put me into an ill conception of myself and my smell, so that I was forced to buy some roll-tobacco to smell to and chaw, which took away the apprehension.",
        "source": "The Diary of Samuel Pepys, entry for 7 June 1665 (Great Plague of London), ed. Mynors Bright and H. B. Wheatley",
        "href": "https://www.gutenberg.org/files/4162/4162-h/4162-h.htm"
      },
      {
        "category": "literary",
        "title": "Boccaccio framed the Decameron with the 1348 plague of Florence, whose horror was less the dying than the unravelling of human ties. He describes brother forsaking brother and parents abandoning their own children to the pestilence - the same fracture the Congo's health workers fight as fear of Ebola tempts families to flee the sick. It is literature's classic anatomy of how an epidemic corrodes love and duty from within.",
        "excerpt": "that brother forsook brother, uncle nephew and sister brother and oftentimes wife husband; nay (what is yet more extraordinary and well nigh incredible) fathers and mothers refused to visit or tend their very children, as they had not been theirs.",
        "source": "Giovanni Boccaccio, The Decameron, Introduction to Day the First (the 1348 plague of Florence), trans. John Payne",
        "href": "https://www.gutenberg.org/files/23700/23700-h/23700-h.htm"
      },
      {
        "category": "literary",
        "title": "Defoe's Journal of the Plague Year reconstructs London's 1665 outbreak through the rising bills of mortality and the panicked exodus of those with means to run. His scene of nobility and gentry thronging out of the city, carts loaded with goods, is the archetype of flight from a stricken land - and a mirror of the population movements that now help Ebola jump from province to province. The novel shows how rumor, statistics and fear drive an epidemic's human geography.",
        "excerpt": "increase of burials in St Giles's parish more than usual, it began to be suspected that the plague was among the people at that end of the town... the richer sort of people, especially the nobility and gentry from the west part of the city, thronged out of town with their families and servants in an unusual manner",
        "source": "Daniel Defoe, A Journal of the Plague Year (1722), a narrative of London's Great Plague of 1665",
        "href": "https://www.gutenberg.org/files/376/376-h/376-h.htm"
      },
      {
        "category": "artistic",
        "title": "Bruegel's The Triumph of Death imagines pestilence as an unstoppable army of skeletons overrunning an entire land, dragging king and peasant alike into a single, borderless catastrophe. Painted around 1562 in the shadow of Europe's recurring plagues, it renders exactly the dread now spreading with Ebola across the Congo's provinces: a contagion that respects no rank, prayer or frontier. The panel is the visual grammar of an emergency that strains every bond of society at once.",
        "excerpt": "An army of skeletons lays waste to a scorched, smoke-darkened land while the living are herded toward a coffin-like trap. The dead haul a cart of skulls and cut down king, cardinal and peasant without distinction; no rank, wealth or prayer holds back the advancing tide. It is a whole world engulfed at once by a borderless mortality.",
        "source": "Pieter Bruegel the Elder, The Triumph of Death, c. 1562, oil on panel, Museo Nacional del Prado, Madrid (P01393)",
        "href": "https://commons.wikimedia.org/wiki/File:The_Triumph_of_Death_by_Pieter_Bruegel_the_Elder.jpg",
        "image": {
          "src": "/covers/congo-ebola-spreads-provinces--a5.png",
          "alt": "Pieter Bruegel the Elder's painting The Triumph of Death, showing armies of skeletons overwhelming people of every rank across a devastated landscape.",
          "credit": "Pieter Bruegel the Elder, c. 1562, Museo del Prado; public domain via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Saint-Saëns's Danse macabre sets Henri Cazalis's poem of Death fiddling in a graveyard at midnight while the dead rise and dance - the plague year's oldest emblem, the danse macabre, turned into sound. Its whirling waltz, quoting the Dies irae chant of judgment, evokes the leveling terror of an epidemic in which all ranks join the same procession. As Ebola spreads through the Congo, the tone poem is a fitting requiem for a fear that dances across every border.",
        "excerpt": "Zig et zig et zig, la mort en cadence\nFrappant une tombe avec son talon,\nLa mort à minuit joue un air de danse,\nZig et zig et zag, sur son violon.\n\nLe vent d'hiver souffle, et la nuit est sombre,\nDes gémissements sortent des tilleuls;\nLes squelettes blancs vont à travers l'ombre\nCourant et sautant sous leurs grands linceuls,",
        "source": "Henri Cazalis, 'Danse macabre' (epigraph poem), set by Camille Saint-Saëns as Danse macabre, Op. 40 (1874); score at IMSLP",
        "href": "https://imslp.org/wiki/Danse_macabre,_Op.40_(Saint-Sa%C3%ABns,_Camille)"
      }
    ],
    "rank": 31
  },
  {
    "slug": "spacex-starship-review-cleared",
    "headline": "A U.S. regulator closes its safety review, clearing SpaceX's Starship for its next test flight",
    "overview": "A U.S. aviation regulator has closed its mishap review of SpaceX's giant Starship rocket, clearing the way for the company's next test flight, officials said on July 13, 2026. The decision follows a string of explosive test failures during the vehicle's development and comes weeks after SpaceX's landmark stock-market debut. Starship, the most powerful rocket ever built, is central to plans for carrying cargo and eventually people beyond Earth orbit.",
    "genre": "Science",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMixAFBVV95cUxNSDlGX0dNNkh1R0ttWnF1YjkweWdic25XU3dQUGtKTTRmWldTenhab0d0dk80c0JZZUJkdkJGTm5pT01tVVJsMDFOdG02UlRGbG9TY0Z2bGp2Q3VhazVORzd4ZkFCd1pzSlFTQzdkT21LLU1hanNBMWVMaFBHclNQb2VRcmE0VkJraVpjbWxOM2hrdHU4eHBfMVNXSG5RRS05NUh2T0VZQmY1N05mRFlUMGYtYldtRWxZbndtU3RUSHZwN05Y?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c3wyj6e4210o"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-13",
    "image": {
      "src": "/covers/spacex-starship-review-cleared.png",
      "alt": "The launch plume of a SpaceX Starship rocket rising from the Texas coast, photographed from orbit aboard the International Space Station.",
      "credit": "NASA / Don Pettit; public domain (work of the U.S. federal government), via Wikimedia Commons."
    },
    "edition": "Evening Edition · 13 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Before rockets, humanity's first ascent to the heavens rode on hot air and hydrogen. In 1783 Benjamin Franklin stood in a Paris crowd and watched an unmanned balloon climb until it was 'scarce bigger than an Orange,' the first craft people ever sent deliberately toward the sky. Like the crowds now tracking Starship, he understood that a fragile, half-understood machine had opened a road upward, and that the point was not immediate use but wonder and what might follow.",
        "excerpt": "There was some Wind, but not very strong. A little Rain had wet it, so that it shone, and made an agreeable Appearance. It diminish'd in Apparent Magnitude as it rose, till it enter'd the Clouds, when it seem'd to me scarce bigger than an Orange, and soon after became invisible, the Clouds concealing it.",
        "source": "Benjamin Franklin to Sir Joseph Banks, 30 August 1783, describing M. Charles's hydrogen balloon ascent at the Champ de Mars, Paris (27 August 1783); reprinted in Abbott Lawrence Rotch, 'Benjamin Franklin and the First Balloons' (Worcester, 1907), Project Gutenberg.",
        "href": "https://gutenberg.org/files/43809/43809-h/43809-h.htm"
      },
      {
        "category": "historical",
        "title": "Starship's promise is to carry cargo and people beyond Earth orbit, the same frontier Apollo 11 first crossed in 1969. That triumph came only after the fatal Apollo 1 fire and years of explosive test failures, until the Eagle finally settled onto the Moon and Neil Armstrong stepped down. A regulator clearing Starship to fly again after its own string of fiery breakups echoes that pattern exactly: catastrophe, relentless iteration, and then a giant leap.",
        "excerpt": "Houston, Tranquility Base here, the Eagle has landed. [...] That's one small step for [a] man, one giant leap for mankind.",
        "source": "Apollo 11 lunar landing and first steps, 20 July 1969; NASA History, '55 Years Ago: Apollo 11's One Small Step, One Giant Leap.'",
        "href": "https://www.nasa.gov/history/55-years-ago-apollo-11s-one-small-step-one-giant-leap/"
      },
      {
        "category": "literary",
        "title": "The daring and hubris of flight has a founding myth: Daedalus's wax-and-feather wings and his son Icarus's fatal climb toward the sun. Starship's repeated fiery disintegrations read like Icarus falls in miniature, the price of soaring too fast and too high on untested wings. Yet Daedalus, who buried his son, flew on to safety, the myth's quiet reminder that the fall is a lesson to those willing to try the sky again.",
        "excerpt": "but as he neared the scorching sun, its heat softened the fragrant wax that held his plumes; and heat increasing melted the soft wax— he waved his naked arms instead of wings, with no more feathers to sustain his flight. And as he called upon his father's name his voice was smothered in the dark blue sea, now called Icarian from the dead boy's name.",
        "source": "Ovid, Metamorphoses, Book VIII (Daedalus and Icarus), trans. Brookes More (Boston: Cornhill Publishing Co., 1922); Perseus Digital Library, Tufts University.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0028:book=8:card=183"
      },
      {
        "category": "literary",
        "title": "In 1865 Jules Verne imagined an American gun club firing three men moonward from Florida, uncannily near the coast from which SpaceX now launches. His departure is pure fire and thunder, a projectile 'victoriously cleaving the air in the midst of the fiery vapors.' Starship, the most powerful rocket ever built, makes Verne's spectacle literal, and a regulator's approval is the modern counterpart of his Gun Club's long-awaited command to fire.",
        "excerpt": "Instantly Murchison pressed with his finger the key of the electric battery, restored the current of the fluid, and discharged the spark into the breech of the Columbiad. An appalling unearthly report followed instantly, such as can be compared to nothing whatever known, not even to the roar of thunder, or the blast of volcanic explosions! No words can convey the slightest idea of the terrific sound! An immense spout of fire shot up from the bowels of the earth as from a crater. The earth heaved up, and with great difficulty some few spectators obtained a momentary glimpse of the projectile victoriously cleaving the air in the midst of the fiery vapors!",
        "source": "Jules Verne, From the Earth to the Moon, Chapter XXVI ('Fire!'), trans. Louis Mercier and Eleanor E. King (1873); Wikisource.",
        "href": "https://en.wikisource.org/wiki/From_the_Earth_to_the_Moon/Chapter_XXVI"
      },
      {
        "category": "artistic",
        "title": "Bruegel sets a great catastrophe in a corner: a ploughman, a shepherd, and a fisherman work on while Icarus's pale legs vanish into the sea, unnoticed. It is a bracing gloss on Starship's explosions, dramatic fireballs the world quickly moves past as the next launch is prepared. The painting quietly asks whether we truly reckon with the fall, or simply keep our eyes on the flight and the fields.",
        "excerpt": "In a luminous coastal landscape a ploughman, a shepherd and a fisherman go calmly about their work while, almost hidden in the lower right, two pale legs disappear into the green water, all that is left of Icarus after his plunge from the sky. The great human disaster is reduced to a splash at the edge of an indifferent, sunlit world that carries on regardless.",
        "source": "Pieter Bruegel the Elder, Landscape with the Fall of Icarus, c. 1555-1560, oil on canvas, Royal Museums of Fine Arts of Belgium, Brussels; Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_de_Oude_-_De_val_van_Icarus.jpg",
        "image": {
          "src": "/covers/spacex-starship-review-cleared--a5.png",
          "alt": "Bruegel painting of a sunlit sea and coastline with a ploughman, a shepherd and a sailing ship, while Icarus's legs disappear into the water at the lower right.",
          "credit": "Pieter Bruegel the Elder, Landscape with the Fall of Icarus (c. 1555-1560), Royal Museums of Fine Arts of Belgium, Brussels; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Holst gave each planet a musical character, turning the night sky into an orchestral cosmos decades before any human could reach it. From the pounding march of 'Mars, the Bringer of War' to the soaring hymn at the heart of 'Jupiter,' the suite captures both the fire-and-thunder of a launch and the longing that drives Starship beyond Earth. As a regulator clears the path toward other worlds, Holst's cosmic imagination sounds less like fantasy than like a score written for the mission.",
        "excerpt": "Composed between 1914 and 1917, the seven-movement orchestral suite portrays the planets as astrological characters, from the relentless five-beat march of 'Mars, the Bringer of War' and the broad soaring melody at the centre of 'Jupiter' to the fading, wordless offstage voices that close 'Neptune, the Mystic.' Its enormous orchestra conjures the scale, menace and wonder of the heavens.",
        "source": "Gustav Holst, The Planets, Op. 32 (1914-1917), full orchestral score; IMSLP / Petrucci Music Library.",
        "href": "https://imslp.org/wiki/The_Planets,_Op.32_(Holst,_Gustav)"
      }
    ],
    "rank": 32
  },
  {
    "slug": "bangladesh-floods-51-dead",
    "headline": "Floods and landslides in Bangladesh kill at least 51 people and displace more than a million",
    "overview": "Days of heavy monsoon rain have triggered floods and landslides across south-eastern Bangladesh, killing at least 51 people and affecting more than a million, officials said on July 13, 2026. Thousands have lost their homes as rivers burst their banks and hillsides collapsed, submerging villages and cutting off roads. Bangladesh, a low-lying delta nation, is among the countries most exposed to the intensifying floods driven by a warming climate.",
    "genre": "Climate",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/ce8k7e75k7go"
      },
      {
        "name": "The Independent",
        "href": "https://news.google.com/rss/articles/CBMiswFBVV95cUxOcE84LVBrVFFiajFfNlFFbXZyTTFibGpZVXBDQXJsMmZ4ZzJFbEVXVEZRTDRaNi12REQ1dy1Udmh2V3VGejBSX0VPdGRfaHhwTDNtSzIxcThXbmFteVlSSHRNVV9UWWJBVXJYSHhzV01HM3p0MDFzYWVzQjVkLUQ5SFBSSnhWeldkV0kza0kwSHBCVUtfd1hGeDV5NlVWWkhNWTJGWGk5VjltVXN3ZTFrMDJ5bw?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-13",
    "image": {
      "src": "/covers/bangladesh-floods-51-dead.png",
      "alt": "A man wades away from his flooded house carrying belongings during severe monsoon flash flooding in Sylhet, Bangladesh.",
      "credit": "Photograph by Nayeemibnmatiur, 2022. CC BY-SA 4.0, via Wikimedia Commons."
    },
    "edition": "Evening Edition · 13 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Nineteen centuries before Bangladesh's rivers burst their banks, Tacitus recorded the Tiber swelling with unbroken rain until it drowned the low-lying quarters of Rome, killing people and toppling buildings. His terse account is a reminder that settlements beside great rivers have always lived at the water's mercy. As the monsoon submerges the delta's villages, the same ancient dynamic plays out: a river fed past its limits, and human life paying the price.",
        "excerpt": "In the same year the Tiber, swollen by continuous rains, flooded the level portions of the city. Its subsidence was followed by a destruction of buildings and of life.",
        "source": "Tacitus, The Annals, Book I, ch. 76, trans. Alfred John Church and William Jackson Brodribb (London: Macmillan, 1876), via the Perseus Digital Library",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0078:book=1:chapter=76"
      },
      {
        "category": "historical",
        "title": "In 1889 a dam above Johnstown, Pennsylvania gave way after days of torrential rain, and a wall of water annihilated the valley while a survivor watched houses crushed like egg shells. Like the Bangladeshi villages swept away when hillsides collapsed and rivers overflowed, Johnstown shows how quickly rushing water can erase a whole community. The disaster became a byword for the sudden, total helplessness of people before a flood they cannot outrun.",
        "excerpt": "\"I cannot describe the mad rush,\" he said. \"At first it looked like dust. That must have been the spray. I could see houses going down before it like a child's play blocks set on edge in a row. As it came nearer I could see houses totter for a moment, then rise and the next moment be crushed like egg shells, against each other.\"",
        "source": "Willis Fletcher Johnson, History of the Johnstown Flood (Philadelphia: Edgewood Publishing Co., 1889), eyewitness account of Richard Davis, via Project Gutenberg",
        "href": "https://www.gutenberg.org/files/41271/41271-h/41271-h.htm"
      },
      {
        "category": "literary",
        "title": "Ovid's telling of Deucalion's flood imagines the gods drowning the whole earth until land and sea become a sea without a shore, its survivors clinging to the nearest hill or riding out the deluge in a boat. That image of humanity reduced to seeking any scrap of high ground mirrors the million-plus Bangladeshis driven from submerged homes toward shelter. The classical deluge myth frames the monsoon catastrophe as an ancient, recurring terror: the world unmade by water.",
        "excerpt": "the budding groves, the houses, sheep and men,—\nand holy temples, and their sacred urns.\nThe mansions that remained, resisting vast\nand total ruin, deepening waves concealed\nand whelmed their tottering turrets in the flood\nand whirling gulf. And now one vast expanse,\nthe land and sea were mingled in the waste\nof endless waves—a sea without a shore.\n\nOne desperate man seized on the nearest hill;\nanother sitting in his curved boat,\nplied the long oar where he was wont to plow;",
        "source": "Ovid, Metamorphoses, Book I (the flood of Deucalion), trans. Brookes More (Boston: Cornhill Publishing Co., 1922), via the Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0028:book=1:card=253"
      },
      {
        "category": "literary",
        "title": "The oldest surviving flood story, carved on Assyrian tablets from Nineveh, has the storm-god's cyclone climb to the mountains and turn all mankind to mud while even the gods cower in terror by the wall. Its vision of water as an overwhelming, world-ending force resonates with a delta nation where a single monsoon can put a million lives underwater. Millennia apart, the Bangladeshi villager on the rooftop and Ut-Napishtim in his ship share the same smallness before the rising flood.",
        "excerpt": "110. Swiftly it mounted up ..... [the water] reached to the mountains\n111. [The water] attacked the people like a battle.\n112. Brother saw not brother.\n113. Men could not be known (or, recognized) in heaven.\n114. The gods were terrified at the cyclone.\n115. They betook themselves to flight and went up into the heaven of Anu.\n116. The gods crouched like a dog and cowered by the wall.\n[...]\n132. The sea became quiet and went down, and the cyclone and the rain-storm ceased.\n133. I looked over the sea and a calm had come,\n134. And all mankind were turned into mud,",
        "source": "The Babylonian Story of the Deluge as Told by Assyrian Tablets from Nineveh, Eleventh Tablet of the Epic of Gilgamish, trans. E. A. Wallis Budge (British Museum, 1920), via Project Gutenberg",
        "href": "https://www.gutenberg.org/files/7096/7096-h/7096-h.htm"
      },
      {
        "category": "artistic",
        "title": "Gustave Doré's 1866 engraving 'The Deluge' shows a knot of the doomed clinging to a last bare rock as the biblical floodwaters climb, a mother straining to lift her child clear of the surge. It distils exactly what south-eastern Bangladesh endured: families crowded onto whatever high ground remained as villages vanished beneath the water. Doré makes visible the terror behind the statistics — the human scramble for refuge when almost none is left.",
        "excerpt": "A cluster of naked figures clings to the last spur of rock rising above the swelling flood, a mother reaching up to hold her infant clear of the waves while the light breaks coldly over the drowning world. Below them bodies drift in a churning, shoreless sea, and the whole earth seems about to vanish beneath the deluge.",
        "source": "Gustave Doré, 'The Deluge' (Plate I), engraving from The Holy Bible, According to the Authorised Version, with Illustrations by Gustave Doré (London: Cassell, 1866)",
        "href": "https://commons.wikimedia.org/wiki/File:Gustave_Doré_-_The_Holy_Bible_-_Plate_I,_The_Deluge.jpg",
        "image": {
          "src": "/covers/bangladesh-floods-51-dead--a5.png",
          "alt": "Engraving of naked figures and animals clinging to a bare rock as biblical floodwaters rise around them, a mother lifting her child above the waves.",
          "credit": "Gustave Doré, 'The Deluge' (Plate I, The Holy Bible, 1866). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Camille Saint-Saëns opened his 1875 oratorio 'Le Déluge' with a famous Prélude whose long, keening violin solo over hushed strings evokes both the grief and the inexorable rise of the biblical flood. The music turns catastrophe into lament, holding the same emotional space as a nation mourning at least 51 dead and more than a million displaced. Its slow gathering of sound mirrors the way monsoon water rises quietly and then overwhelms everything.",
        "excerpt": "The Prélude unfolds as a hushed, sustained string chorale broken by a single violin's rising, mournful song — the sound of waters silently gathering. Saint-Saëns lets the line swell and subside like a tide, transforming the story of the Flood into a meditation on sorrow and the slow, unstoppable approach of the deep.",
        "source": "Camille Saint-Saëns, Le déluge (The Flood), Op. 45, oratorio (1875), full score and Prélude, via IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Le_déluge,_Op.45_(Saint-Saëns,_Camille)"
      }
    ],
    "rank": 33
  },
  {
    "slug": "eu-record-russian-lng-imports",
    "headline": "The EU imported a record volume of liquefied natural gas from Russia's largest plant in early 2026",
    "overview": "The European Union imported a record amount of liquefied natural gas from Russia's biggest LNG facility in the first half of 2026, data showed on July 13, even as the bloc plans to ban Russian gas imports by 2027. The purchases underscore how difficult Europe has found it to sever its energy ties with Moscow while the war in Ukraine continues. Critics say the revenue helps fund the Kremlin's war effort.",
    "genre": "Climate",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMipgFBVV95cUxQNFNYaWdWVnhkOWpJTTItbGUtMUtPdTFoUmlndFExemVGOEsySmx2RkdCVzItZjNtS21sZ2EzMHZLd1MzNzVjNXk1bzdqSUx6dXNvWTBhUVpfSGs5QWQ5TnlKZXVwNHVqY3lONnNWMVNPMjR3U0Iwbm1sTVdZM1RjTUlkaFJWSEtUY0VUS3Vab0swczJpQkthMXlWUm5RMzJMZWQ3c0tR?oc=5"
      },
      {
        "name": "OilPrice.com",
        "href": "https://news.google.com/rss/articles/CBMiswFBVV95cUxNVzhLOG5qUG1Ua09tekVBT1FWbXA2N3pVdzRyTnBPZ2tVUThUVno3MERQNk1uM0g0bE04UFJ1ZnZPdHNoM1cyTGNzOUdwRGtLdEpiQzJxUVNPQ0dZVFY4NlFKU3ItcFJrbnRDRlJWdVA3SFZlMDgtbm93S3RFTTAzd0ZBeFltb3ZfclRFbWxjUkU2WlY3ZVNnQ2tDMG94dzNKUXNWNnpMY3BfYktWVnRJbi13cw?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-13",
    "image": {
      "src": "/covers/eu-record-russian-lng-imports.png",
      "alt": "A large membrane-type liquefied natural gas carrier at sea, its rounded cargo-containment domes visible along the deck.",
      "credit": "Photo by 青空白帆 (Aozora Hakuhan), CC BY 2.1 Japan, via Wikimedia Commons."
    },
    "edition": "Evening Edition · 13 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In 1806 Napoleon decreed a total blockade of Britain, forbidding all commerce with the enemy across his continent — yet European ports could not quit British goods, and the smuggling never stopped. The Continental System is the mirror image of the EU's predicament: a sweeping prohibition on paper undone by an appetite that reality refuses to surrender. Then as now, a declared embargo collided with the stubborn economics of dependence, and the trade flowed on beneath the decree.",
        "excerpt": "ART. 1. The British Isles are declared to be in a state of blockade.\nART. 2. All commerce and all correspondence with the British Isles are forbidden. Consequently letters or packages directed to England or to an Englishman or written in the English language shall not pass through the mails and shall be seized.",
        "source": "Napoleon I, Berlin Decree, 21 November 1806, Articles 1–2 (Continental System)",
        "href": "https://en.wikisource.org/wiki/Berlin_Decree"
      },
      {
        "category": "historical",
        "title": "When Arab producers cut oil to the West in the winter of 1973, Nixon told Americans that their prosperity had 'bumped up against the limits' of a supply held hostage by hostile powers abroad. The embargo exposed how a great economy can be gripped by the very nation it opposes, its furnaces fed by an adversary's spigot. Europe's record purchases of Russian LNG in 2026 replay that lesson: the belt-tightening vow and the wrenching difficulty of severing an energy lifeline to a rival.",
        "excerpt": "Because of that war, most of the Middle Eastern oil producers have reduced overall production and cut off their shipments of oil to the United States. By the end of this month, more than 2 million barrels a day of oil we expected to import into the United States will no longer be available. … In the long run, it means that we must develop new sources of energy which will give us the capacity to meet our needs without relying on any foreign nation.",
        "source": "Richard Nixon, “Address to the Nation About Policies To Deal With the Energy Shortages,” November 7, 1973 (Public Papers of the Presidents)",
        "href": "https://www.presidency.ucsb.edu/documents/address-the-nation-about-policies-deal-with-the-energy-shortages"
      },
      {
        "category": "literary",
        "title": "Esau, faint with hunger, trades his birthright — his lasting inheritance — for a single bowl of red lentil pottage, and 'despised' the very thing he sold. It is the oldest parable of surrendering a great principle to an immediate appetite. Europe's leaders, having vowed to end their reliance on Moscow by 2027, keep reaching for the warmth of the pottage while the birthright of independence waits on tomorrow.",
        "excerpt": "29 And Jacob sod pottage: and Esau came from the field, and he was faint: 30 And Esau said to Jacob, Feed me, I pray thee, with that same red pottage; for I am faint: therefore was his name called Edom. 31 And Jacob said, Sell me this day thy birthright. 32 And Esau said, Behold, I am at the point to die: and what profit shall this birthright do to me? 33 And Jacob said, Swear to me this day; and he sware unto him: and he sold his birthright unto Jacob. 34 Then Jacob gave Esau bread and pottage of lentiles; and he did eat and drink, and rose up, and went his way: thus Esau despised his birthright.",
        "source": "Genesis 25:29–34, Authorized (King James) Version",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Genesis/Chapter_25"
      },
      {
        "category": "literary",
        "title": "Marlowe's scholar cuts his own arm and signs away his soul in blood for the power he craves, sealing a bargain he knows will damn him. It is the archetype of the Faustian pact: taking what you need from a dangerous supplier while condemning the source. Critics who say Europe's gas payments fund the Kremlin's war invoke exactly this bargain — the fatal purchase whose price is paid later, in a coin one dreads to name.",
        "excerpt": "Lo, Mephistophilis, for love of thee,\nI cut mine arm, and with my proper blood\nAssure my soul to be great Lucifer's,\nChief lord and regent of perpetual night!\nView here the blood that trickles from mine arm,\nAnd let it be propitious for my wish.\n…\nConsummatum est; this bill is ended,\nAnd Faustus hath bequeath'd his soul to Lucifer.",
        "source": "Christopher Marlowe, The Tragical History of Doctor Faustus (based on the 1604 quarto), Scene V",
        "href": "https://www.gutenberg.org/files/779/779-h/779-h.htm"
      },
      {
        "category": "artistic",
        "title": "Hendrick ter Brugghen's candlelit canvas fixes the instant of the bargain: Jacob's outstretched hand, the steaming bowl, Esau leaning in with his hunter's game, the inheritance changing hands in shadow. The Caravaggesque chiaroscuro turns a domestic transaction into something grave and irreversible. It is the visual counterpart to Europe's dilemma — a momentous exchange conducted for the sake of warmth and appetite, weighed in the balance of the moment rather than the future.",
        "excerpt": "A c.1625 Utrecht Caravaggist oil painting depicting Genesis 25:29–34: the seated Jacob gestures toward a bowl of red pottage as Esau, holding a staff with slain game, agrees to sell his birthright, the figures modelled in dramatic candlelight against darkness.",
        "source": "Hendrick ter Brugghen (1588–1629), “Esau Selling His Birthright,” c.1625, Gemäldegalerie, Berlin",
        "href": "https://commons.wikimedia.org/wiki/File:Hendrick_ter_Brugghen_-_Esau_Selling_His_Birthright_-_WGA22163.jpg",
        "image": {
          "src": "/covers/eu-record-russian-lng-imports--a5.png",
          "alt": "Baroque candlelit painting of Jacob handing a bowl of red pottage to Esau, who leans in holding a staff with dead game, as their aged parents look on in shadow.",
          "credit": "Hendrick ter Brugghen, Esau Selling His Birthright, c.1625, Gemäldegalerie Berlin. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "In the opening scene of Wagner's Das Rheingold the dwarf Alberich renounces love itself to tear the gold from the Rhine and forge a ring of limitless power — wealth wrenched from the earth at a cursed price. Wagner's shimmering, rising orchestral surge that opens the cycle makes primal power seem to well up from the deep. It is the perfect mythic frame for energy drawn from the ground and the moral cost of grasping it: gold, greed, fire, and a bargain that damns the taker.",
        "excerpt": "At the close of Scene 1 the Nibelung Alberich, spurned by the Rhinemaidens, forswears love in order to seize the Rhinegold and forge from it the ring of world-mastery — Wagner setting the theft of power from the deep to surging, elemental music, the Rhinemaidens' cries fading as he flees with the plundered gold.",
        "source": "Richard Wagner, Das Rheingold, WWV 86A (full score, Mainz: B. Schott’s Söhne, 1873), Scene 1",
        "href": "https://imslp.org/wiki/Das_Rheingold,_WWV_86A_(Wagner,_Richard)"
      }
    ],
    "rank": 34
  },
  {
    "slug": "intel-ireland-ai-investment",
    "headline": "Intel announces a 5-billion-euro investment to expand its chipmaking operations in Ireland",
    "overview": "Intel said on July 13, 2026, it will invest about 5 billion euros (roughly $5.7 billion) to expand its semiconductor manufacturing in Ireland, as it races to keep pace with surging demand for artificial-intelligence chips. The move deepens the U.S. company's decades-long presence at its Leixlip campus near Dublin and bolsters Europe's ambitions to build more advanced chips at home. Intel has been retooling its strategy amid intense competition in the AI era.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMitAFBVV95cUxPdUpmMER1MXFvS29zY1R4cWY5N3pGQkR0bnFYeVFuY0NCWkFMWXBCQlBLWFh3Vk5VVDkwaTlwMWtxQm1jTG9MY0dRSVA4R2VmVmtxZ1o2eXlUVGl4Q1EwUjBwdjRlSWEtZW1TQVRUVkRYemJHWXYyamQwVmxHWUotVzhlRDltRXBLZURpdDhSYmM1ZmZYUVljcEtCSFo0c2szblRQQ0RDdThoT2NLZFdEREpjbVI?oc=5"
      },
      {
        "name": "Financial Times",
        "href": "https://news.google.com/rss/articles/CBMihAFBVV95cUxQR2FWUERTWVNnUGJDM3NMdmRkNEhKS0lGT21LQU5ERVZPLUl0R283azk2SDlXLTlsQ1V0NTNYS2VxMzF5T3BHbEpldmF5WW11cGwtN0tROHFXVjBXNXpMNV9KbTFlSWJKM0hDUGhQQzN2X3g3VEU0eDZ0cHBBSEQtSXlVVVg?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-13",
    "image": {
      "src": "/covers/intel-ireland-ai-investment.png",
      "alt": "A polished 12-inch silicon wafer with a mirror-like reflective surface, the raw substrate of semiconductor chip manufacturing.",
      "credit": "Photo by Peellden, CC BY-SA 3.0, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 13 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Pliny the Elder, writing in first-century Rome, saw iron as the double-edged gift of the forge: the metal that tills the earth and also arms the killer. Intel's five-billion-euro furnace at Leixlip works the same alchemy in silicon, refining sand into the wafers that will drive both medicine and munitions in the AI age. Two thousand years on, Pliny's line that mankind has 'given wings to iron and taught it to fly' reads like a caption for chips that now think.",
        "excerpt": "Next to copper we must give an account of the metal known as iron, at the same time the most useful and the most fatal instrument in the hand of mankind. For by the aid of iron we lay open the ground, we plant trees, we prepare our vineyard-trees, and we force our vines each year to resume their youthful state, by cutting away their decayed branches. It is by the aid of iron that we construct houses, cleave rocks, and perform so many other useful offices of life. But it is with iron also that wars, murders, and robberies are effected, and this, not only hand to hand, but from a distance even, by the aid of missiles and winged weapons... This last I regard as the most criminal artifice that has been devised by the human mind; for, as if to bring death upon man with still greater rapidity, we have given wings to iron and taught it to fly.",
        "source": "Pliny the Elder, Natural History, Book XXXIV, Chapter 39 (14), 'Iron Ores'; trans. John Bostock & H. T. Riley (London, 1855)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0137:book=34:chapter=39"
      },
      {
        "category": "historical",
        "title": "In 1829, watching Britain remade by steam, iron and the factory, Thomas Carlyle declared his era 'the Mechanical Age' and a nation transformed by machinery. Ireland's bet on becoming Europe's chip forge is the same wager at a new frontier, with silicon standing in for steam. Intel's Leixlip expansion is a fresh sign of the times: the engines of the age are once again being cast, and a country is being reshaped by the industry it hosts.",
        "excerpt": "Were we required to characterise this age of ours by any single epithet, we should be tempted to call it, not an Heroical, Devotional, Philosophical, or Moral Age, but, above all others, the Mechanical Age. It is the Age of Machinery, in every outward and inward sense of that word; the age which, with its whole undivided might, forwards, teaches and practises the great art of adapting means to ends.",
        "source": "Thomas Carlyle, 'Signs of the Times', The Edinburgh Review, No. XCVIII (June 1829)",
        "href": "https://sourcebooks.fordham.edu/mod/carlyle-times.asp"
      },
      {
        "category": "literary",
        "title": "When Achilles needed new armour, Hephaestus fired twenty bellows and laid bronze, tin, gold and silver on the flame, the god as master fabricator forging the tools of a hero's power. Intel's fabs are the modern smithy, where inert elements are heated, layered and etched into instruments of both war and wonder. The shield of Achilles and the AI accelerator share a lineage: raw matter transfigured by fire and craft into an edge no rival can match.",
        "excerpt": "And the bellows, twenty in all, blew upon the melting-vats, sending forth a ready blast of every force, now to further him as he laboured hard, and again in whatsoever way Hephaestus might wish and his work go on. And on the fire he put stubborn bronze and tin and precious gold and silver; and thereafter he set on the anvil-block a great anvil, and took in one hand a massive hammer, and in the other took he the tongs. First fashioned he a shield, great and sturdy",
        "source": "Homer, Iliad, Book XVIII, lines 470-478; trans. A. T. Murray (Loeb Classical Library, 1924)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0134:book=18:card=468"
      },
      {
        "category": "literary",
        "title": "Blake's tiger is dreamed at a cosmic forge, 'In what furnace was thy brain?', all awe and dread at a made intelligence too fearsome for its maker fully to grasp. It is an uncanny anticipation of the AI chip: a brain assembled in a furnace, its symmetry fearful. As Intel stokes its Irish furnaces to feed a surging demand for artificial minds, Blake's hammer-and-anvil question hangs over the crucible.",
        "excerpt": "And what shoulder, & what art,\nCould twist the sinews of thy heart?\nAnd when thy heart began to beat.\nWhat dread hand? & what dread feet?\n\nWhat the hammer? what the chain,\nIn what furnace was thy brain?\nWhat the anvil? what dread grasp.\nDare its deadly terrors clasp!",
        "source": "William Blake, 'The Tyger', Songs of Experience (1794)",
        "href": "https://en.wikisource.org/wiki/Songs_of_Innocence_and_of_Experience_(1826)/Songs_of_Experience/The_Tyger"
      },
      {
        "category": "artistic",
        "title": "Velazquez froze the instant Apollo strides into Vulcan's smoky workshop, the smiths caught mid-hammer, iron glowing on the anvil amid startled, sinewy bodies. It is the forge rendered as a place of hard labour and sudden revelation, divine news breaking into a room of sweat and metal. Swap cleanroom whites for the smoke and it becomes the Leixlip fab: skilled hands turning fire and matter into the most coveted tools of the age.",
        "excerpt": "Velazquez's 'The Forge of Vulcan' (1630) captures the moment the sun-god Apollo interrupts the lame smith Vulcan at his anvil to reveal his wife's infidelity. Half-naked labourers freeze around a bar of white-hot iron, hammers suspended, faces turning in astonishment. The painting dignifies the sweat and craft of the metalworker's shop, treating the forge as a theatre where raw fire and skilled hands meet.",
        "source": "Diego Velazquez, The Forge of Vulcan (La Fragua de Vulcano), oil on canvas, 1630, Museo Nacional del Prado, Madrid (P001171)",
        "href": "https://commons.wikimedia.org/wiki/File:Vel%C3%A1zquez_-_La_Fragua_de_Vulcano_(Museo_del_Prado,_1630).jpg",
        "image": {
          "src": "/covers/intel-ireland-ai-investment--a5.png",
          "alt": "Baroque painting of Vulcan's forge: muscular smiths pause around a bar of glowing iron on an anvil as the radiant god Apollo arrives with news.",
          "credit": "Diego Velazquez, The Forge of Vulcan (1630), Museo del Prado; public domain via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Verdi set his roaming smiths singing at dawn, hammers ringing on anvils in opera's most famous chorus, labour turned to exultant music: 'All'opra! all'opra!' ('To work! To work!'). The Anvil Chorus is the sound of the forge as the beating engine of a community's life and pride. Intel's Irish expansion promises the same percussion at industrial scale, the ceaseless beat of fabrication, a nation keeping time with the machines that make the future.",
        "excerpt": "Vedi! le fosche notturne spoglie\nDe' cieli sveste l'immensa vôlta;\nSembra una vedova che alfin si toglie\ni bruni panni ond'era involta.\nAll'opra! all'opra!\nDàgli! Martella!",
        "source": "Giuseppe Verdi, Il trovatore (1853), Act II, No. 7, 'Coro di zingari' (Anvil Chorus); libretto by Salvatore Cammarano",
        "href": "https://imslp.org/wiki/Il_trovatore_(Verdi,_Giuseppe)"
      }
    ],
    "rank": 35
  },
  {
    "slug": "nobel-laureates-ai-economy-warning",
    "headline": "More than 200 experts, including 16 Nobel laureates, urge urgent action on AI's economic impact",
    "overview": "More than 200 experts, among them 16 Nobel laureates along with leading economists and AI researchers, issued a statement on July 13, 2026, urging governments to prepare urgently for artificial intelligence's disruption of jobs and the economy. The signatories warned that the window to manage a rapid transformation of work is closing, and called for policies to cushion displacement and share the gains. The appeal reflects mounting concern that AI could reshape labor markets faster than societies can adapt.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiqwFBVV95cUxQTUt1OTNadWljZVE1WXI3UzhWbC15R3h2eVpFWXFkY2wzeTcyWGNsaFZnYjc5TFhzTE1wX1RRQmdSRGJ5VkFRRzUxZUJ0N0tYdXBkZk1IdGlETTRfaDVXbUs2aTAtcjI3TU9UOFZKU1A3SEs0R25wWWNYTlFyZDZ2ejRGUkJiMjdYaFdOTE9zbmF5QTRxTTFzSmxGWHZqOUhYS1RfNFNGVFdYN00?oc=5"
      },
      {
        "name": "Stanford Digital Economy Lab",
        "href": "https://news.google.com/rss/articles/CBMiZEFVX3lxTE15SUdjbjdsTlBkdkZnTHB5TVhPcjBsS1BrZ1Q4NXFXSl9rVEUwRnNzVy1HbG84aFlJUDVpd08tenFDdUE1dm1ydVdFODNXY29KV2JOSGYycTB2dzJCNEd2ZW41cm4?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-13",
    "image": {
      "src": "/covers/nobel-laureates-ai-economy-warning.png",
      "alt": "1835 engraving of workers tending rows of mechanical power looms inside an early industrial textile mill.",
      "credit": "'Powerloom weaving in 1835,' engraving by J. Tingle after T. Allom, from Edward Baines, History of the Cotton Manufacture in Great Britain (1835). Wikimedia Commons (public domain)."
    },
    "edition": "Evening Edition · 13 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Twenty-three centuries before the Nobel laureates' statement, Aristotle already imagined both the dream and the disquiet now returning: tools that could 'accomplish their own work,' shuttles that weave with no hand to guide them. He used the fantasy to ask who would still be needed once machines did the labour, the very question today's economists press, and hinted at the freedom such self-working instruments might bring, if their gains were shared.",
        "excerpt": "If every instrument could accomplish its own work, obeying or anticipating the will of others, like the statues of Daedalus, or the tripods of Hephaestus, which, says the poet, 'of their own accord entered the assembly of the Gods'; if, in like manner, the shuttle would weave and the plectrum touch the lyre without a hand to guide them, chief workmen would not want servants, nor masters slaves.",
        "source": "Aristotle, Politics, Book I (translated by Benjamin Jowett), c. 350 BCE",
        "href": "https://en.wikisource.org/wiki/The_Politics_(translated_by_Jowett)/Book_1"
      },
      {
        "category": "historical",
        "title": "In his 1812 maiden speech to the House of Lords, Lord Byron rose to defend the Nottingham weavers who had smashed the 'improved' frames that put them out of work, the original Luddites, then facing the death penalty for machine-breaking. His argument that the wellbeing of the labouring poor mattered more than the enrichment of a few by machinery that displaced them is precisely the case the 2026 statement makes: cushion the transition and share the gains, or reap desperation.",
        "excerpt": "By the adoption of one species of Frame in particular, one man performed the work of many, and the superfluous labourers were thrown out of employment. … The rejected workmen in the blindness of their ignorance, instead of rejoicing at these improvements in arts so beneficial to mankind, conceived themselves to be sacrificed to improvements in mechanism.",
        "source": "George Gordon, Lord Byron, Speech on the Frame Work Bill, House of Lords, 27 February 1812 (Hansard, HL Deb vol. 21)",
        "href": "https://api.parliament.uk/historic-hansard/lords/1812/feb/27/frame-work-bill"
      },
      {
        "category": "literary",
        "title": "The ballad of John Henry, the steel-driving man who out-hammered the steam drill only to die with his hammer in his hand, is America's folk memory of flesh racing the machine and winning at the cost of its life. The Nobel laureates warn that a comparable contest is now arriving for human labour on a vast scale, and ask governments to ensure workers are cushioned rather than simply left, like John Henry, to fall.",
        "excerpt": "John Henry went to the mountain,\nBeat that steam-drill down;\nRock was high, po' John was small,\nHe laid down his hammer an' he died,\nLaid down his hammer an' he died.",
        "source": "Howard W. Odum and Guy B. Johnson, Negro Workaday Songs (Chapel Hill: University of North Carolina Press, 1926), Chapter I; via Project Gutenberg",
        "href": "https://www.gutenberg.org/files/69378/69378-h/69378-h.htm"
      },
      {
        "category": "literary",
        "title": "In Samuel Butler's 1872 satire Erewhon, the citizens have banned all machines, persuaded by a philosopher's 'Book of the Machines' that mechanical evolution will one day outrun humanity until people rank no higher beside their own creations than cattle beside us. It is the earliest sustained version of the fear the AI researchers now voice, that unless we choose to act we may be 'gradually superseded by our own creatures.'",
        "excerpt": "it is the machines which act upon man and make him man, as much as man who has acted upon and made the machines; but we must choose between the alternative of undergoing much present suffering, or seeing ourselves gradually superseded by our own creatures, till we rank no higher in comparison with them, than the beasts of the field with ourselves.",
        "source": "Samuel Butler, Erewhon (1872), Chapter XXIII, 'The Machines—concluded' (The Book of the Machines)",
        "href": "https://en.wikisource.org/wiki/Erewhon/Chapter_23"
      },
      {
        "category": "artistic",
        "title": "This hand-coloured etching of 1812 turns the frame-breakers' phantom captain, 'General Ludd,' into a towering figure in a patterned dress striding past mills set ablaze, the industrial age's own image of labour rising against the machine. It is the visual ancestor of today's anxiety and a warning in itself: when displacement is left unmanaged, the historic response has been rage and wreckage, exactly the disorder the laureates hope urgent policy can forestall.",
        "excerpt": "A hand-coloured etching from May 1812 imagines 'General Ludd,' the imaginary leader of the frame-breakers, as a giant in a spotted gown brandishing weapons while cropping-mills burn behind him and Luddite crowds gather. Published as machine-breaking spread through the English textile districts, it dramatises a workforce that felt sacrificed to new machinery and turned to destroying it.",
        "source": "The Leader of the Luddites, hand-coloured etching, published by Walker and Knight, Sweetings Alley, Royal Exchange, London, May 1812 (British Museum)",
        "href": "https://commons.wikimedia.org/wiki/File:Luddite.jpg",
        "image": {
          "src": "/covers/nobel-laureates-ai-economy-warning--a5.png",
          "alt": "1812 hand-coloured etching depicting 'The Leader of the Luddites,' a costumed figure standing before burning textile mills as machine-breakers assemble.",
          "credit": "The Leader of the Luddites, hand-coloured etching, London, May 1812. British Museum, via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "artistic",
        "title": "Paul Dukas set to music the oldest parable of technology unleashed: the sorcerer's apprentice who enchants a broom to fetch his water, then cannot halt the rising flood he has summoned. His galloping 1897 scherzo is the sound of a new power called up and lost control of, the very peril the experts describe, urging that we learn to govern a rapid transformation before, like the apprentice, we are engulfed by it.",
        "excerpt": "Dukas's symphonic scherzo, after Goethe's ballad 'Der Zauberlehrling,' conjures the apprentice who bewitches a broom to haul water and then, ignorant of the counter-spell, watches it multiply and flood the house. A sly bassoon theme lurches to life and swells into an unstoppable churning tumult, until only the returning master can command the deluge to stop, a compact fable of forces easier to start than to arrest.",
        "source": "Paul Dukas, L'apprenti sorcier (The Sorcerer's Apprentice), symphonic scherzo after Goethe's ballad, 1897; full score via IMSLP",
        "href": "https://imslp.org/wiki/L%27apprenti_sorcier_(Dukas,_Paul)"
      }
    ],
    "rank": 36
  },
  {
    "slug": "global-smartphone-shipments-13-year-low",
    "headline": "Global smartphone shipments fall to their lowest second-quarter level in 13 years amid a memory-chip crunch",
    "overview": "Worldwide smartphone shipments in the second quarter of 2026 fell to their lowest level for the period in 13 years, researchers said on July 13, as a shortage of memory chips—worsened by soaring demand from AI data centers—squeezed manufacturers. Rising component costs have pushed up prices and dampened consumer demand for new handsets. The slump highlights how the AI boom is reshaping the electronics supply chain.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMizgFBVV95cUxPUzVTX3dRNjRNZWhfaklORDE4aXE1RzV4NGwtNXVNSDBHMllBN1ZlOU44NnQxMWk5WXlXckRHcWNreFNGb3BKY1RFdjdIbWNNUF90TE1QVUtFTEMzeXNCTlFfRktPbXJETTNlLUk5MjZxQUZxVkItUkZ1NW1NWU5nVUVLYXl0d3FrU3B3U0NqQ1E0bGU3SHltSm1RTjk3NHVkdFRKOFRPNl9xZm5VNks1Q3N0bF9EZE4yRjhfZzVzT3dJVE5KZko0RFpxdjBldw?oc=5"
      },
      {
        "name": "Firstpost",
        "href": "https://news.google.com/rss/articles/CBMivwFBVV95cUxQeDFTc0d6cjhaNWtoblI4NXMwSUhJaEtDaFZWZXlWNGFLWDIwMDR5YktjVkNScFBUMVhQRTVCZDlGSjUwb1VLVUpXY0NrV3FBeGdBWXdIWENRd1NSNmxUX2tHNFdZcTNkUldOX3F5WjJRNDEzYnUyMmlaR0lNUE54ZjRleUtvOVAtc1RZbEZpM2VzbnFFR04yeDNwWXhHb3ZGdVVoRjFSZHpReVdrdzc4MVVfQzlQVHBSUTZBSkxLSdIBxAFBVV95cUxOVXVweFNvQjhpOVplYlVNekFONTJGMGlrOEg0NVVwVG5tNllUOXd2N0VBbmVwMHpnSzd6YjBra2dxSWRoX3JadUdaSkF6OUhjQjJoTEozWTFGdzllSUd4WGlFRUtvSTg4NHRGRFREVkJUTjByTEJDWWJudnk5Vkh6VnhSdTBEUXQ1aHdjbmo5Z29iWDlnamJ6aG5oSGpNWl92WjFJWlg2UjZBLXBsRTVHRlRpMWVTTjBEOEhva1lrbnBTeFFY?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-13",
    "image": {
      "src": "/covers/global-smartphone-shipments-13-year-low.png",
      "alt": "Silicon wafers and derived electronic microchip products displayed in a case.",
      "credit": "Photo by Wikimedia Commons user ArticCynda, 2017. CC0 1.0 public domain dedication, via Wikimedia Commons."
    },
    "edition": "Evening Edition · 13 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In AD 51 the largest city on earth discovered that its abundance was borrowed. Rome fed itself not from Italian fields but from grain fleets sailing out of Africa and Egypt, and when that distant supply faltered the capital came within days of empty granaries. Q2 2026 is the same lesson in silicon: a smartphone industry that looks self-sufficient in fact depends on a thin, far-off stream of memory chips, and when a hungrier customer diverts the flow, the shortfall arrives with startling speed.",
        "excerpt": "It was ascertained that Rome had provisions for no more than fifteen days, and it was through the signal bounty of heaven and the mildness of the winter that its desperate plight was relieved. ... But we prefer to cultivate Africa and Egypt, and trust the life of the Roman people to ships and all their risks.",
        "source": "Cornelius Tacitus, The Annals, Book XII, chapter 43, trans. Alfred John Church and William Jackson Brodribb; Perseus Digital Library, Tufts University.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0078:book=12:chapter=43"
      },
      {
        "category": "historical",
        "title": "In April 1942 Franklin Roosevelt explained to Americans why the shelves were thinning: a single overriding demand, the war effort, was swallowing the materials and labor that ordinary goods required, so what remained had to be rationed among everyone else. The AI data-center boom of 2026 plays the wartime role, consuming the world's memory chips and forcing the mundane economy of consumer phones into scarcity, higher prices, and rationed supply.",
        "excerpt": "Because the demands of the war effort require the rationing of goods of which there is not enough to go around. ... Because the stopping of purchases of non-essentials will release thousands of workers who are needed in the war effort.",
        "source": "Franklin D. Roosevelt, Fireside Chat 21, \"On Sacrifice,\" April 28, 1942; Miller Center, University of Virginia.",
        "href": "https://millercenter.org/the-presidency/presidential-speeches/april-28-1942-fireside-chat-21-sacrifice"
      },
      {
        "category": "literary",
        "title": "The oldest script for a supply shock is Joseph's reading of Pharaoh's dream: seven years of great plenty, then seven years of famine so severe the plenty is forgotten. The memory-chip market has always moved in exactly this fat-and-lean cycle of glut and shortage, and 2026 is its lean turn, the abundance of cheap components giving way to a dearth that spreads, as in Genesis, over all the face of the earth.",
        "excerpt": "Behold, there come seven years of great plenty throughout all the land of Egypt: And there shall arise after them seven years of famine; and all the plenty shall be forgotten in the land of Egypt; and the famine shall consume the land; And the plenty shall not be known in the land by reason of that famine following; for it shall be very grievous. ... And the famine was over all the face of the earth.",
        "source": "The Holy Bible, King James Version, Genesis 41:29–31, 56; Wikisource.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Genesis"
      },
      {
        "category": "literary",
        "title": "Malthus built his gloomy arithmetic on a mismatch of rates: appetite that multiplies geometrically against a supply that can only crawl upward by addition. That is precisely the squeeze behind the 2026 shortage, where the exponential hunger of AI compute outruns the slow, capital-heavy expansion of chip fabrication, so demand outstrips what the fabs can produce and something, this time the smartphone, must go without.",
        "excerpt": "Population, when unchecked, increases in a geometrical ratio. Subsistence increases only in an arithmetical ratio. ... the power of population is indefinitely greater than the power in the earth to produce subsistence for man.",
        "source": "Thomas Robert Malthus, An Essay on the Principle of Population (1798), Chapter I; Project Gutenberg (ebook 4239).",
        "href": "https://www.gutenberg.org/files/4239/4239-h/4239-h.htm"
      },
      {
        "category": "artistic",
        "title": "Bruegel's harvesters rest in a sea of gold, the wheat so tall it dwarfs them, a portrait of the fat years at their peak. Read against a memory famine, the painting is the boom before the bust: the golden plenty that markets, like the peasants dozing in the corn, assume will last, and whose passing into scarcity is the whole story of Q2 2026.",
        "excerpt": "Pieter Bruegel the Elder's 1565 panel shows laborers reaping and gathering a towering wheat field under a hazy summer sky, one group cutting the standing grain while others rest and eat in its shade. It is an image of overflowing abundance and ripe harvest, the visual embodiment of the plentiful years that precede a coming dearth.",
        "source": "Pieter Bruegel the Elder, The Harvesters, 1565, oil on wood, The Metropolitan Museum of Art, New York; via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_the_Elder-_The_Harvesters_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/global-smartphone-shipments-13-year-low--a5.png",
          "alt": "Peasants harvesting and resting in a vast golden wheat field under a hazy summer sky, Pieter Bruegel the Elder, The Harvesters, 1565.",
          "credit": "Pieter Bruegel the Elder, The Harvesters (1565), The Metropolitan Museum of Art. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Handel set the whole Joseph saga to music in 1743, dramatizing the years of famine, the crowds crying for bread, and the granaries that stood between Egypt and starvation. The oratorio turns a supply crisis into lament and deliverance, the same emotional arc now playing out in miniature as chip shortages ripple through a global industry that had grown used to plenty.",
        "excerpt": "Handel's English oratorio Joseph and His Brethren dramatizes the biblical account of Egypt's seven years of famine, the desperate crowds seeking bread, and Joseph's stewardship of the royal storehouses. Its choruses and arias move from anxiety over scarcity toward relief and providence, giving the ancient shortage a voice of both lamentation and hope.",
        "source": "George Frideric Handel, Joseph and His Brethren, HWV 59 (composed 1743, first performed 1744), libretto by James Miller; full score on IMSLP.",
        "href": "https://imslp.org/wiki/Joseph_and_His_Brethren,_HWV_59_(Handel,_George_Frideric)"
      }
    ],
    "rank": 37
  },
  {
    "slug": "eu-gaza-recovery-fund-billion",
    "headline": "The EU and dozens of nations pledge about $1 billion for a Gaza recovery fund",
    "overview": "The European Union, helping to rally dozens of countries, announced on July 13, 2026, that donors had pledged about $1 billion for a fund to help Gaza recover from the devastation of war. Organizers said the money would go toward rebuilding homes, infrastructure and basic services in the shattered territory. The pledges come as international efforts intensify to stabilize Gaza and address a dire humanitarian situation.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMimwFBVV95cUxOeGI1VkFkR0VDbHY3VTJESEFyVjg4MFFleTRRVTRsODdrRlhHQ0N5RlZaaVJLdHl4OVBmVGprMXk0ZGRJZ0ppM2MtemNMTEt2ZWdyeDlVVVNxVmxpWW5Xa1Qzc1JqdmEzT0hTQXhWTTFUdllGTDAxYUV5aFl3cEtYOTlhbXhkTDhkX21nNzdtSzA5SlZkcG55TzRWUQ?oc=5"
      },
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMivAFBVV95cUxQbGdRamk1ajJnclJtTldlbEs4N1RLd3VFbDM5bVYwVC16VFBkVWpRSWZiRW5rVW9qdGZoalMyTHZJVDEwSHVZcDNqR0VTeTB5ZEFjYzZvVEhPWWduMG8tU2JhRUJDV3R2WTltS2pYcUJyeHVabjhTdUxkeXlHdFlrS1JSbk1uakdQbWNWazVscWhTZFNEQWYzT2h6WTBCTl9DYk1MNDV4RHFkQVJsd1RBM0VvdDZ5WWpqV1pxVA?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-13",
    "image": {
      "src": "/covers/eu-gaza-recovery-fund-billion.png",
      "alt": "Black-and-white 1945 photograph of laborers rebuilding the war-ruined city of Warsaw amid rubble.",
      "credit": "Unknown photographer, 1945; print from Polish Archive negative, Marek Tuszynski collection, public domain via Wikimedia Commons."
    },
    "edition": "Evening Edition · 13 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "When the Persians withdrew from a scorched Attica in 479 BC, the Athenians raced to raise their ruined walls, and Thucydides records that the whole population laboured at the task, pulling down their own houses for stone. The billion-dollar Gaza fund echoes that ancient truth: a shattered community is rebuilt not by decree alone but by pooled, collective effort. Then as now, reconstruction was as much an act of communal will as of masonry.",
        "excerpt": "all the men in the city, in the meantime, both they and their wives and children, sparing neither private nor public edifice that might advance the work but pulling all down whatsoever, should help to raise it.",
        "source": "Thucydides, History of the Peloponnesian War, Book 1.90.3, translated by Thomas Hobbes (1629), Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Thuc.+1.90.3"
      },
      {
        "category": "historical",
        "title": "In 1947 George Marshall told Harvard's graduating class that American aid would be directed against 'hunger, poverty, desperation and chaos,' launching the greatest reconstruction of a ruined continent in modern history. The EU-led pledge for Gaza consciously inherits that model: dozens of nations pooling money to revive homes, infrastructure and the ordinary economy of a devastated place. Marshall's warning still applies today — money buys bricks, but its true aim is the conditions in which a normal life can resume.",
        "excerpt": "Our policy is directed not against any country or doctrine but against hunger, poverty, desperation, and chaos. Its purpose should be the revival of a working economy in the world so as to permit the emergence of political and social conditions in which free institutions can exist.",
        "source": "George C. Marshall, remarks at Harvard University, 5 June 1947 (The Marshall Plan Speech), Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Marshall_Plan_Speech"
      },
      {
        "category": "literary",
        "title": "The Book of Nehemiah tells how a returning exile rallied a demoralised people to rebuild Jerusalem's broken walls and fire-burned gates, and they answered, 'Let us rise up and build.' The image of a city lying waste, its gates consumed by fire, maps almost exactly onto Gaza's rubble, and the recovery fund is a modern echo of that summons to rise and rebuild. It is among the oldest reconstruction stories in the Western canon.",
        "excerpt": "Then said I unto them, Ye see the distress that we are in, how Jerusalem lieth waste, and the gates thereof are burned with fire: come, and let us build up the wall of Jerusalem, that we be no more a reproach. ... And they said, Let us rise up and build. So they strengthened their hands for this good work.",
        "source": "The Bible, King James Version, Nehemiah 2:17-18, Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Nehemiah"
      },
      {
        "category": "literary",
        "title": "Longfellow closes 'The Building of the Ship' by turning a newly launched vessel into the ship of state, with all humanity 'hanging breathless on thy fate.' Rebuilding Gaza is the launch of just such a fragile new vessel, and the world's donors, like the poem's onlookers, have staked their hopes on whether it will hold together and sail. The lines capture the anxious hope that attends any great act of building.",
        "excerpt": "Thou, too, sail on, O Ship of State!\nSail on, O Union, strong and great!\nHumanity with all its fears,\nWith all the hopes of future years,\nIs hanging breathless on thy fate!",
        "source": "Henry Wadsworth Longfellow, 'The Building of the Ship' (1849), in The Seaside and the Fireside, Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Seaside_and_the_Fireside/The_Building_of_the_Ship"
      },
      {
        "category": "artistic",
        "title": "Bernardo Bellotto's meticulous 1770s views of Warsaw became, nearly two centuries later, the very blueprints from which the city was rebuilt after the Nazis razed it, proof that a devastated place can be raised again from careful record and collective resolve. Warsaw's phoenix-like return is the encouraging precedent behind the Gaza fund: even near-total destruction need not be the last word. The painting now hangs beside the buildings it helped resurrect.",
        "excerpt": "A luminous panorama of eighteenth-century Warsaw stretched along the Vistula, its palaces, spires and busy riverbank rendered with near-photographic exactness. Painted to glorify a thriving capital, the canvas later served an unimagined purpose: guiding architects who conjured the shattered city back into being after 1945. It stands as a portrait of a place twice made whole.",
        "source": "Bernardo Bellotto, View of Warsaw from the Royal Palace (1773), Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Bernardo_Bellotto,_il_Canaletto_-_View_of_Warsaw_from_the_Royal_Palace_-_WGA01842.jpg",
        "image": {
          "src": "/covers/eu-gaza-recovery-fund-billion--a5.png",
          "alt": "Eighteenth-century oil painting of Warsaw's skyline of palaces and church spires along the Vistula river under a wide sky, by Bernardo Bellotto.",
          "credit": "Bernardo Bellotto, View of Warsaw from the Royal Palace (1773); Web Gallery of Art, public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Beethoven's 1811 incidental music 'The Ruins of Athens' imagines the goddess Minerva waking after two thousand years to find her once-glorious city in ruins, before the score turns toward revival and festive celebration. Its arc, from mourning over a fallen city to the joy of renewal, mirrors the hope that the Gaza fund will carry the territory from rubble toward rebuilt life. Even the famous Turkish March strides like a procession returning to a restored capital.",
        "excerpt": "Beethoven's overture and choruses move from a solemn lament over a city fallen into ruin toward triumphant, celebratory renewal. Composed to consecrate a new theatre, the music dramatizes desolation giving way to reconstruction and communal rejoicing. Its progression from grief to festival makes it a fitting anthem for any place striving to rise from its own ruins.",
        "source": "Ludwig van Beethoven, Die Ruinen von Athen (The Ruins of Athens), Op. 113 (1811), full score, IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Die_Ruinen_von_Athen,_Op.113_(Beethoven,_Ludwig_van)"
      }
    ],
    "rank": 38
  },
  {
    "slug": "john-buck-woodblock-panels",
    "headline": "Colossal features Montana artist John Buck's large pen-and-ink panels drawn from folklore and memory",
    "overview": "The art magazine Colossal on July 13, 2026, spotlighted new work by the Bozeman, Montana-based artist John Buck, whose large-scale pen-and-ink drawings on wooden panels weave together folklore, personal memory and everyday observation into dense, uncanny landscapes. Long known for his woodblock prints and kinetic sculptures, Buck fills each panel with symbolic imagery and layered narrative. The feature places his intricate, storytelling compositions before a wide online audience.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Colossal",
        "href": "https://www.thisiscolossal.com/2026/07/john-buck-wooden-panel-pink-ink-drawings/"
      },
      {
        "name": "Smithsonian American Art Museum",
        "href": "https://americanart.si.edu/artist/john-buck-638"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-13",
    "image": {
      "src": "/covers/john-buck-woodblock-panels.png",
      "alt": "A dense pen-and-ink landscape by John Buck on a wooden panel, crowded with symbolic plants, rock formations and layered narrative imagery.",
      "credit": "John Buck, via Colossal"
    },
    "edition": "Evening Edition · 13 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Five centuries before John Buck carved and drew his teeming Montana panels, Albrecht Dürer was cutting the Apocalypse into blocks of pearwood in Nuremberg, at the moment the woodcut first flowered into serious art. Like Buck's crowded pen-and-ink worlds, Dürer's sheets pack visionary folklore, symbol and terror into a single dense field made from carved wood. This 1911 account of that flowering catches exactly the quality Buck inherits: rugged strength, restless vehemence, and a love of gnarled, writhing, agitated line.",
        "excerpt": "Founding himself to some extent on the traditional motives, Dürer conceived and carried out a set of designs in which the qualities of the German late Gothic style, its rugged strength and restless vehemence, its love of gnarled forms, writhing actions and agitated lines, are fused by the fire of the young master's spirit into vital combination with something of the majestic power and classic severity which he had seen and admired in the works of Mantegna.",
        "source": "Encyclopædia Britannica, 11th ed. (1911), \"Dürer, Albrecht,\" on the Apocalypse woodcuts, via Wikisource",
        "href": "https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/D%C3%BCrer,_Albrecht"
      },
      {
        "category": "historical",
        "title": "Buck's long practice as a woodblock printmaker reaches back to another carved-block tradition on the far side of the world: the Japanese ukiyo-e print of the Edo period, cut into cherrywood and pulled by the thousand. Arthur Davison Ficke's 1915 survey describes a whole floating world crowded onto small sheets, teeming with actors, heroes, festivals and folklore, the same dense inventory of everyday life and legend that Buck layers across his panels. It is a different era and a different hemisphere, but the impulse is his: to fit an entire jostling world into one hand's-breadth of image.",
        "excerpt": "In them appear the forms and faces of the popular actors in their admired rôles, fashionable courtesans decked in all the splendour of their unhappy but far-famed days and nights, legendary heroes, dancers, wrestlers, and popular entertainers. In the matter of landscape, the scenes shown are the festival-crowded temples of Yedo, the sunlit tea-gardens and gay midnight boating-parties of the Sumida River, the great highroads of national travel, the famous spots of popular recreation.",
        "source": "Arthur Davison Ficke, Chats on Japanese Prints (1915), ch. I, \"Preliminary Survey,\" via Project Gutenberg",
        "href": "https://www.gutenberg.org/files/46753/46753-h/46753-h.htm"
      },
      {
        "category": "literary",
        "title": "Buck's ambition to compress a whole cosmos into one panel is the oldest impulse in Western art-writing: Homer's description of the Shield of Achilles, on which the god Hephaestus hammers the earth, the heavens, the sea and every constellation before crowding on cities, weddings, harvests and war. It is ekphrasis as world-making, a single wrought surface asked to hold everything at once. Buck's dense pen-and-ink fields are that same shield redrawn in ink on wood, a private universe engraved into one plane.",
        "excerpt": "Therein he wrought the earth, therein the heavens therein the sea, and the unwearied sun, and the moon at the full, and therein all the constellations wherewith heaven is crowned—the Pleiades, and the Hyades and the mighty Orion, and the Bear, that men call also the Wain, that circleth ever in her place, and watcheth Orion, and alone hath no part in the baths of Ocean.",
        "source": "Homer, Iliad 18.483–489, trans. A. T. Murray (Loeb, 1924), via Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0134%3Abook%3D18%3Acard%3D478"
      },
      {
        "category": "literary",
        "title": "Because Buck is a printmaker who draws dreamlike, symbol-laden worlds, no writer suits him better than William Blake, who etched his own visionary books plate by plate. In this \"Memorable Fancy\" Blake imagines the very act of printmaking as a descent through infernal chambers where raw metal is melted, cast and finally arranged as books, knowledge cut and corroded into form. It is a myth of the carved and bitten plate as the engine of imagination, exactly the alchemy by which Buck turns memory and folklore into image.",
        "excerpt": "I was in a Printing house in Hell & saw the method in which knowledge is transmitted from generation to generation. In the first chamber was a Dragon-Man, clearing away the rubbish from a caves mouth; within, a number of dragons were hollowing the cave, In the second chamber was a Viper folding round the rock & the cave, and others adorning it with gold silver and precious stones. In the third chamber was an Eagle with wings and feathers of air, he caused the inside of the cave to be infinite, around were numbers of Eagle like men, who built palaces in the immense cliffs. In the fourth chamber were Lions of flaming fire raging around & melting the metals into living fluids. In the fifth chamber were Unnam'd forms, which cast the metals into the expanse, There they were reciev'd by Men who occupied the sixth chamber, and took the forms of books & were arranged in libraries.",
        "source": "William Blake, The Marriage of Heaven and Hell (c. 1790), \"A Memorable Fancy,\" via Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Marriage_of_Heaven_and_Hell"
      },
      {
        "category": "artistic",
        "title": "If Buck's uncanny, symbol-crowded landscapes have a single ancestor in painting, it is Hieronymus Bosch's Garden of Earthly Delights, a triptych so dense with folklore, allegory and hybrid creatures that the eye can wander it for hours and never exhaust its stories. Bosch, like Buck, builds a whole teeming, dreamlike world into one pictorial field where every figure is a legible sign and the total effect is delirium. Painted around 1500 on oak panels, it remains the definitive image of the artist as maker of an entire cosmos in miniature.",
        "excerpt": "Bosch's central panel swarms with naked figures, oversized fruit, glassy spheres and improbable birds, a paradise tipping into fever dream. Left and right wings swing from a serene Eden to a black, burning hell of monstrous instruments and tormented bodies. Every inch is worked and populated, so that the three joined panels read as one vast, uncanny landscape crowded with symbol and story.",
        "source": "Hieronymus Bosch, The Garden of Earthly Delights (c. 1490–1500), oil on oak panels, Museo del Prado, Madrid",
        "href": "https://commons.wikimedia.org/wiki/File:The_Garden_of_earthly_delights.jpg",
        "image": {
          "src": "/covers/john-buck-woodblock-panels--a5.png",
          "alt": "Hieronymus Bosch's triptych The Garden of Earthly Delights, its three panels crowded with hundreds of small nude figures, fantastical creatures, giant fruit and a burning hell.",
          "credit": "Hieronymus Bosch, The Garden of Earthly Delights (c. 1490–1500), Museo del Prado; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Buck's panels invite the same slow, room-by-room looking that Mussorgsky set to music in Pictures at an Exhibition, a suite that walks the listener from image to image, its recurring Promenade the tread of a viewer moving down a gallery wall. Each movement conjures a discrete little world of gnomes, castles, marketplaces, catacombs and the witch Baba Yaga, folklore and observation rendered as sound. It is the aural twin of a Buck composition: a crowded sequence of vivid, symbolic scenes gathered into one teeming, unified whole.",
        "excerpt": "Composed in 1874, Mussorgsky's piano suite translates a memorial exhibition of Viktor Hartmann's drawings into music, each of the ten \"pictures\" a sharply drawn miniature world. A returning Promenade carries the listener between them, from a lurching gnome and a haunted old castle to a squabbling Tuileries garden, the hut of Baba Yaga on its fowl's legs, and the towering Great Gate of Kiev. The whole is a gallery in sound, dense with folkloric and everyday imagery.",
        "source": "Modest Mussorgsky, Pictures at an Exhibition (Картинки с выставки), for piano, 1874, via IMSLP",
        "href": "https://imslp.org/wiki/Pictures_at_an_Exhibition_(Mussorgsky,_Modest)"
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
