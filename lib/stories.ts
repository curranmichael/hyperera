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
    "slug": "cdc-ebola-highest-alert",
    "headline": "U.S. CDC raises its Ebola outbreak response to the highest alert level",
    "overview": "The U.S. Centers for Disease Control and Prevention on June 26, 2026 raised its emergency response to the Ebola outbreak in the Democratic Republic of the Congo and Uganda to a Level 1 activation, its most severe designation. The outbreak, caused by the Bundibugyo strain of the virus, has infected more than 1,100 people and is among the largest on record, though the CDC said the risk of spread within the United States remains low. About 400 CDC staff are supporting the response, with personnel deployed to the affected countries.",
    "genre": "Science",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMi4AFBVV95cUxQSmVlNlBOc2NRalkzTTJQMFUyMFlfVm45UXVjUk96YVdBdlZNTURvczhsbWhPSVd5ZVF1TjlBdGVmQUlWVVhmWXJOLW9wOTNhV25vZzRwMVl1WmVYWk9CNXRMSjJpdnl2VDNocVlqUDNIdTRKMjRscERyNlREN1YxTmhOT3cxSlFBZElZOThEUEdVT1g4bWppV0lxM2Y0U0VNVGg5OF83SmpCNWJha2hDOEZ0VExWOTRpTHJPbWFZWF9OcV9kdWZhZHhMbDlZdnBkQ0Z6bVowWlV4LTg4bXBqMQ?oc=5"
      },
      {
        "name": "CDC",
        "href": "https://www.cdc.gov/media/releases/2026/transcript-update-on-ebola-outbreak-in-the-democratic-republic-of-the-congo-and-uganda-6-26-26.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-27",
    "image": {
      "src": "/covers/cdc-ebola-highest-alert.png",
      "alt": "Colorized electron micrograph of an Ebola virus virion",
      "credit": "Wikimedia Commons"
    },
    "lead": true,
    "edition": "Afternoon Edition · 27 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Plague of Athens (430 BCE)",
        "excerpt": "When plague broke out in Athens during the second year of the Peloponnesian War, it tore through a city already crowded with refugees behind its walls. Thucydides, who caught the disease and survived, recorded how physicians died fastest of all because they tended the sick, and how the dead lay unburied as the social order frayed. Like today's Bundibugyo Ebola wave outpacing the response in Congo and Uganda, the contagion spread faster than anyone could contain it, and the caregivers were among the first to fall.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Plague_of_Athens"
      },
      {
        "category": "historical",
        "title": "The 2013-2016 West African Ebola epidemic",
        "excerpt": "The Ebola outbreak that swept Guinea, Liberia, and Sierra Leone from 2013 became the largest in history, infecting more than 28,000 people and killing over 11,000. It overwhelmed fragile health systems, prompted the CDC to launch its largest international response ever, and frightened the world when isolated cases reached the United States and Europe. The current Level 1 activation for the Congo-Uganda outbreak echoes that emergency, when a regional epidemic became a global mobilization.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Western_African_Ebola_epidemic"
      },
      {
        "category": "literary",
        "title": "Daniel Defoe, A Journal of the Plague Year (1722)",
        "excerpt": "Defoe's narrator walks a London hollowed out by the Great Plague of 1665, and the empty streets read like any city bracing for an epidemic to arrive: \"it was a most surprising thing to see those streets which were usually so thronged now grown desolate, and so few people to be seen in them, that if I had been a stranger and at a loss for my way, I might sometimes have gone the length of a whole street (I mean of the by-streets), and seen nobody to direct me except watchmen set at the doors of such houses as were shut up, of which I shall speak presently.\"",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/376/pg376.txt"
      },
      {
        "category": "literary",
        "title": "Edgar Allan Poe, The Masque of the Red Death (1842)",
        "excerpt": "Poe imagines a pestilence whose hemorrhagic horror is grimly close to Ebola's own: \"The 'Red Death' had long devastated the country. No pestilence had ever been so fatal, or so hideous. Blood was its Avatar and its seal--the redness and the horror of blood. There were sharp pains, and sudden dizziness, and then profuse bleeding at the pores, with dissolution.\"",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/files/1064/1064-h/1064-h.htm"
      },
      {
        "category": "artistic",
        "title": "Arnold Boecklin, The Plague / Die Pest (1898)",
        "excerpt": "Boecklin paints Death astride a winged, bat-like beast, swooping low through a narrow medieval street as bodies crumple in its path. The greenish gloom and the figure's scythe turn an abstract contagion into a single dark rider that no door can be shut against. It is the visual ancestor of every modern dread that an unseen virus is moving faster than the people fleeing it.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Arnold_B%C3%B6cklin",
        "image": {
          "src": "/covers/cdc-ebola-highest-alert--art.png",
          "alt": "Arnold Boecklin's painting The Plague, showing Death riding a winged beast through a medieval street",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Wolfgang Amadeus Mozart, Requiem in D minor, K.626 (1791)",
        "excerpt": "Mozart's unfinished Requiem gives a sound to mass death, its Dies Irae erupting in a storm of strings and voices before the Lacrimosa subsides into grief almost too tender to bear. Composed as the dying composer raced his own end, it has become the music the world reaches for when an epidemic turns counting the dead into a daily ritual. For a continent now burying hundreds to Ebola, its mourning needs no translation.",
        "source": "IMSLP",
        "href": "https://imslp.org/wiki/Requiem,_K.626_(Mozart,_Wolfgang_Amadeus)"
      }
    ],
    "rank": 1
  },
  {
    "slug": "china-removes-generals-legislature",
    "headline": "China removes several senior generals and a Politburo member from its national legislature",
    "overview": "On June 27, 2026, the Standing Committee of China's National People's Congress stripped six senior military officers, former financial regulator Li Yunze and Politburo member Ma Xingrui of their posts as lawmakers, according to an official notice that gave no reason. Among those removed was General Xu Xueqiang, head of the Central Military Commission's Equipment Development Department, alongside generals Li Fengbiao, Guo Puxiao, Wang Kangping, Zhang Minghua and Yin Hongxing. The dismissals mark the latest escalation in President Xi Jinping's years-long anti-corruption campaign, which has removed and purged scores of senior officials and top generals.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiwgFBVV95cUxOWktpdnJVbDdTMjBZVnVlckdrTXFaSFVIbDlaTnZhSzNONE0wVzlkNV9MWk1Fcld5TjUyQWVyWmJiS0dWYnZFcndkdEd5YXpuTXBKVVppOGVLeGpvZUtNbzdaUW9sRjJ4UERTT2xHaDM2UFgyLWFRMkNXa2VTaloxYnpGNXlGV0lISlNfaEREdllBUjhnaTlEZEluN18tSU9tRWIzSFlPRkFWeWlvSnpkOGdmSjYzR0FNbXpGZjlEYTlLZw?oc=5"
      },
      {
        "name": "Investing.com (Reuters)",
        "href": "https://www.investing.com/news/economy-news/china-strips-generals-exfinancial-regulator-politburo-member-of-lawmaker-posts-4763935"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-27",
    "image": {
      "src": "/covers/china-removes-generals-legislature.png",
      "alt": "The Great Hall of the People in Beijing, seat of China's National People's Congress",
      "credit": "BrokenSphere / Wikimedia Commons, CC BY-SA"
    },
    "edition": "Afternoon Edition · 27 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Great Purge and the execution of Marshal Tukhachevsky (1937)",
        "excerpt": "In 1937 Joseph Stalin turned his Great Purge against the Red Army's high command. Marshal Mikhail Tukhachevsky, one of the Soviet Union's most celebrated military theorists, was arrested, tortured into a confession of treason, and shot after a secret one-day trial in June 1937. The decapitation of the officer corps that followed killed or imprisoned thousands of commanders on the eve of the Second World War.",
        "source": "Wikipedia, Case of Trotskyist Anti-Soviet Military Organization",
        "href": "https://en.wikipedia.org/wiki/Case_of_Trotskyist_Anti-Soviet_Military_Organization"
      },
      {
        "category": "historical",
        "title": "The arrest of the Gang of Four (1976)",
        "excerpt": "Weeks after Mao Zedong's death in 1976, China's new leadership moved suddenly against the radical faction known as the Gang of Four, including Mao's widow Jiang Qing. Arrested in October 1976, the four were blamed for the excesses of the Cultural Revolution and put on a televised show trial. Their fall ended the Cultural Revolution era and cleared the path for Deng Xiaoping's rise.",
        "source": "Wikipedia, Gang of Four",
        "href": "https://en.wikipedia.org/wiki/Gang_of_Four"
      },
      {
        "category": "literary",
        "title": "William Shakespeare, The Famous History of the Life of King Henry the Eighth, Act III, Scene 2 (c. 1613)",
        "excerpt": "So farewell to the little good you bear me.\nFarewell, a long farewell, to all my greatness!\nThis is the state of man: to-day he puts forth\nThe tender leaves of hopes; to-morrow blossoms\nAnd bears his blushing honours thick upon him;\nThe third day comes a frost, a killing frost,\nAnd when he thinks, good easy man, full surely\nHis greatness is a-ripening, nips his root,\nAnd then he falls, as I do.",
        "source": "Project Gutenberg, King Henry the Eighth",
        "href": "https://www.gutenberg.org/cache/epub/1802/pg1802.txt"
      },
      {
        "category": "literary",
        "title": "William Shakespeare, The Tragedy of Julius Caesar, Act III, Scene 1 (1599)",
        "excerpt": "CASCA.\nSpeak, hands, for me!\n\n[Casca stabs Caesar in the neck. Caesar catches hold of his arm. He is then stabbed by several other Conspirators, and at last by Marcus Brutus.]\n\nCAESAR.\nEt tu, Brute?—Then fall, Caesar!",
        "source": "Project Gutenberg, The Tragedy of Julius Caesar",
        "href": "https://www.gutenberg.org/cache/epub/1522/pg1522.txt"
      },
      {
        "category": "artistic",
        "title": "Paul Delaroche, The Execution of Lady Jane Grey (1833)",
        "excerpt": "Delaroche's vast history painting shows the blindfolded young queen Lady Jane Grey, deposed after a nine-day reign, groping for the executioner's block as her ladies turn away in grief. Bathed in pale light against deep shadow, it renders the downfall of the once-mighty as an intimate moment of helplessness before the axe.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Paul_Delaroche_-_The_execution_of_Lady_Jane_Grey_(1833)_(National_Gallery).jpg",
        "image": {
          "src": "/covers/china-removes-generals-legislature--art.png",
          "alt": "Paul Delaroche's 1833 painting The Execution of Lady Jane Grey, the blindfolded young queen reaching for the block",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Ludwig van Beethoven, Symphony No. 3 in E-flat major, Op. 55 'Eroica', II. Marcia funebre (1804)",
        "excerpt": "The second movement of Beethoven's 'Eroica' Symphony is a solemn funeral march, its dark C minor tread mourning a fallen hero. Beethoven, who had originally dedicated the work to Napoleon before angrily withdrawing the dedication, makes the music a meditation on greatness laid low.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Symphony_No.3,_Op.55_(Beethoven,_Ludwig_van)"
      }
    ],
    "rank": 2
  },
  {
    "slug": "meloni-trump-public-falling-out",
    "headline": "Trump and Italy's Meloni in public dispute over G7 photo and Iran, straining Rome-Washington ties",
    "overview": "U.S. President Donald Trump claimed in an Italian television interview that Prime Minister Giorgia Meloni had \"begged\" him for a photo at the G7 summit in Evian-les-Bains, France, on June 16, 2026, a claim Meloni rejected as \"completely fabricated.\" Trump escalated by criticizing Italy's refusal to support U.S. military operations against Iran, after Rome declined to let American bombers use its Sicily base without parliamentary approval, while Meloni said his \"constant, unprovoked attacks are senseless.\" Italian Foreign Minister Antonio Tajani canceled a planned trip to the United States as Meloni's government rallied in her defense, marking a sharp reversal for a leader who had positioned herself as a bridge between Washington and Europe.",
    "genre": "Politics",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cze962pgk27o"
      },
      {
        "name": "PBS NewsHour",
        "href": "https://www.pbs.org/newshour/politics/trump-deepens-the-dustup-with-italys-meloni-who-says-his-unprovoked-attacks-are-senseless"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-27",
    "image": {
      "src": "/covers/meloni-trump-public-falling-out.png",
      "alt": "President Donald Trump walks with Italian Prime Minister Giorgia Meloni during the G7 summit in Evian-les-Bains, France, on June 16, 2026.",
      "credit": "Christian Hartmann/Reuters via PBS NewsHour"
    },
    "edition": "Afternoon Edition · 27 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Suez Crisis Anglo-American rift (1956)",
        "excerpt": "In 1956 Britain and France, allied with Israel, invaded Egypt to seize the nationalized Suez Canal, expecting backing from their closest partner, the United States. Instead President Eisenhower, blindsided and furious, refused support and used financial and diplomatic pressure at the United Nations to force a humiliating withdrawal. The episode shattered the wartime intimacy between Washington and London, toppled Prime Minister Anthony Eden, and exposed how quickly a trusted alliance could turn to open recrimination.",
        "source": "Wikipedia, \"Suez Crisis\"",
        "href": "https://en.wikipedia.org/wiki/Suez_Crisis"
      },
      {
        "category": "historical",
        "title": "Churchill and de Gaulle's wartime friction",
        "excerpt": "Winston Churchill championed the exiled Charles de Gaulle as the voice of Free France, yet their partnership curdled into bitter clashes over pride, sovereignty and slights real and imagined. Churchill once snapped that of all the crosses he had to bear, the heaviest was the Cross of Lorraine, de Gaulle's emblem. Their relationship swung between gratitude and fury, a reminder that even leaders bound by a common cause could wound one another deeply.",
        "source": "Wikipedia, \"Charles de Gaulle\"",
        "href": "https://en.wikipedia.org/wiki/Charles_de_Gaulle"
      },
      {
        "category": "literary",
        "title": "Homer, The Iliad (Pope's translation, 1715-1720)",
        "excerpt": "Achilles' wrath, to Greece the direful spring\nOf woes unnumber'd, heavenly goddess, sing!\nThat wrath which hurl'd to Pluto's gloomy reign\nThe souls of mighty chiefs untimely slain;",
        "source": "Project Gutenberg, The Iliad of Homer (Alexander Pope), Book I",
        "href": "https://www.gutenberg.org/cache/epub/6130/pg6130.txt"
      },
      {
        "category": "literary",
        "title": "Shakespeare, Julius Caesar (c. 1599), Act IV, Scene III",
        "excerpt": "Come, Antony, and young Octavius, come,\nRevenge yourselves alone on Cassius,\nFor Cassius is a-weary of the world:\nHated by one he loves; brav'd by his brother;\nCheck'd like a bondman; all his faults observ'd,\nSet in a note-book, learn'd and conn'd by rote,\nTo cast into my teeth.",
        "source": "Project Gutenberg, The Tragedy of Julius Caesar",
        "href": "https://www.gutenberg.org/cache/epub/1522/pg1522.txt"
      },
      {
        "category": "artistic",
        "title": "Johann Heinrich Tischbein the Elder, Achilles has a Dispute with Agamemnon (1776)",
        "excerpt": "A history painting of the founding quarrel of the Iliad: the enraged Achilles confronts the Greek commander Agamemnon, the rupture between two allies whose wounded pride costs their own side dearly. The scene visualizes how a dispute over honor and slighted respect can fracture a coalition at the moment it most needs unity.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Johann_Heinrich_Tischbein_-_Achilles_has_a_Dispute_with_Agamemnon,_1776.jpg",
        "image": {
          "src": "/covers/meloni-trump-public-falling-out--art.png",
          "alt": "Oil painting depicting Achilles confronting Agamemnon in their quarrel before Troy",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Ludwig van Beethoven, Coriolan Overture, Op. 62 (1807)",
        "excerpt": "Beethoven's stormy concert overture portrays the proud Roman general Coriolanus, who, spurned by his own city, turns against it before being undone by conflicting loyalties. Its surging, defiant music captures the tragedy of a once-celebrated figure whose injured pride drives an irreparable break with former allies.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Coriolan,_Op.62_(Beethoven,_Ludwig_van)"
      }
    ],
    "rank": 3
  },
  {
    "slug": "ukraine-intelligence-official-spy-life",
    "headline": "Ukraine sentences a senior intelligence official to life in prison for spying for Russia",
    "overview": "A Ukrainian court sentenced Colonel Dmytro Kozyura, a former senior officer and head of staff at the Security Service of Ukraine's (SBU) Anti-Terrorism Centre, to life in prison for high treason after he was convicted of spying for Russia's FSB. The SBU said Kozyura was recruited in Vienna in 2018 and, after being reactivated by his handlers in late 2024, passed classified information about Ukraine's military, infrastructure and leadership before his arrest in a February 2025 operation codenamed \"Rat\". Authorities said that before detaining him they used him to feed Russian forces large amounts of disinformation while blocking his access to genuine intelligence.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cg4w3wyxzzno"
      },
      {
        "name": "Kyiv Independent",
        "href": "https://kyivindependent.com/former-sbu-counter-terrorism-chief-sentenced-to-life-in-prison-for-passing-state-secrets-to-russia/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-27",
    "image": {
      "src": "/covers/ukraine-intelligence-official-spy-life.png",
      "alt": "The Lukianivska prison in Kyiv, a high-walled detention facility, illustrating coverage of a life sentence handed down in a Ukrainian espionage case",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 27 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Alfred Redl, Chief of Austro-Hungarian counter-intelligence (exposed 1913)",
        "excerpt": "Colonel Alfred Redl ran the espionage bureau of Austria-Hungary's general staff while secretly selling its deepest military secrets to Russia for more than a decade. When his treason was uncovered in 1913, his superiors handed him a revolver and left him alone in a Vienna hotel room, where he shot himself. The plans he betrayed are thought to have cost Austria-Hungary dearly when war came the following year.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Alfred_Redl"
      },
      {
        "category": "historical",
        "title": "Kim Philby and the Cambridge Five (defected 1963)",
        "excerpt": "Kim Philby rose to be a senior British intelligence officer, even heading the section meant to counter Soviet espionage, all while serving as an agent of the USSR. He and the rest of the Cambridge Five betrayed Western secrets and operatives to Moscow for decades. When finally cornered in 1963, Philby slipped away to the Soviet Union, where he lived out his life in Moscow rather than face a traitor's trial.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Kim_Philby"
      },
      {
        "category": "literary",
        "title": "Dante Alighieri, Inferno, Canto XXXIV (c. 1320, Longfellow translation 1867)",
        "excerpt": "\"That soul up there which has the greatest pain,\"\nThe Master said, \"is Judas Iscariot;\nWith head inside, he plies his legs without.\nOf the two others, who head downward are,\nThe one who hangs from the black jowl is Brutus;\nSee how he writhes himself, and speaks no word.\nAnd the other, who so stalwart seems, is Cassius.",
        "source": "Wikisource (Longfellow translation, public domain)",
        "href": "https://en.wikisource.org/wiki/Divine_Comedy_(Longfellow_1867)/Volume_1/Canto_34"
      },
      {
        "category": "literary",
        "title": "The Gospel of Matthew 26:14-15 (King James Version, 1611)",
        "excerpt": "Then one of the twelve, called Judas Iscariot, went unto the chief priests, and said unto them, What will ye give me, and I will deliver him unto you? And they covenanted with him for thirty pieces of silver.",
        "source": "King James Bible (public domain)",
        "href": "https://biblehub.com/kjv/matthew/26-15.htm"
      },
      {
        "category": "artistic",
        "title": "Giotto di Bondone, The Arrest of Christ (Kiss of Judas) (c. 1305)",
        "excerpt": "Giotto's Scrovegni Chapel fresco freezes the instant of betrayal: Judas wraps his cloak around Jesus and leans in to deliver the identifying kiss, while soldiers and torches crowd the night around them. The locked gaze between betrayer and betrayed has made the image the defining visual shorthand for treachery dressed as friendship.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Giotto_di_Bondone_-_No._31_Scenes_from_the_Life_of_Christ_-_15._The_Arrest_of_Christ_(Kiss_of_Judas)_-_WGA09216.jpg",
        "image": {
          "src": "/covers/ukraine-intelligence-official-spy-life--art.png",
          "alt": "Fresco showing Judas embracing and kissing Jesus to betray him, surrounded by soldiers with torches",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Johann Sebastian Bach, St Matthew Passion, BWV 244 (1727)",
        "excerpt": "Bach's monumental Passion sets the Gospel narrative of Christ's betrayal and death, dramatizing Judas's bargain of thirty pieces of silver and the kiss in the garden through recitative and grieving chorus. The score, scanned and freely available on IMSLP, turns the act of treason into one of the most searching meditations on guilt in Western music.",
        "source": "IMSLP (public domain)",
        "href": "https://imslp.org/wiki/Matth%C3%A4uspassion,_BWV_244_(Bach,_Johann_Sebastian)"
      }
    ],
    "rank": 4
  },
  {
    "slug": "apple-chips-blacklisted-chinese-firm",
    "headline": "Apple seeks U.S. approval to buy chips from a blacklisted Chinese company, the Financial Times reports",
    "overview": "Apple has been lobbying the U.S. Commerce Department and other parts of the Trump administration for clearance to buy memory chips from ChangXin Memory Technologies (CXMT), a Chinese DRAM maker on the Pentagon's 1260H list of companies with alleged ties to the Chinese military, according to the Financial Times. The iPhone maker is seeking assurances that purchasing from CXMT would not expose it to future U.S. restrictions, as it tries to ease soaring memory and storage chip costs driven by the AI data-center buildout. The request follows Apple raising iPad and MacBook prices, with congressional opposition making White House support uncertain.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiwgFBVV95cUxPR0hWRGYwOHQzdXh0YkpmelpzTW9ZS0xvRFk5c0NlblkzdU44QktvZW1FNkFjazU5c3RDVVJXWjZGNHZ4RHpkY3N3MDdhZG9IS2EwM2w0RHQtMmlyMjMyRVFqYVZ6RnF4QkJoa3NseVY4LVI0ekVsMkwteV9NTmYzUWV6cHZadzdMWHNzcV95M180NmI5Tnd6Smxlb09zOUpNci1CLTRqS0VpSTBNd2w5ZVlZUTdldzhZZFZGQUdVVDRJUQ?oc=5"
      },
      {
        "name": "Bloomberg",
        "href": "https://www.bloomberg.com/news/articles/2026-06-27/apple-seeks-us-approval-to-buy-chips-from-blacklisted-cxmt-ft"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-27",
    "image": {
      "src": "/covers/apple-chips-blacklisted-chinese-firm.png",
      "alt": "Apple logo at an Apple Store, illustrating the company's push for U.S. clearance to source memory chips from blacklisted Chinese maker CXMT",
      "credit": "Reuters / Yahoo Finance"
    },
    "edition": "Afternoon Edition · 27 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "CoCom and the Cold War strategic export controls (1949-1994)",
        "excerpt": "During the Cold War, Western nations established the Coordinating Committee for Multilateral Export Controls (CoCom) to embargo the sale of strategic goods and advanced technology to the Soviet bloc. Firms wishing to trade with restricted countries had to seek case-by-case licenses, and companies repeatedly lobbied for exceptions when commercial pressure clashed with security policy. The regime shaped decades of high-technology commerce until it was dissolved in 1994 and succeeded by the Wassenaar Arrangement.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Coordinating_Committee_for_Multilateral_Export_Controls"
      },
      {
        "category": "historical",
        "title": "Napoleon's Continental System and the licensed-trade loophole (1806-1814)",
        "excerpt": "In 1806 Napoleon imposed the Continental System, a sweeping blockade meant to bar British goods from European markets. Yet demand for forbidden British manufactures was so strong that smuggling flourished and Napoleon himself began selling special licenses permitting otherwise-banned trade. The system ultimately strained the very economies it was meant to protect and helped erode support for the French empire.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Continental_System"
      },
      {
        "category": "literary",
        "title": "King James Bible, Genesis 3:4-6 (1611)",
        "excerpt": "And the serpent said unto the woman, Ye shall not surely die: For God doth know that in the day ye eat thereof, then your eyes shall be opened, and ye shall be as gods, knowing good and evil. And when the woman saw that the tree was good for food, and that it was pleasant to the eyes, and a tree to be desired to make one wise, she took of the fruit thereof, and did eat, and gave also unto her husband with her; and he did eat.",
        "source": "Wikisource (King James Version)",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Genesis"
      },
      {
        "category": "literary",
        "title": "Christopher Marlowe, The Tragical History of Doctor Faustus (1604)",
        "excerpt": "Had I as many souls as there be stars,\nI'd give them all for Mephistophilis.\nBy him I'll be great emperor of the world,\nAnd make a bridge thorough the moving air,\nTo pass the ocean with a band of men.",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/files/811/811-h/811-h.htm"
      },
      {
        "category": "artistic",
        "title": "Peter Paul Rubens, Adam and Eve (after Titian) (1628-1629)",
        "excerpt": "Rubens's canvas, a copy after Titian now in the Prado, shows the moment of the forbidden bargain: Adam reaching to restrain Eve as the serpent tempts her toward the fruit of the one prohibited tree. The painting renders temptation and transgression as a single charged instant, the price of a forbidden exchange hanging in the balance.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Peter_Paul_Rubens_-_Adam_and_Eve,_after_Titian,_between_1628_and_1629.jpg",
        "image": {
          "src": "/covers/apple-chips-blacklisted-chinese-firm--art.png",
          "alt": "Rubens's painting Adam and Eve, after Titian, depicting the serpent tempting Eve toward the forbidden fruit while Adam tries to restrain her",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Charles Gounod, Faust, CG 4 (1856-1859)",
        "excerpt": "Gounod's grand opera dramatizes Faust's bargain with Mephistopheles, who grants worldly desire in exchange for the soul. The forbidden pact and its mounting cost echo the dilemma of seeking a tempting prize from a proscribed partner.",
        "source": "IMSLP (Petrucci Music Library)",
        "href": "https://imslp.org/wiki/Faust,_CG_4_(Gounod,_Charles)"
      }
    ],
    "rank": 5
  },
  {
    "slug": "spacex-joins-nasdaq-100",
    "headline": "SpaceX is set to join the Nasdaq 100 index",
    "overview": "Nasdaq confirmed on June 26, 2026 that SpaceX will be added to the tech-heavy Nasdaq 100 index on July 7, 2026, after the exchange relaxed entry rules covering profitability, time since listing, and share availability. Elon Musk's rocket and AI company qualified under the revised methodology, and its inclusion is expected to force index-tracking funds such as the Invesco QQQ to buy the stock, with J.P. Morgan estimating roughly $4.3 billion in passive inflows.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMitwFBVV95cUxPWlNyNThzTGgySXFVQl82X0l1TEprSjdEQWxpWDZhWUVzTkpyT2dtdXozZThTNllGN042ZUQxNThQWkQ1NUJoUFVUbU9KMVNpMnp4MzY2TVlLT1p3T0tjcjdmX1JYRVVRWEFXVmhNX21UcXRfVE5WUWxrWnBZdzlvck5YbW4tZU1Rb0JrSEFUSGNHR1hGdmowdXIyN3NaTmd1WTFnbVNxV2tHVmdNQ0x6dkR4NmpkakU?oc=5"
      },
      {
        "name": "Investing.com (Reuters)",
        "href": "https://www.investing.com/news/stock-market-news/spacex-set-to-join-nasdaq-100-paving-way-for-wave-of-passive-buying-4763892"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-27",
    "image": {
      "src": "/covers/spacex-joins-nasdaq-100.png",
      "alt": "A SpaceX Falcon rocket lifting off, symbolizing the company's entry into the Nasdaq 100 index.",
      "credit": "SpaceX, via Wikimedia Commons (public domain)"
    },
    "edition": "Afternoon Edition · 27 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Dutch East India Company, World's First Publicly Traded Company (1602)",
        "excerpt": "Founded in 1602, the Vereenigde Oostindische Compagnie (VOC) was the first company to issue freely transferable shares to the general public, and its trading gave rise to the Amsterdam Stock Exchange. Investors could buy and sell stakes in the enterprise, creating the template for the modern listed corporation. Its shares became among the most actively traded financial instruments of the seventeenth century, embedding a single venture at the heart of an emerging financial establishment.",
        "source": "Wikipedia: Dutch East India Company",
        "href": "https://en.wikipedia.org/wiki/Dutch_East_India_Company"
      },
      {
        "category": "historical",
        "title": "The South Sea Bubble, Speculative Mania in London (1720)",
        "excerpt": "The South Sea Company, granted a monopoly on trade with Spanish South America, saw its share price soar nearly tenfold in 1720 as feverish speculation gripped London's Exchange Alley. When confidence collapsed, the price crashed and fortunes were wiped out, ruining thousands of investors. The episode became a lasting emblem of how a single high-flying enterprise can captivate and then devastate the financial markets.",
        "source": "Wikipedia: South Sea Company",
        "href": "https://en.wikipedia.org/wiki/South_Sea_Company"
      },
      {
        "category": "literary",
        "title": "Ovid, Metamorphoses, Book VIII (8 CE; Riley trans. 1851)",
        "excerpt": "Icarus, I recommend thee to keep the middle tract; lest, if thou shouldst go too low, the water should clog thy wings; if too high, the fire of the sun should scorch them.",
        "source": "Ovid, Metamorphoses (Henry T. Riley translation), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/26073/26073-h/26073-h.htm"
      },
      {
        "category": "literary",
        "title": "Charles Mackay, Extraordinary Popular Delusions and the Madness of Crowds (1841)",
        "excerpt": "Money, again, has often been a cause of the delusion of multitudes. Sober nations have all at once become desperate gamblers, and risked almost their existence upon the turn of a piece of paper.",
        "source": "Charles Mackay, Extraordinary Popular Delusions and the Madness of Crowds, Project Gutenberg",
        "href": "https://www.gutenberg.org/files/24518/24518-h/24518-h.htm"
      },
      {
        "category": "artistic",
        "title": "Pieter Bruegel the Elder, Landscape with the Fall of Icarus (c. 1560)",
        "excerpt": "In this allegory of overreach, Icarus plunges almost unnoticed into the sea while ploughman, shepherd and merchant ships go about their ordinary business. The painting captures the fate of the soaring ambition that flew too close to the sun, dwarfed by a world that barely registers the fall.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_de_Oude_-_De_val_van_Icarus.jpg",
        "image": {
          "src": "/covers/spacex-joins-nasdaq-100--art.png",
          "alt": "Pieter Bruegel the Elder's Landscape with the Fall of Icarus, with Icarus's legs disappearing into the sea as life continues unbothered.",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Richard Strauss, Also sprach Zarathustra, Op. 30 (1896)",
        "excerpt": "Strauss's tone poem opens with its famous sunrise fanfare, a slow ascent from a single sustained note into a blaze of brass and timpani that evokes humanity reaching toward the heavens. The aspirational sweep of the music mirrors the soaring ambition of a venture aiming for the stars and the markets alike.",
        "source": "IMSLP (Petrucci Music Library), public domain",
        "href": "https://imslp.org/wiki/Also_sprach_Zarathustra,_Op.30_(Strauss,_Richard)"
      }
    ],
    "rank": 6
  },
  {
    "slug": "utah-state-of-emergency-wildfire",
    "headline": "Utah declares a state of emergency and restricts fireworks as the largest U.S. wildfire grows",
    "overview": "Utah Gov. Spencer Cox declared a state of emergency and imposed temporary fireworks restrictions through July 5, ahead of Fourth of July celebrations, as the Cottonwood Fire in sparsely populated southern Utah became the largest active wildfire in the United States. Sparked Monday near Beaver, the human-caused fire ballooned to more than 112 square miles (about 72,000 acres) with zero containment by Friday, June 26, 2026, as strong winds grounded air support. The blaze damaged the Eagle Point ski resort and forced mandatory evacuations, and officials warned it could become the most destructive and costly fire in state history.",
    "genre": "Climate",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMimAFBVV95cUxPTUtrUGk1cHZBWVBaRVlyU0RhcGpnRVJsbkVUdG9RTGJzbzN0SVJlWEVBdkYydlFRaTJ3b3Uwc1JZWTJ4dGx1Mjd4WXJuV3d3bGpWR1d4RkZ2UVo5UTN4Um1KM2tnM1U3Vy1BZmtiVjFIaVp2anVsWlZaOGZVa1FsMWJtZF9DYmY4SDlnSVdfcUJEUTdTNDlFaQ?oc=5"
      },
      {
        "name": "CBS News",
        "href": "https://www.cbsnews.com/news/utah-cottonwood-wildfire-emergency-fireworks/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-27",
    "image": {
      "src": "/covers/utah-state-of-emergency-wildfire.png",
      "alt": "Flames and smoke from a fast-moving forest wildfire",
      "credit": "U.S. Forest Service / Wikimedia Commons (public domain)"
    },
    "edition": "Afternoon Edition · 27 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Great Fire of London (1666)",
        "excerpt": "Beginning in a bakery on Pudding Lane on September 2, 1666, the Great Fire of London raged for four days through the medieval City's tightly packed timber houses. Driven by a strong easterly wind, it destroyed some 13,200 houses, 87 parish churches and St Paul's Cathedral, leaving tens of thousands homeless. The disaster reshaped both the city's architecture and its fire-prevention laws for generations.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Great_Fire_of_London"
      },
      {
        "category": "historical",
        "title": "The Peshtigo Fire (1871)",
        "excerpt": "On October 8, 1871, a firestorm swept through the forests around Peshtigo, Wisconsin, fanned by drought and high winds into a wall of flame that consumed entire towns in minutes. It remains the deadliest wildfire in American history, killing an estimated 1,500 to 2,500 people and burning roughly 1.2 million acres. Because it struck the same night as the more famous Great Chicago Fire, its scale long went overlooked.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Peshtigo_fire"
      },
      {
        "category": "literary",
        "title": "Samuel Pepys, The Diary of Samuel Pepys (1666)",
        "excerpt": "And among other things, the poor pigeons, I perceive, were loth to leave their houses, but hovered about the windows and balconys till they were, some of them burned, their wings, and fell down.",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/files/4200/4200-h/4200-h.htm"
      },
      {
        "category": "literary",
        "title": "Virgil (trans. John Dryden), Aeneid, Book II (1697)",
        "excerpt": "Driv'n on the wings of Winds, whole sheets of Fire,\nThrough Air transported, to the Roofs aspire.",
        "source": "Wikisource (public domain)",
        "href": "https://en.wikisource.org/wiki/The_Works_of_Virgil_(Dryden)/Aeneid/Book_II"
      },
      {
        "category": "artistic",
        "title": "J. M. W. Turner, The Burning of the Houses of Lords and Commons, 16 October 1834 (1835)",
        "excerpt": "Turner's blazing canvas captures the night fire that gutted Britain's Palace of Westminster, the inferno's reflection streaking across the Thames as crowds gather to watch. The painting fuses documentary spectacle with the artist's awe at fire's overwhelming, sublime power.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Joseph_Mallord_William_Turner,_English_-_The_Burning_of_the_Houses_of_Lords_and_Commons,_October_16,_1834_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/utah-state-of-emergency-wildfire--art.png",
          "alt": "Turner's painting of the Houses of Parliament ablaze at night, fire reflected on the Thames",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Richard Wagner, Magic Fire Music from Die Walkure, WWV 86B (1856)",
        "excerpt": "The shimmering orchestral close of Wagner's Die Walkure conjures the ring of flame Wotan summons to encircle the sleeping Brunnhilde. Flickering string figures and glowing brass evoke fire as both punishment and protective barrier.",
        "source": "IMSLP (public domain)",
        "href": "https://imslp.org/wiki/Die_Walk%C3%BCre,_WWV_86B_(Wagner,_Richard)"
      }
    ],
    "rank": 7
  },
  {
    "slug": "sierra-leone-child-marriage-case",
    "headline": "Four men appear in a landmark Sierra Leone court case over an alleged child marriage",
    "overview": "Four men, including the father and the so-called husband of a 17-year-old girl, appeared at the High Court in Freetown charged with offences related to her marriage. It is the first prosecution since Sierra Leone passed the Prohibition of Child Marriage Act, 2024, which set 18 as the minimum age to wed and made even attending such a wedding an offence. Those convicted face at least 15 years in prison or a fine of around $4,000, with the next hearing set for 2 July.",
    "genre": "Politics",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c9q212y8p21o"
      },
      {
        "name": "CBS News",
        "href": "https://www.cbsnews.com/news/sierra-leone-outlaws-child-marriage-witnesses-weddings-can-face-jail-time/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-27",
    "image": {
      "src": "/covers/sierra-leone-child-marriage-case.png",
      "alt": "The colonial-era Law Court building on Siaka Stevens Street in central Freetown, seat of Sierra Leone's higher courts",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 27 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "United Kingdom, Criminal Law Amendment Act 1885 and W. T. Stead's campaign",
        "excerpt": "In 1885 journalist W. T. Stead published 'The Maiden Tribute of Modern Babylon' in the Pall Mall Gazette, exposing how poor children were procured for sex in London. The resulting public outcry helped push Parliament to pass the Criminal Law Amendment Act 1885, which raised the age of consent for girls from 13 to 16. Stead himself was briefly jailed for the methods he used to prove the trade existed, but the law endured as a landmark in protecting children.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Criminal_Law_Amendment_Act_1885"
      },
      {
        "category": "historical",
        "title": "United Kingdom, Factory Act 1833 and the regulation of child labour",
        "excerpt": "The Factory Act 1833 was among the first laws to put real limits on the exploitation of children in Britain's mills and factories. It barred the employment of children under nine, capped the working hours of older children, and created the first paid factory inspectors to enforce the rules. Like Sierra Leone's child marriage ban, it marked the moment a state declared that childhood itself deserved legal protection.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Factory_Act_1833"
      },
      {
        "category": "literary",
        "title": "William Blake, The Chimney Sweeper (Songs of Innocence) (1789)",
        "excerpt": "When my mother died I was very young,\nAnd my father sold me while yet my tongue\nCould scarcely cry 'Weep! weep! weep! weep!'\nSo your chimneys I sweep, and in soot I sleep.",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/1934/pg1934.txt"
      },
      {
        "category": "literary",
        "title": "Elizabeth Barrett Browning, The Cry of the Children (1843)",
        "excerpt": "Do ye hear the children weeping, O my brothers,\nEre the sorrow comes with years?\nThey are leaning their young heads against their mothers,—\nAnd that cannot stop their tears.",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Cry_of_the_Children"
      },
      {
        "category": "artistic",
        "title": "Sir Joshua Reynolds, The Age of Innocence (c. 1788)",
        "excerpt": "Reynolds's portrait of a young girl seated calmly outdoors, hands folded, became one of the most reproduced images of childhood in Western art. Long admired as an emblem of the unguarded trust of the very young, it offers a quiet counterpoint to the harm a child suffers when that innocence is taken away.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:The_Age_of_Innocence_-_Reynolds.jpg",
        "image": {
          "src": "/covers/sierra-leone-child-marriage-case--art.png",
          "alt": "Sir Joshua Reynolds's painting The Age of Innocence, depicting a seated young girl with hands folded in her lap against a soft landscape",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Robert Schumann, Kinderszenen, Op. 15 (1838)",
        "excerpt": "Schumann's 'Scenes from Childhood' is a cycle of thirteen short piano pieces written by an adult looking back tenderly on the world of the young, including the famous 'Traeumerei' (Dreaming). The music evokes a childhood imagined as a place of safety, play and reverie—the very thing a forced early marriage cuts short.",
        "source": "IMSLP",
        "href": "https://imslp.org/wiki/Kinderszenen,_Op.15_(Schumann,_Robert)"
      }
    ],
    "rank": 8
  },
  {
    "slug": "sothebys-london-record-sale",
    "headline": "Sotheby's London Masterpiece sale earns a record $392.6 million",
    "overview": "On June 24, 2026, Sotheby's London sold the collection of British billionaire Joe Lewis for 296.3 million pounds ($392.6 million), nearly double its roughly $200 million estimate and a record for a single-owner sale in Europe. The night's top lot was Amedeo Modigliani's nude \"Nu assis au collier\" (1917-1918), which fetched 48.2 million pounds ($63.9 million), a European auction record for the artist, while Gustav Klimt's \"Bildnis Gertrud Loew\" brought 36.2 million pounds. Combined with a subsequent Modern and Contemporary evening sale, Sotheby's reached a single-night total of 393.4 million pounds ($520.7 million), which it called the largest sum ever achieved at auction in a single night in Europe.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Artforum",
        "href": "https://www.artforum.com/news/sothebys-london-masterpiece-sale-earns-392-million-1234753425/"
      },
      {
        "name": "Artnet News",
        "href": "https://news.artnet.com/market/392-6-m-lewis-collection-sale-smashes-records-led-by-63-9-m-modigliani-2783495"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-27",
    "image": {
      "src": "/covers/sothebys-london-record-sale.png",
      "alt": "Sotheby's auction house, where the Lewis Collection set a European single-owner sale record",
      "credit": "Gordon Griffiths, courtesy Geograph Britain and Ireland via Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 27 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Vincenzo Peruggia, The Theft of the Mona Lisa (1911)",
        "excerpt": "On August 21, 1911, the Louvre handyman Vincenzo Peruggia walked out of the museum with Leonardo da Vinci's Mona Lisa hidden under his smock. The painting was missing for more than two years, and the sensational hunt for it turned a single panel into the most famous artwork on earth, demonstrating how scarcity and notoriety can lend a masterpiece almost incalculable value long before auction houses ever set a price on it.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Theft_of_the_Mona_Lisa"
      },
      {
        "category": "historical",
        "title": "Salvator Mundi, Record Auction Sale (2017)",
        "excerpt": "In November 2017 a painting attributed to Leonardo da Vinci, the Salvator Mundi, sold at Christie's in New York for $450.3 million, by far the highest price ever paid for any work of art at auction. The result, achieved after a frenzy of bidding for a panel that had once changed hands for a few thousand dollars, showed how attribution, rarity, and spectacle can drive prices into the hundreds of millions.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Salvator_Mundi_(Leonardo)"
      },
      {
        "category": "literary",
        "title": "Oscar Wilde, The Picture of Dorian Gray, Preface (1891)",
        "excerpt": "The artist is the creator of beautiful things. To reveal art and conceal the artist is art's aim. The critic is he who can translate into another manner or a new material his impression of beautiful things.\n\nThe highest as the lowest form of criticism is a mode of autobiography. Those who find ugly meanings in beautiful things are corrupt without being charming. This is a fault.\n\nThose who find beautiful meanings in beautiful things are the cultivated. For these there is hope. They are the elect to whom beautiful things mean only beauty.",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/174/pg174.txt"
      },
      {
        "category": "literary",
        "title": "John Keats, Ode on a Grecian Urn (1820)",
        "excerpt": "When old age shall this generation waste,\n        Thou shalt remain, in midst of other woe\n  Than ours, a friend to man, to whom thou say'st,\n        \"Beauty is truth, truth beauty,\"—that is all\n          Ye know on earth, and all ye need to know.",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/files/23684/23684-h/23684-h.htm"
      },
      {
        "category": "artistic",
        "title": "David Teniers the Younger, The Archduke Leopold Wilhelm in his Picture Gallery in Brussels (1651)",
        "excerpt": "This Flemish Baroque masterpiece depicts Archduke Leopold Wilhelm of Austria amid the densely hung walls of his Italian art collection, a vision of seventeenth-century connoisseurship and the cult of the masterpiece. Teniers, the Archduke's court painter and curator, made several such gallery pictures to document the collection, later commissioning engravers for his Theatrum Pictorium, often called the first illustrated art catalog.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:David_Teniers_the_Younger_-_Archduke_Leopold_William_in_his_Gallery_at_Brussels_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/sothebys-london-record-sale--art.png",
          "alt": "Painting of Archduke Leopold Wilhelm standing in his Brussels picture gallery, its walls densely covered with old-master paintings",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Modest Mussorgsky, Pictures at an Exhibition (1874)",
        "excerpt": "Composed in 1874 as a suite for solo piano, Mussorgsky's Pictures at an Exhibition is a musical walk through a gallery, each movement evoking a drawing or watercolor by his late friend Viktor Hartmann, linked by a recurring Promenade theme. The work, later famously orchestrated by Ravel, transforms the act of viewing art into sound and remains one of the most celebrated tributes to the experience of a picture collection.",
        "source": "IMSLP",
        "href": "https://imslp.org/wiki/Pictures_at_an_Exhibition_(Mussorgsky,_Modest)"
      }
    ],
    "rank": 9
  },
  {
    "slug": "meta-in-house-ai-glasses",
    "headline": "Meta unveils its first in-house AI smart glasses, including a Kylie Jenner collaboration",
    "overview": "Meta has launched its first line of AI smart glasses branded solely under the Meta name, dropping the Ray-Ban label while continuing to build the hardware with EssilorLuxottica. The trio comprises the Fury and Adventurer models, each starting at $299, and a $399 edition co-designed with Kylie Jenner that includes a Meta AI voice meant to sound like Jenner herself. Details on the Jenner version include a small gem set near the camera, evoking paparazzi flashes, and a metal nose bridge chosen so makeup wipes off easily.",
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
    "publishedAt": "2026-06-27",
    "image": {
      "src": "/covers/meta-in-house-ai-glasses.png",
      "alt": "Meta's first in-house AI smart glasses, displayed across the new 2026 lineup including the Kylie Jenner edition",
      "credit": "Meta via Dezeen"
    },
    "edition": "Afternoon Edition · 27 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Anonymous, The invention of eyeglasses in medieval Italy (c. 1290)",
        "excerpt": "Wearable lenses to correct sight first appeared in Italy around 1290, when artisans near Pisa and in Venice's glassmaking workshops fitted convex glass discs into riveted frames to be held before the eyes. The earliest documented reference comes from a 1306 sermon by the Dominican friar Giordano da Pisa, who praised the new art of making spectacles as one of the most useful inventions of the age. The device let aging scholars and craftsmen keep reading and working, quietly transforming how Europeans saw and recorded the world.",
        "source": "Wikipedia, \"Glasses\"",
        "href": "https://en.wikipedia.org/wiki/Glasses"
      },
      {
        "category": "historical",
        "title": "Google, Google Glass head-mounted display (2013)",
        "excerpt": "In 2013 Google released Google Glass, an optical head-mounted display that placed a tiny screen, camera and voice controls directly in the wearer's field of view, promising hands-free access to information and instant photography. The product drew intense fascination but also a backlash over privacy and the unsettling prospect of being recorded by anyone wearing a camera on their face. Google halted the consumer Explorer program in 2015, yet Glass became the reference point for every later attempt, including Meta's, to make computers something you wear over your eyes.",
        "source": "Wikipedia, \"Google Glass\"",
        "href": "https://en.wikipedia.org/wiki/Google_Glass"
      },
      {
        "category": "literary",
        "title": "Plato, The Republic, Book VII, the Allegory of the Cave (c. 375 BCE)",
        "excerpt": "And now, I said, let me show in a figure how far our nature is enlightened or unenlightened:—Behold! human beings living in a underground den, which has a mouth open towards the light and reaching all along the den; here they have been from their childhood, and have their legs and necks chained so that they cannot move, and can only see before them, being prevented by the chains from turning round their heads. Above and behind them a fire is blazing at a distance, and between the fire and the prisoners there is a raised way; and you will see, if you look, a low wall built along the way, like the screen which marionette players have in front of them, over which they show the puppets.",
        "source": "Plato, The Republic, trans. Benjamin Jowett, Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/1497/pg1497.txt"
      },
      {
        "category": "literary",
        "title": "E. T. A. Hoffmann, The Sandman (1816)",
        "excerpt": "He took up a small, very beautifully cut pocket perspective, and by way of proving it looked through the window. Never before in his life had he had a glass in his hands that brought out things so clearly and sharply and distinctly. Involuntarily he directed the glass upon Spalanzani's room; Olimpia sat at the little table as usual, her arms laid upon it and her hands folded. Now he saw for the first time the regular and exquisite beauty of her features. The eyes, however, seemed to him to have a singular look of fixity and lifelessness. But as he continued to look closer and more carefully through the glass he fancied a light like humid moonbeams came into them. It seemed as if their power of vision was now being enkindled; their glances shone with ever-increasing vivacity.",
        "source": "E. T. A. Hoffmann, \"The Sandman,\" trans. J. T. Bealby, Project Gutenberg Australia",
        "href": "https://gutenberg.net.au/ebooks06/0605791h.html"
      },
      {
        "category": "artistic",
        "title": "Jan Brueghel the Elder and Peter Paul Rubens, The Sense of Sight (1617)",
        "excerpt": "Part of the Five Senses series painted for the Antwerp court, this allegory of Sight seats a nude personification amid a vast cabinet of optical wonders: telescopes, mirrors, paintings, an astrolabe and lenses scattered across the gallery, while a winged putto holds up a canvas of Christ healing the blind. The picture frames human vision as both a sensual gift and an instrument endlessly extended by glass and craft, a meditation on seeing that resonates with each new optical device strapped to the eyes.",
        "source": "Museo del Prado, via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Jan_Brueghel_I_%26_Peter_Paul_Rubens_-_Sight_(Museo_del_Prado).jpg",
        "image": {
          "src": "/covers/meta-in-house-ai-glasses--art.png",
          "alt": "The Sense of Sight (1617) by Jan Brueghel the Elder and Peter Paul Rubens, an allegorical figure surrounded by telescopes, mirrors, lenses and paintings",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Robert Schumann, Kinderszenen, Op. 15, No. 7 \"Traeumerei\" (Dreaming) (1838)",
        "excerpt": "Schumann's \"Scenes from Childhood\" are a cycle of brief piano miniatures that look back on childhood through an adult's reverie, and its seventh number, \"Traeumerei\" (Dreaming), drifts in a hushed, dreamlike line that seems to hover between waking sight and inner vision. The set captures how perception can be transfigured by imagination and memory, a fitting counterpart to glasses that overlay the world with another, half-dreamed layer.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Kinderszenen,_Op.15_(Schumann,_Robert)"
      }
    ],
    "rank": 10
  },
  {
    "slug": "gta-6-launches-without-disc",
    "headline": "Grand Theft Auto VI will launch without a physical disc",
    "overview": "Rockstar Games and parent company Take-Two have confirmed that Grand Theft Auto VI will be sold digital-only, with the boxed retail edition containing only a download code rather than a Blu-ray disc. The game is scheduled to release on 19 November 2026 for PlayStation 5 and Xbox Series X|S, priced at $80 for the standard edition, with pre-loading from 12 November. The move has drawn criticism from collectors and some retailers, and renewed debate about long-term game preservation once digital storefronts eventually close.",
    "genre": "Culture",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c6210nj8gpro"
      },
      {
        "name": "Video Games Chronicle",
        "href": "https://www.videogameschronicle.com/news/rockstar-confirms-there-will-be-no-disc-version-of-gta6-at-launch/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-27",
    "image": {
      "src": "/covers/gta-6-launches-without-disc.png",
      "alt": "Grand Theft Auto VI logo",
      "credit": "Rockstar Games / Take-Two Interactive, via Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 27 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The shift from physical records to digital streaming (20th-21st century)",
        "excerpt": "Recorded music moved from shellac and vinyl records to cassette tapes and compact discs, and then, beginning in the 2000s, to digital downloads and streaming services. By the 2010s, streaming had become the dominant mode of music consumption, and ownership of a tangible object gave way to licensed, on-demand access. The transition reshaped not only how listeners acquired music but who controlled it: where a record sat on a shelf indefinitely, a streamed track could be added, altered, or withdrawn from a catalogue at any time.",
        "source": "Wikipedia, \"Music streaming service\"",
        "href": "https://en.wikipedia.org/wiki/Music_streaming_service"
      },
      {
        "category": "historical",
        "title": "The obsolescence of the floppy disk",
        "excerpt": "The floppy disk was the dominant medium for storing and moving small amounts of computer data from the mid-1970s into the 1990s, and its image survives as the near-universal \"save\" icon. As capacities grew, optical discs, USB flash drives and network storage rendered it obsolete, and Sony, the last major manufacturer, ceased production of 3.5-inch diskettes in 2011. A format that once seemed permanent vanished so completely that the data stored on surviving disks is now often unreadable for lack of working drives.",
        "source": "Wikipedia, \"Floppy disk\"",
        "href": "https://en.wikipedia.org/wiki/Floppy_disk"
      },
      {
        "category": "literary",
        "title": "William Shakespeare, Sonnet 55 (1609)",
        "excerpt": "Not marble, nor the gilded monuments\nOf princes, shall outlive this powerful rhyme;\nBut you shall shine more bright in these contents\nThan unswept stone, besmear'd with sluttish time.\nWhen wasteful war shall statues overturn,\nAnd broils root out the work of masonry,\nNor Mars his sword, nor war's quick fire shall burn\nThe living record of your memory.\n'Gainst death, and all-oblivious enmity\nShall you pace forth; your praise shall still find room\nEven in the eyes of all posterity\nThat wear this world out to the ending doom.\n    So, till the judgement that yourself arise,\n    You live in this, and dwell in lovers' eyes.",
        "source": "Project Gutenberg, \"Shakespeare's Sonnets\"",
        "href": "https://www.gutenberg.org/ebooks/1041"
      },
      {
        "category": "literary",
        "title": "Percy Bysshe Shelley, Ozymandias (1818)",
        "excerpt": "I met a traveller from an antique land\nWho said: Two vast and trunkless legs of stone\nStand in the desert. Near them, on the sand,\nHalf sunk, a shattered visage lies, whose frown,\nAnd wrinkled lip, and sneer of cold command,\nTell that its sculptor well those passions read\nWhich yet survive, stamped on these lifeless things,\nThe hand that mocked them and the heart that fed:\nAnd on the pedestal these words appear:\n\"My name is Ozymandias, king of kings;\nLook on my works, ye Mighty, and despair!\"\nNothing beside remains. Round the decay\nOf that colossal wreck, boundless and bare\nThe lone and level sands stretch far away.",
        "source": "Wikisource, \"Ozymandias (Shelley)\"",
        "href": "https://en.wikisource.org/wiki/Ozymandias_(Shelley)"
      },
      {
        "category": "artistic",
        "title": "Carl Spitzweg, The Bookworm (c. 1850)",
        "excerpt": "An elderly scholar perches atop a tall library ladder, absorbed in his books with volumes clutched under each arm and between his knees. Spitzweg's gently satirical painting celebrates the printed book as a vessel of accumulated knowledge while quietly mocking the bookworm so lost among his shelves that he is cut off from the world outside. It stands as an image of the physical library as a place of permanence, where knowledge is bound, stacked and held in the hand.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Carl_Spitzweg_021.jpg",
        "image": {
          "src": "/covers/gta-6-launches-without-disc--art.png",
          "alt": "Carl Spitzweg's painting The Bookworm, depicting an elderly man reading atop a library ladder",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Johann Sebastian Bach, The Art of Fugue, BWV 1080 (c. 1740-1750)",
        "excerpt": "Bach's late contrapuntal cycle builds fourteen fugues and four canons on a single subject, growing in complexity toward a final, unfinished fugue that breaks off where the composer is said to have introduced his own name, B-A-C-H, into the music. Left incomplete at his death, it endures as a meditation on permanence and loss: a monument of musical architecture preserved only because the score was printed and copied, surviving the silence where the writing stops.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Die_Kunst_der_Fuge,_BWV_1080_(Bach,_Johann_Sebastian)"
      }
    ],
    "rank": 11
  },
  {
    "slug": "canada-eligible-eurovision",
    "headline": "Canada becomes eligible to compete in the Eurovision Song Contest",
    "overview": "On 25 June 2026, CBC/Radio-Canada was promoted from associate to full member of the European Broadcasting Union (EBU) following a vote at the union's 96th General Assembly in Prague, which also revised the EBU statutes to open membership to qualifying broadcasters outside Europe. Because only full EBU members may enter the Eurovision Song Contest, the change makes Canada eligible to compete for the first time, potentially as early as 2027. CBC, which had been an associate member since 1950, said it would have more to say about participation later, while Canada's 2025 federal budget had earmarked funds to explore a Eurovision entry.",
    "genre": "Culture",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cy06yzp4r0eo"
      },
      {
        "name": "EBU",
        "href": "https://www.ebu.ch/news/2026/06/cbc-radio-canada-becomes-a-full-member-of-the-european-broadcasting-union"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-27",
    "image": {
      "src": "/covers/canada-eligible-eurovision.png",
      "alt": "The Eurovision Song Contest stage, lit for a live broadcast, where national entries compete before a continent-wide audience",
      "credit": "Akinranbu, CC BY-SA 3.0, via Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 27 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "European Broadcasting Union, The first Eurovision Song Contest (1956)",
        "excerpt": "The Eurovision Song Contest was first held in Lugano, Switzerland, on 24 May 1956, when seven nations sent two songs each to be performed live and broadcast simultaneously across a network of European public broadcasters. Conceived by the EBU as a way to bind a continent recovering from war through a shared light-entertainment programme, the contest grew from those seven founding countries into one of the world's longest-running televised events. Canada's 2026 eligibility echoes that founding ambition of drawing new members into a single cultural broadcast.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Eurovision_Song_Contest_1956"
      },
      {
        "category": "historical",
        "title": "The ancient Panhellenic Games at Olympia (776 BC)",
        "excerpt": "From a traditional founding date of 776 BC, the ancient Greek city-states gathered every four years at Olympia for the Olympic Games, one of four Panhellenic festivals that briefly united rival and often warring poleis under a sacred truce. Athletes and spectators travelled from across the Greek world to compete and worship together, forging a common Hellenic identity that transcended the borders of individual cities. Like Eurovision admitting a distant new entrant, the Games turned contest into a vehicle for shared belonging across separate states.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Ancient_Olympic_Games"
      },
      {
        "category": "literary",
        "title": "Pindar, Olympian Ode I (c. 476 BC)",
        "excerpt": "Best is Water of all, and Gold as a flaming fire in the night shineth eminent amid lordly wealth; but if of prizes in the games thou art fain, O my soul, to tell, then, as for no bright star more quickening than the sun must thou search in the void firmament by day, so neither shall we find any games greater than the Olympic whereof to utter our voice",
        "source": "The Extant Odes of Pindar, trans. Ernest Myers (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/10717/pg10717-images.html"
      },
      {
        "category": "literary",
        "title": "Virgil, Eclogue VII (c. 39 BC)",
        "excerpt": "Daphnis beneath a rustling ilex-tree\nHad sat him down; Thyrsis and Corydon\nHad gathered in the flock, Thyrsis the sheep,\nAnd Corydon the she-goats swollen with milk-\nBoth in the flower of age, Arcadians both,\nReady to sing, and in like strain reply.",
        "source": "The Bucolics and Eclogues of Virgil, trans. J. B. Greenough (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/230/230-h/230-h.htm"
      },
      {
        "category": "artistic",
        "title": "Nicolas Poussin, Apollo and the Muses (Parnassus) (1630s)",
        "excerpt": "Poussin's painting gathers Apollo, god of music and poetry, among the nine Muses on Mount Parnassus, the mythic source of song and artistic inspiration. Crowned poets drink from the Castalian spring as the company makes music together, an image of the arts uniting their devotees in a single harmonious assembly. It offers a classical mirror to a song contest that summons performers from many nations into one shared celebration of music.",
        "source": "Wikimedia Commons (Museo del Prado)",
        "href": "https://commons.wikimedia.org/wiki/File:Nicolas_Poussin_-_Apollo_and_the_Muses_(Parnassus)_-_WGA18307.jpg",
        "image": {
          "src": "/covers/canada-eligible-eurovision--art.png",
          "alt": "Apollo seated among the nine Muses on Mount Parnassus, painted by Nicolas Poussin",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Ludwig van Beethoven, Symphony No. 9 in D minor, Op. 125, 'Ode to Joy' finale (1824)",
        "excerpt": "Beethoven's Ninth Symphony sets Schiller's 'Ode to Joy' in its choral finale, swelling a hymn to the brotherhood of all peoples into one of music's grandest visions of unity. The theme of that finale was adopted as the Anthem of Europe, the official hymn of the Council of Europe and the European Union, making it the musical emblem of nations joined in a shared body. Its appeal to humankind embracing as one brothers resonates with a contest that gathers many countries onto a single stage.",
        "source": "IMSLP (Petrucci Music Library)",
        "href": "https://imslp.org/wiki/Symphony_No.9,_Op.125_(Beethoven,_Ludwig_van)"
      }
    ],
    "rank": 12
  },
  {
    "slug": "dalessio-portrait-gallery-award",
    "headline": "Marc Dalessio wins the 2026 National Portrait Gallery portrait award",
    "overview": "The National Portrait Gallery in London named Los Angeles-born painter Marc Dalessio the winner of the Herbert Smith Freehills Kramer Portrait Award 2026 for his canvas \"Jean-Denis\" (2025), a portrait of his neighbor painted in natural light over six sittings at his studio in southwest France. Dalessio receives a prize of £35,000 ($46,000), with the jury praising the work's restrained handling and emotional immediacy. The award was chosen from more than 1,474 entries by artists across 63 countries, with 52 portraits shown in a free exhibition at the gallery from 25 June to 7 October 2026.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Artforum",
        "href": "https://www.artforum.com/news/marc-dalessio-wins-national-portrait-gallery-award-2026-1234753384/"
      },
      {
        "name": "Artlyst",
        "href": "https://artlyst.com/marc-dalessio-wins-2026-national-portrait-gallery-portrait-award/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-27",
    "image": {
      "src": "/covers/dalessio-portrait-gallery-award.png",
      "alt": "Marc Dalessio's portrait \"Jean-Denis\" (2025), winner of the Herbert Smith Freehills Kramer Portrait Award 2026",
      "credit": "Marc Dalessio / National Portrait Gallery, via Artforum"
    },
    "edition": "Afternoon Edition · 27 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Hans Holbein the Younger at the court of Henry VIII (1536-1543)",
        "excerpt": "As the King's Painter, Hans Holbein the Younger created likenesses so precise and lifelike that they shaped royal diplomacy itself. His portrait of Anne of Cleves, painted to advise Henry VIII on a prospective bride, became a famous example of how the painted face could carry the weight of a marriage and a king's expectations across distant courts.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Hans_Holbein_the_Younger"
      },
      {
        "category": "historical",
        "title": "Diego Velazquez, \"Las Meninas\" and royal portraiture (1656)",
        "excerpt": "As court painter to Philip IV of Spain, Diego Velazquez turned the portrait into a meditation on seeing itself. In \"Las Meninas\" he placed himself at the easel among the Infanta and her attendants, while the king and queen appear only as a reflection in a distant mirror, blurring the line between the sitter, the painter, and the act of capturing a likeness.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Las_Meninas"
      },
      {
        "category": "literary",
        "title": "Oscar Wilde, \"The Picture of Dorian Gray\" (1890)",
        "excerpt": "\"It is certainly a wonderful work of art, and a wonderful likeness as well.\"\n\"My dear fellow, I congratulate you most warmly,\" he said. \"It is the finest portrait of modern times.\"",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/174/pg174.txt"
      },
      {
        "category": "literary",
        "title": "Robert Browning, \"My Last Duchess\" (1842)",
        "excerpt": "That's my last Duchess painted on the wall,\nLooking as if she were alive. I call\nThat piece a wonder, now; Fra Pandolf's hands\nWorked busily a day, and there she stands.",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/My_Last_Duchess"
      },
      {
        "category": "artistic",
        "title": "Diego Velazquez, \"Portrait of Pope Innocent X\" (c. 1650)",
        "excerpt": "Velazquez's unflinching portrait of Pope Innocent X is widely regarded as one of the finest portraits ever painted, its penetrating gaze and crimson vestments capturing a sitter of formidable, restless intelligence. Painted in Rome at the height of the artist's powers, it set a standard for psychological likeness that portraitists have measured themselves against ever since.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Innocent-x-velazquez.jpg",
        "image": {
          "src": "/covers/dalessio-portrait-gallery-award--art.png",
          "alt": "Diego Velazquez, Portrait of Pope Innocent X, c. 1650, oil on canvas",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Edward Elgar, \"Variations on an Original Theme ('Enigma'), Op. 36\" (1899)",
        "excerpt": "Elgar's \"Enigma\" Variations form a gallery of musical portraits, each variation a sketch of one of the composer's friends, dedicated \"to my friends pictured within.\" The famous \"Nimrod\" variation shows how, like a painter capturing a likeness, music can fix the character of an individual in sound.",
        "source": "IMSLP",
        "href": "https://imslp.org/wiki/Variations_on_an_Original_Theme_'Enigma',_Op.36_(Elgar,_Edward)"
      }
    ],
    "rank": 13
  },
  {
    "slug": "us-strikes-iran-cargo-ship",
    "headline": "United States launches military strikes on Iran after attack on a Gulf cargo ship",
    "overview": "The United States carried out military strikes against Iran after an attack on a cargo ship in the Gulf, marking a sharp escalation in the region. Iran's Revolutionary Guards said they had retaliated by targeting U.S. positions, raising fears of a wider confrontation.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.com/news/articles/ckg590wqxwpo"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMipwFBVV95cUxOdHdZdU1zam5FTTBKVzlNWDBLU3N0dmxTbFRaMjBrVFNwNHBXQVpnTU16SmhxWUdyRWRNUkE0NXdLWE5kMDNnc25rdFIxMk1jSFd4M05LWkxzTDVlTnRBUkotNW5RaHBQaGZFaXE2RWdlb2psdHVqTHV3MU9odHVVdVZ0M1NJX3pMQ0RHcGFsTWlQTXdIY29rSV9HQXJCWW1uZHVUWnQwOA?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-27",
    "image": {
      "src": "/covers/us-strikes-iran-cargo-ship.png",
      "alt": "News photograph accompanying coverage of U.S. military strikes on Iran following an attack on a cargo ship",
      "credit": "BBC"
    },
    "edition": "Morning Edition · 27 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Gulf of Tonkin Incident and Operation Pierce Arrow (1964)",
        "excerpt": "After the destroyer USS Maddox reported engagements with North Vietnamese torpedo boats in the Gulf of Tonkin, President Johnson ordered Operation Pierce Arrow, retaliatory carrier airstrikes on North Vietnamese naval bases. As in the Gulf today, a contested maritime clash became the trigger for swift, escalatory U.S. strikes and a wider regional confrontation, even as the facts of the original attack were later disputed.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Gulf_of_Tonkin_incident"
      },
      {
        "category": "historical",
        "title": "Operation El Dorado Canyon: U.S. Airstrikes on Libya (1986)",
        "excerpt": "After Libyan agents bombed a West Berlin nightclub frequented by American servicemen, President Reagan ordered retaliatory air and naval strikes against Libyan targets, warning that 'if necessary, we shall do it again.' The episode mirrors the present cycle: an attack attributed to a Middle Eastern adversary answered by direct American military reprisal, followed by threats of further blows from both sides.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Operation_El_Dorado_Canyon"
      },
      {
        "category": "literary",
        "title": "Aeschylus, The Persians (472 BC)",
        "excerpt": "Ship into ship drave hard its brazen beak / With speed of thought, a shattering blow! and first / One Grecian bark plunged straight, and sheared away / Bowsprit and stem of a Phoenician ship. ... The hulls rolled over, and the sea was hid, / Crowded with wrecks and butchery of men. / No beach nor reef but was with corpses strewn.",
        "source": "Project Gutenberg (Four Plays of Aeschylus)",
        "href": "https://www.gutenberg.org/files/8714/8714-h/8714-h.htm"
      },
      {
        "category": "literary",
        "title": "Alfred, Lord Tennyson, The Revenge: A Ballad of the Fleet (1878)",
        "excerpt": "'Spanish ships of war at sea! we have sighted fifty-three!' ... Ship after ship, the whole night long, their high-built galleons came, / Ship after ship, the whole night long, with her battle-thunder and flame; / Ship after ship, the whole night long, drew back with her dead and her shame.",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Revenge:_A_Ballad_of_the_Fleet"
      },
      {
        "category": "artistic",
        "title": "Paolo Veronese, The Battle of Lepanto (c. 1572)",
        "excerpt": "Veronese's great canvas splits into two registers: below, a chaos of galleys locked together amid smoke and cannon-fire on the Mediterranean; above, the Virgin and saints intervene from heaven. Painted as an ex-voto soon after the 1571 sea battle, it transforms a naval clash between rival powers into cosmic, decisive struggle, a vision that resonates with today's confrontation erupting on Gulf waters.",
        "source": "Wikimedia Commons / Gallerie dell'Accademia, Venice",
        "href": "https://commons.wikimedia.org/wiki/File:The_Battle_of_Lepanto_by_Paolo_Veronese.jpeg",
        "image": {
          "src": "/covers/us-strikes-iran-cargo-ship--art.png",
          "alt": "Paolo Veronese's painting The Battle of Lepanto, showing galleys locked in combat below and divine figures intervening from the heavens above",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Pyotr Ilyich Tchaikovsky, 1812 Overture, Op. 49 (1880)",
        "excerpt": "Tchaikovsky's overture stages war as sound: a solemn hymn invaded by martial themes, the rival 'Marseillaise' and Russian melodies clashing, and finally the thunder of cannon fire signaling retaliation and triumph. Its escalating volleys of brass, bells, and artillery capture the very rhythm of strike and counterstrike now playing out between the United States and Iran's Revolutionary Guards.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/1812_Overture,_Op.49_(Tchaikovsky,_Pyotr)"
      }
    ],
    "rank": 14
  },
  {
    "slug": "israel-lebanon-framework-agreement",
    "headline": "Israel and Lebanon sign U.S.-brokered framework agreement in Washington",
    "overview": "Israel and Lebanon signed a U.S.-brokered framework agreement in Washington, which Secretary of State Marco Rubio described as a 'first step' toward peace between the two longtime adversaries. The deal lays out principles for further negotiations rather than a final settlement.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMihwFBVV95cUxOc1lwcVc4a1RVM0RhenNCcVhMaHRWUzE0YTlXQm8yeExSWko5UFNlMmZXYVEzZDlHUUhlRlQ1WGp1Vy12LVZySHM3V1F0WUJTeWR0aTdINTlGTGMwTWN2UEx4NGNlT0REM2Z2VmlKcU1YU3QzYnM4bkZYSlMxd2Vud285cllVNVE?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.com/news/articles/cg5315n1v5go"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-27",
    "image": {
      "src": "/covers/israel-lebanon-framework-agreement.png",
      "alt": "News photograph from coverage of the U.S.-brokered Israel–Lebanon framework agreement",
      "credit": "BBC"
    },
    "edition": "Morning Edition · 27 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Egypt–Israel Peace Treaty, signed in Washington (1979)",
        "excerpt": "After the 1978 Camp David framework, Egypt and Israel signed a full peace treaty in Washington on 26 March 1979, making Egypt the first Arab state to officially recognize Israel and ending a state of war that had endured since 1948. Like the Israel–Lebanon framework hailed by Rubio as a 'first step,' it began as a U.S.-brokered framework and only gradually matured into a durable, if cold, peace. It remains the template for how an outside broker can coax old enemies toward the first fragile handshake.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Egypt%E2%80%93Israel_peace_treaty"
      },
      {
        "category": "historical",
        "title": "The Peace of Westphalia (1648)",
        "excerpt": "The two treaties signed at Münster and Osnabrück in October 1648 ended the catastrophic Thirty Years' War and reorganized the Holy Roman Empire, giving birth to the modern idea of sovereign states coexisting in peace. The settlement showed that even after decades of slaughter between bitter confessional enemies, a negotiated framework could halt the killing and lay the groundwork for a new order. Such grand brokered settlements are the distant ancestors of today's first-step accords between Israel and Lebanon.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Peace_of_Westphalia"
      },
      {
        "category": "literary",
        "title": "Isaiah 2:4, King James Bible (1611)",
        "excerpt": "And he shall judge among the nations, and shall rebuke many people: and they shall beat their swords into plowshares, and their spears into pruninghooks: nation shall not lift up sword against nation, neither shall they learn war any more.",
        "source": "Wikisource (Bible, King James)",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Isaiah"
      },
      {
        "category": "literary",
        "title": "Henry Wadsworth Longfellow, \"The Arsenal at Springfield\" (1845)",
        "excerpt": "Were half the power, that fills the world with terror,\n  Were half the wealth, bestowed on camps and courts,\nGiven to redeem the human mind from error,\n  There were no need of arsenals or forts:\n\nThe warrior's name would be a name abhorred!\n  And every nation, that should lift again\nIts hand against a brother, on its forehead\n  Would wear forevermore the curse of Cain!\n\nDown the dark future, through long generations,\n  The echoing sounds grow fainter and then cease;\nAnd like a bell, with solemn, sweet vibrations,\n  I hear once more the voice of Christ say, \"Peace!\"",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/files/1365/1365-h/1365-h.htm"
      },
      {
        "category": "artistic",
        "title": "Peter Paul Rubens, \"Minerva Protects Pax from Mars (Peace and War)\" (1629–1630)",
        "excerpt": "Rubens painted this allegory while serving as a diplomatic envoy in London, where Minerva, goddess of wisdom, shields the bountiful figure of Peace and her children from the armored fury of Mars. Painter and peacemaker at once, Rubens offered the canvas to Charles I in support of the Anglo-Spanish peace treaty that was indeed signed in 1630. It captures the exact moment celebrated in any brokered accord: wisdom holding back war so that prosperity might flourish.",
        "source": "National Gallery, London",
        "href": "https://www.nationalgallery.org.uk/paintings/peter-paul-rubens-minerva-protects-pax-from-mars-peace-and-war",
        "image": {
          "src": "/covers/israel-lebanon-framework-agreement--art.png",
          "alt": "Rubens's allegorical painting in which Minerva, goddess of wisdom, drives back the armored war-god Mars to protect the seated figure of Peace and a group of children receiving her bounty.",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Ludwig van Beethoven, Symphony No. 9 in D minor, Op. 125 (\"Choral\") (1824)",
        "excerpt": "Beethoven's final symphony culminates in the choral 'Ode to Joy,' a soaring hymn to universal brotherhood that has since become an anthem of reconciliation and shared humanity across borders. Its message that 'all men shall be brothers' speaks directly to the hope of two old enemies taking a first step toward peace. Adopted as the Anthem of Europe, it remains the enduring musical emblem of nations choosing harmony over war.",
        "source": "IMSLP",
        "href": "https://imslp.org/wiki/Symphony_No.9,_Op.125_(Beethoven,_Ludwig_van)"
      }
    ],
    "rank": 15
  },
  {
    "slug": "trump-tariff-digital-services-tax",
    "headline": "Trump threatens 100% tariff on countries that impose a digital services tax",
    "overview": "President Trump threatened to impose a 100% tariff on imports from any country that levies a digital services tax on American technology companies, escalating a trade dispute with the European Union and others. The EU said it was ready to respond with countermeasures if Washington acted.",
    "genre": "Economy",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMihgFBVV95cUxQejBVS2s2RXhBczNPb0VTcUlaOEUxTWVqcW9kczFqejIxdGl5R0UzWXNMYnNqWUVfRE9CdE02dHoxNU9Ic0NRdENITzNNZ082RXBMdkFGY3gza3d4cGN1b3Z6U1JYaU40c2lES2FpcGNDbmR2UXB6WUgtVkYzWHdTOGNkU2hKUQ?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiuAFBVV95cUxOdUtrVGNqaUdtWUFXS1dDTVZ1SmhvNWlvLUpQanRXRkd1cWpXcXZmTUJVZXhHci1Yb2EtRUF0TmE3ZndBRWJlOGlwS0RCY24ybnQ0djYtRmpfekZOS3I4TFdhUnpiUWtvMTdFeGo0RFdabkdKWDl5dS04dnhIMUd1bmRLSGdGaUNWMW5CaC1QWVJFUFNvdGNTem9yYW5EQjFCTVZuWjRoV2N1bEkyc0c4TC1fNnhqdkM4?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-27",
    "image": {
      "src": "/covers/trump-tariff-digital-services-tax.png",
      "alt": "A container port at dusk with stacked shipping containers and idle cranes under a brooding sky",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 27 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Smoot-Hawley Tariff Act and the Global Trade War (June 1930)",
        "excerpt": "Signed by President Hoover on June 17, 1930, the Smoot-Hawley Tariff Act raised duties on more than 20,000 imported goods to shield American industry as the Depression took hold. Instead of protecting the economy, it triggered swift retaliation: Canada, America's most loyal trading partner, struck back in May 1930 with new tariffs on products accounting for roughly 30% of U.S. exports to Canada, and other nations followed, helping global trade collapse by an estimated 65%. It endures as the cautionary parable invoked whenever Washington threatens punitive tariffs and trading partners vow to hit back.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Smoot%E2%80%93Hawley_Tariff_Act"
      },
      {
        "category": "historical",
        "title": "The Boston Tea Party and the Revolt Against Taxation (December 16, 1773)",
        "excerpt": "On the night of December 16, 1773, colonists disguised as Mohawks boarded three ships in Boston Harbor and dumped 342 chests of East India Company tea into the water, protesting Parliament's power to tax them without consent. The Tea Act and the wider duties became a flashpoint over who held the authority to levy charges across the Atlantic, and Britain answered with the punitive Coercive Acts. It remains the archetype of a tax dispute escalating into open economic confrontation between governments.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Boston_Tea_Party"
      },
      {
        "category": "literary",
        "title": "Aristophanes, The Acharnians, on the Megarian Decree (425 BC)",
        "excerpt": "\"Then Pericles, aflame with ire on his Olympian height, let loose the lightning, caused the thunder to roll, upset Greece and passed an edict, which ran like the song, 'That the Megarians be banished both from our land and from our markets and from the sea and from the continent.'\"",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/files/3012/3012-h/3012-h.htm"
      },
      {
        "category": "literary",
        "title": "Frédéric Bastiat, \"A Petition\" (The Candlemakers' Petition), Economic Sophisms (1845)",
        "excerpt": "\"We are suffering from the ruinous competition of a foreign rival who apparently works under conditions so far superior to our own for the production of light that he is flooding the domestic market with it at an incredibly low price... This rival, which is none other than the sun, is waging war on us so mercilessly.\"",
        "source": "Liberty Fund / Econlib",
        "href": "https://www.econlib.org/library/Bastiat/basSoph3.html"
      },
      {
        "category": "artistic",
        "title": "Nathaniel Currier, The Destruction of Tea at Boston Harbor (1846)",
        "excerpt": "Currier's hand-colored lithograph stages the 1773 protest as patriotic theater: hatchet-wielding colonists, several stripped to the waist and feathered as Mohawks, heave dark chests over the rails of moored ships while a dense crowd cheers from Griffin's Wharf. Splintered crates and a haze of spilled tea churn across the moonlit harbor, turning a tax revolt into an enduring American icon of defiance against imposed duties. The crowded, triumphant composition frames economic protest as collective spectacle.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Boston_Tea_Party_Currier_colored.jpg",
        "image": {
          "src": "/covers/trump-tariff-digital-services-tax--art.png",
          "alt": "Hand-colored 1846 Currier lithograph of colonists throwing tea chests into Boston Harbor during the Boston Tea Party",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Thomas Arne, \"Rule, Britannia!\" from the masque Alfred (1740)",
        "excerpt": "Arne's swelling D-major ode crowns the 1740 masque Alfred with a chorus that fuses national pride to command of the seas and the trade they carried, vowing that Britain shall \"rule the waves\" and never be enslaved by rival powers. Its martial dotted rhythms and triumphant cadences became the musical voice of an island staking its prosperity on dominating maritime commerce. As an anthem of economic nationalism and defiance toward foreign competitors, it resonates with any modern power wielding trade as an instrument of will.",
        "source": "IMSLP",
        "href": "https://imslp.org/wiki/Rule_Britannia_(Arne,_Thomas_Augustine)"
      }
    ],
    "rank": 16
  },
  {
    "slug": "texas-bible-required-reading-schools",
    "headline": "Texas approves Bible stories as required reading in public schools",
    "overview": "Texas approved Bible stories as required reading in its public schools, prompting a sharp dispute over religion in state education. Supporters call it part of the nation's literary heritage, while critics warn it breaches the separation of church and state.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMiqAFBVV95cUxNWGFCSW9sZXpCOFRvaUZhMXcyVEd3Y012dm51QVpJSjU2LWlacW1fQXJmcDNDSHkzN2hyRGp3YklvQTFITUFRSnEyVTM1RlB2Y1dJVWxnT0g4Q1BMdTFfYWJjSTBZbWYyQ1d3cjN1dnlIdlA1Y2R1bjBsQ3VpOVRIbS1pdFlGRHdKWDdwc1gwMVdpekpWQVZ5bWxfX2ZKMU5UY3hHcDMyN2c?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.com/news/articles/ckg8m2xkg84o"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-27",
    "image": {
      "src": "/covers/texas-bible-required-reading-schools.png",
      "alt": "News photograph from coverage of Texas making Bible stories required reading in public schools",
      "credit": "BBC"
    },
    "edition": "Morning Edition · 27 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The State of Tennessee v. John T. Scopes — the \"Monkey Trial\" (1925)",
        "excerpt": "The State of Tennessee v. John Thomas Scopes, commonly known as the Scopes trial or Scopes Monkey Trial, was an American legal case from July 10 to July 21, 1925, in which a high school teacher, John T. Scopes, was accused of violating the Butler Act, a Tennessee state law which outlawed the teaching of human evolution in public schools. The trial was deliberately staged in order to attract publicity to the small town of Dayton, Tennessee. It was the first United States trial to be broadcast on national radio, pitting the agnostic defense attorney Clarence Darrow against the fundamentalist William Jennings Bryan in a national reckoning over what religion and science the state may compel its children to learn.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Scopes_trial"
      },
      {
        "category": "historical",
        "title": "Engel v. Vitale — The Supreme Court Bans State-Composed School Prayer (1962)",
        "excerpt": "Engel v. Vitale, 370 U.S. 421 (1962), was a landmark United States Supreme Court case in which the Court ruled that it is unconstitutional for state officials to compose an official school prayer and encourage its recitation in public schools. Writing for a 6-1 majority, Justice Hugo Black held that the recitation of a government-written prayer by schoolchildren was a practice wholly inconsistent with the Establishment Clause, breaching the wall of separation between Church and State. The decision triggered a nationwide swell of indignation and remains the constitutional touchstone for every fight over scripture and devotion inside public classrooms.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Engel_v._Vitale"
      },
      {
        "category": "literary",
        "title": "Jerome Lawrence & Robert E. Lee, Inherit the Wind (1955)",
        "excerpt": "Lawrence and Lee fictionalize the 1925 Scopes trial into a blistering courtroom drama where a quiet schoolteacher is jailed for what he dared to teach. As the orator Matthew Harrison Brady thunders biblical certainty against Henry Drummond's plea for the freedom to think, the play turns a small-town trial into a parable about any attempt at mind control. Its argument that the right to a curriculum is the right to a free mind speaks directly to mandating scripture in state schools.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Inherit_the_Wind_(play)"
      },
      {
        "category": "literary",
        "title": "William Blake, \"The School Boy,\" from Songs of Experience (1794)",
        "excerpt": "But to go to school in a summer morn,—\nO it drives all joy away!\nUnder a cruel eye outworn,\nThe little ones spend the day\nIn sighing and dismay.\n\nAh then at times I drooping sit,\nAnd spend many an anxious hour;\nNor in my book can I take delight,\nNor sit in learning's bower,\nWorn through with the dreary shower.\n\nHow can the bird that is born for joy\nSit in a cage and sing?\nHow can a child, when fears annoy,\nBut droop his tender wing,\nAnd forget his youthful spring!",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/files/1934/1934-h/1934-h.htm"
      },
      {
        "category": "artistic",
        "title": "Jan Steen, The Village School (c. 1665)",
        "excerpt": "In Jan Steen's crowded Dutch schoolroom a bumbling, exaggerated master looms over rows of restless children, one boy held up for punishment as chaos brims at the edges. Steen deliberately makes the teacher look ridiculous, satirizing the authority that claims to shape young minds. The painting's mockery of compulsory instruction and its self-important moral keepers anticipates the modern unease over who controls what children are made to learn.",
        "source": "National Gallery of Ireland",
        "href": "https://commons.wikimedia.org/wiki/File:Jan_Steen_-_The_Village_School_(National_Gallery_of_Ireland).jpg",
        "image": {
          "src": "/covers/texas-bible-required-reading-schools--art.png",
          "alt": "Jan Steen's painting The Village School, showing a teacher disciplining children in a chaotic 17th-century classroom",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Felix Mendelssohn, Elijah, Op. 70 (1846)",
        "excerpt": "Mendelssohn's sacred oratorio sets the Old Testament prophet's story almost entirely in the words of scripture, weaving direct biblical quotation into towering choruses first performed for a packed civic audience in Birmingham. The work embodies how a culture once held the Bible as its shared public text, sung and absorbed by the whole community as both art and instruction. Its grandeur captures the very assumption now contested: that scripture belongs at the center of public, collective life.",
        "source": "IMSLP",
        "href": "https://imslp.org/wiki/Elijah,_Op.70_(Mendelssohn,_Felix)"
      }
    ],
    "rank": 17
  },
  {
    "slug": "dr-congo-sues-rwanda-icj",
    "headline": "DR Congo files case against Rwanda at the International Court of Justice",
    "overview": "The Democratic Republic of the Congo filed a case against Rwanda at the International Court of Justice in The Hague, accusing it of responsibility for decades of massacres, displacement and atrocities in eastern Congo dating back to 1996. It is Congo's third attempt to bring Rwanda before the court.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.com/news/articles/c8724zn3491o"
      },
      {
        "name": "Al Jazeera",
        "href": "https://www.aljazeera.com/news/2026/6/26/dr-congo-files-case-against-rwanda-at-icj-over-decades-of-alleged-abuses"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-27",
    "image": {
      "src": "/covers/dr-congo-sues-rwanda-icj.png",
      "alt": "News photograph from coverage of DR Congo taking Rwanda to the International Court of Justice",
      "credit": "BBC"
    },
    "edition": "Morning Edition · 27 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Nuremberg Trials (1945–1946)",
        "excerpt": "From 20 November 1945 to 1 October 1946, an International Military Tribunal convened by France, the Soviet Union, the United Kingdom and the United States prosecuted the surviving leaders of Nazi Germany for crimes against peace, war crimes and crimes against humanity. The Tribunal declared that to wage aggressive war was 'the supreme international crime,' differing from other war crimes only in that it contains within itself 'the accumulated evil of the whole.' It established the founding precedent that states and their leaders can be held legally accountable before an international court for mass atrocity.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Nuremberg_trials"
      },
      {
        "category": "historical",
        "title": "Bosnia and Herzegovina v. Serbia and Montenegro at the ICJ (1993–2007)",
        "excerpt": "In the first case in which one state accused a neighbouring state of genocide before the International Court of Justice in The Hague, Bosnia and Herzegovina charged Serbia with responsibility for the extermination of Bosniak Muslims during the Bosnian War. In its judgment of 26 February 2007 the Court ruled that the Srebrenica massacre constituted genocide and that Serbia had violated the Genocide Convention by failing to prevent it and to punish the perpetrators. The case mirrors Congo's appeal to the same court, one neighbour seeking a legal reckoning against another for decades of bloodshed.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Bosnian_genocide_case"
      },
      {
        "category": "literary",
        "title": "Aeschylus, 'The Eumenides' (458 BC)",
        "excerpt": "Here to all time for Aegeus' Attic host / Shall stand this council-court of judges sworn, / Here the tribunal, set on Ares' Hill... Thus I ordain it now, a council-court / Pure and unsullied by the lust of gain, / Sacred and swift to vengeance, wakeful ever / To champion men who sleep, the country's guard.",
        "source": "The Internet Classics Archive (MIT)",
        "href": "https://classics.mit.edu/Aeschylus/eumendides.html"
      },
      {
        "category": "literary",
        "title": "The Murder of Abel, Genesis 4:8–12 (King James Version, 1611)",
        "excerpt": "And Cain talked with Abel his brother: and it came to pass, when they were in the field, that Cain rose up against Abel his brother, and slew him. And the LORD said unto Cain, Where is Abel thy brother? And he said, I know not: Am I my brother's keeper? And he said, What hast thou done? the voice of thy brother's blood crieth unto me from the ground. And now art thou cursed from the earth, which hath opened her mouth to receive thy brother's blood from thy hand.",
        "source": "Wikisource (Bible, King James)",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Genesis"
      },
      {
        "category": "artistic",
        "title": "Gerard David, 'The Judgment of Cambyses' (1498)",
        "excerpt": "In this two-panel oil painting commissioned for the town hall of Bruges, the corrupt Persian judge Sisamnes is seized and then flayed alive on the order of King Cambyses, his crimes catalogued by accusing fingers as he is stripped upon a bench. In the upper background his son delivers justice from the same judgment seat, now grimly upholstered with his father's skin. A stark visual meditation on the demand that those who pervert justice and inflict suffering be themselves called to account.",
        "source": "Groeningemuseum, Bruges (Wikipedia)",
        "href": "https://en.wikipedia.org/wiki/The_Judgment_of_Cambyses",
        "image": {
          "src": "/covers/dr-congo-sues-rwanda-icj--art.png",
          "alt": "Gerard David's 1498 panel showing the arrest of the corrupt judge Sisamnes before King Cambyses",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Giuseppe Verdi, 'Dies Irae' from the Messa da Requiem (1874)",
        "excerpt": "In the thundering 'Dies Irae' (Day of Wrath) sequence of his Requiem, Verdi unleashes hammering drums, shrieking brass and an avalanche of chorus to evoke the day of judgment, when every soul is summoned before a final and inescapable tribunal. The medieval text it sets imagines the trumpet scattering its sound across the graves, driving all before the throne, and a judge from whom nothing hidden remains unavenged. It is the sound of an ultimate reckoning, a higher court at which all wrongs are at last weighed.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Requiem_(Verdi,_Giuseppe)"
      }
    ],
    "rank": 18
  },
  {
    "slug": "burkina-faso-cuts-france-ties",
    "headline": "Burkina Faso severs diplomatic relations with former colonial ruler France",
    "overview": "Burkina Faso's military government, led by Captain Ibrahim Traoré, announced it was severing diplomatic relations with its former colonial ruler France, accusing Paris of neo-colonial interference and support for armed groups. France called the decision hostile and without foundation.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiqAFBVV95cUxPOTNqVzNhVDYyNGRvOXF5RmdvQkc4TEFpdkRORkVHQUpvRl9qclJRRERDODhuVWc1SFJjYXUyTnVTQ0gtYWVDakJnOVNvd1NKTUh1T2w3Wnp3a28wMXJIMFVfaXAzVWJVQk9yVVNwcndlcUstUmhfWmtpOVlrX1NVeFdZR3FDcGRDakQyR05zbXZsZ1d1VzZ2M2hWWXdGOEF6S2NmTkdHdms?oc=5"
      },
      {
        "name": "Al Jazeera",
        "href": "https://www.aljazeera.com/news/2026/6/26/burkina-faso-cuts-diplomatic-ties-with-former-colonial-ruler-france"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-27",
    "image": {
      "src": "/covers/burkina-faso-cuts-france-ties.png",
      "alt": "A furled dark flag drooping from a pole in the empty courtyard of a weathered colonial-era government building at dusk",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 27 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Haitian Declaration of Independence (Gonaïves, 1 January 1804)",
        "excerpt": "It is not enough to have expelled the barbarians who have bloodied our land for two centuries; it is not enough to have restrained those ever-evolving factions that one after another mocked the specter of liberty that France dangled before you. We must, with one last act of national authority, forever assure the empire of liberty in the country of our birth; we must take any hope of re-enslaving us away from the inhuman government that for so long kept us in the most humiliating torpor.",
        "source": "Haitian Declaration of Independence (Jean-Jacques Dessalines / Louis Boisrond-Tonnerre), 1804",
        "href": "https://en.wikipedia.org/wiki/Haitian_Declaration_of_Independence"
      },
      {
        "category": "historical",
        "title": "Patrice Lumumba's Independence Day Speech, Léopoldville, 30 June 1960",
        "excerpt": "Although this independence of the Congo is being proclaimed today by agreement with Belgium, an amicable country, with which we are on equal terms, no Congolese will ever forget that independence was won in struggle, a persevering and inspired struggle carried on from day to day, a struggle, in which we were undaunted by privation or suffering and stinted neither strength nor blood. Morning, noon and night we were subjected to jeers, insults and blows because we were 'Negroes'.",
        "source": "Patrice Lumumba, Speech at the Ceremony of the Proclamation of the Congo's Independence, 30 June 1960",
        "href": "https://en.wikipedia.org/wiki/Congolese_Independence_Speech"
      },
      {
        "category": "literary",
        "title": "Aimé Césaire, Discourse on Colonialism (Discours sur le colonialisme, 1955)",
        "excerpt": "Césaire turns the language of the 'civilizing mission' back on Europe itself, arguing that colonization degrades the colonizer as surely as it brutalizes the colonized, equating conquest with thingification and barbarism dressed up as progress. His searing indictment, often called a declaration of war on empire, became a foundational text for the African, Caribbean, and pan-African liberation movements that followed. Its insistence that the colonized owe the colonizer nothing but resistance echoes powerfully in any modern rupture with a former imperial ruler.",
        "source": "Aimé Césaire, Discourse on Colonialism (1955; trans. Joan Pinkham)",
        "href": "https://en.wikipedia.org/wiki/Discourse_on_Colonialism"
      },
      {
        "category": "literary",
        "title": "Claude McKay, \"If We Must Die\" (The Liberator, 1919)",
        "excerpt": "If we must die, let it not be like hogs / Hunted and penned in an inglorious spot, / While round us bark the mad and hungry dogs, / Making their mock at our accursèd lot. / If we must die, O let us nobly die, / So that our precious blood may not be shed / In vain; then even the monsters we defy / Shall be constrained to honor us though dead! / O kinsmen! we must meet the common foe! / Though far outnumbered let us show us brave, / And for their thousand blows deal one death-blow! / What though before us lies the open grave? / Like men we'll face the murderous, cowardly pack, / Pressed to the wall, dying, but fighting back!",
        "source": "Claude McKay, \"If We Must Die,\" 1919",
        "href": "https://en.wikisource.org/wiki/If_We_Must_Die"
      },
      {
        "category": "artistic",
        "title": "Eugène Delacroix, Liberty Leading the People (La Liberté guidant le peuple, 1830)",
        "excerpt": "A bare-breasted personification of Liberty in a Phrygian cap strides across a barricade, the tricolour flag raised in one hand and a musket in the other, leading a ragged column of workers, students, and a pistol-wielding boy over the bodies of the fallen. Painted to commemorate the July Revolution of 1830 that toppled Charles X, Delacroix's canvas became the enduring visual emblem of a people rising to throw off a ruler. Its smoke-wreathed defiance speaks to every moment when the oppressed seize their own destiny.",
        "source": "Eugène Delacroix, Liberty Leading the People (1830), Musée du Louvre, Paris",
        "href": "https://en.wikipedia.org/wiki/Liberty_Leading_the_People",
        "image": {
          "src": "/covers/burkina-faso-cuts-france-ties--art.png",
          "alt": "Eugène Delacroix's 1830 painting Liberty Leading the People, showing a woman holding the French tricolour leading revolutionaries over a barricade",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Giuseppe Verdi, \"Va, pensiero\" (Chorus of the Hebrew Slaves) from Nabucco (1842)",
        "excerpt": "Verdi's chorus of exiled, enslaved Hebrews longs for a lost homeland in a soaring, unison melody that became an unofficial anthem of national liberation, sung by peoples chafing under foreign domination. Its swelling collective voice, mourning bondage while dreaming of freedom, transformed an opera scene into a rallying cry against imperial rule. The piece endures as music's most famous expression of a captive people yearning to break their chains.",
        "source": "Giuseppe Verdi, Nabucco (1842), libretto by Temistocle Solera; vocal/orchestral scores on IMSLP",
        "href": "https://imslp.org/wiki/Nabucco_(Verdi,_Giuseppe)"
      }
    ],
    "rank": 19
  },
  {
    "slug": "bolton-pleads-guilty-classified",
    "headline": "Former U.S. national security adviser John Bolton pleads guilty to mishandling classified documents",
    "overview": "Former U.S. national security adviser John Bolton pleaded guilty to illegally retaining and mishandling classified documents. The plea closes a high-profile case against one of President Trump's most prominent former advisers turned critics.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMixAFBVV95cUxNbHA0YmFFeG9tUlI1Z0syYVhDVVJWdmpkT1RXWGJsQ2F1SWY1MmNZcTlybUlLM3hhaDdsbUZRS2l2YW53RjM0SmlwRk9FVzlrb1JiM085SWtHZzVWSkhlY3k5Q0pNMVBkU1hFZjhsN0Y3dkZiZkZpOGxKeDkzR2tpbHlvbmZma1VRR2JtMjVkYmR6MEkweW9JbGZfMG5Od1hLbHNEQW9tNE1kNS1SV3M0RlZPUWQ4aDZPZFFTRnpNTjdiRFdT?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.com/news/articles/czxqwg4nrvlo"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-27",
    "image": {
      "src": "/covers/bolton-pleads-guilty-classified.png",
      "alt": "News photograph of John Bolton from coverage of his guilty plea over classified documents",
      "credit": "BBC"
    },
    "edition": "Morning Edition · 27 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Daniel Ellsberg and the Pentagon Papers (1971)",
        "excerpt": "A RAND analyst with privileged access to a 7,000-page secret Defense Department study of the Vietnam War, Daniel Ellsberg photocopied the documents in 1969 and leaked them to the press in 1971. He surrendered to authorities on June 28, 1971, and was indicted on espionage and theft charges for retaining and disseminating classified national-defense material. The case became the defining American confrontation over a once-trusted insider's handling of state secrets, ending only when government misconduct forced a 1973 mistrial.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Pentagon_Papers"
      },
      {
        "category": "historical",
        "title": "Aldrich Ames Pleads Guilty to Espionage (April 28, 1994)",
        "excerpt": "Aldrich Ames was a senior CIA counterintelligence officer who, from 1985, sold the agency's most sensitive secrets to the Soviet Union and Russia for some $4.6 million. Arrested in February 1994, he pleaded guilty and was sentenced to life without parole; in court he admitted compromising \"virtually all Soviet agents of the CIA and other American and foreign services known to me.\" His confession exposed the ultimate betrayal of trust by a once-powerful official entrusted with the nation's deepest secrets.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Aldrich_Ames"
      },
      {
        "category": "literary",
        "title": "Cardinal Wolsey's Fall in Shakespeare's Henry VIII (Act 3, Scene 2)",
        "excerpt": "Farewell! a long farewell, to all my greatness! / This is the state of man: to-day he puts forth / The tender leaves of hopes; to-morrow blossoms, / And bears his blushing honours thick upon him; / The third day comes a frost, a killing frost, / And, when he thinks, good easy man, full surely / His greatness is a-ripening, nips his root, / And then he falls, as I do. ... Had I but served my God with half the zeal / I served my king, he would not in mine age / Have left me naked to mine enemies.",
        "source": "The Complete Works of Shakespeare (MIT)",
        "href": "https://shakespeare.mit.edu/henryviii/henryviii.3.2.html"
      },
      {
        "category": "literary",
        "title": "Samson's Confession in Milton's Samson Agonistes (1671)",
        "excerpt": "But I Gods counsel have not kept, his holy secret / Presumptuously have publish'd, impiously, / Weakly at least, and shamefully: A sin / That Gentiles in thir Parables condemn / To thir abyss and horrid pains confin'd. ... Secrets of men, the secrets of a friend, / How heinous had the fact been, how deserving / Contempt, and scorn of all, to be excluded / All friendship, and avoided as a blab.",
        "source": "The John Milton Reading Room (Dartmouth)",
        "href": "https://milton.host.dartmouth.edu/reading_room/samson/drama/text.shtml"
      },
      {
        "category": "artistic",
        "title": "Jacques-Louis David, Belisarius Begging for Alms (1781)",
        "excerpt": "David's vast neoclassical canvas shows the once-invincible Byzantine general Belisarius, conqueror of the Vandals, reduced to a blind beggar in tattered cloth, his helmet upturned to receive coins. A startled soldier recoils in recognition as a woman drops alms into the helmet, the gesture freezing the unbearable contrast between past glory and present ruin. It is the archetypal image of the mighty official cast down, stripped by the very power he once served.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Belisarius_Begging_for_Alms",
        "image": {
          "src": "/covers/bolton-pleads-guilty-classified--art.png",
          "alt": "Jacques-Louis David's painting Belisarius Begging for Alms, depicting the disgraced general as a blind beggar receiving alms",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Modest Mussorgsky, Boris Godunov (1869–1872)",
        "excerpt": "Mussorgsky's epic opera traces a powerful ruler destroyed from within by the secret of his own guilt. Having seized the throne, Tsar Boris is haunted by visions of the murdered child Dmitri, choking with remorse in the great \"Clock\" monologue before collapsing. In the final act, confronted by the past, he confesses and dies, dramatizing the inexorable fall of the mighty under the weight of buried crimes and conscience.",
        "source": "IMSLP (Petrucci Music Library)",
        "href": "https://imslp.org/wiki/Boris_Godunov_(Mussorgsky,_Modest)"
      }
    ],
    "rank": 20
  },
  {
    "slug": "us-restricts-frontier-ai-trusted",
    "headline": "U.S. restricts frontier AI releases to 'trusted' customers as OpenAI defers GPT-5.6",
    "overview": "The U.S. government moved to restrict the release of the most powerful frontier AI models to approved 'trusted' organizations, prompting OpenAI to defer the public rollout of GPT-5.6 and Anthropic to limit a new model's release during a national-security review. Officials said early access would let them vet the systems before wider distribution.",
    "genre": "Technology",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMiqgFBVV95cUxQNmF5MEZucTFsVmZudmVjU0RpalFGZHdteVFrN2dZM1F0elpFYy1xQ0x5elRSVXE3VTdueTZpdFZNdWZybFFqV1pVTkhfVlpBcC03MFZGS2RZQ0ZLNDV3a3Z2eVZVS3Bnc1NBaTJQLTVXZ213YkkzdTd0djVNNkRLclJ2YTFVeU9sUXJ1Y3FLcUVXODhVbTUxOEhtTVNfS1l5cktra0xxWXlqZw?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMixwFBVV95cUxQUnFfdzFOMEtRZ2xQYThDMDl3OFlWUDVFQ3VFelowLVVHUGt0TktoUHMzamJDekMzS09jaGR5RU9EaVNsNmdKR1JYSzVwbGNneUVaWWlnQzM4YnUxZGp3ZkthVlYyUGhXMUtDSjNZVC1YSGlpeDYxVjBOTkdSeGltaC15TjRqYVJiQnlxVlhjY01ZODRVQURFMjZEbVdaUHRJV2JlNklyRXRpNzAxbnVDS1dETk82WjJxLXZFdFRrSk8tTDJJZTJF?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-27",
    "image": {
      "src": "/covers/us-restricts-frontier-ai-trusted.png",
      "alt": "A glowing server cabinet sealed behind a heavy locked steel vault door in a dim room",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 27 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Manhattan Project and Compartmentalized Secrecy (1942–1945)",
        "excerpt": "Established as the Manhattan District on 13 August 1942 under General Leslie Groves, the project to build the atomic bomb was governed by an extreme regime of secrecy and compartmentalization: knowledge of the most powerful technology ever devised was deliberately partitioned so that few participants understood the whole, and the program operated under strict security regulations. As one scientist complained, progress was 'still further inhibited by the requirement of secrecy.' The state's instinct to wall off world-changing capability behind trust and clearance prefigures today's controlled release of frontier AI.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Manhattan_Project"
      },
      {
        "category": "historical",
        "title": "The Atomic Energy Act of 1946 and 'Born Secret' Restricted Data",
        "excerpt": "Signed by President Truman on 1 August 1946, the Atomic Energy Act placed nuclear knowledge under government monopoly through the doctrine of 'restricted data': 'All information concerning the design, development and manufacture of nuclear weapons was \"restricted data\", and regardless of how it was derived or obtained, was considered classified unless it was specifically declassified.' This unprecedented 'born secret' principle, that an entire category of knowledge is classified from the moment of its creation, is the closest legal ancestor to a state restricting who may receive the most powerful frontier AI models.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Atomic_Energy_Act_of_1946"
      },
      {
        "category": "literary",
        "title": "Aeschylus, Prometheus Bound (c. 430 BC)",
        "excerpt": "\"I that searched out the source of fire, by stealth borne-off inclosed in a fennel-rod, which has shown itself a teacher of every art to mortals.\" Prometheus recounts that Jupiter \"wished, after having annihilated the entire race, to plant another new one. And these schemes no one opposed except myself: But I dared: I ransomed mortals from being utterly destroyed.\" For delivering a powerful, civilization-altering technology to humanity against the will of the gods, he is chained to a rock, the archetype of dangerous knowledge that authority would rather keep gated.",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/files/27458/27458-h/27458-h.htm"
      },
      {
        "category": "literary",
        "title": "Mary Shelley, Frankenstein; or, The Modern Prometheus (1818)",
        "excerpt": "\"Learn from me, if not by my precepts, at least by my example, how dangerous is the acquirement of knowledge and how much happier that man is who believes his native town to be the world, than he who aspires to become greater than his nature will allow.\" Victor Frankenstein's warning to Captain Walton frames the central anxiety of restricted frontier AI: that a creator may unleash a power he cannot recall, and that some capabilities are safer left ungrasped.",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/files/84/84-h/84-h.htm"
      },
      {
        "category": "artistic",
        "title": "Jan Cossiers, Prometheus Carrying Fire (1637)",
        "excerpt": "In this Flemish Baroque canvas, now in the Museo del Prado, the muscular Titan strides through darkness clutching the stolen flame, shielding it with his hand as he carries forbidden power down to mankind. Cossiers sets the glowing fire against deep shadow and a charged sky, his palette of reds, golds, and blues making the contraband knowledge itself the luminous center of the picture. The painting renders, in a single tense figure, the act of taking a world-altering technology past the gatekeepers who would withhold it.",
        "source": "Museo del Prado",
        "href": "https://www.museodelprado.es/en/the-collection/art-work/prometheus/f7729f74-149c-405e-a241-7218d76138fc",
        "image": {
          "src": "/covers/us-restricts-frontier-ai-trusted--art.png",
          "alt": "Jan Cossiers, Prometheus Carrying Fire (1637), Museo del Prado",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "John William Waterhouse, Pandora (1896)",
        "excerpt": "Kneeling in a dark primeval forest, Waterhouse's Pandora lifts the lid of a great jewel-encrusted golden chest and peers within, her curiosity caught at the instant before catastrophe. A faint glow escapes from the opening container, the moment dangerous powers slip irretrievably into the world. The image distills the fear behind every effort to gate a powerful new technology: that once the lid is raised, what comes out cannot be put back.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:John_William_Waterhouse_-_Pandora,_1896.jpg",
        "image": {
          "src": "/covers/us-restricts-frontier-ai-trusted--art2.png",
          "alt": "John William Waterhouse, Pandora (1896)",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 21
  },
  {
    "slug": "greece-satellites-wildfires-first",
    "headline": "Greece becomes first nation to fold a satellite array into its firefighting system",
    "overview": "Greece became the first country to integrate a dedicated array of thermal-sensing satellites into its national firefighting system, able to spot new blazes as small as four meters across and alert commanders in near-real time. Four satellites were launched in May as part of a wider 200-million-euro observation network funded by the EU.",
    "genre": "Science",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMiugFBVV95cUxOc2JJREpYVnZ6WVh2MTlRWGJ2bGEzUEVkN2s1WGliWVdPM2Z1ZDVnMTJ5eEUtRFNDVVF3eDJEamhpdm9aa29xMFU2WV9Kd0RWZU5ncDhDMnJDb1R0WnFZNW1NSUNqQWZIYzNtQ3FDQklDemNpZjJfWUdKX2dIWUttUUpPN3NfMTVpY0ZiS1k5aUlOWnh2cmRCZl8xVVhrM2dIRmw2MXRNTzNWU24yNk9iMFFJUXoxV2NOM0E?oc=5"
      },
      {
        "name": "The Columbian",
        "href": "https://www.columbian.com/news/2026/jun/26/in-a-global-first-greece-bets-on-space-tech-to-contain-fires/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-27",
    "image": {
      "src": "/covers/greece-satellites-wildfires-first.png",
      "alt": "A small satellite above the night-time Earth watching a tiny ember of wildfire on a dark coastline",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 27 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Beacon Network of Elizabethan England Against the Spanish Armada (1588)",
        "excerpt": "In England, the most famous examples are the beacons used in Elizabethan England to warn of the approaching Spanish Armada. As signals, beacons are an ancient form of optical telegraph and were part of a relay league. A chain of coastal and hilltop fires could carry news of the enemy's approach from the Channel to London in a fraction of the time any rider could manage, a distributed early-warning system watching the horizon for catastrophe.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Beacon"
      },
      {
        "category": "historical",
        "title": "The Beacon Towers of the Great Wall of China (Han dynasty onward, from the 2nd century BC)",
        "excerpt": "In imperial China, sentinels on and near the Great Wall of China used a sophisticated system of daytime smoke and nighttime flame to send signals along long chains of beacon towers. Signal towers were built upon hill tops or other high points along the wall for their visibility, so that the alarm of an incursion could leap from station to station faster than any messenger, an empire-spanning sensor grid trained on the threat of invasion.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Great_Wall_of_China"
      },
      {
        "category": "literary",
        "title": "Aeschylus, Agamemnon — The Watchman's Vigil and the Beacon-Relay (458 BC)",
        "excerpt": "Release from this weary task of mine has been my cry unto the gods throughout my long year's watch, wherein, couchant upon the palace roof of the Atreidae, upon my bended arm, like a hound, I have learned to know aright the conclave of the stars of night... So now I am still awatch for the signal-flame, the gleaming fire that is to harbinger news from Troy and tidings of its capture. ... Hephaestus, from Ida speeding forth his brilliant blaze. Beacon passed beacon on to us by courier-flame: Ida, to the Hermaean scaur in Lemnos; to the mighty blaze upon the island succeeded, third, the summit of Athos sacred unto Zeus; and, soaring high aloft so as to arch the main, the flame, travelling joyously onward...",
        "source": "Wikisource (Smyth, 1926)",
        "href": "https://en.wikisource.org/wiki/Aeschylus_(Smyth_1926)_v2/Agamemnon"
      },
      {
        "category": "literary",
        "title": "Aeschylus, Prometheus Bound — The Theft of Fire for Mortals (c. 430 BC)",
        "excerpt": "I am he that searched out the source of fire, by stealth borne-off inclosed in a fennel-rod, which has shown itself a teacher of every art to mortals, and a great resource. ... Over and above these boons, however, I imparted fire to them. ... Yes—from which they will moreover learn thoroughly many arts. The Titan's stolen flame, the spark of all human craft, is here the very thing now to be tracked and tamed from the heavens.",
        "source": "Project Gutenberg (Buckley translation)",
        "href": "https://www.gutenberg.org/files/27458/27458-h/27458-h.htm"
      },
      {
        "category": "artistic",
        "title": "Peter Paul Rubens, Juno and Argus (c. 1610)",
        "excerpt": "Rubens depicts the aftermath of the death of Argus Panoptes, the hundred-eyed giant whom Juno set as an unsleeping watchman. The goddess and her attendants gather the eyes from the severed head and set them, glittering, into the spreading fan of the peacock's tail. It is myth's portrait of total surveillance, an all-seeing sentinel whose countless eyes never all close at once, here transfigured into an emblem of watchfulness preserved.",
        "source": "Wallraf-Richartz Museum, Cologne (via Wikipedia)",
        "href": "https://en.wikipedia.org/wiki/Juno_and_Argus",
        "image": {
          "src": "/covers/greece-satellites-wildfires-first--art.png",
          "alt": "Peter Paul Rubens, Juno and Argus (c. 1610), Juno collecting the hundred eyes of the slain all-seeing watchman Argus into the peacock's tail",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Richard Wagner, Die Walküre, WWV 86B — Wotan's Farewell and the Magic Fire Music (composed 1856, premiered 1870)",
        "excerpt": "The opera closes as Wotan summons Loge, the fire-god, to ring the sleeping Brünnhilde with a wall of flame that none but a hero may cross. Shimmering, flickering strings and woodwinds conjure the encircling blaze as a living guardian, fire transformed from destroyer into faithful sentinel keeping watch over what must be protected. The same tamed, watching flame that the music makes sublime is, in the news, marshalled from orbit to guard a nation.",
        "source": "IMSLP",
        "href": "https://imslp.org/wiki/Die_Walk%C3%BCre,_WWV_86B_(Wagner,_Richard)"
      }
    ],
    "rank": 22
  },
  {
    "slug": "edf-sells-north-america-kkr",
    "headline": "EDF agrees to sell its U.S. and Canada renewable-power business to KKR",
    "overview": "France's state-owned utility EDF agreed to sell its U.S. and Canada renewable-power business, comprising 5.6 gigawatts of assets, to private-equity firm KKR for nearly 4 billion euros. EDF is raising cash to maintain its ageing nuclear fleet and finance new reactors at home.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMilAFBVV95cUxNc3hpVUJVeE5iUWhhUk1vaHZFNjJBejNudGktSS1QVkwtZFZEY1ZwSEFLbEZnbzhzb0Y0VzlaMUkxcW53QUwtblNGUTd2a3hlRXZOZ0Z4MHgyRHFpeXlxU0tzaUItdC1KUFdJUEM0Vm9LTDVES0hpTzBJZ1JocUoyZFVDOWpTUWVGTFJaTW9Pczg2TWNx?oc=5"
      },
      {
        "name": "US News",
        "href": "https://money.usnews.com/investing/news/articles/2026-06-26/edf-signs-deal-to-sell-us-canada-unit-to-kkr"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-27",
    "image": {
      "src": "/covers/edf-sells-north-america-kkr.png",
      "alt": "Rows of wind turbines across a North American plain at dawn under a wide pale sky",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 27 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Louisiana Purchase: France Sells Its North American Territory to Fund War at Home (1803)",
        "excerpt": "By early 1803 Napoleon Bonaparte, having abandoned hopes of rebuilding a New World empire and needing cash to fight Britain, directed his ministers to offer the United States not just New Orleans but the entire Louisiana Territory. On April 11, 1803, Barbe-Marbois offered Robert Livingston all of Louisiana for $15 million; the treaty was signed in Paris on April 30, 1803. Napoleon told his finance minister he required 'a great deal of money for this war,' liquidating a vast overseas holding to pour resources into the struggle on his own continent.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Louisiana_Purchase"
      },
      {
        "category": "historical",
        "title": "Seward's Folly: Russia Sells Alaska to Pay Off Its War Debts (1867)",
        "excerpt": "Alexander II of Russia, after a catastrophic defeat in the Crimean War, concluded that his Alaskan possessions would be impossible to defend against Britain and had become an economic liability amid debt accrued during that disastrous war. On March 30, 1867, Russia sold Alaska to the United States for $7.2 million, roughly two cents an acre. The empire shed a remote overseas holding to relieve the financial strain on the home treasury, retrenching to defend what it could not afford to keep abroad.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Alaska_Purchase"
      },
      {
        "category": "literary",
        "title": "Anton Chekhov, 'The Cherry Orchard' — The Estate Goes Under the Hammer (1904)",
        "excerpt": "LOPAKHIN: I bought it. ... The cherry orchard is mine now, mine! ... I bid ninety more than the mortgage; and it stayed with me. ... The new owner, the owner of the cherry orchard is coming! The aristocratic Ranevsky family, unable to service the debts on their beloved estate, watch it auctioned to pay the mortgage — the orchard sold off and the past sacrificed to settle accounts.",
        "source": "Project Gutenberg / ibiblio Eldritch Press",
        "href": "https://www.ibiblio.org/eldritch/ac/chorch.htm"
      },
      {
        "category": "literary",
        "title": "Esau Sells His Birthright for a Mess of Pottage — Genesis 25:29-34 (King James Version, 1611)",
        "excerpt": "And Jacob sod pottage: and Esau came from the field, and he was faint: And Esau said to Jacob, Feed me, I pray thee, with that same red pottage; for I am faint... And Jacob said, Sell me this day thy birthright. And Esau said, Behold, I am at the point to die: and what profit shall this birthright do to me? And Jacob said, Swear to me this day; and he sware unto him: and he sold his birthright unto Jacob... thus Esau despised his birthright.",
        "source": "Wikisource (King James Bible)",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Genesis/Chapter_25"
      },
      {
        "category": "artistic",
        "title": "William Hogarth, 'Marriage A-la-Mode: 1, The Marriage Settlement' (1743)",
        "excerpt": "A gouty earl points proudly to his family tree while, on the table before him, a wealthy alderman's gold and bills of exchange — the bride's dowry — are heaped to rescue an aristocrat drowning in debt. Through the window stands his half-built, over-ambitious mansion, its construction stalled for want of funds, a monument to resources stretched past breaking. Hogarth paints the moment a great house mortgages its very bloodline to raise the ready cash its strained estate can no longer supply.",
        "source": "Wikipedia / National Gallery, London",
        "href": "https://en.wikipedia.org/wiki/Marriage_A-la-Mode:_1._The_Marriage_Settlement",
        "image": {
          "src": "/covers/edf-sells-north-america-kkr--art.png",
          "alt": "Hogarth's painting The Marriage Settlement, showing an indebted earl receiving a pile of gold from a wealthy merchant",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Giuseppe Verdi, 'Di Provenza il mar, il suol' from La traviata (1853)",
        "excerpt": "In Germont's great Act II aria the father pleads with his son to abandon his costly Parisian entanglement and return to the sea and soil of Provence, the family home he has forsaken. The music is a tender, insistent summons back to the core — to homeland, hearth, and the patrimony that must be preserved. It is the voice of retrenchment itself, calling a wandering heir back from the alluring world abroad to the ancestral ground that defines him.",
        "source": "IMSLP (Petrucci Music Library)",
        "href": "https://imslp.org/wiki/La_traviata_(Verdi,_Giuseppe)"
      }
    ],
    "rank": 23
  },
  {
    "slug": "turrell-100th-skyspace-aarhus",
    "headline": "James Turrell unveils his 100th Skyspace, the largest ever built for a museum, in Aarhus",
    "overview": "Artist James Turrell unveiled his 100th 'Skyspace', titled 'As Seen Below', the largest ever built for a museum, at the ARoS museum in Aarhus, Denmark. The subterranean domed chamber, 40 meters wide with an oculus open to the sky, anchors the museum's new underground expansion.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Colossal",
        "href": "https://www.thisiscolossal.com/2026/06/james-turrell-as-seen-below-skyscape-aros-aarhus-denmark/"
      },
      {
        "name": "Dezeen",
        "href": "https://www.dezeen.com/2026/06/19/james-turrell-as-seen-below-skyspace-aarhus-aros-museum/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-27",
    "image": {
      "src": "/covers/turrell-100th-skyspace-aarhus.png",
      "alt": "Interior of James Turrell's domed Skyspace 'As Seen Below' at the ARoS museum in Aarhus",
      "credit": "Colossal"
    },
    "edition": "Morning Edition · 27 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Pantheon and its Oculus, Rome (completed c. 126 AD)",
        "excerpt": "The Pantheon's unreinforced concrete dome remains the largest in the world, and at its apex a single circular opening, the oculus, 8.2 metres across, stands open to the sky as the building's sole source of natural light. As the sun moves, the disc of daylight glides across the coffered vault and curved walls in a reverse-sundial effect, marking time with light rather than shadow. The height to the oculus equals the diameter of the interior, 43 metres, so a perfect sphere could rest inside, drawing the eye and the spirit upward toward the heavens.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Pantheon,_Rome"
      },
      {
        "category": "historical",
        "title": "Hagia Sophia and its Dome of Light, Constantinople (dedicated 537 AD)",
        "excerpt": "Dedicated on 27 December 537, Hagia Sophia raised a vast dome on pendentives that seems to hover weightlessly over the nave, an illusion produced by the ring of forty windows pierced at its base. Light pouring through that crown dissolves the dome's apparent mass, so that the contemporary chronicler Procopius wrote it appeared not to rest on solid masonry but to be suspended from heaven by a golden chain. For a thousand years it was the largest interior in the Christian world, its luminous canopy a model for treating architecture as a vessel of celestial light.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Hagia_Sophia"
      },
      {
        "category": "literary",
        "title": "Plato, Allegory of the Cave, The Republic, Book VII (c. 375 BC)",
        "excerpt": "And now, I said, let me show in a figure how far our nature is enlightened or unenlightened: Behold! human beings living in an underground den, which has a mouth open toward the light and reaching all along the den; here they have been from their childhood, and have their legs and necks chained so that they cannot move, and can only see before them, being prevented by the chains from turning round their heads. Above and behind them a fire is blazing at a distance, and between the fire and the prisoners there is a raised way; and you will see, if you look, a low wall built along the way, like the screen which marionette-players have in front of them, over which they show the puppets.",
        "source": "Wikisource (Jowett translation)",
        "href": "https://en.wikisource.org/wiki/The_Republic_of_Plato/Book_7"
      },
      {
        "category": "literary",
        "title": "Dante, Paradiso, Canto XXXIII (c. 1320)",
        "excerpt": "Within the deep and luminous subsistence / Of the High Light appeared to me three circles... But now was turning my desire and will, / Even as a wheel that equally is moved, / The Love which moves the sun and the other stars.",
        "source": "Wikisource (Longfellow translation, 1867)",
        "href": "https://en.wikisource.org/wiki/Divine_Comedy_(Longfellow_1867)/Volume_3/Canto_33"
      },
      {
        "category": "artistic",
        "title": "Caspar David Friedrich, Wanderer above the Sea of Fog (c. 1818)",
        "excerpt": "A solitary figure stands upon a dark rocky outcrop, walking stick in hand, gazing outward over a sea of billowing fog from which distant peaks rise like ghosts. The composition holds the viewer between the finite self and an infinite, unknowable expanse, the very image of the Romantic sublime. It is the same act Turrell stages in a Skyspace: a single contemplative figure turned toward a vast, luminous, ungraspable heaven.",
        "source": "Wikipedia (Hamburger Kunsthalle)",
        "href": "https://en.wikipedia.org/wiki/Wanderer_above_the_Sea_of_Fog",
        "image": {
          "src": "/covers/turrell-100th-skyspace-aarhus--art.png",
          "alt": "A man in a dark coat stands on a rocky summit gazing out over a sea of fog and distant mountains",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Joseph Haydn, Die Schöpfung (The Creation), Hob.XXI:2 (1796-98)",
        "excerpt": "In the oratorio's opening, Haydn paints the dawn of the cosmos out of murky, groping harmony until, at the words 'and there was Light,' the full chorus and orchestra erupt into a single blazing C-major chord, one of the most celebrated depictions of light bursting into being in all of music. The work translates the primal theme of illumination from the heavens into sound, where darkness yields suddenly to radiance. It is the auditory cousin of a Skyspace at twilight, when a deepening sky is overtaken by transforming light.",
        "source": "IMSLP",
        "href": "https://imslp.org/wiki/Die_Sch%C3%B6pfung,_Hob.XXI:2_(Haydn,_Joseph)"
      }
    ],
    "rank": 24
  },
  {
    "slug": "box-plymouth-museum-of-year",
    "headline": "The Box in Plymouth wins UK Art Fund Museum of the Year 2026 prize",
    "overview": "The Box in Plymouth won the UK's Art Fund Museum of the Year 2026 prize of 120,000 pounds, the largest museum award in the world. Judges praised the five-year-old civic museum as a welcoming institution that reaches beyond its walls into the life of its city.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Artforum",
        "href": "https://www.artforum.com/news/the-box-in-plymouth-wins-uks-2026-museum-of-the-year-award-1234753479/"
      },
      {
        "name": "The Art Newspaper",
        "href": "https://www.theartnewspaper.com/2026/06/25/box-plymouth-wins-uk-art-funds-museum-of-the-year-prize"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-27",
    "image": {
      "src": "/covers/box-plymouth-museum-of-year.png",
      "alt": "Interior of The Box museum in Plymouth, winner of the Art Fund Museum of the Year 2026",
      "credit": "The Art Newspaper"
    },
    "edition": "Morning Edition · 27 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Founding of the British Museum, 7 June 1753",
        "excerpt": "The institution was groundbreaking as the world's first public national museum and represented a new kind of museum, national, belonging to neither church nor king, freely open to the public. Founded on the collections bequeathed by Sir Hans Sloane, comprising some 71,000 objects including 40,000 printed books, 7,000 manuscripts, and extensive natural history specimens and antiquities, it opened to visitors on 15 January 1759 at Montagu House in Bloomsbury, making cultural collections accessible to the general public rather than to elite audiences alone.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/British_Museum"
      },
      {
        "category": "historical",
        "title": "The Opening of the Ashmolean Museum, 24 May 1683",
        "excerpt": "Elias Ashmole donated his collection of curiosities to the University of Oxford in 1677, and the museum built to house it on Broad Street opened on 24 May 1683 as Britain's first public museum, a building purpose-made to display rarities to any visitor who paid admission rather than reserving them for a private cabinet. It established the model of an institution dedicated to collecting, preserving, and sharing knowledge openly with the public.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Ashmolean_Museum"
      },
      {
        "category": "literary",
        "title": "Thomas Browne, 'Musaeum Clausum, or Bibliotheca Abscondita' (published 1684)",
        "excerpt": "An inventory of remarkable books, antiquities, pictures and rarities of several kinds, scarce or never seen by any man now living. Sir Thomas Browne's posthumously published tract imagines an entire collection of lost or impossible treasures, an ostrich's egg engraved with the battle of Alcazar, a ring found in the belly of a fish, the chizel bone of a large pike's jaw inscribed with the Homeric battle of frogs and mice, conjuring in pure prose the wonder of the cabinet of curiosities and the collector's dream of gathering all the marvels of the world into one room.",
        "source": "The Public Domain Review",
        "href": "https://publicdomainreview.org/collection/musaeum-clausum-1684/"
      },
      {
        "category": "literary",
        "title": "Nathaniel Hawthorne, 'The Marble Faun' (1860), Chapter I",
        "excerpt": "Four individuals, in whose fortunes we should be glad to interest the reader, happened to be standing in one of the saloons of the sculpture-gallery in the Capitol at Rome. It was that room (the first, after ascending the staircase) in the centre of which reclines the noble and most pathetic figure of the Dying Gladiator, just sinking into his death-swoon. Around the walls stand the Antinous, the Amazon, the Lycian Apollo, the Juno; all famous productions of antique sculpture, and still shining in the undiminished majesty and beauty of their ideal life.",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/files/2181/2181-h/2181-h.htm"
      },
      {
        "category": "artistic",
        "title": "Frans Francken the Younger, 'A Cabinet of Curiosities' (1619)",
        "excerpt": "A dark green table glows with the disorderly riches of a Wunderkammer, shells, coins, fossils, and cut flowers spilling across its surface while small paintings of landscapes, classical scenes, and portraits crowd the wall behind. Francken's panel turns the private collector's room into a portrait of curiosity itself, an early-modern vision of the museum as a treasure-house where the whole of nature and art is gathered to be looked at, studied, and shared.",
        "source": "Royal Museum of Fine Arts Antwerp (Wikipedia)",
        "href": "https://en.wikipedia.org/wiki/A_Cabinet_of_Curiosities_(painting)",
        "image": {
          "src": "/covers/box-plymouth-museum-of-year--art.png",
          "alt": "Frans Francken the Younger, A Cabinet of Curiosities (1619), depicting a collector's table laden with shells, coins, fossils, flowers, and small paintings",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "The Mouseion of Alexandria, the 'Temple of the Muses' (3rd century BC)",
        "excerpt": "As an institution dedicated to the Muses, the word mouseion became the source for the modern word museum. Founded under Ptolemy I Soter and Ptolemy II Philadelphus, this shrine of the Muses brought together some of the best scholars of the Hellenistic world, who lived and dined at a common table and pursued research under royal patronage, making it the ancient prototype of the institution that gathers, preserves, and shares the arts and knowledge of a whole civilisation.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Mouseion"
      }
    ],
    "rank": 25
  },
  {
    "slug": "meta-prediction-markets-arena",
    "headline": "Zuckerberg pushes Meta into prediction markets, eyeing Polymarket and Kalshi",
    "overview": "Mark Zuckerberg has directed Meta to explore partnerships with the prediction-market platforms Polymarket and Kalshi as the company builds its own app, internally called 'Arena', that lets users wager points on future events. The move pushes Meta into the fast-growing market for betting on outcomes from sports to elections.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMitwFBVV95cUxPdE5FRENSc0E4ZmtGZ2lmUEVBYWh4RjJiLWNlRlZXSkNEc0VUeDJXdlVaUWJ2N2hnZ3NTRS14Vm03TUJUajQ0NlZMVTZJRC1hNkMyd2NfOTNmVzJHLW1zZ0FqSU9GcnZaUmVuT2NUSzktTk9KYmZEQ1BGb29MRkt4Z2ZMNnBxQ2czUXlVazhoT0FWQzBGWkt6bmdkYmZyUktxZ2xYRE1EN0poRTNrYk5USmxXY1Y5U1k?oc=5"
      },
      {
        "name": "Gizmodo",
        "href": "https://gizmodo.com/meta-is-building-a-prediction-markets-app-to-challenge-polymarket-and-kalshi-2000776311"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-27",
    "image": {
      "src": "/covers/meta-prediction-markets-arena.png",
      "alt": "A glass crystal ball on a dark table catching a shaft of cool light in a dim room",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 27 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Croesus Consults the Oracle of Delphi (Herodotus, Histories, Book I, c. 430 BCE)",
        "excerpt": "They inquired thus, and the answers of both the Oracles agreed in one, declaring to Crœsus that if he should march against the Persians he should destroy a great empire: and they counselled him to find out the most powerful of the Hellenes and join these with himself as friends. Croesus took the field unaware that the great empire he would destroy was his own.",
        "source": "Wikisource — The History of Herodotus (Macaulay translation), Book I",
        "href": "https://en.wikisource.org/wiki/The_History_of_Herodotus_(Macaulay)/Book_I"
      },
      {
        "category": "historical",
        "title": "The South Sea Bubble (London, 1720)",
        "excerpt": "In 1720 the shares of the South Sea Company, fueled by exaggerated tales of South American riches, soared from about 128 in January to more than 1,000 by August before collapsing back to 124 by December. The frenzy drew clerks, aristocrats, and ministers alike into wagering fortunes on a speculative future that never arrived, ruining thousands and prompting Parliament's Bubble Act. It remains the archetypal marketplace of speculation, where a whole nation bet on outcomes it could not foresee.",
        "source": "Wikipedia — South Sea Bubble",
        "href": "https://en.wikipedia.org/wiki/South_Sea_Company"
      },
      {
        "category": "literary",
        "title": "Alexander Pushkin, 'The Queen of Spades' (1834)",
        "excerpt": "She took three cards. She won with the first; doubled her stake on the second, and won again; doubled on the third, and still won. She gave him three cards, telling him to play them one after the other, and exacting from him at the same time his word of honour that he would never afterwards touch a card as long as he lived. Three, seven, ace, will win, if played one after the other.",
        "source": "Project Gutenberg — The Queen of Spades and Other Stories",
        "href": "https://www.gutenberg.org/files/55024/55024-h/55024-h.htm"
      },
      {
        "category": "literary",
        "title": "Geoffrey Chaucer, 'The Pardoner's Tale' (The Canterbury Tales, c. 1390)",
        "excerpt": "And now that I have spoken of gluttony, I will forbid you hazardry. Hazard is the very mother of lies and deceit and cursed forswearings, blasphemy of Christ, manslaughter and also waste of wealth and of time. It is a reproach and contrary to honour to be held a common gambler.",
        "source": "Wikisource — The Canterbury Tales of Geoffrey Chaucer / Pardoner's Tale",
        "href": "https://en.wikisource.org/wiki/The_Canterbury_Tales_of_Geoffrey_Chaucer/Pardoner%E2%80%99s_Tale"
      },
      {
        "category": "artistic",
        "title": "Caravaggio, 'The Cardsharps' (c. 1594)",
        "excerpt": "At a gaming table an innocent young dupe studies his cards, oblivious to the gloved older cheat who peers over his shoulder and signals with bare fingertips, while a sharp-eyed accomplice in slashed gold-and-black sleeves slips a hidden card from behind his back. Caravaggio renders the swindle not as caricature but as a tense human drama of glance and gesture, betting and betrayal, captured in raking light. The forerunner of poker, primero, becomes a stage for lost innocence and the seductions of chance.",
        "source": "Kimbell Art Museum, Fort Worth",
        "href": "https://kimbellart.org/collection/ap-198706",
        "image": {
          "src": "/covers/meta-prediction-markets-arena--art.png",
          "alt": "Caravaggio's painting The Cardsharps, showing a young card player being cheated by two swindlers at a gaming table",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Igor Stravinsky, 'L'Histoire du soldat' (The Soldier's Tale, 1918)",
        "excerpt": "In Stravinsky and Ramuz's theatrical work, a weary soldier barters his fiddle—the emblem of his soul—to a cunning Devil, then stakes everything in a feverish card game to win it back. The jagged, marching rhythms of the Devil's Dance drive a contest of chance in which fortune, foresight, and damnation hang on the turn of a card. It is a parable of wagering one's future against an adversary who always seems to know the odds.",
        "source": "IMSLP — Histoire du soldat, K029 (Stravinsky, Igor)",
        "href": "https://imslp.org/wiki/Histoire_du_soldat,_K029_(Stravinsky,_Igor)"
      }
    ],
    "rank": 26
  },
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
    ],
    "rank": 27
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
    ],
    "rank": 28
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
    ],
    "rank": 29
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
    ],
    "rank": 30
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
    ],
    "rank": 31
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
    ],
    "rank": 32
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
    ],
    "rank": 33
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
    ],
    "rank": 34
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
    ],
    "rank": 35
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
    ],
    "rank": 36
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
    ],
    "rank": 37
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
    ],
    "rank": 38
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
