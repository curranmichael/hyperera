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
// the Afternoon Edition of 5 July 2026 (ranks 1-13) leads with its hero story,
// followed by the Morning Edition of 5 July 2026 and the Evening Edition of 4 July 2026.
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
    "slug": "guam-typhoon-bavi-evacuations",
    "headline": "Guam orders evacuations as Super Typhoon Bavi bears down on the US Pacific territory",
    "overview": "Authorities in Guam ordered evacuations and opened shelters on July 5, 2026 as Super Typhoon Bavi tracked toward the US Pacific territory. Forecasters warned of destructive winds, heavy rain, storm surge and flooding along the coast as the storm intensified on its approach. Residents in low-lying and exposed areas were urged to move to higher ground.",
    "genre": "Climate",
    "sources": [
      {
        "name": "BBC News",
        "href": "https://www.bbc.co.uk/news/articles/cr7xpgx50jxo"
      },
      {
        "name": "Stars and Stripes",
        "href": "https://www.stripes.com/theaters/asia_pacific/2026-07-04/bravi-guam-marianas-typhoon-andersen-22175821.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-05",
    "image": {
      "src": "/covers/guam-typhoon-bavi-evacuations.png",
      "alt": "Satellite view of a powerful Pacific super typhoon with a broad spiral of white cloud bands wrapping around a clear circular eye over the dark ocean",
      "credit": "NASA Aqua/MODIS satellite imagery (EOSDIS Worldview), public domain via Wikimedia Commons"
    },
    "lead": true,
    "edition": "Afternoon Edition · 5 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Great Galveston Disaster (1900)",
        "excerpt": "Nothing so exemplified the impotency of man as the storm. Massive buildings were crushed like egg shells, great timbers were carried through the air as though they were of no weight, and the winds and the waves swept everything before them until their appetite for destruction was satiated and their force spent.",
        "source": "Paul Lester, The Great Galveston Disaster (1900), Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/60105/pg60105.txt"
      },
      {
        "category": "historical",
        "title": "History of the Johnstown Flood (1889)",
        "excerpt": "Down the Conemaugh Valley was advancing a mighty wall of water and mist with a terrible roar. Before it were rolling houses and buildings of all kinds, tossing over and over. We thought it was a cyclone, the roar sounding like a tempest among forest trees.",
        "source": "Willis Fletcher Johnson, History of the Johnstown Flood (1889), Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/41271/pg41271.txt"
      },
      {
        "category": "literary",
        "title": "The Tempest, Act I, Scene 1",
        "excerpt": "Mercy on us!—We split, we split!—Farewell my wife and children!—Farewell, brother! We split, we split, we split!",
        "source": "William Shakespeare, The Tempest, Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/23042/pg23042.txt"
      },
      {
        "category": "literary",
        "title": "The Rime of the Ancient Mariner",
        "excerpt": "And now the STORM-BLAST came, and he\nWas tyrannous and strong:\nHe struck with his o'ertaking wings,\nAnd chased south along.",
        "source": "Samuel Taylor Coleridge, The Rime of the Ancient Mariner, Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/151/pg151.txt"
      },
      {
        "category": "artistic",
        "title": "Symphony No. 6 in F major, Op. 68 'Pastoral' — IV. Gewitter, Sturm (Thunderstorm)",
        "excerpt": "Distant rumblings in the low strings swell without warning into a full orchestral tempest, cellos and basses churning while the violins slash downward like sheets of driven rain. Timpani crack like thunder overhead and the woodwinds shriek through the gale as the whole orchestra is caught in the storm's fury. Only slowly does the violence ebb, the clouds parting to reveal a calm, grateful shepherd's hymn.",
        "source": "Ludwig van Beethoven, Symphony No. 6, Op. 68 (1808), IMSLP",
        "href": "https://imslp.org/wiki/Symphony_No.6,_Op.68_(Beethoven,_Ludwig_van)"
      },
      {
        "category": "artistic",
        "title": "The Great Wave off Kanagawa",
        "excerpt": "A colossal wave rears up with clawing, foam-tipped talons, dwarfing the frail boats and their rowers as tiny Mount Fuji sits calm on the far horizon, capturing nature's overwhelming power over human vessels.",
        "source": "Katsushika Hokusai, The Great Wave off Kanagawa (c. 1830-1832), Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Tsunami_by_hokusai_19th_century.jpg",
        "image": {
          "src": "/covers/guam-typhoon-bavi-evacuations--art.png",
          "alt": "Woodblock print of a towering deep-blue ocean wave with white clawing crests curling over small boats, with a snow-capped Mount Fuji small in the distance",
          "credit": "Katsushika Hokusai, 'The Great Wave off Kanagawa,' from Thirty-six Views of Mount Fuji, c. 1830-1832; public domain via Wikimedia Commons"
        }
      }
    ],
    "rank": 1
  },
  {
    "slug": "france-paraguay-world-cup-quarterfinals",
    "headline": "France beats Paraguay 1-0 on a Mbappe penalty to reach the World Cup quarterfinals",
    "overview": "France reached the quarterfinals of the 2026 World Cup with a 1-0 win over Paraguay, played in front of 68,324 fans in Philadelphia. Kylian Mbappe converted a second-half penalty for the only goal in an ill-tempered, heat-affected match, drawing level with Lionel Messi as the tournament's joint-top scorer on seven goals. France, who have now won five straight matches at the finals, advance to meet Morocco.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP (via Google News)",
        "href": "https://news.google.com/rss/articles/CBMilgFBVV95cUxONXFZWG5zWUNVbHZKNk9VLTJTNnJ3d0hVaHh1bXZPX1VzYWlxTmozeHowRHhyT1BCX3B4NU1nWWdJTmJfS0JIWDloUVkzMERxZ1pvMERmVzZncW1xUm9SVGI3Um5tWk1BcGpIaUZJbldKOGFwOHZGbzBrdUdnSVp4aXFneDQ1dTFBU3YyZ184aWpCWGJaUGc?oc=5"
      },
      {
        "name": "Reuters (via Google News)",
        "href": "https://news.google.com/rss/articles/CBMivgFBVV95cUxNQnZXV3M1ZWI4SVNzSnd3VVBwRnc2dHVkUWZleEZsZ29BV0h3RzFQZWxqYXVMN2hvejFPSGhmaUhQVENILWljSmNDSm1GTktJVWtHVVFkLWhHamc2X1lKR01zYndvam12LVFGWkRTSWxpalJaQ25oNzhfVWh1NHc3V2xXVlZZSnk0RzVPcFNCYmVPaTAzbUJPM2daWEE2S0UxZkM1OGxxcFdHaWNTS0JmVlFFSTlxcmExOS15R1dR?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-05",
    "image": {
      "src": "/covers/france-paraguay-world-cup-quarterfinals.png",
      "alt": "Kylian Mbappé of France at the 2018 FIFA World Cup",
      "credit": "Anton Zaitsev / soccer.ru, CC BY-SA 3.0, via Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 5 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Herodotus on the Olympic Games — the olive wreath (Histories, Book VIII 'Urania', ch. 26)",
        "excerpt": "They told them that the Hellenes were keeping the Olympic festival and were looking on at a contest of athletics and horsemanship. He then inquired again, what was the prize proposed to them, for the sake of which they contended; and they told them of the wreath of olive which is given. Then Tigranes the son of Artabanos uttered a thought which was most noble, though thereby he incurred from the king the reproach of cowardice: for hearing that the prize was a wreath and not money, he could not endure to keep silence, but in the presence of all he spoke these words: \"Ah! Mardonios, what kind of men are these against whom thou hast brought us to fight, who make their contest not for money but for honour!\"",
        "source": "Herodotus, The History of Herodotus, trans. G. C. Macaulay, Vol. 2, Book VIII (Urania), ch. 26 (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/2456/pg2456.txt"
      },
      {
        "category": "historical",
        "title": "Pausanias on Milo of Croton, six-time Olympic wrestling champion (Description of Greece, Book VI, ch. 14)",
        "excerpt": "This Milo had six prizes for wrestling at Olympia, one of them among boys, and at Pythia six among men and one among boys. And he came to Olympia to wrestle for the 7th time. But he could not beat in wrestling Timasitheus, a citizen and quite young, as Timasitheus would not contend with him at close quarters in the arena at all. And Milo is said to have carried his own statue to Altis.",
        "source": "Pausanias, Description of Greece, trans. A. R. Shilleto, Book VI (Elis, Part II), ch. 14 (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/68946/pg68946.txt"
      },
      {
        "category": "literary",
        "title": "The funeral games of Patroclus — the chariot race (Homer, Iliad, Book XXIII)",
        "excerpt": "Fired at his word the rival racers rise;\nBut far the first Eumelus hopes the prize,\nFamed though Pieria for the fleetest breed,\nAnd skill'd to manage the high-bounding steed.\nWith equal ardour bold Tydides swell'd,\nThe steeds of Tros beneath his yoke compell'd\n(Which late obey'd the Dardan chief's command,\nWhen scarce a god redeem'd him from his hand).\nThen Menelaus his Podargus brings,\nAnd the famed courser of the king of kings.",
        "source": "Homer, The Iliad, trans. Alexander Pope, Book XXIII, 'Funeral Games in Honour of Patroclus' (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/6130/pg6130.txt"
      },
      {
        "category": "literary",
        "title": "Pindar, Olympian Ode I — for Hieron of Syracuse, winner in the horse-race",
        "excerpt": "Best is Water of all, and Gold as a flaming fire in the night shineth eminent amid lordly wealth; but if of prizes in the games thou art fain, O my soul, to tell, then, as for no bright star more quickening than the sun must thou search in the void firmament by day, so neither shall we find any games greater than the Olympic whereof to utter our voice: for hence cometh the glorious hymn and entereth into the minds of the skilled in song. Take from the peg the Dorian lute, if in any wise the glory of Pherenikos at Pisa hath swayed thy soul unto glad thoughts, when by the banks of Alpheos he ran, and gave his body ungoaded in the course, and brought victory to his master, the Syracusans' king, who delighteth in horses.",
        "source": "Pindar, The Extant Odes of Pindar, trans. Ernest Myers, Olympian Ode I (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/10717/pg10717.txt"
      },
      {
        "category": "artistic",
        "title": "Handel, 'See, the Conqu'ring Hero Comes' from Judas Maccabaeus, HWV 63",
        "excerpt": "A hush, then a single unison melody rises in unadorned major-key confidence, gathering voices and instruments as it swells into a broad processional of trumpets and drums. Handel's victory chorus paints the returning champion greeted by rejoicing crowds, its striding rhythm and rising phrases evoking the roar of a stadium welcoming its hero. So enduring is its triumphal air that it became the anthem sung at prize-givings and homecomings for generations after.",
        "source": "George Frideric Handel, Judas Maccabaeus, HWV 63, Act III, No. 35 (IMSLP / Petrucci Music Library)",
        "href": "https://imslp.org/wiki/Judas_Maccabaeus,_HWV_63_(Handel,_George_Frideric)"
      },
      {
        "category": "artistic",
        "title": "Discobolus (The Discus-Thrower) — Roman marble copy after Myron, British Museum",
        "excerpt": "A nude athlete is caught coiled at the instant before release, torso twisted and discus swung back at the top of its arc, weight poised on a single flexed leg. Myron's lost 5th-century BC bronze, known through Roman marble copies such as this Townley example from Hadrian's Villa, distils the whole tension of athletic contest into one balanced, held moment — the ancient ideal of the victorious competitor rendered eternal in stone.",
        "source": "Discobolus (Townley), Roman copy after Myron, British Museum — Wikimedia Commons file page",
        "href": "https://commons.wikimedia.org/wiki/File:Discus-thrower_(discobolus),_Roman_copy_of_a_bronze_original_of_the_5th_century_BC,_found_at_Hadrians_Villa,_Winning_at_the_ancient_Games,_British_Museum_(7376120902).jpg",
        "image": {
          "src": "/covers/france-paraguay-world-cup-quarterfinals--art.png",
          "alt": "Roman marble Discobolus (discus-thrower) after Myron, an athlete poised to hurl the discus, British Museum",
          "credit": "Photo by Carole Raddato, CC BY-SA 2.0, via Wikimedia Commons"
        }
      }
    ],
    "rank": 2
  },
  {
    "slug": "congo-ebola-treatment-trial",
    "headline": "New Ebola treatment trial begins in eastern Democratic Republic of Congo",
    "overview": "A clinical trial of a new Ebola treatment began in the eastern Democratic Republic of Congo, offering fresh hope to communities in a region repeatedly struck by outbreaks of the virus. Health workers said the trial would test the therapy's safety and effectiveness during the current response. The effort comes as residents continue to grapple with the disease's toll.",
    "genre": "Science",
    "sources": [
      {
        "name": "AP (via Google News)",
        "href": "https://news.google.com/rss/articles/CBMikAFBVV95cUxQOW4xWVlFc1dzLXBNU0VQQ3VXZ0s0QVpJT2IxRjA5OVpKNW5qbUcwdXZlTnQwYlJ1cnY0cTNNSEJvNXE2bkR3UU5lbldsRmRscF9KZ1RZUWh0Yi1Zd2Z5cFBjZUY0S1VkR19FYUNNeDBTUEh1UENBNGlKWjNzazEyNE9Dd3oyVW9rYmp4ZFEtMFc?oc=5"
      },
      {
        "name": "World Health Organization — Ebola outbreak: DRC 2026",
        "href": "https://www.who.int/emergencies/situations/ebola-outbreak---drc-2026"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-05",
    "image": {
      "src": "/covers/congo-ebola-treatment-trial.png",
      "alt": "Colorized transmission electron micrograph of an Ebola virus virion, showing the characteristic filamentous shape of the filovirus",
      "credit": "CDC/Cynthia Goldsmith, Public Health Image Library (#10816) — public domain"
    },
    "edition": "Afternoon Edition · 5 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Thucydides, History of the Peloponnesian War — the Plague of Athens (Book 2, Crawley translation)",
        "excerpt": "People in good health were all of a sudden attacked by violent heats in the head, and redness and inflammation in the eyes, the inward parts, such as the throat or tongue, becoming bloody and emitting an unnatural and fetid breath. These symptoms were followed by sneezing and hoarseness, after which the pain soon reached the chest, and produced a hard cough. When it fixed in the stomach, it upset it; and discharges of bile of every kind named by physicians ensued, accompanied by very great distress. Externally the body was not very hot to the touch, nor pale in its appearance, but reddish, livid, and breaking out into small pustules and ulcers.",
        "source": "Thucydides, History of the Peloponnesian War, Book 2 (Crawley trans.), Wikisource",
        "href": "https://en.wikisource.org/wiki/History_of_the_Peloponnesian_War/Book_2"
      },
      {
        "category": "historical",
        "title": "Edward Jenner, An Inquiry into the Causes and Effects of the Variolae Vaccinae (1798) — Case XVII",
        "excerpt": "I selected a healthy boy, about eight years old, for the purpose of inoculation for the Cow Pox. The matter was taken from a sore on the hand of a dairymaid, who was infected by her master's cows, and it was inserted, on the 14th of May, 1796, into the arm of the boy by means of two superficial incisions. In order to ascertain whether the boy, after feeling so slight an affection of the system from the Cow-pox virus, was secure from the contagion of the Small-pox, he was inoculated the 1st of July following with variolous matter, immediately taken from a pustule... but no disease followed.",
        "source": "Edward Jenner, An Inquiry into the Causes and Effects of the Variolae Vaccinae, Project Gutenberg eBook #29414",
        "href": "https://www.gutenberg.org/files/29414/29414-h/29414-h.htm"
      },
      {
        "category": "literary",
        "title": "Daniel Defoe, A Journal of the Plague Year (1722)",
        "excerpt": "The shrieks of women and children at the windows and doors of their houses, where their dearest relations were perhaps dying, or just dead, were so frequent to be heard as we passed the streets, that it was enough to pierce the stoutest heart in the world to hear them. Tears and lamentations were seen almost in every house, especially in the first part of the visitation.",
        "source": "Daniel Defoe, A Journal of the Plague Year, Project Gutenberg eBook #376",
        "href": "https://www.gutenberg.org/cache/epub/376/pg376.txt"
      },
      {
        "category": "literary",
        "title": "Edgar Allan Poe, The Masque of the Red Death (1842)",
        "excerpt": "The \"Red Death\" had long devastated the country. No pestilence had ever been so fatal, or so hideous. Blood was its Avatar and its seal—the redness and the horror of blood. There were sharp pains, and sudden dizziness, and then profuse bleeding at the pores, with dissolution. The scarlet stains upon the body and especially upon the face of the victim, were the pest ban which shut him out from the aid and from the sympathy of his fellow-men.",
        "source": "Edgar Allan Poe, The Masque of the Red Death, Project Gutenberg eBook #1064",
        "href": "https://www.gutenberg.org/files/1064/1064-h/1064-h.htm"
      },
      {
        "category": "artistic",
        "title": "Beethoven, String Quartet No. 15 in A minor, Op. 132 — III. \"Heiliger Dankgesang eines Genesenen an die Gottheit\"",
        "excerpt": "Written in 1825 as Beethoven convalesced from a grave intestinal illness that he feared would kill him, the vast slow movement is inscribed as a \"Holy Song of Thanksgiving of a Convalescent to the Deity, in the Lydian mode.\" Solemn hymn-like chorales, rising as if from a sickbed, alternate with quickened passages marked \"Neue Kraft fühlend\" — feeling new strength — so that the music itself enacts the passage from disease back into life. It is one of art's most direct musical prayers of healing, a fitting resonance with clinicians testing whether a new therapy can pull patients back from Ebola.",
        "source": "Beethoven, String Quartet No. 15, Op. 132, IMSLP (Petrucci Music Library)",
        "href": "https://imslp.org/wiki/String_Quartet_No.15,_Op.132_(Beethoven,_Ludwig_van)"
      },
      {
        "category": "artistic",
        "title": "Nicolas Poussin, The Plague of Ashdod (1630–1631), Louvre",
        "excerpt": "Poussin's canvas stages the biblical pestilence that struck the Philistines of Ashdod after they seized the Ark of the Covenant: a stricken city of collapsing bodies, mothers dead beside living infants, and citizens recoiling with cloaks pressed to their faces against the contagion. It is one of Western art's defining images of epidemic terror and the human struggle to contain an unseen killer.",
        "source": "Nicolas Poussin, The Plague of Ashdod, Wikimedia Commons (Louvre INV 7276)",
        "href": "https://commons.wikimedia.org/wiki/File:Nicolas_Poussin_-_La_Peste_%C3%A0_Ashdod.jpg",
        "image": {
          "src": "/covers/congo-ebola-treatment-trial--art.png",
          "alt": "Baroque painting of the plague at Ashdod: figures collapsing and dying in a classical city square while others flee and cover their faces",
          "credit": "Nicolas Poussin, The Plague of Ashdod (1630–31), Musée du Louvre; The Yorck Project — public domain"
        }
      }
    ],
    "rank": 3
  },
  {
    "slug": "china-frees-pastor-jin-mingri",
    "headline": "China releases Beijing house-church pastor Jin Mingri weeks after Trump sought his freedom",
    "overview": "Jin Mingri, the prominent founder of Beijing's unregistered Zion Church, was released from detention in China, his supporters said, weeks after US President Donald Trump publicly called for his freedom. Jin had been held by Chinese authorities in a case watched closely by religious-freedom advocates. His release was welcomed by campaigners who had pressed for it.",
    "genre": "Politics",
    "sources": [
      {
        "name": "BBC News",
        "href": "https://www.bbc.co.uk/news/articles/c4gy51ky75vo"
      },
      {
        "name": "AP (via Google News)",
        "href": "https://news.google.com/rss/articles/CBMioAFBVV95cUxPUmI5bHRvM080TlNabU5GUzEwVE5FcmViSkcycXlueHc0MVN4cjRGNzNxZ1hzSHJnbjIwbnlINjFjM19ubFRqZklVaGp4cV8yRTlaZXNGcnhCR2pLS3JtdWtwaEdOZVNpdThLdXkzWHh4RjRaOFo4NEV6ZmN0T2Nacjk5TnZVYzdLTk1aaXR4RFZaRVk5b3FySzlBMXE3cEQw?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-05",
    "image": {
      "src": "/covers/china-frees-pastor-jin-mingri.png",
      "alt": "A large crucifix standing atop a pine-covered mountain peak, lit by the rays of a setting sun, an emblem of steadfast faith.",
      "credit": "Caspar David Friedrich, 'Cross in the Mountains (Tetschen Altar)', 1808, Galerie Neue Meister, Dresden — public domain via Wikimedia Commons."
    },
    "edition": "Afternoon Edition · 5 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Peter Freed from Prison (Acts of the Apostles 12)",
        "excerpt": "And, behold, the angel of the Lord came upon him, and a light shined in the prison: and he smote Peter on the side, and raised him up, saying, Arise up quickly. And his chains fell off from his hands.",
        "source": "Bible (King James Version), Acts 12:7–8, via Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Acts"
      },
      {
        "category": "historical",
        "title": "Paul and Silas Delivered at Philippi (Acts of the Apostles 16)",
        "excerpt": "And at midnight Paul and Silas prayed, and sang praises unto God: and the prisoners heard them. And suddenly there was a great earthquake, so that the foundations of the prison were shaken: and immediately all the doors were opened, and every one's bands were loosed.",
        "source": "Bible (King James Version), Acts 16:25–26, via Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Acts"
      },
      {
        "category": "literary",
        "title": "John Bunyan, The Pilgrim's Progress (the Key called Promise)",
        "excerpt": "What a fool, quoth he, am I, thus to lie in a stinking Dungeon, when I may as well walk at liberty. I have a Key in my bosom called Promise, that will, I am persuaded, open any Lock in Doubting Castle.",
        "source": "John Bunyan, The Pilgrim's Progress (1678), Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/131/pg131.txt"
      },
      {
        "category": "literary",
        "title": "Boethius, The Consolation of Philosophy (Book I, Song II)",
        "excerpt": "Now, reft of reason's light, he lies,\nAnd bonds his neck oppress;\nWhile by the heavy load constrained,\nHis eyes to this dull earth are chained.",
        "source": "Boethius, The Consolation of Philosophy, trans. H. R. James, Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/14328/pg14328.txt"
      },
      {
        "category": "artistic",
        "title": "Beethoven, Fidelio, Op. 72 — the Prisoners' Chorus",
        "excerpt": "In Beethoven's only opera, prisoners long shut in a dark fortress are briefly let up into the daylight and raise the hushed, luminous chorus 'O welche Lust' — the joy of breathing free air once more. The wrongly jailed Florestan is at last delivered from his dungeon by the courage of his devoted wife, and the trembling hymn to liberty made the work an enduring anthem for prisoners of conscience.",
        "source": "Ludwig van Beethoven, Fidelio, Op. 72, IMSLP",
        "href": "https://imslp.org/wiki/Fidelio,_Op.72_(Beethoven,_Ludwig_van)"
      },
      {
        "category": "artistic",
        "title": "Raphael, Deliverance of Saint Peter (1514)",
        "excerpt": "Raphael's Vatican fresco stages the miracle of Acts 12 in blazing nocturnal light: an angel wrapped in supernatural radiance rouses the sleeping apostle, his chains slipping away, then leads him past armored guards slumped in slumber and out through the prison's iron gate to freedom.",
        "source": "Raphael, Deliverance of Saint Peter, Stanza di Eliodoro, Vatican — Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Raphael_-_Deliverance_of_Saint_Peter.jpg",
        "image": {
          "src": "/covers/china-frees-pastor-jin-mingri--art.png",
          "alt": "An angel bathed in radiant light wakes the sleeping apostle Peter and leads him past sleeping guards out of Herod's prison.",
          "credit": "Raphael, 'Deliverance of Saint Peter', 1514, fresco, Stanza di Eliodoro, Apostolic Palace, Vatican — public domain via Wikimedia Commons."
        }
      }
    ],
    "rank": 4
  },
  {
    "slug": "china-russia-navy-drills",
    "headline": "China and Russia announce joint naval drills off China's coast",
    "overview": "China and Russia announced they would hold joint naval exercises off China's coast, the latest in a series of drills between the two militaries. State media said the exercises would involve warships from both navies. The announcement comes amid heightened tensions in the western Pacific.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters (via Google News)",
        "href": "https://news.google.com/rss/articles/CBMimwFBVV95cUxOSkh1azJTOTZ0czF5WkFZZ185TlZPUVdkOERpUGVFTm12ekY4cjdFY2NiUzBrb2lHQ0ducnRkS0E2aGdjMTVfVHAyZ2txNEdGaVhpblFBZG5KTndFc0c1aEtBbHZ4UjVSNVJDNUJMRGpzRUMwVXIyU1p6MkV3Y2d5X0FvNkp4YW4xVnlfX25Ic0FTc2JqTFlGTHNVNy01RQ?oc=5"
      },
      {
        "name": "Nikkei Asia",
        "href": "https://asia.nikkei.com/politics/defense/chinese-russian-navies-to-hold-drills-off-china-coast-beijing-says"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-05",
    "image": {
      "src": "/covers/china-russia-navy-drills.png",
      "alt": "Warships steaming in formation at sea, the aircraft carrier USS Ronald Reagan leading a strike group across the western Pacific",
      "credit": "U.S. Navy photo by Mass Communication Specialist 2nd Class Christian Senyk (public domain)"
    },
    "edition": "Afternoon Edition · 5 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The allied Greek fleet mustering at Salamis (Herodotus, Histories, Book VIII)",
        "excerpt": "When those who came from Artemision had put their ships in to land at Salamis, the remainder of the naval force of the Hellenes, being informed of this, came over gradually to join them from Troizen: for they had been ordered beforehand to assemble at Pogon, which is the harbour of the Troizenians. There were assembled accordingly now many more ships than those which were in the sea-fight at Artemision, and from more cities. Over the whole was set as admiral the same man as at Artemision, namely Eurybiades the son of Eurycleides, a Spartan but not of the royal house; the Athenians however supplied by far the greatest number of ships and those which sailed the best.",
        "source": "Herodotus, The History of Herodotus, Vol. 2, trans. G. C. Macaulay (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/2456/pg2456.txt"
      },
      {
        "category": "historical",
        "title": "The Athenian armada sails for Sicily as a display of power (Thucydides, History of the Peloponnesian War, Book VI)",
        "excerpt": "The fleet had been elaborately equipped at great cost to the captains and the state; the treasury giving a drachma a day to each seaman, and providing empty ships, sixty men-of-war and forty transports, and manning these with the best crews obtainable; while the captains gave a bounty in addition to the pay from the treasury to the thranitae and crews generally, besides spending lavishly upon figure-heads and equipments, and one and all making the utmost exertions to enable their own ships to excel in beauty and fast sailing. Meanwhile the land forces had been picked from the best muster-rolls, and vied with each other in paying great attention to their arms and personal accoutrements. From this resulted not only a rivalry among themselves in their different departments, but an idea among the rest of the Hellenes that it was more a display of power and resources than an armament against an enemy.",
        "source": "Thucydides, History of the Peloponnesian War, trans. Richard Crawley (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/7142/pg7142.txt"
      },
      {
        "category": "literary",
        "title": "The Greek fleet charges at Salamis (Aeschylus, The Persians)",
        "excerpt": "First from the Grecian fleet rang out a cry, / A song of onset! and the island crags / Re-echoed to the shrill exulting sound. / Then on us Eastern men amazement fell / And fear in place of hope; for what we heard / Was not a call to flight! the Greeks rang out / Their holy, resolute, exulting chant, / Like men come forth to dare and do and die. / Their trumpets pealed, and fire was in that sound, / And with the dash of simultaneous oars / Replying to the war-chant, on they came, / Smiting the swirling brine, and in a trice / They flashed upon the vision of the foe!",
        "source": "Aeschylus, The Persians, in Four Plays of Aeschylus, trans. E. D. A. Morshead (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/8714/pg8714.txt"
      },
      {
        "category": "literary",
        "title": "The Catalogue of the Ships (Homer, Iliad, Book II)",
        "excerpt": "Say, virgins, seated round the throne divine, / All-knowing goddesses! immortal nine! / Since earth's wide regions, heaven's umneasur'd height, / And hell's abyss, hide nothing from your sight, / (We, wretched mortals! lost in doubts below, / But guess by rumour, and but boast we know,) / O say what heroes, fired by thirst of fame, / Or urged by wrongs, to Troy's destruction came. / To count them all, demands a thousand tongues, / A throat of brass, and adamantine lungs. / Daughters of Jove, assist! inspired by you / The mighty labour dauntless I pursue; / What crowded armies, from what climes they bring, / Their names, their numbers, and their chiefs I sing.",
        "source": "Homer, The Iliad, trans. Alexander Pope (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/6130/pg6130.txt"
      },
      {
        "category": "artistic",
        "title": "Thomas Arne, \"Rule, Britannia!\" from the masque Alfred (1740)",
        "excerpt": "Arne's grand ode swells from a stately dotted-rhythm summons into the thundering refrain \"Rule, Britannia! Britannia, rule the waves,\" a soprano and full chorus proclaiming a nation's dominion over the sea. Set to James Thomson's words for the masque Alfred, it turns naval supremacy itself into music, its broad D-major cadences imitating the roll of the ocean and the confidence of a fleet putting out to sea. For nearly three centuries it has been the sound of maritime power on parade, a martial anthem of ships and empire.",
        "source": "Rule Britannia (Arne, Thomas Augustine) — IMSLP",
        "href": "https://imslp.org/wiki/Rule_Britannia_(Arne,_Thomas_Augustine)"
      },
      {
        "category": "artistic",
        "title": "J. M. W. Turner, The Battle of Trafalgar (1822-1824)",
        "excerpt": "Turner's vast canvas, his largest work, compresses the whole din of Trafalgar into a single towering wall of masts, sails, and gunsmoke, with HMS Victory rising at the center as her signal flags stream out the famous message to the fleet. Around the flagship the sea churns with wreckage, drowning sailors, and the collapsing spars of the combined Franco-Spanish line, a chaos of collision and firepower that dwarfs the men caught within it. It stands as one of the great images of massed naval force, a fleet action rendered as sublime catastrophe.",
        "source": "Wikimedia Commons — File:Turner, The Battle of Trafalgar (1822).jpg",
        "href": "https://commons.wikimedia.org/wiki/File:Turner,_The_Battle_of_Trafalgar_(1822).jpg",
        "image": {
          "src": "/covers/china-russia-navy-drills--art.png",
          "alt": "Turner's painting of the Battle of Trafalgar, HMS Victory towering amid a mass of warships, sails, and smoke",
          "credit": "J. M. W. Turner (1775-1851), National Maritime Museum, London — public domain via Wikimedia Commons"
        }
      }
    ],
    "rank": 5
  },
  {
    "slug": "taiwan-anticommunist-classes",
    "headline": "Taiwan's military revives 'anti-communist' classes for graduates, citing the threat from China",
    "overview": "Taiwan's military said it was reinstating 'anti-communist' political education classes for newly commissioned officers, citing the growing threat from China. Officials framed the move as part of efforts to strengthen ideological resilience within the armed forces. The step reflects deepening concern in Taipei over Beijing's military pressure.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters (via Google News)",
        "href": "https://news.google.com/rss/articles/CBMixAFBVV95cUxPYmdzSWJNOFN5azlMdy04dlIyOWVRQVBaQ2llMzg2Y0lkSHFSTDkzaXF2MC1EUlIxLUZSQjJhVGxLUWpqUkRhbkNkajk5S2VVNTZYWXdfQ0dsWmhFclQ0dkFQbjNpdUFNTFNVdzVWdUwzNzZPQlpoMmlDNm5hS2h1Tk5WQmtuV0hBcnhQVW1mMGZvYjZZTUJ5RFpfbzV4MjZacnNwc0VQUTlPMXVsZnF6elIzREJKbmtkQkFxSl85eVhKSkRX?oc=5"
      },
      {
        "name": "The Jerusalem Post",
        "href": "https://www.jpost.com/international/article-901429"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-05",
    "image": {
      "src": "/covers/taiwan-anticommunist-classes.png",
      "alt": "Cadets of Taiwan's Republic of China Military Academy marching in formation on a road during a campus open house, 2014.",
      "credit": "玄史生 / Wikimedia Commons, CC BY-SA 3.0"
    },
    "edition": "Afternoon Edition · 5 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Plutarch, Life of Lycurgus (the Spartan agōgē)",
        "excerpt": "nor was it lawful, indeed, for the father himself to breed up the children after his own fancy; but as soon as they were seven years old they were to be enrolled in certain companies and classes, where they all lived under the same order and discipline, doing their exercises and taking their play together. Of these, he who showed the most conduct and courage was made captain; they had their eyes always upon him, obeyed his orders, and underwent patiently whatsoever punishment he inflicted; so that the whole course of their education was one continued exercise of a ready and perfect obedience. The old men, too, were spectators of their performances, and often raised quarrels and disputes among them, to have a good opportunity of finding out their different characters, and of seeing which would be valiant, which a coward, when they should come to more dangerous encounters. Reading and writing they gave them, just enough to serve their turn; their chief care was to make them good subjects, and to teach them to endure pain and conquer in battle.",
        "source": "Plutarch, Life of Lycurgus, trans. John Dryden (rev. A. H. Clough) — Wikisource",
        "href": "https://en.wikisource.org/wiki/Plutarch%27s_Lives_(Clough)/Life_of_Lycurgus"
      },
      {
        "category": "historical",
        "title": "Xenophon, Cyropaedia — the Persian education of boys in justice and obedience",
        "excerpt": "The boys go to school and give their time to learning justice and righteousness: they will tell you they come for that purpose, and the phrase is as natural with them as it is for us to speak of lads learning their letters. The masters spend the chief part of the day in deciding cases for their pupils: for in this boy-world, as in the grown-up world without, occasions of indictment are never far to seek. [...] Further, the boys are instructed in temperance and self-restraint, and they find the utmost help towards the attainment of this virtue in the self-respecting behaviour of their elders, shown them day by day.",
        "source": "Xenophon, Cyropaedia, Book I, trans. H. G. Dakyns — Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/2085/pg2085.txt"
      },
      {
        "category": "literary",
        "title": "Yevgeny Zamyatin, We — the ideology of the collective United State",
        "excerpt": "Every morning with six-wheeled precision, at the same hour, at the same minute, we wake up, millions of us at once. At the very same hour millions like one we begin our work, and millions like one, we finish it. United into a single body with a million hands, at the very same second, designated by the Tables, we carry the spoons to our mouths; at the same second we all go out to walk, go to the auditorium, to the halls for the Taylor exercises and then to bed.",
        "source": "Yevgeny Zamyatin, We, trans. Gregory Zilboorg (1924) — Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/61963/pg61963.txt"
      },
      {
        "category": "literary",
        "title": "Shakespeare, Henry V — the St. Crispin's Day speech on why and for whom soldiers fight",
        "excerpt": "This story shall the good man teach his son;\nAnd Crispin Crispian shall ne'er go by,\nFrom this day to the ending of the world,\nBut we in it shall be remembered-\nWe few, we happy few, we band of brothers;\nFor he to-day that sheds his blood with me\nShall be my brother; be he ne'er so vile,\nThis day shall gentle his condition;\nAnd gentlemen in England now-a-bed\nShall think themselves accurs'd they were not here,\nAnd hold their manhoods cheap whiles any speaks\nThat fought with us upon Saint Crispin's day.",
        "source": "William Shakespeare, The Life of King Henry V, Act IV, Scene III — Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/1784/pg1784.txt"
      },
      {
        "category": "artistic",
        "title": "La Marseillaise (Claude-Joseph Rouget de Lisle, 1792)",
        "excerpt": "Composed in a single feverish night in Strasbourg in 1792 by Claude-Joseph Rouget de Lisle, 'La Marseillaise' is the archetypal call-to-arms anthem, summoning citizens to rise against tyranny with its cry of 'Aux armes, citoyens!' Its surging, martial melody swept through the ranks of Revolutionary France and became the beating heart of a nation-in-arms, teaching soldiers not merely to fight but to know why, and for whom, they marched. It endures as the very sound of a people converting political conviction into collective military resolve.",
        "source": "La Marseillaise (Rouget de Lisle, Claude-Joseph) — IMSLP",
        "href": "https://imslp.org/wiki/La_Marseillaise_(Rouget_de_Lisle,_Claude-Joseph)"
      },
      {
        "category": "artistic",
        "title": "Jacques-Louis David, Oath of the Horatii (1784)",
        "excerpt": "Jacques-Louis David's 'Oath of the Horatii' freezes the instant three brothers stretch their arms toward their father's raised swords, swearing to fight and die for Rome while the grieving women slump aside. The rigid geometry of the salute against a stark classical arcade transforms a private family into an instrument of the state — a visual catechism of martial duty and civic self-sacrifice. Painted on the eve of the French Revolution, it became an enduring emblem of subordinating the individual to the patriotic cause.",
        "source": "Jacques-Louis David, Le Serment des Horaces — Wikimedia Commons (Louvre)",
        "href": "https://commons.wikimedia.org/wiki/File:Jacques-Louis_David,_Le_Serment_des_Horaces.jpg",
        "image": {
          "src": "/covers/taiwan-anticommunist-classes--art.png",
          "alt": "Neoclassical painting of three Roman brothers raising their arms in oath toward swords held by their father, with mourning women at the right.",
          "credit": "Jacques-Louis David (1784), Musée du Louvre — public domain via Wikimedia Commons"
        }
      }
    ],
    "rank": 6
  },
  {
    "slug": "uber-pauses-europe-delivery-hero",
    "headline": "Uber pauses European food-delivery expansion as it pursues a Delivery Hero deal",
    "overview": "Uber has paused the expansion of its food-delivery business in Europe as it pursues a deal involving the German company Delivery Hero, the Financial Times reported on July 5, 2026. The move suggests Uber is prioritizing a possible tie-up over organic growth in the region's crowded delivery market. Neither company confirmed the terms.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters (via Google News)",
        "href": "https://news.google.com/rss/articles/CBMivAFBVV95cUxPaWVmYTl5ZGlpY19WZWZxWE5KcTFEUXZUTFA1VmxDa2JWM0QyZ2hSdlo2N252cW1iNEdudlRUb184RDVyTU5jVVFsTWw3bzBtblFHdEdSemZOZXlTQVRuMWVyNU8yenJZTmhrcDZvLVY2TTYtT3M4SXZNMWFVUGNtZmhZUk9HTm5ZbWRtM2ZTa3hOaUlTTGF6dTJiNGRwWEp5V1BVZTNQQjF6QXY3d2s5VDdzVmNoblhtSVlnTw?oc=5"
      },
      {
        "name": "Investing.com (Reuters)",
        "href": "https://www.investing.com/news/stock-market-news/uber-pauses-europe-food-delivery-expansion-as-it-pursues-delivery-hero-deal-ft-reports-4775399"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-05",
    "image": {
      "src": "/covers/uber-pauses-europe-delivery-hero.png",
      "alt": "A food-delivery courier riding a bicycle with a branded insulated delivery backpack through a city street",
      "credit": "Môsieur J. [version 9.1] from Rouen, France, CC BY 2.0, via Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 5 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Macaulay on the East India Company's monopoly (Speech on Copyright, 1841)",
        "excerpt": "Or rather, why should we not restore the monopoly of the East India trade to the East India Company? Why should we not revive all those old monopolies which, in Elizabeth's reign, galled our fathers so severely that, maddened by intolerable wrong, they opposed to their sovereign a resistance before which her haughty spirit quailed for the first and for the last time? Was it the cheapness and excellence of commodities that then so violently stirred the indignation of the English people? I believe, Sir, that I may with safety take it for granted that the effect of monopoly generally is to make articles scarce, to make them dear, and to make them bad.",
        "source": "Thomas Babington Macaulay, The Miscellaneous Writings and Speeches of Lord Macaulay, Vol. 4 (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/2170/pg2170.txt"
      },
      {
        "category": "historical",
        "title": "Ida Tarbell, The History of the Standard Oil Company — the South Improvement Company circular",
        "excerpt": "“The object of this combination of interests,” ran the circular, “is understood to be twofold: firstly, to do away, at least in a great measure, with the excessive and undue competition now existing between the refining interest, by reason of there being a far greater refining capacity than is called for or justified by the existing petroleum-consuming requirements of the world; secondly, to avoid the heretofore undue competition between the various railroad companies transporting oil to the seaboard, by fixing a uniform rate of freight... It is also asserted that a prominent feature of the combination will be to limit the production of refined petroleum to such amounts as may serve, in a great measure, to do away with the serious periodical depressions in the article.”",
        "source": "Ida M. Tarbell, The History of the Standard Oil Company (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/60692/pg60692.txt"
      },
      {
        "category": "literary",
        "title": "Adam Smith, The Wealth of Nations — on trades conspiring against the public",
        "excerpt": "People of the same trade seldom meet together, even for merriment and diversion, but the conversation ends in a conspiracy against the public, or in some contrivance to raise prices. It is impossible, indeed, to prevent such meetings, by any law which either could be executed, or would be consistent with liberty and justice. But though the law cannot hinder people of the same trade from sometimes assembling together, it ought to do nothing to facilitate such assemblies, much less to render them necessary.",
        "source": "Adam Smith, An Inquiry into the Nature and Causes of the Wealth of Nations (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/3300/pg3300.txt"
      },
      {
        "category": "literary",
        "title": "Shakespeare, The Merchant of Venice — argosies overpeering the petty traffickers",
        "excerpt": "Your mind is tossing on the ocean, There where your argosies, with portly sail Like signiors and rich burghers on the flood, Or as it were the pageants of the sea, Do overpeer the petty traffickers That curtsy to them, do them reverence, As they fly by them with their woven wings.",
        "source": "William Shakespeare, The Merchant of Venice (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/1515/pg1515.txt"
      },
      {
        "category": "artistic",
        "title": "Arthur Honegger, Pacific 231 (Mouvement symphonique No. 1), H.53 (1923)",
        "excerpt": "Honegger builds an entire orchestral machine out of a stationary locomotive slowly gathering speed: a low hiss of held strings, then pistons of brass and percussion accelerating into a hammering, unstoppable momentum before the great mass brakes to a halt. It is the sound of industrial power consolidating motion into a single overwhelming force — apt for a company that would rather absorb a continent's network than build track by track. The relentless churn evokes the logic of scale itself, where the biggest engine on the line makes every smaller trafficker curtsy in its wake.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Pacific_231,_H.53_(Honegger,_Arthur)"
      },
      {
        "category": "artistic",
        "title": "Quentin Matsys, The Moneylender and His Wife (1514)",
        "excerpt": "In Matsys' Antwerp panel a moneylender weighs gold coins on a delicate balance while his wife, a book of devotions in her lap, lets her eyes drift to the glittering pile — piety quietly displaced by the reckoning of value. Coins, pearls, a convex mirror and account-books crowd the table, portraying the merchant city where commerce, credit and consolidation of wealth had become the measure of all things. It is one of Northern art's sharpest images of the marketplace mind: everything, even the sacred, subordinated to the scales.",
        "source": "Quentin Matsys, The Moneylender and His Wife, Louvre (Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Quentin_Massys_001.jpg",
        "image": {
          "src": "/covers/uber-pauses-europe-delivery-hero--art.png",
          "alt": "Renaissance painting of a moneylender weighing gold coins on a balance while his wife watches, a table strewn with coins, pearls and account books",
          "credit": "Quentin Matsys (1514), Louvre; public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 7
  },
  {
    "slug": "foxconn-q2-revenue-geopolitics",
    "headline": "Foxconn reports a jump in second-quarter revenue but warns on geopolitical risk",
    "overview": "Foxconn, the world's largest contract electronics maker and a key Apple supplier, reported a jump in second-quarter revenue on strong demand, while cautioning that geopolitical uncertainty could weigh on its outlook. The Taiwan-based company pointed to trade tensions and shifting supply chains as risks. Its results are watched as a barometer of global technology demand.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters (via Google News)",
        "href": "https://news.google.com/rss/articles/CBMingFBVV95cUxPWmx3T3BFZ1E1WU1nRUZ1S1BJV3lNNnh0Vm5pRFIxYkw4STEzcDRhLTdSd0xrNVhsZEJEZjRCUTVXSmJoVmVJSXNwU1RKTmVxX2RpeVdEWFlyM0QtLWt5bVJydXhuYVMyZ2wzTGVFMWxTck16bEM3THJjWWl1X0FSOFRleklxdjJQMHU4QnN5U1BicnZvdjFYRlNjVEdrZw?oc=5"
      },
      {
        "name": "Reuters (via Investing.com)",
        "href": "https://www.investing.com/news/stock-market-news/foxconn-secondquarter-revenue-jumps-40-yy-4775408"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-05",
    "image": {
      "src": "/covers/foxconn-q2-revenue-geopolitics.png",
      "alt": "An automated machine placing electronic components onto a printed circuit board on a factory assembly line.",
      "credit": "Nenad Stojković, CC BY 2.0, via Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 5 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Adam Smith on the pin factory, The Wealth of Nations (1776)",
        "excerpt": "One man draws out the wire; another straights it; a third cuts it; a fourth points it; a fifth grinds it at the top for receiving the head; to make the head requires two or three distinct operations; to put it on is a peculiar business; to whiten the pins is another; it is even a trade by itself to put them into the paper; and the important business of making a pin is, in this manner, divided into about eighteen distinct operations, which, in some manufactories, are all performed by distinct hands, though in others the same man will sometimes perform two or three of them. I have seen a small manufactory of this kind, where ten men only were employed, and where some of them consequently performed two or three distinct operations. But though they were very poor, and therefore but indifferently accommodated with the necessary machinery, they could, when they exerted themselves, make among them about twelve pounds of pins in a day. There are in a pound upwards of four thousand pins of a middling size. Those ten persons, therefore, could make among them upwards of forty-eight thousand pins in a day.",
        "source": "Adam Smith, An Inquiry into the Nature and Causes of the Wealth of Nations (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/3300/pg3300.txt"
      },
      {
        "category": "historical",
        "title": "John Evelyn on the Arsenal of Venice, Diary (1645)",
        "excerpt": "The arsenal is thought to be one of the best furnished in the world. We entered by a strong port, always guarded, and, ascending a spacious gallery, saw arms of back, breast, and head, for many thousands; in another were saddles; over them, ensigns taken from the Turks. Another hall is for the meeting of the Senate; passing a graff, are the smiths' forges, where they are continually employed on anchors and iron work. Near it is a well of fresh water, which they impute to two rhinoceros's horns which they say lie in it, and will preserve it from ever being empoisoned. Then we came to where the carpenters were building their magazines of oars, masts, etc., for an hundred galleys and ships, which have all their apparel and furniture near them. Then the foundry, where they cast ordnance; the forge is 450 paces long, and one of them has thirteen furnaces. There is one cannon, weighing 16,573 pounds, cast while Henry the Third dined, and put into a galley built, rigged, and fitted for launching within that time.",
        "source": "The Diary of John Evelyn, Vol. 1 (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/41218/pg41218.txt"
      },
      {
        "category": "literary",
        "title": "Charles Dickens on Coketown, Hard Times (1854)",
        "excerpt": "It was a town of red brick, or of brick that would have been red if the smoke and ashes had allowed it; but as matters stood, it was a town of unnatural red and black like the painted face of a savage. It was a town of machinery and tall chimneys, out of which interminable serpents of smoke trailed themselves for ever and ever, and never got uncoiled. It had a black canal in it, and a river that ran purple with ill-smelling dye, and vast piles of building full of windows where there was a rattling and a trembling all day long, and where the piston of the steam-engine worked monotonously up and down, like the head of an elephant in a state of melancholy madness. It contained several large streets all very like one another, and many small streets still more like one another, inhabited by people equally like one another, who all went in and out at the same hours, with the same sound upon the same pavements, to do the same work, and to whom every day was the same as yesterday and to-morrow, and every year the counterpart of the last and the next.",
        "source": "Charles Dickens, Hard Times (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/786/pg786.txt"
      },
      {
        "category": "literary",
        "title": "Thomas Hood, The Song of the Shirt (1843)",
        "excerpt": "With fingers weary and worn,\nWith eyelids heavy and red,\nA woman sat in unwomanly rags,\nPlying her needle and thread—\nStitch! stitch! stitch!\nIn poverty, hunger, and dirt,\nAnd still with a voice of dolorous pitch\nShe sang the \"Song of the Shirt!\"\n\n\"Work! work! work!\nWhile the cock is crowing aloof!\nAnd work—work—work,\nTill the stars shine through the roof!\nIt's O! to be a slave\nAlong with the barbarous Turk,\nWhere woman has never a soul to save,\nIf this is Christian work!\"",
        "source": "Thomas Hood, The Poetical Works of Thomas Hood (Wikisource)",
        "href": "https://en.wikisource.org/wiki/The_Poetical_Works_of_Thomas_Hood/The_Song_of_the_Shirt"
      },
      {
        "category": "artistic",
        "title": "Arthur Honegger, Pacific 231, H.53 (1923)",
        "excerpt": "Arthur Honegger's Pacific 231 is a symphonic movement that portrays a great steam locomotive of that name, opening from near-stillness and mounting to a thundering full-throttle momentum before braking back toward rest. Honegger said he wanted to render not the imitation of engine noises but the visual impression and physical thrill of the machine — the swelling pressure, the hammering acceleration, three hundred tons of metal hurtling through the night. It remains one of the great modernist hymns to industry, the roar of engineered power translated into pure orchestral rhythm.",
        "source": "IMSLP / Petrucci Music Library (public-domain scores)",
        "href": "https://imslp.org/wiki/Pacific_231_(Honegger,_Arthur)"
      },
      {
        "category": "artistic",
        "title": "Joseph Wright of Derby, An Iron Forge (1772)",
        "excerpt": "Joseph Wright of Derby's An Iron Forge gathers a family around a bar of white-hot iron resting on the anvil, the incandescent metal itself casting the light that floods the whole nocturnal scene. Painted at the dawn of the Industrial Revolution, it lends the ironworker's labour the solemn drama once reserved for religious painting, while the water-powered tilt-hammer looming in the shadows announces the arrival of the machine age.",
        "source": "Joseph Wright of Derby, An Iron Forge (Tate Britain), via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Joseph_Wright_-_An_Iron_Forge_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/foxconn-q2-revenue-geopolitics--art.png",
          "alt": "Eighteenth-century painting of a family gathered around a glowing white-hot iron ingot on an anvil in a dim forge, the metal lighting their faces.",
          "credit": "Joseph Wright of Derby, An Iron Forge (1772), Tate Britain; public domain via Wikimedia Commons"
        }
      }
    ],
    "rank": 8
  },
  {
    "slug": "iraq-oil-export-pipeline-agreements",
    "headline": "Iraq approves preliminary agreements to study new oil-export pipeline projects",
    "overview": "Iraq's cabinet approved preliminary agreements to study new strategic oil-export pipeline projects, part of efforts to diversify the country's export routes. Officials said the agreements would allow feasibility work to proceed before any construction. Iraq is one of OPEC's largest producers and has long sought to reduce its dependence on existing export channels.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters (via Google News)",
        "href": "https://news.google.com/rss/articles/CBMiwgFBVV95cUxPanVDQU1kSjJIRXJsYkpBX1RPS2lZM1JZOERFMFVRdzloOG1YTUFSalBHMW9DTTA5d1NLWGpaUEVGRjlCZndKNUc1Q29taHNNWmxaSnNQZWx3cnZDc1BiNWJBUnNrM0kxTy1Zd19xLUVTdEM1TG53dE1valZMdHV6clphU0VIcGNYeDU2M3gtYWpyWXZ3YjJvaUYxX3VwUVNoUnVUak5pVzVvUzNqM19KVlRMZ2FqVlhralpCV1pvS1EwQQ?oc=5"
      },
      {
        "name": "Asharq Al-Awsat (English)",
        "href": "https://english.aawsat.com/business/5292266-iraq-approves-preliminary-agreements-study-strategic-oil-export-pipeline-projects"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-05",
    "image": {
      "src": "/covers/iraq-oil-export-pipeline-agreements.png",
      "alt": "The elevated Trans-Alaska oil pipeline snaking across open terrain, a raised steel conduit carrying crude over the land.",
      "credit": "Luca Galuzzi (Lucag), CC BY-SA 2.5, via Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 5 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Frontinus, De Aquaeductu (The Aqueducts of Rome), §16",
        "excerpt": "With such an array of indispensable structures carrying so many waters, compare, if you will, the idle Pyramids or the useless, though famous, works of the Greeks!",
        "source": "Frontinus, The Two Books on the Water Supply of the City of Rome, trans. Charles E. Bennett (LacusCurtius)",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Frontinus/De_Aquis/Bennett/1*.html"
      },
      {
        "category": "historical",
        "title": "Herodotus, Histories, Book II.158 — the canal from the Nile to the Red Sea",
        "excerpt": "The son of Psammetichos was Necos, and he became king of Egypt. This man was the first who attempted the channel leading to the Erythraian Sea, which Dareios the Persian afterwards completed: the length of this is a voyage of four days, and in breadth it was so dug that two triremes could go side by side driven by oars; and the water is brought into it from the Nile.",
        "source": "Herodotus, The History of Herodotus, trans. G. C. Macaulay (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/2707/pg2707.txt"
      },
      {
        "category": "literary",
        "title": "Samuel Taylor Coleridge, \"Kubla Khan\"",
        "excerpt": "In Xanadu did Kubla Khan\nA stately pleasure-dome decree:\nWhere Alph, the sacred river, ran\nThrough caverns measureless to man\nDown to a sunless sea.",
        "source": "The Complete Poetical Works of Samuel Taylor Coleridge (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/29090/pg29090.txt"
      },
      {
        "category": "literary",
        "title": "John Milton, Paradise Lost, Book I (Mammon and the ransacking of the earth)",
        "excerpt": "by him first\nMen also, and by his suggestion taught,\nRansack'd the Center, and with impious hands\nRifl'd the bowels of thir mother Earth\nFor Treasures better hid. Soon had his crew\nOp'nd into the Hill a spacious wound\nAnd dig'd out ribs of Gold. Let none admire\nThat riches grow in Hell; that soyle may best\nDeserve the pretious bane.",
        "source": "John Milton, Paradise Lost (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/20/pg20.txt"
      },
      {
        "category": "artistic",
        "title": "Bedřich Smetana, \"Vltava\" (The Moldau), from Má vlast",
        "excerpt": "Smetana's symphonic poem traces a single river from two trickling mountain springs, through hunting horns and a village wedding, past moonlit water-nymphs, into the roar of the St. John's Rapids, until the broadened stream sweeps in full-throated majesty past the castle of Vyšehrad. The music is pure flowing motion, the rippling strings never ceasing as the melody swells with the current's gathering power. It is the sound of a channel of water carrying a nation's life toward the sea, an apt echo of any great conduit that binds a land's wealth to distant waters.",
        "source": "Vltava, JB 1:112/2 (Smetana) — IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Vltava,_JB_1:112/2_(Smetana,_Bed%C5%99ich)"
      },
      {
        "category": "artistic",
        "title": "Hubert Robert, Le Pont du Gard (1786)",
        "excerpt": "Hubert Robert's grand canvas monumentalizes the Roman aqueduct of the Pont du Gard, its tiered arches glowing in warm evening light above the Gardon river. Painted for Louis XVI and now in the Louvre, the picture treats the ancient water-conduit as sublime architecture, a triumph of engineering that carried a vital resource across a landscape.",
        "source": "Musée du Louvre / Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Pont-du-gard-hubert-robert-1786.jpg",
        "image": {
          "src": "/covers/iraq-oil-export-pipeline-agreements--art.png",
          "alt": "Hubert Robert's painting of the towering tiered arches of the Roman Pont du Gard aqueduct spanning a river valley in golden light.",
          "credit": "Hubert Robert, Le Pont du Gard (1786), Musée du Louvre, public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 9
  },
  {
    "slug": "superflex-fish-architecture-sea-level",
    "headline": "Superflex and KWY.studio design underwater 'architecture for fish' for a rising-sea future",
    "overview": "The art collective Superflex and KWY.studio unveiled 'architecture for fish,' a design proposal for submerged structures intended to shelter marine life as sea levels rise, Dezeen reported on July 5, 2026. The project imagines coastal infrastructure that would become habitat for fish in a flooded future. It blends art, architecture and climate adaptation.",
    "genre": "Climate",
    "sources": [
      {
        "name": "Dezeen",
        "href": "https://www.dezeen.com/2026/07/05/superflex-kwy-studio-suepr-kello-fish-architecture/"
      },
      {
        "name": "Wallpaper*",
        "href": "https://www.wallpaper.com/art/superflex-super-reef"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-05",
    "image": {
      "src": "/covers/superflex-fish-architecture-sea-level.png",
      "alt": "A coral outcrop teeming with fish on Flynn Reef, Great Barrier Reef, Australia",
      "credit": "Toby Hudson, CC BY-SA 3.0, via Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 5 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Plato, Timaeus — the sinking of Atlantis",
        "excerpt": "A little while afterwards there were great earthquakes and floods, and your warrior race all sank into the earth; and the great island of Atlantis also disappeared in the sea.",
        "source": "Plato, Timaeus (trans. Benjamin Jowett)",
        "href": "https://www.gutenberg.org/cache/epub/1572/pg1572.txt"
      },
      {
        "category": "historical",
        "title": "Ovid, Metamorphoses Book I — the flood of Deucalion",
        "excerpt": "The Nereids wonder at the groves, the cities, and the houses under water; dolphins get into the woods, and run against the lofty branches, and beat against the tossed oaks.",
        "source": "Ovid, Metamorphoses, Book I (trans. Henry T. Riley)",
        "href": "https://www.gutenberg.org/files/21765/21765-h/21765-h.htm"
      },
      {
        "category": "literary",
        "title": "Shakespeare, The Tempest — Ariel's song 'Full fathom five'",
        "excerpt": "Full fathom five thy father lies;\nOf his bones are coral made;\nThose are pearls that were his eyes:\nNothing of him that doth fade,\nBut doth suffer a sea-change\nInto something rich and strange.\nSea-nymphs hourly ring his knell:\nDing-dong.\nHark! now I hear them—Ding-dong, bell.",
        "source": "William Shakespeare, The Tempest, Act I, Scene 2",
        "href": "https://www.gutenberg.org/cache/epub/23042/pg23042.txt"
      },
      {
        "category": "literary",
        "title": "Jules Verne, Twenty Thousand Leagues Under the Sea",
        "excerpt": "The great depths of the ocean are entirely unknown to us. Soundings cannot reach them. What passes in those remote depths—what beings live, or can live, twelve or fifteen miles beneath the surface of the waters—what is the organisation of these animals, we can scarcely conjecture.",
        "source": "Jules Verne, Twenty Thousand Leagues Under the Sea",
        "href": "https://www.gutenberg.org/cache/epub/164/pg164.txt"
      },
      {
        "category": "artistic",
        "title": "Claude Debussy, 'La cathédrale engloutie' (The Sunken Cathedral)",
        "excerpt": "Debussy's tenth prelude from Préludes, Book I, conjures a legendary cathedral that rises streaming from beneath the sea off the Breton coast, only to sink again into the deep. Great parallel chords toll like submerged bells while swelling arpeggios evoke water closing back over stone, so the whole piece seems to breathe underwater. It remains one of music's most haunting images of a drowned monument glimpsed through the waves.",
        "source": "Claude Debussy, Préludes, Livre 1 (IMSLP)",
        "href": "https://imslp.org/wiki/Pr%C3%A9ludes,_Livre_1_(Debussy,_Claude)"
      },
      {
        "category": "artistic",
        "title": "Arnold Böcklin, Im Spiel der Wellen (Play of the Waves)",
        "excerpt": "Böcklin's 1883 canvas plunges the viewer into a churning green sea where tritons and nereids tumble among the whitecaps, half-human bodies threading through the swell. The waves themselves seem alive, foaming and heaving as the mythic creatures ride and wrestle the water. It is a vision of the sea as a teeming, populated world in perpetual restless motion beneath the light.",
        "source": "Wikimedia Commons — File:Arnold Böcklin - Im Spiel der Wellen (1883).jpg",
        "href": "https://commons.wikimedia.org/wiki/File:Arnold_B%C3%B6cklin_-_Im_Spiel_der_Wellen_(1883).jpg",
        "image": {
          "src": "/covers/superflex-fish-architecture-sea-level--art.png",
          "alt": "Mythical sea creatures, tritons and nereids, tumbling and swimming among churning green ocean waves in Böcklin's painting",
          "credit": "Arnold Böcklin (1827–1901), public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 10
  },
  {
    "slug": "terta-iceland-power-station-playground",
    "headline": "Terta turns a decommissioned Reykjavik power station into a colourful children's play space",
    "overview": "The studio Terta has transformed Elliðaárstöð, a decommissioned power station in Reykjavik, Iceland, into a brightly coloured space for 'learning by playing,' Dezeen reported on July 5, 2026. The project repurposes the historic industrial building into a children's play and education venue. It preserves the structure's heritage while giving it a new public use.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Dezeen",
        "href": "https://www.dezeen.com/2026/07/05/terta-ellidaarstod-power-station/"
      },
      {
        "name": "Terta — Elliðaárstöð (studio project page)",
        "href": "https://www.terta.is/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-05",
    "image": {
      "src": "/covers/terta-iceland-power-station-playground.png",
      "alt": "A small Icelandic hydroelectric power station building of pale concrete standing beside a river with a rocky gorge and waterfall behind it",
      "credit": "Andakílsvirkjun hydroelectric power station, Iceland. Photo by Bromr, CC BY-SA 3.0, via Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 5 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Froebel's kindergarten idea: learning by playing",
        "excerpt": "Play is the natural, the appropriate business and occupation of the child left to his own resources, and we must strive to turn our lessons into that channel,--only thus shall we reach the highest measure of true success.",
        "source": "Kate Douglas Wiggin & Nora Archibald Smith, Froebel's Gifts (1895)",
        "href": "https://www.gutenberg.org/cache/epub/31097/pg31097.txt"
      },
      {
        "category": "historical",
        "title": "Jane Addams on the city's duty to provide for play",
        "excerpt": "Only in the modern city have men concluded that it is no longer necessary for the municipality to provide for the insatiable desire for play. In so far as they have acted upon this conclusion, they have entered upon a most difficult and dangerous experiment; and this at the very moment when the city has become distinctly industrial, and daily labor is continually more monotonous and subdivided.",
        "source": "Jane Addams, The Spirit of Youth and the City Streets (1909)",
        "href": "https://www.gutenberg.org/cache/epub/16221/pg16221.txt"
      },
      {
        "category": "literary",
        "title": "Block City — Robert Louis Stevenson",
        "excerpt": "What are you able to build with your blocks?\nCastles and palaces, temples and docks.\nRain may keep raining, and others go roam,\nBut I can be happy and building at home.\n\nLet the sofa be mountains, the carpet be sea,\nThere I'll establish a city for me:\nA kirk and a mill and a palace beside,\nAnd a harbour as well where my vessels may ride.\n\nGreat is the palace with pillar and wall,\nA sort of a tower on the top of it all,\nAnd steps coming down in an orderly way\nTo where my toy vessels lie safe in the bay.\n\nThis one is sailing and that one is moored:\nHark to the song of the sailors on board!\nAnd see, on the steps of my palace, the kings\nComing and going with presents and things!\n\nNow I have done with it, down let it go!\nAll in a moment the town is laid low.\nBlock upon block lying scattered and free,\nWhat is there left of my town by the sea?\n\nYet as I saw it, I see it again,\nThe kirk and the palace, the ships and the men,\nAnd as long as I live and where'er I may be,\nI'll always remember my town by the sea.",
        "source": "Robert Louis Stevenson, A Child's Garden of Verses (1885)",
        "href": "https://www.gutenberg.org/cache/epub/25609/pg25609.txt"
      },
      {
        "category": "literary",
        "title": "The Echoing Green — William Blake",
        "excerpt": "The sun does arise,\nAnd make happy the skies;\nThe merry bells ring\nTo welcome the Spring;\nThe skylark and thrush,\nThe birds of the bush,\nSing louder around\nTo the bells' cheerful sound;\nWhile our sports shall be seen\nOn the echoing green.\n\nOld John, with white hair,\nDoes laugh away care,\nSitting under the oak,\nAmong the old folk.\nThey laugh at our play,\nAnd soon they all say,\n'Such, such were the joys\nWhen we all—girls and boys—\nIn our youth-time were seen\nOn the echoing green.'\n\nTill the little ones, weary,\nNo more can be merry:\nThe sun does descend,\nAnd our sports have an end.\nRound the laps of their mothers\nMany sisters and brothers,\nLike birds in their nest,\nAre ready for rest,\nAnd sport no more seen\nOn the darkening green.",
        "source": "William Blake, Songs of Innocence and of Experience (1789)",
        "href": "https://www.gutenberg.org/cache/epub/1934/pg1934.txt"
      },
      {
        "category": "artistic",
        "title": "Kinderszenen (Scenes from Childhood), Op. 15 — Robert Schumann",
        "excerpt": "Schumann's thirteen miniatures for solo piano look back on childhood not from inside it but through an adult's tender remembering, each tiny scene a room in a house of play. Curious tales, games of tag ('Hasche-Mann'), the hobby-horse knight and the dreamy 'Träumerei' conjure the small, serious world of a child at play, before the closing 'Der Dichter spricht' lets the poet step forward to speak. It is exactly the spirit a colourful play-space hopes to bottle: wonder made from the plainest materials.",
        "source": "IMSLP — Kinderszenen, Op.15 (Schumann, Robert)",
        "href": "https://imslp.org/wiki/Kinderszenen,_Op.15_(Schumann,_Robert)"
      },
      {
        "category": "artistic",
        "title": "Children's Games — Pieter Bruegel the Elder (1560)",
        "excerpt": "Bruegel fills an entire town square with some two hundred children absorbed in roughly eighty games—leapfrog, hoops, hobby-horses, blind-man's-buff, handstands against a brick wall—turning ordinary streets and buildings into a vast open-air playground. Painted in 1560, it is one of art's great hymns to play as the serious business of childhood, and a fitting ancestor to a whole building given over to learning by playing.",
        "source": "Kunsthistorisches Museum, Vienna — via Wikimedia Commons (public domain)",
        "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_the_Elder_-_Children%E2%80%99s_Games_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/terta-iceland-power-station-playground--art.png",
          "alt": "A crowded 16th-century town square packed with hundreds of children playing dozens of different games",
          "credit": "Pieter Bruegel the Elder, Children's Games (1560), Kunsthistorisches Museum, Vienna — public domain via Wikimedia Commons"
        }
      }
    ],
    "rank": 11
  },
  {
    "slug": "new-york-ship-parade-banners-removed",
    "headline": "Vessel is removed from New York's July 4 ship parade over politically charged banners",
    "overview": "A vessel was removed from an international ship parade in New York Harbor after it displayed banners that organizers deemed politically charged, Reuters reported on July 5, 2026. The parade was part of festivities marking the United States' 250th anniversary of independence. Organizers said the display violated the event's rules.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Reuters (via Google News)",
        "href": "https://news.google.com/rss/articles/CBMitwFBVV95cUxQNU5VTHZkWTIyNkE0Ry0zOFNsVE5odUpqb0NEQnplMFRIQ1dSb3RuWDlpN1RZUWk4VUJ4Mzh5WkF0eC1hdWtWaFpial9Zb0J0dm11ekg5NDBTcEs1cnhLU3lzWGRST1BBamdYT0cxdUFqeER0ZG9TWW44SmlQVUttYVBBd1RYanVQZWZXVHYzNDgzX3A0OWhtaXlwZjd4cWpVUS1PN3E4RHdlOXdPUFN3SWpVQ3VOWkE?oc=5"
      },
      {
        "name": "Newsweek",
        "href": "https://www.newsweek.com/historic-activist-ship-ejected-nyc-july-4-parade-over-climate-banners-12158749"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-05",
    "image": {
      "src": "/covers/new-york-ship-parade-banners-removed.png",
      "alt": "Tall ships led by the U.S. Coast Guard barque Eagle parade through New York Harbor during OpSail 2000.",
      "credit": "Photographer's Mate 1st Class Johnny Bivera, U.S. Navy (public domain) — OpSail 2000 / International Naval Review, New York Harbor"
    },
    "edition": "Afternoon Edition · 5 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Xerxes Reviews His Fleet at Abydos (The Histories, Book VII)",
        "excerpt": "When Xerxes had come into the midst of Abydos, he had a desire to see all the army; and there had been made purposely for him beforehand upon a hill in this place a raised seat of white stone, which the people of Abydos had built at the command of the king given beforehand. There he took his seat, and looking down upon the shore he gazed both upon the land-army and the ships; and gazing upon them he had a longing to see a contest take place between the ships; and when it had taken place and the Phenicians of Sidon were victorious, he was delighted both with the contest and with the whole armament.",
        "source": "Herodotus, The Histories, trans. G. C. Macaulay — Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/2456/pg2456.txt"
      },
      {
        "category": "historical",
        "title": "The Athenian Armada Sails from the Piraeus (History of the Peloponnesian War, Book VI)",
        "excerpt": "The ships being now manned, and everything put on board with which they meant to sail, the trumpet commanded silence, and the prayers customary before putting out to sea were offered, not in each ship by itself, but by all together to the voice of a herald; and bowls of wine were mixed through all the armament, and libations made by the soldiers and their officers in gold and silver goblets. In their prayers joined also the crowds on shore, the citizens and all others that wished them well. The hymn sung and the libations finished, they put out to sea, and first out in column then raced each other as far as Aegina.",
        "source": "Thucydides, History of the Peloponnesian War, trans. Richard Crawley — Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/7142/pg7142.txt"
      },
      {
        "category": "literary",
        "title": "Crossing Brooklyn Ferry",
        "excerpt": "Come on, ships from the lower bay! pass up or down, white-sail’d schooners, sloops, lighters! Flaunt away, flags of all nations! be duly lower’d at sunset!",
        "source": "Walt Whitman, Leaves of Grass — Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/1322/pg1322.txt"
      },
      {
        "category": "literary",
        "title": "The Mask of Anarchy",
        "excerpt": "‘Rise like Lions after slumber / In unvanquishable number, / Shake your chains to earth like dew / Which in sleep had fallen on you— / Ye are many—they are few.",
        "source": "Percy Bysshe Shelley, The Complete Poetical Works — Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/4800/pg4800.txt"
      },
      {
        "category": "artistic",
        "title": "Water Music, HWV 348–350",
        "excerpt": "Handel composed the Water Music for King George I's grand river procession up the Thames on 17 July 1717, when a barge of some fifty musicians played alongside the royal barge as it drifted from Whitehall to Chelsea. Its sparkling hornpipes, stately minuets, and pealing horn and trumpet fanfares were designed to carry across open water to crowds thronging the banks and countless accompanying boats. It remains the definitive sound of festive nautical pageantry — ceremony afloat, meant for a fleet of vessels on parade.",
        "source": "George Frideric Handel — IMSLP",
        "href": "https://imslp.org/wiki/Water_Music,_HWV_348-350_(Handel,_George_Frideric)"
      },
      {
        "category": "artistic",
        "title": "A Regatta on the Grand Canal",
        "excerpt": "Canaletto's Regatta on the Grand Canal captures Venice's great civic water-festival: gondolas and decorated boats crowd the canal in a choreographed maritime procession while spectators mass on balconies, quays, and the ornate floating grandstand (the macchina). The painting distills the enduring appeal of the harbor pageant — a city turning its waterways into a stage of ships, flags, and public spectacle.",
        "source": "Giovanni Antonio Canal (Canaletto), Gemäldegalerie Alte Meister, Dresden — Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Giovanni_Antonio_Canal,_il_Canaletto_-_Regatta_on_the_Canale_Grande_-_WGA03904.jpg",
        "image": {
          "src": "/covers/new-york-ship-parade-banners-removed--art.png",
          "alt": "Boats and gondolas crowd Venice's Grand Canal during a regatta as spectators watch from palace balconies and quays.",
          "credit": "Canaletto, Regatta on the Grand Canal (c. 1740), Web Gallery of Art — public domain via Wikimedia Commons"
        }
      }
    ],
    "rank": 12
  },
  {
    "slug": "iran-khamenei-succession-question",
    "headline": "Khamenei's sons appear at his Tehran funeral as questions mount over his successor",
    "overview": "Three of the late Ayatollah Ali Khamenei's sons appeared at his funeral in Tehran, while the cleric reported to be his expected successor did not appear publicly, according to Reuters, sharpening questions over who will become Iran's next supreme leader. Khamenei, who led Iran for decades, was killed in the recent war. The succession is among the most consequential in the country's modern history.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters (via Google News)",
        "href": "https://news.google.com/rss/articles/CBMiwwFBVV95cUxNRmcyb0xaUjZMcUNjSDFQODFUX0Y1TDg0bDlHUkxLZE5FeWZQajJtZnRKYjRWdzZjN0RmRWcwdFN1dWtkLXdhUWFGNGJKVTFSSDJVRnV4Yy05YWJVbjh4RjJyS1YxdnBOMW9jQVp5Uk9aa1hxYmd1RndVZER6dTBSa0V2cnQxTTFscG5rY1hpV3NEMVNIeWJ0TFF4WE9XcEdoanFyVmtkenhSbXhvdnU1c3BQNEVOVmM1OHgyVmJvdGR3aWc?oc=5"
      },
      {
        "name": "NPR — \"Dayslong funeral for slain Supreme Leader Ayatollah Ali Khamenei begins in Tehran\"",
        "href": "https://www.npr.org/2026/07/04/nx-s1-5882083/iran-funeral-ayatollah-ali-khamenei"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-05",
    "image": {
      "src": "/covers/iran-khamenei-succession-question.png",
      "alt": "Baroque painting of grieving Roman soldiers and family gathered around the deathbed of a leader, mourning as the question of who will succeed him hangs over the scene.",
      "credit": "Nicolas Poussin, The Death of Germanicus (1627), Minneapolis Institute of Art — public domain, via Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 5 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Arrian on the death of Alexander the Great: \"To the best\"",
        "excerpt": "It is said that when his soldiers passed by him he was unable to speak; yet he greeted each of them with his right hand, raising his head with difficulty and making a sign with his eyes. Some authors, however, have related that his Companions asked him to whom he left his kingdom; and that he replied: \"To the best.\"",
        "source": "Arrian, The Anabasis of Alexander, Book VII, Ch. XXVI (trans. E. J. Chinnock)",
        "href": "https://en.wikisource.org/wiki/The_Anabasis_of_Alexander/Book_VII/Chapter_XXVI"
      },
      {
        "category": "historical",
        "title": "Tacitus on the accession of Tiberius after Augustus",
        "excerpt": "So Tiberius Nero, though he took to himself the same phrases and the same face, entered the palace... one and the same report told men that Augustus was dead and that Tiberius Nero was master of the State. The first crime of the new reign was the murder of Postumus Agrippa.",
        "source": "Tacitus, The Annals, Book I",
        "href": "https://en.wikisource.org/wiki/The_Annals_(Tacitus)/Book_1"
      },
      {
        "category": "literary",
        "title": "The contested succession of David: Adonijah versus Solomon (1 Kings 1)",
        "excerpt": "Then Adonijah the son of Haggith exalted himself, saying, I will be king: and he prepared him chariots and horsemen, and fifty men to run before him. And his father had not displeased him at any time in saying, Why hast thou done so? and he also was a very goodly man; and his mother bare him after Absalom. And he conferred with Joab the son of Zeruiah, and with Abiathar the priest: and they following Adonijah helped him. ... So Zadok the priest, and Nathan the prophet, and Benaiah the son of Jehoiada, and the Cherethites, and the Pelethites, went down, and caused Solomon to ride upon king David's mule, and brought him to Gihon. And Zadok the priest took an horn of oil out of the tabernacle, and anointed Solomon.",
        "source": "The Bible, King James Version, 1 Kings 1:5-7, 38-39",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/1_Kings"
      },
      {
        "category": "literary",
        "title": "Prince Henry takes the crown from his dying father (Shakespeare, Henry IV, Part 2)",
        "excerpt": "Why doth the crown lie there upon his pillow,\nBeing so troublesome a bedfellow?\nO polish'd perturbation! golden care!\nThat keep'st the ports of slumber open wide\nTo many a watchful night! Sleep with it now!\nYet not so sound, and half so deeply sweet\nAs he whose brow with homely biggin bound\nSnores out the watch of night. O majesty!\nWhen thou dost pinch thy bearer, thou dost sit\nLike a rich armour worn in heat of day,\nThat scalds with safety. ... My gracious lord! my father!\nThis sleep is sound indeed; this is a sleep\nThat from this golden rigol hath divorc'd\nSo many English kings. ... My due from thee is this imperial crown,\nWhich, as immediate from thy place and blood,\nDerives itself to me.",
        "source": "William Shakespeare, The Second Part of King Henry the Fourth, Act IV",
        "href": "https://en.wikisource.org/wiki/Henry_IV_Part_2_(1921)_Yale/Text/Act_IV"
      },
      {
        "category": "artistic",
        "title": "Handel, Zadok the Priest (Coronation Anthem, HWV 258)",
        "excerpt": "Handel composed Zadok the Priest for the coronation of George II at Westminster Abbey in 1727, setting the very words of Solomon's anointing from the First Book of Kings, and it has been sung at every British coronation since. The anthem opens with a long, quietly gathering orchestral crescendo that finally explodes as the full chorus enters on the moment of anointing — a pure sonic image of legitimacy being conferred and succession made unquestionable. That slow build and sudden burst make it the sound of power passing cleanly from one head to the next, exactly the certainty absent in Tehran.",
        "source": "George Frideric Handel, Zadok the Priest, HWV 258 (IMSLP)",
        "href": "https://imslp.org/wiki/Zadok_the_Priest,_HWV_258_(Handel,_George_Frideric)"
      },
      {
        "category": "artistic",
        "title": "Jacques-Louis David, The Coronation of Napoleon",
        "excerpt": "David's monumental Coronation of Napoleon (1805-07) freezes the exact instant power is transferred and sanctified, as Napoleon — having crowned himself — crowns Joséphine before the assembled court, clergy and pope in Notre-Dame. Commissioned to manufacture an aura of dynastic permanence for a brand-new empire, the canvas reveals a coronation as theatre of succession, every gaze and gesture staged to make the new order look inevitable. It is the visual opposite of an absent, unseen heir: legitimacy asserted in blinding public spectacle.",
        "source": "Jacques-Louis David, Sacre de l'empereur Napoléon Ier (1805-07), Louvre, via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Jacques-Louis_David,_The_Coronation_of_Napoleon_edit.jpg",
        "image": {
          "src": "/covers/iran-khamenei-succession-question--art.png",
          "alt": "Vast neoclassical painting of Napoleon in imperial robes raising a crown over the kneeling Empress Joséphine amid a crowded cathedral of dignitaries and clergy, staging the transfer of sovereign power.",
          "credit": "Jacques-Louis David, The Coronation of Napoleon (1805-07), Louvre — public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 13
  },
  {
    "slug": "taylor-swift-travis-kelce-wedding",
    "headline": "Taylor Swift and Travis Kelce marry at Madison Square Garden with Adam Sandler officiating",
    "overview": "Taylor Swift and NFL star Travis Kelce were married on July 4, 2026 inside Madison Square Garden in New York, with the actor and comedian Adam Sandler officiating. Guests said the couple exchanged vows in an intimate garden set built within the arena; the bride wore Dior, and a celebrity-heavy guest list drew fans and media worldwide. The wedding capped a relationship that had become one of the most closely followed celebrity pairings in recent memory.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP (via Google News)",
        "href": "https://news.google.com/rss/articles/CBMimAFBVV95cUxOTHRRWXZCUDd4RWUzZ0JvMHdwbUp1ZjVXVVYxVVVrTkpZMWhyQk15R1ZrWTVldDd1Qm9xMXI2TDZYa3g5bTBybEtDbzh1ejJzTFlmMzNfTHNSc0JaejFORjd2LUttSzU2VUMwWHYzVWJIdC14bXNBdTdkMUFjWWZqdVp0bEtBcURqQzJUbDhGNVY4TGVWXzMyYg?oc=5"
      },
      {
        "name": "BBC News",
        "href": "https://www.bbc.co.uk/news/articles/c982ry2pen3o"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-04",
    "image": {
      "src": "/covers/taylor-swift-travis-kelce-wedding.png",
      "alt": "The vast interior of Madison Square Garden in New York, the arena where Taylor Swift and Travis Kelce were married.",
      "credit": "Interior of Madison Square Garden; Wikimedia Commons (CC0)"
    },
    "lead": true,
    "edition": "Morning Edition · 5 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Wedding of Queen Victoria and Prince Albert (10 February 1840)",
        "excerpt": "The wedding on Monday went off tolerably well. The week before was fine, and Albert drove about the town with a mob shouting at his heels. Tuesday, Wednesday, and to-day, all beautiful days; but Monday, as if by a malignant influence, was a dreadful day—torrents of rain, and violent gusts of wind. Nevertheless a countless multitude thronged the park, and was scattered over the town. I never beheld such a congregation as there was, in spite of the weather. The Queen proceeded in state from Buckingham House to St. James's without any cheering, but then it was raining enough to damp warmer loyalty than that of a London mob. The procession in the Palace was pretty enough by all accounts, and she went through the ceremony with much grace and propriety, not without emotion, though sufficiently subdued, and her manner to her family was very pretty and becoming.",
        "source": "Charles C. F. Greville, A Journal of the Reign of Queen Victoria, 1837–1852, Vol. I (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/24504/pg24504.txt"
      },
      {
        "category": "historical",
        "title": "The Weddings at Susa: Alexander the Great and his Companions (324 BC)",
        "excerpt": "The weddings were celebrated after the Persian manner, seats being placed in a row for the bridegrooms; and after the banquet the brides came in and seated themselves, each one near her own husband. The bridegrooms took them by the right hand and kissed them; the king being the first to begin, for the weddings of all were conducted in the same way. This appeared the most popular thing which Alexander ever did; and it proved his affection for his Companions. Each man took his own bride and led her away; and on all without exception Alexander bestowed dowries.",
        "source": "Arrian, Anabasis of Alexander, Book VII, ch. IV, trans. E. J. Chinnock (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/46976/pg46976.txt"
      },
      {
        "category": "literary",
        "title": "Epithalamion",
        "excerpt": "Harke! how the minstrils gin to shrill aloud\nTheir merry musick that resounds from far,\nThe pipe, the tabor, and the trembling croud,\nThat well agree withouten breach or iar.\nBut most of all the damzels doe delite,\nWhen they their tymbrels smyte,\nAnd thereunto doe daunce and carrol sweet,\nThat all the sences they doe ravish quite;\nThe whyles the boyes run up and downe the street,\nCrying aloud with strong confused noyce,\nAs if it were one voyce,\n\"Hymen, Iö Hymen, Hymen,\" they do shout;\nThat even to the heavens theyr shouting shrill\nDoth reach, and all the firmament doth fill;\nTo which the people, standing all about,\nAs in approvance, doe thereto applaud,\nAnd loud advaunce her laud;\nAnd evermore they \"Hymen, Hymen,\" sing,\nThat all the woods them answer, and theyr eccho ring.",
        "source": "Edmund Spenser, Epithalamion (1595), in The Poetical Works of Edmund Spenser (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/10602/pg10602.txt"
      },
      {
        "category": "literary",
        "title": "The Song of Solomon 3:11 — the King's Wedding Procession",
        "excerpt": "Go forth, O ye daughters of Zion, and behold king Solomon with the crown wherewith his mother crowned him in the day of his espousals, and in the day of the gladness of his heart.",
        "source": "The Song of Solomon, King James Version (Wikisource)",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Song_of_Solomon"
      },
      {
        "category": "artistic",
        "title": "Wedding March (No. 9) from A Midsummer Night's Dream, Op. 61",
        "excerpt": "Composed as incidental music for Shakespeare's comedy, Mendelssohn's Wedding March erupts in blazing C-major fanfares that have escorted brides and grooms from the altar for nearly two centuries. Its triumphant brass and pealing chords turn a private vow into a public procession, the very sound of a crowd rising to its feet. No melody has more completely become the anthem of the wedding as grand spectacle, the union of two figures paraded before an adoring throng.",
        "source": "IMSLP: A Midsummer Night's Dream, Op.61 (Mendelssohn, Felix)",
        "href": "https://imslp.org/wiki/A_Midsummer_Night%27s_Dream,_Op.61_(Mendelssohn,_Felix)"
      },
      {
        "category": "artistic",
        "title": "The Arnolfini Portrait",
        "excerpt": "In a richly furnished Bruges chamber a solemn couple join hands in what generations of viewers have read as a marriage or betrothal, their union witnessed by tiny figures mirrored in the convex glass on the far wall. Every object testifies to the sacred weight of the vow: the single lit candle, the faithful little dog, the shoes slipped off on holy ground, the ripe oranges of prosperity. Above the mirror the painter signs himself as a present witness — 'Johannes de eyck fuit hic 1434,' Jan van Eyck was here — making the intimate rite an enduring public record.",
        "source": "Jan van Eyck, The Arnolfini Portrait (1434), National Gallery, London — Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Van_Eyck_-_Arnolfini_Portrait.jpg",
        "image": {
          "src": "/covers/taylor-swift-travis-kelce-wedding--art.png",
          "alt": "A man in a dark fur-trimmed robe and a woman in a full green gown join hands in an opulent bedchamber; a small dog stands at their feet, a single candle burns in the chandelier, and a round mirror hangs on the wall behind them.",
          "credit": "Jan van Eyck, The Arnolfini Portrait, 1434, oil on oak panel, National Gallery, London. Public domain via Wikimedia Commons."
        }
      }
    ],
    "rank": 14
  },
  {
    "slug": "trump-ukraine-peace-putin-zelensky-calls",
    "headline": "Trump offers to help broker a Ukraine deal after separate calls with Putin and Zelensky",
    "overview": "President Donald Trump said on July 4, 2026 that he had offered to help Russia and Ukraine reach a settlement, speaking by phone with Russian President Vladimir Putin and, separately, with Ukrainian President Volodymyr Zelensky. Zelensky said afterward that he had urged 'American resolve' to help end the war and pressed for stronger air-defense support. The overtures came as fighting continued in eastern Ukraine and after recent Ukrainian long-range strikes inside Russia.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters (via Google News)",
        "href": "https://news.google.com/rss/articles/CBMiwwFBVV95cUxNQ3Z6dHlGeW9Jcy1FYzg0OGJMRFhNWlFucnlnalREWTZnQnlrVUxMSm9Mclloclh2QkRqMlRTSDBCNHNBS0VFV08xLUVBejFrVVFKQk5rNGk0YlhiSXZYcFlJbWFqY0tpQWNnTkdNMVRhd0ZYN2s1bThsbk5xMEc2VklRd1pCc1huMDNFTjBlLTlHeE1XaUFudmR6RTE4ejhtUERSREVGNEN0emdyd3RSekJwWm5IRUgzWmdsVGs1dDMtNTg?oc=5"
      },
      {
        "name": "Reuters — Zelensky calls for American resolve (via Google News)",
        "href": "https://news.google.com/rss/articles/CBMitwFBVV95cUxQR1ctYWUyVXNZVTQ3Qld0Y2pmMmQ0MFVEUE9qalZVMldzSWlfc0FSdHo2VENpbHhwX2lxWVNzSl9TQWVqMlgyRmNPYkY3OWk0ZjNTQzEyV25CTV9WX1F3dzFFaWJSNEVaQnJqNzNMUzlTWkN4aHFEZ2FYc3cwUTFhdHZzZllIUWVVMnZpQng1MVl1aXRrX045U21NQ3I5eW0yOU1NN2JPNW8wdjRCcDRPcGJBekZ5bXM?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-04",
    "image": {
      "src": "/covers/trump-ukraine-peace-putin-zelensky-calls.png",
      "alt": "US President Donald Trump and Ukrainian President Volodymyr Zelensky seated together during a meeting.",
      "credit": "Volodymyr Zelensky and Donald Trump; public domain via Wikimedia Commons"
    },
    "edition": "Morning Edition · 5 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Treaty of Portsmouth (1905)",
        "excerpt": "There shall henceforth be peace and amity between Their Majesties the Emperor of Japan and the Emperor of all the Russias and between Their respective States and subjects.",
        "source": "Treaty of Portsmouth, ending the Russo-Japanese War, via Wikisource",
        "href": "https://en.wikisource.org/wiki/Treaty_of_Portsmouth"
      },
      {
        "category": "historical",
        "title": "The Peace of Nicias",
        "excerpt": "The Athenians and Lacedaemonians and their allies made a treaty, and swore to it, city by city, as follows; ... 3. The treaty shall be binding for fifty years upon the Athenians and the allies of the Athenians, and upon the Lacedaemonians and the allies of the Lacedaemonians, without fraud or hurt by land or by sea.",
        "source": "Thucydides, History of the Peloponnesian War, Book V (Crawley translation), via Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/7142/pg7142.txt"
      },
      {
        "category": "literary",
        "title": "The Embassy to Achilles (Iliad, Book IX)",
        "excerpt": "The gifts you offer are no small ones, let us then send chosen messengers, who may go to the tent of Achilles son of Peleus without delay. Let those go whom I shall name. Let Phoenix, dear to Jove, lead the way; let Ajax and Ulysses follow, and let the heralds Odius and Eurybates go with them.",
        "source": "Homer, The Iliad (Samuel Butler prose translation), via Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/2199/pg2199.txt"
      },
      {
        "category": "literary",
        "title": "Aristophanes' Peace",
        "excerpt": "'Tis now, oh Greeks! the moment when freed of quarrels and fighting, we should rescue sweet Peace and draw her out of this pit, before some other pestle prevents us. Come, labourers, merchants, workmen, artisans, strangers, whether you be domiciled or not, islanders, come here, Greeks of all countries, come hurrying here with picks and levers and ropes!",
        "source": "Aristophanes, Peace (Athenian Society translation), via Project Gutenberg",
        "href": "https://www.gutenberg.org/files/2571/2571.txt"
      },
      {
        "category": "artistic",
        "title": "Utrecht Te Deum, HWV 278",
        "excerpt": "Handel composed the Utrecht Te Deum in 1713 to crown the Peace of Utrecht, the great settlement that ended the War of the Spanish Succession. Its blazing trumpets and massed voices turn a negotiated treaty into public thanksgiving, the sound of exhausted enemies finally laying down their arms. First heard beneath the dome of St Paul's Cathedral, it makes the act of signing a peace feel like a nation exhaling.",
        "source": "IMSLP: Te Deum in D major, HWV 278 (Handel, George Frideric)",
        "href": "https://imslp.org/wiki/Te_Deum_in_D_major,_HWV_278_(Handel,_George_Frideric)"
      },
      {
        "category": "artistic",
        "title": "The Ratification of the Treaty of Münster, 15 May 1648",
        "excerpt": "Ter Borch's small oil on copper freezes the exact instant peace becomes real: Dutch and Spanish envoys, crowded into the Münster town hall, raise their hands to swear the oath that ended eighty years of war. The painter was present at the ceremony and slipped his own face into the left edge of the crowd, making himself a witness to a treaty being born. It is one of the earliest paintings to record an actual diplomatic signing rather than an allegory of peace.",
        "source": "Gerard ter Borch, The Ratification of the Treaty of Münster (1648), Rijksmuseum, via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:The_Ratification_of_the_Treaty_of_Munster,_Gerard_Ter_Borch_(1648).jpg",
        "image": {
          "src": "/covers/trump-ukraine-peace-putin-zelensky-calls--art.png",
          "alt": "A crowded seventeenth-century hall where Dutch and Spanish delegations, in dark robes and white ruffs, gather around a table and raise their hands to swear the oath ratifying the Peace of Munster.",
          "credit": "Gerard ter Borch, 1648, Rijksmuseum, Amsterdam; public domain via Wikimedia Commons"
        }
      }
    ],
    "rank": 15
  },
  {
    "slug": "patriot-front-masked-march-washington",
    "headline": "Masked Patriot Front members stage a July 4 march through Washington, DC",
    "overview": "Hundreds of masked members of the white-nationalist group Patriot Front marched through downtown Washington, DC on July 4, 2026, carrying shields and flags in a choreographed procession. Photographs showed ranks of participants in matching attire with their faces covered. The demonstration, on the nation's Independence Day, drew condemnation and renewed scrutiny of organized extremist movements in the United States.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters (via Google News)",
        "href": "https://news.google.com/rss/articles/CBMitAFBVV95cUxOb3R0bHRwLXM2YXd2dTZpc0tWekt5aDM3NkhycjZpdFdVWDFrRUZ5c1RfbXU4YWtmLV9vSUViNnRJeERwMmZpVGZGSjczbFZ5VV9EU3lhLXFNbGltUzZIaE93NkRnZmxxczJUMk0tLXhpcjhGaDBhVjlnTGNVTzduRE84d0xPX2toVm1CRTZQWWRJckNzNEVNZXJ0OGxfQnZjWmw0QjVzdGM1UGNmZzdBXzQxUVI?oc=5"
      },
      {
        "name": "Reuters — Photos of the march (via Google News)",
        "href": "https://news.google.com/rss/articles/CBMiuAFBVV95cUxOZzFqZVFwYU12QW1EOWFJcXY4b0ZSbEV0NDdUQ3ZqTlk5YWhpUVFEVUNXUUFTYWlERGwzcnM5Uy1QbFNnNldtYWczMjhOVjQ5Rk9CNVFFNEszUEJnUEh0aWJLYUxQM3dXb1Y0bnpTclE3QnJPNS1RQ2tqSm0ybGN5dElPQjV6SnNKTTM1SEJaWWkxMG0zd1k5UWR3WHkweHJNbjFOelpMY0lBOF9rMGpEYWUzTnJDXzlr?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-04",
    "image": {
      "src": "/covers/patriot-front-masked-march-washington.png",
      "alt": "Members of the white-nationalist group Patriot Front marching in matching attire through Washington, DC.",
      "credit": "Patriot Front in Washington, DC; Wikimedia Commons (CC BY-SA 4.0)"
    },
    "edition": "Morning Edition · 5 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Ku Klux Klan: Its Origin, Growth and Disbandment",
        "excerpt": "In single file, in death-like stillness, with funeral slowness, they marched and counter-marched throughout the town.",
        "source": "John C. Lester and D. L. Wilson (1884); Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/31819/pg31819.txt"
      },
      {
        "category": "historical",
        "title": "The History of Rome, Book 39 (the Bacchanalian conspiracy)",
        "excerpt": "They formed an immense multitude, almost equal to the population of Rome; amongst them were members of noble families both men and women.",
        "source": "Livy, trans. Rev. Canon Roberts (1905); Wikisource",
        "href": "https://en.wikisource.org/wiki/From_the_Founding_of_the_City/Book_39"
      },
      {
        "category": "literary",
        "title": "The Masque of the Red Death",
        "excerpt": "The mask which concealed the visage was made so nearly to resemble the countenance of a stiffened corpse that the closest scrutiny must have had difficulty in detecting the cheat.",
        "source": "Edgar Allan Poe (1842); Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/1064/pg1064.txt"
      },
      {
        "category": "literary",
        "title": "The Second Coming",
        "excerpt": "Things fall apart; the centre cannot hold; / Mere anarchy is loosed upon the world, / The blood-dimmed tide is loosed, and everywhere / The ceremony of innocence is drowned; / The best lack all conviction, while the worst / Are full of passionate intensity.",
        "source": "W. B. Yeats (1920); Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Second_Coming_(Yeats)"
      },
      {
        "category": "artistic",
        "title": "Un ballo in maschera (A Masked Ball)",
        "excerpt": "Verdi's opera climaxes at a masked ball where every face is hidden behind a domino and the anonymity of the costumed crowd becomes perfect cover for an assassin who strikes from within the throng. The music twists festive dance rhythms into something sinister, letting a glittering, faceless multitude conceal a lethal conspiracy until the moment a single mask is torn away.",
        "source": "IMSLP: Un ballo in maschera (Verdi, Giuseppe)",
        "href": "https://imslp.org/wiki/Un_ballo_in_maschera_(Verdi,_Giuseppe)"
      },
      {
        "category": "artistic",
        "title": "Christ's Entry into Brussels in 1889",
        "excerpt": "James Ensor crams his vast canvas with a surging carnival mob whose faces have dissolved into leering masks, skulls, and grotesque caricatures, an anonymous multitude that all but swallows the tiny figure of Christ. Massed under banners and slogans, the crowd reads less as celebrants than as a menacing, faceless tide, turning a procession into an image of the dehumanized power of the many.",
        "source": "James Ensor (1888); Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Christ's_Entry_Into_Brussels_in_1889.jpg",
        "image": {
          "src": "/covers/patriot-front-masked-march-washington--art.png",
          "alt": "A huge, densely packed crowd fills a Brussels street beneath red banners, nearly every face hidden behind a grotesque carnival mask or reduced to a caricature, with a small haloed figure of Christ almost lost in the throng.",
          "credit": "James Ensor, 1888, J. Paul Getty Museum. Public domain via Wikimedia Commons."
        }
      }
    ],
    "rank": 16
  },
  {
    "slug": "venezuela-earthquake-death-toll-2600",
    "headline": "Venezuela earthquake death toll passes 2,600 as families identify victims in La Guaira",
    "overview": "The death toll from the twin earthquakes that struck Venezuela in late June rose past 2,600 by July 4, 2026, as rescuers pulled a survivor from the rubble days after the tremors. In the coastal state of La Guaira, a port storage facility was converted into a makeshift morgue where families waited hours to identify loved ones as improvised tents held the dead. Officials said collapsed infrastructure had overwhelmed local services and complicated both recovery and identification.",
    "genre": "Science",
    "sources": [
      {
        "name": "Reuters (via Google News)",
        "href": "https://news.google.com/rss/articles/CBMikwFBVV95cUxOeUI5MnBPd0JxRzk0VE1ZS1JwR1kwQmhkWUxBRklnaGpGdHpHWENweWVDd0JMdV9BcS16YmYydUdBaHBMQ19BbVVnTHFsUVdnT0pBRWJnZHVpeE14WFowUy1sUHlTb0xHYzlBMDkzSDdobEdkOWwyTVhkSmxEOW1SS29LTFktUGZGd2tIWUd4TVlFelE?oc=5"
      },
      {
        "name": "BBC News",
        "href": "https://www.bbc.co.uk/news/articles/c20y2p9qqqko"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-04",
    "image": {
      "src": "/covers/venezuela-earthquake-death-toll-2600.png",
      "alt": "Families wait at a port facility in La Guaira, Venezuela, transformed into a makeshift morgue after the earthquakes.",
      "credit": "AFP via Getty Images (via BBC)"
    },
    "edition": "Morning Edition · 5 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Cassius Dio on the Eruption of Vesuvius (AD 79)",
        "excerpt": "an inconceivable quantity of ashes was blown out, which covered both sea and land and filled all the air. It wrought much injury of various kinds, as chance befell, to men and farms and cattle, and in particular it destroyed all fish and birds. Furthermore, it buried two entire cities, Herculaneum and Pompeii, the latter place while its populace was seated in the theatre.",
        "source": "Cassius Dio, Roman History, Book 66 (Loeb/Cary translation), LacusCurtius",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Cassius_Dio/66*.html"
      },
      {
        "category": "historical",
        "title": "The Earthquake at Lisbon, 1755 (eyewitness account of Rev. Charles Davy)",
        "excerpt": "The whole number of persons that perished, including those who were burnt or afterwards crushed to death whilst digging in the ruins, is supposed, on the lowest calculation, to amount to more than sixty thousand; and though the damage in other respects cannot be computed, yet you may form some idea of it.",
        "source": "Rev. Charles Davy, letter on the Lisbon earthquake, Fordham Modern History Sourcebook",
        "href": "https://sourcebooks.fordham.edu/mod/1755lisbonquake.asp"
      },
      {
        "category": "literary",
        "title": "Pliny the Younger, Letter to Cornelius Tacitus on the Vesuvius Eruption",
        "excerpt": "You might hear the shrieks of women, the screams of children, and the shouts of men; some calling for their children, others for their parents, others for their husbands, and seeking to recognise each other by the voices that replied; one lamenting his own fate, another that of his family; some wishing to die, from the very fear of dying; some lifting their hands to the gods; but the greater part convinced that there were now no gods at all, and that the final endless night of which we have heard had come upon the world.",
        "source": "Pliny the Younger, Letters, trans. William Melmoth, Project Gutenberg",
        "href": "https://gutenberg.org/files/2811/2811-h/2811-h.htm"
      },
      {
        "category": "literary",
        "title": "Voltaire, Poem on the Lisbon Disaster (\"The Lisbon Earthquake\")",
        "excerpt": "Approach in crowds, and meditate awhile / Yon shattered walls, and view each ruined pile, / Women and children heaped up mountain high, / Limbs crushed which under ponderous marble lie;",
        "source": "Voltaire, The Works of Voltaire, Vol. 36, trans. Fleming, Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Works_of_Voltaire/Volume_36/The_Lisbon_Earthquake"
      },
      {
        "category": "artistic",
        "title": "Il Terremoto (The Earthquake) — finale of Haydn's The Seven Last Words of Christ, Hob.XX:1",
        "excerpt": "After seven hushed meditations on the words spoken from the cross, Haydn shatters the stillness with a final movement titled Il Terremoto — The Earthquake. Marked Presto e con tutta la forza, the whole orchestra convulses into the work's only fortississimo, the strings churning like ground splitting open. It is music that renders the moment a city is torn apart and the living are left trembling amid the fallen.",
        "source": "IMSLP: Die Worte des Erlösers am Kreuze, Hob.XX:1 (Haydn, Joseph)",
        "href": "https://imslp.org/wiki/Die_Worte_des_Erl%C3%B6sers_am_Kreuze,_Hob.XX:1_(Haydn,_Joseph)"
      },
      {
        "category": "artistic",
        "title": "The Last Day of Pompeii",
        "excerpt": "Bryullov's monumental canvas freezes a city in its death throes: the sky boils red and black over Pompeii as buildings and statues topple, and terrified families shield their heads and clutch their fallen dead in the lurid light of the eruption. Bodies lie crushed in the foreground while survivors flee across the rubble, an image of mass calamity and grief that has defined how the modern eye pictures a city destroyed.",
        "source": "Karl Bryullov, The Last Day of Pompeii (1830–1833), State Russian Museum — Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Karl_Brullov_-_The_Last_Day_of_Pompeii_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/venezuela-earthquake-death-toll-2600--art.png",
          "alt": "A vast crowd of panicked Pompeiians flees collapsing buildings and toppling statues beneath a black, lightning-lit sky glowing red from Vesuvius; mothers shield children and the dead lie strewn across the ground.",
          "credit": "Karl Bryullov, The Last Day of Pompeii, 1830–1833, State Russian Museum, Saint Petersburg; public domain via Wikimedia Commons"
        }
      }
    ],
    "rank": 17
  },
  {
    "slug": "egypt-byzantine-city-western-desert",
    "headline": "Egypt uncovers a lost Byzantine-era city in the western desert",
    "overview": "Egyptian archaeologists announced on July 4, 2026 the discovery of a well-preserved Byzantine-era city in the Dakhla Oasis of the western desert, revealing daily life in fourth-century Egypt when the country was part of the Byzantine empire. A grid of streets and squares centers on a mid-fourth-century basilica church flanked by two watchtowers, with bread ovens, kitchens, bronze coins bearing Byzantine emperors and about 200 inscribed pottery ostraca among the finds. Officials unveiled it alongside a second discovery of 18 tombs at the Marina el-Alamein site west of Alexandria.",
    "genre": "Science",
    "sources": [
      {
        "name": "AP (via Google News)",
        "href": "https://news.google.com/rss/articles/CBMirAFBVV95cUxPTVhxNmVwdlhPMjJybGI5UUZQWWptMjRQWjlWQjRjT3dYVnVtbDBiUUFxdlNQalpPU0FIdWhtSFcwRFJ4T24zcl8tek9DUFZmY0ZzRWI4SmhjRDN5MWI2RUtFRThTNG5fZUJ2WnBvaTR5elF0eDQyZDM2b0k3cjFTakdOMEFlVkZtZmowTkk5WDdFVG1OczE0RS1NVEFwUHVFcXFGeEFNb3p6bFhu?oc=5"
      },
      {
        "name": "Global News",
        "href": "https://globalnews.ca/news/11952992/egypt-uncovers-byzantine-city/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-04",
    "image": {
      "src": "/covers/egypt-byzantine-city-western-desert.png",
      "alt": "The domed mud-brick chapels of the Bagawat necropolis, an early Christian, Byzantine-era burial site in Egypt's western desert.",
      "credit": "Bagawat Necropolis, Kharga Oasis; public domain via Wikimedia Commons"
    },
    "edition": "Morning Edition · 5 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Nineveh and Its Remains: the winged lions unveiled at Nimroud",
        "excerpt": "The moon was at her full, and as we drew nigh to the edge of the deep wall of earth rising around them, her soft light was creeping over the stern features of the human heads, and driving before it the dark shadows which still clothed the lion forms. One by one the limbs of the gigantic sphinxes emerged from the gloom, until the monsters were unveiled before us. I shall never forget that night, or the emotions which those venerable figures caused within me.",
        "source": "Austen Henry Layard, Discoveries Among the Ruins of Nineveh and Babylon (1853), Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/39897/pg39897.txt"
      },
      {
        "category": "historical",
        "title": "The discovery of the lost city of Copán",
        "excerpt": "The city was desolate. No remnant of this race hangs round the ruins, with traditions handed down from father to son, and from generation to generation. It lay before us like a shattered bark in the midst of the ocean, her masts gone, her name effaced, her crew perished, and none to tell whence she came, to whom she belonged, how long on her voyage, or what caused her destruction.",
        "source": "John Lloyd Stephens, Incidents of Travel in Central America, Chiapas and Yucatan, Chapter V, Wikisource",
        "href": "https://en.wikisource.org/wiki/Incidents_of_Travel_in_Central_America,_Chiapas_and_Yucatan/Chapter_5"
      },
      {
        "category": "literary",
        "title": "Ozymandias",
        "excerpt": "And on the pedestal these words appear: 'My name is Ozymandias, king of kings: Look on my works, ye Mighty, and despair!' Nothing beside remains. Round the decay Of that colossal wreck, boundless and bare, The lone and level sands stretch far away.",
        "source": "Percy Bysshe Shelley, 'Ozymandias of Egypt' (1818), in Poems That Every Child Should Know (1904), Wikisource",
        "href": "https://en.wikisource.org/wiki/Poems_That_Every_Child_Should_Know/Ozymandias_of_Egypt"
      },
      {
        "category": "literary",
        "title": "The Ruins, or Meditation on the Revolutions of Empires",
        "excerpt": "Here, said I, once flourished an opulent city; here was the seat of a powerful empire. Yes! these places now so wild and desolate, were once animated by a living multitude; a busy crowd thronged in these streets, now so solitary. Within these walls, where now reigns the silence of death, the noise of the arts, and the shouts of joy and festivity incessantly resounded; these piles of marble were regular palaces; these fallen columns adorned the majesty of temples; these ruined galleries surrounded public places.",
        "source": "Constantin-François Volney, The Ruins (1791), Chapter II 'The Reverie', Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/1397/pg1397.txt"
      },
      {
        "category": "artistic",
        "title": "Pini di Roma (The Pines of Rome)",
        "excerpt": "Respighi's 1924 tone poem walks the listener through Rome as a living palimpsest of its own vanished past. In the hushed second movement, 'Pini presso una catacomba,' muted brass and a distant plainchant seem to rise out of the buried earth like an ancient hymn resurfacing from the tombs, before the whole orchestra swells with the ghostly grandeur of a civilization the sand had swallowed.",
        "source": "IMSLP: Pini di Roma (Respighi, Ottorino)",
        "href": "https://imslp.org/wiki/Pini_di_Roma_(Respighi,_Ottorino)"
      },
      {
        "category": "artistic",
        "title": "The Course of Empire: Desolation",
        "excerpt": "Cole's final canvas shows a once-mighty imperial city returned to silence: broken colonnades and a solitary ruined column rise from marshy overgrowth as the moon climbs a fading sky. Nature has reclaimed the metropolis, vines wreathing shattered marble where crowds once thronged, a haunting vision of a civilization sunk back into oblivion and waiting to be remembered.",
        "source": "Thomas Cole, The Course of Empire: Desolation (1836), New-York Historical Society, via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Cole_Thomas_The_Course_of_Empire_Desolation_1836.jpg",
        "image": {
          "src": "/covers/egypt-byzantine-city-western-desert--art.png",
          "alt": "A twilight landscape of a ruined classical city: ivy-grown broken columns and a single tall column stand above still water, reflected in the calm, as the moon rises over silent, overgrown marble ruins.",
          "credit": "Thomas Cole, 1836, New-York Historical Society; public domain via Wikimedia Commons"
        }
      }
    ],
    "rank": 18
  },
  {
    "slug": "sqlite-utils-4-fable-agent-written",
    "headline": "Simon Willison ships sqlite-utils 4.0rc2 largely written by an AI coding agent for about $149",
    "overview": "Developer Simon Willison released sqlite-utils 4.0rc2 on July 5, 2026, saying the work toward a stable 4.0 was mostly carried out by an AI model running in an agentic coding loop, at a token cost of about $149. The agent's pre-release review flagged five 'release blockers,' including a data-loss bug in which a delete never committed and could corrupt a database connection. Willison framed the release as a case study in using AI agents for careful, version-conscious open-source maintenance.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Simon Willison’s Weblog",
        "href": "https://simonwillison.net/2026/Jul/5/sqlite-utils-fable/"
      },
      {
        "name": "sqlite-utils changelog",
        "href": "https://sqlite-utils.datasette.io/en/stable/changelog.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-05",
    "image": {
      "src": "/covers/sqlite-utils-4-fable-agent-written.png",
      "alt": "A brass clockwork automaton seated at a desk, a quill in its hand, poised over a blank page in a dim workshop.",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 5 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Maelzel's Chess-Player",
        "excerpt": "It is quite certain that the operations of the Automaton are regulated by mind, and by nothing else.",
        "source": "Edgar Allan Poe, \"Maelzel's Chess-Player\" (Southern Literary Messenger, 1836)",
        "href": "https://en.wikisource.org/wiki/Maelzel's_Chess-Player"
      },
      {
        "category": "historical",
        "title": "Vaucanson's Automata (the flute-player and the duck)",
        "excerpt": "Jacques de Vaucanson, the celebrated mechanician, exhibited three admirable figures,—the flute-player, the tambourine-player, and the duck, which was capable of eating, drinking, and imitating exactly the natural voice of that fowl.",
        "source": "\"Automaton,\" 1911 Encyclopædia Britannica",
        "href": "https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Automaton"
      },
      {
        "category": "literary",
        "title": "Frankenstein; or, The Modern Prometheus",
        "excerpt": "I saw the dull yellow eye of the creature open; it breathed hard, and a convulsive motion agitated its limbs.",
        "source": "Mary Wollstonecraft Shelley, Frankenstein (1818), Chapter 5",
        "href": "https://www.gutenberg.org/cache/epub/84/pg84.txt"
      },
      {
        "category": "literary",
        "title": "The Pupil in Magic (Der Zauberlehrling)",
        "excerpt": "Stop, for, lo!\nAll the measure\nOf thy treasure\nNow is right!—\nAh, I see it! woe, oh woe!\nI forget the word of might.",
        "source": "Johann Wolfgang von Goethe, trans. Edgar Alfred Bowring, The Works of J. W. von Goethe, Vol. 9",
        "href": "https://en.wikisource.org/wiki/The_Works_of_J._W._von_Goethe/Volume_9/The_Pupil_in_Magic"
      },
      {
        "category": "artistic",
        "title": "L'apprenti sorcier (The Sorcerer's Apprentice)",
        "excerpt": "Paul Dukas's 1897 symphonic scherzo sets Goethe's ballad to music, and the orchestra tells the whole cautionary tale without a word. A skittering bassoon becomes the enchanted broom, marching tirelessly to fetch water while the strings swell into flood; the apprentice's panic mounts as the thing he animated refuses to stop. It is the definitive musical portrait of a made servant that does its master's labor brilliantly—and then runs beyond his control.",
        "source": "IMSLP: L'apprenti sorcier (Dukas, Paul)",
        "href": "https://imslp.org/wiki/L'apprenti_sorcier_(Dukas,_Paul)"
      },
      {
        "category": "artistic",
        "title": "Pygmalion and Galatea",
        "excerpt": "Gérôme paints the exact instant a maker's craftsmanship crosses into life: the sculptor Pygmalion reaches up to kiss his ivory statue as Galatea, still pale marble from the thighs down, flushes into warm living flesh above. Her twisting body turns from artwork into person under his hands, while a hovering Cupid aims the arrow that seals the miracle. It is the dream of every craftsman—the made thing awakening to answer its maker—rendered as tender triumph rather than horror.",
        "source": "Jean-Léon Gérôme, Pygmalion and Galatea (ca. 1890), The Metropolitan Museum of Art",
        "href": "https://commons.wikimedia.org/wiki/File:WLA_metmuseum_Jean-Leon_Gerome_Pygmalion_and_Galatea.jpg",
        "image": {
          "src": "/covers/sqlite-utils-4-fable-agent-written--art.png",
          "alt": "A sculptor in his studio embraces and kisses a nude female statue whose upper body has turned to living flesh while her legs remain white marble on the pedestal; a small winged Cupid hovers at right aiming a bow.",
          "credit": "Jean-Léon Gérôme, ca. 1890, The Metropolitan Museum of Art (Gift of Louis C. Raegner, 1927), public domain via Wikimedia Commons"
        }
      }
    ],
    "rank": 19
  },
  {
    "slug": "joey-chestnut-nathans-hot-dog-66",
    "headline": "Joey Chestnut eats 66 hot dogs to reclaim the Nathan's Famous Mustard Belt",
    "overview": "Joey Chestnut won the Nathan's Famous Fourth of July International Hot Dog Eating Contest at Coney Island on July 4, 2026, downing 66 hot dogs and buns in ten minutes to take back the Mustard Belt. The victory extended the competitive eater's long dominance of the Independence Day spectacle. Thousands watched at Coney Island as Chestnut again outpaced the field.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP (via Google News)",
        "href": "https://news.google.com/rss/articles/CBMipwFBVV95cUxQV3NMNHBUbTNNMThRTjY1UzJfOE9vNUIzV1BZRXZoNlhhcUhEbWdEYW1GNG5UU3B4QjlLWndBQnNFWm1uZXdHejl5WmlBRWFPWGUyZ2d3ZC1vQ21VSUM2MDdEbk1PQWl0UGJzSlZYQ3RlZHEwWTBrOVJqa2t6ang3ZzRYc0tjZ2hYa2RMZi1fbEJ2ZDR0MlBPMTlka1EtMW45NkducmR0dw?oc=5"
      },
      {
        "name": "Nathan’s Famous Hot Dog Eating Contest",
        "href": "https://en.wikipedia.org/wiki/Nathan%27s_Hot_Dog_Eating_Contest"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-04",
    "image": {
      "src": "/covers/joey-chestnut-nathans-hot-dog-66.png",
      "alt": "Competitive eater Joey Chestnut at the Nathan's Famous Fourth of July hot dog eating contest.",
      "credit": "Wikimedia Commons (CC BY 4.0)"
    },
    "edition": "Morning Edition · 5 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Maximinus Thrax's Legendary Appetite",
        "excerpt": "It is agreed, moreover, that often in a single day he drank a Capitoline amphora of wine, and ate forty pounds of meat, or, according to Cordus, no less than sixty.",
        "source": "Historia Augusta, The Two Maximini (Loeb translation by David Magie), via LacusCurtius",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Historia_Augusta/Maximini_duo*.html"
      },
      {
        "category": "historical",
        "title": "The Eating Contest of Loki and Logi at Utgard",
        "excerpt": "Then a trough was taken and borne in upon the hall-floor and filled with flesh; Loki sat down at the one end and Logi at the other, and each ate as fast as he could, and they met in the middle of the trough. By that time Loki had eaten all the meat from the bones, but Logi likewise had eaten all the meat, and the bones with it, and the trough too; and now it seemed to all as if Loki had lost the game.",
        "source": "Snorri Sturluson, The Prose Edda, Gylfaginning (1916 translation by Arthur Gilchrist Brodeur), via Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Prose_Edda_(1916_translation_by_Arthur_Gilchrist_Brodeur)/Gylfaginning"
      },
      {
        "category": "literary",
        "title": "Gargamelle Gorges on Tripe (Gargantua and Pantagruel)",
        "excerpt": "Notwithstanding these admonitions, she did eat sixteen quarters, two bushels, three pecks and a pipkin full. O the fair fecality wherewith she",
        "source": "François Rabelais, Gargantua and Pantagruel (trans. Urquhart & Motteux), Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/1200/pg1200.txt"
      },
      {
        "category": "literary",
        "title": "The Cyclops Polyphemus Devours the Crew (The Odyssey)",
        "excerpt": "Then he tore them limb from limb and supped upon them. He gobbled them up like a lion in the wilderness, flesh, bones, marrow, and entrails, without leaving anything uneaten.",
        "source": "Homer, The Odyssey (trans. Samuel Butler), Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/1727/pg1727.txt"
      },
      {
        "category": "artistic",
        "title": "Bacchanale from Samson et Dalila, Op. 47",
        "excerpt": "Saint-Saëns' orgiastic third-act Bacchanale unleashes appetite as pure spectacle: a snaking oboe over pounding drums coils the Philistines into a frenzy of feasting, wine and abandon before the temple. The orchestra swells into a whirling, insatiable dance, a roaring crowd rendered in sound, gorging on pleasure until the pillars themselves come down. It is the perfect soundtrack for gluttony turned into public ritual.",
        "source": "IMSLP: Samson et Dalila, Op.47 (Saint-Saëns, Camille)",
        "href": "https://imslp.org/wiki/Samson_et_Dalila,_Op.47_(Saint-Sa%C3%ABns,_Camille)"
      },
      {
        "category": "artistic",
        "title": "The Land of Cockaigne",
        "excerpt": "Bruegel paints the glutton's paradise: a scholar, a peasant, and a soldier lie sprawled and stupefied around a tree-table, too stuffed to move. Roast fowl trot up ready-carved, a pig runs about with a carving knife already stuck in its flank, and eggs walk on legs toward the gorged sleepers. It is appetite as a whole world, a satirical monument to feasting without limit.",
        "source": "Pieter Bruegel the Elder, The Land of Cockaigne (1567), Alte Pinakothek, Munich — Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_the_Elder_-_The_Land_of_Cockaigne_-_WGA3507.jpg",
        "image": {
          "src": "/covers/joey-chestnut-nathans-hot-dog-66--art.png",
          "alt": "Three overfed men lie sprawled on their backs around a small tree with a round table-top, in a landscape where a roasted pig runs with a knife in its side, a soft-boiled egg walks on legs, and cooked fowl and pastries offer themselves for eating.",
          "credit": "Pieter Bruegel the Elder, The Land of Cockaigne, 1567, Alte Pinakothek, Munich; public domain via Wikimedia Commons"
        }
      }
    ],
    "rank": 20
  },
  {
    "slug": "solo-rower-california-hawaii-record",
    "headline": "American rower completes a record-setting solo row from California to Hawaii",
    "overview": "An American woman completed a record-breaking solo, unsupported ocean row from California to Hawaii, reaching the islands on July 4, 2026 after weeks alone at sea. Rowing more than 2,000 miles across the Pacific, she set a new mark for the crossing. Supporters tracked her arrival after a voyage that tested her endurance against currents, isolation and open water.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP (via Google News)",
        "href": "https://news.google.com/rss/articles/CBMirgFBVV95cUxQSFM2cVZ1TDNDd2NRUmttV2hEVzRrMXpta1pqNTYzYUNQNG5oNXhKNVhjZWpKR3ZobWU1MDczdF8tSnkzVUpVTTlLUWU5bEZGRnR3eU9vaXUwaHk3ZTluWm5EMGZSdnB6WXU3TVFBYmo4WXZ6a3pxbVQ2T3I0UmdsWTJyUlI3SmZZRXFKa1BCbkZfTk9UbTJZZnl5TEhodUpVSFQyVHZfTnBYRm5ybWc?oc=5"
      },
      {
        "name": "Ocean Rowing Society International",
        "href": "https://www.oceanrowing.com/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-04",
    "image": {
      "src": "/covers/solo-rower-california-hawaii-record.png",
      "alt": "A small ocean rowing boat on open water.",
      "credit": "Wikimedia Commons (CC BY-SA 3.0)"
    },
    "edition": "Morning Edition · 5 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Sailing Alone Around the World",
        "excerpt": "In the dismal fog I felt myself drifting into loneliness, an insect on a straw in the midst of the elements.",
        "source": "Joshua Slocum (1900), Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/6317/pg6317.txt"
      },
      {
        "category": "historical",
        "title": "South: The Story of Shackleton's Last Expedition (Chapter 9: The Boat Journey)",
        "excerpt": "The tale of the next sixteen days is one of supreme strife amid heaving waters. The sub-Antarctic Ocean lived up to its evil winter reputation.",
        "source": "Ernest Shackleton (1919), Wikisource",
        "href": "https://en.wikisource.org/wiki/South:_the_story_of_Shackleton's_last_expedition,_1914-1917/Chapter_9"
      },
      {
        "category": "literary",
        "title": "The Rime of the Ancient Mariner",
        "excerpt": "Alone, alone, all, all alone, / Alone on a wide wide sea! / And never a saint took pity on / My soul in agony.",
        "source": "Samuel Taylor Coleridge (text of 1834), Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/151/pg151.txt"
      },
      {
        "category": "literary",
        "title": "Ulysses",
        "excerpt": "To sail beyond the sunset, and the baths / Of all the western stars, until I die.",
        "source": "Alfred, Lord Tennyson (1842), Wikisource",
        "href": "https://en.wikisource.org/wiki/Ulysses_(Tennyson)"
      },
      {
        "category": "artistic",
        "title": "La mer, trois esquisses symphoniques (L. 109)",
        "excerpt": "Debussy's three symphonic sketches conjure the ocean not as backdrop but as living immensity, its swell rising and falling around anyone adrift upon it. From the shimmering dawn of \"De l'aube a midi sur la mer\" through the restless \"Jeux de vagues\" to the storm-lashed \"Dialogue du vent et de la mer,\" the music dramatizes the small human presence dwarfed by wind and water. It is the sound of the sea's vastness pressing in on a solitary voyager.",
        "source": "IMSLP: Claude Debussy, La mer (1903–05)",
        "href": "https://imslp.org/wiki/La_mer_(Debussy,_Claude)"
      },
      {
        "category": "artistic",
        "title": "The Gulf Stream",
        "excerpt": "A lone sailor lies on the deck of a dismasted, rudderless boat, surrounded by circling sharks and a churning, boundless sea. Homer strips the scene to a single small vessel and one exhausted man set against the ocean's overwhelming immensity, a distant ship offering only faint hope of rescue. It is the image of human endurance and isolation at the mercy of the open water.",
        "source": "Winslow Homer (1899), The Metropolitan Museum of Art",
        "href": "https://commons.wikimedia.org/wiki/File:Winslow_Homer_-_The_Gulf_Stream_-_Metropolitan_Museum_of_Art.jpg",
        "image": {
          "src": "/covers/solo-rower-california-hawaii-record--art.png",
          "alt": "An oil painting of a Black sailor reclining on the deck of a small, broken sailboat with no mast, adrift on a deep blue-green sea amid whitecaps and circling sharks, with a distant ship on the horizon.",
          "credit": "Winslow Homer, 1899, The Metropolitan Museum of Art, public domain via Wikimedia Commons"
        }
      }
    ],
    "rank": 21
  },
  {
    "slug": "europe-record-heat-new-climate",
    "headline": "Europe endures back-to-back record heatwaves as scientists warn of a new climate",
    "overview": "Britain and Europe have been hit by two record-breaking heatwaves in the first weeks of the 2026 summer, with UK temperatures reaching 37.7C in Norfolk in June and forecasters warning of another heatwave to come, according to a July 4, 2026 analysis. Climate scientists said the extremes, well above historic June records, are exactly what models predicted for a world warmed by fossil-fuel emissions. The UN's weather agency called the June heat across the continent 'extraordinary.'",
    "genre": "Climate",
    "sources": [
      {
        "name": "BBC News",
        "href": "https://www.bbc.co.uk/news/articles/c8e2j0j87reo"
      },
      {
        "name": "UK Met Office",
        "href": "https://www.metoffice.gov.uk/about-us/news-and-media/media-centre/weather-and-climate-news"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-04",
    "image": {
      "src": "/covers/europe-record-heat-new-climate.png",
      "alt": "A person labouring outdoors under a blazing sun during a European heatwave.",
      "credit": "Tino Romano/EPA (via BBC)"
    },
    "edition": "Morning Edition · 5 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The amazing and portentous summer of 1783",
        "excerpt": "The summer of the year 1783 was an amazing and portentous one, and full of horrible phenomena; for besides the alarming meteors and tremendous thunder-storms that affrighted and distressed the different counties of this kingdom, the peculiar haze, or smokey fog, that prevailed for many weeks in this island, and in every part of Europe, and even beyond its limits, was a most extraordinary appearance, unlike anything known within the memory of man... The sun, at noon, looked as blank as a clouded moon, and shed a rust-coloured ferruginous light on the ground, and floors of rooms; but was particularly lurid and blood-coloured at rising and setting.",
        "source": "Gilbert White, The Natural History of Selborne (1789), Letter LXV to Daines Barrington",
        "href": "https://www.gutenberg.org/cache/epub/1408/pg1408.txt"
      },
      {
        "category": "historical",
        "title": "The Atarantes curse the burning sun",
        "excerpt": "After another ten days' journey from the Garamantes there is again a salt hillock and water; men dwell there called Atarantes... These when the sun is exceeding hot curse and most foully revile him, for that his burning heat afflicts their people and their land.",
        "source": "Herodotus, The Histories, Book IV.184 (A. D. Godley translation, LacusCurtius)",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Herodotus/4g*.html"
      },
      {
        "category": "literary",
        "title": "Phaethon's chariot scorches the earth",
        "excerpt": "The grass is blighted; trees are burnt up with their leaves; the ripe brown crops give fuel for self destruction—Oh what small complaints! Great cities perish with their walls, and peopled nations are consumed to dust—the forests and the mountains are destroyed.",
        "source": "Ovid, Metamorphoses, Book II (Brookes More translation, Perseus Digital Library)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0028:book=2:card=227"
      },
      {
        "category": "literary",
        "title": "The rain of fire on the burning sand",
        "excerpt": "O'er all the sand-waste, with a gradual fall, / Were raining down dilated flakes of fire, / As of the snow on Alp without a wind.",
        "source": "Dante Alighieri, Inferno, Canto XIV (Henry Wadsworth Longfellow translation, 1867)",
        "href": "https://en.wikisource.org/wiki/Divine_Comedy_(Longfellow_1867)/Volume_1/Canto_14"
      },
      {
        "category": "artistic",
        "title": "'Summer' (L'estate), RV 315, from The Four Seasons",
        "excerpt": "Vivaldi's 1725 concerto opens in a landscape gasping under a merciless sun, the violins languishing in heat-heavy stillness before the cuckoo and turtledove call across parched fields. The music grows oppressive and airless, the shepherd trembling in dread, until the finale explodes into a violent summer storm that flattens the ripened grain—heat as both stupor and calamity, portent turning to disaster.",
        "source": "IMSLP: Le quattro stagioni (The Four Seasons) — Antonio Vivaldi",
        "href": "https://imslp.org/wiki/Le_quattro_stagioni_(Vivaldi,_Antonio)"
      },
      {
        "category": "artistic",
        "title": "The Fall of Phaeton",
        "excerpt": "Rubens paints the catastrophe of the sun itself run wild: Phaethon, having seized the chariot of the sun, hurtles earthward as the blazing horses rear and the heavens split with fire. Winged Hours scatter in terror while Jupiter's thunderbolt strikes to halt the runaway sun before it burns the whole world to ash—a baroque vision of the sky ablaze and the earth in mortal peril.",
        "source": "Peter Paul Rubens, The Fall of Phaeton — National Gallery of Art / Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Peter_Paul_Rubens_-_The_Fall_of_Phaeton_(National_Gallery_of_Art).jpg",
        "image": {
          "src": "/covers/europe-record-heat-new-climate--art.png",
          "alt": "A turbulent baroque painting of Phaethon and the sun-chariot's horses tumbling through a fiery sky, figures falling amid billowing smoke and flame as a thunderbolt breaks the clouds.",
          "credit": "Peter Paul Rubens, c. 1604–1605 (reworked c. 1606–1608), National Gallery of Art, Washington, D.C.; public domain via Wikimedia Commons"
        }
      }
    ],
    "rank": 22
  },
  {
    "slug": "vance-britain-failed-by-leaders",
    "headline": "US Vice President Vance says Britain has been failed by its leaders",
    "overview": "US Vice President JD Vance said on July 4, 2026 that Britain had been 'failed by its leaders,' expressing hope that the country's next prime minister would deliver change. The remarks, aimed at the British political establishment, drew attention for a senior American official's pointed intervention in another democracy's domestic politics. They came amid strained transatlantic debate over migration, security and the direction of Europe.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters (via Google News)",
        "href": "https://news.google.com/rss/articles/CBMiuwFBVV95cUxQVHJ5YzZKd011OS1jRmxONjc0Zkx3eVZ1ZDBLZHZSNWNuOTVyRzRpV2xpcHQ1NDdzZlBzeTFxNldvcnZQekRJeTVjRk1HaGJESVc0YXRWNEJhQ1FMN0Y3NC04SllESEFuelVTbjR5ZFo0d0xhZGVrSkhSLWZOdVVUNkRyZ1lKenpaa2JpaFZPUm1UZTFQNTBDTDBiTjFmTlRsNWZTY3dWNjhWTC1MOHdmSkVtT1ppWFBPUUhv?oc=5"
      },
      {
        "name": "AP News — JD Vance",
        "href": "https://apnews.com/hub/jd-vance"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-04",
    "image": {
      "src": "/covers/vance-britain-failed-by-leaders.png",
      "alt": "US Vice President JD Vance in his official portrait.",
      "credit": "Official Vice Presidential Portrait; public domain (U.S. government) via Wikimedia Commons"
    },
    "edition": "Morning Edition · 5 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Speech of Galgacus to the Britons",
        "excerpt": "These plunderers of the world, after exhausting the land by their devastations, are rifling the ocean: stimulated by avarice, if their enemy be rich; by ambition, if poor; unsatiated by the East and by the West: the only people who behold wealth and indigence with equal avidity. To ravage, to slaughter, to usurp under false titles, they call empire; and where they make a desert, they call it peace.",
        "source": "Tacitus, The Agricola (Oxford translation, revised), Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/7524/pg7524.txt"
      },
      {
        "category": "historical",
        "title": "General Observations on the Fall of the Roman Empire in the West",
        "excerpt": "But the decline of Rome was the natural and inevitable effect of immoderate greatness. Prosperity ripened the principle of decay; the causes of destruction multiplied with the extent of conquest; and as soon as time or accident had removed the artificial supports, the stupendous fabric yielded to the pressure of its own weight.",
        "source": "Edward Gibbon, The Decline and Fall of the Roman Empire, Vol. 3, Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/892/pg892.txt"
      },
      {
        "category": "literary",
        "title": "John of Gaunt's \"This England\" speech, King Richard II, Act II, Scene 1",
        "excerpt": "This blessed plot, this earth, this realm, this England, This nurse, this teeming womb of royal kings, Feared by their breed, and famous by their birth, Renowned for their deeds as far from home, For Christian service and true chivalry, As is the sepulchre in stubborn Jewry Of the world's ransom, blessed Mary's Son, This land of such dear souls, this dear dear land, Dear for her reputation through the world, Is now leased out—I die pronouncing it— Like to a tenement or pelting farm.",
        "source": "William Shakespeare, King Richard II, Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/1512/pg1512.txt"
      },
      {
        "category": "literary",
        "title": "England in 1819",
        "excerpt": "An old, mad, blind, despised, and dying king,— Princes, the dregs of their dull race, who flow Through public scorn,—mud from a muddy spring,— Rulers who neither see, nor feel, nor know, But leech-like to their fainting country cling, Till they drop, blind in blood, without a blow,— A people starved and stabbed in the unfilled field,— An army, which liberticide and prey Makes as a two-edged sword to all who wield,— Golden and sanguine laws which tempt and slay; Religion Christless, Godless—a book sealed; A Senate,—Time's worst statute unrepealed,— Are graves, from which a glorious Phantom may Burst, to illumine our tempestuous day.",
        "source": "Percy Bysshe Shelley, Poetical Works (ed. Hutchinson, 1914), Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Complete_Poetical_Works_of_Percy_Bysshe_Shelley_(ed._Hutchinson,_1914)/Sonnet:_England_in_1819"
      },
      {
        "category": "artistic",
        "title": "Belshazzar, HWV 61",
        "excerpt": "Handel's 1745 oratorio stages the last night of Babylon: the tyrant Belshazzar feasts in blind arrogance while a disembodied hand scrawls its verdict upon the palace wall, and Daniel reads the sentence upon a ruler weighed in the balance and found wanting. By dawn the king lies slain and his glittering empire has fallen to the Persians. Handel turns the collapse of a proud, misgoverned kingdom into a thunderous warning to every complacent throne.",
        "source": "IMSLP: Belshazzar, HWV 61 (Handel, George Frideric)",
        "href": "https://imslp.org/wiki/Belshazzar,_HWV_61_(Handel,_George_Frideric)"
      },
      {
        "category": "artistic",
        "title": "The Course of Empire: Destruction",
        "excerpt": "The fourth canvas of Cole's five-part cycle shows a proud empire at the hour of its ruin: the golden city of the earlier panels is now an inferno, its bridge broken, its temples toppling, its people put to the sword by storming invaders. Painted as a warning to a young, boastful republic, it insists that no civilization, however dazzling, is exempt from the wages of luxury, pride, and misrule.",
        "source": "Wikimedia Commons — Thomas Cole, The Course of Empire: Destruction (1836)",
        "href": "https://commons.wikimedia.org/wiki/File:Cole_Thomas_The_Course_of_Empire_Destruction_1836.jpg",
        "image": {
          "src": "/covers/vance-britain-failed-by-leaders--art.png",
          "alt": "A once-magnificent classical city engulfed in fire and smoke as an invading army storms across a broken bridge, marble statues topple, and citizens are slaughtered amid collapsing palaces.",
          "credit": "Thomas Cole, \"The Course of Empire: Destruction,\" 1836, New-York Historical Society; public domain via Wikimedia Commons."
        }
      }
    ],
    "rank": 23
  },
  {
    "slug": "paul-pelosi-hit-and-run-california",
    "headline": "Paul Pelosi injured in a California hit-and-run that left his car heavily damaged",
    "overview": "Paul Pelosi, husband of former US House Speaker Nancy Pelosi, was involved in a hit-and-run crash in California in which his vehicle was left with major damage, authorities said on July 4, 2026. Officials said another driver struck his car and fled the scene. It was the second serious incident to befall Pelosi in recent years, after he was assaulted at the couple's San Francisco home in 2022.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP (via Google News)",
        "href": "https://news.google.com/rss/articles/CBMingFBVV95cUxQTFZHdjgtcXVxb0JrY0ZPNkZpZTVMQml5Q2FHamNsQW8xLW5BODdJLTB2TkJSUmxXY1RXOU1hWWQ1WHU0Z0xJczZsVDM5bXJYZDV2ejU4bWlNTl8zckppR1prWUFBTU00X3JDaTRKbkFtNUl5b2I3T29tSF9tZk9TOHE5QWZ3bExVWm5MQUJIaVdJWkk4WnNVUGd2RmE4QQ?oc=5"
      },
      {
        "name": "AP News — Nancy Pelosi",
        "href": "https://apnews.com/hub/nancy-pelosi"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-04",
    "image": {
      "src": "/covers/paul-pelosi-hit-and-run-california.png",
      "alt": "Paul Pelosi, husband of former House Speaker Nancy Pelosi.",
      "credit": "public domain via Wikimedia Commons"
    },
    "edition": "Morning Edition · 5 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Nero thrown from his chariot at the Olympic games",
        "excerpt": "He drove the chariot with various numbers of horses, and at the Olympic games with no fewer than ten... Being thrown out of his chariot, he was again replaced, but could not retain his seat, and was obliged to give up, before he reached the goal, but was crowned notwithstanding.",
        "source": "Suetonius, The Lives of the Twelve Caesars: Nero (trans. Alexander Thomson)",
        "href": "https://www.gutenberg.org/cache/epub/6400/pg6400.txt"
      },
      {
        "category": "historical",
        "title": "The Taraxippus at Olympia, 'the terror of the horses'",
        "excerpt": "Taraxippus, the terror of the horses. It has the shape of a round altar, and as they run along the horses are seized, as soon as they reach this point, by a great fear without any apparent reason. The fear leads to disorder; the chariots generally crash and the charioteers are injured.",
        "source": "Pausanias, Description of Greece 6.20 (trans. W. H. S. Jones, Perseus Digital Library)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Paus.+6.20&fromdoc=Perseus%3Atext%3A1999.01.0160"
      },
      {
        "category": "literary",
        "title": "The Fall of Phaethon (Metamorphoses, Book II)",
        "excerpt": "The horses are affrighted, and, making a bound in an opposite direction, they shake the yoke from off their necks... In one place lie the reins; in another, the axle-tree wrenched away from the pole... and the fragments of the chariot torn in pieces are scattered far and wide. But Phaeton, the flames consuming his yellow hair, is hurled headlong, and is borne in a long tract through the air.",
        "source": "Ovid, Metamorphoses (trans. Henry T. Riley)",
        "href": "https://www.gutenberg.org/cache/epub/21765/pg21765.txt"
      },
      {
        "category": "literary",
        "title": "The trampling of the child (Strange Case of Dr Jekyll and Mr Hyde)",
        "excerpt": "the two ran into one another naturally enough at the corner; and then came the horrible part of the thing; for the man trampled calmly over the child's body and left her screaming on the ground. It sounds nothing to hear, but it was hellish to see. It wasn't like a man; it was like some damned Juggernaut.",
        "source": "Robert Louis Stevenson, Strange Case of Dr Jekyll and Mr Hyde",
        "href": "https://www.gutenberg.org/cache/epub/43/pg43.txt"
      },
      {
        "category": "artistic",
        "title": "Phaeton, Op. 39 (symphonic poem)",
        "excerpt": "Camille Saint-Saens's 1873 symphonic poem sets the myth of Phaethon, who seizes the reins of the sun-god's chariot and is dragged in a headlong, runaway gallop across the heavens. Surging strings and hammering brass whip the horses faster and faster until the music itself careens out of control, and a sudden thunderbolt hurls the reckless driver to his death. In barely ten minutes it stages a violent collision of ambition and catastrophe on the road of the sky.",
        "source": "IMSLP: Phaeton, Op.39 (Saint-Saens, Camille)",
        "href": "https://imslp.org/wiki/Pha%C3%A9ton,_Op.39_(Saint-Sa%C3%ABns,_Camille)"
      },
      {
        "category": "artistic",
        "title": "The Fall of Phaeton",
        "excerpt": "Rubens freezes the instant of the crash: the sun-chariot pitches over, horses rearing and plunging in every direction as the reins fly loose. Phaethon tumbles headlong through the smoke and lightning, limbs flailing, thrown clear of the wreck in a whirl of terrified bodies and shattered momentum. The whole sky becomes the scene of a single catastrophic collision, misfortune striking without warning.",
        "source": "Peter Paul Rubens, The Fall of Phaeton (National Gallery of Art, Washington)",
        "href": "https://commons.wikimedia.org/wiki/File:Peter_Paul_Rubens_-_The_Fall_of_Phaeton_(National_Gallery_of_Art).jpg",
        "image": {
          "src": "/covers/paul-pelosi-hit-and-run-california--art.png",
          "alt": "A baroque painting of the sun-chariot overturning in mid-air, horses rearing and plunging amid dark clouds and lightning while the youth Phaethon is hurled headlong from the wreck.",
          "credit": "Peter Paul Rubens, c. 1604-1605 (reworked c. 1606-1608), National Gallery of Art, Washington; public domain via Wikimedia Commons"
        }
      }
    ],
    "rank": 24
  },
  {
    "slug": "world-map-500-bytes-ascii",
    "headline": "A developer generates a recognizable ASCII world map from just 445 bytes of data",
    "overview": "A programmer, Iwo Kadziela, demonstrated a way to render a credible ASCII-art map of the world from only 445 bytes of compressed data, drawing wide interest after Simon Willison highlighted it on July 4, 2026. The trick packs the coastlines into a deflate-compressed data URI that the browser unpacks with a few lines of JavaScript using a DecompressionStream. The feat revived appreciation for extreme data compression and minimalist coding.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Simon Willison’s Weblog",
        "href": "https://simonwillison.net/2026/Jul/4/building-a-world-map-with-only-500-bytes/"
      },
      {
        "name": "DecompressionStream (MDN)",
        "href": "https://developer.mozilla.org/en-US/docs/Web/API/DecompressionStream"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-04",
    "image": {
      "src": "/covers/world-map-500-bytes-ascii.png",
      "alt": "A recognizable map of the world's continents rendered entirely in ASCII characters.",
      "credit": "Iwo Kadziela / Simon Willison (simonwillison.net)"
    },
    "edition": "Morning Edition · 5 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Strabo on building a globe of the whole inhabited world",
        "excerpt": "it is better for him to construct a globe of adequate size, if he can do so; and let it be no less than ten feet in diameter. But if he cannot construct a globe of adequate size or not much smaller, he should sketch his map on a plane surface of at least seven feet.",
        "source": "Strabo, Geography, Book II.5.10 (trans. H. L. Jones, Loeb Classical Library)",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Strabo/2E1*.html"
      },
      {
        "category": "historical",
        "title": "Herodotus laughs at those who draw the whole Earth as a compass-circle",
        "excerpt": "I laugh when I see that, though many before this have drawn maps of the Earth, yet no one has set the matter forth in an intelligent way; seeing that they draw Ocean flowing round the Earth, which is circular exactly as if drawn with compasses, and they make Asia equal in size to Europe.",
        "source": "Herodotus, The History of Herodotus, Book IV.36 (trans. G. C. Macaulay)",
        "href": "https://www.gutenberg.org/cache/epub/2707/pg2707.txt"
      },
      {
        "category": "literary",
        "title": "Lewis Carroll, Sylvie and Bruno Concluded — the map on the scale of a mile to the mile",
        "excerpt": "\"And then came the grandest idea of all! We actually made a map of the country, on the scale of a mile to the mile!\" \"Have you used it much?\" I enquired. \"It has never been spread out, yet,\" said Mein Herr: \"the farmers objected: they said it would cover the whole country, and shut out the sunlight! So we now use the country itself, as its own map, and I assure you it does nearly as well.\"",
        "source": "Lewis Carroll, Sylvie and Bruno Concluded (1893), Chapter XI",
        "href": "https://www.gutenberg.org/cache/epub/48795/pg48795.txt"
      },
      {
        "category": "literary",
        "title": "Jorge Luis Borges, On Exactitude in Science",
        "excerpt": "In Borges's single-paragraph fable, an empire's cartographers grow so obsessed with precision that they draw a map coinciding point for point with the empire itself, exactly its size. Later generations judge so monstrous a map useless and abandon it to the sun and winters of the desert, where its tattered ruins shelter beasts and beggars. It is the inverse of the ASCII globe: where Borges warns of the map that swallows its territory, the developer proves how little of the world it takes to make the whole thing recognizable.",
        "source": "Jorge Luis Borges, \"On Exactitude in Science\" (\"Del rigor en la ciencia\", 1946) — copyrighted, described not quoted",
        "href": "https://en.wikipedia.org/wiki/On_Exactitude_in_Science"
      },
      {
        "category": "artistic",
        "title": "Gustav Holst, The Planets, Op. 32",
        "excerpt": "Holst compresses the entire solar system into a single orchestral suite, sketching each wandering planet in a handful of themes: Mars pounding in relentless five-beat menace, Jupiter blazing with jollity, Neptune dissolving into a wordless offstage chorus that recedes into silence. It is the immensity of the heavens caught in seven movements, the cosmos rendered in miniature. Like a world map drawn in 445 bytes, it shows how few strokes it takes to conjure something vast.",
        "source": "IMSLP: The Planets, Op.32 (Holst, Gustav)",
        "href": "https://imslp.org/wiki/The_Planets,_Op.32_(Holst,_Gustav)"
      },
      {
        "category": "artistic",
        "title": "Johannes Vermeer, The Geographer",
        "excerpt": "A scholar in a blue-and-gold robe leans over his charts, dividers in hand, caught mid-measurement as light pours through the window; a terrestrial globe stands behind him and maps hang on the wall. Vermeer turns the whole earth into the quiet furniture of a single sunlit room, globe and charts standing in for oceans and continents no larger than a tabletop. It is the vast made intimate — the entire world brought indoors and rendered in miniature.",
        "source": "The Geographer, Städel Museum, Frankfurt (Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Johannes_Vermeer_-_The_Geographer_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/world-map-500-bytes-ascii--art.png",
          "alt": "An oil painting of a seated scholar in a blue-and-gold robe leaning over a table strewn with charts, holding a pair of dividers and gazing toward a bright window; a terrestrial globe and rolled maps stand behind him.",
          "credit": "Johannes Vermeer, ca. 1668-1669, Städel Museum, Frankfurt am Main. Public domain via Wikimedia Commons."
        }
      }
    ],
    "rank": 25
  },
  {
    "slug": "brooklyn-bridge-fire-july4-fireworks",
    "headline": "Fire breaks out on the Brooklyn Bridge during New York's July 4 fireworks show",
    "overview": "A fire broke out on the Brooklyn Bridge during New York City's Fourth of July fireworks display late on July 4, 2026, sending smoke over the East River as crowds watched the pyrotechnics. Firefighters responded to the blaze on the landmark span. The cause was under investigation, with officials assessing any damage to the 19th-century bridge.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP (via Google News)",
        "href": "https://news.google.com/rss/articles/CBMijgFBVV95cUxPN1pVaU5aNTVsdlBDQldJdDNtVzVKbXlXUkEwdzNsUy1UdzNKME1MWmNQMDVPdkhVdnE4c2JMRTBHbDZWVXpBZVlxNWNGS0MtNG16bXREOGlnUjhfNDdUQ3dPMjVXSmNFVWNkdU12UXVRdDJoZVNxOTU1Uzh4OUFSRVRoMkJDOUQ3ZTdoYTBR?oc=5"
      },
      {
        "name": "FDNY",
        "href": "https://www.nyc.gov/site/fdny/index.page"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-05",
    "image": {
      "src": "/covers/brooklyn-bridge-fire-july4-fireworks.png",
      "alt": "Fireworks bursting over the Brooklyn Bridge on the Fourth of July.",
      "credit": "Wikimedia Commons (CC BY-SA 3.0)"
    },
    "edition": "Morning Edition · 5 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Great Fire of London (1666)",
        "excerpt": "All the sky was of a fiery aspect, like the top of a burning oven, and the light seen above forty miles round about for many nights. God grant mine eyes may never behold the like, who now saw above 10,000 houses all in one flame! The noise and cracking and thunder of the impetuous flames, the shrieking of women and children, the hurry of people, the fall of towers, houses, and churches, was like a hideous storm; and the air all about so hot and inflamed, that at the last one was not able to approach it, so that they were forced to stand still, and let the flames burn on.",
        "source": "John Evelyn, The Diary of John Evelyn, Vol. II (entry of 2 September 1666)",
        "href": "https://www.gutenberg.org/cache/epub/42081/pg42081.txt"
      },
      {
        "category": "historical",
        "title": "The Royal Fireworks Disaster in Green Park (1749)",
        "excerpt": "The rockets, and whatever was thrown up into the air, succeeded mighty well; but the wheels, and all that was to compose the principal part, were pitiful and ill-conducted, with no changes of coloured fires and shapes: the illumination was mean, and lighted so slowly that scarce any body had patience to wait the finishing; and then,—what contributed to the awkwardness of the whole, was the right pavilion catching fire, and being burnt down in the middle of the show.",
        "source": "Horace Walpole, letter to Sir Horace Mann, 3 May 1749, in The Letters of Horace Walpole, Vol. II",
        "href": "https://www.gutenberg.org/cache/epub/4610/pg4610-images.html"
      },
      {
        "category": "literary",
        "title": "The Burning of Troy (Aeneid, Book II)",
        "excerpt": "The fatal Day, th' appointed Hour is come, / When wrathful Jove's irrevocable Doom / Transfers the Trojan State to Grecian Hands. / The Fire consumes the Town, the Foe commands: / And armed Hosts, an unexpected Force, / Break from the Bowels of the Fatal Horse.",
        "source": "Virgil, The Aeneid, Book II, trans. John Dryden — the speech of Panthus",
        "href": "https://en.wikisource.org/wiki/The_Works_of_Virgil_(Dryden)/Aeneid/Book_II"
      },
      {
        "category": "literary",
        "title": "The Great Fire of Rome under Nero (Annals, Book XV)",
        "excerpt": "It had its beginning in that part of the circus which adjoins the Palatine and Caelian hills, where, amid the shops containing inflammable wares, the conflagration both broke out and instantly became so fierce and so rapid from the wind that it seized in its grasp the entire length of the circus. The blaze in its fury ran first through the level portions of the city, then rising to the hills, while it again devastated every place below them, it outstripped all preventive measures.",
        "source": "Tacitus, The Annals, Book XV, trans. Church and Brodribb",
        "href": "https://en.wikisource.org/wiki/The_Annals_(Tacitus)/Book_15"
      },
      {
        "category": "artistic",
        "title": "Music for the Royal Fireworks, HWV 351",
        "excerpt": "Handel scored this blazing D-major suite for a colossal wind band—two dozen oboes, a battery of trumpets, horns, and thundering timpani—to accompany the very Green Park fireworks of April 1749 that ended in flames. Its jubilant Overture and triumphant La Réjouissance were built to compete with rockets and cannon-fire over London, music engineered to sound like the sky itself catching light. That the celebration it crowned collapsed into a burning pavilion makes it the perfect anthem for spectacle tipping into disaster.",
        "source": "IMSLP: George Frideric Handel, Music for the Royal Fireworks, HWV 351",
        "href": "https://imslp.org/wiki/Music_for_the_Royal_Fireworks,_HWV_351_(Handel,_George_Frideric)"
      },
      {
        "category": "artistic",
        "title": "The Burning of the Houses of Lords and Commons, October 16, 1834",
        "excerpt": "Turner witnessed the 1834 blaze that destroyed the Palace of Westminster among tens of thousands of spectators lining the Thames, and here he turns catastrophe into incandescent spectacle. A towering white-gold fireball erupts against the night, its glare doubled in the black river below and silhouetting the crowds and the arch of Westminster Bridge. Fragile stone and a great riverside landmark dissolve into pure flame—celebration and horror fused in a single burning sky.",
        "source": "J. M. W. Turner, Philadelphia Museum of Art (via Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Joseph_Mallord_William_Turner,_English_-_The_Burning_of_the_Houses_of_Lords_and_Commons,_October_16,_1834_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/brooklyn-bridge-fire-july4-fireworks--art.png",
          "alt": "An oil painting of the Houses of Parliament engulfed in a vast burst of white-and-orange flame at night, the inferno reflected across the dark Thames as crowds watch from a bridge and the riverbanks.",
          "credit": "J. M. W. Turner, 1834–35, Philadelphia Museum of Art; public domain via Wikimedia Commons"
        }
      }
    ],
    "rank": 26
  },
  {
    "slug": "iran-khamenei-funeral-tehran",
    "headline": "Iran begins a days-long state funeral in Tehran for Supreme Leader Khamenei, killed in the war",
    "overview": "Iran opened a state funeral in Tehran on July 4, 2026, for Supreme Leader Ayatollah Ali Khamenei, who led the country from 1989 until he was killed, along with four family members, in a U.S.-Israeli airstrike on February 28, 2026 that opened the war against Iran. Enormous crowds gathered at the Imam Khomeini Grand Mosalla, where his casket lies in state, with officials saying they expect millions to attend the roughly six-day rites, delayed nearly four months by what a spokesperson called 'the war conditions.' The ceremonies run through July 9, with the body to travel from Tehran to Qom and on to the Iraqi shrine cities of Najaf and Karbala before burial in his birthplace of Mashhad; his son, Mojtaba Khamenei, has assumed leadership but has not appeared publicly.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "AP (via Google News)",
        "href": "https://news.google.com/rss/articles/CBMitgFBVV95cUxOUTNod0xTMjJIckxKX0NjQ1Z3OXJDbEZFcXNka1dQNVFfdjE5WVNnNUFfRWFuaEtnRExzV3huaXBRQ1BCUnozUnV0eG9ReGlvTUdrNDU2SjBKNzVkaE42MVNPcWt1a2U1RTllNTFFUjVuMnBkYU44SUUzSUtDaDUzbE1SNHlxMVQ5aXBHS3BxamR0eHpuWGo1WWxJNWRNaXFBVUd5SHhYaW41dDVreWVJYVhiYVhLQQ?oc=5"
      },
      {
        "name": "NPR",
        "href": "https://www.npr.org/2026/07/04/nx-s1-5882083/iran-funeral-ayatollah-ali-khamenei"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-04",
    "image": {
      "src": "/covers/iran-khamenei-funeral-tehran.png",
      "alt": "A vast crowd of mourners fills a Tehran prayer complex around the flag-draped casket of Ayatollah Ali Khamenei during the first day of his state funeral.",
      "credit": "Associated Press (via NPR)"
    },
    "lead": true,
    "edition": "Evening Edition · 4 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Funeral of Julius Caesar, from Suetonius, The Lives of the Twelve Caesars",
        "excerpt": "on a sudden, two men, with swords by their sides, and spears in their hands, set fire to the bier with lighted torches. The throng around immediately heaped upon it dry faggots, the tribunals and benches of the adjoining courts, and whatever else came to hand. Then the musicians and players stripped off the dresses they wore on the present occasion, taken from the wardrobe of his triumph at spectacles, rent them, and threw them into the flames. The legionaries, also, of his veteran bands, cast in their armour, which they had put on in honour of his funeral. Most of the ladies did the same by their ornaments, with the bullae, and mantles of their children. In this public mourning there joined a multitude of foreigners, expressing their sorrow according to the fashion of their respective countries; but especially the Jews, who for several nights together frequented the spot where the body was burnt.",
        "source": "Suetonius, The Lives of the Twelve Caesars (Thomson trans.), via Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/6400/pg6400.txt"
      },
      {
        "category": "historical",
        "title": "The Death of Cyrus the Great and His Instructions on Succession, from Xenophon's Cyropaedia, Book VIII",
        "excerpt": "And now I must leave instructions about my kingdom, that there may be no dispute among you after my death. Sons of mine, I love you both alike, but I choose the elder-born, the one whose experience of life is the greater, to be the leader in council and the guide in action.",
        "source": "Xenophon, Cyropaedia (H. G. Dakyns trans.), Book VIII, via Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/2085/pg2085.txt"
      },
      {
        "category": "literary",
        "title": "Mark Antony's Funeral Oration, from Shakespeare's Julius Caesar (Act III, Scene ii)",
        "excerpt": "Friends, Romans, countrymen, lend me your ears;\nI come to bury Caesar, not to praise him.\nThe evil that men do lives after them,\nThe good is oft interred with their bones;\nSo let it be with Caesar. The noble Brutus\nHath told you Caesar was ambitious.\nIf it were so, it was a grievous fault,\nAnd grievously hath Caesar answer'd it.\nHere, under leave of Brutus and the rest,\nFor Brutus is an honourable man,\nSo are they all, all honourable men,\nCome I to speak in Caesar's funeral.",
        "source": "William Shakespeare, Julius Caesar, via Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/1522/pg1522.txt"
      },
      {
        "category": "literary",
        "title": "When Lilacs Last in the Dooryard Bloom'd (on the death of Abraham Lincoln), section 6",
        "excerpt": "Coffin that passes through lanes and streets,\nThrough day and night with the great cloud darkening the land,\nWith the pomp of the inloop'd flags with the cities draped in black,\nWith the show of the States themselves as of crape-veil'd women standing,\nWith processions long and winding and the flambeaus of the night,\nWith the countless torches lit, with the silent sea of faces and the unbared heads,\nWith the waiting depot, the arriving coffin, and the sombre faces,\nWith dirges through the night, with the thousand voices rising strong and solemn,\nWith all the mournful voices of the dirges pour'd around the coffin,\nThe dim-lit churches and the shuddering organs—where amid these you journey,\nWith the tolling tolling bells' perpetual clang,\nHere, coffin that slowly passes,\nI give you my sprig of lilac.",
        "source": "Walt Whitman, Leaves of Grass, via Project Gutenberg",
        "href": "https://www.gutenberg.org/files/1322/1322-h/1322-h.htm"
      },
      {
        "category": "artistic",
        "title": "Marche funèbre, third movement of the Piano Sonata No. 2 in B-flat minor, Op. 35",
        "excerpt": "Chopin's slow, tolling march has become the universal sound of the state funeral, its heavy repeated chords falling like the tread of an endless procession behind the bier. A fragile major-key consolation rises in the middle, only for the relentless dead-march to close back over it and swallow the light. It is music built for a nation walking its slain leader through the streets.",
        "source": "IMSLP: Piano Sonata No.2, Op.35 (Chopin, Frédéric)",
        "href": "https://imslp.org/wiki/Piano_Sonata_No.2,_Op.35_(Chopin,_Fr%C3%A9d%C3%A9ric)"
      },
      {
        "category": "artistic",
        "title": "The Death of Marat (La Mort de Marat), Jacques-Louis David, 1793",
        "excerpt": "David turned a murdered revolutionary into a secular martyr, laying Marat back in his bath like a fallen saint, the fatal wound and dropped quill lit against a vast, empty darkness. The propaganda of grief becomes an instrument of power: mourning marshaled to sanctify a cause and to steel those who survive. A slain leader is made holy, and his death made useful to the living.",
        "source": "Royal Museums of Fine Arts of Belgium / Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Death_of_Marat_by_David.jpg",
        "image": {
          "src": "/covers/iran-khamenei-funeral-tehran--art.png",
          "alt": "A slain man slumped dead in a bathtub, one arm hanging over the side still holding a letter and a quill, his fatal chest wound visible, set against a stark dark background—an image of political martyrdom.",
          "credit": "Jacques-Louis David (1793), Royal Museums of Fine Arts of Belgium, Brussels; public domain via Wikimedia Commons"
        }
      }
    ],
    "rank": 27
  },
  {
    "slug": "ukraine-kostiantynivka-contested",
    "headline": "Zelensky denies Russian capture of key eastern city Kostiantynivka",
    "overview": "Russia's military told President Vladimir Putin on 4 July 2026 that its forces had captured Kostiantynivka, a strategically important city in Ukraine's eastern Donetsk region. President Volodymyr Zelensky and Ukraine's General Staff rejected the claim, insisting the city remains under Ukrainian control, with Zelensky challenging Putin to meet him there. Kyiv acknowledges that some Russian infantry have pushed into the city and that the situation is difficult, but says Kostiantynivka has not fallen and fighting continues.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters — Zelensky denies Russian capture of key eastern city Kostiantynivka",
        "href": "https://news.google.com/rss/articles/CBMiwwFBVV95cUxPQnNiZ2ZRUk1xcWxoWkcyNjNibHV2R0c2S1E5Ym9TbTNnVHpwWHNWQVRaMXE2T1M0aDRiejN1TC1rTThEX2VlT0hiYnVsWGRWOEFnMGZST2NXOFFiTFF6RTF6cThEb0xnOW9SSlRnZFdRVHZoZHlJd2stZ05BeHdOc0pXWHNFT3pZUFBMd1lzQ0t4TmoxenpXWTV0RmszdmxvNkJ6YXVua0lwQi1VbVpOUEhGNFktVEcwMnprLTRnX0tHeFE?oc=5"
      },
      {
        "name": "Reuters — Russia claims capture of Kostiantynivka",
        "href": "https://news.google.com/rss/articles/CBMi2wFBVV95cUxNQ0RBRmlpN2UtbDdMQUpmZDNuaXozSW1uMm1qWTBoT3lWc25yamFFUklpYW81bFk4ZHY4cVVqdGtIU0o2bGlpeldFcjJ4b1d4aGxxQTlzS1R0T2JxRXplR1M0MGphWnpTdVFzcFJQUGFPVWhmNUFISVNHSURvYnpOMnBUVVhHWlpOekJNUkxKS3N3cEZlYUlJZzhScllvc29yVFV6UmFNa2Q0cGRqQ2dkSUhERHoyS1dxelBGVS1NM0lwOE5iN1VZSWlxaXUwZzdtQmFGenJHaVVKalE?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-04",
    "image": {
      "src": "/covers/ukraine-kostiantynivka-contested.png",
      "alt": "Wreckage of Kostiantynivka's central market after a Russian missile strike in Ukraine's Donetsk region, twisted metal and rubble under a grey sky.",
      "credit": "Donetsk Regional Military Civil Administration (dn.gov.ua), CC BY 4.0, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 4 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The fall and razing of Plataea (Peloponnesian War, 427 BC)",
        "excerpt": "...and afterwards razed it to the ground from the very foundations",
        "source": "Thucydides, History of the Peloponnesian War, Book 3 (Crawley translation), Wikisource",
        "href": "https://en.wikisource.org/wiki/History_of_the_Peloponnesian_War/Book_3"
      },
      {
        "category": "historical",
        "title": "The surrender at the siege of Alesia (52 BC)",
        "excerpt": "He himself took his seat in the entrenchments in front of the camp: the leaders were brought out to him there. Vercingetorix was surrendered, arms were thrown down.",
        "source": "Julius Caesar, The Gallic War, Book VII, ch. 89 (public-domain translation), LacusCurtius, University of Chicago",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Caesar/Gallic_War/7G*.html"
      },
      {
        "category": "literary",
        "title": "The Red Badge of Courage — the smoke and phantoms of battle",
        "excerpt": "Buried in the smoke of many rifles his anger was directed not so much against the men whom he knew were rushing toward him as against the swirling battle phantoms which were choking him, stuffing their smoke robes down his parched throat.",
        "source": "Stephen Crane, The Red Badge of Courage, Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/73/pg73.txt"
      },
      {
        "category": "literary",
        "title": "The Charge of the Light Brigade — a blunder remembered as glory",
        "excerpt": "Their's not to reason why, / Their's but to do and die.",
        "source": "Alfred, Lord Tennyson, 'The Charge of the Light Brigade', Maud, and Other Poems (1855), Wikisource",
        "href": "https://en.wikisource.org/wiki/Maud,_and_other_poems/The_Charge_of_the_Light_Brigade"
      },
      {
        "category": "artistic",
        "title": "Wellington's Victory (Wellingtons Sieg), Op. 91 — Beethoven",
        "excerpt": "Beethoven's noisy 1813 'battle symphony' stages a proclaimed triumph as pure spectacle: opposing fanfares, marching drums, ratchets and actual cannon fire hurled across the orchestra until one side's anthem drowns the other. Written to celebrate a real victory at Vitoria, it is music as war bulletin — bombast standing in for the confusion and carnage of the field. Its swagger is a reminder of how easily a battlefield claim can be dressed as unarguable, resounding fact.",
        "source": "IMSLP: Wellingtons Sieg, Op.91 (Beethoven, Ludwig van)",
        "href": "https://imslp.org/wiki/Wellingtons_Sieg,_Op.91_(Beethoven,_Ludwig_van)"
      },
      {
        "category": "artistic",
        "title": "The Apotheosis of War (1871) — Vasily Vereshchagin",
        "excerpt": "Vereshchagin painted a pyramid of human skulls on a scorched plain before the broken walls of a dead city, crows wheeling above and settling in the eye sockets. He inscribed it 'to all great conquerors, past, present and to come' — a flat rebuke to every dispatch that turns a ruined town into a boast of glory. It is the reality behind the victory claim: not a captured prize, but ash, bone and silence.",
        "source": "Wikimedia Commons (painting held in the Tretyakov Gallery, Moscow)",
        "href": "https://commons.wikimedia.org/wiki/File:1871_Vereshchagin_Apotheose_des_Krieges_anagoria.JPG",
        "image": {
          "src": "/covers/ukraine-kostiantynivka-contested--art.png",
          "alt": "A pyramid of human skulls on a barren, scorched plain before the ruined walls of a town, with black crows circling and perched among the bones under a pale sky.",
          "credit": "Vasily Vereshchagin, The Apotheosis of War (1871), Tretyakov Gallery; photograph by Wikimedia user Anagoria, public domain"
        }
      }
    ],
    "rank": 28
  },
  {
    "slug": "peru-fujimori-wins-presidency",
    "headline": "Keiko Fujimori declared winner of Peru's presidential runoff by a razor-thin margin",
    "overview": "Peru's National Jury of Elections declared conservative Keiko Fujimori the winner of the June 7 presidential runoff on 3 July 2026, nearly four weeks after the vote, with roughly 50.14% (about 9,223,000 votes) to leftist congressman Roberto Sanchez's 49.87% (about 9,173,000), a margin of only some 50,000 ballots. The daughter of jailed former president Alberto Fujimori, she prevailed on her fourth presidential attempt after losing the 2011, 2016 and 2021 races, and is due to be sworn in on 28 July for a five-year term. Sanchez alleged irregularities in the count but offered no evidence, underscoring the depth of the country's political divide.",
    "genre": "Politics",
    "sources": [
      {
        "name": "BBC News",
        "href": "https://www.bbc.co.uk/news/articles/cr5jpvv06e1o"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMipwFBVV95cUxPWTFiY3VtRVlUMFdLZVNuZnZxRVBMOWxoU2NyQ2dmZ3Itd3dEX18xMlFYV3RSdGtVa1l4NFNueHVwbkJjeG43YW40Sjl0NFJ4cjZaMWZ6SnRoVWpFWkItaGdJWlB4WkpCSmtlM2tYNXU2bHhjdm5Ua3BVQjZwVEF2UTJSZ3B5dmQ5ZEFsSUhubGJmUHlSQVNicDdBZHN1RGZNcGhFRnRsRQ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-04",
    "image": {
      "src": "/covers/peru-fujimori-wins-presidency.png",
      "alt": "Keiko Fujimori speaking at a podium, gesturing as she addresses supporters and the press.",
      "credit": "Dikilucario, CC BY-SA 4.0, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 4 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Disputed United States Presidential Election of 1876",
        "excerpt": "Upon one point there is entire unanimity in public sentiment—that conflicting claims to the Presidency must be amicably and peaceably adjusted, and that when so adjusted the general acquiescence of the nation ought surely to follow.",
        "source": "Rutherford B. Hayes, Inaugural Address (1877), Wikisource",
        "href": "https://en.wikisource.org/wiki/Rutherford_B._Hayes's_Inaugural_Address"
      },
      {
        "category": "historical",
        "title": "Louis Bonaparte and the Return of a Dynasty (1851)",
        "excerpt": "He forgot to add: 'Once as tragedy, and again as farce.'",
        "source": "Karl Marx, The Eighteenth Brumaire of Louis Bonaparte, Project Gutenberg",
        "href": "https://www.gutenberg.org/files/1346/1346-h/1346-h.htm"
      },
      {
        "category": "literary",
        "title": "Shakespeare, King Richard III (Act 1, Scene 1)",
        "excerpt": "Now is the Winter of our Discontent, Made glorious Summer by this Son of Yorke: And all the clouds that lowr'd vpon our house In the deepe bosome of the Ocean buried. Now are our browes bound with Victorious Wreathes, Our bruised armes hung vp for Monuments;",
        "source": "William Shakespeare, King Richard III, Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/1103/pg1103.html"
      },
      {
        "category": "literary",
        "title": "Milton, Paradise Lost (Book I)",
        "excerpt": "Here at least We shall be free; th' Almighty hath not built Here for his envy, will not drive us hence: Here we may reign secure, and in my choyce To reign is worth ambition though in Hell: Better to reign in Hell, then serve in Heav'n.",
        "source": "John Milton, Paradise Lost, Book I, Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/20/pg20.txt"
      },
      {
        "category": "artistic",
        "title": "Mussorgsky, Boris Godunov",
        "excerpt": "Mussorgsky's opera opens on a Russia that hails a new sovereign even as guilt and rumor gnaw at his legitimacy: Boris ascends the throne amid pealing coronation bells and a crowd goaded into acclaiming him, only for the triumph to curdle into paranoia and revolt. It is a portrait of power grasped under a cloud of doubt, where a divided nation's cheers can never quite silence the whispers of a contested succession.",
        "source": "IMSLP: Boris Godunov (Mussorgsky, Modest)",
        "href": "https://imslp.org/wiki/Boris_Godunov_(Mussorgsky,_Modest)"
      },
      {
        "category": "artistic",
        "title": "Jacques-Louis David, The Coronation of Napoleon (1805–1807)",
        "excerpt": "David's vast canvas freezes the instant a self-made ruler crowns his own dynasty: Napoleon, having taken the diadem from the Pope's hands, lifts the crown above the kneeling Josephine while church and court look on in gilded splendor. The painting monumentalizes raw ambition dressed as sacred legitimacy—a divisive figure staging his hard-won ascent as inevitability.",
        "source": "Musee du Louvre / Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Jacques-Louis_David,_The_Coronation_of_Napoleon_edit.jpg",
        "image": {
          "src": "/covers/peru-fujimori-wins-presidency--art.png",
          "alt": "Jacques-Louis David's monumental painting of Napoleon in coronation robes raising a golden crown above the kneeling Josephine inside Notre-Dame, as clergy and court look on.",
          "credit": "Jacques-Louis David, The Coronation of Napoleon (1805–1807), Musee du Louvre; public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 29
  },
  {
    "slug": "albania-flamingo-revolution-protests",
    "headline": "Tens of thousands rally in Tirana as 'Flamingo Revolution' demands PM Rama's resignation",
    "overview": "Tens of thousands of demonstrators massed in Tirana on 4 July 2026 in the anti-government movement known as the 'Flamingo Revolution', renewing demands for the resignation of Prime Minister Edi Rama after more than a month of daily protests. The unrest began on 23 May over a Kushner-backed luxury resort project on the protected Narta Lagoon wetland and swelled into a broad anti-corruption movement, drawing an estimated 250,000 people at its 20 June peak in the capital. Clashes outside parliament on 2 July left roughly 19 people needing treatment, most of them police, and more than 20 protesters detained.",
    "genre": "Politics",
    "sources": [
      {
        "name": "BBC News",
        "href": "https://www.bbc.co.uk/news/articles/c8925jnl0z3o"
      },
      {
        "name": "Independent Balkan News Agency (IBNA)",
        "href": "https://www.ibnaeu.com/en/2026/07/04/albania-protests-edi-rama-international-credibility/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-04",
    "image": {
      "src": "/covers/albania-flamingo-revolution-protests.png",
      "alt": "Vast crowd of protesters filling Dëshmorët e Kombit Boulevard in central Tirana during a Flamingo Revolution demonstration on 13 June 2026.",
      "credit": "Albinfo, CC BY 4.0, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 4 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "United States Declaration of Independence (1776)",
        "excerpt": "We hold these truths to be self-evident, that all men are created equal, that they are endowed by their Creator with certain unalienable Rights, that among these are Life, Liberty and the pursuit of Happiness.",
        "source": "The U.S. National Archives",
        "href": "https://www.archives.gov/founding-docs/declaration-transcript"
      },
      {
        "category": "historical",
        "title": "Declaration of the Rights of Man and of the Citizen (1789)",
        "excerpt": "The aim of all political association is the preservation of the natural and imprescriptible rights of man. These rights are liberty, property, security, and resistance to oppression.",
        "source": "The Avalon Project, Yale Law School",
        "href": "https://avalon.law.yale.edu/18th_century/rightsof.asp"
      },
      {
        "category": "literary",
        "title": "Percy Bysshe Shelley, 'The Mask of Anarchy' (1819)",
        "excerpt": "Rise like Lions after slumber / In unvanquishable number— / Shake your chains to earth like dew / Which in sleep had fallen on you— / Ye are many—they are few.",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Masque_of_Anarchy"
      },
      {
        "category": "literary",
        "title": "James Russell Lowell, 'The Present Crisis' (1845)",
        "excerpt": "Once to every man and nation comes the moment to decide, / In the strife of Truth with Falsehood, for the good or evil side",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Present_Crisis"
      },
      {
        "category": "artistic",
        "title": "Frédéric Chopin, Étude in C minor, Op. 10 No. 12 'Revolutionary' (1831)",
        "excerpt": "Legend holds that Chopin dashed off this C-minor study on learning that Warsaw had fallen to the Tsar's armies during the 1831 November Uprising. Over a left hand that churns like an onrushing tide of bodies, the right hammers out a defiant, grief-stricken cry — the sound of a people refusing to kneel to an empire. It has been the anthem of doomed but unbowed revolt ever since.",
        "source": "IMSLP: Études, Op.10 (Chopin, Frédéric)",
        "href": "https://imslp.org/wiki/%C3%89tudes,_Op.10_(Chopin,_Fr%C3%A9d%C3%A9ric)"
      },
      {
        "category": "artistic",
        "title": "Eugène Delacroix, 'Liberty Leading the People' (1830)",
        "excerpt": "Delacroix's canvas shows the people of Paris surging over the barricades of the July Revolution of 1830, a bare-armed figure of Liberty raising the tricolour above a crowd of workers, students and street boys. Powder smoke and the bodies of the fallen fill the foreground as the living press forward toward the viewer. It endures as the defining image of a crowd in the public square toppling an entrenched king.",
        "source": "Musée du Louvre",
        "href": "https://collections.louvre.fr/en/ark:/53355/cl010065872",
        "image": {
          "src": "/covers/albania-flamingo-revolution-protests--art.png",
          "alt": "Allegorical figure of Liberty in a Phrygian cap raises the French tricolour and leads an armed crowd over a barricade strewn with the dead.",
          "credit": "Eugène Delacroix, Musée du Louvre, public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 30
  },
  {
    "slug": "pope-leo-lampedusa-migrants",
    "headline": "Pope Leo marks July 4 with Lampedusa appeal urging US and Europe to welcome migrants",
    "overview": "On July 4, 2026, Pope Leo XIV, the first US-born pontiff, visited the Italian island of Lampedusa, a frontline gateway for Mediterranean migrant crossings, praying at the graves of migrants who died at sea and blessing a dock dedicated to Pope Francis. In a message to Americans on the 250th anniversary of US independence and in his homily, he urged that defending human life also means \"welcoming, protecting and assisting immigrants,\" and called on Europe to build a long-term plan to receive, protect, support and integrate migrants. He described their loss at sea as the fruit of choices made and unmade, and appealed for compassion toward those seeking freedom and prosperity.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMirAFBVV95cUxPbmUxemdCWjNHSUZXb2tQNFRVeEFWRml5c3BMaDdCMkVNYUsxOFh1dHNnLUh4cU4xM01jdlJobWJLdzFLZkxadXJjRS1XTEpPeEU4NEpQX1Z2Ymp2RG9fV0JWNkVWRXF0Rm1pYUVBOXNST005X09Bb1lkVzkyMkc3RThwYWd4bUxwVnNYRVVHSU1LVWVtdmJ1YmZJMkZlQ2FiOTRYY1N3Qm1rT0VH?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c5yz83n7q5no"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-04",
    "image": {
      "src": "/covers/pope-leo-lampedusa-migrants.png",
      "alt": "Pope Leo XIV in white papal vestments, photographed at the Vatican in October 2025.",
      "credit": "Ricardo Stuckert / Palácio do Planalto, via Wikimedia Commons (CC BY-SA 4.0)"
    },
    "edition": "Evening Edition · 4 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Homily of Pope Francis at Lampedusa (8 July 2013)",
        "excerpt": "For his first journey outside Rome in 2013, Pope Francis chose this same tiny island, casting a wreath into the sea for the drowned and denouncing what he called the \"globalization of indifference\" that has robbed the world of the ability to weep for the stranger. Leo XIV's return to Lampedusa on Independence Day consciously echoes that gesture, extending a decade-old summons to conscience from one shepherd to the next.",
        "source": "The Holy See, Vatican.va",
        "href": "https://www.vatican.va/content/francesco/en/homilies/2013/documents/papa-francesco_20130708_omelia-lampedusa.html"
      },
      {
        "category": "historical",
        "title": "Emma Lazarus, \"The New Colossus\" (1883), inscribed on the Statue of Liberty",
        "excerpt": "\"Give me your tired, your poor, / Your huddled masses yearning to breathe free, / The wretched refuse of your teeming shore. / Send these, the homeless, tempest-tost to me, / I lift my lamp beside the golden door!\"",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/The_New_Colossus"
      },
      {
        "category": "literary",
        "title": "The Parable of the Good Samaritan, Gospel of Luke 10 (King James Version)",
        "excerpt": "\"But a certain Samaritan, as he journeyed, came where he was: and when he saw him, he had compassion on him, And went to him, and bound up his wounds, pouring in oil and wine, and set him on his own beast, and brought him to an inn, and took care of him.\"",
        "source": "Wikisource, Bible (King James)/Luke",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Luke#Chapter_10"
      },
      {
        "category": "literary",
        "title": "The Book of Exodus, the crossing of the sea, Exodus 14 (King James Version)",
        "excerpt": "\"And the children of Israel went into the midst of the sea upon the dry ground: and the waters were a wall unto them on their right hand, and on their left.\"",
        "source": "Wikisource, Bible (King James)/Exodus",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Exodus"
      },
      {
        "category": "artistic",
        "title": "Giuseppe Verdi, \"Va, pensiero\" (Chorus of the Hebrew Slaves) from Nabucco",
        "excerpt": "Verdi's 1841 opera gives voice to the Hebrews exiled by the waters of Babylon, and its great third-act chorus, \"Va, pensiero, sull'ali dorate,\" sends thought flying on golden wings back to a lost homeland. The lament of a people driven from their own shores became an anthem of longing and displacement, its yearning melody a mirror to those who cross the sea dreaming of the land they have left behind.",
        "source": "IMSLP: Nabucco (Verdi, Giuseppe)",
        "href": "https://imslp.org/wiki/Nabucco_(Verdi,_Giuseppe)"
      },
      {
        "category": "artistic",
        "title": "Théodore Géricault, The Raft of the Medusa (1818–1819)",
        "excerpt": "Géricault's monumental canvas depicts the survivors of the wrecked French frigate Méduse adrift on a makeshift raft, bodies heaped in despair as a handful of figures strain toward a distant sail on the horizon. Built from interviews with real survivors and studies of the dying, the painting turns a maritime catastrophe into a towering emblem of hope and abandonment at sea, uncannily resonant with the perilous Mediterranean crossings mourned at Lampedusa.",
        "source": "Wikimedia Commons / Musée du Louvre",
        "href": "https://commons.wikimedia.org/wiki/File:JEAN_LOUIS_TH%C3%89ODORE_G%C3%89RICAULT_-_La_Balsa_de_la_Medusa_(Museo_del_Louvre,_1818-19).jpg",
        "image": {
          "src": "/covers/pope-leo-lampedusa-migrants--art.png",
          "alt": "Shipwreck survivors crowded on a makeshift raft at sea, some collapsed and dead, others straining upward to signal a distant ship on the horizon.",
          "credit": "Théodore Géricault, The Raft of the Medusa (1818–19), Musée du Louvre; public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 31
  },
  {
    "slug": "continental-contitech-sale",
    "headline": "Continental to sell ContiTech unit to Lone Star Funds for $4.6 billion",
    "overview": "German automotive and industrial group Continental AG on 4 July 2026 agreed to sell its ContiTech industrial rubber and plastics division to US private-equity firm Lone Star Funds, in a deal valuing the unit at 4.0 billion euros (about $4.6 billion) plus up to 250 million euros in performance-based payments. Continental expects roughly 3.1 billion euros in cash proceeds on closing, which is targeted for the end of 2026, and plans to return about 2.5 billion euros to shareholders. The divestment completes Continental's breakup and strategic realignment around its core Tires business.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMitAFBVV95cUxNdktvMlBtS2JhMDUxczNHYkQxdmV6a0NjRDNNM0o0UGtSRl8xLVdkckdkQVd0Rm1hU3dFSFhyeWRvSWt0Y2l5ZDVGZUJPalhETGxOaE1yWGU2bmJ4d3p1bzFXQ2cyUDlzWjM2dEZ1WGJwSENmcTd1UnBoRXB1R3BQbUxxay1rWUZHdnloaEUtZVdUZmdKUEtBbUl5ekQxdURWeW4yclRwT1Fwd0JLRWpkdkVsSm8?oc=5"
      },
      {
        "name": "Continental AG ad-hoc press release (EQS), 4 July 2026",
        "href": "https://www.finanzwire.com/press-release/continental-ag-etr-con-eqs-adhoc-continental-ag-continental-ag-sells-contitech-group-sector-n3BDZvEdFLn"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-04",
    "image": {
      "src": "/covers/continental-contitech-sale.png",
      "alt": "Interior of a ContiTech conveyor-belt manufacturing plant, part of Continental's industrial rubber division.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 4 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Dissolution of Standard Oil (1911)",
        "excerpt": "The remedy to be administered in case of a combination violating the Anti-Trust Act is two-fold: first, to forbid the continuance of the prohibited act, and second, to so dissolve the combination as to neutralize the force of the unlawful power.",
        "source": "U.S. Supreme Court, Standard Oil Co. of New Jersey v. United States (1911), via Wikisource",
        "href": "https://en.wikisource.org/wiki/Standard_Oil_Co._of_New_Jersey_v._United_States"
      },
      {
        "category": "historical",
        "title": "The Praetorian Guard Auctions the Roman Empire (193 AD)",
        "excerpt": "just as if it had been in some market or auction-room, both the City and its entire empire were auctioned off.",
        "source": "Cassius Dio, Roman History, Book LXXIV (LacusCurtius / University of Chicago)",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Cassius_Dio/74*.html"
      },
      {
        "category": "literary",
        "title": "The Cherry Orchard (1904)",
        "excerpt": "The cherry orchard is mine now, mine! [Roars with laughter] My God, my God, the cherry orchard's mine!",
        "source": "Anton Chekhov, The Cherry Orchard, trans. Julius West (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/7986/7986-h/7986-h.htm"
      },
      {
        "category": "literary",
        "title": "The Fall of the House of Usher (1839)",
        "excerpt": "the deep and dank tarn at my feet closed sullenly and silently over the fragments of the \"House of Usher\".",
        "source": "Edgar Allan Poe, The Fall of the House of Usher (Project Gutenberg)",
        "href": "https://www.gutenberg.org/ebooks/932"
      },
      {
        "category": "artistic",
        "title": "Edward Elgar, Cello Concerto in E minor, Op. 85 (1919)",
        "excerpt": "Written in the ashes of the First World War, Elgar's concerto is a long autumnal farewell to a vanished order, its opening cello lament falling like a house settling into dusk. The music mourns a grand and confident world quietly coming apart, its splendour receding beyond recall. It is the elegy of an old estate broken up and sold on, dignity and loss sounding in the same breath.",
        "source": "IMSLP: Cello Concerto, Op.85 (Elgar, Edward)",
        "href": "https://imslp.org/wiki/Cello_Concerto,_Op.85_(Elgar,_Edward)"
      },
      {
        "category": "artistic",
        "title": "The Course of Empire: Destruction (1836)",
        "excerpt": "Thomas Cole's canvas shows the proud imperial city at the moment of its undoing: bridges collapse, colonnades topple into the harbor, and smoke boils over marble palaces once thought eternal. The fourth panel of his five-part cycle, it charts how a great and confident civilization is torn apart at the height of its wealth. It is a vision of an old and mighty house consumed, its splendor broken up and carried off amid fire and ruin.",
        "source": "Thomas Cole, The Course of Empire: Destruction, New-York Historical Society (via Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Cole_Thomas_The_Course_of_Empire_Destruction_1836.jpg",
        "image": {
          "src": "/covers/continental-contitech-sale--art.png",
          "alt": "Painting of a great classical city being sacked and burned, its bridges and columns collapsing into the harbor amid smoke and chaos.",
          "credit": "Thomas Cole, New-York Historical Society, via Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 32
  },
  {
    "slug": "trump-accounts-newborn-debut",
    "headline": "Trump Accounts debut on July 4, seeding $1,000 for every eligible US newborn",
    "overview": "The federal government's \"Trump Accounts\" officially debuted on July 4, 2026, as the United States opened its 250th Independence Day celebrations, seeding a tax-advantaged investment account with a one-time $1,000 U.S. Treasury contribution for every eligible newborn. To receive the seed money a child must be a U.S. citizen with a Social Security number and born between January 1, 2025, and December 31, 2028; the funds are invested in low-cost U.S. equity index funds and generally cannot be withdrawn until age 18. Parents and others may contribute up to $5,000 per year to each account.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMivwFBVV95cUxPdl81dTVpMVFTMlB1alhyU1pPazFyLTVGWjlHWG50d1ZuZWZjRGptdnl0V3hmSjQ4dWxlWFFQVE9La0xwODJNZDgtd1J5RWh1dEtReUFncTNTdUthcTFLWjY4Y3RTS2xOeHFRUU9wWUphbWFsZlB1VFk0dmZWdkpzeTFkejBsWm1FTjVYc1VLazZhaWhuR0xRLTlZTDRkMXRRUlB6dVNHREV0Mk1Ia3VyUE41VDQ2MnMxX0NEMUQ1VQ?oc=5"
      },
      {
        "name": "Associated Press (via ABC News)",
        "href": "https://abcnews.com/Business/wireStory/trump-accounts-launch-july-4-giving-newborns-1000-134405062"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-04",
    "image": {
      "src": "/covers/trump-accounts-newborn-debut.png",
      "alt": "The neoclassical United States Treasury Building in Washington, D.C., seat of the department seeding the new newborn accounts.",
      "credit": "Photograph by Loren (Wikimedia user Changlc), released into the public domain, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 4 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Thomas Paine, Agrarian Justice (1797)",
        "excerpt": "To create a national fund, out of which there shall be paid to every person, when arrived at the age of twenty-one years, the sum of fifteen pounds sterling, as a compensation in part, for the loss of his or her natural inheritance, by the introduction of the system of landed property",
        "source": "Thomas Paine, Agrarian Justice (1797)",
        "href": "https://www.ushistory.org/paine/agrarian/agrarian1.htm"
      },
      {
        "category": "historical",
        "title": "The Homestead Act (1862)",
        "excerpt": "Be it enacted by the Senate and House of Representatives of the United States of America in Congress assembled, That any person who is the head of a family, or who has arrived at the age of twenty-one years, and is a citizen of the United States … shall … be entitled to enter one quarter section or a less quantity of unappropriated public lands",
        "source": "Homestead Act (1862), U.S. National Archives",
        "href": "https://www.archives.gov/milestone-documents/homestead-act"
      },
      {
        "category": "literary",
        "title": "Charles Dickens, Great Expectations (1861)",
        "excerpt": "Further, that it is the desire of the present possessor of that property, that he be immediately removed from his present sphere of life and from this place, and be brought up as a gentleman—in a word, as a young fellow of great expectations.",
        "source": "Charles Dickens, Great Expectations (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/1400/1400-h/1400-h.htm"
      },
      {
        "category": "literary",
        "title": "The Parable of the Talents, Gospel of Matthew 25:14–15 (KJV)",
        "excerpt": "For the kingdom of heaven is as a man travelling into a far country, who called his own servants, and delivered unto them his goods. And unto one he gave five talents, to another two, and to another one; to every man according to his several ability; and straightway took his journey.",
        "source": "The Gospel of Matthew 25:14–15, King James Version (Wikisource)",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Matthew"
      },
      {
        "category": "artistic",
        "title": "Franz Lehár, Gold und Silber (Gold and Silver Waltz), Op. 79 (1902)",
        "excerpt": "Lehár's shimmering Viennese waltz, composed for a lavish \"Gold and Silver\" ball, spins the glitter of precious metal into music, its lilting three-quarter time evoking coins cascading and fortunes turning. The very title makes wealth audible, a swirl of aspiration and glamour fit for a scheme that promises each child a small treasure. Its opening flourish suggests a nest egg catching the light before the dance of compounding years begins.",
        "source": "IMSLP: Gold und Silber, Op.79 (Lehár, Franz)",
        "href": "https://imslp.org/wiki/Gold_und_Silber,_Op.79_(Leh%C3%A1r,_Franz)"
      },
      {
        "category": "artistic",
        "title": "Quentin Massys, The Moneylender and His Wife (1514)",
        "excerpt": "In Massys' luminous Flemish panel a banker weighs gold coins on a delicate balance while his wife, distracted from her prayer book, watches the glinting money with quiet fascination. The painting meditates on wealth counted and weighed, on the pull that money exerts on a household and the careful stewardship it demands. It is an apt emblem for a scheme that places a small fortune on the scales of a newborn's future.",
        "source": "The Moneylender and His Wife, Louvre (Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Massysm_Quentin_%E2%80%94_The_Moneylender_and_his_Wife_%E2%80%94_1514.jpg",
        "image": {
          "src": "/covers/trump-accounts-newborn-debut--art.png",
          "alt": "A Renaissance moneylender weighing gold coins on a balance while his wife looks on, turning from her illuminated prayer book.",
          "credit": "Quentin Massys, The Moneylender and His Wife, 1514, oil on panel, Louvre, Paris; public domain via Wikimedia Commons"
        }
      }
    ],
    "rank": 33
  },
  {
    "slug": "ukraine-railway-locomotives-damage",
    "headline": "Ukraine says Russia damaged more than 200 railway locomotives in 2026",
    "overview": "Ukraine's state railway operator Ukrzaliznytsia says Russian strikes have destroyed or damaged more than 200 locomotives since the start of 2026, part of over 1,000 attacks on the rail network this year. Deputy Prime Minister Oleksii Kuleba said two more locomotives were hit in a strike on the Dnipropetrovsk region on the evening of 3 July, with repair costs mounting steadily. The railway, which carries more than 90% of Ukraine's export shipments, underpins the country's wartime economy and civilian transport.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMirAFBVV95cUxPeFQwdlh0cWRleHdwbVpJQ2E3cnNvUzE0TGE3RHZiVlZ3SlhDemlsLWlfOG81a1dWX0Iwc0Z4NEk1cmxxc3pCMFh3TDA3X3pVWTcyN0ZQMGRXazFiNlZiblRtblllT2hHUkhxa0VCNTlYWnh2aDZSQUQtY1NjWlRkVFlWbVROZjBjNzRzaGtMMTBwa0g2VDFneU5sc2h6MVlrZkJGcHhmUFdXaGtP?oc=5"
      },
      {
        "name": "Ukrainian National News (UNN)",
        "href": "https://unn.ua/en/news/the-russian-federation-attacked-railway-infrastructure-in-the-dnipropetrovsk-region-damaging-two-locomotives"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-04",
    "image": {
      "src": "/covers/ukraine-railway-locomotives-damage.png",
      "alt": "A Ukrainian Railways ChME3 diesel shunting locomotive stands in the Port of Odessa in early morning light.",
      "credit": "Clay Gilliland / Wikimedia Commons (CC BY-SA 2.0)"
    },
    "edition": "Evening Edition · 4 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Demolition of the Long Walls of Athens (404 BC)",
        "excerpt": "And so they fell to levelling the fortifications and walls with much enthusiasm, to the accompaniment of female flute-players, deeming that day the beginning of liberty to Greece.",
        "source": "Xenophon, Hellenica (trans. H. G. Dakyns), Book 2, Chapter 2 — Wikisource",
        "href": "https://en.wikisource.org/wiki/Hellenica_(Dakyns)/Book_2/Chapter_2"
      },
      {
        "category": "historical",
        "title": "Grant's Army Destroys the Railroads at Jackson, Mississippi (1863)",
        "excerpt": "McPherson reached Clinton with the advance early on the 13th and immediately set to work destroying the railroad.",
        "source": "Ulysses S. Grant, Personal Memoirs of U. S. Grant, Chapter XXXV — Wikisource",
        "href": "https://en.wikisource.org/wiki/Personal_Memoirs_of_U._S._Grant/Chapter_XXXV"
      },
      {
        "category": "literary",
        "title": "Walt Whitman, 'To a Locomotive in Winter'",
        "excerpt": "Thee for my recitative, / Thee in the driving storm even as now, the snow, the winter-day declining,",
        "source": "Walt Whitman, Leaves of Grass (1882), 'To a Locomotive in Winter' — Wikisource",
        "href": "https://en.wikisource.org/wiki/Leaves_of_Grass_(1882)/From_Noon_to_Starry_Night/To_A_Locomotive_in_Winter"
      },
      {
        "category": "literary",
        "title": "Charles Dickens, 'Dombey and Son' — the Railway Tears Through Staggs's Gardens",
        "excerpt": "The first shock of a great earthquake had, just at that period, rent the whole neighbourhood to its centre.",
        "source": "Charles Dickens, Dombey and Son (1848), Chapter 6 — Wikisource",
        "href": "https://en.wikisource.org/wiki/Dombey_and_Son_(1848)/Chapter_6"
      },
      {
        "category": "artistic",
        "title": "Arthur Honegger, Pacific 231 (Mouvement symphonique No. 1)",
        "excerpt": "Honegger's 1923 orchestral tour de force does not so much depict a locomotive as embody one: from a vast steam engine trembling at rest, the music accelerates through churning, interlocking rhythms into a headlong three-hundred-ton rush, then grinds to a shuddering halt. It remains the definitive musical portrait of the iron road as raw industrial power — the same awesome machine that, in Ukraine today, means survival rather than spectacle.",
        "source": "IMSLP: Pacific 231, H.53 (Honegger, Arthur)",
        "href": "https://imslp.org/wiki/Pacific_231,_H.53_(Honegger,_Arthur)"
      },
      {
        "category": "artistic",
        "title": "J. M. W. Turner, 'Rain, Steam and Speed – The Great Western Railway' (1844)",
        "excerpt": "Turner dissolves a Great Western Railway locomotive into a blaze of rain, steam and golden light as it storms across Brunel's bridge over the Thames. The machine is at once triumphant and menacing — the newborn power of the railway age hurtling out of the mist. Where Turner painted the iron road as the sublime engine of progress, its destruction in wartime Ukraine turns the same image into one of loss.",
        "source": "J. M. W. Turner, National Gallery, London — Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Turner_-_Rain,_Steam_and_Speed_-_National_Gallery_file.jpg",
        "image": {
          "src": "/covers/ukraine-railway-locomotives-damage--art.png",
          "alt": "A steam locomotive races across a bridge through a golden storm of rain and mist in Turner's impressionistic 1844 painting.",
          "credit": "J. M. W. Turner, National Gallery, London / Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 34
  },
  {
    "slug": "india-ethanol-fuel-mandate",
    "headline": "India's auto industry defends E20 ethanol petrol mandate amid consumer backlash over mileage and engine wear",
    "overview": "India's leading automakers and the Society of Indian Automobile Manufacturers (SIAM) publicly defended the government's E20 ethanol-blended petrol mandate on 4 July 2026, saying years of laboratory and real-world testing had found no evidence that the fuel causes engine damage or abnormal wear. The defense came amid a growing consumer backlash over complaints of reduced mileage, engine wear and higher costs, with critics planning protests after the attorney general described E20 as an 'experiment' in a court hearing. Representatives from Toyota Kirloskar Motor, Maruti Suzuki, Hero MotoCorp, TVS Motor, Bajaj Auto and Hyundai argued the transition followed extensive testing by manufacturers, the Automotive Research Association of India (ARAI) and SIAM.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMisAFBVV95cUxQNG9TelFsOVI5bm11YUJ3VHV6YTlPX1BnV1RMVnZuZkZ5NXl1UldvODZNZmVzRnNCUEdweUJidjdyWFBQUXA3SEVGSUx4U2lXWkE2SWRBLUJSV0Nld0pyT052Vl9EVTFwZVVWdjVvaEZnY3N2NXN3ZHhEVW4tejRMVnNzYlhDajJFSXh4YTJsZnM2c2xsbGxJalczRTd0TXVFS2t3SVlpV0hYN1o0R0JQVA?oc=5"
      },
      {
        "name": "Outlook India",
        "href": "https://www.outlookindia.com/national/industry-experts-defend-ethanol-blending-say-e20-fuel-safe-for-vehicles"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-04",
    "image": {
      "src": "/covers/india-ethanol-fuel-mandate.png",
      "alt": "A Hindustan Petroleum fuel pump on an Indian petrol station forecourt in Coimbatore.",
      "credit": "Photo by Wikimedia Commons user Ask27, CC BY-SA 4.0"
    },
    "edition": "Evening Edition · 4 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "A Treatise on Adulterations of Food, and Culinary Poisons (1820)",
        "excerpt": "But of all possible nefarious traffic and deception, practised by mercenary dealers, that of adulterating the articles intended for human food with ingredients deleterious to health, is the most criminal.",
        "source": "Friedrich Accum (Project Gutenberg)",
        "href": "https://www.gutenberg.org/ebooks/19031"
      },
      {
        "category": "historical",
        "title": "Speech on the Frame-Work Bill, House of Lords, 27 February 1812",
        "excerpt": "By the adoption of one species of Frame in particular, one man performed the work of many, and the superfluous labourers were thrown out of employment.",
        "source": "Lord Byron, Hansard (UK Parliament)",
        "href": "https://api.parliament.uk/historic-hansard/lords/1812/feb/27/frame-work-bill"
      },
      {
        "category": "literary",
        "title": "Frankenstein; or, The Modern Prometheus",
        "excerpt": "Learn from me, if not by my precepts, at least by my example, how dangerous is the acquirement of knowledge and how much happier that man is who believes his native town to be the world, than he who aspires to become greater than his nature will allow.",
        "source": "Mary Shelley (Project Gutenberg)",
        "href": "https://www.gutenberg.org/ebooks/84"
      },
      {
        "category": "literary",
        "title": "Erewhon: The Book of the Machines",
        "excerpt": "let him think of a hundred thousand years, and the accumulated progress which they will bring, unless man can be awakened to a sense of his situation, and of the doom which he is preparing for himself.",
        "source": "Samuel Butler (Wikisource)",
        "href": "https://en.wikisource.org/wiki/Erewhon/Chapter_23"
      },
      {
        "category": "artistic",
        "title": "Sergei Prokofiev, Le pas d'acier (The Steel Step), Op. 41 (1925–26)",
        "excerpt": "Prokofiev's constructivist ballet score churns with the pistons and hammers of the machine age, its driving ostinatos and clanging brass staging the factory floor as a kind of mechanized dance. Written to glorify a society retooling itself around industry, it captures both the exhilaration and the brute relentlessness of a nation remaking its engines. It is the sound of modernization imposed at full throttle, thrilling and faintly menacing at once.",
        "source": "IMSLP: Le pas d'acier, Op.41 (Prokofiev, Sergey)",
        "href": "https://imslp.org/wiki/Le_pas_d%27acier,_Op.41_(Prokofiev,_Sergey)"
      },
      {
        "category": "artistic",
        "title": "Philip James de Loutherbourg, Coalbrookdale by Night (1801)",
        "excerpt": "Loutherbourg's canvas sets the Bedlam ironworks of Coalbrookdale ablaze against the night, furnaces throwing a hellish orange glare over the Shropshire valley as smoke boils into the dark. Painted at the dawn of the industrial age, it renders a new fuel-driven technology as at once sublime and unsettling — progress lighting up the sky and scorching the land beneath. It is the ambivalent face of every energy revolution, wonder and dread burning together.",
        "source": "Philip James de Loutherbourg, Coalbrookdale by Night (1801), Science Museum, London / Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Philipp_Jakob_Loutherbourg_d._J._002.jpg",
        "image": {
          "src": "/covers/india-ethanol-fuel-mandate--art.png",
          "alt": "A night landscape of the Coalbrookdale ironworks with furnaces glowing fiery orange and smoke billowing into the dark sky.",
          "credit": "Philip James de Loutherbourg, Coalbrookdale by Night (1801), Science Museum, London; public domain via Wikimedia Commons"
        }
      }
    ],
    "rank": 35
  },
  {
    "slug": "ai-small-business-growth",
    "headline": "For one small business, AI was key to a quick start and expansion",
    "overview": "Reuters profiles Here Now Health, a Medicaid-funded mental-health platform for foster children founded in 2025 by first-time entrepreneur Michelle Turner, who worked from her Virginia Beach home and used AI tools to teach herself startup fundamentals, draft a business plan and refine her pitch to investors. Turner likened the technology to \"going to a master's level class every day from the robot,\" and the company now employs 16 people and is certified in three states. Economists cited in the report argue AI is dramatically reducing the cost and complexity of launching and scaling a company, lowering the barriers for founders without an MBA or startup pedigree.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiwAFBVV95cUxOSEhsMnNsNTVEQ29fZ1pGMzB6ZzNyZHgxWmUwaGp5Z0JxeGpUS3hCNUw5NHZ1NTFLVDFJUjd1bFZoQmpfRFFMMEQtZXVadnFmc01yaUpwSFl0Njc4X2Jsc1ZmYWdXcHdMRkJfUi1wLVNzNHQzcGhfNThMV2RLYU5faW1SSUE2ZXExV25uOERMSG5XNG43UHBmbmM4c2hkSVlNT0tNVFNvandxempMejF1MmZYWWF3SGRueVJ2dlllUV8?oc=5"
      },
      {
        "name": "U.S. Chamber of Commerce (CO—): How AI Is Driving 'Growth Engines' for Small Businesses in 2026",
        "href": "https://www.uschamber.com/co/run/technology/ai-powered-growth-engines"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-04",
    "image": {
      "src": "/covers/ai-small-business-growth.png",
      "alt": "A craftsman's hands shaping wooden details at a cluttered workbench in a small workshop, tools laid out around the work.",
      "credit": "Shixart1985, CC BY 2.0, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 4 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The boy who tied a string to the valve",
        "excerpt": "One of those boys, who loved to play with his companions, observed that, by tying a string from the handle of the valve which opened this communication to another part of the machine, the valve would open and shut without his assistance, and leave him at liberty to divert himself with his play-fellows. One of the greatest improvements that has been made upon this machine, since it was first invented, was in this manner the discovery of a boy who wanted to save his own labour.",
        "source": "Adam Smith, The Wealth of Nations (1776)",
        "href": "https://www.gutenberg.org/cache/epub/3300/pg3300.txt"
      },
      {
        "category": "historical",
        "title": "The tradesman and his wheelbarrow",
        "excerpt": "I drest plainly; I was seen at no places of idle diversion. I never went out a fishing or shooting; a book, indeed, sometimes debauch'd me from my work, but that was seldom, snug, and gave no scandal; and, to show that I was not above my business, I sometimes brought home the paper I purchas'd at the stores thro' the streets on a wheelbarrow.",
        "source": "Benjamin Franklin, The Autobiography of Benjamin Franklin",
        "href": "https://www.gutenberg.org/cache/epub/148/pg148.txt"
      },
      {
        "category": "literary",
        "title": "Silas Marner at his loom",
        "excerpt": "The questionable sound of Silas's loom, so unlike the natural cheerful trotting of the winnowing-machine, or the simpler rhythm of the flail, had a half-fearful fascination for the Raveloe boys, who would often leave off their nutting or birds'-nesting to peep in at the window of the stone cottage, counterbalancing a certain awe at the mysterious action of the loom, by a pleasant sense of scornful superiority, drawn from the mockery of its alternating noises, along with the bent, tread-mill attitude of the weaver.",
        "source": "George Eliot, Silas Marner (1861)",
        "href": "https://www.gutenberg.org/cache/epub/550/pg550.txt"
      },
      {
        "category": "literary",
        "title": "The Secret of the Machines",
        "excerpt": "We were taken from the ore-bed and the mine, / We were melted in the furnace and the pit— / We were cast and wrought and hammered to design, / We were cut and filed and tooled and gauged to fit. / Some water, coal, and oil is all we ask, / And a thousandth of an inch to give us play, / And now if you will set us to our task, / We will serve you four and twenty hours a day!",
        "source": "Rudyard Kipling, 'The Secret of the Machines' (1911)",
        "href": "https://en.wikisource.org/wiki/The_Secret_of_the_Machines"
      },
      {
        "category": "artistic",
        "title": "Siegfried forges the sword Nothung",
        "excerpt": "In Wagner's forging scene the young Siegfried, an untutored apprentice raised in a forest smithy, shatters and reforges the fragments of his father's broken sword into the mighty blade Nothung, hammering in time to a driving orchestral pulse. Wagner turns the workshop into a stage: bellows roar, the anvil rings, and a novice suddenly wields a power far beyond his years. It is the archetype of the apprentice handed a transformative new instrument and remaking his own future with it.",
        "source": "IMSLP: Siegfried, WWV 86C (Wagner, Richard)",
        "href": "https://imslp.org/wiki/Siegfried,_WWV_86C_(Wagner,_Richard)"
      },
      {
        "category": "artistic",
        "title": "An Iron Forge",
        "excerpt": "Joseph Wright of Derby's An Iron Forge (1772) sets a family workshop aglow around a single incandescent bar of white-hot iron, the light modelling the smith's calm face and the awed children gathered close. Painted at the dawn of the Industrial Revolution, it dignifies a small craft enterprise transformed by a new machine — a water-powered tilt-hammer looming in the shadows — where the human hand still guides the metal. Its radiant glow prefigures our own image of the softly lit workspace transformed by a powerful new instrument.",
        "source": "Joseph Wright of Derby, An Iron Forge (1772), Tate",
        "href": "https://www.tate.org.uk/art/artworks/wright-an-iron-forge-t06670",
        "image": {
          "src": "/covers/ai-small-business-growth--art.png",
          "alt": "A blacksmith and his family gathered in a dim workshop around a brilliant white-hot bar of iron on the anvil, its glow lighting their faces.",
          "credit": "Joseph Wright of Derby, An Iron Forge (1772), Tate; public domain via Wikimedia Commons"
        }
      }
    ],
    "rank": 36
  },
  {
    "slug": "williams-wimbledon-injury-exit",
    "headline": "Serena Williams withdraws from Wimbledon doubles with a knee injury, ending her comeback",
    "overview": "Serena Williams pulled out of her first-round Wimbledon doubles match alongside her sister Venus Williams after aggravating a right knee injury sustained during her singles defeat to Maya Joint, bringing her Wimbledon comeback to a premature close. The 44-year-old six-time Wimbledon doubles champions had been due to compete together for the first time since the 2022 US Open. The withdrawal was announced on the sisters' social media on 4 July 2026.",
    "genre": "Culture",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/sport/tennis/articles/ce95mxn1rlmo"
      },
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMimAFBVV95cUxPNWF2WUFsM215UG9hZnQySUpIbDhScFZRaFFwUXJGMVQxeGNmbEVicWFGOFN6ckg3N25QY0xrRE4wZGpWNDlmZnJNZVhlSFBMVlpDdlQ3QjF3eUtFZzh0cldhZUdpV0JQWDc5OUxqTDZCNVVsZzIwMEZMNHI4cDZGY2ZOOEw5S19BN3dra0hQcExZbFA3SE4tbw?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-04",
    "image": {
      "src": "/covers/williams-wimbledon-injury-exit.png",
      "alt": "Serena Williams in mid-swing during a 2013 US Open doubles match played alongside her sister Venus.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 4 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Diagoras of Rhodes carried in triumph by his sons",
        "excerpt": "The story goes that Diagoras came to Olympia in the company of his sons Acusilaus and Damagetus. The youths on defeating their father proceeded to carry him through the crowd, while the Greeks pelted him with flowers and congratulated him on his sons.",
        "source": "Pausanias, Description of Greece 6.7.3 (trans. W.H.S. Jones)",
        "href": "https://www.theoi.com/Text/Pausanias6A.html"
      },
      {
        "category": "historical",
        "title": "The death of Milo of Croton, greatest of wrestlers",
        "excerpt": "They say that he was killed by wild beasts. The story has it that he came across in the land of Crotona a tree-trunk that was drying up; wedges were inserted to keep the trunk apart. Milo in his pride thrust his hands into the trunk, the wedges slipped, and Milo was held fast by the trunk until the wolves ... made him their prey.",
        "source": "Pausanias, Description of Greece 6.14.8 (trans. W.H.S. Jones)",
        "href": "https://www.theoi.com/Text/Pausanias6A.html"
      },
      {
        "category": "literary",
        "title": "A.E. Housman, 'To an Athlete Dying Young'",
        "excerpt": "The time you won your town the race / We chaired you through the market-place; / Man and boy stood cheering by, / And home we brought you shoulder-high. // To-day, the road all runners come, / Shoulder-high we bring you home, / And set you at your threshold down, / Townsman of a stiller town.",
        "source": "A.E. Housman, A Shropshire Lad (1896), no. XIX",
        "href": "https://www.gutenberg.org/cache/epub/5720/pg5720.txt"
      },
      {
        "category": "literary",
        "title": "Homer, the generations of leaves",
        "excerpt": "Even as are the generations of leaves, such are those also of men. As for the leaves, the wind scattereth some upon the earth, but the forest, as it bourgeons, putteth forth others when the season of spring is come; even so of men one generation springeth up and another passeth away.",
        "source": "Homer, Iliad 6.146-149 (trans. A.T. Murray)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0134:book=6:card=119"
      },
      {
        "category": "artistic",
        "title": "Haydn, Symphony No. 45 in F-sharp minor, 'Farewell'",
        "excerpt": "Haydn's 1772 symphony ends with one of music's most poignant leave-takings: in the closing Adagio the players fall silent one by one, each snuffing out the candle on his stand and quietly walking off, until only two muted violins remain to finish alone in the dark. Composed as a plea for the Esterhazy musicians to be sent home, it has become the enduring emblem of the graceful exit and the end of an era, greatness dispersing note by note.",
        "source": "IMSLP: Symphony No.45 in F-sharp minor, Hob.I:45 (Haydn, Joseph)",
        "href": "https://imslp.org/wiki/Symphony_No.45_in_F-sharp_minor,_Hob.I:45_(Haydn,_Joseph)"
      },
      {
        "category": "artistic",
        "title": "The Townley Discobolus (Discus-Thrower), after Myron",
        "excerpt": "This Roman marble, copied from a lost bronze of about 460-450 BC by Myron, freezes an athlete at the coiled instant before release, body wound like a spring at the absolute summit of physical power. It is antiquity's supreme image of the human form in its perfection, a beauty that the marble holds forever and the living body can hold only for a moment.",
        "source": "The British Museum / Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Discus-thrower_(discobolus),_Roman_copy_of_a_bronze_original_of_the_5th_century_BC,_found_at_Hadrians_Villa,_Winning_at_the_ancient_Games,_British_Museum_(7376120902).jpg",
        "image": {
          "src": "/covers/williams-wimbledon-injury-exit--art.png",
          "alt": "Marble statue of a nude Greek athlete coiled at the moment of hurling the discus, the Townley Discobolus in the British Museum.",
          "credit": "Carole Raddato / Wikimedia Commons (CC BY-SA 2.0)"
        }
      }
    ],
    "rank": 37
  },
  {
    "slug": "ohtani-biceps-injury-all-star",
    "headline": "Ohtani leaves game against Padres with biceps issue and is unlikely to pitch in All-Star Game",
    "overview": "Los Angeles Dodgers two-way star Shohei Ohtani left Friday night's game against the San Diego Padres with a right biceps issue and is now considered unlikely to pitch in the upcoming MLB All-Star Game. Ohtani said he first felt the biceps problem during an at-bat in the sixth inning and was lifted as a precaution; he had allowed three runs over six innings with nine strikeouts on a season-high 110 pitches. He remains penciled into the National League's starting lineup as designated hitter after leading the first phase of fan balloting.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMimgFBVV95cUxPUjBwbXdVakw5cUlka0hxZE5GVUpXR3dwMzFfd0MwaXU1MlRzdlc1UUNmZGZHMjRVcElpTHh0TUNWUG1OaGJKSHUxcG5jNnhKYnljNktOWXFab3ZpQWZ2ZnFBYTZBbkF3T09pRWFYX01lVnA1X2RGTG5vaE9aVnpVUFZPX29WQ3lDb3ZsT2lSV1I0Y0djWUFBaFNR?oc=5"
      },
      {
        "name": "MLB.com",
        "href": "https://www.mlb.com/news/shohei-ohtani-unlikely-to-pitch-in-2026-all-star-game"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-04",
    "image": {
      "src": "/covers/ohtani-biceps-injury-all-star.png",
      "alt": "Los Angeles Dodgers two-way star Shohei Ohtani at bat during a 2024 game.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 4 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Milo of Croton, the strongman undone by his own sinews",
        "excerpt": "The story has it that he came across in the land of Crotona a tree-trunk that was drying up; wedges were inserted to keep the trunk apart. Milo in his pride thrust his hands into the trunk, the wedges slipped, and Milo was held fast by the trunk until the wolves—a beast that roves in vast packs in the land of Crotona—made him their prey.",
        "source": "Pausanias, Description of Greece 6.14 (trans. W. H. S. Jones)",
        "href": "https://myths.uvic.ca/PAUS1-6.html"
      },
      {
        "category": "historical",
        "title": "Theagenes of Thasos, the boxer who also conquered the pancratium",
        "excerpt": "At the Festival following this, Theagenes was the winner in the pancratium. The total number of crowns that he won was one thousand four hundred.",
        "source": "Pausanias, Description of Greece 6.11 (trans. W. H. S. Jones)",
        "href": "https://myths.uvic.ca/PAUS1-6.html"
      },
      {
        "category": "literary",
        "title": "Achilles and the twofold fate of the peerless warrior",
        "excerpt": "For my mother the goddess, silver-footed Thetis, telleth me that twofold fates are bearing me toward the doom of death: if I abide here and war about the city of the Trojans, then lost is my home-return, but my renown shall be imperishable; but if I return home to my dear native land, lost then is my glorious renown, yet shall my life long endure, neither shall the doom of death come soon upon me.",
        "source": "Homer, Iliad 9 (trans. A. T. Murray)",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Hom.+Il.+9.410&fromdoc=Perseus:text:1999.01.0134"
      },
      {
        "category": "literary",
        "title": "Samson, the strongman whose strength departs",
        "excerpt": "And she said, The Philistines be upon thee, Samson. And he awoke out of his sleep, and said, I will go out as at other times before, and shake myself. And he wist not that the LORD was departed from him.",
        "source": "The Bible, Judges 16 (King James Version)",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Judges"
      },
      {
        "category": "artistic",
        "title": "Handel's oratorio of the fallen champion of Israel",
        "excerpt": "Handel's 1743 oratorio dramatizes the blinded, shorn hero at his lowest ebb, the mightiest of men reduced to grinding at a Philistine mill, before summoning one final surge of ruinous strength. Its choruses swell from lament to triumphant blaze, mourning the fragility of a body that was once its people's whole defense. In the music the strongman's failing sinew and his last, fatal exertion become a meditation on greatness spent.",
        "source": "IMSLP: Samson, HWV 57 (Handel, George Frideric)",
        "href": "https://imslp.org/wiki/Samson,_HWV_57_(Handel,_George_Frideric)"
      },
      {
        "category": "artistic",
        "title": "The Dying Gaul, the champion brought low by a wound",
        "excerpt": "The Roman marble copy of a lost Hellenistic bronze shows a mortally wounded warrior sinking onto his shield, the strength draining from a magnificent athletic body. Every muscle is rendered in perfect vigor even as a single wound below the ribs proves fatal, the hero's greatness and his fragility carved into the same stone. He props himself on one failing arm, a floodlit portrait of physical excellence undone in an instant.",
        "source": "The Dying Gaul, Capitoline Museums, Rome (Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Dying_Gaul.jpg",
        "image": {
          "src": "/covers/ohtani-biceps-injury-all-star--art.png",
          "alt": "Ancient marble sculpture of a nude wounded warrior collapsing onto his shield, propped on one arm.",
          "credit": "BeBo86, CC BY-SA 3.0, via Wikimedia Commons"
        }
      }
    ],
    "rank": 38
  },
  {
    "slug": "ricardo-leal-hempcrete-coop",
    "headline": "Ricardo Leal completes a hempcrete and timber chicken coop beside a Portuguese home",
    "overview": "Portuguese architect Ricardo Leal has completed Pestana Chicken Coop, a compact hen-house built from hempcrete and timber on a gently sloping, moss-covered site in São Pedro do Sul, Portugal. Raised on slender timber stilts to avoid disturbing the ground, it combines an open run, nesting boxes and an enclosed roosting area beneath two opposing corrugated roofs. Informed by Walter Segal's self-build timber method, Leal designed it to argue that 'even the most modest structures deserve careful thought'.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Dezeen",
        "href": "https://www.dezeen.com/2026/07/04/ricardo-leal-pestana-chicken-coop/"
      },
      {
        "name": "Ricardo Leal — architect's studio portfolio",
        "href": "https://cargocollective.com/ricardoleal"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-04",
    "image": {
      "src": "/covers/ricardo-leal-hempcrete-coop.png",
      "alt": "Pestana Chicken Coop by Ricardo Leal — a small hempcrete and timber hen-house raised on slender stilts beside a rustic Portuguese home.",
      "credit": "Dezeen"
    },
    "edition": "Evening Edition · 4 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Vitruvius, The Ten Books on Architecture, Book II",
        "excerpt": "Some made them of green boughs, others dug caves on mountain sides, and some, in imitation of the nests of swallows and the way they built, made places of refuge out of mud and twigs.",
        "source": "Vitruvius, The Ten Books on Architecture (trans. M. H. Morgan), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/20239/20239-h/20239-h.htm"
      },
      {
        "category": "historical",
        "title": "Varro, On Farming (Rerum Rusticarum), Book III",
        "excerpt": "In front of it, as I said, should be an enclosed yard, in which they may run during the daytime and dust themselves.",
        "source": "Varro, Rerum Rusticarum III.9 (Loeb translation), LacusCurtius (University of Chicago)",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Varro/de_Re_Rustica/3*.html"
      },
      {
        "category": "literary",
        "title": "Henry David Thoreau, Walden, 'Economy'",
        "excerpt": "Near the end of March, 1845, I borrowed an axe and went down to the woods by Walden Pond, nearest to where I intended to build my house, and began to cut down some tall, arrowy white pines, still in their youth, for timber.",
        "source": "Thoreau, Walden, Project Gutenberg",
        "href": "https://www.gutenberg.org/files/205/205-h/205-h.htm"
      },
      {
        "category": "literary",
        "title": "Virgil, Georgics, Book II",
        "excerpt": "Oh! all too happy tillers of the soil,\nCould they but know their blessedness, for whom\nFar from the clash of arms all-equal earth\nPours from the ground herself their easy fare!",
        "source": "Virgil, The Georgics, Project Gutenberg",
        "href": "https://www.gutenberg.org/files/232/232-h/232-h.htm"
      },
      {
        "category": "artistic",
        "title": "Beethoven, Symphony No. 6 in F major 'Pastoral', Op. 68",
        "excerpt": "Beethoven's Sixth Symphony translates a country walk into sound — from the cheerful feelings on arriving in the fields, to the murmuring 'Scene by the Brook', to the shepherds' grateful hymn after the storm. Its unhurried, rustic warmth is the aural cousin of Leal's small coop: ordinary rural life rendered with the utmost care. The music dignifies humble farmyard existence exactly as the architect dignifies a modest agricultural building.",
        "source": "IMSLP: Symphony No.6, Op.68 (Beethoven, Ludwig van)",
        "href": "https://imslp.org/wiki/Symphony_No.6,_Op.68_(Beethoven,_Ludwig_van)"
      },
      {
        "category": "artistic",
        "title": "Jan Steen, 'The Poultry Yard' (1660)",
        "excerpt": "In Jan Steen's sunlit farmyard a young girl feeds a motley flock of hens, doves and chicks beside the weathered timber of a country estate, offering milk to a lamb at her side. The painting finds nobility in the humble poultry yard — the same rural world Leal's coop is built to serve. Rustic outbuildings and clucking fowl become, under Steen's brush, a scene worthy of a formal portrait.",
        "source": "Jan Steen, The Poultry Yard, Mauritshuis, The Hague",
        "href": "https://www.mauritshuis.nl/en/our-collection/artworks/166-portrait-of-jacoba-maria-van-wassenaer-1654-1683-known-as-the-poultry-yard",
        "image": {
          "src": "/covers/ricardo-leal-hempcrete-coop--art.png",
          "alt": "A young girl in a poultry yard feeding hens, doves and chicks beside rustic farm buildings, giving milk to a lamb.",
          "credit": "Jan Steen, The Poultry Yard, 1660, Mauritshuis, The Hague (public domain, via Wikimedia Commons)"
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
