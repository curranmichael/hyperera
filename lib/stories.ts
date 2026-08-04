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
const stories: Story[] = [
    {
      "slug": "hormuz-cargo-ship-projectile-strike",
      "headline": "A cargo ship is hit by a projectile in the Strait of Hormuz off Oman as Washington and Tehran give conflicting accounts of talks",
      "overview": "The United Kingdom Maritime Trade Operations centre said the vessel reported being struck by an unknown projectile at 2am local time, 37km north-east of Al Khasab in Oman; the British security firm Ambrey said the ship was damaged. President Trump said the two sides were resuming talks to wind down the war, while Iran insisted it was speaking only to Oman, and only about the strait. The waterway carried a fifth of the world's oil and gas before the war and has been effectively shut since February.",
      "genre": "Conflict",
      "sources": [
        {
          "name": "AP",
          "href": "https://news.google.com/rss/articles/CBMiqwFBVV95cUxObXBWcm1tUGMzTS10VXhUNlBaMENHZzBNMnRxVzhQZnEyN3kwSF9Cd0pQUHZLQS11Y0Jpd2tiTGIxRE1WVXNxa3lqWXBiSmdONXFjTkRXb195eThEeEpVYzlZOU1uaTE0d3M1N3Y5NU9IVGpTM0MzUkRjVzA4SnFXTk9RWDhZRzhPc1JZNVhKZUM1ZFBkSk9qeHJsanhpUzdaVUs4UFlMXzVxRE0?oc=5"
        },
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMipgFBVV95cUxOaUY3M2pidURfcVlodzZaVEctbGNSYS1rNlJrR21pQm8yVm50U05QSmRlWURQWWh5UklWZUVMVmlRdzhmbVJrN05IdVNXVW83T3l1TUo0ZjJTMzNURzlOdmNMM2YxY2JwVHQtby1aTFVfZmFnSjRFT0hSaHlzeW50XzNPcUZROG13MUxxNVMwdGd3UkR2cTgyeURHNERQWlUxeFJYR1ln?oc=5"
        }
      ],
      "href": "#",
      "publishedAt": "2026-08-04",
      "image": {
        "src": "/covers/hormuz-cargo-ship-projectile-strike.png",
        "alt": "Cargo ships lying at anchor in hazy grey light off a coast in the Strait of Hormuz, with children wading in the shallows and a fisherman in the foreground.",
        "credit": "AP"
      },
      "lead": true,
      "rank": 1,
      "edition": "Morning Edition · 4 August 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Athens builds a customs house on the Bosporus and taxes every ship out of the Black Sea, 410 BC",
          "excerpt": "From there they proceeded to Chrysopolis, in Calchedonia, and fortified it, established a custom house in the city, and proceeded to collect the tithe-duty from vessels sailing out of the Pontus; they also left there as a garrison thirty ships and two of the generals, Theramenes and Eumachus, to have charge of the fort, to attend to the outgoing ships, and to harm the enemy in any other way they could.",
          "source": "Xenophon, Hellenica, Book 1, chapter 1, section 22 (events of 410 BC); English translation by Carleton L. Brownson, Xenophon in Seven Volumes, vols. 1-2, Harvard University Press / William Heinemann, 1918-1921. Hosted by the Perseus Digital Library, Tufts University.",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0206%3Abook%3D1%3Achapter%3D1%3Asection%3D22"
        },
        {
          "category": "historical",
          "title": "Woodrow Wilson tells Congress that submarines have made the sea lanes lawless, 2 April 1917",
          "excerpt": "The new policy has swept every restriction aside. Vessels of every kind, whatever their flag, their character, their cargo, their destination, their errand, have been ruthlessly sent to the bottom without warning and without thought of help or mercy for those on board, the vessels of friendly neutrals along with those of belligerents. Even hospital ships and ships carrying relief to the sorely bereaved and stricken people of Belgium, though the latter were provided with safe conduct through the proscribed areas by the German Government itself and were distinguished by unmistakable marks of identity, have been sunk with the same reckless lack of compassion or of principle.",
          "source": "Woodrow Wilson, address to a joint session of Congress, 2 April 1917. Printed in War Messages, 65th Cong., 1st Sess., Senate Doc. No. 5, Serial No. 7264 (Washington, D.C., 1917), pp. 3-8. Transcribed on Wikisource.",
          "href": "https://en.wikisource.org/wiki/Woodrow_Wilson_Urges_Congress_to_Declare_War_on_Germany",
          "image": {
            "src": "/covers/hormuz-cargo-ship-projectile-strike--a1.png",
            "alt": "Painting of a German U-boat on the surface beside a listing merchant steamer, whose crew is rowing away in an open lifeboat across a grey sea.",
            "credit": "Willy Stöwer, Sinking of the Linda Blanche out of Liverpool (1915). Public domain via Wikimedia Commons."
          }
        },
        {
          "category": "literary",
          "title": "Odysseus takes his ship through the narrows and loses six men to the rock",
          "excerpt": "We then sailed on up the narrow strait with wailing. For on one side lay Scylla and on the other divine Charybdis terribly sucked down the salt water of the sea. Verily whenever she belched it forth, like a cauldron on a great fire she would seethe and bubble in utter turmoil, and high over head the spray would fall on the tops of both the cliffs. But as often as she sucked down the salt water of the sea, within she could all be seen in utter turmoil, and round about the rock roared terribly, while beneath the earth appeared black with sand; and pale fear seized my men.",
          "source": "Homer, Odyssey, Book 12, lines 234-243; The Odyssey with an English Translation by A. T. Murray, 2 vols., Harvard University Press / William Heinemann, 1919. Hosted by the Perseus Digital Library, Tufts University.",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0136%3Abook%3D12%3Acard%3D234",
          "image": {
            "src": "/covers/hormuz-cargo-ship-projectile-strike--a2.png",
            "alt": "Dark oil painting of Odysseus braced in the stern of his ship between the many-headed monster Scylla above and the whirlpool Charybdis below, his crew flailing around him.",
            "credit": "Henry Fuseli (Johann Heinrich Füssli), Odysseus before Scylla and Charybdis (1794-1796), Aargauer Kunsthaus, Aarau. Public domain via Wikimedia Commons."
          }
        },
        {
          "category": "literary",
          "title": "A Venetian merchant's friend cannot look at an hourglass without seeing a cargo ship go down",
          "excerpt": "I should not see the sandy hour-glass run / But I should think of shallows and of flats, / And see my wealthy Andrew dock'd in sand / Vailing her high-top lower than her ribs / To kiss her burial. Should I go to church / And see the holy edifice of stone, / And not bethink me straight of dangerous rocks, / Which touching but my gentle vessel's side / Would scatter all her spices on the stream, / Enrobe the roaring waters with my silks; / And, in a word, but even now worth this, / And now worth nothing?",
          "source": "William Shakespeare, The Merchant of Venice, Act I, Scene 1 (Salarino), first printed 1600; text from the Yale Shakespeare edition, ed. William Lyon Phelps (Yale University Press, 1923). Transcribed on Wikisource.",
          "href": "https://en.wikisource.org/wiki/Merchant_of_Venice_(1923)_Yale/Text/Act_I"
        },
        {
          "category": "artistic",
          "title": "Kaulbach paints a whole navy destroyed inside a strait too narrow to turn in",
          "excerpt": "Kaulbach's vast history painting compresses the Battle of Salamis into a single choked channel: triremes rammed together prow to prow, oars snapped, men spilling into water already crowded with wreckage and bodies. On the cliff at the right the Persian king sits enthroned above the slaughter, watching a fleet that outnumbered its enemy be destroyed precisely because the water gave it nowhere to go. The painting is an argument about geography as a weapon - that in a narrow sea, size becomes a liability and a passage becomes a trap.",
          "source": "Wilhelm von Kaulbach, Die Seeschlacht bei Salamis (The Battle of Salamis), oil on canvas, 1868; Maximilianeum, Munich. Object page and high-resolution reproduction on Wikimedia Commons.",
          "href": "https://commons.wikimedia.org/wiki/File:Kaulbach,_Wilhelm_von_-_Die_Seeschlacht_bei_Salamis_-_1868.JPG",
          "image": {
            "src": "/covers/hormuz-cargo-ship-projectile-strike--a4.png",
            "alt": "Panoramic nineteenth-century history painting of the Battle of Salamis: ancient warships jammed together and burning in a narrow channel between cliffs, drowning sailors in the foreground, and the Persian king enthroned on a rocky height at the right watching the destruction.",
            "credit": "Wilhelm von Kaulbach, Die Seeschlacht bei Salamis (1868), Maximilianeum, Munich. Public domain via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "Berlioz writes eight minutes of music about a raider hunting merchant ships",
          "excerpt": "Berlioz's concert overture opens with a downward rush in the strings - a squall with no warning, over almost before it registers - and then drops into a long, becalmed cantilena for divided cellos and violas. When the fast music returns it never lets go: a hard, clipped corsair theme driven by off-beat accents and brass punctuation, closer to pursuit than to celebration. The score began life under other names, including La tour de Nice, before Berlioz settled on the pirate title, and it remains the most single-minded evocation in the orchestral repertoire of a small fast ship overhauling a slow rich one.",
          "source": "Hector Berlioz, Overture 'Le Corsaire', H 101 (Op. 21), composed 1844, revised 1851. Full scores and orchestral parts (public-domain nineteenth-century editions) on IMSLP / Petrucci Music Library.",
          "href": "https://imslp.org/wiki/Overture_%27Le_Corsaire%27,_H_101_(Berlioz,_Hector)",
          "image": {
            "src": "/covers/hormuz-cargo-ship-projectile-strike--a5.png",
            "alt": "Seventeenth-century marine painting of a crowded action at sea: a low Barbary corsair galley with a gold crescent on its stern lies alongside towering Dutch merchantmen under sail, with archers in the galley's bow and gun smoke drifting across the water.",
            "credit": "Lieve Verschuier, Dutch merchant fleet fighting Barbary corsairs (c. 1670), Royal Museums Greenwich (BHC0849). Public domain via Wikimedia Commons."
          }
        }
      ]
    },
    {
      "slug": "ukraine-drones-russian-warehouses-moscow",
      "headline": "Ukrainian drones strike warehouses near Moscow, St Petersburg and Tver, killing five and injuring 10, Russian officials say",
      "overview": "Moscow region governor Andrei Vorobyov said an industrial site at Novoselki in Chekhov, about 69km south of the Kremlin, was hit overnight, with a warehouse catching fire and an electrical substation damaged. Local officials said depots of the retailer Wildberries, often called the Russian Amazon, were also struck in the St Petersburg and Tver regions; Kyiv says they supply the Russian military, which Moscow denies. Russia's defence ministry said it destroyed 320 drones, while Russian strikes on Mykolaiv and Sumy killed at least four people.",
      "genre": "Conflict",
      "sources": [
        {
          "name": "BBC",
          "href": "https://www.bbc.co.uk/news/articles/c151pkww79zo"
        },
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMixwFBVV95cUxQSXNqV053eGo1Y3UtWjV1S0VuZGFOdU1KWlJRb2pDZkFlTl9ETEhta21XNjIxaDMwRDU5S1c0bTBLemdLdkVEN1FZa19jVU5ZWkRHRDd6aVBhZFNYYnRXU3pkbnN3UWlaYnNyMG12Tm9jMF9ZdkczOFQ0OTNXOHEzWTlQZ0NCRkJWUXhhYXdrSGhBdGV1anpWWXdxS053WEwydjAxSVNYanI4SjBUX0xzcEFET2VFMnE0U2Y3NERmbXFLX3h4VklR?oc=5"
        }
      ],
      "href": "#",
      "publishedAt": "2026-08-04",
      "image": {
        "src": "/covers/ukraine-drones-russian-warehouses-moscow.png",
        "alt": "A blast crater and scattered rubble on the apron outside a long modern distribution warehouse, with a damaged car standing beside torn loading-bay doors.",
        "credit": "BBC"
      },
      "rank": 2,
      "edition": "Morning Edition · 4 August 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "429 BC: the Peloponnesians plot a raid on Piraeus, the harbour Athens never thought to guard",
          "excerpt": "Cnemus, Brasidas, and the other Peloponnesian captains allowed themselves to be persuaded by the Megarians to make an attempt upon Piraeus, the port of Athens, which from her decided superiority at sea had been naturally left unguarded and open... There was no fleet on the look-out in the harbor, and no one had the least idea of the enemy attempting a surprise; while an open attack would, it was thought, never be deliberately ventured on or if in contemplation, would be speedily known at Athens.",
          "source": "Thucydides, History of the Peloponnesian War, Book 2, ch. 93, trans. Richard Crawley (London: J. M. Dent; New York: E. P. Dutton, 1910); hosted by the Perseus Digital Library, Tufts University",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0200%3Abook%3D2%3Achapter%3D93"
        },
        {
          "category": "historical",
          "title": "1587: Drake burns the King of Spain's stores at Cadiz and Cape Sagres",
          "excerpt": "Vpon this information our Generall with al speed possible, bending himselfe thither to cut off their said forces and prouisions, vpon the 19. of April entered with his Fleet into the Harbor of Cadiz... After whose departure wee shaped our course toward Cape Sacre, and in the way thither wee tooke at seuerall times of ships, barkes, and Carauels well neere an hundred, laden with hoopes, gally-oares, pipe-staues, and other prouisions of the king of Spaine, for the furnishing of his forces intended against England, al which we burned, hauing dealt fauourably with the men and sent them on shoare.",
          "source": "\"A briefe relation of the notable seruice performed by Sir Francis Drake vpon the Spanish Fleete prepared in the Road of Cadiz... Performed in the yeere 1587\", in Richard Hakluyt, The Principal Navigations, Voyages, Traffiques and Discoveries of the English Nation (1598-1600), Volume 07; Project Gutenberg eBook #9148",
          "href": "https://www.gutenberg.org/cache/epub/9148/pg9148-images.html",
          "image": {
            "src": "/covers/ukraine-drones-russian-warehouses-moscow--a1.png",
            "alt": "Contemporary manuscript chart of Cadiz harbour in 1587, showing the town, the forts and the anchorages of the English ships, with a handwritten key listing the Spanish and Biscayan vessels and the galleys",
            "credit": "Unknown draughtsman (from the papers of Vice-Admiral William Borough), plan of Drake's attack on Cadiz (1587), Ayuntamiento de San Fernando, Cadiz. Public domain via Wikimedia Commons."
          }
        },
        {
          "category": "literary",
          "title": "Homer: the Trojans get fire to the Achaean ships, the army's only way home",
          "excerpt": "And now, tell me, O Muses that hold your mansions on Olympus, how fire was thrown upon the ships of the Achaeans... Therefore he drew back, and the Trojans flung fire upon the ship which was at once wrapped in flame. The fire was now flaring about the ship's stern, whereon Achilles smote his two thighs and said to Patroklos, \"Up, noble horseman, for I see the glare of hostile fire at our fleet; up, lest they destroy our ships, and there be no way by which we may retreat.\"",
          "source": "Homer, Iliad, Book 16 (lines 101-129), rendered into English prose by Samuel Butler (London: Longmans, Green and Co., 1898); hosted by the Perseus Digital Library, Tufts University",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0217%3Abook%3D16%3Acard%3D101",
          "image": {
            "src": "/covers/ukraine-drones-russian-warehouses-moscow--a2.png",
            "alt": "Line engraving in the style of a Greek vase painting: two Greek warriors stand on the deck of a beached ship thrusting long pikes at a press of Trojans who advance swinging blazing torches, with fallen fighters sprawled beneath them",
            "credit": "John Flaxman, \"Ajax defending the Greek Ships against the Trojans\", illustration to Alfred J. Church, The Story of the Iliad (1895). Public domain via Wikimedia Commons."
          }
        },
        {
          "category": "literary",
          "title": "Tolstoy: a Smolensk shopkeeper empties his flour store rather than leave it to the enemy",
          "excerpt": "As Alpátych was driving out of the gate he saw some ten soldiers in Ferapóntov's open shop, talking loudly and filling their bags and knapsacks with flour and sunflower seeds. Just then Ferapóntov returned and entered his shop. On seeing the soldiers he was about to shout at them, but suddenly stopped and, clutching at his hair, burst into sobs and laughter: \"Loot everything, lads! Don't let those devils get it!\" he cried, taking some bags of flour himself and throwing them into the street.",
          "source": "Leo Tolstoy, War and Peace (1869), Book Ten, ch. 4, trans. Louise and Aylmer Maude; Project Gutenberg eBook #2600",
          "href": "https://www.gutenberg.org/files/2600/2600-h/2600-h.htm",
          "image": {
            "src": "/covers/ukraine-drones-russian-warehouses-moscow--a3.png",
            "alt": "Lithograph of French artillerymen working a field gun in front of a smoking round bastion of the Smolensk city wall, with a dead soldier lying in the foreground",
            "credit": "Christian Wilhelm von Faber du Faur, Smolensk, 18 August 1812 (before 1857). Public domain via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "1667: the Dutch burn the English fleet at its moorings, a few miles from Chatham Dockyard",
          "excerpt": "Van Soest painted this within months of the raid itself, when a Dutch squadron broke the chain across the River Medway in June 1667 and fell on the laid-up English warships in the anchorage below Chatham Royal Dockyard, some thirty miles from London. The canvas is a long horizontal line of great ships burning at their moorings, their masts still standing in the smoke, with Dutch boats rowing coolly between them and men in the water in the foreground. On the shore at the right a handful of small figures simply stand and watch: the fleet that was meant to keep the war offshore is going up in flames in its own home river.",
          "source": "Pieter Cornelisz van Soest, \"Dutch Attack on the Medway, June 1667\", oil on canvas, c. 1667, 660 x 1092 mm, National Maritime Museum, Greenwich, London, object no. BHC0295",
          "href": "https://www.rmg.co.uk/collections/objects/rmgc-object-11787",
          "image": {
            "src": "/covers/ukraine-drones-russian-warehouses-moscow--a4.png",
            "alt": "Seventeenth-century marine painting: a line of large wooden warships lies at anchor in a river estuary with flames and dark smoke rising from several of them, small Dutch rowing boats crowded with men move among the hulls, drowning sailors and floating wreckage fill the foreground water, and a few figures watch from the rocky shore",
            "credit": "Pieter Cornelisz van Soest, Dutch Attack on the Medway, June 1667 (c. 1667), National Maritime Museum, Greenwich, London (BHC0295). Public domain via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "Haydn's Mass in Time of War: kettledrums like distant guns break into a church far behind the front",
          "excerpt": "Haydn wrote this C major Mass in 1796, the year French armies drove deep into Austrian territory and the war stopped being something that happened elsewhere; it has been known ever since as the Missa in tempore belli, or in German the Paukenmesse, the kettledrum Mass. In the Agnus Dei the timpani enter almost alone, soft and insistent, like artillery heard from a great distance, and the trumpets answer them. The choir keeps pleading for peace over a sound that has no business in a church, and the movement ends by turning that intrusion into a defiant march.",
          "source": "Joseph Haydn, Mass in C major, Hob.XXII:9 (\"Missa in tempore belli\" / \"Paukenmesse\"), composed 1796, first performed 26 December 1796 at the Piarist Church of Maria Treu, Vienna; first published Leipzig: Breitkopf und Härtel, 1802. Full scores and parts hosted at the International Music Score Library Project (IMSLP)",
          "href": "https://imslp.org/wiki/Mass_in_C_major,_Hob.XXII:9_(Haydn,_Joseph)"
        }
      ]
    },
    {
      "slug": "apple-openai-injunction-trade-secrets",
      "headline": "Apple asks a federal judge to bar OpenAI and two former Apple employees from using its trade secrets",
      "overview": "Apple filed for a preliminary injunction in the US District Court for the Northern District of California, together with a motion for expedited discovery and depositions of former employees Chang Liu and Tang Yew Tan, who now work for OpenAI. The suit alleges the pair took confidential material to help OpenAI's push into consumer hardware. OpenAI said the request is \"based on false information and completely unnecessary because we do not have, nor want, any of their trade secrets.\"",
      "genre": "Technology",
      "sources": [
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMivgFBVV95cUxOYUxSNUIwOXpQcmNEWkp3ckJYUUVuaExoTVlHbWNEaUp2YVVfX2Z6NHRyWkJZOHAycXZZTlduWkIweHpmd25mblFaYU9EZnRXS2FqYkNsSDBJa2FjZThqZ2c2eWp5OVNKcEhvUmxVT3ZseXZyRnpFT2JjR05INGJWdkIxWGxITUdOXzRyUnNtSWp2MVhOR0tkTjU3THctbjlHVVJTQVZxX01tdFpPX2lrcFFSX0dwNkR3eVA0Z2Jn?oc=5"
        },
        {
          "name": "Yahoo Finance",
          "href": "https://finance.yahoo.com/technology/ai/articles/apple-seeks-preliminary-injunction-against-055716616.html"
        }
      ],
      "href": "#",
      "publishedAt": "2026-08-04",
      "image": {
        "src": "/covers/apple-openai-injunction-trade-secrets.png",
        "alt": "An aerial view of Apple's circular glass headquarters building set in landscaped grounds in Cupertino, California.",
        "credit": "Wikimedia Commons"
      },
      "rank": 3,
      "edition": "Morning Edition · 4 August 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Tiberius destroys the workshop of the man who made glass that would not break",
          "excerpt": "In the reign of Tiberius, it is said, a combination was devised which produced a flexible glass; but the manufactory of the artist was totally destroyed, we are told, in order to prevent the value of copper, silver, and gold, from becoming depreciated.",
          "source": "Pliny the Elder, Naturalis Historia (Natural History), c. AD 77, Book 36, chapter 66 (\"The various kinds of glass, and the mode of making it\"), translated by John Bostock and H. T. Riley, London: Taylor and Francis, 1855; hosted by the Perseus Digital Library, Tufts University.",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.02.0137%3Abook%3D36%3Achapter%3D66",
          "image": {
            "src": "/covers/apple-openai-injunction-trade-secrets--a0.png",
            "alt": "A Roman drinking cup of olive-green glass carved in deep openwork relief with struggling figures and vine tendrils, mounted with a gilt-metal rim and foot, standing in a museum case.",
            "credit": "Photograph by Vassil of the Lycurgus Cup, Roman, 4th century AD, British Museum (1958,1202.1) — a dichroic glass whose method of manufacture was lost for some sixteen centuries. CC0 via Wikimedia Commons."
          }
        },
        {
          "category": "historical",
          "title": "Hamilton proposes that the United States pay bounties to men who carry in other nations' secrets",
          "excerpt": "The usual means of that encouragement are pecuniary rewards, and for a time exclusive privileges. The first must be employed according to the occasion and the utility of the invention or discovery. For the last, so far as respects \"authors and inventors,\" provision has been made by law. But it is desirable in regard to improvements and secrets of extraordinary value to be able to extend the same benefit to introducers as well as authors and inventors; a policy which has been practiced with advantage in other countries.",
          "source": "Alexander Hamilton, Report on the Subject of Manufactures, transmitted to the U.S. House of Representatives, 5 December 1791, section 8 (\"The Encouragement of New Inventions and Discoveries at Home and of the Introduction Into the United States of Such as May Have Been Made in Other Countries, Particularly Those Which Relate to Machinery\"); full text transcribed at English Wikisource. The same report notes that \"It is customary with manufacturing nations to prohibit, under severe penalties, the exportation of implements and machines which they have either invented or improved.\"",
          "href": "https://en.wikisource.org/wiki/Report_on_Manufactures"
        },
        {
          "category": "literary",
          "title": "Prometheus itemizes every art he carried across to the other side",
          "excerpt": "Enough about these arts. Now as to the benefits to men that lay concealed beneath the earth—bronze, iron, silver, and gold—who would claim to have discovered them before me? No one, I know full well, unless he likes to babble idly. Hear the sum of the whole matter in the compass of one brief word—every art possessed by man comes from Prometheus.",
          "source": "Aeschylus, Prometheus Bound, lines 500–506, translated by Herbert Weir Smyth, Loeb Classical Library (Cambridge, MA: Harvard University Press, 1926); hosted by the Perseus Digital Library, Tufts University.",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0010%3Acard%3D472",
          "image": {
            "src": "/covers/apple-openai-injunction-trade-secrets--a2.png",
            "alt": "A muscular naked man sprawled backwards across a rock, one wrist held by an iron chain, while a huge dark eagle pins his head with a talon and tears at his side.",
            "credit": "Peter Paul Rubens (with the eagle by Frans Snyders), Prometheus Bound (c. 1611–1618), Philadelphia Museum of Art. Public domain via Wikimedia Commons."
          }
        },
        {
          "category": "literary",
          "title": "Griffin will not publish, because his professor is a thief of ideas",
          "excerpt": "And all that I knew and had in mind a year after I left London—six years ago. But I kept it to myself. I had to do my work under frightful disadvantages. Oliver, my professor, was a scientific bounder, a journalist by instinct, a thief of ideas—he was always prying! And you know the knavish system of the scientific world. I simply would not publish, and let him share my credit. I went on working; I got nearer and nearer making my formula into an experiment, a reality. I told no living soul, because I meant to flash my work upon the world with crushing effect and become famous at a blow.",
          "source": "H. G. Wells, The Invisible Man: A Grotesque Romance (London: C. Arthur Pearson, 1897), chapter 19, \"Certain First Principles\"; Project Gutenberg ebook no. 5230.",
          "href": "https://www.gutenberg.org/files/5230/5230-h/5230-h.htm"
        },
        {
          "category": "artistic",
          "title": "The guild's sampling officials look up from the book",
          "excerpt": "Five wardens of the Amsterdam drapers' guild sit behind a table spread with a worn Persian carpet, an account book open between them, and every one of them has just raised his eyes to the door. These were the staalmeesters, the men empowered to test each bale of dyed cloth and stamp it — or refuse it — on the guild's authority; a bareheaded servant stands at their backs. Rembrandt paints the exact instant of interruption: the craft's gatekeepers turning to see who has walked in.",
          "source": "Rembrandt van Rijn, The Sampling Officials of the Amsterdam Drapers' Guild, known as 'The Syndics' (De Staalmeesters), 1662, oil on canvas, Rijksmuseum, Amsterdam, object no. SK-C-6 (on loan from the City of Amsterdam); object page at the Rijksmuseum, image via Wikimedia Commons (Google Art Project).",
          "href": "https://www.rijksmuseum.nl/en/collection/SK-C-6",
          "image": {
            "src": "/covers/apple-openai-injunction-trade-secrets--a4.png",
            "alt": "Five seated men in black coats, white collars and wide-brimmed black hats behind a table covered with a red-patterned carpet, an open ledger before them, all looking directly out at the viewer; a bareheaded man in dark clothing stands behind them against a panelled wall.",
            "credit": "Rembrandt van Rijn, The Sampling Officials of the Amsterdam Drapers' Guild (1662), Rijksmuseum, Amsterdam. Public domain via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "Allegri's Miserere, which the Vatican forbade anyone to copy out of the chapel",
          "excerpt": "Tibi soli peccavi, et malum coram te feci; ut justificeris in sermonibus tuis, et vincas cum judicaris. Ecce enim in iniquitatibus conceptus sum, et in peccatis concepit me mater mea. Ecce enim veritatem dilexisti; incerta et occulta sapientiæ tuæ manifestasti mihi.",
          "source": "Gregorio Allegri, Miserere mei, Deus, for two choirs (SSATB and SSAB), composed c. 1638 for the Cappella Sistina; the Vatican reserved the setting to its own chapel and long forbade its transcription, and it reached print only around 1771, after the fourteen-year-old Mozart heard it in Holy Week 1770 and wrote it out from memory. Scores, manuscripts and early editions (Burney 1809, Giussani c. 1795, Cappella Sistina MS 206) at IMSLP / the Petrucci Music Library. Sung text: Psalm 50 (51), verses 6–8, Clementine Vulgate, verified at Latin Wikisource (https://la.wikisource.org/wiki/Vulgata_Clementina/Liber_Psalmorum) — \"the uncertain and hidden things of thy wisdom thou hast made manifest to me.\"",
          "href": "https://imslp.org/wiki/Miserere_(Allegri,_Gregorio)",
          "image": {
            "src": "/covers/apple-openai-injunction-trade-secrets--a5.png",
            "alt": "A pale boy in a gold-braided scarlet coat and powdered wig sits at a small keyboard instrument, one hand on the keys, an open manuscript of music propped on the stand, turning his head to look out at the viewer.",
            "credit": "Attributed to Saverio Dalla Rosa (or Giambettino Cignaroli), Portrait of Wolfgang Amadeus Mozart in Verona (1770), painted months before he transcribed Allegri's Miserere from memory. Public domain via Wikimedia Commons."
          }
        }
      ]
    },
    {
      "slug": "bp-q2-profit-doubles-oil-war",
      "headline": "BP's quarterly profit more than doubles to $5.73 billion as the Iran war drives Brent crude above $100 a barrel",
      "overview": "BP's underlying replacement cost profit rose from $2.35 billion a year earlier and beat forecasts of about $5.11 billion, lifted by higher oil and gas prices and strong refining margins. Brent averaged $103.85 a barrel over the quarter against $81.13 in the first three months of the year. Saudi Aramco separately reported a 44% rise in net profit, days after President Trump accused Big Oil of \"making too much money\" from the war.",
      "genre": "Economy",
      "sources": [
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMipwFBVV95cUxOdU9hYzNQV1Ezbmd5OXB4Z1d4QTR0QU80Z0MteS03b002RE5yd2hPb2l5Z0NqLWJ4Y21PSTN0Z29UNVBBVEVyRDRGc0VNUnoySWNlcWU4cUlVXy1iNWd0MVA3V3pXLXN1ZHlyQWcyNzRfcmNxYnJKWFBQTWZ1anZtajRzcFRSd3BIQWJhOVlfQXZUaVU2Y1RlTUhqcHBQZ1ItTjhJeEg0NA?oc=5"
        },
        {
          "name": "RTÉ",
          "href": "https://www.rte.ie/news/business/2026/0804/1586347-bp-quarterly-results/"
        }
      ],
      "href": "#",
      "publishedAt": "2026-08-04",
      "image": {
        "src": "/covers/bp-q2-profit-doubles-oil-war.png",
        "alt": "An offshore oil production platform standing on steel legs in open grey water in the North Sea.",
        "credit": "Wikimedia Commons"
      },
      "rank": 4,
      "edition": "Morning Edition · 4 August 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Athens, 386 BC: the grain dealers who prayed for bad news",
          "excerpt": "For their interests are the opposite of other men's: they make most profit when, on some bad news reaching the city, they sell their corn at a high price. And they are so delighted to see your disasters that they either get news of them in advance of anyone else, or fabricate the rumor themselves; now it is the loss of your ships in the Black Sea, now the capture of vessels on their outward voyage by the Lacedaemonians, now the blockade of your trading ports, or the impending rupture of the truce; and they have carried their enmity to such lengths that they choose the same critical moments as your foes to overreach you.",
          "source": "Lysias, Against the Corn Dealers (Oration 22), §14, delivered at Athens c. 386 BC. Lysias with an English translation by W. R. M. Lamb, M.A., Cambridge, MA: Harvard University Press; London: William Heinemann Ltd., 1930. Hosted by the Perseus Digital Library, Tufts University.",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0154%3Aspeech%3D22%3Asection%3D14"
        },
        {
          "category": "historical",
          "title": "April 1942: a president tells the shareholders their war profits will be cut",
          "excerpt": "Are you a businessman, or do you own stock in a business corporation? Well, your profits are going to be cut down to a reasonably low level by taxation. Your income will be subject to higher taxes. Indeed in these days, when every available dollar should go to the war effort, I do not think that any American citizen should have a net income in excess of $25,000 per year after payment of taxes.",
          "source": "Franklin D. Roosevelt, Fireside Chat of 28 April 1942 (\"On Our National Economic Policy\"), broadcast from the White House, Washington, D.C. Text hosted at Wikisource.",
          "href": "https://en.wikisource.org/wiki/Roosevelt%27s_Fireside_Chat,_28_April_1942",
          "image": {
            "src": "/covers/bp-q2-profit-doubles-oil-war--a1.png",
            "alt": "Franklin D. Roosevelt seated at a White House desk crowded with radio network microphones, papers in hand, delivering his broadcast address of 28 April 1942.",
            "credit": "Photograph by the U.S. Navy, President Franklin Roosevelt delivering his world-wide address of 28 April 1942 (1942), National Museum of the U.S. Navy. Public domain via Wikimedia Commons."
          }
        },
        {
          "category": "literary",
          "title": "Waterloo eve: Becky Sharp prices her horses by the panic",
          "excerpt": "Jos seldom spent a half-hour in his life which cost him so much money. Rebecca, measuring the value of the goods which she had for sale by Jos's eagerness to purchase, as well as by the scarcity of the article, put upon her horses a price so prodigious as to make even the civilian draw back. \"She would sell both or neither,\" she said, resolutely. ... Jos ended by agreeing, as might be supposed of him. The sum he had to give her was so large that he was obliged to ask for time; so large as to be a little fortune to Rebecca.",
          "source": "William Makepeace Thackeray, Vanity Fair: A Novel without a Hero (serialized 1847–48; London: Bradbury and Evans, 1848), Chapter XXXII, \"In Which Jos Takes Flight, and the War Is Brought to a Close.\" Project Gutenberg eBook #599.",
          "href": "https://www.gutenberg.org/files/599/599-h/599-h.htm"
        },
        {
          "category": "literary",
          "title": "Undershaft states the armourer's creed: an honest price, from anyone",
          "excerpt": "CUSINS. What on earth is the true faith of an Armorer? UNDERSHAFT. To give arms to all men who offer an honest price for them, without respect of persons or principles: to aristocrat and republican, to Nihilist and Tsar, to Capitalist and Socialist, to Protestant and Catholic, to burglar and policeman, to black man white man and yellow man, to all sorts and conditions, all nationalities, all faiths, all follies, all causes and all crimes.",
          "source": "Bernard Shaw, Major Barbara (first performed at the Royal Court Theatre, London, 28 November 1905; published 1907), Act III. Project Gutenberg eBook #3790.",
          "href": "https://www.gutenberg.org/files/3790/3790-h/3790-h.htm",
          "image": {
            "src": "/covers/bp-q2-profit-doubles-oil-war--a3.png",
            "alt": "Formal press photograph of Sir Basil Zaharoff, the Vickers arms salesman known as the \"merchant of death,\" an elderly bearded man in a dark overcoat and top hat.",
            "credit": "Agence de presse Meurisse, portrait of Sir Basil Zaharoff (1928), Bibliothèque nationale de France. Public domain via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "\"Next!\" — Standard Oil drawn as an octopus reaching for the White House",
          "excerpt": "A squat oil storage tank sprouts an octopus's tentacles that coil around the steel, copper and shipping industries, wrap a state capitol and the dome of the U.S. Congress, and grope across the page toward the White House. Published in Puck on 7 September 1904, the single-word caption — \"Next!\" — turns an accounting fact, the sheer scale of oil money, into a public grievance about who is being squeezed and who is being bought. It remains the defining image of the fuel monopoly as a creature that grows fat on everyone else's necessity.",
          "source": "Udo J. Keppler (1872–1956), \"Next!\", chromolithograph published in Puck, vol. 56, no. 1436 (New York: J. Ottmann Lith. Co., Puck Bldg., 7 September 1904). Library of Congress Prints and Photographs Division, Washington, D.C., reproduction no. LC-DIG-ppmsca-25884; no known restrictions on publication.",
          "href": "https://www.loc.gov/pictures/item/2001695241/",
          "image": {
            "src": "/covers/bp-q2-profit-doubles-oil-war--a4.png",
            "alt": "Colour cartoon of an oil storage tank labelled Standard Oil with long octopus tentacles gripping factories, ships, a state house and the U.S. Capitol, one tentacle stretching toward the White House.",
            "credit": "Udo J. Keppler, \"Next!\", Puck (1904), Library of Congress Prints and Photographs Division. Public domain via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "\"Et Satan conduit le bal\": Gounod's hymn to the golden calf, sung to soldiers",
          "excerpt": "Le veau d'or est toujours debout; / On encense / Sa puissance / D'un bout du monde à l'autre bout! / Pour fêter l'infâme idole, / Peuples et rois confondus, / Au bruit sombre des écus / Dansent une ronde folle / Autour de son piédestal?... / Et Satan conduit le bal! ... Il contemple, ô rage étrange! / A ses pieds le genre humain / Se ruant, le fer en main, / Dans le sang et dans la fange / Où brille l'ardent métal!... / Et Satan conduit le bal!",
          "source": "Charles Gounod, Faust, CG 4, opera in five acts, libretto by Jules Barbier and Michel Carré; first performed Théâtre Lyrique, Paris, 19 March 1859; first published Paris: Choudens, 1859. Méphistophélès's Act II \"Ronde du veau d'or,\" sung in a tavern to soldiers about to march. Scores hosted at IMSLP / Petrucci Music Library; French text quoted from the libretto edition Faust: A Lyric Drama in Five Acts, Project Gutenberg eBook #45806.",
          "href": "https://imslp.org/wiki/Faust_(Gounod,_Charles)",
          "image": {
            "src": "/covers/bp-q2-profit-doubles-oil-war--a5.png",
            "alt": "Baroque painting of a crowd dancing in a ring around a golden calf raised on a pedestal, a priest gesturing at the idol while Moses appears in the distance.",
            "credit": "Nicolas Poussin, The Adoration of the Golden Calf (c. 1634), National Gallery, London. Public domain via Wikimedia Commons."
          }
        }
      ]
    },
    {
      "slug": "shein-hong-kong-ipo-valuation",
      "headline": "Shein seeks a $30 billion to $40 billion valuation for a Hong Kong listing it could launch in late August",
      "overview": "The fast-fashion group is targeting far less than the $98.2 billion valuation it reached in 2022 and the $64 billion of its private rounds in 2023 and 2024, a mark of the pressure on its business. It began pre-marketing meetings with investors last week, though the final price and the timing are not yet set. Its draft prospectus showed a $99 million quarterly loss after the United States scrapped a duty exemption on small parcels.",
      "genre": "Economy",
      "sources": [
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMiwgFBVV95cUxOb3NieXJtWmw4S21GUWJYMHAycnA0RmZaeWJKMnVCT19OUDdGQkNLZnVwRDQ0Ukc2cDZCV0FBczAzQlBsbnFUVFhqV2dSb3I2VVpnT0ZFMXRnbGpvSEdNMWxtS1BVeHJuNUV0X1JkX1F6UGpWQW9fQkptZzRiY3hkWWRIMXNUTHFGa3hQQ3VxVk53djFFUEJxdzR1V2NHZXVTODZvRDlnekQzUU56WmlsZUxMdTZiSHQtWE1yTmcxOHhtdw?oc=5"
        },
        {
          "name": "MarketScreener",
          "href": "https://www.marketscreener.com/news/shein-targets-a-30bn-to-40bn-valuation-for-its-hong-kong-ipo-ce7f50d9d08dfe20"
        }
      ],
      "href": "#",
      "publishedAt": "2026-08-04",
      "image": {
        "src": "/covers/shein-hong-kong-ipo-valuation.png",
        "alt": "The pale granite towers of Exchange Square in Central, Hong Kong, home of the Hong Kong Stock Exchange, seen from the street below.",
        "credit": "Wikimedia Commons"
      },
      "rank": 5,
      "edition": "Morning Edition · 4 August 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Rome's tax-farming syndicates: \"scarcely a man who is not interested\"",
          "excerpt": "For contracts, too numerous to count, are given out by the censors in all parts of Italy for the repairs or construction of public buildings; there is also the collection of revenue from many rivers, harbours, gardens, mines, and land—everything, in a word, that comes under the control of the Roman government: and in all these the people at large are engaged; so that there is scarcely a man, so to speak, who is not interested either as a contractor or as being employed in the works.",
          "source": "Polybius, Histories, Book 6, ch. 17 (\"Powers of the Senate\"), c. 140 BCE; trans. Evelyn S. Shuckburgh, London and New York: Macmillan, 1889 (repr. Bloomington 1962). Hosted by the Perseus Digital Library, Tufts University.",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0234%3Abook%3D6%3Achapter%3D17"
        },
        {
          "category": "historical",
          "title": "1720: \"A company for carrying on an undertaking of great advantage, but nobody to know what it is\"",
          "excerpt": "But the most absurd and preposterous of all, and which shewed, more completely than any other, the utter madness of the people, was one started by an unknown adventurer, entitled “A company for carrying on an undertaking of great advantage, but nobody to know what it is.” Were not the fact stated by scores of credible witnesses, it would be impossible to believe that any person could have been duped by such a project. The man of genius who essayed this bold and successful inroad upon public credulity, merely stated in his prospectus that the required capital was half a million, in five thousand shares of 100l. each, deposit 2l. per share.",
          "source": "Charles Mackay, Memoirs of Extraordinary Popular Delusions and the Madness of Crowds (London: Richard Bentley, 1841), chapter on \"The South-Sea Bubble.\" Project Gutenberg eBook #24518.",
          "href": "https://www.gutenberg.org/files/24518/24518-h/24518-h.htm",
          "image": {
            "src": "/covers/shein-hong-kong-ipo-valuation--a1.png",
            "alt": "A 1720 Dutch satirical etching titled \"Complaint of the South Sea Company\": an allegorical scene of the collapsed share company, printed above columns of Dutch verse mocking the wind trade.",
            "credit": "Anonymous, Klacht van de Zuidzee-Compagnie, 1720, from Het Groote Tafereel der Dwaasheid (\"The Great Mirror of Folly\"), Rijksmuseum, Amsterdam (RP-P-OB-83.528). Public domain (CC0) via Wikimedia Commons."
          }
        },
        {
          "category": "literary",
          "title": "Thomas Hood counts the true cost of a cheap shirt",
          "excerpt": "With fingers weary and worn, / With eyelids heavy and red, / A woman sat in unwomanly rags, / Plying her needle and thread— / Stitch! stitch! stitch! / In poverty, hunger, and dirt, / And still with a voice of dolorous pitch,— / Would that its tone could reach the rich!— / She sang this \"Song of the Shirt!\" … O, men, with sisters dear! / O, men, with mothers and wives! / It is not linen you 're wearing out, / But human creatures' lives!",
          "source": "Thomas Hood, \"The Song of the Shirt,\" first published anonymously in Punch, Christmas number, 1843; text from The Poetical Works of Thomas Hood. Hosted on Wikisource.",
          "href": "https://en.wikisource.org/wiki/The_Poetical_Works_of_Thomas_Hood/The_Song_of_the_Shirt",
          "image": {
            "src": "/covers/shein-hong-kong-ipo-valuation--a2.png",
            "alt": "Oil painting of a young seamstress alone in a bare attic room, seated at a small table with white cloth and needle in her hands, eyes raised, a guttering candle beside her and pale light at the window.",
            "credit": "Richard Redgrave, The Sempstress (1846), Art Gallery of New South Wales. Public domain via Wikimedia Commons."
          }
        },
        {
          "category": "literary",
          "title": "Trollope: the point was never the railway, it was to float a company",
          "excerpt": "\"If you could realise all the money it wouldn't make a mile of the railway,\" said Paul. Mr. Fisker laughed at him. The object of Fisker, Montague, and Montague was not to make a railway to Vera Cruz, but to float a company. Paul thought that Mr. Fisker seemed to be indifferent whether the railway should ever be constructed or not. It was clearly his idea that fortunes were to be made out of the concern before a spadeful of earth had been moved.",
          "source": "Anthony Trollope, The Way We Live Now (London: Chapman & Hall, 1875), ch. IX, \"The Great Railway to Vera Cruz.\" Project Gutenberg eBook #5231.",
          "href": "https://www.gutenberg.org/cache/epub/5231/pg5231-images.html"
        },
        {
          "category": "artistic",
          "title": "Hogarth engraves the machinery of a bubble",
          "excerpt": "Hogarth's first great satire turns the City of London into a fairground. A vast wooden merry-go-round spins clergymen, aristocrats, prostitutes and shopkeepers in circles beneath a barker's platform, while a devil butchers the body of Fortune and flings gobbets of her flesh to the scrambling crowd below. Off to one side Honesty is broken on a wheel and Honour flogged by Self-Interest; a queue of women waits at a raffle for husbands. The Monument in the background carries an altered inscription blaming the ruin of the city not on fire but on the South Sea speculation.",
          "source": "William Hogarth, The South Sea Scheme (also known as An Emblematical Print on the South Sea Scheme), etching and engraving, 1721; impression in the British Museum, London (registration no. 1841,0809.230). Object image hosted on Wikimedia Commons.",
          "href": "https://commons.wikimedia.org/wiki/File:The_South_Sea_Scheme_(BM_1841,0809.230).jpg",
          "image": {
            "src": "/covers/shein-hong-kong-ipo-valuation--a4.png",
            "alt": "Crowded black-and-white satirical engraving of a London square: a large wooden merry-go-round carries riders of every class, a devil hacks at a female figure on a platform, a man is stretched on a breaking wheel, and dense crowds throng the streets beneath tall buildings and a monument column.",
            "credit": "William Hogarth, The South Sea Scheme (1721), British Museum (1841,0809.230). Public domain via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "Gilbert and Sullivan set the limited-liability prospectus to music",
          "excerpt": "Some seven men form an Association / (If possible, all Peers and Baronets), / They start off with a public declaration / To what extent they mean to pay their debts. / That's called their Capital; if they are wary / They will not quote it at a sum immense. / The figure's immaterial—it may vary / From eighteen million down to eighteenpence. … If you succeed, your profits are stupendous— / And if you fail, pop goes your eighteenpence.",
          "source": "Arthur Sullivan and W. S. Gilbert, Utopia Limited; or, The Flowers of Progress, comic opera in two acts, first performed Savoy Theatre, London, 7 October 1893; vocal score first published London: Chappell & Co., 1893. Scores hosted at IMSLP / Petrucci Music Library. Libretto wording of Mr. Goldbury's Act II song verified against The Complete Plays of Gilbert and Sullivan, Project Gutenberg eBook #808.",
          "href": "https://imslp.org/wiki/Utopia_Limited_(Sullivan,_Arthur)",
          "image": {
            "src": "/covers/shein-hong-kong-ipo-valuation--a5.png",
            "alt": "Wide colour lithograph theatre poster advertising D'Oyly Carte's Opera Company in Gilbert and Sullivan's new opera Utopia, Limited, with costumed characters arrayed across the sheet.",
            "credit": "Strobridge Lithographing Co., poster for D'Oyly Carte's Opera Company in Utopia, Limited (c. 1894), Library of Congress Prints and Photographs Division. Public domain via Wikimedia Commons."
          }
        }
      ]
    },
    {
      "slug": "spokane-wildfire-arson-arrest",
      "headline": "A man is arrested on suspicion of arson over the largest of three wildfires around Spokane that have destroyed more than 700 buildings",
      "overview": "Aaron Farinacci, 37, was allegedly seen kneeling near grass at the site of the Old Trails fire and later found carrying matches and a lighter, the Spokane County sheriff said; he is held on a $1 million bond. More than 60,000 people have evacuated Washington's second-largest city, and Governor Bob Ferguson called the fires \"likely the worst natural disaster in Spokane history\". Authorities are still trying to reach 14 people, and more than 900 firefighters have been assigned to blazes across the state.",
      "genre": "Climate",
      "sources": [
        {
          "name": "BBC",
          "href": "https://www.bbc.co.uk/news/articles/c5y3ppmmev1o"
        },
        {
          "name": "AP",
          "href": "https://news.google.com/rss/articles/CBMiqAFBVV95cUxObjlrYTFEWU1Td0psdzA1WmlzRUpyelV2aEtibTIyY3FidC14QkxNckU3ZmI1VUFmMVFpOExQOFMyQjBXZTlEdUhLTWFqQnd0UUh5ZE16eEZKOThCSFdzQ2RDMTVkbFRKeUN4elR3bHJJQUl6S1l2Um5uSEpRclhIMkZabHRmbjJwTTJLS25QRVNiQjVpSDJPcm9PM3VPeEZZN0J0MUUxTlY?oc=5"
        }
      ],
      "href": "#",
      "publishedAt": "2026-08-04",
      "image": {
        "src": "/covers/spokane-wildfire-arson-arrest.png",
        "alt": "Burnt-out homes and scorched vehicles on a residential street in Spokane after wildfire swept through the neighbourhood.",
        "credit": "BBC"
      },
      "rank": 6,
      "edition": "Morning Edition · 4 August 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Rome burns for six days and the city cannot tell accident from arson",
          "excerpt": "A disaster followed, whether accidental or treacherously contrived by the emperor, is uncertain, as authors have given both accounts, worse, however, and more dreadful than any which have ever happened to this city by the violence of fire. … And no one dared to stop the mischief, because of incessant menaces from a number of persons who forbade the extinguishing of the flames, because again others openly hurled brands, and kept shouting that there was one who gave them authority, either seeking to plunder more freely, or obeying orders.",
          "source": "Tacitus, Annals 15.38 (AD 64 fire of Rome), trans. Alfred John Church and William Jackson Brodribb, rev. Sara Bryant, in Complete Works of Tacitus (New York: Random House, reprinted 1942); hosted by the Perseus Digital Library, Tufts University.",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0078:book=15:chapter=38",
          "image": {
            "src": "/covers/spokane-wildfire-arson-arrest--a0.png",
            "alt": "Night scene of classical Rome engulfed in flames, with an orange-white blaze consuming colonnaded buildings while crowds of small figures flee through the rubble in the foreground",
            "credit": "Hubert Robert, The Fire of Rome (1785), oil on canvas, MuMa – Musée d'art moderne André Malraux, Le Havre (inv. 226). Public domain via Wikimedia Commons."
          }
        },
        {
          "category": "historical",
          "title": "London, 1666: foreigners jailed on suspicion while the official account settles on 'unhappy chance'",
          "excerpt": "Divers Strangers, Dutch and French were during the Fire, apprehended, upon suspicion that they contributed mischievously to it, who are all Imprisoned and Informations prepared to make a severe inquisition thereupon by my Lord Chief Justice Keeling, assisted by some of the Lords of the Privy council, and some principal Members of the City notwithstanding which suspicions, the manner of the burning all along in a Train and so blown forwards in all its way by strong winds, makes us conclude, the whole was the effect of an unhappy chance, or to speak better, the heavy hand of God upon us for our sins",
          "source": "'A True Relation of that sad and deplorable Fire, that happened and brake out in London, the second of September 1666', printed broadside published by authority (York: Stephen Bulkley for Francis Mawbarne, 1666), also carried in The London Gazette of 10 September 1666. The National Archives, Kew, catalogue reference SP 29/170 f150; transcript hosted by The National Archives.",
          "href": "https://www.nationalarchives.gov.uk/education/resources/great-fire-of-london-examine-the-evidence/a-true-relation-of-the-sad-and-deplorable-fire/",
          "image": {
            "src": "/covers/spokane-wildfire-arson-arrest--a1.png",
            "alt": "Seventeenth-century panoramic painting of London ablaze at night, seen across the Thames from near Tower Wharf, with Old London Bridge in silhouette and a long wall of flame consuming the city behind Old St Paul's",
            "credit": "Unknown artist, The Great Fire of London (c. 1675), oil on canvas, Museum of London. Public domain via Wikimedia Commons."
          }
        },
        {
          "category": "literary",
          "title": "A provincial town burns and the governor declares the fire is in men's minds",
          "excerpt": "\"It's all incendiarism! It's nihilism! If anything is burning, it's nihilism!\" … \"They will wipe away the tears of the people whose houses have been burnt, but they will burn down the town. It's all the work of four scoundrels, four and a half! Arrest the scoundrel! He worms himself into the honour of families. They made use of the governesses to burn down the houses.\" … \"He is putting the fire out, your Excellency.\" \"Not likely. The fire is in the minds of men and not in the roofs of houses.\"",
          "source": "Fyodor Dostoevsky, The Possessed (Devils / Demons), Part III, Chapter II ('The End of the Fete'), first serialised 1871–72; trans. Constance Garnett (1916). Project Gutenberg eBook #8117.",
          "href": "https://www.gutenberg.org/files/8117/8117-h/8117-h.htm"
        },
        {
          "category": "literary",
          "title": "Phaethon takes the reins and the whole earth catches: Ovid's account of a world set alight by one hand",
          "excerpt": "The grass is blighted; trees are burnt up with their leaves; the ripe brown crops give fuel for self destruction—Oh what small complaints! Great cities perish with their walls, and peopled nations are consumed to dust—the forests and the mountains are destroyed. … \"How difficult to open my parched mouth, and speak these words! (the vapours choking her), behold my scorching hair, and see the clouds of ashes falling on my blinded eyes, and on my features! What a recompense for my fertility!\"",
          "source": "Ovid (P. Ovidius Naso), Metamorphoses, Book 2, lines 193–300 (the burning of the earth by Phaethon), trans. Brookes More (Boston: Cornhill Publishing Co., 1922); hosted by the Perseus Digital Library, Tufts University.",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0028:book=2:card=201",
          "image": {
            "src": "/covers/spokane-wildfire-arson-arrest--a3.png",
            "alt": "Baroque painting of the sun-chariot breaking apart in mid-air, horses rearing and plunging in different directions as Phaethon falls backwards out of the wrecked car amid tumbling figures and stormy cloud",
            "credit": "Peter Paul Rubens, The Fall of Phaeton (c. 1604–1605, probably reworked c. 1606–1608), oil on canvas, National Gallery of Art, Washington, D.C. Public domain via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "Turner paints a crowd watching its own government burn across the water",
          "excerpt": "Turner stood among the crowds on the Thames on the night of 16 October 1834 and made this canvas from the memory of it: a wall of white-hot flame swallowing the Palace of Westminster, the stone of the buildings dissolving into the same yellow air as the smoke. Westminster Bridge sags and warps under the heat at the right. The whole lower half of the picture is spectators — a dark packed mass of people on the far bank and in boats, faces lit by the fire they have come to watch, and can do nothing about. Turner deliberately exaggerated the height of the blaze; the painting is less a record of the event than of the crowd's helplessness before it.",
          "source": "Joseph Mallord William Turner (British, 1775–1851), 'The Burning of the Houses of Lords and Commons, 16 October 1834', 1835, oil on canvas, 92 × 123.2 cm. The Cleveland Museum of Art, Bequest of John L. Severance, accession no. 1942.647 (Open Access, public domain).",
          "href": "https://www.clevelandart.org/art/1942.647",
          "image": {
            "src": "/covers/spokane-wildfire-arson-arrest--a4.png",
            "alt": "Turner oil painting of the Houses of Parliament on fire at night, a towering column of white and yellow flame reflected in the Thames, with Westminster Bridge crowded with onlookers and dense throngs of spectators silhouetted along the riverbank",
            "credit": "Joseph Mallord William Turner, The Burning of the Houses of Lords and Commons, 16 October 1834 (1835), Cleveland Museum of Art (1942.647). Public domain via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "Verdi's Dies irae: the world dissolved in ash, and the ledger in which nothing hidden stays hidden",
          "excerpt": "Dies iræ! dies illa / Solvet sæclum in favilla / Teste David cum Sibylla! … Liber scriptus proferetur, / in quo totum continetur, / unde mundus judicetur. // Judex ergo cum sedebit, / quidquid latet apparebit: / nil inultum remanebit. — \"Day of wrath! O day of mourning! / See fulfilled the prophets' warning, / Heaven and earth in ashes burning! … Lo! The book, exactly worded, / wherein all hath been recorded: / thence shall judgment be awarded. // When the Judge his seat attaineth, / and each hidden deed arraigneth, / nothing unavenged remaineth.\"",
          "source": "Giuseppe Verdi, Messa da Requiem (1874), 'Dies irae' sequence — full score (Milan: Ricordi), public domain, hosted at IMSLP/Petrucci Music Library. Text: the thirteenth-century sequence attributed to Thomas of Celano, as given in the Requiem Mass of the Roman Missal, with the 1849 English verse translation by William Josiah Irons as printed in the English Missal (1912), hosted at Wikisource (https://en.wikisource.org/wiki/Dies_Irae_(Irons,_1912)).",
          "href": "https://imslp.org/wiki/Requiem_(Verdi,_Giuseppe)"
        }
      ]
    },
    {
      "slug": "new-zealand-antarctic-cold-snap",
      "headline": "An Antarctic blast brings snow to sea level across New Zealand's South Island, closing roads and schools",
      "overview": "A polar air mass swept the island on Tuesday, blanketing Dunedin, the South Island's second-largest city, where police urged people not to travel and reported cars sliding off icy roads, though nobody was hurt. Snow reached the sand at Christchurch's New Brighton Beach. Skiers and snowboarders took the chance to ride down Dunedin's Baldwin Street, billed as the world's steepest residential street.",
      "genre": "Climate",
      "sources": [
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMiyAFBVV95cUxQM0hHR0dCUUNVOV9ULUo2cWZuVDBYUjFkU0ZZSXlUTUx2QUVwY1JmZ0c1Uk1sMU42RXhUYjNsSFZLZGZ3LXhSUTJZWlQ0V3FwcjkxbjdRNjlsNUtuaDNHVS1RdzNHVk0yT3dTRzVkWElvOEVhY3NMMFc1VTBNT0xEZHlXMHdSeVNFTGVfOFJIa3hoVlFjOXVMak9mX2VLWkZicmZ6MDZXTmN1TlJYNDBhbDJoX19mZDNOVkFsVmlnejVIbGdxMnJWQQ?oc=5"
        },
        {
          "name": "U.S. News",
          "href": "https://www.usnews.com/news/world/articles/2026-08-03/antarctic-cold-snap-sweeps-new-zealands-south-island-shuts-roads-and-schools"
        }
      ],
      "href": "#",
      "publishedAt": "2026-08-04",
      "image": {
        "src": "/covers/new-zealand-antarctic-cold-snap.png",
        "alt": "Snow falling on an empty divided road lined with dark trees and suburban houses in Dunedin, New Zealand.",
        "credit": "Wikimedia Commons"
      },
      "rank": 7,
      "edition": "Morning Edition · 4 August 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "The Anglo-Saxon Chronicle records the \"strong winter\" of 1046, remembered by no man then alive",
          "excerpt": "And in the same year, after Candlemas, came the strong winter, with frost and with snow, and with all kinds of bad weather; so that there was no man then alive who could remember so severe a winter as this was, both through loss of men and through loss of cattle; yea, fowls and fishes through much cold and hunger perished.",
          "source": "The Anglo-Saxon Chronicle, entry for A.D. 1046, translated by James Ingram and J. A. Giles; Project Gutenberg eBook #657 (release 1996, rev. 2021), hosted by Project Gutenberg",
          "href": "https://www.gutenberg.org/cache/epub/657/pg657.txt",
          "image": {
            "src": "/covers/new-zealand-antarctic-cold-snap--a0.png",
            "alt": "The opening page of a medieval manuscript written in Old English in brown ink, with a large decorated initial and ruled lines of script, the parchment stained and worn at the edges.",
            "credit": "Monastic scribes of Peterborough, opening page of the Peterborough Chronicle, one of the surviving manuscripts of the Anglo-Saxon Chronicle (Bodleian Library, MS Laud Misc. 636), 12th century. Public domain via Wikimedia Commons."
          }
        },
        {
          "category": "historical",
          "title": "John Evelyn watches London hold a carnival on the frozen Thames, January 1684",
          "excerpt": "Coaches plied from Westminster to the Temple, and from several other stairs to and fro, as in the streets, sleds, sliding with skates, a bull-baiting, horse and coach-races, puppet-plays and interludes, cooks, tippling, and other lewd places, so that it seemed to be a bacchanalian triumph, or carnival on the water, while it was a severe judgment on the land, the trees not only splitting as if the lightning struck, but men and cattle perishing in divers places, and the very seas so locked up with ice, that no vessels could stir out or come in.",
          "source": "John Evelyn, diary entry for 24 January 1684, in The Diary of John Evelyn (Volume 2 of 2), ed. William Bray; Project Gutenberg eBook #42081, hosted by Project Gutenberg",
          "href": "https://www.gutenberg.org/cache/epub/42081/pg42081.txt",
          "image": {
            "src": "/covers/new-zealand-antarctic-cold-snap--a1.png",
            "alt": "An oil painting of the Thames frozen into broken slabs of white ice, crowded with small figures walking, sledding and standing in groups, with Old London Bridge and city spires under a heavy grey sky in the distance.",
            "credit": "Abraham Hondius, The Frozen Thames, Looking Eastwards towards Old London Bridge (1677), Museum of London. Public domain via Wikimedia Commons."
          }
        },
        {
          "category": "literary",
          "title": "Virgil's Georgics: a northern winter where wheels roll over water and wine is cut with axes",
          "excerpt": "Quick ice-crusts curdle on the running stream, / And iron-hooped wheels the water's back now bears, / To broad wains opened, as erewhile to ships; / Brass vessels oft asunder burst, and clothes / Stiffen upon the wearers; juicy wines / They cleave with axes; to one frozen mass / Whole pools are turned; and on their untrimmed beards / Stiff clings the jagged icicle. Meanwhile / All heaven no less is filled with falling snow",
          "source": "Virgil, Georgics, Book III (c. 29 BC), translated into English verse by James Rhoades; Project Gutenberg eBook #232, hosted by Project Gutenberg",
          "href": "https://www.gutenberg.org/cache/epub/232/pg232.txt"
        },
        {
          "category": "literary",
          "title": "Whittier's \"Snow-Bound\": a household wakes to a world unknown, and the boys cut a tunnel through it",
          "excerpt": "And, when the second morning shone, / We looked upon a world unknown, / On nothing we could call our own. / Around the glistening wonder bent / The blue walls of the firmament, / No cloud above, no earth below,— / A universe of sky and snow! / The old familiar sights of ours / Took marvellous shapes; strange domes and towers / Rose up where sty or corn-crib stood, / Or garden wall, or belt of wood; / A smooth white mound the brush-pile showed, / A fenceless drift what once was road",
          "source": "John Greenleaf Whittier, Snow-Bound: A Winter Idyl (first published 1866), illustrated edition; Project Gutenberg eBook #20226, hosted by Project Gutenberg",
          "href": "https://www.gutenberg.org/files/20226/20226-h/20226-h.htm"
        },
        {
          "category": "artistic",
          "title": "Bruegel's \"Hunters in the Snow\" (1565), painted after one of Europe's cruellest winters",
          "excerpt": "Three hunters trudge home over a snowbound ridge with a lean pack of dogs and a single fox to show for the day, while the village below has surrendered entirely to the cold. On the frozen ponds beyond them, tiny figures skate, sweep and play at kolf, a whole town's ordinary business converted into games on the ice. The sky is a flat green-grey, the trees are black, a bird falls across the valley, and the beauty of the scene is inseparable from its hunger.",
          "source": "Pieter Bruegel the Elder, Hunters in the Snow (Winter), 1565, oil on panel, 116.5 x 162 cm, inv. 1838; Kunsthistorisches Museum, Vienna (museum object page)",
          "href": "https://www.khm.at/en/artworks/hunters-in-the-snow-winter-327",
          "image": {
            "src": "/covers/new-zealand-antarctic-cold-snap--a4.png",
            "alt": "A winter landscape seen from a hilltop: three hunters with spears and a pack of dogs walk away from the viewer through deep snow past bare black trees, looking down on a village with two frozen ponds where small figures skate and play, with jagged mountains beyond under a pale green sky.",
            "credit": "Pieter Bruegel the Elder, Hunters in the Snow (Winter) (1565), Kunsthistorisches Museum, Vienna. Public domain via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "Vivaldi's \"L'Inverno\", RV 297: shivering in the icy snow, and walking on the ice",
          "excerpt": "Aggiacciato tremar trà nevi algenti … Passar al foco i di quieti e contenti Mentre la pioggio fuor bagna ben cento … Caminar Sopra’l giaccio",
          "source": "Antonio Vivaldi, Violin Concerto in F minor, RV 297, \"L'Inverno\" (Winter), from Il cimento dell'armonia e dell'inventione, Op. 8 (Amsterdam: Michel-Charles Le Cène, 1725); sonnet mottoes printed in the score, work page and scores hosted by IMSLP / Petrucci Music Library",
          "href": "https://imslp.org/wiki/Violin_Concerto_in_F_minor,_RV_297_(Vivaldi,_Antonio)",
          "image": {
            "src": "/covers/new-zealand-antarctic-cold-snap--a5.png",
            "alt": "An engraved eighteenth-century music part-book page headed \"Alto Viola\" and \"L'Inverno / Concerto IV\", with lines of hand-engraved notation and the sonnet phrases \"Aggiacciato tremar trà nevi algenti\" and \"Al severo Spirar d'orrido vento\" written above the staves.",
            "credit": "Antonio Vivaldi, Il cimento dell'armonia e dell'inventione, Op. 8 (Amsterdam: Le Cène, 1725), viola part, opening of \"L'Inverno\" (Concerto IV); Bibliothèque nationale de France. Public domain via Wikimedia Commons."
          }
        }
      ]
    },
    {
      "slug": "ethiopia-monastery-landslide",
      "headline": "A landslide at an Ethiopian mountain monastery kills 14 worshippers during an overnight prayer service",
      "overview": "A hillside above the Tsadqane Debre Mitmaq St Mary Monastery in the northern Amhara region gave way in the early hours of Monday after a night of heavy rain, sending rock and earth onto pilgrims gathered in a prayer chamber carved into the mountainside for a holy-water healing ritual. Seven people were found injured, five of them seriously, and the search for others has been called off. Eleven of the dead have been buried at the monastery.",
      "genre": "Climate",
      "sources": [
        {
          "name": "BBC",
          "href": "https://www.bbc.co.uk/news/articles/c2lqpx1qd8lo"
        },
        {
          "name": "AP",
          "href": "https://news.google.com/rss/articles/CBMijgFBVV95cUxOcDJxT05SVGVWbld6QjUxWE9NRUpPbTJUVGFrTlo3NDZPLUtmUks1bGRiZ3A5dndESHAwRDRxM0d4em1WTkM0ZlB3WG14R1h1SGN3UGZiZTVkaWZXZExGdUxtV05Mc1JZZnpRWnQ0aC0yYjZnUVZlaVc4N0NnN0o4X2FjSGVQaEthdzRPSkh3?oc=5"
        }
      ],
      "href": "#",
      "publishedAt": "2026-08-04",
      "image": {
        "src": "/covers/ethiopia-monastery-landslide.png",
        "alt": "Bodies wrapped in brightly patterned cloth laid in a row on carpets outside an Ethiopian Orthodox church while robed clergy and mourners stand around them.",
        "credit": "BBC"
      },
      "rank": 8,
      "edition": "Morning Edition · 4 August 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Antioch, 526: the earth opens on a city swollen with pilgrims for the Feast of the Ascension",
          "excerpt": "An impulsive or vibratory motion was felt, enormous chasms were opened, huge and heavy bodies were discharged into the air, the sea alternately advanced and retreated beyond its ordinary bounds, and a mountain was torn from Libanus, and cast into the waves… Two hundred and fifty thousand persons are said to have perished in the earthquake of Antioch, whose domestic multitudes were swelled by the conflux of strangers to the festival of the Ascension.",
          "source": "Edward Gibbon, The History of the Decline and Fall of the Roman Empire, chapter XLIII (first published 1788), J. B. Bury edition; transcribed on Wikisource",
          "href": "https://en.wikisource.org/wiki/The_History_of_the_Decline_and_Fall_of_the_Roman_Empire_(Bury)/XLIII"
        },
        {
          "category": "historical",
          "title": "Goldau, 2 September 1806: after weeks of rain the Rossberg gives way, and a peasant is still begging for holy water when it falls",
          "excerpt": "The preceding years had been unusually wet, the filtering waters had loosened the Nagelfluh, or coarse conglomerate of which the mountain is composed, and the rains having latterly been almost continuous, a great part of the mountain, undermined by the subterranean action of the waters, at length gave way and was hurled into the valley below… the superstitious peasant, fancying he heard the jubilee of demons, hastened down to Arth, on the bank of the lake of Zug, and begged the parish priest, with tears and lamentations, to accompany him, and exorcise the evil spirits with a copious sprinkling of holy water. While he was still speaking, the catastrophe took place.",
          "source": "Georg Hartwig, The Subterranean World (London: Longmans, Green & Co., 1871), chapter on landslips: 'The Destruction of Goldau in 1806'; Project Gutenberg ebook #52466",
          "href": "https://www.gutenberg.org/files/52466/52466-h/52466-h.htm",
          "image": {
            "src": "/covers/ethiopia-monastery-landslide--a1.png",
            "alt": "Hand-coloured etching looking north into the scar left on the Rossberg after the 1806 landslide: a vast funnel of bare rock and rubble spreading down into the valley of Goldau, with lakes on either side and tiny figures on the debris field in the foreground.",
            "credit": "Franz Xaver Triner and Gabriel Lory, Goldau, von Süden, nach dem Bergsturz (c. 1806), coloured outline etching, Gugelmann Collection, Swiss National Library, Prints and Drawings Department. Public domain via Wikimedia Commons."
          }
        },
        {
          "category": "literary",
          "title": "'Or those eighteen, upon whom the tower in Siloam fell' — the oldest refusal to read disaster as verdict",
          "excerpt": "There were present at that season some that told him of the Galileans, whose blood Pilate had mingled with their sacrifices. And Jesus answering said unto them, Suppose ye that these Galileans were sinners above all the Galileans, because they suffered such things? I tell you, Nay: but, except ye repent, ye shall all likewise perish. Or those eighteen, upon whom the tower in Siloam fell, and slew them, think ye that they were sinners above all men that dwelt in Jerusalem? I tell you, Nay: but, except ye repent, ye shall all likewise perish.",
          "source": "The Gospel according to St Luke 13:1–5, King James Bible, 1772 Oxford edition (vol. 2), proofread transcription on Wikisource",
          "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Luke#chapter_13"
        },
        {
          "category": "literary",
          "title": "Thornton Wilder sends a friar to count the dead and find the plan behind them",
          "excerpt": "On Friday noon, July the twentieth, 1714, the finest bridge in all Peru broke and precipitated five travellers into the gulf below… There was a great service in the Cathedral. The bodies of the victims were approximately collected and approximately separated from one another, and there was great searching of hearts in the beautiful city of Lima… If there were any plan in the universe at all, if there were any pattern in a human life, surely it could be discovered mysteriously latent in those lives so suddenly cut off. Either we live by accident and die by accident, or we live by plan and die by plan.",
          "source": "Thornton Wilder, The Bridge of San Luis Rey (New York: Albert & Charles Boni, 1927), Part One: 'Perhaps an Accident'; Project Gutenberg ebook #69768 (public domain in the United States)",
          "href": "https://www.gutenberg.org/cache/epub/69768/pg69768-images.html"
        },
        {
          "category": "artistic",
          "title": "John Martin paints the moment the mountains themselves come down on the crowd",
          "excerpt": "Martin's vast apocalypse shows the solid world losing its footing: a whole cliff face tips out of the darkness and topples toward the viewer, a city sliding off it in fragments, while lightning opens a red seam across the sky. At the bottom of the canvas, small human figures are swept together in a heap of bodies at the base of the falling rock, too small to be individuals and too many to be counted. It is the pictorial extreme of the fear that outlives every landslide — that the ground under a holy place is not a promise, and that stone can be an instrument as easily as a shelter.",
          "source": "John Martin (1789–1854), The Great Day of His Wrath, oil on canvas, 1851–53, Tate, London, accession N05613 (presented by Mrs Frank Ll. Harris, 1945)",
          "href": "https://www.tate.org.uk/art/artworks/martin-the-great-day-of-his-wrath-n05613",
          "image": {
            "src": "/covers/ethiopia-monastery-landslide--a4.png",
            "alt": "Dark apocalyptic oil painting: a huge mass of rock and a ruined city tilt and fall from the upper right into a chasm lit by lurid red and orange light, with crowds of tiny human figures tumbling and piled at the lower edge of the collapsing landscape.",
            "credit": "John Martin, The Great Day of His Wrath (1851–53), Tate, London (N05613). Public domain via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "Haydn writes music for a chapel cut under the ground, and ends it with an earthquake",
          "excerpt": "Man überzog an dem bestimmten Tage die Wände, Fenster und Pfeiler der Kirche mit schwarzem Tuche, und nur eine in der Mitte hängende Lampe von großem Umfange erleuchtete das heilige Dunkel. Zu einer bestimmten Stunde wurden alle Thüren verschlossen, und die Musik begann. [Translation: On the appointed day the walls, windows and pillars of the church were covered with black cloth, and only a single large lamp hanging in the middle lit the holy darkness. At an appointed hour all the doors were shut, and the music began.] The nine movements close with 'Il Terremoto' — the earthquake — marked Presto e con tutta la forza.",
          "source": "Joseph Haydn, Die sieben letzten Worte unseres Erlösers am Kreuze, Hob. XX:1 (1785–87), composed for the subterranean Oratorio de la Santa Cueva, Cádiz; score hosted at IMSLP / Petrucci Music Library. Quoted words are Haydn's own account of the Cádiz performance, given in his preface to the 1801 Breitkopf & Härtel edition and reprinted by his biographer Georg August von Griesinger, Biographische Notizen über Joseph Haydn (Leipzig, 1810).",
          "href": "https://imslp.org/wiki/Sieben_letzten_Worte_unseres_Erl%C3%B6sers_am_Kreuze,_Hob.XX:1_(Haydn,_Joseph)",
          "image": {
            "src": "/covers/ethiopia-monastery-landslide--a5.png",
            "alt": "The dim lower chapel of the Oratorio de la Santa Cueva in Cádiz: a low subterranean vault of dark stone with a carved crucifix above a small altar, lit by a single hanging lamp.",
            "credit": "Benjamin Smith, Altar and crucifix of the lower chapel, Oratorio de la Santa Cueva, Cádiz (2024). CC BY-SA 4.0 via Wikimedia Commons."
          }
        }
      ]
    },
    {
      "slug": "spacex-falcon-9-moon-impact",
      "headline": "NASA says a discarded SpaceX Falcon 9 upper stage will strike the Moon on 5 August at about 5,400mph",
      "overview": "NASA's Center for Near-Earth Object Studies confirmed the spent stage, left over from a January 2025 launch that carried a pair of lunar landers, is on an accidental collision course and will hit near Einstein Crater at about 06:35 GMT on Wednesday. Astronomer Bill Gray, who first plotted the trajectory, predicts a crater more than 17 metres across and a dust plume tens of kilometres high. Telescopes across the Americas, NASA's Lunar Reconnaissance Orbiter and South Korea's Danuri probe will watch what researchers call a rare free experiment and a warning about space debris.",
      "genre": "Science",
      "sources": [
        {
          "name": "BBC",
          "href": "https://www.bbc.co.uk/news/articles/cx25yn22l97o"
        },
        {
          "name": "Space.com",
          "href": "https://www.space.com/astronomy/moon/a-spacex-rocket-will-crash-into-the-moon-next-week-and-scientists-arent-sure-what-to-expect"
        }
      ],
      "href": "#",
      "publishedAt": "2026-08-04",
      "image": {
        "src": "/covers/spacex-falcon-9-moon-impact.png",
        "alt": "The upper section of a SpaceX Falcon 9 rocket, the component on course to strike the Moon.",
        "credit": "BBC"
      },
      "rank": 9,
      "edition": "Morning Edition · 4 August 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Five men at Canterbury watch the new Moon spit fire, June 1178",
          "excerpt": "Hoc anno, die Dominica ante Nativitatem Sancti Johannis Baptistæ, post solis occasum, luna prima, signum apparuit mirabile, quinque vel eo amplius viris ex adverso sedentibus... Ex hujus divisionis medio prosilivit fax ardens, flammam, carbones et scintillas longius proiciens. Corpus interim lunæ quod inferius erat torquebatur quasi anxie, et... ut percussus coluber luna palpitabat. [In this year, on the Sunday before the Nativity of St John the Baptist, after sunset, the moon being new, a marvellous sign appeared to five or more men sitting opposite it... From the middle of this division a burning torch sprang out, flinging fire, coals and sparks far and wide. Meanwhile the lower body of the moon writhed as if in anguish, and... the moon throbbed like a struck snake.]",
          "source": "Gervase of Canterbury, Chronica, entry for A.D. 1178, in The Historical Works of Gervase of Canterbury, Vol. I, ed. William Stubbs (Rolls Series 73; London: Longman and Co., 1879), p. 276. Digitised copy hosted at the Internet Archive.",
          "href": "https://archive.org/details/thehistoricalworksofgerva1",
          "image": {
            "src": "/covers/spacex-falcon-9-moon-impact--a0.png",
            "alt": "Grey, heavily cratered lunar terrain photographed from orbit, with one small brilliant white crater at the centre throwing long pale rays outward across the older, softened ground.",
            "credit": "NASA, orbital photograph of the young rayed crater Giordano Bruno on the Moon's far limb, the crater once proposed as the site of the 1178 event. Public domain via Wikimedia Commons."
          }
        },
        {
          "category": "historical",
          "title": "Apollo 13's discarded third stage is aimed at the Moon and hits it at 5,600 mph, 1970",
          "excerpt": "The S-IVB impacted the lunar surface at 8:09:41 p.m. e.s.t., April 14, 1970, travelling at a speed of 5600 miles/hr. Stage weight at the time of impact was 30 700 pounds... The energy release from the impact was equivalent to an explosion of 7.7 tons of trinitrotoluene (TNT). Seismic signals were first recorded 28.4 seconds after impact and continued for over 4 hours. Some signals were so large that seismometer sensitivity had to be reduced by command from earth to keep the data on scale.",
          "source": "NASA, Apollo 13 Mission Report, MSC-02680 (also NASA-TM-X-66449), prepared by the Mission Evaluation Team, Manned Spacecraft Center, Houston, September 1970, section 11.3 'S-IVB impact', p. 11-10. Hosted on the NASA Technical Reports Server.",
          "href": "https://ntrs.nasa.gov/api/citations/19710003598/downloads/19710003598.pdf",
          "image": {
            "src": "/covers/spacex-falcon-9-moon-impact--a1.png",
            "alt": "Black-and-white photograph of a seismograph strip chart in a control room: three parallel ink traces run across ruled paper, flat at one end and swelling into thick bands of oscillation at the other, with a digital mission-elapsed-time readout above.",
            "credit": "NASA photograph S70-34985, the seismic record of the Apollo 13 S-IVB impact received at the Manned Spacecraft Center, 14 April 1970. Public domain via Wikimedia Commons."
          }
        },
        {
          "category": "literary",
          "title": "Ariosto sends a knight to the Moon, where everything Earth loses is piled up",
          "excerpt": "He, that with other scope had thither soared, / Pauses not all these wonder to peruse: / But led by the disciple of our Lord, / His way towards a spacious vale pursues; / A place wherein is wonderfully stored / Whatever on our earth below we lose. / Collected there are all things whatsoe'er, / Lost through time, chance, or our own folly, here... These were old crowns of the Assyrian land / And Lydian -- as that paladin was taught -- / Grecian and Persian, all of ancient fame; / And now, alas! well-nigh without a name.",
          "source": "Ludovico Ariosto, Orlando Furioso (1532), Canto XXXIV, stanzas 73 and 76, translated by William Stewart Rose (1823-31). Project Gutenberg eBook #615.",
          "href": "https://www.gutenberg.org/cache/epub/615/pg615.txt",
          "image": {
            "src": "/covers/spacex-falcon-9-moon-impact--a2.png",
            "alt": "Wood engraving in which an immense pitted Moon fills the upper two-thirds of the picture while a tiny winged chariot trailing a plume of cloud climbs toward it out of a starfield, with a small bright globe below.",
            "credit": "Gustave Doré, engraved by Charles Barbant, 'In Elijah's chariot, St John and Astolfo travel to the moon in search of Orlando's lost reason', wood engraving for Orlando Furioso, c. 1880. Public domain via Wikimedia Commons."
          }
        },
        {
          "category": "literary",
          "title": "Verne's projectile deviates from its course from some unknown cause",
          "excerpt": "...that it had deviated from its course from some unknown cause, and had not reached its destination; but that it had passed near enough to be retained by the lunar attraction; that its rectilinear movement had been changed to a circular one, and that following an elliptical orbit round the star of night it had become its satellite... It ended with the double hypothesis: either the attraction of the moon would draw it to herself, and the travelers thus attain their end; or that the projectile, held in one immutable orbit, would gravitate around the lunar disc to all eternity.",
          "source": "Jules Verne, From the Earth to the Moon (De la Terre à la Lune, 1865), chapter XXVIII, 'A New Star', in the anonymous English translation published as From the Earth to the moon; and, round the moon. Project Gutenberg eBook #83.",
          "href": "https://www.gutenberg.org/files/83/83-h/83-h.htm"
        },
        {
          "category": "artistic",
          "title": "Méliès puts the capsule in the Moon's eye, 1902",
          "excerpt": "A plaster Moon with a fleshy human face fills the frame, its craters modelled like blemishes on a cheek. The gunners' shell arrives from the left and buries itself in the right eye, and a splash of hand-painted red runs down from the wound while the face goes on grimacing at the audience. It is the first great image of a human machine striking another world, and it was already a joke at the expense of our aim.",
          "source": "Georges Méliès, Le Voyage dans la Lune (Star-Film, Paris, 1902), frame from the only surviving hand-coloured print, colouring by the Thuillier studio. Object page on Wikimedia Commons.",
          "href": "https://commons.wikimedia.org/wiki/File:Melies_color_Voyage_dans_la_lune.jpg",
          "image": {
            "src": "/covers/spacex-falcon-9-moon-impact--a4.png",
            "alt": "Hand-coloured film frame showing a pale yellow moon with a wrinkled human face; a red bullet-shaped capsule is embedded in its right eye and a bright red splash runs down the cheek, against a background of green painted clouds, with film sprocket holes at the edges.",
            "credit": "Georges Méliès, Le Voyage dans la Lune (1902), hand-coloured print frame. Public domain via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "Offenbach's gunners load the Moon shot, Paris 1875",
          "excerpt": "Act I ends at the mouth of a cannon, with the Chœur des artilleurs: 'Nous sommes les petits artilleurs, moyens artilleurs et grands artilleurs. C'est ici, ce n'est pas ailleurs qu'on trouve de vrais artilleurs' — 'We are the little gunners, middling gunners and great gunners. It is here, and nowhere else, that you find real gunners.' The finale it launches is headed in the score simply 'En route pour la lune!', and Act II opens with the travellers rattling inside their shell in the Rondo de l'obus, 'Dans un obus qui fend l'air'.",
          "source": "Jacques Offenbach, Le voyage dans la lune, opéra-féerie in four acts, libretto by Albert Vanloo, Eugène Leterrier and Arnold Mortier, first performed at the Théâtre de la Gaîté, Paris, 26 October 1875; vocal score, piano reduction by Léon Roques (Paris: Choudens père et fils, [1875], plate A.C.3340), scanned from the Bibliothèque nationale de France copy. Hosted at IMSLP / Petrucci Music Library.",
          "href": "https://imslp.org/wiki/Le_voyage_dans_la_Lune_(Offenbach,_Jacques)"
        }
      ]
    },
    {
      "slug": "august-primaries-michigan-senate",
      "headline": "Voters in five states hold primaries on 4 August, with Michigan's Democratic Senate contest the clearest test yet of the party's direction",
      "overview": "Michigan Democrats choose between Abdul El-Sayed, backed by Senator Bernie Sanders, and four-term Representative Haley Stevens, backed by Senate Democratic leader Chuck Schumer, for the seat left open by the retiring Gary Peters; the winner faces Republican Mike Rogers. Michigan voters are also picking nominees to succeed term-limited Governor Gretchen Whitmer. Kansas, Missouri, Virginia and Washington state are settling primaries too, including a bitter Democratic House rematch in Missouri.",
      "genre": "Politics",
      "sources": [
        {
          "name": "AP",
          "href": "https://news.google.com/rss/articles/CBMiugFBVV95cUxNSVhzbjFSb011WlRldWhpNWU5UkJvTEM2UUpwRG11UTQ5VUZzd3VVRWFxd1dUUFBiUTc1X09zWUI3NEhLZlcxbVp5Y3ZfWHNJQUtPS0VHSWRVUFdHRTVUUDdaNkgtaFpGZGNhaTdrNVNQMlRlRVphTVc1Q283bHVzQU5iRGlLQ0dVTFJ1MWdEQlQ3RDdzWExfbnFCanlNblpHU2I1cy10R1ZNeTkyWkM5bVpOSDRLQmJZNWc?oc=5"
        },
        {
          "name": "AP",
          "href": "https://news.google.com/rss/articles/CBMiqgFBVV95cUxQcVBtQW1SWUtxVzJWZTV3VWFpUTF2azcwZWZrdGRmVHN0dE9jeHJlVHZfYWpKV2lQN0tIelhNdnN4a0UxRzRBb2lSa2xOR1J1eWE0VHIxMWdoRTVKSHg3anloa1gwU0pHQWd1Z3hfX3lGa1pjWk1xdzd4LWFNMXB6WDI5UGdvanpzNmVWbC15cG9KMHp2LUVhR2lIeVVINDQ3dGN0blVTZkVhZw?oc=5"
        }
      ],
      "href": "#",
      "publishedAt": "2026-08-04",
      "image": {
        "src": "/covers/august-primaries-michigan-senate.png",
        "alt": "Voters filling in ballots at privacy booths in an American polling place on primary day.",
        "credit": "AP"
      },
      "rank": 10,
      "edition": "Morning Edition · 4 August 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Sparta chose its elders by measuring the shouting",
          "excerpt": "An assembly of the people having been convened, chosen men were shut up in a room near by so that they could neither see nor be seen, but only hear the shouts of the assembly. For as in other matters, so here, the cries of the assembly decided between the competitors. These did not appear in a body, but each one was introduced separately, as the lot fell, and passed silently through the assembly. ... Whoever was greeted with the most and loudest shouting, him they declared elected.",
          "source": "Plutarch, Life of Lycurgus, ch. 26 (c. AD 100), in Plutarch's Lives, with an English translation by Bernadotte Perrin, Cambridge, MA: Harvard University Press / London: William Heinemann, 1914; hosted by the Perseus Digital Library, Tufts University.",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A2008.01.0047%3Achapter%3D26",
          "image": {
            "src": "/covers/august-primaries-michigan-senate--a0.png",
            "alt": "Line engraving of a bearded Lycurgus seated beside a smoking altar, leaning back as a crowd of young Spartan men in tunics and cloaks presses in around him to listen.",
            "credit": "M. A. Barth, Lycurgus gives his laws to the people before his death, engraving from Vorzeit und Gegenwart (Augsburg, 1832). Public domain via Wikimedia Commons."
          }
        },
        {
          "category": "historical",
          "title": "1896: an insurgent faction declares it will take charge of the party",
          "excerpt": "On the fourth of March, 1895, a few Democrats, most of them members of Congress, issued an address to the Democrats of the nation, asserting that the money question was the paramount issue of the hour; declaring that a majority of the Democratic party had the right to control the action of the party on this paramount issue; and concluding with the request that the believers in the free coinage of silver in the Democratic party should organize, take charge of, and control the policy of the Democratic party.",
          "source": "William Jennings Bryan, \"Cross of Gold\" speech concluding debate on the Chicago Platform at the Democratic National Convention, Chicago, 9 July 1896; transcription hosted by Wikisource.",
          "href": "https://en.wikisource.org/wiki/Cross_of_Gold_Speech",
          "image": {
            "src": "/covers/august-primaries-michigan-senate--a1.png",
            "alt": "Colour campaign poster of 1896: an oval portrait of William Jennings Bryan above smaller portraits of his wife and three children, flanked by American flags and ribbons reading 'You shall not press down upon the brow of labor this Crown of Thorns' and 'You shall not crucify mankind upon a Cross of Gold', with the entire speech printed below in dense columns under the heading 'THE SPEECH THAT WON THE NOMINATION'.",
            "credit": "Peter Tracy (publisher), \"16 to 1 ... the speech that won the nomination ... at the National Democratic Convention at Chicago, 1896\" (1896), Library of Congress Prints and Photographs Division. Public domain via Wikimedia Commons."
          }
        },
        {
          "category": "literary",
          "title": "Coriolanus begs for the voices he despises, because custom calls him to it",
          "excerpt": "Most sweet voices! Better it is to die, better to starve, Than crave the hire which first we do deserve. Why in this wolvish toge should I stand here To beg of Hob and Dick that does appear Their needless vouches? Custom calls me to’t. What custom wills, in all things should we do’t? ... Here come more voices. Your voices! For your voices I have fought; Watched for your voices; for your voices bear Of wounds two dozen odd.",
          "source": "William Shakespeare, The Tragedy of Coriolanus (c. 1608), Act II, scene iii; Project Gutenberg eBook #1535, prepared by the PG Shakespeare Team.",
          "href": "https://www.gutenberg.org/files/1535/1535-h/1535-h.htm"
        },
        {
          "category": "literary",
          "title": "Mr Pickwick's rule for a town split in two: shout with the largest",
          "excerpt": "‘Slumkey for ever!’ roared the honest and independent. ‘Slumkey for ever!’ echoed Mr. Pickwick, taking off his hat. ‘No Fizkin!’ roared the crowd. ‘Certainly not!’ shouted Mr. Pickwick. ... ‘Who is Slumkey?’ whispered Mr. Tupman. ‘I don’t know,’ replied Mr. Pickwick, in the same tone. ‘Hush. Don’t ask any questions. It’s always best on these occasions to do what the mob do.’ ‘But suppose there are two mobs?’ suggested Mr. Snodgrass. ‘Shout with the largest,’ replied Mr. Pickwick.",
          "source": "Charles Dickens, The Posthumous Papers of the Pickwick Club, ch. XIII, \"Some Account of Eatanswill; of the State of Parties therein; and of the Election of a Member to serve in Parliament for that ancient, loyal, and patriotic Borough\" (serialised 1836–37); Project Gutenberg eBook #580.",
          "href": "https://www.gutenberg.org/files/580/580-h/580-h.htm"
        },
        {
          "category": "artistic",
          "title": "Bingham puts the whole apparatus of a party contest on one courthouse step",
          "excerpt": "Bingham, a Whig who had himself lost a Missouri legislative seat and then won it back, crowds more than a hundred men onto a single courthouse portico. At the top of the steps a voter swears his oath with his hand raised before the seated judge while the candidate in the blue coat doffs his hat behind him; below, a party worker in a top hat presses a ticket into a wavering elector's fingers. Cider barrel and punch bowl do their own canvassing at the left, one citizen too drunk to stand is hauled up to vote, and another nurses a head bloodied in a brawl. Hung from the portico, a pale blue banner carries the painting's deadpan caption: The Will of the People the Supreme Law. In the dust in front, two boys play, entirely indifferent.",
          "source": "George Caleb Bingham (American, 1811–1879), The County Election, 1852, oil on canvas, 38 x 52 in. (96.5 x 132.1 cm), Saint Louis Art Museum, object number 44:2001, Gift of Bank of America; museum object page at slam.org.",
          "href": "https://www.slam.org/collection/objects/29775/",
          "image": {
            "src": "/covers/august-primaries-michigan-senate--a4.png",
            "alt": "Oil painting of a crowded American election day: dozens of men in hats and shirtsleeves fill a dusty street outside a columned courthouse, one voter taking an oath with his hand raised before an official on the steps, others electioneering, drinking from a punch bowl and cider barrel, a small pale blue banner hanging from the portico, and two boys playing on the ground in the foreground.",
            "credit": "George Caleb Bingham, The County Election (1852), Saint Louis Art Museum (44:2001). Public domain via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "Sullivan sets the joke to music: born a little Liberal or a little Conservative",
          "excerpt": "I often think it's comical—Fal, lal, la! How Nature always does contrive—Fal, lal, la! That every boy and every gal, That's born into the world alive, Is either a little Liberal, Or else a little Conservative! Fal, lal, la! When in that house M.P.s divide, If they've a brain and cerebellum, too, They've got to leave that brain outside, And vote just as their leaders tell 'em to.",
          "source": "Arthur Sullivan (music) and W. S. Gilbert (words), Iolanthe; or, The Peer and the Peri, comic opera in two acts, first performed at the Savoy Theatre, London, 25 November 1882; Act II, Private Willis's song \"When all night long a chap remains.\" Full score, vocal score and parts at IMSLP / Petrucci Music Library (linked); the sung text quoted here is verified against the Wikisource transcription of the libretto at https://en.wikisource.org/wiki/Iolanthe/Act_II.",
          "href": "https://imslp.org/wiki/Iolanthe_(Sullivan,_Arthur)",
          "image": {
            "src": "/covers/august-primaries-michigan-senate--a5.png",
            "alt": "Chromolithographed sheet-music cover reading 'IOLANTHE — Comic Opera in Two Acts', with an inset of coroneted peers in red and ermine robes filing past a bridge, a Grenadier Guards sentry in a bearskin standing at his sentry box, and below a round vignette of fairies dancing before the moonlit Houses of Parliament while a fairy plays a pipe on the riverbank.",
            "credit": "George H. Walker & Co., lithographed cover for Ernst Perabo, Ten Transcriptions for the Piano on Iolanthe, Op. 14 (Boston, 1887). Public domain via Wikimedia Commons."
          }
        }
      ]
    },
    {
      "slug": "ariana-grande-withdraws-london-musical",
      "headline": "Ariana Grande withdraws from a 2027 London staging of 'Sunday in the Park With George' and will step back from public life",
      "overview": "Empire Street Productions said the singer will no longer appear at the Barbican alongside her \"Wicked\" co-star Jonathan Bailey in the Stephen Sondheim musical. A representative said the 33-year-old will take \"a step back from visibility\" after finishing the Eternal Sunshine Tour, citing \"endless, ongoing public scrutiny\". The withdrawal follows her split from Ethan Slater and last week's album release, amid heavy online speculation about her health and appearance.",
      "genre": "Culture",
      "sources": [
        {
          "name": "AP",
          "href": "https://news.google.com/rss/articles/CBMipwFBVV95cUxNNHBGS0ZoVmlWV3l5ZEkzZFV5cHIwWmxtZlVNMHBlUWxJaG9UaTlTSHhXeEpCTlljdG1GSGd6bjE1aFA2X1EtUTREd3dxX2czajhyOTdnZ3RsMWtvTkY2SURJZFRYZE9QZHJkQlVPUGxkSjNseXdFV1lZWG5wQkQzeklhVEx3dnJ1X0phSktyRC1MYzdEN1FzRmdETzVNZ2FCbWJPOFYtSQ?oc=5"
        },
        {
          "name": "BBC",
          "href": "https://www.bbc.co.uk/news/articles/c3ek7g857q4o"
        }
      ],
      "href": "#",
      "publishedAt": "2026-08-04",
      "image": {
        "src": "/covers/ariana-grande-withdraws-london-musical.png",
        "alt": "Ariana Grande photographed on a red carpet in a pale embellished gown, looking away from the cameras.",
        "credit": "AP"
      },
      "rank": 11,
      "edition": "Morning Edition · 4 August 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Phryne is stripped before the Areopagus, c. 350 BC",
          "excerpt": "But Hyperides, when pleading Phryne's cause, as he did not succeed at all, but it was plain that the judges were about to condemn her, brought her forth into the middle of the court, and, tearing open her tunic and displaying her naked bosom, employed all the end of his speech, with the highest oratorical art, to excite the pity of her judges by the sight of her beauty, and inspired the judges with a superstitious fear, so that they were so moved by pity as not to be able to stand the idea of condemning to death “a prophetess and priestess of Venus.”",
          "source": "Athenaeus of Naucratis, The Deipnosophists, Book XIII, ch. 59 (c. AD 200), trans. C. D. Yonge, London: Henry G. Bohn, 1854, p. 942; hosted by the Perseus Digital Library, Tufts University",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A2013.01.0003%3Abook%3D13%3Achapter%3D59",
          "image": {
            "src": "/covers/ariana-grande-withdraws-london-musical--a0.png",
            "alt": "A nude woman shields her face with her arm as an orator pulls away her robe before a semicircle of seated, gesturing male judges in a marble hall.",
            "credit": "Jean-Léon Gérôme, Phryne revealed before the Areopagus (1861), Hamburger Kunsthalle, Hamburg. Public domain via Wikimedia Commons."
          }
        },
        {
          "category": "historical",
          "title": "Fanny Kemble, the most famous actress of her day, writes home about wanting to leave the stage",
          "excerpt": "It is very well that our audiences should look at us as mere puppets, for could they sometimes see the real feelings of those for whose false miseries their sympathies are excited, I believe sufficiently in their humanity to think they would kindly give us leave to leave off and go home. Ours is a very strange trade, and I am sorry to say that every day increases my distaste for it.... For many years—ever since I entered upon my first girlhood, indeed—a quiet, lonely life upon a small independence has been the aim of my desires and my notion of happiness.",
          "source": "Frances Anne (Fanny) Kemble, letter to Harriet St. Leger, Philadelphia, October 22, 1832, printed in Records of a Girlhood (New York: Henry Holt & Co., 1879); Project Gutenberg ebook no. 16478",
          "href": "https://www.gutenberg.org/files/16478/16478-h/16478-h.htm",
          "image": {
            "src": "/covers/ariana-grande-withdraws-london-musical--a1.png",
            "alt": "Painted three-quarter portrait of a dark-haired young woman in a white gown with a sheer organdy sleeve, looking away from the viewer against a dark background.",
            "credit": "Thomas Sully, Fanny Kemble (1834), The White House, Washington, D.C. Public domain via Wikimedia Commons."
          }
        },
        {
          "category": "literary",
          "title": "Charlotte Brontë watches an audience feed on an actress in 'Villette'",
          "excerpt": "Swordsmen thrust through, and dying in their blood on the arena sand; bulls goring horses disembowelled, made a meeker vision for the public—a milder condiment for a people’s palate—than Vashti torn by seven devils: devils which cried sore and rent the tenement they haunted, but still refused to be exorcised. Suffering had struck that stage empress; and she stood before her audience neither yielding to, nor enduring, nor, in finite measure, resenting it: she stood locked in struggle, rigid in resistance.",
          "source": "Charlotte Brontë, Villette (London: Smith, Elder & Co., 1853), Chapter XXIII, “Vashti”; Project Gutenberg ebook no. 9182",
          "href": "https://www.gutenberg.org/files/9182/9182-h/9182-h.htm"
        },
        {
          "category": "literary",
          "title": "Emily Dickinson on the dreariness of being somebody",
          "excerpt": "I'm nobody! Who are you?\nAre you nobody, too?\nThen there's a pair of us—don't tell!\nThey'd banish us, you know.\n\nHow dreary to be somebody!\nHow public, like a frog\nTo tell your name the livelong day\nTo an admiring bog!",
          "source": "Emily Dickinson, “I'm nobody! Who are you?”, in Poems by Emily Dickinson: Second Series, ed. T. W. Higginson and Mabel Loomis Todd (Boston: Roberts Brothers, 1891), Part I: Life, poem I; transcribed at Wikisource",
          "href": "https://en.wikisource.org/wiki/Poems:_Second_Series_(Dickinson)/I%27m_nobody!_Who_are_you%3F",
          "image": {
            "src": "/covers/ariana-grande-withdraws-london-musical--a3.png",
            "alt": "Daguerreotype of a young woman with centre-parted dark hair in a dark pleated dress, seated with one hand resting on a book, gazing steadily at the camera.",
            "credit": "Unknown photographer, daguerreotype of Emily Dickinson (c. 1848), Todd-Bingham Picture Collection, Yale University Manuscripts & Archives. Public domain via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "Seurat's 'A Sunday on La Grande Jatte' — the crowd the musical is built from",
          "excerpt": "Seurat spent two years assembling a riverbank of Parisians out of millions of separate dots of colour: stiff, frontal, hieratic figures who almost never look at one another. A woman with a monkey on a leash stands under a parasol at the right edge, sealed inside her own silhouette; a lone rower reclines in the grass; a small girl in white stares straight out of the picture at us. It is a painting of a public holiday in which nobody visibly appears to be having one — a whole crowd, and inside it, absolute solitude.",
          "source": "Georges Seurat, A Sunday on La Grande Jatte — 1884, oil on canvas, 1884–86 (border added 1888–89), 207.5 × 308.1 cm, Art Institute of Chicago, Helen Birch Bartlett Memorial Collection, accession no. 1926.224; digital file hosted on Wikimedia Commons",
          "href": "https://commons.wikimedia.org/wiki/File:A_Sunday_on_La_Grande_Jatte,_Georges_Seurat,_1884.jpg",
          "image": {
            "src": "/covers/ariana-grande-withdraws-london-musical--a4.png",
            "alt": "Large pointillist painting of Parisians in Sunday dress standing and sitting on a sunlit river island, with parasols, a sailboat on the water, and figures facing rigidly in profile.",
            "credit": "Georges Seurat, A Sunday on La Grande Jatte — 1884 (1884–86), Art Institute of Chicago. Public domain via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "Hugo Wolf sets Mörike's 'Verborgenheit': leave me, O world, leave me be",
          "excerpt": "Laß, o Welt, o laß mich seyn!\nLocket nicht mit Liebesgaben!\nLaßt dies Herz alleine haben\nSeine Wonne, seine Pein!\n\nWas ich traure weiß ich nicht,\nEs ist unbekanntes Wehe;\nImmerdar durch Thränen sehe\nIch der Sonne liebes Licht.\n\nOft bin ich mir kaum bewußt,\nUnd die helle Freude zücket\nDurch die Schwere, so mich drücket\nWonniglich in meiner Brust.\n\nLaß, o Welt, o laß mich seyn!\nLocket nicht mit Liebesgaben!\nLaßt dies Herz alleine haben\nSeine Wonne, seine Pein!",
          "source": "Hugo Wolf, “Verborgenheit” (Seclusion), no. 12 of Gedichte von Eduard Mörike für eine Singstimme und Klavier, composed 1888, published Vienna 1889; scores at IMSLP / Petrucci Music Library. Poem text quoted from the first edition: Eduard Mörike, Gedichte (Stuttgart and Tübingen: Cotta, 1838), p. 143, digitised by the Deutsches Textarchiv",
          "href": "https://imslp.org/wiki/M%C3%B6rike-Lieder_(Wolf,_Hugo)"
        }
      ]
    },
    {
      "slug": "le-porge-wildfire-ww2-shells",
      "headline": "Wildfires in Gironde uncover a cache of about 400 buried World War Two shells in the French village of Le Porge",
      "overview": "More than 100 explosions heard on the second night of the fire, first taken for gas cylinders, are now believed to have been German and French mortar and anti-tank shells set off by the heat. \"There were ammunition depots buried in land within our municipality, but we didn't know it, and they exploded,\" Mayor Martial Zaninetti said, likening the noise to \"the sound of war\". More than 180 houses in the village burned; demining has allowed most residents home, though some areas remain sealed off.",
      "genre": "Culture",
      "sources": [
        {
          "name": "BBC",
          "href": "https://www.bbc.co.uk/news/articles/cgmkxjrrwdvo"
        },
        {
          "name": "France Info",
          "href": "https://www.franceinfo.fr/environnement/evenements-meteorologiques-extremes/incendies-et-feux-de-foret/incendies-en-gironde/des-obus-ont-explose-au-porge-en-gironde-un-stock-de-munitions-de-la-seconde-guerre-mondiale-a-ete-decouvert-au-plus-fort-de-l-incendie_8128559.html"
        }
      ],
      "href": "#",
      "publishedAt": "2026-08-04",
      "image": {
        "src": "/covers/le-porge-wildfire-ww2-shells.png",
        "alt": "A mother and son standing in the burnt-out surroundings of their destroyed home in Le Porge after the Gironde wildfire.",
        "credit": "BBC"
      },
      "rank": 12,
      "edition": "Morning Edition · 4 August 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Germanicus walks the Teutoburg Forest, AD 15: a battlefield six years buried gives up its bones and broken weapons",
          "excerpt": "In the centre of the field were the whitening bones of men, as they had fled, or stood their ground, strewn everywhere or piled in heaps. Near, lay fragments of weapons and limbs of horses, and also human heads, prominently nailed to trunks of trees. In the adjacent groves were the barbarous altars, on which they had immolated tribunes and first-rank centurions.",
          "source": "Tacitus, The Annals, Book 1, chapter 61 (written c. AD 116), translated by Alfred John Church and William Jackson Brodribb, in Complete Works of Tacitus (New York: Random House, reprinted 1942); hosted by the Perseus Digital Library, Tufts University.",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.02.0078%3Abook%3D1%3Achapter%3D61",
          "image": {
            "src": "/covers/le-porge-wildfire-ww2-shells--a0.png",
            "alt": "Painting of Germanic warriors with spears and shields storming through a dark forest against Roman legionaries, with dead bodies and scattered arms in the mud",
            "credit": "Otto Albert Koch, Varusschlacht (1909), Lippisches Landesmuseum Detmold. Public domain via Wikimedia Commons."
          }
        },
        {
          "category": "historical",
          "title": "An anonymous letter, October 1605: England learns that its Parliament has been sitting above a hidden magazine of powder",
          "excerpt": "My lord, out of the love I beare to some of youere frends, I have a care of youre preservacion, therefore I would aduyse you as you tender your life to devise some excuse to shift youer attendance at this parliament, for God and man hath concurred to punishe the wickedness of this tyme, and thinke not slightly of this advertisement, but retire yourself into your country, where you may expect the event in safety, for though there be no apparance of anni stir, yet I saye they shall receive a terrible blow this parliament and yet they shall not seie who hurts them",
          "source": "Anonymous letter delivered to William Parker, 4th Baron Monteagle, 26 October 1605 (the “Monteagle Letter”), original held by The National Archives, Kew, State Papers SP 14/216; transcription hosted at Wikisource.",
          "href": "https://en.wikisource.org/wiki/Monteagle_Letter",
          "image": {
            "src": "/covers/le-porge-wildfire-ww2-shells--a1.png",
            "alt": "Photograph of the original 1605 Monteagle letter, a single sheet of aged paper covered in cramped brown secretary-hand script",
            "credit": "Anonymous, the Monteagle Letter (October 1605), The National Archives (UK), SP 14/216. Public domain via Wikimedia Commons."
          }
        },
        {
          "category": "literary",
          "title": "Virgil foresees the ploughman of Philippi turning up rusted weapons in a field long since at peace",
          "excerpt": "Then, after length of Time, the lab'ring Swains, / Who turn the Turfs of those unhappy Plains, / Shall rusty Piles from the plough'd Furrows take, / And over empty Helmets pass the Rake. / Amaz'd at Antick Titles on the Stones, / And mighty Relicks of Gygantick Bones.",
          "source": "Virgil, Georgics, Book I, lines 493–497 (29 BC), translated by John Dryden, from Virgil's Pastorals, Georgics and Aeneis (London, 1709), volume 1; transcribed at Wikisource. The Latin (“exesa inveniet scabra robigine pila / aut gravibus rastris galeas pulsabit inanis”) is at Perseus, P. Vergilius Maro, Georgicon, ed. J. B. Greenough, book 1, card 466.",
          "href": "https://en.wikisource.org/wiki/The_Works_of_Virgil_(Dryden)/Georgics_(Dryden)/Book_1"
        },
        {
          "category": "literary",
          "title": "Thomas Hardy's dead, woken in their coffins by gunnery out at sea, mistake the noise of war for the Judgment Day",
          "excerpt": "That night your great guns, unawares, / Shook all our coffins as we lay, / And broke the chancel window-squares, / We thought it was the Judgment-day // And sat upright. While drearisome / Arose the howl of wakened hounds: / The mouse let fall the altar-crumb, / The worms drew back into the mounds, / … / Again the guns disturbed the hour, / Roaring their readiness to avenge, / As far inland as Stourton Tower, / And Camelot, and starlit Stonehenge.",
          "source": "Thomas Hardy, “Channel Firing” (written April 1914; published in Satires of Circumstance, Lyrics and Reveries, London: Macmillan, 1914); full text at Wikisource.",
          "href": "https://en.wikisource.org/wiki/Channel_Firing"
        },
        {
          "category": "artistic",
          "title": "Egbert van der Poel paints the morning after the Delft Thunderclap, when the town's own powder store went up beneath it",
          "excerpt": "On 12 October 1654 the gunpowder store the city of Delft kept for its own defence detonated, and van der Poel — a painter of the town, thought to have lost a daughter that day — went back to the scene again and again, leaving more than twenty versions of it. Here the foreground is a field of shattered beams and rubble under a smoke-yellowed sky, with small figures picking through it and a flooded hollow where the magazine had stood. On the horizon the Nieuwe Kerk, the town hall and the Oude Kerk still stand, their roofs stripped of tiles by the blast; the painter signed the panel with the date of the explosion itself.",
          "source": "Egbert van der Poel, A View of Delft after the Explosion of 1654, oil on wood, 36.2 × 49.5 cm, inscribed with the date 12 Octob 1654; The National Gallery, London, NG1061 (Room 25).",
          "href": "https://www.nationalgallery.org.uk/paintings/egbert-van-der-poel-a-view-of-delft-after-the-explosion-of-1654",
          "image": {
            "src": "/covers/le-porge-wildfire-ww2-shells--a4.png",
            "alt": "Seventeenth-century Dutch painting of a flattened town: broken beams, rubble and small figures in the foreground, a pool of water where the powder magazine stood, and church towers still standing on the horizon under a hazy sky",
            "credit": "Egbert van der Poel, A View of Delft after the Explosion of 1654 (1654), The National Gallery, London (NG1061). Public domain via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "Berlioz's Requiem, written for France's war dead, sets four brass choirs at the compass points to sound through the tombs",
          "excerpt": "Tuba mirum spargens sonum / Per sepulchra regionum, / Coget omnes ante thronum. — “The last loud trumpet's wond'rous sound / Shall through the rending tombs rebound, / And wake the nations under ground.”",
          "source": "Hector Berlioz, Grande messe des morts (Requiem), H 75 / Op. 5, composed March–29 June 1837 on a French government commission commemorating the dead of the July Revolution and the soldiers killed at Constantine; No. 2, “Dies iræ. Prose – Tuba mirum,” for tenor, chorus, orchestra and four antiphonal brass choirs placed north, east, west and south; first performed at Les Invalides, Paris, 5 December 1837 under Habeneck. Holograph manuscript (1837, Bibliothèque nationale de France) and printed scores at IMSLP / Petrucci Music Library. The Latin sequence and John Dryden's English rendering quoted here are as printed in The Catholic Prayer Book and Manual of Meditations (1883), Wikisource: https://en.wikisource.org/wiki/The_Catholic_Prayer_Book_and_Manual_of_Meditations/Dies_Irae",
          "href": "https://imslp.org/wiki/Grande_messe_des_morts,_H_75_(Berlioz,_Hector)",
          "image": {
            "src": "/covers/le-porge-wildfire-ww2-shells--a5.png",
            "alt": "First page of Berlioz's 1837 autograph manuscript score of the Grande messe des morts, a densely inked orchestral page with many staves and handwritten instrument names",
            "credit": "Hector Berlioz, Grande messe des morts, first page of the autograph manuscript (1837), Bibliothèque nationale de France (Gallica). Public domain via Wikimedia Commons."
          }
        }
      ]
    },
    {
      "slug": "japan-defence-paper-combat-drones",
      "headline": "Japan's cabinet adopts a 598-page defence white paper calling combat drones essential to 'new ways of warfare'",
      "overview": "The annual paper, adopted on Tuesday, again names China as Japan's biggest strategic challenge and points to the growing presence of Chinese warships in the Pacific. Drawing on Ukraine's use of drones, Tokyo says it will prioritise developing its own for coastal defence alongside long-range cruise missiles. Prime Minister Sanae Takaichi's government, which needs public support for further military spending and recruits, gave the report a cartoon cover and links to video clips in Japanese, English and Chinese.",
      "genre": "Politics",
      "sources": [
        {
          "name": "AP",
          "href": "https://news.google.com/rss/articles/CBMilwFBVV95cUxPRV9ITkwtMlI3eW5rNDJwVldyU0lmR24xSWoyTGxsbXhXQ2lVZldLS3NMWUdoRFVacFdmeXpMRWo3YUFQN19zSTdsdzIwVm5BdlRPaHlOVGF0ckdBWWVJVFhYeS1kOVRxZU1nbmVZWEZ0QXNrNkxEcU1MdHRQbDVaYVI0MTMzaTBSblhKTEJDVjlhVWoyWkJF?oc=5"
        },
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMirAFBVV95cUxPcUJQVVd6S3NYc2pFV2IyYW90UXl5bjJBb3JwcWFDclNEY1VMbzNYZ1V0cjhvd0lBZVFGMlJ0bzYzNl83TVY1Z0U5M1JsXzA3THlBN2xhUjJkOWpadVhCenRTX0QxME5xSnExeWFpRFF0WVd3ZzNxZ1BJeEQzVGctNlBRUEs3ZHllVVBJNWk4TzlNQmFqY3pHV0JEZll1S1RWUDNjRFlFeXRoWHpB?oc=5"
        }
      ],
      "href": "#",
      "publishedAt": "2026-08-04",
      "image": {
        "src": "/covers/japan-defence-paper-combat-drones.png",
        "alt": "A Japanese naval destroyer moored at a floodlit quayside under a deep twilight sky.",
        "credit": "AP"
      },
      "rank": 13,
      "edition": "Morning Edition · 4 August 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Themistocles talks Athens out of its dividend and into two hundred ships",
          "excerpt": "The advice of Themistocles had prevailed on a previous occasion. The revenues from the mines at Laurium had brought great wealth into the Athenians' treasury, and when each man was to receive ten drachmae for his share, Themistocles persuaded the Athenians to make no such division but to use the money to build two hundred ships for the war, that is, for the war with Aegina. This was in fact the war the outbreak of which saved Hellas by compelling the Athenians to become seamen.",
          "source": "Herodotus, The Histories, Book 7, chapter 144; English translation by A. D. Godley, Cambridge, MA: Harvard University Press, 1920. Hosted by the Perseus Digital Library, Tufts University.",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0126%3Abook%3D7%3Achapter%3D144",
          "image": {
            "src": "/covers/japan-defence-paper-combat-drones--a0.png",
            "alt": "Weathered marble relief fragment carved with the flank of an Athenian trireme, showing three staggered banks of nude rowers bending over their oars beneath the ship's deck rail.",
            "credit": "The Lenormant Relief, fragment of a votive relief showing an Athenian trireme, 4th century BC, Acropolis Museum, Athens. Photograph by Tilemahos Efthimiadis, CC BY-SA 2.0 via Wikimedia Commons."
          }
        },
        {
          "category": "historical",
          "title": "The clause Japan wrote against itself: Article 9 renounces war forever",
          "excerpt": "Aspiring sincerely to an international peace based on justice and order, the Japanese people forever renounce war as a sovereign right of the nation and the threat or use of force as means of settling international disputes. (2) In order to accomplish the aim of the preceding paragraph, land, sea, and air forces, as well as other war potential, will never be maintained. The right of belligerency of the state will not be recognized.",
          "source": "The Constitution of Japan, promulgated 3 November 1946, effective 3 May 1947; Chapter II, \"Renunciation of War,\" Article 9. English text based on the edition of the Government Printing Bureau, published online by the National Diet Library of Japan (\"Birth of the Constitution of Japan\").",
          "href": "https://www.ndl.go.jp/constitution/e/etc/c01.html",
          "image": {
            "src": "/covers/japan-defence-paper-combat-drones--a1.png",
            "alt": "Opening page of the original Constitution of Japan, brush-written in vertical columns of Japanese characters on aged paper ruled with thin red lines, beginning with the Emperor's rescript.",
            "credit": "Government of Japan, opening page (imperial rescript) of the original copy of the Constitution of Japan, 3 November 1946. Public domain via Wikimedia Commons."
          }
        },
        {
          "category": "literary",
          "title": "Milton's rebel angels invent artillery, and everyone wishes they had thought of it first",
          "excerpt": "These in their dark nativity the deep / Shall yield us, pregnant with infernal flame; / Which, into hollow engines, long and round, / Thick rammed, at the other bore with touch of fire / Dilated and infuriate, shall send forth / From far, with thundering noise, among our foes / Such implements of mischief, as shall dash / To pieces, and o’erwhelm whatever stands / Adverse, that they shall fear we have disarmed / The Thunderer of his only dreaded bolt. … The invention all admired, and each, how he / To be the inventer missed; so easy it seemed / Once found, which yet unfound most would have thought / Impossible",
          "source": "John Milton, Paradise Lost, Book VI (first published 1667; revised 1674), speech of Satan on the making of cannon. Project Gutenberg eBook No. 26.",
          "href": "https://www.gutenberg.org/files/26/26-h/26-h.htm"
        },
        {
          "category": "literary",
          "title": "H. G. Wells imagines an air war fought without telling the public",
          "excerpt": "One of the most striking facts historically about this war, and the one that makes the complete separation that had arisen between the methods of warfare and the necessity of democratic support, is the effectual secrecy of the Washington authorities about their airships. They did not bother to confide a single fact of their preparations to the public. They did not even condescend to talk to Congress. They burked and suppressed every inquiry. The war was fought by the President and the Secretaries of State in an entirely autocratic manner. … So they took great pains to direct the popular mind towards defensive artillery, and to divert it from any thought of aerial battle.",
          "source": "H. G. Wells, The War in the Air, 1908; Chapter VI, \"How War Came to New York.\" Project Gutenberg eBook No. 780.",
          "href": "https://www.gutenberg.org/files/780/780-h/780-h.htm"
        },
        {
          "category": "artistic",
          "title": "Kiyochika sells the searchlight: a night attack lit by the newest machine",
          "excerpt": "Heijô kôgeki denki shiyô no zu — \"Illustration of the Use of Electricity in the Attack on Pyongyang.\" Across three joined sheets a hard white beam leaps from a Japanese searchlight crew silhouetted on the left bank, cuts the whole width of the night, and pins the Chinese fort on the far right, which is already blooming into orange fire and smoke. Below the beam, artillerymen in dark tunics manhandle field guns down into the shallows while an officer sits calmly at a folding table with a lamp. The hero of the picture is not a soldier but a piece of equipment.",
          "source": "Kobayashi Kiyochika, Heijô kôgeki denki shiyô no zu (\"Using an Electric Searchlight in the Attack on Pyongyang\"), colour woodcut triptych, 353 × 723 mm, published by Inoue Kichijirô (Teikadô), 1894. Rijksmuseum, Amsterdam, object no. RP-P-2010-310-14.",
          "href": "https://www.rijksmuseum.nl/en/collection/object/Een-elektrisch-zoeklicht-gebruiken-bij-de-aanval-op-Pyongyang--b93d13f0b34a691277fa6cc44a1e4401",
          "image": {
            "src": "/covers/japan-defence-paper-combat-drones--a4.png",
            "alt": "Japanese woodblock print triptych of a night battle: a white searchlight beam sweeps from left to right across dark water, gunners drag field cannon through the shallows in the foreground, and an enemy fort on the right explodes in orange fire.",
            "credit": "Kobayashi Kiyochika, Using an Electric Searchlight in the Attack on Pyongyang (1894), Rijksmuseum, Amsterdam (RP-P-2010-310-14). Public domain via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "Beethoven's battle machine: a victory scored for cannon, rattles and a mechanical orchestra",
          "excerpt": "WELLINGTONS SIEG, oder: die Schlacht bey Vittoria. In Musik gesetzt von Ludwig van Beethoven. 91tes Werk. Vollständige Partitur. Eigenthum der Verleger. Wien im Verlag bey S. A. Steiner und Comp., so wie auch zu haben in Leipzig bey Breitkopf und Härtel — C. F. Peters — Fr. Hoffmeister,",
          "source": "Ludwig van Beethoven, Wellingtons Sieg, oder die Schlacht bey Vittoria, Op. 91 (composed 1813 for Mälzel's panharmonicon; scored with cannon, rattles and separate French and English field drums). First edition full score, Vienna: S. A. Steiner und Comp., plate 2367, 1816; holograph manuscript at the Staatsbibliothek zu Berlin. Scores hosted at IMSLP / Petrucci Music Library.",
          "href": "https://imslp.org/wiki/Wellingtons_Sieg,_Op.91_(Beethoven,_Ludwig_van)",
          "image": {
            "src": "/covers/japan-defence-paper-combat-drones--a5.png",
            "alt": "Engraved title page of an 1816 Viennese music print, foxed and browned, with elaborate copperplate lettering reading Wellingtons-Sieg, oder: die Schlacht bey Vittoria, in Musik gesetzt von Ludwig van Beethoven, 91tes Werk, and a library stamp at the top.",
            "credit": "Title page of the first edition full score of Beethoven's Wellingtons Sieg, Op. 91 (Vienna: S. A. Steiner und Comp., 1816), copy of the Bayerische Staatsbibliothek, Munich. Public domain via Wikimedia Commons."
          }
        }
      ]
    },
    {
      "slug": "rhine-record-low-drought-europe",
      "headline": "The Rhine falls to record-low water levels as a severe drought grips rivers across Europe",
      "overview": "Water levels on the Rhine dropped to record lows as a hot, dry summer parched rivers across Europe, with the Danube and Po also shrinking. The low water has curtailed cargo shipping and cut hydroelectric output, officials said. Drought warnings stretched from Britain to the Balkans as wildfires burned in France and Greece.",
      "genre": "Climate",
      "sources": [
        {
          "name": "BBC",
          "href": "https://www.bbc.co.uk/news/articles/c78gn8zvrx4o"
        },
        {
          "name": "AP",
          "href": "https://news.google.com/rss/articles/CBMisgFBVV95cUxOWVJ3YktkdzVuTjE5NnBtRXhReVlTNDdxZUpfOHZGTmhfVjRtd0pka2J4Nk5kR3FwNHFTWGc1aVIzX0ZteWF5dGRfdW1fdl9BVF9uRmctOGxnd1QxbzlicEpzaWlwYXVrRWFzLWFTM3VhT1AzV3llelkyUEhCWnRhblRCRHkwdW45aFA4SjZNdEkweExfNU4wMzcxWUFjcnNENm5lV2d2UFZKdFdmZ1NuNnZn?oc=5"
        }
      ],
      "href": "#",
      "publishedAt": "2026-08-03",
      "image": {
        "src": "/covers/rhine-record-low-drought-europe.png",
        "alt": "A wide river reduced to a narrow channel between broad expanses of exposed, cracked riverbed and gravel banks under a hazy summer sky.",
        "credit": "BBC"
      },
      "lead": true,
      "rank": 14,
      "edition": "Evening Edition · 3 August 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "The Famine Stela of Sehel Island",
          "excerpt": "Carved onto a granite boulder overlooking the Nile at the First Cataract, this inscription speaks in the voice of the pharaoh Djoser, recalling seven years in which the god Hapy — the annual flood — failed to arrive: the grain shriveled, the granaries stood empty, and the whole land starved until the king appealed to the ram-god Khnum at the river's supposed source to loose the waters again. It is humanity's oldest surviving account of a nation brought to ruin by a great river running low, and a reminder that in the ancient world a shrunken river meant not inconvenience but famine.",
          "source": "The Famine Stela, Sehel Island near Aswan, Egypt (carved in the Ptolemaic period, c. 3rd–2nd c. BCE, purporting to record the reign of King Djoser of the 3rd Dynasty); English translation by Miriam Lichtheim, Ancient Egyptian Literature, vol. 3 (1980), via Attalus.org",
          "href": "https://www.attalus.org/egypt/famine_stele.html"
        },
        {
          "category": "historical",
          "title": "The Elbe Hunger Stone at Děčín",
          "excerpt": "\"Wenn du mich siehst, dann weine\" — \"If you see me, weep.\" This warning is cut into a boulder that lies submerged in the Elbe and reappears only in the driest years, when the water sinks to famine-low levels; the Děčín stone's oldest legible date is 1616. Generations of Central Europeans carved such marks so that anyone who saw the same rock bared again by drought would know hard times — failed harvests and hunger — were on the way. When the great European droughts of recent summers exposed these stones once more, an early-modern message crossed four centuries intact.",
          "source": "Hunger stone, Elbe River at Děčín, Czech Republic; the boulder's oldest legible carving dates to 1616. Documented via Wikipedia / Wikimedia Commons",
          "href": "https://en.wikipedia.org/wiki/Hunger_stone",
          "image": {
            "src": "/covers/rhine-record-low-drought-europe--a1.png",
            "alt": "A large inscribed stone exposed above the low water of the Elbe river at Děčín during the drought of summer 2015",
            "credit": "Photo: Norbert Kaiser, hunger stone in the Elbe at Děčín during the low water of summer 2015. CC BY-SA 3.0 DE via Wikimedia Commons."
          }
        },
        {
          "category": "literary",
          "title": "Ovid, Metamorphoses, Book II (The Fall of Phaethon)",
          "excerpt": "Caister's streams amid. In terror Nile / Fled to the farthest earth, and sunk his head, / Yet undiscover'd!--void the seven-fold stream, / His mouth seven dry and dusty vales disclos'd. / Now Hebrus dries, and Strymon, Thracian floods: / And streams Hesperian, Rhine; and Rhone; and Po; / And Tiber, destin'd all the world to rule.",
          "source": "Ovid, The Metamorphoses of Publius Ovidius Naso in English Blank Verse, Book the Second, translated by J. J. Howard (London, 1807), Project Gutenberg",
          "href": "https://www.gutenberg.org/files/28621/28621-h/28621-h.htm"
        },
        {
          "category": "literary",
          "title": "T. S. Eliot, The Waste Land (Part V)",
          "excerpt": "Here is no water but only rock / Rock and no water and the sandy road / The road winding above among the mountains / Which are mountains of rock without water / If there were water we should stop and drink / Amongst the rock one cannot stop or think / Sweat is dry and feet are in the sand ... Dead mountain mouth of carious teeth that cannot spit ... There is not even silence in the mountains / But dry sterile thunder without rain",
          "source": "T. S. Eliot, The Waste Land (1922), Part V, 'What the Thunder Said', Project Gutenberg",
          "href": "https://www.gutenberg.org/files/1321/1321-h/1321-h.htm"
        },
        {
          "category": "artistic",
          "title": "Elijah in the Wilderness",
          "excerpt": "Leighton paints the prophet Elijah collapsed on sun-baked rock during the three-year drought he had called down upon Israel (1 Kings 17–18), his sinewy, sun-darkened body sprawled in exhaustion while an angel stoops to offer bread and a cruse of water. The cracked tawny wilderness and the fallen man make visible what a killing drought does to the living — a land where the rains have simply stopped and even the strongest are laid low. It turns the abstraction of a rainless season into a single human body at the edge of endurance.",
          "source": "Frederic Leighton, Elijah in the Wilderness (1877–78), oil on canvas, Walker Art Gallery, Liverpool; Google Art Project via Wikimedia Commons",
          "href": "https://commons.wikimedia.org/wiki/File:Frederic,_Lord_Leighton_-_Elijah_in_the_Wilderness_-_Google_Art_Project.jpg",
          "image": {
            "src": "/covers/rhine-record-low-drought-europe--a4.png",
            "alt": "An exhausted, sun-darkened Elijah lies on parched rock in a desert while an angel brings him bread and water",
            "credit": "Frederic Leighton, Elijah in the Wilderness (1877–78), Walker Art Gallery, Liverpool. Public domain via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "Haydn, The Seasons — 'Summer'",
          "excerpt": "In the 'Summer' part of Haydn's oratorio, the music depicts a countryside gasping beneath a merciless noon sun — sultry, shimmering air, languishing flocks, and fields drooping in the heat — before a great orchestral thunderstorm at last breaks the drought with rain. Composed in 1801 to Gottfried van Swieten's libretto, it is one of the most vivid portraits in all of music of parched land longing for water, and of the relief when the sky finally opens. The listener hears the very arc of a hot, dry summer and its overdue rescue.",
          "source": "Joseph Haydn, Die Jahreszeiten (The Seasons), Hob. XXI:3, Part 2 'Der Sommer' (first performed 1801), full and vocal scores at IMSLP",
          "href": "https://imslp.org/wiki/Die_Jahreszeiten,_Hob.XXI:3_(Haydn,_Joseph)"
        }
      ]
    },
    {
      "slug": "amazon-three-trillion-stocks-rally",
      "headline": "Amazon becomes the fourth company valued at $3 trillion as US stocks rally near a record on falling oil prices",
      "overview": "Amazon's market value closed above $3 trillion for the first time, joining a small club of the world's most valuable companies as AI and cloud growth powered a broad rally. US stock indexes climbed near record highs after oil prices fell sharply, easing Wall Street's worries about inflation. The Dow closed at a record.",
      "genre": "Economy",
      "sources": [
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMiwgFBVV95cUxOT2h5X3dkMzhkV3ZxZ3UtZ2ZlMEh4bVVzeUF6RDlYS3R6SEFrSXlRRlJ6SDBCVFZITUV1eUYwX21VcFlIQkhrV05NM3Rudnp4LVNxNEN5WnlFM0FrSDZFNC1nX2dISGx5Z0xqQndiWHRqdkxDaHJ3ek5hcjNnZERtWTRnYThyd3MwRkVHdmg3djFLeFdFMFBLeW91NXVaVjUxQUpwSDhkUUpBa2hHNGxlcHVEbUc2NUlrUjdIYWhwcWFsZw?oc=5"
        },
        {
          "name": "AP",
          "href": "https://news.google.com/rss/articles/CBMimwFBVV95cUxOWTMweFRadm51ZDBCVG5fZlAzdEFVZGZpZ2dVcVdsb0dfRHI4M3VzTWI4YllxTDBQUzJNUDQwLXFjZnVMMG43aW0zbnJ1ZmxyODhmdk1zeXhIVmdxc2F4OUlPNWZ6MFFZRTlKNnduenlqcjJDQ3JNWHpuZFBpejZmTXVva3ZwTWg1cnduR2hhMTJQYmVVZ3JacklNYw?oc=5"
        }
      ],
      "href": "#",
      "publishedAt": "2026-08-03",
      "image": {
        "src": "/covers/amazon-three-trillion-stocks-rally.png",
        "alt": "The columned neoclassical Wall Street facade of the New York Stock Exchange building, draped with a large flag.",
        "credit": "Wikimedia Commons"
      },
      "rank": 15,
      "edition": "Evening Edition · 3 August 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Crassus, the richest man in Rome",
          "excerpt": "For at the outset he was possessed of not more than three hundred talents; ... when he made a private inventory of his property before his Parthian expedition, he found that it had a value of seventy-one hundred talents. ... And though he owned numberless silver mines, and highly valuable tracts of land with the labourers upon them, nevertheless one might regard all this as nothing compared with the value of his slaves.",
          "source": "Plutarch, Life of Crassus, ch. 2, trans. Bernadotte Perrin (Loeb, 1916); Perseus Digital Library, Tufts University",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:2008.01.0038:chapter=2"
        },
        {
          "category": "historical",
          "title": "Charter of the Dutch East India Company (VOC), 1602 — the first megacorporation",
          "excerpt": "As the prosperity of the united Netherlands consists principally of the navigation, trade and commerce, which have been carried on from these countries from time immemorial, and which from time to time have been praiseworthily increased ... some principal merchants of the aforementioned countries, lovers of navigation, trade and commerce on foreign countries ... have taken in hand the very praiseworthy navigation, trade and commerce on the East Indies.",
          "source": "Charter granted by the States-General of the United Netherlands, 20 March 1602; English translation, Wikisource",
          "href": "https://en.wikisource.org/wiki/Translation:VOC_charter",
          "image": {
            "src": "/covers/amazon-three-trillion-stocks-rally--a1.png",
            "alt": "A sunlit colonnaded courtyard thronged with merchants trading beneath arches, Emanuel de Witte's painting of the Amsterdam stock exchange",
            "credit": "Emanuel de Witte, 'Courtyard of the Amsterdam Stock Exchange' (1653), Museum Boijmans Van Beuningen, Rotterdam. Via Wikimedia Commons (public domain). The world's first stock exchange, where VOC shares were traded."
          }
        },
        {
          "category": "literary",
          "title": "Swift on the South Sea Bubble: 'What magick makes our money rise'",
          "excerpt": "Ye wise philosophers, explain / What magick makes our money rise, / When dropt into the Southern main; / Or do these jugglers cheat our eyes? ... Put in your money fairly told; / Presto! be gone — 'Tis here again: / Ladies and gentlemen, behold, / Here's every piece as big as ten.",
          "source": "Jonathan Swift, 'The South-Sea Project' (1721), in The Works of the Rev. Jonathan Swift, Vol. 7; Wikisource",
          "href": "https://en.wikisource.org/wiki/The_Works_of_the_Rev._Jonathan_Swift/Volume_7/The_South_Sea_Project"
        },
        {
          "category": "literary",
          "title": "Melmotte, 'the very navel of the commercial enterprise of the world'",
          "excerpt": "It seemed that there was but one virtue in the world, commercial enterprise,—and that Melmotte was its prophet. ... at that time, Melmotte was not the strong rock, the impregnable tower of commerce, the very navel of the commercial enterprise of the world,—as all men now regarded him.",
          "source": "Anthony Trollope, The Way We Live Now (1875); Project Gutenberg (eBook #5231)",
          "href": "https://www.gutenberg.org/cache/epub/5231/pg5231.txt"
        },
        {
          "category": "artistic",
          "title": "Hogarth, 'The South Sea Scheme' (1721)",
          "excerpt": "Often called the first editorial cartoon, Hogarth's crowded scene turns the 1720 speculative mania into a carnival of folly: a merry-go-round of stock-jobbers whirls beside a monument to the ruin the bubble caused, while Honesty is broken on the wheel and a mob scrambles for worthless paper fortunes. It is a portrait of a market intoxicated by its own soaring valuations — and of the reckoning that follows.",
          "source": "William Hogarth, 'Emblematical Print on the South Sea Scheme,' engraving, 1721; Wikimedia Commons",
          "href": "https://commons.wikimedia.org/wiki/File:William_Hogarth_-_The_South_Sea_Scheme.png",
          "image": {
            "src": "/covers/amazon-three-trillion-stocks-rally--a4.png",
            "alt": "Satirical engraving of a chaotic square where speculators ride a giant merry-go-round and crowds jostle amid emblems of greed and ruin",
            "credit": "William Hogarth, 'The South Sea Scheme' (1721). Via Wikimedia Commons (public domain)."
          }
        },
        {
          "category": "artistic",
          "title": "'Next!' — the Standard Oil octopus and the anatomy of monopoly",
          "excerpt": "Keppler draws the Standard Oil combine as a bloated octopus, its tentacles already coiled around the steel, copper and shipping industries and around a state capitol and the U.S. Capitol, with one arm stretching hungrily toward the White House. It is the definitive image of a single commercial colossus outgrowing the marketplace and reaching for the machinery of government itself.",
          "source": "Udo J. Keppler, 'Next!', chromolithograph, Puck, 7 September 1904; Library of Congress, Prints & Photographs Division",
          "href": "https://www.loc.gov/item/2001695241/",
          "image": {
            "src": "/covers/amazon-three-trillion-stocks-rally--a5.png",
            "alt": "Political cartoon of an octopus labeled Standard Oil gripping industries and government buildings with its tentacles, reaching toward the White House",
            "credit": "Udo J. Keppler, 'Next!', Puck, 1904. Library of Congress, via Wikimedia Commons (public domain)."
          }
        }
      ]
    },
    {
      "slug": "democratic-states-sue-trump-tariffs",
      "headline": "Twenty-five Democratic-led states sue to challenge President Trump's latest round of tariffs",
      "overview": "A coalition of 25 Democratic-led states filed suit to block President Trump's newest tariffs, calling them a 'pretext' to replace an earlier round struck down in court. The lawsuit argues the president exceeded his authority in imposing sweeping import taxes without congressional approval. It is the latest legal clash over the administration's trade policy.",
      "genre": "Economy",
      "sources": [
        {
          "name": "AP",
          "href": "https://news.google.com/rss/articles/CBMingFBVV95cUxQV1dVOXhnRXI2M3NoSHgwTFZTUnFzZDdfdEM1ZkpnQXQ2cS1ycXJtNkFkQkN4R3hRVUdjWnpKWTZ5cUF3TFRQT3FGaGx6YkhNejZpem9hcTdlVzhPRFdhSUVJbFRSWEFsaGtQQUxKTGVuQ0E1cFYxZElnSlJZRnhiRnl6ay10Nk1GWXFDYmtKeGtWaEFEREpFclhPYU9wdw?oc=5"
        },
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMilwFBVV95cUxNQzdtbnRyNlNqdjVKN2l0dllQSjdlQjM0QWVIbFhiM3NnT1JVR0tSLWY5ajZpTVhsQzdwWUJKcVp5VE5hcFdQZU85TU9yVnJjc1ozM1FJMkY1RmcyZHdYM2hkV21rQlNLSGZLNy1uLUFjNm1NcFVtZUZubjYtNkQyZmpEMEMycXhtZXMzQ0tLMmFhZmdwN2gw?oc=5"
        }
      ],
      "href": "#",
      "publishedAt": "2026-08-03",
      "image": {
        "src": "/covers/democratic-states-sue-trump-tariffs.png",
        "alt": "Rows of stacked shipping containers and a gantry crane at a busy port terminal handling imported goods.",
        "credit": "Wikimedia Commons"
      },
      "rank": 16,
      "edition": "Evening Edition · 3 August 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "The Nullification Crisis: South Carolina Defies the Federal Tariff",
          "excerpt": "We, therefore, the people of the State of South Carolina, in convention assembled, do declare and ordain ... that the several acts and parts of acts of the Congress of the United States, purporting to be laws for the imposing of duties and imposts on the importation of foreign commodities ... are unauthorized by the constitution of the United States, and violate the true meaning and intent thereof and are null, void, and no law, nor binding upon this State, its officers or citizens.",
          "source": "South Carolina Ordinance of Nullification, adopted in convention, November 24, 1832; The Avalon Project, Lillian Goldman Law Library, Yale Law School",
          "href": "https://avalon.law.yale.edu/19th_century/ordnull.asp"
        },
        {
          "category": "historical",
          "title": "No Taxes but by Consent: The Stamp Act Congress",
          "excerpt": "That it is inseparably essential to the freedom of a people, and the undoubted right of Englishmen, that no taxes be imposed on them, but with their own consent, given personally, or by their representatives. That the people of these colonies are not, and from their local circumstances cannot be, represented in the House of Commons in Great-Britain, and that no taxes ever have been, or can be constitutionally imposed on them, but by their respective legislatures.",
          "source": "Declaration of Rights of the Stamp Act Congress, New York, October 19, 1765; The Avalon Project, Lillian Goldman Law Library, Yale Law School",
          "href": "https://avalon.law.yale.edu/18th_century/resolu65.asp"
        },
        {
          "category": "literary",
          "title": "The Candlemakers' Petition: A Satire of Protectionism",
          "excerpt": "We are suffering from the intolerable competition of a foreign rival, placed, it would seem, in a condition so far superior to ours for the production of light, that he absolutely inundates our national market with it at a price fabulously reduced. The moment he shows himself, our trade leaves us--all consumers apply to him ... This rival, who is no other than the Sun, wages war to the knife against us.",
          "source": "Frédéric Bastiat, \"Petition of the Manufacturers of Candles, Waxlights, Lamps...\" in Economic Sophisms (1845; trans. Patrick James Stirling, 1873); Project Gutenberg ebook #44145",
          "href": "https://www.gutenberg.org/ebooks/44145"
        },
        {
          "category": "literary",
          "title": "Civil Disobedience: Refusing an Unjust Tax",
          "excerpt": "I heartily accept the motto,--\"That government is best which governs least;\" and I should like to see it acted up to more rapidly and systematically. ... I have paid no poll-tax for six years. I was put into a jail once on this account, for one night.",
          "source": "Henry David Thoreau, \"On the Duty of Civil Disobedience\" (originally \"Resistance to Civil Government,\" 1849); Project Gutenberg ebook #71",
          "href": "https://www.gutenberg.org/files/71/71-h/71-h.htm"
        },
        {
          "category": "artistic",
          "title": "King Andrew the First: A President Tramples the Constitution",
          "excerpt": "This anonymous Whig broadside answers a President accused of governing by veto and decree. Jackson stands robed and crowned, scepter in one hand and a veto in the other, his royal feet planted on a torn Constitution and the shredded charter of the federal judiciary. The caption brands him a tyrant, 'King Andrew the First' -- the era's sharpest image of an executive who scorns the limits meant to bind him.",
          "source": "\"King Andrew the First,\" anonymous lithograph, c. 1832-33 (Library of Congress Prints and Photographs Division)",
          "href": "https://commons.wikimedia.org/wiki/File:King_Andrew_the_First_(political_cartoon_of_President_Andrew_Jackson).jpg",
          "image": {
            "src": "/covers/democratic-states-sue-trump-tariffs--a4.png",
            "alt": "Lithograph of Andrew Jackson as a crowned king in royal robes, holding a veto and scepter, standing on a torn copy of the U.S. Constitution",
            "credit": "\"King Andrew the First,\" c. 1833, Library of Congress Prints and Photographs Division, via Wikimedia Commons (public domain)"
          }
        },
        {
          "category": "artistic",
          "title": "The Destruction of Tea at Boston Harbour: A Revolt Against Import Taxes",
          "excerpt": "Currier's popular lithograph turns a tax revolt into a founding tableau: Bostonians crowd the wharves by torchlight as men aboard the ships heave chests of dutied East India Company tea into the harbor. It memorializes colonists' refusal to pay a duty on imports levied without their consent -- resistance to an import tax rendered as an act of civic virtue.",
          "source": "Nathaniel Currier, \"The Destruction of Tea at Boston Harbour,\" hand-colored lithograph, 1846 (Springfield Museums)",
          "href": "https://commons.wikimedia.org/wiki/File:Boston_Tea_Party_Currier_colored.jpg",
          "image": {
            "src": "/covers/democratic-states-sue-trump-tariffs--a5.png",
            "alt": "Hand-colored lithograph of colonists dumping chests of tea from ships into Boston Harbor as a crowd watches from the wharf",
            "credit": "Nathaniel Currier, \"The Destruction of Tea at Boston Harbour,\" 1846, via Wikimedia Commons (public domain)"
          }
        }
      ]
    },
    {
      "slug": "sudan-darfur-court-drone-strike",
      "headline": "A Sudanese army drone strike hits a civil court session in Darfur, killing at least 35, a rights group says",
      "overview": "A drone strike blamed on Sudan's army hit a civil court session in a paramilitary-held Darfur village, killing at least 35 people, a rights group said. The army did not comment on claims that civilians were among the dead. The attack came amid the country's grinding war between the army and the Rapid Support Forces.",
      "genre": "Conflict",
      "sources": [
        {
          "name": "AP",
          "href": "https://news.google.com/rss/articles/CBMiogFBVV95cUxOd3NjSDZlSG1reGlHT3VFSVdkQjR6NEJneXIzdC1VWU5vV3h2dDFPZHFZQ0hzalVITUkybVBBRC1sUEsxcHRXWlp6OVZrdXcwS3R6S09TRlJNdjRXTWt2VUFQX2N0R3M1T1N3LTVSaW5yOUFkUnpRMnoxVFFLMV9PbnlMdzJoMEtSdkJRRGVTV05oRUQyQjJaWWNpd0pVT0diWHc?oc=5"
        },
        {
          "name": "BBC",
          "href": "https://www.bbc.co.uk/news/articles/ce85097leydo"
        }
      ],
      "href": "#",
      "publishedAt": "2026-08-03",
      "image": {
        "src": "/covers/sudan-darfur-court-drone-strike.png",
        "alt": "An empty courtroom with rows of plain wooden benches and tall windows, dust hanging in shafts of pale light.",
        "credit": "AI-generated"
      },
      "rank": 17,
      "edition": "Evening Edition · 3 August 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "The massacre at Mycalessus (413 BC)",
          "excerpt": "The Thracians bursting into Mycalessus sacked the houses and temples, and butchered the inhabitants, sparing neither youth nor age, but killing all they fell in with, one after the other, children and women, and even beasts of burden... and in particular they attacked a boys' school, the largest that there was in the place, into which the children had just gone, and massacred them all. In short, the disaster falling upon the whole town was unsurpassed in magnitude, and unapproached by any in suddenness and in horror.",
          "source": "Thucydides, History of the Peloponnesian War, Book VII.29 (trans. Richard Crawley, 1874); Project Gutenberg",
          "href": "https://www.gutenberg.org/cache/epub/7142/pg7142.txt"
        },
        {
          "category": "historical",
          "title": "The bombing of Guernica (1937)",
          "excerpt": "Guernica, the most ancient town of the Basques and the centre of their cultural tradition, was completely destroyed yesterday afternoon by insurgent air raiders... The object of the bombardment was seemingly the demoralization of the civil population and the destruction of the cradle of the Basque race.",
          "source": "George L. Steer, eyewitness dispatch on the destruction of Guernica, The Times (London), 28 April 1937",
          "href": "https://historynet.com/the-tragedy-of-guernica/"
        },
        {
          "category": "literary",
          "title": "The slaying of Priam at the altar",
          "excerpt": "Then Pyrrhus thus: 'Go thou from me to fate, / And to my father my foul deeds relate. / Now die!' With that he dragg'd the trembling sire, / Slidd'ring thro' clotter'd blood and holy mire, / (The mingled paste his murder'd son had made,) / Haul'd from beneath the violated shade, / And on the sacred pile the royal victim laid... Thus Priam fell, and shar'd one common fate / With Troy in ashes, and his ruin'd state",
          "source": "Virgil, Aeneid, Book II (trans. John Dryden, 1697); Project Gutenberg",
          "href": "https://www.gutenberg.org/cache/epub/228/pg228.txt"
        },
        {
          "category": "literary",
          "title": "The murdered child of Troy",
          "excerpt": "Behold, you hapless wives of Troy, the corpse of Astyanax, whom the Danaids have cruelly slain by hurling him from the battlements.",
          "source": "Euripides, The Trojan Women (trans. E. P. Coleridge, 1891); Perseus Digital Library, Tufts University",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0124%3Acard%3D1118"
        },
        {
          "category": "artistic",
          "title": "The Third of May 1808",
          "excerpt": "Goya freezes the instant before the volley: a rank of faceless soldiers levels muskets at a knot of unarmed townspeople herded to a hillside in the dark. A man in a white shirt flings his arms wide in a cruciform gesture of terror and defiance, lit by a single lantern, while the already-shot lie in their blood at his feet and others cover their eyes. There is no glory in it, only the mechanical execution of the defenseless.",
          "source": "Francisco de Goya, The Third of May 1808 (El tres de mayo de 1808 en Madrid), 1814, oil on canvas; Museo del Prado, Madrid",
          "href": "https://commons.wikimedia.org/wiki/File:El_Tres_de_Mayo,_by_Francisco_de_Goya,_from_Prado_thin_black_margin.jpg",
          "image": {
            "src": "/covers/sudan-darfur-court-drone-strike--a4.png",
            "alt": "Goya's painting of French soldiers executing unarmed Madrid civilians at night by lantern light",
            "credit": "Francisco de Goya, The Third of May 1808 (1814), Museo del Prado; public domain via Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "Pillaging and Burning of a Village",
          "excerpt": "In Callot's densely etched panorama, soldiers pour through a village, putting houses and church to the torch as columns of smoke boil into the sky. In the foreground troops run through unarmed peasants, drag women by the hair, and loot a burning home; the ordinary countryside has become a killing ground. Made amid the Thirty Years' War, the plate is a cold indictment of the routine savagery visited on noncombatants.",
          "source": "Jacques Callot, 'Pillage et incendie d'un village' (Pillaging and Burning of a Village), plate 7 of Les Misères et les Malheurs de la Guerre, 1633, etching; impression at The Metropolitan Museum of Art",
          "href": "https://commons.wikimedia.org/wiki/File:Les_mis%C3%A8res_et_les_malheurs_de_la_guerre_-_07_-_Pillage_et_incendie_d%27un_village.png",
          "image": {
            "src": "/covers/sudan-darfur-court-drone-strike--a5.png",
            "alt": "Callot etching of soldiers massacring villagers and burning a village during the Thirty Years' War",
            "credit": "Jacques Callot, plate 7 of Les Misères et les Malheurs de la Guerre (1633); public domain via Wikimedia Commons"
          }
        }
      ]
    },
    {
      "slug": "russia-black-sea-beach-drone-strike",
      "headline": "Russia says a Ukrainian drone struck a crowded Black Sea beach resort, killing seven, including three children",
      "overview": "Russian officials said a Ukrainian drone crashed onto a crowded beach near the Black Sea resort area of Gelendzhik, killing seven people, three of them children, and wounding about 40. Local authorities said an air-raid warning failed to sound in time. Ukraine did not immediately comment as long-range drone attacks intensified on both sides of the war.",
      "genre": "Conflict",
      "sources": [
        {
          "name": "BBC",
          "href": "https://www.bbc.co.uk/news/articles/cr7kmnyrdn7o"
        },
        {
          "name": "Meduza",
          "href": "https://meduza.io/en/news/2026/08/03/ukrainian-drone-crashes-on-beach-with-vacationers-at-russian-black-sea-resort-as-warning-system-fails-to-sound-seven-people-killed"
        }
      ],
      "href": "#",
      "publishedAt": "2026-08-03",
      "image": {
        "src": "/covers/russia-black-sea-beach-drone-strike.png",
        "alt": "A wide sandy beach along a calm sea under a summer sky, striped umbrellas and empty loungers scattered on the shore.",
        "credit": "BBC"
      },
      "rank": 18,
      "edition": "Evening Edition · 3 August 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "The Massacre at Mycalessus (413 BC)",
          "excerpt": "The Thracians bursting into Mycalessus sacked the houses and temples, and butchered the inhabitants, sparing neither youth nor age, but killing all they fell in with, one after the other, children and women, and even beasts of burden, and whatever other living creatures they saw... In particular they attacked a boys' school, the largest that there was in the place, into which the children had just gone, and massacred them all.",
          "source": "Thucydides, History of the Peloponnesian War, Book VII (trans. Richard Crawley, 1874), Wikisource",
          "href": "https://en.wikisource.org/wiki/History_of_the_Peloponnesian_War/Book_7"
        },
        {
          "category": "historical",
          "title": "The Bombardment of Scarborough (16 December 1914)",
          "excerpt": "On a December morning the German battlecruisers Derfflinger and Von der Tann appeared out of the mist off the Yorkshire coast and rained some 500 shells on the undefended seaside resort of Scarborough, striking the Grand Hotel, homes and churches. For the first time in the war, death fell suddenly on British civilians going about their ordinary lives, killing seventeen townspeople, among them children and a fourteen-month-old baby. The shock that a place of holidays and promenades could become a killing ground turned 'Remember Scarborough!' into a national cry of outrage.",
          "source": "Historic England, 'Scarborough Bombardment 1914' (First World War Home Front research)",
          "href": "https://historicengland.org.uk/research/current/discover-and-understand/military/first-world-war-home-front/sea/scarborough-bombardment-1914/",
          "image": {
            "src": "/covers/russia-black-sea-beach-drone-strike--a1.png",
            "alt": "1915 British recruitment poster showing the shell-wrecked home of a Scarborough family, captioned to remember the women and children killed in the raid",
            "credit": "Parliamentary Recruiting Committee, 'Men of Britain! Will You Stand This?' (1915), Library of Congress Prints and Photographs Division, via Wikimedia Commons (public domain)"
          }
        },
        {
          "category": "literary",
          "title": "Dover Beach",
          "excerpt": "Ah, love, let us be true\nTo one another! for the world, which seems\nTo lie before us like a land of dreams,\nSo various, so beautiful, so new,\nHath really neither joy, nor love, nor light,\nNor certitude, nor peace, nor help for pain;\nAnd we are here as on a darkling plain\nSwept with confused alarms of struggle and flight,\nWhere ignorant armies clash by night.",
          "source": "Matthew Arnold, 'Dover Beach' (1867), Wikisource",
          "href": "https://en.wikisource.org/wiki/Dover_Beach"
        },
        {
          "category": "literary",
          "title": "L'Enfant (The Child of Chios)",
          "excerpt": "Les Turcs ont passé là. Tout est ruine et deuil.\nChio, l'île des vins, n'est plus qu'un sombre écueil,",
          "source": "Victor Hugo, Les Orientales, 'L'Enfant' (1829), Wikisource",
          "href": "https://fr.wikisource.org/wiki/Les_Orientales/L%E2%80%99Enfant",
          "image": {
            "src": "/covers/russia-black-sea-beach-drone-strike--a3.png",
            "alt": "Delacroix's painting of the massacre at Chios: exhausted, wounded Greek civilians, including a child clinging to its dead mother, on a devastated shore",
            "credit": "Eugène Delacroix, 'Scène des massacres de Scio' (1824), Musée du Louvre, via Wikimedia Commons (public domain)"
          }
        },
        {
          "category": "artistic",
          "title": "Boys on the Beach (Chicos en la playa)",
          "excerpt": "Three naked boys lie sprawled at the water's edge in the shimmering Mediterranean light, their bodies half-dissolved in the wet reflections of the sand. Sorolla's canvas is the pure image of the summer shore as a place of safety, play, and idle happiness, children entrusting themselves entirely to the sea. Set beside the news, its radiant calm becomes unbearable: this is exactly the world a strike on a crowded beach annihilates.",
          "source": "Joaquín Sorolla, oil on canvas, 1910, Museo Nacional del Prado, Madrid",
          "href": "https://www.museodelprado.es/en/the-collection/art-work/boys-on-the-beach/edd7a202-c069-49f1-a3f4-eacf9b4022c2",
          "image": {
            "src": "/covers/russia-black-sea-beach-drone-strike--a4.png",
            "alt": "Three nude boys lying at the sunlit water's edge on a beach, their bodies reflected in the shallow water",
            "credit": "Joaquín Sorolla, 'Chicos en la playa' (1910), Museo Nacional del Prado, via Wikimedia Commons (public domain)"
          }
        },
        {
          "category": "artistic",
          "title": "The Massacre of the Innocents",
          "excerpt": "Bruegel transplants the biblical slaughter of the innocents into a snowbound Flemish village, where armored soldiers ride into an ordinary community and tear children from screaming, pleading parents. The horror is set amid the mundane textures of daily life, houses, a frozen pond, everyday clothes, making the intrusion of organized violence into a place of peace all the more devastating. It remains the West's defining image of war descending on children who have done nothing.",
          "source": "Pieter Bruegel the Elder, oil on panel, c. 1565–67, Royal Collection (via Wikimedia Commons)",
          "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_the_Elder_-_Massacre_of_the_Innocents_-_Google_Art_Project.jpg",
          "image": {
            "src": "/covers/russia-black-sea-beach-drone-strike--a5.png",
            "alt": "A snow-covered Flemish village where soldiers on horseback seize and kill children as parents beg and grieve",
            "credit": "Pieter Bruegel the Elder, 'Massacre of the Innocents' (c. 1565–67), Royal Collection, via Wikimedia Commons (public domain)"
          }
        }
      ]
    },
    {
      "slug": "michigan-cyclosporiasis-first-deaths",
      "headline": "Michigan reports the first two US deaths in a cyclosporiasis outbreak caused by a foodborne parasite",
      "overview": "Michigan health officials reported the first two US deaths tied to a nationwide cyclosporiasis outbreak, an intestinal illness caused by the microscopic parasite Cyclospora that spreads through contaminated food or water. The infection, marked by prolonged watery diarrhea, is not usually life-threatening, officials said. Investigators are working to trace the contaminated produce behind the outbreak.",
      "genre": "Science",
      "sources": [
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMiywFBVV95cUxPbW9icDFxQ3hEUUY5eV9ubnhsUURuNnpiX0RKbW1BUWRkRGp5ZWVXdnEzdklrMUdtODByVC02T0NxZG9YRGlWYklzNkN3X21kRTNDZlo0Um50Q2hDY0JreUFHcXUwZHh4TFZMVjVheVB0N2lPd0c5RzZNQ05relhmNnhlaUx6NU5MNXQxS0pJY0lOc1hsOHlYbGJYVTZHRy1xRmFOLXlMU1BWUEZ4SmNiOXNmNkFyNlVmZnR1bXVqWlZ4WFdnTzBDZEpBOA?oc=5"
        },
        {
          "name": "AP",
          "href": "https://news.google.com/rss/articles/CBMimwFBVV95cUxQbTlMT3pHaGFaRzdjMHdrZ1RWOVhwY1FPSi1TSm5pNEFuaHlLVldYYXF3VHY3WTR2MHNCMW12SVd4dXRSZy13NEkyR3BVc2QwcV9SZnR4Z1hxX05jUGNOYkJnUXp1V2hYbVhZcG4zUUhJVWl2SS1ibTVtdlQ4cjdvcHZSMC1OQS00WldrVmd0RDdWMEN6MlFnT1BOaw?oc=5"
        }
      ],
      "href": "#",
      "publishedAt": "2026-08-03",
      "image": {
        "src": "/covers/michigan-cyclosporiasis-first-deaths.png",
        "alt": "A microscope view of round, stained Cyclospora parasite oocysts against a pale laboratory background.",
        "credit": "Wikimedia Commons"
      },
      "rank": 19,
      "edition": "Evening Edition · 3 August 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Leeuwenhoek discovers the 'little animals' teeming in a drop of water",
          "excerpt": "incredibly small; nay, so small, in my sight, that I judged that even if 100 of these very wee animals lay stretched out one against another, they could not reach the length of a grain of course sand; and if this be true, then ten hundred thousand of these living creatures could scarce equal the bulk of a course grain of sand",
          "source": "Antony van Leeuwenhoek, 'Observation… concerning little animals by him observed in rain-well-sea and snow water; as also in water wherein pepper had lain infused,' Philosophical Transactions of the Royal Society, vol. 12, 9 Oct. 1676 letter, English'd and published 25 March 1677",
          "href": "https://royalsocietypublishing.org/doi/10.1098/rstl.1677.0003"
        },
        {
          "category": "historical",
          "title": "John Snow maps cholera deaths to a single water pump",
          "excerpt": "On proceeding to the spot, I found that nearly all the deaths had taken place within a short distance of the pump.",
          "source": "John Snow, On the Mode of Communication of Cholera (2nd ed., London: John Churchill, 1855); John Snow Archive & Research Companion, Michigan State University",
          "href": "https://johnsnow.matrix.msu.edu/broadstpump/snow-the-pump-handle/",
          "image": {
            "src": "/covers/michigan-cyclosporiasis-first-deaths--a1.png",
            "alt": "John Snow's 1854 map of the Broad Street cholera outbreak, showing black bars marking deaths clustered around the Broad Street water pump",
            "credit": "John Snow, 1854 cholera map, via Wikimedia Commons (UCLA Dept. of Epidemiology), public domain"
          }
        },
        {
          "category": "literary",
          "title": "The infection 'propagated insensibly' by the unknowing",
          "excerpt": "the infection was propagated insensibly, and by such persons as were not visibly infected, who neither knew whom they infected or who they were infected by.",
          "source": "Daniel Defoe, A Journal of the Plague Year (1722), Project Gutenberg",
          "href": "https://www.gutenberg.org/cache/epub/376/pg376.txt"
        },
        {
          "category": "literary",
          "title": "Dr. Stockmann finds the town's healing waters 'full of infusoria'",
          "excerpt": "It proves the presence of decomposing organic matter in the water—it is full of infusoria. The water is absolutely dangerous to use, either internally or externally.",
          "source": "Henrik Ibsen, An Enemy of the People (1882), trans. R. Farquharson Sharp, Project Gutenberg",
          "href": "https://www.gutenberg.org/cache/epub/2446/pg2446.txt"
        },
        {
          "category": "artistic",
          "title": "Monster Soup, Commonly Called Thames Water",
          "excerpt": "Heath's satirical etching magnifies a single drop of London drinking water into a swarming menagerie of writhing monsters. A genteel lady recoils, dropping her teacup in horror as she peers through a lens at the 'precious stuff' piped from the Thames. Decades before germ theory, the print made visible the invisible menace lurking in ordinary water, mocking a supply already fouled by sewage and, soon, cholera.",
          "source": "William Heath (as 'Paul Pry'), 'Monster Soup commonly called Thames Water, being a correct representation of that precious stuff doled out to us!!!', hand-coloured etching, c. 1828; Wellcome Collection",
          "href": "https://commons.wikimedia.org/wiki/File:Monster_Soup_commonly_called_Thames_Water._Wellcome_V0011218.jpg",
          "image": {
            "src": "/covers/michigan-cyclosporiasis-first-deaths--a4.png",
            "alt": "Coloured etching of a woman dropping her teacup in horror as she views grotesque creatures in a magnified drop of Thames water",
            "credit": "William Heath, 'Monster Soup commonly called Thames Water', c. 1828, Wellcome Collection, via Wikimedia Commons, public domain"
          }
        },
        {
          "category": "artistic",
          "title": "Death's Dispensary",
          "excerpt": "A hooded skeleton works the handle of a public water pump, doling out drink to the ragged poor and their children who crowd around with jugs and cups. Published during London's 1866 cholera epidemic, Pinwell's engraving turns the neighborhood well into an instrument of death, indicting the contaminated water supply that Snow's work had implicated. The everyday act of fetching water becomes a queue for the grave.",
          "source": "George John Pinwell, 'Death's Dispensary — Open to the Poor, Gratis, By Permission of the Parish', wood engraving, Fun magazine, 18 August 1866",
          "href": "https://commons.wikimedia.org/wiki/File:Death%27s_Dispensary.jpg",
          "image": {
            "src": "/covers/michigan-cyclosporiasis-first-deaths--a5.png",
            "alt": "Wood engraving of a skeletal figure of Death operating a public water pump while poor Londoners gather to collect water",
            "credit": "George John Pinwell, 'Death's Dispensary', Fun magazine, 18 August 1866, via Wikimedia Commons, public domain"
          }
        }
      ]
    },
    {
      "slug": "total-solar-eclipse-europe-august",
      "headline": "A total solar eclipse on 12 August will sweep across Spain, Iceland and Greenland, the first over mainland Europe since 1999",
      "overview": "Astronomers say a total solar eclipse on 12 August will darken skies across Greenland, Iceland and northern Spain, the first total eclipse visible from mainland Europe since 1999. The moon will fully cover the sun for more than two minutes along a narrow path, drawing eclipse chasers to the region. Forecasters urged viewers to use certified filters to watch safely.",
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
      "publishedAt": "2026-08-03",
      "image": {
        "src": "/covers/total-solar-eclipse-europe-august.png",
        "alt": "The sun's glowing white corona streaming around the black disc of the moon during a total solar eclipse against a dark sky.",
        "credit": "Wikimedia Commons"
      },
      "rank": 20,
      "edition": "Evening Edition · 3 August 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "The eclipse that stopped a war: Thales foretells the day turning to night",
          "excerpt": "in the sixth year a battle took place in which it happened, when the fight had begun, that suddenly the day became night. And this change of the day Thales the Milesian had foretold to the Ionians laying down as a limit this very year in which the change took place.",
          "source": "Herodotus, The History of Herodotus, Book I.74 (on the battle of the Medes and Lydians, 585 BC), trans. G. C. Macaulay, Project Gutenberg",
          "href": "https://www.gutenberg.org/cache/epub/2707/pg2707.txt",
          "image": {
            "src": "/covers/total-solar-eclipse-europe-august--a0.png",
            "alt": "Renaissance scholars observing a darkened sun above a terrace in Antoine Caron's painting",
            "credit": "Antoine Caron, Astronomers Studying an Eclipse (c. 1571), J. Paul Getty Museum, via Wikimedia Commons (public domain)"
          }
        },
        {
          "category": "historical",
          "title": "Eddington's 1919 eclipse: 302 seconds that weighed light",
          "excerpt": "There is a marvellous spectacle above, and, as the photographs afterwards revealed, a wonderful prominence-flame is poised a hundred thousand miles above the surface of the sun. We have no time to snatch a glance at it. We are conscious only of the weird half-light of the landscape and the hush of nature, broken by the calls of the observers, and beat of the metronome ticking out the 302 seconds of totality.",
          "source": "Arthur Eddington, Space, Time and Gravitation: An Outline of the General Relativity Theory (1920), describing the total eclipse of 29 May 1919, Wikisource",
          "href": "https://en.wikisource.org/wiki/Page:Eddington_A._Space_Time_and_Gravitation._1920.djvu/131",
          "image": {
            "src": "/covers/total-solar-eclipse-europe-august--a1.png",
            "alt": "Photographic negative of the 29 May 1919 total solar eclipse showing the corona and faint stars used to test relativity",
            "credit": "F. W. Dyson, A. S. Eddington & C. Davidson, 1919 eclipse negative (1920), via Wikimedia Commons (public domain)"
          }
        },
        {
          "category": "literary",
          "title": "The sun in dim eclipse, and monarchs perplexed with fear of change",
          "excerpt": "As when the sun new-risen / Looks through the horizontal misty air / Shorn of his beams, or, from behind the moon, / In dim eclipse, disastrous twilight sheds / On half the nations, and with fear of change / Perplexes monarchs.",
          "source": "John Milton, Paradise Lost, Book I, ll. 594–599 (1667), Project Gutenberg",
          "href": "https://www.gutenberg.org/files/26/26-h/26-h.htm"
        },
        {
          "category": "literary",
          "title": "Now nothing is unexpected: Zeus makes night at midday",
          "excerpt": "Nothing is unexpected, nothing is foresworn and / Nothing amazes now that father Zeus the Olympian / veiled the light to make it night at midday / even as sun was shining...",
          "source": "Archilochus, fragment 122 (on a solar eclipse, traditionally 648 BC), Greek text with English translation, Sententiae Antiquae",
          "href": "https://sententiaeantiquae.com/2015/09/26/now-nothing-is-unexpected-archilochus-on-an-eclipse-fr-122/"
        },
        {
          "category": "artistic",
          "title": "Astronomers Studying an Eclipse: antiquity's wonder seen through Renaissance eyes",
          "excerpt": "Richly robed scholars crowd a marble terrace strewn with armillary spheres, astrolabes and geometric instruments, arms flung upward toward a wan, cloud-veiled sun. Caron paints the ancient philosophers as courtiers of his own Valois France, turning the terror of a darkened sky into a theatre of learned curiosity — human reason craning to read the heavens even as the light fails.",
          "source": "Antoine Caron (French, 1521–1599), Astronomers Studying an Eclipse, oil on panel, c. 1571, J. Paul Getty Museum (acc. 85.PB.117)",
          "href": "https://commons.wikimedia.org/wiki/File:Antoine_Caron_Astronomers_Studying_an_Eclipse.jpg",
          "image": {
            "src": "/covers/total-solar-eclipse-europe-august--a4.png",
            "alt": "Elaborately dressed astronomers on a classical terrace gesturing toward a dimmed sun amid clouds, surrounded by scientific instruments",
            "credit": "Antoine Caron, Astronomers Studying an Eclipse (c. 1571), J. Paul Getty Museum, via Wikimedia Commons (public domain)"
          }
        },
        {
          "category": "artistic",
          "title": "'Total eclipse! No sun, no moon!' — Samson's lament for the vanished light",
          "excerpt": "Total eclipse! No sun, no moon! All dark amidst the blaze of noon! Oh, glorious light! No cheering ray To glad my eyes with welcome day! Why thus depriv'd Thy prime decree? Sun, moon, and stars are dark to me!",
          "source": "George Frideric Handel, Samson (HWV 57, 1743), tenor aria 'Total eclipse,' libretto by Newburgh Hamilton after Milton's Samson Agonistes; text sheet, IPA Source",
          "href": "https://www.ipasource.com/wp-content/uploads/ipa-source/samples/poems/15179.pdf"
        }
      ]
    },
    {
      "slug": "supreme-court-plo-judgment",
      "headline": "The US Supreme Court declines to halt a $655 million judgment against the PLO and Palestinian Authority over past attacks",
      "overview": "The US Supreme Court refused to block a roughly $655 million judgment against the Palestine Liberation Organization and the Palestinian Authority won by American victims of attacks abroad. The decision lets the award stand under a 2019 federal law tying the groups to US jurisdiction. Lawyers for the Palestinian bodies had argued the law violated due process.",
      "genre": "Politics",
      "sources": [
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMixAFBVV95cUxPRnJXbFlTcnd5ekloOUVSVFItaUU1d1lSR2wxOXp0V2VHdUd5aHl0Z1QzVTE4cjZ0M2JlOU81d05NaHkzeTlTdEZNRkVMaFoxcVRmMDg4aEgwMTZVTUlxTjZDcTVRLU5aM0hYZmdtbk8zbWlaY3d5ZUFsa3NfaE9EelNhWDJuYWVUSnFZSG1FMXhpblRXRWFTWjdZdkVEUTZHakt5dmlaTkZpYU9qYVo0a1c1eTRfaXZyMzAtSjZ1Z3ZsVVRE?oc=5"
        },
        {
          "name": "AP",
          "href": "https://news.google.com/rss/articles/CBMinAFBVV95cUxOQTNFck1qRmVpNFJZUDBCcll3ZUZicVBTbWZ0Skt1RFJXdGJQWUVOUXhnZEhUYWhQTzRLTlhJaHpzcFIwQ01QbmRSZ05YMHh6eldLQlBjeUtfeEwxd2xaUzJyb1M4ZmJiV25rcUQ4c3ozNkNjcmVweEM0QnM4MGxhWGZ6bFQwckdVemhDUV9qT1ZvOUs0eFpfUl8taHY?oc=5"
        }
      ],
      "href": "#",
      "publishedAt": "2026-08-03",
      "image": {
        "src": "/covers/supreme-court-plo-judgment.png",
        "alt": "The marble west facade of the United States Supreme Court building with its tall Corinthian columns, photographed at dusk.",
        "credit": "Wikimedia Commons"
      },
      "rank": 21,
      "edition": "Evening Edition · 3 August 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "The Code of Hammurabi: a community made to pay silver for the slain",
          "excerpt": "If the robber is not caught, then shall he who was robbed claim under oath the amount of his loss; then shall the community, and . . . on whose ground and territory and in whose domain it was compensate him for the goods stolen. If persons are stolen, then shall the community and . . . pay one mina of silver to their relatives.",
          "source": "Code of Hammurabi, laws 23–24, Babylon, c. 1754 BC (trans. L.W. King); The Avalon Project, Yale Law School",
          "href": "https://avalon.law.yale.edu/ancient/hamcode.asp",
          "image": {
            "src": "/covers/supreme-court-plo-judgment--a0.png",
            "alt": "The diorite stele of the Code of Hammurabi, inscribed with cuneiform law, Musée du Louvre",
            "credit": "Code of Hammurabi stele, Louvre Museum, Paris. Photo Mbzt, Wikimedia Commons (CC BY 3.0)"
          }
        },
        {
          "category": "historical",
          "title": "The Alabama Claims: a cross-border tribunal to answer for wartime damage",
          "excerpt": "Now, in order to remove and adjust all complaints and claims on the part of the United States, and to provide for the speedy settlement of such claims, which are not admitted by Her Britannic Majesty's Government, the High Contracting Parties agree that all the said claims, growing out of Acts committed by the aforesaid vessels, and generically known as the Alabama Claims, shall be referred to a tribunal of arbitration to be composed of five arbitrators.",
          "source": "Treaty of Washington, Article I, signed 8 May 1871 (United States and Great Britain); Wikisource",
          "href": "https://en.wikisource.org/wiki/Treaty_of_Washington"
        },
        {
          "category": "literary",
          "title": "Portia turns the bond against its holder",
          "excerpt": "Tarry a little, there is something else.\nThis bond doth give thee here no jot of blood.\nThe words expressly are \"a pound of flesh\":\nTake then thy bond, take thou thy pound of flesh,\nBut in the cutting it, if thou dost shed\nOne drop of Christian blood, thy lands and goods\nAre, by the laws of Venice, confiscate\nUnto the state of Venice.",
          "source": "William Shakespeare, The Merchant of Venice, Act IV, Scene 1 (c. 1596–98); Project Gutenberg",
          "href": "https://www.gutenberg.org/cache/epub/1515/pg1515.txt"
        },
        {
          "category": "literary",
          "title": "Athena founds a standing court to judge bloodshed",
          "excerpt": "But since this matter has fallen here, I will select judges of homicide bound by oath, and I will establish this tribunal for all time. Summon your witnesses and proofs, sworn evidence to support your case; and I will return when I have chosen the best of my citizens, for them to decide this matter truly.",
          "source": "Aeschylus, Eumenides, lines c. 482–484 (458 BC; trans. Herbert Weir Smyth, 1926), Theoi Classical Texts Library",
          "href": "https://www.theoi.com/Text/AeschylusEumenides.html"
        },
        {
          "category": "artistic",
          "title": "Justitia: the blindfold, the scales, and the sword",
          "excerpt": "Cranach's Justice stands almost nude but for a wisp of gauze, balancing the scales of judgment in one hand and resting a great two-edged sword against her shoulder in the other. The near-nakedness insists that Justice hides nothing and cannot be bribed by finery; the sword promises that her verdicts carry force. It is the Renaissance emblem for exactly what a court claims when it makes a defendant pay: measured judgment backed by the power to compel.",
          "source": "Lucas Cranach the Elder, Justitia (Justice), oil on panel, 1537; private collection (via Wikimedia Commons)",
          "href": "https://commons.wikimedia.org/wiki/File:Gerechtigkeit-1537.jpg",
          "image": {
            "src": "/covers/supreme-court-plo-judgment--a4.png",
            "alt": "Allegorical figure of Justice holding scales and a sword, painted by Lucas Cranach the Elder in 1537",
            "credit": "Lucas Cranach the Elder, Justitia (1537). Wikimedia Commons (public domain)"
          }
        },
        {
          "category": "artistic",
          "title": "The murdered man returns to exact his reckoning",
          "excerpt": "The Commendatore, slain in a duel in the opera's first act, comes back as a stone statue to demand a final accounting: \"Don Giovanni, a cenar teco m'invitasti, e son venuto\" (Don Giovanni, you invited me to sup with you, and I have come). He orders repentance—\"Pentiti, cangia vita! È l'ultimo momento!\"—and when the unrepentant Don answers \"No!\", the dead man drags him down. It is the murdered victim, not an earthly court, seizing the debt owed for violence.",
          "source": "W.A. Mozart (music) & Lorenzo Da Ponte (libretto), Don Giovanni, K.527, Act II finale (1787); IMSLP",
          "href": "https://imslp.org/wiki/Don_Giovanni,_K.527_(Mozart,_Wolfgang_Amadeus)"
        }
      ]
    },
    {
      "slug": "spain-ceuta-migrant-children-eu-borders",
      "headline": "Hundreds of migrant children remain stranded in Spain's Ceuta as the EU calls for stronger external borders",
      "overview": "Hundreds of unaccompanied migrant children were left stranded in Spain's North African enclave of Ceuta after a mass border crossing overwhelmed local shelters. European Commission President Ursula von der Leyen called for stronger external borders ahead of an urgent meeting of EU interior ministers. Spain and Morocco traded blame over the surge.",
      "genre": "Politics",
      "sources": [
        {
          "name": "AP",
          "href": "https://news.google.com/rss/articles/CBMikwFBVV95cUxQNDliSkR6N1FYa01rQ2d3V0VRV0N2UVd2ZWhmMjhlaE8wVW1BTE45dkp0YUFuSVBYZEplRGlnMkczdDhTbjY0Unk2MVl0R3VBMG96SEZhd1dQSUFGbHRFTTRDTGl5TXhGeGprYldpdUhGTTVlS0VROG4xajAtS0tfbW9pSVlIc0dneDE2SXREbER2cXM?oc=5"
        },
        {
          "name": "BBC",
          "href": "https://www.bbc.co.uk/news/articles/cyvl84zmgyro"
        }
      ],
      "href": "#",
      "publishedAt": "2026-08-03",
      "image": {
        "src": "/covers/spain-ceuta-migrant-children-eu-borders.png",
        "alt": "A tall border fence topped with razor wire running down toward a rocky Mediterranean shoreline.",
        "credit": "BBC"
      },
      "rank": 22,
      "edition": "Evening Edition · 3 August 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "The Alhambra Decree: Spain expels its Jews across the sea (1492)",
          "excerpt": "we order all Jews and Jewesses of whatever age they may be … that by the end of the month of July next of the present year, they depart from all of these our said realms and lordships, along with their sons and daughters, menservants and maidservants, Jewish familiars, those who are great as well as the lesser folk, of whatever age they may be, and they shall not dare to return to those places.",
          "source": "Ferdinand and Isabella, Alhambra Decree (Edict of the Expulsion of the Jews of Spain), Granada, 31 March 1492; English translation hosted by Florida Atlantic University",
          "href": "https://www.fau.edu/artsandletters/pjhr/chhre/pdf/hh-alhambra-1492-english.pdf"
        },
        {
          "category": "historical",
          "title": "The Kindertransport: unaccompanied children sent to safety (1938–1940)",
          "excerpt": "In the nine months between Kristallnacht and the outbreak of war, Britain admitted roughly 10,000 mostly Jewish children from Germany, Austria and Czechoslovakia—unaccompanied minors placed by desperate parents into the hands of strangers. They travelled by train and boat with identification tags around their necks; the first transport reached Harwich on 2 December 1938, and many of the children never saw their families again. Like the youngsters stranded in Ceuta, they arrived as children first and refugees second, dependent wholly on how the receiving country chose to answer the border.",
          "source": "United States Holocaust Memorial Museum, Holocaust Encyclopedia, 'Kindertransport, 1938–40'",
          "href": "https://encyclopedia.ushmm.org/content/en/article/kindertransport-1938-40"
        },
        {
          "category": "literary",
          "title": "'The New Colossus': the gate that welcomes the wretched",
          "excerpt": "\"Keep, ancient lands, your storied pomp!\" cries she\nWith silent lips. \"Give me your tired, your poor,\nYour huddled masses yearning to breathe free,\nThe wretched refuse of your teeming shore.\nSend these, the homeless, tempest-tost to me,\nI lift my lamp beside the golden door!\"",
          "source": "Emma Lazarus, 'The New Colossus' (sonnet, 1883), as reproduced by the U.S. National Park Service (Statue of Liberty National Monument)",
          "href": "https://www.nps.gov/stli/learn/historyculture/colossus.htm"
        },
        {
          "category": "literary",
          "title": "The Aeneid: the exile driven from his shore by sea and land",
          "excerpt": "Arms, and the man I sing, who, forc'd by fate,\nAnd haughty Juno's unrelenting hate,\nExpell'd and exil'd, left the Trojan shore.\nLong labours, both by sea and land, he bore",
          "source": "Virgil, Aeneid, Book I (trans. John Dryden), Project Gutenberg",
          "href": "https://www.gutenberg.org/files/228/228-h/228-h.htm"
        },
        {
          "category": "artistic",
          "title": "'The Last of England': a family departs its homeland by sea",
          "excerpt": "Brown paints emigration as intimate dread rather than adventure: a young couple, modelled on the artist and his wife, huddle on the deck of a departing ship, the white cliffs of England receding behind them under a grey sky. Her hand clasps a tiny fist barely visible beneath her cloak—their infant, carried into exile. The tight oval frame and their fixed, forward stares make the viewer feel the irreversibility of leaving one shore for an uncertain welcome on another.",
          "source": "Ford Madox Brown, 'The Last of England', oil on panel, 1855, Birmingham Museum and Art Gallery",
          "href": "https://en.wikipedia.org/wiki/The_Last_of_England_(painting)",
          "image": {
            "src": "/covers/spain-ceuta-migrant-children-eu-borders--a4.png",
            "alt": "An emigrant couple on a ship's deck under a grey sky, the woman sheltering an infant beneath her cloak as the English coast recedes",
            "credit": "Ford Madox Brown, 'The Last of England' (1855), Birmingham Museum and Art Gallery. Public domain, via Wikimedia Commons (Google Art Project)."
          }
        },
        {
          "category": "artistic",
          "title": "'The Raft of the Medusa': the stranded straining toward rescue",
          "excerpt": "Géricault built his vast canvas from a real catastrophe: the 1816 wreck of the frigate Méduse, whose castaways were left to drift on a makeshift raft where only fifteen of some 150 survived twelve days at sea. He paints the instant of desperate hope—survivors, living and dead, piled in a pyramid of bodies as one waves a scrap of cloth at a ship barely visible on the horizon. Two centuries on, the image reads as a prophecy of the overloaded boats and stranded lives of the Mediterranean crossing.",
          "source": "Théodore Géricault, 'Le Radeau de la Méduse' (The Raft of the Medusa), oil on canvas, 1818–1819, Musée du Louvre, Paris (INV 4884)",
          "href": "https://collections.louvre.fr/en/ark:/53355/cl010059199",
          "image": {
            "src": "/covers/spain-ceuta-migrant-children-eu-borders--a5.png",
            "alt": "Shipwreck survivors crowded on a makeshift raft at sea, the living heaped over the dead as one figure waves cloth toward a distant ship",
            "credit": "Théodore Géricault, 'The Raft of the Medusa' (1818–19), Musée du Louvre. Public domain, via Wikimedia Commons."
          }
        }
      ]
    },
    {
      "slug": "faa-certifies-boeing-737-max-7",
      "headline": "The FAA certifies Boeing's 737 MAX 7 jetliner for passenger flight after years of delays",
      "overview": "The US Federal Aviation Administration certified Boeing's smallest 737 MAX model, the MAX 7, clearing the long-delayed jet for commercial service. The approval, years behind schedule after crashes and quality crises, is a rare win for the planemaker. Southwest Airlines is the largest customer awaiting the aircraft.",
      "genre": "Technology",
      "sources": [
        {
          "name": "AP",
          "href": "https://news.google.com/rss/articles/CBMipgFBVV95cUxPV0lkMThrX3BhRzNPenJyd3ZQYXowMUdxdVhyNTUxTEJFZWhLa2VIN3FUN1E4bFFKcW84QTRKbzhFdUhSaDBhSGxSQkE4SjZwTnc4Y2YzR011Mkd1V05qWDNIX0FPX0NnWW9Td1czaExYQlBJMnJBRVRwVHlHcGFTOUxDM3Bpa3RodDA4T0Q5UnpycUxnRjNkVjV4WU53RW1OclBxTWZB?oc=5"
        },
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMivgFBVV95cUxObm5abmxuWVVCMWR2ZDdDaTFWSnJ5SEYxZnc5MFg0Qko5RkJWMGZpTndzclotOVAza0ZYRHJoTmpUZk1yclB4MnZxUFlYanVwbnlGd3JaNk5sZ2YxbjliM3EyVk55bUtEZU9mQWNRR214WTlQRVdTRXAwbVdGRzdYdE1CY0hrOXlIWjRlV0V0VGg2d05qLUJzT05iQ0oyaS13UFM4azRFMXF2T2ZOUEhPT2hJblN1bUozNlc1SkNn?oc=5"
        }
      ],
      "href": "#",
      "publishedAt": "2026-08-03",
      "image": {
        "src": "/covers/faa-certifies-boeing-737-max-7.png",
        "alt": "A new twin-engine Boeing 737 MAX airliner in flight against a clear sky.",
        "credit": "Wikimedia Commons"
      },
      "rank": 23,
      "edition": "Evening Edition · 3 August 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Orville Wright's diary of the first powered flight",
          "excerpt": "After running the engine and propellers a few minutes to get them in working order, I got on the machine at 10:35 for the first trial. ... The machine lifted from the truck just as it was entering on the fourth rail. ... A sudden dart when out about 100 feet from the end of the tracks ended the flight. Time about 12 seconds (not known exactly as watch was not promptly stopped).",
          "source": "Orville Wright, personal diary entry for December 17, 1903 (Wright Brothers Collection); transcription on Wikisource",
          "href": "https://en.wikisource.org/wiki/Orville_Wright_diary/1903",
          "image": {
            "src": "/covers/faa-certifies-boeing-737-max-7--a0.png",
            "alt": "The Wright Flyer lifting off at Kill Devil Hills on December 17, 1903, Orville at the controls and Wilbur running alongside",
            "credit": "Photograph by John T. Daniels, December 17, 1903, public domain via Wikimedia Commons"
          }
        },
        {
          "category": "historical",
          "title": "The de Havilland Comet inquiry: fatigue, grounding, and redesign",
          "excerpt": "the cause of the accident to the Comet wrecked off Elba was the structural failure of the pressure cabin brought about by fatigue",
          "source": "Statement by Mr. Boyd-Carpenter on the Report of the Court of Inquiry into the Comet accidents, House of Commons, 16 February 1955 (Hansard)",
          "href": "https://api.parliament.uk/historic-hansard/commons/1955/feb/16/comet-aircraft-accidents-report-of"
        },
        {
          "category": "literary",
          "title": "Daedalus and Icarus",
          "excerpt": "My son, I caution you to keep / the middle way, for if your pinions dip / too low the waters may impede your flight; / and if they soar too high the sun may scorch them. ... but as he neared the scorching sun, its heat / softened the fragrant wax that held his plumes; / and heat increasing melted the soft wax— / he waved his naked arms instead of wings, / with no more feathers to sustain his flight.",
          "source": "Ovid, Metamorphoses, Book 8, trans. Brookes More (1922), Perseus Digital Library",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0028:book%3D8:card%3D183",
          "image": {
            "src": "/covers/faa-certifies-boeing-737-max-7--a2.png",
            "alt": "A serene coastal landscape with a ploughman, shepherd and ships; Icarus's legs disappear into the sea at lower right",
            "credit": "Pieter Bruegel the Elder, Landscape with the Fall of Icarus, c. 1560s, Royal Museums of Fine Arts of Belgium, Brussels — via Wikimedia Commons"
          }
        },
        {
          "category": "literary",
          "title": "Leonardo's prophecy of the great bird",
          "excerpt": "Piglierà il primo volo il grande uccello sopra del dosso del suo magno Cecero e empiendo l'universo di stupore, empiendo di sua fama tutte le scritture e groria eterna al nido dove nacque.",
          "source": "Leonardo da Vinci, Codice sul volo degli uccelli (Codex on the Flight of Birds), c. 1505, Biblioteca Reale, Turin; text as recorded in the entry 'Grande Nibbio' on Italian Wikisource/Wikipedia",
          "href": "https://it.wikipedia.org/wiki/Grande_Nibbio",
          "image": {
            "src": "/covers/faa-certifies-boeing-737-max-7--a3.png",
            "alt": "A folio from Leonardo da Vinci's Codex on the Flight of Birds, with mirror-script notes and sketches analysing birds in flight",
            "credit": "Leonardo da Vinci, Codex on the Flight of Birds, c. 1505, Biblioteca Reale, Turin — via Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "Landscape with the Fall of Icarus",
          "excerpt": "Bruegel hides catastrophe in plain sight: the ploughman leans into his furrow, the shepherd gazes at the sky, and the merchant ship sails on, while at the lower right only two thrashing legs mark where Icarus has plunged into the sea. The painting is a study in how the world keeps working while one over-reaching flight ends in disaster — a fall that scarcely interrupts the ordinary business of the day.",
          "source": "Pieter Bruegel the Elder (attr.), oil on canvas, c. 1560s, Royal Museums of Fine Arts of Belgium, Brussels",
          "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_de_Oude_-_De_val_van_Icarus.jpg",
          "image": {
            "src": "/covers/faa-certifies-boeing-737-max-7--a4.png",
            "alt": "A serene coastal landscape with a ploughman, shepherd and ships; Icarus's legs disappear into the sea at lower right",
            "credit": "Pieter Bruegel the Elder, Landscape with the Fall of Icarus, c. 1560s, Royal Museums of Fine Arts of Belgium, Brussels — via Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "The Lament for Icarus",
          "excerpt": "Draper paints the aftermath of the dream rather than the flight: the golden-winged body of Icarus lies limp against a dark rock as three sea-nymphs mourn over him, his great feathered wings still splendid though the wax has failed. The picture turns a cautionary myth into an elegy, dwelling on the beauty and the cost of reaching too high.",
          "source": "Herbert James Draper, oil on canvas, exhibited 1898, Tate Britain, London",
          "href": "https://www.tate.org.uk/art/artworks/draper-the-lament-for-icarus-n01679",
          "image": {
            "src": "/covers/faa-certifies-boeing-737-max-7--a5.png",
            "alt": "The dead Icarus with large golden wings draped over a dark rock, mourned by three sea-nymphs against a dusky sky",
            "credit": "Herbert James Draper, The Lament for Icarus, exhibited 1898, Tate Britain, London — via Wikimedia Commons (Google Art Project)"
          }
        }
      ]
    },
    {
      "slug": "ai-firms-trump-safety-testing",
      "headline": "Meta, Anthropic, Google and OpenAI are set to meet Trump administration officials on AI safety testing",
      "overview": "Leading AI developers including Meta, Anthropic, Google and OpenAI were invited to meet Trump administration officials to discuss how the most advanced AI models are tested for safety. The talks follow a June executive order outlining voluntary government tests of models' cybersecurity and hacking capabilities. The White House has not said how results would be reported or made public.",
      "genre": "Technology",
      "sources": [
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMiqgFBVV95cUxObWVNalU0cV9OY2Q0RHFkdFJtakZJRTdzV1BiUDVvamY3RlVRX3ZydGl5YnAzU2dxQldBTVVMMW1wMWl0ekI1eXZJdm84bjBtUFBZc2JBeVJfblJEMVhDZGs4UWpaZXZTTUQtYy1QVFVsYmxsUG1jVHZTd2VFWEJXV2FlNXg4ZVZmRUI5SWpxMWo2cGFTT0hWRUJmNUpyaXZFRnRISnhvNy1YUQ?oc=5"
        },
        {
          "name": "Bloomberg",
          "href": "https://www.bloomberg.com/news/articles/2026-08-03/openai-anthropic-google-to-join-white-house-ai-safety-meeting"
        }
      ],
      "href": "#",
      "publishedAt": "2026-08-03",
      "image": {
        "src": "/covers/ai-firms-trump-safety-testing.png",
        "alt": "The White House in Washington, its columned north portico seen across the lawn.",
        "credit": "Wikimedia Commons"
      },
      "rank": 24,
      "edition": "Evening Edition · 3 August 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "The Russell–Einstein Manifesto",
          "excerpt": "We have to learn to think in a new way... In view of the fact that in any future world war nuclear weapons will certainly be employed, and that such weapons threaten the continued existence of mankind, we urge the governments of the world to realize, and to acknowledge publicly, that their purpose cannot be furthered by a world war, and we urge them, consequently, to find peaceful means for the settlement of all matters of dispute between them.",
          "source": "Bertrand Russell, Albert Einstein and nine fellow scientists, statement issued in London, 9 July 1955 (Atomic Heritage Foundation / Nuclear Museum archive)",
          "href": "https://ahf.nuclearmuseum.org/ahf/key-documents/russell-einstein-manifesto/"
        },
        {
          "category": "historical",
          "title": "Summary Statement of the Asilomar Conference on Recombinant DNA Molecules",
          "excerpt": "It is this ignorance that has compelled us to conclude that it would be wise to exercise the utmost caution... it was agreed that standards of protection should be greater at the beginning and modified as assessments of the risks change.",
          "source": "Paul Berg, David Baltimore, Sydney Brenner, Richard O. Roblin III and Maxine F. Singer, Proceedings of the National Academy of Sciences 72(6):1981–1984, 1975",
          "href": "https://pmc.ncbi.nlm.nih.gov/articles/PMC432675/"
        },
        {
          "category": "literary",
          "title": "Frankenstein; or, The Modern Prometheus",
          "excerpt": "Remember that I have power; you believe yourself miserable, but I can make you so wretched that the light of day will be hateful to you. You are my creator, but I am your master; obey!",
          "source": "Mary Wollstonecraft Shelley, first published 1818 (Project Gutenberg full text)",
          "href": "https://www.gutenberg.org/cache/epub/84/pg84.txt",
          "image": {
            "src": "/covers/ai-firms-trump-safety-testing--a2.png",
            "alt": "Theodor von Holst's engraved frontispiece to the 1831 edition of Frankenstein, showing the newly animated creature recoiling as Victor flees his laboratory",
            "credit": "Theodor von Holst, frontispiece to the 1831 edition of Frankenstein; via Wikimedia Commons (public domain)"
          }
        },
        {
          "category": "literary",
          "title": "The Sorcerer's Apprentice (\"The Pupil in Magic\")",
          "excerpt": "Ah, he's coming! see, / Great is my dismay! / Spirits raised by me / Vainly would I lay!",
          "source": "Johann Wolfgang von Goethe, \"Der Zauberlehrling\" (1797); anonymous English translation in The Works of J. W. von Goethe, Vol. 9 (Wikisource)",
          "href": "https://en.wikisource.org/wiki/The_Works_of_J._W._von_Goethe/Volume_9/The_Pupil_in_Magic",
          "image": {
            "src": "/covers/ai-firms-trump-safety-testing--a3.png",
            "alt": "An 1882 illustration of the sorcerer's apprentice overwhelmed by the flood as the enchanted broom carries endless buckets of water",
            "credit": "Illustration by F. Barth, c. 1882; via Wikimedia Commons (public domain)"
          }
        },
        {
          "category": "artistic",
          "title": "Prometheus Bound",
          "excerpt": "Rubens paints the Titan who stole fire for humankind splayed helpless on his rock, an eagle tearing at his liver as punishment from the gods for handing mortals a power that was not theirs to give. Muscles strain, the torch of stolen knowledge already spent, the giver of a transformative technology now bound to endure the consequences of the gift. It is the promethean bargain made flesh: the very act of empowering the world with fire is inseparable from the terror and the reckoning it unleashes.",
          "source": "Peter Paul Rubens (with the eagle by Frans Snyders), oil on canvas, c. 1611–1618, Philadelphia Museum of Art",
          "href": "https://commons.wikimedia.org/wiki/File:Rubens_-_Prometheus_Bound.jpg",
          "image": {
            "src": "/covers/ai-firms-trump-safety-testing--a4.png",
            "alt": "Rubens's Prometheus Bound: a muscular nude Titan lies on his back on a rocky ledge while a great eagle grips him and tears at his side",
            "credit": "Peter Paul Rubens and Frans Snyders, Prometheus Bound, c. 1611–1618, Philadelphia Museum of Art; via Wikimedia Commons (public domain)"
          }
        },
        {
          "category": "artistic",
          "title": "Prometheus: The Poem of Fire, Op. 60",
          "excerpt": "Scriabin's tone poem opens on his unresolved \"mystic chord,\" a sonority hovering outside ordinary tonality, as if to render in sound a power humanity has summoned but cannot yet master. Across the score he binds the orchestra to a keyboard of coloured light, insisting that fire, illumination and creation are one ecstatic and dangerous act. The music climbs toward a blazing, near-uncontainable climax: the myth of stolen fire recast as an intoxicating drive to create something greater and more luminous than ourselves.",
          "source": "Alexander Scriabin, symphonic poem for orchestra, piano, chorus and colour organ, composed 1910 (IMSLP / Petrucci Music Library score)",
          "href": "https://imslp.org/wiki/Prometheus,_Le_Po%C3%A8me_du_Feu,_Op.60_(Scriabin,_Aleksandr)"
        }
      ]
    },
    {
      "slug": "uefa-fifa-infantino-world-cup-selloff",
      "headline": "European soccer body UEFA warns FIFA of legal action over Infantino's abandoned plan to sell World Cup stakes",
      "overview": "UEFA warned FIFA it could take legal action over president Gianni Infantino's failed plan to sell commercial stakes in the men's World Cup, according to senior European soccer officials. Opponents threatened 'non co-operation' with FIFA unless Infantino steps back, deepening a governance crisis. Several national federations have withdrawn support for his re-election.",
      "genre": "Culture",
      "sources": [
        {
          "name": "AP",
          "href": "https://news.google.com/rss/articles/CBMimwFBVV95cUxQS1lMdTNycFBsQVJid1UxY0RFd0xEcVRKdW5MM2NSRGlLUTVraUVtU2xuMzk5MGFUVXhzd19XUXJwajdiNTIxX3lGSGF6UlhLODdwbjhzc1d6c09DbWZzMjJyYmo4ZXBSQ1lRWEtSeHFBRjF2UDM4NzY4OFhGX3ZXS1h4YnFXU29WdS1jTE12RW1YVmNtZUliT0E0WQ?oc=5"
        },
        {
          "name": "BBC",
          "href": "https://www.bbc.co.uk/sport/football/articles/cp30vg829nxo"
        }
      ],
      "href": "#",
      "publishedAt": "2026-08-03",
      "image": {
        "src": "/covers/uefa-fifa-infantino-world-cup-selloff.png",
        "alt": "The modernist stone-and-glass headquarters of world soccer's governing body on a wooded hillside above Zurich.",
        "credit": "Wikimedia Commons"
      },
      "rank": 25,
      "edition": "Evening Edition · 3 August 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "The Zanes of Olympia: statues cast from cheaters' fines",
          "excerpt": "By the platform have been set up bronze images of Zeus. These have been made from the fines inflicted on athletes who have wantonly broken the rules of the contests, and they are called Zanes (figures of Zeus) by the natives.",
          "source": "Pausanias, Description of Greece 5.21.2, trans. W. H. S. Jones (Loeb, 1918); Perseus Digital Library",
          "href": "http://www.perseus.tufts.edu/hopper/text?doc=Paus.+5.21.2",
          "image": {
            "src": "/covers/uefa-fifa-infantino-world-cup-selloff--a0.png",
            "alt": "Row of stone statue bases (the Zanes) lining the entrance to the ancient stadium at Olympia, funded by fines levied on athletes who bribed their way to victory",
            "credit": "Bases of the Zanes, Olympia (4th–1st century BC). Photo by Dennis Jarvis, Wikimedia Commons (CC BY-SA)"
          }
        },
        {
          "category": "historical",
          "title": "The Blue and Green factions and the Nika revolt against Justinian",
          "excerpt": "In every city the population has been divided for a long time past into the Blue and the Green factions; but within comparatively recent times it has come about that, for the sake of these names and the seats which the rival factions occupy in watching the games, they spend their money and abandon their bodies to the most cruel tortures ... I, for my part, am unable to call this anything except a disease of the soul.",
          "source": "Procopius, History of the Wars 1.24, trans. H. B. Dewing (Loeb, 1914); Internet Medieval Sourcebook, Fordham University",
          "href": "https://sourcebooks.fordham.edu/source/procop-wars1.asp",
          "image": {
            "src": "/covers/uefa-fifa-infantino-world-cup-selloff--a1.png",
            "alt": "Byzantine mosaic of Emperor Justinian I flanked by his court and guard, Basilica of San Vitale, Ravenna",
            "credit": "Mosaic of Emperor Justinian I, Basilica of San Vitale, Ravenna (c. 547). Wikimedia Commons"
          }
        },
        {
          "category": "literary",
          "title": "Pindar's Olympian 1: the glory of the games above all wealth",
          "excerpt": "Water is best, and gold, like a blazing fire in the night, stands out supreme of all lordly wealth. But if, my heart, you wish to sing of contests, look no further for any star warmer than the sun ... and let us not proclaim any contest greater than Olympia.",
          "source": "Pindar, Olympian 1 (476 BC), trans. Diane Arnson Svarlien; Perseus Digital Library",
          "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0162:book=O.:poem=1"
        },
        {
          "category": "literary",
          "title": "Dante's simoniacs: those who put holy things up for sale",
          "excerpt": "O Simon Magus, O forlorn disciples, / Ye who the things of God, which ought to be / The brides of holiness, rapaciously / For silver and for gold do prostitute,",
          "source": "Dante Alighieri, Inferno, Canto XIX, trans. Henry Wadsworth Longfellow (1867); Wikisource",
          "href": "https://en.wikisource.org/wiki/Divine_Comedy_(Longfellow_1867)/Volume_1/Canto_19"
        },
        {
          "category": "artistic",
          "title": "Panathenaic Prize Amphora: the foot-race",
          "excerpt": "On the body of this two-handled prize vase four nude runners stretch full-tilt across the clay, heads forward, arms pumping, the timeless image of athletes competing for honor. Such amphorae, filled with sacred olive oil from Athena's groves, were the official prizes of the Panathenaic games, their reverse always stamped with the goddess herself. The vessel fuses the athletic contest, its guardian deity, and its reward into a single object, a reminder that the games and their prizes were once held in trust for a whole community rather than sold off in shares.",
          "source": "Attic black-figure Panathenaic prize amphora attributed to the Euphiletos Painter, ca. 530–520 BC; British Museum (B137), via Wikimedia Commons",
          "href": "https://commons.wikimedia.org/wiki/File:Panathenaic_amphora_BM_B137.jpg",
          "image": {
            "src": "/covers/uefa-fifa-infantino-world-cup-selloff--a4.png",
            "alt": "Attic black-figure amphora showing four nude runners in a foot-race, painted in black silhouette against the orange clay",
            "credit": "Panathenaic prize amphora, attributed to the Euphiletos Painter, ca. 530–520 BC, British Museum (B137). Photo: Jastrow, Wikimedia Commons (public domain)"
          }
        },
        {
          "category": "artistic",
          "title": "El Greco: Christ Driving the Money Changers from the Temple",
          "excerpt": "With a raised cord whip and a swirl of rose and blue robes, Christ scatters the traders who had turned a sacred precinct into a marketplace, their bodies recoiling in a diagonal cascade of alarm. El Greco stages the cleansing amid grand classical columns, coins and caged doves spilling underfoot, dividing the panel between the guilty who flee and the faithful who look on. It is the archetypal image of the sacred defended against those who would put it up for sale.",
          "source": "El Greco (Domenikos Theotokopoulos), Christ Driving the Money Changers from the Temple, c. 1570; Wikimedia Commons (Google Art Project)",
          "href": "https://commons.wikimedia.org/wiki/File:El_Greco_(Domenikos_Theotokopoulos)_-_Christ_Driving_the_Money_Changers_from_the_Temple_-_Google_Art_Project.jpg",
          "image": {
            "src": "/covers/uefa-fifa-infantino-world-cup-selloff--a5.png",
            "alt": "El Greco painting of Christ wielding a whip to drive merchants and money changers out of the temple, figures recoiling amid classical architecture",
            "credit": "El Greco, Christ Driving the Money Changers from the Temple, c. 1570. Wikimedia Commons (Google Art Project), public domain"
          }
        }
      ]
    },
    {
      "slug": "mackintosh-building-rebuild-campaign",
      "headline": "A Scottish architect launches a campaign for a full rebuild of Glasgow's fire-ravaged Mackintosh Building",
      "overview": "Architect Ruairidh Moir launched a public campaign for a faithful reconstruction of Charles Rennie Mackintosh's fire-gutted Glasgow School of Art, dubbed 'Scotland's Notre-Dame'. He called for an independent body to take over the project after the school said it could not afford the roughly £265 million rebuild alone. A petition urging Scottish and UK government support gathered thousands of signatures.",
      "genre": "Culture",
      "sources": [
        {
          "name": "Dezeen",
          "href": "https://www.dezeen.com/2026/08/03/glasgow-school-of-art-campaign/"
        },
        {
          "name": "The Scotsman",
          "href": "https://www.scotsman.com/arts-and-culture/campaign-launched-for-full-rebuild-of-scotlands-notre-dame-at-gsa-8813887"
        }
      ],
      "href": "#",
      "publishedAt": "2026-08-03",
      "image": {
        "src": "/covers/mackintosh-building-rebuild-campaign.png",
        "alt": "The stone-and-glass facade of Charles Rennie Mackintosh's Glasgow School of Art building, with its tall studio windows.",
        "credit": "Wikimedia Commons"
      },
      "rank": 26,
      "edition": "Evening Edition · 3 August 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "The Great Fire of London devours Old St Paul's, 1666 — and Wren rebuilds it anew",
          "excerpt": "All Fleet street, the Old Bailey, Ludgate hill, Warwick lane, Newgate, Paul's chain, Watling street, now flaming, and most of it reduced to ashes; the stones of Paul's flew like grenados, the melting lead running down the streets in a stream, and the very pavements glowing with fiery redness, so as no horse, nor man, was able to tread on them, and the demolition had stopped all the passages, so that no help could be applied.",
          "source": "John Evelyn, 'The Diary of John Evelyn' (Vol. 2), entry for 4 September 1666, Project Gutenberg",
          "href": "https://www.gutenberg.org/cache/epub/42081/pg42081.txt"
        },
        {
          "category": "historical",
          "title": "Venice's Campanile of San Marco collapses in 1902 and is rebuilt 'as it was, where it was'",
          "excerpt": "When the thousand-year-old bell tower crumbled into a heap of rubble in Piazza San Marco — killing no one but the custodian's cat — Venice resolved almost at once to raise it again exactly as it had stood. Mayor Filippo Grimani's watchword, 'com'era, dov'era' (as it was, where it was), overruled voices who found the square handsomer without it or a replica devoid of historical value. The new campanile, rebuilt with surviving bricks and crowned by the one bell that outlived the fall, was consecrated in 1912, a millennium after the first foundations were laid.",
          "source": "St Mark's Campanile — collapse of 14 July 1902 and reconstruction (inaugurated 25 April 1912) on the principle 'com'era, dov'era', Wikipedia",
          "href": "https://en.wikipedia.org/wiki/St_Mark%27s_Campanile",
          "image": {
            "src": "/covers/mackintosh-building-rebuild-campaign--a1.png",
            "alt": "A mound of rubble where a great bell tower once stood, beside the arcades of St Mark's Square",
            "credit": "Domenico Anderson, ruins of the Campanile of San Marco, 14 July 1902, via Wikimedia Commons (public domain)"
          }
        },
        {
          "category": "literary",
          "title": "The Phoenix reborn from its own ashes — Ovid's 'Metamorphoses'",
          "excerpt": "There is one bird which reproduces and renews itself: the Assyrians gave this bird his name—the Phoenix. He does not live either on grain or herbs, but only on small drops of frankincense and juices of amomum. ... As soon as he has strewn in this new nest the cassia bark and ears of sweet spikenard, and some bruised cinnamon with yellow myrrh, he lies down on it and refuses life among those dreamful odors.—And they say that from the body of the dying bird is reproduced a little Phoenix which is destined to live just as many years.",
          "source": "Ovid, 'Metamorphoses' Book XV, trans. Brookes More (1922), Theoi Classical Texts Library",
          "href": "https://www.theoi.com/Text/OvidMetamorphoses15.html"
        },
        {
          "category": "literary",
          "title": "Ruskin's warning: to 'restore' is 'the most total destruction which a building can suffer'",
          "excerpt": "Neither by the public, nor by those who have the care of public monuments, is the true meaning of the word restoration understood. It means the most total destruction which a building can suffer: a destruction out of which no remnants can be gathered; a destruction accompanied with false description of the thing destroyed. Do not let us deceive ourselves in this important matter; it is impossible, as impossible as to raise the dead, to restore anything that has ever been great or beautiful in architecture.",
          "source": "John Ruskin, 'The Seven Lamps of Architecture' (1849), ch. VI 'The Lamp of Memory', Project Gutenberg",
          "href": "https://www.gutenberg.org/cache/epub/35898/pg35898.txt"
        },
        {
          "category": "artistic",
          "title": "Turner paints a beloved landmark ablaze: 'The Burning of the Houses of Lords and Commons'",
          "excerpt": "Turner stood among the crowds on the Thames the night the Palace of Westminster burned, and turned catastrophe into incandescence — a torrent of white-gold fire tearing into the sky while Westminster Bridge and the water below blaze in its reflection. The very stone of a national monument seems to dissolve into heat and light, spectators reduced to shadows at the river's edge. The painting fixes the terrible beauty of the moment a treasured building is lost, the same shock Glasgow felt watching the Mackintosh burn.",
          "source": "J.M.W. Turner, 'The Burning of the Houses of Lords and Commons, October 16, 1834' (1835), oil on canvas, Philadelphia Museum of Art",
          "href": "https://commons.wikimedia.org/wiki/File:Joseph_Mallord_William_Turner,_English_-_The_Burning_of_the_Houses_of_Lords_and_Commons,_October_16,_1834_-_Google_Art_Project.jpg",
          "image": {
            "src": "/covers/mackintosh-building-rebuild-campaign--a4.png",
            "alt": "A vast public building engulfed in white-gold flames at night, its fire mirrored in the river below",
            "credit": "J.M.W. Turner, 'The Burning of the Houses of Lords and Commons' (1835), Philadelphia Museum of Art, via Wikimedia Commons (public domain)"
          }
        },
        {
          "category": "artistic",
          "title": "Stravinsky's 'Firebird' — a score of destruction giving way to radiant rebirth",
          "excerpt": "Stravinsky's 1910 ballet takes the Russian folk emblem of the fire-bird — kin to the phoenix — and drives its music from menace and the shattering of Kashchei's dark kingdom toward a slowly swelling hymn. In the Finale a single horn intones a quiet melody that gathers strength, instrument by instrument, until the whole orchestra blazes into a triumphant coda of bells and brass. It is the sound of something thought lost rising again, luminous and whole — the very hope a full rebuild of the Mackintosh would embody.",
          "source": "Igor Stravinsky, 'The Firebird' (L'Oiseau de feu), ballet, 1910, IMSLP (Petrucci Music Library)",
          "href": "https://imslp.org/wiki/The_Firebird_(ballet),_K010_(Stravinsky,_Igor)"
        }
      ]
    },
    {
      "slug": "cuba-national-grid-collapse-blackout",
      "headline": "Cuba's national electricity grid collapses, plunging the island's roughly 10 million people into darkness in the country's sixth nationwide blackout of 2026",
      "overview": "Cuba's National Electric System disconnected entirely at about 10:43 p.m. on Sunday, the state Electric Union said, cutting power across the island of some 10 million people for the sixth time this year. The grid has repeatedly failed in 2026 amid chronic shortages of fuel and spare parts and breakdowns at thermoelectric plants, some more than 30 years old. Havana has struggled to import fuel since the loss of its main ally, Venezuela, and amid renewed US pressure.",
      "genre": "Politics",
      "sources": [
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMiogFBVV95cUxOMTdFbGhVSWlfdzZ3aWduVjdUeTFvMnBFVFhaMjg4SkhrMXJlcnFtWTlWTTdnRjNLMzRCNHg4Tm9OTlpkM2c3QlFGR2RuejZnNlM5R182b09EbXQ4dG5RaEJjSHNDRjhtOS1aY05DZlAtQWlMZVBHdE1yY0xFb29yazdJeW03ZXVGcXZSQ2FLOFlremVCcGZ0ckZobkFqRG9fZGc?oc=5"
        },
        {
          "name": "Al Jazeera",
          "href": "https://www.aljazeera.com/news/2026/8/3/grid-failure-plunges-cuba-into-nationwide-blackout"
        }
      ],
      "href": "#",
      "publishedAt": "2026-08-03",
      "image": {
        "src": "/covers/cuba-national-grid-collapse-blackout.png",
        "alt": "A darkened Havana skyline at night during a nationwide power blackout in Cuba.",
        "credit": "Wikimedia Commons"
      },
      "lead": true,
      "rank": 27,
      "edition": "Morning Edition · 3 August 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "A Darkness Like a Sealed Room",
          "excerpt": "We had scarcely sat down when night was upon us,—not such as we have when there is no moon, or when the sky is cloudy, but such as there is in some closed room when the lights are extinguished. You might hear the shrieks of women, the monotonous wailing of children, the shouts of men.",
          "source": "Pliny the Younger, Letters, Book VI (second letter to Cornelius Tacitus on the eruption of Vesuvius, AD 79), English translation, in 'Pliny's Letters,' Chapter 2. Wikisource.",
          "href": "https://en.wikisource.org/wiki/Pliny%27s_Letters/Chapter_2"
        },
        {
          "category": "historical",
          "title": "The Dark Day of 1780",
          "excerpt": "We were here at the time the 'dark day' happened, (19th of May;) it has been said that the darkness was not so great in New-Jersey as in New-England. How great it was there I do not know, but I know that it was very dark where I then was in New-Jersey; so much so that the fowls went to their roosts, the cocks crew and the whip-poor-wills sung their usual serenade; the people had to light candles in their houses to enable them to see to carry on their usual business; the night was as uncommonly dark as the day was.",
          "source": "Joseph Plumb Martin, The Adventures of a Revolutionary Soldier (A Narrative of Some of the Adventures, Dangers and Sufferings of a Revolutionary Soldier, 1830), Chapter VI. Wikisource.",
          "href": "https://en.wikisource.org/wiki/The_Adventures_Of_A_Revolutionary_Soldier/Chapter_VI."
        },
        {
          "category": "literary",
          "title": "The Bright Sun Was Extinguished",
          "excerpt": "I had a dream, which was not all a dream.\nThe bright sun was extinguished, and the stars\nDid wander darkling in the eternal space,\nRayless, and pathless, and the icy Earth\nSwung blind and blackening in the moonless air;\nMorn came and went—and came, and brought no day,\nAnd men forgot their passions in the dread\nOf this their desolation; and all hearts\nWere chilled into a selfish prayer for light:\nAnd they did live by watchfires—and the thrones,\nThe palaces of crownéd kings—the huts,\nThe habitations of all things which dwell,",
          "source": "Lord Byron, 'Darkness' (1816), in The Works of Lord Byron, Vol. IV. Project Gutenberg eBook No. 20158.",
          "href": "https://www.gutenberg.org/files/20158/20158-h/20158-h.htm"
        },
        {
          "category": "literary",
          "title": "Darkness Which May Be Felt",
          "excerpt": "And the LORD said unto Moses, Stretch out thine hand toward heaven, that there may be darkness over the land of Egypt, even darkness which may be felt. And Moses stretched forth his hand toward heaven; and there was a thick darkness in all the land of Egypt three days: They saw not one another, neither rose any from his place for three days: but all the children of Israel had light in their dwellings.",
          "source": "The Holy Bible, King James Version, Exodus 10:21–23. Wikisource.",
          "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Exodus"
        },
        {
          "category": "artistic",
          "title": "Nocturne on a Darkened River",
          "excerpt": "Whistler drains a great city at night down to a few strokes of blue-black and faint gold: the pier of Old Battersea Bridge looms as a silhouette over a Thames barely distinguishable from the sky, with only distant sparks of light to mark that a metropolis is there at all. The painting turns a darkened urban waterfront into something hushed and near-formless, an apt mirror for an island whose skyline vanishes when the grid fails.",
          "source": "James McNeill Whistler, Nocturne: Blue and Gold – Old Battersea Bridge (c. 1872–1875), oil on canvas, Tate Britain, London. Public domain via Wikimedia Commons.",
          "href": "https://commons.wikimedia.org/wiki/File:James_McNeill_Whistler_-_Nocturne_en_bleu_et_or.jpg",
          "image": {
            "src": "/covers/cuba-national-grid-collapse-blackout--a4.png",
            "alt": "A misty nocturnal view of the Thames with the tall dark pier of Old Battersea Bridge silhouetted against a blue-black sky, faint golden lights and sparks of fireworks glimmering in the distance.",
            "credit": "James McNeill Whistler, Nocturne: Blue and Gold – Old Battersea Bridge (c. 1872–1875), Tate Britain. Public domain via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "The Representation of Chaos",
          "excerpt": "Haydn opens The Creation with 'The Representation of Chaos,' an orchestral prelude that refuses to settle: dissonances, drifting harmonies and unresolved phrases evoke a formless, lightless void before order exists—until the chorus finally erupts on the words 'and there was Light.' It is a portrait of the moment before power returns, the exact suspension a darkened nation lives through waiting for the current to come back. The composer is shown here in Thomas Hardy's 1791 portrait, painted during Haydn's London years.",
          "source": "Joseph Haydn, 'The Representation of Chaos,' opening of the oratorio The Creation (Die Schöpfung, 1798); illustrated by Thomas Hardy's portrait of Haydn (1791), Royal College of Music. Public domain via Wikimedia Commons.",
          "href": "https://commons.wikimedia.org/wiki/File:Joseph_Haydn,_portrait_by_Thomas_Hardy.jpg",
          "image": {
            "src": "/covers/cuba-national-grid-collapse-blackout--a5.png",
            "alt": "Half-length painted portrait of composer Joseph Haydn in a grey coat and powdered wig, seated and facing right, holding a bound volume with a keyboard instrument behind him.",
            "credit": "Thomas Hardy, Portrait of Joseph Haydn (1791), Royal College of Music. Public domain via Wikimedia Commons."
          }
        }
      ]
    },
    {
      "slug": "us-japan-joint-yen-intervention",
      "headline": "The United States and Japan jointly intervene in currency markets to support the yen, a rare coordinated move that sends the dollar sharply lower",
      "overview": "Washington and Tokyo carried out a rare joint intervention to prop up the Japanese yen, and both said they would not hesitate to act together again in the future. The dollar fell sharply against the yen after the move, which followed weeks of pressure on the currency. US Treasury Secretary Scott Bessent signaled readiness to repeat the coordinated action and urged a bigger Federal Reserve backstop.",
      "genre": "Economy",
      "sources": [
        {
          "name": "BBC",
          "href": "https://www.bbc.co.uk/news/articles/cglj1pr0wjwo"
        },
        {
          "name": "AP",
          "href": "https://news.google.com/rss/articles/CBMimAFBVV95cUxOWkpfVU0zTnBZSEZnbmNLUUxSMzVoSzVTMk1xZVRyS1FaU1hHbXBlVlpIWHJsQ1owSndGU3hKS3Znc3RVUjFiS3VnUl9vWU54Y05JT1dWb19GeG50NkttOVZld1hNUndETHJOdzhBSnhsY3FtQml3dXRRWmZxbTVSOE0teE1wMldFVmtuS3F3RXdDM1JMU29DcA?oc=5"
        }
      ],
      "href": "#",
      "publishedAt": "2026-08-03",
      "image": {
        "src": "/covers/us-japan-joint-yen-intervention.png",
        "alt": "Japanese yen banknotes fanned out beside US dollar bills, illustrating a currency intervention.",
        "credit": "Wikimedia Commons"
      },
      "rank": 28,
      "edition": "Morning Edition · 3 August 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Rome manipulates the value of its coin",
          "excerpt": "The weight, however, of the libra of copper was diminished during the First Punic War, the republic not having means to meet its expenditure: in consequence of which, an ordinance was made that the as should in future be struck of two ounces weight. By this contrivance a saving of five-sixths was effected, and the public debt was liquidated. ... Livius Drusus, when tribune of the people, alloyed the silver with one-eighth part of copper.",
          "source": "Pliny the Elder, The Natural History, Book XXXIII, ch. 13, trans. John Bostock and H. T. Riley (London, 1855). Perseus Digital Library, Tufts University.",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.02.0137%3Abook%3D33%3Achapter%3D13"
        },
        {
          "category": "historical",
          "title": "The Tripartite Agreement of 1936",
          "excerpt": "The Government of the United States, after consultation with the British Government and the French Government, joins with them in affirming a common desire to foster those conditions which safeguard peace and will best contribute to the restoration of order in international economic relations... The United States Government, as also the British and French Governments, declares its intention to continue to use appropriate available resources so as to avoid as far as possible any disturbance of the basis of international exchange resulting from the proposed readjustment. It will arrange for such consultation for this purpose as may prove necessary with the other two Governments and their authorized agencies.",
          "source": "Declaration on currency (Tripartite Agreement), statement issued by the U.S. Treasury, September 25, 1936, reprinted in Federal Reserve Bulletin, Vol. 22, No. 10 (October 1936), pp. 759-760. FRASER, Federal Reserve Bank of St. Louis.",
          "href": "https://fraser.stlouisfed.org/files/docs/publications/FRB/1930s/frb_101936.pdf"
        },
        {
          "category": "literary",
          "title": "Ecclesiastes on the hunger for silver",
          "excerpt": "He that loveth silver shall not be satisfied with silver; nor he that loveth abundance with increase: this is also vanity. When goods increase, they are increased that eat them: and what good is there to the owners thereof, saving the beholding of them with their eyes? The sleep of a labouring man is sweet, whether he eat little or much: but the abundance of the rich will not suffer him to sleep.",
          "source": "Ecclesiastes 5:10-12, King James Version (1611; 1769 standard text). Wikisource.",
          "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Ecclesiastes"
        },
        {
          "category": "literary",
          "title": "Timon's yellow slave that makes black white",
          "excerpt": "Gold? Yellow, glittering, precious Gold?\nNo Gods, I am no idle Votarist,\nRoots you cleere Heauens. Thus much of this will make\nBlacke, white; fowle, faire; wrong, right;\nBase, Noble; Old, young; Coward, valiant.\n...\nThis yellow Slaue,\nWill knit and breake Religions, blesse th' accurst,\nMake the hoare Leprosie ador'd, place Theeues,\nAnd giue them Title, knee, and approbation\nWith Senators on the Bench...",
          "source": "William Shakespeare, The Life of Timon of Athens (First Folio text, 1623), Act IV, Scene 3. Project Gutenberg, ebook no. 1132.",
          "href": "https://www.gutenberg.org/ebooks/1132"
        },
        {
          "category": "artistic",
          "title": "Reymerswaele, ‘The Banker and His Wife’",
          "excerpt": "Marinus van Reymerswaele paints a banker hunched over his balance and stacked gold coins, weighing currency to the last grain while his wife looks up from an illuminated ledger. The obsessive attention to the metal’s exact worth makes money itself the true subject of the picture. It is an early portrait of a world in which the precise value of a coin—and the will to defend it—governs everything.",
          "source": "Marinus van Reymerswaele, The Banker and His Wife (c. 1538), oil on panel. Public domain via Wikimedia Commons.",
          "href": "https://commons.wikimedia.org/wiki/File:Marinus_van_Reymerswale_-_The_Banker_and_His_Wife_-_WGA19323.jpg",
          "image": {
            "src": "/covers/us-japan-joint-yen-intervention--a4.png",
            "alt": "A 16th-century banker weighs gold coins on a balance while his wife watches beside an open ledger.",
            "credit": "Marinus van Reymerswaele, The Banker and His Wife (c. 1538). Public domain via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "Wagner's Rhinegold hoard",
          "excerpt": "In the opening scene of Das Rheingold the Nibelung Alberich steals the gold guarded by the Rhinemaidens and forges it into a ring that promises mastery over the world, setting gods, dwarves and giants scheming to seize and redistribute the hoard. Wagner scores this contest over gold with the shimmering, endlessly rising Rhine motif and the ominous ring theme, turning the manipulation of a single golden treasure into the engine of an entire cosmic drama. The parallel is exact: whoever controls the store of value controls the balance of power, and every party maneuvers to bend that value to its own ends.",
          "source": "Richard Wagner, Das Rheingold, WWV 86A (composed 1854, first performed 1869); full score at IMSLP. Portrait: Casar Willich, Portrait of Richard Wagner (c. 1862).",
          "href": "https://imslp.org/wiki/Das_Rheingold,_WWV_86A_(Wagner,_Richard)",
          "image": {
            "src": "/covers/us-japan-joint-yen-intervention--a5.png",
            "alt": "Oil portrait of a middle-aged Richard Wagner in dark coat and white cravat, seen half-length against a plain dark background, gazing slightly to one side.",
            "credit": "Casar Willich, Portrait of Richard Wagner (c. 1862), Reiss-Engelhorn-Museen, Mannheim. Public domain via Wikimedia Commons."
          }
        }
      ]
    },
    {
      "slug": "aung-san-suu-kyi-red-cross-visit",
      "headline": "Myanmar's military releases photos of detained former leader Aung San Suu Kyi meeting a Red Cross official, her first confirmed outside contact in about two and a half years",
      "overview": "Myanmar's military government released photographs showing Aung San Suu Kyi, 81, meeting an official of the International Committee of the Red Cross, her first confirmed contact with the outside world since early 2024. The Nobel laureate has been held largely incommunicado since the 2021 coup and is serving decades-long prison sentences. Rights groups have repeatedly demanded proof of her wellbeing.",
      "genre": "Politics",
      "sources": [
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMivgFBVV95cUxPRjJySG5fWC1faXFlRjYzYndjVkNQMVhTQ1BHalhDVklUZ3d5TzY2R29lUzFaSTNCaGNWNzVDd0JTY3c2MDZTWm9tbmJFWGtpSl9ldDN4NkVuOV9NaURPNWxKODdJZDZmQ0RqbDNzaUMtc3RwUTJ2UW5RR0ZKdzItbjVuWEVIRjZROFgtbnh6SFkyTElUVG9DdTdiclNzdU5hZWEzS05GRFh6bHJnYy03d2NSenhmZWV3Uy1fR19B?oc=5"
        },
        {
          "name": "BBC",
          "href": "https://www.bbc.co.uk/news/articles/c1e1d5j6660o"
        }
      ],
      "href": "#",
      "publishedAt": "2026-08-03",
      "image": {
        "src": "/covers/aung-san-suu-kyi-red-cross-visit.png",
        "alt": "The headquarters of the International Committee of the Red Cross in Geneva.",
        "credit": "Wikimedia Commons"
      },
      "rank": 29,
      "edition": "Morning Edition · 3 August 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Boethius awaiting execution in his cell",
          "excerpt": "'Ah! why,' I cried, 'mistress of all excellence, hast thou come down from on high, and entered the solitude of this my exile? Is it that thou, too, even as I, mayst be persecuted with false accusations?'\n\n'Could I desert thee, child,' said she, 'and not lighten the burden which thou hast taken upon thee through the hatred of my name, by sharing this trouble?'",
          "source": "Boethius, The Consolation of Philosophy, written c. 524 AD while imprisoned at Pavia awaiting execution; translated into English prose and verse by H. R. James (1897). Project Gutenberg eBook #14328.",
          "href": "https://www.gutenberg.org/cache/epub/14328/pg14328.txt"
        },
        {
          "category": "historical",
          "title": "The Red Cross reaches Mandela on Robben Island",
          "excerpt": "Like the ICRC photograph now released from Myanmar, the Red Cross visits to apartheid South Africa's political prisoners were often the sole confirmed channel between a detained leader and the outside world. From 1967 to 1986, ICRC delegates saw Nelson Mandela repeatedly, first on Robben Island and later at Pollsmoor, pressing for humane conditions and carrying word of his condition beyond the prison walls when the state kept him otherwise cut off. Their reports made an isolated, incommunicado prisoner visible again, echoing exactly the role a Red Cross official plays for Aung San Suu Kyi.",
          "source": "International Committee of the Red Cross, 'A tribute to Nelson Mandela' (ICRC official record of its 1967-1986 prison visits).",
          "href": "https://www.icrc.org/en/document/tribute-nelson-mandela"
        },
        {
          "category": "literary",
          "title": "Lovelace: stone walls do not a prison make",
          "excerpt": "Stone walls doe not a prison make,\nNor iron bars a cage;\nMindes innocent and quiet take\nThat for an hermitage;\nIf I have freedome in my love,\nAnd in my soule am free,\nAngels alone that sore above\nEnjoy such liberty.",
          "source": "Richard Lovelace, 'To Althea, from Prison' (written 1642 during his imprisonment; published in Lucasta, 1649). Wikisource.",
          "href": "https://en.wikisource.org/wiki/To_Althea,_from_Prison"
        },
        {
          "category": "literary",
          "title": "Wilde's prisoner and the tent of blue",
          "excerpt": "I never saw a man who looked\nWith such a wistful eye\nUpon that little tent of blue\nWhich prisoners call the sky,\nAnd at every drifting cloud that went\nWith sails of silver by.",
          "source": "Oscar Wilde, 'The Ballad of Reading Gaol' (1898), written after his own imprisonment. Project Gutenberg eBook #301.",
          "href": "https://www.gutenberg.org/files/301/301-h/301-h.htm"
        },
        {
          "category": "artistic",
          "title": "Van Gogh: the prisoners' round",
          "excerpt": "Painted in 1890 while Van Gogh was himself confined at the asylum in Saint-Remy, 'Prisoners Exercising' shows inmates trudging in an endless circle at the bottom of a sheer, blue-walled shaft, hemmed in on every side with no sky in view. The tiny, bowed figures and the crushing verticality of the walls make visible the years of enforced isolation behind Aung San Suu Kyi's detention, and the single upturned face suggests the smallest gesture toward the outside world.",
          "source": "Vincent van Gogh, Prisoners Exercising (Prisoners' Round, after Gustave Dore), 1890, oil on canvas, Pushkin Museum of Fine Arts, Moscow.",
          "href": "https://commons.wikimedia.org/wiki/File:Vincent_Willem_van_Gogh_037.jpg",
          "image": {
            "src": "/covers/aung-san-suu-kyi-red-cross-visit--a4.png",
            "alt": "A ring of prisoners in muted uniforms trudging single file in a tight circle at the foot of towering blue-grey prison walls, one man's pale face turned toward the viewer.",
            "credit": "Vincent van Gogh, Prisoners Exercising (1890), Pushkin Museum of Fine Arts, Moscow. Public domain via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "Beethoven's prisoners, briefly in the light",
          "excerpt": "In the Prisoners' Chorus of Beethoven's only opera, Fidelio, captives are let up from their dungeon into the open air for a single stolen moment and sing tremulously of light and freedom before being driven back below. Composed in a Vienna shadowed by tyranny, it turns a brief, monitored glimpse of the outside world into one of music's great emblems of hope for the unjustly detained, the same fragile opening the released ICRC photograph represents for Aung San Suu Kyi.",
          "source": "Ludwig van Beethoven, Fidelio, Op. 72 (1805, rev. 1814); Prisoners' Chorus, 'O welche Lust'. Full scores at IMSLP. Portrait: Joseph Karl Stieler, 1820, Beethoven-Haus, Bonn.",
          "href": "https://imslp.org/wiki/Fidelio,_Op.72_(Beethoven,_Ludwig_van)",
          "image": {
            "src": "/covers/aung-san-suu-kyi-red-cross-visit--a5.png",
            "alt": "Oil portrait of Ludwig van Beethoven seated with a red scarf, holding pen and a manuscript, gazing intently upward and to the side.",
            "credit": "Joseph Karl Stieler, Beethoven with the Manuscript of the Missa Solemnis (1820), Beethoven-Haus, Bonn. Public domain via Wikimedia Commons."
          }
        }
      ]
    },
    {
      "slug": "deepseek-alibaba-low-cost-ai-models",
      "headline": "DeepSeek releases what a research firm calls the cheapest well-known AI model to run, hours after Alibaba unveils its largest model yet, escalating China's AI price war",
      "overview": "DeepSeek launched a new model that the research firm Artificial Analysis called by far the cheapest of any well-known model to operate, undercutting rivals on inference cost. The release came shortly after Alibaba unveiled its largest artificial-intelligence model to date. The dueling launches sharpen a race among Chinese developers to combine frontier performance with ultra-low prices.",
      "genre": "Technology",
      "sources": [
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMi1AFBVV95cUxOTnd6ckhOVUhwcGJjRmxRdlhObS1ncXRhZm9OeVUwaEgwOTg5YmNBTGVWcHZsdXd4dXVrWWdlZGtsYkw0eDIyY1A3NjdSM0o0bFBGUEZRNDF2NjYwZEtCamNpeTFqN3ZaQVlTclNuQWYxNXh4ZVlqaWF3WkNNVk1fbmJXcTdISlBmUVVWS01STmFYZldLSGk5akJQZVB5X09OSzVoVWF4Wko4TEF4cGozQUlWM202dFJWMGxSRTdpcTNaaUp6bmNyZXpWbVRFb2JoSzdCVQ?oc=5"
        },
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMi0wFBVV95cUxObUlCNHp6dVFoTEtqbkF3aFZqaVNUUVRJd0dicUhkb2tidzdkUWg0OVp1SU94aFJ1dmdkbDZIZGxMQVNWMm5vYXNKR0JicHNwZWRVX25ZY0hHaTNVUVdIWGdBNERsS3hDT29CdzlydEFGbFJzblgyempKcjljLVFELTVPRjdHVnRrOVRmQUs5QWVFQlg3aWVET1lNcDE4R2wwSC1vazRDaTNTZFhURm9qUGFfWGE5Sk1pMHNBUWx3TG85S1lZSWV4TUJxRU11UVhMR2Iw?oc=5"
        }
      ],
      "href": "#",
      "publishedAt": "2026-08-03",
      "image": {
        "src": "/covers/deepseek-alibaba-low-cost-ai-models.png",
        "alt": "A data-center server hall with rows of racks, illustrating AI model inference.",
        "credit": "Wikimedia Commons"
      },
      "rank": 30,
      "edition": "Morning Edition · 3 August 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Bacon names printing as a world-changing engine",
          "excerpt": "Again, we should notice the force, effect, and consequences of inventions, which are nowhere more conspicuous than in those three which were unknown to the ancients; namely, printing, gunpowder, and the compass. For these three have changed the appearance and state of the whole world: first in literature, then in warfare, and lastly in navigation; and innumerable changes have been thence derived, so that no empire, sect, or star, appears to have exercised a greater power and influence on human affairs than these mechanical discoveries.",
          "source": "Francis Bacon, Novum Organum (The New Organon), Book I, Aphorism 129, 1620, trans. from the Latin; Project Gutenberg edition (eBook #45988).",
          "href": "https://www.gutenberg.org/files/45988/45988-h/45988-h.htm"
        },
        {
          "category": "historical",
          "title": "Babbage: machinery, competition, and the collapse of price",
          "excerpt": "We have seen that the application of the division of labour tends to produce cheaper articles; that it thus increases the demand; and gradually, by the effect of competition, or by the hope of increased gain, that it causes large capitals to be embarked in extensive factories.",
          "source": "Charles Babbage, On the Economy of Machinery and Manufactures, 1832 (paragraph 269); Project Gutenberg edition (eBook #4238).",
          "href": "https://www.gutenberg.org/cache/epub/4238/pg4238.html"
        },
        {
          "category": "literary",
          "title": "Capek's cheapest possible worker",
          "excerpt": "DOMIN. No. The one that is the cheapest. The one whose requirements are the smallest. Young Rossum invented a worker with the minimum amount of requirements. He had to simplify him. He rejected everything that did not contribute directly to the progress of work. Everything that makes man more expensive. In fact he rejected man and made the Robot. My dear Miss Glory, the Robots are not people. Mechanically they are more perfect than we are; they have an enormously developed intelligence, but they have no soul.",
          "source": "Karel Capek, R.U.R. (Rossum's Universal Robots), 1920, English translation by Paul Selver and Nigel Playfair; Project Gutenberg edition (eBook #59112).",
          "href": "https://www.gutenberg.org/files/59112/59112-h/59112-h.htm"
        },
        {
          "category": "literary",
          "title": "The spark of being infused into an engineered mind",
          "excerpt": "It was on a dreary night of November that I beheld the accomplishment of my toils. With an anxiety that almost amounted to agony, I collected the instruments of life around me, that I might infuse a spark of being into the lifeless thing that lay at my feet. It was already one in the morning; the rain pattered dismally against the panes, and my candle was nearly burnt out, when, by the glimmer of the half-extinguished light, I saw the dull yellow eye of the creature open; it breathed hard, and a convulsive motion agitated its limbs.",
          "source": "Mary Wollstonecraft Shelley, Frankenstein; or, The Modern Prometheus, Chapter 5, 1818; Project Gutenberg edition (eBook #84).",
          "href": "https://www.gutenberg.org/cache/epub/84/pg84.txt"
        },
        {
          "category": "artistic",
          "title": "The Mechanical Turk: a machine that seems to think",
          "excerpt": "Racknitz's cutaway engraving exposes the hidden operator crouched inside Wolfgang von Kempelen's chess-playing 'Turk,' the eighteenth century's most famous automaton. For decades audiences across Europe believed a mere mechanism could out-reason a human being. The print is a fitting emblem for an age dazzled by the apparent intelligence of machines and by the question of how cheaply that intelligence can truly be produced.",
          "source": "Joseph Friedrich Freiherr zu Racknitz, engraving of Kempelen's chess automaton, from Ueber den Schachspieler des Herrn von Kempelen, 1789. Public domain via Wikimedia Commons.",
          "href": "https://commons.wikimedia.org/wiki/File:Racknitz_-_The_Turk_3.jpg",
          "image": {
            "src": "/covers/deepseek-alibaba-low-cost-ai-models--a4.png",
            "alt": "A hand-colored engraving showing the Turk automaton, a robed figure seated at a chess cabinet, with the cabinet's doors open to reveal the internal machinery and the space concealing a human operator.",
            "credit": "Joseph Friedrich zu Racknitz, engraving of Kempelen's chess-playing automaton (1789). Public domain via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "Knowledge made visible around a machine",
          "excerpt": "In Joseph Wright of Derby's candlelit scene, a lecturer demonstrates an orrery, a clockwork model of the solar system, to an enthralled group of ordinary onlookers. A single lamp stands in for the sun, throwing rapt faces into golden light. Painted at the dawn of the Industrial Revolution, it captures the moment when mechanized instruments began to place once-rarefied knowledge within everyone's reach.",
          "source": "Joseph Wright of Derby, A Philosopher Lecturing on the Orrery, oil on canvas, c. 1766, Derby Museum and Art Gallery. Public domain via Wikimedia Commons.",
          "href": "https://commons.wikimedia.org/wiki/File:Wright_of_Derby,_The_Orrery.jpg",
          "image": {
            "src": "/covers/deepseek-alibaba-low-cost-ai-models--a5.png",
            "alt": "A dramatic candlelit oil painting in which a lecturer and a circle of adults and children lean over a brass mechanical model of the planets, their faces illuminated by a hidden lamp at the model's center.",
            "credit": "Joseph Wright of Derby, A Philosopher Lecturing on the Orrery (c. 1766), Derby Museum and Art Gallery. Public domain via Wikimedia Commons."
          }
        }
      ]
    },
    {
      "slug": "liechtenstein-company-register-cyberattack",
      "headline": "A cyberattack on Liechtenstein's business register exposes information on about 31,000 companies and foundations, including the people behind them, officials say",
      "overview": "Hackers accessed Liechtenstein's central register of legal entities, obtaining data on roughly 31,000 companies and foundations along with details of the beneficial owners behind them, authorities said. The tiny Alpine principality is a well-known offshore financial center, making the breach potentially sensitive for wealthy account holders worldwide. Officials said they were investigating the scope of the intrusion.",
      "genre": "Technology",
      "sources": [
        {
          "name": "AP",
          "href": "https://news.google.com/rss/articles/CBMioAFBVV95cUxPVGxRSjQ4RVRJNVQ3QWY0aGFRemxqN19ISlRTSUdlV1pLWWJob29zcjBHQktNZ3ZpcFBROEpERnBqTHVILXNVbTd2SnFLMExoTktvYy1WLVVpU0VnSDlBd2s3ZjBEZGU2ampLUXd2VFBEcmhnWlEycjMzMjZFcExzbERSS0hEa3hwYkZQTi1sb2owYmh0RHl6UDNQalJIWWdr?oc=5"
        },
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMirAFBVV95cUxQcWdkeThJMDZ2MFc0N2tjZ1FQdHNlMjg2UXA5NnJjamh6aXAxMkEzUTZlUkxidGtXM29DdS1kVHJYamFoOUM5MVBydXZQbG1UZzJja09oTUoteTdoTGpuY1hLYWJpVXA3TWxDMXNhajZJdmtaZWliRkdhNTVtU2xLMWtMNjZRWWs2bVgxaDVJSTFpS3pzeTlRTmJwQ1M2SW4waUp3Rjg1dGk2OWxj?oc=5"
        }
      ],
      "href": "#",
      "publishedAt": "2026-08-03",
      "image": {
        "src": "/covers/liechtenstein-company-register-cyberattack.png",
        "alt": "Vaduz Castle above the capital of Liechtenstein, the Alpine financial principality.",
        "credit": "Wikimedia Commons"
      },
      "rank": 31,
      "edition": "Morning Edition · 3 August 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Clodius Burns the Roman Register",
          "excerpt": "eum qui aedem nympharum incendit ut memoriam publicam recensionis tabulis publicis impressam exstingueret",
          "source": "Cicero, Pro Milone 73 (Latin text, ed. A. C. Clark), Perseus Digital Library, Tufts University",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0011:text=Mil.:section=73"
        },
        {
          "category": "historical",
          "title": "Sunlight on the Money Trust",
          "excerpt": "Publicity is justly commended as a remedy for social and industrial diseases. Sunlight is said to be the best of disinfectants; electric light the most efficient policeman. And publicity has already played an important part in the struggle against the Money Trust.",
          "source": "Louis D. Brandeis, Other People's Money and How the Bankers Use It, ch. V, 'What Publicity Can Do' (1914), Project Gutenberg ebook #57819",
          "href": "https://www.gutenberg.org/files/57819/57819-h/57819-h.htm"
        },
        {
          "category": "literary",
          "title": "The Document That Confers Power",
          "excerpt": "“Yes,” replied the Prefect; “and the power thus attained has, for some months past, been wielded, for political purposes, to a very dangerous extent. The personage robbed is more thoroughly convinced, every day, of the necessity of reclaiming her letter.”",
          "source": "Edgar Allan Poe, 'The Purloined Letter' (1845), in The Works of Edgar Allan Poe, Vol. 2, Project Gutenberg ebook #2148",
          "href": "https://www.gutenberg.org/files/2148/2148-h/2148-h.htm"
        },
        {
          "category": "literary",
          "title": "Open, Sesame: The Vault Cracked Open",
          "excerpt": "The finest man among them, whom Ali Baba took to be their captain, went a little way among some bushes, and said: “Open, Sesame!” so plainly that Ali Baba heard him. A door opened in the rocks, and having made the troop go in, he followed them, and the door shut again of itself.",
          "source": "'The Forty Thieves,' in Andrew Lang (ed.), The Blue Fairy Book (1889), Project Gutenberg ebook #503",
          "href": "https://www.gutenberg.org/files/503/503-h/503-h.htm"
        },
        {
          "category": "artistic",
          "title": "Weighing the Hidden Wealth",
          "excerpt": "A moneychanger tips gold coins onto a balance while his wife, distracted from her prayer book, watches the glint of the metal; on the shelf and table sit the instruments of a private financial world kept in ledgers and coin. Like a register of a wealth center's clients, the painting turns intimate, hidden riches into something meticulously counted and recorded, a small convex mirror hinting that an unseen eye is always watching what should stay private.",
          "source": "Quentin Matsys, The Money Changer and His Wife (1514), oil on panel, Musée du Louvre, Paris",
          "href": "https://commons.wikimedia.org/wiki/File:Massysm_Quentin_%E2%80%94_The_Moneylender_and_his_Wife_%E2%80%94_1514.jpg",
          "image": {
            "src": "/covers/liechtenstein-company-register-cyberattack--a4.png",
            "alt": "A seated 16th-century moneychanger weighs gold coins on a small balance while his richly dressed wife beside him looks up from an illuminated prayer book toward the money.",
            "credit": "Quentin Matsys, The Money Changer and His Wife (1514), Musée du Louvre. Public domain via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "The Rich Man Alone with His Ledgers",
          "excerpt": "By the glow of a single candle an old man peers through spectacles at a coin, hemmed in by piles of papers, account books, sealed documents and money bags heaped in the dark. Rembrandt's rich fool hoards a fortune of records and coin in secret, a fitting image for a register in which the private holdings of thousands are locked away until a single breach floods the shadows with light.",
          "source": "Rembrandt van Rijn, The Parable of the Rich Fool (The Money Changer) (1627), oil on oak panel, Gemäldegalerie, Berlin",
          "href": "https://commons.wikimedia.org/wiki/File:Rembrandt_-_The_Parable_of_the_Rich_Fool.jpg",
          "image": {
            "src": "/covers/liechtenstein-company-register-cyberattack--a5.png",
            "alt": "In near-darkness an old bespectacled man holds a gold coin up to a candle flame, surrounded by stacks of ledgers, papers, sealed letters and money bags.",
            "credit": "Rembrandt van Rijn, The Parable of the Rich Fool (1627), Gemäldegalerie, Berlin. Public domain via Wikimedia Commons."
          }
        }
      ]
    },
    {
      "slug": "australia-first-h5n1-seabird-die-off",
      "headline": "Australia confirms its first mass die-off of seabirds from H5N1 bird flu, with about 50 greater crested terns found dead on the South Australian coast",
      "overview": "Testing confirmed H5N1 avian influenza in a colony of greater crested terns off Cape Jaffa, about 250 km south of Adelaide, where some 49 dead and 35 sick birds were spotted from the air, officials said. It is Australia's first confirmed mass-mortality event from the virus, which was first detected in the country in June. The agriculture minister warned Australians should expect further spread among wildlife.",
      "genre": "Science",
      "sources": [
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMiyAFBVV95cUxPM0lHZjUwb2ZfbnBDNTFjMFJWNEdIQnh1Snp0RFQ4bWFJam01S3VnckxsanA0TDRjZkhLdGNvQzV3Zk1DaTNyV1M4SWRkU2IwVjJUdXRQMTBZQUZxRGhyMnZVWGhpSlJ5aHB3SWw2b1k0TXZqVXhuZGVNV3YtVWlid1pYRGRjMnJGdzJFWGtRaEpaSW5OcXBHamc0WTY1QjFVSnk1Sk5mTWJTeDViUHBYeV9qXzVPdE9QNVU3c0piZmFFYkJTWmhTcA?oc=5"
        },
        {
          "name": "IBTimes",
          "href": "https://www.ibtimes.com.au/australia-first-mass-bird-flu-event-1873355"
        }
      ],
      "href": "#",
      "publishedAt": "2026-08-03",
      "image": {
        "src": "/covers/australia-first-h5n1-seabird-die-off.png",
        "alt": "A greater crested tern standing on a rocky shore.",
        "credit": "Wikimedia Commons"
      },
      "rank": 32,
      "edition": "Morning Edition · 3 August 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "The murrain of Egypt: a plague upon the beasts",
          "excerpt": "Behold, the hand of the LORD is upon thy cattle which is in the field, upon the horses, upon the asses, upon the camels, upon the oxen, and upon the sheep: there shall be a very grievous murrain. . . . And the LORD did that thing on the morrow, and all the cattle of Egypt died: but of the cattle of the children of Israel died not one.",
          "source": "The Holy Bible, King James Version (1769 Oxford edition), Exodus 9:3-6. Wikisource.",
          "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Exodus"
        },
        {
          "category": "historical",
          "title": "The last of the great auks, hunted from the seas",
          "excerpt": "In like manner the fact is incontestable that its breeding-stations in the western part of the Atlantic were for three centuries regularly visited and devastated with the combined objects of furnishing food or bait to the fishermen from very early days, and its final extinction . . . was owing to “the ruthless trade in its eggs and skin.” . . . yet on this rock (Eldey = fire-island) they were “specially hunted down” whenever opportunity offered, until the stock there was wholly extirpated in 1844.",
          "source": "“Gare-fowl” (the Great Auk, Alca impennis), Encyclopædia Britannica, 11th edition (1911). Wikisource.",
          "href": "https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Gare-fowl"
        },
        {
          "category": "literary",
          "title": "Lucretius: when the very birds fell sick and died",
          "excerpt": "And though corpse on corpse lay piled\nUnburied on ground, the race of birds and beasts\nWould or spring back, scurrying to escape\nThe virulent stench, or, if they'd tasted there,\nWould languish in approaching death. But yet\nHardly at all during those many suns\nAppeared a fowl, nor from the woods went forth\nThe sullen generations of wild beasts--\nThey languished with disease and died and died.",
          "source": "Lucretius, De Rerum Natura (On the Nature of Things), Book VI — the Plague of Athens, trans. William Ellery Leonard. Project Gutenberg.",
          "href": "https://www.gutenberg.org/ebooks/785"
        },
        {
          "category": "literary",
          "title": "The slain seabird and the crew struck dead",
          "excerpt": "“God save thee, ancient Mariner!\nFrom the fiends, that plague thee thus!--\nWhy look'st thou so?”--With my cross-bow\nI shot the ALBATROSS.\n\n. . .\n\nFour times fifty living men,\n(And I heard nor sigh nor groan)\nWith heavy thump, a lifeless lump,\nThey dropped down one by one.",
          "source": "Samuel Taylor Coleridge, “The Rime of the Ancient Mariner” (1798). Project Gutenberg.",
          "href": "https://www.gutenberg.org/ebooks/151"
        },
        {
          "category": "artistic",
          "title": "Audubon's crested tern on the shore",
          "excerpt": "Audubon's aquatint portrays a Cayenne Tern — a crested tern of the same genus (Thalasseus) as the greater crested terns now dying on South Australian beaches — alert and immaculate on the tideline, the living bird at the height of its spring plumage. Set against a grey sea and lowering sky, the image is a naturalist's celebration of a species in full vigour, which lends a quiet elegy to news of the same kind of bird washing up dead by the dozen.",
          "source": "Robert Havell after John James Audubon, Cayenne Tern (Sterna cayana), Plate 273 from The Birds of America (1835). National Gallery of Art, via Wikimedia Commons.",
          "href": "https://commons.wikimedia.org/wiki/File:Robert_Havell_after_John_James_Audubon,_Cayenne_Tern,_1835,_NGA_32414.jpg",
          "image": {
            "src": "/covers/australia-first-h5n1-seabird-die-off--a4.png",
            "alt": "A hand-colored aquatint of a crested (Cayenne) tern standing on a sandy shore, with a black cap, white face and underparts, pale grey back and long forked tail, and a bright red bill; a pink land crab crouches beside it beneath a grey sea and cloudy sky.",
            "credit": "Robert Havell after John James Audubon, Cayenne Tern, Plate 273 from The Birds of America (1835), National Gallery of Art. Public domain via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "A still life of dead birds",
          "excerpt": "Dupuis heaps the spoils of the hunt on a cold stone ledge: a great pheasant with its wing flung open, ducks and small songbirds tumbled limp and lifeless, their eyes shut, beside bright oranges and a cut lemon. It is a memento mori in feathers — the beauty of plumage turned to inert weight — that answers grimly to a beach strewn with dead terns.",
          "source": "Pierre Dupuis (1610–1682), Still Life with Dead Birds (1666), oil on canvas. Wikimedia Commons.",
          "href": "https://commons.wikimedia.org/wiki/File:%27Still_Life_with_Dead_Birds%27_by_Pierre_Dupuis,_1666.JPG",
          "image": {
            "src": "/covers/australia-first-h5n1-seabird-die-off--a5.png",
            "alt": "An oil still life of several dead game birds — a large pheasant with one wing splayed, ducks and small songbirds — heaped limp on a stone ledge beside oranges and a cut lemon, against a dark background.",
            "credit": "Pierre Dupuis, Still Life with Dead Birds (1666), private collection. Public domain via Wikimedia Commons."
          }
        }
      ]
    },
    {
      "slug": "iran-executes-two-alleged-israel-spies",
      "headline": "Iran executes two men convicted of passing coordinates of military sites to Israel's Mossad, as executions mount during the war with Israel and the US",
      "overview": "Iran hanged Omid Behzad and Pouria Safvat after convicting them of espionage and collaboration with Israel, its judiciary said, accusing them of transmitting the coordinates of sensitive military and security sites to Mossad. Executions on spying charges have accelerated since the war with Israel and the United States began in February. The judiciary did not say when the two were arrested or tried.",
      "genre": "Conflict",
      "sources": [
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMiowFBVV95cUxObVpPMnE4MnRQckNZZXg0SU9TYTI4WG5qdmc2aUhydFU0LXlJS04taFVoOU5idUFqb3ZtSFZsVUlpYUhackVhN2lGQUlYQ3hqekNxYkkxd1E1aDU2TGVZTEJQc3V5U1EwVzJLRDdiQmdITzZFYlI4TWZzOTBtT2c5bTREN2tvVVZWUk1hb1EwSlVmRHpSaVJvTDdINzFCaTFHRFI0?oc=5"
        },
        {
          "name": "The Times of Israel",
          "href": "https://www.timesofisrael.com/liveblog_entry/iran-executes-two-accused-of-spying-for-israel-during-fighting/"
        }
      ],
      "href": "#",
      "publishedAt": "2026-08-03",
      "image": {
        "src": "/covers/iran-executes-two-alleged-israel-spies.png",
        "alt": "The building of Iran's judiciary in Tehran.",
        "credit": "Wikimedia Commons"
      },
      "rank": 33,
      "edition": "Morning Edition · 3 August 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "The Catilinarian conspirators, betrayed by intercepted letters, strangled in the Tullianum",
          "excerpt": "There is a place in the prison, which is called the Tullian dungeon, and which, after a slight ascent to the left, is sunk about twelve feet under ground. Walls secure it on every side, and over it is a vaulted roof connected with stone arches; but its appearance is disgusting and horrible, by reason of the filth, darkness, and stench. When Lentulus had been let down into this place, certain men, to whom orders had been given, strangled him with a cord. ... On Cethegus, Statilius, Gabinius, and Cæparius, punishment was inflicted in a similar manner.",
          "source": "Sallust, The Conspiracy of Catiline, chapter 55, trans. John Selby Watson (1899). Perseus Digital Library, Tufts University. (The conspirators were undone when their letters to the Allobrogian envoys of a foreign power were intercepted at the Mulvian Bridge.)",
          "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.02.0124%3Achapter%3D55"
        },
        {
          "category": "historical",
          "title": "The Rosenbergs, executed for passing atomic secrets to a foreign power",
          "excerpt": "Julius and Ethel Rosenberg were convicted of conspiracy to commit espionage for allegedly transmitting United States atomic-weapon secrets to the Soviet Union, and were sent to the electric chair at Sing Sing prison on June 19, 1953, despite worldwide clemency appeals. As in Iran's spy trials, the charge was that ordinary citizens had handed a hostile power the most sensitive coordinates of national security, here the workings of the atomic bomb. The National Archives holds the trial evidence and the once-secret grand jury transcripts that document the case.",
          "source": "The Rosenberg Grand Jury Records and trial evidence, Ethel and Julius Rosenberg espionage case (1951–1953). U.S. National Archives (Records held at the National Archives at New York).",
          "href": "https://www.archives.gov/research/court-records/rosenberg-jury"
        },
        {
          "category": "literary",
          "title": "Thirty pieces of silver: the betrayer's wages and end",
          "excerpt": "Then one of the twelve, called Judas Iscariot, went unto the chief priests, And said unto them, What will ye give me, and I will deliver him unto you? And they covenanted with him for thirty pieces of silver. And from that time he sought opportunity to betray him. ... Then Judas, which had betrayed him, when he saw that he was condemned, repented himself, and brought again the thirty pieces of silver to the chief priests and elders, Saying, I have sinned in that I have betrayed the innocent blood. And they said, What is that to us? see thou to that. And he cast down the pieces of silver in the temple, and departed, and went and hanged himself.",
          "source": "The Gospel According to Saint Matthew 26:14–16, 27:3–5, King James Version (1611). Wikisource.",
          "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Matthew"
        },
        {
          "category": "literary",
          "title": "\"Yet each man kills the thing he loves\": the condemned awaiting the rope",
          "excerpt": "The man had killed the thing he loved\nAnd so he had to die.\n\nYet each man kills the thing he loves\nBy each let this be heard,\nSome do it with a bitter look,\nSome with a flattering word,\nThe coward does it with a kiss,\nThe brave man with a sword!\n\nSome kill their love when they are young,\nAnd some when they are old;\nSome strangle with the hands of Lust,\nSome with the hands of Gold:\nThe kindest use a knife, because\nThe dead so soon grow cold.\n\nSome love too little, some too long,\nSome sell, and others buy;\nSome do the deed with many tears,\nAnd some without a sigh:\nFor each man kills the thing he loves,\nYet each man does not die.",
          "source": "Oscar Wilde, The Ballad of Reading Gaol (1898). Project Gutenberg, ebook #301.",
          "href": "https://www.gutenberg.org/files/301/301-h/301-h.htm"
        },
        {
          "category": "artistic",
          "title": "Delaroche, The Execution of Lady Jane Grey",
          "excerpt": "Delaroche's vast 1833 canvas freezes the instant before the axe falls: the blindfolded seventeen-year-old queen, condemned for treason after only nine days on the throne, gropes for the block in luminous white satin while an attendant guides her hands and the executioner waits with his axe. By turning a state execution into an intimate, almost unbearable human moment, the painting makes the political victim into a trembling body, much as accounts of prisoners led to the gallows compress a whole apparatus of power into one condemned figure.",
          "source": "Paul Delaroche, The Execution of Lady Jane Grey (1833), National Gallery, London. Public domain via Wikimedia Commons.",
          "href": "https://commons.wikimedia.org/wiki/File:PAUL_DELAROCHE_-_Ejecuci%C3%B3n_de_Lady_Jane_Grey_(National_Gallery_de_Londres,_1834).jpg",
          "image": {
            "src": "/covers/iran-executes-two-alleged-israel-spies--a4.png",
            "alt": "A blindfolded young woman in a white gown kneels and reaches for a wooden execution block as a man gently steadies her hands and an axeman stands by in a dim stone chamber.",
            "credit": "Paul Delaroche, The Execution of Lady Jane Grey (1833), National Gallery, London. Public domain via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "Callot, The Hanging, from Les Grandes Misères de la guerre",
          "excerpt": "In this 1633 etching, the eleventh plate of Jacques Callot's series on the horrors of the Thirty Years' War, a great tree becomes a mass gallows: dozens of condemned men dangle from its branches while soldiers, a priest, and dice-throwing onlookers cluster below. The tiny, teeming figures make wartime execution look industrial and routine, punishment meted out by armies far from any courtroom, an image that resonates with a surge of hangings carried out amid a nation at war.",
          "source": "Jacques Callot, \"La pendaison\" (The Hanging), plate 11 of Les Misères et les malheurs de la guerre (1633). Public domain via Wikimedia Commons.",
          "href": "https://commons.wikimedia.org/wiki/File:Les_mis%C3%A8res_et_les_malheurs_de_la_guerre_-_11_-_La_pendaison.png",
          "image": {
            "src": "/covers/iran-executes-two-alleged-israel-spies--a5.png",
            "alt": "A crowded 17th-century etching of a large tree hung with many bodies, soldiers with pikes and muskets gathered below, a ladder against the trunk and a priest attending a man about to be hanged.",
            "credit": "Jacques Callot, La pendaison (The Hanging), plate 11 of Les Grandes Misères de la guerre (1633). Public domain via Wikimedia Commons."
          }
        }
      ]
    },
    {
      "slug": "shell-sells-onshore-renewables-totalenergies",
      "headline": "Shell agrees to sell its European onshore wind, solar and battery business, a roughly four-gigawatt portfolio, to France's TotalEnergies as it retreats from renewables",
      "overview": "Shell agreed to sell its European onshore renewables arm, with about four gigawatts of wind, solar and battery projects in operation and development across the UK, Italy, the Netherlands and Spain, to TotalEnergies. The deal, expected to close by year end pending regulatory approval, deepens Shell's pullback from low-carbon energy under chief executive Wael Sawan. TotalEnergies is expanding its renewables footprint even as European majors diverge on green strategy.",
      "genre": "Climate",
      "sources": [
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMivAFBVV95cUxQdHBuR2ZmM29uWDZCSnBpbXl0RjlCVUgxRFkwV2VRZUhVQS01N1ZRUW1hdVlOdW9VTWZsQ0ZuTjItYUhmT3E0TFVBbFk4MElUOWg0TUxlOHBLNjAxRlRzMVFXZWl5bDJVLUdaX0ZMVTdEUEZaUTk5TF91MUcxNHFQZW8xQ1NhdllMSHZodkV2U2ZrOHcwQXJ6dGFWT3VZMGxwblM5M3FXb212NVdRRDJVM0VmTElYakwtOG82MQ?oc=5"
        },
        {
          "name": "AOL",
          "href": "https://www.aol.co.uk/articles/shell-sell-european-onshore-renewables-083158000.html"
        }
      ],
      "href": "#",
      "publishedAt": "2026-08-03",
      "image": {
        "src": "/covers/shell-sells-onshore-renewables-totalenergies.png",
        "alt": "Onshore wind turbines and solar panels in a European countryside.",
        "credit": "Wikimedia Commons"
      },
      "rank": 34,
      "edition": "Morning Edition · 3 August 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "The Low Countries Call the Air to Their Aid",
          "excerpt": "To drain the lakes they called the air to their aid. The lakes and marshes were surrounded with dykes, the dykes with canals and an army of windmills; these, putting the suction-pumps in motion, poured the waters into the canals, which conducted them into the rivers and to the sea. Thus vast areas of ground which were buried under water saw the light, and were transformed, as if by enchantment, into fertile plains covered with villages and traversed by roads and canals.",
          "source": "Edmondo De Amicis, Holland (Vol. 1 of 2), trans. Caroline Tilton (1880); Project Gutenberg eBook #27799.",
          "href": "https://www.gutenberg.org/files/27799/27799-h/27799-h.htm"
        },
        {
          "category": "historical",
          "title": "Churchill Bets the Fleet on Oil",
          "excerpt": "On no one quality, on no one process, on no one country, on no one company, and no one route, and on no one oil field must we be dependent. Safety and certainty in oil lie in variety, and in variety alone.",
          "source": "Winston Churchill, First Lord of the Admiralty, speech on the Navy Estimates, House of Commons, 17 July 1913 (HC Deb 17 July 1913, vol 55, cc1465-584); UK Parliament Historic Hansard.",
          "href": "https://api.parliament.uk/historic-hansard/commons/1913/jul/17/shipbuilding-repairs-maintenance-etc"
        },
        {
          "category": "literary",
          "title": "Tilting at Windmills",
          "excerpt": "At this point they came in sight of thirty or forty windmills that there are on that plain, and as soon as Don Quixote saw them he said to his squire, “Fortune is arranging matters for us better than we could have shaped our desires ourselves, for look there, friend Sancho Panza, where thirty or more monstrous giants present themselves, all of whom I mean to engage in battle and slay…” “What giants?” said Sancho Panza. … “Look, your worship,” said Sancho; “what we see there are not giants but windmills, and what seem to be their arms are the sails that turned by the wind make the millstone go.”",
          "source": "Miguel de Cervantes, Don Quixote, Part I, Chapter VIII, trans. John Ormsby (1885); Project Gutenberg eBook #996.",
          "href": "https://www.gutenberg.org/files/996/996-h/996-h.htm"
        },
        {
          "category": "literary",
          "title": "Ode to the West Wind",
          "excerpt": "Drive my dead thoughts over the universe\nLike withered leaves to quicken a new birth!\nAnd, by the incantation of this verse,\nScatter, as from an unextinguished hearth\nAshes and sparks, my words among mankind!\nBe through my lips to unawakened earth\nThe trumpet of a prophecy! O, Wind,\nIf Winter comes, can Spring be far behind?",
          "source": "Percy Bysshe Shelley, “Ode to the West Wind” (1820), in The Complete Poetical Works of Percy Bysshe Shelley, ed. Thomas Hutchinson (1914); Wikisource.",
          "href": "https://en.wikisource.org/wiki/The_Complete_Poetical_Works_of_Percy_Bysshe_Shelley_(ed._Hutchinson,_1914)/Ode_to_the_West_Wind"
        },
        {
          "category": "artistic",
          "title": "The Windmill at Wijk bij Duurstede",
          "excerpt": "Ruisdael sets a single great tower windmill against a vast, storm-heavy Dutch sky, its sails motionless yet its bulk towering over the church and castle it dwarfs. Painted at the height of the Dutch Golden Age, the picture makes the wind machine a monument of national ingenuity and civic pride, a whole country's economy built on harnessing the moving air. It stands as the emblem of an era that embraced wind as the engine of its prosperity, the mirror image of a modern retreat from it.",
          "source": "Jacob van Ruisdael, The Windmill at Wijk bij Duurstede, c. 1668–1670, oil on canvas, Rijksmuseum, Amsterdam (SK-C-211).",
          "href": "https://commons.wikimedia.org/wiki/File:The_Windmill_at_Wijk_bij_Duurstede_1670_Ruisdael.jpg",
          "image": {
            "src": "/covers/shell-sells-onshore-renewables-totalenergies--a4.png",
            "alt": "A massive stone tower windmill on a riverbank dominates a wide, cloud-filled sky, its dark sails still, with a church, houses, and small figures on the bank beside the grey water of the River Lek below.",
            "credit": "Jacob van Ruisdael, The Windmill at Wijk bij Duurstede (c. 1668–1670), Rijksmuseum, Amsterdam. Public domain via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "Impression, Sunrise",
          "excerpt": "Monet's hazy dawn over the harbor of Le Havre reduces the sun to a single burning orange disc, its light rippling across grey-blue water among ghostly ships and cranes. The 1872 canvas gave Impressionism its name and turned the rising sun into a symbol of a new dawn in art. That the French master's most famous sunrise now doubles as an emblem of solar energy is fitting, as France's TotalEnergies is the buyer betting on the light Shell is walking away from.",
          "source": "Claude Monet, Impression, Sunrise (Impression, soleil levant), 1872, oil on canvas, Musée Marmottan Monet, Paris.",
          "href": "https://commons.wikimedia.org/wiki/File:Monet_-_Impression,_Sunrise.jpg",
          "image": {
            "src": "/covers/shell-sells-onshore-renewables-totalenergies--a5.png",
            "alt": "A hazy blue-grey harbor at dawn with a small orange sun low on the horizon casting a rippling orange reflection on the water, dark rowboats in the foreground and faint masts and cranes behind.",
            "credit": "Claude Monet, Impression, Sunrise (1872), Musée Marmottan Monet, Paris. Public domain via Wikimedia Commons."
          }
        }
      ]
    },
    {
      "slug": "astrazeneca-shares-fall-bristol-myers-talks",
      "headline": "AstraZeneca shares fall about 7%, the biggest drop on the FTSE 100, after reports it held early talks with Bristol Myers Squibb on a possible merger worth around $400 billion",
      "overview": "AstraZeneca's London-listed shares slid roughly 7%, the steepest fall on the FTSE 100, after the Financial Times reported the drugmaker had held preliminary talks with US rival Bristol Myers Squibb about a tie-up. A person familiar with the matter told Reuters the two had held discussions; neither company confirmed the report. A combination would rank among the largest pharmaceutical mergers ever, at a valuation near $400 billion, but investors questioned the strategic rationale.",
      "genre": "Economy",
      "sources": [
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMizwFBVV95cUxPMzhDZ2Y1UkxQTnZCTjg1NHdXUGZBb2Q3d3ppcnZEbWFEY1JJRWZLU0RHd1N3eDRDOVRIUXMycjdyWDNzR2pDY1ZPYXg0cFlUUWNZRWJadkt1Sld3VzZCVjN6YW1zaE1aTUt0U2x6S3p2bTRQd3dMMXc0cDhUcjJERlhyRF80YTF5My1qRmVGSU5kM3Z6bTdUcTJlS2R4TjkwM3RvdXk4eXdkYVhILWdqTS1GZlZtZ0dTZHZUMVZ5Mkk4QnI1U0lyQm1acVBfaHc?oc=5"
        },
        {
          "name": "CNBC",
          "href": "https://www.cnbc.com/2026/08/03/astrazeneca-bristol-myers-squibb-merger-talks.html"
        }
      ],
      "href": "#",
      "publishedAt": "2026-08-03",
      "image": {
        "src": "/covers/astrazeneca-shares-fall-bristol-myers-talks.png",
        "alt": "The AstraZeneca headquarters, the Discovery Centre, in Cambridge, England.",
        "credit": "Wikimedia Commons"
      },
      "rank": 35,
      "edition": "Morning Edition · 3 August 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Rome's credit crash of A.D. 33",
          "excerpt": "Hence followed a scarcity of money, a great shock being given to all credit, the current coin too, in consequence of the conviction of so many persons and the sale of their property, being locked up in the imperial treasury or the public exchequer. To meet this, the Senate had directed that every creditor should have two-thirds of his capital secured on estates in Italy. Creditors however were suing for payment in full, and it was not respectable for persons when sued to break faith. So, at first, there were clamorous meetings and importunate entreaties; then noisy applications to the prætor's court. And the very device intended as a remedy, the sale and purchase of estates, proved the contrary, as the usurers had hoarded up all their money for buying land. The facilities for selling were followed by a fall of prices, and the deeper a man was in debt, the more reluctantly did he part with his property, and many were utterly ruined.",
          "source": "Tacitus, The Annals, Book VI, ch. 17, trans. Alfred John Church & William Jackson Brodribb; Perseus Digital Library, Tufts University.",
          "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0078:book%3D6:chapter%3D17"
        },
        {
          "category": "historical",
          "title": "The South Sea Bubble of 1720",
          "excerpt": "In the mean time, innumerable joint-stock companies started up every where. They soon received the name of Bubbles, the most appropriate that imagination could devise. The populace are often most happy in the nicknames they employ. None could be more apt than that of Bubbles. Some of them lasted for a week or a fortnight, and were no more heard of, while others could not even live out that short span of existence. … There were nearly a hundred different projects, each more extravagant and deceptive than the other, To use the words of the Political State, they were “set on foot and promoted by crafty knaves, then pursued by multitudes of covetous fools, and at last appeared to be, in effect, what their vulgar appellation denoted them to be—bubbles and mere cheats.”",
          "source": "Charles Mackay, Memoirs of Extraordinary Popular Delusions and the Madness of Crowds (1841), vol. I, \"The South-Sea Bubble\"; Project Gutenberg.",
          "href": "https://www.gutenberg.org/files/24518/24518-h/24518-h.htm"
        },
        {
          "category": "literary",
          "title": "\"If we can float the shares, the money'll come in\"",
          "excerpt": "\"Where's the money to come from?\"\n\"Money to come from, sir? Where do you suppose the money comes from in all these undertakings? If we can float the shares, the money'll come in quick enough. We hold three million dollars of the stock ourselves.\"\n\"Six hundred thousand pounds!\" said Montague.\n\"We take them at par, of course,—and as we sell we shall pay for them. But of course we shall only sell at a premium. If we can run them up even to 110, there would be three hundred thousand dollars.\"",
          "source": "Anthony Trollope, The Way We Live Now (1875), ch. IX, \"The Great Railway to Vera Cruz\"; Project Gutenberg.",
          "href": "https://www.gutenberg.org/files/5231/5231-h/5231-h.htm"
        },
        {
          "category": "literary",
          "title": "The flood-tide roar of speculation",
          "excerpt": "The steps and peristyle of the Bourse were quite black with swarming frock-coats; and from among the coulissiers, already installed under the clock and hard at work, there arose the clamour of bull and bear, the flood-tide roar of speculation dominating all the rumbling hubbub of the city. Passers-by turned their heads, curious and fearful as to what might be going on there—all those mysterious financial operations which few French brains can penetrate, all that sudden ruin and fortune brought about—how, none could understand—amid gesticulation and savage cries.",
          "source": "Émile Zola, Money (L'Argent) (1891), trans. Ernest A. Vizetelly; Project Gutenberg.",
          "href": "https://www.gutenberg.org/files/56987/56987-h/56987-h.htm"
        },
        {
          "category": "artistic",
          "title": "Hogarth's \"The South Sea Scheme\"",
          "excerpt": "Hogarth's earliest satirical print skewers the mania around the South Sea Company: at its centre a giant merry-go-round spins investors of every rank while a demon hacks the body of Fortune into pieces and tosses them to the crowd. Devils, whores and a broken figure of Honesty on the wheel turn a stock craze into a moral carnival—an image of speculation running far ahead of any underlying worth, much like a $400bn deal investors struggle to justify.",
          "source": "William Hogarth, Emblematical Print on the South Sea Scheme (\"The South Sea Scheme\"), engraving, 1721. Public domain via Wikimedia Commons.",
          "href": "https://commons.wikimedia.org/wiki/File:William_Hogarth_-_The_South_Sea_Scheme.png",
          "image": {
            "src": "/covers/astrazeneca-shares-fall-bristol-myers-talks--a4.png",
            "alt": "A crowded 18th-century square where a large merry-go-round of speculators spins, a demon carves up a female figure of Fortune, and a man is broken on a wheel labelled Honesty.",
            "credit": "William Hogarth, Emblematical Print on the South Sea Scheme (1721). Public domain via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "Brueghel's \"Satire on Tulip Mania\"",
          "excerpt": "Jan Brueghel the Younger paints the Dutch tulip frenzy as a troop of monkeys in merchants' dress: they weigh bulbs, count coins, toast their paper profits, and haul contracts about, while one relieves himself on the discarded flowers and another is carried off to the grave once the market collapses. The apes' solemn dealing over a worthless commodity mocks investors who chase a grand valuation until the rationale evaporates.",
          "source": "Jan Brueghel the Younger, Satire on Tulip Mania, oil on panel, c. 1640, Frans Hals Museum, Haarlem. Public domain via Wikimedia Commons.",
          "href": "https://commons.wikimedia.org/wiki/File:Jan_Brueghel_the_Younger,_Satire_on_Tulip_Mania,_c._1640.jpg",
          "image": {
            "src": "/covers/astrazeneca-shares-fall-bristol-myers-talks--a5.png",
            "alt": "Monkeys dressed as wealthy Dutch merchants trade tulip bulbs, weigh coins, and feast, while one urinates on flowers and another mourns at a graveside as the market crashes.",
            "credit": "Jan Brueghel the Younger, Satire on Tulip Mania (c. 1640), Frans Hals Museum. Public domain via Wikimedia Commons."
          }
        }
      ]
    },
    {
      "slug": "massive-attack-singapore-ban-palestine",
      "headline": "British band Massive Attack say Singapore has barred them from returning after they displayed a Palestinian flag and led 'free Palestine' chants at a 29 July concert",
      "overview": "The Bristol trip-hop duo Massive Attack said Singaporean authorities have banned them from re-entering the country after they held up a Palestinian flag and led chants of 'free Palestine' during a 29 July show. The band said members were detained, questioned separately and had passports temporarily confiscated, and issued official warnings under laws on foreign emblems and public order. Massive Attack said they were 'surprised and disappointed' by the treatment.",
      "genre": "Culture",
      "sources": [
        {
          "name": "BBC",
          "href": "https://www.bbc.co.uk/news/articles/cr59qe86yj4o"
        },
        {
          "name": "Malay Mail",
          "href": "https://www.malaymail.com/news/showbiz/2026/08/03/as-we-were-saying-free-palestine-massive-attack-hits-out-after-singapore-concert-probe/230028"
        }
      ],
      "href": "#",
      "publishedAt": "2026-08-03",
      "image": {
        "src": "/covers/massive-attack-singapore-ban-palestine.png",
        "alt": "A concert stage lit in blue with a crowd silhouetted in front, illustrating a live music performance.",
        "credit": "Wikimedia Commons"
      },
      "rank": 36,
      "edition": "Morning Edition · 3 August 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Athens fines the poet who staged their grief",
          "excerpt": "The Athenians, on the other hand, showed themselves beyond measure afflicted at the fall of Miletus, in many ways expressing their sympathy, and especially by their treatment of Phrynichus. For when this poet brought out upon the stage his drama of the Capture of Miletus, the whole theatre burst into tears; and the people sentenced him to pay a fine of a thousand drachms, for recalling to them their own misfortunes. They likewise made a law that no one should ever again exhibit that piece.",
          "source": "Herodotus, The History of Herodotus, Book VI, ch. 21, trans. George Rawlinson (1858–60), Wikisource.",
          "href": "https://en.wikisource.org/wiki/The_History_of_Herodotus_(Rawlinson)/Book_6"
        },
        {
          "category": "historical",
          "title": "Paul Robeson, silenced by a seized passport",
          "excerpt": "In 1950 the U.S. State Department revoked the passport of the celebrated bass-baritone and actor Paul Robeson, freezing his international career because of his outspoken support for anti-colonial and civil-rights causes; officials offered to return it only if he pledged to make no political speeches abroad. For eight years he was effectively confined within the country, his concerts cancelled and bookings withdrawn, until the Supreme Court restored his right to travel in 1958. Like Massive Attack barred from a stage for their politics, Robeson was punished not for his art but for the dissent he voiced through it.",
          "source": "\"The Case of Paul Robeson's Passport,\" Provisional Committee to Restore Paul Robeson's Passport, ca. 1951, Paul Robeson Collection, Schomburg Center for Research in Black Culture, The New York Public Library.",
          "href": "https://www.nypl.org/events/exhibitions/galleries/selected-transcripts/item/17588"
        },
        {
          "category": "literary",
          "title": "Antigone defies the ruler's decree",
          "excerpt": "Yes; for it was not Zeus that had published me that edict; not such are the laws set among men by the Justice who dwells with the gods below; nor deemed I that thy decrees were of such force, that a mortal could override the unwritten and unfailing statutes of heaven. For their life is not of to-day or yesterday, but from all time, and no man knows when they were first put forth.\n\nNot through dread of any human pride could I answer to the gods for breaking these. Die I must,—I knew that well (how should I not?)—even without thy edicts.",
          "source": "Sophocles, Antigone, in The Tragedies of Sophocles, trans. Richard C. Jebb (1917), Wikisource.",
          "href": "https://en.wikisource.org/wiki/Tragedies_of_Sophocles_(Jebb_1917)/Antigone"
        },
        {
          "category": "literary",
          "title": "Shelley's answer to a massacre: 'Ye are many'",
          "excerpt": "'Rise like Lions after slumber\nIn unvanquishable number—\nShake your chains to earth like dew\nWhich in sleep had fallen on you—\nYe are many—they are few.'",
          "source": "Percy Bysshe Shelley, \"The Mask of Anarchy\" (written 1819, publ. 1832), in The Complete Poetical Works of Percy Bysshe Shelley, ed. Thomas Hutchinson (1914), Wikisource.",
          "href": "https://en.wikisource.org/wiki/The_Complete_Poetical_Works_of_Percy_Bysshe_Shelley_(ed._Hutchinson,_1914)/The_Mask_of_Anarchy"
        },
        {
          "category": "artistic",
          "title": "Daumier's massacre print, seized and destroyed",
          "excerpt": "Daumier's lithograph depicts the aftermath of a state atrocity: in April 1834 French troops hunting a sniper slaughtered the unarmed residents of a Paris apartment house, and the artist rendered a workman sprawled dead across the crushed body of his own child. Though the censors had first passed it, King Louis-Philippe ordered the printing stone and every unsold impression seized and destroyed. The image endures as an artist's indictment of power, answered by the state's attempt to erase the work itself.",
          "source": "Honoré Daumier, Rue Transnonain, le 15 Avril 1834 (1834), lithograph, plate 24 of L'Association mensuelle. Public domain via Wikimedia Commons.",
          "href": "https://commons.wikimedia.org/wiki/File:Honor%C3%A9_Daumier_-_Rue_Transnonain,_April_15,_1834_-_WGA5966.jpg",
          "image": {
            "src": "/covers/massive-attack-singapore-ban-palestine--a4.png",
            "alt": "A dim bedroom where a slain workingman in his nightshirt lies sprawled on his back across the crushed body of a child, amid overturned furniture and shadow.",
            "credit": "Honoré Daumier, Rue Transnonain, le 15 Avril 1834 (1834), lithograph. Public domain via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "Verdi's chorus of exiles longing for a lost homeland",
          "excerpt": "Va, pensiero, sull'ali dorate;\nva, ti posa sui clivi, sui colli,\nove olezzano tepide e molli\nl'aure dolci del suolo natal!\n\nDel Giordano le rive saluta,\ndi Sionne le torri atterrate.\nO, mia patria, sì bella e perduta!\nO, membranza, sì cara e fatal!",
          "source": "Giuseppe Verdi (music) and Temistocle Solera (libretto), \"Va, pensiero\" (Chorus of the Hebrew Slaves), from Nabucco (1842); full score at IMSLP. Portrait photograph by Giacomo Brogi.",
          "href": "https://imslp.org/wiki/Nabucco_(Verdi,_Giuseppe)",
          "image": {
            "src": "/covers/massive-attack-singapore-ban-palestine--a5.png",
            "alt": "Sepia photographic portrait of an elderly bearded Giuseppe Verdi in a dark coat and top hat, seen in three-quarter view against a plain background.",
            "credit": "Giacomo Brogi, photographic portrait of Giuseppe Verdi (before 1881). Public domain via Wikimedia Commons."
          }
        }
      ]
    },
    {
      "slug": "nepal-mourns-nirmal-purja",
      "headline": "Nepal mourns record-setting mountaineer Nirmal Purja, who died at 43 in an avalanche on Pakistan's Broad Peak, with tributes gathering at his former school",
      "overview": "Tributes poured in across Nepal for Nirmal 'Nims' Purja, the celebrated mountaineer who was killed at 43 in an avalanche on Pakistan's 8,047-metre Broad Peak along with several fellow climbers. The former British Army Gurkha won global fame for climbing all 14 of the world's 8,000-metre peaks in just over six months in 2019 and for the Netflix film '14 Peaks: Nothing Is Impossible.' Mourners gathered at his old school, where staff and pupils remembered a national hero.",
      "genre": "Culture",
      "sources": [
        {
          "name": "BBC",
          "href": "https://www.bbc.co.uk/news/articles/c07rvy4e7mno"
        },
        {
          "name": "Dawn",
          "href": "https://www.dawn.com/news/2020165"
        }
      ],
      "href": "#",
      "publishedAt": "2026-08-03",
      "image": {
        "src": "/covers/nepal-mourns-nirmal-purja.png",
        "alt": "The snow-covered summit of Broad Peak in Pakistan's Karakoram range.",
        "credit": "Wikimedia Commons"
      },
      "rank": 37,
      "edition": "Morning Edition · 3 August 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Petrarch climbs Mont Ventoux, 1336",
          "excerpt": "To-day I made the ascent of the highest mountain in this region, which is not improperly called Ventosum. My only motive was the wish to see what so great an elevation had to offer. [...] At first, owing to the unaccustomed quality of the air and the effect of the great sweep of view spread out before me, I stood like one dazed. I beheld the clouds under our feet, and what I had read of Athos and Olympus seemed less incredible as I myself witnessed the same things from a mountain of less fame.",
          "source": "Petrarch, letter to Dionisio da Borgo San Sepolcro, \"The Ascent of Mount Ventoux\" (1336), trans. James Harvey Robinson, in Petrarch, the First Modern Scholar and Man of Letters (New York: G. P. Putnam, 1898). Project Gutenberg ebook 48776.",
          "href": "https://www.gutenberg.org/files/48776/48776-h/48776-h.htm"
        },
        {
          "category": "historical",
          "title": "Whymper's Matterhorn: triumph and the fatal descent, 1865",
          "excerpt": "There have been joys too great to be described in words, and there have been griefs upon which I have not dared to dwell; and with these in mind I say, Climb if you will, but remember that courage and strength are nought without prudence, and that a momentary negligence may destroy the happiness of a lifetime. Do nothing in haste; look well to each step; and from the beginning think what may be the end.",
          "source": "Edward Whymper, The Ascent of the Matterhorn (London: John Murray, 1880), closing reflection on the 1865 first ascent, during which four of his companions fell to their deaths. Project Gutenberg ebook 38044.",
          "href": "https://www.gutenberg.org/files/38044/38044-h/38044-h.htm"
        },
        {
          "category": "literary",
          "title": "Shelley, \"Mont Blanc\"",
          "excerpt": "The everlasting universe of things\nFlows through the mind, and rolls its rapid waves,\nNow dark—now glittering—now reflecting gloom—\nNow lending splendour, where from secret springs\nThe source of human thought its tribute brings\nOf waters,—\n[...]\nThe secret Strength of things\nWhich governs thought, and to the infinite dome\nOf Heaven is as a law, inhabits thee!\nAnd what were thou, and earth, and stars, and sea,\nIf to the human mind's imaginings\nSilence and solitude were vacancy?",
          "source": "Percy Bysshe Shelley, \"Mont Blanc: Lines Written in the Vale of Chamouni\" (composed 1816), in The Complete Poetical Works of Percy Bysshe Shelley, ed. Thomas Hutchinson (Oxford, 1914). Wikisource.",
          "href": "https://en.wikisource.org/wiki/The_Complete_Poetical_Works_of_Percy_Bysshe_Shelley_(ed._Hutchinson,_1914)/Mont_Blanc"
        },
        {
          "category": "literary",
          "title": "Coleridge, \"Hymn before Sun-rise, in the Vale of Chamouny\"",
          "excerpt": "Hast thou a charm to stay the Morning-Star\nIn his steep course? So long he seems to pause\nOn thy bald awful head, O sovran Blanc!\nThe Arve and Arveiron at thy base\nRave ceaselessly; but thou, most awful Form!\nRisest from forth thy silent Sea of Pines,\nHow silently! Around thee and above\nDeep is the air and dark, substantial, black.\nAn ebon mass: methinks thou piercest it,\nAs with a wedge! But when I look again,\nIt is thine own calm home, thy crystal shrine,\nThy habitation from eternity!",
          "source": "Samuel Taylor Coleridge, \"Hymn, before Sun-rise, in the Vale of Chamouny\" (1802), in Sibylline Leaves (London, 1817). Wikisource.",
          "href": "https://en.wikisource.org/wiki/Sibylline_Leaves_(Coleridge)/Hymn,_before_Sun-rise,_in_the_Vale_of_Chamouny"
        },
        {
          "category": "artistic",
          "title": "Friedrich, \"Wanderer above the Sea of Fog\"",
          "excerpt": "Caspar David Friedrich's lone figure stands on a rocky summit, back turned to us, gazing over a churning sea of mist from which distant peaks emerge—the very image of the human will set against the mountain sublime. It captures both the solitary heroism of the high climber and his smallness before immensity, the emotional register in which a nation mourns a mountaineer who reached the world's summits and was claimed by them.",
          "source": "Caspar David Friedrich, Wanderer above the Sea of Fog (Der Wanderer über dem Nebelmeer), c. 1818, oil on canvas, Hamburger Kunsthalle.",
          "href": "https://commons.wikimedia.org/wiki/File:Caspar_David_Friedrich_-_Wanderer_above_the_sea_of_fog.jpg",
          "image": {
            "src": "/covers/nepal-mourns-nirmal-purja--a4.png",
            "alt": "A man in a dark green coat stands on a dark crag with his back to the viewer, leaning on a cane, looking out over a vast sea of fog broken by jagged mountain peaks and receding ridges.",
            "credit": "Caspar David Friedrich, Wanderer above the Sea of Fog (c. 1818), Hamburger Kunsthalle. Public domain via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "Hokusai, \"Fine Wind, Clear Morning (Red Fuji)\"",
          "excerpt": "In this woodblock print from Thirty-six Views of Mount Fuji, Hokusai reduces the sacred peak to a single triumphant red-brown pyramid, streaked with snow and crowned by streaming clouds against a clear morning sky. Where Friedrich frames the mountain as an object of Western awe, Hokusai renders it as a revered, near-divine presence—an eastern counterpart to the veneration Nepal holds for its own great peaks and for the climber who conquered them.",
          "source": "Katsushika Hokusai, Fine Wind, Clear Morning (Gaifū kaisei), also known as Red Fuji, from Thirty-six Views of Mount Fuji, color woodblock print, c. 1830–1832.",
          "href": "https://commons.wikimedia.org/wiki/File:Red_Fuji_southern_wind_clear_morning.jpg",
          "image": {
            "src": "/covers/nepal-mourns-nirmal-purja--a5.png",
            "alt": "A woodblock print of Mount Fuji as a broad red-brown cone streaked with white snow at its summit, set against a blue sky with rows of small white clouds and a dark green forested base.",
            "credit": "Katsushika Hokusai, Fine Wind, Clear Morning (Red Fuji), from Thirty-six Views of Mount Fuji (c. 1830–1832). Public domain via Wikimedia Commons."
          }
        }
      ]
    },
    {
      "slug": "uk-plug-in-balcony-solar-panels",
      "headline": "The UK clears the way for plug-in balcony solar panels, letting households plug low-cost panels into a wall socket from 27 August to cut energy bills",
      "overview": "The UK government said changes to plug and electrical-safety rules will legalize plug-in solar panels from 27 August, allowing flats and rented homes to fit panels on balconies, roofs or outdoor spaces without professional installation. The devices, already common across Europe, connect straight to a mains socket and are expected to sell for around £400, potentially saving up to £110 a year. Ministers cast the move as part of a push to cut reliance on volatile fossil-fuel markets.",
      "genre": "Climate",
      "sources": [
        {
          "name": "Dezeen",
          "href": "https://www.dezeen.com/2026/08/03/plug-in-solar-panels-available-uk-end-summer/"
        },
        {
          "name": "Ideal Home",
          "href": "https://www.idealhome.co.uk/house-manual/energy-saving/when-will-plug-in-solar-panels-be-available-to-buy"
        }
      ],
      "href": "#",
      "publishedAt": "2026-08-03",
      "image": {
        "src": "/covers/uk-plug-in-balcony-solar-panels.png",
        "alt": "Plug-in solar panels mounted on an apartment balcony railing.",
        "credit": "Wikimedia Commons"
      },
      "rank": 38,
      "edition": "Morning Edition · 3 August 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Socrates designs the solar house",
          "excerpt": "Now in houses with a south aspect, the sun's rays penetrate into the porticoes in winter, but in summer the path of the sun is right over our heads and above the roof, so that there is shade. If, then, this is the best arrangement, we should build the south side loftier to get the winter sun and the north side lower to keep out the cold winds.",
          "source": "Xenophon, Memorabilia, Book 3, Chapter 8 (Socrates on the ideal house), trans. E. C. Marchant, Loeb Classical Library, 1923. Perseus Digital Library, Tufts University.",
          "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus%3atext%3a1999.01.0208%3abook%3d3%3achapter%3d8"
        },
        {
          "category": "historical",
          "title": "Bell Labs makes sunlight practical, 1954",
          "excerpt": "On 25 April 1954 Daryl Chapin, Calvin Fuller and Gerald Pearson unveiled the first practical silicon photovoltaic cell at Bell Telephone Laboratories in Murray Hill, New Jersey, converting about six percent of incoming sunlight straight into electricity. Their small blue wafers were the ancestors of every rooftop and balcony panel that follows, turning the ancient dream of drinking power from the sun into a repeatable piece of hardware. It is the pivot from centuries of solar curiosities to the cheap, mass-produced module a UK renter can now clip to a railing and plug into the wall.",
          "source": "\"Milestones: First Practical Photovoltaic Solar Cell, 1954,\" IEEE Engineering and Technology History Wiki (ETHW).",
          "href": "https://ethw.org/Milestones:First_Practical_Photovoltaic_Solar_Cell"
        },
        {
          "category": "literary",
          "title": "The Great Hymn to the Aten",
          "excerpt": "The earth becometh light, thou shootest up in the horizon, shining in the Aten in the day, thou scatterest the darkness. Thou sendest out thine arrows (i.e., rays), the Two Lands make festival, [men] wake up, stand upon their feet, it is thou who raisest them up.",
          "source": "The Great Hymn to the Aten (Hymn of praise of Her-aakhuti), attributed to Akhenaten, trans. E. A. Wallis Budge, in Tutankhamen: Amenism, Atenism and Egyptian Monotheism, 1923. Wikisource.",
          "href": "https://en.wikisource.org/wiki/Great_Hymn_to_Aten"
        },
        {
          "category": "literary",
          "title": "St Francis praises Brother Sun and Brother Fire",
          "excerpt": "Praise be to Thee, my Lord, with all Thy creatures,\nEspecially to my worshipful brother sun,\nThe which lights up the day, and through him dost Thou brightness give;\nAnd beautiful is he and radiant with splendor great;\nOf Thee, most High, signification gives.\n\nPraised be my Lord for brother fire,\nBy the which Thou lightest up the dark.\nAnd fair is he and gay and mighty and strong.",
          "source": "Francis of Assisi, \"The Canticle of the Sun\" (c. 1225), in The Writings of St. Francis of Assisi, trans. Paschal Robinson, 1906. Wikisource.",
          "href": "https://en.wikisource.org/wiki/The_Writings_of_St._Francis_of_Assisi/The_Canticle_of_the_Sun"
        },
        {
          "category": "artistic",
          "title": "Turner, ‘Norham Castle, Sunrise’",
          "excerpt": "J.M.W. Turner dissolves a castle, a river and grazing cattle into pure light, the rising sun a blazing core that floods the whole canvas in luminous blue and gold. Solid forms melt into radiance until the sun’s energy is almost the only subject that remains. It is Romantic painting’s purest hymn to the power a plug-in panel now quietly gathers from a balcony rail.",
          "source": "J.M.W. Turner, Norham Castle, Sunrise (c. 1845), oil on canvas, Tate, London. Public domain via Wikimedia Commons.",
          "href": "https://commons.wikimedia.org/wiki/File:Jmw_turner,_norham_castle,_alba,_1845_ca.jpg",
          "image": {
            "src": "/covers/uk-plug-in-balcony-solar-panels--a4.png",
            "alt": "A castle and river dissolve into luminous blue and gold as a blazing sun rises, in Turner’s near-abstract painting.",
            "credit": "J.M.W. Turner, Norham Castle, Sunrise (c. 1845), Tate. Public domain via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "Van Gogh, The Sower",
          "excerpt": "In this June 1888 canvas from Arles, Van Gogh sets a peasant scattering seed against an enormous lemon-yellow sun that fills the sky and gilds the violet furrows below. The sower's ancient labour and the giant disc behind him fuse human work with solar power, a hymn to sunlight as the engine of all growth. The image speaks to the promise behind plug-in solar: sowing small panels now to harvest the sun's free energy at home.",
          "source": "Vincent van Gogh, The Sower, c. 17-28 June 1888, Kroller-Muller Museum, Otterlo. Public domain via Wikimedia Commons.",
          "href": "https://commons.wikimedia.org/wiki/File:Vincent_van_Gogh_-_The_Sower_-_c._17-28_June_1888.jpg",
          "image": {
            "src": "/covers/uk-plug-in-balcony-solar-panels--a5.png",
            "alt": "A farmer strides across a violet field scattering seed beneath a huge glowing yellow sun that dominates a golden sky.",
            "credit": "Vincent van Gogh, The Sower (1888), Kroller-Muller Museum, Otterlo. Public domain via Wikimedia Commons."
          }
        }
      ]
    },
    {
      "slug": "egypt-suez-earthquake-magnitude-5-6",
      "headline": "A magnitude 5.6 earthquake strikes near the northern end of the Suez Canal in Egypt, shaking Cairo, Alexandria and neighbouring countries but causing no serious damage",
      "overview": "An earthquake measured at magnitude 5.6 struck about 40 km north of Suez, near the northern mouth of the Suez Canal, shortly after 3 a.m. local time, Egypt's seismology institute said. Tremors were felt across Cairo, the Nile Delta, Alexandria and Port Said, and as far as Gaza, Jordan and Lebanon, followed by several aftershocks. Authorities reported one injury and no significant damage, and the Red Crescent activated its response plan.",
      "genre": "Science",
      "sources": [
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMipgFBVV95cUxNcjE3eW1QaE5nM2hJVXA3OEhrblV6RkJqNTZMWVVrWTZxcTFqRkh4QllhTEJVUWZ3emQ2ZjhCYm5fV1dJdkpBOHhFU21SZzluQlNXMlozaWxGMy1GNnRuamVvUW1xaFlVcTVxYlFtNzRBLWJDZzQ0UUIxUjhNRFhoWmhBUjhiZktWVzdVMmlLcmQwWmZmNzRxaE9Qdmk4T1V2RDl6ZmRn?oc=5"
        },
        {
          "name": "The National",
          "href": "https://www.thenationalnews.com/news/mena/2026/08/03/egypt-hit-by-56-magnitude-earthquake/"
        }
      ],
      "href": "#",
      "publishedAt": "2026-08-03",
      "image": {
        "src": "/covers/egypt-suez-earthquake-magnitude-5-6.png",
        "alt": "Ships passing through the Suez Canal in Egypt.",
        "credit": "Wikimedia Commons"
      },
      "rank": 39,
      "edition": "Morning Edition · 3 August 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Thucydides on the Sea That Fled and Returned",
          "excerpt": "About the same time that these earthquakes were so common, the sea at Orobiae, in Euboea, retiring from the then line of coast, returned in a huge wave and invaded a great part of the town, and retreated leaving some of it still under water; so that what was once land is now sea; such of the inhabitants perishing as could not run up to the higher ground in time. A similar inundation also occurred at Atalanta, the island off the Opuntian Locrian coast, carrying away part of the Athenian fort and wrecking one of two ships which were drawn up on the beach. The cause, in my opinion, of this phenomenon must be sought in the earthquake. At the point where its shock has been the most violent, the sea is driven back and, suddenly recoiling with redoubled force, causes the inundation. Without an earthquake I do not see how such an accident could happen.",
          "source": "Thucydides, History of the Peloponnesian War, Book III, ch. 89 (426 BC), trans. Richard Crawley. Project Gutenberg.",
          "href": "https://www.gutenberg.org/cache/epub/7142/pg7142.txt"
        },
        {
          "category": "historical",
          "title": "Darwin Feels the Solid Earth Turn to Liquid, 1835",
          "excerpt": "This day has been memorable in the annals of Valdivia, for the most severe earthquake experienced by the oldest inhabitant. I happened to be on shore, and was lying down in the wood to rest myself. It came on suddenly, and lasted two minutes, but the time appeared much longer. [...] A bad earthquake at once destroys our oldest associations: the earth, the very emblem of solidity, has moved beneath our feet like a thin crust over a fluid;—one second of time has created in the mind a strange idea of insecurity, which hours of reflection would not have produced.",
          "source": "Charles Darwin, Journal of Researches (The Voyage of the Beagle), ch. XVI, on the great Chilean earthquake of 20 February 1835 (1839; text of 1845 edition). Project Gutenberg.",
          "href": "https://www.gutenberg.org/cache/epub/944/pg944.txt"
        },
        {
          "category": "literary",
          "title": "The Ruin of Lisbon in 'Candide'",
          "excerpt": "Scarcely had they reached the city, lamenting the death of their benefactor, when they felt the earth tremble under their feet. The sea swelled and foamed in the harbour, and beat to pieces the vessels riding at anchor. Whirlwinds of fire and ashes covered the streets and public places; houses fell, roofs were flung upon the pavements, and the pavements were scattered. Thirty thousand inhabitants of all ages and sexes were crushed under the ruins.",
          "source": "Voltaire, Candide, ch. 5 (1759), on the Lisbon earthquake of 1755, English translation. Project Gutenberg.",
          "href": "https://www.gutenberg.org/files/19942/19942-h/19942-h.htm"
        },
        {
          "category": "literary",
          "title": "The Sixth Seal: A Great Earthquake",
          "excerpt": "And I beheld when he had opened the sixth seal, and, lo, there was a great earthquake; and the sun became black as sackcloth of hair, and the moon became as blood; And the stars of heaven fell unto the earth, even as a fig tree casteth her untimely figs, when she is shaken of a mighty wind. And the heaven departed as a scroll when it is rolled together; and every mountain and island were moved out of their places.",
          "source": "Revelation 6:12–14, King James Version (1611). Wikisource.",
          "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Revelation"
        },
        {
          "category": "artistic",
          "title": "Bryullov, 'The Last Day of Pompeii'",
          "excerpt": "Karl Bryullov floods a collapsing city with the lurid red of an erupting Vesuvius, columns toppling and statues pitching from their pedestals as families shield their heads and flee. Lightning and volcanic glare pick out mothers clutching children, a fallen woman beside her infant, and citizens frozen between terror and tenderness. It is the classic Romantic image of a proud city undone in an instant by the trembling earth.",
          "source": "Karl Bryullov, The Last Day of Pompeii (1830–1833), oil on canvas, State Russian Museum, St Petersburg. Public domain via Wikimedia Commons.",
          "href": "https://commons.wikimedia.org/wiki/File:Karl_Brullov_-_The_Last_Day_of_Pompeii_-_Google_Art_Project.jpg",
          "image": {
            "src": "/covers/egypt-suez-earthquake-magnitude-5-6--a4.png",
            "alt": "Panicked crowds flee collapsing columns and toppling statues under a red volcanic sky as Vesuvius erupts over Pompeii.",
            "credit": "Karl Bryullov, The Last Day of Pompeii (1830–1833), State Russian Museum. Public domain via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "John Martin, 'The Destruction of Pompeii and Herculaneum'",
          "excerpt": "John Martin dwarfs tiny human figures beneath a vast apocalyptic panorama: a black sky split by lightning, the cone of Vesuvius spewing fire, and the twin cities engulfed in cataract of ash and molten rock. The scale is deliberately overwhelming, the people mere specks against the machinery of geological catastrophe. Martin turns a natural disaster into a sublime vision of nature's indifference to civilisation.",
          "source": "John Martin, The Destruction of Pompeii and Herculaneum (1822), oil on canvas, Tate, London. Public domain via Wikimedia Commons.",
          "href": "https://commons.wikimedia.org/wiki/File:Destruction_of_Pompeii_and_Herculaneum.jpg",
          "image": {
            "src": "/covers/egypt-suez-earthquake-magnitude-5-6--a5.png",
            "alt": "Tiny figures flee beneath a vast black sky as Vesuvius erupts and fire and ash engulf Pompeii and Herculaneum.",
            "credit": "John Martin, The Destruction of Pompeii and Herculaneum (1822), Tate. Public domain via Wikimedia Commons."
          }
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
