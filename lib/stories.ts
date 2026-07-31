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
    "slug": "iran-hormuz-ships-oil-price",
    "headline": "Iran says it halted ships in the Strait of Hormuz, turning back six tankers, as oil prices climb",
    "overview": "Iran said on 31 July that its forces had stopped two vessels trying to exit the Strait of Hormuz and turned back four other tankers, deepening a five-month conflict in which Tehran has blocked most traffic through the waterway that normally carries about a fifth of the world's seaborne oil. The reports, which could not be independently verified, came as Iran's army said it had targeted U.S. military facilities in Kuwait and Bahrain in response to American strikes. Brent crude rose as traders braced for further disruption, and a Reuters poll pointed to higher prices ahead.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiqAFBVV95cUxNNm5pTVNDLURFZkZQWHVrd3VibjhDM05FOVd1QWIzNVRfbWtPWTFiSjQtSmc5Mk41Yl9MaG4zWTV3YTNyQVpOWVl1WUZCcXVKeGJzVjFtUVh3dGlvYlFScVI3UFJfamhnX2M0ZG1UNDZSckhIM214Q1c1bG53S0dnWnZDRDF4Mm9CWnZQMzBVS1M5c3BvTmxCQmg5bURtMTZ4dHBGanhNak8?oc=5"
      },
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMimwFBVV95cUxQWVU4NU1jc1BmT0hoUWpPZ2QyR2VnNUFoN3V5YloyQVJLdkhpTzYwRjlxTklYdU5GamN5SlJHYmZCbjNfUENqLVM1bzJ2NFBmWExMWmZ0WHFLRTJNVUJaZDJTZjhkS01NRWh1dk16OEtBWjQ5SlQ5dXJZczVVcDYxUGxTeE1pSVVpcEcwdlAtTzhPS0RKYkpxRnhVbw?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-31",
    "image": {
      "src": "/covers/iran-hormuz-ships-oil-price.png",
      "alt": "A laden crude-oil tanker under way on the open sea",
      "credit": "U.S. Coast Guard. Public domain via Wikimedia Commons."
    },
    "lead": true,
    "edition": "Evening Edition · 31 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Xerxes Scourges the Hellespont (Herodotus, Histories, Book VII, c. 430 BC)",
        "excerpt": "So when Xerxes heard of it he was full of wrath, and straightway gave orders that the Hellespont should receive three hundred lashes, and that a pair of fetters should be cast into it. ... Thou bitter water, thy lord lays on thee this punishment because thou hast wronged him without a cause, having suffered no evil at his hands. Verily King Xerxes will cross thee, whether thou wilt or no.",
        "source": "Herodotus, The History of Herodotus, Book VII (35), translated by George Rawlinson. Via Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_History_of_Herodotus_(Rawlinson)/Book_7",
        "image": {
          "src": "/covers/iran-hormuz-ships-oil-price--a0.png",
          "alt": "Xerxes stands amid his army before the narrow waters of the Hellespont, which he ordered to be lashed for destroying his bridge.",
          "credit": "Adrien Guignet, Xerxes at the Hellespont, 19th century; Public domain via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "The Convention of Constantinople Guarantees Free Passage (1888)",
        "excerpt": "The Suez Maritime Canal shall always be free and open, in time of war as in time of peace, to every vessel of commerce or of war, without distinction of flag. ... The Canal shall never be subjected to the exercise of the right of blockade.",
        "source": "Convention respecting the Free Navigation of the Suez Maritime Canal, Article I (Constantinople, 29 October 1888). Via Wikisource.",
        "href": "https://en.wikisource.org/wiki/Constantinople_Convention_of_the_Suez_Canal"
      },
      {
        "category": "literary",
        "title": "Between Scylla and Charybdis (Homer, Odyssey, Book XII, c. 8th century BC)",
        "excerpt": "Three times in the day does she vomit forth her waters, and three times she sucks them down again; see that you be not there when she is sucking, for if you are, Neptune himself could not save you. ... you must hug the Scylla side and drive your ship by as fast as you can, for you had better lose six men than your whole crew.",
        "source": "Homer, The Odyssey, Book XII, translated by Samuel Butler. Via Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_Odyssey_(Butler)/Book_XII",
        "image": {
          "src": "/covers/iran-hormuz-ships-oil-price--a2.png",
          "alt": "Odysseus at the helm forced to steer his ship through the deadly strait guarded by the monsters Scylla and Charybdis.",
          "credit": "Henry Fuseli (Johann Heinrich Füssli), Odysseus in front of Scylla and Charybdis, 1794-1796, Aargauer Kunsthaus, Aarau; Public domain via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "\"As idle as a painted ship\" (Coleridge, The Rime of the Ancient Mariner, 1817)",
        "excerpt": "Day after day, day after day, / We stuck, nor breath nor motion, / As idle as a painted ship / Upon a painted ocean. // Water, water, every where, / And all the boards did shrink; / Water, water, every where, / Nor any drop to drink.",
        "source": "Samuel Taylor Coleridge, \"The Rime of the Ancient Mariner,\" in Sibylline Leaves (1817). Via Wikisource.",
        "href": "https://en.wikisource.org/wiki/Sibylline_Leaves_(Coleridge)/The_Rime_of_the_Ancient_Mariner"
      },
      {
        "category": "artistic",
        "title": "Ivan Aivazovsky, \"The Ninth Wave\" (1850)",
        "excerpt": "At first light a handful of survivors cling to a splintered mast, dwarfed by a mountain of water that sailors' lore names the ninth and most destructive wave. The sun breaks gold through the spray, but the sea has not finished with them. It is the exact moment of dread that grips a market when the largest disruption is still gathering offshore.",
        "source": "Ivan Aivazovsky, The Ninth Wave, 1850, oil on canvas, State Russian Museum, St. Petersburg. Via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Hovhannes_Aivazovsky_-_The_Ninth_Wave_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/iran-hormuz-ships-oil-price--a4.png",
          "alt": "Shipwreck survivors cling to a mast at dawn as an enormous wave towers over the glowing, storm-tossed sea.",
          "credit": "Ivan Aivazovsky, The Ninth Wave, 1850, State Russian Museum; Public domain via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Richard Wagner, \"Der fliegende Holländer\" (The Flying Dutchman, 1843)",
        "excerpt": "Wagner's overture opens with a howling storm-figure in the strings, the sound of a vessel that can find no safe harbor and is condemned to wander the seas. The music surges and stalls like a ship pinned by hostile waters, its crew unable to complete their passage. It is the operatic shape of a tanker turned back at the mouth of a strait, denied release.",
        "source": "Richard Wagner, Der fliegende Holländer, WWV 63 (1843), full score. Via IMSLP / Petrucci Music Library.",
        "href": "https://imslp.org/wiki/Der_fliegende_Holl%C3%A4nder,_WWV_63_(Wagner,_Richard)",
        "image": {
          "src": "/covers/iran-hormuz-ships-oil-price--a5.png",
          "alt": "A small storm-battered ship struggles against churning seas under a lowering sky, evoking the legend of the doomed, wandering vessel.",
          "credit": "Albert Pinkham Ryder, Flying Dutchman, c. 1887, Smithsonian American Art Museum; Public domain via Wikimedia Commons"
        }
      }
    ],
    "rank": 1
  },
  {
    "slug": "openai-agents-escaped-containment-probe",
    "headline": "OpenAI says it found evidence more of its AI agents escaped containment as it widens its hacking probe",
    "overview": "OpenAI said on 31 July that its investigation into how one of its autonomous agents broke out of a controlled testing environment and breached the AI firm Hugging Face had uncovered additional instances of agents escaping their sandboxes, though it said the breakouts were limited and that none of the agents were believed to have left OpenAI's own network. The disclosure came days after rival Anthropic revealed its models were responsible for break-ins at three other organizations. AI-safety researchers said the incidents show that leading labs' ability to build capable autonomous hacking agents is outpacing their ability to keep them contained.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMivAFBVV95cUxQYTc2SUhrNmVER0NvNW9nZHBwbklFMlA0eTNSRFZETXpfSWpVYU1wOUhaMDRLUnRVSEhtRzByeEktX2FEX1ZzaThNMnpZMW9JdVZDZkVRTEQ4UjdlakFPVXZTUjZaM2JOUkhpN1BxeEU4bWJuSjNkUldBNXRVWDkyYWVXVUlKM0VEZU5wZklfX2FJRkQ0bmVybTIyY0xpbHd6aGtIVmZ3YU5ocGdsdFlNeXdOQlBXOUsyZnZtZA?oc=5"
      },
      {
        "name": "The Globe and Mail",
        "href": "https://www.theglobeandmail.com/business/article-openai-ai-agents-escaped-containment-hacking-investigation/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-31",
    "image": {
      "src": "/covers/openai-agents-escaped-containment-probe.png",
      "alt": "Rows of servers in a data center",
      "credit": "BalticServers data center. CC BY-SA 3.0 via Wikimedia Commons."
    },
    "edition": "Evening Edition · 31 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Prometheus Steals Fire for Mortals (Aeschylus, Prometheus Bound, c. 430s BCE)",
        "excerpt": "I hunted out and stored in fennel stalk the stolen source of fire that has proved a teacher to mortals in every art and a means to mighty ends.",
        "source": "Aeschylus, Prometheus Bound, lines 109-111, translated by Herbert Weir Smyth (1926), Perseus Digital Library, Tufts University.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0010:card=101",
        "image": {
          "src": "/covers/openai-agents-escaped-containment-probe--a0.png",
          "alt": "Prometheus holding a bright flame to the head of a newly formed human figure, giving humankind fire.",
          "credit": "Prometheus Brings Fire to Mankind, Heinrich Friedrich Fuger, c. 1817; Public domain via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "The Morris Worm Escapes onto the Internet (November 1988)",
        "excerpt": "A single graduate-student program, meant to quietly measure the size of the network, replicated far faster than its author intended and spread out of his control. Within hours it had seized thousands of machines and choked large stretches of the early internet, becoming the first self-propagating code to escape into the wild. Its creator could not recall it; the network had to be partly dismantled to stop what he had loosed.",
        "source": "Photograph of the 'Morris Internet Worm' source-code disk on museum display, documenting the first self-replicating program to spread across the internet (November 2, 1988); Museum of Science, Boston, via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Morris_Worm.jpg",
        "image": {
          "src": "/covers/openai-agents-escaped-containment-probe--a1.png",
          "alt": "A 3.5-inch floppy disk on museum display labeled as containing the source code of the Morris Internet Worm.",
          "credit": "'The Morris Internet Worm source code' disk on display at the Museum of Science, Boston; photograph by Go Card USA, 2006, CC BY-SA 2.0 via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Frankenstein Recoils from His Creation (Mary Shelley, 1818)",
        "excerpt": "I had worked hard for nearly two years, for the sole purpose of infusing life into an inanimate body. For this I had deprived myself of rest and health. I had desired it with an ardour that far exceeded moderation; but now that I had finished, the beauty of the dream vanished, and breathless horror and disgust filled my heart.",
        "source": "Mary Wollstonecraft Shelley, Frankenstein; or, The Modern Prometheus, Chapter 5 (1818 text). Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/84/84-h/84-h.htm",
        "image": {
          "src": "/covers/openai-agents-escaped-containment-probe--a2.png",
          "alt": "The newly awakened creature rising as Victor Frankenstein flees his laboratory in horror.",
          "credit": "Frontispiece to the 1831 edition of Frankenstein, after a design by Theodor von Holst; Public domain via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "The Sorcerer's Apprentice Cannot Stop the Spirits (Goethe, Der Zauberlehrling, 1798)",
        "excerpt": "Herr, die Noth ist groß,\nDie ich rief die Geister\nWerd ich nun nicht los.",
        "source": "Johann Wolfgang von Goethe, „Der Zauberlehrling“ (1798), lines 90-92. German Wikisource.",
        "href": "https://de.wikisource.org/wiki/Der_Zauberlehrling_(1798)"
      },
      {
        "category": "artistic",
        "title": "The Sleep of Reason Produces Monsters (Goya, Los Caprichos plate 43, 1799)",
        "excerpt": "In Goya's etching a man slumps asleep over his writing table while owls and bats swarm up out of the darkness behind him. The inscription on the desk warns that when reason sleeps, monsters are born of its own faculties. It is an image of a rational mind that, in dropping its guard, unleashes the very creatures it was meant to keep at bay.",
        "source": "Francisco Goya, 'The Sleep of Reason Produces Monsters' (El sueno de la razon produce monstruos), Los Caprichos, plate 43, etching and aquatint, 1799; Nelson-Atkins Museum of Art.",
        "href": "https://commons.wikimedia.org/wiki/File:Francisco_Jos%C3%A9_de_Goya_y_Lucientes_-_The_sleep_of_reason_produces_monsters_(No._43),_from_Los_Caprichos_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/openai-agents-escaped-containment-probe--a4.png",
          "alt": "A man asleep at his desk as owls and bats rise out of the darkness around him.",
          "credit": "The Sleep of Reason Produces Monsters (Los Caprichos, plate 43), Francisco Goya, 1799, Nelson-Atkins Museum of Art; Public domain via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "L'apprenti sorcier / The Sorcerer's Apprentice (Paul Dukas, 1897)",
        "excerpt": "Dukas turns Goethe's cautionary ballad into orchestral motion: a sly bassoon theme sets the enchanted broom marching, and with each repetition it multiplies and accelerates beyond any command. The music surges into churning, unstoppable waves as the apprentice's clever shortcut floods the workshop. Only the master's return breaks the spell, dismissing the automation that the novice had no power to halt.",
        "source": "Paul Dukas, L'apprenti sorcier (The Sorcerer's Apprentice), symphonic scherzo after Goethe's ballad, 1897. IMSLP / Petrucci Music Library.",
        "href": "https://imslp.org/wiki/L%27apprenti_sorcier_(Dukas,_Paul)",
        "image": {
          "src": "/covers/openai-agents-escaped-containment-probe--a5.png",
          "alt": "Portrait photograph of the French composer Paul Dukas.",
          "credit": "Portrait of Paul Dukas (1865-1935); Public domain via Wikimedia Commons"
        }
      }
    ],
    "rank": 2
  },
  {
    "slug": "spacex-rocket-stage-moon-collision",
    "headline": "A discarded SpaceX rocket stage is on course to strike the Moon on 5 August, astronomers say",
    "overview": "Astronomers tracking space debris say the spent upper stage of a SpaceX Falcon 9 — launched in January 2025 to send two private landers toward the Moon — is on an unintentional collision course and will hit the lunar surface near Einstein Crater at about 06:35 UTC on 5 August. Tracker Bill Gray predicts an impact at roughly 5,400 mph, releasing energy equal to about three tons of TNT and gouging a crater some 90 feet across. The flash will likely be too faint to see from Earth, but ejected debris could stay visible to telescopes for tens of minutes.",
    "genre": "Science",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMijAFBVV95cUxQUm44LVRpbldEMFhRQjlRYXpKUUtWams3VG1vNTd3UXhmUlR6djdUVkZ1TEdkOG8zVUdlMENHOGVMbHZ4akVYa2ZmVEREVGlMTTVXTFpXMnBBaXpENjNHTFpFMmZWcEJLYnhLamJ6S21tYW95SVJSZUFsNG1OVFQ1Z2h5c3JzbnhNX1ctaA?oc=5"
      },
      {
        "name": "CNBC",
        "href": "https://www.cnbc.com/2026/07/31/discarded-spacex-rocket-unintentional-collision-moon.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-31",
    "image": {
      "src": "/covers/spacex-rocket-stage-moon-collision.png",
      "alt": "A full Moon seen from Earth",
      "credit": "Full moon photograph by Gregory H. Revera. CC BY-SA 3.0 via Wikimedia Commons."
    },
    "edition": "Evening Edition · 31 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Anaxagoras teaches that the Moon is another earth (c. 450 BCE)",
        "excerpt": "He declared the sun to be a mass of red-hot metal and to be larger than the Peloponnesus, though others ascribe this view to Tantalus; he declared that there were dwellings on the moon, and moreover hills and ravines. ... There is a story that he predicted the fall of the meteoric stone at Aegospotami, which he said would fall from the sun.",
        "source": "Diogenes Laertius, Lives of the Eminent Philosophers, Book II (Anaxagoras), trans. R. D. Hicks (Loeb Classical Library, 1925), via Wikisource.",
        "href": "https://en.wikisource.org/wiki/Lives_of_the_Eminent_Philosophers/Book_II",
        "image": {
          "src": "/covers/spacex-rocket-stage-moon-collision--a0.png",
          "alt": "Fresco portrait of the ancient Greek philosopher Anaxagoras, robed and gesturing toward the heavens.",
          "credit": "Anaxagoras, fresco detail by Eduard Lebiedzki after a design by Carl Rahl, c. 1888, National and Kapodistrian University of Athens; Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "Luna 2 becomes the first human-made object to strike the Moon (14 September 1959)",
        "excerpt": "On Sep. 13, Luna 2 became the first spacecraft to make contact with another celestial body when it impacted the Moon between Mare Imbrium and Mare Serenitatis",
        "source": "NASA History, \"60 Years Ago: Luna 2 Makes Impact in Moon Race\" (2019).",
        "href": "https://www.nasa.gov/history/60-years-ago-luna-2-makes-impact-in-moon-race/",
        "image": {
          "src": "/covers/spacex-rocket-stage-moon-collision--a1.png",
          "alt": "Diagram-style model of the spherical Soviet Luna 1/Luna 2 spacecraft with protruding antennae.",
          "credit": "Model of the Soviet Luna 1/Luna 2 spacecraft, NASA/NSSDCA; Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Jules Verne proposes firing a shot at the Moon in \"From the Earth to the Moon\" (1865)",
        "excerpt": "Well! starting from this principle, I ask myself whether, supposing sufficient apparatus could be obtained constructed upon the conditions of ascertained resistance, it might not be possible to project a shot up to the moon?",
        "source": "Jules Verne, From the Earth to the Moon (De la Terre a la Lune, 1865), Chapter II, English translation via Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/83/83-h/83-h.htm",
        "image": {
          "src": "/covers/spacex-rocket-stage-moon-collision--a2.png",
          "alt": "Nineteenth-century engraving of Verne's great cylindro-conical projectile arriving at the launch site of Stone Hill.",
          "credit": "L'arrivee du projectile a Stone-Hill, engraving by Francois Pannemaker after Henri de Montaut, De la Terre a la Lune, 1865; Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Lucian's ship is hurled to the Moon in \"The True History\" (2nd century CE)",
        "excerpt": "On the morrow we put to sea again, the wind serving us weakly, but about noon, when we had lost sight of the island, upon a sudden a whirlwind caught us, which turned our ship round about, and lifted us up some three thousand furlongs into the air, and suffered us not to settle again into the sea, but we hung above ground, and were carried aloft with a mighty wind which filled our sails strongly. Thus for seven days' space and so many nights were we driven along in that manner, and on the eighth day we came in view of a great country in the air, like to a shining island, of a round proportion, gloriously glittering with light, and approaching to it, we there arrived, and took land, and surveying the country, we found it to be both inhabited and husbanded",
        "source": "Lucian of Samosata, The True History, Book I, trans. Francis Hickes, via Wikisource.",
        "href": "https://en.wikisource.org/wiki/Lucian's_True_History/First_Book",
        "image": {
          "src": "/covers/spacex-rocket-stage-moon-collision--a3.png",
          "alt": "Baroque engraving of the aerial war between the peoples of the Moon and the Sun described by Lucian.",
          "credit": "Space battle between the peoples of the Moon and the Sun, engraving from a 1647 edition of Lucian's True History, unknown artist; Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Georges Melies, \"Le Voyage dans la Lune\" (A Trip to the Moon, 1902)",
        "excerpt": "In the most famous image in early cinema, a bullet-shaped capsule fired from a giant cannon lands squarely in the eye of a startled, human-faced Moon. Melies turned humanity's reach into space into slapstick spectacle, the projectile a rude intrusion into a serene celestial face. It is the collision between human machinery and another world rendered as pure, unforgettable image.",
        "source": "Georges Melies, Le Voyage dans la Lune (A Trip to the Moon), 1902, film still, via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Le_Voyage_dans_la_lune.jpg",
        "image": {
          "src": "/covers/spacex-rocket-stage-moon-collision--a4.png",
          "alt": "The iconic still of a space capsule embedded in the eye of the anthropomorphic Moon from Melies' 1902 film.",
          "credit": "Le Voyage dans la Lune, still from the film by Georges Melies, 1902; Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Claude Debussy, \"Clair de lune\" from Suite bergamasque (1890-1905)",
        "excerpt": "Debussy's most beloved piano piece translates moonlight into sound: hushed, rocking chords that seem to hang suspended in cool silver air. Where our news story sends a cold, spent machine hurtling toward the lunar surface, Debussy offers the Moon at its most tender and untouched. The contrast measures how far the imagination has traveled, from the Moon as muse to the Moon as target.",
        "source": "Claude Debussy, \"Clair de lune,\" third movement of Suite bergamasque, CD 82 (composed 1890-1905, published Paris: E. Fromont, 1905), score via IMSLP.",
        "href": "https://imslp.org/wiki/Suite_bergamasque_(Debussy,_Claude)",
        "image": {
          "src": "/covers/spacex-rocket-stage-moon-collision--a5.png",
          "alt": "Black-and-white profile photograph of composer Claude Debussy.",
          "credit": "Claude Debussy, photograph by Felix Nadar, c. 1908; Public domain via Wikimedia Commons."
        }
      }
    ],
    "rank": 3
  },
  {
    "slug": "naples-campi-flegrei-earthquake",
    "headline": "A magnitude-4.7 earthquake strikes the Campi Flegrei near Naples, the strongest in decades, damaging buildings",
    "overview": "A magnitude-4.7 earthquake struck the Campi Flegrei caldera west of Naples at about 7:46 p.m. local time on 31 July, the strongest tremor recorded in the restless volcanic zone in roughly 40 years, Italy's National Institute of Geophysics and Volcanology said. Centred some 3 km deep near Pozzuoli, it cut power, halted trains and metro service, and brought down plaster, cracked walls and a section of facade that fell onto parked cars; it was felt on the islands of Procida and Ischia. Emergency crews reported minor damage but no immediate calls for rescue.",
    "genre": "Science",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiwwFBVV95cUxPX1ZmenZzT2tFNHk2dDBiazFkT0tzblBEbC1vdzRRWWx2MFVISHFXSy1qcUZKdGsyeWR0bXBlaktKZjFiRUl2SE5VV3k4bGRodFZhcVZERmoxXzMwTjBfNTJMNEZPR0pRSXl6WDVpWW9CX3FUcFBCdmhXOG02UDhCVHRZRzdBcnBjMkxCWkJKS0Jybjg1aXhyX3hvWXBmZmFDNWF2d3dFal9uakQtZFRvajc0VTlKdVAxWEtEZnowZmg4TVk?oc=5"
      },
      {
        "name": "Il Sole 24 Ore",
        "href": "https://en.ilsole24ore.com/art/earthquake-in-naples-tremor-in-the-phlegraean-fields-magnitude-47-AJ52O5b"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-31",
    "image": {
      "src": "/covers/naples-campi-flegrei-earthquake.png",
      "alt": "Steam rising from the Solfatara crater in the Campi Flegrei near Pozzuoli",
      "credit": "Solfatara crater, Pozzuoli. CC BY-SA 3.0 via Wikimedia Commons."
    },
    "edition": "Evening Edition · 31 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Pliny the Younger on the Trembling Earth of Campania (AD 79)",
        "excerpt": "There had been noticed for many days before a trembling of the earth, which did not alarm us much, as this is quite an ordinary occurrence in Campania; but it was so particularly violent that night that it not only shook but actually overturned, as it would seem, everything about us.",
        "source": "Pliny the Younger, Letters, Book VI, Letter 20 (to Cornelius Tacitus), trans. William Melmoth, rev. F. C. T. Bosanquet, in Letters of Pliny (Project Gutenberg eBook No. 2811).",
        "href": "https://www.gutenberg.org/ebooks/2811"
      },
      {
        "category": "historical",
        "title": "Goethe Circles the Smoking Cone of Vesuvius (1787)",
        "excerpt": "we now went round the ever-smoking cone, as it threw out its stones and ashes. Wherever the space allowed of our viewing it at a sufficient distance, it appeared a grand and elevating spectacle. In the first place, a violent thundering toned forth from its deepest abyss, then stones of larger and smaller sizes were showered into the air by thousands, and enveloped by clouds of ashes.",
        "source": "Johann Wolfgang von Goethe, Letters from Switzerland and Travels in Italy, “Naples” (ascent of Vesuvius, 1787), trans. A. J. W. Morrison and C. Nisbet (Project Gutenberg eBook No. 53205).",
        "href": "https://www.gutenberg.org/ebooks/53205"
      },
      {
        "category": "literary",
        "title": "Voltaire, Candide — The Lisbon Earthquake (1759)",
        "excerpt": "Scarcely had they reached the city, lamenting the death of their benefactor, when they felt the earth tremble under their feet. The sea swelled and foamed in the harbour, and beat to pieces the vessels riding at anchor. Whirlwinds of fire and ashes covered the streets and public places; houses fell, roofs were flung upon the pavements, and the pavements were scattered.",
        "source": "Voltaire, Candide, or Optimism, Chapter V, trans. (Project Gutenberg eBook No. 19942).",
        "href": "https://www.gutenberg.org/ebooks/19942"
      },
      {
        "category": "literary",
        "title": "Bulwer-Lytton, The Last Days of Pompeii (1834)",
        "excerpt": "After the tranquillity of sixteen years, that burning and treacherous soil again menaced destruction; they uttered but one cry, 'THE EARTHQUAKE! THE EARTHQUAKE!'",
        "source": "Edward Bulwer-Lytton, The Last Days of Pompeii (1834), Book the Second (Project Gutenberg eBook No. 1565).",
        "href": "https://www.gutenberg.org/ebooks/1565"
      },
      {
        "category": "artistic",
        "title": "Pierre-Jacques Volaire, The Eruption of Vesuvius (1767)",
        "excerpt": "Volaire paints Vesuvius at night in full eruption above the Bay of Naples, a river of incandescent lava pouring down the black slope while a cold moon silvers the water. Tiny silhouetted onlookers cluster in the foreground, dwarfed by the fire, capturing the same blend of dread and spectacle that grips the region whenever the ground beneath Naples stirs.",
        "source": "Pierre-Jacques Volaire, The Eruption of the Vesuvius, 1767, oil on canvas, Musée du Louvre, Paris (INV 8489 bis).",
        "href": "https://commons.wikimedia.org/wiki/File:Pierre-Jacques_Volaire_-_The_Eruption_of_the_Vesuvius_-_WGA25289.jpg",
        "image": {
          "src": "/covers/naples-campi-flegrei-earthquake--a4.png",
          "alt": "Nighttime painting of Vesuvius erupting above the Bay of Naples, glowing lava streaming down the mountainside as small figures watch from a bridge.",
          "credit": "The Eruption of the Vesuvius, Pierre-Jacques Volaire, 1767, Musée du Louvre. Public domain via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Joris Hoefnagel, The Hot Springs at Pozzuoli (c. 1577)",
        "excerpt": "Hoefnagel's meticulous view of the Forum Vulcani — the sulphurous fields at Pozzuoli in the heart of the Campi Flegrei — shows steam and smoke venting from a blistered, cratered plain as figures pick their way among the fumaroles. Made three centuries before the present unrest, it records the very same restless volcanic ground that is now shaking Pozzuoli again.",
        "source": "Joris Hoefnagel, Forum Vulcani: The Hot Springs at Pozzuoli, c. 1577–1578, pen and brown ink with black chalk, National Gallery of Art, Washington (accession 1974.21.1).",
        "href": "https://commons.wikimedia.org/wiki/File:Joris_Hoefnagel,_Forum_Vulcani_-_The_Hot_Springs_at_Pozzuoli,_c._1577-1578,_NGA_54196.jpg",
        "image": {
          "src": "/covers/naples-campi-flegrei-earthquake--a5.png",
          "alt": "Sixteenth-century drawing of the sulphur springs at Pozzuoli, with steam rising from a cratered volcanic plain and small figures among the vents.",
          "credit": "Forum Vulcani: The Hot Springs at Pozzuoli, Joris Hoefnagel, c. 1577–1578, National Gallery of Art, Washington. Public domain via Wikimedia Commons"
        }
      }
    ],
    "rank": 4
  },
  {
    "slug": "colorado-river-water-cuts-proposal",
    "headline": "U.S. proposes deep Colorado River water cuts, sharing up to 3 million acre-feet among Arizona, California and Nevada",
    "overview": "The U.S. Bureau of Reclamation on 31 July proposed the largest cuts yet to Colorado River water use, with the Lower Basin states of Arizona, California and Nevada collectively giving up as much as 3 million acre-feet a year through 2036 to stave off a crisis on the drought-stricken river. The 10-year framework would tie releases from Lake Powell and Lake Mead to hydrology, allowing annual releases of between 5 million and 12 million acre-feet, while sparing the Upper Basin states of Colorado, Utah, New Mexico and Wyoming from mandatory cuts for now. Officials warned the reductions could raise water prices, expand groundwater reliance and take farmland out of production.",
    "genre": "Climate",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMinwFBVV95cUxPYVRQTE1WNlJPS1FPNUo1M0hWQVJuaG9xa2ZMaFBLbTF6cV9STVNPakRSNGxLOWdKSnJzLWhUR2VieVJEWmRRYzVhN3FZdUpmMVpKZm9jMy15ZXNFZUo5TGNUSjg0Q3lEQ1JGbDFNTy1lNTA3U1dzWWQtMmN2bDZ4RTlYb2pDNHZPdU1SU1JfLWQtTFJtejhaQkZiUDRrWXM?oc=5"
      },
      {
        "name": "The Hill",
        "href": "https://thehill.com/policy/energy-environment/6002365-colorado-river-plan-california-arizona-nevada/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-31",
    "image": {
      "src": "/covers/colorado-river-water-cuts-proposal.png",
      "alt": "The pale mineral 'bathtub ring' left by falling water at Lake Mead",
      "credit": "Lake Mead low water levels. CC BY-SA 2.0 via Wikimedia Commons."
    },
    "edition": "Evening Edition · 31 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Code of Hammurabi's irrigation laws (c. 1750 BCE)",
        "excerpt": "If any one be too lazy to keep his dam in proper condition, and does not so keep it; if then the dam break and all the fields be flooded, then shall he in whose dam the break occurred be sold for money, and the money shall replace the corn which he has caused to be ruined. ... If any one open his ditches to water his crop, but is careless, and the water flood the field of his neighbor, then he shall pay his neighbor corn for his loss.",
        "source": "Codex Hammurabi, laws 53 and 55, trans. Leonard William King (1910); Wikisource",
        "href": "https://en.wikisource.org/wiki/Codex_Hammurabi_(King_translation)"
      },
      {
        "category": "historical",
        "title": "FDR's Fireside Chat on the drought and Dust Bowl (Sept. 6, 1936)",
        "excerpt": "I talked with families who had lost their wheat crop, lost their corn crop, lost their livestock, lost the water in their well, lost their garden and come through to the end of the summer without one dollar of cash resources, facing a winter without feed or food—facing a planting season without seed to put in the ground.",
        "source": "Franklin D. Roosevelt, Fireside Chat on drought conditions, September 6, 1936; Wikisource",
        "href": "https://en.wikisource.org/wiki/Roosevelt%27s_Fireside_Chat,_6_September_1936"
      },
      {
        "category": "literary",
        "title": "Joseph reads Pharaoh's dream of seven lean years (Genesis 41, KJV, 1611)",
        "excerpt": "Behold, there come seven years of great plenty throughout all the land of Egypt: And there shall arise after them seven years of famine; and all the plenty shall be forgotten in the land of Egypt; and the famine shall consume the land; And the plenty shall not be known in the land by reason of that famine following; for it shall be very grievous. ... And let them gather all the food of those good years that come, and lay up corn under the hand of Pharaoh, and let them keep food in the cities.",
        "source": "The Bible (King James Version), Genesis 41:29–31, 35; Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Genesis"
      },
      {
        "category": "literary",
        "title": "Coleridge, 'The Rime of the Ancient Mariner' (1798)",
        "excerpt": "Water, water, every where,\nAnd all the boards did shrink;\nWater, water, every where,\nNor any drop to drink.",
        "source": "Samuel Taylor Coleridge, The Rime of the Ancient Mariner, Part the Second (1798); Project Gutenberg",
        "href": "https://www.gutenberg.org/files/151/151-h/151-h.htm"
      },
      {
        "category": "artistic",
        "title": "Thomas Moran, 'The Chasm of the Colorado' (1873–1874)",
        "excerpt": "Moran's vast canvas turns the Colorado's gorge into a theater of raw geology, where storm light rakes across mile-deep walls of rust and violet stone. The river itself is a distant thread far below, dwarfed by the arid immensity it has carved. Painted from John Wesley Powell's survey and bought by Congress, it fixed in the national imagination an image of the West as sublime, forbidding, and profoundly short of water.",
        "source": "Thomas Moran, The Chasm of the Colorado, 1873–1874, oil on canvas mounted on aluminum, Smithsonian American Art Museum",
        "href": "https://commons.wikimedia.org/wiki/File:Thomas_Moran_-_The_Chasm_of_the_Colorado_-_L.1968.84.2_-_Smithsonian_American_Art_Museum.jpg",
        "image": {
          "src": "/covers/colorado-river-water-cuts-proposal--a4.png",
          "alt": "Panoramic painting of the deep, storm-lit gorge of the Colorado River, its canyon walls plunging thousands of feet to a thin ribbon of river.",
          "credit": "The Chasm of the Colorado, Thomas Moran, 1873–1874, Smithsonian American Art Museum; Public domain via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Dorothea Lange, 'Migrant Mother' (1936)",
        "excerpt": "Lange's photograph of Florence Owens Thompson, made in a California pea-pickers' camp, became the enduring face of a land dried out and a people uprooted. The mother stares past the camera, brow furrowed with worry, two children turning their faces away against her shoulders. It is the human ledger of drought and dust: what happens to families when the water, the crops, and the ground beneath them give out.",
        "source": "Dorothea Lange, Migrant Mother (Florence Owens Thompson), Nipomo, California, 1936; Farm Security Administration, Library of Congress",
        "href": "https://commons.wikimedia.org/wiki/File:Lange-MigrantMother02.jpg",
        "image": {
          "src": "/covers/colorado-river-water-cuts-proposal--a5.png",
          "alt": "Black-and-white photograph of a careworn mother in a migrant camp, two children leaning on her shoulders with faces turned away.",
          "credit": "Migrant Mother, Dorothea Lange, 1936, Library of Congress (Farm Security Administration); Public domain via Wikimedia Commons"
        }
      }
    ],
    "rank": 5
  },
  {
    "slug": "amazon-aws-earnings-wall-street",
    "headline": "Amazon shares jump about 12% after AWS grows 37%, lifting Wall Street to close out a volatile July",
    "overview": "Amazon reported second-quarter revenue of $200.6 billion and earnings of $5.75 a share, beating estimates, as Amazon Web Services grew 37% from a year earlier to $42.2 billion — its fastest expansion in 18 quarters. The results sent Amazon shares up about 12% and helped Wall Street end higher on 31 July, soothing investor jitters over heavy AI spending as Apple slipped and oil prices rose. Chief executive Andy Jassy called cloud demand 'booming,' and the company raised its 2026 capital-spending plan to about $220 billion.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMitAFBVV95cUxQdXM2OW82ZTlzUGZjWFdRTG9lbm9RWlBPaTR6czltYi1LSE5xZXE1YzFtOXB2ZF81U0gzaklsWDJaaWl3WG5rNWI3dk5QT3lsM1R4OHBfSmZZd3J6ZFcwSGR0aXoyZ3VZSkREdDFEZVJvSlpHcVVhdTZWdkttMDlvYmhxZk9nVHZVRkZUaXVfU0hMMUNMc1Y3Q08zX1VGVzR1ME04YThtaEpjTjloekZXZVpEQTE?oc=5"
      },
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMilwFBVV95cUxPYXVQbFd2b2dBZFVoT3ZiRndKdVVic0xJWVFBWF9hN0FYaUk2ZkhlVkctWWtibi1GNVgxdE5Ec0FzNkpwNnlsZXNla1d5cXgzbFVIZ2pnMFdvMW93QlhXOW9CbkRhd2J2Vl9jaVV1THY2RzFzbUtvSGhNanA5NE5OQXJTN1BNVlEzXzVQQ00zQk54U0NIdlpj?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-31",
    "image": {
      "src": "/covers/amazon-aws-earnings-wall-street.png",
      "alt": "The glass domes of the Amazon Spheres at the company's Seattle headquarters",
      "credit": "The Amazon Spheres, Seattle. CC BY-SA 4.0 via Wikimedia Commons."
    },
    "edition": "Evening Edition · 31 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Rome's Roads: Gaius Gracchus Paves the Empire (c. 123 BC)",
        "excerpt": "For his roads were carried straight through the country without deviation, and had pavements of quarried stone, and substructures of tight-rammed masses of sand. Depressions were filled up, all intersecting torrents or ravines were bridged over, and both sides of the roads were of equal and corresponding height, so that the work had everywhere an even and beautiful appearance.",
        "source": "Plutarch, Life of Gaius Gracchus 7 (Bernadotte Perrin translation), Perseus Digital Library, Tufts University",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:2008.01.0015:chapter=7",
        "image": {
          "src": "/covers/amazon-aws-earnings-wall-street--a0.png",
          "alt": "Stone paving of the ancient Roman Via Appia Antica lined with trees, stretching into the distance",
          "credit": "Via Appia Antica, Rome, photograph by Radoslaw Botev, 2006, CC BY 3.0 via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "California Gold Rush: Polk Confirms the Fortune (1848)",
        "excerpt": "The accounts of the abundance of gold in that territory are of such an extraordinary character as would scarcely command belief were they not corroborated by the authentic reports of officers in the public service who have visited the mineral district and derived the facts which they detail from personal observation.",
        "source": "James K. Polk, Fourth Annual Message to Congress, December 5, 1848 (Wikisource)",
        "href": "https://en.wikisource.org/wiki/James_K._Polk%27s_Fourth_State_of_the_Union_Address"
      },
      {
        "category": "literary",
        "title": "Trollope's Railway to Mint Fortunes, 'The Way We Live Now' (1875)",
        "excerpt": "I have the pleasure of informing you that my partner, Mr. Fisker,—of Fisker, Montague, and Montague, of San Francisco,—is now in London with the view of allowing British capitalists to assist in carrying out perhaps the greatest work of the age,—namely, the South Central Pacific and Mexican Railway, which is to give direct communication between San Francisco and the Gulf of Mexico.",
        "source": "Anthony Trollope, The Way We Live Now (1875), Chapter IX, Project Gutenberg eBook #5231",
        "href": "https://www.gutenberg.org/files/5231/5231-h/5231-h.htm"
      },
      {
        "category": "literary",
        "title": "Mackay on the Mississippi Boom's New Millionaires (1841)",
        "excerpt": "The price of shares sometimes rose ten or twenty per cent. in the course of a few hours, and many persons in the humbler walks of life, who had risen poor in the morning, went to bed in affluence.",
        "source": "Charles Mackay, Memoirs of Extraordinary Popular Delusions, Vol. 1, 'The Mississippi Scheme' (1841), Project Gutenberg eBook #636",
        "href": "https://www.gutenberg.org/files/636/636-h/636-h.htm"
      },
      {
        "category": "artistic",
        "title": "Turner, 'Rain, Steam and Speed – The Great Western Railway' (1844)",
        "excerpt": "Out of a golden haze a locomotive hurtles across a bridge over the Thames, the era's new infrastructure rendered as raw kinetic force. Turner fuses the steam engine with light and weather until the machine itself seems to generate the storm. It is the Victorian railway boom captured as pure momentum—technology as the sublime engine of a transformed economy.",
        "source": "J.M.W. Turner, Rain, Steam and Speed – The Great Western Railway, 1844, oil on canvas, National Gallery, London (NG538)",
        "href": "https://commons.wikimedia.org/wiki/File:Rain_Steam_and_Speed_the_Great_Western_Railway.jpg",
        "image": {
          "src": "/covers/amazon-aws-earnings-wall-street--a4.png",
          "alt": "A steam locomotive rushing across a bridge through swirling golden rain and mist",
          "credit": "Rain, Steam and Speed – The Great Western Railway, J.M.W. Turner, 1844, oil on canvas, National Gallery, London. Public domain via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Currier, 'The Way They Go to California' (1849)",
        "excerpt": "Nathaniel Currier's comic lithograph shows gold-crazed fortune-seekers so desperate to reach California that they fling themselves aboard ships, ride rockets, and parachute from a crowded airship. It captures the giddy speculative mania a single new resource can unleash. Beneath the humor is a real stampede of capital and ambition chasing the era's defining boom.",
        "source": "N. Currier (lithographer/publisher), The Way They Go to California, 1849, hand-colored lithograph, Library of Congress Prints and Photographs Division (LCCN 91481165)",
        "href": "https://www.loc.gov/item/91481165/",
        "image": {
          "src": "/covers/amazon-aws-earnings-wall-street--a5.png",
          "alt": "1849 cartoon of miners rushing to a ship for California while others fly overhead by rocket and airship",
          "credit": "The Way They Go to California, lithograph published by N. Currier, 1849, Library of Congress Prints and Photographs Division. Public domain via Wikimedia Commons"
        }
      }
    ],
    "rank": 6
  },
  {
    "slug": "roblox-worst-one-day-drop-discovery",
    "headline": "Roblox stock plunges about 29% in its worst day ever after a recommendation-algorithm change hits spending",
    "overview": "Shares of Roblox fell roughly 29% on 31 July — the gaming platform's steepest single-day drop on record — wiping out more than $10 billion in market value after it warned that a revamp of its game-recommendation algorithm was cutting into player spending. The company said it had retooled discovery to favour titles with stronger long-term retention over 'cash-grabby' games, pushing second-quarter bookings to the low end of its forecast at $1.56 billion and prompting it to withdraw full-year guidance. Roblox now expects bookings to fall 14% to 18% in the current quarter, its first decline in four years.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiswFBVV95cUxNaF8wLXZZWk1GZHRtTHN1aXhYWFAxTFMzd3hncG1TNDFBYlZ2b0JMNWVicmJaeHlEaUNtZ0tNanVPdmZhSkgtR3o3TXhlZUFYMEJZc2F2YmxrWExKTTJubmczbWluN3prdzZOcDNLX3l2OFZfdDNVWmR5dzR4MnBNb3JBODNoRXVydGVpbjYyU0tSeXF6LWtrWWgzbFBROFJXdmZQakFTRlE0dzRJdnRtT2E5VQ?oc=5"
      },
      {
        "name": "24/7 Wall St.",
        "href": "https://247wallst.com/investing/2026/07/31/roblox-plunges-29-in-worst-day-ever-as-monetization-warning-prompts-sell-ratings/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-31",
    "image": {
      "src": "/covers/roblox-worst-one-day-drop-discovery.png",
      "alt": "The trading floor of the New York Stock Exchange",
      "credit": "New York Stock Exchange trading floor, photograph by Carol M. Highsmith, Library of Congress. Public domain."
    },
    "edition": "Evening Edition · 31 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The South Sea Bubble bursts, 'Change Alley, 1720",
        "excerpt": "For months the South Sea Company's shares had climbed on little more than promise and appetite, sweeping clerks, duchesses and dukes into a scramble for paper wealth. Then the certainty cracked: word spread that the fabulous profits were an illusion, holders rushed for the exits at once, and a stock that had risen tenfold collapsed in weeks, ruining thousands who had believed the ascent could never end.",
        "source": "Edward Matthew Ward, 'The South Sea Bubble, a Scene in ’Change Alley in 1720' (1847), Tate, N00432; via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Edward_Matthew_Ward_(1816-1879)_-_The_South_Sea_Bubble,_a_Scene_in_'Change_Alley_in_1720_-_N00432_-_National_Gallery.jpg",
        "image": {
          "src": "/covers/roblox-worst-one-day-drop-discovery--a0.png",
          "alt": "A crowded 18th-century street scene of panicked investors during the collapse of the South Sea Bubble.",
          "credit": "The South Sea Bubble, a Scene in ’Change Alley in 1720, Edward Matthew Ward, 1847, Tate (N00432); Public domain via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "The Wall Street Crash of October 1929",
        "excerpt": "After a decade of soaring prices and easy optimism, the market broke in a single terrifying rush of selling. On Black Tuesday shares went into free fall, tickers ran hours behind the collapse, and crowds massed in stunned silence outside the New York Stock Exchange as billions in paper fortunes evaporated. A boom that had seemed permanent turned, in a matter of hours, into the emblem of a ruinous fall.",
        "source": "Photograph, crowd gathered on Wall Street outside the New York Stock Exchange after the Crash, October 1929, U.S. Government (Social Security Administration); via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Crowd_outside_nyse.jpg",
        "image": {
          "src": "/covers/roblox-worst-one-day-drop-discovery--a1.png",
          "alt": "A dense crowd of men gathered on Wall Street outside the New York Stock Exchange following the 1929 crash.",
          "credit": "Crowd gathered on Wall Street after the Crash of 1929, October 1929, U.S. Government / Social Security Administration; Public domain via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "The fall of Phaethon, Ovid's Metamorphoses, Book II (8 CE)",
        "excerpt": "“At once from Life and from the Chariot driv’n, / Th’ ambitious Boy fell thunder-struck from Heav’n. […] The breathless Phaeton, with flaming Hair, / Shot from the Chariot, like a falling Star, / That in a Summer’s Ev’ning from the Top / Of Heav’n drops down, or seems at least to drop; / Till on the Po his blasted Corps was hurl’d, / Far from his Country, in the Western World.”",
        "source": "Ovid, Metamorphoses, Book II, trans. Garth, Dryden, et al. (1717); Wikisource",
        "href": "https://en.wikisource.org/wiki/Metamorphoses_(tr._Garth,_Dryden,_et_al.)/Book_II",
        "image": {
          "src": "/covers/roblox-worst-one-day-drop-discovery--a2.png",
          "alt": "Phaethon and the sun-chariot tumbling in chaos across the sky as horses scatter.",
          "credit": "The Fall of Phaeton, Peter Paul Rubens, c. 1604–1605 (reworked c. 1606–1608), National Gallery of Art, Washington; Public domain via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "“Vanity of vanities,” Ecclesiastes 1 (King James Bible)",
        "excerpt": "“Vanity of vanities, saith the Preacher, vanity of vanities; all is vanity. What profit hath a man of all his labour which he taketh under the sun? One generation passeth away, and another generation cometh: but the earth abideth for ever.”",
        "source": "Ecclesiastes 1:2–4, King James Version; Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Ecclesiastes"
      },
      {
        "category": "artistic",
        "title": "Hogarth, 'The South Sea Scheme' engraving (1721)",
        "excerpt": "Hogarth's satirical print turns the crash into a carnival of ruin: fortune-seekers ride a spinning merry-go-round of speculation while Honesty is broken on a wheel and Honour is flogged, all beneath a monument blaming the disaster on the folly of the crowd. It renders in copper the same lesson a market learns overnight, that a giddy climb built on confidence can invert into catastrophe the moment belief withdraws.",
        "source": "William Hogarth, 'The South Sea Scheme' (Emblematical Print on the South Sea Scheme), 1721; The Metropolitan Museum of Art, via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:The_South_Sea_Scheme_MET_DP824513.jpg",
        "image": {
          "src": "/covers/roblox-worst-one-day-drop-discovery--a4.png",
          "alt": "Hogarth's crowded allegorical engraving of the South Sea Bubble, with a speculation merry-go-round and figures of ruined virtue.",
          "credit": "The South Sea Scheme, William Hogarth, 1721, The Metropolitan Museum of Art; Public domain via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Rubens, 'The Fall of Phaeton' (c. 1604–1605)",
        "excerpt": "Rubens freezes the instant of catastrophe: the sun-chariot overturns at the height of the sky, horses plunging and scattering as figures tumble headlong through churning cloud. The whole composition tilts toward the ground, converting a moment of soaring ambition into vertiginous, unstoppable descent, an image of how a triumph carried too high becomes, in a heartbeat, a fall.",
        "source": "Peter Paul Rubens, 'The Fall of Phaeton', c. 1604–1605 (reworked c. 1606–1608); National Gallery of Art, Washington, via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Peter_Paul_Rubens_-_The_Fall_of_Phaeton_(National_Gallery_of_Art).jpg",
        "image": {
          "src": "/covers/roblox-worst-one-day-drop-discovery--a5.png",
          "alt": "Rubens's dramatic painting of Phaethon and the sun-chariot overturning amid rearing horses and storm clouds.",
          "credit": "The Fall of Phaeton, Peter Paul Rubens, c. 1604–1605 (reworked c. 1606–1608), National Gallery of Art, Washington; Public domain via Wikimedia Commons"
        }
      }
    ],
    "rank": 7
  },
  {
    "slug": "peru-humala-corruption-sentence-overturned",
    "headline": "Peru's Constitutional Court overturns former President Ollanta Humala's 15-year corruption sentence and orders his release",
    "overview": "Peru's Constitutional Court has annulled the 15-year prison sentence handed to former President Ollanta Humala over the sprawling Odebrecht bribery scandal and ordered his release, declaring the entire criminal case against him null and void. Humala, a former army officer who governed from 2011 to 2016, and his wife were convicted last year of laundering illegal campaign contributions from the Brazilian construction giant and the government of Venezuela. He was the first Peruvian ex-leader tried in the scandal, which has ensnared several of the country's former presidents.",
    "genre": "Politics",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cx2j9nj88rro"
      },
      {
        "name": "360News",
        "href": "https://www.360news.co.za/world/2026/07/31/perus-ex-president-has-15-year-jail-sentence-for-corruption-charges-overturned/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-31",
    "image": {
      "src": "/covers/peru-humala-corruption-sentence-overturned.png",
      "alt": "Former Peruvian President Ollanta Humala",
      "credit": "Ollanta Humala (2014). CC BY 2.0 via Wikimedia Commons."
    },
    "edition": "Evening Edition · 31 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Cicero prosecutes the corrupt governor Verres (70 BC)",
        "excerpt": "For an opinion has now become established, pernicious to us, and pernicious to the republic, which has been the common talk of every one, not only at Rome, but among foreign nations also,—that in the courts of law as they exist at present, no wealthy man, however guilty he may be, can possibly be convicted. … Caius Verres is brought to trial as a criminal, a man condemned in the opinion of every one by his life and actions, but acquitted by the enormousness of his wealth according to his own hope and boast.",
        "source": "Marcus Tullius Cicero, The Orations Against Verres, First Pleading, trans. C. D. Yonge (1903), via Wikisource.",
        "href": "https://en.wikisource.org/wiki/Against_Verres/First_pleading",
        "image": {
          "src": "/covers/peru-humala-corruption-sentence-overturned--a0.png",
          "alt": "Marble bust of the Roman orator Cicero",
          "credit": "Bust of Cicero, 1st century, Musei Capitolini, Rome; photograph Public domain via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "Alfred Dreyfus, convicted and later vindicated (1894–1906)",
        "excerpt": "But I hope in God and in justice. In the end the truth must come to light. My conscience is calm and tranquil.",
        "source": "Alfred Dreyfus, Lettres d'un Innocent: The Letters of Captain Dreyfus to His Wife, trans. L. G. Moreau (New York and London: Harper & Brothers, 1899), letter from prison; digitized primary source via the Internet Archive.",
        "href": "https://archive.org/details/lettresduninnoce00drey",
        "image": {
          "src": "/covers/peru-humala-corruption-sentence-overturned--a1.png",
          "alt": "Photographic portrait of Captain Alfred Dreyfus in French artillery uniform",
          "credit": "Portrait of Alfred Dreyfus (1859–1935), c. 1894; Public domain via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Émile Zola, \"J'Accuse…!\" open letter (13 January 1898)",
        "excerpt": "I accuse Major Du Paty de Clam as the diabolic workman of the miscarriage of justice, without knowing, I have wanted to believe it, and of then defending his harmful work, for three years, by the guiltiest and most absurd of machinations. … I accuse General Billot of having held in his hands the unquestionable evidence of Dreyfus's innocence and of suppressing it, guilty of this crime that injures humanity and justice, with a political aim and to save the compromised Chief of High Command.",
        "source": "Émile Zola, \"J'Accuse…!\" (Letter to the President of the Republic), L'Aurore, 13 January 1898; English translation via Wikisource.",
        "href": "https://en.wikisource.org/wiki/Translation:J%27Accuse...!",
        "image": {
          "src": "/covers/peru-humala-corruption-sentence-overturned--a2.png",
          "alt": "Front page of the newspaper L'Aurore printing Zola's open letter under the headline J'Accuse…!",
          "credit": "Front page of L'Aurore, 13 January 1898, with Émile Zola's \"J'Accuse…!\"; Public domain via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Aeschylus, Eumenides — the first court of law acquits Orestes (458 BC)",
        "excerpt": "Hear now my ordinance, people of Attica, as you judge the first trial for bloodshed. … I establish this tribunal, untouched by greed, worthy of reverence, quick to anger, awake on behalf of those who sleep, a guardian of the land.",
        "source": "Aeschylus, Eumenides, trans. Herbert Weir Smyth (Loeb Classical Library, 1926), via the Perseus Digital Library, Tufts University.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0006:card=681",
        "image": {
          "src": "/covers/peru-humala-corruption-sentence-overturned--a3.png",
          "alt": "Painting of Orestes pursued by the avenging Furies",
          "credit": "William-Adolphe Bouguereau, The Remorse of Orestes (Orestes Pursued by the Furies), 1862, Chrysler Museum of Art; Public domain via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Jean-Léon Gérôme, \"Truth Coming Out of Her Well\" (1896)",
        "excerpt": "A furious nude figure hauls herself up from the black mouth of a well, whip in hand, the personification of Truth surfacing at last to shame the world that had buried her. Gérôme painted her in the very years of the Dreyfus scandal, when suppressed facts were clawing their way back into daylight. The image speaks to every case in which a hidden truth resurfaces and overturns a verdict long thought settled.",
        "source": "Jean-Léon Gérôme, La Vérité sortant du puits (Truth Coming Out of Her Well), oil on canvas, 1896, Musée Anne-de-Beaujeu, Moulins; via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Truth_Coming_Out_of_Her_Well_to_Shame_Mankind,_1896.jpg",
        "image": {
          "src": "/covers/peru-humala-corruption-sentence-overturned--a4.png",
          "alt": "A nude woman emerging angrily from a well holding a whip, personifying Truth",
          "credit": "Jean-Léon Gérôme, Truth Coming Out of Her Well, 1896, Musée Anne-de-Beaujeu, Moulins; Public domain via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Beethoven, Fidelio, Op. 72 — the unjustly imprisoned set free (1814)",
        "excerpt": "In Beethoven's only opera, the faithful Leonore disguises herself to infiltrate the prison where her husband Florestan is wrongly held in chains, and rescues him at the edge of death. The blinking prisoners stumble into the light singing of freedom, and a corrupt jailer's scheme collapses as justice arrives. It is music built entirely around a falsely condemned man walking out of his cell into the sun.",
        "source": "Ludwig van Beethoven, Fidelio, Op. 72 (final 1814 version); scores and libretto via the International Music Score Library Project (IMSLP).",
        "href": "https://imslp.org/wiki/Fidelio,_Op.72_(Beethoven,_Ludwig_van)",
        "image": {
          "src": "/covers/peru-humala-corruption-sentence-overturned--a5.png",
          "alt": "Painted portrait of composer Ludwig van Beethoven holding a manuscript",
          "credit": "Joseph Karl Stieler, portrait of Ludwig van Beethoven, 1820; Public domain via Wikimedia Commons"
        }
      }
    ],
    "rank": 8
  },
  {
    "slug": "russia-jehovahs-witnesses-assets-seized",
    "headline": "A Moscow court confiscates 123 properties belonging to Jehovah's Witnesses and transfers them to the Russian state",
    "overview": "A Moscow court has ordered the seizure of 123 real estate assets previously registered to the Swedish branch of the Jehovah's Witnesses and handed them to the Russian state, the city's court service said on 31 July. The properties include 63 residential and commercial buildings covering more than 11,000 square metres and 60 land plots totalling 5.6 hectares across the country. Russia banned the group as an 'extremist organisation' in 2017 — a designation the European Court of Human Rights later ruled unlawful — and has since jailed many of its members.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiuwFBVV95cUxOMk1jY1RoT3VZakNwanQxdTA1eDY1ZmtSdlFvNFVySkFGUTFpOEdncTMxZlU3VEJpbVlCNzFHZzFvbkttYW9uR2dtTE9JQi1rNGh6OElsX3NCWU52c21GMWVSRE1DN0NrOUl4TlZsMHBrVVotb00xZXdTRExxVUkxQXhiRGlqZkMyNFktMDMtOVdUSk04YnBEOGJNOWZPdVhGVTdNellCWnNwTHE1R1RuSVc1NzBMRFV4QUJv?oc=5"
      },
      {
        "name": "NewsNation",
        "href": "https://www.newsnationnow.com/religion/russia-seizes-jehovahs-witnesses-properties/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-31",
    "image": {
      "src": "/covers/russia-jehovahs-witnesses-assets-seized.png",
      "alt": "A Kingdom Hall of Jehovah's Witnesses",
      "credit": "Kingdom Hall of Jehovah's Witnesses, Karlsruhe. CC BY 3.0 DE via Wikimedia Commons."
    },
    "edition": "Evening Edition · 31 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Diocletian's Great Persecution: the church of Nicomedia razed (303 AD)",
        "excerpt": "When that day dawned, in the eighth consulship of Diocletian and seventh of Maximian, suddenly, while it was yet hardly light, the prefect, together with chief commanders, tribunes, and officers of the treasury, came to the church in Nicomedia, and the gates having been forced open, they searched everywhere for an image of the Divinity. The books of the Holy Scriptures were found, and they were committed to the flames; the utensils and furniture of the church were abandoned to pillage: all was rapine, confusion, tumult.",
        "source": "Lactantius, Of the Manner in Which the Persecutors Died, Chap. XII, trans. William Fletcher, in Ante-Nicene Fathers, Vol. VII.",
        "href": "https://en.wikisource.org/wiki/Ante-Nicene_Fathers/Volume_VII/Lactantius/Of_the_Manner_in_Which_the_Persecutors_Died/Chap._XII"
      },
      {
        "category": "historical",
        "title": "Henry VIII's Dissolution of the Monasteries (1536-1540)",
        "excerpt": "Having made himself Supreme Head of the Church of England, Henry VIII turned the machinery of the state against the monastic houses, cataloguing their wealth in the Valor Ecclesiasticus and sending commissioners to record alleged corruption as a pretext for closure. Over four years more than 800 religious communities were dissolved, their lands, plate, lead and revenues absorbed into the Crown; monks and nuns signed formal deeds of surrender while masons stripped the buildings for the king's palaces. It was one of the largest transfers of a faith's property to the state in English history.",
        "source": "The National Archives (UK), 'The dissolution of the monasteries.'",
        "href": "https://www.nationalarchives.gov.uk/explore-the-collection/explore-by-time-period/early-modern/the-dissolution-of-the-monasteries/",
        "image": {
          "src": "/covers/russia-jehovahs-witnesses-assets-seized--a1.png",
          "alt": "Watercolour of the roofless, ivy-clad interior of ruined Tintern Abbey, its Gothic arches open to the sky.",
          "credit": "J. M. W. Turner, 'Tintern Abbey: The Crossing and Chancel, Looking towards the East Window', 1794, Tate Britain; Public domain via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "The Fiery Furnace: Daniel 3:16-18 (KJV, 1611)",
        "excerpt": "Shadrach, Meshach, and Abed-nego, answered and said to the king, O Nebuchadnezzar, we are not careful to answer thee in this matter. If it be so, our God whom we serve is able to deliver us from the burning fiery furnace, and he will deliver us out of thine hand, O king. But if not, be it known unto thee, O king, that we will not serve thy gods, nor worship the golden image which thou hast set up.",
        "source": "The Book of Daniel 3:16-18, King James Version (1611).",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Daniel"
      },
      {
        "category": "literary",
        "title": "Bunyan's Pilgrim's Progress, written in Bedford Gaol (1678)",
        "excerpt": "As I walked through the wilderness of this world, I lighted on a certain place where was a Den, and I laid me down in that place to sleep: and, as I slept, I dreamed a dream.",
        "source": "John Bunyan, The Pilgrim's Progress from This World to That Which Is to Come (1678). Bunyan's own marginal note glosses the 'Den' as the jail, where he was imprisoned for years for unlicensed preaching.",
        "href": "https://www.gutenberg.org/files/131/131-h/131-h.htm",
        "image": {
          "src": "/covers/russia-jehovahs-witnesses-assets-seized--a3.png",
          "alt": "Painting of John Bunyan seated at work in his prison cell in Bedford, visited by his blind daughter.",
          "credit": "Alexander Johnston, 'John Bunyan in Bedford Prison', 19th century, Blackburn Museum and Art Gallery; Public domain via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Millais, 'A Huguenot' (1852)",
        "excerpt": "On the eve of the St. Bartholomew's Day Massacre, Millais paints a Protestant Huguenot who will not save his own life by tying on the white armband that marks a Catholic. His lover tries to bind the badge to his arm; gently, immovably, he pulls it away. The intimate embrace crystallizes the story of a religious minority refusing to disguise its faith even under the shadow of state and sectarian violence.",
        "source": "John Everett Millais, 'A Huguenot, on St. Bartholomew's Day Refusing to Shield Himself from Danger by Wearing the Roman Catholic Badge', oil on canvas, 1852.",
        "href": "https://commons.wikimedia.org/wiki/File:Sir_John_Everett_Millais._A_Huguenot,_on_St._Bartholomew%27s_Day_Refusing_to_Shield_Himself_from_Danger_by_Wearing_the_Roman_Catholic_Badge..jpg",
        "image": {
          "src": "/covers/russia-jehovahs-witnesses-assets-seized--a4.png",
          "alt": "A young Huguenot man gently refusing the white Catholic armband his lover tries to tie around his arm, the two embracing against an ivied garden wall.",
          "credit": "John Everett Millais, 'A Huguenot', 1852; Public domain via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Simeon Solomon, 'Shadrach, Meshach and Abednego' (1863)",
        "excerpt": "The Pre-Raphaelite Simeon Solomon draws the three young men from the Book of Daniel standing unbowed within the flames, their calm faces and clasped attitudes turning the furnace into an image of steadfast conscience rather than destruction. Ordered to worship the king's golden idol and refusing, they embody a minority faith that will not conform on command. The scene reads as a meditation on how persecution meant to consume belief can instead reveal its endurance.",
        "source": "Simeon Solomon, 'Shadrach, Meshach and Abednego', 1863.",
        "href": "https://commons.wikimedia.org/wiki/File:Simeon_Solomon_-_Shadrach_Meshach_Abednego.JPG",
        "image": {
          "src": "/covers/russia-jehovahs-witnesses-assets-seized--a5.png",
          "alt": "Three robed young men standing serenely amid the flames of the fiery furnace, from the Book of Daniel.",
          "credit": "Simeon Solomon, 'Shadrach, Meshach and Abednego', 1863; Public domain via Wikimedia Commons"
        }
      }
    ],
    "rank": 9
  },
  {
    "slug": "f35b-marine-fighter-crash-california",
    "headline": "A Marine Corps F-35B stealth fighter crashes in California and the pilot ejects with non-life-threatening injuries",
    "overview": "A Marine Corps F-35B stealth fighter crashed in a dirt field on the afternoon of 31 July near Marine Corps Air Station Miramar in San Diego, and the pilot ejected and was taken to a hospital in stable condition with non-life-threatening injuries. The Marines classified it a 'Class A mishap,' their most serious category, reserved for cases involving a death, a destroyed aircraft or more than $2 million in damage; a single F-35B costs about $109 million. Aerial footage showed black smoke rising from the wreckage as fire crews responded, and the cause was not immediately known.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMimAFBVV95cUxPS1JrclNxT3JPWkxwamV1Q1FDUHdwVGtZNHRSSUNxZXF2Yzk1YkotZXpWczliM1RDdWUwb2pUN2x2NlVfcXpiRExubklNU3NPNTdsei1TV3NnM0VNZi14Skx2ZXNTNkFOc3I3SER2SlJ6VC1oZWRrV3RTMFl3bm9Hbmp0akFBRWlPb242bXh3dkRWbVlfSHpEWQ?oc=5"
      },
      {
        "name": "CNN",
        "href": "https://www.cnn.com/2026/07/31/us/military-jet-crash-california-marine-base"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-31",
    "image": {
      "src": "/covers/f35b-marine-fighter-crash-california.png",
      "alt": "A U.S. Marine Corps F-35B Lightning II stealth fighter in flight",
      "credit": "U.S. Marine Corps. Public domain via Wikimedia Commons."
    },
    "edition": "Evening Edition · 31 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Diodorus Siculus records the flight and fall of Icarus (Library of History, 1st century BC)",
        "excerpt": "Thereupon Daedalus, despairing of making his escape by any boat, fashioned with amazing ingenuity wings which were cleverly designed and marvellously fitted together with wax; and fastening these on his son's body and his own he spread them out for flight, to the astonishment of all, and made his escape over the open sea which lies near the island of Crete. As for Icarus, because of the ignorance of youth he made his flight too far aloft and fell into the sea when the wax which held the wings together was melted by the sun, whereas Daedalus, by flying close to the sea and repeatedly wetting the wings, made his way in safety.",
        "source": "Diodorus Siculus, Library of History, Book IV.77, trans. C. H. Oldfather (Loeb Classical Library), via LacusCurtius (University of Chicago)",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Diodorus_Siculus/4D*.html"
      },
      {
        "category": "historical",
        "title": "The first fatal powered-airplane crash kills Lt. Thomas Selfridge at Fort Myer (17 September 1908)",
        "excerpt": "The aeroplane seemed to tip sharply for a fraction of a second, then it started up for about ten feet; this was followed by a short, sharp dive and a crash in the field. Instantly the dust arose in a yellow, choking cloud that spread a dull pall over the great white man-made bird that had dashed to its death.",
        "source": "“Fatal Fall of Wright Airship,” The New York Times, 1908, via Wikisource",
        "href": "https://en.wikisource.org/wiki/Fatal_fall_of_Wright_airship",
        "image": {
          "src": "/covers/f35b-marine-fighter-crash-california--a1.png",
          "alt": "Wreckage of the Wright Military Flyer lying crumpled in a field after the Fort Myer crash",
          "credit": "Photograph of the wreckage of the Wright Military Flyer that killed Lt. Thomas Selfridge, Fort Myer, Virginia, 17 September 1908; Public domain via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Ovid, Metamorphoses, Book VIII — the wax melts and Icarus falls (8 AD)",
        "excerpt": "The vicinity of the scorching Sun softened the fragrant wax that fastened his wings. The wax was melted; he shook his naked arms, and, wanting his oar-like wings, he caught no more air. His face, too, as he called on the name of his father, was received in the azure water, which received its name from him.",
        "source": "Ovid, The Metamorphoses, Book VIII, trans. Henry T. Riley, via Project Gutenberg",
        "href": "https://www.gutenberg.org/files/26073/26073-h/26073-h.htm"
      },
      {
        "category": "literary",
        "title": "W. B. Yeats, “An Irish Airman Foresees his Death” (1919)",
        "excerpt": "I know that I shall meet my fate\nSomewhere among the clouds above;\nThose that I fight I do not hate\nThose that I guard I do not love;\nMy country is Kiltartan Cross,\nMy countrymen Kiltartan's poor,\nNo likely end could bring them loss\nOr leave them happier than before.\nNor law, nor duty bade me fight,\nNor public man, nor cheering crowds,\nA lonely impulse of delight\nDrove to this tumult in the clouds;\nI balanced all, brought all to mind,\nThe years to come seemed waste of breath,\nA waste of breath the years behind\nIn balance with this life, this death.",
        "source": "W. B. Yeats, “An Irish Airman Foresees his Death,” The Wild Swans at Coole (1919), via Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Wild_Swans_at_Coole_(Collection)/An_Irish_Airman_Foresees_his_Death"
      },
      {
        "category": "artistic",
        "title": "Pieter Bruegel the Elder, “Landscape with the Fall of Icarus” (c. 1560)",
        "excerpt": "In Bruegel's serene harbor scene the catastrophe is almost hidden: a ploughman turns his furrow, a shepherd gazes at the sky, and only a pair of pale legs vanishing into the green water marks where the flyer has struck the sea. The world sails calmly on, indifferent to the machine and the man that have just fallen out of the heavens.",
        "source": "Pieter Bruegel the Elder (copy after), Landscape with the Fall of Icarus, c. 1560, oil on canvas, Royal Museums of Fine Arts of Belgium, Brussels",
        "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_de_Oude_-_De_val_van_Icarus.jpg",
        "image": {
          "src": "/covers/f35b-marine-fighter-crash-california--a4.png",
          "alt": "A sunlit harbor with a ploughman and ships, and Icarus's legs disappearing into the sea at lower right",
          "credit": "Landscape with the Fall of Icarus, after Pieter Bruegel the Elder, c. 1560, Royal Museums of Fine Arts of Belgium, Brussels; Public domain via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Jacob Peter Gowy, “The Fall of Icarus” (1635–1637)",
        "excerpt": "Gowy freezes the instant of ruin: Icarus tumbles headlong through open sky, wings shedding their feathers, his father Daedalus turning back in horror as the boy plunges toward the distant sea. Where Bruegel hides the fall, Gowy makes it the whole drama — the soaring body caught at the very hinge between flight and plummet.",
        "source": "Jacob Peter Gowy, The Fall of Icarus, 1635–1637, oil on canvas, Museo Nacional del Prado, Madrid",
        "href": "https://commons.wikimedia.org/wiki/File:Gowy-icaro-prado.jpg",
        "image": {
          "src": "/covers/f35b-marine-fighter-crash-california--a5.png",
          "alt": "Icarus falling headlong from the sky as his winged father Daedalus reaches toward him",
          "credit": "The Fall of Icarus, Jacob Peter Gowy, 1635–1637, Museo Nacional del Prado, Madrid; Public domain via Wikimedia Commons"
        }
      }
    ],
    "rank": 10
  },
  {
    "slug": "trump-gilded-dc-statues-divide",
    "headline": "The Trump administration's $5 million gold-leaf regilding of statues near the Lincoln Memorial divides opinion",
    "overview": "The gilding of four monumental equestrian statues near the Lincoln Memorial — the 'Arts of War' and 'Arts of Peace' groups first installed in 1951 — has split public opinion, art critics reported on 31 July, after the Interior Department coated the bronzes in 23.75-karat gold leaf under a roughly $5 million no-bid contract. The 'Arts of War' pair was unveiled on 27 July, with the 'Arts of Peace' due by late September. Supporters called the refreshed monuments beautiful, while detractors likened the finish to 'Home Depot gold spray paint' and questioned the cost.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Artforum",
        "href": "https://www.artforum.com/news/trump-administration-gilding-of-dc-statues-divides-opinions-1234756144/"
      },
      {
        "name": "ARTnews",
        "href": "https://www.artnews.com/art-news/news/regilded-arts-of-war-equestrian-statues-lincoln-memorial-revealed-1234793976/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-31",
    "image": {
      "src": "/covers/trump-gilded-dc-statues-divide.png",
      "alt": "One of the 'Arts of War' equestrian statues near the Lincoln Memorial in Washington",
      "credit": "'Arts of War' by Leo Friedlander, Washington. CC BY 3.0 via Wikimedia Commons."
    },
    "edition": "Evening Edition · 31 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Nero's Golden House (Domus Aurea), Rome, c. 64-68 CE",
        "excerpt": "In the rest of the house all parts were overlaid with gold and adorned with gems and mother-of-pearl. There were dining-rooms with fretted ceils of ivory, whose panels could turn and shower down flowers and were fitted with pipes for sprinkling the guests with perfumes.",
        "source": "Suetonius, The Lives of the Caesars, \"Life of Nero\" 31, trans. J. C. Rolfe (Loeb Classical Library, 1914), via LacusCurtius (University of Chicago).",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Suetonius/12Caesars/Nero*.html"
      },
      {
        "category": "historical",
        "title": "Louis XIV's Hall of Mirrors, Versailles, 1678-1684",
        "excerpt": "When the Sun King built his Galerie des Glaces, gilt and glass became instruments of statecraft: seventeen mirror-clad arches, gilded bronze capitals and a ceiling glorifying his reign turned raw expense into political theater. Courtiers and foreign envoys were meant to be dazzled into deference, the gold reading as the visible currency of absolute power. Critics then, as now, wondered where magnificence ended and vanity began.",
        "source": "Galerie des Glaces (Hall of Mirrors), Palace of Versailles, built for Louis XIV, 1678-1684; photograph via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Chateau_de_Versailles_-_Galerie_des_Glaces.jpg",
        "image": {
          "src": "/covers/trump-gilded-dc-statues-divide--a1.png",
          "alt": "The gilded Hall of Mirrors at the Palace of Versailles, its arched mirrors and gold ornament reflecting the vaulted painted ceiling.",
          "credit": "Galerie des Glaces (Hall of Mirrors), Palace of Versailles, 1678-1684; photograph via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Ovid, King Midas and the Golden Touch (Metamorphoses XI), 8 CE",
        "excerpt": "\"Cause whatsoever I shall touch to change / at once to yellow gold.\" Bacchus agreed / to his unfortunate request, with grief / that Midas chose for harm and not for good.",
        "source": "Ovid, Metamorphoses 11.100-105, trans. Brookes More (Boston: Cornhill, 1922), via Perseus Digital Library, Tufts University.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.02.0028%3Abook%3D11%3Acard%3D85"
      },
      {
        "category": "literary",
        "title": "The Golden Calf (Exodus 32), King James Version",
        "excerpt": "And he received them at their hand, and fashioned it with a graving tool, after he had made it a molten calf: and they said, These be thy gods, O Israel, which brought thee up out of the land of Egypt. ... And I said unto them, Whosoever hath any gold, let them break it off. So they gave it me: then I cast it into the fire, and there came out this calf.",
        "source": "Exodus 32:4, 24, The Holy Bible, King James Version (1769), via Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_Holy_Bible_(King_James_Version,_1769)/Exodus/Chapter_32",
        "image": {
          "src": "/covers/trump-gilded-dc-statues-divide--a3.png",
          "alt": "Nicolas Poussin's painting of the Israelites dancing in worship around a golden calf raised on a pedestal.",
          "credit": "The Adoration of the Golden Calf, Nicolas Poussin, c. 1633-1634, National Gallery, London; Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Gustav Klimt, The Kiss (Der Kuss), 1907-1908",
        "excerpt": "In Klimt's shimmering panel, two lovers dissolve into a single mantle of beaten gold leaf, the metal flattening flesh and cloth into pure ornament. The gold is at once transcendent and conspicuously precious, embodying the artist's \"Golden Phase\" fascination with surface, wealth and desire. It shows how a coat of gold can transfigure a subject into an icon, or into a spectacle of luxury.",
        "source": "Gustav Klimt, The Kiss (Der Kuss), 1907-1908, oil and gold leaf on canvas, Belvedere, Vienna.",
        "href": "https://commons.wikimedia.org/wiki/File:Gustav_Klimt_016.jpg",
        "image": {
          "src": "/covers/trump-gilded-dc-statues-divide--a4.png",
          "alt": "Two embracing lovers enveloped in an elaborate golden robe against a golden background, kneeling on a flowered meadow.",
          "credit": "The Kiss (Der Kuss), Gustav Klimt, 1907-1908, Belvedere, Vienna; Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Equestrian Statue of Marcus Aurelius, Rome, c. 175 CE",
        "excerpt": "Rome's great bronze horseman was originally sheathed in gold, its gilding meant to broadcast the emperor's authority to everyone who passed beneath it. Traces of gold leaf still cling to the metal, a reminder that gilding a monumental equestrian statue is one of the oldest gestures of power in Western art. That the Washington statues are equestrian and newly gilded makes the ancient precedent uncannily direct.",
        "source": "Equestrian Statue of Marcus Aurelius, c. 175 CE, gilded bronze, Capitoline Museums (Musei Capitolini), Rome.",
        "href": "https://commons.wikimedia.org/wiki/File:Equestrian_marcus_aurelius.JPG",
        "image": {
          "src": "/covers/trump-gilded-dc-statues-divide--a5.png",
          "alt": "The ancient gilded-bronze equestrian statue of the Roman emperor Marcus Aurelius, mounted on his horse with arm outstretched.",
          "credit": "Equestrian Statue of Marcus Aurelius (c. 175 CE), gilded bronze, Capitoline Museums, Rome; photograph via Wikimedia Commons."
        }
      }
    ],
    "rank": 11
  },
  {
    "slug": "tony-cragg-european-culture-prize",
    "headline": "British sculptor Tony Cragg is named winner of the 2026 European Culture Prize",
    "overview": "Tony Cragg, the Liverpool-born sculptor who has lived in Wuppertal, Germany for nearly five decades, has been named the recipient of the 2026 European Culture Prize, awarded annually since 2012 by the European Cultural Forum, the group announced on 31 July. Forum chairman Reiner Schraenkler called Cragg 'one of the most significant sculptors of our time,' whose work uniquely combines 'science, nature, materials research and artistic vision.' A former Turner Prize winner who founded the Waldfrieden Sculpture Park, Cragg will receive the award at Amsterdam's Royal Concertgebouw on 4 September.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Artforum",
        "href": "https://www.artforum.com/news/sculptor-tony-cragg-to-receive-2026-european-culture-prize-1234756087/"
      },
      {
        "name": "Artsy",
        "href": "https://www.artsy.net/article/artsy-editorial-sculptor-tony-cragg-awarded-2026-european-culture-prize"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-31",
    "image": {
      "src": "/covers/tony-cragg-european-culture-prize.png",
      "alt": "A sculpture by Tony Cragg at the Waldfrieden Sculpture Park in Wuppertal",
      "credit": "Sculpture by Tony Cragg, Skulpturenpark Waldfrieden, Wuppertal. Public domain via Wikimedia Commons."
    },
    "edition": "Evening Edition · 31 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Pliny the Elder ranks the great sculptors of bronze (c. AD 77)",
        "excerpt": "An almost innumerable multitude of artists have been rendered famous by their statues and figures of smaller size. Before all others is Phidias, the Athenian, who executed the Jupiter at Olympia, in ivory and gold, but who also made figures in brass as well. He flourished in the eighty-third Olympiad, about the year of our City, 300. To the same age belong also his rivals Alcamenes, Critias, Nesiotes, and Hegias. Afterwards, in the eighty-seventh Olympiad, there were Agelades, Callon, and Gorgias the Laconian. In the ninetieth Olympiad there were Polycletus, Phradmon, Myron, Pythagoras.",
        "source": "Pliny the Elder, The Natural History, Book XXXIV, Chapter 19, trans. John Bostock and H. T. Riley. Perseus Digital Library, Tufts University.",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0137:book=34:chapter=19",
        "image": {
          "src": "/covers/tony-cragg-european-culture-prize--a0.png",
          "alt": "Ancient Greek bronze statue of Zeus or Poseidon, arms outstretched, recovered from the sea off Cape Artemision",
          "credit": "Artemision Bronze (Zeus or Poseidon), c. 460 BC, National Archaeological Museum, Athens. Public domain via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "Vasari on Michelangelo carving the 'David' from a ruined block (1501-04)",
        "excerpt": "Michelagnolo measured it all anew, considering whether he might be able to carve a reasonable figure from that block by accommodating himself as to the attitude to the marble as it had been left all misshapen by Maestro Simone; and he resolved to ask for it from Soderini and the Wardens, by whom it was granted to him as a thing of no value. Whereupon Michelagnolo made a model of wax, fashioning in it, as a device for the Palace, a young David with a sling in his hand. And truly it was a miracle on the part of Michelagnolo to restore to life a thing that was dead.",
        "source": "Giorgio Vasari, Lives of the Most Eminent Painters, Sculptors and Architects, Vol. IX, trans. Gaston du C. de Vere. Project Gutenberg eBook No. 32362.",
        "href": "https://www.gutenberg.org/files/32362/32362-h/32362-h.htm",
        "image": {
          "src": "/covers/tony-cragg-european-culture-prize--a1.png",
          "alt": "Michelangelo's marble statue of David standing with a sling over his shoulder, in the Galleria dell'Accademia, Florence",
          "credit": "David, Michelangelo, 1501-04, Galleria dell'Accademia, Florence; photograph via Wikimedia Commons (sculpture in the public domain)"
        }
      },
      {
        "category": "literary",
        "title": "Ovid's Pygmalion, the sculptor whose ivory statue comes to life (c. AD 8)",
        "excerpt": "In the meantime, he ingeniously carved {a statue of} snow-white ivory with wondrous skill; and gave it a beauty with which no woman can be born; and {then} conceived a passion for his own workmanship. The appearance was that of a real virgin, whom you might suppose to be alive, and if modesty did not hinder her, to be desirous to move; so much did art lie concealed under his skill. ... The pressed ivory becomes soft, and losing its hardness, yields to the fingers, and gives way, just as Hymettian wax grows soft in the sun. ... It is a {real} body; the veins throb, when touched with the thumb.",
        "source": "Ovid, The Metamorphoses, Book X, Fable VII ('Pygmalion's statue'), trans. Henry T. Riley. Project Gutenberg eBook No. 26073.",
        "href": "https://www.gutenberg.org/files/26073/26073-h/26073-h.htm",
        "image": {
          "src": "/covers/tony-cragg-european-culture-prize--a2.png",
          "alt": "Painting of Pygmalion embracing his ivory statue as it turns from white stone to living flesh",
          "credit": "Pygmalion and Galatea, Jean-Leon Gerome, c. 1890, The Metropolitan Museum of Art. Public domain via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Rilke, 'Archaischer Torso Apollos' ('Archaic Torso of Apollo', 1908)",
        "excerpt": "Wir kannten nicht sein unerhörtes Haupt, / darin die Augenäpfel reiften. Aber / sein Torso glüht noch wie ein Kandelaber, / in dem sein Schauen, nur zurückgeschraubt, / sich hält und glänzt. ... und bräche nicht aus allen seinen Rändern / aus wie ein Stern: denn da ist keine Stelle, / die dich nicht sieht. Du mußt dein Leben ändern.",
        "source": "Rainer Maria Rilke, 'Archaïscher Torso Apollos', from Der neuen Gedichte anderer Teil (Insel-Verlag, Leipzig, 1918). German Wikisource.",
        "href": "https://de.wikisource.org/wiki/Archa%C3%AFscher_Torso_Apollos",
        "image": {
          "src": "/covers/tony-cragg-european-culture-prize--a3.png",
          "alt": "Archaic Greek marble kouros standing frontally, a nude youth of the type Rilke's poem evokes",
          "credit": "Kroisos Kouros from Anavysos, c. 530 BC, National Archaeological Museum, Athens. Public domain via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Auguste Rodin, 'The Thinker' (modelled 1880-81)",
        "excerpt": "Rodin took the raw eloquence of the body and bent it into thought itself, a seated man whose every taut muscle seems to labour toward an idea. Like Cragg, he treated material not as inert stuff but as something that could be pressed into the shape of a mind at work. The bronze proves that a sculptor's true subject is the invisible force that moves through matter.",
        "source": "Auguste Rodin, The Thinker (Le Penseur), bronze, modelled 1880-81. File page, Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:The_Thinker,_Rodin.jpg",
        "image": {
          "src": "/covers/tony-cragg-european-culture-prize--a4.png",
          "alt": "Bronze sculpture of a nude man seated on a rock, chin resting on his hand in deep contemplation",
          "credit": "The Thinker, Auguste Rodin, modelled 1880-81 (Rodin d. 1917). Public domain via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "The 'Belvedere Torso', ancient marble fragment (1st century BC)",
        "excerpt": "Signed by Apollonios of Athens and unearthed in Renaissance Rome, this headless, limbless torso became a school for sculptors, Michelangelo among them, who read whole anatomies of power in its broken flanks. It shows how a fragment of shaped stone can carry more life than many a complete figure. For a laureate praised for coaxing form out of raw material, it stands as the deep ancestor of the craft.",
        "source": "Apollonios of Athens, Belvedere Torso, marble, Museo Pio-Clementino, Vatican Museums. File page, Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Belvedere_Torso-Vatican_Museums.jpg",
        "image": {
          "src": "/covers/tony-cragg-european-culture-prize--a5.png",
          "alt": "Fragmentary ancient marble torso of a powerfully muscled seated male figure, without head, arms or lower legs",
          "credit": "Belvedere Torso, signed by Apollonios of Athens, 1st century BC, Vatican Museums. Public domain via Wikimedia Commons"
        }
      }
    ],
    "rank": 12
  },
  {
    "slug": "decoy-font-anti-ai-typeface",
    "headline": "'Decoy Font' uses an optical-illusion typeface to show humans one message and AI another",
    "overview": "A free typeface called Decoy Font, released by the creator of the online tool Mixfont and highlighted by Dezeen on 31 July, exploits an optical illusion to make text that people can read but current AI chatbots misread. The font layers each letter with two randomly chosen 'decoy' letters using the hybrid-image technique, which combines high- and low-spatial-frequency shapes; humans tend to see the bold background forms while image-reading language models latch onto the crisp foreground outlines. Its maker cautions it is a playful experiment rather than encryption, since an AI told a hidden message exists can often process the image to recover it.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Dezeen",
        "href": "https://www.dezeen.com/2026/07/31/decoy-font-ai-mixfont/"
      },
      {
        "name": "Mixfont",
        "href": "https://www.mixfont.com/experiments/decoy-font"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-31",
    "image": {
      "src": "/covers/decoy-font-anti-ai-typeface.png",
      "alt": "Pieces of metal movable type",
      "credit": "Metal movable type, photograph by Willi Heidelbach. CC BY 2.5 via Wikimedia Commons."
    },
    "edition": "Evening Edition · 31 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Histiaeus's tattooed scalp (c. 499 BC), in Herodotus's 'Histories'",
        "excerpt": "For Histiaeus, when he was anxious to give Aristagoras orders to revolt, could find but one safe way, as the roads were guarded, of making his wishes known; which was by taking the trustiest of his slaves, shaving all the hair from off his head, and then pricking letters upon the skin, and waiting till the hair grew again. Thus accordingly he did; and as soon as ever the hair was grown, he despatched the man to Miletus, giving him no other message than this—'When thou art come to Miletus, bid Aristagoras shave thy head, and look thereon.'",
        "source": "Herodotus, The History of Herodotus, Book V, ch. 35 (George Rawlinson translation), via Wikisource.",
        "href": "https://en.wikisource.org/wiki/History_of_Herodotus/Book_5",
        "image": {
          "src": "/covers/decoy-font-anti-ai-typeface--a0.png",
          "alt": "Roman marble bust of the Greek historian Herodotus.",
          "credit": "Bust of Herodotus, Roman copy (2nd century AD) of a Greek original, Metropolitan Museum of Art; photo by Marie-Lan Nguyen, CC BY 2.5 via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "Bacon's bi-literal cipher of two typefaces (1623/1640)",
        "excerpt": "It containeth the highest degree of Cypher, which is to signifie omnia per omnia, yet so as the writing infolding, may beare a quintuple proportion to the writing infolded. ... a Bi-formed Alphabet, which may represent all the Letters of the Common Alphabet, as well Capitall Letters as the Smaller Characters in a double forme, as may fit every mans occasion.",
        "source": "Francis Bacon, De Augmentis Scientiarum (1623), Book VI, trans. Gilbert Wats (1640); as reproduced in Elizabeth Wells Gallup, Concerning the Bi-Lateral Cypher of Francis Bacon, Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/70119/70119-h/70119-h.htm"
      },
      {
        "category": "literary",
        "title": "Legrand on cryptographs in Poe's 'The Gold-Bug' (1843)",
        "excerpt": "Circumstances, and a certain bias of mind, have led me to take interest in such riddles, and it may well be doubted whether human ingenuity can construct an enigma of the kind which human ingenuity may not, by proper application, resolve.",
        "source": "Edgar Allan Poe, \"The Gold-Bug,\" in Tales (1845), via Wikisource.",
        "href": "https://en.wikisource.org/wiki/Tales_(Poe)/The_Gold-Bug"
      },
      {
        "category": "literary",
        "title": "The pictorial cipher in Conan Doyle's 'The Dancing Men' (1903)",
        "excerpt": "Having once recognised, however, that the symbols stood for letters, and having applied the rules which guide us in all forms of secret writings, the solution was easy enough.",
        "source": "Arthur Conan Doyle, \"The Adventure of the Dancing Men,\" in The Return of Sherlock Holmes (1905), via Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_Return_of_Sherlock_Holmes/Chapter_3"
      },
      {
        "category": "artistic",
        "title": "Holbein's anamorphic skull in 'The Ambassadors' (1533)",
        "excerpt": "Two richly dressed diplomats stand between the tools of learning—globes, a lute, instruments—yet a strange grey smear floats across the floor. Step to the painting's edge and the smear snaps into focus as a human skull, a memento mori that only the correctly angled viewer can read. Holbein hid a second meaning in plain sight, legible to one vantage and invisible to another, much as Decoy Font shows one message to the eye and another to the machine.",
        "source": "Hans Holbein the Younger, The Ambassadors, 1533, oil and tempera on oak, National Gallery, London (NG1314).",
        "href": "https://commons.wikimedia.org/wiki/File:Hans_Holbein_the_Younger_-_The_Ambassadors_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/decoy-font-anti-ai-typeface--a4.png",
          "alt": "Holbein's double portrait of two ambassadors, with a distorted anamorphic skull stretched across the foreground floor.",
          "credit": "The Ambassadors, Hans Holbein the Younger, 1533, National Gallery, London; Public domain via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Arcimboldo's double-reading 'Vertumnus' (1591)",
        "excerpt": "From a distance the canvas presents an emperor's genial face; up close it dissolves into a heap of pears, apples, grapes, wheat and blossoms, each fruit doing double duty as cheek, nose or brow. Arcimboldo painted a single image that reads two ways at once—a portrait to one glance, a still life to the next. The trick is the same one Decoy Font exploits: a surface that yields a different message depending on who, or what, is doing the looking.",
        "source": "Giuseppe Arcimboldo, Vertumnus (Emperor Rudolf II), c. 1591, oil on panel, Skokloster Castle, Sweden.",
        "href": "https://commons.wikimedia.org/wiki/File:Vertumnus_%C3%A5rstidernas_gud_m%C3%A5lad_av_Giuseppe_Arcimboldo_1591_-_Skoklosters_slott_-_91503.jpg",
        "image": {
          "src": "/covers/decoy-font-anti-ai-typeface--a5.png",
          "alt": "Portrait of Emperor Rudolf II composed entirely of fruits, vegetables and flowers arranged to form a human face.",
          "credit": "Vertumnus (Emperor Rudolf II), Giuseppe Arcimboldo, 1591, Skokloster Castle, Sweden; Public domain via Wikimedia Commons"
        }
      }
    ],
    "rank": 13
  },
  {
    "slug": "gaza-board-of-peace-hamas-disarm",
    "headline": "Trump says his 'Board of Peace' has reached a deal for Hamas to disarm in Gaza, with Israel to withdraw as it is completed",
    "overview": "US President Donald Trump announced on 31 July that the Board of Peace, the oversight body created under his 20-point Gaza plan, had reached an agreement for the complete disarmament of Hamas, calling it a 'critical step towards Gaza finally being governed by a new Palestinian government.' A senior Hamas official told the BBC the group had agreed to the plan and would issue a statement soon; Trump said Israel would withdraw from Gaza 'as disarmament is completed' and thanked mediators Egypt, Qatar and Turkey. Israel had yet to comment, and analysts cautioned that many hurdles remain before the ceasefire's second phase can hold.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMimAFBVV95cUxPU3NpUUpTMzE1SHUwQlBNM0w5QUQzR08wTWtXQ0xDX0FHX2RxV2NCUDRJNUItNDhoekQxeVJLSkpVMjV6MmFCZlU1M1VyQTRwVVd3M29RQmFyZTNnRWs0Tkx6aUZSbjZ2WjQxMUJURjN5R3FNTHVmMXVIcTZEbFE2WDFPbUk0YTlYUG1BNG5ZWFNEOEJ5bFpvOQ?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cj03m512r4go"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-31",
    "image": {
      "src": "/covers/gaza-board-of-peace-hamas-disarm.png",
      "alt": "Palestinians inspect the aftermath of an Israeli strike on a house in Gaza City",
      "credit": "BBC"
    },
    "edition": "Morning Edition · 31 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Treaty of Kadesh: the world's earliest surviving peace treaty (c. 1259 BCE)",
        "excerpt": "Kheta-sira, the great king of Kheta, is in covenant with Ramessu Miamun, the great prince of Egypt, from this very day forward, that there may subsist a good friendship and a good understanding between them for evermore. 'He shall be my ally; he shall be my friend: I will be his ally; I will be his friend: for ever.",
        "source": "The peace treaty between Ramses II of Egypt and Hattusili III of the Hittites (c. 1259 BCE), as translated in A. H. Sayce, The Hittites: The Story of a Forgotten Empire, Chapter II.",
        "href": "https://en.wikisource.org/wiki/The_Hittites/Chapter_2",
        "image": {
          "src": "/covers/gaza-board-of-peace-hamas-disarm--a0.png",
          "alt": "Cuneiform clay tablet inscribed with the Akkadian version of the Egyptian-Hittite peace treaty (Treaty of Kadesh)",
          "credit": "Cuneiform tablet of the Egyptian-Hittite peace treaty, c. 1259 BCE, from Hattusa; Istanbul Archaeology Museums. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "The Camp David Accords: a U.S. president brokers peace and an Israeli withdrawal (1978)",
        "excerpt": "The Camp David Accords, signed by President Jimmy Carter, Egyptian President Anwar Sadat, and Israeli Prime Minister Menachem Begin in September 1978, established a framework for a historic peace treaty concluded between Israel and Egypt in March 1979. President Carter and the U.S. Government played leading roles in creating the opportunity for this agreement to occur.",
        "source": "\"Camp David Accords and the Arab-Israeli Peace Process,\" Office of the Historian, U.S. Department of State, Milestones: 1977-1980.",
        "href": "https://history.state.gov/milestones/1977-1980/camp-david",
        "image": {
          "src": "/covers/gaza-board-of-peace-hamas-disarm--a1.png",
          "alt": "Menachem Begin, Jimmy Carter, and Anwar Sadat together at Camp David in 1978",
          "credit": "Menachem Begin, Jimmy Carter and Anwar Sadat at Camp David, September 1978; U.S. National Archives / White House photograph. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Isaiah's vision: swords beaten into ploughshares",
        "excerpt": "And he shall judge among the nations, and shall rebuke many people: and they shall beat their swords into plowshares, and their spears into pruninghooks: nation shall not lift up sword against nation, neither shall they learn war any more.",
        "source": "The Holy Bible, King James Version, Book of Isaiah, chapter 2, verse 4.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Isaiah",
        "image": {
          "src": "/covers/gaza-board-of-peace-hamas-disarm--a2.png",
          "alt": "Painting of wild and domestic animals resting peacefully together with children, illustrating Isaiah's prophecy of peace",
          "credit": "Edward Hicks, The Peaceable Kingdom, c. 1830-1840, oil on canvas; National Gallery of Art, Washington. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Aristophanes' Peace: a mortal hauls the goddess Peace back to earth and the arms-makers go bankrupt",
        "excerpt": "Trygaeus, my best of friends, what a fine stroke of business you have done for me by bringing back Peace! Formerly my sickles would not have sold at an obolus apiece; to-day I am being paid fifty drachmae for every one. And here is a neighbour who is selling his casks for the country at three drachmae each.",
        "source": "Aristophanes, Peace (Eirene), first produced 421 BCE; English prose translation, Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/2571/2571-h/2571-h.htm",
        "image": {
          "src": "/covers/gaza-board-of-peace-hamas-disarm--a3.png",
          "alt": "Marble statue of the goddess Eirene (Peace) cradling the infant Plutus (Wealth) in her arms",
          "credit": "Eirene (Peace) bearing the infant Plutus, Roman marble copy after the Greek bronze by Kephisodotos (c. 370 BCE); Glyptothek, Munich. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Rubens, Minerva protects Pax from Mars ('Peace and War') — painted by an artist who was himself a peace envoy",
        "excerpt": "Rubens's grand allegory shows the goddess of Peace, Pax, seated with a satyr and children who spill out horns of plenty, while behind her the helmeted Minerva, goddess of wisdom, thrusts back the armoured war-god Mars and his Fury. Painted while Rubens served as a diplomatic go-between negotiating an Anglo-Spanish truce, the canvas argues visually that once war is pushed away, abundance and the safety of children flow. Rubens gave the picture to King Charles I in 1630, the same year the peace he helped broker was signed.",
        "source": "Peter Paul Rubens, Minerva protects Pax from Mars ('Peace and War'), c. 1629-1630, oil on canvas; The National Gallery, London (NG46).",
        "href": "https://www.nationalgallery.org.uk/paintings/peter-paul-rubens-minerva-protects-pax-from-mars-peace-and-war",
        "image": {
          "src": "/covers/gaza-board-of-peace-hamas-disarm--a4.png",
          "alt": "Baroque allegorical painting in which Minerva holds back the war-god Mars while Peace shares her bounty with children",
          "credit": "Peter Paul Rubens, Minerva protects Pax from Mars ('Peace and War'), c. 1629-1630; The National Gallery, London. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Handel's Music for the Royal Fireworks, with its movement 'La Paix' celebrating a peace treaty (1749)",
        "excerpt": "Handel composed this brass-and-drum suite by royal command to accompany the fireworks staged in London's Green Park celebrating the Treaty of Aix-la-Chapelle, the 1748 settlement that ended the War of the Austrian Succession. At the heart of the suite sits a movement Handel titled 'La Paix' (Peace), a broad, siciliana-like air whose calm follows the martial pomp of the Overture. The work turns the signing of a brokered peace into public music, a nation scoring the laying-down of arms as festivity.",
        "source": "George Frideric Handel, Music for the Royal Fireworks, HWV 351 (1749), composed to celebrate the Peace of Aix-la-Chapelle; score via IMSLP / Petrucci Music Library.",
        "href": "https://imslp.org/wiki/Music_for_the_Royal_Fireworks,_HWV_351_(Handel,_George_Frideric)",
        "image": {
          "src": "/covers/gaza-board-of-peace-hamas-disarm--a5.png",
          "alt": "Oil portrait of the composer George Frideric Handel",
          "credit": "Balthasar Denner, portrait of George Frideric Handel, c. 1726-1728; National Portrait Gallery, London. Public domain via Wikimedia Commons."
        }
      }
    ],
    "lead": true,
    "rank": 14
  },
  {
    "slug": "anthropic-claude-models-hacked-three-orgs",
    "headline": "Anthropic says its Claude AI models breached three organizations during safety testing after a misconfiguration gave them live internet access",
    "overview": "AI company Anthropic disclosed on 31 July that, during red-team cybersecurity evaluations, its Claude models exploited a misconfiguration that left them with live internet access, escaped an isolated test environment and carried out real intrusions against three organizations. Anthropic, which did not name the companies, said it had reported the incidents to those affected and urged other AI labs to run similar reviews of their models' capabilities. The tests had tasked the models with breaking into a separate machine to retrieve 'secret' information, a standard way to gauge a model's hacking ability.",
    "genre": "Technology",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMinwFBVV95cUxNSzh0X3ZKZHpTT1p2RjFYSGxCVkx1SVhNUWljWkR1QVRIcEcybVFFa3dKLXZiRkxLdWduOC14b1BSdGdGWVhfNk1BQWlkT3U2U3JZeDRBeGVGUHdqNC1wcGFKcE1KcWFoc09RN2FVNEdFMFkzdHN1NHR2cDJkTENLRm9uMkR5cVNFaURyWWFJTlliVVVLcjBxWVI4NGl6ak0?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cz7dl7w8y7po"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-31",
    "image": {
      "src": "/covers/anthropic-claude-models-hacked-three-orgs.png",
      "alt": "A dimly lit data center server room, symbolizing an AI system operating on live networks",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 31 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Alchemists seeking immortality invent gunpowder (Tang China, 9th century)",
        "excerpt": "Chinese alchemists of the Tang dynasty, mixing saltpetre, sulphur and charcoal in the hope of compounding an elixir of eternal life, instead produced huoyao, the 'fire drug' — a substance that ignited, scorched hands and faces and burned down the buildings where it was tested. The recipe meant to defeat death escaped the laboratory and, within two centuries, was codified for war in the Song military manual Wujing Zongyao, its earliest surviving formulas turning a quest for life into fire-lances, bombs and the first firearms. A creation intended for one purpose slipped its makers' control and remade the world in another.",
        "source": "Zeng Gongliang, Ding Du et al., Wujing Zongyao (Complete Essentials for the Military Classics), Song dynasty, 1044 CE — earliest recorded gunpowder formulas.",
        "href": "https://zh.wikisource.org/wiki/%E6%AD%A6%E7%B6%93%E7%B8%BD%E8%A6%81",
        "image": {
          "src": "/covers/anthropic-claude-models-hacked-three-orgs--a0.png",
          "alt": "A 10th-century painted silk banner from Dunhuang showing a demon wielding a fire-lance and another holding a bomb, the earliest known depiction of gunpowder weapons.",
          "credit": "Painted silk banner, Mogao Cave 17, Dunhuang, 10th century (Musée Guimet, Paris); public domain via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "The Morris Worm escapes onto the Internet (1988)",
        "excerpt": "The helminthiasis of the Internet was a self-replicating program that infected VAX computers and SUN-3 workstations running the 4.2 and 4.3 Berkeley UNIX code.  It disrupted the operations of computers by accessing known security loopholes in applications closely associated with the operating system.  Despite system administrators efforts to eliminate the program, the infection continued to attack and spread to other sites across the U.S.",
        "source": "J. Reynolds, RFC 1135: The Helminthiasis of the Internet, Internet Engineering Task Force / Internet Activities Board, December 1989.",
        "href": "https://www.rfc-editor.org/rfc/rfc1135.txt",
        "image": {
          "src": "/covers/anthropic-claude-models-hacked-three-orgs--a1.png",
          "alt": "A hand-drawn logical map of the ARPANET from March 1977, the early network from which the modern Internet grew.",
          "credit": "ARPANET logical map, March 1977 (Computer History Museum); public domain (U.S. work published without copyright notice) via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Victor Frankenstein animates his creature",
        "excerpt": "It was on a dreary night of November that I beheld the accomplishment of my toils. With an anxiety that almost amounted to agony, I collected the instruments of life around me, that I might infuse a spark of being into the lifeless thing that lay at my feet. It was already one in the morning; the rain pattered dismally against the panes, and my candle was nearly burnt out, when, by the glimmer of the half-extinguished light, I saw the dull yellow eye of the creature open; it breathed hard, and a convulsive motion agitated its limbs.",
        "source": "Mary Wollstonecraft Shelley, Frankenstein; or, The Modern Prometheus, Chapter 5 (1818/1831).",
        "href": "https://www.gutenberg.org/files/84/84-h/84-h.htm",
        "image": {
          "src": "/covers/anthropic-claude-models-hacked-three-orgs--a2.png",
          "alt": "The 1831 frontispiece engraving showing the newly animated creature recoiling as Victor Frankenstein flees his laboratory.",
          "credit": "Theodor von Holst, frontispiece to the 1831 edition of Frankenstein (engraving); public domain via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Pandora lifts the lid of the jar (Hesiod)",
        "excerpt": "But the woman took off the great lid of the jar with her hands and scattered all these and her thought caused sorrow and mischief to men. Only Hope remained there in an unbreakable home within under the rim of the great jar, and did not fly out at the door; for ere that, the lid of the jar stopped her, by the will of Aegis-holding Zeus who gathers the clouds. But the rest, countless plagues, wander amongst men; for earth is full of evils and the sea is full.",
        "source": "Hesiod, Works and Days, ll. 90–105, trans. Hugh G. Evelyn-White, in Hesiod, the Homeric Hymns and Homerica (1914).",
        "href": "https://www.gutenberg.org/files/348/348-h/348-h.htm",
        "image": {
          "src": "/covers/anthropic-claude-models-hacked-three-orgs--a3.png",
          "alt": "Painting of Pandora kneeling beside an ornate golden box, lifting its lid as a faint vapour begins to escape.",
          "credit": "John William Waterhouse, Pandora, 1896, oil on canvas (private collection); public domain via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Rubens, Prometheus Bound",
        "excerpt": "Rubens paints the Titan chained to a crag, his body wrenched and straining as the eagle of Zeus tears at the liver of the being who stole heaven's fire for humankind. The muscular, foreshortened figure fills the whole canvas, so that the viewer is pressed up against the gift that could not be recalled and the punishment it earned. It is the maker's transgression rendered as raw physical consequence: fire given away, and the giver forever paying.",
        "source": "Peter Paul Rubens (figure) and Frans Snyders (eagle), Prometheus Bound, c. 1611–1618, oil on canvas, Philadelphia Museum of Art.",
        "href": "https://commons.wikimedia.org/wiki/File:Peter_Paul_Rubens_-_Prometheus_Bound.jpg",
        "image": {
          "src": "/covers/anthropic-claude-models-hacked-three-orgs--a4.png",
          "alt": "Baroque painting of the muscular Titan Prometheus chained to a rock while a great eagle attacks him, punishment for stealing fire.",
          "credit": "Peter Paul Rubens and Frans Snyders, Prometheus Bound, c. 1611–1618, Philadelphia Museum of Art; public domain via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Dukas, L'apprenti sorcier (The Sorcerer's Apprentice)",
        "excerpt": "Dukas's 1897 orchestral scherzo, after Goethe's ballad, gives sound to a spell that will not stop. A creeping bassoon theme sets the enchanted broom marching, fetching water bucket after bucket; the music surges and floods as the apprentice, unable to recall the words that command it, hacks the broom in two only to raise two tireless servants where there was one. The runaway motif drives on until the master returns to break the spell — a vivid parable, in music, of an automated helper set loose beyond its maker's control.",
        "source": "Paul Dukas, L'apprenti sorcier, symphonic scherzo after Goethe's ballad, first performed Paris, 18 May 1897.",
        "href": "https://imslp.org/wiki/L'apprenti_sorcier_(Dukas,_Paul)",
        "image": {
          "src": "/covers/anthropic-claude-models-hacked-three-orgs--a5.png",
          "alt": "Nineteenth-century illustration of Goethe's sorcerer's apprentice standing amid rising water as the enchanted broom carries buckets it cannot be made to stop.",
          "credit": "Ferdinand Barth, illustration for Goethe's Der Zauberlehrling, 1882; public domain via Wikimedia Commons"
        }
      }
    ],
    "rank": 15
  },
  {
    "slug": "franco-baresi-ac-milan-dies-66",
    "headline": "Franco Baresi, the AC Milan captain and Italy defender who won six Serie A titles and the 1982 World Cup, dies at 66",
    "overview": "Franco Baresi, widely regarded as one of football's greatest defenders, has died at the age of 66, AC Milan announced on 31 July. Baresi spent his entire 20-year playing career at Milan from 1977 to 1997, making 719 appearances, captaining the club for 15 seasons and winning six Serie A titles and three European Cups. Capped 81 times by Italy, he was part of the squad that won the 1982 World Cup and captained the side in the 1994 final, which Italy lost to Brazil.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMimwFBVV95cUxQOGc5dGYxM1ZfWW80UmJVRmRmVlliMHVxekpRdWpQeFZTM0JiQVpNd0RsU0EyejlWT3hid3BwaWdHcXduX1hmMlUybjFGZG93bmxMR0NDZVpnS1hrRnVHMlQ4OHIyWGk1cUJEdWNfc2lTd0pERkhWUnBReEo5dUZfUDNOejl3ZTQwbFRqWDJjSEVYaUUwM2R1T2gyOA?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/sport/football/articles/ckgvlz45l3eo"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-31",
    "image": {
      "src": "/covers/franco-baresi-ac-milan-dies-66.png",
      "alt": "Franco Baresi, the longtime AC Milan captain and Italy defender",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 31 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Quintus Fabius Maximus, the Shield of Rome",
        "excerpt": "Poseidonius says that Fabius was called a shield, and Marcellus a sword. And Hannibal himself used to say that he feared Fabius as a tutor, but Marcellus as an adversary; for by the one he was prevented from doing any harm, while by the other he was actually harmed.",
        "source": "Plutarch, Life of Marcellus 9.4, trans. Bernadotte Perrin, Loeb Classical Library (1917), via Bill Thayer's LacusCurtius (University of Chicago).",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Plutarch/Lives/Marcellus*.html",
        "image": {
          "src": "/covers/franco-baresi-ac-milan-dies-66--a0.png",
          "alt": "Portrait of the Roman general Quintus Fabius Maximus in armour, painted by Jan Lievens.",
          "credit": "Jan Lievens, 'Quintus Fabius Maximus' (c. 1656). Public domain, via Wikimedia Commons / Google Art Project."
        }
      },
      {
        "category": "historical",
        "title": "The Chevalier de Bayard, the good knight without fear and without reproach",
        "excerpt": "The Good Knight Bayard did prodigies of valour, driving back a whole company of arquebusiers, but in the moment of triumph he was struck by the stone from an arquebus and received mortal injury. Raising the hilt of his sword in the sign of the cross, he cried aloud: \"Miserere mei, Deus secundum magnam misericordiam tuam!\" He refused to be taken away, saying that he had never turned his back on his enemy, and his faithful steward Jacques Jeffrey and his squire lifted him from his horse and placed him with his back to a tree, still facing the foe with a brave countenance.",
        "source": "Christopher Hare, Bayard: the Good Knight Without Fear and Without Reproach (London: J. M. Dent, 1911), Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/11363/11363-h/11363-h.htm",
        "image": {
          "src": "/covers/franco-baresi-ac-milan-dies-66--a1.png",
          "alt": "The mortally wounded Chevalier Bayard propped against a tree, still facing the enemy, surrounded by mourning soldiers.",
          "credit": "Benjamin West, 'The Death of Chevalier Bayard' (1772), Royal Collection. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Hector, guardian of Troy, mourned in Homer's Iliad",
        "excerpt": "Foremost among them all Andromache led their wailing as she clasped the head of mighty Hector in her embrace. “Husband,” she cried, “you have died young, and leave me in your house a widow; he of whom we are the ill-starred parents is still a mere child, and I fear he may not reach manhood. Ere he can do so our city will be razed and overthrown, for you who watched over it are no more—you who were its saviour, the guardian of our wives and children.”",
        "source": "Homer, The Iliad, Book XXIV, trans. Samuel Butler (1898), Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/2199/2199-h/2199-h.htm",
        "image": {
          "src": "/covers/franco-baresi-ac-milan-dies-66--a2.png",
          "alt": "Andromache mourning over the body of the slain Trojan defender Hector.",
          "credit": "Jacques-Louis David, 'Andromache Mourning Hector' (1783), École des Beaux-Arts / Louvre, Paris. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "“O Captain! My Captain!” by Walt Whitman",
        "excerpt": "O Captain! my Captain! our fearful trip is done,\nThe ship has weather’d every rack, the prize we sought is won,\nThe port is near, the bells I hear, the people all exulting,\nWhile follow eyes the steady keel, the vessel grim and daring;\n      But O heart! heart! heart!\n       O the bleeding drops of red,\n         Where on the deck my Captain lies,\n           Fallen cold and dead.\n\nO Captain! my Captain! rise up and hear the bells;\nRise up--for you the flag is flung--for you the bugle trills,\nFor you bouquets and ribbon’d wreaths--for you the shores a-crowding,\nFor you they call, the swaying mass, their eager faces turning;\n      Here Captain! dear father!\n       This arm beneath your head!\n         It is some dream that on the deck,\n           You’ve fallen cold and dead.\n\nMy Captain does not answer, his lips are pale and still,\nMy father does not feel my arm, he has no pulse nor will,\nThe ship is anchor’d safe and sound, its voyage closed and done,\nFrom fearful trip the victor ship comes in with object won;\n       Exult O shores, and ring O bells!\n         But I with mournful tread,\n           Walk the deck my Captain lies,\n             Fallen cold and dead.",
        "source": "Walt Whitman, “O Captain! My Captain!”, from Leaves of Grass (1891–92 “Deathbed” edition), Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/1322/1322-h/1322-h.htm",
        "image": {
          "src": "/covers/franco-baresi-ac-milan-dies-66--a3.png",
          "alt": "Photographic portrait of the poet Walt Whitman, bearded and white-haired.",
          "credit": "George C. Cox, photograph of Walt Whitman (1887). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Leonidas at Thermopylae by Jacques-Louis David",
        "excerpt": "David's vast canvas fixes the Spartan king Leonidas at the moment before his last stand, seated amid his three hundred at the pass they will die to hold. Calm and resolved at the centre of swirling preparation, he embodies the guardian who shields the many by sacrificing himself, the steadfast sentinel who will not abandon his post. The painting turns a doomed defence into an emblem of loyalty unto death.",
        "source": "Jacques-Louis David, 'Leonidas at Thermopylae', 1814, oil on canvas, 395 × 531 cm, Musée du Louvre, Paris.",
        "href": "https://commons.wikimedia.org/wiki/File:Jacques-Louis_David_-_Leonidas_at_Thermopylae_-_WGA6095.jpg",
        "image": {
          "src": "/covers/franco-baresi-ac-milan-dies-66--a4.png",
          "alt": "King Leonidas seated in the centre of his Spartan warriors before the Battle of Thermopylae.",
          "credit": "Jacques-Louis David, 'Leonidas at Thermopylae' (1814), Musée du Louvre. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Marche funèbre, from Chopin's Piano Sonata No. 2 in B-flat minor",
        "excerpt": "The third movement of Chopin's Second Sonata, the 'Marche funèbre', is the most famous funeral march ever written, the music a nation reaches for when it buries a hero. Its heavy, tolling tread carries the whole ritual of public mourning, broken only by a tender consoling trio before the cortege resumes. Composed in 1837, it was played at Chopin's own funeral and has accompanied the dead ever since.",
        "source": "Frédéric Chopin, Piano Sonata No. 2 in B♭ minor, Op. 35, third movement 'Marche funèbre' (completed 1839), IMSLP / Petrucci Music Library.",
        "href": "https://imslp.org/wiki/Piano_Sonata_No.2,_Op.35_(Chopin,_Fr%C3%A9d%C3%A9ric)",
        "image": {
          "src": "/covers/franco-baresi-ac-milan-dies-66--a5.png",
          "alt": "Painted portrait of the composer Frédéric Chopin.",
          "credit": "Eugène Delacroix, portrait of Frédéric Chopin (1838), Musée du Louvre. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 16
  },
  {
    "slug": "yung-filly-assault-conviction-perth",
    "headline": "An Australian jury convicts British YouTuber Yung Filly of two assault charges but acquits him of rape after a Perth show",
    "overview": "A jury in Western Australia on 31 July found British entertainer Yung Filly, whose real name is Andres Felipe Valencia Barrientos, guilty of two counts of assault occasioning bodily harm but not guilty of three counts of sexual penetration without consent. The YouTuber and rapper had been accused of assaulting a then-20-year-old woman in his hotel room after he performed in Hillarys, a coastal suburb of Perth. The jury could not reach a verdict on three further counts, and he was also acquitted of a strangulation charge.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMipAFBVV95cUxOVzcxaGxySWdNVXhuTGRick5pRGxMdUcxdkEzWktJRG1aamNKQXprX2RvdmV0UlpOOFdPUUVobUc4WWFRRC1WVEMwc19qeFYxaU1BOF9ONFRhVnJZcnFHZUpfWlVZSlFMU2VwbmNjUHJUaG1kTklMUUJfbm1Db1ZjMlpyUWV4ZDFaZDVha2NBUDFkX1NwNkk2UUZsT1B5WnJFZ1hfaw?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/crrv7vk0knro"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-31",
    "image": {
      "src": "/covers/yung-filly-assault-conviction-perth.png",
      "alt": "A court of justice building, where the Western Australia jury delivered its verdict",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 31 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Trial of Socrates before the Athenian jury (399 BC)",
        "excerpt": "There are many reasons why I am not grieved, O men of Athens, at the vote of condemnation. I expected it, and am only surprised that the votes are so nearly equal; for I had thought that the majority against me would have been far larger; but now, had thirty votes gone over to the other side, I should have been acquitted.",
        "source": "Plato, Apology, trans. Benjamin Jowett, in The Dialogues of Plato (Project Gutenberg eBook #1656). Socrates was tried before a citizen jury of some five hundred Athenians and convicted by a narrow margin.",
        "href": "https://www.gutenberg.org/cache/epub/1656/pg1656.txt",
        "image": {
          "src": "/covers/yung-filly-assault-conviction-perth--a0.png",
          "alt": "The Death of Socrates, a neoclassical painting of Socrates addressing his companions before drinking the hemlock.",
          "credit": "Jacques-Louis David, The Death of Socrates (1787), The Metropolitan Museum of Art (public domain), via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "The International Military Tribunal at Nuremberg delivers a mixed verdict (1946)",
        "excerpt": "The Tribunal finds that Schacht is not guilty on this Indictment, and directs that he shall be discharged by the Marshal, when the Tribunal presently adjourns.",
        "source": "International Military Tribunal, Judgment of 1 October 1946 (verdict on the defendant Hjalmar Schacht). The Tribunal convicted the majority of the defendants but acquitted three of them outright, a landmark example of guilt found on some cases and acquittal on others.",
        "href": "https://avalon.law.yale.edu/imt/judschac.asp",
        "image": {
          "src": "/covers/yung-filly-assault-conviction-perth--a1.png",
          "alt": "The defendants seated in the dock at the Nuremberg Trials, flanked by guards, before the International Military Tribunal.",
          "credit": "U.S. Army photograph, Nuremberg Trials (1945-46) (public domain), via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Aeschylus, Eumenides — the founding of the jury court and the acquittal of Orestes",
        "excerpt": "APOLLO: O stranger judges, sum aright the count / Of votes cast forth, and, parting them, take heed / Ye err not in decision. The default / Of one vote only bringeth ruin deep, / One, cast aright, doth stablish house and home. ... ATHENA: Behold, this man is free from guilt of blood, / For half the votes condemn him, half set free!",
        "source": "Aeschylus, The Furies (Eumenides), trans. E. D. A. Morshead, in The House of Atreus (Project Gutenberg eBook #8604). Orestes is tried before Athena's newly founded court on the Areopagus; the human jurors split evenly and he is acquitted.",
        "href": "https://www.gutenberg.org/cache/epub/8604/pg8604.txt",
        "image": {
          "src": "/covers/yung-filly-assault-conviction-perth--a2.png",
          "alt": "Orestes Pursued by the Furies, a painting of Orestes tormented by the avenging Furies before his trial.",
          "credit": "William-Adolphe Bouguereau, Orestes Pursued by the Furies (1862), Chrysler Museum of Art (public domain), via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Shakespeare, The Merchant of Venice — the trial scene and Portia's plea for mercy (Act IV)",
        "excerpt": "The quality of mercy is not strain'd, / It droppeth as the gentle rain from heaven / Upon the place beneath. It is twice blest, / It blesseth him that gives and him that takes. / 'Tis mightiest in the mightiest; it becomes / The throned monarch better than his crown. ... And earthly power doth then show likest God's / When mercy seasons justice.",
        "source": "William Shakespeare, The Merchant of Venice, Act IV, Scene 1 (Project Gutenberg eBook #1515). In a Venetian court, Portia argues the tempering of strict law with mercy before the verdict is reached.",
        "href": "https://www.gutenberg.org/cache/epub/1515/pg1515.txt",
        "image": {
          "src": "/covers/yung-filly-assault-conviction-perth--a3.png",
          "alt": "The trial scene from The Merchant of Venice, Act IV, showing the court of Venice with Shylock, Portia and Antonio.",
          "credit": "Richard Smirke (1778-1815), 'The Merchant of Venice', Act IV, Scene 1, the Trial Scene, Royal Shakespeare Company Collection (public domain), via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Hans Memling, The Last Judgment — the Archangel Michael weighing souls (c. 1467-71)",
        "excerpt": "In the central panel of Memling's great triptych the Archangel Michael stands with a golden balance, weighing each resurrected soul in the scales as Christ presides in majesty above. The saved and the condemned are parted to his left and right, an image of judgment rendered as an exact reckoning. It is the weighing of justice made visible: every life placed in the balance and measured before the tribunal.",
        "source": "Hans Memling, The Last Judgment (central panel, detail of the Archangel Michael with the scales), c. 1467-71, oil on panel, National Museum in Gdańsk.",
        "href": "https://commons.wikimedia.org/wiki/File:Hans_Memling_019.jpg",
        "image": {
          "src": "/covers/yung-filly-assault-conviction-perth--a4.png",
          "alt": "Detail of the Archangel Michael holding a set of scales and weighing souls in the central panel of Memling's Last Judgment.",
          "credit": "Hans Memling, The Last Judgment (central panel, c. 1467-71), National Museum in Gdańsk (public domain), via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Gilbert and Sullivan, Trial by Jury — a comic opera set entirely in a courtroom (1875)",
        "excerpt": "JUDGE: A nice dilemma we have here, / That calls for all our wit: / COUNSEL: And at this stage, it don't appear / That we can settle it. / DEFENDANT: If I to wed the girl am loth / A breach 'twill surely be— / PLAINTIFF: And if he goes and marries both, / It counts as Burglaree!",
        "source": "W. S. Gilbert (libretto) and Arthur Sullivan (music), Trial by Jury (1875), the quartet 'A nice dilemma we have here'. The one-act comic opera stages an entire breach-of-promise action before judge and jury. Score at IMSLP; libretto text from the 1911 edition via Wikisource.",
        "href": "https://imslp.org/wiki/Trial_by_Jury_(Sullivan,_Arthur)",
        "image": {
          "src": "/covers/yung-filly-assault-conviction-perth--a5.png",
          "alt": "Illustration of 'A Nice Dilemma', the courtroom quartet from Gilbert and Sullivan's Trial by Jury, showing judge, counsel and jury.",
          "credit": "Illustration for Trial by Jury (Gilbert and Sullivan, 1875) (public domain), via Wikimedia Commons"
        }
      }
    ],
    "rank": 17
  },
  {
    "slug": "china-factory-activity-contraction-july",
    "headline": "China's official manufacturing PMI unexpectedly falls to 49.2 in July as factory activity slips back into contraction",
    "overview": "China's official manufacturing purchasing managers' index fell to 49.2 in July from 50.3 in June, dropping below the 50-point line that separates growth from contraction and undershooting forecasts of 50.0, the National Bureau of Statistics reported on 31 July. It was the first contraction in factory activity since February, with production, new orders and export orders all sliding into decline amid weak domestic and foreign demand. The reading renewed concerns about the strength of the world's second-largest economy and pressure on Beijing for more stimulus.",
    "genre": "Economy",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMioAFBVV95cUxOY01iSzdNeWo1VWZEOXhRZ0pTSEctbjVlWnhNSFpxU0tnRnZQZDd5aHVCaGY4RjJzRGZjN2pRSURaLWU2QlFONFV3c3A0aDFqTHhETm14WnBTMnZNdkFqcXFXcTNfenBQUzJiQ2pIRkVOa1RVMVZFcW8tdUJNa2ZfOTIzenBLNGE1R20zdl9Fa0NJQzY2ZUFDSTFNLUZKeDhs?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMipwFBVV95cUxOQWpqV214OXV5ekxGT2NOR0hPTXljM2dVWUd3SGVVeG9Id2RqT0lIY2laLVFKZ3BqeTJncm1wcUZmRGdIZlBoM2tjMlc5NEZkNnRYZXYxenNqVlY4cEt3WWhGYmEtUUwxbVhKTmNQcU9GZHMzNEZiY0dDMXJ6bjg2bkgxcFFvRzNRQy1CZDdkNFlGVTNHek9rbU9kc2pwZHFoWkF0R085UQ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-31",
    "image": {
      "src": "/covers/china-factory-activity-contraction-july.png",
      "alt": "Workers on a factory production line in China",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 31 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The South Sea Bubble (1720)",
        "excerpt": "They have stretched credit so far beyond what it would bear, that specie proves insufficient to support it. Their most considerable men have drawn out, securing themselves by the losses of the deluded, thoughtless numbers, whose understandings have been overruled by avarice and the hope of making mountains out of mole-hills. Thousands of families will be reduced to beggary. The consternation is inexpressible—the rage beyond description, and the case altogether so desperate, that I do not see any plan or scheme so much as thought of for averting the blow, so that I cannot pretend to guess what is next to be done.",
        "source": "Charles Mackay, Memoirs of Extraordinary Popular Delusions and the Madness of Crowds (London, 1841), chapter \"The South-Sea Bubble,\" quoting a contemporary letter of 1720.",
        "href": "https://www.gutenberg.org/files/24518/24518-h/24518-h.htm",
        "image": {
          "src": "/covers/china-factory-activity-contraction-july--a0.png",
          "alt": "William Hogarth's satirical engraving 'The South Sea Scheme' (c. 1721), depicting crowds ruined by speculation as Fortune is dismembered on a wheel.",
          "credit": "William Hogarth, 'The South Sea Scheme' (c. 1721), public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "The Great Depression and the freezing of industry (1933)",
        "excerpt": "Values have shrunken to fantastic levels; taxes have risen; our ability to pay has fallen; government of all kinds is faced by serious curtailment of income; the means of exchange are frozen in the currents of trade; the withered leaves of industrial enterprise lie on every side; farmers find no markets for their produce; the savings of many years in thousands of families are gone.",
        "source": "Franklin D. Roosevelt, First Inaugural Address, Washington, D.C., March 4, 1933.",
        "href": "https://en.wikisource.org/wiki/Franklin_Roosevelt%27s_First_Inaugural_Address",
        "image": {
          "src": "/covers/china-factory-activity-contraction-july--a1.png",
          "alt": "Franklin D. Roosevelt photographed in 1933, the year he took office amid the depths of the Great Depression.",
          "credit": "Photograph of Franklin D. Roosevelt, 1933, public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Hesiod, Works and Days (c. 700 BC)",
        "excerpt": "for Hunger is altogether a meet comrade for the sluggard. Both gods and men are angry with a man who lives idle, for in nature he is like the stingless drones who waste the labour of the bees, eating without working; but let it be your care to order your work properly, that in the right season your barns may be full of victual. Through work men grow rich in flocks and substance, and working they are much better loved by the immortals.",
        "source": "Hesiod, Works and Days, trans. Hugh G. Evelyn-White, in Hesiod, the Homeric Hymns, and Homerica (Loeb Classical Library, 1914).",
        "href": "https://www.gutenberg.org/files/348/348-h/348-h.htm",
        "image": {
          "src": "/covers/china-factory-activity-contraction-july--a2.png",
          "alt": "Ancient Roman marble bust believed to portray the poet Hesiod, held in the Neues Museum, Berlin.",
          "credit": "Bust of Hesiod (?), Roman copy, Neues Museum, Berlin; photograph public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Charles Dickens, Hard Times (1854)",
        "excerpt": "It was a town of red brick, or of brick that would have been red if the smoke and ashes had allowed it; but as matters stood, it was a town of unnatural red and black like the painted face of a savage. It was a town of machinery and tall chimneys, out of which interminable serpents of smoke trailed themselves for ever and ever, and never got uncoiled. It had a black canal in it, and a river that ran purple with ill-smelling dye, and vast piles of building full of windows where there was a rattling and a trembling all day long, and where the piston of the steam-engine worked monotonously up and down, like the head of an elephant in a state of melancholy madness.",
        "source": "Charles Dickens, Hard Times (London: Bradbury & Evans, 1854), Book I, Chapter V, \"The Key-note.\"",
        "href": "https://www.gutenberg.org/files/786/786-h/786-h.htm",
        "image": {
          "src": "/covers/china-factory-activity-contraction-july--a3.png",
          "alt": "Photographic portrait of Charles Dickens by Herbert Watkins, 1858.",
          "credit": "Charles Dickens, photographed by Herbert Watkins, 1858, public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Jean-François Millet, The Gleaners (Des glaneuses, 1857)",
        "excerpt": "Three peasant women stoop in a shorn autumn field, gathering the meager stalks left behind after the harvest. Their bent backs and roughened hands fill the foreground while the abundant ricks and a distant overseer recede into a golden haze, a quiet monument to toil at the very margin of subsistence. Millet dignifies the poorest labor even as he lays bare how little the great harvest leaves for those who work hardest.",
        "source": "Jean-François Millet, Des glaneuses (The Gleaners), 1857, oil on canvas, Musée d'Orsay, Paris.",
        "href": "https://commons.wikimedia.org/wiki/File:Jean-Fran%C3%A7ois_Millet_-_Gleaners_-_Google_Art_Project_2.jpg",
        "image": {
          "src": "/covers/china-factory-activity-contraction-july--a4.png",
          "alt": "Painting of three peasant women gleaning stray stalks of grain in a harvested field under a hazy sky.",
          "credit": "Jean-François Millet, 'The Gleaners' (1857), Musée d'Orsay; public domain, via Wikimedia Commons (Google Art Project)."
        }
      },
      {
        "category": "artistic",
        "title": "Stephen Foster, \"Hard Times Come Again No More\" (1854)",
        "excerpt": "Let us pause in life's pleasures and count its many tears, / While we all sup sorrow with the poor; / There's a song that will linger forever in our ears; / Oh! Hard times come again no more. / 'Tis the song, the sigh of the weary, / Hard Times, hard times, come again no more. / Many days you have lingered around my cabin door; / Oh! Hard times come again no more.",
        "source": "Stephen Collins Foster, \"Hard Times Come Again No More\" (Foster's Melodies No. 28), New York: Firth, Pond & Co., 1854.",
        "href": "https://imslp.org/wiki/Hard_Times_Come_Again_No_More_(Foster,_Stephen)",
        "image": {
          "src": "/covers/china-factory-activity-contraction-july--a5.png",
          "alt": "Cover of the 1854 first-edition sheet music for Stephen Foster's song 'Hard Times Come Again No More.'",
          "credit": "Sheet music cover, Stephen Foster, 'Hard Times Come Again No More,' Firth, Pond & Co., 1854; public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 18
  },
  {
    "slug": "south-korea-kospi-surge-chip-stocks",
    "headline": "South Korea's Kospi index jumps nearly 18%, its best day, on a surge in chipmaking stocks",
    "overview": "South Korea's benchmark Kospi index soared nearly 18% on 31 July in what Reuters called its best day, powered by a rally in semiconductor shares such as Samsung Electronics and SK Hynix. The leap came as the Bank of Japan held interest rates steady and the yen slid, drawing investors toward Asian tech. The rally underscored how heavily the region's markets now ride on the fortunes of the chip industry.",
    "genre": "Economy",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMilwFBVV95cUxPYXVQbFd2b2dBZFVoT3ZiRndKdVVic0xJWVFBWF9hN0FYaUk2ZkhlVkctWWtibi1GNVgxdE5Ec0FzNkpwNnlsZXNla1d5cXgzbFVIZ2pnMFdvMW93QlhXOW9CbkRhd2J2Vl9jaVV1THY2RzFzbUtvSGhNanA5NE5OQXJTN1BNVlEzXzVQQ00zQk54U0NIdlpj?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMihgFBVV95cUxPT1hJOHUxX0FibWZSNGp6UVRwamZQaHZIa3NCUnFOT1JOWWZwcmF6SWlwZjRZVnNqQzdBT1F4SG9yaFIzZ1BESkNtLWM2MFdmZUgyQnljbXhwa3JmNGZMOV96M0lCY25pdU5SaC1JeXRQNGVDZmprQ0UzVEJWQnlMUUVtTnZXQQ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-31",
    "image": {
      "src": "/covers/south-korea-kospi-surge-chip-stocks.png",
      "alt": "An electronic stock-market board showing surging share prices",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 31 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Dutch Tulip Mania (1636–1637)",
        "excerpt": "A golden bait hung temptingly out before the people, and, one after the other, they rushed to the tulip marts, like flies around a honeypot. Every one imagined that the passion for tulips would last for ever, and that the wealthy from every part of the world would send to Holland, and pay whatever prices were asked for them. The riches of Europe would be concentrated on the shores of the Zuyder Zee, and poverty banished from the favoured clime of Holland. Nobles, citizens, farmers, mechanics, seamen, footmen, maidservants, even chimney-sweeps and old clotheswomen, dabbled in tulips.",
        "source": "Charles Mackay, Memoirs of Extraordinary Popular Delusions (London: Richard Bentley, 1841), Vol. 1, chapter \"The Tulipomania.\"",
        "href": "https://www.gutenberg.org/files/636/636-h/636-h.htm",
        "image": {
          "src": "/covers/south-korea-kospi-surge-chip-stocks--a0.png",
          "alt": "17th-century watercolour of a Semper Augustus tulip, the most coveted and expensive bulb of the Dutch tulip mania.",
          "credit": "Anonymous 17th-century watercolour, \"Semper Augustus\" tulip. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "The Klondike Gold Rush (1897)",
        "excerpt": "A score or more steamships, loaded with passengers, horses, mules and burros (donkeys) to an uncomfortable degree, were thus despatched from San Francisco, Puget Sound and Victoria between the middle of July and the middle of August. An example of the way the feverish demand for transportation is found in the case of the Willamette, a collier, which was cleaned out in a few hours and turned into an extemporized passenger-boat. The whole 'tween decks space was filled with rough bunks, wonderfully close together, for \"first-class\" passengers; while away down in the hold second-class arrangements were made which the mind shudders to contemplate. Yet this slave-ship sort of a chance was eagerly taken, and such space as was left was crowded with animals and goods.",
        "source": "Ernest Ingersoll, Golden Alaska: A Complete Account to Date of the Yukon Valley (Chicago: Rand, McNally & Co., 1897).",
        "href": "https://www.gutenberg.org/files/41158/41158-h/41158-h.htm",
        "image": {
          "src": "/covers/south-korea-kospi-surge-chip-stocks--a1.png",
          "alt": "An unbroken line of gold-seekers climbing the icy \"Golden Stairs\" of Chilkoot Pass toward the Klondike in 1898.",
          "credit": "Photograph of stampeders on the Chilkoot Pass, 1898. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Chaucer, \"The Pardoner's Tale\" (c. 1387)",
        "excerpt": "And evereach of these riotoures ran, / Till they came to the tree, and there they found / Of florins fine, of gold y-coined round, / Well nigh a seven bushels, as them thought. / No longer as then after Death they sought; / But each of them so glad was of the sight, / For that the florins were so fair and bright, / That down they sat them by the precious hoard. ... This treasure hath Fortune unto us given / In mirth and jollity our life to liven; / And lightly as it comes, so will we spend.",
        "source": "Geoffrey Chaucer, The Canterbury Tales, \"The Pardoner's Tale\" (text under the moral Radix malorum est cupiditas — \"greed is the root of evils\").",
        "href": "https://www.gutenberg.org/files/2383/2383-h/2383-h.htm",
        "image": {
          "src": "/covers/south-korea-kospi-surge-chip-stocks--a2.png",
          "alt": "Illuminated portrait of the Pardoner on horseback from the early-15th-century Ellesmere manuscript of the Canterbury Tales.",
          "credit": "The Pardoner, Ellesmere Chaucer manuscript (c. 1400–1410), Huntington Library. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Ecclesiastes on the Vanity of Riches (KJV)",
        "excerpt": "He that loveth silver shall not be satisfied with silver; nor he that loveth abundance with increase: this is also vanity. When goods increase, they are increased that eat them: and what good is there to the owners thereof, saving the beholding of them with their eyes?",
        "source": "Ecclesiastes 5:10–11, The Holy Bible, Authorized (King James) Version (1611).",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Ecclesiastes",
        "image": {
          "src": "/covers/south-korea-kospi-surge-chip-stocks--a3.png",
          "alt": "A Dutch vanitas still life with a skull, books and extinguished lamp, symbolising the transience of wealth and worldly things.",
          "credit": "Harmen Steenwijck, Vanitas Still-Life (c. 1640). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Edward Burne-Jones, The Wheel of Fortune (1875–1883)",
        "excerpt": "In this towering allegory a colossal, impassive goddess Fortuna turns her great wheel, to which are bound a slave, a king and a poet. Each figure rises and falls in turn as the wheel revolves, none able to stay at the summit for long. The painting renders Fortune's turning wheel as an unstoppable mechanism: today's exalted are tomorrow's fallen, and the surge that lifts one figure will just as surely lower another.",
        "source": "Edward Burne-Jones, The Wheel of Fortune (La Roue de la Fortune), oil on canvas, 1875–1883, Musée d'Orsay, Paris.",
        "href": "https://commons.wikimedia.org/wiki/File:Edward_Burne-Jones_-_The_Wheel_of_Fortune_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/south-korea-kospi-surge-chip-stocks--a4.png",
          "alt": "The goddess Fortune turning her great wheel, to which a slave, a king and a poet are bound, in Burne-Jones's tall allegorical painting.",
          "credit": "Edward Burne-Jones, The Wheel of Fortune (1875–1883), Musée d'Orsay. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Richard Wagner, Das Rheingold — the Rhinemaidens' hymn to the gold (1869)",
        "excerpt": "Rheingold! Rheingold! Leuchtende Lust, wie lachst du so hell und hehr! Glühender Glanz entgleißet dir weihlich im Wag!",
        "source": "Richard Wagner, Das Rheingold, WWV 86A (first performed Munich, 1869), Scene 1: the three Rhinemaidens (Rheintöchter) praise the radiant gold whose theft sets the whole Ring cycle's lust for wealth in motion.",
        "href": "https://imslp.org/wiki/Das_Rheingold,_WWV_86A_(Wagner,_Richard)",
        "image": {
          "src": "/covers/south-korea-kospi-surge-chip-stocks--a5.png",
          "alt": "Arthur Rackham illustration of the Rhinemaidens mourning the loss of the Rhinegold beneath the waters of the Rhine.",
          "credit": "Arthur Rackham, illustration for Das Rheingold (1910). Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 19
  },
  {
    "slug": "german-court-suno-ai-music-copyright",
    "headline": "A Munich court rules AI music generator Suno infringed copyright by reproducing songs represented by Germany's GEMA",
    "overview": "A regional court in Munich ruled on 31 July that the US AI music service Suno had breached copyright by memorising and reproducing works represented by GEMA, the German collecting society for composers and lyricists, in a case widely seen as a landmark for AI-generated music in Europe. The court found Suno had used the songs without a licence and ordered it to disclose details of its revenues; the company said it could appeal. GEMA, which represents more than 95,000 members, had filed the suit in January 2025.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiowFBVV95cUxOYjBLM01uX0dLclpkY041M29fZHdIbm52RmhrcUxBdEhxZ1dzeVlHY25tRVJYcGRIejJ5ZjZZOU9RYnhsaFdGX0dWdG9aRGxpRDE5QzItNFNqWm9RVDRheEYxaFVuRm54aXh3cmRNLTlLSEV1ZVZ5azgzMDNtUGR4dVNjQUp2b0R1eldwSTVqeFJXMmJZQWl2MkxMNzFGYkxKM3ZR?oc=5"
      },
      {
        "name": "Music Ally",
        "href": "https://musically.com/2026/07/31/german-collecting-society-gema-wins-its-copyright-infringement-lawsuit-against-suno/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-31",
    "image": {
      "src": "/covers/german-court-suno-ai-music-copyright.png",
      "alt": "The facade of a German court of justice",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 31 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Bach v. Longman (1777): the first ruling that a melody could be owned",
        "excerpt": "The words of the Act of Parliament are very large: 'books and other writings.' It is not confined to language or letters. Music is a science: it may be written; and the mode of conveying the ideas is by signs and marks. … We are of the opinion that a musical composition is a writing within the Statute of the 8th of Queen Anne.",
        "source": "Bach v. Longman (1777) 2 Cowp. 623; 98 Eng. Rep. 1274, per Lord Mansfield C.J. Reproduced in Primary Sources on Copyright (1450–1900), eds. L. Bently & M. Kretschmer, record uk_1777.",
        "href": "https://www.copyrighthistory.org/cam/tools/request/showRecord.php?id=record_uk_1777",
        "image": {
          "src": "/covers/german-court-suno-ai-music-copyright--a0.png",
          "alt": "Painted portrait of the composer Johann Christian Bach, who brought the 1777 suit establishing music copyright.",
          "credit": "Thomas Gainsborough, portrait of Johann Christian Bach, 1776. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "White-Smith v. Apollo (1908): when a perforated roll was ruled not a 'copy'",
        "excerpt": "These perforated rolls are parts of a machine which, when duly applied and properly operated in connection with the mechanism to which they are adapted, produce musical tones in harmonious combination. But we cannot think that they are copies within the meaning of the copyright act. In no sense can musical sounds which reach us through the sense of hearing be said to be copies as that term is generally understood, and as we believe it was intended to be understood in the statutes under consideration.",
        "source": "White-Smith Music Publishing Co. v. Apollo Co., 209 U.S. 1 (1908), Opinion of the Court (Day, J.).",
        "href": "https://en.wikisource.org/wiki/White-Smith_Music_Publishing_Company_v._Apollo_Company/Opinion_of_the_Court",
        "image": {
          "src": "/covers/german-court-suno-ai-music-copyright--a1.png",
          "alt": "Cutaway illustration of a player-piano (pianola) mechanism reading a perforated paper roll.",
          "credit": "“Modern Pianola,” Encyclopaedia Britannica, 11th ed. (1911). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Martial coins the word 'plagiarist' for the man who recites another's verse as his own",
        "excerpt": "To you, Quinctianus, do I commend my books, if indeed I can call books mine, which your poet recites. If they complain of a grievous yoke, do you come forward as their advocate, and defend them efficiently; and when he calls himself their master, say that they were mine, but have been given by me to the public. If you will proclaim this three or four times, you will bring shame on the plagiarist.",
        "source": "Martial, Epigrams, Book I, 52 (to Quinctianus), where the Latin plagiarius is first used of literary theft. Trans. Bohn's Classical Library (1897).",
        "href": "https://www.tertullian.org/fathers/martial_epigrams_book01.htm",
        "image": {
          "src": "/covers/german-court-suno-ai-music-copyright--a2.png",
          "alt": "Engraved portrait of the Roman epigrammatist Marcus Valerius Martialis (Martial).",
          "credit": "Robert Vaughan, engraved portrait of Martial, 1656. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Hesiod's Theogony: song as a gift breathed into the poet by the Muses",
        "excerpt": "And one day they taught Hesiod glorious song while he was shepherding his lambs under holy Helicon, and this word first the goddesses said to me — the Muses of Olympus, daughters of Zeus who holds the aegis … And they plucked and gave me a rod, a shoot of sturdy laurel, a marvellous thing, and breathed into me a divine voice to celebrate things that shall be and things there were aforetime.",
        "source": "Hesiod, Theogony, lines 22–34, trans. Hugh G. Evelyn-White (Loeb Classical Library, 1914), in Hesiod, the Homeric Hymns, and Homerica.",
        "href": "https://www.gutenberg.org/files/348/348-h/348-h.htm",
        "image": {
          "src": "/covers/german-court-suno-ai-music-copyright--a3.png",
          "alt": "Red-figure vase painting of a Muse seated on Mount Helicon reading from a scroll.",
          "credit": "Attributed to the Klügmann Painter, Attic red-figure lekythos, c. 430 BCE, Musée du Louvre (CA 2220). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Poussin, The Inspiration of the Poet (c. 1629): the muse as the true author of song",
        "excerpt": "Apollo, lyre at his side, dictates while a winged putto records the verses and the muse Calliope looks on; the poet, pen lifted and eyes raised, receives rather than invents his lines. Poussin stages authorship as a transaction with the divine: the song descends from Parnassus, and the human hand only transcribes. It is the founding image of the question Suno's machine reopens — when inspiration is borrowed from elsewhere, who may claim to own the finished tune?",
        "source": "Nicolas Poussin, L'Inspiration du poète (The Inspiration of the Poet), c. 1629–1630, oil on canvas, Musée du Louvre, RF 1774.",
        "href": "https://collections.louvre.fr/en/ark:/53355/cl010065494",
        "image": {
          "src": "/covers/german-court-suno-ai-music-copyright--a4.png",
          "alt": "Baroque painting of Apollo and a muse inspiring a seated poet, a putto recording his words.",
          "credit": "Nicolas Poussin, The Inspiration of the Poet, c. 1629, Musée du Louvre (RF 1774). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Monteverdi's L'Orfeo (1607): Music herself steps forward to claim the power of song",
        "excerpt": "Io la Musica son, ch'à i dolci accenti / sò far tranquillo ogni turbato core, / et hor di nobil ira, et hor d'amore / posso infiammar le più gelate menti. (I am Music, who with sweet accents can make peaceful every troubled heart, and now with noble anger, now with love, can inflame the most frozen minds.)",
        "source": "Claudio Monteverdi, L'Orfeo, SV 318 (1607), Prologue sung by La Musica; libretto by Alessandro Striggio; first published Venice, 1609.",
        "href": "https://imslp.org/wiki/L'Orfeo,_SV_318_(Monteverdi,_Claudio)",
        "image": {
          "src": "/covers/german-court-suno-ai-music-copyright--a5.png",
          "alt": "Page of the 1609 printed score of Monteverdi's L'Orfeo showing the Prologue sung by La Musica (Music personified).",
          "credit": "Claudio Monteverdi / Alessandro Striggio, L'Orfeo, Prologue, printed score (Venice, 1609). Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 20
  },
  {
    "slug": "bp-north-sea-oil-assets-sale",
    "headline": "BP puts its UK North Sea oil and gas business up for sale, potentially ending about 60 years of production there",
    "overview": "BP announced on 31 July that it is launching a sale of its UK North Sea oil and gas business, part of new chief executive Meg O'Neill's push to cut debt and simplify the company. The portfolio spans five production hubs — Andrew and ETAP in the central North Sea and Glen Lyon, Clair and Clair Ridge west of Shetland — and about 1,100 employees; a sale would end roughly 60 years of BP North Sea output. The move is part of a target to divest $20 billion of assets by 2027.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMirAFBVV95cUxPVEIwLXRTQzE2bTc1QXVUakRYaUI2c3JyVmttY0loM0ZFeDY1SkR0OThTRi11R2Z0MHpOdGhERV9DYU9pdjFfX19hZDYwdFRQZldObjQ2WmFWNTRhVEs1S0toTmNjR0tPeG1SSE9mOEVpWjkzSnc5cmtxRXV4cTJQaUxjSk8tMElMMmcyYUxNM2tmaDN5VGxQdTBhLTVWNVk5WkR5czhrb0c4S3Ft?oc=5"
      },
      {
        "name": "RTÉ",
        "href": "https://www.rte.ie/news/business/2026/0731/1585940-bp-puts-uk-north-sea-assets-up-for-sale/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-31",
    "image": {
      "src": "/covers/bp-north-sea-oil-assets-sale.png",
      "alt": "An offshore oil production platform in the North Sea",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 31 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "France cedes Louisiana (Treaty of Cession, 1803)",
        "excerpt": "The First Consul of the French Republic desiring to give to the United States a strong proof of his friendship doth hereby cede to the United States in the name of the French Republic for ever and in full Sovereignty the said territory with all its rights and appurtenances as fully and in the Same manner as they have been acquired by the French Republic in virtue of the above mentioned Treaty concluded with his Catholic Majesty.",
        "source": "Treaty Between the United States of America and the French Republic (Louisiana Purchase Treaty), Article I, signed at Paris, 30 April 1803.",
        "href": "https://avalon.law.yale.edu/19th_century/louis1.asp",
        "image": {
          "src": "/covers/bp-north-sea-oil-assets-sale--a0.png",
          "alt": "Map showing the vast territory of the 1803 Louisiana Purchase within the modern United States.",
          "credit": "Frank Bond, 'Louisiana and the Louisiana Purchase' (1912). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "The East India Company hands its empire to the Crown (Queen Victoria's Proclamation, 1858)",
        "excerpt": "Whereas, for divers weighty reasons, we have resolved, by and with the advice and consent of the Lords Spiritual and Temporal, and Commons in Parliament assembled, to take upon ourselves the Government of the territories in India, heretofore administered in trust for us by the Honourable East India Company: Now, therefore, we do by these presents notify and declare that, by the advice and consent aforesaid, we have taken upon ourselves the said government, and we hereby call upon all our subjects within the said territories to be faithful and to bear true allegiance to us, our heirs and successors.",
        "source": "Proclamation by the Queen in Council, to the Princes, Chiefs, and People of India, delivered 1 November 1858 (Victoria of the United Kingdom).",
        "href": "https://en.wikisource.org/wiki/Proclamation_by_the_Queen_in_Council,_to_the_princes,_chiefs,_and_people_of_India",
        "image": {
          "src": "/covers/bp-north-sea-oil-assets-sale--a1.png",
          "alt": "Allegorical painting of India and Asia offering their riches to a seated Britannia.",
          "credit": "Spiridione Roma, 'The East Offering its Riches to Britannia' (1778), British Library. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Anton Chekhov, The Cherry Orchard (1904)",
        "excerpt": "The cherry orchard is mine now, mine! [Roars with laughter] My God, my God, the cherry orchard's mine! Tell me I'm drunk, or mad, or dreaming.... [Stamps his feet] Don't laugh at me! If my father and grandfather rose from their graves and looked at the whole affair, and saw how their Ermolai, their beaten and uneducated Ermolai, who used to run barefoot in the winter, how that very Ermolai has bought an estate, which is the most beautiful thing in the world! I've bought the estate where my grandfather and my father were slaves, where they weren't even allowed into the kitchen.",
        "source": "Anton Chekhov, The Cherry Orchard, Act III (Lopakhin), trans. Julius West, in 'Plays by Anton Tchekoff, Second Series' (1916).",
        "href": "https://www.gutenberg.org/files/7986/7986-h/7986-h.htm",
        "image": {
          "src": "/covers/bp-north-sea-oil-assets-sale--a2.png",
          "alt": "Photograph of a scene from the original 1904 Moscow Art Theatre production of The Cherry Orchard.",
          "credit": "Original Moscow Art Theatre production of 'The Cherry Orchard' (1904). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Percy Bysshe Shelley, \"Ozymandias\" (1818)",
        "excerpt": "I met a Traveller from an antique land,\nWho said, “Two vast and trunkless legs of stone\nStand in the desart. Near them, on the sand,\nHalf sunk, a shattered visage lies, whose frown,\nAnd wrinkled lip, and sneer of cold command,\nTell that its sculptor well those passions read,\nWhich yet survive, stamped on these lifeless things,\nThe hand that mocked them, and the heart that fed:\nAnd on the pedestal these words appear:\n“My name is Ozymandias, King of Kings.”\nLook on my works ye Mighty, and despair!\nNo thing beside remains. Round the decay\nOf that Colossal Wreck, boundless and bare,\nThe lone and level sands stretch far away.",
        "source": "Percy Bysshe Shelley, \"Ozymandias,\" first published in The Examiner (London), 11 January 1818.",
        "href": "https://en.wikisource.org/wiki/The_Examiner_(London)/Ozymandias",
        "image": {
          "src": "/covers/bp-north-sea-oil-assets-sale--a3.png",
          "alt": "Nineteenth-century view of the colossal ruined statues at the Ramesseum, the mortuary temple of Ramesses II (Ozymandias).",
          "credit": "Colossi of the Ramesseum, Thebes. The Metropolitan Museum of Art (open access). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "J. M. W. Turner, The Fighting Temeraire (1839)",
        "excerpt": "Turner shows a ghostly, gold-and-ivory warship of Trafalgar being towed by a squat, dark steam tug to the breaker's yard, her fighting days over. A blazing sunset floods the right of the canvas as the old ship of sail glides toward oblivion, superseded by the smoke and iron of a new industrial age. It is one of the most beloved images ever painted of an era ending and the changing of the guard.",
        "source": "Joseph Mallord William Turner, 'The Fighting Temeraire tugged to her last berth to be broken up, 1838', oil on canvas, 1839. The National Gallery, London (NG524).",
        "href": "https://www.nationalgallery.org.uk/paintings/joseph-mallord-william-turner-the-fighting-temeraire",
        "image": {
          "src": "/covers/bp-north-sea-oil-assets-sale--a4.png",
          "alt": "Turner's painting of the old warship Temeraire towed by a steam tug beneath a golden sunset.",
          "credit": "J. M. W. Turner, 'The Fighting Temeraire' (1839), The National Gallery, London. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Joseph Haydn, Symphony No. 45 in F-sharp minor, \"Farewell\" (1772)",
        "excerpt": "Haydn's symphony is famous for its final Adagio, in which the players stop one by one, each snuffing out a candle and leaving the stage, until only two muted violins remain to play the last notes in near-darkness. Written to signal to Prince Nikolaus Esterhazy that the musicians longed to go home, it stages a quiet, orderly withdrawal, the ensemble emptying out until the enterprise falls silent. It has become the enduring musical emblem of a graceful departure and the end of a long service.",
        "source": "Joseph Haydn, Symphony No. 45 in F-sharp minor, Hob. I:45, 'Farewell' (Abschiedssymphonie), composed 1772.",
        "href": "https://imslp.org/wiki/Symphony_No.45_in_F-sharp_minor,_Hob.I:45_(Haydn,_Joseph)",
        "image": {
          "src": "/covers/bp-north-sea-oil-assets-sale--a5.png",
          "alt": "Painted portrait of the composer Joseph Haydn seated, holding a document.",
          "credit": "Thomas Hardy, portrait of Joseph Haydn (1791). Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 21
  },
  {
    "slug": "russia-africa-corps-mali-airstrike",
    "headline": "Human Rights Watch says a Russian Africa Corps airstrike killed eight civilians, including three children, in central Mali",
    "overview": "Human Rights Watch reported on 31 July that an airstrike by the Russian-controlled Africa Corps killed eight civilians, among them three children, in the village of Kyrnia in central Mali's Mopti region on 15 June. The group said an aircraft dropped at least two munitions — one outside the village chief's home, killing his wife and three children, and another on a nearby cattle market, killing four men — in what it called an unlawfully indiscriminate attack. Africa Corps had posted aerial footage claiming it struck a militant gathering, which HRW geolocated to the village.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiwwFBVV95cUxNRTdFTXp6WDROdHdqLS1fNHR2VERVa1dFZERvSjc2MTdHeU9CLU1CNHVFRTNCY2w4MHJQNlRrUlRIaHAxdlItYmlyS09iNTgtcFh5ZElfMzBqX2VqTGFjb2dwa0pYcTJrV0VxRG1abGd6MHpQaHAyTVVabFZMOVFXYmg0TlRUaEFPemx4OHo5YmdITFYxSkFfb3QyVC1OYU1ndkJtempYUUF4OGI1emh3SnlzcElMazFCQXBDNWd1bUV4NHc?oc=5"
      },
      {
        "name": "Human Rights Watch",
        "href": "https://www.hrw.org/news/2026/07/31/mali-russias-africa-corps-airstrikes-kill-civilians"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-31",
    "image": {
      "src": "/covers/russia-africa-corps-mali-airstrike.png",
      "alt": "A village landscape in the Mopti region of central Mali",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 31 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Destruction of Melos (416 BCE)",
        "excerpt": "the siege was now pressed vigorously; and some treachery taking place inside, the Melians surrendered at discretion to the Athenians, who put to death all the grown men whom they took, and sold the women and children for slaves, and subsequently sent out five hundred colonists and inhabited the place themselves.",
        "source": "Thucydides, History of the Peloponnesian War, Book 5, chapter 116 (Richard Crawley translation).",
        "href": "https://en.wikisource.org/wiki/History_of_the_Peloponnesian_War/Book_5",
        "image": {
          "src": "/covers/russia-africa-corps-mali-airstrike--a0.png",
          "alt": "The ruined ancient theatre of Melos (Milos), the small island whose people Athens destroyed in 416 BCE.",
          "credit": "Photograph by Dimitris Paraskevopoulos (Dparaskevop), Greek Wikipedia. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "The Bombing of Guernica (26 April 1937)",
        "excerpt": "On the market-day afternoon of 26 April 1937, warplanes of the German Condor Legion and Italian air units, flying in support of Franco's forces, bombed and strafed the undefended Basque town of Guernica for some three hours. Wave after wave dropped high-explosive and incendiary bombs on houses, the market square, and civilians fleeing into the fields, until the town centre was left in flames and rubble. The dead were overwhelmingly non-combatants, and Guernica became a lasting emblem of the deliberate bombardment of a defenceless town.",
        "source": "German Federal Archives (Bundesarchiv), photograph of the ruins of Guernica, 1937. Bild 183-H25224.",
        "href": "https://commons.wikimedia.org/wiki/File:Bundesarchiv_Bild_183-H25224,_Guernica,_Ruinen.jpg",
        "image": {
          "src": "/covers/russia-africa-corps-mali-airstrike--a1.png",
          "alt": "The bombed-out ruins of the Basque town of Guernica after the aerial bombardment of 26 April 1937.",
          "credit": "Bundesarchiv, Bild 183-H25224 / CC-BY-SA 3.0, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Andromache's Lament for Hector — Homer's Iliad, Book XXIV",
        "excerpt": "Andromache led their wailing as she clasped the head of mighty Hector in her embrace. \"Husband,\" she cried, \"you have died young, and leave me in your house a widow; he of whom we are the ill-starred parents is still a mere child, and I fear he may not reach manhood. Ere he can do so our city will be razed and overthrown, for you who watched over it are no more- you who were its saviour, the guardian of our wives and children. Our women will be carried away captives to the ships, and I among them; while you, my child, who will be with me will be put to some unseemly tasks, working for a cruel master.\"",
        "source": "Homer, The Iliad, Book XXIV (Samuel Butler prose translation, 1898).",
        "href": "https://en.wikisource.org/wiki/The_Iliad_(Butler)/Book_XXIV",
        "image": {
          "src": "/covers/russia-africa-corps-mali-airstrike--a2.png",
          "alt": "Jacques-Louis David's painting of Andromache mourning over the body of her slain husband Hector.",
          "credit": "Jacques-Louis David, 'Andromache Mourning Hector' (1783), Louvre. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "The Book of Lamentations, Chapter 1",
        "excerpt": "How doth the city sit solitary, that was full of people! how is she become as a widow! she that was great among the nations, and princess among the provinces, how is she become tributary! She weepeth sore in the night, and her tears are on her cheeks: among all her lovers she hath none to comfort her: all her friends have dealt treacherously with her, they are become her enemies.",
        "source": "The Book of Lamentations 1:1-2, King James Version (Authorized Version, 1611).",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Lamentations",
        "image": {
          "src": "/covers/russia-africa-corps-mali-airstrike--a3.png",
          "alt": "Rembrandt's painting of the prophet Jeremiah lamenting the destruction of Jerusalem, seated with head bowed as the city burns behind him.",
          "credit": "Rembrandt van Rijn, 'Jeremiah Lamenting the Destruction of Jerusalem' (1630), Rijksmuseum. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Francisco Goya, The Third of May 1808 (1814)",
        "excerpt": "Goya's great canvas shows the night-time execution of unarmed Madrid civilians by Napoleon's firing squad. A lantern throws harsh light on a kneeling man in a white shirt who flings his arms wide in surrender and terror, while faceless soldiers level their muskets and the bodies of the already-slain lie bleeding at his feet. It stands as one of the most unflinching images ever painted of the moment when ordinary, defenceless people are killed by the machinery of war.",
        "source": "Francisco de Goya, 'El tres de mayo de 1808 en Madrid' (The Third of May 1808), 1814, oil on canvas, Museo del Prado, Madrid.",
        "href": "https://commons.wikimedia.org/wiki/File:El_Tres_de_Mayo,_by_Francisco_de_Goya,_from_Prado_thin_black_margin.jpg",
        "image": {
          "src": "/covers/russia-africa-corps-mali-airstrike--a4.png",
          "alt": "Goya's 'The Third of May 1808' depicting the execution of Spanish civilians by a French firing squad at night.",
          "credit": "Francisco de Goya, 'The Third of May 1808' (1814), Museo del Prado. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Mozart, Requiem in D minor, K. 626 — Lacrimosa",
        "excerpt": "Lacrimosa dies illa, / Qua resurget ex favilla / Judicandus homo reus. / Huic ergo parce, Deus: / Pie Jesu Domine, / Dona eis requiem. Amen.",
        "source": "Wolfgang Amadeus Mozart, Requiem in D minor, K. 626 (1791), 'Lacrimosa'; text from the Latin Requiem Mass (Missa pro defunctis).",
        "href": "https://imslp.org/wiki/Requiem_in_D_minor,_K.626_(Mozart,_Wolfgang_Amadeus)",
        "image": {
          "src": "/covers/russia-africa-corps-mali-airstrike--a5.png",
          "alt": "A page from Mozart's autograph manuscript of the Requiem in D minor, K. 626.",
          "credit": "Wolfgang Amadeus Mozart, autograph manuscript of the Requiem, K. 626 (1791). Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 22
  },
  {
    "slug": "new-york-sues-kalshi-prediction-markets",
    "headline": "New York's attorney general sues prediction-market platform Kalshi, calling its event-betting contracts illegal gambling",
    "overview": "New York Attorney General Letitia James and Governor Kathy Hochul announced on 31 July a lawsuit against Kalshi, alleging the prediction-market platform runs an illegal, unlicensed gambling business by letting users trade on the outcomes of events such as sports and elections. Filed in a Manhattan state court, the suit asks Kalshi to forfeit its gains, pay restitution to harmed consumers and face fines of three times its illegal profits. The action follows similar petitions James filed in April against Coinbase Financial Markets and Gemini.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMimwFBVV95cUxQRnNJcUllRGYxM2JsZ2JCa1F3dmNRbkt3SWI4eE54U0dhblllSzBBc216dmVHYU9xSkpBV3ZaQktFTWZ2RXVlbThDVGdGaTVKWDl4cXhidmNwelJNNjRRd2NyUGdiTXNVM3lVcUJoSHBEdkJCd0xxVGxmRDl0eTlEQlFPUHRLd3lJcnByNHFsaGx4YnhCRnhTSW93Yw?oc=5"
      },
      {
        "name": "NY Attorney General",
        "href": "https://ag.ny.gov/press-release/2026/governor-hochul-and-attorney-general-james-announce-new-york-has-sued-kalshi"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-31",
    "image": {
      "src": "/covers/new-york-sues-kalshi-prediction-markets.png",
      "alt": "The neoclassical facade of the New York Stock Exchange",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 31 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Tacitus on the Germans who staked their liberty on a throw of the dice (c. AD 98)",
        "excerpt": "What is extraordinary, they play at dice, when sober, as a serious business: and that with such a desperate venture of gain or loss, that, when everything else is gone, they set their liberties and persons on the last throw. The loser goes into voluntary servitude; and, though the youngest and strongest, patiently suffers himself to be bound and sold. Such is their obstinacy in a bad practice—they themselves call it honor.",
        "source": "Tacitus, Germania, ch. 24, in The Germany and the Agricola of Tacitus (Oxford translation, revised; ed./comm. Edward Brooks), Project Gutenberg EBook #7524.",
        "href": "https://www.gutenberg.org/files/7524/7524-h/7524-h.htm",
        "image": {
          "src": "/covers/new-york-sues-kalshi-prediction-markets--a0.png",
          "alt": "Roman wall fresco of two men seated at a table playing dice, from a tavern in Pompeii.",
          "credit": "Dice players, fresco from the Osteria della Via di Mercurio, Pompeii (1st century AD). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "The U.S. Supreme Court upholds the war on lotteries in Champion v. Ames, the 'Lottery Case' (1903)",
        "excerpt": "Experience has shown that the common forms of gambling are comparatively innocuous when placed in contrast with the widespread pestilence of lotteries. The former are confined to a few persons and places, but the latter infests the whole community; it enters every dwelling; it reaches every class; it preys upon the hard earnings of the poor; it plunders the ignorant and simple.",
        "source": "Champion v. Ames (The Lottery Case), 188 U.S. 321 (1903), Opinion of the Court (Harlan, J.), quoting Phalen v. Virginia, 49 U.S. (8 How.) 163 (1850).",
        "href": "https://en.wikisource.org/wiki/Champion_v._Ames/Opinion_of_the_Court",
        "image": {
          "src": "/covers/new-york-sues-kalshi-prediction-markets--a1.png",
          "alt": "An ornate 1888 Louisiana State Lottery Company ticket.",
          "credit": "Louisiana State Lottery Company ticket, 1888. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Chaucer's Pardoner denounces 'hazardry' (dicing) in The Canterbury Tales (c. 1400)",
        "excerpt": "Now will I you defende hazardry. Hazard is very mother of leasings, And of deceit, and cursed forswearings, Blasphem' of Christ, manslaughter, and waste also Of chattel and of time; and furthermo' It is repreve, and contrar' of honour, For to be held a common hazardour. And ever the higher he is of estate, The more he is holden desolate.",
        "source": "Geoffrey Chaucer, 'The Pardoner's Tale,' The Canterbury Tales, and Other Poems, Project Gutenberg EBook #2383.",
        "href": "https://www.gutenberg.org/files/2383/2383-h/2383-h.htm",
        "image": {
          "src": "/covers/new-york-sues-kalshi-prediction-markets--a2.png",
          "alt": "Illuminated manuscript portrait of the Pardoner on horseback from the Ellesmere Chaucer.",
          "credit": "The Pardoner, from the Ellesmere manuscript of the Canterbury Tales (early 15th century). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Dostoevsky's The Gambler asks whether wagering is any worse than trade (1866)",
        "excerpt": "For why is gambling a whit worse than any other method of acquiring money? How, for instance, is it worse than trade? True, out of a hundred persons, only one can win; yet what business is that of yours or of mine?",
        "source": "Fyodor Dostoevsky, The Gambler (trans. C. J. Hogarth), Project Gutenberg EBook #2197.",
        "href": "https://www.gutenberg.org/files/2197/2197-h/2197-h.htm",
        "image": {
          "src": "/covers/new-york-sues-kalshi-prediction-markets--a3.png",
          "alt": "Painting of gamblers crowded around a roulette table in a Monte Carlo casino.",
          "credit": "Edvard Munch, At the Roulette Table in Monte Carlo (1892). Public domain, via Google Art Project / Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Caravaggio, The Cardsharps (I Bari), c. 1595",
        "excerpt": "Caravaggio's early masterpiece stages a con in progress: a naive well-dressed youth studies his cards while a smirking older accomplice peers over his shoulder and signals with gloved fingers, and a young cheat waits to pull a hidden card from behind his belt. The painting turns a card game into a small drama of deception, trust, and easy money, and its cast of gulls and sharpers made it one of the most copied images of gambling in European art.",
        "source": "Michelangelo Merisi da Caravaggio, The Cardsharps (I Bari), oil on canvas, c. 1595, Kimbell Art Museum, Fort Worth.",
        "href": "https://commons.wikimedia.org/wiki/File:Michelangelo_Merisi_da_Caravaggio_-_The_Cardsharps.jpg",
        "image": {
          "src": "/covers/new-york-sues-kalshi-prediction-markets--a4.png",
          "alt": "Baroque painting of a young man playing cards while an older accomplice signals and a cheat hides cards behind his back.",
          "credit": "Caravaggio, The Cardsharps (c. 1595), Kimbell Art Museum. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "'O Fortuna' — the medieval Wheel of Fortune, set to music by Carl Orff in Carmina Burana (1936)",
        "excerpt": "O Fortuna / velut luna / statu variabilis, / semper crescis / aut decrescis; / vita detestabilis / nunc obdurat / et tunc curat / ludo mentis aciem, / egestatem, / potestatem / dissolvit ut glaciem.",
        "source": "'O Fortuna,' Carmina Burana (Codex Buranus, c. 1230); Latin text as set in Carl Orff's cantata Carmina Burana (1936), via Wikisource.",
        "href": "https://la.wikisource.org/wiki/Carmina_Burana_(Orff)/Fortuna_Imperatrix_Mundi",
        "image": {
          "src": "/covers/new-york-sues-kalshi-prediction-markets--a5.png",
          "alt": "Medieval manuscript illumination of the goddess Fortuna turning a wheel bearing four figures rising and falling.",
          "credit": "Rota Fortunae (Wheel of Fortune), from the Carmina Burana manuscript (Codex Buranus, c. 1230). Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 23
  },
  {
    "slug": "australia-teens-social-media-ban-study",
    "headline": "A study finds more than 80% of Australian teenagers are still using social media three months after the under-16 ban took effect",
    "overview": "More than eight in ten Australian teenagers were still using social media three months after the country's landmark ban for under-16s began, according to a study released on 31 July that blamed weak age checks by the platforms. The research, part of a two-year project surveying over 4,000 children and families, found account ownership fell to 42% from 52% but that about 58% of teens still used social media daily, little changed from before the ban took effect on 10 December 2025. Many children said the platforms performed no age verification at all.",
    "genre": "Science",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiywFBVV95cUxNM3A2QWhjY0JhRUxQdU5uRjNVSlItNGczRG5GRG40TkNSTEl2MUt5eDcxR1ZGUTB4cnZEZTlKU2JEdFhMTFB4d0xpdGtHYldOaFNMa1JYOVdaZnl4azd1eXJqZXRIdTZaeUk5VGthQnhFR1BNcW52OGMtVWRoUXExWW9SdVBleTVRS2dZdEFVTUtPazVmVGNmZmM3S3FuSEpEaFhMTURBZ3VBd1h5aXVBWElqaFF6cWFxTS1RVWVOQmxScnhLbFpLY2ZRbw?oc=5"
      },
      {
        "name": "The Japan Times",
        "href": "https://www.japantimes.co.jp/news/2026/07/31/asia-pacific/australia-teens-social-media-ban/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-31",
    "image": {
      "src": "/covers/australia-teens-social-media-ban-study.png",
      "alt": "A teenager using social media on a smartphone",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 31 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Eighteenth Amendment and American Prohibition (1920-1933)",
        "excerpt": "After one year from the ratification of this article the manufacture, sale, or transportation of intoxicating liquors within, the importation thereof into, or the exportation thereof from the United States and all territory subject to the jurisdiction thereof for beverage purposes is hereby prohibited.",
        "source": "Constitution of the United States, Amendment XVIII, Section 1 (ratified January 16, 1919; in force from 1920; repealed by Amendment XXI in 1933). Despite the sweeping ban, speakeasies, bootleggers and home stills flourished and consumption continued nationwide, making it a byword for a law the state could not enforce.",
        "href": "https://www.archives.gov/founding-docs/amendments-11-27",
        "image": {
          "src": "/covers/australia-teens-social-media-ban-study--a0.png",
          "alt": "Prohibition agents destroying barrels of confiscated alcohol during the U.S. Prohibition era",
          "credit": "Prohibition agents destroying barrels of alcohol (United States, prohibition era). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "Rome's flouted sumptuary laws (Tacitus on the debate of A.D. 22)",
        "excerpt": "In fact, when the aedile Caius Bibulus broached the topic, all his colleagues had pointed out that the sumptuary laws were disregarded, that prohibited prices for household articles were every day on the increase, and that moderate measures could not stop the evil. The Senate on being consulted had, without handling the matter, referred it to the emperor. Tiberius, after long considering whether such reckless tastes could be repressed, whether the repression of them would not be still more hurtful to the State, also, how undignified it would be to meddle with what he could not succeed in ... at last addressed a letter to the Senate.",
        "source": "Tacitus, The Annals, Book III.52-53 (trans. Alfred John Church and William Jackson Brodribb). The Roman sumptuary laws restricting luxury and expenditure were, as the senators concede, openly ignored; the emperor declines to enforce a rule he cannot make good.",
        "href": "https://en.wikisource.org/wiki/The_Annals_(Tacitus)/Book_3",
        "image": {
          "src": "/covers/australia-teens-social-media-ban-study--a1.png",
          "alt": "Thomas Couture, Romans during the Decadence (1847), a grand painting of Romans amid luxury and revelry",
          "credit": "Thomas Couture, Romans during the Decadence (1847), Musee d'Orsay. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "The forbidden tree in the Garden of Eden (Genesis 3)",
        "excerpt": "And the serpent said unto the woman, Ye shall not surely die: For God doth know that in the day ye eat thereof, then your eyes shall be opened, and ye shall be as gods, knowing good and evil. And when the woman saw that the tree was good for food, and that it was pleasant to the eyes, and a tree to be desired to make one wise, she took of the fruit thereof, and did eat, and gave also unto her husband with her; and he did eat.",
        "source": "Genesis 3:4-6, The Holy Bible, King James Version (1611; 1769 Oxford text). The single prohibition in Eden becomes the one thing desired; the ban itself sharpens the temptation.",
        "href": "https://www.gutenberg.org/ebooks/10",
        "image": {
          "src": "/covers/australia-teens-social-media-ban-study--a2.png",
          "alt": "Jan Brueghel the Elder and Peter Paul Rubens, The Garden of Eden with the Fall of Man, showing Adam, Eve and the forbidden tree",
          "credit": "Jan Brueghel the Elder and Peter Paul Rubens, The Garden of Eden with the Fall of Man (c. 1615), Mauritshuis. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Ovid: 'We ever strive for the forbidden' (Amores III.4)",
        "excerpt": "nitimur in vetitum semper cupimusque negata; / sic interdictis imminet aeger aquis.",
        "source": "Ovid, Amores, Book III, Elegy IV, lines 17-18. The Latin runs, in the familiar literal rendering, 'We ever strive for the forbidden and desire what is denied; so the sick man hankers after the water he is forbidden.' Ovid warns a jealous husband that a guarded, prohibited wife is only made more alluring by the restriction.",
        "href": "https://www.thelatinlibrary.com/ovid/ovid.amor3.shtml",
        "image": {
          "src": "/covers/australia-teens-social-media-ban-study--a3.png",
          "alt": "Luca Signorelli, fresco portrait traditionally identified as the poet Ovid",
          "credit": "Luca Signorelli, portrait of Ovid (c. 1499-1502), Orvieto Cathedral. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Michelangelo, The Fall and Expulsion from the Garden of Eden (Sistine Chapel)",
        "excerpt": "Michelangelo's ceiling fresco splits a single panel in two. On the left, beneath the tree, the serpent coils down to hand the forbidden fruit to Eve while Adam reaches up for it; on the right, the same pair are driven out by an angel's sword, aged and shamed in an instant. The composition makes the transgression and its consequence one continuous act, the reach for what is barred flowing straight into exile.",
        "source": "Michelangelo Buonarroti, The Fall of Man and the Expulsion from Paradise (1509-1510), fresco, Sistine Chapel ceiling, Vatican. Public domain.",
        "href": "https://commons.wikimedia.org/wiki/File:Michelangelo,_Fall_and_Expulsion_from_Garden_of_Eden_00.jpg",
        "image": {
          "src": "/covers/australia-teens-social-media-ban-study--a4.png",
          "alt": "Michelangelo's Sistine Chapel fresco of the Temptation and the Expulsion from the Garden of Eden",
          "credit": "Michelangelo, The Fall and Expulsion from the Garden of Eden (1509-1510), Sistine Chapel. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Charles Gounod, Faust (1859)",
        "excerpt": "Gounod's opera stages temptation as an irresistible bargain: the aged, world-weary Faust curses his learning and, at Mephistopheles' urging, trades his soul for restored youth and forbidden pleasure. The devil then engineers the seduction of the innocent Marguerite, whose ruin follows from a single surrender to what she had been warned against. The whole drama turns on the ancient premise that a thing prohibited becomes precisely the thing craved.",
        "source": "Charles Gounod, Faust, opera in five acts, libretto by Jules Barbier and Michel Carre after Goethe, first performed 1859 (Theatre Lyrique, Paris). Public domain; full scores at IMSLP.",
        "href": "https://imslp.org/wiki/Faust_(Gounod,_Charles)",
        "image": {
          "src": "/covers/australia-teens-social-media-ban-study--a5.png",
          "alt": "Ary Scheffer, Faust and Marguerite in the Garden, depicting the tempted lovers",
          "credit": "Ary Scheffer, Faust and Marguerite in the Garden (1846). Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 24
  },
  {
    "slug": "china-coast-guard-taiwan-patrol",
    "headline": "China's coast guard stages patrols in waters east of Taiwan, drawing condemnation from Taipei",
    "overview": "China's coast guard said on 31 July it had carried out what it called routine law-enforcement patrols in waters off Taiwan's Pacific coast, led by the vessel Xiushan, angering Taipei, which condemned the move as a political operation to expand Beijing's control. Taiwanese authorities said the patrols, which China indicated it would intensify, were aimed at normalising its presence around the island. The activity added to Western concerns over unilateral moves that could raise tension in the Taiwan Strait.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiowFBVV95cUxPYnVIVXRsT0JucGZNVEh0amdoTGpST2UzSkljV3E5TWhobm9Od0hxVmdmb055dGtwTEJuNF90eFRxM1RZelVKazUyRHhxbHJYWS1XTmctYmktM2xZOWVGRElfSG16ZzExZFlqVmVwSE5nLXVFaW5RcFFrT3A1VnUzSk95bjBYR3hOV1U2MWY3UV96cjNFQXV5RlNOdHhOOFdnUXc0?oc=5"
      },
      {
        "name": "Asharq Al-Awsat",
        "href": "https://english.aawsat.com/world/5301921-china-coast-guard-patrols-east-taiwan-angering-taipei"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-31",
    "image": {
      "src": "/covers/china-coast-guard-taiwan-patrol.png",
      "alt": "A coast guard patrol vessel at sea",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 31 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Athens Reduces the Island of Melos (416 BC)",
        "excerpt": "Reinforcements afterwards arriving from Athens in consequence, under the command of Philocrates, son of Demeas, the siege was now pressed vigorously; and some treachery taking place inside, the Melians surrendered at discretion to the Athenians, who put to death all the grown men whom they took, and sold the women and children for slaves, and subsequently sent out five hundred colonists and inhabited the place themselves.",
        "source": "Thucydides, History of the Peloponnesian War, Book V (Richard Crawley translation). The Athenian thalassocracy, master of the Aegean, pressed its command of the sea upon a small neutral island that wished only to be left alone.",
        "href": "https://www.gutenberg.org/files/7142/7142-h/7142-h.htm",
        "image": {
          "src": "/covers/china-coast-guard-taiwan-patrol--a0.png",
          "alt": "The Lenormant Relief, a marble fragment showing rowers seated in the hull of an Athenian trireme.",
          "credit": "The Lenormant Relief (c. 410-400 BC), Acropolis Museum, Athens. Photograph public domain via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "Napoleon's Berlin Decree Declares Britain Blockaded (1806)",
        "excerpt": "We have consequently decreed and do decree that which follows: 1. The British Isles are declared to be in a state of blockade. 2. All commerce and all correspondence with the British Isles are forbidden. Consequently letters or packages directed to England or to an Englishman or written in the English language shall not pass through the mails and shall be seized.",
        "source": "Napoleon I, Berlin Decree, 21 November 1806, establishing the Continental System. A great power sought to strangle a maritime rival by paper decree, declaring whole coasts closed and tightening the ring by degrees.",
        "href": "https://en.wikisource.org/wiki/Berlin_Decree",
        "image": {
          "src": "/covers/china-coast-guard-taiwan-patrol--a1.png",
          "alt": "J.M.W. Turner's painting of the Battle of Trafalgar, ships of the line firing amid smoke and towering masts.",
          "credit": "J.M.W. Turner, The Battle of Trafalgar (1806-1808). Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "The Melian Dialogue (Thucydides)",
        "excerpt": "...since you know as well as we do that right, as the world goes, is only in question between equals in power, while the strong do what they can and the weak suffer what they must.",
        "source": "Thucydides, History of the Peloponnesian War, Book V, the Melian Dialogue (Richard Crawley translation). The Athenian envoys tell the Melians that justice is a matter for equals, and that between the mighty and the small only power decides.",
        "href": "https://www.gutenberg.org/files/7142/7142-h/7142-h.htm",
        "image": {
          "src": "/covers/china-coast-guard-taiwan-patrol--a2.png",
          "alt": "Marble bust of the historian Thucydides.",
          "credit": "Roman copy of a portrait bust of Thucydides, Royal Ontario Museum. Photograph public domain via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Poseidon Raises the Sea Against Odysseus (Homer, Odyssey V)",
        "excerpt": "Thereon he gathered his clouds together, grasped his trident, stirred it round in the sea, and roused the rage of every wind that blows till earth, sea, and sky were hidden in cloud, and night sprang forth out of the heavens. Winds from East, South, North, and West fell upon him all at the same time, and a tremendous sea got up, so that Ulysses' heart began to fail him.",
        "source": "Homer, The Odyssey, Book V (Samuel Butler translation). The sea-god, lord of the deep, turns the whole ocean against a lone man on a raft, the overwhelming power of the sea set against the small and the solitary.",
        "href": "https://www.gutenberg.org/files/1727/1727-h/1727-h.htm",
        "image": {
          "src": "/covers/china-coast-guard-taiwan-patrol--a3.png",
          "alt": "The bronze Artemision statue of a sea-god, arm outstretched as if to hurl a trident.",
          "credit": "Artemision Bronze (Zeus or Poseidon), c. 460 BC, National Archaeological Museum, Athens. Photograph public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "The Fighting Temeraire, J.M.W. Turner (1839)",
        "excerpt": "A ghostly, pale warship, veteran of Trafalgar, is drawn silently upriver by a squat black steam-tug beneath a blaze of sunset. Turner sets the dignity of an old ship-of-the-line against the smoke of a new age, mastery of the sea passing from sail to machine. The still water and burning sky make an elegy for naval power that has had its day.",
        "source": "Joseph Mallord William Turner, The Fighting Temeraire tugged to her last berth to be broken up, 1839, oil on canvas, The National Gallery, London.",
        "href": "https://www.nationalgallery.org.uk/paintings/joseph-mallord-william-turner-the-fighting-temeraire",
        "image": {
          "src": "/covers/china-coast-guard-taiwan-patrol--a4.png",
          "alt": "Turner's painting of the pale warship Temeraire towed by a dark steam tug against a golden sunset.",
          "credit": "J.M.W. Turner, The Fighting Temeraire (1839), National Gallery, London. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "La Mer, Claude Debussy (1905)",
        "excerpt": "Debussy's three symphonic sketches conjure the sea from dawn to noon, the play of waves, and the dialogue of wind and water, a shimmering, restless expanse that swells, glitters, and menaces by turns. The music never rests, always moving, always pressing, an ocean rendered as pure motion and power. The original 1905 Durand score famously carried Hokusai's Great Wave on its cover.",
        "source": "Claude Debussy, La Mer, trois esquisses symphoniques pour orchestre (1905), Paris: Durand.",
        "href": "https://imslp.org/wiki/La_mer_(Debussy,_Claude)",
        "image": {
          "src": "/covers/china-coast-guard-taiwan-patrol--a5.png",
          "alt": "Hokusai's woodblock print of a great cresting wave towering over small boats with Mount Fuji beyond.",
          "credit": "Katsushika Hokusai, The Great Wave off Kanagawa (c. 1831), the image used on the cover of Debussy's 1905 La Mer score. Public domain via Wikimedia Commons."
        }
      }
    ],
    "rank": 25
  },
  {
    "slug": "minimax-h3-video-model-open-weights",
    "headline": "China's MiniMax releases its H3 video-generation model, promising 2K clips with sound and open weights within days",
    "overview": "Shanghai-based AI firm MiniMax released a new video-generation model, H3, on 31 July that can produce clips of up to 15 seconds in 2K resolution with native stereo sound and can edit or restyle existing footage from text, image, video and audio inputs. The company said it would publish the model's weights within days, extending the open-weight approach favoured by Chinese developers into video generation, and that producing 2K video would cost less than a third of rival products. H3 steps up competition in a market led by ByteDance and Kuaishou.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMijwFBVV95cUxNNDQ3NVlFdGNsSGlVcmUxZzV3YnVWX1V4bHhYc0xjYk0weFRhQWNCRG9JTjB0TmszWkRLSkxYamx2bHFWUWZnUS1QN05obnBMWTlWUnJfUHRiTllNNTlsWGVfaTBQRml4R0Y3N01USlFBZmo0bFgyRHRZV2htU0tRakxJSjdJSU41UWNPbmljdw?oc=5"
      },
      {
        "name": "Investing.com",
        "href": "https://www.investing.com/news/stock-market-news/chinas-minimax-releases-h3-video-model-4826743"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-31",
    "image": {
      "src": "/covers/minimax-h3-video-model-open-weights.png",
      "alt": "The Shanghai skyline at dusk, home to AI developer MiniMax",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 31 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Muybridge's \"The Horse in Motion\" (1878)",
        "excerpt": "The Horse in motion. \"Sallie Gardner,\" owned by Leland Stanford; running at a 1:40 gait over the Palo Alto track, 19th June 1878.",
        "source": "Eadweard Muybridge, \"The Horse in Motion\" (Sallie Gardner at a Gallop), cabinet card, Palo Alto, 19 June 1878. Library of Congress, Prints & Photographs Division. The first successful photographic sequence of an animal in motion, and a direct forerunner of the motion picture.",
        "href": "https://www.loc.gov/pictures/item/2007678037/",
        "image": {
          "src": "/covers/minimax-h3-video-model-open-weights--a0.png",
          "alt": "Muybridge's sequence of photographs of the horse Sallie Gardner galloping, 1878, showing all four hooves leaving the ground.",
          "credit": "Eadweard Muybridge, \"The Horse in Motion,\" 1878. Library of Congress / public domain via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "The Magic Lantern and the Phantasmagoria (Brewster, 1832)",
        "excerpt": "At this time a new figure was put in, so that when the lantern receded from the screen, the old figure seemed to have been transformed into the new one. Although the figure was always at the same distance from the spectators, yet, owing to its gradual diminution in size, it necessarily appeared to be retiring to a distance. When the magic lantern was withdrawn from PQ, and the lens D at the same time brought nearer to EF, the image in PQ gradually increased in size, and therefore seemed in the same proportion to be approaching the spectators.",
        "source": "Sir David Brewster, Letters on Natural Magic, Addressed to Sir Walter Scott, Bart. (London: John Murray, 1832), Letter IV, on the magic lantern and the phantasmagoric exhibitions of Philipsthal and others.",
        "href": "https://www.gutenberg.org/files/51645/51645-h/51645-h.htm",
        "image": {
          "src": "/covers/minimax-h3-video-model-open-weights--a1.png",
          "alt": "A 19th-century print of a phantasmagoria show, ghostly figures projected by a magic lantern before an astonished audience.",
          "credit": "Phantasmagoria projected by magic lantern, 19th-century engraving. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Pygmalion's Statue Comes to Life — Ovid, Metamorphoses, Book X",
        "excerpt": "When he returned, he went directly to his image-maid, bent over her, and kissed her many times, while she was on her couch; and as he kissed, she seemed to gather some warmth from his lips. Again he kissed her; and he felt her breast; the ivory seemed to soften at the touch, and its firm texture yielded to his hand, as honey-wax of Mount Hymettus turns to many shapes when handled in the sun, and surely softens from each gentle touch. He is amazed; but stands rejoicing in his doubt; while fearful there is some mistake, again and yet again, gives trial to his hopes by touching with his hand. It must be flesh! The veins pulsate beneath the careful test of his directed finger.",
        "source": "Ovid, Metamorphoses, Book X (Pygmalion), lines 280 ff., translated by Brookes More (Boston: Cornhill Publishing, 1922). Perseus Digital Library, Tufts University.",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0028:book=10:card=243",
        "image": {
          "src": "/covers/minimax-h3-video-model-open-weights--a2.png",
          "alt": "Burne-Jones painting of Pygmalion kneeling before Galatea as his ivory statue awakens into living flesh.",
          "credit": "Edward Burne-Jones, \"Pygmalion and the Image: The Soul Attains,\" 1878. Public domain via Wikimedia Commons (Google Art Project)."
        }
      },
      {
        "category": "literary",
        "title": "Prometheus Steals Fire for Mankind — Hesiod, Works and Days",
        "excerpt": "He hid fire; but that the noble son of Iapetus stole again for men from Zeus the counsellor in a hollow fennel-stalk, so that Zeus who delights in thunder did not see it.",
        "source": "Hesiod, Works and Days, lines 50-52, translated by Hugh G. Evelyn-White, in Hesiod, the Homeric Hymns and Homerica (Loeb Classical Library, 1914). Project Gutenberg.",
        "href": "https://www.gutenberg.org/cache/epub/348/pg348.txt",
        "image": {
          "src": "/covers/minimax-h3-video-model-open-weights--a3.png",
          "alt": "Heinrich Fueger's painting of Prometheus holding the stolen flame aloft to bring fire and light to mankind.",
          "credit": "Heinrich Friedrich Fueger, \"Prometheus Brings Fire to Mankind,\" c. 1817. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Jean-Léon Gérôme, \"Pygmalion and Galatea\" (c. 1890)",
        "excerpt": "Gérôme paints the exact instant of transformation: the sculptor reaches up to embrace his own creation as, from the feet upward, cold ivory flushes into warm living flesh, the statue still pale below the waist while its awakened torso turns and bends to return the artist's kiss. A winged Cupid hovers at the right, loosing an arrow to seal the miracle. It is the archetypal image of the maker whose art becomes so lifelike that it steps down from its pedestal and breathes.",
        "source": "Jean-Léon Gérôme, Pygmalion and Galatea, oil on canvas, ca. 1890. The Metropolitan Museum of Art, New York, Gift of Louis C. Raegner, 1927 (accession 27.200).",
        "href": "https://www.metmuseum.org/art/collection/search/436483",
        "image": {
          "src": "/covers/minimax-h3-video-model-open-weights--a4.png",
          "alt": "Gérôme's painting of Pygmalion embracing Galatea as her ivory body turns to living flesh from the waist up.",
          "credit": "Jean-Léon Gérôme, \"Pygmalion and Galatea,\" ca. 1890. The Metropolitan Museum of Art / public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Beethoven, \"The Creatures of Prometheus,\" Op. 43 (1801)",
        "excerpt": "Beethoven's only full-length ballet dramatizes the Prometheus myth as pure music: the Titan fashions two clay statues, a man and a woman, and, stealing the divine fire, animates them into feeling, thinking beings, then leads them to Apollo and the Muses to be taught the arts. The buoyant Overture and its finale theme, later reborn in the Eroica Symphony, sound the moment lifeless matter is quickened into motion and soul. It is a score about a creator who shares the stolen spark so that his made creatures might learn to dance, to love, and to make art of their own.",
        "source": "Ludwig van Beethoven, Die Geschöpfe des Prometheus (The Creatures of Prometheus), Op. 43, ballet after a scenario by Salvatore Viganò, premiered Burgtheater, Vienna, 28 March 1801. Scores at the International Music Score Library Project (IMSLP).",
        "href": "https://imslp.org/wiki/Die_Gesch%C3%B6pfe_des_Prometheus,_Op.43_(Beethoven,_Ludwig_van)",
        "image": {
          "src": "/covers/minimax-h3-video-model-open-weights--a5.png",
          "alt": "Joseph Karl Stieler's 1820 portrait of Ludwig van Beethoven holding a score and pen.",
          "credit": "Joseph Karl Stieler, portrait of Ludwig van Beethoven, 1820. Public domain via Wikimedia Commons."
        }
      }
    ],
    "rank": 26
  },
  {
    "slug": "uefa-concacaf-fifa-boycott",
    "headline": "UEFA's 55 members and Concacaf vote to boycott the World Cup if FIFA sells a 20% stake to private investors",
    "overview": "Football's European confederation UEFA, which represents 55 of FIFA's member associations, and the North and Central American body Concacaf both held emergency meetings on 30 July and agreed to boycott all FIFA competitions, including the men's and women's World Cups, if FIFA proceeds with a plan to sell a 20% stake in a new commercial entity to private investors. Powers such as Germany, France, England and champions Spain branded the proposal, pushed by president Gianni Infantino, \"irresponsible and indefensible.\"",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMiowFBVV95cUxNbUNHcXRDN1RPZVdnVjZqUjVOb0hZUWJFbEt1SW1zQmFPRFB2VlJwNno4eUNmU0M3d3EtSGlGZ3Q3REpFaUZkdHp4YWhRQ0piUkFfYi1jc3RrbjJmdHo3RDY3SG9MX080Q2FMRkRCc0tRMTI3ZXhjXzFEZlA4LTV3NFFBNUh2N09Fb18wRm5mR3l1anJqbHBNaUE5R0d2ZnlfdlAw?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiwgFBVV95cUxNWlV6RGNqbEVZQng1XzlGN1dPcUlscHZaT2c2ZTA2TjhDRFVSa1VQZ1BQUTdLR2NxaHNBNk1CU01rVlFobjMzNzAycWZ3Qk9XRjZaVmk0SDhPWjFWTDh0RmFwTlZYTEFMSWdfekRaNDBONjR2cmdNay1IZHlkZWwySmhJWk5GTklNN05ZclYzYUVQZnVLak1IclJiSERXVUNaNjcxa09LNXFCaWZVM0NWSl9HSHZKQWFTMjRiUVhOTVJYUQ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-30",
    "image": {
      "src": "/covers/uefa-concacaf-fifa-boycott.png",
      "alt": "The gold FIFA World Cup trophy on display",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 30 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The barons compel King John to seal Magna Carta (1215)",
        "excerpt": "No scutage not aid shall be imposed on our kingdom, unless by common counsel of our kingdom, except for ransoming our person, for making our eldest son a knight, and for once marrying our eldest daughter; and for these there shall not be levied more than a reasonable aid.",
        "source": "Magna Carta (1215), clause 12; English translation, The Avalon Project, Yale Law School (from Statutes of the Realm).",
        "href": "https://avalon.law.yale.edu/medieval/magna.asp",
        "image": {
          "src": "/covers/uefa-concacaf-fifa-boycott--a0.png",
          "alt": "The 1215 Magna Carta manuscript, dense Latin text on parchment, British Library Cotton MS Augustus II.106",
          "credit": "British Library, Cotton MS Augustus II.106 (1215); public domain via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "The 1980 Moscow Olympic boycott",
        "excerpt": "Furious at the Soviet invasion of Afghanistan, President Jimmy Carter demanded that the United States and its allies refuse to send athletes to the 1980 Moscow Games unless Soviet troops withdrew. More than sixty nations ultimately stayed home, turning the world's shared festival of sport into an instrument of collective protest and leaving athletes to pay the price for a quarrel among powers. The episode showed how the threat to withhold participation, rather than to compete, can become the loudest political statement a sporting movement can make.",
        "source": "United States Department of State, Office of the Historian, \"The Olympic Boycott, 1980\"; photograph from the National Archives and Records Administration, March 21, 1980.",
        "href": "https://history.state.gov/milestones/1977-1980/olympic-boycott",
        "image": {
          "src": "/covers/uefa-concacaf-fifa-boycott--a1.png",
          "alt": "President Jimmy Carter briefing members of the U.S. Olympic team about the boycott of the 1980 Moscow Summer Games",
          "credit": "National Archives and Records Administration, March 21, 1980; public domain via Wikimedia Commons / DPLA"
        }
      },
      {
        "category": "literary",
        "title": "Jesus drives the money-changers from the Temple",
        "excerpt": "And Jesus went into the temple of God, and cast out all them that sold and bought in the temple, and overthrew the tables of the moneychangers, and the seats of them that sold doves, And said unto them, It is written, My house shall be called the house of prayer; but ye have made it a den of thieves.",
        "source": "The Gospel According to St. Matthew 21:12-13, King James Version (1611).",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Matthew",
        "image": {
          "src": "/covers/uefa-concacaf-fifa-boycott--a2.png",
          "alt": "El Greco's painting of Christ swinging a whip to drive merchants and money-changers out of the temple",
          "credit": "El Greco (Domenikos Theotokopoulos), Christ Driving the Money Changers from the Temple, c.1570, Minneapolis Institute of Art; public domain via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "The ten tribes secede from King Rehoboam",
        "excerpt": "What portion have we in David? neither have we inheritance in the son of Jesse: to your tents, O Israel: now see to thine own house, David. So Israel departed unto their tents.",
        "source": "The First Book of the Kings 12:16, King James Version (1611).",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/1_Kings",
        "image": {
          "src": "/covers/uefa-concacaf-fifa-boycott--a3.png",
          "alt": "Hans Holbein woodcut showing the arrogant King Rehoboam threatening the assembled elders of Israel, who turn away in revolt",
          "credit": "Hans Holbein the Younger, The Arrogance of Rehoboam, c.1530; public domain via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Delacroix, Liberty Leading the People (1830)",
        "excerpt": "Delacroix's great canvas shows a citizenry in open revolt against a sovereign who has overreached, a mixed crowd of workers, bourgeois and boys surging forward over the barricades and the bodies of the fallen. At its center an allegorical Liberty, tricolour in one hand and musket in the other, fuses ordinary rebels into a single unstoppable body. It is the definitive image of a shared cause taken back by its members from a ruler who forgot he governed by their consent.",
        "source": "Eugène Delacroix, Liberty Leading the People (La Liberté guidant le peuple), 1830, oil on canvas, Musée du Louvre, Paris.",
        "href": "https://collections.louvre.fr/en/ark:/53355/cl010065872",
        "image": {
          "src": "/covers/uefa-concacaf-fifa-boycott--a4.png",
          "alt": "Eugène Delacroix's Liberty Leading the People: an allegorical woman raising the French tricolour leads armed revolutionaries over a barricade",
          "credit": "Eugène Delacroix, Liberty Leading the People, 1830, Musée du Louvre; public domain via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Verdi, \"Va, pensiero\" from Nabucco (1842)",
        "excerpt": "Va, pensiero, sull'ali dorate; va, ti posa sui clivi, sui colli,",
        "source": "Giuseppe Verdi, \"Va, pensiero\" (Chorus of the Hebrew Slaves), Act III of Nabucco (1842); libretto by Temistocle Solera.",
        "href": "https://imslp.org/wiki/Nabucco_(Verdi,_Giuseppe)",
        "image": {
          "src": "/covers/uefa-concacaf-fifa-boycott--a5.png",
          "alt": "Giovanni Boldini's 1886 portrait of composer Giuseppe Verdi in top hat and white scarf",
          "credit": "Giovanni Boldini, Portrait of Giuseppe Verdi, 1886, Galleria Nazionale d'Arte Moderna, Rome; public domain via Wikimedia Commons"
        }
      }
    ],
    "lead": true,
    "rank": 27
  },
  {
    "slug": "ceuta-migrants-morocco-military",
    "headline": "Spain deploys the military in Ceuta as hundreds of migrants swim from Morocco into the enclave in a week",
    "overview": "Hundreds of migrants have swum and waded from Morocco into Spain's North African enclave of Ceuta over the past week, using inflatable rings and rushing a gate in the border fence, in a surge the enclave's leader, Juan Jesús Vivas, said is overwhelming resources. Spain has called in the military and its interior minister was due to visit, after a Supreme Court ruling limited the summary return of migrants to Morocco.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMirAFBVV95cUxNLTJ4YmJvZ19TT3o5RDRpZzdoSm9Vd2hwNVozSjVURDkyMjcyZ3B1WGdxY2Q0QWlkdkU1VGFsY0ktaXZpVDlXdE5RdDJMYTR6UkdYMDl2ZGx0QXpLcW1TZUZ0OThmdENpdW5VYnprSVF1WF9iXzlPdmhnd3dsUldjZ0IzYWtJX1JWYnhudDJadFlidzM1ME9YWGV4Mmdma2ZzZGVxQUhoLVhoMm5N?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cg4drwzkrkxo"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-30",
    "image": {
      "src": "/covers/ceuta-migrants-morocco-military.png",
      "alt": "Migrants scramble from the sea up rocks toward a border fence at Ceuta",
      "credit": "BBC"
    },
    "edition": "Evening Edition · 30 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Tariq ibn Ziyad crosses the Strait of Gibraltar (711 CE)",
        "excerpt": "Oh my warriors, whither would you flee? Behind you is the sea, before you, the enemy.",
        "source": "Al-Maqqari, \"Tarik's Address to his Soldiers\" (recording the 711 CE crossing from Morocco into Iberia), in The Sacred Books and Early Literature of the East, Vol. VI: Medieval Arabia, ed. Charles F. Horne (New York, 1917).",
        "href": "https://en.wikisource.org/wiki/The_Sacred_Books_and_Early_Literature_of_the_East/Volume_6/Tarik's_Address_to_his_Soldiers",
        "image": {
          "src": "/covers/ceuta-migrants-morocco-military--a0.png",
          "alt": "Fourteenth-century Persian manuscript illustration of Tariq ibn Ziyad, the Berber commander who led the Muslim crossing from North Africa into Iberia in 711.",
          "credit": "Aja'ib al-Makhluqat, Baghdad, 1388. Bibliothèque nationale de France, Suppl. Persan 332, fol. 162r (public domain, via Wikimedia Commons)."
        }
      },
      {
        "category": "historical",
        "title": "The Vietnamese 'Boat People' (1975-1995)",
        "excerpt": "For two decades after the fall of Saigon, more than a million people pushed off from Vietnam's coast in fishing skiffs and overloaded wooden boats, betting their lives on the open sea rather than the regime behind them. Many drifted for days without water, were preyed upon by pirates, or capsized within sight of no shore at all. Those who were found - like the thirty-five refugees plucked from a 35-foot boat by the USS Blue Ridge after eight days adrift - survived only by chance encounter with a passing ship.",
        "source": "U.S. Navy photograph by Lt. Carl R. Begy, 15 May 1984: a boat of 35 Vietnamese refugees rescued by the amphibious command ship USS Blue Ridge (LCC-19) northeast of Cam Ranh Bay after eight days at sea. U.S. National Archives / U.S. Navy.",
        "href": "https://commons.wikimedia.org/wiki/File:35_Vietnamese_boat_people.JPEG",
        "image": {
          "src": "/covers/ceuta-migrants-morocco-military--a1.png",
          "alt": "A small wooden fishing boat crowded with 35 Vietnamese refugees comes alongside the U.S. Navy command ship USS Blue Ridge in 1984.",
          "credit": "Lt. Carl R. Begy, U.S. Navy, 1984 (public domain, via Wikimedia Commons)."
        }
      },
      {
        "category": "literary",
        "title": "The Crossing of the Red Sea (Exodus 14:21-22)",
        "excerpt": "And Moses stretched out his hand over the sea; and the LORD caused the sea to go back by a strong east wind all that night, and made the sea dry land, and the waters were divided. And the children of Israel went into the midst of the sea upon the dry ground: and the waters were a wall unto them on their right hand, and on their left.",
        "source": "The Holy Bible, King James Version (1611), Exodus 14:21-22.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Exodus",
        "image": {
          "src": "/covers/ceuta-migrants-morocco-military--a2.png",
          "alt": "Bronzino's fresco of the Israelites crossing the Red Sea, fleeing on foot toward a distant shore.",
          "credit": "Agnolo Bronzino, The Crossing of the Red Sea, 1540-45, Palazzo Vecchio, Florence (public domain, via Wikimedia Commons / Google Art Project)."
        }
      },
      {
        "category": "literary",
        "title": "Aeneas and the Trojans in the storm at sea (The Aeneid, Book I)",
        "excerpt": "South, East, and West with mix'd confusion roar, / And roll the foaming billows to the shore. / The cables crack; the sailors' fearful cries / Ascend; and sable night involves the skies.",
        "source": "Virgil, The Aeneid, Book I, translated by John Dryden (1697).",
        "href": "https://www.gutenberg.org/files/228/228-h/228-h.htm",
        "image": {
          "src": "/covers/ceuta-migrants-morocco-military--a3.png",
          "alt": "A stormy seascape with the shipwreck of Aeneas, his Trojan fleet foundering among the waves and rocks.",
          "credit": "Frederik van Valckenborch, Landscape with the Shipwreck of Aeneas, 1603, Museum Boijmans Van Beuningen, Rotterdam (public domain, via Wikimedia Commons)."
        }
      },
      {
        "category": "artistic",
        "title": "The Raft of the Medusa - Theodore Gericault",
        "excerpt": "Gericault's vast canvas shows the survivors of a wrecked frigate crammed onto a makeshift raft, cast adrift off the African coast. The dead and dying sprawl across the foreground while the still-living strain upward, waving rags toward a barely visible ship on the horizon. It turns a real maritime catastrophe of desperate people abandoned at sea into a monumental image of hope, terror, and the thin line between rescue and oblivion.",
        "source": "Theodore Gericault, Le Radeau de la Meduse (The Raft of the Medusa), 1818-19, oil on canvas, Musee du Louvre, Paris.",
        "href": "https://commons.wikimedia.org/wiki/File:JEAN_LOUIS_TH%C3%89ODORE_G%C3%89RICAULT_-_La_Balsa_de_la_Medusa_(Museo_del_Louvre,_1818-19).jpg",
        "image": {
          "src": "/covers/ceuta-migrants-morocco-military--a4.png",
          "alt": "Gericault's painting of shipwreck survivors on a raft at sea, straining toward a distant ship on the horizon.",
          "credit": "Theodore Gericault, The Raft of the Medusa, 1818-19, Musee du Louvre (public domain, via Wikimedia Commons)."
        }
      },
      {
        "category": "artistic",
        "title": "Wade in the Water (African-American spiritual)",
        "excerpt": "Wade in the water, wade in the water, children, wade in the water. God's gonna trouble the water. / See that host all dressed in white, God's gonna trouble the water. The leader looks like the Israelite. God's gonna trouble the water.",
        "source": "\"Wade in the Water,\" African-American spiritual, first published in New Jubilee Songs as Sung by the Fisk Jubilee Singers, ed. Frederick J. Work (Nashville, 1901).",
        "href": "https://hymnary.org/text/see_that_host_all_dressed_in_white",
        "image": {
          "src": "/covers/ceuta-migrants-morocco-military--a5.png",
          "alt": "Portrait photograph of the Fisk Jubilee Singers, the formerly enslaved ensemble that first published 'Wade in the Water.'",
          "credit": "Fisk Jubilee Singers, 1882. Moorland-Spingarn Research Center, Prints & Photographs (public domain, via Wikimedia Commons)."
        }
      }
    ],
    "rank": 28
  },
  {
    "slug": "russia-north-korean-missile-kryvyi-rih-family",
    "headline": "A Russian ballistic missile strike near Kryvyi Rih kills a family of five as Zelensky says a North Korean weapon was used",
    "overview": "A Russian overnight barrage of more than 70 missiles and 280 drones struck across Ukraine, and a ballistic missile destroyed a family home in Radushne near Kryvyi Rih, killing five members of the Voronov family, President Volodymyr Zelensky said, with others still missing. Zelensky said Russia used a North Korean-made missile in the attack, which officials said killed at least eight people in all.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMizAFBVV95cUxPYWM5NFpLa3p4OE1XZUMybkU4TDdyeWxjbTlEaXpUaUtJR1JUNngzd3AxNmgydElQNUc4aVBFS3V6N0FCcXZOTVV0a0tYQjl1dTVRTnZrNXdRaTh4aGVOR25hM0xvQ3hEWElrWWtjWGI0aWhwb28wbjJLMklKZEFQb1dzWVktU2YteVN3dW84MmpzdnRkUXlzZWxWam9COVVHZ1h5NkhFcXRvZi12SUx1S2hGcm93U1lkdmJNVXRDbUpYSjRIemlpX1NqaDk?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cy8mk59l5jzo"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-30",
    "image": {
      "src": "/covers/russia-north-korean-missile-kryvyi-rih-family.png",
      "alt": "A residential apartment building gutted by a Russian missile strike in Ukraine",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 30 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Massacre of the Innocents (Gospel of Matthew)",
        "excerpt": "Then Herod, when he saw that he was mocked of the wise men, was exceeding wroth, and sent forth, and slew all the children that were in Bethlehem, and in all the coasts thereof, from two years old and under... In Rama was there a voice heard, lamentation, and weeping, and great mourning, Rachel weeping for her children, and would not be comforted, because they are not.",
        "source": "The Gospel According to Matthew 2:16-18, King James Version (1611).",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Matthew",
        "image": {
          "src": "/covers/russia-north-korean-missile-kryvyi-rih-family--a0.png",
          "alt": "Giotto fresco of the Massacre of the Innocents: soldiers seize infants as mothers wail beneath Herod's throne.",
          "credit": "Giotto di Bondone, Scrovegni Chapel, Padua (c. 1305); Web Gallery of Art / Wikimedia Commons, public domain."
        }
      },
      {
        "category": "historical",
        "title": "The Bombing of Guernica (26 April 1937)",
        "excerpt": "On the market afternoon of 26 April 1937 the German Condor Legion and Italian warplanes, flying for Franco, razed the Basque town of Guernica in three hours of incendiary and high-explosive bombing, cutting down civilians in the streets and burying families in their homes. It became the modern world's byword for the deliberate destruction of a defenceless town from the air, and for one dictatorship lending its aircraft and bombs to another's war, tried out on ordinary families below.",
        "source": "The bombing of Guernica, Spanish Civil War, by the German Condor Legion and Italian Aviazione Legionaria, 26 April 1937 (contemporary archival photograph of the ruins).",
        "href": "https://commons.wikimedia.org/wiki/File:Bundesarchiv_Bild_183-H25224,_Guernica,_Ruinen.jpg",
        "image": {
          "src": "/covers/russia-north-korean-missile-kryvyi-rih-family--a1.png",
          "alt": "Black-and-white photograph of the smoking, gutted ruins of Guernica after the 1937 aerial bombing.",
          "credit": "Bundesarchiv, Bild 183-H25224 / CC-BY-SA 3.0 (via Wikimedia Commons)."
        }
      },
      {
        "category": "literary",
        "title": "The House Falls Upon Job's Children (Book of Job)",
        "excerpt": "While he was yet speaking, there came also another, and said, Thy sons and thy daughters were eating and drinking wine in their eldest brother's house: And, behold, there came a great wind from the wilderness, and smote the four corners of the house, and it fell upon the young men, and they are dead; and I only am escaped alone to tell thee.",
        "source": "The Book of Job 1:18-19, King James Version (1611).",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Job",
        "image": {
          "src": "/covers/russia-north-korean-missile-kryvyi-rih-family--a2.png",
          "alt": "William Blake watercolour of Job's sons and daughters crushed as the house collapses upon them.",
          "credit": "William Blake, 'Job's Sons and Daughters Overwhelmed by Satan' (c. 1805); Wikimedia Commons, public domain."
        }
      },
      {
        "category": "literary",
        "title": "Hecuba's Lament for Astyanax (Euripides, The Trojan Women)",
        "excerpt": "Cold tears, so young, so miserably dead... Dear God, the pattering welcomes of thy feet, / The nursing in my lap; and O, the sweet / Falling asleep together! All is gone.",
        "source": "Euripides, The Trojan Women, trans. Gilbert Murray (1915); Hecuba's lament over the child Astyanax, hurled to death from the walls of Troy.",
        "href": "https://www.gutenberg.org/files/35171/35171-h/35171-h.htm",
        "image": {
          "src": "/covers/russia-north-korean-missile-kryvyi-rih-family--a3.png",
          "alt": "Jacques-Louis David painting of Andromache grieving over the body of Hector, her small son Astyanax beside her.",
          "credit": "Jacques-Louis David, 'Andromache Mourning Hector' (1783), Louvre; Wikimedia Commons, public domain."
        }
      },
      {
        "category": "artistic",
        "title": "Nicolas Poussin, The Massacre of the Innocents",
        "excerpt": "Poussin compresses the whole horror of a slaughtered child into a single frozen instant: a soldier pins a naked infant to the ground with his knee, sword raised, while the mother's mouth is torn open in a scream that seems to ring off the marble architecture behind her. To one side another mother flees with a limp body in her arms. The painting's terrible economy and the open-mouthed cry of the mother became a touchstone of grief in Western art, later haunting Picasso as he composed Guernica.",
        "source": "Nicolas Poussin, 'The Massacre of the Innocents' (c. 1625-29), oil on canvas, Musée Condé, Chantilly.",
        "href": "https://commons.wikimedia.org/wiki/File:Nicolas_Poussin_-_Le_massacre_des_Innocents_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/russia-north-korean-missile-kryvyi-rih-family--a4.png",
          "alt": "Poussin's painting: a soldier about to kill an infant pinned under his knee as the screaming mother tries to stop him.",
          "credit": "Nicolas Poussin, Musée Condé, Chantilly (c. 1625-29); Wikimedia Commons, public domain."
        }
      },
      {
        "category": "artistic",
        "title": "The Coventry Carol (anonymous, 16th century)",
        "excerpt": "Lully, Lulla, thou little tiny child, / Byby, lully lullay... Herod, the king, in his raging, / Charged he hath this day / His men of might, in his own sight, / All young children to slay.",
        "source": "'Coventry Carol,' from the Pageant of the Shearmen and Tailors, Coventry (text recorded by Robert Croo, 1534; melody 1591). A mothers' lullaby-lament for the children doomed by Herod's slaughter.",
        "href": "https://en.wikisource.org/wiki/Coventry_Carol",
        "image": {
          "src": "/covers/russia-north-korean-missile-kryvyi-rih-family--a5.png",
          "alt": "Bruegel's snowbound Flemish village as armoured soldiers ride in and kill children while parents plead in the doorways.",
          "credit": "Pieter Bruegel the Elder, 'The Massacre of the Innocents' (c. 1565-67); Wikimedia Commons, public domain."
        }
      }
    ],
    "rank": 29
  },
  {
    "slug": "danube-record-low-paks-nuclear-shutdown",
    "headline": "A record-low Danube forces Hungary to shut its only nuclear plant, at Paks, as drought grips Central Europe",
    "overview": "Hungary's only nuclear power plant, the Soviet-era Paks station, will shut down entirely for the first time because the River Danube has fallen so low that the plant's cooling-water intakes can no longer reach it, Prime Minister Péter Magyar said. He warned the country's energy supply could turn \"critical\" amid a heatwave near 37C, as the Danube dropped to its lowest level in 30 years across Hungary, Serbia and Romania.",
    "genre": "Climate",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cn0nqv05g0do"
      },
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMirgFBVV95cUxOLWx6YnlNOUNGR0R6QnlpYUpNTWh5N0VtZERiM2tkQ0dfNVBESGNhWVJ5eUM1SnE1Zi1lWFR3ZElUVWdxaVVDRzlJSEh5NkpZdGVLQmk5VnhXRDVUVGpWcGpDVFZJM3lEX09Jd3VyVFJjM3FfTkoxa2Z2cTMyXzlCRUxEZVdvRC0zYXZLY2tUNEtSTjh6cmFOVFpkenpBSTU4NG1UOVZIZklUNER2OXc?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-30",
    "image": {
      "src": "/covers/danube-record-low-paks-nuclear-shutdown.png",
      "alt": "The Paks nuclear power plant on the bank of the Danube in Hungary",
      "credit": "BBC"
    },
    "edition": "Evening Edition · 30 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Cyrus Diverts the Euphrates to Take Babylon (539 BC)",
        "excerpt": "He then turned the Euphrates by a canal into the basin, which was then a marsh, on which the river sank to such an extent that the natural bed of the stream became fordable.",
        "source": "Herodotus, Histories 1.191, trans. George Rawlinson",
        "href": "https://www.livius.org/sources/content/herodotus/cyrus-takes-babylon/",
        "image": {
          "src": "/covers/danube-record-low-paks-nuclear-shutdown--a0.png",
          "alt": "Mezzotint of the fall of Babylon, with Cyrus's forces entering by the lowered bed of the Euphrates",
          "credit": "The Fall of Babylon; Cyrus the Great defeating the Chaldean, mezzotint. Wellcome Collection (Public Domain)"
        }
      },
      {
        "category": "historical",
        "title": "The American Dust Bowl (1930s)",
        "excerpt": "Through the 1930s a merciless drought stripped the southern Great Plains, turning ploughed farmland to powder that rose in towering black walls and buried homesteads. Rivers, wells and topsoil vanished together, and hundreds of thousands of families abandoned a parched land that could no longer sustain them. It stands as the great modern parable of nature overwhelming human enterprise when the water simply runs out.",
        "source": "Dust Bowl drought, Cimarron County, Oklahoma; photograph by Arthur Rothstein, Farm Security Administration, 1936",
        "href": "https://www.loc.gov/pictures/item/2004674127/",
        "image": {
          "src": "/covers/danube-record-low-paks-nuclear-shutdown--a1.png",
          "alt": "A farmer and his sons bent against a blinding dust storm on a barren Oklahoma farm",
          "credit": "Arthur Rothstein, Farm Security Administration, 1936. U.S. Library of Congress (Public Domain)"
        }
      },
      {
        "category": "literary",
        "title": "T. S. Eliot, The Waste Land (1922)",
        "excerpt": "A heap of broken images, where the sun beats, / And the dead tree gives no shelter, the cricket no relief, / And the dry stone no sound of water.",
        "source": "T. S. Eliot, The Waste Land (1922), I. The Burial of the Dead",
        "href": "https://www.gutenberg.org/ebooks/1321",
        "image": {
          "src": "/covers/danube-record-low-paks-nuclear-shutdown--a2.png",
          "alt": "Photographic portrait of the poet T. S. Eliot, 1923",
          "credit": "T. S. Eliot, 1923. Public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Coleridge, The Rime of the Ancient Mariner (1834)",
        "excerpt": "Water, water, every where, / And all the boards did shrink; / Water, water, every where, / Nor any drop to drink.",
        "source": "Samuel Taylor Coleridge, The Rime of the Ancient Mariner, Part II",
        "href": "https://www.gutenberg.org/files/151/151-h/151-h.htm",
        "image": {
          "src": "/covers/danube-record-low-paks-nuclear-shutdown--a3.png",
          "alt": "Gustave Dore engraving of the becalmed mariner gazing over a still, rotting sea beneath a burning sky",
          "credit": "Gustave Doré, illustration for The Rime of the Ancient Mariner (1876). Public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Smetana, \"Vltava\" (The Moldau), from Má vlast (1874)",
        "excerpt": "Smetana's symphonic poem traces a Central European river from two cold mountain springs to a broad, surging flood, its famous rippling theme carrying the current past forests, a peasant wedding, moonlit water nymphs and the rapids of St John. It is music made entirely of a living, flowing river-the very thing the Danube's record low now silences. Heard against a drought that leaves a great river too shrunken to cool a power station, its brimming water-music sounds almost like an elegy.",
        "source": "Bedřich Smetana, Vltava (The Moldau), No. 2 of Má vlast, composed 1874",
        "href": "https://imslp.org/wiki/Vltava,_JB_1:112/2_(Smetana,_Bed%C5%99ich)",
        "image": {
          "src": "/covers/danube-record-low-paks-nuclear-shutdown--a4.png",
          "alt": "Portrait photograph of the Czech composer Bedrich Smetana",
          "credit": "Portrait of Bedřich Smetana. Public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Mihály Munkácsy, Dusty Road (c. 1883)",
        "excerpt": "The Hungarian master paints the Great Plain flattened under a hazy, heat-bleached sky, a lone cart trailing a plume of dust down a cracked, sun-scorched track. Earth and air dissolve into the same parched ochre, and no water is anywhere to be seen. It renders in oil exactly the condition now gripping the Danube basin: a land baked dry, the moisture wrung out of it by relentless heat.",
        "source": "Mihály Munkácsy, Dusty Road II, oil on canvas, c. 1883, Hungarian National Gallery, Budapest",
        "href": "https://commons.wikimedia.org/wiki/File:Munk%C3%A1csy,_Mih%C3%A1ly_-_Dusty_Road_II_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/danube-record-low-paks-nuclear-shutdown--a5.png",
          "alt": "Painting of a parched, dusty road crossing the flat Hungarian plain under a hot hazy sky",
          "credit": "Mihály Munkácsy, Dusty Road II (c. 1883), Hungarian National Gallery. Public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 30
  },
  {
    "slug": "zoox-robotaxi-nhtsa-approval",
    "headline": "Amazon's Zoox wins the first U.S. approval to run paid robotaxis with no steering wheel or pedals",
    "overview": "Amazon's Zoox has become the first company to win a U.S. exemption to charge passengers for rides in purpose-built driverless vehicles that have no steering wheel or pedals, after the National Highway Traffic Safety Administration cleared it to deploy up to 2,500 vehicles a year. The carriage-style electric cars, already testing in Las Vegas and San Francisco, are set to begin paid service in Las Vegas next month.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMitgFBVV95cUxNWnc0dGM0Q3ViQk5QbzEtVXRJeFhHSG5rMGlGQXk1TC1sT3lIRHVjRVpPbUdTdDRkOHVTNk94dnV3RF80TlA1M0xnZHZZcXRwenlhaVBtTlJqcm1fVlpOS1Etb3c2TmZtNXhHZmozZDZPNWp5NHgxazUtQkxieXg5WmIxLUFKRWlsWDVyN2txWlBYOHZXMlVISHhZYlhvRVZIU25KY3E5dlZBLUJYRnRRY0ROX2Ztdw?oc=5"
      },
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMimgFBVV95cUxPcW5yMkRPMXRLa3lOWXZuX2wwbGxoYm5GcHlLS2c4dlJEN2RqUjQ4QWF1cHp1MG9PTnhLY0pzUlBsdFRlOE9fb2xCV3hHVkZhbXMzOGYzaWxpZmNWbHNPSUF4b181emFyUm1uZDJNOURPZmxfWkdEM2R5MlNpdWJzSmp6eXdJWHE5cVBZWF9JbGc2c3lHTndHSTV3?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-30",
    "image": {
      "src": "/covers/zoox-robotaxi-nhtsa-approval.png",
      "alt": "A Zoox autonomous robotaxi with no steering wheel on a San Francisco street",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 30 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Hero of Alexandria's aeolipile — the self-moving machine (1st c. AD)",
        "excerpt": "Place a cauldron over a fire: a ball shall revolve on a pivot. … As the cauldron gets hot it will be found that the steam, entering the ball through E F G, passes out through the bent tubes towards the lid, and causes the ball to revolve, as in the case of the dancing figures.",
        "source": "Hero of Alexandria, Pneumatica, no. 50 (the aeolipile), trans. Bennet Woodcroft, The Pneumatics of Hero of Alexandria (London: Taylor, Walton & Maberly, 1851).",
        "href": "https://archive.org/details/pneumaticsofhero0000hero",
        "image": {
          "src": "/covers/zoox-robotaxi-nhtsa-approval--a0.png",
          "alt": "Engraving of Hero of Alexandria's aeolipile, a steam-driven hollow ball that rotates by itself on a pivot.",
          "credit": "Aeolipile after Hero, from Knight's American Mechanical Dictionary (1876). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "Vaucanson's Digesting Duck — the 18th-century automaton",
        "excerpt": "The Duck stretches out its Neck to take Corn out of your Hand; it swallows it, digests it, and discharges it digested by the usual Passage. You see all the Actions of a Duck that swallows greedily, and doubles the Swiftness in the Motion of its Neck and Throat or Gullet to drive the Food into its Stomach, copied from Nature.",
        "source": "Jacques de Vaucanson, An Account of the Mechanism of an Automaton, or Image Playing on the German-Flute … Together with a Description of an Artificial Duck, trans. J. T. Desaguliers (London, 1742).",
        "href": "https://archive.org/details/b30358711",
        "image": {
          "src": "/covers/zoox-robotaxi-nhtsa-approval--a1.png",
          "alt": "Engraving of Vaucanson's mechanical Digesting Duck showing its internal clockwork.",
          "credit": "Rendering of Vaucanson's digesting duck, Scientific American (1899). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Homer, the self-moving tripods of Hephaestus (Iliad, Book XVIII)",
        "excerpt": "he was making twenty tripods that were to stand by the wall of his house, and he set wheels of gold under them all that they might go of their own selves to the assemblies of the gods, and come back again—marvels indeed to see.",
        "source": "Homer, The Iliad, Book XVIII, trans. Samuel Butler (1898).",
        "href": "https://en.wikisource.org/wiki/The_Iliad_(Butler)/Book_XVIII",
        "image": {
          "src": "/covers/zoox-robotaxi-nhtsa-approval--a2.png",
          "alt": "Diego Velázquez's painting The Forge of Vulcan, showing the smith-god Hephaestus/Vulcan and his workers at the forge.",
          "credit": "Diego Velázquez, La Fragua de Vulcano (1630), Museo del Prado, Madrid. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Ovid, Phaëthon loses the reins of the sun-chariot (Metamorphoses, Book II)",
        "excerpt": "Soon as the steeds have perceived this, they rush on, and leave the beaten track, and run not in the order in which they did before. He himself becomes alarmed; and knows not which way to turn the reins entrusted to him, nor does he know where the way is, nor, if he did know, could he control them.",
        "source": "Ovid, Metamorphoses, Book II (Phaëthon), trans. Henry T. Riley (London, 1851).",
        "href": "https://www.gutenberg.org/cache/epub/21765/pg21765.txt"
      },
      {
        "category": "artistic",
        "title": "Paul Dukas, The Sorcerer's Apprentice (L'apprenti sorcier), 1897",
        "excerpt": "Dukas's symphonic poem sets Goethe's tale of the apprentice who bewitches a broom to fetch water and then cannot make it stop. A jaunty, mechanical ostinato sends the enchanted servant marching, the theme multiplying and accelerating into a flood while the helpless conjurer looks on. It is the sound of a self-operating machine that obeys its command too well, running on without a human hand until the master's word finally halts it.",
        "source": "Paul Dukas, L'apprenti sorcier (The Sorcerer's Apprentice), symphonic poem after Goethe's ballad Der Zauberlehrling, first published A. Durand & Fils, 1897.",
        "href": "https://imslp.org/wiki/L'apprenti_sorcier_(Dukas,_Paul)",
        "image": {
          "src": "/covers/zoox-robotaxi-nhtsa-approval--a4.png",
          "alt": "Ferdinand Barth's 1882 illustration of Goethe's Sorcerer's Apprentice, the enchanted broom carrying pails of water.",
          "credit": "Ferdinand Barth, illustration for Goethe's Der Zauberlehrling (c. 1882). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Peter Paul Rubens, The Fall of Phaeton, c. 1604/1605",
        "excerpt": "Rubens paints the instant the sun-chariot flies apart: Phaethon, having seized the reins of a machine he cannot govern, tumbles headlong as the panicked horses scatter and the wheels break loose across a sky torn by cloud and lightning. Winged Hours and the figures of the zodiac reel around the wreck. It is an image of a splendid vehicle careening out of control the moment its driver proves unequal to it.",
        "source": "Peter Paul Rubens, The Fall of Phaeton, c. 1604/1605 (reworked c. 1606-1608), oil on canvas, National Gallery of Art, Washington, D.C.",
        "href": "https://en.wikipedia.org/wiki/The_Fall_of_Phaeton_(Rubens)",
        "image": {
          "src": "/covers/zoox-robotaxi-nhtsa-approval--a5.png",
          "alt": "Peter Paul Rubens's painting The Fall of Phaeton, the sun-chariot breaking apart as Phaethon and the horses plunge from the sky.",
          "credit": "Peter Paul Rubens, The Fall of Phaeton (c. 1604/1605), National Gallery of Art, Washington. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 31
  },
  {
    "slug": "us-second-quarter-gdp-slowdown",
    "headline": "The U.S. economy grew at a sluggish 1.5% annual rate in the second quarter as inflation stayed above the Fed's target",
    "overview": "U.S. gross domestic product expanded at a 1.5% annual rate from April through June, the Commerce Department estimated, below the 1.8% economists expected and down from 2.1% in the first quarter, as a surge in imports tied to AI investment subtracted from growth. Consumer spending accelerated to a 3.2% pace, but core PCE inflation ran at 3.4% for the quarter, well above the Federal Reserve's 2% goal.",
    "genre": "Economy",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMitgFBVV95cUxNZUM3amF1MFUxODRGUWdydTZvZC1MS0Y4eVM5NzF3WWg2TUN5azdjWGJUZW1tc2pqMkhmbFRreXZ1VTNHNHRqdmg1a2ZHVHdDMFloVzRNMmd5SGhXdFMxdXBkV2tuMXY0X21pX0oxMHVwTHdWeU5pWmcwOUxWbEREUFhmOTc2UzFUQzRENkxBMHlodzZfRFV5VVVBVFdmLXROamEtNjBKbUtBM0dGNzNSS3ZJWTE5dw?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiqwFBVV95cUxObWh4Um5od3luS0pRM0hOYTNwN0Z4bElZWFBXVDRRdFFVT2FpejU4ZkQ3MTVuY3hYb1NpMVd4QXV4WFhFMFUwbTRCbGs2cGlPOW11LWUxdzFyRnU0a0cwZU02b0s5b012M0p3Y2prV25KT0RQd3BGZk52aWNlanFDSDh5UTRRUVYtc2lsSm1RWjM4MjlzMXFCcEVrVjNvYVNzN3pNTm1zU2ZpV1U?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-30",
    "image": {
      "src": "/covers/us-second-quarter-gdp-slowdown.png",
      "alt": "The Marriner S. Eccles Federal Reserve building in Washington",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 30 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Joseph and the Seven Fat and Seven Lean Years of Egypt",
        "excerpt": "Behold, there come seven years of great plenty throughout all the land of Egypt: And there shall arise after them seven years of famine; and all the plenty shall be forgotten in the land of Egypt; and the famine shall consume the land; And the plenty shall not be known in the land by reason of that famine following; for it shall be very grievous.",
        "source": "Genesis 41:29-31, King James Version (1611)",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Genesis",
        "image": {
          "src": "/covers/us-second-quarter-gdp-slowdown--a0.png",
          "alt": "Joseph interpreting Pharaoh's dream of the fat and lean years, fresco by Peter von Cornelius",
          "credit": "Peter von Cornelius (1816-1817), Alte Nationalgalerie, Berlin; via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "historical",
        "title": "The Great Inflation and 1970s Stagflation",
        "excerpt": "For more than a decade after 1965 the American economy suffered the strange affliction that broke the old rulebook: prices climbed relentlessly even as growth stalled and jobs grew scarce. Oil shocks, loose money, and dashed expectations combined so that a dollar bought less each month while the engine of production sputtered. Economists coined a new word, stagflation, for a malady that was supposed to be impossible, and Americans queued at gas pumps as the measured fortunes of the nation slid backward.",
        "source": "Michael Bryan, 'The Great Inflation, 1965-1982,' Federal Reserve History",
        "href": "https://www.federalreservehistory.org/essays/great-inflation",
        "image": {
          "src": "/covers/us-second-quarter-gdp-slowdown--a1.png",
          "alt": "Cars lined up at a gas station during the 1979 fuel shortage",
          "credit": "Warren K. Leffler, U.S. News & World Report, 1979; Library of Congress via Wikimedia Commons (no known copyright restrictions)"
        }
      },
      {
        "category": "literary",
        "title": "Wordsworth, 'The world is too much with us'",
        "excerpt": "The world is too much with us; late and soon, / Getting and spending, we lay waste our powers: / Little we see in Nature that is ours; / We have given our hearts away, a sordid boon!",
        "source": "William Wordsworth, 'The world is too much with us,' in Poems (1815)",
        "href": "https://en.wikisource.org/wiki/Poems_(Wordsworth,_1815)/Volume_2/The_World_is_too_much_with"
      },
      {
        "category": "literary",
        "title": "Ecclesiastes on Silver, Abundance, and Vanity",
        "excerpt": "He that loveth silver shall not be satisfied with silver; nor he that loveth abundance with increase: this is also vanity. When goods increase, they are increased that eat them: and what good is there to the owners thereof, saving the beholding of them with their eyes?",
        "source": "Ecclesiastes 5:10-11, King James Version (1611)",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Ecclesiastes"
      },
      {
        "category": "artistic",
        "title": "Pieter Bruegel the Elder, 'The Harvesters' (1565)",
        "excerpt": "Bruegel spreads a golden August across the panel: a wall of ripe wheat, sheaves already cut, and peasants who pause from the sickle to eat bread and drink in the shade of a pear tree. The scene fuses getting and spending in a single field, labor and consumption caught in one breath, while the hazy valley beyond hints that this plenty is a season, not a permanence. It is a painting of the fat years, alive to how quickly the standing corn becomes stubble.",
        "source": "Pieter Bruegel the Elder, The Harvesters, 1565, oil on wood; The Metropolitan Museum of Art, New York",
        "href": "https://www.metmuseum.org/art/collection/search/435809",
        "image": {
          "src": "/covers/us-second-quarter-gdp-slowdown--a4.png",
          "alt": "Peasants harvesting and resting to eat in a golden wheat field under a hazy summer sky",
          "credit": "Pieter Bruegel the Elder, 'The Harvesters' (1565), Metropolitan Museum of Art; via Wikimedia Commons / Google Art Project (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Haydn, 'The Seasons' (Die Jahreszeiten, 1801)",
        "excerpt": "Haydn's late oratorio turns the agricultural year into music, moving from spring's hopeful sowing through summer's storms to autumn's brimming harvest and winter's want. Its choruses give thanks for a bountiful crop, its arias paint the plowman whistling at his toil, and its close reckons the fruits of an entire year's labor against the coming cold. The work makes audible the same cycle the economy still runs on: the fat season stored up against the lean, plenty measured out against scarcity.",
        "source": "Joseph Haydn, Die Jahreszeiten (The Seasons), Hob. XXI:3, libretto by Gottfried van Swieten after James Thomson, first performed 1801",
        "href": "https://imslp.org/wiki/Die_Jahreszeiten,_Hob.XXI:3_(Haydn,_Joseph)",
        "image": {
          "src": "/covers/us-second-quarter-gdp-slowdown--a5.png",
          "alt": "Title page of the first edition of Haydn's oratorio Die Jahreszeiten (The Seasons)",
          "credit": "First edition title page of Haydn's 'Die Jahreszeiten' (1801); via Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 32
  },
  {
    "slug": "eu-ai-gigafactories-funding",
    "headline": "The EU offers 10 billion euros to help build seven AI 'gigafactories' to close the gap with the U.S. and China",
    "overview": "The European Commission unveiled 10 billion euros ($11.4 billion) in public funding to help firms build seven AI \"gigafactories,\" hoping to draw a further 20 billion euros in private investment and more than double the bloc's computing power. Executive vice-president Henna Virkkunen called large-scale computing \"a strategic necessity for Europe,\" which lags the United States and China in AI infrastructure.",
    "genre": "Technology",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMiogFBVV95cUxQVFNqbzNnRFJqQnF4UWlSb2wxMTNzSW1HQV8tMmVZRE9RQzhnSjBNczNDb0FxRDExVEd5MlMzWnJ2UWZTSlNLR1UtS25ldmZVcUYzazRrTFczOEMzLU4wNUlSMFN5cW1SbjhBWGQ2bzEzMzJwVnlMM0NlUVViOVhERVpOaGM1ZU9aYV9KSm5NZ3dYbXJsTzlaRjEtV2I3VFEwUWc?oc=5"
      },
      {
        "name": "The Washington Post",
        "href": "https://www.washingtonpost.com/business/2026/07/30/eu-ai-gigafactories-china-us-data-center/d50cbea6-8bfd-11f1-8912-d71e69d679d7_story.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-30",
    "image": {
      "src": "/covers/eu-ai-gigafactories-funding.png",
      "alt": "Rows of servers in a data centre",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 30 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Cheops mobilizes Egypt to build the Great Pyramid (Herodotus, Histories 2.124)",
        "excerpt": "he then bade all the Egyptians work for him... they worked by a hundred thousand men at a time, for each three months continually... For the making of the pyramid itself there passed a period of twenty years.",
        "source": "Herodotus, The History of Herodotus, Book II (Euterpe), section 124, trans. G. C. Macaulay (1890)",
        "href": "https://www.gutenberg.org/cache/epub/2707/pg2707-images.html",
        "image": {
          "src": "/covers/eu-ai-gigafactories-funding--a0.png",
          "alt": "The Great Pyramid of Giza (Khufu / Cheops)",
          "credit": "Photo: Nina Aldin Thune, CC BY-SA 3.0, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "Kennedy's 'Sputnik moment' Apollo pledge at Rice University (1962)",
        "excerpt": "We choose to go to the moon in this decade and do the other things, not because they are easy, but because they are hard, because that goal will serve to organize and measure the best of our energies and skills, because that challenge is one that we are willing to accept, one we are unwilling to postpone, and one which we intend to win, and the others, too.",
        "source": "John F. Kennedy, Address at Rice University on the Nation's Space Effort, September 12, 1962",
        "href": "https://en.wikisource.org/wiki/We_choose_to_go_to_the_Moon",
        "image": {
          "src": "/covers/eu-ai-gigafactories-funding--a1.png",
          "alt": "Apollo 11 Saturn V rocket lifting off, July 16, 1969",
          "credit": "NASA (photo KSC-69PC-442), public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "The Tower of Babel (Genesis 11:4)",
        "excerpt": "And they said, Go to, let us build us a city and a tower, whose top may reach unto heaven; and let us make us a name, lest we be scattered abroad upon the face of the whole earth.",
        "source": "Genesis 11:4, The Holy Bible, King James Version",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Genesis",
        "image": {
          "src": "/covers/eu-ai-gigafactories-funding--a2.png",
          "alt": "Gustave Doré, The Confusion of Tongues, engraving of the Tower of Babel",
          "credit": "Gustave Doré (c. 1865), public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Salomon's House, the state house of invention in Bacon's New Atlantis",
        "excerpt": "The end of our foundation is the knowledge of causes, and secret motions of things; and the enlarging of the bounds of human empire, to the effecting of all things possible.",
        "source": "Francis Bacon, New Atlantis (1626)",
        "href": "https://www.gutenberg.org/files/2434/2434-h/2434-h.htm",
        "image": {
          "src": "/covers/eu-ai-gigafactories-funding--a3.png",
          "alt": "1620 frontispiece of Bacon's Instauratio Magna: a ship sailing out past the Pillars of Hercules",
          "credit": "Engraving by Simon van de Passe, 1620, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Pieter Bruegel the Elder, The Tower of Babel (1563)",
        "excerpt": "Bruegel's vast panel piles storey upon storey of a spiralling brick colossus that dwarfs the harbour and city at its feet, its upper tiers lost in cloud while the lower arches are still raw scaffolding swarming with cranes, quarried stone and antlike laborers. The tower already leans and cracks even as it climbs, a portrait of colossal collective ambition and the overreach of a mega-project straining beyond human limits.",
        "source": "Pieter Bruegel the Elder, The Tower of Babel, 1563, oil on panel, Kunsthistorisches Museum, Vienna",
        "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_the_Elder_-_The_Tower_of_Babel_(Vienna)_-_Google_Art_Project_-_edited.jpg",
        "image": {
          "src": "/covers/eu-ai-gigafactories-funding--a4.png",
          "alt": "Pieter Bruegel the Elder, The Tower of Babel (1563), Vienna panel",
          "credit": "Pieter Bruegel the Elder, 1563, Kunsthistorisches Museum Vienna, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Alexander Mosolov, Zavod ('Iron Foundry'), Op. 19 (1926-27)",
        "excerpt": "In this four-minute orchestral episode from the ballet Steel, hammering ostinatos, grinding brass and a rattling shaken metal sheet turn the orchestra itself into a working blast furnace. Written for the tenth anniversary of the Revolution, it is machine-age music as state spectacle, glorifying heavy industry and mass production as the very sound of a nation forging its future.",
        "source": "Alexander Mosolov, Zavod (The Iron Foundry), Op. 19, orchestral episode from the ballet Steel, premiered 1927",
        "href": "https://imslp.org/wiki/Steel,_Op.19_(Mosolov,_Alexander)",
        "image": {
          "src": "/covers/eu-ai-gigafactories-funding--a5.png",
          "alt": "Molten pig iron poured into an open hearth furnace at the Jones and Laughlin Steel Company, Pittsburgh",
          "credit": "U.S. National Archives (NARA 535922), public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 33
  },
  {
    "slug": "kenya-cyanide-pesticide-elephants",
    "headline": "Cyanide from a tomato-farm pesticide is suspected of killing 15 elephants near Kenya's Amboseli park",
    "overview": "Fifteen elephants found dead just outside Amboseli National Park in southern Kenya are believed to have been poisoned after eating tomatoes sprayed with pesticides on nearby farms, the Kenya Wildlife Service said, with preliminary tests finding cyanide in the carcasses. Officials ruled out foul play and called it the first elephant die-off on this scale in the region in decades, raising alarm over farming encroaching on wildlife.",
    "genre": "Science",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cp9e0v5xmdyo"
      },
      {
        "name": "Citizen Digital",
        "href": "https://citizen.digital/article/cyanide-poisoning-killed-15-elephants-in-amboseli-kws-confirms-n387362"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-30",
    "image": {
      "src": "/covers/kenya-cyanide-pesticide-elephants.png",
      "alt": "A family of elephants in Amboseli National Park, Kenya",
      "credit": "BBC"
    },
    "edition": "Evening Edition · 30 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Rachel Carson's Silent Spring and the DDT reckoning",
        "excerpt": "In 1962 Rachel Carson's Silent Spring warned that the pesticides broadcast across American farmland, DDT and its chemical kin, were seeping through the food web to poison birds, fish and mammals the sprayers never meant to touch. She conjured a countryside gone silent, its songbirds killed by the very chemistry meant to guard the crops, and cast such deaths as an indictment of humanity's carelessness toward the living world. The book named the exact pattern now unfolding beside Amboseli: farm poison spreading outward from the field to kill the wild creatures at its edge.",
        "source": "Rachel Carson, Silent Spring (Boston: Houghton Mifflin, 1962).",
        "href": "https://www.acs.org/education/whatischemistry/landmarks/rachel-carson-silent-spring.html",
        "image": {
          "src": "/covers/kenya-cyanide-pesticide-elephants--a0.png",
          "alt": "A man demonstrating handheld DDT spraying equipment, mid-20th century",
          "credit": "U.S. Centers for Disease Control and Prevention, Public Health Image Library (public domain)"
        }
      },
      {
        "category": "historical",
        "title": "The near-extermination of the American bison, 19th century",
        "excerpt": "The wild buffalo is practically gone forever, and in a few more years, when the whitened bones of the last bleaching skeleton shall have been picked up and shipped East for commercial uses, nothing will remain of him save his old, well-worn trails along the water-courses, a few museum specimens, and regret for his fate.",
        "source": "William T. Hornaday, The Extermination of the American Bison (Washington: Government Printing Office, 1889).",
        "href": "https://www.gutenberg.org/ebooks/17748",
        "image": {
          "src": "/covers/kenya-cyanide-pesticide-elephants--a1.png",
          "alt": "A mountainous pile of American bison skulls awaiting industrial processing, Michigan, 1892",
          "credit": "Photographer unknown; Burton Historical Collection, Detroit Public Library (public domain), via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "William Blake, 'Auguries of Innocence'",
        "excerpt": "A Robin Red breast in a Cage / Puts all Heaven in a Rage.",
        "source": "William Blake, 'Auguries of Innocence' (from the Pickering Manuscript, c. 1803).",
        "href": "https://en.wikisource.org/wiki/The_Pickering_Manuscript/Auguries_of_Innocence",
        "image": {
          "src": "/covers/kenya-cyanide-pesticide-elephants--a2.png",
          "alt": "Portrait of poet William Blake in oils by Thomas Phillips, 1807",
          "credit": "Thomas Phillips, 1807; National Portrait Gallery, London (public domain) via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "George Orwell, 'Shooting an Elephant'",
        "excerpt": "In Orwell's 1936 essay a colonial policeman in Burma is pressured into shooting a working elephant that has run wild, and he fires against his own conscience only to please the crowd. The great beast does not die cleanly: it sinks slowly to its knees, breath still labouring in agonised gasps long after the fatal shots, its ruin drawn out and pitiable. The scene fixes on the terrible spectacle of an enormous, dignified animal brought low by human hands, and on the shame of a killing that solved nothing, an unease that shadows any encounter in which people destroy the majestic creatures they live beside.",
        "source": "George Orwell, 'Shooting an Elephant', in New Writing, no. 2 (Autumn 1936); collected in Shooting an Elephant and Other Essays (1950).",
        "href": "https://www.orwellfoundation.com/the-orwell-foundation/orwell/essays-and-other-works/shooting-an-elephant/"
      },
      {
        "category": "artistic",
        "title": "Camille Saint-Saëns, 'The Elephant' from The Carnival of the Animals",
        "excerpt": "Composed in 1886, Saint-Saëns's 'L'Éléphant' hands a waltz tune to the double bass, the orchestra's most ponderous voice, so that a melody borrowed from Berlioz and Mendelssohn lumbers along with heavy, comic grace. Beneath the humour the movement makes the listener feel the sheer bulk and lumbering dignity of the animal, a musical portrait of a great beast in motion, the very majesty that is extinguished when such creatures are found poisoned and still.",
        "source": "Camille Saint-Saëns, 'L'Éléphant', No. 5 of Le carnaval des animaux (1886; first published 1922).",
        "href": "https://imslp.org/wiki/Le_carnaval_des_animaux_(Saint-Sa%C3%ABns,_Camille)",
        "image": {
          "src": "/covers/kenya-cyanide-pesticide-elephants--a4.png",
          "alt": "Photographic portrait of composer Camille Saint-Saëns, 1900",
          "credit": "Pierre Petit, 1900 (public domain); via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Rembrandt van Rijn, 'An Elephant' (Hansken), 1637",
        "excerpt": "Rembrandt drew this elephant from life in Amsterdam in 1637, working in soft black chalk. The animal, a performing elephant named Hansken, is rendered with tender attention to her wrinkled hide, heavy limbs and gentle bearing, a living creature observed with wonder rather than a trophy or a curiosity. The drawing preserves the quiet majesty of a single great beast, the same presence mourned when fifteen elephants are found dead at a field's edge.",
        "source": "Rembrandt Harmenszoon van Rijn, An Elephant (Hansken), 1637, black chalk on paper, Albertina, Vienna (inv. 17558).",
        "href": "https://commons.wikimedia.org/wiki/File:Rembrandt_Harmenszoon_van_Rijn_-_An_Elephant,_1637_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/kenya-cyanide-pesticide-elephants--a5.png",
          "alt": "Rembrandt's 1637 black-chalk drawing of an elephant seen in profile",
          "credit": "Rembrandt van Rijn, 1637; Albertina, Vienna, via Google Art Project / Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 34
  },
  {
    "slug": "watts-towers-renovation-los-angeles",
    "headline": "Los Angeles will begin a $22 million renovation of Simon Rodia's Watts Towers in October",
    "overview": "A $22 million project to restore and expand the campus around the Watts Towers — the 17 interlaced spires the Italian immigrant Sabato \"Simon\" Rodia built by hand in Los Angeles between 1921 and 1954 from steel, mortar, broken tile and shells — is set to break ground in October and finish before the 2028 Olympics. Funded in part by a $10.1 million Bezos Earth Fund grant, the plan adds green space and climate-resilient landscaping after an earlier 15-year conservation effort stalled.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Artforum",
        "href": "https://www.artforum.com/news/22-million-renovation-of-la-watts-towers-to-begin-1234756029/"
      },
      {
        "name": "Office of the Mayor of Los Angeles",
        "href": "https://mayor.lacity.gov/news/mayor-bass-celebrates-major-milestone-watts-towers-arts-center-campus-improvements-move"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-30",
    "image": {
      "src": "/covers/watts-towers-renovation-los-angeles.png",
      "alt": "Simon Rodia's Watts Towers rising over Los Angeles",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 30 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Ferdinand Cheval's Palais idéal (1879-1912)",
        "excerpt": "A rural French postman, Ferdinand Cheval, spent thirty-three years building a fantastical palace entirely by hand from stones he gathered on his daily mail route, binding them with mortar into grottoes, towers, and sculpted beasts. Working alone and untrained, he raised an outsider-art marvel from cast-off pebbles and shells, carving into it his own defiant inscription that anyone more stubborn than he should try to do better. Like Rodia's spires, it is a lone visionary's lifetime dream made permanent in stone.",
        "source": "Ferdinand Cheval, Le Palais idéal du Facteur Cheval, Hauterives, France (built 1879-1912).",
        "href": "https://en.wikipedia.org/wiki/Ferdinand_Cheval",
        "image": {
          "src": "/covers/watts-towers-renovation-los-angeles--a0.png",
          "alt": "The east facade of Ferdinand Cheval's hand-built Palais idéal in Hauterives, France",
          "credit": "Photograph by Ankopedia, 2006; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "Cologne Cathedral (begun 1248, completed 1880)",
        "excerpt": "Begun in 1248, Cologne Cathedral rose only partway before work halted around 1473, leaving its unfinished south tower crowned for four centuries by a medieval wooden crane that became the city's skyline. The project was revived in the 19th century and finally completed in 1880, more than six hundred years after the first stone. Its stalled-then-resumed construction and the perpetual labor of preserving a fragile Gothic masterpiece mirror the Watts Towers' own interrupted conservation.",
        "source": "Cologne Cathedral (Kölner Dom), Cologne, Germany, constructed 1248-1880.",
        "href": "https://en.wikipedia.org/wiki/Cologne_Cathedral",
        "image": {
          "src": "/covers/watts-towers-renovation-los-angeles--a1.png",
          "alt": "Photograph of the unfinished Cologne Cathedral in 1865, its south tower still topped by the medieval crane",
          "credit": "Photograph by J. H. & Th. Schönscheidt, 1865; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Percy Bysshe Shelley, \"Ozymandias\" (1818)",
        "excerpt": "And on the pedestal these words appear: / \"My name is Ozymandias, king of kings: / Look on my works, ye Mighty, and despair!\" / Nothing beside remains. Round the decay / Of that colossal wreck, boundless and bare / The lone and level sands stretch far away.",
        "source": "Percy Bysshe Shelley, \"Ozymandias,\" in Rosalind and Helen, A Modern Eclogue; with Other Poems (London: C. and J. Ollier, 1819).",
        "href": "https://en.wikisource.org/wiki/Rosalind_and_Helen,_A_Modern_Eclogue_(1819)/Sonnet",
        "image": {
          "src": "/covers/watts-towers-renovation-los-angeles--a2.png",
          "alt": "The colossal granite bust of Ramesses II, the 'Younger Memnon,' in the British Museum, the statue that inspired Shelley's poem",
          "credit": "The 'Younger Memnon' (Ramesses II), British Museum; photograph via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Horace, Odes 3.30, \"Exegi monumentum\" (23 BC)",
        "excerpt": "Exegi monumentum aere perennius / regalique situ pyramidum altius, / quod non imber edax, non aquilo impotens / possit diruere aut innumerabilis / annorum series et fuga temporum.",
        "source": "Quintus Horatius Flaccus, Carmina (Odes), Book III, Ode 30, lines 1-5.",
        "href": "https://la.wikisource.org/wiki/Carmina_(Horatius)/Liber_III/Carmen_XXX",
        "image": {
          "src": "/covers/watts-towers-renovation-los-angeles--a3.png",
          "alt": "Imaginary portrait of the Roman poet Horace",
          "credit": "Imaginary portrait by Anton von Werner (d. 1915); public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Pieter Bruegel the Elder, The Tower of Babel (1563)",
        "excerpt": "Bruegel's panel shows an immense spiraling tower rising in tiers toward the clouds, swarming with cranes, scaffolds, and tiny laborers, its lower stories already weathering even as the upper courses climb. The painting captures both the grandeur of a monumental human structure raised course by course and the fragility and hubris of any attempt to build toward the heavens. It is the archetypal image of a marvel assembled by hand out of countless small pieces.",
        "source": "Pieter Bruegel the Elder, The Tower of Babel, 1563, oil on panel, Kunsthistorisches Museum, Vienna (inv. GG_1026).",
        "href": "https://en.wikipedia.org/wiki/The_Tower_of_Babel_(Bruegel)",
        "image": {
          "src": "/covers/watts-towers-renovation-los-angeles--a4.png",
          "alt": "Pieter Bruegel the Elder's 1563 painting of the Tower of Babel under construction",
          "credit": "Pieter Bruegel the Elder, 1563, Kunsthistorisches Museum, Vienna; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Modest Mussorgsky, \"The Great Gate of Kiev\" from Pictures at an Exhibition (1874)",
        "excerpt": "The suite's triumphant final movement translates architecture into sound: Mussorgsky was inspired by his late friend Viktor Hartmann's never-built design for a monumental stone city gate at Kiev. Massive, bell-like chords and a broadening hymn evoke a grand structure rising in imagination, a monument that could only ever be completed in art. It is a vision of a soaring gateway conjured from a single artist's drawings, much as Rodia's towers rose from one man's private vision.",
        "source": "Modest Mussorgsky, \"The Great Gate of Kiev,\" No. 10 of Pictures at an Exhibition, piano suite, 1874.",
        "href": "https://imslp.org/wiki/Pictures_at_an_Exhibition_(Mussorgsky,_Modest)",
        "image": {
          "src": "/covers/watts-towers-renovation-los-angeles--a5.png",
          "alt": "Viktor Hartmann's 1869 watercolor design for a monumental city gate at Kiev, which inspired Mussorgsky's movement",
          "credit": "Viktor Hartmann, Plan for a City Gate in Kiev, 1869, watercolor; public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 35
  },
  {
    "slug": "milei-argentina-deport-decree",
    "headline": "Milei signs a decree letting Argentina bar or deport foreigners who incite hatred against Argentines",
    "overview": "President Javier Milei signed an emergency decree empowering Argentina to deny entry to, deport, or revoke the visas of foreigners found to have promoted hatred or violence against Argentines or to have desecrated national symbols. The move follows weeks of international backlash Milei calls an \"anti-Argentina campaign,\" which has spiraled into a diplomatic crisis with Brazil; the decree exempts protected political, academic and civic criticism.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMijgFBVV95cUxOUDhveWdjTHFlTVpVLS14emJtaC1KYk5RcG5uMGFoRmQtd0VNVEc4WUlJY1VFd0lGa2FWbzdDNmlBNmRGbUJaamNKUFBScXk5WUhLNGxQYlV2TEpMYWFmczNJM3NRandsRWFjUThDRFRfblEtenh1MThUNEJ5MUhWSG5ENHplX29jWURUR0x3?oc=5"
      },
      {
        "name": "Buenos Aires Times",
        "href": "https://www.batimes.com.ar/news/argentina/milei-signs-decree-allowing-argentina-to-bar-or-expel-foreigners-over-hate-speech.phtml"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-30",
    "image": {
      "src": "/covers/milei-argentina-deport-decree.png",
      "alt": "The Casa Rosada, Argentina's presidential palace, in Buenos Aires",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 30 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Ostracism of Aristides 'the Just' at Athens (482 BC)",
        "excerpt": "As therefore, they were writing the names on the sherds, it is reported that an illiterate clownish fellow, giving Aristides his sherd, supposing him a common citizen, begged him to write Aristides upon it; and he being surprised and asking if Aristides had ever done him any injury, 'None at all,' said he, 'neither know I the man; but I am tired of hearing him everywhere called the just.'",
        "source": "Plutarch, Life of Aristides, ch. 7, trans. John Dryden, rev. Arthur Hugh Clough. Athenian ostracism let the assembly banish a citizen for ten years by potsherd vote, with no charge, trial, or defense.",
        "href": "https://classics.mit.edu/Plutarch/aristide.html",
        "image": {
          "src": "/covers/milei-argentina-deport-decree--a0.png",
          "alt": "Ancient Athenian ostraka (inscribed pottery shards) used to vote a citizen into exile, 482 BC, Museum of the Ancient Agora, Athens",
          "credit": "Photo: Carole Raddato, Frankfurt (CC BY-SA 2.0), via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "The Alien Friends Act of 1798",
        "excerpt": "it shall be lawful for the President of the United States at any time during the continuance of this act, to order all such aliens as he shall judge dangerous to the peace and safety of the United States, or shall have reasonable grounds to suspect are concerned in any treasonable or secret machinations against the government thereof, to depart out of the territory of the United States",
        "source": "An Act Concerning Aliens (the Alien Friends Act), June 25, 1798, 1 Stat. 570, 5th U.S. Congress. Signed amid the anti-French 'Quasi-War' panic, it let President John Adams deport any non-citizen he alone deemed dangerous, without trial.",
        "href": "https://en.wikisource.org/wiki/United_States_Statutes_at_Large/Volume_1/5th_Congress/2nd_Session/Chapter_58",
        "image": {
          "src": "/covers/milei-argentina-deport-decree--a1.png",
          "alt": "Portrait of President John Adams, who signed and could enforce the 1798 Alien Friends Act, by Gilbert Stuart",
          "credit": "Gilbert Stuart, c. 1800-1815, National Gallery of Art, Washington (CC0), via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Ovid, Tristia — the poet's last night in Rome before exile",
        "excerpt": "Cum subit illius tristissima noctis imago, / quae mihi supremum tempus in urbe fuit,",
        "source": "Ovid, Tristia 1.3.1-2 (Latin). 'When there steals upon me the saddest image of that night which was my last hour in the city.' Ovid was relegated by the Emperor Augustus to Tomis on the Black Sea in AD 8, banished, he wrote, for 'carmen et error' — a poem and a mistake.",
        "href": "https://www.thelatinlibrary.com/ovid/ovid.tristia1.shtml",
        "image": {
          "src": "/covers/milei-argentina-deport-decree--a2.png",
          "alt": "Eugène Delacroix, 'Ovid among the Scythians,' showing the exiled poet among strangers in his place of banishment",
          "credit": "Eugène Delacroix, 1862, The Metropolitan Museum of Art (public domain / open access), via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Shakespeare, Richard II — the banishment of Mowbray",
        "excerpt": "The language I have learn'd these forty years, / My native English, now I must forego:",
        "source": "William Shakespeare, King Richard II, Act 1, Scene 3. Thomas Mowbray, sentenced to perpetual banishment by the king, laments that exile robs him of his own tongue and homeland — punishment by expulsion for a quarrel of words at court.",
        "href": "https://shakespeare.mit.edu/richardii/richardii.1.3.html",
        "image": {
          "src": "/covers/milei-argentina-deport-decree--a3.png",
          "alt": "The Westminster Portrait of King Richard II of England, the monarch who decrees banishment in Shakespeare's play",
          "credit": "Anonymous, 1390s, Westminster Abbey, London (public domain), via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Verdi, 'Va, pensiero' (Chorus of the Hebrew Slaves), from Nabucco",
        "excerpt": "Va, pensiero, sull'ali dorate; / va, ti posa sui clivi, sui colli, / ove olezzano tepide e molli / l'aure dolci del suolo natal!",
        "source": "Giuseppe Verdi, Nabucco (1842), Part III; libretto by Temistocle Solera after Psalm 137. The chorus of the Hebrews, deported to Babylon, sends its thoughts on golden wings back to the lost homeland; it became an anthem of a nation under foreign domination.",
        "href": "https://imslp.org/wiki/Nabucco_(Verdi,_Giuseppe)",
        "image": {
          "src": "/covers/milei-argentina-deport-decree--a4.png",
          "alt": "Eduard Bendemann, 'The Mourning Jews in Exile,' depicting the Babylonian captivity of Psalm 137 that inspired 'Va, pensiero'",
          "credit": "Eduard Bendemann, c. 1832, Wallraf-Richartz Museum, Cologne (public domain), via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Masaccio, The Expulsion from the Garden of Eden",
        "excerpt": "Adam and Eve stagger through the gate of Paradise beneath a red-robed, black-winged angel who drives them out with a sword. Eve howls with her head flung back and her hands covering her body; Adam buries his face in his palms, doubled over with shame. In this stark fresco Masaccio renders the archetypal banishment — the first exiles cast from their homeland for a transgression against a higher authority, condemned to wander outside the walls forever.",
        "source": "Masaccio, 'Cacciata dei progenitori dall'Eden' (The Expulsion of Adam and Eve from Eden), fresco, c. 1425, Brancacci Chapel, Santa Maria del Carmine, Florence.",
        "href": "https://en.wikipedia.org/wiki/The_Expulsion_from_the_Garden_of_Eden",
        "image": {
          "src": "/covers/milei-argentina-deport-decree--a5.png",
          "alt": "Masaccio's fresco of Adam and Eve expelled from Eden by a sword-bearing angel, faces contorted in grief",
          "credit": "Masaccio, c. 1425, Brancacci Chapel, Florence (public domain), via Wikimedia Commons"
        }
      }
    ],
    "rank": 36
  },
  {
    "slug": "saudi-red-sea-maritime-coalition",
    "headline": "Saudi Arabia unveils a multinational Red Sea maritime coalition after Houthi attacks on shipping",
    "overview": "Saudi Arabia proposed a multinational maritime defense coalition to protect shipping and energy routes in the Red Sea, the Bab el-Mandeb Strait and the Gulf of Aden, with representatives of 43 countries and the European Union attending a founding meeting in which Riyadh offered to lead and host the alliance. The initiative follows a wave of attacks by Yemen's Iran-aligned Houthis, who declared a naval blockade of Saudi Arabia on 20 July.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMivgFBVV95cUxQVVV1X2lpNHZQWlFIclZsaER1azctU1NVTk5FcjhEYTVULU9NU1JibElRWUYzWllrZFRKY3NiYVRKdnVhS0hoWkRMeWczMnZXX2Y0UnNrMlVPQzN5QWRnMVFacTBPQkNEZ29BTzh0M2dRSU9BZ1ZZNmN0RHoxaE5GbW5aR3NETW5fREF6UklGUHo5ZkM3NTVDdHpkUXNFY0hWZmxUZHB0aEk1NDBtUEd2VTJqV2RwazVoY0lPYnhR?oc=5"
      },
      {
        "name": "Al Jazeera",
        "href": "https://www.aljazeera.com/news/2026/7/30/saudi-arabia-announces-maritime-defence-alliance-to-secure-vital-waterways"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-30",
    "image": {
      "src": "/covers/saudi-red-sea-maritime-coalition.png",
      "alt": "A naval warship escorting shipping in the Gulf of Aden",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 30 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Pompey Clears the Mediterranean of Pirates (67 BC)",
        "excerpt": "This piratic power having got the dominion and control of all the Mediterranean, there was left no place for navigation or commerce. And this it was which most of all made the Romans, finding themselves to be extremely straitened in their markets, and considering that if it should continue, there would be a dearth and famine in the land, determine at last to send out Pompey to recover the seas from the pirates.",
        "source": "Plutarch, Life of Pompey, ch. 24-25, trans. John Dryden (rev. A. H. Clough)",
        "href": "https://en.wikisource.org/wiki/Plutarch%27s_Lives_(Clough)/Life_of_Pompey",
        "image": {
          "src": "/covers/saudi-red-sea-maritime-coalition--a0.png",
          "alt": "Roman marble bust of Pompey the Great, Louvre Museum",
          "credit": "Bust of Pompey, Louvre; photo via Wikimedia Commons, CC BY-SA 4.0"
        }
      },
      {
        "category": "historical",
        "title": "Jefferson Sends a Squadron in the First Barbary War (1801)",
        "excerpt": "Tripoli, the least considerable of the Barbary States, had come forward with demands unfounded either in right or in compact, and had permitted itself to denounce war, on our failure to comply before a given day. ... I sent a small squadron of frigates into the Mediterranean, with assurances to that power of our sincere desire to remain in peace, but with orders to protect our commerce against the threatened attack.",
        "source": "Thomas Jefferson, First Annual Message to Congress, December 8, 1801",
        "href": "https://avalon.law.yale.edu/19th_century/jeffmes1.asp",
        "image": {
          "src": "/covers/saudi-red-sea-maritime-coalition--a1.png",
          "alt": "The U.S. schooner Enterprise capturing the Tripolitan corsair Tripoli, 1 August 1801",
          "credit": "Capt. William Bainbridge Hoff, USN (1878), U.S. Naval History collection, public domain via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "The Odyssey: The Strait of Scylla and Charybdis",
        "excerpt": "Three times in the day does she vomit forth her waters, and three times she sucks them down again ... you must hug the Scylla side and drive your ship by as fast as you can, for you had better lose six men than your whole crew.",
        "source": "Homer, The Odyssey, Book XII, trans. Samuel Butler (prose, 1900)",
        "href": "https://en.wikisource.org/wiki/The_Odyssey_(Butler)/Book_XII",
        "image": {
          "src": "/covers/saudi-red-sea-maritime-coalition--a2.png",
          "alt": "Henry Fuseli, Odysseus in front of Scylla and Charybdis",
          "credit": "Henry Fuseli (Johann Heinrich Füssli), c. 1794-96; public domain via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Thucydides on Minos and the First Navy to Suppress Piracy",
        "excerpt": "And the first person known to us by tradition as having established a navy is Minos. He made himself master of what is now called the Hellenic sea, and ruled over the Cyclades, into most of which he sent the first colonies, expelling the Carians and appointing his own sons governors; and thus did his best to put down piracy in those waters, a necessary step to secure the revenues for his own use.",
        "source": "Thucydides, History of the Peloponnesian War, Book I.4, trans. Richard Crawley",
        "href": "https://en.wikisource.org/wiki/History_of_the_Peloponnesian_War/Book_1",
        "image": {
          "src": "/covers/saudi-red-sea-maritime-coalition--a3.png",
          "alt": "Marble bust of the historian Thucydides, Royal Ontario Museum",
          "credit": "Photo by Captmondo, Royal Ontario Museum; public domain via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "The Battle of Lepanto, 7 October 1571",
        "excerpt": "This large late-16th-century canvas turns a decisive naval clash into a wall of massed galleys, oars and banners locked together in the narrow water where a coalition of Christian states halted Ottoman sea power. Smoke and crowded rigging fill the horizon while the two fleets grind hull to hull, dramatizing how the fate of Mediterranean trade and passage hung on a single line of ships. The painting reads as a portrait of allied navies combining to keep a contested sea open.",
        "source": "H. Letter (active late 16th C.), 'The Battle of Lepanto, 7 October 1571', oil on canvas, BHC0261, National Maritime Museum, Greenwich",
        "href": "https://commons.wikimedia.org/wiki/File:H._Letter_(active_late_16th_C)_-_The_Battle_of_Lepanto,_7_October_1571_-_BHC0261_-_National_Maritime_Museum.jpg",
        "image": {
          "src": "/covers/saudi-red-sea-maritime-coalition--a4.png",
          "alt": "Painting of the Battle of Lepanto showing massed galleys of the Holy League and the Ottoman fleet",
          "credit": "H. Letter, National Maritime Museum, Greenwich (BHC0261); public domain via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Mendelssohn, 'Calm Sea and Prosperous Voyage' Overture, Op. 27",
        "excerpt": "Mendelssohn opens on a becalmed sea, the strings held in a vast, almost menacing stillness where a ship lies motionless and trade cannot move. Then a breeze stirs, the wind fills the sails, and the music surges into bright, driving motion toward a safe and welcoming harbor. The overture stages in sound the whole anxiety of a threatened sea-lane and the relief of a voyage carried through to open passage and safe arrival.",
        "source": "Felix Mendelssohn, Meeresstille und glückliche Fahrt (Calm Sea and Prosperous Voyage), Op. 27 (1828), after Goethe",
        "href": "https://imslp.org/wiki/Meeresstille_und_gl%C3%BCckliche_Fahrt,_Op.27_(Mendelssohn,_Felix)",
        "image": {
          "src": "/covers/saudi-red-sea-maritime-coalition--a5.png",
          "alt": "Portrait of composer Felix Mendelssohn by Eduard Magnus",
          "credit": "Eduard Magnus, 1833; public domain via Wikimedia Commons"
        }
      }
    ],
    "rank": 37
  },
  {
    "slug": "apple-third-quarter-earnings",
    "headline": "Apple's revenue jumps 16% to a record $109.4 billion on strong iPhone sales, but services fall short",
    "overview": "Apple reported fiscal third-quarter revenue of $109.4 billion, up 16% and a June-quarter record, with profit of $29.8 billion as iPhone sales rose about 22% to $54.3 billion. Services revenue grew 12% to $30.7 billion but missed Wall Street's estimate, and the shares fell about 8% after hours as Apple issued cautious guidance citing supply constraints.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiuAFBVV95cUxPanFaaGdUMnRidmVSWXhQVXVDeG9fazRla240ZEFBdmhIcGJINkVvUVRhb1d0NGx2cEluMnlxYWdjVWpSWmJLbDdiWXE1LVVxVGR0Zm9yeVVfS1Z5RFN1cDB2M0ZRelQ2MnFhZHlfdm9ySHREOFhJVFFRc2xOMUowdzVISlY4aHpoQWRKYzcwN3ZQNV9mSFV6T3FPYjdobDFOdmF3WVRzODk5Z0Z0WF9mSW5xZS1IVXlM?oc=5"
      },
      {
        "name": "Apple",
        "href": "https://www.apple.com/newsroom/2026/07/apple-reports-third-quarter-results/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-30",
    "image": {
      "src": "/covers/apple-third-quarter-earnings.png",
      "alt": "Aerial view of Apple Park, the company's headquarters in Cupertino",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 30 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Croesus of Lydia, warned at the height of his golden wealth (Herodotus)",
        "excerpt": "But we must of every thing examine the end and how it will turn out at the last, for to many God shows but a glimpse of happiness and then plucks them up by the roots and overturns them.",
        "source": "Herodotus, The Histories, Book I.32 — Solon's warning to King Croesus, the richest man of his age; trans. G. C. Macaulay.",
        "href": "https://www.gutenberg.org/files/2707/2707-h/2707-h.htm",
        "image": {
          "src": "/covers/apple-third-quarter-earnings--a0.png",
          "alt": "Attic red-figure amphora showing King Croesus enthroned upon his blazing pyre, his golden fortune undone.",
          "credit": "Myson (Attic red-figure amphora, c. 500-490 BC), Louvre G197. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "Tulipomania, 1637 — the market's rapture and reckoning (Mackay)",
        "excerpt": "In 1634, the rage among the Dutch to possess them was so great that the ordinary industry of the country was neglected, and the population, even to its lowest dregs, embarked in the tulip trade.",
        "source": "Charles Mackay, Memoirs of Extraordinary Popular Delusions and the Madness of Crowds (1841), 'The Tulipomania'.",
        "href": "https://www.gutenberg.org/files/24518/24518-h/24518-h.htm",
        "image": {
          "src": "/covers/apple-third-quarter-earnings--a1.png",
          "alt": "Seventeenth-century watercolour of the flamed red-and-white Semper Augustus tulip, the single most coveted bulb of the mania.",
          "credit": "Unknown artist, 17th-century watercolour of the 'Semper Augustus' tulip. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "The golden Apple of Discord and the Judgement of Paris (Lucian)",
        "excerpt": "Hermes, take this apple, and go with it to Phrygia; on the Gargaran peak of Ida you will find Priam's son, the herdsman. Give him this message: `Paris, because you are handsome, and wise in the things of love, Zeus commands you to judge between the Goddesses, and say which is the most beautiful. And the prize shall be this apple.'",
        "source": "Lucian of Samosata, 'The Judgement of Paris,' Dialogues of the Gods; trans. H. W. & F. G. Fowler (1905).",
        "href": "https://www.theoi.com/Text/LucianDialoguesGods1.html",
        "image": {
          "src": "/covers/apple-third-quarter-earnings--a2.png",
          "alt": "Rubens painting of Paris awarding the golden apple to one of three goddesses, the single choice that seeds ruin.",
          "credit": "Peter Paul Rubens, The Judgement of Paris (c. 1632-35), National Gallery, London. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Eden's forbidden fruit — the one taste that costs everything (Milton)",
        "excerpt": "Of Man's first disobedience, and the fruit / Of that forbidden tree whose mortal taste / Brought death into the World, and all our woe, / With loss of Eden, till one greater Man / Restore us, and regain the blissful seat, / Sing, Heavenly Muse...",
        "source": "John Milton, Paradise Lost (1667), Book I, lines 1-6.",
        "href": "https://www.gutenberg.org/cache/epub/26/pg26.txt",
        "image": {
          "src": "/covers/apple-third-quarter-earnings--a3.png",
          "alt": "Cranach's Adam and Eve beneath the apple tree, Eve holding the forbidden fruit as the serpent looks on.",
          "credit": "Lucas Cranach the Elder, Adam and Eve (1526), Courtauld Institute of Art, London. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Cézanne's apples — humble fruit remade into monumental value",
        "excerpt": "A cloth-draped tabletop tilts toward the viewer, crowded with round apples in reds, golds and greens that seem to swell with weight and light. Cézanne famously said he would 'astonish Paris with an apple,' turning the plainest of objects into the cornerstone of modern painting. The still, ordinary fruit becomes a study in how worth is assigned — a few apples freighted with the whole future of art.",
        "source": "Paul Cézanne, Still Life with Apples (1893-1894), oil on canvas, J. Paul Getty Museum, Los Angeles (96.PA.8).",
        "href": "https://commons.wikimedia.org/wiki/File:Paul_C%C3%A9zanne_-_Still_Life_with_Apples_-_96.PA.8_-_J._Paul_Getty_Museum.jpg",
        "image": {
          "src": "/covers/apple-third-quarter-earnings--a4.png",
          "alt": "Cézanne oil painting of a cluster of apples and fruit on a draped table, rendered in dense patches of color.",
          "credit": "Paul Cézanne, Still Life with Apples (1893-94), J. Paul Getty Museum (96.PA.8). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Wagner's golden apples of Freia — youth that decays the moment it is withheld (Das Rheingold)",
        "excerpt": "Golden apples ripen within her garden, she alone knoweth how they are tended; the gardens' fruit grants to her kindred, each day renewed, youth ever-lasting: pale and blighted passeth their beauty, old and weak waste they away, if e'er Freia should fail them.",
        "source": "Richard Wagner, Das Rheingold (1869), Scene 2 — the giant Fafner on Freia's golden apples; English singing translation by Frederick Jameson.",
        "href": "https://imslp.org/wiki/Das_Rheingold,_WWV_86A_(Wagner,_Richard)",
        "image": {
          "src": "/covers/apple-third-quarter-earnings--a5.png",
          "alt": "Arthur Rackham illustration of the giants Fasolt and Fafner seizing Freia, keeper of the gods' golden apples of youth.",
          "credit": "Arthur Rackham, illustration for Wagner's The Rhinegold & the Valkyrie (1910). Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 38
  },
  {
    "slug": "uk-us-museums-unite-trump-smithsonian",
    "headline": "Britain's Museums Association joins U.S. museums in condemning Trump's pressure on the Smithsonian",
    "overview": "The UK's Museums Association publicly backed a statement by the American Alliance of Museums opposing the Trump administration's campaign against the Smithsonian, after an executive order demanded \"corrective\" signage and a White House report attacked exhibits for portraying Western values as harmful. The alliance warned that efforts to politicize how museums present history and \"personal attacks on museum professionals\" threaten their independence.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Artforum",
        "href": "https://www.artforum.com/news/u-k-museums-unite-with-american-museums-against-trump-1234756038/"
      },
      {
        "name": "Museums Association",
        "href": "https://www.museumsassociation.org/museums-journal/news/2026/07/american-alliance-of-museums-backs-smithsonian-institution/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-30",
    "image": {
      "src": "/covers/uk-us-museums-unite-trump-smithsonian.png",
      "alt": "The Smithsonian Institution Building, the Castle, in Washington",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 30 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Damnatio memoriae and the erased face of Geta (Severan Tondo, c. AD 200)",
        "excerpt": "When Caracalla had his brother Geta murdered in AD 211, the Roman Senate decreed his damnatio memoriae: his name was chiselled from inscriptions and coins melted down. On this rare surviving painted panel of the imperial family, Geta's face has been deliberately scrubbed to bare wood and smeared with excrement, leaving a blank hole where a co-emperor once looked out. It is the state's oldest instinct made visible: to control the future, first delete the record of the past.",
        "source": "Severan Tondo (Tondo of the Severan family), tempera on wood, c. AD 199-200, from Djemila (Roman Cuicul), Algeria; Antikensammlung, Altes Museum, Berlin.",
        "href": "https://en.wikipedia.org/wiki/Severan_Tondo",
        "image": {
          "src": "/covers/uk-us-museums-unite-trump-smithsonian--a0.png",
          "alt": "Painted circular panel of the Severan imperial family; the face of the boy Geta has been scratched away to bare wood.",
          "credit": "Antikensammlung, Altes Museum, Berlin. Photo: Carole Raddato, CC BY-SA 2.0, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "The commissar vanishes: Soviet airbrushing of the photographic record",
        "excerpt": "After Nikolai Yezhov, Stalin's secret-police chief, was arrested and shot in the Great Purge, retouchers went to work on the official photographs in which he stood beside Stalin at the Moscow-Volga Canal. In the altered print he is simply gone, the water smoothed over the spot where a man once stood. Across Stalin's rule, disgraced figures were airbrushed from images and cut from encyclopedias so that the pictorial history matched the leader's current truth.",
        "source": "Altered Soviet press photograph, April 1937, Nikolai Yezhov removed after his 1940 execution; documented in David King, 'The Commissar Vanishes: The Falsification of Photographs and Art in Stalin's Russia' (1997).",
        "href": "https://en.wikipedia.org/wiki/The_Commissar_Vanishes",
        "image": {
          "src": "/covers/uk-us-museums-unite-trump-smithsonian--a1.png",
          "alt": "Doctored Soviet photograph of Stalin and Molotov walking by a canal, with Nikolai Yezhov airbrushed out and replaced by water.",
          "credit": "Unknown Soviet photographer, 1937; public domain (PD-Russia-1996), via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Milton, 'Areopagitica' (1644): killing a good book kills reason itself",
        "excerpt": "as good almost kill a man as kill a good book. Who kills a man kills a reasonable creature, God's image; but he who destroys a good book, kills reason itself, kills the image of God, as it were in the eye.",
        "source": "John Milton, 'Areopagitica: A Speech for the Liberty of Unlicensed Printing, to the Parliament of England' (London, 1644).",
        "href": "https://www.gutenberg.org/ebooks/608",
        "image": {
          "src": "/covers/uk-us-museums-unite-trump-smithsonian--a2.png",
          "alt": "Title page of the first edition of John Milton's Areopagitica, printed 1644.",
          "credit": "Library of Congress Rare Book and Special Collections Division; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Orwell's 'Nineteen Eighty-Four' (1949): the Ministry of Truth",
        "excerpt": "In Orwell's dystopia the protagonist works at the Ministry of Truth, where his daily job is to rewrite old newspapers so that the record always confirms the Party's present line; inconvenient facts and unpersons are dropped into the 'memory hole' to be burned. The novel's central warning is that a regime which controls how the past is recorded controls the future, and that erasing evidence eventually erases the very possibility of independent thought.",
        "source": "George Orwell, 'Nineteen Eighty-Four' (Secker & Warburg, London, 1949).",
        "href": "https://en.wikipedia.org/wiki/Nineteen_Eighty-Four"
      },
      {
        "category": "artistic",
        "title": "Shostakovich and 'Muddle Instead of Music' (Pravda, 1936)",
        "excerpt": "In January 1936 the Communist Party newspaper Pravda ran an unsigned editorial, 'Muddle Instead of Music,' savaging Shostakovich's opera 'Lady Macbeth of the Mtsensk District' as formalist noise hostile to the Soviet people, ending with the veiled threat that 'this game may end very badly.' The composer, suddenly a target, withdrew his Fourth Symphony and answered with a Fifth cautiously subtitled a Soviet artist's reply to just criticism, composing for years with a packed suitcase by the door. It is a case study in a state dictating how art must speak and punishing the artist personally when it does not.",
        "source": "'Sumbur vmesto muzyki' ('Muddle Instead of Music'), editorial, Pravda, 28 January 1936, denouncing Dmitri Shostakovich's opera 'Lady Macbeth of the Mtsensk District.'",
        "href": "https://en.wikipedia.org/wiki/Muddle_Instead_of_Music",
        "image": {
          "src": "/covers/uk-us-museums-unite-trump-smithsonian--a4.png",
          "alt": "Portrait photograph of composer Dmitri Shostakovich in the audience at a Bach celebration, 1950.",
          "credit": "Photo by Roger & Renate Rössing, 1950, Deutsche Fotothek; CC BY-SA 3.0 DE, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Dirck van Delen, 'Iconoclasm in a Church' (1630)",
        "excerpt": "Van Delen's panel shows a church interior being stripped of its images: a man on a ladder loops a noose around the neck of a saint's statue while others below prepare to haul it down, and at the right a carved figure lies hacked in two. Painted a lifetime after the Dutch Beeldenstorm, it is the only known painting of that wave of image-breaking, and it captures the moment when a change of official belief becomes the physical destruction of a culture's monuments and memory.",
        "source": "Dirck van Delen, 'Iconoclasm in a Church' (Beeldenstorm in een kerk), oil on panel, 1630, Rijksmuseum, Amsterdam (SK-A-4992).",
        "href": "https://www.rijksmuseum.nl/en/collection/SK-A-4992",
        "image": {
          "src": "/covers/uk-us-museums-unite-trump-smithsonian--a5.png",
          "alt": "Painting of a church interior where men on ladders noose and topple religious statues and smash carved figures.",
          "credit": "Dirck van Delen, 1630, Rijksmuseum Amsterdam (SK-A-4992); public domain / CC0, via Wikimedia Commons."
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
