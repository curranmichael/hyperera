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
// the Afternoon Edition of 29 June 2026 (ranks 1-13) leads with its hero story,
// followed by the Morning Edition of 29 June and the Evening Edition of 28 June 2026.
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
    "slug": "scotus-blocks-trump-firing-fed-cook",
    "headline": "US Supreme Court blocks Trump's attempt to fire Federal Reserve governor Lisa Cook",
    "overview": "The US Supreme Court has blocked President Trump's attempt to remove Federal Reserve governor Lisa Cook, sending the dispute over whether he can dismiss her back to the lower courts. The unsigned order is widely seen as a defence of the central bank's independence and a check on the president's power to fire officials at the Fed.",
    "genre": "Politics",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cy4wwy0nkeno"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiqgFBVV95cUxQb1JHcW4zcGozWE9wcl9IM2FnczFEbHBaRVVvdDRhQm9DTXVEOVJYaVJoS3hIakhvQjE1RWNRU182N3FNRmNMbkJhZFQtbXI1Zlh1M1M5R054QnNid1ZNdmFKbnVjX1h2M2xNR0M3eXJGM29pNVR6Zkh2R0IyU2ZpNDZ0OXJFVFJ3dnd4c3NZVGc1bnhuaWJtM2hLVVlWUVQtZDM1UFAxd1dqUQ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-29",
    "image": {
      "src": "/covers/scotus-blocks-trump-firing-fed-cook.png",
      "alt": "Federal Reserve governor Lisa Cook speaking at a conference",
      "credit": "BBC"
    },
    "lead": true,
    "edition": "Evening Edition · 29 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Humphrey's Executor v. United States (1935)",
        "excerpt": "In this unanimous decision the Supreme Court held that Congress could shield the commissioners of independent agencies from removal at the President's pleasure, ruling that an officer of a body that is \"neither political nor executive, but predominantly quasi judicial and quasi legislative\" could be removed only for cause. The Court declared that \"the authority of Congress, in creating quasi legislative or quasi judicial agencies, to require them to act in discharge of their duties independently of executive control cannot well be doubted; and that authority includes, as an appropriate incident, power to fix the period during which they shall continue, and to forbid their removal except for cause in the meantime.\" For ninety years this case has been the legal cornerstone of central-bank and agency independence cited in the Cook dispute.",
        "source": "Humphrey's Executor v. United States, 295 U.S. 602 (1935), U.S. Reports, Library of Congress",
        "href": "https://tile.loc.gov/storage-services/service/ll/usrep/usrep295/usrep295602/usrep295602.pdf"
      },
      {
        "category": "historical",
        "title": "The Act of Settlement 1701 (securing judicial tenure)",
        "excerpt": "That after the said Limitation shall take Effect as aforesaid Judges Commissions be made Quam diu se bene Gesserint and their Salaries ascertained and established but upon the Address of both Houses of Parliament it may be lawfull to remove them.",
        "source": "Act of Settlement 1701 (12 & 13 Will. III c. 2), via Wikisource",
        "href": "https://en.wikisource.org/wiki/Act_of_Settlement_1701"
      },
      {
        "category": "literary",
        "title": "The Book of Daniel 6:8, 6:15 (King James Version)",
        "excerpt": "Now, O king, establish the decree, and sign the writing, that it be not changed, according to the law of the Medes and Persians, which altereth not.\n...\nThen these men assembled unto the king, and said unto the king, Know, O king, that the law of the Medes and Persians is, That no decree nor statute which the king establisheth may be changed.",
        "source": "The Holy Bible, King James Version, Daniel 6, via Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Daniel"
      },
      {
        "category": "literary",
        "title": "Shakespeare, The Merchant of Venice (Act 3, Scene 3)",
        "excerpt": "The Duke cannot deny the course of law,\nFor the commodity that strangers have\nWith us in Venice, if it be denied,\nWill much impeach the justice of the state,\nSince that the trade and profit of the city\nConsisteth of all nations.",
        "source": "William Shakespeare, The Merchant of Venice, Act III, Scene iii, via Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/1515/pg1515.txt"
      },
      {
        "category": "artistic",
        "title": "Beethoven, Fidelio, Op. 72",
        "excerpt": "Beethoven's only opera dramatizes the triumph of justice over the abuse of arbitrary power: the nobleman Florestan is illegally imprisoned and slated for murder by the tyrannical governor Don Pizarro, only to be rescued when the lawful minister Don Fernando arrives to restore order and free the unjustly held. The work's surge from a dark dungeon into the light of the liberation chorus is one of music's great statements that no ruler stands above the law. It mirrors a court stepping in to check an executive's unilateral attempt to remove and silence an official.",
        "source": "Ludwig van Beethoven, Fidelio, Op. 72 — work page on IMSLP",
        "href": "https://imslp.org/wiki/Fidelio,_Op.72_(Beethoven,_Ludwig_van)"
      },
      {
        "category": "artistic",
        "title": "Peter Paul Rubens, Daniel in the Lions' Den (c. 1614-1616)",
        "excerpt": "Rubens depicts Daniel surrounded by life-size lions in the den into which the king was forced to cast him because, under the unchangeable law of the Medes and Persians, even the sovereign could not reverse his own sealed decree. The serene, praying figure ringed by predators makes vivid the moment when a ruler is bound by a law he cannot unmake. The canvas, now in the National Gallery of Art in Washington, gives visual form to the theme that fixed law constrains the power of the one who governs.",
        "source": "Peter Paul Rubens, Daniel in the Lions' Den, National Gallery of Art, Washington — Wikimedia Commons (Google Art Project)",
        "href": "https://commons.wikimedia.org/wiki/File:Sir_Peter_Paul_Rubens_-_Daniel_in_the_Lions%27_Den_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/scotus-blocks-trump-firing-fed-cook--art.png",
          "alt": "Painting of Daniel kneeling and praying, surrounded by a circle of lions in a stone den",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 1
  },
  {
    "slug": "scotus-rejects-trump-carroll-appeal",
    "headline": "US Supreme Court rejects Trump's appeal in the E. Jean Carroll case, leaving a $5 million verdict standing",
    "overview": "The US Supreme Court has declined to hear President Trump's appeal of the $5 million civil verdict won by the writer E. Jean Carroll, whom a jury found he had sexually abused and defamed. The decision leaves the award intact and exhausts Trump's main avenue to overturn the judgment.",
    "genre": "Politics",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cn8q2z5wpn2o"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMipgFBVV95cUxQWG1Gdm5YX2N0ZWlxZ2c4cU5Gb0NCdl9aZlRQY3UyZnR3WU9UQUhaN19qb3V2WkFWTjFjS0dVVmFHeFRVdFkyRXV6VmNseDNLWUo0UVB0emctajg4X1NpZjMxZHItTjBJUUQ1OUgwQUJIQU8teUdQSEROUm5US1BpVHZrSXFXU2E5aWticTh5YnQxNjhUV0hvU2xsdkhBbnVYOVlSV2Jn?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-29",
    "image": {
      "src": "/covers/scotus-rejects-trump-carroll-appeal.png",
      "alt": "Writer E. Jean Carroll in sunglasses and a blazer",
      "credit": "BBC"
    },
    "edition": "Evening Edition · 29 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "United States v. Nixon (1974): No man above the law",
        "excerpt": "When the Supreme Court unanimously rejected President Nixon's claim of an absolute executive privilege and ordered him to surrender the Watergate tapes, it established that even the most powerful office in the land bends to the courts. Nixon complied, the tapes exposed the cover-up, and within weeks he resigned. The case remains the touchstone for the principle that no person, however mighty, stands above judicial accountability.",
        "source": "Encyclopaedia Britannica, \"United States v. Nixon\"",
        "href": "https://www.britannica.com/event/United-States-v-Nixon"
      },
      {
        "category": "historical",
        "title": "New York Times Co. v. Sullivan (1964): The architecture of defamation",
        "excerpt": "This landmark ruling reshaped American libel law, holding that public officials must prove a false statement was made with \"actual malice\" to recover damages. It is the constitutional framework against which every modern defamation verdict, including the one Trump sought to overturn, is measured. The decision drew the enduring line between protected speech and reputational harm that the law will punish.",
        "source": "Encyclopaedia Britannica, \"New York Times Co. v. Sullivan\"",
        "href": "https://www.britannica.com/event/New-York-Times-Co-v-Sullivan"
      },
      {
        "category": "literary",
        "title": "Shakespeare, Othello (Iago on a good name)",
        "excerpt": "Good name in man and woman, dear my lord,\nIs the immediate jewel of their souls.\nWho steals my purse steals trash. 'Tis something, nothing;\n'Twas mine, 'tis his, and has been slave to thousands.\nBut he that filches from me my good name\nRobs me of that which not enriches him\nAnd makes me poor indeed.",
        "source": "William Shakespeare, Othello, Act III, Scene 3 (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/1531/pg1531.txt"
      },
      {
        "category": "literary",
        "title": "The History of Susanna: a woman falsely accused, then vindicated",
        "excerpt": "Are ye such fools, ye sons of Israel, that without examination or knowledge of the truth ye have condemned a daughter of Israel? Return again to the place of judgment: for they have borne false witness against her. ... With that all the assembly cried out with a loud voice, and praised God, who saveth them that trust in him. And they arose against the two elders, for Daniel had convicted them of false witness by their own mouth.",
        "source": "The History of Susanna (Apocrypha), King James Version, verses 48-61 (Wikisource)",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Susanna"
      },
      {
        "category": "artistic",
        "title": "Handel, Susanna, HWV 66 (1749)",
        "excerpt": "Handel's oratorio dramatizes the biblical Susanna, the virtuous wife falsely accused by two powerful elders whose lies are unmasked and turned back upon them. Premiered in 1749, its arias trace innocence besieged by slander and ultimately delivered by a just judgment. The work gives musical voice to a woman's word triumphing over the testimony of the mighty.",
        "source": "George Frideric Handel, Susanna, HWV 66 (IMSLP)",
        "href": "https://imslp.org/wiki/Susanna,_HWV_66_(Handel,_George_Frideric)"
      },
      {
        "category": "artistic",
        "title": "Artemisia Gentileschi, Susanna and the Elders (1610)",
        "excerpt": "Painted when the artist was around seventeen, this canvas shows Susanna recoiling from two conspiring elders, her body twisted in visceral refusal of their pressure. Gentileschi, who herself testified in a notorious rape trial, renders the wronged woman's distress with unusual psychological truth rather than as a pretext for sensual display. The painting has become an enduring emblem of a woman's resistance to the powerful and her eventual vindication.",
        "source": "Artemisia Gentileschi, Susanna and the Elders (1610), Schloss Weissenstein, Pommersfelden (Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Susanna_and_the_Elders_(1610),_Artemisia_Gentileschi.jpg",
        "image": {
          "src": "/covers/scotus-rejects-trump-carroll-appeal--art.png",
          "alt": "Susanna seated nude by a fountain, recoiling and turning her face away from two elders who lean over her conspiratorially.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 2
  },
  {
    "slug": "germany-youth-centre-shooting",
    "headline": "Six killed in a shooting at a youth welfare centre in northern Germany, two suspects detained",
    "overview": "Six people were killed in a shooting at a youth welfare centre in northern Germany, police said, after a sixth victim died of their injuries. Two suspects were detained as investigators worked to establish a motive for one of the country's deadliest shootings in recent years.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c17yzzw1vkjo"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMimwFBVV95cUxPWjh1ZkR3d0VldldxMEFSNDBSWEx5Y1RUZHNLbEVqMWc4dHR4MVZ2QlhFZ1h4LVc0eE5RNENRR2xDWGlDdFo5VF80aGtXbEFLZGh2UlB1NTE5amY4TkdreHVBMEhLb3E4VVZ1UUFyMWtHb0ZRTUNRMTVmVWtSazVFOVFRV1pRX0NxNjRhdWxFZjB2SUVKN253NmhZQQ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-29",
    "image": {
      "src": "/covers/germany-youth-centre-shooting.png",
      "alt": "Police and a crisis-intervention team near the scene of the shooting in northern Germany",
      "credit": "BBC"
    },
    "edition": "Evening Edition · 29 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Dunblane school massacre (1996)",
        "excerpt": "On 13 March 1996 a gunman, Thomas Hamilton, walked into the gymnasium of a primary school in the small Scottish town of Dunblane and opened fire on a class of five- and six-year-olds. Sixteen children and their teacher, Gwen Mayor, were killed before he turned a weapon on himself. The slaughter of the very young in a place of learning convulsed Britain and led to a near-total ban on private handgun ownership.",
        "source": "Encyclopaedia Britannica, \"Dunblane school massacre\"",
        "href": "https://www.britannica.com/event/Dunblane-school-massacre"
      },
      {
        "category": "historical",
        "title": "Beslan school siege (2004)",
        "excerpt": "On the morning of 1 September 2004, armed militants stormed School No. 1 in Beslan, North Ossetia, taking more than a thousand hostages, the majority of them children gathered with parents and teachers for the first day of the new term. After three days the siege ended in explosions and gunfire, leaving more than 330 people dead, most of them children. It remains one of the most harrowing modern instances of sudden violence engulfing the young and a whole grieving community.",
        "source": "Encyclopaedia Britannica, \"Beslan school attack\"",
        "href": "https://www.britannica.com/event/Beslan-school-attack"
      },
      {
        "category": "literary",
        "title": "The Massacre of the Innocents (Gospel of Matthew 2:16-18, KJV)",
        "excerpt": "Then Herod, when he saw that he was mocked of the wise men, was exceeding wroth, and sent forth, and slew all the children that were in Bethlehem, and in all the coasts thereof, from two years old and under...\nIn Rama was there a voice heard, lamentation, and weeping, and great mourning, Rachel weeping for her children, and would not be comforted, because they are not.",
        "source": "Gospel of Matthew 2:16-18, King James Version (Wikisource)",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Matthew"
      },
      {
        "category": "literary",
        "title": "Lycidas, by John Milton (1637)",
        "excerpt": "He must not flote upon his watry bear\nUnwept, and welter to the parching wind,\nWithout the meed of som melodious tear.\n\nWho would not sing for Lycidas? he knew\nHimself to sing, and build the lofty rhyme.",
        "source": "John Milton, \"Lycidas,\" in The Poetical Works of John Milton (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/1745/1745-h/1745-h.htm"
      },
      {
        "category": "artistic",
        "title": "Requiem in D minor, K.626 — Wolfgang Amadeus Mozart",
        "excerpt": "Mozart's unfinished Requiem, left incomplete at his death in 1791 and completed by his pupil Franz Xaver Suessmayr, is the supreme musical lament of the Western tradition. Its Lacrimosa (\"Full of tears shall be that day\") gives voice to grief almost beyond words, a weeping for the dead that mourners across centuries have made their own. It is the natural music of communal sorrow for the slain.",
        "source": "IMSLP / Petrucci Music Library, \"Requiem, K.626 (Mozart, Wolfgang Amadeus)\"",
        "href": "https://imslp.org/wiki/Requiem,_K.626_(Mozart,_Wolfgang_Amadeus)"
      },
      {
        "category": "artistic",
        "title": "Massacre of the Innocents — Guido Reni (1611)",
        "excerpt": "Guido Reni's Baroque masterpiece, painted in 1611 for the Basilica of San Domenico in Bologna, depicts Herod's soldiers slaughtering the infants of Bethlehem as their mothers recoil in anguish. The composition's upturned faces and outstretched arms transform raw horror into a frozen cry of maternal grief. It is one of art's most enduring images of innocent blood spilled and a community plunged into mourning.",
        "source": "Wikimedia Commons, \"Guido Reni - Massacre of the Innocents\" (Pinacoteca Nazionale, Bologna)",
        "href": "https://commons.wikimedia.org/wiki/File:Guido_Reni_-_Massacre_of_the_Innocents.jpg",
        "image": {
          "src": "/covers/germany-youth-centre-shooting--art.png",
          "alt": "Guido Reni's 1611 painting Massacre of the Innocents, showing mothers and soldiers amid the killing of children",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 3
  },
  {
    "slug": "ukraine-drones-russian-refinery-fuel",
    "headline": "Ukrainian drones set another Russian oil refinery ablaze as Putin admits spreading fuel shortages",
    "overview": "Ukrainian long-range drones set another Russian oil refinery ablaze overnight, part of a sustained campaign against Russia's energy industry. President Vladimir Putin acknowledged that fuel shortages were spreading to more regions of Russia as the strikes disrupted refining and distribution.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMinwFBVV95cUxPNTZPUlo3WW9DRjJzZzIxV3hsNzhpLUdGZEFGQXRUR0tUd1Q4dURpSnYxcFJFTFJuM0ZTRmd3RUVfZ0FEMlJ5U1ZrYlVLcDBOR2RaMmU4YzAzS0t0UzZBU21rbzlqU19HTjZRN0t0dEo1MWJuSW9RNEV0MVNCNDM1RDFqQU80T0tkTzNvOEpfWEE4SDdIN2R4ZlNuRHRINHc?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMipwFBVV95cUxOVkFhWExsZjdwNmxvdkd0TFFRaTQ5UW9CVi15QXdsazVwX3F5VEZoWl9sZmlYZi10cHdBOWtzZHRyQ18xWDNHR2NvMXRESnRIZFlGekJpa3RveG82WnVHMl90QVNSQ0JRVFUzY0d2dVVNbm5VZ0VMWWdWam1DU3UxMmtvX1hicWlBWWR5Qk1wQmhRNXdmQXEzSExuczloekFyUFNKa2E1SQ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-29",
    "image": {
      "src": "/covers/ukraine-drones-russian-refinery-fuel.png",
      "alt": "An oil refinery burning at night after a drone strike",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 29 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Allied Oil Campaign of World War II",
        "excerpt": "From 1944 the British and American air forces concentrated on Germany's refineries and synthetic-fuel plants, aiming to starve the Wehrmacht and Luftwaffe of petroleum. The strikes on installations such as Ploiesti and the Leuna works choked aviation fuel to a trickle, grounding aircraft and stalling armor. Armaments chief Albert Speer judged the loss of fuel meant the end of German war production, and Luftwaffe Field Marshal Erhard Milch said the Americans had stabbed Germany in the heart.",
        "source": "\"Oil campaign of World War II,\" Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Oil_campaign_of_World_War_II"
      },
      {
        "category": "historical",
        "title": "Sherman's March to the Sea (1864)",
        "excerpt": "After taking Atlanta, Union Major General William T. Sherman cut loose from his supply lines and marched across Georgia waging deliberate \"total war,\" destroying anything that could sustain the Confederate war effort. His troops burned military stores, tore up railroads, and torched depots and factories, severing the enemy's logistics and shattering Southern morale far behind the front. The scorched-earth campaign showed how striking an opponent's economic lifeblood could be as decisive as any battlefield victory.",
        "source": "\"Sherman's March to the Sea,\" Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Sherman's_March_to_the_Sea"
      },
      {
        "category": "literary",
        "title": "Homer, The Iliad, Book XV (Pope's translation)",
        "excerpt": "Haste, bring the flames! the toil of ten long years \nIs finished, and the day desired appears; \nThis happy day with acclamations greet, \nBright with destruction of yon hostile fleet.",
        "source": "Homer, The Iliad of Homer, trans. Alexander Pope, Book XV; Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Iliad_of_Homer_(Pope)/Book_15"
      },
      {
        "category": "literary",
        "title": "The Burning of Ai (Joshua 8, King James Version)",
        "excerpt": "And when the men of Ai looked behind them, they saw, and,\nbehold, the smoke of the city ascended up to heaven, and they\nhad no power to flee this way or that way...\nAnd Joshua burnt Ai, and made it an heap for ever, even a\ndesolation unto this day.",
        "source": "The Bible (King James Version), Joshua 8:20, 28; Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Joshua"
      },
      {
        "category": "artistic",
        "title": "Tchaikovsky, 1812 Overture, Op. 49",
        "excerpt": "Tchaikovsky's festival overture musically dramatizes Napoleon's catastrophic 1812 campaign in Russia, weaving the French anthem against Russian themes amid the roar of cannon and pealing bells. Composed to evoke a homeland set ablaze and an invading army broken by fire, cold, and resistance, it is among the most famous martial works in the repertoire. Its booming artillery and triumphant climax make it an apt sonic emblem of war reaching deep into a great power's home territory.",
        "source": "Pyotr Ilyich Tchaikovsky, 1812 Overture, Op. 49 (1880); IMSLP",
        "href": "https://imslp.org/wiki/1812_Overture,_Op.49_(Tchaikovsky,_Pyotr)"
      },
      {
        "category": "artistic",
        "title": "Fire of Moscow, 1812",
        "excerpt": "This painting depicts the great conflagration that consumed Moscow in September 1812 during Napoleon's occupation, the night sky lit orange as the city burns. The image captures a capital sacrificed to fire to deny the invader its spoils, a vision of war's destruction reaching the very heart of a nation. It stands as a haunting portrait of fire wielded as a weapon and a home front engulfed by war.",
        "source": "\"Fire of Moscow 1812,\" Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Fire_of_Moscow_1812.jpg",
        "image": {
          "src": "/covers/ukraine-drones-russian-refinery-fuel--art.png",
          "alt": "Painting of Moscow ablaze in 1812, flames and smoke rising over the burning city at night",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 4
  },
  {
    "slug": "comcast-spins-off-nbcuniversal",
    "headline": "Comcast to spin off NBCUniversal and Sky into a separate, publicly traded company",
    "overview": "Comcast said it will split into two public companies by spinning off NBCUniversal and Sky — its film and television studios, the Peacock streaming service, theme parks and broadcast networks — from its core cable and broadband business. Executives framed the roughly year-long separation as a way to unlock value, and Comcast shares jumped on the news.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMitwFBVV95cUxNeEstV29CWGdTSFdsV3dVZUg5eGM5N0ZkeTd3YWRvX0I3dk1CMHlpUHM3d1dGZUQ2NTVoWHVvNGtjWEltYi1CN0hsVmd3OUtNM0ZSYUJPa09LLUFXYjJZZkZ6VS0wNHEwdjV3dXdOWGhPRVNXX2Znd05RMXpqZW5pOVgtTXJjS1AxSkJQOE5vRUxQTjRfV0R5Vm1NVWhMWHBYc0hPdXlTVVVBQ1VBQVptc29SYm1ZTW8?oc=5"
      },
      {
        "name": "CNBC",
        "href": "https://www.cnbc.com/2026/06/29/comcast-announces-it-will-spin-off-media-and-tech-wings-into-separate-public-companies.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-29",
    "image": {
      "src": "/covers/comcast-spins-off-nbcuniversal.png",
      "alt": "30 Rockefeller Plaza, the New York home of NBCUniversal and Comcast",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 29 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Treaty of Verdun and the Partition of Charlemagne's Empire (843)",
        "excerpt": "After Louis's death the principles of heredity conquered at last the spirit of unity. By the treaty of Verdun (843)- of which unfortunately no authentic document remains- the three separate kingdoms were called into being which afterwards developed into France, Italy and Germany. The empire waned away, but did not die, although for a time the emperors were little more than petty local potentates. It was reserved for Otto the Great to restore it to its pristine glory.",
        "source": "Encyclopaedia Britannica (1911), \"Treaty of Verdun,\" via The Avalon Project, Yale Law School",
        "href": "https://avalon.law.yale.edu/medieval/verdun.asp"
      },
      {
        "category": "historical",
        "title": "Standard Oil Co. of New Jersey v. United States (1911)",
        "excerpt": "The unification of power and control over a commodity such as petroleum and its products by combining in one corporation the stocks of many other corporations aggregating a vast capital gives rise, of itself, to the prima facie presumption of an intent and purpose to dominate the industry connected with, and gain perpetual control of the movement of, that commodity and its products in the channels of interstate commerce in violation of the Anti-Trust Act of 1890, and that presumption is made conclusive by proof of specific acts such as those in the record of this case.",
        "source": "Standard Oil Co. of New Jersey v. United States, 221 U.S. 1 (1911), Syllabus, via Wikisource",
        "href": "https://en.wikisource.org/wiki/Standard_Oil_Co._of_New_Jersey_v._United_States"
      },
      {
        "category": "literary",
        "title": "King Lear Divides His Kingdom (Shakespeare, Act I, Scene 1)",
        "excerpt": "Give me the map there. Know that we have divided\nIn three our kingdom: and 'tis our fast intent\nTo shake all cares and business from our age;\nConferring them on younger strengths, while we\nUnburden'd crawl toward death. Our son of Cornwall,\nAnd you, our no less loving son of Albany,\nWe have this hour a constant will to publish\nOur daughters' several dowers, that future strife\nMay be prevented now.",
        "source": "William Shakespeare, The Tragedy of King Lear, Act I, Scene 1, via Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/1532/pg1532.txt"
      },
      {
        "category": "literary",
        "title": "Abram and Lot Divide the Land (Genesis 13)",
        "excerpt": "Is not the whole land before thee? separate thyself, I pray thee, from me: if thou wilt take the left hand, then I will go to the right; or if thou depart to the right hand, then I will go to the left.",
        "source": "The Holy Bible, King James Version, Genesis 13:9, via Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Genesis"
      },
      {
        "category": "artistic",
        "title": "Grande ouverture du roi Lear, H 53 (Hector Berlioz)",
        "excerpt": "Hector Berlioz's dramatic concert overture, inspired by Shakespeare's King Lear, opens with a grave, kingly unison theme for the lower strings that evokes the aging monarch's authority before the music fractures into stormy, conflicting passages mirroring the kingdom torn apart by his fateful division. Composed in 1831, the work translates the tragedy of a great realm sundered among heirs into orchestral form, swinging between tender lyricism and violent upheaval. The IMSLP work page provides the full public-domain score.",
        "source": "Hector Berlioz, Grande ouverture du roi Lear, H 53 (1831), IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Grande_ouverture_du_roi_Lear,_H_53_(Berlioz,_Hector)"
      },
      {
        "category": "artistic",
        "title": "Cordelia's Portion (Ford Madox Brown)",
        "excerpt": "Ford Madox Brown's vivid composition stages the very moment of partition: the aged King Lear gestures over the spread map of his realm as his court watches him carve the inheritance among his daughters. The flattering elder sisters bask in the glow of their lavish shares while the honest Cordelia stands apart, refused her portion, the whole tableau dramatizing how the dismemberment of a great estate sows the seeds of ruin. The work renders in paint the same logic of a giant divided that animates any breakup of an empire or a conglomerate.",
        "source": "Ford Madox Brown, Cordelia's Portion (c. 1866-1872), via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Cordelia%27s_Portion.jpg",
        "image": {
          "src": "/covers/comcast-spins-off-nbcuniversal--art.png",
          "alt": "Painting of King Lear dividing his kingdom among his daughters, with Cordelia standing apart",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 5
  },
  {
    "slug": "strategy-value-below-bitcoin",
    "headline": "Strategy's market value slips below the worth of its bitcoin holdings as crypto sentiment sours",
    "overview": "Strategy, the largest corporate holder of bitcoin, has seen its market value fall below the worth of its roughly 847,000 bitcoin, erasing the premium that funded its buying spree. The crossover raises doubts about whether the company can keep raising money to accumulate more of the cryptocurrency.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiwgFBVV95cUxNZk42eF9xeEpsNF93b3l1Ul9OUlplNEs3VnJwUjB4bjAwTnRXQWxLOWRsc2lQYURsWEFBZDZQdUtGZnhSeDA3cVBXM01RTHV4MW56dnhkMkl5Sk5qeEZMbThmUWlVOEdBQXduaUVYLVNSTGhkakdleUFaYmVNemxCajdfTmZPNHlRWFZWX2ZnWEhsYjZiNGpKOTZfVkRDaFdTcDEwUFRPWEtoSDlMcW1oTFFFcTAwVDhoRlM1R0tQZElGQQ?oc=5"
      },
      {
        "name": "PYMNTS",
        "href": "https://www.pymnts.com/cryptocurrency/2026/strategy-valuation-drop-threatens-key-bitcoin-funding-engine/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-29",
    "image": {
      "src": "/covers/strategy-value-below-bitcoin.png",
      "alt": "A deflating soap bubble drifting in a darkened room",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 29 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The South Sea Bubble (1720)",
        "excerpt": "In August the fall in the price of South Sea stock began, and in September, just as the 'insiders' had sold out, it became serious. Instead of being a buyer every one became a seller, and the result was that in a few days the stock of the South Sea Company fell to 175, while the stocks of many other companies were unsaleable.",
        "source": "\"South Sea Bubble,\" Encyclopaedia Britannica (11th ed., 1911), via Wikisource",
        "href": "https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/South_Sea_Bubble"
      },
      {
        "category": "historical",
        "title": "John Law and the Mississippi Scheme",
        "excerpt": "People began to sell their shares, and to buy coin, houses, land—anything that had a stable element of value in it.",
        "source": "\"Law, John,\" Encyclopaedia Britannica (11th ed., 1911), via Wikisource",
        "href": "https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Law,_John"
      },
      {
        "category": "literary",
        "title": "Ecclesiastes: \"Vanity of vanities\"",
        "excerpt": "Vanity of vanities, saith the Preacher, vanity of vanities; all is vanity.\nHe that loveth silver shall not be satisfied with silver; nor he that loveth abundance with increase: this is also vanity.\nThere is a sore evil which I have seen under the sun, namely, riches kept for the owners thereof to their hurt.",
        "source": "Ecclesiastes 1:2; 5:10,13, King James Version, via Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Ecclesiastes"
      },
      {
        "category": "literary",
        "title": "The Parable of the Rich Fool (Luke 12:16-21)",
        "excerpt": "And he said, This will I do: I will pull down my barns, and build greater; and there will I bestow all my grain and my goods. And I will say to my soul, Soul, thou hast much goods laid up for many years; take thine ease, eat, drink, be merry. But God said unto him, Thou foolish one, this night is thy soul required of thee; and the things which thou hast prepared, whose shall they be? So is he that layeth up treasure for himself, and is not rich toward God.",
        "source": "Luke 12:18-21, American Standard Version, via Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(American_Standard)/Luke"
      },
      {
        "category": "artistic",
        "title": "Saint-Saens, Danse macabre, Op. 40",
        "excerpt": "Saint-Saens's 1874 symphonic poem conjures Death tuning his fiddle at midnight to rouse skeletons into a frenzied dance, the xylophone clattering like rattling bones. Its whirling waltz spins ever faster toward an inevitable, deflating collapse when the cock crows and the dancers crumble back to dust. A fitting score for a euphoric speculative dance that ends, abruptly, at dawn.",
        "source": "Camille Saint-Saens, Danse macabre, Op. 40 (1874), IMSLP work page",
        "href": "https://imslp.org/wiki/Danse_macabre,_Op.40_(Saint-Sa%C3%ABns,_Camille)"
      },
      {
        "category": "artistic",
        "title": "William Hogarth, The South Sea Scheme (1721)",
        "excerpt": "Hogarth's earliest satirical engraving depicts Londoners crowding to ride a merry-go-round of speculation while Honesty is broken on a wheel and Honour is flogged. Set beneath the Monument, the print pillories the greed and credulity that inflated the South Sea Company before its ruinous crash. It remains the defining visual indictment of a financial mania built on illusory premium.",
        "source": "William Hogarth, \"The South Sea Scheme\" (1721), British Museum impression, via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:The_South_Sea_Scheme_(BM_S,2.4).jpg",
        "image": {
          "src": "/covers/strategy-value-below-bitcoin--art.png",
          "alt": "Hogarth's 1721 satirical print of crowds riding a speculation merry-go-round during the South Sea Bubble",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 6
  },
  {
    "slug": "rocket-lab-buys-iridium",
    "headline": "Rocket Lab to buy satellite operator Iridium in an $8 billion cash-and-stock deal",
    "overview": "Rocket Lab has agreed to acquire the satellite-communications company Iridium in a deal valuing it at about $8 billion, paying $54 a share in cash and stock. The acquisition pushes the launch company into operating its own global satellite network, with the deal expected to close in mid-2027.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMixAFBVV95cUxQejk2T29RQV9nS05KV205R1FobVVPcFFySVdTaEhkYzV4djZNVDlPaEpOQTF5bGYxMUVxTG1LekJabG5PZ2w0TUsxRjRrQm1EVzdBdHZ2dkZSNEVCS0toS2ROV1dBWk1OSkI3Qk9hRjB2bnlNcXdjNV9PYlJyaDNzbmhFM3otb2hQc2FpWUt2YWdjRGN2dDZPZWZVSExvdDFPcWdHYUJRMEs5eVFQT1ZoYnkyUGhSMVUzQzJZZDRmeWxCZWlj?oc=5"
      },
      {
        "name": "TechCrunch",
        "href": "https://techcrunch.com/2026/06/29/rocket-lab-continues-buying-spree-by-acquiring-satellite-company-iridium/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-29",
    "image": {
      "src": "/covers/rocket-lab-buys-iridium.png",
      "alt": "Rocket Lab's Launch Complex 1 on New Zealand's Mahia Peninsula",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 29 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The first transatlantic telegraph cable (1858/1866)",
        "excerpt": "After repeated failures and one cable that died within weeks, the Atlantic Telegraph Company finally bound the Old World to the New: on 16 August 1858 the first messages crossed the ocean, and the durable 1866 cable made permanent, near-instant communication between continents a reality. What had taken ten days by ship now took minutes. It was the original dream of girdling the planet in a single communications network, the same ambition Rocket Lab pursues by reaching not under the sea but above the sky.",
        "source": "Transatlantic telegraph cable, Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Transatlantic_telegraph_cable"
      },
      {
        "category": "historical",
        "title": "AT&T, the telephone upstart, swallows the telegraph giant Western Union",
        "excerpt": "Western Union had ridden the telegraph to a near-monopoly over American communications, the established colossus of its age. Yet in 1909 the younger American Telephone & Telegraph Company acquired control of the very giant whose technology it was rendering obsolete, an upstart absorbing the incumbent it had outgrown. The pattern echoes in Rocket Lab buying the established satellite operator Iridium: a fast-rising power devouring the entrenched one to control the whole chain.",
        "source": "History of AT&T, Wikipedia",
        "href": "https://en.wikipedia.org/wiki/History_of_AT%26T"
      },
      {
        "category": "literary",
        "title": "Puck girdles the earth in A Midsummer Night's Dream",
        "excerpt": "PUCK. I'll put a girdle round about the earth\nIn forty minutes.",
        "source": "William Shakespeare, A Midsummer Night's Dream, Act 2, Scene 1 (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/1778/pg1778.html"
      },
      {
        "category": "literary",
        "title": "The fall of Icarus in Ovid's Metamorphoses, Book VIII",
        "excerpt": "touched with a desire of reaching heaven, pursued his course still higher. The vicinity of the scorching Sun softened the fragrant wax that fastened his wings. The wax was melted; he shook his naked arms, and, wanting his oar-like wings, he caught no more air. His face, too, as he called on the name of his father, was received in the azure water, which received its name from him.",
        "source": "Ovid, Metamorphoses, Book VIII (trans. Henry T. Riley), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/26073/26073-h/26073-h.htm"
      },
      {
        "category": "artistic",
        "title": "Gustav Holst, The Planets, Op. 32",
        "excerpt": "Holst's sweeping orchestral suite gives each planet a character, from the hammering menace of Mars to the soaring nobility of Jupiter and the mystic dissolution of Neptune. Composed 1914-1917, it is the supreme musical embodiment of humanity's gaze into the heavens, mapping the solar system in sound. Its cosmic ambition mirrors a launch company reaching to operate its own constellation across the sky.",
        "source": "The Planets, Op.32 (Holst, Gustav), IMSLP",
        "href": "https://imslp.org/wiki/The_Planets,_Op.32_(Holst,_Gustav)"
      },
      {
        "category": "artistic",
        "title": "Pieter Bruegel the Elder, The Tower of Babel (1563)",
        "excerpt": "Bruegel's vast spiraling tower rises into the clouds, a monument to humanity's ambition to build a structure that would reach the heavens and unite all people under one name. Cracks and uneven tiers already hint at the hubris of the project. It is the archetypal image of mankind binding itself together and grasping for the sky, the mythic shadow of any quest to master the heavens.",
        "source": "Pieter Bruegel the Elder, The Tower of Babel (Vienna), 1563, Kunsthistorisches Museum (Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_the_Elder_-_The_Tower_of_Babel_(Vienna)_-_Google_Art_Project_-_edited.jpg",
        "image": {
          "src": "/covers/rocket-lab-buys-iridium--art.png",
          "alt": "Pieter Bruegel the Elder's 1563 painting of the Tower of Babel rising into the clouds",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 7
  },
  {
    "slug": "apple-india-antitrust-copy-paste",
    "headline": "Apple accuses India's antitrust regulator of 'copy-pasting' rivals' claims and seeks to quash the case",
    "overview": "Apple has accused investigators at the Competition Commission of India of 'copy-pasting' the claims of rivals such as Match and Paytm rather than conducting their own analysis, and has asked for the findings against it to be thrown out. The dispute centres on allegations that Apple abused its position over App Store payments, with a closed-door hearing set for July.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiyAFBVV95cUxQd3hWX013N1NMeEhOMWxxRkZhbFBrTGZ4ajhMS0ltUTBkZnFNcFk5U0RLLWtBRVd6RXl6RWpPR2hQREpFSUl6WlN3R0RndzlKQnVhenN4UUd5d2hQUnBQUDNENUVTbXJheXd2VVFEZXE4eDVsQ19uYlZjdVRudWthX3ZXWlpERk94V2x3NXZTRFBqNDcwZHlMOEozeWdkQlppNVZfcUlrSXhJa0V2azlxaWhhcVpmYUVUblpCYXV3MmxiOXhkeGgxNw?oc=5"
      },
      {
        "name": "Business Standard",
        "href": "https://www.business-standard.com/companies/news/apple-accuses-cci-of-copy-pasting-rivals-claims-in-antitrust-probe-126062900563_1.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-29",
    "image": {
      "src": "/covers/apple-india-antitrust-copy-paste.png",
      "alt": "Brass scales of justice before a sleek glass storefront",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 29 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Standard Oil Co. of New Jersey v. United States (1911)",
        "excerpt": "The colossus of its age, John D. Rockefeller's Standard Oil controlled some ninety percent of American oil refining, squeezing rivals through secret rebates and predatory pricing until the Supreme Court ruled it an unreasonable restraint of trade under the Sherman Act and ordered the trust dissolved into thirty-four companies. It is the archetypal trustbuster-versus-giant case: the gatekeeper of an entire industry broken open by the state. Chief Justice White's opinion announced the enduring \"rule of reason\" for judging monopoly power.",
        "source": "Standard Oil Co. of New Jersey v. United States, 221 U.S. 1 (1911), Cornell Legal Information Institute",
        "href": "https://www.law.cornell.edu/supremecourt/text/221/1"
      },
      {
        "category": "historical",
        "title": "United States v. Microsoft Corp. (2001)",
        "excerpt": "Microsoft was found to have unlawfully maintained its operating-system monopoly and to have tied its browser to Windows, the classic gatekeeper leveraging control of a platform. Strikingly close to Apple's gambit, Microsoft attacked the fairness of its judge: the D.C. Circuit disqualified District Judge Thomas Penfield Jackson for giving press interviews betraying bias, even as it affirmed the core monopolization finding. A tech giant escaping its breakup not by disproving the antitrust case but by impeaching the impartiality of the one who judged it.",
        "source": "United States v. Microsoft Corp., 253 F.3d 34 (D.C. Cir. 2001), opinion text (UC Berkeley Law)",
        "href": "https://www.law.berkeley.edu/files/US_v_Microsoft3.pdf"
      },
      {
        "category": "literary",
        "title": "The Lion's Share (Aesop)",
        "excerpt": "He then very carefully divided the Stag into four equal parts.\n\"I am King Lion,\" he said, when he had finished, \"so of course I get the first part. This next part falls to me because I am the strongest; and this is mine because I am the bravest.\"\nHe now began to glare at the others very savagely. \"If any of you have any claim to the part that is left,\" he growled, stretching his claws meaningly, \"now is the time to speak up.\"",
        "source": "\"The Lion's Share,\" The Aesop for Children (Library of Congress, read.gov)",
        "href": "https://read.gov/aesop/141.html"
      },
      {
        "category": "literary",
        "title": "Christian and Apollyon in the Valley of Humiliation (Bunyan)",
        "excerpt": "By this I perceive that thou art one of my subjects; for all that country is mine, and I am the prince and god of it.\n...\nThen Apollyon straddled quite over the whole breadth of the way, and said, I am void of fear in this matter.",
        "source": "John Bunyan, The Pilgrim's Progress (1890 ed.), \"The Fourth Stage,\" Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Pilgrim's_Progress_(1890)/The_Fourth_Stage"
      },
      {
        "category": "artistic",
        "title": "Johann Kuhnau, \"Der Streit zwischen David und Goliath\" (Biblical Sonata No. 1, 1700)",
        "excerpt": "The first of Kuhnau's six Biblical Sonatas is early program music that narrates the David and Goliath duel entirely on a keyboard: the boasting of the giant, the trembling of Israel, the whir of the slung stone, the fall of the colossus, and the rejoicing that follows. It is the perfect sonic emblem of the small challenger toppling the gatekeeping giant, a theme that haunts every monopoly fight. Published in Leipzig in 1700, it stands among the earliest descriptive instrumental music in the Western canon.",
        "source": "Johann Kuhnau, Musicalische Vorstellung einiger biblischer Historien (1700), IMSLP",
        "href": "https://imslp.org/wiki/Musicalische_Vorstellung_einiger_biblischer_Historien_(Kuhnau,_Johann)"
      },
      {
        "category": "artistic",
        "title": "\"Next!\" — the Standard Oil octopus (Udo Keppler, Puck, 1904)",
        "excerpt": "Udo Keppler's 1904 chromolithograph for Puck shows Standard Oil as a vast octopus, its tentacles already wrapped around state legislatures, the Capitol, and the steel and shipping industries, with one arm reaching hungrily toward the White House. It is the defining visual shorthand for monopoly as a strangling, toll-extracting colossus that captures the very institutions meant to check it. A fitting image for a gatekeeper accused of choking competition while battling the regulators at its door.",
        "source": "Udo J. Keppler, \"Next!\", Puck, Sept. 7, 1904 (Library of Congress; Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Standard_oil_octopus_loc_color.jpg",
        "image": {
          "src": "/covers/apple-india-antitrust-copy-paste--art.png",
          "alt": "1904 political cartoon depicting Standard Oil as an octopus whose tentacles grip the U.S. Capitol, state houses, and industries while reaching for the White House",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 8
  },
  {
    "slug": "delhi-ev-scrappage-incentive",
    "headline": "New Delhi to offer residents more than $1,000 to scrap old cars and switch to electric vehicles",
    "overview": "New Delhi has finalised a policy offering car owners a cash incentive of more than $1,000 to scrap older petrol and diesel vehicles and buy an electric vehicle, tying its biggest subsidies to taking high-emission cars off the road. The government says the measure, part of a new EV policy, is aimed at curbing the capital's notorious air pollution.",
    "genre": "Climate",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiuAFBVV95cUxQSHFTWEdOenVOclRpNmdCNF9SV1RTeXZUaGRSUTlPNGhmaHQzWVVNN2FXcE9CZ1lGMUs2bkJCcVRiTkJwSFg4LVh1NTlwdzRBb2ZzbkZjaG9ESi1FMm1fNzdVaXJDMjFkcVBQalRDU09QSzUxX2R5TDg5MWYxNmRIeWFWZnhhR1liZVgwdGI5ajR5YkdJNWk4MDN3Tm5XX0RQREx3R2VjQzAybU1rTFhXR05LdThEQlB5?oc=5"
      },
      {
        "name": "Outlook Business",
        "href": "https://www.outlookbusiness.com/news/delhi-ev-policy-20-subsidies-scrappage-benefits-and-neighborhood-charging-for-2026"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-29",
    "image": {
      "src": "/covers/delhi-ev-scrappage-incentive.png",
      "alt": "A New Delhi street shrouded in heavy air pollution",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 29 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Great Smog of London (1952) and the Clean Air Act",
        "excerpt": "In December 1952 a high-pressure inversion trapped coal smoke and sulphur dioxide over London, turning the city into a deadly, choking pall that killed an estimated thousands and brought transport to a standstill. The disaster shocked Britain into passing the Clean Air Act of 1956, which created smoke-control areas and pushed households off raw coal toward cleaner fuels. Like Delhi paying to retire its dirtiest cars, Britain decided that clearing the air meant deliberately driving the worst polluters out of the city.",
        "source": "Encyclopaedia Britannica, \"Great Smog of London\"",
        "href": "https://www.britannica.com/event/Great-Smog-of-London"
      },
      {
        "category": "historical",
        "title": "The Great Stink of 1858 and Bazalgette's London sewers",
        "excerpt": "When the stench of the sewage-choked Thames drove Members of Parliament from their chamber in the hot summer of 1858, the civil engineer Sir Joseph William Bazalgette designed a vast main-drainage system of intercepting sewers to carry the city's filth away. Opened in 1865 and completed in 1875, the network cleansed the river and is credited with ending London's cholera epidemics. It is the classic case of a great capital spending heavily to purge an old, sickening contamination and make way for a healthier city.",
        "source": "Encyclopaedia Britannica, \"Sir Joseph William Bazalgette\"",
        "href": "https://www.britannica.com/biography/Joseph-William-Bazalgette"
      },
      {
        "category": "literary",
        "title": "Sophocles, Oedipus the King — the plague-pall over Thebes",
        "excerpt": "A blight is on our harvest in the ear,\nA blight upon the grazing flocks and herds...\nArmed with his blazing torch the God of Plague\nHath swooped upon our city emptying\nThe house of Cadmus, and the murky realm\nOf Pluto is full fed with groans and tears.",
        "source": "Sophocles, Oedipus King of Thebes (trans. F. Storr), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/31/31-h/31-h.htm"
      },
      {
        "category": "literary",
        "title": "Shakespeare, Hamlet — \"a foul and pestilent congregation of vapours\"",
        "excerpt": "this most excellent canopy the air, look you, this brave o'erhanging firmament, this majestical roof fretted with golden fire, why, it appears no other thing to me than a foul and pestilent congregation of vapours.",
        "source": "William Shakespeare, Hamlet, Act II, Scene II, Project Gutenberg",
        "href": "https://www.gutenberg.org/files/1524/1524-h/1524-h.htm"
      },
      {
        "category": "artistic",
        "title": "Vaughan Williams, A London Symphony (Symphony No. 2)",
        "excerpt": "Ralph Vaughan Williams's second symphony evokes a great city wreathed in mist and river haze, its movements drifting from the muffled chimes of the Thames embankment to the surging clamour of the streets. The music holds together the murk and the grandeur of London, the same brooding atmosphere of smoke and fog that hangs over Monet's Westminster and over smog-bound capitals like Delhi. It is a portrait of an industrial metropolis breathing through its own grey air.",
        "source": "Ralph Vaughan Williams, A London Symphony (Symphony No. 2), IMSLP",
        "href": "https://imslp.org/wiki/A_London_Symphony_(Symphony_No.2)_(Vaughan_Williams,_Ralph)"
      },
      {
        "category": "artistic",
        "title": "Claude Monet, Houses of Parliament, London (1900-1901)",
        "excerpt": "Monet painted the Palace of Westminster again and again as a spectral silhouette dissolving in London's thick, coal-tinged fog, the river and sky merged into a single luminous haze. The series turns industrial smog into something hauntingly beautiful while documenting exactly the kind of choking urban air that modern cities now race to clear. It is the visual archetype of a great capital seen through a pall of pollution.",
        "source": "Claude Monet, \"Houses of Parliament, London\" (Art Institute of Chicago), Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Claude_Monet_-_Houses_of_Parliament,_London.jpg",
        "image": {
          "src": "/covers/delhi-ev-scrappage-incentive--art.png",
          "alt": "Monet's impressionist painting of the Houses of Parliament looming as a dark silhouette through dense London fog over the Thames",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 9
  },
  {
    "slug": "drc-bans-gatherings-ebola",
    "headline": "DR Congo bans mass gatherings in its capital to curb a growing Ebola outbreak",
    "overview": "The Democratic Republic of Congo has banned mass gatherings in the capital, Kinshasa, and stepped up screening to prevent the spread of an Ebola outbreak that has become one of the largest on record. More than 1,000 cases have been confirmed, with the eastern Ituri province the worst affected.",
    "genre": "Science",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c992k7zk981o"
      },
      {
        "name": "WHO",
        "href": "https://www.who.int/emergencies/situations/ebola-outbreak---drc-2026"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-29",
    "image": {
      "src": "/covers/drc-bans-gatherings-ebola.png",
      "alt": "A health worker in goggles and a mask holding a thermometer during the Ebola outbreak",
      "credit": "BBC"
    },
    "edition": "Evening Edition · 29 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Birth of Quarantine in Ragusa and Venice (1377-1448)",
        "excerpt": "As the Black Death tore through Europe, the Adriatic port city of Ragusa (modern Dubrovnik) in 1377 became the first to legally enforce isolation, requiring arriving ships and travelers to wait in a restricted place for thirty days (a trentino) before entering the city to see whether the symptoms of plague would appear. Venice later extended the waiting period to forty days, the quarantena that gives us the word quarantine, sealing the city's gates against pestilence by holding suspected carriers at bay. These medieval measures of detention, isolation, and the throttling of free movement are the direct ancestors of Kinshasa's screening and gathering bans.",
        "source": "Sarah Pruitt, \"Social Distancing and Quarantine Were Used in Medieval Times to Fight the Black Death,\" History.com",
        "href": "https://www.history.com/articles/quarantine-black-death-medieval"
      },
      {
        "category": "historical",
        "title": "Thucydides, The Plague of Athens (430 BC)",
        "excerpt": "An aggravation of the existing calamity was the influx from the country into the city, and this was especially felt by the new arrivals.  As there were no houses to receive them, they had to be lodged at the hot season of the year in stifling cabins, where the mortality raged without restraint.  The bodies of dying men lay one upon another, and half-dead creatures reeled about the streets and gathered round all the fountains in their longing for water.",
        "source": "Thucydides, History of the Peloponnesian War, Book 2 (Crawley trans.), via Wikisource",
        "href": "https://en.wikisource.org/wiki/History_of_the_Peloponnesian_War/Book_2"
      },
      {
        "category": "literary",
        "title": "Daniel Defoe, A Journal of the Plague Year (1722)",
        "excerpt": "That all plays, bear-baitings, games, singing of ballads, buckler-play, or such-like causes of assemblies of people be utterly prohibited.",
        "source": "Daniel Defoe, A Journal of the Plague Year, Project Gutenberg eBook #376",
        "href": "https://www.gutenberg.org/files/376/376-h/376-h.htm"
      },
      {
        "category": "literary",
        "title": "Giovanni Boccaccio, The Decameron, Proem (1353)",
        "excerpt": "Some there were who conceived that to live moderately and keep oneself from all excess was the best defence against such a danger; wherefore, making up their company, they lived removed from every other and shut themselves up in those houses where none had been sick and where living was best.",
        "source": "Giovanni Boccaccio, The Decameron (Payne trans.), Project Gutenberg eBook #23700",
        "href": "https://www.gutenberg.org/cache/epub/23700/pg23700.txt"
      },
      {
        "category": "artistic",
        "title": "Franz Liszt, Totentanz (Dance of Death), S.126",
        "excerpt": "Liszt's Totentanz for piano and orchestra is a thunderous set of variations on the medieval Dies Irae plainchant, the sequence sung over the dead since the age of plague. Its grim, hammering paraphrase of the Dance of Death evokes the universal leveling power of pestilence, in which all ranks of a city are summoned alike to the grave. The work channels the same dread of contagion and mass mortality that drives a capital to bolt its doors and forbid its crowds.",
        "source": "Franz Liszt, Totentanz, S.126, work page on IMSLP",
        "href": "https://imslp.org/wiki/Totentanz,_S.126_(Liszt,_Franz)"
      },
      {
        "category": "artistic",
        "title": "Nicolas Poussin, The Plague at Ashdod (1630-1631)",
        "excerpt": "Poussin's canvas depicts the biblical plague that struck the Philistine city of Ashdod after the Ark was seized, the streets strewn with the dead and dying while the living recoil, cover their faces, and flee the contagion. Stricken bodies sprawl beside infants clinging to dead mothers as terrified citizens point and scatter, the architecture of a great city emptying in panic. Painted during a plague outbreak in Italy, it crystallizes the ancient terror of pestilence loosed within a city's walls.",
        "source": "Nicolas Poussin, The Plague at Ashdod, Musee du Louvre (INV 7276), via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:La_Peste_d%27Asdod_-_Nicolas_Poussin_-_Mus%C3%A9e_du_Louvre_Peintures_INV_7276_%3B_MR_2312.jpg",
        "image": {
          "src": "/covers/drc-bans-gatherings-ebola--art.png",
          "alt": "Baroque painting of plague-stricken Ashdod, with the dead and dying in the streets and panicked citizens fleeing amid classical architecture.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 10
  },
  {
    "slug": "antarctica-first-dinosaur-bone",
    "headline": "First dinosaur bone from Antarctica identified after lying forgotten in a museum drawer for 40 years",
    "overview": "Scientists have identified the first dinosaur bone ever found in Antarctica — a titanosaur tail bone collected on James Ross Island in 1985 that sat unrecognised in a British Antarctic Survey drawer for four decades. The fossil dates to about 82 million years ago, when Antarctica was covered in forest, confirming that the giant plant-eaters roamed the polar continent.",
    "genre": "Science",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cdep67jnn9zo"
      },
      {
        "name": "The Daily Beast",
        "href": "https://www.thedailybeast.com/scientists-stumble-on-historic-discovery-of-dinosaur-bone-in-forgotten-drawer/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-29",
    "image": {
      "src": "/covers/antarctica-first-dinosaur-bone.png",
      "alt": "The fossilised titanosaur tail bone resting on a map of Antarctica",
      "credit": "BBC"
    },
    "edition": "Evening Edition · 29 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Mary Anning and the fossils of Lyme Regis",
        "excerpt": "From childhood, Mary Anning combed the crumbling cliffs of Lyme Regis on the Dorset coast, prising the bones of vanished sea-dragons from the Jurassic rock. In 1811 her brother spotted an ichthyosaur skull, and Mary, then about twelve, painstakingly excavated the rest of the five-metre skeleton over the following months. Her finds reshaped science, yet for decades the unsung collector who unearthed them went largely uncredited, her discoveries scattered into museum cases under other men's names.",
        "source": "Natural History Museum, London — \"Mary Anning: the unsung hero of fossil discovery\"",
        "href": "https://www.nhm.ac.uk/discover/mary-anning-unsung-hero.html"
      },
      {
        "category": "historical",
        "title": "Gideon Mantell and the first dinosaurs",
        "excerpt": "In 1825 the English physician Gideon Mantell described Iguanodon from a handful of fossil teeth whose resemblance to those of a living iguana convinced him he had found a giant extinct reptile. It became only the second creature ever named scientifically as a dinosaur, alongside Buckland's Megalosaurus, opening humanity's eyes to a lost world of vanished giants. The story is one of patient inference: from a few overlooked fragments, an entire prehistoric age was reconstructed.",
        "source": "Encyclopaedia Britannica — \"Iguanodon\"",
        "href": "https://www.britannica.com/animal/Iguanodon"
      },
      {
        "category": "literary",
        "title": "Shelley, \"Ozymandias\" (1818)",
        "excerpt": "I met a Traveller from an antique land,\nWho said, \"Two vast and trunkless legs of stone\nStand in the desart. Near them, on the sand,\nHalf sunk, a shattered visage lies, whose frown,\nAnd wrinkled lip, and sneer of cold command,\nTell that its sculptor well those passions read,\nWhich yet survive, stamped on these lifeless things,\nThe hand that mocked them, and the heart that fed:\n...\nNo thing beside remains. Round the decay\nOf that Colossal Wreck, boundless and bare,\nThe lone and level sands stretch far away.",
        "source": "Percy Bysshe Shelley, \"Ozymandias,\" The Examiner (11 January 1818), via Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Examiner_(London)/Ozymandias"
      },
      {
        "category": "literary",
        "title": "The Valley of Dry Bones (Ezekiel 37)",
        "excerpt": "The hand of the LORD was upon me, and carried me out in the spirit of the LORD, and set me down in the midst of the valley which was full of bones,\nAnd caused me to pass by them round about: and, behold, there were very many in the open valley; and, lo, they were very dry.\nAnd he said unto me, Son of man, can these bones live? And I answered, O Lord GOD, thou knowest.",
        "source": "Ezekiel 37:1-3, King James Version, via Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Ezekiel"
      },
      {
        "category": "artistic",
        "title": "Saint-Saens, \"Fossils\" from The Carnival of the Animals",
        "excerpt": "In the twelfth movement of his 1886 zoological fantasy, Camille Saint-Saens set the xylophone clattering like dry bones rattling in a drawer, its brittle, skeletal melody evoking creatures long turned to stone. He slyly quotes his own \"Danse macabre\" and old French tunes, as if half-remembered relics of the past were surfacing into the present. It is the perfect musical image of vanished giants stirred briefly back to life.",
        "source": "Camille Saint-Saens, Le carnaval des animaux (1886), no. 12 \"Fossiles\" — IMSLP",
        "href": "https://imslp.org/wiki/Le_carnaval_des_animaux_(Saint-Sa%C3%ABns,_Camille)"
      },
      {
        "category": "artistic",
        "title": "John Martin, \"The Country of the Iguanodon\" (1837)",
        "excerpt": "John Martin's apocalyptic watercolour, made to accompany Gideon Mantell's writings, imagines the lost antediluvian world the first dinosaur bones revealed: monstrous reptiles battling beneath a stormy, primeval sky. It was among the earliest attempts to picture deep time, to clothe scattered fossil fragments in living flesh. The painting captures exactly the vertigo of the deep past surfacing into the human imagination.",
        "source": "John Martin, \"The Country of the Iguanodon\" (1837), Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:John_Martin_-_The_country_of_the_Iguanodon_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/antarctica-first-dinosaur-bone--art.png",
          "alt": "John Martin's 1837 watercolour depicting prehistoric Iguanodon and other giant reptiles in a dramatic primeval landscape",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 11
  },
  {
    "slug": "bet-awards-2026-lauryn-hill",
    "headline": "Lauryn Hill honored and Janet Jackson stuns at the 2026 BET Awards as Teyana Taylor is moved to tears",
    "overview": "The 2026 BET Awards honored Lauryn Hill and featured a show-stopping appearance by Janet Jackson that left fellow artist Teyana Taylor in tears. The night, a celebration of Black music and culture, also saw the comedian Druski make history.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMigwFBVV95cUxORVlCbHBDWHNKZURjS2RwYkw5S1NNUzB0V19DaUktaDB3LWxMZ0cxWTloSEpLQTBnWUd0aWxkcGJTVi1OX25tckQzeER4WjJBOUlsTHF0R29FRk5seGhFcVJDMmRWbXY4VUJhYTlCN1hQblJBVFg1dDdKaXM4M3Rqd3pUcw?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cpd3y6lv819o"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-29",
    "image": {
      "src": "/covers/bet-awards-2026-lauryn-hill.png",
      "alt": "Singer Teyana Taylor reacting emotionally at the BET Awards",
      "credit": "BBC"
    },
    "edition": "Evening Edition · 29 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Pythian Games at Delphi: the singing contest crowned with laurel",
        "excerpt": "The oldest contest and the one for which they first offered prizes was, according to tradition, the singing of a hymn to the god. The man who sang and won the prize was Chrysothemis of Crete, whose father Carmanor is said to have cleansed Apollo. After Chrysothemis, says tradition, Philammon won with a song, and after him his son Thamyris.",
        "source": "Pausanias, Description of Greece 10.7.2, trans. W. H. S. Jones (Perseus Digital Library, Tufts University)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0160:book=10:chapter=7"
      },
      {
        "category": "historical",
        "title": "The crowning of Petrarch as poet laureate on the Capitol (1341)",
        "excerpt": "There, in the month of April, Petrarch assumed the poet's crown upon the Capitol from the hand of the Roman senator amid the plaudits of the people and the patricians.",
        "source": "\"Petrarch,\" Encyclopaedia Britannica, 11th ed. (1911), via Wikisource",
        "href": "https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Petrarch"
      },
      {
        "category": "literary",
        "title": "Demodocus the bard and the weeping of Odysseus (Homer, Odyssey VIII)",
        "excerpt": "When the bard left off singing he wiped the tears from his eyes, uncovered his face, and, taking his cup, made a drink-offering to the gods; but when the Phaeacians pressed Demodocus to sing further, for they delighted in his lays, then Ulysses again drew his mantle over his head and wept bitterly. No one noticed his distress except Alcinous, who was sitting near him.",
        "source": "Homer, The Odyssey, Book VIII, trans. Samuel Butler (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/1727/pg1727.txt"
      },
      {
        "category": "literary",
        "title": "Pindar's Olympian Ode 1: the victory crowned in song",
        "excerpt": "Water is best, and gold, like a blazing fire in the night, stands out supreme of all lordly wealth.",
        "source": "Pindar, Olympian Ode 1 (for Hieron of Syracuse, 476 BC), trans. Diane Arnson Svarlien (Perseus Digital Library, Tufts University)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0162:book%3DO."
      },
      {
        "category": "artistic",
        "title": "Handel, Zadok the Priest (Coronation Anthem No. 1, HWV 258)",
        "excerpt": "Handel composed Zadok the Priest for the coronation of George II in 1727, and it has been sung at the anointing of every British monarch since. Its hushed, swelling string introduction erupting into a blaze of choral and trumpet acclamation makes it the archetypal sound of public crowning and triumphal celebration — a fitting echo of a community rising to honor and exalt its own.",
        "source": "George Frideric Handel, Zadok the Priest, HWV 258 (IMSLP / Petrucci Music Library)",
        "href": "https://imslp.org/wiki/Zadok_the_Priest,_HWV_258_(Handel,_George_Frideric)"
      },
      {
        "category": "artistic",
        "title": "Raphael, The Parnassus (1509-1511)",
        "excerpt": "In this fresco in the Vatican's Stanza della Segnatura, Raphael gathers Apollo playing his lyre on Mount Parnassus, encircled by the nine Muses and the great poets of antiquity and his own age. It is a painted festival of song — a vision of artists assembled, honored, and bound into a single lineage of acclaim. The laurel-laden grove crowns poetry itself as the shared inheritance of a creative community.",
        "source": "Raphael (Raffaello Sanzio), The Parnassus, fresco, Stanza della Segnatura, Vatican (Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Raphael_-_The_Parnassus.jpg",
        "image": {
          "src": "/covers/bet-awards-2026-lauryn-hill--art.png",
          "alt": "Raphael's fresco The Parnassus, showing Apollo playing the lyre among the nine Muses and assembled poets on Mount Parnassus",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 12
  },
  {
    "slug": "swiss-institute-bowery-home",
    "headline": "New York's Swiss Institute buys its first permanent home, on the Bowery, after nearly 40 years",
    "overview": "The Swiss Institute, a contemporary-art nonprofit that has moved repeatedly during its almost four decades in New York, has bought a permanent home at 250 Bowery on the Lower East Side. The building, which once housed the International Center of Photography, will expand the institute's space by more than half when it opens in spring 2027.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Artforum",
        "href": "https://www.artforum.com/news/swiss-institute-announces-new-permanent-home-on-bowery-1234753568/"
      },
      {
        "name": "The Art Newspaper",
        "href": "https://www.theartnewspaper.com/2026/06/29/new-york-swiss-institute-buys-permanent-home-on-the-bowery"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-29",
    "image": {
      "src": "/covers/swiss-institute-bowery-home.png",
      "alt": "The Swiss Institute's new building at 250 Bowery in New York",
      "credit": "Artforum"
    },
    "edition": "Evening Edition · 29 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "From the portable Tabernacle to Solomon's permanent Temple",
        "excerpt": "For nearly forty years of wilderness wandering, Israel worshipped in the Tabernacle, a portable tent-sanctuary that could be struck and carried from camp to camp. Only once the people had finally settled the land did that itinerant shrine give way to a fixed house: Solomon's Temple in Jerusalem, after which the wandering sanctuary no longer served a purpose. The movable tent became, at last, a building meant to stand.",
        "source": "\"Tabernacle,\" Encyclopaedia Britannica",
        "href": "https://www.britannica.com/topic/Tabernacle"
      },
      {
        "category": "historical",
        "title": "The Whitney Museum settles into a permanent home",
        "excerpt": "The Whitney Museum of American Art opened in Greenwich Village in 1931 and then relocated repeatedly, moving uptown to Marcel Breuer's Madison Avenue building in 1966. After decades of shifting quarters, it finally put down roots downtown in 2015, opening Renzo Piano's purpose-built home in the meatpacking district, ending a long institutional itinerancy with a lasting house of its own.",
        "source": "\"Whitney Museum of American Art,\" Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Whitney_Museum_of_American_Art"
      },
      {
        "category": "literary",
        "title": "Aeneas destined to build a lasting home in Italy",
        "excerpt": "Thy son (nor is th' appointed season far)\nIn Italy shall wage successful war,\nShall tame fierce nations in the bloody field,\nAnd sov'reign laws impose, and cities build.",
        "source": "Virgil, Aeneid, Book I, trans. John Dryden (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/228/228-h/228-h.htm"
      },
      {
        "category": "literary",
        "title": "Solomon builds the house of the LORD",
        "excerpt": "And it came to pass in the four hundred and eightieth year after the children of Israel were come out of the land of Egypt, in the fourth year of Solomon's reign over Israel, in the month Zif, which is the second month, that he began to build the house of the LORD.",
        "source": "1 Kings 6:1, King James Version (Wikisource)",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/1_Kings"
      },
      {
        "category": "artistic",
        "title": "Handel, Solomon, HWV 67",
        "excerpt": "Handel's 1748 oratorio Solomon draws on the books of Kings and Chronicles to celebrate the wise king at the height of his reign, with its second part centering on the consecration of the newly built Temple. The music turns the founding of a permanent house of worship into grand choral splendor, a fitting score for the moment a wandering institution finally raises lasting walls. Its famous orchestral interlude, \"The Arrival of the Queen of Sheba,\" frames the Temple as a destination worth journeying toward.",
        "source": "George Frideric Handel, Solomon, HWV 67 (IMSLP)",
        "href": "https://imslp.org/wiki/Solomon,_HWV_67_(Handel,_George_Frideric)"
      },
      {
        "category": "artistic",
        "title": "James Tissot, Solomon Dedicates the Temple at Jerusalem",
        "excerpt": "James Tissot's late watercolor depicts the climactic moment when the long-awaited permanent Temple is consecrated, the king and his people gathered before the finished house they will no longer have to carry. After generations of a portable sanctuary, the painting captures the solemn joy of putting down roots in a fixed dwelling. It renders in vivid detail the passage from itinerant worship to an enduring temple.",
        "source": "James Tissot, Solomon Dedicates the Temple at Jerusalem (c. 1896-1902), Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Tissot_Solomon_Dedicates_the_Temple_at_Jerusalem.jpg",
        "image": {
          "src": "/covers/swiss-institute-bowery-home--art.png",
          "alt": "Watercolor of King Solomon and the assembled Israelites dedicating the newly built Temple at Jerusalem",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 13
  },
  {
    "slug": "us-iran-stand-down-hormuz",
    "headline": "US and Iran agree to stand down after exchange of strikes near the Strait of Hormuz",
    "overview": "Washington and Tehran have agreed to \"stand down\" after several days of tit-for-tat strikes around the Strait of Hormuz that had threatened their fragile ceasefire, a US official said. Vessels will again pass through the waterway freely and talks aimed at ending the war are due to resume in Doha, easing fears of a wider Gulf conflict and helping oil prices cool.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c872rjw17qpo"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMigAFBVV95cUxPYUFwVXVYYUk3ZXZGYUhac1BmQjhYN1JiSHM5SlhvWW9taHVTRkFZeVlrNFVfTl8wQVY0VTc3ekNEd1EyX2NMYjdNZXFwWi1WMFJWTHVIaE8yNTNNVWR4NkFHelBmSFlwYWdjRTZQREo4elhtYnNhZ3RMMjg2ckttSw?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-29",
    "image": {
      "src": "/covers/us-iran-stand-down-hormuz.png",
      "alt": "Warships and a tanker in the haze of the Strait of Hormuz at dusk",
      "credit": "BBC"
    },
    "lead": true,
    "edition": "Afternoon Edition · 29 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Proclamation 3504: Interdiction of the Delivery of Offensive Weapons to Cuba",
        "excerpt": "In carrying out this order, force shall not be used except in case of failure or refusal to comply with directions, or with regulations or directives of the Secretary of Defense issued hereunder, after reasonable efforts have been made to communicate them to the vessel or craft, or in case of self-defense. In any case, force shall be used only to the extent necessary.",
        "source": "Proclamation 3504, John F. Kennedy, October 23, 1962 (American Presidency Project)",
        "href": "https://www.presidency.ucsb.edu/documents/proclamation-3504-interdiction-the-delivery-offensive-weapons-cuba"
      },
      {
        "category": "historical",
        "title": "Treaty of Ghent (1814)",
        "excerpt": "There shall be a firm and universal Peace between His Britannic Majesty and the United States, and between their respective Countries, Territories, Cities, Towns, and People of every degree without exception of places or persons. All hostilities both by sea and land shall cease as soon as this Treaty shall have been ratified by both parties.",
        "source": "Treaty of Ghent, December 24, 1814 (The Avalon Project, Yale Law School)",
        "href": "https://avalon.law.yale.edu/19th_century/ghent.asp"
      },
      {
        "category": "literary",
        "title": "The Melian Dialogue, History of the Peloponnesian War, Book V",
        "excerpt": "For ourselves, we shall not trouble you with specious pretences... and make a long speech which would not be believed; and in return we hope that you... will aim at what is feasible, holding in view the real sentiments of us both; since you know as well as we do that right, as the world goes, is only in question between equals in power, while the strong do what they can and the weak suffer what they must.",
        "source": "Thucydides, History of the Peloponnesian War (Crawley translation)",
        "href": "https://www.gutenberg.org/cache/epub/7142/pg7142.txt"
      },
      {
        "category": "literary",
        "title": "The Persians",
        "excerpt": "And straight to all his captains gave this charge—\nAs soon as sunlight warms the ground no more,\nAnd gloom enwraps the sanctuary of sky,\nRange we our fleet in triple serried lines\nTo bar the passage from the seething strait,\nThis way and that: let other ships surround\nThe isle of Ajax... So spake the king,\nInspired at heart with over-confidence,\nUnwitting of the gods' predestined will.",
        "source": "Aeschylus, The Persians, in Four Plays of Aeschylus (E. D. A. Morshead translation)",
        "href": "https://www.gutenberg.org/files/8714/8714-h/8714-h.htm"
      },
      {
        "category": "artistic",
        "title": "1812 Overture, Op. 49",
        "excerpt": "Tchaikovsky's festival overture stages the very arc of brinkmanship and reprieve: a solemn hymn for the threatened nation gives way to clashing martial themes that collide like fleets in a narrow sea, cannon fire punching through the orchestra. Then the storm breaks, the antagonist's anthem is overwhelmed, and bells peal a hard-won deliverance—great powers pulling back from ruin into triumph.",
        "source": "Pyotr Ilyich Tchaikovsky, 1812 Overture, Op. 49 (1880), IMSLP",
        "href": "https://imslp.org/wiki/1812_Overture,_Op.49_(Tchaikovsky,_Pyotr)"
      },
      {
        "category": "artistic",
        "title": "Die Seeschlacht bei Salamis (The Battle of Salamis)",
        "excerpt": "Kaulbach crowds the canvas with locked galleys and tumbling oarsmen in a strangling channel, where a great navy's overreach turns to chaos amid spray, sail, and fallen bodies. Above the carnage Greek figures surge with defiant resolve, a vision of an empire checked at a narrow strait—the perennial peril, and the deliverance, of contesting freedom of the seas.",
        "source": "Wilhelm von Kaulbach, Die Seeschlacht bei Salamis (1868), Maximilianeum, Munich (Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Kaulbach,_Wilhelm_von_-_Die_Seeschlacht_bei_Salamis_-_1868.JPG",
        "image": {
          "src": "/covers/us-iran-stand-down-hormuz--art.png",
          "alt": "Painting of the naval Battle of Salamis",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 14
  },
  {
    "slug": "europe-heatwave-record-deaths",
    "headline": "Europe's heatwave linked to more than 1,300 deaths as Germany hits a record 41.7C",
    "overview": "The World Health Organization says Europe's unprecedented early-summer heatwave has been linked to more than 1,300 excess deaths since 21 June, calling heat a \"silent killer.\" Germany reached a record 41.7C and France reported around 1,000 more deaths than expected since Wednesday as the extreme heat pushed eastward across the continent.",
    "genre": "Climate",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cn4d2vv935lo"
      },
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMiswFBVV95cUxPNWp3QVd0ZG5MR05VMklHaHZYRVFsSmtibXdaV2pORDBIVXhfSFNwaGt4QUl4blQzeUNzMjV0S2NxbUtVbHh1a290NTB5ZGxXNnBiNjhab0g0dzRjTjVUM3N6Z091cTJZWHdwcEFxMDZZc0doSlZsVHQxS3d4T2VTZ1dzVmJYb19aYnpnUXpVajhLeWE4NW4xYW9kaTJDTGZqRVNEeTBxM0N6Znh1alhqeVVYdw?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-29",
    "image": {
      "src": "/covers/europe-heatwave-record-deaths.png",
      "alt": "A sun-scorched European city baking under a hazy white sky during a heatwave",
      "credit": "BBC"
    },
    "edition": "Afternoon Edition · 29 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The 2003 European Heatwave",
        "excerpt": "In August 2003 a stagnant dome of heat settled over the continent and became the deadliest such event in modern European memory, killing an estimated 70,000 people, with roughly 15,000 deaths in France alone. The victims were overwhelmingly the elderly and the isolated, who perished quietly in apartments that never cooled, even at night. It was the hottest summer Europe had seen in centuries, and it taught the continent that heat is a silent killer that strikes hardest at the frail.",
        "source": "Encyclopaedia Britannica",
        "href": "https://www.britannica.com/event/European-heat-wave-of-2003"
      },
      {
        "category": "historical",
        "title": "The 1936 North American Heat Wave (Dust Bowl)",
        "excerpt": "During the depths of the Dust Bowl in July 1936, a merciless heat wave baked the United States and Canada, killing about 5,000 people as thermometers climbed past 120 degrees Fahrenheit on the drought-stricken plains. Stripped of vegetation by failed farming, the land had no power to moderate the scorching air, and the dead piled up in sweltering cities and parched farmsteads alike. Many of the state temperature records it set stood unbroken for more than seventy years.",
        "source": "National Weather Service (NOAA)",
        "href": "https://www.weather.gov/ilx/july1936heat"
      },
      {
        "category": "literary",
        "title": "The Rime of the Ancient Mariner",
        "excerpt": "All in a hot and copper sky,\nThe bloody Sun, at noon,\nRight up above the mast did stand,\nNo bigger than the Moon.\n\nDay after day, day after day,\nWe stuck, nor breath nor motion;\nAs idle as a painted ship\nUpon a painted ocean.\n\nWater, water, every where,\nAnd all the boards did shrink;\nWater, water, every where,\nNor any drop to drink.",
        "source": "Samuel Taylor Coleridge (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/151/151-h/151-h.htm"
      },
      {
        "category": "literary",
        "title": "The Book of Jonah 4:7-8 (King James Bible)",
        "excerpt": "7 But God prepared a worm when the morning rose the next day, and it smote the gourd that it withered. 8 And it came to pass, when the sun did arise, that God prepared a vehement east wind; and the sun beat upon the head of Jonah, that he fainted, and wished in himself to die, and said, It is better for me to die than to live.",
        "source": "King James Bible, Jonah (Wikisource)",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Jonah"
      },
      {
        "category": "artistic",
        "title": "L'estate (Summer), from The Four Seasons",
        "excerpt": "Vivaldi's Summer concerto in G minor (Op. 8, No. 2, RV 315) is music wilted by heat: languid violins droop under an oppressive sun, men and flocks faint in the sweltering stillness, and even the cuckoo and turtledove sing wearily. The composer's own accompanying sonnet describes a season under the merciless sun before the heat erupts into a violent summer storm. It is one of the earliest vivid musical portraits of human frailty before the elements.",
        "source": "Antonio Vivaldi (IMSLP)",
        "href": "https://imslp.org/wiki/The_Four_Seasons_(Vivaldi,_Antonio)"
      },
      {
        "category": "artistic",
        "title": "El Khasné, Petra",
        "excerpt": "Frederic Edwin Church's 1874 painting bathes the rose-red rock temple of Petra in the burning, golden light of a desert sun, the sandstone cliffs glowing as if heated to the touch. Tiny human figures are dwarfed by the vast, sun-scorched canyon, emphasizing human smallness before an arid and merciless landscape. The image captures the beauty and the menace of a world ruled by relentless heat.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:El_Khasne,_Petra_Frederic_Edwin_Church.jpg",
        "image": {
          "src": "/covers/europe-heatwave-record-deaths--art.png",
          "alt": "Sun-drenched rock temple of Petra by Frederic Edwin Church",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 15
  },
  {
    "slug": "venezuela-earthquake-survivors-rescued",
    "headline": "Rescuers pull survivors from the rubble four days after twin Venezuela earthquakes kill about 1,450",
    "overview": "Four days after twin earthquakes devastated Venezuela and killed at least 1,450 people, rescue teams are still pulling survivors from collapsed buildings, including a mother and her 18-day-old baby. Footage of the infant's rescue has been shared worldwide as a rare symbol of hope amid the search for the missing.",
    "genre": "Science",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/clyw3rkj2p7o"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMixwFBVV95cUxOVEpJTmpsemVuX3FnVE9RZU9iT3VGUkdPTmt5VjlwV0dwMzBsTWlQeTNBR3pZRVdwUXN0Tks0YlM2XzltXzN4QzFRdTZ4cUMyV2w4V0hmbkpyeFNQaUtkRUZILWZQQ0ZvNmhUX1RvWjNMY2VNVUxhU2JfbF9va1pJVEF1NkpYV3BPTUc4WTJfSGtxcjF5MnhGaWpiM1J5QXlyZUlGY19FSWlZamd6OFlTdGhzTHZHMzNPckRuYy1LMlFRU1ZBQWxz?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-29",
    "image": {
      "src": "/covers/venezuela-earthquake-survivors-rescued.png",
      "alt": "Rescuers searching the rubble of a collapsed building after an earthquake",
      "credit": "BBC"
    },
    "edition": "Afternoon Edition · 29 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Rev. Charles Davy's Eyewitness Account of the Lisbon Earthquake (1755)",
        "excerpt": "The house I was in shook with such violence, that the upper stories immediately fell; and though my apartment (which was the first floor) did not then share the same fate, yet everything was thrown out of its place in such a manner that it was with no small difficulty I kept my [feet] ... I expected nothing less than to be soon crushed to death, as the walls continued rocking to and fro in the frightfulest manner, opening in several places; large stones falling down on every side.",
        "source": "Rev. Charles Davy, \"The Earthquake at Lisbon, 1755,\" Fordham Modern History Sourcebook",
        "href": "https://sourcebooks.fordham.edu/mod/1755lisbonquake.asp"
      },
      {
        "category": "historical",
        "title": "The 1908 Messina Earthquake",
        "excerpt": "At dawn on 28 December 1908 a quake and tsunami flattened Messina and Reggio Calabria, killing tens of thousands as homes folded onto sleeping families. For weeks afterward rescuers clawed through the rubble with bare hands, and again and again pulled out whole families still alive, some discovered days after the shock had buried them. Naval crews and the Red Cross raced to the ruined coast, and survivors emerged blinking into a city that had become a single vast graveyard.",
        "source": "\"1908 Messina earthquake,\" Wikipedia",
        "href": "https://en.wikipedia.org/wiki/1908_Messina_earthquake"
      },
      {
        "category": "literary",
        "title": "The Book of Numbers (King James Version), the destruction of Korah",
        "excerpt": "And the earth opened her mouth, and swallowed them up, and their houses, and all the men that appertained unto Korah, and all their goods. They, and all that appertained to them, went down alive into the pit, and the earth closed upon them: and they perished from among the congregation.",
        "source": "Bible (King James), Numbers 16:32-33, Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Numbers"
      },
      {
        "category": "literary",
        "title": "Candide, Chapter V (the Lisbon earthquake), by Voltaire",
        "excerpt": "The sea swelled and foamed in the harbour, and beat to pieces the vessels riding at anchor. Whirlwinds of fire and ashes covered the streets and public places; houses fell, roofs were flung upon the pavements, and the pavements were scattered. Thirty thousand inhabitants of all ages and sexes were crushed under the ruins.",
        "source": "Voltaire, Candide, Project Gutenberg",
        "href": "https://www.gutenberg.org/files/19942/19942-h/19942-h.htm"
      },
      {
        "category": "artistic",
        "title": "Requiem in D minor, K.626, by Wolfgang Amadeus Mozart",
        "excerpt": "Mozart's unfinished Requiem voices the terror and grief that follow sudden catastrophe: in the Dies Irae the chorus erupts in jagged, trembling cries, the orchestra shuddering like ground that will not hold still. Yet the music turns from the day of wrath toward pleading and rest, mourning the dead while begging mercy for the living. It is the sound of a world cracking open, and of survivors crying out from beneath the dust.",
        "source": "Requiem in D minor, K.626 (Mozart), IMSLP",
        "href": "https://imslp.org/wiki/Requiem_in_D_minor,_K.626_(Mozart,_Wolfgang_Amadeus)"
      },
      {
        "category": "artistic",
        "title": "The Last Day of Pompeii, by Karl Bryullov (1830-1833)",
        "excerpt": "Bryullov's vast canvas freezes the instant a city dies: the sky is torn by lightning and a blood-red volcanic glare, columns and statues topple from rooftops onto the fleeing crowd below. A mother shields her children, a son carries his aged father, and a fallen woman lies beside her living infant who still reaches up amid the chaos. It is the eternal image of the earth's sudden violence and of human tenderness clinging on as everything collapses.",
        "source": "File:Karl Brullov - The Last Day of Pompeii - Google Art Project.jpg, Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Karl_Brullov_-_The_Last_Day_of_Pompeii_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/venezuela-earthquake-survivors-rescued--art.png",
          "alt": "Karl Bryullov, The Last Day of Pompeii",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 16
  },
  {
    "slug": "bat-cuts-9000-jobs",
    "headline": "British American Tobacco to cut 9,000 jobs as it shifts away from cigarettes",
    "overview": "British American Tobacco said it will cut about 9,000 jobs — roughly 5,500 directly and 3,500 moved to outside partners — as it tries to save 600 million pounds a year by 2028. The cuts, equal to nearly a fifth of its non-US workforce, come as cigarette demand declines and the company invests in vaping and nicotine pouches.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiqwFBVV95cUxNT3Vwc2JXeTRDNDdRU3hiNTJuZVpVQUpHSy12a3dYZDc3Wm56QklwUklWckcwenpoMVJOQXIxWk1TbXQ5SVNtcmhfOG1SS3g0TVBzT2RvMWFseWJvdm9RZW5pQjhIVWZoVkJsZ0NsR1haMW9scnM5bjUxeXV4MTVvRldUSzl0Ui1tM3RWM0ZKOE9ITGpaV01kTGF0V0ZlUlM2R0Z4RkdFWHFoTGs?oc=5"
      },
      {
        "name": "East Lothian Courier",
        "href": "https://www.eastlothiancourier.com/news/national/26235818.british-american-tobacco-cutting-9-000-jobs-slash-costs/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-29",
    "image": {
      "src": "/covers/bat-cuts-9000-jobs.png",
      "alt": "A dim, nearly empty cigarette factory floor with idle conveyor lines at dusk",
      "credit": "AI-generated"
    },
    "edition": "Afternoon Edition · 29 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Proclamation of Ned Ludd (1811)",
        "excerpt": "Ned Lud's Proclamation 23 Decr 1811\n\nI do hereby discharge, all manner of Persons, who has been, employ'd by me, in giveing any information, of breaking Frames, to the Town Clerk, or to the Corporation Silley Committee ~ any Person found out, in so doing or attempting to give any information, will be Punish'd with death, or any Constable found out making any enquiries, so has to hurt the Cause of Ned, or any of his army, Death (by order of King Lud)",
        "source": "The National Archives (UK), HO 42/118",
        "href": "https://www.nationalarchives.gov.uk/explore-the-collection/stories/the-proclamation-of-ned-ludd/"
      },
      {
        "category": "historical",
        "title": "Andrew Carnegie, \"The Gospel of Wealth\" (1889)",
        "excerpt": "The problem of our age is the proper administration of wealth, so that the ties of brotherhood may still bind together the rich and poor in harmonious relationship. The conditions of human life have not only been changed, but revolutionized, within the past few hundred years.",
        "source": "Andrew Carnegie, North American Review (1889), via Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Gospel_of_Wealth"
      },
      {
        "category": "literary",
        "title": "The Deserted Village",
        "excerpt": "But times are alter'd; trade's unfeeling train\nUsurp the land, and dispossess the swain;\nAlong the lawn, where scatter'd hamlets rose,\nUnwieldy wealth and cumbrous pomp repose;",
        "source": "Oliver Goldsmith, The Deserted Village (1770), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/50500/50500-h/50500-h.htm"
      },
      {
        "category": "literary",
        "title": "Ecclesiastes (King James Version)",
        "excerpt": "Vanity of vanities, saith the Preacher, vanity of vanities; all is vanity. What profit hath a man of all his labour which he taketh under the sun? One generation passeth away, and another generation cometh: but the earth abideth for ever.",
        "source": "Ecclesiastes 1:2-4, King James Version, Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/8021/pg8021.txt"
      },
      {
        "category": "artistic",
        "title": "Götterdämmerung (Twilight of the Gods), WWV 86D",
        "excerpt": "Wagner's vast cycle ends in conflagration: Brünnhilde rides her horse into Siegfried's funeral pyre, the Rhine overflows, and the hall of the gods is consumed by fire as an entire order of the world passes away. The shimmering, world-ending music makes the fall of one age and the uncertain dawn of another almost unbearably vivid, a requiem for power that thought itself eternal.",
        "source": "Richard Wagner, Götterdämmerung (1876), full score on IMSLP",
        "href": "https://imslp.org/wiki/G%C3%B6tterd%C3%A4mmerung,_WWV_86D_(Wagner,_Richard)"
      },
      {
        "category": "artistic",
        "title": "The Smokers",
        "excerpt": "Adriaen Brouwer's tavern scene shows young men crammed together exhaling great curling plumes of pipe smoke, eyes rolling and faces contorted in a coarse pleasure that the painter clearly frames as folly. Painted when tobacco was a new and controversial vice, the work treats smoke itself as the very emblem of vanity and dissipation, a fleeting vapour that vanishes as quickly as it rises.",
        "source": "Adriaen Brouwer, The Smokers (ca. 1636), The Metropolitan Museum of Art",
        "href": "https://www.metmuseum.org/art/collection/search/435807",
        "image": {
          "src": "/covers/bat-cuts-9000-jobs--art.png",
          "alt": "Adriaen Brouwer's painting The Smokers, men exhaling pipe smoke in a tavern",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 17
  },
  {
    "slug": "cxmt-tencent-memory-deal",
    "headline": "China's CXMT signs a $2.94 billion memory-chip supply deal with Tencent ahead of its IPO",
    "overview": "Chinese memory-chip maker CXMT has agreed a long-term DRAM supply deal worth more than 20 billion yuan (about $2.94 billion) with Tencent, sources say, as Chinese internet giants race to lock in domestic chips during a global shortage. The agreement, struck ahead of CXMT's stock-market debut, underscores Beijing's push for semiconductor self-sufficiency.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiugFBVV95cUxPY1lpSXBra1c5eWlrY0IyOXdLRXcyX2dKWHM2YmJRVXRHWmhmMjM3UUs1MnVmN0doWGVUeDJjeGVxQkEydHZjT19jbko5X0VJZm81bjU3c1llaG9WZExyaElQWjBET280RzE0Y0ZxR1hYRnFkQ1dDYWtQRVRiTzh4VjBMR2VvVXM0TkVETkt6cjF4N2RDZi15QWlyX0NTZFBHNks3ZVM1Z3dCQmRob2Vmd0NEYXdHMlBVWHc?oc=5"
      },
      {
        "name": "Yahoo Finance",
        "href": "https://finance.yahoo.com/technology/articles/exclusive-chinas-cxmt-wins-3-070237888.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-29",
    "image": {
      "src": "/covers/cxmt-tencent-memory-deal.png",
      "alt": "A gloved hand holding a gleaming silicon memory wafer inside a clean room",
      "credit": "AI-generated"
    },
    "edition": "Afternoon Edition · 29 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Hamilton's Report on the Subject of Manufactures (1791)",
        "excerpt": "Every nation, with a view to those great objects, ought to endeavour to possess within itself all the essentials of national supply. These comprise the means of Subsistence, habitation, clothing, and defence.",
        "source": "Alexander Hamilton, Report on the Subject of Manufactures, December 5, 1791",
        "href": "https://publicpolicy.pepperdine.edu/academics/research/faculty-research/intellectual-foundations/early-american/ahrepman.htm"
      },
      {
        "category": "historical",
        "title": "President Polk Confirms California Gold (1848)",
        "excerpt": "The accounts of the abundance of gold in that territory are of such an extraordinary character as would scarcely command belief were they not corroborated by the authentic reports of officers in the public service who have visited the mineral district and derived the facts which they detail from personal observation.",
        "source": "James K. Polk, Fourth Annual Message to Congress, December 5, 1848",
        "href": "https://millercenter.org/the-presidency/presidential-speeches/december-5-1848-fourth-annual-message-congress"
      },
      {
        "category": "literary",
        "title": "Aeschylus, Prometheus Bound",
        "excerpt": "Still, listen to the miseries that beset mankind—how they were witless before and I made them have sense and endowed them with reason. I will not speak to upbraid mankind but to set forth the friendly purpose that inspired my blessing. First of all, though they had eyes to see, they saw to no avail; they had ears, but they did not understand; but, just as shapes in dreams, throughout their length of days, without purpose they wrought all things in confusion.",
        "source": "Aeschylus, Prometheus Bound, lines 442-451 (trans. Herbert Weir Smyth)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Aesch.+PB+436"
      },
      {
        "category": "literary",
        "title": "Homer, Iliad — The Forging of Achilles' Shield",
        "excerpt": "And the bellows, twenty in all, blew upon the melting-vats, sending forth a ready blast of every force, now to further him as he laboured hard, and again in whatsoever way Hephaestus might wish and his work go on. And on the fire he put stubborn bronze and tin and precious gold and silver; and thereafter he set on the anvil-block a great anvil, and took in one hand a massive hammer, and in the other took he the tongs.",
        "source": "Homer, Iliad, Book 18, lines 470-477 (trans. A. T. Murray)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0134%3Abook%3D18%3Acard%3D468"
      },
      {
        "category": "artistic",
        "title": "Richard Wagner, Siegfried (WWV 86C) — the Forging Song",
        "excerpt": "In Act I, the young Siegfried reforges the shattered sword Nothung that no smith could mend, hammering the splinters into molten steel and singing his exultant \"Schmiedelied\" as sparks fly. Wagner turns metalworking into an anthem of self-sufficiency: a hero who refuses inherited, broken tools and forges his own weapon to win his destiny. The pounding orchestral rhythms mimic the anvil itself.",
        "source": "Richard Wagner, Siegfried, third opera of Der Ring des Nibelungen (1871)",
        "href": "https://imslp.org/wiki/Siegfried,_WWV_86C_(Wagner,_Richard)"
      },
      {
        "category": "artistic",
        "title": "Diego Velázquez, The Forge of Vulcan (1630)",
        "excerpt": "Apollo strides into Vulcan's smoky workshop bearing news, and the half-naked smiths freeze mid-labor, hammers raised over a glowing blade upon the anvil. Velázquez dignifies the grimy work of metalmaking with the gravity of myth, light glinting off sweat and beaten metal. It is a vision of skilled hands turning raw material into instruments of power.",
        "source": "Diego Velázquez, La Fragua de Vulcano, Museo del Prado, Madrid",
        "href": "https://commons.wikimedia.org/wiki/File:Vel%C3%A1zquez_-_La_Fragua_de_Vulcano_(Museo_del_Prado,_1630).jpg",
        "image": {
          "src": "/covers/cxmt-tencent-memory-deal--art.png",
          "alt": "Velázquez painting of Vulcan's forge with smiths at the anvil",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 18
  },
  {
    "slug": "south-korea-coach-resigns-world-cup",
    "headline": "South Korea coach Hong Myung-bo resigns after World Cup exit as president orders a probe",
    "overview": "Hong Myung-bo has resigned as head coach of South Korea's men's national football team after they failed to reach the World Cup knockout stage, finishing behind Mexico and South Africa. President Lee Jae Myung called for an investigation into the team's performance, and Hong said the responsibility \"rests entirely with me as head coach.\"",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMikwFBVV95cUxOdGE0Q09NR0lUTUkzR29zaVJoSE1GOVhEWWpnS1hpVVZRWXJmbE9fWWRxamRRNk94QWdhUTNPbklOMXROT1FpV19KOE1JZFk3Y2lyYVN0ejFKLVE0X0FydENLeUpOUnRIVGRBdk5VVlF1d3dTUTZPeWtzVVZVbVJnNDY1OVk0dkJ4bzlJcHloYmdDaWM?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cdx7jk0kq4vo"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-29",
    "image": {
      "src": "/covers/south-korea-coach-resigns-world-cup.png",
      "alt": "An empty floodlit football pitch at night after a match",
      "credit": "BBC"
    },
    "edition": "Afternoon Edition · 29 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Robert E. Lee's Letter Offering His Resignation to Jefferson Davis",
        "excerpt": "The general remedy for the want of success in a military commander is his removal. This is natural, and, in many instances, proper. For, no matter what may be the ability of the officer, if he loses the confidence of his troops disaster must sooner or later ensue. I have been prompted by these reflections more than once since my return from Pennsylvania to propose to Your Excellency the propriety of selecting another commander for this army. ... I therefore, in all sincerity, request Your Excellency to take measures to supply my place.",
        "source": "Robert E. Lee to Jefferson Davis, August 8, 1863 (Lee Family Digital Archive)",
        "href": "https://leefamilyarchive.org/robert-e-lee-to-jefferson-davis-1863-august-8/"
      },
      {
        "category": "historical",
        "title": "The Trial of the Athenian Generals after Arginusae",
        "excerpt": "Not long after, repentance seized the Athenians, and they passed a decree authorising the public prosecution of those who had deceived the people. ... Callixenus eventually came back when the party in Piraeus returned to the city, at the date of the amnesty, but only to die of hunger, an object of universal detestation.",
        "source": "Xenophon, Hellenica, Book I, ch. 7 (trans. Dakyns), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/1174/1174-h/1174-h.htm"
      },
      {
        "category": "literary",
        "title": "Coriolanus",
        "excerpt": "You common cry of curs! whose breath I hate\nAs reek o' the rotten fens, whose loves I prize\nAs the dead carcasses of unburied men\nThat do corrupt my air, I banish you",
        "source": "William Shakespeare, Coriolanus, Act III, Scene 3",
        "href": "https://www.gutenberg.org/ebooks/1535"
      },
      {
        "category": "literary",
        "title": "King Henry VIII (Cardinal Wolsey's Farewell)",
        "excerpt": "Farewell? A long farewell to all my Greatnesse.\nThis is the state of Man; to day he puts forth\nThe tender Leaues of hopes, to morrow Blossomes,\nAnd beares his blushing Honors thicke vpon him:\nThe third day, comes a Frost; a killing Frost,\nAnd when he thinkes, good easie man, full surely\nHis Greatnesse is a ripening, nippes his roote,\nAnd then he fals as I do.",
        "source": "William Shakespeare, King Henry VIII, Act III, Scene 2 (Cardinal Wolsey), Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/2258/pg2258.txt"
      },
      {
        "category": "artistic",
        "title": "Eroica Symphony No. 3, Op. 55 — Marcia funebre",
        "excerpt": "The second movement of Beethoven's Eroica is a vast funeral march, a slow tread of muffled strings and keening oboe mourning a fallen hero. Music that once celebrated a champion's greatness turns to public lamentation, the whole orchestra bowed under the weight of a downfall. It is the sound of glory collapsing into grief, and of a people grieving the leader they had exalted.",
        "source": "Ludwig van Beethoven, Symphony No. 3 'Eroica', Op. 55 (IMSLP)",
        "href": "https://imslp.org/wiki/Symphony_No.3,_Op.55_(Beethoven,_Ludwig_van)"
      },
      {
        "category": "artistic",
        "title": "Napoleon I at Fontainebleau, 31 March 1814",
        "excerpt": "Delaroche paints the conqueror of Europe slumped alone in a chair, his hat fallen to the floor, boots muddied, gaze fixed on nothing as the wheel of fortune turns against him. The empire is gone and abdication is at hand; the canvas captures the precise hour when a champion, once master of a continent, must sit in silence and confront his own fall.",
        "source": "Paul Delaroche, oil on canvas, 1840 (Musée de l'Armée, Paris)",
        "href": "https://commons.wikimedia.org/wiki/File:DelarocheNapoleon.jpg",
        "image": {
          "src": "/covers/south-korea-coach-resigns-world-cup--art.png",
          "alt": "Napoleon seated alone at Fontainebleau after his fall",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 19
  },
  {
    "slug": "gehry-abu-dhabi-arts-venue",
    "headline": "Frank Gehry's final design, a performing-arts centre for Abu Dhabi, is unveiled",
    "overview": "Abu Dhabi has unveiled Dar al Funoon, a sculptural performing-arts centre on Saadiyat Island designed by Frank Gehry and due to open in 2030 near his nearly finished Guggenheim Abu Dhabi. With a 2,000-seat hall and a flowing, fabric-like form, it is among the last buildings designed by the architect, who died aged 96 in December 2025.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Dezeen",
        "href": "https://www.dezeen.com/2026/06/27/this-week-frank-gehry-arts-centre/"
      },
      {
        "name": "The National",
        "href": "https://www.thenationalnews.com/arts-culture/2026/06/25/dar-al-funoon-abu-dhabi-new-arts-venue-saadiyat-island/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-29",
    "image": {
      "src": "/covers/gehry-abu-dhabi-arts-venue.png",
      "alt": "A sculptural building of flowing silver-white forms beside calm water at golden hour",
      "credit": "AI-generated"
    },
    "edition": "Afternoon Edition · 29 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Sir Christopher Wren and St Paul's Cathedral",
        "excerpt": "When the medieval St Paul's burned in the Great Fire of 1666, Christopher Wren spent more than thirty-five years raising its vast domed successor, laying its last stone as an old man and living to see the whole completed. Buried beneath the cathedral he created, he was given an epitaph that needs no statue: Lector, si monumentum requiris, circumspice — Reader, if you seek his monument, look around you. It is the archetype of the architect whose final, greatest building becomes his tomb and his legacy at once.",
        "source": "\"Christopher Wren,\" Encyclopaedia Britannica",
        "href": "https://www.britannica.com/biography/Christopher-Wren"
      },
      {
        "category": "historical",
        "title": "Shah Jahan's Taj Mahal",
        "excerpt": "When the Mughal emperor Shah Jahan lost his wife Mumtaz Mahal in 1631, he answered grief with stone, raising between 1631 and 1648 a vast white-marble mausoleum on the Yamuna that fused Persian, Islamic and Indian forms into a single luminous gesture. The patron's commission long outlived him: deposed and imprisoned by his own son, Shah Jahan gazed across the river at the monument he would never surpass. Today it endures as a timeless ode to love and to the idea that a building can carry a maker's name far beyond his lifetime.",
        "source": "Ministry of Culture, Government of India — \"Taj Mahal\"",
        "href": "https://culture.gov.in/taj-mahal"
      },
      {
        "category": "literary",
        "title": "Sonnet 55, by William Shakespeare",
        "excerpt": "Not marble, nor the gilded monuments\nOf princes, shall outlive this powerful rhyme;\nBut you shall shine more bright in these contents\nThan unswept stone, besmear'd with sluttish time.\nWhen wasteful war shall statues overturn,\nAnd broils root out the work of masonry,\nNor Mars his sword, nor war's quick fire shall burn\nThe living record of your memory.",
        "source": "William Shakespeare, Sonnet 55, Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/1041/pg1041.txt"
      },
      {
        "category": "literary",
        "title": "The Tempest, by William Shakespeare",
        "excerpt": "Our revels now are ended. These our actors,\nAs I foretold you, were all spirits, and\nAre melted into air, into thin air:\nAnd, like the baseless fabric of this vision,\nThe cloud-capp'd towers, the gorgeous palaces,\nThe solemn temples, the great globe itself,\nYea, all which it inherit, shall dissolve,\nAnd, like this insubstantial pageant faded,\nLeave not a rack behind. We are such stuff\nAs dreams are made on; and our little life\nIs rounded with a sleep.",
        "source": "William Shakespeare, The Tempest, Act IV, Scene 1 (Prospero), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/23042/23042-h/23042-h.htm"
      },
      {
        "category": "artistic",
        "title": "Requiem in D minor, K. 626, by Wolfgang Amadeus Mozart",
        "excerpt": "Mozart's last and unfinished work, a Requiem mysteriously commissioned through an anonymous intermediary, was left a torso when he died in December 1791 — the Lacrimosa breaking off after only eight bars. His pupil Sussmayr completed the score in the master's name, so that the music we revere is at once Mozart's farewell and a posthumous act of devotion. Like a great building finished after its architect is gone, it stands as a masterpiece the maker never heard whole.",
        "source": "Wolfgang Amadeus Mozart, Requiem in D minor, K.626 — IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Requiem_in_D_minor%2C_K.626_(Mozart%2C_Wolfgang_Amadeus)"
      },
      {
        "category": "artistic",
        "title": "The Architect's Dream, by Thomas Cole",
        "excerpt": "In Thomas Cole's 1840 canvas an architect reclines atop a colossal column, dreaming of the monuments of the ages — Egyptian pylons, Greek temples, a Roman aqueduct and a soaring Gothic cathedral — massed in golden light. The painting frames architecture itself as the grandest of human ambitions, a vision of building that outlasts every builder. It reads almost as a portrait of the master architect contemplating the legacy his structures will leave behind.",
        "source": "Thomas Cole, The Architect's Dream (1840), Toledo Museum of Art — Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Thomas_Cole_-_Architect%E2%80%99s_Dream_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/gehry-abu-dhabi-arts-venue--art.png",
          "alt": "Thomas Cole, The Architect's Dream (1840)",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 20
  },
  {
    "slug": "russia-ukraine-fortress-belt",
    "headline": "Russia presses its summer offensive against Ukraine's fortified 'fortress belt'",
    "overview": "Russian forces are grinding against Ukraine's fortified belt of towns around Kostiantynivka in the Donbas, with President Vladimir Putin vowing to press on regardless of Ukrainian peace proposals. Military analysts say Moscow's claimed advances are exaggerated and have come at heavy cost, even as Ukrainian drones strike deep inside Russia.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMilgFBVV95cUxQUkF2Z250bW15cU9RSWYyLUllbC1XVWxRV2xPYUtSVUtaWWg0OG1NMkJFNkM1aHI3Tkp4dWxMUTZJSDR5N2VSWmlfdl9zRHN1cEFlaGdDWjFFOEdLbjlSSmJjclFaUEtKUFFMeFpJWVN3cTBtN2NyY3dRYTdydVZXRFJMVDVtcEM0YXpkV2FzT1VEV1Y5dlE?oc=5"
      },
      {
        "name": "CNN",
        "href": "https://www.cnn.com/2026/06/24/europe/ukraine-russia-kostyantynivka-infiltrations-intl"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-29",
    "image": {
      "src": "/covers/russia-ukraine-fortress-belt.png",
      "alt": "A bleak, war-ravaged plain at dusk with a ruined town on the horizon",
      "credit": "AI-generated"
    },
    "edition": "Afternoon Edition · 29 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Battle of Verdun (1916)",
        "excerpt": "For ten months in 1916, German and French armies fed hundreds of thousands of men into the mincing-machine of Verdun's forts and shell-cratered hills. The German plan was explicitly to \"bleed France white\" by attacking ground the French could not abandon, yet the offensive bled both sides almost equally, costing some 700,000 casualties for a few kilometers of ruined earth. It became the byword for industrial attrition: a battle won by no one and survived by few.",
        "source": "Encyclopaedia Britannica, \"Battle of Verdun\"",
        "href": "https://www.britannica.com/event/Battle-of-Verdun"
      },
      {
        "category": "historical",
        "title": "The Siege of Sevastopol (1854–1855)",
        "excerpt": "For nearly eleven months Russia's fortress port on the Black Sea withstood an Anglo-French siege, its earthworks battered by hundreds of guns each day and re-dug each night by exhausted defenders. The Russians lost as many as 100,000 men holding the city, suffering thousands of casualties in single bombardments. Only when the French stormed the Malakhov redoubt in September 1855 did the garrison sink its own fleet, raze its defenses, and abandon the smoking ruin.",
        "source": "Encyclopaedia Britannica, \"Siege of Sevastopol\"",
        "href": "https://www.britannica.com/event/Siege-of-Sevastopol"
      },
      {
        "category": "literary",
        "title": "Sebastopol in December",
        "excerpt": "There you see surgeons with pale and serious countenances, their arms blood-splashed to the elbows, beside the bed of a wounded man, who, stretched on his back with open eyes, is delirious under the influence of chloroform, and utters broken phrases, some unimportant, some touching. The surgeons are busy with their repulsive but beneficent task, amputation. You see the curved and keen blade penetrate the healthy white flesh. The wounded man suddenly comes to himself with heart-rending cries, with curses. The assistant surgeon throws the arm into a corner, while another wounded man on a stretcher who sees the operation turns and groans.",
        "source": "Leo Tolstoy, Sebastopol (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/61388/61388-h/61388-h.htm"
      },
      {
        "category": "literary",
        "title": "Dulce et Decorum Est",
        "excerpt": "Bent double, like old beggars under sacks,\nKnock-kneed, coughing like hags, we cursed through sludge,\nTill on the haunting flares we turned our backs\nAnd towards our distant rest began to trudge.\nMen marched asleep. Many had lost their boots\nBut limped on, blood-shod. All went lame; all blind;\nDrunk with fatigue; deaf even to the hoots\nOf tired, outstripped Five-Nines that dropped behind.",
        "source": "Wilfred Owen, \"Dulce et Decorum Est\" (1920)",
        "href": "https://americanliterature.com/author/wilfred-owen/poem/dulce-et-decorum-est"
      },
      {
        "category": "artistic",
        "title": "Symphony No. 7 in C major, \"Leningrad\" (Op. 60)",
        "excerpt": "Over a relentless snare-drum tattoo, a banal little march repeats and swells across eleven hypnotic iterations until it becomes a deafening, mechanized juggernaut. Shostakovich wrote it in a city under siege, scoring the grinding, faceless violence of an army that advances by sheer mass. The theme does not so much triumph as crush, an unstoppable engine devouring everything in its path.",
        "source": "Dmitri Shostakovich, Symphony No. 7 (IMSLP)",
        "href": "https://imslp.org/wiki/Symphony_No.7,_Op.60_(Shostakovich,_Dmitry)"
      },
      {
        "category": "artistic",
        "title": "The Apotheosis of War",
        "excerpt": "A pyramid of bleached human skulls rises on a scorched yellow plain, picked over by carrion crows beneath an empty sky. Behind it stand the breached walls of a dead city, a ruin emptied by conquest. Vereshchagin, a Russian battle-painter, dedicated the canvas \"to all great conquerors, past, present and to come.\"",
        "source": "Vasily Vereshchagin, The Apotheosis of War (1871), Tretyakov Gallery",
        "href": "https://en.wikipedia.org/wiki/The_Apotheosis_of_War",
        "image": {
          "src": "/covers/russia-ukraine-fortress-belt--art.png",
          "alt": "Painting of a pyramid of skulls before a ruined city",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 21
  },
  {
    "slug": "china-export-controls-japan",
    "headline": "China places 20 Japanese firms on an export-control list and 20 more on a watch list",
    "overview": "China has added 20 Japanese companies, including units of Mitsubishi, to a list barring exports of Chinese dual-use goods to them, and put 20 others on a watch list requiring special licences. Beijing cited Japan's \"militarism\" as tensions over Taiwan continue to strain ties between the two countries.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiwwFBVV95cUxNZ2szTEV2dzBCd3dkeE9IVW51eDJDb1VwUHhrVUt5aExvQmVDVThqa2x3OVZzazJ5dDQwcHVUbUUxSTE2Z3plZHY1QllkbXllbEF1a3NtbFNjanM4Qy14aHNhUVFBUlQ2MDhwdk1Hc3dQZXVjMUlhUUtId0tWTTJld3djdEVldjBNb2VkaElLZEg2ck4tX0s2Ul94R2tYQm9nYjZnbGxFYVB6RWJvUS02Qnh1SlRBVE9YUFlRVHI0cWVkdm8?oc=5"
      },
      {
        "name": "Xinhua",
        "href": "https://english.news.cn/asiapacific/20260629/9a4a9dd6ec044ad4ad9a3a90e04bc8f1/c.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-29",
    "image": {
      "src": "/covers/china-export-controls-japan.png",
      "alt": "A container port at dusk with stacked containers and idle cranes across dark water",
      "credit": "AI-generated"
    },
    "edition": "Afternoon Edition · 29 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Megarian Decree (432 BC)",
        "excerpt": "There were many who came forward and made their several accusations; among them the Megarians, in a long list of grievances, called special attention to the fact of their exclusion from the ports of the Athenian empire and the market of Athens, in defiance of the treaty.",
        "source": "Thucydides, History of the Peloponnesian War, Book 1.67 (Crawley translation)",
        "href": "https://en.wikisource.org/wiki/History_of_the_Peloponnesian_War/Book_1"
      },
      {
        "category": "historical",
        "title": "The Oil Embargo on Imperial Japan (1940-1941)",
        "excerpt": "To curb what Washington branded Japanese militarism in China and Indochina, the United States, Britain, China, and the Dutch progressively choked off Japan's lifelines, restricting exports of scrap iron, aviation fuel, and finally crude oil. In July 1941 Roosevelt froze Japanese assets and placed all petroleum shipments under embargo, severing Japan from roughly four-fifths of its imported oil. Tokyo cast the strangling \"ABCD encirclement\" as an act of aggression, and within months chose war over capitulation.",
        "source": "Foreign Relations of the United States, Diplomatic Papers, 1941, The Far East, Vol. IV (U.S. State Dept., Office of the Historian)",
        "href": "https://history.state.gov/historicaldocuments/frus1941v04/d629"
      },
      {
        "category": "literary",
        "title": "Aristophanes, The Acharnians (425 BC)",
        "excerpt": "But now some young drunkards go to Megara and carry off the courtesan Simaetha; the Megarians, hurt to the quick, run off in turn with two harlots of the house of Aspasia; and so for three gay women Greece is set ablaze. Then Pericles, aflame with ire on his Olympian height, let loose the lightning, caused the thunder to roll, upset Greece and passed an edict, which ran like the song, \"That the Megarians be banished both from our land and from our markets and from the sea and from the continent.\" Meanwhile the Megarians, who were beginning to die of hunger, begged the Lacedaemonians to bring about the abolition of the decree, of which those harlots were the cause.",
        "source": "Aristophanes, The Acharnians (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/3012/3012-h/3012-h.htm"
      },
      {
        "category": "literary",
        "title": "The Siege of Samaria (2 Kings 6)",
        "excerpt": "And it came to pass after this, that Benhadad king of Syria gathered all his host, and went up, and besieged Samaria. And there was a great famine in Samaria: and, behold, they besieged it, until an ass's head was sold for fourscore pieces of silver, and the fourth part of a cab of dove's dung for five pieces of silver.",
        "source": "King James Bible, 2 Kings 6:24-25 (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/10/pg10.txt"
      },
      {
        "category": "artistic",
        "title": "Finlandia, Op. 26 (Jean Sibelius, 1899)",
        "excerpt": "Composed as Tsarist Russia stripped away Finland's autonomy and tightened its grip over its small neighbor, Sibelius's tone poem opens with snarling, oppressive brass before swelling into a hymn of defiance and hope. The imperial authorities found its nationalist charge so dangerous that they banned its performance under its own name. It endures as the sound of a lesser power refusing to be coerced by a looming empire next door.",
        "source": "Finlandia, Op.26 (Sibelius, Jean) — IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Finlandia,_Op.26_(Sibelius,_Jean)"
      },
      {
        "category": "artistic",
        "title": "The Destruction of the Temple of Jerusalem (Francesco Hayez, 1867)",
        "excerpt": "Hayez's vast canvas freezes the moment a blockaded, starved-out city is finally overrun, its defenders scattering amid collapsing columns, smoke, and flame. The painting captures the terrible endgame of a siege: when an adversary's supplies and sanctuaries are cut off, ruin follows. It transforms the politics of strangulation into an image of total catastrophe between rival powers.",
        "source": "Gallerie dell'Accademia, Venice — Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Francesco_Hayez_017.jpg",
        "image": {
          "src": "/covers/china-export-controls-japan--art.png",
          "alt": "Francesco Hayez, The Destruction of the Temple of Jerusalem",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 22
  },
  {
    "slug": "australia-doubles-social-media-penalty",
    "headline": "Australia doubles the maximum fine for platforms breaching its under-16 social-media ban",
    "overview": "Australia will double the maximum penalty for platforms that breach its under-16 social-media ban to about A$99 million and give its eSafety Commissioner power to demand proof of compliance. The government acted amid evidence that many children still access banned apps more than six months after the world-first law took effect.",
    "genre": "Politics",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c78yv5g74e9o"
      },
      {
        "name": "Prime Minister of Australia",
        "href": "https://www.pm.gov.au/media/stronger-powers-and-double-penalties-world-leading-social-media-law"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-29",
    "image": {
      "src": "/covers/australia-doubles-social-media-penalty.png",
      "alt": "A child's face lit by the glow of a smartphone screen in a darkened room",
      "credit": "BBC"
    },
    "edition": "Afternoon Edition · 29 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Eighteenth Amendment to the United States Constitution (Prohibition)",
        "excerpt": "After one year from the ratification of this article the manufacture, sale, or transportation of intoxicating liquors within, the importation thereof into, or the exportation thereof from the United States and all territory subject to the jurisdiction thereof for beverage purposes is hereby prohibited.\n\nThe Congress and the several States shall have concurrent power to enforce this article by appropriate legislation.",
        "source": "U.S. Constitution, Amendment XVIII (1919), via The Avalon Project, Yale Law School",
        "href": "https://avalon.law.yale.edu/20th_century/amend_18.asp"
      },
      {
        "category": "historical",
        "title": "The Comstock Act of 1873",
        "excerpt": "Anthony Comstock, a self-appointed moral crusader turned U.S. postal inspector, won a federal law banning \"obscene, lewd or lascivious\" matter from the mails, vowing to keep the post from being used to corrupt the morals of the young. Wielding sweeping power over what Americans could read, he ran sting operations under false names and boasted of destroying 160 tons of books and prints. Yet the forbidden material kept circulating, smuggled past a regulator forever chasing a public ingenious at evading him.",
        "source": "\"Comstock Act of 1873,\" The First Amendment Encyclopedia, Middle Tennessee State University",
        "href": "https://firstamendment.mtsu.edu/article/comstock-act-of-1873/"
      },
      {
        "category": "literary",
        "title": "Plato, The Republic, Book II (trans. Benjamin Jowett)",
        "excerpt": "Then the first thing will be to establish a censorship of the writers of fiction, and let the censors receive any tale of fiction which is good, and reject the bad; and we will desire mothers and nurses to tell their children the authorised ones only. Let them fashion the mind with such tales, even more fondly than they mould the body with their hands; but most of those which are now in use must be discarded.",
        "source": "Plato, The Republic, translated by Benjamin Jowett (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/1497/1497-h/1497-h.htm"
      },
      {
        "category": "literary",
        "title": "Robert Browning, \"The Pied Piper of Hamelin\"",
        "excerpt": "Out came the children running.\nAll the little boys and girls,\nWith rosy cheeks and flaxen curls,\nAnd sparkling eyes and teeth like pearls,\nTripping and skipping, ran merrily after\nThe wonderful music with shouting and laughter.",
        "source": "Robert Browning, The Pied Piper of Hamelin (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/18343/18343-h/18343-h.htm"
      },
      {
        "category": "artistic",
        "title": "Franz Schubert, \"Erlkönig,\" D.328 (Op. 1)",
        "excerpt": "Schubert sets Goethe's terror into galloping triplets: a father rides through the night clutching his son while a seductive Erlking whispers promises of games and gold into the boy's ear. The parent insists it is only the wind and mist, but the unseen, alluring voice keeps working on the child the rider cannot fully shield. By the time they reach home the boy is dead in his arms, the protector outpaced by a force he could neither see nor stop.",
        "source": "Erlkönig, D.328 (Schubert, Franz), IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Erlk%C3%B6nig,_D.328_(Schubert,_Franz)"
      },
      {
        "category": "artistic",
        "title": "William Hogarth, \"Gin Lane\" (1751)",
        "excerpt": "Hogarth's engraving is a moral catastrophe in print, made to rally support for laws curbing cheap gin. A drunken mother lets her baby tumble from her arms down a stairwell while ruin spreads through the street, the corrupting new vice devouring the young and the old alike. It is the eighteenth-century image of a society pleading for the state to police an intoxicant that lawmakers struggled to contain.",
        "source": "William Hogarth, Gin Lane (1751), Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:William_Hogarth_-_Gin_Lane.jpg",
        "image": {
          "src": "/covers/australia-doubles-social-media-penalty--art.png",
          "alt": "Hogarth's 1751 engraving Gin Lane depicting urban ruin from gin",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 23
  },
  {
    "slug": "willison-red-team-ai-assistant",
    "headline": "AI email assistant withstands more than 6,000 attempts to trick it into leaking secrets",
    "overview": "After more than 6,000 prompt-injection attempts from over 2,000 people — and about $500 in costs — nobody managed to trick developer Fernando Irarrázaval's AI email assistant into leaking its secret credentials. Reviewing the experiment, Simon Willison says frontier models are becoming markedly harder to jailbreak, while cautioning against complacency in production systems.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Simon Willison's Weblog",
        "href": "https://simonwillison.net/2026/Jun/26/hack-my-ai-assistant/"
      },
      {
        "name": "Fernando Irarrázaval",
        "href": "https://www.fernandoi.cl/posts/hackmyclaw/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-29",
    "image": {
      "src": "/covers/willison-red-team-ai-assistant.png",
      "alt": "A computer monitor glowing in a dark room beside a padlock and a pair of glasses",
      "credit": "AI-generated"
    },
    "edition": "Afternoon Edition · 29 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Dieneces at Thermopylae (480 BC)",
        "excerpt": "Nevertheless one man is said to have distinguished himself above all the rest, to wit, Dieneces the Spartan. A speech which he made before the Greeks engaged the Medes, remains on record. One of the Trachinians told him, \"Such was the number of the barbarians, that when they shot forth their arrows the sun would be darkened by their multitude.\" Dieneces, not at all frightened at these words, but making light of the Median numbers, answered \"Our Trachinian friend brings us excellent tidings. If the Medes darken the sun, we shall have our fight in the shade.\"",
        "source": "Herodotus, The History of Herodotus, Book VII (Rawlinson translation)",
        "href": "https://en.wikisource.org/wiki/The_History_of_Herodotus_(Rawlinson)/Book_7"
      },
      {
        "category": "historical",
        "title": "The Great Siege of Malta (1565)",
        "excerpt": "For nearly four months a few thousand Knights Hospitaller and Maltese held their harbour forts against an Ottoman host many times their number, enduring relentless bombardment, mine, and assault. Wave after wave broke against the battered walls of Birgu and Senglea, yet the defenders would not yield, and at last the great armada withdrew empty-handed. The defence became the most celebrated feat of arms of its century, a small bastion that swallowed an empire's effort and gave nothing back.",
        "source": "\"Siege of Malta,\" Encyclopaedia Britannica",
        "href": "https://www.britannica.com/event/Siege-of-Malta-1565"
      },
      {
        "category": "literary",
        "title": "The Contest of the Bow (Homer, Odyssey, Book XXI)",
        "excerpt": "He was now the first to take the bow and arrow, so he went on to the pavement to make his trial, but he could not string the bow, for his hands were weak and unused to hard work, they therefore soon grew tired... Melanthius lit the fire, and set a seat covered with sheep skins beside it. He also brought a great ball of lard from what they had in the house, and the suitors warmed the bow and again made trial of it, but they were none of them nearly strong enough to string it.",
        "source": "Homer, The Odyssey, Book XXI (Samuel Butler translation)",
        "href": "https://www.gutenberg.org/files/1727/1727-0.txt"
      },
      {
        "category": "literary",
        "title": "Sir Galahad (Alfred Tennyson)",
        "excerpt": "My good blade carves the casques of men,\n  My tough lance thrusteth sure,\nMy strength is as the strength of ten,\n  Because my heart is pure.",
        "source": "Alfred Tennyson, 'Sir Galahad', Poems (1843), Volume 2",
        "href": "https://en.wikisource.org/wiki/Poems_(Tennyson,_1843)/Volume_2/Sir_Galahad"
      },
      {
        "category": "artistic",
        "title": "Overture to Egmont, Op. 84 (Ludwig van Beethoven)",
        "excerpt": "Beethoven's overture opens in grim, oppressive F minor, the weight of a tyrant's siege pressing down upon a defiant people. Theme after theme strains against that darkness, refusing to be crushed, until the music shatters into a blazing major-key Victory Symphony. It is the sound of resistance that holds firm under pressure and breaks through unbroken.",
        "source": "Ludwig van Beethoven, Egmont, Op. 84 (IMSLP / Petrucci Music Library)",
        "href": "https://imslp.org/wiki/Egmont,_Op.84_(Beethoven,_Ludwig_van)"
      },
      {
        "category": "artistic",
        "title": "The Defence of Saragossa (David Wilkie, 1828)",
        "excerpt": "Amid the smoke and rubble of a besieged city, Agustina de Aragon stoops to fire the cannon her fallen comrades can no longer serve, while a friar and a volunteer press the defence beside her. Wilkie freezes the instant when ordinary defenders, outnumbered and overwhelmed, simply refuse to fall. The shattered wall becomes a stage for the unyielding will of those who guard what the enemy cannot take.",
        "source": "David Wilkie, The Defence of Saragossa (Royal Collection; Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:La_defensa_de_Zaragoza,_por_David_Wilkie.jpg",
        "image": {
          "src": "/covers/willison-red-team-ai-assistant--art.png",
          "alt": "Wilkie's painting The Defence of Saragossa",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 24
  },
  {
    "slug": "toyota-sales-fourth-monthly-fall",
    "headline": "Toyota's global sales fall for a fourth straight month, down 7.2% in May",
    "overview": "Toyota reported its fourth consecutive month of declining global sales in May, down 7.2% year-on-year to 834,279 vehicles, dragged by a 31.7% plunge in China and a 38.6% collapse in the Middle East amid the fallout from the Iran war. Sales rose 15.3% in India, a bright spot in one of the world's fastest-growing car markets.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMi0gFBVV95cUxObHN4ckJqYlpoVlZ0dHRKX2RybkZtMUloV3ZTWUlLcUlsUEIwMHVIYUczYndYRWRkZHJ4WE5fWnNxcG5wTzRJekR5OVJnei1WT0N4VTZVS2U3RTd4SVZWbkFjZXZONlFub2dnNXhHdVJxVmFTMUZ1NXVmdVdQRGRVMjFoOUxRS1h2bnJIUWRRdFZCbWpfaGNVX2ZjeE9pNHBSemhNV2xBLWVZdExyanlXMWw2dDNHbHc4QncycXlRQUpZdGRCTUtsZ2NDLXkwMk52MEE?oc=5"
      },
      {
        "name": "The Week",
        "href": "https://www.theweek.in/news/biz-tech/2026/06/29/toyota-global-sales-may-2026.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-29",
    "image": {
      "src": "/covers/toyota-sales-fourth-monthly-fall.png",
      "alt": "A silent automobile assembly hall at dawn with an idle production line and robotic arms",
      "credit": "AI-generated"
    },
    "edition": "Afternoon Edition · 29 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "General Observations on the Fall of the Roman Empire in the West",
        "excerpt": "The decline of Rome was the natural and inevitable effect of immoderate greatness. Prosperity ripened the principle of decay; the causes of destruction multiplied with the extent of conquest; and, as soon as time or accident had removed the artificial supports, the stupendous fabric yielded to the pressure of its own weight. The story of its ruin is simple and obvious; and, instead of inquiring why the Roman empire was destroyed, we should rather be surprised that it had subsisted so long.",
        "source": "Edward Gibbon, The History of the Decline and Fall of the Roman Empire (1781)",
        "href": "https://faculty.georgetown.edu/jod/texts/gibbon.fall.html"
      },
      {
        "category": "historical",
        "title": "The Fall of Babylon to Cyrus the Great",
        "excerpt": "When this happened, the Persians who were posted with this objective made their way into Babylon by the channel of the Euphrates, which had now sunk to a depth of about the middle of a man's thigh. Now if the Babylonians had known beforehand or learned what Cyrus was up to, they would have let the Persians enter the city and have destroyed them utterly.",
        "source": "Herodotus, The Histories, Book 1.191 (trans. A. D. Godley)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0126:book%3D1:chapter%3D191"
      },
      {
        "category": "literary",
        "title": "Inferno, Canto VII (on Fortune)",
        "excerpt": "Ordained a general ministress and guide,\nThat she might change at times the empty treasures\nFrom race to race, from one blood to another,\nBeyond resistance of all human wisdom.\nTherefore one people triumphs, and another\nLanguishes, in pursuance of her judgment,\nWhich hidden is, as in the grass a serpent.\nYour knowledge has no counterstand against her;\nShe makes provision, judges, and pursues\nHer governance, as theirs the other gods.",
        "source": "Dante Alighieri, The Divine Comedy, trans. Henry Wadsworth Longfellow (1867)",
        "href": "https://en.wikisource.org/wiki/Divine_Comedy_(Longfellow_1867)/Volume_1/Canto_7"
      },
      {
        "category": "literary",
        "title": "Ozymandias",
        "excerpt": "And on the pedestal these words appear:\n'My name is Ozymandias, king of kings:\nLook on my works, ye Mighty, and despair!'\nNothing beside remains. Round the decay\nOf that colossal wreck, boundless and bare\nThe lone and level sands stretch far away.",
        "source": "Percy Bysshe Shelley, Ozymandias (1818), in The Complete Poetical Works (ed. Hutchinson, 1914)",
        "href": "https://en.wikisource.org/wiki/The_Complete_Poetical_Works_of_Percy_Bysshe_Shelley_(ed._Hutchinson,_1914)/Ozymandias"
      },
      {
        "category": "artistic",
        "title": "Belshazzar, HWV 61",
        "excerpt": "Handel's oratorio stages the last night of a complacent empire: as the Babylonian king feasts in arrogant security, a disembodied hand scrawls his doom upon the wall while the Persian armies divert the river beneath his walls. The choruses swell from drunken triumph to terror, dramatizing how the mightiest power can be overturned in a single night by a rising rival.",
        "source": "George Frideric Handel, Belshazzar, HWV 61 (1744)",
        "href": "https://imslp.org/wiki/Belshazzar,_HWV_61_(Handel,_George_Frideric)"
      },
      {
        "category": "artistic",
        "title": "The Course of Empire: Destruction",
        "excerpt": "Thomas Cole's apocalyptic canvas shows a once-glittering metropolis at the summit of its wealth being sacked and burned, its marble splendor toppling as an enemy fleet storms the harbor under a blood-red sky. A headless colossus presides over the carnage, a stark emblem of how a civilization at the peak of prosperity carries within it the seeds of its own sudden ruin.",
        "source": "Thomas Cole, The Course of Empire: Destruction (1836), New-York Historical Society",
        "href": "https://commons.wikimedia.org/wiki/File:Cole_Thomas_The_Course_of_Empire_Destruction_1836.jpg",
        "image": {
          "src": "/covers/toyota-sales-fourth-monthly-fall--art.png",
          "alt": "Thomas Cole, The Course of Empire: Destruction (1836)",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 25
  },
  {
    "slug": "bangladesh-hasina-vows-return",
    "headline": "Ousted Bangladesh PM Sheikh Hasina vows to return home this year despite a death sentence",
    "overview": "Bangladesh's ousted prime minister Sheikh Hasina, 78, who has been in exile in India since a student-led uprising forced her out in August 2024, says she will return home this year despite being sentenced to death in absentia. \"I do not fear death,\" she said, casting the case against her as politically motivated.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMirgFBVV95cUxNMmVYNnNCOGN6OWgtanBpamVETmVmd0lodlFVN215QXE5YW9sSDkxQnFpMWZMblVMc1h2YlpxOGZZNnhvVmhLYmZUek1hR21WYUpOUTVzUEdOMXdkdWwtTFBvbDdGbS1ON3FjODVqelFGXzFEWjBJMVdCS3dGSllLRExPSUJfN0pZXzhIMkhvTDF4S3ZTY3hXcUdFMDB2MjdzOEdDYXduWVhvQzhFYlE?oc=5"
      },
      {
        "name": "Dawn",
        "href": "https://www.dawn.com/news/2011401/bangladeshs-fugitive-ex-pm-sheikh-hasina-says-will-return-to-dhaka-this-year"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-29",
    "image": {
      "src": "/covers/bangladesh-hasina-vows-return.png",
      "alt": "An empty lectern and a single chair under a lone spotlight on a dark stage",
      "credit": "AI-generated"
    },
    "edition": "Afternoon Edition · 29 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "General MacArthur's Return to the Philippines (1944)",
        "excerpt": "Driven out of the Philippines by the Japanese in 1942, General Douglas MacArthur left with a vow that became legend: \"I shall return.\" For more than two years it was an exile's pledge that many doubted he could keep, yet in October 1944 he waded ashore at Leyte to make it good, declaring that he had come back. It remains the archetype of the deposed commander who refuses to accept his removal as final and stakes everything on a homecoming.",
        "source": "\"Douglas MacArthur,\" Encyclopaedia Britannica",
        "href": "https://www.britannica.com/biography/Douglas-MacArthur"
      },
      {
        "category": "historical",
        "title": "The Restoration of Charles II and the Declaration of Breda (1660)",
        "excerpt": "After more than a decade of exile that followed his father's execution and the collapse of the royalist cause, Charles II issued the Declaration of Breda from the Netherlands, promising pardon and reconciliation, and was proclaimed lawful king. He sailed from The Hague and landed at Dover to wild acclaim, entering London on his thirtieth birthday. The deposed dynasty, written off as finished, returned in triumph, reversing the verdict of a revolution that had once seemed absolute.",
        "source": "The National Archives (UK)",
        "href": "https://www.nationalarchives.gov.uk/education/students/videos/spotlight-on/spotlight-on-charles-ii/"
      },
      {
        "category": "literary",
        "title": "The Divine Comedy, Paradiso, Canto XVII (the prophecy of exile)",
        "excerpt": "Thou shalt abandon everything beloved\nMost tenderly, and this the arrow is\nWhich first the bow of banishment shoots forth.\nThou shalt have proof how savoureth of salt\nThe bread of others, and how hard a road\nThe going down and up another's stairs.",
        "source": "Dante Alighieri, The Divine Comedy, trans. Henry Wadsworth Longfellow (1867), Wikisource",
        "href": "https://en.wikisource.org/wiki/Divine_Comedy_(Longfellow_1867)/Volume_3/Canto_17"
      },
      {
        "category": "literary",
        "title": "Homer, Odyssey, Book 9",
        "excerpt": "I am Odysseus, son of Laertes, who am known among men for all manner of wiles, and my fame reaches unto heaven. But I dwell in clear-seen Ithaca, wherein is a mountain, Neriton, covered with waving forests, conspicuous from afar; and round it lie many isles hard by one another, Dulichium, and Same, and wooded Zacynthus.",
        "source": "Homer, Odyssey 9.19, trans. A. T. Murray (Perseus Digital Library)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0136:book%3D9:card%3D1"
      },
      {
        "category": "artistic",
        "title": "Va, pensiero (Chorus of the Hebrew Slaves) from Verdi's Nabucco",
        "excerpt": "In Verdi's 1842 opera, the captive Hebrews, already condemned and torn from their homeland, lift their voices toward the lost country they refuse to forget, sending their thoughts on golden wings across the sea to the hills of home. The melody became an anthem of exiles and a defiant cry of a people who would not be erased. It transforms banishment and the shadow of death into an unbroken longing for return.",
        "source": "Giuseppe Verdi, Nabucco (IMSLP)",
        "href": "https://imslp.org/wiki/Nabucco_(Verdi,_Giuseppe)"
      },
      {
        "category": "artistic",
        "title": "Napoleon's Return from Elba",
        "excerpt": "Charles de Steuben's 1818 painting captures the moment at Laffrey when the exiled emperor, having slipped back onto French soil, walks bareheaded toward the soldiers sent to arrest him and bares his breast, daring them to fire. The royal troops, frozen between duty and devotion, lower their muskets and surge to his side. It is the image of a condemned man who refuses to fear death and turns his own execution party into an army of homecoming.",
        "source": "Charles de Steuben, Napoleon's Return from Elba (1818), Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Retour_de_Napoleon_d'_Isle_d'Elbe,_by_Charles_de_Steuben.jpg",
        "image": {
          "src": "/covers/bangladesh-hasina-vows-return--art.png",
          "alt": "Napoleon bares his chest before soldiers on his return from Elba",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 26
  },
  {
    "slug": "colorado-west-wildfires-firefighters",
    "headline": "Three firefighters killed as wind-driven wildfires sweep the U.S. West amid record heat",
    "overview": "Three firefighters were killed battling fast-moving wildfires on the Colorado-Utah border on June 28, 2026, as blazes fueled by extreme heat, drought and high winds spread across several Western states. Thousands of residents were placed under evacuation orders as crews struggled to contain fires during one of the region's hottest spells on record.",
    "genre": "Climate",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMimgFBVV95cUxNWE1LMnB3a0FPeUtod0p3b0VnYVNHWGg3ZXl3RVp1aTJVcVZadUFHZFRzWF9fWnpNanduYVZ6OEs2cVE2T05aR2pnRjlpV0FDenlpWHplLUMwNS1Ma3RFUDlQdVlMcmtPUlowNkg5ZkZ2NmktUFVtMDJvX0NTR2ptUmhZOUdMSUt1U2J3TmN2SU5zY3pNQjczbWFR?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cp8l7mpmdggo"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-29",
    "image": {
      "src": "/covers/colorado-west-wildfires-firefighters.png",
      "alt": "A ridgeline of dry Western mountains ablaze at dusk, orange flames running through scrub as thick smoke billows into a darkening sky",
      "credit": "AI-generated"
    },
    "lead": true,
    "edition": "Morning Edition · 29 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Great Fire of Rome (AD 64), Tacitus, Annals Book XV",
        "excerpt": "The blaze in its fury ran first through the level portions of the city, then rising to the hills, while it again devastated every place below them, it outstripped all preventive measures; so rapid was the mischief and so completely at its mercy the city, with those narrow winding passages and irregular streets, which characterised old Rome.",
        "source": "Tacitus, The Annals, Book XV, trans. Alfred John Church and William Jackson Brodribb (1876)",
        "href": "https://en.wikisource.org/wiki/The_Annals_(Tacitus)/Book_15"
      },
      {
        "category": "historical",
        "title": "The Great Fire of London (1666), The Diary of Samuel Pepys",
        "excerpt": "We staid till, it being darkish, we saw the fire as only one entire arch of fire from this to the other side the bridge, and in a bow up the hill for an arch of above a mile long: it made me weep to see it.",
        "source": "Samuel Pepys, Diary, entry for 2 September 1666 (Wheatley edition)",
        "href": "https://en.wikisource.org/wiki/Diary_of_Samuel_Pepys/1666/September"
      },
      {
        "category": "literary",
        "title": "The Burning of Troy, Virgil, Aeneid Book II (Dryden translation)",
        "excerpt": "Driv'n on the wings of Winds, whole sheets of Fire, / Through Air transported, to the Roofs aspire.",
        "source": "Virgil, The Aeneid, Book II, trans. John Dryden (1697), in The Works of Virgil",
        "href": "https://en.wikisource.org/wiki/The_Works_of_Virgil_(Dryden)/Aeneid/Book_II"
      },
      {
        "category": "literary",
        "title": "The Phoenix Reborn from Flame, Ovid, Metamorphoses Book XV",
        "excerpt": "All these receive their Birth from other Things; / But from himself the Phœnix only springs: / Self-born, begotten by the Parent Flame / In which he burn't, Another, and the same;",
        "source": "Ovid, Metamorphoses, Book XV, trans. Sir Samuel Garth, John Dryden, et al. (1717/1727)",
        "href": "https://en.wikisource.org/wiki/Metamorphoses_(tr._Garth,_Dryden,_et_al.)/Book_XV"
      },
      {
        "category": "artistic",
        "title": "\"Wotans Abschied und Feuerzauber\" (Magic Fire Music) from Die Walküre, WWV 86B — Richard Wagner",
        "excerpt": "Wagner's Magic Fire Music closes Die Walküre as Wotan summons Loge to ring the sleeping Brünnhilde in a wall of leaping flame. Shimmering strings and the glowing Loge motif make the orchestra itself seem to crackle and blaze, turning fire into both a punishment and a consecrating, protective force. Like the wind-driven walls of flame on the Colorado-Utah border, it renders fire as something at once beautiful, terrifying, and sacrificial.",
        "source": "Richard Wagner, Die Walküre, WWV 86B, Act III (1856); full orchestral score, IMSLP",
        "href": "https://imslp.org/wiki/Die_Walk%C3%BCre,_WWV_86B_(Wagner,_Richard)"
      },
      {
        "category": "artistic",
        "title": "The Great Day of His Wrath, John Martin, 1851-1853",
        "excerpt": "A whole world comes apart in flame: cliffs heave from their foundations and crash into a chasm lit blood-red by an unstoppable inferno, while tiny human figures tumble helplessly into the burning dark. Martin paints catastrophe at planetary scale, the fire not as a contained blaze but as an annihilating force that swallows the very landscape. It reads as a vision of nature turned apocalyptic, an apt mirror for wildfires that race across the American West, devouring forests, towns, and horizons alike.",
        "source": "John Martin, The Great Day of His Wrath, 1851-1853, oil on canvas, Tate Britain, London; via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:John_Martin_-_The_Great_Day_of_His_Wrath_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/colorado-west-wildfires-firefighters--art.png",
          "alt": "A vast apocalyptic landscape engulfed in fiery red and orange light as mountains collapse into a flaming abyss and figures fall into the inferno",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 27
  },
  {
    "slug": "pakistan-afghan-border-operation",
    "headline": "Pakistan says a cross-border ground operation and strikes killed 29 militants near the Afghan frontier",
    "overview": "Pakistan's military said it carried out a ground operation backed by strikes along the Afghan border, killing 29 militants it said had crossed from Afghanistan, in announcements on June 28, 2026. The action came amid rising tensions between Islamabad and Kabul over militant sanctuaries along the frontier.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMipwFBVV95cUxQc250eHJQZFk2c1RkdkdnQ3RvRHd1QmV6OU8yQ3B3a3NEMlFiYXd1SXpOLVBqTmM4dnZMa2U4QnRKZFhQSlV1OG1lM0hkY1oybi0wd0QtV0UydlcwOEN1TkN6MzFoVnhrUFZVaXpwOU80T0dYMkoxRmtQQndQamZ6MXRCbk5sZy10WlMxOURpOXZLTkV0cW5HUGtHOE9ET3V4WnZwd3FQMA?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMitwFBVV95cUxONDBEb3RoRkpwRmltQ3BHNkVvNHNJTFpEbVdnbkhNdmtiYUxhOTZTMkEzWlFsTTRLNnBMUi1FVkNFQ25teGd0NUNaYkhXN3dYQjhMTjBfVUwzWWZYTHpDRHd1clBhaVYteHJ2SEQ1N1BiWDlFRmZNWnJrOVFhd2U3a1Q3UV92ekN1d0NCNWtiN0t3T2RJemJxZkpYai0zV1NFTXlwZjVSWVVheTNLei1xdTZEdTVhTjg?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-29",
    "image": {
      "src": "/covers/pakistan-afghan-border-operation.png",
      "alt": "A rugged, arid mountain frontier at dawn under a pale sky, a lone watchtower and razor-wire border fence winding across stony ridges",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 29 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Story of the Malakand Field Force: An Episode of Frontier War (Winston S. Churchill, 1898)",
        "excerpt": "Tribe wars with tribe. The people of one valley fight with those of the next. To the quarrels of communities are added the combats of individuals. Khan assails khan, each supported by his retainers. Every tribesman has a blood feud with his neighbor.",
        "source": "Winston S. Churchill, The Story of the Malakand Field Force: An Episode of Frontier War (London: Longmans, Green & Co., 1898), Chapter I. Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/9404/9404-h/9404-h.htm"
      },
      {
        "category": "historical",
        "title": "Commentarii de Bello Gallico, Book IV (Julius Caesar, 1st century BC) — crossing the Rhine to punish cross-border raiders",
        "excerpt": "since he saw the Germans were so easily urged to go into Gaul, he desired they should have their fears for their own territories, when they discovered that the army of the Roman people both could and dared pass the Rhine.",
        "source": "Julius Caesar, The Gallic Wars (De Bello Gallico), Book IV (trans. W. A. McDevitte and W. S. Bohn). The Internet Classics Archive, MIT.",
        "href": "https://classics.mit.edu/Caesar/gallic.4.4.html"
      },
      {
        "category": "literary",
        "title": "Arithmetic on the Frontier (Rudyard Kipling, 1886) — the Afghan/North-West Frontier",
        "excerpt": "A scrimmage in a Border Station— / A canter down some dark defile— / Two thousand pounds of education / Drops to a ten-rupee jezail— / The Crammer's boast, the Squadron's pride, / Shot like a rabbit in a ride!",
        "source": "Rudyard Kipling, \"Arithmetic on the Frontier,\" Departmental Ditties and Other Verses (1886). Wikisource.",
        "href": "https://en.wikisource.org/wiki/Arithmetic_on_the_Frontier"
      },
      {
        "category": "literary",
        "title": "The Lay of the Last Minstrel, Canto I (Sir Walter Scott, 1805) — the Anglo-Scottish border reiver",
        "excerpt": "A stark moss-trooping Scott was he, / As e'er couched border lance by knee. / Through Solway sands, through Tarras moss, / Blindfold, he knew the paths to cross; / By wily turns, by desperate bounds, / Had baffled Percy's best blood-hounds; / In Eske, or Liddell, fords were none, / But he would ride them, one by one; / Alike to him was time or tide, / December's snow, or July's pride; / Alike to him was tide or time, / Moonless midnight, or mattin prime. / Steady of heart, and stout of hand, / As ever drove prey from Cumberland; / Five times outlawed had be been, / By England's King, and Scotland's Queen.",
        "source": "Sir Walter Scott, The Lay of the Last Minstrel, Canto I, stanza XXI (1805). Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_Lay_of_the_Last_Minstrel/Canto_1"
      },
      {
        "category": "artistic",
        "title": "In the Steppes of Central Asia (Aleksandr Borodin, 1880) — a caravan crossing contested Central Asian frontier under armed escort",
        "excerpt": "Borodin's symphonic sketch sets a vast, empty frontier to music: over a sustained high drone evoking the silent steppe, a Russian military theme and an Asian caravan melody approach from opposite directions, intertwine as a guarded convoy passes through dangerous borderland, then fade as the escort moves on into the distance.",
        "source": "Aleksandr Borodin, In the Steppes of Central Asia (V sredney Azii), symphonic sketch, 1880. IMSLP / Petrucci Music Library.",
        "href": "https://imslp.org/wiki/In_the_Steppes_of_Central_Asia_(Borodin,_Aleksandr)"
      },
      {
        "category": "artistic",
        "title": "The Apotheosis of War (Vasily Vereshchagin, 1871) — the aftermath of Central Asian frontier warfare",
        "excerpt": "Painted after Vereshchagin's service on Russia's Central Asian frontier, the canvas shows a pyramid of human skulls heaped on scorched earth before a ruined walled town, picked over by carrion crows — the artist's verdict on conquest, inscribed in dedication \"to all great conquerors, past, present and to come.\"",
        "source": "Vasily Vereshchagin, The Apotheosis of War (Apofeoz voyny), oil on canvas, 1871, State Tretyakov Gallery, Moscow. Public domain via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:1871_Vereshchagin_Apotheose_des_Krieges_anagoria.JPG",
        "image": {
          "src": "/covers/pakistan-afghan-border-operation--art.png",
          "alt": "The Apotheosis of War (1871) by Vasily Vereshchagin: a pyramid of human skulls on barren ground before a ruined city, with crows circling.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 28
  },
  {
    "slug": "south-korea-ai-chip-megaplan",
    "headline": "South Korea's president to unveil a roughly $650 billion AI and semiconductor investment plan",
    "overview": "President Lee Jae-myung is set to announce three 'mega-projects' worth a reported 1,000 trillion won (about $650 billion) over coming years, including a new semiconductor cluster in the country's southwest and major spending on AI data centers and robotics. Samsung and SK are expected to take part in what would rank among the largest industrial-investment drives in South Korea's history.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiuAFBVV95cUxPVUNqWjl6MERPSDlWbU9PcWFac1g2anI3NF8xSE1falktWnRsVUVTdHZOT1VOVmhOemcxUUJPNjdLWWdwM2x5enBYc1RMa0FCNTd3TzFSMGEySDNFM3JRNHVJZjdVWWNnd1F4Wm90dEJrWEgtWGJfNFI2ZWhLeWVkOGJUdTRYTGtqbk1IX0FwSmhrQ0tybXgwZUVsU1pSclVHWERTQzRCWWR6aDVuRzFublFuYk9wYmdU?oc=5"
      },
      {
        "name": "Korea Herald",
        "href": "https://www.koreaherald.com/article/10791082"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-29",
    "image": {
      "src": "/covers/south-korea-ai-chip-megaplan.png",
      "alt": "The interior of a vast, brightly lit semiconductor fabrication plant, rows of gleaming machinery and clean-room gantries stretching into the distance",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 29 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Herodotus, The Histories, Book II.124 (on the building of the Great Pyramid of Cheops), 5th century BC",
        "excerpt": "For first he shut up all the temples, so that none could sacrifice there; and next, he compelled all the Egyptians to work for him, appointing some to drag stones from the quarries in the Arabian mountains to the Nile: and the stones being carried across the river in boats, others were charged to receive and drag them to the mountains called Libyan. They worked in gangs of a hundred thousand men, each gang for three months. For ten years the people were afflicted in making the road whereon the stones were dragged, the making of which road was to my thinking a task but a little lighter than the building of the pyramid... The pyramid itself was twenty years in the making.",
        "source": "Herodotus, The Histories, Book II (Euterpe), ch. 124, Loeb Classical Library translation (public domain), hosted by LacusCurtius, University of Chicago.",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Herodotus/2b*.html"
      },
      {
        "category": "historical",
        "title": "Farnham Bishop, Panama, Past and Present (1913), Ch. XV — the digging of the Panama Canal",
        "excerpt": "Under Mr. Stevens—'Big Smoke Stevens' they called him, for he burned up cigars like Grant in the Wilderness—the record for a month's excavation was brought up to a million cubic yards, the type of canal was finally settled on, and General Gorgas finished his fight against yellow fever.",
        "source": "Farnham Bishop, Panama, Past and Present (New York: The Century Co., 1913), Chapter 15. Wikisource (public domain).",
        "href": "https://en.wikisource.org/wiki/Panama,_past_and_present/Chapter_15"
      },
      {
        "category": "literary",
        "title": "Walt Whitman, \"Song of the Broad-Axe,\" Leaves of Grass (1856; section 9)",
        "excerpt": "The shapes arise! / Shapes of factories, arsenals, foundries, markets, / Shapes of the two-threaded tracks of railroads, / Shapes of the sleepers of bridges, vast frameworks, girders, arches, / Shapes of the fleets of barges, tows, lake and canal craft, river craft,",
        "source": "Walt Whitman, \"Song of the Broad-Axe,\" in Leaves of Grass. The Walt Whitman Archive (public domain).",
        "href": "https://whitmanarchive.org/item/ppp.00707_00795"
      },
      {
        "category": "literary",
        "title": "The Tower of Babel, Genesis 11:3–4 (King James Version, 1611)",
        "excerpt": "And they said one to another, Go to, let us make brick, and burn them throughly. And they had brick for stone, and slime had they for morter. And they said, Go to, let us build us a city and a tower, whose top may reach unto heaven; and let us make us a name, lest we be scattered abroad upon the face of the whole earth.",
        "source": "The Holy Bible, King James Version (1611), Genesis 11:3–4. Wikisource (public domain).",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Genesis"
      },
      {
        "category": "artistic",
        "title": "Alexander Mosolov, Zavod (\"Iron Foundry\"), Op. 19 (from the ballet Steel), 1926–27",
        "excerpt": "A pioneering work of Soviet machine-music, Mosolov's Iron Foundry hurls the orchestra into the relentless clangor of a working factory, even scoring a part for a shaken metal sheet. Composed to glorify the age of industrialization, it turns the din of forging steel into a driving, exhilarating hymn to mechanized production and national industrial might.",
        "source": "Alexander Mosolov, Steel (Сталь) / Zavod (\"Iron Foundry\"), Op. 19, 1926–27. Scores at IMSLP (Petrucci Music Library).",
        "href": "https://imslp.org/wiki/Steel,_Op.19_(Mosolov,_Alexander)"
      },
      {
        "category": "artistic",
        "title": "Coalbrookdale by Night, Philip James de Loutherbourg, 1801",
        "excerpt": "Loutherbourg's nocturne sets the Madeley Wood furnaces ablaze against a smoke-choked sky, turning a Shropshire ironworks into a vision of hellish, awesome power at the dawn of the Industrial Revolution. The painting frames raw industry as a sublime force, where human ambition conjures fire and machinery on a scale that dwarfs the surrounding land. It is the perfect emblem for a nation marshalling vast capital and will toward a single, transformative industrial undertaking.",
        "source": "Philip James de Loutherbourg, Coalbrookdale by Night, 1801, Science Museum, London; via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Philipp_Jakob_Loutherbourg_d._J._002.jpg",
        "image": {
          "src": "/covers/south-korea-ai-chip-megaplan--art.png",
          "alt": "Industrial iron furnaces glowing fiery red and orange against a dark, smoke-filled night sky, with billowing clouds illuminated by flames",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 29
  },
  {
    "slug": "texas-bible-required-reading",
    "headline": "Texas approves Bible stories as required reading for more than 5 million public-school students",
    "overview": "The Texas State Board of Education approved a new required reading list of about 200 texts that includes Bible passages and stories, affecting roughly 5.5 million K-12 public-school students. Elementary pupils will read versions of 'David and Goliath' and 'Daniel and the Lions' Den,' while older students study the Sermon on the Mount and the parable of the prodigal son; the rollout begins with elementary grades in 2030.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMimAFBVV95cUxNYk5leVVPRGxXaDlvbTlOY1NmWmlIRjlzVDJteXMxNWgwWHNsSXk3b2pld0tKeGJXSzhEU01qWW1qN21INzA0VmpEbjhISWVDejljUVNXUU5WeVIzTFdNYlBBbnpEZ1VCZDdxa0o3WXBPbGt2UXRNU1djSGJhUmg5WlhyX1l0THowdlc5VG1EbktVdlo0a2ZQRQ?oc=5"
      },
      {
        "name": "CNN",
        "href": "https://www.cnn.com/2026/06/26/us/texas-schools-bible-curriculum-vote"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-29",
    "image": {
      "src": "/covers/texas-bible-required-reading.png",
      "alt": "An empty sunlit American elementary-school classroom, rows of small wooden desks and an open book resting on the teacher's lectern",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 29 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Northwest Ordinance (1787), Article 3 — Confederation Congress",
        "excerpt": "Religion, morality, and knowledge, being necessary to good government and the happiness of mankind, schools and the means of education shall forever be encouraged.",
        "source": "Northwest Ordinance, July 13, 1787, Article 3; transcription, U.S. National Archives, Milestone Documents.",
        "href": "https://www.archives.gov/milestone-documents/northwest-ordinance"
      },
      {
        "category": "historical",
        "title": "Engel v. Vitale, 370 U.S. 421 (1962) — Opinion of the Court, Justice Hugo Black",
        "excerpt": "it is no part of the business of government to compose official prayers for any group of the American people to recite as a part of a religious program carried on by government.",
        "source": "Engel v. Vitale, 370 U.S. 421 (1962), Opinion of the Court (Black, J.); Wikisource.",
        "href": "https://en.wikisource.org/wiki/Engel_v._Vitale/Opinion_of_the_Court"
      },
      {
        "category": "literary",
        "title": "David and Goliath — 1 Samuel 17:45-47 (King James Version, 1611)",
        "excerpt": "Then said David to the Philistine, Thou comest to me with a sword, and with a spear, and with a shield: but I come to thee in the name of the LORD of hosts, the God of the armies of Israel, whom thou hast defied. This day will the LORD deliver thee into mine hand; and I will smite thee, and take thine head from thee... that all the earth may know that there is a God in Israel. And all this assembly shall know that the LORD saveth not with sword and spear: for the battle is the LORD's, and he will give you into our hands.",
        "source": "The Holy Bible, King James Version (1611), 1 Samuel 17:45-47; Wikisource.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/1_Samuel"
      },
      {
        "category": "literary",
        "title": "The Prodigal Son — Luke 15:20-24 (King James Version, 1611)",
        "excerpt": "And he arose, and came to his father. But when he was yet a great way off, his father saw him, and had compassion, and ran, and fell on his neck, and kissed him. And the son said unto him, Father, I have sinned against heaven, and in thy sight, and am no more worthy to be called thy son. But the father said to his servants, Bring forth the best robe, and put it on him; and put a ring on his hand, and shoes on his feet: And bring hither the fatted calf, and kill it; and let us eat, and be merry: For this my son was dead, and is alive again; he was lost, and is found. And they began to be merry.",
        "source": "The Holy Bible, King James Version (1611), Luke 15:20-24; Wikisource.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Luke"
      },
      {
        "category": "artistic",
        "title": "Saul, HWV 53 — oratorio by George Frideric Handel (1738), libretto by Charles Jennens",
        "excerpt": "Handel's dramatic oratorio sets the biblical clash of Saul and the young David to music, opening with the people's triumphant chorus after David felled Goliath and tracing the king's jealousy as the crowd sings that David has slain his ten thousands. The full score, edited by Friedrich Chrysander, is freely available in the public domain.",
        "source": "George Frideric Handel, Saul, HWV 53 (1738); full score ed. Friedrich Chrysander (Leipzig, 1862); IMSLP/Petrucci Music Library.",
        "href": "https://imslp.org/wiki/Saul,_HWV_53_(Handel,_George_Frideric)"
      },
      {
        "category": "artistic",
        "title": "The Return of the Prodigal Son — Rembrandt Harmensz. van Rijn (c. 1668)",
        "excerpt": "In one of his last works, Rembrandt paints the kneeling, ragged son enfolded by his father's tender hands, the moment of forgiveness rendered in warm shadow. The scene crystallizes the parable Texas now lists for its schoolchildren.",
        "source": "Rembrandt van Rijn, The Return of the Prodigal Son, oil on canvas, c. 1668, State Hermitage Museum, Saint Petersburg; image via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Rembrandt_Harmensz._van_Rijn_-_The_Return_of_the_Prodigal_Son.jpg",
        "image": {
          "src": "/covers/texas-bible-required-reading--art.png",
          "alt": "Rembrandt's painting The Return of the Prodigal Son: a kneeling son in tattered clothes embraced by his aged father's hands",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 30
  },
  {
    "slug": "israel-recognizes-armenian-genocide",
    "headline": "Israel's cabinet votes to formally recognize the WWI killing of Armenians as genocide",
    "overview": "Israel's cabinet unanimously approved a proposal on June 28, 2026, to designate the mass killing of Armenians by the Ottoman Empire during World War I as a genocide, a step that still requires approval by the Knesset. Historians estimate up to 1.5 million Armenians were killed; the move reflects deteriorating ties between Israel and Turkey and would add Israel to more than 30 countries that recognize the genocide.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMiqgFBVV95cUxNQW5uN1J1VnQ4NEtFWEFqUWg3UDhwTTBBYnBFZWtVLTYzWEM4VHJLSm9CV1lnX1MyMVV0Y1YxcTJ0TmhyaWtoVEJaYlAtNmVBU3VKQUVWVk9RSXZIbmVGRkpVVVJIX25GODF6T0J6M09fbXFjU2xaQkF3cnpxcTZvU3lYWk5jelEtUFEtSk5DYXFQaE1mMGxCd2FVblpTQjFaZElHU2twSXhwdw?oc=5"
      },
      {
        "name": "CBS News",
        "href": "https://www.cbsnews.com/news/israel-armenia-genocide-world-war-one/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-29",
    "image": {
      "src": "/covers/israel-recognizes-armenian-genocide.png",
      "alt": "A weathered stone memorial of carved upright slabs on a windswept hillside at dusk, an eternal flame burning low at its center",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 29 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Ambassador Morgenthau's Story, Ch. XXIV \"The Murder of a Nation\" (Henry Morgenthau Sr., 1918)",
        "excerpt": "The real purpose of the deportation was robbery and destruction; it really represented a new method of massacre. When the Turkish authorities gave the orders for these deportations, they were merely giving the death warrant to a whole race; they understood this well, and, in their conversations with me, they made no particular attempt to conceal the fact.",
        "source": "Henry Morgenthau, Ambassador Morgenthau's Story (Garden City, NY: Doubleday, Page & Co., 1918), Chapter 24. Wikisource.",
        "href": "https://en.wikisource.org/wiki/Ambassador_Morgenthau's_Story/Chapter_24"
      },
      {
        "category": "historical",
        "title": "The Treatment of Armenians in the Ottoman Empire, 1915-1916 (Bryce & Toynbee \"Blue Book\")",
        "excerpt": "All that happened in 1915 is in the regular line of Turkish policy. The only differences are in the scale of the present crimes, and in the fact that the lingering sufferings of deportations in which the deaths were as numerous as in the massacres, and fell with special severity upon the women, have in this latest instance been added.",
        "source": "Viscount Bryce (ed. Arnold J. Toynbee), The Treatment of Armenians in the Ottoman Empire, 1915-1916: Documents Presented to Viscount Grey of Fallodon (London: Hodder & Stoughton, 1916). Project Gutenberg eBook #69630.",
        "href": "https://www.gutenberg.org/ebooks/69630"
      },
      {
        "category": "literary",
        "title": "\"New Dark Days\" by Bedros Tourian (trans. Alice Stone Blackwell)",
        "excerpt": "The centuries of bloodshed\nAre past, those cruel years;\nBut there is still one country\nWhose mountains drip with tears,\nWhose river-banks are blood-stained,\nWhose mourning loads the breeze,—\nA land of dreary ruins,\nAshes, and cypress-trees.",
        "source": "Bedros Tourian, \"New Dark Days,\" in Armenian Poems, Rendered into English Verse by Alice Stone Blackwell (Boston, 1917). Wikisource.",
        "href": "https://en.wikisource.org/wiki/Armenian_Poems/New_Dark_Days"
      },
      {
        "category": "literary",
        "title": "\"The Tears of Araxes\" by Raphael Patkanian (trans. Alice Stone Blackwell)",
        "excerpt": "When hast thou seen a widow,\nAfter her true-love died,\nFrom head to foot resplendent\nWith ornaments of pride?",
        "source": "Raphael Patkanian, \"The Tears of Araxes,\" in Armenian Poems, Rendered into English Verse by Alice Stone Blackwell (Boston, 1917). Wikisource.",
        "href": "https://en.wikisource.org/wiki/Armenian_Poems/The_Tears_of_Araxes"
      },
      {
        "category": "artistic",
        "title": "Patarag (Divine Liturgy) for unaccompanied men's chorus, by Komitas Vardapet (early 20th c.)",
        "excerpt": "Komitas Vardapet, the priest-musicologist who survived the 1915 arrests only to be broken by what he witnessed, distilled the chants of the Armenian Apostolic Mass into a spare, unaccompanied choir of men's voices. Its grave modal lines turn worship into mourning, carrying a people's faith and its grief in the same breath. The work has become an unofficial requiem for the murdered nation.",
        "source": "Komitas Vardapet, Patarag (Armenian Divine Liturgy / Holy Mass) for male chorus. Score and editions hosted at IMSLP/Petrucci Music Library.",
        "href": "https://imslp.org/wiki/Patarag_(Komitas_Vardapet)"
      },
      {
        "category": "artistic",
        "title": "\"Armenians marched by Ottoman soldiers, 1915\" — photograph by Armin T. Wegner",
        "excerpt": "Armin T. Wegner, a German army medic, defied orders to photograph the columns of Armenian deportees driven into the Syrian desert. His smuggled images are among the few eyewitness photographs of the genocide, fixing in light the marches that words struggled to name. Here a file of civilians is herded along under armed guard, witness become evidence.",
        "source": "Armin T. Wegner, photograph of Armenian deportees escorted by Ottoman soldiers, 1915. Public domain, Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Armenians_marched_by_Ottoman_soldiers,_1915.png",
        "image": {
          "src": "/covers/israel-recognizes-armenian-genocide--art.png",
          "alt": "Black-and-white 1915 photograph of a column of Armenian civilians being marched along a road under guard by Ottoman soldiers",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 31
  },
  {
    "slug": "sovereign-funds-energy-dollar",
    "headline": "Sovereign investors managing $29 trillion shift toward energy assets and warn on the dollar",
    "overview": "An Invesco survey of 90 sovereign wealth funds and 54 central banks overseeing some $29 trillion found a marked pivot toward energy security and transition infrastructure, with 80% calling it the most credible way to make portfolios resilient. Concerns about the U.S. dollar were 'widespread and deepening,' with 61% of central banks saying high U.S. debt weakens the dollar's long-term role as a reserve asset, up from 20% in 2024.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMixgFBVV95cUxPcTU1TGpUQS1nWm1VemNlanY2aXd4Z014UklJSE5ubTl2Z1BMclhzMHlES1dfYktWd212anFRSWVZRV9rSVlGN0JzR1NZSF9iMmc3Mlp3NHYyNnRJNUdCSlFmdEg1R3VmeG41a3hsc0lIbnRHdWdndmkzTkdDQVMwcmRKVHJudFNQT3Vzdmg3b1Z6VjJGUzNZZ3dJaWhZQXZwZXkyYkJKTDNlNGhyc29OcGtNZmw5XzQtYkJiV0tpc3dyTG1BTlE?oc=5"
      },
      {
        "name": "South China Morning Post",
        "href": "https://www.scmp.com/business/banking-finance/article/3358682/sovereign-investors-us29-trillion-pivot-energy-assets-flag-dollar-fears"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-29",
    "image": {
      "src": "/covers/sovereign-funds-energy-dollar.png",
      "alt": "Rows of tall wind turbines and solar arrays stretching to the horizon at golden hour beneath a wide, clear sky",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 29 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Pliny the Elder, Natural History, Book XXXIII (1st c. AD, trans. Rackham)",
        "excerpt": "But from the invention of money came the original source of avarice when usury was devised, and a profitable life of idleness; by rapid stages what was no longer mere avarice but a positive hunger for gold flared up with a sort of frenzy",
        "source": "Pliny the Elder, Natural History, Book 33 (Rackham, Jones & Eichholz translation), Wikisource",
        "href": "https://en.wikisource.org/wiki/Natural_History_(Rackham,_Jones,_%26_Eichholz)/Book_33"
      },
      {
        "category": "historical",
        "title": "Adam Smith, An Inquiry into the Nature and Causes of the Wealth of Nations, Book I, ch. IV (1776)",
        "excerpt": "in every country of the world, I believe, the avarice and injustice of princes and sovereign states, abusing the confidence of their subjects, have by degrees diminished the real quantity of metal, which had been originally contained in their coins. The Roman as, in the latter ages of the republic, was reduced to the twenty-fourth part of its original value, and, instead of weighing a pound, came to weigh only half an ounce.",
        "source": "Adam Smith, The Wealth of Nations (1776), Book I, Chapter IV; Project Gutenberg eBook #3300",
        "href": "https://www.gutenberg.org/cache/epub/3300/pg3300-images.html"
      },
      {
        "category": "literary",
        "title": "William Shakespeare, The Life of Timon of Athens, Act IV, Scene 3 (First Folio, 1623)",
        "excerpt": "Gold? Yellow, glittering, precious Gold? No Gods, I am no idle Votarist,",
        "source": "Shakespeare, The Life of Tymon of Athens, Act 4 Scene 3, First Folio facsimile (1910), Wikisource",
        "href": "https://en.wikisource.org/wiki/Shakespeare_-_First_Folio_facsimile_(1910)/The_Life_of_Tymon_of_Athens/Act_4_Scene_3"
      },
      {
        "category": "literary",
        "title": "The First Epistle to Timothy 6:9-10 (King James Bible, 1611)",
        "excerpt": "But they that will be rich fall into temptation and a snare, and into many foolish and hurtful lusts, which drown men in destruction and perdition. For the love of money is the root of all evil: which while some coveted after, they have erred from the faith, and pierced themselves through with many sorrows.",
        "source": "Bible (King James), 1 Timothy 6:9-10, Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/1_Timothy"
      },
      {
        "category": "artistic",
        "title": "\"Le veau d'or\" (The Song of the Golden Calf), Mephistopheles' aria from Gounod's Faust (1859)",
        "excerpt": "Le veau d'or est toujours debout; On encense Sa puissance D'un bout du monde à l'autre bout! Pour fêter l'infâme idole, Peuples et rois confondus, Au bruit sombre des écus Dansent une ronde folle Autour de son piédestal?... Et Satan conduit le bal!",
        "source": "J. Barbier & M. Carré (libretto), Charles Gounod (music), Faust: a Lyric Drama in Five Acts, Act II; Project Gutenberg eBook #45806",
        "href": "https://www.gutenberg.org/files/45806/45806-h/45806-h.htm"
      },
      {
        "category": "artistic",
        "title": "The Moneylender and his Wife, Quentin Metsys (Quentin Matsys), 1514",
        "excerpt": "Oil-on-panel genre painting of a money-changer weighing gold coins on a balance while his wife, turning from a prayer book, watches the gold; a meditation on avarice and the lure of worldly wealth.",
        "source": "Quentin Metsys, The Moneylender and his Wife (1514), oil on panel, 70.5 × 67 cm, Louvre Museum, Paris (INV 1444); Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Massysm_Quentin_%E2%80%94_The_Moneylender_and_his_Wife_%E2%80%94_1514.jpg",
        "image": {
          "src": "/covers/sovereign-funds-energy-dollar--art.png",
          "alt": "A 1514 painting by Quentin Metsys of a money-changer weighing gold coins on a balance while his wife looks on, turning from her prayer book",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 32
  },
  {
    "slug": "philippines-solar-rush",
    "headline": "Philippines becomes the world's top buyer of solar panels as electricity prices soar",
    "overview": "Households across the Philippines are rushing to install rooftop solar to escape soaring power bills, making the country the world's biggest spender on solar panels with $407 million in imports in the three months through May, up 145% from a year earlier. Electricity prices have climbed about 10% since conflict in the Middle East drove up energy costs, and a typical household now spends roughly 12% of its income on power.",
    "genre": "Climate",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMipwFBVV95cUxOaHpHeV9XOF8wZXVYRS1NSDJ5bTJzTTZwZ3NlRHR5aXZ5dUh5ZXJtWnFmVHRvTVFfMXl1eUVSeDQtZGkxby1DQVZrb3ZrNUJFdE1rNjVMd05lRjBNTHU4a21tdTJ4ZFNnbDFFTE14M1hwY0Flb0ZtYmxuemhEQW45U05tYlAtcFRSM1JsMDVKYkhKUU5RMUNBVUNIQlJySXBxQ1dKVmlxSQ?oc=5"
      },
      {
        "name": "South China Morning Post",
        "href": "https://www.scmp.com/news/asia/southeast-asia/article/3358687/philippines-becomes-worlds-top-solar-spender-amid-middle-east-energy-crisis"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-29",
    "image": {
      "src": "/covers/philippines-solar-rush.png",
      "alt": "Rooftops of a dense tropical Philippine neighborhood crowded with newly installed solar panels gleaming under a bright midday sun",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 29 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "All About the Klondyke Gold Mines (1897) — first-person miners' accounts of the Klondike gold rush",
        "excerpt": "When gold was found in such astonishing quantities on the tributaries of the Klondyke the whole population of those camps moved bodily to the junction of the Klondyke and Yukon rivers, where Dawson City is established. We went to Eldorado Creek and made locations on what were called Claims Twenty-five, Twenty-six, Fifty-three and Fifty-four.",
        "source": "All About the Klondyke Gold Mines (1897), Project Gutenberg eBook #35824 (ibiblio/mirrorservice copy)",
        "href": "https://www.mirrorservice.org/sites/ftp.ibiblio.org/pub/docs/books/gutenberg/3/5/8/2/35824/35824-h/35824-h.htm"
      },
      {
        "category": "historical",
        "title": "Great Hymn to the Aten (c. 14th century BC), attributed to Pharaoh Akhenaten — humanity's early worship of the sun's power",
        "excerpt": "Thy rising [is] beautiful in the horizon of heaven, O Aten, ordainer of life. Thou dost shoot up in the horizon of the East, thou fillest every land with thy beneficence.",
        "source": "Great Hymn to Aten, trans. E. A. Wallis Budge, Wikisource",
        "href": "https://en.wikisource.org/wiki/Great_Hymn_to_Aten"
      },
      {
        "category": "literary",
        "title": "Walt Whitman, \"Give Me the Splendid Silent Sun\" (Leaves of Grass, 1882, Drum-Taps)",
        "excerpt": "Give me the splendid silent sun with all his beams full-dazzling,\nGive me juicy autumnal fruit ripe and red from the orchard,\nGive me a field where the unmow'd grass grows,\nGive me an arbor, give me the trellis'd grape,",
        "source": "Walt Whitman, Leaves of Grass (1882), Drum-Taps, Wikisource",
        "href": "https://en.wikisource.org/wiki/Leaves_of_Grass_(1882)/Drum-Taps/Give_Me_the_Splendid_Silent_Sun"
      },
      {
        "category": "literary",
        "title": "Lord Byron, \"Prometheus\" (1816) — the Titan who stole fire from heaven for mortals",
        "excerpt": "Titan! to whose immortal eyes\nThe sufferings of mortality,\nSeen in their sad reality,\nWere not as things that gods despise;",
        "source": "George Gordon, Lord Byron, \"Prometheus\" (1816), Wikisource",
        "href": "https://en.wikisource.org/wiki/Prometheus_(Byron)"
      },
      {
        "category": "artistic",
        "title": "Joseph Haydn, Die Schöpfung (The Creation), Hob.XXI:2 (1798) — recitative depicting the rising sun, \"In splendour bright is rising now the sun\"",
        "excerpt": "Recitative No. 13, \"Im vollen Glanze steiget jetzt die Sonne\" (\"In splendour bright is rising now the sun\"), leading into the chorus \"Die Himmel erzählen die Ehre Gottes\" (\"The heavens are telling the glory of God\"). Original full scores are available as public-domain PDFs.",
        "source": "Joseph Haydn, Die Schöpfung, Hob.XXI:2 (1798), full scores, IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Die_Sch%C3%B6pfung,_Hob.XXI:2_(Haydn,_Joseph)"
      },
      {
        "category": "artistic",
        "title": "Claude Monet, Impression, Sunrise (Impression, soleil levant), 1872",
        "excerpt": "Monet's view of the port of Le Havre at dawn, the red sun burning through morning haze over the water, the painting that gave Impressionism its name and made the rising sun its emblem of fleeting light.",
        "source": "Claude Monet, Impression, Sunrise (1872), oil on canvas, Musée Marmottan Monet, Paris; image via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Monet_-_Impression,_Sunrise.jpg",
        "image": {
          "src": "/covers/philippines-solar-rush--art.png",
          "alt": "Claude Monet's painting Impression, Sunrise, showing an orange sun rising over a hazy blue harbour with small boats",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 33
  },
  {
    "slug": "nasa-swift-telescope-rescue",
    "headline": "NASA launches a $30 million mission to keep its aging Swift telescope from falling to Earth",
    "overview": "NASA is racing to save the 22-year-old Swift gamma-ray observatory, which atmospheric drag is pulling toward Earth and could drag from orbit by year's end. A refrigerator-size robotic spacecraft built by the startup Katalyst is set to grab Swift and gradually boost its orbit over more than six weeks, in a first-of-its-kind $30 million rescue.",
    "genre": "Science",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMimwFBVV95cUxQa2RTR1BqT1UwaVdIYzdLMTZteWdDbDBVWWdKbDRReDNaOXBXakctLWxXcWdFb2l0cmF5NFVXYUZNbUZ4YjZxTGNHdXBQMkN3ZmE4V1FFc3BGdVQ5LV9yLTVKUU1TT0VlSmhGdm1LcGNNN3RWNmR3RGhvODBaY0c3OHljYXlsOGpHV3NaVWc5SjkzNXVpRUFRcHQzaw?oc=5"
      },
      {
        "name": "Space.com",
        "href": "https://www.space.com/space-exploration/launches-spacecraft/nasa-is-paying-usd30-million-for-a-1st-of-its-kind-rescue-mission-to-the-aging-swift-telescope-before-it-falls-from-space-is-it-worth-it"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-29",
    "image": {
      "src": "/covers/nasa-swift-telescope-rescue.png",
      "alt": "A satellite observatory drifting in low Earth orbit above the blue curve of the planet, sunlight glinting off its golden panels against the black of space",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 29 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Herodotus, Histories, Book VIII (the diver Scyllias salvaging the Persian wrecks), 5th c. BCE",
        "excerpt": "Now the Persians had with them a man named Scyllias, a native of Scione, who was the most expert diver of his day. At the time of the shipwreck off Mount Pelion he had recovered for the Persians a great part of what they lost; and at the same time he had taken care to obtain for himself a good share of the treasure.",
        "source": "Herodotus, The History of Herodotus, trans. George Rawlinson, Book VIII (Urania), section 8 (public domain).",
        "href": "https://en.wikisource.org/wiki/The_History_of_Herodotus_(Rawlinson)/Book_8"
      },
      {
        "category": "historical",
        "title": "The Anglo-Saxon Chronicle, entry for A.D. 1066 (the comet read as an omen before the Norman Conquest)",
        "excerpt": "Then was over all England such a token seen as no man ever saw before. Some men said that it was the comet-star, which others denominate the long-hair'd star. It appeared first on the eve called \"Litania major\", that is, on the eighth before the calends off May; and so shone all the week.",
        "source": "The Anglo-Saxon Chronicle, trans. J. Ingram and J. A. Giles, year 1066 (Project Gutenberg, public domain).",
        "href": "https://www.gutenberg.org/cache/epub/657/pg657.txt"
      },
      {
        "category": "literary",
        "title": "Ovid, Metamorphoses, Book VIII (Daedalus and Icarus), 8 CE",
        "excerpt": "The vicinity of the sun softens the fragrant wax, the chains of the feathers; the wax melted: he shook his bare arms and lacking oarage he takes up no air, and his mouth shouting his father's name is swept up in the blue sea, which takes its name from him.",
        "source": "Ovid, Metamorphoses VIII.183–235, \"Daedalus and Icarus,\" Wikisource literal English translation of the Latin original (public domain).",
        "href": "https://en.wikisource.org/wiki/Translation:Metamorphoses/Daedalus_and_Icarus"
      },
      {
        "category": "literary",
        "title": "John Milton, Paradise Lost, Book I (Satan hurled from the sky), 1674",
        "excerpt": "Him the Almighty Power\nHurled headlong flaming from th' ethereal sky,\nWith hideous ruin and combustion, down\nTo bottomless perdition, there to dwell\nIn adamantine chains and penal fire,\nWho durst defy th' Omnipotent to arms.",
        "source": "John Milton, Paradise Lost (1674), Book I, lines 44–49, Wikisource (public domain).",
        "href": "https://en.wikisource.org/wiki/Paradise_Lost_(1674)/Book_I"
      },
      {
        "category": "artistic",
        "title": "Joseph Haydn, Die Schöpfung (The Creation), Hob.XXI:2 — chorus \"The heavens are telling the glory of God\" (1798)",
        "excerpt": "Haydn's oratorio crowns its first part with a radiant chorus in which sun, moon, and stars proclaim their maker, the full choir surging upward as the heavens themselves seem to sing. It is a fitting anthem for instruments we send aloft to read the sky: a machine that watches the stars, lifted back into the firmament it was built to observe.",
        "source": "Joseph Haydn, Die Schöpfung (The Creation), Hob.XXI:2, Part I, No. 13 \"Die Himmel erzählen die Ehre Gottes\" / \"The heavens are telling the glory of God\"; full scores on IMSLP (public domain).",
        "href": "https://imslp.org/wiki/Die_Sch%C3%B6pfung,_Hob.XXI:2_(Haydn,_Joseph)"
      },
      {
        "category": "artistic",
        "title": "Johannes Vermeer, The Astronomer, c. 1668",
        "excerpt": "A scholar leans toward a celestial globe in a quiet, light-filled room, his hand reaching out as if to touch the turning heavens. Vermeer's image distills the ancient human urge to watch and measure the sky — the same impulse that built the Swift telescope and now strains to keep it aloft.",
        "source": "Johannes Vermeer, The Astronomer (De astronoom), oil on canvas, c. 1668, Musée du Louvre, Paris (RF 1983-28); image via Wikimedia Commons (public domain).",
        "href": "https://commons.wikimedia.org/wiki/File:Johannes_Vermeer_-_The_Astronomer_-_WGA24685.jpg",
        "image": {
          "src": "/covers/nasa-swift-telescope-rescue--art.png",
          "alt": "Johannes Vermeer's painting The Astronomer, a scholar in a lit room reaching toward a celestial globe",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 34
  },
  {
    "slug": "canada-south-africa-world-cup",
    "headline": "Canada beat South Africa 1-0 on a stoppage-time goal to reach the World Cup round of 16",
    "overview": "Canada defeated South Africa 1-0 with a stoppage-time strike by Stephen Eustaquio in their World Cup round-of-32 match on June 28, 2026, advancing to the round of 16. The result extended the run of one of the tournament's three host nations, which is staging the World Cup alongside the United States and Mexico.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMikgFBVV95cUxNVnpHOWpzS0xBVDdXREpMRGx5aFV4cmdZbWJEUDR3UDdDY1hwZzh0aVBlVm04T0JvZ0EyTXhhVW5ibW9VdHFkVmJYa3hpcHUybElUYkVqSXNldkhQVjJPbkU3VWgxVWVOVFF1Z21rZzAwbkZuSmxmMmFrWXdJSk9VWmNuaUltaHVRMlBfa0lKVnBPQQ?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiogFBVV95cUxORXl1YmQ2Y2hFNWxoc0FISk1DcHdnV0dsQkwzRFJkYk5YVmk4SjJVLUtiWU1XQ1NnQkpSZXFDa1dubkRCaVJVQXlOWlkwQXNTRDZhak90Nlpzck1nSFRMMXJuaHU2d1dpazVmSmhMeHRpRTl4OXAyMmZrdkJ2WS1rZHZtSlFmUTFzQzZFQVR1ZHhXbDd0Yy1Kb1c5SnRzZVF3QWc?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-29",
    "image": {
      "src": "/covers/canada-south-africa-world-cup.png",
      "alt": "A floodlit football stadium at night, the green pitch glowing under bright lights as players celebrate near a corner flag amid drifting confetti",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 29 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Herodotus, Histories, Book VI (Erato) — Pheidippides runs to Sparta before Marathon (5th c. BCE; trans. G. C. Macaulay)",
        "excerpt": "First of all, while they were still in the city, the generals sent off to Sparta a herald, namely Pheidippides an Athenian and for the rest a runner of long day-courses and one who practised this as his profession.",
        "source": "Herodotus, The History of Herodotus, Book VI, ch. 105, translated by G. C. Macaulay (London: Macmillan, 1890), public domain.",
        "href": "https://en.wikisource.org/wiki/The_History_of_Herodotus_(Macaulay)/Book_VI"
      },
      {
        "category": "historical",
        "title": "Pausanias, Description of Greece, Book V (Elis I) — the first Olympic foot-race and its first victor (2nd c. CE; trans. W. H. S. Jones)",
        "excerpt": "This I can prove; for when the unbroken tradition of the Olympiads began there was first the foot-race, and Coroebus an Elean was victor. There is no statue of Coroebus at Olympia, but his grave is on the borders of Elis.",
        "source": "Pausanias, Description of Greece 5.8.6, translated by W. H. S. Jones (Loeb Classical Library), public domain.",
        "href": "https://www.theoi.com/Text/Pausanias5A.html"
      },
      {
        "category": "literary",
        "title": "Homer, Iliad, Book XXIII — the funeral games for Patroclus; Odysseus's last-stride victory in the foot-race (trans. Alexander Pope)",
        "excerpt": "Buoyed by her heavenly force, he seems to swim, And feels a pinion lifting every limb.",
        "source": "Homer, The Iliad of Homer, Book XXIII, translated by Alexander Pope; text via Wikisource, public domain.",
        "href": "https://en.wikisource.org/wiki/The_Iliad_of_Homer_(Pope)/Book_23"
      },
      {
        "category": "literary",
        "title": "Pindar, Olympian Ode 1 (476 BCE) — victory ode for Hieron's triumph (trans. Ernest Myers)",
        "excerpt": "Best is Water of all, and Gold as a flaming fire in the night shineth eminent amid lordly wealth; but if of prizes in the games thou art fain, O my soul, to tell, then, as for no bright star more quickening than the sun must thou search in the void firmament by day, so neither shall we find any games greater than the Olympic whereof to utter our voice.",
        "source": "Pindar, The Extant Odes of Pindar, Olympian Odes I, translated by Ernest Myers (London: Macmillan, 1874), public domain.",
        "href": "https://en.wikisource.org/wiki/Odes_of_Pindar_(Myers)/Olympian_Odes/1"
      },
      {
        "category": "artistic",
        "title": "Giuseppe Verdi, \"Triumphal March\" (Marcia trionfale) from Aida, Act II (1871)",
        "excerpt": "Verdi's blazing brass fanfare crowns a homecoming hero amid the roar of a triumphant crowd, the orchestra surging with the unmistakable sound of victory. It is the music of glory claimed at the climactic moment, a fitting anthem for a side that seizes its triumph at the very end.",
        "source": "Giuseppe Verdi, Aida (opera, 1871), \"Gran Finale / Marcia trionfale,\" Act II; full scores and parts public domain via IMSLP.",
        "href": "https://imslp.org/wiki/A%C3%AFda_(Verdi,_Giuseppe)"
      },
      {
        "category": "artistic",
        "title": "Terracotta Panathenaic prize amphora depicting a foot-race, attributed to the Euphiletos Painter (Attic black-figure, ca. 530 BCE)",
        "excerpt": "Five bearded runners stretch forward in mid-stride along the belly of a black-figure prize amphora, the kind of oil-filled vessel awarded to victors at the Panathenaic Games. The painted athletes embody the ancient ideal of the contest and the glory of the winner.",
        "source": "Attributed to the Euphiletos Painter, Terracotta Panathenaic prize amphora, ca. 530 BCE, The Metropolitan Museum of Art (Rogers Fund, 1914, acc. no. 14.130.12); image via Wikimedia Commons, public domain.",
        "href": "https://commons.wikimedia.org/wiki/File:Terracotta_Panathenaic_prize_amphora_MET_DP245711.jpg",
        "image": {
          "src": "/covers/canada-south-africa-world-cup--art.png",
          "alt": "Attic black-figure Panathenaic prize amphora showing five nude runners competing in a foot-race",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 35
  },
  {
    "slug": "sothebys-lewis-collection-record",
    "headline": "Sotheby's sells Joe Lewis art collection for a record $392.6 million in London",
    "overview": "The collection of British billionaire Joe Lewis sold for £296.3 million ($392.6 million) at Sotheby's in London, nearly double its estimate and a record for a single-owner sale in Europe. A Modigliani nude fetched $63.9 million and a 1902 Klimt portrait $47.9 million; only one of the 25 lots failed to sell.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Artforum",
        "href": "https://www.artforum.com/news/sothebys-london-masterpiece-sale-earns-392-million-1234753425/"
      },
      {
        "name": "ARTnews",
        "href": "https://www.artnews.com/art-news/market/sothebys-london-june-2026-evening-sale-report-joe-lewis-1234790208/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-29",
    "image": {
      "src": "/covers/sothebys-lewis-collection-record.png",
      "alt": "An elegant auction-house saleroom with a packed crowd of bidders facing a raised rostrum, a single illuminated painting displayed on the wall behind the auctioneer",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 29 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Pliny the Elder, Natural History, Book XXXV (1st century AD; on painting and its prices)",
        "excerpt": "Four colours only were used by the illustrious painters Apelles, Action, Melanthius and Nicomachus to execute their immortal works—of whites, Melinum; of yellow ochres, Attic; of reds, Pontic Sinopis; of blacks, atramentum—although their pictures each sold for the wealth of a whole town.",
        "source": "Pliny the Elder, Natural History, Book 35, trans. H. Rackham (Loeb), via Wikisource",
        "href": "https://en.wikisource.org/wiki/Natural_History_(Rackham,_Jones,_%26_Eichholz)/Book_35"
      },
      {
        "category": "historical",
        "title": "William Buchanan, Memoirs of Painting (1824; on the dispersal of the Orléans Collection)",
        "excerpt": "In 1792, the Duke d'Orleans, for the purpose of procuring money to agitate the national spirit, of which he always hoped ultimately to profit, sold all the pictures of the Palais Royal.",
        "source": "William Buchanan, Memoirs of Painting, with a Chronological History of the Importation of Pictures by the Great Masters into England since the French Revolution (London: Ackermann, 1824), via Internet Archive",
        "href": "https://archive.org/stream/memoirsofpaintin1to2buch/memoirsofpaintin1to2buch_djvu.txt"
      },
      {
        "category": "literary",
        "title": "Francis Bacon, \"Of Riches\" (Essays, 1625)",
        "excerpt": "I cannot call Riches better than the baggage of virtue. The Roman word is better, impedimenta.",
        "source": "Francis Bacon, The Essays of Francis Bacon, XXXIV \"Of Riches,\" via Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Essays_of_Francis_Bacon/XXXIV_Of_Riches"
      },
      {
        "category": "literary",
        "title": "Ecclesiastes 2:8, 2:11 (King James Bible, 1611)",
        "excerpt": "I gathered me also silver and gold, and the peculiar treasure of kings and of the provinces: I gat me men singers and women singers, and the delights of the sons of men, as musical instruments, and that of all sorts. … Then I looked on all the works that my hands had wrought, and on the labour that I had laboured to do: and, behold, all was vanity and vexation of spirit, and there was no profit under the sun.",
        "source": "Bible (King James Version), Ecclesiastes, chapter 2, via Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Ecclesiastes"
      },
      {
        "category": "artistic",
        "title": "George Frideric Handel, Music for the Royal Fireworks, HWV 351 (1749)",
        "excerpt": "Handel's grand wind-and-orchestra suite was composed under contract to George II to crown a royal celebration in Green Park, turning sound itself into a display of princely magnificence. Like a great single-owner auction, it stages opulence as spectacle: power and taste made audible, and the splendour of a patron broadcast for all to behold.",
        "source": "Music for the Royal Fireworks, HWV 351 (Handel, George Frideric), scores via IMSLP/Petrucci Music Library",
        "href": "https://imslp.org/wiki/Music_for_the_Royal_Fireworks,_HWV_351_(Handel,_George_Frideric)"
      },
      {
        "category": "artistic",
        "title": "Amedeo Modigliani, Nude on a Blue Cushion (1917)",
        "excerpt": "Modigliani's reclining nudes, of which this is among the most celebrated, are the very type of work that drew the record bids in the Lewis sale—an icon of sensuous modern beauty turned, a century on, into a trophy of the marketplace. Painted under his dealer Zborowski's patronage, once scandalous, it now hangs in a great public collection: beauty first bought, then beyond price.",
        "source": "Amedeo Modigliani, Nude on a Blue Cushion, 1917, oil on canvas, National Gallery of Art, Washington (Chester Dale Collection, 1963.10.46); public domain, via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Amedeo_Modigliani_-_Nude_on_a_Blue_Cushion_(1917).jpg",
        "image": {
          "src": "/covers/sothebys-lewis-collection-record--art.png",
          "alt": "Modigliani's 1917 painting Nude on a Blue Cushion, a reclining female nude against a warm ground with a blue cushion",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 36
  },
  {
    "slug": "meta-ai-glasses-kylie-jenner",
    "headline": "Meta launches its first in-house AI glasses, including a $399 Kylie Jenner edition",
    "overview": "Meta unveiled Meta Glasses, its first AI smart glasses not tied to the Ray-Ban brand, with models starting at $299 and a $399 'Starfire' edition co-designed with Kylie Jenner that features a voice modeled on hers. Built with EssilorLuxottica and running Meta's Muse Spark AI model, the glasses offer a 3K camera, spatial audio and live translation in up to 20 languages.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Dezeen",
        "href": "https://www.dezeen.com/2026/06/25/meta-glasses-smart-ai-kylie-jenner/"
      },
      {
        "name": "Gizmodo",
        "href": "https://gizmodo.com/metas-new-smart-glasses-drop-ray-ban-branding-and-add-kylie-jenner-2000775546"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-29",
    "image": {
      "src": "/covers/meta-ai-glasses-kylie-jenner.png",
      "alt": "A pair of sleek modern smart glasses resting on a minimalist studio surface, a tiny camera lens visible at one corner under soft directional light",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 29 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Galileo Galilei, Sidereus Nuncius (The Sidereal Messenger), 1610; trans. E. S. Carlos, 1880",
        "excerpt": "Relying on this, with no labour nor expense, I succeeded in constructing for myself an instrument so superior that objects seen through it appear magnified nearly a thousand times, and more than thirty times nearer than if viewed by the natural powers of sight alone.",
        "source": "Galileo Galilei, The Sidereal Messenger of Galileo Galilei, trans. Edward Stafford Carlos (London: Rivingtons, 1880). Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_Sidereal_Messenger_of_Galileo_Galilei/The_Sidereal_Messenger"
      },
      {
        "category": "historical",
        "title": "Roger Bacon, Opus Majus, Part V (Optical Science), c. 1267; trans. Robert Belle Burke, 1928",
        "excerpt": "If a man looks at letters or other small objects through the medium of a crystal or of glass or of some other transparent body placed above the letters, and it is the smaller part of a sphere whose convexity is toward the eye, and the eye is in the air, he will see the letters much better and they will appear larger to him. ... Therefore this instrument is useful to the aged and to those with weak eyes.",
        "source": "Roger Bacon, The Opus Majus of Roger Bacon, Vol. II, trans. Robert Belle Burke (Philadelphia: University of Pennsylvania Press, 1928), Optical Science. Internet Archive.",
        "href": "https://archive.org/details/opusmajusofroger002065mbp"
      },
      {
        "category": "literary",
        "title": "Oscar Wilde, The Picture of Dorian Gray (1891), Chapter 2",
        "excerpt": "How sad it is! I shall grow old, and horrible, and dreadful. But this picture will remain always young. It will never be older than this particular day of June. . . . If it were only the other way! if it were I who was to be always young, and the picture that was to grow old! For that—for that—I would give everything! Yes, there is nothing in the whole world I would not give! I would give my soul for that!",
        "source": "Oscar Wilde, The Picture of Dorian Gray (London: Ward, Lock & Co., 1891), Chapter 2. Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_Picture_of_Dorian_Gray_(1891)/Chapter_2"
      },
      {
        "category": "literary",
        "title": "Ralph Waldo Emerson, Nature (1836), Chapter I: Nature",
        "excerpt": "Standing on the bare ground,—my head bathed by the blithe air, and uplifted into infinite space,—all mean egotism vanishes. I become a transparent eye-ball. I am nothing. I see all. The currents of the Universal Being circulate through me; I am part or particle of God.",
        "source": "Ralph Waldo Emerson, Nature (Boston: James Munroe and Company, 1836), Chapter 1. Wikisource.",
        "href": "https://en.wikisource.org/wiki/Nature_(1836)/Chapter_1"
      },
      {
        "category": "artistic",
        "title": "Charles Gounod, Faust (1859), Marguerite's \"Jewel Song\" (Air des bijoux), Act III",
        "excerpt": "Ah! at the bottom of the casket is a glass: I there can see myself!—But am I not becoming vain? ... Ah! I laugh, as I pass, to look into a glass; Is it truly Marguerite, then? Is it you? Tell me true! No, no, no, 'tis not you! No, no, that bright face there reflected Must belong to a queen!",
        "source": "Charles Gounod, Faust: A Lyric Drama in Five Acts, libretto by J. Barbier and M. Carré (English translation), Project Gutenberg eBook #45806; score at IMSLP, Faust, CG 4 (Gounod, Charles).",
        "href": "https://imslp.org/wiki/Faust,_CG_4_(Gounod,_Charles)"
      },
      {
        "category": "artistic",
        "title": "Charles Allan Gilbert, All Is Vanity (1892)",
        "excerpt": "A young woman at her vanity table gazes into a large round mirror amid perfume bottles; seen from a distance, the whole scene resolves into a grinning human skull—a memento mori in which the act of admiring oneself is, at the same time, the image of death watching back.",
        "source": "Charles Allan Gilbert, All Is Vanity (1892), pen-and-ink double image. Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Allisvanity.jpg",
        "image": {
          "src": "/covers/meta-ai-glasses-kylie-jenner--art.png",
          "alt": "Charles Allan Gilbert's 1892 drawing All Is Vanity: a woman before a vanity mirror that, viewed at a distance, forms a human skull.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 37
  },
  {
    "slug": "austria-anthropic-eu",
    "headline": "Austria urges the EU to help host AI firm Anthropic after U.S. restricts foreign access",
    "overview": "Austria's state secretary for digitalization, Alexander Proell, wrote to the EU's technology commissioner urging the bloc to explore establishing AI company Anthropic within the European Union, after Washington moved to bar foreigners from using its most advanced models. The letter, released June 28, 2026, argued Europe must not be cut off from major AI innovation, though Proell acknowledged scepticism about whether the step is feasible.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiuwFBVV95cUxOV2VmbzlqUks2ZDZGQ2xYcDk0ZEVFS0hCSXFxMUg2amtkOWJmSDkxSV9mb0xRelFJSUMteUJFaG5YS2pSZHJfdVEzeXRPY3dYd2lSejg0SnFvQjhXU0Noak1fSUxuVnUxdDBpWUNKc3BtVTFKTHNSbnFfRkQ0aUY4dENia0pmOGNVeUZDeVVuZWdpS1hqV0R6S3dGcjJEbkV4YVNMS19hMEg2WFFUbGx0UEUtcmRkX0hnWkZz?oc=5"
      },
      {
        "name": "Business Recorder",
        "href": "https://www.brecorder.com/news/40427550/austria-urges-europe-to-host-anthropic-following-us-curbs-on-ai-access"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-29",
    "image": {
      "src": "/covers/austria-anthropic-eu.png",
      "alt": "A grand European Union building of glass and steel flying rows of flags at dusk, cool blue light reflecting off its facade",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 29 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Procopius of Caesarea, History of the Wars, Book VIII (Gothic War), ch. 17 (6th century AD) — the monks who promised Justinian the secret of silk",
        "excerpt": "At about this time certain monks, coming from India and learning that the Emperor Justinian entertained the desire that the Romans should no longer purchase their silk from the Persians, came before the emperor and promised so to settle the silk question that the Romans would no longer purchase this article from their enemies, the Persians, nor indeed from any other nation; for they had, they said, spent a long time in the country situated north of the numerous nations of India — a country called Serinda — and there they had learned accurately by what means it was possible for silk to be produced in the land of the Romans. Whereupon the emperor made very diligent enquiries and asked them many questions to see whether their statements were true, and the monks explained to him that certain worms are the manufacturers of silk, nature being their teacher and compelling them to work continually.",
        "source": "Procopius, History of the Wars, Book VIII.17, trans. H. B. Dewing, Loeb Classical Library (1928); LacusCurtius (penelope.uchicago.edu), Procopius, Wars VIII.15–17.",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Procopius/Wars/8C*.html"
      },
      {
        "category": "historical",
        "title": "Einhard, Vita Karoli Magni (Life of Charlemagne), ch. 25 (c. 817–833) — Charlemagne drawing the greatest scholars to his court",
        "excerpt": "He paid the greatest attention to the liberal arts, and showed the greatest respect and bestowed high honours upon those who taught them. For his lessons in grammar he listened to the instruction of Deacon Peter of Pisa, an old man; but for all other subjects Albinus, called Alcuin, also a deacon, was his teacher—a man from Britain, of the Saxon race, and the most learned man of his time.",
        "source": "Einhard, Vita Karoli Magni, trans. A. J. Grant, in Early Lives of Charlemagne by Eginhard and the Monk of St Gall (London: Moring, 1905); Wikisource.",
        "href": "https://en.wikisource.org/wiki/Vita_Karoli_Magni"
      },
      {
        "category": "literary",
        "title": "Francis Bacon, New Atlantis (1627) — the \"Merchants of Light\" of Salomon's House",
        "excerpt": "For the several employments and offices of our fellows, we have twelve that sail into foreign countries under the names of other nations (for our own we conceal), who bring us the books and abstracts, and patterns of experiments of all other parts. These we call merchants of light.",
        "source": "Francis Bacon, New Atlantis (1627); Wikisource.",
        "href": "https://en.wikisource.org/wiki/New_Atlantis"
      },
      {
        "category": "literary",
        "title": "Dante Alighieri, Paradiso, Canto XVII (c. 1320, trans. Longfellow 1867) — Cacciaguida foretells the bitterness of exile and dependence on foreign hospitality",
        "excerpt": "Thou shalt abandon everything beloved / Most tenderly, and this the arrow is / Which first the bow of banishment shoots forth. / Thou shalt have proof how savoureth of salt / The bread of others, and how hard a road / The going down and up another's stairs.",
        "source": "Dante Alighieri, The Divine Comedy, Paradiso, Canto XVII, trans. Henry Wadsworth Longfellow (1867); Wikisource.",
        "href": "https://en.wikisource.org/wiki/Divine_Comedy_(Longfellow_1867)/Volume_3/Canto_17"
      },
      {
        "category": "artistic",
        "title": "George Frideric Handel, Parnasso in festa, HWV 73 (serenata, 1734) — Apollo and the Muses keep festival on Parnassus",
        "excerpt": "Composed by Handel and first performed at the King's Theatre, London, on 13 March 1734, this serenata stages Apollo and the Muses celebrating on Mount Parnassus, the mythic seat of the arts and patronage. It is a courtly image of genius gathered and honoured, the gods of learning and music feted by a generous host. The full public-domain score is hosted on IMSLP.",
        "source": "G. F. Handel, Parnasso in festa, per li sponsali di Teti e Peleo, HWV 73 (1734); IMSLP / Petrucci Music Library.",
        "href": "https://imslp.org/wiki/Parnasso_in_festa,_HWV_73_(Handel,_George_Frideric)"
      },
      {
        "category": "artistic",
        "title": "Raphael (Raffaello Sanzio), The School of Athens (fresco, 1509–1511), Stanza della Segnatura, Apostolic Palace, Vatican",
        "excerpt": "Raphael's fresco gathers the philosophers and scholars of antiquity beneath the vaults of an idealized academy, a vision of knowledge welcomed, housed and honoured in one place. It is the archetypal image of a polity that makes itself the home of the wise, the patron of learning that draws genius within its walls.",
        "source": "Raphael, The School of Athens, 1509–1511, fresco, 500 × 770 cm, Stanza della Segnatura, Vatican; Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:%22The_School_of_Athens%22_by_Raffaello_Sanzio_da_Urbino.jpg",
        "image": {
          "src": "/covers/austria-anthropic-eu--art.png",
          "alt": "Raphael's fresco The School of Athens, with Plato and Aristotle at the center of an assembly of ancient philosophers and scholars within a grand classical hall.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 38
  },
  {
    "slug": "vietnam-arrests-dissent",
    "headline": "Rights group warns Vietnam is escalating arrests under broad laws to silence dissent",
    "overview": "A rights group warned that Vietnam, under Communist Party chief and President To Lam, is increasingly using vaguely worded laws to jail activists and critics, citing growing use of Article 331 of the penal code, which carries up to seven years in prison. The report said the crackdown is driven by fears of a 'color revolution' and noted Hanoi's coordination with Beijing on 'political security.'",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMijgFBVV95cUxQaGs5M1dja0dNOWdkelhybXVkRjIwemc1VDVLc1E1bno1R2drUWQ0Vm1mdkhDNWltMVR0Sms2NHo3MXJVN3lCZlR4RGFWUnRJOHVxeEhua0gxQXVIdC1kZE84aU03VUx3em8zWTNXMGZnVTdqZGRJM2VmdWhJOGxHNEdoMkhnMUtBVl9Ra0lR?oc=5"
      },
      {
        "name": "The Hill",
        "href": "https://thehill.com/homenews/ap/ap-international/ap-a-rights-group-warns-vietnam-is-ramping-up-arrests-under-broad-laws-to-crush-dissent/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-29",
    "image": {
      "src": "/covers/vietnam-arrests-dissent.png",
      "alt": "An empty prison corridor of grey concrete and steel bars in dim light, a single barred window casting a faint shaft of light on the floor",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 29 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Apology of Socrates (Plato, c. 399 BCE)",
        "excerpt": "Men of Athens, I respect and love you, but I shall obey the god rather than you, and while I live and am able to continue, I shall never give up philosophy or stop exhorting you and pointing out the truth to any one of you whom I may meet",
        "source": "Plato, Apology, 29d, trans. Harold North Fowler, Loeb Classical Library; Perseus Digital Library, Tufts University",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0170:text=Apol.:section=29d"
      },
      {
        "category": "historical",
        "title": "\"J'Accuse...!\" (Émile Zola, open letter, 1898)",
        "excerpt": "I repeat it with a more vehement certainty: the truth marches on and nothing will stop it.",
        "source": "Émile Zola, \"J'Accuse...!\", open letter to Félix Faure, President of the French Republic, published in L'Aurore, 13 January 1898; English translation, Wikisource",
        "href": "https://en.wikisource.org/wiki/Translation:J%27Accuse...!"
      },
      {
        "category": "literary",
        "title": "Antigone (Sophocles, c. 441 BCE)",
        "excerpt": "Nor did I think that your decrees were of such force, that a mortal could override the unwritten and unfailing statutes given us by the gods. For their life is not of today or yesterday, but for all time, and no man knows when they were first put forth.",
        "source": "Sophocles, Antigone, ed./trans. Sir Richard Jebb; Perseus Digital Library, Tufts University",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0186:card=441"
      },
      {
        "category": "literary",
        "title": "Areopagitica (John Milton, 1644)",
        "excerpt": "as good almost kill a Man as kill a good Book; who kills a Man kills a reasonable creature, Gods Image; but hee who destroyes a good Booke, kills reason it selfe, kills the Image of God, as it were in the eye.",
        "source": "John Milton, Areopagitica: A Speech for the Liberty of Unlicensed Printing, 1644; Wikisource",
        "href": "https://en.wikisource.org/wiki/Areopagitica_(1644)"
      },
      {
        "category": "artistic",
        "title": "Prisoners' Chorus, \"O welche Lust,\" from Fidelio, Op. 72 (Ludwig van Beethoven, 1814)",
        "excerpt": "In Beethoven's only opera, prisoners are briefly allowed up from their dungeon into the open air, and they sing trembling of light and freedom before the guards drive them back below. The hushed, swelling chorus turns the simple act of breathing freely into an anthem of conscience caged by tyranny. It remains music's great cry for those silenced behind prison walls.",
        "source": "Ludwig van Beethoven, Fidelio, Op. 72, Act I, No. 10, Prisoners' Chorus \"O welche Lust, in freier Luft\"; scores at IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Fidelio,_Op.72_(Beethoven,_Ludwig_van)"
      },
      {
        "category": "artistic",
        "title": "Prisoners Exercising (Prisoners' Round), Vincent van Gogh, 1890",
        "excerpt": "A line of inmates shuffles in an endless circle at the bottom of a deep brick shaft, hemmed in by towering walls and a few unreachable windows that admit only a sliver of sky. Van Gogh, painting from inside an asylum, reduced each man to a bowed, anonymous figure stripped of will and voice, locked into a motion that goes nowhere. The image renders confinement as a closed loop of futility, a fitting mirror for those silenced and detained for daring to speak.",
        "source": "Vincent van Gogh, Prisoners Exercising (Prisoners' Round), 1890, Pushkin Museum of Fine Arts, Moscow; via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Vincent_Willem_van_Gogh_037.jpg",
        "image": {
          "src": "/covers/vietnam-arrests-dissent--art.png",
          "alt": "Prisoners trudging in a tight circle within a deep, windowless brick courtyard, dwarfed by high prison walls",
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
