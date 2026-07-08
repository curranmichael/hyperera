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
// the Afternoon Edition of 7 July 2026 (ranks 1-13) leads with its hero story,
// followed by the Morning Edition of 7 July 2026 and the Evening Edition of 6 July 2026.
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
      "slug": "us-strikes-iran-hormuz-sanctions",
      "headline": "US launches fresh strikes on Iran and reinstates oil sanctions after three ships attacked in the Strait of Hormuz",
      "overview": "US Central Command said American forces struck targets in Iran early on July 8, 2026 after three vessels, including an LNG carrier and oil tankers, were attacked in the Strait of Hormuz. Washington simultaneously revoked a permit for Iranian oil sales and reinstated sanctions, blaming Tehran for the shipping attacks. The strikes raised fears that a fragile truce between the two sides was unravelling, and oil prices climbed as markets braced for wider disruption to the world's most important chokepoint for crude.",
      "genre": "Conflict",
      "sources": [
        {
          "name": "AP News",
          "href": "https://news.google.com/rss/articles/CBMiigFBVV95cUxOT2tfRFIyMHM3Y3R0UHRSQ0xwNEdNX2pjVUV5QkFGZk4yLUpVeU9RN0RHLXpUYU5UMzVIZkNwOWV4Q2dKTnJYZVl6UzZadkxHYUVYNmUzYWxoUEo1S2pPRUkxWmFsMHhadUYyams3ME5TOTlVSHhuTmgtRVA4NGo1NlJIOF9ZOUU2dGc?oc=5"
        },
        {
          "name": "BBC News",
          "href": "https://www.bbc.co.uk/news/articles/cwykq59jwpvo"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-08",
      "image": {
        "src": "/covers/us-strikes-iran-hormuz-sanctions.png",
        "alt": "A large oil tanker at sea at dusk with a column of dark smoke and orange flame rising from its deck across a narrow strait, hazy arid coastline beyond",
        "credit": "AI-generated"
      },
      "lead": true,
      "edition": "Morning Edition · 8 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Xerxes scourges the Hellespont (Herodotus, Histories, Book 7)",
          "excerpt": "So when Xerxes heard of it he was full of wrath, and straightway gave orders that the Hellespont should receive three hundred lashes, and that a pair of fetters should be cast into it. ... It is certain that he commanded those who scourged the waters to utter, as they lashed them, these barbarian and wicked words: 'Thou bitter water, thy lord lays on thee this punishment because thou hast wronged him without a cause, having suffered no evil at his hands. Verily King Xerxes will cross thee, whether thou wilt or no. Well dost thou deserve that no man should honour thee with sacrifice; for thou art of a truth a treacherous and unsavoury river.'",
          "source": "Herodotus, The History (trans. George Rawlinson), Book 7 — Wikisource",
          "href": "https://en.wikisource.org/wiki/The_History_of_Herodotus_(Rawlinson)/Book_7"
        },
        {
          "category": "historical",
          "title": "The Suez Crisis, 1956 — seizing and fighting over a strategic waterway",
          "excerpt": "On July 26, 1956, Egyptian President Gamal Abdel Nasser announced the nationalization of the Suez Canal Company ... Israeli forces attacked across Egypt's Sinai Peninsula on October 29, 1956, advancing to within 10 miles of the Suez Canal. Under the pretext of protecting the Canal from the two belligerents, Britain and France landed troops of their own a few days later.",
          "source": "U.S. Department of State, Office of the Historian — \"The Suez Crisis, 1956\" (public domain, U.S. government)",
          "href": "https://history.state.gov/milestones/1953-1960/suez"
        },
        {
          "category": "literary",
          "title": "Aeschylus, The Persians — the Persian fleet trapped in the narrows of Salamis",
          "excerpt": "Awhile our stream of ships / Held onward, till within the narrowing creek / Our jostling vessels were together driven, / And none could aid another: each on each / Drave hard their brazen beaks, or brake away / The oar-banks of each other, stem to stern",
          "source": "Aeschylus, The Persians (trans. E. D. A. Morshead, Four Plays of Aeschylus, 1908) — Wikisource",
          "href": "https://en.wikisource.org/wiki/Four_Plays_of_Aeschylus_(1908)_Morshead/Persians"
        },
        {
          "category": "literary",
          "title": "Homer, The Odyssey, Book XII — the deadly strait of Scylla and Charybdis",
          "excerpt": "Close by, a rock of less enormous height / Breaks the wild waves, and forms a dangerous strait; ... Thrice in her gulfs the boiling seas subside, / Thrice in dire thunders she refunds the tide.",
          "source": "Homer, The Odyssey (trans. Alexander Pope, 1725–26), Book XII — Wikisource",
          "href": "https://en.wikisource.org/wiki/Odyssey_(Pope)/Book_12"
        },
        {
          "category": "artistic",
          "title": "Wilhelm von Kaulbach, Die Seeschlacht bei Salamis (The Sea Battle of Salamis)",
          "excerpt": "Kaulbach's vast 1868 canvas turns the decisive clash at the narrow strait of Salamis into a swirling, theatrical panorama: Greek triremes ram and board the crowded Persian fleet amid shattered oars, drowning men, and toppling standards, while allegorical figures loom above the smoke. The painting dramatizes the ancient truth that whoever masters a strategic chokepoint at sea masters the fate of empires.",
          "source": "Wilhelm von Kaulbach (1868), oil on canvas, Maximilianeum, Munich — Wikimedia Commons",
          "href": "https://commons.wikimedia.org/wiki/File:Kaulbach,_Wilhelm_von_-_Die_Seeschlacht_bei_Salamis_-_1868.JPG",
          "image": {
            "src": "/covers/us-strikes-iran-hormuz-sanctions--art.png",
            "alt": "A sweeping historical painting of the naval Battle of Salamis: Greek triremes ram and grapple crowded Persian ships in a narrow strait, with warriors fighting hand-to-hand, oars splintering, and drowning men in the churning sea, allegorical figures rising above the battle smoke.",
            "credit": "Wilhelm von Kaulbach, Die Seeschlacht bei Salamis (1868), Maximilianeum, Munich — public domain via Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "Rimsky-Korsakov, Scheherazade, Op. 35 — the sea, the ship, and the fatal rock",
          "excerpt": "Rimsky-Korsakov's 1888 symphonic suite opens with 'The Sea and Sinbad's Ship,' its surging strings and a solo violin evoking a vessel riding vast swells. In the finale the music builds to a storm-lashed climax as the ship is dashed to pieces on a cliff surmounted by a bronze warrior — a vivid musical image of ships driven to destruction in perilous waters, echoing the danger that stalks a contested strait.",
          "source": "Nikolai Rimsky-Korsakov, Scheherazade, Op. 35 (1888) — IMSLP (Petrucci Music Library)",
          "href": "https://imslp.org/wiki/Scheherazade,_Op.35_(Rimsky-Korsakov,_Nikolay)"
        }
      ],
      "rank": 1
    },
    {
      "slug": "hamas-dissolves-gaza-government",
      "headline": "Hamas dissolves its Gaza government and hands power to a UN-backed committee",
      "overview": "Hamas announced on July 7, 2026 that it was dissolving the administrative government it has run in the Gaza Strip and transferring authority to a United Nations-backed committee of technocrats. The move, part of a broader post-war arrangement for the territory, is intended to open the way for reconstruction and international aid. It marks the most significant change to Gaza's governance since Hamas seized control there in 2007.",
      "genre": "Politics",
      "sources": [
        {
          "name": "AP News",
          "href": "https://news.google.com/rss/articles/CBMiqAFBVV95cUxNQW81TnNaY1YwT3NlaUtUODNiS1hzU3pTbTdGNUlhWl9DQ0M3NHllS2R2bDRCZGpRWllYS3loRDZ6RklsbHRiYS1EbFBXRnBxUVpsNlhaVDJzX1FON2VPU0NVTHd6bXhfQXpsaWZXdmx6a00xLURKNUR3QUpUcDVhay1FUnJ3ZFVnUGxoRzkxWmVHSm5aSS0zN25EUXZ6RjhJT1ZjRjlJQlY?oc=5"
        },
        {
          "name": "Google News",
          "href": "https://news.google.com/rss/search?q=Hamas%20dissolves%20Gaza%20government%20UN-backed%20committee&hl=en-US&gl=US&ceid=US:en"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-08",
      "image": {
        "src": "/covers/hamas-dissolves-gaza-government.png",
        "alt": "An empty circular legislative chamber in dim light, curved tiers of vacant seats ringing a central speaker's desk beneath a domed ceiling, the seat of government stilled and deserted",
        "credit": "AI-generated"
      },
      "edition": "Morning Edition · 8 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Cincinnatus surrenders the dictatorship (458 BC)",
          "excerpt": "On the sixteenth day Quinctius surrendered the dictatorship which he had received for six months.",
          "source": "Livy, The History of Rome, Book 3, ch. 29 (Loeb/Harvard translation, 1922) via Perseus Digital Library, Tufts University",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0153:book=3:chapter=29"
        },
        {
          "category": "historical",
          "title": "Napoleon's farewell to the Old Guard after his abdication (1814)",
          "excerpt": "Soldiers, I bid you farewell. For twenty years that we have been together your conduct has left me nothing to desire. ... Be faithful, then, to your new king, be obedient to your new commanders, and desert not our beloved country.",
          "source": "Napoleon I's speech following his abdication, to his soldiers at Fontainebleau (20 April 1814), Wikisource",
          "href": "https://en.wikisource.org/wiki/Napoleon_I's_speech_following_his_abdication,_to_his_soldiers_at_Fontainebleau"
        },
        {
          "category": "literary",
          "title": "King Richard II lays down the crown (Shakespeare)",
          "excerpt": "Now mark me how I will undo myself: I give this heavy weight from off my head, And this unwieldy sceptre from my hand, The pride of kingly sway from out my heart; With mine own tears I wash away my balm, With mine own hands I give away my crown,",
          "source": "William Shakespeare, King Richard II, Act IV, Scene 1 (Yale edition, 1921), Wikisource",
          "href": "https://en.wikisource.org/wiki/Richard_II_(1921)_Yale/Text/Act_IV"
        },
        {
          "category": "literary",
          "title": "The passing of Arthur and the changing of the order (Tennyson)",
          "excerpt": "The old order changeth, yielding place to new, And God fulfils himself in many ways, Lest one good custom should corrupt the world.",
          "source": "Alfred, Lord Tennyson, Idylls of the King: The Passing of Arthur, Wikisource",
          "href": "https://en.wikisource.org/wiki/Idylls_of_the_King/The_Passing_of_Arthur"
        },
        {
          "category": "artistic",
          "title": "General George Washington Resigning His Commission (John Trumbull, 1824)",
          "excerpt": "Trumbull's vast Rotunda canvas freezes the moment a victorious commander gives power back rather than keeps it: Washington stands before the Congress at Annapolis in December 1783 and returns the commission that made him head of the army. The composition places the civilian assembly above the lone general, dramatizing authority handed upward to a governing body. Trumbull called the scene one of the highest moral lessons ever given to the world.",
          "source": "John Trumbull, General George Washington Resigning His Commission (1824), United States Capitol Rotunda; File page on Wikimedia Commons",
          "href": "https://commons.wikimedia.org/wiki/File:General_George_Washington_Resigning_his_Commission.jpg",
          "image": {
            "src": "/covers/hamas-dissolves-gaza-government--art.png",
            "alt": "Painting of George Washington standing before the seated Continental Congress at Annapolis, handing back a document as he resigns his military commission.",
            "credit": "John Trumbull, General George Washington Resigning His Commission (1824), United States Capitol Rotunda — public domain via Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "Haydn's 'Farewell' Symphony No. 45 (1772)",
          "excerpt": "In the finale's closing Adagio the players fall silent one by one, blow out their candles, and leave the stage until only two violins remain, a musical dramatization of stepping aside and departure. Haydn devised the gradual walk-off to signal to Prince Esterhazy that his musicians longed to go home. The work endures as sound's most literal image of relinquishing one's place and letting the room empty out.",
          "source": "Joseph Haydn, Symphony No. 45 in F-sharp minor, Hob.I:45 ('Farewell'), full scores at IMSLP (public domain)",
          "href": "https://imslp.org/wiki/Symphony_No.45_in_F-sharp_minor,_Hob.I:45_(Haydn,_Joseph)"
        }
      ],
      "rank": 2
    },
    {
      "slug": "messi-argentina-egypt-world-cup-quarters",
      "headline": "Messi inspires Argentina to a 3-2 comeback over Egypt to reach the World Cup quarter-finals",
      "overview": "Lionel Messi led Argentina to a dramatic 3-2 comeback victory over Egypt on July 7, 2026, sending the defending champions into the World Cup quarter-finals. Trailing during the match, Argentina rallied behind an emotional performance from Messi, who was in tears at the final whistle. Egypt's coach bitterly criticised the refereeing and turned his back on the tournament after the loss.",
      "genre": "Culture",
      "sources": [
        {
          "name": "AP News",
          "href": "https://news.google.com/rss/articles/CBMilgFBVV95cUxPV1dfb1lPMEtRajZmSzgtUEFmZUswNGVyeklkTXFZRGdLc3ZTelBpcDBCbURkdFpfcXpBR3d3TGFEU1NMaHpTSU4wbWJvRFhvVVZ1TEFLS1RtNjg1M1duYnJidTRZaV91MHpVanFWeDBTZXdwbXBRRl9pVHhxQ3pkUnJnTUsybFF2VXowWHFHbmhKaVJ5TkE?oc=5"
        },
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMipAFBVV95cUxPMGpjZnJzSUZvQ082ZkhhYkhORmtRckhkTTQ4bUgtVTdKalRnRnpneDBTR2F1WGk5MVZERV9NQUpmSkhycDZJVFdzSDhXSGxteGVVcG5ibjdLZkZZRWQzLU1vSkFTejkwSTVGT2VCWDd3THRoMnItYV9iME1uQzdCdUxJUXd1WUlsZXlWNGUwX1ZHbzNOR0NPUDVjakxneTZKT2tDcQ?oc=5"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-08",
      "image": {
        "src": "/covers/messi-argentina-egypt-world-cup-quarters.png",
        "alt": "A floodlit football stadium at night seen from high in the stands, a brilliant green pitch far below ringed by tiers of blurred spectators",
        "credit": "AI-generated"
      },
      "edition": "Morning Edition · 8 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Milo of Croton, six-time Olympic champion of the ancient games",
          "excerpt": "\"He was six times crowned at the Olympic games and six times at the Pythian for wrestling\" ... \"famous throughout the civilized world for his feats of strength—such as carrying an ox on his shoulders through the stadium at Olympia.\" The wrestler of Croton became the ancient world's byword for the veteran champion whose glory outlasts a single contest.",
          "source": "1911 Encyclopaedia Britannica, \"Milo\" (Wikisource, public domain)",
          "href": "https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Milo"
        },
        {
          "category": "historical",
          "title": "William Marshal, the greatest knight, triumphant in old age at Lincoln (1217)",
          "excerpt": "In his youth he won renown across Christendom in the lists, \"winning universal admiration by his prowess in tournaments, and rising steadily in his master's favour.\" Decades later, though \"he accepted the office of regent with some reluctance, on the score of his own great age,\" the aged Marshal led the royal army to its decisive victory at the battle of Lincoln, the veteran champion's last great effort.",
          "source": "Dictionary of National Biography, 1885-1900, \"Marshal, William (d.1219)\" (Wikisource, public domain)",
          "href": "https://en.wikisource.org/wiki/Dictionary_of_National_Biography,_1885-1900/Marshal,_William_(d.1219)"
        },
        {
          "category": "literary",
          "title": "The aging boxer Entellus rallies to defeat young Dares (Aeneid, Book V)",
          "excerpt": "At the funeral games the veteran Entellus, once beaten to the ground, springs up and overwhelms the younger man: \"Dauntless he rose, and to the fight return'd; / With shame his glowing cheeks, his eyes with fury burn'd.\" ... \"He lays on load with either hand, amain, / And headlong drives the Trojan o'er the plain.\"",
          "source": "Virgil, Aeneid, Book 5, trans. John Dryden (Perseus Digital Library, Tufts)",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0052:book=5"
        },
        {
          "category": "literary",
          "title": "Tennyson's aged Ulysses vows one last heroic striving",
          "excerpt": "\"Tho' much is taken, much abides; and tho' / We are not now that strength which in old days / Moved earth and heaven; that which we are, we are; / One equal temper of heroic hearts, / Made weak by time and fate, but strong in will / To strive, to seek, to find, and not to yield.\"",
          "source": "Alfred, Lord Tennyson, \"Ulysses\" (Wikisource, public domain)",
          "href": "https://en.wikisource.org/wiki/Ulysses_(Tennyson)"
        },
        {
          "category": "artistic",
          "title": "Panathenaic prize amphora with a foot-race of athletes (Euphiletos Painter, ca. 530 BC)",
          "excerpt": "On the black-figure prize vase awarded at the Panathenaic games, a line of nude runners strains forward in a foot-race, bodies lunging in unison toward the finish. Painted about 530 BC by the Euphiletos Painter, the amphora once brimmed with the olive oil given to the victor, an emblem of contest and athletic glory that has outlasted twenty-five centuries.",
          "source": "Terracotta Panathenaic prize amphora, Metropolitan Museum of Art (accession 14.130.12), Wikimedia Commons (CC0 / public domain)",
          "href": "https://commons.wikimedia.org/wiki/File:Terracotta_Panathenaic_prize_amphora_MET_DP245711.jpg",
          "image": {
            "src": "/covers/messi-argentina-egypt-world-cup-quarters--art.png",
            "alt": "Black-figure ancient Greek Panathenaic amphora showing a line of nude male athletes running a foot-race",
            "credit": "Euphiletos Painter, Terracotta Panathenaic prize amphora, ca. 530 BC, Metropolitan Museum of Art, New York (accession 14.130.12); image CC0 / public domain via Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "Handel, \"See, the Conqu'ring Hero Comes\" from Judas Maccabaeus (HWV 63)",
          "excerpt": "\"See, the conqu'ring hero comes! Sound the trumpets, beat the drums!\" Handel's exultant chorus, sung to greet the returning champion, has become the archetypal music of triumph, its rising acclamation swelling as the victor is welcomed home in glory.",
          "source": "George Frideric Handel, Judas Maccabaeus, HWV 63 (IMSLP / Petrucci Music Library, public domain)",
          "href": "https://imslp.org/wiki/Judas_Maccabaeus,_HWV_63_(Handel,_George_Frideric)"
        }
      ],
      "rank": 3
    },
    {
      "slug": "manhattan-highrise-columns-buckle",
      "headline": "Manhattan office-to-residential high-rise evacuated after support columns buckle",
      "overview": "Residents were evacuated from a Manhattan high-rise on July 7, 2026 after structural support columns buckled in the building, which was being converted from offices into apartments. Engineers moved to stabilise the tower while the city investigated the failure. The incident drew fresh scrutiny of the rapid wave of office-to-residential conversions reshaping New York's skyline.",
      "genre": "Science",
      "sources": [
        {
          "name": "AP News",
          "href": "https://news.google.com/rss/articles/CBMinAFBVV95cUxNdUVwSTVQeG9PbkhHcWhlR3FhaWxqVjRXVVAxdFZZT2xuWS1OdW9rX2ZpbnFyVjNRTXF2S1ZzVE5pTGpBVmdsczVlenRudDdzTW9aQlZHY3FCdm1QaUg4OEZKQUpOdmQ1cXh4cnRMUFVmaUlJMXNEMG9CamJVTkdGUGxBMDR0TTBzV2pKUVg2VXRITy1FSWI3MktfWko?oc=5"
        },
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMinwFBVV95cUxNSDlDVDBiVGRoeEh1WWlpU0IzUnJ3aWZyYldFdkVRRGVBZkI3YzJLVkhScWhsbHZmcEhFLXhpTXlwdHVWRXdaUUVVQ3ZVQ3NrX01qVUJJdlVLcVAtQ0o0VEtVQXRDTzRJV210RGFXcDNwWWNEY09IUkJfLVdBd2dHa0xZeFRGdWgtelNwa24xNFIzMGRVVHlFRlM1MDdWa0U?oc=5"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-08",
      "image": {
        "src": "/covers/manhattan-highrise-columns-buckle.png",
        "alt": "The soaring facade of a half-renovated Manhattan skyscraper at dusk, scaffolding and dark empty windows, a cordon of barriers on the street far below",
        "credit": "AI-generated"
      },
      "edition": "Morning Edition · 8 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "The collapse of the amphitheatre at Fidenae (27 AD)",
          "excerpt": "One Atilius, of the freedman class, having undertaken to build an amphitheatre at Fidena for the exhibition of a show of gladiators, failed to lay a solid foundation and to frame the wooden superstructure with beams of sufficient strength... The building was densely crowded; then came a violent shock, as it fell inwards or spread outwards, precipitating and burying an immense multitude which was intently gazing on the show or standing round.",
          "source": "Tacitus, Annals, Book IV.62 (trans. Church & Brodribb), Perseus Digital Library",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0078:book=4:chapter=62"
        },
        {
          "category": "historical",
          "title": "The buckling of the Quebec Bridge (1907)",
          "excerpt": "The collapse of the Quebec bridge resulted from the failure of the lower chords in the anchor arm near the main pier. The failure of these chords was due to their defective design.",
          "source": "Report of the Royal Commission on the Quebec Bridge Inquiry (1908), Internet Archive",
          "href": "https://archive.org/stream/19071908v42i18p154_0540/19071908v42i18p154_0540_djvu.txt"
        },
        {
          "category": "literary",
          "title": "Edgar Allan Poe, \"The Fall of the House of Usher\"",
          "excerpt": "While I gazed, this fissure rapidly widened—there came a fierce breath of the whirlwind—the entire orb of the satellite burst at once upon my sight—my brain reeled as I saw the mighty walls rushing asunder—there was a long tumultuous shouting sound like the voice of a thousand waters—and the deep and dank tarn at my feet closed sullenly and silently over the fragments of the \"House of Usher.\"",
          "source": "Edgar Allan Poe, Tales of the Grotesque and Arabesque (1840), Wikisource",
          "href": "https://en.wikisource.org/wiki/Tales_of_the_Grotesque_and_Arabesque/Volume_1/The_Fall_of_the_House_of_Usher"
        },
        {
          "category": "literary",
          "title": "Henrik Ibsen, \"The Master Builder\"",
          "excerpt": "A human body, with planks and fragments of wood, is vaguely perceived crashing down behind the trees... [MRS. SOLNESS AND THE LADIES.] He is falling! He is falling!... [HILDA, as if in quiet spell-bound triumph.] But he mounted right to the top. And I heard harps in the air... My—my Master Builder!",
          "source": "Henrik Ibsen, The Master Builder (1892), Project Gutenberg etext (Internet Archive)",
          "href": "https://archive.org/stream/themasterbuilder04070gut/mbldr10.txt"
        },
        {
          "category": "artistic",
          "title": "Pieter Bruegel the Elder, \"The Tower of Babel\" (1563)",
          "excerpt": "Bruegel's vast, spiralling Tower of Babel rises story upon story into the clouds, its ramps crowded with masons and cranes—yet the whole edifice already leans, its lower arches cracking and crumbling under the weight of human ambition. The painting is the archetypal image of structural hubris: a proud tower built too high, its failing foundations betraying the pride that raised it.",
          "source": "Pieter Bruegel the Elder, The Tower of Babel (Vienna), oil on panel, 1563, Kunsthistorisches Museum, Vienna; Wikimedia Commons",
          "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_the_Elder_-_The_Tower_of_Babel_(Vienna)_-_Google_Art_Project_-_edited.jpg",
          "image": {
            "src": "/covers/manhattan-highrise-columns-buckle--art.png",
            "alt": "A towering, spiralling Babel-tower of stone rising into the clouds, crowded with construction ramps and cranes, its lower arches already cracked and leaning.",
            "credit": "Pieter Bruegel the Elder, The Tower of Babel (1563), Kunsthistorisches Museum, Vienna. Public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "Richard Wagner, \"Götterdämmerung\" (finale: the fall of Valhalla)",
          "excerpt": "Wagner ends his four-opera Ring cycle with the collapse of Valhalla, the gods' proud fortress-hall, consumed in flame as the Rhine overflows its banks. The orchestra piles up the Valhalla and redemption themes into a towering wall of brass, then lets the whole vast structure fall—an aural image of a mighty edifice, raised on borrowed gold and overreaching pride, crashing down.",
          "source": "Richard Wagner, Götterdämmerung, WWV 86D (full score), IMSLP / Petrucci Music Library",
          "href": "https://imslp.org/wiki/G%C3%B6tterd%C3%A4mmerung,_WWV_86D_(Wagner,_Richard)"
        }
      ],
      "rank": 4
    },
    {
      "slug": "getty-scraps-shutterstock-deal",
      "headline": "Getty abandons its $3.7 billion Shutterstock merger after UK regulator demands a key sale",
      "overview": "Getty Images said on July 7, 2026 that it was scrapping its planned $3.7 billion merger with Shutterstock after Britain's competition regulator required the sale of a key part of the combined business. The two stock-imagery giants had hoped the tie-up would help them compete against a rising tide of AI-generated visuals. The collapse leaves both companies to face the disruption of generative image tools on their own.",
      "genre": "Economy",
      "sources": [
        {
          "name": "AP News",
          "href": "https://news.google.com/rss/articles/CBMingFBVV95cUxONUZMbGYxT3RRY1RLVXo4aEZ2eUlrVV8xTHN2cHVVQmdPUkJSekpoT0RueE0yM3owZldMWXJDdHZvMGxiazFvMzdZZEF6NndoYkZRNi03UEk2QUZpbHFDQk12dkEtdUZDNlZ0RE9lU1JaenYxQmQtR2c4aXgxNlcyNkFqUGJyYUNSUmpOTHRHeXROYnhqNFJfVHdZXzhSZw?oc=5"
        },
        {
          "name": "Google News",
          "href": "https://news.google.com/rss/search?q=Getty%20Shutterstock%20merger%20scrapped%20UK%20antitrust&hl=en-US&gl=US&ceid=US:en"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-08",
      "image": {
        "src": "/covers/getty-scraps-shutterstock-deal.png",
        "alt": "A vast dim archive of framed photographs and light boxes stretching into shadow, two glowing screens dark at a workstation in the foreground",
        "credit": "AI-generated"
      },
      "edition": "Morning Edition · 8 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "The Supreme Court breaks up the Standard Oil combine (1911)",
          "excerpt": "The remedy to be administered in case of a combination violating the Anti-Trust Act is two-fold: first, to forbid the continuance of the prohibited act, and second, to so dissolve the combination as to neutralize the force of the unlawful power.",
          "source": "Standard Oil Co. of New Jersey v. United States (1911), U.S. Supreme Court, syllabus, via Wikisource",
          "href": "https://en.wikisource.org/wiki/Standard_Oil_Co._of_New_Jersey_v._United_States"
        },
        {
          "category": "historical",
          "title": "Hippocleides dances away his marriage (Herodotus, 6th century BC)",
          "excerpt": "Son of Tisander, thou hast danced away thy marriage... Hippocleides does not care!",
          "source": "Herodotus, Histories, Book VI (Swayne translation), via Wikisource",
          "href": "https://en.wikisource.org/wiki/Herodotus_(Swayne)/Chapter_7"
        },
        {
          "category": "literary",
          "title": "The wedding halted at the altar in Jane Eyre",
          "excerpt": "The marriage cannot go on: I declare the existence of an impediment.",
          "source": "Charlotte Bronte, Jane Eyre, Chapter XXVI (c. 1900 W. Nicholson & Sons edition), via Wikisource",
          "href": "https://en.wikisource.org/wiki/Jane_Eyre_(c._1900_W._Nicholson_%26_Sons_edition)/Chapter_XXVI"
        },
        {
          "category": "literary",
          "title": "Two rival houses whose union ends in ruin in Romeo and Juliet",
          "excerpt": "Two households, both alike in dignity, / In fair Verona, where we lay our scene, / From ancient grudge break to new mutiny, / Where civil blood makes civil hands unclean.",
          "source": "William Shakespeare, The Tragedy of Romeo and Juliet (Dowden edition), Prologue, via Wikisource",
          "href": "https://en.wikisource.org/wiki/The_Tragedy_of_Romeo_and_Juliet_(Dowden)/Prologue"
        },
        {
          "category": "artistic",
          "title": "Hogarth's 'The Marriage Settlement' (Marriage A-la-Mode, Plate I)",
          "excerpt": "Hogarth stages a marriage as a cold business merger: a gouty earl points proudly to his family tree while a wealthy alderman scrutinizes the contract that will trade his daughter's dowry for a title. The betrothed couple sit back to back, indifferent and already estranged, as a lawyer whispers to the bride. It is a union arranged entirely for money and rank, and every detail warns that the deal is doomed.",
          "source": "William Hogarth, Marriage A-la-Mode: 1, The Marriage Settlement (c. 1743), National Gallery, London, via Wikimedia Commons",
          "href": "https://commons.wikimedia.org/wiki/File:Marriage_A-la-Mode_1,_The_Marriage_Settlement_-_William_Hogarth.jpg",
          "image": {
            "src": "/covers/getty-scraps-shutterstock-deal--art.png",
            "alt": "Hogarth painting of an arranged-marriage negotiation: an earl displays his pedigree, a merchant examines the contract, and the indifferent betrothed couple sit turned away from each other.",
            "credit": "William Hogarth, Marriage A-la-Mode: 1, The Marriage Settlement (c. 1743), National Gallery, London. Public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "Wagner's Lohengrin: a marriage undone by a forbidden question",
          "excerpt": "Wagner gave the world its most famous wedding processional, the Bridal Chorus, yet the very union it celebrates collapses within the same act. Elsa cannot resist asking the forbidden question of her mysterious knight's name and origin, and the answer forces him to abandon her forever. The grandest of promised unions dissolves the moment an outside condition is tested.",
          "source": "Richard Wagner, Lohengrin, WWV 75 (1850), full score, via IMSLP",
          "href": "https://imslp.org/wiki/Lohengrin,_WWV_75_(Wagner,_Richard)"
        }
      ],
      "rank": 5
    },
    {
      "slug": "illinois-ai-regulation-law",
      "headline": "Illinois governor signs a landmark law regulating artificial intelligence",
      "overview": "Illinois Governor JB Pritzker on July 7, 2026 signed a landmark bill regulating artificial intelligence, aimed at mitigating the risks of automated decision-making in areas such as hiring, health care and consumer services. The law is among the most sweeping state-level AI measures in the United States and sets requirements for transparency and accountability. Supporters called it a model for other states as federal rules lag behind.",
      "genre": "Technology",
      "sources": [
        {
          "name": "AP News",
          "href": "https://news.google.com/rss/articles/CBMivwFBVV95cUxNc2pXc1czOGVZaWNtbnhIRkdkMGVBX3dRSHEwWTJVbzU0UlBXMXYxelplRm9IZHlTZkRhaTUyeHE0RlVDRVYtX2RZSWlkX1Z1d0E0UFRKeTdGTndWVHdEdE9FMk5rOWxrdjZSWlFHaE1uU3JkMlpLT3pjLTVnRDVYUkdXVGwwcWtncGJrbUpTYnI0cC1oX2V2andOM1c0TmZOUzJvQkFobXp0bVF1b3ZLVElONlRQb09mVVozbVBFdw?oc=5"
        },
        {
          "name": "Google News",
          "href": "https://news.google.com/rss/search?q=Pritzker%20Illinois%20AI%20regulation%20law%20signed&hl=en-US&gl=US&ceid=US:en"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-08",
      "image": {
        "src": "/covers/illinois-ai-regulation-law.png",
        "alt": "A grand domed American state capitol at dusk under a brooding sky, a single capped fountain pen resting on a dark desk in the foreground",
        "credit": "AI-generated"
      },
      "edition": "Morning Edition · 8 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "The Code of Hammurabi (c. 1750 BCE): the lawgiver called to bind the strong",
          "excerpt": "then Anu and Bel called by name me, Hammurabi, the exalted prince, who feared God, to bring about the rule of righteousness in the land, to destroy the wicked and the evil-doers; so that the strong should not harm the weak",
          "source": "Code of Hammurabi (prologue), trans. L. W. King, Avalon Project, Yale Law School",
          "href": "https://avalon.law.yale.edu/ancient/hamcode.asp"
        },
        {
          "category": "historical",
          "title": "The Star Chamber Decree Concerning Printing (1637): reining in the printing press",
          "excerpt": "Every Person and Persons that shall hereafter Print or cause to be Printed, any Books, Ballads, Charts, Protraicture, or any other thing or things whatsoever, shall thereunto, or thereon Print, and set his or their own Name or Names, as also the Name or Names of the Author or Authors, Maker or Makers of the same",
          "source": "A Decree of Starre-Chamber Concerning Printing, made July 11, 1637, in Rushworth's Historical Collections, vol. 3 (British History Online)",
          "href": "https://www.british-history.ac.uk/rushworth-papers/vol3/pp306-316"
        },
        {
          "category": "literary",
          "title": "Mary Shelley, Frankenstein (1831): the creation that masters its maker",
          "excerpt": "Remember that I have power; you believe yourself miserable, but I can make you so wretched that the light of day will be hateful to you. You are my creator, but I am your master;—obey!",
          "source": "Mary Shelley, Frankenstein; or, the Modern Prometheus (Revised Edition, 1831), Chapter 20, Wikisource",
          "href": "https://en.wikisource.org/wiki/Frankenstein,_or_the_Modern_Prometheus_(Revised_Edition,_1831)/Chapter_20"
        },
        {
          "category": "literary",
          "title": "Aeschylus, Prometheus Bound (5th c. BCE): chaining the giver of a world-changing power",
          "excerpt": "For your own flower, flashing fire, source of all arts, he has purloined and bestowed upon mortal creatures.",
          "source": "Aeschylus, Prometheus Bound, trans. Herbert Weir Smyth, Perseus Digital Library, Tufts University",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0010%3Acard%3D1"
        },
        {
          "category": "artistic",
          "title": "Rembrandt, Moses with the Tablets of the Law (1659): the archetype of the lawgiver",
          "excerpt": "Rembrandt paints Moses lifting the two heavy stone tablets high above his head, the Hebrew commandments catching the light against deep shadow. It is the founding image of the lawgiver: a mediator descending with a fixed code meant to bind a people to rules greater than any individual will. The tension in his raised arms captures the very act of imposing durable law upon an unruly world, the same instinct now aimed at an unruly new technology.",
          "source": "Rembrandt van Rijn, Moses with the Ten Commandments (1659), Gemäldegalerie, Berlin — Wikimedia Commons File page (public domain)",
          "href": "https://commons.wikimedia.org/wiki/File:Rembrandt_-_Moses_with_the_Ten_Commandments_-_Google_Art_Project.jpg",
          "image": {
            "src": "/covers/illinois-ai-regulation-law--art.png",
            "alt": "Rembrandt's painting of Moses raising the two inscribed stone tablets of the law above his head, illuminated against a dark background.",
            "credit": "Rembrandt van Rijn, Moses with the Ten Commandments (Moses with the Tablets of the Law), 1659, Gemäldegalerie, Berlin. Public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "Paul Dukas, The Sorcerer's Apprentice (1897): the force unleashed that will not stop",
          "excerpt": "Dukas's orchestral scherzo, after Goethe's ballad, sets to music the moment an apprentice animates a broom to do his work, then finds he has no spell to halt it. Bassoons and swelling brass drive the enchanted servant forward relentlessly, flooding the workshop, until only the returning master can command the runaway power back to stillness. It is the definitive musical portrait of summoning an autonomous force one does not yet know how to control.",
          "source": "Paul Dukas, L'apprenti sorcier (The Sorcerer's Apprentice), 1897, full orchestral score, IMSLP (public domain)",
          "href": "https://imslp.org/wiki/L%27apprenti_sorcier_(Dukas,_Paul)"
        }
      ],
      "rank": 6
    },
    {
      "slug": "hungary-halts-state-news-broadcasts",
      "headline": "Hungary halts its public news broadcasts in a bid to dismantle Orban-era propaganda",
      "overview": "Hungary's new government suspended the state broadcaster's news programmes on July 7, 2026, saying the pause was needed to purge years of propaganda produced under former prime minister Viktor Orban. Officials said the public news service would be overhauled before returning to air. Critics of the previous administration had long accused the state media of serving as a mouthpiece for the governing party.",
      "genre": "Politics",
      "sources": [
        {
          "name": "BBC News",
          "href": "https://www.bbc.co.uk/news/articles/cgevwq1pndgo"
        },
        {
          "name": "Google News",
          "href": "https://news.google.com/rss/search?q=Hungary%20public%20news%20broadcasts%20halted%20Orban%20propaganda&hl=en-US&gl=US&ceid=US:en"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-08",
      "image": {
        "src": "/covers/hungary-halts-state-news-broadcasts.png",
        "alt": "A darkened television broadcast studio at night, an empty anchor desk and switched-off cameras under dim standby lights, a single blank monitor glowing pale",
        "credit": "AI-generated"
      },
      "edition": "Morning Edition · 8 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Rome burns the histories of Cremutius Cordus (AD 25)",
          "excerpt": "His books, so the Senators decreed, were to be burnt by the aediles; but some copies were left which were concealed and afterwards published... the persecution of genius fosters its influence; foreign tyrants, and all who have imitated their oppression, have merely procured infamy for themselves and glory for their victims.",
          "source": "Tacitus, Annals 4.35 (trans. Church & Brodribb), Perseus Digital Library, Tufts University",
          "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0078:book=4:chapter=35"
        },
        {
          "category": "historical",
          "title": "Goebbels' Reich Ministry of Propaganda (1933)",
          "excerpt": "Within months of seizing power in 1933, Hitler built a Reich Ministry of Public Enlightenment and Propaganda under Joseph Goebbels to capture the press, radio, film, and every channel of public speech and pump out a single Party message. Newspapers such as Der Stürmer flooded the country with antisemitic lies while independent journalism was throttled. To undo it after 1945 meant dismantling an entire state machine engineered to manufacture consent.",
          "source": "United States Holocaust Memorial Museum, Holocaust Encyclopedia: \"Nazi Propaganda\"",
          "href": "https://encyclopedia.ushmm.org/content/en/article/nazi-propaganda"
        },
        {
          "category": "literary",
          "title": "The Ministry of Truth in Orwell's Nineteen Eighty-Four (1949)",
          "excerpt": "In Orwell's dystopia the Ministry of Truth is the vast bureaucracy that fabricates the news, and Winston Smith's daily labor is to rewrite old newspapers so that the Party's every prediction appears to have come true. Yesterday's facts vanish down the memory hole and are replaced; the past is endlessly re-edited to fit the present lie. It remains the definitive portrait of a state whose news is nothing but manufactured truth.",
          "source": "George Orwell, Nineteen Eighty-Four (full text, Project Gutenberg Australia)",
          "href": "https://gutenberg.net.au/ebooks01/0100021.txt"
        },
        {
          "category": "literary",
          "title": "Milton's Areopagitica against the licensing of the press (1644)",
          "excerpt": "as good almost kill a Man as kill a good Booke; who kills a Man kills a reasonable creature, Gods Image; but hee who destroyes a good Booke, kills reason it selfe... a good Booke is the pretious life-blood of a master spirit, imbalm'd and treasur'd up on purpose to a life beyond life.",
          "source": "John Milton, Areopagitica (1644), Wikisource",
          "href": "https://en.wikisource.org/wiki/Areopagitica_(1644)"
        },
        {
          "category": "artistic",
          "title": "Daumier, \"Ne vous y frottez pas!!\" (Freedom of the Press, 1834)",
          "excerpt": "Daumier's 1834 lithograph plants a burly printer, sleeves rolled, squarely over the words \"Liberte de la presse,\" fists ready, while a toppled King Louis-Philippe is hauled away behind him. Issued as the July Monarchy reimposed censorship on the newspapers, it makes the working pressman the immovable guardian of a free press. Its snarled title is a warning to any regime that would muzzle the news: don't meddle with it.",
          "source": "Wikimedia Commons (National Gallery of Art, Washington, Rosenwald Collection)",
          "href": "https://commons.wikimedia.org/wiki/File:Honor%C3%A9_Daumier,_Ne_vous_y_frottez_pas!!,_1834,_NGA_6131.jpg",
          "image": {
            "src": "/covers/hungary-halts-state-news-broadcasts--art.png",
            "alt": "Lithograph of a defiant printer standing with fists raised over the words 'Liberte de la presse,' as a fallen king is carried off in the background.",
            "credit": "Honore Daumier, 'Ne vous y frottez pas!!' (1834), lithograph, National Gallery of Art, Washington (Rosenwald Collection). Public domain (CC0)."
          }
        },
        {
          "category": "artistic",
          "title": "Sibelius, Finlandia, Op. 26 (1899-1900)",
          "excerpt": "Sibelius composed Finlandia in 1899 as the surging finale of his Press Celebrations Music, written for fundraising \"Press Days\" that rallied Finns against the Russian Empire's tightening censorship of their newspapers. To slip past those same censors, the tone poem was sometimes performed under bland disguises such as \"Happy Feelings at the Awakening of Finnish Spring.\" Its defiant brass and serene closing hymn became a wordless anthem for a silenced press reclaiming its voice.",
          "source": "Jean Sibelius, Finlandia, Op. 26 (full orchestral score), IMSLP / Petrucci Music Library",
          "href": "https://imslp.org/wiki/Finlandia,_Op.26_(Sibelius,_Jean)"
        }
      ],
      "rank": 7
    },
    {
      "slug": "russia-refinery-drone-halt",
      "headline": "Russia's largest oil refinery halts processing after a Ukrainian drone attack",
      "overview": "Russia's largest oil refinery suspended processing on July 7, 2026 after a Ukrainian drone strike, according to sources cited by Reuters. The attack was the latest in a campaign targeting the refining infrastructure that funds Russia's war effort. The shutdown added to pressure on global fuel supplies as tensions over energy flows intensified.",
      "genre": "Conflict",
      "sources": [
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMixwFBVV95cUxPd0VnUGZPLW1xRUFGRWNnM0hkZzVHaDVrMWdLZEtmWW1tREZ0MDhURkhQWGJ1RnZ5T1ZVMzFkSlQ2X1NXWHlmNC10NmFfU3RFT3oxeFNqSW51OXFOeS1Wa2hfdWU5Ui1FWk5MUThFWGxlNDFmcDNBMWU4YUVMTVREaU1pajZxUmVWc0hkUnZhendKYl9ISTQxbktJNU1McUN2NWJGblBvSEduenZEME9HTy1lUDIyYUo4SGRDRTgwdnJ3dHRxVHo4?oc=5"
        },
        {
          "name": "Google News",
          "href": "https://news.google.com/rss/search?q=Russia%20largest%20oil%20refinery%20halts%20drone%20attack&hl=en-US&gl=US&ceid=US:en"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-08",
      "image": {
        "src": "/covers/russia-refinery-drone-halt.png",
        "alt": "A sprawling oil refinery at night with a plume of dark smoke and orange flame rising from a cluster of towers and pipework, floodlights glinting on steel",
        "credit": "AI-generated"
      },
      "edition": "Morning Edition · 8 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Sherman's Special Field Orders No. 120 and the March to the Sea (1864)",
          "excerpt": "The army will forage liberally on the country during the march. ... army commanders should order and enforce a devastation more or less relentless according to the measure of such hostility.",
          "source": "William T. Sherman, Special Field Orders No. 120, November 9, 1864 (Civil War Era NC, North Carolina State University)",
          "href": "https://cwnc.omeka.chass.ncsu.edu/items/show/145"
        },
        {
          "category": "historical",
          "title": "Operation Tidal Wave: the bombing of the Ploiesti oil refineries (1943)",
          "excerpt": "On 1 August 1943, 178 American B-24 Liberators swept in at treetop height to strike the nine refineries at Ploiesti, Romania, the critical wellspring of fuel for the Axis war machine. Cracking towers and storage tanks erupted in flame, but the price was staggering: 54 aircraft and nearly 500 airmen failed to return, and the enemy restored much of the output within weeks. The raid crystallized the Allied 'oil campaign' logic that a modern army withers when you burn the fuel that feeds it.",
          "source": "National Museum of the United States Air Force, 'Operation Tidalwave: Ploesti, August 1, 1943'",
          "href": "https://www.nationalmuseum.af.mil/Visit/Museum-Exhibits/Fact-Sheets/Display/Article/1519651/operation-tidalwave-ploesti-august-1-1943/"
        },
        {
          "category": "literary",
          "title": "David and Goliath: the sling stone that fells the giant (1 Samuel 17)",
          "excerpt": "And David put his hand in his bag, and took thence a stone, and slang it, and smote the Philistine in his forehead, that the stone sunk into his forehead; and he fell upon his face to the earth. So David prevailed over the Philistine with a sling and with a stone... but there was no sword in the hand of David.",
          "source": "The Holy Bible, King James Version, 1 Samuel 17:49-50 (Wikisource)",
          "href": "https://en.wikisource.org/wiki/Bible_(King_James)/1_Samuel"
        },
        {
          "category": "literary",
          "title": "Samson burns the Philistines' harvest with firebrands (Judges 15)",
          "excerpt": "And Samson went and caught three hundred foxes, and took firebrands, and turned tail to tail, and put a firebrand in the midst between two tails. And when he had set the brands on fire, he let them go into the standing corn of the Philistines, and burnt up both the shocks, and also the standing corn, with the vineyards and olives.",
          "source": "The Holy Bible, King James Version, Judges 15:4-5 (Wikisource)",
          "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Judges"
        },
        {
          "category": "artistic",
          "title": "J. M. W. Turner, 'The Burning of the Houses of Lords and Commons, October 16, 1834'",
          "excerpt": "Turner watched the Palace of Westminster burn from the banks of the Thames on the night of 16 October 1834 and turned the disaster into a vision of a great seat of power dissolving in fire and reflected light. Flame and smoke tower over the crowd as the stone architecture of authority melts into the glow, the fragility of an established order consumed in a single night.",
          "source": "Philadelphia Museum of Art, via Wikimedia Commons (Google Art Project); artist died 1851, public domain",
          "href": "https://commons.wikimedia.org/wiki/File:Joseph_Mallord_William_Turner,_English_-_The_Burning_of_the_Houses_of_Lords_and_Commons,_October_16,_1834_-_Google_Art_Project.jpg",
          "image": {
            "src": "/covers/russia-refinery-drone-halt--art.png",
            "alt": "A vast conflagration engulfs the Houses of Parliament at night; towering orange flame and smoke rise above a crowd on Westminster Bridge, mirrored in the River Thames.",
            "credit": "J. M. W. Turner, 'The Burning of the Houses of Lords and Commons, October 16, 1834' (c. 1834-35), Philadelphia Museum of Art. Public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "Tchaikovsky, '1812 Overture', Op. 49",
          "excerpt": "Tchaikovsky's 1812 Overture stages the ruin of an invading army in sound: a grand advance carried by the French anthem is gradually overwhelmed, and live cannon fire punctuates its collapse. It is the sonic memory of a campaign undone not by a single battle but by burned cities and severed supply, a great army starved and shattered on the long road home.",
          "source": "Pyotr Ilyich Tchaikovsky, 'The Year 1812', Festival Overture in E-flat major, Op. 49 (1880); full orchestral score, IMSLP (public domain)",
          "href": "https://imslp.org/wiki/1812_Overture,_Op.49_(Tchaikovsky,_Pyotr)"
        }
      ],
      "rank": 8
    },
    {
      "slug": "detroit-velazquez-attribution",
      "headline": "Detroit Institute of Arts attributes a 17th-century portrait to Diego Velazquez",
      "overview": "The director of the Detroit Institute of Arts announced on July 7, 2026 that a 17th-century portrait in the museum's collection has been attributed to the Spanish master Diego Velazquez. The reattribution, based on new technical and stylistic study, elevates a long-overlooked painting to the ranks of one of the greatest portraitists in Western art. The museum said the work would go on prominent display.",
      "genre": "Culture",
      "sources": [
        {
          "name": "Artforum",
          "href": "https://www.artforum.com/news/detroit-director-attributes-portrait-to-diego-velazquez-1234754168/"
        },
        {
          "name": "Google News",
          "href": "https://news.google.com/rss/search?q=Detroit%20Institute%20of%20Arts%20Velazquez%20portrait%20attribution&hl=en-US&gl=US&ceid=US:en"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-08",
      "image": {
        "src": "/covers/detroit-velazquez-attribution.png",
        "alt": "A hushed museum gallery at dusk, a single ornately framed old-master portrait spotlit on a deep-red wall, a polished wooden bench before it, no visitors",
        "credit": "AI-generated"
      },
      "edition": "Morning Edition · 8 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "The Laocoon unearthed in a Roman vineyard, 1506",
          "excerpt": "The Laocoon, which is in the palace of the emperor Titus, is a work to be preferred to all others, either in painting or sculpture.",
          "source": "Pliny the Elder, Natural History (Harper's Dictionary of Classical Antiquities, Perseus Digital Library, Tufts)",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.04.0062%3Aentry%3Dlaocoon-harpers"
        },
        {
          "category": "historical",
          "title": "A Caravaggio found in a Dublin dining room, 1990",
          "excerpt": "For some sixty years the canvas hung in the dining room of the Jesuit house on Leeson Street, dismissed as a copy after Gerrit van Honthorst, a mere follower of the master. When a conservator from the National Gallery of Ireland was asked to clean it, the grime and yellowed varnish lifted to reveal a painting of startling quality, tentatively identified as Caravaggio's long-lost Taking of Christ. Scholarship in the archives of Rome confirmed the sleeper for what it truly was: an autograph masterpiece of 1602, hidden in plain sight.",
          "source": "National Gallery of Ireland, object record for Caravaggio's The Taking of Christ",
          "href": "http://onlinecollection.nationalgallery.ie/objects/2882/the-taking-of-christ"
        },
        {
          "category": "literary",
          "title": "The pearl of great price (Matthew 13:45-46)",
          "excerpt": "Again, the kingdom of heaven is like unto a merchant man, seeking goodly pearls: Who, when he had found one pearl of great price, went and sold all that he had, and bought it.",
          "source": "Gospel of Matthew, King James Version (Wikisource)",
          "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Matthew"
        },
        {
          "category": "literary",
          "title": "Gray's Elegy: the gem in the unfathomed cave",
          "excerpt": "Full many a gem of purest ray serene,\nThe dark unfathom'd caves of ocean bear:\nFull many a flower is born to blush unseen,\nAnd waste its sweetness on the desert air.",
          "source": "Thomas Gray, Elegy Written in a Country Churchyard (Wikisource)",
          "href": "https://en.wikisource.org/wiki/Poems_That_Every_Child_Should_Know/Elegy_Written_in_a_Country_Churchyard"
        },
        {
          "category": "artistic",
          "title": "Velazquez, Las Meninas",
          "excerpt": "Diego Velazquez's Las Meninas gathers the Infanta Margarita, her maids of honour, a dwarf and a dog in the vast dim room of the Alcazar, while the painter himself stands at a great canvas and the king and queen appear only as reflections in a distant mirror. Long recognised as the supreme achievement of the Spanish master, it is the touchstone against which any newly attributed Velazquez must be measured. Every hand and eye of the connoisseur reaches, in the end, toward the certainty of a painting like this one.",
          "source": "Diego Velazquez, Las Meninas (1656), Museo del Prado, via Wikimedia Commons",
          "href": "https://commons.wikimedia.org/wiki/File:Las_Meninas,_by_Diego_Vel%C3%A1zquez,_from_Prado_in_Google_Earth.jpg",
          "image": {
            "src": "/covers/detroit-velazquez-attribution--art.png",
            "alt": "Las Meninas by Diego Velazquez: the Infanta Margarita amid her maids of honour, with the painter at his canvas and the royal couple reflected in a mirror.",
            "credit": "Diego Velazquez, Las Meninas (1656), Museo del Prado. Public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "Bach's St Matthew Passion, silent for a century",
          "excerpt": "After Johann Sebastian Bach's death in 1750 his monumental St Matthew Passion fell into neglect, its manuscript unheard for the better part of a century. In 1829 the young Felix Mendelssohn mounted a celebrated revival in Berlin, restoring the work to public performance and igniting the modern rediscovery of Bach. What had lain overlooked was at last acclaimed as one of the towering masterpieces of Western music.",
          "source": "J. S. Bach, Matthauspassion, BWV 244 (IMSLP / Petrucci Music Library)",
          "href": "https://imslp.org/wiki/Matth%C3%A4uspassion,_BWV_244_(Bach,_Johann_Sebastian)"
        }
      ],
      "rank": 9
    },
    {
      "slug": "23andme-data-breach-payout",
      "headline": "Judge approves a $46.75 million payout for 23andMe data breach victims",
      "overview": "A federal judge on July 7, 2026 approved a $46.75 million settlement for victims of the data breach at the genetic-testing company 23andMe, in which hackers accessed the personal and ancestry information of millions of users. The payout resolves litigation over one of the most sensitive consumer-data failures on record. The case underscored the risks of entrusting DNA data to private companies.",
      "genre": "Technology",
      "sources": [
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMipwFBVV95cUxOTGNxVDMxT3djUXRuQ1cyTk9zX3ZwWTNZNG5kUTdyVm5XTk5iZUxORHlWQTFxeDYxVHc2VktESFF5MlR5OFUxZlZkeEZZVEgtcDhBSEdLUXp4cmlMUnR4M3BxQUZ3S2NoeS1JOTdZeU1RV0VLSEU5aDY1RjZTM0puUER4dG00SVJQT2ZmYkV6aF9OLVJuQWRHZEM4YWlDbEx2U29QVEZqQQ?oc=5"
        },
        {
          "name": "Google News",
          "href": "https://news.google.com/rss/search?q=23andMe%20data%20breach%20settlement%2046.75%20million%20approved&hl=en-US&gl=US&ceid=US:en"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-08",
      "image": {
        "src": "/covers/23andme-data-breach-payout.png",
        "alt": "A glowing double-helix strand of DNA rendered in cold blue light against a dark background, a faint scattering of broken padlock icons dissolving around it",
        "credit": "AI-generated"
      },
      "edition": "Morning Edition · 8 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "The Babington Plot ciphers deciphered (1586)",
          "excerpt": "Believing her coded letters were carried in secret through beer barrels smuggled out of Chartley, Mary, Queen of Scots confided her most dangerous thoughts to Anthony Babington in cipher. But Walsingham's cryptographer Thomas Phelippes intercepted, unsealed and broke every symbol before resealing the letters and passing them on. The private confidence she thought inviolable became the very evidence that condemned her to the block.",
          "source": "The National Archives (UK), 'Ciphers used by Mary Queen of Scots' (SP 53/22)",
          "href": "https://www.nationalarchives.gov.uk/education/resources/elizabeth-monarchy/ciphers-used-by-mary-queen-of-scots/"
        },
        {
          "category": "historical",
          "title": "The Zimmermann Telegram intercepted and decoded (1917)",
          "excerpt": "In January 1917 German Foreign Minister Arthur Zimmermann sent a coded diplomatic cable proposing that Mexico join Germany against the United States in return for American territory. British codebreakers intercepted and decrypted the secret message, and its exposure helped drag the U.S. into the First World War. A communication meant only for trusted eyes, laid bare, changed the fate of nations.",
          "source": "The U.S. National Archives, 'The Zimmermann Telegram'",
          "href": "https://www.archives.gov/education/lessons/zimmermann"
        },
        {
          "category": "literary",
          "title": "Pandora opens the jar — Hesiod, Works and Days",
          "excerpt": "But the woman took off the great lid of the jar with her hands and scattered, all these and her thought caused sorrow and mischief to men. Only Hope remained there in an unbreakable home within under the rim of the great jar, and did not fly out at the door",
          "source": "Hesiod, Works and Days (ll. 90-105), trans. Evelyn-White, Perseus Digital Library",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0132:card=90"
        },
        {
          "category": "literary",
          "title": "The stolen letter's hold — Poe, 'The Purloined Letter'",
          "excerpt": "the disclosure of the document to a third person, who shall be nameless, would bring in question the honor of a personage of most exalted station; and this fact gives the holder of the document an ascendancy over the illustrious personage whose honor and peace are so jeopardized",
          "source": "Edgar Allan Poe, 'The Purloined Letter', in Tales (1845), Wikisource",
          "href": "https://en.wikisource.org/wiki/Tales_(Poe)/The_Purloined_Letter"
        },
        {
          "category": "artistic",
          "title": "Pandora (1896) by John William Waterhouse",
          "excerpt": "Kneeling at the water's edge in the hushed instant before the harm is done, Waterhouse's Pandora lifts the lid of the golden casket, a curl of vapour already escaping into the dusk. Her face is soft with an irresistible, forbidden curiosity, and the light pooling from the box tells us the seal is broken past all recall. It is the frozen threshold moment: the private thing pried open, its contents loosed forever upon the world.",
          "source": "John William Waterhouse, 'Pandora' (1896), oil on canvas, private collection — Wikimedia Commons",
          "href": "https://commons.wikimedia.org/wiki/File:John_William_Waterhouse_-_Pandora,_1896.jpg",
          "image": {
            "src": "/covers/23andme-data-breach-payout--art.png",
            "alt": "A kneeling young woman lifts the lid of an ornate golden casket at a pool's edge as vapour escapes, in John William Waterhouse's 1896 painting Pandora.",
            "credit": "John William Waterhouse (1849-1917), 'Pandora' (1896). Public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "The price of betrayal — Bach, St Matthew Passion, BWV 244",
          "excerpt": "Was wollt ihr mir geben? Ich will ihn euch verraten. ('What will you give me? I will betray him to you.') Judas' bargain, set by Bach for a sum counted out in silver, turns a trusted intimacy into a commodity — the broken confidence given a fixed and mournful price.",
          "source": "J.S. Bach, Matthäuspassion (St Matthew Passion), BWV 244, IMSLP",
          "href": "https://imslp.org/wiki/Matth%C3%A4uspassion,_BWV_244_(Bach,_Johann_Sebastian)"
        }
      ],
      "rank": 10
    },
    {
      "slug": "ioc-lifts-russia-suspension",
      "headline": "IOC lifts Russia's suspension, clearing its athletes to return to international competition",
      "overview": "The International Olympic Committee voted on July 7, 2026 to lift its suspension of Russia, opening the way for Russian athletes and teams to return to international competition. The decision reverses one of the most significant sporting sanctions imposed in recent years. It drew immediate criticism from officials who argued the move was premature.",
      "genre": "Culture",
      "sources": [
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMisgFBVV95cUxPZTdmdWw5cG5FMkhqOFp3dHhRVHFNRnN4OXhFWTJyV3RXVHBZem5jaklycUJreGlqQ2hHZFZ5aFNIOVBOWHpqWWFNNVJmbXZSRHgySkFKRnNTdVItVXNXQzduUTRjampiSjdSaGctVEstclJHNGRjeFhuY3hSNzZQZ2lRUUYyMDlzbWJaX19QMXZKejJNRHQ0VnlwNzllVXNUeDJnLWJQUE54OXhhSHhJU2NB?oc=5"
        },
        {
          "name": "Google News",
          "href": "https://news.google.com/rss/search?q=IOC%20lifts%20Russia%20suspension%20athletes%20return&hl=en-US&gl=US&ceid=US:en"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-08",
      "image": {
        "src": "/covers/ioc-lifts-russia-suspension.png",
        "alt": "Five interlaced Olympic-style rings rendered in muted stone relief on a wall, a long banner of flags hanging still in an empty marble hall",
        "credit": "AI-generated"
      },
      "edition": "Morning Edition · 8 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Sparta barred from the Olympic Games of 420 BC over a broken truce",
          "excerpt": "The Lacedaemonians were excluded from the temple by the Eleans, and thus prevented from sacrificing or contending, for having refused to pay the fine specified in the Olympic law imposed upon them by the Eleans.",
          "source": "Thucydides, History of the Peloponnesian War, Book 5.49 (Crawley translation, Internet Classics Archive)",
          "href": "https://classics.mit.edu/Thucydides/pelopwar.5.fifth.html"
        },
        {
          "category": "historical",
          "title": "South Africa readmitted to the Olympic movement after apartheid",
          "excerpt": "After more than two decades in the wilderness, apartheid South Africa was welcomed back to the Olympic fold. The International Olympic Committee, which had cut ties with the country's whites-only sports establishment, restored recognition on the promise of racially unified teams and the dismantling of apartheid sport. In 1992 a mixed South African squad marched again at Barcelona, a homecoming many hailed and others judged to have outrun the reforms it rewarded.",
          "source": "South African History Online, 'SA is readmitted to the IOC'",
          "href": "https://sahistory.org.za/dated-event/sa-readmitted-ioc"
        },
        {
          "category": "literary",
          "title": "The Return of the Prodigal Son (Gospel of Luke)",
          "excerpt": "And he arose, and came to his father. But when he was yet a great way off, his father saw him, and had compassion, and ran, and fell on his neck, and kissed him... For this my son was dead, and is alive again; he was lost, and is found.",
          "source": "The Gospel According to Luke 15:20-24, King James Version",
          "href": "https://biblehub.com/kjv/luke/15.htm"
        },
        {
          "category": "literary",
          "title": "The recall of Philoctetes, the abandoned archer the Greeks could not win without",
          "excerpt": "There did they leave me when from Chrysa's shore / They bent their fatal course.",
          "source": "Sophocles, Philoctetes (Francklin translation, Internet Classics Archive)",
          "href": "https://classics.mit.edu/Sophocles/philoct.html"
        },
        {
          "category": "artistic",
          "title": "The Return of the Prodigal Son by Rembrandt van Rijn",
          "excerpt": "In Rembrandt's late masterpiece the kneeling, ragged son buries his face in his father's breast while the old man's hands settle gently on his back in wordless pardon. Watching from the shadows, a stern elder brother embodies the doubt that shadows every reconciliation, the question of whether mercy has been extended too soon.",
          "source": "Rembrandt van Rijn, The Return of the Prodigal Son (c. 1668), Hermitage Museum, Saint Petersburg (Wikimedia Commons)",
          "href": "https://commons.wikimedia.org/wiki/File:Rembrandt_Harmensz_van_Rijn_-_Return_of_the_Prodigal_Son_-_Google_Art_Project.jpg",
          "image": {
            "src": "/covers/ioc-lifts-russia-suspension--art.png",
            "alt": "A ragged, kneeling son embraced by his aged father in a dark interior, watched by onlookers, in Rembrandt's painting The Return of the Prodigal Son.",
            "credit": "Rembrandt van Rijn, The Return of the Prodigal Son (c. 1668), Hermitage Museum. Public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "Beethoven's Ninth Symphony and Schiller's 'Ode to Joy'",
          "excerpt": "Seid umschlungen, Millionen! / Diesen Kuss der ganzen Welt! ('Be embraced, ye millions! This kiss is for all the world!'). Beethoven's choral finale sets Schiller's hymn to universal brotherhood, in which all who were estranged are gathered back into a single embrace, the same anthem that played when South Africa returned to the Olympics at Barcelona in 1992.",
          "source": "Ludwig van Beethoven, Symphony No. 9, Op. 125, finale setting Friedrich Schiller's 'An die Freude' (IMSLP)",
          "href": "https://imslp.org/wiki/Symphony_No.9,_Op.125_(Beethoven,_Ludwig_van)"
        }
      ],
      "rank": 11
    },
    {
      "slug": "exxon-q2-profit-windfall-oil",
      "headline": "Exxon signals a second-quarter profit windfall as higher oil prices lift earnings",
      "overview": "ExxonMobil signalled on July 7, 2026 that it expects a windfall in second-quarter profits, driven by higher crude oil prices amid rising geopolitical tension. The disclosure points to a strong bottom line for the world's largest publicly traded oil company. It comes as energy markets remain volatile over conflict in the Middle East and attacks on refining infrastructure.",
      "genre": "Economy",
      "sources": [
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMipAFBVV95cUxPZXlvX2Y4cVBldFJ5ajRsRVpOZkcyd2g0NVV1c3RmOVBPSHAwWkI4Wmt6dWZ3djBUVDNtQ0ZlYjJ1aTZ1akZJMjg4WHprbmxGUmtmdktuelg1eURDY0ctRlBURV8xY1ZKVjB6dGEwMENPdnFXTzlEYnZoTnVMOWxoUVN4cUl3Q1FpR1ZITzJvdEZxOGJBT1pVa3VudjNnT0kyYkVzTA?oc=5"
        },
        {
          "name": "Google News",
          "href": "https://news.google.com/rss/search?q=Exxon%20second%20quarter%20profit%20windfall%20oil%20prices&hl=en-US&gl=US&ceid=US:en"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-08",
      "image": {
        "src": "/covers/exxon-q2-profit-windfall-oil.png",
        "alt": "A silhouetted cluster of oil pumpjacks and storage tanks against a blazing orange sunset, long shadows stretching across a flat industrial plain",
        "credit": "AI-generated"
      },
      "edition": "Morning Edition · 8 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Cleomenes of Naucratis corners Egypt's grain in a famine (c. 320s BCE)",
          "excerpt": "at a time when there was some scarcity in the land, but elsewhere a grievous famine, he forbade the export of grain. On the local governors representing that if there were no export of grain they would be unable to pay in their taxes, he allowed the export, but laid a heavy duty on the corn.",
          "source": "Pseudo-Aristotle, Oeconomica, Book II (Perseus Digital Library, Tufts)",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0048:book=2:section=1352a"
        },
        {
          "category": "historical",
          "title": "Ida Tarbell exposes the fortune Standard Oil wrung from rivals (1904)",
          "excerpt": "the whole system of discrimination has been nothing but violence, and those who have profited by it cannot complain if the curing of the evils they have wrought bring hardship in turn on them.... As for the ethical side, there is no cure but in an increasing scorn of unfair play—an increasing sense that a thing won by breaking the rules of the game is not worth the winning.",
          "source": "Ida M. Tarbell, The History of the Standard Oil Company (Project Gutenberg)",
          "href": "https://www.gutenberg.org/cache/epub/60692/pg60692.txt"
        },
        {
          "category": "literary",
          "title": "The Parable of the Rich Fool who builds bigger barns (Luke 12:16-21)",
          "excerpt": "And he spake a parable unto them, saying, The ground of a certain rich man brought forth plentifully: And he thought within himself, saying, What shall I do, because I have no room where to bestow my fruits? And he said, This will I do: I will pull down my barns, and build greater; and there will I bestow all my fruits and my goods. And I will say to my soul, Soul, thou hast much goods laid up for many years; take thine ease, eat, drink, and be merry. But God said unto him, Thou fool, this night thy soul shall be required of thee: then whose shall those things be, which thou hast provided? So is he that layeth up treasure for himself, and is not rich toward God.",
          "source": "The Bible, King James Version, Book 42: Luke (Project Gutenberg)",
          "href": "https://www.gutenberg.org/cache/epub/8042/pg8042.txt"
        },
        {
          "category": "literary",
          "title": "Timon of Athens on the corrupting power of gold torn from the earth",
          "excerpt": "Gold? yellow, glittering, precious gold? ... Thus much of this will make black white, foul fair, Wrong right, base noble, old young, coward valiant.",
          "source": "William Shakespeare, Timon of Athens, Act IV, Scene III (Perseus Digital Library, Tufts)",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.03.0055:act=4:scene=3"
        },
        {
          "category": "artistic",
          "title": "Quentin Matsys, The Moneylender and His Wife (1514)",
          "excerpt": "The moneylender bends over his balance, weighing gold coins and pearls, while his wife lets her illuminated prayer book fall open, her eyes drawn from the Virgin and Child to the glint of the scales. Matsys stages the quiet triumph of avarice over devotion, the merchant's attention wholly captured by the wealth accumulating on the table before him.",
          "source": "Wikimedia Commons — File page for Quentin Matsys, The Moneylender and His Wife (1514), Musée du Louvre",
          "href": "https://commons.wikimedia.org/wiki/File:Massysm_Quentin_%E2%80%94_The_Moneylender_and_his_Wife_%E2%80%94_1514.jpg",
          "image": {
            "src": "/covers/exxon-q2-profit-windfall-oil--art.png",
            "alt": "A moneylender weighs gold coins and pearls on a balance while his richly dressed wife, distracted from her devotional book, gazes intently at the gold on the scales.",
            "credit": "Quentin Matsys, The Moneylender and His Wife (1514), oil on panel, Musée du Louvre, Paris. Public domain via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "Richard Wagner, Das Rheingold (WWV 86A) — the cursed hoard of gold",
          "excerpt": "Wagner's music-drama opens in the depths of the Rhine, where the dwarf Alberich renounces love itself to seize the river's gold and forge from it a ring of limitless power. The hoard he heaps up breeds only greed, betrayal, and a curse that destroys everyone who covets it — a fable of riches torn from the earth that poison all who grasp for them.",
          "source": "Richard Wagner, Das Rheingold, WWV 86A (full score) — IMSLP / Petrucci Music Library",
          "href": "https://imslp.org/wiki/Das_Rheingold,_WWV_86A_(Wagner,_Richard)"
        }
      ],
      "rank": 12
    },
    {
      "slug": "china-official-death-sentence-bribes",
      "headline": "China sentences a former official to death for taking $325 million in bribes",
      "overview": "A Chinese court sentenced a former senior official to death on July 7, 2026 for accepting the equivalent of about $325 million in bribes, one of the largest corruption cases in the country in years. The sentence underscored the severity of President Xi Jinping's long-running anti-corruption campaign. Such death sentences in graft cases are often handed down with a two-year reprieve that is typically commuted to life imprisonment.",
      "genre": "Politics",
      "sources": [
        {
          "name": "BBC News",
          "href": "https://www.bbc.co.uk/news/articles/c33y0n1v1xjo"
        },
        {
          "name": "Google News",
          "href": "https://news.google.com/rss/search?q=China%20official%20death%20sentence%20325%20million%20bribes&hl=en-US&gl=US&ceid=US:en"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-08",
      "image": {
        "src": "/covers/china-official-death-sentence-bribes.png",
        "alt": "A vast empty Chinese courtroom at dusk, a raised judicial bench beneath a national emblem in shadow, a single spotlit lectern facing rows of empty seats",
        "credit": "AI-generated"
      },
      "edition": "Morning Edition · 8 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Cicero prosecutes Verres, the plundering governor of Sicily (70 BC)",
          "excerpt": "For I have brought before you a man, by acting justly in whose case you have an opportunity of retrieving the lost credit of your judicial proceedings, of regaining your credit with the Roman people, and of giving satisfaction to foreign nations; a man, the embezzler of the public funds, the petty tyrant of Asia and Pamphylia, the robber who deprived the city of its rights, the disgrace and ruin of the province of Sicily.",
          "source": "Cicero, Against Verres (First Pleading), trans. C. D. Yonge, Wikisource",
          "href": "https://en.wikisource.org/wiki/Against_Verres/First_pleading"
        },
        {
          "category": "historical",
          "title": "Edmund Burke impeaches Warren Hastings for corruption in India (1788)",
          "excerpt": "I impeach Warren Hastings, Esquire, of high crimes and misdemeanors. ... I impeach him in the name of human nature itself, which he has cruelly outraged, injured and oppressed, in both sexes, in every age, rank, situation, and condition of life.",
          "source": "Edmund Burke, At the Trial of Warren Hastings, in The World's Famous Orations, Vol. 6, Wikisource",
          "href": "https://en.wikisource.org/wiki/The_World%27s_Famous_Orations/Volume_6/At_the_Trial_of_Warren_Hastings"
        },
        {
          "category": "literary",
          "title": "Dante's barrators (corrupt officials) boiled in pitch, Inferno Canto XXI",
          "excerpt": "Unto that town, which is well furnished with them. / All there are barrators, except Bonturo; / No into Yes for money there is changed.",
          "source": "Dante Alighieri, Inferno, Canto XXI, trans. Henry Wadsworth Longfellow (1867), Wikisource",
          "href": "https://en.wikisource.org/wiki/Divine_Comedy_(Longfellow_1867)/Volume_1/Canto_21"
        },
        {
          "category": "literary",
          "title": "The Venetian court sentences the greedy schemers in Ben Jonson's Volpone",
          "excerpt": "Let all that see these vices thus rewarded, / Take heart, and love to study 'em! Mischiefs feed / Like beasts, till they be fat, and then they bleed.",
          "source": "Ben Jonson, Volpone, Act V Scene VIII, Wikisource",
          "href": "https://en.wikisource.org/wiki/Volpone/Act_V_Scene_VIII"
        },
        {
          "category": "artistic",
          "title": "Gerard David, The Judgment of Cambyses: the bribe-taking judge flayed alive (1498)",
          "excerpt": "Gerard David's town-hall diptych for Bruges makes an unflinching object lesson of graft: the corrupt Persian judge Sisamnes, who sold his verdicts for money, is seized at his bench and then flayed alive by order of King Cambyses. In the corner his son sits in judgment on a chair upholstered with his father's own skin. Commissioned to warn the city's magistrates, it renders the reckoning for venality as public, exemplary, and terrible.",
          "source": "Gerard David, The Judgment of Cambyses (1498), Groeningemuseum, Bruges — Wikimedia Commons File page",
          "href": "https://commons.wikimedia.org/wiki/File:Het_Oordeel_van_Cambyses,_1498,_Groeningemuseum,_0040035000.jpg",
          "image": {
            "src": "/covers/china-official-death-sentence-bribes--art.png",
            "alt": "Renaissance painting showing the corrupt judge Sisamnes seized at his seat and, in the adjoining panel, flayed alive as punishment for taking bribes.",
            "credit": "Gerard David, The Judgment of Cambyses (1498), Groeningemuseum, Bruges. Public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "Gilbert & Sullivan's The Mikado: 'let the punishment fit the crime' (1885)",
          "excerpt": "My object all sublime / I shall achieve in time— / To let the punishment fit the crime— / The punishment fit the crime.",
          "source": "Arthur Sullivan (music) & W. S. Gilbert (libretto), The Mikado (1885) — score, IMSLP",
          "href": "https://imslp.org/wiki/The_Mikado_(Sullivan,_Arthur)"
        }
      ],
      "rank": 13
    },
    {
      "slug": "le-pen-2027-run-electronic-tag",
      "headline": "French appeals court clears Marine Le Pen to run in 2027 but orders an electronic tag she rejects",
      "overview": "A Paris appeals court on July 7, 2026 upheld Marine Le Pen's conviction for the misuse of European Parliament funds, sentencing her to three years with two suspended and one year to be served at home under an electronic monitor. The court shortened her period of ineligibility to 15 months, technically leaving her free to stand in France's 2027 presidential election. Le Pen, leader of the National Rally, said running while tagged and unable to campaign freely would be impossible, calling the ruling a political trap.",
      "genre": "Politics",
      "sources": [
        {
          "name": "AP News",
          "href": "https://news.google.com/rss/articles/CBMiqgFBVV95cUxQNFgxdFUtbFZTTlhpYldudGlMWU5SamNIQ0p0RUZjR2hEc3NKc2ZJR2F4amF0TGJDalJCdU1zWnRfMlF2X00wUWhqazB4RmFuWDVMOGs2dGxfNFJLNEVHNUlRbGhrQnMwSTVOeC1WclJkakZlRTV5NUJ6VEs1bmpHT3BUZmtrdS1XbWJLUXQxdFYzMGJvRHBnTHU0MDFpQml4VENuMkVXLWMxdw?oc=5"
        },
        {
          "name": "BBC News",
          "href": "https://www.bbc.co.uk/news/articles/cly85qjg45no"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-07",
      "image": {
        "src": "/covers/le-pen-2027-run-electronic-tag.png",
        "alt": "The pale stone facade and tall columns of a French courthouse at dusk, broad empty steps rising to a shadowed portico",
        "credit": "AI-generated"
      },
      "lead": true,
      "edition": "Evening Edition · 7 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Plutarch, Life of Cicero, ch. 33 (translated by Bernadotte Perrin) — on Cicero's exile and recall, 58–57 BC",
          "excerpt": "Thus Cicero came home in the sixteenth month after his exile; and so great was the joy of the cities and the eagerness of men to meet him that what was said by Cicero afterwards fell short of the truth. He said, namely, that Italy had taken him on her shoulders and carried him into Rome.",
          "source": "Perseus Digital Library — Plutarch, Cicero, chapter 33",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:2008.01.0016:chapter%3D33"
        },
        {
          "category": "historical",
          "title": "Napoleon Bonaparte, Proclamation to the Army on his return from Elba, 1 March 1815",
          "excerpt": "In my exile I have heard your voice; I have come back in spite of all obstacles and all dangers. Your general, called to the throne by the choice of the people, and raised on your shields, is restored to you; come and join him.",
          "source": "Wikisource — Napoleon's Addresses, Part V (Return from Elba)",
          "href": "https://en.wikisource.org/wiki/Napoleon's_Addresses/Part_V"
        },
        {
          "category": "literary",
          "title": "Dante Alighieri, Paradiso, Canto XVII (Longfellow translation, 1867) — Cacciaguida foretells Dante's exile",
          "excerpt": "Thou shalt abandon everything beloved\nMost tenderly, and this the arrow is\nWhich first the bow of banishment shoots forth.\nThou shalt have proof how savoureth of salt\nThe bread of others, and how hard a road\nThe going down and up another's stairs.",
          "source": "Wikisource — Divine Comedy (Longfellow 1867), Volume 3, Canto 17",
          "href": "https://en.wikisource.org/wiki/Divine_Comedy_(Longfellow_1867)/Volume_3/Canto_17"
        },
        {
          "category": "literary",
          "title": "William Shakespeare, Coriolanus, Act III, Scene 3 — the banished general turns on the city that cast him out",
          "excerpt": "You common cry of curs! whose breath I hate / As reek o' the rotten fens, whose loves I prize / As the dead carcasses of unburied men / That do corrupt my air, I banish you; / And here remain with your uncertainty! / Let every feeble rumour shake your hearts! / Your enemies, with nodding of their plumes, / Fan you into despair! Have the power still / To banish your defenders; till at length / Your ignorance, which finds not till it feels, / Making not reservation of yourselves, / Still your own foes, deliver you as most / Abated captives to some nation / That won you without blows! Despising, / For you, the city, thus I turn my back: / There is a world elsewhere.",
          "source": "The Complete Works of Shakespeare (MIT), Coriolanus 3.3",
          "href": "https://shakespeare.mit.edu/coriolanus/coriolanus.3.3.html"
        },
        {
          "category": "artistic",
          "title": "John Vanderlyn, Caius Marius Amid the Ruins of Carthage (1807), Fine Arts Museums of San Francisco (de Young)",
          "excerpt": "Seven times consul of Rome, then outlawed and hunted from the city, Gaius Marius sits amid the shattered stones of Carthage — a fallen strongman brooding in exile rather than broken by it. Vanderlyn freezes the moment of humiliation and turns it into a threat: the jaw is set, the eyes burn, and the ruin at his feet reads less as an ending than as a staging ground for return. It is the portrait of an ambition that punishment has confined but not extinguished.",
          "source": "Wikimedia Commons — File:John Vanderlyn - Caius Marius Amid the Ruins of Carthage - Google Art Project.jpg",
          "href": "https://commons.wikimedia.org/wiki/File:John_Vanderlyn_-_Caius_Marius_Amid_the_Ruins_of_Carthage_-_Google_Art_Project.jpg",
          "image": {
            "src": "/covers/le-pen-2027-run-electronic-tag--art.png",
            "alt": "The Roman general Marius seated in exile among the toppled ruins of Carthage, staring defiantly ahead in a dark red cloak.",
            "credit": "John Vanderlyn, Caius Marius Amid the Ruins of Carthage (1807), Fine Arts Museums of San Francisco — public domain via Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "Giuseppe Verdi, Nabucco (1841), Act III chorus \"Va, pensiero\" (Chorus of the Hebrew Slaves)",
          "excerpt": "In Verdi's opera the toppled king Nebuchadnezzar loses his throne and his reason, while his captive people raise the aching lament of \"Va, pensiero\" — a hymn of longing for a lost homeland and lost power. The music makes confinement audible: a whole nation, held under guard, sings itself toward the day of release. Behind the sorrow beats the conviction that no chain is permanent and that what was taken by force can be reclaimed.",
          "source": "IMSLP / Petrucci Music Library — Nabucco (Verdi, Giuseppe), full and vocal scores",
          "href": "https://imslp.org/wiki/Nabucco_(Verdi,_Giuseppe)"
        }
      ],
      "rank": 14
    },
    {
      "slug": "farage-resigns-mp-clacton-byelection",
      "headline": "Nigel Farage quits parliament to force a Clacton by-election amid a party-funding inquiry",
      "overview": "Reform UK leader Nigel Farage announced on July 7, 2026 that he was resigning his Commons seat to fight a by-election in Clacton, seeking to clear his name after press reports about undisclosed gifts and a reported £5 million donation. A parliamentary standards investigation into his finances will be suspended until the vote. Farage, who denied wrongdoing, framed the contest as \"a people vs the establishment by-election.\"",
      "genre": "Politics",
      "sources": [
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMinAFBVV95cUxPMG5WUW54NHJmTjNlRDBZaDNuaGFpd2h0Z1N0NjRxRVFsWUdKOTNUcjFmRl9oNFBjcG0tVmtBTXcwTzVUTHB1NDliSWUzaVoxRHZoNjVWbUVFTVRTLUNUNDZrR242bWdyZDYtdGFsTFpSaHdMWTZmb0JURkdVRFdLcDlfaGlvb2RPNmo3ampkeGlKMFI3b0VubUJYZy0?oc=5"
        },
        {
          "name": "Google News",
          "href": "https://news.google.com/rss/search?q=Nigel%20Farage%20resigns%20MP%20Clacton%20by-election%20Reform%20UK&hl=en-US&gl=US&ceid=US:en"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-07",
      "image": {
        "src": "/covers/farage-resigns-mp-clacton-byelection.png",
        "alt": "A plain wooden ballot box on a bare table beneath a single hanging lamp in a quiet British polling place at dusk",
        "credit": "AI-generated"
      },
      "edition": "Evening Edition · 7 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "The tribune who sought a fresh mandate from the people — Tiberius Gracchus",
          "excerpt": "And now his friends, observing the threats and the hostile combination against him, thought that he ought to be made tribune again for the following year. Once more, therefore, Tiberius sought to win the favour of the multitude by fresh laws...",
          "source": "Plutarch, Life of Tiberius Gracchus 16 (trans. Bernadotte Perrin, Loeb Classical Library, 1921)",
          "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Plutarch/Lives/Tiberius_Gracchus*.html"
        },
        {
          "category": "historical",
          "title": "Wilkes and Liberty: the people return their man against the Commons",
          "excerpt": "the expulsion led to a conflict between the electors of Middlesex, who at once re-elected Wilkes, and the House of Commons, which not only annulled the return, but resolved (17 Feb.) that he 'was and is incapable of being elected a member to serve in this present parliament.'",
          "source": "Dictionary of National Biography, 1885–1900, 'Wilkes, John' (James McMullen Rigg), via Wikisource",
          "href": "https://en.wikisource.org/wiki/Dictionary_of_National_Biography,_1885-1900/Wilkes,_John"
        },
        {
          "category": "literary",
          "title": "Coriolanus begs the plebeians for their 'voices'",
          "excerpt": "Your voices: for your voices I have fought; Watch'd for your voices; for your voices bear Of wounds two dozen odd; battles thrice six I have seen and heard of; for your voices have Done many things, some less, some more your voices: Indeed I would be consul.",
          "source": "William Shakespeare, Coriolanus, Act 2, Scene 3",
          "href": "http://shakespeare.mit.edu/coriolanus/coriolanus.2.3.html"
        },
        {
          "category": "literary",
          "title": "Mark Antony turns the Roman crowd against the establishment",
          "excerpt": "Friends, Romans, countrymen, lend me your ears; I come to bury Caesar, not to praise him. The evil that men do lives after them; The good is oft interred with their bones; So let it be with Caesar.",
          "source": "William Shakespeare, Julius Caesar, Act 3, Scene 2",
          "href": "http://shakespeare.mit.edu/julius_caesar/julius_caesar.3.2.html"
        },
        {
          "category": "artistic",
          "title": "Stump Speaking: the candidate courting the people's votes",
          "excerpt": "A grey-haired orator holds forth from a rough wooden platform while a crowd of farmers and townsmen listens, weighs, and heckles. Bingham paints frontier democracy as a bargain struck in the open air, the politician bending directly to the people over the heads of the seated notables. It is the by-election as ritual: one man appealing past the establishment to the sovereign voice of the electors.",
          "source": "George Caleb Bingham, Stump Speaking (1853), Saint Louis Art Museum — Wikimedia Commons",
          "href": "https://commons.wikimedia.org/wiki/File:George_Caleb_Bingham_-_Stump_Speaking.jpg",
          "image": {
            "src": "/covers/farage-resigns-mp-clacton-byelection--art.png",
            "alt": "A grey-haired politician stands on a raised wooden platform addressing a crowd of townspeople gathered outdoors at an open-air election meeting.",
            "credit": "George Caleb Bingham, Stump Speaking (1853), Saint Louis Art Museum — public domain via Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "Beethoven's Coriolan Overture: the defiant leader against the city",
          "excerpt": "Beethoven's overture opens with hammered unison chords and a storming, restless main theme — the portrait of a proud man set against his own people. A pleading second subject answers, the voice of appeal that would turn him back. The music dramatises exactly the populist's gamble: intransigent defiance and the softer courting of the crowd, warring until the hero's resolve simply drains away.",
          "source": "Ludwig van Beethoven, Coriolan Overture, Op. 62 (1807) — IMSLP",
          "href": "https://imslp.org/wiki/Coriolan,_Op.62_(Beethoven,_Ludwig_van)"
        }
      ],
      "rank": 15
    },
    {
      "slug": "trump-greenland-us-control-nato",
      "headline": "Trump says the US, not Denmark, should control Greenland as he arrives at the NATO summit",
      "overview": "Arriving in Ankara for the NATO summit on July 7, 2026, President Donald Trump renewed his insistence that the United States should control Greenland, calling the Arctic island strategically vital as Russia and China expand their presence there. He argued that Denmark has failed to invest adequately in the territory and repeated that it matters more to American security than to Copenhagen. Trump has previously declined to rule out force to acquire the island but has lately favored a long-term framework agreement.",
      "genre": "Politics",
      "sources": [
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMirAFBVV95cUxPbGdhM0pZQ1VPdjJaZTh4RGpyQjNPV21kbFFXRnlWTk16WUFtZzZ2TWYwVTZxamdQTEhNc3pvUFNycEx3ZEVJZUxqZGlsTFl2N0RqeG5GQkVKVzNsQU96U2lnSUJCUGxNdm1RV2ItU1NNYU1LSE9rOGMzekNLQW81Y1d1cEU3Wl9XMmhmMmRxMnUzYXJYdFFNOWlwUHh6UlNrdGNrdGtBMGgwMU9u?oc=5"
        },
        {
          "name": "Google News",
          "href": "https://news.google.com/rss/search?q=Trump%20Greenland%20United%20States%20control%20Denmark%20NATO%20summit&hl=en-US&gl=US&ceid=US:en"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-07",
      "image": {
        "src": "/covers/trump-greenland-us-control-nato.png",
        "alt": "A stark Arctic coastline of dark rock and drifting sea ice under a pale cold sky, vast and empty",
        "credit": "AI-generated"
      },
      "edition": "Evening Edition · 7 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "The Melian Dialogue (416 BC)",
          "excerpt": "you know as well as we do that right, as the world goes, is only in question between equals in power, while the strong do what they can and the weak suffer what they must.",
          "source": "Thucydides, History of the Peloponnesian War, Book V (Crawley translation)",
          "href": "https://man.fas.org/melian.htm"
        },
        {
          "category": "historical",
          "title": "The Purchase of Alaska, \"Seward's Folly\" (1867)",
          "excerpt": "His Majesty the Emperor of all the Russias agrees to cede to the United States, by this convention, immediately upon the exchange of the ratifications thereof, all the territory and dominion now possessed by his said Majesty on the continent of America and in the adjacent islands.",
          "source": "Treaty concerning the Cession of the Russian Possessions in North America, Article I (1867), Avalon Project, Yale Law School",
          "href": "https://avalon.law.yale.edu/19th_century/treatywi.asp"
        },
        {
          "category": "literary",
          "title": "Ahab and Naboth's Vineyard (1 Kings 21)",
          "excerpt": "And Ahab spake unto Naboth, saying, Give me thy vineyard, that I may have it for a garden of herbs, because it is near unto my house: and I will give thee for it a better vineyard than it. And Naboth said to Ahab, The Lord forbid it me, that I should give the inheritance of my fathers unto thee.",
          "source": "1 Kings 21:2-3, King James Version (public domain)",
          "href": "https://www.biblegateway.com/passage/?search=1%20Kings%2021&version=KJV"
        },
        {
          "category": "literary",
          "title": "The White Man's Burden (1899)",
          "excerpt": "Take up the White Man's burden—\nSend forth the best ye breed—\nGo bind your sons to exile\nTo serve your captives' need;\nTo wait in heavy harness,\nOn fluttered folk and wild—\nYour new-caught, sullen peoples,\nHalf-devil and half-child.",
          "source": "Rudyard Kipling, \"The White Man's Burden\" (1899), first stanza (public domain)",
          "href": "https://americanliterature.com/author/rudyard-kipling/poem/the-white-mans-burden"
        },
        {
          "category": "artistic",
          "title": "American Progress by John Gast (1872)",
          "excerpt": "A luminous, goddess-like figure floats westward across the continent, stringing telegraph wire and trailing settlers, railroads and stagecoaches in her wake. Ahead of her, bison and Native peoples flee into a receding darkness. Painted as pure propaganda for Manifest Destiny, it renders the seizure of a coveted land as something radiant, inevitable and ordained.",
          "source": "John Gast, American Progress (1872), Autry Museum of the American West — public domain via Wikimedia Commons",
          "href": "https://commons.wikimedia.org/wiki/File:American_Progress_(John_Gast_painting).jpg",
          "image": {
            "src": "/covers/trump-greenland-us-control-nato--art.png",
            "alt": "An allegorical female figure in white floats westward over the American plains, leading pioneers, wagons and railroads while bison and Native Americans flee before her.",
            "credit": "John Gast, American Progress (1872), Autry Museum of the American West — public domain via Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "Pomp and Circumstance March No. 1 / \"Land of Hope and Glory\" (1901)",
          "excerpt": "Elgar's broad, swaggering trio melody became the anthem of an empire certain of its own destiny, later fitted with the words \"Wider still and wider shall thy bounds be set.\" Its ceremonial grandeur turns the appetite for ever-expanding borders into something to march to, a sound of confident acquisition dressed as glory.",
          "source": "Edward Elgar, Pomp and Circumstance Marches, Op. 39, No. 1 in D (1901), full score (public domain), IMSLP",
          "href": "https://imslp.org/wiki/Pomp_and_Circumstance,_Op.39_(Elgar,_Edward)"
        }
      ],
      "rank": 16
    },
    {
      "slug": "prince-harry-daily-mail-privacy-loss",
      "headline": "Prince Harry and six others lose their privacy case against the Daily Mail's publisher",
      "overview": "A London High Court judge, Mr Justice Nicklin, dismissed on July 7, 2026 the claims of Prince Harry, Elton John, Elizabeth Hurley, Sadie Frost, Doreen Lawrence and others that Associated Newspapers had unlawfully gathered information about them. The judge ruled that although the allegations were serious, suspicion was not proof, and the material behind the newspaper's stories may have come from legitimate sources. Legal costs for the years of preparation and an 11-week trial were estimated at about £40 million.",
      "genre": "Culture",
      "sources": [
        {
          "name": "AP News",
          "href": "https://news.google.com/rss/articles/CBMiqAFBVV95cUxNWjJsY0J2MHB0N1cxalhpRFllTU8tX2dMbWtBOFVrTjdUdThMdEI0UVU5UUtVWGVLcWRQSXZjTV93QkNEVEZUUFhwbks5b3JWemNXUG4xeVpjUFVkZlJBVUgxeDdNczZ4SXdjd0p6SWRCNENkVkVHY2NlaVRTc3RyRi1DdGRWZ2ZFaDBBSGVVam9sbVd2TTllUmhoWGhmXzZtSVhEV3J6S1o?oc=5"
        },
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMiogFBVV95cUxPOC1pVERadTlHZTJJcmJyazNxbEVkYS1vVy1EMEloZDM4VVViaGpTbWNWSFJDRG5xVHF5Y3NDS3pqZzhSMUVXdG44SFJGekMxb3VESmNZY0tpdm0zVHEzcU5PZ1hCa0pfc2ljb1g1aGlzRmdKRnkza2NzdDlvZjJreVpPRnNEYlNlMEltUGVXWHpLUHdaamdIUnlXUU9fNWtrZ3c?oc=5"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-07",
      "image": {
        "src": "/covers/prince-harry-daily-mail-privacy-loss.png",
        "alt": "The tall columns and stone steps of a London law court at dusk, a set of brass scales of justice on a plinth in the foreground",
        "credit": "AI-generated"
      },
      "edition": "Evening Edition · 7 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "The Trial of John Peter Zenger (1735)",
          "excerpt": "It is natural, it is a privilege, I will go farther, it is a right which all freemen claim, and are entitled to complain when they are hurt; they have a right publicly to remonstrate the abuses of power in the strongest terms.",
          "source": "Andrew Hamilton, summation for the defence, Crown v. John Peter Zenger, New York, August 1735",
          "href": "https://constitutioncenter.org/the-constitution/historic-document-library/detail/andrew-hamilton-argument-in-the-zenger-trial-1735"
        },
        {
          "category": "historical",
          "title": "Prince Albert v Strange (1849)",
          "excerpt": "This case by no means depends solely upon the question of property; for a breach of trust, confidence, or contract, would of itself entitle the plaintiff to an injunction.",
          "source": "Lord Cottenham LC, judgment in Prince Albert v Strange (1849), an early royal privacy and breach-of-confidence case",
          "href": "https://en.wikipedia.org/wiki/Prince_Albert_v_Strange"
        },
        {
          "category": "literary",
          "title": "Sheridan, The School for Scandal (1777)",
          "excerpt": "Wounded myself, in the early part of my Life by the envenomed Tongue of Slander I confess I have since known no Pleasure equal to the reducing others to the Level of my own injured Reputation.",
          "source": "Lady Sneerwell, Act I, Scene I, Richard Brinsley Sheridan's The School for Scandal",
          "href": "https://www.gutenberg.org/files/1929/1929-h/1929-h.htm"
        },
        {
          "category": "literary",
          "title": "Shakespeare, Othello — Iago on \"good name\"",
          "excerpt": "Good name in man and woman, dear my lord, / Is the immediate jewel of their souls: / Who steals my purse steals trash; 'tis something, nothing; / 'Twas mine, 'tis his, and has been slave to thousands; / But he that filches from me my good name / Robs me of that which not enriches him / And makes me poor indeed.",
          "source": "Iago, Othello, Act III, Scene III, William Shakespeare",
          "href": "https://www.gutenberg.org/cache/epub/1531/pg1531.txt"
        },
        {
          "category": "artistic",
          "title": "Daumier, Ne vous y frottez pas!! (1834)",
          "excerpt": "A shirt-sleeved printer plants his fists and squares up over his press, refusing to yield; a toppled king sprawls at his feet while another lunges from the shadows. Daumier turns the freedom of the press into a single defiant stance, the lone worker against the crowned power that would silence him. It is the oldest quarrel in the news business, drawn in stone.",
          "source": "Honoré Daumier, lithograph for L'Association mensuelle, Plate 20 (March 1834), National Gallery of Art",
          "href": "https://commons.wikimedia.org/wiki/File:Honor%C3%A9_Daumier,_Ne_vous_y_frottez_pas!!,_1834,_NGA_6131.jpg",
          "image": {
            "src": "/covers/prince-harry-daily-mail-privacy-loss--art.png",
            "alt": "A defiant printer in shirtsleeves stands firm at his press with clenched fists while a fallen king lies at his feet and another figure lunges at him, in Daumier's satire on the freedom of the press.",
            "credit": "Honoré Daumier, Ne vous y frottez pas!! (1834), National Gallery of Art — public domain via Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "Rossini, \"La calunnia è un venticello\" (1816)",
          "excerpt": "La calunnia è un venticello / un'auretta assai gentile / che insensibile sottile / leggermente dolcemente / incomincia a sussurrar. [...] E il meschino calunniato / avvilito, calpestato / sotto il pubblico flagello / per gran sorte va a crepar.",
          "source": "Don Basilio's aria, libretto by Cesare Sterbini for Rossini's Il barbiere di Siviglia (1816), Act I",
          "href": "https://imslp.org/wiki/Il_barbiere_di_Siviglia_(Rossini,_Gioacchino)"
        }
      ],
      "rank": 17
    },
    {
      "slug": "deepseek-develops-own-ai-chip",
      "headline": "China's DeepSeek is developing its own AI inference chip to cut reliance on Nvidia, Reuters reports",
      "overview": "The Chinese artificial-intelligence firm DeepSeek is designing its own chip for AI inference, three people told Reuters in a report published July 7, 2026, a move that could lessen its dependence on Nvidia and Huawei silicon. The company is said to be in talks with manufacturing partners and quietly hiring chip engineers, with the project about a year old but still early. Success would mark a major strategic shift for a company widely hailed in China as its AI champion.",
      "genre": "Technology",
      "sources": [
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMipAFBVV95cUxNSGRQQzRJX0VFTThJbC1JZnM2NUpNVHZQeEhxODdQejNBODNSLXpYMGdvSWxJMVhRSFBEOWplZy1NMU5qSnFxc3dpOEczN01EcVRQSk1mSXo3ejlMaUoxcks3LURaeGZ0Q3EyZ2dBQVN0QkRXNWg0YWpyOXJ2TjUtLVF4elZRU1VqdUVCdEhGNnFfYV9uYTdaT3V4MVFEZ2swRmlfRw?oc=5"
        },
        {
          "name": "Google News",
          "href": "https://news.google.com/rss/search?q=DeepSeek%20developing%20own%20AI%20chip%20inference%20Nvidia&hl=en-US&gl=US&ceid=US:en"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-07",
      "image": {
        "src": "/covers/deepseek-develops-own-ai-chip.png",
        "alt": "A single mirror-bright silicon wafer held under cool clean-room light, its surface catching a faint grid of microscopic circuitry",
        "credit": "AI-generated"
      },
      "edition": "Evening Edition · 7 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Byzantine monks smuggle the silkworm out of China (6th century)",
          "excerpt": "[The monks] came before the emperor and promised so to settle the silk question that the Romans would no longer purchase this article from their enemies, the Persians, nor indeed from any other nation.... the monks explained to him that certain worms are the manufacturers of silk, nature being their teacher and compelling them to work continually. And while it was impossible to convey the worms thither alive, it was still practicable and altogether easy to convey their offspring.",
          "source": "Procopius, History of the Wars, VIII.xvii (trans. H. B. Dewing, Loeb Classical Library)",
          "href": "https://archive.org/stream/L217ProcopiusVHistoryOfTheWars7.368.GothicWar/L217-Procopius%20V%20History%20of%20the%20Wars%207.36-8.%20(Gothic%20War)_djvu.txt"
        },
        {
          "category": "historical",
          "title": "Robert Fortune steals China's tea for British India (1848-1851)",
          "excerpt": "I was deputed by the Honourable the Court of Directors of the East India Company to proceed to China for the purpose of obtaining the finest varieties of the Tea-plant, as well as native manufacturers and implements, for the Government Tea plantations in the Himalayas.",
          "source": "Robert Fortune, A Journey to the Tea Countries of China (1852), Preface",
          "href": "https://archive.org/details/journeytoteacoun00fort"
        },
        {
          "category": "literary",
          "title": "Aeschylus, Prometheus Bound",
          "excerpt": "Over and above these boons, however, I imparted fire to them.... All arts among the human race are from Prometheus.",
          "source": "Aeschylus, Prometheus Bound (trans. Theodore Alois Buckley), Project Gutenberg",
          "href": "https://www.gutenberg.org/files/27458/27458-h/27458-h.htm"
        },
        {
          "category": "literary",
          "title": "Mary Shelley, Frankenstein",
          "excerpt": "Life and death appeared to me ideal bounds, which I should first break through, and pour a torrent of light into our dark world. A new species would bless me as its creator and source; many happy and excellent natures would owe their being to me.",
          "source": "Mary Shelley, Frankenstein; or, The Modern Prometheus (1818), Ch. 4, Project Gutenberg",
          "href": "https://www.gutenberg.org/files/84/84-h/84-h.htm"
        },
        {
          "category": "artistic",
          "title": "Velázquez, Apollo in the Forge of Vulcan (1630)",
          "excerpt": "In Velázquez's forge the god of smiths pauses mid-blow, the half-beaten blade still glowing on the anvil, and stares at the intruder who brings unwelcome news. Around him his workmen grip hammer and tongs, caught in the act of hammering raw metal into weapons and tools. It is a portrait of the maker's power itself: the one who commands the fire and the anvil need beg no arms from anyone.",
          "source": "Diego Velázquez, Apollo in the Forge of Vulcan (1630), Museo del Prado, Madrid",
          "href": "https://commons.wikimedia.org/wiki/File:Vel%C3%A1zquez_-_La_Fragua_de_Vulcano_(Museo_del_Prado,_1630).jpg",
          "image": {
            "src": "/covers/deepseek-develops-own-ai-chip--art.png",
            "alt": "Apollo, crowned with laurel, appears amid Vulcan and his half-naked smiths at a glowing forge, the workers frozen with hammers and tongs around an anvil bearing a bright piece of hot iron.",
            "credit": "Diego Velázquez, Apollo in the Forge of Vulcan (1630), Museo del Prado — public domain via Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "Beethoven, The Creatures of Prometheus, Op. 43 (1801)",
          "excerpt": "Beethoven's only ballet sets in motion the Titan who steals fire and shapes lifeless clay into living, striving beings. Its overture bursts open with a hammer-stroke chord and races forward, all forward drive and defiant energy. In its finale sounds the very theme Beethoven would later carry into the Eroica — the music of a maker so sure of his own creation that it becomes the engine of a whole heroic symphony.",
          "source": "Ludwig van Beethoven, Die Geschöpfe des Prometheus (The Creatures of Prometheus), Op. 43, IMSLP",
          "href": "https://imslp.org/wiki/Die_Gesch%C3%B6pfe_des_Prometheus,_Op.43_(Beethoven,_Ludwig_van)"
        }
      ],
      "rank": 18
    },
    {
      "slug": "data-centers-rust-belt-power-bills",
      "headline": "AI data centers push up electricity bills at Rust Belt factories, with Pennsylvania industrial prices up 31%",
      "overview": "Power-hungry data centers serving the artificial-intelligence boom are driving industrial electricity costs sharply higher across America's manufacturing heartland, Reuters reported on July 7, 2026. Average industrial power prices rose 31% in Pennsylvania and 26% in Ohio in the year to December 2025, against a 7% national increase, squeezing old-line factories such as Ohio's Belden Brick, whose monthly capacity charge leapt from $1,600 to $12,000. Regional grid capacity charges have soared roughly tenfold as data centers dominate demand.",
      "genre": "Technology",
      "sources": [
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMiyAFBVV95cUxNSGJ2UXRHVGctUTJ6VTJfbGV6djVUaUZFZjVONlZPZ0EyY01XZFh6dFdRRGxDQnRzSnF6UG1mOXBNR2k5eTBXeEtyV1VIdzdlUjk4N1lrTFVqdFRFRjNBMHNsMmFRWmpxX2I5dzdQMlZnZmsteUU0bGZXMFNRM29Vb2JGeFRScWw5S3ZPZlV3ZTA0dkdxTTI4a05waTR1ZU9aZVVCcWV5bVVfOUFtMUxQRzJ4aVQyQWV5MEFaODlrUjFSWXpDVGE5dQ?oc=5"
        },
        {
          "name": "Google News",
          "href": "https://news.google.com/rss/search?q=data%20centers%20driving%20up%20power%20bills%20Rust%20Belt%20factories&hl=en-US&gl=US&ceid=US:en"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-07",
      "image": {
        "src": "/covers/data-centers-rust-belt-power-bills.png",
        "alt": "Rows of high-voltage transmission towers and power lines marching across an industrial plain under a heavy grey sky",
        "credit": "AI-generated"
      },
      "edition": "Evening Edition · 7 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Thomas More on the Enclosures — the sheep that devour men (1516)",
          "excerpt": "your sheep that were wont to be so meek and tame, and so small eaters, now, as I heard say, be become so great devourers and so wild, that they eat up, and swallow down the very men themselves.",
          "source": "Sir Thomas More, Utopia (Book I, 1516; Ralph Robynson translation)",
          "href": "https://www.luminarium.org/renlit/utopiaenclosures.htm"
        },
        {
          "category": "historical",
          "title": "William Forster Lloyd and the overstocked common (1833)",
          "excerpt": "Why are the cattle on a common so puny and stunted? Why is the common itself so bare-worn, and cropped so differently from the adjoining inclosures?",
          "source": "William Forster Lloyd, Two Lectures on the Checks to Population (Oxford, 1833) — the passage that inspired the phrase 'tragedy of the commons'",
          "href": "https://en.wikisource.org/wiki/Two_Lectures_on_the_Checks_to_Population/Lecture_1"
        },
        {
          "category": "literary",
          "title": "William Blake — 'dark Satanic Mills'",
          "excerpt": "And was Jerusalem builded here\nAmong these dark Satanic Mills?",
          "source": "William Blake, preface to Milton: A Poem (c. 1804–1810), the lines later sung as 'Jerusalem'",
          "href": "https://poets.org/poem/milton-excerpt"
        },
        {
          "category": "literary",
          "title": "Oliver Goldsmith — 'The Deserted Village'",
          "excerpt": "Ill fares the land, to hastening ills a prey,\nWhere wealth accumulates, and men decay;\nPrinces and lords may flourish, or may fade;\nA breath can make them, as a breath has made:",
          "source": "Oliver Goldsmith, The Deserted Village (1770), lines 51–54",
          "href": "https://anthology.lib.virginia.edu/work/Goldsmith/goldsmith-deserted"
        },
        {
          "category": "artistic",
          "title": "Philippe-Jacques de Loutherbourg — 'Coalbrookdale by Night' (1801)",
          "excerpt": "The ironworks blaze against the black Shropshire hills like a wound in the night, furnaces flaring where fields once slept. Loutherbourg painted the new industrial power not as triumph but as an infernal glow devouring the old rural dark — progress rendered as fire that consumes the land around it.",
          "source": "Philippe-Jacques de Loutherbourg, Coalbrookdale by Night (1801), oil on canvas, Science Museum, London",
          "href": "https://commons.wikimedia.org/wiki/File:Philipp_Jakob_Loutherbourg_d._J._002.jpg",
          "image": {
            "src": "/covers/data-centers-rust-belt-power-bills--art.png",
            "alt": "Night scene of the Coalbrookdale ironworks, furnaces glowing fiery red-orange against dark hills and a smoke-filled sky",
            "credit": "Philippe-Jacques de Loutherbourg, Coalbrookdale by Night (1801), Science Museum, London — public domain via Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "Alexander Mosolov — 'Iron Foundry' (Zavod), Op. 19 (1926–27)",
          "excerpt": "Mosolov set the factory itself to music: hammering ostinatos, a shaken metal sheet, and relentless brass that turn the orchestra into a single grinding machine. It is the sound of industrial appetite made audible — power that does not rest, indifferent to whatever it drowns out.",
          "source": "Alexander Mosolov, Zavod ('Iron Foundry'), Op. 19, orchestral episode (composed 1926–27; premiered 1927)",
          "href": "https://imslp.org/wiki/Steel,_Op.19_(Mosolov,_Alexander)"
        }
      ],
      "rank": 19
    },
    {
      "slug": "ukraine-shadow-fleet-tankers-azov",
      "headline": "Ukraine says its drones struck eight Russian 'shadow fleet' tankers in the Sea of Azov",
      "overview": "Ukrainian long-range drones hit eight sanctioned Russian tankers ferrying fuel toward Crimea overnight into July 7, 2026, leaving them badly damaged and ablaze, Kyiv's drone-forces command said. Commander Robert Brovdi described the results as \"industrial scale\" and said the strikes also hit a dry-cargo ship and a ferry. The attack was part of an intensified Ukrainian campaign against the naval logistics that supply Russian forces in occupied Crimea.",
      "genre": "Conflict",
      "sources": [
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMirgFBVV95cUxQNkJPTUhLWWxYT0hLeUhPQmQxZVZZYlV1M0lzVHVzRFEyeW1VeHhLbk9wZWxpb0JVOXRqeVQxb2dRN0Z6aFpHNVdXQmdIa1RUNlFiMkhVeEVGOF9kSm9HRDdSd2JFZGowUEdkaVNOa2FIZmJOeDVuVTV0SFdDMTV6LThFNW1YbXAtdUtfYmdEWDRsMm9DbUx2bDBPamo0UTRQYmsxU0IyWmt3dUkzamc?oc=5"
        },
        {
          "name": "Kyiv Independent",
          "href": "https://kyivindependent.com/ukraine-says-it-hit-8-russian-shadow-fleet-tankers-in-azov-sea/"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-07",
      "image": {
        "src": "/covers/ukraine-shadow-fleet-tankers-azov.png",
        "alt": "A large oil tanker at sea at dusk with a column of dark smoke and orange flame rising from its deck, seen across calm open water",
        "credit": "AI-generated"
      },
      "edition": "Evening Edition · 7 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "The Greeks burn the Persian fleet at Mycale (479 BC)",
          "excerpt": "When the Hellenes had slain the greater number of the Barbarians, some in the battle and others in their flight, they set fire to the ships and to the whole of the wall, having first brought out the spoil to the sea-shore; and among the rest they found some stores of money. So having set fire to the wall and to the ships they sailed away.",
          "source": "Herodotus, The Histories, Book IX.106 (trans. G. C. Macaulay, 1890)",
          "href": "https://en.wikisource.org/wiki/The_History_of_Herodotus_(Macaulay)/Book_IX"
        },
        {
          "category": "historical",
          "title": "English fireships scatter the Spanish Armada off Calais (1588)",
          "excerpt": "On the night of 7-8 August 1588, unable to close with the Armada's guns, the English filled eight old warships with pitch and powder, set them alight, and steered them downwind into the fleet packed at anchor off Calais. Dreading the exploding 'hellburners' of Antwerp, the Spanish captains cut their cables and fled into the dark, breaking the crescent formation that had held all the way up the Channel. No great galleon was burned, yet the fire at anchor did what battle could not, scattering the invasion before it ever reached England.",
          "source": "The fireship attack and the Battle of Gravelines, 8 August 1588",
          "href": "https://en.wikipedia.org/wiki/Spanish_Armada"
        },
        {
          "category": "literary",
          "title": "Homer: the Trojans set fire to the Greek ships (Iliad, Book XVI)",
          "excerpt": "The fire was now flaring about the ship's stern, whereon Achilles smote his two thighs and said to Patroclus, “Up, noble knight, for I see the glare of hostile fire at our fleet; up, lest they destroy our ships, and there be no way by which we may retreat.”",
          "source": "Homer, The Iliad, Book XVI (trans. Samuel Butler, 1898)",
          "href": "https://www.gutenberg.org/cache/epub/2199/pg2199.txt"
        },
        {
          "category": "literary",
          "title": "Tennyson: 'The Revenge: A Ballad of the Fleet'",
          "excerpt": "At Flores, in the Azores Sir Richard Grenville lay, / And a pinnace, like a flutter'd bird, came flying from far away; … And the little Revenge herself went down by the island crags / To be lost evermore in the main.",
          "source": "Alfred, Lord Tennyson, 'The Revenge: A Ballad of the Fleet' (1878)",
          "href": "https://en.wikisource.org/wiki/The_Revenge:_A_Ballad_of_the_Fleet"
        },
        {
          "category": "artistic",
          "title": "de Loutherbourg, 'Defeat of the Spanish Armada, 8 August 1588' (1796)",
          "excerpt": "De Loutherbourg's vast canvas turns naval interdiction into spectacle: masts snap, hulls heel over, and men spill into a churning sea while the English press home the ruin begun by the fireships the night before. Painted two centuries after the event, it fixes the moment a supply-borne invasion is undone not by a single decisive clash but by relentless pressure upon ships too crowded to manoeuvre.",
          "source": "Philip James de Loutherbourg, Defeat of the Spanish Armada, 8 August 1588 (1796), National Maritime Museum, Greenwich",
          "href": "https://commons.wikimedia.org/wiki/File:Defeat_of_the_Spanish_Armada,_8_August_1588_RMG_BHC0264.tiff",
          "image": {
            "src": "/covers/ukraine-shadow-fleet-tankers-azov--art.png",
            "alt": "A stormy 16th-century sea battle: English and Spanish warships wrecked and heeling amid smoke, broken masts and men in the water as the Armada is scattered.",
            "credit": "Philip James de Loutherbourg, Defeat of the Spanish Armada, 8 August 1588 (1796), National Maritime Museum, Greenwich — public domain via Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "Rimsky-Korsakov, 'Scheherazade', Op. 35 — the shipwreck finale (1888)",
          "excerpt": "In the finale of Scheherazade the surging sea theme returns and mounts to catastrophe: Sinbad's ship is driven onto a rock crowned by a bronze warrior and dashed to pieces, the orchestra collapsing in a great crash of brass and cymbals before the waters fall still. Rimsky-Korsakov makes vivid in sound what fire and storm do to a vessel that can no longer keep the sea — the moment a proud ship is broken and lost.",
          "source": "Nikolai Rimsky-Korsakov, Scheherazade, Op. 35 (1888), fourth movement — 'The Sea; The Ship Goes to Pieces on a Rock'",
          "href": "https://imslp.org/wiki/Scheherazade,_Op.35_(Rimsky-Korsakov,_Nikolay)"
        }
      ],
      "rank": 20
    },
    {
      "slug": "monaco-bombing-suspect-dead-ukraine",
      "headline": "Suspect in the Monaco parcel bombing is found shot dead in Ukraine",
      "overview": "The chief suspect in a parcel-bomb attack on a Monaco apartment building that targeted a Ukrainian-born businessman has been found shot in the head in Ukraine, officials said in reports on July 7, 2026. A current employee of Ukraine's military-intelligence directorate has confessed to the killing, with a former law-enforcement officer named as an alleged accomplice. The Monaco blast had wounded three people, and the suspect was said to have disguised herself during the attack.",
      "genre": "Conflict",
      "sources": [
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMiuAFBVV95cUxOR1lJanhWUEtLTGFxQjI3d0VQSnVjNnJkZG1SVGtsWFVnMURwYjNxWFFadkJZYUxPQ01XaF9salQ3WWp2REM4b0g5eUN0M204c0dzREdXWTBWLTkzenZ3T3pRY0FBZVdsYlVTR2d6TURkS0ZnNlJyaVpBdjBkZzFXdkEtaDhJNFA3QmNRTHVBRlJUS1RkYkFjd2FEb0xsNTN4WURnT1V0TDhwbzhIenZISzI3SGRPREVn?oc=5"
        },
        {
          "name": "BBC News",
          "href": "https://www.bbc.co.uk/news/articles/c5yz3770yg8o"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-07",
      "image": {
        "src": "/covers/monaco-bombing-suspect-dead-ukraine.png",
        "alt": "A dim opulent marble apartment lobby at night, a single plain parcel resting alone on the polished floor beside a mirrored wall",
        "credit": "AI-generated"
      },
      "edition": "Evening Edition · 7 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Brutus and Cassius fall on their own blades at Philippi (42 BC)",
          "excerpt": "The men who plunged their daggers into Julius Caesar did not long outlive their deed. Routed by Caesar's avengers on the plain of Philippi, Cassius ordered his freedman Pindarus to strike him down; weeks later Brutus, cornered and certain of capture, took his own life. The tyrannicides who had wielded the blade in the Senate house perished by the sword in turn.",
          "source": "Battle of Philippi — Wikipedia",
          "href": "https://en.wikipedia.org/wiki/Battle_of_Philippi"
        },
        {
          "category": "historical",
          "title": "Baroncelli, assassin of Giuliano de' Medici, hanged in Florence (1479)",
          "excerpt": "Bernardo Bandini Baroncelli helped stab Giuliano de' Medici to death at High Mass in Florence's Duomo during the Pazzi conspiracy of 1478. He fled as far as Constantinople, but Medici agents dragged him back, and in December 1479 he was hanged from a window of the Bargello, still wearing the Turkish robes of his capture. A young Leonardo da Vinci stood in the crowd and sketched the dangling corpse of the killer.",
          "source": "Bernardo Bandini Baroncelli — Wikipedia",
          "href": "https://en.wikipedia.org/wiki/Bernardo_Bandini_Baroncelli"
        },
        {
          "category": "literary",
          "title": "Haman hanged on the gallows he built for Mordecai (Book of Esther)",
          "excerpt": "And Harbonah, one of the chamberlains, said before the king, Behold also, the gallows fifty cubits high, which Haman had made for Mordecai, who had spoken good for the king, standeth in the house of Haman. Then the king said, Hang him thereon. So they hanged Haman on the gallows that he had prepared for Mordecai. Then was the king's wrath pacified.",
          "source": "Esther 7:9-10, King James Bible (public domain)",
          "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Esther"
        },
        {
          "category": "literary",
          "title": "\"Hoist with his own petar\" — Hamlet, Act III, Scene 4",
          "excerpt": "For 'tis the sport to have the enginer / Hoist with his own petar; and 't shall go hard / But I will delve one yard below their mines / And blow them at the moon.",
          "source": "William Shakespeare, Hamlet, Act 3, Scene 4 (public domain)",
          "href": "https://www.opensourceshakespeare.org/views/plays/play_view.php?WorkID=hamlet&Act=3&Scene=4&Scope=scene"
        },
        {
          "category": "artistic",
          "title": "Artemisia Gentileschi, \"Judith Beheading Holofernes\" (c. 1611-12)",
          "excerpt": "Artemisia Gentileschi paints assassination as brute physical labour: Judith and her maid pin the enemy general to his own bed and saw through his neck while the blood arcs across the sheets. The killer here is a woman on a covert errand for her nation, dispatching a man in the dark to serve a cause larger than herself. Baroque chiaroscuro turns the deed into a study of resolve, betrayal and the intimacy of violence.",
          "source": "File: Artemisia Gentileschi — Judith Beheading Holofernes (Wikimedia Commons, public domain)",
          "href": "https://commons.wikimedia.org/wiki/File:Artemisia_Gentileschi_-_Judith_Beheading_Holofernes_-_WGA8563.jpg",
          "image": {
            "src": "/covers/monaco-bombing-suspect-dead-ukraine--art.png",
            "alt": "A woman in a golden dress and her maid hold down a bearded man and behead him with a sword as blood sprays across the bed, in dramatic light and shadow.",
            "credit": "Artemisia Gentileschi, Judith Beheading Holofernes (c. 1611-12), Museo di Capodimonte, Naples — public domain via Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "Modest Mussorgsky, \"Boris Godunov\" (1869/1872)",
          "excerpt": "Mussorgsky's opera opens on a tsar who has climbed to the throne over the corpse of a murdered child, the boy Dmitri. Power gives Boris no rest: the guilt festers into hallucination, and the crime he ordered silenced returns to unseat and destroy him. It is music of the deed that will not stay buried, of violence that circles back upon the hand that commissioned it.",
          "source": "Boris Godunov (Mussorgsky, Modest) — IMSLP (public domain)",
          "href": "https://imslp.org/wiki/Boris_Godunov_(Mussorgsky,_Modest)"
        }
      ],
      "rank": 21
    },
    {
      "slug": "cuba-islandwide-blackout-fuel",
      "headline": "An islandwide blackout plunges Cuba into darkness as fuel reserves run dry",
      "overview": "Cuba's entire electrical grid collapsed on July 6, 2026, cutting power across the island of some 10 million people as dwindling fuel reserves and crumbling infrastructure overwhelmed the system, the state-run Electric Union said. Fuel has grown scarce since January, when new U.S. tariff threats against oil suppliers deepened the island's economic crisis. Public transport has largely halted and officials have canceled tens of thousands of surgeries.",
      "genre": "Economy",
      "sources": [
        {
          "name": "AP News",
          "href": "https://news.google.com/rss/articles/CBMipgFBVV95cUxQYVQ3N0JwcjVST04wcGM5Y2xtdE42ZEpubnpIYjNpQlJKM1ZCLVpWbDNXMlVJRU1veGl4WjJtV0s4MUt1VGM2a2NBdDNrNEk2SnFBQzdlUEQzaWRRNFRHdVlhY1BhbzF1ZGM2aktVSnFiVklVWGlmWDFPRnBsV1RNTEVTbFF1WmYyTm1zX2RkTEFHdkVrNWNzQlBWdFVOYzhocGJhRlFR?oc=5"
        },
        {
          "name": "Google News",
          "href": "https://news.google.com/rss/search?q=Cuba%20islandwide%20blackout%20fuel%20reserve%20grid&hl=en-US&gl=US&ceid=US:en"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-07",
      "image": {
        "src": "/covers/cuba-islandwide-blackout-fuel.png",
        "alt": "A darkened Caribbean city skyline at night with almost no lights, faint silhouettes of buildings against a deep blue sky",
        "credit": "AI-generated"
      },
      "edition": "Evening Edition · 7 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "‘The lamps are going out all over Europe’ (1914)",
          "excerpt": "The lamps are going out all over Europe, we shall not see them lit again in our life-time.",
          "source": "Sir Edward Grey, recalling the eve of the First World War in his memoir Twenty-Five Years (1925)",
          "href": "https://en.wikipedia.org/wiki/The_lamps_are_going_out"
        },
        {
          "category": "historical",
          "title": "The famine in the Siege of Jerusalem (70 CE)",
          "excerpt": "And indeed the multitude of carcasses that lay in heaps one upon another was a horrible sight, and produced a pestilential stench, which was a hinderance to those that would make sallies out of the city, and fight the enemy. Now every other sort of death was thought more tolerable than the famine.",
          "source": "Flavius Josephus, The Wars of the Jews, Book VI (trans. William Whiston)",
          "href": "https://www.avande1.sites.luc.edu/jerusalem/sources/wars6.htm"
        },
        {
          "category": "literary",
          "title": "Lord Byron, ‘Darkness’ (1816)",
          "excerpt": "I had a dream, which was not all a dream.\nThe bright sun was extinguish'd, and the stars\nDid wander darkling in the eternal space,\nRayless, and pathless, and the icy earth\nSwung blind and blackening in the moonless air;\nMorn came and went—and came, and brought no day,\nAnd men forgot their passions in the dread\nOf this their desolation; and all hearts\nWere chill'd into a selfish prayer for light:",
          "source": "Lord Byron, ‘Darkness’ (1816)",
          "href": "https://poets.org/poem/darkness"
        },
        {
          "category": "literary",
          "title": "John Milton, ‘When I consider how my light is spent’ (Sonnet 19)",
          "excerpt": "When I consider how my light is spent,\nE're half my days, in this dark world and wide,\nAnd that one Talent which is death to hide,\nLodg'd with me useless, though my Soul more bent\nTo serve therewith my Maker, and present\nMy true account, least he returning chide.",
          "source": "John Milton, Sonnet 19 (c. 1652–55), Milton Reading Room, Dartmouth College",
          "href": "https://milton.host.dartmouth.edu/reading_room/sonnets/sonnet_19/text.shtml"
        },
        {
          "category": "artistic",
          "title": "Joseph Wright of Derby, ‘A Philosopher Lecturing on the Orrery’ (c. 1766)",
          "excerpt": "A rapt circle of faces leans toward the single lamp at the heart of a darkened room, its glow carving each figure out of the surrounding black. Wright makes one small flame stand for all knowledge and comfort, and the dark press in from every edge. It is the image of a people gathered around the last light when the wider world has gone out.",
          "source": "Joseph Wright of Derby, ‘A Philosopher Lecturing on the Orrery’ (c. 1766), Derby Museum and Art Gallery — public domain via Wikimedia Commons",
          "href": "https://commons.wikimedia.org/wiki/File:Wright_of_Derby,_The_Orrery.jpg",
          "image": {
            "src": "/covers/cuba-islandwide-blackout-fuel--art.png",
            "alt": "A lamplit night scene: figures gathered in darkness around a brass orrery, their faces lit by a single hidden light at the centre.",
            "credit": "Joseph Wright of Derby, A Philosopher Lecturing on the Orrery (c. 1766), Derby Museum and Art Gallery — public domain via Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "Joseph Haydn, ‘The Creation’ — ‘Und es ward Licht’ (1798)",
          "excerpt": "Haydn holds the orchestra in a hushed C-minor darkness over the words ‘and the Spirit of God moved upon the face of the waters,’ the chorus almost whispering. Then on the single word ‘Light’ he detonates a blazing fortissimo C-major chord, the most famous illumination in all of music. The passage is the exact opposite of a blackout: the instant the dark is torn open and the world can see again.",
          "source": "Joseph Haydn, Die Schöpfung (The Creation), Hob.XXI:2 (1798), Part I",
          "href": "https://imslp.org/wiki/Die_Sch%C3%B6pfung,_Hob.XXI:2_(Haydn,_Joseph)"
        }
      ],
      "rank": 22
    },
    {
      "slug": "amazon-25-billion-bond-ai",
      "headline": "Amazon launches a $25 billion bond sale to fund its AI data-center build-out",
      "overview": "Amazon began an eight-part investment-grade bond sale on July 7, 2026, seeking to raise at least $25 billion to finance a vast expansion of data centers and chips as its capital spending heads toward roughly $200 billion this year. The offering, with maturities running from three to 40 years, could grow depending on investor demand. It adds to a global surge in AI-related debt that Bloomberg data put near $335 billion for the year, more than double 2025's level.",
      "genre": "Economy",
      "sources": [
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMiuAFBVV95cUxQS3Q0MjREWGpzSllLaFpWNXdtOFRHcy1sQjlNOUFzUHVCRzBXRDMtLW1wWnpBRkt6amFubXd5aEhsLVBxYVJxSDFlOFZQVHFKeHRzRGxDa3BocHVkTFM4dWRvQkxQYWN2TTgyOWRFMkttaVhUckdsa1FYcnJOUUtqaEJ2b3p0V3NKREVteTNGRV9ZU2txc2J4aWFKb2pTUlJrM2lDZm1ZckdiVkdjZEF0NUxac09aRXlx?oc=5"
        },
        {
          "name": "Google News",
          "href": "https://news.google.com/rss/search?q=Amazon%20%2425%20billion%20bond%20sale%20AI%20data%20centers&hl=en-US&gl=US&ceid=US:en"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-07",
      "image": {
        "src": "/covers/amazon-25-billion-bond-ai.png",
        "alt": "A towering glass corporate skyscraper at dusk seen from below, its facade reflecting a cool darkening sky",
        "credit": "AI-generated"
      },
      "edition": "Evening Edition · 7 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "The South Sea Bubble (1720)",
          "excerpt": "The South Sea Company promised to swallow Britain's national debt whole and turn it into soaring shares, lending investors the very money they used to buy in. Stock leapt from around 128 pounds in January 1720 to more than 1,000 by August, floated on credit and the promise of riches from a trade that barely existed. By December it had collapsed back to 124, ruining a nation that had mortgaged its future on a single dazzling scheme.",
          "source": "Britannica Money, \"South Sea Bubble\"",
          "href": "https://www.britannica.com/money/South-Sea-Bubble"
        },
        {
          "category": "historical",
          "title": "The Railway Mania of the 1840s",
          "excerpt": "In the 1840s Britain poured its savings into railway companies at a pace never seen before, raising capital that swelled from under 4 million pounds a year to over 30 million by 1847 — nearly half of all domestic investment. In 1846 alone Parliament passed 263 acts authorising 9,500 miles of new track. A third of that mileage was never laid, yet the frenzy of borrowing did leave behind the iron backbone of an industrial nation.",
          "source": "Wikipedia, \"Railway Mania\"",
          "href": "https://en.wikipedia.org/wiki/Railway_Mania"
        },
        {
          "category": "literary",
          "title": "Anthony Trollope, The Way We Live Now (1875)",
          "excerpt": "\"It was said that he had made a railway across Russia, that he provisioned the Southern army in the American civil war, that he had supplied Austria with arms, and had at one time bought up all the iron in England.\"",
          "source": "Anthony Trollope, The Way We Live Now (Project Gutenberg)",
          "href": "https://www.gutenberg.org/files/5231/5231-h/5231-h.htm"
        },
        {
          "category": "literary",
          "title": "The Tower of Babel (Genesis 11, King James Version)",
          "excerpt": "\"And they said one to another, Go to, let us make brick, and burn them thoroughly. And they had brick for stone, and slime had they for morter. And they said, Go to, let us build us a city and a tower, whose top may reach unto heaven; and let us make us a name, lest we be scattered abroad upon the face of the whole earth.\"",
          "source": "The King James Bible, Genesis 11:3-4 (Project Gutenberg)",
          "href": "https://www.gutenberg.org/cache/epub/10/pg10.txt"
        },
        {
          "category": "artistic",
          "title": "Pieter Bruegel the Elder, The Tower of Babel (1563)",
          "excerpt": "Bruegel's vast spiralling tower rises storey upon storey into the clouds, still clad in scaffolding and swarming with the tiny labourers and cranes that hoist it ever higher. Its lower arches already crack and lean even as construction races upward, a monument to ambition outrunning its own foundations. No single image better captures the grandeur, and the peril, of building something colossal on the strength of a promise.",
          "source": "Pieter Bruegel the Elder, The Tower of Babel (1563), Kunsthistorisches Museum, Vienna",
          "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_the_Elder_-_The_Tower_of_Babel_(Vienna)_-_Google_Art_Project_-_edited.jpg",
          "image": {
            "src": "/covers/amazon-25-billion-bond-ai--art.png",
            "alt": "Bruegel's monumental unfinished Tower of Babel spiralling into the clouds, wrapped in scaffolding and crowded with labourers as its lower arches begin to crack",
            "credit": "Pieter Bruegel the Elder, The Tower of Babel (1563), Kunsthistorisches Museum, Vienna — public domain via Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "Richard Wagner, Das Rheingold (1869) — the Building of Valhalla",
          "excerpt": "As the second scene dawns, a shining fortress gleams across the valley: Valhalla, raised for the gods by the giants Fasolt and Fafner. But the stronghold was built on credit, and its price is Freia, goddess of youth, whom Wotan never truly means to pay. Wagner's radiant, brass-crowned Valhalla theme swells over a bargain the gods cannot honour, a monument of glory shadowed from its first note by the debt that erected it.",
          "source": "Richard Wagner, Das Rheingold, WWV 86A (score, IMSLP)",
          "href": "https://imslp.org/wiki/Das_Rheingold,_WWV_86A_(Wagner,_Richard)"
        }
      ],
      "rank": 23
    },
    {
      "slug": "bayeux-tapestry-british-museum-record",
      "headline": "Bayeux Tapestry loan sells out in a day, breaking the British Museum's ticket record",
      "overview": "Tickets for the Bayeux Tapestry's landmark loan to the British Museum sold out within 24 hours, with up to 80,000 people queuing online at once and waits reaching nine hours, the museum said in early July 2026. The 230-foot embroidery depicting the 1066 Norman Conquest will be shown in London from September 10, 2026 to July 2027, its first time out of France in nearly a thousand years. The museum expects some 7.5 million visitors across the run.",
      "genre": "Culture",
      "sources": [
        {
          "name": "Artforum",
          "href": "https://www.artforum.com/news/bayeux-tapestry-breaks-ticket-sale-record-british-museum-1234754133/"
        },
        {
          "name": "Google News",
          "href": "https://news.google.com/rss/search?q=Bayeux%20Tapestry%20British%20Museum%20ticket%20record%20loan&hl=en-US&gl=US&ceid=US:en"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-07",
      "image": {
        "src": "/covers/bayeux-tapestry-british-museum-record.png",
        "alt": "A detail of the medieval Bayeux Tapestry showing Norman cavalry and men-at-arms embroidered in wool on linen",
        "credit": "Wikimedia Commons"
      },
      "edition": "Evening Edition · 7 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "The Norman Conquest itself, as recorded in the Anglo-Saxon Chronicle (1066)",
          "excerpt": "Meantime Earl William came up from Normandy into Pevensey on the eve of St. Michael's mass; and soon after his landing was effected, they constructed a castle at the port of Hastings.... There was slain King Harold, and Leofwin his brother, and Earl Girth his brother, with many good men; and the Frenchmen gained the field of battle, as God granted them for the sins of the nation.",
          "source": "The Anglo-Saxon Chronicle, entry for A.D. 1066 (trans. Rev. J. Ingram, 1823)",
          "href": "https://saxonhistory.co.uk/Battle_of_Hastings_1066AD_Anglo_Saxon_Chronicles.php"
        },
        {
          "category": "historical",
          "title": "The Mona Lisa's only voyage to America (1963)",
          "excerpt": "In January 1963 Leonardo's Mona Lisa crossed the Atlantic for the only time in her life, and the United States queued as if for a coronation. At the Metropolitan Museum a single day drew a record 63,675 visitors filing past the little panel behind glass; more than a million saw her in New York, with over half a million more in Washington before that. A French icon nearly five centuries old, lent for one season, turned the simple act of looking at a picture into a national pilgrimage.",
          "source": "\"Mona Lisa exhibition, United States\" — Wikipedia",
          "href": "https://en.wikipedia.org/wiki/Mona_Lisa_exhibition,_United_States"
        },
        {
          "category": "literary",
          "title": "Helen weaves the war into a tapestry (Homer, Iliad, Book 3)",
          "excerpt": "She found Helen in the hall, where she was weaving a great purple web of double fold, and thereon was broidering many battles of the horse-taming Trojans and the brazen-coated Achaeans, that for her sake they had endured at the hands of Ares.",
          "source": "Homer, Iliad, Book 3, lines 125-128 (trans. A. T. Murray, Loeb Classical Library, 1924)",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0134:book=3:card=111"
        },
        {
          "category": "literary",
          "title": "Taillefer sings before the battle (Wace, Roman de Rou)",
          "excerpt": "Then Taillefer who sang right well, rode mounted on a swift horse before the duke, singing of Karlemaine, and of Rollant, of Oliver and the vassals who died in Renchevals.",
          "source": "Wace, Roman de Rou, in Master Wace, His Chronicle of the Norman Conquest (trans. Edgar Taylor, 1837)",
          "href": "https://archive.org/details/masterwacehischr00waceuoft"
        },
        {
          "category": "artistic",
          "title": "Halley's Comet blazes over the Conquest (Bayeux Tapestry, Scene 32)",
          "excerpt": "High in the tapestry's upper border a blazing star streaks across the linen: Halley's Comet, worked in wool as a huddle of men crane their necks and point in alarm, while below the omen is carried to the newly crowned Harold on his throne. It is the earliest known depiction of the comet, embroidered around 1070 as a portent of the conquest to come — a woven newsreel of 1066, stitched along a strip of cloth some 230 feet long.",
          "source": "Bayeux Tapestry, Scene 32 (11th century) — Wikimedia Commons",
          "href": "https://commons.wikimedia.org/wiki/File:Bayeux_Tapestry_scene32_Halley_comet.jpg",
          "image": {
            "src": "/covers/bayeux-tapestry-british-museum-record--art.png",
            "alt": "Scene 32 of the Bayeux Tapestry: a group of onlookers point up at Halley's Comet blazing in the border above them, an omen before the Norman Conquest.",
            "credit": "Bayeux Tapestry scene (11th c.), Halley's Comet (Scene 32) — public domain via Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "William Walton scores a Channel-crossing conquest (Henry V, 1944)",
          "excerpt": "For Laurence Olivier's wartime Henry V, William Walton scored an English king's Channel crossing to conquer in France — the mirror image of 1066 — and turned Shakespeare's chronicle into sound. Beneath the fifteen-minute Agincourt charge his strings gather and swell like a chronicle woven in music, medieval marching tunes braided into a modern orchestra. Composed as a morale-booster in the last years of the Second World War, it remains one of the great British film scores, its concert suite still performed today.",
          "source": "\"Suite from Henry V\" (William Walton, 1944) — Wikipedia",
          "href": "https://en.wikipedia.org/wiki/Suite_from_Henry_V"
        }
      ],
      "rank": 24
    },
    {
      "slug": "kere-tum-munich-vertical-kindergarten",
      "headline": "Francis Kéré's studio completes an all-timber 'vertical playground' kindergarten in Munich",
      "overview": "Kéré Architecture, led by Pritzker laureate Diébédo Francis Kéré, has completed Kinderoase an der TUM, a kindergarten on the Technical University of Munich campus built almost entirely from timber and clad in weathered steel slats. Its 1,540 square metres of rooms are linked by a circular stair and internal slides, with a rooftop terrace nicknamed the \"meadow in the sky.\" The multi-level playground sits at the front to buffer street noise; Kéré said play is the core of the design.",
      "genre": "Culture",
      "sources": [
        {
          "name": "Dezeen",
          "href": "https://www.dezeen.com/2026/07/07/kere-architecture-kinderoase-an-der-tum-munich/"
        },
        {
          "name": "Google News",
          "href": "https://news.google.com/rss/search?q=Kere%20Architecture%20Kinderoase%20TUM%20Munich%20kindergarten&hl=en-US&gl=US&ceid=US:en"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-07",
      "image": {
        "src": "/covers/kere-tum-munich-vertical-kindergarten.png",
        "alt": "A top-heavy timber kindergarten clad in angular weathered-steel slats rising above a quiet university street at golden hour",
        "credit": "AI-generated"
      },
      "edition": "Evening Edition · 7 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Froebel Invents the Kindergarten and Declares Play the Highest Phase of Childhood (1837)",
          "excerpt": "Play is the highest phase of child-development—of human development at this period; for it is self-active representation of the inner—representation of the inner from inner necessity and impulse.... As already indicated, play at this time is not trivial, it is highly serious and of deep significance. Cultivate and foster it, O mother; protect and guard it, O father!",
          "source": "Friedrich Froebel, The Education of Man (trans. W. N. Hailmann, 1887), §30 — the founder of the “kindergarten” (1837)",
          "href": "https://archive.org/details/educationofman00fruoft"
        },
        {
          "category": "historical",
          "title": "Aldo van Eyck Turns Bombed-Out Amsterdam Into 734 Playgrounds (1947–1978)",
          "excerpt": "Where the war had left rubble and empty lots, the architect saw a chance to give the city back to its children. Beginning with a single sandpit and climbing arch at the Bertelmanplein, van Eyck seeded more than seven hundred playgrounds across postwar Amsterdam—abstract tumbling bars, domes and stepping stones that asked the body to climb, balance and leap. His “starry sky” of play spaces argued, like Kéré’s vertical kindergarten, that a building or a square is only finished when a child is moving through it.",
          "source": "Aldo van Eyck’s Playgrounds: Aesthetics, Affordances, and Creativity, Frontiers in Psychology (2017)",
          "href": "https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2017.01130/full"
        },
        {
          "category": "literary",
          "title": "Schiller: “Man Is Only Completely a Man When He Plays” (1795)",
          "excerpt": "For, to speak out once for all, man only plays when in the full meaning of the word he is a man, and he is only completely a man when he plays. This proposition, which at this moment perhaps appears paradoxical, will receive a great and deep meaning if we have advanced far enough to apply it to the twofold seriousness of duty and of destiny.",
          "source": "Friedrich Schiller, Letters on the Aesthetic Education of Man, Letter XV",
          "href": "https://monadnock.net/schiller/letter-15.html"
        },
        {
          "category": "literary",
          "title": "Robert Louis Stevenson Builds a World From Blocks (1885)",
          "excerpt": "What are you able to build with your blocks?\nCastles and palaces, temples and docks.\nRain may keep raining, and others go roam,\nBut I can be happy and building at home.\n\nLet the sofa be mountains, the carpet be sea,\nThere I'll establish a city for me:\nA kirk and a mill and a palace beside,\nAnd a harbour as well where my vessels may ride.",
          "source": "Robert Louis Stevenson, “Block City,” A Child’s Garden of Verses (1885)",
          "href": "https://en.wikisource.org/wiki/A_Child%27s_Garden_of_Verses/Block_City"
        },
        {
          "category": "artistic",
          "title": "Bruegel’s Children’s Games: A Whole Town Given Over to Play (1560)",
          "excerpt": "Bruegel fills an entire town square with children and nothing but children—more than eighty games unfolding at once. They roll hoops, walk on stilts, ride hobby-horses, turn cartwheels and play leapfrog across a stage emptied of adults, as if the city itself had been handed over to play. Painted almost five centuries before Kéré’s slides and rooftop meadow, it treats children’s movement as the serious, teeming business of the world.",
          "source": "Pieter Bruegel the Elder, Children’s Games (1560), Kunsthistorisches Museum, Vienna",
          "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_the_Elder_-_Children%E2%80%99s_Games_-_Google_Art_Project.jpg",
          "image": {
            "src": "/covers/kere-tum-munich-vertical-kindergarten--art.png",
            "alt": "A crowded 16th-century town square filled entirely with children playing dozens of different games—rolling hoops, walking stilts, riding hobby-horses and turning cartwheels.",
            "credit": "Pieter Bruegel the Elder, Children’s Games (1560), Kunsthistorisches Museum, Vienna — public domain via Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "Schumann’s Kinderszenen: Scenes From Childhood at the Keyboard (1838)",
          "excerpt": "Schumann’s thirteen miniatures are not music for children but music about them, remembered by an adult looking back. Tiny scenes—“Catch Me,” “Knight of the Hobby-Horse,” the famous dreaming “Träumerei”—turn the games and reveries of a child into a suite of the tenderest gravity. Like Kéré’s kindergarten, the cycle insists that play is worth building an entire architecture around.",
          "source": "Robert Schumann, Kinderszenen (Scenes from Childhood), Op. 15 (1838)",
          "href": "https://imslp.org/wiki/Kinderszenen,_Op.15_(Schumann,_Robert)"
        }
      ],
      "rank": 25
    },
    {
      "slug": "zwo-astronomy-photographer-2026-shortlist",
      "headline": "Royal Observatory Greenwich reveals its 2026 Astronomy Photographer of the Year shortlist",
      "overview": "The Royal Observatory Greenwich unveiled the shortlist for its ZWO Astronomy Photographer of the Year 2026 competition in early July, drawn from more than 4,000 images by 769 photographers across 66 countries. Shortlisted pictures range from aurorae over Norway and Iceland to the Andromeda galaxy and comet C/2025 A6 above the Swiss Alps, including a solar-flare image by a 14-year-old. Winners will be announced on September 17, with a public exhibition opening at London's National Maritime Museum.",
      "genre": "Science",
      "sources": [
        {
          "name": "Colossal",
          "href": "https://www.thisiscolossal.com/2026/07/zwo-astronomy-photographer-of-the-year-2026-shortlist/"
        },
        {
          "name": "Google News",
          "href": "https://news.google.com/rss/search?q=Astronomy%20Photographer%20of%20the%20Year%202026%20shortlist%20Royal%20Observatory&hl=en-US&gl=US&ceid=US:en"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-07",
      "image": {
        "src": "/covers/zwo-astronomy-photographer-2026-shortlist.png",
        "alt": "Towering columns of interstellar gas and dust in the Eagle Nebula glowing against the dark of deep space, the 'Pillars of Creation'",
        "credit": "NASA, ESA / Hubble — public domain via Wikimedia Commons"
      },
      "edition": "Evening Edition · 7 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Galileo, Sidereus Nuncius (The Starry Messenger), 1610",
          "excerpt": "it is full of inequalities, uneven, full of hollows and protuberances, just like the surface of the Earth itself, which is varied everywhere by lofty mountains and deep valleys.",
          "source": "Galileo Galilei, Sidereus Nuncius (1610), Edward Stafford Carlos translation (1880)",
          "href": "https://sidereusnuncius.org/"
        },
        {
          "category": "historical",
          "title": "John William Draper's daguerreotype of the Moon, 1840 — the first astrophotograph",
          "excerpt": "On the night of 26 March 1840, from a rooftop observatory at New York University, John William Draper trained two lenses on a seventeen-day-old Moon and held the plate open for some twenty minutes. The silvered copper came back etched with real craters and seas — the first photograph of a celestial body, and the moment humanity's gaze at the heavens became a record that could be kept.",
          "source": "John William Draper — Wikipedia; NYU Division of Libraries, 'The John Draper Lunar Daguerreotype'",
          "href": "https://en.wikipedia.org/wiki/John_William_Draper"
        },
        {
          "category": "literary",
          "title": "Walt Whitman, \"When I Heard the Learn'd Astronomer\" (1865)",
          "excerpt": "When I heard the learn'd astronomer,\nWhen the proofs, the figures, were ranged in columns before me,\nWhen I sitting heard the astronomer where he lectured with much applause in the lecture-room,\nHow soon unaccountable I became tired and sick,\nTill rising and gliding out I wander'd off by myself,\nIn the mystical moist night-air, and from time to time,\nLook'd up in perfect silence at the stars.",
          "source": "Walt Whitman, Leaves of Grass — via Wikisource",
          "href": "https://en.wikisource.org/wiki/When_I_Heard_the_Learn'd_Astronomer"
        },
        {
          "category": "literary",
          "title": "Dante, Paradiso, Canto XXXIII (closing lines), c. 1320",
          "excerpt": "Here vigour failed the lofty fantasy:\nBut now was turning my desire and will,\nEven as a wheel that equally is moved,\n\nThe Love which moves the sun and the other stars.",
          "source": "Dante Alighieri, The Divine Comedy, trans. Henry Wadsworth Longfellow (1867) — via Wikisource",
          "href": "https://en.wikisource.org/wiki/Divine_Comedy_(Longfellow_1867)/Volume_3/Canto_33"
        },
        {
          "category": "artistic",
          "title": "Vincent van Gogh, The Starry Night (1889)",
          "excerpt": "From the barred window of his asylum room at Saint-Rémy, Van Gogh painted the pre-dawn sky from memory: a swirling current of blue drawing eleven flaming stars and a hooked crescent moon over a sleeping village. The heavens churn with a life the quiet town below cannot see — a painter's answer to the same impulse that sends photographers out under the dark to capture what the night holds.",
          "source": "Vincent van Gogh, The Starry Night (1889), Museum of Modern Art, New York — public domain via Wikimedia Commons",
          "href": "https://commons.wikimedia.org/wiki/File:VanGogh-starry_night_ballance1.jpg",
          "image": {
            "src": "/covers/zwo-astronomy-photographer-2026-shortlist--art.png",
            "alt": "Van Gogh's The Starry Night: a swirling blue night sky filled with glowing stars and a crescent moon above a quiet village with a tall cypress in the foreground.",
            "credit": "Vincent van Gogh, The Starry Night (1889), Museum of Modern Art, New York — public domain via Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "Gustav Holst, The Planets, Op. 32 (1914–1917)",
          "excerpt": "Holst's seven-movement orchestral suite gives each planet a character — the hammering menace of 'Mars, the Bringer of War,' the serene radiance of 'Venus,' the wordless women's chorus fading into silence at the edge of 'Neptune, the Mystic.' It is the cosmos rendered as sound, a composer reaching for the same awe the night sky stirs in anyone who looks up.",
          "source": "Gustav Holst, The Planets, Op. 32 — full score via IMSLP / Petrucci Music Library",
          "href": "https://imslp.org/wiki/The_Planets,_Op.32_(Holst,_Gustav)"
        }
      ],
      "rank": 26
    },
    {
      "slug": "damascus-explosions-macron-visit",
      "headline": "Two bombs wound 18 in Damascus as Macron visits, the first Western leader in post-Assad Syria",
      "overview": "Two improvised bombs—one in a parked car, one in a rubbish bin—exploded near the Four Seasons hotel in Damascus on July 7, 2026, while French President Emmanuel Macron visited post-Assad Syria, wounding 18 people including four police officers, Syrian officials said. Macron, the first major Western leader to travel to Syria since Bashar al-Assad's fall, was unharmed and pressed on to meet President Ahmed al-Sharaa; the Élysée said his visit continued as planned. The blasts followed a café bombing days earlier that authorities blamed on remnants of the former regime.",
      "genre": "Conflict",
      "sources": [
        {
          "name": "AP News",
          "href": "https://news.google.com/rss/articles/CBMioAFBVV95cUxQaGs3bERCUG5QQkh4RmFEUDVnelFCTFEtdF9uUmNqbUJTLUJCTVBpbmhNN2dXTHBZZXQyVjQwNXd6Z0pUY0ZqU1RKQXlnSzJ5NlNKVjR1cl9rc0RIT3BRQ2UyR3VEbk5HWmtsdjljT3QxRENmZGtKX0N1QTVIWHBCZ2xqTWxQQWR5ZXIwTnRsNVJEOTAzWkVUN0NNSEJmN2hw?oc=5"
        },
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMirAFBVV95cUxOLWRETjVnbTljM3FIcDF1U0tESGJmVnVQSTBqemxJOUhKMUgtalFLcFVTOE9WSXB0SmJJSjZnSnhSOTBWajhqV0trX3dNSnlHdnVZNEh1ZVpFTnhlZXdSWWhGUTgyNHJ2Tm1pd05zQ1JOeFlFYXFkQlB6N2h0WkV0N0x2cEtjLVdTeXBHVEttY2o1aEZlRmFsaHlsUkNsUlZXMVFRM2g2X2FvOC02?oc=5"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-07",
      "image": {
        "src": "/covers/damascus-explosions-macron-visit.png",
        "alt": "A thin column of grey smoke rising above the pale stone rooftops and minarets of an old Middle Eastern city, an official black state car on an empty boulevard below",
        "credit": "AI-generated"
      },
      "lead": true,
      "edition": "Afternoon Edition · 7 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Harmodius and Aristogeiton slay Hipparchus during the Panathenaic festival (Thucydides)",
          "excerpt": "they rushed, as they were, within the gates, and meeting with Hipparchus by the Leocorium recklessly fell upon him at once, infuriated, Aristogiton by love, and Harmodius by insult, and smote him and slew him.",
          "source": "Thucydides, History of the Peloponnesian War, Book VI (trans. Richard Crawley), Wikisource",
          "href": "https://en.wikisource.org/wiki/History_of_the_Peloponnesian_War/Book_6"
        },
        {
          "category": "historical",
          "title": "Napoleon escapes the 'infernal machine' bomb on his way to the opera, 24 December 1800 (Bourrienne's Memoirs)",
          "excerpt": "the First Consul, on his way to the opera, had narrowly escaped being assassinated in the Rue St. Nicaise by the explosion of a barrel of gunpowder, the concussion of which had shattered the windows of his carriage.",
          "source": "Louis Antoine Fauvelet de Bourrienne, Memoirs of Napoleon Bonaparte — Volume 05, Project Gutenberg",
          "href": "https://www.gutenberg.org/cache/epub/3555/pg3555-images.html"
        },
        {
          "category": "literary",
          "title": "Agamemnon struck down on his homecoming (Aeschylus, Agamemnon)",
          "excerpt": "Alas! I am struck deep with a mortal blow!",
          "source": "Aeschylus, Agamemnon, line 1343 (trans. Herbert Weir Smyth), Perseus Digital Library",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0004:card=1343"
        },
        {
          "category": "literary",
          "title": "Macbeth on murdering Duncan, his guest and king (Shakespeare, Macbeth, Act I, Scene 7)",
          "excerpt": "He's here in double trust: First, as I am his kinsman and his subject, Strong both against the deed; then, as his host, Who should against his murderer shut the door, Not bear the knife myself.",
          "source": "William Shakespeare, Macbeth, Act I, Scene 7, Project Gutenberg",
          "href": "https://www.gutenberg.org/files/1533/1533-h/1533-h.htm"
        },
        {
          "category": "artistic",
          "title": "The Death of Julius Caesar (Vincenzo Camuccini, c. 1804–1806)",
          "excerpt": "Camuccini's vast neoclassical canvas freezes the instant of political murder: Caesar recoils in his red robe as a knot of senators, daggers flashing, presses in beneath the cold columns of the Senate. Completed around 1804–1806, it stages an act of treachery at the very heart of power as marble-hard theatre, the ruler undone amid the men who had surrounded him.",
          "source": "Vincenzo Camuccini, 'The Death of Julius Caesar', Galleria Nazionale d'Arte Moderna, Rome — Wikimedia Commons",
          "href": "https://commons.wikimedia.org/wiki/File:Vincenzo_Camuccini_-_La_morte_di_Cesare.jpg",
          "image": {
            "src": "/covers/damascus-explosions-macron-visit--art.png",
            "alt": "Neoclassical painting of the assassination of Julius Caesar, senators wielding daggers closing around him in the Roman Senate",
            "credit": "Vincenzo Camuccini, The Death of Julius Caesar (c. 1804–1806), Galleria Nazionale d'Arte Moderna, Rome — public domain via Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "Un ballo in maschera (Giuseppe Verdi, 1859)",
          "excerpt": "Verdi's opera dramatizes a ruler struck down amid festivity: the governor Riccardo is stabbed at a glittering masked ball, betrayed by a trusted friend even as music and dancing whirl around him. Based on the real assassination of Sweden's King Gustav III, its climax fuses celebration and bloodshed, an intimate act of treachery turning a night of revelry into regicide.",
          "source": "Giuseppe Verdi, Un ballo in maschera (1859), full score (Milan: Ricordi), IMSLP",
          "href": "https://imslp.org/wiki/Un_ballo_in_maschera_(Verdi,_Giuseppe)"
        }
      ],
      "rank": 27
    },
    {
      "slug": "zelensky-nato-air-defence-appeal",
      "headline": "Zelensky to press NATO for air defences at Ankara summit after Russian strikes kill dozens in Kyiv",
      "overview": "President Volodymyr Zelensky said on July 7, 2026, that he will use this week's NATO summit in Ankara to press allies for more air-defence systems and interceptor missiles, after two Russian barrages on Kyiv in under a week killed more than 50 civilians. In the latest assault Russia fired 68 missiles and 351 drones, damaging residential blocks at more than 10 sites across the capital, Zelensky said. He also plans to meet U.S. President Donald Trump to argue that the attacks show Russian weakness, not strength.",
      "genre": "Conflict",
      "sources": [
        {
          "name": "BBC News",
          "href": "https://www.bbc.co.uk/news/articles/c9d227e5zj6o"
        },
        {
          "name": "TIME",
          "href": "https://time.com/article/2026/07/06/ukraine-russia-attack-zelensky-nato-summit-request-trump-putin/"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-07",
      "image": {
        "src": "/covers/zelensky-nato-air-defence-appeal.png",
        "alt": "The scarred facade of a tall apartment block at dawn, rows of blown-out windows and a plume of grey smoke rising into a pale sky",
        "credit": "AI-generated"
      },
      "edition": "Afternoon Edition · 7 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "The Corcyraeans beg Athens for an alliance (433 BCE)",
          "excerpt": "Men of Athens, it is but justice that such as come to implore the aid of their neighbours (as now do we), and cannot pretend by any great benefit or league some precedent merit, should, before they go any farther, make it appear, principally, that what they seek conferreth profit",
          "source": "Thucydides, History of the Peloponnesian War 1.32 (trans. Hobbes), Perseus Digital Library",
          "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0247:book=1:chapter=32"
        },
        {
          "category": "historical",
          "title": "Besieged Saguntum sends envoys to Rome for help (219 BCE)",
          "excerpt": "the Saguntines sent a deputation to Rome to beg for help in a war which was inevitably approaching.",
          "source": "Livy, History of Rome 21.6 (trans. Roberts), Perseus Digital Library",
          "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0144:book=21:chapter=6"
        },
        {
          "category": "literary",
          "title": "The beleaguered city on the Shield of Achilles",
          "excerpt": "But around the other city lay in leaguer two hosts of warriors gleaming in armour.",
          "source": "Homer, Iliad 18.509 ff. (trans. A. T. Murray), Perseus Digital Library",
          "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0134:book=18:card=509"
        },
        {
          "category": "literary",
          "title": "Byron: an overwhelming host descends on the capital",
          "excerpt": "The Assyrian came down like the wolf on the fold, / And his cohorts were gleaming in purple and gold;",
          "source": "Lord Byron, 'The Destruction of Sennacherib' (Hebrew Melodies, 1815), Wikisource",
          "href": "https://en.wikisource.org/wiki/The_Works_of_Lord_Byron_(ed._Coleridge,_Prothero)/Poetry/Volume_3/Hebrew_Melodies/The_Destruction_of_Sennacherib"
        },
        {
          "category": "artistic",
          "title": "Goya: civilians slaughtered by military force",
          "excerpt": "Goya's night scene freezes the instant before a firing squad of faceless soldiers cuts down unarmed civilians; a white-shirted man throws his arms wide in a cruciform plea as a single lantern glares on the heaped dead. It is the archetypal image of ordinary people killed by an occupying army, a captured city's inhabitants dying in the dark.",
          "source": "Francisco de Goya, 'The Third of May 1808' (1814), Museo del Prado; via Wikimedia Commons",
          "href": "https://commons.wikimedia.org/wiki/File:El_tres_de_mayo_de_1808_en_Madrid.jpg",
          "image": {
            "src": "/covers/zelensky-nato-air-defence-appeal--art.png",
            "alt": "Goya's painting The Third of May 1808: a firing squad of soldiers executes unarmed civilians at night, one man in a white shirt flinging his arms wide.",
            "credit": "Francisco de Goya, The Third of May 1808 (1814), Museo del Prado. Public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "Tchaikovsky's 1812 Overture: a capital bombarded and delivered",
          "excerpt": "Tchaikovsky stages the 1812 invasion as sound: a hymn for an imperiled Russia, the intruding strains of 'La Marseillaise' swelling as the enemy nears the capital, and finally the thunder of cannon and pealing bells as Moscow's defenders drive the invader back. It is a whole nation's ordeal of bombardment and deliverance rendered in orchestral fire.",
          "source": "Pyotr Ilyich Tchaikovsky, 1812 Overture (Festival Overture), Op. 49 (1880), IMSLP / Petrucci Music Library",
          "href": "https://imslp.org/wiki/1812_Overture,_Op.49_(Tchaikovsky,_Pyotr)"
        }
      ],
      "rank": 28
    },
    {
      "slug": "indonesia-india-brahmos-deal",
      "headline": "Indonesia signs a BrahMos supersonic-missile deal with India during Modi's Jakarta visit",
      "overview": "Indonesia and India signed a contract for the BrahMos supersonic cruise missile on July 7, 2026, announced in Jakarta during Prime Minister Narendra Modi's visit, making Indonesia the third foreign buyer of the system after the Philippines and Vietnam. India will also supply Astra air-to-air missiles under the accompanying defence agreements. Neither side disclosed the contract's value, the number of missiles or the delivery timeline.",
      "genre": "Politics",
      "sources": [
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMiugFBVV95cUxPVXhWajhVazNKZjZrWnc0dTVQcmw5NzlCV2xqOVNwdS14dGpZWE9yRzVJWHllNDJraUZCQWNWVzhaRWhEa3JOYlRxMTdQZVZ4MzhsQk44NlBiOF9xaVREZTdPVGFmUmJyYkgyQXl1Y08zQnEydnpFcXlwQkk5SGxKNEJfMEkwODI1Q1k5ZmpmM1ZxakhyQ1FKSWI4bXZ2NEtOZUNCTFhqNlNTUjZlSDhxLUxjVzRramdtM3c?oc=5"
        },
        {
          "name": "Naval News",
          "href": "https://www.navalnews.com/naval-news/2026/07/indonesia-signs-brahmos-missile-deal-with-india/"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-07",
      "image": {
        "src": "/covers/indonesia-india-brahmos-deal.png",
        "alt": "A single sleek supersonic cruise missile mounted on a green military transporter-launcher on an open coastal plain at golden hour",
        "credit": "AI-generated"
      },
      "edition": "Afternoon Edition · 7 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Jonathan gives David his sword and bow, sealing their covenant (1 Samuel 18)",
          "excerpt": "Then Jonathan and David made a covenant, because he loved him as his own soul. And Jonathan stripped himself of the robe that was upon him, and gave it to David, and his garments, even to his sword, and to his bow, and to his girdle.",
          "source": "Bible (King James Version), 1 Samuel 18:3–4, Wikisource",
          "href": "https://en.wikisource.org/wiki/Bible_(King_James)/1_Samuel"
        },
        {
          "category": "historical",
          "title": "The Treaty of Alliance between the United States and France (1778)",
          "excerpt": "The essential and direct End of the present defensive alliance is to maintain effectually the liberty, Sovereignty, and independance absolute and unlimited of the said united States, as well in Matters of Gouvernement as of commerce.",
          "source": "Treaty of Alliance with France (1778), Article 2, U.S. National Archives",
          "href": "https://www.archives.gov/milestone-documents/treaty-of-alliance-with-france"
        },
        {
          "category": "literary",
          "title": "Glaucus and Diomedes exchange armour in guest-friendship (Iliad, Book VI)",
          "excerpt": "When they had thus spoken, the twain leapt down from their chariots and clasped each other's hands and pledged their faith. ... And then from Glaucus did Zeus, son of Cronos, take away his wit, seeing he made exchange of armour with Diomedes, son of Tydeus, giving golden for bronze, the worth of an hundred oxen for the worth of nine.",
          "source": "Homer, The Iliad (A. T. Murray trans.), Book VI, Wikisource",
          "href": "https://en.wikisource.org/wiki/The_Iliad_(Murray)/Book_VI"
        },
        {
          "category": "literary",
          "title": "Venus delivers the god-forged arms to Aeneas (Aeneid, Book VIII)",
          "excerpt": "She said: And having first her Son embrac'd; / The radiant Arms beneath an Oak she plac'd. / Proud of the Gift, he rowl'd his greedy sight / Around the Work, and gaz'd with vast delight, / He lifts, he turns, he poizes, and admires / The Crested Helm, that vomits radiant Fires:",
          "source": "Virgil, The Works of Virgil (Dryden trans.), Aeneid, Book VIII, Wikisource",
          "href": "https://en.wikisource.org/wiki/The_Works_of_Virgil_(Dryden)/Aeneid/Book_VIII"
        },
        {
          "category": "artistic",
          "title": "Diego Velázquez, The Forge of Vulcan (La Fragua de Vulcano), 1630",
          "excerpt": "At the smithy of Vulcan the hammers fall still and the armour glows: the workshop of fire and steel where the weapons of gods and heroes are forged, an image of friendship and war shaped in molten metal.",
          "source": "Diego Velázquez, La Fragua de Vulcano (1630), Museo del Prado, via Wikimedia Commons",
          "href": "https://commons.wikimedia.org/wiki/File:Vel%C3%A1zquez_-_La_Fragua_de_Vulcano_(Museo_del_Prado,_1630).jpg",
          "image": {
            "src": "/covers/indonesia-india-brahmos-deal--art.png",
            "alt": "Apollo standing amid Vulcan and his workmen at the forge, armour and weapons being wrought in fire",
            "credit": "Diego Velázquez (1599–1660), Museo del Prado, Madrid; public domain via Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "Handel, 'Arm, arm ye brave!' from the oratorio Judas Maccabaeus (HWV 63)",
          "excerpt": "Arm, arm ye brave!",
          "source": "George Frideric Handel, Judas Maccabaeus, HWV 63, Part I, No.9 Aria, IMSLP",
          "href": "https://imslp.org/wiki/Judas_Maccabaeus,_HWV_63_(Handel,_George_Frideric)"
        }
      ],
      "rank": 29
    },
    {
      "slug": "trump-f35-jets-turkey",
      "headline": "Trump signals he will back selling F-35 stealth jets to Turkey during his Ankara visit",
      "overview": "President Donald Trump is expected to throw his support behind selling F-35 stealth fighter jets to Turkey during a NATO summit visit to Ankara, in his biggest gesture yet to President Recep Tayyip Erdogan, sources said on July 7, 2026. Turkey was expelled from the F-35 program in 2020 after buying Russian S-400 air-defence systems, and CAATSA sanctions plus a congressional ban still stand. Israeli Prime Minister Benjamin Netanyahu opposes the sale, warning it could upset the regional balance.",
      "genre": "Politics",
      "sources": [
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMiyAFBVV95cUxQemNEWDl5ZDlwZkE2b3FaTmdrOWQ2QnZ2QnREZlQyOER3cFJ4aEQyNTA5dk93Y25hQnFQeXpaLUptR012ZXpZNFR6bmd2dUdFMUhaN3ZKa01FRFNGS2YxUkIzSV9OSVpuUUtEWnRLUHkzaDJjdlJvY3VzLTRrX01SYjZNRTF0U3c4T19lRllBN2FQRC16SDdlWFN5b003NHVDUmU3cXVhOWc3XzMya291d1J6Nklfc2NNUmE1alVMYkNSMXJka29Ibg?oc=5"
        },
        {
          "name": "Haaretz",
          "href": "https://www.haaretz.com/israel-news/israel-security/2026-07-07/ty-article/report-trump-to-allow-turkey-to-purchase-u-s-f-35-planes-defying-netanyahu/0000019f-3b2b-d07c-af9f-fb7f5b260000"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-07",
      "image": {
        "src": "/covers/trump-f35-jets-turkey.png",
        "alt": "A single sleek grey stealth fighter jet parked on an empty runway at dusk under a dramatic cloudy sky, low golden light on its angular fuselage",
        "credit": "AI-generated"
      },
      "edition": "Afternoon Edition · 7 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Cyrus the Younger's royal gift of a gold scimitar to Syennesis of Cilicia (c. 401 BCE)",
          "excerpt": "Cyrus presented him with the customary royal gifts—to wit, a horse with a gold bit, a necklace of gold, a gold bracelet, and a gold scimitar, a Persian dress, and lastly, the exemption of his territory from further pillage, with the privilege of taking back the slaves that had been seized, wherever they might chance to come upon them.",
          "source": "Xenophon, Anabasis, Book I (trans. H. G. Dakyns), Project Gutenberg",
          "href": "https://www.gutenberg.org/files/1170/1170-h/1170-h.htm"
        },
        {
          "category": "historical",
          "title": "The Treaty of Alliance between France and the United States (1778)",
          "excerpt": "The essential and direct End of the present defensive alliance is to maintain effectually the liberty, Sovereignty, and independance absolute and unlimited of the said united States, as well in Matters of Gouvernement as of commerce.",
          "source": "Treaty of Alliance Between the United States and France, 1778; The Avalon Project, Yale Law School",
          "href": "https://avalon.law.yale.edu/18th_century/fr1788-2.asp"
        },
        {
          "category": "literary",
          "title": "Hephaestus forges new armour for Achilles at the plea of Thetis (Iliad, Book 18)",
          "excerpt": "Be of good cheer, neither let these things distress thy heart. Would that I might so surely avail to hide him afar from dolorous death, when dread fate cometh upon him, as verily goodly armour shall be his, such that in aftertime many a one among the multitude of men shall marvel, whosoever shall behold it.",
          "source": "Homer, Iliad 18.463-467 (trans. A. T. Murray), Perseus Digital Library, Tufts University",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0134%3Abook%3D18"
        },
        {
          "category": "literary",
          "title": "Arthur receives Excalibur from the Lady of the Lake (Le Morte d'Arthur, Book I)",
          "excerpt": "in the midst of the lake Arthur was ware of an arm clothed in white samite, that held a fair sword in that hand. Lo! said Merlin, yonder is that sword that I spake of.",
          "source": "Sir Thomas Malory, Le Morte d'Arthur, Vol. I, Book I, Ch. XXV, Wikisource",
          "href": "https://en.wikisource.org/wiki/Le_Morte_d'Arthur/Volume_I/Book_I/Chapter_XXV"
        },
        {
          "category": "artistic",
          "title": "Anthony van Dyck, Thetis Receiving Armour for Achilles from Hephaestus (c. 1630-1632)",
          "excerpt": "Van Dyck stages the divine transaction as a dazzling exchange of favour: the sea-goddess Thetis reaches for the gleaming shield and helmet that the fire-god has forged for her son, the smoky forge behind them yielding to the cold brilliance of the new-made arms. The coveted weapon, handed from a greater power to secure a mortal's fortunes in war, becomes the very emblem of patronage and obligation. The canvas hangs in the Bildergalerie of Sanssouci, Potsdam.",
          "source": "Wikimedia Commons (Bildergalerie Sanssouci, Potsdam); public domain",
          "href": "https://commons.wikimedia.org/wiki/File:Dyck,_Anthony_van_-_Thetis_receiving_armour_for_Achilles_from_Hephaestus_-_Bildergalerie_Sanssouci.jpeg",
          "image": {
            "src": "/covers/trump-f35-jets-turkey--art.png",
            "alt": "Thetis reaching to receive the newly forged shield and armour of Achilles from Hephaestus in his forge",
            "credit": "Anthony van Dyck (1599-1641), Thetis Receiving Armour for Achilles from Hephaestus, c. 1630-1632, Bildergalerie Sanssouci, Potsdam; public domain via Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "Richard Wagner, Siegfried, Act I Forging Song 'Nothung! Nothung! Neidliches Schwert!' (1876)",
          "excerpt": "In the climax of the first act of Wagner's Siegfried, the young hero reforges the shattered blade Nothung, hammering the shards of the fabled sword back into a weapon of destiny as the orchestra blazes with the anvil's ringing rhythm. The scene turns the making of a great weapon into a rite of power and inheritance, a blade coveted because it alone can slay the dragon and unlock a kingdom. The full score is freely available in the public domain.",
          "source": "Richard Wagner, Siegfried, WWV 86C (full score, Mainz: Schott, 1876), IMSLP / Petrucci Music Library",
          "href": "https://imslp.org/wiki/Siegfried,_WWV_86C_(Wagner,_Richard)"
        }
      ],
      "rank": 30
    },
    {
      "slug": "meta-states-1-4-trillion-youth-trial",
      "headline": "Meta says U.S. states are seeking $1.4 trillion in penalties in an August youth-safety trial",
      "overview": "Meta said in a court filing on July 7, 2026, that four U.S. states—California, Colorado, Kentucky and New Jersey—are seeking $1.4 trillion in penalties at an August trial in Oakland over claims it designed Facebook and Instagram to addict young users and hid the harms. Meta called the figure unsupported, saying \"a sanction of that size has no analog in the history of consumer protection enforcement.\" Twenty-nine states have sued the company in federal court, with a further 14 pursuing separate state-law claims.",
      "genre": "Technology",
      "sources": [
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMiwgFBVV95cUxQZ1lScjFMNFhZdU5wUmpZZzJ3QmppVTg5RWVUOG02OU8wVmhCUW1WTDNvWTZJTlZfYkRqb3dsQUNjMUZJMWxQZXhHNkg2cHBLOUtWZlJUQTZaZnFSZjZlMUVVN3ZtNlRBVHJIT3RLSk5ub3pBRlVOQXZ4Q3I5SFNYTjc4amZ0Z1Zvc1FybXE5WUtpdmFPZVhCU0xqNlZ1dnVDOV95dnZhOVZTV2tMU0k4aUNRSmk2UThwSVpLNjUwclZRZw?oc=5"
        },
        {
          "name": "The Jakarta Post",
          "href": "https://www.thejakartapost.com/business/2026/07/07/meta-says-us-states-seeking-14-trillion-in-penalties-in-youth-safety-trial"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-07",
      "image": {
        "src": "/covers/meta-states-1-4-trillion-youth-trial.png",
        "alt": "A young person's face softly lit from below by the pale glow of a smartphone held in the dark, the room deep in shadow",
        "credit": "AI-generated"
      },
      "edition": "Afternoon Edition · 7 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "The Trial of Socrates: \"Corrupter of the Youth\" (399 BCE)",
          "excerpt": "Socrates is a doer of evil, who corrupts the youth; and who does not believe in the gods of the state, but has other new divinities of his own.",
          "source": "Plato, Apology (trans. Benjamin Jowett), Project Gutenberg",
          "href": "https://www.gutenberg.org/files/1656/1656-h/1656-h.htm"
        },
        {
          "category": "historical",
          "title": "Lin Zexu's Letter to Queen Victoria on the Opium Trade (1839)",
          "excerpt": "There is, however, a class of treacherous barbarians who manufacture opium, smuggle it in for sale, and deceive our foolish people, in order to injure their bodies and derive profit therefrom.",
          "source": "Lin Zexu, Letter to Queen Victoria (1839), from Gems of Chinese Literature, Wikisource",
          "href": "https://en.wikisource.org/wiki/Gems_of_Chinese_Literature/Lin_Ts%C3%AA-hs%C3%BC-Letter_to_Queen_Victoria"
        },
        {
          "category": "literary",
          "title": "Christina Rossetti, \"Goblin Market\" (1862)",
          "excerpt": "Come buy our orchard fruits, / Come buy, come buy ... Yet my mouth waters still; / To-morrow night I will / Buy more.",
          "source": "Christina Rossetti, \"Goblin Market,\" Goblin Market and Other Poems (1862), Wikisource",
          "href": "https://en.wikisource.org/wiki/Goblin_Market_and_Other_Poems_(1862)/Goblin_Market"
        },
        {
          "category": "literary",
          "title": "Goethe, Faust: The Devil's Bargain",
          "excerpt": "When thus I hail the Moment flying: 'Ah, still delay—thou art so fair!' Then bind me in thy bonds undying, Then will I perish, then and there!",
          "source": "Johann Wolfgang von Goethe, Faust, Part I (trans. Bayard Taylor), Project Gutenberg",
          "href": "https://www.gutenberg.org/files/14591/14591-h/14591-h.htm"
        },
        {
          "category": "artistic",
          "title": "William Hogarth, Gin Lane (1751)",
          "excerpt": "Gin, cursed Fiend, with Fury fraught, Makes human Race a Prey. It enters by a deadly Draught And steals our Life away.",
          "source": "William Hogarth, Gin Lane (1751), engraving, Wikimedia Commons",
          "href": "https://commons.wikimedia.org/wiki/File:William_Hogarth_-_Gin_Lane.jpg",
          "image": {
            "src": "/covers/meta-states-1-4-trillion-youth-trial--art.png",
            "alt": "Hogarth's engraving Gin Lane: a squalid London street where gin-ruined Londoners collapse and starve while a drunken, oblivious mother lets her infant slip from her arms to its death.",
            "credit": "William Hogarth, Gin Lane (1751), Wikimedia Commons (public domain)"
          }
        },
        {
          "category": "artistic",
          "title": "Franz Schubert, Erlkönig, D.328 (1815)",
          "excerpt": "Schubert's setting of Goethe's ballad rides on a galloping piano ostinato as a father clutches his feverish son through the night. The Erlking's voice slips in, sweet and coaxing, promising games, fine clothes, and his daughters' care to lure the boy away; the child cries that the phantom is seizing him, and by the final bars he lies dead in his father's arms.",
          "source": "Franz Schubert, Erlkönig, D.328 (1815), public-domain scores at IMSLP",
          "href": "https://imslp.org/wiki/Erlk%C3%B6nig,_D.328_(Schubert,_Franz)"
        }
      ],
      "rank": 31
    },
    {
      "slug": "australia-teen-social-media-age-checks-fail",
      "headline": "Australia's world-first teen social-media ban falters as platforms skip age checks, study finds",
      "overview": "A study by a team that advised Australia's rollout found the country's world-first ban on under-16s using social media is failing at the first hurdle, testers reported on July 7, 2026: they opened 50 accounts declaring their age as 16 and were never asked for proof. Since December the law has required platforms including Instagram, Snapchat and YouTube to bar under-16s, yet most teens can still get in. Australia has doubled the maximum fine and warned of court action against non-compliant tech giants.",
      "genre": "Technology",
      "sources": [
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMivgFBVV95cUxQMVVFOHA5aEVaNXgtQnRpNklUdDhKSnFjOGZNaWdrdU8xUERLV3llR1I5UjdVaUs4ZFAtMXFKV1p6WWVYRDFOd3cxdDQxdUhLVHdMS3lQbEZHb0oyWDZTcy1UdHNZdUFEeVZvR1ViRHd6alFGTXV4cTFwaXBMUkItUzgyZ19Ib1F3Y3Yya0J1VUlWWUlxVmdxX0oybG0ybkRxMHR5OWdHT1lWdUZkaGxZYmFuUGdZRmJMSno0TnB3?oc=5"
        },
        {
          "name": "RNZ",
          "href": "https://www.rnz.co.nz/news/world/684189/australia-s-teen-social-media-ban-fails-to-clear-first-hurdle-in-age-checks-study"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-07",
      "image": {
        "src": "/covers/australia-teen-social-media-age-checks-fail.png",
        "alt": "A single smartphone glowing with soft pale light in a pair of young hands, a low unlatched garden gate standing open in the soft-focus background",
        "credit": "AI-generated"
      },
      "edition": "Afternoon Edition · 7 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "American Prohibition: the Volstead Act (1919)",
          "excerpt": "To prohibit intoxicating beverages, and to regulate the manufacture, production, use, and sale of high-proof spirits",
          "source": "National Prohibition Act (Volstead Act), 1919 — U.S. National Archives, DocsTeach",
          "href": "https://docsteach.org/documents/document/volstead-act"
        },
        {
          "category": "historical",
          "title": "Rome and the flouted Oppian sumptuary law (Livy, 195 BC)",
          "excerpt": "luxury, left undisturbed, would have been more endurable then than it will be now, when it has been, like a wild beast, first rendered angry by its very fetters and then let loose.",
          "source": "Livy, History of Rome, Book 34.4 (Cato's speech on repealing the Lex Oppia), trans. Evan T. Sage — Perseus Digital Library, Tufts",
          "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0164:book=34:chapter=4"
        },
        {
          "category": "literary",
          "title": "The forbidden fruit in the Garden of Eden",
          "excerpt": "And when the woman saw that the tree was good for food, and that it was pleasant to the eyes, and a tree to be desired to make one wise, she took of the fruit thereof, and did eat, and gave also unto her husband with her; and he did eat.",
          "source": "Genesis 3:6, King James Bible — Wikisource",
          "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Genesis"
        },
        {
          "category": "literary",
          "title": "Sin, the gatekeeper who cannot shut Hell's gate (Milton, Paradise Lost, Book II)",
          "excerpt": "She op'nd, but to shut / Excel'd her power; the Gates wide op'n stood",
          "source": "John Milton, Paradise Lost (1667), Book II (ll. 883–884) — Wikisource",
          "href": "https://en.wikisource.org/wiki/Paradise_Lost_(1667)/Book_II"
        },
        {
          "category": "artistic",
          "title": "The Trojan Horse dragged through the gates of Troy (G. D. Tiepolo, c. 1760)",
          "excerpt": "The Procession of the Trojan Horse in Troy",
          "source": "Giovanni Domenico Tiepolo, The Procession of the Trojan Horse in Troy, c. 1760 (National Gallery, London) — Wikimedia Commons",
          "href": "https://commons.wikimedia.org/wiki/File:Giovanni_Domenico_Tiepolo_-_The_Procession_of_the_Trojan_Horse_in_Troy_-_WGA22382.jpg",
          "image": {
            "src": "/covers/australia-teen-social-media-age-checks-fail--art.png",
            "alt": "Crowds of Trojans jubilantly hauling the great wooden horse through the breached gate into their city, unaware of the soldiers hidden within",
            "credit": "Giovanni Domenico Tiepolo, The Procession of the Trojan Horse in Troy, c. 1760, National Gallery, London. Public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "Thomas Cole, Expulsion from the Garden of Eden (1828)",
          "excerpt": "Outside the gate to Paradise, Adam and Eve are cast into an abyss marked by blasted trees, desolate rocks, and an ominous wolf.",
          "source": "Thomas Cole, Expulsion from the Garden of Eden, 1828 (Museum of Fine Arts, Boston) — Wikimedia Commons",
          "href": "https://commons.wikimedia.org/wiki/File:Cole_Thomas_Expulsion_from_the_Garden_of_Eden_1828.jpg"
        }
      ],
      "rank": 32
    },
    {
      "slug": "spacex-nasdaq-100-inclusion",
      "headline": "SpaceX joins the Nasdaq-100 after the largest IPO ever, forcing billions in index-fund buying",
      "overview": "SpaceX officially joined the Nasdaq-100 on July 7, 2026, weeks after a record roughly $75 billion initial public offering, entering through a fast-track rule for large new listings. Index funds tracking the benchmark must buy an estimated $22 billion to $27 billion of the stock. Shares spiked to about $225 after the June 12 debut before falling roughly 28% from that high, and analysts cautioned that index inclusion has often marked a peak, as it did for Palantir and Strategy.",
      "genre": "Economy",
      "sources": [
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMinAFBVV95cUxPdFlULTBOYXhrMW91ckpQYTN4ampKcmtYWW9xTnA0YmN1ZlFDSVRQY3FmSXJoMFR5RVlaOWd3eVhzOTRTMk5rUW9OLURzSXZTalh1OGxmemtOUW0tTC0yWTJpbVVsVDRMSmRIVTU4N21rWjJCY1BpQVNYLVhNc2tleTVwN3J3dHNpRE00cFltUFVXUERXM0QxajM0d20?oc=5"
        },
        {
          "name": "CNBC",
          "href": "https://www.cnbc.com/2026/06/26/spacex-added-to-nasdaq-100.html"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-07",
      "image": {
        "src": "/covers/spacex-nasdaq-100-inclusion.png",
        "alt": "A single luminous line rising and arcing steeply toward its peak across a dark abstract field of soft green and gold light, like a soaring market chart",
        "credit": "AI-generated"
      },
      "edition": "Afternoon Edition · 7 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "The Roman credit crisis of AD 33 (Tacitus, Annals VI)",
          "excerpt": "The facilities for selling were followed by a fall of prices, and the deeper a man was in debt, the more reluctantly did he part with his property, and many were utterly ruined.",
          "source": "Tacitus, The Annals, Book 6 (chs. 16–17)",
          "href": "https://en.wikisource.org/wiki/The_Annals_(Tacitus)/Book_6"
        },
        {
          "category": "historical",
          "title": "The Tulipomania (Charles Mackay)",
          "excerpt": "Nobles, citizens, farmers, mechanics, sea-men, footmen, maid-servants, even chimney-sweeps and old clothes-women, dabbled in tulips.",
          "source": "Charles Mackay, Memoirs of Extraordinary Popular Delusions and the Madness of Crowds, Vol. 1, Ch. 3 “The Tulipomania”",
          "href": "https://en.wikisource.org/wiki/Memoirs_of_Extraordinary_Popular_Delusions_and_the_Madness_of_Crowds/Volume_1/Chapter_3"
        },
        {
          "category": "literary",
          "title": "Daedalus and Icarus (Ovid, Metamorphoses VIII)",
          "excerpt": "The wax was melted; he shook his naked arms, and, wanting his oar-like wings, he caught no more air.",
          "source": "Ovid, Metamorphoses, Book 8 (Riley prose translation)",
          "href": "https://www.gutenberg.org/files/26073/26073-h/26073-h.htm"
        },
        {
          "category": "literary",
          "title": "Fortune and her wheel (Boethius, Consolation of Philosophy)",
          "excerpt": "I turn the wheel that spins. I delight to see the high come down and the low ascend.",
          "source": "Boethius, The Consolation of Philosophy, Book II (H. R. James translation)",
          "href": "https://www.gutenberg.org/files/14328/14328-h/14328-h.htm"
        },
        {
          "category": "artistic",
          "title": "The South Sea Scheme (William Hogarth, 1721)",
          "excerpt": "On a whirling wooden merry-go-round speculators of every rank spin for the promise of riches, while Honesty is broken on the wheel and Honour is flogged nearby. Hogarth's satirical engraving turns the crowd's manic rush into South Sea stock into a carnival of greed and credulity, published in the very wreckage of the bubble's collapse.",
          "source": "William Hogarth, “The South Sea Scheme” (1721), Wikimedia Commons",
          "href": "https://commons.wikimedia.org/wiki/File:William_Hogarth_-_The_South_Sea_Scheme.png",
          "image": {
            "src": "/covers/spacex-nasdaq-100-inclusion--art.png",
            "alt": "Hogarth engraving of a crowd whirling on a speculative merry-go-round amid allegories of ruined honesty and honour during the South Sea Bubble",
            "credit": "William Hogarth, The South Sea Scheme (1721), engraving. Public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "The Fall of Phaeton (Peter Paul Rubens)",
          "excerpt": "Having seized the reins of the sun-god's chariot and driven it too near the earth, Phaeton is hurled headlong as Jupiter's thunderbolts split the sky and the terrified horses scatter into darkness. Rubens seizes the instant of the plunge, the archetype of the mortal who climbed too high toward the heavens and fell.",
          "source": "Peter Paul Rubens, “The Fall of Phaeton” (c. 1604–1608), National Gallery of Art, via Wikimedia Commons",
          "href": "https://commons.wikimedia.org/wiki/File:Peter_Paul_Rubens_-_The_Fall_of_Phaeton_(National_Gallery_of_Art).jpg"
        }
      ],
      "rank": 33
    },
    {
      "slug": "proxima-fusion-google-rwe-funding",
      "headline": "German fusion start-up Proxima raises €411 million from Google and RWE to build a stellarator",
      "overview": "Magnetic-fusion company Proxima Fusion raised €411 million (about $469 million) on July 7, 2026, with strategic investment from Google and the utility RWE, valuing the German start-up near €2.4 billion and making it Europe's best-funded fusion firm. The money will fund Alpha, a net-energy stellarator demonstrator near Munich, on the path to a first commercial plant planned for a decommissioned nuclear site in Bavaria. It marks Google's first European fusion investment.",
      "genre": "Science",
      "sources": [
        {
          "name": "CNBC",
          "href": "https://www.cnbc.com/2026/07/07/google-proxima-fusion-funding.html"
        },
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMipgFBVV95cUxPN1FsQTdBbkwwMzkxNmpmT3NpaDBOS0MyMUl3WkRpOEJuOFBuTV9HOVFWa2JldGRONTFUX3pvbjAzQWl5ekdnSXU2X3Z6VzNaSjd2SDNrOHZvQ1JVWGw4cnZBNWhoeHNrS296dHNncno2MkFLRVVfNnJBY256aUhBcmNGWGxfdUlheUZKYkFmd3BZbDdqVENreFc3bVg1ZzBIMVVJMWh3?oc=5"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-07",
      "image": {
        "src": "/covers/proxima-fusion-google-rwe-funding.png",
        "alt": "A radiant twisting ring of blue-white plasma light glowing inside a dark futuristic circular chamber of coiled metal, like a small caged star",
        "credit": "AI-generated"
      },
      "edition": "Afternoon Edition · 7 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Paracelsus and the alchemical dream of transmutation",
          "excerpt": "Alchemy is nothing else but the set purpose, intention, and subtle endeavour to transmute the kinds of the metals from one to another.",
          "source": "Paracelsus, The Hermetic and Alchemical Writings of Paracelsus, Vol. I (trans. A. E. Waite), 'Coelum Philosophorum'",
          "href": "https://archive.org/stream/hermeticandalch00paragoog/hermeticandalch00paragoog_djvu.txt"
        },
        {
          "category": "historical",
          "title": "Frederick Soddy glimpses the boundless energy locked in the atom",
          "excerpt": "By its conclusion that there is imprisoned in ordinary common matter vast stores of energy, which ignorance alone at the present time prevents us from using for the purposes of life, radioactivity has raised an issue which it is safe to say will mark an epoch in the progress of thought.",
          "source": "Frederick Soddy, The Interpretation of Radium (1909), p. 5",
          "href": "https://archive.org/stream/interpretationof00sodd/interpretationof00sodd_djvu.txt"
        },
        {
          "category": "literary",
          "title": "Prometheus steals the source of fire for mortals",
          "excerpt": "And I am he that searched out the source of fire, by stealth borne-off inclosed in a fennel-rod, which has shown itself a teacher of every art to mortals, and a great resource.",
          "source": "Aeschylus, Prometheus Bound (Project Gutenberg)",
          "href": "https://www.gutenberg.org/files/27458/27458-h/27458-h.htm"
        },
        {
          "category": "literary",
          "title": "Tennyson's knights vow the great quest for the Holy Grail",
          "excerpt": "Streamed through my cell a cold and silver beam, / And down the long beam stole the Holy Grail, / Rose-red with beatings in it, as if alive",
          "source": "Alfred, Lord Tennyson, 'The Holy Grail', Idylls of the King",
          "href": "https://en.wikisource.org/wiki/Idylls_of_the_King/The_Holy_Grail"
        },
        {
          "category": "artistic",
          "title": "Joseph Wright of Derby, The Alchymist Discovers Phosphorus",
          "excerpt": "The Alchymist, In Search of the Philosopher's Stone, Discovers Phosphorus, and prays for the successful Conclusion of his operation, as was the custom of the Ancient Chymical Astrologers.",
          "source": "Joseph Wright of Derby (1771), Derby Museum and Art Gallery, via Wikimedia Commons",
          "href": "https://commons.wikimedia.org/wiki/File:Joseph_Wright_of_Derby_The_Alchemist.jpg",
          "image": {
            "src": "/covers/proxima-fusion-google-rwe-funding--art.png",
            "alt": "Oil painting of an alchemist kneeling in a dark vaulted chamber before a glass vessel erupting with the luminous glow of newly discovered phosphorus.",
            "credit": "Joseph Wright of Derby (1734-1797), 'The Alchymist, in Search of the Philosopher's Stone', 1771, Derby Museum and Art Gallery. Public domain via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "Scriabin, Prometheus: The Poem of Fire, Op. 60",
          "excerpt": "Scriabin's 1910-11 tone poem casts the fire-bringer Prometheus as a symbol of creative will, building its cosmic ascent on the shimmering 'mystic chord.' The score famously calls for a 'clavier a lumieres' (keyboard of light) to flood the hall with colored light, fusing sound and radiance into a single act of illumination.",
          "source": "Alexander Scriabin, Prometheus: The Poem of Fire, Op. 60 (first published 1911), via IMSLP",
          "href": "https://imslp.org/wiki/Prometheus,_Le_Po%C3%A8me_du_Feu,_Op.60_(Scriabin,_Aleksandr)"
        }
      ],
      "rank": 34
    },
    {
      "slug": "china-hubei-tornado-deaths",
      "headline": "Tornadoes kill at least 15 in central China's Hubei, injuring hundreds as winds tear off roofs",
      "overview": "Tornadoes and gale-force winds swept the cities of Huangshi, Huanggang, Ezhou and Xianning in central China's Hubei province late on July 6, 2026, and by July 7 the death toll from storms across the country had risen to at least 15, with hundreds injured and tens of thousands evacuated. The winds overturned cars, collapsed houses and tore roofs from buildings; one man was reportedly sucked from his 12th-floor apartment. Thousands of homes in Hubei were damaged.",
      "genre": "Climate",
      "sources": [
        {
          "name": "South China Morning Post",
          "href": "https://www.scmp.com/news/china/politics/article/3359671/8-dead-1-missing-china-tornado-days-after-warning-extreme-weather-ahead"
        },
        {
          "name": "Phys.org (AFP)",
          "href": "https://phys.org/news/2026-07-death-toll-china-storms-hundreds.html"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-07",
      "image": {
        "src": "/covers/china-hubei-tornado-deaths.png",
        "alt": "A vast dark funnel cloud of a tornado twisting down from a churning slate-grey storm sky over a distant low town, debris swirling at its base",
        "credit": "AI-generated"
      },
      "edition": "Afternoon Edition · 7 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "The storm that wrecked Xerxes' fleet at Cape Sepias (480 BC)",
          "excerpt": "the sea began to boil, and there brake upon them a great storm and a strong east wind, that wind which the people of that country call the Hellespontian",
          "source": "Herodotus, The Histories, Book 7.188 (Rawlinson translation)",
          "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Herodotus/7D*.html"
        },
        {
          "category": "historical",
          "title": "Defoe's eyewitness report of the Great Storm of 1703",
          "excerpt": "the Bricks, Tiles, and Stones, from the Tops of the Houses, flew with such force, and so thick in the Streets, that no one thought fit to venture out",
          "source": "Daniel Defoe, The Storm (1704)",
          "href": "https://www.gutenberg.org/files/42234/42234-h/42234-h.htm"
        },
        {
          "category": "literary",
          "title": "The LORD answers Job out of the whirlwind",
          "excerpt": "Then the LORD answered Job out of the whirlwind, and said, Who is this that darkeneth counsel by words without knowledge?",
          "source": "The Book of Job 38:1-2 (King James Bible)",
          "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Job"
        },
        {
          "category": "literary",
          "title": "The cyclone carries Dorothy's house into the sky",
          "excerpt": "The house whirled around two or three times and rose slowly through the air. ... there it remained and was carried miles and miles away as easily as you could carry a feather.",
          "source": "L. Frank Baum, The Wonderful Wizard of Oz (1900), ch. 1",
          "href": "https://www.gutenberg.org/files/55/55-h/55-h.htm"
        },
        {
          "category": "artistic",
          "title": "Doré: The infernal whirlwind of Canto V",
          "excerpt": "The infernal hurricane that never rests / Hurtles the spirits onwards in its rapine.",
          "source": "Gustave Doré, illustration to Dante's Inferno, Canto V (1857), Wikimedia Commons",
          "href": "https://commons.wikimedia.org/wiki/File:Gustave_Dor%C3%A9_-_Dante_Alighieri_-_Inferno_-_Plate_14_(Canto_V_-_The_hurricane_of_souls).jpg",
          "image": {
            "src": "/covers/china-hubei-tornado-deaths--art.png",
            "alt": "Engraving of naked souls swept helplessly through a dark sky by an infernal whirlwind above stormy seas",
            "credit": "Gustave Doré (1832-1883), Inferno Canto V, 1857. Public domain via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "Beethoven storms the orchestra in the 'Pastoral' Symphony",
          "excerpt": "Allegro (Thunderstorm, Tempest)",
          "source": "Ludwig van Beethoven, Symphony No. 6 'Pastoral', Op. 68, fourth movement (Gewitter, Sturm), IMSLP",
          "href": "https://imslp.org/wiki/Symphony_No.6,_Op.68_(Beethoven,_Ludwig_van)"
        }
      ],
      "rank": 35
    },
    {
      "slug": "south-korea-fake-news-law",
      "headline": "South Korea's law punishing 'fake news' takes effect as journalists warn of a chilling effect",
      "overview": "South Korea began enforcing a law on July 7, 2026, that allows courts to award up to five times proven losses against news outlets and large social-media channels that spread false or manipulated information to cause harm or make a profit. Journalists' associations and civil-liberties groups say the vaguely worded law could chill critical reporting and push outlets toward self-censorship. Officials counter that private platforms, not the government, will judge disputed content, and that public-interest reporting is exempt.",
      "genre": "Politics",
      "sources": [
        {
          "name": "AP News",
          "href": "https://news.google.com/rss/articles/CBMioAFBVV95cUxQd3dUT2ZYR3gyMUlyMUZLNEVQSlRIOVFvRU02OWhEUklYTzFrVTVqTUh4d2I1aXlCaldoS2JQUnZ5VW1aNjI3QTBWVjYtUVVvYWVqM25xY3RjWnRuVzBpLXV4T1dkN01lMVF6c20yYVJmNnh2MDEwNmdlbHB1Q2F3Mm5Qdjk5M0hxUTFuZXVyeHFoVDA3OWJJbDlYRFBEUG1B?oc=5"
        },
        {
          "name": "U.S. News & World Report",
          "href": "https://www.usnews.com/news/business/articles/2026-07-07/south-korean-law-targeting-fake-news-takes-effect-as-journalists-groups-raise-concerns"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-07",
      "image": {
        "src": "/covers/south-korea-fake-news-law.png",
        "alt": "An old cast-iron printing press standing dark and silent in a deserted newspaper press hall at night, a single blank sheet left in the carriage",
        "credit": "AI-generated"
      },
      "edition": "Afternoon Edition · 7 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Tacitus on the trial and burning of Cremutius Cordus's histories (Annals, Book IV, c. AD 116)",
          "excerpt": "His books, so the Senators decreed, were to be burnt by the aediles; but some copies were left which were concealed and afterwards published... the persecution of genius fosters its influence; foreign tyrants, and all who have imitated their oppression, have merely procured infamy for themselves and glory for their victims.",
          "source": "Tacitus, The Annals, Book IV (Church & Brodribb translation), on the prosecution of the historian Cremutius Cordus under Tiberius, via Wikisource",
          "href": "https://en.wikisource.org/wiki/The_Annals_(Tacitus)/Book_4"
        },
        {
          "category": "historical",
          "title": "John Milton, Areopagitica: a speech against the licensing of the press (1644)",
          "excerpt": "as good almost kill a man as kill a good book. Who kills a man kills a reasonable creature, God's image; but he who destroys a good book, kills reason itself, kills the image of God, as it were in the eye.",
          "source": "John Milton, Areopagitica (1644), Project Gutenberg",
          "href": "https://www.gutenberg.org/files/608/608-h/608-h.htm"
        },
        {
          "category": "literary",
          "title": "Henrik Ibsen, An Enemy of the People, Act IV (1882)",
          "excerpt": "The majority never has right on its side. Never, I say! That is one of these social lies against which an independent, intelligent man must wage war.",
          "source": "Henrik Ibsen, An Enemy of the People, Act IV (Eleanor Marx-Aveling translation), via Wikisource",
          "href": "https://en.wikisource.org/wiki/An_Enemy_of_the_People_(Ibsen)/Act_IV"
        },
        {
          "category": "literary",
          "title": "Heinrich Heine, Almansor. Eine Tragödie (1821)",
          "excerpt": "Das war ein Vorspiel nur, dort wo man Bücher / Verbrennt, verbrennt man auch am Ende Menschen.",
          "source": "Heinrich Heine, Almansor. Eine Tragödie (1821), spoken by Hassan, via Wikisource",
          "href": "https://de.wikisource.org/wiki/Almansor_(Heine)"
        },
        {
          "category": "artistic",
          "title": "Honoré Daumier, Ne vous y frottez pas!! (Freedom of the Press), 1834",
          "excerpt": "A burly printer, sleeves rolled up and fists clenched, plants himself defiantly before the powers of the state, guarding the press at his back while a toppled king lies behind him; the caption warns the regime, \"Ne vous y frottez pas!!\" — \"Don't meddle with it!\"",
          "source": "Honoré Daumier, lithograph for L'Association mensuelle, 1834; National Gallery of Art (Rosenwald Collection), public domain, via Wikimedia Commons",
          "href": "https://commons.wikimedia.org/wiki/File:Honor%C3%A9_Daumier,_Ne_vous_y_frottez_pas!!,_1834,_NGA_6131.jpg",
          "image": {
            "src": "/covers/south-korea-fake-news-law--art.png",
            "alt": "Daumier lithograph of a defiant printer standing his ground against King Louis-Philippe in defense of freedom of the press",
            "credit": "Honoré Daumier, 'Ne vous y frottez pas!!', 1834. National Gallery of Art (Rosenwald Collection), public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "Ludwig van Beethoven, Fidelio, Op. 72 — Prisoners' Chorus, \"O welche Lust\"",
          "excerpt": "O welche Lust, in freier Luft",
          "source": "Ludwig van Beethoven, Fidelio, Op. 72, Prisoners' Chorus (Act I, No. 10), public-domain score via IMSLP",
          "href": "https://imslp.org/wiki/Fidelio,_Op.72_(Beethoven,_Ludwig_van)"
        }
      ],
      "rank": 36
    },
    {
      "slug": "ram-temple-board-overhaul-donation-theft",
      "headline": "India's Ayodhya Ram temple overhauls its board after devotees' donations are allegedly stolen",
      "overview": "The trust running India's grand Ram temple in Ayodhya overhauled its leadership on July 7, 2026, after a Special Investigation Team found that offerings had allegedly been stolen or swapped for fakes and roughly 7 to 7.5 crore rupees misappropriated, with CCTV cameras reportedly removed. General secretary Champat Rai resigned and was replaced on an interim basis, arrests were made, and the trust imposed strict new protocols for counting donations. The trust promised greater transparency after the scandal.",
      "genre": "Culture",
      "sources": [
        {
          "name": "BBC News",
          "href": "https://www.bbc.co.uk/news/articles/c872ngz405xo"
        },
        {
          "name": "Organiser",
          "href": "https://organiser.org/2026/07/07/368683/bharat/ayodhya-ram-mandir-donation-row-trust-accepts-resignations-promises-greater-transparency-sit-submits-interim-report/"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-07",
      "image": {
        "src": "/covers/ram-temple-board-overhaul-donation-theft.png",
        "alt": "The dim ornate stone sanctum of an Indian temple at dawn, a single large empty brass offering bowl on the polished floor lit by a shaft of golden light",
        "credit": "AI-generated"
      },
      "edition": "Afternoon Edition · 7 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Cicero prosecutes Verres for plundering Sicily's temples (70 BC)",
          "excerpt": "he has left nothing in any one's house, nothing even in the towns, nothing in public places, not even in the temples, nothing in the possession of any Sicilian, nothing in the possession of any Roman citizen",
          "source": "Cicero, Against Verres, Second Pleading, Book 4 (trans. C. D. Yonge), Wikisource",
          "href": "https://en.wikisource.org/wiki/Against_Verres/Second_pleading/Book_4"
        },
        {
          "category": "historical",
          "title": "Luther's Ninety-Five Theses assail the sale of pardons for money (1517)",
          "excerpt": "They preach man who say that so soon as the penny jingles into the money-box, the soul flies out [of purgatory]. ... The treasures of the indulgences are nets with which they now fish for the riches of men.",
          "source": "Martin Luther, Disputation on the Power and Efficacy of Indulgences (Ninety-Five Theses), Wikisource",
          "href": "https://en.wikisource.org/wiki/Disputation_of_Doctor_Martin_Luther_on_the_Power_and_Efficacy_of_Indulgences"
        },
        {
          "category": "literary",
          "title": "Chaucer's Pardoner boasts of fleecing the faithful while preaching against greed",
          "excerpt": "I preach of nothing but covetousness. Therefore my theme ever was and yet is, Radix malorum est cupiditas. Thus I can preach against that same sin which I practise, and that is avarice.",
          "source": "Geoffrey Chaucer, The Canterbury Tales, 'The Prologue of the Pardoner's Tale', Wikisource",
          "href": "https://en.wikisource.org/wiki/The_Canterbury_Tales_of_Geoffrey_Chaucer/Pardoner%E2%80%99s_Tale/Prologue"
        },
        {
          "category": "literary",
          "title": "Dante damns the simoniacs who sold sacred things for silver and gold (Inferno XIX)",
          "excerpt": "O Simon Magus, O forlorn disciples, / Ye who the things of God, which ought to be / The brides of holiness, rapaciously / For silver and for gold do prostitute,",
          "source": "Dante Alighieri, The Divine Comedy: Inferno, Canto XIX (trans. H. W. Longfellow), Project Gutenberg",
          "href": "https://www.gutenberg.org/files/1001/1001-h/1001-h.htm"
        },
        {
          "category": "artistic",
          "title": "El Greco, The Purification of the Temple — Christ scourging the money-changers",
          "excerpt": "El Greco paints the very moment Christ, whip raised, drives the traders and money-changers from the Temple; the guilty recoil in a knot of twisting bodies on the left while the faithful gather calmly on the right, a swirling composition of cleansing and judgment set beneath cold classical arches.",
          "source": "El Greco, The Purification of the Temple (c. 1600), National Gallery, London; Wikimedia Commons",
          "href": "https://commons.wikimedia.org/wiki/File:El_Greco_-_The_Purification_of_the_Temple_-_WGA10542.jpg",
          "image": {
            "src": "/covers/ram-temple-board-overhaul-donation-theft--art.png",
            "alt": "El Greco's painting of Christ raising a whip to drive money-changers and traders from the Temple",
            "credit": "El Greco, The Purification of the Temple (c. 1600), National Gallery, London. Public domain via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "Rembrandt, Judas Returning the Thirty Pieces of Silver — blood money flung back in the temple",
          "excerpt": "Rembrandt shows an anguished Judas on his knees, having hurled the thirty silver coins across the temple floor, begging in vain for the priests to take back the price of betrayal; the elders turn away and the scattered money glints as a sign of a sacred trust profaned for gain.",
          "source": "Rembrandt van Rijn, Judas Returning the Thirty Pieces of Silver (1629), Mulgrave Castle; Wikimedia Commons",
          "href": "https://commons.wikimedia.org/wiki/File:Judas_Returning_the_Thirty_Silver_Pieces_-_Rembrandt.jpg"
        }
      ],
      "rank": 37
    },
    {
      "slug": "bugatti-mistral-blanc-eternel",
      "headline": "Bugatti and Berlin's KPM porcelain house create a one-off white W16 Mistral painted with cobalt lines",
      "overview": "Bugatti unveiled a one-of-one W16 Mistral roadster called 'Blanc Éternel,' made with the Berlin porcelain manufactory KPM and covered by Dezeen on July 7, 2026. Its pure-white body is hand-painted with fine cobalt-blue lines tracing the car's digital surface geometry, inspired by a white porcelain vase the Italian designer Enzo Mari created for KPM, and it carries porcelain inlays inside. The car caps a 15-year partnership between the carmaker and the 260-year-old porcelain house.",
      "genre": "Culture",
      "sources": [
        {
          "name": "Dezeen",
          "href": "https://www.dezeen.com/2026/07/07/bugatti-porcelain-clad-sports-car-enzo-mari-vase/"
        },
        {
          "name": "Robb Report",
          "href": "https://robbreport.com/motors/cars/bugatti-mistral-blanc-eternel-hypercar-debut-1238411885/"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-07",
      "image": {
        "src": "/covers/bugatti-mistral-blanc-eternel.png",
        "alt": "A pristine pure-white sculptural roadster hypercar in a dark studio, its flowing body traced all over with fine hand-painted cobalt-blue lines, softly spotlit",
        "credit": "AI-generated"
      },
      "edition": "Afternoon Edition · 7 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Jar with dragon, China, Ming dynasty, early 15th century (Jingdezhen ware), The Metropolitan Museum of Art",
          "excerpt": "A towering early-15th-century Jingdezhen jar painted in deep cobalt blue beneath a clear glaze, its body coiled with a striding, five-clawed dragon among scrolling waves. It is the imperial Chinese blue-and-white porcelain whose fusion of painterly line and flawless white body set the standard the whole world would chase for centuries.",
          "source": "The Metropolitan Museum of Art",
          "href": "https://www.metmuseum.org/art/collection/search/39666"
        },
        {
          "category": "historical",
          "title": "Pair of vases, Sèvres Manufactory, France, 1789, The Metropolitan Museum of Art",
          "excerpt": "A pair of hard-paste vases from the Sevres royal manufactory, dated 1789, their jewel-bright porcelain grounds framed in chased and gilded bronze mounts. They mark the summit of French court craft, where the hard-won secret of true porcelain was wedded to the most exacting ornament.",
          "source": "The Metropolitan Museum of Art",
          "href": "https://www.metmuseum.org/art/collection/search/236178"
        },
        {
          "category": "literary",
          "title": "John Keats, \"Ode on a Grecian Urn\" (1820)",
          "excerpt": "Beauty is truth, truth beauty,—that is all / Ye know on earth, and all ye need to know.",
          "source": "Keats, Poems Published in 1820 (Wikisource)",
          "href": "https://en.wikisource.org/wiki/Keats;_poems_published_in_1820/Ode_on_a_Grecian_Urn"
        },
        {
          "category": "literary",
          "title": "Henry Wadsworth Longfellow, \"Kéramos\" (1878)",
          "excerpt": "Turn, turn, my wheel! This earthen jar / A touch can make, a touch can mar; / And shall it to the Potter say, / What makest thou. Thou hast no hand?",
          "source": "The Complete Poetical Works of Henry Wadsworth Longfellow (Project Gutenberg)",
          "href": "https://www.gutenberg.org/cache/epub/1365/pg1365.txt"
        },
        {
          "category": "artistic",
          "title": "Willem Kalf, Still Life with a Chinese Porcelain Jar (1669), Indianapolis Museum of Art at Newfields",
          "excerpt": "Kalf sets a Chinese blue-and-white porcelain jar at the heart of a dark still life, its glaze catching the light beside a half-peeled lemon, Venetian glass and chased silver. Imported Eastern luxury and exquisite local craft are composed into a single hushed, glowing arrangement.",
          "source": "Indianapolis Museum of Art at Newfields",
          "href": "https://collections.discovernewfields.org/art/artwork/57562",
          "image": {
            "src": "/covers/bugatti-mistral-blanc-eternel--art.png",
            "alt": "Willem Kalf's 1669 still life featuring a Chinese blue-and-white porcelain jar amid silver, Venetian glass and fruit.",
            "credit": "Willem Kalf, Still Life with a Chinese Porcelain Jar (1669), Indianapolis Museum of Art at Newfields. Public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "Gilbert & Sullivan, \"The Mikado\" (1885), opening Chorus of Nobles",
          "excerpt": "If you want to know who we are, / We are gentlemen of Japan: / On many a vase and jar— / On many a screen and fan, / We figure in lively paint:",
          "source": "The Complete Plays of Gilbert and Sullivan (Project Gutenberg)",
          "href": "https://www.gutenberg.org/cache/epub/808/pg808.txt"
        }
      ],
      "rank": 38
    },
    {
      "slug": "casul-chair-childrens-play-set",
      "headline": "A plywood children's chair that unfolds into a toy castle wins a UK graduate design prize",
      "overview": "Irish designer James Murphy's 'Casul' chair—a compact plywood seat resembling a miniature throne—unfolds in two moves into an abstract castle for imaginative play, as featured by Dezeen on July 7, 2026. Its support panels double as shelves for toys, one version is finished in chalkboard paint and another hides foam swords and shields. Cut from a single 15-millimetre plywood sheet that yields up to three chairs, it won Habitat's Future Design Award at London's New Designers graduate showcase.",
      "genre": "Culture",
      "sources": [
        {
          "name": "Dezeen",
          "href": "https://www.dezeen.com/2026/07/07/casul-chair-james-murphy/"
        },
        {
          "name": "Google News",
          "href": "https://news.google.com/rss/search?q=Casul%20chair%20James%20Murphy%20New%20Designers&hl=en-US&gl=US&ceid=US:en"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-07",
      "image": {
        "src": "/covers/casul-chair-childrens-play-set.png",
        "alt": "A single small pale birch-plywood child's chair partly unfolded into an abstract toy castle with cut-out battlements on a plain warm-grey studio floor",
        "credit": "AI-generated"
      },
      "edition": "Afternoon Edition · 7 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Plato on children learning their future crafts through play (Laws, Book I, c. 350 BC)",
          "excerpt": "he who is to be a good builder, should play at building children's houses; he who is to be a good husbandman, at tilling the ground; and those who have the care of their education should provide them when young with mimic tools.",
          "source": "Plato, Laws, Book I (Benjamin Jowett translation), Wikisource",
          "href": "https://en.wikisource.org/wiki/Laws_(Jowett)/Book_I"
        },
        {
          "category": "historical",
          "title": "Friedrich Froebel exalts play in his kindergarten philosophy (The Education of Man, 1826)",
          "excerpt": "Play is the highest phase of child-development—of human development at this period; for it is self-active representation of the inner—representation of the inner from inner necessity and impulse... Play is the purest, most spiritual activity of man at this stage... It holds the sources of all that is good.",
          "source": "Friedrich Froebel, The Education of Man (trans. W. N. Hailmann), §30 'Play', Internet Archive",
          "href": "https://archive.org/stream/educationofman00fruoft/educationofman00fruoft_djvu.txt"
        },
        {
          "category": "literary",
          "title": "A child builds castles and palaces from wooden blocks in Stevenson's 'Block City'",
          "excerpt": "What are you able to build with your blocks? Castles and palaces, temples and docks. ... Let the sofa be mountains, the carpet be sea, There I'll establish a city for me: A kirk and a mill and a palace beside, And a harbour as well where my vessels may ride.",
          "source": "Robert Louis Stevenson, 'Block City', A Child's Garden of Verses (Project Gutenberg)",
          "href": "https://www.gutenberg.org/files/25609/25609-h/25609-h.htm"
        },
        {
          "category": "literary",
          "title": "A bedridden child rules a toy kingdom in Stevenson's 'The Land of Counterpane'",
          "excerpt": "When I was sick and lay a-bed, I had two pillows at my head, And all my toys beside me lay To keep me happy all the day. ... Or brought my trees and houses out, And planted cities all about. I was the giant great and still That sits upon the pillow-hill",
          "source": "Robert Louis Stevenson, 'The Land of Counterpane', A Child's Garden of Verses (Project Gutenberg)",
          "href": "https://www.gutenberg.org/files/25609/25609-h/25609-h.htm"
        },
        {
          "category": "artistic",
          "title": "Pieter Bruegel the Elder's 'Children's Games' (1560): a whole town given over to play",
          "excerpt": "Some eighty knots of children swarm across a town square, each group absorbed in a different game—rolling hoops, riding hobby-horses, staging weddings and processions—turning barrels, fences and the very buildings into the props of an all-consuming world of make-believe.",
          "source": "Pieter Bruegel the Elder, Children's Games (1560), Kunsthistorisches Museum, via Wikimedia Commons",
          "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_the_Elder_-_Children%E2%80%99s_Games_-_Google_Art_Project.jpg",
          "image": {
            "src": "/covers/casul-chair-childrens-play-set--art.png",
            "alt": "Pieter Bruegel the Elder's 1560 painting Children's Games, a crowded town square filled with dozens of children absorbed in different games.",
            "credit": "Pieter Bruegel the Elder, Children's Games (1560), Kunsthistorisches Museum, Vienna. Public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "Schumann's 'Kinderszenen' turns a child's play into music, including the Knight of the Hobby-Horse",
          "excerpt": "Schumann's thirteen miniatures view childhood through an adult's tender memory; in 'Ritter vom Steckenpferd' (Knight of the Hobby-Horse) a lurching, off-beat rhythm sets a child galloping on a broomstick steed, while 'Träumerei' drifts into pure daydream—the whole cycle a nursery world where a stick becomes a warhorse and a room becomes a kingdom.",
          "source": "Robert Schumann, Kinderszenen (Scenes from Childhood), Op. 15 (1838), No. 9 'Ritter vom Steckenpferd', IMSLP",
          "href": "https://imslp.org/wiki/Kinderszenen,_Op.15_(Schumann,_Robert)"
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
